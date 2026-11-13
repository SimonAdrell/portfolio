// Runs before every shell command. Blocks skipping git hooks, running dotenv, reading secret env files
// and printing env secrets. Stops accidents, not a security boundary. Exit 2 blocks the command and tells Claude why.
// Tests: src/guard-shell.spec.ts.
let command;
try {
	command = String(JSON.parse(await readStdin())?.tool_input?.command ?? '');
} catch {
	block('could not read the command, so it was not checked.');
}

// A command starts at the beginning of the line or after ; & | ( or a newline.
// Match in command position so text that only mentions a command (PR bodies, echo) passes.
const CMD = String.raw`(?:^|[;&|(\n]\s*)`;
const RULES = [
	// Scans to the end, so the flag after a heredoc, a multi-line or `a & b` message still counts.
	// shortcut: a git command whose message or any later part mentions --no-verify also blocks; reword it.
	[
		new RegExp(String.raw`${CMD}git\b[\s\S]*\s--no-verify\b`, 'i'),
		'Never skip git hooks. Fix what the hook reports.'
	],
	[
		new RegExp(String.raw`${CMD}(npx\s+|npm\s+exec\s+|\S*[/\\])?dotenv\b`, 'i'),
		'Running dotenv directly can print secrets.'
	],
	[
		/(^|[\s'"`=/\\<>(:])(\.env(\.[\w-]+)?|sendgrid\.env)(?![\w.-])/i,
		'Secret env files are off limits. Use the *.example files.',
		/\.env\.example/
	],
	[
		new RegExp(
			String.raw`${CMD}(env|set|printenv|export\s+-p)\s*($|[;&|)])|\bprintenv\b|\b(Get-ChildItem|gci|ls|dir)\s+env:|\$env:\w*(TOKEN|KEY|SECRET)`,
			'i'
		),
		"Don't print environment secrets."
	]
];

for (const [pattern, reason, allow] of RULES)
	if (pattern.test(command) && !allow?.test(command)) block(reason);

function block(reason) {
	process.stderr.write(`Blocked by .claude/hooks/guard-shell.mjs: ${reason}`);
	process.exit(2);
}
function readStdin() {
	return new Promise((res) => {
		let data = '';
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => res(data || '{}'));
	});
}

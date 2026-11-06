// Runs before every shell command. Blocks reading secret env files and printing env secrets.
// Stops accidents, not a security boundary. Exit 2 blocks the command and tells Claude why.
let command;
try {
	command = String(JSON.parse(await readStdin())?.tool_input?.command ?? '');
} catch {
	block('could not read the command, so it was not checked.');
}

const CMD = String.raw`(?:^|[;&|(\n]\s*)`;
const RULES = [
	[
		/(^|[\s'"`=/\\<>(:])(\.env(\.[\w-]+)?|sendgrid\.env)(?![\w.-])/i,
		'Secret env files are off limits. Use the *.example files.'
	],
	[
		new RegExp(
			String.raw`${CMD}(env|set|printenv|export\s+-p)\s*($|[;&|)])|\bprintenv\b|\b(Get-ChildItem|gci|ls|dir)\s+env:|\$env:\w*(TOKEN|KEY|SECRET)`,
			'i'
		),
		"Don't print environment secrets."
	]
];

for (const [pattern, reason] of RULES) if (pattern.test(command) && !/\.env\.example/.test(command)) block(reason);

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

// Runs before every shell command. Blocks skipping git hooks, running dotenv, reading secret env files
// and printing env secrets. Stops accidents, not a security boundary. Exit 2 blocks the command and tells Claude why.
// Tests: src/guard-shell.spec.ts.
let command;
try {
	command = String(JSON.parse(await readStdin())?.tool_input?.command ?? '');
} catch {
	block('could not read the command, so it was not checked.');
}

// The command without heredoc bodies, line continuations and quoted text, so a commit message or PR body
// that only mentions a command passes, and a flag after a multi-line message still counts.
// shortcut: a `"` inside a quoted string ends it early; a mention after that point blocks. Reword it.
const bare = command
	.replace(/<<-?\s*(['"]?)(\w+)\1([^\n]*)\n[\s\S]*?\n\s*\2(?=\r?\n|$)/g, '<<$3')
	.replace(/[\\`]\r?\n/g, ' ')
	.replace(/"[^"]*"|'[^']*'/g, '""');
// Env-file names with the safe example file taken out, so `cat .env.example .env` still blocks.
const noExample = command.replace(/\.env\.example\b/gi, '');

// A command starts at the beginning of the line or after ; & | ( or a newline.
const CMD = String.raw`(?:^|[;&|(\n]\s*)`;
const HOOKS = 'Never skip git hooks. Fix what the hook reports.';
const RULES = [
	[bare, new RegExp(String.raw`${CMD}git\b[^;&|\n]*\s--no-verify\b`, 'i'), HOOKS],
	// -n is --no-verify for commit only; for push it means dry run.
	[bare, new RegExp(String.raw`${CMD}git\s+commit\b[^;&|\n]*\s-[a-zA-Z]*n`), HOOKS],
	[
		bare,
		new RegExp(
			String.raw`${CMD}(?:(?:npx|bunx|node|pnpm\s+(?:dlx|exec)|yarn(?:\s+dlx)?|npm\s+exec)(?:\s+-\S*)*\s+)?\S*dotenv(?:x|-cli)?\b`,
			'i'
		),
		'Running dotenv directly can print secrets.'
	],
	[
		noExample,
		/(^|[\s'"`=/\\<>(:])(\.env(\.[\w-]+)*|sendgrid\.env)(?![\w.-])/i,
		'Secret env files are off limits. Use the *.example files.'
	],
	[
		command,
		new RegExp(
			[
				String.raw`${CMD}(env|set|printenv|export(\s+-p)?|declare\s+-[px])\s*($|[;&|)])`,
				String.raw`\bprintenv\b`,
				String.raw`\bcmd(\.exe)?\s+/c\s+set\s*($|[;&|)"'])`,
				String.raw`\b(Get-ChildItem|gci|ls|dir)\s+env:`,
				String.raw`\benv:\w*(TOKEN|KEY|SECRET)`,
				String.raw`\bGetEnvironmentVariables\b`,
				String.raw`\bGetEnvironmentVariable\(\s*['"]\w*(TOKEN|KEY|SECRET)`,
				String.raw`\$\{?\w*(TOKEN|KEY|SECRET)\b`
			].join('|'),
			'i'
		),
		"Don't print environment secrets."
	]
];

for (const [text, pattern, reason] of RULES) if (pattern.test(text)) block(reason);

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

import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

// Runs the real hook the way Claude Code does: JSON on stdin, exit 2 = blocked.
function guard(command: string) {
	const r = spawnSync('node', ['.claude/hooks/guard-shell.mjs'], {
		input: JSON.stringify({ tool_input: { command } }),
		encoding: 'utf8'
	});
	return { blocked: r.status === 2, reason: r.stderr };
}

describe('guard-shell', () => {
	it.each([
		'git commit --no-verify -m "wip"',
		'git push --no-verify',
		'npm run lint && git commit --no-verify',
		'git commit --no-verify -m ".env.example"',
		'git commit -m "$(cat <<\'EOF\'\nFix\nEOF\n)" --no-verify',
		"git commit -m @'\nFix\n'@ --no-verify",
		'git commit -m x \\\n  --no-verify',
		'git commit -m "a & b" --no-verify',
		'git commit -n -m wip',
		'git commit -nm wip',
		'git commit -am x -n'
	])('blocks skipping git hooks: %s', (cmd) => {
		const r = guard(cmd);
		expect(r.blocked).toBe(true);
		expect(r.reason).toMatch(/Fix what the hook reports/);
	});

	it.each([
		'dotenv -e .env.example -- node x.js',
		'npx dotenv -- env',
		'ls; dotenv run',
		'npx -y dotenv x',
		'npx --yes dotenv x',
		'npm exec -- dotenv x',
		'pnpm dlx dotenv x',
		'dotenvx run -- x',
		'node node_modules/dotenv-cli/cli.js'
	])('blocks running dotenv directly: %s', (cmd) => expect(guard(cmd).blocked).toBe(true));

	it.each([
		'cat .env',
		'type .env.local',
		'cat .env.development.local',
		'cat .env.example .env',
		'cat .env.example; cat .env.local',
		'cat sendgrid.env',
		'Get-Content ./sendgrid.env',
		// Mentions in search and log commands block too, on purpose.
		'git log -- .env',
		'printenv',
		'env',
		'set',
		'export -p',
		'export',
		'declare -x',
		'cmd /c set',
		'Get-ChildItem env:',
		'echo $env:GITHUB_TOKEN',
		'Get-Item env:GITHUB_TOKEN',
		'[Environment]::GetEnvironmentVariables()',
		"[Environment]::GetEnvironmentVariable('API_KEY')",
		'echo $GITHUB_TOKEN',
		'echo ${NPM_TOKEN}'
	])('blocks secrets: %s', (cmd) => expect(guard(cmd).blocked).toBe(true));

	it.each([
		'cat .env.example',
		'cp .env.example .env.example.bak',
		'git commit -m "Add .env.example"',
		'git commit -m "Block --no-verify in guard"',
		"git commit -m 'Skip -n in docs'",
		"git commit -F - <<'EOF'\nBlock --no-verify\ndotenv is blocked now\nEOF",
		'gh pr create --body "$(cat <<\'EOF\'\ndotenv is blocked now\nEOF\n)"',
		'gh pr create --body "never run git commit --no-verify"',
		'echo dotenv',
		'npm i dotenv',
		'grep dotenv package.json',
		'git push -n',
		'git log -n 5',
		'export FOO=1',
		'npm run verify',
		'git status'
	])('allows: %s', (cmd) => expect(guard(cmd).blocked).toBe(false));
});

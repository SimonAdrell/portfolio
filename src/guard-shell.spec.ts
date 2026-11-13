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
		'git commit --no-verify -m ".env.example"'
	])('blocks skipping git hooks: %s', (cmd) => {
		const r = guard(cmd);
		expect(r.blocked).toBe(true);
		expect(r.reason).toMatch(/Fix what the hook reports/);
	});

	it.each(['dotenv -e .env.example -- node x.js', 'npx dotenv -- env', 'ls; dotenv run'])(
		'blocks running dotenv directly: %s',
		(cmd) => expect(guard(cmd).blocked).toBe(true)
	);

	it.each([
		'cat .env',
		'type .env.local',
		'cat sendgrid.env',
		'Get-Content ./sendgrid.env',
		'printenv',
		'env',
		'Get-ChildItem env:',
		'echo $env:GITHUB_TOKEN'
	])('blocks secrets: %s', (cmd) => expect(guard(cmd).blocked).toBe(true));

	it.each([
		'cat .env.example',
		'git commit -m "Add .env.example"',
		'gh pr create --body "never run git commit --no-verify"',
		'echo dotenv',
		'npm run verify',
		'git status'
	])('allows: %s', (cmd) => expect(guard(cmd).blocked).toBe(false));
});

import { describe, expect, it } from 'vitest';
import { isGate } from '../.claude/hooks/gate-running.mjs';

// Command lines as Windows reports them for node.exe processes.
const here = 'C:\\repo\\.claude\\worktrees\\wt';
const nm = `${here}\\node_modules`;
const node = '"C:\\Program Files\\nodejs\\node.exe"';

describe('isGate', () => {
	it.each([
		`${node} ${nm}\\svelte-check\\bin\\svelte-check --tsconfig ./tsconfig.json`,
		`${node} ${nm}\\eslint\\bin\\eslint.js .`,
		`${node} ${nm}\\prettier\\bin\\prettier.cjs --check .`,
		`${node} ${nm}\\@playwright\\test\\cli.js test`,
		`${node} ${nm}\\vitest\\vitest.mjs --run`,
		`${node} ${nm}\\vitest\\vitest.mjs run src/x.spec.ts`,
		`${node} ${nm}\\vite\\bin\\vite.js build`,
		`${node} ${nm}\\vite\\bin\\vite.js preview`,
		`/usr/bin/node ${here.replaceAll('\\', '/')}/node_modules/vitest/vitest.mjs run`
	])('counts %s', (line) => expect(isGate(line, here)).toBe(true));

	it.each([
		`${node} ${nm}\\vitest\\vitest.mjs`,
		`${node} ${nm}\\vitest\\dist\\workers\\forks.js`,
		`${node} ${nm}\\vite\\bin\\vite.js dev`,
		`${node} ${nm}\\vite\\bin\\vite.js`,
		`${node} ${nm}\\svelte-check\\bin\\svelte-check --watch`,
		`${node} ${nm}\\vitest\\vitest.mjs --ui`,
		`${node} C:\\repo\\node_modules\\vitest\\vitest.mjs --run`,
		`${node} C:\\repo\\.claude\\worktrees\\other\\node_modules\\eslint\\bin\\eslint.js .`,
		`${node} scripts/check-fast.mjs`
	])('ignores %s', (line) => expect(isGate(line, here)).toBe(false));
});

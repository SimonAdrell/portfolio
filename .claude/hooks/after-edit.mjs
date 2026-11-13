// Runs after every file edit. Formats and lints that one file. Type-checking runs in npm run verify.
// Exit 2 sends the errors back to Claude so it fixes them right away.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';

const input = JSON.parse(await readStdin());
const file = input?.tool_input?.file_path ?? '';
const project = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

if (!/\.(ts|js|mjs|cjs|svelte|css)$/.test(file) || /node_modules|\.svelte-kit/.test(file))
	process.exit(0);
// Files outside the project (e.g. scratch files) aren't ours to lint.
const fromRoot = relative(project, resolve(file));
if (fromRoot.startsWith('..') || isAbsolute(fromRoot)) process.exit(0);
// Lint from the checkout that owns the file (a worktree under .claude/worktrees/ has its own config).
const cwd = findRoot(resolve(file));

run(`npx --no-install prettier --write "${file}"`);
if (!/\.css$/.test(file)) {
	const lint = run(`npx --no-install eslint --cache --fix --max-warnings 0 "${file}"`);
	if (lint) {
		process.stderr.write(
			`ESLint (${file}):\n${lint.slice(0, 6000)}\n\nFix these before continuing. Do not disable rules to make them pass.`
		);
		process.exit(2);
	}
}

function run(cmd) {
	try {
		execSync(cmd, { cwd, stdio: 'pipe', encoding: 'utf8' });
		return '';
	} catch (e) {
		return `${e.stdout ?? ''}${e.stderr ?? ''}`.trim();
	}
}
// Nearest folder with eslint.config.js and its own node_modules; a worktree without npm install
// falls back to the project folder.
function findRoot(path) {
	for (let dir = dirname(path); dir !== dirname(dir); dir = dirname(dir))
		if (existsSync(resolve(dir, 'eslint.config.js')))
			return existsSync(resolve(dir, 'node_modules')) ? dir : project;
	return project;
}
function readStdin() {
	return new Promise((res) => {
		let data = '';
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => res(data || '{}'));
	});
}

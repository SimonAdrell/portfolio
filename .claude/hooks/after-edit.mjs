// Runs after every file edit. Formats and lints that one file. Type-checking runs in npm run verify.
// Exit 2 sends the errors back to Claude so it fixes them right away.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';

const input = JSON.parse(await readStdin());
const file = input?.tool_input?.file_path ?? '';
const project = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

if (!/\.(ts|js|mjs|cjs|svelte|css)$/.test(file) || /node_modules|\.svelte-kit/.test(file))
	process.exit(0);
// Files outside the project (e.g. scratch files) aren't ours to lint.
const fromRoot = relative(project, resolve(file));
if (fromRoot.startsWith('..') || isAbsolute(fromRoot)) process.exit(0);
// Lint from the worktree that owns the file (.claude/worktrees/<name> has its own config), or the project.
// A worktree without npm install falls back to the project's tools.
const [worktree] = fromRoot.replaceAll('\\', '/').match(/^\.claude\/worktrees\/[^/]+/) ?? [];
const owner = worktree ? resolve(project, worktree) : project;
const cwd = existsSync(resolve(owner, 'node_modules')) ? owner : project;

run('prettier/bin/prettier.cjs', ['--write', file]);
if (!/\.css$/.test(file)) {
	const lint = run('eslint/bin/eslint.js', ['--cache', '--fix', '--max-warnings', '0', file]);
	if (lint) {
		process.stderr.write(
			`ESLint (${file}):\n${lint.slice(0, 6000)}\n\nFix these before continuing. Do not disable rules to make them pass.`
		);
		process.exit(2);
	}
}

// The tool's own bin through node: no shell, so the file path is never parsed as a command.
function run(bin, args) {
	try {
		execFileSync(process.execPath, [resolve(cwd, 'node_modules', bin), ...args], {
			cwd,
			stdio: 'pipe',
			encoding: 'utf8'
		});
		return '';
	} catch (e) {
		return `${e.stdout ?? ''}${e.stderr ?? ''}`.trim();
	}
}
function readStdin() {
	return new Promise((res) => {
		let data = '';
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => res(data || '{}'));
	});
}

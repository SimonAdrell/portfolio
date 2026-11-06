// Runs after every file edit. Formats and lints that one file. Type-checking runs in npm run verify.
// Exit 2 sends the errors back to Claude so it fixes them right away.
import { execSync } from 'node:child_process';
import { isAbsolute, relative, resolve } from 'node:path';

const input = JSON.parse(await readStdin());
const file = input?.tool_input?.file_path ?? '';
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

if (!/\.(ts|js|mjs|cjs|svelte|css)$/.test(file) || /node_modules|\.svelte-kit/.test(file))
	process.exit(0);
const fromRoot = relative(root, resolve(file));
if (fromRoot.startsWith('..') || isAbsolute(fromRoot)) process.exit(0);

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
		execSync(cmd, { cwd: root, stdio: 'pipe', encoding: 'utf8' });
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

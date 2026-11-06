// Runs when Claude wants to finish. If code changed, `npm run verify` must pass.
// First failure: exit 2, Claude keeps working. Second failure in a row: exit 1, you see the errors.
import { execSync } from 'node:child_process';

const input = JSON.parse(await readStdin());
const cwd = input?.cwd ?? process.cwd();

if (!codeChanged()) process.exit(0);

try {
	execSync('npm run verify --silent', { cwd, stdio: 'pipe', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} catch (e) {
	const out = `${e.stdout ?? ''}${e.stderr ?? ''}`.trim().slice(0, 8000);
	if (input?.stop_hook_active) {
		process.stderr.write(`npm run verify still fails after one retry. Over to you:\n\n${out}`);
		process.exit(1);
	}
	process.stderr.write(`npm run verify fails. Fix the cause, then finish:\n\n${out}`);
	process.exit(2);
}

function codeChanged() {
	try {
		const status = execSync('git status --porcelain', { cwd, encoding: 'utf8' });
		return status.split('\n').some((l) => /\s(src|e2e|messages)\/|\.(ts|js|svelte|css)$/.test(l));
	} catch {
		return true;
	}
}
function readStdin() {
	return new Promise((res) => {
		let data = '';
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => res(data || '{}'));
	});
}

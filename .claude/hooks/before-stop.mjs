// Runs when Claude wants to finish. If code changed, `npm run verify` must pass.
// First failure: exit 2, Claude keeps working. Second failure in a row: exit 1, you see the errors.
import { execFileSync, execSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const input = JSON.parse(await readStdin());
// The session's own checkout (a worktree under .claude/worktrees/ is ignored by the main one).
const cwd = toplevel(input?.cwd ?? process.cwd());

if (!codeChanged()) process.exit(0);
// The working tree as a git tree id (tracked + untracked, minus .gitignore). Same id as the last green run
// = same code, so skip. Ignored files (node_modules, env files, src/lib/paraglide) don't count.
// Delete the stamp to force a run.
const tree = workingTree();
const stamp = tree && resolve(cwd, git('rev-parse --git-path verify-ok'));
if (stamp && existsSync(stamp) && readFileSync(stamp, 'utf8') === tree)
	skip('verify skipped: no code changes since it last passed.');
// A skip writes no stamp, so the next turn end runs verify again.
if (gateRunning())
	skip('verify skipped: a check, test or e2e run is already going in this checkout.');

try {
	execSync('npm run verify --silent', {
		cwd,
		stdio: 'pipe',
		encoding: 'utf8',
		maxBuffer: 64 * 1024 * 1024
	});
	// Only if nothing edited files during the run.
	if (stamp && workingTree() === tree) writeFileSync(stamp, tree);
	process.exit(0);
} catch (e) {
	const out = trim(`${e.stdout ?? ''}${e.stderr ?? ''}`.trim());
	if (input?.stop_hook_active) {
		process.stderr.write(`npm run verify still fails after one retry. Over to you:\n\n${out}`);
		process.exit(1);
	}
	process.stderr.write(`npm run verify fails. Fix the cause, then finish:\n\n${out}`);
	process.exit(2);
}

// systemMessage shows in the chat; plain stdout only shows in the transcript view.
function skip(message) {
	console.log(JSON.stringify({ systemMessage: message }));
	process.exit(0);
}
function toplevel(dir) {
	try {
		return execSync('git rev-parse --show-toplevel', { cwd: dir, encoding: 'utf8' }).trim();
	} catch {
		return dir;
	}
}
function git(args, env) {
	// stderr ignored: with core.autocrlf, `git add -A` warns about line endings.
	return execSync(`git ${args}`, {
		cwd,
		env,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'ignore']
	}).trim();
}
// `git add -A` into a copy of the index, then `git write-tree`. The real index stays untouched.
function workingTree() {
	const index = join(tmpdir(), `verify-index-${process.pid}`);
	try {
		copyFileSync(resolve(cwd, git('rev-parse --git-path index')), index);
		const env = { ...process.env, GIT_INDEX_FILE: index };
		git('add -A', env);
		return git('write-tree', env);
	} catch {
		return '';
	} finally {
		rmSync(index, { force: true });
	}
}
function codeChanged() {
	try {
		const status = execSync('git status --porcelain', { cwd, encoding: 'utf8' });
		return status
			.split('\n')
			.some((l) =>
				/\s(src|e2e|messages|scripts)\/|\spackage\.json$|\.(ts|js|mjs|cjs|svelte|css)$/.test(l)
			);
	} catch {
		return true;
	}
}
// A gate already runs in this checkout (verify, `vitest run`, Playwright, often in the background while
// Claude waits), so don't run a second one beside it. Signal: a node process from this checkout's node_modules
// running svelte-check, ESLint, Prettier, Playwright, `vitest run` or `vite build`/`vite preview`.
// `vite dev`, watch-mode vitest, --watch and --ui don't count.
// shortcut: a process scan, not a lock file, so a killed run leaves no lock. A partial run (one test file,
// e2e only) also skips; match full-gate signatures if that bites.
function gateRunning() {
	try {
		const list =
			process.platform === 'win32'
				? execFileSync(
						'powershell',
						[
							'-NoProfile',
							'-Command',
							`Get-CimInstance Win32_Process -Filter "Name='node.exe'" | ForEach-Object CommandLine`
						],
						{ encoding: 'utf8' }
					)
				: execFileSync('ps', ['-axww', '-o', 'command'], { encoding: 'utf8' });
		const norm = (s) =>
			s.toLowerCase().replaceAll('\\', '/').replaceAll('"', '').replace(/\/+/g, '/');
		const modules = `${norm(cwd)}/node_modules/`;
		return norm(list)
			.split('\n')
			.some(
				(line) =>
					line.includes(modules) &&
					!/--watch|--ui\b/.test(line) &&
					(/\/(@playwright|playwright|eslint|svelte-check|prettier)\//.test(line) ||
						/\/vitest\/\S*\s(.*\s)?(run|--run)(\s|$)/.test(line) ||
						/\/vite\/bin\/vite\.js\s+(build|preview)\b/.test(line))
			);
	} catch {
		return false;
	}
}
function trim(s) {
	return s.length > 8000 ? s.slice(0, 8000) + '\n... (truncated)' : s;
}
function readStdin() {
	return new Promise((res) => {
		let data = '';
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => res(data || '{}'));
	});
}

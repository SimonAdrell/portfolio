// Used by before-stop.mjs. Tests: src/gate-running.spec.ts.
// True if a process command line is a check, test or e2e run from this checkout: a node process from its
// node_modules running svelte-check, ESLint, Prettier, Playwright, `vitest run` or `vite build`/`vite preview`.
// `vite dev`, watch-mode vitest, --watch and --ui don't count.
/** @param {string} commandLine @param {string} checkout */
export function isGate(commandLine, checkout) {
	const norm = (/** @type {string} */ s) =>
		s.toLowerCase().replaceAll('\\', '/').replaceAll('"', '').replace(/\/+/g, '/');
	const line = norm(commandLine);
	return (
		line.includes(`${norm(checkout)}/node_modules/`) &&
		!/--watch|--ui\b/.test(line) &&
		(/\/(@playwright|playwright|eslint|svelte-check|prettier)\//.test(line) ||
			/\/vitest\/\S*\s(.*\s)?(run|--run)(\s|$)/.test(line) ||
			/\/vite\/bin\/vite\.js\s+(build|preview)\b/.test(line))
	);
}

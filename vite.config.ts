import adapter from '@sveltejs/adapter-static';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// No fallback: src/routes/404 prerenders a real 404.html, which GitHub Pages serves for unknown paths.
			adapter: adapter(),
			// Absolute asset URLs, since 404.html is served at any depth. origin: absolute hreflang URLs.
			paths: { relative: false, origin: 'https://codebysimon.com' }
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			// English at /, Swedish at /sv/.
			strategy: ['url', 'baseLocale']
		})
	],
	// No PostCSS; stops Vite finding a parent checkout's config from inside .claude/worktrees.
	css: { postcss: {} },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

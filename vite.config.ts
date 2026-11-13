import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			// Registered in svelte.config.js instead; see the note there.
			disablePreprocessor: true
		})
	],
	// No PostCSS; stops Vite finding a parent checkout's config from inside .claude/worktrees.
	css: { postcss: {} },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

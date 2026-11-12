import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			// Registered in svelte.config.js instead; see the note there.
			disablePreprocessor: true
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

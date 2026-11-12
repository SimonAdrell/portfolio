import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';

// shortcut: vite-plugin-svelte 7 dropped plugin.api.sveltePreprocess, so we register Paraglide's
// link-localising preprocessor by hand. Remove with the Paraglide 2 migration (TAS-258).
const paraglidePreprocess = paraglide({
	project: './project.inlang',
	outdir: './src/lib/paraglide'
})
	.map((p) => p.api?.sveltePreprocess)
	.find(Boolean);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), paraglidePreprocess],

	kit: {
		// No fallback: src/routes/404 prerenders a real 404.html, which GitHub Pages serves for unknown paths.
		adapter: adapter(),
		// Absolute asset URLs, since 404.html is served at any depth.
		paths: { relative: false },
		// Used for absolute URLs (hreflang links) in prerendered pages.
		prerender: { origin: 'https://codebysimon.com' }
	}
};

export default config;

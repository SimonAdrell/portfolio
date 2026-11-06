import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // No fallback: src/routes/404 prerenders a real 404.html, which GitHub Pages serves for unknown paths.
    adapter: adapter(),
    // Absolute asset URLs, since 404.html is served at any depth.
    paths: { base: process.env.BASE_PATH ?? "", relative: false },
    // Used for absolute URLs (hreflang links) in prerendered pages.
    prerender: { origin: "https://codebysimon.com" },
  },
};

export default config;

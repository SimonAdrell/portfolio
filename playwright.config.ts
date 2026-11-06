import { defineConfig } from '@playwright/test';

// Build and serve under the same base path as GitHub Pages.
export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: { BASE_PATH: '/portfolio' }
	},
	use: { baseURL: 'http://localhost:4173/portfolio/' },
	testDir: 'e2e'
});

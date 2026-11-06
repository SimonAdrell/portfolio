import { defineConfig } from '@playwright/test';

// Build and serve from the root, like codebysimon.com.
export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: { baseURL: 'http://localhost:4173/' },
	testDir: 'e2e'
});

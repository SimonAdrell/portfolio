import { defineConfig } from '@playwright/test';

// Build and serve from the root, like codebysimon.com.
export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		// Local builds can exceed the 60 s default.
		timeout: 180_000,
		reuseExistingServer: !process.env.CI
	},
	use: { baseURL: 'http://localhost:4173/' },
	testDir: 'e2e'
});

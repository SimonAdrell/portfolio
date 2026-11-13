import { defineConfig } from '@playwright/test';

// Build and serve from the root, like codebysimon.com.
export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		// Local builds can exceed the 60 s default.
		timeout: 180_000,
		// Never reuse: a stale preview on 4173 would test an old build without saying so.
		reuseExistingServer: false
	},
	// CI uploads test-results/ when e2e fails; the trace is what makes it worth opening.
	use: { baseURL: 'http://localhost:4173/', trace: 'retain-on-failure' },
	testDir: 'e2e'
});

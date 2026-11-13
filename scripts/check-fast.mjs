// npm run verify: svelte-check, lint and unit tests side by side. One line per step, then the output of each
// step that failed (capped, so the stop hook's 8000 characters show every failing step).
import { exec } from 'node:child_process';

const steps = ['check', 'lint', 'test:unit -- --run'];

const results = await Promise.all(
	steps.map(
		(step) =>
			new Promise((res) => {
				const start = Date.now();
				exec(`npm run --silent ${step}`, { maxBuffer: 32 * 1024 * 1024 }, (error, stdout, stderr) =>
					res({ step, error, out: `${stdout}${stderr}`.trim(), s: (Date.now() - start) / 1000 })
				);
			})
	)
);

for (const { step, error, s } of results)
	console.log(`${error ? '✖' : '✓'} ${step} (${s.toFixed(1)} s)`);
for (const { step, out } of results.filter((r) => r.error))
	console.log(
		`\n--- ${step} ---\n${out.length > 2500 ? `${out.slice(0, 2500)}\n... (truncated)` : out}`
	);
process.exitCode = results.some((r) => r.error) ? 1 : 0;

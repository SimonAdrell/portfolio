import { expect, test, type Page } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const build = resolve(import.meta.dirname, '../build');
const locales = ['', 'se/'];

const sections = {
	'': [
		'Ingredients',
		'Method',
		'On the stove',
		'Served at',
		'Nutrition facts',
		"Chef's notes",
		'Want a batch?'
	],
	'se/': [
		'Ingredienser',
		'Gör så här',
		'På spisen',
		'Serveras på',
		'Näringsvärde',
		'Kockens anteckningar',
		'Vill du ha en portion?'
	]
};
const h1 = { '': "Simon's gel", 'se/': 'Simons gel' };

// Each card section's name: its trail-marker label when it has one ("On the stove · …"), else its h2.
const sectionNames = (page: Page) =>
	page.locator('main section[aria-labelledby]').evaluateAll((all) =>
		all.map((s) => {
			// textContent, not innerText: labels are uppercased by CSS.
			const label = s.querySelector('.cbs-section > .cbs-label')?.textContent;
			return (label ? label.split(' · ')[0] : (s.querySelector('h2')?.textContent ?? '')).trim();
		})
	);

for (const locale of locales) {
	const name = locale || 'en';

	test(`start page is the recipe card (${name})`, async ({ page }) => {
		await page.goto(`./${locale}`);
		await expect(page.locator('h1')).toHaveText(h1[locale as keyof typeof h1]);
		expect(await sectionNames(page)).toEqual(sections[locale as keyof typeof sections]);
	});

	test(`landmarks are there once each (${name})`, async ({ page }) => {
		await page.goto(`./${locale}`);
		for (const role of ['banner', 'navigation', 'main', 'contentinfo'] as const) {
			await expect(page.getByRole(role)).toHaveCount(1);
		}
	});

	test(`recipe nav scrolls to its section (${name})`, async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		// The canonical URLs (sitemap): / and /se. A link must scroll this document, not load another.
		const path = `/${locale.replace('/', '')}`;
		await page.goto(`.${path}`);
		await page.evaluate(() => ((window as unknown as { stay: boolean }).stay = true));
		const links = page.getByRole('navigation').getByRole('link');
		await expect(links).toHaveCount(5);
		for (const link of await links.all()) {
			const hash = (await link.getAttribute('href'))?.match(/#[\w-]+$/)?.[0] ?? '';
			expect(hash).not.toBe('');
			await link.click();
			await expect(page).toHaveURL(`http://localhost:4173${path}${hash}`);
			await expect(page.locator(hash)).toBeInViewport();
			expect(await page.evaluate(() => (window as unknown as { stay?: boolean }).stay)).toBe(true);
		}
	});

	test(`fonts are self-hosted and load (${name})`, async ({ page }) => {
		const failed: string[] = [];
		const foreign: string[] = [];
		const fonts: string[] = [];
		page.on('request', (r) => {
			if (new URL(r.url()).hostname !== 'localhost') foreign.push(r.url());
			if (r.resourceType() === 'font') fonts.push(r.url());
		});
		page.on('response', (r) => {
			if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
		});
		await page.goto(`./${locale}`);
		await page.evaluate(() => document.fonts.ready);
		expect(failed).toEqual([]);
		expect(foreign).toEqual([]);
		expect(fonts.length).toBeGreaterThanOrEqual(3);
	});

	for (const width of [375, 1280]) {
		test(`every link and button has a focus ring and 44 px target at ${width} px (${name})`, async ({
			page
		}) => {
			await page.setViewportSize({ width, height: 800 });
			await page.goto(`./${locale}`);
			const count = await page.locator('a[href], button').count();
			expect(count).toBeGreaterThan(0);
			for (let i = 0; i < count; i++) {
				await page.keyboard.press('Tab');
				const el = await page.evaluate(() => {
					const a = document.activeElement as HTMLElement;
					const s = getComputedStyle(a);
					return {
						tag: a.tagName,
						text: a.textContent?.trim(),
						outline: s.outlineStyle,
						width: s.outlineWidth,
						height: a.getBoundingClientRect().height
					};
				});
				expect(['A', 'BUTTON'], JSON.stringify(el)).toContain(el.tag);
				expect(el.outline, JSON.stringify(el)).not.toBe('none');
				expect(el.width, JSON.stringify(el)).not.toBe('0px');
				expect(el.height, JSON.stringify(el)).toBeGreaterThanOrEqual(44);
			}
		});
	}

	for (const p of ['about', 'skills', 'contact']) {
		test(`/${locale}${p} is gone`, async ({ page }) => {
			const res = await page.goto(`./${locale}${p}`);
			expect(res?.status()).toBe(404);
			await expect(page.locator('h1')).toContainText('404');
		});
	}

	test(`unknown URL shows the 404 page (${name})`, async ({ page }) => {
		const res = await page.goto(`./${locale}does-not-exist`);
		expect(res?.status()).toBe(404);
		await expect(page.locator('h1')).toContainText('404');
	});
}

test('Swedish start page has no English copy', async ({ page }) => {
	await page.goto('./se/');
	const text = await page.locator('body').innerText();
	for (const en of [
		"Simon's gel",
		'Ingredients',
		'Method',
		'Send me a message',
		'Per serving',
		'Written in Örebro',
		'every day'
	]) {
		expect(text).not.toContain(en);
	}
});

for (const locale of locales) {
	test(`card is not rotated and does not scroll sideways at 375 px (${locale || 'en'})`, async ({
		page
	}) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto(`./${locale}`);
		const { scroll, inner } = await page.evaluate(() => ({
			scroll: document.documentElement.scrollWidth,
			inner: window.innerWidth
		}));
		expect(scroll).toBeLessThanOrEqual(inner);
		await expect(page.locator('article')).toHaveCSS('transform', 'none');
	});
}

test('"Send me a message" opens an email to Simon', async ({ page }) => {
	await page.goto('./');
	await expect(page.getByRole('link', { name: 'Send me a message' })).toHaveAttribute(
		'href',
		'mailto:simon@codebysimon.com'
	);
});

const nutrition = {
	'': {
		title: 'Nutrition facts',
		serving: 'Per serving: one backend developer',
		rows: [
			/Backend \(\.NET, C#\)\s*70 %/,
			/Cloud \(Azure\)\s*20 %/,
			/Front-end\s*10 %/,
			/Agentic development\s*every day/,
			/Languages\s*English, Swedish/,
			/Bugs\s*traces may occur/
		]
	},
	'se/': {
		title: 'Näringsvärde',
		serving: 'Per portion: en backendutvecklare',
		rows: [
			/Backend \(\.NET, C#\)\s*70 %/,
			/Moln \(Azure\)\s*20 %/,
			/Frontend\s*10 %/,
			/Agentisk utveckling\s*varje dag/,
			/Språk\s*svenska, engelska/,
			/Buggar\s*kan innehålla spår/
		]
	}
};
for (const locale of locales) {
	test(`nutrition label lists the facts (${locale || 'en'})`, async ({ page }) => {
		const n = nutrition[locale as keyof typeof nutrition];
		await page.goto(`./${locale}`);
		const label = page.getByRole('region', { name: n.title });
		await expect(label).toContainText(n.serving);
		await expect(label.locator('dl > div')).toHaveText(n.rows);
	});
}

test('struck-through amount reads as was / now', async ({ page }) => {
	await page.goto('./');
	const row = page.locator('#ingredients li').filter({ hasText: 'Hand-typed code' });
	expect((await row.textContent())?.replace(/\s+/g, ' ')).toContain(
		'was all of it now the tricky bits'
	);
});

test('both start pages are prerendered with their content', () => {
	expect(readFileSync(resolve(build, 'index.html'), 'utf8')).toContain(`>Simon's gel</h1>`);
	expect(readFileSync(resolve(build, 'se.html'), 'utf8')).toContain('>Simons gel</h1>');
	expect(existsSync(resolve(build, '404.html'))).toBe(true);
});

// Missing #id targets already fail the build (SvelteKit prerender handleMissingId).
test('in-page links stay on the page', () => {
	const pages = readdirSync(build, { recursive: true, encoding: 'utf8' }).filter((f) =>
		f.endsWith('.html')
	);
	expect(pages.length).toBeGreaterThan(0);
	for (const file of pages) {
		const html = readFileSync(resolve(build, file), 'utf8');
		for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]*#[^"]*)"/g)) {
			const id = href.slice(href.indexOf('#') + 1);
			expect(
				href.startsWith('#'),
				`${file}: link "${href}" leaves the page. Write href="#${id}" and add data-no-translate, or Paraglide rewrites it to a page path.`
			).toBe(true);
		}
	}
});

test('start pages ship no JavaScript', () => {
	for (const f of ['index.html', 'se.html']) {
		const html = readFileSync(resolve(build, f), 'utf8');
		expect(html, f).not.toContain('<script');
		expect(html, f).not.toContain('modulepreload');
	}
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });
	test('404 page shows its content', async ({ page }) => {
		// GitHub Pages serves this file for any unknown URL.
		await page.goto('./404.html');
		await expect(page.locator('h1')).toContainText('404');
	});
});

for (const locale of locales) {
	test(`404 page links back to the start page (${locale || 'en'})`, async ({ page }) => {
		await page.goto(`./${locale}does-not-exist`);
		await page.getByRole('main').getByRole('link').click();
		await expect(page).toHaveURL(/localhost:4173\/(se\/?)?$/);
		await expect(page.locator('h1')).toHaveText(/^Simon'?s gel$/);
	});
}

test('custom domain files point at https://codebysimon.com', () => {
	const read = (f: string) => readFileSync(resolve(build, f), 'utf8');
	expect(read('CNAME').trim()).toBe('codebysimon.com');
	expect(read('robots.txt')).toContain('Sitemap: https://codebysimon.com/sitemap.xml');
	const locs = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
	expect(locs).toEqual(['https://codebysimon.com/', 'https://codebysimon.com/se']);
});

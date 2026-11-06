import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const build = resolve(import.meta.dirname, "../build");

// Paths relative to the site root.
const pages = ["", "about", "contact", "skills"];
const locales = ["", "se/"];

test("home page has expected h1", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator("h1")).toBeVisible();
});

test("every page is prerendered as static HTML in both locales", () => {
  for (const locale of locales) {
    for (const p of pages) {
      const file =
        p === "" ? (locale ? "se.html" : "index.html") : `${locale}${p}.html`;
      expect(existsSync(resolve(build, file)), file).toBe(true);
    }
  }
  expect(existsSync(resolve(build, "404.html"))).toBe(true);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("404 page shows its content", async ({ page }) => {
    // GitHub Pages serves this file for any unknown URL.
    await page.goto("./404.html");
    await expect(page.locator("h1")).toContainText("404");
  });
});

for (const locale of locales) {
  test(`nav links load from the root (${locale || "en"})`, async ({ page }) => {
    const failed: string[] = [];
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });
    await page.goto(locale ? "./se" : "./");
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const p of ["about", "skills", "contact"]) {
      await page.locator(`nav a[href="/${locale}${p}"]:visible`).click();
      await expect(page).toHaveURL(new RegExp(`localhost:4173/${locale}${p}$`));
    }
    await page.locator('nav a[title="Start"]').click();
    await expect(page).toHaveURL(new RegExp(`localhost:4173/${locale}?$`));
    await page.evaluate(() => document.fonts.ready);
    expect(failed).toEqual([]);
  });
}

test("unknown URL shows the 404 page", async ({ page }) => {
  const res = await page.goto("./does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("404");
});

test("custom domain files point at https://codebysimon.com", () => {
  const read = (f: string) => readFileSync(resolve(build, f), "utf8");
  expect(read("CNAME").trim()).toBe("codebysimon.com");
  expect(read("robots.txt")).toContain(
    "Sitemap: https://codebysimon.com/sitemap.xml",
  );
  const locs = [...read("sitemap.xml").matchAll(/<loc>(.*?)<\/loc>/g)];
  expect(locs.length).toBeGreaterThan(0);
  for (const [, url] of locs)
    expect(url).toMatch(/^https:\/\/codebysimon\.com\//);
});

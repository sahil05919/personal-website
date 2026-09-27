/**
 * Draws the share cards into public/og/<file>.png, one per entry in
 * data/socialCards.json, using card.html in this folder.
 *
 *   npx -y -p playwright@1.56.0 node scripts/og-cards/render.mjs
 *
 * (first run also needs: npx -y playwright@1.56.0 install chromium)
 *
 * Playwright is deliberately not a dependency of the site — Vercel would
 * install it on every deploy for a script that runs a few times a year.
 *
 * After re-rendering, LinkedIn keeps its old preview for a while. Paste the
 * page URL into https://www.linkedin.com/post-inspector/ to refresh it.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');

let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  console.error('Playwright not found. Run this with:\n  npx -y -p playwright@1.56.0 node scripts/og-cards/render.mjs');
  process.exit(1);
}

const { cards } = JSON.parse(
  await readFile(path.join(root, 'data/socialCards.json'), 'utf8'),
);
const template = pathToFileURL(path.join(here, 'card.html')).href;

const browser = await chromium.launch();
try {
  for (const card of cards) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.addInitScript((c) => { window.CARD = c; }, card);
    await page.goto(template);
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(root, 'public/og', `${card.file}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await page.close();
    console.log(`public/og/${card.file}.png`);
  }
} finally {
  await browser.close();
}

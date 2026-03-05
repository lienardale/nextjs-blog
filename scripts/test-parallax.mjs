/**
 * Visual parallax test — takes viewport screenshots at 3 scroll positions.
 *
 * Usage:  node scripts/test-parallax.mjs [base_url]
 *         default base_url = http://localhost:3000
 *
 * Requires: playwright browsers installed (npx playwright install chromium)
 *
 * Outputs:  /tmp/parallax-scroll-{0,600,1200}.png
 *
 * What to check:
 *   Each section strip should show a DIFFERENT portion of the mountain.
 *   Top sections → more sky / upper peaks.
 *   Bottom sections → rocky faces / lower mountain.
 *   If all strips look identical, background-attachment:fixed is broken
 *   (likely a CSS transform on an ancestor element).
 */
import {chromium} from '/tmp/node_modules/playwright/index.mjs';

const baseUrl = process.argv[2] || 'http://localhost:3000';

const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1280, height: 800}});
await page.goto(baseUrl, {waitUntil: 'networkidle'});
await page.waitForTimeout(3000);

const scrollPositions = [0, 600, 1200];

for (const y of scrollPositions) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(500);
  const path = `/tmp/parallax-scroll-${y}.png`;
  await page.screenshot({path});
  console.log(`Saved ${path}`);
}

await browser.close();
console.log('Done — check /tmp/parallax-scroll-*.png');

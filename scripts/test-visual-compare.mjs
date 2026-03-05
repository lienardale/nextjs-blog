/**
 * Visual comparison between local dev and production.
 *
 * Usage:  node scripts/test-visual-compare.mjs [local_url] [prod_url]
 *         defaults: http://localhost:3000  https://www.alienard.fr
 *
 * Requires: playwright installed in /tmp (cd /tmp && npm i playwright)
 *           and browsers (npx playwright install chromium)
 *
 * Outputs pairs of screenshots in /tmp/ for side-by-side comparison:
 *   /tmp/local-{scrollY}.png  vs  /tmp/prod-{scrollY}.png
 *   /tmp/local-dropdown.png   vs  /tmp/prod-dropdown.png
 *
 * What to check:
 *   - Parallax: each section strip shows a different mountain portion
 *   - Section height: strips should be the same size on both
 *   - Dropdown: background color, item layout, z-index over next section
 */
import {chromium} from '/tmp/node_modules/playwright/index.mjs';

const localUrl = process.argv[2] || 'http://localhost:3000';
const prodUrl = process.argv[3] || 'https://www.alienard.fr';
const scrollPositions = [0, 400, 800, 1200];

async function capture(baseUrl, prefix) {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 1280, height: 800}});
  await page.goto(baseUrl, {waitUntil: 'networkidle'});
  await page.waitForTimeout(3000);

  // Scroll position screenshots (parallax + section height)
  for (const y of scrollPositions) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    await page.screenshot({path: `/tmp/${prefix}-${y}.png`});
  }

  // Dropdown screenshot
  const btn = page.getByRole('button', {name: /Experience/i});
  await btn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await btn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({path: `/tmp/${prefix}-dropdown.png`});

  await browser.close();
  console.log(`${prefix}: done`);
}

await capture(localUrl, 'local');
await capture(prodUrl, 'prod');

console.log('\nScreenshots saved to /tmp/');
console.log('Compare pairs:');
for (const y of scrollPositions) {
  console.log(`  scroll ${y}: /tmp/local-${y}.png  vs  /tmp/prod-${y}.png`);
}
console.log('  dropdown:  /tmp/local-dropdown.png  vs  /tmp/prod-dropdown.png');

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'node:fs/promises';

await fs.mkdir('qa', { recursive: true });
const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 1 },
  executablePath: await chromium.executablePath(),
  headless: true
});
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
page.on('pageerror', (err) => errors.push(`page: ${err.message}`));
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: 'qa/01-splash.png' });
await page.mouse.click(195, 420);
await new Promise((r) => setTimeout(r, 650));
await page.screenshot({ path: 'qa/02-first-run.png' });
await page.mouse.move(58, 603);
await page.mouse.down();
await page.mouse.move(285, 350, { steps: 12 });
await page.mouse.up();
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: 'qa/03-first-chaos.png' });
await page.mouse.click(195, 730);
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: 'qa/04-first-result.png' });
await page.mouse.click(123, 658);
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: 'qa/05-hall.png' });
await fs.writeFile('qa/errors.json', JSON.stringify(errors, null, 2));
await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('QA complete: no browser console or page errors.');
}

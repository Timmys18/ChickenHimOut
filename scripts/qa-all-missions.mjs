import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'node:fs/promises';

await fs.mkdir('qa/missions', { recursive: true });
const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const errors = [];
for (let mission = 1; mission <= 15; mission++) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`M${mission} console: ${msg.text()}`); });
  page.on('pageerror', (err) => errors.push(`M${mission} page: ${err.message}`));
  await page.goto(`http://127.0.0.1:4173/?mission=${mission}`, { waitUntil: 'networkidle0' });
  await page.mouse.click(195, 420);
  await page.mouse.move(58, 603); await page.mouse.down(); await page.mouse.move(285, 350, { steps: 8 }); await page.mouse.up();
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `qa/missions/${String(mission).padStart(2, '0')}.png` });
  await page.close();
}
await browser.close();
await fs.writeFile('qa/all-missions-errors.json', JSON.stringify(errors, null, 2));
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('All 15 mission configurations loaded and launched without browser errors.');

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'node:fs/promises';

const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const errors = [];
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(err.message));
await page.goto('http://127.0.0.1:4173/?mode=golf', { waitUntil: 'networkidle0' });
await page.screenshot({ path: 'qa/07-golf.png' });
await page.mouse.move(77, 635); await page.mouse.down(); await page.mouse.move(270, 250, { steps: 12 }); await page.mouse.up();
await new Promise((r) => setTimeout(r, 1900));
await page.screenshot({ path: 'qa/08-golf-play.png' });
await page.goto('http://127.0.0.1:4173/?mode=wardrobe', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: 'qa/09-wardrobe.png' });
await page.goto('http://127.0.0.1:4173/?mode=settings', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: 'qa/10-settings.png' });
await fs.writeFile('qa/extras-errors.json', JSON.stringify(errors, null, 2));
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Golf and wardrobe QA completed without browser errors.');

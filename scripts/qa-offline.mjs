import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'node:fs/promises';

await fs.mkdir('qa', { recursive: true });
const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((resolve) => setTimeout(resolve, 800));
await page.setOfflineMode(true);
await page.reload({ waitUntil: 'domcontentloaded' });
await new Promise((resolve) => setTimeout(resolve, 900));
const canvas = await page.$('canvas');
if (!canvas) errors.push('Offline reload did not render the game canvas.');
await page.screenshot({ path: 'qa/11-offline.png' });
await fs.writeFile('qa/offline-errors.json', JSON.stringify(errors, null, 2));
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Offline PWA reload rendered successfully.');

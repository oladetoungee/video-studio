// Screenshots of the real sources she cites (for "real sources highlighted when she cites them").
// node tools/shoot.mjs <url> <out.png> [width] [height] [scrollY]
import puppeteer from '../../../../studio/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
const v = fs.readdirSync(base).sort().reverse()[0];
const exe = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const [url, out, w = 1440, h = 900, sy = 0] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--force-color-profile=srgb'] });
const p = await b.newPage(); await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await p.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36');
await p.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(e => console.error('goto', e.message));
await new Promise(r => setTimeout(r, 2500));
// close cookie banners where possible
await p.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(accept|accept all|agree|got it|ok|i agree|allow all|accept cookies)$/.test(t)) { try { b.click(); } catch (e) {} } } });
await new Promise(r => setTimeout(r, 1200));
if (+sy) await p.evaluate((y) => window.scrollTo(0, y), +sy), await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: out });
const title = await p.title(); console.log(out, title);
await b.close();

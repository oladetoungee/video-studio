// Hi-res crop of one phrase on a real page (for the lens): node phrase.mjs <url> <phrase> <out.png> [dsf=4] [padX=8] [padY=6]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json'); const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } }
const [url, phrase, out, dsf = '4', px = '8', py = '6'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: findChrome(), headless: true }); const pg = await b.newPage(); await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
await pg.setViewport({ width: 1280, height: 1600, deviceScaleFactor: +dsf }); await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
await new Promise(r => setTimeout(r, 1500));
const r = await pg.evaluate((p) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const i = n.textContent.replace(/\u00a0/g, " ").toLowerCase().indexOf(p.toLowerCase()); if (i >= 0) { const g = document.createRange(); g.setStart(n, i); g.setEnd(n, i + p.length); n.parentElement.scrollIntoView({ block: 'center' }); const b = g.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; } } return null; }, phrase);
await new Promise(r => setTimeout(r, 500));
const r2 = await pg.evaluate((p) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const i = n.textContent.replace(/\u00a0/g, " ").toLowerCase().indexOf(p.toLowerCase()); if (i >= 0) { const g = document.createRange(); g.setStart(n, i); g.setEnd(n, i + p.length); const b = g.getBoundingClientRect(); return [b.x + scrollX, b.y + scrollY, b.width, b.height]; } } }, phrase);
await pg.screenshot({ path: out, clip: { x: r2[0] - +px, y: r2[1] - +py, width: r2[2] + 2 * +px, height: r2[3] + 2 * +py } }); console.log(out, r2); await b.close();

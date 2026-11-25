// node cap2.mjs <url> <out> <phrase> [clipH]  -> out.png (1280 wide clip around the phrase, 1.5x), out.json (phrase rects in clip), out.txt (page text)
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json'); const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } }
const [url, out, phrase, clipH = '760'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
const pg = await b.newPage(); await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
await pg.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1.5 });
try { await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }); } catch (e) { console.log('goto', e.message); }
await new Promise(r => setTimeout(r, 2500));
await pg.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(agree|accept|accept all|i agree|got it|ok|allow all|accept all cookies|nõustun|alles akzeptieren|alle akzeptieren)$/.test(t)) { try { b.click(); } catch {} } } });
await new Promise(r => setTimeout(r, 1200));
await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.remove(); } for (const el of document.querySelectorAll('#usercentrics-root,#usercentrics-cmp-ui,aside[id^=usercentrics],[id*=usercentrics],[id*=cookie],[class*=cookie],[id*=consent],[class*=consent]')) el.remove(); document.body.style.overflow = 'auto'; });
await pg.evaluate(() => { document.querySelectorAll('details').forEach(d => d.open = true); document.querySelectorAll('[aria-expanded="false"]').forEach(b => { try { b.click(); } catch {} }); });
await new Promise(r => setTimeout(r, 1200));
fs.writeFileSync(out + '.txt', await pg.evaluate(() => document.body.innerText));
const r = await pg.evaluate((p) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const i = n.textContent.indexOf(p); if (i >= 0) { for (let e = n.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none') e.style.display = 'block'; if (cs.visibility === 'hidden') e.style.visibility = 'visible'; if (e.hidden) e.hidden = false; if (cs.maxHeight === '0px' || parseFloat(cs.height) === 0) { e.style.maxHeight = 'none'; e.style.height = 'auto'; } if (cs.overflow === 'hidden' && e.scrollHeight > e.clientHeight + 4) e.style.overflow = 'visible'; } n.parentElement.scrollIntoView({ block: 'center' }); const rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + p.length); return [...rg.getClientRects()].map(b => [b.x + scrollX, b.y + scrollY, b.width, b.height]); } } return null; }, phrase);
if (!r || !r.length) { console.log('phrase not found'); await b.close(); process.exit(2); }
const H = +clipH; const y0 = Math.max(0, r[0][1] - H / 2);
await new Promise(r => setTimeout(r, 600));
await pg.screenshot({ path: out + '.png', clip: { x: 0, y: y0, width: 1280, height: H }, captureBeyondViewport: true });
fs.writeFileSync(out + '.json', JSON.stringify({ url, phrase, scale: 1.5, rects: r.map(q => [q[0], q[1] - y0, q[2], q[3]]), captured: new Date().toISOString() }));
console.log('ok', JSON.stringify(r)); await b.close();

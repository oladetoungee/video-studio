// Capture a real article page (screenshot of the top of the article) + the boxes of given phrases (for highlights).
// node capture.mjs <url> <out-basename> [phrase1|phrase2...]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const [url, out, phr = ''] = process.argv.slice(2);
const phrases = phr ? phr.split('|') : [];
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
const pg = await browser.newPage();
await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
await pg.setViewport({ width: 1280, height: 1600, deviceScaleFactor: 1.5 });
try { await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }); } catch (e) { console.log('goto:', e.message); }
await new Promise(r => setTimeout(r, 2500));
// accept the consent dialog the normal way (a reader would): click Agree / Accept
await pg.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(agree|accept|accept all|i agree|got it|ok)$/.test(t)) { try { b.click(); } catch {} } } });
await new Promise(r => setTimeout(r, 1200));
for (let y = 0; y < 6000; y += 800) { await pg.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 250)); }
await pg.evaluate(() => scrollTo(0, 0)); await new Promise(r => setTimeout(r, 800));
// remove cookie banners / fixed overlays (they are not the article)
await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.remove(); }
  for (const el of document.querySelectorAll('[id*=cookie],[class*=cookie],[id*=consent],[class*=consent],[class*=newsletter],[class*=paywall]')) el.remove(); document.body.style.overflow = 'auto'; });
const info = await pg.evaluate((phrases) => {
  const h1 = document.querySelector('h1'); const r = h1 ? h1.getBoundingClientRect() : null;
  const found = {};
  for (const p of phrases) { const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = walker.nextNode())) { const i = n.textContent.toLowerCase().indexOf(p.toLowerCase()); if (i >= 0) { const rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + p.length); const rs_ = [...rg.getClientRects()].filter(b => b.width > 0).map(b => [b.x + scrollX, b.y + scrollY, b.width, b.height]); if (rs_.length) { found[p] = rs_; break; } } } }
  return { title: document.title, h1: h1 && h1.textContent.trim(), h1y: r && r.y + scrollY, found, H: document.body.scrollHeight };
}, phrases);
const top = Math.max(0, (info.h1y || 0) - 120); const h = Math.min(2600, info.H - top);
await pg.screenshot({ path: out + '.png', clip: { x: 0, y: top, width: 1280, height: h } });
const focus = {};
for (const [p, rs] of Object.entries(info.found)) { if (!rs.length) continue; const y0 = Math.max(0, rs[0][1] - 520); const slug = p.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24);
  await pg.screenshot({ path: out + '__' + slug + '.png', clip: { x: 0, y: y0, width: 1280, height: 1040 } }); focus[p] = { file: path.basename(out) + '__' + slug + '.png', top: y0, rects: rs.map(r => [r[0], r[1] - y0, r[2], r[3]]) }; }
info.focus = focus;
info.clipTop = top; info.scale = 1.5; info.url = url; info.captured = new Date().toISOString();
fs.writeFileSync(out + '.json', JSON.stringify(info, null, 1)); console.log(JSON.stringify(info).slice(0, 600));
await browser.close();

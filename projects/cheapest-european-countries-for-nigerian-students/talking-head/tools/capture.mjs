// Real official pages for the receipts: one tight crop per source around the paragraph that holds the number she says,
// with the boxes of the words to highlight. Cropped only, never changed. node capture.mjs [name ...]
// Writes ../assets/src/<name>.png + <name>.json ({w, h, hl: [[x,y,w,h]...], src, url, captured}); then node clipsjs.mjs
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
const HERE = path.dirname(new URL(import.meta.url).pathname), OUT = path.join(HERE, '../assets/src');
const SPEC = JSON.parse(fs.readFileSync(path.join(HERE, 'capture-spec.json'), 'utf8'));
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const want = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
for (const s of SPEC) {
  if (want.length && !want.includes(s.name)) continue;
  const pg = await browser.newPage();
  try {
    await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
    await pg.setViewport({ width: s.vw || 1100, height: 1400, deviceScaleFactor: 2 });
    try { await pg.goto(s.url, { waitUntil: 'networkidle2', timeout: 45000 }); } catch (e) { console.log(s.name, 'goto:', e.message); }
    await new Promise(r => setTimeout(r, 2000));
    await pg.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(agree|accept|accept all|allow all|i agree|got it|ok|alle akzeptieren|accepter|tout accepter|nõustun)$/.test(t)) { try { b.click(); } catch {} } } });
    await new Promise(r => setTimeout(r, 1000));
    if (s.open) await pg.evaluate(() => { for (const el of document.querySelectorAll('details')) el.open = true; for (const el of document.querySelectorAll('[aria-expanded=false]')) { try { el.click(); } catch {} } });
    await new Promise(r => setTimeout(r, 800));
    await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const st = getComputedStyle(el); if (st.position === 'fixed' || st.position === 'sticky') el.remove(); }
      for (const el of document.querySelectorAll('[id*=cookie],[class*=cookie],[id*=consent],[class*=consent],[id*=Cookie],[class*=Cookie]')) el.remove(); });
    const info = await pg.evaluate((s) => {
      const low = (x) => x.toLowerCase().replace(/[\s\u00a0\u202f]+/g, ' ');
      const findText = (p) => { if (!document.body) return null; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const tx = low(n.textContent); const i = tx.indexOf(low(p)); if (i >= 0 && (s.any || n.parentElement.offsetParent !== null)) { const rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + p.length); return { n, rects: [...rg.getClientRects()].map(b => [b.x + scrollX, b.y + scrollY, b.width, b.height]) }; } } return null; };
      let a = null; for (const p of [s.anchor, ...s.hl].filter(Boolean)) { a = findText(p); if (a) break; } if (!a) return { err: 'anchor not found: ' + (s.anchor || s.hl[0]) };
      let el = a.n.parentElement; const blockTags = /^(P|LI|TD|TR|DD|DT|H1|H2|H3|H4|SECTION|ARTICLE|DIV|TABLE|UL|OL|BLOCKQUOTE)$/;
      while (el && !blockTags.test(el.tagName)) el = el.parentElement;
      for (let k = 0; k < (s.up || 0) && el.parentElement; k++) el = el.parentElement;
      const r = el.getBoundingClientRect(); const box = [r.x + scrollX, r.y + scrollY, r.width, r.height];
      const hls = []; for (const p of s.hl) { const f = findText(p); if (f) hls.push(...f.rects); }
      return { box, hls, title: document.title };
    }, s);
    if (info.err) { console.log(s.name, info.err); await pg.close(); continue; }
    const pad = 22, [bx, by, bw, bh] = info.box; const x = Math.max(0, bx - pad), y = Math.max(0, by - pad), w = Math.min((s.vw || 1100) - x, bw + 2 * pad), h = Math.min(s.maxH || 520, bh + 2 * pad);
    await pg.screenshot({ path: path.join(OUT, s.name + '.png'), clip: { x, y, width: w, height: h } });
    const meta = { w: Math.round(w * 2), h: Math.round(h * 2), hl: info.hls.filter(q => q[1] - y < h).map(q => [Math.round((q[0] - x) * 2), Math.round((q[1] - y) * 2), Math.round(q[2] * 2), Math.round(q[3] * 2)]), src: s.src, url: s.url, captured: new Date().toISOString(), title: info.title };
    fs.writeFileSync(path.join(OUT, s.name + '.json'), JSON.stringify(meta)); console.log(s.name, 'ok', meta.w + 'x' + meta.h, meta.hl.length, 'highlights');
  } catch (e) { console.log(s.name, 'ERR', e.message); }
  await pg.close();
}
await browser.close();

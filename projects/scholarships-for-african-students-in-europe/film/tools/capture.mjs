// Real article clippings for the film: the paragraph (or headline) that holds a phrase, captured at 2x, plus the
// phrase's line boxes for the highlighter. Nothing on the page is altered (cookie banners / fixed bars removed only).
// scholarships: node tools/capture.mjs [name ...] -> assets/src/<name>.png + data/clips.json ; TEXT=1 dumps each page's text to build/pages/<key>.txt
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const OUT = path.join(ROOT, 'assets/src'); fs.mkdirSync(OUT, { recursive: true });
const DB = path.join(ROOT, 'data/clips.json');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const U = {
  emguide: 'https://erasmus-plus.ec.europa.eu/programme-guide/part-b/key-action-1/erasmus-mundus-joint-masters',
  emstud: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters-scholarships',
  emcat: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
  aiss: 'https://aissprogram.eu/how-to-apply/',
  daad: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777',
  si: 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/',
  nl: 'https://www.studyinnl.org/finances/nl-scholarship',
  nlall: 'https://studyinnl.org/finances/scholarships',
  hu: 'https://abuja.mfa.gov.hu/en/articles/general-information-and-faq-of-the-stipendium-hungaricum-scholarship-program',
  harno: 'https://harno.ee/en/scholarships-and-grants/higher-education/estonian-government-scholarships',
  chev: 'https://www.chevening.org/scholarships/application-timeline/',
  uad: 'https://www.universityadmissions.se/en/',
  sie: 'https://www.studyinestonia.ee/en/scholarships',
  harno2: 'https://harno.ee/en/scholarships-and-grants',
};
// name: [page, source credit, date, block phrase (or 'h1'), [highlight phrases]]
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/capture-spec.json'), 'utf8'));
const only = process.argv.slice(2);
const db = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, 'utf8')) : {};
const byPage = {}; for (const [n, s] of Object.entries(SPEC)) if (!only.length || only.includes(n)) (byPage[s[0]] = byPage[s[0]] || []).push(n);
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
for (const [pk, names] of Object.entries(byPage)) {
  const pg = await browser.newPage();
  await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
  await pg.setViewport({ width: 1280, height: 1400, deviceScaleFactor: 2 });
  await pg.setRequestInterception(true);
  pg.on('request', r => { const u = r.url(); if (/doubleclick|googlesyndication|adservice|taboola|outbrain|amazon-adsystem|criteo|pubmatic|rubicon|scorecardresearch|chartbeat|hotjar|facebook\.net/.test(u)) r.abort(); else r.continue(); });
  pg.on('dialog', d => d.dismiss().catch(() => {}));
  try { await pg.goto(U[pk], { waitUntil: 'networkidle2', timeout: 90000 }); } catch (e) { console.log(pk, 'goto:', e.message); }
  await new Promise(r => setTimeout(r, 2000));
  await pg.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(agree|accept|accept all|i agree|got it|ok|reject all)$/.test(t)) { try { b.click(); } catch {} } } });
  await new Promise(r => setTimeout(r, 800));
  for (let y = 0; y < 5000; y += 700) { await pg.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 200)); }
  await pg.evaluate(() => scrollTo(0, 0)); await new Promise(r => setTimeout(r, 600));
  await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.remove(); }
    for (const el of document.querySelectorAll('body [id*=cookie],body [class*=cookie],body [id*=consent],body [class*=consent],body [class*=newsletter],body [class*=paywall]')) el.remove(); if (document.body) document.body.style.overflow = "auto"; }).catch(e => console.log("clean", e.message));
  if (process.env.TEXT) { fs.mkdirSync(path.join(ROOT, 'build/pages'), { recursive: true }); fs.writeFileSync(path.join(ROOT, 'build/pages', pk + '.txt'), await pg.evaluate(() => (document.body ? document.body.innerText : "NO BODY " + location.href)).catch(e => "ERR " + e.message)); console.log(pk, 'text saved'); }
  for (const name of names) {
    const [, source, date, block, hls] = SPEC[name];
    const info = await pg.evaluate((block, hls) => {
      let el = null;
      if (block === 'h1') el = document.querySelector('h1');
      else { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const pe = n.parentElement; if (pe && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(pe.tagName)) continue; if (n.textContent.includes(block)) { el = pe; break; } } }
      if (!el) { // phrase split over nodes: match on an element's text
        for (const e of document.querySelectorAll('p, li, h1, h2, h3, blockquote, td')) if (e.textContent.includes(block)) { el = e; break; } }
      if (!el) return null;
      while (el && !/^(P|LI|H1|H2|H3|BLOCKQUOTE|TD|FIGCAPTION)$/.test(el.tagName) && el.parentElement && el.getBoundingClientRect().width < 500) el = el.parentElement;
      el.scrollIntoView({ block: 'center' }); document.querySelectorAll('[data-cap]').forEach(e => e.removeAttribute('data-cap')); el.setAttribute('data-cap', '1');
      const r = el.getBoundingClientRect(); const box = [r.x + scrollX, r.y + scrollY, r.width, r.height];
      const rects = [];
      for (const ph of hls) { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; const full = el.textContent; if (!full.includes(ph)) continue;
        // walk the text nodes to map the phrase's character range onto ranges
        let pos = 0; const start = full.indexOf(ph), end = start + ph.length; const rg = document.createRange(); let set0 = false;
        while ((n = w.nextNode())) { const L = n.textContent.length; if (!set0 && start < pos + L) { rg.setStart(n, start - pos); set0 = true; } if (set0 && end <= pos + L) { rg.setEnd(n, end - pos); break; } pos += L; }
        for (const b of rg.getClientRects()) if (b.width > 2) rects.push([b.x + scrollX, b.y + scrollY, b.width, b.height]); }
      return { box, rects, text: el.textContent.trim().slice(0, 400), tag: el.tagName };
    }, block, hls);
    if (!info) { console.log(name, 'NOT FOUND'); continue; }
    const pad = 22; const [bx, by, bw, bh] = info.box;
    let clip = { x: Math.max(0, bx - pad), y: Math.max(0, by - pad), width: Math.min(1280, bw + 2 * pad), height: bh + 2 * pad };
    if (bh > 700 && info.rects.length) { const ry = info.rects[0][1]; clip = { x: clip.x, y: Math.max(0, ry - 110), width: clip.width, height: 300 }; }
    if (process.env.ELEM) {   // element screenshot (exact even when the page shifts); highlight boxes re-measured relative to it
      await new Promise(r => setTimeout(r, 600));
      const rel = await pg.evaluate((hls) => { const el = document.querySelector('[data-cap]'); const R = el.getBoundingClientRect(); const out = [];
        for (const ph of hls) { const full = el.textContent; const i = full.indexOf(ph); if (i < 0) continue; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n, pos = 0, s0 = false; const rg = document.createRange();
          while ((n = w.nextNode())) { const L = n.textContent.length; if (!s0 && i < pos + L) { rg.setStart(n, i - pos); s0 = true; } if (s0 && i + ph.length <= pos + L) { rg.setEnd(n, i + ph.length - pos); break; } pos += L; }
          for (const b of rg.getClientRects()) if (b.width > 2) out.push([b.x - R.x, b.y - R.y, b.width, b.height]); }
        return { w: R.width, h: R.height, out }; }, hls);
      const h = await pg.$('[data-cap]'); await h.screenshot({ path: path.join(OUT, name + '.png') });
      clip = { x: 0, y: 0, width: rel.w, height: rel.h }; info.rects = rel.out.map(r => [r[0], r[1], r[2], r[3]]);
    } else await pg.screenshot({ path: path.join(OUT, name + '.png'), clip });
    const S = 2; const hl = []; // merge rects on the same line
    for (const r of info.rects) { const q = [Math.round((r[0] - clip.x) * S), Math.round((r[1] - clip.y) * S), Math.round(r[2] * S), Math.round(r[3] * S)];
      const last = hl[hl.length - 1]; if (last && Math.abs(last[1] - q[1]) < 6 && q[0] <= last[0] + last[2] + 12) { last[2] = q[0] + q[2] - last[0]; } else hl.push(q); }
    db[name] = { file: 'assets/src/' + name + '.png', w: Math.round(clip.width * S), h: Math.round(clip.height * S), hl, source, date, url: U[pk], tag: info.tag, text: info.text, captured: new Date().toISOString() };
    console.log(name, info.tag, db[name].w + 'x' + db[name].h, 'hl', hl.length, '|', info.text.slice(0, 110));
    fs.writeFileSync(DB, JSON.stringify(db, null, 1));
  }
  await pg.close();
}
await browser.close();

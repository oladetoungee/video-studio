#!/usr/bin/env node
// Text-on-text collision sweep for a film (CHECKS `text-collision`, 2026-10-26: Gbemi saw a small label sitting behind the
// giant OCTOBER and a tag cut off at the frame edge). Draws the film in headless Chrome with the editor's element boxes on
// (?elements=1) and, every --every seconds, reports:
//   overlap  two visible texts (alpha >= 0.5) whose boxes overlap by more than --px in both directions
//   cut      a visible text whose box leaves the frame
// node studio/tools/textcollide.mjs <slug> [--aspect 16x9|9x16|both] [--every 0.2] [--px 6] [--from s --to s]
// -> projects/<slug>/film/build/qa/textcollide_<aspect>.json (one entry per scene + pair, first and last time seen)
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const ROOT = path.dirname(STUDIO);
const args = process.argv.slice(2); const slug = args[0]; const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const every = +opt('every', 0.2), PX = +opt('px', 6), aspects = opt('aspect', 'both') === 'both' ? ['16x9', '9x16'] : [opt('aspect')];
const DIMS = { '16x9': [1920, 1080], '9x16': [1080, 1920] };
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const { start } = await import(path.join(STUDIO, 'server.mjs')); const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
let total = 0;
for (const aspect of aspects) {
  const pg = await browser.newPage(); const [w, h] = DIMS[aspect]; await pg.setViewport({ width: w, height: h });
  await pg.goto(`${base}/render/${slug}?aspect=${aspect}&elements=1`, { waitUntil: 'load' }); await pg.waitForFunction('window.READY === true', { timeout: 90000 });
  const T = await pg.evaluate('TOTAL'); const t0 = +opt('from', 0), t1 = +opt('to', T);
  const found = await pg.evaluate((t0, t1, every, PX) => {
    const out = {}; const CWp = CW, CHp = CH;
    for (let t = t0; t < t1; t += every) {
      window.QA_TEXT = []; renderFrame(t); const sc = SCENES[sceneIndex(t)];   // QA_TEXT: a film's own raw texts / rules (optional qaBox() in its kit)
      const all = EL.list.concat(window.QA_TEXT).filter(e => !e.hidden && (e.a == null || e.a >= 0.5) && e.w > 2 && e.h > 1);
      const tx = all.filter(e => e.kind === 'text' || e.kind === 'qa-text').map(e => { if (!e.markup) return e;   // KT blocks: drop the descender room under the last line (display caps have none)
        const n = String(e.def || e.text || '').split('\n').length; const s_ = e.h / ((n - 1) * 0.92 + 1.1); return { ...e, h: e.h - 0.2 * s_ }; });
      const rules = all.filter(e => e.kind === 'qa-line');
      const add = (key, rec) => { const o = out[key]; if (o) { o.last = +t.toFixed(2); o.n++; } else out[key] = { ...rec, first: +t.toFixed(2), last: +t.toFixed(2), n: 1 }; };
      for (const e of tx) if (e.kind === 'text' && (e.x < -2 || e.y < -2 || e.x + e.w > CWp + 2 || e.y + e.h > CHp + 2)) add(sc.id + ' cut ' + e.id, { scene: sc.id, kind: 'cut', a: e.id, text: (e.text || '').slice(0, 40), box: [e.x, e.y, e.w, e.h].map(Math.round) });
      for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) { const a = tx[i], b = tx[j]; if (a.id === b.id) continue;
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (a.kind === 'qa-text' && b.kind === 'qa-text') continue;   // the film's own raw texts against each other: a designed grid
        if (ox > PX && oy > PX) add(sc.id + ' overlap ' + a.id + ' | ' + b.id, { scene: sc.id, kind: 'overlap', a: a.id, b: b.id, ta: (a.text || '').slice(0, 30), tb: (b.text || '').slice(0, 30), px: [Math.round(ox), Math.round(oy)] }); }
      for (const a of tx) for (const r of rules) { const ox = Math.min(a.x + a.w, r.x + r.w) - Math.max(a.x, r.x), oy = Math.min(a.y + a.h, r.y + r.h) - Math.max(a.y, r.y);
        if (ox > PX && oy > 0) add(sc.id + ' on-rule ' + a.id + ' | ' + r.id, { scene: sc.id, kind: 'overlap', a: a.id, b: r.id, ta: (a.text || '').slice(0, 30), tb: r.text, px: [Math.round(ox), Math.round(oy)] }); }
      // a text that touches a qa-text from above or below with less than PX of air also counts (her OCTOBER sitting on the weekday row)
      for (const a of tx) for (const b of tx) { if (a === b || a.id === b.id || (a.kind === 'qa-text' && b.kind === 'qa-text')) continue; const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x); const gap = b.y - (a.y + a.h);
        if (ox > PX && gap > -PX && gap < PX && (a.kind === 'qa-text' || b.kind === 'qa-text')) add(sc.id + ' touch ' + a.id + ' | ' + b.id, { scene: sc.id, kind: 'overlap', a: a.id, b: b.id, ta: (a.text || '').slice(0, 30), tb: (b.text || '').slice(0, 30), px: [Math.round(ox), Math.round(gap)] }); }
    }
    return Object.values(out);
  }, t0, t1, every, PX);
  const dir = path.join(ROOT, 'projects', slug, 'film/build/qa'); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `textcollide_${aspect}.json`), JSON.stringify(found, null, 1));
  console.log(`${aspect}: ${found.length} collisions (${found.filter(f => f.kind === 'overlap').length} overlaps, ${found.filter(f => f.kind === 'cut').length} cut at the frame edge)`);
  for (const f of found.slice(0, 60)) console.log('  ', f.kind, f.scene, f.first + '-' + f.last + 's', f.kind === 'cut' ? JSON.stringify(f.text) + ' ' + f.box : JSON.stringify(f.ta) + ' x ' + JSON.stringify(f.tb) + ' ' + f.px);
  total += found.length; await pg.close();
}
await browser.close(); srv.close(); process.exit(0);

// Safe-area check (CHECKS.md text-safe-area): every visible element box at the middle and end of each screen.
// portrait: inside y 370..1440 (x 0..1080); landscape: >= 96 px from left/right, >= 54 px from top/bottom.
// node tools/safearea.mjs [9x16|16x9]   (starts its own studio server on a free port)
import puppeteer from '../../../../studio/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const STUDIO = path.resolve('../../../studio'); const { start } = await import(path.join(STUDIO, 'server.mjs'));
const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const aspect = process.argv[2] || '9x16'; const P = aspect === '9x16';
const exe = (() => { const b = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const v = fs.readdirSync(b).sort().reverse()[0]; return path.join(b, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); })();
const br = await puppeteer.launch({ executablePath: exe, headless: true });
const pg = await br.newPage(); await pg.setViewport({ width: P ? 1080 : 1920, height: P ? 1920 : 1080 });
await pg.goto(`${base}/render/ux-research?aspect=${aspect}&elements=1`); await pg.waitForFunction('window.READY === true', { timeout: 120000 });
const out = await pg.evaluate((P) => {
  const res = []; const m = meta();
  for (const s of m.SCENES) for (const f of [0.5, 0.98]) { const t = s.start + (s.end - s.start) * f; renderFrame(t);
    for (const b of EL.list) { if (b.hidden || b.a < 0.5 || b.kind === 'caption') continue;
      const bad = P ? (b.y < 370 - 2 || b.y + b.h > 1440 + 2 || b.x < -2 || b.x + b.w > 1082) : (b.x < 96 - 2 || b.x + b.w > 1824 + 2 || b.y < 54 - 2 || b.y + b.h > 1026 + 2);
      const vis = P ? (b.y + b.h > 0 && b.y < 1920 && b.x + b.w > 0 && b.x < 1080) : (b.y + b.h > 0 && b.y < 1080 && b.x + b.w > 0 && b.x < 1920);
      const ix = Math.max(0, Math.min(b.x + b.w, P ? 1080 : 1920) - Math.max(b.x, 0)), iy = Math.max(0, Math.min(b.y + b.h, P ? 1920 : 1080) - Math.max(b.y, 0));
      const mostlyIn = ix * iy >= 0.6 * b.w * b.h;   // a box mostly off the frame is being panned away, not meant to be read
      if (bad && vis && mostlyIn) res.push({ scene: s.id, t: +t.toFixed(2), id: b.id, box: [b.x, b.y, b.w, b.h].map(Math.round) }); } }
  return res; }, P);
const by = {}; for (const r of out) { (by[r.scene] = by[r.scene] || new Set()).add(r.id + ' ' + JSON.stringify(r.box)); }
for (const [s, v] of Object.entries(by)) console.log(s, [...v].slice(0, 8).join(' | '));
console.log(aspect, 'boxes outside:', out.length);
await br.close(); srv.close();

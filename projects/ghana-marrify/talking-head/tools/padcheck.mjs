#!/usr/bin/env node
// 9:16 check: frames where the "window" framing (camera pad) shows the paper strip under her picture without a panel
// or card covering it.   node projects/ghana-marrify/talking-head/tools/padcheck.mjs m01 [m02 ...]
import path from 'node:path'; import os from 'node:os'; import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const puppeteer = (await import(path.join(ROOT, 'studio/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'))).default;
const { start } = await import(path.join(ROOT, 'studio/server.mjs')); const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const chromeDir = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const v = fs.readdirSync(chromeDir).sort().reverse()[0];
const browser = await puppeteer.launch({ executablePath: path.join(chromeDir, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), headless: true });
for (const id of process.argv.slice(2)) {
  const page = await browser.newPage(); await page.setViewport({ width: 1080, height: 1920 });
  await page.goto(`${base}/studio/runtime/moment.html?m=/p/ghana-marrify/talking-head/talking-head.json&id=${id}&aspect=9x16&captions=0`);
  await page.waitForFunction('window.READY === true');
  const r = await page.evaluate(`(() => { const out = []; const cv = document.getElementById('c'); const x = cv.getContext('2d');
    for (let f = 0; f < TOTAL * 30; f++) { const t = f / 30; const fr = footRect(t); if (fr.y + fr.h >= H - 2) continue;
      renderMoment(t); const y0 = Math.ceil(fr.y + fr.h) + 4; const d = x.getImageData(0, y0, CW, Math.min(40, CH - y0)).data; let on = 0, n = 0;
      for (let i = 3; i < d.length; i += 16) { n++; if (d[i] > 200) on++; }
      if (on / n < 0.97) out.push(+t.toFixed(2)); }
    return out; })()`);
  console.log(id, 'pad', r.length ? JSON.stringify(r) : 'ok');
  await page.close();
  for (const aspect of ['9x16', '16x9']) {
    const pg = await browser.newPage(); await pg.setViewport(aspect === '9x16' ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 });
    await pg.goto(`${base}/studio/runtime/moment.html?m=/p/ghana-marrify/talking-head/talking-head.json&id=${id}&aspect=${aspect}&captions=1&elements=1`);
    await pg.waitForFunction('window.READY === true');
    const ov = await pg.evaluate(`(() => { const seen = new Map(); EL.rec = true;
      for (let f = 0; f < TOTAL * 30; f += 3) { const t = f / 30; renderMoment(t);
        const T = EL.list.filter(b => !b.hidden && (b.kind === 'text' || b.kind === 'caption') && b.w > 4 && b.h > 4);
        for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) { const a = T[i], b = T[j];
          const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ix > -10 && iy > 6) { const k = a.id + ' x ' + b.id; if (!seen.has(k)) seen.set(k, +t.toFixed(1)); } }
        // text running out of its own card/box
        for (const bx of EL.list.filter(b => !b.hidden && b.kind === 'box' && !b.img)) for (const b of T) { const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
          if (cx > bx.x && cx < bx.x + bx.w && cy > bx.y && cy < bx.y + bx.h && (b.x < bx.x - 2 || b.x + b.w > bx.x + bx.w + 2)) { const k = 'outofbox ' + b.id + ' in ' + bx.id; if (!seen.has(k)) seen.set(k, +t.toFixed(1)); } }
        // text leaving the frame / the 9:16 safe zone
        for (const b of T) { if (b.kind === 'caption') continue; const bad = b.x < 0 || b.x + b.w > W + 1 || (PORTRAIT && (b.x + b.w > 950 || b.y + b.h > 1650) && !SCENES[sceneIndex(t)].card); if (bad) { const k = 'edge ' + b.id; if (!seen.has(k)) seen.set(k, +t.toFixed(1)); } } }
      return [...seen.entries()]; })()`);
    console.log(id, aspect, 'overlaps', ov.length ? JSON.stringify(ov) : 'none');
    await pg.close();
  }
}
await browser.close(); srv.close(); process.exit(0);

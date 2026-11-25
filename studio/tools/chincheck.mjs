// Captions vs her face in fitted frames (1:1, 4:5): composite check compares caption boxes (canvas px) with faceOut()
// (layout px), which differ when the 9:16 layout is fitted. This maps her face box through BASE first.
// Her chin = 0.88 of the tracked face box (the box runs down her neck).
// node studio/tools/chincheck.mjs <slug> <id> <aspect> [step]  -> JSON {hits: [[t, caption id, share of face box]], runs}
import path from 'node:path'; import fs from 'node:fs'; import os from 'node:os';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { start } = await import(path.join(ROOT, 'studio/server.mjs'));
const puppeteer = (await import(path.join(ROOT, 'studio/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'))).default;
const [slug, id, aspect, step = '0.2'] = process.argv.slice(2);
const DIMS = { '9x16': [1080, 1920], '1x1': [1080, 1080], '4x5': [1080, 1350], '16x9': [1920, 1080] };
const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const b2 = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const exe = fs.readdirSync(b2).sort().reverse().map(v => path.join(b2, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(p => fs.existsSync(p));
const br = await puppeteer.launch({ executablePath: exe, headless: true }); const pg = await br.newPage(); await pg.setViewport({ width: DIMS[aspect][0], height: DIMS[aspect][1] });
await pg.goto(`${base}/studio/runtime/moment.html?` + new URLSearchParams({ m: `/p/${slug}/talking-head/talking-head.json`, id, aspect, captions: '1', elements: '1' }), { waitUntil: 'load' });
await pg.waitForFunction('window.READY===true', { timeout: 90000 });
const r = await pg.evaluate((step) => { const hits = [];
  for (let t = 0; t < TOTAL; t += step) { SHOW.captions = true; EL.list = []; EL.rec = true; renderMoment(t); const sc = SCENES[sceneIndex(t)]; if (sc && (sc.card || sc.cover)) continue;
    const f = faceOut(t); const X = (x) => x * BASE[0] + BASE[4], Y = (y) => y * BASE[3] + BASE[5];
    const fx0 = X(f.x + f.w * 0.08), fx1 = X(f.x + f.w * 0.92), fy0 = Y(f.y + f.h * 0.05), fy1 = Y(f.y + f.h * 0.88), fa = (fx1 - fx0) * (fy1 - fy0);
    for (const b of EL.list) { if (b.hidden || !String(b.id).startsWith('caption')) continue; const ix = Math.max(0, Math.min(fx1, b.x + b.w) - Math.max(fx0, b.x)), iy = Math.max(0, Math.min(fy1, b.y + b.h) - Math.max(fy0, b.y));
      if (ix * iy > 0.01 * fa) hits.push([+t.toFixed(1), b.id, +(ix * iy / fa).toFixed(2), Math.round(b.y), Math.round(fy1)]); } }
  return hits; }, +step);
const runs = []; for (const h of r) { const l = runs[runs.length - 1]; if (l && h[0] - l[1] <= +step + 0.01) { l[1] = h[0]; l[2] = Math.max(l[2], h[2]); } else runs.push([h[0], h[0], h[2]]); }
console.log(JSON.stringify({ slug, id, aspect, hits: r.length, runs }));
await br.close(); srv.close(); process.exit(0);

// Shorts v3 text check (2026-11-12 night, her notes: labels fell into the picture, fonts on top of each other).
// For every 0.25 s of a short (captions ON, cover included): every visible text box (label, captions, graphics' words, cover lines)
//  - overlaps no other text box (> 2 % of the smaller one),
//  - labels ('label/...') sit inside the top band (y 80-440),
//  - no text over her face box (except the cover, which is checked by eye).
// No 4K read, no render lock (graphics layer only). Optional: --grab t,t,... <dir> saves those frames' graphics as PNG.
//   node tools/v3check.mjs <id|all> [--grab 0.03,5,12 dir]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const ROOT = '/Users/gbemi/Desktop/CODE/videos'; const require = createRequire(ROOT + '/studio/package.json'); const puppeteer = require('puppeteer-core');
const args = process.argv.slice(2); const gi = args.indexOf('--grab'); const grab = gi >= 0 ? { ts: args[gi + 1].split(',').map(Number), dir: args[gi + 2] } : null;
const ids = args[0] === 'all' ? ['sh01', 'sh02', 'sh03', 'sh04', 'sh05', 'sh06', 'sh07', 'sh08'] : [args[0]];
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const v = fs.readdirSync(base).sort().reverse()[0];
const { start } = await import(ROOT + '/studio/server.mjs'); const srv = await start(0); const url = `http://127.0.0.1:${srv.address().port}`;
const b = await puppeteer.launch({ executablePath: path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), headless: true, args: ['--force-color-profile=srgb'] });
let bad = 0;
for (const id of ids) {
  const pg = await b.newPage(); await pg.setViewport({ width: 1080, height: 1920 });
  pg.on('pageerror', e => console.error('[page]', e.message)); pg.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
  const q = new URLSearchParams({ m: '/p/should-you-learn-to-code-in-2027/talking-head/talking-head.json', id, aspect: '9x16', captions: '1' });
  await pg.goto(`${url}/studio/runtime/moment.html?${q}`, { waitUntil: 'load' }); await pg.waitForFunction('window.READY === true', { timeout: 90000 });
  const r = await pg.evaluate(`(() => {
    EL.rec = true; const out = { collide: [], band: [], face: [], labelMaxBottom: 0, n: 0 }; const seen = new Set();
    const ts = [0.03]; for (let t = 0.12; t < FOOT.dur - 0.05; t += 0.25) ts.push(+t.toFixed(2));
    for (const t of ts) { SHOW.captions = true; renderMoment(t); out.n++;
      const tx = EL.list.filter(q => !q.hidden && q.text != null && String(q.text).trim() && q.w > 4 && q.h > 4 && (q.a == null || q.a > 0.3));
      for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) { const A = tx[i], B = tx[j];
        const ix = Math.max(0, Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x)), iy = Math.max(0, Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y));
        if (ix * iy > 0.02 * Math.min(A.w * A.h, B.w * B.h)) { const k = A.id + '|' + B.id; if (!seen.has(k)) { seen.add(k); out.collide.push([t, A.id, B.id, Math.round(ix), Math.round(iy)]); } } }
      for (const L of tx.filter(q => String(q.id).startsWith('label/'))) { out.labelMaxBottom = Math.max(out.labelMaxBottom, Math.round(L.y + L.h));
        if (L.y + L.h > 440 || L.y < 60 || L.x < 20 || L.x + L.w > W - 20) { const k = 'band' + L.id; if (!seen.has(k)) { seen.add(k); out.band.push([t, L.id, Math.round(L.x), Math.round(L.y), Math.round(L.w), Math.round(L.h)]); } } }
      const sc = SCENES[sceneIndex(t)]; if (t < 0.1 || (sc && (sc.cover || sc.card))) continue;
      const f = faceOut(t); if (!f || !f.w) continue;
      for (const L of tx.filter(q => String(q.id).startsWith('label/'))) { const head = f.y - f.h * 0.5;   // hair / headband above the face box
        if (L.y + L.h > head && L.x < f.x + f.w && L.x + L.w > f.x) { const k = 'head' + L.id + Math.round(t); if (!seen.has(k)) { seen.add(k); out.band.push([t, L.id, 'over her head by', Math.round(L.y + L.h - head)]); } } } const fx0 = f.x + f.w * 0.08, fx1 = f.x + f.w * 0.92, fy0 = f.y + f.h * 0.05, fy1 = f.y + f.h * 0.95;
      for (const q of tx) { const ix = Math.max(0, Math.min(fx1, q.x + q.w) - Math.max(fx0, q.x)), iy = Math.max(0, Math.min(fy1, q.y + q.h) - Math.max(fy0, q.y));
        if (ix * iy > 0.01 * f.w * f.h) { const k = 'face' + q.id + Math.round(t); if (!seen.has(k)) { seen.add(k); out.face.push([t, q.id, +(ix * iy / (f.w * f.h)).toFixed(2)]); } } } }
    return out; })()`);
  const ok = !r.collide.length && !r.band.length && !r.face.length; if (!ok) bad++;
  console.log(JSON.stringify({ id, pass: ok, frames: r.n, labelMaxBottom: r.labelMaxBottom, collide: r.collide.slice(0, 20), band: r.band.slice(0, 10), face: r.face.slice(0, 20) }));
  if (grab) { fs.mkdirSync(grab.dir, { recursive: true }); for (const t of grab.ts) { const u = await pg.evaluate(`window.grab(${t}, null)`); fs.writeFileSync(path.join(grab.dir, `${id}_g${String(t).padStart(5, '0')}.png`), Buffer.from(u.slice(u.indexOf(',') + 1), 'base64')); } }
  await pg.close();
}
await b.close(); srv.close(); process.exit(bad ? 1 : 0);

#!/usr/bin/env node
// Dead-hold and dark-span check (renders the film headless, camera push OFF so only real changes count).
//   node tools/holds.mjs [--aspect 16x9|9x16|both] [--fps 5] [--max 4] [--thr 0.35]
// A "hold" is a run of samples where the frame differs from the frame --lag seconds earlier (default 1 s) by less than
// --thr (mean abs luma diff, 0-255, on a 192 px thumbnail), longer than --max seconds. A "dark span" is a run where under 2 % of the
// pixels are brighter than 10 % (what ffmpeg blackdetect calls black), longer than 2 s.
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..');
const STUDIO = path.join(ROOT, 'studio');
const require = createRequire(path.join(STUDIO, 'package.json'));
const puppeteer = require('puppeteer-core');
import fs from 'node:fs'; import os from 'node:os';
const args = process.argv.slice(2); const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const FPS = +opt('fps', 5), MAX = +opt('max', 4), THR = +opt('thr', 0.5), LAG = Math.max(1, Math.round(FPS * +opt('lag', 1))); const aspects = opt('aspect', 'both') === 'both' ? ['16x9', '9x16'] : [opt('aspect')];
function chrome() { const b = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(b).sort().reverse()) { const p = path.join(b, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const { start } = await import(path.join(STUDIO, 'server.mjs')); const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await puppeteer.launch({ executablePath: chrome(), headless: true });
const report = {};
try {
  for (const a of aspects) {
    const page = await browser.newPage(); const [w, h] = a === '16x9' ? [1920, 1080] : [1080, 1920];
    await page.setViewport({ width: w, height: h });
    await page.goto(`${base}/render/ghana-marrify?aspect=${a}&edits=0`, { waitUntil: 'load' }); await page.waitForFunction('window.READY === true', { timeout: 90000 });
    const r = await page.evaluate(`(() => { NO_PUSH = true; const cv = document.getElementById('c'); const sw = ${a === '16x9' ? 192 : 108}, sh = ${a === '16x9' ? 108 : 192};
      const s = document.createElement('canvas'); s.width = sw; s.height = sh; const x = s.getContext('2d', { willReadFrequently: true });
      const hist = []; const out = [];
      // portrait: only the content area counts (the platform UI bands are empty by design)
      const y0 = ${a === '9x16' ? 'Math.round(sh * 370 / 1920)' : 0}, y1 = ${a === '9x16' ? 'Math.round(sh * 1440 / 1920)' : 'sh'};
      for (let f = 0; f * (1 / ${FPS}) < TOTAL; f++) { const t = f / ${FPS}; renderFrame(t); x.drawImage(cv, 0, 0, sw, sh);
        const d = x.getImageData(0, y0, sw, y1 - y0).data; const g = new Float32Array(d.length / 4); let lit = 0;
        for (let i = 0; i < g.length; i++) { g[i] = 0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]; if (g[i] > 25.5) lit++; }
        const prev = hist.length >= ${LAG} ? hist[hist.length - ${LAG}] : null; const hist2 = new Uint32Array(64); for (let i = 0; i < g.length; i++) hist2[Math.min(63, g[i] >> 2)]++; let mode = 0; for (let b = 1; b < 64; b++) if (hist2[b] > hist2[mode]) mode = b; let ink = 0; for (let i = 0; i < g.length; i++) if (Math.abs(g[i] - (mode * 4 + 2)) > 14) ink++; let diff = 99; if (prev) { diff = 0; for (let i = 0; i < g.length; i++) diff += Math.abs(g[i] - prev[i]); diff /= g.length; }
        let bx0 = 1e9, bx1 = -1, by0 = 1e9, by1 = -1; const rw = sw, rh2 = (y1 - y0); const md = mode * 4 + 2;
        for (let yy = 0; yy < rh2; yy++) for (let xx = 0; xx < rw; xx++) { if (Math.abs(g[yy * rw + xx] - md) > 14) { if (xx < bx0) bx0 = xx; if (xx > bx1) bx1 = xx; if (yy < by0) by0 = yy; if (yy > by1) by1 = yy; } }
        const covW = bx1 < 0 ? 0 : (bx1 - bx0 + 1) / rw, covH = by1 < 0 ? 0 : (by1 - by0 + 1) / rh2;
        out.push([+t.toFixed(2), +diff.toFixed(3), +(lit / g.length).toFixed(4), sceneIndex(t) + 1, +(ink / g.length).toFixed(4), +covW.toFixed(3), +covH.toFixed(3)]); hist.push(g); if (hist.length > ${LAG} + 1) hist.shift(); }
      return out; })()`);
    let s0 = null; const holds = [];
    for (let i = 1; i <= r.length; i++) { const q = i < r.length && r[i][1] < THR; if (q && s0 == null) s0 = i - 1; if (!q && s0 != null) { const d = r[i - 1][0] - r[s0][0]; if (d > MAX) holds.push({ t0: r[s0][0], t1: r[i - 1][0], d: +d.toFixed(1), scene: r[s0][3] }); s0 = null; } }
    const dark = []; s0 = null;
    for (let i = 0; i <= r.length; i++) { const q = i < r.length && r[i][2] < 0.02; if (q && s0 == null) s0 = i; if (!q && s0 != null) { const d = r[i - 1][0] - r[s0][0]; if (d > 2) dark.push({ t0: r[s0][0], t1: r[i - 1][0], d: +d.toFixed(1), scene: r[s0][3] }); s0 = null; } }
    const empty = []; s0 = null;  // near-empty: under 1 % of the (content) pixels differ from the ground (a mono line or less), for 0.4 s or more
    for (let i = 0; i <= r.length; i++) { const q = i < r.length && r[i][4] < 0.01 && r[i][0] > 0.6; if (q && s0 == null) s0 = i; if (!q && s0 != null) { const d = r[i - 1][0] - r[s0][0]; if (d >= 0.4) empty.push({ t0: r[s0][0], t1: r[i - 1][0], d: +d.toFixed(1), scene: r[s0][3] }); s0 = null; } }
    // content coverage: bounding box of non-ground pixels (fraction of frame width / height; portrait: of the 370-1440 safe area)
    const cw = r.map(x => x[5]).sort((p, q) => p - q), ch = r.map(x => x[6]).sort((p, q) => p - q); const med = (v) => v[Math.floor(v.length / 2)];
    const low = r.filter(x => x[5] < 0.55 || x[6] < (a === '16x9' ? 0.5 : 0.6)); const lowScenes = {}; low.forEach(x => { lowScenes[x[3]] = (lowScenes[x[3]] || 0) + 1; });
    const coverage = { minW: cw[0], medW: med(cw), minH: ch[0], medH: med(ch), lowShare: +(low.length / r.length).toFixed(3), lowScenes };
    console.log(`  coverage ${a}: width min ${coverage.minW} median ${coverage.medW} | height min ${coverage.minH} median ${coverage.medH} | samples under target ${(coverage.lowShare * 100).toFixed(1)}%`);
    console.log('  low-coverage samples per scene: ' + Object.entries(lowScenes).map(([k2, v]) => k2 + ':' + v).join(' '));
    report[a] = { holds, dark, empty, coverage, samples: r.length };
    console.log(`\n== ${a}: ${holds.length} holds > ${MAX}s, ${dark.length} dark spans > 2s, ${empty.length} near-empty spans`);
    holds.forEach(x => console.log(`  hold  ${x.t0.toFixed(1)}-${x.t1.toFixed(1)}  ${x.d}s  scene ${x.scene}`));
    dark.forEach(x => console.log(`  dark  ${x.t0.toFixed(1)}-${x.t1.toFixed(1)}  ${x.d}s  scene ${x.scene}`));
    empty.forEach(x => console.log(`  empty ${x.t0.toFixed(1)}-${x.t1.toFixed(1)}  ${x.d}s  scene ${x.scene}`));
    await page.close();
  }
  fs.writeFileSync(path.join(HERE, '..', 'build', 'holds.json'), JSON.stringify(report));
} finally { await browser.close(); srv.close(); }

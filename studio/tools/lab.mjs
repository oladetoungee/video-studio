#!/usr/bin/env node
// The lab loop (render, look, measure, fix): QA tools that read the film frame by frame in headless Chrome, the same runtime
// as the editor and the exports. Nothing is written but small PNG / JSON reports in projects/<slug>/film/build/qa/.
// No image sequences: frames are analysed in the page and only the result comes out.
//
//   node studio/tools/lab.mjs contact <slug> --from s --to s [--every 12] [--cols 6] [--aspect 9x16] [--out f.png]
//        every Nth frame of a range as one sheet, frame numbers on each cell (Florence: "contact sheet every 12th frame")
//   node studio/tools/lab.mjs onion   <slug> --from s --to s [--every 2] [--mode mean|darken|lighten] [--aspect] [--out f.png]
//        the frames of a move laid over each other: spacing should tighten near the end of a move (arrive fast, land soft);
//        even spacing = linear, a last ghost far from the rest = a dead stop
//   node studio/tools/lab.mjs speed   <slug> --from s --to s | --scene N [--els 4] [--el key] [--aspect] [--out f.png]
//        speed graph: per-frame picture change (energy) + per-element speed (px/frame) for the elements that move most;
//        flags dead stops, linear moves, text that moves again within 8 frames, holds over 4 s with nothing changing
//   node studio/tools/lab.mjs audit   <slug> [--from s --to s | --scene N] [--aspect 16x9] [--lock]
//        numeric audit of every frame: MOTION.expect() checks from the scenes, every sound-effect cue against the frame where
//        the picture actually changes, text reading time, dead holds. Report: film/build/qa/audit_<aspect>.json
//   node studio/tools/lab.mjs board   <slug> [--aspect 16x9]   transition board: film/data/transitions.json (every cut, kind, landing word;
//        carrier + why written by the author and kept on re-runs) + blank / flash frames right after each cut
//        --expects file.json: extra checks without editing scenes: [{label, t | frame, el, settled, state, value, tol}]
//   --lock  take the machine-wide render lock (/tmp/gm-render.lock) for long runs (whole-film speed / audit)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.dirname(STUDIO);
const FPS = 30;
const DIMS = { '16x9': [1920, 1080], '9x16': [1080, 1920], '4x5': [1080, 1350] };
const LOCK = '/tmp/gm-render.lock';
const qaDir = (slug) => { const d = path.join(ROOT, 'projects', slug, 'film', 'build', 'qa'); fs.mkdirSync(d, { recursive: true }); return d; };
const dataURLbuf = (u) => Buffer.from(u.slice(u.indexOf(',') + 1), 'base64');

function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const c = [];
  if (fs.existsSync(base)) for (const v of fs.readdirSync(base).sort().reverse()) c.push(path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), path.join(base, v, 'chrome-headless-shell-mac-x64/chrome-headless-shell'));
  c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  const f = c.find(p => fs.existsSync(p)); if (!f) throw new Error('no Chrome found'); return f;
}
let SERVER = null;
async function open(slug, aspect, elements) {
  const { start } = await import(path.join(STUDIO, 'server.mjs'));
  SERVER = await start(0); const base = `http://127.0.0.1:${SERVER.address().port}`;
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--force-color-profile=srgb'] });
  const page = await browser.newPage(); const [w, h] = DIMS[aspect];
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('[page]', e.message));
  await page.goto(`${base}/render/${slug}?aspect=${aspect}&elements=${elements ? 1 : 0}`, { waitUntil: 'load' });
  await page.waitForFunction('window.READY === true', { timeout: 90000 });
  const err = await page.evaluate('window.BUILD_ERROR'); if (err) throw new Error('build error: ' + err);
  if (!(await page.evaluate('typeof MOTION === "object"'))) throw new Error('runtime has no MOTION (studio/runtime/motion.js not loaded)');
  await page.evaluate(PAGE_HELPERS);
  return { browser, page, close: async () => { await browser.close(); SERVER.close(); } };
}

// in-page helpers: one frame -> energy (mean |luma change| at 1/8 size, 0..1), its centroid, the element boxes, live state
const PAGE_HELPERS = `(() => {
  const L = window.__lab = { prev: null };
  const cv = document.getElementById('c'); const sw = Math.round(cv.width / 8), sh = Math.round(cv.height / 8);
  const small = document.createElement('canvas'); small.width = sw; small.height = sh; const x = small.getContext('2d', { willReadFrequently: true });
  window.labReset = () => { L.prev = null; };
  window.labFrame = (t, els) => {
    MOTION._beginFrame(); renderFrame(t);
    x.drawImage(cv, 0, 0, sw, sh); const d = x.getImageData(0, 0, sw, sh).data; const n = sw * sh; const y = new Float32Array(n);
    for (let i = 0; i < n; i++) y[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
    let e = 0, cx = 0, cy = 0, m = 0;
    if (L.prev) for (let i = 0; i < n; i++) { const v = Math.abs(y[i] - L.prev[i]); e += v; if (v > 0.04) { cx += (i % sw) * v; cy += Math.floor(i / sw) * v; m += v; } }
    L.prev = y;
    const out = { e: +(e / n).toFixed(6), c: m ? [Math.round(cx / m * 8), Math.round(cy / m * 8)] : null };
    if (els) { const seen = new Set(); out.el = [];
      for (const b of EL.list) { if (seen.has(b.id)) continue; seen.add(b.id);
        out.el.push([b.id, +(b.x + b.w / 2).toFixed(2), +(b.y + b.h / 2).toFixed(2), +b.w.toFixed(2), +b.h.toFixed(2), +(b.a == null ? 1 : b.a).toFixed(3), b.hidden ? 1 : 0, b.kind]); } }
    const st = MOTION._state(); if (Object.keys(st).length) out.s = st;
    return out;
  };
  window.labRun = (f0, f1, els) => { const r = []; for (let f = f0; f < f1; f++) r.push(labFrame(f / ${FPS}, els)); return r; };
})()`;

async function frames(page, f0, f1, els, label) {
  await page.evaluate('labReset()'); const out = []; const B = 90;
  for (let a = f0; a < f1; a += B) {
    out.push(...(await page.evaluate(`labRun(${a}, ${Math.min(f1, a + B)}, ${!!els})`)));
    if ((f1 - f0) > 900 && ((a - f0) / B) % 20 === 0) console.log(`${label || 'frames'} ${Math.round((a - f0) / (f1 - f0) * 100)} %`);
  }
  return out;
}

function flags(args) {
  const o = { _: [] };
  for (let i = 0; i < args.length; i++) { const a = args[i];
    if (a.startsWith('--')) { const k = a.slice(2); const v = args[i + 1]; if (v == null || v.startsWith('--')) o[k] = true; else { o[k] = v; i++; } } else o._.push(a); }
  return o;
}
async function range(page, o) {
  const meta = await page.evaluate('FILM.meta()');
  let t0 = o.from != null ? +o.from : 0, t1 = o.to != null ? +o.to : meta.TOTAL;
  if (o.scene) { const s = meta.SCENES[+o.scene - 1]; if (!s) throw new Error('no scene ' + o.scene); t0 = s.start; t1 = s.end; }
  if (!(t1 > t0)) throw new Error(`empty range: --from ${o.from} --to ${o.to}`);
  return { meta, f0: Math.max(0, Math.round(t0 * FPS)), f1: Math.min(Math.round(meta.TOTAL * FPS), Math.round(t1 * FPS)) };
}
const cutFrames = (meta) => meta.SCENES.slice(1).map(s => Math.ceil(s.start * FPS - 1e-6));
const nearCut = (f, cuts, r = 1) => cuts.some(c => Math.abs(c - f) <= r);
async function withLock(on, fn) {
  if (!on) return fn();
  for (let i = 0; ; i++) { try { fs.mkdirSync(LOCK); break; } catch { if (i % 12 === 0) console.log('waiting for the render lock', LOCK); await new Promise(r => setTimeout(r, 5000)); } }
  fs.writeFileSync(path.join(LOCK, 'owner'), 'lab.mjs ' + process.pid);
  try { return await fn(); } finally { try { fs.unlinkSync(path.join(LOCK, 'owner')); fs.rmdirSync(LOCK); } catch {} }
}

/* ---------- contact sheet / onion skin: composed in the page ---------- */
async function contact(slug, o) {
  const aspect = o.aspect || '16x9'; const L = await open(slug, aspect, false);
  try {
    const { f0, f1 } = await range(L.page, o); const every = +o.every || 12; const cols = +o.cols || 6;
    const url = await L.page.evaluate(`(() => { const cv = document.getElementById('c'); const cw = ${+o.cell || 320}, ch = Math.round(cw * cv.height / cv.width);
      const fs = []; for (let f = ${f0}; f < ${f1}; f += ${every}) fs.push(f); const rows = Math.ceil(fs.length / ${cols});
      const s = document.createElement('canvas'); s.width = ${cols} * (cw + 4); s.height = rows * (ch + 22); const x = s.getContext('2d'); x.fillStyle = '#444'; x.fillRect(0, 0, s.width, s.height);
      fs.forEach((f, i) => { renderFrame(f / ${FPS}); const cx = (i % ${cols}) * (cw + 4), cy = Math.floor(i / ${cols}) * (ch + 22);
        x.drawImage(cv, cx, cy + 20, cw, ch); x.fillStyle = '#fff'; x.font = '13px monospace'; x.fillText('f' + f + '  ' + (f / ${FPS}).toFixed(2) + 's', cx + 3, cy + 15); });
      return s.toDataURL('image/png'); })()`);
    const out = path.resolve(o.out || path.join(qaDir(slug), `contact_${aspect}_f${f0}-${f1}.png`)); fs.writeFileSync(out, dataURLbuf(url)); console.log(out);
  } finally { await L.close(); }
}
async function onion(slug, o) {
  const aspect = o.aspect || '16x9'; const L = await open(slug, aspect, false);
  try {
    const { f0, f1 } = await range(L.page, o); const every = +o.every || 2; const mode = o.mode || 'mean';
    if ((f1 - f0) / every > 90) throw new Error('onion skin: keep it to one move (at most ~90 ghosts); use --every or a shorter range');
    const url = await L.page.evaluate(`(() => { const cv = document.getElementById('c'); const sc = ${+o.scale || 0.5};
      const s = document.createElement('canvas'); s.width = Math.round(cv.width * sc); s.height = Math.round(cv.height * sc) + 40; const x = s.getContext('2d');
      const fs = []; for (let f = ${f0}; f <= ${f1}; f += ${every}) fs.push(f);
      fs.forEach((f, i) => { renderFrame(f / ${FPS});
        if (i === 0) { x.drawImage(cv, 0, 0, s.width, s.height - 40); return; }
        ${mode === 'mean' ? `x.globalAlpha = 1 / (i + 1);` : `x.globalCompositeOperation = '${mode}';`}
        x.drawImage(cv, 0, 0, s.width, s.height - 40); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; });
      x.fillStyle = '#222'; x.fillRect(0, s.height - 40, s.width, 40); x.fillStyle = '#fff'; x.font = '15px monospace';
      x.fillText('onion skin (${mode}) frames ' + fs[0] + '-' + fs[fs.length - 1] + ' every ${every} (' + fs.length + ' ghosts)', 10, s.height - 14);
      return s.toDataURL('image/png'); })()`);
    const out = path.resolve(o.out || path.join(qaDir(slug), `onion_${aspect}_f${f0}-${f1}.png`)); fs.writeFileSync(out, dataURLbuf(url)); console.log(out);
  } finally { await L.close(); }
}

/* ---------- motion analysis shared by speed + audit ---------- */
const STILL = 0.25;      // px/frame: below this an element counts as still
const HOLD_E = 0.0004;   // energy below this = nothing visibly changes on the frame
function tracks(R, f0) {
  const T = new Map();
  R.forEach((r, i) => { for (const [id, x, y, w, h, a, hid, kind] of r.el || []) { if (!T.has(id)) T.set(id, { id, kind, f: [], p: [] }); const t = T.get(id); t.f.push(f0 + i); t.p.push([x, y, w, h, a, hid]); } });
  for (const t of T.values()) {
    t.v = t.p.map((p, i) => (i === 0 || t.f[i] !== t.f[i - 1] + 1 ? 0 : Math.hypot(p[0] - t.p[i - 1][0], p[1] - t.p[i - 1][1]) + Math.abs(p[2] - t.p[i - 1][2]) / 2));
    t.travel = t.v.reduce((s, v) => s + v, 0);
  }
  return T;
}
function moveFlags(t, cuts) {
  const out = []; const v = t.v; let i = 0;
  while (i < v.length) {
    if (v[i] <= STILL) { i++; continue; }
    let j = i; while (j + 1 < v.length && v[j + 1] > STILL && t.f[j + 1] === t.f[j] + 1) j++;
    const seg = v.slice(i, j + 1); const peak = Math.max(...seg); const dist = seg.reduce((s, x) => s + x, 0);
    const fa = t.f[i], fb = t.f[j];
    if (!nearCut(fa, cuts, 9) && dist > 30) {
      const last = seg[seg.length - 1]; const nextStill = j + 1 < v.length && t.f[j + 1] === fb + 1;
      if (nextStill && peak > 4 && last >= 0.35 * peak) out.push({ kind: 'dead stop', el: t.id, frame: fb + 1, detail: `stops from ${last.toFixed(1)} px/frame (peak ${peak.toFixed(1)}) in one frame: land soft` });
      let run = 1; for (let k = 1; k < seg.length; k++) { run = seg[k] > 1.5 && Math.abs(seg[k] - seg[k - 1]) <= 0.05 * seg[k - 1] ? run + 1 : 1; if (run === 6) { out.push({ kind: 'linear move', el: t.id, frame: t.f[i + k - 5], detail: `constant ${seg[k].toFixed(1)} px/frame for 6+ frames (fine only for a slow push, progress or loop phase)` }); break; } }
      if (seg.length < 9 && dist > 60) out.push({ kind: 'short move', el: t.id, frame: fa, detail: `${dist.toFixed(0)} px in ${seg.length} frames (< 0.3 s)` });
    }
    // text must stay still >= 8 frames before it moves again
    if (t.kind === 'text') { let k = j + 1; while (k < v.length && v[k] <= STILL && t.f[k] === t.f[k - 1] + 1) k++;
      const gap = k - (j + 1); if (k < v.length && gap > 0 && gap < 8 && t.f[k] === t.f[k - 1] + 1 && !nearCut(t.f[k], cuts, 9)) out.push({ kind: 'reading time', el: t.id, frame: t.f[k], detail: `text still for only ${gap} frames before moving again (min 8)` }); }
    i = j + 1;
  }
  return out;
}
function holds(R, f0, cuts) {
  const out = []; let a = null;
  R.forEach((r, i) => { const still = r.e < HOLD_E && !nearCut(f0 + i, cuts, 0);
    if (still && a == null) a = i; if ((!still || i === R.length - 1) && a != null) { const n = i - a; if (n > 4 * FPS) out.push({ kind: 'dead hold', frame: f0 + a, detail: `${(n / FPS).toFixed(1)} s with no visible change (frames ${f0 + a}-${f0 + i}): add a slow push, a type-on or a highlight` }); a = null; } });
  return out;
}

/* ---------- speed graph ---------- */
async function speed(slug, o) {
  const aspect = o.aspect || '16x9'; const L = await open(slug, aspect, true); let R, meta, f0, f1;
  try { ({ meta, f0, f1 } = await range(L.page, o)); R = await withLock(o.lock, () => frames(L.page, f0, f1, true, 'speed')); }
  finally { await L.close(); }
  const cuts = cutFrames(meta); const T = tracks(R, f0);
  let pick = [...T.values()].filter(t => t.travel > 20).sort((a, b) => b.travel - a.travel);
  if (o.el) pick = [...T.values()].filter(t => t.id.includes(o.el)); pick = pick.slice(0, +o.els || 4);
  const fl = [...holds(R, f0, cuts), ...[...T.values()].flatMap(t => moveFlags(t, cuts))].sort((a, b) => a.frame - b.frame);
  const cues = meta.CUES.map(c => Math.round(c.t * FPS)).filter(f => f >= f0 && f < f1);
  // SVG plot -> PNG via the browser
  const n = f1 - f0; const Wd = Math.max(1000, Math.min(4000, n * 3)); const lane = 140; const lanes = 1 + pick.length; const Ht = 40 + lanes * (lane + 24) + 20;
  const X = (f) => 50 + (f - f0) / Math.max(1, n) * (Wd - 70);
  const poly = (vals, fs, top, max, col) => `<polyline fill="none" stroke="${col}" stroke-width="1.4" points="${vals.map((v, i) => `${X(fs[i]).toFixed(1)},${(top + lane - Math.min(1, v / max) * lane).toFixed(1)}`).join(' ')}"/>`;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wd}" height="${Ht}" font-family="monospace" font-size="12"><rect width="100%" height="100%" fill="#fff"/>`;
  svg += `<text x="10" y="20" font-size="14">speed graph ${slug} ${aspect} frames ${f0}-${f1} (${(f0 / FPS).toFixed(2)}-${(f1 / FPS).toFixed(2)} s) · grey = cuts, blue ticks = sound cues, red = flags</text>`;
  for (let f = Math.ceil(f0 / 30) * 30; f < f1; f += n > 1800 ? 300 : 30) svg += `<line x1="${X(f)}" x2="${X(f)}" y1="30" y2="${Ht - 20}" stroke="#eee"/><text x="${X(f) + 2}" y="${Ht - 6}" fill="#999">${f}</text>`;
  for (const c of cuts) if (c >= f0 && c < f1) svg += `<line x1="${X(c)}" x2="${X(c)}" y1="30" y2="${Ht - 20}" stroke="#bbb"/>`;
  for (const c of cues) svg += `<line x1="${X(c)}" x2="${X(c)}" y1="30" y2="40" stroke="#1B3FD8" stroke-width="2"/>`;
  const fsAll = R.map((_, i) => f0 + i); const emax = Math.max(0.01, ...R.map(r => r.e).filter((e, i) => !nearCut(f0 + i, cuts, 0)));
  let top = 44; svg += `<text x="50" y="${top + 12}">picture change (energy, max ${emax.toFixed(4)})</text>` + poly(R.map(r => r.e), fsAll, top, emax, '#111114');
  for (const t of pick) { top += lane + 24; const vm = Math.max(1, ...t.v); svg += `<text x="50" y="${top + 12}">${t.id.slice(0, 70).replace(/[<&]/g, '')} (px/frame, max ${vm.toFixed(1)})</text>` + poly(t.v, t.f, top, vm, '#FF4713'); }
  for (const f of fl) svg += `<line x1="${X(f.frame)}" x2="${X(f.frame)}" y1="40" y2="${Ht - 20}" stroke="#d00" stroke-width="1" stroke-dasharray="3 3"/>`;
  svg += '</svg>';
  const b2 = await puppeteer.launch({ executablePath: findChrome(), headless: true }); const p2 = await b2.newPage();
  await p2.setViewport({ width: Wd, height: Ht }); await p2.setContent(`<body style="margin:0">${svg}</body>`);
  const out = path.resolve(o.out || path.join(qaDir(slug), `speed_${aspect}_f${f0}-${f1}.png`)); await p2.screenshot({ path: out, clip: { x: 0, y: 0, width: Wd, height: Ht } }); await b2.close();
  fs.writeFileSync(out.replace(/\.png$/, '.json'), JSON.stringify({ slug, aspect, f0, f1, flags: fl, energy: R.map(r => r.e), elements: pick.map(t => ({ id: t.id, f: t.f, v: t.v.map(x => +x.toFixed(2)) })) }));
  console.log(out); for (const f of fl.slice(0, +o.show || 30)) console.log(`f${f.frame} (${(f.frame / FPS).toFixed(2)} s) ${f.kind}${f.el ? ' · ' + f.el : ''}: ${f.detail}`);
  if (fl.length > (+o.show || 30)) console.log(`... ${fl.length} flags in all (see the .json)`);
}

/* ---------- numeric audit ---------- */
async function audit(slug, o) {
  const aspect = o.aspect || '16x9'; const L = await open(slug, aspect, true); let R, meta, f0, f1, EX;
  try {
    ({ meta, f0, f1 } = await range(L.page, o));
    if (o.expects) { const extra = JSON.parse(fs.readFileSync(path.resolve(o.expects), 'utf8'));   // a critic's checks, no scene edit needed
      await L.page.evaluate((xs) => { for (const x of xs) MOTION.expect(x.label, x.t != null ? x.t : x.frame / 30, x); }, extra); }
    EX = await L.page.evaluate('MOTION.EXPECTS');
    R = await withLock(o.lock, () => frames(L.page, f0, f1, true, 'audit'));
  } finally { await L.close(); }
  const cuts = cutFrames(meta); const T = tracks(R, f0); const at = (f) => R[f - f0];
  const checks = [];
  // 1. the scenes' own expectations
  const vis = (f, key) => { const r = at(f); if (!r) return false; return (r.el || []).some(e => (e[0] === key || e[0].endsWith('/' + key) || e[0].includes(key)) && !e[6] && e[5] >= 0.5); };
  for (const x of EX.filter(x => (!x.aspect || x.aspect === aspect) && x.f >= f0 && x.f < f1)) {
    const lo = Math.max(f0 + 1, x.f - 90), hi = Math.min(f1 - 1, x.f + 90); let got = null;
    if (x.el && x.settled) { const t = [...T.values()].find(t => t.id === x.el || t.id.endsWith('/' + x.el) || t.id.includes(x.el));
      if (t) for (let i = 0; i < t.f.length - 8; i++) { if (t.f[i] < lo) continue; if (t.v.slice(i, i + 8).every(v => v <= STILL)) { got = t.f[i]; break; } } }
    else if (x.el) { let best = null; for (let f = lo; f <= hi; f++) if (vis(f, x.el) && !vis(f - 1, x.el) && (best == null || Math.abs(f - x.f) < Math.abs(best - x.f))) best = f; got = best; }
    else if (x.state) { let best = null; const on = (f) => at(f) && at(f).s && at(f).s[x.state] === x.value; for (let f = lo; f <= hi; f++) if (on(f) && !on(f - 1) && (best == null || Math.abs(f - x.f) < Math.abs(best - x.f))) best = f; got = best; }
    const pass = got != null && (x.settled ? got <= x.f + x.tol : Math.abs(got - x.f) <= x.tol);
    checks.push({ kind: 'expect', label: x.label, want: x.f, got, off: got == null ? null : got - x.f, pass, detail: got == null ? 'never happened within 3 s' : `frame ${got} (${got - x.f >= 0 ? '+' : ''}${got - x.f})` });
  }
  // 2. every sound cue against the frame where the picture changes most (within +-4 frames)
  // A cue next to a scene change (+-1 frame) is matched to that cut; any other cue ignores the cut / whip frames around it, so
  // it is matched to the element it belongs to. Onset = first frame in +-4 reaching half the window's biggest change.
  const masked = new Set(); for (const s of meta.SCENES.slice(1)) { const c = Math.ceil(s.start * FPS - 1e-6); for (let k = 0; k <= (s.trans === 'whip' ? 8 : 0); k++) masked.add(c + k); }
  for (const c of meta.CUES) { const F = Math.round(c.t * FPS); if (F - 31 < f0 || F + 31 >= f1) continue;
    const onCut = cuts.some(x => Math.abs(x - F) <= 1); const E = (f) => (!onCut && masked.has(f) ? 0 : at(f).e);
    let be = 0, peakF = F; for (let f = F - 4; f <= F + 4; f++) if (E(f) > be) { be = E(f); peakF = f; }
    let on = peakF; for (let f = F - 4; f <= peakF; f++) if (E(f) >= 0.5 * be) { on = f; break; }
    let lo = on; while (lo > F - 6 && E(lo - 1) >= 0.1 * be) lo--;
    const around = []; for (let f = F - 30; f <= F + 30; f++) if (Math.abs(f - F) > 4 && !masked.has(f)) around.push(at(f).e); around.sort((a, b) => a - b);
    const med = around.length ? around[around.length >> 1] : 0; const clear = be > Math.max(3 * med, HOLD_E * 4); const soft = clear && peakF - lo > 4;
    const off = on - F; const pass = !clear || soft || Math.abs(off) <= 1;
    checks.push({ kind: 'sound sync', label: `${c.name} @ ${c.t.toFixed(2)} s`, want: F, got: on, off, pass, clear, soft, onCut,
      detail: !clear ? 'no clear visual hit within 4 frames: is this sound tied to anything?' : soft ? `soft visual (change builds over ${peakF - lo} frames): no single hit frame, consider a softer sound or a sharper visual`
        : `the picture change starts at frame ${on} (${off >= 0 ? '+' : ''}${off}${onCut ? ', the cut' : ''}); put the cue there (the sound's peak then lands on it; audio +1 frame is fine)` }); }
  // 3. motion: reading time, dead stops, linear moves, holds
  const motion = [...holds(R, f0, cuts), ...[...T.values()].flatMap(t => moveFlags(t, cuts))].sort((a, b) => a.frame - b.frame);
  const sum = { frames: f1 - f0, expects: checks.filter(c => c.kind === 'expect').length, expectFails: checks.filter(c => c.kind === 'expect' && !c.pass).length,
    cues: checks.filter(c => c.kind === 'sound sync').length, cuesOff: checks.filter(c => c.kind === 'sound sync' && !c.pass).length, cuesUnclear: checks.filter(c => c.kind === 'sound sync' && !c.clear).length, cuesSoft: checks.filter(c => c.kind === 'sound sync' && c.soft).length,
    motion: Object.fromEntries(['dead hold', 'dead stop', 'linear move', 'short move', 'reading time'].map(k => [k, motion.filter(m => m.kind === k).length])) };
  const out = path.join(qaDir(slug), `audit_${aspect}${o.scene ? '_scene' + o.scene : o.from != null ? `_f${f0}-${f1}` : ''}.json`);
  fs.writeFileSync(out, JSON.stringify({ slug, aspect, f0, f1, created: new Date().toISOString(), summary: sum, checks, motion }, null, 1));
  console.log(out); console.log(JSON.stringify(sum));
  for (const c of checks.filter(c => !c.pass).slice(0, 40)) console.log(`FAIL ${c.kind} · ${c.label}: want f${c.want}, ${c.detail}`);
}

/* ---------- transition board: every cut, what carries it, the word it lands on; blank / flash frames ---------- */
// Writes film/data/transitions.json (a draft: kind, landing word, frame numbers filled in; `carrier` and `why` are for the
// author to write, and are kept when the board is written again) and checks the first frames after every cut: the screen
// must never go blank (detail under 30 % of the settled shot) or flash (a frame much brighter than both sides).
async function board(slug, o) {
  const aspect = o.aspect || '16x9'; const L = await open(slug, aspect, false); let rows, meta;
  try {
    meta = await L.page.evaluate('FILM.meta()');
    rows = await L.page.evaluate(`(() => { const cv = document.getElementById('c'); const sw = 240, sh = Math.round(sw * cv.height / cv.width);
      const s = document.createElement('canvas'); s.width = sw; s.height = sh; const x = s.getContext('2d', { willReadFrequently: true });
      const stat = (t) => { renderFrame(t); x.drawImage(cv, 0, 0, sw, sh); const d = x.getImageData(0, 0, sw, sh).data; let m = 0, m2 = 0; const n = sw * sh;
        for (let i = 0; i < d.length; i += 4) { const y = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255; m += y; m2 += y * y; } m /= n; return { mean: m, detail: Math.sqrt(Math.max(0, m2 / n - m * m)) }; };
      const S = FILM.meta().SCENES; const out = [];
      for (let i = 1; i < S.length; i++) { const a = S[i - 1], b = S[i]; const c = Math.ceil(b.start * 30 - 1e-6);
        const before = stat((c - 2) / 30), settled = stat(Math.min(b.end - 0.05, b.start + Math.min(1.2, (b.end - b.start) / 2)));
        const after = [0, 1, 2, 3, 5, 8].map(k => ({ k, ...stat((c + k) / 30) }));
        const w = WORDS.find(w => w.t >= b.start - 0.15) || null;
        out.push({ from: a.id, to: b.id, frame: c, t: b.start, kind: b.trans, lands_on: w ? w.w + ' @ ' + w.t.toFixed(2) + ' s (f' + Math.round(w.t * 30) + ')' : null,
          before, settled, after }); }
      return out; })()`);
  } finally { await L.close(); }
  const file = path.join(ROOT, 'projects', slug, 'film', 'data', 'transitions.json'); let old = {};
  try { for (const c of JSON.parse(fs.readFileSync(file, 'utf8')).cuts || []) old[c.from + '>' + c.to] = c; } catch {}
  const flags = []; const cuts = rows.map(r => {
    const blank = r.after.filter(a => a.k >= 1 && a.k <= 5 && a.detail < 0.3 * r.settled.detail && r.settled.detail > 0.02);
    const flash = r.after.filter(a => a.mean > Math.max(r.before.mean, r.settled.mean) + 0.25);
    if (blank.length >= 3) flags.push({ frame: r.frame, kind: 'blank after cut', detail: `${r.from} -> ${r.to}: frames +${blank.map(b => b.k).join(',+')} show under 30 % of the settled shot's detail (empty ground): bring the next shot in with something on screen` });
    if (flash.length) flags.push({ frame: r.frame, kind: 'flash', detail: `${r.from} -> ${r.to}: frame +${flash[0].k} is much brighter than both shots` });
    const p = old[r.from + '>' + r.to] || {};
    return { from: r.from, to: r.to, frame: r.frame, t: +r.t.toFixed(3), kind: r.kind, lands_on: p.lands_on_override || r.lands_on,
      carrier: p.carrier || '', why: p.why || '', ...(p.lands_on_override ? { lands_on_override: p.lands_on_override } : {}) };
  });
  const missing = cuts.filter(c => c.carrier.length < 6 || c.why.length < 20).length;
  fs.writeFileSync(file, JSON.stringify({ slug, aspect, note: 'Transition board. Fill carrier (what brings the next shot in: a shape, a line, a word, the camera, or "hard cut") and why (>= 20 characters: the reason, e.g. "cut on the beat of \'licensed\', new idea"). Re-running lab.mjs board keeps them.', cuts, flags }, null, 1));
  console.log(file); console.log(`${cuts.length} cuts · ${cuts.filter(c => c.kind === 'whip').length} whips · ${missing} without a written carrier / reason · ${flags.length} blank / flash flags`);
  for (const f of flags.slice(0, +o.show || 30)) console.log(`f${f.frame} ${f.kind}: ${f.detail}`);
}

async function main() {
  const [mode, ...rest] = process.argv.slice(2); const o = flags(rest); const slug = o._[0];
  if (!slug) throw new Error('usage: see the top of studio/tools/lab.mjs');
  if (mode === 'contact') return contact(slug, o);
  if (mode === 'onion') return onion(slug, o);
  if (mode === 'speed') return speed(slug, o);
  if (mode === 'audit') return audit(slug, o);
  if (mode === 'board') return board(slug, o);
  throw new Error('unknown mode ' + mode);
}
main().then(() => process.exit(0), (e) => { console.error(e.stack || e); process.exit(1); });

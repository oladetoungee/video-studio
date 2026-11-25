#!/usr/bin/env node
// Video studio server. No framework; one dependency (puppeteer-core) is only used by the render jobs.
//
//   node studio/server.mjs          -> http://localhost:7700/   (PORT=8000 to change)
//
// Every project in projects/<slug>/ is listed with what it has that can be edited:
//   film/film.json                         -> /edit/<slug>/                     film editor (studio/editor/index.html)
//   talking-head/talking-head.json         -> /moment/<slug>/<id>/              moment editor (one per moment)
//   design/thumbnails/directions/*/        -> /design/<slug>/thumbnails/        design editor
//   design/carousels/<deck>/content.json   -> /design/<slug>/carousels/<deck>/  design editor
// Other routes:
//   /render/<slug>         headless render host (used by tools/render.mjs)
//   /p/<slug>/...          files of projects/<slug>/ (sources, outputs)
//   /studio/..., /library/...   runtime + editors, shared fonts and sounds
//   /api/...               edits, content, versions, export jobs, photos (uploads, cut-outs), palette (see api())
// Film edits save into film/edits.json, moments into talking-head/edits/<id>.json, designs into their content.json.
// Every editor keeps versions on disk (a versions/ folder next to what it edits). Only listens on 127.0.0.1.

import http from 'node:http';
import fs from 'node:fs/promises';
import fss from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const STUDIO = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(STUDIO);                       // videos/
const PROJECTS = path.join(ROOT, 'projects');
const PORT = +process.env.PORT || 7700;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav', '.flac': 'audio/flac', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.srt': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
};
const SLUG_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const VERSION_RE = /^[0-9TZ-]+(?:-[a-z0-9]+)?$/;
const IMG_RE = /\.(png|jpe?g)$/i;

const exists = (p) => fs.access(p).then(() => true, () => false);
const readJSON = async (p, d = null) => { try { return JSON.parse(await fs.readFile(p, 'utf8')); } catch { return d; } };
async function projects() {
  const out = [];
  for (const d of await fs.readdir(PROJECTS, { withFileTypes: true }).catch(() => [])) {
    if (!d.isDirectory() || !SLUG_RE.test(d.name)) continue;
    const mf = path.join(PROJECTS, d.name, 'film', 'film.json');
    if (!(await exists(mf))) continue;
    let man = {}; try { man = JSON.parse(await fs.readFile(mf, 'utf8')); } catch { }
    let edits = {}; try { edits = JSON.parse(await fs.readFile(path.join(PROJECTS, d.name, 'film', 'edits.json'), 'utf8')); } catch { }
    out.push({ slug: d.name, title: man.title || d.name, duration: (man.intro || 0) + (man.voiceDuration || 0) + (man.outro || 0), edits: countEdits(edits) });
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}
/** when anything she edits (or we build) in a project last changed: film edits, moment edits / manifest, design content */
async function touched(slug) {
  const P = path.join(PROJECTS, slug); let t = 0;
  const mt = async (f) => { try { const s = await fs.stat(f); if (s.mtimeMs > t) t = s.mtimeMs; } catch { } };
  const each = async (dir, fn) => { for (const d of await fs.readdir(dir).catch(() => [])) await fn(path.join(dir, d)); };
  for (const f of ['film/edits.json', 'film/film.json', 'talking-head/talking-head.json', 'STATUS.md']) await mt(path.join(P, f));
  await each(path.join(P, 'talking-head', 'edits'), mt);
  await each(path.join(P, 'design', 'thumbnails', 'directions'), (d) => mt(path.join(d, 'content.json')));
  await each(path.join(P, 'design', 'carousels'), (d) => mt(path.join(d, 'content.json')));
  return t;
}
async function filmDir(slug) {
  if (!SLUG_RE.test(slug || '')) return null;
  const dir = path.join(PROJECTS, slug, 'film');
  return (await exists(path.join(dir, 'film.json'))) ? dir : null;
}
async function writeAtomic(file, text) { const tmp = file + '.tmp-' + process.pid; await fs.writeFile(tmp, text); await fs.rename(tmp, file); }
async function readBody(req, limit = 20e6) {
  let size = 0; const parts = [];
  for await (const c of req) { size += c.length; if (size > limit) throw Object.assign(new Error('too large'), { status: 413 }); parts.push(c); }
  return Buffer.concat(parts).toString('utf8');
}
function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}
const countEdits = (e) => Object.keys(e?.t || {}).length + Object.keys(e?.captions || {}).length + (e?.mix ? 1 : 0) + Object.keys(e?.modes || {}).length;   // moved sound levels count as one edit; each screen switched light / dark as one
const countMomentEdits = (e) => countEdits(e) + Object.keys(e?.capShort || {}).length + Object.keys(e?.cap16 || {}).length + (e?.captions16 ? 1 : 0) + (e?.captions9 ? 1 : 0) + Object.keys(e?.pauses || {}).length;
/** "pause her" correction inserts from the moment editor: {id: {at, d, look, sound, off, text, ground, exact}} (runtime/footage.js) */
function cleanPauses(p) {
  if (!p || typeof p !== 'object' || Array.isArray(p)) return null; const out = {};
  for (const [id, v] of Object.entries(p)) {
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(id) || !v || typeof v !== 'object') continue; const o = {};
    if (Number.isFinite(+v.at) && +v.at >= 0) o.at = Math.round(+v.at * 1000) / 1000;
    if (Number.isFinite(+v.d)) o.d = Math.max(0.5, Math.min(30, Math.round(+v.d * 100) / 100));
    if (v.look === 'card' || v.look === 'frozen') o.look = v.look;
    if (typeof v.sound === 'boolean') o.sound = v.sound;
    if (v.off === true) o.off = true;
    if (v.exact === true) o.exact = true;
    if (typeof v.text === 'string' && v.text.length <= 400) o.text = v.text;
    if (typeof v.ground === 'string' && /^[A-Za-z0-9_-]{1,24}$/.test(v.ground)) o.ground = v.ground;
    if (Object.keys(o).length) out[id] = o;
  }
  return Object.keys(out).length ? out : null;
}
/** seconds of "pause her" inserts in a moment (for the home page's durations; the moment page places them exactly) */
function pauseSeconds(man, m, e, clips) {
  const raw = (p) => (Array.isArray(p) ? { at: p[0], d: p[1] } : p || {});
  const lo = clips.length ? Math.min(...clips.map(c => c[0])) : 0, hi = clips.length ? Math.max(...clips.map(c => c[1])) : 0;
  const by = new Map(); const key = (o) => o.id || 'p' + (+o.at).toFixed(2).replace('.', '_');
  if (m.kind !== 'teaser' && m.pauses !== false && Array.isArray(man.pauses)) for (const p of man.pauses) { const o = raw(p); by.set(key(o), o); }
  if (Array.isArray(m.pauses)) for (const p of m.pauses) { const o = raw(p); by.set(key(o), o); }
  for (const [id, v] of Object.entries(e?.pauses || {})) by.set(id, { ...(by.get(id) || {}), ...v });
  let s = 0; for (const o of by.values()) if (!o.off && +o.d > 0 && +o.at >= lo && +o.at < hi) s += Math.round(+o.d * 30) / 30;
  return s;
}
// her caption size slider + height ("captions16" for 16:9, "captions9" for 9:16): {size, y} in px of the frame, absent = as designed
function cleanCapStyle(c) {
  if (!c || typeof c !== 'object') return null; const o = {};
  if (Number.isFinite(+c.size) && +c.size > 0) o.size = Math.max(20, Math.min(300, Math.round(+c.size)));
  if (c.y != null && Number.isFinite(+c.y)) o.y = Math.max(0, Math.min(2000, Math.round(+c.y)));
  return Object.keys(o).length ? o : null;
}
// her volume sliders ("mix" in film/edits.json and talking-head/edits/<id>.json): whole dB, -24..+12; all at 0 dB = no key
function cleanMix(m) {
  if (!m || typeof m !== 'object') return null;
  const o = {}; for (const k of ['voice', 'music', 'sfx']) o[k] = Math.max(-24, Math.min(12, Math.round(Number(m[k]) || 0)));
  return o.voice || o.music || o.sfx ? o : null;
}
// light / dark per screen ("modes" in film/edits.json): {sceneId: 'light' | 'dark'}, only screens that differ from their design
function cleanModes(m) {
  if (!m || typeof m !== 'object' || Array.isArray(m)) return null;
  const o = {}; for (const [k, v] of Object.entries(m)) if ((v === 'light' || v === 'dark') && /^[A-Za-z0-9._~-]{1,120}$/.test(k)) o[k] = v;
  return Object.keys(o).length ? o : null;
}

/* ---------- what each project has (the home page and the editors' item lists) ---------- */
const thumbsDir = (slug) => path.join(PROJECTS, slug, 'design', 'thumbnails');
const carouselsDir = (slug) => path.join(PROJECTS, slug, 'design', 'carousels');
const momentsMan = (slug) => path.join(PROJECTS, slug, 'talking-head', 'talking-head.json');
async function thumbDirs(slug) {
  const base = path.join(thumbsDir(slug), 'directions'); const out = [];
  for (const d of (await fs.readdir(base, { withFileTypes: true }).catch(() => [])).filter(x => x.isDirectory() && SLUG_RE.test(x.name)).map(x => x.name).sort()) {
    if (!(await exists(path.join(base, d, 'index.html')))) continue;
    const c = await readJSON(path.join(base, d, 'content.json'), {});
    out.push({ id: d, title: c.title || '', direction: c.direction || '', variant: /-v\d+$/.test(d) });
  }
  return out;
}
async function decks(slug) {
  const out = [];
  for (const d of (await fs.readdir(carouselsDir(slug), { withFileTypes: true }).catch(() => [])).filter(x => x.isDirectory() && SLUG_RE.test(x.name)).map(x => x.name).sort()) {
    const c = await readJSON(path.join(carouselsDir(slug), d, 'content.json'));
    if (c && Array.isArray(c.slides)) out.push({ deck: d, slides: c.slides.length, width: c.width, height: c.height, pdf: d === 'linkedin' });
  }
  return out;
}
async function moments(slug) {
  const man = await readJSON(momentsMan(slug)); if (!man || !Array.isArray(man.moments)) return [];
  const base = path.dirname(momentsMan(slug)); const edl = await readJSON(path.join(base, man.edl || 'data/edl.json'), {});
  const out = [];
  for (const [i, m] of man.moments.entries()) {
    const kind = m.kind || 'moment'; const oc = (kind === 'short' || kind === 'teaser') && !man.outro && m.outroCard !== false && (man.outroCard || m.outroCard) && ((m.outroCard?.on ?? man.outroCard?.on) !== false) ? (m.outroCard?.dur ?? man.outroCard?.dur ?? 6.5) : null;   // our drawn ending (runtime footage.js FOOT.ocard)
    const tail = oc ?? m.tail ?? (kind === 'short' ? (m.endCard?.seconds ?? 6) : (man.tail ?? 0));
    const clips = edl?.[m.id]?.clips || [];
    const e = await readJSON(path.join(base, 'edits', m.id + '.json'), {});
    const dur = clips.reduce((a, [x, y]) => a + (y - x), 0) + tail + pauseSeconds(man, m, e, clips);
    const n = man.moments.slice(0, i + 1).filter(x => (x.kind || 'moment') === kind).length;   // numbered within its kind
    out.push({ id: m.id, n, kind, slug: m.slug, title: m.title || m.id, duration: dur, edits: countMomentEdits(e) });
  }
  return out;
}
async function catalog() {
  const out = [];
  for (const d of await fs.readdir(PROJECTS, { withFileTypes: true }).catch(() => [])) {
    if (!d.isDirectory() || !SLUG_RE.test(d.name)) continue;
    const slug = d.name; const p = { slug, title: slug, film: null, moments: [], thumbnails: [], decks: [] };
    const man = await readJSON(path.join(PROJECTS, slug, 'film', 'film.json'));
    if (man) { const e = await readJSON(path.join(PROJECTS, slug, 'film', 'edits.json'), {}); p.title = man.title || slug; p.film = { title: man.title || slug, duration: (man.intro || 0) + (man.voiceDuration || 0) + (man.outro || 0), edits: countEdits(e) }; }
    p.moments = await moments(slug); p.thumbnails = await thumbDirs(slug); p.decks = await decks(slug);
    if (p.film || p.moments.length || p.thumbnails.length || p.decks.length) out.push(p);
  }
  for (const p of out) p.touched = await touched(p.slug);
  return out.sort((a, b) => b.touched - a.touched || a.slug.localeCompare(b.slug));   // the most recently edited project first
}
// images a design can use (the photo picker): project-relative paths, grouped. Her own uploads come first.
const UPLOADS = 'assets/uploads', CUTOUTS = 'assets/uploads/cutouts';
async function assets(slug) {
  const P = path.join(PROJECTS, slug); const groups = [];
  const list = async (rel, filter = () => true) => (await fs.readdir(path.join(P, rel)).catch(() => [])).filter(f => IMG_RE.test(f) && filter(f)).sort().map(f => rel + '/' + f);
  const newest = async (rel) => {   // uploads: newest first
    const fs_ = await list(rel); const st = await Promise.all(fs_.map(f => fs.stat(path.join(P, f)).then(x => x.mtimeMs, () => 0)));
    return fs_.map((f, i) => [f, st[i]]).sort((a, b) => b[1] - a[1]).map(x => x[0]);
  };
  const add = (label, files, extra = {}) => { if (files.length || extra.always) groups.push({ label, files, ...extra }); };
  add('Your photos', await newest(UPLOADS), { uploads: true, always: true });
  add('Cut-outs', [...await newest(CUTOUTS), ...await list('design/thumbnails/assets/cut'), ...await list('design/thumbnails/assets/scene/mask')]);
  add('Photos of her', await list('design/thumbnails/assets/photo'));
  add('Video frames', [...await list('design/thumbnails/assets/scene'), ...await list('design/thumbnails/assets/frames')]);
  add('Collage objects', await list('design/thumbnails/assets/collage'));
  add('Books and covers', [...await list('design/carousels/shared/assets'), ...await list('design/thumbnails/assets'), ...await list('talking-head/assets', f => !/convivial|baratta/.test(f)), ...await list('film/assets', f => /^spine_/.test(f))]);
  return groups;
}

/* ---------- her own photos: upload (JPG, PNG, HEIC, WebP), remove background, move to the Bin ---------- */
// Uploads live in projects/<slug>/assets/uploads/ (cut-outs in .../cutouts/), so every design of the project can use them.
// HEIC and WebP are converted with sips (HEIC -> JPG, WebP -> PNG if it has transparency, else JPG); anything over
// 3000 px on its long side is scaled down. The original file name is kept, made safe; a name already taken gets -2, -3.
const UPLOAD_MAX = 60e6, UPLOAD_EDGE = 3000;
function readRaw(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const parts = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error(`the photo is too large (over ${Math.round(limit / 1e6)} MB)`), { status: 413 })); req.destroy(); return; } parts.push(c); });
    req.on('end', () => resolve(Buffer.concat(parts))); req.on('error', reject);
  });
}
function sniff(b) {
  if (b.length < 16) return null;
  if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'jpg';
  if (b.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))) return 'png';
  if (b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') return 'webp';
  if (b.toString('latin1', 4, 8) === 'ftyp' && /^(heic|heix|hevc|hevx|heim|heis|mif1|msf1|avif)$/.test(b.toString('latin1', 8, 12))) return 'heic';
  return null;
}
function safeStem(name) {
  const stem = path.basename(String(name || ''), path.extname(String(name || ''))).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  return stem.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-{2,}/g, '-').replace(/^[-._]+|[-._]+$/g, '').slice(0, 80) || 'photo';
}
function run(cmd, args, { onLine } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] }); let out = '', err = '', buf = '';
    p.stdout.on('data', (d) => { out += d; if (!onLine) return; buf += d; let k; while ((k = buf.indexOf('\n')) >= 0) { onLine(buf.slice(0, k)); buf = buf.slice(k + 1); } });
    p.stderr.on('data', (d) => { err += d; });
    p.on('error', reject);
    p.on('close', (c) => (c === 0 ? resolve(out) : reject(new Error((err.trim().split('\n').pop() || `${cmd} exit ${c}`).slice(0, 300)))));
  });
}
async function imgInfo(file) {
  const o = await run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'hasAlpha', file]);
  const g = (k) => (new RegExp(k + ': (\\S+)').exec(o) || [])[1];
  return { w: +g('pixelWidth') || 0, h: +g('pixelHeight') || 0, alpha: g('hasAlpha') === 'yes' };
}
async function freeName(dir, stem, ext) {
  for (let k = 1; k < 1000; k++) { const n = `${stem}${k > 1 ? '-' + k : ''}.${ext}`; if (!(await exists(path.join(dir, n)))) return n; }
  throw new Error('too many files with this name');
}
async function upload(req, res, slug, name) {
  const P = path.join(PROJECTS, slug); const dir = path.join(P, UPLOADS);
  const buf = await readRaw(req, UPLOAD_MAX);
  const kind = sniff(buf);
  if (!kind) return send(res, 415, { error: 'not a JPG, PNG, HEIC or WebP photo' });
  await fs.mkdir(dir, { recursive: true });
  const stem = safeStem(name);
  const tmp = path.join(dir, `.incoming-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  const tmpIn = `${tmp}.${kind}`; await fs.writeFile(tmpIn, buf);
  const trash = []; let work = tmpIn, ext = kind, converted = null;
  try {
    if (kind === 'heic' || kind === 'webp') {
      const alpha = kind === 'webp' && (await imgInfo(tmpIn)).alpha; ext = alpha ? 'png' : 'jpg';
      work = `${tmp}-c.${ext}`; trash.push(tmpIn);
      await run('sips', ['-s', 'format', alpha ? 'png' : 'jpeg', ...(alpha ? [] : ['-s', 'formatOptions', '92']), tmpIn, '--out', work]);
      converted = `${kind.toUpperCase()} -> ${ext.toUpperCase()}`;
    }
    let info = await imgInfo(work); let scaled = null;
    if (!info.w || !info.h) throw Object.assign(new Error('could not read the photo'), { status: 415 });
    if (Math.max(info.w, info.h) > UPLOAD_EDGE) { await run('sips', ['-Z', String(UPLOAD_EDGE), work]); scaled = `${info.w}×${info.h}`; info = await imgInfo(work); }
    // the same photo uploaded again: keep the one already there
    const want = `${stem}.${ext}`; const prev = path.join(dir, want);
    if (await exists(prev)) { const a = await fs.readFile(prev), b = await fs.readFile(work); if (a.equals(b)) { trash.push(work); return send(res, 200, { file: `${UPLOADS}/${want}`, width: info.w, height: info.h, existed: true }); } }
    const final = await freeName(dir, stem, ext);
    await fs.rename(work, path.join(dir, final));
    return send(res, 200, { file: `${UPLOADS}/${final}`, width: info.w, height: info.h, converted, scaled });
  } catch (e) {
    trash.push(work);
    return send(res, e.status || 500, { error: e.message });
  } finally {
    for (const f of new Set([tmpIn, ...trash])) await fs.unlink(f).catch(() => { });
  }
}
// "Remove background": tools/cutout.swift (macOS Vision) in the background; the editor polls the task for progress.
const CUT_TASKS = new Map(); let CUT_N = 0;
async function cutout(req, res, slug) {
  const { file, mode = 'auto' } = JSON.parse(await readBody(req, 1e5));
  const P = path.join(PROJECTS, slug);
  const src = typeof file === 'string' && IMG_RE.test(file) ? inside(P, ...file.split('/')) : null;
  if (!src || file.split('/').some(x => x.startsWith('.')) || !(await exists(src))) return send(res, 404, { error: 'no such photo in this project' });
  if (!['auto', 'person', 'object', 'both'].includes(mode)) return send(res, 400, { error: 'unknown mode' });
  const dir = path.join(P, CUTOUTS); await fs.mkdir(dir, { recursive: true });
  const stem = safeStem(path.basename(file).replace(/-cutout(-\d+)?(?=\.[^.]+$)/, '')) + (mode === 'person' ? '-person' : '') + '-cutout';
  const t = { id: String(++CUT_N), slug, src: file, mode, state: 'running', progress: 0, stage: 'starting', file: null, error: null, started: Date.now() };
  CUT_TASKS.set(t.id, t); if (CUT_TASKS.size > 40) CUT_TASKS.delete(CUT_TASKS.keys().next().value);
  (async () => {
    const name = await freeName(dir, stem, 'png'); const tmp = path.join(dir, `.cut-${t.id}-${Date.now()}.png`);
    try {
      const out = await run('swift', [path.join(STUDIO, 'tools', 'cutout.swift'), src, tmp, mode], {
        onLine: (l) => { const m = /^@progress ([\d.]+) (.*)$/.exec(l); if (m) { t.progress = +m[1]; t.stage = m[2]; } },
      });
      await fs.rename(tmp, path.join(dir, name));
      t.file = `${CUTOUTS}/${name}`; t.used = (/^ok \d+ \d+ (\S+)/m.exec(out) || [])[1] || mode; t.state = 'done'; t.progress = 1; t.stage = 'done';
    } catch (e) { t.state = 'failed'; t.error = e.message; await fs.unlink(tmp).catch(() => { }); }
    t.finished = Date.now();
  })();
  return send(res, 200, t);
}
// which designs use a photo: every image path in thumbnails/carousels content.json (and their versions), resolved
async function usage(slug, rel) {
  const P = path.join(PROJECTS, slug); const now = [], old = [];
  const norm = (p) => path.relative(P, path.resolve(P, p)).split(path.sep).join('/');
  const refs = (o, base, deck, out = []) => {
    if (typeof o === 'string') { if (IMG_RE.test(o)) out.push(norm(deck && !o.includes('/') ? 'design/carousels/shared/assets/' + o : path.join(base, o))); }
    else if (o && typeof o === 'object') for (const v of Object.values(o)) refs(v, base, deck, out);
    return out;
  };
  const scan = async (cf, base, deck, label) => {
    const c = await readJSON(cf); if (c && refs(c, base, deck).includes(rel)) now.push(label);
    for (const f of (await fs.readdir(path.join(path.dirname(cf), 'versions')).catch(() => [])).filter(f => f.endsWith('.json'))) {
      const v = await readJSON(path.join(path.dirname(cf), 'versions', f)); if (v && refs(v.content, base, deck).includes(rel)) { old.push(label); break; }
    }
  };
  for (const d of await thumbDirs(slug)) await scan(path.join(thumbsDir(slug), 'directions', d.id, 'content.json'), `design/thumbnails/directions/${d.id}`, false, `thumbnail ${d.id}`);
  for (const d of await decks(slug)) await scan(path.join(carouselsDir(slug), d.deck, 'content.json'), `design/carousels/${d.deck}`, true, `${d.deck} carousel`);
  return { usedBy: now, inVersions: old.filter(x => !now.includes(x)) };
}
async function uploadsAPI(req, res, slug, [sub, id], url) {
  const P = path.join(PROJECTS, slug);
  if (!sub && req.method === 'POST') return upload(req, res, slug, url.searchParams.get('name') || 'photo');
  if (sub === 'cutout' && !id && req.method === 'POST') return cutout(req, res, slug);
  if (sub === 'cutout' && id && req.method === 'GET') { const t = CUT_TASKS.get(id); return t && t.slug === slug ? send(res, 200, t) : send(res, 404, { error: 'no such task' }); }
  const rel = String(url.searchParams.get('file') || '');
  const okRel = rel.startsWith(UPLOADS + '/') && IMG_RE.test(rel) && !rel.split('/').some(x => !x || x.startsWith('.') || x === '..');
  const abs = okRel ? inside(P, ...rel.split('/')) : null;
  if (sub === 'usage' && req.method === 'GET') { if (!abs) return send(res, 400, { error: 'only your own photos can be removed' }); return send(res, 200, await usage(slug, rel)); }
  if (!sub && req.method === 'DELETE') {   // moved to the Bin, never deleted; blocked while a design uses it
    if (!abs || !(await exists(abs))) return send(res, 404, { error: 'only your own photos (in assets/uploads) can be removed' });
    const u = await usage(slug, rel);
    if (u.usedBy.length) return send(res, 409, { error: `in use by ${u.usedBy.join(', ')}: change that photo first`, ...u });
    let dest = path.join(os.homedir(), '.Trash', `${slug}-${path.basename(abs)}`);
    if (await exists(dest)) dest = path.join(os.homedir(), '.Trash', `${slug}-${Date.now()}-${path.basename(abs)}`);
    await fs.rename(abs, dest);
    return send(res, 200, { ok: true, trash: dest, ...u });
  }
  return send(res, 405, { error: 'not allowed' });
}

/* ---------- palette: projects/<slug>/palette.json, shared by every editor of the project ---------- */
const HOUSE_PALETTE = [['Ink', '#111114'], ['Paper', '#EDE9E2'], ['Card', '#FFFDF6'], ['Blue', '#1B3FD8'], ['Orange', '#FF4713'], ['Green', '#22E08A']].map(([name, hex]) => ({ name, hex }));
async function paletteAPI(req, res, slug) {
  const f = path.join(PROJECTS, slug, 'palette.json');
  if (req.method === 'GET') { const p = await readJSON(f); return send(res, 200, p && Array.isArray(p.swatches) ? { ...p, saved: true } : { swatches: HOUSE_PALETTE, saved: false, house: true }); }
  if (req.method === 'PUT') {
    const b = JSON.parse(await readBody(req, 1e5)); const seen = new Set(); const sw = [];
    for (const x of Array.isArray(b.swatches) ? b.swatches : []) {
      const hex = String(x && x.hex || '').toUpperCase(); if (!/^#[0-9A-F]{6}$/.test(hex) || seen.has(hex)) continue;
      seen.add(hex); sw.push({ name: String(x.name || hex).replace(/[<>]/g, '').slice(0, 40), hex });
    }
    if (sw.length > 48) return send(res, 400, { error: 'a palette holds at most 48 colours' });
    await writeAtomic(f, JSON.stringify({ note: 'Colour swatches shown in the studio design editors (thumbnails, carousels). Edited from the Colours panel.', swatches: sw, savedAt: Date.now() }, null, 1) + '\n');
    return send(res, 200, { ok: true, swatches: sw });
  }
  return send(res, 405, { error: 'not allowed' });
}

/* ---------- static files (with byte ranges, so audio/video can seek) ---------- */
async function sendFile(req, res, file) {
  const st = await fs.stat(file).catch(() => null);
  if (!st || !st.isFile()) return send(res, 404, 'Not found', 'text/plain');
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
  if (range) {
    let a = range[1] === '' ? st.size - +range[2] : +range[1]; let b = range[1] === '' || range[2] === '' ? st.size - 1 : +range[2];
    a = Math.max(0, a); b = Math.min(st.size - 1, b);
    if (a > b) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${a}-${b}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': b - a + 1, 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') return res.end();
    return fss.createReadStream(file, { start: a, end: b }).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
  if (req.method === 'HEAD') return res.end();
  fss.createReadStream(file).pipe(res);
}
function inside(base, ...parts) { const f = path.join(base, ...parts); return f === base || f.startsWith(base + path.sep) ? f : null; }

/* ---------- jobs: one at a time, in a queue ---------- */
// film kinds (export, sound, audio, stills) run studio/tools/render.mjs; design, moment, moment-sound and proxy run studio/tools/jobs.mjs.
// A job prints "@progress {p, stage}", "@file <path from videos/>", "@warn <text>" lines; everything else is its log.
const JOBS = []; let RUNNING = null; let JOB_N = 0;
const FILM_KINDS = ['export', 'sound', 'audio', 'stills'], OTHER_KINDS = ['design', 'moment', 'moment-sound', 'proxy', 'captions'];
// moment exports are hard-linked into ~/Downloads by the server (ln -f: no second copy on a full disk; same file as outputs/)
const LINK_KINDS = ['moment', 'moment-sound'];
function freeGB() { for (const p of ['/System/Volumes/Data', ROOT]) { try { if (!fss.existsSync(p)) continue; const l = execFileSync('df', ['-k', p], { encoding: 'utf8' }).trim().split('\n').pop().split(/\s+/); const v = +l[3] / 1048576; if (Number.isFinite(v)) return v; } catch { } } return null; }
/** a failed job's reason in her words when the tool did not give one (@error); the log stays under Details */
function plainError(j) {
  const log = j.log.join('\n'); const what = j.spec.kind === 'proxy' ? 'The preview footage' : j.spec.kind === 'audio' ? 'The sound update' : j.spec.kind === 'captions' ? 'Measuring behind the captions' : 'The export';
  const gb = freeGB();
  if (/GB free|No space left|ENOSPC/i.test(log)) return `Not enough free space on your Mac${gb != null ? `: ${gb.toFixed(1)} GB free` : ''}. Empty the Bin or free space in Downloads, then press Export again.`;
  if (/build error|must define buildMoment|SyntaxError|ReferenceError|TypeError/.test(log)) return `${what} stopped: the graphics script of this video has a mistake. Your edits are safe. Ask Claude to fix it (the Details say where).`;
  if (/font failed to load/.test(log)) return `${what} stopped: a font did not load. Ask Claude to look at the Details.`;
  if (/set an in and an out/.test(log)) return 'Set an in and an out point first (the in before the out).';
  if (/no audio stems|Rebuild audio/.test(log)) return 'The sound is not ready yet. Open Advanced, choose Re-mix the sound, wait for it, then export again.';
  if (/EPIPE|ffmpeg exit|Killed|SIGKILL/i.test(log)) return `${what} stopped partway (the video encoder quit). Nothing was replaced. Press Export again; if it fails twice, ask Claude to look at the Details.`;
  return `${what} stopped with an error. Nothing in your project changed. Try again; if it fails again, ask Claude to look at the Details.`;
}
async function toDownloads(files, spec = {}) {
  const dl = path.join(os.homedir(), 'Downloads'); const out = [];
  for (const f of files) {
    if (/\.srt$/i.test(f) && !spec.srt) continue;   // her rule 2026-10-18: no .srt in Downloads unless she ticks "Also save the captions file" (it stays in outputs/)
    const abs = path.join(ROOT, f), dst = path.join(dl, path.basename(f));
    try { await fs.rm(dst, { force: true }); await fs.link(abs, dst); out.push(dst); }
    catch { try { await fs.copyFile(abs, dst); out.push(dst); } catch { /* Downloads not writable: the file stays in outputs/ */ } }
  }
  return out;
}
function jobView(j) { const { proc, ...v } = j; return v; }
function enqueue(slug, spec) {
  const j = { id: String(++JOB_N), slug, spec, state: 'queued', progress: 0, stage: 'waiting', files: [], warnings: [], log: [], created: Date.now() };
  JOBS.push(j); if (JOBS.length > 60) JOBS.splice(0, JOBS.length - 60);
  pump(); return j;
}
function pump() {
  if (RUNNING) return;
  const j = JOBS.find(x => x.state === 'queued'); if (!j) return;
  RUNNING = j; j.state = 'running'; j.started = Date.now();
  const specFile = path.join(STUDIO, '.jobs', `job-${j.id}.json`);
  fss.mkdirSync(path.dirname(specFile), { recursive: true });
  fss.writeFileSync(specFile, JSON.stringify({ ...j.spec, slug: j.slug, base: `http://127.0.0.1:${server.address().port}` }));
  const tool = OTHER_KINDS.includes(j.spec.kind) ? 'jobs.mjs' : 'render.mjs';
  const p = spawn(process.execPath, [path.join(STUDIO, 'tools', tool), 'job', specFile], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, STUDIO_JOB: '1', STUDIO_QUEUE: '1' } });
  j.proc = p; let buf = '';
  const onLine = (line) => {
    if (line.startsWith('@progress ')) { try { const m = JSON.parse(line.slice(10)); j.progress = m.p; j.stage = m.stage || j.stage; } catch { } }
    else if (line.startsWith('@file ')) j.files.push(line.slice(6).trim());
    else if (line.startsWith('@warn ')) { if (j.warnings.length < 80) j.warnings.push(line.slice(6).trim()); }
    else if (line.startsWith('@error ')) { try { const m = JSON.parse(line.slice(7)); j.error = String(m.msg || '').slice(0, 400); if (m.detail) j.log.push(String(m.detail).slice(0, 400)); } catch { } }
    else if (line.trim()) { j.log.push(line.slice(0, 400)); if (j.log.length > 40) j.log.shift(); }
  };
  p.stdout.on('data', d => { buf += d; let k; while ((k = buf.indexOf('\n')) >= 0) { onLine(buf.slice(0, k)); buf = buf.slice(k + 1); } });
  p.stderr.on('data', d => { String(d).split('\n').forEach(l => l.trim() && j.log.push(l.slice(0, 400))); if (j.log.length > 40) j.log.splice(0, j.log.length - 40); });
  p.on('close', async (code) => {
    const ok = code === 0 && j.state !== 'cancelled';
    if (ok && LINK_KINDS.includes(j.spec.kind) && j.files.length) { j.stage = 'saving to Downloads'; j.downloads = await toDownloads(j.files, j.spec); }
    j.state = j.state === 'cancelled' ? 'cancelled' : code === 0 ? 'done' : 'failed'; j.progress = code === 0 ? 1 : j.progress; j.finished = Date.now();
    if (j.state === 'failed' && !j.error) j.error = plainError(j);
    delete j.proc; RUNNING = null; fs.unlink(specFile).catch(() => { }); pump();
  });
}

/* ---------- versions: a folder of JSON snapshots (film + moment edits, design content) ---------- */
// payload: 'edits' (film, moments) or 'content' (designs). dedupe: an automatic version identical to the newest is skipped.
async function versionsAPI(req, res, vdir, id, { payload = 'edits', count = countEdits, dedupe = false } = {}) {
  if (req.method === 'POST') await fs.mkdir(vdir, { recursive: true });   // the folder appears with the first version
  if (!id && req.method === 'GET') {
    const list = [];
    for (const f of (await fs.readdir(vdir).catch(() => [])).filter(f => f.endsWith('.json'))) {
      try {
        const v = JSON.parse(await fs.readFile(path.join(vdir, f), 'utf8'));
        list.push({ id: f.slice(0, -5), label: v.label || '', auto: !!v.auto, savedAt: v.savedAt || 0, count: count ? count(v[payload]) : null });
      } catch { /* skip unreadable file */ }
    }
    return send(res, 200, list.sort((a, b) => b.savedAt - a.savedAt));
  }
  if (!id && req.method === 'POST') {
    const body = JSON.parse(await readBody(req));
    const data = body[payload] || {};
    if (dedupe && body.auto) {
      let newest = null;
      for (const f of (await fs.readdir(vdir)).filter(f => f.endsWith('.json'))) { const v = await readJSON(path.join(vdir, f)); if (v && (!newest || v.savedAt > newest.savedAt)) newest = { ...v, id: f.slice(0, -5) }; }
      if (newest && JSON.stringify(newest[payload]) === JSON.stringify(data)) return send(res, 200, { id: newest.id, savedAt: newest.savedAt, skipped: true });
    }
    const savedAt = Date.now();
    const vid = new Date(savedAt).toISOString().replace(/[:.]/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
    await writeAtomic(path.join(vdir, vid + '.json'), JSON.stringify({ label: String(body.label || '').slice(0, 120), auto: !!body.auto, savedAt, [payload]: data }, null, 1));
    return send(res, 200, { id: vid, savedAt });
  }
  if (id && VERSION_RE.test(id) && req.method === 'GET') {
    const f = path.join(vdir, id + '.json');
    if (!(await exists(f))) return send(res, 404, { error: 'no such version' });
    return send(res, 200, await fs.readFile(f, 'utf8'));
  }
  return send(res, 405, { error: 'not allowed' });
}

/* ---------- moments: /api/<slug>/moment/<id>/(edits|versions|proxy) ---------- */
async function momentAPI(req, res, slug, [id, what, vid]) {
  const man = await readJSON(momentsMan(slug)); const m = man?.moments?.find(x => x.id === id);
  if (!m || !SLUG_RE.test(id)) return send(res, 404, { error: 'no such moment' });
  const base = path.dirname(momentsMan(slug)); const editsFile = path.join(base, 'edits', id + '.json');
  if (what === 'edits') {
    if (req.method === 'GET') return send(res, 200, (await readJSON(editsFile)) || {});
    if (req.method === 'PUT') {
      const e = JSON.parse(await readBody(req)); const out = {};
      if (Object.keys(e.t || {}).length) out.t = e.t;
      if (Object.keys(e.captions || {}).length) out.captions = e.captions;
      if (Object.keys(e.capShort || {}).length) out.capShort = e.capShort;
      if (Object.keys(e.cap16 || {}).length) out.cap16 = e.cap16;   // 16:9 caption chunks she corrected
      for (const k of ['captions16', 'captions9']) { const c = cleanCapStyle(e[k]); if (c) out[k] = c; }
      const mix = cleanMix(e.mix); if (mix) out.mix = mix;
      if (e.captions3 && typeof e.captions3 === 'object') { const c = cleanCapStyle(e.captions3); if (c) out.captions3 = c; }   // (her three-part 16:9 caption sliders)
      // shorts framing (2026-10-26): "frame9" for the whole short, "frame9seg" per section (names from TH.FRAMES)
      const fr = (v) => typeof v === 'string' && /^[a-z0-9]{1,12}$/.test(v);
      if (fr(e.frame9)) out.frame9 = e.frame9;
      if (e.frame9seg && typeof e.frame9seg === 'object') { const m = {}; for (const [k, v] of Object.entries(e.frame9seg)) if (SLUG_RE.test(k.replace(/[_.]/g, '-')) && fr(v)) m[k] = v; if (Object.keys(m).length) out.frame9seg = m; }
      const pz = cleanPauses(e.pauses); if (pz) out.pauses = pz;   // "pause her" correction inserts (2026-11-02)
      await fs.mkdir(path.dirname(editsFile), { recursive: true });
      await writeAtomic(editsFile, Object.keys(out).length ? JSON.stringify(out, null, 1) + '\n' : '{}\n');
      return send(res, 200, { ok: true, savedAt: Date.now() });
    }
  }
  if (what === 'versions') return versionsAPI(req, res, path.join(base, 'versions', id), vid, { payload: 'edits', count: countMomentEdits, dedupe: true });
  if (what === 'proxy' && req.method === 'GET') {
    const info = await readJSON(path.join(base, 'build', 'proxy', id + '.json'));
    if (info && Array.isArray(info.chunks)) {   // chunked proxy (composite.mjs): usable as soon as its first chunks are made
      const chunks = []; for (const c of info.chunks) chunks.push({ ...c, ready: !!c.ready && (await exists(path.join(base, 'build', 'proxy', id, c.file))), url: `/p/${slug}/talking-head/build/proxy/${id}/${c.file}?v=${c.key}` });
      const n = chunks.filter(c => c.ready).length;
      return send(res, 200, { ...info, chunks, ready: n > 0 && chunks[0].ready, complete: n === chunks.length });
    }
    const ok = info && (await exists(path.join(base, 'build', 'proxy', id + '.mp4')));   // the first single-file proxies
    return send(res, 200, ok ? { ready: true, complete: true, ...info, url: `/p/${slug}/talking-head/build/proxy/${id}.mp4?v=${info.created}` } : { ready: false });
  }
  return send(res, 405, { error: 'not allowed' });
}

/* ---------- designs: /api/<slug>/design/thumbnails[/<dir>/(content|versions|duplicate)] and /carousels/<deck>/... ---------- */
function runNode(script, args, cwd) {
  return new Promise((res, rej) => {
    const p = spawn(process.execPath, [script, ...args], { cwd, stdio: ['ignore', 'pipe', 'pipe'] }); let err = '';
    p.stderr.on('data', d => { err += d; }); p.stdout.on('data', () => { });
    p.on('close', c => (c === 0 ? res() : rej(new Error(err.slice(-800) || 'exit ' + c))));
  });
}
async function writeIndex(dir) {  // thumbnails/directions/index.json, as render.mjs writes it (overview.html reads it)
  const ds = (await fs.readdir(dir, { withFileTypes: true })).filter(x => x.isDirectory() && fss.existsSync(path.join(dir, x.name, 'index.html'))).map(x => x.name).sort();
  await writeAtomic(path.join(dir, 'index.json'), JSON.stringify(ds));
}
async function designAPI(req, res, slug, [group, item, what, vid]) {
  if (group === 'thumbnails') {
    const dirs = path.join(thumbsDir(slug), 'directions');
    if (!item) return send(res, 200, { items: await thumbDirs(slug), assets: await assets(slug) });
    if (!SLUG_RE.test(item) || !(await exists(path.join(dirs, item, 'index.html')))) return send(res, 404, { error: 'no such direction' });
    const dir = path.join(dirs, item); const cf = path.join(dir, 'content.json');
    if (what === 'content') {
      if (req.method === 'GET') return send(res, 200, await fs.readFile(cf, 'utf8'));
      if (req.method === 'PUT') {
        const c = JSON.parse(await readBody(req)); if (!c || typeof c !== 'object' || Array.isArray(c)) return send(res, 400, { error: 'content must be an object' });
        await writeAtomic(cf, JSON.stringify(c, null, 2) + '\n'); return send(res, 200, { ok: true, savedAt: Date.now() });
      }
    }
    if (what === 'versions') return versionsAPI(req, res, path.join(dir, 'versions'), vid, { payload: 'content', count: null, dedupe: true });
    if (what === 'duplicate' && req.method === 'POST') {
      const root = item.replace(/-v\d+$/, ''); let k = 2; while (await exists(path.join(dirs, `${root}-v${k}`))) k++;
      const nd = `${root}-v${k}`; await fs.mkdir(path.join(dirs, nd));
      await fs.copyFile(path.join(dir, 'index.html'), path.join(dirs, nd, 'index.html'));
      const c = await readJSON(cf, {}); c.direction = `${(c.direction || root).replace(/ \(variant \d+\)$/, '')} (variant ${k})`;
      await writeAtomic(path.join(dirs, nd, 'content.json'), JSON.stringify(c, null, 2) + '\n'); await writeIndex(dirs);
      return send(res, 200, { id: nd });
    }
    if (!what && req.method === 'DELETE') {   // only variants made with Duplicate; moved to the Bin, never deleted
      if (!/-v\d+$/.test(item)) return send(res, 400, { error: 'only a duplicated variant can be removed here' });
      const dest = path.join(os.homedir(), '.Trash', `${slug}-thumbnail-${item}-${Date.now()}`);
      await fs.rename(dir, dest); await writeIndex(dirs);
      return send(res, 200, { ok: true, trash: dest });
    }
    return send(res, 405, { error: 'not allowed' });
  }
  if (group === 'carousels') {
    if (!SLUG_RE.test(item || '')) return send(res, 404, { error: 'no such deck' });
    const dir = path.join(carouselsDir(slug), item); const cf = path.join(dir, 'content.json');
    if (!(await exists(cf))) return send(res, 404, { error: 'no such deck' });
    if (!what) return send(res, 200, { ...(await decks(slug)).find(d => d.deck === item), assets: await assets(slug) });
    if (what === 'content') {
      if (req.method === 'GET') return send(res, 200, await fs.readFile(cf, 'utf8'));
      if (req.method === 'PUT') {
        const c = JSON.parse(await readBody(req)); if (!c || !Array.isArray(c.slides)) return send(res, 400, { error: 'content must have slides' });
        const prev = await fs.readFile(cf, 'utf8');
        await writeAtomic(cf, JSON.stringify(c, null, 2));
        try { await runNode(path.join(carouselsDir(slug), 'shared', 'build.mjs'), [item, '--html'], carouselsDir(slug)); }
        catch (e) { await writeAtomic(cf, prev); await runNode(path.join(carouselsDir(slug), 'shared', 'build.mjs'), [item, '--html'], carouselsDir(slug)).catch(() => { }); return send(res, 400, { error: 'build failed, change not kept: ' + e.message }); }
        return send(res, 200, { ok: true, savedAt: Date.now() });
      }
    }
    if (what === 'versions') return versionsAPI(req, res, path.join(dir, 'versions'), vid, { payload: 'content', count: null, dedupe: true });
    return send(res, 405, { error: 'not allowed' });
  }
  return send(res, 404, { error: 'no such design group' });
}

/* ---------- Show in Finder: the copy in Downloads if the browser saved one, else the file in outputs/ ---------- */
async function reveal(req, res) {
  const { file } = JSON.parse(await readBody(req, 1e5));
  const abs = inside(PROJECTS, ...String(file || '').replace(/^projects\//, '').split('/'));
  if (!abs || !(await exists(abs))) return send(res, 404, { error: 'no such file' });
  const dl = path.join(os.homedir(), 'Downloads'); const ext = path.extname(abs), stem = path.basename(abs, ext);
  let target = abs, best = 0;   // Chrome names a repeat download "name (1).ext"
  for (const f of await fs.readdir(dl).catch(() => [])) {
    if (f !== stem + ext && !(f.startsWith(stem + ' (') && f.endsWith(')' + ext))) continue;
    const st = await fs.stat(path.join(dl, f)).catch(() => null); if (st && st.mtimeMs > best) { best = st.mtimeMs; target = path.join(dl, f); }
  }
  spawn('open', ['-R', target], { stdio: 'ignore', detached: true }).unref();
  return send(res, 200, { revealed: target, downloads: target !== abs });
}

/* ---------- API ---------- */
// Ideas board (ideas/ideas.json): we add ideas, she marks them (make / later / skip) and leaves notes.
const IDEAS = path.join(ROOT, 'ideas', 'ideas.json');
async function ideasAPI(req, res, id) {
  let db = { ideas: [] };
  try { db = JSON.parse(await fs.readFile(IDEAS, 'utf8')); } catch {}
  if (req.method === 'GET') return send(res, 200, db);
  if (req.method !== 'POST' || !id) return send(res, 405, { error: 'not allowed' });
  const idea = db.ideas.find(x => x.id === id); if (!idea) return send(res, 404, { error: 'no such idea' });
  const b = JSON.parse(await readBody(req, 1e5));
  if (['new', 'make', 'later', 'skip', 'recorded'].includes(b.status)) idea.status = b.status;
  if (typeof b.note === 'string') idea.note = b.note.slice(0, 5000);
  await fs.writeFile(IDEAS, JSON.stringify(db, null, 2));
  return send(res, 200, idea);
}

// Short formats gallery (inspiration/short-formats/): real shorts she marks "like" / "no" with a note.
const SF = path.join(ROOT, 'inspiration', 'short-formats');
async function formatsAPI(req, res, id) {
  let items = [], picks = {};
  try { items = JSON.parse(await fs.readFile(path.join(SF, 'formats.json'), 'utf8')).items || []; } catch {}
  try { picks = JSON.parse(await fs.readFile(path.join(SF, 'picks.json'), 'utf8')); } catch {}
  if (req.method === 'GET') return send(res, 200, { items, picks });
  if (req.method !== 'POST' || !id || !items.some(x => x.id === id)) return send(res, 404, { error: 'no such example' });
  const b = JSON.parse(await readBody(req, 1e5)); const cur = picks[id] || { pick: '', note: '' };
  if (['like', 'no', ''].includes(b.pick)) cur.pick = b.pick;
  if (typeof b.note === 'string') cur.note = b.note.slice(0, 5000);
  picks[id] = cur; await fs.writeFile(path.join(SF, 'picks.json'), JSON.stringify(picks, null, 2));
  return send(res, 200, cur);
}

// Inspiration boards (inspiration/boards/<board>/): board.json {title, subtitle, groups, items: [{id, img, group, title?}]},
// picks.json {id: {pick: like|no|'', note}}, images in img/. Pages: /ideas/boards/<board>/ (thumbnails, design).
const BOARDS = path.join(ROOT, 'inspiration', 'boards');
const BOARD_RE = /^[a-z0-9-]{1,40}$/;
async function boardsAPI(req, res, board, id) {
  if (!board) {
    const out = [];
    for (const d of (await fs.readdir(BOARDS).catch(() => [])).sort()) {
      try { const b = JSON.parse(await fs.readFile(path.join(BOARDS, d, 'board.json'), 'utf8')); out.push({ board: d, title: b.title, count: (b.items || []).length }); } catch {}
    }
    return send(res, 200, out);
  }
  if (!BOARD_RE.test(board)) return send(res, 404, { error: 'no such board' });
  const dir = path.join(BOARDS, board);
  let b = null, picks = {};
  try { b = JSON.parse(await fs.readFile(path.join(dir, 'board.json'), 'utf8')); } catch { return send(res, 404, { error: 'no such board' }); }
  try { picks = JSON.parse(await fs.readFile(path.join(dir, 'picks.json'), 'utf8')); } catch {}
  if (req.method === 'GET') return send(res, 200, { ...b, picks });
  if (req.method !== 'POST' || !id || !(b.items || []).some(x => x.id === id)) return send(res, 404, { error: 'no such item' });
  const body = JSON.parse(await readBody(req, 1e5)); const cur = picks[id] || { pick: '', note: '' };
  if (['like', 'no', ''].includes(body.pick)) cur.pick = body.pick;
  if (typeof body.note === 'string') cur.note = body.note.slice(0, 5000);
  picks[id] = cur; await fs.writeFile(path.join(dir, 'picks.json'), JSON.stringify(picks, null, 2));
  return send(res, 200, cur);
}

async function api(req, res, parts, url) {
  if (parts[0] === 'boards') return boardsAPI(req, res, parts[1], parts[2]);
  if (parts[0] === 'projects') return send(res, 200, await projects());
  if (parts[0] === 'catalog') return send(res, 200, await catalog());
  if (parts[0] === 'reveal' && req.method === 'POST') return reveal(req, res);
  if (parts[0] === 'ideas') return ideasAPI(req, res, parts[1]);
  if (parts[0] === 'formats') return formatsAPI(req, res, parts[1]);
  if (parts[0] === 'jobs') {
    if (!parts[1]) return send(res, 200, JOBS.map(jobView).reverse());
    const j = JOBS.find(x => x.id === parts[1]); if (!j) return send(res, 404, { error: 'no such job' });
    if (req.method === 'DELETE') { if (j.state === 'queued') j.state = 'cancelled'; else if (j.proc) { j.state = 'cancelled'; j.proc.kill('SIGTERM'); } return send(res, 200, jobView(j)); }
    return send(res, 200, jobView(j));
  }
  const [slug, what, id] = parts;
  if (!SLUG_RE.test(slug || '') || !(await exists(path.join(PROJECTS, slug)))) return send(res, 404, { error: 'no such project' });
  if (what === 'kit' && req.method === 'GET') { const f = path.join(PROJECTS, slug, 'kit', 'refined-kit.md'); try { const md = await fs.readFile(f, 'utf8'); const st = await fs.stat(f); return send(res, 200, { md, mtime: st.mtime }); } catch { return send(res, 404, { error: 'no refined kit yet' }); } }
  if (what === 'moment') return momentAPI(req, res, slug, parts.slice(2));
  if (what === 'design') return designAPI(req, res, slug, parts.slice(2));
  if (what === 'assets' && req.method === 'GET') return send(res, 200, { groups: await assets(slug) });
  if (what === 'uploads') return uploadsAPI(req, res, slug, parts.slice(2), url);
  if (what === 'palette') return paletteAPI(req, res, slug);
  let spec = null;
  if (what === 'jobs' && req.method === 'POST') {
    spec = JSON.parse(await readBody(req));
    if (OTHER_KINDS.includes(spec.kind)) return send(res, 200, jobView(enqueue(slug, spec)));
    if (!FILM_KINDS.includes(spec.kind)) return send(res, 400, { error: 'unknown job kind' });
  }
  const dir = await filmDir(slug);
  if (!dir) return send(res, 404, { error: 'no such project' });
  const editsFile = path.join(dir, 'edits.json');
  const vdir = path.join(dir, 'versions');

  if (what === 'edits' && !id) {
    if (req.method === 'GET') {
      if (!(await exists(editsFile))) return send(res, 200, { t: {}, captions: {} });
      return send(res, 200, await fs.readFile(editsFile, 'utf8'));
    }
    if (req.method === 'PUT') {
      const edits = JSON.parse(await readBody(req));
      const mix = cleanMix(edits.mix); delete edits.mix; if (mix) edits.mix = mix;
      const modes = cleanModes(edits.modes); delete edits.modes; if (modes) edits.modes = modes;
      await writeAtomic(editsFile, JSON.stringify({ version: 2, ...edits, savedAt: Date.now() }, null, 1));
      return send(res, 200, { ok: true, savedAt: Date.now() });
    }
  }
  if (what === 'versions') return versionsAPI(req, res, vdir, id);
  if (what === 'audio' && req.method === 'GET') {   // preview stems + their metadata
    const sj = path.join(dir, 'build', 'stems', 'stems.json');
    if (!(await exists(sj))) return send(res, 200, { ready: false });
    return send(res, 200, { ready: true, ...JSON.parse(await fs.readFile(sj, 'utf8')) });
  }
  if (what === 'jobs' && spec) return send(res, 200, jobView(enqueue(slug, spec)));
  return send(res, 405, { error: 'not allowed' });
}

/* ---------- home: every project and everything in it that opens in an editor ---------- */
async function listing(res) {
  const ps = await catalog(); const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  const e = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const row = (href, kind, title, meta) => `<a class="p" href="${href}"><span class="kd">${kind}</span><span class="t">${e(title)}</span><span class="m">${meta}</span></a>`;
  const edits = (n) => (n ? ` · ${n} edit${n > 1 ? 's' : ''}` : '');
  const kits = {}; for (const p of ps) { try { const st = await fs.stat(path.join(PROJECTS, p.slug, 'kit', 'refined-kit.md')); kits[p.slug] = st.mtime; } catch {} }
  const blocks = ps.map(p => {
    const grp = (h, note, rows) => (rows.length ? `<h3>${h}${note ? ` <span class="nt">${note}</span>` : ''}</h3>${rows.join('')}` : '');
    const film = p.film ? [row(`/edit/${p.slug}/`, 'Film', p.film.title, `${fmt(p.film.duration)}${edits(p.film.edits)}`)] : [];
    const mrow = (m, kd) => row(`/moment/${p.slug}/${m.id}/`, kd, m.title, `${fmt(m.duration)}${edits(m.edits)}`);
    const full = p.moments.filter(m => m.kind === 'full').map(m => mrow(m, 'Full edit'));
    const mom = p.moments.filter(m => m.kind === 'moment').map(m => mrow(m, `Moment ${String(m.n).padStart(2, '0')}`));
    const sho = p.moments.filter(m => m.kind === 'short').map(m => mrow(m, `Short ${String(m.n).padStart(2, '0')}`));
    const tea = p.moments.filter(m => m.kind === 'teaser').map(m => mrow(m, 'Teaser'));
    const th = p.thumbnails.length ? [row(`/design/${p.slug}/thumbnails/`, 'Thumbnails', `${p.thumbnails.length} directions`, '1280×720 · PNG')] : [];
    const car = p.decks.map(d => row(`/design/${p.slug}/carousels/${d.deck}/`, d.deck === 'linkedin' ? 'LinkedIn' : d.deck === 'instagram' ? 'Instagram' : d.deck, `Carousel · ${d.slides} slides`, `${d.width}×${d.height} · PNG${d.pdf ? ' + PDF' : ''}`));
    const kit = kits[p.slug] ? [row(`/kit/${p.slug}/`, 'Kit', 'Refined kit: titles, thumbnails, description, captions', `updated ${kits[p.slug].toISOString().slice(0, 10)}`)] : [];
    const count = kit.length + film.length + full.length + mom.length + sho.length + tea.length + th.length + car.length;
    return `<details class="proj" data-slug="${e(p.slug)}"><summary><h2>${e(p.title)}</h2><span class="n">${count} item${count === 1 ? '' : 's'}</span></summary><p class="k">projects/${e(p.slug)}</p>`
      + grp('Kit (open it while you upload)', '', kit)
      + grp('Motion film', 'pure motion graphics on her narration', film)
      + grp('Talking-head edit (your whole video with graphics)', '', full)
      + grp('Talking-head moments (your video with graphics)', '', mom)
      + grp('Shorts', '9:16 · label, captions, end card', sho)
      + grp('Teaser (LinkedIn and X)', 'the best lines, 16:9 · 1:1 · 4:5 · 9:16', tea)
      + grp('Thumbnails', '', th) + grp('Carousels', 'Instagram and LinkedIn', car) + '</details>';
  }).join('') || '<p class="m">No projects yet. Films live in projects/&lt;slug&gt;/film/, designs in projects/&lt;slug&gt;/design/.</p>';
  send(res, 200, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Video Studio</title>
<link rel="stylesheet" href="/studio/runtime/fonts.css">
<style>:root{--bg:#111114;--fg:#EDE9E2;--mid:#8A8780;--line:#2B2B31;--acc:#6E8CFF}
body{margin:0;background:var(--bg);color:var(--fg);font:16px Archivo,system-ui,sans-serif}main{max-width:820px;margin:0 auto;padding:56px 16px 80px}
h1{font:800 64px/0.92 "Bricolage Grotesque",sans-serif;letter-spacing:-0.03em;text-transform:uppercase;margin:0 0 8px}
h2{font:800 30px/1 "Bricolage Grotesque",sans-serif;letter-spacing:-0.02em;text-transform:uppercase;margin:0 0 6px}
details.proj{margin-top:18px;border-top:1px solid var(--line);padding-top:18px}summary{display:flex;align-items:baseline;gap:14px;cursor:pointer;list-style:none;user-select:none}summary::-webkit-details-marker{display:none}
summary h2{margin:0;flex:1;min-width:0}summary::before{content:"+";font:500 26px "DM Mono",monospace;color:var(--mid);width:22px;flex:none}details[open]>summary::before{content:"\\2212"}summary:hover h2{color:var(--acc)}
summary .n{font:500 12px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--mid);white-space:nowrap}details.proj>.k{margin:10px 0 0 36px}details.proj>h3,details.proj>.p{margin-left:36px}
h3{font:700 15px Archivo,sans-serif;margin:30px 0 10px;letter-spacing:.01em}h3 .nt{font:500 12px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--mid);margin-left:8px}.k{font:500 13px "DM Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--mid);margin:0 0 18px}
.p{display:grid;grid-template-columns:130px 1fr auto;align-items:baseline;gap:16px;padding:16px 0;border-top:1px solid var(--line);color:var(--fg);text-decoration:none}
.p:last-child{border-bottom:1px solid var(--line)}.p:hover .t{color:var(--acc)}.t{font:700 21px Archivo,sans-serif;letter-spacing:-0.01em;min-width:0}
.kd,.m{font:500 12px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--mid);white-space:nowrap}
@media (max-width:620px){.p{grid-template-columns:1fr}.m{white-space:normal}}</style></head>
<body><main><h1>Video studio</h1><p class="k"><a href="/ideas/" style="color:var(--acc)">Ideas board: what to record next →</a> &nbsp;·&nbsp; <a href="/ideas/formats/" style="color:var(--acc)">Shorts formats: real examples to like or skip →</a> &nbsp;·&nbsp; <a href="/ideas/boards/thumbnails/" style="color:var(--acc)">Thumbnail board →</a> &nbsp;·&nbsp; <a href="/ideas/boards/design/" style="color:var(--acc)">Design board →</a> &nbsp;·&nbsp; <a href="/ideas/boards/fonts/" style="color:var(--acc)">Font board: fonts + colour pairs →</a></p><p class="k">Everything here opens in an editor · edits save into each project · the newest project first; click a title to open or close it</p>${blocks}</main>
<script>(()=>{const K='studio.home.open';let st={};try{st=JSON.parse(localStorage.getItem(K)||'{}')||{}}catch(e){}
document.querySelectorAll('details.proj').forEach((d,i)=>{const s=d.dataset.slug;d.open=s in st?!!st[s]:i===0;
d.addEventListener('toggle',()=>{st[s]=d.open;try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}})})})()</script></body></html>`, 'text/html; charset=utf-8');
}

export async function handler(req, res) {
  try {
    const url = new URL(req.url, 'http://localhost');
    const parts = decodeURIComponent(url.pathname).split('/').filter(Boolean);
    if (parts.some(p => p.startsWith('.') || p.includes('\0'))) return send(res, 404, 'Not found', 'text/plain');
    if (parts[0] === 'api') return await api(req, res, parts.slice(1), url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { error: 'not allowed' });
    if (!parts.length) return await listing(res);
    if (parts[0] === 'favicon.ico') { res.writeHead(204); return res.end(); }
    const slash = (n) => { if (!url.pathname.endsWith('/') && parts.length === n) { res.writeHead(301, { Location: url.pathname + '/' + url.search }); res.end(); return true; } return false; };
    if (parts[0] === 'edit' && parts[1]) {
      if (!(await filmDir(parts[1]))) return send(res, 404, 'No such film', 'text/plain');
      if (!url.pathname.endsWith('/') && parts.length === 2) { res.writeHead(301, { Location: url.pathname + '/' }); return res.end(); }
      return sendFile(req, res, path.join(STUDIO, 'editor', 'index.html'));
    }
    if (parts[0] === 'moment' && parts[1] && parts[2]) {
      if (!SLUG_RE.test(parts[1]) || !(await moments(parts[1])).some(m => m.id === parts[2])) return send(res, 404, 'No such moment', 'text/plain');
      if (slash(3)) return;
      return sendFile(req, res, path.join(STUDIO, 'editor', 'moment.html'));
    }
    if (parts[0] === 'design' && parts[1] && SLUG_RE.test(parts[1])) {
      const ok = parts[2] === 'thumbnails' ? (await thumbDirs(parts[1])).length > 0 && parts.length === 3
        : parts[2] === 'carousels' && parts[3] ? (await decks(parts[1])).some(d => d.deck === parts[3]) && parts.length === 4 : false;
      if (!ok) return send(res, 404, 'No such design', 'text/plain');
      if (slash(parts.length)) return;
      return sendFile(req, res, path.join(STUDIO, 'editor', 'design.html'));
    }
    if (parts[0] === 'kit' && SLUG_RE.test(parts[1] || '') && parts.length === 2) { if (slash(2)) return; return sendFile(req, res, path.join(STUDIO, 'editor', 'kit.html')); }
    if (parts[0] === 'ideas' && parts[1] === 'boards' && BOARD_RE.test(parts[2] || '') && parts.length === 3) { if (slash(3)) return; return sendFile(req, res, path.join(STUDIO, 'editor', 'board.html')); }
    if (parts[0] === 'ideas' && parts[1] === 'boards' && BOARD_RE.test(parts[2] || '') && parts[3] === 'img' && parts[4]) { const f = inside(path.join(BOARDS, parts[2], 'img'), ...parts.slice(4)); return f ? sendFile(req, res, f) : send(res, 404, 'Not found', 'text/plain'); }
    if (parts[0] === 'ideas' && parts[1] === 'formats' && parts.length === 2) { if (slash(2)) return; return sendFile(req, res, path.join(STUDIO, 'editor', 'formats.html')); }
    if (parts[0] === 'ideas' && parts[1] === 'formats' && parts[2] === 'frames' && parts[3]) { const f = inside(path.join(SF, 'frames'), ...parts.slice(3)); return f ? sendFile(req, res, f) : send(res, 404, 'Not found', 'text/plain'); }
    if (parts[0] === 'ideas' && parts.length === 1) { if (slash(1)) return; return sendFile(req, res, path.join(STUDIO, 'editor', 'ideas.html')); }
    if (parts[0] === 'ideas' && parts[1] === 'idea' && parts[2] && parts.length === 3) { if (slash(3)) return; return sendFile(req, res, path.join(STUDIO, 'editor', 'idea.html')); }
    if (parts[0] === 'render' && parts[1]) return sendFile(req, res, path.join(STUDIO, 'runtime', 'film.html'));
    let file = null;
    if (parts[0] === 'studio' && (parts[1] === 'runtime' || parts[1] === 'editor')) file = inside(STUDIO, ...parts.slice(1));
    else if (parts[0] === 'ideas') file = inside(path.join(ROOT, 'ideas'), ...parts.slice(1));
    else if (parts[0] === 'library') file = inside(path.join(ROOT, 'library'), ...parts.slice(1));
    else if (parts[0] === 'p' && SLUG_RE.test(parts[1] || '')) file = inside(path.join(PROJECTS, parts[1]), ...parts.slice(2));
    if (!file) return send(res, 404, 'Not found', 'text/plain');
    return sendFile(req, res, file);
  } catch (e) {
    send(res, e.status || 500, { error: e.message });
  }
}

const server = http.createServer(handler);
export function start(port = PORT) {
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  server.on('error', (e) => { console.error(e.code === 'EADDRINUSE' ? `Port ${PORT} is busy: the studio is probably already running (http://localhost:${PORT}/).` : e); process.exit(1); });
  start().then(async () => {
    console.log(`Video studio running -> http://localhost:${PORT}/`);
    for (const p of await catalog()) {
      console.log(`  ${p.title}:`);
      if (p.film) console.log(`    film        http://localhost:${PORT}/edit/${p.slug}/`);
      for (const m of p.moments) console.log(`    ${(m.kind === 'full' ? 'full edit' : m.kind + ' ' + String(m.n).padStart(2, '0')).padEnd(11)} http://localhost:${PORT}/moment/${p.slug}/${m.id}/`);
      if (p.thumbnails.length) console.log(`    thumbnails  http://localhost:${PORT}/design/${p.slug}/thumbnails/`);
      for (const d of p.decks) console.log(`    ${d.deck.padEnd(11)} http://localhost:${PORT}/design/${p.slug}/carousels/${d.deck}/`);
    }
    console.log('Edits save into each project (+ versions/). Ctrl+C to stop.');
  });
}

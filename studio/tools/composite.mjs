#!/usr/bin/env node
// Footage moments: her talking-head video, cropped per frame by the moment's virtual camera, with the moment's
// graphics (studio runtime + footage.js, transparent canvas) laid over it. One ffmpeg pass per render; the 4K source is
// decoded with VideoToolbox and never written out; graphics frames are piped as PNG (no image sequence on disk).
//
//   node studio/tools/composite.mjs meta   <talking-head.json> <id> [--aspect 9x16]
//   node studio/tools/composite.mjs stills <talking-head.json> <id> --at 1.5,4,9 [--aspect 9x16] [--captions] [--out dir] [--frame9 4x5] [--prefix name_]
//   node studio/tools/composite.mjs sheet  <talking-head.json> <id> [--aspect 9x16] [--every 2] [--captions] [--out file.jpg]
//   node studio/tools/composite.mjs check  <talking-head.json> <id|all> [--aspect 9x16] [--frame9 wide]   (graphics density gaps, text over her face,
//                                      short-zoom: her face share in 9:16 shorts (median 0.15-0.30, fill <= 0.36; camera zooms on her <= 1), layout-variety: face + graphic layouts in a full edit)
//   node studio/tools/composite.mjs export <talking-head.json> <id|all> [--aspect 9x16|16x9|both] [--no-voice] [--no-music] [--no-sfx]
//                                      [--captions | --no-captions] (default: 9:16 and full edits on) [--t0 s --t1 s] (a range -> outputs/.../clips/)
//                                      [--label section07-half | line42] (a range named by its section / sentence, not its times)
//                                      [--speed 0.5 … 2] (plays faster: video setpts + fps at the end, sound atempo before the -14 LUFS master; file name _1.2x)
//   node studio/tools/composite.mjs frame  <talking-head.json> <id> --at s [--aspect 16x9] [--captions | --no-captions]   (one PNG -> outputs/.../frames/)
//   node studio/tools/composite.mjs capbg  <talking-head.json> <id> [--aspect 16x9]   (measure the picture behind her 16:9 captions: build/captions/<id>_16x9.json)
//   node studio/tools/composite.mjs proxy  <talking-head.json> <id|all>   (preview footage for the studio's moment editor)
//   node studio/tools/composite.mjs sound  <talking-head.json> <id> [--tracks voice,music,sfx] [--out dir]   (sound only, WAVs)
//   node studio/tools/composite.mjs matte  <talking-head.json> <id|all>   (make her matte for the frames the layouts cut her out of)
//   node studio/tools/composite.mjs hashes <talking-head.json> <id|all> [--out f.json] [--against f.json]   (regression check)
// export / sound: --voice-db dB --music-db dB --sfx-db dB (default: the "mix" in talking-head/edits/<id>.json, her sliders)
// Exports: <manifest "out">/moment01-<slug>_9x16.mp4 (captions burned in) and _16x9.mp4, each with an .srt.
// Proxy: <talking-head>/build/proxy/<id>/vNNN.mp4 = the EDL's frames (the same select as export), whole 16:9 source frame
// at 1280x720, in chunks of 30 s for long moments (a full-length edit previews and rebuilds chunk by chunk: only chunks whose
// frames changed are made again), short GOP for scrubbing; when a layout cuts her out (L2, L6) each frame also carries her
// matte in a band under the picture (1280x1080: matte at 0,720 640x360). <id>/{voice,music,sfx}.m4a (the mix's tracks, for
// the editor's toggles); <id>.json ({chunks, band, vkey, akey}: the editor's stale check). Video and sound are made apart:
// a moved sound cue only re-mixes the sound (seconds).
// Heavy work (exports, proxies, stills, matte) runs under the machine-wide render lock /tmp/gm-render.lock (tools/lock.mjs).
// Shorts (moment "kind": "short") export 9:16 only, to the manifest's "shortsOut" (default ../outputs/shorts), named
// shortNN-<slug>_9x16.mp4; a full-length edit ("kind": "full") is named talkinghead-<slug>_<size>.mp4.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { withLock } from './lock.mjs';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.dirname(STUDIO);
const DIMS = { '16x9': [1920, 1080], '9x16': [1080, 1920], '1x1': [1080, 1080], '4x5': [1080, 1350] };   // 1:1 and 4:5: the 9:16 layout fitted (core.js ASPECTS)
const PAD_COLOR = '0xEDE9E2';   // paper: what shows around the picture in "window" (pad) framing, under the graphics
let PAD = PAD_COLOR;   // per project: talking-head.json "pad": "#RRGGBB" (a dark film look shows its own ground, not paper, while a panel slides in)
const padOf = (man, id) => { const mp = ((id && (man.moments || []).find(x => x.id === id)) || {}).pad || man.pad;   // a moment's own "pad" wins (dark-patterns shorts: each its own palette, 2026-11-12)
  return (PAD = /^#[0-9a-f]{6}$/i.test(mp || '') ? '0x' + mp.slice(1) : PAD_COLOR); };
const JOB = !!process.env.STUDIO_JOB;   // run by the studio's queue: print @progress / @file lines
const say = (kind, o) => { if (JOB) console.log(`@${kind} ${typeof o === 'string' ? o : JSON.stringify(o)}`); };

function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const c = [];
  if (fs.existsSync(base)) for (const v of fs.readdirSync(base).sort().reverse()) c.push(path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'));
  c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  return c.find(p => fs.existsSync(p));
}
let SERVER = null;
async function server() { const { start } = await import(path.join(STUDIO, 'server.mjs')); SERVER = await start(0); return `http://127.0.0.1:${SERVER.address().port}`; }
const launch = () => puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--force-color-profile=srgb'] });
function manURL(manPath) { const rel = path.relative(path.join(ROOT, 'projects'), path.resolve(manPath)); if (rel.startsWith('..')) throw new Error('manifest must be inside projects/'); return '/p/' + rel.split(path.sep).join('/'); }
async function openPage(browser, base, man, id, aspect, captions, extra) {
  const page = await browser.newPage(); const [w, h] = DIMS[aspect];
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('[page]', e.message)); page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
  const q = new URLSearchParams({ m: manURL(man), id, aspect, captions: captions ? '1' : '0', ...(extra || {}) });   // extra: {frame9: '4x5'} (comparison stills)
  await page.goto(`${base}/studio/runtime/moment.html?${q}`, { waitUntil: 'load' });
  await page.waitForFunction('window.READY === true', { timeout: 90000 });
  const err = await page.evaluate('window.BUILD_ERROR'); if (err) throw new Error('build error: ' + err);
  return page;
}
const dataURLbuf = (u) => Buffer.from(u.slice(u.indexOf(',') + 1), 'base64');
function run(cmd, args, o = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: [o.input ? 'pipe' : 'ignore', 'pipe', 'pipe'] }); let out = '', err = '';
    p.stdout.on('data', d => { out += d; }); p.stderr.on('data', d => { err += d; });
    if (o.input) { p.stdin.end(o.input); }
    p.on('close', c => (c === 0 ? res(out) : rej(new Error(`${cmd} exit ${c}: ${err.slice(-1500)}`))));
  });
}
function srtTime(t) { const ms = Math.max(0, Math.round(t * 1000)); const p = (n, k = 2) => String(n).padStart(k, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; }
const even = (x) => Math.round(x / 2) * 2;
const mmss = (t) => { const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${String(m).padStart(2, '0')}m${String(s).padStart(2, '0')}s`; };
function uniq(dir, name, ext) { let f = path.join(dir, name + ext), k = 2; while (fs.existsSync(f)) f = path.join(dir, `${name}-${k++}${ext}`); return f; }
/* ---------- failures in plain words (the studio's export panel shows e.plain; the technical part goes under Details) ---------- */
class Plain extends Error { constructor(msg, detail) { super(msg + (detail ? ` (${detail})` : '')); this.plain = msg; this.detail = detail || ''; } }
/** free space (GB) on the Mac's data volume (where projects/, Downloads and the Bin live). GM_FAKE_FREE_GB: tests only. */
function freeGB() {
  if (process.env.GM_FAKE_FREE_GB != null) return +process.env.GM_FAKE_FREE_GB;
  for (const p of ['/System/Volumes/Data', ROOT]) { try { if (!fs.existsSync(p)) continue; const l = execFileSync('df', ['-k', p], { encoding: 'utf8' }).trim().split('\n').pop().split(/\s+/); const v = +l[3] / 1048576; if (Number.isFinite(v)) return v; } catch { } }
  return 99;
}
/** stop before an export when the disk is nearly full (8 GB: projects/BUILD-BRIEF.md; GM_MIN_FREE_GB lowers it for a run) */
function checkFree(min = +process.env.GM_MIN_FREE_GB > 0 ? +process.env.GM_MIN_FREE_GB : 8) {
  const free = freeGB(); if (free >= min) return free;
  throw new Plain(`Not enough free space on your Mac: ${free.toFixed(1)} GB free, exports need ${min} GB. Empty the Bin or free space in Downloads, then press Export again.`,
    `free ${free.toFixed(2)} GB on /System/Volumes/Data, guard ${min} GB (GM_MIN_FREE_GB)`);
}
/** wait while another heavy render (ffmpeg / headless Chrome not started by us) is running: one heavy job at a time */
// (inside the studio's queue, which already runs one job at a time, only ffmpeg counts: a headless Chrome may be an editor)
async function waitIdle() {   // (kept for reference; the render lock replaced it: see lockRun)
  for (let k = 0; ; k++) {
    let busy = ''; try { busy = execFileSync('pgrep', ['-fl', process.env.STUDIO_QUEUE ? 'ffmpeg' : 'ffmpeg|chrome-headless'], { encoding: 'utf8' }).trim(); } catch { busy = ''; }
    if (!busy) return;
    console.log(`waiting: another render is running (${busy.split('\n').length} processes)`);
    await new Promise(r => setTimeout(r, 20000));
  }
}

// her volume sliders: talking-head/edits/<id>.json "mix" {voice, music, sfx} in dB (missing = 0); --<k>-db flags win
const MIX_KEYS = ['voice', 'music', 'sfx'];
function mixOf(man, id, o = {}) {
  let m = null; try { m = JSON.parse(fs.readFileSync(path.join(man.dir, 'edits', id + '.json'), 'utf8')).mix; } catch { }
  return Object.fromEntries(MIX_KEYS.map(k => [k, Math.max(-24, Math.min(12, Math.round(+(o[k + '-db'] != null ? o[k + '-db'] : (m || {})[k]) || 0)))]));
}
/** footmix gets the page's clips only when the moment has a "pause her" insert (otherwise it reads edl.json, as before) */
const clipsArg = (meta, tmp) => { if (!meta.clips.some(c => c.length > 2 && c[2] && c[2].pause != null)) return []; const f = path.join(tmp, 'clips.json'); fs.writeFileSync(f, JSON.stringify(meta.clips)); return ['--clips', f]; };
const mixArgs = (mix) => MIX_KEYS.flatMap(k => (mix[k] ? [`--${k}-db`, String(mix[k])] : []));
/** run fn under the machine-wide render lock, telling the queue while it waits */
const lockRun = (what, fn) => withLock(what, fn, { onWait: (owner, s) => { const m = `waiting for another render (${owner || 'busy'})`; console.log(m); say('progress', { p: 0.01, stage: 'waiting for another render' }); } });
function loadMan(manPath) { const man = JSON.parse(fs.readFileSync(manPath, 'utf8')); man.dir = path.dirname(path.resolve(manPath)); man.src = path.resolve(man.dir, man.source); return man; }
// moments are numbered among moments, shorts among shorts (manifests without shorts: as before)
function outName(man, id, meta) {
  const m = man.moments.find(x => x.id === id); const kind = m.kind || 'moment';
  if (kind === 'full') return `talkinghead-${meta.slug || m.slug}`;
  if (kind === 'teaser') return `teaser-${meta.slug || m.slug}`;
  const same = man.moments.filter(x => (x.kind || 'moment') === kind); const n = same.findIndex(x => x.id === id) + 1;
  return `${kind === 'short' ? 'short' : 'moment'}${String(n).padStart(2, '0')}-${meta.slug || m.slug}`;
}
const isShort = (man, id) => (man.moments.find(x => x.id === id) || {}).kind === 'short';
function outDirOf(man, id) { const m = man.moments.find(x => x.id === id) || {}; return path.resolve(man.dir, m.outDir || (m.kind === 'short' ? man.shortsOut || '../outputs/shorts' : m.kind === 'teaser' ? man.teaserOut || '../outputs/teaser' : man.out || 'out')); }
/* ---------- a teaser's clips go back in the source: splice them into one file first ---------- */
// The exports and the preview read the source with ONE ffmpeg input and a select (frames in source order). A moment whose
// clips are not in source order (a teaser: "bites" in the order they play) first gets build/splice/<id>-<key>.mp4: its
// frames in output order (4K HEVC, one short ffmpeg per run in the source's order, joined without re-encoding). Then the
// map is simply 0, 1, 2 ... in that file. Moments in source order use the source as before (nothing changes for them).
function frameMap(meta) { const fps = meta.FPS; const map = []; for (const c of meta.clips) { const [a, b] = c; const s0 = Math.round(a * fps), s1 = Math.round(b * fps);
  if (isPause(c)) { for (let s = s0; s < s1; s++) map.push(c[2].f); continue; }   // "pause her": her last frame before the pause, held (her voice is silent)
  for (let s = s0; s < s1; s++) map.push(s); } return map; }
/* ---------- "pause her" (2026-11-02): a clip [at, at + d, {pause: id, f: frame}] holds source frame f for d seconds ----------
 * The source is still read once, in order (no splice): the held frame is selected once and repeated by ffmpeg's loop filter
 * (holds: [position in the selected frames, extra copies]). Moments without a pause: no holds, the graph as before. */
const isPause = (c) => !!(c && c.length > 2 && c[2] && typeof c[2] === 'object' && c[2].pause != null);
const hasPause = (meta) => meta.clips.some(isPause);
/** source frames (in output order) -> runs of distinct frames + holds (a frame repeated right after itself) */
function runsHolds(frames) {
  const runs = []; const holds = []; let n = 0, prev = null;
  for (const s of frames) {
    if (s === prev && runs.length) { const h = holds[holds.length - 1]; if (h && h[0] === n - 1) h[1]++; else holds.push([n - 1, 1]); continue; }
    const r = runs[runs.length - 1]; if (r && r[1] === s) r[1]++; else runs.push([s, s + 1]); n++; prev = s;
  }
  return { runs, holds };
}
/** ffmpeg filters that repeat the held frames (after select + setpts); '' when there are none. Each frame after a held one
 *  moves k frames later (setpts), and the fps filter fills the gap with copies of the held frame (exact; the loop filter's
 *  start index was off by one in ffmpeg 8.1). */
const holdChain = (holds, fps) => { if (!holds || !holds.length) return '';
  return `setpts='(N${holds.map(([pos, k]) => `+${k}*gte(N\\,${pos + 1})`).join('')})/${fps}/TB',fps=${fps},`; };
async function footSource(man, id, meta) {
  const map = frameMap(meta); let mono = true; const held = hasPause(meta);   // (a pause holds one frame: equal neighbours are fine then)
  for (let i = 1; i < map.length; i++) if (map[i] < map[i - 1] || (map[i] === map[i - 1] && !held)) { mono = false; break; }
  const gone = () => new Plain(`Your original recording for this video is not on this Mac any more (${path.relative(path.join(man.dir, '..'), man.src)}; deleted to free space?), so her picture cannot be prepared. The graphics still work. Put the recording back in the kit folder to preview or export her video again.`, 'missing source ' + man.src);
  if (mono) { if (!fs.existsSync(man.src)) throw gone(); return { src: man.src, map }; }
  const fps = meta.FPS; const runs = []; for (const s of map) { const r = runs[runs.length - 1]; if (r && r[1] === s) r[1]++; else runs.push([s, s + 1]); }
  const dir = path.join(man.dir, 'build', 'splice'); fs.mkdirSync(dir, { recursive: true });
  const key = fnv(JSON.stringify([runs, man.source])); const out = path.join(dir, `${id}-${key}.mp4`);
  const ident = map.map((_, i) => i);
  if (fs.existsSync(out)) return { src: out, map: ident };
  if (!fs.existsSync(man.src)) throw gone();
  for (const f of fs.readdirSync(dir)) if (f.startsWith(id + '-')) fs.unlinkSync(path.join(dir, f));   // an older cut
  checkFree();
  say('progress', { p: 0.01, stage: 'joining the teaser\'s clips' });
  const parts = []; const list = path.join(dir, `.${id}-${key}.txt`);
  try {
    for (const [k, [a, b]] of runs.entries()) {
      const part = path.join(dir, `.${id}-${key}-${String(k).padStart(3, '0')}.mp4`); parts.push(part);
      await run('ffmpeg', ['-y', '-v', 'error', '-hwaccel', 'videotoolbox', '-ss', (a / fps).toFixed(4), '-t', ((b - a) / fps + 0.2).toFixed(4), '-i', man.src,
        '-vf', `select='between(n\\,0\\,${b - a - 1})',setpts=N/${fps}/TB`, '-frames:v', String(b - a), '-r', String(fps), '-an',
        '-c:v', 'hevc_videotoolbox', '-b:v', '28M', '-tag:v', 'hvc1', '-pix_fmt', 'yuv420p', '-g', String(fps),
        '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', part]);
    }
    fs.writeFileSync(list, parts.map(p => `file '${p.replace(/'/g, "'\\''")}'`).join('\n') + '\n');
    await run('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', out + '.part.mp4']);
    fs.renameSync(out + '.part.mp4', out);
  } finally { for (const p of [...parts, list, out + '.part.mp4']) { try { fs.unlinkSync(p); } catch { } } }
  const n = parseInt(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', out]).toString(), 10);
  if (n !== map.length) console.log(`splice ${id}: ${n} frames for ${map.length} expected`);
  return { src: out, map: ident };
}

/* ---------- her matte (L2, L6): made once by matte.py, read back frame by frame ---------- */
async function ensureMatte(man, manPath, rawFrames) {
  if (!rawFrames.length) return null;
  const sorted = [...new Set(rawFrames)].sort((a, b) => a - b); const runs = []; let a = sorted[0], b = a;
  for (const f of sorted.slice(1)) { if (f <= b + 30) b = f; else { runs.push([a, b]); a = b = f; } } runs.push([a, b]);
  say('progress', { p: 0.02, stage: 'her matte' });
  const out = (await run('python3', [path.join(STUDIO, 'tools', 'matte.py'), manPath, '--frames', runs.map(r => r.join('-')).join(',')])).trim().split('\n').pop();
  return JSON.parse(out);
}
/** reads matte frames (grey, w x h) by source frame number, in order (restarts a chunk when asked to go back) */
class MatteReader {
  constructor(man) { this.dir = path.join(man.dir, 'build', 'matte'); this.info = JSON.parse(fs.readFileSync(path.join(this.dir, 'matte.json'), 'utf8')); this.size = this.info.w * this.info.h; this.cur = null; this.q = Promise.resolve(); }
  open(k) {
    if (this.cur) this.cur.p.kill('SIGKILL');
    const f = path.join(this.dir, `c${String(k).padStart(5, '0')}.mp4`); if (!fs.existsSync(f)) throw new Error('matte chunk missing: ' + f);
    const p = spawn('ffmpeg', ['-v', 'error', '-i', f, '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { stdio: ['ignore', 'pipe', 'ignore'] });   // (stderr off: a decoder stopped early complains about the closed pipe)
    const st = { k, pos: 0, p, bufs: [], len: 0, waiters: [], ended: false };
    p.stdout.on('data', (d) => { st.bufs.push(d); st.len += d.length; this.pump(st); }); p.stdout.on('end', () => { st.ended = true; this.pump(st); });
    this.cur = st;
  }
  pump(st) { while (st.waiters.length && (st.len >= this.size || st.ended)) { const w = st.waiters.shift(); if (st.len < this.size) { w(null); continue; } const all = Buffer.concat(st.bufs); w(all.subarray(0, this.size)); st.bufs = [all.subarray(this.size)]; st.len -= this.size; } }
  next(st) { return new Promise((res) => { st.waiters.push(res); this.pump(st); }); }
  /** grey bytes of source frame `raw` (serialised: call in order) */
  get(raw) { this.q = this.q.then(async () => { if (this.last && this.last[0] === raw) return Buffer.from(this.last[1]);   // (a held "pause her" frame: the same frame again)
    const b0 = await this.read(raw); this.last = [raw, b0]; return Buffer.from(b0); }); return this.q; }
  async read(raw) { const C = this.info.chunk, k = Math.floor(raw / C), j = raw - k * C;
    if (!this.cur || this.cur.k !== k || j < this.cur.pos) this.open(k);
    let b = null; while (this.cur.pos <= j) { b = await this.next(this.cur); this.cur.pos++; if (!b) break; }
    return b ? Buffer.from(b) : Buffer.alloc(this.size); }
  close() { if (this.cur) this.cur.p.kill('SIGKILL'); this.cur = null; }
}

/* ---------- the footage part of the ffmpeg graph ---------- */
// cams: [x, y, w, h] per frame (+ [bx, by, bw, bh] when her picture sits in a box). No box anywhere: the original graph
// (crop, scale to the frame). With boxes: one branch per box SIZE (ffmpeg loses a scale size sent at run time when the
// crop's size changes, so every branch scales to a fixed size); each branch only receives its own frames (select), is
// cropped per frame (sendcmd) and laid on a paper ground at the box's place (overlay x/y per frame, shown only on its frames).
function footGraph(cams, padT, padB, W, H, fps, tmp) {
  const boxed = cams.some(c => c.length > 4);
  const boxOf = (c) => { if (c.length <= 4) return [0, 0, W, H]; let [bx, by, bw, bh] = c.slice(4).map(Math.round); bw = Math.max(2, even(bw)); bh = Math.max(2, even(bh)); bx = Math.max(-bw + 2, Math.min(W - 2, bx)); by = Math.max(-bh + 2, Math.min(H - 2, by)); return [bx, by, bw, bh]; };
  const pad = padT || padB ? `pad=3840:${2160 + padT + padB}:0:${padT}:color=${PAD},` : '';
  const cmdF = path.join(tmp, 'cam.cmd');
  // a command for frame f is timed half a frame BEFORE it: (f / fps).toFixed(4) rounds up for about half the frames
  // (605 / 30 = 20.16666 -> "20.1667"), so the command fired one frame late; at a box -> full-frame handover the new branch
  // still cropped its parked 16x16 corner (pad colour) for that frame: one empty frame (SHORTS agent, 2026-10-15)
  const ct = (f) => (Math.max(0, f - 0.5) / fps).toFixed(4);
  if (!boxed) {
    let cmds = ''; let prev = null;
    cams.forEach((c, f) => { const r = cropOf(c, padT, 3840, 2160, padB); const k = r.join(','); if (k !== prev) { cmds += `${ct(f)} crop@cam w ${r[0]}, crop@cam h ${r[1]}, crop@cam x ${r[2]}, crop@cam y ${r[3]};\n`; prev = k; } });
    fs.writeFileSync(cmdF, cmds); const r0 = cropOf(cams[0], padT, 3840, 2160, padB);
    return { boxed, chain: `${pad}sendcmd=f='${cmdF}',crop@cam=${r0[0]}:${r0[1]}:${r0[2]}:${r0[3]},scale=${W}:${H}:flags=lanczos:in_color_matrix=bt709:in_range=tv,format=gbrp[b]` };
  }
  const sizes = []; const gOf = cams.map(c => { const b = boxOf(c); const k = b[2] + 'x' + b[3]; let g = sizes.indexOf(k); if (g < 0) { sizes.push(k); g = sizes.length - 1; } return g; });
  // Commands are timed where the frames they belong to pass: crop commands by a sendcmd inside the group's branch (after its
  // select), overlay positions by a sendcmd on the overlay's MAIN input. (One sendcmd before the split fired them too early:
  // an overlay further down the chain waiting for its next run made ffmpeg decode ahead, so a later run's position and crop
  // landed on an earlier run, e.g. her half drawn on the wrong side and hidden under the film panel.)
  // Every branch gets EVERY frame (no select: a branch with a gap made its overlay wait for the next run while the split
  // queued 4K frames for the others; a 12-minute edit ran out of memory and ffmpeg was killed). Outside its runs a branch
  // crops a 16x16 corner (cheap to scale) and its overlay is disabled.
  const cc = sizes.map(() => ''), pc = sizes.map(() => ''); const prevC = {}, prevP = {};
  cams.forEach((c, f) => { const g = gOf[f], r = cropOf(c, padT, 3840, 2160, padB), b = boxOf(c); const tt = ct(f);
    if (f > 0 && gOf[f - 1] !== g) { const h = gOf[f - 1]; cc[h] += `${tt} crop@c${h} w 16, crop@c${h} h 16, crop@c${h} x 0, crop@c${h} y 0;\n`; prevC[h] = 'tiny'; }
    const kc = r.join(','); if (prevC[g] !== kc) { cc[g] += `${tt} crop@c${g} w ${r[0]}, crop@c${g} h ${r[1]}, crop@c${g} x ${r[2]}, crop@c${g} y ${r[3]};\n`; prevC[g] = kc; }
    const kp = b[0] + ',' + b[1]; if (prevP[g] !== kp) { pc[g] += `${tt} overlay@p${g} x ${b[0]}, overlay@p${g} y ${b[1]};\n`; prevP[g] = kp; } });
  const ccF = sizes.map((_, g) => { const f = path.join(tmp, `cam_c${g}.cmd`); fs.writeFileSync(f, cc[g] || '0.0 crop@c' + g + ' x 0;\n'); return f; });
  const pcF = sizes.map((_, g) => { const f = path.join(tmp, `cam_p${g}.cmd`); fs.writeFileSync(f, pc[g] || '0.0 overlay@p' + g + ' x 0;\n'); return f; });
  fs.writeFileSync(cmdF, cc.join('') + pc.join(''));   // (KEEP_GRAPH debugging copy)
  const runsOf = (g) => { const runs = []; gOf.forEach((x, f) => { if (x !== g) return; const r = runs[runs.length - 1]; if (r && r[1] === f) r[1] = f + 1; else runs.push([f, f + 1]); }); return runs; };
  const dur = (cams.length / fps + 1).toFixed(3); let chain = `${pad}split=${sizes.length}${sizes.map((_, g) => `[s${g}]`).join('')};`;
  chain += `color=c=${PAD}:s=${W}x${H}:r=${fps}:d=${dur},format=gbrp[bg0];`;
  sizes.forEach((sz, g) => {
    const [bw, bh] = sz.split('x').map(Number); const runs = runsOf(g); const f0 = runs[0][0]; const c0 = cropOf(cams[f0], padT, 3840, 2160, padB), b0 = boxOf(cams[f0]);
    const en = runs.map(([a, b]) => `between(t\\,${((a - 0.5) / fps).toFixed(4)}\\,${((b - 0.5) / fps).toFixed(4)})`).join('+');
    const ci = f0 === 0 ? c0 : [16, 16, 0, 0];   // tiny until its first run
    chain += `[s${g}]sendcmd=f='${ccF[g]}',crop@c${g}=${ci[0]}:${ci[1]}:${ci[2]}:${ci[3]},scale=${bw}:${bh}:flags=lanczos:in_color_matrix=bt709:in_range=tv,format=gbrp[f${g}];`;
    chain += `[bg${g}]sendcmd=f='${pcF[g]}'[m${g}];[m${g}][f${g}]overlay@p${g}=x=${b0[0]}:y=${b0[1]}:eval=frame:enable='${en}':format=gbrp[${g === sizes.length - 1 ? 'b' : 'bg' + (g + 1)}]` + (g === sizes.length - 1 ? '' : ';');
  });
  return { boxed, chain, groups: sizes.length };
}

/* crop expression for one frame of the (padded) source: [x, y, w, h] -> even integers inside the padded frame */
function cropOf(c, padT, sw, sh, padB = 0) {
  let w = even(c[2]), h = even(c[3]); w = Math.min(w, sw); h = Math.min(h, sh + padT + padB);
  const x = Math.max(0, Math.min(sw - w, even(c[0]))), y = Math.max(0, Math.min(sh + padT + padB - h, even(c[1] + padT)));
  return [w, h, x, y];
}

/* ---------- stills: graphics PNG (Chrome) over one source frame (ffmpeg), composed by ffmpeg ---------- */
async function stills(manPath, id, o) {
  const man = loadMan(manPath); padOf(man, id); const base = await server(); const browser = await launch();
  const aspect = o.aspect || (isShort(man, id) ? '9x16' : '9x16'); const [W, H] = DIMS[aspect];
  const dir = path.resolve(o.out || path.join(man.dir, 'build', 'stills')); fs.mkdirSync(dir, { recursive: true });
  const files = []; const tmp = fs.mkdtempSync(path.join(dir, '.st-'));
  try {
    const page = await openPage(browser, base, manPath, id, aspect, o.captions, o.frame9 ? { frame9: o.frame9 } : null);
    if (o.captions && aspect === '16x9') await ensureCapBg(man, id, aspect, [page]);   // her 16:9 captions: the faint box where the picture is light
    const meta = await page.evaluate('window.meta()'); const name = outName(man, id, meta); const fps = meta.FPS;
    const need = new Map(); if (meta.matte && meta.matte.length) for (const t of o.at) { const r = await page.evaluate(`window.matteFrames(${Math.round(t * fps)}, ${Math.round(t * fps) + 1})`); if (r.length) need.set(t, r[0][1]); }
    await lockRun('stills ' + id, async () => {
      let mr = null; if (need.size) { await ensureMatte(man, manPath, [...need.values()]); mr = new MatteReader(man); }
      for (const t of o.at) {
        const info = await page.evaluate(`(() => { const c = momentCams(${Math.round(t * fps)}, ${Math.round(t * fps) + 1}); return { tr: outToRaw(${t}), c: c.cams[0], padT: c.padT, padB: c.padB }; })()`);
        let m = null; if (need.has(t)) { const b = await mr.get(need.get(t)); m = { b: b.toString('base64'), w: mr.info.w, h: mr.info.h }; }
        const png = path.join(tmp, `g.png`); fs.writeFileSync(png, dataURLbuf(await page.evaluate(`window.grab(${t}, ${JSON.stringify(m)})`)));
        const padT = Math.max(0, even(-info.c[1]) + 2), padB = Math.max(0, even(info.c[1] + info.c[3] - 2160) + 2);
        const fg = footGraph([info.c, info.c], info.c[1] < 0 ? padT : 0, info.c[1] + info.c[3] > 2160 ? padB : 0, W, H, 30, tmp);   // two frames, keep the 2nd: in a boxed layout the 1st frame's crop command fires late (her box came out as pad colour; edge-case agent 2026-11-07)
        const f = o.png ? path.join(dir, o.name(name)) : path.join(dir, `${o.prefix || ''}${name}_${aspect}_t${t.toFixed(2).padStart(6, '0')}.jpg`);
        await run('ffmpeg', ['-y', '-v', 'error', '-ss', info.tr.toFixed(4), '-i', man.src, '-i', png, '-filter_complex',
          `[0:v]${fg.chain};[b][1:v]overlay=format=gbrp,select=eq(n\\,1),format=rgb24[v]`, '-map', '[v]', '-frames:v', '1', ...(o.png ? [] : ['-q:v', '2']), f]);
        files.push(f); console.log(f);
      }
      if (mr) mr.close();
    });
  } finally { await browser.close(); SERVER.close(); for (const f of fs.readdirSync(tmp)) fs.unlinkSync(path.join(tmp, f)); fs.rmdirSync(tmp); }
  return files;
}
async function sheet(manPath, id, o) {
  const man = loadMan(manPath); const aspect = o.aspect || '9x16';
  // times: every N s across the moment (meta first)
  const base = await server(); const browser = await launch(); let meta;
  try { const pg = await openPage(browser, base, manPath, id, aspect, false); meta = await pg.evaluate('window.meta()'); } finally { await browser.close(); SERVER.close(); }
  const every = +o.every || 2; const ts = []; for (let t = 0.6; t < meta.TOTAL - 0.1; t += every) ts.push(+t.toFixed(2));
  const tmp = fs.mkdtempSync(path.join(man.dir, 'build', '.sheet-'));
  const files = await stills(manPath, id, { aspect, at: ts, out: tmp, captions: o.captions });
  const cols = aspect === '9x16' ? 8 : 5; const cw = aspect === '9x16' ? 270 : 384, chh = aspect === '9x16' ? 480 : 216;
  const out = path.resolve(o.out || path.join(man.dir, 'build', `${outName(man, id, meta)}_${aspect}_sheet.jpg`));
  // tile with PIL (this ffmpeg has no drawtext): one cell per still, its clip time in the corner
  const py = `import sys, json\nfrom PIL import Image, ImageDraw\nfs, ts, out, cols, cw, ch = json.loads(sys.argv[1])\nrows = (len(fs) + cols - 1) // cols\nsh = Image.new('RGB', (cols * (cw + 4) + 4, rows * (ch + 4) + 4), (85, 85, 85)); d = ImageDraw.Draw(sh)\nfor i, (f, t) in enumerate(zip(fs, ts)):\n    x, y = 4 + (i % cols) * (cw + 4), 4 + (i // cols) * (ch + 4)\n    sh.paste(Image.open(f).convert('RGB').resize((cw, ch)), (x, y)); d.rectangle([x, y, x + 64, y + 20], fill=(0, 0, 0)); d.text((x + 4, y + 4), f'{t:.1f}s', fill=(255, 255, 255))\nsh.save(out, quality=88)\n`;
  await run('python3', ['-c', py, JSON.stringify([files, ts, out, cols, cw, chh])]);
  for (const f of fs.readdirSync(tmp)) fs.unlinkSync(path.join(tmp, f)); fs.rmdirSync(tmp);
  console.log(out); return out;
}

/* ---------- check: graphics density + nothing drawn over her face ---------- */
async function check(manPath, id, o) {
  const aspect = o.aspect || '16x9'; const base = await server(); const browser = await launch();
  try {
    const pg = await openPage(browser, base, manPath, id, aspect, true, o.frame9 ? { frame9: o.frame9 } : null);   // --frame9: try a framing without saving it
    const r = await pg.evaluate(`(() => {
      EL.rec = true; const cv = document.getElementById('c'); const sm = document.createElement('canvas'); sm.width = 96; sm.height = Math.round(96 * cv.height / cv.width); const sx = sm.getContext('2d', { willReadFrequently: true });
      const out = { gaps: [], face: [], coverage: [], holds: [], emptyPanel: [], overflow: [] }; let gapStart = null; const step = 0.2;
      // events that count as "something new": jump cuts and camera keys
      const ev = [...cutTimes(), ...FOOT.keys.map(k => k.t)]; let holdStart = 0, lastSig = null;
      for (let t = 0; t < TOTAL; t += step) {
        SHOW.captions = false; renderMoment(t); sx.clearRect(0, 0, sm.width, sm.height); sx.drawImage(cv, 0, 0, sm.width, sm.height);
        const d = sx.getImageData(0, 0, sm.width, sm.height).data; let on = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 40) on++;
        const cov = on / (d.length / 4); out.coverage.push(+cov.toFixed(3));
        let sig = 0; for (let i = 0; i < d.length; i += 4) sig = (sig * 31 + (d[i] >> 3) + (d[i + 1] >> 3) * 7 + (d[i + 3] >> 3) * 13) >>> 0;
        const evNow = ev.some(e => e > t - step && e <= t);
        if (sig !== lastSig || evNow) { if (t - holdStart > 3.0) out.holds.push([+holdStart.toFixed(1), +t.toFixed(1)]); holdStart = t; lastSig = sig; }
        if (cov < 0.004) { if (gapStart == null) gapStart = t; } else { if (gapStart != null && t - gapStart > 2.0) out.gaps.push([+gapStart.toFixed(1), +t.toFixed(1)]); gapStart = null; }
        SHOW.captions = true; renderMoment(t);
        const sc = SCENES[sceneIndex(t)];
        const texts = EL.list.filter(b => !b.hidden && b.kind !== 'caption' && b.w > 4);
        // an open panel (or a full card) with no text in it; text running past the panel's edge
        const pr = FOOT.panelRect || (sc.card ? { x: 0, y: 0, w: W, h: H } : null);
        if (pr) {
          const inside = texts.filter(b => b.x < pr.x + pr.w && b.x + b.w > pr.x && b.y < pr.y + pr.h && b.y + b.h > pr.y);
          if (!inside.length) out.emptyPanel.push(+t.toFixed(1));
          if (FOOT.panelRect) for (const b of inside) if (b.x + b.w > pr.x + pr.w - 40 && b.x < pr.x + pr.w) out.overflow.push([+t.toFixed(1), b.id, Math.round(b.x + b.w - (pr.x + pr.w))]);
        }
        if (sc.card || sc.cover || /^L2 /.test(sc.layout || '')) continue;   // full-frame layouts, and words set behind her (cut by her matte)
        const f = faceOut(t); const fx0 = f.x + f.w * 0.08, fx1 = f.x + f.w * 0.92, fy0 = f.y + f.h * 0.05, fy1 = f.y + f.h * 0.95;
        for (const b of EL.list) { if (b.hidden || String(b.id).endsWith("/@her")) continue; const ix = Math.max(0, Math.min(fx1, b.x + b.w) - Math.max(fx0, b.x)), iy = Math.max(0, Math.min(fy1, b.y + b.h) - Math.max(fy0, b.y));
          if (ix * iy > 0.01 * f.w * f.h) out.face.push([+t.toFixed(1), b.id, +(ix * iy / (f.w * f.h)).toFixed(2)]); }
      }
      if (gapStart != null && TOTAL - gapStart > 2.0) out.gaps.push([+gapStart.toFixed(1), +TOTAL.toFixed(1)]);
      if (TOTAL - holdStart > 3.0) out.holds.push([+holdStart.toFixed(1), +TOTAL.toFixed(1)]);
      const n = out.coverage.length; out.meanCoverage = +(out.coverage.reduce((a, b) => a + b, 0) / n).toFixed(3); out.emptyShare = +(out.coverage.filter(c => c < 0.004).length / n).toFixed(2); delete out.coverage;
      { const seen = new Set(); out.overflow = out.overflow.filter(x => { if (seen.has(x[1])) return false; seen.add(x[1]); return true; }); }
      { const runs = []; let a = null, p = null; for (const x of out.emptyPanel) { if (a != null && x - p <= 0.21) { p = x; continue; } if (a != null && p - a >= 0.39) runs.push([a, p]); a = x; p = x; } if (a != null && p - a >= 0.39) runs.push([a, p]); out.emptyPanel = runs; }
      const seen = new Set(); out.face = out.face.filter(x => { const k = x[1] + '@' + Math.round(x[0]); if (seen.has(k)) return false; seen.add(k); return true; });
      // CHECKS text-collision (2026-10-26, her screenshot: a wrapped line ran into the source line under it): two visible
      // texts of the graphics (not captions) overlapping by more than 12 % of the smaller one
      { const hits = [], seen = new Set();
        for (let t = 0.2; t < TOTAL; t += 0.5) { SHOW.captions = false; renderMoment(t);
          const tx = EL.list.filter(b => !b.hidden && b.kind !== 'caption' && b.kind !== 'box' && b.text != null && (b.a == null || b.a > 0.3) && b.w > 6 && b.h > 6);
          for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) { const A = tx[i], B = tx[j];
            const ix = Math.max(0, Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x)), iy = Math.max(0, Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y));
            if (ix * iy > 0.12 * Math.min(A.w * A.h, B.w * B.h)) { const k = A.id + '|' + B.id; if (!seen.has(k)) { seen.add(k); hits.push([+t.toFixed(1), A.id, B.id]); } } } }
        out.textCollision = { hits, pass: !hits.length }; }
      // CHECKS insert-sync (2026-10-26, her note: the OpenCode alerts showed before she said them): a film shown inside a
      // segment never runs ahead of her words by more than 0.3 s (film time used vs the film time of the words she is saying)
      const FL = TH.FL; if (FL && FL.pairs && FL.pairs.length) { const ahead = [];
        for (const sg of TH.segs) { const f = sg.o && sg.o.film; if (!f || typeof f !== 'object') continue; const sp = { t0: sg.t0, t1: sg.t1 };
          let worst = 0, at = null, sc = null;
          for (let t = sg.t0 + 0.05; t < sg.t1; t += 0.25) { const used = FL.time(t, f, sp), synced = FL.time(t, { scene: undefined }, sp); const d = used - synced;
            if (d > worst) { worst = d; at = t; const S = FL.scenes || []; const su = S.find(x => used >= x.start && used < x.end), ss = S.find(x => synced >= x.start && synced < x.end); sc = [su && su.id, ss && ss.id]; } }
          if (worst > 0.3) ahead.push([sg.id, +worst.toFixed(2), +(at || 0).toFixed(1), sc]); }
        out.insertSync = { ahead, pass: !ahead.length }; }
      // CHECKS label-over-graphic (2026-10-26): in a short, no graphic box (text, page, card, film panel) inside the top label's band
      if (FOOT.m.kind === 'short' && PORTRAIT && TH.labelBottom) { const lb = TH.labelBottom(); const hits = []; const seenL = new Set();
        for (let t = 0.2; t < FOOT.dur; t += 0.5) { SHOW.captions = true; renderMoment(t);
          for (const b of EL.list) { if (b.hidden || b.kind === 'caption' || String(b.id).startsWith('label') || String(b.id).startsWith('sublabel') || (b.a != null && b.a < 0.05) || b.h < 4) continue;
            if (b.y < lb - 4 && b.y + b.h > 0) { const k = b.id + '@' + Math.round(t); if (!seenL.has(b.id)) { seenL.add(b.id); hits.push([+t.toFixed(1), b.id, Math.round(lb - b.y)]); } } } }
        out.labelOverGraphic = { labelBottom: Math.round(lb), hits, pass: !hits.length }; }
      // CHECKS short-zoom (2026-10-26; 2026-11-12): her face height as a share of the 9:16 frame, on her own footage (not cards / film scenes);
      // zooms = camera zooms on her (z > 6 % over that layout's usual z): at most 1 per short, none under 30 s. Full-screen (fill) median <= 0.36 accepted.
      if (FOOT.m.kind === 'short' && PORTRAIT) { const sh = [], hi = [], zs = []; for (let t = 0.3; t < FOOT.dur; t += 0.5) { const sc = SCENES[sceneIndex(t)]; if (sc.card || sc.cover) continue; const v = TH.faceShare(t); sh.push(v); zs.push([t, camAt(t).z, sc.layout || '']); if (v > 0.36) hi.push([+t.toFixed(1), +v.toFixed(3), sc.layout || '']); }
        const zmOf = {}; for (const l of new Set(zs.map(q => q[2]))) { const a = zs.filter(q => q[2] === l).map(q => q[1]).sort((x, y) => x - y); zmOf[l] = a[Math.floor((a.length - 1) / 2)] || 1; } const zoomed = []; let zr = null;
        for (const [t, z, l] of zs) { const zm = zmOf[l]; if (z > zm * 1.06) { if (!zr) zoomed.push(zr = [+t.toFixed(1), +t.toFixed(1), +(z / zm).toFixed(2), l]); else { zr[1] = +t.toFixed(1); zr[2] = Math.max(zr[2], +(z / zm).toFixed(2)); } } else zr = null; }
        sh.sort((a, b) => a - b); const med = sh.length ? sh[Math.floor(sh.length / 2)] : 0;
        const fr = TH.frameName(null), hiMed = fr === 'fill' ? 0.36 : 0.3, zMax = FOOT.dur >= 30 ? 1 : 0;
        out.shortZoom = { frame: fr, median: +med.toFixed(3), max: +(sh[sh.length - 1] || 0).toFixed(3), target: [0.15, hiMed], over: hi.slice(0, 12), zooms: zoomed, zoomsAllowed: zMax, pass: med >= 0.15 && med <= hiMed && zoomed.length <= zMax }; }
      // CHECKS layout-variety (2026-10-26): no face + graphic layout over 40 % of the face + graphic time; the circle (L11) is never the main one
      { const kinds = { 'L5 half and half': 'half', 'L6 sticker on paper': 'sticker', 'L11 corner cam': 'corner' }; for (const k of ['split', 'tile', 'page', 'presenter', 'room', 'ots']) kinds[TH.label ? TH.label(k) : k] = k;
        const tot = {}; let all = 0; SCENES.forEach((sc, i) => { const k = kinds[sc.layout]; if (!k) return; const d = Math.min(sceneEnd(i), sc.t1 != null ? Math.max(sc.t1, sc.start) : sceneEnd(i)) - sc.start; tot[k] = (tot[k] || 0) + d; all += d; });
        if (all > 0) { const share = Object.fromEntries(Object.entries(tot).map(([k, v]) => [k, +(v / all).toFixed(2)])); const top = Object.entries(share).sort((a, b) => b[1] - a[1])[0];
          const applies = FOOT.m.kind === 'full'; out.layoutVariety = { applies, seconds: +all.toFixed(1), share, kinds: Object.keys(share).length,
            pass: !applies || (top[1] <= 0.4 && !(top[0] === 'corner' && Object.keys(share).length > 1) && !(Object.keys(share).length === 1 && top[0] === 'corner')) }; } }
      return out; })()`);
    console.log(JSON.stringify({ id, aspect, ...r }));
    return r;
  } finally { await browser.close(); SERVER.close(); }
}

/* ---------- proxy: preview footage for the moment editor ---------- */
const fnv = (s) => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 0xff; h = Math.imul(h, 16777619) >>> 0; } return h.toString(16).padStart(8, '0'); };
// the keys the editor recomputes to know whether the proxy still matches: picture (clips, tail, matte) and sound (cues, music)
function proxyKey(meta, m) {   // (the single key of the first proxies: kept so the editor can still use them)
  return fnv(JSON.stringify({ c: meta.clips, q: meta.CUES.map(c => [c.name, +c.t.toFixed(3), c.db ?? null, c.n ?? null, c.d ?? null]), m: m.music || null, tail: meta.tail }));
}
const audioKey = (meta, m, man) => { const g = ((man && man.audio && man.audio.sfx) || {}).gainDb || 0;   // a sound-effects lift (0: key as before)
  return fnv(JSON.stringify({ c: meta.clips, q: meta.CUES.map(c => [c.name, +c.t.toFixed(3), c.db ?? null, c.n ?? null, c.d ?? null]), m: m.music || null, tail: meta.tail, ...(g ? { g } : {}) })); };
// what the picture depends on (the editor recomputes it from the moment to see that the footage is out of date)
const videoSig = (meta) => fnv(JSON.stringify([meta.clips, meta.tail, meta.matte || []]));
const PROXY_CHUNK = +process.env.PROXY_CHUNK || 30, PROXY_SINGLE = process.env.PROXY_SINGLE != null ? +process.env.PROXY_SINGLE : 90;   // seconds (env: tests)
/** output frames -> source frame runs, per chunk: [{f0, f1, runs: [[s0, s1)], pad: frames held at the end}] */
function proxyChunks(meta, map0) {
  const fps = meta.FPS, N = Math.round(meta.TOTAL * fps); const per = meta.TOTAL > PROXY_SINGLE ? PROXY_CHUNK * fps : N;
  const map = map0 || frameMap(meta); const held = hasPause(meta);
  const out = [];
  for (let f0 = 0, i = 0; f0 < N; f0 += per, i++) {
    const f1 = Math.min(N, f0 + per); const runs = []; let pad = 0;
    let holds = null;
    if (!held) { for (let f = f0; f < f1; f++) { const s = map[f]; if (s == null) { pad++; continue; } const r = runs[runs.length - 1]; if (r && r[1] === s) r[1]++; else runs.push([s, s + 1]); } }
    else { const fr = []; for (let f = f0; f < f1; f++) { if (map[f] == null) pad++; else fr.push(map[f]); } const rh = runsHolds(fr); runs.push(...rh.runs); if (rh.holds.length) holds = rh.holds; }   // ("pause her")
    out.push({ i, f0, f1, runs, pad, held: pad ? map[map.length - 1] : null, ...(holds ? { holds } : {}) });
  }
  return out;
}
async function proxy(manPath, id) {
  const man = loadMan(manPath); const m = man.moments.find(x => x.id === id); if (!m) throw new Error('no moment ' + id);
  const dir = path.join(man.dir, 'build', 'proxy'); const cdir = path.join(dir, id); fs.mkdirSync(cdir, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(man.dir, 'build', '.proxy-'));
  say('progress', { p: 0.02, stage: 'reading the moment' });
  const base = await server(); const browser = await launch(); let meta, mf = [];
  try { const pg = await openPage(browser, base, manPath, id, '16x9', false); meta = await pg.evaluate('window.meta()'); if (meta.matte && meta.matte.length) mf = await pg.evaluate(`window.matteFrames(0, ${Math.round(meta.TOTAL * meta.FPS)})`); }
  finally { await browser.close(); SERVER.close(); }
  for (const f of fs.readdirSync(cdir)) if (/^\.v\d{3}-.*\.mp4$/.test(f)) fs.unlinkSync(path.join(cdir, f));   // a chunk an earlier run did not finish
  const infoF = path.join(dir, `${id}.json`); let old = null; try { old = JSON.parse(fs.readFileSync(infoF, 'utf8')); } catch { }
  try {
    return await lockRun('proxy ' + id, async () => {
      const fps = meta.FPS; const N = Math.round(meta.TOTAL * fps); const band = mf.length ? [0, 720, 640, 360] : null;
      const need = new Map(mf.map(([f, r]) => [f, r]));
      const fsrc = await footSource(man, id, meta);   // (first: says so plainly when her recording is gone)
      let mr = null; if (mf.length) { await ensureMatte(man, manPath, mf.map(x => x[1])); mr = new MatteReader(man); }
      const mver = mr ? fnv(JSON.stringify([mr.info.quality, mr.info.w, Object.entries(mr.info.chunks).map(([k, v]) => [k, v.created])])) : '';
      // the key holds the REAL source frames of the chunk: a teaser reads a spliced file whose map is 0, 1, 2 …, so its runs alone
      // stayed the same when the bites changed but kept their length, and an old chunk (her picture from an older cut) was reused
      // while the sound was new (her note 2026-10-18: "towards the end the sound was not aligning with my video")
      const realMap = frameMap(meta);
      const chunks = proxyChunks(meta, fsrc.map).map(c => ({ ...c, key: fnv(JSON.stringify([c.runs, c.pad, c.held, band, band ? mf.filter(([f]) => f >= c.f0 && f < c.f1) : 0, mver, fsrc.src === man.src ? 0 : fnv(JSON.stringify(realMap.slice(c.f0, c.f1))), ...(c.holds ? [c.holds] : [])])) }));
      const info = { id, created: Date.now(), frames: N, fps, total: meta.TOTAL, w: 1280, h: 720, src: [3840, 2160], band, akey: old && old.akey, key: proxyKey(meta, m), vsig: videoSig(meta),
        chunks: chunks.map(c => { const o0 = (old && old.chunks || []).find(x => x.key === c.key && fs.existsSync(path.join(cdir, x.file))); return { i: c.i, f0: c.f0, f1: c.f1, t0: c.f0 / fps, t1: c.f1 / fps, key: c.key, file: o0 ? o0.file : `v${String(c.i).padStart(3, '0')}-${c.key}.mp4`, ready: !!o0 }; }) };
      const save = () => fs.writeFileSync(infoF, JSON.stringify(info, null, 1));
      // sound first (seconds): the preview's three tracks
      const ak = audioKey(meta, m, man);
      if (info.akey !== ak || !['voice', 'music', 'sfx'].every(k => fs.existsSync(path.join(cdir, k + '.m4a')))) {
        say('progress', { p: 0.05, stage: 'sound' });
        const cuesF = path.join(tmp, 'cues.json'); fs.writeFileSync(cuesF, JSON.stringify(meta.CUES));
        await run('python3', [path.join(STUDIO, 'tools', 'footmix.py'), manPath, id, cuesF, path.join(tmp, 'mix.wav'), '--tail', String(meta.tail), '--stems', cdir, ...clipsArg(meta, tmp)]);
        info.akey = ak;
      }
      save();
      const todo = info.chunks.filter(c => !c.ready); let done = 0;
      for (const c of todo) {
        const ch = chunks[c.i]; const n = c.f1 - c.f0; const out = path.join(cdir, c.file), part = path.join(cdir, '.' + c.file);
        say('progress', { p: 0.1 + 0.88 * done / Math.max(1, todo.length), stage: `footage ${c.i + 1}/${info.chunks.length}` });
        const S0 = ch.runs.length ? ch.runs[0][0] : ch.held, S1 = ch.runs.length ? ch.runs[ch.runs.length - 1][1] : ch.held + 1;
        const sel = (ch.runs.length ? ch.runs : [[ch.held, ch.held + 1]]).map(([a, b]) => `between(n\\,${a - S0}\\,${b - S0 - 1})`).join('+');
        const tpad = ch.pad > 0 ? `tpad=stop_mode=clone:stop=${ch.pad},` : '';
        const vchain = `[0:v]select='${sel}',setpts=N/${fps}/TB,${holdChain(ch.holds, fps)}${tpad}scale=1280:720:flags=bicubic:in_color_matrix=bt709:in_range=tv:out_color_matrix=bt709:out_range=tv,format=yuv420p`;
        const args = ['-y', '-v', process.env.FF_V || 'error', '-hwaccel', 'videotoolbox', '-ss', (S0 / fps).toFixed(4), '-t', ((S1 - S0) / fps + 0.2).toFixed(4), '-i', fsrc.src];
        let graph;
        if (band) { args.push('-f', 'rawvideo', '-pix_fmt', 'gray', '-s', `${mr.info.w}x${mr.info.h}`, '-framerate', String(fps), '-i', '-');
          graph = `${vchain}[v0];[1:v]scale=640:360:flags=bicubic,format=gray,pad=1280:360:0:0:black,format=yuv420p[mb];[v0][mb]vstack[v]`; }
        else graph = `${vchain}[v]`;
        // one chunk: VideoToolbox first; if it quits (a hardware session limit, a busy encoder, memory) once more with the
        // software encoder. ffmpeg may finish before the last matte frames are written (it stops at -frames:v): a closed
        // pipe is not an error then; the chunk is checked by its frame count instead.
        const encode = async (sw) => {
          try { fs.unlinkSync(part); } catch { }
          const enc = sw ? ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-g', '10', '-pix_fmt', 'yuv420p']
            : ['-c:v', 'h264_videotoolbox', '-b:v', band ? '4.5M' : '3.5M', '-g', '10', '-profile:v', 'high'];
          const ff = spawn('ffmpeg', [...args, '-filter_complex', graph, '-map', '[v]', '-frames:v', String(n), '-r', String(fps), '-an', ...enc,
            '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', '-f', 'mp4', part], { stdio: [band ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
          let err = ''; ff.stderr.on('data', d => { err = (err + d).slice(-4000); if (process.env.FF_V) process.stderr.write(d); });
          let exited = false; const closed = new Promise((res) => ff.on('close', (k, sig) => { exited = true; res(k == null ? (sig || 'killed') : k); }));
          let fed = 0;
          if (band) {
            ff.stdin.on('error', () => { });   // EPIPE: ffmpeg already has what it needs (or quit: its exit code says which)
            const blank = Buffer.alloc(mr.size);
            for (let f = c.f0; f < c.f1 && !exited && !ff.stdin.destroyed; f++) {
              const b = need.has(f) ? await mr.get(need.get(f)) : blank; if (exited || ff.stdin.destroyed) break;
              fed++; if (!ff.stdin.write(b)) await Promise.race([new Promise(r => ff.stdin.once('drain', r)), closed]);
            }
            if (!ff.stdin.destroyed) ff.stdin.end();
          }
          const code = await closed;
          let got = -1; if (code === 0) { try { got = parseInt(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', part]).toString(), 10); } catch { } }
          if (process.env.FF_V) console.log(`chunk ${c.i}: ${sw ? 'libx264' : 'videotoolbox'} exit ${code}, ${got}/${n} frames, matte fed ${band ? fed : '-'}`);
          if (code === 0 && got === n) return;
          throw Object.assign(new Error(`ffmpeg exit ${code} (${got}/${n} frames, ${sw ? 'libx264' : 'videotoolbox'}): ${err.trim().split('\n').slice(-6).join(' | ')}`), { code, err });
        };
        try { await encode(false); }
        catch (e) {
          if (/No space left|ENOSPC/i.test(e.err || '')) throw ffFail(e.code, e.err);
          console.log(`chunk ${c.i}: the hardware encoder failed (${e.message.slice(0, 300)}); trying the software encoder`);
          say('progress', { p: 0.1 + 0.88 * done / Math.max(1, todo.length), stage: `footage ${c.i + 1}/${info.chunks.length} (slower encoder)` });
          if (mr) { mr.close(); }
          try { await encode(true); } catch (e2) { throw ffFail(e2.code, e2.err || e2.message); }
        }
        fs.renameSync(part, out); c.ready = true; done++; save(); say('file', path.relative(ROOT, out));
      }
      if (mr) mr.close();
      // chunk files no longer in the list (an older cut) go away (build intermediates)
      const keep = new Set(info.chunks.map(c => c.file)); for (const f of fs.readdirSync(cdir)) if (/^v\d{3}-.*\.mp4$/.test(f) && !keep.has(f)) fs.unlinkSync(path.join(cdir, f));
      const legacy = path.join(dir, `${id}.mp4`); if (fs.existsSync(legacy)) fs.unlinkSync(legacy);
      save(); say('progress', { p: 1, stage: 'done' });
      console.log(JSON.stringify({ proxy: path.relative(ROOT, cdir), chunks: info.chunks.length, made: done, band: !!band }));
      return cdir;
    });
  } finally { for (const f of fs.readdirSync(tmp)) fs.unlinkSync(path.join(tmp, f)); fs.rmdirSync(tmp); }
}

/* ---------- export ---------- */
/** output frames A..B -> runs of source frames (EDL order) + frames held at the end (the moment's tail) */
function srcRuns(meta, A, B, map0) {
  const map = map0 || frameMap(meta);
  const runs = []; let tailN = 0; let holds = null;
  if (!hasPause(meta)) { for (let f = A; f < B; f++) { const s = map[f]; if (s == null) { tailN++; continue; } const r = runs[runs.length - 1]; if (r && r[1] === s) r[1]++; else runs.push([s, s + 1]); } }
  else { const fr = []; for (let f = A; f < B; f++) { if (map[f] == null) tailN++; else fr.push(map[f]); } const rh = runsHolds(fr); runs.push(...rh.runs); if (rh.holds.length) holds = rh.holds; }   // ("pause her": held frames)
  if (!runs.length) { const last = map[map.length - 1]; runs.push([last, last + 1]); tailN = Math.max(0, tailN - 1); }   // a range inside the tail: her last frame, held
  return { runs, tailN, holds };
}
async function exportOne(manPath, id, aspect, o) {
  const man = loadMan(manPath); const [W, H] = DIMS[aspect]; padOf(man, id); const mo = man.moments.find(x => x.id === id) || {};
  const captions = o.captions != null ? !!o.captions : (aspect === '9x16' || mo.kind === 'full' || mo.kind === 'teaser');   // 9:16 and full edits: on unless switched off
  const SP = +o.speed >= 0.5 && +o.speed <= 2 ? +o.speed : 1;   // playback speed (her choice in the export box): 1 = exactly as before
  const range = o.t0 != null && o.t1 != null && o.t0 !== true && o.t1 !== true;
  const outDir = range ? path.join(outDirOf(man, id), 'clips') : outDirOf(man, id); fs.mkdirSync(outDir, { recursive: true });
  checkFree();   // GM_MIN_FREE_GB overrides the 8 GB guard (only when it is the one job running)
  const tmp = fs.mkdtempSync(path.join(man.dir, 'build', '.job-'));
  try {
    return await lockRun(`export ${id} ${aspect}`, async () => {
      const base = await server(); const browser = await launch(); const t0 = Date.now();
      try {
        const NP = 3; const pages = [];
        for (let i = 0; i < NP; i++) pages.push(await openPage(browser, base, manPath, id, aspect, captions));
        const meta = await pages[0].evaluate('window.meta()'); const name = outName(man, id, meta);
        const fps = meta.FPS; const NA = Math.round(meta.TOTAL * fps);
        const A = range ? Math.max(0, Math.min(NA - 1, Math.round(+o.t0 * fps))) : 0, B = range ? Math.max(A + 1, Math.min(NA, Math.round(+o.t1 * fps))) : NA; const N = B - A;
        if (captions && aspect === '16x9') { say('progress', { p: 0.01, stage: 'measuring behind the captions' }); await ensureCapBg(man, id, aspect, pages); }
        const { cams, padT, padB } = await pages[0].evaluate(`window.cams(${A}, ${B})`);
        const mf = meta.matte && meta.matte.length ? await pages[0].evaluate(`window.matteFrames(${A}, ${B})`) : [];
        const need = new Map(mf.map(([f, r]) => [f, r])); let mr = null;
        if (mf.length) { await ensureMatte(man, manPath, mf.map(x => x[1])); mr = new MatteReader(man); }
        // audio (the whole moment's mix; a range is cut from it)
        const cuesF = path.join(tmp, 'cues.json'), wav = path.join(tmp, 'mix.wav'); fs.writeFileSync(cuesF, JSON.stringify(meta.CUES));
        say('progress', { p: 0.02, stage: 'audio' });
        const ainfo = JSON.parse((await run('python3', [path.join(STUDIO, 'tools', 'footmix.py'), manPath, id, cuesF, wav, '--tail', String(meta.tail), '--voice', o.voice === false ? '0' : '1', '--music', o.music === false ? '0' : '1', '--sfx', o.sfx === false ? '0' : '1', ...mixArgs(mixOf(man, id, o)), ...clipsArg(meta, tmp), ...(SP !== 1 ? ['--speed', String(SP)] : [])])).trim().split('\n').pop());
        // video: select the EDL's frames for A..B, crop per frame (sendcmd), graphics over it
        const fsrc = await footSource(man, id, meta);
        const { runs, tailN, holds } = srcRuns(meta, A, B, fsrc.map); const F0 = runs[0][0], F1 = runs[runs.length - 1][1];
        const sel = runs.map(([a, b]) => `between(n\\,${a - F0}\\,${b - F0 - 1})`).join('+');
        const tpad = tailN > 0 ? `tpad=stop_mode=clone:stop=${tailN},` : '';
        const fg = footGraph(cams, padT, padB, W, H, fps, tmp);
        // her outro clip (manifest "outro", meta.outro): laid over the ending, from her last word, cover-fitted (1:1 / 4:5: the 16:9 clip's centre)
        const oc = meta.outro && man.outro && man.outro[meta.outro.key]; const oOff = meta.dur - A / fps;
        const useOutro = !!(oc && oc.src && oOff < N / fps); const oSrc = useOutro ? path.resolve(man.dir, oc.src) : null;
        if (useOutro && !fs.existsSync(oSrc)) throw new Plain('Your "full video on YouTube" clip is missing from the kit folder.', oSrc);
        const graph = `[0:v]select='${sel}',setpts=N/${fps}/TB,${holdChain(holds, fps)}${tpad}${fg.chain};` + (useOutro
          ? `[1:v]format=rgba[gfx];[b][gfx]overlay=format=gbrp:shortest=1[v0];` +
            `[3:v]fps=${fps},${outroFit(oSrc, W, H)},setsar=1,format=gbrp,setpts=PTS-STARTPTS+${Math.max(0, oOff).toFixed(4)}/TB${oOff < 0 ? `,trim=start=${(-oOff).toFixed(4)},setpts=PTS-STARTPTS` : ''}[ov];` +
            `[v0][ov]overlay=eof_action=repeat:enable='gte(t,${Math.max(0, oOff).toFixed(4)})',scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[${SP !== 1 ? 'vs' : 'v'}]`
          : `[1:v]format=rgba[gfx];[b][gfx]overlay=format=gbrp:shortest=1,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[${SP !== 1 ? 'vs' : 'v'}]`)
          + (SP !== 1 ? `;[vs]setpts=PTS/${SP},fps=${fps}[v]` : '');   // speed: at the very end (captions + graphics are in the frames already), fps kept constant
        const NS = SP !== 1 ? Math.round(N / SP) : N;   // frames out
        const graphF = path.join(tmp, 'graph.txt'); fs.writeFileSync(graphF, graph);
        if (process.env.KEEP_GRAPH) { fs.mkdirSync(process.env.KEEP_GRAPH, { recursive: true }); fs.copyFileSync(graphF, path.join(process.env.KEEP_GRAPH, 'graph.txt')); fs.copyFileSync(path.join(tmp, 'cam.cmd'), path.join(process.env.KEEP_GRAPH, 'cam.cmd')); }   // debugging
        const lab = typeof o.label === 'string' && /^[a-z0-9-]{1,40}$/.test(o.label) ? o.label : null;   // a section / sentence clip: <name>_<label>_<size>
        const sx = SP !== 1 ? `_${SP}x` : '';   // e.g. short01-x_9x16_1.2x.mp4
        const out = range ? uniq(outDir, lab ? `${name}_${lab}_${aspect}${sx}` : `${name}_${aspect}_${mmss(A / fps)}-${mmss(B / fps)}${sx}`, '.mp4') : path.join(outDir, `${name}_${aspect}${sx}.mp4`);
        const part = path.join(outDir, '.' + path.basename(out, '.mp4') + '.part.mp4');   // render to a temp name, then replace
        const aIn = range ? ['-ss', (A / fps / SP).toFixed(4), '-t', (NS / fps + 0.1).toFixed(4)] : [];   // (the mix is already sped up)
        const ff = spawn('ffmpeg', ['-y', '-v', process.env.FF_V || 'error', '-hwaccel', 'videotoolbox', '-ss', (F0 / fps).toFixed(4), '-t', ((F1 - F0) / fps + 0.2).toFixed(4), '-i', fsrc.src,
          '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-', ...aIn, '-i', wav, ...(useOutro ? ['-i', oSrc] : []),
          '-filter_complex_script', graphF, '-map', '[v]', '-map', '2:a', '-frames:v', String(NS),
          '-c:v', 'h264_videotoolbox', '-b:v', mo.kind === 'teaser' ? (aspect === '16x9' ? '9M' : '8M') : aspect === '9x16' ? '16M' : '14M', '-maxrate', mo.kind === 'teaser' ? '14M' : '24M', '-bufsize', '30M', '-profile:v', 'high', '-r', String(fps),
          '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
          '-c:a', 'aac', '-b:a', '256k', ...(range ? ['-shortest'] : []), '-movflags', '+faststart', '-f', 'mp4', part], { stdio: ['pipe', 'inherit', 'pipe'] });
        let fferr = ''; ff.stderr.on('data', d => { fferr = (fferr + d).slice(-3000); process.stderr.write(d); });
        const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(ffFail(c, fferr))))); closed.catch(() => { });   // (awaited below)
        ff.stdin.on('error', () => { });   // ffmpeg stopped early: its exit code says why (EPIPE is only the symptom)
        // frames from NP pages in parallel, written in order (her matte read in order and handed to the page that draws it)
        const pend = new Map(); const ahead = NP * 2;
        const want = (k) => { if (k >= N || pend.has(k)) return; const f = A + k;
          const mat = need.has(f) ? mr.get(need.get(f)).then(b => ({ b: b.toString('base64'), w: mr.info.w, h: mr.info.h })) : Promise.resolve(null);
          pend.set(k, mat.then(m => pages[k % NP].evaluate(`window.grab(${(f / fps).toFixed(6)}, ${m ? JSON.stringify(m) : 'null'})`))); };
        for (let k = 0; k < Math.min(N, ahead); k++) want(k);
        let lastLog = Date.now(), lastSay = 0, dead = false; ff.on('close', () => { dead = true; });
        for (let k = 0; k < N && !dead; k++) {
          const url = await pend.get(k); pend.delete(k); want(k + ahead);
          if (!ff.stdin.write(dataURLbuf(url))) await new Promise(r => { const d = () => { ff.stdin.off('drain', d); ff.off('close', d); r(); }; ff.stdin.once('drain', d); ff.once('close', d); });
          if (Date.now() - lastLog > 15000) { lastLog = Date.now(); console.log(`${name} ${aspect}: ${k}/${N} frames`); }
          if (JOB && Date.now() - lastSay > 500) { lastSay = Date.now(); say('progress', { p: 0.05 + 0.93 * k / N, stage: 'frames ' + aspect }); }
        }
        ff.stdin.end(); await closed; fs.renameSync(part, out); if (mr) mr.close();
        // captions file (subtitle lines, clip time; a range: the lines inside it, from its start)
        const ta = A / fps, tb = B / fps;
        const srt = meta.captions.long.filter(c => c.t1 > ta && c.t0 < tb).map((c, k) => `${k + 1}\n${srtTime(Math.max(0, c.t0 - ta) / SP)} --> ${srtTime((Math.min(tb, c.t1) - ta) / SP)}\n${c.text}\n`).join('\n');   // times / speed
        fs.writeFileSync(out.replace(/\.mp4$/, '.srt'), srt);
        say('file', path.relative(ROOT, out)); say('file', path.relative(ROOT, out.replace(/\.mp4$/, '.srt')));
        console.log(JSON.stringify({ out: path.relative(ROOT, out), frames: NS, from: +ta.toFixed(3), dur: +(NS / fps).toFixed(3), speed: SP, captions, secs: Math.round((Date.now() - t0) / 1000), boxed: fg.boxed, matteFrames: mf.length, audio: ainfo }));
        return out;
      } finally { await browser.close(); SERVER.close(); }
    });
  } finally {
    for (const f of fs.readdirSync(tmp)) fs.unlinkSync(path.join(tmp, f)); fs.rmdirSync(tmp);
  }
}
/** her outro clip into a W x H frame: as big as possible while its full height and its middle 52 % of width stay in view
 *  (same shape: exactly cover; 1:1 / 4:5 from the 16:9 clip: its centred card never cut), padded with black (her clips' ground) */
function outroFit(src, W, H) {
  const [cw, ch] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src]).toString().trim().split(',').map(Number);
  const k = Math.min(H / ch, W / (0.52 * cw)); const sw = Math.round(cw * k / 2) * 2, sh = Math.round(ch * k / 2) * 2;
  return `scale=${sw}:${sh},crop=${Math.min(W, sw)}:${Math.min(H, sh)},pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black`;
}
/** ffmpeg stopped: say why in plain words when the cause is known (disk full, memory) */
function ffFail(code, err) {
  if (/No space left|ENOSPC/i.test(err)) return new Plain(`Your Mac ran out of free space during the export (${freeGB().toFixed(1)} GB free now). Empty the Bin or free space in Downloads, then press Export again.`, `ffmpeg exit ${code}: ${err.slice(-400)}`);
  if (code === null || code === 137 || code === 9 || /Killed|Cannot allocate memory/i.test(err)) return new Plain('The video encoder was stopped by the Mac partway through (usually low memory). Close other heavy apps, then press Export again.', `ffmpeg exit ${code}: ${err.slice(-400)}`);
  return new Error(`ffmpeg exit ${code}: ${err.slice(-800)}`);
}

/* ---------- one frame as a PNG (her footage in 4K, cropped as in the export, with the graphics) ---------- */
async function frameOne(manPath, id, o) {
  const man = loadMan(manPath); const mo = man.moments.find(x => x.id === id); if (!mo) throw new Error('no moment ' + id);
  const aspect = mo.kind === 'short' ? '9x16' : o.aspect || '16x9'; const captions = o.captions != null ? !!o.captions : (aspect === '9x16' || mo.kind === 'full');
  checkFree(0.5);   // a PNG is small: only stop when the disk is all but full
  const dir = path.join(outDirOf(man, id), 'frames'); fs.mkdirSync(dir, { recursive: true });
  const fps = man.fps || 30; const f = Math.max(0, Math.round(+o.at * fps)); const t = f / fps;
  const files = await stills(manPath, id, { aspect, at: [t], out: dir, captions, png: true, name: (n) => path.basename(uniq(dir, `${n}_${aspect}_frame-${mmss(t)}${String(f % fps).padStart(2, '0')}f`, '.png')) });
  for (const x of files) say('file', path.relative(ROOT, x));
  console.log(JSON.stringify({ frame: files.map(x => path.relative(ROOT, x)), t, aspect, captions }));
  return files;
}

/* ---------- the picture behind her 16:9 captions (FOOT.capBg): measured once per (source frame, framing), cached ---------- */
// build/captions/<id>_<aspect>.json {v, cell, y0, cols, rows, s: {key: base64}}: for every sample the runtime asks for
// (capBgNeed: 30 % and 70 % through each chunk), the lower half of the frame as cells of `cell` px, each the linear luminance
// (x 255) of her 4K source as the camera frames it there (paper / the pad colour outside her box). One frame decode each.
const LIN = Array.from({ length: 256 }, (_, i) => { const v = i / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
function runBuf(cmd, args) {
  return new Promise((res, rej) => { const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] }); const parts = []; let err = '';
    p.stdout.on('data', d => parts.push(d)); p.stderr.on('data', d => { err += d; }); p.on('close', c => (c === 0 ? res(Buffer.concat(parts)) : rej(new Error(`${cmd} exit ${c}: ${err.slice(-600)}`)))); });
}
async function capGrid(man, smp, need) {
  const SW = 480, SH = 270, [sw, sh] = [3840, 2160], fps = man.fps || 30;
  const buf = await runBuf('ffmpeg', ['-v', 'error', '-hwaccel', 'videotoolbox', '-ss', (smp.raw / fps).toFixed(4), '-i', man.src, '-frames:v', '1', '-vf', `scale=${SW}:${SH}:flags=area`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']);
  if (buf.length < SW * SH * 3) throw new Error('could not read source frame ' + smp.raw);
  const L = new Float32Array(SW * SH); for (let i = 0; i < SW * SH; i++) L[i] = 0.2126 * LIN[buf[i * 3]] + 0.7152 * LIN[buf[i * 3 + 1]] + 0.0722 * LIN[buf[i * 3 + 2]];
  const pn = parseInt(PAD.slice(2), 16), padL = 0.2126 * LIN[pn >> 16] + 0.7152 * LIN[(pn >> 8) & 255] + 0.0722 * LIN[pn & 255];
  const [cx, cy, cw, ch] = smp.cam, b = smp.box || [0, 0, need.W, need.H]; const out = Buffer.alloc(need.cols * need.rows); const K = 4;
  for (let row = 0; row < need.rows; row++) for (let col = 0; col < need.cols; col++) {
    let sum = 0, n = 0;
    for (let j = 0; j < K; j++) for (let i = 0; i < K; i++) {
      const lx = (col + (i + 0.5) / K) * need.cell, ly = need.y0 + (row + (j + 0.5) / K) * need.cell; if (lx >= need.W || ly >= need.H) continue;
      let v = padL;
      if (!(smp.box && (lx < b[0] || lx >= b[0] + b[2] || ly < b[1] || ly >= b[1] + b[3]))) {
        const x = cx + (lx - b[0]) / b[2] * cw, y = cy + (ly - b[1]) / b[3] * ch;
        if (x >= 0 && y >= 0 && x < sw && y < sh) v = L[Math.floor(y * SH / sh) * SW + Math.floor(x * SW / sw)];
      }
      sum += v; n++;
    }
    out[row * need.cols + col] = n ? Math.round(sum / n * 255) : 0;
  }
  return out.toString('base64');
}
async function ensureCapBg(man, id, aspect, pages) {
  padOf(man); const need = await pages[0].evaluate('window.capBgNeed()'); if (!need || !need.samples.length) return null;
  const dir = path.join(man.dir, 'build', 'captions'); fs.mkdirSync(dir, { recursive: true }); const f = path.join(dir, `${id}_${aspect}.json`);
  let old = null; try { old = JSON.parse(fs.readFileSync(f, 'utf8')); } catch { }
  const same = old && old.v === 1 && old.cell === need.cell && old.y0 === need.y0 && old.cols === need.cols && old.rows === need.rows && old.pad === PAD && old.s;
  const s = {}; const todo = [];
  for (const smp of need.samples) { if (same && old.s[smp.key]) s[smp.key] = old.s[smp.key]; else todo.push(smp); }
  let k = 0, done = 0; const worker = async () => { while (k < todo.length) { const smp = todo[k++]; s[smp.key] = await capGrid(man, smp, need); done++; if (done % 10 === 0) say('progress', { p: 0.05 + 0.9 * done / todo.length, stage: `measuring behind the captions ${done}/${todo.length}` }); } };
  await Promise.all([worker(), worker(), worker()]);
  const data = { v: 1, aspect, cell: need.cell, y0: need.y0, cols: need.cols, rows: need.rows, pad: PAD, s };
  if (todo.length || !same || Object.keys(old.s).length !== Object.keys(s).length) { const tmpf = f + '.tmp-' + process.pid; fs.writeFileSync(tmpf, JSON.stringify(data)); fs.renameSync(tmpf, f); }
  for (const p of pages) await p.evaluate((d) => window.setCapBg(d), data);
  return { file: path.relative(ROOT, f), samples: need.samples.length, measured: todo.length };
}
async function capbg(manPath, id, o) {
  const man = loadMan(manPath); const aspect = o.aspect || '16x9'; if (aspect !== '16x9') throw new Error('her caption box is measured for 16:9 only');
  say('progress', { p: 0.02, stage: 'reading the moment' });
  const base = await server(); const browser = await launch();
  try {
    const pg = await openPage(browser, base, manPath, id, aspect, true);
    const r = await ensureCapBg(man, id, aspect, [pg]);
    // which chunks get the faint box (measured at each chunk's middle, with the graphics of that frame)
    const boxes = await pg.evaluate(`(() => { const out = []; for (const c of FOOT.caps16) { const t = (c.t0 + c.t1) / 2; renderMoment(t); out.push([c.i, FOOT.capBoxNow == null ? null : +FOOT.capBoxNow.toFixed(2)]); } return out; })()`);
    const shown = boxes.filter(b => b[1] != null), boxed = shown.filter(b => b[1] > 0);
    console.log(JSON.stringify({ ...(r || { samples: 0 }), chunks: boxes.length, shown: shown.length, withBox: boxed.length, box: boxed.slice(0, 400) }));
    say('progress', { p: 1, stage: 'done' });
    return r;
  } finally { await browser.close(); SERVER.close(); }
}

/* ---------- sound only: the moment's voice, music and sound effects as separate WAVs ---------- */
// Each track as it sits in the export's mix (her levels, the master gain), before the limiter, not levelled on its own:
// the files line up with the exported video and add up to its sound. <out>/audio/momentNN-<slug>_{voice,music,sound-effects}.wav
// (replaced, like the moment's video exports). Light: no video is decoded.
const TRACK_FILE = { voice: 'voice', music: 'music', sfx: 'sound-effects' };
async function sound(manPath, id, o) {
  const man = loadMan(manPath); if (!man.moments.some(m => m.id === id)) throw new Error('no moment ' + id);
  const tracks = (o.tracks ? String(o.tracks).split(',') : MIX_KEYS).filter(k => MIX_KEYS.includes(k)); if (!tracks.length) throw new Error('no track chosen');
  say('progress', { p: 0.02, stage: 'reading the moment' });
  const base = await server(); const browser = await launch(); let meta;
  try { const pg = await openPage(browser, base, manPath, id, isShort(man, id) ? '9x16' : (o.aspect || '16x9'), false); meta = await pg.evaluate('window.meta()'); }   // (the ending's length depends on the frame size: her outro clips differ)
  finally { await browser.close(); SERVER.close(); }
  const dir = path.resolve(o.out || path.join(outDirOf(man, id), 'audio')); fs.mkdirSync(dir, { recursive: true });
  const name = outName(man, id, meta); const tmp = fs.mkdtempSync(path.join(man.dir, 'build', '.sound-'));
  try {
    const cuesF = path.join(tmp, 'cues.json'); fs.writeFileSync(cuesF, JSON.stringify(meta.CUES));
    say('progress', { p: 0.3, stage: 'mixing' });
    const rep = (await run('python3', [path.join(STUDIO, 'tools', 'footmix.py'), manPath, id, cuesF, path.join(tmp, 'mix.wav'), ...mixArgs(mixOf(man, id, o)), '--tail', String(meta.tail), '--tracks', path.join(tmp, 't_'), ...clipsArg(meta, tmp)])).trim().split('\n').pop();
    const files = [];
    for (const t of tracks) { const f = path.join(dir, `${name}_${TRACK_FILE[t]}.wav`); fs.renameSync(path.join(tmp, `t_${TRACK_FILE[t]}.wav`), f); files.push(f); say('file', path.relative(ROOT, f)); }
    console.log(JSON.stringify({ sound: files.map(f => path.relative(ROOT, f)), frames: Math.round(meta.TOTAL * meta.FPS), audio: JSON.parse(rep) }));
    say('progress', { p: 1, stage: 'done' });
    return files;
  } finally { for (const f of fs.readdirSync(tmp)) fs.unlinkSync(path.join(tmp, f)); fs.rmdirSync(tmp); }
}

/* ---------- hashes: regression check (graphics pixels, camera crops, cues, captions) ---------- */
// node studio/tools/composite.mjs hashes <talking-head.json> <id|all> [--every 0.25] [--out file.json] [--against file.json]
async function hashes(manPath, ids, o) {
  const every = +o.every || 0.25; const base = await server(); const browser = await launch(); const out = {};
  try {
    for (const id of ids) for (const aspect of ['16x9', '9x16']) {
      const pg = await openPage(browser, base, manPath, id, aspect, aspect === '9x16');
      out[id + '_' + aspect] = await pg.evaluate(`(() => {
        const fnv = (h, s) => { for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 0xff; h = Math.imul(h, 16777619) >>> 0; } return h; };
        const m = FOOT.meta(); const N = Math.round(m.TOTAL * m.FPS); const cv = document.getElementById('c'); const c2 = cv.getContext('2d');
        const cams = momentCams(0, N); const r = { total: m.TOTAL, frames: N, meta: fnv(2166136261, JSON.stringify([m.clips, m.CUES, m.SCENES, m.captions])).toString(16), cams: fnv(2166136261, JSON.stringify(cams)).toString(16), px: {} };
        for (let t = 0; t < m.TOTAL; t += ${every}) { renderMoment(t); const d = c2.getImageData(0, 0, cv.width, cv.height).data; let h = 2166136261 >>> 0; for (let i = 0; i < d.length; i += 7) { h ^= d[i]; h = Math.imul(h, 16777619) >>> 0; } r.px[t.toFixed(2)] = h.toString(16); }
        return r; })()`);
      await pg.close(); console.log(id, aspect, out[id + '_' + aspect].frames, 'frames');
    }
  } finally { await browser.close(); SERVER.close(); }
  if (o.out) fs.writeFileSync(o.out, JSON.stringify(out, null, 1));
  if (o.against) {
    const ref = JSON.parse(fs.readFileSync(o.against, 'utf8')); let bad = 0, n = 0;
    for (const [k, v] of Object.entries(out)) { const r = ref[k]; if (!r) { console.log('new', k); continue; }
      for (const f of ['meta', 'cams', 'frames']) { n++; if (r[f] !== v[f]) { bad++; console.log('DIFF', k, f); } }
      for (const [t, h] of Object.entries(v.px)) { n++; if (r.px[t] !== h) { bad++; console.log('DIFF', k, 't=' + t); } } }
    console.log(bad ? `${bad} of ${n} differ` : `identical: ${n} checks`); if (bad) process.exitCode = 2;
  }
  return out;
}

function flags(args) { const o = { _: [] }; for (let i = 0; i < args.length; i++) { const a = args[i]; if (a.startsWith('--no-')) o[a.slice(5)] = false; else if (a.startsWith('--')) { const v = args[i + 1]; if (v == null || v.startsWith('--')) o[a.slice(2)] = true; else { o[a.slice(2)] = v; i++; } } else o._.push(a); } return o; }
async function main() {
  const [mode, ...rest] = process.argv.slice(2); const o = flags(rest); const [manPath, id] = o._;
  if (!manPath || !id) throw new Error('usage: see the top of studio/tools/composite.mjs');
  if (mode === 'meta') {
    const base = await server(); const browser = await launch();
    try { const pg = await openPage(browser, base, manPath, id, o.aspect || '16x9', false); const m = await pg.evaluate('window.meta()'); console.log(JSON.stringify({ ...m, captions: undefined }, null, 1)); }
    finally { await browser.close(); SERVER.close(); }
    return;
  }
  if (mode === 'matte') { const man = loadMan(manPath); const base = await server(); const browser = await launch(); let mf = [];
    try { for (const i of (id === 'all' ? man.moments.map(m => m.id) : id.split(','))) { const pg = await openPage(browser, base, manPath, i, '16x9', false); const meta = await pg.evaluate('window.meta()'); if (meta.matte && meta.matte.length) mf.push(...(await pg.evaluate(`window.matteFrames(0, ${Math.round(meta.TOTAL * meta.FPS)})`)).map(x => x[1])); await pg.close(); } }
    finally { await browser.close(); SERVER.close(); }
    if (!mf.length) return console.log('no layout of these moments uses her matte');
    return lockRun('matte', async () => console.log(JSON.stringify(await ensureMatte(man, manPath, mf)))); }
  if (mode === 'frame') return frameOne(manPath, id, { aspect: o.aspect, at: +o.at, captions: o.captions });
  if (mode === 'capbg') return capbg(manPath, id, o);
  if (mode === 'stills') return stills(manPath, id, { aspect: o.aspect || '9x16', at: String(o.at).split(',').map(Number), out: o.out, captions: !!o.captions, frame9: o.frame9, prefix: o.prefix });
  if (mode === 'sheet') return sheet(manPath, id, { aspect: o.aspect || '9x16', every: o.every, out: o.out, captions: !!o.captions });
  if (mode === 'check') {
    const man = loadMan(manPath); const ids = id === 'all' ? man.moments.map(m => m.id) : id.split(',');
    const aspects = !o.aspect || o.aspect === 'both' ? ['9x16', '16x9'] : [o.aspect];
    for (const i of ids) for (const a of aspects) await check(manPath, i, { aspect: a, frame9: o.frame9 });
    return;
  }
  if (mode === 'proxy') {
    const man = loadMan(manPath); const ids = id === 'all' ? man.moments.map(m => m.id) : id.split(',');
    for (const i of ids) await proxy(manPath, i);
    return;
  }
  if (mode === 'sound') return sound(manPath, id, o);
  if (mode === 'hashes') { const man = loadMan(manPath); return hashes(manPath, id === 'all' ? man.moments.map(m => m.id) : id.split(','), o); }
  if (mode === 'export') {
    const man = loadMan(manPath); const ids = id === 'all' ? man.moments.map(m => m.id) : id.split(',');
    const aspects = !o.aspect || o.aspect === 'both' ? ['9x16', '16x9'] : o.aspect === 'all' ? ['16x9', '1x1', '4x5', '9x16'] : o.aspect.split(',');
    for (const i of ids) for (const a of (isShort(man, i) ? ['9x16'] : aspects)) await exportOne(manPath, i, a, o);   // shorts: 9:16 only
    return;
  }
  throw new Error('unknown mode ' + mode);
}
main().then(() => process.exit(0), (e) => {
  console.error(e && e.stack || e);
  // the studio shows this sentence (Details keep the rest); written before exiting (a pipe on macOS is asynchronous)
  if (e && e.plain) process.stdout.write('@error ' + JSON.stringify({ msg: e.plain, detail: e.detail }) + '\n', () => process.exit(1)); else process.exit(1);
});

#!/usr/bin/env node
// Studio renderer: headless Chrome draws each frame with the film's renderFrame(t); JPEG frames are piped straight
// into ffmpeg (no image sequence on disk). Frame-exact: frame f is t = f / 30.
//
//   node studio/tools/render.mjs meta   <slug>                      -> film/data/meta.json (+ renders every 0.2 s in 16:9 and 9:16 to catch errors)
//   node studio/tools/render.mjs stills <slug> <t1,t2,..> [--aspect 9x16] [--out dir] [--png] [--captions]
//   node studio/tools/render.mjs sheet  <slug> [--aspect 9x16] [--out sheet.jpg] [--at end|mid|<offset s>] [--from 1 --to 78] [--cols 8]
//                                       [--modes design|alt|light|dark|pair]   (light / dark per screen; pair = designed + alternative side by side)
//   node studio/tools/render.mjs contrast <slug> [--aspect 16x9] [--modes design,alt] [--out report.json]   (text contrast, both modes)
//   node studio/tools/render.mjs export <slug> --what film|scene|line|range|frame [--scene N] [--line N] [--t0 s --t1 s] [--t s]
//                                       [--aspect 16x9|9x16|4x5] [--captions] [--no-voice] [--no-music] [--no-sfx] [--no-srt] [--dir clips/_tests]
//                                       [--voice-db dB --music-db dB --sfx-db dB]   (default: the "mix" in film/edits.json, her volume sliders)
//                                       [--blur | --no-blur]   (adaptive motion blur, see runtime/film.html; default: film.json "motionBlur", off)
//                                       [--speed 0.5 … 2]   (2026-11-19, as composite.mjs: plays faster; sound atempo before the -14 LUFS master
//                                        (mixclip.py --speed), video setpts + fps 30 after the frames are drawn; .srt times / speed; name _1.2x)
//   node studio/tools/render.mjs sound  <slug> --what film|scene|line|range [...as export] [--tracks voice,music,sfx] [--dir audio/_tests]
//                                       (sound only: each track as a WAV that lines up with the video -> outputs/audio/)
//   node studio/tools/render.mjs hashes <slug> <times.json> <out.json> [--aspect 9x16] [--hud]   (pixel hashes; --hud draws the old corner HUD)
//   node studio/tools/render.mjs job <spec.json>                       (used by the studio server's export queue)
// Exports land in projects/<slug>/outputs/{video,clips,frames}/. Audio comes from the stems (python3 studio/tools/stems.py <slug>).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.dirname(STUDIO);
const FPS = 30;
const DIMS = { '16x9': [1920, 1080], '9x16': [1080, 1920], '4x5': [1080, 1350] };
const say = (kind, o) => console.log(kind === 'log' ? o : `@${kind} ${typeof o === 'string' ? o : JSON.stringify(o)}`);

function findChrome() {
  const cands = [];
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
  if (fs.existsSync(base)) for (const v of fs.readdirSync(base).sort().reverse()) cands.push(path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), path.join(base, v, 'chrome-headless-shell-mac-x64/chrome-headless-shell'));
  cands.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  const c = cands.find(p => fs.existsSync(p)); if (!c) throw new Error('no Chrome found (install chrome-headless-shell via puppeteer)');
  return c;
}

let SERVER = null;
async function baseURL(given) {
  if (given) return given;
  const { start } = await import(path.join(STUDIO, 'server.mjs'));
  SERVER = await start(0); return `http://127.0.0.1:${SERVER.address().port}`;
}
async function launch() {
  return puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--force-color-profile=srgb'] });
}
async function openPage(browser, base, slug, q = {}) {
  const page = await browser.newPage();
  const [w, h] = DIMS[q.aspect || '16x9'];
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
  page.on('pageerror', e => console.error('[page]', e.message));
  const qs = new URLSearchParams(Object.fromEntries(Object.entries(q).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])));
  await page.goto(`${base}/render/${slug}?${qs}`, { waitUntil: 'load' });
  await page.waitForFunction('window.READY === true', { timeout: 90000 });
  const err = await page.evaluate('window.BUILD_ERROR');
  if (err) throw new Error('build error: ' + err);
  return page;
}
const filmDir = (slug) => path.join(ROOT, 'projects', slug, 'film');
const outDir = (slug, sub) => { const d = path.join(ROOT, 'projects', slug, 'outputs', sub); fs.mkdirSync(d, { recursive: true }); return d; };
function uniq(dir, name, ext) { let f = path.join(dir, name + ext), k = 2; while (fs.existsSync(f)) f = path.join(dir, `${name}-${k++}${ext}`); return f; }
const dataURLbuf = (u) => Buffer.from(u.slice(u.indexOf(',') + 1), 'base64');
function run(cmd, args, o = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: ['ignore', o.out ? 'pipe' : 'inherit', 'pipe'] }); let err = '', out = '';
    p.stderr.on('data', d => { err += d; if (o.onErr) o.onErr(String(d)); }); if (o.out) p.stdout.on('data', d => { out += d; if (o.onOut) o.onOut(String(d)); });
    p.on('close', c => (c === 0 ? res(out) : rej(new Error(`${cmd} exit ${c}: ${err.slice(-600)}`))));
  });
}
const mmss = (t) => { const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${String(m).padStart(2, '0')}m${String(s).padStart(2, '0')}s`; };
function srtTime(t) { const ms = Math.max(0, Math.round(t * 1000)); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; }

/* ---------- video: frames -> ffmpeg, in chunks across a few pages ---------- */
async function renderVideo(browser, base, slug, view, f0, f1, out, onProgress) {
  const n = f1 - f0; const chunk = Math.max(150, Math.min(1800, Math.ceil(n / 4))); const chunks = [];
  for (let a = f0; a < f1; a += chunk) chunks.push([a, Math.min(f1, a + chunk)]);
  const workers = Math.min(4, chunks.length); const pages = [];
  for (let i = 0; i < workers; i++) pages.push(await openPage(browser, base, slug, view));
  const parts = chunks.map((_, i) => out.replace(/\.mp4$/, `.part${String(i).padStart(3, '0')}.mp4`));
  let done = 0; const todo = chunks.map((c, i) => i);
  const encode = async (pg, i) => {
    const [a, b] = chunks[i];
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      ...(process.env.GM_FILM_ENC === 'x264' ? ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high']   // opt-in software encoder (VideoToolbox error -12912 under load, 2026-10-26); default unchanged
        : ['-c:v', 'h264_videotoolbox', '-b:v', '11M', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high']), '-pix_fmt', 'yuv420p',
      '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-r', String(FPS), '-f', 'mp4', parts[i]], { stdio: ['pipe', 'inherit', 'inherit'] });
    const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
    try {
      for (let f = a; f < b; f++) {
        const url = await pg.evaluate(`window.grab(${(f / FPS).toFixed(6)}, 0.93)`);
        if (!ff.stdin.write(dataURLbuf(url))) await new Promise(r => ff.stdin.once('drain', r));
        done++; onProgress(done / n);
      }
    } catch (e) { ff.stdin.destroy(); ff.kill(); throw e; }
    ff.stdin.end(); await closed;
  };
  await Promise.all(pages.map(async (pg) => {
    while (todo.length) {
      const i = todo.shift();
      try { await encode(pg, i); }
      catch (e) { // one retry on a fresh page (a renderer crash only loses this chunk)
        console.error('chunk failed, retrying:', String(e).slice(0, 200)); done -= 0;
        const p2 = await openPage(browser, base, slug, view); await encode(p2, i); await p2.close();
      }
    }
  }));
  for (const p of pages) await p.close();
  if (parts.length === 1) fs.renameSync(parts[0], out);
  else {
    const list = out.replace(/\.mp4$/, '.txt'); fs.writeFileSync(list, parts.map(p => `file '${p}'`).join('\n'));
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', out]);
    parts.forEach(p => fs.unlinkSync(p)); fs.unlinkSync(list);
  }
}

/* ---------- her volume sliders: film/edits.json "mix" {voice, music, sfx} in dB (missing = 0 dB) ---------- */
const MIX_KEYS = ['voice', 'music', 'sfx'];
function mixOf(slug, given) {
  let m = given;
  if (!m || typeof m !== 'object') { try { m = JSON.parse(fs.readFileSync(path.join(filmDir(slug), 'edits.json'), 'utf8')).mix; } catch { m = null; } }
  return Object.fromEntries(MIX_KEYS.map(k => [k, Math.max(-24, Math.min(12, Math.round(+((m || {})[k]) || 0)))]));
}
const mixArgs = (mix) => MIX_KEYS.flatMap(k => (mix[k] ? [`--${k}-db`, String(mix[k])] : []));

/* ---------- what an export covers: [t0, t1], file name, outputs/ folder ---------- */
async function probeFilm(browser, base, slug, aspect) {
  const probe = await openPage(browser, base, slug, { aspect });
  const meta = await probe.evaluate('window.meta()');
  const caps = await probe.evaluate('CAPTIONS.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: capText(c) }))');
  await probe.close();
  return { meta, caps };
}
function rangeOf(slug, spec, meta, caps) {
  const S = meta.SCENES; const TOTAL = meta.TOTAL;
  let t0, t1, name, sub; const what = spec.what || 'scene';
  if (what === 'film') { t0 = 0; t1 = TOTAL; name = `${slug}_motion`; sub = 'video'; }
  else if (what === 'scene') { const s = S[(spec.scene || 1) - 1]; if (!s) throw new Error('no scene ' + spec.scene); t0 = s.start; t1 = s.end; name = `${slug}_screen${String(s.n).padStart(2, '0')}-${s.id}`; sub = 'clips'; }
  else if (what === 'line') { const c = caps[(spec.line || 1) - 1]; if (!c) throw new Error('no line ' + spec.line); t0 = Math.max(0, c.t0 - 0.25); t1 = Math.min(TOTAL, c.t1 + 0.45); name = `${slug}_line${String(c.i + 1).padStart(3, '0')}`; sub = 'clips'; }
  else if (what === 'range') { t0 = Math.max(0, +spec.t0); t1 = Math.min(TOTAL, +spec.t1); if (!(t1 > t0)) throw new Error('empty range'); name = `${slug}_${mmss(t0)}-${mmss(t1)}`; sub = 'clips'; }
  else if (what === 'frame') { const f = Math.round(+spec.t * FPS); t0 = f / FPS; const si = S.findIndex((s, i) => s.start <= t0 + 1e-9 && (i + 1 === S.length || S[i + 1].start > t0 + 1e-9)); const s = S[si]; name = `${slug}_frame-${mmss(t0)}${String(f % FPS).padStart(2, '0')}f_screen${String(s.n).padStart(2, '0')}-${s.id}`; sub = 'frames'; }
  else throw new Error('unknown export: ' + what);
  return { what, t0, t1, name, sub, f0: Math.round(t0 * FPS), f1: Math.round(t1 * FPS), TOTAL };
}
const stemsOf = (slug) => {
  const stems = path.join(filmDir(slug), 'build', 'stems');
  if (!fs.existsSync(path.join(stems, 'stems.json'))) throw new Error('no audio stems yet: run "Rebuild audio" (python3 studio/tools/stems.py ' + slug + ')');
  return stems;
};

/* ---------- export job ---------- */
async function job(spec) {
  const slug = spec.slug; const aspect = DIMS[spec.aspect] ? spec.aspect : '16x9';
  const base = await baseURL(spec.base); const browser = await launch();
  try {
    say('progress', { p: 0, stage: 'starting' });
    const { meta, caps } = await probeFilm(browser, base, slug, aspect);
    const { what, t0, t1, name, sub } = rangeOf(slug, spec, meta, caps);
    const dir = spec.dir ? outDir(slug, spec.dir) : outDir(slug, sub);
    const music = spec.music !== false, sfxOn = spec.sfx !== false, voiceOn = spec.voice !== false, captions = !!spec.captions;
    const SP = +spec.speed >= 0.5 && +spec.speed <= 2 && what !== 'frame' ? +spec.speed : 1;   // playback speed (her export choice): 1 = exactly as before
    const suffix = `_${aspect}` + (captions ? '_captions' : '') + (what !== 'frame' && !voiceOn ? '_novoice' : '') + (what !== 'frame' && !music ? '_nomusic' : '') + (what !== 'frame' && !sfxOn ? '_nosfx' : '') + (SP !== 1 ? `_${SP}x` : '');
    // light / dark per screen: the editor sends its current choice (like the sound levels); else film/edits.json "modes"
    const view = { aspect, captions: captions ? 1 : 0, clipStart: what === 'film' ? undefined : t0.toFixed(4), modesJson: spec.modes && typeof spec.modes === 'object' ? JSON.stringify(spec.modes) : undefined,
      blur: spec.blur === true ? 1 : spec.blur === false ? 0 : undefined };   // adaptive motion blur: film.json "motionBlur" or --blur / --no-blur (default: as film.json says, off)

    if (what === 'frame') {
      const pg = await openPage(browser, base, slug, view);
      const out = uniq(dir, name + suffix, '.png');
      fs.writeFileSync(out, dataURLbuf(await pg.evaluate(`window.grabPNG(${t0.toFixed(6)})`)));
      say('file', path.relative(ROOT, out)); say('progress', { p: 1, stage: 'done' }); return [out];
    }
    const f0 = Math.round(t0 * FPS), f1 = Math.round(t1 * FPS);
    const out = uniq(dir, name + suffix, '.mp4');
    const tmp = fs.mkdtempSync(path.join(STUDIO, '.jobs', 'tmp-')); const vtmp = path.join(tmp, 'video.mp4'), atmp = path.join(tmp, 'audio.wav');
    try {
      // audio first (fast): mixed from the stems for this range
      say('progress', { p: 0.01, stage: 'audio' });
      const stems = stemsOf(slug);
      const aout = await run('python3', [path.join(STUDIO, 'tools', 'mixclip.py'), stems, String(f0 / FPS), String(f1 / FPS), '--voice', voiceOn ? '1' : '0', '--music', music ? '1' : '0', '--sfx', sfxOn ? '1' : '0', ...(what === 'film' ? ['--full'] : []), ...mixArgs(mixOf(slug, spec.mix)), ...(SP !== 1 ? ['--speed', String(SP)] : []), '--out', atmp], { out: true });
      const ainfo = JSON.parse(aout.trim().split('\n').pop());
      let last = 0;
      await renderVideo(browser, base, slug, view, f0, f1, vtmp, (p) => { const now = Date.now(); if (now - last > 400) { last = now; say('progress', { p: 0.03 + 0.92 * p, stage: 'frames' }); } });
      say('progress', { p: 0.96, stage: 'mux' });
      const venc = SP === 1 ? ['-c:v', 'copy'] : ['-vf', `setpts=PTS/${SP},fps=${FPS}`, ...(process.env.GM_FILM_ENC === 'x264' ? ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high']
        : ['-c:v', 'h264_videotoolbox', '-b:v', '11M', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high']), '-pix_fmt', 'yuv420p'];   // speed: the drawn frames retimed, fps kept at 30
      await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', vtmp, '-i', atmp, '-map', '0:v', '-map', '1:a', ...venc, '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', out]);
      say('file', path.relative(ROOT, out));
      if (spec.srt !== false) {
        const cues = caps.filter(c => c.t1 > t0 && c.t0 < t1).map((c, k) => `${k + 1}\n${srtTime(Math.max(0, c.t0 - t0) / SP)} --> ${srtTime((Math.min(t1, c.t1) - t0) / SP)}\n${c.text}\n`);
        const srt = out.replace(/\.mp4$/, '.srt'); fs.writeFileSync(srt, cues.join('\n')); say('file', path.relative(ROOT, srt));
      }
      say('log', `audio: ${JSON.stringify(ainfo)}`);
      say('progress', { p: 1, stage: 'done' });
      return [out];
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
}

/* ---------- sound only: each track (voice, music, sound effects) as a WAV for the export's range ---------- */
// The same mix as a video export of that range (all three parts on, her levels): each file is that track exactly as it
// sits in the mix (her level, master gain, fades, the export's loudness gain), before the limiter, not levelled on its
// own -> the files line up sample-exact with the video and add up to it. outputs/audio/, never overwritten.
const TRACK_FILE = { voice: 'voice', music: 'music', sfx: 'sound-effects' };
async function soundJob(spec) {
  const slug = spec.slug; const tracks = (spec.tracks && spec.tracks.length ? spec.tracks : MIX_KEYS).filter(k => MIX_KEYS.includes(k));
  if (!tracks.length) throw new Error('no track chosen');
  const base = await baseURL(spec.base); const browser = await launch();
  let r;
  try {
    say('progress', { p: 0, stage: 'starting' });
    const { meta, caps } = await probeFilm(browser, base, slug, '16x9');
    r = rangeOf(slug, spec, meta, caps); if (r.what === 'frame') throw new Error('a single frame has no sound');
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
  const dir = outDir(slug, spec.dir || 'audio');
  const stem = r.what === 'film' ? `${slug}_whole-film` : r.name;
  let k = 1; const fileOf = (t, kk) => path.join(dir, `${stem}${kk > 1 ? '-' + kk : ''}_${TRACK_FILE[t]}.wav`);
  while (tracks.some(t => fs.existsSync(fileOf(t, k)))) k++;   // never overwrite; the files of one job share a suffix
  const tmp = fs.mkdtempSync(path.join(STUDIO, '.jobs', 'tmp-'));
  try {
    say('progress', { p: 0.2, stage: 'mixing' });
    const aout = await run('python3', [path.join(STUDIO, 'tools', 'mixclip.py'), stemsOf(slug), String(r.f0 / FPS), String(r.f1 / FPS), ...(r.what === 'film' ? ['--full'] : []),
      ...mixArgs(mixOf(slug, spec.mix)), ...tracks.flatMap(t => [`--track-${t}`, fileOf(t, k)]), '--out', path.join(tmp, 'mix.wav')], { out: true });
    for (const t of tracks) say('file', path.relative(ROOT, fileOf(t, k)));
    say('log', `sound only ${r.t0.toFixed(3)}-${r.t1.toFixed(3)} s (${r.f1 - r.f0} frames): ${aout.trim().split('\n').pop()}`);
    say('progress', { p: 1, stage: 'done' });
    return tracks.map(t => fileOf(t, k));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

/* ---------- audio rebuild job: meta (cues) -> stems ---------- */
async function audioJob(spec) {
  say('progress', { p: 0.02, stage: 'cues' });
  await meta(spec.slug, spec.base);
  say('progress', { p: 0.1, stage: 'mixing' });
  await run('python3', [path.join(STUDIO, 'tools', 'stems.py'), spec.slug], { out: true, onOut: (s) => s.split('\n').forEach(l => { const m = /^@progress (.*)/.exec(l); if (m) { const o = JSON.parse(m[1]); say('progress', { p: 0.1 + 0.9 * o.p, stage: o.stage }); } else if (l.trim()) say('log', l); }) });
  say('progress', { p: 1, stage: 'done' });
}

async function meta(slug, givenBase) {
  const base = await baseURL(givenBase); const browser = await launch();
  try {
    const page = await openPage(browser, base, slug, { aspect: '16x9' });
    const m = await page.evaluate('window.meta()');
    for (const a of ['16x9', '9x16']) {
      const bad = await page.evaluate(`(() => { setView({ aspect: '${a}' }); for (let t = 0; t < TOTAL; t += 0.2) { try { renderFrame(t); } catch (e) { return t.toFixed(2) + ': ' + e.message; } } return null; })()`);
      if (bad) throw new Error(`render check (${a}) failed at ${bad}`);
    }
    fs.writeFileSync(path.join(filmDir(slug), 'data', 'meta.json'), JSON.stringify(m, null, 1));
    say('log', `TOTAL ${m.TOTAL.toFixed(2)}  scenes ${m.SCENES.length}  cues ${m.CUES.length}`);
    return m;
  } finally { await browser.close(); if (SERVER && !givenBase) { SERVER.close(); SERVER = null; } }
}

async function stills(slug, ts, o) {
  const base = await baseURL(); const browser = await launch();
  try {
    const page = await openPage(browser, base, slug, { aspect: o.aspect, captions: o.captions ? 1 : 0 });
    const dir = path.resolve(o.out || path.join(filmDir(slug), 'build', 'stills')); fs.mkdirSync(dir, { recursive: true });
    for (const t of ts) {
      const url = await page.evaluate(o.png ? `window.grabPNG(${t})` : `window.grab(${t}, 0.9)`);
      const f = path.join(dir, `${o.aspect}_t${t.toFixed(2).padStart(7, '0')}.${o.png ? 'png' : 'jpg'}`); fs.writeFileSync(f, dataURLbuf(url)); say('log', f);
    }
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
}

// contact sheet of scenes, composed in the page: one cell per scene (time = end - 0.3 s, mid, or start + offset)
// --modes design | alt | light | dark: every screen in that mode (default: edits.json as saved); --modes pair: each screen
// twice side by side, as designed then its alternative (a punchline screen without one shows "no alternative")
async function sheet(slug, o) {
  const base = await baseURL(); const browser = await launch();
  try {
    const page = await openPage(browser, base, slug, { aspect: o.aspect, captions: o.captions ? 1 : 0 });
    const out = path.resolve(o.out || path.join(filmDir(slug), 'build', `sheet_${o.aspect}.jpg`)); fs.mkdirSync(path.dirname(out), { recursive: true });
    const url = await page.evaluate(`(() => {
      const S = FILM.meta().SCENES.filter(s => s.n >= ${o.from || 1} && s.n <= ${o.to || 999});
      const at = ${JSON.stringify(o.at || 'end')}; const modes = ${JSON.stringify(o.modes || '')};
      const cells = []; for (const s of S) { if (modes === 'pair') { cells.push([s, 'design']); cells.push([s, 'alt']); } else cells.push([s, modes]); }
      const cv = document.getElementById('c'); const cols = ${o.cols || 8}; const cw = ${o.cellW || 270}; const ch = Math.round(cw * cv.height / cv.width);
      const rows = Math.ceil(cells.length / cols); const sh = document.createElement('canvas'); sh.width = cols * (cw + 6); sh.height = rows * (ch + 30);
      const x = sh.getContext('2d'); x.fillStyle = '#555'; x.fillRect(0, 0, sh.width, sh.height);
      cells.forEach(([s, m], i) => {
        if (m) setModes(m); const sc = SCENES[s.n - 1]; const mode = sceneMode(sc), m0 = sceneMode0(sc);
        const t = at === 'end' ? s.end - 0.3 : at === 'mid' ? (s.start + s.end) / 2 : Math.min(s.end - 0.05, s.start + Number(at));
        renderFrame(t); const cx = (i % cols) * (cw + 6), cy = Math.floor(i / cols) * (ch + 30);
        x.drawImage(cv, cx, cy + 24, cw, ch); x.fillStyle = '#fff'; const narrow = cw < 400; x.font = '500 ' + (narrow ? 12 : 15) + 'px monospace';
        const tag = !m0 ? (narrow ? 'punchline' : 'punchline, no alternative') : mode === m0 ? mode + (narrow ? ' (design)' : ' (designed)') : mode + (narrow ? ' (ALT)' : ' (alternative)');
        x.save(); x.beginPath(); x.rect(cx, cy, cw, 24); x.clip(); x.fillText(s.n + ' ' + (narrow ? s.id.slice(0, 12) : s.id) + (modes ? ' · ' + tag : '') + (narrow ? '' : ' @' + t.toFixed(1)), cx + 2, cy + 17); x.restore();
        if (m === 'alt' && !m0) { x.fillStyle = 'rgba(85,85,85,0.82)'; x.fillRect(cx, cy + 24, cw, ch); }
      });
      return sh.toDataURL('image/jpeg', 0.88); })()`);
    fs.writeFileSync(out, dataURLbuf(url)); say('log', out);
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
}

// text contrast check: every screen, in its designed mode and its alternative (--modes design,alt), at a few times per
// screen. Each fillText on the frame is measured against the pixels under it (sampled before the text is drawn; the most
// common colour = its ground; busy grounds such as photos are skipped). Needs 3:1 for large text (>= 24 px, or bold >= 19 px)
// and 4.5:1 below. Fading / blurred text is skipped (only text drawn at full opacity counts). Writes a JSON report.
async function contrast(slug, o) {
  const base = await baseURL(); const browser = await launch(); const report = { slug, aspects: {}, failures: [] };
  try {
    for (const aspect of (o.aspect ? [o.aspect] : ['16x9', '9x16'])) {
      const page = await openPage(browser, base, slug, { aspect, edits: 0 });
      const r = await page.evaluate(`(() => {
        const cv = document.getElementById('c'); const main = cv.getContext('2d');
        const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
        const ratio = (a, b) => { const A = lum(...a), B = lum(...b); return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); };
        const parse = (c) => { if (c[0] === '#') { const n = parseInt(c.slice(1, 7), 16); return [n >> 16, (n >> 8) & 255, n & 255, 1]; } const m = /rgba?\\(([^)]+)\\)/.exec(c); if (!m) return null; const p = m[1].split(',').map(Number); return [p[0], p[1], p[2], p[3] == null ? 1 : p[3]]; };
        const hex = (c) => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
        let rec = null; const orig = CanvasRenderingContext2D.prototype.fillText;
        CanvasRenderingContext2D.prototype.fillText = function (s, x, y, mw) {
          let done = false;
          if (rec && this === main && String(s).trim() && this.globalAlpha > 0.97 && (this.filter === 'none' || !this.filter) && typeof this.fillStyle === 'string') try {
            const fgStyle = this.fillStyle; const m = this.getTransform(); const k = Math.hypot(m.a, m.b);
            const px = parseFloat((this.font.match(/(\\d+(?:\\.\\d+)?)px/) || [0, 0])[1]) * k; const bold = /\\b(6|7|8|9)00\\b|bold/.test(this.font);
            const tm = this.measureText(s); const x0 = x - tm.actualBoundingBoxLeft, x1 = x + tm.actualBoundingBoxRight, y0 = y - tm.actualBoundingBoxAscent, y1 = y + tm.actualBoundingBoxDescent;
            let X0 = Infinity, Y0 = Infinity, X1 = -Infinity, Y1 = -Infinity;
            for (const [a, b] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) { const X = m.a * a + m.c * b + m.e, Y = m.b * a + m.d * b + m.f; X0 = Math.min(X0, X); Y0 = Math.min(Y0, Y); X1 = Math.max(X1, X); Y1 = Math.max(Y1, Y); }
            X0 = Math.max(0, Math.floor(X0)); Y0 = Math.max(0, Math.floor(Y0)); X1 = Math.min(cv.width, Math.ceil(X1)); Y1 = Math.min(cv.height, Math.ceil(Y1));
            if (X1 - X0 > 2 && Y1 - Y0 > 2 && px >= 8) {
              const d = main.getImageData(X0, Y0, X1 - X0, Y1 - Y0).data; const bins = new Map(); let n = 0;
              for (let i = 0; i < d.length; i += 4 * 3) { const key = (d[i] >> 3) << 10 | (d[i + 1] >> 3) << 5 | (d[i + 2] >> 3); const b = bins.get(key) || [0, 0, 0, 0]; b[0]++; b[1] += d[i]; b[2] += d[i + 1]; b[3] += d[i + 2]; bins.set(key, b); n++; }
              let best = null; for (const b of bins.values()) if (!best || b[0] > best[0]) best = b;
              THEME.drawn = null; const ret = orig.call(this, s, x, y, mw); const fg = parse(THEME.drawn || fgStyle); done = true;   // the colour really drawn (light / dark: mapped at draw time)
              if (fg && best && best[0] / n >= 0.4) {
                const bg = [best[1] / best[0], best[2] / best[0], best[3] / best[0]];
                const eff = fg[3] < 1 ? [0, 1, 2].map(j => fg[j] * fg[3] + bg[j] * (1 - fg[3])) : fg;
                const rr = ratio(eff, bg); const large = px >= 24 || (bold && px >= 18.66); const need = large ? 3 : 4.5;
                rec.push({ s: String(s).slice(0, 40), px: Math.round(px), fg: hex(eff), bg: hex(bg), ratio: +rr.toFixed(2), need });
              }
            }
          } catch (e) { }
          if (done) return; return orig.call(this, s, x, y, mw);
        };
        const out = [];
        for (const mode of ${JSON.stringify((o.modes || 'design,alt').split(','))}) {
          setModes(mode);
          for (const s of FILM.meta().SCENES) {
            const sc = SCENES[s.n - 1]; if (mode === 'alt' && !sceneMode0(sc)) continue;
            const ts = [s.start + (s.end - s.start) * 0.55, s.end - 0.35].filter(t => t > s.start + 0.3);
            const seen = new Map();
            for (const t of ts) { rec = []; renderFrame(t); for (const x of rec) { const key = x.s + '|' + x.fg + '|' + x.bg; if (!seen.has(key)) seen.set(key, x); } }
            const items = [...seen.values()]; const fails = items.filter(x => x.ratio < x.need);
            out.push({ n: s.n, id: s.id, mode: sceneMode(sc), designed: sceneMode0(sc), texts: items.length, minRatio: items.length ? Math.min(...items.map(x => x.ratio)) : null, fails });
          }
        }
        rec = null; CanvasRenderingContext2D.prototype.fillText = orig; return out; })()`);
      await page.close();
      report.aspects[aspect] = r;
      for (const s of r) for (const f of s.fails) report.failures.push({ aspect, n: s.n, id: s.id, mode: s.mode, designed: s.designed, ...f });
    }
    const outF = path.resolve(o.out || path.join(filmDir(slug), 'build', 'contrast.json')); fs.mkdirSync(path.dirname(outF), { recursive: true });
    fs.writeFileSync(outF, JSON.stringify(report, null, 1));
    const by = {}; for (const f of report.failures) { const k = `${f.aspect} ${f.mode === f.designed ? 'designed' : 'alternative'}`; by[k] = (by[k] || 0) + 1; }
    const texts = Object.values(report.aspects).flat().reduce((a, s) => a + s.texts, 0);
    say('log', `contrast: ${texts} texts measured, ${report.failures.length} below the bar ${JSON.stringify(by)} -> ${outF}`);
    for (const f of report.failures.slice(0, o.show || 40)) say('log', `  ${f.aspect} #${f.n} ${f.id} [${f.mode}${f.mode === f.designed ? '' : ' alt'}] "${f.s}" ${f.px}px ${f.fg} on ${f.bg} = ${f.ratio}:1 (needs ${f.need})`);
    return report;
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
}

// pixel hashes at given times (regression checks: the 16:9 film must not change)
async function hashes(slug, timesFile, outFile, aspect = '16x9', hud = false) {
  const base = await baseURL(); const browser = await launch();
  try {
    const page = await openPage(browser, base, slug, { aspect, edits: 0, hud: hud ? 1 : undefined });
    const ts = JSON.parse(fs.readFileSync(timesFile, 'utf8'));
    const h = await page.evaluate(`(() => { const cv = document.getElementById('c'); const c = cv.getContext('2d'); const out = {};
      for (const t of ${JSON.stringify(ts)}) { renderFrame(t); const d = c.getImageData(0,0,cv.width,cv.height).data; let h = 2166136261 >>> 0; for (let i = 0; i < d.length; i += 3) { h ^= d[i]; h = Math.imul(h, 16777619) >>> 0; } out[t] = h; } return out; })()`);
    fs.writeFileSync(outFile, JSON.stringify(h)); say('log', `${Object.keys(h).length} hashes -> ${outFile}`);
  } finally { await browser.close(); if (SERVER) SERVER.close(); }
}

function flags(args) {
  const o = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--no-')) o[a.slice(5)] = false;
    else if (a.startsWith('--')) { const k = a.slice(2); const v = args[i + 1]; if (v == null || v.startsWith('--')) o[k] = true; else { o[k] = v; i++; } }
    else o._.push(a);
  }
  return o;
}
async function main() {
  const [mode, ...rest] = process.argv.slice(2); const o = flags(rest); const slug = o._[0];
  fs.mkdirSync(path.join(STUDIO, '.jobs'), { recursive: true });
  if (mode === 'job') {
    const spec = JSON.parse(fs.readFileSync(o._[0], 'utf8'));
    if (spec.kind === 'audio') return audioJob(spec);
    if (spec.kind === 'sound') return soundJob(spec);
    return job(spec);
  }
  if (!slug) throw new Error('usage: see the top of studio/tools/render.mjs');
  if (mode === 'meta') return meta(slug);
  if (mode === 'stills') return stills(slug, String(o._[1]).split(',').map(Number), { aspect: o.aspect || '16x9', out: o.out, png: !!o.png, captions: !!o.captions });
  if (mode === 'sheet') return sheet(slug, { aspect: o.aspect || '16x9', out: o.out, at: o.at, from: +o.from || 1, to: +o.to || 999, cols: +o.cols || 8, cellW: +o.cell || 270, captions: !!o.captions, modes: o.modes });
  if (mode === 'contrast') return contrast(slug, { aspect: o.aspect, out: o.out, modes: o.modes, show: +o.show || 40 });
  if (mode === 'hashes') return hashes(slug, o._[1], o._[2], o.aspect || '16x9', !!o.hud);
  const cliMix = MIX_KEYS.some(k => o[k + '-db'] != null) ? Object.fromEntries(MIX_KEYS.map(k => [k, +o[k + '-db'] || 0])) : undefined;
  if (mode === 'export') {
    const files = await job({ slug, what: o.what || 'scene', scene: +o.scene || undefined, line: +o.line || undefined, t0: o.t0, t1: o.t1, t: o.t, aspect: o.aspect || '16x9', captions: !!o.captions, voice: o.voice !== false, music: o.music !== false, sfx: o.sfx !== false, srt: o.srt !== false, dir: o.dir, mix: cliMix, blur: o.blur, speed: o.speed });
    return files;
  }
  if (mode === 'sound') return soundJob({ slug, what: o.what || 'film', scene: +o.scene || undefined, line: +o.line || undefined, t0: o.t0, t1: o.t1, tracks: o.tracks ? String(o.tracks).split(',') : undefined, dir: o.dir, mix: cliMix });
  throw new Error('unknown mode ' + mode);
}
main().then(() => process.exit(0), (e) => { console.error(e.stack || e); process.exit(1); });

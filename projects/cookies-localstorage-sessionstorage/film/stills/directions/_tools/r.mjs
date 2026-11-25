// Direction renderer (cookies-localstorage-sessionstorage). Each direction folder has page.html using _shared/lib.js:
// window.seek(t) renders raw-recording time t on the motion-test timeline; window.show(scene, p) renders one scene at p s.
// node r.mjs stills <X> <16x9|9x16> name=<t> | name=<scene>@<p> ...   -> <X>/frames/<name>.png
// node r.mjs video  <X> <t0> <t1> <out.mp4>                           -> silent mp4 (jpeg frames streamed into ffmpeg, render lock)
// node r.mjs cues   <X>                                               -> <X>/cues.json (sound cues of the timeline)
import fs from 'fs'; import path from 'path'; import os from 'os'; import http from 'http'; import { spawn } from 'child_process';
import { createRequire } from 'module';
import { withLock } from '/Users/gbemi/Desktop/CODE/videos/studio/tools/lock.mjs';
const ROOT = '/Users/gbemi/Desktop/CODE/videos'; const DIRS = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(ROOT + '/studio/package.json'); const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const [mode, xdir, ...rest] = process.argv.slice(2); const X = path.basename(xdir);
const MIME = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf' };
const srv = http.createServer((req, res) => { const f = path.join(DIRS, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(DIRS) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
await new Promise(r => srv.listen(0, '127.0.0.1', r)); const port = srv.address().port;
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
async function open(aspect) {
  const pg = await browser.newPage(); const [w, h] = aspect === '9x16' ? [1080, 1920] : [1920, 1080]; await pg.setViewport({ width: w, height: h });
  pg.on('pageerror', e => console.log('pageerror', e.message)); pg.on('console', m => { if (m.type() === 'error') console.log('page:', m.text()); });
  await pg.goto(`http://127.0.0.1:${port}/${X}/page.html?aspect=${aspect}`); await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(async () => { await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  return pg;
}
async function shot(pg, fn, args, type = 'png') { await pg.evaluate(fn, ...args); await pg.evaluate(() => document.fonts.ready); await pg.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })))); return pg.screenshot({ type, quality: type === 'jpeg' ? 93 : undefined }); }
try {
  if (mode === 'stills') {
    const [aspect, ...shots] = rest; const pg = await open(aspect); fs.mkdirSync(path.join(DIRS, X, 'frames'), { recursive: true });
    for (const a of shots) { const [name, spec] = a.split('='); let buf;
      if (spec.includes('@')) { const [sc, p] = spec.split('@'); buf = await shot(pg, (sc, p) => window.show(sc, p), [sc, +p]); }
      else buf = await shot(pg, t => window.seek(t), [+spec]);
      fs.writeFileSync(path.join(DIRS, X, 'frames', name + '.png'), buf); console.log('still', name, spec); }
  } else if (mode === 'cues') {
    const pg = await open('16x9'); const c = await pg.evaluate(() => window.CUES || []); fs.writeFileSync(path.join(DIRS, X, 'cues.json'), JSON.stringify(c, null, 1)); console.log(c.length, 'cues');
  } else if (mode === 'video') {
    const [t0, t1, out, aspect = '16x9'] = rest; const pg = await open(aspect); const fps = 30; const n = Math.round((+t1 - +t0) * fps);
    const frames = []; for (let i = 0; i < n; i++) { frames.push(await shot(pg, t => window.seek(t), [+t0 + i / fps], 'jpeg')); if (i % 60 === 0) console.log(`frame ${i}/${n}`); }
    await withLock('cookies directions video ' + X, async () => {
      const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
      for (const b of frames) { if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); }
      ff.stdin.end(); await new Promise(r => ff.on('close', r));
    }, { onWait: (o) => console.log('waiting for render lock:', o) });
    console.log('video', out);
  }
} finally { await browser.close(); srv.close(); }

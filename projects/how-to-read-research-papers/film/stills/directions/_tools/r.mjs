// Direction renderer for the scholarships style frames (pages are plain HTML with a pure seek(t)).
// node r.mjs shots <page.html> <WxH> <name> [name...]            -> <page dir>/frames/<name>.png  (page: await window.show(name))
// node r.mjs video <page.html> <WxH> <t0> <t1> <out.mp4> [feed...] -> silent mp4, 30 fps (page: await window.seek(t))
//    feed = id:path:ss:WxH   a video decoded by ffmpeg from ss (seconds) at 30 fps, handed to the page frame by frame
//    (window.setFeed(id, dataURL)); nothing is written to disk. Holds /tmp/gm-render.lock for the whole job.
import fs from 'fs'; import path from 'path'; import os from 'os'; import http from 'http'; import { spawn } from 'child_process';
import { createRequire } from 'module';
import { withLock } from '/Users/gbemi/Desktop/CODE/videos/studio/tools/lock.mjs';
const ROOT = '/Users/gbemi/Desktop/CODE/videos';
const DIRS = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(ROOT + '/studio/package.json'); const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const MIME = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.svg': 'image/svg+xml' };
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const f = path.join(DIRS, u);
  if (!f.startsWith(DIRS) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf ' + u); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => srv.listen(0, '127.0.0.1', r)); const port = srv.address().port;
const [mode, page, size, ...rest] = process.argv.slice(2); const [W, H] = size.split('x').map(Number);
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb', '--disable-background-timer-throttling', '--allow-file-access-from-files'] });
async function open(q) {
  const pg = await browser.newPage(); await pg.setViewport({ width: W, height: H });
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warn') console.log('page:', m.text()); }); pg.on('pageerror', e => console.log('pageerror', e.message));
  await pg.goto(`http://127.0.0.1:${port}/${page}?w=${W}&h=${H}&${q}`, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction('window.READY === true', { timeout: 30000 }); return pg;
}
// split an mjpeg byte stream into frames
function jpegReader(proc) {
  let buf = Buffer.alloc(0); const frames = []; let waiters = []; let done = false;
  proc.stdout.on('data', d => { buf = Buffer.concat([buf, d]); for (;;) { const s = buf.indexOf(Buffer.from([0xff, 0xd8])); const e = buf.indexOf(Buffer.from([0xff, 0xd9]), s + 2); if (s < 0 || e < 0) break; frames.push(buf.subarray(s, e + 2)); buf = buf.subarray(e + 2); } const w = waiters; waiters = []; w.forEach(f => f()); });
  proc.on('close', () => { done = true; const w = waiters; waiters = []; w.forEach(f => f()); });
  return { async next() { while (!frames.length && !done) await new Promise(r => waiters.push(r)); return frames.shift() || null; } };
}
try {
  if (mode === 'shots') {
    const pg = await open('mode=still'); const out = path.join(DIRS, path.dirname(page), 'frames'); fs.mkdirSync(out, { recursive: true });
    for (const name of rest) { await pg.evaluate(n => window.show(n), name); await new Promise(r => setTimeout(r, 60)); await pg.screenshot({ path: path.join(out, name + '.png') }); console.log('still', name); }
  } else if (mode === 'video') {
    const [t0, t1, out, ...feeds] = rest; const fps = 30; const n = Math.round((+t1 - +t0) * fps);
    await withLock('how-to-read-research-papers-directions video', async () => {
      const pg = await open('mode=video');
      const readers = feeds.map(f => { const [id, p, ss, wh] = f.split(':'); const [fw, fh] = wh.split('x');
        const pr = spawn('ffmpeg', ['-v', 'error', '-hwaccel', 'videotoolbox', '-ss', ss, '-i', path.resolve(DIRS, p), '-t', String(+t1 - +t0 + 0.5), '-an', '-vf', `fps=${fps},scale=${fw}:${fh}`, '-f', 'image2pipe', '-c:v', 'mjpeg', '-q:v', '3', '-'], { stdio: ['ignore', 'pipe', 'inherit'] });
        return { id, r: jpegReader(pr), last: null }; });
      const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', '19', '-preset', 'medium', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', path.resolve(out)], { stdio: ['pipe', 'inherit', 'inherit'] });
      for (let i = 0; i < n; i++) {
        for (const rd of readers) { const fr = await rd.r.next(); if (fr) rd.last = fr; if (rd.last) await pg.evaluate((id, d) => window.setFeed(id, d), rd.id, 'data:image/jpeg;base64,' + rd.last.toString('base64')); }
        await pg.evaluate(t => window.seek(t), +t0 + i / fps);
        const buf = await pg.screenshot({ type: 'jpeg', quality: 93 });
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 60 === 0) console.log(`frame ${i}/${n}`);
      }
      ff.stdin.end(); await new Promise(r => ff.on('close', r));
    }, { onWait: (o) => console.log('waiting for render lock:', o) });
    console.log('video', out);
  }
} finally { await browser.close(); srv.close(); }

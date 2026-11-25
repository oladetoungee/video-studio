// Direction renderer: serves the studio runtime + a direction folder as a film, then stills / video / meta.
// node oa.mjs stills <X-dir> <16x9|9x16> name=t name=t ...      -> <X-dir>/frames/<name>.png
// node oa.mjs video  <X-dir> <t0> <t1> <out.mp4> [aspect]       -> silent mp4 (jpeg frames streamed into ffmpeg)
// node oa.mjs meta   <X-dir>                                     -> <X-dir>/meta.json (scenes + sound cues)
import fs from 'fs'; import path from 'path'; import os from 'os'; import http from 'http'; import { spawn } from 'child_process';
import { createRequire } from 'module';
import { withLock } from '/Users/gbemi/Desktop/CODE/videos/studio/tools/lock.mjs';
const ROOT = '/Users/gbemi/Desktop/CODE/videos'; const DIRS = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(ROOT + '/studio/package.json'); const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const [mode, xdir, ...rest] = process.argv.slice(2); const XD = path.resolve(DIRS, xdir); const slug = 'oa-' + path.basename(XD);
const MIME = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.srt': 'text/plain' };
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); let f = null;
  if (u.startsWith('/studio/runtime/') || u.startsWith('/library/')) f = path.join(ROOT, u);
  else if (u === '/host.html') f = path.join(DIRS, '_tools/host.html');
  else if (u.startsWith('/dirs/')) f = path.join(DIRS, u.slice(6));
  else if (u.startsWith('/p/' + slug + '/film/')) f = path.join(XD, u.slice(('/p/' + slug + '/film/').length));
  else if (u.startsWith('/p/' + slug + '/')) f = path.join(DIRS, u.slice(('/p/' + slug + '/').length));
  if (!f || !fs.existsSync(f)) { res.writeHead(404); return res.end('nf ' + u); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => srv.listen(0, '127.0.0.1', r)); const port = srv.address().port;
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb', '--disable-background-timer-throttling'] });
async function open(aspect) {
  const pg = await browser.newPage(); const [w, h] = aspect === '9x16' ? [1080, 1920] : [1920, 1080]; await pg.setViewport({ width: w, height: h });
  pg.on('console', m => { if (m.type() === 'error') console.log('page error:', m.text()); }); pg.on('pageerror', e => console.log('pageerror', e.message));
  await pg.goto(`http://127.0.0.1:${port}/host.html?slug=${slug}&aspect=${aspect}`); await pg.waitForFunction('window.READY === true', { timeout: 30000 });
  const err = await pg.evaluate(() => window.BUILD_ERROR); if (err) { console.log('BUILD ERROR', err); process.exit(1); } return pg;
}
const b64 = (d) => Buffer.from(d.split(',')[1], 'base64');
try {
  if (mode === 'stills') {
    const [aspect, ...shots] = rest; const pg = await open(aspect); fs.mkdirSync(path.join(XD, 'frames'), { recursive: true });
    for (const a of shots) { const [name, t] = a.split('='); fs.writeFileSync(path.join(XD, 'frames', name + '.png'), b64(await pg.evaluate(t => window.grabPNG(t), +t))); console.log('still', name, t); }
  } else if (mode === 'meta') {
    const pg = await open('16x9'); const m = await pg.evaluate(() => window.meta()); fs.writeFileSync(path.join(XD, 'meta.json'), JSON.stringify(m, null, 1)); console.log(m.SCENES.length, 'scenes', m.CUES.length, 'cues');
  } else if (mode === 'video') {
    const [t0, t1, out, aspect = '16x9'] = rest; const pg = await open(aspect); const fps = 30; const n = Math.round((+t1 - +t0) * fps);
    await withLock('oa-directions video', async () => {
      const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
      for (let i = 0; i < n; i++) { const buf = b64(await pg.evaluate(t => window.grab(t, 0.94), +t0 + i / fps)); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 60 === 0) console.log(`frame ${i}/${n}`); }
      ff.stdin.end(); await new Promise(r => ff.on('close', r));
    }, { onWait: (o) => console.log('waiting for render lock:', o) });
    console.log('video', out);
  }
} finally { await browser.close(); srv.close(); }

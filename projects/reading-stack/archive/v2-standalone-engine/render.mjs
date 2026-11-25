#!/usr/bin/env node
// Reading Motion v2 renderer: headless Chrome draws each frame on a canvas (renderFrame(t)),
// JPEG frames are piped straight into ffmpeg (no image sequence on disk).
//
//   node tools/render.mjs meta                        -> data/meta.json (scene list, SFX cues, duration)
//   node tools/render.mjs stills 12.5,60,300 [dir] [png] -> JPG (or PNG) stills
//   node tools/render.mjs fonts                       -> which faces loaded
//   node tools/render.mjs chunked out.mp4 [workers] [chunkSec]  -> resumable full render
//   node tools/render.mjs video [from] [to] [out.mp4] [workers]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 30;
const CHROME = [
  path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell/mac_arm-148.0.7778.97/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find(p => fs.existsSync(p));

function serve() {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png' };
  const srv = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

async function openPage(browser, port) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
  await page.goto(`http://127.0.0.1:${port}/src/index.html`, { waitUntil: 'load' });
  await page.waitForFunction('window.READY === true', { timeout: 60000 });
  const err = await page.evaluate('window.BUILD_ERROR');
  if (err) throw new Error('build error: ' + err);
  return page;
}

// Resumable chunked render: finished chunks are kept as <out>.cNN.mp4, so a browser crash only loses chunks in flight.
//   node tools/render.mjs chunked build/video.mp4 [workers=4] [chunkSeconds=60]
async function chunked(out, workers, chunkSec) {
  const srv = await serve(); const port = srv.address().port;
  const name = i => out.replace(/\.mp4$/, `.c${String(i).padStart(2, '0')}.mp4`);
  let meta = null;
  for (let attempt = 0; attempt < 8; attempt++) {
    let browser;
    try {
      browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] });
      const first = await openPage(browser, port); meta = meta || await first.evaluate('window.meta()');
      const nChunks = Math.ceil(meta.TOTAL / chunkSec);
      const todo = []; for (let i = 0; i < nChunks; i++) if (!fs.existsSync(name(i))) todo.push(i);
      console.log(`attempt ${attempt}: ${todo.length}/${nChunks} chunks to render`);
      if (!todo.length) { await browser.close(); break; }
      const pages = [first]; for (let i = 1; i < Math.min(workers, todo.length); i++) pages.push(await openPage(browser, port));
      const t0 = Date.now();
      await Promise.all(pages.map(async pg => {
        while (todo.length) {
          const i = todo.shift(); const f0 = Math.round(i * chunkSec * FPS), f1 = Math.min(Math.round((i + 1) * chunkSec * FPS), Math.round(meta.TOTAL * FPS));
          const tmp = name(i).replace(/\.mp4$/, '.tmp.mp4');
          const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
            '-c:v', 'h264_videotoolbox', '-b:v', '11M', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
            '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-r', String(FPS), '-f', 'mp4', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
          const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
          try {
            for (let f = f0; f < f1; f++) {
              const url = await pg.evaluate(`window.grab(${(f / FPS).toFixed(6)}, 0.93)`);
              const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
              if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
            }
          } catch (e) { todo.unshift(i); ff.stdin.destroy(); ff.kill(); throw e; }
          ff.stdin.end(); await closed; fs.renameSync(tmp, name(i));
          console.log(`chunk ${i} done  (${((Date.now() - t0) / 1000).toFixed(0)} s into attempt ${attempt})`);
        }
      }));
      await browser.close();
    } catch (e) { console.error('attempt failed:', String(e).slice(0, 200)); try { await browser?.close(); } catch {} }
  }
  const names = []; for (let i = 0; i < Math.ceil(meta.TOTAL / chunkSec); i++) { if (!fs.existsSync(name(i))) throw new Error('missing chunk ' + i); names.push(name(i)); }
  const list = out.replace(/\.mp4$/, '.txt'); fs.writeFileSync(list, names.map(p => `file '${p}'`).join('\n'));
  await new Promise((res, rej) => { const c = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', out], { stdio: 'inherit' }); c.on('close', x => (x === 0 ? res() : rej(new Error('concat failed')))); });
  names.forEach(n => fs.unlinkSync(n)); fs.unlinkSync(list); srv.close();
  console.log('wrote ' + out);
}

async function main() {
  if (process.argv[2] === 'chunked') { const [, , , out, w, cs] = process.argv; return chunked(path.resolve(out), Number(w || 4), Number(cs || 60)); }
  const [mode, ...args] = process.argv.slice(2);
  const srv = await serve(); const port = srv.address().port;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--disable-gpu-vsync', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] });
  try {
    const page = await openPage(browser, port);
    const meta = await page.evaluate('window.meta()');
    if (mode === 'meta') {
      const bad = await page.evaluate(`(() => { for (let t = 0; t < TOTAL; t += 0.2) { try { renderFrame(t); } catch (e) { return t.toFixed(2) + ': ' + e.message; } } return null; })()`);
      if (bad) throw new Error('render check failed at ' + bad);
      fs.writeFileSync(path.join(ROOT, 'data/meta.json'), JSON.stringify(meta, null, 1));
      console.log('TOTAL', meta.TOTAL.toFixed(2), 'scenes', meta.SCENES.length, 'cues', meta.CUES.length);
    } else if (mode === 'stills') {
      const ts = args[0].split(',').map(Number); const dir = path.resolve(args[1] || path.join(ROOT, 'build/stills')); fs.mkdirSync(dir, { recursive: true });
      const png = args[2] === 'png';
      for (const t of ts) {
        const url = await page.evaluate(png ? `window.grabPNG(${t})` : `window.grab(${t}, 0.9)`);
        const f = path.join(dir, `t${t.toFixed(2).padStart(7, '0')}.${png ? 'png' : 'jpg'}`); fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); console.log(f);
      }
    } else if (mode === 'fonts') {
      console.log(JSON.stringify(await page.evaluate('window.FONT_CHECK'), null, 1));
    } else if (mode === 'video') {
      const from = Number(args[0] || 0), to = Math.min(Number(args[1] || meta.TOTAL), meta.TOTAL);
      const out = path.resolve(args[2] || path.join(ROOT, 'build/video.mp4')); const workers = Number(args[3] || 4);
      const f0 = Math.round(from * FPS), f1 = Math.round(to * FPS); const n = f1 - f0;
      const per = Math.ceil(n / workers); const parts = [];
      const pages = [page]; for (let i = 1; i < workers; i++) pages.push(await openPage(browser, port));
      const t0 = Date.now(); let done = 0;
      const tick = setInterval(() => { const el = (Date.now() - t0) / 1000; process.stdout.write(`\r${done}/${n} frames  ${(done / el).toFixed(1)} fps  eta ${((n - done) / Math.max(1, done / el) / 60).toFixed(1)} min   `); }, 5000);
      await Promise.all(pages.map(async (pg, w) => {
        const a = f0 + w * per, b = Math.min(f1, a + per); if (a >= b) return;
        const part = out.replace(/\.mp4$/, `.part${w}.mp4`); parts[w] = part;
        const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
          '-c:v', 'h264_videotoolbox', '-b:v', '11M', '-maxrate', '18M', '-bufsize', '22M', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
          '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-r', String(FPS), part], { stdio: ['pipe', 'inherit', 'inherit'] });
        const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
        for (let f = a; f < b; f++) {
          const url = await pg.evaluate(`window.grab(${(f / FPS).toFixed(6)}, 0.93)`);
          const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
          if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
          done++;
        }
        ff.stdin.end(); await closed;
      }));
      clearInterval(tick);
      const list = out.replace(/\.mp4$/, '.txt'); fs.writeFileSync(list, parts.filter(Boolean).map(p => `file '${p}'`).join('\n'));
      await new Promise((res, rej) => { const c = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', out], { stdio: 'inherit' }); c.on('close', x => (x === 0 ? res() : rej(new Error('concat failed')))); });
      parts.filter(Boolean).forEach(p => fs.unlinkSync(p)); fs.unlinkSync(list);
      console.log(`\nwrote ${out}  (${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    }
  } finally { await browser.close(); srv.close(); }
}
main().catch(e => { console.error(e); process.exit(1); });

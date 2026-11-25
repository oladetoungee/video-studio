// Render stills or a motion test from a direction page (seek(t) + window.ready).
// node render.mjs stills <page.html> <aspect 16x9|9x16> <outdir> name=t name=t ...
// node render.mjs video  <page.html> <aspect> <out.mp4> <t0> <t1> [fps=30] [sub=2]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { spawn, execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(path.resolve('/Users/gbemi/Desktop/CODE/videos/studio/package.json'));
const puppeteer = require('puppeteer-core');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const [mode, page, aspect, out, ...rest] = process.argv.slice(2);
const [w, h] = aspect === '9x16' ? [1080, 1920] : [1920, 1080];
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb', '--allow-file-access-from-files', '--disable-background-timer-throttling'] });
const pg = await browser.newPage(); await pg.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
pg.on('console', m => { if (m.type() === 'error') console.log('page error:', m.text()); }); pg.on('pageerror', e => console.log('pageerror', e.message));
await pg.goto('file://' + path.resolve(page) + '?aspect=' + aspect); await pg.waitForFunction('window.ready === true', { timeout: 20000 });
if (mode === 'stills') {
  fs.mkdirSync(out, { recursive: true });
  for (const a of rest) { const [name, t] = a.split('='); await pg.evaluate(t => window.seek(t), +t); await pg.screenshot({ path: path.join(out, name + '.png') }); console.log('still', name, t); }
} else {
  const [t0, t1, fps = 30, sub = 2] = rest.map(Number);
  const n = Math.round((t1 - t0) * fps);
  // machine-wide lock for encodes (BRIEF.md)
  const lock = '/tmp/gm-render.lock'; for (;;) { try { fs.mkdirSync(lock); fs.writeFileSync(lock + '/owner', 'ux-research directions agent'); break; } catch { await new Promise(r => setTimeout(r, 5000)); console.log('waiting for lock'); } }
  try {
    const vf = (sub > 1 ? `tmix=frames=${sub},select='eq(mod(n\\,${sub})\\,${sub - 1})',setpts=N/(${fps}*TB),` : '') + 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p';
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(fps * sub), '-i', '-', '-vf', vf, '-r', String(fps), '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-color_range', 'tv', '-colorspace', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) {
      for (let s = 0; s < sub; s++) {
        // a page can ask for crisp frames (no motion blur) with window.crisp(t), e.g. for hard-edged wipes
        const tf = t0 + i / fps, crisp = await pg.evaluate(t => (window.crisp ? !!window.crisp(t) : false), tf);
        const t = crisp ? tf : t0 + (i + s / sub) / fps;
        await pg.evaluate(t => window.seek(t), t);
        const buf = await pg.screenshot({ type: 'png' });
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      if (i % 30 === 0) console.log(`frame ${i}/${n}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  } finally { try { fs.unlinkSync(lock + '/owner'); } catch {} try { fs.rmdirSync(lock); } catch {} }
  console.log('video', out);
}
await browser.close();

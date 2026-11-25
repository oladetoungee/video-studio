// Font audit (2026-11-13 font-board pass): every font drawn with fillText over a moment, sampled every 0.5 s (captions on).
//   node talking-head/tools/fontaudit.mjs <talking-head.json> <id,id,...> [aspect]
import path from 'node:path'; import os from 'node:os'; import fs from 'node:fs';
import { createRequire } from 'node:module'; const puppeteer = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json')('puppeteer-core');
const STUDIO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../studio');
const [man, ids, aspect0] = process.argv.slice(2);
const { start } = await import(path.join(STUDIO, 'server.mjs')); const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const base2 = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const exe = fs.readdirSync(base2).sort().reverse().map(v => path.join(base2, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(p => fs.existsSync(p));
const browser = await puppeteer.launch({ executablePath: exe, headless: true });
const rel = path.relative(path.join(STUDIO, '../projects'), path.resolve(man));
try {
  for (const id of ids.split(',')) {
    const aspect = aspect0 || (id === 'teaser' || id === 'full' ? '16x9' : '9x16'); const [w, h] = { '16x9': [1920, 1080], '9x16': [1080, 1920] }[aspect];
    const pg = await browser.newPage(); await pg.setViewport({ width: w, height: h });
    await pg.evaluateOnNewDocument(() => { window.__F = {}; const f0 = CanvasRenderingContext2D.prototype.fillText; CanvasRenderingContext2D.prototype.fillText = function (...a) { const k = this.font.replace(/^.*?\d+(\.\d+)?px\s*/, ''); window.__F[k] = (window.__F[k] || 0) + 1; return f0.apply(this, a); }; });
    await pg.goto(`${base}/studio/runtime/moment.html?` + new URLSearchParams({ m: '/p/' + rel, id, aspect, captions: '1' }), { waitUntil: 'load' });
    await pg.waitForFunction('window.READY === true', { timeout: 90000 });
    const r = await pg.evaluate(() => { const T = window.meta().TOTAL; for (let t = 0.03; t < T; t += 0.5) renderMoment(t); return window.__F; });
    console.log(id, aspect, JSON.stringify(r)); await pg.close();
  }
} finally { await browser.close(); srv.close(); }

// Shift+Enter test: for each text element on a short's cover + first seconds, render it with its words on one line vs a
// typed line break after the first word. Identical pixels = the break was ignored. Graphics only (no footage decode).
// node breaktest.mjs <slug> [ids,comma]   -> JSON lines
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import crypto from 'node:crypto';
const ROOT = '/Users/gbemi/Desktop/CODE/videos';
const { start } = await import(path.join(ROOT, 'studio/server.mjs'));
const puppeteer = (await import(path.join(ROOT, 'studio/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'))).default;
const slug = process.argv[2]; const only = process.argv[3] ? process.argv[3].split(',') : null;
const man = JSON.parse(fs.readFileSync(path.join(ROOT, 'projects', slug, 'talking-head/talking-head.json'), 'utf8'));
const ids = man.moments.filter(m => m.kind === 'short' && (!only || only.includes(m.id))).map(m => m.id);
const srv = await start(0); const base = `http://127.0.0.1:${srv.address().port}`;
const base2 = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
const exe = fs.readdirSync(base2).sort().reverse().map(v => path.join(base2, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(p => fs.existsSync(p));
const browser = await puppeteer.launch({ executablePath: exe, headless: true });
const TIMES = (process.env.TIMES || '0.03,1.5,4').split(',').map(Number);
for (const id of ids) {
  const page = await browser.newPage(); await page.setViewport({ width: 1080, height: 1920 });
  const q = new URLSearchParams({ m: `/p/${slug}/talking-head/talking-head.json`, id, aspect: '9x16', captions: '0', elements: '1' });
  await page.goto(`${base}/studio/runtime/moment.html?${q}`, { waitUntil: 'load' });
  await page.waitForFunction('window.READY === true', { timeout: 90000 });
  const err = await page.evaluate('window.BUILD_ERROR'); if (err) { console.log(JSON.stringify({ id, error: err.slice(0, 200) })); await page.close(); continue; }
  const res = await page.evaluate(async (TIMES) => {
    const out = [];
    const hash = (t) => { renderMoment(t); const c = document.getElementById('c'); return c.toDataURL('image/png'); };
    const seen = new Set();
    for (const t of TIMES) {
      EL.list = []; EL.rec = true; renderMoment(t);
      const els = EL.list.filter(e => (e.kind === 'text' || typeof e.text === 'string') && e.w > 40 && e.a > 0.5 && !e.hidden);
      for (const e of els) {
        if (seen.has(e.id + '@ok')) continue;
        const prev = EDIT.data.t[e.id]; const key = e.id.split('/').slice(1).join('/').replace(/#\d+$/, '');
        const cur = typeof e.text === 'string' ? e.text : (prev && prev.s != null ? prev.s : key); const words = String(cur).replace(/\|/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
        if (words.length < 3) { out.push({ t, el: e.id, skip: 'under 3 words' }); continue; }
        const one = words.join(' '), brk = words[0] + '\n' + words.slice(1).join(' ');
        EDIT.data.t[e.id] = { ...(prev || {}), s: one }; const a = hash(t);
        EDIT.data.t[e.id] = { ...(prev || {}), s: brk }; EL.list = []; const b = hash(t);
        const after = EL.list.find(x => x.id === e.id);
        if (prev) EDIT.data.t[e.id] = prev; else delete EDIT.data.t[e.id];
        if (a !== b) seen.add(e.id + '@ok'); out.push({ t, el: e.id, text: one.slice(0, 60), honoured: a !== b, h: Math.round(e.h), h2: after ? Math.round(after.h) : null });
      }
    }
    return out;
  }, TIMES);
  for (const r of res) console.log(JSON.stringify({ id, ...r }));
  await page.close();
}
await browser.close(); srv.close(); process.exit(0);

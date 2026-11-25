// Graphics-only contact sheet (no 4K read, no render lock): the moment's graphics layer at given times, laid over a still of her
// (a 1080p frame from the directions folder, NOT the per-moment camera), tiled by PIL into a sheet <= 2000 px wide.
// node gsheet.mjs <id> <aspect 16x9|9x16> <t,t,...|every:N> <out.jpg>
import fs from 'fs'; import path from 'path'; import os from 'os'; import { spawnSync } from 'child_process'; import { createRequire } from 'module';
const ROOT = '/Users/gbemi/Desktop/CODE/videos'; const require = createRequire(ROOT + '/studio/package.json'); const puppeteer = require('puppeteer-core');
const [id, aspect, times, out] = process.argv.slice(2);
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const v = fs.readdirSync(base).sort().reverse()[0];
const { start } = await import(ROOT + '/studio/server.mjs'); const srv = await start(0); const url = `http://127.0.0.1:${srv.address().port}`;
const b = await puppeteer.launch({ executablePath: path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), headless: true, args: ['--force-color-profile=srgb'] });
const [w, h] = aspect === '16x9' ? [1920, 1080] : [1080, 1920];
const pg = await b.newPage(); await pg.setViewport({ width: w, height: h });
pg.on('pageerror', e => console.error('[page]', e.message));
const q = new URLSearchParams({ m: '/p/cheapest-european-countries-for-nigerian-students/talking-head/talking-head.json', id, aspect, captions: '1' });
await pg.goto(`${url}/studio/runtime/moment.html?${q}`, { waitUntil: 'load' }); await pg.waitForFunction('window.READY === true', { timeout: 90000 });
const meta = await pg.evaluate('window.meta()');
let ts = times.startsWith('every:') ? (() => { const e = +times.slice(6), a = []; for (let t = 0.6; t < meta.TOTAL - 0.1; t += e) a.push(+t.toFixed(2)); return a; })() : times.split(',').map(Number);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gs-')); const files = [];
for (const t of ts) { const u = await pg.evaluate(`window.grab(${t}, null)`); const f = path.join(tmp, `${String(files.length).padStart(3, '0')}.png`); fs.writeFileSync(f, Buffer.from(u.slice(u.indexOf(',') + 1), 'base64')); files.push(f); }
await b.close(); srv.close();
const bg = ROOT + '/projects/cheapest-european-countries-for-nigerian-students/film/stills/directions/_src/raw_150.jpg';
const py = `import sys, json
from PIL import Image, ImageDraw
fs, ts, out, asp, bg = json.loads(sys.argv[1])
cw, ch = (384, 216) if asp == '16x9' else (200, 356)
cols = min(len(fs), 5 if asp == '16x9' else 9); rows = (len(fs) + cols - 1) // cols
B = Image.open(bg).convert('RGB')
def cover(im, w, h):
    s = max(w / im.width, h / im.height); im = im.resize((int(im.width * s + 1), int(im.height * s + 1))); return im.crop(((im.width - w) // 2, (im.height - h) // 2, (im.width - w) // 2 + w, (im.height - h) // 2 + h))
sh = Image.new('RGB', (cols * (cw + 4) + 4, rows * (ch + 18) + 4), (70, 70, 70)); d = ImageDraw.Draw(sh)
for i, (f, t) in enumerate(zip(fs, ts)):
    g = Image.open(f).convert('RGBA'); base = cover(B, g.width, g.height).convert('RGBA'); base.alpha_composite(g)
    x, y = 4 + (i % cols) * (cw + 4), 4 + (i // cols) * (ch + 18); sh.paste(base.convert('RGB').resize((cw, ch)), (x, y + 14)); d.text((x + 2, y), f'{t:.1f}s', fill=(255, 255, 255))
sh.save(out, quality=88)
print(out, sh.size)`;
const r = spawnSync('python3', ['-c', py, JSON.stringify([files, ts, out, aspect, bg])], { encoding: 'utf8' }); console.log(r.stdout, r.stderr.slice(-400));
for (const f of files) fs.unlinkSync(f); fs.rmdirSync(tmp);

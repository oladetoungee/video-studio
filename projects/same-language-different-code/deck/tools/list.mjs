// Lists the slides of a version with ids, clicks, slide text and script length.  node tools/list.mjs [short|full]
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const here = path.dirname(fileURLToPath(import.meta.url));
const puppeteer = createRequire(path.resolve(here, '../../../../studio/package.json'))('puppeteer-core');
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
let exe; for (const v of fs.readdirSync(base).sort().reverse()) for (const a of ['mac-arm64', 'mac-x64']) { const p = path.join(base, v, `chrome-headless-shell-${a}/chrome-headless-shell`); if (!exe && fs.existsSync(p)) exe = p; }
const v = process.argv[2] || 'short';
const b = await puppeteer.launch({ executablePath: exe }); const p = await b.newPage();
await p.goto(pathToFileURL(path.join(here, '..', 'index.html')).href + '?static&v=' + v);
await p.waitForFunction(() => window.D && D.slides && D.slides.length > 10);
const ids = (process.argv[3] || "").split(",").filter(Boolean);
if (ids.length) { console.log((await p.evaluate((ids) => D.slides.map((s, i) => ids.includes(s.id) ? `=== ${i + 1} ${s.id} (${s.steps} clicks)\n${s.notes}` : "").filter(Boolean).join("\n"), ids))); await b.close(); process.exit(0); }
const r = await p.evaluate(() => D.slides.map((s, i) => `${i + 1}\t${s.id}\t${s.steps}\t${(s.el?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)}\t|${(s.notes || '').split(/\s+/).length}w`));
console.log(r.join('\n'));
const bad = await p.evaluate(() => D.slides.filter(s => ((s.notes || '').match(/\[click\]/g) || []).length !== (s.steps || 0)).map(s => s.id));
console.log(bad.length ? 'CLICK MISMATCH: ' + bad.join(', ') : 'clicks match scripts on every slide');
const w = await p.evaluate(() => D.slides.reduce((a, s) => a + (s.notes || '').replace(/\[[^\]]*\]/g, '').split(/\s+/).filter(Boolean).length, 0));
console.log(`${r.length} slides, ${w} words, ~${(w / 130).toFixed(1)} min at 130 wpm`);
await b.close();

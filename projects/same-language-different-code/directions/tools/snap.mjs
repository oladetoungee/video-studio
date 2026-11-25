// Snapshot slides for review.  node tools/snap.mjs <outDir> [from-to] [--theme stage] [--times 0,400,1200] [--step N]
// Default: each slide at its final step (static).  --times: plays the slide's entrance (or step --step) and grabs frames at those ms.
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const puppeteer = createRequire(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../studio/package.json'))('puppeteer-core');
const here = path.dirname(fileURLToPath(import.meta.url));
const deck = pathToFileURL(path.join(here, '..', process.env.DECK_HTML || 'index.html')).href;
function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
  for (const v of fs.readdirSync(base).sort().reverse()) for (const a of ['mac-arm64', 'mac-x64']) {
    const p = path.join(base, v, `chrome-headless-shell-${a}/chrome-headless-shell`); if (fs.existsSync(p)) return p; }
}
const args = process.argv.slice(2);
const out = args[0]; fs.mkdirSync(out, { recursive: true });
const range = args[1] && /^\d+(-\d+)?$/.test(args[1]) ? args[1].split('-').map(Number) : null;
const opt = (k) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : null; };
const theme = opt('--theme'); const times = opt('--times'); const stepArg = opt('--step');
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 0.5 });
page.on('pageerror', e => console.log('PAGE ERROR', e.message));
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
const n = await (async () => { await page.goto(deck + '?static' + (theme ? '&theme=' + theme : '') + '#1'); await page.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 300)); return page.evaluate(() => D.slides.length); })();
const [a, b] = range ? [range[0], range[1] || range[0]] : [1, n];
for (let i = a; i <= Math.min(b, n); i++) {
  const id = await page.evaluate(i => D.slides[i - 1].id, i);
  if (!times) {
    await page.evaluate(i => { D.go(i - 1, D.slides[i - 1].steps, false); }, i);
    await new Promise(r => setTimeout(r, 250));
    await page.screenshot({ path: path.join(out, `${String(i).padStart(2, '0')}-${id}.jpg`), type: 'jpeg', quality: 80 });
  } else {
    const st = stepArg != null ? +stepArg : 0;
    await page.evaluate((i, st) => { D.static = false; D.go(i % D.slides.length, 0, false); if (st === 0) D.go(i - 1, 0, true); else { D.go(i - 1, st - 1, false); D.next(); } }, i, st);
    const t0 = Date.now();
    for (const t of times.split(',').map(Number)) {
      const wait = t - (Date.now() - t0); if (wait > 0) await new Promise(r => setTimeout(r, wait));
      await page.screenshot({ path: path.join(out, `${String(i).padStart(2, '0')}-${id}-s${st}-t${t}.jpg`), type: 'jpeg', quality: 75 });
    }
  }
}
console.log(`snapped ${a}-${Math.min(b, n)} of ${n} -> ${out}`);
await browser.close();

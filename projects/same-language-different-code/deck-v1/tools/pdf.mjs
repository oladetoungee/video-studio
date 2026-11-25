// Backup PDF: every slide at its final step, one 1920x1080 page each.
// node tools/pdf.mjs [from-to]   -> deck/build/deck-backup.pdf
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const here = path.dirname(fileURLToPath(import.meta.url));
const puppeteer = createRequire(path.resolve(here, '../../../../studio/package.json'))('puppeteer-core');
function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
  for (const v of fs.readdirSync(base).sort().reverse()) for (const a of ['mac-arm64', 'mac-x64']) {
    const p = path.join(base, v, `chrome-headless-shell-${a}/chrome-headless-shell`); if (fs.existsSync(p)) return p; }
}
const range = process.argv[2] && /^\d+(-\d+)?$/.test(process.argv[2]) ? process.argv[2].split('-').map(Number) : null;
const outDir = path.join(here, '..', 'build'); fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, process.argv[3] || 'deck-backup.pdf');
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGE ERROR', e.message));
await page.goto(pathToFileURL(path.join(here, '..', 'index.html')).href + '?static#1');
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 400));
const n = await page.evaluate(() => D.slides.length);
const [a, b] = range ? [range[0], Math.min(range[1] || range[0], n)] : [1, n];
// Lay every slide out as its own page, at its final step.
await page.evaluate((a, b) => {
  const stage = document.getElementById('stage');
  const pages = [];
  for (let i = a - 1; i < b; i++) {
    D.go(i, D.slides[i].steps, false);
    const el = D.slides[i].el.cloneNode(true);
    el.classList.add('cur', 'instant'); el.style.position = 'relative'; el.style.width = '1920px'; el.style.height = '1080px';
    el.style.breakAfter = 'page'; el.removeAttribute('id');
    pages.push(el);
  }
  const wrap = document.createElement('div'); wrap.id = 'print';
  pages.forEach(p => wrap.appendChild(p));
  document.body.innerHTML = ''; document.body.appendChild(wrap);
  document.body.style.overflow = 'visible'; document.documentElement.style.overflow = 'visible';
  const st = document.createElement('style');
  st.textContent = '@page{size:1920px 1080px;margin:0} html,body{width:1920px;height:auto!important;background:#000} #print .slide{display:block!important;break-after:page;overflow:hidden}';
  document.head.appendChild(st);
}, a, b);
await new Promise(r => setTimeout(r, 600));
await page.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
console.log(`PDF ${a}-${b} of ${n} -> ${out}`);
await browser.close();

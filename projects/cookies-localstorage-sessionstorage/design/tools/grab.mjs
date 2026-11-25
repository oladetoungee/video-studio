// Screenshot the real element (paragraph / list item / pre) that holds a phrase, at 3x, narrow page so the text is big.
// node design/tools/grab.mjs <url> <out.png> "<phrase>" [viewportWidth=520]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
const exe = fs.readdirSync(base).sort().reverse().map(v => path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(p => fs.existsSync(p));
const [url, out, phrase, vw = '520'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--force-color-profile=srgb'] });
const pg = await b.newPage();
await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
await pg.setViewport({ width: +vw, height: 1200, deviceScaleFactor: 3 });
await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(e => console.log('goto', e.message));
await new Promise(r => setTimeout(r, 1500));
await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.remove(); } });
const box = await pg.evaluate((p) => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { if (n.textContent.toLowerCase().includes(p.toLowerCase())) { let el = n.parentElement; while (el && !/^(P|LI|PRE|DIV|BLOCKQUOTE)$/.test(el.tagName)) el = el.parentElement;
    el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height, tag: el.tagName }; } }
  return null; }, phrase);
if (!box) { console.log('not found'); process.exit(1); }
const pad = 14;
await pg.screenshot({ path: out, clip: { x: Math.max(0, box.x - pad), y: box.y - pad, width: box.w + 2 * pad, height: box.h + 2 * pad }, captureBeyondViewport: true });
console.log(JSON.stringify(box), out); await b.close();

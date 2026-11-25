// Capture ONE real paragraph of a page at a narrow (phone) width so its words read big on a thumbnail or slide.
// The page is not changed: we only screenshot the paragraph's box. Prints the boxes of the given phrases (for a highlight drawn on top).
// node tools/capture-para.mjs <url> <text the paragraph contains> <out.png> [css width=420] ["phrase|phrase"]
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell');
const exe = fs.readdirSync(base).sort().reverse().map(v => path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(p => fs.existsSync(p));
const [url, needle, out, w = '420', phr = ''] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--force-color-profile=srgb'] });
const pg = await browser.newPage();
await pg.setViewport({ width: +w, height: 1400, deviceScaleFactor: 3 });
try { await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }); } catch (e) { console.log('goto:', e.message); }
await new Promise(r => setTimeout(r, 2000));
const box = await pg.evaluate((needle, phr) => {
  for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.style.display = 'none'; }
  const p = [...document.querySelectorAll('p, li, h2, h3')].find(e => e.textContent.replace(/\s+/g, ' ').includes(needle));
  if (!p) return null; p.scrollIntoView({ block: 'center' }); const r = p.getBoundingClientRect();
  const marks = [];
  for (const ph of phr ? phr.split('|') : []) { const tw = document.createTreeWalker(p, NodeFilter.SHOW_TEXT); let n, acc = '', nodes = [];
    while ((n = tw.nextNode())) { nodes.push([n, acc.length]); acc += n.textContent; }
    const i = acc.indexOf(ph); if (i < 0) continue; const rg = document.createRange();
    const at = (k) => { for (let j = nodes.length - 1; j >= 0; j--) if (nodes[j][1] <= k) return [nodes[j][0], k - nodes[j][1]]; };
    rg.setStart(...at(i)); rg.setEnd(...at(i + ph.length));
    marks.push([...rg.getClientRects()].map(b => [b.x - r.x + 12, b.y - r.y + 12, b.width, b.height])); }
  return { x: r.x - 12, y: r.y - 12, w: r.width + 24, h: r.height + 24, marks };
}, needle, phr);
if (!box) { console.log('paragraph not found'); await browser.close(); process.exit(1); }
await new Promise(r => setTimeout(r, 400));
await pg.screenshot({ path: out, clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
fs.writeFileSync(out.replace(/\.png$/, '.json'), JSON.stringify({ url, needle, cssWidth: +w, scale: 3, box, captured: new Date().toISOString() }, null, 1));
console.log(JSON.stringify(box)); await browser.close();

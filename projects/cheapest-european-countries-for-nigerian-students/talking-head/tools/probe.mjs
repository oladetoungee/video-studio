import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json'); const puppeteer = require('puppeteer-core');
const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const v = fs.readdirSync(base).sort().reverse()[0];
const b = await puppeteer.launch({ executablePath: path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'), headless: true });
const [url, ...pats] = process.argv.slice(2); const pg = await b.newPage();
await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
try { await pg.goto(url, { waitUntil: 'networkidle2', timeout: 40000 }); } catch (e) { console.log('goto', e.message); }
await new Promise(r => setTimeout(r, 2500));
const t = await pg.evaluate(() => document.title + ' ||| ' + (document.body ? document.body.innerText : ''));
console.log(t.slice(0, 200).replace(/\n/g, ' '));
for (const p of pats) { const re = new RegExp(p, 'gi'); let m; let k = 0; while ((m = re.exec(t)) && k++ < 3) console.log('  [' + p + ']', JSON.stringify(t.slice(Math.max(0, m.index - 80), m.index + 80))); }
await b.close();

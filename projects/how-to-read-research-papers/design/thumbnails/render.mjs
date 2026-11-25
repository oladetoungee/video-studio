// Render every thumbnail direction to PNG with headless Chrome.
//   node render.mjs              -> all directions -> ../../outputs/thumbnails/<dir>.png (1280x720)
//   node render.mjs 01 04        -> only directions whose folder starts with these prefixes (or has exactly this name)
//   node render.mjs --guides     -> also show the duration-badge safe zone (review only, writes to review/)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(ROOT, '../..');            // projects/how-to-read-research-papers (served as web root)
const BASE = '/' + path.relative(PROJ, ROOT);         // /design/thumbnails
const OUT = path.resolve(PROJ, 'outputs/thumbnails');
const REVIEW = path.join(ROOT, 'review');
const args = process.argv.slice(2);
const guides = args.includes('--guides');
const only = args.filter(a => !a.startsWith('--'));

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(PROJ, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(PROJ) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

function chromePath() {
  const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell');
  for (const v of fs.readdirSync(base)) {
    const p = path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
    if (fs.existsSync(p)) return p;
  }
  throw new Error('chrome-headless-shell not found');
}

const all = fs.readdirSync(path.join(ROOT, 'directions')).filter(d => fs.existsSync(path.join(ROOT, 'directions', d, 'index.html')));
// a full folder name selects only that direction (so "01-contents-first" does not also pick "01-contents-first-v2")
const dirs = all.filter(d => !only.length || only.some(o => (all.includes(o) ? d === o : d.startsWith(o)))).sort();
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(REVIEW, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath(), args: ['--force-color-profile=srgb', '--font-render-hinting=none'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
for (const d of dirs) {
  await page.goto(`http://localhost:${port}${BASE}/directions/${d}/index.html${guides ? '?guides' : ''}`, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.__ready === true', { timeout: 20000 });
  const file = guides ? path.join(REVIEW, `${d}_guides.png`) : path.join(OUT, `${d}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1280, height: 720 } });
  console.log(d, '->', path.relative(ROOT, file), Math.round(fs.statSync(file).size / 1024) + ' KB');
}
// overview.png: every option with its suggested title (only on a full run)
if (!only.length && !guides) {
  fs.writeFileSync(path.join(ROOT, 'directions', 'index.json'), JSON.stringify(fs.readdirSync(path.join(ROOT, 'directions'))
    .filter(d => fs.existsSync(path.join(ROOT, 'directions', d, 'index.html'))).sort()));
  await page.setViewport({ width: 2000, height: 1000, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${port}${BASE}/overview.html`, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.__ready === true', { timeout: 20000 });
  const file = path.join(OUT, 'overview.png');
  await page.screenshot({ path: file, fullPage: true });
  console.log('overview ->', path.relative(ROOT, file), Math.round(fs.statSync(file).size / 1024) + ' KB');
}
await browser.close(); server.close();

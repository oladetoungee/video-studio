#!/usr/bin/env node
// "Download this part": one element of a thumbnail or a carousel slide (with everything inside it) as a PNG.
// It loads the same page the export renders, the same way (thumbnails: design/thumbnails/render.mjs's little server +
// its Chrome flags; carousels: design/carousels/<deck>/index.html from file://, as shared/build.mjs does), so her
// edits (moves, sizes, hidden items, colours, photos, text) are drawn exactly as in the full export. Nothing in the
// design is changed: the hiding below happens only inside this headless page.
//   node studio/tools/part.mjs <slug> thumbnails <direction> <part> [--scale 2] [--bg none|ground|all]
//   node studio/tools/part.mjs <slug> carousels <deck> <slide> <part> [--scale 2] [--bg none|ground|all]
// <part> = the studio's element name: data-move, else data-k, else "img:<data-img>" (as in content.json "nudge").
// --bg none   (default) see-through: only the part; its parents' grounds and everything around it are hidden
//      ground  the part on the design's ground colour (and its grid lines), other elements hidden
//      all     a plain crop of the finished design around the part (everything in that area, as exported)
// Writes outputs/thumbnails/parts/<direction>_<part>.png or outputs/carousels/<deck>/parts/<NN>_<part>.png
// (+ "@2x" at double size, "-on-ground" / "-crop" for the other backgrounds). Prints "@file <path>" when STUDIO_JOB=1.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.dirname(STUDIO);
const JOB = !!process.env.STUDIO_JOB;
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const pos = argv.filter((a, i) => !a.startsWith('--') && !['--scale', '--bg'].includes(argv[i - 1]));
const [slug, group] = pos;
const scale = +opt('--scale', 1) === 2 ? 2 : 1;
const bg = ['none', 'ground', 'all'].includes(opt('--bg')) ? opt('--bg') : 'none';
if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(slug || '')) throw new Error('bad project');
const PROJ = path.join(ROOT, 'projects', slug);
const safe = (s) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(s || '');

// a file name from the element name: "img:scene" -> "photo-scene", "rows.0.head" -> "rows-0-head"
const partFile = (name) => (name.startsWith('img:') ? 'photo-' + name.slice(4) : name).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'part';
const suffix = (scale === 2 ? '@2x' : '') + (bg === 'ground' ? '-on-ground' : bg === 'all' ? '-crop' : '');

// runs in the page: find the part, hide what is not part of it, return the area to capture (CSS px, page coordinates)
function prepare({ rootSel, name, bg }) {
  const root = document.querySelector(rootSel); if (!root) return { error: 'the design did not load' };
  const q = (a, v) => root.querySelector(`[${a}="${CSS.escape(v)}"]`);
  let el = name.startsWith('img:') ? q('data-img', name.slice(4)) : q('data-move', name) || q('data-k', name);
  if (!el) return { error: `there is no “${name}” in this design (it may have been renamed)` };
  // a photo alone in its frame: take the frame too (border, rotation, shadow)
  if (el.tagName === 'IMG' && el.parentElement !== root && el.parentElement.children.length === 1) el = el.parentElement;
  const cs0 = getComputedStyle(el);
  if (cs0.display === 'none' || cs0.visibility === 'hidden') return { error: 'this part is hidden or empty in the design' };
  root.scrollIntoView();

  // area: the part and everything visible inside it, with shadows and a little room for letters that overhang their box
  const shadowPad = (v, text) => {   // [left, top, right, bottom] reach of box-shadow / text-shadow / drop-shadow
    const out = [0, 0, 0, 0]; if (!v || v === 'none') return out;
    for (const s of v.split(/,(?![^(]*\))/)) {
      if (/inset/.test(s)) continue;
      const n = (s.replace(/rgba?\([^)]*\)|#[0-9a-f]+|[a-z-]+\([^)]*\)/gi, '').match(/-?[\d.]+px/g) || []).map(parseFloat);
      const [ox = 0, oy = 0, blur = 0, spread = 0] = n; const r = blur + (text ? 0 : spread);
      out[0] = Math.max(out[0], r - ox); out[1] = Math.max(out[1], r - oy); out[2] = Math.max(out[2], r + ox); out[3] = Math.max(out[3], r + oy);
    }
    return out;
  };
  let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity;
  for (const e of [el, ...el.querySelectorAll('*')]) {
    const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = e.getBoundingClientRect(); if (!r.width && !r.height) continue;
    const k = e.offsetWidth ? r.width / e.offsetWidth : 1;   // scale from transforms (shadows scale with it)
    const own = [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
    const fp = own ? Math.max(4, parseFloat(cs.fontSize) * 0.15) * k : 0;
    const p = [shadowPad(cs.boxShadow), shadowPad(cs.textShadow, true), shadowPad((cs.filter.match(/drop-shadow\([^)]*\)[^)]*\)?/g) || []).map(x => x.slice(12, -1)).join(','))]
      .reduce((a, b) => a.map((x, i) => Math.max(x, b[i])));
    L = Math.min(L, r.left - p[0] * k - fp); T = Math.min(T, r.top - p[1] * k - fp); R = Math.max(R, r.right + p[2] * k + fp); B = Math.max(B, r.bottom + p[3] * k + fp);
  }
  const rr = root.getBoundingClientRect();   // the design's own edge clips everything (as in the export)
  L = Math.max(L, rr.left); T = Math.max(T, rr.top); R = Math.min(R, rr.right); B = Math.min(B, rr.bottom);
  if (!(R - L >= 1 && B - T >= 1)) return { error: 'this part is outside the design' };

  if (bg !== 'all') {
    const st = document.createElement('style');
    st.textContent = '.__pt-hide, .__pt-hide * { visibility: hidden !important; }' + (bg === 'none'
      ? ' html, body { background: transparent !important; } .__pt-anc { background: transparent !important; box-shadow: none !important; border-color: transparent !important; outline-color: transparent !important; } .__pt-anc::before, .__pt-anc::after { visibility: hidden !important; }'
      : '');
    document.head.appendChild(st);
    const keepAsGround = (c) => bg === 'ground' && c.classList.contains('grid');
    for (let a = el.parentElement, child = el; a; child = a, a = a.parentElement) {
      a.classList.add('__pt-anc');
      for (const c of a.children) if (c !== child && !['SCRIPT', 'STYLE', 'LINK', 'HEAD'].includes(c.tagName) && !keepAsGround(c)) c.classList.add('__pt-hide');
      // loose text of a parent (rare): hide it too
      for (const t of [...a.childNodes]) if (t.nodeType === 3 && t.textContent.trim()) { const s = document.createElement('span'); s.className = '__pt-hide'; t.replaceWith(s); s.appendChild(t); }
    }
  }
  const x = Math.floor(L + scrollX), y = Math.floor(T + scrollY);
  return { x, y, width: Math.ceil(R + scrollX) - x, height: Math.ceil(B + scrollY) - y, tag: el.tagName.toLowerCase() };
}

async function main() {
  let url, out, rootSel, viewport, chromeArgs, executablePath, server = null, waitReady, partName;
  if (group === 'thumbnails') {
    const [, , item, name] = pos; if (!safe(item) || !name) throw new Error('usage: part.mjs <slug> thumbnails <direction> <part>');
    const dir = path.join(PROJ, 'design', 'thumbnails');
    if (!fs.existsSync(path.join(dir, 'directions', item, 'index.html'))) throw new Error('no direction ' + item);
    // the same little server as design/thumbnails/render.mjs (project folder as web root)
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
    server = http.createServer((req, res) => {
      const p = path.join(PROJ, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!p.startsWith(PROJ) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
      fs.createReadStream(p).pipe(res);
    });
    await new Promise(r => server.listen(0, r));
    url = `http://localhost:${server.address().port}/design/thumbnails/directions/${item}/index.html`;
    rootSel = '.t'; viewport = { width: 1280, height: 720 };
    chromeArgs = ['--force-color-profile=srgb', '--font-render-hinting=none'];
    const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell');   // render.mjs takes the first one found
    executablePath = fs.readdirSync(base).map(v => path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell')).find(p => fs.existsSync(p));
    waitReady = (page) => page.waitForFunction('window.__ready === true', { timeout: 20000 });
    out = path.join(PROJ, 'outputs', 'thumbnails', 'parts', `${item}_${partFile(name)}${suffix}.png`);
    partName = name;
  } else if (group === 'carousels') {
    const [, , deck, slideS, name] = pos; const slide = +slideS;
    if (!safe(deck) || !(slide >= 1) || !name) throw new Error('usage: part.mjs <slug> carousels <deck> <slide> <part>');
    const dir = path.join(PROJ, 'design', 'carousels');
    const C = JSON.parse(fs.readFileSync(path.join(dir, deck, 'content.json'), 'utf8'));
    if (slide > C.slides.length) throw new Error(`no slide ${slide} (the deck has ${C.slides.length})`);
    // index.html from content.json, exactly as the export builds it
    execFileSync(process.execPath, [path.join('shared', 'build.mjs'), deck, '--html'], { cwd: dir, stdio: ['ignore', 'ignore', 'inherit'], env: { ...process.env, STUDIO_JOB: '' } });
    url = 'file://' + path.join(dir, deck, 'index.html');
    rootSel = '#s' + slide; viewport = { width: C.width + 200, height: C.height };
    chromeArgs = ['--allow-file-access-from-files', '--font-render-hinting=none'];
    const src = fs.readFileSync(path.join(dir, 'shared', 'build.mjs'), 'utf8'); const m = /const CHROME = path\.join\(process\.env\.HOME, '([^']+)'\)/.exec(src);
    executablePath = m ? path.join(process.env.HOME, m[1]) : null;
    if (!executablePath || !fs.existsSync(executablePath)) { const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell'); executablePath = fs.readdirSync(base).map(v => path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell')).filter(p => fs.existsSync(p)).pop(); }
    waitReady = async (page) => { await page.waitForSelector('body[data-ready]'); await new Promise(r => setTimeout(r, 300)); };
    out = path.join(PROJ, 'outputs', 'carousels', deck, 'parts', `${String(slide).padStart(2, '0')}_${partFile(name)}${suffix}.png`);
    partName = name;
  } else throw new Error('group is thumbnails or carousels');

  if (JOB) console.log('@progress ' + JSON.stringify({ p: 0.2, stage: 'opening the design' }));
  const browser = await puppeteer.launch({ executablePath, headless: true, args: chromeArgs });
  try {
    const page = await browser.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.setViewport({ ...viewport, deviceScaleFactor: scale });
    await page.goto(url, { waitUntil: group === 'thumbnails' ? 'networkidle0' : 'load' });
    await waitReady(page);
    const area = await page.evaluate(prepare, { rootSel, name: partName, bg });
    if (area.error) throw new Error(area.error);
    if (JOB) console.log('@progress ' + JSON.stringify({ p: 0.7, stage: 'saving the part' }));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const { tag, ...clip } = area;
    await page.screenshot({ path: out, clip, omitBackground: bg === 'none', captureBeyondViewport: true });
    for (const e of errs) console.log('page error: ' + e);
    console.log(`${partName} -> ${path.relative(ROOT, out)} ${clip.width * scale}×${clip.height * scale}`);
    if (JOB) console.log('@file ' + path.relative(ROOT, out));
  } finally { await browser.close(); if (server) server.close(); }
}
main().then(() => process.exit(0), (e) => { console.error(e.message || e); process.exit(1); });

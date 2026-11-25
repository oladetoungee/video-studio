// Build a carousel from its content.json (cheapest-european-countries, 2026-11-03; mechanics from working-full-time's build.mjs, layouts new in
// the film's look A "Price Check": shelf grey, label yellow, ink, sticker red): writes <deck>/index.html, renders one PNG per slide + overview.png into outputs/carousels/<deck>/,
// and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   --html only rebuilds index.html; --slide N renders only slide N; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos data-img="<path>";
// a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves / scales / hides; ?view=slide&n=3 shows one slide, ?view=strip all in a row.
// "groundColor": "#RRGGBB" replaces a slide's ground colour ("ground" stays ink/paper/card/accent for the text colours).
// With STUDIO_JOB=1, checks are printed as "@warn <text>" and files as "@file <path>".
// Checks: text into the footer or margins, mono labels under 32 px, single-word last lines, screenshots/photos too close to text.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PROJECT = path.resolve(ROOT, '../..');
const require = createRequire(path.join(HERE, 'package.json'));
function chromePath() {
  const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell');
  for (const v of fs.readdirSync(base).sort().reverse()) {
    const p = path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
    if (fs.existsSync(p)) return p;
  }
  throw new Error('chrome-headless-shell not found');
}
const MONO_MIN = 32;
const JOB = !!process.env.STUDIO_JOB;

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/([A-Za-z’']+(?:-[A-Za-z’']+)+[.,:;!?”]*)/g, '<span class="nw">$1</span>')
  .replace(/\*([^*]+)\*/g, '<em class="acc" style="font-style:normal">$1</em>')
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

const disp = (s, size, extra = '', k = 'title') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const body = (s, k = 'body', extra = '') => (s ? `<p class="body bal"${K(k)} style="${extra}">${md(s)}</p>` : '');
const chip = (s) => (s.tag ? `<div class="chip"${M('tag')}><b${KP('tag')}>${esc(s.tag)}</b>${s.date ? `<span class="mono"${KP('date')}>${esc(s.date)}</span>` : ''}</div>` : '');
const shot = (s, extra = '') => (s.shot ? `<div class="shot"${M('screenshot')} style="${s.shot.w ? `width:${s.shot.w}px;` : ''}${extra}"><img data-img="shot.img" src="${A(s.shot.img)}"><div class="cr"${KP('shot.credit')}>${esc(s.shot.credit)}</div></div>` : '');

// plain drawn flags (no logos)
const H3 = c => `<svg viewBox="0 0 30 20" preserveAspectRatio="none">${c}</svg>`;
const tri = (a, b, c) => H3(`<rect width="30" height="6.67" fill="${a}"/><rect width="30" height="6.67" y="6.67" fill="${b}"/><rect width="30" height="6.67" y="13.33" fill="${c}"/>`);
const ver = (a, b, c) => H3(`<rect width="10" height="20" fill="${a}"/><rect width="10" height="20" x="10" fill="${b}"/><rect width="10" height="20" x="20" fill="${c}"/>`);
const FLAGS = {
  de: tri('#000', '#DD0000', '#FFCE00'), at: tri('#C8102E', '#fff', '#C8102E'), ee: tri('#0072CE', '#000', '#fff'),
  fr: ver('#0055A4', '#fff', '#EF4135'), it: ver('#009246', '#fff', '#CE2B37'), ng: ver('#008751', '#fff', '#008751'),
  pl: H3(`<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/>`),
  cz: H3(`<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><path d="M0 0 L15 10 L0 20 Z" fill="#11457E"/>`),
  fi: H3(`<rect width="30" height="20" fill="#fff"/><rect x="8.5" width="5" height="20" fill="#002F6C"/><rect y="7.5" width="30" height="5" fill="#002F6C"/>`),
  no: H3(`<rect width="30" height="20" fill="#BA0C2F"/><rect x="8" width="6" height="20" fill="#fff"/><rect y="7" width="30" height="6" fill="#fff"/><rect x="9.5" width="3" height="20" fill="#00205B"/><rect y="8.5" width="30" height="3" fill="#00205B"/>`),
};
const flag = (c) => (c ? `<span class="flag">${FLAGS[c] || ''}</span>` : '');
const ctry = (s) => `<div class="ctry">${(s.flags || []).map(flag).join('')}<div class="disp fit"${K('title')} data-max="${s.size || 150}" style="font-size:${s.size || 150}px">${md(s.title)}</div></div>`;
const labelEl = (l, i, k = 'labels') => `<div class="label${l.red ? ' red' : ''}"${M(`${k}.${i}`)}${l.w ? ` style="flex:0 0 ${l.w}px"` : ''}>
  <div class="k"${KP(`${k}.${i}.k`)}>${esc(l.k)}</div>
  ${l.was ? `<div class="was"${KP(`${k}.${i}.was`)}>${esc(l.was)}</div>` : ''}
  <div class="p" style="${l.ps ? `font-size:${l.ps}px` : ''}"><span${KP(`${k}.${i}.p`)}>${esc(l.p)}</span>${l.star ? '<sup>*</sup>' : ''}</div>
  ${l.s ? `<div class="s"${KP(`${k}.${i}.s`)}>${esc(l.s)}</div>` : ''}</div>`;
const shelf = (s, extra = '') => (s.labels ? `<div class="shelf"${M('shelf')} style="${extra}">${s.labels.map((l, i) => labelEl(l, i)).join('')}</div>` : '');
const stk = (s, extra = '') => (s.sticker ? `<div class="sticker"${M('sticker')} style="${extra}"><span${K("sticker")}>${md(s.sticker)}</span></div>` : '');
const credit = (s) => (s.src ? `<div class="mono lab"${KP('src')} style="color:var(--mid);margin-top:26px">${esc(s.src)}</div>` : '');

const L = {
  cover: s => `
    <div class="main">
      ${disp(s.title, s.size || 150)}
      ${body(s.sub, 'sub', `margin-top:34px;color:var(--fg);font-size:${s.subSize || 44}px`)}
      <div class="push">${shelf(s, 'margin-bottom:0')}</div>
      ${stk(s, 'margin-top:-6px;margin-left:30px;position:relative;z-index:3')}
    </div>`,

  country: s => `
    <div class="main">
      ${ctry(s)}
      ${body(s.body, 'body', 'margin-top:30px')}
      ${shelf(s, 'margin-top:70px')}
      ${s.shot ? `<div style="margin-top:60px">${shot(s, 'width:' + (s.shot.w || 920) + 'px;transform:rotate(' + (s.rot ?? -1) + 'deg)')}</div><div style="height:50px"></div>` : ''}
      ${s.work ? `<div class="body"${KP('work')} style="margin-top:30px;color:var(--fg);font-size:50px;font-weight:700;line-height:1.15">${esc(s.work)}</div>` : ''}
      <div class="push">${credit(s)}</div>
    </div>`,

  stack: s => `
    <div class="main">
      ${disp(s.title, s.size || 120)}
      ${body(s.body, 'body', 'margin-top:30px')}
      <div class="stack"${M('stack')}>${(s.labels || []).map((l, i) => labelEl(l, i)).join('')}</div>
      <div class="push">${credit(s)}</div>
    </div>`,

  two: s => `
    <div class="main">
      ${disp(s.title, s.size || 130)}
      ${body(s.body, 'body', 'margin-top:34px')}
      ${shelf(s, 'margin-top:80px')}
      ${body(s.body2, 'body2', 'margin-top:44px')}
    </div>`,

  rank: s => `
    <div class="main">
      ${disp(s.title, s.size || 120)}
      <div class="rank"${M('rank')}>${(s.rows || []).map((r, i) => `<div class="r${r.red ? ' red' : ''}"><span class="n">${i + 1}</span>${flag(r.f)}<span class="c"${KP(`rows.${i}.c`)}>${esc(r.c)}</span><span class="v"${KP(`rows.${i}.v`)}>${esc(r.v)}</span></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:40px;font-size:38px')}
      <div class="push">${credit(s)}</div>
    </div>`,

  words: s => `
    <div class="main">
      ${disp(s.title, s.size || 140)}
      ${body(s.body, 'body', 'margin-top:40px')}
      ${s.verdicts ? `<div class="verd"${M('verdicts')}>${s.verdicts.map((v, i) => `<div class="vr"><span class="vk"${KP(`verdicts.${i}.k`)}>${esc(v.k)}</span><span class="vv"${KP(`verdicts.${i}.v`)}>${esc(v.v)}</span></div>`).join('')}</div>` : ''}
      ${body(s.body2, 'body2', 'margin-top:40px')}
      ${s.photo ? `<div class="push obj"${M('photo')} style="align-self:${s.photoAlign || 'flex-end'}"><img data-img="photo" src="${A(s.photo)}" style="width:${s.photoW || 520}px;transform:rotate(${s.photoRot ?? 6}deg)"></div>` : ''}
    </div>`,

  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 130)}
      ${body(s.body, 'body', 'margin-top:34px')}
      <div class="push" style="width:520px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:18px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<img class="her"${M('polaroid')} data-img="polaroid.img" src="${A(s.polaroid.img)}" style="position:absolute;right:0;bottom:0;height:${s.herH || 560}px;z-index:0">` : ''}`,   /* 2026-11-07: her studio photo cut-out, no polaroid frame (TYPE-SYSTEM: no sticker borders) */
};

function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const vars = `--W:${C.width}px;--H:${C.height}px;`;
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => (/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '') ? ` style="--bg:${s.groundColor}"` : '');
  const slides = C.slides.map((s, i) => {
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    return `<section class="slide g-${s.ground} l-${s.layout}" id="s${i + 1}"${groundStyle(s)}>
  ${s.corner ? `<div class="corner"${KP('corner')}>${esc(s.corner)}</div>` : ''}
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span><span class="meter">${meter}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{${vars}}</style></head><body>
${slides}
<script>
function fitAll(){ document.querySelectorAll('.fit').forEach(el=>{ let s=+el.dataset.max; el.style.fontSize=s+'px';
  const box=el.parentElement.getBoundingClientRect().width; const lim=Math.min(el.clientWidth||box, box);
  while((el.scrollWidth>lim+1) && s>24){ s-=2; el.style.fontSize=s+'px'; } }); }
(function(){ var q=new URLSearchParams(location.search), v=q.get('view'); if(!v) return; document.documentElement.classList.add('v-'+v);
  if(v==='slide'){ var n=+q.get('n')||1; document.querySelectorAll('.slide').forEach(function(s,i){ if(i+1!==n) s.style.display='none'; }); } })();
window.__checks = ${checks.toString()};
document.fonts.ready.then(()=>{ fitAll(); document.body.dataset.ready=1; });
</script></body></html>`;
  const out = path.join(ROOT, deck, 'index.html');
  fs.writeFileSync(out, html);
  return { C, out, n };
}

// runs in the page: layout, label-size and widow checks
function checks(MONO_MIN) {
  const res = [];
  document.querySelectorAll('.slide').forEach((sl, i) => {
    if (getComputedStyle(sl).display === 'none') return;
    const R = sl.getBoundingClientRect(); const foot = sl.querySelector('.foot').getBoundingClientRect();
    const tag = el => `<${el.tagName.toLowerCase()} ${el.className}> "${(el.textContent || '').trim().slice(0, 30)}"`;
    sl.querySelectorAll('.main *').forEach(el => {
      if (el.closest('.pol') || el.closest('.shelf') || el.closest('.obj') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 50 || r.left < R.left + 50) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('.shelf, .obj, .rank').forEach(el => { if (el.getBoundingClientRect().bottom > foot.top - 16) res.push(`slide ${i + 1}: ${el.className} runs into the footer`); });
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!/Mono/.test(cs.fontFamily) || el.closest('.meter')) return;
      const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (own && parseFloat(cs.fontSize) < MONO_MIN - 0.5) res.push(`slide ${i + 1}: mono ${parseFloat(cs.fontSize)}px ${tag(el)}`);
    });
    sl.querySelectorAll('.pol, .shot').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .lab, .main .row, .main .handle').forEach(el => {
        if (el.closest('.pol') || el.closest('.shot')) return;
        const rg = document.createRange(); rg.selectNodeContents(el); const g = 24;
        if ([...rg.getClientRects()].some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
          res.push(`slide ${i + 1}: ${pe.className} within 24 px of ${tag(el)}`);
      });
    });
    sl.querySelectorAll('p, .body, .bal, .head, .v').forEach(el => {
      const words = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) { const t = tw.currentNode; const re = /\S+/g; let m;
        while ((m = re.exec(t.textContent))) { const rg = document.createRange(); rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length);
          const rr = rg.getClientRects()[0]; if (rr) words.push({ w: m[0], top: Math.round(rr.top) }); } }
      if (words.length < 3) return;
      const lines = []; words.forEach(w => { const l = lines.find(l => Math.abs(l.top - w.top) < 8); if (l) l.n++; else lines.push({ top: w.top, n: 1 }); });
      lines.sort((a, b) => a.top - b.top);
      if (lines.length > 1 && lines[lines.length - 1].n === 1) res.push(`slide ${i + 1}: one-word last line "${words[words.length - 1].w}" in ${tag(el)}`);
    });
  });
  return res.slice(0, 60);
}

async function render(deck) {
  const { C, out, n } = buildHTML(deck);
  if (process.argv.includes('--html')) { console.log('html', out); return; }
  const ai = process.argv.indexOf('--slide'); const only = ai > 0 ? +process.argv[ai + 1] : 0; const pdfOnly = process.argv.includes('--pdf');
  if (only && !(only >= 1 && only <= n)) throw new Error(`no slide ${only} (the deck has ${n})`);
  const puppeteer = require('puppeteer-core');
  const dest = path.join(PROJECT, 'outputs/carousels', deck);
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(dest)) if (/^\d\d\.png$/.test(f) && +f.slice(0, 2) > n) fs.renameSync(path.join(dest, f), path.join(process.env.HOME, '.Trash', `${deck}-old-${Date.now()}-${f}`));
  const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true, args: ['--allow-file-access-from-files', '--font-render-hinting=none'] });
  const page = await browser.newPage();
  await page.setViewport({ width: C.width + 200, height: C.height, deviceScaleFactor: 1 });
  await page.goto('file://' + out, { waitUntil: 'load' });
  await page.waitForSelector('body[data-ready]');
  await new Promise(r => setTimeout(r, 300));
  const issues = await page.evaluate(checks, MONO_MIN);
  console.log(issues.length ? `${deck} CHECKS\n  ` + issues.join('\n  ') : `${deck}: checks clean`);
  if (JOB) issues.forEach(x => console.log('@warn ' + x));
  if (!pdfOnly) for (let i = 1; i <= n; i++) {
    if (only && i !== only) continue;
    const el = await page.$('#s' + i);
    await el.screenshot({ path: path.join(dest, pad2(i) + '.png') });
    if (JOB) console.log('@file ' + path.join(dest, pad2(i) + '.png'));
  }
  if (deck === 'linkedin' && (pdfOnly || !only)) {
    await page.emulateMediaType('print');
    await page.pdf({ path: path.join(dest, 'carousel.pdf'), width: C.width + 'px', height: C.height + 'px', printBackground: true, preferCSSPageSize: true });
    if (JOB) console.log('@file ' + path.join(dest, 'carousel.pdf'));
  }
  await browser.close();
  if (pdfOnly) { console.log(`${deck}: carousel.pdf -> ${dest}`); return; }
  execFileSync('python3', [path.join(HERE, 'overview.py'), dest, String(n)], { stdio: 'inherit' });
  console.log(`${deck}: ${n} slides -> ${dest}`);
}

const decks = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && all[i - 1] !== '--slide');
for (const d of (decks.length ? decks : ['instagram', 'linkedin'])) await render(d);

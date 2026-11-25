// Build a carousel from its content.json (http-status-codes, 2026-11-03; render + checks copied from dark-patterns' build.mjs,
// layouts new in the film's look B "The First Digit"): writes <deck>/index.html, renders one PNG per slide + overview.png into
// outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   --html only rebuilds index.html; --slide N renders only slide N; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos data-img="<path>";
// a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves / scales / hides; ?view=slide&n=3 shows one slide, ?view=strip all in a row.
// "ground": stone | mint | sky | amber | tomato | ink | card (one flat colour per HTTP class); "groundColor": "#RRGGBB" overrides it.
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

const tag = (s) => (s.tag ? `<div class="mono lab"${KP('tag')} style="color:var(--mid)">${esc(s.tag)}</div>` : '');
const GC = { 1: '#D9D4C7', 2: '#8FE3B0', 3: '#8EC5FF', 4: '#FFA51F', 5: '#FF5A3C' };
// the odometer: first digit caught mid-roll from `from` to `to` (f = how far), the rest after it
const odo = (o, size) => `<div class="odo"${M('odometer')} style="font-size:${size}px"><span class="win" style="--f:${o.f ?? 0.32};--bl:${o.blur ?? 6}px"><span class="a">${esc(o.from)}</span><span class="b">${esc(o.to)}</span></span><span class="rest${o.dim ? ' xx' : ''}"${KP('odo.rest')}>${esc(o.rest || '')}</span></div>`;
const shot = (s, extra = '') => (s.shot ? `<div class="shot"${M('screenshot')} style="${s.shot.w ? `width:${s.shot.w}px;` : ''}${extra}"><div class="in"><img data-img="shot.img" src="${A(s.shot.img)}">${(s.shot.mark || []).map(m => `<div class="mk" style="left:${m[0]}%;top:${m[1]}%;width:${m[2]}%;height:${m[3]}%"></div>`).join('')}</div><div class="cr"${KP('shot.credit')}>${esc(s.shot.credit)}</div></div>` : '');
const L = {
  cover: s => `
    <div class="main">
      ${odo(s.odo, s.odoSize || 560)}
      ${disp(s.title, s.size || 104, 'margin-top:56px')}
      ${body(s.sub, 'sub', `margin-top:30px;font-size:${s.subSize || 42}px`)}
    </div>`,
  statement: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${tag(s)}
      ${disp(s.title, s.size || 100, s.tag ? 'margin-top:30px' : '')}
      ${s.resp ? `<div class="card resp"${M('response')} style="margin-top:64px;align-self:flex-start;font-size:${s.resp.fs || 64}px">${s.resp.parts.map((p, i) => `<span class="seg"><span${KP(`resp.parts.${i}.t`)}>${esc(p.t)}</span>${p.l ? `<span class="lb"${KP(`resp.parts.${i}.l`)}>${esc(p.l)}</span>` : ''}</span>`).join(' ')}</div>` : ''}
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  classes: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${disp(s.title, s.size || 92)}
      <div class="cls"${M('classes')} style="margin-top:50px">${s.rows.map((r, i) => `<div class="r"><div class="chipx" style="background:${GC[i + 1]}">${i + 1}<i>xx</i></div><div class="m"${K(`rows.${i}`)}>${md(r)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  split: s => `
    <div class="split">${s.halves.map((h, i) => `<div style="background:${GC[h.d]}"><div class="hi">${h.d}<i>xx</i></div><div class="t2"${K(`halves.${i}.t`)}>${md(h.t)}</div><div class="b2"${K(`halves.${i}.b`)}>${md(h.b)}</div></div>`).join('')}</div>`,
  calls: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${tag(s)}
      ${disp(s.title, s.size || 92, s.tag ? 'margin-top:30px' : '')}
      <div class="calls"${M('calls')} style="margin-top:48px">${s.calls.map((c, i) => `<div class="card c"><div class="code"${KP(`calls.${i}.code`)}>${esc(c.code)}</div><div class="req"${KP(`calls.${i}.req`)}>${esc(c.req)}</div><div class="nm"${K(`calls.${i}.nm`)}>${md(c.nm)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  grid: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${tag(s)}
      ${disp(s.title, s.size || 92, s.tag ? 'margin-top:30px' : '')}
      <div class="grid2"${M('grid')} style="margin-top:50px">
        <div></div><div class="h"${KP('cols.0')}>${esc(s.cols[0])}</div><div class="h"${KP('cols.1')}>${esc(s.cols[1])}</div>
        ${s.rowsG.map((r, i) => `<div class="rh"${KP(`rowsG.${i}.k`)}>${esc(r.k)}</div>${r.cells.map((c, j) => `<div class="cell${c.dk ? ' dk' : ''}"><b${KP(`rowsG.${i}.cells.${j}.v`)}>${esc(c.v)}</b><span${KP(`rowsG.${i}.cells.${j}.n`)}>${esc(c.n)}</span></div>`).join('')}`).join('')}
      </div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  duo: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${tag(s)}
      ${disp(s.title, s.size || 96, s.tag ? 'margin-top:30px' : '')}
      <div class="duo"${M('cards')} style="margin-top:52px">${s.cols.map((c, i) => `<div class="card${c.dk ? ' dk' : ''}"><div class="k"${KP(`cols.${i}.k`)}>${esc(c.k)}</div><div class="n"${KP(`cols.${i}.n`)}>${esc(c.n)}</div><div class="v"${K(`cols.${i}.v`)}>${md(c.v)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  receipt: s => `
    <div class="main${s.top ? '' : ' mid'}">
      ${tag(s)}
      ${disp(s.title, s.size || 96, s.tag ? 'margin-top:30px' : '')}
      ${shot(s, 'margin-top:60px')}
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  list: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 96, s.tag ? 'margin-top:30px' : '')}
      <div class="rows"${M('rows')} style="margin-top:48px">${s.rows.map((r, i) => `<div class="row"><div class="n">${pad2(i + 1)}</div><div class="head"${K(`rows.${i}`)}>${md(r)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
      ${s.handle ? `<div${M('push')} style="margin-top:${s.body ? '28px' : 'auto'}"><div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where || '')}</div><div style="margin-top:18px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div></div>` : ''}
    </div>`,
  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 100)}
      ${body(s.body, 'body', 'margin-top:34px')}
      <div class="push"${M('push')} style="width:520px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:22px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:${s.polX || 680}px;top:${s.polY || 640}px;width:320px"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:440px;object-position:50% 25%"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}`,
};

function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const lum = (hex) => { const v = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const accVars = (acc, onInk) => `--acc:${acc};--accInk:${onInk || acc};`;
  const vars = `--W:${C.width}px;--H:${C.height}px;` + accVars(C.accent, C.accentOnInk);
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? accVars(s.accent, s.accentOnInk) : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '255,255,255' : '17,17,17';
    return ` style="${own}--bg:${s.groundColor};--mid:rgba(${t},.66);--line:rgba(${t},.25)"`;
  };
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
      if (el.closest('.pol') || el.closest('.cal') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 50 || r.left < R.left + 50) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('.cal').forEach(el => { if (el.getBoundingClientRect().bottom > foot.top - 16) res.push(`slide ${i + 1}: calendar runs into the footer`); });
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

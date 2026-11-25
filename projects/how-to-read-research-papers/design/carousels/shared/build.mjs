// Build a carousel from its content.json (how-to-read-research-papers, 2026-11-03; mechanics copied from dark-patterns' build.mjs,
// layouts new in the film's look A "The Margin"): writes <deck>/index.html, renders one PNG per slide + overview.png into
// outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   --html only rebuilds index.html; --slide N renders only slide N; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos data-img="<path>";
// a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves / scales / hides; ?view=slide&n=3 shows one slide, ?view=strip all in a row.
// "groundColor": "#RRGGBB" replaces a slide's ground colour ("ground" stays ink/paper for the text colours).
// Markup in text: *word* = italic key word in the accent colour, ==word== = highlighter mark (paper slides), \n = line break.
// A real page crop ("shot"): {img, x, y, w, h (crop in the source image's pixels), width (shown width in px), hl: [[x,y,w,h], ...] in
// source pixels, credit}. Pages are only cropped and highlighted, never changed.
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
  .replace(/==([^=]+)==/g, '<span class="mk">$1</span>')
  .replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>')
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

const disp = (s, size, extra = '', k = 'title') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const body = (s, k = 'body', extra = '') => (s ? `<p class="body bal"${K(k)} style="${extra}">${md(s)}</p>` : '');
const tag = (s) => (s.tag ? `<div class="tag"${KP('tag')}>${esc(s.tag)}</div>` : '');
const lines = (n, cls = '', last = 's') => Array.from({ length: n }, (_, i) => `<div class="ln ${cls} ${i === n - 1 ? last : ''}"></div>`).join('');
// a real page crop
const shot = (s, extra = '') => {
  const h = s.shot; if (!h) return '';
  if (h.strips) {   // strips: single lines cut from the real page (true crops, never re-typed), stacked like clippings
    const st = h.strips.map((r, i) => { const [x, y, w, hh] = r.box; const k = r.scale || h.scale || 2;
      const hl = (r.hl === true ? [[x, x + w]] : (r.hl || [])).map(([a, b]) => `<div class="hl" style="left:${(a - x) * k - 4}px;top:${hh * k * 0.08}px;width:${(b - a) * k + 8}px;height:${hh * k * 0.84}px"></div>`).join('');
      return `<div class="shot strip" style="margin-left:${r.dx || 0}px;transform:rotate(${r.rot ?? [-1.2, .8, -.6, 1][i % 4]}deg)"><div class="clip" style="width:${Math.round(w * k)}px;height:${Math.round(hh * k)}px"><img data-img="shot.img" src="${A(h.img)}" style="left:${-x * k}px;top:${-y * k}px;width:${h.srcW * k}px">${hl}</div></div>`; }).join('');
    return `<div${M('screenshot')} style="${extra}"><div class="strips">${st}</div>${h.credit ? `<div class="cr"${KP('shot.credit')}>${esc(h.credit)}</div>` : ''}</div>`;
  }
  const k = h.width / h.w;
  const hl = (h.hl || []).map(([x, y, w, hh]) => `<div class="hl" style="left:${(x - h.x) * k - 4}px;top:${(y - h.y) * k}px;width:${w * k + 8}px;height:${hh * k}px"></div>`).join('');
  return `<div${M('screenshot')} style="${extra}"><div class="shot" style="width:${h.width}px;height:${Math.round(h.h * k)}px;transform:rotate(${h.rot || 0}deg)"><img data-img="shot.img" src="${A(h.img)}" style="left:${-h.x * k}px;top:${-h.y * k}px;width:${h.srcW * k}px">${hl}</div>${h.credit ? `<div class="cr"${KP('shot.credit')}>${esc(h.credit)}</div>` : ''}</div>`;
};
// a drawn paper with its parts (labels editable)
const paper = (s, st) => `<div class="paper"${M('paper')} style="${st}">
  ${s.paper.title ? `<div class="pt"${K('paper.title')}>${md(s.paper.title)}</div>` : ''}
  ${(s.paper.parts || []).map((p, i) => `<div class="h" style="position:relative"><span${K(`paper.parts.${i}.h`)}>${md(p.h)}</span>${p.mark ? `<span class="hand pmark"${K(`paper.parts.${i}.mark`)}>${md(p.mark)}</span>` : ''}</div>${lines(p.n || 2, p.hl ? 'hl' : '', p.hl ? 'm' : 's')}`).join('')}
  ${(s.paper.tabs || []).map((t, i) => `<div class="tab${i === (s.paper.tabOn ?? 0) ? ' on' : ''}" style="right:-96px;top:${40 + i * 112}px"${KP(`paper.tabs.${i}`)}>${esc(t)}</div>`).join('')}
</div>`;
const L = {
  cover: s => `
    <div class="main">
      ${disp(s.title, s.size || 150)}
      ${body(s.sub, 'sub', `margin-top:30px;color:var(--sub);font-size:${s.subSize || 44}px`)}
    </div>
    ${paper(s, 'left:170px;top:690px;width:640px;height:470px;transform:rotate(-3deg)')}
    ${s.note ? `<div${K('note')} class="hand scrap" style="position:absolute;left:600px;top:1120px;font-size:58px;transform:rotate(-4deg);white-space:nowrap">${md(s.note)}</div>` : ''}`,
  statement: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 104, s.tag ? 'margin-top:34px' : '')}
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  parts: s => `
    <div class="main">
      ${disp(s.title, s.size || 92)}
      ${body(s.body, 'body', 'margin-top:30px')}
    </div>
    ${paper(s, 'left:120px;top:720px;width:800px;height:480px;transform:rotate(-1.5deg)')}`,
  list: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 96, s.tag ? 'margin-top:30px' : '')}
      <div class="rows"${M('rows')} style="margin-top:44px">${s.rows.map((r, i) => `<div class="row"><div class="n">${pad2(i + 1)}</div><div><div class="head"${K(`rows.${i}.head`)}>${md(r.head)}</div>${r.sub ? `<div class="sub"${K(`rows.${i}.sub`)}>${md(r.sub)}</div>` : ''}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  receipt: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 96, (s.tag ? 'margin-top:30px;' : '') + (s.titleNowrap ? 'white-space:nowrap;' : ''))}
      ${shot(s, 'margin-top:44px')}
      ${s.margin ? `<div class="paper mnote"${M('margin')} style="position:relative;margin-top:48px;width:760px;transform:rotate(1.5deg)">${s.margin.map((m, i) => `<div class="mrow"><div class="mlines">${lines(3, i === 1 ? 'hl' : '', 'm')}</div><div class="hand"${K(`margin.${i}`)}>${md(m)}</div></div>`).join('')}</div>` : ''}
      ${s.people ? `<div${M('people')} style="display:flex;gap:16px;margin-top:56px">${Array.from({ length: s.people }, () => '<svg width="56" height="112" viewBox="0 0 48 96"><circle cx="24" cy="16" r="13" fill="currentColor"/><path d="M4,96 L4,50 Q4,34 24,34 Q44,34 44,50 L44,96 Z" fill="currentColor"/></svg>').join('')}</div>` : ''}
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  passes: s => `
    <div class="main">
      ${disp(s.title, s.size || 100)}
      <div class="passes"${M('passes')} style="margin-top:56px">${s.passes.map((p, i) => `<div style="margin-top:${i * 50}px"><div class="pp" style="transform:rotate(${[-2, 1, 2.5][i]}deg)"><div class="tn">${i + 1}</div>${Array.from({ length: 6 }, (_, k) => `<div class="ln ${k < (i + 1) * 2 ? 'hl' : ''} ${k % 3 === 2 ? 's' : ''}"></div>`).join('')}<div class="t"${KP(`passes.${i}.t`)}>${esc(p.t)}</div></div><div class="w"${K(`passes.${i}.w`)}>${md(p.w)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  stickies: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 100, s.tag ? 'margin-top:30px' : '')}
      <div class="stk-grid"${M('notes')} style="margin-top:56px">${s.notes.map((t, i) => `<div class="sticky" style="position:relative;transform:rotate(${[-2.5, 2, 1.5, -2][i % 4]}deg);font-size:${s.noteSize || 54}px"${K(`notes.${i}`)}>${md(t)}</div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  duo: s => `
    <div class="main">
      ${tag(s)}
      ${disp(s.title, s.size || 100, s.tag ? 'margin-top:30px' : '')}
      <div class="duo"${M('duo')} style="margin-top:60px">${s.cols.map((c, i) => `<div class="paper" style="position:relative;transform:rotate(${i ? 2 : -2}deg)"><div class="mono" style="color:rgba(23,23,26,.6)"${KP(`cols.${i}.k`)}>${esc(c.k)}</div><div class="duo-v"${K(`cols.${i}.v`)}>${md(c.v)}</div></div>`).join(`<div class="hand duo-q"${K('q')}>${md(s.q || '?')}</div>`)}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  chat: s => `
    <div class="main">
      ${disp(s.title, s.size || 100)}
      <div class="chat"${M('chat')} style="margin-top:56px">
        <div class="me"${K('ask')}>${md(s.ask)}</div>
        <div class="ai"${K('reply')}>${md(s.reply)}</div>
        <div class="hand scrap"${K('note')} style="font-size:60px;margin:18px 0 0 60px;transform:rotate(-3deg);align-self:flex-start">${md(s.note)}</div>
      </div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,
  punch: s => `
    <div class="main" style="justify-content:center">
      ${disp(s.title, s.size || 124)}
      ${body(s.body, 'body', 'margin-top:48px')}
    </div>`,
  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 104)}
      ${body(s.body, 'body', 'margin-top:34px')}
      <div class="push"${M('push')} style="width:520px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:22px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:640px;top:${s.polY || 640}px;width:380px;transform:rotate(4deg)"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:400px;object-position:50% 30%"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}`,
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
  ${s.corner ? `<div class="corner mono"${KP('corner')}>${esc(s.corner)}</div>` : ''}
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
      const bleed = el.closest('[data-move="screenshot"]');   // real pages may run off the right edge on purpose
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (!bleed && (r.right > R.right - 50 || r.left < R.left + 50)) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
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
    sl.querySelectorAll('p, .body, .bal, .head, .v, .sub, .w, .duo-v').forEach(el => {
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

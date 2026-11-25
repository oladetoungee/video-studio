// Build a carousel from its content.json (working-full-time, 2026-11-02; mechanics from october-attacks' build.mjs, layouts new in
// the film's look B "Clock in / Clock out": charcoal, manila, stamp red): writes <deck>/index.html, renders one PNG per slide + overview.png into outputs/carousels/<deck>/,
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

const stub = (s) => (s.stub ? `<div class="stub"${M('stub')}>${s.stub.map((r, i) => `<div class="r${r.red ? ' x' : ''}"><b${KP(`stub.${i}.k`)}>${esc(r.k)}</b><span${KP(`stub.${i}.v`)}>${esc(r.v)}</span></div>`).join('')}</div>` : '');
const numEl = (s) => (s.num ? `<div class="numst"${KP('num')}>${esc(s.num)}</div>` : '');
const nm = (s) => (s.num ? 'margin-top:30px;' : '');
const stampEl = (s) => (s.stamp ? `<div class="stamp${s.stampFill ? ' fill' : ''}"${M('stamp')}><span${KP('stamp')}>${esc(s.stamp)}</span></div>` : '');
function weekHTML(w) {
  const days = w.days || ['MON', 'TUE', 'WED'], W = w.w || 920, H = w.h || 520, from = w.from ?? 8, to = w.to ?? 22, top = 70, cw = W / days.length;
  const y = h => top + (h - from) / (to - from) * (H - top);
  let s = `<div class="wk"${M('calendar')} style="width:${W}px;height:${H}px">`;
  days.forEach((d, i) => { s += `<div class="dh" style="left:${i * cw}px;width:${cw}px">${d}</div>${i ? `<div class="col" style="left:${i * cw}px;top:${top}px;height:${H - top}px"></div>` : ''}`; });
  (w.blocks || []).forEach((b, i) => { s += `<div class="b ${b.k}" style="left:${b.d * cw + 8}px;width:${cw - 16}px;top:${y(b.s) + 4}px;height:${y(b.e) - y(b.s) - 8}px"><span${KP(`week.blocks.${i}.t`)}>${esc(b.t)}</span></div>`; });
  return s + '</div>';
}
function dialSVG(arcs, r = 190, th = 52, label = '') {
  const pad = 20, S = 2 * (r + pad), c = S / 2, ang = h => (h / 24) * 2 * Math.PI - Math.PI / 2;
  const P = (rr, a) => `${c + rr * Math.cos(a)} ${c + rr * Math.sin(a)}`;
  const arc = (a0, a1, fill) => { const L = a1 - a0 > Math.PI ? 1 : 0; return `<path d="M${P(r, a0)} A${r} ${r} 0 ${L} 1 ${P(r, a1)} L${P(r - th, a1)} A${r - th} ${r - th} 0 ${L} 0 ${P(r - th, a0)} Z" fill="${fill}"/>`; };
  let h = `<circle cx="${c}" cy="${c}" r="${r - th / 2}" fill="none" stroke="var(--line)" stroke-width="${th}"/>`;
  for (const a of arcs) h += arc(ang(a.from), ang(a.to), a.k === 'work' ? 'var(--a)' : a.k === 'class' ? 'url(#hatch)' : 'var(--fg)');
  if (label) h += `<text x="${c}" y="${c + 30}" text-anchor="middle" font-family="Bebas" font-size="96" fill="var(--fg)">${label}</text>`;
  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}"><defs><pattern id="hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="18" height="18" fill="#E7D7AE"/><rect width="8" height="18" fill="#1D1A15"/></pattern></defs>${h}</svg>`;
}

const L = {
  cover: s => `
    <div class="main">
      ${disp(s.title, s.size || 150)}
      ${body(s.sub, 'sub', `margin-top:34px;color:var(--fg);font-size:${s.subSize || 44}px`)}
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:${s.polX ?? 90}px;top:${s.polY || 760}px;width:400px;transform:rotate(-4deg)"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:400px;object-position:50% 25%"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}
    <div style="position:absolute;left:530px;top:${s.stubY || 860}px;transform:rotate(3deg)">${stub(s)}</div>`,

  tip: s => `
    <div class="main">
      ${s.num ? `<div class="numst"${KP('num')}>${esc(s.num)}</div>` : ''}
      ${disp(s.title, s.size || 104, s.num ? 'margin-top:30px' : '')}
      ${body(s.body, 'body', 'margin-top:30px')}
      ${shot(s, 'margin-top:auto;margin-bottom:64px;transform:rotate(' + (s.rot ?? -1.2) + 'deg)')}
      ${s.stub ? `<div style="margin-top:auto;margin-bottom:20px;align-self:flex-start;transform:rotate(-2deg)">${stub(s)}</div>` : ''}
    </div>`,

  week: s => `
    <div class="main">
      ${numEl(s)}
      ${disp(s.title, s.size || 104, nm(s))}
      ${body(s.body, 'body', 'margin-top:28px')}
      <div class="push" style="margin-bottom:10px">${weekHTML(s.week)}</div>
    </div>`,

  dials: s => `
    <div class="main">
      ${numEl(s)}
      ${disp(s.title, s.size || 110, nm(s))}
      <div class="dials"${M('dials')}><div>${dialSVG(s.arcsA || [], 150, 42)}<div class="mono lab"${KP('labA')}>${esc(s.labA)}</div></div><div class="eq">&rarr;</div><div>${dialSVG(s.arcsB || [], 210, 58, s.center || '')}<div class="mono lab"${KP('labB')}>${esc(s.labB)}</div></div></div>
      ${body(s.body, 'body', 'margin-top:auto;color:var(--fg)')}
    </div>`,

  stamps: s => `
    <div class="main">
      ${numEl(s)}
      ${disp(s.title, s.size || 110, nm(s))}
      <div class="stamps"${M('stamps')}>${(s.marks || []).map((m, i) => `<div class="stamp${m.fill ? ' fill' : ''}${m.strike ? ' strike' : ''}" style="transform:rotate(${m.rot || 0}deg);margin-left:${m.x || 0}px"><span${KP(`marks.${i}.t`)}>${esc(m.t)}</span></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto;color:var(--fg)')}
    </div>`,

  photo: s => `
    <div class="main">
      ${numEl(s)}
      ${disp(s.title, s.size || 110, nm(s))}
      ${body(s.body, 'body', 'margin-top:28px')}
      <div class="push obj"${M('photo')} style="margin-bottom:20px"><img data-img="photo" src="${A(s.photo)}" style="width:${s.photoW || 760}px"></div>
    </div>`,

  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 120)}
      ${body(s.body, 'body', 'margin-top:34px')}
      <div class="push" style="width:520px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:22px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:620px;top:${s.polY || 700}px;width:380px;transform:rotate(4deg)"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:380px;object-position:50% 25%"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}`,
};

function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const lum = (hex) => { const v = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const accVars = (acc, onInk) => { const dark = lum(acc) < 0.2;
    return `--acc:${acc};--accInk:${onInk || acc};--onAInk:${lum(onInk || acc) < 0.2 ? '#E7D7AE' : '#1D1A15'};--onAccent:${dark ? '#E7D7AE' : '#1D1A15'};` +
      (dark ? '--onAcc:#E7D7AE;--onAccMid:rgba(231,215,174,.74);--onAccLine:rgba(231,215,174,.3);--onAccAcc:#FF5A6E;'
            : `--onAcc:#1D1A15;--onAccMid:rgba(29,26,21,.7);--onAccLine:rgba(29,26,21,.3);--onAccAcc:#1D1A15;`); };
  const vars = `--W:${C.width}px;--H:${C.height}px;` + accVars(C.accent, C.accentOnInk);
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? accVars(s.accent, s.accentOnInk) : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '231,215,174' : '29,26,21';
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
      if (el.closest('.pol') || el.closest('.wk') || el.closest('.dials') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 50 || r.left < R.left + 50) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('.wk').forEach(el => { if (el.getBoundingClientRect().bottom > foot.top - 16) res.push(`slide ${i + 1}: calendar runs into the footer`); });
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

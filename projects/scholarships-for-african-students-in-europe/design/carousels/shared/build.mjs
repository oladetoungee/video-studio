// Build a carousel from its content.json (scholarships-for-african-students-in-europe, 2026-11-02; mechanics from
// october-attacks' build.mjs, layouts new in the film's look B "Now Boarding" + C's city photos): writes <deck>/index.html,
// renders one PNG per slide + overview.png into outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   --html only rebuilds index.html; --slide N renders only slide N; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos data-img="<path>";
// a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves / scales / hides; ?view=slide&n=3 shows one slide, ?view=strip all in a row.
// "groundColor": "#RRGGBB" replaces a slide's ground colour ("ground" stays ink/paper/card/accent for the text colours).
// Flap tiles: an element with class "flaps" turns each letter of its text into a tile on load (*word* = green tiles).
// With STUDIO_JOB=1, checks are printed as "@warn <text>" and files as "@file <path>".
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
  .replace(/_([^_]+)_/g, '<span class="serif">$1</span>')
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

const disp = (s, size, extra = '', k = 'title') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const body = (s, k = 'body', extra = '') => (s ? `<p class="body bal"${K(k)} style="${extra}">${md(s)}</p>` : '');
const flaps = (s, k, style = '') => (s ? `<div class="flaps"${K(k)} style="${style}">${md(s)}</div>` : '');
const chip = (s) => (s.tag ? `<div class="chip"${M('tag')}><b${KP('tag')}>${esc(s.tag)}</b>${s.date ? `<span class="mono"${KP('date')}>${esc(s.date)}</span>` : ''}</div>` : '');
const link = (s) => (s.link ? `<div class="link"${KP('link')}>${esc(s.link)}</div>` : '');
const shot = (s, extra = '') => (s.shot ? `<div class="shot"${M('screenshot')} style="${s.shot.w ? `width:${s.shot.w}px;` : ''}${extra}"><img data-img="shot.img" src="${A(s.shot.img)}">${(s.shot.hl || []).map(h => `<div class="hlm" style="left:${h[0]}%;top:${h[1]}%;width:${h[2]}%;height:${h[3]}%"></div>`).join('')}<div class="cr"${KP('shot.credit')}>${esc(s.shot.credit)}</div></div>` : '');
const city = (s) => (s.city ? `<div class="city"${M('photo')}><img data-img="city.img" src="${A(s.city.img)}" style="object-position:${s.city.pos || '50% 50%'}">${flaps(s.city.flap, 'city.flap', '--cw:60px;--ch:100px;--fs:74px;--gap:6px')}</div>` : '');

const L = {
  cover: s => `${city(s)}
    <div class="main${s.city ? ' low' : ''}">
      ${disp(s.title, s.size || 118)}
      <div class="board"${M('board')} style="margin-top:56px;display:flex;flex-direction:column;gap:12px">
        ${(s.rows || []).map((r, i) => flaps(r, `rows.${i}`, '--cw:46px;--ch:84px;--fs:60px;--gap:4px')).join('')}
      </div>
      ${body(s.sub, 'sub', `margin-top:auto;color:var(--fg);font-size:${s.subSize || 42}px`)}
    </div>`,

  ways: s => `
    <div class="main">
      ${disp(s.title, s.size || 104)}
      <div class="ways"${M('ways')} style="margin-top:46px">${s.ways.map((w, i) => `<div class="w"><div class="t"${K(`ways.${i}.t`)}>${md(w.t)}</div><div class="e"${KP(`ways.${i}.e`)}>${esc(w.e)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
    </div>`,

  passes: s => `
    <div class="main">
      ${disp(s.title, s.size || 110)}
      <div class="pass"${M('full')} style="margin-top:50px"><div class="top"${KP('full.top')}>${esc(s.full.top)}</div><div class="in"><div class="k"${KP('full.k')}>${esc(s.full.k)}</div><div${K('full.v')}>${md(s.full.v)}</div></div></div>
      <div class="pass"${M('partial')} style="margin-top:34px"><div class="top grey"${KP('part.top')}>${esc(s.part.top)}</div><div class="in"><div class="k"${KP('part.k')}>${esc(s.part.k)}</div><div${K('part.v')}>${md(s.part.v)}</div></div></div>
      ${body(s.body, 'body', 'margin-top:60px')}
    </div>`,

  story: s => `
    <div class="main">
      ${chip(s)}
      ${disp(s.title, s.size || 100, 'margin-top:34px')}
      ${body(s.body, 'body', 'margin-top:28px')}
      ${s.flaprows ? `<div${M('board')} style="margin-top:34px;display:flex;flex-direction:column;gap:10px">${s.flaprows.map((r, i) => flaps(r, `flaprows.${i}`, '--cw:40px;--ch:70px;--fs:50px;--gap:4px')).join('')}</div>` : ''}
      ${link(s)}
      ${shot(s, (s.shotTop ? 'margin-top:' + s.shotTop + 'px;' : 'margin-top:auto;margin-bottom:58px;') + 'transform:rotate(' + (s.rot ?? -1.2) + 'deg)')}
    </div>`,

  country: s => `${city(s)}
    <div class="main low">
      ${disp(s.title, s.size || 92)}
      ${body(s.body, 'body', 'margin-top:26px')}
      ${s.flaprows ? `<div${M('board')} style="margin-top:34px;display:flex;flex-direction:column;gap:10px">${s.flaprows.map((r, i) => flaps(r, `flaprows.${i}`, '--cw:40px;--ch:70px;--fs:50px;--gap:4px')).join('')}</div>` : ''}
      ${link(s)}
    </div>`,

  steps: s => `${city(s)}
    <div class="main low">
      ${disp(s.title, s.size || 86)}
      <div class="steps"${M('steps')} style="margin-top:34px">${s.steps.map((st, i) => `<div class="s"><div class="k"${KP(`steps.${i}.k`)}>${esc(st.k)}</div>${flaps(st.f, `steps.${i}.f`, '--cw:50px;--ch:86px;--fs:64px;--gap:5px')}</div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto')}
      ${link(s)}
    </div>`,

  duo: s => `
    <div class="main">
      ${disp(s.title, s.size || 100)}
      <div class="cols2"${M('cols')} style="margin-top:44px">${s.cols.map((c, i) => `<div><div class="k"${KP(`cols.${i}.k`)}>${esc(c.k)}</div><div class="v"${K(`cols.${i}.v`)}>${md(c.v)}</div><div class="b"${K(`cols.${i}.b`)}>${md(c.b)}</div></div>`).join('')}</div>
      ${link(s)}
    </div>`,

  list: s => `
    <div class="main">
      ${disp(s.title, s.size || 104)}
      <div class="rows"${M('rows')} style="margin-top:44px">${s.rows.map((r, i) => `<div class="row"><div class="n">${pad2(i + 1)}</div><div class="head"${K(`rows.${i}`)}>${md(r)}</div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto;color:var(--fg)')}
    </div>`,

  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 120)}
      ${body(s.body, 'body', 'margin-top:34px')}
      <div${M('push')} style="margin-top:56px;width:900px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:22px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:${1000 - (s.polW || 400)}px;top:${s.polY || 700}px;width:${s.polW || 400}px;transform:rotate(4deg)"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:${s.polW || 400}px;object-position:${s.polaroid.pos || '50% 30%'}"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}`,
};

function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const vars = `--W:${C.width}px;--H:${C.height}px;--acc:${C.accent || '#14955A'};--accInk:${C.accentOnInk || '#2FD27A'};`;
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? `--acc:${s.accent};--accInk:${s.accent};` : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '243,240,232' : '22,24,27';
    return ` style="${own}--bg:${s.groundColor};--mid:rgba(${t},.66);--line:rgba(${t},.25)"`;
  };
  const slides = C.slides.map((s, i) => {
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    return `<section class="slide g-${s.ground} l-${s.layout}" id="s${i + 1}"${groundStyle(s)}>
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span><span class="meter">${meter}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{${vars}}</style></head><body>
${slides}
<script>
function flapify(){ document.querySelectorAll('.flaps').forEach(el=>{ const cells=[]; const walk=(n,a)=>{ for(const c of n.childNodes){ if(c.nodeType===3) for(const ch of c.nodeValue.replace(/[\\t\\n\\r]+/g,' ')) cells.push([ch,a]); else if(c.nodeType===1) walk(c, a||c.classList.contains('acc')); } };
  walk(el,false); while(cells.length&&cells[0][0]===' ') cells.shift(); while(cells.length&&cells[cells.length-1][0]===' ') cells.pop();
  el.innerHTML=cells.map(([c,a])=>c===' '?'<i class="sp"> </i>':'<i'+(a?' class="go"':'')+'>'+c.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</i>').join(''); }); }
function fitAll(){ document.querySelectorAll('.fit').forEach(el=>{ let s=+el.dataset.max; el.style.fontSize=s+'px';
  const box=el.parentElement.getBoundingClientRect().width; const lim=Math.min(el.clientWidth||box, box);
  while((el.scrollWidth>lim+1) && s>24){ s-=2; el.style.fontSize=s+'px'; } }); }
(function(){ var q=new URLSearchParams(location.search), v=q.get('view'); if(!v) return; document.documentElement.classList.add('v-'+v);
  if(v==='slide'){ var n=+q.get('n')||1; document.querySelectorAll('.slide').forEach(function(s,i){ if(i+1!==n) s.style.display='none'; }); } })();
window.__checks = ${checks.toString()};
flapify();
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
      if (el.closest('.pol') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 50 || r.left < R.left + 50) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!/Mono/.test(cs.fontFamily) || el.closest('.meter')) return;
      const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (own && parseFloat(cs.fontSize) < MONO_MIN - 0.5) res.push(`slide ${i + 1}: mono ${parseFloat(cs.fontSize)}px ${tag(el)}`);
    });
    sl.querySelectorAll('.pol, .shot').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .lab, .main .row, .main .handle, .main .link').forEach(el => {
        if (el.closest('.pol') || el.closest('.shot')) return;
        const rg = document.createRange(); rg.selectNodeContents(el); const g = 24;
        if ([...rg.getClientRects()].some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
          res.push(`slide ${i + 1}: ${pe.className} within 24 px of ${tag(el)}`);
      });
    });
    sl.querySelectorAll('p, .body, .bal, .head, .v, .b, .in > div').forEach(el => {
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

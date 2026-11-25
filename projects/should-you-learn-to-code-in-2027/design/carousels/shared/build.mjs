// Build a carousel from its content.json (should-you-learn-to-code, 2026-11-03; mechanics copied from dark-patterns' build.mjs,
// layouts new in the film's look B "You are the reviewer"): writes <deck>/index.html, renders one PNG per slide + overview.png into
// outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   --html only rebuilds index.html; --slide N renders only slide N; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos data-img="<path>";
// a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves / scales / hides; ?view=slide&n=3 shows one slide, ?view=strip all in a row.
// "groundColor": "#RRGGBB" replaces a slide's ground colour ("ground" stays ink/paper/card/accent for the text colours).
// Markup in text: *word* = the amber box (you, the human); ~word~ = struck in red; \n = line break.
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
  .replace(/~([^~]+)~/g, '<s class="del">$1</s>')
  .replace(/\{([^}]+)\}/g, '<span class="lt">$1</span>')   // set 03: {words} = Helvetica Neue Light, the contrast part of a headline
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

const disp = (s, size, extra = '', k = 'title') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const body = (s, k = 'body', extra = '') => (s ? `<p class="body bal"${K(k)} style="${extra}">${md(s)}</p>` : '');
const chip = (s) => (s.tag ? `<div class="chip"${M('tag')}><b${KP('tag')}>${esc(s.tag)}</b></div>` : '');
const shot = (s, extra = '') => (s.shot ? `<div class="shot"${M('screenshot')} style="${s.shot.w ? `width:${s.shot.w}px;` : ''}${extra}"><img data-img="shot.img" src="${A(s.shot.img)}">${s.shot.quote ? `<div class="qt"${K('shot.quote')}>${md(s.shot.quote)}</div>` : ''}<div class="cr"${KP('shot.credit')}>${esc(s.shot.credit)}</div></div>` : '');

// the review sheet: lines [{t, k: add|del|ctx|hl}]
const SG = { add: '+', del: '−', ctx: '', hl: '' };
const sheet = (sh, name = 'sheet', key = 'sheet') => `<div class="sheet"${M(name)}><div class="bar"><span${KP(`${key}.file`)}>${esc(sh.file)}</span><span class="r"${KP(`${key}.by`)}>${esc(sh.by || '')}</span></div>
  <div class="lines">${sh.lines.map((l, i) => `<div class="ln ${l.k || 'ctx'}"><span class="sg">${SG[l.k || 'ctx']}</span><span class="tx"${KP(`${key}.lines.${i}.t`)}>${esc(l.t)}</span></div>`).join('')}</div>
  ${sh.status ? `<div class="status"><span class="ok"${KP(`${key}.status.0`)}>${esc(sh.status[0])}</span><span class="bad"${KP(`${key}.status.1`)}>${esc(sh.status[1])}</span></div>` : ''}</div>`;
const ui = {
  sheet: s => sheet(s.sheet),
  note: s => (s.note ? `<div class="note"${M('note')}><div class="who"${KP('note.who')}>${esc(s.note.who)}</div><div class="say"${K('note.say')}>${md(s.note.say)}</div></div>` : ''),
  webhook: s => `<div class="hook"${M('webhook')}>
    <div class="col"><div class="box ink"${KP('hook.from')}>${esc(s.hook.from)}</div></div>
    <div class="msgs">${s.hook.msgs.map((m, i) => `<div class="msg${i ? ' again' : ''}"><span class="mono t"${KP(`hook.times.${i}`)}>${esc(s.hook.times[i])}</span><span${KP(`hook.msgs.${i}`)}>${esc(m)}</span></div>`).join('')}</div>
    <div class="col"><div class="box"${KP('hook.to')}>${esc(s.hook.to)}</div><div class="orders">${s.hook.orders.map((o, i) => `<div class="ord${i ? ' dup' : ''}"${KP(`hook.orders.${i}`)}>${esc(o)}</div>`).join('')}${s.hook.dup ? `<div class="duptag"${KP('hook.dup')}>${esc(s.hook.dup)}</div>` : ''}</div></div></div>`,
  batches: s => `<div class="batches"${M('batches')}>${s.batches.map((b, i) => `<div class="bt${b.first ? ' first' : ''}"><div class="mono"${KP(`batches.${i}.k`)}>${esc(b.k)}</div><div class="exp"${KP(`batches.${i}.v`)}>${esc(b.v)}</div>${b.first ? `<div class="sf"${KP(`batches.${i}.flag`)}>${esc(b.flag)}</div>` : ''}</div>`).join('')}</div>`,
  bars: s => `<div class="bars"${M('bars')}>${s.bars.map((b, i) => `<div class="br${b.hi ? ' hi' : ''}"><div class="lb"${KP(`bars.${i}.k`)}>${esc(b.k)}</div><div class="track"><div class="fill" style="width:${Math.max(1.5, +b.v)}%"></div><span class="v"${KP(`bars.${i}.label`)}>${esc(b.label)}</span></div></div>`).join('')}</div>`,
  ba: s => `<div class="ba"${M('beforeafter')}>${s.ba.map((b, i) => `<div class="bx ${b.k || ''}"><div class="mono"${KP(`ba.${i}.label`)}>${esc(b.label)}</div><div class="say"${K(`ba.${i}.t`)}>${md(b.t)}</div></div>`).join('<div class="arr">↓</div>')}</div>`,
  photo: s => (s.photo ? `<div class="pic"${M('photo')}><img data-img="photo.img" src="${A(s.photo.img)}"><div class="cr"${KP('photo.credit')}>${esc(s.photo.credit)}</div></div>` : ''),
};
const L = {
  cover: s => `
    <div class="main">
      ${disp(s.title, s.size || 124)}
      ${body(s.sub, 'sub', `margin-top:30px;color:var(--fg);font-size:${s.subSize || 44}px`)}
      ${shot(s, 'margin-top:auto;margin-bottom:70px;transform:rotate(-2deg)')}
    </div>`,
  number: s => `
    <div class="main">
      ${chip(s)}
      <div class="big"${KP('big')} style="${s.tag ? 'margin-top:40px' : ''}">${esc(s.big)}</div>
      ${disp(s.title, s.size || 64, 'margin-top:30px')}
      ${shot(s, 'margin-top:auto;margin-bottom:70px;transform:rotate(-1.5deg)')}
    </div>`,
  statement: s => `
    <div class="main">
      ${chip(s)}
      ${disp(s.title, s.size || 104, s.tag ? 'margin-top:40px' : '')}
      ${s.sheet ? `<div style="margin-top:56px">${ui.sheet(s)}</div>` : ''}
      ${body(s.body, 'body', 'margin-top:56px;color:var(--sub)')}
      ${shot(s, `margin-top:${s.shotTop || 'auto'};margin-bottom:70px;transform:rotate(-1deg)`)}
    </div>`,
  skill: s => `
    <div class="main">
      ${chip(s)}
      ${disp(s.title, s.size || 92, 'margin-top:36px')}
      <div style="margin-top:50px;position:relative">${s.ui ? ui[s.ui](s) : ''}${ui.note(s)}</div>
      ${body(s.body, 'body', 'margin-top:56px;color:var(--sub)')}
      ${s.credit ? `<div class="mono src"${KP('credit')}>${esc(s.credit)}</div>` : ''}
      ${s.photo ? `<div style="margin-top:34px">${ui.photo(s)}</div>` : ''}
      ${shot(s, 'margin-top:auto;margin-bottom:70px;transform:rotate(-1deg)')}
    </div>`,
  list: s => `
    <div class="main">
      ${chip(s)}
      ${disp(s.title, s.size || 96, s.tag ? 'margin-top:36px' : '')}
      <div class="rows"${M('rows')} style="margin-top:48px">${s.rows.map((r, i) => typeof r === 'string' ? `<div class="row"><div class="n">${pad2(i + 1)}</div><div class="head"${K(`rows.${i}`)}>${md(r)}</div></div>` : `<div class="row"><div class="n">${pad2(i + 1)}</div><div><div class="head"${K(`rows.${i}.t`)}>${md(r.t)}</div><div class="rd"${K(`rows.${i}.d`)}>${md(r.d)}</div></div></div>`).join('')}</div>
      ${body(s.body, 'body', 'margin-top:auto;color:var(--sub)')}
    </div>`,
  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 100)}
      ${body(s.body, 'body', 'margin-top:34px;color:var(--sub)')}
      <div class="push"${M('push')} style="width:520px">
        <div class="mono lab"${KP('where')} style="color:var(--mid)">${esc(s.where)}</div>
        <div style="margin-top:22px"><span class="handle"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? `<div class="pol"${M('polaroid')} style="left:630px;top:${s.polY || 700}px;width:370px;transform:rotate(4deg)"><img data-img="polaroid.img" src="${A(s.polaroid.img)}" style="height:400px;object-position:50% 30%"><div class="cap"${KP('polaroid.caption')}>${esc(s.polaroid.caption)}</div></div>` : ''}`,
};

function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const accVars = (acc) => `--acc:${acc};`;
  const vars = `--W:${C.width}px;--H:${C.height}px;` + accVars(C.accent);
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? accVars(s.accent) : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '255,255,255' : '27,31,36';
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
    sl.querySelectorAll('.pol, .shot, .pic').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .lab, .main .row, .main .handle').forEach(el => {
        if (el.closest('.pol') || el.closest('.shot') || el.closest('.pic')) return;
        const rg = document.createRange(); rg.selectNodeContents(el); const g = 24;
        if ([...rg.getClientRects()].some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
          res.push(`slide ${i + 1}: ${pe.className} within 24 px of ${tag(el)}`);
      });
    });
    sl.querySelectorAll('p, .body, .bal, .head, .disp').forEach(el => {
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

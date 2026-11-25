// Build a carousel from its content.json (claude-rule, 2026-10-13; engine copied from ghana-marrify, layouts rewritten for the
// film's "Thread" look: lilac ground, the conversation is the stage). Writes <deck>/index.html, renders one PNG per slide +
// overview.png into outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both)
//   add --html to only rebuild index.html; --slide N renders only slide N's PNG; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>", photos
// data-img="<path>"; a slide's "nudge": {"<name>": {dx, dy, s, hide}}; "groundColor": "#RRGGBB" replaces the ground colour
// ("ground" stays lilac | ink | paper to set the text colours). index.html?view=slide&n=3 / ?view=strip for the editor.
// With STUDIO_JOB=1, checks are also printed as "@warn <text>" and files as "@file <path>".
// Checks after each render: text into the footer or margins, mono labels under 32 px, photos within 24 px of text, one-word
// last lines.
// Honesty rules (BRIEF.md): every chat window is generic (no logo, the word "Claude" in plain type); the
// model never says anything (only system lines); her lines are hers (checked against the transcript); real Anthropic pages
// are screenshots with a source line; Suleyman's words carry his name and date.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PROJECT = path.resolve(ROOT, '../..');
const require = createRequire(path.join(HERE, 'package.json'));
const CHROME = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell/mac_arm-148.0.7778.97/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const MONO_MIN = 32;
const JOB = !!process.env.STUDIO_JOB;

/* ---------- text markup: *accent*  _serif italic_  ==highlight==  \n line break ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/([A-Za-z’']+(?:-[A-Za-z’']+)+[.,:;!?”]*)/g, '<span class="nw">$1</span>')
  .replace(/==([^=]+)==/g, '<mark class="hl">$1</mark>')
  .replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>')
  .replace(/_([^_]+)_/g, '<span class="serif">$1</span>')
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

/* ---------- pieces ---------- */
const disp = (s, size, extra = '', k = 'title') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const mono = (s, extra = '', k = '') => `<div class="mono lab"${K(k)} style="${extra}">${md(s)}</div>`;
const kick = (s, k = 'kicker') => (s ? `<div class="mono lab kick"${KP(k)}>${esc(s)}</div>` : '');
const sys = (s, k, extra = '') => `<div class="sys mono"${KP(k)} style="${extra}">${esc(s)}</div>`;
// a photo of her (warm-graded video frame, never flipped) in a white card with a mono caption
function pol(p, { x, y, w, h, rot = 0, pos = '50% 35%' }, base = 'photo') {
  return `<div class="pol"${M(base)} style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg)">
    <img data-img="${base}.img" src="${A(p.img)}" style="height:${h}px;object-position:${pos}"><div class="cap"${KP(base + '.caption')}>${esc(p.caption || '')}</div></div>`;
}
// chat messages: who = her (ink bubble, her words) | user (a generic user message) | rude (blurred red caps) |
// sys (a system line) | end (the "conversation has ended" bar) | whatif (her imagined reply, labelled as such)
function msgs(list, at = 'chat') {
  return list.map((m, i) => {
    const k = `${at}.${i}.text`;
    if (m.who === 'sys') return `<div class="m-sys mono"${KP(k)}>${esc(m.text)}</div>`;
    if (m.who === 'more') return `<div class="m-more mono"${KP(k)}>${esc(m.text)}</div>`;
    if (m.who === 'end') return `<div class="m-end"${KP(k)}>${esc(m.text)}</div>`;
    if (m.who === 'rude') return `<div class="bub rude"><span${KP(k)}>${esc(m.text)}</span></div>`;
    if (m.who === 'whatif') return `<div class="bub whatif">${m.label ? `<div class="mono wl"${KP(`${at}.${i}.label`)}>${esc(m.label)}</div>` : ''}<div${K(k)}>${md(m.text)}</div></div>`;
    return `<div class="bub ${m.who === 'user' ? 'user' : 'her'}"${K(k)}>${md(m.text)}</div>`;
  }).join('');
}
function chatWin(s, at = 'chat') {
  return `<div class="win"${M('chat')}>
      <div class="w-hd"><span class="w-nm"${KP('chatName')}>${esc(s.chatName || 'Claude')}</span></div>
      <div class="w-bd">${msgs(s[at], at)}</div>
      ${s.input ? `<div class="w-in mono"${KP('input')}>${esc(s.input)}</div>` : ''}
    </div>`;
}
// a real screenshot of a public page, with lilac highlight boxes (% of the image) and a source line
function shot(sh, base = 'shot') {
  return `<div class="shot"${M(base)}><div class="sh-img"><div class="sh-w"><img data-img="${base}.img" src="${A(sh.img)}">${(sh.marks || []).map(m => `<i class="mark" style="left:${m[0]}%;top:${m[1]}%;width:${m[2]}%;height:${m[3]}%"></i>`).join('')}</div></div>
      <div class="sh-src mono"${KP(base + '.src')}>${esc(sh.src)}</div></div>`;
}

/* ---------- layouts ---------- */
const L = {
  // slide 1: a system line, a big plain statement, her bubble with the sub, her photo
  hook: s => `
    <div class="main">
      ${s.sys ? sys(s.sys, 'sys', 'margin-bottom:44px') : ''}
      ${kick(s.kicker)}
      ${disp(s.title, s.size || 132)}
      ${s.note ? mono(s.note, 'color:var(--mid);margin-top:30px', 'note') : ''}
      <div class="push" style="width:${s.subW || 600}px">
        <p class="lede"${K('sub')} style="font-size:${s.subSize || 44}px">${md(s.sub)}</p>
        ${s.swipe ? `<div class="mono lab" style="margin-top:30px;color:var(--mid)"><span${K('swipe')}>${md(s.swipe)}</span> →</div>` : ''}
      </div>
    </div>
    ${s.photo ? pol(s.photo, { x: 708, y: 790, w: 300, h: 330, rot: 3 }) : ''}`,

  // a real page: title, the screenshot with the phrase highlighted, a takeaway
  source: s => `
    <div class="main">
      ${s.sys ? sys(s.sys, 'sys', 'margin-bottom:34px') : ''}
      ${disp(s.title, s.size || 96)}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:22px;font-size:${s.ledeSize || 44}px;color:var(--fg)">${md(s.lede)}</p>` : ''}
      <div class="${s.bleed ? 'bleed' : ''}" style="margin:${s.gap ?? 48}px ${s.bleed ? -s.bleed : 0}px 0">${shot(s.shot)}</div>
      ${s.takeaway ? `<p class="${s.takeTop ? '' : 'push '}take"${K('takeaway')} style="font-size:${s.takeSize || 44}px;${s.takeTop ? `margin-top:${s.takeTop}px` : ''}">${md(s.takeaway)}</p>` : ''}
      ${s.note ? `<p class="${s.noteTop ? '' : 'push '}take"${K('note')} style="font-size:${s.noteSize || 38}px;${s.noteTop ? `margin-top:${s.noteTop}px` : ''}">${md(s.note)}</p>` : ''}
      ${s.noteBy ? mono(s.noteBy, 'color:var(--mid);margin-top:20px', 'noteBy') : ''}
    </div>`,

  // a drawn chat (ILLUSTRATION) between a title and a takeaway
  chat: s => `
    <div class="main">
      ${disp(s.title, s.size || 96)}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:22px">${md(s.lede)}</p>` : ''}
      <div style="margin-top:${s.gap ?? 44}px">${chatWin(s)}</div>
      ${s.her ? `<div class="bub her" style="margin-top:34px;font-size:${s.herSize || 42}px"${K('her')}>${md(s.her)}</div>${s.by ? mono(s.by, 'color:var(--mid);margin-top:18px;text-align:right', 'by') : ''}` : ''}
      ${s.takeaway ? `<p class="push take"${K('takeaway')} style="font-size:${s.takeSize || 42}px">${md(s.takeaway)}</p>` : ''}
    </div>`,

  // two sides of a line: what the rule does not cover / what it does
  line: s => `
    <div class="main">
      ${disp(s.title, s.size || 96)}
      ${s.tag ? mono(s.tag, 'color:var(--mid);margin-top:-46px;text-align:right', 'tag') : ''}
      <div class="ln"${M('sides')} style="margin-top:${s.gap ?? 50}px">
        ${s.sides.map((d, i) => `
        <div class="ln-s${d.cruel ? ' cr' : ''}">
          <div class="ln-k mono"${KP(`sides.${i}.k`)}>${esc(d.k)}</div>
          <div class="ln-m">${d.rude ? `<div class="bub rude"><span${KP(`sides.${i}.msg`)}>${esc(d.msg)}</span></div>` : `<div class="bub user"${K(`sides.${i}.msg`)}>${md(d.msg)}</div>`}</div>
          ${d.msg2 ? `<div class="ln-m"><div class="bub rude"><span${KP(`sides.${i}.msg2`)}>${esc(d.msg2)}</span></div></div>` : ''}
          ${d.tag ? `<div class="mono ln-tag"${KP(`sides.${i}.tag`)}>${esc(d.tag)}</div>` : ''}
          <p class="ln-t"${K(`sides.${i}.t`)}>${md(d.t)}</p>
        </div>${i === 0 ? '<div class="ln-bar"></div>' : ''}`).join('')}
      </div>
      <div class="push" style="display:flex;justify-content:space-between;align-items:flex-end;gap:30px">
        ${s.takeaway ? `<p class="take"${K('takeaway')} style="font-size:${s.takeSize || 38}px;flex:1">${md(s.takeaway)}</p>` : ''}
        ${s.src ? `<div class="mono lab"${KP('src')} style="color:var(--mid)">${esc(s.src)}</div>` : ''}
      </div>
    </div>`,

  // the breakout: one giant word with the white highlighter, then her own words as bubbles
  breakout: s => `
    <div class="main">
      ${kick(s.kicker)}
      ${s.lead ? `<div class="bub her"${K('lead')} style="align-self:flex-end;font-size:${s.leadSize || 44}px">${md(s.lead)}</div>` : ''}
      <div class="bw fit"${K('word')} data-max="${s.wordSize || 300}" style="font-size:${s.wordSize || 300}px;margin-top:${s.wordTop ?? 30}px"><span>${md(s.word)}</span></div>
      <div class="${s.linesTop ? '' : 'push'}" style="${s.linesTop ? `margin-top:${s.linesTop}px` : ''}">
        ${(s.lines || []).map((l, i) => `<div class="bub her" style="margin-top:${i ? 18 : 0}px"${K(`lines.${i}`)}>${md(l)}</div>`).join('')}
        ${s.by ? mono(s.by, 'color:var(--mid);margin-top:24px;text-align:right', 'by') : ''}
      </div>
    </div>`,

  // someone else's words (a quote card with name and source) + her line
  quote: s => `
    <div class="main">
      ${disp(s.title, s.size || 90)}
      ${s.bridge ? `<p class="body"${K('bridge')} style="margin-top:40px;font-size:${s.bridgeSize || 42}px;color:var(--fg)">${md(s.bridge)}</p>` : ''}
      <div class="qc${s.bare ? ' bare' : ''}"${M('quote')} style="margin-top:${s.gap ?? 50}px">
        <p class="qt"${K('quote')}>${md(s.quote)}</p>
        <div class="mono qb"${KP('who')}>${esc(s.who)}</div>
      </div>
      <div class="${s.herTop ? '' : 'push'}" style="${s.herTop ? `margin-top:${s.herTop}px` : ''}">
        ${s.her ? `<div class="bub her"${K('her')} style="font-size:${s.herSize || 42}px">${md(s.her)}</div>` : ''}
        ${s.by ? mono(s.by, 'color:var(--mid);margin-top:22px;text-align:right', 'by') : ''}
      </div>
    </div>`,

  // the punchline on its own (ink or lilac), optional small note
  punch: s => `
    <div class="main">
      ${kick(s.kicker)}
      ${disp(s.title, s.size || 150)}
      <div class="push" style="width:${s.bodyW || 880}px">
        ${s.body ? `<p class="body"${K('body')} style="font-size:${s.bodySize || 42}px;color:var(--fg)">${md(s.body)}</p>` : ''}
        ${s.by ? mono(s.by, 'color:var(--mid);margin-top:22px', 'by') : ''}
      </div>
    </div>`,

  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 140)}
      ${s.ask ? `<p class="lede"${K('ask')} style="margin-top:44px;width:${s.askW || 640}px;font-size:${s.askSize || 44}px">${md(s.ask)}</p>` : ''}
      <div class="push"${M('push')} style="width:${s.pushW || 560}px">
        ${mono(s.where, 'color:var(--mid)', 'where')}
        <div class="bal"${KP('video')} style="font-weight:800;font-size:${s.videoSize || 46}px;line-height:1.08;letter-spacing:-0.03em;margin-top:16px">${esc(s.video)}</div>
        <div class="handle"${KP('handle')}>${esc(s.handle)}</div>
      </div>
    </div>
    ${s.photo ? pol(s.photo, { x: 694, y: 760, w: 300, h: 330, rot: 3 }) : ''}`,
};

/* ---------- page ---------- */
function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => /^#[0-9a-fA-F]{6}$/.test(s.groundColor || '') ? ` style="--bg:${s.groundColor}"` : '';
  const slides = C.slides.map((s, i) => {
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    return `<section class="slide g-${s.ground || 'lilac'} l-${s.layout}" id="s${i + 1}"${groundStyle(s)}>
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{--W:${C.width}px;--H:${C.height}px}</style></head><body>
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

// runs in the page: layout, label-size, photo-distance and widow checks
function checks(MONO_MIN) {
  const res = [];
  document.querySelectorAll('.slide').forEach((sl, i) => {
    const R = sl.getBoundingClientRect(); const foot = sl.querySelector('.foot').getBoundingClientRect();
    const tag = el => `<${el.tagName.toLowerCase()} ${el.className}> "${(el.textContent || '').trim().slice(0, 30)}"`;
    sl.querySelectorAll('.main *').forEach(el => {
      if (el.closest('.pol') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (el.closest('.bleed') && !(r.bottom > foot.top - 24)) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 60 || r.left < R.left + 60) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!/Plex Mono|DM Mono/.test(cs.fontFamily) || el.closest('.meter')) return;
      const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (own && parseFloat(cs.fontSize) < MONO_MIN - 0.5) res.push(`slide ${i + 1}: mono ${parseFloat(cs.fontSize)}px ${tag(el)}`);
    });
    sl.querySelectorAll('.pol').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .bal, .main .lab, .main .bub, .main .sys, .main .handle').forEach(el => {
        if (el.closest('.pol')) return;
        const rg = document.createRange(); rg.selectNodeContents(el); const rs = [...rg.getClientRects()]; const g = 24;
        if (rs.some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
          res.push(`slide ${i + 1}: photo within 24 px of ${tag(el)}`);
      });
    });
    sl.querySelectorAll('p, .body, .take, .bal, .bub > div, .bub.her, .bub.user, .qt, .ln-t').forEach(el => {
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
  return [...new Set(res)].slice(0, 60);
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
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files', '--font-render-hinting=none'] });
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

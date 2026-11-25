// Build a carousel from its content.json (ux-research, 2026-10-13; copied from ghana-marrify, research-wall layouts added: notes, cards, phone, quote): writes <deck>/index.html (open it in a browser to preview),
// renders one PNG per slide + overview.png into outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both: node shared/build.mjs instagram linkedin)
//   add --html to only rebuild index.html; --slide N renders only slide N's PNG; --pdf only the LinkedIn PDF
// Studio design editor support (none of it changes a render): text carries data-k="<path in the slide>", movable
// blocks data-move="<name>", data-affix="pre|post" = fixed characters around the editable text, polaroid photos data-img="<path>"; a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves,
// scales or hides that element; index.html?view=slide&n=3 shows one slide, ?view=strip all slides in a row.
// A slide's optional "groundColor": "#RRGGBB" (studio colour picker) replaces its ground colour; "ground" stays ink or paper
// to set the text colours. Optional "accent" (+ "accentOnInk") on a slide gives that slide its own accent colour. A polaroid "img" can also be a path to the project's uploads (../../../assets/uploads/…).
// With STUDIO_JOB=1 in the environment, checks are also printed as "@warn <text>" and files as "@file <path>".
// Checks printed after each render: text running into the footer or margins, mono labels under 32 px
// (≈ 11.5 px on a 390 px phone), and paragraphs whose last line is a single word.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));            // design/carousels/shared
const ROOT = path.resolve(HERE, '..');                                // design/carousels
const PROJECT = path.resolve(ROOT, '../..');                          // projects/<slug>
const require = createRequire(path.join(HERE, 'package.json'));
const CHROME = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell/mac_arm-148.0.7778.97/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const MONO_MIN = 32;
const JOB = !!process.env.STUDIO_JOB;

/* ---------- text markup: *accent*  _serif italic_  \n line break; hyphenated words never split ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/([A-Za-z’']+(?:-[A-Za-z’']+)+[.,:;!?”]*)/g, '<span class="nw">$1</span>')
  .replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>')
  .replace(/_([^_]+)_/g, '<span class="serif">$1</span>')
  .replace(/~([^~]+)~/g, '<span class="strike">$1</span>')          // ux-research: struck through in marker
  .replace(/\{([^{}]+)\}/g, '<span class="ring">$1</span>')       // ux-research: circled in marker
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');            // editable text: its path inside the slide
const KP = p => (p ? ` data-k="${p}" data-plain` : ''); // editable plain text (no *accent* / _serif_ markup)
const M = p => (p ? ` data-move="${p}"` : '');         // movable block
const PK = base => ({ move: base, img: base + '.img', cap: base + '.caption' });

/* ---------- pieces ---------- */
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);   // a bare name is in shared/assets; a path is relative to the deck
function pol(p, { x, y, w, h, rot = 0, z = 1, pos = '50% 40%' }, k = {}) {
  return `<div class="pol"${M(k.move)} style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);z-index:${z}">
    <img${k.img ? ` data-img="${k.img}"` : ''} src="${A(p.img)}" style="height:${h}px;object-position:${pos}">${p.caption ? `<div class="cap"${KP(k.cap)}>${esc(p.caption)}</div>` : `<div class="cap"${KP(k.cap)}></div>`}</div>`;
}
const disp = (s, size, extra = '', k = '') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const mono = (s, extra = '', k = '') => `<div class="mono lab"${K(k)} style="${extra}">${md(s)}</div>`;
const rowsHTML = (rows, o = {}, at = 'rows') => `<div class="rows"${M(at)} style="--numW:${o.numW || 120}px">${rows.map((r, i) => `
  <div class="row${r.accent ? ' hi' : ''}" style="padding:${o.pad || '26px 0 24px'}"><div class="n"${KP(`${at}.${i}.n`)}>${esc(r.n)}</div>
    <div><div class="head fit"${K(`${at}.${i}.head`)} data-max="${o.head || 60}" style="font-size:${o.head || 60}px;white-space:nowrap">${md(r.head)}</div>${r.sub ? `<div class="sub"${K(`${at}.${i}.sub`)} style="font-size:${o.sub || 36}px">${md(r.sub)}</div>` : ''}</div></div>`).join('')}</div>`;
function meterBar(n, on, accent) {
  return `<div class="mbar${accent ? ' hi' : ''}">${Array.from({ length: n }, (_, k) => `<i class="${k < on ? 'on' : ''}"></i>`).join('')}</div>`;
}

/* ---------- layouts ---------- */
// ghana-marrify: one generic "visual" layout (title + optional lede + a flat diagram/mockup + takeaway), plus hook, punch,
// list, checklist, compare, cover, end. Visuals: sources, versus, distance, minimal, levels, log. Any mockup is generic and
// is generic (never Marrify's real interface).
const tagLab = (s, k = 'tag') => (s ? `<span class="mono mk-tag"${KP(k)}>${esc(s)}</span>` : '');
const V = {
  // four record sources -> one search box
  sources: s => `
      <div class="src"${M('diagram')}>
        ${s.srcLabel ? mono(s.srcLabel, 'color:var(--sub);margin-bottom:16px', 'srcLabel') : ''}
        <div class="src-list">${s.sources.map((x, i) => `<div class="src-row"><div class="src-chip mono"${KP(`sources.${i}`)}>${esc(x)}</div><i class="src-h"></i></div>`).join('')}</div>
        <div class="src-down"></div>
        <div class="src-bar"><span class="mono"${KP('search')} style="color:var(--mid)">${esc(s.search)}</span><i class="caret"></i><b class="mono"${KP('button')}>${esc(s.button)}</b></div>
        ${s.tag ? `<div class="mk-foot" style="margin-top:12px">${tagLab(s.tag)}</div>` : ''}
      </div>
      <style>
        .src-list { position: relative; }
        .src-list::after { content: ''; position: absolute; right: 120px; width: 4px; top: 38px; bottom: 0; background: var(--fg); }
        .src-row { display: flex; align-items: center; margin-bottom: 14px; }
        .src-row:last-child { margin-bottom: 0; }
        .src-chip { width: 560px; border: 3px solid var(--fg); padding: 18px 24px; font-size: 34px; letter-spacing: .04em; line-height: 1.1; background: var(--chip); }
        .src-h { flex: 1; height: 4px; background: var(--fg); margin-right: 120px; }
        .src-down { position: relative; height: 70px; }
        .src-down::after { content: ''; position: absolute; right: 120px; width: 4px; top: 0; bottom: 0; background: var(--fg); }
        .src-bar { display: flex; align-items: center; height: 120px; border: 4px solid var(--fg); background: var(--chip); padding-left: 28px; }
        .src-bar > span { font-size: 34px; letter-spacing: .08em; }
        .src-bar .caret { width: 4px; height: 44px; background: var(--a); margin-left: 10px; }
        .src-bar b { margin-left: auto; align-self: stretch; display: flex; align-items: center; justify-content: center; width: 244px; background: var(--fg); color: var(--bg); font-size: 34px; font-weight: 500; letter-spacing: .1em; }
      </style>`,

  // company lookup vs divorce lookup
  versus: s => `
      <div class="vs"${M('cards')}>${s.cards.map((c, i) => `
        <div class="vs-c${c.accent ? ' hi' : ''}">
          <div class="mono lab"${KP(`cards.${i}.k`)} style="color:var(--mid)">${esc(c.k)}</div>
          <div class="vs-h"${K(`cards.${i}.h`)}>${md(c.h)}</div>
          <p class="vs-s"${K(`cards.${i}.s`)}>${md(c.s)}</p>
          <div class="vs-v"${K(`cards.${i}.v`)}>${md(c.v)}</div>
        </div>`).join('')}
      </div>
      <style>
        .vs { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
        .vs-c { background: var(--chip); padding: 34px 32px 30px; display: flex; flex-direction: column; min-height: 600px; box-shadow: 0 0 0 3px var(--line); }
        .vs-c.hi { box-shadow: 0 0 0 4px var(--a); }
        .vs-h { font-size: 56px; line-height: 1.04; font-weight: 800; letter-spacing: -0.03em; margin-top: 22px; text-wrap: balance; }
        .vs-s { font-size: 38px; line-height: 1.25; color: var(--sub); margin-top: 18px; text-wrap: balance; }
        .vs-v { margin-top: auto; padding-top: 22px; border-top: 3px solid var(--line); font-family: "Bricolage Grotesque"; font-weight: 800; text-transform: uppercase; font-size: 64px; letter-spacing: -0.03em; line-height: 1; }
        .vs-c.hi .vs-v { color: var(--a); }
      </style>`,

  // how hard it is to reach the same record: before vs now
  distance: s => `
      <div class="dist"${M('bars')}>
        ${mono(s.meterLabel, 'color:var(--mid);margin-bottom:30px', 'meterLabel')}
        ${s.rows.map((r, i) => `
        <div class="ds-r">
          <div style="display:flex;align-items:baseline;gap:26px">${mono(r.k, `width:140px;flex:none;color:${r.accent ? 'var(--a)' : 'var(--mid)'}`, `rows.${i}.k`)}<span class="ds-t"${K(`rows.${i}.s`)}>${md(r.s)}</span></div>
          <div class="ds-track"><i style="width:${r.v}%;background:${r.accent ? 'var(--a)' : 'var(--mid)'}"></i>${r.label ? `<span class="mono"${KP(`rows.${i}.label`)} style="color:${r.accent ? 'var(--a)' : 'var(--bg)'};${r.v < 40 ? `left:calc(${r.v}% + 22px)` : 'right:22px'}">${esc(r.label)}</span>` : ''}</div>
        </div>`).join('')}
        <div class="mk-foot" style="margin-top:-20px">${tagLab(s.tag)}</div>
      </div>
      <style>
        .ds-r { margin-bottom: 64px; } .ds-r:first-of-type .ds-track i { opacity: .55; }
        .ds-t { font-size: 42px; font-weight: 700; letter-spacing: -0.015em; line-height: 1.15; }
        .ds-track { position: relative; height: 96px; margin-top: 20px; border: 3px solid var(--line); }
        .ds-track i { position: absolute; left: 0; top: 0; bottom: 0; }
        .ds-track span { position: absolute; top: 50%; transform: translateY(-50%); font-size: 32px; letter-spacing: .1em; font-weight: 500; }
      </style>`,

  // data minimisation: the question, the one-line answer, the fields it leaves out
  minimal: s => `
      <div class="mk"${M('mock')}>
        <div class="mk-h">${mono(s.qLabel, '', 'qLabel')}${tagLab(s.tag)}</div>
        <div class="mk-q"${K('q')}>${md(s.q)}</div>
        <div class="mk-a">${mono(s.aLabel, 'color:var(--onA)', 'aLabel')}<div${K('a')} style="font-size:48px;font-weight:800;letter-spacing:-0.025em;line-height:1.05;margin-top:10px">${md(s.a)}</div></div>
        ${s.hiddenLabel ? `<div style="margin:22px 28px 6px">${mono(s.hiddenLabel, 'color:var(--mid)', 'hiddenLabel')}</div>` : ''}
        <div class="mk-x">${s.hidden.map((h, i) => `<span class="x"${KP(`hidden.${i}`)}>${esc(h)}</span>`).join('')}</div>
      </div>`,

  // access levels: the same record, two views
  levels: s => `
      <div class="lv"${M('views')}>
        <div class="lv-row lv-hd"><span></span>${s.views.map((v, i) => `<span class="mono"${KP(`views.${i}.who`)}>${esc(v.who)}</span>`).join('')}</div>
        ${s.fields.map((f, j) => `<div class="lv-row"><span${KP(`fields.${j}`)}>${esc(f)}</span>${s.views.map(v => v.shown > j ? `<b class="lv-v${j === 0 ? ' st' : ''}">${esc(j === 0 ? s.status : s.shownWord)}</b>` : '<i></i>').join('')}</div>`).join('')}
      </div>
      <div class="mk-foot">${tagLab(s.tag)}</div>
      <style>
        .lv { background: var(--mkbg); box-shadow: 0 0 0 3px var(--fg); }
        .lv-row { display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; align-items: center; column-gap: 28px; padding: 0 28px; height: 90px; border-top: 2px solid var(--line); font-size: 38px; font-weight: 650; letter-spacing: -0.01em; }
        .lv-row.lv-hd { height: auto; padding-top: 20px; padding-bottom: 18px; border-top: 0; border-bottom: 3px solid var(--fg); background: var(--mkhead); align-items: end; }
        .lv-hd .mono { font-size: 32px; letter-spacing: .06em; line-height: 1.15; white-space: pre-line; }
        .lv-v.st { color: var(--fg); }
        .lv-row i { display: block; width: 100%; max-width: 220px; height: 40px; background: var(--fg); }
        .lv-v { font-size: 36px; font-weight: 800; color: var(--a); }
        .lv-row + .lv-row:not(.lv-hd) { }
      </style>`,

  // reciprocity: a "who looked at your record" list
  log: s => `
      <div class="mk"${M('mock')}>
        <div class="mk-h">${mono(s.head, '', 'head')}${tagLab(s.tag)}</div>
        ${s.rows.map((r, i) => `<div class="mk-r" style="height:auto;padding:22px 0 20px;align-items:flex-start"><div><div${KP(`rows.${i}.who`)} style="font-weight:750">${esc(r.who)}</div><div${KP(`rows.${i}.s`)} style="color:var(--sub);font-size:36px;margin-top:4px">${esc(r.s)}</div></div>${mono(r.t, 'color:var(--a);padding-top:4px', `rows.${i}.t`)}</div>`).join('')}
      </div>`,
};
const MOCK_CSS = `
      <style>
        .mk { background: var(--mkbg); box-shadow: 0 0 0 3px var(--fg); }
        .mk-h { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 18px 28px; border-bottom: 3px solid var(--fg); background: var(--mkhead); }
        .mk-q { padding: 30px 28px 26px; font-size: 44px; font-weight: 750; letter-spacing: -0.02em; line-height: 1.12; text-wrap: balance; }
        .mk-a { margin: 0 28px 14px; padding: 22px 26px 24px; background: var(--a); color: var(--onA); }
        .mk-r { display: flex; align-items: center; justify-content: space-between; height: 80px; margin: 0 28px; border-top: 2px solid var(--line); font-size: 36px; font-weight: 600; letter-spacing: -0.01em; }
        .mk-r .x, .mk-x .x { color: var(--sub); text-decoration: line-through; text-decoration-thickness: 3px; }
        .mk-x { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 34px; margin: 0 28px; padding: 6px 0 26px; font-size: 38px; font-weight: 600; letter-spacing: -0.01em; }
        .mk-foot { display: flex; justify-content: flex-end; align-items: center; margin-top: 18px; }
        .mk-tag { font-size: 34px; color: var(--sub); letter-spacing: .08em; white-space: nowrap; }
      </style>`;

function head(s) {   // LinkedIn question pages: big number + "Question 2 of 4"; otherwise nothing (the corner label does it)
  if (!s.step) return '';
  return `<div style="display:flex;align-items:flex-end;gap:30px;margin-bottom:34px">
        <div class="disp" style="font-size:150px;line-height:.74;color:var(--a);letter-spacing:-0.05em">${pad2(s.step)}</div>
        ${mono(s.stepWord ? `${s.stepWord} ${s.step} of ${s.of}` : `of ${s.of}`, 'color:var(--sub);padding-bottom:2px')}
      </div>`;
}

const L = {
  hook: s => `
    <div class="main">
      ${disp(s.title, s.size || 170, '', 'title')}
      ${s.notes ? `<div class="nwall"${M('notes')} style="margin-top:${s.gap ?? 60}px;justify-content:start;grid-template-columns:repeat(${s.notes.length}, ${s.noteSize || 250}px)">${s.notes.map((n, i) => noteHTML(n, i, 'notes', s.noteSize || 250, s.noteFont)).join('')}</div>` : ''}
      <div class="push" style="width:${s.subW || 500}px">
        <p class="body"${K('sub')} style="color:var(--fg);font-size:${s.subSize || 40}px">${md(s.sub)}</p>
        ${s.swipe ? `<div class="mono lab" style="color:var(--a);margin-top:34px;white-space:pre"><span${K('swipe')}>${md(s.swipe)}</span>  →</div>` : ''}
      </div>
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 690, y: 880, w: 296, h: 240, rot: 4, pos: '50% 35%' }, PK('polaroid')) : ''}`,

  visual: s => `
    <div class="main"${s.step ? ' style="top:112px"' : ''}>
      ${head(s)}
      ${disp(s.title, s.size || 104, '', 'title')}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:26px;width:${s.ledeW || 880}px">${md(s.lede)}</p>` : ''}
      <div style="margin-top:${s.gap ?? 54}px">${V[s.visual](s)}</div>
      ${s.takeaway ? `<p class="${s.takeTop ? '' : 'push '}bal"${K('takeaway')} style="${s.takeTop ? `margin-top:${s.takeTop}px;` : ''}font-size:${s.takeSize || 42}px;line-height:1.22;font-weight:650;letter-spacing:-0.015em;color:var(--fg)">${md(s.takeaway)}</p>` : ''}
    </div>${MOCK_CSS}`,

  punch: s => `
    ${s.grid ? '<div class="grid"></div>' : ''}
    <div class="main"${s.step ? ' style="top:112px"' : ''}>
      ${head(s)}
      ${disp(s.title, s.size || 200, '', 'title')}
      ${s.cols ? `<div class="pc"${M('cols')}>${s.cols.map((c, i) => mono(c.k, 'color:var(--sub);align-self:end', `cols.${i}.k`)).join('')}${s.cols.map((c, i) => `<div class="pc-v"${K(`cols.${i}.v`)}>${md(c.v)}</div>`).join('')}</div>
      <style>.pc { display: grid; grid-template-columns: 1fr 1fr; column-gap: 44px; row-gap: 0; margin-top: 64px; border-top: 3px solid var(--line); padding-top: 28px; } .pc-v { font-size: 44px; line-height: 1.12; font-weight: 750; letter-spacing: -0.02em; margin-top: 14px; text-wrap: balance; }</style>` : ''}
      <div class="push" style="width:${s.bodyW || 880}px">
        ${s.body ? `<p class="body"${K('body')} style="color:var(--fg);font-size:${s.bodySize || 42}px">${md(s.body)}</p>` : ''}
        ${s.note ? `<div class="rule" style="margin:${s.body ? 34 : 0}px 0 26px;background:var(--fg);opacity:.35"></div><p class="bal"${K('note')} style="font-size:${s.noteSize || 50}px;line-height:1.1;font-weight:800;letter-spacing:-0.03em;color:var(--fg)">${md(s.note)}</p>${s.noteBy ? mono(s.noteBy, 'color:var(--sub);margin-top:18px', 'noteBy') : ''}` : ''}
      </div>
    </div>`,

  list: s => `
    <div class="main">
      ${disp(s.title, s.size || 116, '', 'title')}
      <div style="margin-top:56px">${rowsHTML(s.rows, { numW: s.numW || 96, head: s.head || 52, sub: 36, pad: s.pad || '26px 0 24px' })}</div>
      ${s.foot ? mono(s.foot, 'color:var(--mid);margin-top:auto', 'foot') : ''}
    </div>`,

  checklist: s => `
    <div class="main">
      ${disp(s.title, s.size || 100, '', 'title')}
      <div style="margin-top:50px">${rowsHTML(s.rows, { numW: 96, head: s.head || 56, sub: 36, pad: '26px 0 24px' })}</div>
      ${s.footLeft || s.footRight ? `<div class="push" style="display:flex;justify-content:space-between">
        ${mono(s.footLeft || '', 'color:var(--a)', 'footLeft')}${mono(s.footRight || '', 'color:var(--mid)', 'footRight')}
      </div>` : ''}
    </div>`,

  compare: s => `
    <div class="main">
      ${disp(s.title, s.size || 100, '', 'title')}
      <div class="cmp"${M('table')} style="margin-top:70px">
        <div class="ch">${mono(s.cols[0], 'color:var(--mid)', 'cols.0')}${mono(s.cols[1], 'color:var(--a)', 'cols.1')}</div>
        ${s.rows.map((r, i) => `<div class="cr">${mono(r.k, 'color:var(--sub);margin-bottom:16px', `rows.${i}.k`)}
          <div class="cc"><span${K(`rows.${i}.a`)}>${md(r.a)}</span><span${K(`rows.${i}.b`)}>${md(r.b)}</span></div></div>`).join('')}
      </div>
      ${s.takeaway ? `<p class="push bal"${K('takeaway')} style="font-size:${s.takeSize || 46}px;line-height:1.15;font-weight:800;letter-spacing:-0.025em">${md(s.takeaway)}</p>` : ''}
      ${s.note ? mono(s.note, 'color:var(--a);margin-top:26px', 'note') : ''}
    </div>
    <style>
      .cmp .ch, .cmp .cc { display: grid; grid-template-columns: 1fr 1fr; column-gap: 48px; }
      .cmp .ch { padding-bottom: 22px; border-bottom: 3px solid var(--fg); }
      .cmp .cr { padding: 30px 0 34px; border-bottom: 3px solid var(--line); }
      .cmp .cc { font-size: 42px; line-height: 1.2; font-weight: 700; letter-spacing: -0.015em; }
      .cmp .cc span { text-wrap: balance; }
    </style>`,

  cover: s => `
    <div class="main">
      ${disp(s.title, s.size || 160, '', 'title')}
      <p class="bal"${K('sub')} style="margin-top:48px;width:${s.subW || 880}px;font-size:${s.subSize || 46}px;line-height:1.16;font-weight:700;letter-spacing:-0.02em">${md(s.sub)}</p>
      ${s.by ? `<p class="body push"${K('by')} style="color:var(--fg);font-size:40px;width:520px;margin-bottom:6px">${md(s.by)}</p>` : ''}
    </div>
    ${pol(s.polaroid, { x: 676, y: 900, w: 300, h: 220, rot: 4, pos: '50% 35%' }, PK('polaroid'))}`,

  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 170, '', 'title')}
      ${s.body ? `<p class="body"${K('body')} style="color:var(--fg);margin-top:40px;width:${s.bodyW || 880}px;font-size:${s.bodySize || 40}px">${md(s.body)}</p>` : ''}
      ${s.ask ? `<p class="bal"${K('ask')} style="margin-top:34px;width:${s.bodyW || 880}px;font-size:${s.askSize || 44}px;line-height:1.08;font-weight:800;letter-spacing:-0.025em">${md(s.ask)}</p>` : ''}
      <div class="push"${M('push')} style="width:${s.pushW || 540}px">
        ${mono(s.where, 'color:var(--mid)', 'where')}
        <div class="bal"${KP('video')} data-affix="“|”" style="font-weight:800;font-size:${s.videoSize || 50}px;line-height:1.08;letter-spacing:-0.03em;margin-top:16px">“${esc(s.video)}”</div>
        <div style="margin-top:36px"><span class="ph real"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 690, y: 850, w: 290, h: 250, rot: 4, pos: '50% 35%' }, PK('polaroid')) : ''}`,
};

/* ---------- ux-research: the research wall (film direction A) ---------- */
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4, -1];
const noteHTML = (n, i, at, size, fs) => `<div class="note${n.o ? ' o' : ''}${n.circle ? ' circ' : ''}" style="--s:${size}px;${fs ? `font-size:${fs}px;` : ''}transform:rotate(${n.rot ?? ROT[i % ROT.length]}deg)"><span${KP(`${at}.${i}.t`)}>${esc(n.t)}</span></div>`;
const PHONE = (kind = 'tiny') => `
  <div class="phone"${M('phone')}><div class="scr"><div class="notch"></div><div class="app">
    <div class="bar"><span class="bk">&lsaquo;</span><span>Checkout</span><span class="dots">&middot;&middot;&middot;</span></div>
    <div class="h1">Your order</div>
    <div class="it"><i style="background:#F2A65A"></i><span>Avocado bowl</span><b>£9.50</b></div>
    <div class="it"><i style="background:#8FBF7A"></i><span>Iced latte</span><b>£3.80</b></div>
    <div class="sum"><span>Delivery</span><b>£1.99</b></div><div class="tot"><span>Total</span><b>£15.29</b></div>
    ${kind === 'tiny' ? '<div class="ghost">pay &rsaquo;</div><div class="ringbox"></div>' : '<div class="pay">Pay £15.29</div>'}
  </div></div></div>`;
Object.assign(L, {
  // big numbers (sourced), one line each, a short body and the source
  stat: s => `
    <div class="main">
      ${disp(s.title, s.size || 110, '', 'title')}
      <div class="stats"${M('stats')}>${s.stats.map((x, i) => `<div class="st${x.accent ? ' hi' : ''}"><div class="sn"${KP(`stats.${i}.n`)}>${esc(x.n)}</div><div class="sl"${K(`stats.${i}.l`)}>${md(x.l)}</div>${x.bar ? `<i class="track"><b style="width:${x.bar}%"></b></i>` : ''}</div>`).join('')}</div>
      ${s.body ? `<p class="push bal"${K('body')} style="font-size:${s.bodySize || 40}px;line-height:1.22;font-weight:600;color:var(--fg);width:880px">${md(s.body)}</p>` : ''}
      ${s.source ? mono(s.source, 'color:var(--mid);margin-top:22px', 'source') : ''}
    </div>`,
  // title + a grid of sticky notes (optional orange ones, one circled) + takeaway
  notes: s => `
    <div class="main">
      ${disp(s.title, s.size || 112, '', 'title')}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:24px;width:${s.ledeW || 880}px">${md(s.lede)}</p>` : ''}
      <div class="nwall"${M('notes')} style="margin-top:${s.gap ?? 56}px;grid-template-columns:repeat(${s.cols || 3}, ${s.noteSize || 250}px)">${s.notes.map((n, i) => noteHTML(n, i, 'notes', s.noteSize || 250, s.noteFont)).join('')}</div>
      ${s.takeaway ? `<p class="${s.takeUp ? '' : 'push '}bal"${K('takeaway')} style="${s.takeUp ? `margin-top:${s.takeUp}px;` : ''}font-size:${s.takeSize || 44}px;line-height:1.16;font-weight:700;letter-spacing:-0.015em;color:var(--fg)">${md(s.takeaway)}</p>` : ''}
    </div>`,
  // two cards per row, one row per pair (mono label above): the three pairs of UX research
  pairs: s => `
    <div class="main">
      ${disp(s.title, s.size || 110, '', 'title')}
      <div class="prs"${M('pairs')}>${s.pairs.map((r, i) => `<div class="pr">${mono(r.k, 'color:var(--sub);margin-bottom:14px', `pairs.${i}.k`)}
        <div class="prc"><div class="pc1" style="transform:rotate(${[-1.5, 1, -1][i % 3]}deg)"><b${KP(`pairs.${i}.a`)}>${esc(r.a)}</b>${r.as ? `<span${KP(`pairs.${i}.as`)}>${esc(r.as)}</span>` : ''}</div>
        <div class="pvs">or</div><div class="pc2" style="transform:rotate(${[1.5, -1, 1.2][i % 3]}deg)"><b${KP(`pairs.${i}.b`)}>${esc(r.b)}</b>${r.bs ? `<span${KP(`pairs.${i}.bs`)}>${esc(r.bs)}</span>` : ''}</div></div></div>`).join('')}</div>
      ${s.takeaway ? `<p class="push bal"${K('takeaway')} style="font-size:${s.takeSize || 44}px;line-height:1.16;font-weight:700;color:var(--fg)">${md(s.takeaway)}</p>` : ''}
    </div>`,
  // wide sticky notes, two columns: a method name + what it means
  methods: s => `
    <div class="main">
      ${disp(s.title, s.size || 110, '', 'title')}
      ${s.key ? mono(s.key, 'color:var(--sub);margin-top:22px', 'key') : ''}
      <div class="mth"${M('methods')}>${s.methods.map((m, i) => `<div class="mn${m.o ? ' o' : ''}${m.card ? ' card' : ''}" style="transform:rotate(${[-.6, .5, .4, -.5, -.4, .6, .5, -.4][i % 8]}deg)"><b${KP(`methods.${i}.h`)}>${esc(m.h)}</b><span${KP(`methods.${i}.g`)}>${esc(m.g)}</span></div>`).join('')}</div>
    </div>`,
  // index cards (UI / UX), each with a row of notes under it
  cards: s => `
    <div class="main">
      ${s.title ? disp(s.title, s.size || 100, 'margin-bottom:40px', 'title') : ''}
      ${s.cards.map((c, i) => `
      <div class="cblock"${M(`card-${i + 1}`)}>
        <div class="icard" style="transform:rotate(${i % 2 ? 1.2 : -1.2}deg)"><div class="ih"${K(`cards.${i}.h`)}>${md(c.h)}</div><div class="is"${K(`cards.${i}.s`)}>${md(c.s)}</div></div>
        ${c.notes ? `<div class="nrow">${c.notes.map((n, j) => noteHTML({ ...n, o: n.o ?? c.o }, j + i * 3, `cards.${i}.notes`, c.noteSize || s.noteSize || 210, s.noteFont)).join('')}</div>` : ''}
      </div>`).join('')}
    </div>`,
  // title + the generic food-app phone (Illustration) + a marker callout + takeaway
  phone: s => `
    <div class="main">
      ${disp(s.title, s.size || 110, '', 'title')}
      <div class="phwrap">
        ${PHONE(s.phone || 'tiny')}
        ${s.callout ? `<div class="callout"${K('callout')}>${md(s.callout)}</div>` : ''}
        ${s.zoom ? `<div class="zoom"${M('zoom')}><span${K('zoom')}>${md(s.zoom)}</span></div><svg class="mk" width="10" height="10" style="left:0;top:0"><path d="M322 592 L424 566" style="stroke-width:5"/></svg>` : ''}
      </div>
      ${s.takeaway ? `<p class="push bal"${K('takeaway')} style="font-size:${s.takeSize || 44}px;line-height:1.16;font-weight:700;letter-spacing:-0.015em;color:var(--fg)">${md(s.takeaway)}</p>` : ''}
    </div>`,
  // one big index card with a quote (markup ~struck~ and {circled}), a credit line, polaroid, handle
  quote: s => `
    <div class="main">
      ${s.kicker ? mono(s.kicker, 'color:var(--mid);margin-bottom:34px', 'kicker') : ''}
      <div class="icard big"${M('card')}><div class="qt"${K('quote')} style="font-size:${s.qSize || 84}px">${md(s.quote)}</div></div>
      ${s.credit ? `<p class="body"${K('credit')} style="margin-top:30px;font-size:34px;color:var(--mid)">${md(s.credit)}</p>` : ''}

      <div class="push"${M('push')} style="width:${s.pushW || 560}px">
        ${s.cta ? `<p class="bal"${K('cta')} style="margin-bottom:56px;font-size:48px;line-height:1.1;font-weight:800;letter-spacing:-0.02em">${md(s.cta)}</p>` : ''}
        ${s.where ? mono(s.where, 'color:var(--mid)', 'where') : ''}
        ${s.video ? `<div class="bal"${KP('video')} data-affix="“|”" style="font-weight:800;font-size:${s.videoSize || 46}px;line-height:1.08;letter-spacing:-0.03em;margin-top:14px">“${esc(s.video)}”</div>` : ''}
        <div style="margin-top:30px"><span class="ph real"${KP('handle')}>${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 700, y: 860, w: 280, h: 230, rot: 5, pos: '50% 35%' }, PK('polaroid')) : ''}`,
});

/* ---------- page ---------- */
function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  // text on an accent ground: light on a dark accent (blue, ink), ink on a light one (orange, green, paper)
  const lum = (hex) => { const v = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  // accent vars for a deck, or for one slide with its own "accent" (e.g. a full-bleed orange or green punchline in a blue deck)
  const accVars = (acc, onInk) => { const dark = lum(acc) < 0.2;
    return `--acc:${acc};--accInk:${onInk || acc};--onAInk:${lum(onInk || acc) < 0.2 ? '#F1F4FF' : '#111114'};--onAccent:${dark ? '#F1F4FF' : '#111114'};` +
      (dark ? '--onAcc:#F1F4FF;--onAccMid:rgba(241,244,255,.74);--onAccLine:rgba(241,244,255,.3);--onAccAcc:#FF4713;'
            : `--onAcc:#111114;--onAccMid:rgba(17,17,20,.66);--onAccLine:rgba(17,17,20,.3);--onAccAcc:${lum(acc) > 0.45 ? '#111114' : '#FFFDF6'};`); };
  const onBlue = lum(C.accent) < 0.2;
  const vars = `--W:${C.width}px;--H:${C.height}px;` + accVars(C.accent, C.accentOnInk);
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n') + (s.lh ? `\n#s${i + 1} .main > .disp { line-height: ${+s.lh} }` : '') + (s.hang ? `\n#s${i + 1} .main > .disp { text-indent: ${+s.hang}em }` : '');
  // a custom ground colour from the studio's colour picker: "groundColor": "#RRGGBB" next to "ground" (ink or paper,
  // whichever text colour reads better on it). Hairlines and muted text follow the text colour. No groundColor = as before.
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? accVars(s.accent, s.accentOnInk) : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '237,233,226' : '17,17,20';
    return ` style="${own}--bg:${s.groundColor};--mid:rgba(${t},.68);--line:rgba(${t},.3)"`;
  };
  const gridDark = (s) => lum(/^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? s.accent : C.accent) < 0.2;
  const slides = C.slides.map((s, i) => {
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    return `<section class="slide g-${s.ground} l-${s.layout}${s.ground === 'accent' && !gridDark(s) ? ' light-acc' : ''}" id="s${i + 1}"${groundStyle(s)}>
  ${s.step || !s.corner ? '' : `<div class="corner"${KP('corner')}>${esc(s.corner)}</div>`}
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span><span class="meter">${meter}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{${vars}}
.grid { position:absolute; inset:0; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='135'%3E%3Cpath d='M0 .5H135M.5 0V135' stroke='%23F1F4FF' stroke-opacity='.26' fill='none'/%3E%3C/svg%3E") -1px -1px; }
.light-acc .grid { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='135'%3E%3Cpath d='M0 .5H135M.5 0V135' stroke='%23111114' stroke-opacity='.06' fill='none'/%3E%3C/svg%3E"); }
</style></head><body>
${slides}
<script>
// shrink display lines that would overflow their box (so edited text never runs off the slide)
function fitAll(){ document.querySelectorAll('.fit').forEach(el=>{ let s=+el.dataset.max; el.style.fontSize=s+'px';
  const box=el.parentElement.getBoundingClientRect().width; const lim=Math.min(el.clientWidth||box, box);
  while((el.scrollWidth>lim+1) && s>24){ s-=2; el.style.fontSize=s+'px'; } }); }
// studio editor views: ?view=slide&n=3 (one slide, no page chrome), ?view=strip (all slides in a row)
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
    const R = sl.getBoundingClientRect(); const foot = sl.querySelector('.foot').getBoundingClientRect();
    const tag = el => `<${el.tagName.toLowerCase()} ${el.className}> "${(el.textContent || '').trim().slice(0, 30)}"`;
    sl.querySelectorAll('.main *').forEach(el => {
      if (el.closest('.pol') || !el.childNodes.length) return;
      const r = el.getBoundingClientRect(); if (!r.width) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 60 || r.left < R.left + 60) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    // mono labels (DM Mono) must be >= MONO_MIN px
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!cs.fontFamily.includes('DM Mono') || el.closest('.meter')) return;
      const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (own && parseFloat(cs.fontSize) < MONO_MIN - 0.5) res.push(`slide ${i + 1}: mono ${parseFloat(cs.fontSize)}px ${tag(el)}`);
    });
    // polaroids must keep >= 24 px clear of text (rotated box, so this is conservative)
    sl.querySelectorAll('.pol').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .bal, .main .lab, .main .row, .main .toc, .main .cmp, .main .ph, .corner').forEach(el => {
        if (el.closest('.pol')) return;
        const b = el.getBoundingClientRect(); const g = 24;
        if (a.left < b.right + g && a.right > b.left - g && a.top < b.bottom + g && a.bottom > b.top - g) {
          // ignore if the text's actual glyph run ends before the polaroid (measure text width for block elements)
          const rg = document.createRange(); rg.selectNodeContents(el); const rs = [...rg.getClientRects()];
          if (rs.some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
            res.push(`slide ${i + 1}: polaroid within 24 px of ${tag(el)}`);
        }
      });
    });
    sl.querySelectorAll('.pol .cap').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) res.push(`slide ${i + 1}: polaroid caption clipped ${tag(el)}`); });
    // single-word last lines in multi-line text blocks
    sl.querySelectorAll('p, .body, .sub, .tnote, .bal, .cc span, .ts, .qr span, .disp').forEach(el => {
      const words = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) { const t = tw.currentNode; const re = /\S+/g; let m;
        while ((m = re.exec(t.textContent))) { const rg = document.createRange(); rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length);
          const rr = rg.getClientRects()[0]; if (rr) words.push({ w: m[0], top: Math.round(rr.top) }); } }
      if (words.length < 3) return;
      const lines = []; words.forEach(w => { const l = lines.find(l => Math.abs(l.top - w.top) < 8); if (l) l.n++; else lines.push({ top: w.top, n: 1, last: w.w }); });
      lines.sort((a, b) => a.top - b.top);
      const last = lines[lines.length - 1];
      if (lines.length > 1 && last.n === 1 && !el.classList.contains('disp')) res.push(`slide ${i + 1}: one-word last line "${words[words.length - 1].w}" in ${tag(el)}`);
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

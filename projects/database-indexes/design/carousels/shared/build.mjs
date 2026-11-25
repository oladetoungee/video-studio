// Build a carousel from its content.json (database-indexes; infrastructure copied from ghana-marrify 2026-10-13, own Query Plan layouts below): writes <deck>/index.html (open it in a browser to preview),
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
  .replace(/==([^=]+)==/g, '<span class="hl">$1</span>')
  .replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>')
  .replace(/_([^_]+)_/g, '<span class="serif">$1</span>')
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
  <div class="row${r.accent ? ' hi' : ''}${r.no ? ' no' : ''}" style="padding:${o.pad || '26px 0 24px'}"><div class="n"${KP(`${at}.${i}.n`)}>${esc(r.n)}</div>
    <div><div class="head fit"${K(`${at}.${i}.head`)} data-max="${o.head || 60}" style="font-size:${o.head || 60}px;white-space:nowrap">${md(r.head)}</div>${r.sub ? `<div class="sub"${K(`${at}.${i}.sub`)} style="font-size:${o.sub || 36}px">${md(r.sub)}</div>` : ''}</div></div>`).join('')}</div>`;
function meterBar(n, on, accent) {
  return `<div class="mbar${accent ? ' hi' : ''}">${Array.from({ length: n }, (_, k) => `<i class="${k < on ? 'on' : ''}"></i>`).join('')}</div>`;
}

/* ---------- layouts ---------- */
// database-indexes: the film's Query Plan look. One generic "visual" layout (title + lede + a flat diagram + takeaway) with
// visuals: phones, scan, book, tree, code, writes; plus hook, punch, list, cover, end. Code lines: [[x]] = yellow
// highlight (the query's path / it works), {{x}} = red highlight (the slow / wrong thing). All rows, names and numbers in
// diagrams are generic (no disclaimer tags: her rule 2026-10-14); EXPLAIN text is real PostgreSQL output (COSTS OFF).
const code = s => esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="good">$1</span>').replace(/\{\{(.+?)\}\}/g, '<span class="bad">$1</span>');
const tagLab = (s, k = 'tag') => (s ? `<div class="mono"${KP(k)} style="font-size:33px;color:var(--sub);margin-top:18px;margin-bottom:22px">${esc(s)}</div>` : '');
const DB = (stroke = 'currentColor', fill = 'none') => `<svg viewBox="-4 -4 128 158" width="100%" height="100%"><path d="M6 24 v102 a54 18 0 0 0 108 0 v-102" fill="${fill}" stroke="${stroke}" stroke-width="7"/><ellipse cx="60" cy="24" rx="54" ry="18" fill="${fill}" stroke="${stroke}" stroke-width="7"/><path d="M6 58 a54 18 0 0 0 108 0 M6 92 a54 18 0 0 0 108 0" fill="none" stroke="${stroke}" stroke-width="7"/></svg>`;
const SPIN = `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="38" fill="none" stroke="rgba(14,16,19,.15)" stroke-width="11"/><path d="M50 12 a38 38 0 0 1 38 38" fill="none" stroke="#F23D2E" stroke-width="11" stroke-linecap="round"/></svg>`;

const V = {
  // the same app with few users (loaded) and many users (stuck on a spinner)
  phones: s => {
    const items = Array.from({ length: 5 }, () => '<div class="it"><i></i><div><b></b><s></s></div></div>').join('');
    const ph = (slow, i) => `<div class="ph-w"><div class="phn"><div class="scr"><div class="app${slow ? ' slow' : ''}"><div class="hd">${slow ? 'Loading…' : 'Orders'}</div>${items}</div></div></div>
        <div class="mono"${KP(`phones.${i}`)} style="font-size:34px;margin-top:22px;color:${slow ? 'var(--yellow)' : 'var(--fg)'}">${esc(s.phones[i])}</div></div>`;
    return `<div class="phs"${M('phones')}>${ph(false, 0)}${ph(true, 1)}</div>${tagLab(s.tag)}
      <style>
        .phs { display: flex; gap: 70px; }
        .ph-w { width: 360px; }
        .phn { width: 360px; height: 440px; background: #000; border-radius: 46px; padding: 13px; border: 3px solid var(--line); }
        .scr { position: relative; width: 100%; height: 100%; background: #FFFDF6; border-radius: 34px; overflow: hidden; color: #0E1013; }
        .app { padding: 40px 20px 0; font-family: Plex; } .app .hd { font-weight: 700; font-size: 30px; margin-bottom: 12px; }
        .it { display: flex; gap: 14px; align-items: center; padding: 12px 0; border-top: 2px solid #e6e2d8; }
        .it i { width: 44px; height: 44px; border-radius: 10px; background: var(--yellow); }
        .it b { display: block; width: 140px; height: 13px; background: #0E1013; border-radius: 6px; margin-bottom: 9px; }
        .it s { display: block; width: 90px; height: 11px; background: #cfcabd; border-radius: 5px; }
        .app.slow .hd { color: #9a958a; } .app.slow i, .app.slow b, .app.slow s { background: #e4e0d6; }
        .spn { position: absolute; top: 120px; left: 50%; width: 120px; height: 120px; margin-left: -60px; }
        .dbm { position: absolute; top: 270px; left: 50%; width: 80px; height: 100px; margin-left: -40px; }
      </style>`;
  },

  // a full table scan: the query, a table of rows, a red line down every row, the one it wanted in yellow, a counter
  scan: s => {
    const rows = s.rows.map((r, i) => `<div class="sr${i === s.hit ? ' hit' : ''}"><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join('');
    return `<div class="sc"${M('diagram')}>
        <div class="panel" style="padding:22px 30px"><div class="ln" style="font-size:32px"${KP('query')}>${code(s.query)}</div></div>
        <div class="st"><i class="sl"></i><div class="sr hd"><span>${esc(s.cols[0])}</span><span>${esc(s.cols[1])}</span></div>${rows}<div class="sr more"><span>…</span><span${KP('more')}>${esc(s.more || '')}</span></div></div>
        ${tagLab(s.tag)}
      </div>
      <style>
        .st { position: relative; margin: 22px 0 0 44px; font-family: "Plex Mono"; font-size: 34px; }
        .sr { display: grid; grid-template-columns: 240px 1fr; padding: 4px 18px; border-bottom: 2px solid var(--line); }
        .sr.hd { color: var(--mid); font-weight: 600; } .sr.hit { background: var(--yellow); color: #0E1013; font-weight: 600; }
        .sr.more { color: var(--mid); border-bottom: none; }
        .sl { position: absolute; left: -40px; top: 8px; bottom: 30px; width: 9px; background: #9AA0A8; border-radius: 5px; }
        .sl::after { content: ''; position: absolute; bottom: -16px; left: -12px; border: 16px solid transparent; border-top: 22px solid #9AA0A8; }
      </style>`;
  },

  // the index at the back of a book -> the same idea in a database
  book: s => `
      <div class="bk-w"${M('diagram')}>
        <div class="bk"><div class="bk-h"${KP('bookHead')}>${esc(s.bookHead)}</div>${s.entries.map((e, i) => `<div class="be${i === s.hit ? ' hit' : ''}"><span${KP(`entries.${i}.0`)}>${esc(e[0])}</span><span${KP(`entries.${i}.1`)}>${esc(e[1])}</span></div>`).join('')}</div>
        <svg class="bk-a" width="200" height="480" viewBox="0 0 200 480"><path d="M6 ${128 + s.hit * 57} C 90 ${128 + s.hit * 57}, 120 330, 120 440" fill="none" stroke="var(--fg)" stroke-width="6" stroke-linecap="round"/><path d="M104 420 L120 446 136 420" fill="none" stroke="var(--fg)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="bk-r"><div class="panel" style="padding:18px 24px"><div class="ln" style="font-size:32px"${KP('row')}>${code(s.row)}</div></div></div>
      </div>${tagLab(s.tag)}
      <style>
        .bk-w { position: relative; height: 540px; }
        .bk { position: absolute; left: 0; top: 0; width: 520px; background: #FBF6EA; color: #1b1b1b; padding: 30px 36px; transform: rotate(-2deg); font-family: "Instrument Serif"; font-style: italic; }
        .bk-h { font-size: 62px; margin-bottom: 8px; }
        .be { display: flex; justify-content: space-between; font-size: 40px; line-height: 1.42; border-bottom: 2px dotted #c9c2b2; }
        .be.hit { background: var(--yellow); }
        .bk-a { position: absolute; left: 520px; top: 0; }
        .bk-r { position: absolute; left: 330px; top: 440px; width: 582px; }
      </style>`,

  // the B-tree walk (bob / dave / alice), drawn as a real B+tree: 2 keys per node shown, the yellow path, the row
  tree: s => `
      <div${M('diagram')}><svg viewBox="0 0 560 430" width="720"><g font-family="Plex Mono" font-size="30" fill="var(--fg)" stroke-width="3">
<g stroke="var(--fg)" fill="none"><rect x="250" y="6" width="220" height="64"/><line x1="360" y1="6" x2="360" y2="70"/>
<rect x="60" y="150" width="220" height="64"/><line x1="170" y1="150" x2="170" y2="214"/>
<rect x="0" y="292" width="200" height="64"/><line x1="100" y1="292" x2="100" y2="356"/>
<line x1="470" y1="70" x2="530" y2="150" stroke="var(--mid)" stroke-dasharray="7 9"/><line x1="280" y1="214" x2="330" y2="292" stroke="var(--mid)" stroke-dasharray="7 9"/></g>
<g stroke="#FFC53D" stroke-width="7" fill="none"><line x1="255" y1="70" x2="170" y2="150"/><line x1="170" y1="214" x2="150" y2="292"/><line x1="150" y1="356" x2="150" y2="380"/></g>
<rect x="100" y="292" width="100" height="64" fill="#FFC53D"/>
<g stroke="none" font-size="26"><text x="305" y="48" text-anchor="middle">dave@</text><text x="415" y="48" text-anchor="middle">mia@</text>
<text x="115" y="192" text-anchor="middle">ada@</text><text x="225" y="192" text-anchor="middle">chidi@</text>
<text x="50" y="334" text-anchor="middle">ada@</text><text x="150" y="334" text-anchor="middle" fill="#0E1013" font-weight="600">bob@</text></g>
<rect x="10" y="378" width="480" height="50" fill="none" stroke="#FFC53D" stroke-width="3"/>
<text x="26" y="412" font-size="26">row 48 │ bob@email.com</text></g></svg></div>
      ${s.steps ? '' : ''}<div class="steps"${M('steps')}>${(s.steps || []).map((x, i) => `<div class="stp"><span class="mono" style="color:var(--mid)">${i + 1}</span><span class="mono"${KP(`steps.${i}.0`)}>${esc(x[0])}</span><span class="mono" style="color:var(--yellow)"${KP(`steps.${i}.1`)}>${esc(x[1])}</span></div>`).join('')}</div>
      ${tagLab(s.tag)}
      <style>.steps { margin-top: 22px; } .stp { display: grid; grid-template-columns: 60px 400px 1fr; font-size: 34px; line-height: 1.4; }</style>`,

  // one or more code / terminal panels, each with an optional caption and a verdict line
  code: s => `
      <div class="cps"${M('panels')}>${s.panels.map((p, i) => `
        <div class="panel${p.kind ? ' ' + p.kind + '-b' : ''}" style="margin-bottom:26px">
          ${p.cap ? `<div class="cap"${KP(`panels.${i}.cap`)}>${esc(p.cap)}</div>` : ''}
          ${p.lines.map((l, j) => `<div class="ln"${KP(`panels.${i}.lines.${j}`)}${p.size ? ` style="font-size:${p.size}px"` : ''}>${code(l)}</div>`).join('')}
          ${p.verdict ? `<div class="vd"${K(`panels.${i}.verdict`)}>${md(p.verdict)}</div>` : ''}
        </div>`).join('')}</div>${tagLab(s.tag)}
      <style>.vd { font-family: Plex; font-weight: 600; font-size: 38px; line-height: 1.2; margin-top: 18px; letter-spacing: -0.01em; color: var(--pfg); }</style>`,

  // the write cost: one new order lands in the table and in each of its indexes
  writes: s => `
      <div class="wr"${M('diagram')}>
        <div class="wst main-t"><i class="n"></i>${'<i></i>'.repeat(8)}<div class="mono wl"${KP('tableLabel')}>${esc(s.tableLabel)}</div></div>
        ${Array.from({ length: s.indexes }, (_, k) => `<div class="wst ix"><i class="n"></i>${'<i></i>'.repeat(4 - (k % 3))}</div>`).join('')}
      </div>
      <div class="mono" style="font-size:34px;margin-top:26px;color:var(--mid)"${KP('indexLabel')}>${esc(s.indexLabel)}</div>
      <style>
        .wr { display: flex; align-items: flex-end; gap: 22px; height: 330px; }
        .wst { display: flex; flex-direction: column; gap: 7px; position: relative; }
        .wst i { display: block; height: 24px; border: 3px solid var(--fg); border-radius: 3px; }
        .wst i.n { background: var(--yellow); border-color: var(--yellow); }
        .main-t { width: 290px; } .ix { width: 78px; }
        .wl { position: absolute; top: -56px; left: 0; font-size: 32px; color: var(--mid); white-space: nowrap; }
      </style>`,
};

const L = {
  hook: s => `
    <div class="grid"></div>
    <div class="main">
      ${disp(s.title, s.size || 118, '', 'title')}
      ${s.sub ? `<p class="body"${K('sub')} style="margin-top:34px;width:${s.subW || 880}px;font-size:${s.subSize || 44}px;color:var(--fg)">${md(s.sub)}</p>` : ''}
      ${s.visual ? `<div class="push">${V[s.visual](s)}</div>` : ''}
      ${s.swipe ? `<div class="mono lab" style="color:var(--a);margin-top:30px"><span${K('swipe')}>${md(s.swipe)}</span> →</div>` : ''}
    </div>`,

  visual: s => `
    ${s.grid === false ? '' : '<div class="grid"></div>'}
    <div class="main">
      ${disp(s.title, s.size || 96, '', 'title')}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:24px;width:${s.ledeW || 900}px">${md(s.lede)}</p>` : ''}
      <div style="margin-top:${s.gap ?? 44}px">${V[s.visual](s)}</div>
      ${s.takeaway ? `<p class="${s.takeTop ? '' : 'push '}bal"${K('takeaway')} style="${s.takeTop ? `margin-top:${s.takeTop}px;` : ''}font-size:${s.takeSize || 44}px;line-height:1.2;font-weight:600;letter-spacing:-0.015em;color:var(--fg)">${md(s.takeaway)}</p>` : ''}
    </div>`,

  punch: s => `
    ${s.grid === false ? '' : '<div class="grid"></div>'}
    <div class="main">
      ${disp(s.title, s.size || 150, '', 'title')}
      ${s.body ? `<p class="body push"${K('body')} style="width:${s.bodyW || 900}px;color:var(--fg);font-size:${s.bodySize || 46}px">${md(s.body)}</p>` : ''}
      ${s.note ? `<p class="mono"${K('note')} style="font-size:34px;color:var(--mid);margin-top:28px">${md(s.note)}</p>` : ''}
    </div>`,

  list: s => `
    <div class="grid"></div>
    <div class="main">
      ${disp(s.title, s.size || 96, '', 'title')}
      <div style="margin-top:50px">${rowsHTML(s.rows, { numW: s.numW || 96, head: s.head || 52, sub: s.sub || 36, pad: s.pad || '24px 0 22px' })}</div>
      ${s.foot ? `<p class="${s.footTop ? '' : 'push '}bal"${K('foot')} style="${s.footTop ? `margin-top:${s.footTop}px;` : ''}font-size:${s.footSize || 42}px;line-height:1.2;font-weight:600;color:var(--fg)">${md(s.foot)}</p>` : ''}
    </div>`,

  cover: s => `
    <div class="grid"></div>
    <div class="main">
      ${disp(s.title, s.size || 124, '', 'title')}
      <p class="bal"${K('sub')} style="margin-top:44px;width:${s.subW || 900}px;font-size:${s.subSize || 46}px;line-height:1.2;font-weight:600;letter-spacing:-0.015em">${md(s.sub)}</p>
      ${s.panel ? `<div class="push panel" style="width:${s.panelW || 600}px;padding:24px 30px"${M('panel')}>${s.panel.map((l, j) => `<div class="ln"${KP(`panel.${j}`)} style="font-size:32px">${code(l)}</div>`).join('')}</div>` : ''}
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 728, y: s.polY || 846, w: 270, h: 280, rot: 4, pos: '50% 30%' }, PK('polaroid')) : ''}`,

  end: s => `
    <div class="grid"></div>
    <div class="main">
      ${disp(s.title, s.size || 120, '', 'title')}
      ${s.body ? `<p class="body"${K('body')} style="color:var(--fg);margin-top:36px;width:${s.bodyW || 900}px;font-size:${s.bodySize || 42}px">${md(s.body)}</p>` : ''}
      ${s.ask ? `<p class="bal"${K('ask')} style="margin-top:30px;width:${s.bodyW || 900}px;font-size:44px;line-height:1.15;font-weight:700;color:var(--a)">${md(s.ask)}</p>` : ''}
      <div class="${s.pushTop ? '' : 'push'}"${M('push')} style="width:${s.pushW || 560}px;${s.pushTop ? `margin-top:${s.pushTop}px` : ''}">
        ${s.where ? `<div class="mono" style="font-size:34px;color:var(--mid)"${KP('where')}>${esc(s.where)}</div>` : ''}
        <div class="bal"${KP('video')} data-affix="“|”" style="font-weight:700;font-size:${s.videoSize || 50}px;line-height:1.08;letter-spacing:-0.03em;margin-top:16px">“${esc(s.video)}”</div>
        <div style="margin-top:34px"><span class="ph"${KP('handle')} style="color:var(--a)">${esc(s.handle)}</span></div>
      </div>
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 700, y: s.polY || 820, w: 290, h: 300, rot: 4, pos: '50% 30%' }, PK('polaroid')) : ''}`,
};

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
    // mono labels (Plex Mono) must be >= MONO_MIN px
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!cs.fontFamily.includes('Plex Mono') || el.closest('.meter') || el.closest('svg')) return;
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

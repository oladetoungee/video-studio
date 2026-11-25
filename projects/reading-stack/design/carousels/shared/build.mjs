// Build a carousel from its content.json: writes <deck>/index.html (open it in a browser to preview),
// renders one PNG per slide + overview.png into outputs/carousels/<deck>/, and carousel.pdf for LinkedIn.
//   node shared/build.mjs instagram        (or linkedin, or both: node shared/build.mjs instagram linkedin)
//   add --html to only rebuild index.html; --slide N renders only slide N's PNG; --pdf only the LinkedIn PDF
// Studio design editor support (none of it changes a render): text carries data-k="<path in the slide>", movable
// blocks data-move="<name>", data-affix="pre|post" = fixed characters around the editable text, polaroid photos data-img="<path>"; a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves,
// scales or hides that element; index.html?view=slide&n=3 shows one slide, ?view=strip all slides in a row.
// A slide's optional "groundColor": "#RRGGBB" (studio colour picker) replaces its ground colour; "ground" stays ink or paper
// to set the text colours. A polaroid "img" can also be a path to the project's uploads (../../../assets/uploads/…).
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
const PROJECT = path.resolve(ROOT, '../..');                          // projects/reading-stack
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
const L = {
  hook: s => `
    <div class="main">
      ${disp(s.title, 200, 'margin-top:20px', 'title')}
      <div class="push" style="width:450px">
        <p class="body"${K('sub')} style="color:var(--fg);font-size:42px">${md(s.sub)}</p>
        <div class="mono lab" style="color:var(--a);margin-top:34px;white-space:pre"><span${K('swipe')}>${md(s.swipe)}</span>  →</div>
      </div>
    </div>
    ${pol(s.polaroids[0], { x: 590, y: 758, w: 266, h: 290, rot: -5 }, PK('polaroids.0'))}
    ${pol(s.polaroids[1], { x: 806, y: 906, w: 194, h: 200, rot: 6, z: 2 }, PK('polaroids.1'))}`,

  quote: s => `
    <div class="main">
      <div class="bal"${K('quote')} style="font-weight:800;font-size:118px;line-height:1.0;letter-spacing:-0.04em;margin-top:30px">${md(s.quote)}</div>
      <p class="body"${K('body')} style="margin-top:48px;width:880px;font-size:42px">${md(s.body)}</p>
      <div class="push">
        <div class="bal"${K('punch')} style="font-weight:800;font-size:68px;line-height:1.08;letter-spacing:-0.03em">${md(s.punch).replace(/class="serif"/g, 'class="serif acc" style="font-size:1.2em;line-height:.8"')}</div>
        ${s.foot ? `<div class="rule" style="margin:44px 0 26px"></div>${mono(s.foot, 'color:var(--a)', 'foot')}` : ''}
      </div>
    </div>`,

  punch: s => `
    <div class="grid"></div>
    <div class="main">
      ${disp(s.title, 230, 'margin-top:70px', 'title')}
      <div class="push" style="width:860px">
        <p class="body"${K('body')} style="color:var(--fg);font-size:42px">${md(s.body)}</p>
        ${s.note ? `<p class="body"${K('note')} style="color:var(--sub);font-size:36px;margin-top:26px">${md(s.note)}</p>` : ''}
      </div>
    </div>`,

  contents: s => `
    <div class="main">
      ${disp(s.title, 104, 'width:620px', 'title')}
      <div class="toc"${M('toc')}>${s.rows.map((r, i) => `
        <div class="tr${r.block ? ' b-' + r.block : ''}"><span class="tn"${KP(`rows.${i}.n`)}>${esc(r.n)}</span><span class="ts"${K(`rows.${i}.s`)}>${md(r.s)}</span></div>
        ${r.note ? `<div class="tnote"${K(`rows.${i}.note`)}>${md(r.note)}</div>` : ''}`).join('')}
      </div>
      ${s.foot ? mono(s.foot, 'color:var(--mid);margin-top:auto', 'foot') : ''}
    </div>
    ${pol({ img: s.img, caption: s.book }, { x: 780, y: 44, w: 204, h: 176, rot: 4 }, { move: 'polaroid', img: 'img', cap: 'book' })}
    <style>
      .toc { margin-top: 74px; border-top: 3px solid var(--line); }
      .tr { display: grid; grid-template-columns: 96px 1fr; align-items: baseline; padding: 22px 0 20px; border-bottom: 3px solid var(--line); font-size: 42px; line-height: 1.16; font-weight: 650; letter-spacing: -0.015em; }
      .tr .ts { text-wrap: balance; }
      .tr .tn { font-family: "DM Mono"; font-weight: 500; font-size: 32px; color: var(--a); }
      .tr.b-start, .tr.b-mid { border-bottom: 0; padding-bottom: 6px; }
      .tr.b-mid, .tr.b-end { padding-top: 6px; }
      .tnote { font-family: "Instrument Serif"; font-style: italic; font-size: 48px; line-height: 1.1; color: var(--a); padding: 4px 0 22px 96px; border-bottom: 3px solid var(--line); text-wrap: balance; }
    </style>`,

  bars: s => {
    const max = Math.max(...s.rows.map(r => r.v));
    return `
    <div class="main">
      ${disp(s.title, 112, 'width:600px', 'title')}
      <div${M('bars')} style="margin-top:130px">${s.rows.map((r, i) => `
        <div style="margin-bottom:46px">
          <div style="display:flex;align-items:baseline;gap:24px">
            ${mono(r.n, 'width:150px;color:var(--mid)', `rows.${i}.n`)}
            <span${KP(`rows.${i}.s`)} style="font-weight:700;font-size:40px;flex:1;letter-spacing:-0.01em;${r.accent ? 'color:var(--a)' : ''}">${esc(r.s)}</span>
            ${mono(r.label, r.accent ? 'color:var(--a)' : 'color:var(--sub)', `rows.${i}.label`)}
          </div>
          <div style="margin-top:18px;height:60px;width:${(r.v / max * 100).toFixed(1)}%;background:${r.accent ? 'var(--a)' : '#6B6B73'}"></div>
        </div>`).join('')}
      </div>
      <p class="body push"${K('body')} style="width:900px">${md(s.body)}</p>
    </div>
    ${pol(s.polaroid, { x: 752, y: 112, w: 230, h: 250, rot: 5 }, PK('polaroid'))}`;
  },

  shelves: s => {
    const blocks = [[40, 150, 120, -12], [210, 110, 170, 8], [110, 270, 150, 5], [262, 330, 110, -9], [40, 420, 170, 10], [230, 470, 130, -4]];
    const blk = (x, y, w, r) => `<span class="blk" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${r}deg)"></span>`;
    const shelfY = [200, 340, 480];
    return `
    <div class="main">
      ${disp(s.title, 116, '', 'title')}
      <div${M('panels')} style="display:flex;gap:40px;margin-top:56px">
        <div class="panel">${mono(s.left, 'position:absolute;left:28px;top:26px;color:var(--mid)', 'left')}${blocks.map(b => blk(...b)).join('')}</div>
        <div class="panel">${mono(s.right, 'position:absolute;left:28px;top:26px;color:var(--a)', 'right')}
          ${shelfY.map((y, i) => `<div class="shelf" style="top:${y}px"></div>${mono(s.shelves[i], `position:absolute;right:28px;top:${y - 52}px;color:var(--mid)`, `shelves.${i}`)}
            ${blk(28, y - 46, 70, 0)}${blk(108, y - 46, 110, 0)}`).join('')}
        </div>
      </div>
      <p class="push bal"${K('quote')} style="font-family:'Instrument Serif';font-style:italic;font-size:64px;line-height:1.08;letter-spacing:-0.01em;color:var(--fg)">${md(s.quote)}</p>
    </div>
    <style>
      .panel { position: relative; width: 432px; height: 560px; background: var(--chip); }
      .blk { position: absolute; height: 40px; border: 4px solid var(--fg); background: var(--bg); }
      .shelf { position: absolute; left: 28px; right: 28px; height: 6px; background: var(--fg); }
    </style>`;
  },

  checklist: s => `
    <div class="main">
      ${disp(s.title, 108, '', 'title')}
      <div style="margin-top:56px">${rowsHTML(s.rows, { numW: 96, head: 62, sub: 36, pad: '28px 0 26px' })}</div>
      <div class="push" style="display:flex;justify-content:space-between">
        ${mono(s.footLeft, 'color:var(--a)', 'footLeft')}${mono(s.footRight, 'color:var(--mid)', 'footRight')}
      </div>
    </div>`,

  end: s => {
    const isPH = /^\s*\[/.test(s.placeholder);
    const pics = s.polaroid
      ? pol(s.polaroid, { x: 618, y: 350, w: 372, h: 330, rot: 4, pos: '50% 30%' }, PK('polaroid'))
      : pol(s.polaroids[0], { x: 628, y: 600, w: 178, h: 226, rot: -3 }, PK('polaroids.0')) + pol(s.polaroids[1], { x: 820, y: 626, w: 176, h: 226, rot: 4, z: 2 }, PK('polaroids.1'));
    return `
    <div class="main">
      ${disp(s.title, s.polaroid ? 160 : 150, 'margin-top:20px;' + (s.polaroid ? 'width:500px' : ''), 'title')}
      <div class="push"${M('push')} style="width:${s.polaroid ? 560 : 520}px">
        ${mono(s.where, 'color:var(--mid)', 'where')}
        <div class="bal"${KP('video')} data-affix="“|”" style="font-weight:800;font-size:58px;line-height:1.05;letter-spacing:-0.03em;margin-top:16px">“${esc(s.video)}”</div>
        <div style="margin-top:40px"><span class="ph${isPH ? '' : ' real'}"${KP('placeholder')}>${esc(s.placeholder)}</span></div>
        ${isPH ? mono(s.placeholderNote, 'color:var(--mid);margin-top:14px;white-space:nowrap', 'placeholderNote') : ''}
      </div>
    </div>
    ${pics}`;
  },

  /* ---------- LinkedIn ---------- */
  cover: s => `
    <div class="main">
      ${disp(s.title, 190, 'margin-top:14px', 'title')}
      <p class="body push"${K('sub')} style="color:var(--fg);font-size:46px;width:500px;font-weight:600;margin-bottom:10px">${md(s.sub)}</p>
    </div>
    ${pol(s.polaroid, { x: 664, y: 868, w: 318, h: 236, rot: 4, pos: '50% 30%' }, PK('polaroid'))}`,

  compare: s => `
    <div class="main">
      ${disp(s.title, 104, '', 'title')}
      <div class="cmp"${M('table')} style="margin-top:80px">
        <div class="ch">${mono(s.cols[0], '', 'cols.0')}${mono(s.cols[1], 'color:var(--a)', 'cols.1')}</div>
        ${s.rows.map((r, i) => `<div class="cr">${mono(r.k, 'color:var(--mid);margin-bottom:16px', `rows.${i}.k`)}
          <div class="cc"><span${K(`rows.${i}.a`)} style="color:var(--mid)">${md(r.a)}</span><span${K(`rows.${i}.b`)}>${md(r.b)}</span></div></div>`).join('')}
      </div>
    </div>
    <style>
      .cmp .ch, .cmp .cc { display: grid; grid-template-columns: 1fr 1fr; column-gap: 48px; }
      .cmp .ch { padding-bottom: 22px; border-bottom: 3px solid var(--fg); }
      .cmp .cr { padding: 30px 0 34px; border-bottom: 3px solid var(--line); }
      .cmp .cc { font-size: 42px; line-height: 1.2; font-weight: 700; letter-spacing: -0.015em; }
      .cmp .cc span { text-wrap: balance; }
    </style>`,

  step: s => stepHead(s) + `
      <div class="serif"${K('word')} style="font-size:150px;line-height:1;margin-top:56px">${md(s.word)}</div>
      <p class="body"${K('meaning')} style="margin-top:22px;width:560px;font-size:40px">${md(s.meaning)}</p>
      <p class="bal"${K('guess')} style="font-size:44px;line-height:1.2;font-weight:750;letter-spacing:-0.015em;border-top:3px solid var(--line);padding-top:30px;margin-top:70px">${md(s.guess)}</p>
    </div>
    ${pol(s.polaroid, { x: 724, y: 452, w: 258, h: 262, rot: 4 }, PK('polaroid'))}`,

  'step-bars': s => {
    const col = r => r.accent ? 'var(--a)' : (r === s.rows[0] ? 'var(--fg)' : '#8F8A82');
    return stepHead(s) + `
      ${mono(s.example, 'color:var(--mid);margin-top:54px', 'example')}
      <div style="display:flex;gap:6px;margin-top:26px;height:96px">${s.rows.map(r => `<div style="flex:${r.v};background:${col(r)}"></div>`).join('')}</div>
      <div${M('legend')} style="margin-top:18px">${s.rows.map((r, i) => `<div style="display:grid;grid-template-columns:30px 150px 1fr auto;align-items:center;gap:20px;padding:14px 0;border-bottom:2px solid var(--line)">
        <i style="display:block;width:30px;height:30px;background:${col(r)}"></i>${mono(r.n, 'color:var(--mid)', `rows.${i}.n`)}
        <span${KP(`rows.${i}.s`)} style="font-size:38px;font-weight:700;letter-spacing:-0.01em">${esc(r.s)}</span>${mono(r.label, '', `rows.${i}.label`)}</div>`).join('')}</div>
      <div class="push bal"${K('takeaway')} style="font-weight:800;font-size:54px;line-height:1.1;letter-spacing:-0.03em">${md(s.takeaway).replace(/class="serif"/g, 'class="serif" style="font-size:1.18em;color:var(--a)"')}</div>
    </div>`;
  },

  'step-meter': s => stepHead(s) + `
      ${mono(s.meterLabel, 'color:var(--mid);margin-top:54px', 'meterLabel')}
      ${s.meters.map((m, i) => `<div style="margin-top:26px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">${mono(m.k, m.accent ? 'color:var(--a)' : 'color:var(--sub)', `meters.${i}.k`)}${m.v ? mono(m.v, 'color:var(--a)', `meters.${i}.v`) : ''}</div>
        ${meterBar(20, m.on, m.accent)}</div>`).join('')}
      <p class="bal"${K('quote')} style="font-family:'Instrument Serif';font-style:italic;font-size:58px;line-height:1.08;margin-top:40px">${md(s.quote)}</p>
      <p class="body push"${K('note')} style="font-size:36px;width:900px">${md(s.note)}</p>
    </div>
    <style>
      .mbar { display: flex; gap: 6px; margin-top: 14px; padding: 8px; border: 4px solid var(--mid); }
      .mbar.hi { border-color: var(--a); }
      .mbar i { flex: 1; height: 36px; border: 2px solid var(--line); }
      .mbar i.on { background: var(--mid); border-color: var(--mid); }
      .mbar.hi i.on { background: var(--a); border-color: var(--a); }
    </style>`,

  'step-guess': s => stepHead(s) + `
      <div class="qcard"${M('card')}>
        <div class="qh">${mono(s.example, '', 'example')}</div>
        ${s.questions.map((q, i) => `<div class="qr"><span class="mono" style="font-size:32px;color:var(--a);width:84px;flex:none">Q${i + 1}</span><span${KP(`questions.${i}`)}>${esc(q)}</span></div>`).join('')}
      </div>
      <p class="push bal"${K('takeaway')} style="font-size:42px;line-height:1.25;font-weight:650;letter-spacing:-0.01em">${md(s.takeaway)}</p>
    </div>
    <style>
      .qcard { margin-top: 50px; background: var(--card); box-shadow: 0 0 0 3px var(--fg); }
      .qh { background: #DED8CD; padding: 16px 26px; border-bottom: 3px solid var(--fg); }
      .qr { display: flex; align-items: baseline; padding: 18px 26px; font-size: 38px; font-weight: 700; letter-spacing: -0.01em; border-bottom: 2px solid var(--line); }
      .qr:last-child { border-bottom: 0; }
    </style>`,

  uses: s => `
    <div class="main">
      ${disp(s.title, 116, '', 'title')}
      <div style="margin-top:64px">${rowsHTML(s.rows, { numW: 96, head: 58, sub: 36, pad: '30px 0 28px' })}</div>
      <p class="body push"${K('note')} style="width:880px">${md(s.note)}</p>
    </div>`,
};
function stepHead(s) {
  return `
    <div class="main" style="top:118px">
      <div style="display:flex;align-items:flex-end;gap:34px">
        <div class="disp" style="font-size:220px;line-height:.74;color:var(--a);letter-spacing:-0.05em">${pad2(s.step)}</div>
        ${mono(`Step ${s.step} of ${s.of}`, 'color:var(--mid);padding-bottom:4px')}
      </div>
      ${disp(s.title, 108, 'margin-top:40px', 'title')}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:30px;width:880px">${md(s.lede)}</p>` : ''}`;
}

/* ---------- page ---------- */
function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  // text on an accent ground: light on a dark accent (blue, ink), ink on a light one (orange, green, paper)
  const lum = (hex) => { const v = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const onBlue = lum(C.accent) < 0.2;
  const vars = `--W:${C.width}px;--H:${C.height}px;--acc:${C.accent};--accInk:${C.accentOnInk || C.accent};` +
    (onBlue ? '--onAcc:#F1F4FF;--onAccMid:rgba(241,244,255,.74);--onAccLine:rgba(241,244,255,.3);--onAccAcc:#FF4713;'
            : '--onAcc:#111114;--onAccMid:rgba(17,17,20,.66);--onAccLine:rgba(17,17,20,.3);--onAccAcc:#FFFDF6;');
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  // a custom ground colour from the studio's colour picker: "groundColor": "#RRGGBB" next to "ground" (ink or paper,
  // whichever text colour reads better on it). Hairlines and muted text follow the text colour. No groundColor = as before.
  const groundStyle = (s) => {
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return '';
    const t = s.ground === 'ink' ? '237,233,226' : '17,17,20';
    return ` style="--bg:${s.groundColor};--mid:rgba(${t},.68);--line:rgba(${t},.3)"`;
  };
  const slides = C.slides.map((s, i) => {
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    return `<section class="slide g-${s.ground} l-${s.layout}" id="s${i + 1}"${groundStyle(s)}>
  ${s.step || !s.corner ? '' : `<div class="corner"${KP('corner')}>${esc(s.corner)}</div>`}
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span><span class="meter">${meter}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{${vars}}
.grid { position:absolute; inset:0; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='135'%3E%3Cpath d='M0 .5H135M.5 0V135' stroke='${onBlue ? '%23F1F4FF' : '%23111114'}' stroke-opacity='.26' fill='none'/%3E%3C/svg%3E") -1px -1px; }
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

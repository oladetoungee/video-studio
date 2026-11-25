/* Studio runtime, part 2: the house design system (Gbemi's decks + the pocketsflow reference), shared by every film.
 *
 *   grounds  paper #EDE9E2 · ink #111114 · card #FFFDF6 · full-bleed electric blue #1B3FD8 (punchlines)
 *   accent   electric blue (on ink: #6E8CFF, her deck's "blue as text in dark"); safety orange #FF4713 very rarely
 *   type     Bricolage Grotesque 800 (display, uppercase, tight) · Archivo (sentences/body) ·
 *            DM Mono (labels, numbers, corners) · Instrument Serif italic (one elegant accent word)
 * Flat grounds only: no gradients, glows, vignettes, particles, textures, or drama shadows.
 *
 * A film can override any of these after this file loads (e.g. C.blue = '...') but should not need to.
 */
'use strict';
const C = {
  paper: '#EDE9E2', ink: '#111114', card: '#FFFDF6', panel: '#DED8CD', mid: '#6C6A66', line: '#CEC6B8',
  blue: '#1B3FD8', blueT: '#6E8CFF', orange: '#FF4713', onBlue: '#F1F4FF',
  inkMid: '#8A8780', inkLine: '#2B2B31', inkPanel: '#1E1E23',
  // scene neutrals (placeholder blocks, spines, bars) that used to be literals in the reading-stack scenes
  stone: '#BDB6AA', inkStone: '#5C5A56', block: '#DDD6CA', block2: '#CFC8BB', block3: '#E6E0D5', dash: '#C9C1B3', bar: '#D8D1C4', inkPerson: '#55545C', field: '#D2CBBE',
  // fixed in both modes (never swapped): the punchline blue (wipes into a blue screen), a photo's white frame + its caption ink
  punch: '#1B3FD8', onPunch: '#F1F4FF', photo: '#FFFDF6', photoInk: '#111114',
};
// ground -> palette for everything drawn on it. mode: the designed mode (the light / dark switch offers the other one);
// altKey: the ground a screen matches once switched (same look on both sides of a join = whip, else a hard cut).
// blue has no mode: a full-bleed colour punchline keeps its colour (no alternative).
const G = {
  paper: { bg: C.paper, fg: C.ink, mid: C.mid, line: C.line, acc: C.blue, card: C.card, panel: C.panel, grid: 'rgba(17,17,20,0.11)', mode: 'light', altKey: 'ink' },
  card:  { bg: C.card, fg: C.ink, mid: C.mid, line: C.line, acc: C.blue, card: C.paper, panel: C.panel, grid: 'rgba(17,17,20,0.10)', mode: 'light' },
  ink:   { bg: C.ink, fg: C.paper, mid: C.inkMid, line: C.inkLine, acc: C.blueT, card: C.card, panel: C.panel, grid: 'rgba(237,233,226,0.12)', mode: 'dark', altKey: 'paper' },
  blue:  { bg: C.blue, fg: C.onBlue, mid: 'rgba(241,244,255,0.72)', line: 'rgba(241,244,255,0.28)', acc: C.onBlue, card: C.card, panel: C.panel, grid: 'rgba(241,244,255,0.32)' },
};
let g = G.paper;              // current ground palette (set per scene)

/* light / dark (core.js themeMap: colours by role on a switched screen; anything not listed keeps its colour)
 * A paper screen switched to dark: ground -> ink #111114; cards -> #24242A with a hairline; an ink slab (the emphasis) -> paper
 * with ink text (a big ink object on a card, a video player, stays dark); deep blue blocks stay #1B3FD8; ink text -> paper, blue text -> #6E8CFF (her deck's "blue on dark"),
 * mid #6C6A66 -> #9A968E (5.2:1 on the lifted cards), hairlines -> inkLine. Text on blue or on slabs (paper / card coloured) keeps its colour.
 * An ink screen switched to light: ground -> paper; ink things on it (a phone, a video player) stay a dark #2A2A30; its white cards stay white (with a hairline); paper text -> ink; light slabs
 * -> white cards with an ink outline; inkMid text -> #67655F (4.8:1 on paper); blueT -> blue. Orange, photos, flags stay. */
themeMap('dark', 'surface', [[C.paper, C.ink], [C.card, '#24242A'], [C.panel, '#2C2C33'], [C.ink, C.paper], [C.mid, '#4A4945'], [C.line, '#2E2E34'],
  [C.stone, '#5C5A56'], [C.block, '#3A3A40'], [C.block2, '#444349'], [C.block3, '#303036'], [C.dash, '#4A4A52'], [C.bar, '#34343B'], [C.field, '#3A3B42']]);
themeMap('dark', 'mark', [[C.ink, C.paper], [C.mid, '#9A968E'], [C.line, C.inkLine], [C.blue, C.blueT], [C.stone, '#77756F'], [C.panel, '#3A3A41'],
  [C.block, '#3A3A41'], [C.block2, '#46464D'], [C.block3, '#34343B'], [C.dash, '#55555D'], [C.bar, '#3A3A41'], [C.field, '#4A4B52']]);
themeMap('dark', 'ground', [[C.paper, C.ink], [C.card, '#18181B']]);
themeMap('light', 'ground', [[C.ink, C.paper]]);
themeMap('dark', 'mark', [[C.inkMid, '#A19D95']]);   // muted text on a lifted slab (5.3:1)
themeMap('dark', 'nested', [[C.ink, '#111114']]);   // a big ink object on a white card (a video player) stays dark
THEME.nestOn = [C.card];
themeMap('light', 'surface', [[C.ink, '#2A2A30'], [C.paper, C.card], [C.inkPanel, C.card], [C.inkLine, C.line], [C.inkMid, C.block2], [C.blueT, C.blue],
  [C.inkStone, C.stone], [C.inkPerson, '#B5AFA4'], ['#2A2A31', C.card]]);
themeMap('light', 'mark', [[C.paper, C.ink], [C.inkMid, '#67655F'], [C.inkLine, C.line], [C.inkPanel, C.line], [C.blueT, C.blue], [C.inkStone, C.stone], [C.inkPerson, '#B5AFA4']]);
THEME.edges.light = [{ col: C.card, line: 'rgba(17,17,20,0.55)' }, { col: C.paper, line: 'rgba(17,17,20,0.55)' }];
THEME.text = [C.paper, C.ink];   // the contrast guard's light and dark text
THEME.edges.dark = [{ col: C.card, line: 'rgba(237,233,226,0.22)' }];
/** the drawn ground reads light right now (designed paper / card, or a screen switched to light) */
const groundLight = () => (THEME.alt ? g.mode === 'dark' : g === G.paper || g === G.card);

const F = {
  disp: (s) => `800 ${s}px "Bricolage Grotesque"`,
  body: (s, w = 700) => `${w} ${s}px Archivo`,
  mono: (s, w = 500) => `${w} ${s}px "DM Mono"`,
  serif: (s) => `italic 400 ${s}px "Instrument Serif"`,
  serifR: (s) => `400 ${s}px "Instrument Serif"`,
};
const LS = { disp: -0.03, body: -0.012, mono: 0.16, serif: -0.01 };   // letter-spacing, em
// font faces the boot step waits for (files in library/fonts, declared in runtime/fonts.css)
const HOUSE_FONTS = ['800 40px "Bricolage Grotesque"', '700 40px Archivo', '600 40px Archivo', '500 40px Archivo', '400 40px "DM Mono"', '500 40px "DM Mono"', 'italic 400 40px "Instrument Serif"', '400 40px "Instrument Serif"'];

/* ---------- labels ---------- */
const MONO_PORTRAIT = 1.12;   // mono labels read a touch bigger on a phone
function _mono(s, x, y, size, col, align, o) {
  _txt(o.lower ? s : s.toUpperCase(), x, y, F.mono(size, o.w || 500), col, align, o.base || 'alphabetic', size * (o.ls == null ? LS.mono : o.ls));
}
/** DM Mono label: uppercase, letter-spaced (her corner labels / eyebrows). Editable (key = text, or o.key).
 *  In portrait it grows slightly and wraps onto more lines if it would leave the frame. o.raw: not editable. */
function mono(s, x, y, size = 24, col = g.mid, align = 'left', o = {}) {
  if (o.raw) return _mono(s, x, y, size, col, align, o);
  const ov = ovr(o.key || s); const str = ov.s != null ? ov.s : s;
  if (PORTRAIT && !o.fixed) size = Math.round(size * MONO_PORTRAIT);
  const font = F.mono(size, o.w || 500), ls = size * (o.ls == null ? LS.mono : o.ls); const U = (x_) => (o.lower ? x_ : x_.toUpperCase());
  let lines = [str];
  const av = o.maxW || availW(x, align);
  if ((PORTRAIT || ov.s != null || o.maxW) && tw(U(str), font, ls) > av) {   // wrap
    lines = []; let cur = '';
    for (const w of str.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(U(nx), font, ls) > av) { lines.push(cur); cur = w; } else cur = nx; }
    if (cur) lines.push(cur);
  }
  const lh = size * 1.45; const wMax = Math.max(...lines.map(l => tw(U(l), font, ls)));
  const bx = align === 'center' ? x - wMax / 2 : align === 'right' ? x - wMax : x;
  const box = [bx, y - size * 0.8, wMax, (lines.length - 1) * lh + size * 1.05];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: s }); return; }
  moved(ov, () => { lines.forEach((ln, k) => _mono(ln, x, y + k * lh, size, col, align, o)); regBox(ov, ...box, { text: str, def: s }); });
}
function monoW(s, size = 24, o = {}) { if (PORTRAIT && !o.fixed && !o.raw) size = Math.round(size * MONO_PORTRAIT); return tw(o.lower ? s : s.toUpperCase(), F.mono(size, o.w || 500), size * (o.ls == null ? LS.mono : o.ls)); }

/* ---------- components ---------- */
// grid lines (her UBER / 404 slides): 160 px, hairline
function grid(col = g.grid, step = 160) { ctx.fillStyle = col; for (let x = step; x < W; x += step) ctx.fillRect(x, 0, 1, H); for (let y = step; y < H; y += step) ctx.fillRect(0, y, W, 1); }

// eyebrow label (mono, top of a composition)
function eyebrow(t, t0, s, x, y, o = {}) { const p = prog(t, t0, 0.3); if (p <= 0) return; withA(p, () => mono(s, x, y, o.size || 26, o.col || g.mid, o.align || 'left', { ls: 0.24 })); }
/** a centred sentence in Archivo (her "THE QUESTION" slide) */
function sent(t, o) { return KT(t, { font: 'body', align: 'center', x: CX, lh: 1.18, ...o }); }

/** Index list (her numbered rows): mono number in accent + uppercase line + hairline rule.
 * rows: [{n, s, tin, sub, strike, dim, tag, size}], o: x, y (baseline of first row), w, rowH, size, focus(t)->idx|-1, font.
 * Each row is one editable element (text = r.s; drag moves the whole row). In portrait, long rows wrap onto two lines (then shrink if needed). */
function IDX(t, rows, o) {
  const x = o.x == null ? L : o.x, w = o.w || W - 2 * x, rowH = o.rowH || 118; const nx = o.numW == null ? 125 : o.numW;
  const focus = o.focus ? o.focus(t) : -1; const kind = o.font || 'disp';
  rows.forEach((r, i) => {
    let size = r.size || o.size || 76;
    const y = o.y + i * rowH; const p = prog(t, r.tin, 0.34); if (p <= 0 && !o.ghost) return;
    const ov = ovr(r.key || r.s); const s0 = ov.s != null ? ov.s : r.s;
    const f0 = kind === 'disp' ? F.disp(size) : F.body(size, o.weight || 700); const s = kind === 'disp' ? s0.toUpperCase() : s0;
    const lsOf = (sz) => sz * (kind === 'disp' ? LS.disp : LS.body), fOf = (sz) => (kind === 'disp' ? F.disp(sz) : F.body(sz, o.weight || 700));
    let lines = [s];
    if (PORTRAIT || ov.s != null) { // fit the line into the row (next to a right-hand sub, if any): wrap onto two lines, then shrink
      const subW = r.sub && !o.subBelow ? monoW(r.sub, o.subSize || 24) + 30 : 0; const av = w - nx - subW;
      if (tw(s, fOf(size), lsOf(size)) > av && o.wrap !== false && s.includes(' ')) {
        const ws = s.split(' '); let best = null;
        for (let k = 1; k < ws.length; k++) { const a = ws.slice(0, k).join(' '), b = ws.slice(k).join(' '); const m = Math.max(tw(a, fOf(size), lsOf(size)), tw(b, fOf(size), lsOf(size))); if (!best || m < best.m) best = { m, l: [a, b] }; }
        lines = best.l;
      }
      const tw0 = Math.max(...lines.map(l => tw(l, fOf(size), lsOf(size)))); if (tw0 > av) size = Math.floor(size * av / tw0);
    }
    const lh = size * (kind === 'disp' ? 0.95 : 1.12), extra = (lines.length - 1) * lh;
    const ruleY = y + extra + (o.ruleDy == null ? size * 0.34 : o.ruleDy);
    const box = [x, y - size * 0.9, w, ruleY - y + size * 0.9 + 4];
    if (ov.hide) { regBox(ov, ...box, { text: s0, def: r.s }); return; }
    moved(ov, () => {
      let a = 1; if (focus !== -1 && focus !== i && !(Array.isArray(focus) && focus.includes(i))) a = o.dimA == null ? 0.22 : o.dimA;
      if (r.dim != null) a *= 1 - 0.78 * prog(t, r.dim, 0.3);
      // rule
      const rp = E.outExpo(prog(t, r.tin - 0.05, 0.6)); if (o.ghost && p <= 0) { hline(x, ruleY, w, 1, g.line, 3); return; }
      if (o.rules !== false) hline(x, ruleY, w, rp, o.ruleCol || g.line, 3);
      withA(a, () => {
        const e = E.outExpo(p); const b = 10 * (1 - E.outCubic(p));
        withA(clamp(p * 2.4), () => withBlur(b, () => {
          mono(r.n, x, y - (o.numUp || 0), o.numSize || 34, r.numCol || g.acc, 'left', { ls: 0.06, raw: true });
          const f = kind === 'disp' ? F.disp(size) : F.body(size, o.weight || 700);
          lines.forEach((ln, k) => _txt(ln, x + nx, y + k * lh + size * 0.1 * (1 - e), f, r.col || g.fg, 'left', 'alphabetic', size * (kind === 'disp' ? LS.disp : LS.body)));
          if (r.sub) { if (o.subBelow) mono(r.sub, x + nx + 2, y + extra + (o.subDy || 50), o.subSize || 24, g.mid, 'left'); else mono(r.sub, x + w, y, o.subSize || 24, g.mid, 'right'); }
        }));
        if (r.strike != null) lines.forEach((ln, k) => { const tw0 = tw(ln, kind === 'disp' ? F.disp(size) : F.body(size, o.weight || 700), size * (kind === 'disp' ? LS.disp : LS.body)); strikeBar(x + nx, y + k * lh - size * 0.34, tw0, prog(t, r.strike, 0.35), o.strikeCol || C.orange, Math.max(8, size * 0.12)); });
      });
      if (r.tag) { const tp = prog(t, r.tag.t, 0.3); if (tp > 0) withA(tp, () => { if (o.subBelow) mono(r.tag.s, x + nx + 2 + (r.sub ? monoW(r.sub, o.subSize || 24) + 40 : 0), y + extra + (o.subDy || 50), o.subSize || 24, r.tag.col || g.acc, 'left'); else mono(r.tag.s, x + w, y, 24, r.tag.col || g.acc, 'right'); }); }
      regBox(ov, ...box, { text: s0, def: r.s });
    });
  });
}

// browser window (her 404 cards / "YOU ARE IN YOUR BROWSER"): panel header, three dots, address field. Movable (key o.key || url).
function browser(x, y, w, h, o = {}) {
  grp(o.key || ('browser ' + (o.url || '')), x, y, w, h, () => {
    const hh = o.hh || 64; const border = o.border == null ? (g === G.paper ? 4 : 0) : o.border;
    rect(x, y, w, h, C.card); rect(x, y, w, hh, C.panel); rect(x, y + hh, w, 4, C.ink);
    for (let i = 0; i < 3; i++) circle(x + 30 + i * 22, y + hh / 2, 6, C.ink);
    const ax = x + 112, aw = w - 140;
    if (o.url != null || o.field) {
      rect(ax, y + 12, aw, hh - 24, C.card); strokeR(ax, y + 12, aw, hh - 24, C.ink, 3);
      if (o.url != null) {
        if (o.typeT0 != null) typeText(o.t, o.typeT0, o.url, ax + 20, y + hh / 2 + 1, F.mono(24, 500), C.ink, { base: 'middle', cps: o.cps || 20, caretTo: o.caretTo });
        else txt(o.url, ax + 20, y + hh / 2 + 1, F.mono(24, 500), C.ink, 'left', 'middle');
      }
    } else rect(ax, y + hh / 2 - 7, aw, 14, C.field);
    if (border) strokeR(x, y, w, h, C.ink, border);
    if (o.body) { ctx.save(); ctx.beginPath(); ctx.rect(x, y + hh + 4, w, h - hh - 4); ctx.clip(); o.body(x, y + hh + 4, w, h - hh - 4); ctx.restore(); }
  });
}
// placeholder text bar (her grey lines in the UI cards)
function lbar(x, y, w, h = 14, col = C.bar) { rect(x, y, w, h, col); }

// polaroid insert (her pasted prints): card frame, photo, mono caption in the bottom margin. Movable (key o.key || caption).
function polaroid(img, cx, cy, w, rot, caption, o = {}) {
  const pad = o.pad || Math.round(w * 0.045), bot = o.bot || Math.round(w * 0.16); const ih = o.ih || Math.round((w - pad * 2) * (img ? img.height / img.width : 1.2));
  const h = pad + ih + bot;
  grp(o.key || ('photo ' + (caption || '')), cx - w / 2, cy - h / 2, w, h, () => withT(cx, cy, o.s == null ? 1 : o.s, rot, () => themeFixed(() => {   // a print: same in both modes
    rect(-w / 2, -h / 2, w, h, C.photo);   // a print stays white in both modes
    if (groundLight()) strokeR(-w / 2, -h / 2, w, h, 'rgba(17,17,20,0.16)', 2);
    if (img) ctx.drawImage(img, 0, o.crop ? o.crop[0] * img.height : 0, img.width, (o.crop ? o.crop[1] - o.crop[0] : 1) * img.height, -w / 2 + pad, -h / 2 + pad, w - pad * 2, ih);
    const cs = o.capSize || Math.max(16, w * 0.042);
    if (caption && o.capType) typeText(o.capType.t, o.capType.t0, caption.toUpperCase(), -w / 2 + pad + 2, h / 2 - bot * 0.38, F.mono(cs, 500), C.photoInk, { cps: 24, ls: cs * 0.12, caretTo: o.capType.caretTo });
    else if (caption) mono(caption, -w / 2 + pad + 2, h / 2 - bot * 0.38, cs, C.photoInk, 'left', { ls: 0.12, fixed: true, maxW: PORTRAIT ? w - pad * 2 : undefined });
  })), { img: true });
  return h;
}
function polaroidIn(t, t0, img, cx, cy, w, rot, caption, o = {}) {
  const p = prog(t, t0, 0.55); if (p <= 0) return; const e = E.outQuint(p);
  withA(clamp(p * 3), () => polaroid(img, cx, cy + (o.from == null ? 180 : o.from) * (1 - e), w, rot + (o.spin == null ? 0.12 : o.spin) * (1 - e), caption, o));
}

// flat typographic book (no photo): a card with the title set in her type system. Movable.
function bookCard(x, y, w, h, o = {}) {
  grp(o.key || ('book ' + (o.title || []).join(' ')), x, y, w, h, () => {
    rect(x, y, w, h, o.bg || C.card); if (o.border !== false) strokeR(x, y, w, h, o.borderCol || C.ink, o.bw || 4);
    if (o.band) rect(x, y, w, h * 0.1, o.band);
    const pad = w * 0.09; const ts = o.ts || w * 0.13;
    (o.title || []).forEach((ln, i) => txt(ln.toUpperCase(), x + pad, y + h * 0.1 + pad + ts * 0.95 * (i + 1), F.disp(ts), o.fg || C.ink, 'left', 'alphabetic', ts * LS.disp));
    if (o.author) mono(o.author, x + pad, y + h - pad, Math.max(14, w * 0.05), o.fg || C.ink, 'left', { ls: 0.12, fixed: true });
  });
}

// mouse cursor (arrow), with click pulse
function cursorAt(t, path, clicks = []) { // path: [[t,x,y],...]
  if (!path.length || t < path[0][0]) return null;
  let x = path[0][1], y = path[0][2];
  for (let i = 1; i < path.length; i++) { const [t1, x1, y1] = path[i]; const [t0, x0, y0] = path[i - 1]; if (t >= t1) { x = x1; y = y1; } else if (t > t0) { const e = E.inOutQuart((t - t0) / (t1 - t0)); x = lerp(x0, x1, e); y = lerp(y0, y1, e); break; } else break; }
  let s = 1; for (const c of clicks) { const d = t - c; if (d >= 0 && d < 0.35) { s = 1 - 0.14 * Math.sin(Math.PI * clamp(d / 0.16)); withA(1 - d / 0.35, () => { ctx.beginPath(); ctx.arc(x, y, 10 + 34 * E.outCubic(d / 0.35), 0, Math.PI * 2); ctx.strokeStyle = g === G.ink ? C.paper : C.ink; ctx.lineWidth = 2.5; ctx.stroke(); }); } }
  withT(x, y, s * 1.25, 0, () => {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 34); ctx.lineTo(8, 26); ctx.lineTo(14, 40); ctx.lineTo(20, 37); ctx.lineTo(14, 24); ctx.lineTo(25, 24); ctx.closePath();
    ctx.fillStyle = C.ink; ctx.fill(); ctx.strokeStyle = C.card; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
  });
  return { x, y };
}

// checkbox (square, her UI style)
function checkbox(x, y, s, on, col = g.acc) {
  if (on > 0) { rect(x, y, s, s, col); ctx.save(); ctx.strokeStyle = C.card; ctx.lineWidth = s * 0.14; ctx.lineCap = 'square'; ctx.beginPath();
    const p = clamp(on); ctx.moveTo(x + s * 0.24, y + s * 0.52); const mx = x + s * 0.43, my = y + s * 0.7; if (p < 0.5) ctx.lineTo(lerp(x + s * 0.24, mx, p * 2), lerp(y + s * 0.52, my, p * 2)); else { ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, x + s * 0.78, (p - 0.5) * 2), lerp(my, y + s * 0.3, (p - 0.5) * 2)); } ctx.stroke(); ctx.restore(); }
  else strokeR(x, y, s, s, g === G.ink ? C.inkMid : C.ink, 3);
}

/** meter (her "IN FLIGHT" bar): outlined box, fill, mono labels above/below. Movable (key o.key || label). */
function meter(t, x, y, w, h, frac, o = {}) {
  grp(o.key || ('meter ' + (o.label || '')), x, y - 50, w, h + 50 + (o.foot || o.footR ? 60 : 0), () => {
    const col = o.col || g.acc;
    if (o.label) mono(o.label, x, y - 22, 26, g.mid, 'left', { ls: 0.2 });
    if (o.value != null) mono(String(o.value), x + w, y - 22, 30, col, 'right', { ls: 0.06, raw: true });
    strokeR(x, y, w, h, col, 4);
    if (o.cells) { const n = o.cells, cw = (w - 40) / n; const on = Math.round(n * frac); for (let i = 0; i < n; i++) { const cx = x + 20 + i * cw; if (i < on) rect(cx + 3, y + 18, cw - 6, h - 36, col); else strokeR(cx + 3, y + 18, cw - 6, h - 36, g.mid, 2); } }
    else rect(x + 12, y + 12, (w - 24) * clamp(frac), h - 24, col);
    if (o.foot) mono(o.foot, x, y + h + 42, 26, g.mid, 'left', { ls: 0.2 });
    if (o.footR) mono(o.footR, x + w, y + h + 42, 28, col, 'right', { ls: 0.08 });
  });
}

/* ---------- HUD (corners, like her reference: "// 03 — store"  ·  "POCKETSFLOW 00:00:06:52") ---------- */
let HUD_TITLE = '';
function timecode(t) { const f = Math.floor(t * FPS + 1e-6); const ff = f % FPS, s = Math.floor(f / FPS); const p = n => String(n).padStart(2, '0'); return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(ff)}`; }
function hud(t, label) {
  const col = g === G.blue ? 'rgba(241,244,255,0.78)' : g.mid;
  const y = PORTRAIT ? SAFE.hudY : 62, xl = PORTRAIT ? L : 60, xr = W - (PORTRAIT ? L : 60);
  if (label) _txt(label, xl, y, F.mono(22, 500), col, 'left', 'alphabetic', 22 * 0.04);
  if (HUD_TITLE) _txt(HUD_TITLE, xr - tw('  ' + timecode(t), F.mono(22, 500), 22 * 0.04), y, F.mono(22, 500), col, 'right', 'alphabetic', 22 * 0.1);
  _txt('  ' + timecode(t), xr, y, F.mono(22, 500), col, 'right', 'alphabetic', 22 * 0.04);
}

/* ======================================================================================================================
 * Additions (Oct 2026, reading-stack content pass). Purely additive: nothing above this line changed.
 *   smear        subframe motion blur for a moving draw (correct frame average, follows any path)
 *   KR           kinetic text, masked rise (words rise out of a line mask), same markup + edits as KT
 *   flood        colour flood: a circle from a point that clears the farthest corner
 *   imgCard      a real photo on a card (crop, rotation), movable
 *   counter      a number that counts between two values (raw, not editable)
 *   spineBlock   a flat typographic book spine
 *   phoneFrame   a generic phone outline with a body callback
 *   bubble       a flat speech bubble (card + tail) with text
 *   pushCam      slow camera push keyed in log space (used by a film's scene wrapper)
 * ==================================================================================================================== */
let _smearCv = null, _accCv = null;
function _offscreen(cv) { if (!cv || cv.width !== CW || cv.height !== CH) { cv = document.createElement('canvas'); cv.width = CW; cv.height = CH; } return cv; }
/** smear(t, draw, o): draw(tt) is called for n sub-times between t - shutter and t and the results are averaged
 *  (premultiplied sum with 'lighter', then composited once), so the blur follows the real path and speed.
 *  o.n samples (default 6), o.shutter seconds (default half a frame), o.on false -> one plain draw. */
function smear(t, draw, o = {}) {
  const n = o.n || 6, sh = o.shutter == null ? 0.5 / FPS : o.shutter;
  if (o.on === false || n < 2 || typeof document === 'undefined') return draw(t);
  _smearCv = _offscreen(_smearCv); _accCv = _offscreen(_accCv);
  const main = ctx, m = main.getTransform(), a0 = main.globalAlpha, f0 = main.filter;
  const acc = _accCv.getContext('2d'), tmp = _smearCv.getContext('2d');
  acc.setTransform(1, 0, 0, 1, 0, 0); acc.globalCompositeOperation = 'source-over'; acc.globalAlpha = 1; acc.clearRect(0, 0, CW, CH);
  const snap = new Map(EL.seen), rec = EL.rec;
  for (let k = 0; k < n; k++) {
    const tt = t - sh * (n - 1 - k) / (n - 1);
    EL.seen.clear(); snap.forEach((v, kk) => EL.seen.set(kk, v)); EL.rec = rec && k === n - 1;
    tmp.setTransform(1, 0, 0, 1, 0, 0); tmp.globalAlpha = 1; tmp.filter = 'none'; tmp.clearRect(0, 0, CW, CH); tmp.setTransform(m); tmp.globalAlpha = 1;
    ctx = tmp; try { draw(tt); } finally { ctx = main; }
    acc.globalCompositeOperation = 'lighter'; acc.globalAlpha = 1 / n; acc.drawImage(_smearCv, 0, 0);
  }
  EL.rec = rec;
  main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.globalAlpha = a0; main.filter = 'none'; main.drawImage(_accCv, 0, 0); main.restore(); main.filter = f0;
}

/** KR: kinetic text with a masked rise (each word rises out of its line's mask, fast in, soft settle). Same options
 *  and markup as KT (*accent*, ~serif~, _dim_, times, t0+stagger, out, mark, fitW); dur default 0.5 s. Editable. */
function KR(t, o) {
  const def = (o.lines || [o.text]).join('\n'); const ov = ovr(o.id || def.replace(/\n/g, ' '));
  if (ov.s != null) o = { ...o, lines: ov.s.split('\n'), text: undefined };
  if (PORTRAIT || ov.s != null || o.fitW) { const Lf = layoutKT(o); const av = o.fitW || availW(o.x, o.align || 'left'); if (Lf.w > av) o = { ...o, size: Math.floor(o.size * av / Lf.w) }; }
  const Lb = layoutKT(o); const align = o.align || 'left';
  const bx = align === 'center' ? o.x - Lb.w / 2 : align === 'right' ? o.x - Lb.w : o.x;
  const box = [bx, o.y - o.size * 0.86, Lb.w, (Lb.lines.length - 1) * Lb.lh + o.size * 1.1];
  const info = { text: (o.lines || [o.text]).join('\n'), def, markup: true };
  if (ov.hide) { regBox(ov, ...box, info); return Lb; }
  return moved(ov, () => { const R = KR_(t, o); if (R.vis) regBox(ov, ...box, info); return R; });
}
function KR_(t, o) {
  const Lo = layoutKT(o); const size = o.size; const align = o.align || 'left';
  const col = o.col || g.fg, acc = o.acc || g.acc; const dur = o.dur || 0.5;
  const out = o.out == null ? Infinity : o.out; const oa = 1 - prog(t, out - 0.2, 0.2); Lo.vis = false; if (oa <= 0) return Lo;
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  Lo.words.forEach((w, i) => {
    const ln = Lo.lines[w.li]; const lx = align === 'center' ? o.x - ln.w / 2 : align === 'right' ? o.x - ln.w : o.x;
    const ti = o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.t0 || 0) + i * (o.stagger == null ? 0.07 : o.stagger);
    if (ti == null || isNaN(ti)) throw new Error('KR: no time for word "' + w.s + '"');
    w.X = lx + w.dx; w.Y = o.y + w.li * Lo.lh; w.t = ti;
    const p = prog(t, ti, w.serif ? dur * 1.3 : dur); if (p <= 0) return; Lo.vis = true;
    const e = E.outExpo(p); const v = (1 - E.outExpo(clamp(p + 0.04))) ; // remaining distance ~ speed proxy
    const fill = w.style === '*' || w.style === '~' ? acc : w.style === '_' ? g.mid : col;
    const mi = o.mark ? o.mark.idx.indexOf(i) : -1; const mt = mi >= 0 ? (o.mark.at ? o.mark.at[mi] : ti + 0.1) : 0; const mp = mi >= 0 ? prog(t, mt, 0.3) : 0;
    ctx.save(); ctx.globalAlpha *= oa;
    if (mi >= 0) marker(w.X - size * 0.06, w.Y - size * 0.78, w.w + size * 0.12, size * 0.9, mp, o.mark.col || acc);
    ctx.beginPath(); ctx.rect(w.X - size * 0.2, w.Y - size * 1.0, w.w + size * 0.4, size * 1.3); ctx.clip();
    setFont(w.font, w.ls); ctx.fillStyle = mp > 0.45 ? (o.mark.fg || g.bg) : fill;
    const dy = size * 1.05 * (1 - e);
    if (v > 0.02) { // vertical motion blur: a few trailing copies along the rise
      for (let k = 8; k >= 1; k--) { ctx.globalAlpha = oa * 0.1 * (1 - k / 9); ctx.fillText(w.s, w.X, w.Y + dy + size * 0.05 * v * k); }
      ctx.globalAlpha = oa;
    }
    ctx.fillText(w.s, w.X, w.Y + dy);
    ctx.restore();
    if (w.serif && o.ul !== false) { const up = prog(t, ti + 0.4, 0.42); withA(oa, () => handLine(w.X + w.w * 0.02, w.Y + size * 0.2, w.w * 0.96, E.outCubic(up), acc, Math.max(4, size * 0.045), i)); }
  });
  return Lo;
}

/** flood(t, t0, x, y, col, d): a solid circle grows from (x, y) and clears the farthest corner at t0 + d. */
function flood(t, t0, x, y, col, d = 0.34) {
  const p = prog(t, t0, d); if (p <= 0) return;
  const R = 1.05 * Math.max(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y)) + 60;
  circle(x, y, R * E.inOutCubic(p), col);
}

/** a real photo on a card: imgCard(img, x, y, w, o) -> height. o: crop [x0,y0,x1,y1] (fractions), pad, rot, s, key,
 *  border (paper grounds: hairline), cap (mono caption under the photo). Movable. */
function imgCard(img, x, y, w, o = {}) {
  const c = o.crop || [0, 0, 1, 1]; const sw = (c[2] - c[0]) * img.width, sh = (c[3] - c[1]) * img.height;
  const pad = o.pad == null ? Math.round(w * 0.035) : o.pad; const ih = o.h ? o.h - pad * 2 : (w - pad * 2) * sh / sw; const h = ih + pad * 2 + (o.cap ? Math.round(w * 0.12) : 0);
  grp(o.key || ('photo ' + (o.cap || img.src.split('/').pop())), x, y, w, h, () => withT(x + w / 2, y + h / 2, o.s == null ? 1 : o.s, o.rot || 0, () => themeFixed(() => {   // a photo card: same in both modes
    if (pad > 0 || o.cap) rect(-w / 2, -h / 2, w, h, o.bg || C.photo);   // a photo's card stays white in both modes
    if (groundLight() && o.border !== false) strokeR(-w / 2, -h / 2, w, h, 'rgba(17,17,20,0.16)', 2);
    ctx.drawImage(img, c[0] * img.width, c[1] * img.height, sw, sh, -w / 2 + pad, -h / 2 + pad, w - pad * 2, ih);
    if (o.cap) mono(o.cap, -w / 2 + pad + 2, h / 2 - Math.round(w * 0.045), Math.max(16, Math.round(w * 0.04)), C.photoInk, 'left', { ls: 0.12, fixed: true, maxW: w - pad * 2 });
  })), { img: true });
  return h;
}

/** counter: draws a number between a and b over [t0, t0 + d] (outExpo), raw (computed) text. fmt(n) -> string. */
function counter(t, t0, d, a, b, x, y, font, col, align = 'left', fmt = (n) => String(n)) {
  const v = Math.round(lerp(a, b, E.outCubic(prog(t, t0, d))));
  _txt(fmt(v), x, y, font, col, align, 'alphabetic', fontPx(font) * (font.includes('Bricolage') ? LS.disp : 0)); return v;
}

/** a flat book spine (horizontal, lying in a stack): bg colour, title in display or mono, author at the right end. */
function spineBlock(x, y, w, h, o = {}) {
  rect(x, y, w, h, o.bg || C.card); if (o.border !== false) strokeR(x, y, w, h, o.borderCol || C.ink, o.bw || 3);
  const fg = o.fg || C.ink;
  if (o.title) { const fs = o.fs || Math.min(h * 0.46, 40); _txt(o.title.toUpperCase(), x + h * 0.5, y + h / 2 + fs * 0.36, o.mono ? F.mono(fs, 500) : F.disp(fs), fg, 'left', 'alphabetic', fs * (o.mono ? 0.14 : LS.disp)); }
  if (o.author) { const fs = Math.min(h * 0.3, 22); _txt(o.author.toUpperCase(), x + w - h * 0.5, y + h / 2 + fs * 0.36, F.mono(fs, 500), fg, 'right', 'alphabetic', fs * 0.14); }
}

/** devicePhone(x, y, w, h, body, o): a REALISTIC generic phone (her note 2026-11-09: "make the phone look realistic", ref = a
 *  product site's phones). Dark metal frame with a light edge + side buttons, thin black bezel, rounded screen, an island pill,
 *  a real status bar (time, signal, wifi, battery) and the home bar. No logo. Same look as library/ui/phone.js (designs).
 *  body(sx, sy, sw, sh, top) draws the screen; top = the status-bar height (start content below it).
 *  o: {screen (colour), dark (white status bar; auto from screen), time ('9:41'), bar (false = no status bar), side (false),
 *      shadow (true)}. Use h ≈ 2.05 × w for real proportions. */
function devicePhone(x, y, w, h, body, o = {}) {
  const R = w * 0.165, bez = w * 0.032, fr = Math.max(2, w * 0.018);
  const scrCol = o.screen || '#FBFBF7';
  const lumOf = (c) => { const m = /^#?([0-9a-f]{6})$/i.exec(c || ''); if (!m) return 1; const n = parseInt(m[1], 16); return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; };
  const dark = o.dark != null ? o.dark : lumOf(scrCol) < 0.45, fg = dark ? '#FFFFFF' : '#000000';
  // side buttons (behind the frame)
  if (o.side !== false) { const bw = Math.max(2, w * 0.012);
    for (const [l, tp, len] of [[1, 0.17, 0.045], [1, 0.255, 0.085], [1, 0.36, 0.085], [0, 0.27, 0.13]]) fillRR(l ? x - fr - bw : x + w + fr - 1, y + h * tp, bw + 1, h * len, bw, '#2E2E33'); }
  // frame: dark metal with a soft light edge, and the drop shadow
  ctx.save();
  if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = w * 0.16; ctx.shadowOffsetY = w * 0.07; }
  const g = ctx.createLinearGradient(x - fr, y - fr, x + w + fr, y + h + fr);
  g.addColorStop(0, '#6A6A70'); g.addColorStop(0.18, '#2A2A2E'); g.addColorStop(0.5, '#3B3B40'); g.addColorStop(0.82, '#1B1B1E'); g.addColorStop(1, '#55555B');
  rr(x - fr, y - fr, w + fr * 2, h + fr * 2, R + fr); ctx.fillStyle = g; ctx.fill(); ctx.restore();
  strokeRR(x - fr, y - fr, w + fr * 2, h + fr * 2, R + fr, 'rgba(255,255,255,0.10)', Math.max(1, fr * 0.35));
  fillRR(x, y, w, h, R, '#060607');                       // glass + bezel
  const sx = x + bez, sy = y + bez, sw = w - bez * 2, sh = h - bez * 2, top = w * 0.15;
  ctx.save(); rr(sx, sy, sw, sh, R - bez); ctx.clip(); rect(sx, sy, sw, sh, scrCol); if (body) body(sx, sy, sw, sh, top);
  // status bar
  let fgc = fg; if (o.autoDark) { try { const m = ctx.getTransform(), q = m.transformPoint(new DOMPoint(sx + sw * 0.5, sy + top * 0.5)); const d = ctx.getImageData(Math.round(q.x), Math.round(q.y), 1, 1).data; fgc = (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) / 255 < 0.45 ? '#FFFFFF' : '#000000'; } catch (e) {} }
  if (o.bar !== false) { const fg = fgc, fs = w * 0.052, by = sy + top * 0.56;
    _txt(o.time || '9:41', sx + w * 0.11, by + fs * 0.36, `600 ${fs}px "Inter Tight", system-ui, sans-serif`, fg, 'left');
    let ix = sx + sw - w * 0.085; const ih = fs * 0.78;
    // battery
    const bw2 = ih * 2.0; ix -= bw2; strokeRR(ix, by - ih / 2, bw2 - ih * 0.18, ih, ih * 0.3, dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', Math.max(1, ih * 0.08));
    fillRR(ix + ih * 0.14, by - ih / 2 + ih * 0.14, bw2 - ih * 0.46, ih * 0.72, ih * 0.18, fg); fillRR(ix + bw2 - ih * 0.12, by - ih * 0.17, ih * 0.12, ih * 0.34, ih * 0.06, fg);
    // wifi (three arcs)
    ix -= ih * 1.55; ctx.save(); ctx.strokeStyle = fg; ctx.lineCap = 'round'; ctx.lineWidth = ih * 0.17;
    for (const rad of [0.95, 0.62]) { ctx.beginPath(); ctx.arc(ix + ih * 0.65, by + ih * 0.42, ih * rad, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(ix + ih * 0.65, by + ih * 0.42, ih * 0.14, 0, Math.PI * 2); ctx.fillStyle = fg; ctx.fill(); ctx.restore();
    // signal bars
    ix -= ih * 1.55; for (let k = 0; k < 4; k++) { const bh = ih * (0.35 + k * 0.215); fillRR(ix + k * ih * 0.3, by + ih / 2 - bh, ih * 0.2, bh, ih * 0.06, fg); } }
  fillRR(x + w / 2 - w * 0.15, sy + w * 0.035 - bez + bez, w * 0.3, w * 0.088, w * 0.044, '#000000');   // island
  fillRR(x + w / 2 - w * 0.17, sy + sh - w * 0.022 - Math.max(3, w * 0.013), w * 0.34, Math.max(3, w * 0.013), 9, fgc === '#FFFFFF' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)');   // home bar
  ctx.restore();
  return { sx, sy, sw, sh, top };
}

/** a generic phone (no brand). Since 2026-11-09 this draws the realistic devicePhone; body(x, y, w, h) draws the screen. */
function phoneFrame(x, y, w, h, body, o = {}) { return devicePhone(x, y, w, h, body, { screen: o.screen || C.card, ...o }); }
function phoneFrameOld(x, y, w, h, body, o = {}) {
  const r = w * 0.15; fillRR(x, y, w, h, r, o.shell || C.ink);
  const ins = w * 0.035; const sx = x + ins, sy = y + ins, sw = w - ins * 2, shh = h - ins * 2;
  ctx.save(); rr(sx, sy, sw, shh, r * 0.8); ctx.clip(); rect(sx, sy, sw, shh, o.screen || C.card); if (body) body(sx, sy, sw, shh); ctx.restore();
  fillRR(x + w / 2 - w * 0.17, y + ins + w * 0.03, w * 0.34, w * 0.075, w * 0.04, o.shell || C.ink);
}

/** a flat speech bubble: card with a tail (side 'l' | 'r'), text in Archivo (wraps to w). Returns the height. */
function bubble(x, y, w, s, o = {}) {
  const fs = o.size || 44, font = F.body(fs, o.weight || 700), padX = fs * 0.6, padY = fs * 0.55, lh = fs * 1.2;
  const words = s.split(' '); const lines = []; let cur = '';
  for (const wd of words) { const nx = cur ? cur + ' ' + wd : wd; if (cur && tw(nx, font) > w - padX * 2) { lines.push(cur); cur = wd; } else cur = nx; } if (cur) lines.push(cur);
  const bw = o.fit ? Math.max(...lines.map(l => tw(l, font))) + padX * 2 : w; const h = padY * 2 + (lines.length - 1) * lh + fs * 0.8;
  const bx = o.side === 'r' ? x + w - bw : x;
  grp(o.key || ('bubble ' + s), bx, y, bw, h, () => {
    const bg = o.bg || C.card, fg = o.fg || C.ink; fillRR(bx, y, bw, h, Math.min(28, h / 2), bg);
    if (o.border) strokeRR(bx, y, bw, h, Math.min(28, h / 2), o.border, 3);
    ctx.beginPath(); const tx = o.side === 'r' ? bx + bw - 60 : bx + 40; ctx.moveTo(tx, y + h - 2); ctx.lineTo(tx + 34, y + h - 2); ctx.lineTo(tx + (o.side === 'r' ? 40 : -6), y + h + 26); ctx.closePath(); ctx.fillStyle = bg; THEME.role = 'surface'; ctx.fill(); THEME.role = null;
    const ov = ovr(o.key ? o.key + ' text' : s); const str = ov.s != null ? ov.s : s;
    (ov.s != null ? [str] : lines).forEach((ln, k) => _txt(ln, bx + padX, y + padY + fs * 0.78 + k * lh, font, fg, 'left', 'alphabetic', fs * LS.body));
  });
  return h;
}

/** pushCam(lt, dur, amount, ax, ay): a slow push-in keyed in log space (smoothstep over the scene). Applies to ctx. */
function pushCam(lt, dur, amount, ax = CX, ay = H / 2) {
  if (!amount) return; const u = clamp(lt / Math.max(0.5, dur)); const e = u * u * (3 - 2 * u);
  const z = Math.exp(Math.log(1 + amount) * e); ctx.translate(ax, ay); ctx.scale(z, z); ctx.translate(-ax, -ay);
}

/* BLINK: the ghana-marrify visual system (direction A "Blink" + B's real-source scenes), ported to the studio canvas engine.
 * Shared by the motion film (projects/ghana-marrify/film) AND the talking-head moments (load it from talking-head.json
 * "common": ["../film/scenes/blink.js", ...] and add "fonts": BLINK_FONT_LIST to that manifest, see below).
 * Pure drawing helpers on top of studio/runtime/core.js + house.js: every frame is a function of t (no timers, no random).
 *
 * LOOK   one clear white world (#F4F4F4); colour lives in the characters, never in the ground. Records are characters with
 *        eyes (certificate, folder, envelope, stamp, gazette, register, ID card, shop); searchers are grey faces with
 *        typographic eyes that swap hard (o o / - - / > < / * *), the two eyes one frame apart. Headlines: Instrument Sans 600,
 *        sentence case, one coloured word (*markup*). Captions/credits: Geist Mono, small, uppercase.
 *        Signature moves: springy pops (+25 % overshoot), blinks (0.05 s close, 0.09 s open), pupils darting to the new thing,
 *        eyelid wipe between scenes (blinkLids), pupil dive -> iris open (pupilDive / irisReveal), crowds packing in.
 *        Real sources sit in white cards with a mono credit (sourceCard) and a highlighter drawn on the moment she says it.
 *
 * API (all positions in layout px: 1920x1080 or 1080x1920, use V(landscape, portrait)):
 *   BL.*                         palette        BF.h(size, weight) / BF.mono(size)   fonts
 *   G.white / G.white2           two identical white grounds (alternate them so cuts are clean cuts, not whips)
 *   spring(t, f, z)              damped step response (0 -> 1, overshoots)      popS(t, t0, f, z) -> scale with overshoot
 *   blinkOpen(t, seed)           0..1 eye openness for a natural blink clock (per seed)
 *   critter(shape, col, x, y, size, o)   a record character (x, y = bottom centre). o: s, rot, open (0..1 | 'happy' | 'down'),
 *                                lx, ly (-1..1 pupil look), a (alpha), key (movable in the editor), label (mono under it)
 *   glyphFace(x, y, r, o)        a searcher. o: s, state ('o' | '-' | '<' | '*' | '^' | '.'), state2 (right eye, e.g. state a
 *                                frame earlier), lx, ly, col, a, key
 *   faceState(t, seed, o)        a searcher's eye glyph at t (blinks on its own clock; o.wake time, o.squeeze [t0, t1])
 *   bh(t, o)                     headline: lines (markup *accent* / _grey_), x, y, size, align, t0 + stagger | times, acc,
 *                                col, lh, weight, id. Words rise 0.3 em with a little blur, as one unit when stagger is small.
 *   bmono(s, x, y, size, o)      Geist Mono caption (uppercase, editable). o: col, align, key, raw, maxW
 *   bub(t, t0, x, y, s, o)       white speech bubble with soft shadow, markup text. o: size, anchor 'l'|'c'|'r', tick (time of
 *                                a green check), strike (time of a strike-through), w (fixed width), key, weight, a
 *   blinkLids(c)                 draw the eyelid wipe (0 open .. 1 shut) over the whole frame
 *   pupilDive(p, x, y)           ink disc growing from a pupil at (x, y) to cover the frame (p 0..1)
 *   irisClip(p, x, y)            clip the following drawing to an iris circle opening from (x, y) (p 0..1); call inside save/restore
 *   sourceCard(img, x, y, w, o)  a real screenshot in a white card + credit line. o: crop [x0, y0, x1, y1] (source px), h (card
 *                                height, crops the image), scroll (source px to scroll down), credit, key, radius.
 *                                Returns a mapper {X(px), Y(py), s} from source pixels to layout px (for highlights)
 *   highlight(t, t0, d, lines, M, col)  marker drawn on lines [[x, y, w, h] in source px], one after the other over d seconds
 *   lockTable(t, x, y, w, o)     the column-lock table (placeholder fields). o: cols, rowsN, locks {col: t}, fold {t, keep}, active (row)
 *   crowd(t, faces, o)           faces that slide in from the frame edges and pack (faces: [{x, y, r, t0, seed, col}])
 *   herCircle(img, x, y, d, o)   her cut-out photo in a tinted circle (never flipped). o: crop [fx, fy, fs] (centre x, y and
 *                                size as fractions of the image), tint, key, s
 *   bPolaroid(img, x, y, w, rot, cap, o)  her footage frame on a white card with a mono caption
 *   flagB(name, x, y, w)         flat flag (ghana | estonia | nigeria) with a hairline edge
 *   check(x, y, s, p, col)       a drawn check mark (p 0..1)
 */
'use strict';

const BL = {
  ground: '#F4F4F4', ink: '#141414', grey: '#6B6B6B', soft: '#9A9A98', line: '#DCDCD8', card: '#FFFFFF', face: '#D9D9D5', faceD: '#C9C9C4',
  red: '#E3412F', gold: '#F2B21B', green: '#12965A', cobalt: '#2E4FE0', black: '#1C1C1C', sand: '#D7A96B', coral: '#F07B57',
  purple: '#7B5CE0', mint: '#D9F2E6', hi: '#FFE45C', hiRed: '#FFC9BD', hiBlue: '#CFDAFF', hiMint: '#BFEBD3',
  panel: '#ECECEA', field: '#EFEFEC', cellLock: '#EBEBE8', colLock: '#ECECE9',
  // fixed in both modes: eye pupils + closed-eye lines, the eyelid wipe / pupil dive, a photo print's white card + caption
  pupil: '#141414', lid: '#141414', photo: '#FFFFFF', photoInk: '#6B6B6B',
};
const BF = { h: (s, w = 600) => `${w} ${s}px "Instrument Sans"`, mono: (s, w = 500) => `${w} ${s}px "Geist Mono"` };
const BLINK_FONT_LIST = ['600 40px "Instrument Sans"', '500 40px "Instrument Sans"', '700 40px "Instrument Sans"', '500 40px "Geist Mono"'];
/** global scale for the film's elements (the 2026-10-02 "scale + fill" pass); moments can set BSCALE.on = false */
const BSCALE = { on: true, head: () => V(1.32, 1.18), headMin: () => V(96, 88), leadMin: () => V(50, 48), crit: () => V(1.45, 1.3), face: () => V(1.5, 1.35), her: () => V(1.4, 1.3), bub: () => V(1.22, 1.12), photo: () => V(1.35, 1.2), table: () => V(1.4, 1.25) };
const BK = (k) => (BSCALE.on ? BSCALE[k]() : 1);
G.white = { bg: BL.ground, fg: BL.ink, mid: BL.grey, line: BL.line, acc: BL.green, card: BL.card, panel: BL.panel, grid: 'rgba(20,20,20,0.05)', mode: 'light' };
G.white2 = { ...G.white };
/* light / dark (core.js themeMap, by role): Blink is designed light (one white world). Its dark alternative: ground #0E1116 (her
 * off-black); white cards, bubbles, tables -> #1B1E25 with their hairlines turned light; searcher faces
 * -> #343944 discs with near-white eye glyphs; the black record (the licensed officials' stamp) -> #C9CCD2 so it stays the one
 * neutral character; a grey courthouse -> #9AA0A8; a phone's ink frame -> light; text near-white, greys lifted; green / cobalt /
 * purple TEXT lifted for contrast while every record keeps its body colour; the eyelid wipe stays ink.
 * Eye whites and pupils, flags (with an edge), screenshots, her photos and their white prints never change. */
themeMap('dark', 'ground', [[BL.ground, '#0E1116']]);
themeMap('dark', 'surface', [[BL.ground, '#0E1116'], [BL.card, '#1B1E25'], [BL.ink, '#D8DADF'], [BL.line, '#2C2F36'], [BL.face, '#343944'], [BL.faceD, '#2C313B'],
  [BL.black, '#C9CCD2'], [BL.panel, '#23262D'], [BL.field, '#252830'], [BL.cellLock, '#2A2E37'], [BL.colLock, '#262A31'], ['#CFE8DA', '#1F7A50'], [BL.grey, '#4A4C52']]);
themeMap('dark', 'mark', [[BL.ink, '#F1F1EE'], [BL.grey, '#A4A4A0'], [BL.soft, '#85868B'], [BL.line, '#3A3E47'], [BL.green, '#22E08A'], [BL.cobalt, '#7A95FF'],
  [BL.purple, '#A58CF5'], [BL.face, '#343944'], [BL.faceD, '#2C313B'], [BL.black, '#C9CCD2'], [BL.cellLock, '#2A2E37'], [BL.colLock, '#2A2E37'], [BL.field, '#2C3039'], ['#CFE8DA', '#1F7A50']]);
THEME.edges.dark = [...(THEME.edges.dark || []), { col: BL.card, line: 'rgba(241,241,238,0.12)' }];
THEME.text = ['#F1F1EE', BL.ink];   // the contrast guard's light and dark text
/** the eyelid wipe / pupil dive colour */
const lidCol = () => BL.lid;   // stays ink in both modes: a blink goes dark (a light lid flashed on dark screens)

/* ---------- motion ---------- */
function spring(t, f = 2.2, z = 0.55) {
  if (t <= 0) return 0; const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
}
/** a pop: 0 before t0, then a spring to 1 with visible overshoot (about +25 %) */
function popS(t, t0, f = 2.4, z = 0.45) { return t < t0 ? 0 : clamp(0.3 + 0.7 * spring(t - t0, f, z), 0, 1.35); }
const eOutB = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
/** natural blink clock: 1 open, dips to 0 for 0.14 s every 2.4-4 s (deterministic per seed) */
function blinkOpen(t, seed) {
  const per = 2.4 + hash(seed) * 1.6, ph = hash(seed + 9) * per; const u = ((t + ph) % per + per) % per;
  if (u < 0.05) return 1 - u / 0.05; if (u < 0.14) return (u - 0.05) / 0.09; return 1;
}

/* ---------- record characters ---------- */
const BSHAPES = {
  cert:     { d: 'M18 4 H66 L84 22 V96 H18 Z', x: 'M66 4 V22 H84 Z', eyes: [[38, 52], [62, 52]] },
  folder:   { d: 'M6 22 Q6 16 12 16 H38 L46 24 H88 Q94 24 94 30 V88 Q94 94 88 94 H12 Q6 94 6 88 Z', x: 'M6 34 H94', eyes: [[36, 60], [64, 60]] },
  envelope: { d: 'M6 28 H94 V90 H6 Z', x: 'M6 28 L50 56 L94 28 Z', eyes: [[34, 72], [66, 72]] },
  stamp:    { d: 'M50 4 A14 14 0 1 1 49.9 4 Z M42 30 H58 V46 H42 Z M10 46 H90 Q94 46 94 50 V82 H6 V50 Q6 46 10 46 Z', x: 'M4 82 H96 V94 H4 Z', eyes: [[36, 64], [64, 64]] },
  gazette:  { d: 'M16 10 H84 V90 H16 Z', x: 'M10 4 H90 A8 8 0 0 1 90 20 H10 A8 8 0 0 1 10 4 Z M10 80 H90 A8 8 0 0 1 90 96 H10 A8 8 0 0 1 10 80 Z', eyes: [[37, 50], [63, 50]] },
  idcard:   { d: 'M8 26 H92 Q98 26 98 32 V74 Q98 80 92 80 H8 Q2 80 2 74 V32 Q2 26 8 26 Z', x: 'M10 36 H34 V68 H10 Z', eyes: [[56, 50], [80, 50]] },
  register: { d: 'M10 8 H84 Q92 8 92 16 V92 H18 Q10 92 10 84 Z', x: 'M10 8 H26 V92 H18 Q10 92 10 84 Z', eyes: [[46, 48], [72, 48]] },
  shop:     { d: 'M10 40 H90 V94 H10 Z', x: 'M4 22 H96 L90 40 H10 Z M40 66 H60 V94 H40 Z', eyes: [[30, 58], [74, 58]] },
  court:    { d: 'M8 34 L50 6 L92 34 Z M12 38 H88 V46 H12 Z M18 50 H28 V84 H18 Z M45 50 H55 V84 H45 Z M72 50 H82 V84 H72 Z M6 86 H94 V96 H6 Z', x: '', eyes: [[38, 26], [62, 26]] },
};
const _p2d = new Map();
const P2 = (d) => { if (!_p2d.has(d)) _p2d.set(d, new Path2D(d)); return _p2d.get(d); };
/** critter(shape, col, x, y, size, o): x, y = bottom centre (pivot at 90 % height). Movable when o.key is given. */
function critter(shape, col, x, y, size, o = {}) {
  size *= BK('crit');
  const s = o.s == null ? 1 : o.s; if (s <= 0.001 || (o.a != null && o.a <= 0.002)) return;
  const draw = () => withA(o.a == null ? 1 : o.a, () => withT(x, y - size * 0.0, s, (o.rot || 0) * Math.PI / 180, () => {
    ctx.translate(-size / 2, -size * 0.9); const k = size / 100; ctx.scale(k, k);
    // the black record turns light on a screen switched to dark (core.js maps its body), so its details go dark like any other
    const lit = THEME.alt === 'dark' && col === BL.black; const sh = BSHAPES[shape], dark = col === BL.black && !lit;
    // dark mode: parts drawn only as a shade outside the body (the shop's awning, the stamp's base, the gazette's rolls) would
    // vanish into the dark ground; give them a light shade first (the body covers it where they overlap)
    if (THEME.alt === 'dark' && sh.x && sh.x.includes('Z')) themeFixed(() => { ctx.fillStyle = 'rgba(241,241,238,0.34)'; ctx.fill(P2(sh.x)); });
    if (THEME.alt === 'dark' && col === BL.faceD) col = '#9AA0A8';   // a grey building (the courthouse) lifts so it reads on the dark ground
    ctx.fillStyle = col; THEME.role = 'surface'; try { ctx.fill(P2(sh.d), 'nonzero'); } finally { THEME.role = null; }   // the body: its own colour in both modes
    if (sh.x) { const det = P2(sh.x); if (sh.x.includes('Z')) { ctx.fillStyle = dark ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.16)'; ctx.fill(det); } else { ctx.strokeStyle = dark ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.16)'; ctx.lineWidth = 3; ctx.stroke(det); } }
    const r = 11; const open = o.open == null ? 1 : o.open;
    for (const [ex, ey] of sh.eyes) {
      if (open === 'happy') { themeFixed(() => { ctx.save(); ctx.strokeStyle = dark ? '#fff' : BL.pupil; ctx.lineWidth = 3.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey + 4, r * 0.75, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore(); }); continue; }
      const op = open === 'down' ? 0.45 : open;
      if (op < 0.18) { themeFixed(() => rect(ex - r, ey - 1.6, 2 * r, 3.4, dark ? '#fff' : BL.pupil)); continue; }
      ctx.save(); ctx.translate(ex, ey); ctx.scale(1, clamp(op, 0.18, 1));
      themeFixed(() => {   // eye whites and pupils: the same in both modes
        circle(0, 0, r, '#FFFFFF');
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
        const lx = clamp(o.lx || 0, -1, 1), ly = open === 'down' ? 0.9 : clamp(o.ly || 0, -1, 1);
        circle(lx * r * 0.42, ly * r * 0.42, r * 0.55, BL.pupil);
      });
      ctx.restore();
      if (open === 'down') rect(ex - r - 1, ey - r - 1, 2 * r + 2, r * 0.9, col);   // heavy lid: looking down
    }
  }));
  if (o.key) grp(o.key, x - size * s / 2, y - size * 0.9 * s, size * s, size * s, draw); else draw();
  if (o.label) bmono(o.label, x, y + V(48, 50), o.labSize || V(28, 28), { col: BL.grey, align: 'center', key: o.labKey, a: o.labA, maxW: o.labMaxW || V(undefined, 270) });
}

/* ---------- searchers: grey faces with typographic eyes ---------- */
const GLYPH = { o: 'o', '-': '–', '<': '<', '*': '*', '^': '^', '.': '·', O: 'O', '/': '/' };
function glyphFace(x, y, r, o = {}) {
  r *= BK('face');
  const s = o.s == null ? 1 : o.s; if (s <= 0.001 || (o.a != null && o.a <= 0.002)) return;
  const draw = () => withA(o.a == null ? 1 : o.a, () => withT(x, y, s, 0, () => {
    circle(0, 0, r, o.col || BL.face);
    const st = [o.state || 'o', o.state2 || o.state || 'o'];
    ctx.font = `700 ${Math.round(r * 0.86)}px "Instrument Sans"`; ctx.letterSpacing = '0px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.eyeCol || BL.ink;
    [-1, 1].forEach((sd, i) => {
      let gl = GLYPH[st[i]] || st[i]; if (st[i] === '<') gl = i ? '<' : '>';
      ctx.fillText(gl, sd * r * 0.4 + (o.lx || 0) * r * 0.2, -r * 0.1 + (o.ly || 0) * r * 0.2 + (gl === '–' ? r * 0.02 : 0));
    });
  }));
  if (o.key) grp(o.key, x - r * s, y - r * s, 2 * r * s, 2 * r * s, draw); else draw();
}
/** a searcher's eye glyph at time t: closed before o.wake, then open with its own blinks; o.squeeze = [t0, t1] -> '> <' */
function faceState(t, seed, o = {}) {
  if (o.wake != null && t < o.wake) return '-';
  if (o.squeeze && t >= o.squeeze[0] && t < o.squeeze[1]) return '<';
  if (o.wide && t >= o.wide[0] && t < o.wide[1]) return 'O';
  return blinkOpen(t, seed) < 0.5 ? '-' : (o.base || 'o');
}

/* ---------- type ---------- */
const _bhLay = new Map();
function bhLayout(lines, size, weight, ls) {
  const key = JSON.stringify([lines, size, weight, ls]); if (_bhLay.has(key)) return _bhLay.get(key);
  const font = BF.h(size, weight); const words = []; const L2 = [];
  setFont(font, ls); const space = ctx.measureText(' ').width;
  lines.forEach((ln, li) => { let x = 0; const ws = parseLine(ln); ws.forEach((w, i) => { if (i) x += space; const wd = ctx.measureText(w.s).width; words.push({ ...w, li, dx: x, w: wd }); x += wd; }); L2.push(x); });
  const R = { words, lineW: L2, w: Math.max(...L2), font, space }; _bhLay.set(key, R); return R;
}
/** headline: o.lines | o.text, x, y (first baseline), size, align, t0 + stagger | times, acc, col, lh, weight, id, a, fitW */
function bh(t, o) {
  const def = (o.lines || [o.text]).join('\n'); const ov = ovr(o.id || def.replace(/\n/g, ' '));
  let lines = ov.s != null ? ov.s.split('\n') : (o.lines || [o.text]);
  { let open = null; lines = lines.map((ln) => { const ws = (open ? open + ln : ln).split(' ');
      ws.forEach((raw) => { let m = open, r = raw; if (!m && /^[*~_]/.test(r)) { m = r[0]; r = r.slice(1); } if (m) { const e = r.lastIndexOf(m); if (e >= 0 && e >= r.length - 2) m = null; } open = m; });
      return open ? ws.join(' ') + open : ws.join(' '); }); }
  const lead = o.lead || o.col === BL.grey || o.weight === 500;
  let size = BSCALE.on ? (lead ? Math.max(BK('leadMin'), o.size) : Math.max(BK('headMin'), o.size * BK('head'))) : o.size;
  const weight = o.weight || 600; const align = o.align || 'left';
  const av = o.fitW || (align === 'center' ? W - 2 * V(110, 80) : W - V(110, 80) - o.x);
  // wrap: keep the author's breaks, then wrap any line that is still too wide (markup carried per word)
  const wrapLines = (sz) => { const ls = -0.025 * sz; setFont(BF.h(sz, weight), ls); const space = ctx.measureText(' ').width; const outL = [];
    lines.forEach(ln => { let cur = [], cw = 0; parseLine(ln).forEach(w => { const ww = ctx.measureText(w.s).width; if (!o.noWrap && cur.length && cw + space + ww > av) { outL.push(cur); cur = []; cw = 0; } cw += (cur.length ? space : 0) + ww; cur.push(w); }); outL.push(cur); });
    return outL; };
  let WL = wrapLines(size);
  const widest = (wl, sz) => { setFont(BF.h(sz, weight), -0.025 * sz); return Math.max(...wl.map(l => l.reduce((a2, w, i) => a2 + ctx.measureText(w.s).width + (i ? ctx.measureText(' ').width : 0), 0))); };
  while (widest(WL, size) > av && size > 20) { size = Math.floor(size * 0.94); WL = wrapLines(size); }
  const font = BF.h(size, weight), ls = -0.025 * size; setFont(font, ls); const space = ctx.measureText(' ').width;
  const words = []; const lineW = [];
  WL.forEach((ln, li) => { let x = 0; ln.forEach((w, i) => { if (i) x += space; const wd = ctx.measureText(w.s).width; words.push({ ...w, li, dx: x, w: wd }); x += wd; }); lineW.push(x); });
  const Lw = Math.max(...lineW); const lh = size * (o.lh || 1.06);
  const lx = (li) => (align === 'center' ? o.x - lineW[li] / 2 : align === 'right' ? o.x - lineW[li] : o.x);
  const bx = align === 'center' ? o.x - Lw / 2 : align === 'right' ? o.x - Lw : o.x;
  const box = [bx, o.y - size * 0.82, Lw, (WL.length - 1) * lh + size * 1.08];
  const info = { text: lines.join('\n'), def, markup: true };
  if (ov.hide) { regBox(ov, ...box, info); return; }
  moved(ov, () => {
    let vis = false; const oa = o.a == null ? 1 : o.a;
    words.forEach((w, i) => {
      const ti = o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.t0 || 0) + i * (o.stagger == null ? 0.05 : o.stagger);
      const fx = o.fx || 'rise';
      const p = fx === 'cut' ? (t >= ti ? 1 : 0) : eOutB(prog(t, ti, o.dur || 0.5)); if (p <= 0) return; vis = true;
      const out = o.out == null ? 1 : 1 - prog(t, o.out - 0.18, 0.18); if (out <= 0) return;
      ctx.save(); ctx.globalAlpha *= (fx === 'rise' ? clamp(p * 1.6) : clamp((t - ti) * 18)) * oa * out;
      const b = (1 - p) * 6; if (fx === 'rise' && b > 0.4) ctx.filter = `blur(${b.toFixed(1)}px)`;
      setFont(font, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = w.style === '*' || w.style === '~' ? (o.acc || g.acc) : w.style === '_' ? BL.soft : (o.col || BL.ink);
      const X = lx(w.li) + w.dx, Y = o.y + w.li * lh;
      if (fx === 'pop') { const sc = Math.min(1.04, 0.85 + 0.15 * spring(t - ti, 3.2, 0.62)); ctx.translate(X + w.w / 2, Y - size * 0.32); ctx.scale(sc, sc); ctx.fillText(w.s, -w.w / 2, size * 0.32); }
      else ctx.fillText(w.s, X, Y + (fx === 'rise' ? (1 - p) * size * 0.3 : 0));
      ctx.restore();
    });
    if (vis) regBox(ov, ...box, info);
  });
  return { lines: WL.length, size, bottom: o.y + (WL.length - 1) * lh + size * 0.25 };
}
/** Geist Mono caption, uppercase, editable (key = text or o.key) */
function bmono(s, x, y, size = 24, o = {}) {
  const font = BF.mono(size); const ls = size * 0.04; const col = o.col || BL.soft; const align = o.align || 'left';
  if (o.raw) { withA(o.a == null ? 1 : o.a, () => _txt(s.toUpperCase(), x, y, font, col, align, 'alphabetic', ls)); return; }
  const ov = ovr(o.key || s); const str = (ov.s != null ? ov.s : s).toUpperCase();
  let lines = [str];
  if (o.maxW && tw(str, font, ls) > o.maxW) { lines = []; let cur = ''; for (const w of str.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > o.maxW) { lines.push(cur); cur = w; } else cur = nx; } if (cur) lines.push(cur); }
  const lh = size * 1.4, wMax = Math.max(...lines.map(l => tw(l, font, ls)));
  const bx = align === 'center' ? x - wMax / 2 : align === 'right' ? x - wMax : x; const box = [bx, y - size * 0.8, wMax, (lines.length - 1) * lh + size * 1.05];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: s }); return; }
  moved(ov, () => { withA(o.a == null ? 1 : o.a, () => lines.forEach((ln, k) => _txt(ln, x, y + k * lh, font, col, align, 'alphabetic', ls))); regBox(ov, ...box, { text: str, def: s }); });
}
/** a drawn check mark (p 0..1) */
function check(x, y, s, p, col = BL.green, lw) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw || s * 0.16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const a = [x, y + s * 0.5], b = [x + s * 0.36, y + s * 0.84], c = [x + s, y + s * 0.1]; const q = clamp(p);
  ctx.moveTo(...a); if (q < 0.4) ctx.lineTo(lerp(a[0], b[0], q / 0.4), lerp(a[1], b[1], q / 0.4)); else { ctx.lineTo(...b); ctx.lineTo(lerp(b[0], c[0], (q - 0.4) / 0.6), lerp(b[1], c[1], (q - 0.4) / 0.6)); }
  ctx.stroke(); ctx.restore();
}
/** speech bubble: white, radius 26, soft shadow. s may hold *accent* markup. Returns {x, y, w, h}. */
function bub(t, t0, x, y, s, o = {}) {
  const size = (o.size || V(38, 36)) * (o.noScale ? 1 : BK('bub')), pad = o.pad || [size * 0.62, size * 0.8], weight = o.weight || 500;
  const ov = ovr(o.key || ('bubble ' + s)); const str = ov.s != null ? ov.s : s;
  const lines = str.split('\n'); const Lo = bhLayout(lines, size, weight, -0.01 * size); const lh = size * 1.22;
  const tickW = o.tick != null || o.lock != null ? size * 1.1 : 0; const w = (o.w || Lo.w + pad[1] * 2) + tickW, h = pad[0] * 2 + (lines.length - 1) * lh + size * 0.9;
  const bx = o.anchor === 'c' ? x - w / 2 : o.anchor === 'r' ? x - w : x;
  const p = eOutB(prog(t, t0, 0.42)); if (p <= 0) return { x: bx, y, w, h };
  const info = { text: str, def: s, markup: true };
  if (ov.hide) { regBox(ov, bx, y, w, h, info); return { x: bx, y, w, h }; }
  moved(ov, () => withA(clamp(p * 1.6) * (o.a == null ? 1 : o.a), () => withT(bx + (o.anchor === 'r' ? w : o.anchor === 'c' ? w / 2 : 0), y + h + (1 - p) * 22, 0.96 + 0.04 * p, 0, () => {
    ctx.translate(-(o.anchor === 'r' ? w : o.anchor === 'c' ? w / 2 : 0), -h);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(0, 0, w, h, Math.min(26, h / 2), o.bg || BL.card); ctx.restore();
    strokeRR(0, 0, w, h, Math.min(26, h / 2), o.border || MC('rgba(20,20,20,0.10)'), o.border ? 3 : 2);
    setFont(Lo.font, -0.01 * size); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    Lo.words.forEach(wd => { ctx.fillStyle = wd.style === '*' ? (o.acc || g.acc) : wd.style === '_' ? BL.soft : (o.fg || BL.ink); ctx.fillText(wd.s, pad[1] + wd.dx, pad[0] + size * 0.78 + wd.li * lh); });
    if (o.strike != null) { const sp = eOutB(prog(t, o.strike, 0.3)); if (sp > 0) rect(pad[1] - 4, pad[0] + size * 0.48, (Lo.w + 8) * sp, Math.max(3, size * 0.07), o.strikeCol || BL.grey); }
    if (o.tick != null) check(w - pad[1] - size * 0.62, pad[0] + size * 0.06, size * 0.66, prog(t, o.tick, 0.28), o.tickCol || BL.green, size * 0.12);
    if (o.lock != null && t >= o.lock) withT(w - pad[1] - size * 0.3, pad[0] + size * 0.5, popS(t, o.lock, 3, 0.5), 0, () => lockIcon(0, 0, size * 0.62, BL.soft));
    regBox(ov, 0, 0, w, h, info);
  })));
  return { x: bx, y, w, h };
}

/* ---------- transitions ---------- */
/** the eyelid wipe: c = 0 open .. 1 shut. Two ink lids with curved edges meet at the middle. */
function blinkLids(c) {
  if (c <= 0) return; const half = H / 2, k = V(260, 320) * (1 - c * 0.85);
  const yt = lerp(-k - 10, half + 1, c), yb = lerp(H + k + 10, half - 1, c);
  const col = lidCol(); THEME.fixed++; ctx.save(); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, yt); ctx.quadraticCurveTo(CX, yt + 2 * k, 0, yt); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(W, H); ctx.lineTo(W, yb); ctx.quadraticCurveTo(CX, yb - 2 * k, 0, yb); ctx.closePath(); ctx.fill();
  ctx.restore(); THEME.fixed--;
}
/** lids for a scene: closing over the last 0.2 s before tEnd (ease-in), opening over 0.3 s after tStart (shut for 2 frames) */
function lidAmount(t, tStart, tEnd, o = {}) {
  let c = 0;
  if (o.out && tEnd != null && t > tEnd - 0.2) c = Math.max(c, E.inCubic(prog(t, tEnd - 0.2, 0.2)));
  if (o.in && t < tStart + 0.4) c = Math.max(c, t < tStart + 0.066 ? 1 : 1 - E.outCubic(prog(t, tStart + 0.066, 0.3)));
  return c;
}
function pupilDive(p, x, y) { if (p <= 0) return; const R = lerp(12, Math.hypot(W, H) * 1.05, E.inCubic(clamp(p))); themeFixed(() => circle(x, y, R, lidCol())); }
function irisClip(p, x, y) { const R = lerp(10, Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) * 1.04, E.inOutCubic(clamp(p))); ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.clip(); }

/* ---------- real sources ---------- */
/** a real screenshot in a white card with a credit. o.crop [x0, y0, x1, y1] in image px; o.h = card height (layout px);
 *  o.scroll = image px scrolled down inside the card; o.credit; o.key. Returns {X(px), Y(py), s, x, y, w, h}. */
function sourceCard(img, x, y, w, o = {}) {
  const c = o.crop || [0, 0, img.width, img.height]; const pad = o.pad == null ? V(26, 22) : o.pad;
  const s = (w - pad * 2) / (c[2] - c[0]); const visH = o.h ? (o.h - pad * 2) / s : (c[3] - c[1]); const h = o.h || (c[3] - c[1]) * s + pad * 2;
  const sc = o.scroll || 0; const M = { X: (px) => x + pad + (px - c[0]) * s, Y: (py) => y + pad + (py - c[1] - sc) * s, s, x, y, w, h };
  const draw = () => {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 34; ctx.shadowOffsetY = 12; fillRR(x, y, w, h, o.radius || 18, BL.card); ctx.restore();
    ctx.save(); rr(x + pad, y + pad, w - pad * 2, h - pad * 2, 6); ctx.clip();
    ctx.drawImage(img, c[0], c[1] + sc, c[2] - c[0], visH, x + pad, y + pad, w - pad * 2, visH * s);
    if (o.over) o.over(M);
    ctx.restore();
    strokeRR(x, y, w, h, o.radius || 18, MC('rgba(20,20,20,0.10)'), 2);
  };
  if (o.key) grp(o.key, x, y, w, h, draw, { img: true }); else draw();
  if (o.credit) bmono(o.credit, o.creditX == null ? x : o.creditX, y + h + V(40, 42), o.creditSize || V(24, 24), { col: BL.soft, key: (o.key || 'source') + ' credit', align: o.creditAlign || 'left', maxW: o.creditMaxW });
  return M;
}
/** highlighter on screenshot text: lines [[x, y, w, h]] in image px, drawn one after the other over d s (multiply) */
function highlight(t, t0, d, lines, M, col = BL.hi) {
  const tot = lines.reduce((a, l) => a + l[2], 0); let acc = 0; const p = clamp((t - t0) / d) * tot; if (p <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = col;
  for (const [lx, ly, lw, lh] of lines) { const f = clamp((p - acc) / lw); if (f > 0) { const padY = lh * 0.18; ctx.fillRect(M.X(lx) - 4, M.Y(ly) - padY, (lw * M.s + 8) * f, lh * M.s + padY * 2); } acc += lw; }
  ctx.restore();
}

/* ---------- the column-lock table (placeholder fields, no real records) ---------- */
function lockIcon(x, y, s, col) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.14; ctx.beginPath(); ctx.arc(x, y - s * 0.28, s * 0.26, Math.PI, 0); ctx.stroke(); ctx.restore(); fillRR(x - s * 0.4, y - s * 0.3, s * 0.8, s * 0.62, s * 0.1, col); }
/** lockTable(t, x, y, w, o): o.cols [names], o.rowsN, o.locks {name: t}, o.fold {t, keep: 'Status', d}, o.active row index,
 *  o.a, o.key, o.label (mono under). Width shrinks around the kept column when folded; the table stays centred on x + w / 2. */
function lockTable(t, x, y, w, o = {}) {
  const cols = o.cols || ['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status']; const n = cols.length; const rowsN = o.rowsN || 4;
  const hh = V(64, 60) * BK('table'), rh = V(66, 62) * BK('table'), fs = V(28, 26) * BK('table');
  const fold = o.fold ? E.inOutCubic(prog(t, o.fold.t, o.fold.d || 0.9)) : 0;
  const base = cols.map(c => (c === 'Status' ? V(1.5, 2.4) : 1)); const wts = cols.map((c, i) => (o.fold && c !== o.fold.keep ? base[i] * (1 - fold) : base[i]));
  const totW = wts.reduce((a, b) => a + b, 0), fullW = base.reduce((a, b) => a + b, 0);
  const tw_ = lerp(w, Math.max(V(520, 520), w * base[cols.indexOf(o.fold ? o.fold.keep : 'Status')] / fullW), fold);
  const x0 = x + (w - tw_) / 2; const h = hh + rowsN * rh + V(24, 20);
  const draw = () => withA(o.a == null ? 1 : o.a, () => {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.06)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(x0, y, tw_, h, 16, BL.card); ctx.restore();
    ctx.save(); rr(x0, y, tw_, h, 16); ctx.clip();
    let cx = x0 + V(36, 26); const inner = tw_ - V(72, 52);
    cols.forEach((name, i) => {
      const cw = inner * wts[i] / totW; if (cw < 2) { cx += cw; return; }
      const lockT = o.locks && o.locks[name] != null ? o.locks[name] : null; const lk = lockT != null && t >= lockT;
      const lp = lockT != null ? popS(t, lockT, 3, 0.5) : 0;
      ctx.save(); ctx.beginPath(); ctx.rect(cx, y, cw, h); ctx.clip();
      const hx = cx + (lk ? fs * 1.1 : 0);
      withA(clamp((cw - tw(name, BF.h(fs, 500)) - (lk ? fs * 1.1 : 0)) / 40), () => _txt(name, hx, y + hh * 0.62, BF.h(fs, 500), lk ? BL.soft : BL.ink, 'left'));
      if (lk) withT(cx + fs * 0.45, y + hh * 0.5, Math.max(0.01, lp), 0, () => lockIcon(0, 0, fs * 0.8, BL.soft));
      for (let r = 0; r < rowsN; r++) {
        const ry = y + hh + r * rh + rh * 0.5;
        if (name === 'Status') { if (r === (o.active == null ? 1 : o.active)) { circle(cx + 8, ry, 7, BL.green); _txt('Active marriage', cx + 26, ry + fs * 0.34, BF.h(fs, 600), BL.ink, 'left'); } else rect(cx, ry - 3, 26, 6, BL.line); }
        else rect(cx, ry - 6, Math.min(cw - 18, (cw - 18) * (0.55 + 0.4 * hash(i * 7 + r))), 12, lk ? BL.cellLock : BL.line);
        if (lk && r === 0) withA(clamp(lp) * 0.9, () => rect(cx - 6, y + hh + 4, cw - 12, rowsN * rh - 8, BL.colLock));
      }
      ctx.restore();
      cx += cw;
    });
    rect(x0 + V(28, 22), y + hh, tw_ - V(56, 44), 2, BL.line);
    ctx.restore();
  });
  if (o.key) grp(o.key, x0, y, tw_, h, draw); else draw();
  if (o.label) bmono(o.label, x + w / 2, y + h + V(44, 46), V(20, 22), { col: BL.soft, align: 'center', key: (o.key || 'table') + ' label' });
  return { x: x0, y, w: tw_, h };
}

/* ---------- people ---------- */
/** faces sliding in from the nearest frame edge and packing at their targets. faces: [{x, y, r, t0, seed, col, wake, squeeze, look:[lx, ly]}] */
function crowd(t, faces, o = {}) {
  faces.forEach((f, i) => {
    if (t < f.t0) return; const sp = spring(t - f.t0, o.f || 1.8, o.z || 0.62);
    const ex = f.x < CX ? -f.r * 1.4 : W + f.r * 1.4, ey = f.y + (hash(i + 3) - 0.5) * 200;
    const fromEdge = f.from || (Math.abs(f.x - CX) / W > Math.abs(f.y - H / 2) / H ? [ex, ey] : [f.x + (hash(i) - 0.5) * 200, f.y < H / 2 ? -f.r * 1.4 : H + f.r * 1.4]);
    const x = lerp(fromEdge[0], f.x, sp), y = lerp(fromEdge[1], f.y, sp);
    const st = faceState(t, f.seed == null ? i * 1.7 + 11 : f.seed, { wake: f.wake == null ? f.t0 + 0.15 : f.wake, squeeze: f.squeeze, wide: f.wide, base: f.base });
    const st2 = faceState(t - 1 / 30, f.seed == null ? i * 1.7 + 11 : f.seed, { wake: f.wake == null ? f.t0 + 0.15 : f.wake, squeeze: f.squeeze, wide: f.wide, base: f.base });
    const look = f.look || [0, 0];
    glyphFace(x, y, f.r, { state: st, state2: st2, lx: look[0], ly: look[1], col: f.col, a: f.a });
  });
}
/** her cut-out photo in a tinted circle. o.crop [fx, fy, fs]: centre (fractions of the image) and the crop size as a fraction
 *  of the image height; o.tint; o.key; o.s */
function herCircle(img, x, y, d, o = {}) {
  d *= BK('her');
  const s = o.s == null ? 1 : o.s; if (s <= 0.001) return; const [fx, fy, fsz] = o.crop || [0.5, 0.42, 0.78];
  const draw = () => withT(x, y, s, 0, () => {
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, d / 2, 0, Math.PI * 2); ctx.fillStyle = o.tint || '#DCE8E2'; ctx.fill(); ctx.clip();
    const side = img.height * fsz; ctx.drawImage(img, img.width * fx - side / 2, img.height * fy - side / 2, side, side, -d / 2, -d / 2, d, d); ctx.restore();
  });
  if (o.key) grp(o.key, x - d * s / 2, y - d * s / 2, d * s, d * s, draw, { img: true }); else draw();
}
/** her footage frame on a white card (never flipped), mono caption */
function bPolaroid(img, x, y, w, rot, cap, o = {}) {
  w *= BK('photo');
  const pad = Math.round(w * 0.05), ih = Math.round((w - pad * 2) * img.height / img.width), h = pad + ih + Math.round(w * 0.17);
  const s = o.s == null ? 1 : o.s; if (s <= 0.001) return h;
  grp(o.key || ('photo ' + cap), x - w / 2, y - h / 2, w, h, () => withT(x, y, s, rot, () => themeFixed(() => {   // a print: same in both modes
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.10)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; rect(-w / 2, -h / 2, w, h, BL.photo); ctx.restore();   // the print stays white in both modes
    ctx.drawImage(img, -w / 2 + pad, -h / 2 + pad, w - pad * 2, ih);
    if (cap) bmono(cap, -w / 2 + pad, h / 2 - Math.round(w * 0.065), Math.max(16, Math.round(w * 0.042)), { col: BL.photoInk, key: (o.key || 'photo') + ' cap', maxW: w - pad * 2 });
  })), { img: true });
  return h;
}
/* ---------- flags (flat, official colours) ---------- */
function flagB(name, x, y, w) {
  const R = { ghana: 2 / 3, estonia: 7 / 11, nigeria: 1 / 2 }[name]; const h = w * R;
  const edge = THEME.alt === 'dark' ? 'rgba(241,241,238,0.55)' : 'rgba(20,20,20,0.18)';   // on a dark ground a light edge keeps black stripes inside the flag
  themeFixed(() => {   // a flag: its official colours in both modes
  if (name === 'ghana') { rect(x, y, w, h / 3 + 0.5, '#CE1126'); rect(x, y + h / 3, w, h / 3 + 0.5, '#FCD116'); rect(x, y + 2 * h / 3, w, h / 3, '#006B3F');
    ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? h / 6 * 0.382 : h / 6; ctx.lineTo(x + w / 2 + Math.cos(a) * q, y + h / 2 + Math.sin(a) * q); } ctx.closePath(); ctx.fillStyle = '#000'; ctx.fill(); }
  else if (name === 'estonia') { rect(x, y, w, h / 3 + 0.5, '#0072CE'); rect(x, y + h / 3, w, h / 3 + 0.5, '#000'); rect(x, y + 2 * h / 3, w, h / 3, '#fff'); }
  else { rect(x, y, w / 3 + 0.5, h, '#008751'); rect(x + w / 3, y, w / 3 + 0.5, h, '#fff'); rect(x + 2 * w / 3, y, w / 3, h, '#008751'); }
  strokeR(x, y, w, h, edge, 2); });
  return h;
}
/** dotted line (the "who is looking" line), drawn on with p */
function dotted(x1, y1, x2, y2, p, col = BL.ink, dot = 5, gap = 13) {
  if (p <= 0) return; const L_ = Math.hypot(x2 - x1, y2 - y1) * clamp(p); const n = Math.floor(L_ / gap); const ux = (x2 - x1) / Math.hypot(x2 - x1, y2 - y1), uy = (y2 - y1) / Math.hypot(x2 - x1, y2 - y1);
  for (let i = 0; i <= n; i++) circle(x1 + ux * i * gap, y1 + uy * i * gap, dot / 2, col);
}

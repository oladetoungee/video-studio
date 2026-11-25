/* database-indexes film, look "A · Query Plan": the shared visual kit (loaded first; scenes in s1.js .. s4.js).
 *
 * A Manim-style diagram film: off-black ground with a 60 px hairline grid, hairline strokes that draw themselves, and ONE
 * colour, yellow #FFC53D, which is always the path the query takes (scan cursor, the walk down the B-tree, the pointer to
 * the row, the Index Scan line). IBM Plex Sans 600 for headlines, IBM Plex Mono for code and labels (OFL, film/assets/fonts).
 * Numbers: film/stills/directions/README.md "A · Query Plan". Every frame is a pure function of t.
 */
'use strict';

/* ---------- fonts: loaded by the film itself (see projects/ENGINE-REQUESTS.md); READY waits for them ---------- */
const QP_FACES = (() => {
  if (typeof FontFace === 'undefined') return [];
  const base = `/p/${FILM.slug}/film/assets/fonts/`;
  const list = [
    new FontFace('QP Sans', `url(${base}IBMPlexSans.ttf)`, { weight: '100 700', stretch: '85% 100%' }),
    new FontFace('QP Mono', `url(${base}IBMPlexMono-Regular.ttf)`, { weight: '400' }),
    new FontFace('QP Mono', `url(${base}IBMPlexMono-SemiBold.ttf)`, { weight: '600' }),
  ];
  list.forEach(f => { document.fonts.add(f); f.load().catch(e => console.error('font', e)); });
  return list;
})();
(() => {
  if (!QP_FACES.length) return; let ready = false, want = false;
  Promise.all(QP_FACES.map(f => f.loaded)).then(() => { try { _lay.clear(); } catch (e) {} ready = true; try { dispatchEvent(new Event('resize')); } catch (e) {} });
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ready, set: (v) => { want = !!v; } }); } catch (e) {}
})();
// house type -> this film's type (only this page): KT 'disp' = Plex Sans 600; mono labels = Plex Mono; captions = Plex Sans 700
F.disp = (s) => `600 ${s}px "QP Sans"`;
F.body = (s, w = 600) => `${Math.min(700, w)} ${s}px "QP Sans"`;
F.mono = (s, w = 400) => `${w >= 500 ? 600 : 400} ${s}px "QP Mono"`;
LS.disp = -0.02; LS.body = -0.005; LS.mono = 0.03;
const FS = (s, w = 600) => `${w} ${s}px "QP Sans"`;
const FM = (s, w = 400) => `${w} ${s}px "QP Mono"`;

/* ---------- palette (dark as designed; the studio's light switch maps each colour by role) ---------- */
const QP = { bg: '#0E1013', grid: '#181B20', ink: '#ECEAE4', dim: '#7A808A', faint: '#4A4F57', line: '#2C313A', panel: '#15181D',
  acc: '#FFC53D', accInk: '#0E1013', slab: '#3A3F48', ghost: '#22262D' };
const QPL = { bg: '#F2EFE8', grid: '#E3DFD6', ink: '#15181D', dim: '#5B6068', faint: '#9EA2A8', line: '#C9C4BA', panel: '#FFFFFF', accMark: '#A66A00', slab: '#C2BCB1', ghost: '#DCD7CD' };
Object.assign(G, {
  qa: { bg: QP.bg, fg: QP.ink, mid: QP.dim, line: QP.line, acc: QP.acc, card: QP.panel, panel: QP.panel, grid: QP.grid, mode: 'dark', altKey: 'qaL' },
  qb: { bg: QP.bg, fg: QP.ink, mid: QP.dim, line: QP.line, acc: QP.acc, card: QP.panel, panel: QP.panel, grid: QP.grid, mode: 'dark', altKey: 'qbL' },
});
themeMap('light', 'ground', [[QP.bg, QPL.bg]]);
themeMap('light', 'mark', [[QP.ink, QPL.ink], [QP.dim, QPL.dim], [QP.faint, QPL.faint], [QP.line, QPL.line], [QP.grid, QPL.grid], [QP.acc, QPL.accMark], [QP.slab, QPL.slab], [QP.ghost, QPL.ghost], [QP.panel, QPL.line]]);
themeMap('light', 'surface', [[QP.panel, QPL.panel], [QP.line, QPL.line], [QP.slab, QPL.slab], [QP.ghost, QPL.ghost], [QP.ink, '#2A2D33'], [QP.grid, QPL.grid]]);
THEME.edges.light = [{ col: QPL.panel, line: 'rgba(21,24,29,0.30)' }];
THEME.text = [QP.ink, QPL.ink];

/* ---------- motion ---------- */
const eo = (t, t0, d = 0.5) => MOTION.ease(t, t0, d, 'outExpo');          // strokes, reveals
const eq = (t, t0, d = 0.5) => MOTION.ease(t, t0, d, 'outQuint');         // entrances
const em = (t, t0, d = 0.55) => MOTION.ease(t, t0, d, 'inOutQuart');      // moves, camera, the query token
const ex = (t, t0, d = 0.3) => MOTION.ease(t, t0, d, 'inExpo');           // exits
const out = (t, t1, d = 0.3) => 1 - ex(t, t1, d);                          // 1 until t1, then fades out over d
const fadeIO = (t, t0, t1, d = 0.35, d2 = 0.3) => eo(t, t0, d) * (t1 == null ? 1 : out(t, t1, d2));
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const ph = (q) => P(q);   // alias

/* ---------- ground grid (60 px hairlines, static: the camera never moves the paper) ---------- */
function qgrid() {
  ctx.fillStyle = QP.grid;
  for (let x = 60; x < W; x += 60) ctx.fillRect(x - 1, 0, 2, H);
  for (let y = 60; y < H; y += 60) ctx.fillRect(0, y - 1, W, 2);
}

/* ---------- strokes that draw themselves ---------- */
function seg(x1, y1, x2, y2, p, col = QP.ink, lw = 2.5, dash) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'butt'; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, clamp(p)), lerp(y1, y2, clamp(p))); ctx.stroke(); ctx.restore();
}
/** polyline drawn to fraction p of its length */
function poly(pts, p, col = QP.ink, lw = 2.5, o = {}) {
  if (p <= 0 || pts.length < 2) return; let L = 0; const d = [];
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(l); L += l; }
  let left = L * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'miter'; ctx.lineCap = o.cap || 'butt'; if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / d[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= d[i - 1]; }
  ctx.stroke(); ctx.restore();
}
/** point at fraction p along a polyline */
function along(pts, p) {
  let L = 0; const d = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(l); L += l; }
  let left = L * clamp(p); for (let i = 1; i < pts.length; i++) { if (left <= d[i - 1] || i === pts.length - 1) { const f = d[i - 1] ? clamp(left / d[i - 1]) : 1; return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; } left -= d[i - 1]; }
  return pts[pts.length - 1];
}
/** rectangle outline drawn clockwise from the top-left corner */
function boxD(x, y, w, h, p, col = QP.ink, lw = 2.5) {
  if (p <= 0) return; const i = lw / 2;
  poly([[x + i, y + i], [x + w - i, y + i], [x + w - i, y + h - i], [x + i, y + h - i], [x + i, y + i - lw / 2]], p, col, lw, { cap: 'square' });
}
/** panel: flat fill (fades in) + hairline frame (draws on) */
function panel(x, y, w, h, p, o = {}) {
  if (p <= 0) return;
  withA(clamp(p * 1.6), () => fillRR(x, y, w, h, 0, o.fill || QP.panel));
  boxD(x, y, w, h, p, o.stroke || QP.line, o.lw || 2);
}
function frect(x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }
/** arrow head at (x, y) pointing along angle a */
function head(x, y, a, s, col, p = 1) {
  if (p <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(p * 2); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-s, -s * 0.55); ctx.lineTo(-s, s * 0.55); ctx.closePath(); ctx.fill(); ctx.restore();
}
/** connector with an arrow head that appears once the line arrives */
function arrow(pts, p, col = QP.acc, lw = 3, hs = 14) {
  poly(pts, p, col, lw); if (p > 0.97) { const a = pts[pts.length - 2], b = pts[pts.length - 1]; head(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), hs, col, (p - 0.97) / 0.03); }
}

/* ---------- type ---------- */
/** headline (word-timed, Plex Sans 600, no blur): KT with this film's defaults */
function hd(t, o) { return KT(t, Object.assign({ font: 'disp', upper: false, blur: 0, col: QP.ink, acc: QP.acc, dur: 0.32 }, o)); }
/** small body sentence in Plex Sans 400 dim (editable, wraps) */
function body(t, t0, s, x, y, size = 34, col = QP.dim, maxW = 900, o = {}) {
  const a = fadeIO(t, t0, o.out, 0.4); if (a <= 0) return;
  withA(a, () => withT(0, (1 - eq(t, t0, 0.45)) * 14, 1, 0, () => txtW(s, x, y, FS(size, o.w || 400), col, maxW, size * 1.3, 0, o.key)));
}
/** mono label (mixed case, lightly tracked; >= 30 px; grows 12 % in portrait) */
function lab(s, x, y, size = 30, col = QP.dim, o = {}) { mono(s, x, y, size, col, o.align || 'left', Object.assign({ lower: true, ls: 0.03 }, o)); }
function labA(t, t0, s, x, y, size = 30, col = QP.dim, o = {}) { const a = fadeIO(t, t0, o.out); if (a > 0) withA(a, () => lab(s, x, y, size, col, o)); }
/** (was the "Illustration" label on made-up pictures; her rule 2026-10-14: outputs are ready to post, no disclaimer
 *  labels. Kept as a no-op so the scene calls stay in place.) */
function illus(t, t0, x, y, extra = '', o = {}) { return;
  // portrait: always the last line of the safe area, left; landscape: right-aligned when placed on the right half
  if (PORTRAIT) { x = L; y = Math.min(y, o.yp || 1432); if (('Illustration · ' + extra).length > 34) extra = ''; }
  labA(t, t0, 'Illustration' + (extra ? ' · ' + extra : ''), x, y, o.size || 30, QP.dim, { key: 'illus ' + extra, out: o.out, align: x > W * 0.6 ? 'right' : 'left' });
}

/** code that types on (Plex Mono). lines: [string] ; o: cps (40), size, col, hl [{line, from, to, at, col}], key, caret (true),
 *  lh (1.45), dimLines [i] (comments), keep (lines typed before t0 are shown complete).
 *  Returns {end, w, h, x, y, cw} (cw = advance of one character). Editable per line. */
function code(t, t0, lines, x, y, size = 34, o = {}) {
  const cps = o.cps || 40, lh = size * (o.lh || 1.45), font = FM(size, o.w || 400);
  setFont(font, 0); const cw = ctx.measureText('M').width;
  let tt = t0; const starts = [];
  lines.forEach((s, i) => { starts.push(tt); tt += (s.length / cps) + (o.gap == null ? 0.12 : o.gap); });
  const end = tt; let maxW = 0;
  lines.forEach((s0, i) => {
    const ov = ovr((o.key || 'code') + ' ' + s0); const s = ov.s != null ? ov.s : s0; const ly = y + i * lh;
    const n = o.instant ? s.length : clamp(Math.floor((t - starts[i]) * cps), 0, s.length);
    maxW = Math.max(maxW, s.length * cw);
    if (ov.hide) { regBox(ov, x, ly - size * 0.85, s.length * cw, size * 1.15, { text: s, def: s0 }); return; }
    moved(ov, () => {
      // highlight markers behind tokens (yellow = the query path)
      (o.hl || []).filter(h => h.line === i).forEach(h => {
        const hp = eo(t, h.at, 0.3) * (h.out != null ? out(t, h.out) : 1); if (hp <= 0) return;
        const from = h.from == null ? 0 : (typeof h.from === 'string' ? s.indexOf(h.from) : h.from);
        const to = h.to == null ? (typeof h.from === 'string' ? from + h.from.length : s.length) : h.to;
        if (from < 0) return;
        if (h.box) boxD(x + from * cw - 6, ly - size * 0.86, (to - from) * cw + 12, size * 1.18, hp, h.col || QP.acc, 3);
        else { ctx.save(); ctx.globalAlpha *= clamp(hp * 1.5); ctx.fillStyle = h.col || QP.acc; ctx.fillRect(x + from * cw - 5, ly - size * 0.84, ((to - from) * cw + 10) * hp, size * 1.14); ctx.restore(); }
      });
      if (n > 0) {
        const col = (o.dimLines || []).includes(i) || /^\s*(--|\/\/)/.test(s) ? QP.dim : (o.col || QP.ink);
        // text drawn per run so highlighted runs get dark text
        const hls = (o.hl || []).filter(h => h.line === i && !h.box && eo(t, h.at, 0.3) * (h.out != null ? out(t, h.out) : 1) > 0.5);
        if (!hls.length) _txt(s.slice(0, n), x, ly, font, col);
        else {
          for (let k = 0; k < n; k++) {
            const on = hls.some(h => { const f = typeof h.from === 'string' ? s.indexOf(h.from) : (h.from || 0); const tt2 = h.to == null ? (typeof h.from === 'string' ? f + h.from.length : s.length) : h.to; return k >= f && k < tt2; });
            _txt(s[k], x + k * cw, ly, font, on ? (o.hlInk || QP.accInk) : col);
          }
        }
      }
      if (o.caret !== false && n < s.length && t >= starts[i]) frect(x + n * cw + 2, ly - size * 0.82, size * 0.5, size * 1.05, QP.acc);
      else if (o.caret !== false && i === lines.length - 1 && n === s.length && t < end + (o.caretHold || 0.5) && t >= starts[i]) frect(x + n * cw + 4, ly - size * 0.82, size * 0.5, size * 1.05, QP.acc);
      if (n > 0) regBox(ov, x, ly - size * 0.85, s.length * cw, size * 1.15, { text: s, def: s0 });
    });
  });
  return { end, w: maxW, h: lines.length * lh, x, y, cw, lh, starts };
}
/** cue the typing sound for a code block (call in the builder, same args as code()) */
function sCode(t0, lines, cps = 40, db = 0) { let tt = t0; lines.forEach(s => { if (s.trim().length) sfxType(tt, s.length, cps, db); tt += s.length / cps + 0.12; }); return tt; }
const codeDur = (lines, cps = 40) => lines.reduce((a, s) => a + s.length / cps + 0.12, 0);

/** the query token: a yellow chip with dark mono text, centred at (x, y) */
function chipQ(x, y, s, size = 28, a = 1) {
  if (a <= 0) return; setFont(FM(size, 600), 0); const w = ctx.measureText(s).width + size * 1.1, h = size * 1.85;
  withA(a, () => { themeFixed(() => { frect(x - w / 2, y - h / 2, w, h, QP.acc); _txt(s, x, y + size * 0.36, FM(size, 600), QP.accInk, 'center'); }); });
  return w;
}
/** a filled yellow bar behind a run of text (found) */
function found(x, y, w, h, p) { if (p <= 0) return; themeFixed(() => { ctx.save(); ctx.globalAlpha *= clamp(p * 2); frect(x, y, w * eo(p, 0, 1), h, QP.acc); ctx.restore(); }); }

/** big number counter (raw text, not editable) */
function bigNum(s, x, y, size, col = QP.ink, align = 'left') { _txt(s, x, y, FM(size, 600), col, align, 'alphabetic', -size * 0.03); }

/** a B-tree node: keys in cells; state per key: 0 none, 1 compare flash, 2 found. p = draw progress. returns geometry */
function bnode(cx, y, keys, cw, ch, p, o = {}) {
  const w = keys.length * cw, x0 = cx - w / 2;
  const kp = (k) => (o.kp ? o.kp(k) : 0);
  keys.forEach((k, i) => {
    const st = kp(i);
    if (st > 0) themeFixed(() => { ctx.save(); ctx.globalAlpha *= st >= 1.99 ? 1 : 0.32 * clamp(st); frect(x0 + i * cw + 5, y + 5, cw - 10, ch - 10, QP.acc); ctx.restore(); });
  });
  boxD(x0, y, w, ch, p, o.col || QP.ink, o.lw || 2.5);
  for (let i = 1; i < keys.length; i++) seg(x0 + i * cw, y, x0 + i * cw, y + ch, eo(p, 0.3, 0.7), o.col || QP.ink, o.lw || 2.5);
  keys.forEach((k, i) => {
    const a = clamp((p - 0.35 - i * 0.08) / 0.4); if (a <= 0) return;
    const st = kp(i);
    withA(a, () => _txt(k, x0 + i * cw + cw / 2, y + ch / 2 + (o.size || 27) * 0.34 + (1 - a) * 8, FM(o.size || 27, st >= 1.99 ? 600 : 400), st >= 1.99 ? QP.accInk : (o.tcol || QP.ink), 'center'));
  });
  return { x0, w, y, ch, cw, ptr: (i) => [x0 + i * cw, y + ch], cx, top: [cx, y] };
}

/* ---------- table (rows of mono text with hairline rules) ---------- */
/** cols: [{w, h(header)}]; row(i) -> [strings] ; o: rh, size, n rows, hi(i) -> 0|1|2 (1 = dim, 2 = yellow), p (draw), y0 offset */
function table(x, y, cols, nrows, row, o = {}) {
  const rh = o.rh || 44, size = o.size || 28, W_ = cols.reduce((a, c) => a + c.w, 0), p = o.p == null ? 1 : o.p;
  if (o.header !== false) { let cx = x; cols.forEach(c => { withA(clamp(p * 2), () => _txt(c.h, cx, y - 14, FM(o.hsize || Math.min(28, size), 400), QP.dim)); cx += c.w; }); }
  hline(x, y, W_, eo(p, 0, 1), QP.line, 2);
  for (let i = 0; i < nrows; i++) {
    const ry = y + i * rh; const rp = clamp((p - i * 0.03) * 2.2); if (rp <= 0) continue;
    const st = o.hi ? o.hi(i) : 0;
    if (st === 2) themeFixed(() => frect(x - 8, ry + 3, W_ + 16, rh - 6, QP.acc));
    const vals = row(i); let cx = x;
    withA(rp, () => vals.forEach((v, k) => { _txt(String(v), cx, ry + rh / 2 + size * 0.36, FM(size, st === 2 ? 600 : 400), st === 2 ? QP.accInk : st === 1 ? QP.faint : (o.col ? o.col(i, k) : QP.ink)); cx += cols[k].w; }));
    hline(x, ry + rh, W_, rp, QP.line, 1.5);
  }
  return { w: W_, h: nrows * rh, rh };
}

/* ---------- scenes ---------- */
let _qn = 0;
/** addQ(start, id, draw(t, lt, dur), o): a scene on the off-black grid. o: push (scale over the scene, default 0.022),
 *  anchor [x, y] (push centre), label (chapter name for the editor list). Joins are hard cuts (alternating twin grounds). */
function addQ(start, id, draw, o = {}) {
  const ground = (_qn++ % 2) ? 'qb' : 'qa'; let me = null;
  // hard cut on the word: the cut sits ~0.02 s before her word (callers pass S(phrase, 0.12)), and the first 0.32 s run a
  // little ahead (+0.16 s at the cut, easing to 0) so the new shot opens already half-built, never on empty ground
  if (start > 0) start += 0.1;
  const PRE = o.pre == null ? 0.16 : o.pre, PRE_T = 0.32;
  const wrapped = (t0_, lt) => {
    const t = lt < PRE_T ? t0_ + PRE * (1 - lt / PRE_T) : t0_;
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    const end = sceneEnd(me.n - 1), dur = Math.max(0.5, end - me.start);
    qgrid();
    ctx.save();
    const pk = o.push == null ? V(0.022, 0.035) : o.push * V(1, 1.5);
    if (pk) { const k = 1 + pk * E.inOutCubic(clamp(lt / dur)); const an = typeof o.anchor === 'function' ? o.anchor() : (o.anchor || [L, V(H * 0.45, 900)]); ctx.translate(an[0], an[1]); ctx.scale(k, k); ctx.translate(-an[0], -an[1]); }
    draw(t, t - me.start, dur);
    ctx.restore();
  };
  addScene(start, ground, o.label || id, wrapped, { id });
}

/** chapter card: mono "02 / 10" + big title, the hairline under it draws; the yellow square = where the query is now */
const PLAN = ['Without an index', 'What an index is', 'How it finds a row', 'The types', 'Mistakes'];
/** chapter card: mono "02 / 05" + big title; on the side, the video's plan as a query path: the yellow line draws from the
 *  first step to this one (the camera of the whole film: where the query is now) */
function chapterCard(t, t0, num, title, o = {}) {
  const x = L, y = V(o.y || 470, o.yp || 860), size = V(o.size || 96, o.sizep || 92);
  const a = eo(t, t0, 0.4); const cur = parseInt(num, 10) - 1;
  withA(a, () => lab(num, x, y - size - 34, 32, QP.dim, { key: 'chapter ' + num }));
  hd(t, { lines: V(o.lines || [title], o.linesP || o.lines || [title]), x, y, size, times: o.times, t0: t0 + 0.08, stagger: 0.06, id: 'chapter title ' + num });
  const ny = y + (V((o.lines || [title]).length, (o.linesP || o.lines || [title]).length) - 1) * size * 0.92 + size * 0.5;
  hline(x, ny, V(1100, W - 2 * L), eo(t, t0 + 0.15, 0.7), QP.line, 2);
  // the plan
  const pts = PLAN.map((_, i) => V([1440, 300 + i * 120], [L + 11 + i * ((W - 2 * L - 22) / 4), 400]));
  const lp = eo(t, t0 - 0.1, 0.45);
  poly(pts, lp, QP.line, 2);
  const wp = em(t, t0 + 0.5, 0.4 + 0.3 * cur);
  if (cur > 0) poly(pts.slice(0, cur + 1), wp, QP.acc, 4);
  PLAN.forEach((s, i) => {
    const [px, py] = pts[i]; const pa = eo(t, t0 - 0.1 + i * 0.03, 0.35); if (pa <= 0) return;
    const reached = i < cur || (i === cur && wp > 0.98) || (cur === 0 && i === 0 && t > t0 + 0.5);
    withA(pa, () => {
      if (reached && i === cur) themeFixed(() => frect(px - 13, py - 13, 26, 26, QP.acc));
      else if (i < cur) frect(px - 11, py - 11, 22, 22, QP.ink);
      else { frect(px - 11, py - 11, 22, 22, QP.bg); boxD(px - 11, py - 11, 22, 22, 1, QP.dim, 2); }
      if (!PORTRAIT) _txt(s, px + 40, py + 10, FM(30, i === cur ? 600 : 400), i === cur ? QP.ink : QP.dim);
      else if (i === cur) _txt(String(i + 1).padStart(2, '0'), px, py + 54, FM(28, 600), QP.ink, 'center');
    });
  });
}

/* ---------- sound vocabulary (film.json audio.sfx.roles; SOUND-PALETTE.md) ----------
 * type   key clicks while code types          tick   a comparison / a step / a check
 * draw   pencil / chalk while a diagram draws  found  the search arrives (correct-answer)
 * pop    a token / tag appearing               riser  build-up into a chapter turn (peak on the hit)
 * hit    chapter turn / punch line             shutter a real source (the article credit)
 * page   phone book / book pages               error  a miss (duplicate, LOWER(), leading wildcard)
 * ding   a count lands (7 writes)              swipe  a camera push into the next idea
 * riffle the scan counter running              tape   "We cannot." (a stop)
 * glitch spice (max 1 / min)                   whoosh rationed (<= 1 in 6) */
// each sound's first peak a hair after its loudest-peak alignment would put it (measured by soundqa.py): small per-role offsets
const SFX_OFF = { swipe: 0.03 };
const sx = (role, t, db = 0) => sfx(role, t + (SFX_OFF[role] || 0), db);
const sT = (t, db = 0) => sx('tick', t, db);
const sDraw = (t, db = 0) => sx('draw', t, db);
const sFound = (t, db = 0) => sx('found', t, db);
const sPop = (t, db = 0) => sx('pop', t, db);
const sHit = (t, db = 0) => sx('hit', t, db);
const sRise = (t, db = 0) => sx('riser', t, db);
const sShut = (t, db = 0) => sx('shutter', t, db);
const sPage = (t, db = 0) => sx('page', t, db);
const sErr = (t, db = 0) => sx('error', t, db);
const sDing = (t, db = 0) => sx('ding', t, db);
const sSwipe = (t, db = 0) => sx('swipe', t, db);
const sRiffle = (t, db = 0) => {};   // the riffle bed sat 11-19 dB under her voice (soundqa): dropped
const sTape = (t, db = 0) => sx('tape', t, db);
const sGlitch = (t, db = 0) => sx('glitch', t, db);
const sCard = (t, db = 0) => sx('card', t, db);
/** chapter turn: a riser that peaks on the card, a soft hit on it */
function sChapter(t) { sRise(t + 0.06); sHit(t + 0.06); }
Object.assign(SFX_PRI, { hit: 8, riser: 8, found: 7, error: 7, tape: 7, ding: 6, shutter: 6, page: 5, swipe: 5, type: 4, draw: 3, pop: 3, riffle: 4, card: 3, glitch: 5, tick: 2, whoosh: 5 });
Object.assign(SFX_GAP, { hit: 0.25, riser: 0.1, found: 0.6, error: 0.6, tape: 1, ding: 0.5, shutter: 1, page: 0.5, swipe: 1.5, type: 0.35, draw: 1.2, pop: 0.6, riffle: 2, card: 0.6, glitch: 8, tick: 1.0, whoosh: 4 });

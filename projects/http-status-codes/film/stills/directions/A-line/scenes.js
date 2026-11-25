/* A · LINE DRAWING: scenes on her real lines (raw seconds). Motion test: 110.0-119.9 (GET 200, then 201 Created). */
'use strict';
/* stage geometry: client (laptop) and server (counter), landscape side by side, portrait stacked */
const ST = () => ({
  lx: V(330, CX), ly: V(800, 760), ls: V(440, 400),
  cx: V(1430, CX), cy: V(800, 1700), cw: V(820, 760),
  // request path (client -> server) and response path (server -> client)
  rq: V([700, 590, 960, 590], [CX - 150, 860, CX - 150, 1150]),
  rs: V([960, 700, 700, 700], [CX + 150, 1150, CX + 150, 860]),
});
function stage(t, t0, o = {}) {
  const s = ST(); const p = ez(t, t0, 0.9, 'outQuint');
  laptop(s.lx, s.ly, s.ls, o.drawn ? 1 : p); counter(s.cx, s.cy, s.cw, o.drawn ? 1 : ez(t, t0 + 0.1, 1.0, 'outQuint'), o);
  return s;
}
function push(t, t0, fn) { const k = 1 + 0.025 * clamp((t - t0) / 6); withT(CX, H / 2, k, 0, () => withT(-CX, -H / 2, 1, 0, fn)); }

function buildFilm() {
  /* 0.0 the hook (kept short: only so the timeline starts somewhere) */
  addScene(0, 'a5', 'pre', (t) => {}, { id: 'pre' });

  /* RFC receipt: "The first digit of the three digit number tells you which class it is" (30.7-34.5) */
  addScene(30.7, 'a4', 'rfc', (t) => {
    const p = ez(t, 30.8, 0.5);
    clipCard(t, 'rfc-first', V(110, 70), V(150, 300), V(1000, 940), { at: 30.8, hlAt: 31.3, hl: '#D9F7AE', credit: AL.grey, creditSize: V(24, 26) });
    // handwritten annotation: 200 with the first digit circled
    const x = V(1420, CX), y = V(560, 1300); const f = HAND(V(220, 240));
    withA(ez(t, 31.2, 0.4), () => { _txt('2', x - tw('200', f) / 2, y, f, AL.c2, 'left'); _txt('00', x - tw('200', f) / 2 + tw('2', f), y, f, AL.dim, 'left'); });
    const cx0 = x - tw('200', f) / 2 + tw('2', f) / 2; loop2(cx0, y - V(80, 88), V(78, 86), V(112, 120), ez(t, 31.46, 0.6), AL.c2);
    withA(ez(t, 34.0, 0.4), () => txt('THE CLASS', cx0, y + V(110, 120), HAND(V(46, 52)), AL.c2, 'center', 'alphabetic', 2));
  }, { id: 'rfc' });
  cue('pop', 30.8, -6); cue('marker', 31.3, -6); cue('pencil', 31.46, -5);

  /* five classes at the counter: 4xx = what you asked for (57.3-64.8) */
  addScene(57.3, 'a3', 'classes', (t) => {
    const k = V(0.84, 1); ctx.save(); ctx.translate(CX, 340); ctx.scale(k, k); ctx.translate(-CX, -340);
    const s = stage(t, 57.3, { drawn: true, sign: 'BOOKSTORE API' });
    travel(t, 61.5, 0.8, 'GET /books/9999', ...s.rq, AL.pen);
    travel(t, 62.4, 0.7, '404', ...s.rs, AL.c4); ctx.restore();
    handTitle(t, 57.39, 'THE FIVE CLASSES', '4XX  CLIENT ERROR', V(120, 70), V(190, 300), { hi: '4XX', hiCol: AL.c4 });
    // the class list, right edge (landscape) / under the title (portrait)
    const rows = [['1XX', 'hold on'], ['2XX', 'here’s your book'], ['3XX', 'other branch'], ['4XX', 'what you asked for'], ['5XX', 'our system broke']];
    rows.forEach(([c, d], i) => { const on = c === '4XX'; if (PORTRAIT) return; const xx = 120 + i * 360;
      _txt(c, xx, 975, CODE(32), on ? AL.c4 : AL.dim, 'left'); _txt(d, xx, 1022, HAND(36, 400), on ? AL.pen : '#5A5A58', 'left'); });
  }, { id: 'classes' });
  cue('type', 57.39, -8); cue('click', 61.5, -6); cue('pop', 62.4, -5);

  /* GET /books/42 -> 200 OK with the book (110.0-113.7) */
  addScene(110.0, 'a1', 'get', (t) => push(t, 110.0, () => {
    const s = stage(t, 110.0);
    handTitle(t, 110.17, 'BOOKSTORE API', 'GET /BOOKS/42', V(120, 70), V(190, 300), { rule: true });
    travel(t, 110.45, 0.75, 'GET /books/42', ...s.rq, AL.pen);
    travel(t, 111.79, 0.7, '200', ...s.rs, AL.c2);
    // "OK" + the book ride along once the response lands
    const done = ez(t, 112.64, 0.35); const ex = s.rs[2], ey = s.rs[3];
    withA(done, () => { _txt('OK', ex + V(70, 80), ey + V(14, 14), CODE(V(40, 42)), AL.c2, 'left'); bookGlyph(ex + V(180, 190), ey, V(62, 64), AL.c2); });
    withA(ez(t, 112.95, 0.4), () => txt('with the book', V(ex + 120, CX + 150), V(ey + 110, 960), HAND(V(40, 44), 400), AL.grey, 'center', 'alphabetic', 0, 'with the book'));
  }), { id: 'get' });
  cue('pencil', 110.1, -10); cue('type', 110.17, -9); cue('click', 110.45, -5); cue('pop', 111.79, -4); cue('tick', 112.64, -7);

  /* 201 Created: a new book appears on the shelf; POST /books (113.7-121.9) */
  addScene(113.7, 'a2', 'created', (t) => push(t, 113.7, () => {
    const s = stage(t, 113.7, { drawn: true, books: 8, newAt: 116.68, newP: ez(t, 116.68, 0.7, 'outQuint') });
    handTitle(t, 113.81, '2XX  SUCCESS', '201 CREATED', V(120, 70), V(190, 300), { hi: '201', hiCol: AL.c2 });
    withA(ez(t, 116.9, 0.4), () => txt('something new', V(1660, 860), V(250, 1080), HAND(V(40, 44), 400), AL.c2, 'center', 'alphabetic', 0, 'something new'));
    travel(t, 118.16, 0.75, 'POST /books', ...s.rq, AL.pen);
    travel(t, 120.95, 0.7, '201', ...s.rs, AL.c2);
    withA(ez(t, 121.3, 0.4), () => _txt('Location: /books/43', V(s.rs[2] + 80, CX), V(s.rs[3] + 14, 880), CODE(V(32, 34)), AL.grey, V('left', 'center')));
  }), { id: 'created' });
  cue('type', 113.81, -8); cue('pencil', 116.68, -6); cue('click', 118.16, -5); cue('pop', 120.95, -4);
}
/** a hand-drawn loop around a point */
function loop2(cx, cy, rx, ry, p, col, lw = 6) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60, end = Math.PI * 2.15 * p; for (let i = 0; i <= n; i++) { const a = -Math.PI * 0.6 + end * i / n; const w = 1 + 0.05 * Math.sin(a * 3 + 1); const X = cx + Math.cos(a - 0.08) * rx * w, Y = cy + Math.sin(a) * ry * w; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.stroke(); ctx.restore();
}

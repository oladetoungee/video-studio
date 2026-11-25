/* A · LINE DRAWING (the kodekloud way, with her on camera beside it). One bookshop counter, drawn once in thin white
 * pen lines, is the running example for the whole video. Requests and responses are small code tags that travel between
 * a laptop (the client) and the counter (the server) along dashed lines. Titles are handwritten caps that type on.
 * Ground #0B0B0C, pen #F2F2EE, grey #8A8A86. The class colour is the ONLY colour on screen and says which group a code is in:
 * 1xx stone #C9C6BC, 2xx lime #B6F36A, 3xx sky #74C7FF, 4xx amber #FFB547, 5xx coral #FF6F61 (one class per scene).
 * Type: Kalam 700 (handwritten caps titles), Fragment Mono (code tags, labels). */
'use strict';
const AL = { bg: '#0B0B0C', pen: '#F2F2EE', grey: '#8A8A86', dim: '#3A3A3A', c1: '#C9C6BC', c2: '#B6F36A', c3: '#74C7FF', c4: '#FFB547', c5: '#FF6F61' };
for (const k of ['a1', 'a2', 'a3', 'a4', 'a5']) G[k] = { bg: AL.bg, fg: AL.pen, mid: AL.grey, line: AL.dim, acc: AL.c2, card: '#161616', panel: '#161616', grid: AL.dim, mode: 'dark' };
F.disp = (s, w = 700) => `${w} ${s}px Kalam`;
F.body = (s, w = 400) => `${w} ${s}px Kalam`;
F.mono = (s) => `400 ${s}px "Fragment Mono"`;
const HAND = (s, w = 700) => `${w} ${s}px Kalam`;
const CODE = (s) => `400 ${s}px "Fragment Mono"`;
const classCol = (code) => AL['c' + String(code)[0]] || AL.pen;

/** pen stroke along a polyline, drawn to fraction p of its length */
function pen(pts, p, col = AL.pen, lw = 4, dash) {
  if (p <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(...pts[0]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= seg[i - 1]; }
  ctx.stroke(); ctx.restore();
}
const box = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
/** handwritten title that types on letter by letter (kodekloud): label above in grey, title in pen white, key word coloured */
function handTitle(t, t0, label, title, x, y, o = {}) {
  const fs = o.size || V(92, 84); const n = Math.round(title.length * clamp((t - t0) / (o.dur || Math.max(0.5, title.length / 26))));
  if (label) withA(ez(t, t0 - 0.2, 0.3), () => txt(label, x, y - fs * 0.95, HAND(V(36, 38)), o.labelCol || AL.c4, o.align || 'left', 'alphabetic', 1.5, 'label ' + label));
  const shown = title.slice(0, n); const f = HAND(fs);
  if (o.hi) { // colour one word
    const i = title.indexOf(o.hi); const x0 = o.align === 'center' ? x - tw(title, f) / 2 : x;
    _txt(shown, x0, y, f, AL.pen, 'left'); if (i >= 0 && n > i) _txt(title.slice(i, Math.min(n, i + o.hi.length)), x0 + tw(title.slice(0, i), f), y, f, o.hiCol || AL.c2, 'left');
    regBox(ovr(title), x0, y - fs * 0.8, tw(title, f), fs, { text: title, def: title });
  } else txt(shown, x, y, f, AL.pen, o.align || 'left', 'alphabetic', 0, title);
  if (o.rule && n >= title.length) { const w = tw(title, f); const x0 = o.align === 'center' ? x - w / 2 : x; pen([[x0, y + fs * 0.32], [x0 + w, y + fs * 0.32]], ez(t, t0 + title.length / 26, 0.4), AL.grey, 2, [10, 8]); }
}
/** a code tag (squared, radius 8): outline in the class colour, faint fill; o.p entrance 0..1 */
function tag(s, x, y, col, o = {}) {
  const fs = o.size || V(44, 44); const f = CODE(fs); const w = tw(s, f) + fs * 1.1, h = fs * 1.75; const a = o.p == null ? 1 : o.p; if (a <= 0) return { w, h };
  withA(a, () => withT(x, y, 0.9 + 0.1 * a, 0, () => { fillRR(-w / 2, -h / 2, w, h, 8, AL.bg); fillRR(-w / 2, -h / 2, w, h, 8, hexA(col, 0.14)); strokeRR(-w / 2, -h / 2, w, h, 8, col, 3); _txt(s, 0, fs * 0.36, f, col === AL.pen ? AL.pen : col, 'center'); }));
  return { w, h };
}
/** a tag that travels from (x0,y) to (x1,y) between t0 and t0+d along a dashed line that draws ahead of it */
function travel(t, t0, d, s, x0, y0, x1, y1, col) {
  pen([[x0, y0], [x1, y1]], ez(t, t0 - 0.1, d * 0.8, 'outQuint'), AL.dim, 3, [12, 10]);
  const p = io(t, t0, d); if (t < t0) return;
  // motion blur: a short ghost trail while moving
  const v = Math.sin(Math.PI * clamp((t - t0) / d)); for (let k = 3; k >= 1; k--) withA(0.12 * v, () => tag(s, lerp(x0, x1, Math.max(0, p - 0.04 * k)), lerp(y0, y1, Math.max(0, p - 0.04 * k)), col));
  tag(s, lerp(x0, x1, p), lerp(y0, y1, p), col, { p: clamp((t - t0) / 0.18) });
}
/** the client: a line-drawn laptop centred at (cx, cy), width s */
function laptop(cx, cy, s, p) {
  const w = s, h = s * 0.62; pen(box(cx - w / 2, cy - h, w, h), p, AL.pen, 4); pen(box(cx - w / 2 + 14, cy - h + 14, w - 28, h - 28), ez(p, 0.35, 0.65), AL.grey, 2);
  pen([[cx - w * 0.62, cy], [cx + w * 0.62, cy], [cx + w * 0.56, cy + 16], [cx - w * 0.56, cy + 16], [cx - w * 0.62, cy]], ez(p, 0.5, 0.5), AL.pen, 4);
}
/** the server: the bookshop counter (desk + shelf of books + the attendant), centred at cx, desk top at y, width w */
function counter(cx, y, w, p, o = {}) {
  const x = cx - w / 2; const hD = w * 0.26;
  pen(box(x, y, w, hD), p, AL.pen, 4); pen([[x - 20, y], [x + w + 20, y]], p, AL.pen, 5);
  // shelf behind
  const sy = y - w * 0.46; pen([[x + w * 0.05, sy], [x + w * 0.95, sy]], ez(p, 0.2, 0.6), AL.grey, 3);
  const books = o.books || 7; for (let i = 0; i < books; i++) { const bw = w * 0.07, bh = w * (0.13 + 0.03 * ((i * 7) % 3)); const bx = x + w * 0.1 + i * bw * 1.25;
    const isNew = o.newAt != null && i === books - 1; const q = isNew ? o.newP : ez(p, 0.3 + i * 0.05, 0.4);
    pen(box(bx, sy - bh, bw, bh), q, isNew ? AL.c2 : AL.grey, isNew ? 4 : 3); }
  // attendant: head + shoulders behind the desk
  const ax = x + w * 0.72; pen([[ax - 60, y], [ax - 60, y - 40], [ax - 30, y - 70], [ax + 30, y - 70], [ax + 60, y - 40], [ax + 60, y]], ez(p, 0.4, 0.5), AL.pen, 4);
  if (p > 0.55) { ctx.save(); ctx.strokeStyle = AL.pen; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ax, y - 112, 34, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ez(p, 0.55, 0.45)); ctx.stroke(); ctx.restore(); }
  // sign on the desk front
  withA(ez(p, 0.6, 0.4), () => _txt(o.sign || 'BOOKSTORE API', cx, y + hD * 0.62, HAND(V(40, 40)), AL.grey, 'center', 'alphabetic', 2));
}
/** a little line book (rides with a response) */
function bookGlyph(cx, cy, s, col) { pen(box(cx - s * 0.36, cy - s / 2, s * 0.72, s), 1, col, 3); pen([[cx - s * 0.22, cy - s * 0.2], [cx + s * 0.22, cy - s * 0.2]], 1, col, 2); }

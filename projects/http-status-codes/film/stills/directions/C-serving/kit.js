/* C · NOW SERVING. A take-a-number counter: every request is a paper ticket printed and torn from a red dispenser; the
 * server's answer lights up on an amber dot-matrix "NOW SERVING" board. Real pages are taped to the wall as receipts.
 * Wall #DDE3E6, dispenser red #D6281F, ticket paper #FFFDF4, board #141414 with amber dots #FFB21A (unlit #2B2418).
 * Red only ever = the dispenser / a request; amber only ever = the server's answer. Type: Reddit Sans 800/400 (her words,
 * ticket text), Reddit Mono (labels, credits), the board's own 5x7 dot font. */
'use strict';
const CS = { wall: '#DDE3E6', red: '#D6281F', redD: '#A81C15', paper: '#FFFDF4', board: '#141414', amber: '#FFB21A', off: '#2B2418', ink: '#16191B', mid: '#5E676C' };
for (const k of ['c1', 'c2', 'c3', 'c4', 'c5']) G[k] = { bg: CS.wall, fg: CS.ink, mid: CS.mid, line: 'rgba(22,25,27,0.18)', acc: CS.red, card: CS.paper, panel: CS.paper, grid: 'rgba(22,25,27,0.1)', mode: 'light' };
const RS = (s, w = 800) => `${w} ${s}px "Reddit Sans"`;
const RM = (s, w = 500) => `${w} ${s}px "Reddit Mono"`;
/* 5x7 dot font (rows top to bottom, 5 bits each) */
const DOT = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'], '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'], '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'], '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'], '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'], '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'], D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'], F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111'], H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'], K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'], M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'], O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'], R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'], T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'], V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'], Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'], ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'], '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
};
const dotW = (s, pitch) => (s.length * 6 - 1) * pitch;
/** dot-matrix text: lit dots amber, the rest of each cell unlit; p 0..1 lights rows top to bottom (the flick) */
function dotText(s, x, y, pitch, o = {}) {
  const p = o.p == null ? 1 : o.p; const r = pitch * 0.4; const x0 = o.align === 'center' ? x - dotW(s, pitch) / 2 : o.align === 'right' ? x - dotW(s, pitch) : x;
  [...s].forEach((ch, i) => { const gl = DOT[ch] || DOT[' ']; for (let row = 0; row < 7; row++) for (let c = 0; c < 5; c++) {
    const on = gl[row][c] === '1' && row < 7 * p + 0.01 && (o.p == null || p > 0); const cx = x0 + (i * 6 + c) * pitch + pitch / 2, cy = y + row * pitch + pitch / 2;
    if (o.unlit !== false && ch !== ' ') circle(cx, cy, r, CS.off); if (on) circle(cx, cy, r, o.col || CS.amber); } });
  return dotW(s, pitch);
}
/** the board: a black panel with NOW SERVING + a big code + a reason line. o: code, reason, at (flick time), pitch */
function board(t, x, y, w, h, o = {}) {
  fillRR(x, y, w, h, 18, CS.board);
  const hp = Math.max(7, Math.round(Math.min(w / 110, h / 70))); dotText('NOW SERVING', x + w / 2, y + h * 0.07, hp, { align: 'center' });
  const big = o.pitch || Math.round(Math.min(w / 21, h * 0.071)); const list = o.codes || [[0, o.code || '200', o.reason || 'OK']];
  let cur = list[0]; let at = list[0][0]; for (const c of list) if (t >= c[0]) { cur = c; at = c[0]; }
  const fl = clamp((t - at) / 0.22); const yc = y + h * 0.21;
  dotText(cur[1], x + w / 2, yc, big, { align: 'center', p: at > 0 ? fl : 1 });
  const rp = Math.floor(Math.min(big * 0.4, w * 0.9 / (12 * 6))); if (cur[2] != null) dotText(cur[2] || ' ', x + w / 2, yc + big * 7.7, rp, { align: 'center', p: at > 0 ? clamp((t - at - 0.08) / 0.22) : 1 });
  return cur;
}
/** the red ticket dispenser (front view) with a ticket coming out of the slot. o: printAt, tearAt, lines[] */
function dispenser(t, x, y, s, o = {}) {
  const w = s, h = s * 1.15; fillRR(x, y, w, h, s * 0.18, CS.red); fillRR(x + w * 0.12, y + h * 0.62, w * 0.76, h * 0.07, 6, CS.redD);
  _txt('TAKE A NUMBER', x + w / 2, y + h * 0.22, RS(s * 0.085, 800), CS.paper, 'center', 'alphabetic', 2);
  // the ticket: prints downward out of the slot, then is torn and lifts away to the side
  if (o.printAt == null || t < o.printAt) return;
  const pr = ez(t, o.printAt, 0.8, 'outQuint'); const tear = o.tearAt == null ? 0 : io(t, o.tearAt, 0.55);
  const tw0 = w * 0.86, th = s * 0.8 * pr; const tx = x + (w - tw0) / 2 + tear * (o.tearDX || s * 1.25), ty = y + h * 0.655 + tear * (o.tearDY || -s * 0.1);
  withT(tx + tw0 / 2, ty, 1, tear * (o.tearR || 0.06), () => ticket(-tw0 / 2, 0, tw0, th, o.lines || [], s));
}
function ticket(x, y, w, h, lines, s) {
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); rect(x, y, w, h, CS.paper);
  // perforated bottom edge
  ctx.fillStyle = CS.wall; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(x + (i + 0.5) * w / 10, y + h, w / 40, 0, Math.PI * 2); ctx.fill(); }
  lines.forEach((ln, i) => _txt(ln[0], x + w / 2, y + s * (0.17 + 0.13 * i), ln[1] ? RS(s * ln[1], 800) : RM(s * 0.098, 600), ln[2] || CS.ink, 'center'));
  ctx.restore();
}
/** her words typed onto the wall: Reddit Sans 800, ink, word times */
function wallWords(t, lines, times, x, y, size, o = {}) { return KT(t, { lines, times, x, y, size, font: 'body', weight: 800, upper: false, align: o.align || 'left', col: CS.ink, blur: 6, lh: 1.04, id: o.id }); }

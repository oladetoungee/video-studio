/* phone-distraction · Receipt look: building blocks on top of kit.js (chapter titles, the paper punch screen, a barcode, slot
 * reels for a phone screen, a big printed number). All drawn UI is generic (no real app, no logo). Pure functions of t. */
'use strict';

/** a feature chapter title: the feature's name in big white type, landing on her word (the old FEATURE 0n eyebrow is gone) */
function featureTitle(t, n, name, at, o = {}) {
  const x = o.x == null ? V(110, 70) : o.x, y = o.y == null ? V(110, SAFE.contentTop + 10) : o.y;
  const la = o.labAt == null ? at - 0.05 : o.labAt; if (t < la) return y;
  // no "FEATURE 0n" eyebrow (banned): the title alone, in its place
  if (t < at - 0.05) return y;
  const L = rich(t, name, { x, y: y + V(56, 60), size: o.size || V(118, 108), weight: 700, lh: 0.98, maxW: o.maxW || V(860, 940), times: o.times || [at], mode: o.mode || 'drop', ev: o.ev });
  return y + V(56, 60) + L.h;
}
/** the punch screen (slip ground: the receipt fills the frame): huge ink type, *marker* words, a mono line under it */
function punch(t, s, o) {
  const size = o.size || V(150, 120);
  const L = rich(t, s, { x: o.x == null ? V(110, 70) : o.x, y: o.y == null ? V(250, 640) : o.y, size, weight: 700, lh: 0.96, maxW: o.maxW || V(1650, 940), times: o.times, ev: o.ev, at: o.at, mode: o.mode, col: RC.ink, key: o.key });
  return L;
}
/** a barcode (deterministic bars) at x, y, w, h */
function barcode(x, y, w, h, seed = 3, col = RC.ink) {
  let xx = x; let i = 0; while (xx < x + w) { const bw = 2 + Math.floor(hash(seed * 31 + i) * 4) * 2; if (i % 2 === 0) rect(xx, y, Math.min(bw, x + w - xx), h, col); xx += bw; i++; }
}
/** three slot reels on a phone screen. reels: [[stopTime, label]...]; spinFrom: time they start; symbols: list */
const REEL_SYM = ['—', '♥', '✉', '★', '99+', '♥ 1', '—', '✉ 3'];
function uiReels(t, sx, sy, sw, sh, spinFrom, stops, o = {}) {
  const gap = sw * 0.05, rw = (sw - gap * 4) / 3, rh = sh * 0.34, ry = sy + sh * 0.3;
  fillRR(sx + gap * 0.6, ry - gap, sw - gap * 1.2, rh + 2 * gap, sw * 0.05, RC.ink);
  for (let c = 0; c < 3; c++) {
    const rx = sx + gap + c * (rw + gap); fillRR(rx, ry, rw, rh, sw * 0.03, RC.paper);
    ctx.save(); rr(rx, ry, rw, rh, sw * 0.03); ctx.clip();
    // which pull are we on: spin between each start and its stop (reel c stops c*0.18 s later)
    let res = o.idle || '—', spinning = false, sp = 0;
    stops.forEach(([st, label, from]) => { const s0 = from == null ? spinFrom : from; const end = st + c * 0.18; if (t >= s0 && t < end) { spinning = true; sp = (t - s0) * 9; } if (t >= end) res = Array.isArray(label) ? label[c] : label; });
    const fs = rw * 0.42;
    if (spinning) { for (let j = -1; j <= 1; j++) { const k = Math.floor(sp) + j; const yy = ry + rh / 2 + (j + (sp % 1)) * rh * 0.55; withBlur(4, () => _txt(REEL_SYM[((k + c * 3) % REEL_SYM.length + REEL_SYM.length) % REEL_SYM.length], rx + rw / 2, yy + fs * 0.35, FT(700, fs), RC.inkMid, 'center')); } }
    else { const big = /99/.test(res); if (big) badge(rx + rw / 2, ry + rh / 2, res, rw / 120, 1); else _txt(res, rx + rw / 2, ry + rh / 2 + fs * 0.35, FT(700, fs), res === '♥' || /♥/.test(res) ? RC.red : RC.ink, 'center'); }
    ctx.restore();
  }
  return { ry, rh };
}
/** a big printed number on the ground (e.g. a year): white, light weight, drops in on its time */
function bigNum(t, s, x, y, size, at, o = {}) { rich(t, s, { x, y, size, weight: o.weight || 700, lh: 0.9, maxW: 2000, times: [at], mode: 'drop', align: o.align, col: o.col, key: o.key }); }

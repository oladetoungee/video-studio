/* Shared layout for the reading-stack talking-head moments (loaded before every moment script).
 *   16:9  "beside": plates on the left third (x 110..~860), her face right of centre.
 *         "split":  a flat panel 0..880 on the left, her reframed to the right (z 1.38, face at 74 %).
 *   9:16  "beside": plates in the band under her chin (y ~1180..1440); captions own 1460..1660.
 *         "split":  a flat panel from y 1110 to the bottom, her face pushed up (z 1.22, face at 33 %);
 *                   panel content lives in y 1160..1440 (the captions sit on the panel below it).
 *   card: full frame, her voice continues. Portrait content stays inside 370..1440.
 */
'use strict';
const LX = () => V(110, 80);
// 9:16: never below 1.08x, so the crop can lift her face (at 1.0 the crop is the full source height and her chin sits on
// the plates' band). 1.08x of the 4K source is a 4 % upscale.
const CAM0 = CAM;
CAM = (t, o = {}) => CAM0(t, PORTRAIT && !o.pad ? { ...o, z: Math.max(o.z == null ? 1 : o.z, 1.08) } : o);                       // left edge for text
const PS_ = { w: () => V(880, W), h: () => V(H, 810) };  // split panel size
// split framing. 16:9: her face at 74 % (z 1.38). 9:16: she is drawn smaller (z 0.88, a "window" over the panel, face ~600 px
// wide, eyes at ~y 560, chin at ~y 960); the strip below the source picture is padding hidden under the panel. The
// portrait key lands 0.12 s after the panel starts, when the panel already covers that strip.
function camSplit(t, o = {}) { CAM(t + V(0, 0.12), { z: V(1.3, 0.84), fx: V(0.74, null), fy: V(null, 0.35), pad: PORTRAIT, ...o }); }
function camFit(t, o = {}) { CAM(t, { z: 1.0, ...o }); }
function camPunch(t, z16 = 1.28, z9 = 1.08, o = {}) { CAM(t, { z: V(z16, z9), ...o }); }
/** split panel: left in 16:9, bottom in 9:16 */
// 9:16: while the panel is in, the captions sit just above the panel line (y 1050, between her chin and the panel) and
// the panel content owns y 1160..1640.
const SPLIT9 = { capY: 1062 };
function split(t, t0, ground, fn, o = {}) {
  if (PORTRAIT && t >= t0 + 0.12 && (o.t1 == null || t < o.t1)) FOOT.capYNow = SPLIT9.capY;
  return panel(t, { t0, t1: o.t1, side: V('left', 'bottom'), size: V(880, 810), ground, dur: o.dur || 0.38, grid: o.grid }, (r) => {
    FIT.right = V(r.x + r.w - 80, null);   // 16:9: nothing may run within 80 px of the panel's edge
    try { fn(r); } finally { FIT.right = null; }
  });
}
// text inside a 16:9 panel shrinks to stay clear of the panel edge (KT, plates, list rows)
const FIT = { right: null };
const KT0 = KT, plateText0 = plateText, IDX0 = IDX;
KT = (t, o) => { if (FIT.right && !o.fitW && (o.align || 'left') === 'left') o = { ...o, fitW: FIT.right - o.x }; return KT0(t, o); };
plateText = (t, o) => { if (FIT.right && !o.fitW) o = { ...o, fitW: FIT.right - o.x }; return plateText0(t, o); };
IDX = (t, rows, o) => {
  if (FIT.right) {
    const x = o.x == null ? L : o.x, nx = o.numW == null ? 125 : o.numW, av = FIT.right - x - nx; let size = o.size || 76;
    for (const r of rows) { const sz = r.size || size; const w = tw(r.s.toUpperCase(), F.disp(sz), sz * LS.disp); if (w > av) size = Math.min(size, Math.floor(sz * av / w)); }
    o = { ...o, size, w: Math.min(o.w || 9999, FIT.right - x) };
  }
  return IDX0(t, rows, o);
};
// minimum label sizes (readable on a phone / laptop): mono tags >= 30 px (16:9) / 36 px (9:16)
const tag0 = tag;
tag = (t, t0, s, x, y, o = {}) => tag0(t, t0, s, x, y, { ...o, size: Math.max(o.size || 26, V(30, 36)) });
/** vertical centre of the split panel's text block (16:9) / top of its content band (9:16) */
const SPLIT_Y = () => V(540, 1160);
/** portrait panel content band */
const P9 = { top: 1170, bottom: 1640 };

/** two stacked plates beside her (the most common beat). a/b: {s, times, plate}. Positions per aspect. */
function plates2(t, a, b, o = {}) {
  const x = o.x == null ? LX() : o.x, y = o.y == null ? V(440, 1322) : o.y, s = o.size || V(124, 96);
  if (a) plateText(t, { lines: [a.s], x, y, size: s, plate: a.plate || 'ink', times: a.times, out: o.out, font: a.font, id: a.id });
  if (b) plateText(t, { lines: [b.s], x, y: y + s * 1.3, size: b.size || s, plate: b.plate || 'paper', times: b.times, out: o.out, font: b.font, id: b.id });
}

/** a contents page as a card: mono header, numbered rows (real chapter titles only). rows: [{n, s, tin}], o.mark: {i, t} highlight */
function contentsCard(t, t0, x, y, w, rows, o = {}) {
  const p = sn(t, t0, 0.45); if (p <= 0) return;
  const rh = o.rowH || 74, size = o.size || 36, h = (o.headH || 96) + rows.length * rh + 30;
  grp(o.key || 'contents', x, y, w, h, () => withT(0, 60 * (1 - p), 1, 0, () => withA(clamp(p * 2), () => {
    rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
    mono(o.title || 'Contents', x + 40, y + 58, 24, C.mid, 'left', { fixed: true, key: 'contents-title' });
    rows.forEach((r, i) => {
      const ry = y + (o.headH || 96) + i * rh + rh * 0.62; const rp = prog(t, r.tin, 0.3); if (rp <= 0) return;
      withA(rp, () => {
        const m = o.mark && o.mark.i === i ? prog(t, o.mark.t, 0.35) : 0;
        if (m > 0) marker(x + 20, ry - size * 0.95, (w - 40), size * 1.4, m, '#DCE3FF');
        _txt(String(r.n).padStart(2, '0'), x + 40, ry, F.mono(26, 500), C.blue, 'left', 'alphabetic', 2);
        txt(r.s, x + 110, ry, F.body(size, 700), r.dim ? C.mid : C.ink);
        if (i < rows.length - 1) rect(x + 40, ry + rh * 0.38, w - 80, 2, C.line);
      });
    });
  })));
}

/** a small idea card (paper tag, mono label, two placeholder lines) at cx, cy, rotated */
function ideaCard(cx, cy, rot, label, a = 1, s = 1) {
  withA(a, () => withT(cx, cy, s, rot, () => {
    rect(-110, -62, 220, 124, C.card); strokeR(-110, -62, 220, 124, C.ink, 3);
    const ls = Math.min(26, 26 * 180 / Math.max(1, monoW(label, 26, { raw: true })));
    _mono(label, -92, -18, ls, C.blue, 'left', { ls: 0.1 });
    rect(-88, 6, 150, 12, '#D8D1C4'); rect(-88, 30, 100, 12, '#D8D1C4');
  }));
}

/** a horizontal bar (page counts): label left, value right, bar grows to frac. */
function barRow(t, t0, x, y, w, frac, label, value, o = {}) {
  const bh = o.h || 44, col = o.col || C.ink;
  if (o.labelFrom != null) withA(prog(t, o.labelFrom, 0.3), () => { mono(label, x, y - bh / 2 - 14, o.labSize || 24, o.labCol || g.mid, 'left', { fixed: true, key: o.key || label }); strokeR(x, y - bh / 2 + 6, w, bh, g.line, 2); });
  const p = prog(t, t0, 0.5); if (p <= 0) return; const e = E.outQuart(p);
  withA(clamp(p * 3), () => {
    if (o.labelFrom == null) mono(label, x, y - bh / 2 - 14, o.labSize || 24, o.labCol || g.mid, 'left', { fixed: true, key: o.key || label });
    rect(x, y - bh / 2 + 6, w * frac * e, bh, col);
    _txt(value, x + w * frac * e + 18, y + bh / 2 - 2, F.disp(o.valSize || 52), col, 'left', 'alphabetic', -1);
  });
}

/** lower band: 16:9 a flat panel over the bottom 34 % (it also hides the book she holds at chest height, which the
 *  mirrored source shows backwards); 9:16 the normal split panel. Camera: camBand (16:9 face lifted, 9:16 split framing). */
function band(t, t0, ground, fn, o = {}) {
  if (!PORTRAIT) return panel(t, { t0, t1: o.t1, side: 'bottom', size: o.size || 440, ground, dur: o.dur || 0.38 }, (r) => { FIT.right = W - 110; try { fn(r); } finally { FIT.right = null; } });
  return split(t, t0, ground, fn, o);
}
function camBand(t, o = {}) { if (PORTRAIT) camSplit(t, o); else CAM(t, { z: 1.22, fy: 0.3, ...o }); }
const BAND_Y = 640 + 62;   // 16:9: first baseline inside the band (band = bottom 41 %, her chin stays above it)

/* cookies film kit: A · CRASH TEST on her cleaned voice (film/tools/voice.py = the full talking-head edit's cut).
 * The look and every graphic come from scenes/ck.js (shared with the talking-head edit); this file adds what only the film
 * needs: the frame rect per aspect, her lines as type (where the edit shows her face), the marker wipe (chapter openers:
 * the next screen opens through the spinning crash marker) and the scene helper. */
'use strict';
const FR = () => V({ x: 0, y: 0, w: W, h: H }, { x: 0, y: SAFE.contentTop - 40, w: W, h: SAFE.contentBottom - SAFE.contentTop + 80 });
/** her line as type: an optional mono kicker, the line in Saira caps, [word] = black box */
const quote = (o) => (t, r) => { rect(0, 0, W, H, o.ink ? CK.ink : CK.conc);
  CK.fit(r, (L) => { const m = L.wide ? 110 : 60; const z = o.size || (L.wide ? 150 : 130); const n = String(o.lines).split('\n').length;
    const y = L.h * (o.y || 0.5) - (n - 1) * z * 0.45 + z * 0.3;
    if (o.kicker) withA(ckE(t, o.at || 0, 0.35), () => { if (o.marker) CK.mark(m + 30, y - z * 1.05, 56); CK.lab('kicker', o.kicker, m + (o.marker ? 76 : 0), y - z * 0.9, L.wide ? 44 : 40, o.ink ? '#A9AEAC' : CK.ink); });
    const qb = CK.text(t, 'q', o.lines, m, y, z, { at: o.at, enter: o.enter, hits: o.hits, maxW: L.w - 2 * m, col: o.ink ? CK.white : CK.ink, boxCol: o.ink ? CK.grn : CK.ink, hiCol: CK.white, upper: o.upper });
    if (o.small) withA(ckE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.6, 0.45), () => CK.text(t, 'small', o.small, m, y + qb.h - z * 0.8 + 90, L.wide ? 48 : 44, { font: 'mono', upper: false, col: o.ink ? CK.white : CK.ink, maxW: L.w - 2 * m })); });
};
/** the marker wipe: for the first d s, the scene shows through a growing circle with the crash marker's ring */
function markIn(t, t0, prevBg, draw, d = 0.45) {
  const p = MOTION.ease(t, t0, d, 'inOutQuart'); if (p >= 1) return draw();
  rect(0, 0, W, H, prevBg); const R = Math.hypot(W, H) * 0.55 * p + 4; const cx = W * 0.5, cy = H * 0.5;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip(); draw(); ctx.restore();
  if (p < 0.35) CK.mark(cx, cy, Math.max(40, R * 2), p * 6); else { ctx.save(); ctx.strokeStyle = CK.ink; ctx.lineWidth = V(22, 18); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
}
const FILMX = { prev: CK.conc };
/** one film scene from `start` on ground g; draw(t, r) is a CK graphic or quote; o.mark: open through the marker wipe */
function FS(id, start, g, draw, o = {}) {
  const prev = FILMX.prev; const bg = (G[g] || G.ckLab).bg; FILMX.prev = bg; const t0 = start;
  // a slow push on every screen (1.2 % per second, at most 5 %): something always moves, never a dead hold
  const push = (t, fn) => { const k = 1 + Math.min(0.08, Math.max(0, t - t0 - 2.2) * 0.007); withT(CX * (1 - k), H / 2 * (1 - k), k, 0, fn); };
  addScene(t0, g, '', (t) => { const r = FR(); rect(0, 0, W, H, bg);
    if (o.mark) markIn(t, t0, prev, () => { rect(0, 0, W, H, bg); push(t, () => draw(t, r)); }); else push(t, () => draw(t, r)); }, { id });
  if (o.mark) sfx('dot', t0 + 0.05, 0);
}

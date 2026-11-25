/* dark-patterns film kit: C · BLOWN UP on her cleaned voice (film/tools/voice.py = the full talking-head edit's cut).
 * The look and every graphic come from scenes/dp.js (shared with the talking-head edit); this file adds what only the
 * film needs: the frame rect per aspect, her quoted lines as type (where the edit shows her face), the lens wipe (the
 * signature move: the next screen opens through the magnifying glass) and the scene helper. */
'use strict';
G.dpPink.altKey = 'dpInk'; G.dpInk.altKey = 'dpPink';
/** the content rect: 16:9 the whole frame; 9:16 the safe band (Shorts / Reels UI covers the top and bottom) */
const FR = () => V({ x: 0, y: 0, w: W, h: H }, { x: 0, y: SAFE.contentTop - 30, w: W, h: SAFE.contentBottom - SAFE.contentTop + 60 });
/** her line as type: a mono kicker (optional), her words in Geist Light, the key words in Geist 900 with [blocks] */
const quote = (o) => (t, r) => { const gr = G[o.ground || 'dpPink']; rect(0, 0, W, H, gr.bg); const m = V(120, 80);
  DP.push(t, o.at || 0, r, () => {
    if (o.kicker) withA(dpE(t, o.at || 0, 0.4), () => mono(o.kicker, r.x + m, r.y + r.h * 0.22, V(30, 32), gr.mid, 'left', { key: 'kicker' }));
    const z = (o.size || V(120, 96)) * V(1, 1.3); const n = String(o.lines).split('\n').length; const y = r.y + r.h * (o.y || 0.42) - (n - 1) * z * 0.55;
    const b = DP.text(t, 'q', o.lines, r.x + m, y, z, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: gr.fg, knock: gr === G.dpInk ? DP.ink : DP.pink, blockCol: gr === G.dpInk ? DP.pink : DP.ink, f: o.light ? (s) => F.body(s, 300) : undefined });
    if (o.small) withA(dpE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.6, 0.45), () => txtW(o.small, r.x + m, y + b.h + V(40, 44), F.body(V(52, 48), 300), gr.fg, r.w - 2 * m, V(64, 60), 0, 'small'));
  });
};
/** the lens wipe: for the first d s of a scene, the scene shows through a growing lens over the previous ground */
function lensIn(t, t0, prevBg, draw, d = 0.42) {
  const p = MOTION.ease(t, t0, d, 'inOutQuart'); if (p >= 1) return draw();
  rect(0, 0, W, H, prevBg); const R = Math.hypot(W, H) * 0.55 * p + 4; const cx = W * 0.5, cy = H * 0.5;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip(); const k = 1.18 - 0.18 * p; withT(cx * (1 - k), cy * (1 - k), k, 0, draw); ctx.restore();
  ctx.save(); ctx.strokeStyle = DP.ink; ctx.lineWidth = V(26, 22) * (1 - p * 0.5); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
const FILMX = { prev: DP.pink };
/** one film scene: from the phrase's start (minus lead) on ground g; draw(t, r) is a DP graphic or quote; o.lens: open
 *  through the lens (with a swipe), else a hard cut on her word */
function FS(id, start, g, draw, o = {}) {
  const prev = FILMX.prev; const bg = (G[g] || G.dpPink).bg; FILMX.prev = bg; const t0 = start;
  // o.zoom: a small UI card (checkout, prompt, trial) drawn at poster scale: laid out in a smaller rect, scaled up around the centre
  const z = o.zoom ? V(o.zoom, Math.max(1, o.zoom * 0.85)) : 1;
  const big = (t) => { const r = FR(); if (z === 1) return draw(t, r); const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const r2 = { x: cx - r.w / z / 2, y: cy - r.h / z / 2, w: r.w / z, h: r.h / z };
    withT(cx * (1 - z), cy * (1 - z), z, 0, () => draw(t, r2)); };
  addScene(t0, g, '', (t) => { rect(0, 0, W, H, bg);
    if (o.lens) lensIn(t, t0, prev, () => { rect(0, 0, W, H, bg); big(t); }); else big(t); }, { id });
  if (o.lens) sfx('swipe', t0 + 0.12, -6);
}
/* sound cues land on their picture change: scenes/nudges.js (made from the lab audit by tools/nudges.py) */
{ const sfx0 = sfx; sfx = function (role, t, db, o) { const k = role + '@' + (+t).toFixed(2); return sfx0(role, t + ((typeof NUDGE !== 'undefined' && NUDGE[k]) || 0), db, o); }; }

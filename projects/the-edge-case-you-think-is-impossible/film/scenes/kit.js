/* edge-case film kit: B · THE FIELD on her cleaned voice (film/tools/voice.py = the full talking-head edit's cut + the 4.5 s
 * correction pause). The look and every graphic come from scenes/ef.js (shared with the talking-head edit); this file adds
 * what only the film needs: the frame rect per aspect, her lines as type (where the edit shows her face), the signature
 * transition (a new "tab" slides over the form in 0.5 s inOutQuart, an ink edge on its left) and the scene helper. */
'use strict';
G.lime.altKey = 'efInk'; G.efInk.altKey = 'lime';
/** the content rect: 16:9 the whole frame; 9:16 the safe band (the Shorts / Reels UI covers the top and bottom) */
const FR = () => V({ x: 0, y: 0, w: W, h: H }, { x: 0, y: SAFE.contentTop - 30, w: W, h: SAFE.contentBottom - SAFE.contentTop + 60 });
/** her line as type: a field label (kicker), her words in Onest 800 with [red] marks */
const quote = (o) => (t, r) => { const gr = G[o.ground || 'lime']; rect(0, 0, W, H, gr.bg); const m = V(120, 80); const dark = gr === G.efInk;
  const z = (o.size || V(120, 96)) * V(1, 1.3); const n = String(o.lines).split('\n').length; const y = r.y + r.h * (o.y || 0.44) - (n - 1) * z * 0.55 + (o.kicker ? z * 0.4 : 0);
  if (o.kicker) withA(efE(t, o.at || 0, 0.4), () => EF.mono(o.kicker.toUpperCase(), r.x + m, y - z * 1.25, 34, dark ? EF.lime : EF.ink, 'left', 'kicker'));
  const b = EF.text(t, 'q', o.lines, r.x + m, y, z, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: dark ? EF.white : EF.ink, mark: dark ? EF.lime : EF.red });
  if (o.small) withA(efE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.6, 0.4), () => txtW(o.small, r.x + m, y + b.h + V(40, 44), F.body(V(48, 46), 500), dark ? '#CFCFCF' : EF.ink, r.w - 2 * m, V(60, 58), 0, 'small'));
};
const FILMX = { prev: EF.lime };
/** one film scene from `start` on ground g; draw(t, r). o.tab: the new screen slides over the last one like a second tab
 *  (with a click); else a hard cut on her word. o.zoom: a small UI drawn at poster scale. */
function FS(id, start, g, draw, o = {}) {
  const prev = FILMX.prev; const bg = (G[g] || G.lime).bg; FILMX.prev = bg; const t0 = start;
  const z = o.zoom ? V(o.zoom, Math.max(1, o.zoom * 0.85)) : 1;
  const dy = PORTRAIT ? (o.portDy != null ? o.portDy : 130) : 0;   // 9:16: most graphics are top-built; sit them lower in the band so it is used
  const big = (t) => { const r0 = FR(); const r = { x: r0.x, y: r0.y + dy, w: r0.w, h: r0.h }; if (z === 1) return draw(t, r); const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const r2 = { x: cx - r.w / z / 2, y: cy - r.h / z / 2, w: r.w / z, h: r.h / z };
    withT(cx * (1 - z), cy * (1 - z), z, 0, () => draw(t, r2)); };
  addScene(t0, g, '', (t) => { rect(0, 0, W, H, bg);
    const p = o.tab ? MOTION.ease(t, t0, 0.5, 'inOutQuart') : 1;
    if (p < 1) { rect(0, 0, W, H, prev); ctx.save(); ctx.translate((1 - p) * W, 0); rect(0, 0, W, H, bg); big(t); rect(0, 0, 8, H, EF.ink); ctx.restore(); } else big(t); }, { id });
  if (o.tab) sfx('swipe', t0 + 0.32, -6);
}

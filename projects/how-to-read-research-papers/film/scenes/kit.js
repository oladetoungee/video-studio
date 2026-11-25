/* how-to-read-research-papers film kit: A · THE MARGIN on her cleaned voice (film/tools/voice.py = the full talking-head
 * edit's cut). The look and every graphic come from scenes/rp.js (shared with the talking-head edit); this file adds what
 * only the film needs: the frame rect per aspect, her lines as type (where the edit shows her face), the page-turn
 * transition (a paper sheet turns over to the next screen) and the scene helper. */
'use strict';
/** the content rect: 16:9 the whole frame; 9:16 the safe band (the Shorts / Reels UI covers the top and bottom) */
const FR = () => V({ x: 0, y: 0, w: W, h: H }, { x: 0, y: SAFE.contentTop - 30, w: W, h: SAFE.contentBottom - SAFE.contentTop + 60 });
/** her line as type on the desk (or near-black / paper): Newsreader 800, *italic* key word, an optional pen line */
const quote = (o) => RP.head({ size: o.size || V(128, 104), ...o });
/** the page turn: for the first d s, a paper sheet sweeps across (right to left) and uncovers the new screen */
function turnIn(t, t0, draw, d = 0.5) {
  draw(); const p = rpE(t, t0, d, 'inOutQuart'); if (p >= 1) return;
  const x = W * (1 - p) - W * 0.08; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetX = -18;
  ctx.fillStyle = RP.paper; ctx.beginPath(); ctx.moveTo(x - W * 0.06, 0); ctx.lineTo(W + 40, 0); ctx.lineTo(W + 40, H); ctx.lineTo(x + W * 0.06, H); ctx.closePath(); ctx.fill(); ctx.restore();
}
const FILMX = { n: 0 };
/** one film scene from start on ground g; draw(t, r) is an RP graphic; o.turn: open with the page turn, else a hard cut on her word */
function FS(id, start, g, draw, o = {}) {
  const sc = { end: null }; FILMX.last = sc;
  addScene(start, g, '', (t) => { const r = FR(); rect(0, 0, W, H, G[g].bg);
    // a slow camera push across the whole screen (nothing sits dead still): 1 -> 1.07 over the scene, eased
    const d = Math.max(4, (sc.end || start + 8) - start); const k = 1 + 0.07 * E.inOutCubic(clamp((t - start) / d));
    const body = () => withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, r));
    if (o.turn) turnIn(t, start, body); else body(); }, { id });
  if (FILMX.prev) FILMX.prev.end = start; FILMX.prev = sc;
  if (o.turn) sfx('pageTurn', start + 0.15, -6);
}

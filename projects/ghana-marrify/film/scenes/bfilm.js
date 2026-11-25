/* Film-only helpers for the Blink film: the scene wrapper (clean cuts on one white world, eyelid wipes, pupil dive -> iris,
 * slow push), the sound vocabulary. Loaded after blink.js (the shared kit), before bscenes1/2.js. */
'use strict';

let NO_PUSH = false;
const _BG = ['white', 'white2']; let _bgi = 0;
/** addB(start, draw, o): a scene on the white world. o: id, push (default 0.015), anchor() -> [x, y],
 *  lid (an eyelid wipe INTO this scene: the previous scene closes, this one opens), dive () -> [x, y] (this scene ends by
 *  diving into that pupil), iris () -> [x, y] (this scene opens as an iris from that point after 4 black frames), label */
function addB(start, draw, o = {}) {
  let me = null; const ground = _BG[_bgi++ % 2];
  const wrapped = (t, lt) => {
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    const end = sceneEnd(me.n - 1); const dur = Math.max(0.5, end - me.start); const next = SCENES[me.n];
    const nextLid = next && next.bo && next.bo.lid;
    const ir = o.iris ? o.iris() : null;
    ctx.save();
    if (ir) { const ip = prog(lt, 0.13, 0.5); if (ip < 1) { themeFixed(() => rect(0, 0, W, H, lidCol())); if (lt < 0.13) { ctx.restore(); return; } irisClip(ip, ir[0], ir[1]); rect(0, 0, W, H, BL.ground); } }
    ctx.save();
    if (!NO_PUSH && o.push !== 0) { const an = o.anchor ? o.anchor() : [CX, V(H * 0.48, 920)]; pushCam(lt, dur, o.push == null ? 0.015 : o.push, an[0], an[1]); }
    draw(t, lt);
    ctx.restore();
    ctx.restore();
    if (o.dive) { const dp = prog(t, end - 0.38, 0.38); if (dp > 0) { const [x, y] = o.dive(); pupilDive(dp, x, y); } }
    const c = lidAmount(t, me.start, end, { in: !!o.lid, out: !!nextLid }); if (c > 0) blinkLids(c);
  };
  addScene(start, ground, o.label || 'blink', wrapped, o);
  SCENES[SCENES.length - 1].bo = o;
  if (o.lid) { sfx('lid', start - 0.12, -2); sfx('blink', start + 0.08, -4); }
  if (o.dive) sfx('dive', start - 0.3, -3);
  if (o.iris) sfx('blink', start + 0.14, -2);
}

/* ---------- sound vocabulary (film.json audio.sfx.roles) ----------
 * pop    a character / bubble popping in (springy)     blink  a featured blink or eye swap
 * lid    the eyelid wipe closing (whoosh)               dive   into a pupil
 * type   keystrokes                                     click  a press
 * pen    highlighter on a real page                     tick   checks, small hits
 * whoosh moves                                          impact the key ideas (soft)       crowd  faces packing in */
const sPop = (t, db = 0) => sfx('pop', t, db);
const sBlink = (t, db = 0) => sfx('blink', t, db);
const sType = (t, chars, cps = 22, db = 0) => sfxType(t, chars, cps, db);
const sClick = (t, db = 0) => sfx('click', t, db);
const sPen = (t, db = 0) => sfx('pen', t, db);
const sTick = (t, db = 0) => sfx('tick', t, db);
const sWh = (t, db = 0) => sfx('whoosh', t, db);
const sImp = (t, db = 0) => sfx('impact', t, db);
const sCrowd = (t, db = 0) => sfx('crowd', t, db);
Object.assign(SFX_PRI, { impact: 7, lid: 7, dive: 7, whoosh: 5, type: 4, click: 4, pen: 3, crowd: 4, pop: 3, blink: 3, tick: 1 });
Object.assign(SFX_GAP, { impact: 6.0, lid: 0.5, dive: 0.5, whoosh: 3.0, type: 1.0, click: 1.2, pen: 2.0, crowd: 4.0, pop: 2.4, blink: 2.5, tick: 2.5 });

/* ---------- small helpers ---------- */
const ease = (t, t0, d = 0.5, f = eOutB) => f(prog(t, t0, d));
/** an object springing in from an offset (dx, dy): returns {x, y, s, p} */
function springIn(t, t0, x, y, o = {}) { const sp = t < t0 ? 0 : spring(t - t0, o.f || 2.0, o.z || 0.55); return { x: lerp(x + (o.dx || 0), x, sp), y: lerp(y + (o.dy == null ? 90 : o.dy), y, sp), p: sp, s: popS(t, t0, o.pf || 2.6, o.pz || 0.45) }; }
/** pupils look toward a point (returns [lx, ly]) */
function lookAt(fx, fy, tx, ty) { const dx = tx - fx, dy = ty - fy, d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d]; }

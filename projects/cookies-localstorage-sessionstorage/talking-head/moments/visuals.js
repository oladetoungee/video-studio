/* cookies: "show, don't type" pass (her review of the edge-cases edit, 2026-11-07 evening; the edge-cases rework is the model).
 * Loaded after common.js, before plan.js (talking-head.json "common").
 * CK.night(draw): the same graphic on an off-black ground (about half the inserts), by swapping the kit's colours while it
 * draws (ink <-> light, white panels -> dark grey, green lighter so it reads on dark). The box outlines ("old website" look)
 * are gone from the kit itself (film/scenes/ck.js; the old kit: talking-head/build/ck.before.js). */
'use strict';
CK.NIGHT = { conc: '#111114', ink: '#EDEDE6', white: '#24242A', panel: '#33333A', mid: '#A9AEAC', grn: '#3FD18A', line: 'rgba(255,255,255,0.12)' };
CK.night = (draw) => (t, r) => { const keep = {}; for (const k in CK.NIGHT) { keep[k] = CK[k]; CK[k] = CK.NIGHT[k]; }
  try { draw(t, r); } finally { Object.assign(CK, keep); } };

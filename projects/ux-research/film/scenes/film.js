/* ux-research film: entry point. The studio runtime calls buildFilm() once after loading the scripts in film.json
 * (wall.js = the look and the world, s1-s3.js = the boards in timeline order). */
'use strict';
function buildFilm() {
  let b = buildPart1();
  if (typeof buildPart2 === 'function') b = buildPart2(b);
  if (typeof buildPart3 === 'function') b = buildPart3(b);
  // sound-sync nudges measured by lab.mjs audit (data/cue_nudges.json: {"role@t": frames}); a cue moves onto the frame the picture
  // really changes. Keys are the cue's designed time (2 decimals), so a nudge stops applying if the scene's timing changes.
  try { const x = new XMLHttpRequest(); x.open('GET', FILM.base + 'data/cue_nudges.json?v=' + Date.now(), false); x.send();
    if (x.status === 200) { const N = JSON.parse(x.responseText); for (const c of CUES) { const f = N[c.name + '@' + c.t.toFixed(2)]; if (f) c.t = +(c.t + f / 30).toFixed(3); } } } catch (e) { /* no nudges */ }
  // fewer, clearer sounds (critic round 1: 227 cues = one every 3.2 s): small paper / pen / pop sounds need 1.6 s of clear air
  // after the previous kept cue; shutters, swipes, hits, risers and the rest always stay
  const MINOR = new Set(['pop', 'card', 'pen', 'tick', 'typeHit', 'crumple', 'clock']);
  CUES.sort((p, q) => p.t - q.t); const kept = []; let last = -9;
  for (const c of CUES) { if (MINOR.has(c.name) && c.t - last < 2.6) continue; kept.push(c); last = c.t; }
  CUES.length = 0; kept.forEach((c) => CUES.push(c));
}

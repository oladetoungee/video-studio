/* phone-distraction film (look A · Lock screen): entry point. kit.js = palette, type, components and the scene wrapper;
 * parts.js = layout + illustrations; s1..s4.js = the scenes in timeline order (phrases are looked up in order);
 * nudges.js = measured cue shifts (tools/nudges.py from the lab audit). */
'use strict';
function buildFilm() {
  buildS1(); buildS2(); buildS3(); buildS4();
  if (typeof buildEnd === 'function') buildEnd();
  if (typeof CUE_NUDGE === 'object') for (let i = CUES.length - 1; i >= 0; i--) { const c = CUES[i]; const k = c.name + '@' + c.t.toFixed(2);
    if (typeof CUE_DROP === 'object' && CUE_DROP.includes(k)) { CUES.splice(i, 1); continue; } if (CUE_NUDGE[k]) c.t = +(c.t + CUE_NUDGE[k]).toFixed(3); }
}

/* scholarships: picture-led inserts ("show, don't type", her rule 2026-11-07 evening, the edge-cases model): Pexels photos
 * full-bleed with a slow push (kit.js photo(): credit on a dark plate), no words on top. Loaded after moments/common.js.
 * Photos: film/assets/CREDITS.md. */
'use strict';
Object.assign(PHOTOS, {
  notes: { by: 'jessica olivella' }, dorm: { by: 'cottonbro studio' }, planner: { by: 'RDNE Stock project' },
  passports: { by: 'Jakub Zerdzicki' }, writing: { by: 'Andrea Piacquadio' }, wing: { by: 'Francesco Ungaro' },
});
/** a photo filling the layout's panel (r), slow push from o.at; o.fx/o.fy focus */
SC.pic = (name, o = {}) => (t, r) => { rect(r.x, r.y, r.w, r.h, NB.ground); photo(t, r, name, { at: o.at, dur: o.dur || 8, fx: o.fx, fy: o.fy, dim: o.dim || 0, credit: true }); };

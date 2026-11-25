/* http-status-codes film: lets the talking-head plan (talking-head/moments/plan.js) run inside the motion film, so the film and
 * the full edit show the same diagrams on the same words. Every graphic layout (split / tile / half / ots / room / presenter /
 * full insert) becomes a full-frame film scene; her talking stretches, words behind her and keywords become kinetic type of
 * her own sentences (scenes/film.js fills them); phrase cards become black phrase cards. No footage is used in the film. */
'use strict';
const FILMSEG = [];
const TH = (() => {
  const T = { segs: [], capOff: [], used: false, look: {}, caps: [] };
  const spanOf = (s, o = {}) => { const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.45 : o.hold;
    let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = s.from.t - lead; t1 = (s.to || s.from).e + hold; } else { t0 = s.t - lead; t1 = s.e + hold; }
    if (o.until != null) t1 = o.until; return { t0, t1 }; };
  const gfx = (kind) => (s, o = {}) => { const sp = spanOf(s, o); const sg = { kind, ...sp, id: o.id || kind + FILMSEG.length, draw: o.draw }; FILMSEG.push(sg); T.segs.push(sg); return sg; };
  T.split = gfx('split'); T.tile = gfx('tile'); T.half = gfx('half'); T.ots = gfx('ots'); T.room = gfx('room'); T.presenter = gfx('presenter');
  T.talk = (s, o = {}) => { const sp = spanOf(s, o); return { kind: 'talk', ...sp }; };
  T.behind = T.talk; T.keyword = T.talk; T.stack = T.talk;
  T.card = (s, lines, o = {}) => { const sp = spanOf(s, { hold: 0.3, ...o }); if (o.start != null) sp.t0 = o.start; else if (o.times) sp.t0 = Math.max(sp.t0, o.times[0] - 0.15);
    const sg = { kind: 'card', ...sp, id: o.id || 'card' + FILMSEG.length, lines, times: o.times }; FILMSEG.push(sg); T.segs.push(sg); return sg; };
  T.labelBottom = () => 0; T.post = () => {};
  return T;
})();
FD.full = (s, draw, o = {}) => TH.split(s, { ...o, draw, kind: 'full' });

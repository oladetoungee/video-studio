/* claude-rule talking-head look: the film's "The Thread" (lilac #CDBFF3, ink #15131C, Schibsted Grotesk, IBM Plex Mono,
 * Newsreader for the other voice) applied to the TH layout grammar (studio/runtime/layouts.js). Loaded before every moment
 * script (talking-head.json "common"). The film inside a moment loads its own kit (film/scenes/thread.js) separately. */
'use strict';
const CR = { lilac: '#CDBFF3', ink: '#15131C', paper: '#F4F1FA', violet: '#5B45C9', mute: '#3E3852', night: '#141119' };
// house font roles -> the film's faces (this page only)
F.disp = (s) => `800 ${s}px "Schibsted Grotesk"`;
F.body = (s, w = 700) => `${Math.max(500, w)} ${s}px "Schibsted Grotesk"`;
F.mono = (s, w = 500) => `${w} ${s}px "IBM Plex Mono"`;
F.serif = (s) => `italic 400 ${s}px Newsreader`;
LS.disp = -0.035;
// grounds + plates in the film's palette
G.lil = { bg: CR.lilac, fg: CR.ink, mid: CR.mute, line: '#A99BD6', acc: CR.violet, card: '#FFFFFF', panel: '#DDD3F7', grid: 'rgba(21,19,28,0.08)' };
G.nite = { bg: CR.night, fg: CR.paper, mid: '#9C92BE', line: '#3A3450', acc: CR.lilac, card: '#FFFFFF', panel: '#221E2E', grid: 'rgba(244,241,250,0.08)' };
PLATE.lilac = [CR.lilac, CR.ink, CR.violet];
PLATE.inkL = [CR.ink, CR.paper, CR.lilac];
Object.assign(TH.look, {
  disp: (s) => `800 ${s}px "Schibsted Grotesk"`, dispLS: -0.035, upper: false, font: 'disp',
  fg: CR.paper, ink: CR.ink, acc: CR.lilac, accOnDark: CR.lilac,
  ground: 'lil', cardGround: 'nite', grid: false,
  outline: '#FFFFFF', outlinePx: 12, ring: CR.lilac, ringPx: 6, plate: 'inkL', dim: 0.34,
});
// the burned-in caption's word highlight and the house accent plates use C.blue: the film's violet here
C.blue = CR.violet; C.blueT = CR.lilac;

/* ---------- her picture never leaves for long (her note, 2026-10-14: "some of the shots don't have my video") ----------
 * A film-only cutaway (L9) longer than 6 s keeps about its first 3 s full frame (ending on a word start), then her picture
 * comes back for the rest: 16:9 her circle over the same film (L11 corner cam), 9:16 half and half (film on top, 1130 px, her below).
 * Options on a TH.cutaway call: keepAlone: true (no split), maxAlone (s, default 6), headAlone (s, default 3). */
if (!TH._keepHer) {
  TH._keepHer = true;
  const cutaway0 = TH.cutaway;
  TH.cutaway = (s, o = {}) => {
    const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
    const at = (x, end) => (x == null ? null : typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
    let t0, t1;
    if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; }
    else if (s && s.from != null) { t0 = at(s.from, false); t1 = at(s.to != null ? s.to : s.from, true); }
    else { t0 = s.t - lead; t1 = s.e + hold; }
    if (o.to != null) t1 = at(o.to, true);
    const MAX = o.maxAlone || 6, HEAD = o.headAlone || 3;
    if (o.keepAlone || !(t1 - t0 > MAX)) return cutaway0(s, o);
    const aim = t0 + HEAD; let split = aim;
    for (const w of WORDS) if (w.t >= t0 + 2.2 && w.t <= t0 + 4.2 && Math.abs(w.t - aim) < Math.abs(split - aim)) split = w.t;
    split -= 0.06;
    const { id, to, keepAlone, maxAlone, headAlone, cornerD, ...rest } = o;
    cutaway0([t0, split], { ...rest, id });
    const film = { ...(o.film || {}) }; const id2 = id ? id + '-her' : undefined;
    if (PORTRAIT) return TH.half([split, t1], { film: { ...film, sound: film.sound !== false }, side: 'top', size: 1130, enter: 0.35, id: id2 });   // a taller film half: its words stay readable
    return TH.corner([split, t1], { film, id: id2, d: cornerD });   // cornerD: a smaller circle where the film has words bottom-left
  };
}

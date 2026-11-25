/* phone-distraction talking-head look: the film's "B · The Receipt" (2026-10-17; her note: the old off-black was "too dull").
 * Blue #1F3BD6 grounds, paper #FBF8EE slips / outlines / rings, ink #15161A type on paper, the soft marker #F1E9A6 as the
 * accent on blue, deep slot blue #10227E for dark cards on blue. Inter Tight stays the TH display face (her captions and
 * keywords are Helvetica Neue in the engine). Applied to the TH layout grammar (studio/runtime/layouts.js). Loaded before every
 * moment script (talking-head.json "common"). The film inside a moment loads its own kit (film/scenes/kit.js) separately.
 * Contrast (WCAG): white on blue 7.9, cream keyword #F7EED2 on blue 6.8, marker on blue 6.4, sky on blue 4.5, ink on paper 17,
 * blue on paper 7.4. Cream / white never sit on paper: paper grounds (the punch card) carry ink type, the keyword stack and
 * the 16:9 captions are not drawn on cards. */
'use strict';
const RCT = { blue: '#1F3BD6', paper: '#FBF8EE', ink: '#15161A', inkMid: '#5B5C63', rule: '#C9C4B4', mark: '#F1E9A6', sky: '#AFC0FF', slot: '#10227E', white: '#FFFFFF' };
// PDX keeps the old key names the teaser script uses (ink = the ground, card = a dark card on it, red = the accent)
const PDX = { ink: RCT.blue, card: RCT.slot, text: RCT.white, muted: RCT.sky, red: RCT.mark, paper: RCT.paper, inkT: RCT.ink };
// Inter Tight for this page (the engine has no copy yet): load it and hold READY until it is in
(() => {
  if (typeof FontFace === 'undefined') return;
  const f = new FontFace('Inter Tight', 'url(/p/phone-distraction/film/assets/fonts/InterTight.ttf)', { weight: '100 900' });
  document.fonts.add(f); let ok = false, want = false;
  f.load().then(() => { ok = true; try { dispatchEvent(new Event('resize')); } catch (e) {} }).catch(e => console.error('Inter Tight', e));
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ok, set: (v) => { want = !!v; } }); } catch (e) {}
})();
F.disp = (s) => `700 ${s}px "Inter Tight"`;
F.body = (s, w = 600) => `${Math.max(500, Math.min(700, w))} ${s}px "Inter Tight"`;
F.mono = (s, w = 600) => `600 ${s}px "Inter Tight"`;
F.serif = (s) => `700 ${s}px "Inter Tight"`;   // her "~serif~" accent words: the accent colour in the same face (one face)
LS.disp = -0.035; LS.mono = 0.12; LS.serif = -0.035;
G.rcBlue = { bg: RCT.blue, fg: RCT.white, mid: RCT.sky, line: 'rgba(255,255,255,0.3)', acc: RCT.mark, card: RCT.slot, panel: RCT.slot, grid: 'rgba(255,255,255,0.08)' };
G.rcSlip = { bg: RCT.paper, fg: RCT.ink, mid: RCT.inkMid, line: RCT.rule, acc: RCT.blue, card: RCT.paper, panel: RCT.paper, grid: 'rgba(0,0,0,0.06)' };   // the punch card: a full-bleed receipt, ink type, blue accent
G.lockI = G.rcBlue; G.redI = G.rcSlip;   // old keys (teaser.js asks for 'lockI')
PLATE.rc = [RCT.paper, RCT.ink, RCT.blue];   // chips: receipt paper, ink type
PLATE.rcBlue = [RCT.slot, RCT.white, RCT.mark];
PLATE.lock = PLATE.rc; PLATE.red = PLATE.rcBlue;
Object.assign(TH.look, {
  // her font-style-placement reference (2026-10-17): stacked cream keywords everywhere; the three-part captions ONLY in the teaser
  // (her note: "it doesn't work well for the full talking head"); colours pale cream, not yellow (her second note)
  cap16: FOOT.m && FOOT.m.kind === 'teaser' ? 'three' : undefined, kw: 'stack', kwCol: '#F7EED2',
  disp: (s) => `700 ${s}px "Inter Tight"`, dispLS: -0.035, upper: false, font: 'disp',
  fg: RCT.white, ink: RCT.ink, acc: RCT.blue, accOnDark: RCT.mark,
  ground: 'rcBlue', cardGround: 'rcSlip', grid: false,
  outline: RCT.paper, outlinePx: 10, ring: RCT.paper, ringPx: 6, plate: 'rc', dim: 0.36,   // paper edge, as the film's halftone prints
});

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
    const { id, to, keepAlone, maxAlone, headAlone, ...rest } = o;
    cutaway0([t0, split], { ...rest, id });
    const film = { ...(o.film || {}) }; const id2 = id ? id + '-her' : undefined;
    if (PORTRAIT) return TH.half([split, t1], { film: { ...film, sound: film.sound !== false }, side: 'top', size: 1130, enter: 0.35, id: id2 });   // a taller film half: its words stay readable
    return TH.corner([split, t1], { film, id: id2 });
  };
}

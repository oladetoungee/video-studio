/* database-indexes talking-head look: the film's "A · Query Plan" (off-black #0E1013, ink #ECEAE4, ONE yellow #FFC53D,
 * IBM Plex Sans / Mono) applied to the TH layout grammar (studio/runtime/layouts.js). Loaded before every moment script
 * (talking-head.json "common"). The film inside a moment loads its own kit (film/scenes/qp.js) separately. */
'use strict';
const DQ = { bg: '#0E1013', ink: '#ECEAE4', dim: '#7A808A', line: '#2C313A', panel: '#15181D', acc: '#FFC53D', accInk: '#0E1013' };
/* fonts: IBM Plex (OFL) from the film's folder, under the film's own family names; READY waits for them */
const DQ_FACES = (() => {
  if (typeof FontFace === 'undefined') return [];
  const base = '/p/database-indexes/film/assets/fonts/';
  const list = [new FontFace('QP Sans', `url(${base}IBMPlexSans.ttf)`, { weight: '100 700', stretch: '85% 100%' }),
    new FontFace('QP Mono', `url(${base}IBMPlexMono-Regular.ttf)`, { weight: '400' }),
    new FontFace('QP Mono', `url(${base}IBMPlexMono-SemiBold.ttf)`, { weight: '600' })];
  list.forEach(f => { document.fonts.add(f); f.load().catch(e => console.error('font', e)); });
  return list;
})();
(() => {
  if (!DQ_FACES.length) return; let ready = false, want = false;
  Promise.all(DQ_FACES.map(f => f.loaded)).then(() => { try { _lay.clear(); } catch (e) {} ready = true; try { dispatchEvent(new Event('resize')); } catch (e) {} });
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ready, set: (v) => { want = !!v; } }); } catch (e) {}
})();
F.disp = (s) => `600 ${s}px "QP Sans"`;
F.body = (s, w = 600) => `${Math.min(700, Math.max(500, w))} ${s}px "QP Sans"`;
F.mono = (s, w = 400) => `${w >= 500 ? 600 : 400} ${s}px "QP Mono"`;
LS.disp = -0.02; LS.mono = 0.03;
G.qpt = { bg: DQ.bg, fg: DQ.ink, mid: DQ.dim, line: DQ.line, acc: DQ.acc, card: DQ.panel, panel: DQ.panel, grid: '#181B20' };
PLATE.qp = [DQ.bg, DQ.ink, DQ.acc];
PLATE.qpY = [DQ.acc, DQ.accInk, DQ.bg];
Object.assign(TH.look, {
  disp: (s) => `600 ${s}px "QP Sans"`, dispLS: -0.02, upper: false, font: 'disp',
  fg: DQ.ink, ink: DQ.bg, acc: DQ.acc, accOnDark: DQ.acc,
  ground: 'qpt', cardGround: 'qpt', grid: true,
  outline: DQ.ink, outlinePx: 10, ring: DQ.acc, ringPx: 5, plate: 'qp', dim: 0.4,
  corner: 'auto',   // L11: her circle goes to the corner with the least film text under it (the film's text often sits bottom-left)
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

/* ux-research talking-head look: the film's "research wall" (deep green wall #1D3A32, canary sticky notes, her headband
 * orange #F26A2E, index-card white, Schibsted Grotesk 800 / Courier Prime / Permanent Marker) applied to the TH layout grammar
 * (studio/runtime/layouts.js). Loaded before every moment script (talking-head.json "common"). The film inside a moment loads
 * its own kit (film/scenes/wall.js). */
'use strict';
(function uxFontsTH() {   // the film's faces, registered for this page from the film's own font files
  const base = '/p/ux-research/film/assets/fonts/';
  for (const [fam, file, desc] of [['UXMarker', 'PermanentMarker-Regular.ttf', {}], ['UXGrot', 'SchibstedGrotesk.ttf', { weight: '400 900' }],
    ['UXType', 'CourierPrime-Regular.ttf', { weight: '400' }], ['UXType', 'CourierPrime-Bold.ttf', { weight: '700' }], ['UXHand', 'Caveat.ttf', { weight: '400 700' }]]) {
    const x = new XMLHttpRequest(); x.open('GET', base + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load();
  }
})();
const UXT = { wall: '#1D3A32', note: '#FFE15A', ora: '#F26A2E', card: '#FFFDF6', ink: '#17140F', paint: '#F4F0E6' };
F.disp = (s) => `800 ${s}px UXGrot`;
F.body = (s, w = 700) => `${Math.max(600, w)} ${s}px UXGrot`;
F.mono = (s, w = 700) => `700 ${s}px UXType`;
F.serif = (s) => `400 ${s}px UXMarker`;
LS.disp = -0.035; LS.mono = 0.02; LS.serif = 0;
G.uxwall = { bg: UXT.wall, fg: UXT.paint, mid: '#B8C4BC', line: '#2C5247', acc: UXT.ora, card: UXT.card, panel: '#24453C', grid: 'rgba(0,0,0,0)' };
G.uxcard = { bg: UXT.card, fg: UXT.ink, mid: '#5C5A56', line: '#C9D6EA', acc: UXT.ora, card: '#FFFFFF', panel: '#F1ECE0', grid: 'rgba(0,0,0,0)' };
PLATE.note = [UXT.note, UXT.ink, UXT.ora];
PLATE.ora = [UXT.ora, UXT.ink, UXT.card];
Object.assign(TH.look, {
  disp: (s) => `800 ${s}px UXGrot`, dispLS: -0.035, upper: false, font: 'disp',
  fg: UXT.paint, ink: UXT.ink, acc: UXT.ora, accOnDark: UXT.ora,
  ground: 'uxwall', cardGround: 'uxwall', grid: false,
  outline: '#FFFDF6', outlinePx: 12, ring: UXT.note, ringPx: 6, plate: 'note', dim: 0.34,
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
    const { id, to, keepAlone, maxAlone, headAlone, corner, ...rest } = o;
    cutaway0([t0, split], { ...rest, id });
    const film = { ...(o.film || {}) }; const id2 = id ? id + '-her' : undefined;
    if (PORTRAIT) return TH.half([split, t1], { film: { ...film, sound: film.sound !== false }, side: 'top', size: 1130, enter: 0.35, id: id2 });   // a taller film half: its words stay readable
    return TH.corner([split, t1], { film, id: id2, ...(corner ? { corner } : {}) });   // o.corner: her circle's corner (L11; 'auto' = the emptiest)
  };
}

/* s09 · persuasive technology (hand-built 2026-10-15: fast hook; the 'link how everything works' aside and 'actually' cut). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'now technology can be designed', b: 'and this idea is called persuasive technology', c: 'lot of it traces back', c2: 'what people think and do',
    d: 'to make it more interesting', e: 'within weeks their apps had millions of users', f: 'some of these students went on', g: 'and again some of these people', g2: 'apps that we use today', h: 'mike krieger', h2: 'kind of design' });
  HOOK(k.a, ['Apps that', '*change behaviour*']);
  TH.half({ from: k.c, to: k.c2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.d, { frame: 'close' });
  TH.half(k.e, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.f, { frame: 'mid' });
  TH.half({ from: k.g, to: k.g2 }, { film: {}, side: 'top', size: 1150 });
  TH.half({ from: k.h, to: k.h2 }, { film: {}, side: 'top', size: 1150 });
}

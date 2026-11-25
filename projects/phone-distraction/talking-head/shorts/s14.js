/* s14 · how to use your phone less: grayscale, autoplay off, notifications off, apps off the home screen (hand-built 2026-10-15). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'so if you want to push back', b: 'you can try grayscale', b2: 'black and white', c: "it's in the accessibility setting", d: 'so you take the colour away', d2: 'less rewarding',
    e: 'turn off autoplay', f: 'it puts the stopping point back', f2: 'or you want to stop', g: 'turn off the notifications', g1: 'you will not die', g2: 'turn it off', h: 'move your distracting app', h2: 'home screen' });
  HOOK(k.a, ['Make your phone', '*less rewarding*']);
  TH.half({ from: k.b, to: k.b2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.d, to: k.d2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.e, { frame: 'mid' });
  TH.half({ from: k.f, to: k.f2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.g, { frame: 'close' });
  TH.half({ from: k.g1, to: k.g2 }, { film: {}, side: 'top', size: 1150 });
  TH.half({ from: k.h, to: k.h2 }, { film: {}, side: 'top', size: 1150 });
}

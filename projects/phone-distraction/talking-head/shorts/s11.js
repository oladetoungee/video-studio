/* s11 · autoplay (hand-built 2026-10-15: fast hook, no big single words). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'another design that keeps you stuck', b: 'if you notice on youtube', b2: 'within a few seconds', c: 'when a video is coming to an end', d: 'the problem with autoplay', d2: 'that decision has been made for you',
    e: 'it is where you want to stop watching', e1: 'so deciding to stop', e2: 'which one happens more', f: 'and another thing that powers this', f2: 'comes with', g: 'so it just keeps going' });
  HOOK(k.a, ['The next video', 'plays *on its own.*']);
  TH.half({ from: k.b, to: k.b2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.d, to: k.d2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.e, { frame: 'mid' });
  TH.half({ from: k.e1, to: k.e2 }, { film: {}, side: 'top', size: 1150 });
  TH.half({ from: k.f, to: k.f2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.g, { frame: 'close' });
}

/* s08 · the attention economy (hand-built 2026-10-15 after the critic: fast hook, fewer big words, halves over empty full frames). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'your phone was intentionally and strategically designed to distract you', b: "it's the reason why you pick it up", c: 'and 20 minutes later', c2: 'that you wanted to do',
    d: 'so understand why your phone is designed', e: 'something called the attention economy', f: 'back in 1971', f2: 'creates a poverty of attention', g: 'what he meant was', h: 'the thing that has now become scarce', h2: 'is your attention' });
  HOOK(k.a, ['Designed', 'to *distract you.*']);
  TH.talk(k.b, { frame: 'mid' });
  TH.half({ from: k.c, to: k.c2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk({ from: k.d, to: k.e }, { frame: 'close' });
  TH.cutaway({ from: k.f, to: k.f2 }, { film: {} });
  TH.talk(k.g, { frame: 'mid' });
  TH.half({ from: k.h, to: k.h2 }, { film: {}, side: 'top', size: 1150 });
}

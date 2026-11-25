/* s16 · your attention is an asset: her closing (hand-built 2026-10-15: fast hook, no big words). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'your attention is an asset', b: 'your phone is designed', c: 'your attention is what pays', c2: 'intentionally crafted', d: 'you need to know that', d1: 'so the next time', d2: 'put things in place',
    e: "they're all working so hard", e2: 'stay on tiktok', f: 'and i hope that', g: 'but i really do hope', g2: 'different corporations', h: 'and you need to take it back' });
  HOOK(k.a, ['Your attention', 'is an *asset.*'], { from: k.a, to: k.b });
  TH.half({ from: k.c, to: k.c2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.d, { frame: 'mid' });
  TH.half({ from: k.d1, to: k.d2 }, { film: {}, side: 'top', size: 1150 });
  TH.half({ from: k.e, to: k.e2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.f, { frame: 'close' });
  TH.half({ from: k.g, to: k.g2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.h, { frame: 'mid' });
}

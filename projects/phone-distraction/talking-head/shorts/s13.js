/* s13 · notifications on for a week: the CHI 2016 study (hand-built 2026-10-15: her 'CHI, CHI' repeat cut). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: "there's a study from chi", b: 'which is the main conference', c: 'where researchers had people', c2: 'inattention and hyperactivity', d: "because that's what notifications",
    e: 'to call your attention', e2: 'something urgent is waiting', f: 'you need to open your phone' });
  HOOK(k.a, ['Notifications on', 'for *one week*'], { from: k.a, to: k.b });
  TH.half({ from: k.c, to: k.c2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.d, { frame: 'close' });
  TH.half({ from: k.e, to: k.e2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.f, { frame: 'mid' });
}

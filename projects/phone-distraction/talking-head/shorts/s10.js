/* s10 · what makes you open an app: Fogg's motivation, ability, prompt (hand-built 2026-10-15). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'bj fogg also described', b: 'one they need motivation', b2: 'they need a prompt', c: 'now thinking in terms of social apps', d: 'the notification is the prompt', d2: "so it's an easy ability",
    e: 'and then the motivation', f: 'is the curiosity about what is waiting' });
  HOOK(k.a, ['Motivation. Ability.', '*Prompt.*']);
  TH.half({ from: k.b, to: k.b2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.d, to: k.d2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk({ from: k.e, to: k.f }, { frame: 'mid' });
}

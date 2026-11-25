/* s12 · why you keep checking your likes (hand-built 2026-10-15: fast hook, ends on 'that's intentional design'). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'another reason why you cannot let go', b: 'again this is intentional design', c: 'there was a time when likes', c2: 'something of that kind', d: 'and it is also a design',
    e: 'the like button gives you', e2: 'and they like it', f: 'when i make that post again', f1: 'when i make a post and i drop', f2: "how many likes i've already gotten", g: "so again it's an unpredictable reward", g2: 'keeps me coming back', h: 'have you ever made a post' });
  HOOK(k.a, ['Checking your likes?', '*Intentional design.*']);
  TH.half({ from: k.c, to: k.c2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.d, { frame: 'close' });
  TH.half({ from: k.e, to: k.e2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.f, { frame: 'mid' });
  TH.half({ from: k.f1, to: k.f2 }, { film: {}, side: 'top', size: 1150 });
  TH.half({ from: k.g, to: k.g2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.h, { frame: 'close' });
}

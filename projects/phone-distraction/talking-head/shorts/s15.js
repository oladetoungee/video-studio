/* s15 · how I stop myself scrolling: an app blocker, and one question before opening an app (hand-built 2026-10-15). */
'use strict';
// the hook types on fast (all words inside ~1.2 s, critic 2026-10-15), stays >= 1.5 s after its last word, and sits below the two-line top label
function HOOK(ph, lines, span) { const n = lines.join(' ').split(/\s+/).length; const times = Array.from({ length: n }, (_, i) => ph.w[0] + 0.05 + 0.22 * i);
  return TH.talk(span || [ph.t - 0.12, Math.max(ph.e + 0.5, ph.w[0] + 2.8)], { frame: 'mid', alt: false }); }   // (no big overlay text: her note 2026-10-18; the label is the only top text)
function buildMoment() {
  const k = PS({ a: 'i use an app', b: 'a software app blocker', b1: 'since the start of this year', b2: 'in january', c: 'if i want to use instagram right now', c2: 'to access instagram', d: 'so that stops me',
    e: 'and also before you open an app', e2: 'simply ask yourself', f: "i'm opening instagram", f2: 'do i want to reply to someone', g: 'do i want to post something' });
  HOOK(k.a, ['What do I need', 'from *Instagram?*'], { from: k.a, to: k.b });
  TH.half({ from: k.b1, to: k.b2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk({ from: k.c, to: k.d }, { frame: 'close' });
  TH.half({ from: k.e, to: k.e2 }, { film: {}, side: 'top', size: 1150 });
  TH.talk(k.f, { frame: 'mid' });
  TH.half({ from: k.f2, to: k.g }, { film: {}, side: 'top', size: 1150 });
}

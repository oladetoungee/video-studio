/* SH13 UX research vs user research (opens on the question; ends on 'based on real users', the market-research tail dropped). */
'use strict';
function buildMoment() {
  const k = PS({ a: 'the same as user research', b: 'now user research is the broader one', c: 'user research is about understanding', d: 'for example research into how customers feel',
    e: 'ux research is more focused', f: 'either way they share the same goal', g: 'based on real users' });
  TH.talk(k.a, { frame: 'mid' });
  TH.cutaway(k.b, { film: {} });
  TH.half({ from: k.c, to: k.d }, { film: {} });
  TH.talk(k.e, { frame: 'close' });
  TH.half({ from: k.f, to: k.g }, { film: {} });
}

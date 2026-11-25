/* SH11 UX research before vs after you build: generative vs evaluative. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'the first big way to split', b: 'generative ux research happens early', c: 'it generates ideas', d: 'for example for my thesis', e: 'evaluative research on the other hand',
    f: "so you're evaluating something", g: 'so generative ux research helps you decide', h: 'whether what you build works' });
  TH.talk(k.a, { frame: 'mid' });
  TH.half({ from: k.b, to: k.c }, { film: {} });   // a half: the film's 01 / 03 card stays below the label
  TH.talk(k.d, { frame: 'close' });
  TH.half({ from: k.e, to: k.f }, { film: {} });
  TH.cutaway({ from: k.g, to: k.h }, { film: {} });
}

/* SH8 what UX really means: Don Norman, Nielsen, human-centred design (the 'eighties' line and the retake are cut). */
'use strict';
function buildMoment() {
  const k = PS({ a: 'now what is ux', b: 'covers everything about', c: 'the term was popularised', d: 'and the way he and jakob nielsen', d2: 'services and its products',
    e: 'and all of this connects back', g: 'i love this phrase', h: "good design doesn't start with screens", i: 'so you start from the people', j: 'and you design around them' });
  TH.talk(k.a, { frame: 'mid' });
  TH.cutaway(k.b, { film: {} });
  TH.half({ from: k.c, to: k.d2 }, { film: {} });
  TH.talk({ from: k.e, to: k.g }, { frame: 'close' });
  TH.cutaway(k.h, { film: {} });
  TH.talk({ from: k.i, to: k.j }, { frame: 'mid' });   // the film's half here was one small icon: her instead
}

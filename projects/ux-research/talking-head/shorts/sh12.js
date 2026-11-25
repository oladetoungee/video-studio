/* SH12 how UX research is done: interviews, usability tests, surveys, contextual inquiry, diary studies ('in the earlier part' aside cut; ends before the bare list). */
'use strict';
function buildMoment() {
  const k = PS({ a: 'so how is ux research actually done', b: "there's user interview", b2: 'maybe how they use a product', c: "there's usability testing", c2: 'usually while they think out loud',
    d: 'then we have surveys', e: "and then there's contextual inquiry", e2: 'in their real environment', f: 'there are also diary studies', g: 'a single session would have missed' });
  TH.talk(k.a, { frame: 'mid' });
  TH.half({ from: k.b, to: k.b2 }, { film: {} });
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.c2, to: k.d }, { film: {} });
  TH.talk(k.e, { frame: 'mid' });
  TH.half({ from: k.e2, to: k.g }, { film: {} });
}

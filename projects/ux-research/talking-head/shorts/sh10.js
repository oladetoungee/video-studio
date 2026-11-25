/* SH10 UX researcher vs UX designer (ends on PMs doing research too; the 'what you need' part was a second idea). */
'use strict';
function buildMoment() {
  const k = PS({ a: 'people usually mix up', b: "a ux researcher's job", c: "a ux designer's job", d: 'in smaller teams', e: 'and there are also a lot of product managers', e2: 'as part of their jobs as well' });
  TH.talk(k.a, { frame: 'mid' });
  TH.half({ from: k.b, to: k.c }, { film: {} });
  TH.talk(k.d, { frame: 'close' });
  TH.half({ from: k.e, to: k.e2 }, { film: {} });
}

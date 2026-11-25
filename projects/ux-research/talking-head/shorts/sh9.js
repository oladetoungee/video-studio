/* SH9 what a UX researcher does: who they work with and a typical week. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'now who is a ux researcher', b: 'a ux researcher works closely', c: 'their job is to bring real users', d: 'a typical week for a ux researcher', e: 'to find patterns',
    f: 'and finally sharing what they found', g: 'changes what gets built' });
  TH.talk(k.a, { frame: 'mid' });
  TH.talk(k.b, { frame: 'close' });
  TH.cutaway(k.c, { film: {} });
  TH.half({ from: k.d, to: k.e }, { film: {} });
  TH.half({ from: k.f, to: k.g }, { film: {} });
}

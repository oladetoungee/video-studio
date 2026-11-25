/* SH15 UX research jobs: fewer roles with the title, the skill is still needed (her honest take as a student). */
'use strict';
function buildMoment() {
  const k = PS({ a: "now if you're thinking about a career", b: "and from what i've noticed", b2: 'other design roles', c: "i think it's because a lot of companies", d: 'so companies have fewer people', d2: 'very much needed skill',
    e: "i think it's just the entry level", f: "i wouldn't know yet honestly" });
  TH.talk(k.a, { frame: 'mid' });
  TH.cutaway({ from: k.b, to: k.b2 }, { film: {} });
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.d, to: k.d2 }, { film: {} });
  TH.talk({ from: k.e, to: k.f }, { frame: 'mid' });   // ends on 'I wouldn't know yet, honestly'
}

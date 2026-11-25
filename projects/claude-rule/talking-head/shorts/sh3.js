/* SH3 "Is Claude conscious?": her clear answer. */
'use strict';
function buildMoment() {
  const k = PS({ l1: "what i find interesting about what anthropic's leadership has been doing with claude",
    l2: 'is this extra effort to instill human behaviour or human consciousness into this tool', l3: 'to put a form of humanity or consciousness on a machine',
    f2: 'claude is a tool', f3: 'it is not a human', a1: 'it is an incredibly amazing tool',
    a2: 'i acknowledge that it has real capabilities that the average human might not be able to compute', a3: 'mathematical capabilities right mind-blowing capabilities',
    v1: 'but i do not believe that the model is conscious', v2: 'consciousness belongs to living organisms',
    v4: 'belongs to living things', v6: 'not to an algorithm' });
  TH.talk(k.l1, { frame: 'mid' });
  TH.cutaway({ from: k.l2, to: k.f3 }, { film: {} });                       // stickers fall off, "Claude is a tool."
  TH.talk(k.a1, { frame: 'close', punch: ['amazing'] });
  TH.cutaway({ from: k.a2, to: k.a3 }, { film: {} });                       // the calculation
  TH.keyword(k.v1, 'not ~conscious~', { times: [k.v1.w[3], k.v1.w[9]] });
  TH.behind(k.v2, ['living', 'organisms'], { times: [k.v2.w[3], k.v2.w[4]] });
  TH.cutaway({ from: k.v4, to: k.v6 }, { film: {} });                       // living things, not a model, not an algorithm
}

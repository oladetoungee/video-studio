/* SH1 "Anthropic's new rule for Claude (pt 1)": the news, then the surprising reason (cliffhanger into pt 2). */
'use strict';
function buildMoment() {
  const k = PS({ d1: 'from the 12th of november 2026', d2: 'there is a new rule about how you are allowed to talk to claude',
    d3: 'anthropic updated its usage policy', d4: 'and now you cannot be abusive or cruel to claude',
    e0: 'and just to be clear', e1: "i'm not here trying to fight for the right to be cruel or abusive to ai",
    e4: 'what i want to talk about is like the actual thought process behind this rule',
    m1: 'part of the idea is that anthropic is not sure whether claude might be conscious',
    m2: 'so they think they are not sure but they think that claude might be conscious' });
  TH.talk(k.d1, { frame: 'mid' });
  TH.cutaway({ from: k.d2, to: k.d4 }, { film: {} });                       // the chat + the real policy page + "cruel."
  TH.talk(k.e0, { frame: 'close' });
  TH.keyword(k.e1, 'not here to ~fight~', { times: [k.e1.w[1], k.e1.w[2], k.e1.w[4], k.e1.w[5]] });
  TH.behind(k.e4, ['why?'], { times: [k.e4.w[11]] });
  TH.cutaway({ from: k.m1, to: k.m2 }, { film: {} });                       // the meter: not sure / might be conscious
}

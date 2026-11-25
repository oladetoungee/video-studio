/* SH2 what people say vs what they do (raw 7:19.3-7:57.4). */
'use strict';
function buildMoment() {
  const k = PS({ say: 'what people say and what people do are often very different', surv: 'what they give you in a survey', ask: 'if you ask someone how they use an app',
    diff: 'something completely different', bel: 'and they might genuinely believe what they told you', not: 'we are just not very good at noticing our own behaviours',
    good: 'so good ux research watches as much as it asks', useful: 'is also a very useful finding' });
  TH.talk(k.say, { frame: 'mid' });
  TH.cutaway({ from: k.surv, to: k.surv }, { film: {} });
  TH.half({ from: k.ask, to: k.diff }, { film: {} });
  TH.talk({ from: k.bel, to: k.not }, { frame: 'close' });
  TH.cutaway(k.good, { film: {} });
  TH.talk(k.useful, { frame: 'mid' });
}

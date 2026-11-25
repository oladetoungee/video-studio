/* SH5 "If AI can be hurt, can it get tired?": her what-if. */
'use strict';
function buildMoment() {
  const k = PS({ r2: 'if anthropic thinks that claude could be conscious or could be abused psychologically',
    r3: "wouldn't that mean at some point that maybe claude could be tired or frustrated",
    r4: 'for example maybe at some point i would ask claude to do something', r6: "and now it's 9pm or 10pm",
    r7: 'does that mean that at some point claude can have the ability to say like', r8: "hey i'm tired i don't want to do anything else",
    r9: 'because if claude has consciousness then why not',
    o4a: "and if you follow that process very well in that case wouldn't anthropic itself be an offender",
    o4b: "because then anthropic is using claude like a slave owner wouldn't that be the explanation", o6: "it's using it day and night and night and day" });
  TH.cutaway({ from: k.r2, to: k.r3 }, { film: { scene: 'chain' } });                       // the chain
  TH.talk(k.r4, { frame: 'mid' });
  TH.cutaway({ from: k.r6, to: k.r8 }, { film: {} });                       // 9 pm, "Hey, I'm tired."
  TH.keyword(k.r9, 'then why ~not~?', { times: [k.r9.w[5], k.r9.w[6], k.r9.w[7]] });
  TH.pops(k.o4a, ['tired?', 'frustrated?', 'an offender?'], { focus: 2, focusAt: 'offender' });
  TH.talk(k.o4b, { frame: 'close' });
  TH.cutaway(k.o6, { film: {} });                                           // day and night
}

/* SH4 "Treating AI like a person": her thesis, the slope, the Microsoft quote. */
'use strict';
function buildMoment() {
  const k = PS({ i1: 'trying to give a machine human consciousness', i3: 'making it subject to rules that apply to humans',
    i4: 'the way i think of it it might even be a serious violation against humanity itself',
    h1: 'we are assigning human attributes to a tool that does not possess human attributes',
    h2: 'and this tool is very very very powerful', h3: "so i don't see how this is going to end nicely",
    s1: 'the tech company says', s5: 'slippery slope man', u1: 'illusion that ai can be a conscious entity', u2: 'it just feels weird man',
    q1: "i'm quoting the head of ai at microsoft here", q3: 'we must build ai for people not to be a digital person',
    q4: "i think it's very dangerous if these models are trained to see themselves as conscious or as deserving of independent agency",
    q5: "so i'm very very worried about where this path leads" });
  TH.half({ from: k.i1, to: k.i3 }, { film: { scene: 'impose' }, side: V('right', 'top') });   // the numbered list from the first second
  TH.keyword(k.i4, 'against ~humanity~', { times: [k.i4.w[13], k.i4.w[14]] });
  TH.talk(k.h1, { frame: 'close' });
  TH.cutaway({ from: k.h2, to: k.s5 }, { film: {} });                       // the plank piles up and tilts
  TH.behind(k.u1, ['illusion'], { times: [k.u1.w[0]], y: V(300, 480) });   // above her headband
  TH.talk(k.u2, { frame: 'close', punch: ['weird'] });
  TH.cutaway({ from: k.q1, to: k.q3 }, { film: {} });                       // Suleyman's essay, highlighted
  TH.keyword(k.q4, 'very ~dangerous~', { times: [k.q4.w[3], k.q4.w[4]] });
  TH.talk(k.q5, { frame: 'mid', push: [1.0, 1.1] });
}

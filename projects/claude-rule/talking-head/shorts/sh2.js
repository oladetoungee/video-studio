/* SH2 "Anthropic's new rule for Claude (pt 2)": the exact wording, how it is enforced, the constitution. */
'use strict';
function buildMoment() {
  const k = PS({ w1: "so what does anthropic's new rule actually say", w2: 'the exact wording is actually',
    w3: 'bans sustained and needless abusive or cruel behaviour towards their models',
    x1: 'and of course according to them this is only reserved for extreme cases',
    n1: 'and the main way they enforce it is that claude can end the conversation',
    n2: 'if it starts to seem as though the other person on the other side is abusive or cruel to it',
    c1: "then in claude's constitution", c3: "they call claude's moral status deeply uncertain",
    c4: "so they're not explicitly saying that oh claude is conscious but they are" });
  TH.talk(k.w1, { frame: 'mid' });
  TH.cutaway(k.w2, { film: { scene: 'page-rule' } });                      // the real page at once (no earlier chat bubbles)
  TH.cutaway({ from: k.w3, to: k.x1 }, { film: {} });                       // highlighted, then the serif lift
  TH.talk(k.n1, { frame: 'close', punch: ['end'] });
  TH.cutaway({ from: k.n2, to: k.c3 }, { film: {} });                       // "This conversation has ended", then the constitution, highlighted
  TH.keyword(k.c4, 'they are ~dabbling~', { times: [k.c4.w[10], k.c4.w[11], k.c4.w[11] + 0.3] });
}

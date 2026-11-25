/* SH6 "Should you be nice to AI?": kindness for our own sake. */
'use strict';
function buildMoment() {
  const k = PS({ g1: "i'm not fighting for the right to be cruel to ai", g2: "i don't think you should be cruel to ai or say cruel things",
    g3: 'or to anyone or anything at that for your own sake',
    g4: 'you want to try your own possible best to guard your heart and your soul against cruelty',
    g5: "but you shouldn't be cruel because you think claude is conscious", g6: "no it's not", g7: 'or am i the dumb person here',
    y1: "so i don't think we should avoid being cruel because of the machine's feeling",
    y2: "we should just not be cruel because we don't want to be cruel people" });
  TH.talk(k.g1, { frame: 'mid' });
  TH.cutaway({ from: k.g2, to: k.g3 }, { film: {} });                       // or to anyone or anything, for your own sake
  TH.keyword(k.g4, 'your ~heart~ and your soul', { times: [k.g4.w[10], k.g4.w[11], k.g4.w[12], k.g4.w[13], k.g4.w[14]] });
  TH.talk(k.g5, { frame: 'close' });
  TH.shout(k.g6, ['No, it’s *not.*'], { times: k.g6.w });
  TH.talk(k.g7, { frame: 'wide', punch: ['dumb'] });
  TH.keyword(k.y1, 'the machine’s ~feeling~', { times: [k.y1.w[12], k.y1.w[13]], size: V(70, 64) });
  TH.cutaway(k.y2, { film: {} });                                           // we don't want to be cruel people
}

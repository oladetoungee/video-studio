/* sh09: Why the name Adébáyọ̀ breaks character limits. The full edit's graphics for this stretch (moments/plan.js) in 9:16; her 4:5 window, top title + caption style from talking-head.json "efStyle"; no overlay text, no timer, ends on her last word (no outro clip for this video yet). */
'use strict';
function buildMoment() {
  EF_PLAN('short');
  // the bytes, from her first "Adébáyọ̀"
  CUR = 0; const b0 = P('take adby'), b1 = P('adby for example you can see seven letters but some functions count bytes'), b2 = P('not letters right'), b3 = P('so in this case you would have 13 because letters like');
  EF.hookTo(b0.t + 0.2);
  EF.halfS([b0.t + 0.2, b3.e + 0.6], { side: 'top', size: 1060, id: 'bytes-sh', draw: EF.bytes({ typeAt: b0.t + 0.3, sevenAt: WT(b1, 'seven'), strlenAt: WT(b1, 'count bytes'), bytesAt: WT(b2, 'letters'), thirteenAt: WT(b3, '13') }) });
}

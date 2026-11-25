/* sh02: Starbucks gift cards had a race condition bug. The full edit's graphics for this stretch (moments/plan.js) in 9:16; her 4:5 window, top title + caption style from talking-head.json "efStyle"; no overlay text, no timer, ends on her last word (no outro clip for this video yet). */
'use strict';
function buildMoment() {
  EF_PLAN('short');
  // the Starbucks receipt (Egor Homakov's own post) from "Starbucks gift cards"
  CUR = 0; const sb = P('was this researcher called egor that found one of these race conditions in starbucks gift cards'); const a = WT(sb, 'egor') - 0.15; EF.hookTo(a);
  EF.halfS([a, sb.e + 0.3], { side: 'top', size: 1060, id: 'starbucks-sh', draw: EF.src('sakurity', { at: a, hlAt: WT(sb, 'gift cards'), creditText: 'sakurity.com  ·  Egor Homakov  ·  21 May 2015' }) });
}

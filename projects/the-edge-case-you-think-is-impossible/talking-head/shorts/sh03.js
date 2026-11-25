/* sh03: Race condition: two buyers, one item left. The full edit's graphics for this stretch (moments/plan.js) in 9:16; her 4:5 window, top title + caption style from talking-head.json "efStyle"; no overlay text, no timer, ends on her last word (no outro clip for this video yet). */
'use strict';
function buildMoment() {
  EF_PLAN('short');
  // the race itself (two buyers, one item) from "two people click buy"
  CUR = 0; const a1 = P('for example in our online shop say we have one item left in stock'), a2 = P('two people click buy in the exact same second both requests check the stock'), a3 = P('both see one item left both create an order and now we have sold an item that we do not have');
  const t0 = WT(a1, 'one item') - 0.2; EF.hookTo(t0);
  EF.halfS([t0, a3.e + 0.4], { side: 'top', size: 1060, id: 'one-left-sh', draw: EF.lanes({ at: t0, a: 'Buyer A', b: 'Buyer B', target: '1 left', hitA: WT(a2, 'click buy'), hitB: WT(a2, 'click buy') + 0.06, result: [{ s: 'Order confirmed  ×2', at: WT(a3, 'both create') }] }) });
  EF.sfx('error', WT(a3, 'sold'), -6);
}

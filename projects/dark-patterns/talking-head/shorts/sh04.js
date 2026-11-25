/* sh04 · Sneak into basket + hidden costs: the full edit's graphics for this stretch (moments/plan.js) in 9:16, her 4:5
 * window, her style for this short (talking-head.json "dpStyle"). The short starts on "So say you add a pair of shoes", so the
 * cart (which in the full edit starts a sentence earlier) is added here from her second sentence. */
'use strict';
function buildMoment() {
  const s = DP_PLAN('short');
  if (s.s21 && s.s22) TH.split(s.s22, { her: 0.44, side: 'bottom', id: 'cart', hold: 0.3,
    draw: DP.cart({ at: s.s22.t - 0.15, tag: [3, 'Sneak into basket'], rows: [{ s: 'Running shoes', price: '€40.00', img: 'px-7588163' }, { s: 'Cleaning spray', price: '€5.00', at: WT(s.s22, 'cleaning spray'), sneak: true }],
      total: [[0, '€40.00'], [WT(s.s22, 'five euro'), '€45.00']], loop: { row: 1, at: WT(s.s22, 'never picked') } }) });
}

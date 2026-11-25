/* sh12: the full edit's graphics for this stretch (moments/plan.js) in 9:16, in this short's board look (moments/looks.js).
 * v3 (2026-11-12 night, critic): the "642 subscription sites" panel opens when she says "consumer and", not 4 s before it on an
 * empty black panel (the plan's span started at the phrase). Same draw, same M routing (top panel 1000 px, her below). */
'use strict';
function buildMoment() {
  DP.skip('six-forty-two');
  const s = DP_PLAN('short');
  if (s.s85a) { const a = WT(s.s85a, 'consumer and') - 0.35, b = s.s85a.e + 0.5;
    TH.half([a, b], { side: 'top', size: 1000, id: 'six-forty-two', ground: 'dpInk', z: 1.3,
      draw: DP.stat({ ground: 'dpInk', at: a + 0.25, big: '642', small: 'subscription sites', foot: 'FTC  ·  10 July 2024' }) });
    DP.gfxSpans.push([a, b]); }
}

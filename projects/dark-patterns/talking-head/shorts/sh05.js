/* sh05: the full edit's graphics for this stretch (moments/plan.js) in 9:16, in this short's board look (moments/looks.js): her
 * full frame (format I); the free-trial card is a top panel with her below (too wide for a pop-up).
 * v3 (2026-11-12 night, critic): the card opens on "free month", not on
 * "so a shop gives you", so it is never on screen with nothing happening. */
'use strict';
function buildMoment() {
  DP.skip('trial');
  const s = DP_PLAN('short');
  if (s.s30 && s.s31) { const a = WT(s.s30, 'free month') - 0.2, b = s.s31.e + 0.5;   // the card is too wide for a pop-up: a top panel, her below
    TH.half([a, b], { side: 'top', size: 1000, id: 'trial', ground: 'dpInk', z: 1.0,
      draw: DP.trial({ at: a + 0.1, askAt: WT(s.s30, 'asks for your card'), endAt: WT(s.s31, 'free trial ends'), chargeAt: WT(s.s31, 'start charging'), charge: 'NOW YOU PAY' }) });
    DP.gfxSpans.push([a, b]); }
}

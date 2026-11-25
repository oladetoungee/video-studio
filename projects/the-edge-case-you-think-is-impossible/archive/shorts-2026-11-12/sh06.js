/* sh06: The NULL license plate that got $12,000 in fines. The full edit's graphics for this stretch (moments/plan.js) in 9:16; her 4:5 window, top title + caption style from talking-head.json "efStyle"; no overlay text, no timer, ends on her last word (no outro clip for this video yet). */
'use strict';
function buildMoment() {
  EF.skip('that-was'); EF_PLAN('short');
  // the plate story starts mid-sentence here ("a security researcher got a personal license plate..."): its graphic
  CUR = 0; const pl = P('a security researcher got a personal license plate in california that said null');
  EF.splitS([WT(pl, 'license') - 0.2, pl.e + 0.4], { her: 0.44, side: 'bottom', id: 'plate-sh', enter: 0.5,
    draw: EF.plate({ at: WT(pl, 'license plate') - 0.1, credit: 'Story: Joseph Tartaro (droogie), DEF CON 27, 2019', creditAt: WT(pl, 'security') }) });
}

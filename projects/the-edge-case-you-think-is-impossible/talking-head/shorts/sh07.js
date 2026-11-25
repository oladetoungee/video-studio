/* sh07: A leap day took down part of Microsoft Azure. The full edit's graphics for this stretch (moments/plan.js) in 9:16; her 4:5 window, top title + caption style from talking-head.json "efStyle"; no overlay text, no timer, ends on her last word (no outro clip for this video yet). */
'use strict';
function buildMoment() {
  EF_PLAN('short');
  // the "2019" is cut out of this short: the Microsoft sentence starts at "Microsoft's cloud"
  CUR = 0; const az = P("microsoft's cloud windows azure had an outage because of a leap year bug");
  EF.halfS(az, { side: 'top', size: 1060, id: 'azure-sh', draw: EF.src('azure', { at: az.t - 0.1, crop: [176, 352], hlAt: 1e9 }) });
}

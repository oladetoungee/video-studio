/* sh11: Edge cases in production. The full edit's graphics for this stretch (moments/plan.js) in 9:16, format A (talking-head.json "fmt").
 * 2026-11-12 her review: it starts at "Someone is going to report an issue" (not "If you're a software developer… I promise you…");
 * the new-issue card (the full edit's "issue" graphic) comes in on "report", since a short's first phrase is her talking. */
'use strict';
function buildMoment() {
  EF_PLAN('short');
  CUR = 0; const a = P('someone is going to report an issue'), b = P("and it's going to be exactly that edge case that you never thought of");
  const t0 = WT(a, 'report') - 0.1; EF.hookTo(t0);
  EF.halfS([t0, b.e + 0.3], { side: 'top', size: 1060, id: 'issue-sh', draw: EF.notify({ at: t0, title: 'Customer charged twice', meta: 'NEW ISSUE' }) });
}

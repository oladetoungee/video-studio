/* sh10 · Meal prep for working students: opens on the meal-prep photo with her promise stamped on it (critic 2026-11-02: no
 * "another tip" opening, a strong graphic within 1 s), her below it, then the plan (moments/plan.js). */
'use strict';
// 2026-11-10 format mix: the meal-prep photo opens as the format's graphic panel (no stamp re-typing her line) (the cover and the format's title carry the topic; old script in build/shorts.before/)
function buildMoment() {
  const h = P('meal prepping will save your life', { peek: true });
  WF.skip('save-your-life');
  WF.open = { span: [0, h.e + 0.5], draw: WF.photo({ img: 'px_mealprep', at: 0.02 }), snd: () => sfx('focus', 0.05, -2) };
  WF_PLAN('short');
}

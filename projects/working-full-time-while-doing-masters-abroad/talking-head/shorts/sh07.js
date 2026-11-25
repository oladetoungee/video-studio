/* sh07 · Use one calendar for work and school: opens on the two 24-hour dials (her A dial), then the plan. */
'use strict';
// 2026-11-10 format mix: the 24-hour dial opens as the format's graphic panel (the cover and the format's title carry the topic; old script in build/shorts.before/)
function buildMoment() {
  const e = P("don't have your school calendar separate from your work calendar", { peek: true });
  WF.skip('two-calendars');
  WF.open = { span: [0, e.e + 0.4], draw: WF.dial({ at: 0.1 }), snd: () => { sfx('tick', 0.15, -3); sfx('tick', e.w[4], -4); } };
  WF_PLAN('short');
}

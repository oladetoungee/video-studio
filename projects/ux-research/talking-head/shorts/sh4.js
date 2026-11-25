/* SH4 UX research on a small budget (raw 9:16.0-9:45.6). */
'use strict';
function buildMoment() {
  const k = PS({ big: 'only big companies with big budgets can do', small: 'but even as a small startup', lab: "you don't need a lab", five: 'talk to five people',
    three: 'watch three of your friends try your app on a video call', counts: 'that also counts', works: 'actually works for the people using it' });
  TH.talk(k.big, { frame: 'mid' });
  TH.cutaway({ from: k.small, to: k.lab }, { film: {} });
  TH.talk(k.five, { frame: 'close' });
  TH.half({ from: k.five, to: k.three }, { film: {} });
  TH.talk(k.counts, { frame: 'mid' });
  TH.cutaway(k.works, { film: {} });
}

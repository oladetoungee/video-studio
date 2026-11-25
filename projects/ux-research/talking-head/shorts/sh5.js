/* SH5 numbers vs the why (raw 6:20.0-6:48.5). */
'use strict';
function buildMoment() {
  const k = PS({ quan: 'quantitative ux research is about numbers', many: 'how many people completed the task', long: 'how long did it take', qual: 'qualitative ux research is about understanding',
    conf: 'what confused them', why: 'it tells you the why', both: 'usually you want both', conv: 'why the problem is happening' });
  TH.talk(k.quan, { frame: 'mid' });
  TH.cutaway({ from: k.many, to: k.long }, { film: {} });
  TH.talk(k.qual, { frame: 'close' });
  TH.half({ from: k.qual, to: k.why }, { film: {} });          // the qualitative card stays while she gives the examples
  TH.cutaway({ from: k.both, to: k.conv }, { film: {} });      // "usually you want both" on the wall
}

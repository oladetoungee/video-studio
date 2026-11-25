/* SH3 why apps fail (raw 2:51.7-3:39.0). */
'use strict';
function buildMoment() {
  const k = PS({ wrong: "you don't want to build the wrong thing", exp: 'building is very expensive', team: 'you probably still need a team',
    f1: 'a lot of products fail because', find: "people just couldn't find their way around it", catch: 'ux research helps to catch both problems early on',
    cheap: 'it is cheaper to change your idea', live: 'already live', dec: 'and doing ux research means', rand: 'otherwise they just come from a random person on the team' });
  TH.talk(k.wrong, { frame: 'mid' });   // opens on the point ("why are we doing all this research?" needed context)
  TH.cutaway({ from: k.exp, to: k.team }, { film: {} });
  TH.half({ from: k.f1, to: k.find }, { film: {} });
  TH.talk(k.catch, { frame: 'close' });
  TH.cutaway({ from: k.cheap, to: k.live }, { film: {} });
  TH.talk(k.dec, { frame: 'mid' });
  TH.half(k.rand, { film: {} });
}

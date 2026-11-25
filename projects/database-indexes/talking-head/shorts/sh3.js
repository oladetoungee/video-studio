/* SH3 how a database index works: bob / dave / alice, a few steps instead of a million. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'now what mechanism does a database index use', b: 'say you have an index on the email column', c: 'bob comes after alice',
    d: "bob's entry in the index", d2: "has a pointer to where bob's row is in the table", e: 'so with this strategy', e2: 'in about 20 steps', f: 'without an index you will do up to a million checks' });
  TH.talk(k.a, { frame: 'close' });
  TH.cutaway({ from: k.b, to: k.c }, { film: {} });          // the walk (credit to Sergey Egorenkov on screen)
  TH.half({ from: k.d, to: k.d2 }, { film: { fit: 'safe' }, side: 'top', size: 1150 });                   // pointer to the row
  TH.half({ from: k.e, to: k.e2 }, { film: {}, side: 'top', size: 1150 });       // about 20 comparisons (a top half: the film's code line no longer sits under the label)
  TH.talk(k.f, { frame: 'mid', punch: ['million'] });
  TH.keyword(k.f, 'up to a ~million~ checks');
}

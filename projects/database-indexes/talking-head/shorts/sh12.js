/* SH12 clustered vs non-clustered indexes: the phone book vs the index at the back of a book. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'you also hear about', b: 'and the difference between those is very simple', c: 'the clustered index decides', e: 'so once you find the name',
    f: 'a table can only have one clustered index', g: 'a nonclustered index is a separate structure', h: 'that as the index', i: 'so a table can have lots' });
  TH.talk({ from: k.a, to: k.b }, { frame: 'mid' });
  TH.half({ from: k.c, to: k.e }, { film: {}, side: 'top', size: 1150 });   // rows stored in order (a half: the film's title stays below the label)
  TH.keyword(k.f, 'only ~one~ clustered index');
  TH.half({ from: k.g, to: k.h }, { film: {}, side: 'top', size: 1150 });   // a separate structure pointing back
  TH.talk(k.i, { frame: 'close' });
}

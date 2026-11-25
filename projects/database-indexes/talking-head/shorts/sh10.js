/* SH10 the 2 most common database indexes: B-tree (the default) and unique. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'the first one is btree', b: 'the btree is the default one', d: 'it can find exact matches', f: 'it can sort', g: 'and it can find values by how they start',
    h: 'and that works because the index is sorted', i: 'the second commonly used type', j: 'it makes sure that no two rows', l: 'for example no two user', m: 'your primary key already has one' });
  TH.talk(k.a, { frame: 'mid' });
  TH.talk(k.b, { frame: 'close' });
  TH.half({ from: k.d, to: k.f }, { film: {}, side: 'top', size: 1150 });   // exact match, range, sort
  TH.half({ from: k.g, to: k.h }, { film: {}, side: 'top', size: 1150 });   // titles that start with Harry
  TH.talk(k.i, { frame: 'close' });
  TH.cutaway({ from: k.j, to: k.l }, { film: {} });          // unique: no two rows the same
  TH.keyword(k.m, 'your ~primary key~ already has one');
}

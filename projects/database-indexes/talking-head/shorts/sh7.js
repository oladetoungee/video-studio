/* SH7 why your database gets slow: more users, bigger tables, then a full table scan over a million rows. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'as you get more users', b: 'now it might take', c: 'one thing that you can always use', d: 'say we have a bookstore', d2: 'books table in our database', e: 'and we run this query',
    f: 'without an index the database has no idea', g: 'it starts at the first row', h: 'and that is called a full table scan', i: 'and in many cases', j: 'when your table has maybe', l: 'but at a million rows' });
  TH.shout({ from: k.a, to: k.b }, ['More users.', 'A *slower* app.'], { y: Math.max(411, TH.labelBottom() + 165) });   // below a two-line top label   // L3 hook a stranger reads in the first second
  TH.talk({ from: k.c, to: k.d }, { frame: 'close' });
  TH.cutaway({ from: k.d2, to: k.e }, { film: {} });          // starts when the film's books table is up (its first 1.4 s are empty)          // the books table, a million rows, the query
  TH.talk(k.f, { frame: 'close' });
  TH.cutaway({ from: k.g, to: k.h }, { film: {} });          // row by row: FULL TABLE SCAN
  TH.talk(k.i, { frame: 'mid' });
  TH.half({ from: k.j, to: k.l }, { film: {}, side: 'top', size: 1150 });   // 10 rows vs a million
}

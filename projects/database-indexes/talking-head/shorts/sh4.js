/* SH4 is your index being used? EXPLAIN in PostgreSQL and MySQL. */
'use strict';
function buildMoment() {
  const k = PS({ a: "once you've added your database index", b: 'just put the word explain', c: 'in postgresql you will see', d: 'seq scan sequential scan',
    e: 'in mysql the results will come back', e2: "then it's using an index" });
  TH.talk(k.a, { frame: 'mid' });
  TH.keyword(k.b, 'put ~EXPLAIN~ in front');
  TH.cutaway({ from: k.c, to: k.d }, { film: {} });          // Seq Scan / Index Scan
  TH.cutaway({ from: k.e, to: k.e2 }, { film: {} });         // MySQL type column: ALL vs ref / range
}

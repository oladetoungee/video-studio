/* SH13 when to add a database index: WHERE / JOIN / ORDER BY, a slow full scan in EXPLAIN, read-heavy tables; and when not to. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'when to actually use a database index', b: 'showing up in your where', b2: 'or your order by', c: 'so say you are sorting', d: "if there's no index", e: 'but with an index',
    f: 'also when you use explain', f2: 'need an index there', g: 'also when a table gets more read', h: "but you shouldn't do that", i: 'is constantly written', j: 'in that situation' });
  TH.talk(k.a, { frame: 'mid' });
  TH.cutaway({ from: k.b, to: k.b2 }, { film: {} });          // Recap: WHERE, JOIN, ORDER BY
  TH.talk(k.c, { frame: 'close' });
  TH.half({ from: k.d, to: k.e }, { film: {}, side: 'top', size: 1150 });   // a million rows sorted vs read in order
  TH.half({ from: k.f, to: k.f2 }, { film: {}, side: 'top', size: 1150 });  // EXPLAIN: full scan
  TH.keyword(k.g, 'read ~more~ than written');                // (the film's screen is still empty here)
  TH.talk(k.h, { frame: 'close' });
  TH.half({ from: k.i, to: k.j }, { film: {}, side: 'top', size: 1150 });
}

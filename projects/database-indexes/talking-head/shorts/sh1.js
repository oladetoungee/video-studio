/* SH1 "why not index every column?": the cost of indexes, answered in full. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'if database indexes makes queries so fast', b: 'we cannot', c: 'every time you insert', d: 'so if your orders table has six indexes',
    e: 'so the more database indexes you have', f: 'and for a small table', g: "it's faster to read them", h: 'so what you do is that you only index', i: "you don't index everything" });
  TH.talk({ from: k.a, to: k.a }, { frame: 'mid', punch: ['every'] });
  TH.behind(k.b, ['We cannot.'], {});
  TH.cutaway({ from: k.c, to: k.d }, { film: {} });          // every write updates every index, 1 new order = 7 writes
  TH.half({ from: k.e, to: k.e }, { film: { fit: 'safe' }, side: 'top', size: 1150 });   // slower writes, storage
  TH.talk({ from: k.f, to: k.f }, { frame: 'close' });
  TH.cutaway({ from: k.g, to: k.h }, { film: {} });          // 10 rows; index only what you search, filter, join, sort by
  TH.keyword(k.i, "don't index ~everything~");
}

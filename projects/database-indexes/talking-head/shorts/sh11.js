/* SH11 4 more database index types: hash, bitmap, spatial, full-text. */
'use strict';
function buildMoment() {
  const k = PS({ b: 'the hash index', b2: 'for exact matches only', c: 'so most people just use btree', d: 'a bitmap is for columns', e: 'you mostly see it',
    f: 'and then we have spatial index', g: "so it's groups places", g2: 'restaurant in the world', h: 'and then we have the fulltext index', i: 'it is for searching inside text', j: 'so it works by indexing each word' });
  TH.talk(k.b, { frame: 'mid' });
  TH.half({ from: k.b2, to: k.c }, { film: { at: 356.4 }, side: 'top', size: 1150 });   // hash: exact matches only (opens on it: the old 'for the rest of' opener needed the long video)
  TH.half({ from: k.d, to: k.e }, { film: {}, side: 'top', size: 1150 });   // bitmap: a status column
  TH.half({ from: k.f, to: k.g2 }, { film: {}, side: 'top', size: 1150 });   // spatial: places near you (a half: the film's title stays below the label)
  TH.talk(k.h, { frame: 'mid' });
  TH.half({ from: k.i, to: k.j }, { film: {}, side: 'top', size: 1150 });   // full-text: each word indexed
}

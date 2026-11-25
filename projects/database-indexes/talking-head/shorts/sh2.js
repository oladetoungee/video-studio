/* SH2 composite indexes (the phone book): her "this one always confuses me", then the phone book. */
'use strict';
function buildMoment() {
  const k = PS({ c: 'the third one is the composite index', d: 'so say you index last name and first name',
    e: 'but when you search by only first name', f: 'think of a phone book sorted by surname', g: "so if i'm looking for ada okafor", h: 'but what if i want everyone',
    i: "there's probably ada adeyemi", j: 'so nothing groups the adas together', l: "so that's exactly what happens", m: 'so the tip is to put the column' });
  TH.cutaway({ from: k.c, to: k.e }, { film: {} });          // composite: helps / helps / usually not
  TH.half({ from: k.f, to: k.g }, { film: { fit: 'safe' }, side: 'top', size: 1150 });   // the phone book, Ada Okafor
  TH.talk(k.h, { frame: 'mid' });
  TH.cutaway({ from: k.i, to: k.j }, { film: {} });          // every Ada, every page
  TH.talk(k.l, { frame: 'close' });
  TH.cutaway(k.m, { film: {} });                             // the tip
}

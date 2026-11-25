/* SH6 how to get into UX research (raw 11:39.5-12:33.0). */
'use strict';
function buildMoment() {
  const k = PS({ way: "the way i'm getting into it is by getting a master's degree", diff: 'you can get into it different ways', guides: 'there are free guides from places like',
    books: 'there are a lot of books as well', real: 'and also try to do real research', caseS: 'write your first case study', vol: 'you can also volunteer',
    fields: 'come from other fields', cs: 'computer science', love: 'maybe this is something you might love' });
  TH.talk(k.way, { frame: 'mid' });
  TH.cutaway({ from: k.diff, to: k.books }, { film: {} });
  TH.talk(k.real, { frame: 'close' });
  TH.half({ from: k.real, to: k.caseS }, { film: {} });
  TH.talk(k.vol, { frame: 'mid' });
  TH.cutaway({ from: k.fields, to: k.love }, { film: {} });
}

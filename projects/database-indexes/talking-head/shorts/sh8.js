/* SH8 what is a database index? The index at the back of a book: sorted values, each with a pointer to its row. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'what is a database index', b: 'the easiest way to think about it', c: 'if you want to find every page', d: 'you go to the index at the back', d2: 'tells you the page number',
    e: 'a database index works the same way', f: "it's a separate structure", g: 'it keeps a pointer' });
  TH.talk(k.a, { frame: 'close' });
  TH.talk(k.b, { frame: 'mid' });
  TH.cutaway(k.c, { film: {} });          // the back of a book (the film's first 2 s here are empty)
  TH.half({ from: k.d, to: k.d2 }, { film: {}, side: 'top', size: 1150 });
  TH.cutaway({ from: k.e, to: k.g }, { film: {} });          // the film says it: works the same way, then sorted values + pointers          // sorted values + pointers
}

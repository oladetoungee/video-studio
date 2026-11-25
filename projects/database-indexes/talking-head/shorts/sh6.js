/* SH6 why your index gets ignored: LOWER() on the column, a wildcard at the start of LIKE. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'and there are several mistakes', b: 'you can have a database index', c: 'the first one is wrapping your column', d: 'the lowercase versions are not in that index',
    e: "so the database can't use it here", f: 'adding a wildcard', g: "and if you don't know how it starts" });
  TH.talk(k.a, { frame: 'mid' });
  TH.keyword(k.b, "still won't ~use it~");
  TH.cutaway({ from: k.c, to: k.d }, { film: {} });          // LOWER(email)
  TH.half(k.e, { film: { fit: 'safe' }, side: 'top', size: 1150 });                   // the expression index fix
  TH.cutaway({ from: k.f, to: k.g }, { film: {} });          // 'Fall%' vs '%Fall%', on screen while she explains it
}

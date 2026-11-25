/* SH5 Postgres foreign keys: MySQL indexes them for you, PostgreSQL does not. */
'use strict';
function buildMoment() {
  const k = PS({ a: 'another database index gotcha', b: 'the database creates an index on that column', c: "in postgresql it doesn't",
    d: "so if you're on postgres", e: 'you have to check and confirm', f: "and it's one of the common reasons" });
  TH.talk(k.a, { frame: 'close' });
  TH.cutaway({ from: k.b, to: k.c }, { film: {} });          // MySQL vs PostgreSQL
  TH.talk(k.d, { frame: 'mid' });
  TH.half({ from: k.e, to: k.f }, { film: { fit: 'safe' }, side: 'top', size: 1150 }); // add it yourself; joins get slow
}

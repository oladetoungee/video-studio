/* SH7 what is UX research? The one question to ask before you build, then the definition. */
'use strict';
function buildMoment() {
  const k = PS({ q: "there's one very simple question", who: 'who is this app for', heart: 'that question is the heart of ux research', what: 'now what is ux research',
    know: 'ux research is how you get to know your users', work: 'it is the work of understanding', them: 'actually works for them' });
  TH.talk(k.q, { frame: 'mid' });
  TH.cutaway(k.who, { film: {} });
  TH.half(k.heart, { film: {} });
  TH.talk(k.what, { frame: 'close' });
  TH.cutaway(k.know, { film: {} });   // starts once the film's card is up
  TH.half({ from: k.work, to: k.them }, { film: {} });
}

/* dark-patterns: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-02 by the FILM agent. DP_SENT = her phrases (her corrected words, in order: data/raw_words.json);
 * DP_PLAN(mode) runs every layout call whose phrases are all inside this moment (a short is one stretch of the video).
 * Shorts (her rules): she is always on camera (a full-frame graphic becomes the top panel with her below), no big overlay
 * text (no L3 shout), no timers, the first phrase is her talking, at most one keyword. Change a layout here and the full
 * edit and the shorts that hold it change together; a short can add or override calls after DP_PLAN('short') (DP.skip(id)).
 * The look: moments/common.js (C · Blown up + B's split). */
'use strict';
const DP_SENT = {
  s0: "if you get a pop-up that offers you 10% off and the button to close it says no thanks i hate saving money there's a name for that thing",
  s1: "it's called a dark pattern",
  s2: "a dark pattern is a design in an app or a website that tricks you into doing something that you don't mean to do like buying something extra",
  s3: "now a dark pattern is different from bad design",
  s4: "most of the time dark patterns are intentional",
  s5: "the dark pattern usually helps the business at the expense of the user",
  s6: "there are a lot of dark patterns that people use to build stuff and i'll go over a lot of them in this video",
  s7: "most of all of the stuff i'm using in this video come from harry brignull who is a ux designer and he was the one that coined the term dark patterns in 2010",
  s8: "i'll put the link to his website below",
  s9: "the first one is the confirmshaming",
  s10: "confirmshaming is when the button to say no is written to make the user feel bad",
  s11: "like look at this no i hate saving money",
  s13: "the idea is that you'd rather click yes than say you hate saving money",
  s14: "another pattern is hard to cancel",
  s15: "people used to call it the roach motel",
  s16: "the name comes from a cockroach trap where it's easy to get in but it's hard to get out",
  s17: "a lot of people can relate to this where joining or subscribing is easy but leaving and/or unsubscribing is hard",
  s18: "you join an online shop's delivery membership with one click but to cancel you have to go through page after page after page of offers",
  s18b: "you know like this",
  s19: "we also have another dark pattern called sneak into basket",
  s20: "is when something you didn't choose end up in your shopping cart",
  s21: "so say you add a pair of shoes and now you get to check out",
  s22: "there is also a cleaning spray for five euro that you never picked",
  s23: "another interesting dark pattern is hidden costs where there are fees that only show up at the last step of checkout",
  s24: "this happens to me a lot",
  s25: "you think that the total of your cart is 90 euro and now you are at checkout and you're seeing 100 and something",
  s26: "the shoe cost 40 euro on the product page",
  s27: "and at the last page you see that a service fee has been added and is now 52 euros",
  s28: "and by then you've typed in your card details so it just feels easier to just pay now",
  s29: "another dark pattern is hidden subscription which is like a free trial that turns into a paid plan without a clear warning",
  s30: "so a shop gives you a free month of premium but it asks for your card first which is now is a dark pattern just so you know",
  s31: "and when that free trial ends they just start charging you",
  s32: "this has happened to me before",
  s33: "they literally charged me for a year's subscription",
  s34: "there are many more dark patterns that you will run into when you use apps or shops online",
  s35: "and again keep in mind that they were intentionally put in place",
  s36: "it's not bad design it's intentional",
  s37: "another one is trick wording",
  s38: "it's a question that is written so that you click the opposite of what you're meant to click",
  s39: "something like untick this box if you don't want to stop receiving emails",
  s40: "you would have to read these two or three times to work out which one actually stops the email",
  s41: "one other common dark pattern is disguised ads",
  s42: "they are ads that are made to look like part of the page",
  s43: "say you search a shop for running shoes and the first few results are paid ads that look exactly like the normal result but they are paid ads",
  s44: "we also have nagging",
  s45: "nagging is asking again and again and again after the user has said no",
  s46: "it's a type of dark pattern",
  s47: "say a shopping app asks you to turn on notification and you're already saying no",
  s48: "next time it asks again",
  s49: "and the only options are yes and not now",
  s50: "this happens to me a lot",
  s51: "i think snapchat does this to me a lot",
  s52: "i don't want my snapchat notifications on but every time every time it's asking me again and again i'm this close to deleting the app",
  s53: "another one is pre-selection",
  s54: "pre-selection is when the option that the company wants is already ticked for the user",
  s55: "so there is a box at checkout that says add gift wrapping for 2.99 euros and it's already ticked",
  s56: "if you don't read every line you pay for gift wrapping that you never asked for",
  s57: "another common dark pattern is fake urgency",
  s58: "fake urgency is a deadline that is not real",
  s59: "say a product page shows a countdown that says this deal ends in 10 minutes",
  s60: "if you refresh that page again it starts again from 10 minutes",
  s61: "this deal ends in 10 minutes",
  s62: "it's there to rush you so you buy before you've had the time to think about it",
  s63: "another one is fake scarcity",
  s64: "this is done mostly by shopping website shopping apps the website say that there's only a few left or that something is selling out when it's not true",
  s65: "the page will say oh only two left in stock",
  s66: "and when you come back a week later it still says only two left in stock",
  s67: "it's there to make you buy now buy now",
  s68: "why do companies use dark patterns",
  s69: "it's a lot of times it comes down to numbers",
  s70: "most product teams test their designs with something called an a and b testing a/b testing",
  s71: "half of the users see version a the other half see version b",
  s72: "and whichever one gets more sales and sign up wins",
  s73: "but an a/b test only measures the number you pick",
  s74: "so you can't tell whether anyone was tricked",
  s75: "a/b testing usually even doesn't work for the benefit of the user",
  s76: "it's just about what design is best",
  s77: "it doesn't really judge which design is better or worse for the user",
  s78: "and i think this is how a lot of dark patterns end up in apps",
  s79: "a team is chasing a number like oh we want more sign-ups or we want more sales",
  s80: "so it's not really about what is best for the user",
  s81: "it's about how much the team can get to their own goal",
  s82: "how common are dark patterns",
  s83a: "in january 2023 the european commission checked 399 online stores",
  s83b: "and 148 of them had at least one of three dark patterns that the eu was looking for",
  s84a: "42 of those websites had fake countdown timers",
  s84b: "and 70 of them were hiding important information or making important information hard to see",
  s85a: "in july 2024 consumer and privacy agencies from about 26 countries they looked at over 600 websites that sell subscriptions",
  s85b: "and they found out that 76% of them use at least one possible dark pattern",
  s85c: "and nearly 67% of them use more than one dark pattern",
  s86: "so what's the law that protects users against dark patterns",
  s87: "are there even laws that protect users against dark patterns",
  s87b: "not a lawyer",
  s88: "and everything that i read and studied",
  s89: "in the eu the unfair commercial practices directive from 2005 already banned some of these tricks",
  s90: "like tricks like saying a deal is only available for a very limited time is banned in the eu",
  s91: "so again protection from these dark patterns depends on where you live as a user",
  s92: "for your data for example gdpr says that a pre-ticked box does not count as consent on the part of the user",
  s93a: "so if an online shop charges you for an extra through a box that they had pre-ticked or pre-select for you",
  s93b: "the eu consumer law says that you are entitled to get that money back",
  s94: "in the us i think the best known case is the amazon prime case where the ftc said amazon signed people up for prime without their consent and made cancelling hard",
  s95: "so in september 2025 amazon actually did pay 2.5 billion dollars to settle this",
  s96: "and i read that the eu is working on this new law called the digital fairness act",
  s97: "the idea is that it's expected to deal with dark patterns more directly",
  s98: "it hasn't been published yet but it's something that is under work",
  s99: "so as a user you just try to keep all of these patterns in mind as well to protect yourself",
  s100a: "and if you're a developer or a designer and maybe you work in a company and you actually see a dark pattern",
  s100b: "i think the way to counter it if it's something you would want to counter is to be like hey we can get sued for this",
  s101: "don't even try to say this is wrong or anything like that because maybe you probably wouldn't be taken seriously",
  s102: "but just be like hey guys we could be sued for this",
  s103: "i think people take that more seriously",
  s104: "and try to build the honest version",
  s105: "we can make the world a better place",
};
const DP_RAW = {"s0": 0.16, "s1": 8.24, "s2": 10.04, "s3": 18.92, "s4": 22.06, "s5": 25.1, "s6": 28.96, "s7": 33.68, "s8": 42.12, "s9": 45.22, "s10": 48.22, "s11": 54.26, "s13": 56.66, "s14": 60.94, "s15": 63.3, "s16": 65.46, "s17": 70.5, "s18": 77.82, "s18b": 85.54, "s19": 87.5, "s20": 91.04, "s21": 94.86, "s22": 98.34, "s23": 102.86, "s24": 109.02, "s25": 110.42, "s26": 115.68, "s27": 118.22, "s28": 123.04, "s29": 127.74, "s30": 136.14, "s31": 142.88, "s32": 146.22, "s33": 147.22, "s34": 149.42, "s35": 153.12, "s36": 155.9, "s37": 157.7, "s38": 159.26, "s39": 163.96, "s40": 168.16, "s41": 173.48, "s42": 176.64, "s43": 179.86, "s44": 188.38, "s45": 189.86, "s46": 193.38, "s47": 195.18, "s48": 198.96, "s49": 200.62, "s50": 203.14, "s51": 204.3, "s52": 206.2, "s53": 212.86, "s54": 214.32, "s55": 218.56, "s56": 224.12, "s57": 227.54, "s58": 230.02, "s59": 232.68, "s60": 237.22, "s61": 240.64, "s62": 242.5, "s63": 246.62, "s64": 249.46, "s65": 258.36, "s66": 261.68, "s67": 265.26, "s68": 268.28, "s69": 270.36, "s70": 273.76, "s71": 278.36, "s72": 281.64, "s73": 284.52, "s74": 287.68, "s75": 290.16, "s76": 293.84, "s77": 296.5, "s78": 299.94, "s79": 303.26, "s80": 307.7, "s81": 309.58, "s82": 313.92, "s83a": 315.14, "s83b": 320.16, "s84a": 326.1, "s84b": 329.56, "s85a": 335.2, "s85b": 344.14, "s85c": 348.64, "s86": 352.14, "s87": 354.86, "s87b": 359.38, "s88": 361.08, "s89": 362.86, "s90": 370.74, "s91": 376.12, "s92": 381.28, "s93a": 388.64, "s93b": 395.56, "s94": 399.32, "s95": 408.42, "s96": 413.74, "s97": 419.36, "s98": 422.68, "s99": 426.08, "s100a": 431.32, "s100b": 435.9, "s101": 441.38, "s102": 445.7, "s103": 448.32, "s104": 450.1, "s105": 457.82};   // each phrase's start in her raw recording (a short only takes a phrase found there: "this happens to me a lot" is said twice)
DP.skipIds = new Set(); DP.skip = (...ids) => ids.forEach(i => DP.skipIds.add(i));
/** the time of the n-th (0-based) time she says `word` inside a phrase */
function WTn(ph, word, n = 0) {
  const nn = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, ''); const want = String(word).split(/\s+/).map(nn);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length); let k0 = 0;
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) { if (k0++ === n) return ph.w[k]; }
  return WT(ph, word);
}
function DP_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(DP_SENT)) { const c0 = CUR; try { const ph = P(q); if (DP_RAW[k] != null && Math.abs(outToRaw(ph.t) - DP_RAW[k]) > 1.5) { CUR = c0; continue; } s[k] = ph; } catch (e) { CUR = c0; /* not in this moment */ } }
  const keys = Object.keys(s); const first = keys[0]; let kws = 0; const SHORT = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (SHORT) {
      if (kind === 'shout' || kind === 'pops' || kind === 'stack' || kind === 'corner' || kind === 'behind') return;
      if (refs.includes(first) && kind !== 'talk' && kind !== 'late') return;
      if (kind === 'kw') return;   // (keywords sit in the band under the label, where the graphics are: the captions carry her words)
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && DP.skipIds.has(sg.id)) TH.segs.pop();
  };
  const T0 = (ph) => ph.t - 0.12;
  // shorts: she is always on camera. A full-frame graphic becomes the top panel (below her label) with her underneath; a small
  // window tile becomes her strip at the bottom; her picture keeps the 4:5 window size (no close / tight framings)
  const full = SHORT ? (sp, draw, o = {}) => TH.half(sp, { side: 'top', size: 1060, draw, id: o.id, lead: o.lead, until: o.until }) : DP.full;
  const tile0 = TH.tile; if (SHORT) TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.44, side: 'bottom', at: undefined, w: undefined });
  const FX = SHORT && DP.fmtInstall ? DP.fmtInstall(s, first) : null;   // 2026-11-10: the short's format (moments/formats.js) places graphics + her
  const talk0 = TH.talk; if (SHORT) TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });
  if (SHORT && first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; const tc = Array.isArray(sp) ? sp[0] + 0.1 : WT(sp, c);
    return TH.keyword(sp, w, { y: V(undefined, SHORT ? Math.max(460, TH.labelBottom() + 170) : 300), times: o.times || ws.map(() => tc), ...o }); };
  const HV = (a, b) => V(a, b);   // (readability)

  /* ---------- 0:00 what a dark pattern is ---------- */
  on(['s0'], 'late', () => TH.split(SHORT ? [WT(s.s0, 'and the button') - 0.1, s.s0.e + 0.3] : s.s0, { her: HV(0.42, 0.5), side: HV('right', 'bottom'), id: 'popup', enter: SHORT ? 0.5 : 0.01,
    draw: DP.popup({ at: SHORT ? WT(s.s0, 'and the button') - 0.1 : T0(s.s0), offAt: SHORT ? WT(s.s0, '10') : 0.3, btnAt: WT(s.s0, 'button') - 0.3, linkAt: WT(s.s0, 'no thanks'), lensAt: WT(s.s0, 'saving') - 0.3, blockAt: WT(s.s0, 'hate'), tag: [1, 'Confirmshaming'] }) }));
  on(['s1'], 'card', () => DP.card(s.s1, ['*Dark pattern.*'], { id: 'dark-pattern-card', times: [WT(s.s1, 'dark'), WT(s.s1, 'dark')] }));   // the name, not her sentence (2026-11-07 evening)
  on(['s2'], 'other', () => TH.room(s.s2, { at: 'a design', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'definition', ground: 'dpInk',
    draw: DP.pic({ key: 'px-11952304', at: WT(s.s2, 'a design'), fx: 0.6, fy: 0.45, over: (t, r) => DP.badge(t, r, WT(s.s2, 'something extra'), '+1', 0.62, 0.36) }) }));
  on(['s3'], 'other', () => full(s.s3, DP.vs({ at: T0(s.s3), a: { label: 'Bad design', title: 'Confusing,\nby [accident]', hits: WT(s.s3, 'bad design') }, b: { label: 'Dark pattern', title: 'Confusing,\non [purpose]', hits: WT(s.s3, 'different') + 0.2 } }), { id: 'bad-vs-dark', capRoom: 0 }));
  on(['s4'], 'talk', () => TH.talk(s.s4, { frame: 'close', punch: ['intentional'], id: 'intentional' }));
  on(['s5'], 'other', () => TH.ots(s.s5, { side: 'auto', w: HV(760, undefined), id: 'business', ground: 'dpInk',
    draw: DP.flow({ at: T0(s.s5) + 0.1, coinAt: WT(s.s5, 'helps') }) }));
  on(['s6'], 'talk', () => TH.talk(s.s6, { frame: 'mid', push: [HV(1.08, 1.08), HV(1.18, 1.16)], id: 'go-over' }));   // no list of 11 names she has not explained yet
  on(['s7'], 'other', () => full(s.s7, DP.big('dd-origin', { at: T0(s.s7), hlAt: [WT(s.s7, '2010'), WT(s.s7, 'harry'), WT(s.s7, 'harry') + 0.15], credit: 'deceptive.design/about-us' }), { id: 'brignull', ground: 'dpInk' }));
  on(['s8'], 'talk', () => TH.talk(s.s8, { frame: 'mid', push: [HV(1.16, 1.12), HV(1.24, 1.18)], id: 'link-below' }));

  /* ---------- 0:45 the 11 patterns: 01 confirmshaming ---------- */
  on(['s9'], 'behind', () => TH.behind(s.s9, ['Confirmshaming'], { font: 'body', times: [WT(s.s9, 'confirmshaming')], id: 'confirmshaming', size: HV(200, 112), y: HV(250, 560) }));
  on(['s10'], 'other', () => full(s.s10, DP.big('dd-confirm', { at: T0(s.s10), credit: 'deceptive.design  ·  Harry Brignull' }), { id: 'dd-confirm', ground: 'dpInk' }));
  on(['s11'], 'other', () => full(s.s11, DP.popup({ at: T0(s.s11) - 0.2, lensAt: WT(s.s11, 'no') - 0.1, blockAt: WT(s.s11, 'hate'), tag: [1, 'Confirmshaming'] }), { id: 'look-at-this' }));
  on(['s13'], 'talk', () => TH.talk(s.s13, { frame: 'mid', push: [HV(1.1, 1.08), HV(1.22, 1.18)], id: 'rather-click-yes' }));

  /* ---------- 1:01 02 hard to cancel ---------- */
  on(['s14'], 'talk', () => TH.talk(s.s14, { frame: 'mid', id: 'hard-to-cancel' }));
  on(['s14'], 'kw', () => KW(s.s14, 'hard to ~cancel~', { id: 'hard-kw' }));
  on(['s15'], 'other', () => TH.tile(s.s15, { at: HV('br', 'br'), w: HV(500, 420), id: 'roach', ground: 'dpInk', draw: DP.pic({ key: 'px-17177368', at: T0(s.s15), fy: 0.45 }) }));
  on(['s16'], 'other', () => TH.split(s.s16, { her: HV(0.38, 0.44), side: HV('left', 'bottom'), id: 'easy-in', ground: 'dpInk',
    draw: DP.maze({ inAt: WT(s.s16, 'easy') - 0.1, bumpAt: WT(s.s16, 'hard') }) }));
  on(['s17'], 'talk', () => TH.talk(s.s17, { frame: 'close', push: [HV(1.4, 1.22), HV(1.5, 1.3)], id: 'relate' }));
  on(['s18', 's18b'], 'other', () => full({ from: s.s18, to: s.s18b }, DP.cancel({ at: T0(s.s18), joinAt: WT(s.s18, 'one click'), pages: [WT(s.s18, 'cancel'), WTn(s.s18, 'page', 0), WTn(s.s18, 'page', 1), WTn(s.s18, 'page', 2), WT(s.s18, 'offers')], tag: [2, 'Hard to cancel'] }), { id: 'page-after-page' }));
  if (SHORT && !s.s18b) on(['s18'], 'other', () => full(s.s18, DP.cancel({ at: T0(s.s18), joinAt: WT(s.s18, 'one click'), pages: [WT(s.s18, 'cancel'), WTn(s.s18, 'page', 0), WTn(s.s18, 'page', 1), WTn(s.s18, 'page', 2), WT(s.s18, 'offers')], tag: [2, 'Hard to cancel'] }), { id: 'page-after-page-short' }));   // (sh03 cuts before "you know like this": the cancel pages still show on her line)

  /* ---------- 1:26 03 sneak into basket ---------- */
  on(['s18b', 's19'], 'kw', () => KW(s.s19, 'sneak into ~basket~', { id: 'sneak-kw' }));
  on(['s18b', 's19'], 'talk', () => TH.talk({ from: s.s18b, to: s.s19 }, { frame: 'mid', punch: ['basket'], id: 'sneak' }));
  on(['s20', 's22'], 'other', () => TH.split({ from: s.s20, to: s.s22 }, { her: HV(0.36, 0.42), side: HV('right', 'bottom'), id: 'cart',
    draw: DP.cart({ at: T0(s.s20), tag: [3, 'Sneak into basket'], rows: [{ s: 'Running shoes', price: '€40.00', img: 'px-7588163', at: WT(s.s21, 'shoes') }, { s: 'Cleaning spray', price: '€5.00', at: WT(s.s22, 'cleaning spray'), sneak: true }],
      total: [[0, '€0.00'], [WT(s.s21, 'shoes'), '€40.00'], [WT(s.s22, 'five euro'), '€45.00']], loop: { row: 1, at: WT(s.s22, 'never picked') } }) }));

  /* ---------- 1:43 04 hidden costs ---------- */
  on(['s23'], 'behind', () => TH.behind(s.s23, ['Hidden costs'], { font: 'body', times: [WT(s.s23, 'hidden costs')], id: 'hidden-costs', size: HV(200, 112), y: HV(250, 560) }));
  on(['s24'], 'talk', () => TH.talk(s.s24, { frame: 'close', punch: ['lot'], id: 'happens-to-me' }));
  on(['s25'], 'talk', () => TH.talk(s.s25, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.1, 1.16)], id: 'ninety' }));
  on(['s26', 's27'], 'other', () => full({ from: s.s26, to: s.s27 }, DP.price({ at: T0(s.s26), a: WT(s.s26, '40'), fee: WT(s.s27, 'service fee'), b: WT(s.s27, '52'), tag: [4, 'Hidden costs'] }), { id: 'forty-fiftytwo' }));
  on(['s28'], 'other', () => TH.presenter(s.s28, { side: 'left', id: 'card-details', ground: 'dpInk', draw: DP.pic({ key: 'px-5717969', at: T0(s.s28) }) }));

  /* ---------- 2:07 05 hidden subscription ---------- */
  on(['s29'], 'behind', () => TH.behind(s.s29, ['Hidden subscription'], { font: 'body', times: [WT(s.s29, 'hidden subscription')], id: 'hidden-sub', size: HV(170, 100), y: HV(250, 560) }));
  on(['s30', 's31'], 'other', () => TH.presenter({ from: s.s30, to: s.s31 }, { side: 'right', id: 'trial',
    draw: DP.trial({ at: T0(s.s30), askAt: WT(s.s30, 'asks for your card'), endAt: WT(s.s31, 'free trial ends'), chargeAt: WT(s.s31, 'start charging'), charge: 'NOW YOU PAY' }) }));
  on(['s32'], 'talk', () => TH.talk(s.s32, { frame: 'close', id: 'happened' }));
  on(['s33'], 'talk', () => TH.talk(s.s33, { frame: 'tight', punch: ['literally'], id: 'a-year' }));

  /* ---------- 2:29 more patterns ---------- */
  on(['s34'], 'talk', () => TH.talk(s.s34, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.1, 1.16)], id: 'many-more' }));
  on(['s35'], 'talk', () => TH.talk(s.s35, { frame: 'mid', push: [HV(1.18, 1.12), HV(1.28, 1.2)], id: 'again' }));
  on(['s36'], 'card', () => DP.card(s.s36, ['*Intentional.*'], { id: 'not-bad-design', times: [WT(s.s36, 'intentional'), WT(s.s36, 'intentional')] }));

  /* ---------- 2:37 06 trick wording ---------- */
  on(['s37'], 'talk', () => TH.talk(s.s37, { frame: 'mid', id: 'trick-wording' }));
  on(['s37'], 'kw', () => KW(s.s37, 'trick ~wording~', { id: 'trick-kw' }));
  on(['s38'], 'talk', () => TH.talk(s.s38, { frame: 'close', push: [HV(1.3, 1.2), HV(1.4, 1.28)], id: 'opposite' }));
  const wording = () => DP.check({ s: '[Untick] this box if you\n[don’t] want to [stop]\nreceiving emails.', at: T0(s.s39), hits: [WT(s.s39, 'untick'), WT(s.s39, "don't"), WT(s.s39, 'stop')] });
  on(['s39'], 'other', () => full(s.s39, wording(), { id: 'untick' }));
  on(['s39', 's40'], 'other', () => TH.split(s.s40, { her: HV(0.36, 0.42), side: HV('right', 'bottom'), id: 'read-twice', enter: 0.4, draw: wording() }));

  /* ---------- 2:53 07 disguised ads ---------- */
  on(['s41'], 'talk', () => TH.talk(s.s41, { frame: 'close', punch: ['ads'], id: 'disguised' }));
  on(['s41'], 'kw', () => KW(s.s41, 'disguised ~ads~', { id: 'ads-kw' }));
  on(['s42'], 'talk', () => TH.talk(s.s42, { frame: 'mid', push: [HV(1.1, 1.08), HV(1.2, 1.16)], id: 'part-of-page' }));
  on(['s43'], 'other', () => full(s.s43, DP.search({ at: T0(s.s43), rowsAt: T0(s.s43) + 0.7, lensAt: WT(s.s43, 'paid ads') - 0.1, blockAt: WT(s.s43, 'but they are') + 0.3, tag: [7, 'Disguised ads'] }), { id: 'search' }));

  /* ---------- 3:08 08 nagging ---------- */
  on(['s44'], 'behind', () => TH.behind(s.s44, ['Nagging'], { font: 'body', times: [WT(s.s44, 'nagging')], id: 'nagging', size: HV(260, 170), y: HV(270, 560) }));
  on(['s45', 's46'], 'other', () => full({ from: s.s45, to: s.s46 }, DP.big('dd-nagging', { at: T0(s.s45), credit: 'deceptive.design  ·  Harry Brignull' }), { id: 'dd-nagging', ground: 'dpInk' }));
  on(['s47', 's49'], 'other', () => full({ from: s.s47, to: s.s49 }, DP.nag({ at: T0(s.s47), asks: [WT(s.s47, 'turn on'), WT(s.s48, 'asks again')], loopAt: WT(s.s49, 'yes'), note: { s: 'There is no “No”', at: WT(s.s49, 'not now') + 0.3 }, tag: [8, 'Nagging'] }), { id: 'notifications' }));
  on(['s50', 's51'], 'talk', () => TH.talk({ from: s.s50, to: s.s51 }, { frame: 'close', push: [HV(1.4, 1.22), HV(1.52, 1.3)], id: 'snapchat' }));
  on(['s52'], 'other', () => TH.ots([s.s52.t - 0.1, WT(s.s52, "i'm this close") - 0.1], { side: 'auto', w: HV(700, undefined), id: 'snap-asks', draw: DP.nag({ noCount: true, at: s.s52.t - 0.1, asks: [s.s52.t - 0.05, WT(s.s52, 'every time'), WTn(s.s52, 'every time', 1), WT(s.s52, 'again')] }) }));
  on(['s52'], 'talk', () => TH.talk([WT(s.s52, "i'm this close") - 0.1, s.s52.e + 0.4], { frame: 'close', id: 'this-close' }));

  /* ---------- 3:33 09 pre-selection ---------- */
  on(['s53'], 'talk', () => TH.talk(s.s53, { frame: 'mid', id: 'pre-selection' }));
  on(['s53'], 'other', () => TH.glitch(WT(s.s53, 'pre-selection'), { text: 'Pre-selection' }));
  on(['s54'], 'other', () => full(s.s54, DP.vs({ at: T0(s.s54), a: { title: 'You [tick] it.', hits: WT(s.s54, 'option'), draw: (t, R) => DP.box(R.x, R.y + 20, Math.min(160, R.h * 0.5), 0) },
    b: { title: '[Ticked] for you.', hits: WT(s.s54, 'already ticked'), draw: (t, R) => DP.box(R.x, R.y + 20, Math.min(160, R.h * 0.5), dpE(t, WT(s.s54, 'ticked'), 0.35), DP.pink) } }), { id: 'tick-vs', capRoom: 0 }));
  on(['s55', 's56'], 'other', () => TH.half({ from: s.s55, to: s.s56 }, { side: HV('right', 'top'), id: 'gift-wrap',
    draw: DP.cart({ at: T0(s.s55), tag: [9, 'Pre-selection'], rows: [{ s: 'Running shoes', price: '€40.00', img: 'px-7588163' }, { s: 'Add gift wrapping', price: '€2.99', at: WT(s.s55, 'add gift'), tick: true, tickAt: WT(s.s55, 'already ticked') }],
      total: [[0, '€40.00'], [WT(s.s56, 'you pay'), '€42.99']], loop: { row: 1, at: WT(s.s56, 'never asked') } }) }));

  /* ---------- 3:47 10 fake urgency ---------- */
  on(['s57'], 'behind', () => TH.behind(s.s57, ['Fake urgency'], { font: 'body', times: [WT(s.s57, 'fake')], id: 'fake-urgency', size: HV(210, 120), y: HV(260, 560) }));
  on(['s58'], 'talk', () => TH.talk(s.s58, { frame: 'close', push: [HV(1.3, 1.2), HV(1.4, 1.28)], id: 'deadline' }));
  if (!SHORT) { on(['s59'], 'other', () => full(s.s59, DP.timer({ at: T0(s.s59), refreshAt: s.s60 ? WT(s.s60, 'refresh') : 1e9, againAt: s.s60 ? WT(s.s60, 'starts again') : 1e9, tag: [10, 'Fake urgency'] }), { id: 'timer' }));
    on(['s59', 's60'], 'other', () => TH.split(s.s60, { her: 0.42, side: 'right', id: 'timer-refresh', enter: 0.3, draw: DP.timer({ at: T0(s.s59), refreshAt: WT(s.s60, 'refresh'), againAt: WT(s.s60, 'starts again') }) })); }
  else on(['s59', 's60'], 'other', () => full({ from: s.s59, to: s.s60 }, DP.timer({ at: T0(s.s59), refreshAt: WT(s.s60, 'refresh'), againAt: WT(s.s60, 'starts again') }), { id: 'timer' }));   // the deal's countdown is the content (not a short-length timer)
  on(['s61'], 'talk', () => TH.talk(s.s61, { frame: 'close', id: 'ends-in' }));
  on(['s62'], 'other', () => full(s.s62, DP.big('dd-urgency', { at: T0(s.s62), credit: 'deceptive.design  ·  Harry Brignull' }), { id: 'dd-urgency', ground: 'dpInk' }));

  /* ---------- 4:06 11 fake scarcity ---------- */
  on(['s63'], 'talk', () => TH.talk(s.s63, { frame: 'mid', punch: ['scarcity'], id: 'scarcity' }));
  on(['s63'], 'kw', () => KW(s.s63, 'fake ~scarcity~', { id: 'scarcity-kw' }));
  on(['s64'], 'other', () => TH.half(s.s64, { side: HV('right', 'top'), id: 'selling-out', ground: 'dpInk', draw: DP.pic({ key: 'px-4437148', at: T0(s.s64), fx: 0.5 }) }));
  on(['s65', 's66'], 'other', () => TH.split({ from: s.s65, to: s.s66 }, { her: HV(0.36, 0.42), side: HV('right', 'bottom'), id: 'stock', draw: DP.stock({ at: WT(s.s65, 'only two') - 0.2, weekAt: WT(s.s66, 'a week later'), tag: [11, 'Fake scarcity'] }) }));
  on(['s67'], 'talk', () => TH.talk(s.s67, { frame: 'tight', punch: ['buy'], id: 'buy-now' }));

  /* ---------- 4:26 why companies use them (the A/B testing aside s70-s78 was cut 2026-11-12, her note: those lines never play now) ---------- */
  on(['s68'], 'behind', () => TH.behind(s.s68, ['Why?'], { font: 'body', times: [WT(s.s68, 'why')], id: 'why', size: HV(260, 170), y: HV(230, 540) }));
  on(['s69'], 'talk', () => TH.talk(s.s69, { frame: 'mid', punch: ['numbers'], id: 'numbers' }));
  on(['s70'], 'other', () => TH.tile(s.s70, { at: HV('br', 'br'), w: HV(500, 420), id: 'teams', ground: 'dpInk', draw: DP.pic({ key: 'px-3865639', at: T0(s.s70), fy: 0.4 }) }));
  const bars = (val, wins) => (t, R, key) => { const bw = R.w * 0.9 * dpE(t, wins.at, 0.8, 'outQuint') * val; rect(R.x, R.y + 30, R.w * 0.9, 56, key === 'b' ? '#2A2A2A' : '#DCD8CF'); rect(R.x, R.y + 30, bw, 56, key === 'b' ? DP.pink : DP.ink);
    mono('Sales and sign-ups', R.x, R.y + 130, V(26, 28), key === 'b' ? '#C9A9B8' : '#6E6A62', 'left', { key: key + '-bar', fixed: true });
    if (wins.winAt && key === 'b') { const q = dpE(t, wins.winAt, 0.35, 'outBack'); if (q > 0.01) withT(R.x + R.w * 0.45, R.y + 250, 0.7 + 0.3 * q, -0.05, () => withA(clamp(q * 2), () => { const z = V(64, 60); const w_ = tw('WINS', F.disp(z)) + 60; rect(-w_ / 2, -z, w_, z * 1.5, DP.pink); _txt('WINS', 0, z * 0.3, F.disp(z), DP.ink, 'center'); })); } };
  on(['s71', 's72'], 'other', () => full({ from: s.s71, to: s.s72 }, DP.vs({ at: T0(s.s71), a: { title: 'Version [A]', hits: WT(s.s71, 'version a'), draw: bars(0.48, { at: WT(s.s72, 'more sales') }) },
    b: { title: 'Version [B]', hits: WT(s.s71, 'version b'), draw: bars(0.74, { at: WT(s.s72, 'more sales'), winAt: WT(s.s72, 'wins') }) } }), { id: 'ab-test', capRoom: 0 }));
  on(['s73'], 'talk', () => TH.talk(s.s73, { frame: 'close', punch: ['number'], id: 'number' }));
  on(['s74'], 'other', () => TH.split(s.s74, { her: HV(0.36, 0.44), side: HV('right', 'bottom'), id: 'tricked', ground: 'dpInk', draw: DP.crowd({ at: T0(s.s74), qAt: WT(s.s74, 'tricked') }) }));
  on(['s75', 's76'], 'talk', () => TH.talk({ from: s.s75, to: s.s76 }, { frame: 'mid', push: [HV(1.2, 1.14), HV(1.32, 1.22)], id: 'benefit' }));
  on(['s75'], 'other', () => TH.highlight(WT(s.s75, 'benefit'), 'benefit'));
  on(['s77'], 'talk', () => TH.talk(s.s77, { frame: 'close', push: [HV(1.3, 1.2), HV(1.4, 1.28)], id: 'better-worse' }));
  on(['s78'], 'talk', () => TH.talk(s.s78, { frame: 'close', id: 'end-up' }));
  on(['s79'], 'other', () => TH.split(s.s79, { her: HV(0.38, 0.44), side: HV('left', 'bottom'), id: 'chasing', ground: 'dpInk', draw: DP.pic({ key: 'px-1181370', at: T0(s.s79), fy: 0.4 }) }));
  on(['s80', 's81'], 'talk', () => TH.talk({ from: s.s80, to: s.s81 }, { frame: 'mid', push: [HV(1.12, 1.1), HV(1.3, 1.22)], id: 'own-goal' }));   // (a slow push: no dead hold now that the A/B part is gone)
  on(['s80'], 'other', () => TH.highlight(WT(s.s80, 'user'), 'user'));

  /* ---------- 5:14 how common ---------- */
  on(['s82'], 'behind', () => TH.behind(s.s82, ['How common?'], { font: 'body', times: [WT(s.s82, 'common')], id: 'how-common', size: HV(180, 110), y: HV(210, 540) }));
  on(['s83a'], 'other', () => full(s.s83a, DP.big('ec-head', { zoom: false, at: T0(s.s83a), hlAt: [1e9, WT(s.s83a, '399')], only: [1] }), { id: 'ec-head', ground: 'dpInk' }));
  on(['s83b'], 'other', () => TH.presenter(s.s83b, { side: 'right', id: 'one-forty-eight', ground: 'dpInk', draw: DP.dots({ n: 399, lit: 148, at: T0(s.s83b), litAt: WT(s.s83b, '148'), of: 'of 399' }) }));
  on(['s84a'], 'other', () => full(s.s84a, DP.big('ec-42', { at: T0(s.s84a) - 0.1, hlAt: WT(s.s84a, 'fake countdown'), credit: 'European Commission  ·  IP/23/418' }), { id: 'forty-two', ground: 'dpInk' }));
  on(['s84b'], 'other', () => TH.half(s.s84b, { side: HV('right', 'top'), id: 'seventy', ground: 'dpInk', draw: DP.dots({ n: 399, lit: 70, at: T0(s.s84b), litAt: WT(s.s84b, '70'), litD: 0.9 }) }));
  on(['s85a'], 'other', () => TH.room(s.s85a, { at: 'consumer and', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'six-forty-two', ground: 'dpInk',
    draw: DP.stat({ ground: 'dpInk', at: WT(s.s85a, 'consumer and') - 0.1, big: '642', small: 'subscription sites', foot: 'FTC  ·  10 July 2024' }) }));
  on(['s85b'], 'other', () => full(s.s85b, DP.ring({ at: WT(s.s85b, '76') - 0.2, pct: 76 }), { id: 'seventy-six', ground: 'dpInk' }));
  on(['s85c'], 'other', () => TH.split(s.s85c, { her: HV(0.36, 0.44), side: HV('right', 'bottom'), id: 'sixty-seven', ground: 'dpInk', draw: DP.ring({ at: T0(s.s85c) + 0.3, pct: 67 }) }));

  /* ---------- 5:52 the law ---------- */
  on(['s86'], 'other', () => TH.room(s.s86, { at: 'the law', her: HV(0.4, 0.44), side: HV('left', 'bottom'), id: 'law', ground: 'dpInk', draw: DP.pic({ key: 'px-22046935', at: WT(s.s86, 'the law') + 0.4, fy: 0.35 }) }));
  on(['s87'], 'talk', () => TH.talk(s.s87, { frame: 'close', push: [HV(1.38, 1.22), HV(1.5, 1.3)], id: 'even-laws' }));
  on(['s87b'], 'kw', () => KW(s.s87b, '~not~ a lawyer', { id: 'lawyer-kw' }));
  on(['s88'], 'talk', () => TH.talk(s.s88, { frame: 'mid', id: 'not-a-lawyer' }));
  on(['s89'], 'talk', () => TH.talk(s.s89, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.12, 1.18)], id: 'ucpd' }));   // the Directive's own page follows on the next line (s90)
  on(['s90'], 'talk', () => TH.talk(s.s90, { frame: 'close', punch: ['banned'], id: 'limited-time' }));   // (the Directive's text was too small to read at any size that fits: her on camera)
  on(['s91'], 'talk', () => TH.talk(s.s91, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.1, 1.16)], id: 'where-you-live' }));
  on(['s92'], 'other', () => full(s.s92, DP.big('gdpr-32', { at: T0(s.s92), hlAt: WT(s.s92, 'pre-ticked'), credit: 'GDPR Recital 32  ·  gdpr-info.eu' }), { id: 'gdpr', ground: 'dpInk' }));
  on(['s93a'], 'other', () => TH.ots(s.s93a, { side: 'auto', w: HV(760, undefined), id: 'extra', draw: DP.cart({ at: T0(s.s93a), rows: [{ s: 'Your order', price: '€40.00' }, { s: 'An extra, pre-ticked', price: '€2.99', tick: true }], total: [[0, '€42.99']] }) }));
  on(['s93b'], 'talk', () => TH.talk(s.s93b, { frame: 'mid', push: [HV(1.06, 1.06), HV(1.16, 1.14)], id: 'money-back' }));   // (the Directive's text was too small to read)
  on(['s94'], 'other', () => full(s.s94, DP.big('ftc-amazon-q1', { at: T0(s.s94), hlAt: [WT(s.s94, 'without their consent'), WT(s.s94, 'made cancelling')], credit: 'FTC press release  ·  17 Sep 2026' }), { id: 'amazon', ground: 'dpInk' }));
  if (SHORT) on(['s95'], 'other', () => TH.half([s.s95.t - 0.12, s.s95.e + 0.6], { side: 'top', size: 1060, id: 'amazon-fix-short', draw: DP.fix({ at: s.s95.t, head: 'Correction', text: 'Amazon agreed to a $2.5 billion settlement. It did not admit wrongdoing.', src: 'FTC, NBC News', typeD: 1.6, size: 64 }) }));
  if (!SHORT) on(['s95'], 'other', () => full(s.s95, DP.big('ftc-amazon-q2', { at: T0(s.s95), hlAt: [1e9, WT(s.s95, '2.5'), WT(s.s95, 'billion')], only: [1, 2], credit: 'FTC press release  ·  17 Sep 2026' }), { id: 'amazon-paid', ground: 'dpInk' }));   // the correction itself is the manifest's pause fix-amazon
  on(['s96'], 'talk', () => TH.talk(s.s96, { frame: 'mid', push: [HV(1.06, 1.06), HV(1.16, 1.14)], id: 'dfa' }));   // (the CMS crop read cut; the calendar at s98 carries the date)
  on(['s97'], 'talk', () => TH.talk(s.s97, { frame: 'mid', push: [HV(1.16, 1.12), HV(1.26, 1.18)], id: 'more-directly' }));
  on(['s98'], 'other', () => TH.ots(s.s98, { side: 'auto', w: HV(760, undefined), id: 'not-yet', ground: 'dpInk', draw: DP.cal({ at: T0(s.s98) + 0.1, month: 'NOV 2026', day: '11', markAt: WT(s.s98, 'under work') }) }));   // the draft's expected date (CMS, 19 Oct 2026; shown on the page at s96)

  /* ---------- 7:06 what to do ---------- */
  on(['s99'], 'other', () => full(s.s99, DP.eleven({ at: T0(s.s99), on: 11 }), { id: 'keep-in-mind' }));
  on(['s100a'], 'other', () => TH.half(s.s100a, { side: HV('left', 'top'), id: 'builders', ground: 'dpInk', draw: DP.pic({ key: 'px-35184839', at: T0(s.s100a), fy: 0.35 }) }));
  on(['s100b'], 'talk', () => TH.talk(s.s100b, { frame: 'close', punch: ['sued'], id: 'counter' }));
  /* 2026-11-16 (critic: sh14 is 16 s of talking): sh14 opens on s100a (always her talking), so its team photo comes on her next line, up to "sued" */
  on(['s100b'], 'late', () => SHORT && first === 's100a' && TH.half([s.s100b.t - 0.1, WT(s.s100b, 'sued') + 0.6], { side: HV('left', 'top'), id: 'builders-s', ground: 'dpInk', enter: 0.01, draw: DP.pic({ key: 'px-35184839', at: s.s100b.t - 0.6, fy: 0.35 }) }));
  on(['s101'], 'talk', () => TH.talk(s.s101, { frame: 'mid', push: [HV(1.1, 1.08), HV(1.22, 1.18)], id: 'this-is-wrong' }));
  on(['s102'], 'card', () => DP.card(s.s102, ['*Sued.*'], { id: 'sued-card', times: [WT(s.s102, 'sued'), WT(s.s102, 'sued')] }));
  on(['s103'], 'talk', () => TH.talk(s.s103, { frame: 'close', push: [HV(1.4, 1.22), HV(1.5, 1.3)], id: 'more-seriously' }));
  on(['s104'], 'talk', () => TH.talk(s.s104, { frame: 'close', push: [HV(1.3, 1.2), HV(1.4, 1.28)], id: 'honest' }));
  on(['s105'], 'talk', () => TH.talk(s.s105, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.08, 1.14)], id: 'better-place' }));

  TH.talk = talk0; TH.tile = tile0; if (FX) FX.restore();
  return s;
}

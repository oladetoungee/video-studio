/* scholarships: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * SC_SENT = her phrases (her corrected words, in order). SC_PLAN(mode) finds the ones inside this moment and runs every layout
 * call whose phrases are all there. In a short: the first phrase is always her talking (no overlay at the start), no L3 shout,
 * no corner circle / pops / stack, at most one keyword, full-frame film scenes go on a top panel under her label.
 * Change a layout here and the full edit and the shorts that hold it change together. */
'use strict';
const SC_SENT = {
  s0: 'a nigerian or an african student and you want to start a master\'s program in europe in 2027',
  s1: 'some scholarship deadlines have already passed and a lot of the big ones close between now and february',
  s2: 'in this video i\'m going to go through the main scholarships for nigerians in particular',
  s2b: 'but also all other african students can apply for in europe',
  s3: 'who each one of it is for what it covers and when it closes',
  s4: 'everything i\'m going to say in this video is current as of october 2026',
  s5: 'and all the official links will be in the description box of this video',
  s6: 'so please check them again and again before you apply',
  s7: 'first i will start with how these scholarships work before you decide the ones that work for you',
  s8: 'scholarship to study in europe do not all work the same and the biggest difference is the order you apply in',
  s9: 'for some you apply for the scholarship and then for the master\'s degree at the same time through the program',
  s10: 'for some you apply to the university first to get your admission and then you apply for the scholarship',
  s10b: 'the dutch nl scholarship works this way and sweden works in a similar way as well',
  s10c: 'and for some of them you apply for the scholarship and the university separately',
  s11: 'like chevening in the uk works like this',
  s12: 'the second difference is how much they cover',
  s12b: 'a partial scholarship will give you some of it',
  s12c: 'it could be a one-time payment or a discount on your tuition',
  s13: 'so there are two things you need to write down before you apply for any scholarship',
  s13b: 'whether the scholarship is full or partial',
  s14: 'the first thing i\'m going to talk about is open to students from anywhere in the world',
  s15: 'erasmus mundus is the european union scholarship for master\'s programs and is open to students from anywhere in the world nigeria africa anywhere',
  s16: 'this video is for nigerian and african students but this one is literally open to literally anyone',
  s17: 'and erasmus mundus master\'s is run by a group of universities in different countries together',
  s17b: 'so you usually study more than one country you could do your first year in one country and then your second year in another country',
  s18: 'if you get the scholarship it covers your participation cost which includes your tuition your travel your visa and a living allowance',
  s19: 'according to the eu erasmus page the living allowance is 1,400 euros a month for up to 24 months',
  s20: 'so you apply directly to the program you want on the program\'s website',
  s20b: 'there is a catalogue of all the programs on the eu\'s website and the link is also in the description box',
  s21: 'most programs take application between october and january for courses starting in the next autumn so for a 2027 start the window is now',
  s22: 'and there is also one in my school that i applied for as well and i got admission into it',
  s22b: 'i didn\'t go for this course it\'s called artificial intelligence for sustainable societies',
  s23: 'and i think the admission for that is also open currently',
  s24: 'before you start applying for any of these programs please listen to this',
  s25: 'not every program in the catalogue has scholarships every year',
  s26: 'is also one thing i found so check each programme\'s page before you spend weeks applying to the program',
  s27: 'what i\'d advise is that you pick two or three programs that fits what you study or what you\'re working on',
  s27b: 'and give each of this application your full attention',
  s28: 'the next one is the daad epos scholarship in germany',
  s28s: 'the daad epos scholarship in germany',   // (shorts that start on the name: the hook)
  s29: 'i don\'t know if it\'s pronounced that',
  s30: 'so this one is a very big scholarship body in germany and they do have a lot of scholarships',
  s30b: 'the one i would say is a good fit for nigerian graduates is the epos one the scholarships for development-related postgraduate courses',
  s31: 'it\'s for graduates from developing countries who already have at least two years of work experience after their first degree',
  s31b: 'and according to the brochure your degree should not be more than six years old when you apply for this one',
  s32: 'this scholarship gives you a monthly payment it helps you with health insurance there is a travel allowance and in some cases there is a rent subsidy',
  s32b: 'and that one only works for specific courses',
  s33: 'the list for 2027-28 for example has courses in development economics water engineering environmental governance',
  s33b: 'so you apply through the course by that course\'s deadline',
  s33c: 'i think for 2027 a lot of the deadlines for this one has passed',
  s34: 'but if you have work experience i think this epos one is a very good one to look out for',
  s34b: 'if you\'re looking to start in 2028 you already have to start preparing now',
  s35: 'then there\'s the swedish institute scholarship for global professionals in sweden',
  s35s: 'the swedish institute scholarship for global professionals in sweden',
  s36: 'it\'s for people from certain countries who want to do a master\'s in sweden and already have work and leadership experience and nigeria is one of those countries',
  s37: 'in fact they have even said that nigeria is one of the countries that it gets most applicants from',
  s37b: 'so this is a good scholarship if you\'re nigerian',
  s38: 'it\'s a full scholarship it pays your tuition and gives you a monthly living allowance',
  s39: 'and the order you apply is also very important',
  s39b: 'first you apply for the master\'s program through the university admissions which is the sweden national application website',
  s39c: 'i think the deadline is for january and then you apply for the scholarship itself in the short window in february',
  s39d: 'so just be informed just confirm the date i think that short window is 8 to 24 february 2027',
  s40: 'just confirm the date on the official website again link will be in the description box',
  s41: 'and if you\'ve been looking at scholarship in the netherlands it\'s probably out of the orange knowledge programme',
  s41b: 'it ended in 2024',
  s42: 'i was looking to see if there as if it has been replaced with something similar and i didn\'t see anything',
  s43: 'what is still available is the nl scholarship which used to be called the holland scholarship',
  s43b: 'it\'s for students from outside the eea and that includes nigeria and it offers 5,000 euros for your first year',
  s43c: 'it\'s a partial scholarship it doesn\'t cover everything but it would really help',
  s44: 'you apply to the university and after you get your admissions you apply for the scholarship',
  s44b: 'so each university sets its own deadline to apply to the university because you need the offer from the university to apply for the money',
  s45: 'and then there\'s one in hungary stipendium hungaricum it\'s the hungarian government scholarship',
  s45s: 'stipendium hungaricum it\'s the hungarian government scholarship',
  s45b: 'it covers your tuition your monthly stipend rather your place in the dorm or money towards your rent and it covers medical insurance',
  s46: 'it doesn\'t cover your full living cost so you still need a little money of your own but it is very helpful it goes a long way already',
  s47: 'and also apply here is also kind of different',
  s47b: 'you apply online through the tempus public foundation and the authority in your own country that handles higher education also has to nominate you',
  s47c: 'so you have to check if your country is on the current list i checked for nigeria and nigeria is on the list',
  s48: 'so for nigerians the body that nominates you is the federal scholarship board',
  s48b: 'the hungarian embassy in abuja says that the board can set its own earlier deadline and ask for extra documents so you have to contact them early enough',
  s49: 'the last round closed 15th january 2026 but the next round is not open yet so just keep checking the official website',
  s50: 'and now estonia this is where i study',
  s50b: 'estonia has a state scholarship for international student but it is not available for nigerians',
  s51: 'only citizens of certain countries can apply and nigeria is not on that list',
  s52: 'i think for nigerians the realistic options in estonia are the university\'s own tuition discount',
  s52b: 'and erasmus mundus programmes that include an estonian university like artificial intelligence for sustainable societies an erasmus mundus programme that my school is a part of',
  s52c: 'i did get a partial scholarship for this program by the way but i chose the current program i\'m doing instead so you should also look out for that maybe',
  s53: 'and then for chevening scholarship the uk is not in the eu but i thought i would just add it because it\'s a very popular one',
  s53b: 'if you\'re thinking about studying in the uk chevening is also like a good one',
  s53c: 'it\'s the uk government scholarship for one-year masters and nigerians do get in as well nigerians get in really well',
  s53d: 'i think the application has closed as of october so if you\'re preparing you\'re preparing for the next round',
  s53e: 'this year it opened around august so you should prepare for next year summer to like look out for it',
  s54: 'whichever one of these scholarships you are preparing or you\'re trying to apply for i\'ll say this this is something i\'ll tell a friend',
  s54b: 'first start preparing a year before you go',
  s55: 'for example if i want a scholarship for 2028 this is the time to start collecting and saying okay is it this one i want what document do i need',
  s55b: 'make a calendar for every one of these scholarships for every program put the deadline put the required document',
  s56: 'you know get your documents ready early your degree certificates your transcripts your passports that will not expire soon and up-to-date cv proof of english if you need it',
  s57: 'get your official transcript that one is very important because it takes time so start that one early',
  s57b: 'if you can get a student transcript an official student transcript that also helps',
  s58: 'and for the motivation letter part because for some of them you\'d have to write a motivation letter answer the question that was asked',
  s58b: 'yeah usually they will tell you what they want the motivation letter to be about so stay within the boundaries of what they asked',
  s58c: 'if you\'re applying for different things different scholarship don\'t use the same letter for everywhere right',
  s58d: 'each program is different and what attracts you to each one is different',
  s58e: 'so try to sell your experiences as much as you can try to sell your passion sell the work that you\'ve done',
  s58f: 'if you like the program enough you won\'t find it hard to write about it be original',
  s59: 'if you need references some of these scholarships do require references ask for your references',
  s59b: 'and also apply for more than one they are very competitive and you want to give yourself more chances',
  s60: 'and last but not the least apply only on the official websites just the official websites',
  s61: 'okay i hope you get your scholarship and i hope you get in',
  s61b: 'i\'m rooting for you and i wish you the best of luck bye',
};
const SCX = { skipIds: new Set() }; SCX.skip = (...ids) => ids.forEach(i => SCX.skipIds.add(i));
/** the time of a word inside a phrase (its first occurrence) */
function WT(ph, word) { const n = norm(word); for (let i = ph.i; i < Math.min(WORDS.length, ph.i + 80); i++) if (WORDS[i].n === n) return WORDS[i].t; throw new Error('word not in phrase: ' + word); }
/** the short's label in League Gothic: one line when it fits 960 px, else two balanced lines */
function labelLines6(str) { const f = F.disp(120); if (tw(str.toUpperCase(), f) <= W - 120) return [str]; const ws = str.split(/\s+/); let best = null;
  for (let k = 1; k < ws.length; k++) { const a = ws.slice(0, k).join(' '), b = ws.slice(k).join(' '); const m = Math.max(tw(a.toUpperCase(), f), tw(b.toUpperCase(), f)); if (!best || m < best[0]) best = [m, [a, b]]; } return best ? best[1] : [str]; }
function SC_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(SC_SENT)) { try { s[k] = P(q); } catch (e) { /* not in this moment */ } }
  if (mode !== 'short') window.SC_MISSING = Object.keys(SC_SENT).filter(k => !s[k]);
  const keys = Object.keys(s); const first = keys[0]; let kws = 0; const short = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (short) {
      if (kind === 'shout' || kind === 'corner' || kind === 'pops' || kind === 'stack' || kind === 'behind') return;
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw' && ++kws > 1) return;
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && SCX.skipIds.has(sg.id)) TH.segs.pop();
  };
  // shorts: her picture keeps the 3:4 window's size; full-frame film scenes become a top panel under her label
  const tile0 = TH.tile, cut0 = TH.cutaway, split0 = TH.split, pres0 = TH.presenter, talk0 = TH.talk, room0 = TH.room; const half0r = TH.half, ots0r = TH.ots;
  // 2026-11-10: shorts with a format (manifest "fmt", moments/formats.js SCF) place graphics / her framing by format; the rest as before
  if (short && !(typeof SCF !== 'undefined' && SCF.setup(s, first))) {
    TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.42, side: 'bottom', at: undefined, w: undefined });
    TH.cutaway = (sp, o = {}) => TH.half(sp, { film: { ...(o.film || {}) }, side: 'top', size: 1060, id: o.id, noCaps: o.noCaps, lead: o.lead });
    const filmTop = (sp, o) => TH.half(sp, { film: { ...o.film, aspect: '9x16', fit: undefined }, side: 'top', size: 1060, id: o.id, lead: o.lead });
    TH.split = (sp, o = {}) => (o.film ? filmTop(sp, o) : split0(sp, o));
    TH.room = (sp, o = {}) => (o.film ? filmTop(sp, o) : split0(sp, { ...o, at: undefined, her: 0.42, side: 'bottom' }));
    TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: /close|tight/.test(o.frame || '') ? 'wide' : o.frame, punch: undefined, push: undefined });
    if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
    // the top label in type set 06 (her rule 2026-11-07: no white boxes): League Gothic caps on the graphite band, editable
    const lbl = FOOT.m.topLabel; if (lbl && !TH.__lbl) { TH.__lbl = true; const LB = () => { const lines = labelLines6(lbl); return 120 + lines.length * 128 + 30; };
      TH.labelBottom = LB;
      TH.over.push((t) => { if (t >= FOOT.dur) return; SCENE_ID = 'label'; EL.seen.clear(); g = G.term; const o = ovr('top label'); const str = o.s != null ? o.s : lbl;
        const lines = labelLines6(str); moved(o, () => { lines.forEach((l, i) => _txt(l.toUpperCase(), CX, 120 + (i + 1) * 128, F.disp(120), NB.let, 'center'));
          regBox(o, 60, 120, W - 120, lines.length * 128 + 20, { text: str, def: lbl, kind: 'box', label: 'top label (text, size, place)' }); }, [CX, 120]); }); }
  }
  const T0 = (ph) => ph.t - 0.12;
  const F16 = V(230, 0);   // full-frame graphics keep her 16:9 caption band free
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; let tc; try { tc = WT(sp, c.replace(/[^a-z0-9',]/gi, '')); } catch (e) { tc = sp.t; }
    return TH.keyword(sp, w, { y: V(undefined, short ? Math.max(440, TH.labelBottom() + 170) : 290), times: o.times || ws.map(() => tc), ...o }); };
  const city = (name, title, sp, o = {}) => SC.city(name, title, { at: T0(sp), sub: o.sub, side: o.side, dur: o.dur });

  /* ---------- 0:00 the board ---------- */
  on(['s0'], 'talk', () => TH.presenter(s.s0, { side: 'right', id: 'open', draw: SC.title(['SCHOLARSHIPS', 'IN EUROPE', '2027 INTAKE'], T0(s.s0) + 0.1) }));
  on(['s1'], 'other', () => TH.split(s.s1, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'board', lead: 0.05, draw: SC.board({ title: 'Departures · 2027', t0: T0(s.s1), dimAt: WT(s.s1, 'passed'),
    statusAt: { em: WT(s.s1, 'february'), aiss: WT(s.s1, 'between'), si: WT(s.s1, 'february') + 0.1, nl: WT(s.s1, 'between') + 0.1, daad: WT(s.s1, 'passed'), hu: WT(s.s1, 'passed') + 0.08, chev: WT(s.s1, 'passed') + 0.16 } }) }));
  on(['s2'], 'talk', () => TH.talk(s.s2, { frame: 'close', push: [V(1.12, 1.1), V(1.2, 1.16)], id: 'main' }));
  on(['s3'], 'talk', () => TH.talk(s.s3, { frame: 'mid', push: [V(1.06, 1.06), V(1.14, 1.14)], id: 'three' }));   // (was a stack re-typing her three questions)
  on(['s4'], 'talk', () => TH.talk(s.s4, { frame: 'mid', push: [V(1.04, 1.06), V(1.12, 1.14)], id: 'checked' }));   // (the 'checked 2 Nov 2026' date is on the opening title already)
  on(['s7'], 'other', () => TH.card(s.s7, ['How it works'], { id: 'how', times: [WT(s.s7, 'how'), WT(s.s7, 'how'), WT(s.s7, 'work')] }));
  on(['s8'], 'behind', () => TH.behind(s.s8, ['THE ORDER'], { times: [WT(s.s8, 'order') - 0.2, WT(s.s8, 'order')], id: 'order', size: V(260, 190) }));
  on(['s9'], 'other', () => TH.cutaway([WT(s.s9, 'same') - 0.6, s.s9.e + 0.4], { film: { scene: 'routes' }, enter: 'push', id: 'routes' }));
  on(['s10b', 's11'], 'other', () => TH.split({ from: s.s10b, to: s.s11 }, { her: V(0.38, 0.42), side: V('right', 'bottom'), id: 'routes-2', film: { scene: 'routes', aspect: '9x16', fit: 'safe' } }));
  on(['s12', 's12c'], 'other', () => TH.half([WT(s.s12, 'fully') - 0.4, s.s12c.e + 0.4], { side: V('right', 'top'), id: 'cover', film: { scene: 'cover' } }));
  on(['s13', 's13b'], 'other', () => TH.split({ from: s.s13, to: s.s13b }, { her: V(0.38, 0.42), side: V('left', 'bottom'), id: 'two-things', draw: SC.pic('notes', { at: T0(s.s13), fx: 0.55 }) }));

  /* ---------- 1:21 Erasmus Mundus ---------- */
  on(['s14'], 'talk', () => TH.talk(s.s14, { frame: 'mid', id: 'anywhere' }));
  on(['s15'], 'other', () => TH.presenter(s.s15, { side: 'right', id: 'em-city', gr: [0, 0, W, H], draw: city('brussels', 'ERASMUS MUNDUS', s.s15, { sub: 'European Union', dur: 9 }) }));
  on(['s16'], 'talk', () => TH.talk(s.s16, { frame: 'close', punch: ['anyone'], id: 'anyone' }));
  on(['s17', 's17b'], 'other', () => TH.room({ from: s.s17, to: s.s17b }, { at: 'universities', side: V('right', 'bottom'), id: 'em-run', draw: SC.pic('wing', { at: T0(s.s17), fx: 0.6 }) }));
  on(['s18'], 'other', () => TH.cutaway([WT(s.s18, 'tuition') - 0.5, s.s18.e + 0.4], { film: { scene: 'em-covers' }, enter: 'push', id: 'em-covers', noCaps: true }));
  on(['s19'], 'other', () => TH.split([WT(s.s19, '1,400') - 0.5, s.s19.e + 0.4], { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'em-1400', film: { scene: 'em-1400', aspect: '9x16', fit: 'safe' } }));
  on(['s20', 's20b'], 'other', () => TH.tile({ from: s.s20, to: s.s20b }, { at: V('br', 'br'), w: V(520, 420), id: 'em-cat', draw: SC.clip('em-cat', { at: WT(s.s20b, 'catalogue') - 0.2, src: 'EACEA · Erasmus Mundus Catalogue', capRoom: F16, middle: true }) }));
  on(['s21'], 'other', () => TH.cutaway([WT(s.s21, 'october') - 0.4, s.s21.e + 0.4], { film: { scene: 'em-window' }, id: 'em-window' }));
  on(['s22', 's22b'], 'other', () => TH.presenter({ from: s.s22, to: s.s22b }, { side: 'left', id: 'aiss-city', gr: [0, 0, W, H], draw: city('tallinn', 'AISS', s.s22, { sub: 'Tallinn', side: 'left', dur: 9 }) }));
  // correction (FEEDBACK 2026-11-02): she says AISS admission is open; it opens on 2 Dec 2026. A plain screen types the fix.
  // (the pause "fix-aiss" in talking-head.json stops her after this line and types the correction; then the real page)
  on(['s23', 's24'], 'other', () => TH.tile(s.s24, { at: V('tr', 'br'), w: V(620, 440), id: 'aiss-page', draw: SC.clip('aiss-dates', { at: T0(s.s24) + 0.1, hlAt: [T0(s.s24) + 0.6, T0(s.s24) + 1.0], open: true, src: 'aissprogram.eu · checked 2 Nov 2026', minK: V(2.0, 1.9), maxW: V(940, 880), top: V(110, 48), capRoom: V(230, 48) }) }));
  on(['s25'], 'other', () => TH.half(s.s25, { side: V('left', 'top'), id: 'every', film: { scene: 'every' } }));
  on(['s26'], 'talk', () => TH.talk(s.s26, { frame: 'mid', id: 'check-page' }));
  on(['s27', 's27b'], 'other', () => TH.ots({ from: s.s27, to: s.s27b }, { side: 'auto', id: 'pick', draw: SC.flapsCard([{ v: '2 OR 3', at: WT(s.s27, 'two') - 0.1 }], { pad: 50, cw: 110 }) }));

  /* ---------- 2:47 DAAD EPOS ---------- */
  on(['s28'], 'other', () => TH.presenter({ from: s.s28, to: s.s29 || s.s28 }, { side: 'right', id: 'daad-city', gr: [0, 0, W, H], draw: city('berlin', 'DAAD EPOS', s.s28, { sub: 'Germany', dur: 8 }) }));
  on(['s30'], 'talk', () => TH.talk(s.s30, { frame: 'mid', push: [V(1.0, 1.06), V(1.08, 1.12)], id: 'big-body' }));
  on(['s31', 's31b'], 'other', () => TH.split([WT(s.s31, 'two') - 0.5, s.s31b.e + 0.4], { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'daad-gate', film: { scene: 'daad-gate', aspect: '9x16', fit: 'safe' } }));
  on(['s32', 's32b'], 'other', () => TH.cutaway({ from: s.s32, to: s.s32b }, { film: { scene: 'daad-pays' }, enter: 'push', id: 'daad-pays' }));
  on(['s33', 's33c'], 'other', () => TH.half([WT(s.s33, 'economics') - 0.6, s.s33c.e + 0.4], { side: V('right', 'top'), id: 'daad-list', film: { scene: 'daad-list' } }));
  on(['s34'], 'talk', () => TH.talk(s.s34, { frame: 'close', id: 'look-out' }));
  on(['s34b'], 'talk', () => TH.talk(s.s34b, { frame: 'close', punch: ['now'], id: 'y2028' }));

  /* ---------- 3:44 Sweden ---------- */
  on(['s35'], 'other', () => TH.presenter(s.s35, { side: 'left', id: 'si-city', gr: [0, 0, W, H], draw: city('stockholm', 'SWEDISH INSTITUTE', s.s35, { sub: 'Sweden', side: 'left', dur: 7 }) }));
  on(['s36'], 'other', () => TH.ots([WT(s.s36, 'leadership') - 0.6, s.s36.e + 0.4], { side: 'auto', id: 'si-eligible', draw: SC.flapsCard([{ v: 'NIGERIA ✓', at: WT(s.s36, 'nigeria') - 0.1 }], { pad: 50, cw: 90 }) }));
  on(['s37', 's38'], 'other', () => TH.split({ from: s.s37, to: s.s38 }, { her: V(0.38, 0.42), side: V('left', 'bottom'), id: 'si-list', film: { scene: 'si-list', aspect: '9x16', fit: 'safe' } }));
  if (!s.s37) on(['s38'], 'kw', () => KW(s.s38, 'a ~full~ scholarship', { id: 'si-full' }));   // (sh04: the 'most applicants' line is cut)
  on(['s39', 's39c'], 'other', () => TH.cutaway([WT(s.s39b, 'university') - 0.5, s.s39c.e + 0.4], { film: { scene: 'si-steps' }, enter: 'push', id: 'si-steps' }));
  on(['s39d'], 'kw', () => KW(s.s39d, '~8 to 24 February~ 2027', { id: 'si-window' }));
  on(['s40'], 'talk', () => TH.talk(s.s40, { frame: 'mid', id: 'confirm' }));

  /* ---------- 4:24 the Netherlands ---------- */
  on(['s41', 's41b'], 'other', () => TH.presenter({ from: s.s41, to: s.s41b }, { side: 'right', id: 'nl-city', gr: [0, 0, W, H], draw: city('amsterdam', 'NETHERLANDS', s.s41, { dur: 7 }) }));
  on(['s41b', 's42'], 'other', () => TH.split([WT(s.s41b, 'ended') + 0.6, s.s42.e + 0.3], { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'okp', draw: SC.clip('okp-ended', { at: WT(s.s41b, 'ended') + 0.7, hlAt: [WT(s.s41b, 'ended') + 1.1], flap: 'ENDED IN 2024', flapCol: NB.dim, capRoom: V(48, 48), pad: 36 }) }));
  on(['s43', 's43c'], 'other', () => TH.split([WT(s.s43b, '5,000') - 0.6, s.s43c.e + 0.4], { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'nl-gate', film: { scene: 'nl-gate', aspect: '9x16', fit: 'safe' } }));
  on(['s44', 's44b'], 'other', () => TH.half({ from: s.s44, to: s.s44b }, { side: V('left', 'top'), id: 'nl-order', film: { scene: 'nl-order' } }));

  /* ---------- 5:01 Hungary (+ the DSA correction) ---------- */
  on(['s45'], 'other', () => TH.presenter(s.s45, { side: 'left', id: 'hu-city', gr: [0, 0, W, H], draw: city('budapest', 'STIPENDIUM HUNGARICUM', s.s45, { side: 'left', dur: 6 }) }));
  on(['s45b'], 'other', () => TH.ots(s.s45b, { side: 'auto', w: V(780, undefined), id: 'hu-covers', draw: SC.pic('dorm', { at: T0(s.s45b), fy: 0.4 }) }));
  on(['s47', 's47c'], 'other', () => TH.split([WT(s.s47b, 'tempus') - 0.6, s.s47c.e + 0.4], { her: V(0.38, 0.42), side: V('right', 'bottom'), id: 'hu-apply', film: { scene: 'hu-apply', aspect: '9x16', fit: 'safe' } }));
  on(['s48'], 'talk', () => TH.talk(s.s48, { frame: 'mid', id: 'fsb' }));
  // correction (FEEDBACK 2026-11-02): "Federal Scholarship Board" -> renamed Department of Scholarship Awards (DSA) in 2026
  // (the pause "fix-dsa" stops her after "Federal Scholarship Board" and types the new name; then the embassy page)
  on(['s48b'], 'other', () => TH.split(s.s48b, { her: V(0.38, 0.42), side: V('left', 'bottom'), id: 'dsa-page', draw: SC.clip('hu-dsa', { at: T0(s.s48b) + 0.1, hlAt: [T0(s.s48b) + 0.6, T0(s.s48b) + 1.0, T0(s.s48b) + 1.4], src: 'abuja.mfa.gov.hu · checked 2 Nov 2026', maxW: V(1060, 980) }) }));
  on(['s49'], 'other', () => TH.cutaway([WT(s.s49, '15th') - 0.5, s.s49.e + 0.4], { film: { scene: 'hu-status' }, enter: 'push', id: 'hu-status' }));

  /* ---------- 5:50 Estonia ---------- */
  on(['s50', 's50b'], 'other', () => TH.presenter({ from: s.s50, to: s.s50b }, { side: 'right', id: 'ee-city', gr: [0, 0, W, H], draw: city('tallinn', 'ESTONIA', s.s50, { dur: 9 }) }));
  on(['s51'], 'talk', () => TH.talk(s.s51, { frame: 'close', punch: ['not'], id: 'not-on-list' }));
  on(['s52', 's52b'], 'other', () => TH.split([WT(s.s52, 'discount') - 0.7, s.s52b.e + 0.4], { her: V(0.38, 0.42), side: V('left', 'bottom'), id: 'ee-options', film: { scene: 'ee-options', aspect: '9x16', fit: 'safe' } }));
  on(['s52c'], 'talk', () => TH.talk(s.s52c, { frame: 'close', id: 'my-aiss' }));

  /* ---------- 6:22 Chevening (UK) ---------- */
  on(['s53', 's53b'], 'other', () => TH.presenter({ from: s.s53, to: s.s53b }, { side: 'left', id: 'chev-city', gr: [0, 0, W, H], draw: city('london', 'CHEVENING', s.s53, { sub: 'United Kingdom', side: 'left', dur: 9 }) }));
  on(['s53d', 's53e'], 'other', () => TH.ots({ from: s.s53d, to: s.s53e }, { side: 'auto', id: 'chev-dates', draw: SC.flapsCard([{ k: 'Chevening 2027-28', v: 'CLOSED · OCT 2026', at: WT(s.s53d, 'closed') - 0.2, st: 'dim' }, { k: 'Next round', v: 'AROUND AUG 2027', at: WT(s.s53e, 'august') - 0.2 }], { pad: 50 }) }));

  /* ---------- 6:50 how to prepare ---------- */
  on(['s54'], 'talk', () => TH.talk(s.s54, { frame: 'mid', push: [V(1.0, 1.06), V(1.1, 1.12)], id: 'friend' }));
  on(['s54b'], 'other', () => TH.half(s.s54b, { side: V('left', 'top'), id: 'a-year', draw: SC.pic('planner', { at: T0(s.s54b), fx: 0.6 }) }));
  on(['s55', 's55b'], 'other', () => TH.split({ from: s.s55, to: s.s55b }, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'calendar', film: { scene: 'calendar', aspect: '9x16', fit: 'safe' } }));
  on(['s56'], 'other', () => TH.ots(s.s56, { side: 'auto', w: V(780, undefined), id: 'docs', draw: SC.pic('passports', { at: T0(s.s56) }) }));
  on(['s57b'], 'talk', () => TH.talk(s.s57b, { frame: 'close', id: 'student-transcript' }));
  on(['s58', 's58b'], 'other', () => TH.half({ from: s.s58, to: s.s58b }, { side: V('right', 'top'), id: 'letter', draw: SC.pic('writing', { at: T0(s.s58), fx: 0.45 }) }));
  on(['s58c', 's58d'], 'talk', () => TH.talk({ from: s.s58c, to: s.s58d }, { frame: 'close', punch: ['different'], id: 'same-letter' }));
  on(['s58e'], 'talk', () => TH.talk(s.s58e, { frame: 'mid', push: [V(1.0, 1.06), V(1.12, 1.14)], id: 'sell' }));
  on(['s58f'], 'kw', () => KW(s.s58f, 'be ~original~', { id: 'original' }));
  on(['s59', 's59b'], 'talk', () => TH.talk({ from: s.s59, to: s.s59b }, { frame: 'mid', punch: ['more'], id: 'refs' }));
  on(['s60'], 'other', () => TH.cutaway(s.s60, { film: { scene: 'official' }, id: 'official', noCaps: true, enter: 'snap' }));
  on(['s61'], 'talk', () => TH.talk(s.s61, { frame: 'mid', id: 'hope' }));
  on(['s61b'], 'other', () => TH.split(s.s61b, { her: V(0.4, 0.44), side: V('right', 'bottom'), id: 'rooting', film: { scene: 'end', aspect: '9x16', fit: 'safe' } }));

  if (short && typeof SCF !== 'undefined') SCF.fill();
  TH.talk = talk0; TH.tile = tile0; TH.cutaway = cut0; TH.split = split0; TH.presenter = pres0; TH.room = room0; TH.half = half0r; TH.ots = ots0r;
  return s;
}

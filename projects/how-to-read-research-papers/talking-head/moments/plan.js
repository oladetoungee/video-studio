/* how-to-read-research-papers: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-03 by the FILM agent. RP_SENT (moments/sent.js) = her sentences after the cleanup cuts, keys s<index>.
 * RP_PLAN(mode) runs every layout call whose sentences are all inside this moment (a short is one stretch of the video).
 * Shorts (her rules): she is always on camera (a full-frame graphic becomes the top panel with her below; black phrase cards
 * and keywords are left out), no big overlay text, no timers, the first sentence is her talking.
 * Keshav's page is the running object: the same two pages, marked up pass by pass. The look: film/scenes/rp.js + moments/common.js. */
'use strict';
function RP_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(RP_SENT)) { const c0 = CUR; try { const ph = P(q); if (RP_RAW[k] != null && Math.abs(outToRaw(ph.t) - RP_RAW[k]) > 1.5) { CUR = c0; continue; } s[k] = ph; } catch (e) { CUR = c0; } }
  const keys = Object.keys(s); const first = keys[0]; const SHORT = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (SHORT) { if (kind === 'card' || kind === 'kw' || kind === 'behind') return; if (refs.includes(first) && kind !== 'talk' && kind !== 'late') return; }
    fn();
  };
  const T0 = (ph) => ph.t - 0.12; const w = (k, x) => (s[k] ? WT(s[k], x) : 0); const HV = (a, b) => V(a, b);
  // shorts: a full-frame graphic becomes the top panel (under her label), her below; a window tile becomes her strip
  let full = SHORT ? (sp, draw, o = {}) => TH.half(sp, { side: 'top', size: 1080, draw, id: o.id, until: o.until }) : RP.full;
  const tile0 = TH.tile; if (SHORT) TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.42, side: 'bottom', at: undefined, w: undefined });
  const split0 = TH.split; if (SHORT) TH.split = (sp, o = {}) => split0(sp, { ...o, her: Math.min(o.her || 0.42, 0.42) });
  const ots0 = TH.ots; if (SHORT) TH.ots = (sp, o = {}) => TH.split(sp, { ...o, her: 0.46, side: 'bottom', w: undefined });
  const talk0 = TH.talk; if (SHORT) TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });
  let fig = SHORT ? (sp, o) => TH.split(sp, { her: 0.5, side: 'bottom', id: o.id, draw: RP.head({ lines: o.title.join('\n'), at: sp.t - 0.1, hand: o.hand }) }) : RP.fig;
  // 2026-11-10 format mix (manifest "fmt", moments/formats.js RF.install): the format decides where graphics and her picture go
  const FX = SHORT && typeof RF !== 'undefined' && RF.on ? RF.install(s, first, { talk0, split0 }) : null;
  if (FX) { full = FX.full; fig = FX.fig; }
  if (SHORT && first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
  const KW = (sp, txt_, o = {}) => { const ws = String(txt_).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; const tc = Array.isArray(sp) ? sp[0] + 0.1 : WT(sp, c);
    return TH.keyword(sp, txt_, { y: 900, times: o.times || ws.map(() => tc), ...o }); };
  const K = RP.KS;
  const ABS = [231, 241, 252, 262, 272].map(y => [52, y, 294]);

  /* ---------- 0:00 not a novel ---------- */
  on(['s0'], 'late', () => TH.split(s.s0, { her: HV(0.42, 0.46), side: HV('right', 'bottom'), id: 'not-a-novel', enter: 0.01,
    draw: RP.page({ at: T0(s.s0), p: 1, focus: [176, 250], s: HV(0.92, 0.95), title: SHORT ? undefined : { lines: 'How to read a\n*research paper*', side: 'top', size: HV(84, 96) },
      hlpt: ABS.map((b, i) => [...b, w('s0', 'written') + i * 0.16]), cross: ['Abstract', w('s0', 'novel')], crossBox: [58 * K, 224 * K, 238 * K, 56 * K],
      notes: [] }) }));
  on(['s1'], 'talk', () => TH.talk(s.s1, { frame: 'mid', push: [HV(1.12, 1.1), HV(1.2, 1.16)], id: 'parts-and-order' }));

  on(['s2', 's3'], 'other', () => TH.room({ from: s.s2, to: s.s3 }, { at: 'three-pass', her: HV(0.38, 0.46), side: HV('right', 'bottom'), id: 'three-pass',
    draw: RP.passes({ at: w('s2', 'three-pass') - 0.1, times: [w('s2', 'three-pass'), w('s2', 'three-pass') + 0.25, w('s2', 'three-pass') + 0.5] }) }));

  /* ---------- 0:15 the parts of a paper ---------- */
  on(['s4', 's5'], 'other', () => fig({ from: s.s4, to: s.s5 }, { id: 'same-parts', title: ['The *parts*'], titleAt: 'most research', below: 'Figure 2' }));
  on(['s6', 's8'], 'other', () => full({ from: s.s6, to: s.s8 }, RP.parts({ at: T0(s.s6), title: SHORT ? undefined : 'A pattern\ncalled *IMRAD*',
    items: [{ s: 'Title', at: w('s8', 'title') }, { s: 'Abstract', at: w('s8', 'abstract') }, { s: 'Introduction', at: w('s7', 'introduction') }, { s: 'Related work', at: w('s8', 'related') },
      { s: 'Methods', at: w('s7', 'methods') }, { s: 'Results', at: w('s7', 'results') }, { s: 'Discussion', at: w('s7', 'discussion') }, { s: 'Limitations', at: w('s8', 'limitation') },
      { s: 'Conclusion', at: w('s8', 'conclusion') }, { s: 'References', at: w('s8', 'references') }] }), { id: 'imrad' }));
  on(['s9', 's10'], 'talk', () => TH.talk({ from: s.s9, to: s.s10 }, { frame: 'wide', push: [HV(1.0, 1.06), HV(1.08, 1.12)], id: 'hci' }));

  on(['s11'], 'behind', () => TH.behind(s.s11, ['every part?'], { times: [w('s11', 'every part')], id: 'every-part', size: HV(230, 130), y: HV(300, 560) }));
  on(['s11'], 'late', () => SHORT && TH.talk(s.s11, { frame: 'mid', id: 'not-every-part' }));
  on(['s12'], 'talk', () => TH.talk(s.s12, { frame: 'close', punch: ['three'], id: 'three-parts-talk' }));
  on(['s12'], 'late', () => SHORT && TH.split(s.s12, { her: 0.5, side: 'bottom', id: 'three-parts', draw: RP.head({ lines: 'Three parts do\n*most of the work*', at: T0(s.s12) }) }));

  /* ---------- 1:09 abstract, method, discussion + limitations ---------- */
  on(['s13', 's16'], 'other', () => TH.room({ from: s.s13, to: s.s16 }, { at: 'abstract', her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'abstract',
    draw: RP.page({ at: T0(s.s13), p: 1, focus: [176, 252], s: HV(0.98, 0.78), hlpt: ABS.map((b, i) => [...b, w('s14', 'short paragraph') + i * 0.13]),
      notes: [], tab: [1, 214] }) }));
  on(['s17', 's18'], 'other', () => full({ from: s.s17, to: s.s18 }, RP.pic({ key: 'px-5989928', at: T0(s.s17), fx: 0.45 }), { id: 'method', ground: 'rpDesk' }));
  on(['s19'], 'talk', () => TH.talk(s.s19, { frame: 'mid', punch: ['trust'], id: 'trust' }));

  on(['s20', 's23'], 'other', () => TH.tile({ from: s.s20, to: s.s23 }, { at: HV('br', 'br'), w: HV(720, 440), id: 'discussion',
    draw: RP.head({ at: T0(s.s20), lines: 'Discussion\n+ *limitations*', y: 0.36, size: HV(130, 120) }) }));
  on(['s24', 's25'], 'talk', () => TH.talk({ from: s.s24, to: s.s25 }, { frame: 'wide', push: [HV(1.04, 1.08), HV(1.14, 1.14)], id: 'gap' }));


  /* ---------- 2:04 Keshav's paper, three passes ---------- */
  on(['s26', 's27'], 'other', () => TH.room({ from: s.s26, to: s.s27 }, { at: 'two-page', her: HV(0.38, 0.46), side: HV('right', 'bottom'), id: 'keshav',
    draw: RP.page({ at: w('s26', 'two-page') - 0.2, p: 1, focus: [306, 150], s: HV(1.0, 0.8), fy: 0.4, hl: [['How to Read a Paper', w('s26', 'how to read')]], loops: [['S. Keshav', w('s27', 'keshav')]],
      notes: [{ s: 'two pages', x: 380, y: 60, z: 28, at: w('s26', 'two-page') + 0.2, rot: 3 }] }) }));
  on(['s28', 's30'], 'other', () => full({ from: s.s28, to: s.s30 }, RP.passes({ at: T0(s.s28), times: [w('s29', 'first pass'), w('s30', 'second'), w('s30', 'third')], title: SHORT ? undefined : 'Up to\n*three passes*' }), { id: 'passes' }));
  on(['s31'], 'other', () => TH.split(s.s31, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'pass-one',
    draw: RP.page({ at: T0(s.s31), p: 1, focus: 'about five to ten minutes', s: HV(1.05, 0.86), hl: [['about five to ten minutes', w('s31', 'five to ten')]], tab: [1, 520] }) }));
  on(['s32', 's35'], 'other', () => full({ from: s.s32, to: s.s35 }, RP.page({ at: T0(s.s32), p: 1, focus: 'Read the section and sub-section headings', s: HV(1.05, 0.9), fx: HV(0.56, 0.5),
    title: SHORT ? undefined : { lines: 'Pass one:\n*the order*', side: 'left' }, credit: 'S. Keshav, “How to Read a Paper” (2007), section 2.1',
    ticks: [[76, 669, w('s33', 'title')], [76, 688, w('s34', 'section')], [76, 717, w('s35', 'conclusion')]],
    hl: [['Carefully read the title, abstract, and introduction', w('s33', 'carefully')], ['Read the section and sub-section headings', w('s34', 'section')], ['Read the conclusions', w('s35', 'conclusion')], ['Glance over the references', w('s35', 'glance') + 0.65]],
    move: [{ at: w('s35', 'glance') - 0.1, focus: 'Glance over the references' }], notes: [{ s: '↑ only these,\nin this order', x: 140, y: 745, z: 26, at: w('s34', 'ignore') }] }), { id: 'four-steps' }));
  on(['s36'], 'talk', () => TH.talk(s.s36, { frame: 'mid', id: 'tick-off' }));
  on(['s37'], 'other', () => TH.ots(s.s37, { side: 'auto', w: HV(720, undefined), id: 'book-video',
    draw: RP.head({ at: w('s37', 'my video') - 0.1, lines: 'My video:\n*how to read a book*', size: HV(96, 110) }) }));
  on(['s38'], 'talk', () => TH.talk(s.s38, { frame: 'wide', push: [HV(1.0, 1.06), HV(1.1, 1.12)], id: 'five-questions' }));

  on(['s39'], 'other', () => RP.fig(s.s39, { id: 'fig-five', title: ['*Five* questions'], titleAt: 'so when', below: 'Figure 2: the five Cs (S. Keshav, 2007)' }));
  const fiveT = [w('s40', 'category'), w('s44', 'context'), w('s48', 'correctness'), w('s49', 'contribution'), w('s50', 'clarity')];
  on(['s40', 's45'], 'other', () => full({ from: s.s40, to: s.s45 }, RP.fiveC({ at: T0(s.s40), times: fiveT }), { id: 'five-cs' }));
  on(['s48', 's50'], 'other', () => TH.split({ from: s.s48, to: s.s50 }, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'five-cs-2', draw: RP.fiveC({ noTitle: SHORT, at: T0(s.s48) - 0.4, times: fiveT.map((x, i) => i < 2 ? T0(s.s48) - 0.4 : x) }) }));
  on(['s51'], 'talk', () => TH.talk(s.s51, { frame: 'close', push: [HV(1.3, 1.2), HV(1.42, 1.28)], id: 'not-relevant' }));
  on(['s52'], 'talk', () => TH.talk(s.s52, { frame: 'mid', id: 'stop' }));
  on(['s53'], 'talk', () => TH.talk(s.s53, { frame: 'close', push: [HV(1.2, 1.1), HV(1.3, 1.16)], id: 'evening-talk' }));
  on(['s53'], 'late', () => SHORT && TH.ots(s.s53, { id: 'evening', draw: RP.head({ lines: 'Ten minutes to save\na *whole evening*', at: T0(s.s53) }) }));
  on(['s54'], 'talk', () => TH.talk(s.s54, { frame: 'wide', punch: ['five hours'], id: 'hours' }));
  /* 2026-11-16 (critic: sh04 talks 24 s with no picture): in a short, her "three hours, four hours, five hours" lands on the three passes, pass 3 (4-5 hours) lit */
  on(['s54'], 'late', () => SHORT && full(s.s54, RP.passes({ at: T0(s.s54) - 0.1, times: [T0(s.s54), T0(s.s54) + 0.2, T0(s.s54) + 0.4], on: 3, onAt: w('s54', 'three hours') }), { id: 'hours-passes' }));
  on(['s55'], 'talk', () => TH.talk(s.s55, { frame: 'mid', push: [HV(1.0, 1.06), HV(1.08, 1.1)], id: 'pass-one-enough' }));

  /* ---------- 3:52 pass two ---------- */
  on(['s56'], 'other', () => TH.split(s.s56, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'pass-two',
    draw: RP.page({ at: T0(s.s56), p: 2, focus: 'should take up to an hour', s: HV(1.05, 0.86), hl: [['should take up to an hour', w('s56', 'up to an hour')]], tab: [2, 64] }) }));
  on(['s57', 's58'], 'talk', () => TH.talk({ from: s.s57, to: s.s58 }, { frame: 'mid', push: [HV(1.12, 1.1), HV(1.22, 1.16)], id: 'more-care' }));

  on(['s59', 's60'], 'other', () => full({ from: s.s59, to: s.s60 }, RP.page({ at: T0(s.s59), p: 1, focus: 'make comments in the margins', s: HV(1.1, 0.92), fx: HV(0.5, 0.5),
    title: SHORT ? undefined : { lines: 'Notes in\nthe *margin*', side: 'left' }, credit: 'S. Keshav, “How to Read a Paper” (2007), section 2.2',
    hl: [['make comments in the margins', w('s60', 'comments')], ['the key point', w('s60', 'key point')]], notes: [{ s: 'key point!', x: 560, y: 640, z: 28, at: w('s60', 'margin'), rot: -6 }] }), { id: 'margin' }));
  on(['s61'], 'other', () => (SHORT ? full : (sp, d, o) => TH.room(sp, { at: 'print it out', her: 0.36, side: 'left', id: o.id, draw: d }))(s.s61, RP.photo({ key: 'px-8553916', at: T0(s.s61), lines: undefined, credit: 'Photo: Polina Tankilevitch / Pexels', fy: 0.55 }), { id: 'print' }));
  on(['s62'], 'other', () => TH.ots(s.s62, { side: 'auto', w: HV(760, undefined), id: 'figures',
    draw: RP.page({ at: T0(s.s62), p: 1, focus: 'Look carefully at the figures', s: HV(0.8, 0.86), hl: [['Look carefully at the figures', w('s62', 'figures')]], credit: false }) }));
  on(['s63', 's64'], 'other', () => fig({ from: s.s63, to: s.s64 }, { id: 'another-paper', title: ['*Another* paper'], titleAt: 'and on the', below: 'Figure 2' }));
  on(['s65'], 'talk', () => TH.talk(s.s65, { frame: 'wide', push: [HV(1.0, 1.06), HV(1.1, 1.12)], id: 'explain' }));

  on(['s66'], 'talk', () => TH.talk(s.s66, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'aside' }));

  /* ---------- 5:01 pass three ---------- */
  on(['s67', 's68'], 'other', () => TH.room({ from: s.s67, to: s.s68 }, { at: 'third pass', her: HV(0.38, 0.46), side: HV('right', 'bottom'), id: 'pass-three', draw: RP.passes({ at: w('s67', 'third pass') - 0.1, on: 3, onAt: w('s68', 'thesis') }) }));
  on(['s69'], 'other', () => TH.split(s.s69, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 're-implement',
    draw: RP.page({ at: T0(s.s69), p: 2, focus: 're-implement the paper', s: HV(1.05, 0.86), hl: [['re-implement the paper', w('s69', 're-implement')]], tab: [3, 252] }) }));
  on(['s70'], 'talk', () => TH.talk(s.s70, { frame: 'mid', id: 'same-assumptions' }));

  on(['s71', 's74'], 'other', () => full({ from: s.s71, to: s.s74 }, RP.compare({ at: T0(s.s71), bAt: w('s71', 'imagining'),
    rows: [{ q: '', a: 'who they recruited', b: 'who I would recruit', at: w('s72', 'recruit') }, { q: '', a: 'what they asked', b: 'what I would ask', at: w('s73', 'ask') },
      { q: '', a: 'what they measured', b: 'what I would measure', at: w('s74', 'measure') }] }), { id: 'compare' }));
  on(['s75'], 'talk', () => TH.talk(s.s75, { frame: 'close', punch: ['idea'], id: 'weak-spot-talk' }));
  on(['s75'], 'late', () => SHORT && TH.split(s.s75, { her: 0.5, side: 'bottom', id: 'weak-spot', draw: RP.head({ lines: 'Every difference:\na *weak spot*\nor an *idea*', at: T0(s.s75) }) }));
  on(['s76', 's77'], 'other', () => TH.split({ from: s.s76, to: s.s77 }, { her: HV(0.42, 0.46), side: HV('right', 'bottom'), id: 'hours-beginners',
    draw: RP.page({ at: T0(s.s76), p: 2, focus: 'four or five hours for beginners', s: HV(1.05, 0.86), hl: [['four or five hours for beginners', w('s77', 'five hours')], ['about an hour for an experienced reader', w('s77', 'experienced')]],
      notes: [] }) }));
  on(['s78'], 'talk', () => TH.talk(s.s78, { frame: 'close', push: [HV(1.3, 1.2), HV(1.4, 1.26)], id: 'higher-side' }));

  on(['s79', 's80'], 'other', () => fig({ from: s.s79, to: s.s80 }, { id: 'deep-dive', title: ['The *deep dive*'], titleAt: 'but of course', below: 'Figure 2' }));

  /* ---------- 6:16 is it any good? ---------- */

  on(['s81'], 'other', () => TH.talk(s.s81, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'critically' }));
  on(['s82'], 'other', () => TH.ots(s.s82, { side: 'auto', w: HV(700, undefined), id: 'three-checks',
    draw: RP.list({ at: T0(s.s82), title: 'Three checks', items: [{ s: 'sample size', at: w('s82', 'three things') }, { s: 'method', at: w('s82', 'three things') + 0.2 }, { s: 'funding', at: w('s82', 'three things') + 0.4 }] }) }));
  on(['s83', 's85'], 'other', () => TH.ots({ from: s.s83, to: s.s85 }, { side: 'auto', w: HV(720, undefined), id: 'sample-size',
    draw: RP.head({ at: T0(s.s83), lines: 'Sample *size*', size: HV(120, 116) }) }));
  on(['s86'], 'talk', () => TH.talk(s.s86, { frame: 'mid', id: 'small-studies' }));
  on(['s87'], 'other', () => full(s.s87, RP.src('caine-abs', { at: w('s87', 'kelly caine') + 0.3, title: 'All papers at CHI 2014:\nmost common sample size *12*', hlAt: [w('s87', 'every paper') + 0.1, w('s87', 'most common'), w('s87', 'most common') + 0.12], credit: 'Kelly Caine, “Local Standards for Sample Size at CHI”, CHI 2016 (open.clemson.edu)' }), { id: 'caine' }));
  on(['s88'], 'other', () => full(s.s88, RP.twelve({ at: T0(s.s88), tallyAt: w('s88', '12 people'), note: 'can tell you how\npeople experience something', noteAt: w('s88', 'experience') }), { id: 'twelve' }));
  on(['s89'], 'other', () => TH.split(s.s89, { her: HV(0.42, 0.46), side: HV('right', 'bottom'), id: 'percentage',
    draw: RP.twelve({ at: T0(s.s89) - 0.3, tallyAt: T0(s.s89) - 0.6, note: 'can’t tell you what\npercentage of all students', noteAt: w('s89', 'percentage') }) }));
  on(['s90'], 'talk', () => TH.talk(s.s90, { frame: 'close', punch: ['claim'], id: 'claim-talk' }));
  on(['s90'], 'late', () => SHORT && TH.split(s.s90, { her: 0.5, side: 'bottom', id: 'claim', draw: RP.head({ lines: 'Does the number fit\nthe *size of the claim?*', at: T0(s.s90) }) }));
  on(['s91', 's92'], 'talk', () => TH.talk({ from: s.s91, to: s.s92 }, { frame: 'wide', push: [HV(1.0, 1.06), HV(1.1, 1.12)], id: 'method-check' }));

  on(['s93', 's98'], 'other', () => TH.room({ from: s.s93, to: s.s98 }, { at: 'claims', her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'questions', ground: 'rpDesk', inset: 0,
    draw: RP.trio({ items: [{ key: 'px-5831256', at: w('s93', 'switching') - 0.1 }, { key: 'px-9064799', at: w('s94', 'survey') - 0.2 }, { key: 'px-19961775', at: w('s96', 'heart') - 0.2 }] }) }));
  on(['s99'], 'other', () => full([w('s99', 'nurses') - 0.6, s.s99.e + 0.45], RP.photo({ key: 'px-6129151', at: w('s99', 'nurses') - 0.6, lines: undefined, credit: 'Photo: RDNE Stock project / Pexels', fy: 0.4 }), { id: 'nurses' }));
  on(['s99'], 'other', () => TH.talk([T0(s.s99), w('s99', 'nurses') - 0.6], { frame: 'mid', id: 'students' }));
  on(['s100'], 'card', () => RP.card(s.s100, ['Who ~funded~ it?'], { id: 'funded-card' }));
  on(['s101'], 'other', () => TH.ots(s.s101, { side: 'auto', w: HV(720, undefined), id: 'look-for',
    draw: RP.list({ at: T0(s.s101), title: 'Look for', items: [{ s: 'a funding section', at: w('s101', 'funding section') }, { s: 'acknowledgements', at: w('s101', 'acknowledgement') }, { s: 'a conflict of interest', at: w('s101', 'conflict') }] }) }));
  on(['s102'], 'talk', () => TH.talk(s.s102, { frame: 'close', push: [HV(1.3, 1.2), HV(1.38, 1.26)], id: 'not-wrong' }));
  on(['s103'], 'other', () => full([T0(s.s103), w('s103', 'they found') - 0.1], RP.src('pubmed-title', { at: w('s103', 'cochrane') - 0.2, hlAt: [w('s103', 'drug and medical')] }), { id: 'cochrane' }));
  on(['s103'], 'other', () => full([w('s103', 'they found') - 0.1, s.s103.e + 0.4], RP.src('pubmed-conc', { at: w('s103', 'they found') - 0.1, hlAt: [w('s103', 'sponsored'), w('s103', 'more likely')] }), { id: 'sponsored' }));
  on(['s104'], 'talk', () => TH.talk(s.s104, { frame: 'mid', id: 'attention' }));


  /* ---------- 8:04 notes, Zotero, still confusing ---------- */
  on(['s105', 's108'], 'other', () => fig({ from: s.s105, to: s.s108 }, { id: 'keep-notes', title: ['*Notes*'], titleAt: 'how do you keep', below: 'Figure 2' }));
  on(['s109', 's111'], 'other', () => full({ from: s.s109, to: s.s111 }, RP.photo({ key: 'px-6958526', at: T0(s.s109), lines: undefined, credit: 'Photo: kaboompics.com / Pexels' }), { id: 'print-major' }));
  on(['s112'], 'talk', () => TH.talk(s.s112, { frame: 'mid', punch: ['remember'], id: 'write-down' }));

  on(['s113', 's114'], 'other', () => full([w('s113', 'zotero') - 0.3, s.s114.e + 0.45], RP.src('zotero', { at: w('s113', 'zotero') - 0.1, dark: true, hlAt: [w('s114', 'free'), w('s115', 'notes')] }), { id: 'zotero' }));
  on(['s115'], 'other', () => full(s.s115, RP.reader({ at: T0(s.s115), hlAt: [w('s115', 'highlights'), w('s115', 'highlights') + 0.4, w('s115', 'write')], noteAt: w('s115', 'highlights') + 0.3, credit: 'A PDF with highlights and notes' }), { id: 'reader' }));
  on(['s116'], 'talk', () => TH.talk(s.s116, { frame: 'wide', push: [HV(1.0, 1.06), HV(1.1, 1.12)], id: 'still-lost' }));
  const tips = (a, b, c) => [{ s: 'Look up\nthe terms', at: a }, { s: 'Read a\n*survey paper*', at: b }, { s: 'Ask AI,\nthen *check it*', at: c }];
  on(['s117', 's119'], 'other', () => TH.room({ from: s.s117, to: s.s119 }, { at: 'look up', her: HV(0.42, 0.46), side: HV('left', 'bottom'), id: 'tips',
    draw: RP.notes({ items: tips(w('s117', 'look up'), w('s118', 'survey paper'), 1e9).slice(0, 2) }) }));
  on(['s120', 's123'], 'other', () => full({ from: s.s120, to: s.s123 }, RP.notes({ items: tips(T0(s.s120) - 0.3, T0(s.s120) - 0.3, w('s120', 'ai')) }), { id: 'tips-ai' }));
  on(['s124'], 'talk', () => TH.talk(s.s124, { frame: 'mid', id: 'thats-it' }));

  if (FX) FX.fill();
  if (FX) FX.restore();
  if (SHORT && FOOT.dur) TH.segs.forEach(sg => { if (sg.t1 > FOOT.dur) sg.t1 = FOOT.dur; });   // 2026-11-13: no graphic runs on into the ending (outroCard)
  TH.talk = talk0; TH.tile = tile0; TH.ots = ots0; TH.split = split0;
  return s;
}

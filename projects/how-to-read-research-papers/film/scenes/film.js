/* how-to-read-research-papers MOTION FILM (her pick A · The Margin): pure motion on her cleaned voice. The same sentences as
 * the talking-head plan (RP_SENT, talking-head/moments/sent.js) and the same graphics (scenes/rp.js), each full frame;
 * where the edit shows her face, the film sets her words as type. Keshav's real page is the running object; a page turn
 * opens each chapter, the rest are hard cuts on her words. The Caine slip is corrected on screen (the line retyped with
 * "at CHI 2014" in blue pen, over the real abstract). 16:9 + 9:16 from the same code. */
'use strict';
function buildFilm() {
  const s = {}; for (const [k, q] of Object.entries(RP_SENT)) { try { s[k] = P(q); } catch (e) { console.warn('film: phrase not found', k); } }
  const T0 = (ph) => ph.t - 0.12; const w = (k, x) => WT(s[k], x); const K = RP.KS;
  const Q = (id, k, lines, o = {}) => FS(id, T0(s[k]), o.ground || 'rpDesk', quote({ at: T0(s[k]) + 0.05, lines, ...o }), o);
  const Pg = (id, k, o, fo = {}) => FS(id, T0(s[k]), 'rpDesk', RP.page({ at: T0(s[k]), ...o }), fo);
  const TURN = { turn: true };
  const ABS = [231, 241, 252, 262, 272].map(y => [52, y, 294]);

  /* ---------- 0:00 not a novel ---------- */
  FS('open', 0, 'rpDesk', RP.page({ at: 0.05, p: 1, focus: [176, 250], s: V(0.95, 0.72), title: { lines: 'How to read a\n*research paper*', side: V('left', 'top') },
    hlpt: ABS.map((b, i) => [...b, w('s0', 'written') + i * 0.16]), cross: ['Abstract', w('s0', 'novel')], crossBox: [58 * K, 224 * K, 238 * K, 56 * K],
    notes: [{ s: 'not a novel.', x: 120, y: 318, z: 30, at: w('s0', 'novel') + 0.3, rot: -5 }] }));
  Q('order', 's1', 'The parts of a paper,\nand the *order*', { hand: 'what to read first', handAt: w('s1', 'order') });
  FS('three-pass', T0(s.s2), 'rpDesk', RP.passes({ at: T0(s.s2), times: [w('s2', 'three-pass'), w('s2', 'three-pass') + 0.25, w('s2', 'three-pass') + 0.5], title: 'The\n*three-pass*\nmethod' }));

  /* ---------- the parts ---------- */
  Q('same-parts', 's4', 'Most papers share\nthe *same parts*', { hand: 'know what each part is for', handAt: w('s5', 'what each part'), ...TURN });
  FS('imrad', T0(s.s6), 'rpDesk', RP.parts({ at: T0(s.s6), title: 'A pattern\ncalled *IMRAD*',
    items: [{ s: 'Title', at: w('s8', 'title') }, { s: 'Abstract', at: w('s8', 'abstract') }, { s: 'Introduction', at: w('s7', 'introduction') }, { s: 'Related work', at: w('s8', 'related') },
      { s: 'Methods', at: w('s7', 'methods') }, { s: 'Results', at: w('s7', 'results') }, { s: 'Discussion', at: w('s7', 'discussion') }, { s: 'Limitations', at: w('s8', 'limitation') },
      { s: 'Conclusion', at: w('s8', 'conclusion') }, { s: 'References', at: w('s8', 'references') }], main: [1, 4, 6], mainAt: [w('s13', 'abstract'), w('s17', 'method'), w('s20', 'discussion')] }));
  Q('findings', 's9', 'In HCI, results\nare called *findings*', { size: V(120, 96) });
  Q('not-every-part', 's11', 'You don’t need to read\n*every part* closely', { size: V(120, 96) });
  Q('three-parts', 's12', 'Three parts do\n*most of the work*', { ground: 'rpInk' });
  Pg('abstract', 's13', { p: 1, focus: [176, 252], s: V(1.0, 0.8), title: { lines: 'One: the\n*abstract*', side: V('left', 'top') }, hlpt: ABS.map((b, i) => [...b, w('s14', 'short paragraph') + i * 0.13]),
    notes: [{ s: 'the whole paper\nin one paragraph', x: 60, y: 304, z: 27, at: w('s15', 'squeezed'), rot: -4 }], tab: [1, 214] });
  FS('method', T0(s.s17), 'rpDesk', RP.list({ at: T0(s.s17), title: 'Two: the *method*', items: [{ s: 'what they did', at: w('s18', 'exactly') }, { s: 'who took part', at: w('s18', 'who took') }, { s: 'how many people', at: w('s18', 'how many') }, { s: 'what they measured', at: w('s18', 'what they measure') }, { s: 'how they measured it', at: w('s18', 'how they measured') }] }));
  Q('trust', 's19', 'This tells you if you can\n*trust* everything else', { size: V(116, 92) });
  FS('discussion', T0(s.s20), 'rpDesk', RP.head({ at: T0(s.s20), lines: 'Three: discussion\n+ *limitations*', hand: 'what the results mean,\nwhat they can’t tell you', handAt: w('s22', 'cannot tell') }));
  Q('gap', 's24', 'The limitations show\nyour *research gap*', { hand: 'what is still open', handAt: w('s25', 'still open') });

  /* ---------- Keshav, three passes ---------- */
  Pg('keshav', 's26', { p: 1, focus: [306, 150], s: V(1.0, 0.8), fy: 0.42, hl: [['How to Read a Paper', w('s26', 'how to read')]], loops: [['S. Keshav', w('s27', 'keshav')]],
    notes: [{ s: 'two pages', x: 430, y: 60, z: 28, at: w('s26', 'two-page') + 0.2, rot: 3 }] }, TURN);
  FS('passes', T0(s.s28), 'rpDesk', RP.passes({ at: T0(s.s28), times: [w('s29', 'first pass'), w('s30', 'second'), w('s30', 'third')], title: 'Up to\n*three passes*' }));
  Pg('pass-one', 's31', { p: 1, focus: 'about five to ten minutes', s: V(1.0, 0.86), title: { lines: 'Pass one.\n*5–10 minutes*', side: V('left', 'top') }, hl: [['about five to ten minutes', w('s31', 'five to ten')]], tab: [1, 520] }, TURN);
  Pg('four-steps', 's32', { p: 1, focus: 'Read the section and sub-section headings', s: V(1.05, 0.9), fx: V(0.56, 0.5), title: { lines: 'Pass one:\n*the order*', side: V('left', 'top') }, credit: 'S. Keshav, “How to Read a Paper” (2007), section 2.1',
    ticks: [[76, 669, w('s33', 'title')], [76, 688, w('s34', 'section')], [76, 717, w('s35', 'conclusion')]],
    hl: [['Carefully read the title, abstract, and introduction', w('s33', 'carefully')], ['Read the section and sub-section headings', w('s34', 'section')], ['Read the conclusions', w('s35', 'conclusion')], ['Glance over the references', w('s35', 'glance') + 0.65]],
    move: [{ at: w('s35', 'glance') - 0.1, focus: 'Glance over the references' }], notes: [{ s: '↑ only these,\nin this order', x: 140, y: 745, z: 26, at: w('s34', 'ignore') }] });
  Q('tick-off', 's36', 'Tick off the ones\nyou’ve *already read*', { size: V(120, 96) });
  FS('book-video', T0(s.s37), 'rpDesk', RP.head({ at: T0(s.s37), lines: 'Like my video on\n*how to read a book*', hand: 'structure first', handAt: w('s37', 'structure') }));
  Q('five-questions', 's38', 'After pass one, answer\n*five questions*', { hand: 'Keshav calls them the five Cs', handAt: w('s38', 'five cs'), size: V(116, 92) });
  FS('five-cs', T0(s.s40), 'rpDesk', RP.fiveC({ at: T0(s.s40), times: [w('s40', 'category'), w('s44', 'context'), w('s48', 'correctness'), w('s49', 'contribution'), w('s50', 'clarity')] }));
  Q('not-relevant', 's51', 'Not relevant?\n*Stop here.*', { size: V(150, 120) });
  Q('evening', 's52', 'Ten minutes to save\na *whole evening*', { ground: 'rpInk' });
  Q('hours', 's54', 'Not three, four, five\n*hours* on the wrong paper', { size: V(112, 90) });
  FS('pass-one-enough', T0(s.s55), 'rpDesk', RP.passes({ at: T0(s.s55), on: 1, onAt: w('s55', 'enough'), title: 'Often, pass one\nis *enough*' }));

  /* ---------- pass two ---------- */
  Pg('pass-two', 's56', { p: 2, focus: 'should take up to an hour', s: V(1.0, 0.86), title: { lines: 'Pass two.\n*Up to an hour*', side: V('left', 'top') }, hl: [['should take up to an hour', w('s56', 'up to an hour')]], tab: [2, 64] }, TURN);
  Q('more-care', 's57', 'More care,\n*not the details*', { small: 'A long table of statistics can wait.', smallAt: w('s58', 'table') });
  Pg('margin', 's59', { p: 1, focus: 'make comments in the margins', s: V(1.1, 0.92), title: { lines: 'Notes in\nthe *margin*', side: V('left', 'top') }, credit: 'S. Keshav, “How to Read a Paper” (2007), section 2.2',
    hl: [['make comments in the margins', w('s60', 'comments')], ['the key point', w('s60', 'key point')]], notes: [{ s: 'key point!', x: 560, y: 640, z: 28, at: w('s60', 'margin'), rot: -6 }] });
  FS('print', T0(s.s61), 'rpDesk', RP.photo({ key: 'px-8553916', at: T0(s.s61), lines: 'Print it out\nso you can\n*mark it up*', hand: 'something I do now', handAt: w('s61', 'something'), credit: 'Photo: Polina Tankilevitch / Pexels', fy: 0.55 }));
  Pg('figures', 's62', { p: 1, focus: 'Look carefully at the figures', s: V(1.0, 0.86), title: { lines: 'Look at\nthe *figures*', side: V('left', 'top') }, hl: [['Look carefully at the figures', w('s62', 'figures')]] });
  Q('another', 's63', 'One good paper\nleads to *another*', { hand: 'mark the references you haven’t read', handAt: w('s63', 'mark') });
  Q('explain', 's65', 'Explain it to\n*someone else*', { size: V(140, 110) });
  FS('aside', T0(s.s66), 'rpDesk', RP.head({ at: T0(s.s66), lines: 'Still lost?\nPut it *aside*', hand: 'read some background, come back later', handAt: w('s66', 'background') }));

  /* ---------- pass three ---------- */
  FS('pass-three', T0(s.s67), 'rpDesk', RP.passes({ at: T0(s.s67), on: 3, onAt: w('s68', 'thesis'), title: 'Pass three:\nthe papers\n*your thesis*\nis built on' }), TURN);
  Pg('re-implement', 's69', { p: 2, focus: 're-implement the paper', s: V(1.0, 0.86), title: { lines: 'Re-create\n*the paper*', side: V('left', 'top') }, hl: [['re-implement the paper', w('s69', 're-implement')], ['making the same assumptions', w('s70', 'same assumptions')]], tab: [3, 252] });
  FS('compare', T0(s.s71), 'rpDesk', RP.compare({ at: T0(s.s70), bAt: w('s71', 'imagining'),
    rows: [{ q: 'Who would you recruit?', a: 'who they recruited', b: 'who I would recruit', at: w('s72', 'recruit') }, { q: 'What would you ask them?', a: 'what they asked', b: 'what I would ask', at: w('s73', 'ask') },
      { q: 'Would you measure the same thing?', a: 'what they measured', b: 'what I would measure', at: w('s74', 'measure'), diff: w('s75', 'different') }], foot: 'different = a weak spot, or an idea for you', footAt: w('s75', 'weak spot') }));
  Q('weak-spot', 's76', 'And the third pass\n*takes time*', { size: V(130, 100) });
  Pg('hours-beginners', 's77', { p: 2, focus: 'four or five hours for beginners', s: V(1.0, 0.86), title: { lines: '4–5 hours\n*for beginners*', side: V('left', 'top') }, hl: [['four or five hours for beginners', w('s77', 'five hours')], ['about an hour for an experienced reader', w('s77', 'experienced')]] });
  Q('higher-side', 's78', 'As a student, plan\nfor the *higher side*', { size: V(120, 96) });
  Q('deep-dive', 's79', 'Pass one and two\n*before* the deep dive', { hand: 'only if it’s relevant to your work', handAt: w('s79', 'relevant') });

  /* ---------- is it any good? ---------- */
  Q('published', 's81', 'Published doesn’t mean\n*right for your research*', { ground: 'rpInk', size: V(118, 88), ...TURN });
  FS('three-checks', T0(s.s82), 'rpDesk', RP.list({ at: T0(s.s82), title: 'Three checks', items: [{ s: 'sample size', at: w('s82', 'three things') }, { s: 'method', at: w('s82', 'three things') + 0.2 }, { s: 'funding', at: w('s82', 'three things') + 0.4 }] }));
  FS('sample-size', T0(s.s83), 'rpDesk', RP.head({ at: T0(s.s83), lines: 'Sample size:\n*how many?*', hand: 'bigger isn’t automatically better', handAt: w('s84', 'bigger') }));
  Q('small-studies', 's86', 'In HCI, small studies\nare *very common*', { size: V(120, 96) });
  FS('caine', T0(s.s87), 'rpDesk', RP.src('caine-abs', { at: T0(s.s87) + 0.2, title: 'All papers at CHI 2014:\nmost common sample size *12*', hlAt: [w('s87', 'every paper') + 0.1, w('s87', 'most common'), w('s87', 'most common') + 0.12], credit: 'Kelly Caine, “Local Standards for Sample Size at CHI”, CHI 2016 (open.clemson.edu)' }));
  FS('caine-fix', s.s87.e - 0.2, 'rpDesk', RP.fix({ at: s.s87.e - 0.2, penAt: s.s87.e + 0.5 }));
  FS('twelve', T0(s.s88) + 0.6, 'rpDesk', RP.twelve({ at: T0(s.s88) + 0.6, tallyAt: w('s88', '12 people') + 0.3, note: 'can tell you how\npeople experience something', noteAt: w('s88', 'experience') }));
  FS('percentage', T0(s.s89), 'rpDesk', RP.twelve({ at: T0(s.s89) - 0.3, tallyAt: T0(s.s89) - 0.6, note: 'can’t tell you what\npercentage of all students', noteAt: w('s89', 'percentage') }));
  Q('claim', 's90', 'Does the number fit\nthe *size of the claim*?', { ground: 'rpInk', size: V(118, 92) });
  Q('match', 's91', 'Does the method\n*match the question*?', { size: V(128, 100) });
  FS('questions', T0(s.s93), 'rpDesk', RP.list({ at: T0(s.s93), title: '“Switching apps\nstresses people”', items: [{ s: 'a survey?', at: w('s94', 'survey') }, { s: 'watched people work?', at: w('s95', 'watch') }, { s: 'time or heart rate?', at: w('s96', 'heart') }, { s: 'a lab or their office?', at: w('s97', 'lab') }, { s: 'who took part?', at: w('s98', 'participants') }] }));
  FS('nurses', T0(s.s99), 'rpDesk', RP.photo({ key: 'px-6129151', at: w('s99', 'nurses') - 0.8, lines: 'Students are\nnot *nurses on\na night shift*', credit: 'Photo: RDNE Stock project / Pexels', fy: 0.4 }));
  Q('funded', 's100', 'Who *funded* it?', { ground: 'rpInk', size: V(170, 130) });
  FS('look-for', T0(s.s101), 'rpDesk', RP.list({ at: T0(s.s101), title: 'Look for', items: [{ s: 'a funding section', at: w('s101', 'funding section') }, { s: 'acknowledgements', at: w('s101', 'acknowledgement') }, { s: 'a conflict of interest', at: w('s101', 'conflict') }] }));
  Q('not-wrong', 's102', 'Funding doesn’t make\na study *wrong*', { size: V(128, 100) });
  FS('cochrane', T0(s.s103), 'rpDesk', RP.src('pubmed-title', { at: T0(s.s103) + 0.2, title: 'A Cochrane review, *2017*', hlAt: [w('s103', 'drug and medical')] }));
  FS('sponsored', w('s103', 'they found') - 0.1, 'rpDesk', RP.src('pubmed-conc', { at: w('s103', 'they found') - 0.1, title: 'Sponsored studies:\n*more favourable* results', hlAt: [w('s103', 'sponsored'), w('s103', 'more likely')] }));
  Q('attention', 's104', 'When the funder benefits,\npay *more attention*', { size: V(116, 92) });

  /* ---------- notes, Zotero, still lost ---------- */
  Q('notes', 's105', 'How do you keep\n*notes*?', { size: V(150, 120), hand: 'on paper or digitally', handAt: w('s108', 'digitally'), ...TURN });
  FS('print-major', T0(s.s109), 'rpDesk', RP.photo({ key: 'px-6958526', at: T0(s.s109), lines: 'I print the\npapers that are\n*major for me*', hand: 'or read digitally,\nwhichever works for you', handAt: w('s111', 'digitally'), credit: 'Photo: kaboompics.com / Pexels' }));
  Q('write-down', 's112', 'Write it down, or\nyou *won’t remember*', { size: V(128, 100) });
  FS('zotero', T0(s.s113), 'rpDesk', RP.src('zotero', { at: T0(s.s113), dark: true, title: '*Zotero*: free and\nopen source', hlAt: [w('s114', 'free'), w('s115', 'notes')] }));
  FS('reader', T0(s.s115), 'rpDesk', RP.reader({ at: T0(s.s115), hlAt: [w('s115', 'highlights'), w('s115', 'highlights') + 0.4, w('s115', 'write')], noteAt: w('s115', 'write notes'), credit: 'A PDF with highlights and notes' }));
  Q('still-lost', 's116', 'Still doesn’t\n*make sense*?', { size: V(150, 120), ...TURN });
  FS('tips', T0(s.s117), 'rpDesk', RP.notes({ items: [{ s: 'Look up\nthe terms', sub: 'the ones you don’t know', at: w('s117', 'look up') }, { s: 'Read a\n*survey paper*', sub: 'it reviews the research', at: w('s118', 'survey paper') }, { s: 'Ask AI,\nthen *check it*', sub: 'against the paper itself', at: w('s120', 'ai'), subAt: w('s122', 'check') }] }));
  Q('next', 's124', 'Next: how to read\n*a book*', { hand: 'link in the description', handAt: s.s124.e + 0.4 });
}

/* working-full-time: the MOTION FILM (her whole narration, tightened: film/data/cutlist.json), pure motion graphics in her pick
 * B · CLOCK IN / CLOCK OUT with A's 24-hour dial for "the same one 24 hours" (scenes/wfkit.js). One scene per sentence of hers
 * (scenes/wfsent.js); a sentence with a diagram gets the diagram (the same ones as the talking-head edit, full frame), the
 * others are her words as kinetic type on the wall, on black phrase cards or on a manila card. Receipts (real pages) land on
 * her words; the 45 ECTS slip gets the correction screen. Every frame is a pure function of time. */
'use strict';
function buildFilm() {
  WF.q = [];
  const s = {}; for (const [k, q] of Object.entries(WF_SENT)) s[k] = P(q);
  const T0 = (ph) => ph.t - 0.12;
  const w = (k, word) => WT(s[k], word);
  const R = () => ({ x: 0, y: 0, w: W, h: H });
  let n = 0;
  /** one scene: id, start, ground key, draw(t, r) factory; a slow push keeps it alive (never a dead hold) */
  const scene = (id, start, ground, draw, o = {}) => addScene(start, ground, id, (t) => {
    const k = 1 + 0.025 * E.inOutCubic(prog(t, start, Math.max(1, o.dur || 6)));
    WF.T0 = start; withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, R())); WF.T0 = null;
  }, { id });
  const VAR = [['wfWall', 'left'], ['wfBlack', 'left'], ['wfWall', 'card'], ['wfBlack', 'left'], ['wfCard', 'left']];
  const say = (k, o = {}) => { const v = VAR[n++ % VAR.length]; const d = WF.say(s[k], { variant: v[1], ground: o.ground || v[0], ...o });
    // every other type scene carries the punch clock: its hands run through her day across the film (9:00 -> 23:00), never still
    const withClock = v[1] === 'left' && !o.noClock;
    return scene(k, T0(s[k]), o.ground || v[0], withClock ? (t, r) => { d(t, PORTRAIT ? { x: r.x, y: r.y, w: r.w, h: r.h * 0.62 } : { x: r.x, y: r.y, w: r.w * 0.66, h: r.h });
      if (PORTRAIT) rect(r.x, r.y + r.h * 0.62, r.w, r.h * 0.38, (G[o.ground || v[0]] || G.wfWall).bg);
      const hrs = 9 + 14 * clamp(t / TOTAL); const a = wfE(t, T0(s[k]), 0.4);
      withA(a, () => grp('clock', V(r.w * 0.83, r.w / 2) - V(230, 200), V(r.h / 2, r.h * 0.76) - V(230, 200), V(460, 400), V(460, 400), () => WF.clockFace(V(r.w * 0.83, r.w / 2), V(r.h / 2, r.h * 0.76), V(200, 180), hrs))); } : d, o); };
  /** a sentence whose diagram lands late: her words as kinetic type first, the diagram from at (a new scene: a hard cut on her word) */
  const sayThen = (k, at, ground, draw) => { say(k); scene(k + '-g', at - 0.12, ground, draw); };
  const tip = (k, num, lines, at) => scene(k, T0(s[k]), 'wfWall', WF.tip({ n: num, lines, at: T0(s[k]) + 0.2, wordsAt: Math.min(at == null ? 1e9 : at, T0(s[k]) + 0.8) }));
  const cue = (role, t, db = -2) => { if (t != null && isFinite(t)) sfx(role, t, db); };

  /* ---------- 0:00 a full-time job + a full-time master's ---------- */
  scene('open', 0, 'wfWall', (t, r) => {
    const x = V(110, 80); const ph = s.s0;
    WF.words(t, 'FULL-TIME JOB', x, V(380, 520), V(170, 150), WF.manila, { times: [WT(ph, 'full-time job'), WT(ph, 'job')], key: 'o1' });
    WF.words(t, '+ FULL-TIME', x, V(540, 670), V(170, 150), WF.manila, { times: [WT(ph, "master's") - 0.3, WT(ph, "master's") - 0.3], key: 'o2' });
    WF.words(t, "MASTER'S", x, V(700, 820), V(170, 150), WF.red, { times: [WT(ph, "master's")], key: 'o3' });
    withA(wfE(t, WT(ph, 'estonia'), 0.4), () => txt('A developer in Estonia, doing both.', x, V(790, 900), FW(V(40, 40)), WF.mid, 'left', 'alphabetic', 0, 'o4'));
    WF.card({ at: 0.3, rows: { MON: WF_WEEK.MON }, times: { MON: [WT(ph, 'job'), WT(ph, 'job') + 0.25, WT(ph, "master's"), WT(ph, "master's") + 0.25] }, hiRow: 'MON', w: V(700, 760),
      extra: [{ at: w('s1', 'since'), s: 'SINCE OCT 2025', x: 470, y: 850, size: 62, rot: -0.1 }] })(t, PORTRAIT ? { x: 0, y: 960, w: W, h: 960 } : { x: 960, y: 0, w: 960, h: H });
  });
  cue('stamp', w('s0', 'job'), -1); cue('stamp', w('s0', "master's"), -2); cue('stamp', w('s1', 'since'), 0);
  say('s2');
  scene('s3a', T0(s.s3a), 'wfWall', WF.list({ kicker: 'IN THIS VIDEO', items: [{ s: 'HOW I DO BOTH', at: w('s3a', 'how i do') }, { s: 'HOW I PLAN MY WEEK', at: w('s3a', 'how i plan') }, { s: 'SOME TIPS', at: w('s3a', 'some tips') }] }));
  say('s3b', { ground: 'wfBlack' });
  say('s3c', { kicker: 'FROM MY LIFE AND FROM RESEARCH' });
  sayThen('s3d', w('s3d', 'confirming'), 'wfWall', WF.type({ kicker: 'FIRST, BEFORE ANY TIP', lines: [{ s: 'CAN INTERNATIONAL', at: w('s3d', 'international students can') }, { s: 'STUDENTS WORK', at: w('s3d', 'students can work') }, { s: 'WHERE YOU STUDY?', at: w('s3d', "where you're studying"), red: [3] }] }));

  /* ---------- 0:31 the rules (receipts) ---------- */
  scene('s4a', T0(s.s4a), 'wfWall', WF.clip('sie-hours', { t0: T0(s.s4a), hl: w('s4a', 'no limit'), title: ['HOURS YOU CAN WORK'], titleAt: T0(s.s4a) + 0.2, align: 'center', valign: 'center', stamp: { s: 'NOT LIMITED', at: w('s4a', 'limit'), fx: 0.62, size: V(110, 96) } }));
  cue('marker', w('s4a', 'no limit')); cue('stamp', w('s4a', 'limit'), 0);
  scene('s4b', T0(s.s4b), 'wfWall', WF.type({ kicker: 'WHAT THEY LOOK AT', lines: [{ s: 'ARE YOU KEEPING UP', at: w('s4b', 'keeping') }, { s: 'WITH YOUR STUDIES?', at: w('s4b', 'with your studies'), red: [2] }] }));
  say('s4c', { ground: 'wfBlack' });
  scene('s5', T0(s.s5), 'wfWall', WF.clip('sie-ects', { t0: T0(s.s5), hl: w('s5', 'around 30'), title: ['FULL-TIME STUDENT', 'IN ESTONIA'], titleAt: w('s5', 'full-time'), titleRed: [null, [1]], align: 'center', stamp: { s: '~30 ECTS A SEMESTER', at: w('s5', 'ects'), fx: 0.5, dy: V(130, 140), size: V(86, 76) } }));
  cue('marker', w('s5', 'around 30')); cue('stamp', w('s5', 'ects'), -2);
  scene('s6', T0(s.s6), 'wfWall', WF.stat({ big: '45 ECTS', small: 'after your first year', kicker: 'TO STAY FULL-TIME', at: w('s6', '45') - 0.1, smallAt: w('s6', 'after your') - 0.1 }));
  cue('stamp', w('s6', '45') - 0.1, -2);
  scene('fix-45', T0(s.s7), 'wfCard', WF.fix({ at: T0(s.s7), lines: ["THE 45 ECTS RULE IS ESTONIA'S:", 'BY THE END OF EACH STUDY YEAR.'], linesP: ['THE 45 ECTS RULE', "IS ESTONIA'S:", 'BY THE END OF', 'EACH STUDY YEAR.'],
    body: 'Your own school checks it in its own way. Read its study rules.', clip: 'tt-45', hl: w('s7', 'part-time') }));
  cue('paper', T0(s.s7) + 0.05, -2); cue('marker', w('s7', 'part-time'), -4);
  scene('s7b', w('s7', 'falling') - 0.1, 'wfWall', WF.clip('tt-cancel', { t0: w('s7', 'falling') - 0.1, hl: w('s7', 'permits') - 0.2, title: ['FALL TO PART-TIME', 'AND YOUR PERMIT'], titleAt: w('s7', 'falling'), titleRed: [null, [3]], align: 'center', stamp: { s: 'CANCELED', at: w('s7', 'revoked'), fx: 0.6, size: V(100, 90) } }));
  cue('stamp', w('s7', 'revoked'), 0);
  say('s8', { kicker: 'THIS VIDEO IS FOR YOU' });

  /* ---------- 1:15 it never stops ---------- */
  say('s9', { ground: 'wfBlack' });
  scene('s10', T0(s.s10), 'wfWall', WF.card({ at: T0(s.s10), side: 'center', hiRow: 'SAT', hiAt: w('s10', 'saturday'), rows: { MON: WF_WEEK.MON, TUE: WF_WEEK.TUE, WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI, SAT: ['', '', '10:00', '13:00'] },
    times: (() => { const mv = WORDS.slice(s.s10.i, s.s10.i + s.s10.w.length).map((x, k) => (x.n === 'moving' ? s.s10.w[k] : null)).filter(x => x != null);
      const at = [w('s10', 'monday'), mv[0], mv[1], mv[2], w('s10', 'friday'), w('s10', 'saturday')]; const o = {}; DAYS.slice(0, 6).forEach((d, i) => { const a = at[i] || at[0]; o[d] = [a, a + 0.08, a + 0.16, a + 0.24]; }); return o; })() }));
  cue('stamp', w('s10', 'monday'), -3); cue('stamp', w('s10', 'friday'), -3); cue('stamp', w('s10', 'saturday'), 0);
  say('s11');
  say('s12a', { ground: 'wfBlack', kicker: 'WHEN I GOT MY JOB HERE' });
  scene('s12b', T0(s.s12b), 'wfWall', WF.type({ kicker: 'MY GOAL', kickerAt: T0(s.s12b), lines: [{ s: 'DO WORK SO WELL', at: w('s12b', 'do work') }, { s: 'THAT WORK DOES NOT KNOW', at: w('s12b', 'that work does') }, { s: 'SCHOOL EXISTS', at: w('s12b', 'school exists'), col: 'red' }] }));
  scene('s12c', T0(s.s12c), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'AND SCHOOL', at: w('s12c', 'and i wanted') }, { s: 'DOES NOT KNOW', at: w('s12c', 'school does not') }, { s: 'THAT WORK EXISTS', at: w('s12c', 'that work'), red: [1] }] }));
  say('s13'); say('s14', { ground: 'wfBlack' });

  /* ---------- 1:53 tip 1: your credits ---------- */
  tip('s15', 1, ['KNOW YOUR CREDITS', 'EVERY SEMESTER'], w('s15', 'understand'));
  scene('s16', T0(s.s16), 'wfWall', WF.outline({ at: T0(s.s16), rows: [{ k: 'CREDITS', v: '6 ECTS', at: w('s16', 'credits'), red: true }, { k: 'CLASSES', v: '', at: 1e9 }, { k: 'GRADED BY', v: '', at: 1e9 }, { k: 'EXAM', v: '', at: 1e9 }] }));
  scene('s17', T0(s.s17), 'wfWall', WF.list({ kicker: 'KNOW HOW MANY YOU NEED', items: [{ s: 'THIS SEMESTER', at: w('s17', 'this semester') }, { s: 'BY THE END OF THE YEAR', at: w('s17', 'end of the year') }] }));
  say('s18', { ground: 'wfBlack' });
  scene('s19', T0(s.s19), 'wfWall', WF.outline({ at: T0(s.s19), rows: [{ k: 'CREDITS', v: '6 ECTS', at: T0(s.s19) + 0.2 }, { k: 'ASSESSMENT', v: 'PROJECT + EXAM', at: w('s19', 'assess') }, { k: 'CLASSES', v: '', at: 1e9 }, { k: 'EXAM', v: '', at: 1e9 }] }));
  scene('s20', T0(s.s20), 'wfWall', WF.outline({ at: T0(s.s20) - 1, rows: [{ k: 'CREDITS', v: '6 ECTS', at: 0 }, { k: 'ASSESSMENT', v: 'PROJECT + EXAM', at: 0 }, { k: 'CLASSES', v: '2 A WEEK, EVENINGS', at: w('s20', 'hours of classes'), red: true }, { k: 'EXAM', v: 'JANUARY', at: 1e9 }] }));
  scene('s21', T0(s.s21), 'wfWall', WF.week({ at: T0(s.s21), kicker: 'GET THEM INTO YOUR CALENDAR',
    blocks: [{ d: 1, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: w('s21', 'every class') }, { d: 3, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: w('s21', 'every class') + 0.15 }, { d: 4, h0: 14, h1: 16, s: 'DEADLINE', kind: 'fixed', at: w('s21', 'every deadline') }, { d: 2, h0: 9, h1: 12, s: 'EXAM', kind: 'fixed', at: w('s21', 'exam dates') }],
    stamps: [{ s: 'AS SOON AS POSSIBLE', at: w('s21', 'as soon as'), fx: 0.62, fy: 0.86, size: V(84, 72) }] }));
  cue('stamp', w('s21', 'as soon as'), -1);
  scene('s22', T0(s.s22), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: "DON'T JUST WRITE", at: w('s22', "don't just") }, { s: 'CREDITS.', at: w('s22', 'credits'), col: 'red' }, { s: 'UNDERSTAND THEM.', at: w('s22', 'understand this'), size: V(110, 96) }] }));
  scene('s23', T0(s.s23), 'wfWall', WF.list({ kicker: 'WHAT EACH COURSE ASKS OF YOU', items: [{ s: 'IN SCHOOL TWO TIMES A WEEK', at: w('s23', 'two times') }, { s: 'IN SCHOOL ONCE EVERY WEEK', at: w('s23', 'once every week') }], stamp: { s: 'THEN CHOOSE', at: w('s23', 'choose your course'), size: V(84, 80) } }));
  cue('stamp', w('s23', 'choose your course'), -2);
  say('s24');
  scene('s24b', w('s24', 'elective courses where') - 0.15, 'wfCard', WF.type({ ground: 'wfCard', kicker: 'ELECTIVES', lines: [{ s: 'CLASS COMMITMENTS', at: w('s24', 'class commitments') }, { s: "THAT WON'T", at: w('s24', "won't") }, { s: 'OVERWHELM YOU', at: w('s24', 'overwhelm'), col: 'red' }] }));

  /* ---------- 3:00 tip 2: your whole degree ---------- */
  tip('s25', 2, ['PLAN YOUR', 'WHOLE DEGREE'], w('s25', 'plan your'));
  scene('s26', T0(s.s26), 'wfWall', WF.degree({ at: T0(s.s26), fills: [{ from: 0, to: 1, s: 'NON-THESIS CREDITS', at: w('s26', 'non-thesis') }] }));
  cue('paper', w('s26', 'non-thesis'), -3);
  say('s27', { ground: 'wfBlack' });
  scene('s28', T0(s.s28), 'wfWall', WF.degree({ at: T0(s.s28) - 0.3, fills: [{ from: 0, to: 1, s: 'NON-THESIS CREDITS', at: T0(s.s28) - 0.3 }, { from: 2, to: 3, s: 'THESIS', at: w('s28', 'thesis'), red: true, row: 1 }], stamps: [{ s: 'FOCUS', at: w('s28', 'focus'), fx: 0.75, fy: 0.15 }] }));
  cue('stamp', w('s28', 'focus'), -1);
  scene('s29', T0(s.s29), 'wfWall', WF.list({ kicker: 'BIG THINGS NEED MORE TIME', items: [{ s: 'YOUR THESIS', at: w('s29', 'your thesis') }, { s: 'YOUR PLACEMENT', at: w('s29', 'placement') }, { s: 'YOUR INTERNSHIP', at: w('s29', 'internship') }], stamp: { s: 'MORE TIME', at: w('s29', 'more time') } }));
  cue('stamp', w('s29', 'more time'), -1);
  say('s30', { ground: 'wfBlack' });
  scene('s31', T0(s.s31), 'wfWall', WF.type({ lines: [{ s: 'GIVE YOURSELF', at: w('s31', 'give yourself') }, { s: 'MORE BANDWIDTH', at: w('s31', 'bandwidth'), red: [1] }] }));
  scene('s32', T0(s.s32), 'wfWall', WF.weeks({ at: w('s32', 'six weeks'), at2: w('s32', 'eight weeks'), budgetAt: w('s32', '10 weeks'), guess: [6, 8], budget: 10, kicker: 'YOUR INTERNSHIP', guessText: '6 OR 8 WEEKS', budgetText: '10 WEEKS' }));
  cue('tick', w('s32', 'six weeks'), -4); cue('tick', w('s32', 'eight weeks'), -4); cue('stamp', w('s32', '10 weeks'), 0);
  scene('s33', T0(s.s33), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: "DON'T UNDERESTIMATE", at: w('s33', "don't") }, { s: 'THE TIME YOU NEED', at: w('s33', 'the time'), red: [1] }] }));

  /* ---------- 3:40 tip 3: block your week ---------- */
  tip('s34', 3, ['BLOCK', 'YOUR WEEK'], w('s34', 'block'));
  scene('s35', T0(s.s35), 'wfWall', WF.type({ lines: [{ s: 'START WITH THE THINGS', at: w('s35', 'start with') }, { s: 'THAT CANNOT MOVE', at: w('s35', 'cannot move'), red: [2, 3] }] }));
  scene('s36a', T0(s.s36a), 'wfWall', WF.list({ kicker: 'FIRST INTO THE CALENDAR', items: [{ s: 'YOUR CLASSES', at: w('s36a', 'your classes') }, { s: 'ASSIGNMENT DEADLINES', at: w('s36a', 'assignment') }, { s: 'MEETINGS AT WORK', at: w('s36a', 'your meetings') }], stamp: { s: 'CANNOT MOVE', at: w('s36a', 'meetings at work') + 0.6 } }));
  cue('stamp', w('s36a', 'meetings at work') + 0.6, 0);
  const cf = w('s36b', 'calendar first');
  scene('s36b', T0(s.s36b), 'wfWall', WF.week({ at: T0(s.s36b), kicker: 'THEN YOUR STUDY TIME GETS ITS OWN BLOCK',
    blocks: [0, 1, 2, 3, 4].map((d) => ({ d, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: cf + d * 0.08 })).concat([{ d: 0, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: cf + 0.5 }, { d: 2, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: cf + 0.6 }, { d: 3, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: cf + 0.7 },
      { d: 1, h0: 19, h1: 21, s: 'STUDY', kind: 'study', at: w('s36b', 'study time') }, { d: 5, h0: 10, h1: 13, s: 'STUDY', kind: 'study', at: w('s36b', 'its own block') }]) }));
  cue('paper', cf, -3); cue('stamp', w('s36b', 'study time'), -1);
  scene('s37', T0(s.s37), 'wfWall', WF.type({ kicker: 'NOT A LONG TO-DO LIST', kickerAt: w('s37', 'to-do'), lines: [{ s: 'GIVE EVERY PART', at: w('s37', 'give every') }, { s: 'OF YOUR DAY A JOB', at: w('s37', 'of your day'), red: [3, 4] }] }));
  scene('s38', T0(s.s38), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'TIME BLOCKING', at: w('s38', 'time'), red: [1], size: V(220, 170) }] }));
  scene('s39', T0(s.s39), 'wfWall', WF.photo({ img: 'px_lecture', cap: 'CLASSES IN THE EVENING', at: T0(s.s39) }));
  cue('focus', T0(s.s39) + 0.1, -3);
  scene('s40', T0(s.s40), 'wfWall', WF.card({ at: T0(s.s40), side: 'center', rows: { MON: WF_WEEK.MON, TUE: ['09:00', '17:00', '17:45', '20:00'], WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI },
    times: (() => { const a = w('s40', 'every evening'); const o = {}; ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => { o[d] = [T0(s.s40), T0(s.s40), a + i * 0.12, a + i * 0.12 + 0.06]; }); return o; })() }));
  cue('stamp', w('s40', 'every evening'), -2);
  scene('s41', T0(s.s41), 'wfWall', WF.list({ kicker: 'MY DAY', items: [{ s: 'MORNING: WORK', at: w('s41', 'in the morning') }, { s: 'AFTERNOON: WORK', at: w('s42', 'in the afternoon') }, { s: 'EVENING: CLASS', at: w('s42', 'work') + 0.3, red: true }] }));
  say('s43a', { ground: 'wfBlack' });
  scene('s43b', T0(s.s43b), 'wfWall', WF.week({ at: T0(s.s43b) - 0.2, kicker: 'A BLOCK FOR STUDYING',
    blocks: [0, 1, 2, 3, 4].map((d) => ({ d, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 })).concat([{ d: 3, h0: 17.75, h1: 20, kind: 'class', s: 'CLASS', at: T0(s.s43b) - 0.2 }, { d: 1, h0: 19, h1: 21, kind: 'study', s: 'READ 2 PAPERS\nFOR THURSDAY', at: w('s43b', 'tuesday') }]),
    stamps: [{ s: 'TUE 7 TO 9 PM', at: w('s43b', '7 to 9'), fx: 0.6, fy: 0.8, size: V(90, 80) }] }));
  cue('stamp', w('s43b', 'tuesday'), -1); cue('bell', w('s43b', 'papers'), -6);
  scene('s43c', T0(s.s43c), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'IF YOU ONLY STUDY', at: w('s43c', 'if you only') }, { s: 'WHEN YOU HAVE FREE TIME,', at: w('s43c', 'when you have'), red: [3, 4] }, { s: "YOU WON'T STUDY", at: w('s43c', "you won't") }] }));
  say('s43d');

  /* ---------- 4:38 tip 4: use class time ---------- */
  tip('s43e', 4, ['GET THE MOST', 'OUT OF CLASS'], w('s43e', 'get as much'));
  say('s43f', { ground: 'wfBlack' });
  scene('s43g', T0(s.s43g), 'wfWall', WF.card({ at: T0(s.s43g), side: 'center', rows: { MON: ['09:00', '17:00', '17:45', '20:00'] }, times: { MON: [T0(s.s43g), w('s43g', 'tired from work'), w('s43g', 'go to class'), w('s44', '8 pm')] }, hiRow: 'MON', redCell: { row: 'MON', col: 3 },
    extra: [{ at: w('s43g', 'tired'), s: 'TIRED', x: 560, y: 820, size: 80, rot: -0.08 }] }));
  cue('stamp', w('s43g', 'tired'), -2);
  say('s44', { kicker: 'BUT IT REALLY WORKS' });
  scene('s45', T0(s.s45), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'LISTEN AND', at: w('s45', 'listen') }, { s: 'CONCENTRATE', at: w('s45', 'concentrate') }, { s: 'IN CLASS', at: w('s45', 'in class'), col: 'red' }] }));
  say('s46');
  scene('s47', T0(s.s47), 'wfWall', WF.type({ lines: [{ s: 'UNDERSTAND IT IN CLASS', at: w('s47', 'much understanding') }, { s: 'SO THE WORK AFTER CLASS', at: w('s47', 'whatever work') }, { s: 'IS NOT AS MUCH', at: w('s47', 'not as much'), red: [1, 2, 3] }] }));
  scene('s48', T0(s.s48), 'wfWall', WF.stat({ big: 'MORE TIME', small: 'outside of class to catch up', kicker: "IF YOU DON'T PAY ATTENTION", at: w('s48', 'more time') - 0.1, smallAt: T0(s.s48) + 0.3 }));
  cue('clock', w('s48', 'more time'), -3);

  /* ---------- 5:12 tip 5: one calendar (A's 24-hour dial) ---------- */
  tip('s49', 5, ['ONE CALENDAR', 'FOR WORK AND SCHOOL'], w('s49', 'same calendar'));
  scene('s50', T0(s.s50), 'wfWall', WF.dial({ at: w('s50', 'school calendar') - 0.2 }));
  cue('tick', w('s50', 'school calendar'), -2);
  scene('s51', T0(s.s51), 'wfWall', WF.list({ kicker: 'ALL IN THE SAME CALENDAR', items: [{ s: 'WORK DEADLINES', at: w('s51', 'your work deadlines') }, { s: 'SCHOOL DEADLINES', at: w('s51', 'your school deadlines') }, { s: 'COMMITMENTS', at: w('s51', 'commitments') }, { s: 'MEETINGS AT WORK', at: w('s51', 'any meetings') }] }));
  scene('s52', T0(s.s52), 'wfWall', WF.dial({ at: T0(s.s52) - 0.5, mergeAt: w('s52', 'but you have'), oneAt: w('s52', 'same one') }));
  cue('clock', w('s52', 'two different 24'), -3); cue('focus', w('s52', 'but you have'), -2); cue('stamp', w('s52', 'same one'), 0);
  say('s53', { ground: 'wfBlack', size: V(200, 150) });
  scene('s54', T0(s.s54), 'wfWall', WF.week({ at: T0(s.s54) - 0.1, kicker: 'SEE THE CLASH EARLY', blocks: [{ d: 2, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s54) - 0.1 }, { d: 2, h0: 17.75, h1: 20, kind: 'class', s: 'CLASS', at: T0(s.s54) - 0.1 }, { d: 2, h0: 16, h1: 19, kind: 'study', s: 'RELEASE', at: w('s54', 'clash') - 0.2 }], clash: { d: 2, h0: 16, h1: 20, at: w('s54', 'clash') } }));
  cue('marker', w('s54', 'clash'), -2);
  say('s55');
  scene('s56', T0(s.s56), 'wfWall', WF.type({ kicker: 'IF YOU KNOW', lines: [{ s: 'A BIG DEADLINE AT WORK', at: w('s56', 'big deadline') }, { s: 'SECOND WEEK OF NOVEMBER', at: w('s56', 'second week'), red: [3] }] }));
  cue('stamp', w('s56', 'second week'), -2);
  say('s57', { ground: 'wfBlack' }); say('s58');   // s59 (whisper could not read it) stays on s58's card
  scene('s60', T0(s.s60), 'wfWall', WF.list({ kicker: 'DECEMBER AT SCHOOL', items: [{ s: 'ROUNDING OFF MY COURSES', at: w('s60', 'rounding off') }, { s: 'PRESENTATIONS', at: w('s61', 'presentation') }, { s: 'CLEANING UP PROJECTS', at: w('s61', 'clean up') }] }));
  scene('s62', T0(s.s62), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'ALREADY THINKING', at: w('s62', 'already') }, { s: 'ABOUT DECEMBER', at: w('s62', 'december'), red: [1] }] }));
  say('s63'); say('s64', { ground: 'wfBlack' }); say('s65');
  scene('s66', T0(s.s66), 'wfWall', WF.type({ kicker: 'EVERY WEEK', lines: [{ s: 'WEEKLY REVIEW', at: w('s66', 'weekly review') }, { s: 'ON SUNDAYS', at: w('s66', 'sundays'), red: [1] }, { s: 'LAST WEEK  ·  NEXT WEEK', at: w('s66', 'last week'), col: 'mid', size: V(70, 64) }] }));
  say('s67', { ground: 'wfBlack' });
  scene('s68', T0(s.s68), 'wfWall', WF.list({ kicker: 'NEXT WEEK', items: [{ s: 'WORK: A RELEASE', at: w('s68', 'a release') }, { s: 'SCHOOL: AN EXAM DEADLINE', at: w('s68', 'exam deadline'), red: true }] }));
  scene('s69', T0(s.s69), 'wfWall', WF.week({ at: T0(s.s69) - 0.2, kicker: 'MOVE YOUR STUDY BLOCKS AROUND',
    blocks: [0, 1, 2, 3, 4].map((d) => ({ d, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s69) - 0.2 })).concat([{ d: 2, h0: 17, h1: 20, kind: 'fixed', s: 'RELEASE', at: T0(s.s69) - 0.2 }, { d: 2, h0: 19, h1: 21, kind: 'study', s: 'STUDY', at: T0(s.s69) - 0.2, move: { at: w('s69', 'move'), d: 5, h0: 10, h1: 12 } }]) }));
  cue('paper', w('s69', 'move'), -2);

  /* ---------- 6:31 tip 6: vacation days and study leave ---------- */
  tip('s70', 6, ['VACATION DAYS', 'AND STUDY LEAVE'], w('s70', 'vacation days'));
  say('s71', { ground: 'wfBlack' }); say('s72');
  scene('s73', T0(s.s73), 'wfWall', WF.type({ lines: [{ s: 'YOUR VACATION DAYS', at: w('s73', 'your vacation') }, { s: 'FOR SCHOOL STUFF', at: w('s73', 'for school'), red: [1, 2] }] }));
  scene('s74', T0(s.s74), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'DO NOT HOLD ON TO', at: w('s74', 'do not') }, { s: 'YOUR VACATION DAYS', at: w('s74', 'your vacation') }, { s: 'FOR VACATION ALONE', at: w('s74', 'for vacation'), red: [1, 2] }] }));
  scene('s75', T0(s.s75), 'wfCard', WF.type({ ground: 'wfCard', lines: [{ s: 'USE THEM FOR', at: w('s75', 'use it') }, { s: 'SCHOOL RESPONSIBILITIES', at: w('s75', 'school responsibilities'), red: [0] }] }));
  scene('s76', T0(s.s76), 'wfWall', WF.photo({ img: 'px_tallinn', cap: 'TALLINN, ESTONIA', at: w('s76', 'estonia') - 0.3, stamp: { s: 'STUDY LEAVE', at: w('s76', 'study leave') } }));
  cue('stamp', w('s76', 'study leave'), -1);
  scene('s77', T0(s.s77), 'wfWall', WF.clip('rt13-30', { t0: T0(s.s77) - 0.1, hls: [w('s77', '30 calendar'), w('s77', '20 of those'), null], title: ['STUDY LEAVE IN ESTONIA'], titleAt: T0(s.s77), align: 'center', stamp: { s: '30 DAYS, 20 PAID', at: w('s77', 'paid'), fx: 0.7, dy: V(130, 190), size: V(96, 84) } }));
  cue('marker', w('s77', '30 calendar')); cue('marker', w('s77', '20 of those'), -3); cue('stamp', w('s77', 'paid'), 0);

  /* ---------- 7:20 tell people early ---------- */
  tip('s78', 7, ['LEARN TO', 'COMMUNICATE'], w('s78', 'learn to communicate'));
  sayThen('s79', w('s79', "don't let it"), 'wfWall', WF.type({ lines: [{ s: "DON'T LET IT CLASH", at: w('s79', "don't let it") }, { s: 'BEFORE YOU LET', at: w('s79', 'before you let') }, { s: 'PEOPLE KNOW', at: w('s79', 'people know'), col: 'red' }] }));
  say('s80', { ground: 'wfBlack' });
  scene('s81', T0(s.s81), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'BE VERY', at: w('s81', 'be very') }, { s: 'PROACTIVE', at: w('s81', 'proactive'), col: 'red', size: V(220, 170) }] }));
  scene('s82', T0(s.s82), 'wfWall', WF.list({ kicker: 'A CLASH IS COMING', items: [{ s: 'WRITE TO YOUR LECTURER', at: w('s82', 'write to your') }, { s: 'WRITE TO WORK', at: w('s82', 'write to work') }], stamp: { s: 'EARLIER', at: w('s82', 'earlier') } }));
  cue('stamp', w('s82', 'earlier'), -1);

  /* ---------- 7:53 the kind of job you have ---------- */
  tip('s83', 8, ['THE KIND OF JOB', 'YOU GET'], w('s83', 'kind of job'));
  scene('s84', T0(s.s84), 'wfWall', WF.photo({ img: 'px_laptop', cap: 'NOT AT THE OFFICE', at: T0(s.s84), stamp: { s: 'NO COMMUTE', at: w('s84', 'commute') } }));
  cue('stamp', w('s84', 'commute'), -2);
  scene('s85', T0(s.s85), 'wfWall', (t, r) => { rect(r.x, r.y, r.w, r.h, WF.wall); const ph = s.s85;
    WF.words(t, 'I WORK AROUND THE CLOCK', r.x + V(110, 80), r.y + V(300, 520), V(130, 104), WF.manila, { times: ph.w.slice(0, 5), red: [4], key: 'clk' });
    const hrs = 9 + 14 * wfE(t, ph.w[2], 3, 'inOutQuart'); WF.clockFace(r.x + r.w * V(0.7, 0.5), r.y + r.h * V(0.62, 0.62), V(200, 220), hrs); });
  cue('clock', w('s85', 'clock'), -2);
  say('s86', { ground: 'wfBlack' });
  scene('s87', T0(s.s87), 'wfWall', WF.type({ lines: [{ s: 'ADVANTAGES', at: w('s87', 'advantage') }, { s: 'AND', at: w('s87', 'and disadvantage'), col: 'mid', size: V(90, 80) }, { s: 'DISADVANTAGES', at: w('s87', 'disadvantage'), col: 'red' }] }));
  scene('s88', T0(s.s88), 'wfWall', WF.card({ at: T0(s.s88), title: 'FIXED HOURS', side: 'center', rows: { MON: ['09:00', '17:00', '', ''], TUE: ['09:00', '17:00', '', ''], WED: ['09:00', '17:00', '', ''], THU: ['09:00', '17:00', '', ''], FRI: ['09:00', '17:00', '', ''] },
    times: (() => { const a = w('s88', 'fixed hours'); const o = {}; ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => { o[d] = [a + i * 0.1, a + i * 0.1 + 0.05, 0, 0]; }); return o; })() }));
  cue('stamp', w('s88', 'fixed hours'), -2);
  say('s89', { ground: 'wfBlack' }); say('s90');
  scene('s91', T0(s.s91), 'wfWall', WF.card({ at: T0(s.s91), side: 'center', rows: { MON: WF_WEEK.MON, TUE: WF_WEEK.TUE, WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: ['09:00', '17:00', '', ''] },
    times: { FRI: [T0(s.s91), w('s91', 'clock out'), 0, 0] }, hiRow: 'FRI', hiAt: w('s91', 'clock out'), redCell: { row: 'FRI', col: 1 }, dimWork: true, dimAt: w('s91', 'forget about work'),
    extra: [{ at: w('s91', 'just focus') + 0.1, s: 'FOCUS', x: 560, y: 900, size: 84 }] }));
  cue('stamp', w('s91', 'clock out'), 0); cue('stamp', w('s91', 'just focus') + 0.1, -2);
  scene('s92', T0(s.s92), 'wfWall', WF.clockOut({ at: T0(s.s92) - 0.2, me: P('for me', { from: s.s92.i, peek: true }), L: P("i don't think that 5 pm is really when work ends for me", { from: s.s92.i, peek: true }) }));
  cue('marker', s.s92.w[5], -2); cue('clock', s.s93.w[1], -3); cue('stamp', s.s93.w[3], 0);

  /* ---------- 8:26 meal prep and sleep ---------- */
  tip('s94', 9, ['MEAL PREP'], w('s94', 'meal prepping'));
  scene('s95', T0(s.s95), 'wfWall', WF.photo({ img: 'px_mealprep', cap: 'MEAL PREP', at: T0(s.s95), stamp: { s: 'WILL SAVE YOUR LIFE', at: w('s95', 'save your life'), size: V(70, 64) } }));
  cue('stamp', w('s95', 'save your life'), -1);
  say('s96', { ground: 'wfBlack' });
  scene('s96b', w('s96', 'those four hours') - 0.15, 'wfWall', WF.stat({ big: '4 HOURS', small: 'food for the rest of the week', kicker: 'MEAL PREP', at: w('s96', 'four hours'), stamp: { s: 'A GOOD DEAL', at: w('s96', 'good deal'), fx: 0.62, fy: 0.3 } }));
  cue('stamp', w('s96', 'good deal'), -2);
  say('s97a');
  scene('s97b', T0(s.s97b), 'wfWall', WF.photo({ img: 'px_mealprep2', cap: 'NOT ON A WEDNESDAY AFTERNOON', at: T0(s.s97b) }));
  tip('s97c', 10, ['PROTECT', 'YOUR SLEEP'], w('s97c', 'protect'));
  say('s97d', { ground: 'wfBlack' });
  scene('s98', T0(s.s98), 'wfBlack', WF.type({ ground: 'wfBlack', lines: [{ s: 'YOUR HEALTH', at: w('s98', 'your health') }, { s: 'IS IMPORTANT', at: w('s98', 'important'), red: [1] }] }));
  say('s99'); say('s100', { ground: 'wfBlack' });
  scene('s101', T0(s.s101), 'wfWall', WF.type({ lines: [{ s: 'A SOLID', at: w('s101', 'a solid') }, { s: 'BEDTIME', at: w('s101', 'bedtime'), col: 'red', size: V(220, 170) }] }));
  scene('s102', T0(s.s102), 'wfWall', WF.type({ lines: [{ s: 'TWO BIG THINGS', at: w('s102', 'two big things') }, { s: 'AT THE SAME TIME', at: w('s102', 'same time'), red: [2, 3] }], kicker: 'NO PERFECT WORK-LIFE BALANCE', kickerAt: w('s102', 'perfect') }));
  scene('s103', T0(s.s103), 'wfWall', WF.card({ at: T0(s.s103) - 0.1, side: 'center', rows: { MON: WF_WEEK.MON, TUE: ['09:00', '17:00', '17:45', '20:00'], WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI, SAT: ['', '', '10:00', '13:00'] },
    extra: [{ at: w('s103', 'on top'), s: 'STILL ON TOP OF THINGS', x: 380, y: 930, size: 56, rot: -0.08 }] }), { dur: 8 });
  cue('stamp', w('s103', 'on top'), 0);
  for (const k of ['s15', 's25', 's34', 's43e', 's49', 's70', 's78', 's83', 's94', 's97c']) cue('stamp', T0(s[k]) + 0.55, -1);   // the tip number stamps
  WF.flush(-2);   // every card, row, line and block that lands gets its sound (wfkit WF.snd)

}

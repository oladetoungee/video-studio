/* Moment 04 (kit clips 5 + 6b), Blink look: data minimisation ("is this person free to marry? that's a yes or no"),
 * the column-lock fold, the minimal answer, then access levels. ~44 s. V(16:9, 9:16). Beats: ../MOMENTS.md. */
'use strict';

function buildMoment() {
  const k = PS({
    dm: 'data minimization',
    idea: 'so the idea of data minimization is that you expose the minimum amount of data required to answer the question being asked',
    ask: 'so if i ask the question is this person currently free to marry', yn: "that's a yes or no answer",
    req: 'answering that question does not require showing', when: 'when they got married', who: 'who they married', wdiv: 'when they divorced', court: 'which court granted it right',
    gh: 'like in the case of marrify in ghana for example', q: 'the question is is this person married',
    simple: 'so the answer is simple', ans: 'this person currently has an active marriage on record',
    nothing: 'nothing else', spouse: 'no name of spouse', dates: 'no dates', hist: 'no history',
    other: 'but of course another person could request another thing',
    lvl: 'and then i was thinking about access level', ind: 'maybe perhaps an individual could access a particular level of this data',
    org: 'and maybe there are certain organizations or institutions that can access more',
  });
  const [c1, c2] = cutTimes();
  const tIdea = k.idea.t - 0.1, tAsk = k.ask.t - 0.08, tReq = k.req.t - 0.1, tAns = k.simple.t - 0.06, tOther = k.other.w[3] - 0.1;
  const x = LX(), w = WX(), COLS = ['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status'];
  const TBL = 'Illustration: no real records';

  /* camera */
  camSplit(-1);
  camSplit(tIdea);
  camSplit(tAsk, { z: V(1.36, 0.82) });
  camSplit(tReq);
  camFull(c1, 1.28, 1.16); camPush(c1 + 0.05, 4.4, 1.42, 1.26);
  camSplit(tAns, { z: V(1.36, 0.8), fy: V(null, 0.28) });
  camSplit(tOther, { now: true });

  /* 1 · hook: free to marry? that's a yes or no (a searcher asks, a record answers) */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      bmono('Ghana just put marriage records online.', x, V(170, 1130), V(24, 26), { key: 'ctx', col: BL.grey });
      face(t, x + V(50, 56), V(290, 1250), V(52, 56), 201, { s: popS(t, -0.7), lx: 0.8 });
      bub(t, -0.7, x + V(120, 130), V(250, 1200), 'Is this person free to marry?', { size: V(40, 44), key: 'hook-q' });
      head(t, -0.8, V(['That’s a', '*yes or no.*'], ['That’s a *yes or no.*']), x, V(440, 1420), V(96, 88), { id: 'hook' });
      const by = V(620, 1470);
      bub(t, -0.7, x, by, 'Yes', { size: V(56, 60), weight: 600, key: 'yes' });
      bub(t, -0.65, x + V(280, 290), by, 'No', { size: V(56, 60), weight: 600, key: 'no' });
      critter('cert', BL.cobalt, V(x + 600, 820), V(880, 1630), V(170, 200), { s: popS(t, -0.6), open: blinkOpen(t, 202), lx: -0.6, ly: -0.6, key: 'answerer' });
      if (!PORTRAIT) bmono('Data minimisation', x, 900, 24, { col: BL.green, key: 'dmtag' });
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -6);

  /* 2 · split: data minimisation: expose the minimum (the table folds down to the one column the question needs) */
  bshot(tIdea, (t) => {
    wsplit(t, tIdea, () => {
      head(t, tIdea + 0.02, ['Data minimisation:', 'expose the *minimum.*'], x, V(190, 1170), V(64, 72), { id: 'expose' });
      const tw_ = w;
      lockTableS(t, x, V(380, 1300), tw_, { cols: ['Name', 'Spouse', 'Married', 'Status'], rowsN: V(3, 2), label: V(TBL, ''), key: 'table min', active: t > k.idea.w[11] + 0.7 ? 1 : -1, fold: { t: k.idea.w[11], d: 1.1, keep: 'Status' }, locks: { Name: k.idea.w[11] - 0.2, Spouse: k.idea.w[11] - 0.15, Married: k.idea.w[11] - 0.1, Divorced: k.idea.w[11] - 0.05, Court: k.idea.w[11] } }, V(1, 1.12));
      if (PORTRAIT) illus(940, 1580, 'right');
      withA(ease(t, k.idea.w[15], 0.3), () => bmono('Required to answer the question being asked', x, V(820, 1620), V(22, 24), { col: BL.green, key: 'required', maxW: w }));
    });
  }, { id: 'idea' });
  sfx('whoosh', tIdea + 0.04); [0, 0.05, 0.1, 0.15, 0.2].forEach(d => sfx('click', k.idea.w[11] - 0.2 + d, -6)); sfx('whoosh', k.idea.w[11] + 0.2, -4);

  /* 3 · split: the question, and its yes or no (a searcher asks; the record answers) */
  bshot(tAsk, (t) => {
    wsplit(t, tAsk, () => {
      face(t, x + V(56, 62), V(240, 1220), V(56, 62), 211, { s: popS(t, tAsk + 0.05), lx: 0.8 });
      bub(t, tAsk + 0.1, x + V(130, 145), V(200, 1150), V('Is this person currently\nfree to marry?', 'Is this person currently\nfree to marry?'), { size: V(44, 54), key: 'question' });
      const rx = V(x + 520, 780), ry = V(820, 1630);
      critter('cert', BL.cobalt, rx, ry, V(220, 240), { s: popS(t, k.yn.w[0] - 0.05), open: blinkOpen(t, 212), lx: -0.6, ly: -0.6, key: 'answerer' });
      withA(0.4 + 0.6 * prog(t, k.yn.w[2] - 0.05, 0.2), () => bub(t, tAsk + 0.3, x, V(520, 1400), 'Yes', { size: V(60, 66), weight: 600, key: 'yes2' }));
      withA(0.4 + 0.6 * prog(t, k.yn.w[2] - 0.05, 0.2), () => bub(t, tAsk + 0.36, x + V(300, 310), V(520, 1400), 'No', { size: V(60, 66), weight: 600, key: 'no2' }));
      withA(ease(t, k.yn.w[5], 0.35), () => bmono('A yes or no answer', x, V(720, 1590), V(24, 28), { key: 'yn label' }));
    });
  }, { id: 'question' });
  sfx('whoosh', tAsk + 0.04); sfx('pop', tAsk + 0.1, -3); sfx('pop', k.yn.w[2] - 0.05, -2); sfx('pop', k.yn.w[4] - 0.05, -2);

  /* 4 · split: answering does NOT require showing… (each column locks on her word) */
  bshot(tReq, (t) => {
    wsplit(t, tReq, () => {
      head(t, tReq + 0.02, ['Answering it does *not*', 'require showing:'], x, V(190, 1166), V(60, 72), { acc: BL.red, id: 'notreq' });
      lockTableS(t, x, V(390, 1292), w, { cols: ['Spouse', 'Married', 'Divorced', 'Status'], rowsN: V(3, 2), label: V(TBL, ''), key: 'table lock', active: -1,
        locks: { Married: k.when.t, Spouse: k.who.t, Divorced: k.wdiv.t, Court: k.court.w[1] } }, V(1, 1.1));
      if (PORTRAIT) illus(940, 1636, 'right');
      const said = [['When they married', k.when.t], ['Who they married', k.who.t], ['When they divorced', k.wdiv.t], ['Which court granted it', k.court.t]];
      let cur = null; said.forEach(([s, tt]) => { if (t >= tt - 0.05) cur = [s, tt]; });
      if (cur) bub(t, cur[1] - 0.05, x, V(820, 1540), cur[0], { size: V(40, 44), strike: cur[1] + 0.35, key: 'said' });
    });
  }, { id: 'notrequired' });
  sfx('whoosh', tReq + 0.04); [k.when.t, k.who.t, k.wdiv.t, k.court.w[1]].forEach(tt => sfx('click', tt + 0.02, -2));

  /* 5 · in the case of Marrify in Ghana: the question is "is this person married?" */
  bshot(c1, (t) => {
    bubPair(t, { s: 'In the case of *Marrify* in Ghana:', t: c1 + 0.05, size: V(52, 46) }, { s: 'Is this person married?', t: k.q.w[3], size: V(56, 50) });
    const p = popS(t, k.gh.w[7]); if (p > 0) withT(V(x + 60, x + 60), V(520, 1520), p, -0.08, () => flagB('ghana', -60, -40, 120));
    peek(t, k.q.w[3], null, 'cert', BL.cobalt, { seed: 22 });
  }, { id: 'ghana' });
  sfx('pop', c1 + 0.05); sfx('pop', k.q.w[3], -3);

  /* 6 · split: the simple answer: one column left, "active marriage"; nothing else (name of spouse, dates, history struck) */
  bshot(tAns, (t) => {
    wsplit(t, tAns, () => {
      head(t, tAns + 0.02, ['The answer is *simple:*'], x, V(190, 1160), V(64, 72), { id: 'simple' });
      const bb = bub(t, tAns + 0.08, x, V(240, 1196), V('This person currently has\nan *active marriage* on record.', 'This person currently has\nan *active marriage* on record.'), { size: V(44, 46), acc: BL.cobalt, tick: k.ans.w[6], key: 'answer' });
      head(t, k.nothing.w[0], ['Nothing else.'], x, V(530, 1460), V(64, 72), { id: 'nothing' });
      const nos = [['Name of spouse', k.spouse.w[0]], ['Dates', k.dates.w[0]], ['History', k.hist.w[0]]];
      nos.forEach(([s, tt], i) => bub(t, tt - 0.05, V(x + [0, 330, 510][i], x + [0, 395, 610][i]), V(600, 1510), s, { size: V(34, 42), strike: tt + 0.25, fg: BL.grey, key: 'no ' + i }));
      critter('cert', BL.cobalt, V(x + 620, 860), V(900, 1360), V(150, 130), { s: popS(t, k.ans.w[6] - 0.1), open: t > k.ans.w[6] ? 'happy' : blinkOpen(t, 221), key: 'answer record' });
    });
  }, { id: 'answer' });
  sfx('whoosh', tAns + 0.04); sfx('pop', tAns + 0.08, -3); sfx('tick', k.ans.w[6]); sfx('pop', k.nothing.w[0], -2); [k.spouse.w[0], k.dates.w[0], k.hist.w[0]].forEach(tt => sfx('pen', tt + 0.25, -4));

  /* 7 · split: another person could request another thing -> access levels: an individual sees one level; certain
   *     organisations or institutions see more (illustration; both tiers present greyed, each lights on her words) */
  bshot(tOther, (t) => {
    wsplit(t, tOther, () => {
      if (t < k.lvl.w[5] - 0.1) head(t, tOther + 0.03, ['Another person could', 'request *another thing.*'], x, V(190, 1162), V(60, 72), { acc: BL.cobalt, id: 'another' });
      else head(t, k.lvl.w[5] - 0.1, ['Maybe: access *levels.*'], x, V(190, 1162), V(64, 72), { acc: BL.cobalt, id: 'levels' });
      const tx = V(x + 170, 250), tw_ = V(w - 170, 940 - 250);
      const row = (kind, y, lit, locks, lab, tl) => {
        const a = 0.3 + 0.7 * prog(t, lit, 0.3), tin = tOther + (kind === 'face' ? 0.1 : 0.2);
        withA(a, () => {
          if (kind === 'face') face(t, x + V(60, 70), y + V(80, 70), V(54, 52), 231, { s: popS(t, tin), wake: lit, lx: 1, squeeze: [k.ind.w[3] - 0.05, k.ind.w[3] + 0.3] });
          else critter('register', BL.green, x + V(60, 76), y + V(140, 124), V(120, 120), { s: popS(t, tin), open: t > lit ? blinkOpen(t, 232) : 0.15, lx: 1 });
          const la = ease(t, kind === 'face' ? k.ind.w[3] - 0.05 : k.org.w[4] - 0.05, 0.3);
          if (PORTRAIT) bmono(lab, tx, y + 172, 22, { align: 'left', key: 'tier ' + kind, col: BL.ink, a: la });
          else bmono(lab, x, y + 190, 20, { align: 'left', maxW: 160, key: 'tier ' + kind, a: la });
          lockTableS(t, tx, y, tw_, { cols: ['Name', 'Married', 'Status'], rowsN: 1, locks, key: 'tier tbl ' + kind, active: -1 }, 1);
        });
        if (tl) withA(ease(t, tl[1], 0.35), () => bmono(tl[0], tx + tw_, y + V(176, 172), V(22, 22), { align: 'right', col: tl[2], key: 'tier lab ' + kind }));
      };
      row('face', V(330, 1272), tOther + 0.15, { Name: k.ind.w[7] - 0.05, Married: k.ind.w[8] - 0.05 }, 'An individual', ['One particular level', k.ind.w[7], BL.grey]);
      row('inst', V(620, 1464), k.org.w[5] - 0.1, { Name: -1 }, 'Organisations or institutions', ['Can access more', k.org.w[11], BL.green]);
      illus(V(x + w, 80), V(300, 1420), V('right', 'left'));
    });
  }, { id: 'access' });
  sfx('whoosh', tOther + 0.04); sfx('pop', k.lvl.w[5] - 0.1, -3); sfx('blink', k.ind.w[3] - 0.05, -3); sfx('click', k.ind.w[7] - 0.03, -4); sfx('click', k.ind.w[8] - 0.03, -4); sfx('pop', k.org.w[5] - 0.1); sfx('tick', k.org.w[11]);
}

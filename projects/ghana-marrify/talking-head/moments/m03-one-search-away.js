/* Moment 03 (kit clip 4), Blink look: sensitive data, business lookup vs divorce, the consent part (courthouse 2003 vs a
 * phone, three seconds). ~44 s. V(16:9, 9:16). Beats: ../MOMENTS.md. Serious beats (personal, consent) in the calm register:
 * eyes closed or looking down, slow moves, no gags. */
'use strict';

function buildMoment() {
  const k = PS({
    tc: 'a drawback that techcabal raised',
    sens: 'which is that marriage and divorce records are sensitive private data',
    pers: "a divorce record is a personal thing about someone's life", srch: "and now that's a record searchable by anyone that has your name",
    open: "and i'm saying this about someone that likes open data", gen: "i think that's a genuine drawback",
    biz: 'in estonia you can search online and find businesses', year: 'you can look up how much they made in a year', fine: "and that's fine i think",
    ent: 'because a business is a public entity', money: 'that takes public money', acc: 'owes public accountability',
    divd: "but maybe in the case of a divorce it's a little bit different",
    dk: "i don't really know because i love the idea of open data",
    cons: "there's also the consent part of the conversation",
    diff: "like there's a difference between your divorce papers sitting in one courthouse or somewhere in 2003",
    phone: 'and somebody just being able to check it on their phone in three seconds right',
  });
  const [c1, c2, c3, c4, c5, c6] = cutTimes();
  const tSens = k.sens.t - 0.1, tSrch = k.srch.t - 0.1, tBiz = k.biz.t - 0.1, tCons = k.cons.t - 0.1, tDiff = k.diff.t - 0.06;
  const x = LX(), w = WX();

  /* camera */
  camSplit(-1);
  camSplit(tSens);
  camPunch(c1, 1.4, 1.26); camPush(c1 + 0.05, 2.8, 1.48, 1.3);
  camSplit(tSrch, { fy: V(null, 0.3) });
  camFull(k.open.t - 0.1, 1.28, 1.16); camPush(k.open.t, 2.4, 1.38, 1.22);
  camSplit(tBiz);
  camFull(c3, 1.26, 1.16); camPunch(k.dk.w[6] - 0.05, 1.38, 1.24);
  camSplit(tDiff, { z: V(1.36, 0.82), now: true });

  /* 1 · hook: your divorce, searchable by anyone with your name (a divorce record, and faces turning to it) */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      bmono('Ghana just put marriage records online.', x, V(150, 1130), V(24, 26), { key: 'ctx', col: BL.grey });
      head(t, -0.8, V(['Your divorce,', 'searchable by', 'anyone with', 'your *name.*'], ['Your divorce,', 'searchable by anyone', 'with your *name.*']), x, V(240, 1214), V(76, 76), { acc: BL.red, id: 'hook' });
      const rx = V(x + 330, 560), ry = V(820, 1606);
      critter('folder', BL.sand, rx, ry, V(190, 200), { s: popS(t, -0.7), open: 'down', key: 'divorce record' });
      bmono('A divorce record', rx, ry + V(44, 34), V(22, 24), { align: 'center', key: 'rec label', col: BL.grey });
      const fs = V([[x + 70, 790], [x + 150, 650], [x + 520, 660], [x + 610, 800]], [[180, 1580], [320, 1480], [800, 1480], [900, 1580]]);
      fs.forEach(([fx, fy], i) => { const l = lookAt(fx, fy, rx, ry - V(80, 70)); face(t, fx, fy, V(50, 46), 120 + i, { s: popS(t, -0.6 + i * 0.05), lx: l[0], ly: l[1] }); });
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -6);

  /* 2 · split: TechCabal's own words, highlighted on her words */
  const tcDraw = (t) => {
    bmono("TechCabal's words", V(CX, x), V(330, 1140), V(30, 26), { key: 'tcw', col: BL.grey, align: V('center', 'left') });
    const cxs = V(360, 40), cws = V(1200, 1000); const sp = springIn(t, tSens + 0.05, cxs, V(380, 1176), { dy: 80 });
    if (sp.p > 0) withA(clamp(sp.p * 3), () => sourceCard(IMG.tc_column, cxs, sp.y, cws, { crop: [0, 2368, 1180, 2600], credit: TC.credit, creditX: V(cxs, 80), key: 'tc drawback', over: (M) => { highlight(t, tSens + 0.12, 0.5, TC.lead, M, BL.hiRed); highlight(t, k.sens.w[7] - 0.05, 0.6, TC.sensitive, M, BL.hiRed); } }));
    head(t, k.sens.w[8] - 0.05, V(['*Sensitive* personal information.'], ['*Sensitive* personal', 'information.']), V(CX, x), V(850, 1530), V(84, 72), { acc: BL.red, align: V('center', 'left'), id: 'sensitive' });
    if (!PORTRAIT) [[230, 510, 0], [1690, 510, 1]].forEach(([fx, fy, i]) => face(t, fx, fy, 70, 170 + i, { s: popS(t, tSens + 0.2 + i * 0.06), lx: i ? -1 : 1, ly: 0.3, wide: [k.sens.w[8], k.sens.w[8] + 0.6] }));
  };
  if (PORTRAIT) bshot(tSens, (t) => wsplit(t, tSens, () => tcDraw(t)), { id: 'sensitive' }); else bcard(tSens, tcDraw, { id: 'sensitive', push: 0 });
  sfx('whoosh', tSens + 0.04); sfx('pen', k.sens.w[3]); sfx('pen', k.sens.w[8]);

  /* 3 · a divorce record is personal (calm: it sleeps) */
  bshot(c1, (t) => {
    bubPair(t, { s: 'A divorce record is *personal.*', t: c1 + 0.05, acc: BL.red }, { s: 'About someone’s life.', t: k.pers.w[7] });
    const br = 1 + 0.015 * Math.sin(t * 2.2);
    const p = spring(Math.max(0, t - c1 - 0.3), 1.2, 0.8); if (t > c1 + 0.3) critter('folder', BL.sand, lerp(V(-200, W + 200), V(250, W - 250), p), V(1000, 1570), V(240, 220), { s: br, rot: V(8, -8), open: 0, key: 'sleeping record' });
  }, { id: 'personal' });
  sfx('pop', c1 + 0.05, -2);

  /* 4 · split: searchable by anyone that has your name (the REAL Marrify search box, empty; faces gather around it) */
  bshot(tSrch, (t) => {
    wsplit(t, tSrch, () => {
      head(t, tSrch + 0.05, ['Searchable by *anyone*', 'that has your name.'], x, V(190, 1160), V(64, 72), { acc: BL.red, id: 'anyone' });
      const cy = V(370, 1290), cxs = V(x, 40), cws = V(w, 1000);
      const sp = springIn(t, tSrch + 0.1, cxs, cy, { dy: 80 });
      if (sp.p > 0) withA(clamp(sp.p * 3), () => sourceCard(IMG.mf_search, cxs, sp.y, cws, { crop: V([0, 0, 1700, 340], [40, 110, 1660, 250]), credit: MF_CREDIT, key: 'marrify search', creditX: V(x, 80) }));
      const bx = V(x + w / 2, 540), by = cy + V(80, 60);
      const spots = V([[150, 660], [300, 700], [450, 660], [600, 700], [750, 660], [230, 820], [520, 830], [690, 830]], [[140, 1556], [290, 1594], [450, 1600], [620, 1600], [780, 1594], [892, 1556]]);
      const faces = spots.map(([fx, fy], i) => ({ x: fx, y: fy, r: V(48, 40), t0: k.srch.w[7] - 0.15 + i * 0.05, seed: 140 + i * 1.3, look: lookAt(fx, fy, bx, by) }));
      crowd(t, faces, { f: 1.9, z: 0.62 });
    });
  }, { id: 'searchable' });
  sfx('whoosh', tSrch + 0.04); sfx('pop', tSrch + 0.1, -4); sfx('crowd', k.srch.w[7] - 0.1); [0.1, 0.25].forEach(d => sfx('pop', k.srch.w[7] + d, -5));

  /* 5 · as someone who likes open data: a genuine drawback */
  bshot(k.open.t - 0.12, (t) => {
    bubPair(t, { s: 'I like *open data.*', t: k.open.t - 0.1 }, { s: 'Still a genuine drawback.', t: k.gen.w[0] }, { out: tBiz - 0.05 });
    peek(t, k.open.w[8], tBiz, 'register', BL.green, { seed: 15 });
  }, { id: 'opendata' });
  sfx('pop', k.open.t - 0.1); sfx('pop', k.gen.w[0], -3);

  /* 6 · split: in Estonia, a business (public money: fine) vs a divorce (a little bit different) */
  bshot(tBiz, (t) => {
    wsplit(t, tBiz, () => {
      withA(PORTRAIT ? 1 - prog(t, k.divd.w[7] - 0.15, 0.2) : 1, () => head(t, tBiz + 0.05, V(['In Estonia, look up', '*a business:*'], ['Look up *a business:*']), x, V(190, 1150), V(60, 72), { acc: BL.cobalt, id: 'biz-head' }));
      const sx = V(x + 100, 180), sy = V(560, 1430);
      if (!PORTRAIT || t < k.divd.w[7] - 0.1) { flagB('estonia', sx - V(70, 70), sy - V(260, 250), V(100, 90));
      critter('shop', BL.cobalt, sx, sy, V(200, 190), { s: popS(t, tBiz + 0.1), open: t > k.fine.w[2] ? 'happy' : blinkOpen(t, 151), lx: 0.8, key: 'shop' });
      bmono('A business', sx, sy + V(44, 42), V(22, 24), { align: 'center', key: 'biz label', col: BL.grey }); }
      const rows = [['How much it made in a year', k.year.w[7]], ['Public entity', k.ent.w[4]], ['Public money', k.money.w[2]], ['Public accountability', k.acc.w[1]]];
      const bx0 = V(x + 240, 330), phB = PORTRAIT && t >= k.divd.w[7] - 0.1, fadeA = PORTRAIT ? 1 - prog(t, k.divd.w[7] - 0.15, 0.2) : 1;
      if (fadeA > 0) withA(fadeA, () => { rows.forEach(([s, said], i) => bub(t, tBiz + 0.15 + i * 0.06, bx0, V(310 + i * 84, 1196 + i * 86), s, { size: V(32, 34), tick: said + 0.1, key: 'brow ' + i, fg: t >= said - 0.05 ? BL.ink : BL.soft }));
        bub(t, k.fine.w[2] - 0.05, V(bx0, x), V(650, 1552), 'That’s *fine.*', { size: V(44, 40), key: 'fine' }); });
      const lit = 0.3 + 0.7 * prog(t, k.divd.w[7] - 0.1, 0.3);
      const dx = V(x + 100, 740), dy = V(930, 1600);
      withA(PORTRAIT ? (phB ? 1 : 0) : lit, () => { critter('folder', BL.sand, dx, dy, V(150, 220), { s: PORTRAIT ? popS(t, k.divd.w[7] - 0.1) : popS(t, tBiz + 0.2) * (1 + 0.15 * Math.sin(Math.PI * clamp((t - k.divd.w[7]) / 0.3))), open: t >= k.divd.w[7] ? 'down' : 0.15, key: 'divorce' }); });
      bub(t, k.divd.w[7] + V(-0.05, 0.08), V(x + 240, x), V(800, 1240), 'A divorce:\na little bit *different.*', { size: V(40, 60), acc: BL.red, key: 'different' });
    });
  }, { id: 'business' });
  sfx('whoosh', tBiz + 0.04); sfx('pop', tBiz + 0.1, -3); sfx('tick', k.ent.w[4] + 0.1); sfx('tick', k.money.w[2] + 0.1); sfx('tick', k.acc.w[1] + 0.1); sfx('yes', k.fine.w[2]); sfx('pop', k.divd.w[7] - 0.05, -2);

  /* 7 · I don't really know; I love the idea of open data */
  bshot(c3, (t) => {
    bubPair(t, { s: 'I don’t really *know.*', t: c3 + 0.05 }, { s: 'I love the idea of open data.', t: k.dk.w[5] }, { out: tCons });
    peek(t, c3 + 0.3, tCons, 'cert', BL.red, { seed: 16, open: 0.55 });
  }, { id: 'dontknow' });
  sfx('pop', c3 + 0.05); sfx('pop', k.dk.w[5], -3);

  /* 8 · card (eyelid wipe, calm): the consent part */
  bcard(tCons, (t) => {
    head(t, tCons + 0.05, V(['There’s also the *consent* part.'], ['There’s also', 'the *consent* part.']), CX, V(380, 700), V(96, 96), { align: 'center', acc: BL.red, id: 'consent' });
    const br = 1 + 0.015 * Math.sin(t * 2.0);
    critter('folder', BL.sand, CX, V(880, 1400), V(280, 360), { s: br * ease(t, tCons + 0.15, 0.8), open: t >= k.cons.w[3] ? 1 - prog(t, k.cons.w[3], 0.5) : 'down', key: 'consent record' });
    withA(ease(t, k.cons.w[7], 0.5), () => bmono('…of the conversation', CX, V(960, 1490), V(30, 32), { align: 'center', key: 'conv', col: BL.grey }));
  }, { id: 'consent', lid: true, push: 0.02 });

  /* 9 · split: papers in a courthouse in 2003 vs a phone, three seconds (illustration) */
  bshot(tDiff, (t) => {
    wsplit(t, tDiff, () => {
      head(t, tDiff + 0.04, ['There’s a *difference:*'], x, V(190, 1140), V(64, 72), { acc: BL.red, id: 'diff-head' });
      const cx_ = V(x + 150, 250), cy_ = V(700, 1470);
      critter('court', BL.cobalt, cx_, cy_, V(230, 230), { s: popS(t, tDiff + 0.05), key: 'court' });
      critter('folder', BL.sand, cx_ + V(150, 150), cy_ + 8, V(110, 110), { s: popS(t, k.diff.w[6] - 0.1), open: 0, rot: -6, key: 'papers' });
      withA(ease(t, tDiff + 0.1, 0.3), () => bmono('A courthouse', cx_ + V(60, 60), cy_ + V(46, 44), V(24, 24), { align: 'center', key: 'courthouse' }));
      const yp = popS(t, k.diff.w[13]); if (yp > 0) withT(cx_ + V(60, 60), V(cy_ - 330, 1630), yp, 0, () => _txt('2003', 0, 0, BF.h(V(80, 64), 700), BL.ink, 'center'));
      const pw = V(280, 300), ph = V(540, 420), px = V(x + 420, 580), py = V(300, 1215);
      const pb = springIn(t, tDiff + 0.1, px, py, { dy: 120 });
      if (pb.p > 0) withA(clamp(pb.p * 3), () => bPhone(px, pb.y, pw, ph, (sx, sy, sw, sh) => {
        bmono('Search', sx + 22, sy + 70, 18, { raw: true, col: BL.soft });
        strokeRR(sx + 18, sy + 86, sw - 36, 54, 12, BL.line, 3);
        typeText_(t, k.phone.w[1], 'Their name', sx + 34, sy + 122, BF.h(24, 600), BL.ink, { cps: 18, caretTo: k.phone.w[10] });
        const rp = ease(t, k.phone.w[13], 0.3); if (rp > 0) withA(rp, () => { fillRR(sx + 18, sy + 160, sw - 36, 70, 12, BL.hiRed); _txt('Divorce · 2003', sx + 34, sy + 204, BF.h(24, 600), BL.ink, 'left'); });
        const sec = clamp((t - k.phone.w[1]) / Math.max(0.5, k.phone.w[13] - k.phone.w[1])) * 3;
        if (t >= k.phone.w[1]) _txt(sec.toFixed(1) + ' s', sx + sw / 2, sy + sh - 40, BF.h(V(64, 72), 700), BL.red, 'center');
      }));
      face(t, px + pw - V(10, 10), py - V(10, 10), V(42, 40), 160, { s: popS(t, k.phone.w[1]), wake: k.phone.w[1] + 0.1, lx: -0.6, ly: 0.8 });
      illus(V(px, 80), V(py + ph + 36, 1232), 'left');
    });
  }, { id: 'phone' });
  sfx('whoosh', tDiff + 0.04); sfx('pop', tDiff + 0.05, -3); sfx('pop', k.diff.w[13], -2); sfx('pop', k.phone.w[1], -3); sfx('type', k.phone.w[1], 0, { n: 6, d: 0.55 }); sfx('ding', k.phone.w[13]);
}

/* Moment 05 (kit clip 6), Blink look: technology is not neutral. The same divorce record: administrative in Estonia,
 * stigmatised in an African context (calm register: slow, no overshoot, the record looks down). "It's also a cultural
 * design thing." ~32 s. V(16:9, 9:16). Beats: ../MOMENTS.md. */
'use strict';

function buildMoment() {
  const k = PS({
    say: 'technology is not neutral', form: "it takes the form of the system or the place that you're using it in",
    ex: 'for example the way a piece of technology works in estonia', diff: "will be completely different from the way it's working",
    afr: 'in a country in africa', ng: 'in nigeria', gh: 'in ghana',
    ee: 'in estonia a divorce record could just be administrative', care: 'nobody cares',
    ctx: 'but in an african context to a large extent', div: 'divorce especially for women', stig: 'is still pretty stigmatised',
    tricky: "so it's very tricky when i think about it", explore: 'this is something that i myself think i need to explore further', human: 'the human side of this thing',
    priv: "it's not just a privacy engineering conversation", cult: "it's also a cultural design thing",
  });
  const [c1, c2, c3] = cutTimes();
  const tNeu = k.form.w[6] - 0.1, tEx = k.ex.t - 0.08, tRec = k.ee.t - 0.1, tWom = k.ctx.t - 0.08, tCult = k.priv.t - 0.08, tDes = k.cult.t - 0.06;
  const x = LX(), w = WX();
  const calm = (t, t0) => spring(Math.max(0, t - t0), 1.0, 0.95);   // no overshoot

  /* camera */
  camSplit(-1);
  camPunch(tNeu, 1.38, 1.24);
  camSplit(tEx);
  camSplit(tRec, { z: V(1.36, 0.82) });
  camSplit(tWom);
  camFull(k.tricky.w[3] - 0.26, 1.28, 1.16); camPush(k.tricky.w[3] - 0.2, 2.2, 1.4, 1.24);
  camFull(c2, 1.3, 1.16); camPush(c2 + 0.05, 4.2, 1.44, 1.26);
  camSplit(tCult);

  /* 1 · hook: a divorce record. In Estonia: nobody cares. In an African context: stigmatised. */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      head(t, -0.8, ['A divorce record.'], x, V(200, 1170), V(76, 70), { id: 'hook-a' });
      const rows = [[['estonia'], 'In Estonia:', 'nobody cares.', BL.green, 1, null], [['nigeria', 'ghana'], 'In an African context:', 'still stigmatised,', BL.red, 'down', 'especially for women.']];
      rows.forEach(([fl, a, b, col, eyes, c], i) => {
        const y = V(300, 1230) + i * V(270, 210);
        fl.forEach((f, j) => flagB(f, x, y + j * V(64, 60), V(90, 84)));
        critter('folder', BL.sand, x + V(200, 200), y + V(150, 140), V(130, 120), { open: eyes === 'down' ? 'down' : blinkOpen(t, 300 + i), lx: eyes === 'down' ? 0 : 0.8, key: 'hook rec ' + i });
        _txt(a, x + V(300, 290), y + V(50, 50), BF.h(V(38, 40), 500), BL.grey, 'left');
        _txt(b, x + V(300, 290), y + V(126, 126), BF.h(V(56, 62), 600), col, 'left', 'alphabetic', -1.5);
        if (c) _txt(c, x + V(300, 290), y + V(186, 186), BF.h(V(44, 44), 500), BL.ink, 'left');
        if (i === 1) [[x + V(240, 230), y - V(10, 6)], [x + V(170, 160), y - V(30, 26)]].forEach(([fx, fy], j) => face(t, fx, fy, V(28, 28), 310 + j, { lx: 0.2, ly: 1 }));
      });
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -8);

  /* 2 · technology is not neutral: it takes the form of the place you use it in */
  bshot(tNeu, (t) => {
    bubPair(t, { s: 'Technology is *not neutral.*', t: tNeu + 0.05, acc: BL.red }, { s: V('It takes the form of the place you use it in.', 'It takes the form of\nthe place you use it in.'), t: tNeu + 0.3, size: V(40, 40) });
    peek(t, tNeu + 0.4, tEx, 'cert', BL.red, { seed: 25 });
  }, { id: 'neutral' });
  sfx('pop', tNeu + 0.05); sfx('pop', tNeu + 0.35, -4);

  /* 3 · split: the same technology in Estonia and in Nigeria, Ghana: completely different */
  bshot(tEx, (t) => {
    wsplit(t, tEx, () => {
      head(t, tEx + 0.04, ['Same technology,'], x, V(190, 1150), V(64, 72), { id: 'same-tech' });
      const half = V(320, 410), x2 = x + half + V(60, 40), y0 = V(260, 1196), bh_ = V(560, 396);
      const col = (cx, t0, flags, label, lit, fT) => {
        const a = ease(t, t0, 0.4) * (lit == null ? 1 : 0.35 + 0.65 * prog(t, lit, 0.3)); if (a <= 0) return;
        withA(a, () => { wcard(cx, y0, half, bh_);
          flags.forEach((f, i) => { const fw = V(88, 84), bump = fT ? 1 + 0.25 * Math.max(0, Math.sin(Math.PI * clamp((t - fT[i]) / 0.35))) : 1, fx_ = cx + 24 + i * V(104, 100) + fw / 2, fy_ = y0 + 24 + fw / 3; withT(fx_, fy_, bump, 0, () => flagB(f, -fw / 2, -fw / 3, fw)); });
          bmono(label, cx + 24, y0 + V(140, 136), V(22, 28), { key: 'col ' + label, col: BL.grey });
          critter('cert', BL.red, cx + half / 2, y0 + bh_ - V(110, 60), V(170, 200), { s: popS(t, t0 + 0.1), open: t >= k.diff.w[2] ? (cx > x + 10 ? 'down' : 'happy') : blinkOpen(t, cx), lx: 0, ly: -0.4 }); });
      };
      col(x, tEx + 0.25, ['estonia'], 'Estonia');
      col(x2, tEx + 0.4, ['nigeria', 'ghana'], 'Nigeria, Ghana', null, [k.ng.w[1] - 0.05, k.gh.w[1] - 0.05]);
      withA(ease(t, k.diff.w[2], 0.3), () => { _txt('≠', x + half + V(30, 20), y0 + bh_ / 2, BF.h(V(80, 70), 700), BL.red, 'center');
        bmono('Completely different', x2 + half, y0 + bh_ + V(46, 40), V(22, 24), { align: 'right', col: BL.red, key: 'diff' }); });
    });
  }, { id: 'places' });
  sfx('whoosh', tEx + 0.04); sfx('pop', tEx + 0.35, -4); sfx('pop', tEx + 0.5, -4); sfx('blink', k.diff.w[2], -3); sfx('pop', k.ng.w[1] - 0.05, -5); sfx('pop', k.gh.w[1] - 0.05, -5);

  /* 4 · split: in Estonia a divorce record could just be administrative: nobody cares (faces pass by, not looking) */
  bshot(tRec, (t) => {
    wsplit(t, tRec, () => {
      flagB('estonia', x, V(150, 1120), V(100, 90));
      head(t, tRec + 0.05, V(['In Estonia, a divorce record', 'could just be *administrative.*'], ['A divorce record', 'could just be', '*administrative.*']), x, V(330, 1236), V(50, 72), { acc: BL.cobalt, id: 'admin' });
      const rx = V(x + 200, 250), ry = V(780, 1616);
      critter('folder', BL.sand, rx, ry, V(200, 200), { s: popS(t, tRec + 0.1), open: blinkOpen(t, 321), lx: 0.4, key: 'admin record' });
      critter('stamp', BL.black, rx + V(170, 190), ry - V(80, 96), V(110, 120), { s: popS(t, k.ee.w[8] - 0.1), rot: -10, open: blinkOpen(t, 322) });
      const pass = (i) => { const u = ((t - tRec) * 0.12 + i * 0.35) % 1; return [lerp(V(x + 420, 560), V(x + 720, 900), u), V(560 + i * 90, 1550 + i * 66)]; };
      for (let i = 0; i < 2; i++) { const [fx, fy] = pass(i); const away = t >= k.care.w[0]; face(t, fx, fy, V(40, 44), 330 + i, { s: ease(t, tRec + 0.3, 0.4), lx: away ? 1 : -0.8, ly: away ? -0.6 : 0.3, squeeze: [k.care.w[0], k.care.w[0] + 0.25] }); }
      if (t >= k.care.w[0] - 0.05) bub(t, k.care.w[0] - 0.05, V(x + 300, 560), V(820, 1404), 'Nobody *cares.*', { size: V(42, 48), key: 'nobody' });
    });
  }, { id: 'estonia' });
  sfx('whoosh', tRec + 0.04); sfx('pop', tRec + 0.1, -4); sfx('click', k.ee.w[8], -3); sfx('pop', k.care.w[0], -3);

  /* 5 · split (calm): in an African context, divorce, especially for women, is still pretty stigmatised */
  bshot(tWom, (t) => {
    wsplit(t, tWom, () => {
      flagB('nigeria', x, V(150, 1104), V(100, 84)); flagB('ghana', x + V(116, 100), V(150, 1104), V(100, 84));
      head(t, tWom + 0.02, V(['In an African context, to a large extent,'], ['In an African context,', 'to a large extent,']), x, V(310, 1210), V(34, 44), { col: BL.grey, weight: 500, id: 'ctx' });
      if (PORTRAIT) { const tt = [k.div.w[0], k.div.w[1], k.div.w[2], k.div.w[3], k.stig.w[0], k.stig.w[1], k.stig.w[2], k.stig.w[3]].map(v => v - 0.1);
        head(t, tt[0], ['Divorce, especially', '*for women,* is still', 'pretty *stigmatised.*'], x, 1336, 72, { acc: BL.red, id: 'women9', times: tt, dur: 0.6 }); }
      else head(t, tWom + 0.06, ['Divorce, especially *for women,*'], x, 380, 54, { acc: BL.red, id: 'women' });
      const rx = V(x + 330, 540), ry = V(760, 1640);
      critter('folder', BL.sand, rx, ry, V(180, 150), { s: calm(t, tWom + 0.1), open: 'down', key: 'stigma record' });
      const ring = V([[x + 90, 640], [x + 170, 520], [x + 520, 520], [x + 600, 650]], [[230, 1612], [360, 1574], [720, 1574], [850, 1612]]);
      ring.forEach(([fx, fy], i) => { const turn = ease(t, k.div.w[2] + i * 0.15, 0.8, E.inOutCubic); const l = lookAt(fx, fy, rx, ry - 70);
        face(t, fx, fy, V(44, 40), 340 + i, { s: calm(t, tWom + 0.25 + i * 0.1), lx: lerp(fx < rx ? -1 : 1, l[0], turn), ly: lerp(0, l[1], turn) }); });
      if (!PORTRAIT && t >= k.stig.w[1] - 0.1) head(t, k.stig.w[1] - 0.1, ['is still pretty *stigmatised.*'], x, V(900, 1630), V(52, 66), { acc: BL.red, id: 'stig', dur: 0.8 });
    });
  }, { id: 'women' });

  /* 6 · it's very tricky / I myself need to explore the human side */
  bshot(k.tricky.w[3] - 0.28, (t) => {
    if (t < c2) bubPair(t, { s: 'It’s very *tricky*', t: k.tricky.w[3] - 0.25 }, { s: 'when I think about it.', t: k.tricky.w[4] });
    else bubPair(t, { s: 'I myself need to *explore*', t: c2 + 0.05 }, { s: 'the human side of this thing.', t: k.human.t });
    peek(t, k.tricky.w[3] + 0.1, null, 'register', BL.green, { seed: 27, size: V(250, 210), open: t < c2 ? 0.5 : t >= k.explore.w[10] - 0.05 ? 0.05 : blinkOpen(t, 27) });
  }, { id: 'tricky' });
  sfx('pop', k.tricky.w[3] - 0.25); sfx('pop', c2 + 0.05); sfx('pop', k.human.t, -4);

  /* 7 · split: it's not just a privacy engineering conversation */
  bshot(tCult, (t) => {
    wsplit(t, tCult, () => {
      head(t, tCult + 0.04, ['It’s not just a', '*privacy engineering*', 'conversation.'], x, V(220, 1180), V(64, 72), { acc: BL.cobalt, id: 'privacy' });
      illus(V(x + w, 940), V(540, 1404), 'right');
      lockTableS(t, x, V(560, 1430), w, { cols: ['Name', 'Court', 'Status'], rowsN: 1, active: -1, key: 'priv table', locks: { Name: tCult + 0.4, Court: tCult + 0.55 } });
    });
  }, { id: 'privacy' });
  sfx('whoosh', tCult + 0.04); [0.4, 0.55].forEach(d => sfx('click', tCult + d, -6));

  /* 8 · card (eyelid wipe): it's also a cultural design thing: people and records together */
  bcard(tDes, (t) => {
    head(t, tDes + 0.02, V(['It’s also a', '*cultural design* thing.'], ['It’s also a', '*cultural design*', 'thing.']), CX, V(240, 520), V(104, 104), { align: 'center', acc: BL.green, id: 'cultural' });
    const items = V([[-560, 900, 'f'], [-380, 870, 'cert'], [-200, 900, 'f'], [-20, 860, 'folder'], [160, 900, 'f'], [340, 870, 'register'], [520, 900, 'f']],
                    [[-330, 1250, 'f'], [-110, 1210, 'cert'], [110, 1250, 'f'], [330, 1210, 'folder'], [-220, 1480, 'register'], [0, 1500, 'f'], [220, 1480, 'idcard']]);
    items.forEach(([dx, y, kind], i) => {
      const sp = springIn(t, tDes + 0.08 + i * 0.06, CX + dx, y, { dx: (dx < 0 ? -1 : 1) * V(600, 500), dy: 0 });
      if (sp.p <= 0) return;
      if (kind === 'f') face(t, sp.x, y - V(60, 60), V(74, 70), 360 + i, { s: sp.s, lx: -dx / 600, squeeze: [k.cult.w[4], k.cult.w[4] + 0.12] });
      else critter(kind, { cert: BL.red, folder: BL.sand, register: BL.green, idcard: BL.coral }[kind], sp.x, y, V(190, 180), { s: sp.s, open: t >= k.cult.w[4] && t < k.cult.w[4] + 0.12 ? 0 : (t > k.cult.w[4] ? 'happy' : blinkOpen(t, 370 + i)), ly: -0.6 });
    });
  }, { id: 'cultural', lid: true });
  sfx('crowd', tDes + 0.1, -2); sfx('blink', k.cult.w[4], -2);
}

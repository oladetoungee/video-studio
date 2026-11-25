/* Moment 06 (kit clip 7), Blink look: reciprocity. "Transparency runs both ways… If someone looks up my marriage record, do I
 * get to see that someone looked it up?" ~23 s. V(16:9, 9:16). Beats: ../MOMENTS.md. */
'use strict';

function buildMoment() {
  const k = PS({
    smart: 'another thing i find genuinely smart in estonia', idea: 'is the idea that your data being in the system',
    paired: 'is also paired with you being able to see what is happening to it', both: 'that transparency runs both ways',
    open: 'and i also think that if we are creating open data in africa', ask: 'we also need to ask the question of reciprocity',
    where: 'where is the reciprocity for the average individual',
    look: 'if someone looks up my marriage record', see: 'do i get to see that someone looked it up',
  });
  const tSys = k.idea.w[3] - 0.1, tBoth = k.both.w[1] - 0.15, tRec = k.ask.w[8] - 0.08, tLook = k.look.t - 0.08;
  const x = LX(), w = WX();

  /* camera */
  camSplit(-1);
  camSplit(tSys);
  camFull(k.open.t - 0.1, 1.28, 1.16); camPush(k.open.t, 3.2, 1.4, 1.24);
  camPunch(k.ask.w[6] - 0.1, 1.44, 1.3);
  camFull(k.where.w[3] - 0.1, 1.3, 1.18);
  camSplit(tLook);

  /* 1 · hook: someone looks up your marriage record. do you get to know? (a searcher looks; the record has no idea) */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      bmono('Ghana just put marriage records online.', x, V(170, 1130), V(24, 26), { key: 'ctx', col: BL.grey });
      head(t, -0.8, V(['Someone looks up', 'your marriage record.'], ['Someone looks up your', 'marriage record.']), x, V(270, 1214), V(56, 56), { col: BL.grey, weight: 500, id: 'hook-a' });
      head(t, -0.8, V(['Do you get', 'to *know?*'], ['Do you get to *know?*']), x, V(450, 1400), V(96, 84), { acc: BL.cobalt, id: 'hook' });
      const fx = V(x + 120, 220), fy = V(760, 1530), rx = V(x + 560, 800), ry = V(900, 1596);
      face(t, fx, fy, V(70, 76), 401, { lx: 1, ly: 0.2 });
      dotted(fx + V(86, 92), fy + 10, rx - V(90, 104), ry - V(80, 84), 0.3 + 0.7 * ease(t, -0.5, 0.8), BL.ink, 6, 14);
      critter('cert', BL.cobalt, rx, ry, V(170, 200), { open: blinkOpen(t, 402), lx: 0.5, ly: -0.6, key: 'my record' });
      bmono('My record', rx, ry + V(44, 42), V(20, 24), { align: 'center', key: 'my record label', col: BL.grey });
      tag2(t, k.smart.w[7] - 0.05);
    });
  }, { id: 'hook' });
  function tag2(t, t0) { if (!PORTRAIT) bub(t, t0, x + 220, 640, 'In Estonia, you can.', { size: 34, acc: BL.green, key: 'ee' }); }
  sfx('pop', 0.04, -8); sfx('pop', k.smart.w[7] - 0.05, -3);

  /* 2 · split: your data in the system, paired with you seeing what is happening to it (eyes both ways) */
  bshot(tSys, (t) => {
    wsplit(t, tSys, () => {
      head(t, tSys + 0.04, V(['Genuinely *smart* in Estonia:'], ['Genuinely *smart*', 'in Estonia:']), x, V(190, 1162), V(56, 72), { id: 'smart' });
      const ax = V(x + 110, 210), bx = V(x + 560, 810), cy = V(560, 1600);
      critter('idcard', BL.coral, ax, cy, V(180, 250), { s: popS(t, tSys + 0.06), open: blinkOpen(t, 411), lx: 0.9, key: 'you' });
      critter('register', BL.green, bx, cy, V(180, 250), { s: popS(t, tSys + 0.12), open: blinkOpen(t, 412), lx: -0.9, key: 'system' });
      bmono('You', ax, cy + V(44, -250), V(24, 28), { align: 'center', key: 'you l' }); bmono('The system', bx, cy + V(44, -250), V(24, 28), { align: 'center', key: 'sys l' });
      dotted(ax + V(110, 130), cy - V(140, 170), bx - V(110, 130), cy - V(140, 170), ease(t, k.idea.w[5], 0.5), BL.ink, 6, 14);
      withA(ease(t, k.idea.w[5] + 0.2, 0.3), () => bmono('Your data', (ax + bx) / 2, cy - V(160, 192), V(22, 26), { align: 'center', key: 'yourdata' }));
      dotted(bx - V(110, 130), cy - V(60, 80), ax + V(110, 130), cy - V(60, 80), ease(t, k.paired.w[4], 0.5), BL.cobalt, 6, 14);
      withA(ease(t, k.paired.w[8] - 0.05, 0.3), () => { const ys = cy - V(30, 40), fs_ = V(24, 26), mw = V(330, 330); fillRR((ax + bx) / 2 - mw / 2 - 14, ys - fs_ * 1.1, mw + 28, fs_ * 1.4 + fs_ * 1.4 + 10, 10, BL.card); bmono('You see what happens to it', (ax + bx) / 2, ys, fs_, { align: 'center', col: BL.cobalt, key: 'yousee', maxW: mw }); });
      check((ax + bx) / 2 - V(22, 26), cy - V(110, 146), V(44, 52), prog(t, k.paired.w[13], 0.3), BL.green);
    });
  }, { id: 'system' });
  sfx('whoosh', tSys + 0.04); sfx('pop', tSys + 0.06, -4); sfx('pop', tSys + 0.12, -4); sfx('pen', k.idea.w[5], -4); sfx('pen', k.paired.w[4], -4); sfx('tick', k.paired.w[13]);

  /* 3 · card (eyelid wipe): transparency runs both ways (a searcher and a record look at each other) */
  bcard(tBoth, (t) => {
    head(t, tBoth + 0.02, V(['Transparency runs *both ways.*'], ['Transparency', 'runs *both ways.*']), CX, V(300, 760), V(100, 100), { align: 'center', acc: BL.cobalt, id: 'both' });
    const fx = V(CX - 360, CX - 230), rx = V(CX + 360, CX + 230), yy = V(760, 1330);
    face(t, fx, yy - V(70, 70), V(90, 88), 421, { s: popS(t, tBoth + 0.1), lx: 1 });
    critter('cert', BL.cobalt, rx, yy, V(200, 200), { s: popS(t, tBoth + 0.16), open: blinkOpen(t, 422), lx: -1, key: 'both rec' });
    const p = E.outCubic(prog(t, k.both.w[3], 0.45)), ay = yy + V(80, 110), a0 = fx - V(40, 60), a1 = rx + V(40, 60);
    if (p > 0) { pline(lerp((a0 + a1) / 2, a0, p), ay, lerp((a0 + a1) / 2, a1, p), ay, 1, BL.ink, 6);
      if (p > 0.9) [[a1, 1], [a0, -1]].forEach(([hx, d]) => { ctx.beginPath(); ctx.moveTo(hx, ay); ctx.lineTo(hx - d * 26, ay - 18); ctx.lineTo(hx - d * 26, ay + 18); ctx.closePath(); ctx.fillStyle = BL.ink; ctx.fill(); }); }
  }, { id: 'both', lid: true });
  sfx('whoosh', k.both.w[3], -2);

  /* 4 · if we're creating open data in Africa, we also need to ask the question of… */
  bshot(k.open.t - 0.12, (t) => {
    if (t < k.ask.t - 0.1) bubPair(t, { s: 'If we’re creating', t: k.open.t, size: V(50, 46) }, { s: 'open data in *Africa*', t: k.open.w[9], size: V(56, 50) });
    else bubPair(t, { s: 'We also need to ask', t: k.ask.t - 0.08 }, { s: 'the question of…', t: k.ask.w[5] });
    const fp = popS(t, k.open.w[12] - 0.05) * (1 - prog(t, tRec - 0.2, 0.2)); if (fp > 0) withT(V(x + 120, 590), V(620, 1626), fp, 0, () => { flagB('ghana', -110, -36, 100); flagB('nigeria', 10, -30, 100); });
    peek(t, k.open.w[5], tRec, 'cert', BL.cobalt, { seed: 31, size: V(250, 200), open: t >= k.open.w[9] && t < k.open.w[9] + 0.5 ? 'happy' : undefined });
  }, { id: 'africa' });
  sfx('pop', k.open.t); sfx('pop', k.ask.t - 0.08);

  /* 5 · card (eyelid wipe): reciprocity (two characters swap looks) */
  bcard(tRec, (t) => {
    head(t, tRec + 0.02, ['*Reciprocity.*'], CX, V(460, 880), V(150, 132), { align: 'center', acc: BL.cobalt, id: 'recip' });
    const fx = V(CX - 220, CX - 200), rx = V(CX + 220, CX + 200), yy = V(760, 1260), sw = Math.sin((t - tRec) * 3) > 0 ? 1 : -1;
    face(t, fx, yy - 60, V(84, 80), 431, { s: popS(t, tRec + 0.06), lx: 1 });
    critter('idcard', BL.coral, rx, yy, V(210, 200), { s: popS(t, tRec + 0.1), open: blinkOpen(t, 432), lx: -1 });
  }, { id: 'recip', lid: true });
  sfx('pop', tRec + 0.06, -3);

  /* 6 · where is the reciprocity for the average individual? */
  bshot(k.where.w[3] - 0.1, (t) => {
    bubPair(t, { s: 'Where is the *reciprocity*', t: k.where.w[3] - 0.08, acc: BL.cobalt }, { s: 'for the average individual?', t: k.where.w[4] });
    face(t, V(W - 140, W - 150), V(860, 1200), V(60, 56), 441, { s: popS(t, k.where.w[6]), wake: k.where.w[7], lx: -1, ly: -0.3 });
  }, { id: 'where' });
  sfx('pop', k.where.w[3] - 0.08); sfx('pop', k.where.w[6], -4);

  /* 7 · split: someone looks up my marriage record -> do I get to see that? (illustration; no real record shown) */
  bshot(tLook, (t) => {
    wsplit(t, tLook, () => {
      const fx = V(x + 110, 190), fy = V(330, 1250), rx = V(x + 560, 760), ry = V(520, 1420);
      face(t, fx, fy, V(70, 84), 451, { s: popS(t, tLook + 0.04), wake: k.look.w[1], lx: 1, ly: 0.5 });
      bmono('Someone', fx, fy + V(110, 100), V(22, 24), { align: 'center', key: 'someone' });
      dotted(fx + V(80, 70), fy + 20, rx - V(100, 90), ry - V(90, 80), ease(t, k.look.w[2], 0.6), BL.ink, 6, 14);
      const turn = t >= k.see.w[4] ? -1 : 0.4;
      const seeP = t >= k.see.w[4] && t < k.see.w[9] ? 1 + 0.1 * Math.max(0, Math.sin(Math.PI * clamp((t - k.see.w[4]) / 0.35))) : 1;
      critter('cert', BL.cobalt, rx, ry, V(190, 250) * seeP, { s: popS(t, tLook + 0.1), open: t >= k.see.w[9] && t < k.see.w[9] + 0.5 ? 0.15 : blinkOpen(t, 452), lx: t >= k.see.w[4] && t < k.see.w[9] ? 0 : turn, ly: t >= k.see.w[4] && t < k.see.w[9] ? 0.1 : -0.5, key: 'my record' });
      bmono('My marriage record', rx, ry + V(44, 42), V(22, 24), { align: 'center', key: 'mine' });
      if (!PORTRAIT) { withA(0.6, () => bub(t, k.see.t - 0.1, x, 640, 'Someone looked up your record?', { size: 32, key: 'notif', fg: BL.grey })); withA(ease(t, k.see.t - 0.1, 0.3), () => bmono('What it could look like', x, 620, 20, { key: 'could' })); }
      head(t, k.see.t, V(['Do I get to *see* that?'], ['Do I get', 'to *see* that?']), x, V(860, 1530), V(66, 88), { acc: BL.cobalt, id: 'see' });
      illus(V(x + w, 940), V(200, 1150), 'right');
    });
  }, { id: 'lookup' });
  sfx('whoosh', tLook + 0.04); sfx('pen', k.look.w[2], -4); sfx('blink', k.see.w[4], -2); sfx('pop', k.see.t - 0.1);
}

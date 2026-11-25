/* Moment 07 (kit clip 8), Blink look: the close. "I really want African countries building this kind of infrastructure… as
 * people, we still need to probe it a little bit and question it." ~25 s. V(16:9, 9:16). Beats: ../MOMENTS.md. */
'use strict';

function buildMoment() {
  const k = PS({
    want: 'i really want african countries building this kind of infrastructure', solves: 'because i genuinely think it solves the problem',
    helps: 'technology helps when it comes to things like this',
    build: 'but i also think that if we want to build this kind of infrastructure', people: 'as people we still need to',
    probe: 'probe it a little bit and question it', head: "and that's what i've just been doing in my head",
    like: 'i really like the idea i read about it', cool: "it's super cool", love: 'i really love it',
    draw: 'but again just thinking about the drawbacks', every: 'and everything basically just running in my head',
  });
  const [c1, c2, c3] = cutTimes();
  const tWhy = k.solves.t - 0.08, tProbe = k.probe.t - 0.1, tEnd = c2;
  const x = LX(), w = WX();

  /* camera */
  camSplit(-1);
  camSplit(tWhy);
  camFull(c1, 1.28, 1.16); camPush(c1 + 0.05, 3.6, 1.42, 1.26);
  camFull(k.head.t - 0.1, 1.3, 1.18);
  camFull(k.like.t - 0.1, 1.26, 1.16); camPush(k.like.t, 3.4, 1.38, 1.24);
  camSplit(tEnd);

  /* 1 · hook: Ghana just put its marriage records online. I want African countries building this. And questioning it. */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      head(t, -0.8, ['Ghana just put its marriage records online.'], x, V(170, 1140), V(30, 34), { acc: BL.green, col: BL.grey, weight: 500, id: 'ctx' });
      head(t, -0.8, V(['I want African', 'countries', 'building *this.*'], ['I want African', 'countries building', '*this.*']), x, V(270, 1226), V(80, 76), { id: 'hook' });
      head(t, -0.6, ['And *questioning* it.'], x, V(560, 1476), V(56, 72), { acc: BL.cobalt, id: 'hook2' });
      flagB('ghana', x, V(640, 1530), V(110, 100)); flagB('nigeria', x + V(130, 120), V(640, 1530), V(110, 100));
      const cast = [['register', BL.green], ['cert', BL.red], ['folder', BL.sand]];
      cast.forEach(([sh, col], i) => pop(t, -0.7 + i * 0.05, sh, col, V(x + 340 + i * 150, 470 + i * 180), V(900, 1636), V(170, 140), { seed: 500 + i, open: 'happy' }));
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -8);

  /* 2 · split: why build it: it solves the problem; technology helps */
  bshot(tWhy, (t) => {
    wsplit(t, tWhy, () => {
      head(t, tWhy + 0.04, ['Why build it:'], x, V(190, 1172), V(64, 72), { id: 'why' });
      const rows = [['register', BL.green, 'It solves the problem', k.solves.w[2], k.solves.w[7]], ['idcard', BL.cobalt, 'Technology helps', k.helps.w[0] - 0.05, k.helps.w[1] + 0.1]];
      rows.forEach(([sh, col, s, t0, tk], i) => {
        const ry = V(300 + i * 200, 1230 + i * 180);
        pop(t, t0, sh, col, x + V(70, 80), ry + V(150, 160), V(140, 170), { seed: 510 + i, open: t > tk ? 'happy' : blinkOpen(t, 510 + i), lx: 0.9 });
        bub(t, t0 + 0.06, x + V(170, 200), ry + V(30, 40), s, { size: V(44, 54), tick: tk, key: 'why ' + i });
      });
      withA(ease(t, k.helps.w[2], 0.3), () => bmono('…when it comes to things like this', x, V(780, 1630), V(30, 32), { key: 'things', col: BL.grey }));
    });
  }, { id: 'why' });
  sfx('whoosh', tWhy + 0.04); sfx('pop', k.solves.w[2]); sfx('tick', k.solves.w[7]); sfx('pop', k.helps.w[0] - 0.05); sfx('tick', k.helps.w[1] + 0.1);

  /* 3 · but if we build this, as people we still need to… (faces squint: probing) */
  bshot(c1, (t) => {
    bubPair(t, { s: 'If we *build* this,', t: c1 + 0.05 }, { s: 'as people, we still need to…', t: k.people.t });
    peek(t, k.people.w[1], tProbe, 'cert', BL.red, { seed: 33 });
  }, { id: 'ifwe' });
  sfx('pop', c1 + 0.05); sfx('pop', k.people.t, -3);

  /* 4 · card (eyelid wipe): probe it. question it. (the searchers squint at the record) */
  bcard(tProbe, (t) => {
    head(t, tProbe + 0.02, V(['Probe it. *Question it.*'], ['Probe it.', '*Question it.*']), CX, V(300, 640), V(120, 120), { align: 'center', acc: BL.cobalt, id: 'probe' });
    const rx = CX, ry = V(900, 1420);
    critter('cert', BL.red, rx, ry, V(240, 320), { s: popS(t, tProbe + 0.08), open: blinkOpen(t, 521), ly: -0.5 });
    const fs = V([[-380, 760], [-250, 600], [250, 600], [380, 760]], [[-330, 1340], [-250, 1120], [250, 1120], [330, 1340]]);
    fs.forEach(([dx, fy], i) => { const l = lookAt(CX + dx, fy, rx, ry - 90); face(t, CX + dx, fy, V(64, 66), 530 + i, { s: popS(t, tProbe + 0.12 + i * 0.06), squeeze: [k.probe.w[6] - 0.05, k.probe.w[6] + 0.8], lx: l[0], ly: l[1] }); });
    withA(ease(t, k.head.w[1], 0.35), () => bmono('That’s what I’ve been doing in my head', CX, V(1010, 1540), V(30, 34), { align: 'center', key: 'myhead', col: BL.grey }));
  }, { id: 'probe', lid: true });
  sfx('crowd', tProbe + 0.12, -4); sfx('blink', k.probe.w[6] - 0.05, -2);

  /* 5 · I really like the idea. Super cool. I really love it. */
  bshot(k.like.t - 0.12, (t) => {
    if (t < k.love.t - 0.1) bubPair(t, { s: 'I really *like* the idea.', t: k.like.t - 0.1 }, { s: 'Super *cool.*', t: k.cool.w[1], size: V(56, 50) });
    else bubPair(t, { s: 'I really *love* it.', t: k.love.t - 0.08, size: V(70, 62) }, null);
    peek(t, k.like.w[3], null, 'folder', BL.sand, { open: 'happy', seed: 34 });
  }, { id: 'like' });
  sfx('pop', k.like.t - 0.1); sfx('pop', k.cool.w[1], -3); sfx('pop', k.love.t - 0.08);

  /* 6 · split: running in my head: I love the idea / the drawbacks; the channel */
  bshot(tEnd, (t) => {
    wsplit(t, tEnd, () => {
      head(t, tEnd - 0.34, ['Running in my head:'], x, V(190, 1166), V(64, 72), { id: 'running' });
      bub(t, tEnd - 0.34, x, V(260, 1206), 'I love the *idea*', { size: V(52, 58), tick: tEnd + 0.1, key: 'love idea' });
      bub(t, k.draw.w[6] - 0.05, x, V(380, 1330), 'And the *drawbacks*', { size: V(52, 58), acc: BL.red, key: 'drawbacks' });
      const cx_ = V(x + 520, 810), cy_ = V(640, 1636);
      critter('folder', BL.sand, cx_, cy_, V(190, 230), { s: popS(t, tEnd - 0.3), open: t > k.draw.w[6] ? 0.05 : 'happy', key: 'end record' });
      face(t, cx_ - V(150, 190), cy_ - V(60, 56), V(48, 56), 541, { s: popS(t, tEnd - 0.25), lx: 1 });
      handle(t, k.every.w[7] + 0.1, x, V(920, 1590));
    });
  }, { id: 'both' });
  sfx('whoosh', tEnd + 0.04); sfx('pop', k.draw.w[6] - 0.05); sfx('pop', k.every.w[7] + 0.1, -2);
}

/* Moment 01: the problem. "You can tell them the general vibe... but not the book itself."
 * ~37 s. Every position is V(16:9, 9:16). Beat plan: ../MOMENTS.md. Layout helpers: common.js. */
'use strict';

function buildMoment() {
  const k = PS({
    prob: 'so the problem is that you read a book', sit: 'you sit with it for some days some weeks',
    asks: 'and then someone asks you later', q: 'what is this book about',
    gist: 'and you can tell them the general gist', vibe: 'the general vibe of what the book is about',
    two: 'maybe one or two things that stuck out to you', pin: 'but you cannot really pinpoint', more: "you can't give them more information",
    feel: "it's almost as though you are left with the feeling about the book", itself: 'as opposed to the book itself',
    fix: 'so this method', fix2: 'is going to fix that', idea: 'the idea is that before you read the book', struct: 'you read the structure of the book first',
  });
  const [c1, c2, c3, c4, c5, c6] = cutTimes(); const tIdea = k.idea.w[4] - 0.4;   // the last split opens on "before you read the book"   // jump cuts: camera changes land on them
  const tGist = k.gist.w[5] - 0.42;               // the split opens just before "the general"

  /* ---------- camera ---------- */
  CAM(0, { z: V(1.24, 1.12), fx: V(0.71, null) });
  camFit(k.sit.t - 0.12, { fx: V(0.66, null) });
  CAM(k.asks.t, { z: V(1.14, 1.16), fx: V(0.69, null), d: 3.6, ease: 'sine' });
  camSplit(tGist);
  camFit(c1, { fx: V(0.66, null) });
  camPunch(k.pin.w[4] - 0.05, 1.32, 1.16, { fx: V(0.7, null) });                     // punch on "pinpoint"
  CAM(c2, { z: V(1.1, 1.08), fx: V(0.68, null) });
  CAM(c3, { z: V(1.18, 1.12), fx: V(0.69, null) });
  if (PORTRAIT) camSplit(k.fix.t - 0.1); else CAM(c5, { z: 1.24, fx: 0.7 });
  camSplit(tIdea);

  /* ---------- 1 · the problem: you read a book ---------- */
  shot(0, (t) => {
    plates2(t, { s: 'The problem:', times: [k.prob.w[1], k.prob.w[2]], plate: 'ink' }, { s: 'You read a *book.*', times: pick(k.prob, [5, 6, 7, 8]), plate: 'paper' }, { out: k.sit.t - 0.15 });
  }, { id: 'problem' });
  sfx('pop', k.prob.w[2] - 0.05); sfx('pop', k.prob.w[6] - 0.05, -2);

  /* ---------- 2 · days, weeks: a time meter ---------- */
  shot(k.sit.t - 0.12, (t) => {
    const x = LX(), y = V(330, 1196), w = V(800, 920);
    const p = sn(t, k.sit.t - 0.1, 0.4); if (p <= 0) return;
    withT(0, 40 * (1 - p), 1, 0, () => withA(clamp(p * 2), () => {
      rect(x - 34, y - 34, w + 68, V(330, 280), C.paper);
      tag(t, k.sit.t, 'Time with the book', x + 14, y + 12, { plate: 'ink' });
      const frac = E.outCubic(prog(t, k.sit.w[5], k.sit.w[8] - k.sit.w[5] + 0.5)), by = y + V(56, 52), bh = V(100, 80);
      strokeR(x, by, w, bh, C.blue, 5); rect(x + 12, by + 12, (w - 24) * frac, bh - 24, C.blue);
      KT(t, { lines: ['Days'], x, y: by + bh + V(100, 84), size: V(96, 76), times: [k.sit.w[6]], col: C.ink, id: 'days' });
      KT(t, { lines: ['*Weeks*'], x: x + w, align: 'right', y: by + bh + V(100, 84), size: V(96, 76), times: [k.sit.w[8]], acc: C.blue, id: 'weeks' });
    }));
  }, { id: 'days' });
  sfx('card', k.sit.t - 0.08); sfx('pop', k.sit.w[6]); sfx('pop', k.sit.w[8], 1);

  /* ---------- 3 · someone asks: "what is this book about?" ---------- */
  shot(k.asks.w[2] - 0.2, (t) => {
    const x = LX(), y = V(300, 1180), w = V(880, 920), h = V(300, 270);
    const p = sn(t, k.asks.w[2] - 0.15, 0.45); if (p <= 0) return;
    withT(0, 50 * (1 - p), 1, 0, () => withA(clamp(p * 2), () => {
      rect(x, y, w, h, C.card); rect(x, y, 14, h, C.blue);
      KT(t, { lines: ['Someone, later:'], x: x + 50, y: y + V(84, 78), size: V(52, 48), times: [k.asks.w[2], k.asks.w[5]], col: C.mid, id: 'who' });
      const s = 'So… what is this book about?';
      typeText(t, k.q.t - 0.05, s, x + 50, y + V(200, 190), F.body(V(62, 58), 700), C.ink, { cps: s.length / Math.max(0.6, k.q.e - k.q.t + 0.2), caretTo: tGist });
    }));
  }, { id: 'asks' });
  sfx('card', k.asks.w[2] - 0.15); sfx('type', k.q.t - 0.05, 0, { n: 16, d: +(k.q.e - k.q.t + 0.2).toFixed(3) });

  /* ---------- 4 · split: the general gist -> the general vibe -> one or two things ---------- */
  shot(tGist, (t) => {
    split(t, tGist, 'paper', () => {
      const x = LX();
      if (t < k.two.w[1] - 0.05) {
        const s = V(130, 110), y0 = V(SPLIT_Y() - 60, 1300), y1 = y0 + s * 1.04;
        KT(t, { lines: ['The general'], x, y: y0, size: s, times: pick(k.gist, [5, 6]), col: C.ink });
        const gw = tw('GIST.', F.disp(s), s * LS.disp);
        KT(t, { lines: ['gist.'], x, y: y1, size: s, times: [k.gist.w[7]], col: C.ink, id: 'gist' });
        strikeBar(x, y1 - s * 0.34, gw, prog(t, k.vibe.w[1], 0.3), C.ink, V(16, 14));
        KT(t, { lines: ['~vibe.~'], font: 'serif', x: x + gw + V(44, 36), y: y1, size: s * 1.32, times: [k.vibe.w[2]], acc: C.blue });
        withA(prog(t, k.vibe.w[4], 0.3), () => mono('of what the book is about', x, y1 + V(110, 100), V(30, 32), C.mid, 'left', { key: 'about', fixed: true }));
      } else {
        KT(t, { lines: ['One or *two* things'], font: 'body', x, y: V(330, 1262), size: V(76, 70), times: pick(k.two, [1, 2, 3, 4]), col: C.ink, acc: C.blue, id: 'one-two' });
        IDX(t, [{ n: '01', s: 'Stuck out', tin: k.two.w[6] }, { n: '02', s: 'Stuck out', tin: k.two.w[7] }],
          { x, y: V(500, 1400), w: V(680, 920), rowH: V(150, 116), size: V(96, 84), numSize: V(34, 34) });
        withA(prog(t, k.two.w[9] + 0.1, 0.3), () => mono('…and that is all', x, V(830, 1625), V(30, 32), C.blue, 'left', { key: 'thatsit', fixed: true }));
      }
    });
  }, { id: 'gist' });
  sfx('whoosh', tGist + 0.04); sfx('hitS', k.gist.w[7]); sfx('mark', k.vibe.w[1]); sfx('pop', k.vibe.w[2]);
  sfx('tick', k.two.w[6]); sfx('tick', k.two.w[7]);

  /* ---------- 5 · you can't pinpoint it / more information: nothing comes ---------- */
  shot(c1, (t) => {
    plates2(t, { s: 'You can’t', times: [k.pin.w[1], k.pin.w[2]], plate: 'paper' }, { s: '*pinpoint* it.', times: [k.pin.w[4], k.pin.w[4] + 0.15], plate: 'paper' }, { out: c2 - 0.3 });
    if (t >= c2) {
      const fx = LX(), fy = V(420, 1236), fw = V(800, 920), fh = V(150, 140), f = F.body(V(80, 76), 700);
      const p = sn(t, c2 + 0.02, 0.4);
      withT(0, 40 * (1 - p), 1, 0, () => withA(clamp(p * 2), () => {
        tag(t, c2 + 0.02, 'More information:', fx + 14, fy - 30, { plate: 'ink' });
        rect(fx, fy, fw, fh, C.card); strokeR(fx, fy, fw, fh, C.ink, 5);
        const ts = '.'.repeat(Math.floor(clamp((t - k.more.w[4]) / 0.9) * 3)), tx = fx + 40;   // the dots type on, slowly
        _txt(ts, tx, fy + fh / 2 + 22, f, C.ink);
        if (Math.floor(t * 2.4) % 2 === 0 || t < k.more.w[4]) rect(tx + tw(ts, f) + 6, fy + 32, 7, fh - 64, C.ink);
        strikeBar(tx, fy + fh / 2 + 4, Math.max(60, tw(ts, f)), prog(t, k.more.w[5] + 0.3, 0.3), C.ink, 10);
        withA(prog(t, k.more.w[5] + 0.3, 0.3), () => mono('nothing comes', fx + fw - 30, fy + fh / 2 + 12, V(32, 34), C.mid, 'right', { key: 'nothing', fixed: true }));
      }));
    }
  }, { id: 'pinpoint' });
  sfx('pop', k.pin.w[1]); sfx('hit', k.pin.w[4], -3); sfx('card', c2 + 0.02); sfx('tick', k.more.w[4] + 0.3, -3); sfx('mark', k.more.w[5] + 0.3, -2);

  /* ---------- 6 · card: left with the feeling, not the book ---------- */
  card(k.feel.w[4] - 0.1, 'ink', (t) => {
    const x = V(150, 80);
    KT(t, { lines: V(['You’re left with'], ['You’re left', 'with']), x, y: V(300, 560), size: V(104, 116), times: pick(k.feel, [4, 6, 7]), col: C.paper });
    KT(t, { lines: ['the ~feeling~'], x, y: V(500, 860), size: V(170, 150), times: pick(k.feel, [8, 9]), col: C.paper, acc: C.blueT });
    KT(t, { lines: V(['about the book,'], ['about the', 'book,']), x, y: V(650, 1020), size: V(104, 116), times: pick(k.feel, [10, 11, 12]), col: C.paper });
    KT(t, { lines: V(['not the book itself.'], ['not the book', 'itself.']), x, y: V(860, 1330), size: V(84, 96), times: [k.itself.w[0], k.itself.w[3], k.itself.w[4], k.itself.w[5]], col: C.inkMid });
  }, { id: 'feeling' });
  sfx('cut', k.feel.w[4] - 0.1); sfx('mark', k.feel.w[9] + 0.32); sfx('pop', k.itself.w[5], -4);

  /* ---------- 7 · this method fixes that ---------- */
  shot(k.fix.t - 0.1, (t) => {
    if (PORTRAIT) { split(t, k.fix.t - 0.1, 'ink', () => KT(t, { lines: ['This method', '…is going to'], x: LX(), y: 1330, size: 110, times: [k.fix.w[1], k.fix.w[2], k.fix2.w[0], k.fix2.w[1], k.fix2.w[2]], col: C.paper, id: 'method9' })); return; }
    plates2(t, { s: 'This method', times: [k.fix.w[1], k.fix.w[2]], plate: 'ink' }, { s: '…is going to', times: [k.fix2.w[0], k.fix2.w[1], k.fix2.w[2]], plate: 'paper', size: V(84, 72) }, { size: V(124, 100) });
  }, { id: 'method' });
  sfx('pop', k.fix.w[1]); sfx('pop', k.fix2.w[1], -4);
  card(k.fix2.w[3] - 0.08, 'blue', (t) => {
    KT(t, { lines: V(['Fixes that.'], ['Fixes', 'that.']), x: CX, align: 'center', y: V(620, 860), size: V(270, 250), times: [k.fix2.w[3], k.fix2.w[4]] });
  }, { id: 'fixes' });
  sfx('hit', k.fix2.w[3] - 0.04, -2);

  /* ---------- 8 · split: the idea, read the structure first ---------- */
  shot(tIdea, (t) => {
    split(t, tIdea, 'ink', () => {
      const x = LX(), s = V(124, 110);
      KT(t, { lines: ['Before you read the book,'], font: 'body', x, y: V(270, 1262), size: V(64, 54), times: [tIdea + 0.22, tIdea + 0.28, k.idea.w[6], k.idea.w[7], k.idea.w[8]], col: C.paper, id: 'before-read' });

      const y0 = V(450, 1390);
      KT(t, { lines: ['Read the'], x, y: y0, size: s, times: [k.struct.w[1], k.struct.w[2]], col: C.paper });
      KT(t, { lines: ['*structure*'], x, y: y0 + s * 1.02, size: s, times: [k.struct.w[3]], acc: C.blueT });
      const yf = y0 + s * 2.04;
      KT(t, { lines: ['first.'], x, y: yf, size: s, times: [k.struct.w[7]], col: C.paper });
      handLine(x, yf + 24, tw('FIRST.', F.disp(s), s * LS.disp), E.outCubic(prog(t, k.struct.w[7] + 0.2, 0.35)), C.blueT, 9, 3);
    });
  }, { id: 'structure' });
  sfx('whoosh', tIdea + 0.02); sfx('hitS', k.struct.w[3]); sfx('hitS', k.struct.w[7], -2); sfx('mark', k.struct.w[7] + 0.2, -3);
}

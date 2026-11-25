/* Moment 05: chapter one is a question. "What does it mean to be critical?"  ~42.5 s. V(16:9, 9:16).
 * The contents rows are the real chapter titles of How to Read and Write Critically (as she reads them in the video).
 * From ~20 s she holds the book at chest height (it reads backwards in the mirrored source): those beats use the lower
 * band (16:9) / split (9:16), whose panel covers it. */
'use strict';

function buildMoment() {
  const k = PS({
    first: 'so the first thing you notice', ch1: 'is that chapter one is a question', what: 'what does it mean to be critical',
    which: 'which means that the author thinks', assume: 'at least i am assuming', main: 'that the main problem to start with',
    noone: 'is that no one has actually defined the word for you', every: 'so everybody keeps saying you should be critical', think: 'you should think critically',
    blah: 'blah blah blah', fix: "but this author i'm assuming starts by fixing the definition", head: "so in my head i'm already thinking",
    chal: 'am i going to be challenged by the definition', give: 'this person is going to give of what it means to be critical',
    get: 'is it that i get challenged', sup: 'or the idea i have in my head gets supported by this author', fwd: "so i'm already looking forward to that",
  });
  const tCh = k.ch1.w[2] - 0.35, tDef = k.noone.w[2] - 0.3, tFix = k.fix.t - 0.1;

  /* camera */
  CAM(0, PORTRAIT ? { z: 0.88, fy: 0.34, pad: true } : { z: 1.2, fx: 0.72 });
  camSplit(tCh);
  CAM(k.assume.t - 0.1, { z: V(1.16, 1.1), fx: V(0.73, null) });
  CAM(k.assume.t, { z: V(1.24, 1.16), fx: V(0.73, null), d: 3, ease: 'sine' });
  camSplit(tDef);
  camBand(tFix);
  CAM(k.fix.w[7] - 0.06, PORTRAIT ? { z: 0.94, fy: 0.34, pad: true } : { z: 1.22, fy: 0.38 });          // punch on "fixing"
  camBand(k.head.t - 0.1);
  CAM(k.head.t + 0.5, PORTRAIT ? { z: 1.0, fy: 0.34, pad: true, d: k.fwd.t - k.head.t - 1.0, ease: 'sine' } : { z: 1.26, fy: 0.38, d: k.fwd.t - k.head.t - 1.0, ease: 'sine' });   // slow push while she thinks

  /* 1 · the book: a polaroid of the (correctly oriented) cover */
  shot(0, (t) => {
    if (!PORTRAIT) {
      polaroidIn(t, 0.05, IMG.baratta, 380, 520, 440, -0.05, 'How to Read and Write Critically', { capSize: 18, from: 220 });
      tag(t, k.first.w[2], 'The first thing you notice', 120, 960, { plate: 'ink' });
    } else split(t, -1, 'paper', () => {
      polaroidIn(t, 0.05, IMG.baratta, 270, 1400, 380, -0.05, 'How to Read and Write Critically', { capSize: 13, from: 220 });
      KT(t, { lines: ['The first thing', 'you *notice:*'], font: 'body', x: 500, y: 1330, size: 56, times: [0.12, 0.2, k.first.w[2], k.first.w[3], k.first.w[4], k.first.w[5]], col: C.ink, acc: C.blue, id: 'notice' });
    });
  }, { id: 'book' });
  sfx('card', 0.05);

  /* 2 · split: the contents, chapter one is a question */
  shot(tCh, (t) => {
    split(t, PORTRAIT ? -1 : tCh, 'paper', () => {
      const x = V(LX(), 70), cw = V(720, W - 140), size = V(36, 42);
      const rows = [
        { n: 1, s: 'What does it mean to be critical?', tin: tCh + 0.3 },
        { n: 2, s: 'Different ways to show…', tin: tCh + 0.36, dim: true },
        { n: 3, s: 'Understanding the score band…', tin: tCh + 0.42, dim: true },
      ];
      KT(t, { lines: V(['Chapter one is', 'a ~question.~'], ['Chapter one is a ~question.~']), font: 'body', x: V(x, 80), y: V(230, 1262), size: V(80, 62), times: [k.ch1.w[2], k.ch1.w[3], k.ch1.w[4], k.ch1.w[5], k.ch1.w[6]], col: C.ink, acc: C.blue, id: 'question' });
      const cy = V(420, 1300), headH = V(84, 70), rowH = V(92, 84);
      contentsCard(t, tCh + 0.1, x, cy, cw, rows, { size, rowH, headH, mark: { i: 0, t: k.ch1.w[6] } });
      const qx = x + 110 + tw('What does it mean to be critical', F.body(size, 700)) + size * 0.28, qy = cy + headH + rowH * 0.62 - size * 0.35;
      handCircle(qx, qy, size * 0.75, size * 0.85, E.outCubic(prog(t, k.what.w[6], 0.45)), C.blue, 6);
    });
  }, { id: 'contents' });
  sfx('whoosh', tCh + 0.04); sfx('card', tCh + 0.1); sfx('mark', k.ch1.w[6]); sfx('mark', k.what.w[6], -2);

  /* 3a · card: so the author thinks… (she lifts the book here; the card covers it) */
  card(k.which.t - 0.05, 'ink', (t) => {
    KT(t, { lines: V(['So the author', '*thinks…*'], ['So the', 'author', '*thinks…*']), x: L, y: V(450, 760), size: V(160, 150), times: [k.which.t, k.which.w[2], k.which.w[3], k.which.w[5]], col: C.paper, acc: C.blueT, id: 'thinks' });
  }, { id: 'thinks' });
  sfx('cut', k.which.t - 0.05); sfx('hitS', k.which.w[5], -3);

  /* 3 · the author thinks (my guess): the main problem */
  shot(k.assume.t - 0.1, (t) => {
    tag(t, k.assume.t, 'My guess', LX() + 14, V(320, 1196), { plate: 'ink' });
    plateText(t, { lines: ['The main *problem:*'], x: LX(), y: V(470, 1322), size: V(112, 92), plate: 'paper', times: pick(k.main, [1, 2, 3]) });
  }, { id: 'guess' });
  sfx('pop', k.which.w[4], -3); sfx('pop', k.assume.t, -3); sfx('pop', k.main.w[3]);

  /* 4 · split: no one has defined the word (an empty definition) */
  shot(tDef, (t) => {
    split(t, tDef, 'paper', () => {
      const x = LX();
      KT(t, { lines: V(['No one has', '*defined*', 'the word:'], ['No one has *defined*', 'the word:']), x, y: V(250, 1262), size: V(96, 76), times: pick(k.noone, [2, 3, 4, 6, 7, 8]), col: C.ink, acc: C.blue, id: 'defined' });
      const dp = sn(t, k.noone.w[8], 0.45); if (dp <= 0) return;
      const dx = x, dy = V(560, 1400), dw = V(760, W - 160), dh = V(330, 230);
      withT(0, 40 * (1 - dp), 1, 0, () => withA(clamp(dp * 2), () => {
        rect(dx, dy, dw, dh, C.card); strokeR(dx, dy, dw, dh, C.ink, 4);
        _txt('critical', dx + 40, dy + V(110, 90), F.serif(V(104, 84)), C.ink);
        _mono('ADJ.', dx + 50 + tw('critical', F.serif(V(104, 84))), dy + V(104, 84), V(28, 30), C.mid, 'left', { ls: 0.12 });
        mono('definition', dx + 40, dy + V(170, 140), V(28, 30), C.mid, 'left', { key: 'definition', fixed: true });
        rect(dx + 40, dy + V(200, 160), dw * 0.6 * E.outCubic(prog(t, k.noone.w[9], 0.4)), V(16, 14), '#D8D1C4');
        rect(dx + 40, dy + V(236, 192), dw * 0.42 * E.outCubic(prog(t, k.noone.w[9] + 0.15, 0.4)), V(16, 14), '#D8D1C4');
        slam(t, k.noone.w[10] + 0.2, '?', dx + dw - V(70, 60), dy + dh - V(50, 40), V(160, 120), { col: C.blue, align: 'right', key: 'q' });
      }));
    });
  }, { id: 'defined' });
  sfx('whoosh', tDef + 0.04); sfx('pop', k.noone.w[6]); sfx('card', k.noone.w[8]); sfx('hitS', k.noone.w[10] + 0.2, -2);

  /* 5 · card: everybody keeps saying... */
  card(k.every.t - 0.1, 'paper', (t) => {
    const x = L, s = V(120, 104);
    KT(t, { lines: V(['Everybody keeps saying:'], ['Everybody', 'keeps saying:']), x: x + 4, y: V(250, 520), size: V(96, 92), times: [k.every.t + 0.02, k.every.t + 0.08, k.every.t + 0.14], col: C.mid, id: 'everybody' });
    const dimAt = [k.think.w[2] - 0.1, k.blah.t - 0.1];
    KT(t, { lines: ['Be critical.'], x, y: V(420, 760), size: s, times: [k.every.w[6], k.every.w[7]], col: t > dimAt[0] ? '#B9B2A6' : C.ink, id: 'be' });
    KT(t, { lines: V(['Think critically.'], ['Think', 'critically.']), x, y: V(420 + s * 1.05, 760 + s * 1.05), size: s, times: [k.think.w[2], k.think.w[3]], col: t > dimAt[1] ? '#B9B2A6' : C.ink, id: 'think' });
    KT(t, { lines: V(['*Blah, blah, blah.*'], ['*Blah, blah,*', '*blah.*']), x, y: V(420 + s * 2.1, 760 + s * 3.15), size: s, times: k.blah.w, acc: C.blue, id: 'blah' });
  }, { id: 'everybody', grid: true });
  sfx('cut', k.every.t - 0.1); sfx('pop', k.every.w[7]); sfx('pop', k.think.w[3]); sfx('hitS', k.blah.w[0]); sfx('tick', k.blah.w[1]); sfx('tick', k.blah.w[2]);

  /* 6 · band: this author starts by fixing the definition */
  shot(tFix, (t) => {
    band(t, tFix, 'ink', () => {
      const x = LX();
      tag(t, k.fix.w[4], 'I’m assuming', x + 14, V(BAND_Y - 14, 1196), { plate: 'paper' });
      KT(t, { lines: V(['This author *fixes* the definition.'], ['This author', '*fixes* the', 'definition.']), x, y: V(BAND_Y + 130, 1340), size: V(80, 100), times: [k.fix.w[1], k.fix.w[2], k.fix.w[7], k.fix.w[8], k.fix.w[9]], col: C.paper, acc: C.blueT, id: 'fixes' });
    });
  }, { id: 'fixes' });
  sfx('whoosh', tFix + 0.04); sfx('pop', k.fix.w[2]); sfx('hit', k.fix.w[7], -4);

  /* 7 · band: challenged? or supported? */
  // she lifts the (mirrored) book beside her face from ~"challenged" to ~"or the idea": a full card covers that stretch
  const tC0 = k.chal.w[5] - 0.08, tC1 = k.sup.t - 0.08;
  shot(k.head.t - 0.12, (t) => {
    if (t >= tC0 && t < tC1) {
      rect(0, 0, W, H, C.ink);
      const x = V(330, 80), w = V(1260, W - 160), h = V(190, 170), f = F.disp(V(110, 88));
      KT(t, { lines: ['In my head:'], font: 'body', x, y: V(290, 640), size: V(60, 60), times: [tC0, tC0, tC0], col: C.inkMid, id: 'head-card' });
      ['CHALLENGED?', 'SUPPORTED?'].forEach((label, i) => {
        const oy = V(360 + i * 230, 720 + i * 210), hot = i === 0;
        const pu = i === 0 ? Math.sin(Math.PI * clamp((t - k.get.w[5]) / 0.35)) * (t > k.get.w[5] ? 1 : 0) : 0;
        withT(x + w / 2, oy + h / 2, 1 + 0.05 * pu, 0, () => withT(-x - w / 2, -oy - h / 2, 1, 0, () => {
          rect(x, oy, w, h, hot ? C.card : C.inkPanel); strokeR(x, oy, w, h, hot ? C.card : C.inkLine, 3);
          checkbox(x + 50, oy + h / 2 - 30, 60, 0, C.blue);
          _txt(label, x + 150, oy + h / 2 + V(38, 30), f, hot ? C.ink : C.paper, 'left', 'alphabetic', -2);
          if (hot) handLine(x + 150, oy + h / 2 + V(62, 52), tw(label, f, -2), E.outCubic(prog(t, k.chal.w[5] + 0.15, 0.35)), C.blue, 8, 2);
        }));
      });
      slam(t, k.give.w[11], '?', x + w - 50, V(360, 720) + h / 2 + V(44, 36), V(150, 120), { col: C.blue, align: 'right', key: 'q-card' });
      beat(t, k.give.w[3], 1e9, () => mono('…by their definition of “critical”', x, V(880, 1170), V(34, 36), C.blueT, 'left', { key: 'by-def-card', fixed: true }));
      return;
    }
    band(t, t >= tC1 ? -1 : k.head.t - 0.12, 'ink', () => {
      const x = LX();
      KT(t, { lines: ['In my head:'], font: 'body', x, y: V(BAND_Y - 4, 1250), size: V(48, 54), times: [k.head.t + 0.15, k.head.t + 0.2, k.head.t + 0.25], col: C.inkMid, id: 'head' });
      const opt = (i, t0, label, hot, tHot) => {
        const p = sn(t, t0, 0.45); if (p <= 0) return;
        const w = V(800, W - 160), h = V(150, 140), ox = V(x + i * 860, x), oy = V(BAND_Y + 40, 1300 + i * 166);
        const pu = i === 0 ? Math.sin(Math.PI * clamp((t - k.get.w[5]) / 0.35)) * (t > k.get.w[5] ? 1 : 0) : 0;   // pulse on "get challenged"
        withT(ox + w / 2, oy + h / 2 + 40 * (1 - p), 1 + 0.06 * pu, 0, () => withT(-ox - w / 2, -oy - h / 2, 1, 0, () => withA(clamp(p * 2), () => {
          rect(ox, oy, w, h, hot ? C.card : C.inkPanel); strokeR(ox, oy, w, h, hot ? C.card : C.inkLine, 3);
          checkbox(ox + 40, oy + h / 2 - 24, 48, 0, C.blue);
          _txt(label, ox + 120, oy + h / 2 + 24, F.disp(V(72, 68)), hot ? C.ink : C.paper, 'left', 'alphabetic', -1.5);
          if (hot) handLine(ox + 120, oy + h / 2 + 44, tw(label, F.disp(V(72, 68)), -1.5), E.outCubic(prog(t, tHot + 0.15, 0.35)), C.blue, 7, i + 2);
        })));
      };
      const hotA = (t >= k.chal.w[5] && t < k.sup.t - 0.1);
      opt(0, k.head.t + 0.2, 'CHALLENGED?', hotA, k.chal.w[5]);
      if (!PORTRAIT || true) { const qx = V(x + 800 - 70, x + W - 160 - 70), qy = V(BAND_Y + 40 + 118, 1300 + 118); slam(t, k.give.w[11], '?', qx, qy, V(110, 100), { col: C.blueT, key: 'q2', out: k.sup.w[9] - 0.1 }); }
      opt(1, k.head.t + 0.3, 'SUPPORTED?', t >= k.sup.w[9], k.sup.w[9]);
      beat(t, k.give.w[3], k.sup.t - 0.1, () => mono('…by their definition of “critical”', V(x + 300, x), V(BAND_Y - 6, 1640), V(30, 34), C.blueT, 'left', { key: 'by-def', fixed: true }));
      beat(t, k.sup.w[2], 1e9, () => mono('…or the idea already in my head', V(x + 300, x), V(BAND_Y - 6, 1640), V(30, 34), C.blueT, 'left', { key: 'my-idea', fixed: true }));
    });
  }, { id: 'challenged' });
  sfx('whoosh', k.head.t - 0.1); sfx('card', k.head.t + 0.2); sfx('cut', tC0); sfx('mark', k.chal.w[5] + 0.15, -4); sfx('cut', tC1); sfx('mark', k.chal.w[5] + 0.15, -3); sfx('pop', k.chal.w[7], -5); sfx('tick', k.get.w[5]); sfx('pop', k.give.w[11], -3); sfx('tick', k.sup.w[9], -2); sfx('mark', k.sup.w[9] + 0.15, -3);

  /* 8 · card: already looking forward to that */
  card(k.fwd.w[2] - 0.08, 'ink', (t) => {
    KT(t, { lines: V(['Already looking', '*forward* to it.'], ['Already', 'looking', '*forward*', 'to it.']), x: L, y: V(430, 640), size: V(150, 150), times: [k.fwd.w[2], k.fwd.w[3], k.fwd.w[4], k.fwd.w[5], k.fwd.w[6]], col: C.paper, acc: C.blueT, id: 'forward' });
  }, { id: 'forward', grid: true });
  sfx('cut', k.fwd.w[2] - 0.08); sfx('hitS', k.fwd.w[4]);
}

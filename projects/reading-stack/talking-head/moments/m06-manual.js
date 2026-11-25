/* Moment 06: a manual masquerading as a textbook (Convivial Toolbox).  ~37.9 s. V(16:9, 9:16).
 * Part names and page counts are what she reads out: part one ~80 pages, part two 50, part three over 140.
 * She holds the book at chest height during "page number" and "very practical" (it reads backwards in the mirrored
 * source): those beats use the lower band (16:9) / split (9:16), whose panel covers it. */
'use strict';

function buildMoment() {
  const k = PS({
    parts: 'it has three parts', p1: 'part one is kind of like basics the underlying principle', p2: 'and then we have part two cases from practice',
    p3: 'and then part three is the tools and the techniques', page: 'also keep in mind the page number', tells: 'it also tells you something',
    ex: 'for example in this book', n80: 'part one is about 80 pages', n50: 'part two is 50 pages', n140: 'and part three is over 140 pages',
    half: 'so more than half the book is the howto section', theory: 'so even though it opens with the theory',
    prac: 'i already know that this is a very practical book', manual: "it's pretty much a manual that is masquerading as a textbook",
  });
  const tParts = k.p1.t - 0.15, tPage = k.page.t - 0.1, tBars = k.ex.t - 0.1, tTheory = k.theory.t - 0.1;

  /* camera */
  CAM(0, PORTRAIT ? { z: 0.88, fy: 0.34, pad: true } : { z: 1.22, fx: 0.72 });
  camSplit(tParts);
  CAM(k.p1.w[9], PORTRAIT ? { z: 0.96, fy: 0.34, pad: true, d: 5, ease: 'sine' } : { z: 1.5, fx: 0.76, d: 5, ease: 'sine' });   // slow push while the parts build
  camBand(tPage);
  CAM(k.page.w[5] - 0.05, PORTRAIT ? { z: 0.96, fy: 0.34, pad: true } : { z: 1.22, fy: 0.38 });     // punch on "page"
  camSplit(tBars);
  camBand(tTheory);
  CAM(k.theory.t + 0.3, PORTRAIT ? { z: 0.98, fy: 0.34, pad: true, d: 4, ease: 'sine' } : { z: 1.24, fy: 0.38, d: 4, ease: 'sine' });

  /* 1 · the book (polaroid), three parts */
  shot(0, (t) => {
    if (!PORTRAIT) {
      polaroidIn(t, 0.0, IMG.convivial, 360, 450, 420, -0.05, 'Convivial Toolbox', { capSize: 20, from: 220 });
      plateText(t, { lines: ['Three *parts.*'], x: LX(), y: 900, size: 110, plate: 'ink', times: [k.parts.w[2], k.parts.w[3]] });
    } else split(t, -1, 'paper', () => {
      polaroidIn(t, 0.0, IMG.convivial, 270, 1400, 380, -0.05, 'Convivial Toolbox', { capSize: 14, from: 220 });
      KT(t, { lines: ['It has', 'three', '*parts.*'], x: 520, y: 1330, size: 92, times: [0.1, k.parts.w[1], k.parts.w[2], k.parts.w[3]], col: C.ink, acc: C.blue, id: 'three' });
    });
  }, { id: 'book' });
  sfx('card', 0.0); sfx('hitS', k.parts.w[2]);

  /* 2 · split: the three parts build */
  shot(tParts, (t) => {
    split(t, PORTRAIT ? -1 : tParts, 'paper', () => {
      const x = LX();
      const rows = [
        { n: 'P1', s: 'Basics', tin: tParts + 0.3, tag: { t: k.p1.w[8], s: 'the underlying principles', col: C.mid } },
        { n: 'P2', s: 'Cases from practice', tin: k.p2.w[5] },
        { n: 'P3', s: 'Tools & techniques', tin: k.p3.w[3], col: C.blue },
      ];
      KT(t, { lines: ['Three parts:'], font: 'body', x, y: V(230, 1250), size: V(64, 60), times: [tParts + 0.2, tParts + 0.3], col: C.mid, id: 'parts-head' });
      const focus = (tt) => (tt < k.p2.w[8] ? -1 : tt < k.p3.w[3] ? 1 : 2);
      IDX(t, rows, V({ x, y: 430, w: 730, rowH: 160, size: 56, subBelow: true, subDy: 52, subSize: 30, numW: 110, numSize: 34, focus, dimA: 0.45 },
                      { x, y: 1360, w: W - 160, rowH: 122, size: 66, numW: 100, numSize: 32, subBelow: true, subDy: 42, subSize: 26, focus, dimA: 0.45 }));
    });
  }, { id: 'parts' });
  sfx('whoosh', tParts + 0.04); sfx('tick', k.p1.w[1]); sfx('tick', k.p2.w[5]); sfx('tick', k.p3.w[3]);

  /* 3 · band: keep in mind the page numbers */
  shot(tPage, (t) => {
    band(t, PORTRAIT ? -1 : tPage, 'ink', () => {
      const x = LX();
      KT(t, { lines: V(['Keep in mind the *page numbers.*'], ['Keep in mind', 'the *page*', '*numbers.*']), x, y: V(BAND_Y + 60, 1300), size: V(84, 100), times: [tPage + 0.22, tPage + 0.26, tPage + 0.3, k.page.w[4], k.page.w[5], k.page.w[6]], col: C.paper, acc: C.blueT, id: 'pages' });
      tag(t, k.tells.w[2], 'They tell you something', x + 14, V(BAND_Y + 190, 1630), { plate: 'paper' });
    });
  }, { id: 'pages' });
  sfx('whoosh', tPage + 0.04); sfx('pop', k.page.w[1]); sfx('hitS', k.page.w[5]); sfx('pop', k.tells.w[2], -4);

  /* 4 · split: the page counts as bars; more than half is the how-to section */
  shot(tBars, (t) => {
    split(t, PORTRAIT ? -1 : tBars, 'ink', () => {
      const x = LX(), bw = V(540, 680), max = 140;
      if (!PORTRAIT) KT(t, { lines: ['Pages per part:'], font: 'body', x, y: 230, size: 64, times: [tBars + 0.2, tBars + 0.25, tBars + 0.3], col: C.inkMid, id: 'ppp' });
      else {
        beat(t, tBars, k.half.w[1] - 0.05, () => KT(t, { lines: ['Pages per part:'], font: 'body', x, y: 1250, size: 60, times: [tBars + 0.2, tBars + 0.25, tBars + 0.3], col: C.inkMid, id: 'ppp' }));
        beat(t, k.half.w[1] - 0.05, k.half.w[7] - 0.05, () => KT(t, { lines: ['More than *half* the book'], font: 'body', x, y: 1250, size: 60, times: pick(k.half, [1, 2, 3, 4, 5]), col: C.paper, acc: C.blueT, id: 'half9' }));
        beat(t, k.half.w[7] - 0.05, 1e9, () => KT(t, { lines: ['…is the ~how-to~ section.'], font: 'body', x, y: 1250, size: 60, times: [k.half.w[6], k.half.w[7], k.half.w[8], k.half.w[9]], col: C.paper, acc: C.blueT, id: 'howto9' }));
      }
      const ys = V([380, 570, 760], [1360, 1470, 1580]); const g0 = g; g = G.ink;
      const o = (col) => ({ col, h: V(72, 52), valSize: V(76, 60), labSize: V(30, 34), labelFrom: tBars + 0.3 });
      barRow(t, k.n80.w[4] - 0.1, x, ys[0], bw, 80 / max, 'Part 1 · basics', '~80', o(C.paper));
      barRow(t, k.n50.w[3] - 0.1, x, ys[1], bw, 50 / max, 'Part 2 · cases', '50', o(C.paper));
      barRow(t, k.n140.w[5] - 0.25, x, ys[2], bw, 140 / max, 'Part 3 · tools', '140+', o(C.blueT));
      g = g0;
      if (!PORTRAIT) {   // more than half the book: an orange bracket under part 3, then "the how-to section"
        const hp = prog(t, k.half.w[3], 0.4);
        if (hp > 0) { const yb = ys[2] + 70; hline(x, yb, bw * E.outExpo(hp), C.blueT, 7); withA(hp, () => mono('More than half the book', x, yb + 44, 30, C.blueT, 'left', { key: 'half', fixed: true })); }
        KT(t, { lines: ['The ~how-to~ section.'], font: 'body', x, y: 990, size: 64, times: [k.half.w[7], k.half.w[8], k.half.w[9]], col: C.paper, acc: C.blueT });
      } else {
        const hp = prog(t, k.half.w[3], 0.4); if (hp > 0) hline(x, ys[2] + 46, bw * E.outExpo(hp), C.blueT, 6);
      }
    });
  }, { id: 'bars' });
  sfx('whoosh', tBars + 0.04); sfx('tick', k.n80.w[4]); sfx('tick', k.n50.w[3]); sfx('hitS', k.n140.w[5]); sfx('mark', k.half.w[3]); sfx('pop', k.half.w[8], -3);

  /* 5 · band: opens with theory, very practical */
  shot(tTheory, (t) => {
    band(t, PORTRAIT ? -1 : tTheory, 'ink', () => {
      const x = LX();
      KT(t, { lines: V(['Opens with ~theory,~'], ['Opens with', '~theory,~']), x, y: V(BAND_Y + 30, 1290), size: V(76, 84), times: [Math.min(k.theory.w[4], tTheory + 0.25), k.theory.w[5], k.theory.w[7]], col: C.inkMid, acc: C.inkMid, ul: false, id: 'theory' });
      KT(t, { lines: V(['very *practical.*'], ['very', '*practical.*']), x, y: V(BAND_Y + 160, 1290 + 84 * 2.1), size: V(110, 110), times: [k.prac.w[7], k.prac.w[8]], col: C.paper, acc: C.blueT, id: 'practical' });
    });
  }, { id: 'practical' });
  sfx('whoosh', tTheory + 0.04); sfx('pop', k.theory.w[7]); sfx('hitS', k.prac.w[8]);

  /* 6 · card: a manual masquerading as a textbook */
  card(k.manual.w[3] - 0.1, 'blue', (t) => {
    const s = V(170, 150);
    KT(t, { lines: ['A manual'], x: L, y: V(330, 640), size: s, times: [k.manual.w[3], k.manual.w[4]] });
    KT(t, { lines: ['~masquerading as~'], font: 'serif', x: L, y: V(330 + s * 1.05, 640 + s * 1.05), size: V(s * 1.02, 108), times: [k.manual.w[7], k.manual.w[8]], acc: C.card, ul: false });
    KT(t, { lines: ['a textbook.'], x: L, y: V(330 + s * 2.1, 640 + s * 2.1), size: s, times: [k.manual.w[9], k.manual.w[10]] });
  }, { id: 'manual', grid: true });
  sfx('cut', k.manual.w[3] - 0.1); sfx('hitS', k.manual.w[4]); sfx('hit', k.manual.w[10], -4);
}

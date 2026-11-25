/* Moment 02: a 1940 idea. "He calls it inspectional reading."  ~27 s. V(16:9, 9:16). Plan: ../MOMENTS.md
 * The book card is typographic (her deck style), not a picture of the real cover. */
'use strict';

function buildMoment() {
  const k = PS({
    ver: 'the oldest version of this method is actually from a book called', book: 'how to read a book',
    by: 'by mortimer adler from 1940', calls: 'he calls it inspectional reading', before: 'you read chapter one',
    study: 'you study the contents page', titles: 'the chapter titles', subs: 'the subheadings', skim: 'you skim a little',
    see: 'to see how the author has laid out their argument',
  });
  const tVer = 0;                                                            // opens on the split: "The oldest version…"
  const tBefore = cutTimes().filter(c => c < k.before.t).pop();             // the jump cut lands on her second "before"
  const tList = k.study.w[3] - 0.45;                                       // the list opens as she names its first row

  /* camera */
  CAM(0, PORTRAIT ? { z: 0.84, fy: 0.35, pad: true } : { z: 1.3, fx: 0.74 });
  CAM(k.calls.t - 0.1, { z: V(1.12, 1.08), fx: V(0.68, null) });
  camPunch(k.calls.w[3] - 0.05, 1.32, 1.16, { fx: V(0.71, null) });
  if (PORTRAIT) camSplit(tBefore); else { CAM(tBefore, { z: 1.14, fx: 0.7 }); camSplit(tList); }

  /* 2 · split: the oldest version -> a book called How to Read a Book, by Mortimer Adler */
  shot(tVer, (t) => {
    split(t, -1, 'paper', () => {
      const x = LX();
      KT(t, { lines: ['The oldest version'], x, y: V(240, 1262), size: V(84, 76), times: [0.05, k.ver.w[1], k.ver.w[2]], col: C.ink, id: 'oldest' });
      if (!PORTRAIT) withA(prog(t, k.ver.w[6], 0.3), () => mono('is from a book called', x, 306, 30, C.mid, 'left', { key: 'called', fixed: true }));
      // the book: a flat typographic card, its title lands on her words
      const cx = x, cy = V(360, 1296), cw = V(440, 320), ch = V(560, 340);
      const p = sn(t, k.book.t - 0.3, 0.45);
      if (p > 0) withT(0, 70 * (1 - p), 1, -0.035 * (1 - p), () => withA(clamp(p * 2), () => {
        rect(cx, cy, cw, ch, C.card); strokeR(cx, cy, cw, ch, C.ink, 5); rect(cx, cy, cw, V(46, 30), C.ink);
        KT(t, { lines: ['How to', 'read a', '*book*'], x: cx + V(34, 26), y: cy + V(150, 104), size: V(86, 64), times: k.book.w, col: C.ink, acc: C.blue, id: 'book-title', fitW: cw - V(60, 40) });
              }));
      KT(t, { lines: ['By', 'Mortimer', 'Adler.'], x: V(x + 480, x + 370), y: V(620, 1420), size: V(54, 80), times: [k.by.w[0], k.by.w[1], k.by.w[2]], col: C.ink, id: 'by' });
    });
  }, { id: 'oldest' });
  sfx('whoosh', tVer + 0.04); sfx('card', k.book.t - 0.3); sfx('type', k.book.t, -4, { n: 6, d: 1.2 }); sfx('pop', k.by.w[1], -2);

  /* 3 · card: 1940 */
  card(k.by.w[4] - 0.12, 'blue', (t) => {
    slam(t, k.by.w[4] - 0.08, '1940', CX, V(720, 1080), V(420, 360), { col: C.orange, align: 'center', from: 1.25 });
    withA(prog(t, k.by.w[4] + 0.25, 0.3), () => mono('How to Read a Book · Mortimer Adler', CX, V(820, 1180), V(30, 36), C.onBlue, 'center', { key: 'ref' }));
  }, { id: '1940', grid: true });
  sfx('hit', k.by.w[4] - 0.06, -2);

  /* 4 · he calls it inspectional reading */
  shot(k.calls.t - 0.1, (t) => {
    tag(t, k.calls.t, 'He calls it', LX() + 14, V(310, 1196), { plate: 'ink' });
    plateText(t, { lines: ['Inspectional'], x: LX(), y: V(460, 1322), size: V(124, 104), plate: 'paper', times: [k.calls.w[3]] });
    plateText(t, { lines: ['~reading.~'], x: LX(), y: V(460 + 124 * 1.32, 1322 + 104 * 1.3), size: V(124, 104), font: 'serif', plate: 'blue', times: [k.calls.w[4]], ul: false });
  }, { id: 'inspectional' });
  sfx('hitS', k.calls.w[3]); sfx('pop', k.calls.w[4]);

  /* 5 · before you read chapter one */
  shot(tBefore, (t) => {
    if (!PORTRAIT) plates2(t, { s: 'Before', times: [tBefore + 0.05], plate: 'ink' }, { s: 'chapter *one:*', times: [k.before.w[2], k.before.w[3]], plate: 'paper' });
    else split(t, tBefore, 'ink', () => KT(t, { lines: ['Before', 'chapter *one:*'], x: LX(), y: 1340, size: 120, times: [tBefore + 0.25, k.before.w[2], k.before.w[3]], col: C.paper, acc: C.blueT, id: 'before9' }));
  }, { id: 'before' });
  sfx('pop', tBefore + 0.05); sfx('pop', k.before.w[2], -2);

  /* 6 · split: the list builds, one row per thing she names */
  shot(tList, (t) => {
    split(t, PORTRAIT ? -1 : tList, 'ink', () => {
      const x = LX();
      const rows = [
        { n: '01', s: 'The contents page', tin: k.study.w[3] },
        { n: '02', s: 'The chapter titles', tin: k.titles.w[1] },
        { n: '03', s: 'The sub-headings', tin: k.subs.w[1] },
        { n: '04', s: 'A little skim', tin: k.skim.w[1] },
      ];
      const focus = (tt) => (tt < k.skim.w[1] + 0.4 ? -1 : 3);
      KT(t, { lines: V(['Before chapter one,', '*study:*'], ['Before chapter one, *study:*']), font: 'body', x, y: V(220, 1250), size: V(60, 54), times: [tList + 0.22, tList + 0.28, tList + 0.34, k.study.w[1]], col: C.paper, acc: C.blueT, id: 'study' });
      IDX(t, rows, V({ x, y: 430, w: 720, rowH: 136, size: 72, focus, numSize: 34 }, { x, y: 1356, w: W - 160, rowH: 88, size: 64, numW: 96, numSize: 32, focus }));
    });
  }, { id: 'list' });
  sfx('whoosh', tList + 0.04); sfx('tick', k.study.w[3]); sfx('tick', k.titles.w[1]); sfx('tick', k.subs.w[1]); sfx('tick', k.skim.w[1]);

  /* 7 · card: how the author laid out the argument */
  card(k.see.w[2] - 0.1, 'blue', (t) => {
    KT(t, { lines: V(['How the author', 'laid out', 'their ~argument.~'], ['How the', 'author', 'laid out', 'their ~argument.~']), x: L, y: V(360, 640), size: V(150, 150), times: [k.see.w[2], k.see.w[3], k.see.w[4], k.see.w[6], k.see.w[7], k.see.w[8], k.see.w[9]], acc: C.card });
  }, { id: 'argument' });
  sfx('cut', k.see.w[2] - 0.1); sfx('mark', k.see.w[9] + 0.32);
}

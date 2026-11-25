/* Moment 07: not for fiction. "Oh. Fiction does, actually."  ~22.2 s. V(16:9, 9:16).
 * While she flips through the novel (it reads backwards in the mirrored source) the lower band (16:9) / split (9:16)
 * covers it. */
'use strict';

function buildMoment() {
  const k = PS({
    fic: "for fiction i don't think you should be doing this for fiction", pt: 'fiction for me is just',
    novel: 'at the point of reading a novel for me is not knowing what is coming next',
    toc: "so i don't even think that fiction has a table of contents", oh: 'oh fiction does actually',
    but: "but really there's no point in doing that for fiction at least for me",
  });
  const tPt = k.pt.t - 0.15, tNov = k.novel.w[10] - 0.42, tToc = k.toc.w[3] - 0.4;

  /* camera */
  CAM(0, PORTRAIT ? { z: 0.88, fy: 0.34, pad: true } : { z: 1.2, fx: 0.72 });
  CAM(tPt, { z: V(1.16, 1.12), fx: V(0.72, null) });
  CAM(tPt + 0.4, { z: V(1.3, 1.2), fx: V(0.72, null), d: tNov - tPt - 0.6, ease: 'sine' });   // slow push while she explains
  camSplit(tNov);
  camBand(tToc);
  CAM(k.toc.w[9], PORTRAIT ? { z: 1.0, fy: 0.34, pad: true, d: 3.4, ease: 'sine' } : { z: 1.26, fy: 0.38, d: 3.4, ease: 'sine' });   // slow push through her pause
  camPunch(k.oh.t - 0.04, 1.45, 1.2, { fx: V(0.68, null) });                                 // the "oh." punch
  CAM(k.but.t - 0.1, { z: V(1.1, 1.08), fx: V(0.7, null) });

  /* 1 · the fiction book (polaroid), not for fiction */
  shot(0, (t) => {
    if (!PORTRAIT) {
      polaroidIn(t, 0.05, IMG.marple, 340, 400, 360, 0.05, 'Miss Marple’s Final Cases', { capSize: 18, from: 220 });
      plates2(t, { s: 'Not for', times: [k.fic.w[3], k.fic.w[10]], plate: 'paper' }, { s: '*fiction.*', times: [k.fic.w[11]], plate: 'ink' }, { y: 820, size: 110 });
    } else split(t, -1, 'paper', () => {
      polaroidIn(t, 0.05, IMG.marple, 270, 1400, 360, 0.05, 'Miss Marple’s Final Cases', { capSize: 13, from: 220 });
      KT(t, { lines: ['Not for', '*fiction.*'], x: 500, y: 1340, size: 96, times: [k.fic.w[3], k.fic.w[10], k.fic.w[11]], col: C.ink, acc: C.blue, id: 'notfor' });
    });
  }, { id: 'fiction' });
  sfx('card', 0.05); sfx('pop', k.fic.w[3]); sfx('hitS', k.fic.w[11]);

  /* 2 · beside her: the point of a novel (plates), then a split: not knowing what comes next */
  shot(tPt, (t) => {
    tag(t, k.pt.w[1], 'For me', LX() + 14, V(310, 1196), { plate: 'ink' });
    plates2(t, { s: 'The point of', times: [k.novel.w[1], k.novel.w[2], k.novel.w[3]], plate: 'paper' }, { s: 'a *novel:*', times: [k.novel.w[5], k.novel.w[6]], plate: 'ink' }, { size: V(112, 96) });
  }, { id: 'point' });
  sfx('pop', k.pt.w[1], -4); sfx('pop', k.novel.w[2]); sfx('pop', k.novel.w[6], -2);
  shot(tNov, (t) => {
    split(t, tNov, 'ink', () => {
      const x = LX();
      mono('the point of a novel', x, V(250, 1240), V(30, 34), C.inkMid, 'left', { key: 'point-label', fixed: true });
      KT(t, { lines: V(['Not', '*knowing*'], ['Not *knowing*']), x, y: V(450, 1380), size: V(150, 120), times: [k.novel.w[10], k.novel.w[11]], col: C.paper, acc: C.blueT });
      KT(t, { lines: ['~what comes next.~'], font: 'serif', x, y: V(760, 1540), size: V(108, 96), times: [k.novel.w[12], k.novel.w[14], k.novel.w[15]], acc: C.paper });
    });
  }, { id: 'novel' });
  sfx('whoosh', tNov + 0.04); sfx('hitS', k.novel.w[11]); sfx('mark', k.novel.w[15] + 0.3, -3);

  /* 3 · band: fiction has no table of contents... (her pause while she checks the book) */
  shot(tToc, (t) => {
    band(t, PORTRAIT ? -1 : tToc, 'paper', () => {
      const x = LX(), s = V(96, 100), y1 = V(BAND_Y + 90, 1330);
      tag(t, tToc + 0.25, 'I don’t even think', x + 14, V(BAND_Y - 10, 1196), { plate: 'ink' });
      KT(t, { lines: V(['Fiction has no *contents*'], ['Fiction has', 'no *contents*']), x, y: y1, size: s, times: [tToc + 0.3, tToc + 0.34, k.toc.w[8], k.toc.w[11]], col: C.ink, acc: C.blue, id: 'no-toc' });
      const lastW = tw(V('FICTION HAS NO CONTENTS', 'NO CONTENTS'), F.disp(s), s * LS.disp);
      slam(t, k.toc.w[11] + 0.55, '?', x + lastW + V(30, 24), V(y1 + 10, y1 + s * 0.92 + 10), V(170, 150), { col: C.blue, key: 'q' });
    });
  }, { id: 'no-toc' });
  sfx('whoosh', tToc + 0.04); sfx('pop', k.toc.w[6]); sfx('pop', k.toc.w[11], -2); sfx('hitS', k.toc.w[11] + 0.55, -3);

  /* 4 · oh. it does. */
  shot(k.oh.t - 0.06, (t) => {
    plates2(t, { s: 'Oh.', times: [k.oh.w[0]], plate: 'paper' }, { s: 'It *does.*', times: [k.oh.w[1], k.oh.w[2]], plate: 'ink' }, { size: V(132, 110) });
    slam(t, k.oh.w[3], '!', LX() + V(420, 340), V(440, 1322) + V(132, 110) * 1.3 + 8, V(200, 160), { col: C.blueT, key: 'bang' });
  }, { id: 'oh' });
  sfx('hit', k.oh.t - 0.02, -3); sfx('hitS', k.oh.w[2]); sfx('pop', k.oh.w[3]);

  /* 5 · no point for fiction (at least for me) -> closing card */
  shot(k.but.t - 0.12, (t) => {
    plates2(t, { s: 'Still no *point*', times: [k.but.w[1], k.but.w[3], k.but.w[4]], plate: 'paper' }, null, { size: V(112, 92) });
  }, { id: 'no-point' });
  sfx('pop', k.but.w[3]);
  card(k.but.w[8] - 0.06, 'blue', (t) => {
    KT(t, { lines: V(['No point', 'for fiction.'], ['No point', 'for', 'fiction.']), x: L, y: V(420, 700), size: V(190, 180), times: [k.but.w[8] - 0.02, k.but.w[8], k.but.w[8] + 0.05, k.but.w[9]] });
    withA(prog(t, k.but.w[10], 0.3), () => mono('At least for me', L + 6, V(880, 1330), V(36, 40), C.onBlue, 'left', { key: 'forme' }));
  }, { id: 'closing', grid: true });
  sfx('hit', k.but.w[8] - 0.04, -3); sfx('pop', k.but.w[11], -5);
}

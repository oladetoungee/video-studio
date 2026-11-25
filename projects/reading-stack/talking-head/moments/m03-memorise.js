/* Moment 03: the TikTok version. "Memorise it... it makes the mapping stronger."  ~29.4 s. V(16:9, 9:16). */
'use strict';

function buildMoment() {
  const k = PS({
    idea: 'the idea is that', few: 'you spend a few minutes with the heading', ask: 'you ask yourself how the parts connect', start: 'before you start reading',
    love: 'and i love the version i saw on tiktok', mem: 'because i did use to memorize it',
    read: 'i would just actually read through the headings and the subheadings', but: 'but memorizing it actually makes it work better for me',
    stick: 'it makes it stick for me as opposed to just skimming through', map: 'it makes the mapping stronger in my mind',
  });
  const tAsk = k.ask.w[1] - 0.3, tUsed = k.read.w[7] - 0.45, tMap = k.map.t - 0.12;

  /* camera */
  CAM(0, { z: V(1.24, 1.14), fx: V(0.71, null) });
  camSplit(tAsk);
  camPunch(k.love.t - 0.08, 1.3, 1.16, { fx: V(0.7, null) });
  camSplit(tUsed);
  CAM(k.stick.t - 0.1, { z: V(1.12, 1.08), fx: V(0.69, null) });
  camPunch(k.stick.w[3] - 0.04, 1.3, 1.16, { fx: V(0.71, null) });
  camSplit(tMap);

  /* 1 · the idea: a few minutes with the headings */
  shot(0, (t) => {
    tag(t, k.idea.t + 0.02, 'The idea', LX() + 14, V(300, 1196), { plate: 'ink' });
    plates2(t, { s: 'A few *minutes*', times: [k.few.w[2], k.few.w[3], k.few.w[4]], plate: 'paper' }, { s: 'with the headings.', times: pick(k.few, [5, 6, 7]), plate: 'ink', size: V(84, 72) }, { y: V(450, 1322) });
  }, { id: 'minutes' });
  sfx('pop', k.idea.t + 0.02, -3); sfx('pop', k.few.w[4]); sfx('pop', k.few.w[7], -3);

  /* 2 · split: how do the parts connect (three parts, the links draw on "connect") */
  shot(tAsk, (t) => {
    split(t, tAsk, 'paper', () => {
      const x = LX();
      KT(t, { lines: V(['How do the', 'parts ~connect?~'], ['How do the parts ~connect?~']), font: 'body', x, y: V(300, 1262), size: V(96, 64), times: [tAsk + 0.22, tAsk + 0.26, tAsk + 0.3, tAsk + 0.34, k.ask.w[6]], col: C.ink, acc: C.blue });
      const bw = V(200, 280), bh = V(150, 124), gap = V(40, 40), by = V(500, 1340);
      for (let i = 0; i < 3; i++) {
        const bx = x + i * (bw + gap); const p = sn(t, k.ask.w[5] + i * 0.1, 0.4); if (p <= 0) continue;
        withT(0, 30 * (1 - p), 1, 0, () => withA(clamp(p * 2), () => {
          rect(bx, by, bw, bh, i === 1 ? C.ink : C.card); strokeR(bx, by, bw, bh, C.ink, 4);
          _mono('PART ' + (i + 1), bx + bw / 2, by + bh / 2 + 12, V(32, 34), i === 1 ? C.paper : C.ink, 'center', { ls: 0.12 });
        }));
        if (i < 2) pline(bx + bw, by + bh / 2, bx + bw + gap, by + bh / 2, E.outCubic(prog(t, k.ask.w[6] + i * 0.15, 0.3)), C.blue, 7);
      }
      const lp = E.outCubic(prog(t, k.ask.w[6] + 0.35, 0.5));   // part 1 also connects to part 3
      if (lp > 0) { ctx.save(); ctx.strokeStyle = C.blue; ctx.lineWidth = 6; ctx.beginPath(); const x0 = x + bw / 2, x1 = x + 2 * (bw + gap) + bw / 2, yb = by + bh;
        const N = 30; for (let i = 0; i <= Math.round(N * lp); i++) { const u = i / N; const xx = lerp(x0, x1, u), yy = yb + Math.sin(Math.PI * u) * V(100, 70); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
      KT(t, { lines: ['…before you start reading.'], font: 'body', x, y: V(880, 1620), size: V(52, 48), times: pick(k.start, [0, 1, 2, 3]), col: C.mid, id: 'beforestart' });
    });
  }, { id: 'connect' });
  sfx('whoosh', tAsk + 0.04); sfx('card', k.ask.w[5]); sfx('mark', k.ask.w[6], -2); sfx('mark', k.ask.w[6] + 0.35, -4);

  /* 3 · the TikTok version */
  shot(k.love.t - 0.08, (t) => {
    tag(t, k.love.w[2], 'The version I love', LX() + 14, V(310, 1196), { plate: 'ink' });
    plateText(t, { lines: ['The *TikTok*'], x: LX(), y: V(460, 1322), size: V(124, 100), plate: 'paper', times: [k.love.w[3], k.love.w[8]] });
    plateText(t, { lines: ['version:'], x: LX(), y: V(460 + 124 * 1.3, 1322 + 100 * 1.3), size: V(124, 100), plate: 'paper', times: [k.love.w[8] + 0.12] });
  }, { id: 'tiktok' });
  sfx('pop', k.love.w[2]); sfx('pop', k.love.w[8]);
  card(k.mem.w[5] - 0.03, 'blue', (t) => {
    KT(t, { lines: V(['Memorise it.'], ['Memorise', 'it.']), x: CX, align: 'center', y: V(610, 880), size: V(250, 230), times: [k.mem.w[5], k.mem.w[6]] });
    withA(prog(t, k.mem.w[6] + 0.3, 0.3), () => mono('the headings, the sub-headings', CX, V(740, 1080), V(32, 36), C.onBlue, 'center', { key: 'what' }));
  }, { id: 'memorise', grid: true });
  sfx('hit', k.mem.w[5] - 0.05, -2);

  /* 4 · split: what I used to do -> memorising works better */
  shot(tUsed, (t) => {
    split(t, tUsed, 'ink', () => {
      const x = LX();
      const rows = [
        { n: '01', s: 'Read the headings', tin: k.read.w[7], dim: k.but.w[1] },
        { n: '02', s: 'Read the sub-headings', tin: k.read.w[10], dim: k.but.w[1] },
        { n: '03', s: 'Memorise them', tin: k.but.w[1], col: C.blueT },
      ];
      KT(t, { lines: ['What I used to do:'], font: 'body', x, y: V(260, 1250), size: V(60, 56), times: [tUsed + 0.2, tUsed + 0.24, tUsed + 0.28, tUsed + 0.32, tUsed + 0.36], col: C.inkMid, id: 'used' });
      IDX(t, rows, V({ x, y: 420, w: 720, rowH: 130, size: 60, numSize: 34 }, { x, y: 1335, w: W - 160, rowH: 84, size: 60, numW: 96, numSize: 32 }));
      if (!PORTRAIT) KT(t, { lines: ['Works *better.*'], x, y: 880, size: 110, times: [k.but.w[6], k.but.w[7]], col: C.paper, acc: C.blueT, id: 'better' });
      else KT(t, { lines: ['Works *better.*'], x, y: 1622, size: 84, times: [k.but.w[6], k.but.w[7]], col: C.paper, acc: C.blueT, id: 'better' });
    });
  }, { id: 'used-to' });
  sfx('whoosh', tUsed + 0.04); sfx('tick', k.read.w[7]); sfx('tick', k.read.w[10]); sfx('hitS', k.but.w[1]); sfx('pop', k.but.w[7], -2);

  /* 5 · it sticks, not just skimming */
  shot(k.stick.t - 0.1, (t) => {
    const y = V(440, 1300), s1 = V(124, 100), s2 = V(84, 70);
    plates2(t, { s: 'It *sticks.*', times: [k.stick.w[0], k.stick.w[3]], plate: 'paper' }, { s: 'Not just skimming.', times: pick(k.stick, [6, 9, 10]), plate: 'ink', size: s2 }, { y, size: s1 });
    const sp = prog(t, k.stick.w[11], 0.3);   // strike "skimming"
    if (sp > 0) { const yy = y + s1 * 1.3; const x0 = LX() + tw('NOT JUST ', F.disp(s2), s2 * LS.disp); strikeBar(x0, yy - s2 * 0.34, tw('SKIMMING.', F.disp(s2), s2 * LS.disp), sp, C.blueT, V(12, 10)); }
  }, { id: 'sticks' });
  sfx('pop', k.stick.w[0], -4); sfx('hitS', k.stick.w[3]); sfx('pop', k.stick.w[10], -3); sfx('mark', k.stick.w[11], -2);

  /* 6 · split: the mapping gets stronger (meter) */
  shot(tMap, (t) => {
    split(t, tMap, 'ink', () => {
      const x = LX();
      KT(t, { lines: V(['The mapping'], ['The mapping']), x, y: V(360, 1270), size: V(110, 96), times: [Math.max(tMap + 0.25, k.map.w[2]), k.map.w[3]], col: C.paper });
      const f = 0.25 + 0.7 * E.outCubic(prog(t, k.map.w[3], k.map.w[4] - k.map.w[3] + 0.6));
      const mx = x, my = V(440, 1310), mw = V(700, W - 160), mh = V(110, 86), n = 10, cw = (mw - 40) / n, on = Math.round(n * f);
      strokeR(mx, my, mw, mh, C.blueT, 4);
      for (let i = 0; i < n; i++) { const cx = mx + 20 + i * cw; if (i < on) rect(cx + 3, my + 18, cw - 6, mh - 36, C.blueT); else strokeR(cx + 3, my + 18, cw - 6, mh - 36, C.inkMid, 2); }
      KT(t, { lines: ['*stronger.*'], x, y: V(720, 1520), size: V(120, 104), times: [k.map.w[4]], acc: C.blueT });
      withA(prog(t, k.map.w[6], 0.3), () => mono('in my mind', x, V(820, 1610), V(32, 34), C.inkMid, 'left', { key: 'mind', fixed: true }));
    });
  }, { id: 'mapping' });
  sfx('whoosh', tMap + 0.04); sfx('tick', k.map.w[3]); sfx('tick', k.map.w[3] + 0.3); sfx('hitS', k.map.w[4]);
}

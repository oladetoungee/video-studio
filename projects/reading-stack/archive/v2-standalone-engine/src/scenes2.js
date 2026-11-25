/* Scenes, part 2: book one, How to Read and Write Critically (Alex Baratta), chapter by chapter (4:28 - 9:23) */
'use strict';
// the published chapter list, in the book's order (she mislabels a couple of numbers aloud; the screen shows the book)
const BARATTA = [
  'What does it mean to be critical?',
  'Different ways to show your criticality',
  'Understanding score bands and developing your skills within academic assessment',
  'The connection between critical reading, thinking and writing',
  'How to structure your essays',
  'How to structure your dissertation',
  'Additional assessments to consider',
  'Four ways to approach interpretation',
  'How to use quotes, paraphrase and summarise',
  'How to use critical language in your assessments',
];
const pad2 = n => String(n).padStart(2, '0');
function contentsRows(t, tins, o = {}) {
  IDX(t, BARATTA.map((s, i) => ({ n: pad2(i + 1), s, tin: tins[i], size: i === 2 ? 29 : 32 })),
    { x: o.x == null ? 600 : o.x, y: o.y || 200, w: o.w || W - 600 - 110, rowH: o.rowH || 80, size: 32, font: 'body', weight: 600, numW: 76, numSize: 24, ruleDy: 26, focus: o.focus, dimA: o.dimA == null ? 0.3 : o.dimA });
}

function buildScenes2() {
  /* ---------- 10 · book one ---------- */
  const k = PS({ prac: "so let's actually do this practically", start: "i'll start with this book", small: "because it's a smaller one", clean: 'the structure is very clean', title: 'how to read and write critically by alex baratta', tell: 'the title is already telling us something', attr: 'the title is what attracted me to it in the library', simple: "it's very simple and direct", treat: 'treating writing and reading critically together', open: 'now if we open up to the chapters', ten: 'we have 10 chapters in this book' });
  addScene(S(k.prac), 'ink', '// 09 — book one', (t) => {
    KT(t, { lines: ["Let's do this, ~practically.~"], font: 'body', x: L, y: 300, size: 64, times: [k.prac.w[1], k.prac.w[3], k.prac.w[4], k.prac.w[5]] });
    KT(t, { lines: ['Book one.'], x: L - 6, y: 560, size: 230, times: [k.start.w[4], k.start.w[4] + 0.16] });
    KT(t, { lines: ['The smaller one.', 'Very clean ~structure.~'], font: 'body', x: L, y: 740, size: 60, lh: 1.25, times: [k.small.w[2], k.small.w[3], k.small.w[4], k.clean.w[3], k.clean.w[4], k.clean.w[4] + 0.15] });
    polaroidIn(t, k.start.w[4], IMG.baratta, 1600, 540, 400, 0.04, 'Book one · the smaller one', { crop: [0, 0.93] });
  }, { grid: true });
  sfx('hitS', k.start.w[4], -5); sfx('card', k.start.w[4] + 0.05); sfx('mark', k.clean.w[4] + 0.4, -6);
  addScene(S(k.title), 'paper', '// 09 — book one', (t) => {
    withA(prog(t, k.tell.t, 0.25), () => mono('The title is already telling us something', L + 6, 230, 26, g.mid, 'left', { ls: 0.24 }));
    const tr = k.treat.w; // treating writing and reading critically together
    KT(t, { lines: ['How to read', 'and write', 'critically'], x: L - 4, y: 440, size: 180, times: k.title.w.slice(0, 6), mark: { idx: [2, 4], at: [tr[3], tr[1]], col: C.blue, fg: C.card } });
    withA(prog(t, k.title.w[6], 0.3), () => mono('Alex Baratta', L + 6, 880, 30, g.fg, 'left', { ls: 0.2 }));
    withA(prog(t, k.attr.w[4], 0.3) * (1 - prog(t, k.simple.w[2] - 0.2, 0.2)), () => mono('What attracted me to it in the library', L + 6, 950, 26, C.blue, 'left', { ls: 0.2 }));
    withA(prog(t, k.simple.w[2], 0.3), () => mono('Simple. Direct.', L + 6, 950, 26, g.mid, 'left', { ls: 0.2 }));
    withA(prog(t, tr[5], 0.3), () => mono('Reading + writing, together', L + 6 + 420, 950, 26, C.blue, 'left', { ls: 0.2 }));
    polaroid(IMG.baratta, 1480, 560, 470, -0.03, 'From the library', { crop: [0, 0.93], capType: { t, t0: k.attr.w[9], caretTo: k.attr.w[9] + 1.2 } });
  });
  sfx('mark', k.treat.w[1], -4); sfx('mark', k.treat.w[3], -4);
  // the contents, row by row as she reads it
  const R = [P('what does it mean to be critical'), P('different ways to show your criticality'), P('understanding the score band'), P('the connection between critical reading'), P('how to structure your essay'), P('how to structure your dissertation'), P('additional assessment to consider'), P('four ways to approach interpretation'), P('use quotes paraphrasing'), P('how to use critical language')];
  const tins = R.map(r => r.t - 0.08);
  const readEnd = R[9].e + 1.0;
  addScene(S(k.open), 'paper', '// 09 — book one', (t) => {
    withA(prog(t, k.open.w[4], 0.25), () => mono('Contents', L + 6, 250, 26, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['*10*'], x: L - 10, y: 560, size: 330, times: [k.ten.w[2]] });
    withA(prog(t, k.ten.w[3], 0.3), () => mono('Chapters', L + 6, 640, 30, g.fg, 'left', { ls: 0.24 }));
    contentsRows(t, tins, { focus: (tt) => { if (tt > readEnd) return -1; let a = -1; tins.forEach((x, i) => { if (tt >= x) a = i; }); return a; } });
  });
  sfx('hitS', k.ten.w[2], -6); tins.forEach(x => sfx('tick', x, -3));

  /* ---------- 11 · chapter one: a question ---------- */
  const k1 = PS({ q: 'so the first thing you notice is that chapter one is a question', what: 'what does it mean to be critical', def: 'no one has actually defined the word for you', be: 'you should be critical', think: 'you should think critically', blah: 'blah blah blah', fix: 'starts by fixing the definition', throw: 'i also throw the word critical thinking around a lot', vid: 'i even have a video on my youtube', chal: 'am i going to be challenged by the definition', get: 'is it that i get challenged', supp: 'gets supported by this author', look: "so i'm already looking forward to that" });
  addScene(S(k1.q), 'paper', '// 10 — chapter 01', (t) => {
    withA(prog(t, k1.q.w[7], 0.25), () => mono('Chapter 01 is a question', L + 6, 300, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['What does it mean', 'to be *critical?*'], x: L - 4, y: 540, size: 180, times: k1.what.w });
  });
  sfx('hitS', k1.what.w[6], -6);
  const dict = (t, fillT, x = 900, y = 250) => {
    const w = 910, h = 580; rect(x, y, w, h, C.card);
    txt('critical', x + 70, y + 190, F.serifR(150), C.ink, 'left', 'alphabetic', -2);
    mono('adj.', x + 70 + tw('critical', F.serifR(150), -2) + 30, y + 190, 26, C.mid, 'left', { ls: 0.16 });
    hline(x + 70, y + 250, w - 140, 1, C.line, 2);
    for (let i = 0; i < 3; i++) {
      const ry = y + 320 + i * 72; mono(String(i + 1) + '.', x + 70, ry + 12, 24, C.blue, 'left', { ls: 0.04 });
      const fp = fillT == null ? 0 : E.outExpo(prog(t, fillT + i * 0.18, 0.5)); const bw = [620, 540, 420][i];
      ctx.save(); ctx.setLineDash([10, 10]); strokeR(x + 130, ry - 10, bw, 26, '#C9C1B3', 2); ctx.restore();
      if (fp > 0) rect(x + 130, ry - 10, bw * fp, 26, C.ink);
    }
  };
  addScene(S(k1.def), 'ink', '// 10 — chapter 01', (t) => {
    KT(t, { lines: ['No one has', '~defined~ it', 'for you.'], font: 'body', x: L, y: 440, size: 96, lh: 1.15, times: pick(k1.def, [0, 1, 2, 4, 6, 7, 8]) });
    const p = sn(t, k1.def.w[4], 0.45); if (p > 0) withA(clamp(p * 2), () => dict(t, null, 900, 250 + 50 * (1 - p)));
  });
  sfx('card', k1.def.w[4]);
  addScene(S(k1.be, 1.0), 'paper', '// 10 — chapter 01', (t) => {
    withA(prog(t, k1.be.t - 0.9, 0.25), () => mono('Everybody keeps saying', L + 6, 270, 28, g.mid, 'left', { ls: 0.24 }));
    const on = t < k1.think.t ? 0 : t < k1.blah.t ? 1 : 2;
    ['Be critical.', 'Think critically.', 'Blah, blah, blah.'].forEach((s, i) => {
      const ti = [k1.be.w[2], k1.think.w[2], k1.blah.t][i]; const a = i === on ? 1 : 0.18;
      withA(a, () => KT(t, { lines: [s], x: L - 4, y: 480 + i * 190, size: 190, times: [ti, ti + 0.1, ti + 0.2], col: i === on ? g.fg : g.fg }));
    });
  });
  sfx('tick', k1.think.w[2]); sfx('tick', k1.blah.t);
  addScene(S(k1.fix, 1.3), 'ink', '// 10 — chapter 01', (t) => {
    KT(t, { lines: ['This author', '~fixes~ the', 'definition first.'], font: 'body', x: L, y: 440, size: 84, lh: 1.15, times: [k1.fix.t - 1.2, k1.fix.t - 1.0, k1.fix.w[2], k1.fix.w[3], k1.fix.w[4], k1.fix.w[4] + 0.2] });
    dict(t, k1.fix.w[4], 900, 250);
  });
  sfx('mark', k1.fix.w[4], -3);
  addScene(S(k1.throw, 1.9), 'paper', '// 10 — chapter 01', (t) => {
    beat(t, 0, k1.chal.t - 0.1, () => {
      KT(t, { lines: ['I throw the word', '~critical~ around a lot.'], font: 'body', x: L, y: 470, size: 96, lh: 1.15, times: pick(k1.throw, [0, 2, 3, 4, 5, 7, 8, 9]) });
      withA(prog(t, k1.vid.t, 0.3), () => mono('I even have a video about critical thinking', L + 6, 700, 26, g.mid, 'left', { ls: 0.2 }));
    });
    beat(t, k1.chal.t - 0.1, 1e9, () => {
      withA(prog(t, k1.chal.t, 0.25), () => mono('Am I going to be', L + 6, 300, 28, g.mid, 'left', { ls: 0.24 }));
      const opt = (x, s, ti, on) => { const p = sn(t, ti, 0.4); if (p <= 0) return; withA(clamp(p * 2), () => { const y = 420 + 40 * (1 - p); rect(x, y, 800, 400, C.card); strokeR(x, y, 800, 400, C.ink, 4); mono(s === 'Challenged' ? 'Option 01' : 'Option 02', x + 50, y + 80, 24, C.blue, 'left', { ls: 0.16 }); txt(s.toUpperCase() + '?', x + 46, y + 300, F.disp(110), C.ink, 'left', 'alphabetic', 110 * LS.disp); checkbox(x + 800 - 100, y + 50, 50, on); }); };
      opt(L, 'Challenged', k1.chal.w[5], 0); opt(1010, 'Supported', k1.supp.w[1], 0);
      withA(prog(t, k1.get.w[5], 0.3), () => mono('My idea gets challenged?', L + 6, 880, 24, g.mid, 'left', { ls: 0.18 }));
      withA(prog(t, k1.supp.w[1], 0.3), () => mono('…or supported?', 1016, 880, 24, g.mid, 'left', { ls: 0.18 }));
      withA(prog(t, k1.look.w[3], 0.3), () => mono("Reading to find out. I'm looking forward to that.", L + 6, 960, 26, C.blue, 'left', { ls: 0.2 }));
      cursorAt(t, [[k1.chal.w[5] - 0.5, 1500, 1000], [k1.chal.w[5] + 0.1, 560, 660], [k1.get.w[4], 560, 660], [k1.supp.w[1] + 0.2, 1440, 660], [k1.look.t, 1440, 660], [k1.look.e + 0.6, 1700, 1000]], []);
    });
  });
  sfx('mark', k1.throw.w[5] + 0.4, -6); sfx('card', k1.chal.w[5]); sfx('card', k1.supp.w[1]);

  /* ---------- 12 · chapter two ---------- */
  const k2 = PS({ c2: 'chapter two different ways to show your criticality', prac: 'this is going to be practical', tips: "i'm going to get tips", ass: "i haven't read the book", tips2: 'tips on how to show my criticality' });
  addScene(S(k2.c2), 'ink', '// 11 — chapter 02', (t) => {
    withA(prog(t, k2.c2.t, 0.25), () => mono('Chapter 02', L + 6, 220, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['Different ways to show', 'your *criticality.*'], x: L - 4, y: 380, size: 120, times: k2.c2.w.slice(2) });
    withA(prog(t, k2.prac.w[4], 0.3), () => mono('→ This is going to be practical', L + 6, 560, 26, C.blueT, 'left', { ls: 0.2 }));
    [k2.tips.w[4], k2.tips2.t, k2.tips2.t + 0.35].forEach((ti, i) => {
      const p = sn(t, ti, 0.45); if (p <= 0) return;
      withA(clamp(p * 2), () => browser(L + i * 590, 640 + 50 * (1 - p), 520, 300, { body: (x, y, w, h) => { mono('Tip ' + pad2(i + 1), x + 34, y + 60, 24, C.blue, 'left', { ls: 0.16 }); lbar(x + 34, y + 100, 380); lbar(x + 34, y + 132, 300); lbar(x + 34, y + 164, 340); } }));
    });
    withA(prog(t, k2.ass.t, 0.3), () => mono("(My guess. I haven't read the book yet.)", W - L, 1010, 22, g.mid, 'right', { ls: 0.16 }));
  });
  sfx('card', k2.tips.w[4]); sfx('card', k2.tips2.t); sfx('card', k2.tips2.t + 0.35, -3);

  /* ---------- 13 · chapter three ---------- */
  const k3 = PS({ c3: 'chapter three goes on to score bands and assessment', tells: 'that already tells me what this book is for', life: 'critical thinking as a life skill', marked: 'getting marked well', phil: 'anything philosophical', strat: 'now i\'m expecting practical academic strategy' });
  addScene(S(k3.c3), 'paper', '// 12 — chapter 03', (t) => {
    withA(prog(t, k3.c3.t, 0.25), () => mono('Chapter 03', L + 6, 220, 28, g.mid, 'left', { ls: 0.24 }));
    beat(t, 0, k3.life.t - 0.8, () => {
      KT(t, { lines: ['Score bands', '& *assessment.*'], x: L - 4, y: 500, size: 200, times: k3.c3.w.slice(5, 9) });
      withA(prog(t, k3.tells.w[3], 0.3), () => mono('That already tells me what this book is for', L + 6, 860, 26, C.blue, 'left', { ls: 0.2 }));
    });
    beat(t, k3.life.t - 0.8, 1e9, () => {
      withA(prog(t, k3.life.t - 0.7, 0.3), () => mono('This book is about…', L + 6, 330, 26, g.mid, 'left', { ls: 0.2 }));
      IDX(t, [
        { n: '01', s: 'Critical thinking as a life skill', tin: k3.life.t - 0.6, strike: k3.life.w[5] + 0.1, dim: k3.life.w[5] + 0.3 },
        { n: '02', s: 'Getting marked well', tin: k3.marked.t, tag: { t: k3.marked.w[2] + 0.2, s: '✓ what it is for', col: C.blue } },
        { n: '03', s: 'Anything philosophical', tin: k3.phil.w[1] - 0.2, strike: k3.phil.w[1] + 0.3, dim: k3.phil.w[1] + 0.5 },
      ], { x: L, y: 480, rowH: 170, size: 96, strikeCol: C.blue });
    });
  });
  sfx('tick', k3.life.t - 0.6); sfx('mark', k3.life.w[5] + 0.1, -4); sfx('tick', k3.marked.t); sfx('mark', k3.phil.w[1] + 0.3, -4);
  addScene(S(k3.strat, 0.1), 'blue', '// 12 — chapter 03', (t) => {
    withA(prog(t, k3.strat.w[1], 0.25), () => mono("Now I'm expecting", L + 8, 250, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['Practical', 'academic', 'strategy.'], x: L - 6, y: 500, size: 250, lh: 0.9, times: k3.strat.w.slice(3) });
  }, { grid: true });
  sfx('hit', k3.strat.w[3], -4);

  /* ---------- 14 · chapter four ---------- */
  const k4 = PS({ c4: 'and then chapter four', conn: 'the connection between critical thinking critical writing critical reading', tog: 'how everything comes together', q1: 'is it possible to think critically but not write critically', q2: 'is it possible to do one or the other', q3: 'or are they bundled together', dk: "i don't know yet", ant: 'this author has the answer' });
  addScene(S(k4.c4), 'ink', '// 13 — chapter 04', (t) => {
    withA(prog(t, k4.c4.w[2], 0.25), () => mono("Chapter 04 — I'm looking forward to this one", L + 6, 220, 28, g.mid, 'left', { ls: 0.24 }));
    beat(t, 0, k4.conn.w[3] - 0.12, () => KT(t, { lines: ['Chapter *04.*'], x: L - 4, y: 600, size: 240, times: [k4.c4.w[2], k4.c4.w[3]] }));
    const c = k4.conn.w;
    KT(t, { lines: ['_Critical_ thinking.', '_Critical_ writing.', '_Critical_ reading.'], x: L - 4, y: 440, size: 170, lh: 1.0, times: c.slice(3, 9) });
    const bp = E.outExpo(prog(t, k4.tog.w[3], 0.6)); if (bp > 0) { const x = 1790; pline(x, 300, x, lerp(300, 820, bp), 1, C.blueT, 4); pline(x - 30, 300, x, 300, bp, C.blueT, 4); pline(x - 30, 820, x, 820, bp, C.blueT, 4); withA(bp, () => mono('Together?', x, 900, 28, C.blueT, 'right', { ls: 0.2 })); }
  });
  sfx('tick', k4.conn.w[4]); sfx('tick', k4.conn.w[6]); sfx('tick', k4.conn.w[8]); sfx('mark', k4.tog.w[3], -5);
  addScene(S(k4.q1, 1.6), 'paper', '// 13 — chapter 04', (t) => {
    withA(prog(t, k4.q1.t - 1.4, 0.25), () => mono("Questions I'm already asking", L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, [
      { n: 'Q1', s: 'Think critically, but not write critically?', tin: k4.q1.w[3] },
      { n: 'Q2', s: 'Do one, but not the other?', tin: k4.q2.w[4] },
      { n: 'Q3', s: 'Or are they bundled together?', tin: k4.q3.t },
    ], { x: L, y: 440, rowH: 150, size: 64, font: 'body', weight: 700 });
    withA(prog(t, k4.dk.t, 0.3), () => mono("I don't know yet —", L + 6, 930, 26, g.mid, 'left', { ls: 0.2 }));
    withA(prog(t, k4.ant.w[3], 0.3), () => mono('I expect the author has the answer.', L + 6 + monoW("I don't know yet —", 26, { ls: 0.2 }) + 16, 930, 26, C.blue, 'left', { ls: 0.2 }));
  });
  sfx('tick', k4.q1.w[3]); sfx('tick', k4.q2.w[4]); sfx('tick', k4.q3.t);

  /* ---------- 15 · chapters five to seven: a block ---------- */
  const k5 = PS({ five: 'chapter five six seven', block: 'in my head that feels like a block', struct: 'the whole block is about structure', org: 'how do you organize your essay', add: 'additional assessment parts', poster: 'poster presentation', oral: 'oral presentation', still: 'still everything feels like a block to me' });
  addScene(S(k5.five), 'paper', '// 14 — chapters 05–07', (t) => {
    withA(prog(t, k5.five.t, 0.25), () => mono('Chapters 05 — 07', L + 6, 220, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, [4, 5, 6].map((i, j) => ({ n: pad2(i + 1), s: BARATTA[i], tin: k5.five.w[1 + j] })), { x: L, y: 380, w: 1480, rowH: 120, size: 60, font: 'body', weight: 700, focus: (tt) => (tt >= k5.add.t && tt < k5.still.t ? 2 : -1) });
    withA(prog(t, k5.org.w[3], 0.3) * (1 - prog(t, k5.add.t - 0.2, 0.2)), () => mono('How do you organise your essay?', L + 6, 980, 26, C.blue, 'left', { ls: 0.2 }));
    const bp = E.outExpo(prog(t, k5.block.w[7], 0.6)); if (bp > 0) { const x = 1660; pline(x, 310, x, lerp(310, 640, bp), 1, C.blue, 5); pline(x - 36, 310, x, 310, bp, C.blue, 5); pline(x - 36, 640, x, 640, bp, C.blue, 5); pline(x, 475, x + 40, 475, bp, C.blue, 5); }
    KT(t, { lines: ['A *block:* structure.'], x: L - 4, y: 850, size: 150, times: [k5.block.w[6], k5.block.w[7], k5.struct.w[5], k5.struct.w[5]] });
    [['Poster presentation', k5.poster.t], ['Oral presentation', k5.oral.t]].forEach(([s, ti], i) => { const p = sn(t, ti, 0.35); if (p <= 0) return; withA(clamp(p * 2), () => { const x = L + 125 + i * 420, y = 650; const w = monoW(s, 22) + 44; strokeR(x, y + 8 * (1 - p), w, 50, C.ink, 2); mono(s, x + 22, y + 34 + 8 * (1 - p), 22, C.ink, 'left'); }); });
  });
  [0, 1, 2].forEach(j => sfx('tick', k5.five.w[1 + j])); sfx('mark', k5.block.w[7], -4); sfx('click', k5.poster.t, -4); sfx('click', k5.oral.t, -4);

  /* ---------- 16 · chapters eight to ten ---------- */
  const k6 = PS({ eight: 'and then chapter eight nine and ten', ch8: 'four ways to approach interpretation', head: "in my head i'm thinking when someone says something", mind: 'where should my mind go to first', ctx: 'do i interpret contextually', four: 'the four approaches are agreement disagreement illustration and explanation', ch9: 'the next chapter is how to use quotes paraphrase and summarize', plag: 'plagiarism direct quotation', ch10: 'the last chapter is how to use critical language in your assessment', hedge: 'there is hedging', why: 'why do we hedge', dk: "i don't know what that is yet", are: 'so there are languages that are critical', not: 'there are languages that are not critical', dk2: "i don't know yet" });
  addScene(S(k6.eight), 'paper', '// 15 — chapters 08–10', (t) => {
    withA(prog(t, k6.eight.t, 0.25), () => mono('Chapters 08 — 10', L + 6, 220, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, [7, 8, 9].map((i, j) => ({ n: pad2(i + 1), s: BARATTA[i], tin: [k6.eight.w[3], k6.eight.w[4], k6.eight.w[6]][j] })), { x: L, y: 400, rowH: 150, size: 70, font: 'body', weight: 700, focus: (tt) => (tt >= k6.ch8.t ? 0 : -1) });
  });
  sfx('tick', k6.eight.w[3]); sfx('tick', k6.eight.w[4]); sfx('tick', k6.eight.w[6]);
  addScene(S(k6.head, 0.2), 'ink', '// 15 — chapter 08', (t) => {
    withA(prog(t, k6.head.w[3], 0.25), () => mono('Chapter 08 — in my head', 960, 330, 28, g.mid, 'center', { ls: 0.24 }));
    sent(t, { lines: ['When someone says something,', 'where should my mind go ~first?~'], y: 520, size: 92, times: [...k6.head.w.slice(5, 9), ...k6.mind.w.slice(0, 5), k6.mind.w[6]] });
    withA(prog(t, k6.ctx.w[3], 0.3), () => mono('Do I interpret… contextually?', 960, 820, 28, C.blueT, 'center', { ls: 0.2 }));
  });
  sfx('mark', k6.mind.w[6] + 0.4, -6);
  addScene(S(k6.four, 1.2), 'paper', '// 15 — chapter 08', (t) => {
    withA(prog(t, k6.four.t - 1.0, 0.25), () => mono('Chapter 08 — the four approaches', L + 6, 200, 28, g.mid, 'left', { ls: 0.24 }));
    ['Agreement', 'Disagreement', 'Illustration', 'Explanation'].forEach((s, i) => {
      const ti = [k6.four.w[4], k6.four.w[5], k6.four.w[6], k6.four.w[8]][i]; const p = sn(t, ti, 0.4); if (p <= 0) return;
      const x = L + (i % 2) * 860, y = 270 + Math.floor(i / 2) * 370 + 40 * (1 - p);
      withA(clamp(p * 2), () => { rect(x, y, 830, 330, C.card); strokeR(x, y, 830, 330, C.ink, 4); mono(pad2(i + 1), x + 44, y + 70, 26, C.blue, 'left', { ls: 0.06 }); txt(s.toUpperCase(), x + 40, y + 270, F.disp(104), C.ink, 'left', 'alphabetic', 104 * LS.disp); });
    });
  });
  [4, 5, 6, 8].forEach(i => sfx('card', k6.four.w[i], -2));
  addScene(S(k6.ch9), 'ink', '// 16 — chapter 09', (t) => {
    withA(prog(t, k6.ch9.w[2], 0.25), () => mono('Chapter 09', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['How to use quotes,', 'paraphrase', '& *summarise.*'], x: L - 4, y: 450, size: 150, times: [...k6.ch9.w.slice(4, 8), k6.ch9.w[8], k6.ch9.w[9], k6.ch9.w[10]] });
    [['Plagiarism', k6.plag.w[0]], ['Direct quotation', k6.plag.w[1]]].forEach(([s, ti], i) => { const p = sn(t, ti, 0.35); if (p <= 0) return; withA(clamp(p * 2), () => { const x = L + i * 420, y = 820; const w = monoW(s, 30) + 60; strokeR(x, y + 8 * (1 - p), w, 72, C.paper, 3); mono(s, x + 30, y + 47 + 8 * (1 - p), 30, C.paper, 'left'); }); });
  });
  sfx('click', k6.plag.w[0], -3); sfx('click', k6.plag.w[1], -3);
  addScene(S(k6.ch10), 'paper', '// 17 — chapter 10', (t) => {
    withA(prog(t, k6.ch10.w[2], 0.25), () => mono('Chapter 10 — critical language', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    beat(t, 0, k6.are.t - 0.1, () => {
      KT(t, { lines: ['There is'], font: 'body', x: L, y: 470, size: 90, times: k6.hedge.w.slice(0, 2) });
      KT(t, { lines: ['~hedging.~'], font: 'serif', x: L - 6, y: 720, size: 260, times: [k6.hedge.w[2]] });
      withA(prog(t, k6.why.t, 0.3), () => mono('Why do we hedge?', L + 6, 880, 30, g.fg, 'left', { ls: 0.2 }));
      withA(prog(t, k6.dk.t, 0.3), () => mono("I don't know what that is yet.", L + 6, 940, 26, g.mid, 'left', { ls: 0.2 }));
    });
    beat(t, k6.are.t - 0.1, 1e9, () => {
      const col = (x, s, ti, dim) => { const p = sn(t, ti, 0.4); if (p <= 0) return; withA(clamp(p * 2), () => { const y = 380 + 40 * (1 - p); rect(x, y, 830, 420, dim ? C.paper : C.card); strokeR(x, y, 830, 420, C.ink, 4); mono(dim ? 'Perhaps' : 'Language that is', x + 44, y + 72, 24, C.blue, 'left', { ls: 0.16 }); txt(s.toUpperCase(), x + 40, y + 340, F.disp(120), dim ? C.mid : C.ink, 'left', 'alphabetic', 120 * LS.disp); }); };
      col(L, 'Critical', k6.are.w[6], false); col(L + 860, 'Not critical', k6.not.w[5], true);
      withA(prog(t, k6.dk2.t, 0.3), () => mono("I don't know yet.", L + 6, 900, 26, g.mid, 'left', { ls: 0.2 }));
    });
  });
  sfx('hitS', k6.hedge.w[2], -6); sfx('mark', k6.hedge.w[2] + 0.5, -5); sfx('card', k6.are.w[6]); sfx('card', k6.not.w[5]);

  /* ---------- 17 · still my guess ---------- */
  const k7 = PS({ guess: 'all of these are still my guess', right: 'am i right or am i wrong', retain: "i'm able to retain more ideas now because my mind is expecting things", pos: 'my mind has a position now' });
  addScene(S(k7.guess), 'paper', '// 18 — my guess', (t) => {
    sent(t, { lines: ['All of these are still ~my guess.~'], y: 420, size: 110, times: k7.guess.w });
    withA(prog(t, k7.right.t - 1.2, 0.25), () => mono("Now when I read, I'm reading to find out", 960, 600, 26, g.mid, 'center', { ls: 0.2 }));
    [['Right?', k7.right.w[2], 560], ['Wrong?', k7.right.w[6], 1060]].forEach(([s, ti, x]) => { const p = sn(t, ti, 0.35); if (p <= 0) return; withA(clamp(p * 2), () => { checkbox(x, 710, 64, 0); txt(s.toUpperCase(), x + 100, 770, F.disp(96), g.fg, 'left', 'alphabetic', 96 * LS.disp); }); });
  });
  sfx('mark', k7.guess.w[5] + 0.4, -5); sfx('click', k7.right.w[2], -4); sfx('click', k7.right.w[6], -4);
  addScene(S(k7.retain), 'ink', '// 18 — my guess', (t) => {
    KT(t, { lines: ['I retain more ideas:', 'my mind is ~expecting~ things.'], font: 'body', x: L, y: 250, size: 72, times: [...pick(k7.retain, [0, 3, 4, 5]), ...k7.retain.w.slice(8, 13)] });
    KT(t, { lines: ['My mind has', 'a *position.*'], x: L - 6, y: 620, size: 230, times: [...k7.pos.w.slice(0, 3), k7.pos.w[3], k7.pos.w[4]] });
  });
  sfx('hit', k7.pos.w[4], -5);
}

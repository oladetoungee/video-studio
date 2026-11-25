/* Scenes, part 3: book two (Convivial Toolbox), worth it, recap, fiction, the method, end card (9:23 - 16:00) */
'use strict';
function buildScenes3() {
  /* ---------- 18 · book two ---------- */
  const k = PS({ b2: 'now book two', big: 'this one is bigger', thesis: "it's for my thesis", title: 'convivial toolbox generative research for the front end of design by liz sanders and pieter', notp: "it's not peter", pj: 'pieter jan stappers', tf: 'now the title first', three: 'the title has like three major words', conv: "there's convivial", gen: "there's generative", tool: 'i know what the toolbox is', fe: 'and there is front end of design', main: "so let's take a look at the main word convivial", mean: 'what does convivial mean', ded: 'the book is dedicated', phil: 'dedicated to a philosopher', ivan: 'the name of the philosopher is ivan something', his: 'convivial tools is his idea', power: 'convivial tools mean tools that give power back to the person using them', exp: 'rather than making that user dependent on an expert', before: 'so before i read a single page i already know the argument', guess: 'this is my guess', drt: 'design research tools should be able to be used by ordinary people and not just researchers', vibe: "i'm thinking that's the vibe that the title is giving", conn: 'this is connected to my thesis' });
  addScene(S(k.b2), 'ink', '// 19 — book two', (t) => {
    KT(t, { lines: ['Book two.'], x: L - 6, y: 560, size: 230, times: [k.b2.w[1], k.b2.w[2]] });
    KT(t, { lines: ['Bigger.', 'For my ~thesis.~'], font: 'body', x: L, y: 740, size: 60, lh: 1.25, times: [k.big.w[3], k.thesis.w[1] - 0.1, k.thesis.w[2] - 0.15, k.thesis.w[3] - 0.25] });
    polaroidIn(t, k.big.t, IMG.convivial, 1600, 540, 400, 0.04, 'Book two · for my thesis');
  }, { grid: true });
  sfx('hitS', k.b2.w[1], -5); sfx('card', k.big.t); sfx('mark', k.thesis.w[3] + 0.4, -6);
  // the authors, typed; her "Pieter... it's not Peter, Pieter Jan Stappers" becomes a backspace
  const tA = k.title.w[11], tB = k.notp.w[2] + 0.15, tC = k.pj.t;
  const s1 = 'LIZ SANDERS & PETER', s3 = 'PIETER JAN STAPPERS';
  const cps3 = s3.length / Math.max(0.5, k.pj.e - k.pj.t + 0.2);
  const authorStr = (t) => {
    if (t < tA) return null; if (t < tB) return s1.slice(0, clamp(Math.floor((t - tA) * 22), 0, s1.length));
    const back = clamp(Math.floor((t - tB) * 14), 0, 5); if (t < tC) return s1.slice(0, s1.length - back);
    return s1.slice(0, s1.length - 5) + s3.slice(0, clamp(Math.floor((t - tC) * cps3), 0, s3.length));
  };
  addScene(S(k.title), 'paper', '// 19 — book two', (t) => {
    beat(t, 0, k.three.t - 0.1, () => {
      KT(t, { lines: ['Convivial', 'Toolbox'], x: L - 6, y: 360, size: 210, times: k.title.w.slice(0, 2) });
      KT(t, { lines: ['~Generative Research for the Front End of Design~'], font: 'serif', x: L, y: 700, size: 56, ul: false, times: TM({ t: k.title.w[2], w: k.title.w.slice(2, 10) }, 8) });
      const s = authorStr(t); if (s != null) { const f = F.mono(34, 500); txt(s, L + 4, 830, f, g.fg, 'left', 'alphabetic', 34 * 0.14); if (t < k.pj.e + 0.8 && Math.floor(t * 2.2) % 2 === 0) rect(L + 4 + tw(s, f, 34 * 0.14) + 6, 800, 3, 38, g.fg); }
      polaroid(IMG.convivial, 1570, 560, 420, -0.03, 'Sanders & Stappers', {});
    });
    beat(t, k.three.t - 0.1, 1e9, () => {
      withA(prog(t, k.three.w[5], 0.25), () => mono('The title has three major words', L + 6, 250, 28, g.mid, 'left', { ls: 0.24 }));
      IDX(t, [
        { n: '01', s: 'Convivial', tin: k.conv.w[1], tag: { t: k.main.w[7], s: 'The main word' } },
        { n: '02', s: 'Generative', tin: k.gen.w[1] },
        { n: '03', s: 'Toolbox', tin: k.tool.w[4], dim: k.tool.w[5] + 0.3, tag: { t: k.tool.w[5], s: 'I know this one', col: g.mid } },
        { n: '04', s: 'Front end of design', tin: k.fe.w[3] },
      ], { x: L, y: 420, rowH: 150, size: 100 });
    });
  });
  sfxType(tA, s1.length, 22); sfx('type', tB, -3, { n: 5, d: 5 / 14 }); sfxType(tC, s3.length, cps3);
  sfx('tick', k.conv.w[1]); sfx('tick', k.gen.w[1]); sfx('tick', k.tool.w[4]); sfx('tick', k.fe.w[3]);
  addScene(S(k.mean), 'ink', '// 20 — convivial', (t) => {
    beat(t, 0, k.ded.t - 0.1, () => sent(t, { lines: ['What does ~convivial~ mean?'], y: 580, size: 130, times: k.mean.w }));
    beat(t, k.ded.t - 0.1, 1e9, () => {
      const p = sn(t, k.ded.t, 0.45);
      withA(clamp(p * 2), () => {
        const x = 460, y = 300 + 40 * (1 - p), w = 1000, h = 480; rect(x, y, w, h, C.card);
        mono('Dedicated to', x + 70, y + 100, 26, C.mid, 'left', { ls: 0.24 }); hline(x + 70, y + 130, w - 140, 1, C.line, 2);
        const n1 = 'Ivan'; typeText(t, k.ivan.w[6] - 0.1, n1, x + 66, y + 300, F.serifR(150), C.ink, { cps: 12, caretTo: k.ivan.w[7] + 0.4 });
        const ix = x + 66 + tw('Ivan ', F.serifR(150), 0);
        KT(t, { lines: ['~Illich~'], font: 'serif', x: ix, y: y + 300, size: 150, times: [k.ivan.w[7] + 0.35], acc: C.blue, ul: true });
        withA(prog(t, k.phil.w[3], 0.3), () => mono('A philosopher', x + 70, y + 400, 24, C.mid, 'left', { ls: 0.2 }));
        withA(prog(t, k.his.w[1], 0.3), () => mono('His idea: convivial tools', x + w - 70, y + 400, 24, C.blue, 'right', { ls: 0.2 }));
      });
    });
  });
  sfx('mark', k.mean.w[2] + 0.4, -6); sfx('card', k.ded.t); sfx('type', k.ivan.w[6] - 0.1, -3, { n: 4, d: 0.33 }); sfx('mark', k.ivan.w[7] + 0.6, -4);
  addScene(S(k.power), 'paper', '// 20 — convivial', (t) => {
    withA(prog(t, k.power.t, 0.25), () => mono('Convivial tools', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['Tools that give', '*power back*', 'to the person using them.'], font: 'body', x: L, y: 420, size: 96, lh: 1.12, times: [...k.power.w.slice(3, 6), k.power.w[6], k.power.w[7], ...k.power.w.slice(8, 13)] });
    // the power slider: expert -> user
    const sp = prog(t, k.exp.t - 0.2, 0.3); if (sp <= 0) return;
    withA(sp, () => {
      const x = L, y = 830, w = W - 2 * L; hline(x, y, w, 1, g.fg, 3);
      mono('Dependent on an expert', x, y - 34, 24, g.mid, 'left', { ls: 0.2 }); mono('The person using them', x + w, y - 34, 24, C.blue, 'right', { ls: 0.2 });
      const kx = lerp(x + 20, x + w - 20, E.inOutCubic(prog(t, k.exp.w[6], 0.9))); rect(kx - 20, y - 20, 40, 40, C.blue);
    });
  });
  sfx('whoosh', k.exp.w[6], -8);
  addScene(S(k.before), 'ink', '// 20 — my guess', (t) => {
    withA(prog(t, k.before.t, 0.25), () => mono('Before I read a single page', L + 6, 250, 28, g.mid, 'left', { ls: 0.24 }));
    withA(prog(t, k.guess.w[3], 0.25), () => mono('— my guess:', L + 6 + monoW('Before I read a single page', 28, { ls: 0.24 }) + 20, 250, 28, C.blueT, 'left', { ls: 0.24 }));
    beat(t, 0, k.drt.t - 0.12, () => KT(t, { lines: ['I already know', 'the ~argument.~'], font: 'body', x: L, y: 480, size: 130, lh: 1.1, times: pick(k.before, [7, 8, 9, 10, 11]) }));
    KT(t, { lines: ['Design research tools', 'for *ordinary people,*', 'not just researchers.'], x: L - 4, y: 430, size: 130, lh: 1.0, times: [...k.drt.w.slice(0, 3), k.drt.w[9], k.drt.w[10], k.drt.w[11], k.drt.w[13], k.drt.w[14], k.drt.w[15]] });
    withA(prog(t, k.vibe.w[3], 0.3), () => mono("That's the vibe the title is giving", L + 6, 900, 26, g.mid, 'left', { ls: 0.2 }));
    withA(prog(t, k.conn.w[3], 0.3), () => mono('— and it connects to my thesis', L + 6, 960, 26, C.blueT, 'left', { ls: 0.2 }));
  });
  sfx('hitS', k.drt.w[10], -6);

  /* ---------- 19 · structure of book two ---------- */
  const k2 = PS({ st: "now let's move on to the structure of the book", three: 'it has three parts', pcs: 'it has parts and then chapters and sub chapters', p1: 'part one is kind of like basics', up: 'the underlying principle', p2: 'and then we have part two cases from practice', p3: 'and then part three is how to use the tool', tt: 'the tools and the techniques', pg: 'also keep in mind the page number', e1: 'part one is about 80 pages', e2: 'part two is 50 pages', e3: 'and part three is over 140 pages', half: 'so more than half the book is the howto section', theory: 'even though it opens with the theory', prac: 'i already know that this is a very practical book', man: "it's pretty much a manual that is masquerading as a textbook", change: 'and that would change the way i read it', front: 'the theory that is at the front', back: 'the practical part at the back make sense', around: 'not the other way around' });
  addScene(S(k2.st), 'ink', '// 21 — structure', (t) => {
    withA(prog(t, k2.pcs.w[4], 0.25), () => mono('Parts. Then chapters. Then sub-chapters.', L + 6, 250, 28, g.mid, 'left', { ls: 0.24 }));
    beat(t, 0, k2.p1.t - 0.12, () => KT(t, { lines: ['The structure:', '*three parts.*'], x: L - 4, y: 520, size: 190, times: [k2.st.w[6], k2.st.w[6] + 0.15, k2.three.w[2], k2.three.w[3]] }));
    IDX(t, [
      { n: 'Part 1', s: 'Basics', tin: k2.p1.t, sub: 'The underlying principles', },
      { n: 'Part 2', s: 'Cases from practice', tin: k2.p2.w[5] },
      { n: 'Part 3', s: 'Tools & techniques', tin: k2.p3.w[3], sub: 'How to use the tools' },
    ], { x: L, y: 420, rowH: 200, size: 120, numW: 190, subBelow: true, subDy: 60, ruleDy: 100 });
  });
  sfx('tick', k2.p1.t); sfx('tick', k2.p2.w[5]); sfx('tick', k2.p3.w[3]);
  addScene(S(k2.pg), 'paper', '// 21 — structure', (t) => {
    withA(prog(t, k2.pg.w[4], 0.25), () => mono('The page count tells you something too', L + 6, 250, 28, g.mid, 'left', { ls: 0.24 }));
    const full = W - 2 * L - 360;
    [['Part 1 · basics', '≈ 80 pages', 80, k2.e1.w[4]], ['Part 2 · cases', '≈ 50 pages', 50, k2.e2.w[3]], ['Part 3 · tools', '140+ pages', 140, k2.e3.w[5]]].forEach(([lab, val, n, ti], i) => {
      const p = prog(t, ti - 0.1, 0.25); if (p <= 0) return; const y = 390 + i * 190; const bp = E.outExpo(prog(t, ti, 0.9));
      withA(p, () => {
        mono(lab, L, y - 24, 26, g.fg, 'left', { ls: 0.2 });
        const hl = i === 2 && t >= k2.half.w[2];
        rect(L, y, full * (n / 140) * bp, 90, hl ? C.blue : C.ink);
        mono(val, L + full * (n / 140) * bp + 30, y + 60, 34, hl ? C.blue : g.fg, 'left', { ls: 0.06 });
      });
    });
    withA(prog(t, k2.half.w[2], 0.3), () => mono('More than half the book is the how-to', L, 1000, 28, C.blue, 'left', { ls: 0.2 }));
  });
  sfx('tick', k2.e1.w[4]); sfx('tick', k2.e2.w[3]); sfx('tick', k2.e3.w[5]); sfx('hitS', k2.half.w[2], -6);
  addScene(S(k2.theory, 0.9), 'ink', '// 21 — structure', (t) => {
    KT(t, { lines: ['Opens with theory.'], x: L - 4, y: 460, size: 150, col: g.mid, times: [k2.theory.w[3], k2.theory.w[4], k2.theory.w[6]] });
    KT(t, { lines: ['*Very practical.*'], x: L - 4, y: 680, size: 190, times: [k2.prac.w[7], k2.prac.w[7] + 0.18] });
  });
    addScene(k2.man.w[1] - 0.1, 'blue', '// 21 — structure', (t) => {
    KT(t, { lines: ['A manual'], x: L - 6, y: 380, size: 250, times: [k2.man.w[3], k2.man.w[4]] });
    KT(t, { lines: ['~masquerading as~'], font: 'serif', x: L, y: 610, size: 200, acc: g.fg, times: [k2.man.w[7], k2.man.w[8]] });
    KT(t, { lines: ['a textbook.'], x: L - 6, y: 880, size: 250, times: [k2.man.w[9], k2.man.w[10]] });
  }, { grid: true });
  sfx('hit', k2.man.w[4], -3); sfx('mark', k2.man.w[8] + 0.3, -5);
  addScene(S(k2.change), 'paper', '// 21 — structure', (t) => {
    withA(prog(t, k2.change.w[3], 0.25), () => mono('That changes the way I read it', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    const a = sn(t, k2.front.w[1], 0.4), b = sn(t, k2.back.w[1], 0.4);
    if (a > 0) withA(clamp(a * 2), () => { mono('At the front', L, 470, 26, g.mid, 'left', { ls: 0.2 }); txt('THEORY', L - 6, 610 + 20 * (1 - a), F.disp(170), g.fg, 'left', 'alphabetic', 170 * LS.disp); });
    arrowR(820, 555, 1060, E.outExpo(prog(t, k2.back.w[5], 0.5)), C.blue, 6, 26);
    if (b > 0) withA(clamp(b * 2), () => { mono('At the back', 1100, 470, 26, g.mid, 'left', { ls: 0.2 }); txt('PRACTICE', 1094, 610 + 20 * (1 - b), F.disp(170), C.blue, 'left', 'alphabetic', 170 * LS.disp); });
    withA(prog(t, k2.back.w[6], 0.3), () => mono('The theory is there to make the practice make sense', L, 800, 28, g.fg, 'left', { ls: 0.16 }));
    withA(prog(t, k2.around.w[1], 0.3), () => mono('— not the other way around', L, 860, 28, g.mid, 'left', { ls: 0.16 }));
  });
  sfx('card', k2.front.w[1]); sfx('card', k2.back.w[1]);

  /* ---------- 20 · chapter one: who is creative? ---------- */
  const k3 = PS({ dive: 'so now if i dive deep into chapter one', intro: 'chapter one is the introduction', qs: 'there are some questions in the subheadings', who: 'who is creative', good: 'good question', dk: "i don't know", tell: "you're so creative", notme: "i sometimes don't think of myself as being creative", ridic: 'this person is ridiculously creative', nice: 'this is a nice way to start', why: 'why are people expressing a need for creativity now', biz: 'business and design are changing', inter: 'so really interesting questions', first: 'but the first question', notab: "it's not about design research or what is generative research", claim: 'rests on a claim about ordinary people', every: 'that everybody is creative', nobody: 'or nobody is creative', select: 'or only a select people are creative', link: 'that is linking already back to the main word convivial', shelf: 'so now i have a shelf for this idea in my mind' });
  const subRows = (t) => [
    { n: '1.1', s: 'Who is creative?', tin: k3.who.t },
    { n: '1.2', s: 'Why are people expressing a need for creativity now?', tin: k3.why.t },
    { n: '1.3', s: 'Business and design are changing', tin: k3.biz.t },
  ];
  addScene(S(k3.dive), 'paper', '// 22 — book two · ch 01', (t) => {
    withA(prog(t, k3.intro.w[3], 0.25), () => mono('Chapter 01 — Introduction', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    withA(prog(t, k3.qs.w[3], 0.25), () => mono('Sub-headings', L + 6, 420, 26, C.blue, 'left', { ls: 0.24 }));
    IDX(t, subRows(t), { x: L, y: 540, rowH: 130, size: 62, font: 'body', weight: 700, numW: 110 });
  });
  sfx('tick', k3.who.t);
  addScene(S(k3.who, 0.05) + 0.9, 'paper', '// 22 — book two · ch 01', (t) => {
    sent(t, { lines: ['Who is ~creative?~'], y: 520, size: 190, times: [k3.who.w[0], k3.who.w[1], k3.who.w[2]] });
    withA(prog(t, k3.good.t, 0.25), () => mono('Good question.', 960, 740, 28, g.mid, 'center', { ls: 0.24 }));
    withA(prog(t, k3.dk.t, 0.25), () => mono("I don't know.", 960, 800, 28, g.mid, 'center', { ls: 0.24 }));
  }, { trans: 'whip' });
  sfx('whoosh', S(k3.who, 0.05) + 0.9, -8); sfx('mark', k3.who.w[2] + 0.5, -5);
  addScene(S(k3.tell, 2.2), 'ink', '// 22 — book two · ch 01', (t) => {
    const lines = [['“Oh yeah, you’re so creative.”', k3.tell.t - 0.4, 'What I tell people'], ['I don’t think of myself as creative.', k3.notme.w[2], 'What I think of me'], ['“This person is ridiculously creative.”', k3.ridic.w[2], 'People I meet']];
    lines.forEach(([s, ti, lab], i) => {
      const p = sn(t, ti, 0.4); if (p <= 0) return; const y = 360 + i * 210;
      withA(clamp(p * 2), () => { mono(lab, L + 4, y - 70, 24, g.mid, 'left', { ls: 0.2 }); withBlur(8 * (1 - p), () => txt(s, L, y + 10 * (1 - p), F.body(76, 700), i === 2 ? C.blueT : g.fg, 'left', 'alphabetic', 76 * LS.body)); });
    });
    KT(t, { lines: ['A nice way to start: *who is creative?*'], font: 'body', x: L, y: 980, size: 48, times: [...pick(k3.nice, [3, 4, 5, 6, 6]), k3.nice.e + 0.2, k3.nice.e + 0.35, k3.nice.e + 0.5] });
  });
  sfx('card', k3.notme.w[2], -3); sfx('card', k3.ridic.w[2], -3);
  addScene(S(k3.why, 1.3), 'paper', '// 22 — book two · ch 01', (t) => {
    withA(prog(t, k3.why.t - 1.2, 0.25), () => mono('Chapter 01 — the next questions', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, subRows(t), { x: L, y: 540, rowH: 130, size: 62, font: 'body', weight: 700, numW: 110, focus: (tt) => (tt >= k3.inter.t ? -1 : tt >= k3.biz.t ? 2 : tt >= k3.why.t ? 1 : 0) });
    withA(prog(t, k3.inter.w[2], 0.3), () => mono('Really interesting questions', L + 6, 960, 26, C.blue, 'left', { ls: 0.2 }));
  });
  sfx('tick', k3.why.t); sfx('tick', k3.biz.t);
  addScene(S(k3.first), 'ink', '// 22 — book two · ch 01', (t) => {
    beat(t, 0, k3.claim.t - 0.1, () => {
      KT(t, { lines: ['The first question', 'is *not* about…'], font: 'body', x: L, y: 250, size: 64, lh: 1.1, times: [k3.first.w[1], k3.first.w[2], k3.first.w[3], k3.notab.w[0], k3.notab.w[1], k3.notab.w[2]] });
      const n = prog(t, k3.notab.w[3], 0.3), m = prog(t, k3.notab.w[8], 0.3);
      withA(n, () => { txt('DESIGN RESEARCH', L - 4, 520, F.disp(130), C.inkMid, 'left', 'alphabetic', 130 * LS.disp); strikeBar(L, 475, tw('DESIGN RESEARCH', F.disp(130), 130 * LS.disp), prog(t, k3.notab.w[5], 0.3), C.blueT, 12); });
      withA(m, () => { txt('GENERATIVE RESEARCH', L - 4, 670, F.disp(130), C.inkMid, 'left', 'alphabetic', 130 * LS.disp); strikeBar(L, 625, tw('GENERATIVE RESEARCH', F.disp(130), 130 * LS.disp), prog(t, k3.notab.w[9] + 0.3, 0.3), C.blueT, 12); });
      KT(t, { lines: ["It's *who is creative.*"], x: L - 4, y: 880, size: 130, times: [k3.notab.w[9] + 0.7, k3.notab.w[9] + 0.85, k3.notab.w[9] + 1.0, k3.notab.w[9] + 1.15] });
    });
    beat(t, k3.claim.t - 0.1, 1e9, () => {
      withA(prog(t, k3.claim.t, 0.25), () => mono('The whole argument rests on a claim about', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
      KT(t, { lines: ['*Ordinary people.*'], x: L - 4, y: 440, size: 170, times: [k3.claim.w[5], k3.claim.w[6]] });
      IDX(t, [{ n: '01', s: 'Everybody is creative', tin: k3.every.w[1] }, { n: '02', s: 'Nobody is creative', tin: k3.nobody.w[1] }, { n: '03', s: 'Only a select few', tin: k3.select.w[3] }], { x: L, y: 640, rowH: 125, size: 84 });
    });
  });
  sfx('mark', k3.notab.w[5], -5); sfx('mark', k3.notab.w[9] + 0.3, -5); sfx('hitS', k3.claim.w[6], -6); sfx('tick', k3.every.w[1]); sfx('tick', k3.nobody.w[1]); sfx('tick', k3.select.w[3]);
  addScene(S(k3.link), 'paper', '// 22 — book two · ch 01', (t) => {
    withA(prog(t, k3.link.w[3], 0.25), () => mono('Linking back to the main word', L + 6, 260, 28, g.mid, 'left', { ls: 0.24 }));
    const a = sn(t, k3.link.w[2], 0.4), b = sn(t, k3.link.w[9], 0.4);
    if (a > 0) withA(clamp(a * 2), () => txt('ORDINARY PEOPLE', L - 4, 440, F.disp(110), g.fg, 'left', 'alphabetic', 110 * LS.disp));
    if (b > 0) withA(clamp(b * 2), () => txt('CONVIVIAL', 1810, 440, F.disp(110), C.blue, 'right', 'alphabetic', 110 * LS.disp));
    const lp = E.outExpo(prog(t, k3.link.w[9] + 0.2, 0.7)); const lx0 = L + tw('ORDINARY PEOPLE', F.disp(110), 110 * LS.disp) + 30, lx1 = 1810 - tw('CONVIVIAL', F.disp(110), 110 * LS.disp) - 30;
    handLine(lx0, 400, lx1 - lx0, lp, C.blue, 5, 3);
    // a shelf for this idea
    const sp = prog(t, k3.shelf.w[5], 0.5); if (sp > 0) {
      mono('Shelf', L, 740, 26, C.blue, 'left', { ls: 0.08 }); hline(L + 130, 760, (W - 2 * L - 130) * E.outExpo(sp), 1, C.ink, 4);
      const cp = E.outQuint(prog(t, k3.shelf.w[7], 0.55)); if (cp > 0) withA(clamp(cp * 3), () => withT(lerp(1300, 520, cp), lerp(420, 710, cp), 1, 0.3 * (1 - cp), () => { rect(-200, -46, 400, 92, C.ink); mono('Idea: everyone is creative?', -176, 8, 18, C.card, 'left', { ls: 0.1 }); }));
    }
  });
  sfx('mark', k3.link.w[9] + 0.2, -4); sfx('click', k3.shelf.w[7] + 0.5);

  /* ---------- 21 · chapter ten: bridging ---------- */
  const k4 = PS({ skip: 'and if i skip to the last part of the book', br: 'bridging', q1: 'where are the gaps', q2: 'where and when does bridging happen', q3: 'who is bridging the gap', q4: 'what are the ways we can bridge the gap', hav: "i haven't read this book", prob: 'there is a gap problem somewhere in this book', own: 'it matters enough that it gets its own chapter', meet: 'so when i meet the word gap in part one', att: 'i should pay attention to it', cold: 'if i had read it cold without doing this', miss: 'i would have probably missed it', ch2: 'i would have seen the word gap in chapter two' });
  addScene(S(k4.skip), 'ink', '// 23 — book two · ch 10', (t) => {
    KT(t, { lines: ['The last part:', '~chapter 10.~'], font: 'body', x: L, y: 220, size: 60, lh: 1.0, times: [...pick(k4.skip, [5, 6, 7]), k4.skip.e + 0.4, k4.skip.e + 0.6] });
    KT(t, { lines: ['*Bridging.*'], x: L - 6, y: 470, size: 200, times: [k4.br.t] });
    IDX(t, [{ n: 'Q1', s: 'Where are the gaps?', tin: k4.q1.t }, { n: 'Q2', s: 'Where and when does bridging happen?', tin: k4.q2.t }, { n: 'Q3', s: 'Who is bridging the gap?', tin: k4.q3.t }, { n: 'Q4', s: 'What are the ways we can bridge the gap?', tin: k4.q4.t }], { x: L, y: 610, rowH: 110, size: 54, font: 'body', weight: 700 });
  });
  sfx('hitS', k4.br.t, -6); [k4.q1.t, k4.q2.t, k4.q3.t, k4.q4.t].forEach(x => sfx('tick', x));
  addScene(S(k4.hav), 'paper', '// 23 — book two · ch 10', (t) => {
    withA(prog(t, k4.hav.t, 0.25), () => mono("I haven't read this book. But now I know:", L + 6, 300, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ["There's a *gap*", 'problem.'], x: L - 6, y: 540, size: 230, times: [k4.prob.w[0], k4.prob.w[2], k4.prob.w[3], k4.prob.w[4]] });
    withA(prog(t, k4.own.w[7], 0.3), () => mono('It matters enough to get its own chapter', L + 6, 900, 28, C.blue, 'left', { ls: 0.2 }));
  });
  sfx('hitS', k4.prob.w[3], -5);
  // the same page, read primed vs read cold
  const page = (t, x, y, lab, markT, dim) => {
    const w = 780, h = 600; rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
    mono(lab, x + 50, y + 70, 24, dim ? C.mid : C.blue, 'left', { ls: 0.2 }); hline(x + 50, y + 96, w - 100, 1, C.line, 2);
    const words = ['designers', 'and', 'users', 'meet', 'across', 'a', 'gap', 'in', 'what', 'they', 'know', 'and', 'what', 'they', 'can', 'say', 'about', 'it'];
    for (let r = 0; r < 7; r++) {
      const ry = y + 160 + r * 60;
      if (r === 3) { let xx = x + 50; ['…the', 'people', 'on', 'each', 'side', 'of', 'the', 'gap', 'need…'].forEach(s => { const f = F.body(30, 500); const ww = tw(s, f); const isGap = s === 'gap'; if (isGap && markT != null) marker(xx - 6, ry - 28, ww + 12, 40, prog(t, markT, 0.3), C.blue); txt(s, xx, ry, f, isGap && markT != null && t >= markT + 0.1 ? C.card : C.ink, 'left'); xx += ww + 12; }); }
      else lbar(x + 50, ry - 18, (w - 100) * [0.92, 0.84, 0.95, 1, 0.9, 0.78, 0.6][r], 16, '#D8D1C4');
    }
    if (dim) withA(prog(t, dim, 0.3), () => mono('Missed it', x + w - 50, y + h - 40, 24, C.mid, 'right', { ls: 0.2 }));
    else if (markT != null) withA(prog(t, k4.att.w[2], 0.3), () => mono('Pay attention →', x + w - 50, y + h - 40, 24, C.blue, 'right', { ls: 0.2 }));
  };
  addScene(S(k4.meet), 'paper', '// 23 — book two · ch 10', (t) => {
    const a = sn(t, k4.meet.w[5] - 0.1, 0.45), b = sn(t, k4.cold.w[5] - 0.1, 0.45);
    if (a > 0) withA(clamp(a * 2), () => page(t, L, 250 + 40 * (1 - a), 'Part one · read after priming', k4.meet.w[6], null));
    if (b > 0) withA(clamp(b * 2), () => page(t, 1030, 250 + 40 * (1 - b), 'Part one · read cold', null, k4.miss.w[4]));
    withA(prog(t, k4.ch2.t, 0.3), () => mono("I'd have seen the word — and not thought much of it", 960, 960, 26, g.mid, 'center', { ls: 0.18 }));
  });
  sfx('card', k4.meet.w[5] - 0.1); sfx('mark', k4.meet.w[6], -3); sfx('card', k4.cold.w[5] - 0.1);

  /* ---------- 22 · worth it ---------- */
  const k5 = PS({ great: 'so really great method to read', work: 'it feels like a lot of work', less: 'but it takes less time than you think', few: 'a few minutes for a book', mem: 'memorize the chapters if you can', over: "it's honestly not something that would overwhelm you", ant: 'that will raise your anticipation', exc: 'make you excited for reading about the book', shape: "because you've seen the shape", ask: "you're already asking questions", cur: "you're curious now", what: 'what is this person trying to say', build: 'so it builds up your anticipation' });
  addScene(S(k5.great), 'paper', '// 24 — worth it', (t) => {
    beat(t, 0, k5.less.t - 0.1, () => {
      withA(prog(t, k5.great.w[2], 0.25), () => mono('Really great method, if you ask me', L + 6, 330, 28, g.mid, 'left', { ls: 0.24 }));
      KT(t, { lines: ['It feels like', 'a lot of *work.*'], x: L - 6, y: 560, size: 200, times: k5.work.w });
    });
    beat(t, k5.less.t - 0.1, 1e9, () => {
      withA(prog(t, k5.less.w[2], 0.25), () => mono('It takes less time than you think', L + 6, 330, 28, g.mid, 'left', { ls: 0.24 }));
      KT(t, { lines: ['A few ~minutes~', 'for a book.'], font: 'body', x: L, y: 560, size: 170, lh: 1.05, times: k5.few.w });
      withA(prog(t, k5.mem.t, 0.3), () => mono('Memorise the chapters, if you can', L + 6, 900, 26, g.fg, 'left', { ls: 0.2 }));
      withA(prog(t, k5.over.w[6], 0.3), () => mono("It won't overwhelm you", L + 6, 960, 26, g.mid, 'left', { ls: 0.2 }));
    });
  });
  sfx('whoosh', k5.less.t - 0.1, -9); sfx('mark', k5.few.w[2] + 0.5, -3);
  addScene(S(k5.ant, 1.2), 'ink', '// 24 — worth it', (t) => {
    KT(t, { lines: ['It raises your', '*anticipation.*'], x: L - 4, y: 380, size: 170, times: [k5.ant.w[1], k5.ant.w[2], k5.ant.w[3], k5.ant.w[4]] });
    const f = 0.12 + 0.3 * E.outCubic(prog(t, k5.ant.w[4], 0.8)) + 0.15 * E.outCubic(prog(t, k5.exc.w[2], 0.6)) + 0.13 * E.outCubic(prog(t, k5.shape.w[3], 0.6)) + 0.1 * E.outCubic(prog(t, k5.ask.w[3], 0.6)) + 0.1 * E.outCubic(prog(t, k5.cur.w[1], 0.6)) + 0.1 * E.outCubic(prog(t, k5.build.w[3], 0.6));
    const foot = t >= k5.cur.w[1] ? "You're curious now" : t >= k5.ask.w[2] ? "You're already asking questions" : t >= k5.shape.w[3] ? "You've seen the shape" : t >= k5.exc.w[1] ? 'Excited to read it' : '';
    meter(t, L, 620, W - 2 * L, 120, f, { cells: 18, label: 'Anticipation', value: Math.round(f * 100) + '%', foot });
    KT(t, { lines: ['“What is this person ~trying to say?~”'], font: 'body', x: L, y: 960, size: 56, times: TM(k5.what, 7) });
  });
  [k5.ant.w[4], k5.exc.w[2], k5.shape.w[3], k5.ask.w[3], k5.cur.w[1], k5.build.w[3]].forEach(x => sfx('tick', x, -3));

  /* ---------- 23 · recap ---------- */
  const k6 = PS({ nf: 'for nonfiction books this method is just a nobrainer for me now', bef: 'so yeah before reading that book', cont: 'go over the content', sub: 'go over the subheadings the headings the chapters', guess: 'take a guess about what the argument of the book is about', tt: 'i prefer the tiktok version of just memorizing it', force: 'when i force myself to memorize the headings the chapters', sticks: 'it just sticks for me', more: 'memorizing actually sticks for me more' });
  addScene(S(k6.nf), 'blue', '// 25 — recap', (t) => {
    KT(t, { lines: ['Non-fiction:', 'a no-brainer.'], x: L - 6, y: 500, size: 270, lh: 0.95, times: [k6.nf.w[1], k6.nf.w[7], k6.nf.w[8]] });
  }, { grid: true });
  sfx('hit', k6.nf.w[8], -5);
  addScene(S(k6.bef), 'paper', '// 25 — recap', (t) => {
    withA(prog(t, k6.bef.w[2], 0.25), () => mono('Before reading the book', L + 6, 240, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, [{ n: '01', s: 'Go over the contents', tin: k6.cont.w[3] }, { n: '02', s: 'The sub-headings & headings', tin: k6.sub.w[3] }, { n: '03', s: 'The chapters', tin: k6.sub.w[7] }, { n: '04', s: 'Take a guess at the argument', tin: k6.guess.w[1] }], { x: L, y: 390, rowH: 150, size: 96 });
  });
  [k6.cont.w[3], k6.sub.w[3], k6.sub.w[7], k6.guess.w[1]].forEach(x => sfx('tick', x));
  addScene(S(k6.tt), 'ink', '// 25 — recap', (t) => {
    withA(prog(t, k6.tt.w[3], 0.25), () => mono('For me: the TikTok version', L + 6, 330, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['*Memorise it.*'], x: L - 6, y: 610, size: 280, times: [k6.tt.w[7], k6.tt.w[8]] });
    KT(t, { lines: ['It ~sticks.~'], font: 'body', x: L, y: 840, size: 110, times: [k6.sticks.w[0], k6.sticks.w[2]] });
  });
  sfx('hitS', k6.tt.w[7], -5); sfx('mark', k6.sticks.w[2] + 0.4, -5);

  /* ---------- 24 · fiction ---------- */
  const k7 = PS({ fic: "and for fiction i don't think you should be doing this for fiction", novel: 'is not knowing what is coming next', toc: "so i don't even think that fiction has a table of contents", does: 'oh fiction does actually', noP: "but really there's no point in doing that for fiction" });
  addScene(S(k7.fic), 'paper', '// 26 — fiction?', (t) => {
    const bp = sn(t, k7.fic.w[2], 0.45);
    if (bp > 0) withA(clamp(bp * 2), () => bookCard(L + 30, 260 + 40 * (1 - bp), 440, 600, { title: ["Miss", "Marple's", 'Final', 'Cases'], author: 'Agatha Christie', ts: 76, band: C.ink }));
    const x2 = 720;
    beat(t, 0, k7.novel.t - 0.1, () => KT(t, { lines: ['Not for', 'fiction.'], x: x2, y: 500, size: 200, times: [k7.fic.w[4], k7.fic.w[11], k7.fic.w[12]] }));
    beat(t, k7.novel.t - 0.1, k7.toc.t - 0.1, () => KT(t, { lines: ['The point of a novel', 'is ~not knowing~', 'what comes next.'], font: 'body', x: x2, y: 480, size: 86, lh: 1.15, times: [k7.novel.t - 0.7, k7.novel.t - 0.6, k7.novel.t - 0.5, k7.novel.t - 0.4, k7.novel.t - 0.3, ...k7.novel.w.slice(0, 3), k7.novel.w[4], k7.novel.w[5], k7.novel.w[6]] }));
    beat(t, k7.toc.t - 0.1, 1e9, () => {
      withA(prog(t, k7.toc.w[8], 0.3), () => mono('Has a contents page?', x2, 330, 30, g.mid, 'left', { ls: 0.24 }));
      const q = prog(t, k7.toc.w[9], 0.3), ex = prog(t, k7.does.w[2], 0.25);
      if (ex <= 0) KT(t, { lines: ['?'], x: x2 - 10, y: 800, size: 460, times: [k7.toc.w[9]] });
      else KT(t, { lines: ['!'], x: x2 - 10, y: 800, size: 460, times: [k7.does.w[2]], col: C.orange });
      withA(prog(t, k7.does.w[2] + 0.2, 0.3), () => mono('Oh. Fiction does, actually.', x2 + 260, 700, 30, g.fg, 'left', { ls: 0.2 }));
      withA(prog(t, k7.noP.w[4], 0.3), () => mono('Still no point, for me.', x2 + 260, 760, 30, g.mid, 'left', { ls: 0.2 }));
    });
  });
  sfx('card', k7.fic.w[2]); sfx('tick', k7.toc.w[9]); sfx('hitS', k7.does.w[2], -4);

  /* ---------- 25 · the method, comments, end card ---------- */
  const k8 = PS({ basic: "basically that's the method", rs: 'read the structure', rh: 'read the headings', rc: 'read the chapters before you start reading the book', tg: 'take a guess about what the argument of the book is about', see: 'so yeah see you in my next video', com: 'tell me in the comments what is in your current reading stack', already: 'if you already do something like this', know: 'let me know how it goes for you', bye: 'bye' });
  addScene(S(k8.basic), 'blue', '// 27 — the method', (t) => {
    withA(prog(t, k8.basic.w[2], 0.25), () => mono("That's the method", L + 6, 250, 28, g.mid, 'left', { ls: 0.24 }));
    IDX(t, [{ n: '01', s: 'Read the structure', tin: k8.rs.t }, { n: '02', s: 'Headings & chapters', tin: k8.rh.t }, { n: '03', s: 'Take a guess', tin: k8.tg.t }, { n: '04', s: 'Then read the book', tin: k8.rc.w[5] + 0.1 }], { x: L, y: 400, rowH: 150, size: 110, ruleCol: 'rgba(241,244,255,0.3)' });
  }, { grid: true });
  [k8.rs.t, k8.rh.t, k8.rc.w[5] + 0.1, k8.tg.t].forEach(x => sfx('tick', x));
  addScene(S(k8.see), 'ink', '// 28 — your turn', (t) => {
    beat(t, 0, k8.com.w[5] - 0.12, () => KT(t, { lines: ['See you in my', '~next video.~'], font: 'body', x: L, y: 330, size: 110, lh: 1.1, times: [...pick(k8.see, [2, 3, 4, 5]), k8.see.w[6], k8.see.w[6] + 0.1] }));
    KT(t, { lines: ["What's in *your*", 'reading stack?'], x: L - 6, y: 360, size: 150, times: pick(k8.com, [5, 7, 8, 10, 11]) });
    const p = sn(t, k8.com.w[3], 0.45); if (p <= 0) return;
    const x = L, y = 560 + 40 * (1 - p), w = W - 2 * L, h = 330;
    withA(clamp(p * 2), () => {
      rect(x, y, w, h, C.card); mono('Comments', x + 50, y + 70, 24, C.mid, 'left', { ls: 0.24 }); hline(x + 50, y + 96, w - 100, 1, C.line, 2);
      circle(x + 90, y + 180, 40, C.panel);
      rect(x + 160, y + 140, w - 450, 84, C.card); strokeR(x + 160, y + 140, w - 450, 84, C.ink, 3);
      typeText(t, k8.com.w[8], 'My current reading stack is…', x + 190, y + 196, F.body(38, 500), C.ink, { cps: 18, caretTo: k8.bye.t });
      const sent_ = t >= k8.know.w[2]; rect(x + w - 250, y + 140, 200, 84, sent_ ? C.panel : C.ink); txt(sent_ ? 'SENT ✓' : 'COMMENT', x + w - 150, y + 193, F.mono(24, 500), sent_ ? C.ink : C.card, 'center', 'alphabetic', 24 * 0.12);
      withA(prog(t, k8.already.w[2], 0.3), () => mono('Already do something like this? Let me know how it goes.', x + 160, y + 285, 22, C.mid, 'left', { ls: 0.14 }));
    });
    cursorAt(t, [[k8.know.t - 0.8, 1700, 1040], [k8.know.w[2] - 0.05, W - L - 150, 560 + 180 + 10], [k8.bye.t + 0.3, W - L - 150, 560 + 180 + 10]], [k8.know.w[2]]);
  });
  sfx('card', k8.com.w[3]); sfxType(k8.com.w[8], 28, 18); sfx('click', k8.know.w[2]);
  const END = k8.bye.e + 0.5;
  addScene(END, 'paper', '// 29 — end', (t) => {
    const t0 = END;
    KT(t, { lines: ['How to read'], x: L, y: 470, size: 250, times: [t0 + 0.1, t0 + 0.25, t0 + 0.4] });
    KT(t, { lines: ['and actually ~remember it.~'], font: 'body', x: L + 8, y: 650, size: 104, times: [t0 + 0.7, t0 + 0.8, t0 + 1.0, t0 + 1.0] });
    withA(prog(t, t0 + 1.6, 0.3), () => mono('See you in the next one', L + 8, 960, 26, g.mid, 'left', { ls: 0.24 }));
  });
  sfx('mark', END + 1.4, -5);
}

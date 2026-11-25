/* Scenes, part 1: title, the stack, the problem, the method, origins, priming, why it works (0:00 - 4:28) */
'use strict';
const L = 110;                     // left margin (her decks: ~110-120 px)
function TS(...parts) { return parts.flatMap(([ph, n]) => TM(ph, n)); }
const pick = (ph, idx) => idx.map(i => ph.w[i]);
function sent(t, o) { return KT(t, { font: 'body', align: 'center', x: 960, lh: 1.18, ...o }); }
// scene starts a hair before the first spoken word of its phrase
const S = (ph, lead = 0.12) => ph.t - lead;

function buildScenes1() {
  /* ---------- 0 · title card (paper) ---------- */
  addScene(0, 'paper', '// 00 — intro', (t) => {
    KT(t, { lines: ['How to read'], x: L, y: 470, size: 250, times: [0.2, 0.36, 0.52] });
    KT(t, { lines: ['and actually ~remember it.~'], font: 'body', x: L + 8, y: 650, size: 104, times: [0.95, 1.1, 1.35, 1.35] });
    withA(prog(t, 1.9, 0.3), () => mono('A reading method · tested on two books', L + 8, 960, 26, g.mid, 'left', { ls: 0.24 }));
  });
  sfx('hit', 0.2, -6); sfx('mark', 1.7, -4);

  /* ---------- 1 · "this is my current reading stack" ---------- */
  const k1 = PS({ a: 'so this is my current reading stack', bw: 'by the way i got that phrase from a video i saw', guy: 'this guy was like', q: 'this is my current reading stack', love: 'and i love this so much', nice: "it's always so nice to me", c: 'so yeah this is my current reading stack' });
  const stackHead = (t, ph, from) => {
    KT(t, { lines: ['So, this is my current'], x: L, y: 330, size: 110, times: ph.w.slice(from, from + 5) });
    KT(t, { lines: ['Reading'], x: L - 6, y: 615, size: 300, times: [ph.w[from + 5]] });
    KT(t, { lines: ['*Stack.*'], x: L - 6, y: 880, size: 300, times: [ph.w[from + 6]] });
  };
  addScene(S(k1.a, 0.1), 'ink', '// 01 — the stack', (t) => stackHead(t, k1.a, 0), { grid: true });   // title card holds until just before her first word
  sfx('hitS', k1.a.w[5], -4);

  addScene(S(k1.bw), 'paper', '// 01 — the stack', (t) => {
    beat(t, 0, k1.love.t - 0.05, () => KT(t, { lines: ['By the way, I got that', 'phrase from a ~video~ I saw.'], font: 'body', x: L, y: 470, size: 72, times: k1.bw.w }));
    beat(t, k1.love.t - 0.05, 1e9, () => {
      KT(t, { lines: ['“And I ~love~ this', 'so much.”'], font: 'body', x: L, y: 470, size: 72, times: TM(k1.love, 6) });
      withA(prog(t, k1.nice.t, 0.3), () => mono("It's always so nice to me", L, 700, 26, g.mid, 'left', { ls: 0.2 }));
    });
    // the video he was in: a browser window, cursor presses play on "this guy was like"
    const p = sn(t, k1.bw.w[9], 0.5); if (p <= 0) return;
    const bx = 1010, by = 250 + 60 * (1 - p), bw = 800, bh = 560;
    withA(clamp(p * 2), () => browser(bx, by, bw, bh, { t, url: 'youtube.com/watch', typeT0: k1.bw.w[9] + 0.1, cps: 26, body: (x, y, w, h) => {
      rect(x, y, w, h, C.ink);
      const playing = t >= k1.guy.t + 0.05;
      if (!playing) { ctx.beginPath(); ctx.moveTo(x + w / 2 - 34, y + h / 2 - 44); ctx.lineTo(x + w / 2 + 50, y + h / 2); ctx.lineTo(x + w / 2 - 34, y + h / 2 + 44); ctx.closePath(); ctx.fillStyle = C.card; ctx.fill(); }
      const pr = playing ? clamp((t - k1.guy.t) / 14) : 0;
      rect(x + 30, y + h - 40, w - 60, 4, C.inkLine); rect(x + 30, y + h - 40, (w - 60) * (0.18 + pr * 0.5), 4, C.blueT);
      if (playing) {
        const q = '“This is my current reading stack.”';
        const n = typeText(t, k1.q.t, q, x + 50, y + h / 2 + 10, F.body(40, 700), C.card, { cps: q.length / Math.max(0.6, k1.q.e - k1.q.t), caretTo: k1.q.e + 0.2 });
        if (n === 0) mono('▶  playing', x + 50, y + h / 2 + 10, 24, C.inkMid);
      }
    } }));
    cursorAt(t, [[k1.guy.t - 0.9, 1700, 980], [k1.guy.t - 0.05, bx + bw / 2 + 12, 250 + 64 + (bh - 64) / 2 + 12], [k1.q.e + 0.6, bx + bw / 2 + 12, 250 + 64 + (bh - 64) / 2 + 12], [k1.q.e + 1.2, 1780, 1000]], [k1.guy.t]);
  });
  sfxType(k1.bw.w[9] + 0.1, 17, 26); sfx('click', k1.guy.t); sfxType(k1.q.t, 36, 36 / Math.max(0.6, k1.q.e - k1.q.t)); sfx('mark', k1.love.w[2] + 0.4, -6);

  addScene(S(k1.c), 'ink', '// 01 — the stack', (t) => stackHead(t, k1.c, 1), { grid: true });
  sfx('hitS', k1.c.w[6], -5);

  /* ---------- 2 · three books ---------- */
  const k2 = PS({ three: 'right now i have three books', b1: 'how to read and write critically by alex baratta', lib: 'from the library', b2: 'convivial toolbox', thesis: 'for my thesis', sup: 'suggested it to me', b3: "miss marple's final cases by agatha christie", fic: 'fiction i think is a different thing entirely' });
  addScene(S(k2.three), 'paper', '// 01 — the stack', (t) => {
    KT(t, { lines: ['Right now: *three books.*'], x: L, y: 250, size: 110, times: pick(k2.three, [0, 1, 4, 5]) });
    IDX(t, [
      { n: '01', s: 'How to Read and Write Critically', tin: k2.b1.t, sub: 'Alex Baratta' },
      { n: '02', s: 'Convivial Toolbox', tin: k2.b2.w[0], sub: 'Liz Sanders & Pieter Jan Stappers' },
      { n: '03', s: "Miss Marple's Final Cases", tin: k2.b3.t, sub: 'Agatha Christie', strike: k2.fic.w[0], dim: k2.fic.w[0] + 0.4, tag: { t: k2.fic.w[0] + 0.2, s: 'Fiction — not today', col: C.blue } },
    ], { x: L, y: 470, w: 1200, rowH: 190, size: 60, subBelow: true, subDy: 52, ruleDy: 92, strikeCol: C.blue });   // rules stop before the photo column
    polaroidIn(t, k2.b1.w[6], IMG.baratta, 1530, 465, 300, -0.04, 'From the library', { crop: [0, 0.93], capType: { t, t0: k2.lib.t, caretTo: k2.lib.t + 1.3 } });
    polaroidIn(t, k2.b2.w[0], IMG.convivial, 1735, 745, 290, 0.05, 'For my thesis', { capType: { t, t0: k2.thesis.t, caretTo: k2.sup.e + 0.3 } });
  });
  sfx('tick', k2.b1.t); sfx('card', k2.b1.w[6]); sfxType(k2.lib.t, 16, 24); sfx('tick', k2.b2.w[0]); sfx('card', k2.b2.w[0] + 0.05); sfxType(k2.thesis.t, 13, 24); sfx('tick', k2.b3.t); sfx('mark', k2.fic.w[0], -3);

  /* ---------- 3 · today ---------- */
  const k3 = PS({ today: 'so today i want to talk about', rm: 'a reading method', rem: 'to remember a huge chunk of the things that you read', prac: 'try it practically in this video' });
  addScene(S(k3.today), 'ink', '// 02 — today', (t) => {
    KT(t, { lines: ['Today:'], x: 960, align: 'center', y: 330, size: 110, times: [k3.today.w[1]] });
    sent(t, { lines: ['A reading method to ~remember~', 'a huge chunk of what you read.'], y: 520, size: 92, times: [...k3.rm.w, ...TM(k3.rem, 9)] });
    KT(t, { lines: ["I'll try it, practically, in this video."], font: 'body', weight: 500, align: 'center', x: 960, y: 800, size: 46, col: g.mid, times: TM(k3.prac, 7) });
  });
  sfx('mark', k3.rem.w[1] + 0.3, -4);

  /* ---------- 4 · the problem ---------- */
  const k4 = PS({ read: 'the problem is that you read a book', days: 'some days', weeks: 'some weeks', asks: 'someone asks you later', what: 'what is this book about', gist: 'the general gist', vibe: 'the general vibe', one: 'maybe one or two things', pin: 'but you cannot really pinpoint', more: "you can't give them more information", feel: 'you are left with the feeling about the book', itself: 'as opposed to the book itself', fix: 'is going to fix that' });
  addScene(S(k4.read), 'ink', '// 03 — the problem', (t) => {
    KT(t, { lines: ['You read a book.'], x: L, y: 430, size: 170, times: pick(k4.read, [4, 5, 6, 7]) });
    const d = prog(t, k4.days.t, 0.9), wk = prog(t, k4.weeks.t, 1.6);
    withA(prog(t, k4.days.t - 0.1, 0.25), () => meter(t, L, 600, W - 2 * L, 110, 0.2 * E.outCubic(d) + 0.75 * E.outCubic(wk), { cells: 16, label: 'Time with the book', value: wk > 0 ? 'weeks' : 'days', foot: 'and then someone asks…' }));
  });
  sfx('tick', k4.days.t); sfx('tick', k4.weeks.t);
  addScene(S(k4.asks, 0.3), 'paper', '// 03 — the problem', (t) => {
    eyebrow(t, k4.asks.t, 'The question', 960, 330, { align: 'center' });
    sent(t, { lines: ['“So what is this book about?”'], y: 560, size: 110, times: [k4.what.t, ...k4.what.w] });
  });
    addScene(S(k4.gist), 'ink', '// 03 — the problem', (t) => {
    beat(t, 0, k4.pin.t - 0.1, () => {
      // vague = soft: the gist and the vibe never come into focus
      withBlur(7, () => { KT(t, { lines: ['The gist.'], x: L, y: 360, size: 190, times: [k4.gist.w[1], k4.gist.w[2]], col: C.inkMid }); KT(t, { lines: ['The vibe.'], x: L, y: 560, size: 190, times: [k4.vibe.w[1], k4.vibe.w[2]], col: C.inkMid }); });
      KT(t, { lines: ['*One or two things.*'], x: L, y: 800, size: 130, times: TM(k4.one, 4).slice(0, 4) });
    });
    beat(t, k4.pin.t - 0.1, 1e9, () => {
      const L2 = KT(t, { lines: ["You can't", '*pinpoint* it.'], x: L, y: 450, size: 230, times: [k4.pin.w[2], k4.pin.w[2], k4.pin.w[4], k4.pin.w[4] + 0.15] });
      withA(prog(t, k4.more.t, 0.3), () => mono('No more information than that', L + 6, 800, 26, g.mid, 'left', { ls: 0.2 }));
    });
  });
  sfx('hitS', k4.pin.w[4], -6);
  addScene(S(k4.feel), 'paper', '// 03 — the problem', (t) => {
    sent(t, { lines: ["You're left with ~the feeling~ about", 'the book, not the book itself.'], y: 490, size: 88, times: [...pick(k4.feel, [0, 2, 3, 4, 5, 6, 7, 8]), ...pick(k4.itself, [0, 3, 4, 5])] });
  });
  sfx('mark', k4.feel.w[5] + 0.3, -4);
  addScene(S(k4.fix, 0.9), 'blue', '// 03 — the problem', (t) => {
    KT(t, { lines: ['This method', 'fixes that.'], x: 960, align: 'center', y: 500, size: 290, times: [k4.fix.t - 0.8, k4.fix.t - 0.6, k4.fix.w[3], k4.fix.w[3] + 0.22] });
  });
  sfx('hit', k4.fix.w[3], -3);

  /* ---------- 5 · the method ---------- */
  const k5 = PS({ m: 'the method is pretty much straightforward', before: 'before you read the book', struct: 'you read the structure of the book first', newb: 'you get a new book', toc: 'you go to the table of content first', flip: "you don't just flip and start reading", chap: 'you look at the chapters', sub: 'the subheadings', laid: 'how the whole thing is laid out', page: 'before you even read a single page', then: 'then you can then actually read the book', idea: "that's the whole idea", simple: "it's so simple" });
  addScene(k5.m.t + 0.3, 'paper', '// 04 — the method', (t) => {
    eyebrow(t, k5.m.t, 'The method', 960, 380, { align: 'center' });
    sent(t, { lines: ['Pretty much ~straightforward.~'], y: 580, size: 110, times: pick(k5.m, [3, 4, 5]) });
  });
    addScene(S(k5.before), 'blue', '// 04 — the method', (t) => {
    withA(prog(t, k5.before.t, 0.25), () => mono('Before you read the book', L + 8, 250, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['Read the'], x: L - 6, y: 470, size: 250, times: pick(k5.struct, [1, 2]) });
    KT(t, { lines: ['structure'], x: L - 6, y: 700, size: 250, times: [k5.struct.w[3]], col: C.orange });
    KT(t, { lines: ['first.'], x: L - 6, y: 930, size: 250, times: [k5.struct.w[7]] });
  }, { grid: true });
  sfx('hit', k5.struct.w[3], -2);
  addScene(S(k5.newb), 'paper', '// 04 — the method', (t) => {
    // a new book (left) -> its contents (right)
    const bp = sn(t, k5.newb.w[3], 0.45);
    if (bp > 0) withA(clamp(bp * 2), () => bookCard(L + 40, 300 + 50 * (1 - bp), 380, 520, { title: ['A new', 'book'], author: 'Any author', ts: 64, band: C.blue }));
    const fl = prog(t, k5.flip.t, 0.3);
    if (fl > 0) withA(fl, () => { txt('Flip and start reading', L + 40, 920, F.body(44, 600), g.fg, 'left', 'alphabetic', 44 * LS.body); strikeBar(L + 40, 904, tw('Flip and start reading', F.body(44, 600), 44 * LS.body), prog(t, k5.flip.w[3] + 0.1, 0.35), C.blue, 7); });
    const cp = sn(t, k5.toc.w[4], 0.5);
    if (cp > 0) withA(clamp(cp * 2), () => {
      const x = 700, y = 250 + 60 * (1 - cp), w = 780, h = 640;
      rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
      mono('Contents', x + 50, y + 80, 26, C.mid, 'left', { ls: 0.24 }); hline(x + 50, y + 108, w - 100, 1, C.line, 2);
      const rows = [[0, 'ch'], [1, 's'], [2, 's'], [3, 'ch'], [4, 's'], [5, 'ch'], [6, 's'], [7, 's']];
      const chOn = prog(t, k5.chap.w[4], 0.3), sbOn = prog(t, k5.sub.w[1], 0.3), lay = prog(t, k5.laid.w[5], 0.5);
      rows.forEach(([i, kind], j) => {
        const ry = y + 160 + i * 58; const rp = prog(t, k5.toc.w[4] + 0.15 + j * 0.05, 0.3);
        withA(rp, () => {
          if (kind === 'ch') { mono(String(j < 3 ? 1 : j < 5 ? 2 : 3).padStart(2, '0'), x + 50, ry + 12, 24, C.blue, 'left', { ls: 0.06 }); rect(x + 120, ry - 4, 360 + (j * 37) % 140, 20, chOn > 0 ? C.ink : '#CFC8BB'); }
          else rect(x + 160, ry - 1, 260 + (j * 53) % 160, 12, sbOn > 0 ? C.mid : '#DDD6CA');
        });
      });
      withA(chOn, () => mono('← chapters', x + w + 40, y + 172, 26, C.blue, 'left', { ls: 0.16 }));
      withA(sbOn, () => mono('← sub-headings', x + w + 40, y + 232, 26, C.blue, 'left', { ls: 0.16 }));
      if (lay > 0) { const lx = x + w + 40, y0 = y + 300, y1 = y + h - 50; pline(lx, y0, lx, lerp(y0, y1, E.outCubic(lay)), 1, C.blue, 3); withA(lay, () => mono('the layout', lx + 20, (y0 + y1) / 2 + 8, 26, C.blue, 'left', { ls: 0.16 })); }
      const pg = prog(t, k5.page.t, 0.3); if (pg > 0) withA(pg, () => mono('Pages read: 000', x, y + h + 60, 26, C.ink, 'left', { ls: 0.2 }));
    });
  });
  sfx('card', k5.newb.w[3]); sfx('card', k5.toc.w[4]); sfx('mark', k5.flip.w[3] + 0.1, -4); sfx('tick', k5.chap.w[4]); sfx('tick', k5.sub.w[1]); sfx('tick', k5.page.t, -2);
  addScene(S(k5.then, 0.3), 'ink', '// 04 — the method', (t) => {
    IDX(t, [{ n: '01', s: 'Read the structure', tin: k5.then.t - 0.2 }, { n: '02', s: 'Then read the book', tin: k5.then.w[5] }], { x: L, y: 430, rowH: 170, size: 110, ruleDy: 50 });
    KT(t, { lines: ["That's the whole idea. ~So simple.~"], font: 'body', weight: 600, x: L, y: 850, size: 60, col: g.fg, times: [...k5.idea.w, k5.simple.w[2], k5.simple.w[2] + 0.12] });
  });
  sfx('tick', k5.then.w[5]); sfx('mark', k5.simple.w[2] + 0.4, -6);

  /* ---------- 6 · an old idea ---------- */
  const k6 = PS({ seen: "i've seen it several times", pin: 'pinterest', yt: 'and then on youtube', old: "and it's an old idea", book: 'how to read a book', adler: 'by mortimer adler', y40: 'from 1940', note: "i'm noting this down", get: 'i actually want to get that book and read it' });
  addScene(S(k6.seen), 'ink', '// 05 — an old idea', (t) => {
    withA(prog(t, k6.seen.t, 0.3), () => mono("I've seen it several times", L, 250, 28, g.mid, 'left', { ls: 0.24 }));
    const a = sn(t, k6.pin.t - 0.1, 0.45), b = sn(t, k6.yt.w[3] - 0.1, 0.45);
    if (a > 0) withA(clamp(a * 2), () => browser(L, 340 + 50 * (1 - a), 800, 560, { t, url: 'pinterest.com', typeT0: k6.pin.t, cps: 24, body: (x, y, w, h) => { for (let c = 0; c < 4; c++) for (let r = 0; r < 3; r++) rect(x + 34 + c * 186, y + 30 + r * 150 + (c % 2) * 50, 166, 130 - (r === 2 ? 0 : 0), '#DDD6CA'); } }));
    if (b > 0) withA(clamp(b * 2), () => browser(1010, 340 + 50 * (1 - b), 800, 560, { t, url: 'youtube.com', typeT0: k6.yt.w[3], cps: 24, body: (x, y, w, h) => { rect(x + 34, y + 30, w - 68, 300, '#DDD6CA'); ctx.beginPath(); ctx.moveTo(x + w / 2 - 28, y + 145); ctx.lineTo(x + w / 2 + 36, y + 180); ctx.lineTo(x + w / 2 - 28, y + 215); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); lbar(x + 34, y + 360, 520); lbar(x + 34, y + 392, 320); } }));
  });
  sfx('card', k6.pin.t - 0.1); sfxType(k6.pin.t, 13, 24); sfx('card', k6.yt.w[3] - 0.1); sfxType(k6.yt.w[3], 11, 24);
  addScene(S(k6.old), 'paper', '// 05 — an old idea', (t) => {
    KT(t, { lines: ["It's an *old* idea."], x: L, y: 610, size: 230, times: pick(k6.old, [1, 2, 3, 4]) });
  });
    addScene(S(k6.book, 0.9), 'blue', '// 05 — an old idea', (t) => {
    KT(t, { lines: ['How to Read a Book'], upper: false, x: L, y: 300, size: 130, times: k6.book.w });
    withA(prog(t, k6.adler.w[1], 0.3), () => mono('Mortimer J. Adler', L + 8, 390, 30, g.mid, 'left', { ls: 0.24 }));
    // her 404 slide: a huge number in safety orange, bleeding off the bottom edge
    KT(t, { lines: ['1940'], x: 960, align: 'center', y: 1200, size: 700, times: [k6.y40.w[1]], col: C.orange, blur: 30 });
  }, { grid: true });
  sfx('hit', k6.y40.w[1], -3);
  addScene(S(k6.note, 0.2), 'paper', '// 05 — an old idea', (t) => {
    KT(t, { lines: ["I'm noting", 'this ~down.~'], font: 'body', x: L, y: 470, size: 96, times: [...k6.note.w, k6.note.w[3], k6.note.w[3]] });
    const addT = k6.note.w[3] + 0.15;
    const cp = sn(t, k6.note.t, 0.45); if (cp <= 0) return;
    const x = 980, y = 260 + 50 * (1 - cp), w = 830, h = 560;
    withA(clamp(cp * 2), () => {
      rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
      mono('To read', x + 50, y + 80, 26, C.mid, 'left', { ls: 0.24 }); hline(x + 50, y + 108, w - 100, 1, C.line, 2);
      [['Thinking, Fast and Slow', 1], ['The Design of Everyday Things', 1]].forEach(([s], i) => { strokeR(x + 50, y + 150 + i * 90, 40, 40, '#CFC8BB', 3); lbar(x + 120, y + 163 + i * 90, 380 - i * 60, 14, '#DDD6CA'); });
      const ry = y + 150 + 2 * 90;
      if (t >= addT) { checkbox(x + 50, ry, 40, prog(t, k6.get.w[8], 0.3)); typeText(t, addT + 0.1, 'How to Read a Book — Adler', x + 120, ry + 31, F.body(34, 600), C.ink, { cps: 26, caretTo: addT + 1.4 }); }
      rect(x + 50, y + h - 110, 170, 58, C.ink); txt('+ ADD', x + 135, y + h - 72, F.mono(22, 500), C.card, 'center', 'alphabetic', 22 * 0.16);
    });
    cursorAt(t, [[k6.note.t + 0.1, 1700, 960], [addT - 0.08, 1100, 740], [k6.get.w[7], 1100, 740], [k6.get.w[8] - 0.05, 1080, 626], [k6.get.w[8] + 0.8, 1300, 900]], [addT - 0.05, k6.get.w[8]]);
  });
  sfx('card', k6.note.t); sfx('click', k6.note.w[3] + 0.1); sfxType(k6.note.w[3] + 0.25, 26, 26); sfx('click', k6.get.w[8]);

  /* ---------- 7 · inspectional reading ---------- */
  const k7 = PS({ calls: 'he calls it', insp: 'inspectional reading', ch1: 'before you read chapter one', cp: 'the contents page', ct: 'the chapter titles', sh: 'the subheadings', skim: 'you skim a little', arg: 'laid out their argument' });
  addScene(S(k7.calls), 'paper', '// 06 — inspectional reading', (t) => {
    withA(prog(t, k7.calls.t, 0.25), () => mono('He calls it', L + 8, 330, 30, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ['Inspectional'], x: L - 6, y: 600, size: 250, times: [k7.insp.t] });
    KT(t, { lines: ['~reading.~'], font: 'serif', x: L, y: 840, size: 230, times: [k7.insp.w[1]] });
  });
  sfx('hit', k7.insp.t, -3); sfx('mark', k7.insp.w[1] + 0.5, -4);
  addScene(S(k7.ch1), 'ink', '// 06 — inspectional reading', (t) => {
    KT(t, { lines: ['Before chapter one:'], x: L - 4, y: 280, size: 100, times: TM(k7.ch1, 3) });
    IDX(t, [{ n: '01', s: 'The contents page', tin: k7.cp.w[1] }, { n: '02', s: 'The chapter titles', tin: k7.ct.w[1] }, { n: '03', s: 'The sub-headings', tin: k7.sh.w[1] }, { n: '04', s: 'A little skim', tin: k7.skim.w[1] }], { x: L, y: 400, rowH: 128, size: 88 });
    KT(t, { lines: ['to see how the author laid out the ~argument.~'], font: 'body', weight: 600, x: L, y: 960, size: 46, col: g.mid, times: TM(k7.arg, 9) });
  });
  [k7.cp.w[1], k7.ct.w[1], k7.sh.w[1], k7.skim.w[2]].forEach(x => sfx('tick', x));

  /* ---------- 8 · priming ---------- */
  const k8 = PS({ newer: 'the newer version of it', js: "justin sung's youtube page", sub: 'i subscribe to his youtube channel', prim: 'where he calls this priming', same: 'the same idea', mins: 'you spend a few minutes with the heading', conn: 'how the parts connect', tt: 'the version i saw on tiktok', mem: 'i did use to memorize it', thr: 'read through the headings and the subheadings', memw: 'but memorizing it actually makes it work better for me', stick: 'it makes it stick for me', skim: 'as opposed to just skimming through', map: 'it makes the mapping stronger in my mind' });
  addScene(S(k8.newer), 'ink', '// 07 — priming', (t) => {
    KT(t, { lines: ['The newer version'], x: L, y: 250, size: 100, times: k8.newer.w.slice(0, 3) });
    const p = sn(t, k8.js.t - 0.2, 0.45); if (p <= 0) return;
    const bx = 460, by = 360 + 50 * (1 - p), bw = 1000, bh = 520;
    const subd = t >= k8.sub.w[1] + 0.05;
    withA(clamp(p * 2), () => browser(bx, by, bw, bh, { t, url: 'youtube.com', typeT0: k8.js.t - 0.1, cps: 28, body: (x, y, w, h) => {
      rect(x, y, w, 120, '#DDD6CA');
      circle(x + 150, y + 210, 90, C.ink); txt('JS', x + 150, y + 214, F.mono(54, 500), C.card, 'center', 'middle', 4);
      txt('Justin Sung', x + 280, y + 225, F.body(64, 700), C.ink, 'left', 'alphabetic', -1); lbar(x + 284, y + 262, 300, 14, '#DDD6CA');
      const bxx = x + 280, byy = y + 300; rect(bxx, byy, 250, 66, subd ? '#DDD6CA' : C.ink);
      txt(subd ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', bxx + 125, byy + 42, F.mono(24, 500), subd ? C.ink : C.card, 'center', 'alphabetic', 24 * 0.12);
      for (let i = 0; i < 4; i++) rect(x + 34 + i * 238, y + h - 20 - 10, 218, 10, '#DDD6CA');
    } }));
    cursorAt(t, [[k8.sub.t - 0.8, 1650, 980], [k8.sub.w[1] - 0.02, bx + 280 + 150, by + 64 + 4 + 300 + 40], [k8.sub.e + 1.5, bx + 280 + 150, by + 64 + 4 + 300 + 40]], [k8.sub.w[1]]);
  });
  sfx('card', k8.js.t - 0.2); sfxType(k8.js.t - 0.1, 11, 28); sfx('click', k8.sub.w[1]);
  addScene(S(k8.prim, 0.4), 'paper', '// 07 — priming', (t) => {
    beat(t, 0, k8.mins.t - 0.12, () => {
      withA(prog(t, k8.prim.w[2], 0.25), () => mono('He calls this', 960, 360, 30, g.mid, 'center', { ls: 0.24 }));
      KT(t, { lines: ['*Priming.*'], x: 960, align: 'center', y: 640, size: 300, times: [k8.prim.w[4]] });
      withA(prog(t, k8.same.t, 0.25), () => mono('Same idea', 960, 800, 30, g.mid, 'center', { ls: 0.24 }));
    });
    beat(t, k8.mins.t - 0.12, 1e9, () => {
      sent(t, { lines: ['Spend a few minutes with the headings.', 'Ask ~how the parts connect.~'], y: 400, size: 76, times: [...TM(k8.mins, 7), k8.conn.t - 0.25, ...k8.conn.w] });
      // the parts, connecting
      const pts = [[560, 720], [960, 820], [1360, 720]]; const cc = prog(t, k8.conn.w[3], 0.6);
      pts.forEach(([x, y], i) => { const pp = sn(t, k8.conn.t + i * 0.1, 0.35); withA(pp, () => { rect(x - 110, y - 40, 220, 80, i === 1 ? C.ink : C.card); strokeR(x - 110, y - 40, 220, 80, C.ink, 3); mono('Part ' + (i + 1), x, y + 9, 24, i === 1 ? C.card : C.ink, 'center', { ls: 0.16 }); }); });
      pline(670, 730, 850, 800, cc, C.blue, 4); pline(1070, 800, 1250, 730, prog(t, k8.conn.w[3] + 0.25, 0.5), C.blue, 4);
    });
  });
  sfx('hitS', k8.prim.w[4], -4); sfx('whoosh', k8.mins.t - 0.1, -8); sfx('tick', k8.conn.w[3]);
  addScene(S(k8.tt), 'ink', '// 07 — priming', (t) => {
    KT(t, { lines: ['The TikTok version:'], x: L, y: 360, size: 90, times: pick(k8.tt, [0, 5, 5]) });
    KT(t, { lines: ['*Memorise it.*'], x: L - 4, y: 610, size: 190, times: [k8.mem.w[4], k8.mem.w[5]] });
    withA(prog(t, k8.thr.t, 0.3), () => mono('Read the headings. Then the sub-headings. Then again.', L + 4, 780, 26, g.mid, 'left', { ls: 0.2 }));
    // phone with a contents list, rows ticking off as she reads through them
    const pp = sn(t, k8.tt.w[5], 0.5); if (pp <= 0) return;
    const x = 1450, y = 200 + 80 * (1 - pp), w = 360, h = 740;
    withA(clamp(pp * 2), () => {
      fillRR(x, y, w, h, 54, C.card); strokeRR(x + 10, y + 10, w - 20, h - 20, 44, '#DDD6CA', 2); fillRR(x + w / 2 - 60, y + 26, 120, 30, 15, C.ink);
      mono('Contents', x + 44, y + 120, 20, C.mid, 'left', { ls: 0.2 });
      for (let i = 0; i < 8; i++) { const ry = y + 170 + i * 66; const on = prog(t, k8.thr.t + i * 0.28, 0.2); mono(String(i + 1).padStart(2, '0'), x + 44, ry + 16, 20, C.blue, 'left', { ls: 0.04 }); rect(x + 100, ry, 150 + (i * 47) % 90, 16, on > 0 ? C.ink : '#DDD6CA'); if (i % 3 !== 2) rect(x + 100, ry + 28, 110 + (i * 31) % 70, 10, on > 0 ? C.mid : '#E6E0D5'); }
    });
  });
  sfx('card', k8.tt.w[5]); sfx('hitS', k8.mem.w[4], -5);
  addScene(S(k8.memw), 'paper', '// 07 — priming', (t) => {
    beat(t, 0, k8.map.t - 0.1, () => KT(t, { lines: ['Memorising *sticks.*'], x: L, y: 330, size: 120, times: [k8.memw.w[1], k8.stick.w[3]] }));
    beat(t, k8.map.t - 0.1, 1e9, () => KT(t, { lines: ['The mapping gets *stronger.*'], x: L, y: 330, size: 120, times: pick(k8.map, [2, 3, 4, 4]) }));
    const a = sn(t, k8.memw.w[4], 1.2), b = sn(t, k8.skim.w[4], 1.0);
    withA(prog(t, k8.memw.w[1], 0.3), () => meter(t, L, 520, W - 2 * L, 100, 0.92 * a, { cells: 20, label: 'Memorising the headings', value: a > 0.5 ? 'sticks' : '' }));
    withA(prog(t, k8.skim.w[2], 0.3), () => meter(t, L, 790, W - 2 * L, 100, 0.3 * b, { cells: 20, label: 'Just skimming', col: g.mid }));
  });
  sfx('tick', k8.memw.w[4]); sfx('tick', k8.skim.w[3]); sfx('hitS', k8.map.w[4], -6);

  /* ---------- 9 · why it works ---------- */
  const k9 = PS({ why: 'so why does this method work', some: "it's about having somewhere to put things in your mind", cold: 'when you start reading a book cold', every: 'every new idea from the book that arrives', nowhere: 'your brain has nowhere to file it', floats: 'so the idea sort of floats in your mind', one: 'you have one idea from chapter one', next: 'the next idea arrives', six: 'chapter six', pile: 'a pile of ideas floating around in your mind', attach: 'they have nothing to attach themselves to', but: 'but when you have started the structure first', shape: 'you already know the shape of the argument', shows: 'so when an idea shows up in the book', part: 'you know which part of the book it belongs to', doing: 'and what it is doing there', go: 'that idea has somewhere to go to', mech: "that's the whole mechanism", shelves: "you're building the shelves before you put something on them" });
  addScene(S(k9.why), 'paper', '// 08 — why it works', (t) => {
    beat(t, 0, k9.some.w[3] - 0.12, () => sent(t, { lines: ['So why does this ~work?~'], y: 580, size: 120, times: pick(k9.why, [0, 1, 2, 3, 5]) }));
    beat(t, k9.some.w[3] - 0.12, 1e9, () => { KT(t, { lines: ['Somewhere', 'to *put things.*'], x: L, y: 500, size: 220, times: pick(k9.some, [3, 4, 5, 6]) }); withA(prog(t, k9.some.w[8], 0.3), () => mono('In your mind', L + 8, 820, 28, g.mid, 'left', { ls: 0.24 })); });
  });
  sfx('mark', k9.why.w[5] + 0.4, -6); sfx('whoosh', k9.some.w[3] - 0.12, -8);
  // reading cold: ideas arrive and pile up with nothing to attach to
  const ideaT = [k9.every.w[2], k9.floats.w[2] + 0.2, k9.one.w[3], k9.next.w[2], k9.six.w[1], k9.six.w[1] + 0.35, k9.pile.w[2], k9.pile.w[3] + 0.2, k9.pile.w[4] + 0.2];
  const idea = (i) => ({ x: 980 + 560 * (hash(i + 3) - 0.3), y: 330 + 520 * hash(i + 11), r: (hash(i + 5) - 0.5) * 0.5, ch: [1, 1, 1, 2, 6, 6, 6, 4, 3][i] });
  addScene(S(k9.cold), 'ink', '// 08 — why it works', (t) => {
    beat(t, k9.cold.t, k9.nowhere.t - 0.1, () => KT(t, { lines: ['Reading it', '~cold.~'], font: 'body', x: L, y: 470, size: 110, times: [k9.cold.w[3], k9.cold.w[5], k9.cold.w[6]] }));
    beat(t, k9.nowhere.t - 0.1, k9.attach.t - 0.1, () => KT(t, { lines: ['Nowhere', 'to ~file it.~'], font: 'body', x: L, y: 470, size: 110, times: pick(k9.nowhere, [3, 4, 5, 6]) }));
    beat(t, k9.attach.t - 0.1, 1e9, () => KT(t, { lines: ['Nothing to', '~attach to.~'], font: 'body', x: L, y: 470, size: 110, times: pick(k9.attach, [2, 3, 4, 6]) }));
    ideaT.forEach((ti, i) => {
      const p = sn(t, ti, 0.45); if (p <= 0) return; const d = idea(i); const drift = t - ti;
      const x = d.x + 14 * Math.sin(drift * 0.6 + i), y = d.y + 10 * Math.sin(drift * 0.45 + i * 2) - 90 * (1 - p);
      withA(clamp(p * 2), () => withT(x, y, 1, d.r + 0.05 * Math.sin(drift * 0.3 + i), () => { rect(-150, -50, 300, 100, C.card); mono('Ch ' + String(d.ch).padStart(2, '0') + ' · idea', -126, -8, 20, C.blue, 'left', { ls: 0.14 }); rect(-126, 16, 150 + 60 * hash(i), 12, '#D8D1C4'); }));
    });
  });
  ideaT.forEach((x, i) => sfx(i % 2 ? 'card' : 'tick', x, -3));
  // studied first: the shelves exist, ideas snap onto their chapter
  const shelfY = (i) => 380 + i * 105;
  const snaps = [[k9.shows.w[3], 2], [k9.part.w[5], 4], [k9.doing.w[4], 0], [k9.go.w[3], 5]];
  addScene(S(k9.but), 'paper', '// 08 — why it works', (t) => {
    KT(t, { lines: ['You know the *shape.*'], x: L, y: 250, size: 100, times: pick(k9.shape, [0, 2, 3, 4]) });
    for (let i = 0; i < 6; i++) { const rp = prog(t, k9.but.w[6] + i * 0.07, 0.5); withA(rp, () => { mono('Ch ' + String(i + 1).padStart(2, '0'), L, shelfY(i) - 14, 26, g.acc, 'left', { ls: 0.08 }); hline(L + 130, shelfY(i), (W - 2 * L - 130) * E.outExpo(rp), 1, C.ink, 3); }); }
    snaps.forEach(([ti, row], j) => {
      const p = E.outQuint(prog(t, ti, 0.55)); if (p <= 0) return;
      const x1 = 560 + j * 330, y1 = shelfY(row) - 50;
      const x = lerp(1500, x1, p), y = lerp(-120, y1, p);
      withA(clamp(p * 3), () => withT(x, y, 1, 0.3 * (1 - p), () => { rect(-150, -40, 300, 80, C.ink); mono('Idea → ch ' + String(row + 1).padStart(2, '0'), -126, 8, 20, C.card, 'left', { ls: 0.14 }); }));
    });
  });
  snaps.forEach(([x]) => sfx('click', x + 0.45));
  addScene(S(k9.mech), 'blue', '// 08 — why it works', (t) => {
    withA(prog(t, k9.mech.t, 0.25), () => mono("That's the whole mechanism", L + 8, 300, 28, g.mid, 'left', { ls: 0.24 }));
    KT(t, { lines: ["You're building"], x: L, y: 470, size: 120, times: pick(k9.shelves, [0, 1]) });
    KT(t, { lines: ['the shelves'], x: L - 6, y: 730, size: 290, times: pick(k9.shelves, [2, 3]) });
    KT(t, { lines: ['~before you put something on them.~'], font: 'serif', x: L, y: 900, size: 110, times: TM({ t: k9.shelves.w[4], w: [k9.shelves.w[4], k9.shelves.w[9] - 0.3] }, 6), acc: g.fg });
  }, { grid: true });
  sfx('hit', k9.shelves.w[3], -2);
}

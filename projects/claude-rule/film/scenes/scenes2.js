/* claude-rule film, part 2 (2:12 - end): human attributes, the plank (C's set piece in A's palette), the Microsoft quote,
 * the 9 pm what-if, day and night, kindness for our own sake, the end. */
'use strict';

let plank = null;   // the plank set piece (defined in buildP2, used by the slope and the end)
function buildP2() {
  const k = PS({
    h1: 'we are assigning human attributes to a tool that does not possess human attributes',
    h2: 'and this tool is very very very powerful', h3: "so i don't see how this is going to end nicely",
    s1: 'the tech company says', s2: 'this model may be conscious', s3: 'and now there are rules', s4: 'about how users are allowed to treat the model',
    s5: "it's a very slippery slope man",
    u1: 'this illusion that ai can be a conscious entity', u2: "i don't know it just feels weird man",
    q1: "i'm quoting the head of ai at microsoft here", q2: 'he says and i quote', q3: 'we must build ai for people not to be a digital person',
    q4: "i think it's very dangerous if these models are trained to see themselves as conscious or as deserving of independent agency",
    q5: "so i'm very very worried about where this path leads",
    r1: "and it's even interesting if you think about it",
    r2: 'if anthropic thinks that claude could be conscious or could be abused psychologically',
    r3: 'wouldn\'t that mean at some point that maybe claude could be tired or frustrated',
    r4: 'for example maybe at some point i would ask claude to do something',
    r5: 'and if it had been working so much for me all day', r6: "and now it's 9pm or 10pm",
    r7: 'does that mean that at some point claude can have the ability to say like',
    r8: "hey i'm tired i don't want to do anything else", r9: 'because if claude has consciousness then why not',
    o1: 'and if you follow that process very well in that case wouldn\'t anthropic itself be an offender',
    o2: 'because then anthropic is using claude like a slave owner wouldn\'t that be the explanation',
    o3: "it's selling it", o4: "it's using it day and night and night and day",
    o5: "i mean it's just a funny way of reasoning",
    g1: "so again i'm not fighting for the right to be cruel to ai", g2: "i don't think you should be cruel to ai or say cruel things",
    g3: 'or to anyone or anything at that for your own sake',
    g4: 'you want to try your own possible best to guard your heart and your soul against cruelty',
    g5: "but you shouldn't be cruel because you think claude is conscious", g6: "no it's not", g7: 'or am i the dumb person here',
    y1: "so i don't think we should avoid being cruel because of the machine's feeling",
    y2: "we should just not be cruel because we don't want to be cruel people",
    z1: 'but overall i just think this whole ai and consciousness conversation is a very very slippery slope',
    z2: "and i don't know man i've been thinking about it and i don't know",
  });
  const end = (ph) => ph.ew[ph.ew.length - 1];

  // 18 · human attributes (her message)
  const T3 = thread('attributes', [
    her('We are assigning human attributes to a tool that does not possess human attributes.', { ph: k.h1, em: [[3, 4], [12, 13]] }),
  ]);
  addT(k.h1.t - 0.12, 'lil', 'attributes', (t) => drawThread(T3, t));
  sfx('notify', k.h1.t - 0.06, -3);

  /* ---------- 19-20 · the plank (C's set piece, in A's palette): her words pile on a rule, then it tilts ---------- */
  const tPow = k.h2.t - 0.1;
  const tClear = k.s1.t - 0.2;          // the first pile leaves before "The tech company says"
  const tTilt = k.s5.w[3];              // "slippery"
  const P1 = [
    { s: 'very,', t: k.h2.w[4] }, { s: 'very,', t: k.h2.w[5] }, { s: 'very', t: k.h2.w[6] }, { s: 'powerful.', t: k.h2.w[7], white: true },
  ];
  const P2 = [
    { s: 'The tech company says', t: k.s1.t }, { s: 'this model may be conscious.', t: k.s2.t, white: true },
    { s: 'And now there are rules', t: k.s3.t }, { s: 'about how users are allowed to treat the model.', t: k.s4.t, small: true },
  ];
  plank = (t, pile, o) => {
    const px0 = V(250, 80), px1 = V(1670, 1000), py = V(840, 1300), cx = (px0 + px1) / 2;
    // weight: each block dips the plank 0.6 deg (spring); the tilt: +11 deg outExpo 0.6 s (right end down)
    let ang = 0; pile.forEach((b) => { if (t >= b.t) ang += 0.6 * MOTION.spring(t - b.t, 0.45, 3); });
    if (o.tilt != null && t >= o.tilt) ang = lerp(ang, o.tiltDeg || 15, eOX((t - o.tilt) / 0.6));
    if (o.tilt != null && t >= o.tilt + 0.6) MOTION.state('tilt', true);
    const a = ang * Math.PI / 180;
    ctx.save(); ctx.translate(cx, py); ctx.rotate(a);
    rect(px0 - cx, 0, px1 - px0, V(16, 14), TH.her);
    // ticks: a measuring rule, "tool" at the left end, "human" at the right
    for (let i = 0; i <= 20; i++) rect(px0 - cx + (px1 - px0) * i / 20 - 1.5, V(16, 14), 3, i % 5 ? 14 : 26, TH.her);
    _txt('TOOL', px0 - cx, V(84, 80), TF.m(V(34, 34)), TH.mute); _txt('HUMAN', px1 - cx, V(84, 80), TF.m(V(34, 34)), TH.mute, 'right');
    // the pile: newest block goes under (reads top-down in her order); blocks slide in from the right on their word
    const arrived = pile.filter(b => t >= b.t);
    let stackY = 0; const rx = V(o.right ? 200 : -40, -20);
    const H = (b) => (b.small ? V(70, 52) : V(108, 70));
    for (let i = arrived.length - 1; i >= 0; i--) {
      const b = arrived[i]; const h = H(b); const fs = b.small ? V(44, 30) : V(78, 46); const font = TF.b(fs, 800);
      const w = tw(b.s, font, -0.02 * fs) + V(56, 44);
      const lift = 1;   // (blocks under it push it up: stackY accumulates)
      const pIn = eOX((t - b.t) / F30(14));
      const xr = Math.min(px1 - cx - w - V(40, 10), Math.max(px0 - cx + V(40, 10), rx - w / 2));
      const x = xr + (1 - pIn) * V(700, 500), y = -stackY - h;
      let sx = 0, sy = 0;
      if (o.slide != null && t >= o.slide) { const dt = t - o.slide - i * F30(1); if (dt > 0) sx = 0.5 * 7000 * dt * dt; }
      if (o.clear != null && t >= o.clear) { const dt = t - o.clear - (arrived.length - 1 - i) * F30(1); if (dt > 0) sy = -0; sx = Math.max(sx, dt > 0 ? 0.5 * 9000 * dt * dt : 0); }
      grp('block ' + b.s, x + sx, y + sy, w, h - V(8, 6), () => {
        rect(x + sx, y + sy, w, h - V(8, 6), b.white ? TH.card : TH.block);
        txt(b.s, x + sx + V(28, 22), y + sy + (h - V(8, 6)) / 2 + fs * 0.35, font, b.white ? TH.ink : TH.blockText, 'left', 'alphabetic', -0.02 * fs);
      });
      stackY += h * eOQ((t - b.t) / F30(10));
    }
    ctx.restore();
  };
  addT(tPow, 'lil', 'powerful', (t) => {
    bigLines(t, [{ text: 'And this tool is', size: [140, 96], y: [V(230, 520), V(230, 520)], times: k.h2.w.slice(0, 4), weight: 800, col: TH.ink, out: k.h3.t - 0.1 }], { x: [150, 80] });
    bigLines(t, [{ text: 'So I don’t see how this is going to end nicely.', size: [72, 60], y: [V(230, 480), V(230, 480)], times: k.h3.w, weight: 700, col: TH.ink }], { x: [150, 80] });
    plank(t, P1, { clear: tClear });
  });
  P1.forEach((b, i) => sfx('paper', b.t, -i)); sfx('swipe', tClear + 0.15, 0);
  addT(tClear + 0.2, 'lil', 'slope', (t) => {
    plank(t, P2, { tilt: tTilt, slide: tTilt + 0.6 + F30(8) });
    bigLines(t, [{ text: 'It’s a very slippery slope, man.', size: [120, 84], y: [V(200, 470), V(200, 470)], times: k.s5.w, weight: 800, col: TH.ink, marker: [3, 4, tTilt + 0.1] }], { x: [150, 80] });
  });
  P2.forEach((b, i) => sfx('paper', b.t, -(i % 2)));
  sfx('riser', tTilt, 0); sfx('hit', tTilt + 0.02, -4); sfx('fall', tTilt + 0.6 + F30(8) + 0.1, -2);
  MOTION.expect('plank tilt has settled', tTilt + 0.6 + F30(4), { state: 'tilt', value: true, tol: 4 });

  /* ---------- 21 · the illusion (full frame), then the Microsoft essay itself, highlighted as she quotes it ---------- */
  const tIll = end(k.s5) + 0.25;
  addT(tIll, 'lil', 'illusion', (t) => {
    const s = V(150, 104);
    bigLines(t, [
      { text: 'This illusion that AI can be a conscious entity.', size: [s, s], y: [V(380, 660), V(380, 660)], times: k.u1.w, weight: 800, em: [[1, 1, '#5B45C9']], col: TH.ink },
      { text: 'I don’t know. It just feels weird, man.', size: [V(76, 62), V(76, 62)], times: k.u2.w, weight: 600, col: TH.mute, gap: V(170, 160) },
    ], { x: [150, 80], snap: tIll });
  });
  sfx('paper', tIll, 0);
  const SU = { img: 'src_su', crop: [500, 238, 990, 150], hl: [{ x: 510, y: 260, w: 637.5, h: 35 }] };   // su_quote.png: the page scrolled to y 2281.6, quote line at 260
  const tSu = k.q1.t - 0.06;
  addT(tSu, 'lil', 'page-suleyman', (t) => {
    srcZoom(t, { img: SU.img, crop: V(SU.crop, [500, 238, 990, 150]), t0: tSu, t1: end(k.q3), hl: [{ lines: SU.hl, t0: k.q3.t, t1: end(k.q3) }],
      credit: 'SCREENSHOT · MUSTAFA-SULEYMAN.AI · “WE MUST BUILD AI FOR PEOPLE; NOT TO BE A PERSON” · MUSTAFA SULEYMAN, CEO OF MICROSOFT AI · 19 AUG 2025', y: [560, 900] });
    bigLines(t, [{ text: 'I’m quoting the head of AI at Microsoft here.', size: [V(64, 52), V(64, 52)], y: [V(190, 470), V(190, 470)], times: k.q1.w, weight: 700, col: TH.ink }], { x: [96, 54], snap: tSu });
  });
  sfx('shutter', tSu, 0); sfx('pen', k.q3.t, 0);

  // 22 · two voices: Suleyman's written words in serif (as he wrote them), hers in her bubbles
  const tQ = end(k.q3) + 0.1;
  const T4b = thread('dangerous', [
    her('I think it’s very dangerous if these models are trained to see themselves as conscious or as deserving of independent agency.', { ph: k.q4, gone: k.q5.t - 0.3, em: [[3, 4]] }),
    her('So I’m very, very worried about where this path leads.', { ph: k.q5 }),
  ]);
  addT(tQ, 'lil', 'digital-person', (t) => {
    const s = V(88, 70), y0 = V(170, 450);
    bigLines(t, [
      { text: '“We must build AI for people;', face: 's', size: [s, s], y: [y0, y0], t: tQ, weight: 360, col: TH.ink },
      { text: 'not to be a digital person.”', face: 's', size: [s, s], t: tQ + 0.06, weight: 600, col: TH.ink, gap: s * 1.05 },
    ], { x: [150, 80], snap: tQ });
    withA(eOQ((t - tQ - 0.15) / F30(8)), () => tmono('MUSTAFA SULEYMAN · CEO, MICROSOFT AI · ESSAY, 19 AUG 2025', V(150, 80), V(y0 + s * 2.05 + 70, y0 + s * 3.3 + 60), { col: TH.mute, size: V(30, 30) }));
    drawThread(T4b, t, { hideInput: true, push: false, fixed: true });
  });
  sfx('paper', tQ, 0); sfx('notify', k.q4.t - 0.06, -2); sfx('notify', k.q5.t - 0.06, -4);

  /* ---------- 23 · her question as a chain (full frame): could be conscious -> could be abused -> could be tired? ---------- */
  const tChain = k.r2.w[5] - 0.08;   // "could be conscious"
  addT(k.r1.t - 0.1, 'lil', 'interesting', (t) => {
    bigLines(t, [{ text: 'And it’s even interesting if you think about it.', size: [V(130, 100), V(130, 100)], y: [V(440, 760), V(440, 760)], times: k.r1.w, weight: 800, col: TH.ink }], { x: [150, 80], snap: k.r1.t - 0.1 });
  });
  sfx('pop', k.r1.t - 0.1, -2);
  addT(tChain, 'lil', 'chain', (t) => pushed(t, tChain, k.r3.w[9], 0.04, () => {
    const steps = [['could be conscious', k.r2.w[5]], ['could be abused psychologically', k.r2.w[9]], ['could be tired or frustrated?', k.r3.w[9]]];
    const x = V(150, 80), y0 = V(340, 600), rh = V(240, 300), fs = V(110, 80);
    tmono('IF ANTHROPIC THINKS CLAUDE…', x, y0 - V(130, 140), { col: TH.mute });
    steps.forEach(([s, ts], i) => {
      if (t < ts - 0.05) return; const p = eOQ((t - ts + 0.05) / F30(9)); const y = y0 + i * rh;
      if (i > 0) { const ay = y - rh + V(40, 50); pline(x + 30, ay, x + 30, ay + (rh - V(110, 120)) * p, 1, TH.ink, 6); }
      withA(p, () => txtW(s, x + V(90, 70), y + (1 - p) * 18, TF.b(fs, i === 2 ? 800 : 700), i === 2 ? '#5B45C9' : TH.ink, W - 2 * x - V(90, 70), fs * 1.05));
      withA(p, () => circle(x + 30, y - fs * 0.32, V(16, 14), i === 2 ? '#5B45C9' : TH.ink));
    });
    if (t >= k.r3.w[11]) MOTION.state('chain tired', true);
  }));
  sfx('tick', tChain, 0); sfx('tick', k.r2.w[9] - 0.07, 0); sfx('hit', k.r3.w[9], -3);
  MOTION.expect('the chain reaches "tired"', k.r3.w[11] + 0.1, { state: 'chain tired', value: true, tol: 4 });

  /* ---------- 24-26 · the 9 pm what-if (a day in one chat) ---------- */
  const tasks = [k.r5.w[3] - 0.05, k.r5.w[7], k.r5.w[11]];
  const T5 = thread('tired', [
    sys('9:00 AM', k.r4.t - 1.2),
    her('For example, maybe at some point I would ask Claude to do something.', { ph: k.r4 }),
    sys('12:30 PM', tasks[0] - 0.4),
    her('Can you look at this?', { a: tasks[0], size: V(44, 42) }),
    her('One more thing.', { a: tasks[1], size: V(44, 42) }),
    her('And this one too.', { a: tasks[2], size: V(44, 42) }),
    sys('9:00 PM', k.r6.w[3] - 0.05),
    her('and now it’s 9pm or 10pm,', { ph: k.r6, em: [[3, 5]] }),
    her('does that mean that at some point Claude can have the ability to say like,', { ph: k.r7 }),
    her('“Hey, I’m tired. I don’t want to do anything else.”', { ph: k.r8 }),
    her('Because if Claude has consciousness, then why not?', { ph: k.r9 }),
    her('And if you follow that process very well, in that case, wouldn’t Anthropic itself be an offender?', { ph: k.o1, em: [[15, 16]] }),
    her('Because then Anthropic is using Claude like a slave owner, wouldn’t that be the explanation?', { ph: k.o2 }),
  ]);
  addT(k.r4.t + 0.08, 'lil', 'what-if', (t) => drawThread(T5, t));
  sfx('notify', k.r4.t + 0.08, -2);
  tasks.forEach((x, i) => sfx('notify', x, -2 - i));
  addT(k.r6.w[3] - 0.06, 'nite', 'nine-pm', (t) => {
    bigLines(t, [{ text: '9pm or 10pm,', size: [300, 220], y: [V(600, 960), V(600, 960)], times: k.r6.w.slice(3), weight: 800, em: [[0, 0, TH.lilac], [2, 2, TH.lilac]], fit: true }], { center: true, snap: k.r6.w[3] - 0.06, margin: [120, 60] });
    withA(eOQ((t - k.r6.w[3]) / F30(8)), () => tmono('AFTER A WHOLE DAY OF REQUESTS', CX, V(760, 1100), { align: 'center', col: TH.nightMute }));
  });
  sfx('clock', k.r6.w[3] - 0.06, 0);
  addT(k.r7.t - 0.06, 'lil', 'tired', (t) => drawThread(T5, t));
  sfx('notify', k.r7.t - 0.06, -3); sfx('pop', k.r8.t - 0.06, 0);
  // the what-if breaks out of its grey bubble (her words, her what-if)
  const tTiredB = k.r8.w[2] + 0.02;   // "tired."
  addT(tTiredB - 0.02, 'lil', 'tired-big', (t) => {
    const r = drawThread(T5, t, { dim: 0 }); const from = (r['“Hey, I’m tired. I don’t want to do anything else.”'] || [])[2];
    breakout(t, tTiredB, '“Hey, I’m tired.”', from, { y: [540, 880] });
  });
  sfx('hit', tTiredB + 0.04, 1);
  addT(k.r9.t - 0.1, 'lil', 'why-not', (t) => drawThread(T5, t));
  sfx('notify', k.r9.t - 0.06, 0);
  addT(k.o1.t - 0.1, 'lil', 'offender', (t) => drawThread(T5, t));
  sfx('notify', k.o1.t - 0.06, -3);
  const tOff = k.o1.w[16] + 0.02;   // "offender?"
  addT(tOff - 0.02, 'lil', 'offender-big', (t) => {
    const r = drawThread(T5, t, { dim: 0 }); const from = (r['And if you follow that process very well, in that case, wouldn’t Anthropic itself be an offender?'] || [])[16];
    breakout(t, tOff, 'an offender?', from, { y: [560, 900] });
  });
  sfx('hit', tOff - 0.03, -2);
  addT(k.o2.t - 0.1, 'lil', 'slave-owner', (t) => drawThread(T5, t));
  sfx('notify', k.o2.t - 0.06, -4);

  // 27 · day and night: the ground flips on her words (two flips, >= 0.3 s apart)
  const dw = k.o4; // It's0 using1 it2 day3 and4 night5 and6 night7 and8 day9
  const dn = (t) => {
    const acc = g.bg === TH.night ? TH.lilac : '#5B45C9';
    bigLines(t, [
      { text: 'It’s selling it.', size: [110, 84], y: [V(260, 560), V(260, 560)], times: k.o3.w, weight: 800 },
      { text: 'It’s using it', size: [110, 84], times: dw.w.slice(0, 3), weight: 800 },
      { text: 'day and night and night and day.', size: [170, 120], times: dw.w.slice(3), weight: 800, em: [[0, 0, acc], [2, 2, acc], [4, 4, acc], [6, 6, acc]], gap: V(200, 170), fit: true },
    ], { x: [150, 80], snap: k.o3.t - 0.05 });
  };
  addT(k.o3.t - 0.05, 'lil', 'selling', dn);
  addT(dw.w[5] - 0.02, 'nite', 'night', dn);
  addT(dw.w[9] - 0.02, 'lil', 'day', dn);
  sfx('switch', dw.w[5], 0); sfx('switch', dw.w[9], 0);

  // 28 · a funny way of reasoning; this chat ends too
  const ended2 = end(k.o5) + 0.05;
  const T5b = thread('reasoning', [her('I mean, it’s just a funny way of reasoning.', { ph: k.o5, em: [[5, 8]] }), ended(ended2)]);
  addT(k.o5.w[2] - 0.1, 'lil', 'reasoning', (t) => drawThread(T5b, t, { endedAt: ended2 }));
  sfx('notify', k.o5.w[2] - 0.1, -2); sfx('tape', ended2, 0);

  /* ---------- 29-32 · kindness for our own sake ---------- */
  const T6 = thread('kind', [
    sys('New chat', k.g1.t - 1.2),
    her('So again, I’m not fighting for the right to be cruel to AI.', { ph: k.g1 }),
  ]);
  addT(k.g1.t + 0.08, 'lil', 'own-sake', (t) => drawThread(T6, t));
  sfx('notify', k.g1.t + 0.08, -2);
  // her three steps, full frame: cruel to AI / to anyone or anything / for your own sake
  const tSake = k.g2.t - 0.06;
  addT(tSake, 'lil', 'sake', (t) => {
    const s = V(170, 110), y = V(440, 720);
    bigLines(t, [
      { text: 'I don’t think you should be cruel to AI,', size: [V(76, 72), V(76, 72)], y: [y - V(200, 190), y - V(200, 190)], times: k.g2.w.slice(0, 9), weight: 600, col: TH.ink },
      { text: 'or to anyone or anything,', size: [s, s], y: [y + V(40, 60), y + V(40, 60)], times: k.g3.w.slice(0, 5), weight: 800, fit: true },
      { text: 'for your own sake.', size: [s, s], times: k.g3.w.slice(7), weight: 800, marker: [2, 3, k.g3.w[10] + 0.1], gap: s * 1.15 },
    ], { x: [150, 80], snap: tSake });
  });
  sfx('paper', tSake, 0); sfx('hit', k.g3.w[10] - 0.03, -3);
  addT(k.g4.w[9] - 0.08, 'nite', 'heart', (t) => {
    const s = V(140, 100);
    bigLines(t, [{ text: 'Guard your heart and your soul against cruelty.', size: [s, s], y: [V(400, 720), V(400, 720)], times: k.g4.w.slice(9), weight: 800, em: [[2, 2, TH.lilac], [5, 5, TH.lilac]] },
      { text: 'You want to try your own possible best', size: [V(56, 46), V(56, 46)], y: [V(230, 560), V(230, 560)], times: k.g4.w.slice(0, 8), weight: 500, col: TH.nightMute }], { x: [150, 80], snap: k.g4.w[9] - 0.08 });
  });
  sfx('switch', k.g4.w[9] - 0.08, 0);
  const T6b = thread('kind-2', [
    her('But you shouldn’t be cruel because you think Claude is conscious.', { ph: k.g5 }),
    her('No, it’s not.', { ph: k.g6, key: 'no its not' }),
  ]);
  addT(k.g5.t - 0.1, 'lil', 'because', (t) => drawThread(T6b, t));
  sfx('notify', k.g5.t - 0.06, -2);
  const tNo = k.g6.w[1] + 0.05;
  addT(tNo - 0.02, 'lil', 'no', (t) => {
    const r = drawThread(T6b, t, { dim: 0 }); const from = (r['no its not'] || [])[0];
    breakout(t, tNo, 'No, it’s not.', from, { y: [520, 880], sub: { text: 'Or am I the dumb person here?', t: k.g7.t, size: [72, 56] } });
  });
  sfx('hit', tNo + 0.04, 0); sfx('pop', k.g7.t, 0);

  // 33 · why: not because of the machine's feelings; because we don't want to be cruel people ("not this, this")
  addT(k.y1.t - 0.05, 'lil', 'why', (t) => {
    bigLines(t, [
      { text: 'So I don’t think we should avoid being cruel because of the machine’s feeling.', size: [70, 72], y: [V(230, 440), V(230, 440)], times: k.y1.w, weight: 600, col: TH.ink },
      { text: 'We should just not be cruel because we don’t want to be cruel people.', size: [132, 100], times: k.y2.w, weight: 800, col: TH.ink, gap: V(220, 200), marker: [12, 13, end(k.y2)] },
    ], { x: [150, 80], snap: k.y1.t - 0.05 });
  });
  sfx('pop', k.y2.t - 0.03, -2); sfx('pen', end(k.y2) - 0.2, 0);

  /* ---------- 34-36 · the end: the slope again, "I don't know", the conversation ends (big) ---------- */
  const tEs = k.z1.w[5] - 0.06;   // "this whole AI and consciousness conversation"
  const tTilt2 = k.z1.w[15];
  addT(k.z1.t - 0.1, 'lil', 'overall', (t) => {
    bigLines(t, [{ text: 'But overall, I just think', size: [V(110, 84), V(110, 84)], y: [V(440, 760), V(440, 760)], times: k.z1.w.slice(0, 5), weight: 800, col: TH.ink }], { x: [150, 80], snap: k.z1.t - 0.1 });
  });
  addT(tEs, 'lil', 'end-slope', (t) => {
    plank(t, [{ s: 'this whole AI and', t: tEs, white: true, small: PORTRAIT }, { s: 'consciousness conversation', t: k.z1.w[9], small: PORTRAIT }], { tilt: tTilt2, slide: tTilt2 + 0.6 + F30(8), tiltDeg: 17 });
    bigLines(t, [{ text: 'is a very, very slippery slope.', size: [110, 80], y: [V(220, 480), V(220, 480)], times: k.z1.w.slice(11), weight: 800, col: TH.ink, marker: [4, 5, tTilt2 + 0.1] }], { x: [150, 80] });
  });
  sfx('paper', tEs, 0); sfx('riser', tTilt2, 0); sfx('fall', tTilt2 + 0.6 + F30(8) + 0.1, 0);
  const ended3 = end(k.z2) + 0.3;
  // her last line, full frame on night: "I don't know"
  addT(k.z2.t - 0.08, 'nite', 'i-dont-know', (t) => {
    bigLines(t, [
      { text: 'And I don’t know, man.', size: [190, 120], y: [V(400, 720), V(400, 720)], times: k.z2.w.slice(0, 5), weight: 800, em: [[2, 3, TH.lilac]] },
      { text: 'I’ve been thinking about it and I don’t know.', size: [80, 64], times: k.z2.w.slice(5), weight: 600, col: TH.nightMute, gap: V(170, 260) },
    ], { x: [150, 80], snap: k.z2.t - 0.08 });
  });
  sfx('switch', k.z2.t - 0.08, 0);
  // the conversation ends: the line breaks out at 75 % width on the tape stop, the input row greys under it
  addT(ended3, 'lil', 'ended-big', (t) => {
    drawInput(TL(), t, { endedAt: ended3 });
    breakout(t, ended3 + 0.02, 'This conversation has ended', null, { y: [540, 880], s0: 0.35, size: [200, 120] });
  });
  sfx('tape', ended3, 0);

  // 37 · end card: the handle types on like a message, the rule's date under it
  const tCard = ended3 + 2.2;
  addT(tCard, 'nite', 'end-card', (t) => {
    const fs = V(150, 120); const s = '@WithGbemi'; const n = Math.max(3, Math.round(s.length * clamp((t - tCard) / 0.45)));
    const w = tw(s, TF.b(fs, 800), -0.03 * fs); const wn = tw(s.slice(0, n), TF.b(fs, 800), -0.03 * fs); const y = V(560, 920);
    ctx.save(); ctx.beginPath(); ctx.rect(CX - w / 2 - 10, y - fs, wn + 12, fs * 1.4); ctx.clip();
    txt(s, CX - w / 2, y, TF.b(fs, 800), TH.onNight, 'left', 'alphabetic', -0.03 * fs); ctx.restore();
    if (n < s.length) rect(CX - w / 2 + wn + 8, y - fs * 0.75, 8, fs * 0.85, TH.lilac);
    if (t >= tCard + 0.7) withA(eOQ((t - tCard - 0.7) / F30(8)), () => tmono('ANTHROPIC’S RULE APPLIES FROM NOVEMBER 12, 2026', CX, V(670, 1030), { align: 'center', col: TH.nightMute }));
  });
  sfx('type', tCard + 0.2, 6);
}

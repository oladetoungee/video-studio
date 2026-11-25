/* claude-rule film, part 1 (0:00 - 2:12): the rule, what it says, the constitution, "Claude is a tool", living things.
 * Positions: V(landscape 1920x1080, portrait 1080x1920); portrait content in y 370..1440. Times come from her words (P). */
'use strict';

// real-source crops, in the page's CSS px (images are 2x captures, see assets/sources/anthropic/*_capture.json)
const SRCX = {
  title: { img: 'src_title', crop: [620, 150, 680, 210], hl: [{ x: 639, y: 217, w: 642, h: 57 }], credit: 'Screenshot · anthropic.com · 8 Oct 2026' },
  rule: { img: 'src_rule', crop: [0, 0, 704, 184], hl: [{ x: 873.8 - 608, y: 2963 - 2929, w: 386.5, h: 21 }, { x: 640 - 608, y: 2989.3 - 2929, w: 147.8, h: 21 }], credit: 'Screenshot · anthropic.com · 8 Oct 2026' },
  endchat: { img: 'src_section', crop: [0, 218, 720, 122], hl: [{ x: 1036.3 - 600, y: 3163.4 - 2883, w: 221.2, h: 21 }, { x: 640 - 600, y: 3189.7 - 2883, w: 492.5, h: 21 }], credit: 'Screenshot · anthropic.com · 8 Oct 2026' },
  ctitle: { img: 'src_const_top', crop: [600, 165, 720, 325], hl: [{ x: 684, y: 356, w: 552, h: 57 }], credit: 'Screenshot · anthropic.com/constitution' },
  moral: { img: 'src_moral', crop: [0, 0, 704, 222], hl: [{ x: 640 - 608, y: 47337.8 - 47303.8, w: 340.9, h: 21 }], credit: 'Screenshot · anthropic.com/constitution' },
};
// rule crop: the image is the page's crop_rule clip (x 608, y 2929); moral: crop_moral_status (x 608, y 47303.8)
const srcCard = (key, a, t0, t1, w) => card({ img: SRCX[key].img, crop: SRCX[key].crop, credit: SRCX[key].credit, a, w, hl: [{ lines: SRCX[key].hl, t0, t1 }] });

function buildP1() {
  const k = PS({
    d1: 'from the 12th of november 2026', d2: 'there is a new rule about how you are allowed to talk to claude',
    d3: 'anthropic updated its usage policy', d4: 'and now you cannot be abusive or cruel to claude',
    e1: "and just to be clear i'm not here trying to fight for the right to be cruel or abusive to ai",
    e2: 'so this is not a', o1: 'do i want to abuse it', o2: 'do you want to abuse it', o3: 'should we abuse or not abuse it', e3: 'or be cruel to it kind of matter',
    e4: 'what i want to talk about is like the actual thought process behind this rule',
    m1: 'part of the idea is that anthropic is not sure whether claude might be conscious',
    m2: 'so they think they are not sure but they think that claude might be conscious',
    w1: "so what does anthropic's new rule actually say", w2: 'the exact wording is actually',
    w3: 'bans sustained and needless abusive or cruel behaviour towards their models',
    x1: 'and of course according to them this is only reserved for extreme cases',
    n1: 'and the main way they enforce it is that claude can end the conversation',
    n2: 'if it starts to seem as though the other person on the other side is abusive or cruel to it',
    c1: "then in claude's constitution", c2: 'the document that anthropic published to describe who claude should be',
    c3: "they call claude's moral status deeply uncertain",
    c4: "so they're not explicitly saying that oh claude is conscious but they are dabbling with the idea",
    c5: "they're not sure it's conscious yet but you know",
    l1: "what i find interesting about what anthropic's leadership has been doing with claude",
    l2: 'is this extra effort to instill human behaviour or human consciousness into this tool',
    l3: 'to put a form of humanity or consciousness on a machine',
    f1: 'because the fact still stands', f2: 'claude is a tool', f3: 'it is not a human',
    a1: 'it is an incredibly amazing tool',
    a2: 'i acknowledge that it has real capabilities that the average human might not be able to compute',
    a3: 'mathematical capabilities right mind-blowing capabilities',
    v1: 'but i do not believe that the model is conscious', v2: 'consciousness belongs to living organisms',
    v3: "i don't even think this should have been a conversation in the first place",
    v4: 'consciousness belongs to living things', v5: 'not to a model', v6: 'not to an algorithm',
    i1: 'so trying to give a machine human consciousness', i2: 'or trying to impose a human consciousness in a machine',
    i3: 'making it subject to rules that apply to humans', i4: 'the way i think of it it might even be a serious violation against humanity itself',
  });
  const end = (ph) => ph.ew[ph.ew.length - 1];

  /* ================= chapter 1: the rule (one chat, 0:00 - 1:00, with full-frame screens cut into it) ================= */
  const endedAt = end(k.n1) + 0.15;   // the chat ends on "end the conversation"; her next line arrives under it
  const T1 = thread('rule', [
    sys('Usage policy · from November 12, 2026', -0.4),
    her('From the 12th of November 2026,', { ph: k.d1 }),
    her('there is a new rule about how you are allowed to talk to Claude.', { ph: k.d2 }),
    her('Anthropic updated its usage policy', { ph: k.d3 }),
    srcCard('title', k.d3.w[3] - 0.15, k.d3.w[3] + 0.1, end(k.d3) + 0.1, [880, 900]),
    her('and now you cannot be abusive or cruel to Claude.', { ph: k.d4 }),
    her('And just to be clear, I’m not here trying to fight for the right to be cruel or abusive to AI.', { ph: k.e1 }),
    her('So this is not a', { ph: k.e2 }),
    her('What I want to talk about is like the actual thought process behind this rule.', { ph: k.e4, em: [[9, 11]] }),
    her('Part of the idea is that Anthropic is not sure whether Claude might be conscious.', { ph: k.m1 }),
    her('So what does Anthropic’s new rule actually say?', { ph: k.w1 }),
    her('The exact wording is actually:', { ph: k.w2 }),
    her('And the main way they enforce it is that Claude can end the conversation', { ph: k.n1, em: [[10, 13]] }),
    srcCard('endchat', k.n1.w[10] - 0.3, k.n1.w[10], end(k.n1) + 0.3, [1240, 968]),
    ended(endedAt),
    her('if it starts to seem as though the other person on the other side is abusive or cruel to it.', { ph: k.n2 }),
  ]);
  const thr1 = (t, o = {}) => drawThread(T1, t, { endedAt, ...o });

  // 1 · open: the rule arrives as a chat (typing dots fill the breath before her first word)
  addT(0, 'lil', 'open', (t) => { thr1(t); typingDots(t, 0, k.d1.t - 0.06); });
  sfx('notify', k.d1.t - 0.06, 0); sfx('notify', k.d2.t - 0.06, -2); sfx('shutter', k.d3.w[3] - 0.15, 0); sfx('pen', k.d3.w[3] + 0.1, -2);
  sfx('notify', k.d4.t - 0.06, -3);
  MOTION.expect('source card lands on "usage policy"', k.d3.w[3] - 0.15, { el: 'thread-rule/@card src_title 150', tol: 3 });

  // 2 · "cruel." breaks out of her message (75 % of the width)
  const tCruel = k.d4.w[7];
  addT(tCruel - 0.02, 'lil', 'cruel', (t) => {
    const r = thr1(t, { dim: 0 });
    const from = (r['and now you cannot be abusive or cruel to Claude.'] || [])[7];
    breakout(t, tCruel, 'cruel.', from, { y: [600, 900] });
  });
  sfx('hit', tCruel + 0.05, 0);

  // 3 · not a fight for cruelty (chat)
  addT(k.e1.t - 0.1, 'lil', 'not-a-fight', (t) => thr1(t));
  sfx('notify', k.e1.t - 0.06, -2);

  // 4 · the questions it is NOT about: her three questions, full frame, struck through on "kind of matter"
  const tQs = k.o1.t - 0.05, tStrike = k.e3.w[5];
  addT(tQs, 'lil', 'questions', (t) => {
    const s = V(128, 98), y0 = V(300, 640);
    bigLines(t, [
      { text: '“Do I want to abuse it?”', size: [s, s], y: [y0, y0], times: k.o1.w, weight: 800, strike: tStrike, fit: true },
      { text: '“Do you want to abuse it?”', size: [s, s], times: k.o2.w, weight: 800, strike: tStrike + 0.1, fit: true, gap: s * 1.3 },
      { text: '“Should we abuse or not abuse it,', size: [s, s], times: k.o3.w, weight: 800, strike: tStrike + 0.2, fit: true, gap: s * 1.3 },
      { text: 'or be cruel to it” kind of matter.', size: [s * 0.56, s * 0.62], times: k.e3.w, weight: 600, col: TH.mute, gap: s * 1.35 },
    ], { x: [150, 80], snap: tQs });
    if (t >= tStrike + 0.3) withA(eOQ((t - tStrike - 0.3) / F30(8)), () => tmono('NOT WHAT THIS IS ABOUT, SHE SAYS', V(150, 80), V(y0 + s * 5.0, y0 + s * 7.2), { col: TH.mute }));
  });
  [k.o1, k.o3].forEach((p) => sfx('tick', p.t, -2)); sfx('strike', tStrike, 0);

  // 5 · the thought process (chat), then Anthropic "not sure / might be" on a full-frame meter (her reading)
  addT(k.e4.t - 0.1, 'lil', 'thought-process', (t) => thr1(t));
  sfx('notify', k.e4.t - 0.06, -2); sfx('notify', k.m1.t - 0.06, -4);
  const tMeter = k.m1.w[8] - 0.08;
  addT(tMeter, 'lil', 'meter', (t) => bigMeter(t, k, tMeter));
  [k.m1.w[8] - 0.08, k.m1.w[12], k.m2.w[5], k.m2.w[12]].forEach((x) => sfx('tick', x, 0));
  MOTION.expect('meter swings to "might be conscious"', k.m1.w[12] + 0.5, { state: 'meter right', value: true, tol: 4 });

  // 6 · the exact wording: back in the chat, then the real page fills the frame and the phrase is highlighted as she reads
  addT(k.w1.t - 0.1, 'lil', 'wording', (t) => thr1(t));
  sfx('notify', k.w1.t - 0.06, -2); sfx('notify', k.w2.t - 0.06, -4);
  const tZoom = k.w3.t - 0.05;
  addT(tZoom, 'lil', 'page-rule', (t) => srcZoom(t, { img: SRCX.rule.img, crop: V([16, 0, 676, 96], [16, 0, 676, 150]), t0: tZoom, t1: end(k.w3),
    hl: [{ lines: SRCX.rule.hl, t0: k.w3.w[1], t1: end(k.w3) }], credit: 'SCREENSHOT · ANTHROPIC.COM · USAGE POLICY UPDATE · 8 OCT 2026', y: [500, 860] }));
  sfx('shutter', tZoom, 0); sfx('pen', k.w3.w[1], 0);

  // 7 · the two voices: Anthropic's words lift into serif type (B's lift), "only in extreme cases" lands on her words
  const tLift = end(k.w3) + 0.05;
  addT(tLift, 'lil', 'lift', (t) => {
    const y0 = V(250, 520), s = V(118, 80);
    bigLines(t, [
      { text: 'sustained and needless', face: 's', size: [s, s * 0.95], y: [y0, y0], t: tLift, weight: 340, col: TH.ink },
      { text: 'abusive or cruel behavior', face: 's', size: [s, s * 0.95], y: [y0 + s * 1.08, y0 + s * 1.03], t: tLift + 0.07, weight: 620, col: TH.ink },
      { text: 'toward our models.', face: 's', size: [s, s * 0.95], y: [y0 + s * 2.16, y0 + s * 2.06], t: tLift + 0.14, weight: 340, col: TH.ink },
    ], { x: [150, 80], snap: tLift });
    if (t >= tLift + 0.25) withA(eOQ((t - tLift - 0.25) / F30(8)), () => tmono('ANTHROPIC’S WORDING · USAGE POLICY · 8 OCT 2026', V(150, 80), V(y0 + s * 2.16 + 90, y0 + s * 2.06 + 86), { col: TH.mute }));
    const ys = V(y0 + s * 2.16 + 250, y0 + s * 2.06 + 300);
    bigLines(t, [
      { text: 'only in extreme cases.', face: 's', size: [s * 0.86, s * 0.86], y: [ys, ys], times: [k.x1.w[8], k.x1.w[9], k.x1.w[11], k.x1.w[12]], weight: 520, col: TH.ink, marker: [2, 3, k.x1.w[12] + 0.15] },
    ], { x: [150, 80] });
  });
  sfx('paper', tLift + 0.05, 0); sfx('pen', k.x1.w[12] + 0.15, 0);

  // 8 · enforcement: the real line about ending chats; the chat ends
  addT(k.n1.t - 0.12, 'lil', 'ended', (t) => thr1(t));
  sfx('notify', k.n1.t - 0.06, -2); sfx('shutter', k.n1.w[10] - 0.3, 0); sfx('pen', k.n1.w[10], -2);
  MOTION.expect('"This conversation has ended" types on', endedAt + 0.12, { el: 'thread-rule/This conversation has ended', tol: 3 });
  // the chat ending breaks out full width for a beat, then her next line arrives under it
  addT(endedAt + 0.3, 'lil', 'chat-ends', (t) => {
    thr1(t, { dim: 0.12 });
    breakout(t, endedAt + 0.32, 'This conversation has ended', null, { y: [560, 900], s0: 0.35, size: [200, 120] });
  });
  sfx('tape', endedAt + 0.03, 0);
  addT(Math.max(k.n2.w[4], endedAt + 1.5), 'lil', 'other-side', (t) => thr1(t));

  /* ================= chapter 2: the constitution, the tool, living things (a new chat) ================= */
  const T2 = thread('constitution', [
    sys('New chat', k.c1.t - 1.4),
    her('Then in Claude’s constitution,', { ph: k.c1 }),
    srcCard('ctitle', k.c1.w[3] - 0.1, k.c1.w[3], end(k.c1), [760, 900]),
    her('the document that Anthropic published to describe who Claude should be.', { ph: k.c2 }),
    her('They call Claude’s moral status deeply uncertain.', { ph: k.c3, em: [[2, 6]] }),
  ]);
  addT(k.c1.t + 0.08, 'lil', 'new-chat', (t) => drawThread(T2, t));
  sfx('notify', k.c1.t - 0.06, -2); sfx('shutter', k.c1.w[3] - 0.1, 0); sfx('pen', k.c1.w[3], -3);
  const tDoc = k.c2.t - 0.05;
  addT(tDoc, 'lil', 'page-constitution', (t) => {
    srcZoom(t, { img: SRCX.ctitle.img, crop: [560, 150, 800, 360], t0: tDoc, t1: k.c3.t, hl: [{ lines: SRCX.ctitle.hl, t0: tDoc + 0.2, t1: tDoc + 0.9 }], credit: 'SCREENSHOT · ANTHROPIC.COM/CONSTITUTION', y: [470, 820], fill: [0.62, 0.94], push: 0.05 });
    bigLines(t, [{ text: 'the document that Anthropic published to describe who Claude should be.', size: [56, 50], y: [V(1000, 1330), V(1000, 1330)], times: k.c2.w, weight: 600, col: TH.ink }], { center: true, snap: tDoc, margin: [150, 70] });
  });
  sfx('shutter', tDoc, 0);
  addT(k.c3.t - 0.1, 'lil', 'moral-chat', (t) => drawThread(T2, t));
  sfx('notify', k.c3.t - 0.06, -3);
  const tMoral = k.c3.w[2] - 0.05;
  addT(tMoral, 'lil', 'page-moral', (t) => srcZoom(t, { img: SRCX.moral.img, crop: V([16, 14, 676, 90], [16, 0, 676, 170]), t0: tMoral, t1: end(k.c3) + 0.6,
    hl: [{ lines: SRCX.moral.hl, t0: k.c3.w[3], t1: end(k.c3) }], credit: 'SCREENSHOT · ANTHROPIC.COM/CONSTITUTION', y: [500, 860] }));
  sfx('shutter', tMoral, 0); sfx('pen', k.c3.w[3], -1);

  // 9 · two voices on one screen: the constitution's words in serif, hers in her bubbles below
  const tTwo = end(k.c3) + 0.12;
  const T2b = thread('dabbling', [
    her('So they’re not explicitly saying that, oh, Claude is conscious, but they are dabbling with the idea.', { ph: k.c4, em: [[13, 13]] }),
    her('They’re not sure it’s conscious yet, but you know.', { ph: k.c5 }),
  ]);
  addT(tTwo, 'lil', 'two-voices', (t) => {
    const s = V(92, 76), y0 = V(190, 470);
    bigLines(t, [
      { text: 'Claude’s moral status is', face: 's', size: [s, s], y: [y0, y0], t: tTwo, weight: 340, col: TH.ink },
      { text: 'deeply uncertain.', face: 's', size: [s, s], y: [y0 + s * 1.05, y0 + s * 1.05], t: tTwo + 0.08, weight: 640, col: TH.ink },
    ], { x: [150, 80], snap: tTwo });
    if (t >= tTwo + 0.2) withA(eOQ((t - tTwo - 0.2) / F30(8)), () => tmono('CLAUDE’S CONSTITUTION · ANTHROPIC', V(150, 80), V(y0 + s * 1.05 + 74, y0 + s * 1.05 + 74), { col: TH.mute }));
    drawThread(T2b, t, { push: false, fixed: true });
  });
  sfx('paper', tTwo + 0.05, 0); sfx('notify', k.c4.t - 0.06, -2); sfx('notify', k.c5.t - 0.06, -4);

  // 10 · leadership: her message, then the human words start sticking to the tool
  const T2c = thread('leadership', [
    her('What I find interesting about what Anthropic’s leadership has been doing with Claude', { ph: k.l1 }),
  ]);
  addT(k.l1.t - 0.1, 'lil', 'leadership', (t) => drawThread(T2c, t));
  sfx('notify', k.l1.t - 0.06, -2);

  // 11 · stickers: the human words land on "Claude", then fall off on "the fact still stands"
  const tStick = k.l2.t - 0.1;   // "is this extra effort…": the human words land as she says them
  const tFall = k.f1.t;
  const STK = [
    { s: 'human behaviour', t: k.l2.w[6] - 0.04, dx: [-330, -170], dy: [-190, -260], r: -5, ink: false },
    { s: 'human consciousness', t: k.l2.w[9] - 0.04, dx: [300, 150], dy: [-120, -120], r: 4, ink: true },
    { s: 'a form of humanity', t: k.l3.w[2], dx: [-260, -140], dy: [150, 150], r: 3, ink: false },
    { s: 'consciousness', t: k.l3.w[7], dx: [330, 170], dy: [190, 280], r: -4, ink: true },
  ];
  addT(tStick, 'lil', 'stickers', (t) => {
    const cy = V(540, 900);
    const fs = V(260, 210); const font = TF.b(fs, 800);
    const sp = t >= tStick ? 1 : 0;
    withA(sp, () => txt('Claude', CX, cy + fs * 0.34 + (1 - sp) * 20, font, TH.ink, 'center', 'alphabetic', -0.04 * fs));
    withA(sp, () => tmono('A TOOL, IN HER VIEW', CX, V(1000, 1400), { align: 'center', col: TH.mute }));
    STK.forEach((k2, i) => {
      if (t < k2.t) return;
      const p = MOTION.spring(t - k2.t, 0.55, 2.4); const fsz = V(56, 46);
      let x = CX + V(k2.dx[0], k2.dx[1]), y = cy + V(k2.dy[0], k2.dy[1]), rot = k2.r * Math.PI / 180;
      const s = lerp(1.35, 1, p);
      if (t >= tFall) { const dt = t - tFall - i * F30(3); if (dt > 0) { const e = E.inCubic(clamp(dt / 0.55)); y += 1250 * e; rot += (i % 2 ? 1 : -1) * 0.9 * e; x += (i % 2 ? 1 : -1) * 260 * e; } }
      const w = tw(k2.s, TF.b(fsz, 700), -0.01 * fsz) + 56, h = fsz * 1.6;
      withT(x, y, s, rot, () => grp('sticker ' + i, -w / 2, -h / 2, w, h, () => {
        fillRR(-w / 2, -h / 2, w, h, 10, k2.ink ? TH.her : TH.card);
        if (!k2.ink) strokeRR(-w / 2, -h / 2, w, h, 10, TH.rule, 2);
        txt(k2.s, 0, fsz * 0.34, TF.b(fsz, 700), k2.ink ? TH.herText : TH.ink, 'center', 'alphabetic', -0.01 * fsz);
      }));
    });
  });
  STK.forEach((k2) => sfx('paper', k2.t, 0)); sfx('fall', tFall + 0.15, 0);
  MOTION.expect('sticker "a form of humanity" lands', k.l3.w[2], { el: 'stickers/@sticker 2', tol: 3 });

  // 12 · "Claude is a tool." / "It is not a human."
  const tTool = k.f2.t - 0.06;
  addT(tTool, 'lil', 'tool', (t) => {
    const s = V(250, 150), y = V(500, 860);
    bigLines(t, [{ text: 'Claude is a tool.', size: [s, s], y: [y, y], times: k.f2.w, weight: 800, col: TH.ink, marker: [2, 3, k.f2.w[3] + 0.12], fit: true },
      { text: 'It is not a human.', size: [84, 70], gap: V(170, 150), times: k.f3.w, weight: 600, col: TH.mute }], { center: true, snap: tTool, margin: [130, 60] });
  });
  sfx('hit', k.f2.w[3], 0);

  // 13 · amazing tool: the capabilities (an illustrative calculation, answered instantly)
  const tCalc = k.a2.w[16] - 0.05;   // "compute"
  const T2d = thread('amazing', [
    her('It is an incredibly amazing tool.', { ph: k.a1, em: [[3, 4]] }),
    her('I acknowledge that it has real capabilities that the average human might not be able to compute.', { ph: k.a2 }),
  ]);
  addT(k.a1.t - 0.12, 'lil', 'amazing', (t) => drawThread(T2d, t));
  sfx('notify', k.a1.t - 0.06, -2); sfx('notify', k.a2.t - 0.06, -4);
  addT(tCalc - 0.03, 'lil', 'calculation', (t) => {
    const fs = V(120, 76), y = V(470, 820), ans = '471,089,223';
    txt('48,213 × 9,771 =', CX, y, TF.m(fs, 500), TH.ink, 'center');
    let sAns = ans; if (t < k.a3.t) { const n = Math.floor((t - tCalc) * 30); sAns = ans.replace(/\d/g, (d, i) => String(Math.floor(hash(n * 13 + i) * 10))); }
    _txt(sAns, CX, y + V(190, 150), TF.m(fs * 1.5, 500), t >= k.a3.t ? '#5B45C9' : TH.mute, 'center');
    tmono('A SUM MOST PEOPLE CAN’T DO IN THEIR HEAD', CX, y + V(330, 280), { align: 'center', col: TH.mute });
    bigLines(t, [{ text: 'Mathematical capabilities, right? Mind-blowing capabilities.', size: [64, 54], y: [V(220, 520), V(220, 520)], times: k.a3.w, weight: 700, col: TH.ink, em: [[3, 4, '#5B45C9']] }], { center: true, margin: [150, 70] });
  });
  sfx('type', tCalc, 0); sfx('ding', k.a3.t - 0.06, 0);

  // 14 · night: what she believes (big, centred)
  addT(k.v1.t - 0.08, 'nite', 'believe', (t) => {
    const s = V(132, 96);
    bigLines(t, [{ text: 'But I do not believe that the model is conscious.', size: [s, s], y: [V(440, 760), V(440, 760)], times: k.v1.w, weight: 700, out: k.v2.t - 0.1, em: [[2, 4, TH.lilac]] }], { center: true, snap: k.v1.t - 0.08, margin: [130, 70] });
    bigLines(t, [{ text: 'Consciousness belongs to living organisms.', size: [s * 1.25, s * 1.1], y: [V(440, 760), V(440, 760)], times: k.v2.w, weight: 800, em: [[3, 4, TH.lilac]] }], { center: true, margin: [130, 70] });
  });
  sfx('switch', k.v1.t - 0.08, 0); sfx('hit', k.v2.w[3], -3);

  // 15 · "this should have been a conversation" (back in the chat)
  const T2e = thread('conversation', [
    her('I don’t even think this should have been a conversation in the first place.', { ph: k.v3, em: [[8, 9]] }),
  ]);
  addT(k.v3.t - 0.1, 'lil', 'conversation', (t) => drawThread(T2e, t));
  sfx('notify', k.v3.t - 0.06, -1);

  // 16 · night: living things, not a model, not an algorithm (stacked in her order, centred)
  addT(k.v4.t - 0.08, 'nite', 'living', (t) => {
    const s = V(132, 96), y = V(330, 640);
    bigLines(t, [
      { text: 'Consciousness belongs to living things,', size: [s, s], y: [y, y], times: k.v4.w, weight: 800, em: [[3, 4, TH.lilac]] },
      { text: 'not to a model,', size: [s, s], times: k.v5.w, weight: 500, col: TH.nightMute },
      { text: 'not to an algorithm.', size: [s, s], times: k.v6.w, weight: 500, col: TH.nightMute },
    ], { center: true, snap: k.v4.t - 0.08, margin: [130, 70] });
  });
  sfx('switch', k.v4.t - 0.08, 0);

  // 17 · impose: her three moves as a numbered list (her deck's structure), then the line that breaks out
  const tList = k.i1.t - 0.1, tViol = k.i4.w[11] - 0.05;
  addT(tList, 'lil', 'impose', (t) => pushed(t, tList, k.i4.t, 0.035, () => {
    const rows = [[k.i1, 'give a machine human consciousness', 0], [k.i2, 'impose a human consciousness in a machine', 2], [k.i3, 'make it subject to rules that apply to humans', 1]];
    const x = V(150, 80), y0 = V(250, 560), rh = V(195, 210), fs = V(80, 60);
    const dimA = t >= tViol ? 1 - 0.75 * eOQ((t - tViol) / F30(10)) : 1;
    withA(dimA, () => rows.forEach(([ph, s, w0], i) => {
      const t0 = ph.w[w0] - 0.05; if (t < t0) return; const p = eOQ((t - t0) / F30(9)); const y = y0 + i * rh;
      withA(p, () => { tmono('0' + (i + 1), x, y - fs * 0.15, { col: TH.mute });
        txtW(s, x + V(110, 90), y + (1 - p) * 14, TF.b(fs, 700), TH.ink, W - x - V(110, 90) - V(60, 60), fs * 1.08);
        hline(x, y + V(52, fs * 1.08 + 44), (W - 2 * x) * p, 1, TH.rule, 2); });
    }));
    bigLines(t, [{ text: 'a serious violation against humanity itself.', size: [V(110, 84), V(110, 84)], y: [V(830, 1250), V(830, 1250)], times: k.i4.w.slice(10), weight: 800, col: TH.ink, marker: [3, 5, k.i4.w[14] + 0.1] }], { x: [150, 80] });
  }));
  [[k.i1, 0], [k.i2, 2], [k.i3, 1]].forEach(([ph, w0]) => sfx('tick', ph.w[w0] - 0.05, 0)); sfx('hit', k.i4.w[13], 1);
}

/* the big meter (full frame): her line on top, "not sure" <-> "might be conscious" (her reading), a knob that never settles */
function bigMeter(t, k, t0) {
  const x0 = V(170, 90), x1 = W - V(170, 90), ty = V(700, 1060);
  const hd = t < k.m2.t - 0.05 ? 'Anthropic is not sure whether Claude might be conscious.' : 'They are not sure, but they think that Claude might be conscious.';
  bigLines(t, [{ text: hd, size: [V(84, 66), V(84, 66)], y: [V(230, 520), V(230, 520)], t: t0, weight: 700, col: TH.ink, key: hd }], { x: [170, 90], snap: t0 });
  const a = eOQ((t - t0) / F30(10));
  rect(x0, ty - 4, (x1 - x0) * a, 8, TH.ink);
  for (let i = 0; i <= 10; i++) rect(x0 + (x1 - x0) * i / 10 - 2, ty + 4, 4, i % 5 ? 18 : 34, TH.ink);
  const lf = TF.b(V(64, 50), 700);
  withA(a, () => { txt('not sure', x0, ty - V(60, 60), lf, TH.ink); txt('might be conscious', x1, ty - V(60, 60), lf, TH.ink, 'right'); });
  const marks = [[k.m1.w[8] - 0.08, 0.2], [k.m1.w[12], 0.8], [k.m2.w[5], 0.22], [k.m2.w[12], 0.78]];
  let pv = 0.5, cur = 0.5;
  for (const [tm, v] of marks) { if (t >= tm) { cur = lerp(pv, v, MOTION.spring(t - tm, 0.5, 2.2)); pv = v; } }
  if (t >= k.m1.w[12] + 0.4 && t < k.m2.w[5]) MOTION.state('meter right', true);
  const nx = lerp(x0 + 40, x1 - 40, cur);
  withA(a, () => { circle(nx, ty, V(46, 40), TH.her); circle(nx, ty, V(16, 14), TH.lilac); });
}

/* the meter: Anthropic "not sure" <-> "might be conscious" (her reading), a needle that never settles */
function meter(x, y, w, h, t, k) {
  fillRR(x, y, w, h, 18, TH.card); strokeRR(x, y, w, h, 18, TH.rule, 2);
  const px = V(44, 36);
  _txt('IS CLAUDE CONSCIOUS? · ANTHROPIC, AS SHE READS IT', x + px, y + 58, TF.m(V(30, 30)), TH.mute);
  if (PORTRAIT) { /* label wraps in portrait: shorter */ }
  const ty = y + h - V(70, 80), x0 = x + px, x1 = x + w - px;
  rect(x0, ty - 2, x1 - x0, 4, TH.rule);
  const left = TF.b(V(46, 42), 600);
  _txt('not sure', x0, ty - 34, left, TH.ink); _txt('might be conscious', x1, ty - 34, left, TH.ink, 'right');
  // targets on her words: not sure (left) / might be conscious (right)
  const marks = [[k.m1.w[8], 0.18], [k.m1.w[12], 0.82], [k.m2.w[5], 0.2], [k.m2.w[12], 0.85]];
  let pos = 0.5, from = 0.5, t0 = -1;
  for (const [tm, v] of marks) if (t >= tm) { from = pos; pos = v; t0 = tm; }
  let cur = pos; if (t0 >= 0) { const prev = marks.filter(m => m[0] < t0).map(m => m[1]); const pv = prev.length ? prev[prev.length - 1] : 0.5; cur = lerp(pv, pos, MOTION.spring(t - t0, 0.5, 2.2)); }
  const nx = lerp(x0 + 30, x1 - 30, cur);
  circle(nx, ty, 22, TH.her); circle(nx, ty, 8, TH.lilac);
}

/* the calculation card (digits roll, then the real product lands on "Mathematical") */
function calc(x, y, w, h, t, t0, t1) {
  fillRRv(x, y, w, h, [30, 30, 30, 10], TH.card); strokeRRv(x, y, w, h, [30, 30, 30, 10], TH.rule, 2);
  const fs = V(56, 46), font = TF.m(fs, 500);
  _txt('48,213 × 9,771 =', x + V(44, 36), y + V(80, 84), font, TH.ink);
  const ans = '471,089,223'; let s = '';
  if (t >= t1) s = ans; else { const n = Math.floor((t - t0) * 30); s = ans.replace(/\d/g, (d, i) => String(Math.floor(hash(n * 13 + i) * 10))); }
  _txt(s, x + V(44, 36), y + V(160, 178), TF.m(fs * 1.2, 500), t >= t1 ? '#5B45C9' : TH.mute);
}

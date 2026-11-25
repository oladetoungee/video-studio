/* Scenes, part 3: data minimisation, access levels, culture, reciprocity, the close (2:36 - 5:00).
 * Phase 1 (style frames): minimisation, the yes/no question, what it doesn't require, the minimal answer,
 * Estonia vs Ghana (same record, different meaning), transparency runs both ways. */
'use strict';

function buildScenes3() {
  const k = PS({
    mini: 'and i was also then thinking about data minimisation',
    idea: 'so the idea of data minimisation is that you expose the minimum amount of data required to answer the question being asked',
    ask: 'so if i ask the question is this person currently free to marry',
    yn: "that's a yes or no answer",
    req: 'answering that question does not require showing when they got married who they married when they divorced which court granted it right',
  });

  /* ---------- 30 · data minimisation: the record shrinks to the one row that answers (ink, green) ---------- */
  addS(S(k.mini), 'ink', 'minimisation', (t) => {
    const i = k.idea.w;
    KR(t, { lines: ['Data'], x: L - 6, y: V(320, 540), size: V(170, 150), times: [k.mini.w[7]] });
    KR(t, { lines: ['*minimisation.*'], x: L - 6, y: V(480, 680), size: V(150, 120), times: [k.mini.w[8]] });
    KT(t, { lines: V(['You expose the ~minimum~ amount of data', 'required to answer the question being asked.'], ['You expose the ~minimum~', 'amount of data required to', 'answer the question being asked.']), font: 'body', x: L, y: V(700, 810), size: V(52, 50), lh: 1.2, times: i.slice(8, 22) });
    const rows = [['Status', 0.42], ['Names', 0.8], ['Spouse', 0.7], ['Dates', 0.5], ['Court', 0.6], ['History', 0.75]].map(([kk, bw], n) => ({ k: kk, bw, tin: i[4] + n * 0.08, hide: n ? i[11] + n * 0.06 : null, mark: n === 0 && t >= i[17] ? C.green : null }));
    landing(t, S(k.mini) + 0.06, V(1340, L), V(200, 1000), { dx: V(140, 0), dy: V(0, 100), d: 0.5 }, (X, Y) => recordCard(t, X, Y, V(470, W - 2 * L), { title: 'Record', tag: 'Illustration', rows, rowH: V(64, 52), key: 'mini record' }));
  }, { id: 'minimisation', acc: 'green' });
  sImp(k.mini.w[8] + 0.05, -9); sCard(S(k.mini) + 0.06); sWh(k.idea.w[11] + 0.1, -6); sPen(k.idea.w[17], -3);

  /* ---------- 31 · the question: free to marry? yes or no (paper, green) ---------- */
  addS(S(k.ask), 'paper', 'free-to-marry', (t) => {
    const a = k.ask.w, y = k.yn.w; const q = 'Is this person currently free to marry?';
    withA(ease(t, a[3], 0.3), () => mono('The question', L, V(230, 480), 28, g.mid, 'left', { ls: 0.24 }));
    landing(t, a[3], L, V(290, 530), { dy: 60, d: 0.45 }, (X, Y) => {
      searchBox(t, X, Y, W - 2 * L, { h: V(120, 100), fs: V(48, 30), btnW: V(210, 150), q, typeT0: a[6], cps: q.length / Math.max(0.8, a[12] - a[6] + 0.3), press: a[12] + 0.35, key: 'question box' });
      illus(X + W - 2 * L, Y + V(160, 140), 'right');
    });
    const cw = V(420, 440), ch = V(300, 330);
    yesNo(t, V(CX - cw - 12, L), V(560, 800), cw, ch, y[2] - 0.05, null, 'yes', { key: 'yes no question' });
    withA(ease(t, y[5], 0.35), () => mono('A yes or no answer', V(CX, CX), V(950, 1240), 30, g.fg, 'center', { ls: 0.22 }));
  }, { id: 'free-to-marry', acc: 'green' });
  sCard(k.ask.w[3]); sType(k.ask.w[6], 39, 39 / Math.max(0.8, k.ask.w[12] - k.ask.w[6] + 0.3)); sClick(k.ask.w[12] + 0.35); sPop(k.yn.w[2], -2); sPop(k.yn.w[4], -2);

  /* ---------- 32 · what answering it does NOT require (paper, orange) ---------- */
  addS(S(k.req), 'paper', 'not-required', (t) => {
    const r = k.req.w;
    KT(t, { lines: V(['Answering that question ~does not~ require showing:'], ['Answering that question', '~does not~ require showing:']), font: 'body', x: L, y: V(210, 480), size: V(58, 56), t0: r[0] - 0.08, stagger: 0.03 });
    IDX(t, [
      { n: '01', s: 'When they got married', tin: r[7], strike: r[10] + 0.3 },
      { n: '02', s: 'Who they married', tin: r[11], strike: r[13] + 0.3 },
      { n: '03', s: 'When they divorced', tin: r[14], strike: r[16] + 0.3 },
      { n: '04', s: 'Which court granted it', tin: r[17], strike: r[20] + 0.25 },
    ], { x: L, y: V(400, 720), w: V(1700, W - 2 * L), rowH: V(145, 175), size: V(76, 62), numW: V(120, 84), strikeCol: C.orange });
  }, { id: 'not-required', acc: 'orange' });
  [[7, 10], [11, 13], [14, 16], [17, 20]].forEach(([a, b]) => { sPop(k.req.w[a], -4); sPen(k.req.w[b] + 0.3, -1); });

  buildCould();

  /* ---------- 33 · Marrify's case: the minimal answer, nothing else (paper, green) ---------- */
  const m = PS({
    case: 'like in the case of marrify in ghana for example the question is is this person married',
    simple: 'so the answer is simple this person currently has an active marriage on record',
    noth: 'nothing else no name of spouse no dates no history',
  });
  addS(S(m.case), 'paper', 'minimal-answer', (t) => {
    const c = m.case.w, s = m.simple.w, n = m.noth.w; const q = 'Is this person married?';
    KT(t, { lines: V(['In the case of Marrify, the question is:'], ['In the case of Marrify,', 'the question is:']), font: 'body', x: L, y: V(190, 470), size: V(54, 54), times: [c[1], c[2], c[3], c[4], c[5], c[10], c[11], c[12]] });
    searchBox(t, L, V(240, 570), W - 2 * L, { h: V(110, 96), fs: V(44, 32), btnW: V(210, 150), q, typeT0: c[13], cps: 26, press: c[16] + 0.25, key: 'married box' });
    illus(W - L, V(384, 696), 'right');
    // the answer card
    const ax = L, ay = V(400, 720), aw = W - 2 * L, ah = V(300, 400);
    landing(t, s[2], ax, ay, { dy: 70, d: 0.5 }, (X, Y) => grp('answer card', X, Y, aw, ah, () => {
      rect(X, Y, aw, ah, C.card); strokeR(X, Y, aw, ah, C.ink, 4);
      mono('Answer', X + 48, Y + 60, 24, C.mid, 'left', { ls: 0.22, fixed: true });
      KT(t, { lines: V(['This person currently has an', '*active marriage* on record.'], ['This person currently', 'has an *active marriage*', 'on record.']), font: 'body', x: X + 48, y: Y + V(150, 150), size: V(64, 58), lh: 1.15, times: s.slice(5, 14), acc: C.greenInk });
    }));
    stamp(t, n[0], V(W - L - 290, W - L - 210), V(ay + 200, ay + 300), 'Nothing else.', C.ink, { size: V(40, 32), rot: -0.08, key: 'nothing else' });
    // what it does not show: redacted
    const hidden = [['Name of spouse', n[3]], ['Dates', n[7]], ['History', n[9]]];
    hidden.forEach(([lab, tin], i) => {
      const p = ease(t, tin - 0.15, 0.35); if (p <= 0) return;
      const x = V(L + i * 580, L), y = V(830, 1190 + i * 88), bw = V(540, 520);
      withA(clamp(p * 2), () => {
        mono('No ' + lab.toLowerCase(), x, y, 24, g.mid, 'left', { ls: 0.18, key: 'hidden ' + i });
        const bx = V(x, x + 400), by = V(y + 26, y - 32);
        rect(bx, by, V(bw, W - L - x - 400) * E.outExpo(prog(t, tin + 0.05, 0.35)), V(54, 44), C.ink);
      });
    });
  }, { id: 'minimal-answer', acc: 'green' });
  sType(m.case.w[13], 23, 26); sClick(m.case.w[16] + 0.25); sCard(m.simple.w[2]); sPen(m.simple.w[10] + 0.3, -4); sStamp(m.noth.w[0] + 0.06, -1); sPop(m.noth.w[3], -3); sPop(m.noth.w[7], -4); sPop(m.noth.w[9], -3);

  buildAccess();

  /* ---------- 40 · same record, different meaning: Estonia vs Ghana (paper, orange) ---------- */
  const s2 = PS({
    ex: "for example the way a piece of technology works in estonia will be completely different from the way it's working in a country in africa in nigeria in ghana",
    ee: 'in estonia a divorce record could just be administrative nobody cares',
    af: 'but in an african context to a large extent divorce especially for women is pretty stigmatised',
  });
  addS(S(s2.ex), 'paper', 'split', (t) => {
    const x = s2.ex.w, e = s2.ee.w, a = s2.af.w;
    KR(t, { lines: ['Completely different.'], x: V(CX, CX), align: 'center', y: V(200, 480), size: V(110, 80), times: [x[13], x[14]] });
    if (PORTRAIT) withA(ease(t, e[3], 0.3), () => illus(W - L, 1262, 'right'));
    const dv = ease(t, x[10], 0.7, E.inOutCubic);
    if (PORTRAIT) hline(L, 975, W - 2 * L, dv, C.line, 3); else rect(959, 290, 3, 720 * dv, C.line);
    const half = (side) => {
      const left = side === 0;
      const ox = V(left ? L : 1030, L), oy = V(300, left ? 560 : 1010);
      const cardX = V(ox, 470), cardY = V(500, left ? 550 : 1000), cardW = V(640, W - L - 470), rowH = V(56, 52), rows = V(3, 2);
      // flags + place label
      if (left) flagIn(t, S(s2.ex) + 0.06, 'estonia', ox, oy, V(157, 141), { key: 'split estonia', label: 'Estonia', labSize: 24, labDy: 40 });
      else {
        flagIn(t, S(s2.ex) + 0.22, 'nigeria', ox, oy, V(200, 180), { key: 'split nigeria', label: 'Nigeria', labSize: 24, labDy: 40 }); flagIn(t, S(s2.ex) + 0.36, 'ghana', ox + V(230, 206), oy, V(150, 135), { key: 'split ghana', label: 'Ghana', labSize: 24, labDy: 40 });
      }
      // the same record
      const tin = e[3] + (left ? 0 : 0.12); const heavy = left ? 0 : ease(t, a[9], 0.3);
      landing(t, tin, cardX, cardY, { dy: 80, d: 0.5 }, (X, Y) => recordCard(t, X, Y, cardW, { title: 'Divorce record', tag: V('Illustration', null), rowH, rows: [['Names', 0.7], ['Date', 0.4], ['Court', 0.55]].slice(0, rows).map(([kk, bw]) => ({ k: kk, bw })), border: heavy > 0.5 ? C.orange : C.ink, key: 'split record ' + side }));
      // what it means there
      if (left) {
        KR(t, { lines: ['Administrative.'], x: L - 4, y: V(880, 870), size: V(76, 72), times: [e[8]] });
        KT(t, { lines: ['Nobody cares.'], font: 'body', x: L, y: V(950, 935), size: V(44, 44), times: [e[9], e[10]] });
      } else {
        KR(t, { lines: ['*Stigmatised.*'], x: V(1030, L) - 4, y: V(880, 1330), size: V(76, 72), times: [a[15]] });
        KT(t, { lines: ['Especially for women.'], font: 'body', x: V(1030, L), y: V(950, 1395), size: V(44, 44), times: [a[10], a[11], a[12]] });
      }
    };
    half(0); half(1);
  }, { id: 'split', acc: 'orange' });
  sPop(s2.ex.w[13], -3); sPop(s2.ex.w[10] + 0.4, -4); sPop(s2.ex.w[26] + 0.4, -4); sPop(s2.ex.w[28] + 0.4, -5); sCard(s2.ee.w[3]); sCard(s2.ee.w[3] + 0.12, -3);
  sPop(s2.ee.w[8], -2); sTick(s2.af.w[9], -2); sPop(s2.af.w[12], -4); sImp(s2.af.w[15] + 0.05, -10);

  buildCulture();

  /* ---------- 50 · reciprocity: your data in the system, and you seeing what happens to it (ink, green) ---------- */
  const r = PS({
    smart: 'but another thing i find genuinely smart in estonia',
    paired: "is the idea that your data being in the system is also paired with you being able to see what's happening to it",
    both: 'that transparency runs both ways',
  });
  addS(S(r.smart), 'ink', 'two-way', (t) => {
    const p = r.paired.w;
    KT(t, { lines: V(['Another thing I find ~genuinely smart~ in Estonia:'], ['Another thing I find', '~genuinely smart~ in Estonia:']), font: 'body', x: L, y: V(190, 470), size: V(56, 54), times: r.smart.w.slice(1) });
    flagIn(t, r.smart.w[8], 'estonia', V(W - L - 170, W - L - 150), V(110, 380), V(170, 150), { key: 'two-way flag' });
    // you
    const px = V(420, CX), py = V(640, 760), ps = V(210, 170);
    withA(ease(t, S(r.smart) + 0.06, 0.35), () => { person(px, py, ps, C.paper); mono('You', px, py + ps * 0.42 + 50, 26, g.fg, 'center', { ls: 0.24 }); });
    // the system: your record
    const cx = V(1180, L + 100), cy = V(380, 1110), cw = V(540, W - 2 * L - 200);
    landing(t, S(r.smart) + 0.2, cx, cy, { dx: V(120, 0), dy: V(0, 90), d: 0.5 }, (X, Y) => recordCard(t, X, Y, cw, { title: 'Your record', tag: 'Illustration', rowH: 56, rows: [['Names', 0.7], ['Status', 0.45], ['Dates', 0.5], ['Looked up by', 0.6]].slice(0, V(4, 3)).map(([kk, bw]) => ({ k: kk, bw })), key: 'two-way record' }));
    // the two directions
    const a1 = ease(t, p[5], 0.55, E.inOutCubic), a2 = ease(t, p[12], 0.55, E.inOutCubic);
    if (!PORTRAIT) {
      arrow(560, 520, 1150, 520, a1, C.paper, 5, 22); withA(a1, () => mono('Your data, in the system', 855, 490, 24, g.fg, 'center', { ls: 0.2 }));
      arrow(1150, 700, 560, 700, a2, C.green, 5, 22);
      eye(855, 790, 56, C.green, ease(t, p[18], 0.35), C.ink);
      withA(ease(t, p[18], 0.35), () => mono('You, seeing what happens to it', 855, 900, 24, C.green, 'center', { ls: 0.2 }));
    } else {
      arrow(420, 880, 420, 1090, a1, C.paper, 5, 22); withA(a1, () => mono('Your data, in the system', L, 960, 22, g.fg, 'left', { ls: 0.2, maxW: 300 }));
      arrow(660, 1090, 660, 880, a2, C.green, 5, 22);
      eye(540, 985, 44, C.green, ease(t, p[18], 0.35), C.ink);
      withA(ease(t, p[18], 0.35), () => mono('You, seeing what happens to it', 700, 960, 22, C.green, 'left', { ls: 0.2, maxW: 300 }));
    }
    wipe(t, S(r.both), C.blue, 0.45);
  }, { id: 'two-way', acc: 'green' });
  sPop(r.smart.w[6], -4); sPop(r.smart.w[8] + 0.4, -5); sPop(S(r.smart) + 0.3, -4); sCard(S(r.smart) + 0.2); sWh(r.paired.w[5] + 0.2, -6); sWh(r.paired.w[12] + 0.2, -6); sPop(r.paired.w[18], -2); sWh(S(r.both) - 0.1, -3);

  /* ---------- 51 · punchline: that transparency runs both ways (blue full bleed) ---------- */
  addS(S(r.both), 'blue', 'both-ways', (t) => {
    const b = r.both.w;
    KR(t, { lines: ['That transparency'], x: L - 4, y: V(360, 700), size: V(110, 96), times: [b[0], b[1]] });
    KR(t, { lines: V(['runs ~both ways.~'], ['runs ~both~', '~ways.~']), x: L - 6, y: V(600, 900), size: V(210, 170), times: [b[2], b[3], b[4]] });
    const ay = V(840, 1230), ax0 = L, ax1 = V(W - L, W - L);
    arrow(ax0, ay, ax1, ay, ease(t, b[3], 0.5, E.inOutCubic), C.onBlue, 6, 26);
    arrow(ax1, ay + V(70, 80), ax0, ay + V(70, 80), ease(t, b[4] + 0.05, 0.5, E.inOutCubic), C.onBlue, 6, 26);
  }, { id: 'both-ways', acc: 'blue', push: 0.025 });
  sWh(r.both.w[3] + 0.15, -4); sWh(r.both.w[4] + 0.2, -6); sImp(r.both.w[4] + 0.05, -8);

  buildClose();

  /* ---------- end card (paper): the title, her handle ---------- */
  const tEnd = TOTAL - OUTRO + 0.3;
  addS(tEnd, 'paper', 'end', (t) => {
    flagIn(t, tEnd + 0.1, 'ghana', V(1330, L), V(250, 430), V(480, 330), { key: 'end ghana' });
    KR(t, { lines: ["Ghana's"], x: L - 6, y: V(440, 940), size: V(230, 200), t0: tEnd + 0.05 });
    KR(t, { lines: ['*Marrify.*'], x: L - 6, y: V(650, 1130), size: V(230, 200), t0: tEnd + 0.25 });
    KT(t, { lines: V(['Centralised data, and what ~Estonia~ taught me.'], ['Centralised data, and', 'what ~Estonia~ taught me.']), font: 'body', x: L, y: V(820, 1290), size: V(58, 56), t0: tEnd + 0.6, stagger: 0.05 });
    withA(ease(t, tEnd + 1.4, 0.4), () => mono('@WithGbemi', L, V(960, 1430), 30, g.fg, 'left', { ls: 0.2 }));
  }, { id: 'end', acc: 'blue', push: 0.012 });
  sWh(tEnd + 0.1, -5); sPop(tEnd + 0.6, -4); sPop(tEnd + 1.45, -4);
}

/* Scenes, part 3: book two (Convivial Toolbox), worth it, recap, fiction, the method, end card (9:23 - 16:00)
 * Positions are V(landscape, portrait); see scenes1.js. v3: the Convivial spine leaves the stack and becomes the
 * cover, the title words boxed on the real cover, a book bar of its three parts (her page counts) carried across
 * scenes, a crowd for "ordinary people", a bridge for "bridging", the real Marple cover, her stack at the end. */
'use strict';
// where the title words sit on the real cover photo (assets/book_convivial.jpg, 800 x 1098): [cx, cy, w, h, angle]
const CONV_WORDS = { authors: [530, 517, 290, 22, -0.245], convivial: [452, 362, 380, 70, -0.262], toolbox: [462, 432, 380, 70, -0.262], generative: [478, 470, 370, 28, -0.315], frontend: [490, 500, 370, 28, -0.315] };
/** the book as a bar of its three parts. o.split 0..1 (equal -> by pages 80/50/140), o.tin[3], o.hi [i], o.labels,
 *  o.pages (time: page counters roll), o.half (time: "more than half" bracket), o.col */
function bookBar(t, x, y, w, h, o) {
  const pg = [80, 50, 140], tot = 270; const sp = o.split || 0; const fr = pg.map(p => lerp(1 / 3, p / tot, sp)); let xx = x;
  const onInk = g === G.ink; const cols = o.cols || [onInk ? C.inkMid : C.stone, onInk ? C.inkStone : C.mid, onInk ? C.blueT : C.blue];
  for (let i = 0; i < 3; i++) { const sw = w * fr[i] - 6; const p = o.tin ? ease(t, o.tin[i], 0.6) : 1;
    if (p > 0) { rect(xx, y, sw * p, h, (o.hi && !o.hi.includes(i)) ? (onInk ? C.inkLine : C.block) : cols[i]);
      if (o.labels) withA(clamp(p * 2), () => mono(o.labels[i], xx, y - 20, V(22, 20), onInk ? C.paper : C.ink, 'left', { ls: 0.16, raw: true, fixed: true }));
      if (o.pages != null) { const q = prog(t, o.pages[i], 0.8); if (q > 0) counter(t, o.pages[i], 0.8, 0, pg[i], xx + 18, y + h / 2 + 14, F.disp(V(42, 34)), C.card, 'left', (n) => (i === 2 ? (q >= 1 ? '140+' : String(n)) : String(n))); } }
    else strokeR(xx, y, sw, h, onInk ? C.inkLine : C.line, 2);
    xx += w * fr[i]; }
  if (o.half != null) { const q = ease(t, o.half, 0.6, E.outCubic); if (q > 0) { const x0 = x + w * (fr[0] + fr[1]), x1 = x + w; const yy = y + h + 26; pline(x0, yy, lerp(x0, x1, q), yy, 1, onInk ? C.blueT : C.blue, 5); pline(x0, yy - 14, x0, yy, q, onInk ? C.blueT : C.blue, 5); if (q >= 1) pline(x1, yy - 14, x1, yy, 1, onInk ? C.blueT : C.blue, 5); withA(q, () => mono('More than half the book', x1, yy + 40, V(24, 22), onInk ? C.blueT : C.blue, 'right', { ls: 0.18 })); } }
}

function buildScenes3() {
  /* ---------- 18 · book two: the Convivial spine leaves the stack (it is the thick one) ---------- */
  const k = PS({ b2: 'now book two', big: 'this one is bigger', thesis: "it's for my thesis", title: 'convivial toolbox generative research for the front end of design by liz sanders and pieter', notp: "it's not peter", pj: 'pieter jan stappers', tf: 'now the title first', three: 'the title has like three major words', conv: "there's convivial", gen: "there's generative", tool: 'i know what the toolbox is', fe: 'and there is front end of design', main: "so let's take a look at the main word convivial", mean: 'what does convivial mean', ded: 'the book is dedicated', chk: 'because i checked it', phil: 'dedicated to a philosopher', ct: 'and convivial tools', ivan: 'the name of the philosopher is ivan something', his: 'convivial tools is his idea', power: 'convivial tools mean tools that give power back to the person using them', exp: 'rather than making that user dependent on an expert', before: 'so before i read a single page i already know the argument', guess: 'this is my guess', say: "it's going to say something", drt: 'design research tools should be able to be used by ordinary people and not just researchers', vibe: "i'm thinking that's the vibe that the title is giving", conn: 'this is connected to my thesis', even: "even if i didn't it would give me that vibe" });
  const STB = () => ({ x: V(1000, L + 40), yb: V(1010, 1430), w: V(800, 700) });
  const cov = () => ({ x: V(1300, 600), y: V(150, 740), w: V(480, 340) });
  addS(S(k.b2), 'ink', '// 19 — book two', (t) => {
    KR(t, { lines: ['Book two.'], x: L - 6, y: V(520, 620), size: V(220, 190), times: [k.b2.w[1], k.b2.w[2]] });
    KT(t, { lines: ['Bigger.', 'For my ~thesis.~'], font: 'body', x: L, y: V(680, 790), size: V(60, 56), lh: 1.25, times: [k.big.w[3], k.thesis.w[1] - 0.1, k.thesis.w[2] - 0.15, k.thesis.w[2] - 0.05] });
    const st = STB(); const tOut = k.b2.w[1]; const s = st.w / 1520;
    // Baratta + Marple settle down where Convivial was; the thick spine slides out and turns into the cover
    realStack(t, st.x, st.yb, st.w, { only: ['baratta', 'marple'], off: () => ({ dy: ease(t, tOut + 0.35, 0.45, E.outCubic) * SPINES.convivial.h * s }) });
    const r0 = realStack(t, st.x, st.yb, st.w, { only: [] }).rects.convivial; const c = cov(); const ch = c.w * IMG.bookC.height / IMG.bookC.width;
    const v = E.inOutCubic(prog(t, tOut + 0.3, 0.6));
    ((tt) => { const u2 = E.inOutCubic(prog(tt, tOut, 0.6)), v2 = E.inOutCubic(prog(tt, tOut + 0.3, 0.6)); const xf = clamp((v2 - 0.78) / 0.22); const X2 = lerp(lerp(r0[0], r0[0] + V(300, 80), u2), c.x, v2), Y2 = lerp(lerp(r0[1], r0[1] + V(60, 40), u2), c.y, v2), W2 = lerp(r0[2], c.w, v2), H2 = lerp(r0[3], ch, v2);
      withA(1 - xf, () => ctx.drawImage(IMG.spine_convivial, X2, Y2, W2, H2)); withA(xf, () => { rect(X2 - 12, Y2 - 12, W2 + 24, H2 + 24, C.card); ctx.drawImage(IMG.bookC, X2, Y2, W2, H2); }); })(t);
    // "bigger": the thickness, measured against the Baratta spine
    const bp = prog(t, k.big.w[3], 0.5); if (bp > 0 && v >= 1) withA(bp, () => { const bx = c.x - 40; pline(bx, c.y, bx, c.y + ch * E.outCubic(bp), 1, C.blueT, 4); pline(bx - 14, c.y, bx + 14, c.y, 1, C.blueT, 4); if (bp >= 1) pline(bx - 14, c.y + ch, bx + 14, c.y + ch, 1, C.blueT, 4); });
    const tp = prog(t, k.thesis.w[2], 0.35); if (tp > 0 && v >= 1) { const e = E.outBack(tp, 1.8); rect(c.x + c.w * 0.62, c.y - 12 - 60 * e, 120, 70 * e, C.blue); if (e > 0.6) _txt('THESIS', c.x + c.w * 0.62 + 60, c.y - 12 - 60 * e + 34, F.mono(18, 500), C.onBlue, 'center', 'alphabetic', 3); }
  }, { id: 'book-two', grid: true });
  sImp(k.b2.w[1], -8); sWh(k.b2.w[1] + 0.3, -3); sBook(k.b2.w[1] + 0.7, -4); sPage(k.b2.w[1] + 0.8, -4); sPen(k.big.w[3], -4); sPop(k.thesis.w[2] + 0.08, -2);
  // the authors, typed; her "Pieter... it's not Peter, Pieter Jan Stappers" becomes a backspace
  const tA = k.title.w[11], tB = k.notp.w[2] + 0.15, tC = k.pj.t;
  const s1 = 'LIZ SANDERS & PETER', s3 = 'PIETER JAN STAPPERS';
  const cps3 = s3.length / Math.max(0.5, k.pj.e - k.pj.t + 0.2);
  const authorStr = (t) => {
    if (t < tA) return null; if (t < tB) return s1.slice(0, clamp(Math.floor((t - tA) * 22), 0, s1.length));
    const back = clamp(Math.floor((t - tB) * 14), 0, 5); if (t < tC) return s1.slice(0, s1.length - back);
    return s1.slice(0, s1.length - 5) + s3.slice(0, clamp(Math.floor((t - tC) * cps3), 0, s3.length));
  };
  addS(S(k.title), 'paper', '// 19 — book two', (t) => {
    // the real cover, its title words boxed as she names them
    const cx = V(1230, 600), cy = V(170, 920), cw = V(560, 360); const pad = 14; const s = (cw - pad * 2) / IMG.bookC.width;
    const zA = CONV_WORDS.authors, zx = cx + pad + zA[0] * s, zy = cy + pad + zA[1] * s; const zin = Math.exp(Math.log(1.6) * E.inOutCubic(prog(t, tA - 0.3, k.pj.e - tA + 0.3))); const zm = lerp(zin, 1, E.inOutCubic(prog(t, k.pj.e + 0.4, 0.9)));
    const zoomed = (fn) => { ctx.save(); ctx.beginPath(); ctx.rect(cx - 30, cy - 30, cw + 60, cw * IMG.bookC.height / IMG.bookC.width + 80); ctx.clip(); ctx.translate(zx, zy); ctx.scale(zm, zm); ctx.translate(-zx, -zy); fn(); ctx.restore(); };
    zoomed(() => imgCard(IMG.bookC, cx, cy, cw, { pad, rot: 0, key: 'cover convivial' }));
    const box = (key, ti, col, on = 1) => { const p = prog(t, ti, 0.4); if (p <= 0) return; const [bx, by, bw, bh, a] = CONV_WORDS[key]; withA(on, () => withT(cx + pad + bx * s, cy + pad + by * s, 1, a, () => { const e = E.outExpo(p); strokeR(-bw * s / 2 - 8, -bh * s / 2 - 8, (bw * s + 16) * e, bh * s + 16, col, 6); })); };
    beat(t, 0, k.three.t - 0.1, () => {
      KR(t, { lines: ['Convivial', 'Toolbox'], x: L - 6, y: V(330, 470), size: V(190, 140), times: k.title.w.slice(0, 2) });
      KT(t, { lines: V(['~Generative Research for the~', '~Front End of Design~'], ['~Generative Research for~', '~the Front End of Design~']), font: 'serif', x: L, y: V(620, 690), size: V(64, 54), ul: false, times: TM({ t: k.title.w[2], w: k.title.w.slice(2, 10) }, 8) });
      const inZoom = t >= tA - 0.3 && t < k.pj.e + 0.4; zoomed(() => { if (!inZoom) { box('convivial', k.title.w[0], C.blue, t < k.title.w[1] ? 1 : 0.35); box('toolbox', k.title.w[1], C.blue, t < k.title.w[2] ? 1 : 0.35); box('generative', k.title.w[2] + 0.1, C.blue); } else box('authors', tA, C.blue); });
      const sa = authorStr(t); if (sa != null) { const f = F.mono(V(40, 32), 500), ay = V(830, 850); _txt(sa, L + 4, ay, f, g.fg, 'left', 'alphabetic', 34 * 0.14); if (t < k.pj.e + 0.8 && Math.floor(t * 2.2) % 2 === 0) rect(L + 4 + tw(sa, f, 34 * 0.14) + 6, ay - 30, 3, 38, g.fg); }
      withA(prog(t, k.notp.t, 0.2) * (1 - prog(t, k.pj.e + 0.5, 0.3)), () => mono("It's not Peter", L + 4, V(890, 900), 24, C.blue, 'left', { ls: 0.2 }));
    });
    beat(t, k.three.t - 0.1, 1e9, () => {
      IDX(t, [
        { n: '01', s: 'Convivial', tin: k.conv.w[1], tag: { t: k.main.w[7], s: 'The main word' } },
        { n: '02', s: 'Generative', tin: k.gen.w[1] },
        { n: '03', s: 'Toolbox', tin: k.tool.w[4], dim: k.tool.w[5] + 0.3, tag: { t: k.tool.w[5], s: 'I know this one', col: g.mid } },
        { n: '04', s: 'Front end of design', tin: k.fe.w[3] },
      ], { x: L, y: V(400, 540), w: V(1040, W - 2 * L), rowH: V(150, 82), size: V(84, 50), numW: V(110, 76), numSize: V(32, 26), subBelow: V(true, false), subDy: V(52, 0) });
      const late = t >= k.main.w[7]; zoomed(() => { box('convivial', k.conv.w[1], C.blue, late || t < k.gen.w[1] ? 1 : 0.35); if (!late) { box('generative', k.gen.w[1], C.blue, t < k.fe.w[3] ? 1 : 0.35); box('frontend', k.fe.w[3], C.blue); } });
    });
  }, { id: 'b2-title' });
  sPen(k.title.w[0], -4); sPen(k.title.w[1], -5); sWh(tA - 0.1, -8); sPen(tA + 0.1, -5); sPop(tB, -6); sWh(k.pj.e + 0.9, -9); sType(tA, s1.length, 22); sfx('type', tB, -3, { n: 5, d: 5 / 14 }); sType(tC, s3.length, cps3);
  sPop(k.conv.w[1], -3); sPen(k.conv.w[1] + 0.05, -6); sPop(k.gen.w[1], -3); sPen(k.gen.w[1] + 0.05, -6); sPop(k.fe.w[3], -3); sPen(k.fe.w[3] + 0.05, -6); sImp(k.main.w[7], -9);
  // what does convivial mean? a blank dictionary entry, then the dedication page
  addS(S(k.mean), 'ink', '// 20 — convivial', (t) => {
    beat(t, 0, k.ded.t - 0.1, () => {
      sent(t, { lines: V(['What does ~convivial~ mean?'], ['What does', '~convivial~', 'mean?']), y: V(330, 560), size: V(110, 120), times: k.mean.w });
      const p = landAt(t, k.mean.w[2], V(460, L), V(470, 900), { dy: 50 }); if (p.p > 0) withA(p.a, () => { const w = V(1000, W - 2 * L), h = 300; rect(p.x, p.y, w, h, C.card); txt('convivial', p.x + 60, p.y + 120, F.serifR(100), C.ink, 'left', 'alphabetic', -2, 'dict convivial'); mono('adj.', p.x + 60 + tw('convivial', F.serifR(100), -2) + 24, p.y + 120, 24, C.mid, 'left', { ls: 0.16 }); for (let i = 0; i < 2; i++) { ctx.save(); ctx.setLineDash([10, 10]); strokeR(p.x + 60, p.y + 170 + i * 56, w * (0.7 - i * 0.2), 26, C.dash, 2); ctx.restore(); } withA(prog(t, k.mean.w[3], 0.3), () => _txt('?', p.x + w - 60, p.y + 230, F.disp(120), C.blue, 'right')); });
    });
    beat(t, k.ded.t - 0.1, 1e9, () => {
      const p = sn(t, k.ded.t, 0.45);
      const x = V(460, L), y = V(250, 640) + 40 * (1 - p), w = V(1000, W - 2 * L), h = V(560, 600);
      // the page turns open (she checked it), then the dedication
      const tn = prog(t, k.chk.w[2], 0.6);
      withA(clamp(p * 2), () => grp('dedication card', x, y, w, h, () => {
        rect(x, y, w, h, C.card);
        mono('Dedicated to', x + 70, y + 100, 26, C.mid, 'left', { ls: 0.24 }); hline(x + 70, y + 130, w - 140, 1, C.line, 2);
        withA(prog(t, k.phil.w[3], 0.4), () => _txt('a philosopher:', x + 66, y + 210, F.serif(V(84, 70)), C.blue, 'left'));
        const nf = prog(t, k.ivan.t, 0.3) * (1 - prog(t, k.ivan.w[6] - 0.15, 0.15)); if (nf > 0) withA(nf, () => { ctx.save(); ctx.setLineDash([12, 10]); ctx.restore(); rect(x + 60, y + 290, V(560, 480), 120, MC('rgba(27,63,216,0.12)')); ctx.save(); ctx.setLineDash([12, 10]); strokeR(x + 60, y + 290, V(560, 480), 120, C.blue, 5); ctx.restore(); if (Math.floor(t * 2.2) % 2 === 0) rect(x + 80, y + 305, 5, 80, C.ink); });
        const n1 = 'Ivan'; typeText(t, k.ivan.w[6] - 0.1, n1, x + 66, y + 390, F.serifR(V(120, 100)), C.ink, { cps: 12, caretTo: k.ivan.w[7] + 0.4 });
        const ix = x + 66 + tw('Ivan ', F.serifR(V(120, 100)), 0);
        KT(t, { lines: ['~something.~'], font: 'serif', x: ix, y: y + 390, size: V(120, 100), times: [k.ivan.w[7] + 0.35], acc: C.blue, ul: true });
        withA(prog(t, k.ct.w[1], 0.3), () => mono('His idea: convivial tools', x + 70, y + V(500, 530), 32, C.ink, 'left', { ls: 0.18 }));
      }));
      if (tn > 0 && tn < 1) withT(x + w / 2, y + 40 * (1 - p), 1, 0, () => { const sx = Math.cos(Math.PI * E.inOutCubic(tn)); ctx.scale(sx, 1); rect(0, 0, w * 0.5, h, sx > 0 ? C.panel : C.card); strokeR(0, 0, w * 0.5, h, C.line, 2); });
    });
  }, { id: 'convivial' });
  sPen(k.mean.w[2] + 0.4, -6); sCard(k.mean.w[2]); sPop(k.mean.w[3], -3); sCard(k.ded.t); sPage(k.chk.w[2] + 0.3, -1); sTick(k.phil.w[3], -5); sfx('type', k.ivan.w[6] - 0.1, -3, { n: 4, d: 0.33 }); sPen(k.ivan.w[7] + 0.7, -4); sTick(k.his.w[1], -5);
  // tools that give power back: the knob of power slides from the expert to the person using the tool
  addS(S(k.power), 'paper', '// 20 — convivial', (t) => {
    KR(t, { lines: V(['Tools that give', '*power back*', 'to the person using them.'], ['Tools that give', '*power back*', 'to the person', 'using them.']), font: 'body', x: L, y: V(400, 620), size: V(90, 88), lh: 1.12, times: [k.power.t, k.power.w[3], k.power.w[5], k.power.w[6], k.power.w[7], ...k.power.w.slice(8, 13)] });
    const sp = prog(t, k.power.t, 0.4); if (sp <= 0) return;
    withA(sp, () => grp('power slider', L, V(830, 1200) - 120, W - 2 * L, 260, () => {
      const x = L + V(170, 110), y = V(850, 1230), w = W - 2 * L - V(340, 220); hline(x, y, w, 1, g.fg, 4);
      person(L + V(60, 40), y + 10, V(100, 80), C.ink); person(W - L - V(60, 40), y + 10, V(100, 80), C.blue);
      // power slides to the person; on "dependent on an expert" the expert pulls it back for a moment
      const k2 = lerp(x + w * 0.04, x + w * 0.96, E.inOutCubic(prog(t, k.power.w[8], 1.2)) * (1 - 0.7 * Math.sin(Math.PI * prog(t, k.exp.w[5], 1.4))));
      rect(k2 - 28, y - 28, 56, 56, C.blue);
    }));
  }, { id: 'power-back' });
  sWh(k.power.w[8] + 0.4, -6); sCard(k.power.t, -4); sWh(k.exp.w[5] + 0.5, -8); sWh(k.exp.w[5] + 1.2, -8); sClick(k.exp.e + 0.2, -6);
  // before a single page: my guess about the argument, and my thesis
  addS(S(k.before), 'ink', '// 20 — my guess', (t) => {
    const b1 = 'Before I read a single page';
    KR(t, { lines: [b1 + ':'], font: 'body', x: L, y: V(250, 470), size: V(54, 48), times: TM(k.before, 6), col: g.mid });
    // pages read: still zero (the callback)
    const zp = prog(t, k.before.t, 0.4) * (1 - prog(t, k.vibe.t - 0.3, 0.4)); if (zp > 0) withA(zp, () => { counter(t, k.before.t, 0.5, 0, 0, V(1440, L), V(330, 1300), F.disp(V(130, 120)), C.blueT, 'left', (n) => String(n).padStart(3, '0')); mono('Pages read', V(1450, L + 6), V(370, 1350), 20, C.inkMid, 'left', { ls: 0.2 }); });
    beat(t, 0, k.say.t - 0.12, () => {
      KR(t, { lines: ['I already know', 'the ~argument.~'], font: 'body', x: L, y: V(470, 690), size: V(120, 100), lh: 1.1, times: pick(k.before, [7, 8, 9, 10, 11]) });
      const gp = prog(t, k.guess.w[3], 0.35); if (gp > 0) withA(clamp(gp * 3), () => withT(V(L + 170, L + 160), V(800, 960), 1.5 - 0.5 * E.outCubic(gp), 0, () => { rect(-160, -44, 320, 76, C.paper); _txt('MY GUESS', 0, 9, F.mono(28, 500), C.ink, 'center', 'alphabetic', 5); }));
    });
    // the guess forming: typing dots, then the claim
    beat(t, k.say.t - 0.12, 1e9, () => {
      if (t < k.drt.t) { withA(prog(t, k.say.t, 0.3), () => { fillRR(L, V(420, 660), 240, 110, 26, C.inkLine); for (let i = 0; i < 3; i++) circle(L + 70 + i * 50, V(475, 715) + 8 * Math.sin(t * 9 - i * 0.9), 11, C.paper); }); }
      KR(t, { lines: V(['Design research tools', 'for *ordinary people,*', 'not just researchers.'], ['Design research', 'tools for', '*ordinary people,*', 'not just', 'researchers.']), x: L - 4, y: V(430, 640), size: V(110, 96), lh: 1.0, times: [...k.drt.w.slice(0, 3), k.drt.w[9], k.drt.w[10], k.drt.w[11], k.drt.w[13], k.drt.w[14], k.drt.w[15]] });
      // the cover, then a link to her thesis
      const cp = landAt(t, k.vibe.w[3], V(1500, L), V(400, 1150), { dy: 50, r: 0.1 }); if (cp.p > 0) withA(cp.a, () => imgCard(IMG.bookC, cp.x, cp.y, V(300, 190), { rot: -0.03 + cp.r, pad: 10, key: 'vibe cover' }));
      const tp = landAt(t, k.conn.w[3] - 0.2, V(1530, L + 420), V(900, 1280), { dy: 40 }); if (tp.p > 0) withA(tp.a, () => { const tw_ = V(240, 260); rect(tp.x, tp.y, tw_, 90, C.paper); mono('My thesis', tp.x + 26, tp.y + 56, 24, C.ink, 'left', { ls: 0.2 }); });
      const lp = E.outCubic(prog(t, k.conn.w[3], 0.6)); if (lp > 0) { if (!PORTRAIT) pline(1650, 840, 1650, 895, lp, C.blueT, 5); else pline(L + 200, 1325, L + 415, 1325, lp, C.blueT, 5); }
      withA(prog(t, k.even.w[3], 0.3), () => mono('— even if it weren’t', V(1540, L + 420), V(1010, 1410), 22, C.inkMid, 'left', { ls: 0.18 }));
    });
  }, { id: 'b2-guess' });
  sTick(k.before.t + 0.1, -4); sImp(k.guess.w[3] + 0.05, -8); sPop(k.say.t, -6); sPop(k.drt.w[10], -3); sCard(k.vibe.w[3]); sCard(k.conn.w[3] - 0.2, -2); sPen(k.conn.w[3], -3); sTick(k.even.w[3], -6);

  /* ---------- 19 · structure of book two: a bar of its three parts ---------- */
  const k2 = PS({ st: "now let's move on to the structure of the book", three: 'it has three parts', pcs: 'it has parts and then chapters and sub chapters', p1: 'part one is kind of like basics', up: 'the underlying principle', p2: 'and then we have part two cases from practice', p3: 'and then part three is how to use the tool', tt: 'the tools and the techniques', pg: 'also keep in mind the page number', e1: 'part one is about 80 pages', e2: 'part two is 50 pages', e3: 'and part three is over 140 pages', half: 'so more than half the book is the howto section', theory: 'even though it opens with the theory', prac: 'i already know that this is a very practical book', man: "it's pretty much a manual that is masquerading as a textbook", change: 'and that would change the way i read it', guess2: 'because now i have a guess', front: 'the theory that is at the front', back: 'the practical part at the back make sense', around: 'not the other way around' });
  const BAR = () => ({ x: L, y: V(880, 1300), w: W - 2 * L, h: V(90, 80) });
  addS(S(k2.st), 'ink', '// 21 — structure', (t) => {
    beat(t, 0, k2.p1.t - 0.12, () => {
      KR(t, { lines: V(['The structure:', '*three parts.*'], ['The', 'structure:', '*three parts.*']), x: L - 4, y: V(440, 640), size: V(150, 130), times: [k2.st.w[3], k2.st.w[6], k2.three.w[2], k2.three.w[3]] });
      // part -> chapters -> sub-chapters, a little tree
      const tx = V(1300, 300), ty = V(320, 960); const n = (x, y, w, tin, lab) => { const p = sn(t, tin, 0.35); if (p > 0) withA(clamp(p * 2), () => { rect(x, y, w, 50, C.inkPanel); strokeR(x, y, w, 50, C.paper, 2); if (lab) mono(lab, x + 16, y + 33, 18, C.paper, 'left', { ls: 0.14, fixed: true }); }); };
      n(tx, ty, V(200, 180), k2.pcs.w[2], 'Part');
      [0, 1].forEach(i => { pline(tx + 100, ty + 50, tx + 30 + i * 260 + 60, ty + 130, ease(t, k2.pcs.w[5], 0.4), C.inkMid, 2); n(tx + 30 + i * 260, ty + 130, V(180, 160), k2.pcs.w[5] + i * 0.1, 'Chapter'); });
      [0, 1, 2, 3].forEach(i => { pline(tx + 120 + Math.floor(i / 2) * 260, ty + 180, tx + i * 140 + 50, ty + 260, ease(t, k2.pcs.w[7], 0.4), C.inkMid, 2); n(tx + i * 140, ty + 260, V(110, 100), k2.pcs.w[7] + i * 0.08, 'Sub'); });
    });
    IDX(t, [
      { n: 'Part 1', s: 'Basics', tin: k2.p1.t, sub: 'The underlying principles' },
      { n: 'Part 2', s: 'Cases from practice', tin: k2.p2.w[5] },
      { n: 'Part 3', s: 'Tools & techniques', tin: k2.p3.w[3], sub: 'How to use the tools' },
    ], { x: L, y: V(380, 590), rowH: V(150, 190), size: V(96, 76), numW: V(190, 150), numSize: V(32, 28), subBelow: true, subDy: V(52, 48), ruleDy: V(82, 74), focus: (tt) => (tt >= k2.tt.t ? 2 : tt >= k2.p3.t ? 2 : tt >= k2.p2.t ? 1 : tt >= k2.p1.t ? 0 : -1) });
    const b = BAR(); bookBar(t, b.x, b.y, b.w, b.h, { tin: [k2.p1.t, k2.p2.w[5], k2.p3.w[3]], labels: ['Part 1', 'Part 2', 'Part 3'], hi: t >= k2.tt.t ? [2] : null });
    withA(prog(t, k2.tt.w[1], 0.3), () => mono('The tools and the techniques', W - L, b.y + b.h + 50, 24, C.blueT, 'right', { ls: 0.18 }));
  }, { id: 'b2-parts' });
  sPop(k2.three.w[3], -4); sPop(k2.pcs.w[2], -6); sPop(k2.pcs.w[5], -7); sPop(k2.pcs.w[7], -8); [k2.p1.t, k2.p2.w[5], k2.p3.w[3]].forEach(x => { sPop(x, -3); sWh(x + 0.2, -12); }); sTick(k2.up.w[1], -5); sPen(k2.tt.w[1], -5);
  // the page count: the same bar, now in proportion; counters roll to her numbers
  addS(S(k2.pg), 'paper', '// 21 — structure', (t) => {
    KR(t, { lines: V(['80 / 50 / *140+*'], ['80 / 50 /', '*140+*']), x: L - 6, y: V(470, 700), size: V(200, 170), times: [k2.e1.w[4], k2.e2.w[3], k2.e3.w[5]] });
    const b = BAR(); bookBar(t, b.x, V(700, 1060), b.w, V(130, 120), { split: ease(t, k2.e1.t, 1.2, E.inOutCubic), labels: V(['Part 1 · basics', 'Part 2 · cases', 'Part 3 · tools'], ['Part 1', 'Part 2', 'Part 3']), pages: [k2.e1.w[4] - 0.4, k2.e2.w[3] - 0.4, k2.e3.w[5] - 0.6], half: k2.half.w[2] });
  }, { id: 'page-count' });
  sWh(k2.e1.t + 0.4, -8); [k2.e1.w[4], k2.e2.w[3], k2.e3.w[5]].forEach(x => { sPop(x, -2); for (let i = 0; i < 5; i++) sTick(x - 0.4 + i * 0.14, -12); }); sPen(k2.half.w[2], -2); sPop(k2.half.w[2] + 0.6, -4);
  addS(S(k2.theory, 0.9), 'ink', '// 21 — structure', (t) => {
    KR(t, { lines: V(['Opens with theory.'], ['Opens with', 'theory.']), x: L - 4, y: V(400, 640), size: V(140, 140), col: g.mid, times: [k2.theory.w[3], k2.theory.w[4], k2.theory.w[6]] });
    KR(t, { lines: V(['*Very practical.*'], ['*Very*', '*practical.*']), x: L - 4, y: V(600, 960), size: V(180, 160), times: [k2.prac.w[7], k2.prac.w[7] + 0.18] });
    const b = BAR(); bookBar(t, b.x, V(780, 1180), b.w, V(110, 100), { split: 1, labels: ['Theory', '', 'Practice'], hi: t >= k2.prac.w[7] ? [1, 2] : [0] });
    wipe(t, k2.man.w[1] - 0.52, C.punch);
  }, { id: 'theory' });
  sWh(k2.theory.w[6], -9); sPop(k2.prac.w[7], -3); sRise(k2.man.w[4], -5); sWh(k2.man.w[1] - 0.25, -4);
  addS(k2.man.w[1] - 0.1, 'blue', '// 21 — structure', (t) => {
    KR(t, { lines: ['A manual'], x: L - 6, y: V(380, 690), size: V(250, 175), times: [k2.man.w[1] + 0.05, k2.man.w[1] + 0.2] });
    KT(t, { lines: ['~masquerading as~'], font: 'serif', x: L, y: V(610, 890), size: V(200, 150), acc: g.fg, times: [k2.man.w[7], k2.man.w[8]] });
    KR(t, { lines: V(['a textbook.'], ['a', 'textbook.']), x: L - 6, y: V(880, 1100), size: V(250, 165), times: [k2.man.w[9], k2.man.w[10]] });
  }, { id: 'manual', grid: true, push: 0.03 });
  sImp(k2.man.w[4], -1); sPen(k2.man.w[8] + 0.3, -4); sPop(k2.man.w[10], -4);
  addS(S(k2.change), 'paper', '// 21 — structure', (t) => {
    // the reading path: the eye runs across the book bar, then back
    const b = BAR(); bookBar(t, b.x, V(380, 640), b.w, V(70, 60), { split: 1, labels: ['At the front', '', 'At the back'], hi: [0, 2] });
    const rp = prog(t, k2.change.w[5], 1.4); if (rp > 0 && rp < 1) { const mx = b.x + b.w * E.inOutCubic(rp); rect(mx - 3, V(360, 620), 6, V(110, 100), C.ink); }
    const a = sn(t, k2.front.w[1], 0.4), bb = sn(t, k2.back.w[1], 0.4);
    if (a > 0) withA(clamp(a * 2), () => txt('THEORY', L - 6, V(650, 900) + 20 * (1 - a), F.disp(V(170, 150)), g.fg, 'left', 'alphabetic', V(170, 150) * LS.disp));
    const ap = E.outExpo(prog(t, k2.back.w[5], 0.5));
    if (!PORTRAIT) arrowR(820, 600, 1060, ap, C.blue, 6, 26);
    else if (ap > 0) { const ax = L + 40, y0 = 940, y1 = lerp(y0, 1040, ap); pline(ax, y0, ax, y1 - 2, 1, C.blue, 6); ctx.beginPath(); ctx.moveTo(ax, y1); ctx.lineTo(ax - 16, y1 - 26); ctx.lineTo(ax + 16, y1 - 26); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill(); }
    if (bb > 0) withA(clamp(bb * 2), () => txt('PRACTICE', V(1094, L - 6), V(650, 1200) + 20 * (1 - bb), F.disp(V(170, 150)), C.blue, 'left', 'alphabetic', V(170, 150) * LS.disp));
    const mg = prog(t, k2.guess2.w[3], 0.35); if (mg > 0) withA(clamp(mg * 3), () => withT(V(1640, 860), V(250, 470), 1.5 - 0.5 * E.outCubic(mg), 0, () => { rect(-140, -40, 280, 70, C.ink); _txt('MY GUESS', 0, 9, F.mono(26, 500), C.card, 'center', 'alphabetic', 5); }));
    withA(prog(t, k2.back.w[6], 0.3), () => mono('The theory is there to make the practice make sense', L, V(820, 1300), 28, g.fg, 'left', { ls: 0.16, maxW: V(undefined, 920) }));
    const ar = prog(t, k2.around.w[1], 0.3); if (ar > 0) withA(ar, () => { mono('— not the other way around', L, V(880, 1400), 28, g.mid, 'left', { ls: 0.16 }); strikeBar(L, V(870, 1390), monoW('— not the other way around', 28, { ls: 0.16 }), prog(t, k2.around.w[4], 0.35), C.blue, 6); });
  }, { id: 'theory-practice' });
  sWh(k2.change.w[5] + 0.5, -8); sPop(k2.guess2.w[3], -2); sCard(k2.front.w[1]); sPen(k2.back.w[5], -4); sCard(k2.back.w[1]); sPen(k2.around.w[4], -3);

  /* ---------- 20 · chapter one: who is creative? ---------- */
  const k3 = PS({ dive: 'so now if i dive deep into chapter one', intro: 'chapter one is the introduction', qs: 'there are some questions in the subheadings', who: 'who is creative', good: 'good question', dk: "i don't know", tell: "you're so creative", notme: "i sometimes don't think of myself as being creative", meet: 'there are people that i meet', ridic: 'this person is ridiculously creative', nice: 'this is a nice way to start', ex: 'to know exactly who is creative', why: 'why are people expressing a need for creativity now', biz: 'business and design are changing', inter: 'so really interesting questions', first: 'but the first question', like: 'i even like who is creative', intq: 'interesting that the first question', notab: "it's not about design research or what is generative research", claim: 'rests on a claim about ordinary people', every: 'that everybody is creative', nobody: 'or nobody is creative', select: 'or only a select people are creative', link: 'that is linking already back to the main word convivial', shelf: 'so now i have a shelf for this idea in my mind' });
  const subRows = () => [
    { n: '1.1', s: 'Who is creative?', tin: k3.who.t },
    { n: '1.2', s: 'Why are people expressing a need for creativity now?', tin: k3.why.t },
    { n: '1.3', s: 'Business and design are changing', tin: k3.biz.t },
  ];
  const subOpts = () => ({ x: L, y: V(560, 860), rowH: V(130, 185), size: V(58, 56), font: 'body', weight: 700, numW: V(110, 100) });
  // dive deep: part 1 of the bar zooms into chapter one's page
  addS(S(k3.dive), 'paper', '// 22 — book two · ch 01', (t) => {
    const b = BAR(); const z = E.inOutCubic(prog(t, k3.dive.w[4], 0.9)); const x0 = b.x, y0 = V(380, 560), w0 = b.w * 80 / 270 - 6, h0 = V(70, 60);
    const X = lerp(x0, V(1000, L), z), Y = lerp(y0, V(250, 1000), z), Wd = lerp(w0, V(810, W - 2 * L), z), Hd = lerp(h0, V(660, 430), z);
    if (z < 1) bookBar(t, b.x, y0, b.w, h0, { split: 1, hi: [0] });
    rect(X, Y, Wd, Hd, z > 0.5 ? C.card : C.stone); if (z > 0.5) { strokeR(X, Y, Wd, Hd, C.ink, 4); withA((z - 0.5) * 2, () => { mono('Part 1 · chapter 01', X + 40, Y + 60, 22, C.blue, 'left', { ls: 0.18, fixed: true }); hline(X + 40, Y + 86, Wd - 80, 1, C.line, 2); CONV_TOC.slice(0, 4).forEach(([k_, s_], r) => fitTxt(s_, X + (k_ === 'ch' ? 40 : 70), Y + 150 + r * (Hd - 190) / 4, F.body(k_ === 'ch' ? V(34, 30) : V(26, 22), k_ === 'ch' ? 700 : 500), k_ === 'ch' ? C.ink : C.mid, Wd - 110)); }); }
    withA(prog(t, k3.intro.w[3], 0.25), () => KR(t, { lines: V(['Chapter 01:', '*Introduction.*'], ['Chapter 01:', '*Introduction.*']), x: L - 4, y: V(330, 520), size: V(96, 96), times: [k3.intro.w[0], k3.intro.w[1], k3.intro.w[4]] }));
    withA(prog(t, k3.qs.w[3], 0.25), () => mono('Questions, in the sub-headings', L + 6, V(470, 760), 26, C.blue, 'left', { ls: 0.24 }));
    if (!PORTRAIT || t >= k3.qs.t) IDX(t, subRows(), { ...subOpts(), w: V(860, W - 2 * L) });
  }, { id: 'b2-ch1' });
  sWh(k3.dive.w[4] + 0.4, -4); sPage(k3.dive.w[4] + 0.7, -2); sPop(k3.intro.w[4], -3); sTick(k3.qs.w[3], -5); sPop(k3.who.t, -3);
  addS(S(k3.who, 0.05) + 0.9, 'paper', '// 22 — book two · ch 01', (t) => {
    sent(t, { lines: V(['Who is ~creative?~'], ['Who is', '~creative?~']), y: V(520, 820), size: V(190, 170), times: [k3.who.w[0], k3.who.w[1], k3.who.w[2]] });
    withA(prog(t, k3.good.t, 0.25), () => mono('Good question.', CX, V(740, 1200), 28, g.mid, 'center', { ls: 0.24 }));
    withA(prog(t, k3.dk.t, 0.25), () => mono("I don't know.", CX, V(800, 1260), 28, g.mid, 'center', { ls: 0.24 }));
  }, { id: 'who-creative', trans: 'whip' });
  sWh(S(k3.who, 0.05) + 0.9, -6); sPen(k3.who.w[2] + 0.5, -4);
  // what she says to people / about herself / about people she meets: bubbles + two meters
  addS(S(k3.tell, 0.8), 'ink', '// 22 — book two · ch 01', (t) => {
    const B = [['“Oh yeah, you’re so creative.”', k3.tell.t - 0.4, 'What I tell people', C.paper, C.ink], ['I sometimes don’t think of myself as creative.', k3.notme.w[2], 'What I think of me', C.inkLine, C.paper], ['“This person is ridiculously creative.”', k3.ridic.w[2], 'People I meet', C.blueT, C.ink]];
    B.forEach(([s, ti, lab, bg, fg], i) => { const p = landAt(t, ti, L, V(270 + i * 200, 480 + i * 230), { dy: 40, d: 0.45 }); if (p.p <= 0) return; withA(p.a, () => { bubble(p.x, p.y, V(1040, W - 2 * L), s, { size: V(54, 50), fit: true, bg, fg, key: 'creative ' + i }); }); });
    // how creative: me (low) vs people I meet (off the scale)
    const mx = V(1260, L), mw = V(540, W - 2 * L);
    const a = prog(t, k3.notme.w[2], 0.3), b = prog(t, k3.meet.w[3], 0.3);
    if (a > 0) withA(a, () => mono('Illustration', mx + mw, V(280, 1120), 18, g.mid, 'right', { ls: 0.18 }));
    if (a > 0) withA(a, () => meter(t, mx, V(330, 1180), mw, V(80, 70), 0.22 * ease(t, k3.notme.w[5], 0.8), { cells: 10, label: 'Me, in my head', key: 'meter me' }));
    if (b > 0) withA(b, () => { meter(t, mx, V(520, 1330), mw, V(80, 70), ease(t, k3.ridic.w[3], 0.9, E.outCubic), { cells: 10, label: 'People I meet', key: 'meter people' }); const pf = PORTRAIT ? 1 - prog(t, k3.ridic.w[2] - 0.3, 0.3) : 1; for (let i = 0; i < 5; i++) { const q = sn(t, k3.meet.w[3] + i * 0.08, 0.35) * pf; if (q > 0) withA(q, () => person(V(mx + 60 + i * 110, L + 60 + i * 150), V(790, 1075) + 20 * (1 - q), V(70, 60), i === 2 ? C.blueT : C.inkMid)); } });
    if (t >= k3.nice.t - 0.1) withA(ease(t, k3.nice.t - 0.1, 0.15), () => rect(-W, -H, 3 * W, 3 * H, C.ink));
    sent(t, { lines: V(['A nice way to start:', '~who is creative?~'], ['A nice way', 'to start:', '~who is creative?~']), y: V(470, 700), size: V(110, 100), times: [...pick(k3.nice, [3, 4, 5, 6, 6]), k3.nice.e + 0.2, k3.nice.e + 0.35, k3.nice.e + 0.5].slice(0, 5).concat([k3.ex.w[0] + 0.7, k3.ex.w[0] + 0.85, k3.ex.w[0] + 1.0]) });
    if (false) KT(t, { lines: ['A nice way to start: *who is creative?*'], font: 'body', x: L, y: 990, size: 46, times: [...pick(k3.nice, [3, 4, 5, 6, 6]), k3.nice.e + 0.2, k3.nice.e + 0.35, k3.nice.e + 0.5] });
  }, { id: 'quotes' });
  sPop(k3.tell.t - 0.35, -2); sPop(k3.notme.w[2] + 0.05, -2); sTick(k3.notme.w[5], -5); [0, 1, 2, 3, 4].forEach(i => sPop(k3.meet.w[3] + i * 0.08, -9)); sPop(k3.ridic.w[2] + 0.05, -2); sWh(k3.ridic.w[3] + 0.3, -6); sImp(k3.ridic.w[3] + 0.9, -12); sWh(k3.nice.t, -6); sPop(k3.ex.w[0] + 0.7, -3); sPen(k3.ex.w[0] + 1.4, -4);
  addS(S(k3.why, 1.3), 'paper', '// 22 — book two · ch 01', (t) => {
    [[k3.who.t, k3.who.t, 0], [k3.why.t - 0.1, k3.why.e, 1], [k3.biz.t - 0.1, k3.biz.e, 2]].forEach(([a, b, i]) => { if (i === 0) return; const so = subOpts(); const r = subRows()[i]; const lines = PORTRAIT && i === 1 ? 2 : 1; sweep(t, so.x + so.numW - 8, so.y + i * so.rowH - so.size * 0.95, Math.min(tw(r.s, F.body(so.size, 700)), V(1600, 820)) + 16, so.size * 1.3 * lines, a, b); });
    IDX(t, subRows().map((r, i) => ({ ...r, tin: i ? S(k3.why, 1.3) + 0.1 * i : r.tin })), { ...subOpts(), focus: (tt) => (tt >= k3.inter.t ? -1 : tt >= k3.biz.t ? 2 : tt >= k3.why.t ? 1 : 0) });
    withA(prog(t, k3.inter.w[2], 0.3), () => mono('Really interesting questions', L + 6, V(990, 1420), 26, C.blue, 'left', { ls: 0.2 }));
  }, { id: 'b2-ch1-more' });
  sPen(k3.why.t, -5); sPen(k3.biz.t, -5); sPop(k3.inter.w[2], -5);
  // not about design research: about ordinary people (a crowd: everybody / nobody / a select few)
  addS(S(k3.first), 'ink', '// 22 — book two · ch 01', (t) => {
    // the crowd: each figure takes the new state a few frames after its neighbour, with a small pop
    const crowd = (on) => { const cols = V(8, 7), rows = V(4, 4), cw = V(80, 120), x0 = V(1180, L + 40), y0 = V(390, 1010); for (let i = 0; i < cols * rows; i++) { const q = sn(t, k3.claim.t + 0.2 + i * 0.02, 0.35); if (q <= 0) continue; const c = i % cols, r = Math.floor(i / cols);
      const lag = (on.sel && on.sel(t).includes(i) ? on.sel(t).indexOf(i) * 0.1 : c * 0.035); const tt = t - lag; const h = on(i, tt); let pop = 0; for (let d = 0.033; d <= 0.27; d += 0.033) if (on(i, tt - d) !== h) { pop = Math.sin(Math.PI * d / 0.27); break; }
      withA(clamp(q * 2), () => withT(x0 + c * cw, y0 + r * V(120, 110) + 20 * (1 - q), 1 + 0.15 * pop, 0, () => person(0, 0, V(66, 76), h ? C.blueT : C.inkPerson))); } };
    beat(t, 0, k3.claim.t - 0.1, () => {
      KT(t, { lines: ['The first question', 'is *not* about…'], font: 'body', x: L, y: V(250, 470), size: V(64, 70), lh: 1.1, times: [k3.first.w[1], k3.first.w[2], k3.first.w[3], k3.notab.w[0], k3.notab.w[1], k3.notab.w[2]] });
      const n = prog(t, k3.notab.w[3], 0.3), m = prog(t, k3.notab.w[8], 0.3); const fs = V(110, 76), sy = V(38, 26);
      withA(n, () => { const y = V(500, 690); txt('DESIGN RESEARCH', L - 4, y, F.disp(fs), C.inkMid, 'left', 'alphabetic', fs * LS.disp); strikeBar(L, y - sy, tw('DESIGN RESEARCH', F.disp(fs), fs * LS.disp), prog(t, k3.notab.w[5], 0.3), C.blueT, V(12, 9)); });
      withA(m, () => { const y = V(640, 800); txt('GENERATIVE RESEARCH', L - 4, y, F.disp(fs), C.inkMid, 'left', 'alphabetic', fs * LS.disp); strikeBar(L, y - sy, tw('GENERATIVE RESEARCH', F.disp(fs), fs * LS.disp), prog(t, k3.notab.w[9] + 0.3, 0.3), C.blueT, V(12, 9)); });
      KR(t, { lines: V(["It's *who is creative.*"], ["It's *who is*", '*creative.*']), x: L - 4, y: V(850, 960), size: V(120, 110), times: [k3.notab.w[9] + 0.7, k3.notab.w[9] + 0.85, k3.notab.w[9] + 1.0, k3.notab.w[9] + 1.15] });
      // the sub-headings page: the first one is "who is creative?"
      const pcw = V(540, W - 2 * L), pch = V(560, 300); const pp = landAt(t, k3.first.t, V(1260, L), V(320, 1150), { dy: 50 }); if (pp.p > 0) withA(pp.a, () => { pageCard(pp.x, pp.y, pcw, pch, { label: 'Chapter 01 · sub-headings' }); ['Who is creative?', '', ''].forEach((s, i) => { const ry = pp.y + V(160, 150) + i * V(110, 55); if (i === 0) { rect(pp.x + 40, ry - 34, pcw - 80, 52, t >= k3.intq.w[3] ? C.blue : C.panel); txt(s, pp.x + 60, ry + 2, F.body(34, 700), t >= k3.intq.w[3] ? C.card : C.ink, 'left', 'alphabetic', 0, 'sub who'); const hp = prog(t, k3.like.w[2], 0.4); if (hp > 0) withA(clamp(hp * 3), () => withT(pp.x + pcw - 80, ry - 8, E.outBack(hp, 2.2), 0, () => { ctx.beginPath(); ctx.moveTo(0, 22); ctx.bezierCurveTo(-40, -6, -24, -38, 0, -18); ctx.bezierCurveTo(24, -38, 40, -6, 0, 22); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill(); })); handLine(pp.x + 60, ry + 22, 300, E.outCubic(prog(t, k3.intq.w[0], 0.6)), C.blue, 5, 7); } else rect(pp.x + 60, ry - 14, 340 - i * 60, 14, C.bar); }); });
    });
    beat(t, k3.claim.t - 0.1, 1e9, () => {
      KR(t, { lines: V(['*Ordinary*', '*people.*'], ['*Ordinary people.*']), x: L - 4, y: V(430, 610), size: V(150, 120), times: [k3.claim.w[5], k3.claim.w[6]] });
      IDX(t, [{ n: '01', s: 'Everybody is creative', tin: k3.every.w[1] }, { n: '02', s: 'Nobody is creative', tin: k3.nobody.w[1] }, { n: '03', s: 'Only a select few', tin: k3.select.w[3] }], { x: L, y: V(700, 720), w: V(960, W - 2 * L), rowH: V(110, 86), size: V(64, 52), numW: V(100, 80), focus: (tt) => (tt >= k3.select.w[3] ? 2 : tt >= k3.nobody.w[1] ? 1 : tt >= k3.every.w[1] ? 0 : -1) });
      const sel = [3, 12, 22]; const on = (i, tt) => (tt >= k3.select.w[3] ? sel.includes(i) : tt >= k3.nobody.w[1] ? false : tt >= k3.every.w[1]); on.sel = (tt) => (tt >= k3.select.w[3] - 0.05 ? sel : []); crowd(on);
    });
  }, { id: 'ordinary-people' });
  sCard(k3.first.t, -4); sPop(k3.like.w[2] + 0.1, -3); sPen(k3.intq.w[0], -5); sPop(k3.claim.t + 0.25, -6); sPen(k3.notab.w[5], -3); sPen(k3.notab.w[9] + 0.3, -3); sPop(k3.notab.w[9] + 0.7, -3); sImp(k3.claim.w[6], -8); for (let i = 0; i < 6; i++) sTick(k3.claim.w[5] + i * 0.08, -12); sWh(k3.every.w[1], -7); sWh(k3.nobody.w[1], -7); sWh(k3.select.w[3], -7);
  addS(S(k3.link), 'paper', '// 22 — book two · ch 01', (t) => {
    const a = sn(t, k3.link.w[2], 0.4), b = sn(t, k3.link.w[9], 0.4); const fs = V(110, 92);
    if (a > 0) withA(clamp(a * 2), () => txt('ORDINARY PEOPLE', L - 4, V(440, 640), F.disp(fs), g.fg, 'left', 'alphabetic', fs * LS.disp));
    if (b > 0) withA(clamp(b * 2), () => txt('CONVIVIAL', W - L, V(440, 900), F.disp(fs), C.blue, 'right', 'alphabetic', fs * LS.disp));
    const lp = E.outExpo(prog(t, k3.link.w[9] + 0.2, 0.7));
    if (!PORTRAIT) { const lx0 = L + tw('ORDINARY PEOPLE', F.disp(110), 110 * LS.disp) + 30, lx1 = 1810 - tw('CONVIVIAL', F.disp(110), 110 * LS.disp) - 30; handLine(lx0, 400, lx1 - lx0, lp, C.blue, 5, 3); }
    else pline(L + 200, 690, W - L - 200, 800, lp, C.blue, 5);
    // a shelf for this idea
    const sp = prog(t, k3.shelf.w[5], 0.5); if (sp > 0) {
      const sy = V(820, 1300); shelfPlank(L, sy, W - 2 * L, sp, null, { th: 12 });
      let x = L + 20; for (let i = 0; i < 9; i++) { const bw = 40 + 24 * hash(i + 300), bh = 140 + 60 * hash(i + 310); withA(ease(t, k3.shelf.w[5] + i * 0.04, 0.4), () => standSpine(x, sy - bh, bw, bh, [C.block2, C.stone, C.ink, C.panel][i % 4])); x += bw + 6; }
      const cp = E.outQuint(prog(t, k3.shelf.w[7], 0.6)); if (cp > 0) mb(t, k3.shelf.w[7], 0.6, (tt) => { const q = E.outQuint(prog(tt, k3.shelf.w[7], 0.6)); withA(clamp(q * 3), () => withT(lerp(V(1500, 800), x + 30, q), lerp(V(500, 700), sy - 175, q), 1, (1 - q) * 1.4, () => { rect(-36, -170, 72, 340, C.blue); withT(0, 0, 1, -Math.PI / 2, () => _txt('EVERYONE IS CREATIVE?', 0, 7, F.mono(17, 500), C.onBlue, 'center', 'alphabetic', 2)); })); });
    }
  }, { id: 'link-convivial' });
  sPen(k3.link.w[9] + 0.2, -3); sPop(k3.link.w[2], -4); sPop(k3.link.w[9], -3); sPen(k3.shelf.w[5], -5); sWh(k3.shelf.w[7] + 0.15, -6); sBook(k3.shelf.w[7] + 0.4, -2);

  /* ---------- 21 · chapter ten: bridging (a bridge builds as she reads the questions) ---------- */
  const k4 = PS({ skip: 'and if i skip to the last part of the book', br: 'bridging', q1: 'where are the gaps', q2: 'where and when does bridging happen', q3: 'who is bridging the gap', q4: 'what are the ways we can bridge the gap', hav: "i haven't read this book", talk: 'the gap that this author is talking about means', prob: 'there is a gap problem somewhere in this book', own: 'it matters enough that it gets its own chapter', meet: 'so when i meet the word gap in part one', att: 'i should pay attention to it', back: "i'm coming back to see it in the later chapter", cold: 'if i had read it cold without doing this', miss: 'i would have probably missed it', ch2: 'i would have seen the word gap in chapter two', much: "i wouldn't think so much of it" });
  const BR = () => ({ x: V(1050, L), y: V(720, 1260), w: V(760, W - 2 * L) });
  /** two cliffs and a gap; planks (0..4) bridge it; o.mark (time) highlights the gap; o.flag (time) a CH 10 flag */
  const bridge = (t, o) => { const b = BR(); const cw = b.w * 0.28, gx0 = b.x + cw, gx1 = b.x + b.w - cw; const fg = g === G.ink ? C.paper : C.ink;
    const ap = ease(t, o.tin, 0.5); if (ap <= 0) return; withA(ap, () => { rect(b.x, b.y, cw, V(120, 100), fg); rect(gx1, b.y, cw, V(120, 100), fg); rect(b.x, b.y + V(120, 100), b.w, 4, fg); });
    (o.planks || []).forEach((pt, i) => { const q = E.outQuint(prog(t, pt, 0.5)); if (q <= 0) return; const pw = (gx1 - gx0) / 4; const px = gx0 + i * pw; withA(clamp(q * 3), () => rect(px + 4, b.y - 26 - 180 * (1 - q), pw - 8, 26, g === G.ink ? C.blueT : C.blue)); });
    if (o.mark != null) { const q = prog(t, o.mark, 0.4); if (q > 0) withA(q, () => { const yy = b.y + V(60, 50); pline(gx0 + 10, yy, gx1 - 10, yy, 1, g === G.ink ? C.blueT : C.blue, 6); _txt('GAP', (gx0 + gx1) / 2, yy - 24, F.mono(V(30, 28), 500), g === G.ink ? C.blueT : C.blue, 'center', 'alphabetic', 6); }); }
    if (o.q != null) withA(prog(t, o.q, 0.3) * (1 - prog(t, o.mark == null ? 1e9 : o.mark - 0.2, 0.2)), () => _txt('?', (gx0 + gx1) / 2, b.y + V(110, 96), F.disp(V(110, 96)), fg, 'center'));
    if (o.flag != null) { const q = E.outBack(prog(t, o.flag, 0.5), 1.6); if (q > 0) { const fx = gx1 + cw * 0.5; rect(fx - 3, b.y - 160 * q, 6, 160 * q, fg); rect(fx + 3, b.y - 160 * q, 150, 60, C.blue); if (q > 0.8) _txt('CH 10', fx + 78, b.y - 160 * q + 40, F.mono(24, 500), C.onBlue, 'center', 'alphabetic', 4); } }
  };
  addS(S(k4.skip), 'ink', '// 23 — book two · ch 10', (t) => {
    // skip to the last part: a jump along the book bar
    const b = BAR(); const jp = prog(t, k4.skip.w[4], 0.9);
    withA(1 - prog(t, k4.br.t - 0.3, 0.3), () => { bookBar(t, b.x, V(560, 900), b.w, V(70, 60), { split: 1, labels: ['Part 1', 'Part 2', 'Part 3'], hi: t >= k4.skip.w[6] ? [2] : null }); if (jp > 0) { const x0 = b.x + 20, x1 = b.x + b.w - 60; const x = lerp(x0, x1, E.inOutCubic(jp)), y = V(520, 860) - 120 * Math.sin(Math.PI * jp); circle(x, y, 18, C.blueT); } });
    KT(t, { lines: ['The last part:', '~chapter 10.~'], font: 'body', x: L, y: V(240, 480), size: V(60, 64), lh: 1.0, times: [...pick(k4.skip, [5, 6, 7]), k4.skip.e + 0.4, k4.skip.e + 0.6] });
    KR(t, { lines: ['*Bridging.*'], x: L - 6, y: V(450, 720), size: V(180, 170), times: [k4.br.t] });
    IDX(t, [{ n: 'Q1', s: 'Where are the gaps?', tin: k4.q1.t }, { n: 'Q2', s: 'Where and when does bridging happen?', tin: k4.q2.t }, { n: 'Q3', s: 'Who is bridging the gap?', tin: k4.q3.t }, { n: 'Q4', s: 'What are the ways we can bridge the gap?', tin: k4.q4.t }], { x: L, y: V(590, 860), w: V(900, W - 2 * L), rowH: V(110, 84), size: V(42, 40), numW: V(100, 80), font: 'body', weight: 700 });
    bridge(t, { tin: k4.br.t, planks: [k4.q1.w[3], k4.q2.w[4], k4.q3.w[4], k4.q4.w[7]] });
  }, { id: 'bridging' });
  sWh(k4.skip.w[4] + 0.45, -4); sPop(k4.skip.w[4] + 0.9, -4); sImp(k4.br.t, -7); [k4.q1.w[3], k4.q2.w[4], k4.q3.w[4], k4.q4.w[7]].forEach(x => { sPop(x, -5); sBook(x + 0.2, -6); });
  addS(S(k4.hav), 'paper', '// 23 — book two · ch 10', (t) => {
    withA(prog(t, k4.talk.w[2], 0.3) * (1 - prog(t, k4.prob.t - 0.2, 0.3)), () => mono('What the gap means: I don’t know yet', L + 6, V(320, 560), 26, C.blue, 'left', { ls: 0.2, maxW: V(undefined, 920) }));
    KR(t, { lines: V(["There's a *gap*", 'problem.'], ["There's", 'a *gap*', 'problem.']), x: L - 6, y: V(500, 700), size: V(190, 180), times: [k4.prob.w[0], k4.prob.w[2], k4.prob.w[3], k4.prob.w[4]] });
    withA(prog(t, k4.own.w[7], 0.3), () => mono('It matters enough to get its own chapter', L + 6, V(860, 1100), 28, C.blue, 'left', { ls: 0.2, maxW: V(undefined, 920) }));
    beat(t, k4.talk.t - 0.2, k4.prob.t - 0.1, () => { const p = landAt(t, k4.talk.t - 0.2, L, V(400, 700), { dy: 40 }); if (p.p <= 0) return; withA(p.a, () => { const w = V(820, W - 2 * L), h = 250; rect(p.x, p.y, w, h, C.card); strokeR(p.x, p.y, w, h, C.ink, 4); txt('gap', p.x + 50, p.y + 110, F.serifR(96), C.ink, 'left', 'alphabetic', -1, 'dict gap'); mono('n.', p.x + 50 + tw('gap', F.serifR(96)) + 24, p.y + 110, 24, C.mid, 'left'); for (let i = 0; i < 2; i++) { ctx.save(); ctx.setLineDash([10, 10]); strokeR(p.x + 50, p.y + 150 + i * 50, w * (0.66 - i * 0.2), 24, C.dash, 2); ctx.restore(); } withA(prog(t, k4.talk.w[6], 0.3), () => _txt('?', p.x + w - 50, p.y + 200, F.disp(110), C.blue, 'right')); }); });
    if (!PORTRAIT) beat(t, k4.talk.w[4] - 0.1, k4.prob.t - 0.1, () => { const p = landAt(t, k4.talk.w[4] - 0.1, 990, 380, { dy: 50, r: 0.12 }); if (p.p > 0) withA(p.a, () => imgCard(IMG.bookC, p.x, p.y, 200, { rot: 0.05 + p.r, pad: 8, key: 'gap book' })); });
    bridge(t, { tin: k4.hav.t, q: k4.talk.w[2], mark: k4.prob.w[3], flag: k4.own.w[7] });
  }, { id: 'gap' });
  sCard(k4.hav.t, -4); sPop(k4.talk.w[2], -4); sCard(k4.talk.t - 0.2, -3); sCard(k4.talk.w[4], -5); sPop(k4.talk.w[6], -4); sImp(k4.prob.w[3], -8); sPen(k4.prob.w[3] + 0.05, -4); sPop(k4.own.w[7], -2); sWh(k4.own.w[7] + 0.1, -10);
  // the same page, read primed vs read cold: a reading line stops at "gap" or passes it
  const page = (t, x, y, lab, o) => grp('page ' + lab, x, y, 780, 600, () => {
    const w = 780, h = 600; rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
    mono(lab, x + 50, y + 70, 24, o.dim ? C.mid : C.blue, 'left', { ls: 0.2, fixed: true }); hline(x + 50, y + 96, w - 100, 1, C.line, 2);
    // one word on the page matters: "gap" (no invented book text)
    const f = F.body(84, 700), gw = tw('gap', f), gx = x + w / 2 - gw / 2, gy = y + h / 2 + 40;
    if (o.markT != null) marker(gx - 14, gy - 70, gw + 28, 96, prog(t, o.markT, 0.3), C.blue);
    const fade = o.fadeT != null ? 1 - 0.6 * prog(t, o.fadeT, 0.5) : 1;
    withA(fade, () => _txt('gap', gx, gy, f, o.markT != null && t >= o.markT + 0.1 ? C.card : C.ink, 'left'));
    // the reading line runs down the page; primed, it stops at the word
    if (o.readT != null) { const stop = o.markT != null; const u = clamp((t - o.readT) / 2.2); const y0 = y + 120, y1 = y + h - 50, yg = gy + 18; const yy = stop ? Math.min(yg, lerp(y0, y1, u)) : lerp(y0, y1, u); if (u > 0 && (stop || u < 1)) rect(x + 40, yy, w - 80, 5, o.dim ? C.mid : C.blue); }
    if (o.seenT != null) { const q = prog(t, o.seenT, 0.4); if (q > 0) rect(gx, gy + 16, gw * E.outCubic(q), 5, C.mid); }
    if (o.pulseT != null) { const q = Math.sin(Math.PI * clamp((t - o.pulseT) / 0.9)); if (q > 0) withA(q, () => strokeR(x - 10, y - 10, w + 20, h + 20, C.blue, 10)); }
    if (o.dim) { const q = prog(t, o.dim, 0.35); if (q > 0) withA(clamp(q * 3), () => withT(x + w - 150, y + h - 70, 1.4 - 0.4 * E.outCubic(q), -0.06, () => { rect(-120, -36, 240, 64, C.ink); _txt('MISSED IT', 0, 9, F.mono(24, 500), C.card, 'center', 'alphabetic', 4); })); }
    else if (o.markT != null) withA(prog(t, k4.att.w[2], 0.3), () => mono('Pay attention', x + w - 50, y + h - 40, 24, C.blue, 'right', { ls: 0.2, fixed: true }));
    if (o.backT != null) { const q = E.outBack(prog(t, o.backT, 0.5), 1.6); if (q > 0) { rect(x + w - 230, y - 40 * q, 190, 56, C.blue); if (q > 0.8) _txt('SEE CH 10', x + w - 135, y - 40 * q + 37, F.mono(22, 500), C.onBlue, 'center', 'alphabetic', 3); } }
  });
  addS(S(k4.meet), 'paper', '// 23 — book two · ch 10', (t) => {
    const a = sn(t, k4.meet.t, 0.45), b = sn(t, k4.cold.w[5] - 0.1, 0.45);
    const pg = (x, y, ...rest) => (PORTRAIT ? withT(x, y, 0.8, 0, () => page(t, 0, 0, ...rest)) : page(t, x, y, ...rest));
    if (a > 0) withA(clamp(a * 2), () => pg(V(L, 228), V(250, 380) + 40 * (1 - a), 'Part one · read after priming', { markT: k4.meet.w[6], readT: k4.meet.w[5] - 0.9, backT: k4.back.w[2], pulseT: t > k4.much.t ? k4.much.e + 0.3 : k4.att.w[2] }));
    if (b > 0) withA(clamp(b * 2) * (1 - 0.55 * prog(t, k4.much.w[3], 0.5)), () => pg(V(1030, 228), V(250, 880) + 40 * (1 - b), 'Part one · read cold', { readT: k4.cold.w[5], dim: k4.miss.w[4], fadeT: k4.much.w[3], seenT: k4.ch2.w[4] }));
    withA(prog(t, k4.ch2.t, 0.3), () => mono("I'd have seen the word — and not thought much of it", CX, V(960, 1410), 26, g.mid, 'center', { ls: 0.18, maxW: V(undefined, 920) }));
  }, { id: 'primed-cold' });
  sCard(k4.meet.t); sPen(k4.meet.w[6], -2); sPop(k4.back.w[2], -3); sCard(k4.cold.w[5] - 0.1); sWh(k4.cold.w[5] + 1.0, -12); sPop(k4.miss.w[4], -2); sTick(k4.much.w[3], -6); sPen(k4.ch2.w[4], -5); sWh(k4.att.w[2], -10);

  /* ---------- 22 · worth it ---------- */
  const k5 = PS({ great: 'so really great method to read', work: 'it feels like a lot of work', head: 'i have to read the headings first', less: 'but it takes less time than you think', few: 'a few minutes for a book', day: 'the day you pick the book', gt: 'just go through the chapters', mem: 'memorize the chapters if you can', over: "it's honestly not something that would overwhelm you", ant: 'that will raise your anticipation', exc: 'make you excited for reading about the book', shape: "because you've seen the shape", ask: "you're already asking questions", cur: "you're curious now", what: 'what is this person trying to say', build: 'so it builds up your anticipation' });
  addS(S(k5.great), 'paper', '// 24 — worth it', (t) => {
    // the to-do list that feels like a lot; then it is a few minutes
    const tx = V(1180, L), ty = V(250, 1000), tw_ = V(630, W - 2 * L), th = V(540, 420);
    const items = ['Read the contents', 'Read the headings', 'Read the sub-headings', 'Take a guess'];
    const shr = 1 - 0.32 * ease(t, k5.over.w[3], 0.7, E.inOutCubic); ctx.save(); ctx.translate(tx + tw_ / 2, ty + th / 2); ctx.scale(shr, shr); ctx.translate(-(tx + tw_ / 2), -(ty + th / 2));
    const lp = landAt(t, k5.work.w[3], tx, ty, { dy: 50 }); if (lp.p > 0) withA(lp.a, () => grp('to-do', lp.x, lp.y, tw_, th, () => { rect(lp.x, lp.y, tw_, th, C.card); strokeR(lp.x, lp.y, tw_, th, C.ink, 4); mono('To do', lp.x + 40, lp.y + 60, 22, C.mid, 'left', { ls: 0.2, fixed: true });
      items.forEach((s, i) => { const ti = i < 2 ? k5.work.w[4] + i * 0.25 : k5.head.w[4] + (i - 2) * 0.25; const q = prog(t, ti, 0.3); if (q <= 0) return; const ry = lp.y + V(130, 110) + i * V(95, 72); const done = prog(t, k5.gt.w[1] + i * 0.4, 0.3); withA(q, () => { checkbox(lp.x + 40, ry - 30, 40, done); txt(s, lp.x + 100, ry, F.body(V(38, 34), 600), C.ink, 'left', 'alphabetic', 0, 'todo ' + i); if (done > 0.5) strikeBar(lp.x + 100, ry - 12, tw(s, F.body(V(38, 34), 600)), prog(t, k5.gt.w[1] + i * 0.4 + 0.1, 0.3), C.blue, 5); }); }); }));
    ctx.restore();
    beat(t, 0, k5.work.t - 0.1, () => { KR(t, { lines: V(['Really ~great~', 'method.'], ['Really ~great~', 'method.']), font: 'body', x: L, y: V(450, 600), size: V(150, 130), lh: 1.05, times: [k5.great.w[1], k5.great.w[2], k5.great.w[3]] }); withA(prog(t, k5.great.e + 0.4, 0.3), () => mono('If you ask me', L + 6, V(720, 820), 28, g.mid, 'left', { ls: 0.24 })); });
    beat(t, k5.work.t - 0.1, k5.less.t - 0.1, () => {
      KR(t, { lines: V(['It feels like', 'a lot of *work.*'], ['It feels', 'like a lot', 'of *work.*']), x: L - 6, y: V(560, 650), size: V(170, 140), times: k5.work.w });
    });
    beat(t, k5.less.t - 0.1, 1e9, () => {
      KT(t, { lines: V(['A few ~minutes~', 'for a book.'], ['A few ~minutes~', 'for a book.']), font: 'body', x: L, y: V(560, 640), size: V(140, 120), lh: 1.05, times: k5.few.w });
      // a dial: a small wedge of time
      const cp = prog(t, k5.few.w[2], 1.2); if (cp > 0) { const cx = V(L + 120, W - L - 110), cy = V(860, 840), r = V(90, 80); withA(clamp(cp * 3), () => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r - 14, -Math.PI / 2, -Math.PI / 2 + 0.85 * E.outCubic(cp)); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill(); }); }
      const dn = prog(t, k5.over.w[7], 0.4); if (dn > 0) withA(clamp(dn * 3), () => withT(V(1180 + 520, W - L - 150), V(250 + 470, 1000 + 330), 1.5 - 0.5 * E.outCubic(dn), 0, () => { rect(-120, -46, 240, 80, C.blue); _txt('DONE', 0, 12, F.mono(34, 500), C.card, 'center', 'alphabetic', 8); }));
    });
  }, { id: 'worth-it' });
  sPen(k5.great.w[2] + 0.5, -4); sTick(k5.great.e + 0.4, -6); sCard(k5.work.w[3]); sPop(k5.work.w[4], -6); sPop(k5.work.w[4] + 0.25, -6); sPop(k5.head.w[4], -6); sPop(k5.head.w[4] + 0.25, -6); sImp(k5.work.w[3] + 0.1, -12); sWh(k5.less.t - 0.1, -8); sPen(k5.few.w[2] + 0.5, -3); sTick(k5.few.w[2], -4); sTick(k5.day.w[1] + 0.05, -6); sImp(k5.over.w[7] + 0.05, -10); sWh(k5.over.w[3] + 0.35, -8); [0, 1, 2, 3].forEach(i => { sClick(k5.gt.w[1] + i * 0.4, -4); }); sPop(k5.over.w[6], -4);
  addS(S(k5.ant, 1.2), 'ink', '// 24 — worth it', (t) => {
    KR(t, { lines: ['It raises your', '*anticipation.*'], x: L - 4, y: V(330, 560), size: V(150, 110), times: [k5.ant.w[1], k5.ant.w[2], k5.ant.w[3], k5.ant.w[4]] });
    const f = 0.12 + 0.3 * E.outCubic(prog(t, k5.ant.w[4], 0.8)) + 0.15 * E.outCubic(prog(t, k5.exc.w[2], 0.6)) + 0.13 * E.outCubic(prog(t, k5.shape.w[3], 0.6)) + 0.1 * E.outCubic(prog(t, k5.ask.w[3], 0.6)) + 0.1 * E.outCubic(prog(t, k5.cur.w[1], 0.6)) + 0.1 * E.outCubic(prog(t, k5.build.w[3], 0.6));
    const foot = t >= k5.cur.w[1] ? "You're curious now" : t >= k5.ask.w[2] ? "You're already asking questions" : t >= k5.shape.w[3] ? "You've seen the shape" : t >= k5.exc.w[1] ? 'Excited to read it' : '';
    meter(t, L, V(560, 820), W - 2 * L, V(110, 120), f, { cells: V(18, 12), label: 'Anticipation · illustration', foot });
    // questions you're already asking: they pop up
    for (let i = 0; i < 7; i++) { const ti = k5.ask.w[3] + i * 0.18; const q = prog(t, ti, 0.4); if (q <= 0) continue; const x = V(1000 + 120 * i, L + 30 + 130 * i), y = V(850, 1180); withA(clamp(q * 3), () => _txt('?', x, y + 30 * (1 - E.outBack(q, 2)), F.disp(V(110, 100)), i === 6 ? C.blueT : C.inkMid, 'center')); }
    KT(t, { lines: V(['“What is this person ~trying to say?~”'], ['“What is this person', '~trying to say?~”']), font: 'body', x: L, y: V(990, 1330), size: V(52, 56), times: TM(k5.what, 7) });
  }, { id: 'anticipation' });
  [k5.ant.w[4], k5.exc.w[2], k5.shape.w[3], k5.cur.w[1], k5.build.w[3]].forEach(x => sTick(x, -3)); for (let i = 0; i < 7; i += 2) sPop(k5.ask.w[3] + i * 0.18, -7); sImp(k5.ant.w[4], -10);

  /* ---------- 23 · recap ---------- */
  const k6 = PS({ nf: 'for nonfiction books this method is just a nobrainer for me now', use: 'i just use it for nonfiction books', want: 'and i want to read nonfiction books', bef: 'so yeah before reading that book', cont: 'go over the content', sub: 'go over the subheadings the headings the chapters', guess: 'take a guess about what the argument of the book is about', tt: 'i prefer the tiktok version of just memorizing it', force: 'when i force myself to memorize the headings the chapters', sticks: 'it just sticks for me', more: 'memorizing actually sticks for me more' });
  addS(S(k6.nf), 'blue', '// 25 — recap', (t) => {
    KR(t, { lines: ['Non-fiction:', 'a no-brainer.'], x: L - 6, y: V(420, 760), size: V(220, 125), lh: 0.95, times: [k6.nf.w[1], k6.nf.w[7], k6.nf.w[8]] });
    // a big check draws on
    const cp = prog(t, k6.nf.w[8] + 0.3, 0.6); if (cp > 0) { const cx = V(1600, 600), cy = V(830, 1120), s = V(120, 130); ctx.save(); ctx.strokeStyle = C.onBlue; ctx.lineWidth = s * 0.22; ctx.lineCap = 'square'; ctx.beginPath(); const p = E.outCubic(cp); ctx.moveTo(cx - s, cy); const mx = cx - s * 0.35, my = cy + s * 0.65; if (p < 0.4) ctx.lineTo(lerp(cx - s, mx, p / 0.4), lerp(cy, my, p / 0.4)); else { ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, cx + s, (p - 0.4) / 0.6), lerp(my, cy - s * 0.9, (p - 0.4) / 0.6)); } ctx.stroke(); ctx.restore(); }
    KR(t, { lines: V(['I use it for every non-fiction book.'], ['I use it for every', 'non-fiction book.']), font: 'body', x: L, y: V(940, 1330), size: V(52, 52), times: TM(k6.use, 7).slice(0, 7) });
  }, { id: 'no-brainer', grid: true, push: 0.03 });
  sImp(k6.nf.w[8], -3); sPen(k6.nf.w[8] + 0.3, 0); sTick(k6.use.w[3], -6); 
  addS(S(k6.bef), 'paper', '// 25 — recap', (t) => {
    KR(t, { lines: ['Before reading the book:'], font: 'body', x: L, y: V(260, 470), size: V(84, 72), times: k6.bef.w.slice(2, 6) });
    const rows = [{ n: '01', s: 'Go over the contents', tin: k6.cont.w[3] }, { n: '02', s: V('The sub-headings & headings', 'Sub-headings'), tin: k6.sub.w[3] }, { n: '03', s: 'The chapters', tin: k6.sub.w[7] }, { n: '04', s: V('Take a guess at the argument', 'Take a guess'), tin: k6.guess.w[1] }];
    IDX(t, rows, { x: L, y: V(420, 600), w: V(1700, W - 2 * L), rowH: V(150, 120), size: V(84, 58), numW: V(120, 90), ghost: true });
    // a contents page, ticked step by step
    rows.forEach((r, i) => { const on = prog(t, r.tin + 0.35, 0.35); if (on > 0) checkbox(V(1640, W - L - 60), V(420, 600) + i * V(150, 120) - V(62, 56), V(60, 56), on, C.blue); });
  }, { id: 'recap' });
  [k6.cont.w[3], k6.sub.w[3], k6.sub.w[7], k6.guess.w[1]].forEach(x => { sPop(x, -4); sClick(x + 0.15, -5); });
  addS(S(k6.tt), 'ink', '// 25 — recap', (t) => {
    KR(t, { lines: ['*Memorise*', '*it.*'], x: L - 6, y: V(470, 680), size: V(180, 170), times: [k6.tt.w[7], k6.tt.w[8]] });
    KT(t, { lines: ['It ~sticks.~'], font: 'body', x: L, y: V(860, 1000), size: V(110, 100), times: [k6.sticks.w[0], k6.sticks.w[2]] });
    // a flashcard: the headings are covered, then recalled one by one; a sticky note lands on "sticks"
    const fx = V(1180, 560), fy = V(240, 1080), fw = V(620, 440), fh = V(620, 340); const lp = ease(t, k6.tt.t, 0.5);
    if (lp > 0) withA(lp, () => { rect(fx, fy, fw, fh, C.card); mono('Headings · from memory', fx + 40, fy + 60, 20, C.mid, 'left', { ls: 0.18, fixed: true });
      for (let i = 0; i < 6; i++) { const ry = fy + V(120, 100) + i * V(80, 38); const rv = prog(t, k6.force.w[5] + i * 0.25, 0.3); fitTxt(BARATTA[i], fx + 40, ry + V(20, 16), F.body(V(22, 17), 600), C.ink, fw - 80); if (rv <= 0.5) withA(1 - rv * 2, () => rect(fx + 36, ry - 8, fw - 80, V(38, 30), C.blueT)); } });
    const sp = prog(t, k6.sticks.w[2] - 0.05, 0.3); if (sp > 0) withA(clamp(sp * 3), () => withT(fx + fw - V(80, 60), fy + V(60, 40), 1.4 - 0.4 * E.outCubic(sp), 0, () => { rect(-110, -70, 220, 140, C.blue); _txt('STICKS', 0, 12, F.mono(30, 500), C.card, 'center', 'alphabetic', 5); }));
  }, { id: 'memorise-it' });
  sImp(k6.tt.w[7], -8); for (let i = 0; i < 6; i += 2) sTick(k6.force.w[5] + i * 0.25, -6); sPop(k6.sticks.w[2], 0); sPen(k6.sticks.w[2] + 0.4, -5);

  /* ---------- 24 · fiction ---------- */
  const k7 = PS({ fic: "and for fiction i don't think you should be doing this for fiction", idk: "i don't know", fme: 'fiction for me is just', pt: 'at the point of reading a novel', novel: 'is not knowing what is coming next', toc: "so i don't even think that fiction has a table of contents", does: 'oh fiction does actually', noP: "but really there's no point in doing that for fiction" });
  addS(S(k7.fic), 'paper', '// 26 — fiction?', (t) => {
    // her real Miss Marple copy
    const bx = V(L + 20, 600), by = V(200, 400), bw = V(460, 400); const bp = landAt(t, k7.fic.w[2], bx, by, { dy: 60, r: -0.1 });
    if (bp.p > 0) withA(bp.a, () => { imgCard(IMG.marple, bp.x, bp.y, bw, { rot: -0.03 + bp.r, pad: 14, key: 'marple cover' });
      const np = prog(t, k7.noP.w[2], 0.35); if (np > 0) withA(clamp(np * 3), () => withT(bp.x + bw / 2, bp.y + bw * 0.9, 1.5 - 0.5 * E.outCubic(np), 0, () => { rect(-170, -46, 340, 92, C.ink); _txt('NOT FOR ME', 0, 12, F.mono(34, 500), C.card, 'center', 'alphabetic', 6); })); });
    const x2 = V(720, L);
    beat(t, 0, k7.fme.t - 0.1, () => { KR(t, { lines: ['Not for', 'fiction.'], x: x2, y: V(500, 1160), size: V(200, 150), times: [k7.fic.w[4], k7.fic.w[11], k7.fic.w[12]] }); withA(prog(t, k7.idk.w[1], 0.3), () => mono("I don't know —", x2 + 4, V(800, 1420), 26, g.mid, 'left', { ls: 0.2 })); });
    beat(t, k7.fme.t - 0.1, k7.toc.t - 0.1, () => {
      withA(prog(t, k7.fme.t, 0.3), () => mono('Fiction, for me:', x2 + 4, V(300, 980), 28, g.mid, 'left', { ls: 0.24 }));
      KT(t, { lines: ['The point of a novel', 'is ~not knowing~', 'what comes next.'], font: 'body', x: x2, y: V(400, 1180), size: V(80, 66), lh: 1.15, times: [k7.pt.w[1], k7.pt.w[2], k7.pt.w[3], k7.pt.w[5] + 0.1, k7.pt.w[6], ...k7.novel.w.slice(0, 3), k7.novel.w[3], k7.novel.w[5], k7.novel.w[6]] });
      // the next page turns over: a question mark behind it
      const pp = prog(t, k7.novel.w[4], 0.8); const px = V(1300, 640), py = V(640, 1220), pw = V(340, 300), ph = V(260, 200);
      withA(ease(t, k7.novel.t - 0.6, 0.4), () => { rect(px, py, pw, ph, C.card); strokeR(px, py, pw, ph, C.ink, 3); withA(prog(t, k7.novel.w[4] + 0.4, 0.3), () => _txt('?', px + pw / 2, py + ph * 0.75, F.disp(ph * 0.7), C.blue, 'center')); if (pp < 1) withT(px, py, 1, 0, () => { ctx.scale(Math.cos(Math.PI * E.inOutCubic(pp)), 1); rect(0, 0, pw, ph, C.panel); strokeR(0, 0, pw, ph, C.ink, 3); for (let r = 0; r < 4; r++) rect(26, 40 + r * 44, pw - 70, 10, C.stone); }); });
    });
    beat(t, k7.toc.t - 0.1, 1e9, () => {
      withA(prog(t, k7.toc.w[8], 0.3), () => mono('Has a contents page?', x2, V(330, 1110), 30, g.mid, 'left', { ls: 0.24 }));
      const ex = prog(t, k7.does.w[2], 0.25); const qy = V(800, 1420), qs = V(460, 300);
      if (ex <= 0) KR(t, { lines: ['?'], x: x2 - 10, y: qy, size: qs, times: [k7.toc.w[9]] });
      else KR(t, { lines: ['!'], x: x2 - 10, y: qy, size: qs, times: [k7.does.w[2]], col: C.orange });
      withA(prog(t, k7.does.w[2] + 0.2, 0.3), () => mono('Oh. Fiction does, actually.', x2 + V(260, 220), V(700, 1270), 30, g.fg, 'left', { ls: 0.2, maxW: V(undefined, 600) }));
      withA(prog(t, k7.noP.w[4], 0.3), () => mono('Still no point, for me.', x2 + V(260, 220), V(760, 1370), 30, g.mid, 'left', { ls: 0.2, maxW: V(undefined, 600) }));
    });
  }, { id: 'fiction' });
  sCard(k7.fic.w[2]); sTick(k7.idk.w[1], -6); sWh(k7.fme.t - 0.05, -9); sPage(k7.novel.w[4] + 0.2, -1); sPop(k7.novel.w[4] + 0.5, -4); sPop(k7.toc.w[9], -3); sImp(k7.does.w[2], -7); sPop(k7.noP.w[2], -1);

  /* ---------- 25 · the method, comments, end card ---------- */
  const k8 = PS({ basic: "basically that's the method", rs: 'read the structure', rh: 'read the headings', rc: 'read the chapters before you start reading the book', tg: 'take a guess about what the argument of the book is about', see: 'so yeah see you in my next video', com: 'tell me in the comments what is in your current reading stack', already: 'if you already do something like this', know: 'let me know how it goes for you', bye: 'bye' });
  addS(S(k8.basic), 'blue', '// 27 — the method', (t) => {
    KR(t, { lines: ["That's the method:"], font: 'body', x: L, y: V(270, 520), size: V(84, 72), times: k8.basic.w.slice(0, 3) });
    const rows = [{ n: '01', s: 'Read the structure', tin: k8.rs.t }, { n: '02', s: 'Headings & chapters', tin: k8.rh.t }, { n: '03', s: 'Take a guess', tin: k8.tg.t }, { n: '04', s: 'Then read the book', tin: k8.rc.w[5] + 0.1 }];
    IDX(t, rows, { x: L, y: V(400, 680), rowH: V(150, 178), size: V(110, 72), numW: V(125, 100), ruleCol: 'rgba(241,244,255,0.3)' });
    rows.forEach((r, i) => { const ck = prog(t, r.tin + 0.35, 0.35); if (ck > 0) checkboxT(W - L - V(70, 56), V(400, 680) + i * V(150, 178) - V(70, 56), V(70, 56), ck, C.onBlue, C.blue); });
  }, { id: 'the-method', grid: true });
  [k8.rs.t, k8.rh.t, k8.rc.w[5] + 0.1, k8.tg.t].forEach(x => { sPop(x, -3); sClick(x + 0.4, -4); });
  addS(S(k8.see), 'ink', '// 28 — your turn', (t) => {
    beat(t, 0, k8.com.w[5] - 0.12, () => KT(t, { lines: ['See you in my', '~next video.~'], font: 'body', x: L, y: V(330, 560), size: V(110, 100), lh: 1.1, times: [...pick(k8.see, [2, 3, 4, 5]), k8.see.w[6], k8.see.w[6] + 0.1] }));
    KR(t, { lines: V(["What's in *your*", 'reading stack?'], ["What's in", '*your* reading', 'stack?']), x: L - 6, y: V(300, 500), size: V(120, 110), times: pick(k8.com, [5, 7, 8, 10, 11]) });
    // her stack again, with an empty slot on top: yours
    const sx = V(1110, 300), syb = V(520, 1430), sw = V(700, 680); const sp = ease(t, k8.com.w[3], 0.4);
    if (sp > 0) withA(sp, () => { const r = realStack(t, sx, syb, sw, {}); const yp = prog(t, k8.com.w[8], 0.5); if (yp > 0) { const yy = r.top - 60 - 160 * (1 - E.outQuint(yp)); ctx.save(); ctx.setLineDash([12, 10]); strokeR(sx + 60, yy, sw - 120, 56, C.blueT, 3); ctx.restore(); withA(clamp(yp * 3), () => mono('Yours?', sx + sw / 2, yy + 38, 24, C.blueT, 'center', { ls: 0.24 })); } });
    const p = sn(t, k8.com.w[3], 0.45); if (p <= 0) return;
    const x = L, y = V(600, 790) + 40 * (1 - p), w = W - 2 * L, h = V(330, 400);
    const inp = V([x + 160, y + 140, w - 450, 84], [x + 50, y + 130, w - 100, 84]), btn = V([x + w - 250, y + 140], [x + w - 250, y + 244]);
    withA(clamp(p * 2), () => grp('comment box', x, y, w, h, () => {
      rect(x, y, w, h, C.card); mono('Comments', x + 50, y + 70, 24, C.mid, 'left', { ls: 0.24 }); hline(x + 50, y + 96, w - 100, 1, C.line, 2);
      if (!PORTRAIT) circle(x + 90, y + 180, 40, C.panel);
      rect(...inp, C.card); strokeR(...inp, C.ink, 3);
      typeText(t, k8.com.w[8], 'My current reading stack is…', inp[0] + 30, inp[1] + 56, F.body(38, 500), C.ink, { cps: 18, caretTo: k8.bye.t });
      const sent_ = t >= k8.know.w[2]; rect(btn[0], btn[1], 200, 84, sent_ ? C.panel : C.ink); _txt(sent_ ? 'SENT ✓' : 'COMMENT', btn[0] + 100, btn[1] + 53, F.mono(24, 500), sent_ ? C.ink : C.card, 'center', 'alphabetic', 24 * 0.12);
      withA(prog(t, k8.already.w[2], 0.3), () => mono('Already do something like this? Let me know how it goes.', V(x + 160, x + 50), V(y + 285, y + 370), 22, C.mid, 'left', { ls: 0.14, maxW: V(undefined, w - 100) }));
    }));
    const by0 = V(600, 790), cx = V(W - L - 150, x + w - 150), cy = V(600 + 180 + 10, by0 + 244 + 50);
    cursorAt(t, [[k8.know.t - 0.8, V(1700, 900), V(1040, 1480)], [k8.know.w[2] - 0.05, cx, cy], [k8.bye.t + 0.3, cx, cy]], [k8.know.w[2]]);
  }, { id: 'your-turn' });
  sCard(k8.com.w[3]); sWh(k8.com.w[8] + 0.1, -6); sPop(k8.com.w[8] + 0.4, -3); sType(k8.com.w[8], 28, 18); sClick(k8.know.w[2]);
  const END = k8.bye.e + 0.5;
  addS(END, 'paper', '// 29 — end', (t) => {
    const t0 = END;
    KR(t, { lines: V(['How to read'], ['How to', 'read']), x: L - 4, y: V(400, 640), size: V(250, 230), times: [t0 + 0.1, t0 + 0.25, t0 + 0.4] });
    KR(t, { lines: V(['and actually ~remember it.~'], ['and actually', '~remember it.~']), font: 'body', x: L + 4, y: V(590, 1040), size: V(104, 100), times: [t0 + 0.7, t0 + 0.8, t0 + 1.0, t0 + 1.0] });
    if (!PORTRAIT) withA(prog(t, t0 + 1.6, 0.3), () => mono('See you in the next one', L + 6, 960, 26, g.mid, 'left', { ls: 0.24 }));
    realStack(t, V(980, L + 10), V(970, 1440), V(830, 900), { drops: { convivial: t0 + 0.5, baratta: t0 + 0.75, marple: t0 + 1.0 } });
  }, { id: 'end', push: 0.012 });
  sWh(END + 0.2, -6); [0.5, 0.75, 1.0].forEach((d, i) => sBook(END + d + 0.15, -2 - i)); sPen(END + 1.4, -3);
}

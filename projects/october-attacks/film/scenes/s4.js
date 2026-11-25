/* Part 4: OpenCode, the pattern + what to do, eMudhra, AI on both sides (4:28 - end). */
'use strict';
function part4() {
  /* ---------- 34. OpenCode: found out from their bills ---------- */
  const k1 = { oc: Q('The OpenCode one is also very, very interesting', 267), found: P('because people found out OpenCode had been hacked from their bills'), is: P('OpenCode is an open source AI coding tool') };
  addScene(k1.oc.t - 0.1, 'bone', 'bills', (t, lt) => {
    dayFrame(t, k1.oc.t - 0.1, 19); dayHead(t, k1.oc.t - 0.1, 19, 'MON', { name: 'OpenCode' });
    // a usage chart, flat for weeks, then a spike nobody ran (no numbers: the shape only)
    const cx = V(980, L), cy = V(250, 640), cw = V(830, W - 2 * L), ch = V(420, 380), n = 18;
    withA(ez(t, k1.oc.t - 0.3, 0.4), () => { lab('your AI usage', cx, cy - 26, 32, A.midB); hline(cx, cy + ch, cw, 1, A.ink, 3);
      for (let i = 0; i < n; i++) { const spike = i >= n - 3; const at = spike ? k1.found.w[7] + (i - n + 3) * 0.15 : k1.oc.t - 0.2 + i * 0.12; const p = ez(t, at, spike ? 0.5 : 0.3);
        const hh = spike ? ch * (0.55 + 0.2 * (i - n + 3)) : ch * (0.06 + 0.06 * hash(i)); const bw = cw / n - 8; rect(cx + i * (cw / n) + 4, cy + ch - hh * p, bw, hh * p, spike ? A.orange : A.ink); } });
    KT(t, { lines: V(['found out', 'from their *bills*'], ['found out from', 'their *bills*']), x: L, y: V(420, 1180), size: V(110, 96), times: [k1.found.w[2], k1.found.w[3], k1.found.w[8], k1.found.w[9], k1.found.w[10]], col: A.ink, acc: A.orangeT });
    withA(ez(t, k1.is.w[2], 0.4), () => body('OpenCode: an open-source AI coding tool', L, V(700, 1380), V(48, 42), A.ink, V(800, W - 2 * L), { key: 'what opencode is' }));
  }, { id: 'bills' });
  cue('tick', k1.oc.t - 0.1, -6); cue('error', k1.found.w[7], -6); cue('pop', k1.is.w[2], -6);

  /* ---------- 35. the Console: AI API keys, taken ---------- */
  const k2 = { con: P('It has an online platform called OpenCode Console where people store their AI API keys'), brk: P('Now OpenCode said attackers broke into an older system and took those keys') };
  const tTook = k2.brk.w[10];   // "took"
  addScene(k2.con.t - 0.1, 'night', 'console', (t) => {
    KT(t, { lines: V(['where people store', 'their *AI API keys*'], ['where people store', 'their *AI API keys*']), font: 'body', x: L, y: V(200, 480), size: V(74, 66), times: k2.con.w.slice(8, 15), col: A.bone, acc: A.orange });
    // a key cabinet labelled Console: five AI keys hang; attackers come in through an old side door and take them
    const cx = V(L, 70), cy = V(330, 640), cw = V(1100, 940), ch = V(560, 520);
    withA(ez(t, k2.con.t - 0.3, 0.4), () => { strokeRR(cx, cy, cw, ch, 14, A.midN, 6); txt('OpenCode Console', cx + 30, cy + 60, F.mono(32, 600), A.midN, 'left', 'alphabetic', 1, 'cabinet label');
      const xs = rail(cx + 40, cy + 120, cw - 80, 5);
      xs.forEach((hx, i) => { const hin = k2.con.w[12] + i * 0.1; if (t < hin) return; const tk = ez(t, tTook + i * 0.12, 0.6, 'inOutQuart');
        withA(1 - tk, () => key(hx + 12 + tk * (V(700, 300)), cy + 154 - tk * 300, V(220, 190), swing(t, hin, 0.25) - tk * 1.2, { bits: [0.5, 0.3 + i * 0.1, 0.7, 0.4, 0.6], tag: { lines: ['AI key'], size: 24, rot: -0.4 } })); }); });
    const dx = V(1440, 640), dy = V(380, 1240), dw = V(260, 300), dh = V(420, 200);
    withA(ez(t, k2.brk.w[4], 0.4), () => { door(dx, dy, dw, dh, ez(t, k2.brk.w[7], 0.6) * 0.6, { col: A.panelN, leaf: '#3A3028', light: A.orange }); lab('an older system', dx, dy + dh + 56, 30, A.midN); });
    withA(ez(t, tTook, 0.3), () => txt('taken', V(L, 640), V(970, 1210), F.disp(V(96, 70)), A.orange, 'left', 'alphabetic', 0, 'taken'));
  }, { id: 'console' });
  cue('place', k2.con.t - 0.1, -6); cue('door', k2.brk.w[7], -6); cue('fall', tTook + 0.1, -4);

  /* ---------- 36. the alerts: OpenAI, Anthropic, Google ---------- */
  const k3 = { al: P('So people started getting alerts from OpenAI, Anthropic, Google,'), hund: P('and some of these charges were in hundreds of dollars'), few: P('A few of them were even over a thousand dollars for AI usage that users did not run') };
  addScene(k3.al.t - 0.1, 'bone', 'alerts', (t) => {
    const ax = V(980, L), aw = V(830, W - 2 * L), ay = V(170, 760);
    [['OpenAI', k3.al.w[6]], ['Anthropic', k3.al.w[7]], ['Google', k3.al.w[8]]].forEach(([s, at], i) => alertCard(t, at, ax, ay + i * 150, aw, s, 'Usage alert', { key: 'alert ' + i }));
    KT(t, { lines: V(['charges in the', '*hundreds of dollars*'], ['charges in the', '*hundreds of dollars*']), font: 'body', x: L, y: V(260, 470), size: V(72, 66), times: [k3.hund.w[4], k3.hund.w[5], k3.hund.w[6], k3.hund.w[7], k3.hund.w[8], k3.hund.w[9]], col: A.ink, acc: A.orangeT });
    const big = ez(t, k3.few.w[6], 0.4); if (big > 0) withA(big, () => { _txt('$1,000+', L - 6, V(620, 1380), F.disp(V(230, 200)), A.orangeT, 'left'); });
    withA(ez(t, k3.few.w[12], 0.4), () => lab("for AI usage they didn't run", L, V(700, 1440), 32, A.ink));
    if (!PORTRAIT) clipCard(t, 'tcoc-1000', ax, 650, aw, { at: k3.few.w[0], cropX: [0, 1000], hlAt: [k3.hund.w[4], k3.few.w[6]], pad: 18, creditSize: 30 });
  }, { id: 'alerts' });
  cue('notify', k3.al.w[6], -2); cue('notify', k3.al.w[7], -6); cue('notify', k3.al.w[8], -4); cue('cash', k3.few.w[6], -2); cue('shutter', k3.few.w[0], -8);

  /* ---------- 37. imagine getting alerts for things you didn't use ---------- */
  const k4 = { im: P("Like imagine getting alerts for things you didn't use") };
  addScene(k4.im.t - 0.1, 'oct', 'imagine', (t) => {
    // a phone lock screen: the alerts keep stacking (generic, no app UI)
    const pw = V(420, 520), ph = V(760, 740), px = V(1340, (W - 520) / 2), py = V(160, 680);
    grp('phone', px, py, pw, ph, () => { fillRR(px, py, pw, ph, 48, A.ink); fillRR(px + 16, py + 16, pw - 32, ph - 32, 36, '#2A221B');
      _txt('9:41', px + pw / 2, py + 150, F.disp(96), A.bone, 'center');
      for (let i = 0; i < 4; i++) { const p = ez(t, k4.im.t + 0.2 + i * 0.55, 0.35); if (p <= 0) continue; const y = py + 210 + i * 120 + 30 * (1 - p);
        withA(p, () => { fillRR(px + 34, y, pw - 68, 104, 16, A.card); fillRR(px + 52, y + 22, 60, 60, 12, A.orange); _txt('Usage alert', px + 130, y + 48, F.body(28, 800), A.ink, 'left'); _txt('New charges on your account', px + 130, y + 84, F.body(22, 600), A.midB, 'left'); }); } });
    KT(t, { lines: V(['alerts for things', "you *didn't use*"], ['alerts for things', "you *didn't use*"]), x: L, y: V(420, 470), size: V(120, 96), times: [k4.im.w[3], k4.im.w[4], k4.im.w[5], k4.im.w[6], k4.im.w[7], k4.im.w[8]], col: A.ink, acc: A.cream });
  }, { id: 'imagine' });
  cue('notify', k4.im.t + 0.2, -4); cue('notify', k4.im.t + 1.3, -8);

  /* ---------- 38. a distillation attack ---------- */
  const k5 = { dist: P('OpenCode calls it a distillation attack'), when: P('That is when someone asks an AI model loads of questions'), uses: P('and just uses the answer to train their own model'), simple: P("So basically in simple words someone may have been building their own AI on other people's bill") };
  addScene(k5.dist.t - 0.1, 'night', 'distill', (t) => {
    KT(t, { lines: ['a *distillation* attack'], x: L, y: V(190, 470), size: V(96, 76), times: [k5.dist.t - 0.2, k5.dist.t - 0.15, k5.dist.w[5]], col: A.bone, acc: A.orange });
    // questions flow into a big model; answers flow out into a small new model that grows
    const mx = V(CX - 200, CX - 180), my = V(330, 700), mw = V(400, 360), mh = V(360, 320);
    withA(ez(t, k5.dist.t - 0.4, 0.4), () => { fillRR(mx, my, mw, mh, 18, A.panelN); txt('AI model', mx + mw / 2, my + mh / 2 + 20, F.disp(64), A.bone, 'center', 'alphabetic', 0, 'big model'); });
    if (t > k5.when.w[8]) for (let i = 0; i < 9; i++) { const ph = ((t - k5.when.w[8]) * 0.9 + i / 9) % 1; const x = lerp(V(L, L), mx - 40, ph), y = my + 40 + (i % 5) * (mh - 80) / 4;
      withA(Math.sin(ph * Math.PI), () => { fillRR(x - 34, y - 26, 68, 52, 26, A.bone); _txt('?', x, y + 15, F.disp(40), A.ink, 'center'); }); }
    const ta = k5.uses.w[2]; if (t > ta) for (let i = 0; i < 7; i++) { const ph = ((t - ta) * 0.8 + i / 7) % 1; const x = lerp(mx + mw + 40, V(W - L - 300, W - L - 220), ph), y = my + 60 + (i % 4) * (mh - 120) / 3;
      withA(Math.sin(ph * Math.PI), () => { rect(x - 30, y - 8, 60, 16, A.orange); }); }
    const grow = ez(t, k5.uses.w[5], 3.5, 'outQuint'); if (grow > 0) { const s = lerp(0.3, 1, grow); const bx = V(W - L - 300, W - L - 220), by = my + mh / 2, bs = V(300, 220) * s;
      fillRR(bx, by - bs / 2, bs, bs, 14, A.orange); withA(grow, () => lab('their own model', bx, by + V(190, 150), 30, A.orange)); }
    withA(ez(t, k5.when.w[5], 0.4), () => lab('loads of questions', V(L, L), my + mh + 60, 30, A.midN));
    KT(t, { lines: V(["their own AI on other people's *bill*"], ['their own AI on', "other people's *bill*"]), font: 'body', x: L, y: V(900, 1300), size: V(64, 58), times: TM({ t: k5.simple.w[10], w: k5.simple.w.slice(10) }, 7), col: A.bone, acc: A.orange });
    clipCard(t, 'bcoc-head', V(L, L), V(780, 0), V(1150, 0), { at: PORTRAIT ? 1e9 : k5.dist.w[4], pad: 16, creditSize: 28, rise: 20 });
  }, { id: 'distill' });
  cue('shutter', k5.dist.w[4], -6); cue('typeHit', k5.when.w[8], -6); cue('pop', k5.uses.w[5], -4); cue('cash', k5.simple.w[14], -8);

  /* ---------- 39. keys blocked, refunds going out ---------- */
  const k6 = { blk: P('Of course the AI companies have blocked the stolen keys'), ref: P('and refunds are going out, which is good') };
  addScene(k6.blk.t - 0.1, 'bone', 'blocked', (t) => {
    const xs = [0, 1, 2].map(i => V(1100 + i * 230, 280 + i * 260)); const ky = V(260, 760);
    xs.forEach((x, i) => { key(x, ky, V(300, 280), swing(t, k6.blk.t + i * 0.1, 0.2), { bits: [0.4, 0.7, 0.3, 0.6, 0.5] }); });
    stamp(t, k6.blk.w[5], 'BLOCKED', V(1340, CX), V(520, 1050), V(110, 96), A.orangeT, -0.14, 'stamp blocked');
    KT(t, { lines: V(['stolen keys', '*blocked*'], ['stolen keys *blocked*']), x: L, y: V(330, 470), size: V(130, 96), times: [k6.blk.w[7], k6.blk.w[8], k6.blk.w[5]], col: A.ink, acc: A.orangeT });
    withA(ez(t, k6.ref.w[1], 0.4), () => { const y = V(760, 1340); strokeR(L, y - 46, 56, 56, A.ink, 4); rect(L + 9, y - 37, 38 * ez(t, k6.ref.w[2], 0.3), 38, A.orange); txt('refunds are going out', L + 84, y, F.body(V(52, 48), 800), A.ink, 'left', 'alphabetic', 0, 'refunds'); });
  }, { id: 'blocked' });
  cue('stamp', k6.blk.w[5], 2); cue('check', k6.ref.w[2], -2);

  /* ---------- 40. the same pattern (orange) ---------- */
  const k7 = { put: P('When you put the Railway, Zeabur and OpenCode incidents side by side'), pat: P('you realize they are kind of the same pattern'), went: P('In these situations particularly the attackers went straight for the place where developers keep their secret keys') };
  addScene(k7.put.t - 0.1, 'oct', 'pattern', (t, lt) => { pushCam(lt, 8, 0.03, CX, H * 0.55);
    const days = [[21, 'RAILWAY', k7.put.t - 0.3], [14, 'ZEABUR', k7.put.w[4]], [19, 'OPENCODE', k7.put.w[6]]];
    const cw = V(470, 300), chh = V(470, 400), gap = V(60, 30), x0 = V((W - 3 * cw - 2 * gap) / 2, (W - 3 * cw - 2 * gap) / 2), y0 = V(330, 620);
    days.forEach(([d, s, at], i) => { const p = ez(t, at, 0.4); if (p <= 0) return; const x = x0 + i * (cw + gap);
      withA(p, () => { ctx.save(); ctx.translate(0, 30 * (1 - p)); rect(x, y0, cw, chh, A.ink); _txt(String(d), x + 24, y0 + 90, F.disp(80), A.orange, 'left');
        txt(s, x + 24, y0 + chh - 30, F.mono(V(32, 28), 600), A.bone, 'left', 'alphabetic', 1, 'pattern ' + s);
        const ka = days[i][2] + 0.5; const kp = ez(t, ka, 0.4, 'outBack'); if (kp > 0) withA(clamp(kp), () => key(x + cw / 2 + 40, y0 + 120 - 30 * (1 - kp), V(200, 150), swing(t, ka, 0.2), { fill: A.orange, bg: A.ink }));
        const ring = ez(t, k7.went.w[15], 0.5); if (ring > 0) handCircle(x + cw / 2 + 40, y0 + chh / 2 + 10, cw * 0.34, chh * 0.34, ring, A.bone, 6, i + 3);
        ctx.restore(); }); });
    KT(t, { lines: V(['the same pattern'], ['the same', 'pattern']), x: L, y: V(220, 470), size: V(110, 110), times: [k7.pat.w[6], k7.pat.w[7], k7.pat.w[8]], col: A.ink });
    wipeLines(t, k7.went.w[5], V(['they went straight for the secret keys'], ['they went straight', 'for the secret keys']), L, V(940, 1180), F.body(V(60, 54), 700), A.ink, 70, 0.6, 'went straight');
  }, { id: 'pattern' });
  cue('place', k7.put.t - 0.1, -4); cue('place', k7.put.w[4], -6); cue('place', k7.put.w[6], -4); cue('pop', k7.put.t + 0.4, -4); cue('pop', k7.put.w[4] + 0.5, -6); cue('pop', k7.put.w[6] + 0.5, -4); cue('scribble', k7.went.w[15], -4);

  /* ---------- 41-45. what to do: five things, each a key picture ---------- */
  const k8 = { use: P('So if you use any of this platform you want to change any key'), sure: P("you're not sure about") };
  const LESSON = (n, title) => { withA(1, () => { _txt(n, L, V(200, 470), F.disp(80), A.orangeT, 'left'); txt(title, L + 110, V(192, 462), F.body(V(46, 40), 800), A.ink, 'left', 'alphabetic', 0, 'lesson ' + n); }); hline(L, V(240, 510), W - 2 * L, 1, A.ruleB, 2); };
  addScene(k8.use.t - 0.1, 'bone', 'do-change', (t) => {
    LESSON('01', 'what you can do');
    KT(t, { lines: V(['change any key', "you're *not sure* about"], ['change any key', "you're *not sure*", 'about']), x: L, y: V(420, 700), size: V(110, 96), times: [k8.use.w[9], k8.use.w[10], k8.use.w[11], k8.sure.w[0], k8.sure.w[1], k8.sure.w[2], k8.sure.w[3]], col: A.ink, acc: A.orangeT });
    const rx = V(1080, 120), ry = V(330, 1020), rw = V(720, 840); const xs = rail(rx, ry, rw, 4);
    xs.forEach((hx, i) => { const odd = i === 2; const out = odd ? ez(t, k8.sure.w[2] + 0.2, 0.5, 'inOutQuart') : 0, inn = odd ? ez(t, k8.sure.w[2] + 0.75, 0.45) : 0;
      if (out < 1) withA(1 - out, () => key(hx + 12, ry + 34 + out * 400, V(230, 230), swing(t, k8.use.t, 0.2) + out * 0.6, { bits: [0.3, 0.6, 0.4, 0.7, 0.5], tag: odd ? { lines: ['?'], size: 34, rot: -0.4 } : null }));
      if (inn > 0) withA(Math.min(1, inn * 2), () => key(hx + 12, ry + 34 - (1 - inn) * 60, V(230, 230), swing(t, k8.sure.w[2] + 0.75, 0.3), { fill: A.orange, bits: [0.7, 0.3, 0.8, 0.2, 0.6] })); });
  }, { id: 'do-change' });
  cue('fall', k8.sure.w[2] + 0.4, -4); cue('pop', k8.sure.w[2] + 0.9, -4);

  const k9 = { exp: P('You want to give your keys an expiry date'), whe: P('whenever or wherever the service allows it') };
  addScene(k9.exp.t - 0.1, 'bone', 'do-expiry', (t) => {
    LESSON('02', 'expiry dates');
    KT(t, { lines: V(['give every key', 'an *expiry date*'], ['give every key', 'an *expiry date*']), x: L, y: V(420, 700), size: V(110, 96), times: [k9.exp.w[3], k9.exp.w[4], k9.exp.w[5], k9.exp.w[6], k9.exp.w[7], k9.exp.w[8]], col: A.ink, acc: A.orangeT });
    key(V(1400, 560), V(300, 980), V(380, 320), swing(t, k9.exp.t, 0.22), { bits: [0.4, 0.8, 0.3, 0.6, 0.5], tag: t > k9.exp.w[7] ? { lines: ['expires', 'in 90 days'], size: V(34, 32), rot: -0.35, col: A.orange } : null });
    withA(ez(t, k9.whe.w[3], 0.4), () => lab('wherever the service allows it', L, V(700, 900), 32, A.midB));
  }, { id: 'do-expiry' });
  cue('tap', k9.exp.w[7], -2);

  const k10 = { each: P('You want to give each keys only the access it needs'), buck: P('So if a key only needs to read one storage bucket just give it access to that one storage bucket') };
  addScene(k10.each.t - 0.1, 'bone', 'do-access', (t) => {
    LESSON('03', 'only the access it needs');
    KT(t, { lines: V(['one key,', 'one *lock*'], ['one key, one *lock*']), x: L, y: V(420, 700), size: V(130, 110), times: [k10.each.w[3], k10.each.w[4], k10.each.w[7], k10.each.w[9]], col: A.ink, acc: A.orangeT });
    // three storage buckets; the key only goes to one of them
    const bx = V(900, L), by = V(560, 930), bw = V(270, 270), gap = V(40, 30);
    for (let i = 0; i < 3; i++) { const x = bx + i * (bw + gap); const p = ez(t, k10.each.w[9] + i * 0.1, 0.4); if (p <= 0) continue; const on = i === 0 ? ez(t, k10.buck.w[17], 0.4) : 0;
      withA(p, () => { ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(x + bw, by); ctx.lineTo(x + bw - 30, by + 240); ctx.lineTo(x + 30, by + 240); ctx.closePath(); ctx.fillStyle = on > 0.5 ? A.orange : A.panelB; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = A.ink; ctx.stroke();
        rect(x - 10, by - 16, bw + 20, 22, A.ink); (on > 0.5 ? themeFixed : (f) => f())(() => lab('bucket ' + (i + 1), x + bw / 2, by + 140, 30, A.ink, 'center', { key: 'bucket ' + i }));
        if (i > 0) withA(ez(t, k10.buck.w[17], 0.4), () => padlock(x + bw / 2, by + 190, 44, A.ink, { hole: A.panelB })); }); }
    const kp = io(t, k10.buck.w[13], 0.8); key(lerp(V(1600, 860), bx + bw / 2, kp), lerp(V(250, 400), by - 260, kp), V(240, 220), 0.25 * (1 - kp), { tag: { lines: ['read only'], size: 28, rot: -0.5 } });
  }, { id: 'do-access' });
  cue('place', k10.buck.w[7], -6); cue('slide', k10.buck.w[13] + 0.4, -4); cue('check', k10.buck.w[17], -2);

  const k11 = { set: P('Set spending limits, set alerts on all your AI and cloud accounts') };
  addScene(k11.set.t - 0.1, 'bone', 'do-limits', (t) => {
    LESSON('04', 'limits and alerts');
    KT(t, { lines: V(['set *spending limits*', 'and alerts'], ['set *spending*', '*limits* and alerts']), x: L, y: V(420, 700), size: V(110, 96), times: [k11.set.w[0], k11.set.w[1], k11.set.w[2], k11.set.w[3], k11.set.w[4]], col: A.ink, acc: A.orangeT });
    const mx = L, my = V(640, 1000), mw = W - 2 * L, mh = 90; const lim = 0.62;
    const p = ez(t, k11.set.w[3], 2.6, 'inOutQuart') * 0.78; strokeR(mx, my, mw, mh, A.ink, 4); rect(mx + 10, my + 10, (mw - 20) * Math.min(p, lim), mh - 20, A.ink);
    if (p > lim) rect(mx + 10 + (mw - 20) * lim, my + 10, (mw - 20) * (p - lim), mh - 20, A.orange);
    rect(mx + 10 + (mw - 20) * lim - 4, my - 40, 8, mh + 80, A.orangeT); lab('your limit', mx + (mw - 20) * lim + 24, my - 16, 30, A.orangeT, 'left');
    lab('spending this month', mx, my + mh + 50, 30, A.midB);
    if (p > lim) withA(ez(t, k11.set.w[3] + 2.0, 0.3), () => alertCard(t, k11.set.w[3] + 2.0, V(W - L - 640, L), V(800, 1220), 640, 'Spending alert', 'You passed your limit', { key: 'spend alert' }));
  }, { id: 'do-limits' });
  cue('notify', k11.set.w[3] + 2.0, -2);

  const k12 = { hon: P("and honestly do not store keys in tools that don't need them") };
  addScene(k12.hon.t - 0.1, 'bone', 'do-store', (t) => {
    LESSON('05', 'fewer places, fewer keys');
    KT(t, { lines: V(["don't store keys in", "tools that *don't need* them"], ["don't store keys", 'in tools that', "*don't need* them"]), x: L, y: V(420, 700), size: V(96, 90), times: TM({ t: k12.hon.w[2], w: k12.hon.w.slice(2) }, 9), col: A.ink, acc: A.orangeT });
    const n = 4, tx = V(L, L), ty = V(700, 1060), tw_ = V(380, 200), gp = V(40, 26);
    for (let i = 0; i < n; i++) { const x = tx + i * (tw_ + gp); const p = ez(t, k12.hon.w[5] + i * 0.08, 0.35); if (p <= 0) continue; const out = i > 0 ? ez(t, k12.hon.w[8] + i * 0.12, 0.4) : 0;
      withA(p, () => { strokeRR(x, ty, tw_, V(220, 200), 14, A.ink, 4); lab(i === 0 ? 'needs it' : 'tool ' + (i + 1), x + 20, ty + 46, 28, A.midB, 'left', { key: 'tool ' + i });
        if (out < 1) withA(1 - out, () => key(x + tw_ / 2, ty + 60 - out * 120, V(130, 110), 0.1, { fill: i === 0 ? A.orange : A.bone })); else withA(1, () => _txt('—', x + tw_ / 2, ty + 150, F.disp(50), A.midB, 'center')); }); }
  }, { id: 'do-store' });
  cue('pop', k12.hon.w[8], -6);

  /* ---------- 46. one more story (sounds made up) ---------- */
  const k13 = { one: P("Now there's this one more story from the October drama"), made: P('and this one actually sounds so made up') };
  addScene(k13.one.t - 0.1, 'oct', 'one-more', (t, lt) => {
    
    month(t, { fills: [...FILLS, { d: 17, label: '', at: -1 }], ring: { d: 17, at: k13.one.w[3], col: A.bone } });
    KT(t, { lines: V(['one more story'], ['one more', 'story']), x: L, y: V(250, 470), size: V(120, 130), times: [k13.one.w[3], k13.one.w[4], k13.one.w[5]], col: A.ink });
    withA(ez(t, k13.made.w[5], 0.4), () => txt('it sounds made up', V(W - L, L), V(250, 1430), F.disp(V(56, 64)), A.cream, V('right', 'left'), 'alphabetic', 0, 'made up'));
  }, { id: 'one-more' });
  cue('scribble', k13.one.w[3], -4); cue('tape', k13.made.w[5], -8);

  /* ---------- 47. eMudhra: the padlock your browser trusts ---------- */
  const k14 = { em: P('eMudhra is one of the companies their browsers trust'), conf: P('to confirm that a website is who it really says it is'), imp: P('That is how important this company is'), pad: P("So it's like this little padlock that your browser depends on") };
  addScene(k14.em.t - 0.1, 'bone', 'trust', (t, lt) => {
    dayFrame(t, k14.em.t - 0.1, 17); dayHead(t, k14.em.t - 0.1, 17, 'SAT', { name: 'eMudhra' }); pushCam(lt, 12, 0.05, CX, H * 0.55);
    // browser -> trusts eMudhra -> website is who it says
    const y = V(420, 640), bw = V(460, 420), bh = 160, gap = V(150, 70);
    [['your browser', k14.em.w[7]], ['eMudhra', k14.em.w[0]], ['the website', k14.conf.w[3]]].forEach(([s, at], i) => { const p = ez(t, at, 0.4); if (p <= 0) return;
      const x = V(L + i * (bw + gap), L), yy = V(y, y + i * (bh + gap));
      withA(p, () => { fillRR(x, yy, bw, bh, 14, i === 1 ? A.ink : A.card); txt(s, x + 30, yy + bh / 2 + 18, F.disp(56), i === 1 ? A.orange : A.ink, 'left', 'alphabetic', 0, 'trust ' + i); }); });
    [['trusts', k14.em.w[8]], ['vouches for', k14.conf.w[5]]].forEach(([s, at], i) => { const p = ez(t, at, 0.4); if (p <= 0) return;
      if (!PORTRAIT) { const x1 = L + (i + 1) * bw + i * gap + 14, x2 = x1 + gap - 28; arrowR(x1, y + bh / 2, x2, p, A.ink, 5, 18); withA(p, () => lab(s, (x1 + x2) / 2, y - 20, 28, A.midB, 'center', { key: 'arrow ' + i })); }
      else { const yy = y + (i + 1) * bh + i * gap; pline(L + 60, yy + 6, L + 60, yy + gap - 6, p, A.ink, 5); withA(p, () => lab(s, L + 90, yy + gap / 2 + 10, 28, A.midB, 'left', { key: 'arrow ' + i })); } });
    const ap = ez(t, k14.pad.w[5], 0.5); if (ap > 0) withA(ap, () => addressBar(V(L, L), V(780, 1300), V(1100, W - 2 * L), V(90, 90), 'any-website.com', { bar: A.card, line: A.ruleB, key: 'url trust' }));
    if (ap > 0) handCircle(V(L, L) + 54, V(825, 1345), 60, 56, ez(t, k14.pad.w[6], 0.5), A.orangeT, 6, 7);
  }, { id: 'trust' });
  cue('place', k14.em.w[0], -4); cue('tick', k14.conf.w[3], -6); cue('pop', k14.pad.w[5], -4); cue('scribble', k14.pad.w[6], -6);

  /* ---------- 48. the key that was the number 4 ---------- */
  const k15 = { eight: P('Now it turns out that eight of their signing keys were so weak'), weak: P('The keys were so weak that one of them literally was the number four'), just: P('Just number four'), how: P("That's how weak their keys were"), like: P('Like just number four') };
  addScene(k15.eight.t - 0.1, 'bone', 'four', (t, lt) => {
    dayFrame(t, k15.eight.t - 0.1, 17); pushCam(lt, 15, 0.05, CX, H * 0.4);
    // eight signing keys on a rail; one is stamped 4 and drops down big
    const rx = V(L, 60), ry = V(200, 400), rw = V(1700, 960); const xs = rail(rx, ry, rw, 8);
    const p4 = ez(t, k15.weak.w[13] - 0.06, 0.32, 'outExpo'); const big = io(t, V(k15.just.t - 0.1, k15.weak.w[6]), 0.7);
    xs.forEach((hx, i) => { const hin = k15.eight.w[4] + i * 0.06; if (t < hin) return; const four = i === 5;
      if (four && big > 0) return; key(hx + 12, ry + 34, V(190, 110), swing(t, hin, 0.22), { bits: [0.1, 0.1, 0.1, 0.1, 0.1], label: four && p4 > 0.02 ? '4' : '', labelSize: V(70, 40), labelCol: A.orangeT }); });
    KT(t, { lines: V(['8 signing keys, so weak'], ['8 signing keys,', 'so weak']), x: L, y: V(620, 800), size: V(100, 88), times: [k15.eight.w[5], k15.eight.w[5], k15.eight.w[6], k15.eight.w[9], k15.eight.w[10]], col: A.ink, out: V(k15.just.t - 0.1, k15.weak.w[6]) });
    if (big > 0) { const hx = xs[5] + 12; key(lerp(hx, V(1400, CX + 230), big), lerp(ry + 34, V(140, 600), big), lerp(V(190, 110), V(700, 540), big), swing(t, k15.just.t + 0.6, 0.1, 0.8),
      { bits: [0.1, 0.1, 0.1, 0.1, 0.1], label: '4', labelSize: lerp(V(70, 40), V(250, 220), big), labelCol: A.orangeT }); }
    withA(ez(t, V(k15.just.t, k15.weak.w[6]), 0.4), () => KT(t, { lines: ['one key was', 'the number'], x: L, y: V(560, 720), size: V(130, 96), times: V([k15.just.t, k15.just.t, k15.just.t + 0.1, k15.just.w[1], k15.just.w[1]], [k15.weak.w[6], k15.weak.w[7], k15.weak.w[10], k15.weak.w[11], k15.weak.w[12]]), col: A.ink }));
    clipCard(t, 'emudhra-quote', L, V(820, 1250), V(980, W - 2 * L), { at: k15.how.w[0], crop: [48, 90], cropX: [369, 1058], hlAt: k15.how.w[2], creditSize: 30 });
    clipCard(t, 'tnwem-head', V(L, L), V(800, 1260), V(980, W - 2 * L), { at: PORTRAIT ? 1e9 : k15.like.w[1] + 1e9, pad: 16, creditSize: 30 });
  }, { id: 'four' });
  cue('tick', k15.eight.w[4], -6); cue('stamp', k15.weak.w[13] - 0.06, 2); cue('swipe', k15.just.t + 0.2, -6); cue('thud', k15.just.w[2], -4); cue('shutter', k15.how.w[0], -6);

  /* ---------- 49. the script: April 2025, a second set ---------- */
  const k16 = { scr: P('So the scripts went wrong when the keys were made in April 2025'), sec: P('and it made a second set of weak keys') };
  addScene(k16.scr.t - 0.1, 'night', 'april', (t, lt) => { if (PORTRAIT) pushCam(lt, 7, 0.05, CX, H * 0.5);
    miniMonth(t, k16.scr.t - 0.3, V(1260, L), V(170, 1020), V(540, W - 2 * L), 'APRIL 2025', 1, 30, { key: 'april page', rowH: V(null, 60), marks: [{ d: 1, at: k16.scr.w[9] }] });
    terminal(t, L, V(300, 400), V(1060, W - 2 * L), V(460, 430), 'key script', [{ s: 'make-keys', at: k16.scr.w[2] }, ...[0, 1, 2, 3, 4].map(i => ({ pre: '', s: 'key ' + (i + 1) + '  weak', at: k16.scr.w[2] + 0.5 + i * 0.6, col: i % 2 ? A.midN : A.orange, cps: 60 })),
      { s: 'make-keys  # again', at: k16.sec.w[3] }], { key: 'key script', size: V(34, 32) });
    { const tx = L, ty = V(300, 400), tW = V(1060, W - 2 * L), tH = V(460, 430); let fill = 0; for (let i = 0; i < 5; i++) fill += 0.2 * ez(t, k16.scr.w[2] + 0.5 + i * 0.6, 0.35);   // the key batch filling, one step per weak key
      withA(ez(t, k16.scr.w[2], 0.3), () => { lab('generating keys', tx, ty + tH + 50, 30, A.midN); rect(tx, ty + tH + 74, tW, 16, A.panelN); rect(tx, ty + tH + 74, tW * fill, 16, A.orange); }); }
    KT(t, { lines: V(['a *second set*', 'of weak keys'], ['a *second set* of weak keys']), font: 'body', x: L, y: V(950, 985), size: V(66, 48), times: [k16.sec.w[3], k16.sec.w[4], k16.sec.w[5], k16.sec.w[6], k16.sec.w[7], k16.sec.w[8]], col: A.bone, acc: A.orange });
  }, { id: 'april' });
  cue('page', k16.scr.t - 0.1, -4); cue('type', k16.scr.w[2], -8); cue('tap', k16.scr.w[9], -4); cue('type', k16.sec.w[3], -8);

  /* ---------- 50. a fake website with a real padlock ---------- */
  const k17 = { fake: P('And with keys like this of course someone could fake a website'), still: P('and your browser will still have shown the padlock') };
  addScene(k17.fake.t - 0.1, 'bone', 'fake', (t) => {
    const bw = V(800, W - 2 * L), bh = V(520, 420), y = V(300, 520);
    [['real', 0, k17.fake.t - 0.35], ['fake', 1, k17.fake.w[8]]].forEach(([s, i, at]) => { const p = ez(t, at, 0.4); if (p <= 0) return; const x = V(L + i * (bw + 100), L), yy = V(y, y + i * (bh + 60));
      withA(p, () => { fillRR(x, yy, bw, bh, 16, A.card); strokeRR(x, yy, bw, bh, 16, A.ruleB, 2); addressBar(x + 30, yy + 30, bw - 60, 80, 'yourbank.com', { bar: A.panelB, key: 'url ' + s });
        for (let r = 0; r < 4; r++) rect(x + 40, yy + 160 + r * V(70, 56), (bw - 80) * (0.5 + 0.4 * hash(r + i * 9)), 26, A.panelB);
        if (i === 1) stamp(t, k17.fake.w[9], 'FAKE', x + bw - 170, yy + bh - 90, 70, A.orangeT, -0.12, 'stamp fake'); }); });
    withA(ez(t, k17.still.w[6], 0.4), () => { handCircle(V(L + 900 + 70, L + 70), V(y + 70, y + bh + 60 + 70), 60, 56, ez(t, k17.still.w[6], 0.5), A.orangeT, 6, 9);
      lab('the padlock still shows', V(L + 900, L), V(y + bh + 70, y + 2 * bh + 130), 32, A.orangeT); });
  }, { id: 'fake' });
  cue('place', k17.fake.w[8], -4); cue('stamp', k17.fake.w[9], -2); cue('scribble', k17.still.w[6], -4);

  /* ---------- 51. keep your stuff updated (centred) ---------- */
  const k18 = { hon: P("To be honest in cases like this I don't think there is anything the average users can even do about these things"), upd: P('but just to keep your stuff updated') };
  addScene(k18.hon.t - 0.1, 'night', 'updated', (t) => {
    withA(ez(t, k18.hon.w[10], 0.4), () => lab('not much the average user can do', CX, V(170, 470), 32, A.midN, 'center'));
    padlock(CX, V(310, 680), V(120, 130), A.bone, { hole: A.ink });
    KT(t, { lines: V(['keep your stuff *updated*'], ['keep your stuff', '*updated*']), x: CX, align: 'center', y: V(520, 900), size: V(120, 120), times: [k18.upd.w[2], k18.upd.w[3], k18.upd.w[4], k18.upd.w[5]], col: A.bone, acc: A.orange });
    const bw = V(1100, W - 2 * L), bx = CX - bw / 2, by = V(580, 1060), bh = 100; const pu = ez(t, k18.upd.w[5], 1.4, 'inOutQuart');
    grp('update bar', bx, by, bw, bh, () => { fillRR(bx, by, bw, bh, 14, A.panelN); if (pu > 0) fillRR(bx, by, bw * pu, bh, 14, A.orange); txt(pu >= 1 ? 'Up to date' : 'Updating…', bx + 30, by + 66, F.body(44, 800), pu > 0.3 ? A.ink : A.bone, 'left', 'alphabetic', 0, pu >= 1 ? 'up to date' : 'updating'); });
    const cw = V(1100, W - 2 * L); clipCard(t, 'bcem-head', CX - cw / 2, V(720, 1210), cw, { at: k18.hon.w[12], pad: 16, creditSize: 30 });
    withA(ez(t, k18.hon.w[12] + 0.3, 0.4), () => lab('browsers have since blocked these keys', V(CX - cw / 2, L), V(960, 1420), 30, A.midN, 'left', { maxW: W - 2 * L }));
  }, { id: 'updated' });
  cue('shutter', k18.hon.w[12], -4); cue('ding', k18.upd.w[5] + 1.4, -4);
  /* ---------- 52. AI on all sides (orange): AI chips land on the days where AI is part of the story ---------- */
  const k19 = { mid: P('And I think in the middle of all of this attack drama is where the role that AI plays on all sides') };
  addScene(k19.mid.t - 0.1, 'oct', 'ai-sides', (t, lt) => {
    ctx.save(); if (PORTRAIT) pushCam(lt, 9, 0.06, CX, 1040);
    month(t, { fills: [...FILLS, { d: 17, label: '', at: -1 }], dim: 0.6, labelA: 0.35 });
    // 19: AI agents (Reuters) and OpenCode's stolen AI keys; 21: the bugs found with AI, Railway's attackers aiming at AI companies
    [[19, 0, k19.mid.w[4]], [21, 0, k19.mid.w[7]], [19, 1, k19.mid.w[10]], [21, 1, k19.mid.w[14]]].forEach(([d, j, at]) => { const p = ez(t, at, 0.35, 'outBack'); if (p <= 0) return;
      const [x, y, w, h] = cellRect(d); const s = V(56, 40); const cx = V(x + w - s * 0.6 - j * (s + 8), x + 12 + s / 2 + j * (s + 6)), cy = V(y + s * 0.56, y + 86);
      withA(clamp(p), () => withT(cx, cy, p, 0, () => { fillRR(-s / 2, -s / 2, s, s, 6, A.cream); themeFixed(() => _txt('AI', 0, s * 0.22, F.disp(s * 0.62), A.inkFix, 'center')); })); });
    ctx.restore();
    KT(t, { lines: V(['the role AI plays on *all sides*'], ['the role', 'AI plays', 'on *all sides*']), x: L, y: V(250, 470), size: V(110, 110), times: [k19.mid.t + 0.2, k19.mid.t + 0.35, k19.mid.w[14], k19.mid.w[15], k19.mid.w[16], k19.mid.w[17], k19.mid.w[18]], col: A.ink, acc: A.cream });
    withA(1, () => KT(t, { lines: V(['AI found the bugs, ran the attacks, and was the target'], ['AI found the bugs, ran the', 'attacks, and was the target']), font: 'body', x: V(W - L, L), align: V('right', 'left'), y: V(110, 1385), size: V(36, 40), times: TM({ t: k19.mid.w[8], w: k19.mid.w.slice(8) }, 11), col: A.ink, id: 'ai line' }));
  }, { id: 'ai-sides' });
  cue('pop', k19.mid.w[4], -4); cue('pop', k19.mid.w[7], -6); cue('pop', k19.mid.w[10], -4); cue('pop', k19.mid.w[14], -6);
  /* ---------- 53. one attacker, AI agents, 100+ company websites (one tile = 10 sites: 100+ of 1,200+ tried) ---------- */
  const k20 = { reu: P('Reuters reported that one attacker used AI agents to break into more than a hundred company websites'), inc: P('These include sites belonging to SharkNinja, Cummins, all of those') };
  addScene(k20.reu.t - 0.1, 'night', 'hundred', (t, lt) => { pushCam(lt, 10, 0.05, CX, H * 0.5);
    clipCard(t, 'sa-head', L, V(130, 400), V(820, W - 2 * L), { at: k20.reu.t - 0.3, pad: 18, crop: [20, 350], creditSize: 30 });
    const cols = V(12, 12), rows = 10, tw_ = V(64, 66), th_ = V(46, 40), gap = 8; const gx = V(1010, (W - 12 * (66 + 8)) / 2 + 4), gy = V(150, 880);
    const TAKEN = [3, 17, 26, 41, 50, 58, 69, 77, 88, 95, 112];   // 11 of 120 (each tile = 10 sites tried)
    for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols); const k_ = TAKEN.indexOf(i); const hit = k_ >= 0 ? k20.reu.w[5] + k_ * 0.4 : 1e9;
      siteTile(gx + c * (tw_ + gap), gy + r * (th_ + gap), tw_, th_, i + 300, ez(t, k20.reu.t - 0.3 + (c + r) * 0.015, 0.3), ez(t, hit, 0.25)); }
    const ly = gy + rows * (th_ + gap) + 46;
    withA(ez(t, k20.reu.w[14], 0.4), () => { lab('1 square = 10 sites tried', gx, ly, 30, A.midN); lab('1,200+ tried, 100+ company websites broken into', gx, ly + 46, 32, A.orange, 'left', { maxW: V(900, W - 2 * L) }); });
    withA(ez(t, k20.inc.w[4], 0.4), () => { body('including SharkNinja and Cummins', L, V(720, 800), V(48, 44), A.bone, V(820, W - 2 * L), { key: 'names' }); lab('per Reuters and The Next Web', L, V(790, 856), 30, A.midN); });
  }, { id: 'hundred' });
  cue('shutter', k20.reu.t - 0.1, -4); cue('glitch', k20.reu.w[5], -2); cue('typeHit', k20.inc.w[4], -4);
  /* ---------- 54. short instructions, hours on their own ---------- */
  const k21 = { what: P('So in this case what the attackers did was that it gave the agent short instructions'), run: P('and just let them run on for hours on their own') };
  addScene(k21.what.t - 0.1, 'bone', 'run-hours', (t) => {
    // a short note (the instructions: not their text, just its size) and a clock whose hands spin for hours
    const nx = L, ny = V(330, 560), nw = V(560, W - 2 * L), nh = V(300, 260);
    withA(ez(t, k21.what.t - 0.3, 0.4), () => { fillRR(nx, ny, nw, nh, 12, A.card); strokeRR(nx, ny, nw, nh, 12, A.ruleB, 2); lab('short instructions', nx + 30, ny + 56, 30, A.midB);
      for (let r = 0; r < 3; r++) rect(nx + 30, ny + 100 + r * 50, (nw - 60) * [0.9, 0.7, 0.45][r] * ez(t, k21.what.w[8] + r * 0.4, 0.5), 22, A.ink); });
    withA(ez(t, k21.what.w[11], 0.4), () => lab('to the AI agent', nx, ny + nh + 50, 30, A.ink));
    const cx = V(1360, CX), cy = V(560, 1000), R = V(260, 200);
    withA(ez(t, k21.run.w[3], 0.4), () => { circle(cx, cy, R, A.ink); circle(cx, cy, R - 14, A.card);
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; rect(cx + Math.sin(a) * (R - 40) - 4, cy - Math.cos(a) * (R - 40) - 14, 8, 28, A.ink); }
      const hrs = Math.max(0, t - k21.run.w[3]) * 2.2; const ah = hrs / 12 * Math.PI * 2, am = hrs * Math.PI * 2;
      ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = A.ink; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(ah) * R * 0.5, cy - Math.cos(ah) * R * 0.5); ctx.stroke();
      ctx.strokeStyle = A.orangeT; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(am) * R * 0.78, cy - Math.cos(am) * R * 0.78); ctx.stroke(); ctx.restore(); circle(cx, cy, 16, A.ink); });
    KT(t, { lines: V(['then ran for', '*hours* on their own'], ['then ran for *hours*', 'on their own']), x: L, y: V(800, 1330), size: V(96, 76), times: [k21.run.w[2], k21.run.w[3], k21.run.w[5], k21.run.w[6], k21.run.w[7], k21.run.w[8], k21.run.w[9]], col: A.ink, acc: A.orangeT });
  }, { id: 'run-hours' });
  cue('place', k21.what.w[12], -4); cue('clock', k21.run.w[3], -4);

  /* ---------- 55. $50 per break-in (orange) ---------- */
  const k22 = { cost: P('And the cost estimated to about $50 in AI tokens per successful hack'), cr: P("Like it's so crazy that we've gotten to the point where it's costing $50 to hack into a company") };
  addScene(k22.cost.t - 0.1, 'oct', 'fifty', (t, lt) => { pushCam(lt, 8, 0.03, CX, H * 0.55);
    lab('a researcher’s estimate, in AI tokens', L, V(200, 470), 34, g.mid);
    const v = Math.round(lerp(0, 50, ez(t, k22.cost.w[5] - 0.3, 0.9))); _txt('$' + v, L - 10, V(640, 900), F.disp(V(460, 400)), A.ink, 'left');
    handLine(L, V(680, 940), V(560, 480), ez(t, k22.cr.w[3], 0.6), A.ink, 10, 8);
    withA(ez(t, k22.cost.w[10], 0.4), () => txt('per successful hack', L, V(760, 1010), F.body(V(64, 56), 800), A.ink, 'left', 'alphabetic', 0, 'per hack'));
    clipCard(t, 'tnwai-head', V(1000, L), V(330, 1110), V(820, W - 2 * L), { at: k22.cost.w[8], pad: 16, creditSize: 30, credit: g.mid });
    withA(ez(t, k22.cr.w[14], 0.4), () => KT(t, { lines: V(['to hack into', 'a company'], ['to hack into a company']), x: V(1000, L), y: V(700, 1400), size: V(100, 76), times: [k22.cr.w[14], k22.cr.w[15], k22.cr.w[16], k22.cr.w[17], k22.cr.w[18]], col: A.ink }));
  }, { id: 'fifty' });
  cue('cash', k22.cost.w[5] + 0.6, 0); cue('shutter', k22.cost.w[8], -6); cue('hit', k22.cr.w[13], -4); cue('scribble', k22.cr.w[3], -4);

  /* ---------- 56. reading the news everywhere: the headlines wall ---------- */
  const k23 = { news: P("It's just been so interesting reading and seeing the news everywhere"), find: P('What I find even interesting is how AI is literally on both sides') };
  addScene(k23.news.t - 0.1, 'bone', 'news', (t, lt) => {
    pushCam(lt, 8, 0.04);
    const items = V([['php-head', 110, 140, 900, -0.02], ['zb-head', 1050, 110, 760, 0.02], ['tcoc-head', 140, 400, 640, 0.015], ['bcem-head', 840, 430, 960, -0.015], ['sa-head', 1180, 640, 620, 0.02], ['aws-head', 110, 760, 960, -0.01]],
      [['php-head', 60, 380, 960, -0.02], ['zb-head', 80, 530, 760, 0.02], ['tcoc-head', 330, 700, 640, 0.015], ['bcem-head', 60, 930, 960, -0.015], ['sa-head', 120, 1070, 540, 0.02], ['aws-head', 60, 1250, 960, -0.01]]);
    items.forEach(([k_, x, y, w, r], i) => { const at = k23.news.t - 0.5 + i * 0.2; if (t < at) return; withT(x + w / 2, y, 1, r, () => clipCard(t, k_, -w / 2, 0, w, { at, pad: 14, creditBelow: false, key: 'wall ' + k_ })); });
    withA(ez(t, k23.news.t + 0.8, 0.4), () => lab('Headlines: BleepingComputer, Zeabur, TechCrunch, Star-Advertiser (Reuters), AWS, Oct 2026', V(L, L), V(1040, 1420), V(24, 24), A.midB, 'left', { maxW: W - 2 * L, key: 'wall credits' }));
  }, { id: 'news' });
  cue('shutter', k23.news.t - 0.1, -6); cue('shutter', k23.news.t + 0.3, -10); cue('shutter', k23.news.t + 0.7, -8);

  /* ---------- 57. AI on both sides: defenders found the bugs with AI, attackers broke in with it ---------- */
  const k24 = { ex: P('For example the PHP2Shell loopholes were found with help from AI'), and: P('And AI is also being used by the attackers'), same: P('So the same tools that are helping the defenders find the bugs faster are also helping the attackers break in faster') };
  addScene(k23.find.t - 0.1, 'night', 'both', (t, lt) => {
    KT(t, { lines: ['AI is on *both sides*'], x: CX, align: 'center', y: V(190, 480), size: V(110, 96), times: [k23.find.t - 0.2, k23.find.t - 0.1, k23.find.t, k23.find.w[9], k23.find.w[10]], col: A.bone, acc: A.orange });
    const wD = V(1000, W - 2 * L), wA = V(W - 2 * L - 1000 - 60, W - 2 * L), hD = V(400, 380), hA = V(400, 380);
    const xD = L, yD = V(330, 560), xA = V(L + 1000 + 60, L), yA = V(330, 560 + 380 + 110);
    const pd = ez(t, k23.find.t - 0.2, 0.4); if (pd > 0) withA(pd, () => { fillRR(xD, yD, wD, hD, 16, A.panelN); txt('defenders', xD + 30, yD + 80, F.disp(64), A.bone, 'left', 'alphabetic', 0, 'defenders');
      withA(ez(t, k24.ex.w[3], 0.3), () => lab('found the bugs with AI', xD + 30, yD + 132, 32, A.orange));
      clipCard(t, 'php-calif', xD + 30, yD + 170, wD - 60, { at: k24.ex.w[6], crop: [44, 94], cropX: [700, 1640], hlAt: k24.ex.w[7], pad: 12, creditSize: 28 });
      withA(ez(t, k24.same.w[6], 0.3), () => lab('find the bugs faster', xD + 30, yD + hD - 36, 30, A.midN)); });
    const pa = ez(t, k23.find.t + 0.2, 0.4); if (pa > 0) withA(pa, () => { fillRR(xA, yA, wA, hA, 16, A.orange); txt('attackers', xA + 30, yA + 80, F.disp(64), A.ink, 'left', 'alphabetic', 0, 'attackers');
      const n = 12, gp = 8, s = (wA - 60 - (n - 1) * gp) / n, th = s * 0.7, rows = V(3, 3); const TK = [3, 17, 26, 41, 50, 58];
      for (let i = 0; i < n * rows; i++) { const c = i % n, r = Math.floor(i / n); const hk = TK.indexOf(i); const hit = hk >= 0 ? ez(t, k24.and.w[5] + hk * 0.15, 0.25) : 0;
        const x = xA + 30 + c * (s + gp), y = yA + 112 + r * (th + gp); withA(ez(t, k24.and.w[1] + i * 0.006, 0.3), () => { rect(x, y, s, th, A.ink); if (hit > 0) rect(x, y, s, th * hit, A.bone); }); }
      withA(ez(t, k24.and.w[5], 0.3), () => lab('one hacker, 100+ sites, ~$50 each (estimate)', xA + 30, yA + 112 + rows * (th + gp) + 40, V(28, 26), A.ink, 'left', { maxW: wA - 60, key: 'attackers line' }));
      withA(ez(t, k24.same.w[16], 0.3), () => lab('break in faster', xA + 30, yA + hA - 30, 30, A.ink)); });
    // the same tool goes back and forth below / between the two sides
    const sp = ez(t, k24.same.w[2], 0.4); if (sp > 0) { const u = 0.5 + 0.5 * Math.sin((t - k24.same.w[2]) * 0.55 * Math.PI * 2);
      const ax = V(lerp(L + 100, W - L - 100, u), lerp(L + 90, W - L - 90, u)), ay = V(yD + hD + 80, yD + hD + 55);
      withA(sp, () => { if (!PORTRAIT) hline(L, ay, W - 2 * L, 1, A.ruleN, 2); fillRR(ax - 70, ay - 44, 140, 88, 14, A.bone); _txt('AI', ax, ay + 22, F.disp(56), A.ink, 'center'); }); }
    if (!PORTRAIT) withA(ez(t, k24.same.w[2], 0.4), () => lab('the same tools, both ways', CX, yD + hD + 190, 32, A.bone, 'center'));
  }, { id: 'both' });
  cue('place', k23.find.t - 0.1, -6); cue('marker', k24.ex.w[7], -6); cue('place', k23.find.t + 0.3, -4); cue('glitch', k24.and.w[5], -6); cue('swipe', k24.same.w[2], -8);

  /* ---------- 58. back and forth: each black day becomes its object, the month steps back, November waits ---------- */
  const k25 = { back: P("So it's almost like this back and forth situation"), ppl: P('I have people that are working in companies that have literally been stuck over dealing with attacks'), cr: P("it's been crazy, really crazy") };
  addScene(k25.back.t - 0.1, 'oct', 'end', (t, lt) => {
    const pb = io(t, k25.ppl.w[8], 2.2);   // the month steps back and slides left; November appears on the right
    const s = lerp(1, V(0.62, 1), pb), ox = lerp(0, V(-250, 0), pb), oy = lerp(0, V(60, -240), pb);
    ctx.save(); ctx.translate(CX + ox, H * 0.6 + oy); ctx.scale(s, s); ctx.translate(-CX, -H * 0.6);
    month(t, { fills: [...FILLS, { d: 17, label: '', at: -1 }], labelA: 1 - ez(t, k25.back.w[5], 0.4) });
    // each attack day turns into its picture: a key for a key story, a hole for PHP
    [[14, 'key'], [15, 'key'], [17, 'four'], [19, 'key'], [21, 'hole']].forEach(([d, kind], i) => { const at = k25.back.w[5] + i * 0.3; const p = ez(t, at, 0.4, 'outBack'); if (p <= 0) return;
      const [x, y, w, h] = cellRect(d); withA(clamp(p), () => withT(x + w / 2, y + h / 2 + 8, clamp(p), 0, () => {
        if (kind === 'hole') { const P_ = [[0.0, -0.30], [0.12, -0.12], [0.32, -0.16], [0.2, 0.04], [0.3, 0.28], [0.04, 0.16], [-0.18, 0.3], [-0.14, 0.06], [-0.32, -0.04], [-0.1, -0.12]]; ctx.save(); ctx.translate(w * 0.12, h * 0.05); ctx.beginPath(); P_.forEach(([px, py], i) => (i ? ctx.lineTo(px * h, py * h) : ctx.moveTo(px * h, py * h))); ctx.closePath(); ctx.fillStyle = A.orange; ctx.fill(); ctx.scale(0.62, 0.62); ctx.beginPath(); P_.forEach(([px, py], i) => (i ? ctx.lineTo(px * h, py * h) : ctx.moveTo(px * h, py * h))); ctx.closePath(); ctx.fillStyle = '#000000'; ctx.fill(); ctx.restore(); }
        else key(w * 0.18, -h * 0.4, h * 0.6, 0.12, { fill: A.orange, bg: A.ink, ring: A.orange, label: kind === 'four' ? '4' : '', labelSize: h * 0.2, labelCol: A.ink }); })); });
    ctx.restore();
    if (pb > 0) withA(pb, () => { const nx = V(1250, L), ny = V(330, 1110), nw = V(560, W - 2 * L);
      miniMonth(t, k25.ppl.w[8] + 0.6, nx, ny, nw, 'NOVEMBER 2026', 6, 30, { key: 'november page', paper: A.cream, ink: A.ink, dim: A.midB, rowH: V(null, 44) });
      withA(ez(t, k25.ppl.w[14], 0.4), () => lab('still dealing with attacks', V(nx, nx + nw - 22), V(ny - 26, ny + 58), 30, A.ink, V('left', 'right'), { maxW: 900 })); });
    KT(t, { lines: ['back and forth'], x: L, y: V(250, 420), size: V(120, 120), times: [k25.back.w[5], k25.back.w[6], k25.back.w[7]], col: A.ink, out: k25.cr.w[1] - 0.1 });
    withA(ez(t, k25.cr.w[2], 0.35), () => KT(t, { lines: ['crazy, really *crazy*'], x: L, y: V(250, 420), size: V(120, 96), times: [k25.cr.w[2], k25.cr.w[3], k25.cr.w[4]], col: A.ink, acc: A.cream }));
  }, { id: 'end' });
  cue('pop', k25.back.w[5], -6); cue('pop', k25.back.w[5] + 0.6, -8); cue('pop', k25.back.w[5] + 1.2, -6); cue('swipe', k25.ppl.w[8] + 0.6, -6); cue('page', k25.ppl.w[8] + 1.0, -2); cue('thud', k25.cr.w[4], -6);
}

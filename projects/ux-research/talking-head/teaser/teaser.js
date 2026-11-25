/* ux-research TEASER (LinkedIn and X): 13 of her lines in the film's look "research wall" (deep green wall #1D3A32,
 * canary sticky notes, orange #F26A2E, index-card white, Schibsted Grotesk 800 / Courier Prime / Permanent Marker).
 * Spec: inspiration/know-how/TEASER-PLAYBOOK.md.
 * Order: countdown (three sticky notes slap onto the wall: 3, 2, 1) -> hook (who is this app for?) -> the problem (a
 * beautiful app that is a nightmare to use; products fail; don't build the wrong thing; building is expensive) -> the fix
 * (cheaper to change a sketch; decisions from real people) -> the surprise (what people say vs do) -> the small-team answer
 * (talk to five people) -> the question (will AI replace it?) -> payoff (good design starts with people) -> end card on
 * the wall. Bites: talking-head.json "teaser" (bite 0 is a silent stretch under the countdown). */
'use strict';
function buildMoment() {
  const B = TZ.bites(); const px = (n) => n / BASE[0]; const U = UXT;
  const GR = (z, w = 800) => `${w} ${z}px UXGrot`, MK = (z) => `400 ${z}px UXMarker`;
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid'];
  const talk = (i, from, o = {}) => TZ.talk(i, { frame: FR[i], from, ...o });
  /** a sticky note (canary or orange), slightly turned, landing with a small drop */
  function note(cx, cy, w, h, rot, p, col, draw) {
    if (p <= 0) return; const e = E.outBack ? E.outBack(clamp(p)) : E.outQuint(clamp(p)); const sc = lerp(1.25, 1, e);
    withA(clamp(p * 3), () => withT(cx, cy, sc, rot, () => { ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 8, w, h); ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h); draw(w, h); }));
  }

  /* ---------- 0 · countdown: three notes slap onto the wall ---------- */
  const C0 = B[0].t0, C1 = B[0].t1, step = (C1 - C0) / 3;
  TZ.card([C0, C1], (t, r) => {
    rect(r.x, r.y, r.w, r.h, U.wall);
    const port = PORTRAIT, cx = r.x + r.w / 2, nw = port ? px(230) : 250;
    // the promise on an index card from frame 1 (a stranger knows what this is at once), the notes count down under it
    const zt = port ? px(84) : 150, cw = port ? r.w - px(40) : 1840,   // (critic round 1: the topic big from frame 0)
      ch = zt * 2.3, y2 = r.y + r.h * (port ? 0.2 : 0.24);
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(cx - cw / 2 + 8, y2 + 10, cw, ch); ctx.fillStyle = U.card; ctx.fillRect(cx - cw / 2, y2, cw, ch);
    ctx.fillStyle = '#E4A0A0'; ctx.fillRect(cx - cw / 2, y2 + zt * 0.85, cw, 2);
    _txt('NEW VIDEO · UX RESEARCH, EXPLAINED', cx, y2 + zt * 0.62, `700 ${zt * 0.36}px UXType`, U.ora, 'center');
    txt('Why some apps are so confusing', cx, y2 + zt * 1.85, GR(Math.min(zt, (cw * 0.94) / 15.5)), U.ink, 'center', 'alphabetic', -0.03 * zt, 'cd-topic');
    const cyN = y2 + ch + nw * 0.75;
    [0, 1, 2].forEach(k => { const p = k === 0 ? Math.max(0.999, prog(t, C0, 0.28)) : prog(t, C0 + 0.05 + k * step, 0.28); const x = cx + (k - 1) * nw * 1.15, rot = [-0.06, 0.04, -0.03][k];
      note(x, cyN, nw, nw, rot, p, k === 2 ? U.ora : U.note, () => _txt(String(3 - k), 0, nw * 0.22, MK(nw * 0.62), U.ink, 'center')); });
  }, { id: 'countdown', ground: 'uxwall' });
  [0, 1, 2].forEach(k => sfx('paper', C0 + 0.07 + k * step, -2));

  /* ---------- the bites ---------- */
  // 1 · hook
  talk(1, 0, { push: V([1.1, 1.24], [1.08, 1.2]) });
  // 2 · a nightmare to use
  const night = TZ.at(2, 'that is a nightmare');
  talk(2, 0, { to: night - 0.08 - B[2].t0 });
  TZ.insert([night - 0.08, TZ.at(2, 'in that case') - 0.06], { sync: 'that is a nightmare', after: 40, enter: 'snap', noCaps: true, id: 'i-nightmare', film: visRect() ? { aspect: ASPECT } : {} });
  TZ.talk([TZ.at(2, 'in that case') - 0.06, B[2].t1], { frame: 'close', id: 'ux-her' });
  sfx('error', night + 0.4, -12);
  // 3 · products fail
  talk(3, 0, { punch: ['nobody'] });
  { const kt = TZ.at(3, 'nobody'); TH.keyword({ from: kt, to: B[3].t1 - 0.05 }, '~nobody~ actually needs', { id: 'k-nobody', hold: 0.1, times: [kt, kt, kt] }); }
  // 4 · the wrong thing
  talk(4, 0, { punch: ['wrong'] });
  // 5 · building is expensive
  talk(5, 0); sfx('cash', TZ.at(5, 'tokens') + 0.1, -10);
  // 6 · cheaper to change a sketch
  talk(6, 0, { punch: ['cheaper'] }); sfx('pop', TZ.at(6, 'cheaper') - 0.03, -4);
  // 7 · decisions from real people, not a random person
  talk(7, 0, { push: V([1.0, 1.14], [1.08, 1.2]) });
  // 8 · say vs do (the film's card spells it)
  TZ.insert([B[8].t0, B[8].t1], { sync: 'what people say and what', after: 380, noCaps: true, id: 'i-saydo', film: visRect() ? { aspect: ASPECT, offset: 2.2 } : { offset: 2.2 } });
  // 9 · ask vs watch
  talk(9, 0, { punch: ['watch'] });
  // 10 · we are human beings
  talk(10, 0, { frame: 'close' });
  // 11 · small teams: talk to five people
  const five = TZ.at(11, 'talk to five');
  TZ.insert([B[11].t0, TZ.at(11, "you don't need") - 0.06], { sync: 'some research is always', back: 3, after: 470, id: 'i-budget', film: { offset: 1.3 } });
  TZ.talk([TZ.at(11, "you don't need") - 0.06, B[11].t1], { frame: 'mid', id: 'five-her' });
  TH.keyword({ from: five, to: B[11].t1 - 0.05 }, 'talk to ~five~ people', { id: 'k-five', hold: 0.1 });
  // 13 · the question (the stinger after the title card)
  if (!PORTRAIT) TZ.insert([B[13].t0, B[13].t1], { sync: 'will ai replace', after: 560, noCaps: true, enter: 'snap', id: 'i-ai', film: { offset: 1.0 }, zoom: V(1.25, 1.25), zoomAt: V([0.4, 0.16], [0.48, 0.22]), zoomGround: U.wall });
  else TZ.card([B[13].t0, B[13].t1], (t, r) => { rect(r.x, r.y, r.w, r.h, U.wall); const z = px(96), p = E.outQuint(prog(t, B[13].t0, 0.3));   // tall frames: her question, big and centred
    withA(p, () => withT(r.x + r.w / 2, r.y + r.h * 0.48, lerp(1.08, 1, p) * (1 + 0.05 * prog(t, B[13].t0, B[13].t1 - B[13].t0)), -0.02, () => { _txt('Will AI replace', 0, -z * 0.15, MK(z), U.paint, 'center'); _txt('UX research?', 0, z * 1.0, MK(z), U.ora, 'center'); })); }, { id: 'i-ai', ground: 'uxwall' });
  TH.capOff.push([B[13].t0, B[13].t1]);
  // 12 · payoff: the film's card, then her
  const gd2 = TZ.at(12, 'good design starts');
  TZ.insert([B[12].t0, gd2 - 0.06], { sync: "design doesn't start", after: 680, noCaps: true, id: 'i-screens', film: { offset: 1.6 } });
  TZ.talk([gd2 - 0.06, B[12].t1], { frame: 'close', id: 'people-her' });


  /* ---------- movie-trailer grammar (her note 2026-10-15): acts, title cards, every join shown ----------
   * the problem (1-5) -> card THE FIX -> research (6-7) -> card THE TWIST -> say vs do, small teams (8-11) -> the music
   * stops for the biggest line (12) -> title card UX RESEARCH (boom) -> stinger "Will AI replace UX research?" (13) -> end card. */
  const G = TZ.gaps();
  const tcard = (gp, big, small, o = {}) => TZ.cut(gp, { type: 'card', text: big, sub: small, id: o.id || ('card-' + String(big).replace(/\W+/g, '-').toLowerCase()), sound: o.sound || 'paper', db: o.db ?? -1, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: U.note, frames: 2 },
    draw: (t, r, lt, text, small) => {   // a big sticky note slapped onto the wall, marker words
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, U.wall);
      const port = PORTRAIT, nw = Math.min(r.w * (port ? 0.9 : 0.62), r.h * 0.95) * (o.size || 1), cx = r.x + r.w / 2, cy = r.y + r.h * 0.5;
      const lines = text.split('\n'); const z0 = nw * 0.3; const z = Math.min(z0, ...lines.map(l => z0 * (nw * 0.84) / Math.max(1, tw(l, MK(z0)))));
      note(cx, cy, nw, nw * 0.78, o.rot ?? -0.035, Math.max(0.34, clamp(lt / 0.2)), o.col || U.note,   // (p >= 0.34: full opacity on the first frame, the slam is the scale)
        (w, h) => {
        lines.forEach((l, k) => _txt(l, 0, (k - (lines.length - 1) / 2) * z * 1.05 + z * 0.36, MK(z), k === lines.length - 1 ? U.ora : U.ink, 'center'));
        if (small) _txt(small, 0, -h / 2 + Math.max(port ? px(56) : 52, z * 0.36), `700 ${Math.max(port ? px(34) : 34, z * 0.22)}px UXType`, U.ink, 'center');
      });
    } });
  // critic round 1: cards slam in opaque and bigger, booms on cards, opaque canary whips, no flash after flash, AI = stinger
  sfx('boom', 0.03, -2, { keep: true });
  TZ.cut(1, { type: 'flash', sound: 'boom', db: -3 });
  TZ.cut(2, { type: 'black' });
  TZ.cut(3, { type: 'glitch', colors: [U.ora, U.note, U.card] });
  TZ.cut(4, { type: 'whip', color: U.note });
  TZ.cut(5, { type: 'glitch', colors: [U.ora, U.note, U.card] });
  sfx('riserShort', G[0].t0, -5, { keep: true }); tcard(G[0], 'THE FIX', '', { sound: 'boom', db: -2 });
  TZ.cut(7, { type: 'black' });
  sfx('riserShort', G[1].t0, -4, { keep: true }); tcard(G[1], 'THE TWIST', '', { rot: 0.03, sound: 'boom', db: -2 });
  TZ.cut(9, { type: 'glitch', colors: [U.ora, U.note, U.card] });
  TZ.cut(10, { type: 'flash', color: U.card, frames: 2 });
  TZ.cut(11, { type: 'whip', color: U.note });
  sfx('tapeStop', B[12].t0 - 0.55, -5, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(12, { type: 'flash', sound: 'hit', db: -6 });
  tcard(G[2], 'UX\nRESEARCH', 'NEW VIDEO', { sound: 'boom', db: 0, out: 'black', col: U.card, size: 1.05 });
  TZ.drop(B[13].t0 - 0.05, B[13].t1 - B[13].t0 + 0.1);   // the stinger: "Will AI replace UX research?" in silence, then the end card hits
  const lift = (g, after) => { TZ.music(g.t0, after + 8, 0.03); TZ.music(g.t1, after, 0.05); };   // the cards are the loudest beats
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0, -3, 0.05); lift(G[0], 0); lift(G[1], 3); lift(G[2], 6);

  /* ---------- "coming up" label: a sticky note in the corner ---------- */
  // removed (her note 2026-10-17: "please remove the 'new video' tag at the top of the teaser"); kept here switched off
  if (false) TZ.layer(C1, FOOT.dur, (t, r) => {
    const sc_ = SCENES[sceneIndex(t)]; if (sc_ && (sc_.layout === 'insert' || sc_.card)) return;
    const ov = ovr('label'); const def = 'UX research, explained'; const s2 = ov.s != null ? ov.s : def; if (ov.hide) return;
    const z = PORTRAIT ? px(38) : 36, fa = MK(z * 0.9), fb = GR(z, 800), a = 'new video:';
    const wa = tw(a, fa), wb = tw(s2, fb, -0.03 * z), pad = z * 0.6, gap = z * 0.45, w = wa + gap + wb + pad * 2, h = z * 1.95;
    const x = PORTRAIT ? r.x + (r.w - w) / 2 : 64, y = PORTRAIT ? r.y + (ASPECT === '9x16' ? 170 : px(44)) : 50;
    const p = E.outQuint(prog(t, C1, 0.3));
    moved(ov, () => withA(p, () => withT(x + w / 2, y + h / 2, lerp(1.15, 1, p), -0.015, () => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-w / 2 + 4, -h / 2 + 6, w, h); ctx.fillStyle = U.note; ctx.fillRect(-w / 2, -h / 2, w, h);
      _txt(a, -w / 2 + pad, h * 0.17, fa, U.ink, 'left'); _txt(s2, -w / 2 + pad + wa + gap, h * 0.17, fb, U.ink, 'left', 'alphabetic', -0.03 * z);
    })));
    regBox(ov, x, y, w, h, { text: s2, def });
  });

  /* ---------- end card: the video pinned to the wall ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, U.wall);
    const port = PORTRAIT, cx = port ? r.x + r.w / 2 : 140 + 540, cw = port ? r.w - px(150) : 1180, z = port ? px(66) : 76;   // 16:9: the card left, the note beside it
    const ov = ovr('title'); const ttl = ov.s != null ? ov.s : title; const f = GR(z);
    const lines = []; let cur = ''; for (const wd of ttl.replace(' (', ' \n(').split(/ /)) { if (wd.startsWith('\n')) { if (cur) lines.push(cur); cur = wd.slice(1); continue; } const tst = cur ? cur + ' ' + wd : wd; if (tw(tst, f, -0.03 * z) > cw - z * 1.4 && cur) { lines.push(cur); cur = wd; } else cur = tst; } if (cur) lines.push(cur);
    const ch = z * 1.0 + lines.length * z * 1.12 + z * 0.9, cy0 = r.y + r.h * (port ? 0.16 : 0.24);
    const p1 = E.outQuint(prog(lt, 0.2, 0.45));
    if (p1 > 0) withA(clamp(p1 * 2), () => withT(cx, cy0 + ch / 2, lerp(1.08, 1, p1), -0.012, () => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-cw / 2 + 8, -ch / 2 + 10, cw, ch); ctx.fillStyle = U.card; ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
      ctx.fillStyle = '#E4A0A0'; ctx.fillRect(-cw / 2, -ch / 2 + z * 0.8, cw, 2); ctx.fillStyle = '#C9D6EA'; for (let k = 1; k <= lines.length; k++) ctx.fillRect(-cw / 2, -ch / 2 + z * 0.8 + k * z * 1.12 + z * 0.2, cw, 1.5);
      _txt('NEW VIDEO', -cw / 2 + z * 0.7, -ch / 2 + z * 0.58, `700 ${z * 0.42}px UXType`, U.ora, 'left');
      lines.forEach((l, i) => _txt(l, -cw / 2 + z * 0.7, -ch / 2 + z * 0.8 + (i + 1) * z * 1.12, f, U.ink, 'left', 'alphabetic', -0.03 * z));
    }));
    regBox(ov, cx - cw / 2, cy0, cw, ch, { text: ttl, def: title });
    const ov2 = ovr('where'); const wh = ov2.s != null ? ov2.s : 'Full video on YouTube'; const nw = port ? px(430) : 420, nh = nw * 0.62;
    const nx = port ? cx : cx + cw / 2 + nw * 0.62, ny = port ? cy0 + ch + nh * 0.62 : cy0 + ch * 0.55;
    if (!ov2.hide) note(nx, ny, nw, nh, 0.035, prog(lt, 1.2, 0.3), U.note, (w, h) => { const ls = wh.split(' on '); _txt(ls[0], 0, -h * 0.04, MK(w * 0.12), U.ink, 'center'); if (ls[1]) _txt('on ' + ls[1], 0, h * 0.24, MK(w * 0.12), U.ink, 'center'); });
    regBox(ov2, nx - nw / 2, ny - nh / 2, nw, nh, { text: wh, def: 'Full video on YouTube' });
    const p3 = E.outExpo(prog(lt, 2.1, 0.5)); const hs = port ? px(112) : 120;
    const hx = port ? cx : cx - cw / 2, hy = port ? ny + nh * 0.5 + hs * 1.05 : cy0 + ch + hs * 1.3;
    if (p3 > 0) withA(p3, () => txt('@WithGbemi', hx, hy, MK(hs), U.paint, port ? 'center' : 'left', 'alphabetic', 0, 'handle'));
    const pu = E.inOutCubic(prog(lt, 3.3, 0.5)); if (pu > 0) { const hw = tw('@WithGbemi', MK(hs)), x0 = port ? hx - hw / 2 : hx;   // a late beat: a marker line under the handle
      ctx.save(); ctx.strokeStyle = U.ora; ctx.lineWidth = hs * 0.09; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, hy + hs * 0.2); ctx.lineTo(x0 + hw * pu, hy + hs * 0.2 + hs * 0.04 * pu); ctx.stroke(); ctx.restore(); }
  }, { ground: 'uxwall' });
  const T0 = FOOT.dur;
  sfx('boom', T0 + 0.02, -3, { keep: true }); sfx('paper', T0 + 0.22, -3); sfx('paper', T0 + 1.22, -4); sfx('pop', T0 + 2.1, -6); sfx('mark', T0 + 3.3, -4);
}

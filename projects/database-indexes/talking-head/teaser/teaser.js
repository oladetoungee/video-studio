/* database-indexes TEASER (LinkedIn and X): 13 of her lines in the film's look "Query Plan" (off-black #0E1013, ink #ECEAE4,
 * ONE yellow #FFC53D, IBM Plex Sans / Mono). Spec: inspiration/know-how/TEASER-PLAYBOOK.md.
 * Order: countdown (a query running: a ring drains 3-2-1) -> the hook (your app gets slow as it grows) -> what goes wrong
 * (a full table scan; a million rows) -> the fix (the back of a book; 20 steps instead of a million; a one-liner; EXPLAIN)
 * -> the tension (why not index every column? We cannot: every index has a cost, slower writes) -> the gotcha (PostgreSQL
 * foreign keys, joins get slow) -> the cliffhanger ("the database still won't use it") -> end card as a query result.
 * Bites: talking-head.json "teaser" (bite 0 is a silent stretch under the countdown). */
'use strict';
function buildMoment() {
  const B = TZ.bites(); const px = (n) => n / BASE[0];
  const Q = DQ, sans = (z, w = 600) => `${w} ${z}px "QP Sans"`, monoF = (z, w = 400) => `${w} ${z}px "QP Mono"`;
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid'];
  const talk = (i, from, o = {}) => TZ.talk(i, { frame: FR[i], from, ...o });

  /* ---------- 0 · countdown: a query running, the ring drains ---------- */
  const C0 = B[0].t0, C1 = B[0].t1;
  TZ.card([C0, C1], (t, r) => {
    rect(r.x, r.y, r.w, r.h, Q.bg);
    const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * (port ? 0.3 : 0.25), R = port ? px(110) : 120;
    const u = clamp((t - C0) / (C1 - C0)), n = Math.min(3, Math.max(1, 3 - Math.floor(u * 3 - 1e-6)));
    // ring: a full dim track, the yellow part drains (each second a third)
    ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = port ? px(16) : 16;
    ctx.strokeStyle = Q.line; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = Q.acc; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - u)); ctx.stroke(); ctx.restore();
    const sub = (t - C0) - (3 - n) * (C1 - C0) / 3; const pop = n === 3 ? 1 : E.outQuint(clamp(sub / 0.25));   // (the 3 is there on frame 1)
    withA(pop, () => withT(cx, cy, lerp(1.25, 1, pop), 0, () => _txt(String(n), 0, (port ? px(45) : 52), monoF(port ? px(130) : 150, 600), Q.ink, 'center')));
    const fm = monoF(port ? px(34) : 34), y1 = cy - R - (port ? px(70) : 66), y2 = cy + R + (port ? px(170) : 170);
    const q = 'EXPLAIN ANALYZE database_indexes;'; const nCh = Math.floor(clamp((t - C0) / 0.7) * q.length);
    _txt('> ' + q.slice(0, nCh), cx, y1, fm, Q.dim, 'center');
    txt('DATABASE INDEXES', cx, y2 + (port ? px(40) : 50), sans(Math.min(port ? px(150) : 230, (r.w * 0.92) / 9.6), 800), Q.ink, 'center', 'alphabetic', -0.03 * (port ? px(150) : 230), 'cd-topic');   // round 2: the topic heavy, ~20 % of the frame height   // the topic, big, from frame 0
    txt('Why your app gets slow, and the fix', cx, y2 + (port ? px(130) : 140), fm, Q.acc, 'center', 'alphabetic', 0, 'cd-sub');
  }, { id: 'countdown', ground: 'qpt' });
  [0, 1, 2].forEach(k => sfx('clock', C0 + 0.04 + k * (C1 - C0) / 3, -3));
  sfx('typeHit', C0 + 0.3, -8);

  /* ---------- the bites ---------- */
  // 1 · hook
  talk(1, 0, { push: V([1.12, 1.24], [1.08, 1.18]) });
  { const kt = TZ.at(1, 'performance issues'); TH.keyword({ from: kt, to: B[1].t1 - 0.05 }, 'performance ~issues~', { id: 'k-perf', hold: 0.1, times: [kt, kt] }); }
  // 2 · a full table scan (the film's counter runs through the rows)
  const scan = TZ.at(2, 'and that is called');
  TZ.insert([B[2].t0, scan - 0.08], { sync: 'it starts at the first row', after: 40, enter: 'snap', id: 'i-scan', film: { offset: 0.8 } });
  TZ.talk([scan - 0.08, B[2].t1], { frame: 'close', id: 'scan-her' });
  { const kt = TZ.at(2, 'full table scan'); TH.keyword({ from: kt, to: B[2].t1 - 0.05 }, 'full ~table scan~', { id: 'k-scan', hold: 0.1, times: [kt, kt, kt] }); }
  // 3 · at a million rows
  talk(3, 0, { punch: ['million'] });
  // 4 · the back of a book (the film's book index)
  const bk = TZ.at(4, 'the index at the back');
  talk(4, 0, { to: bk - 0.08 - B[4].t0 });
  TZ.insert([bk - 0.08, B[4].t1], { sync: 'the index at the back', after: 60, id: 'i-book', noCaps: true, film: { offset: 1.2 }, zoom: V(1.5, 1), zoomAt: V([0.65, 0.4], [0.5, 0.5]), zoomGround: Q.bg });
  sfx('paper', bk - 0.05, -3);
  // 5 · 20 steps instead of a million
  const wo = TZ.at(5, 'without an index');
  const st20 = TZ.at(5, 'you can get') + 1.6;
  TZ.insert([B[5].t0, st20], { scene: 'twenty', from: 3.0, enter: 'snap', id: 'i-twenty' });
  TZ.talk([st20, B[5].t1], { frame: 'mid', id: 'twenty-her' });
  { const kt = TZ.at(5, 'million checks'); TH.keyword({ from: kt, to: B[5].t1 - 0.05 }, '~million~ checks', { id: 'k-million', hold: 0.1, times: [kt, kt] }); }
  // 6 · a one-liner
  const one = TZ.at(6, "and it's kind of");
  talk(6, 0, { to: one - 0.08 - B[6].t0 });
  TZ.talk([one - 0.08, B[6].t1], { frame: 'close', id: 'oneliner-her' });
  TH.keyword({ from: one, to: B[6].t1 - 0.05 }, '~one-liner~', { id: 'k-one', hold: 0.1, times: [one] });
  sfx('pop', one - 0.05, -4);
  // 7 · EXPLAIN
  TZ.insert([B[7].t0, B[7].t1], { scene: 'explain-front', from: 5.6, id: 'i-explain' });
  // 8 · the question (a turn)
  talk(8, 0, { push: V([1.0, 1.12], [1.08, 1.2]) });
  // 9 · "We cannot." (the film's own type)
  TZ.insert([B[9].t0, B[9].t0 + 1.4], { sync: 'we cannot', after: 440, noCaps: true, enter: 'snap', id: 'i-cannot', film: { offset: 0.4 } });
  TZ.talk([B[9].t0 + 1.4, B[9].t1], { frame: 'close', id: 'cost-her' });
  { const kt = TZ.at(9, 'every index'); TH.keyword({ from: kt, to: B[9].t1 - 0.05 }, 'every index has a ~cost~', { id: 'k-cost', hold: 0.1, times: [kt, kt, kt, kt, kt] }); }
  // 10 · slower writes (the bar chart grows)
  TZ.insert([B[10].t0, B[10].t1], { sync: 'so the more database', after: 450, id: 'i-slower', film: { offset: 1.3 } });
  // (the MySQL / PostgreSQL foreign-key bites were cut after critic round 1: too niche for a trailer)
  // 11 · the cliffhanger
  talk(11, 0, { push: V([1.2, 1.36], [1.16, 1.3]) });
  { const kt = TZ.at(11, "won't"); TH.keyword({ from: kt, to: B[11].t1 - 0.05 }, 'won’t ~use it~', { id: 'k-use', hold: 0.1, times: [kt, kt, kt] }); }


  /* ---------- movie-trailer grammar (her note 2026-10-15): three acts, title cards between them, every join shown ----------
   * act 1 the problem (1-3) -> card THE FIX -> act 2 the fix (4-7) -> card THE CATCH -> act 3 the catch (8-12) -> the music
   * stops for the biggest line (13) -> title card DATABASE INDEXES (boom, music back up) -> end card. */
  const G = TZ.gaps();
  const tcard = (gp, big, small, o = {}) => TZ.cut(gp, { type: 'card', text: big, sub: small, id: o.id || ('card-' + String(big).replace(/\W+/g, '-').toLowerCase()), sound: o.sound, db: o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: Q.acc, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, Q.bg);
      const port = PORTRAIT, z = Math.min(r.w * (port ? 0.2 : 0.15), r.h * 0.3) * (o.size || 1), cx = r.x + r.w / 2, cy = r.y + r.h * 0.5;
      const sc = 1 + 0.3 * (1 - E.outQuint(clamp(lt / 0.15)));   // a hard slam (130 % -> 100 % in ~4 frames), no fade
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const zz = Math.min(z, ...lines.map(l => z * (r.w * 0.86) / Math.max(1, tw(l, sans(z, 800), -0.03 * z))));
        lines.forEach((l, k) => _txt(l, 0, zz * 0.36 + (k - (lines.length - 1) / 2) * zz * 1.02, sans(zz, 800), k === lines.length - 1 ? Q.acc : Q.ink, 'center', 'alphabetic', -0.03 * zz));
        const fm = monoF(Math.max(port ? px(34) : 30, zz * 0.22)); _txt('-- ' + small, 0, -zz * (0.5 + 0.51 * (lines.length - 1)) - zz * 0.25, fm, Q.dim, 'center');
        const bw = Math.min(r.w * 0.5, zz * 3) * E.outQuint(clamp((lt - 0.05) / 0.25)); ctx.fillStyle = Q.acc; ctx.fillRect(-bw / 2, zz * 0.62 + (lines.length - 1) / 2 * zz * 1.02, bw, Math.max(4, zz * 0.045));
      });
    } });
  // cuts: varied, deliberate, on the join; one sound each, kept (critic round 1: max 2 black cuts, whips = opaque accent panels)
  sfx('boom', 0.03, -2, { keep: true });   // frame 0 hits: the countdown is short and loud
  TZ.cut(1, { type: 'flash', sound: 'boom', db: -3 });
  TZ.cut(2, { type: 'glitch', colors: [Q.acc, Q.ink, '#3A3F47'] });
  TZ.cut(3, { type: 'whip', color: Q.acc });
  sfx('riserShort', G[0].t0, -5, { keep: true }); tcard(G[0], 'DATABASE\nINDEX', '02', { sound: 'boom', db: -2 });
  TZ.cut(5, { type: 'black' });
  TZ.cut(6, { type: 'glitch', colors: [Q.acc, Q.ink, '#3A3F47'] });
  TZ.cut(7, { type: 'whip', color: Q.acc });
  sfx('riserShort', G[1].t0, -4, { keep: true }); tcard(G[1], 'THE CATCH', '03', { sound: 'boom', db: -2 });
  TZ.cut(9, { type: 'black', sound: 'boom', db: -4 });
  TZ.cut(10, { type: 'glitch', colors: [Q.acc, Q.ink, '#3A3F47'] });
  // the biggest line in silence: the music stops (a tape stop) and the line lands on a flash
  sfx('tapeStop', B[11].t0 - 0.55, -5, { keep: true }); TZ.drop(B[11].t0 - 0.25, B[11].t1 - B[11].t0 + 0.25);
  TZ.cut(11, { type: 'flash', sound: 'hit', db: -6 });
  tcard(G[2], 'DATABASE\nINDEXES', 'new video', { sound: 'boom', db: 0, out: 'flash', size: 1.1 });
  // music in sections (critic round 1: steps must be heard): act 1 -10 dB, act 2 -5, act 3 0, title + end card +4
  const lift = (g, after) => { TZ.music(g.t0, after + 8, 0.03); TZ.music(g.t1, after, 0.05); };   // the cards are the loudest beats (the ducking would hold the bed down)
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0, -3, 0.05); lift(G[0], 0); lift(G[1], 3); lift(G[2], 6);   // round 2: the bed louder (about 12-18 dB under her voice), the cold open loud

  /* ---------- "coming up" label: an SQL comment ---------- */
  // removed (her note 2026-10-17: "please remove the 'new video' tag at the top of the teaser"); kept here switched off
  if (false) TZ.layer(C1, FOOT.dur, (t, r) => {
    const sc_ = SCENES[sceneIndex(t)]; if (sc_ && (sc_.layout === 'insert' || sc_.card)) return;   // the film's screens and the title cards carry their own type
    const ov = ovr('label'); const def = 'Database indexes, explained'; const s2 = ov.s != null ? ov.s : def; if (ov.hide) return;
    const ovA = ovr('label-kicker'), aDef = '-- new video:', a = ovA.hide ? '' : ovA.s != null ? ovA.s : aDef;   // the small yellow part is editable too (her note 2026-10-15)
    const z = PORTRAIT ? px(38) : 36, fa = monoF(z * 0.9), fb = sans(z);
    const wa = tw(a, fa), wb = tw(s2, fb), pad = z * 0.6, gap = z * 0.5, w = wa + gap + wb + pad * 2, h = z * 1.9;
    const x = PORTRAIT ? r.x + (r.w - w) / 2 : 64, y = PORTRAIT ? r.y + (ASPECT === '9x16' ? 170 : px(44)) : 50;
    const p = E.outQuint(prog(t, C1, 0.35));
    moved(ov, () => withA(p, () => {
      ctx.fillStyle = 'rgba(14,16,19,0.86)'; rr(x, y, w, h, 6); ctx.fill(); ctx.strokeStyle = Q.line; ctx.lineWidth = 2; rr(x, y, w, h, 6); ctx.stroke();
      _txt(a, x + pad, y + h * 0.64, fa, Q.acc, 'left'); _txt(s2, x + pad + wa + gap, y + h * 0.66, fb, Q.ink, 'left');
      regBox(ovA, x, y, pad + wa, h, { text: a, def: aDef, label: 'label: small part' }); regBox(ov, x + pad + wa, y, w - pad - wa, h, { text: s2, def });
    }));
  });

  /* ---------- end card: the answer to a query ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, Q.bg);
    const port = PORTRAIT, k = port ? 1 / BASE[0] : 1.3, cw = port ? r.w - px(110) : 1500, x0 = r.x + (r.w - cw) / 2;
    const fm = monoF((port ? 30 : 28) * k), fT = sans((port ? 58 : 60) * k), lh = (port ? 70 : 72) * k;
    const ov = ovr('title'); const ttl = ov.s != null ? ov.s : title;
    const words = ttl.split(/\s+/); const lines = []; let cur = '';
    for (const w of words) { const tst = cur ? cur + ' ' + w : w; if (tw(tst, fT) > cw * (port ? 0.7 : 0.78) && cur) { lines.push(cur); cur = w; } else cur = tst; } if (cur) lines.push(cur);
    const hs = (port ? 120 : 130) * k;
    const blockH = 60 * k + 70 * k + lines.length * lh + 60 * k + 60 * k + hs * 1.3;
    let y = r.y + (r.h - blockH) / 2 + 30 * k;
    const q = "SELECT title, watch FROM videos WHERE channel = '@WithGbemi';"; const nCh = Math.floor(clamp((lt - 0.1) / 0.9) * q.length);
    const qLines = port ? ["SELECT title, watch FROM videos", "WHERE channel = '@WithGbemi';"] : [q];
    let done = 0; qLines.forEach((l, i) => { _txt((i === 0 ? '> ' : '  ') + l.slice(0, Math.max(0, nCh - done)), x0, y + i * 40 * k, fm, Q.dim, 'left'); done += l.length + 1; });
    y += qLines.length * 40 * k + 40 * k;
    const p1 = E.outQuint(prog(lt, 0.1, 0.35));   // the title row at once; the query types above it
    if (p1 > 0) withA(p1, () => {
      ctx.fillStyle = Q.line; ctx.fillRect(x0, y - 4 * k, cw, 2 * k);
      _txt('title', x0, y + 30 * k, fm, Q.dim, 'left'); _txt('watch', x0 + cw, y + 30 * k, fm, Q.dim, 'right');
      ctx.fillRect(x0, y + 48 * k, cw, 2 * k);
      lines.forEach((l, i) => _txt(l, x0, y + 48 * k + lh * (i + 0.95), fT, Q.ink, 'left'));
      regBox(ov, x0, y + 48 * k, cw * 0.8, lh * lines.length + 10, { text: ttl, def: title });
      txt('YouTube', x0 + cw, y + 48 * k + lh * 0.95, sans((port ? 44 : 46) * k), Q.acc, 'right', 'alphabetic', 0, 'where');
      ctx.fillStyle = Q.line; ctx.fillRect(x0, y + 48 * k + lh * lines.length + 26 * k, cw, 2 * k);
      _txt('(1 row) · Index Scan · full video on YouTube', x0, y + 48 * k + lh * lines.length + 70 * k, fm, Q.dim, 'left');
    });
    const p2 = E.outExpo(prog(lt, 2.0, 0.5)); const yh = y + 48 * k + lh * lines.length + 70 * k + hs * 1.35;
    if (p2 > 0) withA(p2, () => txt('@WithGbemi', x0, yh + (1 - p2) * 18, sans(hs, 600), Q.ink, 'left', 'alphabetic', -0.02 * hs, 'handle'));
  }, { ground: 'qpt' });
  const T0 = FOOT.dur;
  sfx('boom', T0 + 0.02, -3, { keep: true }); sfx('typeHit', T0 + 0.15, -6); sfx('cash', T0 + 1.07, -8); sfx('pop', T0 + 2.02, -5);
}

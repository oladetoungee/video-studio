/* phone-distraction TEASER (LinkedIn and X): 14 of her lines; lock-screen grammar re-skinned to the film's "Receipt" palette
 * (2026-10-17: blue #1F3BD6 ground, slot-blue cards, white type, the soft marker as accent, paper flashes; PDX in common.js).
 * No "@WithGbemi" anywhere (her note 2026-10-17). Spec: inspiration/know-how/TEASER-PLAYBOOK.md.
 * Order: countdown (a lock screen clock 0:03 -> 0:01) -> hook (your phone was designed to distract you; the 20 minutes)
 * -> why (you don't pay Instagram; attention is the product; the Stanford class) -> how (unpredictable reward = gambling,
 * no last page, autoplay, red badges, the CHI study, likes) -> her (she left Instagram for six years) -> payoff (your
 * attention is an asset) -> the question ("what exactly can we do about this?") -> end card: a notification for the video.
 * Bites: talking-head.json "teaser" (bite 0 is a silent stretch under the countdown). */
'use strict';
function buildMoment() {
  const B = TZ.bites(); const px = (n) => n / BASE[0]; const P = PDX;
  const IT = (z, w = 700) => `${w} ${z}px "Inter Tight"`;
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide'];
  const talk = (i, from, o = {}) => TZ.talk(i, { frame: FR[i], from, ...o });
  /** a keyword pop shown whole at once (no one-word fragments) */
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });
  /** a notification card (from YouTube, "now") */
  function notif(x, y, w, z, title, body, dry) {
    const pad = z * 0.6, lh = z * 1.22, f = IT(z, 600), lines = []; let cur = '';
    for (const wd of body.split(/\s+/)) { const tst = cur ? cur + ' ' + wd : wd; if (tw(tst, f) > w - pad * 2 && cur) { lines.push(cur); cur = wd; } else cur = tst; } if (cur) lines.push(cur);
    const h = pad * 1.2 + z * 0.9 + lines.length * lh + pad * 0.6; if (dry) return h;
    ctx.fillStyle = P.card; rr(x, y, w, h, z * 0.7); ctx.fill();
    _txt(title, x + pad, y + pad + z * 0.55, IT(z * 0.62, 700), P.text, 'left'); _txt('now', x + w - pad, y + pad + z * 0.55, IT(z * 0.62, 500), P.muted, 'right');
    lines.forEach((l, i) => _txt(l, x + pad, y + pad * 1.2 + z * 0.9 + lh * (i + 0.8), f, P.text, 'left'));
    return h;
  }

  /* ---------- 0 · countdown: the lock screen clock ---------- */
  const C0 = B[0].t0, C1 = B[0].t1;
  TZ.card([C0, C1], (t, r) => {
    rect(r.x, r.y, r.w, r.h, P.ink);
    const port = PORTRAIT, cx = r.x + r.w / 2; const u = clamp((t - C0) / (C1 - C0)); const n = Math.min(3, Math.max(1, 3 - Math.floor(u * 3 - 1e-6)));
    const zc = port ? px(220) : 190, yc = r.y + r.h * (port ? 0.3 : 0.3);
    _txt('new video', cx, yc - zc * 0.86, IT(port ? px(40) : 38, 600), P.muted, 'center');
    _txt('0:0' + n, cx, yc, IT(zc, 250), P.text, 'center', 'alphabetic', -0.03 * zc);
    const pN = E.outQuint(prog(t, C0 + 0.02, 0.3)); const w = port ? r.w - px(60) : 1600, z = port ? px(78) : 96;   // (on screen from frame 1: the topic)
    if (pN > 0) withA(pN, () => withT(0, (1 - pN) * -30, 1, 0, () => notif(cx - w / 2, yc + zc * 0.28, w, z, 'YouTube', 'Why you can’t stop scrolling, and what actually helps')));
  }, { id: 'countdown', ground: 'lockI' });
  [0, 1, 2].forEach(k => sfx('clock', C0 + 0.04 + k * (C1 - C0) / 3, -3)); sfx('notify', C0 + 0.05, -3); sfx('boom', 0.03, -2, { keep: true });

  /* ---------- the bites ---------- */
  // 1 · hook
  talk(1, 0, { push: V([1.12, 1.26], [1.08, 1.2]) });
  kw(TZ.at(1, 'designed to'), B[1].t1 - 0.05, 'designed to ~distract~ you', 'k-distract');
  // 2 · the 20 minutes (the film's lock screen fills with her words)
  const twenty = TZ.at(2, 'and 20 minutes');
  talk(2, 0, { to: twenty - 0.08 - B[2].t0 });
  TZ.insert([twenty - 0.08, B[2].t1], { sync: 'and 20 minutes', after: 0, noCaps: true, enter: 'snap', id: 'i-million' });
  sfx('notify', twenty, -6);
  // 3 · you don't pay Instagram
  TZ.insert([B[3].t0, B[3].t1], { sync: "you don't pay instagram", after: 60, noCaps: true, id: 'i-pay', film: { offset: 1.2 } });
  // 4 · attention is the product (the red ground)
  TZ.insert([B[4].t0, Math.min(B[4].t1, B[4].t0 + 2.3)], { sync: 'so your attention is', after: 90, noCaps: true, enter: 'snap', id: 'i-product' });
  if (B[4].t1 > B[4].t0 + 2.4) talk(4, 2.3);
  // 5 · the Stanford class
  const within = TZ.at(5, 'within weeks');
  const st1 = Math.min(within - 0.08, B[5].t0 + 4.2);
  TZ.insert([B[5].t0, st1], { sync: 'taught a famous class', after: 120, noCaps: true, id: 'i-stanford', film: { offset: 1.2 }, zoom: V(1.4, 1.15), zoomAt: V([0.26, 0.44], [0.5, 0.4]), zoomGround: P.ink });
  talk(5, st1 - B[5].t0, { punch: ['millions'] });
  kw(within, B[5].t1 - 0.05, 'millions of ~users~', 'k-millions');
  // 6 · the unpredictable reward: gambling
  const gam = TZ.at(6, 'it is also the bedrock');
  talk(6, 0, { to: gam - 0.08 - B[6].t0, punch: ['unpredictable'] });
  kw(TZ.at(6, 'unpredictable reward'), gam - 0.3, 'the ~unpredictable~ reward', 'k-reward');
  TZ.talk([gam - 0.08, B[6].t1], { frame: 'close', id: 'gamble-her' });
  { const kt = TZ.at(6, 'gambling'); TH.keyword({ from: gam, to: B[6].t1 - 0.05 }, 'the bedrock of ~gambling~', { id: 'k-gamble', hold: 0.1, times: [kt, kt, kt, kt] }); }
  sfx('cash', gam + 0.6, -10);
  // 7 · no last page
  const intent = TZ.at(7, "and it's intentionally");
  TZ.insert([B[7].t0, intent - 0.06], { sync: 'your feed does not have', after: 350, noCaps: true, enter: 'snap', id: 'i-lastpage', film: { offset: 0.5 }, zoom: V(1.25, 1.1), zoomAt: V([0.42, 0.42], [0.5, 0.45]), zoomGround: P.ink });
  talk(7, intent - 0.06 - B[7].t0);
  // 8 · autoplay: the effort
  talk(8, 0, { punch: ['continue'] });
  kw(TZ.at(8, 'deciding to continue'), B[8].t1 - 0.05, 'deciding to ~continue~', 'k-continue');
  // 9 · blue to red
  const red = TZ.at(9, 'so it was changed');
  talk(9, 0, { to: red - 0.08 - B[9].t0 });
  TZ.insert([red - 0.08, B[9].t1], { sync: 'so it was changed to red', after: 420, noCaps: true, id: 'i-red' });
  sfx('pop', red - 0.04, -4);
  // 10 · the CHI study
  const sym = TZ.at(10, 'the people had');
  TZ.insert([B[10].t0, sym - 0.06], { sync: 'in the week where', after: 450, id: 'i-chi', noCaps: !!visRect(),   // 1:1 / 4:5: the caption would sit on the Week B row (the card spells it)
    zoom: V(1.22, 1.1), zoomAt: V([0.42, 0.32], [0.5, 0.4]), zoomGround: P.ink });
  talk(10, sym - 0.06 - B[10].t0);
  // 11 · likes
  talk(11, 0, { push: V([1.0, 1.12], [1.08, 1.2]) }); sfx('notify', B[11].t0 + 0.6, -6);
  kw(TZ.at(11, "that's intentional"), B[11].t1 - 0.05, 'intentional ~design~', 'k-design');
  // 12 · she left Instagram for six years
  const six = TZ.at(12, 'six');
  talk(12, 0, { to: six - 0.25 - B[12].t0 });
  TZ.talk([six - 0.25, B[12].t1], { frame: 'close', id: 'six-her' });
  TH.keyword({ from: six, to: B[12].t1 - 0.05 }, '~six~ good years', { id: 'k-six', hold: 0.1, times: [six, six, six] });
  sfx('tick', TZ.at(12, 'left') + 0.1, -3);
  // 13 · attention is an asset
  talk(13, 0, { push: V([1.18, 1.32], [1.14, 1.26]) });
  kw(TZ.at(13, 'is an asset'), TZ.at(13, 'and it is') - 0.1, 'your attention is an ~asset~', 'k-asset');
  // 14 · the question
  talk(14, 0, { frame: 'close', punch: ['do'] });


  /* ---------- movie-trailer grammar (her note 2026-10-15): acts, title cards, every join shown ----------
   * hook (1-2) -> card THE PRODUCT -> the business (3-5) -> card THE TRICKS -> the tricks + her story (6-12) -> the music
   * stops for the biggest line (13) -> title card CAN'T STOP SCROLLING (boom) -> the stinger question (14) -> end card. */
  const G = TZ.gaps();
  const tcard = (gp, big, small, o = {}) => TZ.cut(gp, { type: 'card', text: big, sub: small, id: o.id || ('card-' + String(big).replace(/\W+/g, '-').toLowerCase()), sound: o.sound, db: o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: P.paper, frames: 2 },
    draw: (t, r, lt, text, small) => {   // the lock screen: the clock's thin type, the badge red on the last line
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, P.ink);
      const port = PORTRAIT, z0 = Math.min(r.w * (port ? 0.2 : 0.15), r.h * 0.3) * (o.size || 1), cx = r.x + r.w / 2, cy = r.y + r.h * 0.5;
      const sc = 1 + 0.3 * (1 - E.outQuint(clamp(lt / 0.15)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.88) / Math.max(1, tw(l, IT(z0, 800), -0.035 * z0))));
        const y0 = -(lines.length - 1) / 2 * z * 1.0;
        lines.forEach((l, k) => _txt(l, 0, y0 + k * z * 1.0 + z * 0.36, IT(z, 800), k === lines.length - 1 ? P.red : P.text, 'center', 'alphabetic', -0.035 * z));
        _txt(small, 0, y0 - z * 0.62, IT(Math.max(port ? px(36) : 32, z * 0.2), 600), P.muted, 'center');
      });
    } });
  // no risers into the cards (her note 2026-10-18: the long dramatic swell is overused across the teasers)
  // critic round 1: heavier, bigger cards; a 4th card (THE PROOF) splits act 3; max 2 black cuts; whips = opaque red panels
  TZ.cut(1, { type: 'flash', sound: 'boom', db: -3 });
  TZ.cut(2, { type: 'black' });
  tcard(G[0], 'THE\nPRODUCT', 'now', { sound: 'boom', db: -2 });
  TZ.cut(4, { type: 'glitch', colors: [P.red, P.text, P.card] });
  TZ.cut(5, { type: 'whip', color: P.paper });
  tcard(G[1], 'THE\nTRICKS', 'now', { sound: 'boom', db: -2 });
  TZ.cut(7, { type: 'glitch', colors: [P.red, P.text, P.card] });
  TZ.cut(8, { type: 'whip', color: P.paper });
  tcard(G[2], 'THE\nPROOF', 'now', { sound: 'boom', db: -2 });
  TZ.cut(10, { type: 'glitch', colors: [P.red, P.text, P.card] });
  tcard(G[3], 'THE\nCOST', 'now', { sound: 'boom', db: -2 });   // round 2: a card splits act 3
  TZ.cut(12, { type: 'black' });
  sfx('tapeStop', B[13].t0 - 0.55, -5, { keep: true }); TZ.drop(B[13].t0 - 0.25, B[13].t1 - B[13].t0 + 0.25);
  TZ.cut(13, { type: 'flash', sound: 'hit', db: -6 });
  tcard(G[4], "CAN'T STOP\nSCROLLING?", 'new video', { sound: 'boom', db: 0, out: 'black' });
  TZ.drop(B[14].t0 - 0.05, B[14].t1 - B[14].t0 + 0.1);   // the stinger: her question in silence, then the end card hits
  const lift = (g, after) => { TZ.music(g.t0, after + 8, 0.03); TZ.music(g.t1, after, 0.05); };   // the cards are the loudest beats
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0, -4, 0.05); lift(G[0], -1); lift(G[1], 1); lift(G[2], 2); lift(G[3], 3); lift(G[4], 6);

  /* ---------- "coming up" label: a small notification pill with a red badge ---------- */
  // removed (her note 2026-10-17: "please remove the 'new video' tag at the top of the teaser"); kept here switched off
  if (false) TZ.layer(C1, FOOT.dur, (t, r) => {
    const sc_ = SCENES[sceneIndex(t)]; if (sc_ && (sc_.layout === 'insert' || sc_.card)) return;
    const ov = ovr('label'); const def = 'Why you can’t stop scrolling'; const s2 = ov.s != null ? ov.s : def; if (ov.hide) return;
    const z = PORTRAIT ? px(38) : 44, fa = IT(z * 0.86, 600), fb = IT(z, 700), a = 'new video';
    const bd = z * 1.05, wa = tw(a, fa), wb = tw(s2, fb), pad = z * 0.55, gap = z * 0.5, w = bd + gap + wa + gap + wb + pad * 2, h = z * 1.9;
    const x = PORTRAIT ? r.x + (r.w - w) / 2 : 64, y = PORTRAIT ? r.y + (ASPECT === '9x16' ? 170 : px(44)) : 50;
    const p = E.outQuint(prog(t, C1, 0.35));
    moved(ov, () => withA(p, () => withT(0, (1 - p) * -20, 1, 0, () => {
      ctx.fillStyle = 'rgba(29,31,37,0.92)'; rr(x, y, w, h, h / 2); ctx.fill();
      ctx.fillStyle = P.red; ctx.beginPath(); ctx.arc(x + pad + bd / 2, y + h / 2, bd / 2, 0, Math.PI * 2); ctx.fill();
      _txt('1', x + pad + bd / 2, y + h / 2 + z * 0.3, IT(z * 0.75, 700), '#FFFFFF', 'center');
      _txt(a, x + pad + bd + gap, y + h * 0.64, fa, P.muted, 'left'); _txt(s2, x + pad + bd + gap + wa + gap, y + h * 0.65, fb, P.text, 'left');
      regBox(ov, x, y, w, h, { text: s2, def });
    })));
  });

  /* ---------- end card: the lock screen with one notification: the video ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, P.ink);
    const port = PORTRAIT, cx = r.x + r.w / 2, zc = port ? px(230) : 170, yc = r.y + r.h * (port ? 0.32 : 0.34);   // lower than before: the handle line under the cards is gone
    _txt('now', cx, yc - zc * 0.85, IT(port ? px(40) : 38, 600), P.muted, 'center');
    _txt('9:41', cx, yc, IT(zc, 250), P.text, 'center', 'alphabetic', -0.03 * zc);
    const w = port ? r.w - px(120) : 1120, z = port ? px(44) : 54; const ov = ovr('title'); const ttl = ov.s != null ? ov.s : title;
    const y1 = yc + zc * 0.3, h1 = notif(0, 0, w, z, '', ttl, true), wh0 = ovr('where'), wh = wh0.s != null ? wh0.s : 'Full video on YouTube';
    const y2 = y1 + h1 + z * 0.4, h2 = notif(0, 0, w, z * 0.9, '', wh, true), hs = port ? px(104) : 110, yH = y2 + h2 + hs * 1.15;
    const p1 = E.outQuint(prog(lt, 0.3, 0.45)), p2 = E.outQuint(prog(lt, 1.3, 0.45)), p3 = E.outExpo(prog(lt, 2.2, 0.5));
    if (p1 > 0) withA(p1, () => withT(0, (1 - p1) * -40, 1, 0, () => notif(cx - w / 2, y1, w, z, 'New video', ttl)));
    regBox(ov, cx - w / 2, y1, w, h1, { text: ttl, def: title });
    if (p2 > 0 && !wh0.hide) withA(p2, () => withT(0, (1 - p2) * -30, 1, 0, () => notif(cx - w / 2, y2, w, z * 0.9, 'YouTube', wh)));
    regBox(wh0, cx - w / 2, y2, w, h2, { text: wh, def: 'Full video on YouTube' });
    // (no handle line: her note 2026-10-17, no "@WithGbemi" anywhere)
  }, { ground: 'lockI' });
  const T0 = FOOT.dur;
  sfx('boom', T0 + 0.02, -3, { keep: true }); sfx('notify', T0 + 0.32, -4); sfx('notify', T0 + 1.32, -7); sfx('pop', T0 + 2.22, -5);
}

/* dark-patterns TEASER (LinkedIn and X): 13 of her lines (12 since 2026-11-12: the A/B testing line was cut with that part of the video) in the film's look C · BLOWN UP (pink / ink / white, Helvetica Neue heavy + light, the
 * magnifying glass), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer) and the kit's section 4.
 * Order: hook (the "No thanks, I hate saving money" pop-up, DARK PATTERNS big on frame 1) -> act 1 (intentional, the
 * roach motel, not bad design) -> card THE TRICKS -> act 2 (card details, a year's subscription, Snapchat, the timer that
 * restarts) -> card WHY? -> act 3 (a team chasing a number, not what's best for the user, 76 %, the FTC and Amazon) -> the music stops for
 * "we could be sued for this" -> topic card DARK PATTERNS -> stinger ("I'll go over a lot of them") -> end card.
 * No "new video" tag, no riser (one allowed, none used), three-part captions only here (look cap16 'three' for teasers).
 * The Amazon "$2.5 billion" line is not used (her slip is corrected in the full edit; the teaser keeps the FTC line). */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'mid', 'close', 'mid'];
  const talk = (i, from, o = {}) => TZ.talk(i - 1, { frame: FR[i], from, ...o });
  const at = (i, w) => TZ.at(i - 1, w);
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });
  const ins = (a, b, draw, id, ground) => DP.full([a, b], draw, { id, enter: 0.2, capRoom: V(200, 0), ground });

  /* ---------- 1 · hook: the pop-up builds, the topic big on frame 1 ---------- */
  TH.split([B[1].t0, at(1, "there's a name") - 0.05], { her: V(0.42, 0.46), side: V('right', 'bottom'), id: 't-popup', enter: 0.01,
    draw: DP.popup({ at: B[1].t0, offAt: B[1].t0 + 0.3, btnAt: at(1, 'button'), linkAt: at(1, 'no thanks'), lensAt: at(1, 'saving') - 0.3, blockAt: at(1, 'hate') }) });
  TZ.talk([at(1, "there's a name") - 0.05, B[1].t1], { frame: 'close', id: 't-name' });
  const topicEnd = B[1].t0 + 2.6;
  TZ.layer(0, topicEnd, (t, r) => {
    const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT;
    const z = port ? px(130) : 150; const x = port ? r.x + px(40) : 64, y = port ? r.y + px(40) : 60;
    withA(p, () => withT(0, (1 - p) * -40, 1, 0, () => grp('topic', x, y, port ? r.w - px(80) : 1100, z * 1.5, () => {
      const s = 'DARK PATTERNS'; const f = F.disp(z); const w = tw(s, f, -z * 0.03); const k = Math.min(1, ((port ? r.w - px(80) : 1500) - z * 0.5) / w); const ff = F.disp(z * k);
      rect(x, y, tw(s, ff, -z * k * 0.03) + z * k * 0.5, z * k * 1.25, DP.pink); txt(s, x + z * k * 0.25, y + z * k * 0.98, ff, DP.ink, 'left', 'alphabetic', -z * k * 0.03, 'topic'); txt('THE TRICKS APPS USE TO MAKE YOU CLICK YES', x, y + z * k * 1.25 + z * 0.3, F.mono(z * 0.2), DP.ink, 'left', 'alphabetic', 0, 'topic-sub'); })));
  });
  sfx('boom', 0.03, -3, { keep: true });

  /* ---------- act 1 · intentional ---------- */
  talk(2, 0, { punch: ['intentional'] });
  kw(at(2, 'intentional') - 0.05, at(2, 'the dark pattern') - 0.1, '~intentional~', 'k-intentional');
  ins(at(2, 'the dark pattern') - 0.1, B[2].t1, DP.flow({ at: at(2, 'the dark pattern') - 0.1, coinAt: at(2, 'business') }), 'i-business', 'dpInk');
  talk(3, 0, { to: at(3, 'but to cancel') - 0.1 - B[3].t0 });
  ins(at(3, 'but to cancel') - 0.1, B[3].t1, DP.cancel({ at: at(3, 'but to cancel') - 0.4, joinAt: at(3, 'but to cancel') - 0.3, pages: [at(3, 'cancel'), at(3, 'page'), at(3, 'page') + 0.45, at(3, 'page') + 0.9, at(3, 'offers')] }), 'i-cancel');
  talk(4, 0, { punch: ['intentional'] });

  /* ---------- act 2 · the tricks ---------- */
  TZ.talk(4, { frame: 'mid', id: 't-card-details', to: at(5, 'feels easier') - 0.1 - B[5].t0 });
  ins(at(5, 'feels easier') - 0.1, B[5].t1, DP.pic({ key: 'px-5717969', at: at(5, 'feels easier') - 0.1 }), 'i-card');
  talk(6, 0, { punch: ['literally'] });
  talk(7, 0, { to: at(7, 'every time') - 0.1 - B[7].t0 });
  ins(at(7, 'every time') - 0.1, at(7, "i'm this close") - 0.1, DP.nag({ at: at(7, 'every time') - 0.1, asks: [at(7, 'every time'), at(7, 'again'), at(7, 'again') + 0.4] }), 'i-nag');
  TZ.talk([at(7, "i'm this close") - 0.1, B[7].t1], { frame: 'close', id: 't-close' });
  ins(B[8].t0, B[8].t1, DP.timer({ at: B[8].t0 - 2, refreshAt: at(8, 'refresh'), againAt: at(8, 'starts again') }), 'i-timer');

  /* ---------- act 3 · why ---------- */
  talk(9, 0, { to: at(9, 'we want') - 0.1 - B[9].t0, punch: ['number'] });   // "A team is chasing a number..." (right after the WHY? card)
  TH.split([at(9, 'we want') - 0.1, at(9, "so it's") - 0.1], { her: V(0.4, 0.46), side: V('right', 'bottom'), id: 't-chasing', ground: 'dpInk', draw: DP.pic({ key: 'px-1181370', at: at(9, 'we want') - 0.1, fy: 0.4 }) });
  TZ.talk([at(9, "so it's") - 0.1, B[9].t1], { frame: 'close', id: 't-best' });
  ins(B[10].t0, B[10].t1, DP.ring({ at: at(10, '76') - 0.2, pct: 76 }), 'i-76', 'dpInk');
  ins(B[11].t0, B[11].t1, DP.big('ftc-amazon-q1', { at: B[11].t0, hlAt: [at(11, 'without their consent'), at(11, 'made cancelling')], credit: 'FTC press release  ·  17 Sep 2026' }), 't-amazon', 'dpInk');
  talk(12, 0, { push: V([1.2, 1.36], [1.12, 1.26]) });   // the biggest line, in near silence
  kw(at(12, 'sued') - 0.05, B[12].t1 - 0.05, '~sued~', 'k-sued');
  talk(13, 0, { frame: 'mid', punch: ['a lot of them'] });

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: DP.pink, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || DP.ink);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.2 : 0.14), r.h * 0.3);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.84) / Math.max(1, tw(l, F.disp(z0)))));
        const y0 = -(lines.length - 1) / 2 * z * 0.98;
        lines.forEach((l, k) => { const last = k === lines.length - 1; const f = F.disp(z); const w = tw(l, f, -z * 0.03); const yy = y0 + k * z * 0.98 + z * 0.36;
          if (last) { rect(-w / 2 - z * 0.14, yy - z * 0.84, w + z * 0.28, z * 1.06, DP.pink); _txt(l, 0, yy, f, DP.ink, 'center', 'alphabetic', -z * 0.03); } else _txt(l, 0, yy, f, DP.white, 'center', 'alphabetic', -z * 0.03); });
        _mono(small, 0, y0 - z * 0.78, Math.max(port ? px(34) : 32, z * 0.16), '#C9A9B8', 'center', {});
      });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'flash', color: DP.pink });
  TZ.cut(2, { type: 'black' });
  TZ.cut(3, { type: 'whip', color: DP.pink });
  tcard(G[0], 'The\ntricks', 'Eleven of them', { id: 'card-tricks' });
  TZ.cut(5, { type: 'glitch', colors: [DP.pink, DP.white, DP.ink] });
  TZ.cut(6, { type: 'black' });
  TZ.cut(7, { type: 'flash', color: DP.white });
  tcard(G[1], 'Why?', 'It comes down to numbers', { id: 'card-why' });
  TZ.cut(9, { type: 'black' });
  TZ.cut(10, { type: 'glitch', colors: [DP.pink, DP.white, DP.ink] });
  sfx('tapeStop', B[12].t0 - 0.55, -1, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(11, { type: 'black', sound: 'hit', db: -6 });
  tcard(G[2], 'Dark\npatterns', 'Design that tricks you', { id: 'card-topic', db: 0, out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -2); lift(G[1], 0); lift(G[2], 4);

  /* ---------- end card: the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    if (FOOT.ocard) return;   // the "Full video on YouTube" ending (manifest outroCard) covers this card: draw nothing under it (no hidden texts)
    rect(r.x, r.y, r.w, r.h, DP.pink); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const zT = port ? px(100) : 104, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { mono('New on YouTube', x, r.y + (port ? px(150) : 150), port ? px(34) : 34, DP.ink, 'left', { key: 'ec-kicker' });
      txtW(title, x, r.y + (port ? px(150) : 150) + zT * 1.35, F.disp(zT), DP.ink, wT, zT * 1.04, -zT * 0.02, 'ec-title'); });
    const qy = r.y + r.h * (port ? 0.56 : 0.62);
    withA(p2, () => txtW('Which one have you clicked this week?', x, qy, F.body(port ? px(60) : 60, 700), DP.ink, wT, (port ? px(54) : 54) * 1.2, 0, 'ec-question'));
    withA(p3, () => { const zh = port ? px(104) : 100; const s = '@WithGbemi'; const f = F.disp(zh); const w = tw(s, f, -zh * 0.02); const yb = r.y + r.h - m - (port ? px(70) : 60);
      rect(x - zh * 0.12, yb - zh * 0.86, w + zh * 0.24, zh * 1.08, DP.ink); txt(s, x, yb, f, DP.pink, 'left', 'alphabetic', -zh * 0.02, 'ec-handle');
      mono('Full video on YouTube  ·  youtube.com/@WithGbemi', x, r.y + r.h - m, port ? px(40) : 40, DP.ink, 'left', { key: 'ec-url', lower: true }); });
  }, { ground: 'dpPink' });
  const T0 = FOOT.dur; sfx('boom', T0 + 0.02, 0, { keep: true }); sfx('paper', T0 + 0.4, -6); sfx('pop', T0 + 0.7, -4); TZ.music(T0, 8, 0.1);
}

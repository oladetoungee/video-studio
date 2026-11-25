/* doomscrolling TEASER v3 (LinkedIn and X, 2026-11-13): TEASER-PLAYBOOK 0a, plan in teaser/PLAN-v3.md. One story a stranger can
 * follow: the hook kept whole (why it's so hard to stop: no stopping cues) -> the idea (the things she does instead) -> four
 * examples she names, each with a title card (READING / SOMETHING NEW / THRIFTING / CALL YOUR PEOPLE) -> her takeaway "It can never
 * beat genuine connection" (the music stops) -> her "Full video on YouTube" ending (outroCard). Type from the font board: Bricolage
 * Grotesque + DM Mono in indigo on pale lemon (pair-16, combo-09; moments/fontboard.js); panels keep the Offline Bingo look.
 * v2 (18 lines from all over): build/before-fullkit/teaser.js. */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const FB = BG.FB || {}; const LEMON = FB.ground || '#F2F3C4', INDIGO = FB.ink || '#2A1F6E', MID = FB.mid || '#6A63B2';
  const A = FB.A || F.disp, M = FB.M || F.mono;
  const FR = [null, 'mid', 'mid', 'wide', 'mid', 'mid', 'wide', 'mid', 'mid', 'wide', 'mid'];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: V(FR[i], 'wide'), ...o });   // square / 4:5: always wide (captions stay off her face)
  const at = (i, w) => TZ.at(i - 1, w);
  const ins = (a, b, draw, id) => BG.full([a, b], draw, { id, enter: 0.2, capRoom: V(190, 0) });
  const split = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.42, 0.46), side: side || V('right', 'bottom'), id, draw });
  BG.AT = {};
  /* ---------- hook: why it's so hard to stop (one idea, kept whole) ---------- */
  talk(1, { punch: ['stop'] });
  const topicEnd = B[1].t0 + 2.6;
  TZ.layer(0, topicEnd, (t, r) => {   // frame 1: the topic full-frame (indigo on lemon, pair-16) for 1.3 s, then a band that lifts away
    const port = PORTRAIT; const full = t < 1.3; const p = 1 - E.inCubic(prog(t, topicEnd - 0.35, 0.35));
    const bh = full ? r.h : (port ? r.h * 0.3 : r.h * 0.34); const z0 = full ? (port ? px(210) : 210) : (port ? px(120) : 110);
    withA(p, () => withT(0, (1 - p) * -60, 1, 0, () => grp('topic', r.x, r.y, r.w, bh, () => {
      rect(r.x, r.y, r.w, bh, LEMON); const lines = ['STOP', 'DOOMSCROLLING']; const k = Math.min(1, (r.w * 0.88) / tw(lines[1], A(z0))); const z = z0 * k;
      const y0 = r.y + bh / 2 - z * 0.95 + z * 0.78;
      lines.forEach((l, n) => txt(l, r.x + r.w / 2, y0 + n * z * 0.98, A(z), INDIGO, 'center', 'alphabetic', -0.02 * z, 'topic' + n)); })));
  });
  sfx('boom', 0.03, -3, { keep: true });
  const its = at(2, "It's");
  split(B[2].t0, its - 0.1, BG.feed({ at: B[2].t0 + 0.1, flickAt: [at(2, 'pause') - 0.2] }), 't-feed');
  ins(its - 0.1, B[2].t1, BG.cues({ at: its - 0.1, bookAt: at(2, 'chapter') - 0.2, epAt: at(2, 'episode') - 0.2, feedAt: at(2, 'but') - 0.1, noAt: at(2, "doesn't") }), 'i-cues');
  /* ---------- the idea ---------- */
  talk(3, { punch: ['instead'] });

  /* ---------- 1 · reading ---------- */
  split(B[4].t0, at(4, 'wherever') - 0.1, BG.square({ n: 1, img: 'px-book-table', at: B[4].t0, daubAt: at(4, 'book'), name: 'Reading' }), 't-book');
  split(at(4, 'wherever') - 0.1, B[4].t1, BG.pic({ key: 'px-busstop', at: at(4, 'wherever') - 0.1 }), 'i-bus', V('left', 'bottom'));
  /* ---------- 2 · something new: the bike ---------- */
  talk(5, { to: at(5, 'ride') - 0.1 - B[5].t0 });
  split(at(5, 'ride') - 0.1, B[5].t1, BG.pic({ key: 'px-bike', at: at(5, 'ride') - 0.1 }), 't-bike', V('left', 'bottom'));
  talk(6, { to: at(6, 'ride') - 0.1 - B[6].t0 });
  ins(at(6, 'ride') - 0.1, at(6, 'Sometimes') - 0.1, BG.pic({ key: 'px-bike', at: at(6, 'ride') - 0.1, fy: 0.4 }), 'i-ride');
  TZ.talk([at(6, 'Sometimes') - 0.1, B[6].t1], { frame: 'wide', id: 't-riding' });
  /* ---------- 3 · thrifting ---------- */
  split(B[7].t0, B[7].t1, BG.pic({ key: 'px-thrift', at: B[7].t0 + 0.1 }), 't-thrift');
  /* ---------- 4 · call your people + her takeaway ---------- */
  split(B[8].t0, B[8].t1, BG.pic({ key: 'px-chat', at: B[8].t0 + 0.1 }), 't-chat', V('left', 'bottom'));
  split(B[9].t0, B[9].t1, BG.feed({ at: B[9].t0 + 0.1 }), 't-feed2');
  talk(10, { push: V([1.12, 1.24], [1.08, 1.18]) });   // the takeaway, in near silence
  ins(at(10, 'genuine') - 0.3, B[10].t1 + 0.2, BG.pic({ key: 'px-coffee-talk', at: at(10, 'genuine') - 0.3 }), 't-genuine');

  /* ---------- trailer grammar: cards on the gaps (Bricolage indigo on lemon, DM Mono sub), every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: LEMON, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, LEMON);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.2 : 0.14), r.h * 0.3);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.84) / Math.max(1, tw(l, A(z0)))));
        const y0 = -(lines.length - 1) / 2 * z * 0.98;
        lines.forEach((l, k) => _txt(l, 0, y0 + k * z * 0.98 + z * 0.34, A(z), INDIGO, 'center', 'alphabetic', -0.02 * z));
        if (small) _txt(small.toUpperCase(), 0, y0 - z * 0.8, M(Math.max(port ? px(34) : 34, z * 0.16)), MID, 'center', 'alphabetic', 3);
      });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: "flash", color: LEMON });
  TZ.cut(2, { type: "black" });
  tcard(G[0], 'READING', 'Instead of scrolling, 1', { id: 'card-reading' });
  tcard(G[1], 'SOMETHING\nNEW', 'Instead of scrolling, 2', { id: 'card-new' });
  TZ.cut(5, { type: "whip", color: LEMON });
  tcard(G[2], 'THRIFTING', 'Instead of scrolling, 3', { id: 'card-thrift' });
  tcard(G[3], 'CALL YOUR\nPEOPLE', 'Instead of scrolling, 4', { id: 'card-call' });
  TZ.cut(8, { type: "glitch", colors: [LEMON, MID, INDIGO] });
  sfx('tapeStop', B[10].t0 - 0.55, -1, { keep: true }); TZ.drop(B[10].t0 - 0.25, B[10].t1 - B[10].t0 + 0.25);
  TZ.cut(9, { type: "black", sound: 'hit', db: -6 });
  tcard(G[4], 'WHICH ONE\nWOULD YOU TRY?', 'The full list: 9 things', { id: 'card-question', db: 0, out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -3); lift(G[1], -1); lift(G[2], 0); lift(G[3], 2);
  // ending: her "Full video on YouTube" outroCard (manifest), drawn by the studio after FOOT.dur
}

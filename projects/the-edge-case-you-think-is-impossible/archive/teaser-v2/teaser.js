/* edge cases TEASER (LinkedIn and X): 15 of her lines in the film's look B · THE FIELD (lime / ink / white fields, one red),
 * per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer) and the kit's section 4.
 * Order: hook ("someone is going to report an issue", EDGE CASES big on frame 1) -> act 1 (double-click, two hours) -> card
 * DOUBLE ORDERS -> act 2 (charged twice, Starbucks $20, sold an item we do not have) -> card NAMES -> act 3 (Jennifer Null,
 * the NULL plate, a leap day, 3:30 in Tallinn, rejecting names) -> the music stops for "you probably wouldn't ship anything"
 * -> topic card -> stinger ("the same thing can happen in your app") -> end card. No "new video" tag, no riser, no timer.
 * The Azure line used here starts after her "2019" slip (only "2013, and that date doesn't exist"). */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'mid', ...o });
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });
  const ins = (a, b, draw, id, o = {}) => EF.full([a, b], draw, { id, enter: 0.2, ...o });
  const half = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.4, 0.46), side: V(side || 'right', 'bottom'), id, draw });

  /* 1 · hook */
  talk(1, { frame: 'close', to: at(1, 'someone') - 0.1 - B[1].t0 });
  half(at(1, 'someone') - 0.1, B[1].t1, EF.notify({ at: at(1, 'someone'), title: 'Customer charged twice', meta: 'NEW ISSUE' }), 't-issue');
  const topicEnd = B[1].t0 + 2.6;
  TZ.layer(0, topicEnd, (t, r) => { const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT;
    const z = port ? px(130) : 170; const x = port ? r.x + px(40) : 64, y = port ? r.y + px(40) : 60;
    withA(p, () => grp('topic', x, y, port ? r.w - px(80) : 1100, z * 1.5, () => { const s = 'EDGE CASES'; const f = F.disp(z); const w = tw(s, f, -z * 0.03);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 18; txt(s, x, y + z * 0.98, f, EF.lime, 'left', 'alphabetic', -z * 0.02, 'topic'); ctx.restore();
       })); });
  sfx('boom', 0.03, -3, { keep: true });

  /* act 1 */
  ins(B[2].t0, B[2].t1, EF.orders({ presses: [at(2, 'double-click'), at(2, 'double-click') + 0.22, at(2, 'like'), at(2, 'like') + 0.24, at(2, 'like') + 0.48, at(2, 'like') + 0.72, at(2, 'click a lot')], note: 'one customer, [seven] orders', noteAt: at(2, 'lot') }), 'i-orders');
  [0, 0.22].forEach(d => sfx('pop', at(2, 'double-click') + d, -6));
  talk(3, { to: at(3, 'and they') - 0.1 - B[3].t0 });
  TH.split([at(3, 'and they') - 0.1, at(3, "they're not") - 0.1], { her: V(0.4, 0.46), side: V('right', 'bottom'), id: 't-hours', draw: EF.clock({ steps: [[at(3, 'and they') - 0.1, '14:02'], [at(3, 'and they') + 0.3, '14:47'], [at(3, 'and they') + 0.5, '15:31'], [at(3, 'and they') + 0.7, '16:02']] }) });
  TZ.talk([at(3, "they're not") - 0.1, B[3].t1], { frame: 'close', id: 't-users' });
  kw(at(3, 'just being') - 0.05, B[3].t1 - 0.05, 'just being ~users~', 'k-users');

  /* act 2 */
  ins(B[4].t0, at(4, 'and if') - 0.1, EF.lanes({ title: 'Two requests, [two orders]', titleHits: at(4, 'two orders'), at: B[4].t0, a: 'Request 1', b: 'Request 2', target: 'Server', hitA: at(4, 'two requests'), hitB: at(4, 'two requests') + 0.2 }), 'i-two');
  half(at(4, 'and if') - 0.1, B[4].t1, EF.charges({ at: at(4, 'and if'), second: at(4, 'twice') - 0.2, noteAt: at(4, 'twice') }), 't-charges', 'left');
  half(B[5].t0, B[5].t1, EF.stat({ kicker: 'Starbucks gift cards  ·  2015', big: '$15 → $20', at: B[5].t0, small: 'one transfer, sent [twice]', smallHits: at(5, 'ended up'), foot: 'Egor Homakov, sakurity.com' }), 't-gift');
  sfx('cash', at(5, '20'), -5);
  talk(6, { to: at(6, 'and now') - 0.1 - B[6].t0 });

  /* act 3 */
  ins(B[7].t0, B[7].t1, EF.phoneForm({ title: 'Book a flight', at: B[7].t0, fields: [{ label: 'First name', value: 'Jennifer', typeAt: at(7, 'jennifer') - 0.1 }, { label: 'Surname', value: 'Null', typeAt: at(7, 'null'), cps: 10, errAt: at(7, 'surname field'), errText: 'Surname is required.' }] }), 'i-null', { dark: true });
  sfx('error', at(7, 'surname field'), -5);
  half(B[8].t0, at(8, 'then he') - 0.1, EF.plate({ at: B[8].t0 + 0.1, credit: 'Story: Joseph Tartaro (droogie), DEF CON 27, 2019', creditAt: B[8].t0 + 0.2 }), 't-plate');
  ins(at(8, 'then he') - 0.1, B[8].t1, EF.plate({ at: at(8, 'then he') - 0.2, left: true, tickets: [at(8, 'parking'), at(8, 'tickets'), at(8, 'over'), at(8, 'fines'), at(8, 'not his')], finesFrom: at(8, 'over'), finesAt: at(8, 'fines') }), 'i-tickets');
  [at(8, 'parking'), at(8, 'tickets'), at(8, 'over'), at(8, 'fines')].forEach(a => sfx('paper', a, -6));
  talk(9, { frame: 'close' });
  kw(at(9, 'his plate') - 0.05, B[9].t1 - 0.05, 'all on ~his plate~', 'k-plate');
  half(B[10].t0, B[10].t1, EF.leap({ at: B[10].t0, nextAt: B[10].t0 + 0.6, errAt: at(10, "doesn't exist") }), 't-leap', 'left');
  sfx('error', at(10, "doesn't exist"), -5);
  ins(B[11].t0, B[11].t1, EF.clock({ label: 'Tallinn  ·  29 March 2026', steps: [[B[11].t0, '02:59'], [at(11, 'straight'), '04:00', true], [at(11, 'never'), '04:00', true, '3:30 that morning never happened.']] }), 'i-spring');
  talk(12, { frame: 'close' });
  kw(at(12, '3:30') - 0.05, B[12].t1 - 0.05, '3:30 happened ~twice~', 'k-twice');
  half(B[13].t0, B[13].t1, EF.nameLen({ name: 'Adébáyọ̀ Ọláolúwa', typeAt: B[13].t0, letters: 17, bytes: 26, limit: 20, rejectAt: at(13, 'reject') }), 't-name');
  talk(14, { push: V([1.2, 1.36], [1.12, 1.26]) });   // the biggest line, in near silence
  kw(at(14, 'ship') - 0.05, B[14].t1 - 0.05, 'wouldn’t ~ship anything~', 'k-ship');
  talk(15, { frame: 'close', punch: ['app'] });

  /* trailer grammar: cards on the gaps, every join shown */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: EF.lime, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, EF.lime);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => { const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.18 : 0.12), r.h * 0.26);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.8) / Math.max(1, tw(l, F.disp(z0))))); const fw = Math.max(...lines.map(l => tw(l, F.disp(z), -z * 0.03))) + z * 0.7;
        const fh = lines.length * z * 1.02 + z * 0.4; 
        lines.forEach((l, k) => _txt(l, -fw / 2 + z * 0.35, -fh / 2 + z * 0.2 + (k + 0.82) * z * 1.02, F.disp(z), k === lines.length - 1 && o.red ? EF.red : EF.ink, 'left', 'alphabetic', -z * 0.03));
        _mono(small.toUpperCase(), -fw / 2, -fh / 2 - Math.max(port ? px(34) : 32, z * 0.16) * 0.9, Math.max(port ? px(34) : 32, z * 0.16), EF.ink, 'left', {}); });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'flash', color: EF.lime });
  TZ.cut(2, { type: 'black' });
  tcard(G[0], 'DOUBLE\nORDERS', 'Real bug', { id: 'card-double' });
  TZ.cut(4, { type: 'glitch', colors: [EF.lime, EF.red, EF.ink] });
  TZ.cut(5, { type: 'whip', color: EF.lime });
  tcard(G[1], 'NAMES', 'Real bug', { id: 'card-names' });
  TZ.cut(7, { type: 'black' });
  TZ.cut(8, { type: 'flash', color: EF.white });
  TZ.cut(9, { type: 'glitch', colors: [EF.lime, EF.red, EF.ink] });
  TZ.cut(10, { type: 'whip', color: EF.lime });
  TZ.cut(11, { type: 'black' });
  TZ.cut(12, { type: 'flash', color: EF.lime });
  sfx('tapeStop', B[14].t0 - 0.55, -1, { keep: true }); TZ.drop(B[14].t0 - 0.25, B[14].t1 - B[14].t0 + 0.25);
  TZ.cut(13, { type: 'black', sound: 'hit', db: -6 });
  tcard(G[2], 'EDGE\nCASES', 'Eight real bugs', { id: 'card-topic', db: 0, out: 'black', red: true });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -2); lift(G[1], 0); lift(G[2], 4);

  /* end card (2026-11-10: off when the manifest's "Full video on YouTube" outroCard ends the teaser) */
  if (FOOT.m.endCard === false || FOOT.ocard) return;
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, EF.lime); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const zT = port ? px(84) : 96, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { const y0 = r.y + (port ? px(230) : 220); EF.mono('FULL VIDEO ON YOUTUBE', x, y0, port ? px(34) : 34, EF.ink, 'left', 'ec-kicker');
      const tl = title.includes(': ') ? [title.slice(0, title.indexOf(': ') + 1), title.slice(title.indexOf(': ') + 2)] : [title]; tl.forEach((l, i) => txt(l, x, y0 + zT * 1.4 + i * zT * 1.06, F.disp(zT), EF.ink, 'left', 'alphabetic', -zT * 0.02, 'ec-title ' + i)); });
    const qy = r.y + r.h * (port ? 0.56 : 0.62);
    withA(p2, () => txtW('Which edge case did a user find in your app?', x, qy, F.body(port ? px(54) : 54, 800), EF.mid, wT, (port ? px(54) : 54) * 1.2, 0, 'ec-question'));
    withA(p3, () => { const zh = port ? px(100) : 100; const s = '@WithGbemi'; const f = F.disp(zh); const w = tw(s, f, -zh * 0.02); const yb = r.y + r.h - m - (port ? px(70) : 60);
      txt(s, x, yb, f, EF.ink, 'left', 'alphabetic', -zh * 0.02, 'ec-handle');
      EF.mono('youtube.com/@WithGbemi', x, r.y + r.h - m, port ? px(34) : 34, EF.ink, 'left', 'ec-url', 500); });
  }, { ground: 'lime' });
  const T0 = FOOT.dur; sfx('boom', T0 + 0.02, 0, { keep: true }); sfx('paper', T0 + 0.4, -6); sfx('pop', T0 + 0.7, -4); TZ.music(T0, 8, 0.1);
}

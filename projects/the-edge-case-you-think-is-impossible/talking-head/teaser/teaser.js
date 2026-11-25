/* edge cases TEASER v3 (LinkedIn and X, 2026-11-12): one small story a stranger can follow, in the film's look
 * B · THE FIELD (lime / ink / white fields, one red), per inspiration/know-how/TEASER-PLAYBOOK.md section 0a (v3) with the
 * trailer grammar of section 0 (cuts shown, title cards on the gaps, music in sections). Plan: teaser/PLAN-v3.md.
 * Order: hook (real users ... "they are just being users", EDGE CASES big on frame 1) -> the idea ("someone is going to report
 * an issue") -> card DUPLICATE ORDERS -> the double order -> card RACE CONDITIONS -> what it is + the last item sold twice ->
 * card NAMES -> Jennifer Null -> card DAYLIGHT SAVING -> Tallinn's 3:30 that never happened + the 3:30 report that never runs ->
 * close ("you probably wouldn't ship anything", the music stops) -> stinger "What do we do about this?" -> the outroCard
 * (manifest top level). v2 is in ../../archive/teaser-v2/. */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'mid', ...o });
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });
  const ins = (a, b, draw, id, o = {}) => EF.full([a, b], draw, { id, enter: 0.2, ...o });
  const half = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.4, 0.46), side: V(side || 'right', 'bottom'), id, draw });

  /* 1 · hook: real users (one stretch, kept whole) */
  const b1 = (w) => at(1, w);
  const dc = b1('double-click'), like = b1('like');
  talk(1, { frame: 'close', to: like - 0.1 - B[1].t0 });
  const topicEnd = like - 0.1;
  TZ.layer(0, topicEnd, (t, r) => { const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT;
    const z = port ? px(130) : 170; const x = port ? r.x + px(40) : 64, y = port ? r.y + px(40) : 60;
    withA(p, () => grp('topic', x, y, port ? r.w - px(80) : 1100, z * 1.5, () => { const s = 'EDGE CASES'; const f = F.disp(z);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 18; txt(s, x, y + z * 0.98, f, EF.lime, 'left', 'alphabetic', -z * 0.02, 'topic'); ctx.restore(); })); });
  sfx('boom', 0.03, -3, { keep: true });
  ins(like - 0.1, b1('network') - 0.1, EF.orders({ presses: [dc, dc + 0.22, like, like + 0.24, like + 0.48, like + 0.72, b1('click a lot')], tab: b1('tabs') - 0.2, note: 'one customer, [seven] orders', noteAt: b1('lot') }), 'i-orders');
  [dc, dc + 0.22, like, like + 0.24, like + 0.48, like + 0.72].forEach((a, i) => sfx(i % 2 ? 'tick' : 'pop', a, -6));
  talk(1, { from: b1('network') - 0.1 - B[1].t0, to: b1('leave') - 0.1 - B[1].t0 });
  TH.tile([b1('network') - 0.1, b1('leave') - 0.1], { at: V('br', 'br'), w: V(560, 420), id: 't-network', draw: EF.pic({ key: 'px_4559756', at: b1('network') - 0.1, fx: 0.62, fy: 0.3, over: (t, r) => { const u = efU(r); EF.signal(t, r.x + r.w * 0.08, r.y + r.h * 0.1, 120 * u, { dropAt: b1('drop') - 0.3 }); } }) });
  sfx('error', b1('drop') + 0.5, -8);
  const lv = b1('leave');
  half(lv - 0.1, b1("they're not") - 0.1, EF.clock({ steps: [[lv - 0.1, '14:02'], [b1('two hours') - 0.4, '14:47'], [b1('two hours') - 0.2, '15:31'], [b1('two hours'), '16:02']] }), 't-hours');
  sfx('tick', b1('two hours'), -6);
  TZ.talk([b1("they're not") - 0.1, B[1].t1], { frame: 'close', id: 't-users' });
  kw(b1('just being') - 0.05, B[1].t1 - 0.05, 'just being ~users~', 'k-users');

  /* 2 · the idea, in one statement */
  TH.ots([B[2].t0, at(2, 'exactly') - 0.1], { side: 'auto', w: V(780, undefined), id: 't-issue', draw: EF.notify({ at: B[2].t0 + 0.15, title: 'Customer charged twice', meta: 'NEW ISSUE' }) });
  sfx('pop', B[2].t0 + 0.2, -5);
  TZ.talk([at(2, 'exactly') - 0.1, B[2].t1], { frame: 'close', push: V([1.5, 1.66], [1.3, 1.42]), id: 't-never' });

  /* 3 · DUPLICATE ORDERS (she names it, then the online shop) */
  const b3 = (w) => at(3, w);
  talk(3, { to: b3('if for example') - 0.1 - B[3].t0, push: V([1.22, 1.4], [1.16, 1.3]) });
  half(b3('if for example') - 0.1, b3('now our server') - 0.1, EF.order({ presses: [b3('place order'), b3('again')], loadAt: b3('slow') - 0.6 }), 't-place');
  sfx('pop', b3('place order'), -4); sfx('pop', b3('again'), -4);
  ins(b3('now our server') - 0.1, b3('and if we') - 0.1, EF.lanes({ at: b3('now our server') - 0.1, a: 'Request 1', b: 'Request 2', target: 'Server', hitA: b3('two requests'), hitB: b3('two requests') + 0.2, result: [{ s: 'Order #1041  ·  Order #1042', at: b3('creates') }] }), 'i-two');
  half(b3('and if we') - 0.1, B[3].t1, EF.charges({ at: b3('and if we'), second: b3('twice') - 0.2, noteAt: b3('twice') }), 't-charges', 'left');
  sfx('cash', b3('twice'), -5);

  /* 4-5 · RACE CONDITIONS: what it is, then the last item in stock sold twice */
  const rc2 = TH.timeOf('a race condition is', { t0: B[4].t0, t1: B[4].t1 });
  talk(4, { frame: 'close', to: rc2 - 0.1 - B[4].t0 });
  half(rc2 - 0.1, B[4].t1, EF.lanes({ at: rc2 - 0.1, a: 'Thing 1', b: 'Thing 2', target: 'Your code', targetSub: 'expects one, then the other', hitA: at(4, 'same time'), hitB: at(4, 'one after') }), 't-race');
  const tp = at(5, 'two people');
  const lanesB = EF.lanes({ at: B[5].t0 + 0.1, a: 'Buyer A', b: 'Buyer B', target: '1 left', targetSub: 'both see it', hitA: at(5, 'click buy'), hitB: at(5, 'click buy') + 0.06, result: [{ s: 'Order confirmed  ·  Order confirmed', at: at(5, 'both create') }] });
  half(B[5].t0, tp - 0.1, lanesB, 't-stock', 'right');
  ins(tp - 0.1, at(5, 'both see') - 0.1, lanesB, 'i-one-left');
  half(at(5, 'both see') - 0.1, at(5, 'and now') - 0.1, lanesB, 't-one-left', 'left');
  TZ.talk([at(5, 'and now') - 0.1, B[5].t1], { frame: 'close', punch: ['have'], id: 't-sold' });
  sfx('error', at(5, 'sold'), -6);

  /* 6-7 · NAMES: the BBC story she names, then the booking form (6 -> 7 joins at the full edit's pause cut, under the graphics) */
  ins(B[6].t0, B[6].t1, EF.src('bbc-head', { bg: EF.night, at: B[6].t0 + 0.05, credit: false, maxW: 1300 }), 'i-bbc', { dark: true });
  sfx('paper', B[6].t0 + 0.1, -6);
  const b7 = (w) => at(7, w);
  ins(B[7].t0, b7('the website') - 0.1, (t, r) => { const u = efU(r); const wide = r.w > r.h * 1.2; efBg(r, EF.night);
    EF.phoneForm({ title: 'Book a flight', at: B[7].t0 - 0.1, fields: [{ label: 'First name', value: 'Jennifer', typeAt: b7('jennifer') - 0.1 }, { label: 'Surname', value: 'Null', typeAt: b7('null'), cps: 10, errAt: b7('surname field'), errText: 'Surname is required.' }] })(t, wide ? { x: r.x, y: r.y, w: r.w * 0.45, h: r.h } : { x: r.x, y: r.y, w: r.w, h: r.h * 0.62 });
    EF.clip(t, 'bbc-jn', wide ? r.x + r.w * 0.47 : r.x + 60 * u, wide ? r.y + r.h * 0.34 : r.y + r.h * 0.64, wide ? r.w * 0.49 : r.w - 120 * u, { at: b7('her surname') - 0.3, hlAt: [b7('her surname') + 0.5], credit: false }); }, 'i-null', { dark: true });
  sfx('error', b7('surname field'), -5);
  TZ.talk([b7('the website') - 0.1, B[7].t1], { frame: 'close', id: 't-empty' });
  TH.glitch(b7('name null') + 0.2, { text: 'NULL' });

  /* 8-10 · DAYLIGHT SAVING: she names it, Tallinn on 29 March, then what it breaks (the 3:30 report) */
  const b9 = (w) => at(9, w), b10 = (w) => at(10, w);
  talk(8, { frame: 'mid', push: V([1.22, 1.36], [1.16, 1.26]) });
  talk(9, { frame: 'close', to: b9('the clocks') - 0.1 - B[9].t0 });
  TH.tile([B[9].t0, b9('the clocks') - 0.1], { at: V('br', 'br'), w: V(560, 420), id: 't-tallinn', draw: EF.pic({ key: 'px_35838020', at: B[9].t0, fy: 0.6, over: (t, r) => withA(efE(t, B[9].t0 + 0.2, 0.4), () => { const u = efU(r); EF.capTxt('TALLINN, ESTONIA', r.x + 60 * u, r.y + 100 * u, F.mono(Math.max(32, 34 * u)), '#FFFFFF', 'left'); }) }) });
  ins(b9('the clocks') - 0.1, B[9].t1, EF.clock({ label: 'Tallinn  ·  29 March 2026', steps: [[b9('the clocks') - 0.1, '02:59'], [b9('straight'), '04:00', true], [b9('never'), '04:00', true]] }), 'i-spring');
  sfx('tick', b9('straight'), -4);
  half(B[10].t0, B[10].t1, EF.clock({ label: 'Tallinn  ·  29 March 2026', steps: [[B[10].t0, '04:00', true]], job: { at: b10('sales report') - 0.2, s: 'Daily sales report, 03:30', state: [[b10('one day') - 0.1, 'DID NOT RUN', true]] } }), 't-report', 'left');
  sfx('pop', b10('sales report') - 0.2, -6); sfx('error', b10('one day') - 0.1, -5);

  /* 11 · close: the takeaway, the music stops for the last line */
  const ifw = at(11, 'if you want');
  const bec = at(11, 'because');
  talk(11, { frame: 'close', to: bec - 0.1 - B[11].t0, push: V([1.3, 1.4], [1.2, 1.28]) });
  TZ.talk([bec - 0.1, ifw - 0.1], { frame: 'mid', push: V([1.16, 1.26], [1.1, 1.18]), id: 't-predict' });
  TZ.talk([ifw - 0.1, B[11].t1], { frame: 'mid', push: V([1.2, 1.36], [1.12, 1.26]), id: 't-ship' });
  kw(at(11, 'ship') - 0.05, B[11].t1 - 0.05, 'wouldn’t ~ship anything~', 'k-ship');

  /* 12 · stinger: her question, answered only in the full video */
  TZ.talk([B[12].t0, B[12].t1], { frame: 'tight', punch: ['this'], id: 't-question' });

  /* trailer grammar: a title card per example on the gaps, every join shown */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: o.outOpts || { color: EF.lime, frames: 2 },
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
  TZ.cut(1, { type: 'flash', color: EF.lime });                                    // hook -> the idea
  tcard(G[0], 'DUPLICATE\nORDERS', 'Edge case 01', { id: 'card-double' });
  tcard(G[1], 'RACE\nCONDITIONS', 'Edge case 02', { id: 'card-race', out: 'black', sound: 'hit' });
  TZ.cut(4, { type: 'whip', color: EF.lime });                                      // the definition -> the last item
  tcard(G[2], 'NAMES', 'Edge case 03', { id: 'card-names', outOpts: { color: EF.white, frames: 2 } });
  tcard(G[3], 'DAYLIGHT\nSAVING', 'Edge case 04', { id: 'card-clock', out: 'black', sound: 'hit', red: true });
  TZ.cut(8, { type: 'flash', color: EF.white });                                   // "time zones and daylight saving" -> Tallinn
  TZ.cut(9, { type: 'whip', color: EF.lime });                                     // the clocks -> the 3:30 report
  TZ.cut(10, { type: 'glitch', colors: [EF.lime, EF.red, EF.ink] });               // the report -> the takeaway
  TZ.cut(11, { type: 'black', sound: 'hit', db: -4 });                             // the takeaway -> her question
  sfx('tapeStop', ifw - 0.55, -1, { keep: true }); TZ.drop(ifw - 0.25, B[11].t1 - ifw + 0.25); TZ.music(B[12].t0, 2, 0.05);

  /* music in sections: up on frame 1, under the hook, a lift at each card, fuller towards the close */
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -4); lift(G[1], -3); lift(G[2], -2); lift(G[3], 0);
}

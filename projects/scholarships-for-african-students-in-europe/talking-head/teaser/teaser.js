/* scholarships TEASER (LinkedIn and X): 17 of her lines in the NOW BOARDING look, per TEASER-PLAYBOOK (v2 movie trailer).
 * Order: hook (deadlines already passing; the topic in flaps on frame 1) -> how they work (order, fully funded) -> Erasmus
 * Mundus (anyone, what it covers, €1,400) -> the countries (Sweden, the Netherlands, Hungary, Estonia, the UK) -> what to do
 * (a year early, one letter per programme) -> the music drops for "apply only on the official website" -> "I'm rooting for
 * you" -> end card (title, the question only the video answers, @WithGbemi). No "new video" tag. No timer. */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()]; const px = (n) => n / BASE[0];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'mid', ...o });
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });
  const ins = (i, scene, sync, o = {}) => TZ.insert([o.from != null ? o.from : B[i].t0, B[i].t1], { sync, id: 'i-' + scene, scene, film: { scene }, noCaps: o.noCaps !== false, enter: o.enter });   // the film spells her words on its inserts: captions step aside
  const city = (i, name, title, side) => TH.presenter([B[i].t0, B[i].t1], { side, id: 'c-' + name, gr: [0, 0, W, H], draw: SC.city(name, title, { at: B[i].t0, side, dur: 6 }) });

  /* 1 · hook: the topic in flaps on frame 1, then the board on "some deadlines" */
  const tSome = TZ.at(0, 'some scholarship');
  talk(1, { to: tSome - 0.1 - B[1].t0, push: V([1.06, 1.16], [1.04, 1.12]) });
  TZ.layer(0, tSome - 0.1, (t, r) => {   // the topic in huge League Gothic (type set 06), on a graphite block beside her
    const port = PORTRAIT, z = port ? px(150) : 190, lines = ['SCHOLARSHIPS', 'IN EUROPE', '2027'];
    const x = port ? r.x + px(56) : 64, y0 = port ? r.y + r.h - px(330) - 3 * z * 0.86 : 70; const wB = port ? r.w - px(112) : 820;
    const p = ez(t, 0.0, 0.35); withA(p, () => { themeFixed(() => rect(x - 24, y0 - 24, wB + 48, 3 * z * 0.86 + 40, 'rgba(27,29,33,0.94)'));
      lines.forEach((l, i) => withA(ez(t, 0.05 + i * 0.12, 0.3), () => txt(l, x, y0 + z * 0.72 + i * z * 0.86, F.disp(z / 1.3), NB.let, 'left', 'alphabetic', 0, 'topic ' + i))); });
  });
  sfx('flap', 0.05, -4, { keep: true }); sfx('flapEnd', 0.75, -3, { keep: true });
  ins(1, 'board', 'some scholarship deadlines have already passed', { from: tSome - 0.1, enter: 'snap' });

  /* how they work */
  talk(2, { frame: 'close', punch: ['order'] }); kw(TZ.at(1, 'order'), B[2].t1 - 0.05, 'the ~order~', 'k-order');
  ins(3, 'cover', 'a fully funded scholarship');

  /* Erasmus Mundus */
  city(4, 'brussels', 'ERASMUS MUNDUS', 'right');
  ins(5, 'em-covers', 'it covers your participation cost', { noCaps: true });
  ins(6, 'em-1400', 'the living allowance is 1,400 euros');
  talk(7, { frame: 'close' }); kw(TZ.at(6, 'every year'), B[7].t1 - 0.05, '~every year~?', 'k-every');

  /* the countries */
  city(8, 'stockholm', 'SWEDEN', 'left');
  ins(9, 'nl-city', 'it ended in 2024');
  ins(10, 'nl-gate', 'it\'s for students from outside the eea');
  ins(11, 'hu-status', 'the last round closed');
  talk(12, { frame: 'close' }); kw(TZ.at(11, 'early enough'), B[12].t1 - 0.05, '~early~', 'k-early');
  city(13, 'tallinn', 'ESTONIA', 'right');
  talk(14, { frame: 'close', punch: ['really well'] });

  /* what to do */
  talk(15, { frame: 'mid', push: V([1.0, 1.12], [1.0, 1.1]) }); kw(TZ.at(14, 'a year'), B[15].t1 - 0.05, '~a year~ before', 'k-year');
  talk(16, { frame: 'close' }); kw(TZ.at(15, 'same letter'), B[16].t1 - 0.05, '~same letter~?', 'k-letter');
  sfx('tapeStop', B[17].t0 - 0.5, -1, { keep: true }); TZ.drop(B[17].t0 - 0.25, B[17].t1 - B[17].t0 + 0.25);
  ins(17, 'official', 'apply only on the official websites', { noCaps: true, enter: 'snap' });
  talk(18, { frame: 'close', push: V([1.1, 1.2], [1.06, 1.14]) });

  /* every join shown (trailer grammar), in the board's colours */
  const cuts = [[4, 'whip'], [8, 'whip'], [12, 'whip'], [16, 'glitch']];   // a few visible joins, the rest hard cuts (critic: no blank / cream frames)
  for (const [i, type] of cuts) TZ.cut(i - 1, type === 'glitch' ? { type, colors: [NB.go, NB.let, NB.ground] } : type === 'flash' || type === 'whip' ? { type, color: type === 'flash' ? NB.let : NB.ground } : { type });
  TZ.music(0, 4, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4); TZ.music(B[8].t0, -2, 0.3); TZ.music(B[18].t0, 2, 0.2);

  /* end card: the title, the question only the video answers, where to watch */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, NB.ground); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p2 = E.outQuint(prog(lt, 0.5, 0.4)), p3 = E.outQuint(prog(lt, 0.8, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const x = r.x + m, wT = r.w - 2 * m; const zT = port ? px(120) : 120;
    lab('Full video on YouTube', x, r.y + (port ? px(150) : 140), port ? px(34) : 34, NB.dim, 'left', { key: 'ec-kicker' });
    const n = 16, cw = Math.min(port ? px(56) : 56, wT / n / 1.09), ch = Math.round(cw * 1.72);
    flaps(t, { x, y: r.y + (port ? px(190) : 170), n, cw, ch, text: 'NOW BOARDING', key: 'ec-flap', t0: FOOT.dur + 0.05, stag: 0.03 });
    txtW(title, x, r.y + (port ? px(190) : 170) + ch + zT * 1.1, F.disp(zT), NB.let, wT, zT * 1.0, 0, 'ec-title');
    withA(p2, () => txtW('Which scholarships can you still apply for this year?', x, r.y + r.h * (port ? 0.6 : 0.66), F.body(port ? px(52) : 52), NB.dim, wT, (port ? px(52) : 52) * 1.2, 0, 'ec-question'));
    withA(p3, () => { txt('@WithGbemi', x, r.y + r.h - m - (port ? px(60) : 50), F.disp(port ? px(104) : 100), NB.let, 'left', 'alphabetic', 0, 'ec-handle'); });
  }, { ground: 'term' });
  const T0 = FOOT.dur; sfx('flap', T0 + 0.05, -4, { keep: true }); sfx('flapEnd', T0 + 0.6, -2, { keep: true }); TZ.music(T0, 6, 0.1);
}

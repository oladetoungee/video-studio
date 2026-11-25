/* learn-to-code TEASER (LinkedIn and X): 13 of her lines in her pick B · YOU ARE THE REVIEWER (grey ground, white review
 * sheets, diff green / red, amber = you), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer) and the kit's section 4.
 * Order: cold open (junior roles are very rare; the topic big on frame 1 as a review sheet) -> the numbers (Indeed: 4.5 %, the
 * missing rung) -> card AI WRITES THE CODE -> act 1 (a lot of code nobody reads, the crash, the try-catch "fix") -> card
 * WHO CHECKS IT? -> act 2 (the same payment twice, the pharmacy, the people who know the business, still worth it) -> the
 * music stops for her promise line -> topic card -> stinger (is there even a point anymore?) -> end card.
 * No "new video" tag, no riser; captions = the playbook's teaser style (TH.post untouched for teasers). */
'use strict';
function buildMoment() {
  RV.q = [];
  const B = [null, ...TZ.bites()], Gp = TZ.gaps(); const px = (n) => n / BASE[0];
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'close', 'wide', 'mid', 'close', 'mid', 'wide', 'close', 'mid', 'close'];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: FR[i], ...o });
  const at = (i, w) => TZ.at(i - 1, w);
  const span = (i, a, b) => [a == null ? B[i].t0 : at(i, a) - 0.12, b == null ? B[i].t1 : at(i, b)];
  const half = (sp, draw, id) => TH.split(sp, { her: V(0.42, 0.46), side: V('right', 'bottom'), id, draw });
  const full = (sp, draw, id, o = {}) => RV.full(sp, (t, r) => draw(t, TZ.vis()), { id, enter: 0, ...o });
  talk(1, { push: V([1.06, 1.18], [1.04, 1.14]) }); talk(4, { frame: 'close' }); talk(12, { frame: 'mid', push: V([1.1, 1.26], [1.06, 1.2]) }); talk(13, { frame: 'close' });

  /* ---------- cold open: the topic on frame 1, as a review sheet ---------- */
  TZ.layer(0, B[1].t0 + 3.2, (t, r) => {
    const p = 1 - E.inCubic(prog(t, B[1].t0 + 2.9, 0.3)); const port = PORTRAIT;
    const z = port ? px(100) : 112, w = port ? r.w - px(80) : 1080, x = port ? r.x + px(40) : 70, hd = 64, h = z * 2.5 + hd + 40, y = port ? r.y + r.h - h - px(320) : 70;
    withA(p, () => grp('topic', x, y, w, h, () => {
      rect(x, y, w, h, RV.wh); rvLine(x, y, w, h); rect(x, y, w, hd, RV.ink);
      txt('learning-to-code.md', x + 26, y + hd * 0.66, FM(port ? px(34) : 32, 600), RV.wh, 'left', 'alphabetic', 0, 'topic-file');
      RV.words(t, 'SHOULD YOU STILL', x + 30, y + hd + 20 + z * 0.86, z, RV.ink, { times: [0.05, 0.2, 0.35], amb: [1], key: 'topic-0' });
      RV.words(t, 'LEARN TO CODE?', x + 30, y + hd + 20 + z * 1.9, z, RV.ink, { at: 0.55, key: 'topic-1', cont: true, w: 300 });
    }));
  });
  TH.capOff.push([0, B[1].t0 + 3.2]);
  sfx('typeHit', 0.06, -1, { keep: true }); sfx('typeHit', 0.56, 0, { keep: true });

  /* ---------- the numbers ---------- */
  full(span(2, 'only'), RV.page('ind-45', { t0: at(2, 'only') - 0.2, hl: at(2, '45'), big: { s: '4.5%', at: at(2, '45'), col: RV.delI }, capRoom: V(170, 330) }), 'z-45');
  half(span(3), RV.ladder({ at: B[3].t0 - 0.1, title: [{ s: 'JUNIOR DEVELOPER?', times: [at(3, 'junior'), at(3, 'developer')] }], high: ['SENIOR', '69.3%'], highAt: B[3].t0 + 0.3, low: ['ENTRY LEVEL', '4.5%'], dropAt: at(3, "doesn't exist"), lx: 0.12 }), 'z-ladder');

  /* ---------- act 1 · AI writes the code ---------- */
  half(span(5), RV.sheet({ file: 'new-feature.js', tag: 'written by AI', fs: V(40, 36), at: B[5].t0 - 0.1,
    lines: ['export async function checkout(cart) {', '  const total = sumPrices(cart.items)', '  const order = await db.orders.create(cart)', '  await payments.charge(order.id, total)', '  return order', '}'].map((x, i) => ({ s: x, k: ' ', at: B[5].t0 + i * 0.3 })),
    status: { l: 'written: yes', r: 'read: not yet', at: at(5, 'not even') } }), 'z-notread');
  full(span(6), RV.night(RV.sheet({ file: 'signup.js', fs: V(50, 42), at: B[6].t0 - 0.1, lines: RV_CODE0, err: { s: RV_ERR, at: at(6, 'crashes') }, capRoom: V(150, 300) })), 'z-crash');
  full(span(7), RV.night(RV.sheet({ file: 'signup.js', tag: 'suggested by AI', fs: V(46, 40), at: B[7].t0 - 0.1, capRoom: V(150, 300),
    lines: [RV_CODE0[0], { s: '  await db.insert(user)', k: '-', at: B[7].t0, noType: true, strikeAt: at(7, 'wrap') }, { s: '  try { await db.insert(user) }', k: '+', at: at(7, 'trycatch') }, { s: '  catch (e) { }', k: '+', at: at(7, 'trycatch') + 0.5 }, RV_CODE0[2], RV_CODE0[3]],
    err: { s: RV_ERR, at: B[7].t0 - 0.1, goneAt: at(7, 'goes away') } })), 'z-trycatch');

  /* ---------- act 2 · who checks it ---------- */
  full(span(8), RV.night(RV.flow({ at: B[8].t0 - 4, sendAt: B[8].t0 - 3, againAt: at(8, 'the same') - 0.3 })), 'z-twice');
  half(span(9), RV.shelf({ at: B[9].t0 - 0.1, firstAt: at(9, 'expires first'), batchAt: at(9, 'newer stock') }), 'z-shelf');
  TH.tile(span(10), { at: V('br', 'br'), w: V(480, 420), id: 'z-business', draw: RV.photo('px_meeting', { at: B[10].t0 - 0.1, credit: 'Christina Morillo', labelAt: at(10, 'know the business') }) });
  full(span(11), RV.type({ size: V(190, 150), lines: [{ s: 'STILL WORTH IT.', times: [at(11, 'still'), at(11, 'worth'), at(11, 'it')], cols: { 1: RV.addI, 2: RV.addI } }], stamp: { s: 'APPROVED', at: at(11, 'it') + 0.15 } }), 'z-worth', { hold: 0.3 });

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'typeHit', db: o.db == null ? 3 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: RV.amb, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || RV.g);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.5; const sc = 1 + 0.06 * (1 - E.outQuint(clamp(lt / 0.22)));
      const cw = Math.min(r.w * (port ? 0.88 : 0.64), port ? px(960) : 1200); const lines = RV.sc(text.replace(/\n/g, ' \u0001 ')).split(' \u0001 '); const hd = port ? px(70) : 66;
      const z0 = Math.min(cw * 0.16, r.h * 0.2); const z = Math.min(z0, ...lines.map(l => z0 * (cw * 0.86) / Math.max(1, tw(l, FO(z0, 800)))));
      const ch = hd + z * (lines.length * 1.04 + 0.6) + 30;
      withT(cx, cy, sc, 0, () => {
        rect(-cw / 2, -ch / 2, cw, ch, RV.wh); rvLine(-cw / 2, -ch / 2, cw, ch); rect(-cw / 2, -ch / 2, cw, hd, RV.ink);
        _txt(small.toUpperCase(), -cw / 2 + 30, -ch / 2 + hd * 0.66, FM(port ? px(34) : 32, 500), RV.wh, 'left', 'alphabetic', 4);
        lines.forEach((l, k) => _txt(l, -cw / 2 + 40, -ch / 2 + hd + 20 + (k + 0.85) * z * 1.04, FO(z, k ? 300 : 700), k === lines.length - 1 ? (o.last || RV.addI) : RV.ink, 'left', 'alphabetic', -z * 0.045));
      });
    } });
  for (const g of Gp) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'black' });
  TZ.cut(2, { type: 'flash', color: RV.wh });
  tcard(Gp[0], 'AI WRITES\nTHE CODE.', 'act 1 · reading code', { id: 'card-ai' });
  TZ.cut(4, { type: 'black' });
  TZ.cut(5, { type: 'glitch', colors: [RV.delI, RV.addI, RV.ink] });
  TZ.cut(6, { type: 'flash', color: RV.wh });
  tcard(Gp[1], 'WHO CHECKS\nIT?', 'act 2 · you, reviewing', { id: 'card-who', last: RV.ink });
  TZ.cut(8, { type: 'whip', color: RV.g });
  TZ.cut(9, { type: 'black' });
  TZ.cut(10, { type: 'glitch', colors: [RV.amb, RV.addI, RV.ink] });
  sfx('tapeStop', B[12].t0 - 0.55, -1, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(11, { type: 'black', sound: 'hit', db: -6 });
  tcard(Gp[2], 'LEARN\nTO CODE?', 'should you still', { id: 'card-topic', ground: RV.ink, db: 6, out: 'black', last: RV.delI });
  TZ.cut(12, { type: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(Gp[0], -3); lift(Gp[1], 0); lift(Gp[2], 3);

  /* ---------- end card: the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, RV.g); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const zT = port ? px(96) : 92, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { txt('ON YOUTUBE NOW', x, r.y + (port ? px(150) : 140), FM(port ? px(34) : 34, 700), RV.dim, 'left', 'alphabetic', 2, 'ec-kicker');
      txtW(title, x, r.y + (port ? px(150) : 140) + zT * 1.3, FO(zT, 800), RV.ink, wT, zT * 1.04, 0, 'ec-title'); });
    const qy = r.y + r.h * (port ? 0.56 : 0.6);
    withA(p2, () => { const qz = port ? px(50) : 50; const qw = Math.min(wT, port ? wT : 1100); const qh = qz * 1.25 * 2 + qz * 1.9;
      grp('ec-q', x, qy - qz * 1.5, qw, qh, () => { rect(x, qy - qz * 1.5, qw, qh, RV.amb); rvLine(x, qy - qz * 1.5, qw, qh); txt('YOU', x + 26, qy - qz * 0.55, FM(32, 700), RV.ink, 'left', 'alphabetic', 0, 'ec-you');
        txtW('If you were starting from zero today, would you still learn to code?', x + 26, qy + qz * 0.55, FO(qz, 700), RV.ink, qw - 52, qz * 1.25, 0, 'ec-question'); }); });
    withA(p3, () => { const zh = port ? px(100) : 96; txt('@WithGbemi', x, r.y + r.h - m - (port ? px(70) : 60), FO(zh, 800), RV.ink, 'left', 'alphabetic', 0, 'ec-handle');
      txt('youtube.com/@WithGbemi', x, r.y + r.h - m, FM(port ? px(32) : 32), RV.dim, 'left', 'alphabetic', 0, 'ec-url'); });
  }, { ground: 'rvGrey' });
  RV.flush(-6);
  const T0 = FOOT.dur; sfx('typeHit', T0 + 0.02, 0, { keep: true }); sfx('notify', T0 + 0.45, -6); TZ.music(T0, 8, 0.1);
}

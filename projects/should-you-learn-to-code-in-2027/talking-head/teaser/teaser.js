/* learn-to-code TEASER v3 (LinkedIn and X, 2026-11-13): one small story a stranger can follow, in the video's look B · You are
 * the reviewer, per inspiration/know-how/TEASER-PLAYBOOK.md section 0a (v3) with the trailer grammar of section 0 (cuts shown,
 * title cards on the gaps, music in sections). Plan: teaser/PLAN-v3.md. v2: ../../archive/teaser-v2/.
 * Fonts (font board): design-07 Archivo (moments/boards.js points the kit's "Helvetica Neue" at it for the teaser) +
 * design-29 DM Mono (the kit's mono). Order: hook (junior roles are rare; Indeed's 4.5 %; "a role that just doesn't exist") ->
 * the idea ("is there even a point…? yes, but not the same way") -> card READING CODE -> card DEBUGGING (the crash, the AI's
 * try-catch, the user still isn't signed up) -> card PAYMENTS (the webhook sent twice) -> her takeaway (the music stops) ->
 * the outroCard (manifest top level). */
'use strict';
function buildMoment() {
  RV.q = [];
  const B = [null, ...TZ.bites()], Gp = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'wide', ...o });
  const BANDS = PORTRAIT && ASPECT !== '1x1';   // 1:1 shows only the middle of the 9:16 layout: there the captions sit lower instead (moments/boards.js)
  /** 9:16 / 4:5: her on top, an ink caption band under her (the caption on the divider, off her chin); inner draws in the band */
  const band = (a, b, id, inner) => TH.split([a, b], { her: 0.56, side: 'top', id, ground: 'rvInk', draw: (t, r) => { rect(r.x, r.y, r.w, r.h, RV.ink); if (inner) inner(t, { x: r.x + 60, y: r.y + 230, w: r.w - 120, h: r.h - 260 }); } });
  const full = (a, b, draw, id, o = {}) => RV.full([a, b], (t, r) => draw(t, TZ.vis()), { id, enter: 0, ...o });
  // 16:9: her beside the graphic; 9:16 / 4:5 / 1:1: the graphic full frame (a top half fell outside the fitted 4:5 / 1:1 window)
  const half = (a, b, draw, id, side) => (PORTRAIT ? full(a, b, draw, id) : TH.split([a, b], { her: 0.42, side: side || 'right', id, draw, ground: 'rvInk' }));

  /* 1 · hook: junior developer roles are rare (one stretch, kept whole) */
  const b1 = (w) => at(1, w);
  talk(1, { frame: 'wide', to: b1('only') - 0.15 - B[1].t0 });
  // 9:16 / 4:5 / 1:1 (2026-11-13: captions touched her chin): after the topic card she sits on top, an ink caption band under her
  // (the caption on the divider); the Indeed page rises in the band when she names it
  const iT = b1('in the first') - 0.3, pageI = RV.page('ind-head', { t0: iT, maxScale: 1.1, align: 'center', valign: 'top' });
  if (BANDS) TH.split([B[1].t0 + 3.2, b1('only') - 0.15], { her: 0.56, side: 'top', id: 'z-band', ground: 'rvInk', draw: (t, r) => { rect(r.x, r.y, r.w, r.h, RV.ink); if (t >= iT) pageI(t, { x: r.x + 60, y: r.y + 230, w: r.w - 120, h: r.h - 260 }); } });
  if (!BANDS) TH.ots([b1('in the first') - 0.3, b1('only') - 0.15], { side: 'auto', w: V(820, 900), id: 'z-indeed', draw: RV.page('ind-head', { t0: b1('in the first') - 0.3, maxScale: 1.3, align: 'center', valign: 'center' }) });
  sfx('paper', b1('in the first') - 0.25, -6);
  TZ.layer(0, B[1].t0 + 3.2, (t, r) => {
    const p = 1 - E.inCubic(prog(t, B[1].t0 + 2.9, 0.3)); const port = PORTRAIT;
    const z = port ? px(100) : 112, w = port ? r.w - px(80) : 1080, x = port ? r.x + px(40) : 70, hd = 64, h = z * 2.5 + hd + 40, y = port ? r.y + r.h - h - px(60) : 70;
    const yy = port ? r.y + (r.h - h) / 2 : y; if (port) withA(p, () => rect(r.x, r.y, r.w, r.h, RV.g));   // portrait / fitted: a full grey card, so the words never sit on her face
    withA(p, () => grp('topic', x, yy, w, h, () => { const y = yy;
      rect(x, y, w, h, RV.wh); rvLine(x, y, w, h); rect(x, y, w, hd, RV.ink);
      txt('learning-to-code.md', x + 26, y + hd * 0.66, FM(port ? px(34) : 32, 600), RV.wh, 'left', 'alphabetic', 0, 'topic-file');
      RV.words(t, 'SHOULD YOU STILL', x + 30, y + hd + 20 + z * 0.86, z, RV.ink, { times: [0.05, 0.2, 0.35], amb: [1], key: 'topic-0' });
      RV.words(t, 'LEARN TO CODE?', x + 30, y + hd + 20 + z * 1.9, z, RV.ink, { at: 0.55, key: 'topic-1', cont: true, w: 300 });
    }));
  });
  TH.capOff.push([0, B[1].t0 + 3.2]);
  sfx('typeHit', 0.06, -1, { keep: true }); sfx('typeHit', 0.56, 0, { keep: true });
  full(b1('only') - 0.15, b1('i almost') - 0.1, RV.page('ind-45', { t0: b1('only') - 0.2, hl: b1('45'), big: { s: '4.5%', at: b1('45'), col: RV.delI }, capRoom: V(170, 330) }), 'z-45');
  half(b1('i almost') - 0.1, B[1].t1, RV.ladder({ at: b1('i almost') - 0.2, title: [{ s: 'JUNIOR DEVELOPER?', times: [b1('junior'), b1('developer')] }], high: ['SENIOR', '69.3%'], highAt: b1('i almost'), low: ['ENTRY LEVEL', '4.5%'], dropAt: b1("doesn't exist"), lx: 0.12 }), 'z-ladder');

  /* 2 · the idea, in one statement: is there still a point? yes, but not the old way */
  const b2 = (w) => at(2, w);
  const lap = RV.photo('px_laptop', { at: B[2].t0, credit: 'Lukas Blazek' });
  if (BANDS) TH.split([B[2].t0, b2('i would say') - 0.1], { her: 0.56, side: 'top', id: 'z-laptop', ground: 'rvInk', draw: (t, r) => { rect(r.x, r.y, r.w, r.h, RV.ink); lap(t, { x: r.x + 60, y: r.y + 230, w: r.w - 120, h: r.h - 260 }); } });
  else TH.tile([B[2].t0, b2('i would say') - 0.1], { at: V('tr', 'tr'), w: V(540, 420), id: 'z-laptop', draw: RV.photo('px_laptop', { at: B[2].t0, credit: 'Lukas Blazek' }) });
  if (BANDS) band(b2('i would say') - 0.1, b2('three') - 0.6, 't-yes');
  else TZ.talk([b2('i would say') - 0.1, b2('three') - 0.6], { frame: 'mid', push: [1.0, 1.08], id: 't-yes' });
  const oldway = RV.night(RV.sheet({ file: 'lesson-01.js', tag: 'the old way', fs: V(44, 40), at: b2('three') - 0.6,
    lines: [{ s: 'for (let i = 0; i < 10; i++) {', k: '-', at: b2('three') - 0.5, strikeAt: b2('four') }, { s: '  console.log(i)', k: '-', at: b2('three') - 0.3, strikeAt: b2('four') + 0.15 }, { s: '}', k: '-', at: b2('three') - 0.1, strikeAt: b2('four') + 0.3 }] }));
  if (BANDS) band(b2('three') - 0.6, B[2].t1 + 0.1, 'z-oldway', oldway);
  else TH.ots([b2('three') - 0.6, B[2].t1 + 0.1], { side: 'auto', w: V(760, 900), id: 'z-oldway', draw: oldway });

  /* 3 · READING CODE: a lot of code nobody reads; what reading it means */
  const b3 = (w) => at(3, w);
  half(B[3].t0, b3('reading code means') - 0.1, RV.night(RV.sheet({ file: 'new-feature.js', tag: 'written by AI', fs: V(40, 36), at: B[3].t0 - 0.1,
    lines: ['export async function checkout(cart) {', '  const total = sumPrices(cart.items)', '  const order = await db.orders.create(cart)', '  await payments.charge(order.id, total)', '  return order', '}'].map((x, i) => ({ s: x, k: ' ', at: B[3].t0 + 0.1 + i * 0.3 })),
    status: { l: 'written: yes', r: 'read: not yet', at: b3('not even') } })), 'z-notread');
  TH.tile([b3('reading code means') - 0.1, B[3].t1 + 0.1], { at: V('br', 'br'), w: V(520, 420), id: 'z-readit', draw: RV.sheet({ file: 'signup.js', tag: 'written by AI', fs: V(48, 40), at: b3('reading code means') - 0.1,
    lines: RV_CODE0, sel: { from: 0, to: 3, at: b3('look back') }, comment: { line: 1, s: ['Saves the user.', 'Is it what I asked for?'], at: b3('whether'), by: 'YOU' } }) });

  /* 4-5 · DEBUGGING: the crash, the AI's try-catch, the user still isn't signed up */
  full(B[4].t0, B[4].t1, RV.night(RV.sheet({ file: 'signup.js', fs: V(50, 42), at: B[4].t0 - 0.1, lines: RV_CODE0, err: { s: RV_ERR, at: at(4, 'crashes') }, capRoom: V(150, 300) })), 'z-crash', { hold: 0.2 });
  const b5 = (w) => at(5, w);
  if (BANDS) band(B[5].t0, b5('one easy fix') - 0.1, 't-paste'); else talk(5, { frame: 'mid', to: b5('one easy fix') - 0.1 - B[5].t0 });
  full(b5('one easy fix') - 0.1, B[5].t1 + 0.1, RV.night(RV.sheet({ file: 'signup.js', tag: 'suggested by AI', fs: V(46, 40), at: b5('one easy fix') - 0.1, capRoom: V(150, 300),
    lines: [RV_CODE0[0], { s: '  await db.insert(user)', k: '-', at: b5('one easy fix'), noType: true, strikeAt: b5('wrap') }, { s: '  try { await db.insert(user) }', k: '+', at: b5('trycatch') }, { s: '  catch (e) { }', k: '+', at: b5('trycatch') + 0.5 }, RV_CODE0[2], RV_CODE0[3]],
    err: { s: RV_ERR, at: b5('one easy fix') - 0.1, goneAt: b5('goes away') }, status: { l: 'page: no crash', r: 'signed up: 0', at: b5('still') } })), 'z-trycatch');

  /* 6 · PAYMENTS: the payment message, the webhook sent again, the same payment twice */
  const b6 = (w) => at(6, w);
  half(B[6].t0, b6('many providers') - 0.1, RV.night(RV.flow({ at: B[6].t0, sendAt: b6('sends your server'), title: [{ s: 'A WEBHOOK', times: [b6('a webhook'), b6('webhook')], cols: { 1: RV.addI } }] })), 'z-webhook', 'left');
  full(b6('many providers') - 0.1, B[6].t1 + 0.1, RV.night(RV.flow({ at: b6('many providers') - 5, sendAt: b6('many providers') - 4, againAt: b6('send the webhook again') })), 'z-twice');

  /* 7 · takeaway: the promise (the music stops) */
  const b7 = (w) => at(7, w);
  if (BANDS) band(B[7].t0, b7('because') - 0.1, 't-anybody'); else talk(7, { frame: 'wide', to: b7('because') - 0.1 - B[7].t0 });
  if (BANDS) band(b7('because') - 0.1, B[7].t1, 't-promise'); else TZ.talk([b7('because') - 0.1, B[7].t1], { frame: 'mid', push: [1.0, 1.1], id: 't-promise' });

  /* trailer grammar: a title card per example on the gaps, every join shown */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'typeHit', db: o.db == null ? 3 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: RV.amb, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || RV.g);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.5; const sc = 1 + 0.06 * (1 - E.outQuint(clamp(lt / 0.22)));
      const cw = Math.min(r.w * (port ? 0.88 : 0.64), port ? px(960) : 1200); const lines = text.split('\n'); const hd = port ? px(70) : 66;
      const z0 = Math.min(cw * 0.16, r.h * 0.2); const z = Math.min(z0, ...lines.map(l => z0 * (cw * 0.86) / Math.max(1, tw(l, FO(z0, 800)))));
      const ch = hd + z * (lines.length * 1.04 + 0.6) + 30;
      withT(cx, cy, sc, 0, () => {
        rect(-cw / 2, -ch / 2, cw, ch, RV.wh); rvLine(-cw / 2, -ch / 2, cw, ch); rect(-cw / 2, -ch / 2, cw, hd, RV.ink);
        _txt(small.toUpperCase(), -cw / 2 + 30, -ch / 2 + hd * 0.66, FM(port ? px(34) : 32, 500), RV.wh, 'left', 'alphabetic', 4);
        lines.forEach((l, k) => _txt(l, -cw / 2 + 40, -ch / 2 + hd + 20 + (k + 0.85) * z * 1.04, FO(z, 800), k === lines.length - 1 && o.amb ? '#9A6A00' : RV.ink, 'left', 'alphabetic', -z * 0.04));
      });
    } });
  for (const g of Gp) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'black' });                                                   // hook -> the idea
  tcard(Gp[0], 'READING\nCODE', 'skill 01', { id: 'card-read' });
  tcard(Gp[1], 'DEBUGGING', 'skill 02', { id: 'card-debug', out: 'black', sound: 'hit' });
  TZ.cut(4, { type: 'glitch', colors: [RV.delI, RV.addI, RV.ink] });             // the crash -> the AI's fix
  tcard(Gp[2], 'PAYMENTS', 'skill 03 · how the parts work together', { id: 'card-pay', amb: true });
  TZ.cut(6, { type: 'black', sound: 'hit', db: -6 });                             // the webhook -> her takeaway
  const bec = b7('because');
  sfx('tapeStop', bec - 0.55, -1, { keep: true }); TZ.drop(bec - 0.25, B[7].t1 - bec + 0.25);

  /* music in sections: up on frame 1, under the hook, a lift at each card */
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(Gp[0], -4); lift(Gp[1], -3); lift(Gp[2], -1);
  RV.flush(-6);
}

/* cheapest-countries TEASER v3 (LinkedIn and X, 2026-11-12): one small story a stranger can follow, in the video's look
 * (set 06: League Gothic caps, Inter Tight, DM Mono; off-black / warm paper / ONE orange = "costs more"), per
 * inspiration/know-how/TEASER-PLAYBOOK.md section 0a (v3) with the trailer grammar of section 0 (cuts shown, title cards on
 * the gaps, music in sections). Plan (her lines in order, read cold): teaser/PLAN-v3.md. v2: ../archive/teaser-v2/.
 * Order: hook ("someone has probably told you that Germany is free ... the whole proof of funds thing", STUDY IN EUROPE / THE
 * REAL COST big on frame 1) -> the idea (cheap = tuition + proof of funds, what proof of funds is) -> card GERMANY -> card
 * FRANCE -> card AUSTRIA -> card CZECH REPUBLIC -> her takeaway (the music stops) -> "I'm rooting for you" -> the outroCard. */
'use strict';
/* FONT-BOARD PASS (her rule 2026-11-12: only fonts + colour pairs from the font board, inspiration/boards/fonts/board.json):
 * teaser only (this file loads for the teaser alone): League Gothic (not on the board) -> Anton (design-05, Design 368), Inter Tight
 * (design-31) and DM Mono (design-29) stay; colours of Design 406 (combo-20): cream #F5EFDE, ink #0C160C, ONE accent #D16A3C.
 * Old: build/teaser.before-fontboard.js. */
(function teaserFontBoard() {
  for (const f of [...document.fonts]) if (f.family.replace(/["']/g, '') === 'PCL') document.fonts.delete(f);
  try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/Anton-Regular.ttf', false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace('PCL', u.buffer, { weight: '400' }); document.fonts.add(ff); ff.load(); } catch (e) { console.error('TEASER-FONT ' + e.message); }
  const CR = '#F5EFDE', INK = '#0C160C', ACC = '#D16A3C';
  Object.assign(PC, { wall: CR, wall2: CR, railTop: INK, lab: CR, ink: INK, red: ACC, black: INK, paper: CR, cream: CR });
  Object.assign(G.pcWall, { bg: CR, fg: INK, acc: ACC }); Object.assign(G.pcBlack, { bg: INK, fg: '#FFFFFF', acc: CR }); Object.assign(G.pcYellow, { bg: CR, fg: INK, acc: ACC });
  if (typeof PLATE !== 'undefined') { PLATE.pc = [CR, INK, ACC]; PLATE.pcInk = [INK, '#FFFFFF', CR]; }
})();
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const talk = (i, frame, o = {}) => TZ.talk(i - 1, { frame, ...o });
  const half = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.42, 0.46), side: V(side || 'right', 'bottom'), id, draw });
  const full = (a, b, draw, id, o = {}) => PC.full([a, b], draw, { id, ...o });
  const capRoom = V(170, 330);

  /* 1-2 · hook: Germany is free ... but proof of funds (one stretch) */
  talk(1, 'wide'); talk(2, 'mid');
  const topicEnd = Math.min(B[1].t0 + 2.8, B[1].t1 - 0.1);
  TZ.layer(0, topicEnd, (t, r) => { const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT;
    const z = port ? px(170) : 150, z2 = Math.round(z * 0.62); const x = port ? r.x + px(56) : 80, y = r.y + r.h - (port ? px(90) : 70) - z * 0.9 - z2 * 1.3;   // low in the frame, under her face
    withA(p, () => grp('topic', x, y, tw('STUDY IN EUROPE', FX(z)), z * 0.9 + z2 * 1.3, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 20;
      txt('STUDY IN EUROPE', x, y + z * 0.9, FX(z), PC.cream, 'left', 'alphabetic', 0, 'topic');
      txt('THE REAL COST', x, y + z * 0.9 + z2 * 1.3, FX(z2), PC.red, 'left', 'alphabetic', 0, 'topic-2'); ctx.restore(); })); });
  TH.capOff.push([0, topicEnd]);
  sfx('bell', 0.06, -4, { keep: true });
  half(at(2, 'germany') - 0.2, at(2, 'and for') - 0.1, PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: at(2, 'germany') - 0.2, priceAt: at(2, 'free') - 0.05, side: 'center' }), 'z-free');
  sfx('pop', at(2, 'free'), -4);
  TH.ots([at(2, 'proof of funds') - 0.15, B[2].t1], { side: 'auto', w: V(820, undefined), id: 'z-pof', edgePx: 0, draw: PC.pic({ key: 'passport-euro', at: at(2, 'proof of funds') - 0.15 }) });

  /* 3-4 · the idea: cheap = tuition + proof of funds, and what proof of funds is */
  talk(3, 'mid', { to: at(3, 'tuition fee') - 0.15 - B[3].t0 });
  full(at(3, 'tuition fee') - 0.15, B[3].t1, PC.phrase({ lines: [{ s: 'Cheap =', at: at(3, 'tuition fee') - 0.12 }, { s: '~tuition~ +', times: [at(3, 'tuition fee'), at(3, 'tuition fee') + 0.2] }, { s: '~proof of funds~', times: [at(3, 'proof of funds'), at(3, 'proof of funds') + 0.18, at(3, 'proof of funds') + 0.36] }], capRoom }), 'z-cheap', { sound: 'shutter', ground: 'pcBlack' });
  talk(4, 'wide', { to: at(4, 'the embassy') - 0.15 - B[4].t0 });
  half(at(4, 'the embassy') - 0.15, B[4].t1, PC.pic({ key: 'passport-euro', at: at(4, 'the embassy') - 0.15, fx: 0.5 }), 'z-embassy', 'left');

  /* 5-6 · GERMANY */
  talk(5, 'wide'); talk(6, 'mid');
  half(B[5].t0, B[5].t1, PC.city({ photo: 'berlin', credit: 'Irina Nesterenko', name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', priceAt: at(5, 'tuition') - 0.05, at: B[5].t0 }), 'z-de');
  full(at(6, '992') - 0.3, at(6, '11,904') - 0.3, PC.dk(PC.clip('de-daad', { at: at(6, '992') - 0.3, hl: at(6, 'every month'), hcrop: true, minS: 2, maxS: 2.6, capRoom })), 'z-daad', { ground: 'pcBlack' });
  full(at(6, '11,904') - 0.3, B[6].t1, PC.label({ name: 'Germany', flag: 'DE', kicker: 'PROOF OF FUNDS · A YEAR', price: '€11,904', priceAt: at(6, '11,904') - 0.1, red: true, at: at(6, '11,904') - 0.3, capRoom }), 'z-11904', { sound: 'shutter' });
  sfx('sticker', at(6, 'blocked'), -2);

  /* 7-8 · FRANCE */
  talk(7, 'mid'); talk(8, 'wide');
  half(B[7].t0, B[7].t1, PC.city({ photo: 'paris', credit: 'Kenrick Baksh', name: 'France', flag: 'FR', kicker: 'FEES FOR NON-EU STUDENTS', at: B[7].t0 }), 'z-fr');
  full(at(8, '2,902') - 0.35, B[8].t1, PC.dk(PC.pair({ a: { name: "Bachelor's", flag: 'FR', kicker: 'A YEAR', price: '€2,902', at: at(8, '2,902') - 0.2 }, b: { name: "Master's", flag: 'FR', kicker: 'A YEAR', price: '€3,950', red: true, at: at(8, '3,950') - 0.2 }, capRoom })), 'z-fr-fees', { ground: 'pcBlack' });

  /* 9 · AUSTRIA: the no-fee list, Nigeria not on it (the real TU Wien page) */
  talk(9, 'mid', { to: at(9, 'benin') - 0.4 - B[9].t0 });
  full(at(9, 'benin') - 0.4, B[9].t1, PC.clip('at-list', { at: at(9, 'benin') - 0.4, hl: ['benin', 'ethiopia', 'senegal', 'togo', 'uganda'].map(x => at(9, x)), zoomHl: 2, stk: { lines: ['NIGERIA: NOT ON THE LIST'], at: at(9, 'nigeria') }, capRoom }), 'z-list', { sound: 'shutter' });
  sfx('sticker', at(9, 'nigeria'), -2);

  /* 10 · CZECH REPUBLIC: free in Czech */
  talk(10, 'mid');
  half(B[10].t0, B[10].t1, PC.city({ photo: 'prague', credit: 'Ceyda Çiftci', name: 'Czech Republic', flag: 'CZ', kicker: 'IN CZECH', price: '€0', priceAt: at(10, 'free') - 0.05, at: B[10].t0 }), 'z-cz', 'left');

  /* 11-12 · her takeaway (music stops), then "I'm rooting for you" */
  talk(11, 'mid', { punch: ['numbers'] });
  talk(12, 'mid');

  /* trailer grammar: a title card per country on the gaps, every join shown (TZ.cut numbers bites from 0) */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'sticker', db: o.db == null ? 2 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: PC.cream, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || PC.ink);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => { const z0 = Math.min(r.w * (port ? 0.26 : 0.17), r.h * 0.3); const z = Math.min(z0, z0 * (r.w * 0.84) / Math.max(1, tw(text, FX(z0))));
        const w_ = tw(text, FX(z)); _txt(text, -w_ / 2, z * 0.36, FX(z), o.ink || PC.cream, 'left');
        const zs = Math.max(port ? px(36) : 34, Math.round(z * 0.16)); _txt(small.toUpperCase(), -w_ / 2, -z * 0.56, FM(zs), o.ground === PC.red ? PC.ink : PC.red, 'left', 'alphabetic', zs * 0.1); });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(2, { type: 'flash', color: PC.cream });                                  // hook -> the idea
  TZ.cut(3, { type: 'whip', color: PC.ink });                                   // cheap = ... -> what proof of funds is
  tcard(G[0], 'GERMANY', 'Country 01', { id: 'card-de' });
  TZ.cut(5, { type: 'black' });
  tcard(G[1], 'FRANCE', 'Country 02', { id: 'card-fr', out: 'black', sound: 'paper' });
  TZ.cut(7, { type: 'glitch', colors: [PC.red, PC.cream, PC.ink] });
  tcard(G[2], 'AUSTRIA', 'Country 03', { id: 'card-at' });
  tcard(G[3], 'CZECH REPUBLIC', 'Country 04', { id: 'card-cz', out: 'black', sound: 'paper' });
  tcard(G[4], 'DO THE MATHS', 'Tuition + proof of funds', { id: 'card-maths', out: 'black', sound: 'boom', db: 4, ground: PC.red, ink: PC.ink });   // the takeaway card (critic 2026-11-12), then her line
  TZ.cut(11, { type: 'flash', color: PC.cream });
  sfx('tapeStop', B[11].t0 - 0.55, -1, { keep: true }); TZ.drop(B[11].t0 - 0.25, B[11].t1 - B[11].t0 + 0.25); TZ.music(B[12].t0, 0, 0.3);

  /* music in sections: up on frame 1, under the hook, a lift at each card */
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.6, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -4); lift(G[1], -3); lift(G[2], -2); lift(G[3], 0); lift(G[4], 2);
}

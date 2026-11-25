/* cheapest-countries TEASER (LinkedIn and X): 20 of her lines in her pick A · PRICE CHECK (shelf grey, yellow shelf labels,
 * sticker red), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer).
 * Order: cold open (the topic as a shelf label on frame 1: "Germany is free") -> act 1 (tuition is, proof of funds) -> card THE
 * REAL COST -> act 2 (the embassy, €992 a month, €11,904, 2027, France 47 %, +€2,500) -> card THE FINE PRINT -> act 3 (family
 * income, Nigeria not on the list, the age rule, my fee 6,000 -> 7k, Norway, Czech free, faster) -> the music stops for the
 * biggest line (Paris rent) -> topic card -> stinger (under 24, Austria) -> end card (title, the question, @WithGbemi).
 * No "new video" tag, no riser, captions on every spoken line (the playbook's style). */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], Gp = TZ.gaps(); const px = (n) => n / BASE[0];
  const FR = [null, 'mid', 'close', 'mid', 'wide', 'close', 'mid', 'close', 'mid', 'wide', 'mid', 'close', 'mid', 'close', 'mid', 'close', 'wide', 'mid', 'close', 'mid', 'close'];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: FR[i], ...o });
  const at = (i, w) => TZ.at(i - 1, w);
  const span = (i, a, b) => [a == null ? B[i].t0 : at(i, a) - 0.12, b == null ? B[i].t1 : at(i, b)];
  const half = (sp, draw, id) => TH.split(sp, { her: V(0.42, 0.46), side: V('right', 'bottom'), id, draw });
  const capRoom = V(170, 330);
  [1, 3, 6, 9, 12, 15, 19, 20].forEach(i => talk(i));

  /* ---------- cold open: the topic as a shelf label on frame 1 ---------- */
  const TOPIC_END = Math.min(B[1].t0 + 3.0, B[2].t0 - 0.05);
  TZ.layer(0, TOPIC_END, (t, r) => {
    const p = 1 - E.inCubic(prog(t, TOPIC_END - 0.3, 0.3)); const port = PORTRAIT;
    const w = port ? r.w - px(100) : 1000, x = port ? r.x + px(50) : 70, y = port ? r.y + r.h - w * 0.62 - px(330) : 70;
    withA(p, () => rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, PC.wall));   // the cold open: the topic as plain type on the paper
    withA(p, () => grp('topic', x, y, w, w * 0.6, () => {
      PC.tag(t, { name: 'Study in Europe · for Nigerians', flag: 'DE', price: '€0?', size: w * 0.6 * 0.66, priceAt: 0.05, ast: B[3].t0 - 0.05 < 2.6 ? B[3].t0 : 1.2, at: 0, rise: 0, key: 'topic', bar: true }, x, y, w);
      PC.sticker(t, 0.5, ['The real cost:', 'tuition + proof of funds'], x + w * 0.04, y + w * 0.6 - 30, Math.round(w * 0.066), { key: 'topic-stk' });
    }));
  });
  TH.capOff.push([0, TOPIC_END]);
  sfx('bell', 0.06, -4, { keep: true }); sfx('sticker', 0.5, -2, { keep: true });

  /* ---------- act 1 · "Germany is free" ---------- */
  half(span(2), PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: B[2].t0 - 0.1, side: 'center' }), 'z-free');
  TH.ots(span(4), { side: 'auto', w: V(820, undefined), id: 'z-embassy', edgePx: 0, draw: PC.pic({ key: 'passport-euro', at: B[4].t0 - 0.1 }) });
  half(span(17), PC.city({ photo: 'oslo', credit: 'Eswaran Arulkumar', name: 'Norway', flag: 'NO', kicker: 'FEES FOR NON-EU STUDENTS', line: 'since 2023', at: B[17].t0 - 0.1 }), 'z-no');
  /* ---------- act 2 · the real cost ---------- */
  half(span(5), PC.dk(PC.label({ name: 'Germany', flag: 'DE', kicker: 'PROOF OF FUNDS', price: '€992', priceAt: at(5, '992') - 0.1, line: 'a month', at: B[5].t0 - 0.1, side: 'center' })), 'z-992');
  PC.full(span(6), PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: B[6].t0 - 0.2, priceAt: B[6].t0 - 0.1, ast: B[6].t0, stk: { lines: ['*Proof of funds:', '€11,904 a year'], at: at(6, '11,904') - 0.1 }, capRoom }), { id: 'z-11904', sound: 'shutter' });
  sfx('sticker', at(6, '11,904') - 0.1, -2);
  PC.full(span(8), PC.label({ name: 'France · from 1 Aug 2026', flag: 'FR', kicker: 'PROOF OF FUNDS', was: { s: '€615', at: B[8].t0, strike: at(8, 'raised') }, price: '€877.50', priceAt: at(8, '47%') - 0.1, redAt: at(8, '47%') - 0.1, line: 'a month', stk: { lines: ['PRICE UP'], at: at(8, 'raised'), size: 0.07 }, at: B[8].t0 - 0.2, capRoom }), { id: 'z-fr', sound: 'shutter' });
  sfx('sticker', at(8, 'raised'), -2);
  /* ---------- act 3 · the fine print (faster) ---------- */
  half(span(10), PC.city({ photo: 'bologna', credit: 'Pascal Küffer', name: 'Italy', flag: 'IT', kicker: 'TUITION', at: B[10].t0 - 0.1 }), 'z-it');
  PC.full(span(11), PC.clip('at-list', { at: B[11].t0 - 0.1, hl: ['benin', 'ethiopia', 'senegal', 'togo', 'uganda'].map(x => at(11, x)), zoomHl: 2, stk: { lines: ['NIGERIA: NOT ON THE LIST'], at: at(11, 'nigeria') }, capRoom }), { id: 'z-list', sound: 'shutter' });
  sfx('sticker', at(11, 'nigeria'), -2);
  PC.full([B[13].t0 - 0.1, B[14].t1], PC.dk(PC.pair({ a: { name: 'Under 24', flag: 'AT', kicker: 'A MONTH', price: '€722.58', at: B[13].t0 - 0.1, priceAt: at(13, '722.58') - 0.1 }, b: { name: '24 and over', flag: 'AT', kicker: 'A MONTH', price: '€1,308.39', red: true, at: B[14].t0 - 0.1, priceAt: at(14, '1,308.39') - 0.1 }, capRoom })), { id: 'z-age', sound: false, ground: 'pcBlack' });
  half(span(16), PC.label({ name: 'My programme · a year', flag: 'EE', kicker: 'TUITION', was: { s: '€6,000', at: B[16].t0 - 0.1, strike: at(16, 'increased') }, price: '€7,000', priceAt: at(16, '7k') - 0.15, redAt: at(16, '7k') - 0.15, at: B[16].t0 - 0.2, side: 'center' }), 'z-7k');
  sfx('sticker', at(16, 'increased'), -2);
  half(span(18), PC.city({ photo: 'prague', credit: 'Ceyda Çiftci', name: 'Czech Republic', flag: 'CZ', kicker: 'IN CZECH', price: '€0', priceAt: at(18, 'free') - 0.1, at: B[18].t0 - 0.1 }), 'z-cz');

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'sticker', db: o.db == null ? 2 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: PC.lab, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || PC.wall);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.5; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      const cw = Math.min(r.w * (port ? 0.86 : 0.62), port ? px(940) : 1180); const lines = text.split('\n');
      const z0 = Math.min(cw * 0.22, r.h * 0.22); const z = Math.min(z0, ...lines.map(l => z0 * (cw * 0.86) / Math.max(1, tw(l, FX(z0)))));
      const sh = z * 0.5, ch = sh + z * (lines.length * 0.96 + 0.5);
      withT(cx, cy, sc, -0.015, () => {
        rect(-cw / 2, -ch / 2, cw, ch, PC.lab);
        _txt(small, -cw / 2 + 36, -ch / 2 + sh * 0.72, FM(Math.max(30, Math.round(sh * 0.4))), PC.ink, 'left', 'alphabetic', 1.5);
        lines.forEach((l, k) => _txt(l, -cw / 2 + 36, -ch / 2 + sh + z * 0.92 + k * z * 0.96, FX(Math.round(z)), k === lines.length - 1 && o.redLast ? PC.red : PC.ink, 'left'));
      });
    } });
  for (const g of Gp) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'flash', color: PC.lab });
  TZ.cut(2, { type: 'black' });
  tcard(Gp[1], 'THE REAL\nCOST', 'TUITION + PROOF OF FUNDS', { id: 'card-cost' });
  TZ.cut(4, { type: 'whip', color: PC.wall });
  TZ.cut(5, { type: 'black' });
  TZ.cut(6, { type: 'flash', color: PC.lab });
  TZ.cut(7, { type: 'glitch', colors: [PC.red, PC.lab, PC.rail] });
  TZ.cut(8, { type: 'black' });
  tcard(Gp[2], 'THE FINE\nPRINT', 'WHAT THE LABEL LEAVES OUT', { id: 'card-fine', redLast: true });
  TZ.cut(10, { type: 'whip', color: PC.wall });
  TZ.cut(11, { type: 'flash', color: PC.red });
  TZ.cut(12, { type: 'black' });
  TZ.cut(14, { type: 'glitch', colors: [PC.red, PC.lab, PC.rail] });
  TZ.cut(15, { type: 'flash', color: PC.lab });
  TZ.cut(16, { type: 'whip', color: PC.wall });
  TZ.cut(17, { type: 'black' });
  sfx('tapeStop', B[19].t0 - 0.55, -1, { keep: true }); TZ.drop(B[19].t0 - 0.25, B[19].t1 - B[19].t0 + 0.25);
  TZ.cut(18, { type: 'black', sound: 'pop', db: -6 });
  tcard(Gp[3], 'CHEAPEST\nCOUNTRIES', 'STUDY IN EUROPE AS A NIGERIAN', { id: 'card-topic', db: 4, out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(Gp[1], -3); lift(Gp[2], 0); lift(Gp[3], 3);

  /* ---------- end card: the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  // 2026-11-10: the drawn "Full video on YouTube" ending (manifest outroCard) replaces this old card when it is on
  if (!FOOT.ocard) TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, PC.wall); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const zT = port ? px(132) : 124, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { txt('FULL VIDEO ON YOUTUBE', x, r.y + (port ? px(150) : 140), FM(port ? px(36) : 36, 600), PC.mid, 'left', 'alphabetic', 0, 'ec-kicker');
      txtW(title.toUpperCase(), x, r.y + (port ? px(150) : 140) + zT * 1.2, FX(zT), PC.ink, wT, zT * 0.96, 0, 'ec-title'); });
    const qy = r.y + r.h * (port ? 0.56 : 0.62);
    withA(p2, () => txtW('Which country are you looking at: is it the tuition or the proof of funds that stops you?', x, qy, FS(port ? px(58) : 56, 500), PC.ink, wT, (port ? px(58) : 56) * 1.25, 0, 'ec-question'));
    withA(p3, () => { const zh = port ? px(110) : 100;
      txt('@WithGbemi', x, r.y + r.h - m - (port ? px(70) : 60), FX(zh), PC.ink, 'left', 'alphabetic', 0, 'ec-handle');
      txt('youtube.com/@WithGbemi', x, r.y + r.h - m, FM(port ? px(32) : 32), PC.mid, 'left', 'alphabetic', 0, 'ec-url'); });
    PC.sticker(lt, 1.0, ['PRICE CHECKED', '2 NOV 2026'], r.x + r.w - m, r.y + r.h * (port ? 0.76 : 0.74), port ? px(54) : 54, { key: 'ec-stk', align: 'right', rot: -3, ink: PC.mid });
  }, { ground: 'pcWall' });
  const T0 = FOOT.dur; sfx('sticker', T0 + 0.02, -1, { keep: true }); sfx('paper', T0 + 0.4, -6); sfx('sticker', T0 + 1.0, -3); TZ.music(T0, 8, 0.1);
}

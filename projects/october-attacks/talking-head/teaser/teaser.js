/* october-attacks TEASER (LinkedIn and X): 13 of her lines in the film's look A · THE MONTH (night / bone / October orange,
 * Anton / Manrope / Spline Sans Mono), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer).
 * Order: hook (October was supposed to be Cybersecurity Awareness Month; the topic big on frame 1) -> act 1 PHP2Shell
 * (two loopholes, a shell, before your code runs, the best login won't matter) -> card YOUR SECRET KEYS -> act 2 (Railway,
 * Zeabur hacked twice, the admin token from January 2024, AI bills over $1,000) -> card JUST THE NUMBER 4 -> act 3 (the
 * number four, $50 to hack a company) -> the music stops for the biggest line (the same AI tools help both sides) -> topic
 * card -> stinger (they went straight for your secret keys) -> end card (title, @WithGbemi, where to watch).
 * No "new video" tag, one riser at most (none used), three-part captions only here (look cap16 'three' for teasers). */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];   // B[1] = her first line (no lead)
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'close', 'wide', 'mid', 'close', 'wide', 'mid', 'close', 'mid', 'wide'];
  const talk = (i, from, o = {}) => TZ.talk(i - 1, { frame: FR[i], from, ...o });
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, times: text.split(/\s+/).map(() => from) });

  /* ---------- 1 · hook: her line, the topic big on frame 1 (a calendar page), then it leaves ---------- */
  talk(1, 0, { push: V([1.1, 1.24], [1.06, 1.18]) });
  const topicEnd = B[1].t0 + 2.9;
  TZ.layer(0, topicEnd, (t, r) => {
    const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT;
    const z = port ? px(110) : 150, w = port ? r.w - px(80) : 1320, x = port ? r.x + px(40) : 64; const hh = z * 3.25; const y = port ? r.y + r.h - hh - px(290) : 54;   // 1:1 / 4:5 / 9:16: under her chin, above the captions (never over her face)
    withA(p, () => withT(0, (1 - p) * -40, 1, 0, () => {
      const lines = ['PHP2SHELL AND', "OCTOBER'S HACKS"]; const h = hh;
      grp('topic', x, y, w, h, () => {
        rect(x, y, w, h, OA.orange);
        mono('October 2026', x + z * 0.32, y + z * 0.62, port ? px(34) : 32, OA.ink, 'left', { key: 'topic-kicker' });
        lines.forEach((l, k) => txt(l, x + z * 0.3, y + z * 0.98 + (k + 1) * z * 1.06, F.disp(z), k ? OA.bone : OA.ink, 'left', 'alphabetic', 0, 'topic-' + k));
      });
    }));
  });
  sfx('boom', 0.03, -3, { keep: true });
  kw(TZ.at(0, 'one attack'), B[1].t1 - 0.05, 'one attack after the ~other~', 'k-other');

  /* ---------- act 1 · PHP2Shell ---------- */
  TZ.insert([B[2].t0, B[2].t1], { noCaps: false, id: 'i-found', scene: 'found', from: 0.0, film: { scene: 'found' } });
  talk(3, 0, { to: TZ.at(2, 'type commands') - 0.1 - B[3].t0 });
  TZ.insert([TZ.at(2, 'type commands') - 0.1, B[3].t1], { noCaps: true, enter: 'snap', id: 'i-shell', scene: 'shell', from: 7.0, film: { scene: 'shell' } });
  talk(4, 0, { punch: ['before'] });
  kw(TZ.at(3, 'before your code'), B[4].t1 - 0.05, 'before your code ~even runs~', 'k-before');
  talk(5, 0, { frame: 'close', punch: ['matter'] });

  /* ---------- act 2 · your secret keys ---------- */
  { const re = Math.min(B[6].t1, B[6].t0 + 6.9); TZ.insert([B[6].t0, re], { id: 'i-railway', scene: 'railway', from: 0.0, film: { scene: 'railway' } }); if (B[6].t1 - re > 0.4) TZ.talk([re, B[6].t1], { frame: 'close', id: 'railway-her' }); }
  talk(7, 0, { to: TZ.at(6, 'shutting down') - 0.1 - B[7].t0 });
  TZ.insert([TZ.at(6, 'shutting down') - 0.1, B[7].t1], { noCaps: true, enter: 'snap', id: 'i-zeabur', scene: 'zeabur-open', from: 3.3, film: { scene: 'zeabur-open' } });
  { const te = Math.min(B[8].t1, TZ.at(7, 'no expiry') + 0.9); TZ.insert([B[8].t0, te], { sync: 'admin token had no expiry', after: 235, id: 'i-token', scene: 'zeabur-keys', film: { scene: 'zeabur-keys' } });
    if (B[8].t1 - te > 0.6) TZ.talk([te, B[8].t1], { frame: 'close', id: 'token-her' }); }
  talk(9, 0, { to: TZ.at(8, 'like imagine') - 0.1 - B[9].t0 });
  { const a = TZ.at(8, 'a few'), b = TZ.at(8, 'like imagine') - 0.1;   // the real TechCrunch line, highlighted on her word
    OA.full([a - 0.1, b], OA.src('opencode-techcrunch-q3', { t0: a - 0.1, hl: TZ.at(8, 'thousand'), capRoom: V(250, 0) }), { id: 'i-bill', enter: 0.2, sound: 'shutter' }); }
  TZ.talk([TZ.at(8, 'like imagine') - 0.1, B[9].t1], { frame: 'close', id: 'imagine-her' });

  /* ---------- act 3 · the number 4, $50, both sides ---------- */
  talk(10, 0, { to: TZ.at(9, 'number four') - 0.1 - B[10].t0 });
  TZ.insert([TZ.at(9, 'number four') - 0.1, B[10].t1], { noCaps: true, enter: 'snap', id: 'i-four', scene: 'four', from: 8.45, film: { scene: 'four' } });
  talk(11, 0, { to: TZ.at(10, 'costing') - 0.1 - B[11].t0, punch: ['crazy'] });
  TZ.insert([TZ.at(10, 'costing') - 0.1, B[11].t1], { noCaps: true, enter: 'snap', id: 'i-fifty', scene: 'fifty', from: 7.6, film: { scene: 'fifty' } });
  talk(12, 0, { push: V([1.18, 1.34], [1.12, 1.26]) });   // the biggest line, in near silence
  kw(TZ.at(11, 'helping the attackers'), B[12].t1 - 0.05, 'helping the ~attackers~', 'k-attackers');
  talk(13, 0, { frame: 'close', punch: ['secret keys'] });

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: OA.orange, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || OA.night);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.22 : 0.16), r.h * 0.3);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.86) / Math.max(1, tw(l, F.disp(z0)))));
        const y0 = -(lines.length - 1) / 2 * z * 0.98;
        lines.forEach((l, k) => _txt(l, 0, y0 + k * z * 0.98 + z * 0.36, F.disp(z), k === lines.length - 1 ? OA.orange : OA.bone, 'center'));
        _mono(small, 0, y0 - z * 0.72, Math.max(port ? px(34) : 32, z * 0.16), OA.mid, 'center', {});
      });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);   // no caption on a title card (its sound is a near-silent breath)
  TZ.cut(1, { type: 'flash', color: OA.orange });
  TZ.cut(2, { type: 'black' });
  TZ.cut(3, { type: 'whip', color: OA.orange });
  TZ.cut(4, { type: 'glitch', colors: [OA.orange, OA.bone, OA.night] });
  tcard(G[0], 'YOUR SECRET\nKEYS', 'October 14 to 21', { id: 'card-keys' });
  TZ.cut(6, { type: 'black' });
  TZ.cut(7, { type: 'whip', color: OA.bone });
  TZ.cut(8, { type: 'flash', color: OA.orange });
  tcard(G[1], 'WEAK\nKEYS', 'October 17', { id: 'card-four' });
  TZ.cut(10, { type: 'glitch', colors: [OA.orange, OA.bone, OA.night] });
  sfx('tapeStop', B[12].t0 - 0.55, -1, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(11, { type: 'black', sound: 'hit', db: -6 });
  tcard(G[2], "OCTOBER'S\nATTACKS", 'One attack after the other', { id: 'card-topic', ground: OA.night, db: 0, out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -2); lift(G[1], 0); lift(G[2], 4);

  /* ---------- end card: the month page, the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, OA.night); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));   // the slow push
    const zT = port ? px(96) : 92, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { mono('New on YouTube', x, r.y + (port ? px(150) : 150), port ? px(34) : 34, OA.orange, 'left', { key: 'ec-kicker' });
      txtW(title, x, r.y + (port ? px(150) : 150) + zT * 1.35, F.disp(zT), OA.bone, wT, zT * 1.0, 0, 'ec-title'); });
    const qy = r.y + r.h * (port ? 0.56 : 0.6);
    withA(p2, () => txtW('Is your PHP patched, and are your keys safe?', x, qy, F.body(port ? px(54) : 54, 700), OA.mid, wT, (port ? px(54) : 54) * 1.2, 0, 'ec-question'));
    withA(p3, () => { const zh = port ? px(110) : 104; txt('@WithGbemi', x, r.y + r.h - m - (port ? px(70) : 60), F.disp(zh), OA.orange, 'left', 'alphabetic', 0, 'ec-handle');
      mono('youtube.com/@WithGbemi', x, r.y + r.h - m, port ? px(34) : 34, OA.mid, 'left', { key: 'ec-url', lower: true }); });
  }, { ground: 'oaNight' });
  const T0 = FOOT.dur; sfx('boom', T0 + 0.02, 0, { keep: true }); sfx('paper', T0 + 0.4, -6); sfx('pop', T0 + 0.7, -4); TZ.music(T0, 8, 0.1);   // the end card opens up
}

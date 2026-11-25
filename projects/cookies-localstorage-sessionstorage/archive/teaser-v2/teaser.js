/* cookies TEASER (LinkedIn and X): 17 of her lines in the film's look A · CRASH TEST (concrete, ink, the crash marker, green
 * STILL THERE / red GONE stamps), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer) and the kit's section 4.
 * hook (HTTP is stateless, the topic big on frame 1) -> act 1 (the server forgets, the cloakroom ticket) -> card THE COOKIE
 * -> act 2 (4 KB, restored tabs, the cart, the form, refresh vs close tab) -> card WHO CAN READ IT? -> act 3 (never sent,
 * third-party scripts, the music stops for "any JavaScript on your page can read") -> topic card -> stinger question -> end card.
 * No "new video" tag, no riser, no outro clip (none recorded for this video): it ends on its own end card. */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const FR = [null, 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'mid', 'close', 'mid', 'wide', 'mid', 'close', 'mid', 'close', 'wide', 'close', 'mid'];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: FR[i], ...o });
  const at = (i, w) => TZ.at(i - 1, w);
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, size: V(110, 96), acc: '#7BE6A6', times: text.split(/\s+/).map(() => from) });
  const ins = (a, b, draw, id, o = {}) => CK.full([a, b], draw, { id, capRoom: V(240, 0), ...o });
  const split = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.38, 0.44), side: side || V('right', 'bottom'), id, draw });

  /* ---------- 1 · hook: HTTP is stateless, the topic big on frame 1 ---------- */
  talk(1, { id: 't-hook' });
  const topicEnd = B[1].t0 + 2.4;
  TZ.layer(0, topicEnd, (t, r) => {
    const p = 1 - E.inCubic(prog(t, topicEnd - 0.3, 0.3)); const port = PORTRAIT; const x = port ? r.x + px(40) : 64, y = port ? r.y + px(60) : 60;
    withA(p, () => grp('topic', x, y + (port ? 0 : 30), port ? r.w - px(80) : 1300, port ? px(380) : 520, () => {
      const lines = ['Cookies,', 'localStorage,', 'sessionStorage']; const z = port ? px(120) : 118;   // a flat concrete field, Bold + Light (no boxes)
      const wMax = Math.max(...lines.map((l, i) => tw(l, i ? F.light(z) : F.disp(z), -0.045 * z))); rect(x - z * 0.3, y - z * 0.2, wMax + z * 0.6, lines.length * z * 1.08 + z * 0.4, CK.conc);
      lines.forEach((l, i) => _txt(l, x, y + z * 0.86 + i * z * 1.08, i ? F.light(z) : F.disp(z), CK.ink, 'left', 'alphabetic', -0.045 * z));
      regBox(ovr('@topic'), x, y, 10, 10, { kind: 'box' }); }));
  });
  sfx('boom', 0.03, -3, { keep: true });
  TH.behind([at(1, 'stateless') - 0.15, B[1].t1], ['Stateless'], { times: [at(1, 'stateless')], id: 't-stateless', size: V(200, 160), y: V(250, 560) });   // (was a card re-typing her line)

  /* ---------- act 1 · the server forgets; the ticket ---------- */
  split(B[2].t0, B[2].t1, CK.stateless({ at1: B[2].t0 - 1.2, at2: B[2].t0 + 0.4, qAt: at(2, 'remember') }), 't-forget', V('left', 'bottom'));
  talk(3, { punch: ['brand new'] });
  talk(4, { punch: ['face'] });
  ins(B[5].t0, B[5].t1, CK.night(CK.cloak({ at: B[5].t0 - 0.4, flipAt: at(5, 'ticket') })), 'i-ticket', { sound: 'flip' });
  split(B[6].t0, B[6].t1, CK.night(CK.trip({ setAt: at(6, 'cookie') })), 't-trip');

  /* ---------- act 2 · what survives ---------- */
  ins(B[7].t0, B[7].t1, CK.scale({ at: at(7, '4'), headAt: B[7].t0 }), 'i-4kb');
  talk(8, { to: at(8, 'restore') - 0.1 - B[8].t0 });
  split(at(8, 'restore') - 0.1, B[8].t1, CK.receipt({ img: 'mdn-warn', at: at(8, 'restore') + 0.3, inAt: at(8, 'restore') - 0.6, crop: [80, 76, 1052, 158], hl: [[668, 80, 1010, 112], [86, 122, 606, 154]], credit: 'Source: MDN Web Docs, Set-Cookie' }), 't-restore', V('left', 'bottom'));
  talk(9, { punch: ['random'] });
  ins(B[10].t0, B[10].t1, CK.test({ n: '01', name: 'Close the browser', head: 'Close browser', subject: 'cart', test: 'browser', at: at(10, 'close'), shutAt: at(10, 'close') + 0.35, openAt: at(10, 'reopen'), result: 'there', resAt: at(10, 'still') }), 'i-cart');
  sfx('stamp', at(10, 'still'), -2);
  split(B[11].t0, B[11].t1, (t, r) => { rect(r.x, r.y, r.w, r.h, CK.conc); CK.fit(r, (L) => { CK.form(t, 60, 220, 1.3, { wipeAt: at(11, 'disappear'), shakeAt: at(11, 'disappear') - 0.6 }); }); }, 't-form');
  sfx('wipe', at(11, 'disappear'), -6);
  TH.half([B[12].t0, at(12, 'but if') - 0.05], { side: V('right', 'top'), id: 't-refresh', enter: 0.01, draw: CK.test({ n: '02', name: 'Refresh the page', head: 'Refresh', subject: 'form', test: 'refresh', at: at(12, 'refresh') - 0.07, result: 'there', resAt: at(12, 'still') }) });
  sfx('refresh', at(12, 'refresh') - 0.07, -3); sfx('stamp', at(12, 'still'), -2);
  ins(at(12, 'but if') - 0.05, B[12].t1, CK.night(CK.test({ n: '03', name: 'Close the tab', head: 'Close tab', subject: 'form', test: 'tab', enter: 'drop', at: at(12, 'close') - 0.07, result: 'gone', resAt: at(12, 'gone') })), 'i-close-tab', { lead: 0 });
  sfx('slam', at(12, 'close') - 0.07, -3); sfx('stamp', at(12, 'gone'), -2);

  /* ---------- act 3 · who can read it ---------- */
  split(B[13].t0, B[13].t1, CK.wire({ at: B[13].t0 - 2, stayAt: at(13, 'never') }), 't-never', V('left', 'bottom'));
  talk(14);
  ins(B[15].t0, B[15].t1, CK.night(CK.scripts({ at: [at(15, 'own'), at(15, 'analytic'), at(15, 'chat')] })), 'i-scripts');
  talk(16, { push: V([1.12, 1.3], [1.1, 1.24]) });   // the biggest line, in near silence
  talk(17, { frame: 'mid' });

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: CK.white, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, CK.ink);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.22 : 0.15), r.h * 0.32);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.84) / Math.max(1, tw(l, F.disp(z0)))));
        const y0 = -(lines.length - 1) / 2 * z * 0.94;
        lines.forEach((l, k) => _txt(l, 0, y0 + k * z * 0.94 + z * 0.36, k === lines.length - 1 ? F.light(z) : F.disp(z), k === lines.length - 1 ? '#7BE6A6' : CK.white, 'center', 'alphabetic', -0.045 * z));
        CK.mark(0, y0 - z * 1.25, Math.max(port ? px(70) : 64, z * 0.36));
        _mono(small, 0, y0 + lines.length * z * 0.94 + z * 0.2, Math.max(port ? px(34) : 32, z * 0.16), '#A9AEAC', 'center', {});
      });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'black' });
  TZ.cut(3, { type: 'flash', color: CK.white });
  TZ.cut(4, { type: 'whip', color: CK.ink });
  tcard(G[0], 'The\ncookie', 'Test subject 01', { id: 'card-cookie' });
  TZ.cut(8, { type: 'glitch', colors: [CK.red, CK.white, CK.ink] });
  TZ.cut(9, { type: 'black' });
  TZ.cut(11, { type: 'flash', color: CK.white });
  tcard(G[1], 'Who can\nread it?', 'Cookies, localStorage, sessionStorage', { id: 'card-who' });
  TZ.cut(14, { type: 'whip', color: CK.ink });
  TZ.cut(15, { type: 'black' });
  sfx('tapeStop', B[16].t0 - 0.55, -1, { keep: true }); TZ.drop(B[16].t0 - 0.25, B[16].t1 - B[16].t0 + 0.25);
  tcard(G[2], 'What\nsurvives?', 'Refresh · close tab · close browser', { id: 'card-topic', db: 0, out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -2); lift(G[1], 0); lift(G[2], 4);

  /* ---------- end card: the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, CK.conc); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const zT = port ? px(90) : 100, x = r.x + m, wT = r.w - 2 * m;
    withA(p1, () => { CK.mark(x + (port ? px(26) : 26), r.y + (port ? px(140) : 138), port ? px(52) : 52); mono('Full video on YouTube', x + (port ? px(70) : 70), r.y + (port ? px(152) : 150), port ? px(34) : 34, CK.ink, 'left', { key: 'ec-kicker' });
      { const m_ = title.match(/^(.*?)\s*(\(.*\))\s*$/); const yT = r.y + (port ? px(150) : 150) + zT * 1.35;   // heavy + light: the bracket part in Light
        const n = txtW(m_ ? m_[1] : title, x, yT, F.disp(zT), CK.ink, wT, zT * 1.0, -0.045 * zT, 'ec-title');
        if (m_) txtW(m_[2], x, yT + n * zT * 1.0, F.light(zT), CK.ink, wT, zT * 1.0, -0.045 * zT, 'ec-title2'); } });
    const qy = r.y + r.h * (port ? 0.58 : 0.64);
    withA(p2, () => txtW('Where does your login live?', x, qy + (port ? px(60) : 60), F.light(port ? px(60) : 60), CK.ink, wT, (port ? px(60) : 60) * 1.15, -0.02 * 60, 'ec-question'));
    withA(p3, () => { const zh = port ? px(104) : 100; const s = '@WithGbemi'; const f = F.disp(zh); const w = tw(s, f); const yb = r.y + r.h - m - (port ? px(70) : 60);
      txt(s, x, yb, f, CK.ink, 'left', 'alphabetic', -0.045 * zh, 'ec-handle');
      mono('youtube.com/@WithGbemi', x, r.y + r.h - m, port ? px(34) : 34, CK.ink, 'left', { key: 'ec-url', lower: true }); });
  }, { ground: 'ckLab' });
  const T0 = FOOT.dur; sfx('boom', T0 + 0.02, 0, { keep: true }); sfx('stamp', T0 + 0.7, -4); TZ.music(T0, 8, 0.1);
}

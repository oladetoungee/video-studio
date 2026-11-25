/* working-full-time TEASER v3 (2026-11-13, TEASER-PLAYBOOK §0a: a stranger can FOLLOW it). Plan as plain text: teaser/PLAN-v3.md.
 * Order: hook = one relatable stretch (a full-time job + a full-time master's; Monday to Saturday it keeps moving; her goal: work
 * doesn't know school exists, school doesn't know work exists) -> the idea (how I do both, how I plan my week, some tips) ->
 * 4 tips, each named by her and by a title card: BLOCK YOUR WEEK / ONE CALENDAR / STUDY LEAVE / MEAL PREP -> her takeaway
 * (stay on top of things and not die; the music stops) -> the ending (outroCard, her "Full video on YouTube" design).
 * Look: font board pair-01 (Design 368: Anton + Archivo) in its colours combo-01 (navy #17357B / cream #D8CDBB / ink #080805);
 * the studio's 16:9 captions ("Helvetica Neue") are drawn in Archivo here. Old v2 script: build/teaser.before-v3-2026-11-13.js. */
'use strict';
(function teaserLook() {
  const C1 = { navy: '#17357B', cream: '#D8CDBB', ink: '#080805' };
  Object.assign(WF, { wall: C1.navy, manila: C1.cream, ink: C1.ink, red: C1.navy, paper: C1.cream, hl: C1.cream, mid: '#A9B3CF', midInk: '#4A4840', rule: '#B5AB98', black: C1.ink });
  Object.assign(G.wfWall, { bg: WF.wall, fg: WF.paper, mid: WF.mid, acc: WF.hl, card: WF.manila, panel: WF.wall, line: 'rgba(0,0,0,0)' });
  Object.assign(G.wfCard, { bg: WF.manila, fg: WF.ink, mid: WF.midInk, line: WF.rule, acc: WF.red, card: WF.manila, panel: WF.manila });
  Object.assign(G.wfBlack, { bg: WF.ink, fg: WF.paper, mid: WF.mid, acc: WF.hl, card: WF.manila, panel: WF.ink });
  if (typeof PLATE !== 'undefined') { PLATE.wf = [WF.manila, WF.ink, WF.red]; PLATE.wfRed = [WF.red, WF.paper, WF.ink]; }
  Object.assign(TH.look, { fg: WF.manila, ink: WF.ink, acc: WF.red, accOnDark: WF.hl, band: WF.wall });
  WF.capKey = '#FFFFFF';   // the key word in her captions: white on the cream line (red read at 2.5:1 on navy)
  const ps = []; const add = (fam, file, desc) => { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) return; const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ps.push(ff.load().catch(() => null)); };
  add('TZArch', 'Archivo.ttf', { weight: '100 900' }); add('Helvetica Neue', 'Archivo.ttf', { weight: '100 900' });
  const r0 = TH.ready; TH.ready = async () => { await Promise.all(ps); return r0 ? r0() : undefined; };
  FW = (s, w = 500) => `${Math.min(700, Math.max(400, w))} ${Math.round(s * 0.96)}px TZArch`; FC = (s) => `600 ${Math.round(s * 0.8)}px TZArch`;
  F.body = (s, w = 600) => FW(s, w); F.mono = (s) => FC(s);
})();
function buildMoment() {
  WF.q = [];
  const B = [null, ...TZ.bites()], Gp = TZ.gaps(); const px = (n) => n / BASE[0];
  const talk = (i, o = {}) => TZ.talk(i - 1, o);
  const at = (i, w) => TZ.at(i - 1, w);
  const span = (i, a, b) => [a == null ? B[i].t0 : at(i, a) - 0.12, b == null ? B[i].t1 : at(i, b)];
  const half = (sp, draw, id) => TH.split(sp, { her: V(0.42, 0.46), side: V('right', 'bottom'), id, draw });

  /* ---------- hook: a full-time job + a full-time master's (topic big on frame 1), the week that keeps moving, her goal ---------- */
  // frame 1: the topic big on a navy panel BESIDE her (a split, never over her face), then her framing for the rest of the line
  TH.split([B[1].t0, B[1].t0 + 3.1], { her: V(0.44, 0.48), side: V('right', 'bottom'), id: 'z-topic', lead: 0, sound: false, draw: (t, r) => {
    rect(r.x, r.y, r.w, r.h, WF.wall); const m = V(80, 64); let z = V(170, 150);
    const lines = ['A FULL-TIME JOB', '+ A FULL-TIME', "MASTER'S, ABROAD"]; for (const l of lines) while (tw(l, FB(z)) > r.w - 2 * m && z > 40) z -= 4;
    const y0 = r.y + (r.h - lines.length * z * 0.95) / 2 + z * 0.8;
    lines.forEach((l, k) => txt(l, r.x + m, y0 + k * z * 0.95, FB(z), WF.manila, 'left', 'alphabetic', 0, 'topic-' + k)); } });
  talk(1, { frame: 'wide', from: 3.1 });
  TH.capOff.push([0, B[1].t0 + 3.1]);
  sfx('stamp', 0.06, -1, { keep: true });
  half(span(2), WF.card({ at: B[2].t0 - 0.1, rows: { MON: WF_WEEK.MON, TUE: WF_WEEK.TUE, WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI, SAT: ['', '', '10:00', '13:00'] },
    times: (() => { const o = {}; const ds = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; const a0 = at(2, 'monday'), a1 = at(2, 'saturday'); ds.forEach((d, k) => { const a = a0 + (a1 - a0) * k / 5; o[d] = [a, a + 0.06, a + 0.12, a + 0.18]; }); return o; })(),
    side: 'center', hiRow: 'SAT', hiAt: at(2, 'saturday') }), 'z-moving');
  talk(3, { frame: 'wide' });
  talk(4, { frame: 'wide' });

  /* ---------- tip: block your week (the things that cannot move go in first, then a study block) ---------- */
  WF.full(span(5), WF.week({ at: B[5].t0, capRoom: V(170, 330), blocks: [{ d: 1, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: at(5, 'your classes') },
    { d: 4, h0: 14, h1: 16, s: 'DEADLINE', kind: 'fixed', at: at(5, 'assignment') }, { d: 2, h0: 10, h1: 11.5, s: 'MEETING', kind: 'fixed', at: at(5, 'your meetings') },
    { d: 1, h0: 20.25, h1: 21.75, s: 'STUDY', kind: 'study', at: at(5, 'its own block') }] }), { id: 'z-block', enter: 0 });

  /* ---------- tip: one calendar (two 24 hours -> the same one 24 hours) ---------- */
  talk(6, { frame: 'wide' });
  WF.full(span(7), WF.dial({ at: B[7].t0 - 0.2, mergeAt: at(7, 'but you have'), oneAt: at(7, 'same one'), capRoom: V(170, 330) }), { id: 'z-24', enter: 0, sound: 'focus' });
  sfx('stamp', at(7, 'same one'), 0);

  /* ---------- tip: study leave (the real law page, Estonia) ---------- */
  talk(8, { frame: 'wide' });
  WF.full(span(9), WF.clip('rt13-30', { t0: B[9].t0 - 0.1, w: V(1560, 960), hls: [at(9, '30 calendar'), at(9, '20 of those'), null], align: 'center', capRoom: V(170, 330), stamp: { s: '30 DAYS, 20 PAID', at: at(9, 'paid'), fx: 0.66, dy: V(130, 190), size: V(96, 84) } }), { id: 'z-leave', enter: 0 });
  sfx('marker', at(9, '30 calendar'), -2); sfx('stamp', at(9, 'paid'), 0);

  /* ---------- tip: meal prep ---------- */
  half([B[10].t0, B[11].t1], WF.photo({ img: 'px_mealprep', at: B[10].t0 - 0.1 }), 'z-meal');
  sfx('stamp', at(10, 'save'), -1);

  /* ---------- her takeaway, in near silence ---------- */
  talk(12, { frame: 'wide' });

  /* ---------- trailer grammar: a title card on each gap, every join shown ---------- */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'stamp', db: o.db == null ? 4 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: WF.manila, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || WF.wall);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.5; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      const cw = Math.min(r.w * (port ? 0.86 : 0.62), port ? px(940) : 1180); const lines = text.split('\n');
      const z0 = Math.min(cw * 0.3, r.h * 0.3); const z = Math.min(z0, ...lines.map(l => z0 * (cw * 0.84) / Math.max(1, tw(l, FB(z0)))));
      const ch = z * (lines.length * 0.98 + 0.9) + (port ? px(80) : 80);
      withT(cx, cy, sc, 0, () => {
        _txt(small, -cw / 2, -ch / 2 + (port ? px(84) : 84), FC(Math.max(port ? px(44) : 44, z * 0.18)), WF.manila, 'left', 'alphabetic', 1);
        lines.forEach((l, k) => _txt(l, -cw / 2, -ch / 2 + (port ? px(84) : 84) + (k + 1) * z * 0.98, FB(z), WF.manila, 'left'));
      });
    } });
  for (const g of Gp) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'flash', color: WF.manila });
  TZ.cut(2, { type: 'black' });
  TZ.cut(3, { type: 'whip', color: WF.manila });
  tcard(Gp[0], 'BLOCK\nYOUR WEEK', 'TIP', { id: 'card-block' });
  tcard(Gp[1], 'ONE\nCALENDAR', 'TIP', { id: 'card-calendar' });
  TZ.cut(6, { type: 'glitch', colors: [WF.manila, WF.wall, WF.ink] });
  tcard(Gp[2], 'STUDY\nLEAVE', 'IN ESTONIA', { id: 'card-leave' });
  TZ.cut(10, { type: 'flash', color: WF.manila });
  tcard(Gp[3], 'MEAL\nPREP', 'TIP', { id: 'card-meal' });
  sfx('tapeStop', B[12].t0 - 0.55, -1, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(11, { type: 'black', sound: 'hit', db: -6 });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(Gp[0], -3); lift(Gp[1], -1); lift(Gp[2], 1); lift(Gp[3], 3);
  WF.flush(-6);
  if (!FOOT.man.outroCard) {   // (the ending is the outroCard; this plain card only if it is switched off)
    const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
    TZ.endCard((t, r, lt) => { rect(r.x, r.y, r.w, r.h, WF.wall); const port = PORTRAIT; const m = port ? px(60) : 96; const zT = port ? px(140) : 140;
      txtW(title.toUpperCase(), r.x + m, r.y + (port ? px(150) : 150) + zT * 1.3, FB(zT), WF.manila, r.w - 2 * m, zT * 0.98, 0, 'ec-title');
      txt('@WithGbemi', r.x + m, r.y + r.h - m, FB(port ? px(110) : 104), WF.manila, 'left', 'alphabetic', 1, 'ec-handle'); }, { ground: 'wfWall' });
  }
}

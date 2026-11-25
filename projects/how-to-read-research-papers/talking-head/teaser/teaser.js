/* how-to-read-research-papers TEASER v3 (2026-11-13, TEASER-PLAYBOOK §0a: a stranger can follow it). Plan: teaser/PLAN-v3.md.
 * Hook (not a novel / built from the same parts, topic on frame 1) -> the idea (Keshav: up to three passes) -> card PASS ONE ->
 * 5-10 minutes + a whole evening saved -> card PASS TWO -> up to an hour + explain it to someone -> card PASS THREE -> papers your
 * thesis is built on + 3-5 hours -> card READ CRITICALLY -> published isn't always right + three checks -> takeaway (limitations =
 * your research gap; the music stops) -> stinger ("Do you read them digitally?") -> the outroCard (Full video on YouTube).
 * Fonts (font board): Newsreader 600 (shorts-11, white on black, Formats 52) for the topic, cards and the graphics' serif
 * (rp.js swaps it for DM Serif Display in the teaser), DM Mono (design-29) for the small card lines, Inter Tight (pair-03) captions.
 * Every text editable (ovr keys / RP.text keys), every block movable (grp). v2: build/teaser.before-fontboard.js. */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const INK = '#0B0B0B', WHITE = '#FFFFFF', GREY = '#A9A9A9';
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'wide', ...o });   // wide: her face stays above the captions in 1:1 / 4:5 / 9:16
  const at = (i, w) => TZ.at(i - 1, w);
  const ins = (a, b, draw, id) => RP.full([a, b], draw, { id, enter: 0.2, capRoom: V(170, 0) });
  const K = RP.KS;

  /* ---------- 1-2 · hook: Keshav's page, the abstract crossed out; the topic on frame 1 ---------- */
  // frame 1: the topic big on a flat black panel (Newsreader white on black, Formats 52) beside her (critic: no paper scan on frame 1)
  TH.split([B[1].t0, B[1].t1], { her: V(0.46, 0.5), side: V('right', 'bottom'), id: 't-topic', enter: 0.01,
    draw: (t, r) => { rect(r.x, r.y, r.w, r.h, INK); const z = V(150, 150); const m = V(90, 80);
      grp('topic', r.x + m, r.y + r.h * 0.5 - z * 1.3, r.w - 2 * m, z * 2.6, () => RP.text(t, 'topic', 'How to read a\n*research paper*', r.x + m, r.y + r.h * 0.5 - z * 0.25, z, { col: WHITE, maxW: r.w - 2 * m })); } });
  sfx('boom', 0.03, -4, { keep: true }); sfx('paper', 0.12, -4, { keep: true });
  full2(2);
  function full2(i) { TH.split([B[i].t0, B[i].t1], { her: V(0.42, 0.46), side: V('left', 'bottom'), id: 't-parts', draw: RP.parts({ at: B[i].t0, items: ['Title', 'Abstract', 'Introduction', 'Methods', 'Results', 'Discussion', 'Limitations', 'Conclusion', 'References'].map((x, k) => ({ s: x, at: B[i].t0 + 0.2 + k * 0.8 })) }) }); }

  /* ---------- 3-4 · the idea: Keshav's paper, up to three passes ---------- */
  TH.split([B[3].t0, B[3].t1], { her: V(0.42, 0.46), side: V('left', 'bottom'), id: 't-keshav',
    draw: RP.page({ at: B[3].t0, p: 1, focus: [100, 200], s: V(0.92, 0.7) }) });
  TH.room([at(4, 'three passes') - 0.35, B[4].t1], { at: at(4, 'three passes') - 0.3, her: V(0.38, 0.46), side: V('right', 'bottom'), id: 't-passes',
    draw: RP.passes({ at: at(4, 'three passes') - 0.1, times: [at(4, 'three passes'), at(4, 'three passes') + 0.25, at(4, 'three passes') + 0.5] }) });

  /* ---------- 5-6 · pass one ---------- */
  TH.split([B[5].t0, B[5].t1], { her: V(0.4, 0.46), side: V('left', 'bottom'), id: 't-pass-one',
    draw: RP.page({ at: B[5].t0, p: 1, focus: 'about five to ten minutes', s: V(1.05, 0.86), hl: [['about five to ten minutes', at(5, 'five to ten')]], tab: [1, 520] }) });
  talk(6, { push: V([1.0, 1.14], [1.0, 1.1]) });
  ins(at(6, 'whole evening') - 0.25, B[6].t1, RP.head({ at: at(6, 'whole evening') - 0.25, lines: 'Save a *whole evening*', size: V(130, 120) }), 't-evening');

  /* ---------- 7-8 · pass two ---------- */
  TH.room([B[7].t0, B[7].t1], { at: B[7].t0 + 0.2, her: V(0.38, 0.46), side: V('right', 'bottom'), id: 't-pass-two',
    draw: RP.passes({ at: B[7].t0, on: 2, onAt: at(7, 'up to an hour') }) });
  ins(at(8, 'explain') - 0.3, B[8].t1, RP.photo({ key: 'px-8553916', at: at(8, 'explain') - 0.3, credit: 'Photo: Polina Tankilevitch / Pexels', fy: 0.55 }), 't-print');
  talk(8);

  /* ---------- 9-10 · pass three ---------- */
  TH.room([B[9].t0, B[9].t1], { at: B[9].t0 + 0.2, her: V(0.38, 0.46), side: V('left', 'bottom'), id: 't-pass-three',
    draw: RP.passes({ at: B[9].t0, on: 3, onAt: at(9, 'thesis') }) });
  TH.split([B[10].t0, B[10].t1], { her: V(0.42, 0.46), side: V('right', 'bottom'), id: 't-hours',
    draw: RP.page({ at: B[10].t0, p: 2, focus: 'four or five hours for beginners', s: V(1.05, 0.86), hl: [['four or five hours for beginners', at(10, 'five hours')], ['about an hour for an experienced reader', at(10, 'experienced')]], notes: [] }) });

  /* ---------- 11 · read critically ---------- */
  talk(11, { push: V([1.0, 1.14], [1.0, 1.1]) });
  ins(at(11, 'published') - 0.2, B[11].t1, RP.head({ at: at(11, 'published') - 0.2, lines: 'Published ≠\n*the right paper*', size: V(130, 120) }), 't-published');
  // (the three checks are not listed: the full video answers that question)

  /* ---------- 12 · takeaway (the music stops), 13 · stinger ---------- */
  talk(12, { push: V([1.06, 1.18], [1.04, 1.14]) });
  TH.split([at(12, 'limitation') - 0.3, B[12].t1], { her: V(0.42, 0.46), side: V('right', 'bottom'), id: 't-limits', draw: RP.parts({ at: at(12, 'limitation') - 0.3, main: [6], mainAt: [at(12, 'limitation') + 0.1],
    items: ['Title', 'Abstract', 'Introduction', 'Methods', 'Results', 'Discussion', 'Limitations', 'Conclusion', 'References'].map(x => ({ s: x, at: 0 })) }) });
  // (no heading on 'research gap': her words carry it)
  talk(13);

  /* ---------- trailer grammar: cards on the gaps (black + white Newsreader, Formats 52), every join shown ---------- */
  // TZ.cut(i): i = the 0-based bite the cut goes into (B[i + 1] here)
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 5 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: o.outOpts || { color: WHITE, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, INK); const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.5; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => {
        const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.17 : 0.11), r.h * 0.26);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.84) / Math.max(1, tw(l, `400 ${z0}px "DM Serif Display"`))));
        const y0 = -(lines.length - 1) / 2 * z * 1.0;
        lines.forEach((l, k) => _txt(l, 0, y0 + k * z * 1.0 + z * 0.34, `400 ${z}px "DM Serif Display"`, WHITE, 'center', 'alphabetic', -z * 0.01));
        if (small) _txt(small, 0, y0 + (lines.length - 1) * z + z * 1.05, `500 ${Math.round(Math.max(port ? px(52) : 46, z * 0.3))}px "DM Mono"`, GREY, 'center');
      });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'flash', color: WHITE });
  TZ.cut(2, { type: 'black' });
  TZ.cut(3, { type: 'whip', color: RP.desk });
  tcard(G[0], 'PASS ONE', '5-10 minutes', { id: 'card-one' });
  TZ.cut(5, { type: 'glitch' });
  tcard(G[1], 'PASS TWO', 'up to an hour', { id: 'card-two', out: 'black', sound: 'hit' });
  TZ.cut(7, { type: 'flash', color: WHITE });
  tcard(G[2], 'PASS THREE', 'in depth', { id: 'card-three' });
  TZ.cut(9, { type: 'black' });
  tcard(G[3], 'READ\nCRITICALLY', 'is it any good?', { id: 'card-critical', out: 'black', sound: 'hit' });
  TZ.cut(11, { type: 'black', sound: 'hit', db: -6 });
  sfx('tapeStop', B[12].t0 - 0.55, -1, { keep: true }); TZ.drop(B[12].t0 - 0.25, B[12].t1 - B[12].t0 + 0.25);
  TZ.cut(12, { type: 'whip', color: RP.desk });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -3); lift(G[1], -1); lift(G[2], 0); lift(G[3], 2);
  TZ.music(B[13].t0, 2, 0.1);
  // ending: the outroCard ("Full video on YouTube", her design, layouts.js) after her last word
}

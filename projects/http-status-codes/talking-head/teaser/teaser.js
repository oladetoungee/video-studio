/* http-status-codes TEASER (LinkedIn and X): 14 of her lines in her pick B · THE FIRST DIGIT (group-colour grounds, rolling ink
 * codes), per inspiration/know-how/TEASER-PLAYBOOK.md (v2 movie trailer).
 * Order: cold open (200 OK but it failed; the topic big on frame 1: HTTP STATUS CODES with a rolling 200) -> act 1 (the first
 * line of every response, the first digit) -> card THE CODES -> act 2 (two questions, 422, keycard, who are you, 404 on purpose)
 * -> card THE MISTAKES -> act 3 (500 is wrong, stuck at 403, folder structure, 504) -> the music stops for "you shouldn't even
 * know that it exists" -> topic card -> stinger (418 I'm a teapot) -> end card (title, @WithGbemi, where to watch).
 * No "new video" tag, no riser, a small side countdown only on the cold open (allowed in teasers), captions C1 from the playbook. */
'use strict';
function buildMoment() {
  FD.q = [];
  const B = [null, ...TZ.bites()], Gp = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const span = (i, a, b) => [a == null ? B[i].t0 : at(i, a) - 0.12, b == null ? B[i].t1 : at(i, b)];
  const half = (sp, draw, id, side) => TH.split(sp, { her: V(0.42, 0.46), side: V(side || 'right', 'bottom'), id, draw });
  const full = (sp, draw, id) => FD.full(sp, draw, { id, capRoom: V(170, 330) });
  const FR = [null, 'mid', 'wide', 'close', 'mid', 'close', 'wide', 'mid', 'close', 'mid', 'wide', 'close', 'mid', 'close', 'wide'];
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: FR[i], ...o });

  /* ---------- cold open: the topic on frame 1 ---------- */
  talk(1, { push: V([1.08, 1.2], [1.04, 1.14]) });
  TZ.layer(0, B[1].t0 + 3.0, (t, r) => {
    const p = 1 - E.inCubic(prog(t, B[1].t0 + 2.7, 0.3)); const port = PORTRAIT;
    const w = port ? r.w - px(80) : 980, x = port ? r.x + px(40) : 64, h = port ? px(520) : 420, y = port ? r.y + px(60) : 64;
    withA(p, () => grp('topic', x, y, w, h, () => { rect(x, y, w, h, FD.g2);
      txt('HTTP STATUS CODES', x + 40, y + (port ? px(80) : 74), FM(port ? px(36) : 34), FD.ink, 'left', 'alphabetic', 2, 'topic-kicker');
      const s = port ? px(300) : 260; FD.odo(t, FD.seqs([[0, '500'], [0.3, '200']]), x + 34, y + h - (port ? px(70) : 56), s);
      FD.words(t, 'OK?', x + 34 + tw('000', FN(s)) + 30, y + h - (port ? px(70) : 56), FN(s * 0.5), FD.ink, 'topic-ok', { at: 0.7 }); }));
    // a small side countdown (teasers only): 3 2 1 in the look
    const n = 3 - Math.floor(clamp(t / 1.0, 0, 2.99)); withA(p, () => { const cx = r.x + r.w - (port ? px(110) : 120), cy = r.y + (port ? px(140) : 120);
      rect(cx - 50, cy - 70, 100, 100, FD.ink); txt(String(n), cx, cy + 4, FN(84), FD.white, 'center', 'alphabetic', 0, 'count'); });
  });
  TH.capOff.push([0, B[1].t0 + 3.0]);
  sfx('ratchet', 0.75, 0, { keep: true }); sfx('tick', 0.02, -4, { keep: true }); sfx('tick', 1.02, -4, { keep: true }); sfx('tick', 2.02, -4, { keep: true });

  /* ---------- act 1 ---------- */
  full(span(2), FD.code({ codes: [{ at: B[2].t0, c: '100' }, { at: at(2, 'three-digit'), c: '503' }, { at: at(2, 'status'), c: '200' }] }), 'z-first-line');
  full(span(3), HT.net({ capRoom: V(170, 330), rows: [['GET', '/books', 200], ['POST', '/books', 201], ['GET', '/books/9999', 404], ['DELETE', '/books/42', 204], ['POST', '/books', 422], ['GET', '/books/42', 500]]
    .map(([m, path, c], i) => ({ m, path, c, at: B[3].t0 + 0.1 * i })), digitAt: at(3, 'first digit'), focus: [{ at: at(3, 'four'), d: '4' }, { at: at(3, 'five'), d: '5' }] }), 'z-digit');

  /* ---------- act 2 · the codes ---------- */
  talk(4, { frame: 'close' });
  half(span(5), FD.code({ codes: [{ at: B[5].t0, c: '400' }, { at: at(5, '422'), c: '422' }] }), 'z-422', 'right');
  full(span(6), FD.photo({ img: 'px_4907178', at: B[6].t0, code: { codes: [[B[6].t0, '401'], [at(6, '403'), '403']], names: [[at(6, 'another room'), 'Another room']] } }), 'z-keycard');
  FD.full(span(7), HT.who({ at: at(7, '401'), at2: at(7, '403'), denyAt: at(7, 'but'), capRoom: V(170, 330) }), { id: 'z-who' });   // (was the 3-line card that re-typed her words)
  half(span(8), FD.code({ codes: [{ at: B[8].t0, c: '403' }, { at: at(8, '404'), c: '404', name: 'on purpose', nameAt: at(8, 'purpose') }] }), 'z-hide', 'left');

  /* ---------- act 3 · the mistakes (faster) ---------- */
  half(span(9), FD.code({ codes: [{ at: B[9].t0, c: '500' }] }), 'z-500', 'right');
  talk(10, { frame: 'close', until: at(10, 'stuck') - 0.6 });
  TH.behind([at(10, 'stuck') - 0.5, B[10].t1], ['STUCK'], { times: [at(10, 'stuck')], id: 'z-stuck', size: V(420, 260), font: 'disp' });
  talk(11, { frame: 'mid', push: V([1.12, 1.28], [1.08, 1.2]) });
  full(span(12), HT.trip({ at: B[12].t0, capRoom: V(170, 330), nodes: [{ k: 'gate', x: 0.15, y: 0.3, label: 'proxy', px: 0.25, py: 0.3 }, { k: 'server', x: 0.75, y: 0.3, label: 'your app', px: 0.75, py: 0.3 }],
    legs: [{ a: 0, b: 1, at: at(12, 'waited') - 0.4 }], wait: { node: 1, at: at(12, 'waited') + 0.3, until: at(12, 'too long') + 0.2 }, cross: { node: 0, at: at(12, 'too long') + 0.2 }, code: { c: '504', at: at(12, '504'), name: 'Gateway Timeout' } }), 'z-504');
  talk(13, { frame: 'mid', push: V([1.12, 1.3], [1.08, 1.22]) });   // the biggest line, in near silence
  half(span(14, '418'), FD.clip('rfc-teapot', { at: at(14, '418') - 0.1, hl: at(14, '418') + 0.2, ground: 'fd4', code: { c: '418', at: at(14, '418') } }), 'z-teapot', 'left');

  /* ---------- trailer grammar: cards on the gaps, every join shown ---------- */
  const tcard = (gp, code, text, o = {}) => TZ.cut(gp, { type: 'card', text, id: o.id, sound: 'ratchet', db: 2, out: o.out === undefined ? 'flash' : o.out, outOpts: { color: FD.white, frames: 2 },
    draw: (t, r, lt, text) => { const gcol = FD.col(code); rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, o.ground || gcol);
      const port = PORTRAIT; const s = Math.min(r.h * 0.42, r.w * 0.5 / 1.8); const cx = r.x + (port ? px(60) : 96), cy = r.y + r.h * 0.5 + s * 0.2;
      FD.odo(lt, FD.seqs([[0, o.from || '000'], [0.02, code]]), cx, cy, s, { col: o.ground ? FD.white : FD.ink });
      _txt(UP(text), cx, cy + (port ? px(120) : 110), FN(port ? px(96) : 92), o.ground ? FD.white : FD.ink, 'left'); } });
  for (const g of Gp) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(2, { type: 'flash', color: FD.white });
  TZ.cut(3, { type: 'black' });
  tcard(Gp[0], '3xx', 'the codes', { id: 'card-codes', from: '2xx' });
  TZ.cut(5, { type: 'whip', color: FD.g4 });
  TZ.cut(6, { type: 'black' });
  TZ.cut(8, { type: 'flash', color: FD.g4 });
  tcard(Gp[1], '5xx', 'the mistakes', { id: 'card-mistakes', from: '4xx' });
  TZ.cut(10, { type: 'glitch', colors: [FD.g5, FD.g4, FD.ink] });
  TZ.cut(11, { type: 'black' });
  TZ.cut(12, { type: 'whip', color: FD.g5 });
  sfx('tapeStop', B[13].t0 - 0.55, -1, { keep: true }); TZ.drop(B[13].t0 - 0.25, B[13].t1 - B[13].t0 + 0.25);
  TZ.cut(13, { type: 'black', sound: 'hit', db: -6 });
  tcard(Gp[2], '200', 'HTTP status codes', { id: 'card-topic', ground: FD.black, from: '500', out: 'black' });
  TZ.music(0, 6, 0.02); TZ.music(B[1].t0 + 0.4, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(Gp[0], -3); lift(Gp[1], 0); lift(Gp[2], 3);

  /* ---------- end card: the title, the question, where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, FD.g2); const port = PORTRAIT; const m = port ? px(60) : 96;
    const p1 = E.outQuint(prog(lt, 0.05, 0.4)), p2 = E.outQuint(prog(lt, 0.4, 0.4)), p3 = E.outQuint(prog(lt, 0.7, 0.45));
    const k = 1 + 0.035 * clamp(lt / 6.5); ctx.translate(r.x + r.w / 2, r.y + r.h / 2); ctx.scale(k, k); ctx.translate(-(r.x + r.w / 2), -(r.y + r.h / 2));
    const zT = port ? px(96) : 92, x = r.x + m, wT = r.w - 2 * m - 60;
    withA(p1, () => { txt('ON YOUTUBE', x, r.y + (port ? px(150) : 150), FM(port ? px(34) : 34), FD.ink, 'left', 'alphabetic', 2, 'ec-kicker');
      txtW(UP(title), x, r.y + (port ? px(150) : 150) + zT * 1.3, FN(zT), FD.ink, wT, zT * 1.04, 0, 'ec-title'); });
    const qy = r.y + r.h * (port ? 0.58 : 0.64);
    withA(p2, () => txtW('Which HTTP status code has confused you the most?', x, qy, FS(port ? px(52) : 52, 500), FD.ink, wT, (port ? px(52) : 52) * 1.25, 0, 'ec-question'));
    withA(p3, () => { const zh = port ? px(110) : 104; txt('@WithGbemi', x, r.y + r.h - m - (port ? px(70) : 60), FN(zh), FD.ink, 'left', 'alphabetic', 0, 'ec-handle');
      txt('youtube.com/@WithGbemi', x, r.y + r.h - m, FM(port ? px(32) : 32), FD.mid, 'left', 'alphabetic', 0, 'ec-url'); });
  }, { ground: 'fd2' });
  FD.flush(-6);
  const T0 = FOOT.dur; sfx('ratchet', T0 + 0.02, 0, { keep: true }); sfx('type', T0 + 0.4, -6); TZ.music(T0, 8, 0.1);
}

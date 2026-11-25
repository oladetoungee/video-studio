/* B · THE FIRST DIGIT: scenes on her real lines (raw seconds). Motion test: 73.9-83.3 (4 = check the request, 5 = check the server). */
'use strict';
F.disp = (s) => NUM(s); F.body = (s, w = 700) => SANS(s, w); F.mono = (s) => MONO(s); LS.disp = -0.03; LS.body = -0.02;
/** three cells side by side; seqs = [seqA, seqB, seqC]; returns total width */
function odo(t, seqs, x, y, s, o = {}) { let xx = x; const f = NUM(s); const adv = tw('0', f); const gap = -s * 0.02;
  const total = adv * 3 + gap * 2; if (o.align === 'center') xx = x - total / 2;
  seqs.forEach((sq, i) => { const a = o.alpha ? o.alpha[i] : 1; cell(sq, t, xx, y, s, { alpha: a });
    if (a < 1) withA((1 - a) * 0.55, () => _txt('x', xx + adv / 2, y, NUM(s * 0.86), BO.ink, 'center')); xx += adv + gap; }); return { x0: o.align === 'center' ? x - total / 2 : x, w: total, adv }; }

function buildFilm() {
  addScene(0, 'b5', 'pre', (t) => {}, { id: 'pre' });

  /* the opening: the first line of every response is a three-digit number; it settles on 200 (6.8-15.0) */
  const S1 = [[[0, 1], [7.0, 5], [9.0, 3], [13.66, 2]], [[0, 0], [7.2, 7], [9.2, 1], [13.72, 0]], [[0, 0], [7.4, 4], [9.4, 8], [13.78, 0]]];
  addScene(6.8, 'b1', 'open', (t) => {
    flood([[0, BO.g1], [7.0, BO.g5], [9.0, BO.g3], [13.66, BO.g2]], t);
    bMark('THE FIRST LINE OF EVERY RESPONSE');
    const s = V(560, 400), y = V(700, 1000);
    withA(ez(t, 6.9, 0.4), () => { const R = odo(t, S1, V(110, CX), y, s, { align: V('left', 'center') });
      withA(ez(t, 14.46, 0.35), () => { _txt('status code', V(R.x0 + 6, R.x0 + 6), y + V(80, 80), MONO(V(38, 42)), BO.ink, 'left'); rect(V(R.x0 + 6, R.x0 + 6), y + V(26, 26), R.w * ez(t, 14.46, 0.4), 4, BO.ink); });
      withA(ez(t, 15.0, 0.4), () => { const x2 = V(R.x0 + R.w + 70, CX), y2 = V(y, y + 330); _txt('OK', x2, y2, NUM(V(300, 260)), BO.ink, V('left', 'center'));
        _txt('reason phrase', V(x2 + 6, CX), y2 + V(80, 80), MONO(V(38, 42)), BO.ink, V('left', 'center')); });
    });
    withA(ez(t, 11.4, 0.4), () => txt('HTTP/1.1', V(116, CX), V(y - s * 0.95, y - s * 0.95), MONO(V(44, 44)), BO.ink, V('left', 'center'), 'alphabetic', 2, 'HTTP/1.1'));
  }, { id: 'open' });
  cue('spin', 7.0, -10); cue('spin', 9.0, -12); cue('ratchet', 13.66, -4); cue('tick', 14.46, -8); cue('pop', 15.0, -6);

  /* the first digit tells you where to look: 4 = the request, 5 = the server (73.9-83.3) */
  const S2 = [[[0, 2], [78.12, 4], [81.44, 5]], [[0, 0], [78.18, 0]], [[0, 0]]];
  addScene(73.9, 'b2', 'first', (t) => {
    flood([[0, BO.g2], [78.12, BO.g4], [81.44, BO.g5]], t);
    bMark('LOOK AT THE FIRST DIGIT FIRST');
    const s = V(560, 470), y = V(700, 900);
    const dim = 1 - ez(t, 74.85, 0.45);
    const R = odo(t, S2, V(110, CX), y, s, { align: V('left', 'center'), alpha: [1, dim, dim] });
    // the first digit gets a heavy underline on "first digit"
    rect(R.x0, y + V(40, 34), R.adv * ez(t, 74.85, 0.4, 'outExpo'), V(18, 16), BO.ink);
    // where to look: the request (4) / the server (5)
    const lx = V(R.x0 + R.w + 80, 90), ly = V(470, 1260);
    withA(ez(t, 74.2, 0.3) * (1 - ez(t, 77.9, 0.2)), () => { _txt('look at the', lx, ly, SANS(V(64, 64), 500), BO.ink, 'left'); bWords(t, { lines: ['first digit', 'first.'], times: [74.85, 75.18, 76.95] }, lx, ly + V(118, 130), V(112, 132), { id: 'first digit first' }); });
    withA(ez(t, 78.4, 0.3) * (1 - ez(t, 81.2, 0.2)), () => { _txt('check', lx, ly, SANS(V(64, 64), 500), BO.ink, 'left'); bWords(t, { lines: ['the request'], times: [79.24, 79.36] }, lx, ly + V(118, 130), V(112, 132), { id: 'the request' });
      withA(ez(t, 79.85, 0.35), () => _txt('the client sends', lx, ly + V(196, 220), SANS(V(54, 54), 600), BO.ink, 'left')); });
    withA(ez(t, 81.9, 0.3), () => { _txt('check', lx, ly, SANS(V(64, 64), 500), BO.ink, 'left'); bWords(t, { lines: ['the server'], times: [82.56, 82.7] }, lx, ly + V(118, 130), V(112, 132), { id: 'the server' }); });
  }, { id: 'first' });
  cue('tick', 74.85, -6); cue('ratchet', 78.12, -3); cue('type', 79.3, -10); cue('ratchet', 81.44, -3); cue('type', 82.56, -10);

  /* Google's docs: 404 and 410 treated the same (258.9-262.6), the real page as the receipt */
  const S3 = [[[0, 4]], [[0, 0], [261.32, 1]], [[0, 4], [261.38, 0]]];
  addScene(258.9, 'b3', 'google', (t) => {
    flood([[0, BO.g4]], t);
    bMark('GOOGLE SEARCH CENTRAL');
    const s = V(330, 280), y = V(500, 520);
    const R = odo(t, [[[0, 4]], [[0, 0]], [[0, 4]]], V(110, 90), y, s);
    withA(ez(t, 261.2, 0.3), () => odo(t, S3, R.x0, y + V(330, 300), s));
    withA(ez(t, 261.9, 0.35), () => txt('treated the same way', V(110, 90), y + V(430, 400), SANS(V(56, 56), 700), BO.ink, 'left', 'alphabetic', 0, 'treated the same way'));
    clipCard(t, 'google-line', V(880, 90), V(420, 1060), V(940, 900), { at: 259.0, hlAt: 259.6, hl: '#FFE9A8', credit: BO.ink, creditSize: V(26, 28), creditFont: MONO, shadow: 10 });
  }, { id: 'google' });
  cue('shutter', 259.0, -6); cue('marker', 259.6, -8); cue('ratchet', 261.32, -5);
}

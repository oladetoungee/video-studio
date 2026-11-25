/* C · NOW SERVING: scenes on her real lines (raw seconds). Motion test: 359.3-368.6 (GitHub answers 404, not 403). */
'use strict';
F.disp = (s) => RS(s, 900); F.body = (s, w = 800) => RS(s, w); F.mono = (s) => RM(s); LS.disp = -0.03; LS.body = -0.02;
const BRD = () => ({ x: V(820, 90), y: V(110, 140), w: V(1000, 900), h: V(560, 520) });

function buildFilm() {
  addScene(0, 'c5', 'pre', (t) => {}, { id: 'pre' });

  /* opening: the request is a ticket, the answer is the board: 200 OK (13.0-15.4) */
  addScene(13.0, 'c3', 'serve', (t) => {
    const b = BRD(); board(t, b.x, b.y, b.w, b.h, { codes: [[0, '   ', ''], [13.66, '200', 'OK']] });
    dispenser(t, V(150, 120), V(330, 1060), V(400, 380), { printAt: 13.05, lines: [['REQUEST', 0.08, CS.red], ['GET'], ['/books/42']] });
    withA(ez(t, 14.46, 0.35), () => txt('the status code', b.x + b.w / 2, b.y + b.h + V(70, 80), RM(V(34, 36)), CS.ink, 'center', 'alphabetic', 1, 'the status code'));
    withA(ez(t, 15.0, 0.35), () => txt('the reason phrase', b.x + b.w / 2, b.y + b.h + V(120, 130), RM(V(34, 36)), CS.mid, 'center', 'alphabetic', 1, 'the reason phrase'));
  }, { id: 'serve' });
  cue('print', 13.05, -6); cue('ding', 13.66, -4); cue('tick', 14.46, -9);

  /* the hotel keycard: 401 no card, 403 card for another room (325.0-333.6). Pexels photo in a rounded window */
  addScene(325.0, 'c4', 'keycard', (t) => {
    const px = V(110, 90), py = V(150, 160), pw = V(700, 900), ph = V(780, 560);
    const a = ez(t, 325.05, 0.5); withA(a, () => { clipRR(px, py + 40 * (1 - a), pw, ph, 28, () => cover('px_4907178', px, py + 40 * (1 - a), pw, ph, 0.72, 0.4)); });
    withA(ez(t, 325.4, 0.4), () => txt('PHOTO: KETUT SUBIYANTO / PEXELS', px, py + ph + V(44, 46), RM(V(22, 26)), CS.mid, 'left', 'alphabetic', 1, 'credit keycard'));
    const b = { x: V(900, 90), y: V(150, 820), w: V(910, 900), h: V(520, 520) };
    const cur = board(t, b.x, b.y, b.w, b.h, { codes: [[0, '   ', ''], [326.76, '401', 'NO CARD'], [329.8, '403', 'ANOTHER ROOM']] });
    withA(ez(t, 327.4, 0.35) * (1 - ez(t, 329.7, 0.15)), () => wallWords(t, ['who are you?'], [327.43], b.x, b.y + b.h + V(110, 120), V(72, 76), { id: 'k1' }));
    withA(ez(t, 330.5, 0.35), () => wallWords(t, ['your card works,', 'another room'], [330.76, 330.99, 331.41, 332.0, 332.32], b.x, b.y + b.h + V(110, 120), V(72, 76), { id: 'k2' }));
  }, { id: 'keycard' });
  cue('shutter', 325.05, -7); cue('ding', 326.76, -4); cue('buzz', 329.8, -6);

  /* GitHub returns 404 instead of 403 to hide that a private repo exists (359.3-365.3) */
  addScene(359.3, 'c1', 'hide', (t) => {
    const b = BRD(); board(t, b.x, b.y, b.w, b.h, { codes: [[0, '   ', ''], [361.07, '404', 'NOT FOUND']] });
    dispenser(t, V(150, 120), V(330, 1060), V(400, 380), { printAt: 359.45, tearAt: 360.5, tearDX: V(330, 420), tearDY: V(60, 40), tearR: 0.05, lines: [['REQUEST', 0.08, CS.red], ['GET'], ['/repos/private']] });
    // the code it is NOT: 403, struck through on "403"
    const nx = b.x + b.w / 2, ny = b.y + b.h + V(50, 50);
    withA(ez(t, 362.12, 0.3), () => { const w0 = dotText('403', nx, ny, V(16, 16), { align: 'center', col: CS.mid, unlit: false }); rect(nx - w0 / 2 - 14, ny + V(52, 52), (w0 + 28) * ez(t, 362.3, 0.35, 'outExpo'), 10, CS.red); });
    withA(ez(t, 363.2, 0.3), () => wallWords(t, ['to hide that', 'it exists'], [363.26, 363.4, 363.49, 363.72, 364.23], b.x + b.w / 2, b.y + b.h + V(250, 250), V(74, 78), { align: 'center', id: 'hide' }));
  }, { id: 'hide' });
  cue('print', 359.45, -6); cue('tear', 360.5, -5); cue('ding', 361.07, -3); cue('marker', 362.3, -6); cue('type', 363.26, -10);

  /* the receipt: GitHub's own docs taped to the wall (365.3-368.6) */
  addScene(365.3, 'c2', 'github', (t) => {
    clipCard(t, 'gh-line', V(80, 40), V(130, 860), V(1760, 1000), { at: 365.35, hlAt: 365.9, hl: '#FFD98A', credit: CS.mid, creditFont: RM, creditSize: V(26, 28), tape: 'rgba(255,253,244,0.82)', tilt: -0.008, shadow: 8 });
    const b = { x: V(80, 140), y: V(440, 160), w: V(860, 800), h: V(560, 460) };
    board(t, b.x, b.y, b.w, b.h, { codes: [[0, '404', 'NOT FOUND']] });
    withA(ez(t, 366.6, 0.35), () => wallWords(t, ['a private repo', 'you can\'t see'], [367.15, 367.15, 367.48, 368.2, 368.38, 368.67], V(1060, 90), V(700, 1560), V(80, 74), { id: 'gh' }));
  }, { id: 'github' });
  cue('tape', 365.35, -6); cue('marker', 365.9, -7);
}

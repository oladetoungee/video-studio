/* Talking-head + shorts style frames over her REAL footage (frames from kit/raw-video.mov, never flipped, no retouching).
 * 16:9 = the full talking-head edit (one layout per look + a receipt + a phrase card + one in-edit correction);
 * 9:16 = short SH8 "401 vs 403" in each look (no timers in shorts). Each still is a scene placed at the time of her line. */
'use strict';
const FX = 0.465;   // her face sits a touch left of centre in the 4K frame
function odoStatic(s, x, y, size, col, o = {}) { _txt(s, x, y, NUM(size), col, o.align || 'left'); }

function buildFilm() {
  addScene(0, 'a5', 'pre', (t) => {}, { id: 'pre' });

  /* TH-A · half and half: the line-drawn counter on the left, her on the right (111.9: "returns 200 OK") */
  addScene(111.5, 'a1', 'th-a-half', (t) => {
    rect(0, 0, W, H, AL.bg); footage('f_raw_111_9', 960, 0, 960, H, 0.49, 0.5);
    handTitle(t, 0, 'BOOKSTORE API', 'GET /BOOKS/42', 90, 200, { size: 64, dur: 0.01, rule: true });
    laptop(260, 640, 280, 1); counter(700, 840, 360, 1, { books: 5, sign: 'API' });
    tag('GET /books/42', 520, 470, AL.pen, { size: 34 }); tag('200', 330, 760, AL.c2, { size: 34 }); _txt('OK', 395, 772, CODE(36), AL.c2, 'left');
    herCaption('So GET /books/42 returns 200 OK with the book.', { x: 1440, y: 1000, size: 40, hi: { '200': AL.c2, 'OK': AL.c2 }, stroke: 0, box: 'rgba(0,0,0,0.55)' });
  }, { id: 'th-a-half' });

  /* TH-B · words behind her: a giant amber 404 between her and the room (236.0: "404 not found") */
  addScene(235.6, 'b1', 'th-b-behind', (t) => {
    footage('f_raw_236_0', 0, 0, W, H, 0.5, 0.5);
    rect(0, 0, W, H, 'rgba(0,0,0,0.0)'); _txt('404', CX - 60, 820, NUM(760), BO.g4, 'center');
    cutout('f_raw_236_0', 'f_matte_236_0', 0, 0, W, H, 0.5, 0.5);
    herCaption('404 Not Found means there’s nothing at that address.', { size: 44, y: 1010, hi: { '404': BO.g4 }, stroke: 0, box: 'rgba(0,0,0,0.5)' });
  }, { id: 'th-b-behind' });

  /* TH-C · receipt over her: GitHub's docs taped on the left, the board top right (366.0: "GitHub's API does this") */
  addScene(365.6, 'c1', 'th-c-receipt', (t) => {
    footage('f_raw_366_0', 0, 0, W, H, 0.5, 0.5);
    clipCard(366.4, 'gh-line', 160, 690, 1600, { at: 365.6, hlAt: 365.9, hl: '#FFD98A', credit: '#FFFFFF', creditFont: RM, creditSize: 24, tape: 'rgba(255,253,244,0.85)', tilt: -0.01, shadow: 8 });
    herCaption('For example, GitHub’s API does this.', { size: 44, y: 1010, stroke: 0, box: 'rgba(0,0,0,0.5)' });
  }, { id: 'th-c-receipt' });

  /* TH · black phrase card cut (334.9): her line, accent serif in the class colour (4xx amber) */
  addScene(334.7, 'b5', 'th-card', (t) => phraseCard(t, 0, ['401:', 'Who are you?'], BO.g4, { size: 150 }), { id: 'th-card' });

  /* TH · in-edit correction (491.6): she says "The first one is leaking stack traces"; it is the FOURTH mistake.
     The edit cuts to the B look for 1.5 s: the mistake counter rolls 3 -> 4, her caption reads "The fourth one". */
  addScene(491.3, 'b4', 'fix', (t) => {
    rect(0, 0, W, H, BO.g5);
    txt('COMMON MISTAKES', 110, 150, MONO(30), 'rgba(18,18,18,0.75)', 'left', 'alphabetic', 2, 'fix label');
    _txt('4', 110, 760, NUM(620), BO.ink, 'left'); rect(110, 800, tw('4', NUM(620)), 18, BO.ink);
    _txt('/ 4', 110 + tw('4', NUM(620)) + 30, 760, NUM(200, 600), 'rgba(18,18,18,0.45)', 'left');
    _txt('leaking', 900, 520, SANS(64, 500), BO.ink, 'left'); _txt('stack traces', 900, 650, SANS(124, 800), BO.ink, 'left');
    _txt('in your 500 response', 900, 730, SANS(52, 500), BO.ink, 'left');
    herCaption('The fourth one is leaking stack traces in your 500 response.', { size: 46, y: 1010, col: BO.ink });
  }, { id: 'fix' });

  /* ---- SH8 "401 vs 403" shorts frames (9:16), one per look ---- */
  /* A · half and half: black top panel with the handwritten title + line keycard; her bottom half; one word at a time */
  addScene(400.0, 'a2', 'sh8-a', (t) => {
    rect(0, 0, W, H, AL.bg); footage('f_raw_334_9', 0, 920, W, 1000, 0.465, 0.42);
    handTitle(t, 0, 'HTTP STATUS CODES', '401 VS 403', 80, 240, { size: 100, dur: 0.01, hi: '401', hiCol: AL.c4 });
    // the keycard and the door, in pen lines
    pen(box(150, 420, 260, 420), 1, AL.pen, 5); pen(box(345, 610, 30, 70), 1, AL.pen, 4);
    pen(box(560, 520, 210, 130), 1, AL.c4, 5); pen([[590, 560], [690, 560]], 1, AL.c4, 3); _txt('NO CARD', 665, 720, HAND(44), AL.c4, 'center', 'alphabetic', 2);
    _txt('= 401', 820, 610, CODE(60), AL.c4, 'left');
    _txt('UNAUTHORIZED VS FORBIDDEN', 80, 330, HAND(40, 400), AL.grey, 'left', 'alphabetic', 1);
    // C6: one word at a time, on her half only
    const f = '800 150px "Helvetica Neue"'; setFont(f); ctx.lineJoin = 'round'; ctx.lineWidth = 14; ctx.strokeStyle = '#000'; ctx.textAlign = 'center'; ctx.strokeText('who', CX, 1640); _txt('who', CX, 1640, f, '#FFFFFF', 'center');
  }, { id: 'sh8-a' });

  /* B · the class colour on top: an amber block (4xx) with the code in giant ink, her below; T7 mixed-font title; C1 caps captions */
  addScene(401.0, 'b2', 'sh8-b', (t) => {
    footage('f_raw_334_9', 0, 640, W, 1280, FX, 0.3);
    rect(0, 0, W, 660, BO.g4);
    
    _txt('401', 80, 520, NUM(400), BO.ink, 'left');
    _txt('401 vs 403', 80, 150, NUM(64), BO.ink, 'left'); _txt('Unauthorized vs Forbidden', 80 + tw('401 vs 403 ', NUM(64)), 150, 'italic 400 60px "Instrument Serif"', BO.ink, 'left');
    capCaps('WHO ARE YOU?', 'WHO', 1560, { size: 100, hiCol: BO.g4 });
  }, { id: 'sh8-b' });

  /* C · the board on the wall above her (her video in the lower part), C9 sentence captions, amber, outlined */
  addScene(402.0, 'c2', 'sh8-c', (t) => {
    rect(0, 0, W, H, CS.wall); footage('f_raw_334_9', 0, 700, W, 1220, FX, 0.3);
    _txt('401 vs 403', CX, 140, RS(68, 900), CS.ink, 'center');
    board(t, 120, 190, 840, 470, { codes: [[0, '401', 'WHO ARE YOU?']] });
    herCaption('So 401 is kind of: who are you?', { size: 68, y: 1560, col: CS.amber, stroke: 9, weight: 700 });
  }, { id: 'sh8-c' });

  /* the 403 half as a black phrase card (all looks share the card; accent = 4xx amber) */
  addScene(403.0, 'b3', 'sh8-card', (t) => phraseCard(t, 0, ['403:', 'I know who you are,', 'but you can’t do this.'], BO.g4, { size: 112 }), { id: 'sh8-card' });
}

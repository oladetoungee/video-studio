/* A · THE FIELD GUIDE: scenes on her real lines (raw recording seconds). Motion test: 60.6-70.6 (hard to cancel / roach motel). */
'use strict';
/* ---------- specimen 01: confirmshaming (her words 45.2-56.7) ---------- */
function confirmLayout(t, o = {}) {
  const at = o.final ? -9 : null;
  if (!PORTRAIT) {
    specimen(110, 150, 820, 790, 'SPECIMEN 01 / 11', 'FOUND ON: POP-UPS', { a: o.cardA == null ? 1 : o.cardA, draw: () => {
      const P0 = popup(t, 230, 250, 580, { linkAt: at == null ? 54.9 : at });
      loop(P0.lx, P0.ly, P0.lw / 2 + 34, 34, at != null ? 1 : ez(t, 55.3, 0.6), A.red, 7);
      pin(t, at != null ? null : 46.0, 520, 268);
    } });
    const y = fieldName(t, at != null ? null : 45.9, 1010, 222, 'COMMON NAME', 'Confirmshaming', 800, 104);
    withA(at != null ? 1 : ez(t, 48.4, 0.5), () => { _txt('The “no” button is written', 1010, y + 92, F.body(44, 500), A.txt); _txt('to make you feel bad.', 1010, y + 148, F.body(44, 500), A.txt); });
    clipCard(t, 'dd-confirm', 1010, 590, 800, { crop: [0, 170], at: at != null ? null : 52.0, pad: 18, credit: A.txtMid, creditSize: 26 });
    pin(t, at != null ? null : 52.3, 1410, 600, 13);
  } else {
    const y = fieldName(t, at != null ? null : 45.9, L, 430, 'COMMON NAME', 'Confirmshaming', 920, 120);
    withA(at != null ? 1 : ez(t, 48.4, 0.5), () => { _txt('The “no” button is written', L, y + 84, F.body(46, 500), A.txt); _txt('to make you feel bad.', L, y + 142, F.body(46, 500), A.txt); });
    specimen(L, 760, W - 2 * L, 720, 'SPECIMEN 01 / 11', '', { draw: () => {
      const P0 = popup(t, L + 160, 850, 600, { linkAt: at == null ? 54.9 : at });
      loop(P0.lx, P0.ly, P0.lw / 2 + 40, 40, at != null ? 1 : ez(t, 55.3, 0.6), A.red, 8);
      pin(t, at != null ? null : 46.0, CX, 868);
    } });
  }
}
/* ---------- specimen 02: hard to cancel / roach motel (60.9-70.5) ---------- */
function roachLayout(t) {
  const T = { card: 61.72, name: [62.22, 62.46, 62.66], aka: 63.3, roach: [64.40, 64.72], photo: 62.0, pinP: 62.35, inn: 68.24, out: 69.66 };
  const cardP = ez(t, T.card, 0.55);
  const draw = () => {
    // the specimen photo: a real cockroach (Pexels), a white print pinned to the card
    const pp = ez(t, T.photo, 0.45);
    withA(clamp(pp * 2), () => withT(V(170, L + 70), V(250, 880) + 30 * (1 - pp), 1, -0.025, () => { rect(0, 0, V(450, 560), V(300, 300), A.paper); cover('px_roach', 14, 14, V(422, 532), V(272, 272), 0.6, 0.48, 2.3); }));
    pin(t, T.pinP, V(395, CX), V(268, 898));
    // the trap, in two lines: in = one click, out = page after page
    const dy = V(610, 1260), x0 = V(170, L + 70);
    withA(ez(t, T.inn - 0.2, 0.3), () => _txt('IN', x0, dy, F.mono(30, 500), A.ink, 'left'));
    const pi = ez(t, T.inn, 0.5, 'outExpo'); pline(x0 + 80, dy - 11, x0 + 80 + 330 * pi, dy - 11, 1, A.ink, 5);
    if (pi > 0.9) { ctx.fillStyle = A.ink; ctx.beginPath(); ctx.moveTo(x0 + 420, dy - 11); ctx.lineTo(x0 + 398, dy - 24); ctx.lineTo(x0 + 398, dy + 2); ctx.fill(); }
    withA(ez(t, T.inn + 0.4, 0.4), () => _txt('one click', x0 + 450, dy, F.body(40, 600), A.ink, 'left'));
    const oy = dy + V(120, 100);
    withA(ez(t, T.out - 0.2, 0.3), () => _txt('OUT', x0, oy, F.mono(30, 500), A.red, 'left'));
    // a zig-zag through pages: each page a small box the line has to pass
    const po = clamp((t - T.out) / 1.0); const pages = 5; const pw = V(64, 80), gap = V(14, 22);
    for (let i = 0; i < pages; i++) { const px = x0 + 90 + i * (pw + gap); const a = clamp(po * pages - i); if (a <= 0) continue;
      withA(a, () => { rect(px, oy - 62 + (i % 2) * 22, pw, 84, A.paper); strokeR(px, oy - 62 + (i % 2) * 22, pw, 84, A.red, 3); hline(px + 12, oy - 36 + (i % 2) * 22, pw - 24, 1, 'rgba(21,32,31,0.35)', 4); hline(px + 12, oy - 22 + (i % 2) * 22, (pw - 24) * 0.6, 1, 'rgba(21,32,31,0.35)', 4); }); }
    withA(ez(t, T.out + 1.0, 0.4), () => _txt('page after page', x0 + 90, oy + V(90, 74), F.body(40, 600), A.red, 'left'));
  };
  if (!PORTRAIT) {
    specimen(110, 150, 820, 790, 'SPECIMEN 02 / 11', 'FOUND ON: MEMBERSHIPS', { a: clamp(cardP * 2), rise: 40 * (1 - cardP), draw });
    const y = fieldName(t, T.name[0], 1010, 222, 'COMMON NAME', 'Hard to cancel', 800, 104, { times: T.name });
    const y2 = fieldName(t, T.aka + 0.15, 1010, y + 120, 'ALSO KNOWN AS', 'Roach Motel', 800, 104, { times: T.roach });
    withA(ez(t, 65.5, 0.5), () => { _txt('Named after a cockroach trap:', 1010, y2 + 92, F.body(44, 500), A.txt); _txt('easy to get in, hard to get out.', 1010, y2 + 148, F.body(44, 500), A.txt); });
  } else {
    const y = fieldName(t, T.name[0], L, 430, 'COMMON NAME', 'Hard to cancel', 920, 112, { times: T.name });
    fieldName(t, T.aka + 0.15, L, y + 70, 'ALSO KNOWN AS', 'Roach Motel', 920, 112, { times: T.roach });
    specimen(L, 800, W - 2 * L, 660, 'SPECIMEN 02 / 11', '', { a: clamp(cardP * 2), rise: 40 * (1 - cardP), draw });
  }
}
/* ---------- specimen 10: fake urgency (227.5-242) ---------- */
function urgencyLayout(t) {
  const draw = (x, y, w) => {
    // the product card: a real shoe photo (Pexels) + a countdown that restarts
    rect(x, y, w, w * 0.62, A.paper); cover('px_shoe', x + 20, y + 20, w * 0.42, w * 0.62 - 40, 0.55, 0.62);
    const tx = x + w * 0.48;
    _txt('Running shoes', tx, y + 80, F.body(40, 700), A.ink); _txt('€40', tx, y + 136, F.body(40, 500), A.mid);
    _txt('DEAL ENDS IN', tx, y + 210, F.mono(26, 500), A.mid, 'left', 'alphabetic', 0.5);
    const rs = t >= 238.3 && t < 238.6 ? 0 : 1;   // the refresh: one blink, then 10:00 again
    const left = t < 234.2 ? 600 : t < 238.3 ? 600 - Math.floor(t - 234.2) : 600 - Math.max(0, Math.floor(t - 238.6));
    const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
    withA(rs, () => _txt(mm + ':' + ss, tx, y + 312, F.disp(110), A.red));
  };
  if (!PORTRAIT) {
    specimen(110, 150, 820, 790, 'SPECIMEN 10 / 11', 'FOUND ON: PRODUCT PAGES', { draw: () => {
      draw(170, 230, 700); pin(t, 229.4, 520, 245);
      tag(t, 236.2, 340, 660, 200, 700, ['first visit', '10:00'], { rot: -0.02 });
      tag(t, 238.4, 640, 660, 520, 720, ['after refresh', '10:00'], { rot: 0.03 });
    } });
    const y = fieldName(t, 229.22, 1010, 222, 'COMMON NAME', 'Fake urgency', 800, 104, { times: [229.22, 229.66] });
    withA(ez(t, 231.1, 0.5), () => _txt('A deadline that is not real.', 1010, y + 92, F.body(44, 500), A.txt));
    clipCard(t, 'dd-urgency', 1010, 560, 800, { crop: [0, 170], at: 232.7, pad: 18, credit: A.txtMid, creditSize: 26 });
    pin(t, 233.0, 1410, 570, 13);
  } else {
    const y = fieldName(t, 229.22, L, 430, 'COMMON NAME', 'Fake urgency', 920, 120, { times: [229.22, 229.66] });
    withA(ez(t, 231.1, 0.5), () => _txt('A deadline that is not real.', L, y + 84, F.body(46, 500), A.txt));
    specimen(L, 700, W - 2 * L, 780, 'SPECIMEN 10 / 11', '', { draw: () => {
      draw(L + 40, 790, W - 2 * L - 80); pin(t, 229.4, CX, 805);
      tag(t, 236.2, 300, 1300, 150, 1330, ['first visit', '10:00']); tag(t, 238.4, 640, 1300, 560, 1340, ['after refresh', '10:00'], { rot: 0.03 });
    } });
  }
}

function buildFilm() {
  addScene(0, 'drawer', 'pre', (t) => { drawer(); }, { id: 'pre' });

  /* p2 / a5: the guide's first page: who named them (33.7-42) */
  addScene(33.5, 'drawer', 'origin', (t) => {
    drawer();
    if (!PORTRAIT) {
      const y = fieldName(t, 36.68, 110, 200, 'FIRST DESCRIBED BY', 'Harry Brignull, 2010', 1000, 112, { times: [36.68, 36.84, 41.44] });
      withA(ez(t, 39.26, 0.5), () => _txt('a UX designer, who coined the term “dark patterns”', 110, y + 88, F.body(42, 500), A.txt));
      clipCard(t, 'dd-origin', 110, 560, 1000, { at: 38.0, hlAt: 40.2, hl: '#F6D9D6', pad: 20, credit: A.txtMid, creditSize: 26 }); pin(t, 38.3, 610, 570, 13);
      specimen(1240, 150, 570, 790, 'CONTENTS', '', { draw: () => NAMES.forEach((n, i) => withA(ez(t, 41.6 + i * 0.07, 0.35), () => {
        const yy = 290 + i * 58; _txt(String(i + 1).padStart(2, '0'), 1290, yy, F.mono(26, 500), A.red); _txt(n, 1360, yy, F.body(36, 600), A.ink); })) });
    } else {
      const y = fieldName(t, 36.68, L, 420, 'FIRST DESCRIBED BY', 'Harry Brignull, 2010', 920, 104, { times: [36.68, 36.84, 41.44] });
      withA(ez(t, 39.26, 0.5), () => { _txt('a UX designer, who coined', L, y + 76, F.body(44, 500), A.txt); _txt('the term “dark patterns”', L, y + 132, F.body(44, 500), A.txt); });
      clipCard(t, 'dd-origin', L, 760, W - 2 * L, { at: 38.0, hlAt: 40.2, hl: '#F6D9D6', pad: 20, credit: A.txtMid, creditSize: 28 }); pin(t, 38.3, CX, 770, 13);
      specimen(L, 1090, W - 2 * L, 390, 'CONTENTS', '', { draw: () => NAMES.slice(0, 5).forEach((n, i) => withA(ez(t, 41.6 + i * 0.07, 0.35), () => {
        const yy = 1215 + i * 52; _txt(String(i + 1).padStart(2, '0'), L + 40, yy, F.mono(30, 500), A.red); _txt(n, L + 120, yy, F.body(40, 600), A.ink); })) });
    }
  }, { id: 'origin' });

  addScene(44.5, 'drawer', 'confirm', (t) => { drawer(); confirmLayout(t); }, { id: 'confirm' });
  cue('paper', 45.9, -4); cue('pin', 46.0, -3); cue('marker', 55.3, -4);

  /* motion test: the drawer slides to the next specimen on "Another pattern" (60.94) */
  addScene(60.6, 'drawer', 'roach', (t) => {
    drawer();
    const s = io(t, 60.94, 0.75); const dx = -W * s;
    ctx.save(); ctx.translate(dx, 0); confirmLayout(t, { final: true }); ctx.restore();
    const push = 1 + 0.035 * io(t, 62.4, 7.6); ctx.save(); ctx.translate(dx + W, 0); ctx.translate(CX, H / 2); ctx.scale(push, push); ctx.translate(-CX, -H / 2); roachLayout(t); ctx.restore();
  }, { id: 'roach' });
  cue('slide', 60.98, -6); cue('paper', 61.72, -4); cue('type', 62.22, -6); cue('type2', 64.40, -5);
  cue('shutter', 62.0, -4); cue('pin', 62.35, -3); cue('marker', 68.24, -5); cue('scribble', 69.66, -6);

  /* black phrase card (her line 155.9-157.6) */
  addScene(155.85, 'black', 'phrase', (t) => {
    rect(0, 0, W, H, '#000000');
    KT(t, { lines: V(['It’s not bad design.', 'It’s ~intentional.~'], ['It’s not', 'bad design.', 'It’s ~intentional.~']), x: CX, y: V(470, 820), size: V(120, 110), align: 'center',
      font: 'disp', upper: false, col: A.cream, acc: A.red, times: [155.90, 156.02, 156.20, 156.48, 156.64, 156.9], ul: false, blur: 6 });
  }, { id: 'phrase' });
  cue('hit', 155.9, -4);

  addScene(227.4, 'drawer', 'urgency', (t) => { drawer(); urgencyLayout(t); }, { id: 'urgency' });
  cue('paper', 229.2, -4); cue('tick', 236.3, -4); cue('tape', 238.3, -5);

  /* how common: the field survey (313.9-324) */
  addScene(313.8, 'drawer', 'survey', (t) => {
    drawer();
    if (!PORTRAIT) {
      withA(ez(t, 315.1, 0.4), () => _txt('FIELD SURVEY  ·  EUROPEAN COMMISSION  ·  JANUARY 2023', 110, 150, F.mono(30, 500), A.txtMid, 'left', 'alphabetic', 0.6));
      KT(t, { lines: ['148 of 399'], x: 104, y: 340, size: 190, font: 'disp', upper: false, col: A.txt, times: [320.76, 321.0, 318.94], blur: 8 });
      withA(ez(t, 321.84, 0.5), () => _txt('online shops had at least one of three dark patterns', 110, 420, F.body(44, 500), A.txt));
      clipCard(t, 'ec-head', 110, 500, 1700, { at: 316.76, hlAt: [320.76, 318.94], hl: '#F6D9D6', pad: 26, credit: A.txtMid, creditSize: 26 });
      pin(t, 317.0, 960, 512);
    } else {
      withA(ez(t, 315.1, 0.4), () => { _txt('FIELD SURVEY', L, 420, F.mono(30, 500), A.txtMid, 'left', 'alphabetic', 0.6); _txt('EUROPEAN COMMISSION · JAN 2023', L, 470, F.mono(30, 500), A.txtMid, 'left', 'alphabetic', 0.6); });
      KT(t, { lines: ['148', 'of 399'], x: L - 4, y: 660, size: 170, font: 'disp', upper: false, col: A.txt, times: [320.76, 321.0, 318.94], blur: 8 });
      withA(ez(t, 321.84, 0.5), () => { _txt('online shops had at least', L, 920, F.body(46, 500), A.txt); _txt('one of three dark patterns', L, 978, F.body(46, 500), A.txt); });
      clipCard(t, 'ec-head', L, 1060, W - 2 * L, { at: 316.76, hlAt: [320.76, 318.94], creditText: 'European Commission · 30 Jan 2023', hl: '#F6D9D6', pad: 20, credit: A.txtMid, creditSize: 28 }); pin(t, 317.0, CX, 1070);
    }
  }, { id: 'survey' });
  cue('pin', 317.0, -3); cue('marker', 320.76, -5);
}

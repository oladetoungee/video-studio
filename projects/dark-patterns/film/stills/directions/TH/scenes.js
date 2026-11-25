/* Talking-head + shorts style frames over her REAL footage (frames from kit/raw-video.mov, never flipped, no retouching).
 * 16:9 scenes = full talking-head edit layouts (one per direction + a receipt layout); 9:16 = short SH9 (fake countdown timers).
 * Each still is a scene placed at the time of her line. */
'use strict';
const LOOK = {
  A: () => { F.disp = (s) => `400 ${s}px "Young Serif"`; F.body = (s, w = 500) => `${w} ${s}px "Hanken Grotesk"`; F.mono = (s, w = 500) => `${w} ${s}px "Martian Mono"`; LS.mono = 0.02; },
  B: () => { F.disp = (s, w = 700) => `${w} ${s}px "Space Grotesk"`; F.body = (s, w = 500) => `${w} ${s}px "Space Grotesk"`; F.mono = (s, w = 400) => `${w} ${s}px "Space Mono"`; LS.mono = 0.04; },
  C: () => { F.disp = (s, w = 900) => `${w} ${s}px Geist`; F.body = (s, w = 600) => `${w} ${s}px Geist`; F.mono = (s, w = 500) => `${w} ${s}px "Geist Mono"`; LS.mono = 0.06; },
};
/** her cut-out: footage with the Vision person matte as alpha (built once, cached) */
const _cut = {};
function cutout(name, matte) {
  if (!_cut[name]) { const im = IMG[name], m = IMG[matte]; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d');
    x.drawImage(m, 0, 0, c.width, c.height); const md = x.getImageData(0, 0, c.width, c.height); x.clearRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
    const d = x.getImageData(0, 0, c.width, c.height); for (let i = 0; i < d.data.length; i += 4) d.data[i + 3] = md.data[i]; x.putImageData(d, 0, 0); _cut[name] = c; }
  themeFixed(() => ctx.drawImage(_cut[name], 0, 0, W, H));
}
/** C1 short caption: heavy condensed caps, white, black stroke, one yellow word */
function capC1(words, hi, y) {
  const font = `400 ${86}px Anton`; setFont(font, 1); const ws = words.split(' '); const sp = tw(' ', font); const total = ws.reduce((a, w) => a + tw(w, font, 1), 0) + sp * (ws.length - 1);
  let x = CX - total / 2; ctx.lineJoin = 'round';
  ws.forEach((w) => { setFont(font, 1); ctx.lineWidth = 12; ctx.strokeStyle = '#000'; ctx.textAlign = 'left'; ctx.strokeText(w, x, y); ctx.fillStyle = w === hi ? '#FFE125' : '#FFFFFF'; ctx.fillText(w, x, y); x += tw(w, font, 1) + sp; });
}
/** T4 top title: a solid yellow box, black bold sans, types on */
function titleT4(t, t0, lines, y) {
  const fs = 56, lh = 70, font = `700 ${fs}px "Helvetica Neue"`; const all = lines.join(' '); const n = Math.round(all.length * clamp((t - t0) / 1.5));
  rect(30, y, W - 60, lines.length * lh + 46, '#FFE125'); let used = 0;
  lines.forEach((ln, i) => { const k = clamp(n - used, 0, ln.length); used += ln.length + 1; _txt(ln.slice(0, k), CX - tw(ln, font) / 2, y + 30 + fs * 0.85 + i * lh, font, '#111111', 'left'); });
}
/** a side countdown on her picture (DM-Mono-like digits, dark plate) */
function sideTimer(s, x, y) { const font = `500 ${54}px "Geist Mono"`; const w = tw(s, font, 2) + 40; rect(x - w, y - 62, w, 84, 'rgba(10,10,10,0.82)'); _txt(s, x - 20, y, font, '#FFFFFF', 'right', 'alphabetic', 2); }

function buildFilm() {
  addScene(0, 'pink', 'pre', (t) => { rect(0, 0, W, H, '#111'); }, { id: 'pre' });

  /* TH-A · over-the-shoulder specimen window (nagging, 188.9-192.8) */
  addScene(188.3, 'drawer', 'th-nag', (t) => {
    LOOK.A(); footage('f_raw_189_0');
    const x = 56, y = 120, w = 600, h = 620; const p = ez(t, 188.9, 0.45);
    withA(clamp(p * 2), () => withT(x, y + 30 * (1 - p), 1, 0, () => {
      specimen(0, 0, w, h, 'SPECIMEN 08 / 11', '', { draw: () => {
        // a generic app prompt that keeps asking
        rect(60, 100, w - 120, 300, A.paper); strokeR(60, 100, w - 120, 300, 'rgba(21,32,31,0.14)', 2);
        _txt('Turn on notifications?', w / 2, 180, F.body(38, 700), A.ink, 'center');
        rect(90, 250, (w - 200) / 2, 90, '#E9E5DA'); _txt('Not now', 90 + (w - 200) / 4, 307, F.body(34, 600), A.ink, 'center');
        rect(110 + (w - 200) / 2, 250, (w - 200) / 2, 90, A.ink); _txt('Yes', 110 + (w - 200) * 0.75, 307, F.body(34, 600), A.cream, 'center');
        loop(90 + (w - 200) / 4, 295, (w - 200) / 4 + 20, 60, ez(t, 191.2, 0.6), A.red, 6);
        pin(t, 189.2, w / 2, 112);
        _txt('Nagging', 40, 520, F.disp(84), A.ink, 'left');
        _txt('ASKS AGAIN AFTER YOU SAID NO', 40, 576, F.mono(22, 500), A.mid, 'left', 'alphabetic', 0.4);
      } });
    }));
    herCaption('Nagging is asking again and again and again', { box: true });
  }, { id: 'th-nag' });

  /* TH-B · half and half: her right, the B checkout left (sneak into basket, 98.3-102.5) */
  addScene(98.2, 'split', 'th-basket', (t) => {
    LOOK.B(); footage('f_raw_101_0', W / 2, 0, W / 2, H, 0.5, 0.5);
    rect(0, 0, W / 2, H, B.ink);
    _txt('B', 70, 128, F.disp(76), B.red, 'left'); _txt('THE VERSION THAT WINS', 140, 120, F.mono(28, 400), B.midD, 'left', 'alphabetic', 1.2);
    const cx = 70, cy = 220, cw = 820, rh = 130;
    rect(cx, cy, cw, 640, B.white); _txt('Checkout', cx + 40, cy + 90, F.disp(58), B.inkT, 'left');
    row(cx + 40, cy + 130, cw - 80, 'Running shoes', '€40.00', { h: rh, photo: 'px_shoe', size: 42 });
    row(cx + 40, cy + 290, cw - 80, 'Cleaning spray', '€5.00', { h: rh, col: B.red, size: 42, box: true });
    _txt('+', cx + 40 + rh / 2, cy + 290 + rh * 0.68, F.disp(60), B.red, 'center');
    loop(cx + cw / 2, cy + 290 + rh / 2, cw / 2 - 10, rh / 2 + 16, 1, B.red, 6);
    hline(cx + 40, cy + 470, cw - 80, 1, B.line, 2); _txt('Total', cx + 40, cy + 550, F.body(46, 700), B.inkT); _txt('€45.00', cx + cw - 40, cy + 550, F.mono(50, 700), B.red, 'right');
    herCaption('There is also a cleaning spray for five euro', { x: W * 0.75, size: 42, box: true });
  }, { id: 'th-basket' });

  /* TH-C · words behind her (matte): FAKE URGENCY set between her and the wall (230.0-232.0) */
  addScene(230.0, 'pink', 'th-urgency', (t) => {
    LOOK.C(); footage('f_raw_231_0');
    const fs = 230; const font = `900 ${fs}px Geist`; const p = ez(t, 230.02, 0.4);
    withA(p, () => { setFont(font, -fs * 0.04); ctx.fillStyle = Cz.pink; ctx.textAlign = 'center'; ctx.fillText('FAKE URGENCY', CX, 340 + 20 * (1 - p)); ctx.letterSpacing = '0px'; });
    cutout('f_raw_231_0', 'f_matte_231_0');
    herCaption('Fake urgency is a deadline that is not real.', { box: true });
  }, { id: 'th-urgency' });

  /* TH-D · receipt card top-left over her full frame + a side counter (the EU sweep, 315.1-323.8) */
  addScene(315.0, 'drawer', 'th-eu', (t) => {
    LOOK.C(); footage('f_raw_316_0');
    clipCard(t, 'ec-head', 46, 46, 900, { crop: [56, 320], at: 316.76, hlAt: [320.76, 318.94], hl: Cz.pink, pad: 18, credit: '#FFFFFF', creditSize: 26, creditText: 'European Commission · 30 Jan 2023' });
    const px = 1530, py = 300, pw = 330, ph = 360; rect(px, py, pw, ph, Cz.pink);
    const n1 = Math.round(399 * clamp((t - 318.6) / 0.8)), n2 = Math.round(148 * clamp((t - 320.5) / 0.6));
    _txt('SHOPS CHECKED', px + 30, py + 60, F.mono(26, 500), Cz.ink, 'left', 'alphabetic', 1); _txt(String(n1), px + 30, py + 160, F.disp(96), Cz.ink, 'left');
    _txt('WITH A TRICK', px + 30, py + 236, F.mono(26, 500), Cz.ink, 'left', 'alphabetic', 1); block(String(n2), px + 34, py + 330, F.disp(96), 1);
    herCaption('the European Commission checked 399 online stores', { box: true });
  }, { id: 'th-eu' });

  /* SH9 · "Fake countdown timers on shopping sites" (9:16): the same hook frame in each look, her in a 4:5 window. No timers in shorts (her rule). */
  const shWin = (img) => { rect(0, 0, W, H, '#0E0E0E'); footage(img, 0, 420, W, 1350, 0.5, 0.45); };
  // A: a cream specimen tag as the top title (Young Serif + mono), serif captions on black boxes (C4)
  addScene(229.30, 'black', 'sh-A', (t) => { LOOK.A(); shWin('f_raw_230_35');
    rect(0, 0, W, 420, A.teal); rect(60, 120, W - 120, 250, A.cream); strokeR(76, 136, W - 152, 218, 'rgba(21,32,31,0.22)', 2);
    _txt('SPECIMEN 10 / 11', 110, 196, F.mono(30, 500), A.mid, 'left', 'alphabetic', 0.6);
    _txt('Fake countdown timers', 110, 272, F.disp(62), A.ink, 'left'); _txt('on shopping sites', 110, 338, F.disp(62), A.ink, 'left'); pin(t, null, W - 130, 150);
    const capA = (s, y) => { const f = '400 58px "Young Serif"'; const w = tw(s, f); rect(CX - w / 2 - 20, y - 52, w + 40, 74, '#000'); _txt(s, CX, y, f, '#FFFFFF', 'center'); };
    capA('Fake urgency is a deadline', 1470); capA('that is not real.', 1550);
  }, { id: 'sh-A' });
  // B: the split as the title (A paper | B ink), one caption word on a red box (C2)
  addScene(229.45, 'split', 'sh-B', (t) => { LOOK.B(); shWin('f_raw_230_35');
    rect(0, 100, W / 2, 300, B.paper); rect(W / 2, 100, W / 2, 300, B.ink);
    _txt('A', 50, 190, F.disp(70), B.inkT); _txt('A real deal', 50, 300, F.body(52, 700), B.inkT); _txt('ends when it ends', 50, 360, F.body(40, 500), B.mid);
    _txt('B', W / 2 + 50, 190, F.disp(70), B.red); _txt('A fake timer', W / 2 + 50, 300, F.body(52, 700), B.paper); _txt('starts again', W / 2 + 50, 360, F.body(40, 500), B.midD);
    const f = '700 64px "Space Grotesk"'; const l1 = 'FAKE URGENCY IS A', w1 = tw(l1, f); ctx.lineJoin = 'round';
    const out = (s, x, y) => { setFont(f); ctx.lineWidth = 10; ctx.strokeStyle = '#000'; ctx.textAlign = 'left'; ctx.strokeText(s, x, y); ctx.fillStyle = '#fff'; ctx.fillText(s, x, y); };
    out(l1, CX - w1 / 2, 1470); const w2 = tw('DEADLINE', f); rect(CX - w2 / 2 - 14, 1500, w2 + 28, 78, B.red); _txt('DEADLINE', CX, 1562, f, '#FFFFFF', 'center');
  }, { id: 'sh-B' });
  // C: a pink box title in Geist 900 with one word blocked out; captions white heavy with the key word knocked out of an ink block
  addScene(229.60, 'pink', 'sh-C', (t) => { LOOK.C(); shWin('f_raw_230_35');
    rect(30, 110, W - 60, 230, Cz.pink); const tf = F.disp(66);
    _txt('Fake countdown', 70, 200, tf, Cz.ink, 'left'); block('timers', 70 + tw('Fake countdown ', tf), 200, tf, 1); _txt('on shopping sites', 70, 290, tf, Cz.ink, 'left');
    const f = '900 64px Geist'; const s1 = 'Fake urgency is a'; const w1 = tw(s1, f); ctx.lineJoin = 'round';
    setFont(f); ctx.lineWidth = 10; ctx.strokeStyle = '#000'; ctx.textAlign = 'center'; ctx.strokeText(s1, CX, 1470); ctx.fillStyle = '#fff'; ctx.fillText(s1, CX, 1470);
    const w2 = tw('deadline', f); rect(CX - w2 / 2 - 14, 1500, w2 + 28, 80, Cz.ink); _txt('deadline', CX, 1562, f, Cz.pink, 'center');
  }, { id: 'sh-C' });
  // C: the receipt under the title (the real Commission line)
  addScene(326.0, 'pink', 'sh-eu', (t) => { LOOK.C(); shWin('f_raw_327_0');
    rect(30, 110, W - 60, 230, Cz.pink); const tf = F.disp(66);
    _txt('Fake countdown', 70, 200, tf, Cz.ink, 'left'); block('timers', 70 + tw('Fake countdown ', tf), 200, tf, 1); _txt('on shopping sites', 70, 290, tf, Cz.ink, 'left');
    clipCard(t, 'ec-42', 40, 370, W - 80, { crop: [6, 44], cropX: [30, 528], hlAt: 326.1, hl: Cz.pink, pad: 16, credit: '#FFFFFF', creditSize: 26, creditText: 'European Commission · 30 Jan 2023' });
    const f = '900 64px Geist'; ctx.lineJoin = 'round'; setFont(f); ctx.lineWidth = 10; ctx.strokeStyle = '#000'; ctx.textAlign = 'center'; ctx.strokeText('had fake countdown timers', CX, 1562); ctx.fillStyle = '#fff'; ctx.fillText('had fake countdown timers', CX, 1562);
    const w2 = tw('42 websites', f); rect(CX - w2 / 2 - 14, 1418, w2 + 28, 80, Cz.ink); _txt('42 websites', CX, 1480, f, Cz.pink, 'center');
  }, { id: 'sh-eu' });

  /* CORRECTION (her new rule): she says "Amazon actually did pay 2.5 billion dollars" (410.5-413.6). In the edit we pause her and
   * cut to a plain screen where the correction types on, then back to her. C's look. Facts: FTC, 25 Sept 2025. */
  addScene(413.70, 'pink2', 'fix-amazon', (t) => { LOOK.C(); rect(0, 0, W, H, Cz.pink);
    const t0 = 413.75; withA(ez(t, t0, 0.3), () => block('CORRECTION', V(110, 80), V(290, 520), F.mono(V(40, 40), 500), 1));
    const lines = V(['Amazon agreed to a $2.5 billion settlement:', 'a $1 billion penalty and up to', '$1.5 billion in refunds.', 'It did not admit wrongdoing.'],
      ['Amazon agreed to a', '$2.5 billion settlement:', 'a $1 billion penalty', 'and up to $1.5 billion', 'in refunds. It did not', 'admit wrongdoing.']);
    const all = lines.join('\n'); const n = Math.floor(clamp((t - t0 - 0.3) / 3.2) * all.length); let used = 0; const fs = V(78, 66), lh = fs * 1.22;
    lines.forEach((ln, i) => { const k = clamp(n - used, 0, ln.length); used += ln.length + 1; _txt(ln.slice(0, k), V(110, 80), V(430, 660) + i * lh, F.disp(fs, 800), Cz.ink, 'left'); });
    withA(ez(t, t0 + 3.6, 0.4), () => _txt('SOURCE: FTC PRESS RELEASE, 25 SEPTEMBER 2025', V(110, 80), V(430, 660) + lines.length * lh + 40, F.mono(V(28, 28), 500), Cz.ink, 'left', 'alphabetic', 2));
  }, { id: 'fix-amazon' });
  SCENES.sort((a, b) => a.start - b.start);
}

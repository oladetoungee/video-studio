/* C · BLOWN UP: scenes on her real lines (raw seconds). Motion test: 0.1-9.9 (the opening). */
'use strict';
function openPopup(t) {
  const w = V(760, 760), x = V(150, 160), y = V(200, 400);
  return bigPopup(t, x, y, w, { offAt: 0.12, btnAt: 3.36, linkAt: 4.70 });
}
function buildFilm() {
  /* the opening: a pop-up at poster scale, the lens finds the guilt-trip link, then zooms through it */
  addScene(0, 'pink', 'open', (t) => {
    rect(0, 0, W, H, Cz.pink);
    const pin = ez(t, 0.1, 0.45); ctx.save(); ctx.translate(0, 60 * (1 - pin)); ctx.globalAlpha = clamp(pin * 2);
    const Lk = openPopup(t); ctx.restore();
    const part = 'I hate saving money'; const off = tw('No thanks, ', F.body(Lk.fs, 500)); const pw = tw(part, F.body(Lk.fs, 500));
    const fx = Lk.lx, fy = Lk.ly;
    const r0 = ez(t, 5.45, 0.55, 'outBack') * V(380, 250); const rThrough = io(t, 8.05, 0.42) * 1500;
    const cx = lerp(V(1360, CX), fx, io(t, 8.0, 0.3)), cy = lerp(V(560, 1230), fy, io(t, 8.0, 0.3));
    if (r0 > 4 && rThrough < 1) { ctx.save(); ctx.strokeStyle = Cz.ink; ctx.lineWidth = 4; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(Lk.x0 + off + pw + 16, fy); ctx.lineTo(cx - r0 * 0.98, cy); ctx.stroke(); ctx.restore(); }
    magnifier(cx, cy, r0 + rThrough, V(1.75, 1.15) + rThrough / 300, fx, fy, () => {
      const ln = 'No thanks, '; _txt(ln, Lk.x0, Lk.y0, F.body(Lk.fs, 500), Cz.grey, 'left'); rect(Lk.x0, Lk.y0 + 4, Lk.lw, 1.5, Cz.grey);
      block(part, Lk.x0 + off, Lk.y0, F.body(Lk.fs, 500), ez(t, 6.0, 0.5));
    });
    withA(ez(t, 0.6, 0.4) * (1 - ez(t, 8.0, 0.2)), () => counter(1));
  }, { id: 'open' });
  cue('pop', 0.15, -5); cue('pop2', 3.36, -6); cue('type', 4.70, -8); cue('focus', 5.45, -4); cue('marker', 6.0, -5); cue('swipe', 8.15, -8);

  addScene(8.47, 'pink2', 'name', (t) => {
    rect(0, 0, W, H, Cz.pink);
    KT(t, { lines: ['It’s called a'], x: V(CX, CX), y: V(400, 760), size: V(70, 64), font: 'body', weight: 300, upper: false, align: 'center', col: Cz.ink, times: [8.47, 8.52, 8.68], blur: 4 });
    KT(t, { lines: V(['dark pattern.'], ['dark', 'pattern.']), x: CX, y: V(640, 1000), size: V(260, 250), font: 'disp', upper: false, align: 'center', col: Cz.ink, times: [8.86, 9.26], blur: 10 });
    withA(ez(t, 9.4, 0.4), () => { _txt(V('a design that tricks you into doing something you didn’t mean to do', 'a design that tricks you'), CX, V(790, 1340), F.body(V(46, 46), 500), Cz.ink, 'center'); if (PORTRAIT) _txt('into doing something you didn’t mean to do', CX, 1400, F.body(46, 500), Cz.ink, 'center'); });
  }, { id: 'name' });
  cue('hit', 8.86, -4);

  /* hidden costs: €40 on the product page, €52 at checkout (115.7-122.5) */
  addScene(115.6, 'pink', 'costs', (t) => {
    rect(0, 0, W, H, Cz.pink);
    const pw = V(640, W - 160), ph = V(820, 560), px = V(110, 80), py = V(130, 380);
    cover('px_shoe', px, py, pw, ph, 0.5, 0.7); rect(px, py + ph - 70, tw('PRODUCT PAGE', F.mono(30, 500), 2) + 48, 70, Cz.ink); _txt('PRODUCT PAGE', px + 24, py + ph - 24, F.mono(30, 500), Cz.white, 'left', 'alphabetic', 2);
    const x = V(860, 80), y = V(440, 1180);
    const strike = ez(t, 120.42, 0.4, 'outExpo');
    KT(t, { lines: ['€40'], x, y, size: V(220, 200), font: 'disp', upper: false, col: Cz.ink, times: [116.54], blur: 8 });
    rect(x - 10, y - V(80, 74), (tw('€40', F.disp(V(220, 200))) + 20) * strike, V(22, 20), Cz.ink);
    withA(ez(t, 120.42, 0.4), () => { const fs = V(56, 46); _txt('+', x, y + V(110, 90), F.body(fs, 600), Cz.ink); block('service fee', x + fs * 0.8, y + V(110, 90), F.body(fs, 600), ez(t, 120.6, 0.5)); });
    KT(t, { lines: ['€52'], x: V(x + 500, x + 470), y, size: V(220, 200), font: 'disp', upper: false, col: Cz.ink, times: [122.12], blur: 8 });
    withA(ez(t, 122.2, 0.4), () => _txt('AT CHECKOUT', V(x + 506, x + 476), y + V(110, 90), F.mono(30, 500), Cz.ink, 'left', 'alphabetic', 2));
    counter(4);
  }, { id: 'costs' });
  cue('cash', 116.54, -6); cue('marker', 120.42, -5); cue('hit', 122.12, -5);

  /* trick wording: three negatives in one checkbox (163.96-168) */
  addScene(163.8, 'pink', 'wording', (t) => {
    rect(0, 0, W, H, Cz.pink);
    const x = V(110, 80), bs = V(150, 130), y0 = V(300, 560); rect(x, y0, bs, bs, Cz.white); strokeR(x, y0, bs, bs, Cz.ink, 10);
    const fs = V(96, 84); const font = F.disp(fs, 800); const lx = V(x + bs + 50, x); let ly = V(y0 + fs * 0.9, y0 + bs + 120);
    const lines = V([['Untick', ' this box if you'], ['don’t', ' want to'], ['stop', ' receiving emails.']], [['Untick', ' this box'], ['if you ', 'don’t'], ['want to ', 'stop'], ['receiving emails.']]);
    const hits = { 'Untick': 164.84, 'don’t': 166.10, 'stop': 166.76 };
    const shown = (s) => (s.trim() === 'Untick' ? 164.6 : s.includes('box') ? 165.24 : s.includes('don') || s.includes('if you') ? 165.86 : s.includes('want') ? 166.38 : 166.76);
    lines.forEach((ln) => { let xx = lx; ln.forEach((seg) => { const a = ez(t, shown(seg), 0.3); withA(a, () => { xx += hits[seg.trim()] ? block(seg.trim(), xx, ly, font, ez(t, hits[seg.trim()], 0.4)) : (_txt(seg, xx, ly, font, Cz.ink), tw(seg, font)); }); if (a <= 0) xx += tw(seg, font); }); ly += fs * 1.12; });
    withA(ez(t, 168.2, 0.4), () => _txt('YOU HAVE TO READ IT TWO OR THREE TIMES', lx, ly + V(40, 50), F.mono(V(30, 30), 500), Cz.ink, 'left', 'alphabetic', 2));
    counter(6);
  }, { id: 'wording' });
  cue('tick', 164.84, -5); cue('tick2', 166.10, -5); cue('tick3', 166.76, -5);

  /* fake urgency: the timer that starts again (232.7-242) */
  addScene(232.6, 'pink', 'timer', (t) => {
    rect(0, 0, W, H, Cz.pink);
    const rs = t >= 238.3 && t < 238.55; const left = t < 234.2 ? 600 : t < 238.3 ? 600 - Math.floor(t - 234.2) : 600 - Math.max(0, Math.floor(t - 238.55));
    const s = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
    withA(ez(t, 234.9, 0.3), () => _txt('THIS DEAL ENDS IN', CX, V(250, 620), F.mono(V(36, 34), 500), Cz.ink, 'center', 'alphabetic', 3));
    if (!rs) _txt(s, CX, V(640, 940), F.disp(V(380, 300)), Cz.ink, 'center');
    // the refresh button she presses
    const bw = V(380, 420), bx = CX - bw / 2, by = V(760, 1080); const press = t >= 237.62 && t < 237.8 ? 0.94 : 1;
    withA(ez(t, 237.3, 0.3), () => withT(CX, by + 50, press, 0, () => { rect(-bw / 2, -50, bw, 100, Cz.white); strokeR(-bw / 2, -50, bw, 100, Cz.ink, 6);
      ctx.save(); ctx.strokeStyle = Cz.ink; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(-bw / 2 + 64, 0, 22, 0.3, Math.PI * 1.75); ctx.stroke(); ctx.restore();
      _txt('Refresh', 30, 16, F.body(46, 700), Cz.ink, 'center'); }));
    withA(ez(t, 239.84, 0.4), () => block('again from 10 minutes', CX - tw('again from 10 minutes', F.body(V(56, 48), 600)) / 2, V(980, 1330), F.body(V(56, 48), 600), ez(t, 240.0, 0.5)));
    counter(10);
  }, { id: 'timer' });
  cue('clock', 234.9, -6); cue('click', 237.62, -3); cue('tape', 238.3, -6);

  /* how common: the FTC release, and the lens reads "Nearly 76%" (a 4x capture of the same page, so it stays sharp) (341-351.6) */
  addScene(341.0, 'pink', 'ftc', (t) => {
    rect(0, 0, W, H, Cz.pink);
    const cw = V(1120, W - 160), cx = V(110, 80), cy = V(520, 640);
    clipCard(t, 'ftc-76', cx, cy, cw, { at: 341.1, hlAt: [342.02, 345.24, 349.22], hl: '#FFC2DA', pad: 22, credit: Cz.ink, creditSize: 28, creditText: 'FTC press release · 10 July 2024' });
    const c = CLIPS['ftc-76']; const sc = (cw - 44) / c.w; const r76 = c.hl[1];
    const fx = cx + 22 + (r76[0] + r76[2] / 2) * sc, fy = cy + 22 + (r76[1] + r76[3] / 2) * sc;
    const r = ez(t, 345.0, 0.55, 'outBack') * V(280, 250); const lx = V(1590, CX), ly = V(660, 1180);
    if (r > 4) { ctx.save(); ctx.strokeStyle = Cz.ink; ctx.lineWidth = 4; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(V(cx + cw + 8, fx), V(fy, fy + 14)); ctx.lineTo(V(lx - r, lx), V(ly, ly - r)); ctx.stroke(); ctx.restore(); }
    magnifier(lx, ly, r, 1, lx, ly, () => { const im = IMG.lens_ftc76; const w = V(500, 420), h = w * im.height / im.width;
      themeFixed(() => ctx.drawImage(im, lx - w / 2, ly - h / 2, w, h)); block('', 0, 0, F.body(10), 0);
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#FFC2DA'; ctx.fillRect(lx - w / 2, ly - h / 2 + h * 0.12, w * ez(t, 345.3, 0.4, 'outExpo'), h * 0.76); ctx.restore(); });
    KT(t, { lines: V(['76% used at least one', 'possible dark pattern'], ['76% used at', 'least one possible', 'dark pattern']), x: cx, y: V(330, 380), size: V(96, 70), font: 'disp', upper: false, col: Cz.ink, times: [345.24, 346.16, 346.28, 346.6, 346.92, 347.3, 347.44, 347.8], blur: 6 });
    counter(11);
  }, { id: 'ftc' });
  cue('shutter', 341.1, -5); cue('focus', 345.0, -4);
}

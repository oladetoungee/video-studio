/* B · VERSION A / VERSION B: scenes on her real lines (raw seconds). Motion test: 94.6-103.0 (sneak into basket). */
'use strict';
/** card geometry inside a half */
function cardBox(hb) {
  if (!PORTRAIT) return { x: hb.x + 70, y: 300, w: Math.min(820, hb.w - 140) };
  return { x: 80, y: (hb.side === 'A' ? 500 : 1040), w: W - 160 };
}
/** the checkout card: T = {shoe, head, spray, total, loop} times (null = shown) */
function cart(t, hb, T, o = {}) {
  const s = hb.side; const c = cardBox(hb); if (c.w < 200) return;
  const rh = V(140, 84), gap = V(26, 16);
  const grow = s === 'B' && o.extra === 'spray' ? (T.spray == null ? 1 : ez(t, T.spray - 0.3, 0.35)) : 1;
  const nRows = (s === 'B' && o.extra) || o.extra === 'gift' ? 1 + grow : 1; const h = V(170, 120) + nRows * (rh + gap) + V(150, 96);
  const pa = T.shoe == null || s === 'A' ? 1 : ez(t, T.shoe, 0.45); if (pa <= 0) return;
  withA(clamp(pa * 2), () => { ctx.save(); ctx.translate(0, 30 * (1 - pa));
    rect(c.x, c.y, c.w, h, B.white);
    const ph = T.head == null || s === 'A' ? 1 : ez(t, T.head, 0.35);
    withA(ph, () => _txt('Checkout', c.x + 40, c.y + V(92, 66), F.disp(V(60, 46)), B.inkT, 'left'));
    let y = c.y + V(130, 96);
    row(c.x + 40, y, c.w - 80, 'Running shoes', '€40.00', { h: rh, photo: 'px_shoe', size: V(44, 36) }); y += rh + gap;
    if (s === 'B' && o.extra) { const pe = T.spray == null ? 1 : ez(t, T.spray, 0.4, 'outBack');
      if (pe > 0) withA(clamp(pe * 2), () => { ctx.save(); ctx.translate(40 * (1 - clamp(pe)), 0);
        if (o.extra === 'spray') { rect(c.x + 40, y, rh, rh, '#F3E9E8'); _txt('+', c.x + 40 + rh / 2, y + rh * 0.68, F.disp(V(60, 50)), B.red, 'center'); row(c.x + 40, y, c.w - 80, 'Cleaning spray', '€5.00', { h: rh, col: B.red, size: V(44, 36) }); }
        else { checkbox(c.x + 40 + rh * 0.2, y + rh * 0.2, rh * 0.6, T.tick == null ? 1 : ez(t, T.tick, 0.3), B.red, B.red); row(c.x + 40, y, c.w - 80, 'Gift wrapping', '€2.99', { h: rh, col: B.red, size: V(44, 36) }); }
        ctx.restore();
        const pl = T.loop == null ? 1 : ez(t, T.loop, 0.6); loop(c.x + c.w / 2, y + rh / 2, c.w / 2 - 34, rh / 2 + 12, pl, B.red, 6);
      }); y += (rh + gap) * grow; }
    else if (o.extra === 'gift') { checkbox(c.x + 40 + rh * 0.2, y + rh * 0.2, rh * 0.6, 0, B.inkT); row(c.x + 40, y, c.w - 80, 'Gift wrapping', '€2.99', { h: rh, col: B.mid, size: V(44, 36) }); y += rh + gap; }
    hline(c.x + 40, y + 6, c.w - 80, 1, B.line, 2);
    const flip = s === 'B' && o.extra && (T.total == null || t >= T.total);
    const tot = flip ? (o.extra === 'spray' ? '€45.00' : '€42.99') : '€40.00';
    _txt('Total', c.x + 40, y + V(80, 60), F.body(V(42, 38), 700), B.inkT, 'left');
    _txt(tot, c.x + c.w - 40, y + V(80, 60), F.mono(V(46, 40), 700), flip ? B.red : B.inkT, 'right');
    if (s === 'B' && o.note) withA(T.loop == null ? 1 : ez(t, T.loop, 0.4), () => _txt(o.note, c.x, c.y + h + V(60, 50), F.mono(V(32, 32), 400), B.red, 'left', 'alphabetic', 1));
    ctx.restore(); });
}

function buildFilm() {
  addScene(0, 'split', 'pre', (t) => { split(1); }, { id: 'pre' });

  /* p1: the opening pop-up, A says "No thanks", B says "No thanks, I hate saving money" (0.2-9.9) */
  addScene(0.1, 'split', 'open', (t) => {
    const hs = split(PORTRAIT ? ez(t, 0.4, 0.6) : 1);
    hs.forEach(hb => { if (hb.w < 100 || hb.h < 100) return; const s = hb.side; sideLabel(t, 0.5, hb, s);
      const w = PORTRAIT ? 560 : 640, x = hb.x + (hb.w - w) / 2, y = PORTRAIT ? (s === 'A' ? 500 : 1040) : 300, h = PORTRAIT ? 360 : 520;
      rect(x, y, w, h, B.white);
      _txt('10% OFF', x + w / 2, y + h * 0.3, F.disp(PORTRAIT ? 92 : 110), B.inkT, 'center');
      rect(x + w * 0.12, y + h * 0.42, w * 0.76, h * 0.2, B.inkT); _txt('Yes please', x + w / 2, y + h * 0.555, F.body(PORTRAIT ? 38 : 42, 700), B.paper, 'center');
      const no = s === 'A' ? 'No thanks' : 'No thanks, I hate saving money'; const fs = PORTRAIT ? 32 : 34;
      withA(ez(t, s === 'A' ? 4.7 : 5.1, 0.4), () => { _txt(no, x + w / 2, y + h * 0.82, F.body(fs, 500), s === 'A' ? B.inkT : '#77746E', 'center'); rect(x + w / 2 - tw(no, F.body(fs, 500)) / 2, y + h * 0.82 + 6, tw(no, F.body(fs, 500)), 2, '#8C8A84'); });
      if (s === 'B') loop(x + w / 2, y + h * 0.8, tw(no, F.body(fs, 500)) / 2 + 30, 34, ez(t, 5.6, 0.6), B.red, 6);
    });
  }, { id: 'open' });

  /* motion test: sneak into basket (94.86-102.52) */
  const SB = { split: 94.95, shoe: 96.2, head: 97.9, spray: 100.36, total: 101.24, loop: 102.24 };
  addScene(94.6, 'split2', 'basket', (t) => {
    const hs = split(io(t, SB.split, 0.65));
    hs.forEach(hb => { if (hb.w < 200 || hb.h < 200) return; sideLabel(t, hb.side === 'A' ? 94.65 : SB.split + 0.3, hb, hb.side); cart(t, hb, SB, { extra: 'spray', note: 'you never picked this' }); });
  }, { id: 'basket' });
  cue('swipe', SB.split + 0.2, -8); cue('pop', SB.shoe, -5); cue('tick', SB.head, -6); cue('pop2', SB.spray, -4); cue('cash', SB.total, -5); cue('marker', SB.loop, -6);

  /* pre-selection: gift wrapping already ticked (218.5-227) */
  addScene(218.4, 'split', 'gift', (t) => {
    const hs = split(1); hs.forEach(hb => { sideLabel(t, null, hb, hb.side); cart(t, hb, { tick: 223.2, loop: 223.42, total: 223.42 }, { extra: 'gift' }); });
  }, { id: 'gift' });
  cue('tick', 223.2, -4);

  /* why: an A/B test only measures the number you pick (284.5-289.7) */
  addScene(284.4, 'split', 'abtest', (t) => {
    const hs = split(1);
    hs.forEach(hb => { const s = hb.side; sideLabel(t, null, hb, s); const fg = fgOf(s), md = midOf(s);
      const x = hb.x + 80, w = hb.w - 160; let y = PORTRAIT ? (s === 'A' ? 560 : 1100) : 330;
      // her sentence, split across the divider: A carries the first half, B the second
      const words = s === 'A' ? ['An A/B test', 'only measures'] : ['the number', 'you pick.'];
      const times = s === 'A' ? [284.70, 284.90, 285.52, 285.80, 286.06] : [286.32, 286.56, 286.82, 287.10];
      KT(t, { lines: words, x, y: y + V(60, 40), size: V(96, 80), font: 'disp', upper: false, col: fg, times, blur: 6 });
      y += V(250, 190);
      // the metric both versions are judged on
      withA(ez(t, 286.56, 0.4), () => _txt('SIGN-UPS', x, y, F.mono(V(30, 30), 400), md, 'left', 'alphabetic', 1));
      const bw = (s === 'A' ? 0.52 : 0.86) * w * ez(t, 286.7, 0.8, 'outExpo'); rect(x, y + 24, bw, V(48, 40), s === 'A' ? B.inkT : B.red);
      withA(ez(t, 287.68, 0.4), () => _txt('TRICKED?', x, y + V(150, 120), F.mono(V(30, 30), 400), md, 'left', 'alphabetic', 1));
      withA(ez(t, 288.64, 0.4), () => { ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = md; ctx.lineWidth = 3; ctx.strokeRect(x, y + V(174, 140), w, V(48, 40)); ctx.restore();
        _txt('not measured', x + 20, y + V(208, 170), F.mono(V(28, 28), 400), md, 'left'); });
    });
  }, { id: 'abtest' });
  cue('type', 284.9, -8); cue('rise', 286.7, -8); cue('error', 288.64, -9);

  /* the law: a pre-ticked box is not consent (GDPR Recital 32, 381.3-388) */
  addScene(381.2, 'split', 'law', (t) => {
    const hs = split(1);
    hs.forEach(hb => { const s = hb.side; sideLabel(t, null, hb, s); const fg = fgOf(s);
      const x = hb.x + 80; const y = PORTRAIT ? (s === 'A' ? 600 : 1150) : 320; const bs = V(110, 90);
      checkbox(x, y - bs * 0.8, bs, s === 'B' ? 1 : 0, fg, s === 'B' ? B.red : fg, 6);
      KT(t, { lines: s === 'A' ? ['You tick it.'] : ['Ticked for you.'], x: x + bs + 40, y: y, size: V(76, 64), font: 'disp', upper: false, col: fg, times: s === 'A' ? [383.0, 383.3, 383.6] : [384.64, 385.02, 385.44], blur: 6 });
      if (s === 'B') withA(ez(t, 385.9, 0.4), () => _txt('not consent', x + bs + 40, y + V(70, 60), F.mono(V(34, 32), 700), B.red, 'left', 'alphabetic', 1));
    });
    const cw = V(1640, W - 160); clipCard(t, 'gdpr-32', V(CX - cw / 2, 80), V(620, 1330), cw, { at: 382.84, hlAt: 384.64, hl: '#FFD9D6', pad: 22, credit: V(B.midD, B.midD), creditSize: V(26, 28), creditText: 'GDPR Recital 32 · gdpr-info.eu' });
  }, { id: 'law' });
  cue('shutter', 382.84, -5); cue('tick', 384.64, -4); cue('marker', 384.8, -6);

  /* how common (FTC, 10 July 2024): 642 sites, nearly 76 %, nearly 67 % (340.3-351.6) */
  addScene(340.2, 'split', 'ftc', (t) => {
    const hs = split(1);
    hs.forEach(hb => { const s = hb.side; const fg = fgOf(s); const x = hb.x + 80; const y = PORTRAIT ? (s === 'A' ? 440 : 1080) : 300;
      if (s === 'A') { KT(t, { lines: ['642'], x, y: y + V(120, 110), size: V(200, 170), font: 'disp', upper: false, col: fg, times: [342.02], blur: 8 });
        withA(ez(t, 342.62, 0.4), () => { _txt('subscription websites', x, y + V(200, 180), F.body(V(44, 42), 500), fg); _txt('and apps checked', x, y + V(256, 232), F.body(V(44, 42), 500), fg); }); }
      else { KT(t, { lines: ['76%'], x, y: y + V(120, 110), size: V(200, 170), font: 'disp', upper: false, col: B.red, times: [345.24], blur: 8 });
        withA(ez(t, 346.3, 0.4), () => { _txt('used at least one', x, y + V(200, 180), F.body(V(44, 42), 500), fg); _txt('possible dark pattern', x, y + V(256, 232), F.body(V(44, 42), 500), fg); }); }
    });
    const cw = V(1500, W - 160); clipCard(t, 'ftc-76', V(CX - cw / 2, 80), V(680, 760), cw, { at: 341.0, hlAt: [342.02, 345.24, 349.22], hl: '#FFD9D6', pad: 22, credit: B.midD, creditSize: V(26, 28), creditText: 'FTC press release · 10 July 2024' });
  }, { id: 'ftc' });
  cue('shutter', 341.0, -5); cue('marker', 345.24, -6);

  /* the ending: A takes the whole frame (446-460) */
  addScene(449.9, 'split', 'honest', (t) => {
    const hs = split(1 - io(t, 450.2, 0.8));
    hs.forEach(hb => { if (hb.w < 300 || hb.h < 300) return; });
    KT(t, { lines: V(['Build the', 'honest version.'], ['Build the', 'honest', 'version.']), x: L, y: V(470, 760), size: V(150, 150), font: 'disp', upper: false, col: B.inkT, times: [450.2, 450.4, 450.6, 450.8], blur: 8 });
  }, { id: 'honest' });
  cue('swipe', 450.3, -8);
  SCENES.sort((a, b) => a.start - b.start);
}

/* phone-distraction · Receipt · part 1 (0:00-3:36): the hook, the plan, the attention economy, persuasive technology.
 * Layout zones: 16:9 text top-left (x 110, w <= 900), the main print on the right (x >= 1000), receipts hang from the top edge or a
 * slot; 9:16 text 380-720, the print 740-1180, receipt 1180-1440. Credits: prt(..., {cr}) places them clear of the print. */
'use strict';
/** a clock on a phone screen that rolls from one time to another at `at` (0.48 s, outExpo, the changed digits only) */
function uiClockRoll(t, sx, sy, sw, sh, from, to, at, o = {}) {
  const size = sw * (o.k || 0.3), font = FT(300, size), y = sy + sh * (o.y || 0.3); const p = at == null ? 1 : MOTION.ease(t, at, 0.48, 'outExpo');
  const w = tw(to, font, -size * 0.03); let x = o.left ? sx : sx + sw / 2 - w / 2;
  ctx.save(); ctx.beginPath(); ctx.rect(sx, y - size * 0.95, sw, size * 1.12); ctx.clip();
  for (let i = 0; i < to.length; i++) { const a_ = from[i] || '', b_ = to[i]; const cw = tw(b_, font, -size * 0.03);
    const cc = o.col || RC.ink;
    if (a_ !== b_ && p < 1 && at != null && t >= at) { _txt(a_, x, y - p * size, font, cc, 'left', 'alphabetic', -size * 0.03); _txt(b_, x, y + (1 - p) * size, font, cc, 'left', 'alphabetic', -size * 0.03); }
    else _txt(at != null && t < at ? (a_ || b_) : b_, x, y, font, cc, 'left', 'alphabetic', -size * 0.03);
    x += cw; }
  ctx.restore();
  if (o.sub) _txt(o.sub, sx + sw / 2, y + size * 0.36, MONO(sw * 0.055), RC.inkMid, 'center');
}
/** a notification card on a phone screen at y (fraction of sh): app name, a line, optional hidden preview */
function uiNotif(t, sx, sy, sw, sh, yf, head, line, at, o = {}) {
  at = onCut(at); if (t < at) return; const q = MOTION.ease(t, at, 0.4, 'outQuint'); const y = sy + sh * yf - (1 - q) * sh * 0.06;
  withA(clamp((t - at) / 0.15), () => {
    const h = sw * (o.hidden ? 0.36 : 0.3); fillRR(sx + sw * 0.05, y, sw * 0.9, h, sw * 0.05, '#E9E6DD');
    _txt(head, sx + sw * 0.1, y + sw * 0.09, MONO(sw * 0.05), RC.inkMid); _txt('now', sx + sw * 0.9, y + sw * 0.09, MONO(sw * 0.05), RC.inkMid, 'right');
    if (o.hidden) { fillRR(sx + sw * 0.1, y + sw * 0.15, sw * 0.6, sw * 0.05, sw * 0.025, '#BDB8AA'); fillRR(sx + sw * 0.1, y + sw * 0.23, sw * 0.4, sw * 0.05, sw * 0.025, '#BDB8AA'); circle(sx + sw * 0.8, y + sw * 0.2, sw * 0.04, RC.red); }
    else _txt(line, sx + sw * 0.1, y + sw * 0.2, FT(700, sw * 0.068), RC.ink);
  });
}
/** a playing card that lies face down from `down`, then turns face up on `up` (a 0.3 s flip around its vertical axis) */
function card2(t, key, x, y, w, h, down, up, face, o = {}) {
  slip(t, key, x, y, w, h, down, (yy) => {
    const f = MOTION.ease(t, up, 0.3, 'inOutQuart'); const sx = Math.abs(Math.cos(Math.PI * f));
    ctx.save(); ctx.translate(x + w / 2, 0); ctx.scale(Math.max(0.02, sx), 1); ctx.translate(-x - w / 2, 0);
    if (f < 0.5) { fillRR(x + 14, yy + 14, w - 28, h - 28, 6, RC.ink); for (let i = 0; i < 6; i++) rect(x + 30, yy + 40 + i * (h - 80) / 6, w - 60, 4, RC.blue); }
    else face(yy);
    ctx.restore();
  }, o);
}
function buildS1() {
  /* ---- 01 hook: her thesis, and the phone in a hand (lock screen at 1:20) ---- */
  {
    const a = PH('your phone was intentionally and strategically designed to distract you');
    addR(0, (t) => {
      stack(t, 'Your phone was _intentionally_ and _strategically_', 'designed to *distract* you.', { t1: TW(a, 'Your phone was intentionally and strategically'), t2: TW(a, 'designed to distract you.'), ev: [a.at('distract')], maxW: V(980, 940), size: V(140, 118), y: V(150, SAFE.contentTop + 10) });
      prt(t, 'hand', 'ht_hand', V(1240, 300), V(70, 740), V(800, 660), { at: -1, cr: 'Hand: NeONBRAND, CC0', screen: (sx, sy, sw, sh) => { uiClockRoll(t, sx, sy, sw, sh, '1:20', '1:20', null, { sub: 'Tuesday' }); badge(sx + sw * 0.5, sy + sh * 0.62, '1', sw / 240, MOTION.spring(t - a.at('distract'), 0.45, 2.6)); } });
    }, { id: 'hook', push: 0.03 });
    sPaper(0.1, -4); sMark(a.at('distract')); sPop(a.at('distract'), -6);
  }
  /* ---- 02 twenty minutes later: the clock rolls 1:20 -> 1:40 while the receipt fills with everything else ---- */
  {
    const a = PH('the reason why you pick it up to do one thing');
    const b = PH('and 20 minutes later'); const c = PH("you're doing a million and one other thing");
    const d = PH("and you're forgetting the one thing that you wanted to do");
    addR(a.t - 0.2, (t) => {
      stack(t, 'You pick it up to do', 'one thing.', { t1: TW(a, 'you pick it up to do'), t2: TW(a, 'one thing.'), size: V(132, 112) });
      // the clock, huge on the blue (no phone): 1:20 rolls to 1:40 on "20 minutes later"
      withA(clamp((t - a.at('one')) / 0.3), () => uiClockRoll(t, V(100, 60), V(0, 0), V(980, 960), V(1080, 1920), '1:20', '1:40', b.at('20') + 0.1, { y: V(0.84, 0.5), k: V(0.5, 0.46), left: true, col: RC.white }));
      if (t > b.at('20') + 0.1) withA(clamp((t - b.at('20') - 0.3) / 0.25), () => lab('+20 minutes', V(116, 70), V(1010, 1030), { col: RC.mark }));
      receipt(t, 'later receipt', V(1060, 70), V(0, 1090), V(760, 940), [
        { l: 'the thing you wanted', r: '1', at: a.at('one') + 0.3 }, { l: '20 minutes later', r: '1:40', at: b.at('later') }, { rule: true, at: b.at('later') },
        { l: '+ 1,000,001 other things', at: c.at('million') }, { l: 'the one thing', r: 'forgotten', at: d.at('forgetting'), strike: d.at('thing') + 0.1, hl: d.at('forgetting') + 0.2 }], { fs: V(40, 32), at: a.t - 0.1 });
    }, { id: 'later', push: 0.02 });
    sClock(b.at('20') + 0.1); sPrint(a.at('one') + 0.3); sPrint(b.at('later'), -4); sPrint(c.at('million'), -2); sPrint(d.at('forgetting'), -2); sMark(d.at('forgetting') + 0.2, -4);
  }
  /* ---- 03 her name: removed with her intro (her note 2026-10-18: "cut 'Hello my name is Gbemisola'"; the voice is cut in tools/edit_voice.py) ---- */
  /* ---- 04 the plan, printed as an order: each line lights up with its own picture and a big line ---- */
  {
    const a = PH("in this video i'm going to show you"); const r1 = PH('why your attention is worth so much money');
    const r1b = PH('because people and corporations make a lot of money just from you scrolling'); const r2 = PH('where the design ideas'); const r3 = PH('the actual features'); const r4 = PH('the people who built them'); const r5 = PH('what you can actually do about it');
    const R = [[r1.t, 'Why your attention is worth so much money'], [r2.t, 'Where the design ideas come from'], [r3.t, 'The features that keep you stuck'], [r4.t, 'The people who built them'], [r5.t, 'What you can actually do about it']];
    addR(a.t - 0.12, (t) => {
      stack(t, null, 'In this video', { t2: TW(a, 'In this video'), size: V(110, 100) });
      const cur = R.reduce((k, r, i) => (t >= r[0] - 0.1 ? i : k), -1);
      receipt(t, 'plan', V(1060, 70), V(0, 520), V(760, 940), [
        { l: 'in this video', center: true, big: true, at: a.at('video') }, { rule: true, at: a.at('video') },
        { l: '01 your attention', r: cur === 0 ? '◀' : '', at: r1.t }, { l: '02 the design ideas', r: cur === 1 ? '◀' : '', at: r2.t }, { l: '03 the features', r: cur === 2 ? '◀' : '', at: r3.t },
        { l: '04 the people', r: cur === 3 ? '◀' : '', at: r4.t }, { l: '05 what you can do', r: cur === 4 ? '◀' : '', at: r5.t }], { fs: V(32, 26) });
      // the current line, big, under the receipt (16:9) and its picture on the left (one at a time)
      if (cur >= 0 && !PORTRAIT) { const [at, s] = R[cur]; const nx = R[cur + 1] ? R[cur + 1][0] : 1e9; withA(clamp((t - at) / 0.2) * (1 - clamp((t - nx + 0.25) / 0.2)), () => rich(t, s, { x: 1060, y: 480, size: 64, maxW: 760, times: [at], mode: 'drop', key: 'plan line ' + cur })); }
      if (t > r1b.at('corporations') && t < r2.t - 0.2 && !PORTRAIT) credit('People and corporations make a lot of money just from you scrolling.', 1060, 760, 760, { size: 28, a: 1 });
      const px = V(130, 90), py = V(300, SAFE.contentTop + 640);
      const on = (k) => cur === k; const gone = (k) => (R[k + 1] ? R[k + 1][0] - 0.25 : null);
      if (on(0)) prt(t, 'plan money', 'ht_newspaper', px, py + V(100, 0), V(460, 380), { at: R[0][0], from: [-60, 0], gone: gone(0), cr: 'Business pages: Olu Eletu, CC0' });
      if (on(1)) prt(t, 'plan fogg', 'ht_fogg', px + V(160, 260), py, V(580, 440), { at: R[1][0], from: [-60, 0], rot: 2, gone: gone(1), cr: 'B.J. Fogg · Kris Krüg, CC BY 2.0' });
      if (on(2)) prt(t, 'plan phone', 'ht_hand', px + V(120, 260), py, V(580, 440), { at: R[2][0], from: [-60, 0], gone: gone(2), cr: 'Hand: NeONBRAND, CC0', screen: (sx, sy, sw, sh) => uiGrid(t, sx, sy, sw, sh, { cols: 3, n: 9, badges: { 0: ['12', R[2][0] + 0.2], 4: ['3', R[2][0] + 0.4], 7: ['99+', R[2][0] + 0.6] } }) });
      if (on(3)) { prt(t, 'plan krieger', 'ht_krieger', px, py + V(140, 60), V(380, 300), { at: R[3][0], from: [-60, 0], rot: -3, gone: gone(3) }); prt(t, 'plan harris', 'ht_harris', px + V(450, 480), py, V(480, 400), { at: R[3][0] + 0.15, from: [-60, 0], rot: 3, gone: gone(3) });
        withA(clamp((t - R[3][0]) / 0.2), () => credit('Photos: Web Summit; Collision / Sportsfile · CC BY 2.0', px, V(900, py + 440), V(820, 900))); }
      if (on(4)) prt(t, 'plan reader', 'ht_reader', px, py + V(120, 30), V(440, 330), { at: R[4][0], from: [-60, 0], rot: -3, cr: 'Reader: Jeff Sheldon, CC0' });
    }, { id: 'plan', push: 0.015 });
    [r1, r2, r3, r4, r5].forEach((r, i) => { sPrint(r.t, i ? -3 : -1); sPaper(r.t + 0.05, -8); });
  }
  /* ---- 05 the attention economy (a paper feed into the first chapter) ---- */
  {
    const a = PH('so understand why your phone is designed to distract you'); const b = PH('you first have to understand something called the attention economy');
    addR(a.t - 0.1, (t) => {
      stack(t, 'To understand why your phone is designed to distract you, you first have to understand', 'the *attention economy.*', { t1: TW(a, 'To understand why your phone is designed to distract you,').concat(TW(b, 'you first have to understand')), t2: TW(b, 'the attention economy.'), ev: [b.at('attention')], size: V(140, 116), maxW: V(980, 940), y: V(130, SAFE.contentTop + 10) });
      prt(t, 'chips', 'ht_chips', V(1180, 110), V(250, 900), V(640, 560), { at: a.t, from: [120, 0], rot: 4, cr: 'Chips: Tim Reckmann, CC BY 2.0' });
    }, { id: 'economy', feed: true, push: 0.03 });
    sMark(b.at('attention')); sPaper(a.t + 0.05, -4);
  }
  /* ---- 06 Herbert Simon, 1971 ---- */
  {
    const a = PH('back in 1971'); const b = PH('an economist called herbert simon'); const c = PH('who later won a nobel prize');
    addR(a.t - 0.12, (t) => {
      prt(t, 'simon', 'ht_simon', V(110, 300), V(70, SAFE.contentTop + 300), V(760, 620), { at: a.t, from: [-90, 0], rot: -2, cr: 'Herbert A. Simon · photo: RIT, public domain' });
      bigNum(t, '1971', V(780, 70), V(110, SAFE.contentTop - 10), V(260, 200), a.at('1971'));
      receipt(t, 'simon receipt', V(1020, 70), V(420, 1210), V(780, 940), [{ l: 'herbert simon', big: true, at: b.at('herbert') }, { l: 'economist', at: b.at('economist') },
        { l: 'nobel prize, economics', r: '1978', at: c.at('nobel'), hl: c.at('prize') }], { fs: V(34, 30) });
    }, { id: 'simon', push: 0.015 });
    sStamp(a.at('1971'), -4); sPaper(a.t + 0.05, -3); sPrint(b.at('herbert')); sPrint(b.at('economist'), -3); sBell(c.at('nobel'), -4);
  }
  /* ---- 07 the quote: a clipping, marked ---- */
  {
    const a = PH('a wealth of information creates a poverty of attention');
    addR(a.t - 0.25, (t) => {
      if (PORTRAIT) prt(t, 'simon small', 'ht_simon', 320, 1060, 350, { rot: -3, cr: 'Herbert A. Simon · photo: RIT, public domain', crx: 300 });
      const x = V(200, 70), y = V(190, 470), w = V(1520, 940);
      slip(t, 'quote', x, y, w, V(560, 560), a.t - 0.2, (yy) => {
        rich(t, '“A wealth of information creates a *poverty of attention.*”', { x: x + 60, y: yy + 60, size: V(104, 76), weight: 700, lh: 1.06, maxW: w - 120, times: TW(a, '“A wealth of information creates a poverty of attention.”'), ev: [a.at('poverty')], col: RC.ink });
        txtW('Herbert Simon, “Designing Organizations for an Information-Rich World”, 1971', x + 60, yy + V(470, 480), MONO(V(28, 26), 400), RC.inkMid, w - 120, 36);
      }, { rot: 1 });
    }, { id: 'quote', push: 0.02 });
    sShut(a.t - 0.2, -2); sMark(a.at('poverty'));
  }
  /* ---- 08 information everywhere, attention scarce: notification slips pile up; the attention left counts down ---- */
  {
    const a = PH('what he meant was that information is everywhere'); const b = PH('the thing that has now become scarce is your attention'); const c = PH('only so much of human attention to go around');
    const lines = ['3 new messages', 'A story for you', 'Someone mentioned you', 'Your order is on its way', 'New video for you', '12 new posts', 'Leave now', 'Your weekly summary', 'A new song for you', 'A memory from today'];
    const t0 = a.at('information'), step = 0.62;
    addR(a.t - 0.12, (t) => {
      stack(t, 'Information is everywhere.', 'What is scarce is your *attention.*', { t1: TW(a, 'Information is everywhere.'), t2: TW(b, 'What is scarce is your attention.'), ev: [b.at('attention')], size: V(104, 92), maxW: V(820, 940) });
      lines.forEach((l, i) => { const at = t0 + i * step; const col = i % 2, row = Math.floor(i / 2);
        const x = V(960 + col * 430 - (row % 2) * 24, 70 + col * 470), y = V(60 + row * 168 + col * 60, 700 + row * 84);
        slip(t, 'n' + i, x, y, V(470, 470), V(124, 92), at, (yy) => { _txt('NOW', x + 26, yy + V(42, 34), MONO(V(26, 22)), RC.inkMid); _txt(l, x + 26, yy + V(96, 74), FT(700, V(40, 32)), RC.ink); }, { rot: ((i * 37) % 7) - 3, from: -70, sh: 0.5 }); });
      if (false) prt(t, 'tilt', 'ht_tilt', V(1300, 560), V(470, 1120), V(400, 300), { at: t0 - 0.3, from: [100, 0], cr: 'Phone: Oliur Rahman, CC0', crx: V(1000, 70) });
      const n = clamp(Math.floor((t - t0) / step) + 1, 0, lines.length); const left = Math.max(5, 100 - n * 8 - Math.round(15 * MOTION.ease(t, c.at('only'), 1.2, 'outQuint')));
      receipt(t, 'attention left', V(110, 70), V(600, 1180), V(700, 470), [{ l: 'attention left', r: left + '%', big: !PORTRAIT, at: t0, hl: c.at('only') }], { fs: V(34, 28) });
    }, { id: 'flood', push: 0.015 });
    for (let i = 0; i < 10; i += 3) sPaper(t0 + i * step, -4); sMark(b.at('attention'), -2); sPrint(t0, -4); sBell(c.at('only'), -6);
  }
  /* ---- 09 traded like currency: coins, and attention gets a price tag ---- */
  {
    const a = PH('so the attention economy is a system where human attention is treated as a scarce valuable thing'); const b = PH("and it's traded like currency");
    addR(a.t - 0.12, (t) => {
      stack(t, 'Human attention is treated as a scarce, valuable thing,', 'and it’s traded like currency.', { t1: TW(a, 'Human attention is treated as a scarce, valuable thing,'), t2: TW(b, 'and it’s traded like currency.'), size: V(96, 92), small: V(48, 50), maxW: V(1500, 940), x: V(960, 540), align: V('center', 'center'), y: V(80, SAFE.contentTop + 10) });
      prt(t, 'coins big', 'ht_coins', V(380, 70), V(360, 800), V(500, 480), { at: a.t, from: [0, 120], rot: -2, cr: 'Coins: Kevin Schneider, CC0', crx: V(380, 70) });
      // the price tag on a string, hung on the register on "traded"; the price prints on "currency"
      slip(t, 'price tag', V(1000, 420), V(470, 1150), V(700, 600), V(290, 260), b.at('traded') - 0.1, (yy) => {
        _txt('YOUR ATTENTION', V(1040, 460), yy + 76, MONO(V(40, 38)), RC.ink); _txt(t > b.at('currency') ? '$ ?' : '', V(1650, 980), yy + 230, FT(700, V(140, 130)), RC.ink, 'right');
        circle(V(1050, 470), yy + 200, 16, RC.blue);
      }, { rot: 7, zig: true, from: -90, rot0: 10 });
    }, { id: 'currency', push: 0.02 });
    sPaper(a.t + 0.05, -4); sPaper(b.at('traded') - 0.1, -3); sCash(b.at('currency'), -2);
  }
  /* ---- 10 free apps: "free", printed and totalled; paid with your attention ---- */
  {
    const a = PH('now think about our social media apps make their money'); const b = PH("you don't pay instagram to use instagram");
    const c = PH("you don't pay tiktok"); const d = PH("you don't pay facebook"); const e = PH('people call it a free service'); const f = PH('but in a way it is monetised');
    addR(a.t - 0.12, (t) => {
      stack(t, 'People call it a', '*free* service.', { t1: TW(e, 'People call it a'), t2: TW(e, 'free service.'), ev: [e.at('free')], size: V(140, 118), y: V(110, SAFE.contentTop + 10) });
      if (t < e.t - 0.1) withA(1 - clamp((t - e.t + 0.4) / 0.3), () => rich(t, 'You don’t pay Instagram to use Instagram.', { x: V(110, 70), y: V(110, SAFE.contentTop + 10), size: V(64, 58), maxW: V(860, 940), times: TW(b, 'You don’t pay Instagram to use Instagram.'), key: 'pay line' }));
      prt(t, 'free phone', 'ht_hand', V(470, 500), V(330, 760), V(560, 560), { at: a.t, from: [0, 90], cr: 'Hand: NeONBRAND, CC0', crx: V(110, 90), screen: (sx, sy, sw, sh) => {
        fillRR(sx + sw * 0.32, sy + sh * 0.18, sw * 0.36, sw * 0.36, sw * 0.08, RC.tileD);
        fillRR(sx + sw * 0.2, sy + sh * 0.46, sw * 0.6, sw * 0.17, sw * 0.085, RC.ink); _txt('FREE', sx + sw / 2, sy + sh * 0.46 + sw * 0.115, MONO(sw * 0.075), RC.paper, 'center');
        for (let i = 0; i < 3; i++) rect(sx + sw * 0.15, sy + sh * (0.62 + i * 0.06), sw * 0.7, sw * 0.03, '#BDB8AA'); } });
      receipt(t, 'free receipt', V(1180, 70), V(0, 760), V(640, 400), [
        { l: 'receipt', center: true, big: true, at: b.at('instagram') - 0.4 }, { rule: true, at: b.at('instagram') - 0.4 },
        { l: 'instagram', r: '$0.00', at: b.at('instagram', 2) }, { l: 'tiktok', r: '$0.00', at: c.at('tiktok') }, { l: 'facebook', r: '$0.00', at: d.at('facebook') },
        { rule: true, at: e.at('free') }, { l: 'total', r: '$0.00', big: true, at: e.at('free') }, { rule: true, at: f.at('but') },
        { l: 'paid with:', small: true, at: f.at('way') }, { l: 'your attention', big: true, at: f.at('monetised') - 0.2, hl: f.at('monetised') + 0.1 }], { fs: V(32, 22) });
    }, { id: 'free', push: 0.015 });
    sPaper(a.t + 0.05, -6); sPrint(b.at('instagram', 2)); sPrint(c.at('tiktok'), -2); sPrint(d.at('facebook'), -2); sBell(e.at('free'), -2); sPrint(f.at('monetised') - 0.2); sMark(f.at('monetised') + 0.1);
  }
  /* ---- 11 targeted ads: the feed scrolls with sponsored posts; the receipt itemises what grows ---- */
  {
    const a = PH('they make money from your engagement and your attention by selling targeted advertisement');
    const b = PH('so the more time you spend on the app'); const c = PH('the more ads you see'); const d = PH('the more the app learns about you');
    addR(a.t - 0.15, (t, lt) => {
      stack(t, 'They make money by selling', 'targeted ads.', { t1: TW(a, 'They make money by selling'), t2: TW(a, 'targeted ads.'), size: V(130, 112) });
      // the feed as a long strip of paper running off the top and bottom of the frame, scrolling; every 2nd post is Sponsored
      { const fx = V(1190, 600), fy = V(-20, 640), fw = V(560, 410), fh = V(1120, 820); const q = MOTION.ease(t, onCut(a.t), 0.5, 'outQuint');
        withA(clamp((t - onCut(a.t)) / 0.15), () => themeFixed(() => { ctx.save(); ctx.translate(0, (1 - q) * 90);
          paperShadow(() => rect(fx, fy, fw, fh, RC.paper), 0.8); ctx.save(); ctx.beginPath(); ctx.rect(fx, fy, fw, fh); ctx.clip();
          uiFeed(fx, fy, fw, fh, 40 + lt * 120, { ad: (i) => i % 2 === 1 });
          ctx.restore(); ctx.restore(); })); }
      const grow = (at) => '▮'.repeat(1 + clamp(Math.floor((t - at) / 0.35), 0, 7));
      receipt(t, 'ads receipt', V(110, 70), V(450, 700), V(960, 500), [
        { l: 'time on the app', r: t > b.at('time') ? grow(b.at('time')) : '', at: b.at('time') }, { l: 'ads you see', r: t > c.at('ads') ? grow(c.at('ads')) : '', at: c.at('ads') },
        { l: 'what the app learns', r: t > d.at('learns') ? grow(d.at('learns')) : '', at: d.at('learns'), hl: d.at('you') + 0.2 }], { fs: V(40, 30) });
    }, { id: 'ads', push: 0.012 });
    sPaper(a.t + 0.05, -6); sPrint(b.at('time')); sPrint(c.at('ads'), -2); sPrint(d.at('learns'), -2);
  }
  /* ---- 12 being sold: your time and attention, stamped SOLD; the phone keeps you in ---- */
  {
    const a = PH("it's your time and your attention that are actually being sold in a way"); const b = PH("and that's why so many of these apps are built to keep you in them for as long as possible");
    addR(a.t - 0.15, (t) => {
      stack(t, 'It’s your time and your attention that are actually being', '*sold.*', { t1: TW(a, 'It’s your time and your attention that are actually being'), t2: [a.at('sold')], ev: [a.at('sold')], size: V(190, 160), maxW: V(860, 940) });
      receipt(t, 'sold receipt', V(1040, 70), V(0, 740), V(780, 940), [{ l: 'receipt', center: true, big: true, at: a.t }, { rule: true, at: a.t },
        { l: 'your time', r: '1', at: a.at('time') }, { l: 'your attention', r: '1', at: a.at('attention') },
        { rule: true, at: b.at('built') }, { l: 'kept in the app', r: 'as long as possible', small: true, at: b.at('long'), hl: b.at('possible') }], { fs: V(34, 28) });
      stamp(t, 'Sold', V(1360, 560), V(330, 860), a.at('sold'), { size: V(120, 96), rot: -8, col: RC.red, onPaper: true, a: 0.88 });
      prt(t, 'metro', 'ht_metro', V(110, 70), V(560, 1040), V(420, 400), { at: b.at('apps') - 0.1, from: [-80, 0], rot: -2, cr: 'São Paulo metro: Wilfredor, CC0' });
    }, { id: 'sold', push: 0.02 });
    sPrint(a.at('time')); sPrint(a.at('attention'), -2); sStamp(a.at('sold')); sPaper(b.at('apps') - 0.1, -6); sPrint(b.at('long'), -3); sMark(b.at('possible'), -4);
  }
  /* ---- 13 PUNCH: your attention is the product (the receipt fills the frame) ---- */
  {
    const a = PH('so your attention is in a way the product');
    addR(a.t - 0.08, (t) => {
      punch(t, 'Your attention is, in a way, the *product.*', { times: TW(a, 'Your attention is, in a way, the product.'), ev: [a.at('product')], y: V(220, 600) });
      if (t > a.at('product')) withA(clamp((t - a.at('product')) / 0.25), () => { barcode(V(110, 70), V(760, 1160), V(900, 760), V(130, 160)); _txt('PRODUCT: YOUR ATTENTION', V(110, 70), V(910, 1370), MONO(V(32, 32)), RC.ink); });
    }, { id: 'product', ground: 'slip', push: 0.03 });
    sHit(a.at('product'), -2); sPrint(a.at('product') + 0.2, -4);
  }
  /* ---- 14 persuasive technology ---- */
  {
    const a = PH("now technology can be designed in a way that changes people's behavior"); const b = PH('and this idea is called persuasive technology');
    addR(a.t - 0.1, (t) => {
      stack(t, 'Technology can be designed to change people’s behaviour.', 'This is called *persuasive technology.*', { t1: TW(a, 'Technology can be designed to change people’s behaviour.'), t2: TW(b, 'This is called persuasive technology.'), ev: [b.at('persuasive')], size: V(112, 100), maxW: V(900, 940), x: V(1810, 70), align: V('right', 'left'), y: V(150, SAFE.contentTop + 10) });
      prt(t, 'gadgets', 'ht_gadgets', V(60, 120), V(250, 840), V(780, 600), { at: a.t, from: [-120, 0], rot: -5, rot0: -6, cr: 'Laptop and phone: Igor Son, CC0', crx: V(110, 120) });
    }, { id: 'persuasive', feed: true, push: 0.02 });
    sPaper(a.t + 0.05, -4); sTick(b.at('persuasive'), -4);
  }
  /* ---- 15 B.J. Fogg, Stanford, the lab, the book (real cover, shown in grey) ---- */
  {
    const a = PH('a lot of it traces back to a researcher at stanford university called bj fogg'); const b = PH('he ran a lab there called the persuasive technology lab');
    const c = PH('and later published a book on using computers to change what people think and do');
    addR(a.t - 0.12, (t) => {
      prt(t, 'fogg', 'ht_fogg', V(110, 60), V(130, 860), V(720, 540), { at: a.t, from: [-80, 0], rot: -2, cr: 'Photo: Kris Krüg, CC BY 2.0' });
      const L = rich(t, 'B.J. Fogg, *Stanford*', { x: V(560, 70), y: V(110, SAFE.contentTop - 10), size: V(84, 80), maxW: V(760, 940), times: TW(a, 'B.J. Fogg, Stanford'), ev: [a.at('stanford')], mode: 'words' });
      if (t > b.at('lab') - 0.2) lab('Persuasive Technology Lab', V(564, 70), V(110, SAFE.contentTop - 10) + L.h + V(46, 46));
      clip(t, 'stanford page', 'src_stanford', [0, 230, 2560, 1150], V(560, 70), V(330, 560), V(700, 600), { at: b.at('ran') - 0.1, rot: -2, credit: 'behaviordesign.stanford.edu', creditW: 600 });
      clip(t, 'book', 'src_fogg_cover', [0, 0, 434, 500], V(1380, 600), V(300, 860), V(420, 380), { at: c.at('book') - 0.1, rot: 4, pad: 14, gray: true, credit: 'Persuasive Technology, 2003 · cover: Open Library', creditW: 440 });
    }, { id: 'fogg', push: 0.015 });
    sPaper(a.t + 0.05, -3); sShut(b.at('ran') - 0.1, -3); sShut(c.at('book') - 0.1, -2);
  }
  /* ---- 16 the 2007 class: students built apps, millions of users within weeks ---- */
  {
    const a = PH('to make it more interesting in 2007 bj fogg taught a famous class at stanford'); const b = PH('where students use these ideas to build apps');
    const c = PH('within weeks their apps had millions of users'); const d = PH('some of these students went on to build some of the popular apps that we now know');
    addR(a.t - 0.12, (t) => {
      bigNum(t, '2007', V(110, 70), V(80, SAFE.contentTop - 20), V(250, 200), a.at('2007'));
      rich(t, 'A famous class at Stanford, where students used these ideas to build *apps.*', { x: V(110, 70), y: V(360, 610), size: V(64, 58), maxW: V(820, 940), times: TW(a, 'A famous class at Stanford,').concat(TW(b, 'where students used these ideas to build apps.')), ev: [b.at('apps')] });
      { const gx = V(1080, 560), gy = V(110, 770), gw = V(700, 450); slip(t, 'apps sheet', gx, gy, gw, gw, a.t, () => {}, { rot: 3 });
        if (t > onCut(a.t)) themeFixed(() => { ctx.save(); ctx.translate(gx + gw / 2, gy + gw / 2); ctx.rotate(3 * Math.PI / 180); ctx.translate(-gx - gw / 2, -gy - gw / 2);
          uiGrid(t, gx, gy - gw * 0.03, gw, gw, { cols: 3, n: 9, pop: a.t + 0.2, top: gw * 0.07, badges: { 1: ['1M', c.at('millions')], 5: ['3M', c.at('millions') + 0.2], 6: ['8M', c.at('weeks')] } }); ctx.restore(); }); }
      receipt(t, 'class receipt', V(110, 70), V(600, 1250), V(780, 470), [{ l: 'users', r: t > c.at('millions') ? 'millions' : '', at: c.at('millions') - 0.1, big: true }, { l: 'in', r: 'weeks', at: c.at('weeks') }], { fs: V(34, 28) });
      credit('The 2007 class: student apps reached 16 million users in 10 weeks (New York Times, 2011)', V(110, 70), V(880, 1400), V(820, 940));
    }, { id: 'class', push: 0.015 });
    sStamp(a.at('2007'), -4); sPaper(a.t + 0.05, -6); sPop(b.at('apps'), -2); sPrint(c.at('millions') - 0.1); sBell(c.at('millions') + 0.1, -4);
  }
  /* ---- 17 the behaviour model: three cards dealt face down, each turned on her word (real source: behaviormodel.org) ---- */
  {
    const a = PH('bj fogg also described a simple model of behavior'); const b = PH('for someone to do something one they need motivation');
    const c = PH('two they need the ability to do it'); const d = PH('and three they need a prompt');
    addR(a.t - 0.12, (t) => {
      stack(t, 'A simple model of behaviour:', 'B = MAP', { t1: TW(a, 'A simple model of behaviour:'), t2: [a.at('behavior') + 0.3], size: V(150, 130), mode: 'drop' });
      [['M', 'Motivation', b.at('motivation')], ['A', 'Ability', c.at('ability')], ['P', 'Prompt', d.at('prompt')]].forEach(([k, l, at], i) => {
        const x = V(110 + i * 330, 70 + i * 320), y = V(480, 680 + (i % 2) * 20), w = V(300, 300), h = V(400, 340);
        card2(t, 'card ' + k, x, y, w, h, a.at('behavior') + 0.5 + i * 0.12, at, (yy) => { _txt(k, x + 26, yy + V(120, 112), FT(700, V(130, 118)), RC.ink); txt(l, x + 26, yy + V(330, 290), FT(700, V(50, 44)), RC.ink, 'left', 'alphabetic', -1); }, { rot: [-5, 1, 6][i], from: -160, rot0: 14 });
      });
      clip(t, 'bm', 'src_bm', [0, 0, 1560, 780], V(1180, 160), V(480, 1080), V(620, 620), { at: a.at('model') - 0.1, rot: 3, credit: 'behaviormodel.org (BJ Fogg)', creditW: 600 });
    }, { id: 'model', push: 0.015 });
    sShut(a.at('model') - 0.1, -4); sPaper(a.at('behavior') + 0.5, -4); [b.at('motivation'), c.at('ability'), d.at('prompt')].forEach((x, i) => sfx('paper', x, i === 2 ? 0 : -3));
  }
  /* ---- 18 the prompt, the tap, the curiosity: on a phone (notification -> tap -> the app opens), itemised on the receipt ---- */
  {
    const a = PH('now thinking in terms of social apps think about a notification'); const b = PH('the notification is the prompt'); const c = PH('opening the app is the ability to do it');
    const d = PH('and that just takes a single tap'); const e = PH('and then the motivation'); const f = PH('is the curiosity about what is waiting for you there');
    addR(a.t - 0.12, (t) => {
      stack(t, null, 'A notification is the *prompt.*', { t2: TW(b, 'A notification is the prompt.'), ev: [b.at('prompt')], size: V(100, 96), maxW: V(1700, 940), x: V(460, 70), y: V(740, SAFE.contentTop + 10) });
      // the notification, as a big paper card; tapped on "a single tap" (it presses in, a ripple)
      { const nx = V(460, 70), ny = V(70, 640), nw = V(1000, 940), nh = V(190, 190); const press = d.at('tap'); const k = t > press && t < press + 0.22 ? 0.97 : 1;
        slip(t, 'notif card', nx, ny, nw, nh, a.at('notification') - 0.05, (yy) => {
          ctx.save(); ctx.translate(nx + nw / 2, yy + nh / 2); ctx.scale(k, k); ctx.translate(-nx - nw / 2, -yy - nh / 2);
          fillRR(nx + 34, yy + 40, 110, 110, 26, RC.tileD); _txt('CHAT', nx + 176, yy + 76, MONO(30), RC.inkMid); _txt('now', nx + nw - 40, yy + 76, MONO(30), RC.inkMid, 'right');
          _txt('You have a new message', nx + 176, yy + 136, FT(700, V(52, 46)), RC.ink); ctx.restore();
          tap(t, press, nx + nw * 0.62, yy + nh / 2, RC.ink, 30); }, { rot: -1, from: -90 }); }
      receipt(t, 'map receipt', V(460, 70), V(330, 880), V(1000, 940), [
        { l: 'prompt', r: 'a notification', at: b.at('prompt') }, { l: 'ability', r: 'a single tap', at: d.at('tap') },
        { l: 'motivation', r: 'curiosity', at: f.at('curiosity'), hl: f.at('curiosity') + 0.15 },
        { rule: true, at: f.at('waiting') }, { l: '= you open the app', big: true, at: f.at('waiting') + 0.1 }], { fs: V(38, 32), slot: false });
    }, { id: 'prompt', push: 0.012 });
    sPaper(a.t + 0.05, -6); sNotify(a.at('notification') - 0.05, -2); sPrint(b.at('prompt')); sTick(d.at('tap')); sPrint(d.at('tap') + 0.1, -4); sPrint(f.at('curiosity'), -2); sBell(f.at('waiting') + 0.1, -4);
  }
  /* ---- 19 his students: Mike Krieger, Tristan Harris (photos + name tickets, sourced) ---- */
  {
    const a = PH('and again some of these people who studied with bj fogg went on to shape the apps that we use today');
    const b = PH('mike krieger one of the cofounders of instagram was a student of his'); const c = PH('and so was tristan harris who later became one of the loudest critics of this kind of design');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Some of his students went on to shape', 'the apps we use today.', { t1: TW(a, 'Some of his students went on to shape'), t2: TW(a, 'the apps we use today.'), size: V(96, 84), maxW: V(1500, 940) });
      prt(t, 'krieger', 'ht_krieger', V(90, 70), V(330, 760), V(470, 300), { at: a.t + 0.3, from: [-60, 0], rot: -3, cr: 'Web Summit, CC BY 2.0' });
      receipt(t, 'krieger', V(560, 450), V(380, 770), V(400, 560), [{ l: 'mike krieger', at: b.at('mike') }, { l: 'co-founder,', at: b.at('cofounders') }, { l: 'instagram', at: b.at('instagram') }, { l: 'studied with fogg', at: b.at('student') }], { fs: V(30, 26) });
      prt(t, 'harris', 'ht_harris', V(990, 70), V(320, 1110), V(470, 290), { at: a.t + 0.6, from: [60, 0], rot: 3, cr: 'Collision / Sportsfile, CC BY 2.0' });
      receipt(t, 'harris', V(1430, 450), V(380, 1120), V(470, 560), [{ l: 'tristan harris', at: c.at('tristan') }, { l: 'studied with fogg', at: c.at('tristan') + 0.4 }, { l: 'later: a loud critic', at: c.at('loudest'), hl: c.at('critics') }], { fs: V(30, 26) });
      credit('Sources: Stanford Review; The Guardian, 2017', V(110, 70), V(960, 1450), V(1650, 940));
    }, { id: 'students', push: 0.012 });
    sPaper(a.t + 0.3, -3); sPrint(b.at('mike')); sPaper(a.t + 0.6, -5); sPrint(c.at('tristan')); sMark(c.at('critics'), -3);
  }
  /* ---- 20 the ideas were real; the industry made money out of them ---- */
  {
    const a = PH('this is not to demonise all of the things that these people did or taught'); const b = PH('but the ideas that he found and taught were real');
    const c = PH('and of course the industry picked up on them and made a shitload of money out of them');
    addR(a.t - 0.12, (t) => {
      stack(t, 'This is not to demonise them. But the ideas he found and taught were', '*real.*', { t1: TW(a, 'This is not to demonise').concat(TW(b, 'them. But the ideas he found and taught were')), t2: [b.at('real')], ev: [b.at('real')], size: V(380, 300), small: V(56, 52), maxW: V(1100, 940) });
      prt(t, 'servers', 'ht_servers', V(1230, 560), V(560, 1040), V(400, 280), { at: c.at('industry') - 0.1, from: [0, 100], rot: 2, cr: 'Data centre: BalticServers.com, CC BY-SA 3.0', crx: V(1230, 560) });
      stamp(t, 'Cashed in', V(1440, 280), V(330, 1340), c.at('money') + 0.1, { size: V(56, 44), rot: -8, col: RC.red, onPaper: true });
      receipt(t, 'industry', V(1300, 70), V(0, 1180), V(520, 560), [{ l: 'not to demonise', small: true, at: a.at('demonise') }, { l: 'the ideas', at: b.at('ideas') }, { l: 'real', big: true, at: b.at('real') }, { rule: true, at: c.at('industry') }, { l: 'the industry', small: true, at: c.at('industry') }, { l: 'picked them up', small: true, at: c.at('picked') }, { l: 'made a s***load', small: true, at: c.at('money') - 0.2 }, { l: 'of money', small: true, at: c.at('money'), hl: c.at('money') + 0.1 }], { fs: V(34, 28) });
    }, { id: 'real', push: 0.02 });
    sPaper(a.t + 0.05, -6); sPrint(b.at('ideas'), -4); sStamp(b.at('real'), -6); sPrint(c.at('industry')); sCash(c.at('money'), -3);
  }
  /* ---- 21 curiosity: something is waiting (a notification with its preview hidden, over a phone on the desk) ---- */
  {
    const a = PH('the motivation is a very important one'); const b = PH('the curiosity that something on that app is waiting for you');
    addR(a.t - 0.12, (t) => {
      stack(t, 'The motivation is', 'the *curiosity* that something is waiting for you.', { x: V(110, 70), y: V(700, SAFE.contentTop + 10), t1: TW(a, 'The motivation is'), t2: TW(b, 'the curiosity that something is waiting for you.'), ev: [b.at('curiosity')], size: V(80, 92), maxW: V(1750, 940) });
      prt(t, 'desk phone', 'ht_desk', V(110, 600), V(40, 1010), V(560, 420), { at: a.t, from: [-80, 0], rot: -2, cr: 'Phone: Julian O’hayon, CC0', crx: V(150, 600) });
      // the notification with its preview hidden: what is waiting? (a big card across the middle)
      { const hx = V(560, 70), hy = V(230, 760), hw = V(1100, 940), hh = V(240, 220);
        slip(t, 'hidden', hx, hy, hw, hh, b.at('something') - 0.1, (yy) => {
          fillRR(hx + 34, yy + 46, 120, 120, 28, RC.tileD); _txt('FEED', hx + 186, yy + 80, MONO(30), RC.inkMid); _txt('now', hx + hw - 40, yy + 80, MONO(30), RC.inkMid, 'right');
          fillRR(hx + 186, yy + 108, hw * 0.5, 30, 15, '#BDB8AA'); fillRR(hx + 186, yy + 156, hw * 0.3, 30, 15, '#BDB8AA'); circle(hx + hw - 90, yy + 140, 30, RC.red);
          if (t > b.at('waiting')) withA(clamp((t - b.at('waiting')) / 0.2), () => _txt('?', hx + hw - 90, yy + 156, FT(700, 44), '#FFFFFF', 'center'));
        }, { rot: -2, from: -90 }); }
    }, { id: 'curiosity', push: 0.02 });
    sPaper(a.t + 0.05, -4); sNotify(b.at('something') - 0.1, -2); sMark(b.at('curiosity'), -3);
  }
}

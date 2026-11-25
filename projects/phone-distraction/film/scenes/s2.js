/* phone-distraction · Receipt · part 2 (3:36-7:20): the unpredictable reward (a 1930s slot machine and the slot in your phone),
 * pull-to-refresh (the real patent), infinite scroll (the receipt that never ends), stopping cues (a book, a TV), autoplay. */
'use strict';
const SLOT_CR = 'Slot machine: Gameroom Show, CC BY-SA 4.0'; const BANDIT_CR = 'Slot machine: Paul VanDerWerf, CC BY 2.0'; const FLOOR_CR = 'Casino floor: Marek Ślusarczyk, CC BY 3.0';
function buildS2() {
  /* ---- 22 the unpredictable reward ---- */
  {
    const a = PH('now the most powerful part of all of this is the unpredictable reward at the end of it');
    addR(a.t - 0.1, (t) => {
      stack(t, 'The most powerful part of all of this:', 'the *unpredictable* reward.', { t1: TW(a, 'The most powerful part of all of this:'), t2: TW(a, 'the unpredictable reward.'), ev: [a.at('unpredictable')], size: V(150, 126), maxW: V(1000, 940) });
      prt(t, 'bandit', 'ht_bandit', V(1250, 330), V(40, 820), V(880, 560), { at: a.t, from: [100, 0], rot: 3, cr: BANDIT_CR, crx: V(1250, 300) });
    }, { id: 'reward', feed: true, push: 0.03 });
    sPaper(a.t + 0.05, -4); sMark(a.at('unpredictable'));
  }
  /* ---- 23 the bedrock of gambling: the old machine, and the slot in your pocket (reels land on nothing / small / big) ---- */
  {
    const a = PH('it is the bedrock of so many things'); const b = PH('it is also the bedrock of gambling'); const c = PH("for example you don't know what you will get out of it");
    const d = PH('sometimes nothing'); const e = PH('sometimes a small thing'); const f = PH('sometimes a big thing');
    const stops = [[d.at('nothing'), '—', c.t + 0.3], [e.at('small'), '♥', d.at('nothing') + 0.6], [f.at('big'), '99+', e.at('small') + 0.6]];
    addR(a.t - 0.12, (t) => {
      stack(t, 'It is the bedrock of so many things. It is also the bedrock of', 'gambling.', { t1: TW(a, 'It is the bedrock of so many things.').concat(TW(b, 'It is also the bedrock of')), t2: [b.at('gambling')], size: V(150, 130), maxW: V(900, 940) });
      if (!PORTRAIT) prt(t, 'slot small', 'ht_slot', V(110, 70), V(430, 1290), V(420, 140), { at: a.t, from: [-60, 0], rot: -3, cr: SLOT_CR });
      { const sx = V(1160, 200), sy = V(110, 640), sw = V(660, 680), sh = V(820, 620);
        slip(t, 'reel panel', sx, sy, sw, sh, a.t + 0.1, (yy) => { _txt('YOUR FEED', sx + sw / 2, yy + sh * 0.16, MONO(V(34, 32)), RC.inkMid, 'center'); uiReels(t, sx, yy, sw, sh, c.t + 0.3, stops);
          _txt('PULL TO REFRESH', sx + sw / 2, yy + sh * 0.84, MONO(V(30, 28)), RC.ink, 'center'); }, { rot: 1.5 }); }
      if (!PORTRAIT) receipt(t, 'reel receipt', 520, 430, 600, [{ l: 'sometimes', r: 'nothing', at: d.at('nothing') + 0.2 }, { l: 'sometimes', r: 'a small thing', at: e.at('small') + 0.4 }, { l: 'sometimes', r: 'a big thing', at: f.at('big') + 0.6, hl: f.at('big') + 0.7 }], { fs: 32 });
    }, { id: 'gamble', push: 0.012 });
    sPaper(a.t + 0.05, -4); sTick(c.t + 0.3, -2); sPop(d.at('nothing') + 0.36, -6); sPop(e.at('small') + 0.36, -3); sCash(f.at('big') + 0.36, -2); sPrint(f.at('big') + 0.6, -4);
  }
  /* ---- 24 psychologists have known this ---- */
  {
    const a = PH('the same principle kind of applies to social media'); const b = PH('and psychologists have known this for a long time');
    const c = PH('that reward that you cannot predict tends to make you come back strongly even more strongly than reward that you can predict');
    addR(a.t - 0.12, (t) => {
      stack(t, 'The same principle applies to', 'social media.', { t1: TW(a, 'The same principle applies to'), t2: TW(a, 'social media.'), size: V(120, 104), maxW: V(1000, 940) });
      const x = V(110, 70), y = V(440, 1010), w = V(1100, 940);
      prt(t, 'floor', 'ht_floor', V(1080, 140), V(70, 600), V(640, 380), { at: a.t, from: [80, 0], rot: 2, cr: FLOOR_CR, crx: V(1260, 140) });
      slip(t, 'psych', x, y, w, V(440, 430), c.t - 0.15, (yy) => {
        rich(t, 'A reward you *cannot predict* brings you back more strongly than a reward you can.', { x: x + 50, y: yy + 50, size: V(64, 56), lh: 1.08, maxW: w - 100, times: TW(c, 'A reward you cannot predict brings you back more strongly than a reward you can.'), ev: [c.at('cannot')], col: RC.ink, key: 'psych line' });
        txtW('A long-known finding in psychology: “variable” rewards, as in slot machines (Ferster and Skinner, 1957)', x + 50, yy + V(350, 350), MONO(V(26, 24), 400), RC.inkMid, w - 100, 34);
      }, { rot: -1 });
    }, { id: 'psych', push: 0.015 });
    sPaper(a.t + 0.05, -6); sShut(c.t - 0.15, -4); sMark(c.at('cannot'), -2);
  }
  /* ---- 25 predictable vs unpredictable: two receipts, one comes back far more ---- */
  {
    const a = PH('if i know that if i do this thing i will get this thing'); const b = PH("i probably won't come back to it as much as i would");
    const c = PH('if there was an unpredictable reward waiting for me');
    addR(a.t - 0.12, (t) => {
      const bars = (at, n) => '▮'.repeat(clamp(Math.floor((t - at) / 0.18) + 1, 0, n));
      receipt(t, 'pred', V(110, 30), V(0, SAFE.contentTop + 10), V(640, 500), [{ l: 'predictable', center: true, big: true, at: a.t }, { rule: true, at: a.t }, { l: 'if i do this', at: a.at('do') }, { l: 'i get this', at: a.at('get') }, { rule: true, at: b.at('come') },
        { l: 'you come back', r: t > b.at('come') ? bars(b.at('come'), 3) : '', at: b.at('come') }], { fs: V(36, 30) });
      receipt(t, 'unpred', V(1170, 550), V(0, SAFE.contentTop + 10), V(640, 500), [{ l: 'unpredictable', center: true, big: true, at: a.t + 0.2 }, { rule: true, at: a.t + 0.2 }, { l: 'something might', at: c.at('unpredictable') }, { l: 'be waiting', at: c.at('waiting') }, { rule: true, at: c.at('me') },
        { l: 'you come back', r: t > c.at('me') ? bars(c.at('me'), 11) : '', at: c.at('me'), hl: c.at('me') + 0.6 }], { fs: V(36, 30) });
      if (t > c.at('me') + 0.6) stamp(t, 'More', V(1580, 900), V(0, SAFE.contentTop + 330), c.at('me') + 0.6, { onPaper: true, col: RC.red, size: V(54, 40), rot: -10 });
      prt(t, 'pred slot', 'ht_slot', V(780, 250), V(420, 860), V(620, 560), { at: a.t + 0.3, from: [0, 100], rot: -2, cr: SLOT_CR, crx: V(780, 330) });
    }, { id: 'predict', push: 0.012 });
    sPrint(a.at('do'), -3); sPrint(a.at('get'), -3); sPrint(b.at('come'), -2); sPrint(c.at('unpredictable'), -3); sPaper(a.t + 0.3, -6); sBell(c.at('me') + 0.6, -4);
  }
  /* ---- 26 this is exactly how your phone works: four "maybe" tickets around the phone ---- */
  {
    const a = PH('and this is exactly how your phone works'); const b = PH("you don't know if there is a new message"); const c = PH('a new like on your video');
    const d = PH('a new video for you to see'); const e = PH('a new gist'); const f = PH("and that's not knowing it's exactly why you keep picking up your phone to check");
    addR(a.t - 0.12, (t) => {
      if (t < f.t - 0.1) stack(t, null, 'This is exactly how your phone works.', { t2: TW(a, 'This is exactly how your phone works.'), size: V(96, 84), maxW: V(820, 940), key2: 'works' });
      else stack(t, null, 'That not knowing is exactly why you keep *picking up your phone.*', { t2: TW(f, 'That not knowing is exactly why you keep picking up your phone.'), ev: [f.at('picking')], size: V(96, 84), maxW: V(820, 940), key2: 'picking' });
      
      [[b, 'A new message?', b.at('message')], [c, 'A new like on your video?', c.at('like')], [d, 'A new video for you?', d.at('video')], [e, 'A new gist?', e.at('gist')]].forEach(([ph, s, at], i) => {
        const x = V([1040, 1100, 1020, 1080][i], [90, 130, 70, 110][i]), y = V([90, 300, 510, 720][i], [720, 900, 1080, 1260][i]);
        slip(t, 'ask ' + i, x, y, V(760, 900), V(160, 150), at - 0.15, (yy) => { _txt('?', x + 40, yy + V(112, 106), FT(700, V(96, 90)), RC.red); _txt(s, x + 120, yy + V(98, 94), FT(700, V(50, 46)), RC.ink); }, { rot: [-3, 2, -1, 3][i], from: -80 });
      });
    }, { id: 'phoneworks', push: 0.015 });
    sPaper(a.t + 0.05, -6); sNotify(b.at('message') - 0.15, -3); sPaper(c.at('like') - 0.15, -6); sNotify(d.at('video') - 0.15, -4); sPaper(e.at('gist') - 0.15, -6); sMark(f.at('picking'), -3);
  }
  /* ---- 27 so many designs: the home screen fills with red badges ---- */
  {
    const a = PH("and there's so many designs that are now put in place to make sure that you're constantly on your phone and distracted by it");
    addR(a.t - 0.12, (t) => {
      stack(t, 'So many designs are put in place to keep you', 'on your phone.', { t1: TW(a, 'So many designs are put in place to keep you'), t2: TW(a, 'on your phone.'), size: V(130, 112), maxW: V(1500, 940), x: V(960, 540), align: 'center', y: V(80, SAFE.contentTop + 10) });
      const b0 = a.at('designs'); const vals = ['12', '3', '99+', '7', '1', '24', '4', '5', '9']; const badges = {}; vals.forEach((v, k) => { badges[k] = [v, b0 + 0.3 + k * 0.32]; });
      { const gx = V(260, 60), gy = V(330, 640), gw = V(1400, 960); slip(t, 'icon sheet', gx, gy, gw, V(440, 600), a.t, () => {}, { rot: -1 });
        if (t > onCut(a.t)) themeFixed(() => uiGrid(t, gx, gy - V(10, 0), gw, V(440, 600), { cols: V(6, 4), n: V(12, 8), badges, top: V(40, 30), pop: a.t + 0.1 })); }
      receipt(t, 'badge receipt', V(580, 270), V(800, 1270), V(760, 540), [{ l: 'notifications waiting', r: String(clamp(Math.floor((t - b0 - 0.3) / 0.32) + 1, 0, 9) * 17), at: b0 + 0.3 }], { fs: V(34, 26) });
    }, { id: 'designs', push: 0.015 });
    for (let k = 0; k < 9; k += 2) sPop(a.at('designs') + 0.3 + k * 0.32, -5); sPrint(a.at('designs') + 0.3, -6);
  }
  /* ---- 28 FEATURE 01 pull-to-refresh: the gesture, shown on a phone ---- */
  {
    const a = PH('the first of many is the pulltorefresh'); const b = PH('you know that gesture where you drag your feed down and you let it go to see if something new has appeared');
    const c = PH("that's the pulltorefresh");
    addR(a.t - 0.12, (t) => {
      const yb = featureTitle(t, 1, 'Pull-to-refresh', a.at('pulltorefresh'));
      const d0 = b.at('drag'), rel = b.at('go');
      prt(t, 'ptr phone', 'ht_hand2', V(1220, 520), V(60, 760), V(820, 680), { at: a.t, from: [80, 0], cr: 'Hand: Igor Miske, CC0', screen: (sx, sy, sw, sh) => {
        const D = sh * 0.22; const pull = t < rel ? D * MOTION.ease(t, d0, 0.7, 'outQuint') : D * (1 - MOTION.spring(t - rel - 0.45, 0.67, 2.0)); const fresh = t > rel + 0.45;
        if (pull > 1) spinner(sx + sw / 2, sy + pull / 2, sw * 0.07, clamp(pull / D), t > rel ? (t - rel) * 1.6 : 0);
        ctx.save(); ctx.translate(0, pull); uiFeed(sx, sy, sw, sh, fresh ? 0 : 420); ctx.restore();
        if (fresh) { const q = MOTION.ease(t, rel + 0.5, 0.35, 'outExpo'); withA(q, () => { fillRR(sx + sw * 0.25, sy + sh * 0.04, sw * 0.5, sw * 0.13, sw * 0.065, RC.red); _txt('New posts', sx + sw / 2, sy + sh * 0.04 + sw * 0.088, FT(700, sw * 0.055), '#FFFFFF', 'center'); }); }
        if (t > d0 - 0.25 && t < rel + 0.3) withA(0.85 * clamp((rel + 0.3 - t) / 0.3) * clamp((t - d0 + 0.25) / 0.15), () => circle(sx + sw / 2, sy + sh * 0.3 + pull, sw * 0.07, RC.ink));
      } });
      if (t > b.at('drag') - 0.1) rich(t, 'Drag your feed down, let it go, and see if something *new* has appeared.', { x: V(110, 70), y: yb + V(40, 40), size: V(56, 48), maxW: V(860, 940), times: TW(b, 'drag your feed down, let it go, and see if something new has appeared.'), ev: [b.at('new')], key: 'ptr line' });
    }, { id: 'ptr', feed: true, push: 0.01 });
    sTick(b.at('drag'), -2); sRefresh(b.at('go') + 0.5, -2); sMark(b.at('new'), -4);
  }
  /* ---- 29 the real patent: FIG. 8, Loren Brichter, Twitter; then "Pull-to-refresh is addictive." ---- */
  {
    const a = PH('that feature was developed by a developer called loren'); const b = PH('for a twitter app he built called tweetie around 2008');
    const c = PH('and he himself later said that this thing is really addictive'); const d = PH("so it's an addictive feature an addictive gesture");
    const FW = 2101, FH = 3033;
    addR(a.t - 0.2, (t) => {
      clip(t, 'patent', 'patent', [0, FH * 0.1, FW, FH * 0.56], V(90, 120), V(60, SAFE.contentTop + 120), V(720, 520), { at: a.t - 0.15, rot: -2, pad: 30,
        zoom: { at: b.at('tweetie') + 0.2, d: 0.9, k: 1.7, cx: FW * 0.455, cy: FH * 0.27 }, hl: [[FW * 0.33, FH * 0.24, FW * 0.3, FH * 0.025, b.at('tweetie') + 1.0]], credit: 'US Patent 8,448,084, Fig. 8 · Google Patents', creditW: 600 });
      receipt(t, 'brichter', V(840, 640), V(0, SAFE.contentTop - 10), V(980, 400), [{ l: 'loren brichter', big: true, at: a.at('loren') }, { l: 'inventor', r: 'pull-to-refresh', at: a.at('loren') + 0.4 }, { l: 'assignee', r: 'twitter, inc.', at: b.at('twitter') }, { l: 'built for', r: 'tweetie, 2009', at: b.at('tweetie') }], { fs: V(34, 20) });
      slip(t, 'brichter quote', V(840, 640), V(420, 1080), V(980, 400), V(330, 300), c.at('said') - 0.1, (yy) => {
        rich(t, '“Pull-to-refresh is *addictive.*”', { x: V(890, 670), y: yy + 50, size: V(84, 52), maxW: V(900, 360), times: [c.at('said')], ev: [c.at('addictive')], mode: 'drop', col: RC.ink, key: 'pr quote' });
        txtW('Loren Brichter, quoted in The Guardian, 2017', V(890, 670), yy + V(270, 250), MONO(V(26, 22), 400), RC.inkMid, V(880, 360), 30);
      }, { rot: 1 });
      if (t > d.t) rich(t, 'An addictive feature. An addictive gesture.', { x: V(840, 70), y: V(800, 1400), size: V(44, 40), maxW: 980, times: TW(d, 'An addictive feature. An addictive gesture.'), key: 'addictive line' });
    }, { id: 'patent', push: 0 });
    sShut(a.t - 0.15); sPrint(a.at('loren')); sPrint(b.at('twitter'), -3); sPrint(b.at('tweetie'), -3); sMark(b.at('tweetie') + 1.0, -4); sPaper(c.at('said') - 0.1, -2); sMark(c.at('addictive'), -1);
  }
  /* ---- 30 you keep pulling down: three pulls, three different results, printed ---- */
  {
    const a = PH('and it has this unpredictable reward again at the end of it'); const b = PH("when you pull down your feed to refresh you don't know what's coming");
    const c = PH('but you know something new will pop up right'); const d = PH('so you keep pulling down');
    const pulls = [[b.at('pull'), 'No new posts'], [c.at('something'), '1 new post'], [d.at('pulling'), '12 new posts']];
    addR(a.t - 0.12, (t) => {
      stack(t, 'You don’t know what’s coming, so you keep', '*pulling down.*', { t1: TW(b, 'You don’t know what’s coming,').concat(TW(d, 'so you keep')), t2: TW(d, 'pulling down.'), ev: [d.at('pulling')], size: V(140, 120), maxW: V(880, 940) });
      { const n = pulls.reduce((k, [p0]) => (t >= p0 ? k + 1 : k), 0); if (n) { const p0 = pulls[n - 1][0]; const q = MOTION.ease(t, p0, 0.5, 'outQuint');
        withA(clamp((t - p0) / 0.15), () => txt('×' + n, V(1440, 840), V(820, 1320) - (1 - q) * 160, FT(700, V(360, 260)), RC.white, 'center', 'alphabetic', -10, 'pull count')); } }
      if (false) prt(t, 'pull phone', 'ht_hand', V(1240, 470), V(70, 760), V(820, 680), { at: a.t, from: [80, 0], cr: 'Hand: NeONBRAND, CC0', screen: (sx, sy, sw, sh) => {
        const D = sh * 0.2; let pull = 0, res = null, rt = 0;
        pulls.forEach(([p0, r]) => { if (t >= p0) { const rel = p0 + 0.55; pull = t < rel ? D * MOTION.ease(t, p0, 0.45, 'outQuint') : D * (1 - MOTION.spring(t - rel, 0.67, 2.0)); if (t > rel + 0.2) { res = r; rt = rel + 0.2; } } });
        if (pull > 1) spinner(sx + sw / 2, sy + pull / 2, sw * 0.06, clamp(pull / D), t * 1.6);
        ctx.save(); ctx.translate(0, pull); uiFeed(sx, sy, sw, sh, 300); ctx.restore();
        if (res) { const q = MOTION.ease(t, rt, 0.35, 'outExpo'); withA(q, () => { const fs = sw * 0.055; const w_ = tw(res, FT(700, fs)) + sw * 0.14; fillRR(sx + sw / 2 - w_ / 2, sy + sh * 0.04, w_, sw * 0.13, sw * 0.065, res === 'No new posts' ? RC.tileD : RC.red); _txt(res, sx + sw / 2, sy + sh * 0.04 + sw * 0.088, FT(700, fs), '#FFFFFF', 'center'); }); }
      } });
      receipt(t, 'pulls receipt', V(110, 70), V(430, 700), V(1100, 640), [{ l: 'pull to refresh', center: true, big: true, at: a.t }, { rule: true, at: a.t }].concat(pulls.map(([p0, r], i) => ({ l: 'pull ×' + (i + 1), r, at: p0 + 0.35, hl: i === 2 ? p0 + 0.55 : null }))), { fs: V(40, 28) });
    }, { id: 'pulls', push: 0.01 });
    pulls.forEach(([p0], i) => { sTick(p0, -4); sRefresh(p0 + 0.3, i ? -4 : -6); sPrint(p0 + 0.35, -6); }); sMark(d.at('pulling'), -4);
  }
  /* ---- 31 FEATURE 02 infinite scroll: the feed as a receipt that never ends ---- */
  {
    const a = PH('another intentional design that keeps you stuck on your phone is the infinite scroll');
    const b = PH("if you don't know what the infinite scroll is it's just the ability to keep scrolling infinitely");
    addR(a.t - 0.1, (t, lt) => {
      const yb = featureTitle(t, 2, 'Infinite scroll', a.at('infinite'));
      if (t > b.at('ability') - 0.1) rich(t, 'The ability to keep scrolling, *infinitely.*', { x: V(110, 70), y: yb + V(40, 30), size: V(56, 48), maxW: V(760, 940), times: TW(b, 'the ability to keep scrolling, infinitely.'), ev: [b.at('infinitely')], key: 'scroll line' });
      const x = V(1060, 560), w = V(620, 450), off = 140 * lt + 22 * lt * lt;
      const sy0 = V(0, 760); themeFixed(() => { paperShadow(() => rect(x, sy0, w, H - sy0, RC.paper), 0.8);
        ctx.save(); ctx.beginPath(); ctx.rect(x, sy0, w, H - sy0); ctx.clip();
        const rh = V(120, 110); const i0 = Math.floor(off / rh);
        for (let i = i0; i < i0 + Math.ceil(H / rh) + 1; i++) { const y = i * rh - off; const kind = i % 5 === 3 ? 'sponsored' : 'post';
          _txt(kind === 'sponsored' ? 'SPONSORED' : 'POST ' + String(1000 + i), x + 36, y + rh * 0.45, MONO(V(30, 26)), RC.ink); _txt(kind === 'sponsored' ? '$' : '♥ ' + ((i * 37) % 90 + 3), x + w - 36, y + rh * 0.45, MONO(V(30, 26)), RC.ink, 'right');
          ctx.save(); ctx.setLineDash([8, 7]); ctx.strokeStyle = RC.ink; ctx.globalAlpha *= 0.4; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + 30, y + rh * 0.75); ctx.lineTo(x + w - 30, y + rh * 0.75); ctx.stroke(); ctx.restore(); }
        ctx.restore(); });
      prt(t, 'scroll metro', 'ht_metro', V(110, 70), V(470, 1000), V(420, 330), { at: a.t, from: [-80, 0], rot: -3, cr: 'São Paulo metro: Wilfredor, CC0' });
    }, { id: 'scroll', feed: true, push: 0.01 });
    sPrint(a.at('infinite') + 0.3, -4); sMark(b.at('infinitely'), -4);
  }
  /* ---- 32 websites used to have pages: Next page was a stopping point ---- */
  {
    const a = PH('before this feature or this design was made websites used to have pages'); const b = PH('when you get to the bottom and you wanted to see more content you would have to click next page');
    const c = PH('that click was a stopping point');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Websites used to have pages.', 'That click was a _stopping point._', { t1: TW(a, 'Websites used to have pages.'), t2: TW(c, 'That click was a stopping point.'), size: V(104, 92), maxW: V(820, 940) });
      const x = V(1000, 70), y = V(70, 820), w = V(820, 940), h = V(820, 600);
      slip(t, 'web page', x, y, w, h, a.t, (yy) => {
        fillRR(x + 30, yy + 30, w - 60, 60, 30, '#E9E6DD'); _txt('example.com/page/1', x + 70, yy + 70, MONO(28), RC.inkMid);
        const rows = V(6, 4); for (let i = 0; i < rows; i++) { const ry = yy + 130 + i * V(86, 80); fillRR(x + 40, ry, 100, 64, 8, RC.tile); fillRR(x + 170, ry + 8, w * 0.5, 18, 9, '#BDB8AA'); fillRR(x + 170, ry + 38, w * 0.3, 16, 8, '#D9D6CC'); }
        const by = yy + h - V(140, 120); const bx = x + w / 2 - 190; const press = b.at('click'); const k = t > press && t < press + 0.25 ? 0.95 : 1;
        withT(bx + 190, by + 40, k, 0, () => { fillRR(-190, -40, 380, 80, 40, t > press ? RC.ink : '#D9D6CC'); _txt('Next page  →', 0, 12, FT(700, 36), t > press ? RC.paper : RC.ink, 'center'); });
        _txt('1   2   3   …   10', x + w / 2, by + 106, MONO(30), RC.inkMid, 'center');
        tap(t, press, x + w / 2, by + 40);
      }, { rot: 1 });
    }, { id: 'pages', push: 0.012 });
    sPaper(a.t + 0.05, -3); sTick(b.at('click'));
  }
  /* ---- 33 do I actually want to keep going? (the phone is put down on the desk) ---- */
  {
    const a = PH("it's a very important moment where your brain has the chance to ask"); const b = PH('do i actually want to keep going');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Your brain has the chance to ask:', 'Do I actually want to *keep going?*', { t1: TW(a, 'Your brain has the chance to ask:'), t2: TW(b, 'Do I actually want to keep going?'), ev: [b.at('keep')], size: V(130, 116), maxW: V(1500, 940), x: V(960, 540), align: 'center', y: V(90, SAFE.contentTop + 10) });
      prt(t, 'reader ask', 'ht_reader', V(660, 140), V(440, 860), V(560, 560), { at: a.t, from: [0, 100], rot: -2, cr: 'Reader: Jeff Sheldon, CC0', crx: V(700, 200) });
    }, { id: 'ask', push: 0.03 });
    sPaper(a.t + 0.05, -4); sHit(b.at('keep'), -6);
  }
  /* ---- 34 designed in 2006: the moment removed, the feed keeps loading ---- */
  {
    const a = PH('infinite scroll was designed in 2006'); const b = PH("and it's removed that moment"); const c = PH("so you don't have to click anything");
    const d = PH('the content just keeps loading'); const e = PH('and there is now no natural place or chance for you to stop'); const f = PH('there is no cue sent to your brain to stop');
    addR(a.t - 0.12, (t) => {
      bigNum(t, '2006', V(110, 70), V(70, SAFE.contentTop - 20), V(250, 200), a.at('2006'));
      receipt(t, '2006 receipt', V(720, 520), V(0, SAFE.contentTop + 20), V(560, 490), [{ l: 'infinite scroll', at: a.at('scroll') }, { l: 'designed by', r: 'aza raskin', at: a.at('2006') }, { l: 'year', r: '2006', at: a.at('2006') + 0.3 }], { fs: V(32, 24) });
      rich(t, 'There is no natural place to *stop.*', { x: V(110, 70), y: V(420, 740), size: V(88, 76), maxW: V(860, 940), times: TW(e, 'There is no natural place to stop.'), ev: [e.at('stop')], key: 'no stop' });
      const s0 = b.at('removed'); const off = t < s0 ? 0 : 170 * (t - s0) + 30 * Math.pow(t - s0, 2);
      prt(t, 'servers', 'ht_servers', V(1060, 120), V(560, 1020), V(440, 420), { at: b.at('removed') - 0.1, from: [80, 0], rot: 2, cr: 'Data centre: BalticServers.com, CC BY-SA 3.0', crx: V(1060, 120) }); void off;
      credit('Source: Aza Raskin, Masters of Scale', V(110, 70), V(860, 1490), V(860, 500));
    }, { id: 'removed', push: 0.012 });
    sStamp(a.at('2006'), -4); sPrint(a.at('scroll'), -3); sPrint(a.at('2006') + 0.4, -6); sMark(e.at('stop'), -3);
  }
  /* ---- 35 load more: a button would be a cue; it's gone ---- */
  {
    const a = PH("if there's a button to load more that button will send a cue to my brain like okay");
    const b = PH('do i want to load more or do i want to drop my freaking phone'); const c = PH('but that is no longer there');
    addR(a.t - 0.12, (t) => {
      stack(t, 'A “load more” button would send', 'a *cue* to my brain.', { t1: TW(a, 'A “load more” button would send'), t2: TW(a, 'a cue to my brain.'), ev: [a.at('cue')], size: V(130, 110), maxW: V(860, 940) });
      const gone = MOTION.ease(t, c.at('longer'), 0.4, 'inOutQuart');
      { const sx = V(1060, 90), sy = V(140, 920), sw = V(760, 900), sh = V(720, 520);
        slip(t, 'load card', sx, sy, sw, sh, a.t, (yy) => {
          uiFeed(sx, yy, sw, sh * 0.42, 60, { ph: sw * 0.5 }); rect(sx, yy + sh * 0.42, sw, sh * 0.58, RC.paper);
          const b1 = t > b.at('load'), b2 = t > b.at('drop'); const bw = sw * 0.84, bh = V(130, 110), bx = sx + (sw - bw) / 2;
          fillRR(bx, yy + sh * 0.48, bw, bh, bh / 2, b1 && !b2 ? RC.ink : '#D9D6CC'); _txt('Load more', sx + sw / 2, yy + sh * 0.48 + bh * 0.64, FT(700, V(56, 48)), b1 && !b2 ? RC.paper : RC.ink, 'center');
          if (t > b.at('or')) { fillRR(bx, yy + sh * 0.5 + bh * 1.2, bw, bh, bh / 2, b2 ? RC.ink : '#D9D6CC'); _txt('Drop my phone', sx + sw / 2, yy + sh * 0.5 + bh * 1.2 + bh * 0.64, FT(700, V(56, 48)), b2 ? '#FFFFFF' : RC.ink, 'center'); }
          if (gone > 0) rect(bx - 20, yy + sh * 0.48 + bh * 0.5, (bw + 40) * gone, 10, RC.red);
          if (gone > 0 && t > b.at('or')) rect(bx - 20, yy + sh * 0.5 + bh * 1.7, (bw + 40) * gone, 10, RC.red);
        }, { rot: 1.5 }); }
      if (gone > 0) withA(gone, () => rich(t, 'No button. No cue.', { x: V(110, 70), y: V(520, 820), size: V(72, 64), maxW: V(860, 940), times: [c.at('longer')], mode: 'drop', key: 'no cue', col: g.mid }));
    }, { id: 'loadmore', push: 0.012 });
    sTick(b.at('load'), -3); sPop(b.at('drop'), -2); sErr(c.at('longer'), -6);
  }
  /* ---- 36 stopping cues: a book has chapters, a TV show had episodes, a DVD box had seasons (one receipt line each); then taken away ---- */
  {
    const a = PH('if you notice older forms of media had stopping cues'); const b = PH('for example a book has chapters'); const c = PH('i do this when i read book where i try to get to the end of one chapter');
    const d = PH('a tv show tv shows used to end'); const e = PH("and then you'd have to wait like for the next episode for like a week");
    const f = PH("i remember when i was a kid i would buy movies you'd buy season one"); const g_ = PH('or wait for season two');
    const h = PH('those are stopping cues but in the case of social apps that is taken away');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Older forms of media had', '*stopping cues.*', { t1: TW(a, 'Older forms of media had'), t2: TW(a, 'stopping cues.'), ev: [a.at('stopping')], size: V(120, 104), maxW: V(1100, 940) });
      const away = h.at('taken'); const fl = (i) => MOTION.ease(t, away + i * 0.07, 0.55, 'inOutQuart');
      const off = (i) => { ctx.save(); if (PORTRAIT) ctx.translate(fl(i) * -1400, 0); else ctx.globalAlpha *= 1 - 0.55 * fl(i); };
      off(0); prt(t, 'books', 'ht_books', V(90, 70), V(370, 760), V(380, 250), { at: a.t + 0.2, from: [0, 80], rot: -3, cr: 'Books: Chris Lawton, CC0' }); ctx.restore();
      off(1); prt(t, 'tv', 'ht_tv', V(560, 400), V(330, 740), V(420, 280), { at: a.t + 0.5, from: [0, 80], rot: 2, cr: 'TV: electromechanic812291, CC BY 2.0', screen: (sx, sy, sw, sh) => {
        if (t > e.at('next')) { _txt('NEXT EPISODE', sx + sw / 2, sy + sh * 0.42, MONO(sw * 0.07), RC.inkMid, 'center'); _txt('next week', sx + sw / 2, sy + sh * 0.66, FT(700, sw * 0.13), RC.ink, 'center'); }
        else if (t > d.at('end')) _txt('THE END', sx + sw / 2, sy + sh * 0.58, FT(700, sw * 0.14), RC.ink, 'center'); }, screenBg: t <= d.at('end') ? false : null }); ctx.restore();
      off(2); slip(t, 'season', V(1040, 760), V(380, 760), V(280, 250), V(300, 260), a.t + 0.8, (yy) => { const x0 = V(1040, 760); fillRR(x0, yy, V(360, 250), 64, 6, RC.ink); _txt('DVD', x0 + 22, yy + 44, MONO(26), RC.paper);
          _txt(t < g_.at('two') ? 'Season 1' : 'Season 2', x0 + 26, yy + 150, FT(700, V(56, 42)), RC.ink); _txt(t < f.at('one') ? '' : t < g_.at('two') ? 'watched' : 'buy it, or wait', x0 + 26, yy + 214, MONO(V(26, 22)), RC.inkMid); }, { rot: 3 }); ctx.restore();
      receipt(t, 'cues receipt', V(1300, 70), V(0, 1060), V(520, 940), [{ l: 'stopping cues', center: true, at: a.at('stopping') }, { rule: true, at: a.at('stopping') },
        { l: 'book', r: 'end of chapter', small: true, at: c.at('end'), strike: away + 0.35 }, { l: 'tv', r: 'next week', small: true, at: e.at('week'), strike: away + 0.47 }, { l: 'dvd', r: 'buy it, or wait', small: true, at: g_.at('two'), strike: away + 0.59 },
        { rule: true, at: away + 0.7 }, { l: 'social apps', r: 'none', at: away + 0.75, hl: away + 0.85 }], { fs: V(36, 30) });
      if (t > away + 0.3) rich(t, 'In social apps, that is *taken away.*', { x: V(110, 70), y: V(760, 820), size: V(96, 84), maxW: V(1600, 940), times: [away + 0.3], ev: [away + 0.35], mode: 'drop', key: 'taken away' });
    }, { id: 'cues', push: 0.01 });
    sPaper(a.t + 0.25, -4); sPaper(a.t + 0.55, -6); sPaper(a.t + 0.85, -6); sPrint(c.at('end'), -3); sPrint(e.at('week'), -3); sPrint(g_.at('two'), -3); sTear(h.at('taken'), -2);
  }
  /* ---- 37 PUNCH: your feed does not have a last page ---- */
  {
    const a = PH('your feed does not have a last page'); const b = PH("and it's intentionally designed that way so that you can keep scrolling forever if you can");
    addR(a.t - 0.08, (t) => {
      punch(t, 'Your feed does not have a *last page.*', { times: TW(a, 'Your feed does not have a last page.'), ev: [a.at('last')], y: V(220, 480), maxW: V(1060, 940), size: V(140, 120) });
      if (t > b.at('intentionally')) withA(clamp((t - b.at('intentionally')) / 0.25), () => txt('IT’S INTENTIONALLY DESIGNED THAT WAY.', V(110, 70), V(860, 1060), MONO(V(36, 32)), RC.ink, 'left', 'alphabetic', 1.5));
      { const rows = []; for (let i = 0; i < V(18, 8); i++) rows.push({ l: 'post ' + (2041 + i), r: i % 4 === 2 ? 'sponsored' : 'next', at: a.t + 0.2 + i * 0.22 });
        receipt(t, 'endless', V(1260, 300), V(0, 1120), V(520, 480), rows, { fs: V(32, 30), at: a.t, slot: false }); }
    }, { id: 'lastpage', ground: 'slip', push: 0.03 });
    sHit(a.at('last'), -3); sPrint(b.at('intentionally'), -4);
  }
  /* ---- 38 FEATURE 03 autoplay: the video ends, the next one starts on its own (on the TV) ---- */
  {
    const a = PH('another design that keeps you stuck on your phone is the autoplay'); const b = PH("if you notice on youtube when a video ends you don't have to do anything");
    const c = PH('the next one starts playing on its own within a few seconds');
    addR(a.t - 0.1, (t) => {
      const yb = featureTitle(t, 3, 'Autoplay', a.at('autoplay'));
      if (t > b.at('ends') - 0.2) rich(t, 'When a video ends,\nthe next one starts *on its own.*', { x: V(110, 70), y: yb + V(40, 30), size: V(56, 48), maxW: V(900, 940), times: TW(b, 'When a video ends,').concat(TW(c, 'the next one starts on its own.')), ev: [c.at('own')], key: 'autoplay line' });
      if (t > b.at('ends')) slip(t, 'up next', V(110, 70), V(560, 1230), V(640, 940), V(220, 200), b.at('ends'), (yy) => { const k = clamp((t - b.at('ends')) / Math.max(0.5, c.at('playing') - b.at('ends')));
        _txt(t < c.at('playing') ? 'NEXT VIDEO IN' : 'NEXT VIDEO', V(150, 110), yy + 70, MONO(34), RC.inkMid); _txt(t < c.at('playing') ? String(5 - Math.floor(k * 5)) : 'Playing', V(150, 110), yy + 170, FT(700, 84), RC.ink);
        rect(V(150, 110), yy + 190, (V(560, 860)) * k, 8, RC.red); }, { rot: -1.5 });
      prt(t, 'tvlegs', 'ht_tvlegs', V(1200, 300), V(50, 720), V(820, 480), { at: a.t, from: [80, 0], cr: 'TV: Sven Scheuermeier, CC0', screen: (sx, sy, sw, sh) => {
        const ended = t > b.at('ends'), playing = t >= c.at('playing');
        if (!ended) { rect(sx, sy, sw, sh, '#C9C4B4'); _txt('VIDEO 1', sx + sw * 0.08, sy + sh * 0.88, MONO(sw * 0.06), RC.ink); rect(sx + sw * 0.08, sy + sh * 0.92, sw * 0.84 * 0.9, sh * 0.02, RC.ink); }
        else if (!playing) { const k = clamp((t - b.at('ends')) / (c.at('playing') - b.at('ends'))); _txt('UP NEXT', sx + sw / 2, sy + sh * 0.3, MONO(sw * 0.06), RC.inkMid, 'center');
          ctx.save(); ctx.strokeStyle = RC.ink; ctx.lineWidth = sw * 0.02; ctx.beginPath(); ctx.arc(sx + sw / 2, sy + sh * 0.58, sw * 0.12, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); ctx.stroke(); ctx.restore();
          _txt(String(5 - Math.floor(k * 5)), sx + sw / 2, sy + sh * 0.58 + sw * 0.05, FT(700, sw * 0.14), RC.ink, 'center'); }
        else { rect(sx, sy, sw, sh, '#B9B4A6'); _txt('VIDEO 2 · STARTED ON ITS OWN', sx + sw * 0.08, sy + sh * 0.88, MONO(sw * 0.05), RC.ink); rect(sx + sw * 0.08, sy + sh * 0.92, sw * 0.84 * 0.06 * clamp(t - c.at('playing')), sh * 0.02, RC.red); }
      } });
    }, { id: 'autoplay', feed: true, push: 0.01 });
    sClock(b.at('ends') + 0.6, -6); sPop(c.at('playing'), -3);
  }
  /* ---- 39 two decisions, one already made for you ---- */
  {
    const a = PH('when a video is coming to an end you have two decisions to make'); const b = PH('you can keep watching or you can decide to stop watching');
    const c = PH("the problem with autoplay or what autoplay introduces is that you don't have to decide to keep watching"); const d = PH('that decision has been made for you');
    addR(a.t - 0.12, (t) => {
      if (t < d.t - 0.1) stack(t, null, 'You have two decisions to make.', { t2: TW(a, 'You have two decisions to make.'), size: V(100, 88), maxW: V(820, 940), key2: 'two decisions' });
      else stack(t, null, 'That decision has been *made for you.*', { t2: TW(d, 'That decision has been made for you.'), ev: [d.at('made')], size: V(100, 88), maxW: V(820, 940), key2: 'made for you' });
      const x = V(1000, 70), y = V(140, 760), w = V(820, 940);
      slip(t, 'decide', x, y, w, V(420, 400), a.at('two') - 0.1, (yy) => {
        const sel = MOTION.ease(t, d.at('made'), 0.35, 'outExpo'); const hs = V(140, 130);
        fillRR(x + 40, yy + 50, w - 80, hs, hs / 2, sel > 0.5 ? RC.ink : '#E9E6DD'); _txt('Keep watching', x + 90, yy + 50 + hs * 0.62, FT(700, V(52, 38)), sel > 0.5 ? RC.paper : RC.ink);
        if (sel > 0) withA(sel, () => _txt('✓', x + w - 100, yy + 50 + hs * 0.66, FT(700, V(60, 46)), RC.paper, 'center'));
        fillRR(x + 40, yy + 70 + hs, w - 80, hs, hs / 2, '#E9E6DD'); _txt('Stop watching', x + 90, yy + 70 + hs + hs * 0.62, FT(700, V(52, 38)), sel > 0.5 ? '#9A968A' : RC.ink);
        if (t > c.at('introduces') && t < d.at('made')) strokeRR(x + 40, yy + 50, w - 80, hs, hs / 2, RC.ink, 4);
      }, { rot: 1 });
    }, { id: 'decide', push: 0.012 });
    sPaper(a.at('two') - 0.1, -4); sTick(b.at('keep'), -4); sTick(b.at('stop'), -5); sStamp(d.at('made'), -4);
  }
  /* ---- 40 effort: stopping costs effort, continuing costs nothing ---- */
  {
    const a = PH('it is where you want to stop watching that you now have to put in the efforts to stop watching');
    const b = PH('so deciding to stop takes efforts but deciding to continue does not take any effort on the end of the user at all');
    const c = PH('so you can guess which one happens more continuing of course');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Deciding to stop takes effort.', 'Deciding to continue doesn’t.', { t1: TW(b, 'Deciding to stop takes effort.'), t2: TW(b, 'Deciding to continue doesn’t.'), size: V(110, 96), maxW: V(1000, 940) });
      const bars = (at, n) => '▮'.repeat(clamp(Math.floor((t - at) / 0.14) + 1, 0, n));
      receipt(t, 'effort', V(110, 70), V(430, 760), V(1360, 720), [{ l: 'stop watching', r: 'effort', at: b.at('stop') }, { l: '', r: t > b.at('efforts') ? bars(b.at('efforts'), V(32, 14)) : '', at: b.at('efforts') },
        { l: 'continue', r: 'no effort', at: b.at('continue') }, { l: '', r: t > b.at('effort') ? '▮' : '', at: b.at('effort') }, { rule: true, at: c.at('guess') }, { l: 'what happens more', r: 'continuing', at: c.at('continuing') - 0.1, hl: c.at('continuing') + 0.1 }], { fs: V(40, 28) });
      stamp(t, 'Continuing', V(1020, 640), V(420, 1160), c.at('continuing') + 0.2, { size: V(64, 52), rot: -7, col: RC.red, onPaper: true });
      prt(t, 'remote', 'ht_remote', V(1600, 820), V(300, 1010), V(620, 430), { at: b.at('stop') - 0.1, from: [0, 160], rot: 14, rot0: 10, cr: 'Remote: Dmitry Makeev, CC BY-SA 4.0', crx: V(1380, 560) });
    }, { id: 'effort', push: 0.012 });
    sPrint(b.at('stop'), -2); sPrint(b.at('efforts'), -4); sPrint(b.at('continue'), -2); sBell(c.at('continuing'), -3);
  }
}

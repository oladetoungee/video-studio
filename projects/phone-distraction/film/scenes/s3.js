/* phone-distraction · Receipt · part 3 (7:10-10:58): defaults, notifications and red badges (blue -> red, reportedly), the CHI
 * study (real paper page), likes, the brain-drain claim (contested), the EU findings on TikTok and Meta (real press releases). */
'use strict';
// EU press-release screenshots: CSS boxes from eu-*.json -> image px (scale 2, the capture starts at CSS y 72)
const EUPX = (b) => [b.x * 2, (b.y - 72) * 2, b.w * 2, b.h * 2];
const EU_TT = { 'infinite scroll': [290, 723, 105.6, 21], autoplay: [405.5, 723, 70.4, 21], 'push notifications': [485.7, 723, 148.3, 21], 'highly personalised': [704.1, 723, 50.2, 21],
  'highly personalised 2': [32, 751, 106.8, 21], preliminarily: [261.8, 643, 101.2, 21], 'Digital Services Act': [616.8, 643, 162.6, 21], 'addictive design': [56.1, 671, 136.7, 21] };
const EU_META = { 'infinite scroll': [419.4, 723, 105.6, 21], autoplay: [534.8, 723, 70.4, 21], 'push notifications': [615, 723, 148.3, 21], 'addictive design': [91.6, 671, 136.7, 21], preliminarily: [296.4, 643, 101.2, 21] };
const euBox = (o, k) => EUPX({ x: o[k][0], y: o[k][1], w: o[k][2], h: o[k][3] });
/** a settings list on a phone screen: rows [label, on0, flipTime | null, sub] */
function uiSettings(t, sx, sy, sw, sh, rows, o = {}) {
  const rh = sh * (o.rh || 0.13), y0 = sy + sh * (o.top || 0.12);
  _txt(o.title || 'SETTINGS', sx + sw * 0.08, y0 - sh * 0.03, MONO(sw * 0.05), RC.inkMid);
  rows.forEach(([l, on0, flip, sub], i) => { const y = y0 + i * rh;
    const on = flip == null ? (on0 ? 1 : 0) : (on0 ? 1 - MOTION.ease(t, flip, 0.3, 'outQuint') : MOTION.ease(t, flip, 0.3, 'outQuint'));
    _txt(l, sx + sw * 0.08, y + rh * 0.5, FT(700, sw * 0.06), RC.ink); if (sub) _txt(sub, sx + sw * 0.08, y + rh * 0.82, MONO(sw * 0.04), RC.inkMid);
    uiToggle(sx + sw * 0.7, y + rh * 0.24, rh * 0.42, on); rect(sx + sw * 0.08, y + rh - 2, sw * 0.84, 2, '#D9D6CC'); });
}
function buildS3() {
  /* ---- 41 the power of defaults: autoplay is on before you touch anything ---- */
  {
    const a = PH('and another thing that powers this is defaults'); const b = PH('for example autoplay is on by default'); const c = PH("and most people don't change the settings that their app comes with");
    addR(a.t - 0.12, (t) => {
      stack(t, 'Another thing that powers this:', '*defaults.*', { t1: TW(a, 'Another thing that powers this:'), t2: [a.at('defaults')], ev: [a.at('defaults')], size: V(170, 150), maxW: V(860, 940) });
      { const x = V(1060, 160), y = V(90, 700), w = V(740, 760), h = V(560, 520);
        slip(t, 'settings card', x, y, w, h, a.t, (yy) => uiSettings(t, x, yy, w, h, [['Autoplay', true, null, t > b.at('default') ? 'ON BY DEFAULT' : ''], ['Autoplay next video', true, null, ''], ['Notifications', true, null, ''], ['Personalised feed', true, null, '']], { rh: 0.2, top: 0.16, title: 'APP SETTINGS' }), { rot: 2 });
        if (t > b.at('default')) stamp(t, 'Default', x + w - V(300, 300), y + h - V(40, 10), b.at('default'), { onPaper: true, col: RC.red, size: V(54, 48), rot: -9 }); }
      receipt(t, 'defaults receipt', V(110, 70), V(560, 1280), V(860, 460), [{ l: 'most people', r: 'don’t change', at: c.at('change') }, { l: 'the settings', r: 'it comes with', at: c.at('comes'), hl: c.at('comes') + 0.2 }], { fs: V(34, 24) });
      credit('YouTube: autoplay is on by default for adults (off for 13 to 17 year olds since 2021).', V(110, 70), V(900, 1450), V(860, 940));
    }, { id: 'defaults', push: 0.012 });
    sPaper(a.t + 0.05, -6); sStamp(a.at('defaults'), -6); sTick(b.at('default'), -3); sPrint(c.at('change'), -2); sPrint(c.at('comes'), -3);
  }
  /* ---- 42 FEATURE 04 notifications and red badges: badges pop one by one, then Feed counts up ---- */
  {
    const a = PH('next up on the list of things that are designed to keep you on your phone is notifications and red badges'); const b = PH('most apps show notifications as red badges');
    const p0 = a.at('list'); const order = [0, 2, 5, 7, 3, 8, 1, 6]; const vals = ['12', '3', '1', '7', '99+', '5', '2', '9'];
    const at = (k) => p0 + 0.1 + k * 0.62; const n0 = a.at('notifications');
    addR(a.t - 0.1, (t) => {
      const yb = featureTitle(t, 4, 'Notifications and red badges', n0, { maxW: V(820, 940), labAt: a.t });
      if (t < n0 - 0.1) rich(t, 'Next up on the list:', { x: V(110, 70), y: V(160, SAFE.contentTop + 40), size: V(64, 60), times: TW(a, 'Next up on the list:'), mode: 'type', col: g.mid, key: 'next up' });
      const badges = {}; order.forEach((i, k) => { badges[i] = [vals[k], at(k)]; }); badges[0] = [(tt) => String(12 + clamp(Math.floor((tt - n0) / 0.5) + 1, 0, 3)), at(0)];
      prt(t, 'badge phone', 'ht_hand', V(1020, 160), V(-60, 760), V(1500, 1000), { at: a.t, from: [80, 0], cr: 'Hand: NeONBRAND, CC0', crx: V(1500, 640), screen: (sx, sy, sw, sh) => uiGrid(t, sx, sy, sw, sh, { cols: 3, n: 9, badges, top: sh * 0.12 }) });
      if (t > b.t - 0.1) rich(t, 'Most apps show notifications as *red badges.*', { x: V(110, 70), y: Math.max(yb, V(0, 0)) + V(40, 30), size: V(56, 48), maxW: V(860, 940), times: TW(b, 'Most apps show notifications as red badges.'), ev: [b.at('red')], key: 'most apps' });
    }, { id: 'badges', feed: true, push: 0.012 });
    order.forEach((_, k) => sPop(at(k) - 0.04, k ? -8 : -4)); sMark(b.at('red'), -4);
  }
  /* ---- 43 not an accident: you are reading, then an interruption drops onto the page ---- */
  {
    const a = PH('and that does not did not happen by accident'); const b = PH('they were intentionally designed');
    const c = PH('a notification is an interruption that someone else or something else decides to send you');
    addR(a.t - 0.12, (t) => {
      stack(t, 'That did not happen by _accident._', 'They were intentionally designed.', { t1: TW(a, 'That did not happen by accident.'), t2: TW(b, 'They were intentionally designed.'), size: V(104, 92), maxW: V(820, 940) });
      const x = V(1000, 70), y = V(70, 830), w = V(820, 940), h = V(800, 560); const hit = c.at('interruption');
      slip(t, 'reading', x, y, w, h, a.t - 0.12, (yy) => {
        _txt('CHAPTER 4', x + 50, yy + 70, MONO(28), RC.inkMid);
        const L_ = ['The light came in low over the', 'water, and for a moment nobody', 'said anything at all. She folded', 'the letter twice, put it back in', 'the envelope, and looked up', 'at the clock on the wall.'];
        L_.forEach((l, i) => _txt(l, x + 50, yy + 140 + i * V(70, 62), FT(400, V(42, 38)), i < 5 ? '#3B3C42' : RC.ink));
        const rl = Math.min(5, Math.floor((Math.min(t, hit) - a.t) / 0.9)); rect(x + 30, yy + 108 + rl * V(70, 62), 6, 44, RC.ink);
      }, { rot: -1 });
      slip(t, 'interrupt 1', x + V(60, 40), y + V(260, 160), V(700, 860), V(130, 120), hit - 0.1, (yy) => { _txt('NOTIFICATION · NOW', x + V(90, 70), yy + 44, MONO(24), RC.inkMid); _txt('A notification is an interruption', x + V(90, 70), yy + 96, FT(700, V(38, 34)), RC.ink); }, { rot: 3, from: -80, col: '#FFFFFF' });
      slip(t, 'interrupt 2', x + V(110, 40), y + V(420, 300), V(700, 860), V(130, 120), c.at('decides') - 0.1, (yy) => { _txt('SOMEONE ELSE · NOW', x + V(140, 70), yy + 44, MONO(24), RC.inkMid); _txt('that someone else decides to send you', x + V(140, 70), yy + 96, FT(700, V(34, 32)), RC.ink); }, { rot: -2, from: -80, col: '#FFFFFF' });
      if (t > c.at('decides') + 0.6) stamp(t, 'Interrupted', V(1440, 600), V(760, 1300), c.at('decides') + 0.6, { onPaper: true, size: V(40, 36) });
    }, { id: 'accident', feed: true, push: 0.012 });
    sMark(a.at('accident'), -3); sNotify(c.at('interruption'), -1); sNotify(c.at('decides') - 0.1, -4); sStamp(c.at('decides') + 0.6, -6);
  }
  /* ---- 44 the colour matters: the same badge, blue, then red (reportedly) ---- */
  {
    const a = PH('and the colour matters'); const b = PH("facebook's notification icon used to be blue to match the rest of the site");
    const c = PH('because you know facebook and that blue vibe'); const d = PH('according to reports people barely notice the blue one');
    const e = PH('so it was changed to red');
    addR(a.t - 0.12, (t) => {
      stack(t, null, 'The colour matters.', { t2: TW(a, 'The colour matters.'), size: V(130, 112), maxW: V(860, 940), mode: 'type' });
      if (t > d.at('people') - 0.1) rich(t, 'People barely noticed the blue one, so it was changed to red.', { x: V(110, 70), y: V(420, 700), size: V(60, 52), maxW: V(820, 940), times: TW(d, 'People barely noticed the blue one,').concat(TW(e, 'so it was changed to red.')), key: 'blue to red' });
      else if (t > b.t) rich(t, 'The notification icon used to be blue, to match the site.', { x: V(110, 70), y: V(420, 700), size: V(60, 52), maxW: V(820, 940), times: TW(b, 'The notification icon used to be blue, to match the site.'), key: 'used to be blue' });
      if (t > d.at('according')) withA(clamp((t - d.at('according')) / 0.3), () => credit('Reportedly: Tristan Harris, quoting a friend at Facebook (The Guardian, 2017).', V(110, 70), V(900, 1470), V(820, 940)));
      const mix = (c1, c2, k) => '#' + [1, 3, 5].map(i => Math.round(lerp(parseInt(c1.slice(i, i + 2), 16), parseInt(c2.slice(i, i + 2), 16), k)).toString(16).padStart(2, '0')).join('');
      void mix; slip(t, 'icon card', V(1080, 200), V(110, 1000), V(620, 680), V(620, 420), a.t, (yy) => {}, { rot: -2 });
      if (t > onCut(a.t) + 0.1) themeFixed(() => { const sx = V(1080, 200), sy = V(110, 1000), sw = V(620, 680), sh = V(620, 420);
        const s = V(380, 280), tx = sx + sw / 2 - s / 2, ty = sy + sh / 2 - s / 2; fillRR(tx, ty, s, s, s * 0.24, RC.tileD);
        if (t > a.at('matters') + 0.2) { const col = t <= b.at('blue') ? '#8C8C8C' : t < e.at('red') ? '#3B6FE0' : RC.red;
          const dim = MOTION.ease(t, d.at('barely'), 0.5, 'outQuint') * (1 - MOTION.ease(t, e.at('red') - 0.1, 0.2, 'outQuint'));
          const bump = t > e.at('red') ? 1 + 0.2 * Math.sin(Math.PI * clamp((t - e.at('red')) / 0.35)) : 1;
          withA(1 - 0.55 * dim, () => badge(tx + s - s * 0.06, ty + s * 0.06, '1', s / 110, MOTION.spring(t - a.at('matters') - 0.2, 0.55, 2.4) * bump, col)); }
      });
    }, { id: 'bluered', push: 0.015 });
    sPop(a.at('matters') + 0.2, -4); sTick(b.at('blue'), -3); sfx('error', d.at('barely'), -10); sHit(e.at('red'), -4);
  }
  /* ---- 44b PUNCH: changed to red to grab your attention (a red badge on the paper) ---- */
  {
    const a = PH('to grab your attention');
    addR(a.t - 0.3, (t) => {
      punch(t, 'Changed to red to *grab your attention.*', { times: [a.t - 0.25], ev: [a.at('grab')], mode: 'drop', size: V(150, 116), y: V(330, 640), maxW: V(1200, 940) });
      const s = MOTION.spring(t - a.t + 0.2, 0.45, 2.4); themeFixed(() => badge(V(1600, 820), V(560, 1250), '1', V(5, 4), s));
    }, { id: 'grab', ground: 'slip', push: 0.03 });
    sPop(a.t - 0.2, -2); sMark(a.at('grab'), -4);
  }
  /* ---- 45 almost every app: the grid opens with badges on, and they count up ---- */
  {
    const a = PH('now if you look at your phone almost every app uses a red badge now with a number on it');
    addR(a.at('almost') - 0.35, (t) => {
      stack(t, 'Almost every app uses a red badge', 'with a *number* on it.', { t1: TW(a, 'Almost every app uses a red badge'), t2: TW(a, 'with a number on it.'), ev: [a.at('number')], size: V(120, 104), maxW: V(860, 940) });
      const n0 = a.at('number'); const cnt = (base, k) => (tt) => String(base + clamp(Math.floor((tt - n0 - k * 0.15) / 0.33) + 1, 0, 3));
      const badges = { 0: cnt(14, 0), 1: cnt(1, 1), 2: cnt(96, 2), 3: cnt(7, 3), 5: cnt(1, 1), 6: cnt(7, 0), 7: cnt(2, 2), 8: cnt(5, 3) };
      themeFixed(() => uiGrid(t, V(80, 40), V(460, 760), V(1760, 1000), V(500, 700), { cols: V(6, 3), n: V(12, 9), badges: Object.assign({}, badges, { 9: cnt(3, 2), 10: cnt(11, 1), 11: cnt(1, 3) }), top: 0, pop: a.at('almost') - 0.2, fills: ['#FBF8EE', '#E6E1D3', '#FBF8EE', '#D9D6CC'] }));
    }, { id: 'everyapp', push: 0.012 });
    sPaper(a.at('almost') - 0.3, -6); sTick(a.at('number'), -4); sTick(a.at('number') + 0.66, -6);
  }
  /* ---- 46 something is unfinished: one big badge, then you clear it ---- */
  {
    const a = PH('that red badge that red colour and that number it creates a small feeling in your brain that something is unfinished');
    const b = PH('and you need to go clear'); const c = PH("it's like a sense of urgency");
    addR(a.t - 0.12, (t) => {
      stack(t, 'It creates a small feeling that something is', '*unfinished.*', { t1: TW(a, 'It creates a small feeling that something is'), t2: [a.at('unfinished')], ev: [a.at('unfinished')], size: V(150, 130), maxW: V(860, 940) });
      if (t > c.t) rich(t, 'It’s like a sense of urgency.', { x: V(110, 70), y: V(600, 860), size: V(56, 50), maxW: 860, times: TW(c, 'It’s like a sense of urgency.'), key: 'urgency' });
      const clr = b.at('clear');
      // the feeling, itemised: the receipt prints what the badge says, then the line is struck on "clear"
      receipt(t, 'unfinished receipt', V(1060, 70), V(0, 980), V(760, 940), [{ l: 'your phone', center: true, big: true, at: a.at('red') - 0.1 }, { rule: true, at: a.at('red') - 0.1 },
        { l: 'unread', r: t < a.at('number') ? '3' : '4', at: a.at('red'), strike: clr + 0.1 }, { l: 'status', r: 'unfinished', at: a.at('unfinished'), hl: a.at('unfinished') + 0.1, strike: clr + 0.25 },
        { rule: true, at: c.t }, { l: 'feeling', r: 'urgent', big: true, at: c.at('urgency') }], { fs: V(40, 32) });
      if (t > a.at('red')) { const sc = t < clr ? MOTION.spring(t - a.at('red'), 0.55, 2.4) : 1 - MOTION.ease(t, clr + 0.15, 0.3, 'inExpo'); if (sc > 0.01) themeFixed(() => badge(V(1790, 1000), V(150, 1000), t < a.at('number') ? '3' : '4', V(2.2, 2), sc)); }
      tap(t, clr, V(1790, 1000), V(150, 1000), RC.white);
    }, { id: 'unfinished', push: 0.015 });
    sPop(a.at('red') - 0.13, -3); sPrint(a.at('red'), -4); sTick(a.at('number'), -2); sMark(a.at('unfinished'), -4); sTick(b.at('clear'), -3); sPop(b.at('clear') + 0.3, -6);
  }
  /* ---- 47 the CHI study: the real paper page, and two weeks on two receipts ---- */
  {
    const a = PH("there's a study from chi which is the main conference in my field humancomputer interaction");
    const b = PH('where researchers had people keep their phone notifications on for one week and off for the other week');
    const c = PH('in the week where the phone notifications were on the people had more symptoms of inattention and hyperactivity');
    addR(a.t - 0.12, (t) => {
      // chi-title.png: 1550 x 335; the title's 2nd line ("Increase Inattention and Hyperactivity") sits at about y 128-160
      clip(t, 'chi', 'src_chi', [0, 0, 1550, 335], V(110, 70), V(80, SAFE.contentTop), V(1100, 940), { at: a.at('chi') - 0.1, rot: -1, hl: [[20, 125, 880, 36, c.at('inattention')]], credit: 'Kushlev, Proulx & Dunn, CHI 2016 · via Semantic Scholar · 221 people, self-reported, two weeks', creditW: V(1100, 940) });
      if (t > a.at('conference') - 0.1) lab('CHI · the main conference in human-computer interaction', V(110, 70), V(470, 820), { size: V(28, 26) });
      receipt(t, 'week a', V(110, 70), V(560, 900), V(820, 460), [{ l: 'week a', big: true, at: b.at('on') }, { l: 'notifications', r: 'on', at: b.at('on') + 0.1 }, { l: 'more inattention', small: true, at: c.at('more'), hl: c.at('more') + 0.2 }, { l: 'and hyperactivity', small: true, at: c.at('hyperactivity') }], { fs: V(32, 26) });
      receipt(t, 'week b', V(1000, 560), V(560, 900), V(820, 450), [{ l: 'week b', big: true, at: b.at('off') }, { l: 'notifications', r: 'off', at: b.at('off') + 0.1 }], { fs: V(32, 26) });
      
    }, { id: 'chi', push: 0.01 });
    sShut(a.at('chi') - 0.1, -3); sPrint(b.at('on'), -2); sPrint(b.at('off'), -3); sMark(c.at('inattention'), -2); sPrint(c.at('more'), -3);
  }
  /* ---- 48 something urgent is waiting: the phone on the desk lights up ---- */
  {
    const a = PH("because that's what notifications are meant to do to call your attention"); const b = PH('to make you feel like something urgent is waiting for you');
    const c = PH('you need to open your phone right');
    addR(a.t - 0.12, (t) => {
      stack(t, 'That’s what notifications are meant to do:', 'call your *attention.*', { t1: TW(a, 'That’s what notifications are meant to do:'), t2: TW(a, 'call your attention.'), ev: [a.at('attention')], size: V(120, 104), maxW: V(860, 940) });
      prt(t, 'reader urgent', 'ht_reader', V(1100, 120), V(70, 820), V(520, 520), { at: a.t, from: [80, 0], rot: 2, cr: 'Reader: Jeff Sheldon, CC0', crx: V(1060, 120) });
      [[b.at('urgent'), 'Something urgent is waiting'], [c.at('open'), 'You need to open your phone, right?']].forEach(([at, s], i) => slip(t, 'urgent ' + i, V(980 + i * 120, 60 + i * 100), V(660 + i * 140, 1000 + i * 170), V(740, 880), V(130, 120), at - 0.15, (yy) => { _txt('NOW', V(1010 + i * 120, 90 + i * 100), yy + 40, MONO(26), RC.inkMid); _txt(s, V(1010 + i * 120, 90 + i * 100), yy + 94, FT(700, V(40, 38)), RC.ink); }, { rot: i ? 3 : -3, from: -60, col: '#FFFFFF' }));
    }, { id: 'urgent', push: 0.02 });
    sPaper(a.t + 0.05, -6); sMark(a.at('attention'), -3); sNotify(b.at('urgent') - 0.15, -3); sNotify(c.at('open') - 0.15, -2);
  }
  /* ---- 49 FEATURE 05 likes: the like button, 2009, and hearts spreading to every app ---- */
  {
    const a = PH('another reason why you cannot let go of your phone is likes and social approval'); const b = PH('again this is intentional design');
    const c = PH("there was a time when likes on your posts didn't exist"); const d = PH('the like button launched on facebook in 2009');
    const e = PH('and it has spread across every social media app since then'); const f = PH('as a like or a love or something of that kind');
    addR(a.t - 0.1, (t) => {
      const yb = featureTitle(t, 5, 'Likes and social approval', a.at('likes'), { maxW: V(860, 940), labAt: a.t });
      if (t > c.t && t < d.t) rich(t, 'There was a time when likes didn’t exist.', { x: V(110, 70), y: yb + V(40, 30), size: V(56, 48), maxW: 860, times: TW(c, 'There was a time when likes didn’t exist.'), key: 'no likes' });
      receipt(t, 'like receipt', V(1060, 70), V(0, 840), V(760, 940), [{ l: 'like button', big: true, at: d.at('like') }, { l: 'launched', r: 'facebook', at: d.at('facebook') }, { l: 'date', r: '9 feb 2009', at: d.at('2009'), hl: d.at('2009') + 0.2 }, { rule: true, at: e.at('spread') }, { l: 'since then', r: 'every app', at: e.at('every') }], { fs: V(34, 30) });
      for (let i = 0; i < 5; i++) { const at = e.at('spread') + i * 0.18; if (t < at) continue; const s = MOTION.spring(t - at, 0.5, 2.6);
        const hx = V(1000 + i * 200, 150 + i * 195), hy = V(640 + (i % 2) * 150, 1220 + (i % 2) * 120); slip(t, 'heart ' + i, hx - 90, hy - 90, 180, 180, at, () => heart(hx, hy, 130, RC.red), { r: 60, rot: (i - 2) * 6, k: s }); }
      if (t > f.t) credit('A like, a love, or something of that kind. · Like button: 9 February 2009 (Web Design Museum)', V(110, 70), V(860, 1450), V(860, 940));
    }, { id: 'likes', feed: true, push: 0.012 });
    sPrint(d.at('like')); sPrint(d.at('2009'), -2); sPop(e.at('spread'), -4); sPop(e.at('spread') + 0.54, -6);
  }
  /* ---- 50 a small burst of social approval: your post, seen, liked ---- */
  {
    const a = PH('and it is also a design that is put in place to keep you coming back'); const b = PH('the like button gives you a small burst of social approval');
    const c = PH('i make a post'); const d = PH('someone sees what i posted'); const e = PH('and they like it');
    addR(a.t - 0.12, (t) => {
      if (t < b.t - 0.1) stack(t, null, 'It is also put in place to keep you coming back.', { t2: TW(a, 'It is also put in place to keep you coming back.'), size: V(96, 84), maxW: V(860, 940), key2: 'coming back' });
      else stack(t, null, 'The like button gives you a small burst of *social approval.*', { t2: TW(b, 'The like button gives you a small burst of social approval.'), ev: [b.at('social')], size: V(96, 84), maxW: V(860, 940), key2: 'approval' });
      prt(t, 'post phone', 'ht_hand2', V(1260, 560), V(70, 760), V(820, 680), { at: a.t, from: [80, 0], cr: 'Hand: Igor Miske, CC0', screen: (sx, sy, sw, sh) => {
        _txt('YOUR POST', sx + sw * 0.08, sy + sh * 0.09, MONO(sw * 0.05), RC.inkMid); fillRR(sx + sw * 0.08, sy + sh * 0.13, sw * 0.84, sh * 0.5, sw * 0.03, t > c.at('post') ? RC.tile : '#EEEBE3');
        _txt(t > d.at('sees') ? 'Seen by 1' : t > c.at('post') ? 'Posted just now' : '', sx + sw * 0.08, sy + sh * 0.72, FT(700, sw * 0.06), RC.inkMid);
        const liked = t > e.at('like'); const s = liked ? MOTION.spring(t - e.at('like'), 0.45, 2.8) : 1;
        withT(sx + sw * 0.78, sy + sh * 0.72, s, 0, () => heart(0, 0, sw * 0.2, liked ? RC.red : '#BDB8AA', liked)); if (liked) _txt('1', sx + sw * 0.64, sy + sh * 0.735, FT(700, sw * 0.07), RC.ink, 'right'); } });
    }, { id: 'approval', push: 0.012 });
    sPaper(a.t + 0.05, -6); sTick(c.at('post'), -4); sTick(d.at('sees'), -4); sPop(e.at('like'), -1); sMark(b.at('social'), -4);
  }
  /* ---- 51 how many likes? the counter never lands ---- */
  {
    const a = PH('when i make that post again this goes back to the idea of unpredictable rewards'); const b = PH("when i make a post and i drop my phone i don't know how many likes i will get");
    const c = PH("and i don't know how many likes i've already gotten"); const d = PH("so again it's an unpredictable reward that i am looking forward to and it keeps me coming back");
    addR(a.t - 0.12, (t) => {
      if (t < b.t) stack(t, null, 'Again: an unpredictable reward.', { t2: TW(a, 'Again: an unpredictable reward.'), size: V(100, 88), maxW: V(860, 940), key2: 'again' });
      else stack(t, 'When I make a post and drop my phone,', 'I don’t know how many likes I will *get.*', { t1: TW(b, 'When I make a post and drop my phone,'), t2: TW(b, 'I don’t know how many likes I will get.'), ev: [b.at('get')], size: V(100, 88), maxW: V(860, 940), key2: 'how many' });
      if (t > d.t - 0.1) rich(t, 'An unpredictable reward that keeps me coming back.', { x: V(110, 70), y: V(700, 900), size: V(48, 44), maxW: 860, times: TW(d, 'an unpredictable reward that keeps me coming back.'), key: 'keeps me' });
      { const sx = V(1060, 160), sy = V(0, 900), sw = V(760, 760), sh = V(1000, 700); const hs = MOTION.spring(t - a.t - 0.1, 0.5, 2.4);
        themeFixed(() => { withT(sx + sw / 2, sy + sh * 0.36, hs, 0, () => heart(0, 0, sw * 0.62, RC.red));
        const q = t > c.at('gotten'); const k = Math.floor(t * 12);
        if (!q) withBlur(4, () => _txt(String((k * 37) % 97 + 1), sx + sw / 2, sy + sh * 0.42, FT(700, sw * 0.24), '#FFFFFF', 'center')); else _txt('?', sx + sw / 2, sy + sh * 0.42, FT(700, sw * 0.24), '#FFFFFF', 'center'); });
      }
    }, { id: 'howmany', push: 0.012 });
    sPaper(a.t + 0.05, -6); sMark(b.at('get'), -4); sTape(c.at('gotten'), -8);
  }
  /* ---- 52 you keep going back to check: the hand lifts the phone, again and again (printed) ---- */
  {
    const a = PH('have you ever made a post on social media and you keep going back to check it'); const b = PH('to see how many likes or reaction it has gotten');
    const c = PH("that's intentional design"); const d = PH('in a way you keep coming back');
    const picks = [[a.at('going'), '2:09'], [a.at('check'), '2:14'], [b.at('likes'), '2:22']];
    addR(a.t - 0.12, (t) => {
      stack(t, 'Have you ever made a post and kept going back to', '*check it?*', { t1: TW(a, 'Have you ever made a post and kept going back to'), t2: TW(a, 'check it?'), ev: [a.at('check')], size: V(140, 120), maxW: V(860, 940) });
      if (t > c.t) rich(t, 'That’s intentional design.', { x: V(110, 70), y: V(640, 680), size: V(56, 48), maxW: 860, times: TW(c, 'That’s intentional design.'), key: 'intentional' });
      let lift = 0; picks.forEach(([p]) => { if (t > p) lift = Math.max(lift, Math.sin(Math.PI * clamp((t - p) / 0.7)) * V(90, 70)); });
      prt(t, 'check phone', 'ht_tilt', V(1000, 300), V(380, 1010), V(560, 440), { at: a.t, from: [100, 0], rot: -4, dy: -lift, cr: 'Phone: Oliur Rahman, CC0' });
      receipt(t, 'check receipt', V(1250, 70), V(0, 780), V(560, 600), picks.map(([p, tm], i) => ({ l: 'checked ×' + (i + 1), r: tm, at: p + 0.2 })), { fs: V(32, 26) });
    }, { id: 'check', push: 0.02 });
    picks.forEach(([p], i) => { sTick(p, i ? -6 : -4); sPrint(p + 0.2, -5); }); sMark(a.at('check'), -3);
  }
  /* ---- 53 the brain-drain claim (contested): the phone on the desk, switched off ---- */
  {
    const a = PH("there's a whole lot of research and a lot of claims about phone and our attention and distraction");
    const b = PH("i was reading one study that even says that having your phone on your desk even if it's switched off it makes you worse at thinking");
    const c = PH('they call it the brain drain or something'); const d = PH("so it's a very interesting topic that just attracts a lot of claims"); const PH_AFF = PH('especially because it affects a lot of people');
    addR(a.t - 0.12, (t) => {
      if (t < b.t) stack(t, null, 'A lot of research. A lot of claims.', { t2: TW(a, 'A lot of research. A lot of claims.'), size: V(110, 96), maxW: V(860, 940), key2: 'claims' });
      else stack(t, 'A phone on your desk, even switched off,', 'makes you *worse at thinking?*', { t1: TW(b, 'A phone on your desk, even switched off,'), t2: TW(b, 'makes you worse at thinking?'), ev: [b.at('worse')], size: V(110, 96), maxW: V(860, 940), key2: 'worse' });
      prt(t, 'desk off', 'ht_desk', V(1380, 620), V(80, 640), V(780, 420), { at: a.t, from: [80, 0], rot: -2, cr: 'Phone: Julian O’hayon, CC0', crx: V(1380, 380) });
      receipt(t, 'drain', V(110, 70), V(560, 1100), V(800, 620), [{ l: 'the “brain drain” claim', at: c.at('brain') }, { l: 'ward and others', r: '2017', small: true, at: c.at('brain') + 0.3 }, { l: 'repeat studies, 2022', r: 'no effect', small: true, at: c.at('drain') + 0.5 }], { fs: V(32, 26) });
      if (t > c.at('drain') + 0.6) stamp(t, 'Contested', V(560, 600), V(780, 1300), c.at('drain') + 0.6, { onPaper: true, size: V(40, 34) });
      if (t > d.t) rich(t, 'A topic that attracts a lot of claims, especially because it affects *a lot of people.*', { x: V(110, 70), y: V(840, 1460), size: V(36, 32), maxW: V(1200, 940), times: TW(d, 'A topic that attracts a lot of claims,').concat(TW(PH_AFF, 'especially because it affects a lot of people.')), ev: [PH_AFF.at('people')], key: 'affects', mono: false });
    }, { id: 'braindrain', push: 0.012 });
    sPaper(a.t + 0.05, -6); sMark(b.at('worse'), -3); sPrint(c.at('brain'), -2); sStamp(c.at('drain') + 0.6, -3);
  }
  /* ---- 54 the EU, February 2026: TikTok (the real press release, phrases marked on her words) ---- */
  {
    const a = PH('i was also reading that in february 2026 the european commission made a preliminary finding that');
    const b = PH("tiktok's design breaches the eu's digital services act");
    addR(a.t - 0.12, (t) => {
      stack(t, 'February 2026: a preliminary finding', 'against TikTok’s *design.*', { t1: TW(a, 'February 2026: a preliminary').concat(TW(b, 'finding')), t2: TW(b, 'against TikTok’s design.'), ev: [b.at('design')], size: V(104, 90), maxW: V(780, 940) });
      const tt = (k) => euBox(EU_TT, k);
      clip(t, 'eu tiktok', 'eu_tiktok', [40, 520, 2480, 1040], V(820, 70), V(90, 830), V(1040, 940), { at: a.at('european') - 0.15, rot: 1.5,
        hl: [[...tt('preliminarily'), a.at('preliminary')], [...tt('Digital Services Act'), b.at('digital')], [...tt('addictive design'), b.at('design')]], credit: 'European Commission press release, 6 Feb 2026 · screenshot 13 Oct 2026', creditW: V(880, 940) });
      if (t > b.at('act')) stamp(t, 'Preliminary', V(110, 70), V(560, 760), b.at('act'), { size: V(48, 40) });
    }, { id: 'eu-tiktok', feed: true, push: 0.01 });
    sShut(a.at('european') - 0.15, -2); sMark(a.at('preliminary'), -3); sMark(b.at('digital'), -5); sStamp(b.at('act'), -4);
  }
  /* ---- 55 the EU deserves a global award (a paper rosette) ---- */
  {
    const a = PH('now when it comes to regulation i think the eu deserves like a global award');
    const b = PH('some of the regulations sometimes can feel overbearing but some of them are actually very helpful');
    addR(a.t - 0.12, (t) => {
      stack(t, 'When it comes to regulation, I think', 'the EU deserves, like, a global *award.*', { t1: TW(a, 'When it comes to regulation, I think'), t2: TW(a, 'the EU deserves, like, a global award.'), ev: [a.at('award')], size: V(120, 100), maxW: V(980, 940) });
      // the rosette: a paper medal with ribbons, pinned on her word
      const rx = V(1500, 760), ry = V(330, 1120), s = MOTION.spring(t - a.at('award'), 0.5, 2.4); if (t > a.at('award') - 0.05) themeFixed(() => withT(rx, ry, s, -0.12, () => {
        paperShadow(() => { ctx.fillStyle = RC.paper; ctx.beginPath(); ctx.moveTo(-70, 60); ctx.lineTo(-120, 330); ctx.lineTo(-60, 290); ctx.lineTo(-20, 340); ctx.lineTo(0, 80); ctx.fill(); ctx.beginPath(); ctx.moveTo(70, 60); ctx.lineTo(120, 330); ctx.lineTo(60, 290); ctx.lineTo(20, 340); ctx.lineTo(0, 80); ctx.fill(); });
        paperShadow(() => { ctx.beginPath(); for (let i = 0; i < 24; i++) { const r = i % 2 ? 150 : 170, an = i * Math.PI / 12; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * r, Math.sin(an) * r); } ctx.closePath(); ctx.fillStyle = RC.paper; ctx.fill(); });
        circle(0, 0, 118, RC.ink); for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; _txt('★', Math.cos(an) * 80, Math.sin(an) * 80 + 12, FT(700, 34), RC.paper, 'center'); } _txt('EU', 0, 18, FT(700, 56), RC.paper, 'center'); }));
      receipt(t, 'regs', V(110, 70), V(560, 1280), V(820, 600), [{ l: 'some regulations', r: 'overbearing', at: b.at('overbearing') }, { l: 'some', r: 'very helpful', at: b.at('helpful'), hl: b.at('helpful') + 0.2 }], { fs: V(34, 26) });
    }, { id: 'award', push: 0.02 });
    sCash(a.at('award'), -6); sPrint(b.at('overbearing'), -3); sPrint(b.at('helpful'), -2);
  }
  /* ---- 56 what the EU named: the four features, flagged on the receipt and marked in the release ---- */
  {
    const a = PH('in this finding the eu named infinite scroll autoplay'); const b = PH("push notifications tiktok's highly personalised recommendation");
    const c = PH('those are the list of things that they named in the findings');
    addR(a.t - 0.12, (t) => {
      const tt = (k) => euBox(EU_TT, k);
      receipt(t, 'named', V(110, 70), V(0, SAFE.contentTop + 10), V(700, 940), [{ l: 'addictive design', center: true, big: true, at: a.at('named') }, { rule: true, at: a.at('named') },
        { l: 'infinite scroll', r: 'flagged', at: a.at('infinite'), hl: a.at('infinite') + 0.1 }, { l: 'autoplay', r: 'flagged', at: a.at('autoplay'), hl: a.at('autoplay') + 0.1 }, { l: 'push notifications', r: 'flagged', at: b.at('push'), hl: b.at('push') + 0.1 }, { l: 'personalised feed', r: 'flagged', at: b.at('highly'), hl: b.at('highly') + 0.1 },
        { rule: true, at: c.at('list') }, { l: 'digital services act', small: true, center: true, at: c.at('list') }], { fs: V(32, 26) });
      clip(t, 'eu named', 'eu_tiktok', [40, 1050, 1560, 380], V(900, 70), V(260, 900), V(920, 940), { at: a.t - 0.1, rot: -1,
        hl: [[...tt('infinite scroll'), a.at('infinite')], [...tt('autoplay'), a.at('autoplay')], [...tt('push notifications'), b.at('push')], [...tt('highly personalised'), b.at('highly')], [...tt('highly personalised 2'), b.at('highly') + 0.12]], credit: 'The press release, paragraph 2 · European Commission, 6 Feb 2026', creditW: V(920, 940) });
    }, { id: 'eu-named', push: 0.01 });
    sShut(a.t - 0.1, -4); sPrint(a.at('infinite'), -2); sPrint(a.at('autoplay'), -3); sPrint(b.at('push'), -3); sPrint(b.at('highly'), -3); sMark(a.at('infinite'), -4);
  }
  /* ---- 57 July: Meta, Instagram and Facebook ---- */
  {
    const a = PH('and also in july they made the same kind of preliminary findings against meta'); const b = PH('for the addictive design of instagram and facebook');
    addR(a.t - 0.12, (t) => {
      stack(t, 'July 2026: the same kind of finding', 'against *Meta.*', { t1: TW(a, 'July 2026: the same kind of finding'), t2: TW(a, 'against Meta.'), ev: [a.at('meta')], size: V(120, 104), maxW: V(780, 940) });
      if (t > b.t) receipt(t, 'meta receipt', V(110, 70), V(560, 1280), V(600, 600), [{ l: 'addictive design of', small: true, at: b.at('addictive') }, { l: 'instagram', at: b.at('instagram') }, { l: 'facebook', at: b.at('facebook') }], { fs: V(34, 26) });
      const mm = (k) => euBox(EU_META, k);
      clip(t, 'eu meta', 'eu_meta', [40, 520, 2480, 1040], V(760, 70), V(330, 820), V(1100, 940), { at: a.at('july') - 0.1, rot: -1.5,
        hl: [[...mm('preliminarily'), a.at('preliminary')], [...mm('addictive design'), b.at('addictive')], [...mm('infinite scroll'), b.at('instagram')], [...mm('autoplay'), b.at('instagram') + 0.25], [...mm('push notifications'), b.at('facebook')]], credit: 'European Commission press release, 10 Jul 2026 · screenshot 13 Oct 2026', creditW: V(880, 940) });
    }, { id: 'eu-meta', push: 0.01 });
    sShut(a.at('july') - 0.1, -2); sMark(a.at('meta'), -3); sPrint(b.at('instagram'), -3); sPrint(b.at('facebook'), -3);
  }
  /* ---- 58 a legal problem (preliminary, not final) ---- */
  {
    const a = PH('i think this is one of the first time that a regulator has formally said that these features like infinite scroll autoplay and stuff like that can be a legal problem');
    const b = PH("i mean it's not like these are final decisions yet");
    addR(a.t - 0.12, (t) => {
      stack(t, 'One of the first times a regulator has formally said these features can be', 'a *legal problem.*', { t1: TW(a, 'one of the first times a regulator has formally said these features can be'), t2: TW(a, 'a legal problem.'), ev: [a.at('legal')], size: V(150, 130), maxW: V(1000, 940) });
      prt(t, 'gavel', 'ht_gavel', V(1120, 140), V(120, 900), V(620, 380), { at: a.at('legal') - 0.15, from: [0, 120], rot: 3, cr: 'Gavel: Joe Gratz, CC0', crx: V(1120, 140) });
      if (t > b.t) stamp(t, 'Preliminary · not final', V(110, 70), V(720, 1360), b.t, { size: V(44, 36) });
    }, { id: 'legal', push: 0.02 });
    sPaper(a.at('legal') - 0.15, -4); sMark(a.at('legal'), -3); sStamp(b.t, -3);
  }
  /* ---- 59 I live in the EU (Estonia): the circle of stars ---- */
  {
    const a = PH("but i live in the eu and i'm very curious to see how this all goes"); const b = PH('the fact that regulators are starting to see these designs as a problem is something that i really want to see the end of');
    addR(a.t - 0.12, (t) => {
      stack(t, 'I live in the EU, and I’m very curious to see', 'how this all goes.', { t1: TW(a, 'I live in the EU, and I’m very curious to see'), t2: TW(a, 'how this all goes.'), size: V(110, 96), maxW: V(860, 940) });
      // the circle of twelve stars (the EU's symbol), drawn on her word "EU", star by star
      const cx = V(1450, 540), cy = V(420, 1060), R = V(250, 230);
      for (let i = 0; i < 12; i++) { const at = a.at('eu') + i * 0.06; const s = MOTION.spring(t - at, 0.5, 2.6); if (t < at) continue; const an = -Math.PI / 2 + i * Math.PI / 6;
        withT(cx + Math.cos(an) * R, cy + Math.sin(an) * R, s, 0, () => _txt('★', 0, 30, FT(700, V(80, 74)), RC.white, 'center')); }
      receipt(t, 'where', V(1250, 340), V(330, 1010), V(400, 420), [{ l: 'where i live', small: true, at: a.at('live') }, { l: 'estonia, eu', big: true, at: a.at('eu') }], { fs: V(30, 26) });
      if (t > b.t) rich(t, 'Regulators are starting to see these designs as a *problem.*', { x: V(110, 70), y: V(640, 1340), size: V(52, 46), maxW: V(860, 940), times: TW(b, 'Regulators are starting to see these designs as a problem.'), ev: [b.at('problem')], key: 'regulators' });
    }, { id: 'curious', push: 0.012 });
    sPop(a.at('eu'), -4); sPrint(a.at('live'), -4); sMark(b.at('problem'), -4);
  }
}

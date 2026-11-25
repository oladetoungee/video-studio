/* phone-distraction · part 3 (7:10-10:58): defaults, notifications and red badges (blue -> red), the CHI study, likes,
 * the brain-drain claim (contested), the EU findings on TikTok and Meta (real press releases, phrase highlights). */
'use strict';
// EU press-release screenshots: CSS boxes from eu-*.json -> image px (scale 2, the capture starts at CSS y 72)
const EUPX = (b) => [b.x * 2, (b.y - 72) * 2, b.w * 2, b.h * 2];
const EU_TT = { 'infinite scroll': [290, 723, 105.6, 21], autoplay: [405.5, 723, 70.4, 21], 'push notifications': [485.7, 723, 148.3, 21], 'highly personalised': [704.1, 723, 50.2, 21],
  'highly personalised 2': [32, 751, 106.8, 21], preliminarily: [261.8, 643, 101.2, 21], 'Digital Services Act': [616.8, 643, 162.6, 21], 'addictive design': [56.1, 671, 136.7, 21] };
const EU_META = { 'infinite scroll': [419.4, 723, 105.6, 21], autoplay: [534.8, 723, 70.4, 21], 'push notifications': [615, 723, 148.3, 21], 'addictive design': [91.6, 671, 136.7, 21], preliminarily: [296.4, 643, 101.2, 21] };
const euBox = (o, k) => EUPX({ x: o[k][0], y: o[k][1], w: o[k][2], h: o[k][3] });
function buildS3() {
  /* ---- 41 the power of defaults ---- */
  {
    const a = PH('and another thing that powers this is defaults'); const b = PH('for example autoplay is on by default'); const c = PH("and most people don't change the settings that their app comes with");
    addL(a.t - 0.12, (t) => {
      headline(t, 'Another thing that powers this: *defaults.*', { times: TW(a, 'Another thing that powers this: defaults.'), ev: [a.at('defaults')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      settings(t, 'defaults', V(960, 60), V(220, 760), V(840, 960), [{ label: 'Autoplay', on0: true, sub: 'On by default', at: b.at('autoplay') }, { label: 'Autoplay next episode', on0: true, at: b.at('default') }], b.at('autoplay') - 0.15, { size: V(46, 44) });
      banner(t, 'Most people don’t change the settings their app *comes with.*', { x: V(960, 60), y: V(520, 1060), w: V(840, 960), at: c.t - 0.06, ev: [c.at('comes')], size: V(50, 50) });
      credit('YouTube: autoplay is on by default for adults (off for 13 to 17 year olds since 2021).', V(120, 70), V(960, 1420), V(800, 940));
      illus(V(960, 70), 1010); homeBar();
    }, { id: 'defaults', push: 0.012 });
    sTick(b.at('autoplay'), -3); sNotify(c.t - 0.06, -3);
  }
  /* ---- 42 FEATURE 04 notifications and red badges: badges pop one by one, then count up (critic round 1) ---- */
  {
    const a = PH('next up on the list of things that are designed to keep you on your phone is notifications and red badges'); const b = PH('most apps show notifications as red badges');
    const G42 = () => ({ x: V(1010, 120), y: V(150, 760), cols: 4, size: V(150, 140), gx: V(64, 90), gy: V(110, 90), n: V(12, 8) });
    // badge entrances: one every 0.62 s from "list", each with its own pop; Feed then ticks 12 -> 15 from "notifications"
    const p0 = a.at('list'); const order = [0, 2, 5, 7, 3, 10, 8, 11]; const vals = ['12', '3', '1', '7', '99+', '5', '2', '9'];
    const at = (k) => p0 + 0.1 + k * 0.62; const n0 = a.at('notifications');
    addL(a.t - 0.1, (t) => {
      featureTitle(t, 4, 'Notifications and red badges', n0, { maxW: V(780, 940), times: TW(a, 'Notifications and red badges'), labAt: a.t, mode: 'drop' });
      if (t < n0 - 0.1) headline(t, 'Next up on the list:', { times: TW(a, 'Next up on the list:'), maxW: V(760, 940), y: V(270, SAFE.contentTop + 90), col: PD.muted, size: V(64, 60), mode: 'type' });
      const badges = {}; order.forEach((i, k) => { badges[i] = [vals[k], at(k)]; });
      const feedN = (tt) => String(12 + clamp(Math.floor((tt - n0) / 0.5) + 1, 0, 3));
      badges[0] = [feedN, at(0)];
      const tiles = homeGrid(t, { ...G42(), badges });
      // the tick bump on Feed: 1.0 -> 1.15 -> 1.0 over 0.3 s on each count
      for (let k = 0; k < 3; k++) { const tk = n0 + k * 0.5; const q = (t - tk) / 0.3; if (q > 0 && q < 1) withA(0.9, () => badge(tiles[0].x + tiles[0].s - 6, tiles[0].y + 6, feedN(t), PD.red, tiles[0].s / 150, 1 + 0.15 * Math.sin(Math.PI * q))); }
      banner(t, 'Most apps show notifications as *red badges.*', { x: V(120, 60), y: V(640, 1210), w: V(780, 960), at: b.t - 0.06, ev: [b.at('red')], head: 'Feed', when: 'now', size: V(50, 50) });
      illus(V(1010, 70), 1010); homeBar();
    }, { id: 'badges', pull: true, push: 0.012 });
    order.forEach((_, k) => sPop(at(k) - 0.04, k ? -8 : -4)); for (let k = 1; k < 3; k++) if (order.every((_, j) => Math.abs(at(j) - (n0 + k * 0.5)) > 0.2)) sTick(n0 + k * 0.5, -14); sNotify(b.t - 0.06, -4);
  }
  /* ---- 43 not an accident: you are reading, an interruption drops in, a second one stacks ---- */
  {
    const a = PH('and that does not did not happen by accident'); const b = PH('they were intentionally designed');
    const c = PH('a notification is an interruption that someone else or something else decides to send you');
    addL(a.t - 0.12, (t) => {
      headline(t, 'That did not happen by _accident._', { times: TW(a, 'That did not happen by accident.'), ev: [a.at('accident')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10), mode: 'drop' });
      if (t > b.t) headline(t, 'They were *intentionally* designed.', { times: TW(b, 'They were intentionally designed.'), ev: [b.at('intentionally')], maxW: V(760, 940), y: V(420, 600), size: V(52, 50), mode: 'words' });
      const x = V(960, 60), y = V(150, 760), w = V(840, 960), h = V(780, 640);
      const hit = c.at('interruption');
      card(t, 'reading', x, y, w, h, a.t - 0.12, (yy) => {
        lab('What you were reading', x + 40, yy + 66);
        // the article: lines of real-looking words, read top to bottom (a reading marker moves down until the interruption)
        const L_ = ['Chapter 4', 'The light came in low over the', 'water, and for a moment nobody', 'said anything at all. She folded', 'the letter twice, put it back in', 'the envelope, and looked up', 'at the clock on the wall.'];
        withA(0.5, () => L_.forEach((l, i) => _txt(l, x + 40, yy + 140 + i * V(60, 62), FT(i ? 500 : 600, V(40, 40)), i ? '#A7A9AF' : PD.text)));
        const rl = Math.min(6, Math.floor((Math.min(t, hit) - a.t) / 0.9)) + 1; rect(x + 24, yy + 108 + rl * V(60, 62), 6, 44, PD.red);
        if (t > hit) withA(0.6 * clamp((t - hit) / 0.3), () => fillRR(x, yy, w, h, BAN.r, PD.ink));
      });
      bannerStack(t, [{ s: 'A notification is an *interruption*', at: hit - 0.1, ev: [hit], head: 'Notification', size: V(50, 48) },
        { s: 'that someone else, or something else, *decides to send you.*', at: c.at('decides') - 0.1, ev: [c.at('decides')], head: 'Someone else', size: V(50, 48) }], { x: x + 20, y: y + 40, w: w - 40, keep: 2 }); homeBar();
    }, { id: 'accident', pull: true, push: 0.012 });
    sMark(a.at('accident')); sNotify(c.at('interruption'), -1); sNotify(c.at('decides') - 0.1, -4);
  }
  /* ---- 44 the colour matters: the same badge, blue, then red (reportedly) ---- */
  {
    const a = PH('and the colour matters'); const b = PH("facebook's notification icon used to be blue to match the rest of the site");
    const c = PH('because you know facebook and that blue vibe'); const d = PH('according to reports people barely notice the blue one');
    const e = PH('so it was changed to red');
    addL(a.t - 0.12, (t) => {
      headline(t, 'The colour *matters.*', { times: TW(a, 'The colour matters.'), ev: [a.at('matters')], maxW: V(760, 940), y: V(170, SAFE.contentTop + 10), mode: 'type' });
      if (t > d.at('people') - 0.1) headline(t, 'People barely noticed the blue one, so it was changed to *red.*', { times: TW(d, 'People barely noticed the blue one,').concat(TW(e, 'so it was changed to red.')), ev: [e.at('red')], maxW: V(760, 940), y: V(320, 560), size: V(60, 56), mode: 'words' });
      else if (t > b.t) headline(t, 'The notification icon used to be *blue,* to match the site.', { times: TW(b, 'The notification icon used to be blue, to match the site.'), ev: [b.at('blue')], maxW: V(760, 940), y: V(320, 560), size: V(60, 56), red: PD.blue, mode: 'words' });
      if (t > d.at('according')) withA(clamp((t - d.at('according')) / 0.3), () => credit('Reportedly: Tristan Harris, quoting a friend at Facebook (The Guardian, 2017).', LY.lx, V(880, 1430), V(760, 940), { size: 40 }));
      // the hero tile with ONE badge: pops blue on "blue", dims on "barely notice", recolours to red on "red" (0.35 s), then the burst
      const hx = V(1160, 340), hy = V(300, 880), hs = V(420, 400);
      card(t, 'hero tile', hx, hy, hs, hs, a.t, () => {}, { r: hs * 0.23, col: PD.tiles[1] });
      // the site behind the colour: a row of blue chrome on "blue vibe"
      if (t > c.at('blue')) withA(0.22 * clamp((t - c.at('blue')) / 0.3) * (1 - clamp((t - d.at('barely')) / 0.4)), () => fillRR(hx, hy, hs, hs, hs * 0.23, PD.blue));   // the tile washes blue on "blue vibe"
      // on "matters" a grey badge (no colour yet) pops; on "blue" it takes the site's blue
      if (t > a.at('matters') + 0.2 && t <= b.at('blue')) badge(hx + hs - 10, hy + 10, '1', '#6B6E76', V(2.9, 2.8), MOTION.spring(t - a.at('matters') - 0.2, 0.55, 2.4));
      if (t > b.at('blue')) {
        const p = 1 + 0.15 * Math.sin(Math.PI * clamp((t - b.at('blue')) / 0.3)); const dim = MOTION.ease(t, d.at('barely'), 0.5, 'outQuint') * (1 - MOTION.ease(t, e.at('red') - 0.1, 0.2, 'outQuint'));
        const rc = MOTION.ease(t, e.at('red'), 0.35, 'inOutQuart'); const mix = (c1, c2, k) => '#' + [1, 3, 5].map(i => Math.round(lerp(parseInt(c1.slice(i, i + 2), 16), parseInt(c2.slice(i, i + 2), 16), k)).toString(16).padStart(2, '0')).join('');
        const bump = (t > e.at('red') ? 1 + 0.18 * Math.sin(Math.PI * clamp((t - e.at('red')) / 0.35)) : 1) * (t > c.at('blue') ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - c.at('blue')) / 0.4)) : 1);
        withA(1 - 0.55 * dim, () => badge(hx + hs - 10, hy + 10, '1', mix(PD.blue, PD.red, rc), V(2.9, 2.8), p * bump));
      } homeBar();
    }, { id: 'bluered', push: 0.015, anchor: () => [V(1370, 510), V(540, 1080)] });
    sPop(a.at('matters') + 0.2, -4); sTick(b.at('blue'), -3); sTick(c.at('blue'), -8); sfx('error', d.at('barely'), -10); sHit(e.at('red'), -4);
  }
  /* ---- 44b PUNCH: changed to red to grab your attention (the badge bursts into the frame) ---- */
  {
    const a = PH('to grab your attention');
    addL(a.t - 0.3, (t) => {
      punch(t, 'Changed to red to *grab your attention.*', { times: [a.t - 0.25], ev: [a.at('grab')], mode: 'drop', size: V(150, 120), y: V(330, 700) });
    }, { id: 'grab', ground: 'red', burst: () => [V(1570, 730), V(310, 890)], push: 0.03 });
  }
  /* ---- 45 almost every app: the grid opens with badges on, and they count up ---- */
  {
    const a = PH('now if you look at your phone almost every app uses a red badge now with a number on it');
    addL(a.at('almost') - 0.35, (t) => {
      headline(t, 'Almost every app uses a *red badge* with a *number* on it.', { times: TW(a, 'Almost every app uses a red badge with a number on it.'), ev: [a.at('red'), a.at('number')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10), mode: 'words' });
      const n0 = a.at('number'); const cnt = (base, k) => (tt) => String(base + clamp(Math.floor((tt - n0 - k * 0.15) / 0.33) + 1, 0, 3));
      const badges = { 0: [cnt(14, 0), null], 1: [cnt(1, 1), null], 2: [cnt(96, 2), null], 3: [cnt(7, 3), null], 5: [cnt(1, 1), null], 7: [cnt(7, 0), null], 8: [cnt(2, 2), null], 10: [cnt(5, 3), null], 11: [cnt(9, 1), null] };
      homeGrid(t, { x: V(1010, 120), y: V(150, 840), cols: 4, size: V(150, 150), gx: V(64, 90), gy: V(110, 100), badges });
      homeBar();
    }, { id: 'everyapp', push: 0.012 });
    sTick(a.at('number'), -4); sTick(a.at('number') + 0.66, -6);
  }
  /* ---- 46 something is unfinished: one badge, then you clear it ---- */
  {
    const a = PH('that red badge that red colour and that number it creates a small feeling in your brain that something is unfinished');
    const b = PH('and you need to go clear'); const c = PH("it's like a sense of urgency");
    addL(a.t - 0.12, (t) => {
      headline(t, 'It creates a small feeling that something is *unfinished.*', { times: TW(a, 'It creates a small feeling that something is unfinished.'), ev: [a.at('unfinished')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t > c.t) credit('A sense of urgency.', LY.lx, V(640, 780), V(760, 940), { size: 44, col: PD.text });
      const hx = V(1180, 390), hy = V(330, 900), hs = V(340, 300); const clr = b.at('clear');
      card(t, 'one tile', hx, hy, hs, hs, a.t, () => {}, { r: hs * 0.23, col: PD.tiles[1] });
      const n = t < a.at('number') ? 3 : 4; const s = t < clr ? MOTION.spring(t - a.at('red'), 0.55, 2.4) * (t > a.at('number') ? 1 + 0.12 * Math.max(0, 1 - (t - a.at('number')) / 0.3) : 1) : 1 - MOTION.ease(t, clr + 0.15, 0.3, 'inExpo');
      if (t > a.at('red') && s > 0.01) badge(hx + hs - 10, hy + 10, String(n), PD.red, V(2.3, 2.1), s);
      tap(t, clr, hx + hs / 2, hy + hs / 2); homeBar();
    }, { id: 'unfinished', push: 0.015, anchor: () => [V(1350, 540), V(540, 1050)] });
    sPop(a.at('red') - 0.13, -3); sTick(a.at('number'), -2); sMark(a.at('unfinished'), -4); sTick(b.at('clear'), -3); sfx('pop', b.at('clear') + 0.3, -6);
  }
  /* ---- 47 the CHI study ---- */
  {
    const a = PH("there's a study from chi which is the main conference in my field humancomputer interaction");
    const b = PH('where researchers had people keep their phone notifications on for one week and off for the other week');
    const c = PH('in the week where the phone notifications were on the people had more symptoms of inattention and hyperactivity');
    addL(a.t - 0.12, (t) => {
      card(t, 'chi', V(120, 60), V(120, SAFE.contentTop + 10), V(1680, 960), V(250, 360), a.at('chi') - 0.1, (yy) => {
        lab('CHI 2016', V(160, 100), yy + 62, { size: 34 }); if (!PORTRAIT && t > a.at('conference') - 0.1) _txt('·', V(345, 270), yy + 62, FT(600, 34), PD.muted);
        if (!PORTRAIT && t > a.at('conference') - 0.1) withA(clamp((t - a.at('conference') + 0.1) / 0.25), () => _txt('the main conference in human-computer interaction', V(375, 270), yy + 62, FT(500, 34), PD.muted));
        if (t > a.at('chi') + 1.0) withA(clamp((t - a.at('chi') - 1.0) / 0.3), () => txtW('“Silence Your Phones”: Smartphone Notifications Increase Inattention and Hyperactivity Symptoms', V(160, 100), yy + 130, FT(600, V(52, 50)), PD.text, V(1600, 880), V(64, 60)));
        if (t > a.at('field')) withA(clamp((t - a.at('field')) / 0.3), () => credit('Kushlev, Proulx and Dunn · 221 people · symptoms they reported themselves', V(160, 100), yy + V(232, 330), V(1600, 880)));
      });
      const weeks = [['Week A', 'Notifications on', true, b.at('on')], ['Week B', 'Notifications off', false, b.at('off')]];
      weeks.forEach(([k, l, on, at], i) => {
        const x = V(120 + i * 860, 60), y = V(430, 820 + i * 300), w = V(820, 960), h = V(420, 270);
        card(t, 'week ' + i, x, y, w, h, at - 0.1, (yy) => {
          lab(k, x + 40, yy + 66); txt(l, x + 40, yy + 140, FT(600, V(56, 52)), PD.text, 'left', 'alphabetic', -1); toggle(x + w - 40 - 96, yy + 40, on ? 1 : 0);
          if (on && t > c.at('more')) { const q = MOTION.ease(t, c.at('more'), 0.35, 'outExpo'); withA(q, () => { txtW('More inattention and hyperactivity', x + 40, yy + V(230, 200), FT(600, V(48, 44)), PD.red, w - 80, V(56, 50)); }); }
        });
      });
    }, { id: 'chi', push: 0.01 });
    sShut(a.at('chi') - 0.1, -3); sTick(b.at('on'), -3); sTick(b.at('off'), -4); sMark(c.at('more'), -2);
  }
  /* ---- 48 something urgent is waiting ---- */
  {
    const a = PH("because that's what notifications are meant to do to call your attention"); const b = PH('to make you feel like something urgent is waiting for you');
    const c = PH('you need to open your phone right');
    addL(a.t - 0.12, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '2:07', '2:07', null, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(a, 'That’s what notifications are meant to do: *call your attention.*', ['call']), B(b, 'To make you feel like something *urgent* is waiting for you.', ['urgent']),
        B(c, 'You need to open your phone, right?', [], { head: 'Notification' })], { x: LY.bx, y: V(160, 900), w: LY.bw, keep: V(3, 2) });
      homeBar();
    }, { id: 'urgent', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.06, -3); sMark(b.at('urgent'), -2); sNotify(c.t - 0.06, -2);
  }
  /* ---- 49 FEATURE 05 likes ---- */
  {
    const a = PH('another reason why you cannot let go of your phone is likes and social approval'); const b = PH('again this is intentional design');
    const c = PH("there was a time when likes on your posts didn't exist"); const d = PH('the like button launched on facebook in 2009');
    const e = PH('and it has spread across every social media app since then'); const f = PH('as a like or a love or something of that kind');
    addL(a.t - 0.1, (t) => {
      featureTitle(t, 5, 'Likes and social approval', a.at('likes'), { maxW: V(780, 940), times: TW(a, 'Likes and social approval'), labAt: a.t });
      bigWidget(t, '2009', V(960, 60), V(150, 980), V(840, 960), c.t, 'Like button, Facebook', '2009', '9 February 2009', { vsize: V(200, 160) });
      // hearts: spread across apps
      const n = V(5, 5); for (let i = 0; i < n; i++) { const at = e.at('spread') + i * 0.18; if (t < at) continue; const s = MOTION.spring(t - at, 0.5, 2.6);
        const hx = V(1010 + i * 170, 140 + i * 200), hy = V(640, 1360); withT(hx, hy, s, 0, () => heart(0, 0, V(100, 90), i % 2 ? PD.red : PD.text)); }
      if (t > c.t && t < d.t) credit('There was a time when likes didn’t exist.', LY.lx, V(560, 700), V(760, 940), { size: 40 });
      if (t > f.t) credit('A like, a love, or something of that kind.', LY.lx, V(560, 700), V(760, 940), { size: 40 }); homeBar();
    }, { id: 'likes', pull: true, push: 0.012 });
    sTick(d.at('2009'), -3); sPop(e.at('spread'), -4); sPop(e.at('spread') + 0.54, -6);
  }
  /* ---- 50 a small burst of social approval ---- */
  {
    const a = PH('and it is also a design that is put in place to keep you coming back'); const b = PH('the like button gives you a small burst of social approval');
    const c = PH('i make a post'); const d = PH('someone sees what i posted'); const e = PH('and they like it');
    addL(a.t - 0.12, (t) => {
      if (t < b.t - 0.1) headline(t, 'It is also put in place to keep you *coming back.*', { times: TW(a, 'It is also put in place to keep you coming back.'), ev: [a.at('coming')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      else headline(t, 'The like button gives you a small burst of *social approval.*', { times: TW(b, 'The like button gives you a small burst of social approval.'), ev: [b.at('social')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      const x = V(960, 60), y = V(140, 760), w = V(840, 960), h = V(800, 680);
      card(t, 'post', x, y, w, h, c.at('post') - 0.1, (yy) => {
        circle(x + 80, yy + 80, 40, PD.tiles[3]); _txt('GO', x + 80, yy + 93, FT(600, 32), PD.text, 'center'); _txt('you', x + 140, yy + 92, FT(600, 40), PD.text);
        fillRR(x + 40, yy + 150, w - 80, h - 330, 24, PD.tiles[2]); lab('Your post', x + 70, yy + 210, { col: '#A7A9AF' });
        const seen = t > d.at('sees'); _txt(seen ? 'Seen by 1' : 'Posted just now', x + 40, yy + h - 110, FT(500, 36), PD.muted);
        const liked = t > e.at('like'); const s = liked ? MOTION.spring(t - e.at('like'), 0.45, 2.8) : 1;
        withT(x + w - 110, yy + h - 115, s, 0, () => heart(0, 0, 90, liked ? PD.red : PD.muted, liked));
        if (liked) _txt('1', x + w - 190, yy + h - 102, FT(600, 44), PD.text, 'right');
      });
      if (t > c.at('post') - 0.1) illus(V(960, 70), 1010); homeBar();
    }, { id: 'approval', push: 0.012 });
    sShut(c.at('post') - 0.1, -4); sTick(d.at('sees'), -4); sPop(e.at('like'), -1);
  }
  /* ---- 51 how many likes? a counter that never shows ---- */
  {
    const a = PH('when i make that post again this goes back to the idea of unpredictable rewards'); const b = PH("when i make a post and i drop my phone i don't know how many likes i will get");
    const c = PH("and i don't know how many likes i've already gotten"); const d = PH("so again it's an unpredictable reward that i am looking forward to and it keeps me coming back");
    addL(a.t - 0.12, (t) => {
      headline(t, 'I don’t know how many likes I will *get.*', { times: TW(b, 'I don’t know how many likes I will get.'), ev: [b.at('get')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t < b.t) headline(t, 'Again: an *unpredictable reward.*', { times: TW(a, 'Again: an unpredictable reward.'), ev: [a.at('unpredictable')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t > d.t - 0.1) headline(t, 'An unpredictable reward that keeps me *coming back.*', { times: TW(d, 'an unpredictable reward that keeps me coming back.'), ev: [d.at('coming')], y: V(560, 700), size: V(48, 44), maxW: V(760, 940), mode: 'words' });
      const x = V(960, 60), y = V(250, 840), w = V(840, 960);
      card(t, 'counter', x, y, w, 420, a.t, (yy) => {
        const hb = [d.at('looking'), d.at('coming')].reduce((m, q) => m * (1 + 0.14 * Math.sin(Math.PI * clamp((t - q) / 0.35))), 1); withT(x + 150, yy + 210, hb, 0, () => heart(0, 0, 150, PD.red));
        // the number keeps rolling and never lands (the point): blurred digits, then a "?" on "already gotten"
        const q = t > c.at('gotten'); const k = Math.floor(t * 12);
        if (!q) withBlur(5, () => _txt(String((k * 37) % 97 + 1), x + 280, yy + 260, FT(300, 170), PD.text));
        else _txt('?', x + 280, yy + 260, FT(300, 170), PD.text);
        lab('Likes', x + 290, yy + 340);
      }); homeBar();
    }, { id: 'howmany', push: 0.012 });
    sMark(a.at('unpredictable'), -4); sfx('tape', c.at('gotten'), -8);
  }
  /* ---- 52 you keep going back to check: the lock screen, three pick-ups ---- */
  {
    const a = PH('have you ever made a post on social media and you keep going back to check it'); const b = PH('to see how many likes or reaction it has gotten');
    const c = PH("that's intentional design"); const d = PH('in a way you keep coming back');
    const picks = [[a.at('going'), '2:07', '2:09'], [a.at('check'), '2:09', '2:14'], [b.at('likes'), '2:14', '2:22']];
    addL(a.t - 0.12, (t) => {
      let from = '2:07', to = '2:07', at = null; picks.forEach(([p, f, tt]) => { if (t >= p) { from = f; to = tt; at = p; } });
      // each pick-up: the screen wakes (a quick dim -> bright)
      const wake = at == null ? 1 : 0.55 + 0.45 * MOTION.ease(t, at, 0.3, 'outQuint');
      withA(wake, () => { lockClock(t, V(110, CX), V(520, 690), V(330, 360), from, to, at, { align: V('left', 'center') }); txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center')); });
      bannerStack(t, [B(a, 'Have you ever made a post and kept going back to *check it?*', ['check']), B(c, 'That’s *intentional design.*', ['intentional'])], { x: LY.bx, y: V(160, 900), w: LY.bw });
      homeBar();
    }, { id: 'check', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    picks.forEach(([p], i) => sClock(p, i ? -6 : -4)); sNotify(c.t - 0.06, -4);
  }
  /* ---- 53 the brain-drain claim (contested) ---- */
  {
    const a = PH("there's a whole lot of research and a lot of claims about phone and our attention and distraction");
    const b = PH("i was reading one study that even says that having your phone on your desk even if it's switched off it makes you worse at thinking");
    const c = PH('they call it the brain drain or something'); const d = PH("so it's a very interesting topic that just attracts a lot of claims"); const PH_AFF = PH('especially because it affects a lot of people');
    addL(a.t - 0.12, (t) => {
      headline(t, 'A phone on your desk, even switched off, makes you *worse at thinking?*', { times: TW(b, 'A phone on your desk, even switched off, makes you worse at thinking?'), ev: [b.at('worse')], maxW: V(820, 940), y: V(200, SAFE.contentTop + 10), size: V(70, 64) });
      if (t < b.t) headline(t, 'A lot of research. A lot of *claims.*', { times: TW(a, 'A lot of research. A lot of claims.'), ev: [a.at('claims')], maxW: V(820, 940), y: V(200, SAFE.contentTop + 10), size: V(70, 64) });
      // the desk: a phone face up, switched off (illustration)
      const dx = V(1020, 140), dy = V(560, 1000);
      card(t, 'desk', V(960, 60), V(170, 760), V(840, 960), V(700, 640), b.at('desk') - 0.15, (yy) => {
        rect(V(1000, 100), yy + V(480, 430), V(760, 880), 8, PD.line);
        fillRR(V(1240, 380), yy + V(150, 120), V(250, 300), V(330, 310), 36, '#26292F'); fillRR(V(1252, 392), yy + V(162, 132), V(226, 276), V(306, 286), 30, '#050506');
        if (t > b.at('switched')) lab('Switched off', V(1250, 390), yy + V(560, 520));
      });
      if (t > c.at('brain') && t < d.t) { const q = MOTION.ease(t, c.at('brain'), 0.35, 'outExpo'); withA(q, () => { fillRR(V(120, 70), V(620, 1250), V(820, 940), 120, 24, PD.card);
        txt('The “brain drain” claim', V(160, 110), V(676, 1306), FT(600, 44), PD.text); lab('Contested · later studies disagree', V(160, 110), V(720, 1350), { col: PD.red }); }); }
      if (t > d.t) bannerStack(t, [B(d, 'A very interesting topic that just attracts a lot of _claims._', ['claims']), B(PH_AFF, 'Especially because it affects *a lot of people.*', [PH_AFF.at('people')])], { x: V(120, 60), y: V(600, 1100), w: V(780, 960), keep: 1 });
      else credit('Ward and others, 2017. Repeat studies (2022) did not find the effect.', V(120, 70), V(820, 1420), V(760, 940)); homeBar();
    }, { id: 'braindrain', push: 0.012 });
    sMark(b.at('worse'), -3); sfx('error', c.at('brain'), -8);
  }
  /* ---- 54 the EU, February 2026: TikTok (the real press release lands as a notification) ---- */
  {
    const a = PH('i was also reading that in february 2026 the european commission made a preliminary finding that');
    const b = PH("tiktok's design breaches the eu's digital services act");
    addL(a.t - 0.12, (t) => {
      headline(t, 'February 2026: a *preliminary* finding against TikTok’s design.', { times: TW(a, 'February 2026: a preliminary').concat(TW(b, 'finding against TikTok’s design.')), ev: [a.at('preliminary')], maxW: V(700, 940), y: V(200, SAFE.contentTop + 10), size: V(68, 62) });
      const tt = (k) => euBox(EU_TT, k);
      sheet(t, { img: 'eu_tiktok', sx: 40, sy: 520, sw: 2480, sh: 1040, x: V(880, 60), y: V(150, 820), w: V(920, 960), at: a.at('european') - 0.15,
        head: ['European Commission', '6 Feb 2026'], foot: 'Screenshot · ec.europa.eu · 13 Oct 2026',
        hl: [[...tt('preliminarily'), a.at('preliminary')], [...tt('Digital Services Act'), b.at('digital')], [...tt('addictive design'), b.at('design')]], gkey: 'eu tiktok' });
      homeBar();
    }, { id: 'eu-tiktok', pull: true, push: 0.01 });
    sNotify(a.at('european') - 0.15, -2); sShut(a.at('european') + 0.1, -5); sMark(a.at('preliminary'), -3); sMark(b.at('digital'), -5);
  }
  /* ---- 55 the EU deserves a global award ---- */
  {
    const a = PH('now when it comes to regulation i think the eu deserves like a global award');
    const b = PH('some of the regulations sometimes can feel overbearing but some of them are actually very helpful');
    addL(a.t - 0.12, (t) => {
      headline(t, 'The EU deserves, like, a global *award.*', { times: TW(a, 'The EU deserves, like, a global award.'), ev: [a.at('award')], maxW: V(1700, 960), size: V(150, 110), y: V(200, SAFE.contentTop + 120), mode: 'words' });
      bannerStack(t, [B(b, 'Some regulations can feel overbearing, but some are actually *very helpful.*', [b.at('helpful')])], { x: V(120, 60), y: V(660, 1000), w: V(1100, 960) });
      homeBar();
    }, { id: 'award', push: 0.02 });
    sCash(a.at('award'), -6); sNotify(b.t - 0.06, -4);
  }
  /* ---- 56 what the EU named: the four features, highlighted in the release on her words ---- */
  {
    const a = PH('in this finding the eu named infinite scroll autoplay'); const b = PH("push notifications tiktok's highly personalised recommendation");
    const c = PH('those are the list of things that they named in the findings');
    addL(a.t - 0.12, (t) => {
      const tt = (k) => euBox(EU_TT, k);
      const items = [['Infinite scroll', a.at('infinite')], ['Autoplay', a.at('autoplay')], ['Push notifications', b.at('push')], ['Personalised recommender', b.at('highly')]];
      listCard(t, 'named', V(70, 60), V(170, SAFE.contentTop + 10), V(600, 960), items.map(x => x[0]), items.map(x => x[1]), { cur: true, size: V(38, 40), rh: V(96, 84) });
      sheet(t, { img: 'eu_tiktok', sx: 40, sy: 1050, sw: 1560, sh: 380, x: V(690, 60), y: V(220, 860), w: V(1160, 960), at: a.t - 0.1,
        head: ['European Commission', '6 Feb 2026'], foot: 'The press release, paragraph 2',
        hl: [[...tt('infinite scroll'), a.at('infinite')], [...tt('autoplay'), a.at('autoplay')], [...tt('push notifications'), b.at('push')], [...tt('highly personalised'), b.at('highly')], [...tt('highly personalised 2'), b.at('highly') + 0.12]], gkey: 'eu named' });
      homeBar();
    }, { id: 'eu-named', push: 0.01 });
    sMark(a.at('infinite'), -2); sMark(a.at('autoplay'), -4); sMark(b.at('push'), -4); sMark(b.at('highly'), -4);
  }
  /* ---- 57 July: Meta, Instagram and Facebook ---- */
  {
    const a = PH('and also in july they made the same kind of preliminary findings against meta'); const b = PH('for the addictive design of instagram and facebook');
    addL(a.t - 0.12, (t) => {
      headline(t, 'July 2026: the same kind of finding against *Meta.*', { times: TW(a, 'July 2026: the same kind of finding against Meta.'), ev: [a.at('meta')], maxW: V(700, 940), y: V(200, SAFE.contentTop + 10), size: V(68, 62) });
      if (t > b.t) credit('For the addictive design of Instagram and Facebook.', LY.lx, V(560, 640), V(700, 940), { size: 40, col: PD.text });
      const mm = (k) => euBox(EU_META, k);
      sheet(t, { img: 'eu_meta', sx: 40, sy: 520, sw: 2480, sh: 1040, x: V(880, 60), y: V(150, 820), w: V(920, 960), at: a.at('july') - 0.1,
        head: ['European Commission', '10 Jul 2026'], foot: 'Screenshot · ec.europa.eu · 13 Oct 2026',
        hl: [[...mm('preliminarily'), a.at('preliminary')], [...mm('addictive design'), b.at('addictive')], [...mm('infinite scroll'), b.at('instagram')], [...mm('autoplay'), b.at('instagram') + 0.25], [...mm('push notifications'), b.at('facebook')]], gkey: 'eu meta' });
      homeBar();
    }, { id: 'eu-meta', push: 0.01 });
    sNotify(a.at('july') - 0.1, -2); sMark(b.at('addictive'), -3);
  }
  /* ---- 58 a legal problem (preliminary, not final) ---- */
  {
    const a = PH('i think this is one of the first time that a regulator has formally said that these features like infinite scroll autoplay and stuff like that can be a legal problem');
    const b = PH("i mean it's not like these are final decisions yet");
    addL(a.t - 0.12, (t) => {
      headline(t, 'A regulator has formally said these features can be a *legal problem.*', { times: TW(a, 'a regulator has formally said that these features can be a legal problem.'), ev: [a.at('legal')], maxW: V(1700, 960), size: V(130, 96), y: V(170, SAFE.contentTop + 60), mode: 'words' });
      lab('One of the first times', V(120, 70), V(130, SAFE.contentTop + 30));
      if (t > b.t) { const q = MOTION.ease(t, b.t, 0.35, 'outExpo'); withA(q, () => { fillRR(V(120, 70), V(760, 1250), V(980, 940), 110, 24, PD.card); txt('Preliminary findings, not final decisions.', V(160, 110), V(830, 1320), FT(600, V(44, 40)), PD.text); }); }
      homeBar();
    }, { id: 'legal', push: 0.02 });
    sHit(a.at('legal'), -5); sTick(b.t, -5);
  }
  /* ---- 59 I live in the EU ---- */
  {
    const a = PH("but i live in the eu and i'm very curious to see how this all goes"); const b = PH('the fact that regulators are starting to see these designs as a problem is something that i really want to see the end of');
    addL(a.t - 0.12, (t) => {
      bigWidget(t, 'where', V(120, 70), V(170, SAFE.contentTop + 10), V(620, 940), a.at('live') - 0.05, 'Where I live', 'EU', 'Estonia', { vsize: V(230, 200) });
      bannerStack(t, [B(a, 'I’m very curious to see how this *all goes.*', [a.at('goes')]), B(b, 'Regulators are starting to see these designs as a *problem.*', [b.at('problem')])], { x: LY.bx, y: V(170, 900), w: LY.bw });
      homeBar();
    }, { id: 'curious', push: 0.012 });
    sPop(a.at('live'), -4); sNotify(b.t - 0.06, -4);
  }
}

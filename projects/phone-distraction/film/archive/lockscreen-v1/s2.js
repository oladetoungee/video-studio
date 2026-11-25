/* phone-distraction · part 2 (3:36-7:20): the unpredictable reward, pull-to-refresh (with the real patent), infinite scroll,
 * stopping cues, autoplay and defaults. */
'use strict';
/** a feature chapter title: small label + the feature's name, landing on her word */
function featureTitle(t, n, name, at, o = {}) {
  const la = o.labAt == null ? at - 0.05 : o.labAt; if (t < la) return;
  withA(clamp((t - la) / 0.25), () => lab('Feature ' + String(n).padStart(2, '0'), o.x == null ? LY.lx : o.x, o.y == null ? V(200, SAFE.contentTop + 40) : o.y));
  if (t < at - 0.05) return;
  rich(t, name, { x: o.x == null ? LY.lx : o.x, y: (o.y == null ? V(200, SAFE.contentTop + 40) : o.y) + 30, size: o.size || V(112, 104), weight: 600, lh: 0.98, maxW: o.maxW || V(800, 940), times: o.times || [at], col: PD.text, mode: o.mode });
}
function buildS2() {
  /* ---- 22 the unpredictable reward ---- */
  {
    const a = PH('now the most powerful part of all of this is the unpredictable reward at the end of it');
    addL(a.t - 0.1, (t) => {
      lab('The most powerful part', V(120, 70), V(250, SAFE.contentTop + 160));
      headline(t, 'The *unpredictable* reward.', { times: TW(a, 'the unpredictable reward.'), ev: [a.at('unpredictable')], maxW: V(1700, 960), size: V(170, 130), y: V(300, SAFE.contentTop + 220), mode: 'words' });
      homeBar();
    }, { id: 'reward', pull: true, push: 0.03 });
    sMark(a.at('unpredictable'));
  }
  /* ---- 23 the bedrock of gambling: three reels of phone rewards stop on nothing / small / big ---- */
  {
    const a = PH('it is the bedrock of so many things'); const b = PH('it is also the bedrock of gambling'); const c = PH("for example you don't know what you will get out of it");
    const d = PH('sometimes nothing'); const e = PH('sometimes a small thing'); const f = PH('sometimes a big thing');
    const OUT = ['No new posts', '1 like', '99+ messages', '2 comments', 'Nothing new', '5 new posts', '1 message', '30 likes'];
    const reels = [[d.at('nothing'), 'No new posts', '0'], [e.at('small'), '1 like', '1'], [f.at('big'), '99+ messages', '99+']];
    addL(a.t - 0.12, (t) => {
      headline(t, 'It is also the bedrock of *gambling.*', { times: TW(b, 'It is also the bedrock of gambling.'), ev: [b.at('gambling')], maxW: V(1500, 940), y: V(150, SAFE.contentTop + 10) });
      const spinFrom = c.t;
      reels.forEach(([stop, label, badgeTxt], i) => {
        const x = V(120 + i * 570, 70), y = V(400, 640 + i * 270), w = V(540, 940), h = V(330, 240);
        card(t, 'reel ' + i, x, y, w, h, c.t - 0.2 + i * 0.08, (yy) => {
          ctx.save(); rr(x + 20, yy + 20, w - 40, h - 40, 24); ctx.clip();
          const rowH = h - 40; const land = MOTION.ease(t, stop, 0.55, 'outQuint');
          // spinning phase: a fast scroll through outcomes; it lands on its own outcome on her word
          const spin = t < stop ? (t - spinFrom) * 7.5 : 0; const k = Math.floor(spin);
          if (t < stop) {
            for (let j = -1; j <= 1; j++) { const yy2 = yy + 20 + (j + (spin % 1)) * rowH; withBlur(10, () => _txt(OUT[(k + j + 8 * 4 + i * 3) % OUT.length], x + w / 2, yy2 + rowH * 0.58, FT(600, V(52, 56)), PD.muted, 'center')); }
          } else {
            const off = (1 - land) * -rowH * 0.6;
            _txt(label, x + w / 2, yy + 20 + rowH * 0.62 + off, FT(600, V(60, 60)), i === 2 ? PD.red : PD.text, 'center');
          }
          ctx.restore();
        });
      });
    }, { id: 'gamble', push: 0.012 });
    sMark(b.at('gambling'), -3); sfx('tick', c.t + 0.2, -6); sPop(d.at('nothing'), -4); sPop(e.at('small'), -3); sHit(f.at('big'), -5);
  }
  /* ---- 24 psychologists have known this ---- */
  {
    const a = PH('the same principle kind of applies to social media'); const b = PH('and psychologists have known this for a long time');
    const c = PH('that reward that you cannot predict tends to make you come back strongly even more strongly than reward that you can predict');
    addL(a.t - 0.12, (t) => {
      headline(t, 'The same principle applies to *social media.*', { times: TW(a, 'The same principle applies to social media.'), maxW: V(1500, 940), size: V(72, 66), y: V(140, SAFE.contentTop + 10) });
      quoteCard(t, 'psych', V(120, 60), V(380, 700), V(1680, 960), c.t - 0.15, 'A reward you *cannot predict* brings you back *more strongly* than a reward you can.',
        'A long-known finding in psychology: “variable” rewards, as in slot machines (Ferster and Skinner, 1957)', { size: V(66, 60), ev: [c.at('cannot'), c.at('strongly', 2)] });
    }, { id: 'psych', push: 0.015 });
    sShut(c.t - 0.15, -4); sMark(c.at('cannot'), -2);
  }
  /* ---- 25 predictable vs unpredictable ---- */
  {
    const a = PH('if i know that if i do this thing i will get this thing'); const b = PH("i probably won't come back to it as much as i would");
    const c = PH('if there was an unpredictable reward waiting for me');
    addL(a.t - 0.12, (t) => {
      const rows = [['If I do this, I get this.', 'Predictable', a.t, 0.32], ['Something might be waiting.', 'Unpredictable', c.t, 0.92]];
      rows.forEach(([l, k, at, v], i) => {
        const x = V(120, 60), y = V(170 + i * 400, SAFE.contentTop + 40 + i * 520), w = V(1680, 960), h = V(340, 440);
        card(t, 'pred ' + i, x, y, w, h, at - 0.1, (yy) => {
          lab(k, x + 40, yy + 66); txt(l, x + 40, yy + V(160, 170), FT(600, V(72, 64)), PD.text, 'left', 'alphabetic', -1.5);
          lab('How often you come back', x + 40, yy + V(240, 290), { size: 34 });
          bar(x + 40, yy + V(268, 320), w - 80, 30, v * MOTION.ease(t, i ? c.at('reward') : b.at('come'), 1.2, 'outQuint'), i ? PD.red : PD.muted);
        });
      });
    }, { id: 'predict', push: 0.012 });
    sTick(b.at('come'), -4); sPop(c.at('reward'), -3);
  }
  /* ---- 26 this is exactly how your phone works: four "maybe" notifications ---- */
  {
    const a = PH('and this is exactly how your phone works'); const b = PH("you don't know if there is a new message"); const c = PH('a new like on your video');
    const d = PH('a new video for you to see'); const e = PH('a new gist'); const f = PH("and that's not knowing it's exactly why you keep picking up your phone to check");
    addL(a.t - 0.12, (t) => {
      headline(t, 'That not knowing is exactly why you keep *picking up your phone.*', { times: TW(f, 'That not knowing is exactly why you keep picking up your phone.'), ev: [f.at('picking')], maxW: V(720, 940), y: V(200, SAFE.contentTop + 10), size: V(76, 66) });
      if (t < f.t - 0.1) headline(t, 'This is exactly how your phone works.', { times: TW(a, 'This is exactly how your phone works.'), maxW: V(720, 940), y: V(200, SAFE.contentTop + 10), size: V(76, 66) });
      bannerStack(t, [B(b, 'A new message?', [], { head: 'Chat' }), B(c, 'A new like on your video?', [], { head: 'Clips' }), B(d, 'A new video for you?', [], { head: 'Video' }), B(e, 'A new gist?', [], { head: 'Chat' })],
        { x: LY.bx, y: V(160, 720), w: LY.bw, keep: V(4, 3) }); homeBar();
    }, { id: 'phoneworks', push: 0.015 });
    sNotify(b.at('message') - 0.1, -3); sNotify(d.at('video') - 0.1, -4); sMark(f.at('picking'), -3);
  }
  /* ---- 27 so many designs: the home screen fills with badges ---- */
  {
    const a = PH("and there's so many designs that are now put in place to make sure that you're constantly on your phone and distracted by it");
    addL(a.t - 0.12, (t) => {
      headline(t, 'So many designs are put in place to keep you *on your phone.*', { times: TW(a, 'So many designs are put in place to keep you on your phone.'), ev: [a.at('constantly')], maxW: V(720, 940), y: V(200, SAFE.contentTop + 10) });
      const b0 = a.at('designs'); const vals = { 0: '12', 1: '3', 2: '99+', 3: '7', 5: '1', 6: '24', 7: '4', 9: '5', 10: '2', 11: '9' };
      const badges = {}; Object.entries(vals).forEach(([i, v], k) => { badges[i] = [v, b0 + 0.3 + k * 0.32]; });
      homeGrid(t, { x: V(1010, 120), y: V(150, 760), cols: 4, size: V(150, 150), gx: V(64, 90), gy: V(110, 100), badges, n: V(12, 12) }); homeBar();
    }, { id: 'designs', push: 0.015 });
    for (let k = 0; k < 10; k += 3) sPop(a.at('designs') + 0.3 + k * 0.32, -5);
  }
  /* ---- 28 FEATURE 01 pull-to-refresh: the gesture, shown ---- */
  {
    const a = PH('the first of many is the pulltorefresh'); const b = PH('you know that gesture where you drag your feed down and you let it go to see if something new has appeared');
    const c = PH("that's the pulltorefresh");
    addL(a.t - 0.12, (t, lt) => {
      featureTitle(t, 1, 'Pull-to-refresh', a.at('pulltorefresh'));
      const px = V(1150, 300), py = V(80, 760), pw = V(460, 480), ph = V(920, 680);
      const d0 = b.at('drag'), rel = b.at('go');
      const D = 170, pull = t < rel ? D * MOTION.ease(t, d0, 0.7, 'outQuint') : D * (1 - MOTION.spring(t - rel - 0.45, 0.67, 2.0));
      const fresh = t > rel + 0.45;
      phone('ptr phone', px, py, pw, ph, (sx, sy, sw, sh) => {
        if (pull > 1) { rect(sx, sy, sw, pull, PD.gap); spinner(sx + sw / 2, sy + pull / 2, 34, clamp(pull / D), t > rel ? (t - rel) * 1.6 : 0); }
        ctx.save(); ctx.translate(0, pull); feed(sx, sy, sw, sh, fresh ? 0 : 520, { ad: () => false }); ctx.restore();
        if (fresh) { const q = MOTION.ease(t, rel + 0.5, 0.35, 'outExpo'); withA(q, () => { fillRR(sx + sw / 2 - 120, sy + 30 + (1 - q) * -20, 240, 64, 32, PD.red); _txt('New posts', sx + sw / 2, sy + 73 + (1 - q) * -20, FT(600, 32), '#FFFFFF', 'center'); }); }
      });
      finger(t, [[d0 - 0.25, px + pw / 2, py + ph * 0.3], [d0, px + pw / 2, py + ph * 0.3], [d0 + 0.7, px + pw / 2, py + ph * 0.3 + D], [rel, px + pw / 2, py + ph * 0.3 + D]]);
      if (t > c.t - 0.1) credit('Drag your feed down, let go, and see if something new has appeared.', LY.lx, V(560, 1500), V(760, 940));
      illus(V(1150, 70), V(1040, SAFE.contentTop - 30)); homeBar();
    }, { id: 'ptr', pull: true, push: 0.01 });
    sfx('tick', b.at('drag'), -2); sfx('refresh', b.at('go') + 0.5, -2);
  }
  /* ---- 29 the real patent: FIG. 8, Loren Brichter, Twitter; then "Pull-to-refresh is addictive." ---- */
  {
    const a = PH('that feature was developed by a developer called loren'); const b = PH('for a twitter app he built called tweetie around 2008');
    const c = PH('and he himself later said that this thing is really addictive'); const d = PH("so it's an addictive feature an addictive gesture");
    const FW = 2101, FH = 3033;
    addL(a.t - 0.2, (t) => {
      const sw_ = V(860, 900), sx_ = V(980, 90), sy_ = V(30, SAFE.contentTop - 20);
      sheet(t, { img: 'patent', sx: 0, sw: FW, sh: FH * V(0.5, 0.42), sy: FH * V(0.12, 0.14), x: sx_, y: sy_, w: sw_, at: a.t - 0.15, plot: true,
        head: ['US Patent 8,448,084', 'FIG. 8'], foot: 'Google Patents · captured 13 Oct 2026',
        zoom: { at: c.at('said') - 0.2, d: 0.9, k: 1.7, cx: FW * 0.455, cy: FH * 0.27 },
        hl: [[FW * 0.30, FH * 0.245, FW * 0.31, FH * 0.05, c.at('addictive'), 'ring']], gkey: 'patent' });
      const x = LY.lx, w = V(820, 940);
      contact(t, 'brichter', x, V(150, 1080), w, a.at('loren') - 0.1, 'LB', 'Loren Brichter', ['Inventor, “User interface mechanics”', 'Assignee: Twitter, Inc. · granted 2013'], { lineAt: [a.at('loren') + 0.3, b.at('twitter')], h: 260 });
      if (t > b.at('tweetie') - 0.1 && t < c.at('said') + 0.2) withA(clamp((t - b.at('tweetie') + 0.1) / 0.25) * (1 - clamp((t - c.at('said')) / 0.2)), () => {
        txtW('Built for Tweetie, a Twitter app, in 2009.', x, V(500, 1420), FT(600, V(48, 44)), PD.text, V(780, 920), 56); credit('The Guardian, 2017', x, V(620, 1530), w); });
      if (t > c.at('said') - 0.1) quoteCard(t, 'brichter quote', x, V(470, 1080), w, c.at('said') - 0.1, '“Pull-to-refresh is *addictive.*”', 'Loren Brichter, quoted in The Guardian, 2017', { size: V(80, 64), ev: [c.at('addictive')] });
      if (t > d.t) credit('An addictive feature. An addictive gesture.', x, V(940, 1480), w);
    }, { id: 'patent', push: 0 });
    sShut(a.t - 0.15); sPop(a.at('loren'), -4); sTick(b.at('tweetie'), -4); sfx('swipe', c.at('said') - 0.2 + 0.45, -4); sMark(c.at('addictive'), -1);
  }
  /* ---- 30 you keep pulling down: three pulls, three different results ---- */
  {
    const a = PH('and it has this unpredictable reward again at the end of it'); const b = PH("when you pull down your feed to refresh you don't know what's coming");
    const c = PH('but you know something new will pop up right'); const d = PH('so you keep pulling down');
    const pulls = [[b.at('pull'), 'No new posts'], [c.at('something'), '1 new post'], [d.at('pulling'), '12 new posts']];
    addL(a.t - 0.12, (t) => {
      headline(t, 'You don’t know what’s coming, so you keep *pulling down.*', { times: TW(b, 'You don’t know what’s coming,').concat(TW(d, 'so you keep pulling down.')), ev: [d.at('pulling')], maxW: V(760, 940), y: V(220, SAFE.contentTop + 10) });
      const px = V(1150, 300), py = V(80, 760), pw = V(460, 480), ph = V(920, 680); const D = 150;
      let pull = 0, res = null, rt = 0;
      pulls.forEach(([p0, r]) => { if (t >= p0) { const rel = p0 + 0.55; pull = t < rel ? D * MOTION.ease(t, p0, 0.45, 'outQuint') : D * (1 - MOTION.spring(t - rel, 0.67, 2.0)); if (t > rel + 0.2) { res = r; rt = rel + 0.2; } } });
      phone('pull phone', px, py, pw, ph, (sx, sy, sw, sh) => {
        if (pull > 1) { rect(sx, sy, sw, pull, PD.gap); spinner(sx + sw / 2, sy + pull / 2, 30, clamp(pull / D), t * 1.6); }
        ctx.save(); ctx.translate(0, pull); feed(sx, sy, sw, sh, 300); ctx.restore();
        if (res) { const q = MOTION.ease(t, rt, 0.35, 'outExpo'); withA(q, () => { const w_ = tw(res, FT(600, 32)) + 60; fillRR(sx + sw / 2 - w_ / 2, sy + 30, w_, 64, 32, res === 'No new posts' ? '#3A3D45' : PD.red); _txt(res, sx + sw / 2, sy + 73, FT(600, 32), '#FFFFFF', 'center'); }); }
      });
      illus(V(1150, 70), V(1040, SAFE.contentTop - 30)); homeBar();
    }, { id: 'pulls', push: 0.01 });
    pulls.forEach(([p0], i) => { sfx('tick', p0, -4); if (i) sfx('refresh', p0 + 0.75, -4); });
  }
  /* ---- 31 FEATURE 02 infinite scroll ---- */
  {
    const a = PH('another intentional design that keeps you stuck on your phone is the infinite scroll');
    const b = PH("if you don't know what the infinite scroll is it's just the ability to keep scrolling infinitely");
    addL(a.t - 0.1, (t, lt) => {
      featureTitle(t, 2, 'Infinite scroll', a.at('infinite'));
      const px = V(1150, 300), py = V(80, 760), pw = V(460, 480), ph = V(920, 680);
      const off = 120 * lt + 30 * lt * lt;
      phone('scroll phone', px, py, pw, ph, (sx, sy, sw, sh) => {
        feed(sx, sy, sw, sh, off);
        const tot = sh + off * 1.4 + 2000; const th = Math.max(26, sh * sh / tot); const ty = sy + 20 + (sh - 40 - th) * (off / (off + 1500));
        fillRR(sx + sw - 14, ty, 6, th, 3, PD.muted);
      });
      if (t > b.at('infinitely')) credit('The ability to keep scrolling, infinitely.', LY.lx, V(560, 1500), V(760, 940));
      illus(V(1150, 70), V(1040, SAFE.contentTop - 30)); homeBar();
    }, { id: 'scroll', pull: true, push: 0.01 });
  }
  /* ---- 32 websites used to have pages: Next page was a stopping point ---- */
  {
    const a = PH('before this feature or this design was made websites used to have pages'); const b = PH('when you get to the bottom and you wanted to see more content you would have to click next page');
    const c = PH('that click was a stopping point');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Websites used to have *pages.*', { times: TW(a, 'Websites used to have pages.'), maxW: V(720, 940), y: V(200, SAFE.contentTop + 10) });
      headline(t, 'That click was a _stopping_ point.', { times: TW(c, 'That click was a stopping point.'), ev: [c.at('stopping')], maxW: V(720, 940), y: V(470, 620), size: V(64, 60) });
      const x = V(960, 60), y = V(120, 860), w = V(840, 960), h = V(830, 580);
      card(t, 'web', x, y, w, h, a.at('websites') - 0.1, (yy) => {
        fillRR(x + 30, yy + 30, w - 60, 60, 30, '#2C2F36'); _txt('example.com/page/1', x + 70, yy + 72, FT(500, 32), PD.muted);
        const rows = V(6, 4); for (let i = 0; i < rows; i++) { const ry = yy + 130 + i * V(90, 80); fillRR(x + 40, ry, 90, 64, 12, PD.tiles[i % 4]); fillRR(x + 160, ry + 8, w * 0.5, 18, 9, '#3A3D45'); fillRR(x + 160, ry + 38, w * 0.3, 16, 8, '#2C2F36'); }
        const by = yy + h - V(130, 120); const bx = x + w / 2 - 180;
        const press = b.at('click'); const k = t > press && t < press + 0.25 ? 0.95 : 1;
        withT(bx + 180, by + 40, k, 0, () => { fillRR(-180, -40, 360, 80, 40, t > press ? PD.red : '#2C2F36'); _txt('Next page  →', 0, 12, FT(600, 36), PD.text, 'center'); });
        _txt('1   2   3   …   10', x + w / 2, by + 112, FT(500, 32), PD.muted, 'center');
      });
      tap(t, b.at('click'), V(1380, 540), V(120 + 830 - 90, 860 + 580 - 80));
      illus(V(960, 70), V(1010, SAFE.contentBottom + 2)); homeBar();
    }, { id: 'pages', push: 0.012 });
    sTick(b.at('click')); sMark(c.at('stopping'), -2);
  }
  /* ---- 33 do I actually want to keep going? ---- */
  {
    const a = PH("it's a very important moment where your brain has the chance to ask"); const b = PH('do i actually want to keep going');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Your brain has the chance to ask:', { times: TW(a, 'Your brain has the chance to ask:'), maxW: V(1600, 940), size: V(64, 60), y: V(260, SAFE.contentTop + 120), col: PD.muted });
      headline(t, 'Do I actually want to *keep going?*', { times: TW(b, 'Do I actually want to keep going?'), ev: [b.at('keep')], maxW: V(1700, 960), size: V(150, 116), y: V(380, SAFE.contentTop + 300), mode: 'words' });
      homeBar();
    }, { id: 'ask', push: 0.03 });
    sHit(b.at('keep'), -6);
  }
  /* ---- 34 designed in 2006, the moment removed ---- */
  {
    const a = PH('infinite scroll was designed in 2006'); const b = PH("and it's removed that moment"); const c = PH("so you don't have to click anything");
    const d = PH('the content just keeps loading'); const e = PH('and there is now no natural place or chance for you to stop'); const f = PH('there is no cue sent to your brain to stop');
    addL(a.t - 0.12, (t, lt) => {
      bigWidget(t, '2006', V(120, 70), V(150, SAFE.contentTop + 10), V(660, 600), a.at('2006') - 0.05, 'Infinite scroll', '2006', 'Aza Raskin, 2006', { vsize: V(200, 170) });
      headline(t, 'There is no natural place to *stop.*', { times: TW(e, 'There is no natural place to stop.'), ev: [e.at('stop')], maxW: V(720, 940), y: V(620, 1000), size: V(72, 64) });
      const px = V(1150, 690), py = V(80, 380), pw = V(460, 330), ph = V(920, 600);
      const s0 = b.at('removed'); const off = lt < s0 - a.t ? 0 : 160 * (lt - (s0 - a.t)) + 25 * Math.pow(lt - (s0 - a.t), 2);
      phone('loading phone', px, py, pw, ph, (sx, sy, sw, sh) => feed(sx, sy, sw, sh, off));
      if (PORTRAIT) {} else illus(V(1150, 70), V(1040, 1440));
    }, { id: 'removed', push: 0.012 });
    sTick(a.at('2006')); sfx('swipe', b.at('removed'), -6); sMark(e.at('stop'), -3);
  }
  /* ---- 35 load more ---- */
  {
    const a = PH("if there's a button to load more that button will send a cue to my brain like okay");
    const b = PH('do i want to load more or do i want to drop my freaking phone'); const c = PH('but that is no longer there');
    addL(a.t - 0.12, (t) => {
      headline(t, 'A “load more” button would send a *cue* to my brain.', { times: TW(a, 'A “load more” button would send a cue to my brain.'), ev: [a.at('cue')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      const x = V(960, 60), y = V(240, 860), w = V(840, 960);
      const gone = MOTION.ease(t, c.at('longer'), 0.4, 'inOutQuart');
      card(t, 'choice', x, y, w, 560, a.at('button') - 0.1, (yy) => {
        withA(1 - gone, () => {
          const b1 = t > b.at('load'), b2 = t > b.at('drop');
          fillRR(x + 40, yy + 60, w - 80, 120, 60, b1 ? PD.text : '#2C2F36'); _txt('Load more', x + w / 2, yy + 136, FT(600, 48), b1 ? PD.ink : PD.text, 'center');
          if (t > b.at('or')) { fillRR(x + 40, yy + 220, w - 80, 120, 60, b2 ? PD.red : '#2C2F36'); _txt('Drop my phone', x + w / 2, yy + 296, FT(600, 48), PD.text, 'center'); }
        });
        if (gone > 0) withA(gone, () => txtW('No button. No cue.', x + 40, yy + 260, FT(600, 72), PD.muted, w - 80, 80));
      });
      illus(V(960, 70), V(1010, SAFE.contentBottom + 2)); homeBar();
    }, { id: 'loadmore', push: 0.012 });
    sTick(b.at('load'), -3); sPop(b.at('drop'), -2); sErr(c.at('longer'), -6);
  }
  /* ---- 36 stopping cues: the chapter, the episode, the season ---- */
  {
    const a = PH('if you notice older forms of media had stopping cues'); const b = PH('for example a book has chapters'); const c = PH('i do this when i read book where i try to get to the end of one chapter');
    const d = PH('a tv show tv shows used to end'); const e = PH("and then you'd have to wait like for the next episode for like a week");
    const f = PH("i remember when i was a kid i would buy movies you'd buy season one"); const g = PH('or wait for season two');
    const h = PH('those are stopping cues but in the case of social apps that is taken away');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Older forms of media had *stopping cues.*', { times: TW(a, 'Older forms of media had stopping cues.'), ev: [a.at('stopping')], maxW: V(1600, 940), y: V(140, SAFE.contentTop + 10) });
      const away = h.at('taken');
      const tDrop = WAT('drop', c.t), tCue = WAT('cue', tDrop), tBack = WAT('back', f.t), tWait = WAT('wait', tBack);
      const cards = [['Book', t < c.at('end') ? 'Chapter 3 · page 41' : t < tDrop ? 'End of chapter 3' : 'End of chapter 3. Book down.', b.at('chapters')], ['TV show', t < e.at('week') ? 'Episode 1 has ended' : 'Next episode: next week', t < tCue ? tCue + 99 : d.at('show')], ['DVD box', t < f.at('one') ? 'Season 1' : t < tBack ? 'Season 1 ✓' : t < tWait ? 'Season 2: go back and buy it' : 'Season 2: buy it, or wait', f.at('season')]];
      if (t > tCue && t < d.at('show')) withA(clamp((t - tCue) / 0.25), () => lab('A stopping cue', V(160, 110), V(830, 900), { col: PD.red }));
      cards.forEach(([k, v, at], i) => {
        const x = V(120 + i * 570, 70), y = V(400, 600 + i * 270), w = V(540, 940), h_ = V(380, 240);
        const fl = MOTION.ease(t, away + i * 0.07, 0.5, 'inOutQuart');
        ctx.save(); ctx.translate(fl * V(-2300, -1400), fl * -60); ctx.rotate(-fl * 0.08);
        card(t, 'cue ' + k, x, y, w, h_, at - 0.1, (yy) => {
          lab(k, x + 40, yy + 66); txtW(v, x + 40, yy + V(170, 150), FT(600, V(60, 58)), PD.text, w - 80, V(66, 62));
          const ut = i === 0 ? c.at('end') : i === 1 ? e.at('week') : g.at('two'); const u = MOTION.ease(t, ut, 0.35, 'outExpo'); if (u > 0) rect(x + 40, yy + h_ - 52, (w - 80) * u, 10, PD.red);
          const st = i === 0 ? c.at('chapter') + 0.6 : i === 1 ? e.at('episode') : f.at('one'); if (t > st && t < ut) withA(clamp((t - st) / 0.25), () => fillRR(x + w - 120, yy + 36, 80, 40, 20, '#2C2F36'));
        });
        ctx.restore();
      });
      if (t > away + 0.6) headline(t, 'In social apps, that is *taken away.*', { times: [away + 0.6], mode: 'drop', ev: [away], maxW: V(1600, 940), y: V(620, 900), size: V(84, 76) });
    }, { id: 'cues', push: 0.01 });
    sfx('mark', c.at('end'), -4); sPop(e.at('next'), -4); sPop(f.at('season'), -4); sfx('swipe', h.at('taken'), -4);
  }
  /* ---- 37 PUNCH: your feed does not have a last page ---- */
  {
    const a = PH('your feed does not have a last page'); const b = PH("and it's intentionally designed that way so that you can keep scrolling forever if you can");
    addL(a.t - 0.08, (t) => {
      punch(t, 'Your feed does not have a *last page.*', { times: TW(a, 'Your feed does not have a last page.'), ev: [a.at('last')] });
      if (t > b.at('intentionally')) credit('It’s intentionally designed that way.', V(124, 74), V(800, 1240), V(1500, 900), { col: PD.onRed, size: 44 });
    }, { id: 'lastpage', ground: 'red', burst: () => [V(980, 540), V(540, 960)], push: 0.03 });
    sHit(a.at('last'), -3);
  }
  /* ---- 38 FEATURE 03 autoplay: the video ends, the next one starts ---- */
  {
    const a = PH('another design that keeps you stuck on your phone is the autoplay'); const b = PH("if you notice on youtube when a video ends you don't have to do anything");
    const c = PH('the next one starts playing on its own within a few seconds');
    addL(a.t - 0.1, (t) => {
      featureTitle(t, 3, 'Autoplay', a.at('autoplay'));
      const x = V(960, 60), y = V(170, 640), w = V(840, 960), vh = w * 9 / 16;
      card(t, 'player', x, y, w, vh + 200, a.at('autoplay') - 0.1, (yy) => {
        ctx.save(); rr(x + 20, yy + 20, w - 40, vh - 20, 20); ctx.clip();
        const ended = t > b.at('ends');
        rect(x + 20, yy + 20, w - 40, vh, ended ? '#14161A' : PD.tiles[1]);
        if (ended && t < c.at('playing')) {
          // the "up next" countdown (5 s squeezed to her words)
          const k = clamp((t - b.at('ends')) / (c.at('playing') - b.at('ends')));
          ctx.strokeStyle = '#3A3D45'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(x + w / 2, yy + vh / 2, 70, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = PD.text; ctx.beginPath(); ctx.arc(x + w / 2, yy + vh / 2, 70, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); ctx.stroke();
          _txt(String(5 - Math.floor(k * 5)), x + w / 2, yy + vh / 2 + 22, FT(600, 64), PD.text, 'center');
          _txt('Up next', x + w / 2, yy + vh / 2 - 110, FT(600, 36), PD.muted, 'center');
        }
        if (t >= c.at('playing')) rect(x + 20, yy + 20, w - 40, vh, PD.tiles[3]);
        ctx.restore();
        const prog_ = t < b.at('ends') ? 0.7 + 0.3 * clamp((t - a.t) / (b.at('ends') - a.t)) : t < c.at('playing') ? 1 : 0.04 * (t - c.at('playing'));
        bar(x + 40, yy + vh + 30, w - 80, 10, prog_, PD.red, '#3A3D45');
        txt(t < c.at('playing') ? 'Video 1' : 'Video 2', x + 40, yy + vh + 110, FT(600, 48), PD.text);
        lab(t < c.at('playing') ? 'Playing' : 'Started on its own', x + 40, yy + vh + 160, { col: t < c.at('playing') ? PD.lab : PD.red });
      });
      illus(V(960, 70), V(1010, SAFE.contentBottom + 2)); homeBar();
    }, { id: 'autoplay', pull: true, push: 0.01 });
    sClock(b.at('ends') + 0.6, -6); sPop(c.at('playing'), -3);
  }
  /* ---- 39 two decisions, one already made ---- */
  {
    const a = PH('when a video is coming to an end you have two decisions to make'); const b = PH('you can keep watching or you can decide to stop watching');
    const c = PH("the problem with autoplay or what autoplay introduces is that you don't have to decide to keep watching"); const d = PH('that decision has been made for you');
    addL(a.t - 0.12, (t) => {
      headline(t, 'That decision has been *made for you.*', { times: TW(d, 'That decision has been made for you.'), ev: [d.at('made')], maxW: V(720, 940), y: V(200, SAFE.contentTop + 10) });
      if (t < d.t - 0.1) headline(t, 'You have two decisions to make.', { times: TW(a, 'You have two decisions to make.'), maxW: V(720, 940), y: V(200, SAFE.contentTop + 10) });
      const x = V(960, 60), y = V(260, 860), w = V(840, 960);
      card(t, 'decide', x, y, w, 420, a.at('two') - 0.1, (yy) => {
        const sel = MOTION.ease(t, d.at('made'), 0.35, 'outExpo');
        { fillRR(x + 40, yy + 50, w - 80, 140, 70, '#2C2F36'); if (sel > 0) strokeRR(x + 40, yy + 50, w - 80, 140, 70, PD.red, 6 * sel); _txt('Keep watching', x + 100, yy + 140, FT(600, 52), PD.text);
          if (sel > 0) withA(sel, () => { circle(x + w - 120, yy + 120, 34, PD.red); _txt('✓', x + w - 120, yy + 136, FT(700, 44), '#FFFFFF', 'center'); }); }
        if (t > c.at('introduces') && t < d.at('made')) strokeRR(x + 40, yy + 50, w - 80, 140, 70, PD.red, 2);
        { fillRR(x + 40, yy + 230, w - 80, 140, 70, '#2C2F36'); _txt('Stop watching', x + 100, yy + 320, FT(600, 52), sel > 0.5 ? PD.muted : PD.text); }
      }); homeBar();
    }, { id: 'decide', push: 0.012 });
    sTick(b.at('keep'), -4); sTick(b.at('stop'), -5); sHit(d.at('made'), -6);
  }
  /* ---- 40 effort ---- */
  {
    const a = PH('it is where you want to stop watching that you now have to put in the efforts to stop watching');
    const b = PH('so deciding to stop takes efforts but deciding to continue does not take any effort on the end of the user at all');
    const c = PH('so you can guess which one happens more continuing of course');
    addL(a.t - 0.12, (t) => {
      if (t < b.t - 0.1) headline(t, 'To stop watching, you now have to put in the *effort.*', { times: TW(a, 'To stop watching, you now have to put in the effort.'), ev: [a.at('efforts')], maxW: V(1600, 940), size: V(80, 72), y: V(150, SAFE.contentTop + 10) });
      else headline(t, 'Deciding to stop takes *effort.* Deciding to continue doesn’t.', { times: TW(b, 'Deciding to stop takes effort. Deciding to continue doesn’t.'), ev: [b.at('efforts')], maxW: V(1600, 940), size: V(80, 72), y: V(150, SAFE.contentTop + 10) });
      const rows = [['Stop', 'effort', 0.92, b.at('stop')], ['Continue', 'no effort', 0.02, b.at('continue')]];
      rows.forEach(([k, l, v, at], i) => {
        const x = V(120, 70), y = V(500 + i * 200, 900 + i * 220), w = V(1680, 940);
        if (t < at) return; withA(clamp((t - at) / 0.25), () => {
          const win = i === 1 && t > c.at('continuing');
          txt(k, x, y, FT(600, V(60, 56)), win ? PD.red : PD.text, 'left', 'alphabetic', -1); _txt(l, x + w, y, FT(500, 36), PD.muted, 'right');
          bar(x, y + 30, w, 34, v * MOTION.ease(t, at, 0.9, 'outQuint'), PD.text);
        });
      });
      if (t > c.at('continuing')) credit('Which one happens more? Continuing, of course.', V(120, 70), V(960, 1420), V(1680, 940));
    }, { id: 'effort', push: 0.012 });
    sTick(b.at('stop'), -4); sTick(b.at('continue'), -4); sPop(c.at('continuing'), -3);
  }
}

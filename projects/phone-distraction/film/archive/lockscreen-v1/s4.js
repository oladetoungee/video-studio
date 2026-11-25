/* phone-distraction · part 4 (10:58-14:31): her story (Instagram at 19, six years off), her rule (need), what you can try
 * (grayscale, autoplay off, notifications off, apps off the home screen, an app blocker, "what do I need?"), the close. */
'use strict';
function buildS4() {
  /* ---- 60 recap -> so what can we do? ---- */
  {
    const a = PH("so we've gone over the fact that you are addicted we are addicted to our phones and their intentional features put in place to keep us stuck on it");
    const b = PH('infinite scroll autoplay notifications'); const c = PH('so what exactly can we you me do about this');
    addL(a.t - 0.1, (t) => {
      if (t < c.t - 0.1) bannerStack(t, [B(a, 'We are addicted to our phones,', [], { at: a.t - 0.06 }), { s: 'and their *intentional features,* put in place to keep us stuck.', at: a.at('intentional') - 0.06, ev: [a.at('intentional')] }], { x: V(120, 60), y: V(200, SAFE.contentTop + 10), w: V(1100, 960), keep: 2 });
      if (t > c.t - 0.1) headline(t, 'So what exactly can we, you, me, *do about this?*', { times: TW(c, 'So what exactly can we, you, me, do about this?'), ev: [c.at('do')], maxW: V(1500, 940), size: V(96, 84), y: V(200, SAFE.contentTop + 10) });
      [['Infinite scroll', b.at('infinite')], ['Autoplay', b.at('autoplay')], ['Notifications', b.at('notifications')]].forEach(([l, at], i) => {
        const x = V(120 + i * 570, 70), y = V(600, 900 + i * 180), w = V(540, 940);
        card(t, 'recap ' + i, x, y, w, 150, at - 0.05, (yy) => { txt(l, x + 40, yy + 95, FT(600, 52), PD.text, 'left', 'alphabetic', -1); badge(x + w - 60, yy + 75, String(i + 1), PD.red, 1, 1); });
      });
      homeBar();
    }, { id: 'whatnow', pull: true, push: 0.012 });
    sPop(b.at('infinite'), -4); sPop(b.at('autoplay'), -4); sPop(b.at('notifications'), -4); sHit(c.at('do'), -8);
  }
  /* ---- 61 nineteen ---- */
  {
    const a = PH('this is something that i started to think about like yes way back'); const b = PH('i remember when i was 19 i used to use instagram a lot');
    const c = PH('i feel like if i continued using instagram at that rate i would have turned out to be one influencer or something');
    const d = PH('but even around that time at 19 i just felt strongly that it was very dysfunctional to the life that i wanted to live');
    addL(a.t - 0.12, (t) => {
      if (t < b.at('19') - 0.1) headline(t, 'I started to think about this *way back.*', { times: TW(a, 'I started to think about this way back.'), ev: [a.at('way')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      bigWidget(t, 'age', V(120, 70), V(170, SAFE.contentTop + 10), V(560, 940), b.at('19') - 0.05, 'When I was', '19', 'I used Instagram a lot', { vsize: V(260, 220) });
      bannerStack(t, [B(c, 'If I had continued at that rate, I would have turned out to be one *influencer* or something.', ['influencer']),
        B(d, 'It felt very *dysfunctional* to the life I wanted to live.', ['dysfunctional'])], { x: LY.bx, y: V(170, 900), w: LY.bw });
      homeBar();
    }, { id: 'nineteen', push: 0.012 });
    sPop(b.at('19'), -3); sNotify(c.t - 0.06, -4); sMark(d.at('dysfunctional'), -3);
  }
  /* ---- 62 I left Instagram for six good years ---- */
  {
    const a = PH("and at this time it wasn't even as popular as it is now but i really felt like nah"); const b = PH('so i left instagram'); const c = PH("and i didn't use the app for six good years");
    addL(a.t - 0.12, (t) => {
      headline(t, 'So I left Instagram, and I didn’t use the app for *six good years.*', { times: TW(b, 'So I left Instagram,').concat(TW(c, 'and I didn’t use the app for six good years.')), ev: [c.at('six')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t < b.t) headline(t, 'I really felt like, *nah.*', { times: TW(a, 'I really felt like, nah.'), ev: [a.at('nah')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      // the tile and the remove dialog (names only; drawn)
      const x = V(1010, 140), y = V(160, 820), del = b.at('left');
      const gone = MOTION.ease(t, del + 0.35, 0.35, 'inExpo');
      if (gone < 1) withA(1 - gone, () => { withT(x + 150, y + 150, 1 - 0.5 * gone, 0, () => fillRR(-150, -150, 300, 300, 69, PD.tiles[3])); txt('Instagram', x + 150, y + 360, FT(500, 40), PD.tileLab, 'center'); });
      if (t > a.t + 0.4 && t < del + 0.5) withA(clamp((t - a.t - 0.4) / 0.25) * (1 - clamp((t - del - 0.2) / 0.3)), () => {
        fillRR(x + 340, y + 20, V(440, 560), 200, 30, PD.card); txt('Remove app?', x + 380, y + 90, FT(600, 44), PD.text);
        fillRR(x + 380, y + 120, V(360, 480), 72, 36, t > del ? PD.red : '#2C2F36'); _txt('Delete', x + 380 + V(180, 240), y + 168, FT(600, 36), PD.text, 'center'); });
      if (t > c.at('six')) { const yrs = clamp(Math.floor((t - c.at('six')) / 0.16) + 1, 1, 6);
        bigWidget(t, 'years', x - 40, V(560, 1100), V(660, 840), c.at('six') - 0.05, 'Without the app', yrs + (yrs === 1 ? ' year' : ' years'), null, { vsize: V(150, 140), vw: 600 }); } homeBar();
    }, { id: 'left', push: 0.012 });
    sTick(b.at('left'), -2); sErr(b.at('left') + 0.35, -10); sTick(c.at('six'), -4); sPop(c.at('six') + 0.8, -4);
  }
  /* ---- 63 my rule: need ---- */
  {
    const a = PH('these days my personal rule for social media is need'); const b = PH('this is the rule i keep for myself and of course i break it sometimes');
    addL(a.t - 0.12, (t) => {
      card(t, 'focus', V(460, 70), V(220, SAFE.contentTop + 200), V(1000, 940), V(520, 520), a.at('rule') - 0.1, (yy) => {
        lab('My rule for social media', V(520, 130), yy + 80);
        rich(t, '_Need._', { x: V(510, 120), y: yy + 120, size: V(220, 200), weight: 600, lh: 1, maxW: 900, times: [a.at('need')], ev: [a.at('need') + 0.25], col: PD.text });
        if (t > b.at('break')) credit('And of course, I break it sometimes.', V(520, 130), yy + V(450, 450), V(900, 860), { size: 40 });
      });
      homeBar();
    }, { id: 'need', pull: true, push: 0.02 });
    sHit(a.at('need'), -7); sMark(a.at('need') + 0.25, -4); sTick(b.at('break'), -6);
  }
  /* ---- 64 the rule, app by app ---- */
  {
    const a = PH('the rule is that i should only open twitter when i need something from twitter'); const b = PH('and in many cases my need could be oh what are people saying about this topic');
    const c = PH('or maybe i want to like get up to date information'); const d = PH('and sometimes just post my own content');
    const e = PH('i should only open instagram as well when i need something from there'); const f = PH('i should only open tiktok when i need something from there');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Only open an app when I *need* something from it.', { times: TW(a, 'Only open an app when I need something from it.'), ev: [a.at('need')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      const rows = [['Twitter / X', a.at('twitter'), [['What are people saying about this?', b.at('saying')], ['Up-to-date information', c.at('information')], ['Posting my content', d.at('post')]]],
        ['Instagram', e.at('instagram'), []], ['TikTok', f.at('tiktok'), []]];
      if (t > b.at('could') && t < b.at('saying')) withA(clamp((t - b.at('could')) / 0.25), () => lab('My need could be…', V(960, 60), V(120, 730), { col: PD.red }));
      const x = V(960, 60), w = V(840, 960); let y = V(150, 760);
      rows.forEach(([n, at, needs], i) => {
        const h = 120 + needs.length * 64;
        card(t, 'rule ' + n, x, y, w, h, at - 0.1, (yy) => {
          txt(n, x + 40, yy + 78, FT(600, 52), PD.text, 'left', 'alphabetic', -1); _txt('when I need it', x + w - 40, yy + 74, FT(500, 34), i === 0 && t > a.at('need') ? PD.red : PD.muted, 'right');
          needs.forEach(([l, nt], j) => { if (t > nt) withA(clamp((t - nt) / 0.25), () => { circle(x + 52, yy + 132 + j * 64 - 12, 8, PD.red); txt(l, x + 76, yy + 132 + j * 64, FT(500, V(40, 38)), PD.text); }); });
        });
        y += h + 22;
      });
      homeBar();
    }, { id: 'rule', push: 0.012 });
    sPop(a.at('twitter'), -4); sTick(b.at('saying'), -6); sTick(c.at('information'), -6); sTick(d.at('post'), -6); sPop(e.at('instagram'), -5); sPop(f.at('tiktok'), -5);
  }
  /* ---- 65 every notification off, even WhatsApp ---- */
  {
    const a = PH('and all my notifications are turned off even whatsapp'); const b = PH("if someone's trying to reach me and they don't have my mobile number to call me directly");
    const c = PH("i'll see it when i open the app");
    addL(a.t - 0.12, (t) => {
      headline(t, 'All my notifications are turned off. Even *WhatsApp.*', { times: TW(a, 'All my notifications are turned off. Even WhatsApp.'), ev: [a.at('whatsapp')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t > c.t) credit('If someone needs me and doesn’t have my number, I’ll see it when I open the app.', LY.lx, V(560, 720), V(760, 940), { size: 40 });
      const f0 = a.at('off');
      settings(t, 'notif off', V(960, 60), V(150, 860), V(840, 960), [
        { label: 'Instagram', on0: true, flip: f0 }, { label: 'TikTok', on0: true, flip: f0 + 0.15 }, { label: 'Twitter / X', on0: true, flip: f0 + 0.3 }, { label: 'YouTube', on0: true, flip: f0 + 0.45 },
        { label: 'WhatsApp', on0: true, flip: a.at('whatsapp') + 0.1 }], a.at('notifications') - 0.1, { rh: V(110, 96) });
      illus(V(960, 70), 1010); homeBar();
    }, { id: 'notifoff', push: 0.012 });
    sTick(a.at('off'), -3); sTick(a.at('off') + 0.3, -6); sTick(a.at('whatsapp') + 0.1, -2);
  }
  /* ---- 66 a little bit hypocritical ---- */
  {
    const a = PH('and this sounds a little bit hypocritical because i post content on these apps myself and i want people to watch it');
    const b = PH("but it would do nobody any good if they're all just stuck on our phones");
    addL(a.t - 0.12, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '2:22', '2:22', null, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(a, 'This sounds a little bit *hypocritical,* because I post content on these apps myself.', ['hypocritical']),
        B(b, 'But it would do nobody any good if we’re all just *stuck on our phones.*', ['stuck'])], { x: LY.bx, y: V(160, 900), w: LY.bw });
      homeBar();
    }, { id: 'hypocritical', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.06, -3); sMark(a.at('hypocritical'), -4); sNotify(b.t - 0.06, -4);
  }
  /* ---- 67 what you can try ---- */
  {
    const a = PH("so if you want to push back on your phone use there are a few things you can do that are actually backed up by research");
    const tips = ['Grayscale', 'Autoplay off', 'Notifications you don’t need: off', 'Apps off your home screen', 'An app blocker', 'Ask: what do I need?'];
    addL(a.t - 0.1, (t) => {
      headline(t, 'A few things you can do, *backed up by research.*', { times: TW(a, 'A few things you can do, backed up by research.'), ev: [a.at('research')], maxW: V(700, 940), y: V(200, SAFE.contentTop + 10) });
      const t0 = a.at('things'); listCard(t, 'tips', V(880, 60), V(140, 760), V(920, 960), tips, tips.map((_, i) => t0 + 0.2 + i * 0.28), { rh: V(130, 100), size: V(46, 42) });
      homeBar();
    }, { id: 'try', pull: true, push: 0.012 });
    sTick(a.at('things') + 0.2, -4); sTick(a.at('things') + 1.0, -6); sMark(a.at('research'), -4);
  }
  /* ---- 68 grayscale: the home screen loses its colour ---- */
  {
    const a = PH('you can try grayscale'); const b = PH('most phones let you turn your screen black and white'); const c = PH("it's in the accessibility setting");
    const d = PH("there's a study that shows that when people use grayscale they spend less time on their phone");
    const e = PH('so you take the colour away and your phone becomes a little less rewarding');
    addL(a.t - 0.1, (t) => {
      const k = MOTION.ease(t, b.at('black') - 0.2, 0.8, 'inOutQuart');   // colour -> gray
      headline(t, 'Take the colour away, and your phone becomes a little less *rewarding.*', { times: TW(e, 'Take the colour away, and your phone becomes a little less rewarding.'), ev: [e.at('rewarding')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10), col: PD.grayTxt, red: '#3A3A3A', mode: 'drop' });
      if (t < e.t) headline(t, 'You can try *grayscale.*', { times: TW(a, 'You can try grayscale.'), maxW: V(760, 940), y: V(200, SAFE.contentTop + 10), col: PD.grayTxt, red: '#3A3A3A' });
      if (t > c.t && t < e.t) credit('Settings → Accessibility', LY.lx, V(640, 700), V(760, 940), { col: PD.grayMid, size: 40 });
      if (t > d.t) credit('A study found people spent less time on their phones in grayscale (Holte and Ferraro, 2020).', LY.lx, V(900, 760), V(760, 940), { col: PD.grayMid });
      const mix = (c1, c2) => { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(c1), B_ = p(c2); return '#' + A.map((v, i) => Math.round(lerp(v, B_[i], k)).toString(16).padStart(2, '0')).join(''); };
      const tiles = ['#4E7BE0', '#E05A9E', '#3DBE77', '#F2A93B', '#9B6BE0', '#38B7D6', '#E0563B', '#5AC46B', '#E0C23B', '#6B8BE0', '#D65AA8', '#3BA4E0'].map((c_, i) => mix(c_, PD.grayTiles[i % 4]));
      const bcol = mix(PD.red, '#7C7B78');
      homeGrid(t, { x: V(1010, 120), y: V(150, 900), cols: 4, size: V(150, 150), gx: V(64, 90), gy: V(110, 100), tileCols: tiles, badgeCol: bcol, labCol: '#3A3A3A', badges: { 0: '12', 2: '99+', 3: '7', 5: '1', 7: '4', 10: '2' } });
      illus(V(1010, 70), 1010); homeBar();
    }, { id: 'grayscale', ground: 'gray', push: 0.012 });
    sfx('swipe', b.at('black') - 0.2 + 0.4, -6); sMark(e.at('rewarding'), -4);
  }
  /* ---- 69 autoplay off ---- */
  {
    const a = PH('turn off autoplay on youtube and netflix'); const b = PH('it puts the stopping point back'); const c = PH('after episode one plays');
    const d = PH('you should get the chance to choose whether you want to continue watching or you want to stop');
    addL(a.t - 0.1, (t) => {
      headline(t, 'Turn off autoplay. It puts the *stopping point* back.', { times: TW(a, 'Turn off autoplay.').concat(TW(b, 'It puts the stopping point back.')), ev: [b.at('stopping')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      settings(t, 'autoplay off', V(960, 60), V(200, 760), V(840, 960), [{ label: 'Autoplay (YouTube)', on0: true, flip: a.at('autoplay') }, { label: 'Autoplay next episode', on0: true, flip: a.at('netflix') }], a.t, { size: V(44, 42) });
      if (t > c.t) card(t, 'choose', V(960, 60), V(470, 1020), V(840, 960), 260, c.t, (yy) => {
        lab('Episode 1 has ended', V(1000, 100), yy + 66);
        fillRR(V(1000, 100), yy + 100, V(360, 420), 110, 55, '#2C2F36'); _txt('Next episode', V(1180, 310), yy + 168, FT(600, 38), PD.text, 'center');
        fillRR(V(1400, 560), yy + 100, V(360, 400), 110, 55, t > d.at('stop') ? PD.red : '#2C2F36'); _txt('Stop here', V(1580, 760), yy + 168, FT(600, 38), PD.text, 'center');
      });
      illus(V(960, 70), 1010); homeBar();
    }, { id: 'autoplayoff', pull: true, push: 0.012 });
    sTick(a.at('autoplay'), -2); sTick(a.at('netflix'), -4); sTick(d.at('stop'), -4);
  }
  /* ---- 70 notifications you don't need ---- */
  {
    const a = PH("turn off the notifications you don't need"); const b = PH('i mean notifications that you know that you do not need');
    const c = PH("you will not die if you don't get these notifications immediately coming"); const d = PH('turn it off');
    addL(a.t - 0.1, (t) => {
      headline(t, 'You will not *die* if you don’t get these notifications immediately.', { times: TW(c, 'You will not die if you don’t get these notifications immediately.'), ev: [c.at('die')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t < c.t) headline(t, 'Turn off the notifications you *don’t need.*', { times: TW(a, 'Turn off the notifications you don’t need.'), ev: [a.at('need')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      settings(t, 'unneeded', V(960, 60), V(150, 860), V(840, 960), [
        { label: 'Shop deals', on0: true, flip: a.at('notifications') + 0.1 }, { label: 'News alerts', on0: true, flip: b.at('know') }, { label: 'Game rewards', on0: true, flip: b.at('need') },
        { label: 'Work chat', on0: true, sub: 'keep' }, { label: 'Feed: someone posted', on0: true, flip: d.at('off') }], a.t, { rh: V(110, 96) });
      homeBar();
    }, { id: 'notifneed', push: 0.012 });
    sTick(a.at('notifications') + 0.1, -3); sTick(b.at('need'), -5); sMark(c.at('die'), -3); sTick(d.at('off'), -2);
  }
  /* ---- 71 move distracting apps off your home screen ---- */
  {
    const a = PH('move your distracting app off your home screen');
    addL(a.t - 0.1, (t) => {
      headline(t, 'Move distracting apps off your *home screen.*', { times: TW(a, 'Move distracting apps off your home screen.'), ev: [a.at('home')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      const m0 = a.at('off'); const mv = MOTION.ease(t, m0, 0.6, 'inOutQuart');
      ctx.save(); const gx = V(1010, 120), gy = V(150, 840);
      const TT = homeGrid(t, { x: gx, y: gy, cols: 4, size: V(150, 150), gx: V(64, 90), gy: V(110, 100), n: 12, names: APPS.map((n, i) => (i === 0 ? '' : n)), tileCols: [PD.ink].concat(Array.from({ length: 11 }, (_, i) => PD.tiles[(i + 1) % 4])), badges: {} });
      ctx.restore();
      // the distracting tile slides off the edge to the next page; dots under the grid show the pages
      const T0 = TT[0]; const tx = T0.x + mv * V(1000, 1000), ty = T0.y; withA(1 - mv * 0.2, () => { fillRR(tx, ty, T0.s, T0.s, T0.s * 0.23, PD.red); _txt('Feed', tx + T0.s / 2, ty + T0.s + 42, FT(500, 32), PD.tileLab, 'center'); badge(tx + T0.s - 6, ty + 6, '12', PD.red, T0.s / 150, 1); });
      const dy = V(880, 1440); circle(CX + V(240, 0) - 14 + V(0, 0), dy, 8, PD.text); circle(CX + V(240, 0) + 14, dy, 8, t > m0 + 0.4 ? PD.red : PD.muted);
      illus(V(1010, 70), 1010); homeBar();
    }, { id: 'homescreen', push: 0.012 });
    sfx('swipe', a.at('off') + 0.3, -6);
  }
  /* ---- 72 the app blocker: mountains and valleys ---- */
  {
    const a = PH("i use an app a software app blocker that i've been using since the start of this year"); const b = PH('i pay for the yearly subscription in january');
    const c = PH('if i want to use instagram right now i have to go through several mountains or some valleys to access instagram'); const d = PH('so that stops me');
    addL(a.t - 0.12, (t) => {
      headline(t, 'An *app blocker:* several mountains and some valleys to get to Instagram.', { times: TW(a, 'An app blocker:').concat(TW(c, 'several mountains and some valleys to get to Instagram.')), ev: [a.at('blocker')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      if (t > b.t - 0.1) headline(t, 'I pay for the *yearly subscription,* since January.', { times: TW(b, 'I pay for the yearly subscription, in January.'), ev: [b.at('yearly')], y: V(640, 700), size: V(44, 42), maxW: V(760, 940), mode: 'words' });
      // a path from your thumb to the app over mountains (drawn), drawn on "mountains" / "valleys"
      const x0 = V(980, 90), y0 = V(760, 1300), x1 = V(1760, 1000), pts = [];
      for (let i = 0; i <= 120; i++) { const u = i / 120; pts.push([lerp(x0, x1, u), y0 - Math.abs(Math.sin(u * Math.PI * 3)) * V(420, 380) * (0.6 + 0.4 * Math.sin(u * 7 + 1))]); }
      const p = MOTION.ease(t, a.at('blocker') + 0.4, c.at('access') - a.at('blocker') - 0.4, 'inOutQuart');
      if (p > 0) { ctx.save(); ctx.strokeStyle = PD.text; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.max(2, Math.round(pts.length * p)); pts.slice(0, n).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
        const [hx, hy] = pts[Math.max(0, Math.round((pts.length - 1) * p))]; circle(hx, hy, 16, PD.red); }
      if (t > a.at('blocker') - 0.1) { fillRR(x1 - 60, y0 - 60, 120, 120, 28, PD.tiles[3]); _txt('Instagram', x1, y0 + 100, FT(500, 32), PD.muted, 'center'); circle(x0, y0, 34, PD.tiles[1]); _txt('You', x0, y0 + 80, FT(500, 32), PD.muted, 'center'); }
      if (t > c.at('access')) { fillRR(x1 - 60, y0 - 60, 120, 120, 28, PD.tiles[3]); _txt('Instagram', x1, y0 + 100, FT(500, 32), PD.muted, 'center'); }
      if (t > d.at('stops')) lab('That stops me', V(980, 90), V(900, 1420), { col: PD.red });
      illus(V(980, 70), 1010); homeBar();
    }, { id: 'blocker', push: 0.012 });
    sTick(a.at('blocker'), -4); sTick(b.at('subscription'), -6); sfx('mark', c.at('mountains') - 0.3, -6); sErr(d.at('stops'), -9);
  }
  /* ---- 73 ask yourself: what do I need right now? ---- */
  {
    const a = PH('and also before you open an app i know that this is a lot of work mental work but just simply ask yourself');
    const b = PH("i'm opening instagram what do i need from instagram right now"); const c = PH('what do i need from tiktok right now');
    const d = PH('do i want to reply to someone'); const e = PH('do i want to post something'); const f = PH('or do i just want to scroll');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Before you open an app, I know it’s a lot of mental work, but simply *ask yourself.*', { times: TW(a, 'before you open an app, I know that this is a lot of mental work, but just simply ask yourself.'), ev: [a.at('ask')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10), mode: 'words' });
      const x = V(960, 60), y = V(170, 820), w = V(840, 960);
      card(t, 'ask', x, y, w, 640, b.at('opening') - 0.1, (yy) => {
        lab('Opening ' + (t > c.t ? 'TikTok' : 'Instagram'), x + 40, yy + 66);
        txtW('What do I need from it right now?', x + 40, yy + 150, FT(600, 60), PD.text, w - 80, 66);
        [['Reply to someone', d.at('reply')], ['Post something', e.at('post')], ['Just scroll', f.at('scroll')]].forEach(([l, at], i) => {
          if (t < at - 0.1) return; const on = i === 2;
          withA(clamp((t - at + 0.1) / 0.2), () => { fillRR(x + 40, yy + 290 + i * 112, w - 80, 92, 46, on && t > at + 0.2 ? PD.red : '#2C2F36'); _txt(l, x + 90, yy + 350 + i * 112, FT(600, 40), PD.text); });
        });
      });
      illus(V(960, 70), 1010); homeBar();
    }, { id: 'askyourself', push: 0.012 });
    sPop(b.at('opening') - 0.1, -4); sTick(d.at('reply'), -5); sTick(e.at('post'), -5); sTick(f.at('scroll'), -2);
  }
  /* ---- 74 PUNCH: your attention is an asset ---- */
  {
    const a = PH('your attention is an asset');
    addL(a.t - 0.08, (t) => {
      punch(t, 'Your attention is an *asset.*', { times: TW(a, 'Your attention is an asset.'), ev: [a.at('asset')], size: V(150, 120) });
    }, { id: 'asset', ground: 'red', burst: () => [V(1640, 900), V(200, 520)], push: 0.03 });
    sHit(a.at('asset'), -2);
  }
  /* ---- 75 designed to hold your attention ---- */
  {
    const a = PH('your phone is designed to hold your attention'); const b = PH('your attention is what pays for a lot of these apps');
    const c = PH('and the techniques that are being used to hold your attention they are intentionally crafted'); const d = PH('you need to know that');
    addL(a.t - 0.1, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '2:22', '2:22', null, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(a, 'Your phone is designed to *hold your attention.*', ['hold']), B(b, 'Your attention is what *pays* for a lot of these apps.', ['pays']),
        B(c, 'The techniques used to hold it are *intentionally crafted.*', ['intentionally']), B(d, 'You need to know that.')], { x: LY.bx, y: V(160, 900), w: LY.bw, keep: V(3, 2) });
      homeBar();
    }, { id: 'pays', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.06, -3); sCash(b.at('pays'), -6); sNotify(c.t - 0.06, -4); sMark(c.at('intentionally'), -4);
  }
  /* ---- 76 one hour, two hours: people working so hard ---- */
  {
    const a = PH("so the next time you're scrolling for one hour two hour"); const b = PH("i hope you're able to remember that there are people that intentionally put things in place");
    const c = PH("they're all working so hard for you to stay on instagram"); const d = PH("they're working so hard for you to stay on tiktok");
    addL(a.t - 0.1, (t) => {
      const r1 = a.at('one'), r2 = a.at('two');
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), t < r2 ? '1:40' : '2:40', t < r1 ? '1:40' : t < r2 ? '2:40' : '3:40', t < r2 ? r1 : r2, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(b, 'There are people who intentionally put these things in place.', []), B(c, 'They’re all working *so hard* for you to stay on Instagram.', ['hard']),
        B(d, 'They’re working so hard for you to stay on *TikTok.*', ['tiktok'])], { x: LY.bx, y: V(160, 900), w: LY.bw, keep: V(3, 2) });
      homeBar();
    }, { id: 'hours', pull: true, push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sClock(a.at('one'), -2); sClock(a.at('two'), -2); sNotify(b.t - 0.06, -4); sNotify(c.t - 0.06, -5);
  }
  /* ---- 77 I hope you can drop it ---- */
  {
    const a = PH("and i hope that you're able to drop it when you want to"); const b = PH("it's not something that i've completely figured out either");
    const c = PH('but i would think that i use social media a little less than the average person at least from this year last year');
    addL(a.t - 0.1, (t) => {
      headline(t, 'I hope you’re able to *drop it* when you want to.', { times: TW(a, 'I hope you’re able to drop it when you want to.'), ev: [a.at('drop')], maxW: V(1700, 960), size: V(140, 104), y: V(140, SAFE.contentTop + 40), mode: 'words' });
      bannerStack(t, [B(b, 'It’s not something I’ve completely figured out *either.*', ['either']), B(c, 'I think I use social media a little less than the average person, at least this year.', [])], { x: V(120, 60), y: V(620, 1000), w: V(1100, 960) });
      homeBar();
    }, { id: 'dropit', push: 0.015 });
    sMark(a.at('drop'), -3); sNotify(b.t - 0.06, -5); sNotify(c.t - 0.06, -6);
  }
  /* ---- 78 fought over by corporations: badges pile up, then the screen goes dark ---- */
  {
    const a = PH('but i really do hope that everyone gets into this idea and understand that your attention is an asset');
    const b = PH('and it is literally being fought over by different corporations');
    addL(a.t - 0.1, (t) => {
      headline(t, 'Your attention is literally being *fought over* by different corporations.', { times: TW(a, 'Your attention').concat(TW(b, 'is literally being fought over by different corporations.')), ev: [b.at('fought')], maxW: V(760, 940), y: V(200, SAFE.contentTop + 10) });
      const f0 = b.at('fought'); const badges = {}; for (let i = 0; i < 12; i++) badges[i] = [(tt) => String(3 + i * 7 + Math.max(0, Math.floor((tt - f0 - i * 0.1) / 0.25))), f0 + i * 0.12];
      homeGrid(t, { x: V(1010, 120), y: V(150, 840), cols: 4, size: V(150, 150), gx: V(64, 90), gy: V(110, 100), badges });
      homeBar();
    }, { id: 'fought', push: 0.015 });
    sPop(b.at('fought'), -2); sPop(b.at('fought') + 0.6, -5); sPop(b.at('fought') + 1.2, -6);
  }
  /* ---- 79 PUNCH: take it back ---- */
  {
    const a = PH('and you need to take it back'); const b = PH('for yourself'); const c = PH('for the people who love you'); const d = PH('the people that you love');
    const e = PH('for the things that are important in your life');
    addL(a.t - 0.08, (t) => {
      punch(t, 'Take it *back.*', { times: TW(a, 'Take it back.'), ev: [a.at('back')], size: V(170, 140), y: V(150, SAFE.contentTop + 20) });
      [['For yourself.', b.t], ['For the people who love you.', c.t], ['For the people that you love.', d.t], ['For the things that are important in your life.', e.t]].forEach(([l, at], i) => {
        if (t < at) return; const q = MOTION.ease(t, at, 0.35, 'outExpo');
        withA(q, () => txtW(l, V(124, 74), V(480 + i * 96, 720 + i * 150) + (1 - q) * -20, FT(600, V(64, 54)), PD.onRed, V(1700, 920), 60));
      });
    }, { id: 'takeback', ground: 'red', burst: () => [V(1640, 900), V(200, 520)], push: 0.02 });
    sHit(a.at('back'), -2); sTick(c.t, -6); sTick(e.t, -6);
  }
}
/* ---- the end card (outro): the lock screen goes quiet (no handle: her note 2026-10-17) ---- */
function buildEnd() {
  const end = INTRO + FILM.man.voiceDuration + 0.4;
  addL(end, (t, lt) => {
    lockClock(t, V(110, CX), V(520, 690), V(330, 360), '2:41', '2:41', null, { align: V('left', 'center') });
    txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
    banner(t, 'Your phone was _intentionally_ and _strategically_ designed to *distract* you.', { x: LY.bx, y: V(160, 900), w: LY.bw, at: end + 0.3, when: 'now' });
    homeBar();
  }, { id: 'end', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
  sNotify(end + 0.35, -4);
}

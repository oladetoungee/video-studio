/* phone-distraction · Receipt · part 4 (10:58-14:31): her story (Instagram at 19, six years off), her rule (need), what you can try
 * (grayscale, autoplay off, notifications off, apps off the home screen, an app blocker, "what do I need?"), the tear, the close. */
'use strict';
function buildS4() {
  /* ---- 60 recap -> so what can we do? (the receipt reprints the features) ---- */
  {
    const a = PH("so we've gone over the fact that you are addicted we are addicted to our phones and their intentional features put in place to keep us stuck on it");
    const b = PH('infinite scroll autoplay notifications'); const c = PH('so what exactly can we you me do about this');
    addR(a.t - 0.1, (t) => {
      if (t < c.t - 0.1) stack(t, 'We are addicted to our phones,', 'and their *intentional features.*', { t1: TW(a, 'We are addicted to our phones,'), t2: TW(a, 'and their intentional features.'), ev: [a.at('intentional')], size: V(110, 96), maxW: V(880, 940), key2: 'features' });
      else stack(t, 'So what exactly can we, you, me,', '*do about this?*', { t1: TW(c, 'So what exactly can we, you, me,'), t2: TW(c, 'do about this?'), ev: [c.at('do')], size: V(150, 130), maxW: V(880, 940), key2: 'do' });
      receipt(t, 'recap', V(1060, 70), V(0, 1000), V(780, 940), [{ l: 'what keeps us stuck', center: true, at: a.at('intentional') }, { rule: true, at: a.at('intentional') },
        { l: 'infinite scroll', r: '1', at: b.at('infinite') }, { l: 'autoplay', r: '1', at: b.at('autoplay') }, { l: 'notifications', r: '1', at: b.at('notifications') }, { rule: true, at: c.t }, { l: 'paid with', r: 'your attention', at: c.at('what'), hl: c.at('do') }], { fs: V(40, 30) });
      if (t > c.at('do')) stamp(t, 'Now what?', V(1380, 640), V(1300, 1380), c.at('do') + 0.1, { onPaper: true, col: RC.red, size: V(56, 44), rot: -8 });
    }, { id: 'whatnow', feed: true, push: 0.012 });
    sPrint(b.at('infinite'), -3); sPrint(b.at('autoplay'), -3); sPrint(b.at('notifications'), -3); sBell(c.at('do'), -4);
  }
  /* ---- 61 nineteen: Instagram a lot ---- */
  {
    const a = PH('this is something that i started to think about like yes way back'); const b = PH('i remember when i was 19 i used to use instagram a lot');
    const c = PH('i feel like if i continued using instagram at that rate i would have turned out to be one influencer or something');
    const d = PH('but even around that time at 19 i just felt strongly that it was very dysfunctional to the life that i wanted to live');
    addR(a.t - 0.12, (t, lt) => {
      if (t < b.at('19') - 0.1) stack(t, null, 'I started to think about this way back.', { t2: TW(a, 'I started to think about this way back.'), size: V(110, 96), maxW: V(860, 940), key2: 'way back' });
      else bigNum(t, '19', V(110, 70), V(80, SAFE.contentTop - 20), V(300, 260), b.at('19'));
      if (t > b.at('instagram')) rich(t, 'When I was 19, I used Instagram *a lot.*', { x: V(110, 70), y: V(400, 680), size: V(60, 52), maxW: 860, times: TW(b, 'When I was 19, I used Instagram a lot.'), ev: [b.at('lot')], key: '19 line' });
      { const sx = V(1080, 560), sy = V(-20, 620), sw = V(700, 450), sh = V(1120, 860); const q = MOTION.ease(t, onCut(a.t), 0.5, 'outQuint');
        withA(clamp((t - onCut(a.t)) / 0.15), () => themeFixed(() => { ctx.save(); ctx.translate(0, (1 - q) * 90); ctx.translate(sx + sw / 2, sy + sh / 2); ctx.rotate(0.03); ctx.translate(-sx - sw / 2, -sy - sh / 2);
          paperShadow(() => rect(sx, sy, sw, sh, RC.paper), 0.8); ctx.save(); ctx.beginPath(); ctx.rect(sx, sy, sw, sh); ctx.clip();
          const g_ = sw * 0.04, s_ = (sw - g_ * 4) / 3, off = 46 * lt; for (let i = 0; i < 30; i++) { const x = sx + g_ + (i % 3) * (s_ + g_), y = sy + g_ + Math.floor(i / 3) * (s_ + g_) - off % ((s_ + g_) * 2);
            fillRR(x, y, s_, s_, 6, ['#77787E', RC.tile, '#3A3B41', '#B9B4A6'][(i * 7) % 4]); if ((i * 5) % 7 === 2) heart(x + s_ * 0.82, y + s_ * 0.2, s_ * 0.18, RC.red); }
          ctx.restore(); ctx.restore(); })); }
      receipt(t, 'nineteen', V(110, 70), V(600, 1300), V(860, 940), [{ l: 'at that rate', r: 'one influencer', at: c.at('influencer') }, { l: 'what it felt like', r: 'dysfunctional', at: d.at('dysfunctional'), hl: d.at('dysfunctional') + 0.2 }], { fs: V(34, 28) });
    }, { id: 'nineteen', push: 0.012 });
    sStamp(b.at('19'), -4); sPrint(c.at('influencer'), -2); sPrint(d.at('dysfunctional'), -2); sMark(d.at('dysfunctional') + 0.2, -4);
  }
  /* ---- 62 I left Instagram for six good years: delete, then the years print ---- */
  {
    const a = PH("and at this time it wasn't even as popular as it is now but i really felt like nah"); const b = PH('so i left instagram'); const c = PH("and i didn't use the app for six good years");
    addR(a.t - 0.12, (t) => {
      if (t < b.t) stack(t, null, 'I really felt like, *nah.*', { t2: TW(a, 'I really felt like, nah.'), ev: [a.at('nah')], size: V(130, 112), maxW: V(860, 940), key2: 'nah' });
      else stack(t, 'So I left Instagram, and I didn’t use the app for', '*six good years.*', { t1: TW(b, 'So I left Instagram,').concat(TW(c, 'and I didn’t use the app for')), t2: TW(c, 'six good years.'), ev: [c.at('six')], size: V(130, 112), maxW: V(860, 940), key2: 'six' });
      const del = b.at('left');
      { const sx = V(1060, 140), sy = V(90, 760), sw = V(760, 800), sh = V(860, 660); slip(t, 'delete card', sx, sy, sw, sh, a.t, () => {}, { rot: 1.5 });
        if (t > onCut(a.t) + 0.05) themeFixed(() => { ctx.save(); ctx.translate(sx + sw / 2, sy + sh / 2); ctx.rotate(1.5 * Math.PI / 180); ctx.translate(-sx - sw / 2, -sy - sh / 2); ((sx, sy, sw, sh) => {
        const gone = MOTION.ease(t, del + 0.35, 0.35, 'inExpo'); const s = sw * 0.36;
        if (gone < 1) withA(1 - gone, () => { withT(sx + sw / 2, sy + sh * 0.3, 1 - 0.5 * gone, 0, () => fillRR(-s / 2, -s / 2, s, s, s * 0.24, RC.tileD)); _txt('Instagram', sx + sw / 2, sy + sh * 0.3 + s * 0.75, FT(700, sw * 0.055), RC.inkMid, 'center'); });
        if (t > a.t + 0.4 && t < del + 0.5) withA(clamp((t - a.t - 0.4) / 0.25) * (1 - clamp((t - del - 0.2) / 0.3)), () => {
          fillRR(sx + sw * 0.08, sy + sh * 0.55, sw * 0.84, sh * 0.24, sw * 0.05, '#E9E6DD'); _txt('Remove app?', sx + sw / 2, sy + sh * 0.62, FT(700, sw * 0.07), RC.ink, 'center');
          fillRR(sx + sw * 0.2, sy + sh * 0.67, sw * 0.6, sh * 0.08, sh * 0.04, t > del ? RC.red : '#C9C4B4'); _txt('Delete', sx + sw / 2, sy + sh * 0.725, FT(700, sw * 0.06), t > del ? '#FFFFFF' : RC.ink, 'center'); });
        tap(t, del, sx + sw / 2, sy + sh * 0.71);
        if (t > del + 0.7) withA(clamp((t - del - 0.7) / 0.25), () => { _txt('Instagram', sx + sw / 2, sy + sh * 0.42, FT(700, V(76, 68)), RC.ink, 'center'); _txt('REMOVED', sx + sw / 2, sy + sh * 0.54, MONO(V(40, 36)), RC.red, 'center'); }); })(sx, sy, sw, sh); ctx.restore(); }); }
      const yrs = clamp(Math.floor((t - c.at('six')) / 0.2) + 1, 0, 6);
      receipt(t, 'years', V(110, 70), V(600, 1300), V(860, 940), [{ l: 'without the app', r: t > c.at('six') ? yrs + (yrs === 1 ? ' year' : ' years') : '', big: true, at: c.at('six') - 0.05 }], { fs: V(34, 28) });
    }, { id: 'left', push: 0.012 });
    sTick(b.at('left'), -2); sTear(b.at('left') + 0.35, -6); sPrint(c.at('six'), -2); sBell(c.at('six') + 1.1, -4);
  }
  /* ---- 63 my rule: need ---- */
  {
    const a = PH('these days my personal rule for social media is need'); const b = PH('this is the rule i keep for myself and of course i break it sometimes');
    addR(a.t - 0.12, (t) => {
      stack(t, 'These days, my personal rule for social media is', '*Need.*', { t1: TW(a, 'These days, my personal rule for social media is'), t2: [a.at('need')], ev: [a.at('need') + 0.15], size: V(260, 220), maxW: V(1000, 940) });
      receipt(t, 'my rule', V(1160, 70), V(0, 1100), V(660, 940), [{ l: 'my rule', center: true, big: true, at: a.at('rule') }, { rule: true, at: a.at('rule') }, { l: 'open an app', at: a.at('need') + 0.2 }, { l: 'only when i need it', at: a.at('need') + 0.45, hl: a.at('need') + 0.6 }], { fs: V(40, 32) });
      if (t > b.at('break')) stamp(t, 'I break it sometimes', V(1200, 70), V(460, 1340), b.at('break'), { size: V(36, 34) });
    }, { id: 'need', feed: true, push: 0.02 });
    sHit(a.at('need'), -7); sMark(a.at('need') + 0.15, -4); sPrint(a.at('need') + 0.2, -4); sStamp(b.at('break'), -5);
  }
  /* ---- 64 the rule, app by app (printed) ---- */
  {
    const a = PH('the rule is that i should only open twitter when i need something from twitter'); const b = PH('and in many cases my need could be oh what are people saying about this topic');
    const c = PH('or maybe i want to like get up to date information'); const d = PH('and sometimes just post my own content');
    const e = PH('i should only open instagram as well when i need something from there'); const f = PH('i should only open tiktok when i need something from there');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Only open an app when I', '*need* something from it.', { t1: TW(a, 'Only open an app when I'), t2: TW(a, 'need something from it.'), ev: [a.at('need')], size: V(100, 92), maxW: V(900, 940) });
      receipt(t, 'rule receipt', V(1000, 70), V(0, 840), V(820, 940), [{ l: 'twitter / x', big: true, at: a.at('twitter') }, { l: '· what are people saying?', small: true, at: b.at('saying') }, { l: '· up-to-date information', small: true, at: c.at('information') }, { l: '· posting my content', small: true, at: d.at('post') },
        { rule: true, at: e.at('instagram') }, { l: 'instagram', r: 'when i need it', at: e.at('instagram') }, { l: 'tiktok', r: 'when i need it', at: f.at('tiktok'), hl: f.at('need') }], { fs: V(38, 28) });
    }, { id: 'rule', push: 0.012 });
    sPrint(a.at('twitter'), -2); sPrint(b.at('saying'), -5); sPrint(c.at('information'), -5); sPrint(d.at('post'), -5); sPrint(e.at('instagram'), -3); sPrint(f.at('tiktok'), -3);
  }
  /* ---- 65 every notification off, even WhatsApp ---- */
  {
    const a = PH('and all my notifications are turned off even whatsapp'); const b = PH("if someone's trying to reach me and they don't have my mobile number to call me directly");
    const c = PH("i'll see it when i open the app");
    addR(a.t - 0.12, (t) => {
      stack(t, 'All my notifications are turned off. Even', '*WhatsApp.*', { t1: TW(a, 'All my notifications are turned off. Even'), t2: [a.at('whatsapp')], ev: [a.at('whatsapp') + 0.1], size: V(150, 130), maxW: V(860, 940) });
      if (t > c.t) rich(t, 'If someone needs me and doesn’t have my number, I’ll see it when I open the app.', { x: V(110, 70), y: V(640, 860), size: V(44, 40), maxW: V(860, 940), times: TW(c, 'I’ll see it when I open the app.'), key: 'see it' });
      const f0 = a.at('off');
      { const x = V(1060, 140), y = V(70, 940), w = V(760, 800), h = V(800, 500);
        slip(t, 'notif card', x, y, w, h, a.t, (yy) => uiSettings(t, x, yy, w, h, [['Instagram', true, f0], ['TikTok', true, f0 + 0.15], ['Twitter / X', true, f0 + 0.3], ['YouTube', true, f0 + 0.45], ['WhatsApp', true, a.at('whatsapp') + 0.1]], { title: 'NOTIFICATIONS', rh: 0.16, top: 0.13 }), { rot: -1.5 });
        if (t > a.at('whatsapp') + 0.3) stamp(t, 'All off', x + w - V(280, 260), y + h - V(30, 20), a.at('whatsapp') + 0.3, { onPaper: true, col: RC.red, size: V(54, 46), rot: -8 }); }
    }, { id: 'notifoff', push: 0.012 });
    sTick(a.at('off'), -3); sTick(a.at('off') + 0.3, -6); sTick(a.at('whatsapp') + 0.1, -2);
  }
  /* ---- 66 a little bit hypocritical: she posts too ---- */
  {
    const a = PH('and this sounds a little bit hypocritical because i post content on these apps myself and i want people to watch it');
    const b = PH("but it would do nobody any good if they're all just stuck on our phones");
    addR(a.t - 0.12, (t) => {
      stack(t, 'This sounds a little bit', '*hypocritical,*', { t1: TW(a, 'This sounds a little bit'), t2: [a.at('hypocritical')], ev: [a.at('hypocritical') + 0.05], size: V(150, 120), maxW: V(980, 940) });
      rich(t, 'because I post content on these apps myself, and I want people to watch it.', { x: V(110, 70), y: V(430, 720), size: V(52, 46), maxW: V(860, 940), times: TW(a, 'because I post content on these apps myself, and I want people to watch it.'), key: 'post myself' });
      if (t > b.t) rich(t, 'But it would do nobody any good if we’re all just *stuck on our phones.*', { x: V(110, 70), y: V(640, 940), size: V(52, 46), maxW: V(860, 940), times: TW(b, 'But it would do nobody any good if we’re all just stuck on our phones.'), ev: [b.at('stuck')], key: 'nobody good' });
      { const x = V(1120, 160), y = V(120, 1080), w = V(700, 760), h = V(620, 360); const pa = a.at('post');
        slip(t, 'my post', x, y, w, h, pa - 0.1, (yy) => { const ih = h * 0.62; rect(x + 24, yy + 24, w - 48, ih, RC.tileD);
          ctx.beginPath(); ctx.moveTo(x + w / 2 - 34, yy + 24 + ih / 2 - 44); ctx.lineTo(x + w / 2 + 50, yy + 24 + ih / 2); ctx.lineTo(x + w / 2 - 34, yy + 24 + ih / 2 + 44); ctx.closePath(); ctx.fillStyle = RC.paper; ctx.fill();
          _txt('MY NEW VIDEO', x + 30, yy + ih + 80, MONO(V(32, 28)), RC.ink); const v = t > a.at('watch') ? Math.floor(clamp((t - a.at('watch')) / 1.5) * 128) : 0; _txt(v + ' views', x + w - 30, yy + ih + 80, MONO(V(32, 28)), RC.inkMid, 'right'); }, { rot: 2.5 }); }
    }, { id: 'hypocritical', push: 0.02 });
    sPaper(a.t + 0.05, -6); sMark(a.at('hypocritical'), -4); sMark(b.at('stuck'), -5);
  }
  /* ---- 67 what you can try: a receipt of six things, backed up by research ---- */
  {
    const a = PH("so if you want to push back on your phone use there are a few things you can do that are actually backed up by research");
    const tips = ['grayscale', 'autoplay off', 'unneeded notifications off', 'apps off your home screen', 'an app blocker', 'ask: what do i need?'];
    addR(a.t - 0.1, (t) => {
      stack(t, 'A few things you can do,', 'backed up by *research.*', { t1: TW(a, 'A few things you can do,'), t2: TW(a, 'backed up by research.'), ev: [a.at('research')], size: V(130, 110), maxW: V(860, 940) });
      const t0 = a.at('things');
      receipt(t, 'tips', V(1000, 70), V(0, 820), V(840, 940), [{ l: 'things you can try', center: true, big: true, at: t0 }, { rule: true, at: t0 }].concat(tips.map((s, i) => ({ l: String(i + 1).padStart(2, '0') + ' ' + s, at: t0 + 0.3 + i * 0.28 }))), { fs: V(40, 30) });
    }, { id: 'try', feed: true, push: 0.012 });
    for (let i = 0; i < 6; i += 2) sPrint(a.at('things') + 0.3 + i * 0.28, -4); sMark(a.at('research'), -4);
  }
  /* ---- 68 grayscale: the blue drains to grey, and the phone screen loses its colour ---- */
  {
    const a = PH('you can try grayscale'); const b = PH('most phones let you turn your screen black and white'); const c = PH("it's in the accessibility setting");
    const d = PH("there's a study that shows that when people use grayscale they spend less time on their phone");
    const e = PH('so you take the colour away and your phone becomes a little less rewarding');
    addR(a.t - 0.1, (t) => {
      const k = MOTION.ease(t, b.at('black') - 0.2, 0.8, 'inOutQuart');
      const mix = (c1, c2) => { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(c1), B_ = p(c2); return '#' + A.map((v, i) => Math.round(lerp(v, B_[i], k)).toString(16).padStart(2, '0')).join(''); };
      rect(0, 0, W, H, mix(RC.blue, '#6F6F73'));
      if (t < e.t) stack(t, null, 'You can try *grayscale.*', { t2: TW(a, 'You can try grayscale.'), ev: [a.at('grayscale')], size: V(140, 120), maxW: V(860, 940), key2: 'try gray' });
      else stack(t, 'Take the colour away, and your phone becomes', 'a little less *rewarding.*', { t1: TW(e, 'Take the colour away, and your phone becomes'), t2: TW(e, 'a little less rewarding.'), ev: [e.at('rewarding')], size: V(120, 100), maxW: V(860, 940), key2: 'less rewarding' });
      if (t > c.t && t < e.t) lab('Settings → Accessibility', V(110, 70), V(520, 760));
      if (t > d.t) credit('A study found people spent less time on their phones in grayscale (Holte and Ferraro, 2020).', V(110, 70), V(880, 1450), V(860, 940));
      const cols = ['#4E7BE0', '#E05A9E', '#3DBE77', '#F2A93B', '#9B6BE0', '#38B7D6', '#E0563B', '#5AC46B', '#E0C23B'].map((c_, i) => mix(c_, ['#77787E', '#55565C', '#3A3B41', '#9A9A9E'][i % 4]));
      prt(t, 'gray phone', 'ht_hand2', V(1260, 560), V(70, 760), V(820, 680), { at: a.t, from: [80, 0], cr: 'Hand: Igor Miske, CC0', screen: (sx, sy, sw, sh) => uiGrid(t, sx, sy, sw, sh, { cols: 3, n: 9, fills: cols, badges: { 0: '12', 2: '99+', 4: '7', 7: '4' }, badgeCol: mix(RC.red, '#8C8C8C'), top: sh * 0.12 }) });
    }, { id: 'grayscale', push: 0.012 });
    sTick(b.at('black') - 0.2, -4); sMark(e.at('rewarding'), -4);
  }
  /* ---- 69 autoplay off: the stopping point comes back (on the TV) ---- */
  {
    const a = PH('turn off autoplay on youtube and netflix'); const b = PH('it puts the stopping point back'); const c = PH('after episode one plays');
    const d = PH('you should get the chance to choose whether you want to continue watching or you want to stop');
    addR(a.t - 0.1, (t) => {
      stack(t, 'Turn off autoplay. It puts the', '*stopping point* back.', { t1: TW(a, 'Turn off autoplay.').concat(TW(b, 'It puts the')), t2: TW(b, 'stopping point back.'), ev: [b.at('stopping')], size: V(120, 104), maxW: V(860, 940) });
      receipt(t, 'autoplay off', V(110, 70), V(560, 1300), V(760, 940), [{ l: 'autoplay, youtube', r: 'off', at: a.at('youtube'), strike: a.at('youtube') + 0.2 }, { l: 'autoplay, netflix', r: 'off', at: a.at('netflix'), strike: a.at('netflix') + 0.2 }], { fs: V(34, 28) });
      prt(t, 'tv choose', 'ht_tvlegs', V(1220, 300), V(50, 760), V(820, 640), { at: a.t, from: [80, 0], cr: 'TV: Sven Scheuermeier, CC0', screen: (sx, sy, sw, sh) => {
        if (t < c.t) { rect(sx, sy, sw, sh, '#C9C4B4'); _txt('EPISODE 1', sx + sw * 0.08, sy + sh * 0.88, MONO(sw * 0.06), RC.ink); return; }
        _txt('EPISODE 1 HAS ENDED', sx + sw / 2, sy + sh * 0.28, MONO(sw * 0.055), RC.inkMid, 'center');
        fillRR(sx + sw * 0.08, sy + sh * 0.42, sw * 0.4, sh * 0.2, sh * 0.1, '#E9E6DD'); _txt('Next episode', sx + sw * 0.28, sy + sh * 0.545, FT(700, sw * 0.05), RC.ink, 'center');
        fillRR(sx + sw * 0.52, sy + sh * 0.42, sw * 0.4, sh * 0.2, sh * 0.1, t > d.at('stop') ? RC.ink : '#E9E6DD'); _txt('Stop here', sx + sw * 0.72, sy + sh * 0.545, FT(700, sw * 0.05), t > d.at('stop') ? RC.paper : RC.ink, 'center'); } });
    }, { id: 'autoplayoff', feed: true, push: 0.012 });
    sTick(a.at('youtube') + 0.2, -2); sTick(a.at('netflix') + 0.2, -4); sTick(d.at('stop'), -4); sMark(b.at('stopping'), -4);
  }
  /* ---- 70 notifications you don't need: off, one by one ---- */
  {
    const a = PH("turn off the notifications you don't need"); const b = PH('i mean notifications that you know that you do not need');
    const c = PH("you will not die if you don't get these notifications immediately coming"); const d = PH('turn it off');
    addR(a.t - 0.1, (t) => {
      if (t < c.t) stack(t, null, 'Turn off the notifications you don’t need.', { t2: TW(a, 'Turn off the notifications you don’t need.'), size: V(110, 96), maxW: V(860, 940), key2: 'dont need' });
      else stack(t, 'You will not', '*die* if you don’t get these notifications immediately.', { t1: TW(c, 'You will not'), t2: TW(c, 'die if you don’t get these notifications immediately.'), ev: [c.at('die')], size: V(96, 84), maxW: V(860, 940), key2: 'die' });
      [['SHOP', 'Deals ending tonight', a.at('notifications') + 0.1], ['NEWS', 'Breaking: something happened', b.at('know')], ['GAME', 'Your reward is waiting', b.at('need')], ['WORK CHAT', 'Meeting moved to 3pm', null], ['FEED', 'Someone posted a story', d.at('off')]].forEach(([app, l, off], i) => {
        const x = V(1000 + (i % 2) * 40, 70 + (i % 2) * 30), y = V(70 + i * 168, 780 + i * 130), w = V(820, 900), h = V(140, 112);
        slip(t, 'nn ' + i, x, y, w, h, a.t + 0.1 + i * 0.12, (yy) => { _txt(app + ' · NOW', x + 30, yy + V(46, 38), MONO(V(28, 26)), RC.inkMid); _txt(l, x + 30, yy + V(106, 88), FT(700, V(44, 38)), RC.ink);
          if (off != null) { const q = MOTION.ease(t, off, 0.35, 'outQuint'); if (q > 0) rect(x + 20, yy + h * 0.55, (w - 40) * q, 8, RC.red); }
          else if (t > d.at('off')) _txt('KEEP', x + w - 30, yy + V(46, 38), MONO(V(30, 26)), RC.ink, 'right'); }, { rot: [-2, 1.5, -1, 2, -1.5][i], from: -60, col: '#FFFFFF' }); });
    }, { id: 'notifneed', push: 0.012 });
    sTick(a.at('notifications') + 0.1, -3); sTick(b.at('need'), -5); sMark(c.at('die'), -3); sTick(d.at('off'), -2);
  }
  /* ---- 71 move distracting apps off your home screen: the app slides to the next page ---- */
  {
    const a = PH('move your distracting app off your home screen');
    addR(a.t - 0.1, (t) => {
      stack(t, 'Move distracting apps off your', '*home screen.*', { t1: TW(a, 'Move distracting apps off your'), t2: TW(a, 'home screen.'), ev: [a.at('home')], size: V(140, 120), maxW: V(860, 940) });
      const m0 = a.at('off'); const mv = MOTION.ease(t, m0, 0.6, 'inOutQuart');
      { const sx = V(1060, 160), sy = V(70, 720), sw = V(700, 760), sh = V(860, 720); slip(t, 'home sheet', sx, sy, sw, sh, a.t - 0.1, () => {}, { rot: 1 });
        if (t > onCut(a.t - 0.1) + 0.05) themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(sx, sy, sw, sh); ctx.clip(); _txt('HOME SCREEN', sx + 36, sy + 56, MONO(V(30, 28)), RC.inkMid);
          const T_ = uiGrid(t, sx, sy + 40, sw, sh, { cols: 3, n: 9, top: sh * 0.06, fills: [RC.paper, '#55565C', '#3A3B41', '#77787E'] }); const T0 = T_[0];
          strokeRR(T0.x, T0.y + 0, T0.s, T0.s, T0.s * 0.24, '#C9C4B4', 4);
          const tx = T0.x + mv * sw * 1.1; fillRR(tx, T0.y, T0.s, T0.s, T0.s * 0.24, RC.ink); badge(tx + T0.s * 0.96, T0.y + T0.s * 0.04, '12', T0.s / 150, 1); ctx.restore();
          circle(sx + sw / 2 - 24, sy + sh - 40, 9, RC.ink); circle(sx + sw / 2 + 24, sy + sh - 40, 9, t > m0 + 0.4 ? RC.ink : '#BDB8AA'); }); }
      if (t > m0 + 0.5) stamp(t, 'Page 2', V(1560, 760), V(860, 1330), m0 + 0.5, { size: V(50, 44), rot: -6 });
    }, { id: 'homescreen', push: 0.012 });
    sSwipe(a.at('off') + 0.3, -6);
  }
  /* ---- 72 the app blocker: several mountains and some valleys to get to Instagram ---- */
  {
    const a = PH("i use an app a software app blocker that i've been using since the start of this year"); const b = PH('i pay for the yearly subscription in january');
    const c = PH('if i want to use instagram right now i have to go through several mountains or some valleys to access instagram'); const d = PH('so that stops me');
    addR(a.t - 0.12, (t) => {
      stack(t, 'I use an', '*app blocker.*', { t1: TW(a, 'I use an'), t2: TW(a, 'app blocker.'), ev: [a.at('blocker')], size: V(140, 120), maxW: V(860, 940) });
      receipt(t, 'blocker', V(1180, 70), V(0, SAFE.contentTop + 300), V(640, 600), [{ l: 'app blocker', at: a.at('blocker') }, { l: 'yearly subscription', small: true, at: b.at('yearly') }, { l: 'paid in', r: 'january', small: true, at: b.at('january') }], { fs: V(32, 28) });
      // the ridge print; a dotted route from you to the app climbs over it on "mountains" / "valleys"
      const mh = V(420, 320), mw = mh * 1400 / 439, mx = V(110, -200), my = V(450, 900);
      prt(t, 'mountains', 'ht_mountains', mx, my, mh, { at: a.t + 0.3, from: [0, 60], cr: 'Mountains: Agnes Wästlund, CC0', crx: V(110, 70) });
      const x0 = mx + mw * 0.05, x1 = mx + Math.min(mw * 0.95, V(1800, 1000) - mx), y0 = my + mh * 0.85, pts = [];
      for (let i = 0; i <= 120; i++) { const u = i / 120; pts.push([lerp(x0, x1, u), y0 - Math.abs(Math.sin(u * Math.PI * 3)) * mh * 0.6 * (0.6 + 0.4 * Math.sin(u * 7 + 1))]); }
      const p = MOTION.ease(t, c.at('mountains') - 0.3, c.at('access') - c.at('mountains') + 0.3, 'inOutQuart');
      if (p > 0) themeFixed(() => { ctx.save(); ctx.setLineDash([14, 10]); ctx.strokeStyle = RC.white; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.max(2, Math.round(pts.length * p)); pts.slice(0, n).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
        const [hx, hy] = pts[Math.max(0, Math.round((pts.length - 1) * p))]; circle(hx, hy, 16, RC.red); });
      if (t > a.at('blocker')) themeFixed(() => { fillRR(x1 - 50, y0 - 50, 100, 100, 24, RC.ink); _txt('Instagram', x1, y0 + 90, MONO(26), RC.white, 'center'); _txt('You', x0, y0 + 60, MONO(26), RC.white, 'center'); circle(x0, y0, 22, RC.white); });
      if (t > d.at('stops')) stamp(t, 'That stops me', V(110, 70), V(330, 1290), d.at('stops'), { size: V(40, 36) });
    }, { id: 'blocker', push: 0.012 });
    sPrint(a.at('blocker'), -3); sPrint(b.at('yearly'), -6); sPaper(a.t + 0.3, -6); sMark(c.at('mountains') - 0.3, -6); sStamp(d.at('stops'), -4);
  }
  /* ---- 73 ask yourself: what do I need right now? ---- */
  {
    const a = PH('and also before you open an app i know that this is a lot of work mental work but just simply ask yourself');
    const b = PH("i'm opening instagram what do i need from instagram right now"); const c = PH('what do i need from tiktok right now');
    const d = PH('do i want to reply to someone'); const e = PH('do i want to post something'); const f = PH('or do i just want to scroll');
    addR(a.t - 0.12, (t) => {
      stack(t, 'Before you open an app, simply', '*ask yourself.*', { t1: TW(a, 'before you open an app, simply'), t2: TW(a, 'ask yourself.'), ev: [a.at('ask')], size: V(140, 120), maxW: V(860, 940) });
      if (t > b.at('need')) rich(t, 'What do I need from it right now?', { x: V(110, 70), y: V(470, 770), size: V(64, 56), maxW: V(860, 940), times: TW(b, 'What do I need from it right now?'), key: 'what need' });
      { const op = t > c.t ? 'OPENING TIKTOK' : t > b.at('opening') ? 'OPENING INSTAGRAM' : ''; if (op) lab(op, V(1060, 70), V(150, 1000), { col: RC.mark });
        [['Reply to someone?', d.at('reply')], ['Post something?', e.at('post')], ['Or just scroll?', f.at('scroll')]].forEach(([l, at], i) => { const x = V(1060, 70), y = V(200 + i * 200, 1040 + i * 140), w = V(760, 940), h = V(160, 120);
          slip(t, 'ask ' + i, x, y, w, h, at - 0.1, (yy) => { const on = i === 2 && t > at + 0.3; if (on) fillRR(x, yy, w, h, 6, RC.ink); _txt(l, x + 40, yy + h * 0.62, FT(700, V(60, 52)), on ? RC.paper : RC.ink); }, { rot: [-1.5, 1, -1][i], from: -70 }); }); }
    }, { id: 'askyourself', push: 0.012 });
    sPaper(a.t + 0.05, -6); sMark(a.at('ask'), -4); sTick(d.at('reply'), -5); sTick(e.at('post'), -5); sTick(f.at('scroll'), -2);
  }
  /* ---- 74 THE TEAR: your attention is an asset (the receipt that started it tears off) ---- */
  {
    const a = PH('your attention is an asset'); const h_ = PH('your phone is designed to hold your attention', { peek: true });
    addR(a.t - 0.5, (t) => {
      const rx = V(1180, 70), ry = V(0, 980), rw = V(640, 940), T = a.at('asset') - 0.12;
      const rows = [{ l: 'receipt', center: true, big: true }, { rule: true }, { l: 'instagram', r: '$0.00' }, { l: 'tiktok', r: '$0.00' }, { l: 'facebook', r: '$0.00' }, { rule: true }, { l: 'paid with:', small: true }, { l: 'your attention', big: true, hl: a.t - 0.35 }];
      const fsz = V(36, 28); const tot = receipt(-1e9, 'asset receipt', rx, ry, rw, rows, { fs: fsz, full: true, at: a.t - 0.5 }).h; const cutY = ry + tot * 0.63;
      const strain = t > T && t < T + 0.12 ? Math.sin((t - T) * 160) * 3 : 0; const q = MOTION.ease(t, T + 0.12, 0.75, 'outQuint');
      const piece = (top) => { ctx.save(); ctx.beginPath(); const n = 18; if (top) { ctx.moveTo(rx - 80, -2000); ctx.lineTo(rx + rw + 80, -2000); ctx.lineTo(rx + rw + 80, cutY); } else { ctx.moveTo(rx - 80, 4000); ctx.lineTo(rx + rw + 80, 4000); ctx.lineTo(rx + rw + 80, cutY); }
        for (let i = n; i >= 0; i--) ctx.lineTo(rx - 80 + (i / n) * (rw + 160), cutY + (i % 2 ? 9 : -9)); ctx.closePath(); ctx.clip();
        if (top) { ctx.translate(rx + rw / 2, cutY); ctx.rotate(-q * 5 * Math.PI / 180); ctx.translate(-rx - rw / 2, -cutY); ctx.translate(strain, -q * (cutY + 120)); }
        else { ctx.translate(rx + rw / 2, cutY); ctx.rotate(q * 7 * Math.PI / 180); ctx.translate(-rx - rw / 2, -cutY); ctx.translate(-strain + q * V(-60, 40), q * V(150, 120)); }
        receipt(t, 'asset receipt' + (top ? '' : ' stub'), rx, ry, rw, rows, { fs: fsz, full: true, at: a.t - 0.5, slot: false }); ctx.restore(); };
      piece(true); piece(false);
      if (ry > 4) themeFixed(() => fillRR(rx - 30, ry - 14, rw + 60, 22, 11, RC.slot));
      stack(t, 'Your attention is', 'an *asset.*', { t1: TW(a, 'Your attention is'), t2: TW(a, 'an asset.'), ev: [a.at('asset')], size: V(250, 200), maxW: V(1040, 940), y: V(160, SAFE.contentTop + 10) });
      if (t > h_.t - 0.05) rich(t, 'Your phone is designed to *hold* it.', { x: V(110, 70), y: V(640, 860), size: V(64, 56), maxW: V(1000, 940), times: TW(h_, 'Your phone is designed to hold it.'), ev: [h_.at('hold')], key: 'hold it' });
    }, { id: 'asset', push: 0.03 });
    sMark(a.t - 0.35, -6); sTear(a.at('asset') - 0.02, 2); sHit(a.at('asset') + 0.1, -4);
  }
  /* ---- 75 designed to hold your attention: what pays for these apps ---- */
  {
    const a = PH('your phone is designed to hold your attention'); const b = PH('your attention is what pays for a lot of these apps');
    const startPays = b.t - 0.15;
    const c = PH('and the techniques that are being used to hold your attention they are intentionally crafted'); const d = PH('you need to know that');
    addR(startPays, (t) => {
      stack(t, 'Your attention is what', '*pays* for a lot of these apps.', { t1: TW(b, 'Your attention is what'), t2: TW(b, 'pays for a lot of these apps.'), ev: [b.at('pays')], size: V(110, 96), maxW: V(880, 940) });
      receipt(t, 'pays', V(1040, 70), V(60, 990), V(800, 940), [{ l: 'your phone', r: 'holds your attention', at: a.at('hold') }, { l: 'your attention', r: 'pays for the apps', at: b.at('pays') }, { l: 'the techniques', r: 'intentionally crafted', at: c.at('intentionally'), hl: c.at('crafted') }, { rule: true, at: d.t }, { l: 'you need to know that.', big: true, at: d.at('know') }], { fs: V(32, 26) });
      prt(t, 'pays chips', 'ht_chips', V(110, 520), V(420, 640), V(500, 300), { at: a.t, from: [-60, 0], rot: -3, cr: 'Chips: Tim Reckmann, CC BY 2.0', crx: V(110, 520) });
    }, { id: 'pays', push: 0.02 });
    sPaper(startPays + 0.05, -6); sCash(b.at('pays'), -6); sPrint(c.at('intentionally'), -3); sBell(d.at('know'), -4);
  }
  /* ---- 76 one hour, two hours: the clock rolls; people are working so hard ---- */
  {
    const a = PH("so the next time you're scrolling for one hour two hour"); const b = PH("i hope you're able to remember that there are people that intentionally put things in place");
    const c = PH("they're all working so hard for you to stay on instagram"); const d = PH("they're working so hard for you to stay on tiktok");
    addR(a.t - 0.1, (t) => {
      const r1 = a.at('one'), r2 = a.at('two');
      if (t < b.t) stack(t, 'The next time you’re scrolling for', 'one hour, two hours…', { t1: TW(a, 'The next time you’re scrolling for'), t2: TW(a, 'one hour, two hours…'), size: V(120, 104), maxW: V(860, 940), key2: 'hours' });
      else stack(t, 'There are people who intentionally put these things in place.', 'They’re all working *so hard* for you to stay on Instagram, on TikTok.', { t1: TW(b, 'There are people who intentionally put these things in place.'), t2: TW(c, 'They’re all working so hard for you to stay on Instagram,').concat(TW(d, 'on TikTok.')), ev: [c.at('hard')], size: V(80, 70), maxW: V(860, 940), key2: 'so hard' });
      if (t > b.t) stamp(t, 'Still scrolling', V(1010, 70), V(860, 1380), b.t, { size: V(46, 40), rot: -5 });
      uiClockRoll(t, V(1000, 60), V(0, 0), V(880, 960), V(1080, 1920), t < r2 ? '1:40' : '2:40', t < r1 ? '1:40' : t < r2 ? '2:40' : '3:40', t < r2 ? r1 : r2, { y: V(0.62, 0.62), k: V(0.42, 0.42), left: true, col: RC.white });
      if (t > r1) withA(clamp((t - r1) / 0.25), () => lab(t < r2 ? '+1 hour' : '+2 hours', V(1010, 70), V(780, 1300), { col: RC.mark }));
    }, { id: 'hours', feed: true, push: 0.02 });
    sClock(a.at('one'), -2); sClock(a.at('two'), -2); sMark(c.at('hard'), -4);
  }
  /* ---- 77 I hope you can drop it: the hand puts the phone down ---- */
  {
    const a = PH("and i hope that you're able to drop it when you want to"); const b = PH("it's not something that i've completely figured out either");
    const c = PH('but i would think that i use social media a little less than the average person at least from this year last year');
    addR(a.t - 0.1, (t) => {
      stack(t, 'I hope you’re able to', '*drop it* when you want to.', { t1: TW(a, 'I hope you’re able to'), t2: TW(a, 'drop it when you want to.'), ev: [a.at('drop')], size: V(140, 120), maxW: V(900, 940) });
      const down = MOTION.ease(t, a.at('drop'), 0.9, 'inOutQuart');
      void down; prt(t, 'drop desk', 'ht_desk', V(1180, 380), V(120, 980), V(780, 440), { at: a.at('drop'), from: [0, -260], rot: 2, rot0: -8, d: 0.6, cr: 'Phone: Julian O’hayon, CC0', crx: V(1180, 380) });
      receipt(t, 'figured', V(110, 70), V(600, 1240), V(860, 940), [{ l: 'not completely', r: 'figured out', at: b.at('figured') }, { l: 'less than average', r: 'this year', small: true, at: c.at('average') }], { fs: V(32, 28) });
    }, { id: 'dropit', push: 0.015 });
    sMark(a.at('drop'), -3); sPaper(a.at('drop') + 0.5, -4); sPrint(b.at('figured'), -4); sPrint(c.at('average'), -5);
  }
  /* ---- 78 fought over by corporations: every badge climbs ---- */
  {
    const a = PH('but i really do hope that everyone gets into this idea and understand that your attention is an asset');
    const b = PH('and it is literally being fought over by different corporations');
    addR(a.t - 0.1, (t) => {
      stack(t, 'Your attention is literally being', '*fought over* by different corporations.', { t1: TW(a, 'Your attention').concat(TW(b, 'is literally being')), t2: TW(b, 'fought over by different corporations.'), ev: [b.at('fought')], size: V(110, 96), maxW: V(880, 940) });
      const f0 = b.at('fought'); const badges = {}; for (let i = 0; i < 9; i++) badges[i] = [(tt) => String(3 + i * 7 + Math.max(0, Math.floor((tt - f0 - i * 0.1) / 0.2))), f0 + i * 0.12];
      void badges; { const cx = V(1420, 540), cy = V(580, 1120), pull = (t > f0 ? Math.sin((t - f0) * 5.2) * 34 + Math.sin((t - f0) * 3.1) * 18 : 0);
        const tags = [['COMPANY A', V(-430, -400), V(-330, -330), f0 + 0.15], ['COMPANY B', V(330, 300), V(-330, -330), f0 + 0.4], ['COMPANY C', V(0, 0), V(330, 300), f0 + 0.65]];
        tags.forEach(([l, dx, dy, at]) => { if (t < at) return; const q = MOTION.ease(t, at, 0.4, 'outQuint'); const tx = cx + dx * q + pull * Math.sign(dx || 1) * 0.4, ty = cy + dy * q;
          themeFixed(() => { ctx.save(); ctx.strokeStyle = RC.white; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + pull, cy); ctx.lineTo(tx, ty); ctx.stroke(); ctx.restore();
            slip(t, 'tag ' + l, tx - 150, ty - 40, 300, 80, at, (yy) => _txt(l, tx, yy + 52, MONO(32), RC.ink, 'center'), { zig: false, rot: dx > 0 ? 4 : -4, from: 0 }); }); });
        slip(t, 'attention stub', cx - V(230, 230) + pull, cy - 70, V(460, 460), 140, a.t, (yy) => { _txt('PAID WITH:', cx - V(200, 200) + pull, yy + 50, MONO(26), RC.inkMid); _txt('YOUR ATTENTION', cx - V(200, 200) + pull, yy + 104, MONO(V(40, 40)), RC.ink); }, { zig: true, rot: -2 }); }
    }, { id: 'fought', push: 0.015 });
    sPop(b.at('fought'), -2); sPop(b.at('fought') + 0.6, -5); sPrint(b.at('fought') + 0.2, -6); sPrint(b.at('fought') + 0.7, -6);
  }
  /* ---- 79 PUNCH: take it back (the paper fills the frame) ---- */
  {
    const a = PH('and you need to take it back'); const b = PH('for yourself'); const c = PH('for the people who love you'); const d = PH('the people that you love');
    const e = PH('for the things that are important in your life');
    addR(a.t - 0.08, (t) => {
      punch(t, 'Take it *back.*', { times: TW(a, 'Take it back.'), ev: [a.at('back')], size: V(200, 170), y: V(120, SAFE.contentTop + 20) });
      receipt(t, 'take back', V(110, 70), V(470, 820), V(1240, 940), [{ l: 'take it back', center: true, big: true, at: a.at('back') + 0.2 }, { rule: true, at: a.at('back') + 0.2 },
        { l: 'for yourself', at: b.t }, { l: 'for the people who love you', at: c.t }, { l: 'for the people that you love', at: d.t }, { l: 'for what is important in your life', at: e.t, hl: e.at('important') }], { fs: V(40, 34) });
    }, { id: 'takeback', ground: 'slip', push: 0.02 });
    sHit(a.at('back'), -2); sPrint(b.t, -6); sPrint(c.t, -6); sPrint(d.t, -6); sPrint(e.t, -6);
  }
}
/* ---- the end card (outro): the phone in the hand again, and her thesis on the receipt (no handle: her note 2026-10-17) ---- */
function buildEnd() {
  const end = INTRO + FILM.man.voiceDuration + 0.4;
  addR(end, (t) => {
    stack(t, 'Your phone was intentionally and strategically', 'designed to distract you.', { t1: [end + 0.2], t2: [end + 0.5], size: V(140, 118), maxW: V(980, 940), mode1: 'drop', mode: 'drop' });
    // the payoff: the torn stub from the asset screen, "paid with: your attention", struck through and stamped
    { const x = V(1160, 120), y = V(300, 960), w = V(640, 840);
      slip(t, 'end stub', x, y, w, V(260, 240), end + 0.1, (yy) => { _txt('PAID WITH:', x + 40, yy + 70, MONO(V(32, 30)), RC.inkMid); _txt('YOUR ATTENTION', x + 40, yy + 150, MONO(V(56, 52)), RC.ink);
        const q = MOTION.ease(t, end + 1.0, 0.4, 'outQuint'); if (q > 0) rect(x + 30, yy + 132, (w - 60) * q, 8, RC.ink); }, { zig: true, rot: 4, from: 120, rot0: 10 });
      stamp(t, 'Taken back', x + V(260, 380), y + V(190, 170), end + 1.5, { onPaper: true, col: RC.red, size: V(60, 56), rot: -9 }); }
  }, { id: 'end', push: 0.02 });
  sPaper(end + 0.1, -4); sStamp(end + 1.5, -4);
}

/* phone-distraction · part 1 (0:00-3:36): the hook, the plan, the attention economy, persuasive technology. */
'use strict';
function buildS1() {
  /* ---- 01 hook: the lock screen at 1:20, her first line arrives as a notification ---- */
  {
    const a = PH('your phone was intentionally and strategically designed to distract you');
    addL(0, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '1:20', '1:20', null, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      banner(t, 'Your phone was _intentionally_ and _strategically_ designed to *distract* you.', { x: LY.bx, y: V(160, 900), w: LY.bw, at: a.t - 0.1, ev: [a.at('intentionally'), a.at('strategically'), a.at('distract')] }); homeBar();
    }, { id: 'hook', push: 0.04, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.1 + 0.05); sMark(a.at('intentionally')); sHit(a.at('distract'), -3);
  }
  /* ---- 02 twenty minutes later: pull, the clock rolls 1:20 -> 1:40, banners stack ---- */
  {
    const a = PH('the reason why you pick it up to do one thing');
    const b = PH('and 20 minutes later'); const c = PH("you're doing a million and one other thing");
    const d = PH("and you're forgetting the one thing that you wanted to do");
    const items = [B(a, 'You pick it up to do *one thing.*', ['one']), B(c, "You're doing a *million and one* other things.", [c.at('million')]),
      B(d, "And you're forgetting the *one thing* you wanted to do.", [d.at('one')])];
    addL(a.t - 0.2, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '1:20', '1:40', b.at('20') + 0.1, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, items, { x: LY.bx, y: V(160, 900), w: LY.bw, keep: V(3, 2) }); homeBar();
    }, { id: 'later', pull: true, push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sClock(b.at('20') + 0.1); sNotify(c.t - 0.06); sPop(c.at('million'), -4); sNotify(d.t - 0.06, -2);
  }
  /* ---- 03 her name: a contact card ---- */
  {
    const a = PH('my name is gbemisola'); const b = PH("and i'm currently doing my master's in humancomputer interaction");
    addL(a.t - 0.15, (t) => {
      headline(t, 'My name is *Gbemisola.*', { times: TW(a, 'My name is Gbemisola.'), ev: [a.at('gbemisola')], y: V(300, SAFE.contentTop + 40) });
      contact(t, 'her card', V(880, 60), V(300, 640), V(920, 960), a.at('gbemisola') - 0.05, 'GO', 'Gbemisola Oladetoun',
        ["Master's student, human-computer interaction"], { lineAt: [b.at("master's") - 0.1, b.at('interaction') + 0.3], lead: true });
      homeBar();
    }, { id: 'name', push: 0.015 });
    sPop(a.at('gbemisola')); sTick(b.at("master's"));
  }
  /* ---- 04 the plan: what this video covers ---- */
  {
    const a = PH("in this video i'm going to show you"); const r1 = PH('why your attention is worth so much money');
    const r1b = PH('because people and corporations make a lot of money just from you scrolling'); const r2 = PH('where the design ideas'); const r3 = PH('the actual features'); const r4 = PH('the people who built them'); const r5 = PH('what you can actually do about it');
    addL(a.t - 0.12, (t) => {
      headline(t, 'In this video', { times: TW(a, 'In this video'), y: V(170, SAFE.contentTop + 10) });
      listCard(t, 'plan', V(880, 60), V(170, 540), V(920, 960), ['Why your attention is worth money', 'Where the design ideas come from', 'The features that keep you stuck', 'The people who built them', 'What you can do about it'],
        [r1.t, r2.t, r3.t, r4.t, r5.t], { cur: true });
      if (t > r1.at('money') && t < r1b.at('corporations')) credit('Your attention is worth a lot of money.', V(120, 70), V(420, 1240), V(680, 940), { size: 40, col: PD.text });
      if (t > r1b.at('corporations') && t < r2.t + 0.2) credit('People and corporations make a lot of money just from you scrolling.', V(120, 70), V(420, 1240), V(680, 940), { size: 40, col: PD.text });
      homeBar();
    }, { id: 'plan', push: 0.015 });
    [r1, r2, r3, r4, r5].forEach((r, i) => sTick(r.t, i ? -4 : -2));
  }
  /* ---- 05 the attention economy: a pull into the first chapter ---- */
  {
    const a = PH('so understand why your phone is designed to distract you'); const b = PH('you first have to understand something called the attention economy');
    addL(a.t - 0.1, (t) => {
      headline(t, 'You first have to understand the *attention economy.*', { times: TW(b, 'You first have to understand the attention economy.'), ev: [b.at('attention')], maxW: V(1700, 960), size: V(140, 110), y: V(260, SAFE.contentTop + 200), mode: 'drop' });
      homeBar();
    }, { id: 'economy', pull: true, push: 0.03 });
    sMark(b.at('attention'));
  }
  /* ---- 06 Herbert Simon, 1971 ---- */
  {
    const a = PH('back in 1971'); const b = PH('an economist called herbert simon'); const c = PH('who later won a nobel prize');
    addL(a.t - 0.12, (t) => {
      bigWidget(t, '1971', V(120, 70), V(170, SAFE.contentTop + 10), V(560, 940), a.at('1971') - 0.05, 'The year', '1971', null, { vsize: V(230, 220) });
      contact(t, 'simon', V(880, 60), V(170, 820), V(920, 960), b.at('herbert') - 0.1, 'HS', 'Herbert Simon', ['Economist', 'Nobel Prize in economics, 1978'], { lineAt: [b.at('economist'), c.at('nobel')], h: 260 });
      homeBar();
    }, { id: 'simon', push: 0.015 });
    sTick(a.at('1971')); sPop(b.at('herbert'), -3); sCash(c.at('nobel'), -6);
  }
  /* ---- 07 the quote ---- */
  {
    const a = PH('a wealth of information creates a poverty of attention');
    addL(a.t - 0.25, (t) => {
      quoteCard(t, 'simon quote', V(240, 60), V(250, SAFE.contentTop + 120), V(1440, 960), a.t - 0.2, '“A wealth of information creates a *poverty of attention.*”',
        'Herbert Simon, “Designing Organizations for an Information-Rich World”, 1971', { size: V(84, 70), ev: [a.at('poverty')] });
      homeBar();
    }, { id: 'quote', push: 0.02 });
    sShut(a.t - 0.2, -2); sMark(a.at('poverty'));
  }
  /* ---- 08 information everywhere, attention scarce: a flood of notifications drains an attention meter ---- */
  {
    const a = PH('what he meant was that information is everywhere'); const b = PH('the thing that has now become scarce is your attention'); const c = PH('only so much of human attention to go around');
    const heads = ['Mail', 'News', 'Chat', 'Shop', 'Video', 'Feed', 'Maps', 'Bank', 'Music', 'Clips'];
    const lines = ['3 new messages', 'Breaking: a story you might like', 'Someone mentioned you', 'Your order is on its way', 'New video for you', '12 new posts', 'Leave now to arrive on time', 'Your weekly summary', 'A new song for you', 'You have a memory from today'];
    const t0 = a.at('information'), step = 0.85;
    addL(a.t - 0.12, (t) => {
      headline(t, 'Information is everywhere. What has become scarce is your *attention.*', { times: TW(a, 'Information is everywhere.').concat(TW(b, 'What has become scarce is your attention.')), ev: [b.at('attention')], y: V(170, SAFE.contentTop + 10), maxW: V(700, 940) });
      // the attention meter (illustration)
      const my = V(640, 760), mw = V(620, 940); const n = clamp(Math.floor((t - t0) / step) + 1, 0, heads.length);
      const lvl = 1 - 0.085 * n - 0.1 * MOTION.ease(t, c.at('only'), 1.2, 'outQuint');
      card(t, 'meter', V(120, 70), my, mw, 190, t0 - 0.3, (yy) => { lab('Attention left', V(160, 110), yy + 66); bar(V(160, 110), yy + 110, mw - 80, 34, lvl, lvl < 0.3 ? PD.red : PD.text); _txt(Math.round(lvl * 100) + ' %', V(160, 110) + mw - 80, yy + 66, FT(600, 34), PD.text, 'right'); });
      // the flood (illustration): banners drop every 0.42 s
      const items = heads.map((h, i) => ({ s: lines[i], at: t0 + i * step, head: h, when: 'now', size: V(48, 46) }));
      bannerStack(t, items, { x: LY.bx, y: V(150, 990), w: LY.bw, keep: V(6, 2), bottom: V(H - 120, 1440) });
      illus(); homeBar();
    }, { id: 'flood', push: 0.015 });
    for (let i = 0; i < 10; i += 4) sNotify(t0 + i * step, -2); sMark(b.at('attention'), -2);
  }
  /* ---- 09 traded like currency ---- */
  {
    const a = PH('so the attention economy is a system where human attention is treated as a scarce valuable thing'); const b = PH("and it's traded like currency");
    addL(a.t - 0.12, (t) => {
      headline(t, 'Human attention is treated as a *scarce, valuable* thing, and it’s _traded_ like *currency.*', { times: TW(a, 'Human attention is treated as a scarce, valuable thing,').concat(TW(b, 'and it’s traded like currency.')), ev: [a.at('scarce'), b.at('traded'), b.at('currency')], maxW: V(1300, 940), size: V(92, 78), y: V(260, SAFE.contentTop + 100) });
      // a lock-screen wallet card: "Attention" with a price that never settles (illustration)
      card(t, 'wallet', V(1180, 70), V(700, 1040), V(620, 940), 170, b.at('currency') - 0.1, (yy) => {
        lab('Wallet', V(1220, 110), yy + 62); _txt('Your attention', V(1220, 110), yy + 130, FT(600, 52), PD.text);
        if (t > b.at('currency')) withA(MOTION.ease(t, b.at('currency'), 0.3, 'outExpo'), () => _txt('$ ?', V(1760, 970), yy + 130, FT(600, 56), PD.red, 'right'));
      }); homeBar();
    }, { id: 'currency', push: 0.02 });
    sCash(b.at('currency'));
  }
  /* ---- 10 free apps ---- */
  {
    const a = PH('now think about our social media apps make their money'); const b = PH("you don't pay instagram to use instagram");
    const c = PH("you don't pay tiktok"); const d = PH("you don't pay facebook"); const e = PH('people call it a free service'); const f = PH('but in a way it is monetised');
    addL(a.t - 0.12, (t) => {
      headline(t, 'You don’t pay Instagram to use *Instagram.*', { times: TW(b, 'You don’t pay Instagram to use Instagram.'), y: V(170, SAFE.contentTop + 10), maxW: V(720, 940) });
      // an app list (names only, no logos): price tags arrive on her words; "Free" gets underlined on "free service", then a red asterisk on "monetised"
      const rows = [['Instagram', b.at('instagram')], ['TikTok', c.at('tiktok')], ['Facebook', d.at('facebook')]];
      const x = V(880, 60), y = V(170, 540), w = V(920, 960), rh = V(150, 130);
      card(t, 'apps', x, y, w, rh * 3 + 30, b.at('instagram') - 0.25, (yy) => {
        rows.forEach(([n, at], i) => { if (t < at) return; const ry = yy + 15 + i * rh; withA(clamp((t - at) / 0.25), () => {
          fillRR(x + 40, ry + 25, 100, 100, 23, PD.tiles[i + 1]); txt(n, x + 170, ry + 92, FT(600, 52), PD.text, 'left', 'alphabetic', -1);
          fillRR(x + w - 230, ry + 42, 190, 66, 33, '#2C2F36'); _txt('Free', x + w - 135, ry + 87, FT(600, 38), PD.text, 'center');
          const u = MOTION.ease(t, e.at('free') + i * 0.08, 0.35, 'outExpo'); if (u > 0) rect(x + w - 190, ry + 118, 110 * u, 6, PD.red);
          if (t > f.at('monetised') + i * 0.1) { const s = MOTION.spring(t - f.at('monetised') - i * 0.1, 0.5, 2.6); withT(x + w - 40, ry + 44, s, 0, () => _txt('*', 0, 30, FT(700, 64), PD.red, 'center')); }
          if (i < 2) rect(x + 40, ry + rh, w - 80, 2, PD.line);
        }); });
      });
      banner(t, 'People call it a free service, but in a way it is *monetised.*', { x: LY.lx, y: V(560, 1000), w: V(700, 960), at: f.t - 0.1, ev: [f.at('monetised')], size: V(48, 50) }); homeBar();
    }, { id: 'free', push: 0.015 });
    sPop(b.at('instagram'), -3); sPop(c.at('tiktok'), -4); sPop(d.at('facebook'), -4); sMark(e.at('free')); sCash(f.at('monetised'), -4);
  }
  /* ---- 11 ads: a feed with sponsored posts + three meters ---- */
  {
    const a = PH('they make money from your engagement and your attention by selling targeted advertisement');
    const b = PH('so the more time you spend on the app'); const c = PH('the more ads you see'); const d = PH('the more the app learns about you');
    addL(a.t - 0.15, (t, lt) => {
      const px = V(150, 300), py = V(110, SAFE.contentTop), pw = V(440, 480), ph = V(860, 600);
      phone('feed phone', px, py, pw, ph, (sx, sy, sw, sh) => feed(sx, sy, sw, sh, 40 + lt * 95, { ad: (i) => i % 3 === 1 }));
      const x = V(760, 70), w = V(1040, 940);
      headline(t, 'They make money by selling *targeted ads.*', { times: TW(a, 'They make money by selling targeted ads.'), x, y: V(140, 1000), maxW: w, size: V(72, 58) });
      [['Time you spend on the app', b.at('time')], ['Ads you see', c.at('ads')], ['What the app learns about you', d.at('learns')]].forEach(([l, at], i) => {
        const y = V(470, 1200) + i * V(150, 92); if (t < at - 0.2) return;
        withA(clamp((t - at + 0.2) / 0.25), () => { txt(l, x, y, FT(500, V(44, 40)), PD.text); bar(x, y + V(30, 22), w, V(26, 22), 0.15 + 0.8 * MOTION.ease(t, at, 2.6, 'outQuint') * (0.9 + 0.1 * Math.sin(i))); });
      });
      illus(V(150, 70), V(1010, SAFE.contentTop - 30));
    }, { id: 'ads', push: 0.012 });
    sCash(a.at('selling'), -5); sTick(b.at('time'), -3); sTick(c.at('ads'), -4); sTick(d.at('learns'), -4);
  }
  /* ---- 12 being sold ---- */
  {
    const a = PH("it's your time and your attention that are actually being sold in a way"); const b = PH("and that's why so many of these apps are built to keep you in them for as long as possible");
    addL(a.t - 0.15, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '1:40', '1:52', b.at('long') - 0.2, { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(a, "It's your time and your attention that are actually being *sold.*", ['sold']), B(b, "That's why so many apps are built to keep you in them for as *long as possible.*", ['long'])], { x: LY.bx, y: V(160, 900), w: LY.bw });
      homeBar();
    }, { id: 'sold', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.1); sMark(a.at('sold')); sNotify(b.t - 0.1, -3); sClock(b.at('long') - 0.2);
  }
  /* ---- 13 PUNCH: your attention is the product (badge burst) ---- */
  {
    const a = PH('so your attention is in a way the product');
    addL(a.t - 0.08, (t) => {
      punch(t, 'Your attention is, in a way, the *product.*', { times: TW(a, 'Your attention is, in a way, the product.'), ev: [a.at('product')] });
    }, { id: 'product', ground: 'red', burst: () => [V(1640, 900), V(200, 520)], push: 0.03 });
    sHit(a.at('product'), -2);
  }
  /* ---- 14 persuasive technology ---- */
  {
    const a = PH("now technology can be designed in a way that changes people's behavior"); const b = PH('and this idea is called persuasive technology');
    addL(a.t - 0.1, (t) => {
      headline(t, 'Technology can be designed to change people’s behaviour.', { times: TW(a, 'Technology can be designed to change people’s behaviour.'), maxW: V(1500, 940), size: V(88, 76), y: V(260, SAFE.contentTop + 80) });
      headline(t, 'This is called *persuasive technology.*', { times: TW(b, 'This is called persuasive technology.'), ev: [b.at('persuasive')], maxW: V(1500, 940), size: V(88, 76), y: V(560, SAFE.contentTop + 560) });
      homeBar();
    }, { id: 'persuasive', pull: true, push: 0.02 });
    sMark(b.at('persuasive'));
  }
  /* ---- 15 B.J. Fogg, Stanford, the lab, the book ---- */
  {
    const a = PH('a lot of it traces back to a researcher at stanford university called bj fogg'); const b = PH('he ran a lab there called the persuasive technology lab');
    const c = PH('and later published a book on using computers to change what people think and do');
    addL(a.t - 0.12, (t) => {
      contact(t, 'fogg', V(120, 60), V(170, SAFE.contentTop + 10), V(820, 960), a.at('researcher') - 0.1, 'BF', 'B.J. Fogg', ['Researcher, Stanford University', 'Ran the Persuasive Technology Lab'], { lineAt: [a.at('stanford'), b.at('lab')], h: 260 });
      if (t < c.at('book') - 0.2) headline(t, 'It traces back to a researcher at *Stanford.*', { times: TW(a, 'traces back to a researcher at Stanford.'), ev: [a.at('stanford')], x: V(120, 70), y: V(500, 1100), size: V(56, 52), maxW: V(820, 940), mode: 'words' });
      // the book (drawn: a plain cover with its real title, labelled)
      const bx = V(1080, 300), by = V(160, 760), bw = V(470, 480), bh = V(680, 620);
      card(t, 'book', bx, by, bw, bh, c.at('book') - 0.05, (yy) => {
        rect(bx + 26, yy + 26, 10, bh - 52, PD.red);
        txtW('Persuasive Technology', bx + 64, yy + 110, FT(700, 58), PD.text, bw - 100, 60);
        txtW('Using Computers to Change What We Think and Do', bx + 64, yy + 290, FT(500, 36), PD.muted, bw - 100, 44);
        _txt('B.J. Fogg · 2003', bx + 64, yy + bh - 60, FT(600, 34), PD.text);
      }, { r: 18 });
      if (t > c.at('book')) lab('Cover drawn, real title', V(1080, 300), V(900, 1420), { size: 34 });
      homeBar();
    }, { id: 'fogg', push: 0.015 });
    sPop(a.at('researcher'), -3); sTick(b.at('lab'), -3); sShut(c.at('book') - 0.05, -3);
  }
  /* ---- 16 the 2007 class: apps pop, millions of users ---- */
  {
    const a = PH('to make it more interesting in 2007 bj fogg taught a famous class at stanford'); const b = PH('where students use these ideas to build apps');
    const c = PH('within weeks their apps had millions of users'); const d = PH('some of these students went on to build some of the popular apps that we now know');
    addL(a.t - 0.12, (t) => {
      bigWidget(t, '2007', V(120, 70), V(170, SAFE.contentTop + 10), V(600, 940), a.at('2007') - 0.05, 'Stanford', '2007', null, { vsize: V(220, 200) });
      const gx = V(880, 120), gy = V(170, 760);
      if (t < c.at('millions') - 0.2) headline(t, 'B.J. Fogg taught a *famous class* where students used these ideas to build apps.', { times: TW(a, 'B.J. Fogg taught a famous class').concat(TW(b, 'where students used these ideas to build apps.')), ev: [a.at('famous')], x: V(120, 70), y: V(540, 1160), size: V(50, 46), maxW: V(600, 940), mode: 'words' });
      homeGrid(t, { x: gx, y: gy, cols: 4, size: V(150, 170), gx: V(64, 70), gy: V(100, 110), pop: b.at('apps'), names: false, n: V(12, 8) });
      if (t > c.at('millions') - 0.1) {
        const k = MOTION.ease(t, c.at('millions') - 0.1, 0.4, 'outExpo');
        withA(k, () => { fillRR(V(120, 70), V(620, 1310) + (1 - k) * -30, V(600, 940), V(200, 150), BAN.r, PD.red);
          txt('Millions of users', V(160, 110), V(712, 1386) + (1 - k) * -30, FT(700, V(60, 58)), PD.onRed); txt('within weeks', V(160, 110), V(776, 1434) + (1 - k) * -30, FT(500, 36), PD.onRed); });
      }
      if (t > d.at('popular') && !PORTRAIT) credit('Some went on to build popular apps.', 880, 1000, 900);
    }, { id: 'class', push: 0.015 });
    sTick(a.at('2007')); sPop(b.at('apps'), -2); sHit(c.at('millions') - 0.1, -6);
  }
  /* ---- 17 the behaviour model: motivation, ability, prompt ---- */
  {
    const a = PH('bj fogg also described a simple model of behavior'); const b = PH('for someone to do something one they need motivation');
    const c = PH('two they need the ability to do it'); const d = PH('and three they need a prompt');
    addL(a.t - 0.12, (t) => {
      headline(t, 'A simple model of *behaviour.*', { times: TW(a, 'A simple model of behaviour.'), maxW: V(1500, 940), y: V(160, SAFE.contentTop + 10) });
      [['01', 'Motivation', b.at('motivation')], ['02', 'Ability', c.at('ability')], ['03', 'Prompt', d.at('prompt')]].forEach(([n, l, at], i) => {
        const x = V(120 + i * 570, 70), y = V(420, 640 + i * 260), w = V(540, 940), h = V(330, 220);
        card(t, 'model ' + l, x, y, w, h, at - 0.1, (yy) => { _txt(n, x + 40, yy + 70, FT(600, 34), i === 2 ? PD.red : PD.muted, 'left', 'alphabetic', 4); txt(l, x + 40, yy + V(230, 160), FT(600, V(84, 80)), PD.text, 'left', 'alphabetic', -2); });
      });
      lab('B.J. Fogg’s behaviour model', V(120, 70), V(1010, 1440));
    }, { id: 'model', push: 0.015 });
    sPop(b.at('motivation'), -3); sPop(c.at('ability'), -3); sPop(d.at('prompt'), -2);
  }
  /* ---- 18 a notification is the prompt, a tap the ability, curiosity the motivation ---- */
  {
    const a = PH('now thinking in terms of social apps think about a notification'); const b = PH('the notification is the prompt'); const c = PH('opening the app is the ability to do it');
    const d = PH('and that just takes a single tap'); const e = PH('and then the motivation'); const f = PH('is the curiosity about what is waiting for you there');
    addL(a.t - 0.12, (t) => {
      lockClock(t, V(110, CX), V(330, 600), V(220, 260), '1:52', '1:52', null, { align: V('left', 'center') });
      banner(t, 'Someone sent you something.', { x: V(110, 60), y: V(440, 700), w: V(740, 960), at: a.at('notification') - 0.05, head: 'Chat', when: 'now', size: V(52, 52) });
      tap(t, d.at('tap'), V(480, 540), V(540, 790));
      const rows = [['Prompt', 'a notification', b.at('prompt')], ['Ability', 'a single tap', d.at('tap')], ['Motivation', 'curiosity', f.at('curiosity'), e.t]];
      rows.forEach(([k, v, at, at0], i) => {
        const x = V(960, 60), y = V(160 + i * 280, 1010 + i * 150), w = V(840, 960), h = V(240, 130);
        card(t, 'why ' + k, x, y, w, h, (at0 || at) - 0.1, (yy) => { lab(k, x + 40, yy + V(70, 56)); if (t > at - 0.1) txt(v, x + 40, yy + V(170, 108), FT(600, V(72, 52)), i === 0 ? PD.red : PD.text, 'left', 'alphabetic', -1.5); });
      });
    }, { id: 'prompt', push: 0.012 });
    sNotify(a.at('notification') - 0.05); sMark(b.at('prompt'), -3); sTick(d.at('tap')); sPop(f.at('curiosity'), -3);
  }
  /* ---- 19 the students: Mike Krieger, Tristan Harris ---- */
  {
    const a = PH('and again some of these people who studied with bj fogg went on to shape the apps that we use today');
    const b = PH('mike krieger one of the cofounders of instagram was a student of his'); const c = PH('and so was tristan harris who later became one of the loudest critics of this kind of design');
    addL(a.t - 0.12, (t) => {
      headline(t, 'Some of his students went on to shape the apps we use *today.*', { times: TW(a, 'Some of his students went on to shape the apps we use today.'), maxW: V(1600, 940), size: V(76, 66), y: V(150, SAFE.contentTop + 10) });
      contact(t, 'krieger', V(120, 60), V(470, 760), V(820, 960), b.at('mike') - 0.1, 'MK', 'Mike Krieger', ['Co-founder of Instagram', 'Studied with B.J. Fogg'], { lineAt: [b.at('cofounders'), b.at('student')], h: 260 });
      contact(t, 'harris', V(980, 60), V(470, 1060), V(820, 960), c.at('tristan') - 0.1, 'TH', 'Tristan Harris', ['Studied with B.J. Fogg', 'Later one of the loudest critics'], { lineAt: [c.at('tristan') + 0.3, c.at('loudest')], h: 260, av: PD.red });
      if (t > c.at('design')) withA(clamp((t - c.at('design')) / 0.25), () => lab('Critic', V(1740, 980), V(560, 1150), { col: PD.red, align: 'right' }));
      credit('Sources: Stanford Review (Krieger); The Guardian, 2017 (Harris)', V(120, 70), V(1000, 1420), V(1600, 940));
    }, { id: 'students', push: 0.012 });
    sPop(b.at('mike'), -3); sPop(c.at('tristan'), -3); sMark(c.at('critics'), -3);
  }
  /* ---- 20 the ideas were real ---- */
  {
    const a = PH('this is not to demonise all of the things that these people did or taught'); const b = PH('but the ideas that he found and taught were real');
    const c = PH('and of course the industry picked up on them and made a shitload of money out of them');
    addL(a.t - 0.12, (t) => {
      lockClock(t, V(110, CX), V(520, 690), V(330, 360), '1:52', '2:07', c.at('industry'), { align: V('left', 'center') });
      txt('Tuesday', V(128, CX), V(610, 790), FT(500, V(36, 40)), PD.muted, V('left', 'center'));
      bannerStack(t, [B(a, 'This is not to demonise all of the things these people did or taught.'), B(b, 'But the ideas he found and taught were *real.*', ['real']),
        B(c, 'And the industry picked up on them and made a s***load of *money* out of them.', ['money'])], { x: LY.bx, y: V(160, 900), w: LY.bw, keep: V(3, 2) });
      homeBar();
    }, { id: 'real', push: 0.02, anchor: () => [V(110, CX), V(420, 600)] });
    sNotify(a.t - 0.1, -3); sMark(b.at('real')); sCash(c.at('money'), -3);
  }
  /* ---- 21 curiosity: a hidden preview ---- */
  {
    const a = PH('the motivation is a very important one'); const b = PH('the curiosity that something on that app is waiting for you');
    addL(a.t - 0.12, (t) => {
      headline(t, 'The motivation is the *curiosity* that something is *waiting for you.*', { times: TW(a, 'The motivation is').concat(TW(b, 'the curiosity that something is waiting for you.')), ev: [b.at('curiosity'), b.at('waiting')], maxW: V(760, 940), y: V(220, SAFE.contentTop + 10) });
      // a notification whose preview is hidden
      const x = V(960, 60), y = V(380, 900), w = V(840, 960);
      card(t, 'hidden', x, y, w, 250, a.t, (yy) => {
        _txt('Feed', x + 40, yy + 58, FT(600, 34), PD.text); _txt('now', x + w - 40, yy + 58, FT(500, 34), PD.muted, 'right');
        _txt('Notification', x + 40, yy + 128, FT(600, 52), PD.text);
        fillRR(x + 40, yy + 160, w * 0.55, 30, 15, '#2C2F36'); fillRR(x + 40, yy + 200, w * 0.32, 30, 15, '#2C2F36');
        fillRR(x + w * 0.55 + 70, yy + 160, 30, 30, 15, PD.red);
      });
    }, { id: 'curiosity', push: 0.02 });
    sNotify(a.t, -4); sMark(b.at('curiosity'), -3);
  }
}

/* dark-patterns MOTION FILM (her pick C · Blown up + B's split as one scene type): pure motion on her cleaned voice.
 * The same phrases as the talking-head plan (DP_SENT in talking-head/moments/plan.js) and the same graphics (scenes/dp.js),
 * each full frame; where the edit shows her face, the film sets her words as type. New screen on her words (hard cut) or
 * through the magnifying glass (lens wipe) at each of the 11 patterns and each chapter. 16:9 + 9:16 from the same code. */
'use strict';
function buildFilm() {
  const s = {}; for (const [k, q] of Object.entries(DP_SENT)) { try { s[k] = P(q); } catch (e) { console.warn('film: phrase not found', k); } }
  const T0 = (ph) => ph.t - 0.12; const w = (k, x) => WT(s[k], x);
  const Q = (id, k, lines, o = {}) => FS(id, T0(s[k]), o.ground || 'dpPink', quote({ at: T0(s[k]) + 0.05, lines, ...o }), o);
  const L = { lens: true };

  /* ---------- 0:00 what a dark pattern is ---------- */
  FS('open', 0, 'dpPink', DP.popup({ at: 0.05, offAt: w('s0', '10'), btnAt: w('s0', 'button'), linkAt: w('s0', 'no thanks'), lensAt: w('s0', 'saving') - 0.3, blockAt: w('s0', 'hate'), tag: [1, 'Confirmshaming'] }));
  Q('name', 's1', 'It’s called a\n[dark pattern].', { ground: 'dpInk', hits: w('s1', 'dark'), size: V(170, 130), lens: true });
  FS('definition', T0(s.s2), 'dpPink', DP.word({ kicker: 'Dark pattern', lines: 'A design that\n[tricks you] into doing\nsomething you didn’t\nmean to do', at: T0(s.s2), hits: w('s2', 'tricks') }));
  FS('bad-vs-dark', T0(s.s3), 'dpPaper', DP.vs({ at: T0(s.s3), a: { label: 'Bad design', title: 'Confusing,\nby [accident]', hits: w('s3', 'bad design') }, b: { label: 'Dark pattern', title: 'Confusing,\non [purpose]', hits: w('s3', 'different') + 0.2 } }));
  Q('intentional', 's4', 'Dark patterns are\n[intentional].', { ground: 'dpInk', hits: w('s4', 'intentional'), size: V(150, 112) });
  FS('business', T0(s.s5), 'dpPink', DP.word({ lines: 'Good for the\n[business].\nAt the user’s\nexpense.', at: T0(s.s5) + 0.1, hits: w('s5', 'business') }));
  FS('eleven', T0(s.s6), 'dpPink', DP.eleven({ at: T0(s.s6), title: 'Dark patterns in this video: [11]', titleHits: w('s6', 'a lot of them') }));
  FS('brignull', T0(s.s7), 'dpPink', DP.src('dd-origin', { at: T0(s.s7), title: 'Harry Brignull\nnamed them in [2010]', titleHits: w('s7', '2010'), hlAt: [w('s7', '2010'), w('s7', 'harry'), w('s7', 'harry') + 0.15], lens: { i: 0, at: w('s7', '2010') - 0.1 } }));
  Q('link', 's8', 'Link to his site\nin the [description]', { hits: w('s8', 'below'), light: false, size: V(110, 90) });

  /* ---------- 01 confirmshaming ---------- */
  Q('confirmshaming', 's9', '01 / 11\n[Confirmshaming]', { hits: w('s9', 'confirmshaming'), size: V(160, 110), ...L });
  FS('dd-confirm', T0(s.s10), 'dpPink', DP.src('dd-confirm', { at: T0(s.s10), title: 'The “no” button makes\nyou [feel bad]', titleHits: w('s10', 'feel bad'), credit: 'deceptive.design/types  ·  Harry Brignull' }));
  FS('look-at-this', T0(s.s11), 'dpPink', DP.popup({ at: T0(s.s11) - 0.2, lensAt: w('s11', 'no') - 0.1, blockAt: w('s11', 'hate'), tag: [1, 'Confirmshaming'] }));
  FS('confirm-ab', T0(s.s13), 'dpPaper', DP.vs({ at: T0(s.s13), a: { title: '“No thanks”' }, b: { title: '“No thanks, [I hate\nsaving money]”', hits: w('s13', 'hate') } }));

  /* ---------- 02 hard to cancel ---------- */
  Q('hard-to-cancel', 's14', '02 / 11\nHard to [cancel]', { hits: w('s14', 'cancel'), size: V(160, 110), ...L });
  FS('roach', T0(s.s15), 'dpPink', DP.photo({ key: 'px-17177368', at: T0(s.s15), cap: 'The roach motel', fy: 0.45 }));
  FS('easy-in', T0(s.s16), 'dpPink', DP.word({ tag: [2, 'Hard to cancel'], lines: 'Easy to [get in].\nHard to [get out].', at: T0(s.s16), hits: [w('s16', 'easy'), w('s16', 'hard')] }));
  Q('relate', 's17', 'Joining: [easy].\nLeaving: hard.', { hits: w('s17', 'easy'), size: V(140, 104) });
  FS('page-after-page', T0(s.s18), 'dpPink', DP.cancel({ at: T0(s.s18), joinAt: w('s18', 'one click'), pages: [w('s18', 'cancel'), WTn(s.s18, 'page', 0), WTn(s.s18, 'page', 1), WTn(s.s18, 'page', 2), w('s18', 'offers')], tag: [2, 'Hard to cancel'] }), { zoom: 1.3 });

  /* ---------- 03 sneak into basket ---------- */
  Q('sneak', 's18b', '03 / 11\nSneak into [basket]', { hits: w('s19', 'basket'), size: V(150, 104), ...L });
  FS('cart', T0(s.s20), 'dpPink', DP.cart({ at: T0(s.s20), tag: [3, 'Sneak into basket'], rows: [{ s: 'Running shoes', price: '€40.00', img: 'px-7588163', at: w('s21', 'shoes') }, { s: 'Cleaning spray', price: '€5.00', at: w('s22', 'cleaning spray'), sneak: true }],
    total: [[0, '€0.00'], [w('s21', 'shoes'), '€40.00'], [w('s22', 'five euro'), '€45.00']], loop: { row: 1, at: w('s22', 'never picked') } }), { zoom: 1.3 });

  /* ---------- 04 hidden costs ---------- */
  Q('hidden-costs', 's23', '04 / 11\nFees that show up\nat the [last step]', { hits: w('s23', 'last step'), size: V(130, 96), ...L });
  Q('happens', 's24', 'This happens to me\n[a lot].', { hits: w('s24', 'lot'), light: true, size: V(130, 100) });
  Q('ninety', 's25', 'You think it’s [€90].\nAt checkout: €100\nand something.', { hits: w('s25', '90'), size: V(120, 92) });
  FS('forty-fiftytwo', T0(s.s26), 'dpPink', DP.price({ at: T0(s.s26), a: w('s26', '40'), fee: w('s27', 'service fee'), b: w('s27', '52'), tag: [4, 'Hidden costs'] }));
  FS('card-details', T0(s.s28), 'dpPink', DP.photo({ key: 'px-5717969', at: T0(s.s28), cap: 'Card details: already typed' }));

  /* ---------- 05 hidden subscription ---------- */
  FS('hidden-sub', T0(s.s29), 'dpPink', DP.word({ tag: [5, 'Hidden subscription'], lines: 'A free trial that\nturns into a\n[paid plan]', at: T0(s.s29) + 0.1, hits: w('s29', 'paid plan'), small: 'without a clear warning', smallAt: w('s29', 'without') }), L);
  FS('trial', T0(s.s30), 'dpPink', DP.trial({ at: T0(s.s30), askAt: w('s30', 'asks for your card'), endAt: w('s31', 'free trial ends'), chargeAt: w('s31', 'start charging'), charge: 'NOW YOU PAY' }), { zoom: 1.3 });
  Q('a-year', 's32', 'They charged me for\n[a year’s subscription].', { hits: w('s33', "year's"), size: V(120, 92) });

  /* ---------- more ---------- */
  FS('five-down', T0(s.s34), 'dpPink', DP.eleven({ at: T0(s.s34), on: 5, title: '[5] down. Many more.', titleHits: w('s34', 'many more') }), L);
  Q('in-place', 's35', 'Put there\n[on purpose].', { hits: w('s35', 'intentionally'), size: V(150, 112) });
  Q('not-bad-design', 's36', 'It’s not bad design.\nIt’s [intentional].', { ground: 'dpInk', hits: w('s36', 'intentional'), size: V(130, 96) });

  /* ---------- 06 trick wording ---------- */
  Q('trick-wording', 's37', '06 / 11\nTrick [wording]', { hits: w('s37', 'wording'), size: V(160, 110), ...L });
  FS('opposite', T0(s.s38), 'dpPink', DP.word({ tag: [6, 'Trick wording'], lines: 'You click the\n[opposite]', at: T0(s.s38) + 0.1, hits: w('s38', 'opposite') }));
  FS('untick', T0(s.s39), 'dpPink', DP.check({ s: '[Untick] this box if you\n[don’t] want to [stop]\nreceiving emails.', at: T0(s.s39), hits: [w('s39', 'untick'), w('s39', "don't"), w('s39', 'stop')], under: 'You have to read it two or three times', underAt: w('s40', 'two or three') }), { zoom: 1.3 });

  /* ---------- 07 disguised ads ---------- */
  FS('part-of-page', T0(s.s41), 'dpPink', DP.word({ tag: [7, 'Disguised ads'], lines: 'Ads made to look like\n[part of the page]', at: T0(s.s41) + 0.1, hits: w('s42', 'part of the page') }), L);
  FS('search', T0(s.s43), 'dpPink', DP.search({ at: T0(s.s43), rowsAt: w('s43', 'first few'), lensAt: w('s43', 'paid ads') - 0.1, blockAt: w('s43', 'but they are') + 0.3, tag: [7, 'Disguised ads'] }), { zoom: 1.3 });

  /* ---------- 08 nagging ---------- */
  Q('nagging', 's44', '08 / 11\n[Nagging]', { hits: w('s44', 'nagging'), size: V(170, 120), ...L });
  FS('dd-nagging', T0(s.s45), 'dpPink', DP.src('dd-nagging', { at: T0(s.s45), title: 'Asking [again and again]', titleHits: WTn(s.s45, 'again', 1), credit: 'deceptive.design/types  ·  Harry Brignull' }));
  FS('notifications', T0(s.s47), 'dpPink', DP.nag({ at: T0(s.s47), asks: [w('s47', 'turn on'), w('s48', 'asks again')], loopAt: w('s49', 'yes'), note: { s: 'There is no “No”', at: w('s49', 'not now') + 0.3 }, tag: [8, 'Nagging'] }), { zoom: 1.3 });
  Q('snapchat', 's50', 'It happens to me\n[a lot].', { hits: w('s51', 'snapchat'), light: true, size: V(130, 100) });
  Q('this-close', 's52', 'Every time, again.\nI’m [this close] to\ndeleting the app.', { hits: w('s52', 'close'), size: V(120, 92) });

  /* ---------- 09 pre-selection ---------- */
  Q('pre-selection', 's53', '09 / 11\n[Pre-selection]', { hits: w('s53', 'pre-selection'), size: V(160, 110), ...L });
  FS('tick-vs', T0(s.s54), 'dpPaper', DP.vs({ at: T0(s.s54), a: { title: 'You [tick] it.', hits: w('s54', 'option'), draw: (t, R) => DP.box(R.x, R.y + 20, Math.min(160, R.h * 0.5), 0) },
    b: { title: '[Ticked] for you.', hits: w('s54', 'already ticked'), draw: (t, R) => DP.box(R.x, R.y + 20, Math.min(160, R.h * 0.5), dpE(t, w('s54', 'ticked'), 0.35), DP.pink) } }));
  FS('gift-wrap', T0(s.s55), 'dpPink', DP.cart({ at: T0(s.s55), tag: [9, 'Pre-selection'], rows: [{ s: 'Running shoes', price: '€40.00', img: 'px-7588163' }, { s: 'Add gift wrapping', price: '€2.99', at: w('s55', 'add gift'), tick: true, tickAt: w('s55', 'already ticked') }],
    total: [[0, '€40.00'], [w('s56', 'you pay'), '€42.99']], loop: { row: 1, at: w('s56', 'never asked') } }), { zoom: 1.3 });

  /* ---------- 10 fake urgency ---------- */
  FS('deadline', T0(s.s57), 'dpPink', DP.word({ tag: [10, 'Fake urgency'], lines: 'A deadline that\nis [not real]', at: T0(s.s57) + 0.1, hits: w('s58', 'not real') }), L);
  FS('timer', T0(s.s59), 'dpPink', DP.timer({ at: T0(s.s59), refreshAt: w('s60', 'refresh'), againAt: w('s60', 'starts again'), tag: [10, 'Fake urgency'] }));
  FS('dd-urgency', T0(s.s62), 'dpPink', DP.src('dd-urgency', { at: T0(s.s62), title: 'It’s there to [rush you]', titleHits: w('s62', 'rush'), credit: 'deceptive.design/types  ·  Harry Brignull' }));

  /* ---------- 11 fake scarcity ---------- */
  Q('scarcity', 's63', '11 / 11\nFake [scarcity]', { hits: w('s63', 'scarcity'), size: V(160, 110), ...L });
  Q('selling-out', 's64', 'Only a few left?\nSelling out?\n[Not true].', { hits: w('s64', 'not true'), size: V(130, 100) });
  FS('stock', T0(s.s65), 'dpPink', DP.stock({ at: w('s65', 'only two') - 0.2, weekAt: w('s66', 'a week later'), tag: [11, 'Fake scarcity'] }), { zoom: 1.3 });
  Q('buy-now', 's67', 'Buy now.\n[Buy now.]', { hits: WTn(s.s67, 'buy', 1), size: V(170, 120) });

  /* ---------- why (A/B tests) ---------- */
  Q('why', 's68', 'Why do companies use\n[dark patterns]?', { ground: 'dpInk', hits: w('s68', 'dark patterns'), size: V(130, 96), ...L });
  Q('numbers', 's69', 'It comes down to\n[numbers].', { hits: w('s69', 'numbers'), size: V(150, 110) });
  FS('teams', T0(s.s70), 'dpPink', DP.photo({ key: 'px-3865639', at: T0(s.s70), cap: 'A/B testing', fy: 0.4 }));
  const bars = (val, wins) => (t, R, key) => { const bw = R.w * 0.9 * dpE(t, wins.at, 0.8) * val; rect(R.x, R.y + 30, R.w * 0.9, 56, key === 'b' ? '#2A2A2A' : '#DCD8CF'); rect(R.x, R.y + 30, bw, 56, key === 'b' ? DP.pink : DP.ink);
    mono('Sales and sign-ups', R.x, R.y + 130, V(26, 28), key === 'b' ? '#C9A9B8' : '#6E6A62', 'left', { key: key + '-bar', fixed: true });
    if (wins.winAt && key === 'b') { const q = dpE(t, wins.winAt, 0.35, 'outBack'); if (q > 0.01) withT(R.x + R.w * 0.45, R.y + 250, 0.7 + 0.3 * q, -0.05, () => withA(clamp(q * 2), () => { const z = V(64, 60); const w_ = tw('WINS', F.disp(z)) + 60; rect(-w_ / 2, -z, w_, z * 1.5, DP.pink); _txt('WINS', 0, z * 0.3, F.disp(z), DP.ink, 'center'); })); } };
  FS('ab-test', T0(s.s71), 'dpPaper', DP.vs({ at: T0(s.s71), a: { label: 'Half the users', title: 'Version [A]', hits: w('s71', 'version a'), draw: bars(0.48, { at: w('s72', 'more sales') }) },
    b: { label: 'The other half', title: 'Version [B]', hits: w('s71', 'version b'), draw: bars(0.74, { at: w('s72', 'more sales'), winAt: w('s72', 'wins') }) } }));
  Q('number-you-pick', 's73', 'An A/B test only measures\nthe [number] you pick.', { ground: 'dpInk', hits: w('s73', 'number'), size: V(110, 80) });
  FS('tricked', T0(s.s74), 'dpInk', DP.word({ ground: 'dpInk', lines: 'Was anyone\n[tricked]?', at: T0(s.s74), hits: w('s74', 'tricked'), small: 'An A/B test can’t tell you.', smallAt: w('s74', 'tricked') + 0.3, sound: 'error' }));
  Q('benefit', 's75', 'Not for the [user’s]\nbenefit.', { hits: w('s75', 'benefit'), size: V(130, 96) });
  FS('better-worse', T0(s.s77), 'dpPink', DP.word({ lines: '[Better] or worse\nfor the user?', at: T0(s.s77) + 0.1, hits: w('s77', 'better') }));
  Q('end-up', 's78', 'How dark patterns\n[end up in apps].', { hits: w('s78', 'end up'), size: V(130, 96) });
  FS('chasing', T0(s.s79), 'dpPink', DP.word({ kicker: 'A team chasing a number', lines: '“More [sign-ups].\nMore [sales].”', at: T0(s.s79), hits: [w('s79', 'sign-ups'), w('s79', 'more sales')] }));
  Q('own-goal', 's80', 'Not what’s best for the user.\nTheir [own goal].', { hits: w('s81', 'goal'), size: V(110, 84) });

  /* ---------- how common ---------- */
  Q('how-common', 's82', 'How [common]\nare they?', { ground: 'dpInk', hits: w('s82', 'common'), size: V(160, 120), ...L });
  FS('ec-head', T0(s.s83a), 'dpPink', DP.src('ec-head', { at: T0(s.s83a), kicker: 'European Commission  ·  January 2023', title: '[399] online shops\nchecked', titleHits: w('s83a', '399'), hlAt: [1e9, w('s83a', '399')], only: [1] }));
  FS('one-forty-eight', T0(s.s83b), 'dpPink', DP.stat({ at: T0(s.s83b) + 0.1, big: '148', small: 'of them had at least one of three dark patterns', kicker: 'Of the 399 shops', foot: 'European Commission, IP/23/418', block: true, blockAt: w('s83b', 'at least') }));
  FS('forty-two', T0(s.s84a), 'dpPink', DP.src('ec-42', { at: T0(s.s84a) - 0.1, title: '[42] had fake\ncountdown timers', titleHits: w('s84a', '42') + 0.1, hlAt: w('s84a', 'fake countdown'), lens: { i: 0, at: w('s84a', 'timers') } }));
  FS('seventy', T0(s.s84b), 'dpInk', DP.stat({ at: T0(s.s84b) + 0.1, big: '70', small: 'hid important information or made it hard to see', kicker: 'European Commission, 2023', foot: 'Source: IP/23/418', ground: 'dpInk' }));
  FS('six-forty-two', T0(s.s85a), 'dpPink', DP.stat({ at: T0(s.s85a) + 0.1, big: '642', small: 'websites and apps that sell subscriptions', kicker: 'July 2024  ·  agencies from 26 countries', foot: 'FTC press release, 10 July 2024' }));
  FS('seventy-six', T0(s.s85b), 'dpPink', DP.src('ftc-76', { at: T0(s.s85b) - 0.1, title: '[76%] used at least one\npossible dark pattern', titleHits: w('s85b', '76'), hlAt: [1e9, w('s85b', '76')], only: [1], lens: { i: 1, at: w('s85b', 'at least') } }));
  FS('sixty-seven', T0(s.s85c), 'dpInk', DP.stat({ at: T0(s.s85c) + 0.1, big: '67%', small: 'used more than one', kicker: 'Nearly', foot: 'FTC press release, 10 July 2024', ground: 'dpInk', block: true, blockAt: w('s85c', 'more than one') }));

  /* ---------- the law ---------- */
  FS('law', T0(s.s86), 'dpPink', DP.photo({ key: 'px-22046935', at: T0(s.s86), cap: 'What does the law say?', fy: 0.35 }), L);
  Q('even-laws', 's87', 'Are there even [laws]?', { hits: w('s87', 'laws'), size: V(140, 100) });
  Q('not-a-lawyer', 's88', 'Not a lawyer.\nIt depends on [where you live].', { hits: w('s91', 'where you live'), light: false, size: V(110, 84) });
  FS('ucpd', T0(s.s89), 'dpPink', DP.word({ kicker: 'EU  ·  2005', lines: 'Unfair Commercial\nPractices Directive', at: T0(s.s89), small: 'Some of these tricks: banned since 2005', smallAt: w('s89', 'banned') }));
  FS('limited-time', T0(s.s90), 'dpPink', DP.src('ucpd-7', { at: T0(s.s90), kicker: 'Unfair Commercial Practices Directive  ·  Annex I, point 7', title: 'Fake “limited time” deals:\n[banned] in the EU', titleHits: w('s90', 'banned'), hlAt: w('s90', 'very limited time') }));
  Q('where-you-live', 's91', 'It depends on\n[where you live].', { hits: w('s91', 'where you live'), size: V(140, 104) });
  FS('gdpr', T0(s.s92), 'dpPink', DP.src('gdpr-32', { at: T0(s.s92), kicker: 'GDPR  ·  Recital 32', title: 'A pre-ticked box is\n[not consent]', titleHits: w('s92', 'consent'), hlAt: w('s92', 'pre-ticked') }));
  FS('extra', T0(s.s93a), 'dpPink', DP.cart({ at: T0(s.s93a), rows: [{ s: 'Your order', price: '€40.00' }, { s: 'An extra, pre-ticked', price: '€2.99', tick: true }], total: [[0, '€42.99']] }), { zoom: 1.3 });
  FS('money-back', T0(s.s93b), 'dpPink', DP.src('crd-22', { at: T0(s.s93b), kicker: 'EU Consumer Rights Directive  ·  Article 22', title: 'You can get that\n[money back]', titleHits: w('s93b', 'money back'), hlAt: [w('s93b', 'consumer law'), w('s93b', 'entitled')] }));
  FS('amazon', T0(s.s94), 'dpPink', DP.src('ftc-amazon-q1', { at: T0(s.s94), kicker: 'In the US  ·  FTC v. Amazon', title: 'Signed up without\nconsent. [Hard to cancel].', titleHits: w('s94', 'made cancelling'), hlAt: [w('s94', 'without their consent'), w('s94', 'made cancelling')], credit: 'FTC press release  ·  17 Sep 2026' }), L);
  FS('amazon-fix', T0(s.s95), 'dpPink', DP.fix({ at: T0(s.s95) + 0.1, head: 'To be exact', text: 'Amazon agreed to a $2.5 billion settlement: a $1 billion penalty and up to $1.5 billion in refunds. It did not admit wrongdoing.', src: 'Sources: FTC, NBC News', typeD: 2.4, size: V(72, 64) }));
  FS('dfa', T0(s.s96), 'dpPink', DP.src('cms-dfa', { at: T0(s.s96), kicker: 'EU  ·  Digital Fairness Act', title: 'A draft is expected\non [11 November 2026]', titleHits: w('s96', 'digital fairness act'), hlAt: w('s96', 'digital fairness act') }));
  Q('more-directly', 's97', 'Dark patterns,\n[more directly].', { hits: w('s97', 'more directly'), size: V(140, 104) });
  FS('not-yet', T0(s.s98), 'dpPink', DP.word({ kicker: 'As of 2 November 2026', lines: 'Not published\n[yet]', at: T0(s.s98) + 0.1, hits: w('s98', 'yet'), small: 'The draft is expected on 11 November 2026.', smallAt: w('s98', 'under work') - 0.3 }));

  /* ---------- what to do ---------- */
  FS('keep-in-mind', T0(s.s99), 'dpPink', DP.eleven({ at: T0(s.s99), on: 11, title: 'Keep these [in mind]', titleHits: w('s99', 'in mind') }), L);
  Q('builders', 's100a', 'Developer?\nDesigner?\nYou see [a dark pattern].', { hits: w('s100a', 'dark pattern'), size: V(120, 92) });
  Q('counter', 's100b', '“Hey, we can get\n[sued] for this.”', { hits: w('s100b', 'sued'), size: V(130, 96) });
  FS('this-is-wrong', T0(s.s101), 'dpPink', DP.word({ lines: '“This is [wrong].”', at: T0(s.s101) + 0.1, hits: w('s101', 'wrong'), small: 'Might not be taken seriously.', smallAt: w('s101', 'taken seriously') - 0.4 }));
  Q('sued', 's102', '“Hey guys, we could be\n[sued] for this.”', { ground: 'dpInk', hits: w('s102', 'sued'), size: V(130, 92) });
  Q('more-seriously', 's103', 'People take that\nmore [seriously].', { hits: w('s103', 'seriously'), size: V(130, 96) });
  FS('honest', T0(s.s104), 'dpPaper', DP.vs({ at: T0(s.s104), a: { title: 'Build the\n[honest version]', hits: w('s104', 'honest') }, b: { title: 'The version\nthat wins' }, winAt: w('s104', 'honest'), win: 'a' }));
  Q('better-place', 's105', 'We can make the world\na [better place].', { hits: w('s105', 'better place'), size: V(130, 96) });
}

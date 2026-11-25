/* edge-case MOTION FILM (her pick B · The Field): pure motion on her cleaned voice. The same phrases as the talking-head
 * plan (EF_SENT in talking-head/moments/sent.js) and the same graphics (scenes/ef.js), each full frame; where the edit
 * shows her face, the film sets her words as type. Each of the 8 edge cases opens on its chapter field through the tab
 * slide. The 2019 slip: 4.5 s of silence after her Azure sentence (tools/voice.py) holds the correction screen.
 * 16:9 + 9:16 from the same code. */
'use strict';
function buildFilm() {
  const s = {}; for (const [k, q] of Object.entries(EF_SENT)) { const c0 = CUR; try { s[k] = P(q); } catch (e) { CUR = c0; console.warn('film: phrase not found', k); } }
  const T0 = (ph) => ph.t - 0.12; const w = (k, x) => WT(s[k], x); const wn = (k, x, n) => { const nn = (q) => q.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, ''); const ph = s[k]; let c = 0; for (let i = 0; i < ph.w.length; i++) if (WORDS[ph.i + i].n === nn(x) && c++ === n) return ph.w[i]; return w(k, x); };
  const Q = (id, k, lines, o = {}) => { FS(id, T0(s[k]), o.ground || 'lime', quote({ at: T0(s[k]) + 0.05, lines, ...o }), { portDy: 0, ...o }); if (o.hits != null) sfx('marker', [].concat(o.hits)[0], 2); };
  const CH = (id, k, n, name, sub) => { FS(id, T0(s[k]), 'lime', EF.chapter({ n, name, at: T0(s[k]) + 0.3, sub, subAt: s[k].t + 2.2 }), { tab: true, portDy: 0 }); sfx('type', T0(s[k]) + 0.3, 0); };
  const has = (...ks) => ks.every(k => s[k]);

  /* ---------- intro ---------- */
  Q('open', 's0', 'The craziest\n[edge cases]\nin the world', { hits: w('s0', 'edge'), size: V(170, 120), kicker: 'If you’re a software developer' });
  FS('navigate', T0(s.s1), 'lime', EF.form({ fields: [{ label: 'Step 1', value: 'Sign up', typeAt: w('s1', 'navigate') }, { label: 'Step 2', value: 'Settings › Billing', typeAt: wn('s1', 'navigate', 1), at: wn('s1', 'navigate', 1) - 0.1 }, { label: 'Step 47', value: '…this kind of situation', typeAt: wn('s1', 'navigate', 2) + 0.3, at: wn('s1', 'navigate', 2), errAt: w('s1', 'situation'), errText: 'Something went wrong.' }] }));
  Q('promise', 's2', 'I promise you', { hits: w('s2', 'promise'), size: V(170, 120), small: 'with everything that I have and everything that I hope' });
  FS('issue', T0(s.s3), 'lime', EF.issue({ at: w('s3', 'report') - 0.1, title: 'Customer charged twice', body: ' ' }), { zoom: 1.3 });
  Q('never-thought', 's4', 'The edge case you\n[never thought of]', { hits: w('s4', 'never'), size: V(140, 100) });
  FS('montage', T0(s.s5), 'efInk', EF.montage({ items: [{ label: 'PLATE', big: 'NULL' }, { label: 'DATE', big: '29 FEB', red: true }, { label: 'SURNAME', big: 'Null', sub: 'Surname is required' }, { label: 'NAME', big: 'Adébáyọ̀', sub: '13?' }], times: [T0(s.s5) + 0.3, w('s6', 'users'), w('s6', 'cases'), w('s6', 'write')] }), { portDy: 0 });
  [T0(s.s5) + 0.3, w('s6', 'users'), w('s6', 'cases'), w('s6', 'write')].forEach(a => sfx('shutter', a, -6));
  FS('happy-path', T0(s.s7), 'lime', EF.path({ times: [w('s7', 'direct') - 0.1, w('s8', 'click'), w('s9', 'wait')], realAt: w('s10', 'not') }), { portDy: 0 });
  FS('real-users', T0(s.s11), 'lime', EF.word({ kicker: 'Real users', lines: 'don’t just fill the form,\nclick and [wait]', at: T0(s.s11) + 0.1, hits: w('s12', 'wait') }), { tab: true });
  const pr = [w('s13', 'double-click'), w('s13', 'double-click') + 0.22, w('s13', 'like'), w('s13', 'like') + 0.24, w('s13', 'like') + 0.48, w('s13', 'like') + 0.72, w('s14', 'click')];
  FS('double-click', T0(s.s13), 'lime', EF.orders({ typeAt: T0(s.s13) + 0.1, presses: pr, tab: w('s15', 'tabs') - 0.2, note: 'one customer, [seven] orders', noteAt: w('s14', 'lot') }));
  pr.forEach((a, i) => sfx(i % 2 ? 'tick' : 'pop', a, -6));
  FS('network', T0(s.s16), 'lime', EF.form({ fields: [{ label: 'Sending your order', value: 'No connection', errAt: w('s16', 'drop'), errText: 'Network lost' }] }), { zoom: 1.2 });
  FS('two-hours', T0(s.s17), 'lime', EF.clock({ label: 'The tab is still open', steps: [[T0(s.s17), '14:02'], [w('s17', 'two hours'), '16:02', false, 'They come back and click.']] }));
  Q('being-users', 's19', 'They are just\n[being users].', { ground: 'efInk', hits: w('s19', 'being'), size: V(160, 112) });

  /* ---------- 01 duplicate orders ---------- */
  CH('ch1', 's20', 1, 'Duplicate orders', 'One customer, two orders, two charges');
  FS('place-order', T0(s.s21), 'lime', EF.form({ title: 'Online shop', fields: [{ label: 'Item', value: 'Canvas tote bag  ·  €39', caret: false }], button: { label: 'Place order', presses: [w('s21', 'place order'), w('s22', 'again')], load: (t) => t > w('s21', 'slow') - 0.6 && t < w('s22', 'again') ? efE(t, w('s21', 'slow') - 0.6, 1.2, 'inOutQuart') : 0 }, note: 'slow… [click again]', noteAt: w('s22', 'again') - 0.1 }));
  sfx('pop', w('s21', 'place order'), -4); sfx('pop', w('s22', 'again'), -4);
  FS('two-requests', T0(s.s23), 'lime', EF.lanes({ title: 'Two requests, [two orders]', titleHits: w('s23', 'two orders'), at: T0(s.s23), a: 'Request 1', b: 'Request 2', target: 'Server', hitA: w('s23', 'two requests'), hitB: w('s23', 'two requests') + 0.2, result: [{ s: 'Order #1041  ·  Order #1042', at: w('s23', 'creates') }] }));
  FS('charged-twice', T0(s.s24), 'lime', EF.charges({ at: w('s24', 'charge on'), second: w('s24', 'twice') - 0.2, noteAt: w('s24', 'twice') }));
  FS('retry', T0(s.s26), 'lime', EF.lanes({ at: T0(s.s26), a: 'Sent', b: 'Retry', target: 'Order', hitA: w('s26', 'sent'), hitB: w('s26', 'retry'), result: [{ s: 'the app [retries]', at: w('s26', 'retry') }] }));
  FS('resubmit', T0(s.s27), 'lime', EF.dialog({ at: T0(s.s27) + 0.25, title: 'Send the form again?', body: 'The page you are looking for used information you entered. Sending it again may repeat the action.', btn: 'Continue', press: w('s27', 'yes') }));
  sfx('pop', w('s27', 'yes'), -4);
  FS('disable', T0(s.s28), 'lime', EF.checks({ title: 'Disable the button?', at: T0(s.s28), items: [{ s: 'Double click', ok: true, at: w('s28', 'double-click') }, { s: 'Retry', ok: false, at: w('s29', 'retry') }, { s: 'Second tab', ok: false, at: w('s29', 'second tab') }] }));
  Q('idem', 's30', 'The fix:\nan [idempotency key]', { hits: w('s30', 'idempotency'), size: V(140, 100), tab: true });
  Q('twice-once', 's32', 'Twice has the same\nresult as [once]', { ground: 'efInk', hits: w('s33', 'once'), size: V(140, 100) });
  FS('stripe', T0(s.s34), 'lime', EF.src('stripe', { at: T0(s.s34), title: 'Stripe: an [Idempotency-Key]', titleHits: w('s34', 'idempotency key header'), hlAt: [w('s34', 'same idea'), w('s34', 'header')], crop: V([0, 200], [90, 140]), cropX: V(undefined, [300, 690]), maxW: 1700 }));
  FS('key-code', T0(s.s35), 'lime', EF.code({ at: T0(s.s35), lines: [[['POST /orders', '#FFFFFF']], [['Idempotency-Key: ', '#B9C77A'], ['8f14e45f', EF.lime]], [['POST /orders  ', '#FFFFFF'], ['(retry)', EF.red]], [['Idempotency-Key: ', '#B9C77A'], ['8f14e45f', EF.lime]]], step: 0.3, result: { s: 'one payment, [not two]', at: w('s35', 'second payment') } }));

  /* ---------- 02 race condition ---------- */
  CH('ch2', 's36', 2, 'Race condition', 'Starbucks gift cards, and one item left in stock');
  FS('race', T0(s.s37), 'lime', EF.lanes({ title: 'At the [same time]', titleHits: w('s37', 'same time'), at: T0(s.s37), a: 'Thing 1', b: 'Thing 2', target: 'Your code', targetSub: 'expects one, then the other', hitA: w('s37', 'same time'), hitB: w('s38', 'one after') }));
  FS('starbucks', T0(s.s39), 'lime', EF.src('sakurity', { at: T0(s.s39), kicker: 'Egor Homakov  ·  2015', title: 'A race condition in\n[Starbucks gift cards]', titleHits: w('s39', 'starbucks'), hlAt: w('s39', 'gift cards') + 0.2, creditText: 'sakurity.com  ·  Egor Homakov  ·  21 May 2015' }));
  FS('gift-cards', T0(s.s40), 'lime', EF.gift({ at: T0(s.s40), sendAt: w('s41', 'same time'), doneAt: w('s42', '20') }));
  sfx('cash', w('s42', '20'), -14);
  FS('each-checked', T0(s.s43), 'lime', EF.lanes({ at: T0(s.s43), a: 'Request 1: balance ok?', b: 'Request 2: balance ok?', target: '$5', targetSub: 'moved twice', hitA: w('s44', 'moved'), hitB: w('s44', 'moved') + 0.05, result: [{ s: 'Neither one [waited]', at: w('s45', 'neither') }] }));
  FS('stock', T0(s.s47), 'lime', EF.form({ title: 'Online shop', fields: [{ label: 'Canvas tote bag  ·  in stock', value: '1 left', typeAt: w('s47', 'one item left'), cps: 10 }] }));
  FS('one-left', w('s48', 'two people') - 0.15, 'lime', EF.lanes({ title: '[1 left] in stock', titleHits: w('s48', 'two people'), at: w('s48', 'two people') - 0.1, a: 'Buyer A', b: 'Buyer B', target: '1 left', targetSub: 'both see it', hitA: w('s48', 'click buy'), hitB: w('s48', 'click buy') + 0.06, result: [{ s: 'Order confirmed  ·  Order confirmed', at: w('s49', 'both create'), size: 50 }, { s: 'sold an item [we do not have]', at: w('s49', 'sold'), size: 50 }] }));
  sfx('error', w('s49', 'sold'), -6);
  FS('zero-rows', T0(s.s51), 'lime', EF.code({ kicker: 'only one can take it', at: T0(s.s51), lines: [[['UPDATE products', '#FFFFFF']], [['SET stock = stock - 1', '#FFFFFF']], [['WHERE id = 42 ', '#FFFFFF'], ['AND stock > 0', EF.lime]]], step: 0.35, result: [{ s: 'Buyer A: 1 row updated', at: w('s51', 'only one') }, { s: 'Buyer B: [0 rows] = sold out', at: w('s52', 'zero rows'), red: true }] }));

  /* ---------- 03 names ---------- */
  CH('ch3', 's53', 3, 'Names', 'O’Brien, Null, and the names we never tested');
  FS('obrien', T0(s.s54), 'lime', (t, r) => { const u = efU(r); const m = 90 * u; const brk = efE(t, w('s55', 'ends the text'), 0.25);
    EF.field(t, r.x + m, r.y + m + 60 * u, Math.min(r.w - 2 * m, 900 * u), 150 * u, { label: 'Surname', key: 'obrien', value: 'O’Brien', typeAt: w('s54', "o'brien") - 0.2, cps: 10, caret: false });
    withA(efE(t, w('s54', 'apostrophe'), 0.3), () => EF.text(t, 'apos', 'the [apostrophe] starts\na piece of text in SQL', r.x + m, r.y + m + 300 * u, 56 * u, { hits: w('s54', 'same character'), maxW: r.w - 2 * m, f: (q) => F.body(q, 800) }));
    withA(efE(t, w('s55', 'glues'), 0.35), () => { EF.ch = EF.codeBlock(t, r.x + m, r.y + m + 420 * u, r.w - 2 * m, [...(PORTRAIT ? [[['SELECT *', EF.white]], [['FROM users', EF.white]]] : [[['SELECT * FROM users', EF.white]]]), [['WHERE surname =', EF.white]], [["  'O", EF.white], ["'", EF.white, brk > 0.5 ? EF.red : null], ["Brien'", brk > 0.5 ? EF.grey : EF.white]]], Math.min(44 * u, (r.w - 2 * m) / V(21, 15.5))); });
    withA(efE(t, w('s56', 'breaks'), 0.3), () => EF.mono('ERROR: THE QUERY BREAKS', r.x + m, r.y + m + 420 * u + (EF.ch || 150) + 60 * u, 40, EF.red, 'left', 'obrien err')); });
  sfx('error', w('s56', 'breaks'), -5);
  FS('injection', T0(s.s57), 'lime', EF.form({ title: 'By accident, or [on purpose]', at: T0(s.s57), fields: [{ label: 'Surname', value: "O'Brien", caret: false }, { label: 'Surname (typed on purpose)', value: "x'; anything here --", typeAt: w('s57', 'type something'), cps: 16, at: w('s57', 'type something') - 0.3 }], note: 'That is [SQL injection].', noteAt: w('s58', 'sql injection') }));
  FS('bbc', T0(s.s59), 'lime', EF.src('bbc-head', { at: w('s59', 'bbc') - 0.3, kicker: 'BBC Future  ·  2016', title: 'A woman called\n[Jennifer Null]', titleHits: w('s59', 'jennifer'), maxW: 1200 }));
  FS('jennifer-null', T0(s.s60), 'lime', EF.form({ title: 'Book a flight', at: T0(s.s60), fields: [{ label: 'First name', value: 'Jennifer', typeAt: w('s60', 'jennifer') - 0.1, caret: false }, { label: 'Surname', value: 'Null', typeAt: w('s60', 'null'), cps: 10, errAt: w('s60', 'surname field'), errText: 'Surname is required.' }] }));
  sfx('error', w('s60', 'surname field'), -5);
  FS('bbc-jn', T0(s.s61), 'lime', EF.src('bbc-jn', { at: T0(s.s61), title: 'The website reads “Null”\nas [empty]', titleHits: w('s62', 'empty'), hlAt: [w('s61', 'null'), w('s62', 'empty')], crop: V(undefined, [64, 112]), cropX: V(undefined, [0, 480]), only: V(undefined, [0]), maxW: 1700 }));
  Q('null-apart', 's63', 'Null is not only\na [name] problem', { hits: w('s63', 'name'), size: V(140, 100) });
  FS('no-value', T0(s.s64), 'lime', EF.form({ fields: [{ label: 'middle_name', value: 'NULL', valCol: EF.grey, caret: false }], note: 'NULL means [no value]', noteAt: w('s64', 'no value') - 0.1 }), { zoom: 1.2 });

  /* ---------- 04 the NULL plate ---------- */
  FS('plate', T0(s.s65), 'lime', EF.plate({ at: w('s65', 'license plate') - 0.1, credit: 'Story: Joseph Tartaro (droogie), DEF CON 27, 2019', creditAt: w('s65', 'conference') }), { tab: true });
  FS('tickets', T0(s.s67), 'lime', EF.plate({ at: T0(s.s67), left: true, tickets: [w('s67', 'parking'), w('s67', 'tickets'), w('s67', 'over'), w('s67', '12000') - 0.2, w('s67', 'fines'), w('s67', 'not his')], finesFrom: w('s67', 'over'), finesAt: w('s67', 'fines') }));
  [w('s67', 'parking'), w('s67', 'tickets'), w('s67', 'over'), w('s67', 'fines')].forEach(a => sfx('paper', a, -6));
  FS('no-plate', T0(s.s68), 'lime', EF.form({ title: 'Parking ticket', fields: [{ label: 'Plate number', value: '', caretOff: w('s69', 'linked') }, { label: 'Saved as', value: 'NULL', typeAt: w('s69', 'null') - 0.1, cps: 12, valCol: EF.red, at: w('s69', 'linked') - 0.2 }] }));
  FS('wired', T0(s.s70), 'lime', (t, r) => { const u = efU(r); const m = 60 * u; const k = 'wired-plate'; const c = CLIPS[k]; const h = r.h - 2 * m - 60; const wd = Math.min(r.w - 2 * m, h * c.w / c.h);
    EF.clip(t, k, r.x + (r.w - wd) / 2, r.y + m, wd, { at: T0(s.s70), creditText: 'WIRED  ·  13 Aug 2019  ·  photo Elena Lacey / Getty Images' }); });

  /* ---------- 05 leap years ---------- */
  CH('ch5', 's72', 5, 'Leap years', 'The day Microsoft Azure went down');
  FS('four-years', T0(s.s73), 'lime', EF.years({ at: T0(s.s73), title: 'Every [four] years', titleHits: w('s73', 'four years') }));
  FS('azure-date', T0(s.s75), 'lime', EF.form({ h: 180, title: 'Microsoft Azure outage', at: T0(s.s75), fields: [{ label: 'Day', value: '29 February', typeAt: w('s75', '29th'), cps: 14, caret: false }, { label: 'Year', value: '', caret: true }] }));
  FS('azure', w('s75', "microsoft's") - 0.15, 'lime', EF.src('azure', { at: w('s75', "microsoft's") - 0.1, kicker: 'Windows Azure  ·  leap day outage', crop: V([176, 352], [210, 262]), cropX: V(undefined, [600, 1080]), hlAt: 1e9, maxW: 1300 }));
  // the correction (her rule: a big slip pauses her, a plain screen types the fix): her voice is silent here (voice.py)
  const fx = s.s75.e + 0.15;
  FS('fix', fx, 'lime', (t, r) => { const x = V(160, 80); const fs = V(120, 112); const f = F.disp(fs);
    EF.mono('CORRECTION', x, r.y + V(300, 260), 36, EF.ink, 'left', 'fix kicker');
    EF.text(t, 'fix line', 'Microsoft’s leap-day outage\nwas on 29 February', x, r.y + V(450, 420), fs, { at: fx + 0.1, maxW: r.w - 2 * x });
    const y = r.y + V(450, 420) + fs * 2.2;
    withA(efE(t, fx + 0.9, 0.3), () => { _txt('2019', x, y, f, EF.red, 'left'); const wd = tw('2019', f); rect(x - 8, y - fs * 0.36, (wd + 16) * efE(t, fx + 1.2, 0.3, 'outExpo'), Math.max(8, fs * 0.09), EF.red); });
    withA(efE(t, fx + 1.6, 0.3), () => _txt('2012', x + tw('2019', f) + fs * 0.5, y, f, EF.ink, 'left'));
    withA(efE(t, fx + 2.0, 0.3), () => txtW('Source: Microsoft Azure blog, “Summary of Windows Azure Service Disruption on Feb 29th, 2012”', x, y + V(110, 120), F.mono(V(30, 30), 500), EF.ink, r.w - 2 * x, 40, 0, 'fix source')); });
  sfx('type', fx + 0.1, -6); sfx('marker', fx + 1.2, -6); sfx('pop', fx + 1.6, -6);
  FS('cert', T0(s.s76), 'lime', EF.form({ title: 'Security certificate', fields: [{ label: 'Valid from', value: 'today', typeAt: w('s77', "today's"), caret: false }, { label: 'Valid until', value: 'today, year + 1', typeAt: w('s77', 'adding one'), cps: 16, at: w('s77', 'end dates') }], note: 'valid for [one year]', noteAt: w('s76', 'one year') }), { tab: true });
  FS('leap-date', T0(s.s78), 'lime', EF.form({ fields: [{ label: 'Valid from', value: '29 / 02 / 2012', typeAt: w('s78', '2012') - 0.4, cps: 16, caret: false }, { label: 'Valid until', value: '29 / 02 / 2013', typeAt: w('s78', 'gave'), cps: 16, errAt: w('s79', "doesn't exist"), errText: 'That date doesn’t exist.' }] }));
  sfx('error', w('s79', "doesn't exist"), -4);
  FS('azure-down', T0(s.s80), 'lime', EF.src('azure', { at: T0(s.s80), title: 'Part of Azure [went down]', titleHits: w('s80', 'went down'), crop: V([176, 352], [300, 352]), cropX: V(undefined, [150, 630]), hlAt: [w('s80', 'certificate'), w('s80', 'failed')], maxW: 1700 }));

  /* ---------- 06 daylight saving ---------- */
  CH('ch6', 's82', 6, 'Daylight saving', 'When 3:30 a.m. happens twice');
  Q('not-think', 's83', 'An edge case people\ndo [not] think about', { hits: w('s83', 'not'), size: V(130, 96) });
  FS('estonia', T0(s.s84), 'lime', EF.word({ kicker: 'Tallinn, Estonia', lines: 'The clock changes\n[twice] a year', at: T0(s.s84), hits: w('s84', 'twice') }));
  FS('spring', T0(s.s85), 'lime', EF.clock({ label: 'Tallinn  ·  29 March 2026', steps: [[T0(s.s85), '02:59'], [w('s86', 'straight'), '04:00', true], [w('s87', 'never'), '04:00', true, '3:30 that morning never happened.']] }));
  sfx('tick', w('s86', 'straight'), -4);
  FS('autumn', T0(s.s88), 'lime', EF.clock({ label: 'Tallinn  ·  25 October 2026', steps: [[T0(s.s88), '03:59'], [w('s89', 'back'), '03:00', true], [w('s90', 'twice'), '03:30', true, '3:30 happened twice.']] }), { tab: true });
  FS('report-job', T0(s.s91), 'lime', EF.clock({ label: 'Online shop  ·  daily sales report', steps: [[T0(s.s91), '03:30']], job: { s: 'Daily sales report, 03:30', at: w('s91', 'daily'), state: [[w('s93', 'not run'), 'NEVER RAN', true], [w('s94', 'twice'), 'RAN TWICE', true]] } }));

  /* ---------- 07 unicode ---------- */
  CH('ch7', 's96', 7, 'Unicode names', 'Seven letters, thirteen bytes');
  FS('tone-marks', T0(s.s97), 'lime', EF.word({ lines: 'Adébáyọ̀\n[Yoruba] names', at: T0(s.s97), hits: w('s98', 'yoruba') }));
  FS('bytes', T0(s.s99), 'lime', EF.bytes({ typeAt: T0(s.s99) + 0.2, sevenAt: w('s100', 'seven'), strlenAt: w('s100', 'count bytes'), bytesAt: w('s101', 'letters'), thirteenAt: w('s102', '13') }));
  FS('max-20', T0(s.s103), 'lime', EF.form({ fields: [{ label: 'Full name (max 20)', value: 'Adébáyọ̀ Ọláolúwa', typeAt: T0(s.s103) + 0.2, cps: 14, errAt: w('s104', 'reject'), errText: 'Name is too long.' }], note: '[17 letters], counted as 26', noteAt: w('s104', 'wrong function') }));
  sfx('error', w('s104', 'reject'), -5);
  FS('unicode-fix', T0(s.s105), 'lime', EF.code({ kicker: 'The fix', at: T0(s.s105), lines: [[['mb_strlen($name)', '#FFFFFF'], ['  // 17', EF.lime]], [['Normalizer::normalize($name)', '#FFFFFF']]], step: w('s105', 'normalize') - T0(s.s105), sound: false }));

  /* ---------- 08 Hyrum's law ---------- */
  CH('ch8', 's106', 8, 'Hyrum’s law', 'Named after Hyrum Wright');
  FS('never-promised', T0(s.s107), 'lime', EF.word({ lines: 'Behaviour you\n[never promised]', at: T0(s.s107), hits: w('s107', 'never promised') }));
  FS('hyrum-quote', T0(s.s109), 'lime', EF.src('hyrum', { at: T0(s.s109), kicker: 'Hyrum’s law', hlAt: [w('s109', 'sufficient'), w('s111', 'depended')], crop: [190, 312], maxW: 1700 }));
  FS('api-order', T0(s.s112), 'lime', EF.api({ at: T0(s.s112) + 0.3 }));
  FS('didnt-choose', T0(s.s113), 'lime', EF.word({ kicker: 'GET /api/products', lines: 'We never [chose]\nthat order', at: T0(s.s113) + 0.05, hits: w('s113', 'choose') }));
  sfx('marker', w('s113', 'choose'), 2);
  FS('api-break', T0(s.s115), 'lime', EF.api({ at: T0(s.s115) - 0.5, pickAt: w('s116', 'last product'), flipAt: w('s117', 'add an index') }), { tab: true });
  sfx('error', w('s118', 'break'), -5);
  FS('them-us', T0(s.s119), 'lime', EF.vs({ at: T0(s.s119), a: { label: 'To them', title: 'we [broke]\nsomething', hits: w('s119', 'broken') }, bAt: w('s120', 'to us'), b: { label: 'To us', title: 'we never\n[promised] it', hits: w('s120', 'never promised') } }));
  FS('used-to', w('s121', 'used to') - 0.15, 'lime', EF.word({ kicker: 'Hyrum’s law', lines: 'They got [used to] it', at: w('s121', 'used to') - 0.1, hits: w('s121', 'used to') }), { tab: true });
  FS('consider', T0(s.s122), 'lime', EF.form({ h: 170, fields: [{ label: 'Another edge case', value: 'to consider', typeAt: w('s122', 'consider') - 0.4, cps: 14 }] }));

  /* ---------- closing ---------- */
  FS('so-much-more', T0(s.s123), 'efInk', EF.montage({ items: [{ label: '01', big: '×2' }, { label: '04', big: 'NULL' }, { label: '05', big: '29 FEB', red: true }, { label: '07', big: '13' }], times: [T0(s.s123) + 0.1, T0(s.s123) + 0.4, T0(s.s123) + 0.7, T0(s.s123) + 1.0] }));
  Q('cant-predict', 's125', 'You can’t even\n[predict] every one', { hits: w('s125', 'predict'), size: V(140, 100) });
  Q('ship', 's126', 'You probably wouldn’t\n[ship anything]', { ground: 'efInk', hits: w('s126', 'ship'), size: V(140, 100) });
  FS('catch-few', T0(s.s127), 'lime', EF.checks({ title: 'Catch [a few]', at: T0(s.s127), items: [{ s: 'Double clicks', ok: true, at: w('s127', 'catch') }, { s: 'Names like Null', ok: true, at: w('s127', 'catch') + 0.4 }, { s: 'Leap days', ok: true, at: w('s127', 'catch') + 0.8 }] }));
  Q('end', 's128', 'You won’t catch\n[all of them]', { hits: w('s128', 'all of them'), size: V(140, 100), small: '@WithGbemi', smallAt: s.s128.e });
}

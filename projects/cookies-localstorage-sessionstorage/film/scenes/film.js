/* cookies MOTION FILM (her pick A · Crash test, with the cloakroom as one scene in A's style): pure motion on her cleaned
 * voice. The same sentences as the talking-head plan (CK_SENT in talking-head/moments/plan.js) and the same graphics
 * (scenes/ck.js), each full frame; where the edit shows her face, the film sets her words as type. Hard cuts on her words;
 * the three chapters open through the crash-marker wipe. 16:9 + 9:16 from the same code. */
'use strict';
function buildFilm() {
  const s = {}; for (const [k, q] of Object.entries(CK_SENT)) { try { s[k] = P(q); } catch (e) { console.warn('film: phrase not found', k); } }
  const T0 = (ph) => Math.max(0, ph.t - 0.12); const w = (k, x, n) => WT(s[k], x, n);
  const Q = (id, k, lines, o = {}) => { const st = o.start != null ? o.start : T0(s[k]); FS(id, st, o.ink ? 'ckInk' : 'ckLab', quote({ at: st + 0.05, lines, ...o }), o);
    CK.sfx(o.ink ? 'slam' : 'typeHit', st + 0.04, o.ink ? -4 : -2); if (o.hits != null) CK.sfx('mark', o.hits, -6); };
  const F_ = (id, k, draw, o = {}) => { const st = o.start != null ? o.start : T0(s[k]); FS(id, st, o.g || 'ckLab', draw, o); CK.sfx('tick', st + 0.04, -4); };
  const OFF = { stamp: 0.067, wipe: -0.13, type: -0.13, flip: 0.13, wrong: 0.067 };   // measured by lab.mjs audit: each role's hit vs its picture change
  const sx = (role, t, db = 0) => CK.sfx(role, t + (OFF[role] || 0), db);

  /* ---------- 0:00 why the browser has to remember ---------- */
  F_('topic', 's0', CK.topic({ at: [w('s0', 'cookies'), w('s0', 'localstorage'), w('s0', 'sessionstorage')] }), { start: 0 });
  ['cookies', 'localstorage', 'sessionstorage'].forEach(x => sx('slam', w('s0', x), -4));
  Q('remember', 's1', 'Why does a browser\nhave to [remember]\nanything at all?', { hits: w('s1', 'remember'), size: V(140, 110) });
  Q('stateless', 's2', 'HTTP is\n[stateless].', { ink: true, hits: w('s2', 'stateless'), size: V(200, 160), start: w('s2', 'http is') - 0.1 });
  F_('requests', 's3', CK.stateless({ at1: w('s3', 'every'), at2: w('s4', 'server'), qAt: w('s4', 'remember'), kicker: 'Every request stands on its own' }));
  F_('requests2', 's5', CK.stateless({ at1: w('s5', 'log'), at2: w('s6', 'click'), qAt: w('s7', 'know'), foot: 'So how does the server know it’s you?', footAt: w('s7', 'how') }));
  sx('dot', w('s5', 'log'), 0); sx('dot', w('s6', 'click'), 0); sx('wrong', w('s7', 'know'), -4);

  /* ---------- 0:29 the cloakroom ---------- */
  F_('cloakroom', 's8', CK.cloak({ at: T0(s.s8), title: 'Think about a cloakroom.', titleAt: T0(s.s8) }), { mark: true });
  sx('photo', T0(s.s8) + 0.1, 0);
  Q('face', 's10', 'They don’t remember\nyour [face].', { hits: w('s10', 'face'), small: 'There’s a lot of people.', smallAt: w('s10', 'there') });
  F_('ticket', 's11', CK.cloak({ at: T0(s.s11) - 1, title: 'You show them the ticket.', titleAt: T0(s.s11) }));
  sx('ticket', w('s11', 'ticket'), 0);
  F_('like-ticket', 's12', CK.cloak({ at: T0(s.s12) - 1, flipAt: w('s12', 'ticket'), title: 'A cookie works\nlike that ticket.', titleAt: T0(s.s12) }));
  sx('flip', w('s12', 'ticket'), 0);
  F_('trip', 's13', CK.trip({ setAt: w('s13', 'cookie'), backAt: w('s14', 'every'), foot: 'Shown on every request after that', footAt: w('s14', 'every') }));
  sx('pop', w('s13', 'cookie'), 0); sx('dot', w('s14', 'every'), 0);

  /* ---------- 0:58 01 cookies ---------- */
  Q('place1', 's15', 'Place 01\n[A cookie]', { ink: true, hits: w('s15', 'cookie'), size: V(190, 150), mark: true, start: w('s15', 'the first') - 0.1 });
  F_('banner', 's16', CK.banner({ at: w('s16', 'accept'), title: 'Accept cookies?' }));
  sx('pop', w('s16', 'accept'), 0);
  F_('name-value', 's17', CK.cloak({ at: T0(s.s17) - 1, flipAt: w('s17', 'name'), title: 'A small piece of text:\na name and a value.', titleAt: T0(s.s17) }));
  sx('flip', w('s17', 'name'), 0);
  F_('set-cookie', 's18', CK.code({ title: 'Set-Cookie', enter: 'slam', at: w('s18', 'setcookie'), kicker: 'The response', lines: [{ s: 'HTTP/1.1 200 OK', at: w('s18', 'header') }, { s: 'Set-Cookie: session_id=117', at: w('s18', 'setcookie'), col: CK.grn }] }));
  sx('type', w('s18', 'header'), -4);
  F_('cookie-back', 's19', CK.trip({ setAt: T0(s.s19) - 1.5, backAt: w('s19', 'every'), foot: 'Sent back automatically, in a Cookie header', footAt: w('s19', 'automatically') }));
  F_('size', 's20', CK.scale({ at: w('s20', '4') }));
  Q('live', 's21', 'How long can\na cookie [live?]', { ink: true, hits: w('s21', 'live'), size: V(180, 140) });
  F_('expiry1', 's22', CK.expiry({ at1: w('s22', 'session'), headAt: T0(s.s22) }));
  sx('stamp', w('s22', 'session') + 0.5, 0);
  F_('restore', 's24', CK.receipt({ img: 'mdn-warn', kicker: 'Checked against the docs', title: 'Browsers restore tabs', at: w('s24', 'restore'), inAt: T0(s.s24), hl: [[674, 66, 1000, 102], [91, 107, 600, 143]], credit: 'Source: MDN Web Docs, Set-Cookie' }));
  sx('mark', w('s24', 'restore'), 0);
  F_('expiry2', 's25', CK.expiry({ at1: T0(s.s25) - 0.4, at2: w('s25', 'persistent'), foot: true }));
  F_('board-login', 's26', CK.board({ at: T0(s.s26) - 0.3, title: 'The login cookie', cells: [[0, 0, T0(s.s26) + 0.2], [0, 1, T0(s.s26) + 0.6], [0, 2, w('s26', 'set')]], foot: '* Depends on the cookie. No expiry: gone, unless the browser restores your tabs. With an expiry date: it stays.', footAt: w('s26', 'set') }));
  sx('dot', T0(s.s26) + 0.2, 0); sx('dot', T0(s.s26) + 0.6, 0);
  sx('stamp', w('s25', 'persistent') + 0.5, 0);
  F_('doc-cookie', 's27', CK.code({ title: 'JavaScript can\nread and write it', at: T0(s.s27), lines: [{ s: '> document.cookie', at: w('s27', 'documentcookie') - 0.2 }, { s: '"session_id=117; theme=dark"', at: w('s27', 'documentcookie') + 0.6, col: CK.grn }] }));
  F_('login', 's28', CK.cloak({ at: T0(s.s28) - 1, flipAt: w('s28', 'cookie'), title: 'The login lives in a cookie.', titleAt: T0(s.s28) }));
  sx('flip', w('s28', 'cookie'), 0);
  Q('session-id', 's29', 'Only a random ID.\nA [session ID].', { hits: w('s29', 'session', 0) });
  F_('lookup', 's30', CK.code({ title: 'The server\nlooks it up', at: T0(s.s30), lines: [{ s: 'session_id=117', at: w('s30', 'id') }, { s: '→ Ada Okafor', at: w('s30', 'look'), col: CK.grn }, { s: '→ logged in, cart: 2', at: w('s30', 'look') + 0.6, col: CK.grn }] }));

  /* ---------- 2:15 02 localStorage ---------- */
  Q('place2', 's31', 'Place 02\n[localStorage]', { ink: true, upper: false, hits: w('s31', 'localstorage'), size: V(190, 130), mark: true, start: w('s31', 'the second') - 0.1 });
  F_('cart-test', 's32', CK.test({ n: '01', name: 'Close the browser', head: 'Close browser', subject: 'cart', test: 'browser', at: w('s32', 'close'), shutAt: w('s32', 'close') + 0.35, openAt: w('s32', 'reopen'), result: 'there', resAt: w('s32', 'still') }));
  sx('slam', w('s32', 'close'), 0); sx('shut', w('s32', 'close') + 0.35, 0); sx('stamp', w('s32', 'still'), 0);
  F_('key-value', 's33', CK.code({ title: 'Key + value', at: T0(s.s33), kicker: 'localStorage · one website', lines: [{ s: 'key    cart', at: w('s33', 'key') }, { s: 'value  [{"id":17,"qty":1}]', at: w('s33', 'value'), col: CK.grn }] }));
  Q('strings', 's34', 'It only stores\n[strings].', { ink: true, hits: w('s34', 'strings'), size: V(200, 150) });
  F_('json', 's35', CK.code({ title: 'Strings in, strings out', at: T0(s.s35), z: V(42, 34), lines: [{ s: "localStorage.setItem('cart',", at: w('s35', 'jsonstringify') - 0.6 }, { s: '  JSON.stringify(cart))', at: w('s35', 'jsonstringify'), col: CK.grn },
    { s: 'JSON.parse(', at: w('s36', 'jsonparse') - 0.4, gap: 1.2 }, { s: "  localStorage.getItem('cart'))", at: w('s36', 'jsonparse'), col: CK.grn }] }));
  F_('quota', 's37', CK.receipt({ img: 'mdn-quotas', kicker: 'localStorage', title: 'About 5 MB per website', at: w('s37', 'five'), inAt: T0(s.s37), hl: [[255, 25, 600, 62]], credit: 'Source: MDN Web Docs, Storage quotas' }));
  sx('mark', w('s37', 'five'), 0);
  Q('too-big', 's39', 'Nothing [too big]\nin localStorage.', { hits: w('s39', 'too') });
  F_('origin', 's40', CK.origin({ at: [w('s40', 'protocol'), w('s40', 'domain'), w('s40', 'ports')] }));
  ['protocol', 'domain', 'ports'].forEach(x => sx('dot', w('s40', x), 0));
  Q('stays', 's41', 'It stays until your\ncode [removes it].', { hits: w('s41', 'removes'), small: 'Or until the user clears their browser data.', smallAt: w('s41', 'until', 1) });
  F_('board-cart', 's42', CK.board({ at: T0(s.s42) - 0.3, cells: [[1, 0, T0(s.s42) + 0.2], [1, 1, w('s42', 'tab')], [1, 2, w('s42', 'browser')]] }));
  sx('dot', w('s42', 'tab'), 0); sx('dot', w('s42', 'browser'), 0);
  // the correction: she says "two exceptions" and names one; the card adds Safari's 7-day rule with the WebKit source
  F_('two-exceptions', 's43', CK.fix({ at1: w('s44', 'private'), at2: w('s44', 'deleted') }));
  sx('mark', w('s44', 'deleted') + 0.3, 0);
  F_('never-sent', 's45', CK.wire({ at: w('s45', 'never'), foot: 'Never sent to the server by itself', footAt: w('s45', 'never') }));
  Q('send-it', 's46', 'Your code\nhas to [send it].', { hits: w('s46', 'send') });

  /* ---------- 3:21 03 sessionStorage ---------- */
  Q('place3', 's47', 'Place 03\n[sessionStorage]', { ink: true, upper: false, hits: w('s47', 'sessionstorage'), size: V(190, 120), mark: true });
  F_('form-gone', 's48', (t, r) => { rect(0, 0, W, H, CK.conc); CK.fit(r, (L) => { CK.text(t, 'title', 'A half-filled\ncheckout form', 90, 170, L.wide ? 140 : 120, { at: T0(s.s48) });
    CK.form(t, L.wide ? 800 : 60, L.wide ? 300 : 480, L.wide ? 1.2 : 1.35, { wipeAt: w('s48', 'disappear'), shakeAt: w('s48', 'disappear') - 0.6 }); }); });
  sx('wipe', w('s48', 'disappear'), 0);
  F_('methods', 's49', CK.code({ title: 'Same methods', at: T0(s.s49), kicker: 'sessionStorage', lines: [{ s: "setItem('form', …)", at: w('s49', 'setitem') }, { s: "getItem('form')", at: w('s49', 'getitem') }, { s: "removeItem('form')", at: w('s49', 'removeitem') }] }));
  sx('type', w('s49', 'setitem'), -4);
  F_('one-tab', 's50', CK.say({ kicker: 'Test subject 03', marker: true, title: 'sessionStorage\nbelongs to [one tab.]', at: T0(s.s50), hits: w('s50', 'one'), size: V(150, 120) }));
  F_('refresh', 's51', CK.test({ n: '02', name: 'Refresh the page', head: 'Refresh', subject: 'form', test: 'refresh', at: w('s51', 'refresh') - 0.07, result: 'there', resAt: w('s51', 'still') }), { start: w('s51', 'refresh') - 0.14 });
  sx('refresh', w('s51', 'refresh') - 0.07, 0); sx('stamp', w('s51', 'still'), 0);
  F_('close-tab', 's52', CK.test({ n: '03', name: 'Close the tab', head: 'Close tab', subject: 'form', test: 'tab', enter: 'drop', at: w('s52', 'close') - 0.07, result: 'gone', resAt: w('s52', 'gone') }), { start: w('s52', 'close') - 0.14 });
  sx('slam', w('s52', 'close') - 0.07, 0); sx('xclick', w('s52', 'close') + 0.48, 0); sx('wipe', w('s52', 'gone') - 0.15, -2); sx('stamp', w('s52', 'gone'), 0);
  F_('second-tab', 's53', CK.tabs2({ at: T0(s.s53) + 0.2, at2: w('s53', 'second', 1) }));
  F_('right-now', 's54', CK.board({ at: T0(s.s54) - 0.3, title: 'This tab, right now', cells: [[1, 0, T0(s.s54) - 0.3], [1, 1, T0(s.s54) - 0.3], [1, 2, T0(s.s54) - 0.3], [2, 0, w('s54', 'tab')], [2, 1, w('s54', 'right')], [2, 2, w('s54', 'right') + 0.4]], hi: 2, hiAt: w('s54', 'sessionstorage') }));
  sx('dot', w('s54', 'tab'), 0); sx('dot', w('s54', 'right'), 0);
  Q('important', 's55', 'Nothing [very important]\nin sessionStorage.', { hits: w('s55', 'very') });

  /* ---------- 4:00 who can read them ---------- */
  Q('who', 's56', 'Who can\n[read] them?', { ink: true, hits: w('s56', 'read'), size: V(200, 160), mark: true });
  F_('difference', 's57', CK.readers({ at: T0(s.s57) }));
  F_('to-server', 's58', CK.wire({ at: w('s58', 'cookies'), foot: 'Every request that matches the domain and path', footAt: w('s59', 'every') }));
  F_('stays-inside', 's60', CK.wire({ at: T0(s.s60) - 2, stayAt: w('s60', 'never') }));
  sx('stamp', w('s60', 'never') + 0.5, 0);
  Q('any-js', 's62', '[Any JavaScript] on\nyour page can read it.', { ink: true, hits: w('s62', 'any'), size: V(130, 100), start: w('s62', 'any') - 0.1 });
  F_('scripts', 's63', CK.scripts({ at: [w('s63', 'own'), w('s63', 'analytic'), w('s63', 'chat')] }));
  ['own', 'analytic', 'chat'].forEach(x => sx('pop', w('s63', x), 0));
  F_('httponly', 's64', CK.httponly({ at: w('s64', 'documentcookie'), lockAt: w('s65', 'httponly') }));
  sx('stamp', w('s65', 'httponly') + 0.4, 0);

  /* ---------- 4:40 the comparison and the summary ---------- */
  F_('small', 's66', CK.readers({ at: T0(s.s66) - 1, cells: [[0, 0, w('s66', 'server')], [0, 1, w('s66', 'every')], [0, 2, w('s66', 'every') + 0.3]] }));
  sx('dot', w('s66', 'server'), 0);
  Q('unless', 's67', 'JavaScript can read them\nunless they are [HttpOnly].', { hits: w('s67', 'httponly'), upper: false });
  F_('hold-more', 's68', CK.scale({ at: T0(s.s68) - 0.6, at2: w('s68', 'more'), src: 'Sources: RFC 6265 · MDN' }));
  Q('every-script', 's69', 'They stay in the browser.\n[Every script] can read them.', { hits: w('s69', 'every'), size: V(110, 84) });
  { const t0 = s.s70.t; const cells = []; for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) cells.push([j, i, t0 + 0.3 + (j * 4 + i) * 0.16]);
    F_('board', 's70', CK.board({ at: t0 - 0.3, cells, foot: '* Depends on the cookie. No expiry: gone, unless the browser restores your tabs. With an expiry date: it stays.', footAt: t0 + 2.6, hi: 2, hiAt: w('s71', 'sessionstorage') }));
    for (let k = 0; k < 12; k += 3) sx('dot', t0 + 0.3 + k * 0.16, -2); }
  F_('summary', 's72', CK.summary({ at: [w('s72', 'login'), w('s72', 'cart'), w('s72', 'checkout')], headAt: T0(s.s72) }), { mark: true });
  ['login', 'cart', 'checkout'].forEach(x => sx('stamp', w('s72', x), -2));
}

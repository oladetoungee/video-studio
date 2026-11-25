/* cookies-localstorage-sessionstorage: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-03 by the FILM agent. CK_SENT = her sentences (her corrected words, data/raw_words.json, normalised);
 * CK_PLAN(mode) runs every layout call whose sentences are all inside this moment (a short is one stretch of the video).
 * Shorts (her rules): she is always on camera (a full-frame graphic or a phrase card becomes the top panel with her below),
 * no big overlay text, no timers, the first sentence is her talking, no keywords (the captions carry her words).
 * The look: film/scenes/ck.js + moments/common.js (A · Crash test). */
'use strict';
const CK_SENT = {
  s0: "cookies localstorage and sessionstorage",
  s1: "before cookies and localstorage and all of it can make sense you need to know first of all why a browser has to remember anything at all",
  s2: "the web runs on http and http is stateless",
  s3: "that means that every request your browser sends stands on its own",
  s4: "the server doesn't remember the request that came before it",
  s5: "so if you log into your shopping website that's one request",
  s6: "if you click on my orders that's a brand new request on its own",
  s7: "so how does the server know that it's you",
  s8: "think about a cloakroom",
  s9: "we have something similar in my school where you hand over your jacket or your coat and they give you a ticket with a name on it",
  s10: "they don't remember your face because i mean there's a lot of people",
  s11: "but when you come back you show them the ticket and they use that number to find a jacket or your coat",
  s12: "a cookie kind of works like that ticket",
  s13: "after you log in the server gives your browser a cookie with a session id in it",
  s14: "and your browser shows that cookie on every request after that",
  s15: "so the first place that a website can keep something in your browser is in a cookie",
  s16: "if you use a website you see things like accept cookies accept necessary cookies and all of that",
  s17: "a cookie is a small piece of text usually a name and a value that the server asks your browser to hold on to",
  s18: "the server usually sets it with a header on the response called setcookie",
  s19: "after that the cookie has been set every time your browser sends a request to that site it sends the cookie back automatically in a cookie header",
  s20: "each cookie can hold about 4 kilobytes and it's good to keep them very small because they travel with every request",
  s21: "now how long can a cookie live",
  s22: "if the server doesn't give the cookie an expiry then it's a session cookie",
  s23: "it's meant to be deleted when you close the browser",
  s24: "i say meant to because a lot of browsers can restore your tab when you reopen them and the session cookie can come back with them",
  s25: "if the server however sets expires or maxage then it's a persistent cookie",
  s26: "it stays until that time that is set",
  s27: "and javascript on a page can also read and write cookies through documentcookie",
  s28: "now in my ecommerce store the login lives in a cookie like this",
  s29: "the cookie itself only holds a random id a session id",
  s30: "the server keeps the real details about you and uses that id to look them up like the cloakroom number and your jacket",
  s31: "the second place a website can keep things in your browser is localstorage",
  s32: "localstorage is the reason why maybe you add something to your cart and close the browser and when you come back and reopen it you still see the stuff in your cart",
  s33: "localstorage is a simple store of key and value that live in your browser for one website",
  s34: "it only stores strings",
  s35: "so for a cart a shopping cart you turn it into strings with jsonstringify",
  s36: "and when you want to get it back you get it back with jsonparse",
  s37: "most browsers give you about five megabytes per website",
  s38: "but it varies",
  s39: "so you don't want something that is also too big in your localstorage",
  s40: "and by website i mean the origin which is the protocol the domain name the ports altogether",
  s41: "localstorage stays until your code removes it or until the user cleared their browser data",
  s42: "closing the tab or even closing the whole browser doesn't clear your localstorage",
  s43: "but there are two exceptions",
  s44: "in a private or incognito window it's usually deleted when you close the window",
  s45: "also localstorage data is never sent to the server",
  s46: "if the server needs your cart your code has to send it",
  s47: "the third place is the sessionstorage",
  s48: "it's the reason why a halffilled checkout form can disappear when you close the tab",
  s49: "sessionstorage has the same method as localstorage setitem getitem removeitem",
  s50: "the difference between sessionstorage and localstorage is that sessionstorage belongs to one tab",
  s51: "if you refresh the page it's still there",
  s52: "but if you close the tab it's gone",
  s53: "if you open the same ecommerce website by yourself in the second tab that second tab gets its own separate sessionstorage",
  s54: "so sessionstorage is good for things that only matter in this tab right now like a halffilled form or search filter tab that someone picks",
  s55: "you obviously don't want to keep very important things in sessionstorage",
  s56: "now who can read cookies localstorage sessionstorage",
  s57: "another big difference between all three of them is who gets to read them",
  s58: "cookies go to the server",
  s59: "the browser attaches them to every request that matches the cookie's domain and path",
  s60: "localstorage and sessionstorage never leave the browser by itself",
  s61: "the server only see them if your code sends them",
  s62: "but inside the browser any javascript running on your page can read your localstorage and sessionstorage",
  s63: "that includes your own code but it also includes every thirdparty script that you've added like maybe an analytic script or a chat widget",
  s64: "cookies can be read by javascript through documentcookie",
  s65: "except of course the server explicitly marks them httponly",
  s66: "so based on the comparison cookies are small and they go to the server with every matching request",
  s67: "javascript can read them unless they are set as httponly",
  s68: "localstorage and sessionstorage on the other hand hold more than a cookie",
  s69: "but they stay in the browser they do not get sent to the server and every script on the page can read them",
  s70: "localstorage stays until it's cleared but sessionstorage lives with the tab",
  s71: "so if you close the tab sessionstorage is gone",
  s72: "so in our online shop the login is most likely an httponly cookie and the guest's cart is probably in localstorage while the halffilled checkout form is probably in sessionstorage",
};
const CK_RAW = {"s0": 0.19, "s1": 2.99, "s2": 9.55, "s3": 12.51, "s4": 16.67, "s5": 19.87, "s6": 22.82, "s7": 26.88, "s8": 29.7, "s9": 30.88, "s10": 37.87, "s11": 41.0, "s12": 46.25, "s13": 48.88, "s14": 54.44, "s15": 58.32, "s16": 62.39, "s17": 67.42, "s18": 73.68, "s19": 77.91, "s20": 85.47, "s21": 91.84, "s22": 93.47, "s23": 97.15, "s24": 99.6, "s25": 105.57, "s26": 111.85, "s27": 114.71, "s28": 119.39, "s29": 123.79, "s30": 127.6, "s31": 135.1, "s32": 140.17, "s33": 147.71, "s34": 153.16, "s35": 154.55, "s36": 161.08, "s37": 164.27, "s38": 168.51, "s39": 169.39, "s40": 172.94, "s41": 177.81, "s42": 183.59, "s43": 188.02, "s44": 189.49, "s45": 193.87, "s46": 198.06, "s47": 201.09, "s48": 203.16, "s49": 207.69, "s50": 212.17, "s51": 217.63, "s52": 219.79, "s53": 222.03, "s54": 227.42, "s55": 235.88, "s56": 240.13, "s57": 243.39, "s58": 247.23, "s59": 248.65, "s60": 253.99, "s61": 258.47, "s62": 261.47, "s63": 266.11, "s64": 272.73, "s65": 276.11, "s66": 280.07, "s67": 285.95, "s68": 289.71, "s69": 293.7, "s70": 299.11, "s71": 303.85, "s72": 306.07};
CK.skipIds = new Set(); CK.skip = (...ids) => ids.forEach(i => CK.skipIds.add(i));
/** a graphic drawn in part of the rect it is given (l, t, r, b insets in px) */
CK.inset = (draw, l, t_, r_, b) => (t, r) => draw(t, { x: r.x + l, y: r.y + t_, w: r.w - l - r_, h: r.h - t_ - b });
function CK_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(CK_SENT)) { const c0 = CUR; try { const ph = P(q); if (CK_RAW[k] != null && Math.abs(outToRaw(ph.t) - CK_RAW[k]) > 1.5) { CUR = c0; continue; } s[k] = ph; } catch (e) { CUR = c0; } }
  const keys = Object.keys(s); const first = keys[0]; const SHORT = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (SHORT) { if (kind === 'behind' || kind === 'kw') return; if (refs.includes(first) && kind !== 'talk') return; }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && CK.skipIds.has(sg.id)) TH.segs.pop();
  };
  // shorts: a full-frame graphic becomes the top panel (below her label) with her underneath; a tile becomes her strip
  // shorts: the graphic starts below the top label (never under it)
  const under = (draw) => (t, r) => { const lb = TH.labelBottom() + 24; if (CK.FMT || r.y >= lb) return draw(t, r); rect(r.x, r.y, r.w, r.h, CK.conc); draw(t, { x: r.x, y: lb, w: r.w, h: r.h - (lb - r.y) }); };
  const full = SHORT ? (sp, draw, o = {}) => TH.half(sp, { side: 'top', size: 1180, draw: under(draw), id: o.id }) : CK.full;
  const card = SHORT ? (sp, lines, o = {}) => TH.half(sp, { side: 'top', size: 1100, id: o.id, draw: under(CK.say({ ink: true, title: o.say || lines.join('\n').replace(/\*/g, ''), at: (Array.isArray(sp) ? sp[0] : sp.t) + 0.1, size: 120 })) }) : CK.card;
  const tile = SHORT ? (sp, o = {}) => TH.split(sp, { ...o, her: 0.44, side: 'bottom', at: undefined, w: undefined }) : TH.tile;
  const FX = SHORT && CK.fmtInstall ? CK.fmtInstall(s, first) : null;   // 2026-11-10: the short's format (moments/formats.js) places graphics + her
  const talk0 = TH.talk; const talk = SHORT ? (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }) : TH.talk;
  if (SHORT && first) talk(s[first], { frame: 'mid', id: 'hook' });
  const KW = (sp, w, at, o = {}) => TH.keyword([at - 0.12, Math.min((Array.isArray(sp) ? sp[1] : sp.e) + 0.6, at + String(w).split(/\s+/).length * 0.32 + 1.0)], String(w), { size: V(110, 96), acc: '#7BE6A6', times: String(w).replace(/[~*]/g, '').split(/\s+/).map((_, i) => at + i * 0.12), ...o });
  const fr = (a, b) => ({ from: a, to: b || a });
  // 16:9 tiles: an ink band under the graphic where her captions sit (white captions were unreadable on the concrete, 2026-11-07)
  const BAND = (draw) => (t, r) => { draw(t, { x: r.x, y: r.y, w: r.w, h: r.h - 250 }); rect(r.x, r.y + r.h - 250, r.w, 250, CK.ink); };

  /* ---------- 0:00 why the browser has to remember ---------- */
  on(['s0'], 'split', () => TH.split(s.s0, { her: V(0.38, 0.42), side: V('right', 'bottom'), id: 'topic', enter: 0.01, hold: 0.2,
    draw: CK.topic({ at: [WT(s.s0, 'cookies'), WT(s.s0, 'localstorage'), WT(s.s0, 'sessionstorage')] }) }));
  if (s.s0) ['cookies', 'localstorage', 'sessionstorage'].forEach(w => CK.sfx('slam', WT(s.s0, w), -8));
  on(['s1'], 'talk', () => talk(s.s1, { frame: 'mid', push: [1.0, 1.08], id: 'why' }));
  on(['s1'], 'behind', () => TH.behind([WT(s.s1, 'remember') - 0.15, s.s1.e + 0.4], ['Remember?'], { times: [WT(s.s1, 'remember')], id: 'remember', size: V(200, 160), y: V(250, 560) }));
  on(['s2'], 'talk', () => talk(s.s2, { frame: 'close', id: 'http' }));
  on(['s2'], 'behind', () => TH.behind([WT(s.s2, 'stateless') - 0.15, s.s2.e + 0.5], ['Stateless'], { times: [WT(s.s2, 'stateless')], id: 'stateless-card', size: V(200, 160), y: V(250, 560) }));   // (was a card re-typing her line)
  on(['s3'], 'talk', () => talk(s.s3, { frame: 'wide', id: 'own' }));
  on(['s4'], 'talk', () => talk(s.s4, { frame: 'mid', push: [1.0, 1.1], id: 'no-memory' }));   // (words behind her re-typed her line)
  on(['s5', 's7'], 'split', () => TH.split(fr(s.s5, s.s7), { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'requests',
    draw: CK.stateless({ at1: WT(s.s5, 'log'), at2: WT(s.s6, 'click'), qAt: WT(s.s7, 'know'), }) }));
  if (s.s5) { CK.sfx('dot', WT(s.s5, 'log'), -6); CK.sfx('dot', WT(s.s6, 'click'), -6); CK.sfx('wrong', WT(s.s7, 'know'), -10); }

  /* ---------- 0:29 the cloakroom ---------- */
  on(['s8', 's9'], 'full', () => full(fr(s.s8, s.s9), CK.night(CK.cloak({ at: s.s8.t })), { id: 'cloakroom', sound: 'photo' }));
  on(['s10'], 'talk', () => talk(s.s10, { frame: 'close', punch: ['face'], id: 'face' }));
  on(['s11'], 'ots', () => TH.ots(s.s11, { side: 'auto', w: 760, id: 'ticket', draw: CK.night(CK.cloak({ at: s.s11.t + 0.1 })) }));
  if (s.s11) CK.sfx('ticket', WT(s.s11, 'ticket'), -4);
  on(['s12'], 'room', () => TH.room(s.s12, { her: V(0.36, 0.42), side: V('right', 'bottom'), at: 'cookie', id: 'like-ticket',
    draw: CK.night(CK.cloak({ at: WT(s.s12, 'cookie') - 0.2, flipAt: WT(s.s12, 'ticket') })) }));
  if (s.s12) CK.sfx('flip', WT(s.s12, 'ticket'), -4);
  on(['s13', 's14'], 'full', () => full(fr(s.s13, s.s14), CK.night(CK.trip({ setAt: WT(s.s13, 'cookie'), backAt: WT(s.s14, 'every') })), { id: 'trip' }));
  if (s.s13) { CK.sfx('pop', WT(s.s13, 'cookie'), -5); CK.sfx('dot', WT(s.s14, 'every'), -6); }

  /* ---------- 0:58 cookies ---------- */
  on(['s15'], 'card', () => card([WT(s.s15, 'the first') - 0.12, s.s15.e + 0.5], ['01', '*Cookies*'], { say: '01\nCookies', times: [WT(s.s15, 'first'), WT(s.s15, 'cookie')], id: 'place1' }));
  on(['s16'], 'tile', () => tile(s.s16, { at: 'tr', w: 520, id: 'banner', draw: V(BAND(CK.inset(CK.banner({ at: WT(s.s16, 'accept') }), 0, 0, 560, 0)), CK.banner({ at: WT(s.s16, 'accept') })) }));
  on(['s17'], 'presenter', () => TH.presenter(s.s17, { side: 'right', id: 'name-value',
    draw: CK.code({ at: s.s17.t, z: 46, fit: { dw: 1100, dh: 720 }, lines: [{ s: 'name   session_id', at: WT(s.s17, 'name') }, { s: 'value  117', at: WT(s.s17, 'value'), col: CK.grn }] }) }));
  on(['s18'], 'full', () => full(s.s18, CK.code({ title: 'Set-Cookie', enter: 'slam', at: WT(s.s18, 'setcookie'),
    lines: [{ s: 'HTTP/1.1 200 OK', at: WT(s.s18, 'header') }, { s: 'Set-Cookie: session_id=117', at: WT(s.s18, 'setcookie'), col: CK.grn }] }), { id: 'set-cookie', sound: 'type' }));
  on(['s19'], 'talk', () => talk(s.s19, { frame: 'mid', id: 'back' }));
  on(['s20'], 'split', () => TH.split(s.s20, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'size', draw: CK.scale({ at: WT(s.s20, '4'), headAt: s.s20.t }) }));
  on(['s21'], 'talk', () => talk(s.s21, { frame: 'close', push: [1.0, 1.1], id: 'live-card' }));   // (the card re-typed her question)
  on(['s22', 's23'], 'ots', () => TH.ots(fr(s.s22, s.s23), { side: 'auto', w: 800, id: 'expiry1', draw: CK.expiry({ at1: WT(s.s22, 'session'), headAt: s.s22.t - 0.1 }) }));
  on(['s24'], 'full', () => full(s.s24, CK.receipt({ img: 'mdn-warn', at: WT(s.s24, 'restore'), inAt: s.s24.t,
    crop: [80, 76, 1052, 158], hl: [[668, 80, 1010, 112], [86, 122, 606, 154]], credit: 'Source: MDN Web Docs, Set-Cookie' }), { id: 'restore', sound: 'mark' }));
  on(['s25', 's26'], 'presenter', () => TH.presenter(fr(s.s25, s.s26), { side: 'right', id: 'expiry2', draw: CK.expiry({ at1: s.s25.t - 0.4, at2: WT(s.s25, 'persistent'), foot: true }) }));
  if (s.s25) CK.sfx('stamp', WT(s.s25, 'persistent') + 0.5, -4);
  on(['s27'], 'page', () => TH.page(s.s27, { title: ['document.cookie'], titleAt: 'documentcookie', url: 'shop.example', id: 'doc-cookie' }));
  on(['s28'], 'talk', () => talk(s.s28, { frame: 'close', id: 'login' }));
  on(['s29'], 'behind', () => TH.behind(s.s29, ['Session ID'], { times: [WT(s.s29, 'session', 0)], id: 'session-id' }));
  on(['s30'], 'half', () => TH.half(s.s30, { side: V('left', 'top'), id: 'lookup', draw: CK.code({ at: s.s30.t, z: 40,
    lines: [{ s: 'session_id=117', at: WT(s.s30, 'id') }, { s: '→ Ada Okafor', at: WT(s.s30, 'look'), col: CK.grn }, { s: '→ logged in, cart: 2', at: WT(s.s30, 'look') + 0.6, col: CK.grn }] }) }));

  /* ---------- 2:15 localStorage ---------- */
  on(['s31'], 'card', () => card([WT(s.s31, 'the second') - 0.12, s.s31.e + 0.5], ['02', '*localStorage*'], { say: '02\nlocalStorage', times: [WT(s.s31, 'second'), WT(s.s31, 'localstorage')], id: 'place2' }));
  on(['s32'], 'full', () => full(s.s32, CK.night(CK.test({ n: '01', name: 'Close the browser', head: 'Close browser', subject: 'cart', test: 'browser', at: WT(s.s32, 'close'),
    shutAt: WT(s.s32, 'close') + 0.35, openAt: WT(s.s32, 'reopen'), result: 'there', resAt: WT(s.s32, 'still') })), { id: 'cart-test' }));
  if (s.s32) { CK.sfx('slam', WT(s.s32, 'close'), -4); CK.sfx('shut', WT(s.s32, 'close') + 0.35, -4); CK.sfx('stamp', WT(s.s32, 'still'), -2); }
  on(['s33'], 'presenter', () => TH.presenter(s.s33, { side: 'right', id: 'key-value', draw: CK.code({ at: s.s33.t, z: 44, fit: { dw: 1100, dh: 720 },
    lines: [{ s: 'key    cart', at: WT(s.s33, 'key') }, { s: 'value  [{"id":17,"qty":1}]', at: WT(s.s33, 'value'), col: CK.grn }] }) }));
  // (was the card 'It only stores strings'): a number goes in, a string comes out
  on(['s34'], 'full', () => full([s.s34.t - 0.1, s.s34.e + 0.9], CK.code({ at: s.s34.t, lines: [{ s: "localStorage.setItem('qty', 2)", at: s.s34.t - 0.05, cps: 70 },
    { s: "localStorage.getItem('qty')", at: WT(s.s34, 'strings') - 0.4, cps: 70 }, { s: '→ "2"', at: WT(s.s34, 'strings'), col: CK.grn }] }), { id: 'strings-card', sound: 'type' }));
  on(['s35', 's36'], 'room', () => TH.room(fr(s.s35, s.s36), { her: V(0.36, 0.42), side: V('right', 'bottom'), at: 'cart', id: 'json', draw: CK.code({ at: s.s35.t, z: V(36, 32),
    lines: [{ s: 'const cart = [{ id: 17 }]', at: WT(s.s35, 'cart') }, { s: "localStorage.setItem('cart',", at: WT(s.s35, 'jsonstringify') - 0.6 }, { s: '  JSON.stringify(cart))', at: WT(s.s35, 'jsonstringify'), col: CK.grn },
      { s: 'JSON.parse(', at: WT(s.s36, 'jsonparse') - 0.4, gap: 1.2 }, { s: "  localStorage.getItem('cart'))", at: WT(s.s36, 'jsonparse'), col: CK.grn }] }) }));
  on(['s37'], 'full', () => full({ from: s.s37, to: s.s38 }, CK.receipt({ img: 'mdn-quotas-full', at: WT(s.s37, 'five'), inAt: s.s37.t,
    crop: [425, 198, 1445, 238], hl: [[655, 200, 1000, 234]], credit: 'Source: MDN Web Docs, Storage quotas' }), { id: 'quota', sound: 'mark' }));
  on(['s39'], 'talk', () => talk(s.s39, { frame: 'mid', id: 'too-big' }));
  on(['s40'], 'tile', () => tile(s.s40, { at: 'tl', w: 520, id: 'origin', draw: V(BAND(CK.inset(CK.origin({ at: [WT(s.s40, 'protocol'), WT(s.s40, 'domain'), WT(s.s40, 'ports')] }), 560, 0, 0, 0)), CK.origin({ at: [WT(s.s40, 'protocol'), WT(s.s40, 'domain'), WT(s.s40, 'ports')] })) }));
  if (s.s40) ['protocol', 'domain', 'ports'].forEach(w => CK.sfx('dot', WT(s.s40, w), -6));
  on(['s41'], 'talk', () => talk(s.s41, { frame: 'close', id: 'stays' }));
  on(['s42'], 'split', () => TH.split(s.s42, { her: V(0.34, 0.42), side: V('left', 'bottom'), id: 'board-cart', draw: CK.board({ at: s.s42.t - 0.3,
    cells: [[1, 0, s.s42.t + 0.1], [1, 1, WT(s.s42, 'tab')], [1, 2, WT(s.s42, 'browser')]] }) }));
  if (s.s42) { CK.sfx('dot', WT(s.s42, 'tab'), -4); CK.sfx('dot', WT(s.s42, 'browser'), -4); }
  // the correction (FEEDBACK 2026-11-02): she says "two exceptions" and names one; the card adds Safari's 7-day rule (WebKit)
  on(['s43', 's44'], 'full', () => full([s.s43.t - 0.12, (s.s45 ? s.s45.t + 2.4 : s.s44.e + 2.4)], CK.fix({ at0: s.s43.t, at1: WT(s.s44, 'private'), at2: (s.s45 ? s.s45.t - 0.3 : s.s44.e + 0.3) }), { id: 'two-exceptions', sound: 'mark' }));
  on(['s45'], 'talk', () => talk([s.s45.t + 2.4, s.s45.e + 0.3], { frame: 'mid', id: 'never-sent' }));
  on(['s46'], 'ots', () => TH.ots(s.s46, { side: 'auto', w: 720, id: 'send-it', draw: CK.wire({ at: WT(s.s46, 'send') - 0.3 }) }));

  /* ---------- 3:21 sessionStorage ---------- */
  on(['s47'], 'card', () => card([WT(s.s47, 'the third') - 0.12, s.s47.e + 0.5], ['03', '*sessionStorage*'], { say: '03\nsessionStorage', times: [WT(s.s47, 'third'), WT(s.s47, 'sessionstorage')], id: 'place3' }));
  on(['s48'], 'presenter', () => TH.presenter(s.s48, { side: 'right', id: 'form-gone', draw: (t, r) => { rect(r.x, r.y, r.w, r.h, CK.conc); CK.fit(r, (L) => {
    CK.form(t, 60, L.wide ? 200 : 260, L.wide ? 1.3 : 1.35, { wipeAt: WT(s.s48, 'disappear'), shakeAt: WT(s.s48, 'disappear') - 0.6 }); }); } }));
  if (s.s48) CK.sfx('wipe', WT(s.s48, 'disappear'), -6);
  on(['s49'], 'full', () => full(s.s49, CK.code({ at: s.s49.t,
    lines: [{ s: "sessionStorage.setItem('form', …)", at: WT(s.s49, 'setitem') - 0.15, cps: 60 }, { s: "sessionStorage.getItem('form')", at: WT(s.s49, 'getitem') - 0.15, cps: 60 }, { s: "sessionStorage.removeItem('form')", at: WT(s.s49, 'removeitem') - 0.15, cps: 60 }] }), { id: 'methods', sound: 'type' }));
  on(['s50'], 'talk', () => talk(s.s50, { frame: 'close', push: [1.0, 1.1], id: 'one-tab' }));   // (was a card re-typing her line; the tab tests follow)
  on(['s51'], 'half', () => TH.half([WT(s.s51, 'refresh') - 0.3, s.s51.e + 0.3], { side: V('right', 'top'), id: 'refresh', enter: 0.01, draw: CK.test({ n: '02', name: 'Refresh the page', head: 'Refresh', subject: 'form', test: 'refresh', at: WT(s.s51, 'refresh') - 0.07, result: 'there', resAt: WT(s.s51, 'still') }) }));
  if (s.s51) { CK.sfx('refresh', WT(s.s51, 'refresh') - 0.07, -3); CK.sfx('stamp', WT(s.s51, 'still'), -2); }
  on(['s52'], 'full', () => full([WT(s.s52, 'close') - 0.3, s.s52.e + 0.4], CK.night(CK.test({ n: '03', name: 'Close the tab', head: 'Close tab', subject: 'form', test: 'tab', enter: 'drop', at: WT(s.s52, 'close') - 0.07, result: 'gone', resAt: WT(s.s52, 'gone') })), { id: 'close-tab', lead: 0 }));
  if (s.s52) { CK.sfx('slam', WT(s.s52, 'close') - 0.07, -3); CK.sfx('xclick', WT(s.s52, 'close') + 0.48, -4); CK.sfx('wipe', WT(s.s52, 'gone') - 0.15, -6); CK.sfx('stamp', WT(s.s52, 'gone'), -2); }
  on(['s53'], 'ots', () => TH.ots(s.s53, { side: 'auto', w: 820, id: 'second-tab', draw: CK.night(CK.tabs2({ at: s.s53.t, at2: WT(s.s53, 'second', 1), noHead: true })) }));
  on(['s54'], 'talk', () => talk(s.s54, { frame: 'mid', id: 'right-now' }));
  on(['s55'], 'talk', () => talk(s.s55, { frame: 'close', push: [1.0, 1.1], id: 'important' }));   // (words behind her re-typed her line)

  /* ---------- 4:00 who can read them ---------- */
  on(['s56'], 'card', () => card([s.s56.t - 0.1, s.s56.e + 0.5], ['04', '*Who reads it*'], { say: '04\nWho reads it', times: [WT(s.s56, 'who'), WT(s.s56, 'read')], id: 'who-card' }));
  on(['s57'], 'talk', () => talk(s.s57, { frame: 'close', id: 'difference' }));
  on(['s58', 's59'], 'full', () => full(fr(s.s58, s.s59), CK.night(CK.wire({ at: WT(s.s58, 'cookies') })), { id: 'to-server' }));
  on(['s60', 's61'], 'tile', () => tile(fr(s.s60, s.s61), { at: 'tr', w: 520, id: 'stays-inside', draw: V(BAND(CK.inset(CK.wire({ at: s.s60.t - 2, stayAt: WT(s.s60, 'never') }), 0, 0, 560, 0)), CK.wire({ at: s.s60.t - 2, stayAt: WT(s.s60, 'never') })) }));
  if (s.s60) CK.sfx('stamp', WT(s.s60, 'never') + 0.5, -4);
  on(['s62'], 'talk', () => talk(s.s62, { frame: 'mid', push: [1.0, 1.08], id: 'any-js' }));   // (was a card re-typing her line; the scripts follow)
  on(['s63'], 'full', () => full(s.s63, CK.night(CK.scripts({ at: [WT(s.s63, 'own'), WT(s.s63, 'analytic'), WT(s.s63, 'chat')] })), { id: 'scripts' }));
  if (s.s63) ['own', 'analytic', 'chat'].forEach(w => CK.sfx('pop', WT(s.s63, w), -6));
  on(['s64', 's65'], 'presenter', () => TH.presenter(fr(s.s64, s.s65), { side: 'left', id: 'httponly', draw: CK.httponly({ at: WT(s.s64, 'documentcookie'), lockAt: WT(s.s65, 'httponly'), headAt: s.s64.t - 0.1 }) }));
  if (s.s64) { CK.sfx('type', WT(s.s64, 'documentcookie'), -8); CK.sfx('stamp', WT(s.s65, 'httponly') + 0.4, -3); }

  /* ---------- 4:40 the comparison and the summary ---------- */
  on(['s66'], 'talk', () => talk(s.s66, { frame: 'mid', id: 'comparison' }));
  on(['s67'], 'behind', () => TH.behind(s.s67, ['HttpOnly'], { times: [WT(s.s67, 'httponly')], id: 'unless' }));
  on(['s68'], 'tile', () => tile(s.s68, { at: 'tr', w: 500, id: 'hold-more', draw: V(BAND(CK.inset(CK.scale({ at: s.s68.t - 0.6, at2: WT(s.s68, 'more'), src: 'Sources: RFC 6265 · MDN' }), 0, 0, 540, 0)), CK.scale({ at: s.s68.t - 0.6, at2: WT(s.s68, 'more'), src: 'Sources: RFC 6265 · MDN' })) }));
  on(['s69'], 'talk', () => talk(s.s69, { frame: 'close', id: 'every-script' }));
  on(['s70', 's71'], 'full', () => { const t0 = s.s70.t; const cells = []; for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) cells.push([j, i, t0 + 0.3 + (j * 4 + i) * 0.16]);
    return full(fr(s.s70, s.s71), CK.board({ at: t0 - 0.3, cells, foot: '* Login after the browser closes: depends on the cookie’s expiry.', footAt: t0 + 2.6, hi: 2, hiAt: WT(s.s71, 'sessionstorage') }), { id: 'board' }); });
  if (s.s70) for (let k = 0; k < 12; k += 3) CK.sfx('dot', s.s70.t + 0.3 + k * 0.16, -7);
  on(['s72'], 'split', () => TH.split([s.s72.t - 0.12, s.s72.e + 0.6], { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'summary',
    draw: CK.summary({ at: [WT(s.s72, 'login'), WT(s.s72, 'cart'), WT(s.s72, 'checkout')], headAt: s.s72.t - 0.1 }) }));
  if (s.s72) ['login', 'cart', 'checkout'].forEach(w => CK.sfx('stamp', WT(s.s72, w), -5));
  // sh09 starts on s72 (a short's first line stays her talking): the summary rises once she names the login
  if (SHORT && first === 's72') full([WT(s.s72, 'login') - 0.15, s.s72.e + 0.6], CK.summary({ at: [WT(s.s72, 'login'), WT(s.s72, 'cart'), WT(s.s72, 'checkout')], headAt: WT(s.s72, 'login') - 0.1 }), { id: 'summary-short' });
  if (FX) FX.restore();
}

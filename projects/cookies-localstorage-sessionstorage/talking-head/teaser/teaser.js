/* cookies TEASER v3 (LinkedIn and X, 2026-11-13): one small story a stranger can follow (TEASER-PLAYBOOK.md section 0a) with the
 * trailer grammar of section 0 (cuts shown, title cards on the gaps, music in sections). Plan: teaser/PLAN-v3.md; v2 in
 * ../../archive/teaser-v2/. Order: hook (the server forgets you between requests, the topic big on frame 1) -> the idea (a
 * cookie with a session ID, "the first place a website can keep something in your browser") -> card COOKIES -> what a cookie
 * is -> card LOCALSTORAGE -> the cart that is still there -> card SESSIONSTORAGE -> the form that is gone, refresh vs close tab
 * -> card WHO CAN READ IT? -> never sent / any JavaScript on your page (the music stops) -> the online shop takeaway -> the
 * outroCard (manifest top level). Look: the video's crash-test graphics (ck.js) in Inter Tight; title cards and frame 1 in the
 * font board's Font 32 design-32 (Oswald Bold, black on orange #E57245, Design 405) + DM Mono labels (design-29). */
/* 2026-11-19 (her note B): the hook stays whole (stateless -> every request on its own -> "So how does the server know that it's
 * you?"), then her opening line "Cookies, localStorage and sessionStorage." (raw 0.0-2.9) as a full-frame title card naming the
 * three, then "After you log in…" and the rest as before. The frame-1 topic plate is gone (the names now land where she asked).
 * Bite numbers below are 1-based play order: 1 hook, 2 the three names, 3 the idea, 4 cookie, 5-6 localStorage, 7-8
 * sessionStorage, 9-10 who can read it, 11 the takeaway. Old v3 file: ../../archive/text-cleanup-2026-11-19/teaser/teaser.js */
'use strict';
function buildMoment() {
  const B = [null, ...TZ.bites()], G = TZ.gaps(); const px = (n) => n / BASE[0];
  const at = (i, w) => TZ.at(i - 1, w);
  const talk = (i, o = {}) => TZ.talk(i - 1, { frame: 'mid', ...o });
  const kw = (from, to, text, id) => TH.keyword({ from, to }, text, { id, hold: 0.1, size: V(110, 96), acc: '#7BE6A6', times: text.split(/\s+/).map(() => from) });
  const ins = (a, b, draw, id, o = {}) => CK.full([a, b], draw, { id, capRoom: V(240, 0), ...o });
  const split = (a, b, draw, id, side) => TH.split([a, b], { her: V(0.38, 0.44), side: side || V('right', 'bottom'), id, draw });
  const FB = CK.FB || {}; const ORANGE = FB.card || '#E57245', BLACK = FB.cardInk || '#000000';
  const OSW = (z) => (FB.A ? FB.A(z) : F.disp(z));

  /* 1 · hook: the server forgets you (one stretch, kept whole); the topic big on frame 1 */
  const b1 = (w) => at(1, w);
  talk(1, { frame: 'close', to: b1('log') - 0.15 - B[1].t0 });
  TH.behind([b1('stateless') - 0.15, b1('that means') - 0.1], ['Stateless'], { times: [b1('stateless')], id: 't-stateless', size: V(200, 160), y: V(250, 560) });
  split(b1('log') - 0.15, b1('so how') - 0.1, CK.stateless({ at1: b1('log'), at2: b1('my orders'), qAt: b1('so how') }), 't-forget', V('left', 'bottom'));
  sfx('dot', b1('log'), -6); sfx('dot', b1('my orders'), -6);
  TZ.talk([b1('so how') - 0.1, B[1].t1], { frame: 'close', punch: ['you'], id: 't-you' });

  /* 2 · her opening line "Cookies, localStorage and sessionStorage." = the title card naming the three (her note B) */
  { const n1 = at(2, 'cookies'), n2 = at(2, 'localstorage'), n3 = at(2, 'sessionstorage');
    TH.capOff.push([B[2].t0, B[2].t1]);   // the card spells her words: no caption under it
    TZ.card([B[2].t0, B[2].t1], (t, r, lt) => { rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, ORANGE);
      const port = PORTRAIT; const lines = [['COOKIES', n1], ['LOCAL STORAGE', n2], ['SESSION STORAGE', n3]];
      const z0 = port ? r.w * 0.17 : r.h * 0.2; const z = Math.min(z0, z0 * (r.w * 0.84) / Math.max(...lines.map(l => tw(l[0], OSW(z0)))));
      const x = r.x + r.w * 0.08, y0 = r.y + r.h / 2 - z * 1.05 * 1.5 + z * 0.86;
      lines.forEach(([l, ta], i) => { if (t < ta - 0.06) return; const k = 1 + 0.07 * (1 - E.outQuint(clamp((t - ta + 0.06) / 0.22)));
        withT(x, y0 + i * z * 1.05, k, 0, () => txt(l, 0, 0, OSW(z), BLACK, 'left', 'alphabetic', 0, 'name' + i)); }); }, { id: 'card-names' });
    [n1, n2, n3].forEach((ta, i) => sfx(i < 2 ? 'slam' : 'boom', ta, i < 2 ? -4 : 0, { keep: true })); }

  /* 3 · the idea: the cookie with a session ID, "the first place" */
  const b2 = (w) => at(3, w);
  ins(B[3].t0, b2('so the first') - 0.1, CK.night(CK.trip({ setAt: b2('cookie'), backAt: b2('every') })), 'i-trip');
  sfx('stamp', b2('cookie'), -6);
  TZ.talk([b2('so the first') - 0.1, B[3].t1], { frame: 'mid', push: V([1.0, 1.12], [1.0, 1.1]), id: 't-first' });
  kw(b2('in a cookie') - 0.05, B[3].t1 - 0.02, '~a cookie~', 'k-cookie');

  /* 3 · COOKIES: a small piece of text, a name and a value */
  const b3 = (w) => at(4, w);
  TH.presenter([B[4].t0, B[4].t1], { side: 'right', id: 'p-name-value',
    draw: CK.code({ at: B[4].t0, z: 46, fit: { dw: 1100, dh: 720 }, lines: [{ s: 'name   session_id', at: b3('name') }, { s: 'value  117', at: b3('value'), col: CK.grn }] }) });

  /* 4-5 · LOCALSTORAGE: the cart that is still there, even after the browser closes */
  const b4 = (w) => at(5, w);
  talk(5, { frame: 'close', to: b4('localstorage is the') - 0.1 - B[5].t0 });
  ins(b4('localstorage is the') - 0.1, B[5].t1, CK.night(CK.test({ n: '01', name: 'Close the browser', head: 'Close browser', subject: 'cart', test: 'browser', at: b4('close'), shutAt: b4('close') + 0.35, openAt: b4('reopen'), result: 'there', resAt: b4('still') })), 'i-cart');
  sfx('stamp', b4('still'), -2);
  talk(6, { frame: 'mid', push: V([1.0, 1.1], [1.0, 1.08]) });

  /* 6-7 · SESSIONSTORAGE: the half-filled form that is gone; refresh vs close tab */
  const b6 = (w) => at(7, w), b7 = (w) => at(8, w);
  talk(7, { frame: 'close', to: b6("it's the reason") - 0.1 - B[7].t0 });
  split(b6("it's the reason") - 0.1, B[7].t1, (t, r) => { rect(r.x, r.y, r.w, r.h, CK.conc); CK.fit(r, (L) => { CK.form(t, 60, L.wide ? 200 : 260, L.wide ? 1.3 : 1.35, { wipeAt: b6('disappear'), shakeAt: b6('disappear') - 0.6 }); }); }, 't-form');
  sfx('wipe', b6('disappear'), -6);
  TH.half([B[8].t0, b7('but if') - 0.05], { side: V('right', 'top'), id: 't-refresh', enter: 0.01, draw: CK.test({ n: '02', name: 'Refresh the page', head: 'Refresh', subject: 'form', test: 'refresh', at: b7('refresh') - 0.07, result: 'there', resAt: b7('still') }) });
  sfx('refresh', b7('refresh') - 0.07, -3); sfx('stamp', b7('still'), -2);
  ins(b7('but if') - 0.05, B[8].t1 + 0.3, CK.night(CK.test({ n: '03', name: 'Close the tab', head: 'Close tab', subject: 'form', test: 'tab', enter: 'drop', at: b7('close') - 0.07, result: 'gone', resAt: b7('gone') })), 'i-close-tab', { lead: 0 });
  sfx('slam', b7('close') - 0.07, -3); sfx('stamp', b7('gone'), -2);

  /* 8-9 · WHO CAN READ IT: never sent to the server; any JavaScript on your page can read it (the music stops) */
  const b9 = (w) => at(10, w);
  talk(9, { frame: 'close' });
  split(B[10].t0, b9('but inside') - 0.1, CK.wire({ at: B[10].t0 - 2, stayAt: b9('never') }), 't-never', V('left', 'bottom'));
  const anyJs = b9('any javascript');
  TZ.talk([b9('but inside') - 0.1, b9('that includes') - 0.1], { frame: 'close', id: 't-any-js' });
  ins(b9('that includes') - 0.1, B[10].t1, CK.night(CK.scripts({ at: [b9('own'), b9('analytic'), b9('chat')] })), 'i-scripts');
  sfx('tapeStop', anyJs - 0.55, -1, { keep: true }); TZ.drop(anyJs - 0.25, b9('that includes') - anyJs + 0.1);

  /* 10 · the takeaway: one online shop, the three places */
  const b10 = (w) => at(11, w);
  talk(11, { frame: 'mid', to: b10('login') - 0.15 - B[11].t0 });
  split(b10('login') - 0.15, B[11].t1, CK.summary({ at: [b10('login'), b10('cart'), b10('checkout')], headAt: b10('login') - 0.1 }), 't-summary');
  ['login', 'cart', 'checkout'].forEach(w => sfx('stamp', b10(w), -5));

  /* trailer grammar: a title card per place on the gaps (Oswald black on orange), every join shown */
  const tcard = (gp, text, small, o = {}) => TZ.cut(gp, { type: 'card', text, sub: small, id: o.id, sound: o.sound || 'boom', db: o.db == null ? 6 : o.db, out: o.out === undefined ? 'flash' : o.out, outOpts: o.outOpts || { color: ORANGE, frames: 2 },
    draw: (t, r, lt, text, small) => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, ORANGE);
      const port = PORTRAIT, cx = r.x + r.w / 2, cy = r.y + r.h * 0.52; const sc = 1 + 0.07 * (1 - E.outQuint(clamp(lt / 0.22)));
      withT(cx, cy, sc, 0, () => { const lines = text.split('\n'); const z0 = Math.min(r.w * (port ? 0.2 : 0.14), r.h * 0.3);
        const z = Math.min(z0, ...lines.map(l => z0 * (r.w * 0.8) / Math.max(1, tw(l, OSW(z0))))); const fw = Math.max(...lines.map(l => tw(l, OSW(z)))) + z * 0.5;
        const fh = lines.length * z * 1.0 + z * 0.3; const zs = Math.max(port ? px(34) : 32, z * 0.16);
        lines.forEach((l, k) => _txt(l, -fw / 2 + z * 0.25, -fh / 2 + z * 0.15 + (k + 0.86) * z * 1.0, OSW(z), BLACK, 'left', 'alphabetic', 0));
        if (small) _mono(small.toUpperCase(), -fw / 2 + z * 0.25, -fh / 2 - zs * 0.9, zs, BLACK, 'left', {}); });
    } });
  for (const g of G) TH.capOff.push([g.t0, g.t1]);
  TZ.cut(1, { type: 'black', sound: 'boom', db: -2 });                              // hook (her question) -> the three names
  TZ.cut(2, { type: 'flash', color: '#FFFFFF' });                                  // the names -> the idea
  tcard(G[0], 'COOKIES', '', { id: 'card-cookies' });
  tcard(G[1], 'LOCAL\nSTORAGE', '', { id: 'card-local', out: 'black', sound: 'hit' });
  TZ.cut(5, { type: 'whip', color: CK.ink });                                      // the cart -> closing the browser
  tcard(G[2], 'SESSION\nSTORAGE', '', { id: 'card-session', outOpts: { color: '#FFFFFF', frames: 2 } });
  TZ.cut(7, { type: 'flash', color: '#FFFFFF' });                                  // the form -> refresh vs close tab
  tcard(G[3], 'WHO CAN\nREAD IT?', '', { id: 'card-who', out: 'black', sound: 'hit' });
  TZ.cut(9, { type: 'glitch', colors: [ORANGE, CK.ink, '#FFFFFF'] });              // the question -> never sent
  TZ.cut(10, { type: 'black', sound: 'hit', db: -4 });                              // the scripts -> the takeaway

  /* music in sections: up on frame 1, under the hook, a lift at each card, back after the drop */
  TZ.music(0, -5, 0.02); TZ.music(B[2].t0, 3, 0.03); TZ.music(B[3].t0 + 0.3, -5, 0.4);
  const lift = (g, after) => { TZ.music(g.t0, after + 7, 0.03); TZ.music(g.t1, after, 0.05); };
  lift(G[0], -4); lift(G[1], -3); lift(G[2], -2); lift(G[3], 0);
  TZ.music(B[11].t0, -2, 0.1);
}

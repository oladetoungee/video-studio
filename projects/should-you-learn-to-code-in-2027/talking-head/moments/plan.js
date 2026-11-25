/* learn-to-code: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js). Written 2026-11-03
 * by the FILM agent. RV_SENT = her sentences (film/scenes/rvsent.js); RV_PLAN(mode) finds the ones inside this moment and runs
 * every layout call whose sentences are all there. In a short: the first sentence is her talking (no overlay at the start),
 * no shout / pops / stacks / words behind her, at most one keyword, every graphic on a top panel with her below (she is always
 * on camera in shorts), no punch-ins. Change a layout here and the full edit and the shorts that hold it change together.
 * Receipts (the real Indeed pages) land within 5 s of each claim. 2026-11-19 (her note): the opening aside "I was checking … they
 * found out that" is cut (manifest cuts) and the correction pause is gone: the Indeed pages with their "Source:" credit carry it. */
'use strict';
/** P() that survives a word the cut dropped (whisper times inside a tightened pause): the sentence's first and last
 *  4 words anchor it, the words between are whatever she kept. null = not in this moment. */
RV.find = (q) => { try { return P(q); } catch (e) { /* try the anchors */ }
  const ws = q.split(/\s+/).filter(Boolean); if (ws.length < 6) return null; const c0 = CUR;
  for (let i0 = 0; i0 < Math.min(4, ws.length - 5); i0++) for (let j0 = 0; j0 < Math.min(4, ws.length - 5); j0++) {
    try { const a = P(ws.slice(i0, i0 + 3).join(' '), { peek: true }); if (a.i - c0 > 40) continue;
      const tail = ws.slice(ws.length - 3 - j0, ws.length - j0); const b = P(tail.join(' '), { from: a.i + 3, peek: true });
      const span = b.i + 3 - a.i; if (span > ws.length + 4 || span < ws.length - 10) continue;
      const j = b.i + 2; const seg = WORDS.slice(a.i, j + 1); CUR = j + 1;
      return { t: seg[0].t, e: seg[seg.length - 1].e, w: seg.map(x => x.t), ew: seg.map(x => x.e), i: a.i }; } catch (e) { CUR = c0; } }
  CUR = c0; return null; };
RV.skipIds = new Set(); RV.skip = (...ids) => ids.forEach(i => RV.skipIds.add(i));
function RV_PLAN(mode) {
  RV.q = []; const s = {}; for (const [k, q] of Object.entries(RV_SENT)) { const ph = RV.find(q); if (ph) s[k] = ph; }
  const keys = Object.keys(s); const short = mode === 'short'; const first = short && keys[0] && s[keys[0]].t < 3 ? keys[0] : null; let kws = 0;
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (short) {
      if (kind === 'shout' || kind === 'pops' || kind === 'stack' || kind === 'behind') return;
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw' && (FX || ++kws > 1)) return;   // (formats: the captions carry her words, no keyword)
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && RV.skipIds.has(sg.id)) TH.segs.pop();
  };
  const FX = short && typeof LCF !== "undefined" && LCF.fmtInstall ? LCF.fmtInstall(s, first) : null;   // 2026-11-10: the short's format (moments/formats.js) places graphics + her
  const full0 = RV.full, tile0 = TH.tile, room0 = TH.room, talk0 = TH.talk, ots0 = TH.ots, pres0 = TH.presenter, split0 = TH.split;
  if (short) {   // every graphic on a top panel 1150 px tall, full width, her below it (4:5 window size)
    const top = (sp, o = {}) => TH.half(sp, { side: 'top', size: 1150, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.55, sound: o.sound === false ? false : undefined });
    RV.full = (sp, draw, o = {}) => top(sp, { ...o, draw });
    TH.tile = top; TH.room = top; TH.ots = top; TH.presenter = top; TH.split = (sp, o = {}) => top(sp, o);
    TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });
    if (RV.noHook) { /* the short's own script opens on a graphic */ } else if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
    else TH.talk([0, Math.min(3, TOTAL)], { frame: 'mid', id: 'hook' });
  }
  const T0 = (ph) => ph.t - 0.12; const w = (k, word, after) => WT(s[k], word, after);
  const KW = (sp, txt_, o = {}) => { const ws = String(txt_).replace(/~/g, '').split(/\s+/); const c = o.word || ws.find(x => x.length > 3) || ws[0];
    const t0 = (o.at != null ? o.at : WT(sp, c)) - 0.1; const t1 = o.until != null ? o.until : Math.max(t0 + 1.6, Math.min(sp.e + 0.35, t0 + 3.2));
    const k = { t0, t1, text: txt_, id: o.id || 'kw' + RV.kws.length, y: V(H * 0.68, RV.short() ? 1500 : 1480) };
    for (const q of RV.kws) if (q.t1 > t0) q.t1 = Math.max(q.t0 + 0.2, t0 - 0.05);
    RV.kws.push(k); TH.capOff.push([t0, t1]); TH.used = true; sfx('typeHit', t0 + 0.1, -4); return k; };
  /** black phrase card in set 03 (her words; first line Bold, the rest Light; sentence case), hard cut, no riser */
  const card = (sp, lines, o = {}) => { const st = o.start != null ? o.start : sp[0]; const L = [].concat(lines).map((l, i) => ({ s: l.replace(/\*/g, ''), at: st + 0.05 + i * 0.3 }));
    return RV.full(sp, RV.type({ ground: 'rvInk', size: V(130, 120), lines: L, align: 'center' }), { id: o.id, ground: 'rvInk', sound: 'typeHit', db: -2, noCaps: true }); };
  const span = (a, b) => [a, b];

  /* ---------- 0:00 junior developer jobs right now ---------- */
  on(['s0'], 'other', () => TH.split(span(T0(s.s0), w('s0', 'the reality') - 0.1), { her: V(0.42, 0.44), side: V('right', 'bottom'), id: 'open-q', lead: 0.05,
    draw: RV.type({ kickerAt: T0(s.s0) + 0.1, size: V(150, 130), lines: [{ s: 'SHOULD YOU STILL', times: [T0(s.s0) + 0.15, T0(s.s0) + 0.3, T0(s.s0) + 0.45], amb: [1] }, { s: 'LEARN TO CODE?', times: [w('s0', 'software'), w('s0', 'software') + 0.15, w('s0', 'development')] }] }) }));
  on(['s0'], 'talk', () => TH.talk(span(w('s0', 'the reality') - 0.1, s.s0.e + 0.3), { frame: 'mid', push: [V(1.08, 1.06), V(1.2, 1.14)], id: 'rare' }));
  on(['s1'], 'other', () => TH.ots(span(T0(s.s1), w('s1', 'only') - 0.15), { side: 'auto', w: V(820, 900), id: 'indeed-title', draw: RV.page('ind-head', { t0: T0(s.s1), maxScale: 1.3, align: 'center', valign: 'center' }) }));
  on(['s1'], 'other', () => RV.full(span(w('s1', 'only') - 0.15, w('s1', 'and i have a strong') - 0.05), RV.page('ind-45', { t0: w('s1', 'only') - 0.2, hl: w('s1', '45'),
    big: { s: '4.5%', at: w('s1', '45'), col: RV.delI } }), { id: 'only-45' }));
  on(['s1'], 'talk', () => TH.talk(span(w('s1', 'and i have a strong') - 0.05, s.s1.e + 0.3), { frame: 'wide', id: 'reduced' }));
  on(['s2'], 'other', () => TH.split(s.s2, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'ladder', draw: RV.ladder({ at: T0(s.s2), title: [{ s: 'JUNIOR DEVELOPER?', times: [w('s2', 'junior'), w('s2', 'developer')] }],
    high: ['SENIOR', '69.3%'], highAt: w('s2', 'becoming'), low: ['ENTRY LEVEL', '4.5%'], dropAt: w('s2', "doesn't exist"), lx: 0.12 }) }));
  on(['s3'], 'talk', () => TH.talk(s.s3, { frame: 'mid', id: 'gone-up' }));
  on(['s4'], 'other', () => TH.ots(s.s4, { side: 'auto', w: V(820, 900), id: 'up-15',   // 2026-11-19: was TH.room, which showed only the shelf (her face out of frame); ots keeps split under 40 %
    draw: RV.page('ind-15', { t0: T0(s.s4), hl: w('s4', 'about 15'),
    big: { s: '+15%', at: w('s4', '15'), col: RV.addI }, bigSize: V(200, 200) }) }));
  on(['s5'], 'other', () => RV.full(s.s5, RV.page('ind-71', { t0: T0(s.s5), hls: [w('s5', 'senior'), w('s5', 'senior') + 0.3],
    big: { s: '71%', at: w('s5', 'mostly'), col: RV.ink } }), { id: 'senior-71', hold: 0.6 }));

  /* ---------- 0:43 is there still a point in learning to code? ---------- */
  on(['s6'], 'talk', () => TH.talk(s.s6, { frame: 'wide', alt: true, id: 'learning' }));
  on(['s7'], 'other', () => TH.tile(s.s7, { at: V('br', 'br'), w: V(540, 420), id: 'just-code', draw: RV.photo('px_laptop', { at: T0(s.s7), credit: 'Lukas Blazek', labelAt: w('s7', 'vibe') }) }));
  on(['s8'], 'talk', () => TH.talk(s.s8, { frame: 'close', push: [1.0, 1.1], id: 'for-you' }));
  on(['s9'], 'talk', () => TH.talk(span(T0(s.s9), w('s9', 'is there even') - 0.15), { frame: 'mid', id: 'asking' }));
  on(['s9'], 'talk', () => TH.talk(span(w('s9', 'is there even') - 0.12, s.s9.e + 0.4), { frame: 'close', push: [1.0, 1.1], id: 'a-point' }));   // (was a card re-typing her question)
  // (was 'YES. BUT NOT THE WAY…' typed out): the old way, as code typed and then struck
  on(['s10'], 'other', () => TH.ots(s.s10, { side: 'auto', w: V(760, 900), id: 'yes-but', draw: RV.night(RV.sheet({ file: 'lesson-01.js', tag: 'the old way', fs: V(44, 40), at: T0(s.s10),
    lines: [{ s: 'for (let i = 0; i < 10; i++) {', k: '-', at: T0(s.s10) + 0.2, strikeAt: w('s10', 'three') }, { s: '  console.log(i)', k: '-', at: T0(s.s10) + 0.6, strikeAt: w('s10', 'three') + 0.15 }, { s: '}', k: '-', at: T0(s.s10) + 0.9, strikeAt: w('s10', 'three') + 0.3 }] })) }));
  on(['s11'], 'talk', () => TH.talk(s.s11, { frame: 'close', id: 'someone' }));
  on(['s12'], 'talk', () => TH.talk(s.s12, { frame: 'wide', push: [1.0, 1.08], id: 'why-video' }));   // (was 'THE ADVICE I WOULD GIVE THEM')
  on(['s13'], 'talk', () => TH.talk(s.s13, { frame: 'wide', id: 'easier' }));
  // (THEN: SO HARD / NOW: SO EASY dropped: it re-typed her lines)
  on(['s16'], 'talk', () => TH.talk(span(T0(s.s16), w('s16', 'if you focus') - 0.12), { frame: 'mid', alt: true, push: [1.0, 1.1], id: 'beginner' }));
  on(['s16'], 'other', () => RV.full(span(w('s16', 'if you focus') - 0.12, s.s16.e + 0.6), RV.night(RV.sheet({ file: 'learning-to-code.md', tag: 'your plan', fs: V(50, 42), at: w('s16', 'if you focus') - 0.1,
    lines: [{ s: 'learn syntax', k: '-', at: w('s16', 'focus'), noType: true, strikeAt: w('s16', 'four') }, { s: 'learn to write a for loop', k: '-', at: w('s16', 'focus') + 0.1, noType: true, strikeAt: w('s16', 'things') },
      { s: 'reading code', k: '+', at: w('s16', 'reading code') }, { s: 'debugging', k: '+', at: w('s16', 'debugging') }, { s: 'fundamentals', k: '+', at: w('s16', 'fundamentals') },
      { s: '  + a little system design', k: '+', at: w('s16', 'system design'), c: RV.dim }, { s: 'domain knowledge', k: '+', at: w('s16', 'domain knowledge') }] })), { id: 'four-things' }));

  /* ---------- 1:47 skill 1: reading code ---------- */
  on(['s17'], 'other', () => RV.full(s.s17, RV.skill({ ground: 'rvNight', n: 1, name: 'Reading code', at: T0(s.s17) - 0.2, nameAt: T0(s.s17) - 0.15 }), { id: 'skill-1', ground: 'rvNight', sound: 'tick' }));
  on(['s18'], 'talk', () => TH.talk(s.s18, { frame: 'close', id: 'i-swear' }));
  on(['s19'], 'talk', () => TH.talk(s.s19, { frame: 'mid', id: 'promise' }));
  on(['s20'], 'other', () => TH.split(s.s20, { her: V(0.38, 0.44), side: V('right', 'bottom'), id: 'not-read', draw: RV.night(RV.sheet({ file: 'new-feature.js', tag: 'written by AI', fs: V(40, 36), at: T0(s.s20),
    lines: ['export async function checkout(cart) {', '  const total = sumPrices(cart.items)', '  const order = await db.orders.create(cart)', '  await payments.charge(order.id, total)', '  await mailer.send(order.email, "Thanks!")', '  return order', '}'].map((x, i) => ({ s: x, k: ' ', at: T0(s.s20) + 0.2 + i * 0.32 })),
    status: { l: 'written: yes', r: 'read: not yet', at: w('s20', 'not even reading') } })) }));
  on(['s21'], 'talk', () => TH.talk(s.s21, { frame: 'wide', id: 'important' }));
  on(['s22'], 'other', () => TH.tile(s.s22, { at: V('br', 'br'), w: V(500, 420), id: 'read-it', draw: RV.sheet({ file: 'signup.js', tag: 'written by AI', fs: V(48, 40), at: T0(s.s22),
    lines: RV_CODE0, sel: { from: 0, to: 3, at: w('s22', 'look back') }, comment: { line: 1, s: ['Saves the user.', 'Is it what I asked for?'], at: w('s22', 'whether'), by: 'YOU' } }) }));
  on(['s23'], 'talk', () => TH.talk(s.s23, { frame: 'close', id: 'interesting' }));
  on(['s24'], 'talk', () => TH.talk(s.s24, { frame: 'close', push: [1.0, 1.08], id: 'recommend' }));   // (was 'I RECOMMEND IT AS A SKILL' typed out)
  on(['s25'], 'talk', () => TH.talk(s.s25, { frame: 'mid', alt: true, push: [1.0, 1.1], id: 'learn-to-read' }));

  /* ---------- 2:29 skill 2: debugging ---------- */
  on(['s26'], 'other', () => RV.full(s.s26, RV.skill({ ground: 'rvNight', n: 2, name: 'Debugging', at: T0(s.s26) - 0.2, nameAt: T0(s.s26) - 0.15 }), { id: 'skill-2', ground: 'rvNight', sound: 'tick' }));
  on(['s27'], 'talk', () => TH.talk(s.s27, { frame: 'mid', id: 'debug-def' }));   // (was the definition typed out; the crash follows)
  on(['s28'], 'other', () => RV.full(s.s28, RV.night(RV.sheet({ file: 'signup.js', fs: V(50, 42), at: T0(s.s28), lines: RV_CODE0, err: { s: RV_ERR, at: w('s28', 'crashes') } })), { id: 'crash', hold: 0.4 }));
  on(['s29', 's30'], 'talk', () => TH.talk({ from: s.s29, to: s.s30 }, { frame: 'mid', punch: ['joking'], id: 'not-joking' }));
  on(['s31'], 'talk', () => TH.talk(s.s31, { frame: 'wide', id: 'context' }));
  on(['s32'], 'talk', () => TH.talk(span(T0(s.s32), w('s32', 'one easy fix') - 0.12), { frame: 'close', id: 'paste' }));
  on(['s32', 's33', 's34', 's35'], 'other', () => RV.full(span(w('s32', 'one easy fix') - 0.12, s.s35.e + 0.5), RV.night(RV.sheet({ file: 'signup.js', tag: 'suggested by AI', fs: V(46, 40), at: w('s32', 'one easy fix') - 0.1,
    lines: [RV_CODE0[0], { s: '  await db.insert(user)', k: '-', at: w('s32', 'wrap') - 0.3, noType: true, strikeAt: w('s32', 'the save') }, { s: '  try { await db.insert(user) }', k: '+', at: w('s32', 'trycatch') }, { s: '  catch (e) { }', k: '+', at: w('s32', 'trycatch') + 0.6 }, RV_CODE0[2], RV_CODE0[3]],
    err: { s: RV_ERR, at: w('s32', 'one easy fix') - 0.1, goneAt: w('s33', 'goes away') }, status: { l: 'page: no crash', r: 'signed up: 0', at: w('s34', 'stops crashing') } })), { id: 'try-catch' }));
  on(['s36'], 'talk', () => TH.talk(s.s36, { frame: 'close', id: 'nobody' }));
  on(['s37'], 'other', () => TH.presenter(s.s37, { side: 'right', id: 'read-error', draw: RV.night(RV.sheet({ file: 'error', tag: 'read it yourself', fs: V(44, 38), at: T0(s.s37), minW: 0,
    lines: RV_ERR.map(x => ({ s: x, k: ' ', c: RV.delI, b: true })), sel: { from: 0, to: 2, at: w('s37', 'read the error') }, comment: { line: 1, s: ['This email already', 'has an account.'], at: w('s37', 'somebody with'), by: 'YOU' } })) }));
  on(['s38'], 'other', () => TH.room(span(T0(s.s38), w('s38', 'tell the user') - 0.1), { at: 'so the real fix', side: V('right', 'bottom'), id: 'real-fix', draw: RV.night(RV.sheet({ file: 'signup.js', tag: 'your change', fs: V(44, 38), at: T0(s.s38),
    lines: [RV_CODE0[0], { s: '  if (await db.emailTaken(user))', k: '+', at: w('s38', 'check') }, { s: "    return 'email taken'", k: '+', at: w('s38', 'check') + 0.9 }, RV_CODE0[1], RV_CODE0[2], RV_CODE0[3]] })) }));
  on(['s38'], 'other', () => TH.ots(span(w('s38', 'tell the user') - 0.1, s.s38.e + 0.6), { side: 'auto', w: V(720, 900), id: 'email-taken', draw: RV.form({ at: w('s38', 'tell the user') - 0.1, btnAt: w('s38', 'tell the user') + 0.2, msg: { s: 'This email is already taken.', at: w('s38', 'already taken') } }) }));
  on(['s39'], 'talk', () => TH.talk(s.s39, { frame: 'mid', id: 'bandwidth' }));
  on(['s40'], 'talk', () => TH.talk(s.s40, { frame: 'close', id: 'loop' }));
  on(['s41'], 'talk', () => TH.talk(s.s41, { frame: 'wide', id: 'help' }));
  // (was 'THE FIX AI GIVES YOU OR THE ACTUAL PROBLEM?' typed out + a stamp): the two fixes as code, the AI's one struck
  on(['s42', 's43'], 'other', () => TH.split({ from: s.s42, to: s.s43 }, { her: V(0.42, 0.44), side: V('left', 'bottom'), id: 'which-one', draw: RV.night(RV.sheet({ file: 'signup.js', tag: 'which fix?', fs: V(42, 38), at: T0(s.s42),
    lines: [{ s: '  try { await db.insert(user) }', k: '-', at: w('s42', 'a fix'), strikeAt: w('s42', 'actual') }, { s: '  catch (e) { }', k: '-', at: w('s42', 'a fix') + 0.3, strikeAt: w('s42', 'actual') + 0.1 },
      { s: '  if (await db.emailTaken(user))', k: '+', at: w('s42', 'problem') }, { s: "    return 'email taken'", k: '+', at: w('s42', 'problem') + 0.4 }] })) }));

  /* ---------- 3:31 skill 3: fundamentals + a bit of system design ---------- */
  on(['s44'], 'other', () => RV.full(s.s44, RV.skill({ ground: 'rvNight', n: 3, name: 'Fundamentals', at: T0(s.s44) - 0.2, nameAt: T0(s.s44) - 0.15 }), { id: 'skill-3', ground: 'rvNight', sound: 'tick' }));
  // (was a sheet spelling out the flow): the parts as objects, a request travels and is saved
  on(['s45'], 'other', () => TH.tile(s.s45, { at: V('tr', 'br'), w: V(500, 420), id: 'web-works', draw: RV.parts({ top: V(260, 0), at: T0(s.s45), go: [w('s45', 'how the web') + 0.4, w('s45', 'the database')], saveAt: w('s45', 'save your data') }) }));
  on(['s46'], 'talk', () => TH.talk(s.s46, { frame: 'mid', push: [1.0, 1.08], id: 'system-design' }));   // (was 'HOW ALL THE PARTS OF YOUR APP WORK TOGETHER' typed out)
  // (was a sheet re-typing her three questions): the same parts, each question a mark on them
  on(['s47', 's48', 's49'], 'other', () => TH.split({ from: s.s47, to: s.s49 }, { her: V(0.4, 0.44), side: V('right', 'bottom'), id: 'questions', draw: RV.parts({ at: T0(s.s47) - 0.2, q1At: w('s47', 'go wrong'), q2At: w('s48', 'saved'), q3At: T0(s.s49) + 0.3 }) }));
  on(['s50'], 'talk', () => TH.talk(s.s50, { frame: 'close', id: 'example' }));
  on(['s51', 's52'], 'other', () => TH.split({ from: s.s51, to: s.s52 }, { her: V(0.36, 0.44), side: V('left', 'bottom'), id: 'webhook', draw: RV.night(RV.flow({ at: T0(s.s51), sendAt: w('s51', 'sends your server'),
    title: [{ s: 'A WEBHOOK', times: [w('s52', 'a webhook') , w('s52', 'webhook')], cols: { 1: RV.addI } }] })) }));
  on(['s53', 's54', 's55'], 'other', () => RV.full({ from: s.s53, to: s.s55 }, RV.night(RV.flow({ at: T0(s.s53) - 5, sendAt: T0(s.s53) - 4, againAt: w('s53', 'send the webhook again') })), { id: 'twice' }));
  on(['s56'], 'talk', () => TH.talk(s.s56, { frame: 'mid', id: 'or-else' }));
  on(['s57'], 'talk', () => TH.talk(s.s57, { frame: 'wide', alt: true, id: 'together' }));

  /* ---------- 4:23 skill 4: domain knowledge ---------- */
  on(['s58'], 'other', () => RV.full(s.s58, RV.skill({ ground: 'rvNight', n: 4, name: 'Domain knowledge', at: T0(s.s58) - 0.2, nameAt: T0(s.s58) - 0.15 }), { id: 'skill-4', ground: 'rvNight', sound: 'tick' }));
  on(['s59'], 'talk', () => TH.talk(s.s59, { frame: 'close', id: 'domain-def' }));   // (was the definition typed out)
  on(['s60'], 'talk', () => TH.talk(span(T0(s.s60), w('s60', 'where i work') - 0.12), { frame: 'mid', id: 'kinds' }));
  on(['s60'], 'other', () => TH.tile(span(w('s60', 'where i work') - 0.12, s.s60.e + 0.4), { at: V('bl', 'br'), w: V(520, 420), id: 'fleet', draw: RV.photo('px_truck', { at: w('s60', 'where i work') - 0.1, credit: 'Feli Art', labelAt: w('s60', 'fleet'), fy: 0.55 }) }));
  on(['s61'], 'pops', () => TH.pops(s.s61, [{ s: 'FINANCE', at: 'finance' }, { s: 'HEALTH', at: 'health' }, { s: 'PAYMENTS', at: 'payments' }, { s: 'LOGISTICS', at: 'logistics' }, { s: 'SCHOOL', at: 'school' }], { id: 'fields', plate: 'rv' }));
  on(['s61'], 'other', () => (short ? TH.split(s.s61, { id: 'fields-s', draw: RV.sheet({ file: 'where software works', fs: 44, lines: ['finance', 'health', 'payments', 'logistics', 'school'].map(x => ({ s: x, k: '+', at: w('s61', x) })) }) }) : null));
  on(['s62'], 'other', () => TH.split(s.s62, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'pharmacy', draw: RV.photo('px_pharmacy', { at: T0(s.s62), credit: 'cottonbro studio', labelAt: w('s62', 'pharmacy'), fx: 0.5, fy: 0.4 }) }));
  on(['s63', 's64'], 'other', () => RV.full({ from: s.s63, to: s.s64 }, RV.shelf({ at: T0(s.s63), firstAt: w('s63', 'expires first'), batchAt: w('s64', 'which batch'), photo: 'px_pharmacy', credit: 'cottonbro studio' }), { id: 'expires-first' }));
  on(['s65'], 'other', () => TH.room(s.s65, { at: 'if you have', side: V('right', 'bottom'), id: 'whats-missing', draw: RV.night(RV.sheet({ file: 'pharmacy-stock-app', tag: 'built by AI', fs: V(52, 44), at: T0(s.s65),
    lines: [{ s: 'products and prices', k: ' ', at: T0(s.s65) + 0.1, noType: true }, { s: 'stock count per product', k: ' ', at: T0(s.s65) + 0.25, noType: true }, { s: 'sell the batch that expires first', k: '+', at: w('s65', 'what is missing') }],
    comment: { line: 2, s: ['AI missed these.'], at: w('s65', 'what is missing') + 0.2, by: 'YOU KNOW THE DOMAIN' } })) }));
  on(['s66'], 'talk', () => TH.talk(s.s66, { frame: 'mid', push: [1.0, 1.1], id: 'not-solid' }));
  on(['s67'], 'talk', () => TH.talk(s.s67, { frame: 'close', id: 'whatever-field' }));
  on(['s68'], 'other', () => TH.room(s.s68, { at: 'they will always', side: V('left', 'bottom'), id: 'go-to', draw: RV.photo('px_meeting', { at: w('s68', 'in companies') - 0.2, credit: 'Christina Morillo', labelAt: w('s68', 'know the business') }) }));
  on(['s69'], 'talk', () => TH.talk(s.s69, { frame: 'wide', id: 'build-it' }));

  /* ---------- 5:22 so, should you learn to code? ---------- */
  on(['s70'], 'other', () => TH.ots(s.s70, { side: 'auto', w: V(760, 900), id: 'faster', draw: RV.photo('px_laptop', { at: T0(s.s70), credit: 'Lukas Blazek' }) }));   // (was 'IN 2027 YOU CAN LEARN WAY FASTER WITH AI' typed out)
  on(['s71'], 'other', () => RV.full(s.s71, (t, r) => { RV.type({ size: V(180, 150), lines: [{ s: 'STILL WORTH IT.', times: [w('s71', 'still'), w('s71', 'worth'), w('s71', 'it')], cols: { 1: RV.addI, 2: RV.addI } }], ground: 'rvGrey', stamp: { s: 'APPROVED', at: w('s71', 'it') + 0.2 } })(t, r); }, { id: 'worth-it', hold: 0.5, sound: 'paper' }));
  on(['s71'], 'other', () => sfx('typeHit', w('s71', 'it') + 0.2, 0));
  on(['s72'], 'other', () => TH.ots(s.s72, { side: 'auto', w: V(1000, 900), id: 'less-of', draw: RV.night(RV.sheet({ file: 'learning-to-code.md', tag: 'focus on other things', fs: V(60, 50), at: T0(s.s72),
    lines: [{ s: 'learning syntax', k: '-', at: w('s72', 'learning syntax') - 0.2, strikeAt: w('s72', 'syntax') + 0.1 }, { s: 'learning to write a for loop', k: '-', at: w('s72', 'how to write') - 0.2, strikeAt: w('s72', 'loop') + 0.1 }, { s: 'reading code, debugging, ...', k: '+', at: w('s72', 'stuff like that'), c: RV.dim }] })) }));
  on(['s73'], 'talk', () => TH.talk(s.s73, { frame: 'close', id: 'not-a-role' }));
  on(['s74'], 'other', () => TH.tile(s.s74, { at: V('br', 'br'), w: V(480, 420), id: 'junior-role', draw: RV.ladder({ at: T0(s.s74), dropAt: T0(s.s74) - 1, high: ['SENIOR', ''], highAt: T0(s.s74), low: ['A JUNIOR ROLE', 'RIGHT NOW?'], lx: 0.1 }) }));
  on(['s75'], 'other', () => RV.full(s.s75, RV.night(RV.sheet({ file: 'your-plan.md', tag: 'my advice', fs: V(64, 52), at: T0(s.s75),
    lines: [{ s: '1  build with AI first', k: ' ', at: w('s75', 'build with'), b: true }, { s: '2  learn to work with it', k: ' ', at: w('s75', 'learn to work'), b: true }, { s: '3  then learn the rest', k: ' ', at: w('s75', 'learn the rest'), b: true },
      ],
    sel: { from: 0, to: 0, at: w('s75', 'first') + 0.2, goneAt: w('s75', 'learn to work') } })), { id: 'plan' }));
  on(['s76', 's77', 's78'], 'other', () => TH.split({ from: s.s76, to: s.s78 }, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'free-places', draw: RV.night(RV.sheet({ file: 'free-places.md', tag: 'free', fs: V(60, 50), at: T0(s.s76),
    lines: ['MDN Web Docs', 'freeCodeCamp', 'The Odin Project'].map((x, i) => ({ s: x, k: '+', at: T0(s.s76) + 0.3 + i * 0.45 })) })) }));
  on(['s79'], 'talk', () => TH.talk(s.s79, { frame: 'mid', id: 'commit' }));
  on(['s80'], 'talk', () => TH.talk(span(T0(s.s80), w('s80', 'the reality') - 0.12), { frame: 'wide', id: 'so-good' }));
  on(['s80'], 'other', () => TH.ots(span(w('s80', 'the reality') - 0.12, s.s80.e + 0.4), { side: 'auto', w: V(780, 900), id: 'market', draw: RV.page('ind-head', { t0: w('s80', 'the reality') - 0.1, maxScale: 1 }) }));
  on(['s81'], 'talk', () => TH.talk(span(T0(s.s81), w('s81', 'a promise') - 0.12), { frame: 'close', id: 'anybody' }));
  on(['s81'], 'talk', () => TH.talk(span(w('s81', 'a promise') - 0.12, s.s81.e + 0.5), { frame: 'close', push: [1.0, 1.12], id: 'promise-card' }));   // (was a card re-typing her question)

  RV.flush(-4);
  if (short) { RV.full = full0; TH.tile = tile0; TH.room = room0; TH.talk = talk0; TH.ots = ots0; TH.presenter = pres0; TH.split = split0; }
  if (FX) FX.restore();
}

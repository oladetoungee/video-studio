/* learn-to-code: the MOTION FILM (her whole narration, tightened: film/data/cutlist.json), pure motion graphics in her pick
 * B · YOU ARE THE REVIEWER + A's missing-rung ladder for the 4.5 % part (scenes/rvkit.js). One scene per sentence of hers
 * (scenes/rvsent.js): a sentence with a diagram gets the diagram (the same review sheets, pages, ladder, form, webhook and
 * shelf as the talking-head edit, full frame); the others are her words as kinetic type, on grey, white or ink. Receipts
 * (the real Indeed pages) land on her words; the 15 % slip gets the correction screen. Every frame is a pure function of time. */
'use strict';
/** her words as kinetic type: phrase lines (<= 18 characters 16:9 / 12 in 9:16, never ending on a little word), up to 3 lines
 *  a page, each word lands on her time; the page turns when it is full. o.kicker (mono, top), o.amb: words in an amber box. */
RV.say = (ph, o = {}) => {
  const idx = []; for (let k = 0; k < ph.w.length; k++) idx.push(k);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length).map((x, k) => ({ s: x.w.replace(/[.,!?;:"“”]+$/g, '').replace(/^["“]/, ''), t: ph.w[k], e: ph.ew[k], n: x.n }));
  return (t, r) => {
    const gk = o.ground || 'rvGrey'; rvGround(r, gk); const gr = G[gk]; const max = V(18, 12); const z = V(o.size || 132, o.size9 || 118);
    const lines = []; let cur = [];
    const WEAKS = new Set(['a', 'an', 'the', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'but', 'is', 'that', 'so', 'if', 'you', 'i', 'my', 'your', 'with', 'like', 'at', 'it', 'be', 'are', 'was']);
    ws.forEach((x) => { const len = cur.map(y => y.s).join(' ').length; if (cur.length && len + x.s.length + 1 > max) { const moved_ = []; while (cur.length > 1 && WEAKS.has(cur[cur.length - 1].n)) moved_.unshift(cur.pop()); lines.push(cur); cur = moved_; } cur.push(x); });
    if (cur.length) lines.push(cur);
    const per = V(3, 4); const pages = []; for (let i = 0; i < lines.length; i += per) pages.push(lines.slice(i, i + per));
    // never a page with one short line alone: it joins the page before (one line more)
    if (pages.length > 1) { const last = pages[pages.length - 1]; if (last.length === 1 && last[0].length <= 3) { pages[pages.length - 2].push(...last); pages.pop(); } }
    let pi = 0; for (let i = 0; i < pages.length; i++) if (t >= pages[i][0][0].t - 0.15) pi = i;
    const pg = pages[pi]; const m = V(130, 80); const lh = z * 1.06; let y = r.y + (r.h - pg.length * lh) / 2 + z * 0.8;
    if (o.kicker) withA(rvE(t, ph.t - 0.1, 0.3), () => txt(o.kicker, r.x + m, y - z * 1.1, FM(36, 700), o.kickerCol || (gk === 'rvInk' ? RV.amb : gr.mid), 'left', 'alphabetic', 2, 'say-kicker'));
    SCENE_ID = SCENE_ID; pg.forEach((ln, li) => { const s = ln.map(x => x.s).join(' ').toUpperCase(); const amb = o.amb ? ln.map((x, k) => (o.amb.includes(x.n) ? k : -1)).filter(k => k >= 0) : [];
      const cols = {}; ln.forEach((x, k) => { if (o.green && o.green.includes(x.n)) cols[k] = RV.addI; if (o.red && o.red.includes(x.n)) cols[k] = RV.delI; });
      RV.words(t, s, r.x + m, y + li * lh, z, gr.fg, { times: ln.map(x => x.t), key: 'say-p' + pi + 'l' + li, maxW: r.w - 2 * m, amb, cols }); });
  };
};
function buildFilm() {
  RV.q = [];
  const s = {}; for (const [k, q] of Object.entries(RV_SENT)) { try { s[k] = P(q); } catch (e) { const ws = q.split(' '); try { const a = P(ws.slice(0, 4).join(' '), { peek: true }); const b = P(ws.slice(-4).join(' '), { from: a.i + 4 }); const seg = WORDS.slice(a.i, b.i + 4); s[k] = { t: seg[0].t, e: seg[seg.length - 1].e, w: seg.map(x => x.t), ew: seg.map(x => x.e), i: a.i }; } catch (e2) { console.warn('film: sentence not found', k); } } }
  const T0 = (ph) => ph.t - 0.12; const w = (k, word, after) => WT(s[k], word, after);
  const R = () => ({ x: 0, y: 0, w: W, h: H });
  let n = 0; const GR = ['rvGrey'];
  /** one scene: id, start, ground key, draw(t, r); a slow 2 % push keeps it alive */
  let lastG = '';
  const scene = (id, start, ground, draw, o = {}) => { if (start == null || !isFinite(start)) return; if (ground === lastG && G[ground + 'B']) ground = ground + 'B'; lastG = ground; addScene(start, ground, id, (t) => {
    const k = 1 + 0.02 * E.inOutCubic(prog(t, start, Math.max(1, o.dur || 6))); withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => { try { draw(t, R()); } catch (e) { throw new Error(id + ': ' + e.stack.split('\n').slice(0, 4).join(' | ')); } }); }, { id: id + (SCENES.some(x => x.id === id) ? '-b' : '') }); };
  const say = (k, o = {}) => { if (!s[k]) return; const gk = o.ground || GR[n++ % GR.length]; scene(k, T0(s[k]), gk, RV.say(s[k], { ...o, ground: gk })); sfx(['tick', 'tap', 'typeHit', 'check', 'pop'][n % 5], s[k].t, -7); };
  const has = (...ks) => ks.every(k => s[k]);
  /** a type scene: one hand-picked headline from her sentence (her words, <= 4 short lines), each line lands on its spoken word;
   *  grey ground (ink only for the punchlines: o.ink). L = [[text, word in her sentence, {colours}], ...] (word may be [key, word]). */
  const HL = (k, L, o = {}) => { if (!s[k]) return; const gk = o.ink ? 'rvInk' : 'rvGrey';
    const lines = L.map(([tx, wd, cols, amb]) => ({ s: tx, at: Array.isArray(wd) ? w(wd[0], wd[1]) : wd == null ? T0(s[k]) + 0.1 : w(k, wd), cols, amb }));
    if (lines.length) lines[0].at = Math.min(lines[0].at, T0(s[k]) + 0.15);   // never an empty frame after the cut
    scene(o.id || k, T0(s[k]), gk, RV.type({ ground: gk, size: V(o.size || 140, o.size9 || 128), lines, kicker: o.kicker, kickerAt: T0(s[k]) + 0.05 }), o);
    sfx(['tick', 'tap', 'typeHit', 'check', 'pop'][n++ % 5], T0(s[k]) + 0.12, -7); };

  /* ---------- 0:00 junior developer jobs right now ---------- */
  if (has('s0')) scene('open', 0, 'rvGrey', RV.type({ kicker: 'A DEVELOPER ANSWERS', kickerAt: 0.2, size: V(170, 140), lines: [{ s: 'SHOULD YOU STILL', times: [0.3, 0.45, 0.6], amb: [1] }, { s: 'LEARN TO CODE?', times: [w('s0', 'software'), w('s0', 'software') + 0.15, w('s0', 'development')] }],
    sub: 'Junior developer roles are very, very rare right now.', subAt: w('s0', 'junior') }));
  if (has('s0')) scene('rare', w('s0', 'very') - 0.1, 'rvInk', RV.type({ size: V(220, 170), lines: [{ s: 'VERY, VERY,', times: [w('s0', 'very'), w('s0', 'very', w('s0', 'very') + 0.05)] }, { s: 'VERY, VERY', times: [w('s0', 'very', w('s0', 'very') + 0.3), w('s0', 'rare') - 0.25] }, { s: 'RARE.', at: w('s0', 'rare'), cols: { 0: RV.delI } }] }));
  if (has('s1')) { scene('indeed', T0(s.s1), 'rvGrey', RV.page('ind-title', { t0: T0(s.s1), title: [{ s: "INDEED'S RESEARCH TEAM", times: [w('s1', "indeed's"), w('s1', 'research'), w('s1', 'team')] }], align: 'center', maxScale: 1.4 }));
    scene('only-45', w('s1', 'only') - 0.15, 'rvGrey', RV.page('ind-45', { t0: w('s1', 'only') - 0.2, hl: w('s1', '45'), big: { s: '4.5%', at: w('s1', '45'), sub: 'of software development job postings on Indeed were entry level, Q1 2026', col: RV.delI }, title: [{ s: 'ENTRY-LEVEL JOBS', times: [w('s1', 'entry'), w('s1', 'level')] }] }));
    scene('reduced', w('s1', 'and i have a strong') - 0.1, 'rvGrey', RV.type({ size: V(140, 128), lines: [{ s: 'AND THAT NUMBER', at: w('s1', 'and i have a strong') }, { s: 'HAS EVEN', at: w('s1', 'has even') }, { s: 'REDUCED', at: w('s1', 'reduced'), cols: { 0: RV.delI } }] })); }
  if (has('s2')) scene('ladder', T0(s.s2), 'rvGrey', RV.ladder({ at: T0(s.s2), title: [{ s: 'JUNIOR DEVELOPER?', times: [w('s2', 'junior'), w('s2', 'developer')] }], high: ['SENIOR', '69.3%'], highAt: w('s2', 'becoming'), low: ['ENTRY LEVEL', '4.5%'], dropAt: w('s2', "doesn't exist"), lx: V(0.3, 0.12) }));
  HL('s3', [['POSTINGS HAVE', 'development'], ['GONE UP', 'gone up', { 1: RV.addI }], ['A LITTLE BIT', 'a little']]);
  if (has('s4')) scene('up-15', T0(s.s4), 'rvGrey', RV.page('ind-15', { t0: T0(s.s4), hl: w('s4', 'about 15'), big: { s: '+15%', at: w('s4', '15'), sub: 'US software development postings, late Feb 2025 to June 2026', col: RV.addI },
    title: [{ s: 'INDEED FOUND THIS, NOT ME:', times: [w('s4', 'we found'), w('s4', 'found'), w('s4', 'out'), w('s4', 'that'), w('s4', 'in the us')], cols: { 0: RV.delI } }] }));
  // the correction (her rule 2026-11-02): she says "we found out" and "February last year to June this year"; it was Indeed's finding
  // (the film has no pause: the screen's title says it; the talking-head edit pauses her for it)
  if (has('s5')) scene('senior-71', T0(s.s5), 'rvGrey', RV.page('ind-71', { t0: T0(s.s5), hls: [w('s5', 'senior'), w('s5', 'senior') + 0.3], big: { s: '71%', at: w('s5', 'mostly'), sub: 'of that rise was senior roles (May 2025 to May 2026)', col: RV.ink }, title: [{ s: 'MOSTLY SENIOR ROLES', times: [w('s5', 'mostly'), w('s5', 'senior'), w('s5', 'roles')] }] }));

  /* ---------- 0:43 is there still a point? ---------- */
  HL('s6', [['MAYBE YOU ARE', 'maybe'], ['LEARNING', 'learning'], ['HOW TO CODE', 'how to code']]); if (has('s7')) scene('just-code', T0(s.s7), 'rvGrey', RV.photo('px_laptop', { at: T0(s.s7), credit: 'Lukas Blazek', label: 'just write code', labelAt: w('s7', 'vibe') }));
  HL('s8', [['THEN THIS VIDEO', 'then this'], ['IS FOR YOU', 'is for you', null, [2]]]); HL('s9', [['IS THERE EVEN', 'is there even'], ['A POINT', 'a point'], ['ANYMORE?', 'anymore']], { ink: true, kicker: 'THE RIGHT QUESTION' });
  if (has('s10')) scene('yes-but', T0(s.s10), 'rvGrey', RV.type({ size: V(140, 112), lines: [{ s: 'YES.', at: w('s10', 'yes'), cols: { 0: RV.addI } }, { s: 'BUT NOT THE WAY', at: w('s10', 'not trying') }, { s: 'PEOPLE LEARNED', at: w('s10', 'people learned') }, { s: '3-4 YEARS AGO.', at: w('s10', 'three'), cols: { 0: RV.delI } }] }));
  HL('s11', [['SOMEONE I KNOW', 'someone'], ['WANTS TO BE A', 'interested'], ['SOFTWARE DEVELOPER', 'software developer']], { size: 120 });
  if (has('s12')) scene('why-video', T0(s.s12), 'rvInk', RV.type({ kicker: 'WHY I MADE THIS VIDEO', kickerAt: T0(s.s12), ground: 'rvInk', size: V(150, 120), lines: [{ s: 'THE ADVICE I', at: w('s12', 'the advice') }, { s: 'WOULD GIVE THEM', at: w('s12', 'give them') }] }));
  HL('s13', [['WHEN I STARTED,', 'when i started'], ['IT WAS EASIER', 'it was so easy', { 2: RV.addI }]]); if (has('s14', 's15')) scene('then-now', T0(s.s14), 'rvGrey', RV.sheet({ file: 'when-i-started.md', fs: V(54, 44), at: T0(s.s14), title: [{ s: 'THEN VS NOW', times: [T0(s.s14) + 0.2, w('s14', 'then'), w('s14', 'then') + 0.2] }],
    lines: [{ s: 'then: "oh my God, it was so hard"', k: '-', at: T0(s.s14) + 0.4, strikeAt: w('s15', 'so easy') }, { s: 'now: "oh my God, it was so easy"', k: '+', at: w('s15', 'so easy') - 0.3 }] }));
  if (has('s16')) { HL('s16', [['THE BEGINNER', 'the beginner'], ['RIGHT NOW:', 'right now'], ['YOU SHOULD TRY', 'you should try']]);
    scene('four-things', w('s16', 'if you focus') - 0.12, 'rvGrey', RV.sheet({ file: 'learning-to-code.md', tag: 'your plan', fs: V(52, 42), at: w('s16', 'if you focus') - 0.1,
      title: [{ s: 'FOCUS ON FOUR THINGS.', times: [w('s16', 'focus'), w('s16', 'on', w('s16', 'focus')), w('s16', 'four'), w('s16', 'things')], cols: { 2: RV.addI, 3: RV.addI } }],
      lines: [{ s: 'learn syntax', k: '-', at: w('s16', 'focus'), noType: true, strikeAt: w('s16', 'four') }, { s: 'learn to write a for loop', k: '-', at: w('s16', 'focus') + 0.1, noType: true, strikeAt: w('s16', 'things') },
        { s: 'reading code', k: '+', at: w('s16', 'reading code') }, { s: 'debugging', k: '+', at: w('s16', 'debugging') }, { s: 'fundamentals', k: '+', at: w('s16', 'fundamentals') }, { s: '  + a little system design', k: '+', at: w('s16', 'system design'), c: RV.dim }, { s: 'domain knowledge', k: '+', at: w('s16', 'domain knowledge') }] })); }

  /* ---------- skill 1: reading code ---------- */
  if (has('s17')) scene('skill-1', T0(s.s17), 'rvInk', RV.skill({ n: 1, name: 'Reading code', at: T0(s.s17) + 0.05, nameAt: T0(s.s17) + 0.3 }));
  if (has('s18', 's19')) HL('s18', [['AI WRITES', 'ai would'], ['A LOT OF CODE', 'a lot of code'], ['EVERYBODY USES', ['s19', 'everybody']], ['AI TO CODE', ['s19', 'to write code']]]);
  if (has('s20')) scene('not-read', T0(s.s20), 'rvGrey', RV.sheet({ file: 'new-feature.js', tag: 'written by AI', fs: V(46, 34), at: T0(s.s20), title: [{ s: 'NOT EVEN READ.', times: [w('s20', 'not even'), w('s20', 'even'), w('s20', 'reading')] }],
    lines: ['export async function checkout(cart) {', '  const total = sumPrices(cart.items)', '  const order = await db.orders.create(cart)', '  await payments.charge(order.id, total)', '  await mailer.send(order.email, "Thanks!")', '  return order', '}'].map((x, i) => ({ s: x, k: ' ', at: T0(s.s20) + 0.2 + i * 0.32 })),
    status: { l: 'written: yes', r: 'read: not yet', at: w('s20', 'not even reading') } }));
  HL('s21', [['READING CODE', 'reading code', { 0: RV.addI, 1: RV.addI }], ['IS A VERY', 'is a very'], ['IMPORTANT SKILL', 'important']]);
  if (has('s22')) scene('read-it', T0(s.s22), 'rvGrey', RV.sheet({ file: 'signup.js', tag: 'written by AI', fs: V(50, 40), at: T0(s.s22), title: [{ s: 'WHAT DOES IT DO?', times: [w('s22', 'tell what'), w('s22', 'what it does'), w('s22', 'it does'), w('s22', 'does')] }],
    lines: RV_CODE0, sel: { from: 0, to: 3, at: w('s22', 'look back') }, comment: { line: 1, s: ['Saves the user.', 'Is it what I asked for?'], at: w('s22', 'whether'), by: 'YOU' } }));
  HL('s23', [['YOU USED TO WRITE', 'out to write'], ['CODE TO EVEN', 'to even'], ['READ CODE', 'read code']], { size: 130 }); if (has('s24', 's25')) HL('s24', [['I RECOMMEND IT', 'i recommend'], ['FOR ANYONE', 'for anyone'], ['STARTING NOW', 'starting']], { kicker: 'A LOT OF CODE WILL BE WRITTEN' });

  /* ---------- skill 2: debugging ---------- */
  if (has('s26')) scene('skill-2', T0(s.s26), 'rvInk', RV.skill({ n: 2, name: 'Debugging', at: T0(s.s26) + 0.05, nameAt: T0(s.s26) + 0.3, sub: 'matters now more than ever', subAt: w('s26', 'more than ever') }));
  HL('s27', [['DEBUGGING MEANS', 'debugging'], ['FINDING OUT WHY', 'finding out'], ['SOMETHING IS BROKEN', 'something', { 2: RV.delI }]], { size: 120 });
  if (has('s28')) scene('crash', T0(s.s28), 'rvGrey', RV.sheet({ file: 'signup.js', fs: V(50, 42), at: T0(s.s28), lines: RV_CODE0, err: { s: RV_ERR, at: w('s28', 'crashes') },
    title: [{ s: 'A USER SIGNS UP.', times: [w('s28', 'a user'), w('s28', 'user'), w('s28', 'sign'), w('s28', 'up')] }, { s: 'THE APP CRASHES.', times: [w('s28', 'the app', w('s28', 'and')), w('s28', 'crashes') - 0.1, w('s28', 'crashes')], cols: { 2: RV.delI } }] }));
  if (has('s29', 's31')) HL('s29', [['AI IS REALLY GOOD', 'ai is really', { 3: RV.addI }], ['AT DEBUGGING.', 'at debugging'], ["BUT IT DOESN'T", ['s31', "doesn't always"]], ['ALWAYS GET CONTEXT', ['s31', 'context'], { 2: RV.delI }]], { size: 120 });
  if (has('s32', 's33', 's34', 's35')) { scene('paste', T0(s.s32), 'rvGrey', RV.form({ at: T0(s.s32), btnAt: w('s32', 'fix this'), msg: { s: 'Something went wrong.', at: T0(s.s32) + 0.3 } }));
    scene('try-catch', w('s32', 'one easy fix') - 0.12, 'rvGrey', RV.sheet({ file: 'signup.js', tag: 'suggested by AI', fs: V(46, 40), at: w('s32', 'one easy fix') - 0.1,
      title: [{ s: "AI'S EASY FIX: TRY-CATCH.", times: [w('s32', 'one easy'), w('s32', 'easy fix'), w('s32', 'fix', w('s32', 'easy fix') + 0.1), w('s32', 'trycatch')], cols: { 3: RV.addI } }],
      lines: [RV_CODE0[0], { s: '  await db.insert(user)', k: '-', at: w('s32', 'wrap') - 0.3, noType: true, strikeAt: w('s32', 'the save') }, { s: '  try { await db.insert(user) }', k: '+', at: w('s32', 'trycatch') }, { s: '  catch (e) { }', k: '+', at: w('s32', 'trycatch') + 0.6 }, RV_CODE0[2], RV_CODE0[3]],
      err: { s: RV_ERR, at: w('s32', 'one easy fix') - 0.1, goneAt: w('s33', 'goes away') }, status: { l: 'page: no crash', r: 'signed up: 0', at: w('s34', 'stops crashing') },
      note: { s: V(['But the user', "still isn't", 'signed up.'], ['But the user still', "isn't signed up."]), at: w('s35', 'but the user'), y: 0.42 } })); }
  HL('s36', [['AND NOBODY', 'nobody'], ['CAN TELL', 'can tell'], ['THEM WHY', 'them why']]);
  if (has('s37')) scene('read-error', T0(s.s37), 'rvGrey', RV.sheet({ file: 'error', tag: 'read it yourself', fs: V(52, 42), at: T0(s.s37), minW: 0, title: [{ s: 'READ THE ERROR YOURSELF.', times: [w('s37', 'read'), w('s37', 'the error'), w('s37', 'error'), w('s37', 'yourself')] }],
    lines: RV_ERR.map(x => ({ s: x, k: ' ', c: RV.delI, b: true })), sel: { from: 0, to: 2, at: w('s37', 'read the error') }, comment: { line: 1, s: ['This email already', 'has an account.'], at: w('s37', 'somebody with'), by: 'YOU' } }));
  if (has('s38')) { scene('real-fix', T0(s.s38), 'rvGrey', RV.sheet({ file: 'signup.js', tag: 'your change', fs: V(48, 40), at: T0(s.s38), title: [{ s: 'THE REAL FIX', times: [w('s38', 'the real'), w('s38', 'real'), w('s38', 'fix')], cols: { 1: RV.addI, 2: RV.addI } }],
      lines: [RV_CODE0[0], { s: '  if (await db.emailTaken(user))', k: '+', at: w('s38', 'check') }, { s: "    return 'email taken'", k: '+', at: w('s38', 'check') + 0.9 }, RV_CODE0[1], RV_CODE0[2], RV_CODE0[3]] }));
    scene('email-taken', w('s38', 'tell the user') - 0.1, 'rvGrey', RV.form({ at: w('s38', 'tell the user') - 0.1, btnAt: w('s38', 'tell the user') + 0.2, msg: { s: 'This email is already taken.', at: w('s38', 'already taken') } })); }
  HL('s39', [['DEBUGGING GIVES', 'debugging is'], ['YOU THAT', 'gives you'], ['BANDWIDTH', 'bandwidth', { 0: RV.addI }]]); if (has('s40', 's41')) HL('s40', [['YOU ADD THE', 'you add'], ['HUMAN', 'human', null, [0]], ['IN THE LOOP', 'in the loop']], { ink: true, kicker: 'WHEN YOU USE AI TO CODE', size: 150 });
  if (has('s42', 's43')) scene('which-one', T0(s.s42), 'rvGrey', RV.type({ size: V(120, 100), kicker: 'YOU HAVE TO KNOW ENOUGH', kickerAt: T0(s.s42), lines: [{ s: 'THE FIX AI GIVES YOU', at: w('s42', 'a fix') }, { s: 'OR THE ACTUAL', at: w('s42', 'actual') - 0.2 }, { s: 'PROBLEM?', at: w('s42', 'problem'), cols: { 0: RV.delI } }],
    stamp: { s: "IF YOU CAN'T DEBUG, YOU WON'T KNOW", at: w('s43', "you wouldn't know"), col: RV.delI } }));

  /* ---------- skill 3: fundamentals + a bit of system design ---------- */
  if (has('s44')) scene('skill-3', T0(s.s44), 'rvInk', RV.skill({ n: 3, name: 'Fundamentals', at: T0(s.s44) + 0.05, nameAt: T0(s.s44) + 0.3, sub: '+ a little bit of system design', subAt: w('s44', 'system design') }));
  if (has('s45')) scene('web-works', T0(s.s45), 'rvGrey', RV.sheet({ file: 'what happens underneath', fs: V(50, 40), at: T0(s.s45), title: [{ s: 'HOW THE WEB WORKS', times: [w('s45', 'how the web'), w('s45', 'the web'), w('s45', 'web'), w('s45', 'works')] }],
    lines: [{ s: 'browser  ->  POST /signup', k: ' ', at: w('s45', 'how the web') + 0.4 }, { s: 'server   ->  validate the request', k: ' ', at: w('s45', 'request') + 0.4 }, { s: 'server   ->  database: INSERT user', k: ' ', at: w('s45', 'the database') }, { s: 'database ->  saved', k: '+', at: w('s45', 'save your data') }] }));
  HL('s46', [['HOW ALL THE PARTS', 'all the parts'], ['OF YOUR APP', 'of your app'], ['WORK TOGETHER', 'work together', { 1: RV.addI }]], {});
  if (has('s47', 's48', 's49')) scene('questions', T0(s.s47), 'rvGrey', RV.sheet({ file: 'system-design.md', tag: 'questions to ask', fs: V(50, 40), at: T0(s.s47),
    lines: [{ s: 'What can go wrong between the parts?', k: ' ', at: T0(s.s47) + 0.1, b: true }, { s: 'Where is your user data saved?', k: ' ', at: T0(s.s48), b: true }, { s: 'How does it reach what the user sees?', k: ' ', at: T0(s.s49), b: true }], sel: { from: 1, to: 1, at: w('s48', 'saved'), goneAt: T0(s.s49) } }));
  HL('s50', [['A REAL EXAMPLE:', 'a real example'], ['PAYMENTS', 'payment', { 0: RV.addI }]]);
  if (has('s51', 's52')) scene('webhook', T0(s.s51), 'rvGrey', RV.flow({ at: T0(s.s51), sendAt: w('s51', 'sends your server'), title: [{ s: 'A WEBHOOK', times: [w('s52', 'a webhook'), w('s52', 'webhook')], cols: { 1: RV.addI } }] }));
  if (has('s53', 's54', 's55')) scene('twice', T0(s.s53), 'rvGrey', RV.flow({ at: T0(s.s53) - 5, sendAt: T0(s.s53) - 4, againAt: w('s53', 'send the webhook again'), title: [{ s: 'THE SAME MESSAGE,', times: [w('s54', 'the same'), w('s54', 'same'), w('s54', 'message')] }, { s: 'TWICE.', times: [w('s54', 'twice')], cols: { 0: RV.delI } }], note: { s: ['Your code has to be', 'ready for that.'], at: w('s55', 'your code'), by: 'YOU, REVIEWING' } }));
  

  /* ---------- skill 4: domain knowledge ---------- */
  if (has('s58')) scene('skill-4', T0(s.s58), 'rvInk', RV.skill({ n: 4, name: V('Domain knowledge', ['Domain', 'knowledge']), at: T0(s.s58) + 0.05, nameAt: T0(s.s58) + 0.3 }));
  HL('s59', [['UNDERSTANDING', 'understanding'], ['THE AREA YOUR', 'the area'], ['SOFTWARE IS FOR', 'software is for']]);
  if (has('s60')) { HL('s60', [['SOFTWARE CAN BE', 'software'], ['FOR HEALTH', 'health'], ['OR FINANCE', 'finance']]); scene('fleet', w('s60', 'where i work') - 0.12, 'rvGrey', RV.photo('px_truck', { at: w('s60', 'where i work') - 0.1, credit: 'Feli Art', label: 'where I work: fleet management', labelAt: w('s60', 'fleet'), fy: 0.55 })); }
  if (has('s61')) scene('fields', T0(s.s61), 'rvGrey', RV.sheet({ file: 'where software works', fs: V(56, 44), at: T0(s.s61), lines: ['finance', 'health', 'payments', 'logistics', 'school'].map(x => ({ s: x, k: '+', at: w('s61', x) })), comment: { line: 0, s: ['Mine: fleet', 'management.'], at: T0(s.s61) + 0.2, by: 'YOU' } }));
  if (has('s62')) scene('pharmacy', T0(s.s62), 'rvGrey', RV.photo('px_pharmacy', { at: T0(s.s62), credit: 'cottonbro studio', label: 'a stock app for a pharmacy', labelAt: w('s62', 'pharmacy'), fy: 0.4 }));
  if (has('s63', 's64')) scene('expires-first', T0(s.s63), 'rvGrey', RV.shelf({ at: T0(s.s63), firstAt: w('s63', 'expires first'), batchAt: w('s64', 'which batch'), photo: 'px_pharmacy', credit: 'cottonbro studio', title: [{ s: 'SELL WHAT EXPIRES FIRST.', times: [w('s63', 'sell'), w('s63', 'the medicine'), w('s63', 'expires'), w('s63', 'first')], cols: { 3: RV.delI } }] }));
  if (has('s65')) scene('whats-missing', T0(s.s65), 'rvGrey', RV.sheet({ file: 'pharmacy-stock-app', tag: 'built by AI', fs: V(50, 40), at: T0(s.s65), lines: [{ s: 'products and prices', k: ' ', at: w('s65', 'ask ai') }, { s: 'stock count per product', k: ' ', at: w('s65', 'build it') }, { s: 'sell the batch that expires first', k: '+', at: w('s65', 'what is missing') }, { s: 'batch number per product', k: '+', at: w('s65', 'missing') + 0.5 }], comment: { line: 2, s: ['AI missed these.'], at: w('s65', 'what is missing') + 0.2, by: 'YOU KNOW THE DOMAIN' } }));
  HL('s66', [['THE APP IS NOT', 'the app is'], ['SOLID ENOUGH', 'solid', { 0: RV.delI }], ['FOR THE PHARMACY', 'for the pharmacy']], { size: 130 }); HL('s67', [['WHATEVER FIELD', 'whatever'], ["YOU'RE IN,", "you're in"], ['LEARN THAT FIELD', 'establish', { 1: RV.addI, 2: RV.addI }]]);
  if (has('s68')) scene('go-to', T0(s.s68), 'rvGrey', RV.photo('px_meeting', { at: T0(s.s68), credit: 'Christina Morillo', label: 'they know the business well', labelAt: w('s68', 'know the business') }));
  

  /* ---------- so, should you learn to code? ---------- */
  HL('s70', [['IN 2027, YOU CAN', '2027'], ['LEARN', 'you can learn'], ['WAY FASTER', 'way faster', { 1: RV.addI }], ['WITH AI', 'with ai']], {});
  if (has('s71')) { scene('worth-it', T0(s.s71), 'rvGrey', RV.type({ size: V(190, 150), lines: [{ s: 'STILL WORTH IT.', times: [w('s71', 'still'), w('s71', 'worth'), w('s71', 'worth') + 0.25], cols: { 1: RV.addI, 2: RV.addI } }], stamp: { s: 'APPROVED', at: w('s71', 'worth') + 0.45 } })); }
  if (has('s72')) scene('less-of', w('s72', 'learning syntax') - 0.6, 'rvGrey', RV.sheet({ file: 'learning-to-code.md', tag: 'focus on other things', fs: V(52, 42), at: T0(s.s72), lines: [{ s: 'learning syntax', k: '-', at: w('s72', 'learning syntax') - 0.2, strikeAt: w('s72', 'syntax') + 0.1 }, { s: 'learning to write a for loop', k: '-', at: w('s72', 'how to write') - 0.2, strikeAt: w('s72', 'loop') + 0.1 }, { s: 'reading code, debugging, ...', k: '+', at: w('s72', 'stuff like that'), c: RV.dim }] }));
  HL('s73', [['SOMETHING THAT', 'something'], ['GIVES YOU A', 'give you'], ['JUNIOR ROLE?', 'junior developer', { 0: RV.delI }]]);
  if (has('s74')) scene('junior-role', T0(s.s74), 'rvGrey', RV.ladder({ at: T0(s.s74), dropAt: T0(s.s74) - 1, high: ['SENIOR', ''], highAt: T0(s.s74), low: ['A JUNIOR ROLE', 'RIGHT NOW?'], lx: V(0.3, 0.1), title: [{ s: "DON'T PUT SO MUCH TRUST IN IT", times: [w('s74', 'put so much'), w('s74', 'so much'), w('s74', 'much'), w('s74', 'trust'), w('s74', 'in the fact'), w('s74', 'the fact')] }] }));
  if (has('s75')) scene('plan', T0(s.s75), 'rvGrey', RV.sheet({ file: 'your-plan.md', tag: 'my advice', fs: V(48, 38), at: T0(s.s75), title: [{ s: 'BUILD WITH AI FIRST.', times: [w('s75', 'build'), w('s75', 'with ai'), w('s75', 'ai'), w('s75', 'first')] }],
    lines: [{ s: '1  build with AI first', k: ' ', at: w('s75', 'build with'), b: true }, { s: '2  learn to work with it', k: ' ', at: w('s75', 'learn to work'), b: true }, { s: '3  then learn the rest:', k: ' ', at: w('s75', 'learn the rest'), b: true }, { s: "reading code (other people's too)", k: '+', at: w('s75', 'reading code') }, { s: 'debugging', k: '+', at: w('s75', 'debugging') }, { s: 'the fundamentals', k: '+', at: w('s75', 'fundamentals') }, { s: 'a little system design', k: '+', at: w('s75', 'system design') }],
    sel: { from: 0, to: 0, at: w('s75', 'first') + 0.2, goneAt: w('s75', 'learn to work') } }));
  if (has('s76', 's77', 's78')) scene('free-places', T0(s.s76), 'rvGrey', RV.sheet({ file: 'free-places.md', tag: 'links in the description', fs: V(52, 42), at: T0(s.s76), lines: ['MDN Web Docs', 'freeCodeCamp', 'The Odin Project', "Harvard's CS50", 'System Design Primer'].map((x, i) => ({ s: x, k: '+', at: T0(s.s76) + 0.4 + i * 0.45 })), comment: { line: 4, s: ['Links in the', 'description.'], at: w('s77', 'description'), by: 'FROM ME' } }));
  HL('s79', [['ACTUALLY', 'actually'], ['COMMIT TO IT', 'commit', { 0: RV.addI }]], { size: 170 });
  if (has('s80')) { HL('s80', [['THE LEARNING', 'the learning'], ['ITSELF IS SO', 'itself'], ['GOOD FOR YOU', 'so good', { 1: RV.addI }]]); scene('market', w('s80', 'the reality') - 0.12, 'rvGrey', RV.page('ind-head', { t0: w('s80', 'the reality') - 0.1, align: 'center', title: [{ s: 'THE REALITY OF THE MARKET', times: [w('s80', 'the reality'), w('s80', 'reality'), w('s80', 'of the market'), w('s80', 'the market'), w('s80', 'market')] }] })); }
  if (has('s81')) { HL('s81', [['IF ANYBODY TELLS YOU', 'if anybody'], ['LEARN TO CODE,', 'learn how to code'], ['GET A JUNIOR ROLE', 'junior software']], { size: 120 }); scene('promise', w('s81', 'a promise') - 0.12, 'rvInk', RV.type({ ground: 'rvInk', size: V(150, 120), lines: [{ s: 'A PROMISE YOU CAN', at: w('s81', 'a promise') }, { s: 'HOLD ON TO?', at: w('s81', 'hold on'), amb: [] }], sub: 'At least in this age and time.', subAt: w('s81', 'at least') })); }
  RV.flush(-2);
}

/* working-full-time: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-02 by the FILM agent. WF_SENT = her sentences (her corrected words, raw_words.json, in order); WF_PLAN(mode)
 * finds the ones inside this moment and runs every layout call whose sentences are all there. In a short: the first sentence
 * is always her talking (no overlay at the start, her rule 2026-10-18), no L3 shout, no pop-arounds / side stacks under the
 * label, at most one keyword, full-frame graphics go on a top panel with her below (she is always on camera in shorts), her
 * picture stays at the 4:5 window's size. Change a layout here and the full edit and the shorts that hold it change together.
 * Receipts (real pages) land within 5 s of each claim; the correction (45 ECTS) is a plain manila screen (FEEDBACK 2026-11-02). */
'use strict';
WF.skipIds = new Set(); WF.skip = (...ids) => ids.forEach(i => WF.skipIds.add(i));
function WF_PLAN(mode) {
  WF.q = []; const s = {}; for (const [k, q] of Object.entries(WF_SENT)) { try { s[k] = P(q); } catch (e) { /* not in this moment */ } }
  const keys = Object.keys(s); const short = mode === 'short'; const first = short && keys[0] && s[keys[0]].t < 3 ? keys[0] : null; let kws = 0;   // (a short that opens mid-sentence: its hook is that part, see shNN.js)
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (short) {
      if (kind === 'shout' || kind === 'pops' || kind === 'stack' || kind === 'behind') return;   // no big overlay, no tags around her head, nothing under the label
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw' && ++kws > 1) return;
      if (typeof WFF !== 'undefined' && WFF.on && (kind === 'kw' || kind === 'card' || kind === 'tip')) return;
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && WF.skipIds.has(sg.id)) TH.segs.pop();
  };
  // shorts: she is always on camera. A full-frame graphic goes on a top panel (below her label), her below; a tile / room
  // becomes her 4:5-size strip under the graphic; no close framings or punch-ins (CHECKS short-zoom 0.15-0.30)
  const full0 = WF.full, tile0 = TH.tile, room0 = TH.room, talk0 = TH.talk, ots0 = TH.ots, pres0 = TH.presenter;
  const split0 = TH.split;
  // 2026-11-10 format mix (manifest "fmt", moments/formats.js WFF.install): the format decides where graphics and her picture go;
  // no typed openers, tip cards, phrase cards or keywords (the cover + the format's title carry the topic, the captions her words)
  const FX = short && typeof WFF !== 'undefined' && WFF.on ? WFF.install() : null;
  if (FX) {
    WF.full = FX.full;
    if (WF.open) { const o_ = WF.open; WF.open = null; FX.full(o_.span, o_.draw, { id: 'open-g' }); o_.snd && o_.snd(); }
    else if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' }); else TH.talk([0, Math.min(3, TOTAL)], { frame: 'mid', id: 'hook' });
  } else if (short) {   // every graphic on a top panel 1150 px tall, full width (critic 2026-11-02: graphics >= 900 px wide), her below it
    const top =(sp, o = {}) => TH.half(sp, { side: 'top', size: 1150, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.55, sound: o.sound === false ? false : undefined });
    WF.full = (sp, draw, o = {}) => top(sp, { ...o, draw });
    TH.tile = top; TH.room = top; TH.ots = top; TH.presenter = top; TH.split = (sp, o = {}) => (o.draw ? top(sp, o) : split0(sp, o));
    TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });
    if (WF.noHook) { /* the short's own script opens on a graphic */ } else if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
    else TH.talk([0, Math.min(3, TOTAL)], { frame: 'mid', id: 'hook' });
  }
  const T0 = (ph) => ph.t - 0.12;
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0];
    const t0 = (o.times ? o.times[0] : WT(sp, c)) - 0.1; const t1 = o.until != null ? o.until : Math.max(t0 + 1.6, Math.min(sp.e + 0.35, t0 + 3.2));
    const k = { t0, t1, text: w, id: o.id || 'kw' + WF.kws.length, y: V(H * 0.66, WF.short() ? Math.max(500, TH.labelBottom() + 200) : 1500) };
    for (const q of WF.kws) if (q.t1 > t0) q.t1 = Math.max(q.t0 + 0.2, t0 - 0.05);
    WF.kws.push(k); TH.capOff.push([t0, t1]); TH.used = true; sfx('typeHit', t0 + 0.1, -4); return k; };
  const card = (sp, lines, o = {}) => TH.card(sp, lines, { riser: false, ...o });   // black phrase cards (#29), hard cut, no riser
  const tip = (sp, n, lines, o = {}) => TH.room(sp, { at: o.at || 'tip number', side: V('right', 'bottom'), id: 'tip' + n, draw: WF.tip({ n, lines, at: T0(sp) + 0.35, wordsAt: Math.min(o.wordsAt != null ? o.wordsAt : 1e9, T0(sp) + 0.9) }) });
  const rows = (o) => { const out = {}; for (const [d, v] of Object.entries(o)) out[d] = v; return out; };

  /* ---------- 0:00 a full-time job + a full-time master's ---------- */
  on(['s0', 's1'], 'other', () => TH.split({ from: s.s0, to: s.s1 }, { her: V(0.44, 0.46), side: V('right', 'bottom'), id: 'open-card', lead: 0.05,
    draw: WF.card({ at: T0(s.s0) + 0.6, rows: { MON: WF_WEEK.MON }, times: { MON: [WT(s.s0, 'job'), WT(s.s0, 'job') + 0.25, WT(s.s0, "master's"), WT(s.s0, "master's") + 0.25] }, hiRow: 'MON', hiAt: WT(s.s0, 'job'),
      extra: [{ at: WT(s.s1, 'since'), s: 'SINCE OCT 2025', x: V(470, 520), y: V(930, 860), size: V(64, 62), rot: -0.1 }], side: 'center' }) }));
  on(['s2'], 'talk', () => TH.talk(s.s2, { frame: 'mid', push: [V(1.2, 1.14), V(1.28, 1.2)], id: 'make-video' }));
  on(['s3a'], 'talk', () => TH.talk(s.s3a, { frame: 'mid', push: [V(1.06, 1.06), V(1.16, 1.14)], id: 'in-this-video' }));
  on(['s3b'], 'talk', () => TH.talk([s.s3b.t - 0.12, WT(s.s3b, 'doing it abroad') - 0.3], { frame: 'close', id: 'comfortable' }));
  on(['s3b'], 'behind', () => TH.behind([WT(s.s3b, 'doing it abroad') - 0.3, s.s3b.e + 0.5], ['ABROAD'], { times: [WT(s.s3b, 'abroad')], id: 'abroad', size: V(300, 220) }));
  on(['s3c'], 'talk', () => TH.talk(s.s3c, { frame: 'wide', id: 'from-research' }));
  on(['s3d'], 'talk', () => TH.talk([WT(s.s3d, 'confirming') - 0.15, s.s3d.e + 0.3], { frame: 'close', id: 'rules-first' }));   // (was a typed re-run of her question)

  /* ---------- 0:31 the rules (receipts) ---------- */
  on(['s4a'], 'other', () => WF.full(s.s4a, WF.clip('sie-hours', { t0: T0(s.s4a), hl: WT(s.s4a, 'no limit'), w: V(1560, 900), align: 'center', valign: 'center', capRoom: V(150, 0), stamp: { s: 'NOT LIMITED', at: WT(s.s4a, 'limit'), fx: 0.62, size: V(104, 96) } }), { id: 'not-limited' }));
  on(['s4c'], 'talk', () => TH.talk(s.s4c, { frame: 'close', id: 'definition' }));
  on(['s5'], 'other', () => TH.split(s.s5, { her: V(0.38, 0.44), side: V('left', 'bottom'), id: 'ects', draw: WF.clip('sie-ects', { t0: T0(s.s5), hl: WT(s.s5, 'around 30'), stamp: { s: '~30 ECTS A SEMESTER', at: WT(s.s5, 'ects'), fx: 0.5, dy: V(120, 130), size: V(80, 76) } }) }));
  on(['s6'], 'other', () => TH.presenter(s.s6, { side: 'right', id: 'forty-five', draw: WF.stat({ big: '45 ECTS', small: 'after your first year', at: WT(s.s6, '45') - 0.1, smallAt: WT(s.s6, 'after your') - 0.1 }) }));
  // the correction (her rule 2026-11-02): she says "at any university"; the 45 ECTS rule is Estonia's and schools check it their own way
  // the 45 ECTS slip: her video pauses for the correction (manifest "pauses" fix-45, engine 2026-11-02); then the real rule on screen
  on(['s7'], 'other', () => WF.full(s.s7, WF.clip('tt-45', { t0: T0(s.s7), hl: WT(s.s7, 'below'), w: V(1560, 960), align: 'center', valign: 'center', capRoom: V(150, 0), stamp: { s: 'OR PART-TIME', at: WT(s.s7, 'part-time'), fx: 0.55, size: V(90, 84) } }), { id: 'rule-45' }));   // big and readable (coordinator 2026-11-07)
  on(['s8'], 'talk', () => TH.talk(s.s8, { frame: 'mid', push: [V(1.16, 1.12), V(1.26, 1.2)], id: 'for-you' }));

  /* ---------- 1:15 it never stops ---------- */
  on(['s9'], 'talk', () => TH.talk(s.s9, { frame: 'close', id: 'real' }));
  on(['s10'], 'other', () => TH.split(s.s10, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'keeps-moving',
    draw: WF.card({ at: T0(s.s10), rows: rows({ MON: WF_WEEK.MON, TUE: WF_WEEK.TUE, WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI, SAT: ['', '', '10:00', '13:00'] }),
      times: (() => { const m = s.s10.w; const mv = WORDS.slice(s.s10.i, s.s10.i + m.length).map((w, k) => (w.n === 'moving' ? m[k] : null)).filter(x => x != null);
        const at = [WT(s.s10, 'monday'), mv[0], mv[1], mv[2], WT(s.s10, 'friday'), WT(s.s10, 'saturday')]; const o = {}; DAYS.slice(0, 6).forEach((d, i) => { const a = at[i] || at[0]; o[d] = [a, a + 0.08, a + 0.16, a + 0.24]; }); return o; })(),
      hiRow: 'SAT', hiAt: WT(s.s10, 'saturday'), side: 'center' }) }));
  on(['s11'], 'talk', () => TH.talk(s.s11, { frame: 'wide', alt: true, id: 'not-easy' }));
  on(['s12a'], 'talk', () => TH.talk(s.s12a, { frame: 'mid', push: [V(1.2, 1.14), V(1.34, 1.24)], id: 'ambitious' }));
  on(['s12b'], 'talk', () => TH.talk(s.s12b, { frame: 'close', push: [V(1.2, 1.16), V(1.3, 1.24)], id: 'goal-work' }));
  on(['s12c'], 'talk', () => TH.talk(s.s12c, { frame: 'close', punch: ['exists'], id: 'goal-school' }));
  on(['s13'], 'talk', () => TH.talk(s.s13, { frame: 'mid', id: 'so-far' }));
  on(['s14'], 'talk', () => TH.talk(s.s14, { frame: 'wide', id: 'running-mad' }));

  /* ---------- 1:53 tip 1: your credits ---------- */
  on(['s15'], 'tip', () => tip(s.s15, 1, ['KNOW YOUR CREDITS', 'EVERY SEMESTER'], { wordsAt: WT(s.s15, 'understand') }));
  on(['s16'], 'talk', () => TH.talk(s.s16, { frame: 'mid', push: [V(1.06, 1.06), V(1.16, 1.14)], id: 'outline-credits' }));
  on(['s18'], 'talk', () => TH.talk(s.s18, { frame: 'close', id: 'sit' }));
  on(['s19', 's20'], 'other', () => TH.presenter({ from: s.s19, to: s.s20 }, { side: 'right', id: 'outline', draw: WF.outline({ at: T0(s.s19), title: 'COURSE OUTLINE', rows: [{ k: 'CREDITS', v: '6 ECTS', at: T0(s.s19) + 0.2 }, { k: 'ASSESSMENT', v: 'PROJECT + EXAM', at: WT(s.s19, 'assess') }, { k: 'CLASSES', v: '2 A WEEK, EVENINGS', at: WT(s.s20, 'hours of classes'), red: true }, { k: 'EXAM', v: 'JANUARY', at: 1e9 }] }) }));
  on(['s21'], 'other', () => WF.full(s.s21, WF.week({ at: T0(s.s21),
    blocks: [{ d: 1, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s21, 'every class') }, { d: 3, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s21, 'every class') + 0.15 }, { d: 4, h0: 14, h1: 16, s: 'DEADLINE', kind: 'fixed', at: WT(s.s21, 'every deadline') }, { d: 2, h0: 9, h1: 12, s: 'EXAM', kind: 'fixed', at: WT(s.s21, 'exam dates') }],
    capRoom: V(150, 0) }), { id: 'into-calendar' }));
  on(['s22'], 'talk', () => TH.talk(s.s22, { frame: 'mid', id: 'not-just-credits' }));
  on(['s23'], 'other', () => TH.ots(s.s23, { side: 'auto', id: 'times-a-week', draw: WF.week({ at: T0(s.s23), blocks: [{ d: 1, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s23, 'two times') }, { d: 3, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s23, 'two times') + 0.2 }, { d: 2, h0: 9, h1: 11, s: 'CLASS', kind: 'class', at: WT(s.s23, 'once every week') }] }) }));   // a week, not a list
  on(['s24'], 'talk', () => TH.talk(s.s24, { frame: 'wide', push: [V(1.0, 1.06), V(1.12, 1.14)], id: 'like-course' }));

  /* ---------- 3:00 tip 2: your whole degree ---------- */
  on(['s25'], 'tip', () => tip(s.s25, 2, ['PLAN YOUR', 'WHOLE DEGREE'], { wordsAt: WT(s.s25, 'plan your') }));
  on(['s26'], 'other', () => TH.split(s.s26, { her: V(0.38, 0.44), side: V('right', 'bottom'), id: 'degree-1', draw: WF.degree({ at: T0(s.s26), fills: [{ from: 0, to: 1, s: 'NON-THESIS CREDITS', at: Math.min(WT(s.s26, 'non-thesis'), T0(s.s26) + 0.4) }] }) }));   // content within 0.4 s
  on(['s27'], 'talk', () => TH.talk(s.s27, { frame: 'mid', id: 'cleared' }));
  on(['s28'], 'other', () => TH.tile(s.s28, { at: V('br', 'br'), w: V(500, 420), id: 'degree-2', draw: WF.degree({ at: T0(s.s28) - 0.3, padR: 580, capRoom: V(150, 0), fills: [{ from: 0, to: 1, s: 'NON-THESIS CREDITS', at: T0(s.s28) - 0.3 }, { from: 2, to: 3, s: 'THESIS', at: WT(s.s28, 'thesis'), red: true, row: 1 }], stamps: [{ s: 'FOCUS', at: WT(s.s28, 'focus'), fx: V(0.3, 0.5), fy: 1.1 }] }) }));
  on(['s29'], 'talk', () => TH.talk(s.s29, { frame: 'mid', id: 'big-things-s' }));
  on(['s30'], 'talk', () => TH.talk(s.s30, { frame: 'close', id: 'underestimate' }));
  on(['s31'], 'talk', () => TH.talk(s.s31, { frame: 'mid', id: 'bandwidth-talk' }));
  on(['s32'], 'other', () => WF.full(s.s32, WF.weeks({ at: WT(s.s32, 'six weeks'), at2: WT(s.s32, 'eight weeks'), budgetAt: WT(s.s32, '10 weeks'), guess: [6, 8], budget: 10, guessText: '6 OR 8 WEEKS', budgetText: '10 WEEKS' }), { id: 'ten-weeks' }));
  on(['s33'], 'talk', () => TH.talk(s.s33, { frame: 'close', punch: ['time'], id: 'dont-underestimate' }));

  /* ---------- 3:40 tip 3: block your week ---------- */
  on(['s34'], 'tip', () => tip(s.s34, 3, ['BLOCK', 'YOUR WEEK'], { wordsAt: WT(s.s34, 'block') }));
  on(['s35'], 'talk', () => TH.talk(s.s35, { frame: 'mid', id: 'start-with' }));
  on(['s36a'], 'other', () => TH.split(s.s36a, { her: V(0.38, 0.44), side: V('right', 'bottom'), id: 'cannot-move-list', draw: WF.week({ at: T0(s.s36a), blocks: [{ d: 1, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s36a, 'your classes') }, { d: 4, h0: 14, h1: 16, s: 'DEADLINE', kind: 'fixed', at: WT(s.s36a, 'assignment') }, { d: 2, h0: 10, h1: 11.5, s: 'MEETING', kind: 'fixed', at: WT(s.s36a, 'your meetings') }] }) }));   // they land in a week, not a list
  on(['s36b'], 'other', () => WF.full(s.s36b, WF.week({ at: T0(s.s36b),
    blocks: [{ d: 0, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: WT(s.s36b, 'calendar first') }, { d: 1, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: WT(s.s36b, 'calendar first') + 0.08 }, { d: 2, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: WT(s.s36b, 'calendar first') + 0.16 }, { d: 3, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: WT(s.s36b, 'calendar first') + 0.24 }, { d: 4, h0: 9, h1: 17, s: 'WORK', kind: 'work', at: WT(s.s36b, 'calendar first') + 0.32 },
      { d: 0, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s36b, 'calendar first') + 0.5 }, { d: 2, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s36b, 'calendar first') + 0.6 }, { d: 3, h0: 17.75, h1: 20, s: 'CLASS', kind: 'class', at: WT(s.s36b, 'calendar first') + 0.7 },
      { d: 1, h0: 19, h1: 21, s: 'STUDY', kind: 'study', at: WT(s.s36b, 'study time') }, { d: 5, h0: 10, h1: 13, s: 'STUDY', kind: 'study', at: WT(s.s36b, 'its own block') }], capRoom: V(150, 0) }), { id: 'week-blocks' }));
  on(['s37'], 'talk', () => TH.talk(s.s37, { frame: 'mid', push: [V(1.08, 1.08), V(1.2, 1.16)], id: 'a-job' }));
  on(['s38'], 'behind', () => TH.behind(s.s38, ['TIME BLOCKING'], { times: [WT(s.s38, 'time'), WT(s.s38, 'blocking')], id: 'time-blocking', size: V(230, 170) }));
  on(['s38'], 'talk', () => (WF.short() ? TH.talk(s.s38, { frame: 'mid', id: 'tb-talk' }) : null));
  on(['s39'], 'other', () => TH.tile(s.s39, { at: V('br', 'br'), w: V(500, 420), id: 'evening-class', draw: WF.photo({ img: 'px_lecture', capRoom: V(290, 0), at: T0(s.s39), padR: 580 }) }));
  on(['s40'], 'other', () => TH.split(s.s40, { her: V(0.42, 0.44), side: V('left', 'bottom'), id: 'every-evening', draw: WF.card({ at: T0(s.s40), rows: rows({ MON: WF_WEEK.MON, TUE: ['09:00', '17:00', '17:45', '20:00'], WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI }),
    times: (() => { const a = WT(s.s40, 'every evening'); const o = {}; ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => { o[d] = [T0(s.s40), T0(s.s40), a + i * 0.12, a + i * 0.12 + 0.06]; }); return o; })(), side: 'center' }) }));
  on(['s41', 's42'], 'talk', () => (WF.short() ? TH.talk({ from: s.s41, to: s.s42 }, { frame: 'mid', id: 'settle' }) : null));
  on(['s43a'], 'talk', () => TH.talk(s.s43a, { frame: 'mid', id: 'study-this-week' }));
  on(['s43b'], 'other', () => WF.full(s.s43b, WF.week({ at: T0(s.s43b) - 0.2,
    blocks: [{ d: 0, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 }, { d: 1, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 }, { d: 2, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 }, { d: 3, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 }, { d: 4, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s43b) - 0.2 },
      { d: 3, h0: 17.75, h1: 20, kind: 'class', s: 'CLASS', at: T0(s.s43b) - 0.2 }, { d: 1, h0: 19, h1: 21, kind: 'study', s: 'READ 2 PAPERS\nFOR THURSDAY', at: WT(s.s43b, 'tuesday') }],
    capRoom: V(150, 0) }), { id: 'tuesday-block' }));
  on(['s43c'], 'talk', () => TH.talk(s.s43c, { frame: 'close', punch: ['free'], id: 'free-time' }));
  on(['s43d'], 'talk', () => TH.talk(s.s43d, { frame: 'close', id: 'study-blocks' }));

  /* ---------- 4:38 tip 4: use class time ---------- */
  on(['s43e'], 'tip', () => tip(s.s43e, 4, ['GET THE MOST', 'OUT OF CLASS'], { wordsAt: WT(s.s43e, 'get as much') }));
  on(['s43f'], 'talk', () => TH.talk(s.s43f, { frame: 'mid', id: 'difficult' }));
  on(['s43g', 's44'], 'other', () => TH.split({ from: s.s43g, to: s.s44 }, { her: V(0.42, 0.44), side: V('right', 'bottom'), id: 'tired-class', draw: WF.card({ at: T0(s.s43g), rows: { MON: ['09:00', '17:00', '17:45', '20:00'] }, times: { MON: [T0(s.s43g), WT(s.s43g, 'tired from work'), WT(s.s43g, 'go to class'), WT(s.s44, '8 pm')] }, hiRow: 'MON', redCell: { row: 'MON', col: 3 }, side: 'center',
    extra: [{ at: WT(s.s43g, 'tired'), s: 'TIRED', x: V(560, 600), y: V(820, 760), size: V(80, 74), rot: -0.08 }] }) }));
  on(['s45'], 'talk', () => TH.talk(s.s45, { frame: 'mid', push: [V(1.08, 1.08), V(1.2, 1.16)], id: 'listen' }));
  on(['s46'], 'talk', () => TH.talk(s.s46, { frame: 'close', id: 'stuck-in-class' }));
  on(['s47'], 'talk', () => TH.talk(s.s47, { frame: 'mid', id: 'as-much' }));
  on(['s48'], 'talk', () => TH.talk(s.s48, { frame: 'close', punch: ['more'], id: 'catch-up' }));

  /* ---------- 5:12 tip 5: one calendar (A's 24-hour dial) ---------- */
  on(['s49'], 'tip', () => tip(s.s49, 5, ['ONE CALENDAR', 'FOR WORK AND SCHOOL'], { wordsAt: WT(s.s49, 'same calendar') }));
  on(['s50'], 'other', () => TH.split(s.s50, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'two-calendars', draw: WF.dial({ at: WT(s.s50, 'school calendar') - 0.2 }) }));
  on(['s51'], 'talk', () => TH.talk(s.s51, { frame: 'mid', id: 'all-live-s' }));
  on(['s52'], 'other', () => WF.full(s.s52, WF.dial({ at: T0(s.s52), mergeAt: WT(s.s52, 'but you have'), oneAt: WT(s.s52, 'same one'), capRoom: V(150, 0) }), { id: 'one-24', sound: 'focus' }));
  on(['s53'], 'talk', () => TH.talk(s.s53, { frame: 'close', punch: ['together'], id: 'together' }));
  on(['s54'], 'other', () => TH.tile(s.s54, { at: V('bl', 'br'), w: V(500, 420), id: 'clash', draw: WF.week({ at: T0(s.s54) - 0.1, padL: 600, capRoom: V(150, 0), blocks: [{ d: 2, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s54) - 0.1 }, { d: 2, h0: 17.75, h1: 20, kind: 'class', s: 'CLASS', at: T0(s.s54) - 0.1 }, { d: 2, h0: 16, h1: 19, kind: 'study', s: 'RELEASE', at: WT(s.s54, 'clash') - 0.2 }], clash: { d: 2, h0: 16, h1: 20, at: WT(s.s54, 'clash') } }) }));
  on(['s55'], 'talk', () => TH.talk(s.s55, { frame: 'mid', id: 'full-picture' }));
  on(['s56'], 'talk', () => TH.talk(s.s56, { frame: 'mid', push: [V(1.06, 1.06), V(1.16, 1.14)], id: 'november' }));
  on(['s57'], 'talk', () => TH.talk(s.s57, { frame: 'wide', id: 'not-the-week-talk' }));
  on(['s58', 's59'], 'talk', () => TH.talk({ from: s.s58, to: s.s59 }, { frame: 'close', id: 'check-balance' }));
  on(['s60', 's61'], 'talk', () => TH.talk({ from: s.s60, to: s.s61 }, { frame: 'mid', id: 'december-list' }));
  on(['s62'], 'behind', () => TH.behind(s.s62, ['DECEMBER'], { times: [WT(s.s62, 'december')], id: 'december', size: V(300, 210) }));
  on(['s62'], 'talk', () => (WF.short() ? TH.talk(s.s62, { frame: 'mid', id: 'dec-talk' }) : null));
  on(['s63', 's64'], 'talk', () => TH.talk({ from: s.s63, to: s.s64 }, { frame: 'mid', push: [V(1.14, 1.12), V(1.3, 1.22)], id: 'busy-december' }));
  on(['s65'], 'talk', () => TH.talk(s.s65, { frame: 'wide', id: 'not-best-time' }));
  on(['s66', 's67'], 'talk', () => TH.talk({ from: s.s66, to: s.s67 }, { frame: 'mid', id: 'weekly-review-talk' }));
  on(['s66'], 'kw', () => KW(s.s66, '~weekly review~', { id: 'weekly-review' }));
  on(['s68'], 'other', () => TH.split(s.s68, { her: V(0.4, 0.44), side: V('left', 'bottom'), id: 'release-exam', draw: WF.week({ at: T0(s.s68), blocks: [{ d: 2, h0: 14, h1: 17, s: 'RELEASE', kind: 'fixed', at: WT(s.s68, 'a release') }, { d: 3, h0: 18, h1: 21, s: 'EXAM', kind: 'fixed', at: WT(s.s68, 'exam deadline') }] }) }));
  on(['s69'], 'other', () => WF.full(s.s69, WF.week({ at: T0(s.s69) - 0.2,
    blocks: [0, 1, 2, 3, 4].map((d) => ({ d, h0: 9, h1: 17, kind: 'work', s: 'WORK', at: T0(s.s69) - 0.2 })).concat([{ d: 2, h0: 17, h1: 20, kind: 'fixed', s: 'RELEASE', at: T0(s.s69) - 0.2 },
      { d: 2, h0: 19, h1: 21, kind: 'study', s: 'STUDY', at: T0(s.s69) - 0.2, move: { at: WT(s.s69, 'move'), d: 5, h0: 10, h1: 12 } }]), capRoom: V(150, 0) }), { id: 'move-blocks' }));

  /* ---------- 6:31 tip 6: vacation days and study leave ---------- */
  on(['s70'], 'tip', () => tip(s.s70, 6, ['VACATION DAYS', 'AND STUDY LEAVE'], { wordsAt: WT(s.s70, 'vacation days') }));
  on(['s71', 's72'], 'talk', () => TH.talk({ from: s.s71, to: s.s72 }, { frame: 'mid', id: 'take-your-mind' }));
  on(['s73'], 'talk', () => TH.talk(s.s73, { frame: 'close', id: 'nothing-you-can-do' }));
  on(['s74'], 'talk', () => TH.talk(s.s74, { frame: 'close', punch: ['alone'], id: 'vacation-alone' }));
  on(['s75'], 'talk', () => TH.talk(s.s75, { frame: 'wide', id: 'close-your-eyes' }));
  on(['s76'], 'other', () => TH.tile([WT(s.s76, 'estonia') - 0.3, s.s76.e + 0.4], { at: V('br', 'br'), w: V(500, 420), id: 'estonia', draw: WF.photo({ img: 'px_tallinn', capRoom: V(290, 0), at: WT(s.s76, 'estonia') - 0.3, stamp: { s: 'STUDY LEAVE', at: WT(s.s76, 'study leave') }, padR: 580 }) }));
  on(['s77'], 'other', () => WF.full(s.s77, WF.clip('rt13-30', { t0: T0(s.s77) - 0.1, hls: [WT(s.s77, '30 calendar'), WT(s.s77, '20 of those'), null], capRoom: V(150, 0), align: 'center',
    stamp: { s: '30 DAYS, 20 PAID', at: WT(s.s77, 'paid'), fx: 0.7, dy: V(130, 190), size: V(96, 84) } }), { id: 'study-leave', sound: 'paper' }));

  /* ---------- 7:20 tell people early ---------- */
  on(['s78'], 'tip', () => tip(s.s78, 7, ['LEARN TO', 'COMMUNICATE'], { at: 'another thing', wordsAt: WT(s.s78, 'learn to communicate') }));
  on(['s79'], 'talk', () => TH.talk(s.s79, { frame: 'mid', id: 'clash-talk' }));
  on(['s80'], 'talk', () => TH.talk(s.s80, { frame: 'wide', alt: true, id: 'managing-school' }));
  on(['s81'], 'talk', () => TH.talk(s.s81, { frame: 'close', punch: ['proactive'], id: 'proactive' }));
  on(['s82'], 'talk', () => TH.talk(s.s82, { frame: 'mid', punch: ['earlier'], id: 'write-to' }));

  /* ---------- 7:53 the kind of job you have ---------- */
  on(['s83'], 'tip', () => tip(s.s83, 8, ['THE KIND OF JOB', 'YOU GET'], { at: 'and i also', wordsAt: WT(s.s83, 'kind of job') }));
  on(['s84'], 'other', () => TH.tile(s.s84, { at: V('bl', 'br'), w: V(500, 420), id: 'no-office', draw: WF.photo({ img: 'px_laptop', capRoom: V(290, 0), at: T0(s.s84), padL: 580, stamp: { s: 'NO COMMUTE', at: WT(s.s84, 'commute') } }) }));
  on(['s85'], 'behind', () => TH.behind(s.s85, ['AROUND THE CLOCK'], { times: [WT(s.s85, 'around'), WT(s.s85, 'the clock'), WT(s.s85, 'clock')], id: 'around-the-clock', size: V(200, 150) }));
  on(['s85'], 'talk', () => (WF.short() ? TH.talk(s.s85, { frame: 'mid', id: 'clock-talk' }) : null));
  on(['s86'], 'talk', () => TH.talk(s.s86, { frame: 'mid', id: 'cannot-work-like-me' }));
  on(['s87'], 'talk', () => TH.talk(s.s87, { frame: 'mid', push: [V(1.06, 1.06), V(1.16, 1.14)], id: 'both-sides' }));
  on(['s88'], 'other', () => TH.split(s.s88, { her: V(0.42, 0.44), side: V('right', 'bottom'), id: 'fixed-hours', draw: WF.card({ at: T0(s.s88), title: 'FIXED HOURS', rows: { MON: ['09:00', '17:00', '', ''], TUE: ['09:00', '17:00', '', ''], WED: ['09:00', '17:00', '', ''], THU: ['09:00', '17:00', '', ''], FRI: ['09:00', '17:00', '', ''] },
    times: (() => { const a = WT(s.s88, 'fixed hours'); const o = {}; ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => { o[d] = [a + i * 0.1, a + i * 0.1 + 0.05, 0, 0]; }); return o; })(), side: 'center' }) }));
  on(['s89', 's90'], 'talk', () => TH.talk({ from: s.s89, to: s.s90 }, { frame: 'close', id: 'different-situation' }));
  on(['s91'], 'other', () => TH.split(s.s91, { her: V(0.42, 0.44), side: V('left', 'bottom'), id: 'clock-out', draw: WF.card({ at: T0(s.s91), rows: { MON: WF_WEEK.MON, TUE: WF_WEEK.TUE, WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: ['09:00', '17:00', '', ''] },
    times: { FRI: [T0(s.s91), WT(s.s91, 'clock out'), 0, 0] }, hiRow: 'FRI', hiAt: WT(s.s91, 'clock out'), redCell: { row: 'FRI', col: 1 }, dimWork: true, dimAt: WT(s.s91, 'forget about work'), side: 'center',
    extra: [{ at: WT(s.s91, 'just focus') + 0.1, s: 'FOCUS', x: V(560, 600), y: V(900, 830), size: V(84, 76) }] }) }));
  on(['s92', 's93'], 'other', () => WF.full({ from: s.s92, to: s.s93 }, WF.clockOut({ at: T0(s.s92) - 0.2, me: P('for me', { from: s.s92.i, peek: true }), L: P("i don't think that 5 pm is really when work ends for me", { from: s.s92.i, peek: true }) }), { id: 'five-pm', sound: 'paper', noCaps: true }));

  /* ---------- 8:26 meal prep and sleep ---------- */
  on(['s94'], 'tip', () => tip(s.s94, 9, ['MEAL PREP'], { at: 'another tip', wordsAt: WT(s.s94, 'meal prepping') }));
  on(['s95'], 'other', () => TH.tile(s.s95, { at: V('br', 'br'), w: V(500, 420), id: 'save-your-life', draw: WF.photo({ img: 'px_mealprep', capRoom: V(290, 0), at: T0(s.s95), padR: 580 }) }));
  on(['s96'], 'talk', () => TH.talk([s.s96.t - 0.12, WT(s.s96, 'those four hours') - 0.15], { frame: 'mid', id: 'complain' }));
  on(['s96'], 'other', () => TH.split([WT(s.s96, 'those four hours') - 0.15, s.s96.e + 0.4], { her: V(0.4, 0.44), side: V('right', 'bottom'), id: 'four-hours', draw: WF.stat({ big: '4 HOURS', at: WT(s.s96, 'four hours') }) }));
  on(['s97a'], 'talk', () => TH.talk(s.s97a, { frame: 'wide', id: 'mad-house' }));
  on(['s97b'], 'other', () => TH.ots(s.s97b, { side: 'auto', id: 'wednesday', draw: WF.photo({ img: 'px_mealprep2', at: T0(s.s97b) }) }));
  on(['s97c'], 'tip', () => tip(s.s97c, 10, ['PROTECT', 'YOUR SLEEP'], { at: 'and again', wordsAt: WT(s.s97c, 'protect') }));
  on(['s97d'], 'talk', () => TH.talk(s.s97d, { frame: 'wide', push: [V(1.0, 1.04), V(1.24, 1.2)], id: 'migraines' }));   // her health line stays as she said it: no graphic (kit edit notes)
  on(['s98'], 'card', () => card(s.s98, ['*Your health.*'], { id: 'health' }));
  on(['s99'], 'talk', () => TH.talk(s.s99, { frame: 'close', id: 'get-sleep' }));
  on(['s100'], 'talk', () => TH.talk(s.s100, { frame: 'wide', id: 'proper-sleep' }));
  on(['s101'], 'talk', () => TH.talk(s.s101, { frame: 'mid', id: 'bedtime-talk' }));
  on(['s102'], 'talk', () => TH.talk([WT(s.s102, 'two big things') - 0.6, s.s102.e + 0.3], { frame: 'close', punch: ['same'], id: 'two-big-things' }));
  on(['s103'], 'other', () => TH.ots(s.s103, { side: 'auto', id: 'on-top', draw: WF.card({ at: T0(s.s103) - 0.1, rows: rows({ MON: WF_WEEK.MON, TUE: ['09:00', '17:00', '17:45', '20:00'], WED: WF_WEEK.WED, THU: WF_WEEK.THU, FRI: WF_WEEK.FRI, SAT: ['', '', '10:00', '13:00'] }), side: 'center',
    }) }));

  /* keywords in the longer stretches of her talking (composite check: graphics gaps > 6 s) */

  /* headlines that spell her own words: the caption steps aside while they are up (critic 2026-11-02: no double text) */
  for (const id of ['goal-work', 'two-big-things', 'a-job', 'both-sides', 'cannot-move-list', 'december-list', 'release-exam', 'write-to', 'z-goal']) { const sg = TH.segs.find(x => x.id === id); if (sg) TH.capOff.push([sg.t0 + 0.4, sg.t1]); }
  WF.flush(-6);

  /* ---------- sounds that belong to the look (SOUND-PALETTE: meaning first) ---------- */
  const S_ = (refs, role, t, db = -2) => on(refs, 'snd', () => { if (t != null && isFinite(t)) sfx(role, t, db); });
  const w = (k, word) => (s[k] ? WT(s[k], word) : null);
  S_(['s0'], 'stamp', w('s0', 'job')); S_(['s0'], 'stamp', w('s0', "master's"), -4); S_(['s1'], 'stamp', w('s1', 'since'), 0);
  S_(['s3d'], 'typeHit', w('s3d', "where you're studying"), -4);
  S_(['s4a'], 'marker', w('s4a', 'no limit')); S_(['s4a'], 'stamp', w('s4a', 'limit'), 0);
  S_(['s5'], 'marker', w('s5', 'around 30')); S_(['s5'], 'stamp', w('s5', 'ects'), -3);
  S_(['s6'], 'stamp', s.s6 ? WT(s.s6, '45') - 0.1 : null, -3); S_(['s7'], 'marker', w('s7', 'part-time'), -4);
  S_(['s10'], 'stamp', w('s10', 'monday'), -4); S_(['s10'], 'stamp', w('s10', 'friday'), -4); S_(['s10'], 'stamp', w('s10', 'saturday'), -1);
  S_(['s16'], 'stamp', w('s16', 'credits'), -4); S_(['s21'], 'stamp', w('s21', 'as soon as'), -2);
  S_(['s23'], 'stamp', w('s23', 'choose your course'), -3); S_(['s26'], 'paper', w('s26', 'non-thesis'), -4); S_(['s28'], 'stamp', w('s28', 'focus'), -2);
  S_(['s32'], 'tick', w('s32', 'six weeks'), -4); S_(['s32'], 'tick', w('s32', 'eight weeks'), -4); S_(['s32'], 'stamp', w('s32', '10 weeks'), 0);
  S_(['s36a'], 'stamp', s.s36a ? WT(s.s36a, 'meetings at work') + 0.6 : null, 0); S_(['s36b'], 'stamp', w('s36b', 'study time'), -2);
  S_(['s40'], 'stamp', w('s40', 'every evening'), -3); S_(['s43b'], 'stamp', w('s43b', 'tuesday'), -1); S_(['s43b'], 'bell', w('s43b', 'papers'), -6);
  S_(['s43g'], 'stamp', w('s43g', 'tired'), -2); S_(['s48'], 'clock', w('s48', 'more time'), -4);
  S_(['s50'], 'tick', w('s50', 'school calendar'), -3); S_(['s52'], 'clock', w('s52', 'two different 24'), -4); S_(['s52'], 'stamp', w('s52', 'same one'), 0);
  S_(['s54'], 'marker', w('s54', 'clash'), -2); S_(['s56'], 'stamp', w('s56', 'second week'), -3);
  S_(['s69'], 'paper', w('s69', 'move'), -2); S_(['s76'], 'stamp', w('s76', 'study leave'), -1);
  S_(['s77'], 'marker', w('s77', '30 calendar')); S_(['s77'], 'marker', w('s77', '20 of those'), -3); S_(['s77'], 'stamp', w('s77', 'paid'), 0);
  S_(['s82'], 'stamp', w('s82', 'earlier'), -1); S_(['s84'], 'stamp', w('s84', 'commute'), -2); S_(['s88'], 'stamp', w('s88', 'fixed hours'), -3);
  S_(['s91'], 'stamp', w('s91', 'clock out'), 0); S_(['s91'], 'stamp', s.s91 ? WT(s.s91, 'just focus') + 0.1 : null, -2);
  S_(['s92'], 'marker', s.s92 ? s.s92.w[5] : null, -2); S_(['s93'], 'clock', s.s93 ? s.s93.w[1] : null, -3); S_(['s93'], 'stamp', s.s93 ? s.s93.w[3] : null, 0);
  S_(['s95'], 'stamp', w('s95', 'save your life'), -1); S_(['s96'], 'stamp', w('s96', 'good deal'), -2); S_(['s103'], 'stamp', w('s103', 'on top'), 0);
  for (const k of ['s15', 's25', 's34', 's43e', 's49', 's70', 's78', 's83', 's94', 's97c']) S_([k], 'stamp', s[k] ? s[k].t + 0.23 : null, -1);   // the tip number stamps
  // the panels in this look are paper cards: their slide is a paper sound (a whoosh-like swipe only now and then), windows focus
  let nsw = 0, npop = 0; for (const c of CUES) { if (c.name === 'swipe' && !c.keep) c.name = (++nsw % 4 === 0) ? 'swipe' : 'paper'; else if (c.name === 'pop') c.name = (++npop % 2) ? 'focus' : 'pop'; }

  if (FX) FX.fill();
  for (const sg of TH.segs) { const d = sg.draw; if (d) sg.draw = (t, ...a) => { WF.T0 = sg.t0; try { return d(t, ...a); } finally { WF.T0 = null; } }; }   // WF.lead: no empty card
  WF.full = full0; TH.tile = tile0; TH.room = room0; TH.talk = talk0; TH.ots = ots0; TH.presenter = pres0; TH.split = split0;
  if (FX) FX.restore();
  return s;
}

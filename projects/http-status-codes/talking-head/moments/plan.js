/* http-status-codes: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-03 by the FILM agent. FD_SENT = her sentences (film/scenes/fdsent.js); FD_PLAN(mode) finds the ones inside
 * this moment and runs every layout call whose sentences are all there. In a short: the first sentence is always her talking
 * (no overlay at the start, her rule 2026-10-18), no words behind her / stacks under the label, at most one keyword, full-frame
 * graphics go on a top panel with her below (she is always on camera in shorts). Change a layout here and the full edit and
 * the shorts that hold it change together. Receipts (real pages) land within 5 s of each claim.
 * Corrections (FEEDBACK 2026-11-02, small ones = a card or a corrected caption): raw 8:11 "The first one is leaking stack
 * traces" is her 4th mistake -> the mistake counter rolls 1 -> 4 on "first" and the caption reads "The fourth one"
 * (tools/words.py); raw 8:34 "APP_DEBUG should always be false" -> caption "false" + the Laravel docs line on screen. */
'use strict';
FD.skipIds = new Set(); FD.skip = (...ids) => ids.forEach(i => FD.skipIds.add(i));
FD.kws = [];
/** a keyword at chest height in the caption style (Anton caps, solid white with a soft shadow, ~word~ in a group colour); the caption steps aside */
FD.kwDraw = (t) => { for (const k of FD.kws) { if (t < k.t0 || t >= k.t1) continue; const p = fdE(t, k.t0, 0.22); const z = V(128, 112); const f = FN(z);
    const parts = k.text.split(/(~[^~]+~)/).filter(Boolean).map(s => ({ s: s.replace(/~/g, '').trim().toUpperCase(), on: /^~/.test(s) })).filter(x => x.s);
    const ov = ovr('kw-' + k.id); const str = ov.s != null ? ov.s.toUpperCase() : null; const segs = str ? [{ s: str, on: false }] : parts;
    const sp = tw(' ', f); const tot = segs.reduce((a, s) => a + tw(s.s, f), 0) + sp * (segs.length - 1); const y = k.y; let x = CX - tot / 2;
    withA(p, () => { ctx.save(); FD.soft(z); setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      for (const s of segs) { ctx.fillStyle = s.on ? (k.col || FD.c4) : '#FFFFFF'; ctx.fillText(s.s, x, y + (1 - p) * 20); x += tw(s.s, f) + sp; }
      ctx.restore(); });
    regBox(ov, CX - tot / 2, y - z * 0.85, tot, z * 1.05, { text: segs.map(s => s.s).join(' '), def: k.text.replace(/~/g, '') }); } };
(function () { const p0 = TH.post; TH.post = (t) => { p0(t); if (FOOT.m.kind === 'teaser') return; ctx.save(); ctx.setTransform(...BASE); SCENE_ID = 'keywords'; EL.seen.clear(); FD.kwDraw(t); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); }; })();

function FD_PLAN(mode) {
  FD.q = []; const s = {}; for (const [k, q] of Object.entries(FD_SENT)) { try { s[k] = P(q); } catch (e) { /* not in this moment */ } }
  const keys = Object.keys(s); const short = mode === 'short'; const first = short && keys[0] && s[keys[0]].t < 3 ? keys[0] : null; let kws = 0;
  if (short && FOOT.m.labelCode) TH.look.band = FD.col(FOOT.m.labelCode);
  if (short && /[DFG]/.test(FOOT.m.fmt || '')) TH.look.band = '#111114';   // D / F / G: a dark ground around her picture
  const on = (refs, kind, fn, nc) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (short) {
      if (kind === 'behind' || kind === 'stack') return;
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw' && ++kws > 1) return;
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (nc && sg && TH.segs.length > n0 && !short) TH.capOff.push([sg.t0 + 0.3, sg.t1]);
    if (sg && TH.segs.length > n0 && FD.skipIds.has(sg.id)) TH.segs.pop();
  };
  const talk0 = TH.talk, split0 = TH.split;
  // 2026-11-08 her note "everything is the same format": each short has a FORMAT (manifest "fmt", SHORTS-PLAYBOOK "Format menu").
  // A wide (her full width, captions on the band under her; graphics on a top panel, her below) · B split (graphic or the title
  // poster on top, her below, all through) · C cut-out (her cut-out over a flat ground with the codes behind her; graphics full
  // bleed with her in a corner window) · D captions on top (her full width at the foot, the title flashes in the top band,
  // then her captions live there; graphics under her) · E window + title (the old look, at most 1 in 4) · F square + karaoke
  // (her square high on a dark ground, word-lit captions under her; graphics on a top panel) · G letterbox (her whole 16:9
  // frame in a band on black, the title above, word-lit captions below; graphics in a 16:9 box above her).
  const FMT = short ? (FOOT.m.fmt || 'E') : null; FD.fmt = FMT; FD.gfxSpans = []; FD.popN = 0;
  if (short) {
    const half0 = TH.half, tile0 = TH.tile, ots0 = TH.ots, pres0 = TH.presenter;
    const mark = (sg) => { if (sg) FD.gfxSpans.push([sg.t0, sg.t1]); return sg; };
    const lbBox = (sp_, o) => {   // G: her letterbox band slides down (still her whole 16:9 frame), the graphic opens above it
      const q = TH.span(sp_, o); const sg = TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
        const r = { x: 0, y: 0, w: W, h: 976 }; const g0 = g; g = G[TH.look.ground] || g0;
        ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, g.bg); o.draw(t, r); ctx.restore(); g = g0;
        FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' }));
      sfx('swipe', q.t0 + 0.2, -4); return sg; };
    const GFX = {
      A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.35 }),
      B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: o.draw, noCaps: o.noCaps, enter: 0.3 }),
      C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, id: o.id, draw: o.draw, noCaps: o.noCaps, ground: FD.gKey(), enter: 0.3 }),
      D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.25 }),
      E: (sp_, o) => half0(sp_, { side: 'top', size: 1150, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.55, sound: o.sound === false ? false : undefined }),
      F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
      G: (sp_, o) => lbBox(sp_, o),
      // 2026-11-09 (her note "some look so similar, it's just the colour"): five new formats, SHORTS-PLAYBOOK "Format menu" H-M
      H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.25, fy: 0.42 }),   // her on top, the graphic rises from the foot
      I: (sp_, o) => popCard(sp_, o),
      J: (sp_, o) => jSeg(sp_, o, o.draw),
      K: (sp_, o) => half0(sp_, { side: 'top', size: 940, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3, ground: 'fdBlack' }),
      M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
    };
    // I: the graphic is a card that pops up OVER her full frame (above her head, a slight tilt, a soft shadow); she never moves
    const POP = { x: 84, y: 84, w: 912, h: 570 };
    const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = (FD.popN = (FD.popN || 0) + 1); const tilt = (k % 2 ? -1 : 1) * 0.03;
      const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
        const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
        grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
          const g0 = g; g = G[o.ground || FD.gKey()] || g0;
          ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, g.bg); ctx.restore();
          ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
          g = g0; ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
        FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
      sfx('pop', q.t0 + 0.06, -4); return sg; };
    // J: her cut-out in front of a big screen on a dark wall; the screen shows the short's codes while she talks, its graphics when there is one
    const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
      const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
      const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: FD.wall, grid: false, outline: FD.white, outlinePx: 0, under: () => FD.jRoom(t, q, content || FD.poster) }),
        () => CAM(q.t0, { box, z: 1 }), { cover: true });
      if (content) sfx('shutter', q.t0 + 0.05, -6); return sg; };
    const top = (sp_, o = {}) => mark(GFX[FMT](sp_, o));
    FD.full = (sp_, draw, o = {}) => top(sp_, { ...o, draw });
    TH.tile = top; TH.room = top; TH.ots = top; TH.presenter = top; TH.half = top; TH.split = (sp_, o = {}) => (o.draw ? top(sp_, o) : split0(sp_, o));
    TH.card = ((card0) => (sp_, lines, o = {}) => card0(sp_, lines, o))(TH.card);
    // her talking: B = the title poster over her, C = her cut-out over the codes; the rest her own framing ("frame9")
    const talkF = {
      B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: FD.poster, enter: 0, ground: FD.gKey(), sound: false }),
      C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.64, id: o.id, draw: FD.poster, enter: 0.0001, ground: FD.gKey(), gr: [40, 110, W - 80, 1000], sound: false }),
      G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
      J: (sp_, o) => jSeg(sp_, o, null),
      // H / I / K / M: her whole frame full bleed at z 1 (face ~30 % of the height, never a tighter crop)
      H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
      K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    };
    TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: /close|tight/.test(o.frame || '') ? 'wide' : o.frame, punch: undefined, push: undefined }));
    if (FD.noHook) { /* the short's own script opens */ } else if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
    else TH.talk([0, Math.min(3, TOTAL)], { frame: 'mid', id: 'hook' });
  }
  const T0 = (ph) => ph.t - 0.12; const sp = (a, b) => ({ from: s[a], to: s[b || a] });
  // every panel starts with something on it: its first element lands within 0.35 s of the panel (FD.lead)
  const LD = (draw, sp_) => { if (!draw) return draw; const t0 = Array.isArray(sp_) ? sp_[0] : (sp_.from ? sp_.from.t : sp_.t) - 0.12; return (t, r) => { const k = FD.T0; FD.T0 = t0; try { draw(t, r); } finally { FD.T0 = k; } }; };
  { const f0 = FD.full; FD.full = (s_, draw, o) => f0(s_, LD(draw, s_), o);
    for (const k of ['split', 'tile', 'half', 'ots', 'room', 'presenter']) { const f = TH[k]; TH[k] = (s_, o = {}) => f(s_, o.draw ? { ...o, draw: LD(o.draw, s_) } : o); } }
  const KW = (ph, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = o.word || ws.find(x => x.length > 3) || ws[0];
    const t0 = (o.at != null ? o.at : WT(ph, c)) - 0.1; const t1 = o.until != null ? o.until : Math.max(t0 + 1.6, Math.min(ph.e + 0.35, t0 + 3.2));
    const k = { t0, t1, text: w, id: o.id || 'kw' + FD.kws.length, col: o.col, y: V(H * 0.68, FD.short() ? ((FOOT.m.fmt || 'E') === 'E' ? Math.max(560, TH.labelBottom() + 220) : FOOT.m.fmt === 'F' ? 1720 : FOOT.m.fmt === 'J' ? 1660 : /[HIKM]/.test(FOOT.m.fmt) ? 1500 : 1300) : 1480) };
    for (const q of FD.kws) if (q.t1 > t0) q.t1 = Math.max(q.t0 + 0.2, t0 - 0.05);
    FD.kws.push(k); TH.capOff.push([t0, t1]); TH.used = true; sfx('type', t0 + 0.1, -5); return k; };
  // black phrase cards in set 02: Anton caps, *word* in amber, one line per line, cut in on the first word (FD.type on black)
  const card = (ph, lines, o = {}) => { const times = o.times || []; let k = 0;
    const L = lines.map((l) => { const ws = l.split(/\s+/); const tt = times.slice(k, k + ws.length); k += ws.length; const hi = ws.filter(w => /^\*/.test(w) || /\*$/.test(w) || /\*/.test(w)).map(w => w.replace(/[^\w']/g, '').toLowerCase());
      // a starred run: every word between the stars
      const run = []; let on = false; ws.forEach(w => { if (/^\*/.test(w)) on = true; if (on) run.push(w.replace(/[^\w']/g, '').toLowerCase()); if (/\*[^\w]*$/.test(w)) on = false; });
      return { s: UP(l.replace(/\*/g, '')), times: tt.length === ws.length ? tt : undefined, at: tt[0], font: 'num', hi: run.map(UP).map(x => x.toLowerCase()), hiCol: FD.c4 }; });
    const t0 = o.start != null ? o.start : (times[0] != null ? times[0] - 0.15 : (ph.from || ph).t - 0.12); const end = o.until != null ? o.until : (ph.to || ph.from || ph).e + 0.3;
    const sg = FD.full([t0, end], FD.type({ ground: 'fdBlack', align: 'center', size: V(150, 116), lh: 1.12, lines: L }), { id: o.id, noCaps: true }); sfx('tick', t0 + 0.02, -5); return sg; };
  const SPL = (ph, draw, o = {}) => TH.split(ph, { her: V(0.4, 0.44), side: V(o.side || 'right', 'bottom'), id: o.id, draw });
  // 2026-11-07: the graphic fills the frame (no beige strip beside it); her tile sits over an empty corner of it
  const TILE = (ph, draw, o = {}) => TH.tile(ph, { at: o.at || V('br', 'br'), w: V(520, 420), id: o.id, draw });
  const OTS = (ph, draw, o = {}) => TH.ots(ph, { side: 'auto', w: V(980, 900), id: o.id, draw });
  const ROOM = (ph, draw, o = {}) => TH.room(ph, { at: o.at, side: V(o.side || 'right', 'bottom'), her: V(0.42, 0.44), id: o.id, draw });
  const HALF = (ph, draw, o = {}) => TH.half(ph, { side: V(o.side || 'left', 'top'), id: o.id, draw });
  const PRES = (ph, draw, o = {}) => TH.presenter(ph, { side: o.side || 'right', id: o.id, draw });
  const BEH = (ph, words, o = {}) => TH.behind(ph, words, { id: o.id, times: o.times, size: o.size || V(560, 360), col: o.col, font: 'disp' });

  /* ---------- 0:00 what a status code is ---------- */
  on(['request'], 'other', () => SPL(s.request, HT.trip({ at: T0(s.request), nodes: [{ k: 'laptop', x: 0.16, y: 0.42, px: 0.5, py: 0.2 }, { k: 'server', x: 0.84, y: 0.42, px: 0.5, py: 0.72 }],
    legs: [{ a: 0, b: 1, at: WT(s.request, 'sends'), s: 'GET /books/42', dur: 0.9 }, { a: 1, b: 0, at: WT(s.request, 'response'), code: '200', ret: true, dur: 0.9 }] }), { id: 'open-request' }));
  on(['firstline', 'reason'], 'other', () => FD.full({ from: s.firstline, to: s.reason }, FD.code({ codes: [
    { at: T0(s.firstline), c: '100' }, { at: WT(s.firstline, 'three-digit'), c: '503' }, { at: WT(s.isstatus, 'status'), c: '301' },
    { at: WT(s.is200, '200'), c: '200', name: 'OK', nameAt: WT(s.reason, 'ok') }] }), { id: 'open-200' }));
  on(['job'], 'talk', () => TH.talk(s.job, { frame: 'close', id: 'job' }));
  on(['digit'], 'behind', () => BEH(s.digit, ['2xx'], { times: [WT(s.digit, 'first')], col: FD.g2, id: 'first-digit' }));

  /* ---------- 0:25 the five classes ---------- */
  on(['five'], 'other', () => SPL(s.five, FD.table({ cells: [[1, 2, 3, 4, 5].map((d, i) => ({ c: d + 'xx', ground: String(d), at: WT(s.five, 'five') + i * 0.12 }))] }), { side: 'left', id: 'five' }));
  on(['whichclass'], 'talk', () => TH.talk(s.whichclass, { frame: 'mid', push: [V(1.2, 1.14), V(1.3, 1.22)], id: 'which-class' }));
  on(['counter'], 'other', () => ROOM(s.counter, FD.photo({ img: 'px_5865624', at: WT(s.counter, 'book'), ground: 'fd1' }), { at: 'bookshop', id: 'counter' }));
  on(['c1', 'c2'], 'other', () => FD.full({ from: s.c1, to: s.c2 }, FD.code({ codes: [
    { at: T0(s.c1), c: '1xx', name: 'Hold on' },
    { at: WT(s.c2, '2xx'), c: '2xx', name: 'Success' }] }), { id: 'c1-c2' }));
  on(['c2b', 'c2c'], 'talk', () => TH.talk({ from: s.c2b, to: s.c2c }, { frame: 'mid', id: 'got-book' }));
  on(['c3', 'c3b'], 'other', () => SPL({ from: s.c3, to: s.c3b }, FD.code({ codes: [{ at: T0(s.c3) - 0.4, c: '2xx' }, { at: WT(s.c3, '3xx'), c: '3xx', name: 'Redirection' }] }), { side: 'left', id: 'c3' }), true);
  on(['c4', 'c4c'], 'other', () => TILE({ from: s.c4, to: s.c4c }, FD.code({ codes: [{ at: T0(s.c4) - 0.4, c: '3xx' }, { at: WT(s.c4, '4xx'), c: '4xx', name: 'Client error' }] }), { id: 'c4' }), true);
  on(['c5', 'c5c'], 'other', () => PRES({ from: s.c5, to: s.c5c }, FD.code({ codes: [{ at: T0(s.c5) - 0.4, c: '4xx' }, { at: WT(s.c5, '5xx'), c: '5xx', name: 'Server error' }] }), { side: 'right', id: 'c5' }), true);
  // a browser's network panel (generic): every request, its status; the first digits light up, then the 4xx rows, then the 5xx rows
  on(['look', 'fivecheck'], 'other', () => FD.full({ from: s.look, to: s.fivecheck }, HT.net({ rows: [['GET', '/books', 200], ['POST', '/books', 201], ['GET', '/books/9999', 404], ['DELETE', '/books/42', 204],
    ['POST', '/books', 422], ['GET', '/old-shop/books', 301], ['GET', '/books/42', 500], ['PUT', '/books/42', 409]].map(([m, path, c], i) => ({ m, path, c, at: T0(s.look) + 0.12 * i })),
    digitAt: WT(s.look, 'first digit'), focus: [{ at: WT(s.four, 'four'), d: '4' }, { at: WT(s.fivecheck, 'five'), d: '5' }] }), { id: 'first-digit-first' }));
  on(['eachgroup', 'x1'], 'talk', () => TH.talk({ from: s.eachgroup, to: s.x1 }, { frame: 'wide', id: 'each-group' }));

  /* ---------- 1:21 1xx and 2xx ---------- */
  // (keyword 'you rarely see 1xx' dropped 2026-11-07: it re-typed her sentence)
  on(['x101'], 'other', () => OTS(s.x101, FD.code({ codes: [{ at: WT(s.x101, '101'), c: '101', name: 'Switching Protocols' }] }), { id: 'x101' }));
  on(['x2', 'three'], 'other', () => SPL({ from: s.x2, to: s.three }, FD.table({ ground: 'fd2', cells: [[
    { c: '200', name: 'OK', at: WT(s.three, 'three') }, { c: '201', name: 'Created', at: WT(s.three, 'three') + 0.15 }, { c: '204', name: 'No Content', at: WT(s.three, 'three') + 0.3 }]] }), { side: 'left', id: 'three-2xx' }));
  on(['ok200', 'get42'], 'other', () => FD.full({ from: s.ok200, to: s.get42 }, FD.http({ ground: 'fd2', code: { c: '200', at: WT(s.ok200, '200') }, lines: [
    { s: 'GET /books/42', at: WT(s.get42, 'get') }, { s: 'HTTP/1.1 200 OK', at: WT(s.get42, 'returns'), hi: '200 OK' }, { s: '{ "id": 42, "title": "…" }', at: WT(s.get42, 'with the book') }] }), { id: 'get-42' }));
  on(['c201', 'location'], 'other', () => HALF({ from: s.c201, to: s.location }, FD.http({ ground: 'fd2', code: { c: '201', at: WT(s.c201, '201') }, lines: [
    { s: 'POST /books', at: WT(s.post, 'post') }, { s: 'HTTP/1.1 201 Created', at: WT(s.post, '201'), hi: '201 Created' }, { s: 'Location: /books/43', at: WT(s.location, 'location') }] }), { side: 'left', id: 'post-201' }));
  on(['c204', 'empty'], 'other', () => SPL({ from: s.c204, to: s.empty }, FD.http({ ground: 'fd2', code: { c: '204', at: WT(s.c204, '204') }, lines: [
    { s: 'DELETE /books/42', at: WT(s.del42, 'delete') }, { s: 'HTTP/1.1 204 No Content', at: WT(s.del42, 'nothing'), hi: '204 No Content' }, { s: '(empty body)', at: WT(s.empty, 'empty'), dim: true }] }), { id: 'delete-204' }));

  /* ---------- 2:12 3xx ---------- */
  on(['x3', 'address'], 'other', () => FD.full({ from: s.x3, to: s.address }, HT.trip({ at: T0(s.x3), nodes: [{ k: 'laptop', x: 0.1, y: 0.55, px: 0.2, py: 0.5 }, { k: 'server', x: 0.5, y: 0.25, px: 0.75, py: 0.2 }, { k: 'server', x: 0.88, y: 0.62, px: 0.75, py: 0.8, at: WT(s.address, 'different') }],
    legs: [{ a: 0, b: 1, at: WT(s.x3, '3xx'), s: 'GET /books/42' }, { a: 1, b: 0, at: WT(s.address, 'what'), code: '301', ret: true }, { a: 0, b: 2, at: WT(s.address, 'address') }] }), { id: 'different-address' }));
  on(['newaddr'], 'other', () => TILE(s.newaddr, FD.http({ ground: 'fd3', lines: [{ s: 'HTTP/1.1 301 Moved Permanently', at: T0(s.newaddr) + 0.2, hi: '301 Moved Permanently' }, { s: 'Location: /other-branch/books/42', at: WT(s.newaddr, 'location') }] }), { id: 'location' }));
  on(['fourcommon'], 'talk', () => TH.talk([T0(s.fourcommon), s.twoq.t - 0.15], { frame: 'mid', id: 'four-common' }));
  on(['twoq'], 'talk', () => TH.talk(s.twoq, { frame: 'close', id: 'two-questions' }));   // (the 'Two questions' card re-typed her line)
  on(['q1'], 'talk', () => TH.talk(s.q1, { frame: 'close', id: 'q1' }));
  on(['forgood', 'fornow'], 'other', () => FD.full({ from: s.forgood, to: s.fornow }, FD.table({ ground: 'fd3', rows: ['Permanent', 'Temporary'], rowsAt: [WT(s.forgood, 'for good'), WT(s.fornow, 'for now')],
    cells: [[{ c: '301', name: 'Moved Permanently', at: WT(s.forgood, '301') }, { c: '308', name: 'Permanent Redirect', at: WT(s.forgood, '308') }], [{ c: '302', name: 'Found', at: WT(s.fornow, '302') }, { c: '307', name: 'Temporary Redirect', at: WT(s.fornow, '307') }]] }), { id: 'redirect-table' }));
  // (keyword 'does the request stay the same?' dropped: it re-typed her question)
  on(['q2'], 'talk', () => TH.talk(s.q2, { frame: 'wide', id: 'q2' }));
  on(['form', 'same'], 'other', () => ROOM({ from: s.form, to: s.same }, FD.table({ ground: 'fd3', rows: ['Permanent', 'Temporary'], cols: ['POST may become GET', 'POST stays POST'], colsAt: [WT(s.form, 'form'), WT(s.same, '307')],
    cells: [[{ c: '301', at: T0(s.form) }, { c: '308', at: T0(s.form) + 0.1 }], [{ c: '302', at: T0(s.form) + 0.2 }, { c: '307', at: T0(s.form) + 0.3 }]], hi: [{ row: 1, col: 1, at: WT(s.same, '307') }, { row: 0, col: 1, at: WT(s.same, '308') }] }), { at: 'counter', id: 'same-form' }));
  on(['switch'], 'other', () => SPL(s.switch, FD.clip('rfc-301', { at: T0(s.switch), hl: WT(s.switch, 'switch'), ground: 'fd3', code: { c: '301', at: WT(s.switch, '301') } }), { side: 'left', id: 'rfc-301' }));
  on(['pages'], 'talk', () => TH.talk(s.pages, { frame: 'mid', id: 'web-pages' }));
  on(['api'], 'other', () => OTS(s.api, FD.code({ codes: [{ at: WT(s.api, 'api'), c: '307', name: 'for an API', nameAt: WT(s.api, 'api') }, { at: WT(s.api, '308'), c: '308', name: 'for an API' }] }), { id: 'api-307' }));

  /* ---------- 3:08 4xx ---------- */
  on(['x4', 'debug'], 'other', () => FD.full({ from: s.x4, to: s.debug }, FD.code({ hero: true, kicker: '4XX', codes: [{ at: T0(s.x4) - 0.2, c: '3xx' }, { at: WT(s.x4, '4xx'), c: '4xx', name: 'Client errors', nameAt: WT(s.x4, 'client') }] }), { id: 'x4' }));
  on(['start400'], 'talk', () => TH.talk(s.start400, { frame: 'mid', id: 'start-400' }));
  on(['c400', 'json'], 'other', () => SPL({ from: s.c400, to: s.json }, FD.http({ ground: 'fd4', code: { c: '400', at: WT(s.c400, '400') }, lines: [
    { s: 'POST /books', at: WT(s.c400, 'read') }, { s: '{ "title": "A new book",', at: WT(s.json, 'broken') }, { s: '   ← missing }', at: WT(s.json, 'missing'), dim: true }, { s: 'HTTP/1.1 400 Bad Request', at: WT(s.json, 'bracket') + 0.2, hi: '400 Bad Request' }] }), { id: 'bad-request' }));
  on(['c422', 'notitle'], 'other', () => HALF({ from: s.c422, to: s.notitle }, FD.http({ ground: 'fd4', code: { c: '422', at: WT(s.c422, '422') }, lines: [
    { s: 'POST /books', at: WT(s.notitle, 'send') }, { s: '{ "title": "" }', at: WT(s.notitle, 'no title') }, { s: 'HTTP/1.1 422 Unprocessable Content', at: WT(s.notitle, 'you get'), hi: '422 Unprocessable Content' }] }), { side: 'left', id: 'unprocessable' }));
  on(['some400', 'clearer'], 'talk', () => TH.talk({ from: s.some400, to: s.clearer }, { frame: 'close', id: 'some-400' }));
  // (keyword '422 is clearer' dropped: it re-typed her sentence)
  on(['c404'], 'behind', () => BEH(s.c404, ['404'], { times: [WT(s.c404, '404')], col: FD.g4, id: 'behind-404' }));
  on(['get9999', 'yourself'], 'other', () => TILE({ from: s.get9999, to: s.yourself }, FD.http({ ground: 'fd4', code: { c: '404', at: WT(s.gets404, '404') }, lines: [
    { s: 'GET /books/9999', at: WT(s.get9999, 'get') }, { s: 'HTTP/1.1 404 Not Found', at: WT(s.gets404, '404'), hi: '404 Not Found' }] }), { at: V('bl', 'br'), id: 'get-9999' }));
  on(['c410', 'catalog'], 'other', () => FD.full({ from: s.c410, to: s.catalog }, FD.code({ codes: [{ at: T0(s.c410), c: '404', name: 'Not Found' }, { at: WT(s.c410, '410'), c: '410', name: 'Gone' }] }), { id: 'gone-410' }));
  on(['google'], 'other', () => FD.full(s.google, FD.clip('google-line', { at: T0(s.google), hl: WT(s.google, 'same way') - 0.4, ground: 'fd4', code: { c: '410', at: WT(s.google, '410') } }), { id: 'google' }));
  on(['use410', 'c409'], 'talk', () => TH.talk({ from: s.use410, to: s.c409 }, { frame: 'mid', id: 'use-410' }));
  on(['c409'], 'kw', () => KW(s.c409, '~409~ conflict', { word: 'conflict', at: WT(s.c409, '409'), id: 'conflict', col: FD.c4 }));
  // two admins, one book: A saves a new price, B (still on the old page) saves and the old price comes back
  on(['admins', 'oldprice'], 'other', () => ROOM({ from: s.admins, to: s.oldprice }, HT.admins({ at: WT(s.admins, 'two admins'), aAt: WT(s.adminA, 'changes'), bAt: WT(s.adminB, 'still'), saveAt: WT(s.title, 'save') - 0.3,
    oldAt: WT(s.oldprice, 'old price'), p0: '€20', p1: '€25' }), { side: 'right', id: 'two-admins' }));
  on(['versions'], 'other', () => ROOM(s.versions, FD.http({ ground: 'fd4', code: { c: '409', at: WT(s.versions, '409') }, lines: [
    { s: 'B  PUT /books/42  (v1)', at: T0(s.versions) + 0.3 }, { s: 'HTTP/1.1 409 Conflict', at: WT(s.versions, '409'), hi: '409 Conflict' }] }), { at: 'versions', id: 'conflict-409' }));
  on(['c429', 'slow'], 'other', () => TILE({ from: s.c429, to: s.slow }, HT.trip({ at: T0(s.c429), nodes: [{ k: 'laptop', x: 0.12, y: 0.42, px: 0.5, py: 0.2 }, { k: 'server', x: 0.6, y: 0.42, px: 0.5, py: 0.7 }],
    burst: { a: 0, b: 1, at: WT(s.c429, 'too many'), n: 9, gap: 0.16, okN: 5, back: '429' }, code: { c: '429', at: WT(s.c429, '429'), name: 'Too Many Requests' } }), { at: V('br', 'br'), id: 'c429' }));

  /* ---------- 4:42 401 vs 403 ---------- */
  on(['vs'], 'other', () => card(s.vs, ['401 vs *403*'], { times: [WT(s.vs, '401'), WT(s.vs, 'versus'), WT(s.vs, '403')], start: WT(s.vs, '401') - 0.15, until: WT(s.vs, '401', 1) - 0.1, id: 'vs' }));
  on(['vs'], 'talk', () => TH.talk([WT(s.vs, '401', 1) - 0.12, s.vs.e + 0.3], { frame: 'mid', id: 'mix-up' }));
  on(['route'], 'other', () => SPL(s.route, FD.http({ ground: 'fd4', lines: [{ s: 'DELETE /books/42', at: WT(s.route, 'delete') }, { s: '// admins only', at: WT(s.route, 'only admins'), dim: true }] }), { id: 'route' }));
  on(['scen'], 'talk', () => TH.talk(s.scen, { frame: 'close', id: 'scenarios' }));
  on(['case1', 'is401'], 'other', () => HALF({ from: s.case1, to: s.is401 }, FD.http({ ground: 'fd4', code: { c: '401', at: WT(s.is401, '401') }, lines: [
    { s: 'DELETE /books/42', at: WT(s.case1, 'request') }, { s: 'Authorization: (none)', at: WT(s.case1, 'no token') }, { s: 'HTTP/1.1 401 Unauthorized', at: WT(s.is401, '401'), hi: '401 Unauthorized' }] }), { side: 'left', id: 'case-401' }));
  on(['case2', 'is403'], 'other', () => SPL({ from: s.case2, to: s.is403 }, FD.http({ ground: 'fd4', code: { c: '403', at: WT(s.is403, '403') }, lines: [
    { s: 'DELETE /books/42', at: WT(s.case2, 'request') }, { s: 'Authorization: Bearer (customer)', at: WT(s.case2, 'valid token') }, { s: 'HTTP/1.1 403 Forbidden', at: WT(s.is403, '403'), hi: '403 Forbidden' }] }), { id: 'case-403' }));
  on(['twocases'], 'talk', () => TH.talk(s.twocases, { frame: 'wide', id: 'two-cases' }));
  on(['hotel', 'k403'], 'other', () => FD.full({ from: s.hotel, to: s.k403 }, FD.photo({ img: 'px_4907178', at: T0(s.hotel), fx: 0.5, fy: 0.45,
    code: { codes: [[WT(s.k401, '401'), '401'], [WT(s.k403, '403'), '403']], names: [[WT(s.k401, '401'), 'No card'], [WT(s.k403, '403'), 'Another room']] } }), { id: 'keycard' }));
  on(['who', 'know'], 'other', () => FD.full({ from: s.who, to: s.know }, HT.who({ at: WT(s.who, '401'), at2: WT(s.know, '403'), denyAt: WT(s.know, 'but') }), { id: 'who-are-you' }));
  on(['name'], 'talk', () => TH.talk(s.name, { frame: 'close', id: 'the-name' }));
  on(['called', 'authn'], 'other', () => FD.full({ from: s.called, to: s.authn }, FD.clip('rfc-401', { at: WT(s.called, 'called'), hl: WT(s.authn, 'authentication'), ground: 'fd4', code: { c: '401', at: WT(s.called, '401') } }), { id: 'rfc-401' }));
  on(['perm'], 'other', () => OTS(s.perm, FD.table({ ground: 'fd4', cells: [[{ c: '401', name: 'authentication', at: T0(s.perm) }, { c: '403', name: 'permission', at: WT(s.perm, 'permission') }]] }), { id: 'perm' }));
  // the one form in the video: a modern phone screen. 401 -> log in; 403 -> a message (logging in again won't help)
  on(['login', 'message'], 'other', () => SPL({ from: s.login, to: s.message }, HT.phone({ at: WT(s.login, '401'), msgAt: WT(s.nohelp, '403') }), { side: 'left', id: 'front-end' }));
  on(['hide'], 'other', () => FD.full(s.hide, FD.code({ codes: [{ at: T0(s.hide), c: '403' }, { at: WT(s.hide, '404'), c: '404', name: 'on purpose', nameAt: WT(s.hide, 'on purpose') }] }), { id: 'hide-404' }));
  on(['github', 'private'], 'other', () => FD.full({ from: s.github, to: s.private }, FD.clip('gh-hl', { at: T0(s.github), hl: WT(s.private, 'confirm') - 0.3, ground: 'fd4', code: { c: '404', at: WT(s.private, '404') } }), { id: 'github' }));
  on(['shouldnt'], 'talk', () => TH.talk(s.shouldnt, { frame: 'close', push: [V(1.0, 1.0), V(1.12, 1.1)], id: 'shouldnt-know' }));   // (the card re-typed her line)

  /* ---------- 6:05 5xx ---------- */
  on(['x5', 'failed'], 'other', () => FD.full({ from: s.x5, to: s.failed }, FD.code({ hero: true, kicker: '5XX', codes: [{ at: T0(s.x5) - 0.2, c: '4xx' }, { at: WT(s.x5, '5xx'), c: '5xx', name: 'Server errors', nameAt: WT(s.x5, 'server') }] }), { id: 'x5' }));
  on(['c500', 'exception'], 'other', () => PRES({ from: s.c500, to: s.exception }, FD.photo({ img: 'px_17489152', at: T0(s.c500), code: { c: '500', at: WT(s.c500, '500'), name: 'Internal Server Error' } }), { side: 'left', id: 'c500' }));
  on(['proxy'], 'other', () => FD.full(s.proxy, HT.trip({ at: T0(s.proxy), nodes: [{ k: 'laptop', x: 0.1, y: 0.45, label: 'client', px: 0.5, py: 0.12 }, { k: 'gate', x: 0.5, y: 0.45, label: 'proxy', at: WT(s.proxy, 'proxy'), px: 0.5, py: 0.47 }, { k: 'server', x: 0.88, y: 0.45, label: 'your app', at: WT(s.proxy, 'your app'), px: 0.5, py: 0.82 }],
    legs: [{ a: 0, b: 1, at: WT(s.proxy, 'hits') }, { a: 1, b: 2, at: WT(s.proxy, 'passes') }] }), { id: 'proxy' }));
  on(['c502'], 'other', () => OTS(s.c502, HT.trip({ at: T0(s.c502), nodes: [{ k: 'gate', x: 0.2, y: 0.3, label: 'proxy', px: 0.25, py: 0.3 }, { k: 'server', x: 0.8, y: 0.3, label: 'your app', px: 0.75, py: 0.3 }],
    legs: [{ a: 0, b: 1, at: T0(s.c502) + 0.2 }, { a: 1, b: 0, at: WT(s.c502, 'invalid'), code: '?', ret: true }], fail: { node: 1, at: WT(s.c502, 'invalid') - 0.2 }, code: { c: '502', at: WT(s.c502, '502'), name: 'Bad Gateway' } }), { side: 'left', id: 'c502' }));
  on(['c504', 'slowq'], 'other', () => TILE({ from: s.c504, to: s.slowq }, HT.trip({ at: T0(s.c504), nodes: [{ k: 'gate', x: 0.15, y: 0.3, label: 'proxy', px: 0.25, py: 0.3 }, { k: 'server', x: 0.75, y: 0.3, label: 'your app', px: 0.75, py: 0.3 }],
    legs: [{ a: 0, b: 1, at: WT(s.c504, 'waited') - 0.4 }], wait: { node: 1, at: WT(s.c504, 'waited') + 0.3, until: WT(s.c504, 'too long') + 0.2 }, cross: { node: 0, at: WT(s.c504, 'too long') + 0.2 }, code: { c: '504', at: WT(s.c504, '504'), name: 'Gateway Timeout' } }), { id: 'c504' }));
  on(['c503', 'overload'], 'other', () => ROOM({ from: s.c503, to: s.overload }, FD.photo({ img: 'px_4801686', at: T0(s.c503), code: { c: '503', at: WT(s.c503, '503'), name: 'Service Unavailable' } }), { at: 'service', id: 'c503' }));

  /* ---------- 6:54 common mistakes ---------- */
  on(['mistakes'], 'other', () => card(s.mistakes, ['Common *mistakes*'], { times: [WT(s.mistakes, 'common'), WT(s.mistakes, 'mistakes')], start: WT(s.mistakes, 'common') - 0.15, id: 'mistakes' }));
  on(['m1'], 'other', () => FD.full(s.m1, FD.mistake({ n: 1, at: T0(s.m1), big: '200 OK', code: '200', bigAt: WT(s.m1, '200') }), { id: 'm1' }));
  on(['fails'], 'other', () => SPL(s.fails, FD.http({ ground: 'fd2', lines: [{ s: 'POST /books', at: WT(s.fails, 'fails') }, { s: 'HTTP/1.1 200 OK', at: WT(s.fails, 'returns'), hi: '200 OK' }, { s: '{ "error": "Something went wrong" }', at: WT(s.fails, 'error') }] }), { id: 'fails-200' }));
  on(['saved'], 'kw', () => KW(s.saved, '~book saved~', { word: 'saved', at: WT(s.saved, 'book'), id: 'book-saved', col: FD.c2 }));
  on(['saved', 'monitor'], 'talk', () => TH.talk({ from: s.saved, to: s.monitor }, { frame: 'mid', id: 'monitoring' }));
  on(['actual'], 'other', () => TILE(s.actual, FD.http({ ground: 'fd4', lines: [{ s: 'HTTP/1.1 422 Unprocessable Content', at: WT(s.actual, 'actual'), hi: '422 Unprocessable Content' }, { s: '{ "message": "The title field is required." }', at: WT(s.actual, 'details') }] }), { id: 'actual-code' }));
  on(['m2'], 'other', () => FD.full(s.m2, FD.mistake({ n: 2, from: 1, at: T0(s.m2), big: '500', code: '500', bigAt: WT(s.m2, '500') }), { id: 'm2' }));
  on(['find', 'crash'], 'other', () => HALF({ from: s.find, to: s.crash }, FD.http({ ground: 'fd5', code: { c: '500', at: WT(s.crash, '500') }, lines: [
    { s: 'GET /books/9999', at: WT(s.find, 'get') }, { s: '$book = Book::find(9999);', at: WT(s.find, 'find') }, { s: '$book → null', at: WT(s.crash, 'null'), dim: true },
    { s: '$book->title   // crash', at: WT(s.crash, 'title') }, { s: 'HTTP/1.1 500 Internal Server Error', at: WT(s.crash, '500'), hi: '500 Internal Server Error' }] }), { side: 'left', id: 'find-500' }));
  on(['right404'], 'other', () => OTS(s.right404, FD.http({ ground: 'fd4', code: { codes: [[T0(s.right404), '500'], [WT(s.right404, '404'), '404']] }, lines: [{ s: 'Book::findOrFail(9999);', at: T0(s.right404) + 0.1 }, { s: 'HTTP/1.1 404 Not Found', at: WT(s.right404, '404'), hi: '404 Not Found' }] }), { id: 'right-404' }));
  on(['wrong500', 'notbroken'], 'talk', () => TH.talk({ from: s.wrong500, to: s.notbroken }, { frame: 'mid', id: 'wrong-500' }));
  on(['notbroken'], 'kw', () => KW(s.notbroken, '~not broken~', { word: 'broken', at: WT(s.notbroken, 'not'), id: 'not-broken', col: FD.c5 }));
  on(['alarm'], 'other', () => SPL(s.alarm, FD.photo({ img: 'px_39183052', at: T0(s.alarm), code: { c: '500', at: WT(s.alarm, 'alarm') } }), { side: 'left', id: 'alarm' }));
  on(['m3'], 'other', () => FD.full(s.m3, FD.mistake({ n: 3, from: 2, at: T0(s.m3), big: '401 / 403', code: '401', bigAt: WT(s.m3, '401') }), { id: 'm3' }));
  on(['expired'], 'other', () => SPL(s.expired, FD.http({ ground: 'fd4', code: { codes: [[WT(s.expired, '403'), '403'], [WT(s.expired, 'login'), '401']] }, lines: [{ s: 'Authorization: Bearer (expired)', at: WT(s.expired, 'token') }, { s: 'HTTP/1.1 403  ✗', at: WT(s.expired, '403') + 0.1 }, { s: 'HTTP/1.1 401  → log in again', at: WT(s.expired, 'login'), hi: '401' }] }), { id: 'expired' }));
  on(['stuck'], 'talk', () => TH.talk(s.stuck, { frame: 'close', id: 'stuck' }));
  // CORRECTION (her slip at raw 8:11, "the first one"): the counter rolls to 4 on her word and the caption reads "The fourth one"
  on(['m4'], 'other', () => FD.full(s.m4, FD.mistake({ n: 4, from: 3, at: T0(s.m4), big: 'stack traces', code: '500', bigAt: WT(s.m4, 'stack') }), { id: 'm4-fix' }));
  on(['laravel'], 'other', () => SPL(s.laravel, FD.http({ kicker: 'APP_DEBUG=true', kickerAt: WT(s.laravel, 'app_debug'), ground: 'fd5', size: V(40, 36), lines: [
    { s: '{', at: WT(s.laravel, 'json') }, { s: '  "message": "Attempt to read property…",', at: WT(s.laravel, 'exception') }, { s: '  "file": "/var/www/app/Http/…/BookController.php",', at: WT(s.laravel, 'file path') },
    { s: '  "line": 27,', at: WT(s.laravel, 'line number') }, { s: '  "trace": [ … ]', at: WT(s.laravel, 'stack trace') }, { s: '}', at: WT(s.laravel, 'trace') + 0.3 }] }), { id: 'leak' }));
  on(['useful', 'folder'], 'talk', () => TH.talk({ from: s.useful, to: s.folder }, { frame: 'mid', id: 'useful' }));
  // (keyword 'your folder structure' dropped: it re-typed her sentence)
  // her line at raw 8:34: "APP_DEBUG should always be false" (the caption says false; the docs line is on screen)
  on(['false'], 'other', () => FD.full(s.false, FD.clip('laravel-false', { at: T0(s.false), hl: WT(s.false, 'always'), ground: 'fd5', title: [{ s: 'APP_DEBUG=false', at: WT(s.false, 'false'), size: V(110, 96) }] }), { id: 'debug-false' }));
  on(['users'], 'other', () => TILE(s.users, FD.http({ ground: 'fd5', lines: [{ s: 'HTTP/1.1 500 Internal Server Error', at: T0(s.users), hi: '500 Internal Server Error' }, { s: '{ "message": "Server Error" }', at: WT(s.users, 'users') }] }), { id: 'server-error' }));
  on(['last'], 'talk', () => TH.talk(s.last, { frame: 'mid', id: 'last' }));
  on(['teapot'], 'other', () => SPL({ from: s.teapot, to: s.bye }, FD.clip('rfc-teapot', { at: T0(s.teapot), hl: WT(s.teapot, '418') + 0.2, ground: 'fd4', code: { c: '418', at: WT(s.teapot, '418') } }), { side: 'left', id: 'teapot' }));
  if (short && /[BCHIJKM]/.test(FMT)) {   // B / C / J (and the full-bleed H I K M, so no default framing creeps in): no plain-framing gaps (the format holds from the first frame to the last)
    const sg = TH.segs.slice().sort((x, y) => x.t0 - y.t0); let t = 0;
    for (const x of sg) { if (x.t0 - t > 0.45) TH.talk([t, x.t0], { id: 'fmt-' + t.toFixed(1).replace('.', '_') }); t = Math.max(t, x.t1); }
    if (TOTAL - t > 0.45) TH.talk([t, TOTAL], { id: 'fmt-end' });
  }
  FD.flush(-6);
}

/* http-status-codes: the MOTION FILM (her whole narration, tightened: film/data/cutlist.json), pure motion graphics in her pick
 * B · THE FIRST DIGIT (scenes/fdkit.js). The diagrams are the talking-head plan's own (talking-head/moments/plan.js through
 * scenes/shim.js), full frame, landing on the same words. Between them her sentences are kinetic type: on the group colour of
 * the part she is in, on white, or (her best lines) on black phrase cards. Receipts (real pages) land on her words; the
 * "fourth one" slip gets the mistake counter, the APP_DEBUG line the Laravel docs. Every frame is a pure function of time. */
'use strict';
function buildFilm() {
  FD_PLAN('film');
  const segs = FILMSEG.slice().sort((a, b) => a.t0 - b.t0);
  // the group colour of each part of the video (by her words)
  const PART = [[0, 'fd2'], [P('http status codes are grouped into five classes', { from: 0, peek: true }).t - 0.2, 'fd1'], [P('the 2xx status codes mean success', { from: 0, peek: true }).t - 0.2, 'fd2'],
    [P('the 3xx http status codes are redirects', { from: 0, peek: true }).t - 0.2, 'fd3'], [P('now the 4xx status codes are client errors', { from: 0, peek: true }).t - 0.2, 'fd4'],
    [P('now the 5xx status codes are server errors', { from: 0, peek: true }).t - 0.2, 'fd5'], [P('and there are some common http status code mistakes', { from: 0, peek: true }).t - 0.2, 'fd4', '4xx'],
    [P('the first one common one is returning 200 ok', { from: 0, peek: true }).t - 0.2, 'fd2', '200'], [P('the second mistake that people make', { from: 0, peek: true }).t - 0.2, 'fd5', '500'],
    [P('the third mistake is mixing 401 and 403', { from: 0, peek: true }).t - 0.2, 'fd4', '401'], [P('the fourth one is leaking stack traces', { from: 0, peek: true }).t - 0.2, 'fd5', '500']];
  const partAt = (t) => { let g = PART[0][1]; for (const [a, k] of PART) if (t >= a) g = k; return g; };
  const codeAt = (t) => { let c = null; for (const [a, , cc] of PART) if (t >= a) c = cc || null; return c; };
  const R = () => ({ x: 0, y: 0, w: W, h: H });
  let last = null, nType = 0;
  const scene = (id, start, ground, draw, dur) => { if (last && start < last + 0.3) start = last + 0.3; last = start;
    addScene(start, ground, id, (t) => { const k = 1 + 0.05 * E.inOutCubic(clamp((t - start) / Math.max(1, dur || 5)));
      FD.T0 = start; withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, R())); FD.T0 = null; }, { id }); };
  const clean = (w) => w.replace(/[.,!]+$/, '').replace(/^"|"$/g, '');
  /** her words between t0 and t1 as kinetic type pages (<= 4 lines of <= 22 characters, each word on its own time) */
  const SECT = { fd1: '1xx', fd2: '2xx', fd3: '3xx', fd4: '4xx', fd5: '5xx' }; let lastCode = '200';
  /** her words between t0 and t1 as kinetic type: one card per sentence (a long one split at a comma), never under 3 words,
   *  on the part's group colour, with the part's code (the first digit) rolling in beside / above her words */
  const typeScenes = (t0, t1) => {
    const ws = WORDS.filter(w => w.t >= t0 - 0.05 && w.t < t1 - 0.05); if (!ws.length) return;
    const sents = []; let cur = []; ws.forEach((w) => { cur.push(w); if (/[.?!]$/.test(w.w)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    // a long sentence splits at a comma near its middle; short pieces (< 3 words or < 1.6 s) join their neighbour
    let pieces = []; sents.forEach((sn) => { if (sn.length > V(16, 12)) { let k = -1, best = 1e9; sn.forEach((w, i) => { if (/,$/.test(w.w) && i > 3 && i < sn.length - 3 && Math.abs(i - sn.length / 2) < best) { best = Math.abs(i - sn.length / 2); k = i; } });
        if (k < 0) k = Math.floor(sn.length / 2); pieces.push(sn.slice(0, k + 1), sn.slice(k + 1)); } else pieces.push(sn); });
    for (let i = 0; i < pieces.length; i++) { const p_ = pieces[i]; const dur = (pieces[i + 1] ? pieces[i + 1][0].t : t1) - p_[0].t;
      if ((p_.length < 3 || dur < 1.6) && pieces.length > 1) { if (pieces[i + 1]) { pieces[i + 1] = p_.concat(pieces[i + 1]); pieces.splice(i, 1); i--; } else { pieces[i - 1] = pieces[i - 1].concat(p_); pieces.splice(i, 1); } } }
    const maxC = V(18, 12);
    pieces.forEach((pc, k) => { const st = pc[0].t - 0.12; const nxt = pieces[k + 1] ? pieces[k + 1][0].t - 0.12 : t1; const n = nType++;
      const lines = []; let ln = []; pc.forEach((w) => { const s_ = clean(w.w); if (ln.length && ln.map(x => x.s).join(' ').length + s_.length + 1 > maxC) { lines.push(ln); ln = []; } ln.push({ s: s_, t: w.t }); }); if (ln.length) lines.push(ln);
      for (let i = 1; i < lines.length; i++) if (lines[i].length === 1) { lines[i - 1].push(lines[i][0]); lines.splice(i, 1); i--; }
      const ground = partAt(st); const code = codeAt(st) || SECT[ground] || '200'; const from = lastCode; lastCode = code;
      const type = FD.type({ ground, size: V(116, 104), lines: lines.map((l, j) => ({ s: l.map(x => x.s).join(' '), times: l.map(x => x.t), key: 'l' + j, w: 800,
          hi: l.map(x => x.s.toLowerCase()).filter(x => /^(\d{3}|[1-5]xx)$/.test(x)), hiCol: FD.white })) });
      const side = n % 2 === 0;   // alternate: the code on the right / the code above (never the same card twice in a row)
      scene('say-' + n, st, ground, (t, r) => { const gr = G[ground]; rect(r.x, r.y, r.w, r.h, gr.bg);
        const cr = PORTRAIT ? { x: r.x, y: r.y, w: r.w, h: r.h * 0.34 } : side ? { x: r.x + r.w * 0.62, y: r.y, w: r.w * 0.38, h: r.h } : { x: r.x, y: r.y, w: r.w, h: r.h * 0.36 };
        const tr = PORTRAIT ? { x: r.x, y: r.y + r.h * 0.3, w: r.w, h: r.h * 0.7 } : side ? { x: r.x, y: r.y, w: r.w * 0.64, h: r.h } : { x: r.x, y: r.y + r.h * 0.3, w: r.w, h: r.h * 0.7 };
        const cs = Math.min(cr.h * 0.7, cr.w * 0.84 / 1.75); const cells = FD.seqs([[0, from], [st + 0.05, code]]); const cx = PORTRAIT || !side ? cr.x + FD.m(r) : cr.x + (cr.w - tw('000', FN(cs))) / 2;
        grp('code', cx, cr.y + cr.h / 2 - cs * 0.4, tw('000', FN(cs)), cs * 0.86, () => withA(0.9, () => FD.odo(t, cells, cx, cr.y + cr.h / 2 + cs * 0.36 + (PORTRAIT || !side ? FD.m(r) * 0.4 : 0), cs, { xAlpha: 0.45 })), { label: 'the part (its first digit)' });
        type(t, tr); }, nxt - st);
      if (from !== code) FD.snd('ratchet', st + 0.07, -6);
    });
  };
  FD.CODE_RE = /^(\d{3}|[1-5]xx)$/i;
  // walk the timeline: graphic scenes from the plan, type in between
  let cursor = 0;
  const END = WORDS[WORDS.length - 1].e + 0.5;
  segs.forEach((sg, i) => {
    if (sg.t0 > cursor + 0.6) typeScenes(cursor, sg.t0);
    const t0 = Math.max(sg.t0, cursor);
    if (sg.kind === 'card') {
      const lines = sg.lines.map(l => ({ serif: /^~[^~]+~$/.test(l.trim()), s: l.replace(/[~*]/g, '') }));
      const times = sg.times || []; let k = 0; const L = lines.map(l => { const n = l.s.split(' ').length; const tt = times.slice(k, k + n); k += n; return { s: l.s, times: tt.length === n ? tt : undefined, at: tt[0] != null ? tt[0] : sg.t0 + 0.1, font: l.serif ? 'serif' : 'sans', col: l.serif ? FD.c4 : FD.white }; });
      scene(sg.id, t0, 'fdBlack', FD.type({ ground: 'fdBlack', align: 'center', size: V(140, 120), lines: L }), sg.t1 - t0);
    } else scene(sg.id, t0, partAt(t0), sg.draw, sg.t1 - t0);
    cursor = Math.max(cursor, sg.t1);
  });
  if (END > cursor + 0.6) typeScenes(cursor, END);
  // the end: the topic, @WithGbemi
  const tEnd = END; scene('end', tEnd, 'fd2', (t, r) => { rect(r.x, r.y, r.w, r.h, FD.g2); const m = V(110, 70);
    FD.odo(t, FD.seqs([[0, '418'], [tEnd + 0.1, '200']]), r.x + m, r.y + r.h * V(0.55, 0.45), V(340, 300));
    withA(fdE(t, tEnd + 0.6, 0.4), () => txt('@WithGbemi', r.x + m, r.y + r.h * V(0.55, 0.45) + V(140, 150), FN(V(96, 92)), FD.ink, 'left', 'alphabetic', 0, 'handle'));
    withA(fdE(t, tEnd + 0.8, 0.4), () => txt('HTTP STATUS CODES', r.x + m, r.y + V(120, 160), FM(V(34, 34)), FD.ink, 'left', 'alphabetic', 2, 'end-kicker')); }, 3);
  FD.snd('ratchet', tEnd + 0.55, -4);
  FD.flush(-6);
}

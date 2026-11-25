/* learn-to-code: the talking-head look = her pick 2026-11-02, B · YOU ARE THE REVIEWER (film/scenes/rvkit.js) + A's ladder for
 * the 4.5 % part. Grounds: cool grey #E9EBEE (sheets, pads), ink #1B1F24 (phrase cards, skill titles), white sheets.
 * ONE accent: amber #F2A900 = you, the human (notes, margin comments, the selection, one caption word, the approval stamp).
 * Her captions (C2): Onest 800 caps, white with an ink outline, the chunk's strongest word on an amber box (ink text).
 * Shorts top title (T3): an amber box with ink Onest; a short can use "labelStyle": "sheet" instead (a review sheet's ink tab:
 * mono file name + the title in Onest on white), so the shorts don't all look the same.
 * Both drawn by RV.post (wraps TH.post), editable like the house ones (click the caption / the title in the editor). */
'use strict';
Object.assign(TH.look, {
  disp: (s) => FO(s, 700), dispLS: -0.045, upper: false, font: 'disp', capFit: true, kwHideCap: true,
  fg: RV.wh, ink: RV.ink, acc: RV.amb, accOnDark: RV.amb,
  ground: 'rvGrey', cardGround: 'rvInk', panel: 'rvWhite', grid: false,
  outline: RV.wh, outlinePx: 8, ring: RV.wh, ringPx: 4, plate: 'rv', dim: 0.36, band: RV.g, rule: 'rgba(27,31,36,0.3)',
});

RV.WEAK = new Set(['a', 'an', 'the', 'of', 'to', 'and', 'or', 'but', 'in', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'is', 'are', 'was', 'be', 'that', 'this', 'my', 'your', 'their', 'our', 'its', 'if', 'so', 'not', 'i', 'we', 'you', 'they', 'it', "it's", "i'm", "you're", 'there', 'what', 'how', 'about', 'than', 'very', 'just', 'like', 'have', 'has', 'can', 'will', 'also', 'know', 'right', 'okay', 'yeah', 'really', 'going', 'some', 'all', 'do', 'me', 'when', 'where', 'then', 'which', 'would', 'want', 'get', 'because', "don't", 'one', 'say', 'think', 'even', 'maybe', 'now', 'these', 'them', 'him', 'her', 'been', 'being', 'much', 'way', 'things', 'thing', 'stuff', "i'll", 'had', 'were', 'who', 'why', 'out', 'up']);
RV.TOPIC = new Set('code coding debugging debug junior senior entry level software developer ai fundamentals design system webhook payment twice domain knowledge pharmacy reading read fix crash error signed email database worth promise role roles 4.5% 15% 2026 2027 trycatch try-catch human loop syntax medicine expires batch business valuable market'.split(' '));
/** the chunk's strongest word: a number, else a topic word, else its longest content word */
RV.ambWord = (ws) => { let best = -1, sc = -1; ws.forEach((w, i) => { const n = w.toLowerCase().replace(/[^a-z0-9'%.-]/g, '').replace(/[.]$/, ''); if (!n || RV.WEAK.has(n)) return;
  const s = (/\d/.test(n) ? 100 : 0) + (RV.TOPIC.has(n) ? 50 : 0) + n.length; if (s > sc) { sc = s; best = i; } }); return ws.length > 1 ? best : -1; };
RV.fixCaps = () => { if (RV.capsFixed || !TH.caps) return; RV.capsFixed = true; const cs = TH.caps;
  const nn = (s) => s.toLowerCase().replace(/[^a-z']/g, '');
  for (let i = 0; i < cs.length - 1; i++) { const a = cs[i], b = cs[i + 1]; if (b.t0 - a.ws[a.ws.length - 1].e > 0.6) continue;
    while (a.ws.length > 2 && RV.WEAK.has(nn(a.ws[a.ws.length - 1].s)) && !/[.!?]$/.test(a.ws[a.ws.length - 1].s)) b.ws.unshift(a.ws.pop());   // never across a sentence end (2026-11-07: "it The second skill")
    a.text = a.ws.map(x => x.s).join(' '); b.text = b.ws.map(x => x.s).join(' '); b.t0 = Math.max(a.t0 + 0.2, b.ws[0].t - 0.05); a.t1 = Math.min(b.t0, a.ws[a.ws.length - 1].e + 0.35); }
  // 2026-11-07: a caption never starts with the last word or two of the sentence before ("it The second skill…"): those words go back
  for (let i = 1; i < cs.length; i++) { const a = cs[i - 1], b = cs[i]; let k = b.ws.findIndex(x => /[.!?]$/.test(x.s)); if (k < 0) k = b.ws.findIndex((x, j) => j > 0 && /^[A-Z]/.test(x.s) && !/^I('|$)/.test(x.s)) - 1;   // captions carry no punctuation: a capital starts the next sentence
    if (k < 0 || k > 2 || k >= b.ws.length - 1 || b.ws[0].t - a.ws[a.ws.length - 1].e > 0.6) continue;
    a.ws.push(...b.ws.splice(0, k + 1)); a.text = a.ws.map(x => x.s).join(' '); b.text = b.ws.map(x => x.s).join(' ');
    b.t0 = Math.max(a.t0 + 0.2, b.ws[0].t - 0.05); a.t1 = Math.min(b.t0, a.ws[a.ws.length - 1].e + 0.35); }
};
/** keywords at chest height in the caption style (ink outline, ~word~ on amber); the caption steps aside while one is up */
RV.kws = [];
RV.kwDraw = (t) => { for (const k of RV.kws) { if (t < k.t0 || t >= k.t1) continue; const p = rvE(t, k.t0, 0.22); const z = V(104, 96); const f = FO(z, 700);
    const parts = k.text.split(/(~[^~]+~)/).filter(Boolean).map(s => ({ s: s.replace(/~/g, '').trim(), amb: /^~/.test(s) })).filter(x => x.s);
    const ov = ovr('kw-' + k.id); const segs = ov.s != null ? [{ s: ov.s, amb: false }] : parts;
    const sp = tw(' ', f); const tot = segs.reduce((a, s) => a + tw(s.s, f), 0) + sp * (segs.length - 1); const y = k.y; let x = CX - tot / 2;
    if (ov.hide) { regBox(ov, CX - tot / 2, y - z * 0.85, tot, z * 1.05, { text: segs.map(s => s.s).join(' '), def: k.text.replace(/~/g, '') }); continue; }
    moved(ov, () => { withA(p, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.miterLimit = 2; setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      for (const s of segs) { const ww = tw(s.s, f); const yy = y + (1 - p) * 20;
        ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = z * 0.22; ctx.shadowOffsetY = 2; ctx.fillStyle = s.amb ? RV.amb : RV.wh; ctx.fillText(s.s, x, yy); ctx.shadowColor = 'rgba(0,0,0,0)';
        x += ww + sp; }
      ctx.restore(); }); regBox(ov, CX - tot / 2, y - z * 0.85, tot, z * 1.05, { text: segs.map(s => s.s).join(' '), def: k.text.replace(/~/g, '') }); }); } };
RV.capDraw = (t) => { RV.fixCaps();
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const port = PORTRAIT; const key = port ? 'capShort' : 'cap16'; const ce = (EDIT.data[key] || {})[c.i]; const text = (ce != null ? ce : c.text).replace(/[.,!?]+$/g, '');
  const cst = EDIT.data[port ? 'captions9' : 'captions16'] || {}; let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : V(74, 84);
  const yBase = cst.y != null ? cst.y : port ? (FOOT.capYNow ? FOOT.capYNow + size * 0.3 + 50 : 1535 + size * 0.3) : 990;
  let f = FO(size, 500), ls = -size * 0.015; const words = text.split(/\s+/).filter(Boolean); const am = RV.ambWord(words);
  const cxC = !port && FOOT.capX ? FOOT.capX[0] : CX; const maxW = !port && FOOT.capX ? Math.min(W * 0.84, FOOT.capX[1]) : W * V(0.84, 0.86); let lines = [words];
  if (tw(text, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); if (wide > maxW) { const k = Math.max(0.66, maxW / wide); size = Math.round(size * k); f = FO(size, 500); ls = -size * 0.015; } }
  const lh = size * 1.12; const y0 = yBase - (lines.length - 1) * lh; let k0 = 0; let bx0 = 1e9, bx1 = -1e9;
  ctx.save(); ctx.lineJoin = 'round'; ctx.miterLimit = 2;
  // over a full-frame graphic (light sheets): a flat ink plate under the lines, so white type never sits on grey
  // 2026-11-07: decided by what is really under the caption (RV.capMode, moments/visuals.js): ink type on a light graphic, a solid
  // dark band when it is half over one, white + soft shadow on her footage
  const cm = RV.capMode ? (() => { const bw = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); return RV.capMode(cxC - bw / 2, y0 - size * 0.86, bw, (lines.length - 1) * lh + size * 1.02); })() : 'foot';
  const plate = cm === 'light';
  if (cm === 'mixed') { const bw = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); fillRR(cxC - bw / 2 - 18, y0 - size * 0.95, bw + 36, (lines.length - 1) * lh + size * 1.25, 14, '#111114'); }
  // over a light full-frame graphic: ink type, no plate, no shadow (set 03: no boxes around text)
  lines.forEach((ln, li) => { const s = ln.join(' '); const w = tw(s, f, ls); let x = clamp(cxC - w / 2, V(96, 60), W - V(96, 60) - w); bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + w); const y = y0 + li * lh; const sp = tw(' ', f, ls);
    ln.forEach((wd, j) => { const ww = tw(wd, f, ls); setFont(f, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (plate) { ctx.shadowColor = 'rgba(0,0,0,0)'; } else { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = size * 0.25; ctx.shadowOffsetY = 2; }
      ctx.fillStyle = plate ? (k0 + j === am ? '#9A6A00' : RV.ink) : (k0 + j === am ? RV.amb : RV.wh); ctx.fillText(wd, x, y); ctx.shadowColor = 'rgba(0,0,0,0)';
      x += ww + sp; });
    k0 += ln.length; });
  ctx.letterSpacing = '0px'; ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, y0 - size * 0.86, bx1 - bx0, (lines.length - 1) * lh + size * 1.02, { kind: 'caption', text: ce != null ? ce : c.text, def: c.text, cue: c.i, cap16: !port });
};
/** the shorts top title: T3 amber box (default) or "sheet" (an ink tab with a mono file name over a white box) */
RV.labelGeo = (str, style) => { const z = 66; const f = FO(z, 700); const padY = 10; let lines = [str];
  if (tw(str, f, -z * 0.045) > W - 160) { const ws = str.split(' '); let bi = 1, bm = 1e9; for (let k = 1; k < ws.length; k++) { const mm = Math.max(tw(ws.slice(0, k).join(' '), f, -z * 0.045), tw(ws.slice(k).join(' '), f, -z * 0.045)); if (mm < bm) { bm = mm; bi = k; } } lines = [ws.slice(0, bi).join(' '), ws.slice(bi).join(' ')]; }
  const bw = Math.max(...lines.map(l => tw(l, f, -z * 0.045))); const tab = style === 'sheet' ? 52 : 0; const bh = lines.length * z * 1.04 + padY * 2 + tab; return { z, f, lines, bw, bh, tab }; };
/** the shorts top title (T3, set 03): Helvetica Neue Bold 66, ink, sentence case, on the grey band, no box; "sheet" style adds the
 *  review sheet's file name in DM Mono above it (the look's idea, no border). Editable: text, size, place. */
RV.labelDraw = () => {
  const m = FOOT.m; if (!m.label) return; SCENE_ID = 'label'; EL.seen.clear(); const style = m.labelStyle || 'amber';
  const ov = ovr('label'); const str = (ov.s != null ? ov.s : m.label); const info = { text: str, def: m.label, kind: 'box', sk: ov.k, label: 'top title (text, size, place)' };
  const top = 120; const { z, f, lines, bw, bh, tab } = RV.labelGeo(str, style);
  if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, bh, info); return; }
  moved(ov, () => {
    if (tab) _txt((m.labelFile || 'review.md').toUpperCase(), CX, top + 34, FM(32, 500), RV.dim, 'center', 'alphabetic', 4);
    else rect(CX - 40, top + 4, 80, 6, RV.amb);   // a short amber rule (you), not a box
    lines.forEach((l, i) => _txt(l, CX, top + tab + 22 + z * 0.84 + i * z * 1.04, f, RV.ink, 'center', 'alphabetic', -z * 0.045));
    regBox(ov, CX - bw / 2, top, bw, bh, info); }, [CX, top]);
};
(function rvPost() {
  const post0 = TH.post, lb0 = TH.labelBottom;
  RV.labelBottomCalc = () => { const m = FOOT.m; const e = (EDIT.data.t || {})['label/label']; const str = e && e.s != null ? e.s : m.label; const k = (e && e.pos && e.pos[LAYOUT] && e.pos[LAYOUT].k) || 1;
    return 120 + (RV.labelGeo(str, m.labelStyle || 'amber').bh + 22) * k; };
  TH.labelBottom = () => (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.label ? RV.labelBottomCalc() : lb0());
  TH.post = (t) => {
    if (FOOT.m.kind === 'teaser') return post0(t);   // the teaser keeps the playbook's caption style
    const isShort = FOOT.m.kind === 'short', end = isShort && t >= FOOT.dur; const lab = FOOT.m.label, sc = SHOW.captions;
    FOOT.m.label = ''; SHOW.captions = false;
    try { post0(t); } finally { FOOT.m.label = lab; SHOW.captions = sc; }
    if (end || (FOOT.outro && t >= FOOT.dur)) return;
    ctx.save(); ctx.setTransform(...BASE); g = G.ink;
    SCENE_ID = 'keywords'; EL.seen.clear(); RV.kwDraw(t);
    if (sc) RV.capDraw(t);
    if (isShort) RV.labelDraw();
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();

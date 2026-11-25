/* doomscrolling: the talking-head look = A · OFFLINE BINGO (film/scenes/bingo.js, loaded first). Butter #F7D44C, card #FFFDF5,
 * ink #161616, dauber #FF6A1A (= done). The bingo card is the 1-9 counter: in the full edit a mini card sits top right while
 * she talks (the current square ringed, the done ones daubed); every "Number N" opens the big card and daubs square N.
 * Type set 06 Ultra condensed (League Gothic caps + Inter Tight + DM Mono), no boxes or outlines around text (TYPE-SYSTEM.md).
 * Her 16:9 captions stay hers (footage.js). Shorts: per-short top-title + caption style (moment "bgStyle": {lab, cap}).
 * Every text editable (BG.ml / BG.text / txt with ovr keys), every block movable (grp). */
'use strict';
{ const r0 = TH.ready; TH.ready = async () => { await BGF; await document.fonts.load('400 40px "League Gothic"'); await document.fonts.load('600 40px "Inter Tight"'); await document.fonts.load('500 40px "DM Mono"'); return r0(); }; }
Object.assign(TH.look, {
  disp: (s) => `400 ${s}px "League Gothic"`, dispLS: 0, upper: true, font: 'disp', capFit: true, kwHideCap: true,
  fg: BG.card, ink: BG.ink, acc: BG.butter, accOnDark: BG.butter,
  ground: 'bgButter', cardGround: 'bgInk', panel: 'bgCard', grid: false,
  outline: BG.card, outlinePx: 10, ring: BG.ink, ringPx: 6, plate: 'bg', dim: 0.3,
  band: BG.butter, rule: 'rgba(22,22,22,0.5)',
});

/** a full-frame graphic insert (her voice and captions go on). Shorts: becomes the top panel with her below (plan.js). */
const BGX = { n: 0 };
BG.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++BGX.n); const enter = o.enter == null ? 0.25 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'bgButter', o,
    draw: (t) => { const p = enter ? E.outCubic(prog(t, t0, enter)) : 1; if (!PORTRAIT) FOOT.capX = [W / 2, W * 0.84];
      const cr = o.capRoom == null ? V(190, 0) : o.capRoom;
      withT((1 - p) * W * 0.1, 0, 1, 0, () => draw(t, { x: 0, y: 0, w: W, h: H - cr }));
      if (cr && !PORTRAIT) rect(0, H - cr, W, cr, BG.butter);
      if (p < 1) withA(1 - p, () => rect(0, 0, W, H, BG.butter)); } });
  BG.sfx('card', t0 + 0.04, -5);
  return { t0, t1, id };
};
/** a black phrase card (the kit's cards): ink ground, one butter accent; no riser */
BG.cardInk = (s, lines, o = {}) => TH.card(s, lines, { ground: 'bgInk', riser: false, size: V(250, 230), ...o });

/* the corner counter (full edit, both sizes): a mini card while she talks; it steps aside under any graphic */
BG.miniOn = (FOOT.m && FOOT.m.kind === 'full');
if (BG.miniOn) TH.over.push((t) => {
  if (t >= FOOT.dur || BG.AT[1] == null || t < (BG.miniFrom || BG.AT[1] + 3)) return;
  const busy = (TH.segs || []).some(s => s.kind !== 'talk' && s.kind !== 'keyword' && t >= s.t0 - 0.2 && t < s.t1 + 0.3);
  const bs = (TH.segs || []).filter(s => s.kind !== 'talk' && s.kind !== 'keyword'); let a = 1;
  for (const s of bs) { if (t >= s.t0 - 0.2 && t < s.t1 + 0.3) { a = 0; break; } const d = Math.min(Math.abs(t - (s.t0 - 0.2)), Math.abs(t - (s.t1 + 0.3))); a = Math.min(a, clamp(d / 0.25)); }
  if (busy) return; SCENE_ID = 'counter'; EL.seen.clear(); const sz = V(360, 260); BG.mini(t, W - sz - V(48, 40), V(44, Math.max(130, (TH.labelBottom() || 0) + 20)), sz, a);
});

/* ======================= shorts: per-short top-title + caption style (moment "bgStyle": {lab, cap}) ======================= */
BG.KEY = new Set(['doomscrolling', 'scrolling', 'stop', 'bored', 'boredom', 'reading', 'book', 'eat', 'easy', 'effort', 'friends', 'talk', 'awkward', 'bike', 'thrift', 'bag', 'bags', 'diamond', 'hunter',
  'money', 'monetize', 'curiosity', 'long-form', 'background', 'prayer', 'pray', 'journal', 'journaling', 'mom', 'call', 'genuine', 'connection', 'never', 'cues', 'kettle', 'enjoy', 'boom', 'baking', 'physical', 'push-ups']);
BG.style = (FOOT.m && FOOT.m.kind === 'short' && !FOOT.m.fmt && FOOT.m.bgStyle) || null;   // 2026-11-10: a short with a format ("fmt", moments/formats.js) draws its own title + captions
if (BG.style) {
  const SH = TH.shortStyle;
  BG.labText = FOOT.m.label; FOOT.m.label = '';   // the built-in label steps aside: this look draws its own (same edit id)
  // top titles on the butter band above her window: no boxes. inv = League Gothic caps; butter = DM Mono kicker + League Gothic;
  // stack = Inter Tight 700 sentence case; mono = DM Mono kicker ("1 of 9") + League Gothic
  const LST = { inv: { size: 112, lh: 0.88, f: 'disp' }, butter: { size: 104, lh: 0.88, f: 'disp' }, stack: { size: 66, lh: 1.08, f: 'body' }, mono: { size: 104, lh: 0.88, f: 'disp' } };
  const ls = LST[BG.style.lab] || LST.inv; const top = 120; const LX = 60;
  const e_ = () => EDIT.data.t['label/label']; const pos = () => { const e = e_(); return e && e.pos && e.pos[LAYOUT]; };
  const labK = () => (pos() && pos().k) || 1, labDy = () => (pos() && pos().dy) || 0, labHidden = () => !!(e_() && e_().hide) || !!(pos() && pos().hide);
  const fontOf = (z) => ls.f === 'body' ? F.body(z, 700) : F.disp(z);
  const kick = () => BG.style.kicker || (BG.style.lab === 'butter' ? 'Instead of scrolling' : '');
  const caseOf = (str) => ls.f === 'disp' ? str.toUpperCase() : str;
  const labLines = (str) => { str = caseOf(str); const maxW = W - 2 * LX; const f = fontOf(ls.size); if (str.includes('\n')) return str.split('\n');
    const out = []; let cur = ''; for (const w of str.split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
  const kH = () => (kick() && (BG.style.lab === 'mono' || BG.style.lab === 'butter') ? 58 : 0);
  const labH = () => kH() + labLines(labStr()).length * ls.size * ls.lh + 8;
  const labStr = () => { const e = e_(); return e && e.s != null ? e.s : BG.labText; };
  TH.labelBottom = () => (!PORTRAIT || labHidden() ? 0 : top + labDy() + labK() * labH() + 10);
  function drawLab(t) {
    if (!PORTRAIT) return; SCENE_ID = 'label'; EL.seen.clear(); const ov = ovr('label'); const str = ov.s != null ? ov.s : BG.labText;
    const lines = labLines(str); const z = ls.size; const H_ = labH(); const info = { text: str, def: BG.labText, kind: 'box', sk: ov.k, label: 'top label (text, size, place)' };
    if (ov.hide) { regBox(ov, LX, top, W - 2 * LX, H_, info); return; }
    moved(ov, () => { let y = top;
      if (kH()) { _txt(kick().toUpperCase(), LX, y + 38, F.mono(38), BG.ink, 'left', 'alphabetic', 38 * 0.12); y += kH(); }
      lines.forEach((l) => { _txt(l, LX, y + z * (ls.f === 'disp' ? 0.82 : 0.86), fontOf(z), BG.ink, 'left', 'alphabetic', ls.f === 'disp' ? 0 : -0.015 * z); y += z * ls.lh; });
      regBox(ov, LX, top, W - 2 * LX, H_, info); }, [CX, top]);
  }
  if (BG.style.cap !== 'helv') TH.capOff.push([0, 1e9]);
  const capKw = (t) => (TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1);
  const keyOf_ = (w) => w.toLowerCase().replace(/[^a-z0-9'-]/g, '');
  const soft = (fn) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 3; fn(); ctx.restore(); };
  // her captions: solid fill, a soft shadow for contrast, no outline, no box. c1 = League Gothic caps (key word butter);
  // box = Inter Tight 600 sentence case (key word butter); card = Inter Tight 500 lower case, cream
  function drawCap(t) {
    if (!PORTRAIT || BG.style.cap === 'helv' || t >= FOOT.dur || !SHOW.captions) return; if (capKw(t)) return;
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    const cst = EDIT.data.captions9 || {}; const kz = cst.size ? clamp(cst.size / SH.cap.size, 0.6, 1.5) : 1; const dy = cst.y != null ? cst.y - SH.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text; const st = BG.style.cap;
    const yC = (FOOT.capYNow || SH.cap.y) + dy; const ws0 = text.split(/\s+/).filter(Boolean); const key = ws0.findIndex(w => BG.KEY.has(keyOf_(w)));
    const disp = st === 'c1'; const z = (disp ? 104 : st === 'box' ? 66 : 60) * kz; const f = disp ? F.disp(z) : F.body(z, st === 'box' ? 600 : 500);
    const ws = disp ? ws0.map(w => w.toUpperCase()) : st === 'card' ? ws0.map(w => w === 'I' || /^I'/.test(w) ? w : w.toLowerCase()) : ws0; const maxW = W - 140;
    const lines = []; let cur = []; ws.forEach((w, i) => { const nx = [...cur, [w, i]]; if (cur.length && tw(nx.map(q => q[0]).join(' '), f) > maxW) { lines.push(cur); cur = [[w, i]]; } else cur = nx; }); if (cur.length) lines.push(cur);
    const lh = z * (disp ? 0.9 : 1.14); const y0 = yC - (lines.length - 1) * lh / 2 + z * 0.32; let bw = 0;
    // over a light graphic (butter / card panel) the caption turns ink, no shadow; over her footage it stays white with a soft shadow
    const bw0 = Math.max(...lines.map(ln => tw(ln.map(q => q[0]).join(' '), f))); let light = 0, nS = 0;
    try { for (let k = 0; k < 9; k++) { const px = (CX - bw0 / 2 + bw0 * k / 8) * BASE[0] + BASE[4], py = (y0 - z * 0.3) * BASE[3] + BASE[5];
      const d = ctx.getImageData(Math.round(px), Math.round(py), 1, 1).data; nS++; if (d[3] > 200 && (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) > 150) light++; } } catch (e) { }
    const onLight = nS && light / nS > 0.5;
    const draw = () => lines.forEach((ln, li) => { const s = ln.map(q => q[0]).join(' '); const lw = tw(s, f); bw = Math.max(bw, lw); let x = CX - lw / 2;
      ln.forEach(([w, i]) => { const col = onLight ? BG.ink : (i === key && st !== 'card' ? BG.butter : (st === 'card' ? BG.card : '#FFFFFF')); _txt(w, x, y0 + li * lh, f, col, 'left'); x += tw(w + ' ', f); }); });
    if (onLight) draw(); else soft(draw);
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2 - 14, y0 - z * 0.9, bw + 28, (lines.length - 1) * lh + z * 1.2, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  TH.over.push((t) => { if (t >= FOOT.dur) return; drawCap(t); drawLab(t); });
}

/* 16:9 full edit: her captions in Inter Tight 600 (set 06 body), cream with a soft shadow (no box, no stroke), placed where the
 * runtime places them; over a light graphic (butter / card) they turn ink. Her fixes ("cap16") and the size / height sliders apply.
 * (Same approach as the edge-case project; the runtime's own 16:9 captions are Helvetica Neue Light.) */
if (!PORTRAIT) drawCaptions16 = function (t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const st = capSliderInfo(); const kz = (EDIT.data.captions16 && EDIT.data.captions16.size) ? clamp(EDIT.data.captions16.size / CAP16.size, 0.5, 1.6) : 1;
  const yc = EDIT.data.captions16 && EDIT.data.captions16.y != null ? clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]) : 965; let z = 58 * kz;
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = (ce != null ? ce : c.text).replace(/\n/g, ' ');
  const cam = camAt(t); let cx = CX, maxW = W * 0.66;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(W * 0.7, FOOT.capX[1]); }
  else if (cam.boxed) { const b = cam.box; if (b[2] < W * 0.4 || b[3] < H * 0.5) { if (!opt.onFilm) return; } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.86); } }
  let f = F.body(z, 600); while (z > 34 && tw(text, f) > maxW * 2) { z -= 2; f = F.body(z, 600); }
  const ws = text.split(/\s+/); const L = []; let cur = ''; for (const w of ws) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { L.push(cur); cur = w; } else cur = nx; } if (cur) L.push(cur);
  const lh = z * 1.2; const y0 = yc - (L.length - 1) * lh / 2 + z * 0.35; const bw = Math.max(...L.map(l => tw(l, f)));
  let light = 0, n = 0; try { for (let k = 0; k < 9; k++) { const px = (cx - bw / 2 + bw * k / 8) * BASE[0] + BASE[4], py = (y0 - z * 0.3) * BASE[3] + BASE[5];
    const d = ctx.getImageData(Math.round(px), Math.round(py), 1, 1).data; n++; if (d[3] > 200 && (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) > 150) light++; } } catch (e) { }
  const onLight = n && light / n > 0.5;
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
  L.forEach((l, i) => { if (onLight) _txt(l, cx, y0 + i * lh, f, BG.ink, 'center'); else { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 2; _txt(l, cx, y0 + i * lh, f, '#FFF8E8', 'center'); ctx.restore(); } });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, cx - bw / 2 - 10, y0 - z, bw + 20, (L.length - 1) * lh + z * 1.4, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true });
};

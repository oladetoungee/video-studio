/* edge cases: the talking-head look = B · THE FIELD (her pick 2026-11-02), re-typed 2026-11-07 to type set 05 Warm serif + mono
 * (inspiration/know-how/TYPE-SYSTEM.md): DM Serif Display 400 headlines, DM Mono 500 body / captions / labels. Flat lime #D4F04A,
 * ink #0C0C0C, white fields with hairline edges only (no thick borders, no outlined captions, no boxes around text, no sticker
 * borders on her cut-out), ONE accent red #FF3B1F. Loaded after film/assets/src/clips.js and film/scenes/ef.js (EF: graphics).
 * Every text editable (EF.text / txt with keys), every block movable (grp). Captions: 16:9 full edit in DM Mono (drawCaptions16
 * below; her fixes "cap16" and sliders apply); shorts per "efStyle" {lab, cap} (label = "label/label", captions = "caption/<n>"). */
'use strict';
{ const r0 = TH.ready; TH.ready = async () => { await EFF; await document.fonts.load('400 40px "DM Serif Display"'); await document.fonts.load('500 40px "DM Mono"'); return r0(); }; }
Object.assign(TH.look, {
  disp: (s) => `400 ${s}px "DM Serif Display"`, dispLS: -0.02, upper: false, font: 'disp', capFit: true, kwHideCap: true,
  fg: EF.white, ink: EF.ink, acc: EF.red, accOnDark: EF.lime,
  ground: 'lime', cardGround: 'efInk', panel: 'efWhite', grid: false,
  outline: EF.lime, outlinePx: 0, ring: EF.ink, ringPx: 2, plate: 'ef', dim: 0.3, edgePx: 1,
  band: EF.ink, rule: 'rgba(12,12,12,0.5)',
});
/** is the canvas under these layout points a light, opaque graphic (lime / white)? (then captions go ink, no shadow) */
EF.lightUnder = (pts) => { let light = 0, n = 0; try { for (const [x, y] of pts) { const d = ctx.getImageData(Math.round(x * BASE[0] + BASE[4]), Math.round(y * BASE[3] + BASE[5]), 1, 1).data; n++;
  if (d[3] > 200 && (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) > 150) light++; } } catch (e) { } return n > 0 && light / n > 0.5; };
/** shorts: a graphic that reaches the top of the frame starts below the top label (an ink band behind the label) */
EF.rr = (r) => {
  if (!EF.short()) return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const d = clamp(lb + 30 - r.y, 0, r.h * 0.4); return d > 0 ? { x: r.x, y: r.y + d, w: r.w, h: r.h - d } : r;
};
/** caption text with a soft shadow only (no stroke, no box) */
EF.capTxt = (s, x, y, f, col, al = 'center') => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 2; _txt(s, x, y, f, col, al); ctx.restore(); };
/* 16:9 full edit: her captions in DM Mono, cream, soft shadow, placed where the runtime places them (her fixes + sliders apply) */
if (!PORTRAIT) drawCaptions16 = function (t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const st = capSliderInfo(); const kz = (EDIT.data.captions16 && EDIT.data.captions16.size) ? clamp(EDIT.data.captions16.size / CAP16.size, 0.5, 1.6) : 1;
  const yc = EDIT.data.captions16 && EDIT.data.captions16.y != null ? clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]) : 960; let z = 54 * kz;
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = (ce != null ? ce : c.text).replace(/\n/g, ' ');
  const cam = camAt(t); let cx = CX, maxW = W * 0.66;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(W * 0.7, FOOT.capX[1]); }
  else if (cam.boxed) { const b = cam.box; if (b[2] < W * 0.4 || b[3] < H * 0.5) { if (!opt.onFilm) return; } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.86); } }
  let f = F.body(z); while (z > 34 && tw(text, f) > maxW * 2) { z -= 2; f = F.body(z); }
  const ws = text.split(/\s+/); const L = []; let cur = ''; for (const w of ws) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { L.push(cur); cur = w; } else cur = nx; } if (cur) L.push(cur);
  const lh = z * 1.22; const y0 = yc - (L.length - 1) * lh / 2 + z * 0.35; const bw = Math.max(...L.map(l => tw(l, f)));
  // over a light graphic (lime / white panel drawn under the caption) the caption turns ink with no shadow; over her footage it stays cream
  const onLight = EF.lightUnder(Array.from({ length: 9 }, (_, k) => [cx - bw / 2 + bw * k / 8, y0 - z * 0.3]));
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none'; L.forEach((l, i) => onLight ? _txt(l, cx, y0 + i * lh, f, EF.ink, 'center') : EF.capTxt(l, cx, y0 + i * lh, f, '#F4F1E6')); ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, cx - bw / 2 - 10, y0 - z, bw + 20, (L.length - 1) * lh + z * 1.4, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true });
};
const EFX = { n: 0 };
/** a full-frame graphic insert (no film needed): her voice and captions go on (16:9: a lime band at the foot for them) */
EF.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++EFX.n); const enter = o.enter == null ? 0.3 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'lime', o,
    draw: (t) => { const p = enter ? E.inOutQuart(prog(t, t0, enter)) : 1; if (!PORTRAIT) FOOT.capX = [W / 2, W * 0.84];
      const capH = o.capRoom == null ? V(190, 0) : o.capRoom;
      const R = PORTRAIT ? { x: 0, y: o.portY || 330, w: W, h: o.portH || 1150 } : { x: 0, y: 0, w: W, h: H - capH };
      efClip(0, 0, W, H, () => withT((1 - p) * W, 0, 1, 0, () => { rect(0, 0, W, H, o.dark ? EF.night : EF.lime); rect(0, 0, 2, H, EF.ink); draw(t, R); }));  } });
  EF.sfx(o.sound || 'swipe', t0 + 0.05, o.db != null ? o.db : -5);
  return { t0, t1, id };
};
/** a black phrase card (the kit's cards): pure ink, her words, one word in lime; hard cut in and out */
EF.card = (s, lines, o = {}) => TH.card(s, lines, { ground: 'efInk', riser: false, ...o });

/* ======================= shorts: per-short top title + caption style (moment "efStyle": {lab, cap}), set 05, no boxes, no strokes =======================
 * lab: 'serif' (her label in DM Serif Display on the ink band) | 'mix' (serif line + a DM Mono line in lime, split at ": ")
 * cap: 'mono' (DM Mono, key word in lime) | 'serif' (DM Serif Display, key word in lime) | 'karaoke' (DM Mono, words turn lime as she says them) | 'word' (one word at a time, serif) */
EF.KEY = new Set(['edge', 'case', 'cases', 'null', 'twice', 'two', 'duplicate', 'race', 'condition', 'starbucks', '$20', '$15', "o'brien", 'apostrophe', 'sql', 'injection', 'jennifer', 'surname', 'empty', 'blank',
  'plate', '$12,000', 'tickets', 'fines', 'leap', 'february', '2012', '2013', 'exist', 'azure', 'microsoft', 'clock', 'clocks', '3:30', 'never', 'happened', 'unicode', 'bytes', 'letters', '13', 'seven',
  'names', "hyrum's", 'law', 'promised', 'promise', 'broken', 'idempotency', 'key', 'retry', 'tabs', 'double-click', 'sold', 'stock', 'zero', 'orders', 'charge', 'users']);
EF.style = (FOOT.m && FOOT.m.kind === 'short' && !FOOT.m.fmt && FOOT.m.efStyle) ||   // 2026-11-10: a short with a format ("fmt", moments/formats.js) draws its own title + captions
  (FOOT.m && FOOT.m.kind === 'teaser' ? { lab: 'none', cap: 'mono' } : null);
if (EF.style) {
  const SH = TH.shortStyle; const LAB = { box: 'serif', ink: 'serif', field: 'serif', plain: 'serif', serif: 'serif', mix: 'mix' }[EF.style.lab] || 'serif';
  const CAP = { caps: 'serif', outline: 'serif', helv: 'mono', mono: 'mono', karaoke: 'karaoke', word: 'word', serif: 'serif' }[EF.style.cap] || 'mono';
  EF.labText = FOOT.m.label; FOOT.m.label = '';   // the built-in label steps aside: this look draws its own (same edit id)
  const top = 130, LX = 60, z = 72;
  const ed = () => EDIT.data.t['label/label'] || null; const pos = () => { const e = ed(); return (e && e.pos && e.pos[LAYOUT]) || {}; };
  const labHidden = () => { const e = ed(); return !!(e && e.hide) || !!pos().hide; };
  const wrap = (s, f, maxW) => { const L = []; let cur = ''; for (const w of s.split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { L.push(cur); cur = w; } else cur = nx; } if (cur) L.push(cur); return L; };
  const labLines = (str) => { if (str.includes('\n')) return str.split('\n').map((l, i) => [l, i > 0 && LAB === 'mix']);
    if (LAB === 'mix' && str.includes(': ')) { const i = str.indexOf(': '); return [...wrap(str.slice(0, i), F.disp(z), W - 2 * LX).map(l => [l, false]), [str.slice(i + 2), true]]; }
    return wrap(str, F.disp(z), W - 2 * LX).map(l => [l, false]); };
  const lineH = (m) => (m ? z * 0.62 : z) * 1.1;
  const labH = () => labLines((ed() && ed().s != null) ? ed().s : EF.labText).reduce((a, [, m]) => a + lineH(m), 0);
  TH.labelBottom = () => (!PORTRAIT || labHidden() || EF.style.lab === 'none' ? 0 : top + (pos().dy || 0) + (pos().k || 1) * labH() + 24);
  function drawLab(t) {
    if (!PORTRAIT || EF.style.lab === 'none') return; SCENE_ID = 'label'; EL.seen.clear(); const ov = ovr('label'); const str = ov.s != null ? ov.s : EF.labText;
    const L = labLines(str); const H_ = labH(); const info = { text: str, def: EF.labText, kind: 'box', sk: ov.k, label: 'top label (text, size, place)' };
    if (ov.hide) { regBox(ov, LX, top, W - 2 * LX, H_, info); return; }
    rect(0, 0, W, TH.labelBottom(), EF.ink);   // the label always sits on the ink band (never white on lime)
    moved(ov, () => { let y = top; L.forEach(([l, m]) => { const zz = m ? z * 0.62 : z; y += zz * 0.9;
        if (m) _txt(l.toUpperCase(), LX, y, F.mono(zz), EF.lime, 'left', 'alphabetic', zz * 0.08); else _txt(l, LX, y, F.disp(zz), EF.white, 'left', 'alphabetic', -0.02 * zz); y += zz * 0.2; });
      regBox(ov, LX, top, W - 2 * LX, H_, info); }, [CX, top]);
  }
  if (PORTRAIT) TH.capOff.push([0, 1e9]);
  const capKw = (t) => (TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1);
  const isKey = (w) => EF.KEY.has(w.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9%$,:'-]/g, '').replace(/,$/, ''));
  function drawCap(t) {
    if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions) return; if (capKw(t)) return;
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    const cst = EDIT.data.captions9 || {}; const kz = cst.size ? clamp(cst.size / SH.cap.size, 0.6, 1.5) : 1; const dy = cst.y != null ? cst.y - SH.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text; const yC = (FOOT.capYNow || SH.cap.y) + dy;
    let ws = text.split(/\s+/).filter(Boolean).map((w, i) => [w, i]);
    if (CAP === 'word') { const ti = c.ws.filter(w => w.t <= t + 0.02).length - 1; ws = [ws[clamp(ti, 0, ws.length - 1)]]; }
    const zc = (CAP === 'word' ? 104 : CAP === 'serif' ? 72 : 58) * kz; const f = CAP === 'word' || CAP === 'serif' ? F.disp(zc) : F.body(zc); const sp = tw(' ', f);
    const L = []; let cur = []; for (const q of ws) { const nx = [...cur, q]; if (cur.length && tw(nx.map(x => x[0]).join(' '), f) > W - 140) { L.push(cur); cur = [q]; } else cur = nx; } if (cur.length) L.push(cur);
    const lh = zc * 1.16; const y0 = yC - (L.length - 1) * lh / 2 + zc * 0.32; let bw = 0; const key = CAP === 'karaoke' ? -1 : ws.findIndex(([w]) => isKey(w));
    const bw0 = Math.max(...L.map(ln => tw(ln.map(q => q[0]).join(' '), f))); const onLight = EF.lightUnder(Array.from({ length: 9 }, (_, k) => [CX - bw0 / 2 + bw0 * k / 8, y0 - zc * 0.3]));
    L.forEach((ln, li) => { const lw = tw(ln.map(q => q[0]).join(' '), f); bw = Math.max(bw, lw); let x = CX - lw / 2;
      ln.forEach(([w, i]) => { const said = CAP === 'karaoke' && c.ws[i] && t >= c.ws[i].t - 0.02; const hot = (CAP === 'karaoke' ? said : (CAP === 'word' ? isKey(w) : ws[key] && ws[key][1] === i));
        if (onLight) _txt(w, x, y0 + li * lh, f, hot ? EF.red : EF.ink, 'left'); else EF.capTxt(w, x, y0 + li * lh, f, hot ? EF.lime : EF.white, 'left'); x += tw(w, f) + sp; }); });
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2 - 14, y0 - zc, bw + 28, (L.length - 1) * lh + zc * 1.35, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  TH.over.push((t) => { if (t >= FOOT.dur) return; drawCap(t); drawLab(t); });
}

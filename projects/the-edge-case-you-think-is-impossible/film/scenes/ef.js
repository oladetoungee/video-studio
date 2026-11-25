/* the-edge-case-you-think-is-impossible: the look B · THE FIELD (her pick 2026-11-02), shared by the motion film (film.json
 * scripts) and the talking-head edit, shorts and teaser (talking-head.json "common", before moments/common.js).
 * Every edge case in her video is something a person types or clicks (O'Brien, Null, Adébáyọ̀, 29 February, a double
 * click on "Place order"), so the graphics are giant form fields and one giant button on flat lime.
 * Lime #D4F04A, ink #0C0C0C, white fields with 6 px ink outlines, square corners; ONE accent: validation red #FF3B1F.
 * Type set 05 (2026-11-07): DM Serif Display 400 (what is typed, headlines), DM Mono 500 (body, labels, code, credits).
 * The caret is a still bar (never blinking). Motion: fields type on at 12-16 letters/s, the button squashes 6 % for 0.16 s,
 * rows land in 0.3 s outQuint, a second tab slides over in 0.5 s inOutQuart. Sounds: keys, clicks, pop, error buzz, marker.
 * Every text editable (EF.text / txt with keys), every block movable (grp). Each EF.x(o) returns draw(t, r) (r = the rect
 * it fills): a talking-head layout's o.draw, or a film scene's body. Pure functions of time (no timers, no Math.random). */
'use strict';
const EF = { lime: '#D4F04A', ink: '#0C0C0C', white: '#FFFFFF', red: '#FF3B1F', mid: '#4D5A1A', pale: '#E9F7A6', grey: '#8A8A8A', paleRed: '#FFB3A6',
  line: 'rgba(12,12,12,0.18)', lineW: 'rgba(255,255,255,0.2)' };
const EFF = (() => { const add = (fam, file, d) => { const f = new FontFace(fam, `url(/library/fonts/${file})`, d || {}); document.fonts.add(f); return f.load(); };
  return Promise.all([add('DM Serif Display', 'DMSerifDisplay-Regular.ttf', { weight: '400' }), add('DM Serif Display', 'DMSerifDisplay-Italic.ttf', { weight: '400', style: 'italic' }),
    add('DM Mono', 'DMMono-Medium.ttf', { weight: '500' })]).catch(e => console.error('edge-case fonts', e)); })();
/* the page reports READY only once the faces are in (renders and exports wait for READY; nothing draws in a fallback face) */
{ let ok = false, want = !!window.READY; EFF.then(() => { ok = true; });
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ok, set: (v) => { want = !!v; } }); } catch (e) { } }
G.lime = { bg: EF.lime, fg: EF.ink, mid: EF.mid, line: EF.line, acc: EF.red, card: EF.white, panel: EF.pale, grid: EF.line, mode: 'light' };
G.lime2 = { ...G.lime };
G.efInk = { bg: EF.ink, fg: EF.white, mid: '#B9C77A', line: EF.lineW, acc: EF.lime, card: EF.white, panel: '#1E1E1E', grid: EF.lineW, mode: 'dark' };
G.efWhite = { bg: EF.white, fg: EF.ink, mid: '#5E5E5E', line: EF.line, acc: EF.red, card: EF.white, panel: '#F2F2F2', grid: EF.line, mode: 'light' };
/* type set 05 Warm serif + mono (TYPE-SYSTEM.md, her pick 2026-11-07): DM Serif Display 400 sentence case for what is typed
 * and headlines, DM Mono 500 for the body and labels. No thick lines: every outline is a hairline (efLine, <= 2 px). */
F.disp = (s) => `400 ${s}px "DM Serif Display"`;
F.body = (s) => `500 ${s}px "DM Mono"`;
F.mono = (s) => `500 ${s}px "DM Mono"`;
F.serif = (s) => `400 ${s}px "DM Serif Display"`;
LS.disp = -0.02; LS.body = -0.01; LS.mono = 0.04; LS.serif = -0.02;
/** a hairline box edge (her rule: no borders thicker than 2 px) */
const efLine = (x, y, w, h, col, lw) => { if (col !== EF.red) return; strokeR(x, y, w, h, col, Math.min(2, lw || 2)); };   // 2026-11-07 evening: no box edges at all ("old websites"); only a red error edge stays
if (typeof PLATE !== 'undefined') { PLATE.ef = [EF.lime, EF.ink, EF.red]; PLATE.efInk = [EF.ink, EF.white, EF.lime]; PLATE.efWhite = [EF.white, EF.ink, EF.red]; }

const efE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
EF.sfx = (role, t, db = 0) => { if (t != null && t >= 0 && t < TOTAL) sfx(role, t, db); };
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
EF.short = () => !!(typeof FOOT !== 'undefined' && PORTRAIT && FOOT.m && FOOT.m.kind === 'short');
function efClip(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
/** scale unit of a rect: 1 = a 1000 px wide panel */
const efU = (r) => r.h > r.w * 1.02 ? clamp(Math.min(r.w / 760, r.h / 760), 0.5, 1.45) : clamp(Math.min(r.w / 1000, r.h / 760), 0.5, 1.6);   // portrait: scaled by the band, so the graphic fills the tall frame

/** editable text. [word] = red; '\n' = new line; size shrinks so the widest line fits o.maxW. o.at (rises in), o.hits (red
 *  marks sweep in: an underline bar), o.col, o.f (font fn), o.align, o.lh, o.ls. Returns {w, h, size}. */
EF.text = (t, key, def, x, y, size, o = {}) => {
  const ov = o.raw ? { s: null, hide: false, dx: 0, dy: 0, k: 1 } : ovr(key); const str = ov.s != null ? ov.s : def; const ff = o.f || ((s) => F.disp(s, o.w || 800));
  const lines = String(str).split('\n'); const plain = (l) => l.replace(/[\[\]]/g, ''); const ls = (z) => (o.ls == null ? LS.disp : o.ls) * z;
  let z = size; const wid = (zz) => Math.max(...lines.map(l => tw(plain(l), ff(zz), ls(zz))));
  if (o.maxW) while (wid(z) > o.maxW && z > 18) z -= 2;
  const font = ff(z), lh = (o.lh || 1.06) * z, W_ = wid(z), H_ = (lines.length - 1) * lh + z * 1.08;
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const a = o.at == null ? 1 : efE(t, o.at, 0.4);
  const info = { text: str, def, label: 'text ([word] = red)' };
  if (ov.hide) { regBox(ov, bx, y - z * 0.86, W_, H_, info); return { w: W_, h: H_, size: z }; }
  if (a > 0.002) moved(ov, () => {
    let bi = 0;
    withA(clamp(a * 1.8), () => withT(0, (1 - a) * z * 0.22, 1, 0, () => lines.forEach((l, li) => {
      const lw = tw(plain(l), font, ls(z)); let xx = o.align === 'center' ? x - lw / 2 : o.align === 'right' ? x - lw : x; const yy = y + li * lh;
      for (const p of l.split(/(\[[^\]]+\])/).filter(Boolean)) {
        const bl = p[0] === '['; const s = bl ? p.slice(1, -1) : p; const w = tw(s, font, ls(z));
        if (bl) { const ht = Array.isArray(o.hits) ? o.hits[Math.min(bi, o.hits.length - 1)] : o.hits != null ? o.hits : (o.at || 0) + 0.3; bi++;
          const q = efE(t, ht, 0.35, 'outExpo'); _txt(s, xx, yy, font, q > 0.5 ? (o.mark || EF.red) : (o.col || EF.ink), 'left', 'alphabetic', ls(z));
          if (q > 0 && o.bar !== false) rect(xx, yy + z * 0.12, w * q, Math.max(2, z * 0.025), o.mark || EF.red); }
        else _txt(s, xx, yy, font, o.col || EF.ink, 'left', 'alphabetic', ls(z));
        xx += w; }
    })));
    if (!o.raw) regBox(ov, bx, y - z * 0.86, W_, H_, info);
  });
  return { w: W_, h: H_, size: z };
};
/** a mono label (field label / credit / kicker), editable */
EF.mono = (s, x, y, z, col = EF.ink, align = 'left', key, w = 800) => (z = Math.round(z * V(1.3, 1)), txt(s, x, y, F.mono(z, w), col, align, 'alphabetic', z * 0.06, key || 'mono ' + s));

/** a form field at poster scale. o: label, value, typeAt, cps, errAt, errText, caret, size, draw(tx, ty, fs, shown), key */
EF.field = (t, x, y, w, h, o) => {
  const errP = o.errAt == null ? 0 : efE(t, o.errAt, 0.3); const col = errP > 0.5 ? EF.red : EF.ink; const k = o.key || o.label;
  const ls = Math.max(30, Math.round(h * 0.22));
  if (o.label) txt(String(o.label).toUpperCase(), x, y - ls * 0.62, F.mono(ls, 800), col, 'left', 'alphabetic', ls * 0.06, 'label ' + k);
  fillRR(x, y, w, h, Math.min(18, h * 0.16), o.fill || EF.white); efLine(x, y, w, h, col, errP > 0.5 ? 8 : 6);
  const ov = ovr('value ' + k); const v = ov.s != null ? ov.s : (o.value || '');
  let fs = o.size || h * 0.5; { const vw = tw(v, F.disp(fs), fs * LS.disp); const room = w - fs * 0.9; if (vw > room && vw > 0) fs = fs * room / vw; } const font = F.disp(fs);
  const n = o.typeAt == null ? [...v].length : Math.round([...v].length * clamp((t - o.typeAt) / Math.max(0.15, [...v].length / (o.cps || 14))));
  const shown = [...v].slice(0, n).join(''); const tx = x + fs * 0.4, ty = y + h / 2 + fs * 0.36;
  let sw; if (o.draw) { o.draw(tx, ty, fs, shown); sw = tw(shown, font, fs * LS.disp); }
  else { efClip(x + 6, y + 6, w - 12, h - 12, () => _txt(shown, tx, ty, font, o.valCol || EF.ink, 'left', 'alphabetic', fs * LS.disp)); sw = tw(shown, font, fs * LS.disp); regBox(ov, tx, y + 6, Math.max(60, sw), h - 12, { text: v, def: o.value || '', label: 'field value' }); }
  if (o.caret !== false && (o.typeAt == null || t >= o.typeAt - 0.4) && (o.caretOff == null || t < o.caretOff)) rect(Math.min(x + w - 20, tx + sw + fs * 0.08), y + h * 0.2, Math.max(5, fs * 0.06), h * 0.6, EF.ink);
  if (errP > 0) withA(errP, () => { const es = Math.max(32, Math.round(h * 0.24)); circle(x + es * 0.5, y + h + es * 1.1, es * 0.5, EF.red); _txt('!', x + es * 0.5, y + h + es * 1.1 + es * 0.33, F.mono(es * 0.8, 800), EF.white, 'center');
    txt(o.errText, x + es * 1.4, y + h + es * 1.42, F.body(es, 800), EF.red, 'left', 'alphabetic', 0, 'error ' + k); });
};
/** the button: ink block, white label; press = 0..1 (squash); o.off = greyed (disabled) */
EF.button = (x, y, w, h, label, press = 0, o = {}) => {
  const k = 1 - 0.06 * press; withT(x + w / 2, y + h / 2, k, 0, () => { rect(-w / 2, -h / 2, w, h, o.off ? '#B8C47E' : EF.ink);
    txt(label, 0, h * 0.16, F.disp(h * 0.4), o.off ? EF.mid : EF.white, 'center', 'alphabetic', 0, 'button ' + (o.key || label));
    if (o.load > 0) rect(-w / 2, h / 2 - 12, w * clamp(o.load), 12, EF.lime); });
};
EF.pressAt = (t, ts) => ts.reduce((m, a) => Math.max(m, t >= a && t < a + 0.16 ? 1 - (t - a) / 0.16 : 0), 0);
/** a code panel: ink block, mono lines ([text, col, box] segments per line); lines type on at o.at (+ o.step per line) */
EF.codeBlock = (t, x, y, w, lines, size, o = {}) => {
  const lh = size * 1.5, h = lines.length * lh + size * 1.5; rect(x, y, w, h, EF.ink);
  lines.forEach((segs, i) => { const la = o.at == null ? 1 : efE(t, o.at + i * (o.step || 0.35), 0.3); if (la <= 0) return; let xx = x + size * 1.1; const yy = y + size * 1.55 + i * lh;
    withA(la, () => segs.forEach(([s, c, box]) => { const f = F.mono(size, 500); const sw = tw(s, f); if (box) rect(xx - 4, yy - size * 0.92, sw + 8, size * 1.24, box); _txt(s, xx, yy, f, c || EF.white, 'left'); xx += sw; })); });
  return h;
};
/** a real page clipping (a crop, never altered) + marker highlights on the words she says + small source credit */
EF.clip = (t, key, x, y, w, o = {}) => {
  const c = CLIPS[key]; const im = IMG['clip_' + key]; if (!c || !im) throw new Error('clip ' + key);
  const a = o.at == null ? 1 : efE(t, o.at, 0.45); if (a <= 0.001) return { h: 0 };
  const pad = o.pad == null ? 22 : o.pad; const y0 = o.crop ? o.crop[0] : 0, y1 = o.crop ? o.crop[1] : c.h; const x0 = o.cropX ? o.cropX[0] : 0, x1 = o.cropX ? o.cropX[1] : c.w;
  const s = (w - 2 * pad) / (x1 - x0); const ih = (y1 - y0) * s; const h = ih + 2 * pad; const cs = Math.round((o.creditSize || 30) * V(1.3, 1));
  grp(o.key || 'clip ' + key, x, y, w, h, () => withA(Math.min(1, a * 1.6), () => withT(0, 30 * (1 - a), 1, 0, () => {
    themeFixed(() => { rect(x, y, w, h, EF.white); efLine(x, y, w, h, EF.ink, 6);
      ctx.drawImage(im, x0, y0, x1 - x0, y1 - y0, x + pad, y + pad, (x1 - x0) * s, ih);
      if (o.hlAt != null) efClip(x + pad, y + pad, (x1 - x0) * s, ih, () => (c.hl || []).forEach((r, i) => { if (o.only && !o.only.includes(i)) return;
        const p = efE(t, Array.isArray(o.hlAt) ? o.hlAt[Math.min(i, o.hlAt.length - 1)] : o.hlAt + i * 0.28, 0.42, 'outExpo'); if (p <= 0) return;
        ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || EF.lime; ctx.fillRect(x + pad + (r[0] - x0 - 6) * s, y + pad + (r[1] - y0 - 2) * s, (r[2] + 12) * s * p, (r[3] + 4) * s); ctx.restore(); })); });
    if (o.credit !== false) txt((o.creditText || (c.source + (c.date ? '  ·  ' + c.date : ''))).toUpperCase(), x, y + h + cs * 1.4, F.mono(cs, 500), o.creditCol || EF.ink, 'left', 'alphabetic', cs * 0.04, 'credit ' + key);
  })), { img: true });
  return { h: h + (o.credit !== false ? cs * 1.8 : 0) };
};
/** a mono kicker + rule at the top of a panel */
EF.kicker = (t, s, x, y, w, at, key, col = EF.ink) => { const p = at == null ? 1 : efE(t, at, 0.4); if (p <= 0) return; const z = 32;
  withA(p, () => { EF.mono(s.toUpperCase(), x, y, z, col, 'left', key || 'kicker'); hline(x, y + 22, w, efE(t, at || 0, 0.6), col, 4); }); };
/** fill a panel rect with the ground (lime default) */
const efBg = (r, col) => rect(r.x, r.y, r.w, r.h, col || EF.lime);

/* ======================= graphics: EF.x(o) -> draw(t, r) ======================= */
/** big words (her point) on the ground: o.kicker, o.lines ([red] marks), o.at, o.hits, o.small (+ smallAt), o.ground, o.size */
EF.word = (o) => (t, r) => {
  const u = efU(r); const gr = o.ground || 'lime'; const dark = gr === 'efInk'; efBg(r, G[gr].bg); const m = 56 * u; const fg = dark ? EF.white : EF.ink;
  let y = r.y + m + 30 * u; if (o.kicker) { EF.kicker(t, o.kicker, r.x + m, y, r.w - 2 * m, o.at, 'kicker', dark ? EF.lime : EF.ink); y += 70 * u; }
  const nL = String(o.lines).split('\n').length; const size = o.size ? o.size * u : Math.min(120 * u, (r.h - (y - r.y) - m - (o.small ? 110 * u : 0)) / (nL * 1.1));
  const y0 = o.top ? y + size : r.y + r.h / 2 - (nL - 1) * size * 1.06 / 2 + size * 0.36 - (o.small ? 40 * u : 0);
  const tb = EF.text(t, 'lines', o.lines, r.x + m, Math.max(y + size * 0.9, y0), size, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: fg, mark: dark ? EF.lime : EF.red });
  if (o.small) withA(efE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.6, 0.35), () => txtW(o.small, r.x + m, Math.max(y + size * 0.9, y0) + tb.h + 34 * u, F.body(Math.max(34, 40 * u), 500), dark ? '#CFCFCF' : EF.ink, r.w - 2 * m, Math.max(42, 50 * u), 0, 'small'));
  if (o.sound) EF.sfx(o.sound, o.hits != null ? [].concat(o.hits)[0] : o.at, -6);
};
/** the chapter card: "EDGE CASE 03 / 08" + a field where the name types on (the signature: a new field takes the stage) */
EF.chapter = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 80 * u; const fw = r.w - 2 * m, fh = Math.min(200 * u, r.h * 0.28); const fy = r.y + r.h * 0.5 - fh / 2;
  EF.field(t, r.x + m, fy, fw, fh, { label: `Edge case ${String(o.n).padStart(2, '0')} / 08`, key: 'chapter', value: o.name, typeAt: o.at, cps: 16, size: fh * 0.46 });
  if (o.sub) withA(efE(t, o.subAt || o.at + 0.8, 0.35), () => txtW(o.sub, r.x + m, fy + fh + 80 * u, F.body(Math.max(34, 42 * u), 500), EF.ink, fw, 54 * u, 0, 'sub'));
};
/** stacked fields (+ a button): o.fields [{label, value, typeAt, cps, errAt, errText, draw}], o.button {label, presses, at, off, load},
 *  o.title (+ titleAt), o.note (+ noteAt), o.h (field height) */
EF.form = (o) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 64 * u; const fw = r.w - 2 * m; let y = r.y + m + 20 * u;
  if (o.title) { const p = efE(t, o.titleAt != null ? o.titleAt : o.at || 0, 0.4); if (p > 0) withA(p, () => EF.text(t, 'title', o.title, r.x + m, y + 70 * u, 76 * u, { maxW: fw, raw: false })); y += 130 * u; }
  const n = o.fields.length + (o.button ? 1 : 0); const gap = 90 * u; const fh = o.h ? o.h * u : Math.min(150 * u, (r.y + r.h - m - (o.note ? 90 * u : 0) - y - (n - 1) * gap - 50 * u) / n);
  o.fields.forEach((f, i) => { const p = f.at == null ? 1 : efE(t, f.at, 0.3); if (p <= 0) return; y += 46 * u; withA(p, () => EF.field(t, r.x + m, y, Math.min(fw, f.w ? f.w * u : fw), fh, { size: fh * 0.48, ...f })); y += fh + gap - 46 * u; });
  if (o.button) { const b = o.button; const p = b.at == null ? 1 : efE(t, b.at, 0.3); if (p > 0) withA(p, () => EF.button(r.x + m, y + 10 * u, Math.min(fw, 620 * u), fh, b.label, EF.pressAt(t, b.presses || []), { off: b.off != null && t >= b.off, load: b.load ? b.load(t) : 0 })); y += fh + 40 * u; }
  if (o.note) withA(efE(t, o.noteAt, 0.35), () => EF.text(t, 'note', o.note, r.x + m, Math.min(r.y + r.h - m, y + 120 * u), 52 * u, { maxW: fw, f: (s) => F.body(s, 800), raw: false }));
};
/** the double click: a button and the orders table (one row per press); o.presses, o.at, o.tab (a second tab slides over), o.name */
EF.orders = (o) => (t, r) => {
  const u = efU(r); efBg(r); const wide = r.w > r.h * 1.3; const m = 60 * u; const name = o.name || 'Ada Obi';
  const fx = r.x + m, fw = wide ? r.w * 0.42 : r.w - 2 * m; const fh = 120 * u;
  EF.field(t, fx, r.y + m + 50 * u, fw, fh, { label: 'Name', key: 'order name', value: name, typeAt: o.typeAt, cps: 12, caret: false });
  const by = r.y + m + 50 * u + fh + 70 * u; EF.button(fx, by, fw, fh, o.label || 'Place order', EF.pressAt(t, o.presses), { load: o.loadAt != null && t > o.loadAt && t < o.loadAt + 1.1 ? efE(t, o.loadAt, 1.1, 'inOutQuart') : 0 });
  if (o.waitAt != null) withA(efE(t, o.waitAt, 0.3) * (1 - efE(t, o.waitAt + 1.2, 0.2)), () => txt('wait…', fx, by + fh + 80 * u, F.body(56 * u, 800), EF.ink, 'left', 'alphabetic', 0, 'wait'));
  const tx = wide ? r.x + r.w * 0.52 : fx, ty = wide ? r.y + m + 30 * u : by + fh + 70 * u, tw0 = wide ? r.w * 0.48 - m : fw; const rh = Math.min(74 * u, (r.y + r.h - ty - 40 * u) / Math.max(4, o.presses.length + 0.6));
  EF.mono('ORDERS', tx, ty, 32, EF.ink, 'left', 'orders'); hline(tx, ty + 20, tw0, 1, EF.ink, 4);
  o.presses.forEach((a, k) => { const p = efE(t, a + 0.04, 0.3); if (p <= 0) return; const ry = ty + 36 + k * rh; const dup = k > 0;
    withA(p, () => { rect(tx, ry + 8 * (1 - p), tw0, rh - 8, dup ? EF.white : EF.pale); const z = Math.max(30, rh * 0.42);
      _txt(`#${1041 + k}`, tx + 20, ry + rh * 0.64, F.mono(z, 800), dup ? EF.red : EF.ink, 'left'); _txt(name, tx + z * 5.4, ry + rh * 0.64, F.body(z, 500), EF.ink, 'left');
      _txt(o.price || '€39.00', tx + tw0 - 20, ry + rh * 0.64, F.mono(z, 500), EF.ink, 'right'); }); });
  if (o.note) withA(efE(t, o.noteAt, 0.35), () => EF.text(t, 'note', o.note, wide ? tx : fx, r.y + r.h - m * 0.6, 60 * u, { maxW: wide ? tw0 : fw, raw: false }));
  if (o.tab != null) { const tb = efE(t, o.tab, 0.5, 'inOutQuart'); if (tb > 0) efClip(r.x, r.y, r.w, r.h, () => withT((1 - tb) * r.w, 0, 1, 0, () => { efBg(r); rect(r.x, r.y, 8, r.h, EF.ink);
    rect(fx, r.y + m * 0.6, 260 * u, 70 * u, EF.ink); _txt('Tab 2', fx + 22 * u, r.y + m * 0.6 + 48 * u, F.mono(38 * u, 800), EF.white, 'left');
    EF.field(t, fx, r.y + m + 160 * u, fw, fh, { label: 'Name', key: 'tab2 name', value: name, caret: false }); EF.button(fx, r.y + m + 160 * u + fh + 70 * u, fw, fh, o.label || 'Place order', 0, { key: 'tab2' });
    EF.text(t, 'tab2 line', 'the same customer,\nthe same form, [again]', wide ? r.x + r.w * 0.52 : fx, wide ? r.y + r.h * 0.45 : r.y + r.h - 240 * u, 64 * u, { hits: o.tab + 0.4, maxW: wide ? r.w * 0.44 : fw }); })); }
};
/** two requests racing (race condition / retry / two requests): o.a, o.b (lane labels), o.target, o.at, o.hitA, o.hitB, o.result [{s, at, red}], o.title */
EF.lanes = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 60 * u; const est = (o.title ? 120 : 0) * u + 330 * u + (o.result || []).length * 84 * u + (o.targetSub ? 60 : 0) * u;
  let y = r.y + Math.max(m + 20 * u, (r.h - est) / 2 - 20 * u);
  if (o.title) { EF.text(t, 'title', o.title, r.x + m, y + 60 * u, 72 * u, { at: o.at, maxW: r.w - 2 * m, hits: o.titleHits }); y += 120 * u; }
  const tgW = Math.min(360 * u, r.w * 0.34), tgX = r.x + r.w - m - tgW; const laneW = tgX - r.x - m - 30 * u; const lh = 120 * u;
  const tgY = y + 40 * u, tgH = lh * 2 + 50 * u;
  withA(efE(t, o.at, 0.35), () => { rect(tgX, tgY, tgW, tgH, EF.white); efLine(tgX, tgY, tgW, tgH, EF.ink, 6); EF.text(t, 'target', o.target, tgX + tgW / 2, tgY + tgH / 2 + 26 * u, 64 * u, { align: 'center', maxW: tgW - 30 * u, raw: false }); if (o.targetSub) txtW(o.targetSub.toUpperCase(), tgX, tgY + tgH + 46 * u, F.mono(30, 500), EF.ink, tgW, 38, 0, 'target sub'); });
  [[o.a, o.hitA], [o.b, o.hitB]].forEach(([lab, hit], i) => { if (!lab) return; const ly = tgY + 10 * u + i * (lh + 30 * u); const p = efE(t, o.at + 0.15 * i, 0.3); if (p <= 0) return;
    withA(p, () => { EF.mono(lab.toUpperCase(), r.x + m, ly + 30 * u, 32, EF.ink, 'left', 'lane ' + i); const q = hit == null ? 0 : efE(t, hit - 0.55, 0.55, 'inOutQuart');
      hline(r.x + m, ly + 70 * u, laneW, 1, EF.line, 4); const bx = r.x + m + (laneW - 70 * u) * q; rect(bx, ly + 48 * u, 70 * u, 44 * u, i ? EF.red : EF.ink);
      if (q > 0.98) withA(efE(t, hit, 0.25), () => EF.mono('✓', r.x + m + laneW + 6 * u, ly + 84 * u, 40, EF.ink, 'left', 'tick ' + i)); }); });
  let ry = tgY + tgH + (o.targetSub ? 150 : 90) * u; (o.result || []).forEach((x, i) => { const p = efE(t, x.at, 0.35); if (p > 0) withA(p, () => EF.text(t, 'result ' + i, x.s, r.x + m, ry, (x.size || 60) * u, { maxW: r.w - 2 * m, hits: x.at + 0.2, col: EF.ink })); ry += (x.size || 60) * u * 1.4; });
};
/** a bug report card (generic issue tracker look, made up): o.title, o.at, o.body */
EF.issue = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 50 * u; const w = r.w - 2 * m, h = Math.min(r.h - 2 * m, 460 * u); const y = r.y + (r.h - h) / 2; const p = efE(t, o.at, 0.45);
  if (p <= 0) return; withT(0, (1 - p) * 60 * u, 1, 0, () => withA(clamp(p * 1.6), () => { rect(r.x + m, y, w, h, EF.white); efLine(r.x + m, y, w, h, EF.ink, 6);
    rect(r.x + m, y, w, 74 * u, EF.ink); EF.mono('NEW ISSUE  #482', r.x + m + 28 * u, y + 50 * u, 32, EF.lime, 'left', 'issue head');
    circle(r.x + m + 50 * u, y + 150 * u, 18 * u, EF.red); EF.text(t, 'issue title', o.title, r.x + m + 90 * u, y + 170 * u, 64 * u, { maxW: w - 120 * u, raw: false });
    txtW(o.body || 'Reported by a customer, 03:12', r.x + m + 90 * u, y + 260 * u, F.body(Math.max(32, 38 * u), 500), EF.mid, w - 120 * u, 48 * u, 0, 'issue body'); })); };
/** the open-loop montage: 4 small cards, one after another (o.times), each with a shutter */
EF.montage = (o) => (t, r) => {
  const u = efU(r); efBg(r, EF.ink); const items = o.items; const n = items.length; const cols = r.w > r.h * 1.2 ? n : 2; const rows = Math.ceil(n / cols); const m = 36 * u;
  const cw = (r.w - m * (cols + 1)) / cols, ch = Math.min((r.h - m * (rows + 1)) / rows, cw * 0.9);
  items.forEach((it, i) => { const p = efE(t, o.times[i], 0.28); if (p <= 0) return; const cx = r.x + m + (i % cols) * (cw + m), cy = r.y + (r.h - rows * ch - (rows - 1) * m) / 2 + Math.floor(i / cols) * (ch + m);
    withT(cx + cw / 2, cy + ch / 2, 0.9 + 0.1 * p, 0, () => withA(p, () => { rect(-cw / 2, -ch / 2, cw, ch, EF.lime); const z = Math.min(cw / (it.big.length * 0.62 + 0.6), ch * 0.34);
      EF.mono(it.label, -cw / 2 + 22 * u, -ch / 2 + 50 * u, 30, EF.ink, 'left', 'mlabel ' + i); txt(it.big, 0, z * 0.36, F.disp(z), it.red ? EF.red : EF.ink, 'center', 'alphabetic', -0.03 * z, 'mbig ' + i);
      if (it.sub) txt(it.sub, 0, ch / 2 - 30 * u, F.mono(Math.max(30, 32 * u), 800), EF.red, 'center', 'alphabetic', 0, 'msub ' + i); })); });
};
/** a code panel on the ground: o.kicker, o.lines (segments), o.at, o.step, o.result {s, at, red}, o.size */
EF.code = (o) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 56 * u; let y = r.y + m + 20 * u;
  if (o.kicker) { EF.kicker(t, o.kicker, r.x + m, y, r.w - 2 * m, o.at, 'kicker'); y += 60 * u; }
  const z = o.size ? o.size * u : Math.max(30, Math.min(44 * u, (r.w - 2 * m) / (Math.max(...o.lines.map(l => l.reduce((a, s) => a + s[0].length, 0))) * 0.62 + 2.2)));
  const h = EF.codeBlock(t, r.x + m, y + 20 * u, r.w - 2 * m, o.lines, z, { at: o.at, step: o.step }); y += h + 90 * u;
  (o.result ? [].concat(o.result) : []).forEach((x, i) => { const p = efE(t, x.at, 0.35); if (p > 0) withA(p, () => EF.text(t, 'result ' + i, x.s, r.x + m, y + i * 90 * u, (x.size || 62) * u, { maxW: r.w - 2 * m, hits: x.at + 0.15, f: (s) => F.disp(s) })); });
  if (o.sound !== false && o.result) [].concat(o.result).forEach(x => EF.sfx(x.red ? 'error' : 'pop', x.at, -6));
};
/** a real source clipping on the ground with a title above: o.key, o.title ([red]), o.titleHits, o.at, o.hlAt, o.crop, o.only, o.creditText */
EF.src = (key, o = {}) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 56 * u; let y = r.y + m;
  if (o.kicker) { EF.kicker(t, o.kicker, r.x + m, y + 20 * u, r.w - 2 * m, o.at, 'kicker'); y += 70 * u; }
  if (o.title) { const tb = EF.text(t, 'title', o.title, r.x + m, y + 78 * u, 78 * u, { at: o.at, hits: o.titleHits, maxW: r.w - 2 * m }); y += tb.h + 60 * u; }
  const c = CLIPS[key]; const avH = r.y + r.h - y - m - 50; const lone = !o.title && !o.kicker; /* a screenshot alone sits in the middle */ const cw0 = r.w - 2 * m; const ar = ((o.crop ? o.crop[1] - o.crop[0] : c.h) + 44 / (cw0 / c.w)) / ((o.cropX ? o.cropX[1] - o.cropX[0] : c.w));
  const cw = Math.min(cw0, avH / ar, o.maxW ? o.maxW * u : 1e9);
  if (lone) { const ch = cw * ar; y = Math.max(y, r.y + (r.h - ch) / 2 - 20 * u); }
  EF.clip(t, key, r.x + (lone ? (r.w - cw) / 2 : m), y, cw, { at: (o.at || 0) + 0.15, hlAt: o.hlAt, crop: o.crop, cropX: o.cropX, only: o.only, creditText: o.creditText, credit: o.credit, hl: o.hl, creditSize: o.creditSize });
};
/** a photo (Pexels) on the ground, cover-cropped, with a mono caption under it: o.key, o.cap, o.at, o.fx, o.fy, o.credit */
EF.photo = (o) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 36 * u; const p = efE(t, o.at, 0.45); if (p <= 0) return; const ch = o.cap ? 80 * u : 0;
  withA(clamp(p * 1.6), () => withT(0, (1 - p) * 40 * u, 1, 0, () => { const x = r.x + m, y = r.y + m, w = r.w - 2 * m, h = r.h - 2 * m - ch;
    grp('photo ' + o.key, x, y, w, h, () => { const im = IMG[o.key]; const s = Math.max(w / im.width, h / im.height) * (1 + 0.04 * efE(t, o.at, 6, 'linear'));
      const sw = w / s, sh = h / s; themeFixed(() => ctx.drawImage(im, clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh), sw, sh, x, y, w, h)); efLine(x, y, w, h, EF.ink, 6); }, { img: true });
    if (o.cap) EF.mono(o.cap.toUpperCase(), x, y + h + 50 * u, 32, EF.ink, 'left', 'caption');
    if (o.credit) { const z = 26; const cw = tw(o.credit, F.mono(z, 500)) + 24; rect(x + w - cw - 10, y + h - 46, cw, 36, EF.ink); _txt(o.credit, x + w - cw + 2, y + h - 20, F.mono(z, 500), EF.white, 'left'); } })); };
/** a number that matters: o.kicker, o.big, o.small, o.at, o.from (counts from) , o.foot, o.ground */
EF.stat = (o) => (t, r) => {
  const u = efU(r); const gr = o.ground || 'lime'; const dark = gr === 'efInk'; efBg(r, G[gr].bg); const m = 60 * u; const fg = dark ? EF.white : EF.ink;
  if (o.kicker) EF.kicker(t, o.kicker, r.x + m, r.y + m + 60 * u, r.w - 2 * m, o.at, 'kicker', dark ? EF.lime : EF.ink);
  const p = efE(t, o.at + 0.1, 0.5); const big = o.from != null && o.to != null ? o.fmt(lerp(o.from, o.to, efE(t, o.countAt || o.at, o.countD || 0.9, 'inOutQuart'))) : o.big;
  const z = Math.min(300 * u, (r.w - 2 * m) / (String(o.big || big).length * 0.62)); withA(p, () => txt(big, r.x + m, r.y + r.h * 0.52 + z * 0.3, F.disp(z), o.red ? EF.red : fg, 'left', 'alphabetic', -0.04 * z, 'big'));
  if (o.small) withA(efE(t, o.smallAt || o.at + 0.4, 0.35), () => EF.text(t, 'small', o.small, r.x + m, r.y + r.h * 0.52 + z * 0.3 + 90 * u, 56 * u, { maxW: r.w - 2 * m, col: fg, f: (s) => F.body(s, 800), hits: o.smallHits, mark: dark ? EF.lime : EF.red }));
  if (o.foot) EF.mono(o.foot.toUpperCase(), r.x + m, r.y + r.h - m * 0.7, 28, dark ? '#B9C77A' : EF.mid, 'left', 'foot', 500);
};
/** two columns (before / after, them / us): o.a {label, title, hits}, o.b, o.at, o.bAt, o.redB */
EF.vs = (o) => (t, r) => {
  const u = efU(r); efBg(r); const wide = r.w > r.h * 1.15; const m = 50 * u, gap = 30 * u;
  const cw = wide ? (r.w - 2 * m - gap) / 2 : r.w - 2 * m, ch = wide ? r.h - 2 * m : (r.h - 2 * m - gap) / 2;
  [[o.a, o.at, EF.white], [o.b, o.bAt, o.bFill || EF.ink]].forEach(([c, at, fill], i) => { const p = efE(t, at, 0.4); if (p <= 0 || !c) return; const x = r.x + m + (wide ? i * (cw + gap) : 0), y = r.y + m + (wide ? 0 : i * (ch + gap)); const dark = fill === EF.ink;
    withA(p, () => withT(0, (1 - p) * 40 * u, 1, 0, () => { rect(x, y, cw, ch, fill); efLine(x, y, cw, ch, EF.ink, 6);
      if (c.label) EF.mono(c.label.toUpperCase(), x + 36 * u, y + 64 * u, 32, dark ? EF.lime : EF.ink, 'left', 'vs label ' + i);
      EF.text(t, 'vs ' + i, c.title, x + 36 * u, y + ch * 0.5 + 20 * u, (c.size || 84) * u, { maxW: cw - 72 * u, col: dark ? EF.white : EF.ink, hits: c.hits, mark: dark ? EF.lime : EF.red });
      if (c.draw) c.draw(t, { x: x + 36 * u, y: y + ch * 0.62, w: cw - 72 * u, h: ch * 0.3 }); })); });
};
/** ticks and crosses: o.title, o.items [{s, at, ok}], o.at */
EF.checks = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 60 * u; let y = r.y + m + 40 * u;
  if (o.title) { EF.text(t, 'title', o.title, r.x + m, y + 50 * u, 70 * u, { at: o.at, maxW: r.w - 2 * m }); y += 140 * u; }
  const rh = Math.min(130 * u, (r.y + r.h - m - y) / o.items.length);
  o.items.forEach((it, i) => { const p = efE(t, it.at, 0.3); if (p <= 0) return; const yy = y + i * rh; withA(p, () => { const s = rh * 0.56;
    rect(r.x + m, yy, s, s, it.ok ? EF.ink : EF.red); _txt(it.ok ? '✓' : '✕', r.x + m + s / 2, yy + s * 0.76, F.mono(s * 0.8, 800), it.ok ? EF.lime : EF.white, 'center');
    EF.text(t, 'item ' + i, it.s, r.x + m + s + 30 * u, yy + s * 0.78, Math.min(64 * u, s * 1.0), { maxW: r.w - 2 * m - s - 30 * u, raw: false, col: it.ok ? EF.ink : EF.red }); }); });
};
/** a browser dialog (generic): o.title, o.body, o.btn, o.at, o.press */
EF.dialog = (o) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 60 * u; const w = Math.min(r.w - 2 * m, 900 * u), h = Math.min(r.h - 2 * m, 470 * u); const x = r.x + (r.w - w) / 2, y = r.y + (r.h - h) / 2; const p = efE(t, o.at, 0.4); if (p <= 0) return;
  withA(p, () => withT(x + w / 2, y + h / 2, 0.94 + 0.06 * p, 0, () => { fillRR(-w / 2, -h / 2, w, h, 28 * u, EF.white);
    EF.text(t, 'dialog title', o.title, -w / 2 + 44 * u, -h / 2 + 100 * u, 58 * u, { maxW: w - 88 * u, raw: false });
    txtW(o.body, -w / 2 + 44 * u, -h / 2 + 180 * u, F.body(Math.max(32, 36 * u), 500), EF.ink, w - 88 * u, 48 * u, 0, 'dialog body');
    const bw = 280 * u, bh = 90 * u; EF.button(w / 2 - bw - 44 * u, h / 2 - bh - 40 * u, bw, bh, o.btn || 'Continue', EF.pressAt(t, [o.press || 1e9])); })); };
/** Starbucks gift cards: o.at, o.sendAt (two transfers at once), o.doneAt; $15 total -> $20 */
EF.gift = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 56 * u; const wide = r.w > r.h * 1.15; const cw = wide ? 330 * u : 300 * u, ch = cw * 0.62;
  const ax = r.x + m, bx = r.x + r.w - m - cw, cy = r.y + r.h * 0.42 - ch / 2;
  const card = (x, y, lab, val, key) => { rect(x, y, cw, ch, EF.white); efLine(x, y, cw, ch, EF.ink, 6); EF.mono(lab, x + 24 * u, y + 52 * u, 30, EF.ink, 'left', key + ' lab'); txt(val, x + 24 * u, y + ch - 30 * u, F.disp(84 * u), EF.ink, 'left', 'alphabetic', 0, key + ' val'); };
  const p0 = efE(t, o.at, 0.4); if (p0 <= 0) return;
  const s1 = efE(t, o.sendAt, 0.5, 'inOutQuart'), s2 = efE(t, o.sendAt + 0.06, 0.5, 'inOutQuart'); const done = t >= o.sendAt + 0.6;
  withA(p0, () => { card(ax, cy, 'CARD A', done ? '$0' : '$5', 'a'); card(bx, cy, 'CARD B', done ? '$20' : '$10', 'b');
    [s1, s2].forEach((s, i) => { if (s <= 0 || s >= 1) return; const yy = cy + ch * (0.3 + 0.4 * i); rect(lerp(ax + cw, bx - 60 * u, s), yy, 60 * u, 30 * u, i ? EF.red : EF.ink); });
    if (t >= o.sendAt - 0.2) { EF.mono('SEND $5 → B   ×2, AT THE SAME TIME', ax, cy + ch + 70 * u, 30, EF.red, 'left', 'send'); }
    const tot = t < o.doneAt ? '$15' : '$20'; const q = efE(t, o.doneAt, 0.35, 'outBack');
    EF.mono('TOTAL ON HIS CARDS', ax, r.y + r.h - m - 160 * u, 32, EF.ink, 'left', 'total lab');
    withT(ax, r.y + r.h - m - 30 * u, t >= o.doneAt ? 0.9 + 0.1 * q : 1, 0, () => _txt(tot, 0, 0, F.disp(130 * u), t >= o.doneAt ? EF.red : EF.ink, 'left'));
    if (t >= o.doneAt && wide) withA(q, () => txt('($5 sent, $10 arrived)', ax + (wide ? 330 * u : 0), r.y + r.h - m - (wide ? 50 : 300) * u, F.body(44 * u, 800), EF.ink, 'left', 'alphabetic', 0, 'twice')); });
};
/** the NULL plate (generic, no real state's design) + parking tickets piling up: o.at, o.tickets [times], o.fines (counts to $12,000 by o.finesAt), o.credit */
EF.plate = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 56 * u; const pw = Math.min(r.w - 2 * m, 760 * u), ph = pw * 0.5; const px = r.x + (o.left ? m : (r.w - pw) / 2), py = r.y + m + 40 * u;
  const p = efE(t, o.at, 0.45); if (p <= 0) return;
  (o.tickets || []).forEach((a, i) => { const q = efE(t, a, 0.35, 'outBack'); if (q <= 0) return; const tw_ = 210 * u, th = 270 * u; const tx = Math.min(px + pw * (0.08 + ((i * 37) % 80) / 100), r.x + r.w - m - tw_ - 20 * u), ty = py + ph * 0.3 + ((i * 53) % 40) * u;
    withT(tx + tw_ / 2, ty + th / 2 - (1 - q) * 120 * u, 1, ((i * 29) % 21 - 10) / 60, () => { rect(-tw_ / 2, -th / 2, tw_, th, EF.white); efLine(-tw_ / 2, -th / 2, tw_, th, EF.ink, 4); rect(-tw_ / 2, -th / 2, tw_, 46 * u, EF.red);
      _txt('PARKING', -tw_ / 2 + 14 * u, -th / 2 + 33 * u, F.mono(24 * u, 800), EF.white, 'left'); _txt('PLATE: NULL', -tw_ / 2 + 14 * u, -th / 2 + 92 * u, F.mono(24 * u, 800), EF.ink, 'left');
      for (let k = 0; k < 4; k++) rect(-tw_ / 2 + 14 * u, -th / 2 + (120 + k * 30) * u, tw_ * (0.5 + ((i + k) % 3) * 0.12), 8 * u, '#C8C8C8'); }); });
  withA(p, () => withT(px + pw / 2, py + ph / 2, 0.96 + 0.04 * p, 0, () => { fillRR(-pw / 2, -ph / 2, pw, ph, 24 * u, EF.white); strokeRR(-pw / 2 + 16 * u, -ph / 2 + 16 * u, pw - 32 * u, ph - 32 * u, 16 * u, '#1C2A5A', 4 * u);
    EF.mono('CALIFORNIA', 0, -ph / 2 + 70 * u, 32, EF.ink, 'center', 'plate state'); txt(o.text || 'NULL', 0, ph * 0.28, F.mono(ph * 0.5, 800), EF.ink, 'center', 'alphabetic', ph * 0.04, 'plate text');
    for (const s of [-1, 1]) { circle(s * pw * 0.36, -ph / 2 + 50 * u, 9 * u, EF.ink); circle(s * pw * 0.36, ph / 2 - 50 * u, 9 * u, EF.ink); } }));
  if (o.finesAt != null) { const q = efE(t, o.finesFrom || o.finesAt - 1.5, (o.finesAt - (o.finesFrom || o.finesAt - 1.5)) || 1.5, 'inOutQuart'); if (q > 0) withA(clamp(q * 3), () => {
    const v = Math.round(12000 * q / 50) * 50; const s = '$' + v.toLocaleString('en-US'); EF.mono('FINES THAT WERE NOT HIS', r.x + m, r.y + r.h - m - 150 * u, 32, EF.ink, 'left', 'fines lab'); txt(s + (q >= 1 ? '+' : ''), r.x + m, r.y + r.h - m - 20 * u, F.disp(130 * u), EF.red, 'left', 'alphabetic', -4, 'fines'); }); }
  if (o.credit) withA(efE(t, o.creditAt || o.at, 0.35), () => { const s = o.credit.toUpperCase(); let z = 32; while (z > 24 && tw(s, F.mono(z, 800)) + 40 > r.w - 2 * m) z -= 1; const cw = Math.min(tw(s, F.mono(z, 800)) + 40, r.w - 2 * m); const cy = o.finesAt != null ? py + ph + 40 * u : r.y + r.h - m - 60; rect(r.x + m, cy, cw, 60, EF.ink); txt(s, r.x + m + 20, cy + 40, F.mono(z, 800), EF.lime, 'left', 'alphabetic', 0, 'credit'); });
};
/** calendar years (leap years every four): o.at, o.years, o.hit (index lit red at hitAt) */
EF.years = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 60 * u; const ys = o.years || [2012, 2016, 2020, 2024, 2028]; const n = ys.length; const wide = r.w > r.h;
  const cw = wide ? (r.w - 2 * m - (n - 1) * 24 * u) / n : r.w - 2 * m, ch = wide ? Math.min(r.h * 0.5, cw * 1.2) : Math.min(150 * u, (r.h - 2 * m - 200 * u) / n);
  EF.text(t, 'title', o.title || 'Every [four] years', r.x + m, r.y + m + 80 * u, 84 * u, { at: o.at, hits: o.titleHits, maxW: r.w - 2 * m });
  ys.forEach((y, i) => { const p = efE(t, o.at + 0.25 + i * 0.18, 0.3); if (p <= 0) return; const x = r.x + m + (wide ? i * (cw + 24 * u) : 0), yy = r.y + m + 180 * u + (wide ? 0 : i * (ch + 18 * u));
    withA(p, () => { rect(x, yy, cw, ch, EF.white); efLine(x, yy, cw, ch, EF.ink, 6); rect(x, yy, cw, 54 * u, EF.ink); _txt('FEB ' + y, x + 18 * u, yy + 38 * u, F.mono(30 * u > 30 ? 30 * u : 30, 800), EF.lime, 'left');
      const z29 = Math.min(cw * 0.5, (ch - 54 * u) * 0.7); _txt('29', x + cw / 2, yy + 54 * u + (ch - 54 * u) / 2 + z29 * 0.36, F.disp(z29), EF.red, 'center'); }); });
};
/** a digital clock: o.steps [[time, 'HH:MM', red?]], o.label, o.job {s, at, state: [[time, text, red]]} */
EF.clock = (o) => (t, r) => {
  const u = efU(r); efBg(r, o.bg); const m = 60 * u; let cur = o.steps[0]; for (const s of o.steps) if (t >= s[0]) cur = s;
  if (o.label) EF.mono(o.label.toUpperCase(), r.x + m, r.y + m + 70 * u, 32, EF.ink, 'left', 'clock label');
  const z = Math.min((r.w - 2 * m) / 3.3, 300 * u); const cy = (!o.label && !o.job && !o.top) ? r.y + (r.h - z * 1.1) / 2 : r.y + m + 90 * u; const q = efE(t, cur[0], 0.25, 'outBack');
  rect(r.x + m, cy, r.w - 2 * m, z * 1.1, EF.ink); withT(r.x + r.w / 2, cy + z * 0.86, 0.96 + 0.04 * q, 0, () => _txt(cur[1], 0, 0, F.mono(z, 800), cur[2] ? EF.red : EF.lime, 'center', 'alphabetic', z * 0.02));
  if (cur[3]) withA(q, () => EF.text(t, 'clock note', cur[3], r.x + m, cy + z * 1.1 + 90 * u, 64 * u, { maxW: r.w - 2 * m, raw: true, col: cur[2] ? EF.red : EF.ink }));
  if (o.job) { const j = o.job; const p = efE(t, j.at, 0.35); if (p > 0) { let st = null; for (const s of j.state || []) if (t >= s[0]) st = s; const jy = r.y + r.h - m - 170 * u;
    withA(p, () => { rect(r.x + m, jy, r.w - 2 * m, 150 * u, EF.white); efLine(r.x + m, jy, r.w - 2 * m, 150 * u, st && st[2] ? EF.red : EF.ink, 6); EF.mono('SCHEDULED JOB', r.x + m + 30 * u, jy + 50 * u, 30, EF.ink, 'left', 'job lab');
      EF.text(t, 'job', j.s, r.x + m + 30 * u, jy + 120 * u, 52 * u, { maxW: (r.w - 2 * m) * 0.5, raw: false });
      if (st) withA(efE(t, st[0], 0.3), () => _txt(st[1], r.x + r.w - m - 30 * u, jy + 116 * u, F.mono(Math.min(48 * u, (r.w - 2 * m) * 0.042), 800), st[2] ? EF.red : EF.ink, 'right')); }); } }
};
/** Adébáyọ̀: the name in a field, 7 letters you see vs 13 bytes; o.at, o.typeAt, o.sevenAt, o.strlenAt, o.bytesAt, o.thirteenAt */
EF.bytes = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 56 * u; const wide = r.w > r.h * 1.2; const fw = wide ? r.w * 0.5 : r.w - 2 * m; const fh = 150 * u;
  EF.field(t, r.x + m, r.y + m + 60 * u, fw, fh, { label: 'First name', key: 'adebayo', value: 'Adébáyọ̀', typeAt: o.typeAt, cps: 10, caret: false, size: fh * 0.5 });
  const nx = wide ? r.x + m + fw + 60 * u : r.x + m, ny = wide ? r.y + m + 60 * u + fh * 0.9 : r.y + m + 60 * u + fh + 210 * u; const nz = Math.min(180 * u, wide ? (r.w - fw - 2 * m - 60 * u) / 2.4 : 170 * u);
  withA(efE(t, o.sevenAt, 0.35), () => { _txt('7', nx, ny, F.disp(nz), EF.ink, 'left'); EF.mono('LETTERS YOU SEE', nx, ny + 50 * u, 30, EF.ink, 'left', 'seven'); });
  const dx13 = Math.max(nz * 1.3, tw('LETTERS YOU SEE', F.mono(Math.round(30 * V(1.3, 1)), 800)) + 50); withA(efE(t, o.thirteenAt, 0.35), () => { _txt('13', nx + dx13, ny, F.disp(nz), EF.red, 'left'); EF.mono('BYTES', nx + dx13, ny + 50 * u, 30, EF.red, 'left', 'thirteen'); });
  const by0 = wide ? r.y + r.h * 0.6 : ny + 140 * u; withA(efE(t, o.strlenAt, 0.3), () => txt('strlen("Adébáyọ̀")  // 13', r.x + m, by0, F.mono(Math.min(52 * u, (r.w - 2 * m) / 15), 800), EF.ink, 'left', 'alphabetic', 0, 'strlen'));
  const bs = Math.min(64 * u, (r.w - 2 * m - 12 * 6 * u) / 13 - 0.1), gp = 6 * u, bx = r.x + m, by = by0 + 50 * u; const groups = [['A', 1], ['d', 1], ['é', 2], ['b', 1], ['á', 2], ['y', 1], ['ọ̀', 5]];
  let k = 0; groups.forEach(([ch, nb]) => { const g0 = bx + k * (bs + gp); for (let j = 0; j < nb; j++) { const p = efE(t, o.bytesAt + k * 0.08, 0.25); const xx = bx + k * (bs + gp);
      if (p > 0) withA(p, () => { rect(xx, by, bs, bs, nb > 1 ? EF.red : EF.white); efLine(xx, by, bs, bs, EF.ink, 3); }); k++; }
    const gw = nb * bs + (nb - 1) * gp; withA(efE(t, o.bytesAt + (k - 1) * 0.08, 0.25), () => { hline(g0, by + bs + 12, gw, 1, EF.ink, 3); _txt(ch, g0 + gw / 2, by + bs + 56 * u, F.mono(Math.max(32, 38 * u), 800), EF.ink, 'center'); }); });
};
/** an API response list (products in the order the query returns them): o.at, o.flipAt (an index changes the order), o.pickAt */
EF.api = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 56 * u; const A = ['Blue mug', 'Desk lamp', 'Notebook', 'Tote bag']; const B_ = ['Notebook', 'Blue mug', 'Tote bag', 'Desk lamp'];
  const fl = o.flipAt == null ? 0 : efE(t, o.flipAt, 0.6, 'inOutQuart'); EF.mono('GET /api/products', r.x + m, r.y + m + 40 * u, 34, EF.ink, 'left', 'api head', 800);
  const rh = Math.min(110 * u, (r.h - 2 * m - 220 * u) / 4.4); const w = r.w - 2 * m; const y0 = r.y + m + 80 * u;
  A.forEach((s, i) => { const p = efE(t, o.at + i * 0.12, 0.3); if (p <= 0) return; const j = B_.indexOf(s); const yy = y0 + lerp(i, j, fl) * (rh + 12 * u); const last = (fl < 0.5 ? i : j) === 3;
    withA(p, () => { rect(r.x + m, yy, w, rh, EF.white); efLine(r.x + m, yy, w, rh, last && o.pickAt != null && t >= o.pickAt ? EF.red : EF.ink, last && o.pickAt != null && t >= o.pickAt ? 8 : 4);
      _txt(String(i + 1).padStart(2, '0'), r.x + m + 24 * u, yy + rh * 0.64, F.mono(Math.max(30, rh * 0.36), 800), EF.mid, 'left'); txt(s, r.x + m + 110 * u, yy + rh * 0.66, F.body(Math.max(32, rh * 0.42), 800), EF.ink, 'left', 'alphabetic', 0, 'item ' + i); }); });
  if (o.pickAt != null) withA(efE(t, o.pickAt, 0.3), () => EF.text(t, 'pick', fl > 0.5 ? 'their “newest” is now [the wrong product]' : 'their app: newest = [the last one]', r.x + m, y0 + 4 * (rh + 12 * u) + 70 * u, 50 * u, { maxW: w, hits: fl > 0.5 ? o.flipAt + 0.4 : o.pickAt + 0.2, f: (s) => F.body(s, 800) }));
  if (o.flipAt != null) withA(efE(t, o.flipAt - 0.4, 0.3), () => EF.mono('+ INDEX', r.x + r.w - m, r.y + m + 40 * u, 32, EF.red, 'right', 'index'));
};
/** a quote card (a real page's words): o.lines, o.who, o.at, o.hits, o.src */
EF.quote = (o) => (t, r) => {
  const u = efU(r); efBg(r, EF.ink); const m = 64 * u; EF.mono((o.kicker || '').toUpperCase(), r.x + m, r.y + m + 30 * u, 32, EF.lime, 'left', 'kicker');
  EF.text(t, 'quote', o.lines, r.x + m, r.y + m + 170 * u, (o.size || 74) * u, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: EF.white, mark: EF.lime, f: (s) => F.body(s, 800) });
  if (o.src) withA(efE(t, o.at + 0.6, 0.35), () => EF.mono(o.src.toUpperCase(), r.x + m, r.y + r.h - m, 28, '#B9C77A', 'left', 'source', 500));
};
/** the "happy path" vs real users: a straight arrow form -> button -> done, then tangled routes (o.realAt) */
EF.path = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 70 * u; const steps = ['Fill the form', 'Click the button', 'Wait'];
  if (r.h > r.w) {   // portrait: the steps stack down the frame
    const bw = r.w - 2 * m, bh = 150 * u; const ys = steps.map((_, i) => r.y + 160 * u + i * (bh + 110 * u));
    withA(efE(t, o.times[0], 0.3), () => EF.mono('THE PATH WE BUILD FOR', r.x + m, r.y + 100 * u, 32, EF.ink, 'left', 'path label'));
    steps.forEach((s_, i) => { const p = efE(t, o.times[i], 0.35); if (p <= 0) return; withA(p, () => { rect(r.x + m, ys[i], bw, bh, i === 1 ? EF.ink : EF.white); efLine(r.x + m, ys[i], bw, bh, EF.ink, 6);
      txt(s_, r.x + m + 40 * u, ys[i] + bh * 0.62, F.body(64 * u, 800), i === 1 ? EF.white : EF.ink, 'left', 'alphabetic', 0, 'step ' + i);
      if (i) { ctx.fillStyle = EF.ink; ctx.fillRect(r.x + r.w / 2 - 3, ys[i - 1] + bh + 10 * u, 6, 90 * u * efE(t, o.times[i] - 0.1, 0.3)); } }); });
    if (o.realAt != null) withA(efE(t, o.realAt, 0.4), () => EF.mono('REAL USERS', r.x + m, ys[2] + bh + 90 * u, 32, EF.red, 'left', 'real label'));
    return; }
  const y = r.y + r.h * 0.42;
  const xs = steps.map((_, i) => r.x + m + i * (r.w - 2 * m) / 2.6); const bw = Math.min(330 * u, (r.w - 2 * m) / 3.2), bh = 120 * u;
  steps.forEach((s, i) => { const at = o.times[i]; const p = efE(t, at, 0.35); if (p <= 0) return; withA(p, () => { rect(xs[i], y - bh / 2, bw, bh, i === 1 ? EF.ink : EF.white); efLine(xs[i], y - bh / 2, bw, bh, EF.ink, 6);
      txt(s, xs[i] + bw / 2, y + 14 * u, F.body(Math.min(44 * u, (bw - 24 * u) / (s.length * 0.62)), 800), i === 1 ? EF.white : EF.ink, 'center', 'alphabetic', 0, 'step ' + i);
      if (i) arrowR(xs[i - 1] + bw + 10 * u, y, xs[i] - 12 * u, efE(t, at - 0.1, 0.3), EF.ink, 6, 18 * u); }); });
  withA(efE(t, o.times[0], 0.3), () => EF.mono('THE PATH WE BUILD FOR', r.x + m, y - bh / 2 - 50 * u, 32, EF.ink, 'left', 'path label'));
  if (o.realAt != null) { const q = efE(t, o.realAt, 1.0, 'inOutQuart'); if (q > 0) { ctx.save(); ctx.strokeStyle = EF.red; ctx.lineWidth = 3 * u; ctx.lineCap = 'round'; ctx.beginPath();
    const N = 80; for (let i = 0; i <= N * q; i++) { const s = i / N; const xx = r.x + m + s * (r.w - 2 * m) * 0.9, yy = y + 150 * u + Math.sin(s * 19) * 70 * u + Math.sin(s * 7 + 1) * 50 * u; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
    ctx.stroke(); ctx.restore(); withA(q, () => EF.mono('REAL USERS', r.x + m, y + 300 * u, 32, EF.red, 'left', 'real label')); } }
};
/** two charges on a statement: o.at, o.second */
EF.charges = (o) => (t, r) => {
  const u = efU(r); efBg(r); const m = 56 * u; const w = r.w - 2 * m; EF.mono('CARD STATEMENT', r.x + m, r.y + m + 36 * u, 32, EF.ink, 'left', 'stmt');
  [[o.at, false], [o.second, true]].forEach(([a, dup], i) => { const p = efE(t, a, 0.35); if (p <= 0) return; const y = r.y + m + 80 * u + i * 150 * u;
    withA(p, () => { rect(r.x + m, y, w, 130 * u, EF.white); efLine(r.x + m, y, w, 130 * u, dup ? EF.red : EF.ink, dup ? 8 : 5); txt('Online shop', r.x + m + 30 * u, y + 80 * u, F.body(48 * u, 800), EF.ink, 'left', 'alphabetic', 0, 'payee ' + i);
      _txt('–€39.00', r.x + m + w - 30 * u, y + 80 * u, F.mono(48 * u, 800), dup ? EF.red : EF.ink, 'right'); }); });
  if (o.noteAt) withA(efE(t, o.noteAt, 0.35), () => EF.text(t, 'note', o.note || 'charged [twice]', r.x + m, r.y + m + 480 * u, 80 * u, { maxW: w, hits: o.noteAt + 0.2 }));
};

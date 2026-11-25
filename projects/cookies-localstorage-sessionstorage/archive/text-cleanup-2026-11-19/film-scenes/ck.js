/* cookies-localstorage-sessionstorage: the look A · CRASH TEST (her pick 2026-11-02), with the cloakroom as one scene in A's
 * style. Shared by the motion film (film/film.json scripts) and the talking-head edit, shorts and teaser (talking-head.json
 * "common", before moments/common.js).
 * Idea: every storage is a test subject (login cookie, cart = localStorage, checkout form = sessionStorage) put through
 * REFRESH / CLOSE TAB / CLOSE BROWSER / CLOSE INCOGNITO; a stamp lands STILL THERE (green) or GONE (red); a results board
 * fills in across the video. Cool concrete #D9DCDA, ink #0E0E0E, the crash marker (yellow / black quarters) is the only yellow,
 * survived green #087A47, wiped red #E5262A. Type set 03 Heavy + light (2026-11-07): Helvetica Neue Bold + Light, DM Mono labels;
 * no thick borders, no outlined captions, stamps without frames (TYPE-SYSTEM.md).
 * Every text editable (CK.text / txt / mono with keys: [word] = a black box, white word), every block movable (grp).
 * Each graphic CK.x(o) returns draw(t, r) (r = the rect it fills): a talking-head layout's o.draw, or a film scene. */
'use strict';
const CK = { conc: '#D9DCDA', ink: '#0E0E0E', yel: '#FFD400', grn: '#087A47', red: '#E5262A', white: '#FFFFFF', mid: '#4A4D4C',
  line: 'rgba(14,14,14,0.14)', lineW: 'rgba(255,255,255,0.16)', panel: '#C9CDCB' };
/* fonts (not in studio/runtime/fonts.css): registered here; moments wait for them (TH.ready), the film before its first frame */
/* type set 03 Heavy + light (inspiration/know-how/TYPE-SYSTEM.md, 2026-11-07): Helvetica Neue Bold 700 (tracking -0.045em, sentence
 * case) with Helvetica Neue Light 300 for the contrast lines, Helvetica Neue 400 body / captions, DM Mono 500 caps labels (+0.12em).
 * Helvetica Neue is the Mac's own font (drawn by name); DM Mono comes from studio/runtime/fonts.css. */
const CKF = Promise.all(['700 40px "Helvetica Neue"', '300 40px "Helvetica Neue"', '400 40px "Helvetica Neue"', '500 40px "DM Mono"'].map(f => document.fonts.load(f))).catch(e => console.error('cookies fonts', e));

G.ckLab = { bg: CK.conc, fg: CK.ink, mid: CK.mid, line: CK.line, acc: CK.ink, card: CK.white, panel: CK.panel, grid: CK.line, mode: 'light' };
G.ckInk = { bg: CK.ink, fg: CK.white, mid: '#A9AEAC', line: CK.lineW, acc: CK.grn, card: CK.white, panel: '#1E1F1F', grid: CK.lineW, mode: 'dark' };
G.ckWhite = { bg: CK.white, fg: CK.ink, mid: '#5A5D5C', line: CK.line, acc: CK.ink, card: CK.white, panel: '#EEF0EF', grid: CK.line, mode: 'light' };
G.ckLab.altKey = 'ckInk'; G.ckInk.altKey = 'ckLab';
F.disp = (s, w = 700) => `${w >= 500 ? 700 : 300} ${s}px "Helvetica Neue"`;
F.light = (s) => `300 ${s}px "Helvetica Neue"`;
F.body = (s, w = 400) => `${w >= 650 ? 700 : w >= 450 ? 500 : 400} ${s}px "Helvetica Neue"`;
F.mono = (s, w = 500) => `500 ${s}px "DM Mono"`;
F.serif = (s) => `300 ${s}px "Helvetica Neue"`;
LS.disp = -0.045; LS.body = -0.01; LS.mono = 0.12; LS.serif = -0.02;
if (typeof PLATE !== 'undefined') { PLATE.ck = [CK.white, CK.ink, CK.ink]; PLATE.ckInk = [CK.ink, CK.white, CK.grn]; }

const ckE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
CK.sfx = (role, t, db = 0) => { if (t != null && t >= 0 && t < TOTAL) sfx(role, t, db); };
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word, nth = 0) {
  const want = String(word).split(/\s+/).map(norm).filter(Boolean);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length); let c = 0;
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) { if (c++ === nth) return ph.w[k]; }
  console.warn('WT: word not found', word); return ph.t;
}
CK.short = () => !!(typeof FOOT !== 'undefined' && PORTRAIT && FOOT.m && FOOT.m.kind === 'short');
function clipR(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
/** fit a design space (wide 1600 x 840, or tall 900 x 1000 when the rect is not wide) into rect r, centred; fn(L) draws in it */
CK.fit = (r, fn, o = {}) => {
  const wide = o.wide != null ? o.wide : r.w / r.h >= 1.35; const dw = wide ? (o.dw || 1600) : (o.tw || 900), dh = wide ? (o.dh || 840) : (o.th || 1000);
  const k = Math.min(r.w / dw, r.h / dh) * (o.k || 0.94); const x = r.x + (r.w - dw * k) / 2, y = r.y + (r.h - dh * k) * (o.top ? 0 : 0.5);
  const lw0 = CK.LW; CK.LW = dw; withT(x, y, k, 0, () => fn({ w: dw, h: dh, wide })); CK.LW = lw0;
};
/** the crash-test marker: a circle in yellow / black quarters (the only yellow), ink ring */
CK.mark = (cx, cy, d, rot = 0) => {
  const r = d / 2; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, -Math.PI / 2 + i * Math.PI / 2, i * Math.PI / 2); ctx.closePath(); ctx.fillStyle = i % 2 ? CK.ink : CK.yel; ctx.fill(); }
  ctx.restore();
};
/** editable text. def may hold '\n' and [word] (a black box, the word in white or o.hiCol; it sweeps in at o.hits).
 *  o.font 'disp' (Helvetica Neue Bold; lines after the first Light) | 'mono' (DM Mono, caps) | 'code' (DM Mono, as typed); o.at + o.enter ('rise' | 'slam' | 'drop' |
 *  'type'); o.maxW shrinks to fit; o.align; o.col; o.lh. Returns {w, h, size}. */
CK.text = (t, key, def, x, y, size, o = {}) => {
  const ov = o.raw ? { s: null, hide: false, dx: 0, dy: 0, k: 1 } : ovr(key); let str = ov.s != null ? ov.s : def;
  const kind = o.font || 'disp'; const up = o.upper != null ? o.upper : kind === 'mono';
  const ff = (z, light) => kind === 'disp' ? (light ? F.light(z) : F.disp(z, 700)) : F.mono(z, 500);
  const lsp = (z) => kind === 'disp' ? -0.045 * z : kind === 'mono' ? z * 0.12 : 0;
  const U = (s) => (up ? s.toUpperCase() : s); const plain = (l) => U(l.replace(/[\[\]]/g, ''));
  let lines = String(str).split('\n'); let z = size; const wid = (zz) => Math.max(...lines.map(l => tw(plain(l), ff(zz), lsp(zz))));
  if (o.maxW && wid(z) > o.maxW && o.wrap !== false && kind === 'disp') {   // too wide: break into more lines first (keeps the type big), then shrink
    const ws = String(str).replace(/\n/g, ' ').match(/\[[^\]]+\]\S*|\S+/g) || []; const z0 = z;
    const rewrap = (zz) => { const out = []; let cur = ''; for (const w of ws) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(plain(nx), ff(zz), lsp(zz)) > o.maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
    while (z > z0 * 0.78 && wid(z) > o.maxW) { lines = rewrap(z); if (wid(z) <= o.maxW) break; z -= 2; }
    if (wid(z) > o.maxW) lines = rewrap(z); }
  if (o.maxW) while (wid(z) > o.maxW && z > 16) z -= 2;
  const font = ff(z), lh = (o.lh || (kind === 'disp' ? 1.02 : 1.3)) * z, W_ = wid(z), H_ = (lines.length - 1) * lh + z * (kind === 'disp' ? 0.92 : 1.05);
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x; const top = y - z * (kind === 'disp' ? 0.8 : 0.82);
  const info = { text: str, def, label: o.label || 'text ([word] = black box)' };
  if (ov.hide) { regBox(ov, bx, top, W_, H_, info); return { w: W_, h: H_, size: z }; }
  const at = o.at == null ? -1e9 : o.at; if (t < at) { if (!o.raw) regBox(ov, bx, top, W_, H_, info); return { w: W_, h: H_, size: z }; }
  const en = o.enter || 'rise'; const p = ckE(t, at, en === 'slam' ? 0.3 : en === 'drop' ? 0.35 : 0.4, en === 'drop' ? 'outBack' : 'outQuint');
  let nChars = 1e9; if (en === 'type') nChars = Math.floor((t - at) * (o.cps || 30));
  moved(ov, () => {
    const draw = () => { let used = 0; let bi = 0;
      lines.forEach((l, li) => { const lf = kind === 'disp' && (o.f === 'light' || (o.light !== false && li > 0 && !/\[/.test(l))) ? ff(z, true) : font;   // heavy + light: the lines after the first are Light
        const lw = tw(plain(l), lf, lsp(z)); let xx = o.align === 'center' ? x - lw / 2 : o.align === 'right' ? x - lw : x; const yy = y + li * lh;
        for (const part of l.split(/(\[[^\]]+\])/).filter(Boolean)) {
          const bl = part[0] === '['; const s0 = U(bl ? part.slice(1, -1) : part); const s = s0.slice(0, clamp(nChars - used, 0, s0.length)); used += s0.length;
          const w = tw(s0, lf, lsp(z));
          if (bl) { const ht = Array.isArray(o.hits) ? o.hits[Math.min(bi, o.hits.length - 1)] : o.hits != null ? o.hits : at + 0.25; bi++;   // [word]: turns the accent colour on her word (no box)
            const q = ckE(t, ht, 0.3, 'outQuint'); _txt(s, xx, yy, font, o.col || CK.ink, 'left', 'alphabetic', lsp(z));
            if (q > 0) withA(q, () => _txt(s, xx, yy, font, o.hiCol || o.boxCol || CK.grn, 'left', 'alphabetic', lsp(z))); }
          else _txt(s, xx, yy, lf, o.col || CK.ink, 'left', 'alphabetic', lsp(z));
          xx += w; }
        used += 1; });
      if (en === 'type' && nChars < used && nChars >= 0) { /* a steady caret while it types (no blinking) */ }
    };
    if (en === 'slam') { const k = 1.18 - 0.18 * p; const ax = o.align === 'center' ? x : bx; withA(clamp(p * 3), () => withT(ax * (1 - k), (top + H_ / 2) * (1 - k), k, 0, draw)); }
    else if (en === 'drop') withA(clamp(p * 3), () => withT(0, -(1 - p) * z * 0.5, 1, 0, draw));
    else if (en === 'type') draw();
    else withA(clamp(p * 2), () => withT(0, (1 - p) * z * 0.3, 1, 0, draw));
    if (!o.raw) regBox(ov, bx, top, W_, H_, info);
  });
  return { w: W_, h: H_, size: z };
};
/** a mono label line (editable); returns its width */
CK.LW = 0;
CK.lab = (key, s, x, y, z, col = CK.ink, align = 'left', o = {}) => { const mw = CK.LW && align === 'left' && x < CK.LW ? CK.LW - x - 30 : undefined; mono(s, x, y, z, col, align, { key, fixed: true, maxW: mw, ...o }); return monoW(s, z, { fixed: true }); };
/** kicker (mono, with an optional crash marker before it) + a big title. o.enter, o.size, o.marker */
CK.head = (t, x, y, kicker, title, at, o = {}) => {
  const z = o.size || 150, km = o.kz || 44; let yy = y;
  if (kicker) { const a = ckE(t, at, 0.35); withA(a, () => { let xx = x; if (o.marker) { CK.mark(x + km * 0.75, yy - km * 0.35, km * 1.5, (1 - a) * 1.6); xx += km * 2; } CK.lab('kicker', kicker, xx, yy, km, o.kcol || CK.ink); }); yy += km * 0.4 + z * 0.92; }
  const b = CK.text(t, 'title', title, x, yy, z, { at: at + (kicker ? 0.12 : 0), enter: o.enter || 'rise', maxW: o.maxW, lh: o.lh, col: o.col, hits: o.hits, align: o.align });
  return yy + b.h - z * 0.8;
};
/** a stamp: bold coloured words, no frame, a slight tilt; lands 1.6 -> 1 in 0.35 s */
CK.stamp = (t, key, s, col, x, y, at, rot = -6, size = 140) => {
  if (t < at) return; const p = ckE(t, at, 0.35, 'outBack'); const k = 1.6 - 0.6 * p;
  const ov = ovr(key); const str = (ov.s != null ? ov.s : s); const f = F.disp(size); const w = tw(str, f) + size * 0.5, h = size * 1.12, bw = Math.max(6, size * 0.07);
  if (ov.hide) { regBox(ov, x, y, w, h, { text: str, def: s }); return; }
  moved(ov, () => { withA(clamp((t - at) / 0.08), () => withT(x + w / 2, y + h / 2, k, rot * Math.PI / 180, () => {
    _txt(str, 0, size * 0.36, f, col, 'center', 'alphabetic', -0.045 * size); }));
    regBox(ov, x, y, w, h, { text: str, def: s }); });
};
/** the checkout form under test: three fields (Ada Okafor / Tartu mnt 12 / Tallinn), wiped letter by letter from o.wipeAt,
 *  shaking from o.shakeAt for 0.9 s; o.empty: no values at all; o.title (mono label above). x, y top-left; width 560 x s */
CK.form = (t, x, y, s = 1, o = {}) => {
  const vals = ['Ada Okafor', 'Tartu mnt 12', 'Tallinn']; const sh = o.shakeAt != null && t > o.shakeAt && t < o.shakeAt + 0.9 ? Math.sin((t - o.shakeAt) * 60) * 9 * (1 - (t - o.shakeAt) / 0.9) : 0;
  const wipe = o.wipeAt != null ? clamp((t - o.wipeAt) / 0.5) : 0;
  grp('form', x, y, 560 * s, 330 * s, () => withT(x + sh, y, s, 0, () => {
    CK.lab('form label', o.title || 'Checkout form', 0, 40, 40);
    vals.forEach((v, i) => { const fy = 66 + i * 90; rect(0, fy, 560, 74, CK.white);       if (o.empty) return; const keep = Math.round(v.length * (1 - clamp(wipe * 1.6 - i * 0.3))); if (keep > 0) _txt(v.slice(0, keep), 24, fy + 49, F.mono(34, 500), CK.ink); });
  }));
};
/** the cart card: a bag line and the cart with its badge (n), o.title */
CK.cartCard = (t, x, y, s = 1, o = {}) => {
  grp('cart', x, y, 560 * s, 330 * s, () => withT(x, y, s, 0, () => {
    CK.lab('cart label', o.title || 'Cart', 0, 40, 40);
    rect(0, 66, 560, 254, CK.white);     const n = o.n == null ? 2 : o.n; ['Canvas tote', 'Running shoes'].slice(0, Math.max(0, Math.min(2, n))).forEach((s_, i) => {
      rect(28, 100 + i * 100, 64, 64, CK.ink); _txt(s_, 116, 146 + i * 100, F.mono(34, 500), CK.ink); });
    if (!n) _txt('Your cart is empty', 28, 205, F.mono(34, 500), CK.mid);
    const bx = 500, by = 66; circle(bx, by, 40, CK.ink); _txt(String(n), bx, by + 15, F.disp(48), CK.white, 'center');
  }));
};
/** a big browser tab with the x button (pressed from o.pressAt for 0.25 s), o.gone (0..1: falls and fades) */
CK.tab = (t, x, y, w, title, o = {}) => {
  const press = o.pressAt != null ? clamp((t - o.pressAt) / 0.25) : 0; const gone = o.goneAt != null ? ckE(t, o.goneAt, 0.35) : 0;
  withA(1 - gone * 0.85, () => grp('tab', x, y + gone * 40, w, 118, () => {
    const yy = y + gone * 40; ctx.fillStyle = CK.white; rr(x, yy, w, 118, 26); ctx.fill(); rect(x, yy + 90, w, 28, CK.white);
    ctx.strokeStyle = CK.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy + 118); ctx.lineTo(x, yy + 26); ctx.arcTo(x, yy, x + 26, yy, 26); ctx.lineTo(x + w - 26, yy); ctx.arcTo(x + w, yy, x + w, yy + 26, 26); ctx.lineTo(x + w, yy + 118); ctx.stroke();
    circle(x + 50, yy + 59, 17, CK.ink); CK.lab('tab title', title, x + 90, yy + 72, 34, CK.ink, 'left', { lower: true });
    const pr = press > 0 && press < 1 ? Math.sin(Math.PI * press) : 0; const cx = x + w - 66, cy = yy + 59;
    if (press > 0) circle(cx, cy, 33 * (1 - 0.12 * pr), CK.ink);
    _txt('×', cx, cy + 17, F.mono(50, 500), press > 0 ? CK.white : CK.ink, 'center');
  }));
};
/** a crash-test result dot (check / cross / *) */
CK.dot = (t, cx, cy, r, v, at) => { if (t < at) return; const k = ckE(t, at, 0.3, 'outBack'); const col = v === 'dep' ? CK.yel : v === 'ok' ? CK.grn : CK.red;
  withT(cx, cy, k, 0, () => { circle(0, 0, r, col); ctx.strokeStyle = v === 'dep' ? CK.ink : CK.white; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
    if (v === 'ok') { ctx.moveTo(-r * 0.4, 0.02 * r); ctx.lineTo(-r * 0.08, r * 0.34); ctx.lineTo(r * 0.44, -r * 0.3); ctx.stroke(); }
    else if (v === 'gone') { ctx.moveTo(-r * 0.32, -r * 0.32); ctx.lineTo(r * 0.32, r * 0.32); ctx.moveTo(r * 0.32, -r * 0.32); ctx.lineTo(-r * 0.32, r * 0.32); ctx.stroke(); }
    else _txt('*', 0, r * 0.62, F.disp(r * 1.5), CK.ink, 'center'); }); };
/** draw an image to cover rect (x, y, w, h); fx/fy = focus */
CK.cover = (key, x, y, w, h, fx = 0.5, fy = 0.5) => { const im = IMG[key]; if (!im) { rect(x, y, w, h, CK.panel); return; }
  const k = Math.max(w / im.width, h / im.height), iw = im.width * k, ih = im.height * k;
  clipR(x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x + (w - iw) * fx, y + (h - ih) * fy, iw, ih))); };
/** a black terminal / code panel: lines [{s, at, col}] type on (40 cps); o.kicker in yellow-free green mono */
CK.term = (t, x, y, w, h, lines, o = {}) => {
  const f0 = Math.min(...lines.map(l => (l.at == null ? -1e9 : l.at))); const pin = ckE(t, f0 - 0.35, 0.35); if (pin <= 0) return;   // the panel opens just before its first line (never an empty box waiting)
  grp(o.key || 'code', x, y, w, h, () => {
    rect(x, y, w * (0.2 + 0.8 * pin), h, CK.ink); if (pin < 0.98) return; const z = o.z || 40, pad = z * 1.0; let yy = y + pad + z * 0.8;
    if (o.kicker) { CK.lab('code kicker', o.kicker, x + pad, yy, Math.max(32, z * 0.85), '#A9AEAC'); yy += z * 1.6; }
    lines.forEach((l, i) => { const at = l.at == null ? -1e9 : l.at; if (t < at - 0.05) { yy += z * (l.gap || 1.45); return; }
      const n = Math.floor((t - at) * (l.cps || 40)); const ov = ovr('line ' + i); const s = ov.s != null ? ov.s : l.s;
      moved(ov, () => { _txt(s.slice(0, Math.max(0, n)), x + pad, yy, F.mono(l.z || z, l.w || 500), l.col || CK.white);
        regBox(ov, x + pad, yy - z * 0.8, Math.min(w - 2 * pad, tw(s, F.mono(l.z || z, 500))), z * 1.1, { text: s, def: l.s }); });
      yy += z * (l.gap || 1.45); });
  });
};
/** a white receipt card: a real page crop (IMG key), highlighter sweeps over boxes hl [[x0, y0, x1, y1] in source px] from at;
 *  credit line under it. Draws in (x, y, w); returns its height */
CK.clip = (t, key, x, y, w, hl, at, credit, o = {}) => {
  const im = IMG[key]; const cr = o.crop || (im ? [0, 0, im.width, im.height] : [0, 0, 1, 0.2]); const cw = cr[2] - cr[0], chh = cr[3] - cr[1];   // o.crop: only the lines she talks about (readable on a phone)
  const ih = w * chh / cw; const pad = o.pad == null ? 26 : o.pad;
  const p = ckE(t, (o.inAt != null ? o.inAt : at - 0.6), 0.5);
  withA(clamp(p * 2), () => grp('page ' + key, x, y + (1 - p) * 40, w + 2 * pad, ih + 2 * pad, () => {
    const yy = y + (1 - p) * 40; rect(x, yy, w + 2 * pad, ih + 2 * pad, CK.white);     if (im) themeFixed(() => ctx.drawImage(im, cr[0], cr[1], cw, chh, x + pad, yy + pad, w, ih)); const k = w / cw;
    (hl || []).forEach((b, i) => { const q = ckE(t, at + i * 0.45, 0.5, 'inOutQuart'); if (q <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'multiply';
      rect(x + pad + (b[0] - cr[0]) * k, yy + pad + (b[1] - cr[1]) * k, (b[2] - b[0]) * k * q, (b[3] - b[1]) * k, o.hl || '#B9F2D3'); ctx.restore(); });
  }, { img: true }));
  if (credit) withA(p, () => CK.lab('credit', credit, x, y + ih + 2 * pad + 52, o.cz || 34, CK.ink, 'left', { lower: true }));
  return ih + 2 * pad + (credit ? 70 : 0);
};
/** thin floor grid (only on the results board) */
CK.floor = (L, step = 120) => { ctx.fillStyle = CK.line; for (let x = 0; x <= L.w; x += step) ctx.fillRect(x, 0, 1, L.h); for (let y = 0; y <= L.h; y += step) ctx.fillRect(0, y, L.w, 1); };

/* ============================== graphics: CK.x(o) -> (t, r) ============================== */
const ground = (r, col = CK.conc) => rect(r.x, r.y, r.w, r.h, col);
/** a headline card: kicker + big title (+ o.sub mono line), o.at, o.enter; o.ink: black phrase card look */
CK.say = (o) => (t, r) => { ground(r, o.ink ? CK.ink : CK.conc);
  CK.fit(r, (L) => { const m = L.wide ? 90 : 60; const n = String(o.title).split('\n').length; const z = o.size || (L.wide ? 170 : 150);
    const y0 = L.h * (o.y || 0.5) - (n * z * 0.9) / 2 + (o.kicker ? -10 : z * 0.4);
    const yb = CK.head(t, m, y0, o.kicker, o.title, o.at || 0, { size: z, enter: o.enter, maxW: L.w - 2 * m, col: o.ink ? CK.white : CK.ink, kcol: o.ink ? '#A9AEAC' : CK.ink, marker: o.marker, hits: o.hits });
    if (o.sub) withA(ckE(t, o.subAt != null ? o.subAt : (o.at || 0) + 0.5, 0.4), () => CK.text(t, 'sub', o.sub, m, yb + 110, L.wide ? 50 : 46, { font: 'mono', upper: false, col: o.ink ? CK.white : CK.ink, maxW: L.w - 2 * m })); });
};
/** the topic card: three test subjects (cookie tag / cart / form), each lands on her word (o.at = [t1, t2, t3]) */
CK.topic = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const names = ['Cookies,', 'localStorage,', 'sessionStorage']; const z = L.wide ? 170 : 130; const x = L.wide ? 90 : 60; const y0 = L.h / 2 - z * 1.1;
    names.forEach((nm, i) => { const at = o.at[i]; if (t < at - 0.05) return; const p = ckE(t, at, 0.35); const y = y0 + i * z * 1.08;
      withA(clamp(p * 2), () => withT(0, (1 - p) * z * 0.3, 1, 0, () => { CK.text(t, 'name' + i, nm, x, y, z, { light: false, w: 700, raw: false, maxW: L.w - x - 220, f: i ? 'light' : 'bold' }); }));
      withA(p, () => { ctx.save(); ctx.translate(L.w - 120, y - z * 0.35); ctx.scale(0.55, 0.55); CK.icon(i, 0, 0); ctx.restore(); }); });
    withA(ckE(t, o.at[0] - 0.3, 0.3), () => CK.lab('topic kicker', 'Three places in your browser', x, y0 - z * 1.1, 40)); });
};
/** small drawn icons: 0 cookie tag, 1 cart, 2 form */
CK.icon = (i, x, y) => { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = CK.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (i === 0) { ctx.strokeRect(-70, -50, 140, 120); circle(0, -20, 12, CK.ink); ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, -90); ctx.stroke(); _txt('117', 0, 50, F.disp(52), CK.ink, 'center'); }
  else if (i === 1) { ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(-60, -60); ctx.lineTo(-35, 40); ctx.lineTo(70, 40); ctx.lineTo(90, -30); ctx.lineTo(-50, -30); ctx.stroke(); circle(-25, 72, 12, CK.ink); circle(60, 72, 12, CK.ink); }
  else { ctx.strokeRect(-80, -80, 160, 170); for (let k = 0; k < 3; k++) rect(-55, -50 + k * 45, 110, 12, CK.ink); }
  ctx.restore(); };
/** HTTP is stateless: two requests go to the server; the second has no link to the first (o.at1, o.at2, o.qAt) */
CK.stateless = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const sx = wide ? 1150 : 450, sy = wide ? 420 : 700;
    if (o.kicker) CK.lab('stateless kicker', o.kicker, wide ? 90 : 60, wide ? 90 : 70, 44);   // (2026-11-07: no default kicker; it re-typed her line)
    // the server box
    rect(sx - 170, sy - 150, 340, 300, CK.ink); CK.lab('server', 'Server', sx, sy + 15, 44, CK.white, 'center');
    const reqs = [{ s: 'GET /login', at: o.at1 }, { s: 'GET /my-orders', at: o.at2 }];
    reqs.forEach((q, i) => { if (t < q.at - 0.05) return; const p = ckE(t, q.at, 0.5);
      const y = wide ? 300 + i * 260 : 200 + i * 190, x0 = wide ? 90 : 60, w = wide ? 600 : 560;
      rect(x0, y, w, 120, CK.white);       CK.lab('req' + i, q.s, x0 + 30, y + 75, 44, CK.ink, 'left', { lower: true });
      // arrow to the server
      const ax0 = wide ? x0 + w + 20 : x0 + w / 2, ay0 = wide ? y + 60 : y + 140; const ax1 = wide ? sx - 190 : sx, ay1 = wide ? sy - 60 + i * 120 : sy - 170;
      ctx.strokeStyle = CK.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.lineTo(ax0 + (ax1 - ax0) * p, ay0 + (ay1 - ay0) * p); ctx.stroke(); });
    if (o.qAt != null && t >= o.qAt) { const p = ckE(t, o.qAt, 0.35, 'outBack'); withT(sx + 130, sy - 170, p, 0, () => { circle(0, 0, 70, CK.red); _txt('?', 0, 30, F.disp(100), CK.white, 'center'); }); CK.sfx; }
    if (o.foot) withA(ckE(t, o.footAt || o.qAt || 0, 0.4), () => CK.text(t, 'foot', o.foot, wide ? 90 : 60, wide ? 790 : 960, wide ? 60 : 56, { maxW: L.w - 140 })); });
};
/** the cloakroom: the real photo, the brass-free A-style ticket that flips to the cookie (o.at, o.flipAt) */
CK.cloak = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const k = ckE(t, o.at || 0, 0.5);
    const tl = o.title ? String(o.title).split('\n').length : 0; const ph = wide ? [80, 150 + (tl > 1 ? 90 : 0), (tl > 1 ? 880 : 980), (tl > 1 ? 540 : 600)] : [60, 60, 780, 520];
    if (o.title) CK.text(t, 'title', o.title, wide ? 80 : 60, wide ? 120 : 730, wide ? 92 : 92, { at: o.titleAt != null ? o.titleAt : o.at, maxW: wide ? 1440 : 780, lh: 0.95 });
    withA(k, () => grp('photo', ph[0], ph[1], ph[2], ph[3], () => { CK.cover('px-cloak', ...ph); }, { img: true }));
    withA(k, () => CK.lab('photo credit', 'Photo: Alari Tammsalu · Pexels', ph[0], ph[1] + ph[3] + 44, 32, CK.ink, 'left', { lower: true }));
    const tg = ckE(t, (o.at || 0) + 0.4, 0.5, 'outBack'); const fl = o.flipAt != null ? E.inOutCubic(clamp((t - o.flipAt) / 0.5)) : 0;
    const tx = wide ? 1190 : 610, ty = wide ? 200 : 380, sc = wide ? 1.0 : 0.62;
    if (t >= (o.at || 0) + 0.4) grp('ticket', tx, ty, 340 * sc, 420 * sc, () => withT(tx + 170 * sc, ty, sc, (-14 + 10 * tg) * Math.PI / 180, () => {
      ctx.scale(Math.max(0.03, Math.abs(Math.cos(Math.PI * fl))), 1);
      ctx.strokeStyle = CK.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 30, 22, Math.PI, 0); ctx.stroke();
      const back = fl > 0.5; rect(-170, 50, 340, 360, back ? CK.ink : CK.white); CK.mark(120, 100, 54);
      if (!back) { _txt('TICKET', -140, 120, F.mono(34, 500), CK.ink); _txt('No. 117', -140, 260, F.disp(100), CK.ink, 'left', 'alphabetic', -4); }
      else { _txt('COOKIE', -140, 120, F.mono(34, 500), '#A9AEAC'); _txt('session_id', -140, 230, F.mono(40, 500), CK.white); _txt('=117', -140, 290, F.mono(56, 600), CK.grn); }
    }));
  });
};
/** the cookie's round trip: browser <-> server; the response brings Set-Cookie (o.setAt), every request carries it back (o.backAt) */
CK.trip = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const bx = wide ? 90 : 60, by = wide ? 240 : 80, bw = wide ? 420 : 780, bh = wide ? 360 : 230;
    const sx = wide ? 1090 : 60, sy = wide ? 240 : 720, sw = bw, sh = bh;
    rect(bx, by, bw, bh, CK.white); rect(bx, by, bw, 56, CK.ink);
    CK.lab('browser', 'Your browser', bx + 30, by + 40, 34, CK.white); CK.lab('shop', o.site || 'shop.example', bx + 30, by + 130, 40, CK.ink, 'left', { lower: true });
    rect(sx, sy, sw, sh, CK.ink); CK.lab('server2', 'Server', sx + sw / 2, sy + sh / 2 + 14, 48, CK.white, 'center');
    const chip = (txt, cx, cy, col) => { const f = F.mono(wide ? 36 : 34, 600); const w = tw(txt, f) + 40; rect(cx - w / 2, cy - 34, w, 68, col); _txt(txt, cx, cy + 12, f, CK.white, 'center'); };
    const lane = (y0, y1, x0, x1, at, txt, col, lab) => { if (t < at - 0.05) return; const p = ckE(t, at, 0.7, 'inOutQuart'); ctx.strokeStyle = CK.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      const pp = 0.22 + 0.56 * p; const cx = x0 + (x1 - x0) * pp, cy = y0 + (y1 - y0) * pp; chip(txt, cx, cy, col); if (lab) withA(ckE(t, at + 0.6, 0.3), () => CK.lab(lab, lab, (x0 + x1) / 2, Math.min(y0, y1) + (wide ? -60 : 0) + (wide ? 0 : 0), 34, CK.ink, 'center')); };
    if (wide) { lane(by + 210, by + 210, sx, bx + bw, o.setAt, 'Set-Cookie: session_id=117', CK.ink, 'Response');
      if (o.backAt != null) lane(by + 310, by + 310, bx + bw, sx, o.backAt, 'Cookie: session_id=117', CK.grn, 'Every request after'); }
    else { lane(sy, by + bh, 300, 300, o.setAt, 'Set-Cookie: session_id=117', CK.ink); if (o.backAt != null) lane(by + bh, sy, 640, 640, o.backAt, 'Cookie: 117', CK.grn); }
    if (o.foot) withA(ckE(t, o.footAt || 0, 0.4), () => CK.text(t, 'foot', o.foot, wide ? 90 : 60, wide ? 760 : 1010, 56, { maxW: L.w - 140 }));
  });
};
/** a generic cookie banner (no brand): Accept all / Necessary only, the cursor taps one (o.at, o.tapAt) */
CK.banner = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const w = wide ? 1100 : 820, h = wide ? 420 : 520, x = (L.w - w) / 2, y = (L.h - h) / 2 + (wide ? 40 : 0); const p = ckE(t, o.at || 0, 0.45);
    withA(clamp(p * 2), () => grp('banner', x, y + (1 - p) * 80, w, h, () => { const yy = y + (1 - p) * 80;
      rect(x, yy, w, h, CK.white);       CK.text(t, 'banner title', 'This site uses cookies', x + 50, yy + 110, wide ? 84 : 72, { maxW: w - 100 });
      txtW('We use cookies to keep you logged in and remember your cart.', x + 50, yy + (wide ? 190 : 200), F.mono(32, 500), CK.ink, w - 100, 44, 0, 'banner body');
      const bw = wide ? 400 : 340, by2 = yy + h - 130; rect(x + 50, by2, bw, 86, CK.ink); _txt('Accept all', x + 50 + bw / 2, by2 + 56, F.disp(42), CK.white, 'center');
      rect(x + 80 + bw, by2, bw, 86, CK.panel); _txt('Necessary only', x + 80 + bw * 1.5, by2 + 56, F.disp(42), CK.ink, 'center'); }));
    if (o.title) CK.text(t, 'title', o.title, wide ? 90 : 60, wide ? 120 : 130, wide ? 92 : 80, { at: o.at, maxW: L.w - 160 }); });
};
/** a code panel full of the rect: o.kicker, o.lines [{s, at}], o.title over it */
CK.code = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; let y = wide ? 90 : 70;
    if (o.title) { const z = o.tz || (wide ? 120 : 110); const b = CK.text(t, 'title', o.title, m, y + z * 0.8, z, { at: o.at, maxW: L.w - 2 * m, enter: o.enter, hits: o.hits }); y += b.h + 50; }
    const z = o.z || (wide ? 44 : 40); const h = Math.min(L.h - y - 40, (o.lines.length * 1.45 + 1.6 + (o.kicker ? 1.6 : 0)) * z + 30);
    CK.term(t, m, y, L.w - 2 * m, h, o.lines, { z, kicker: o.kicker });
    if (o.foot) withA(ckE(t, o.footAt || 0, 0.4), () => CK.text(t, 'foot', o.foot, m, y + h + 90, wide ? 56 : 52, { maxW: L.w - 2 * m, font: o.footMono ? 'mono' : 'disp', upper: !o.footMono })); }, o.fit || {});
};
/** a receipt: kicker + title, the page crop highlighted on her words (o.img, o.hl, o.at, o.credit) */
CK.receipt = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; let y = wide ? 80 : 70;
    if (o.title) { const z = o.tz || (wide ? 120 : 100); y = CK.head(t, m, y + 44, o.kicker, o.title, o.inAt != null ? o.inAt : (o.at || 0) - 0.6, { size: z, maxW: L.w - 2 * m, marker: o.marker }) + 70; }
    const im = IMG[o.img]; const cr = o.crop || (im ? [0, 0, im.width, im.height] : null); let w = L.w - 2 * m - 52; if (cr) w = Math.min(w, (L.h - y - 130) * (cr[2] - cr[0]) / (cr[3] - cr[1]));
    CK.clip(t, o.img, m, y, w, o.hl, o.at || 0, o.credit, { inAt: o.inAt != null ? o.inAt : (o.at || 0) - 0.6, cz: wide ? 36 : 34, crop: o.crop }); });
};
/** 4 KB (a cookie) vs about 5 MB (localStorage, per website): o.at (counter), o.at2 (the localStorage block) */
CK.scale = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.head(t, m, wide ? 110 : 90, 'Cookie vs localStorage', 'How much fits?', o.headAt != null ? o.headAt : o.at - 0.4, { size: wide ? 130 : 120 });
    const a = wide ? [m, 330, 680, 420] : [m, 350, 800, 270], b = wide ? [m + 740, 330, 680, 420] : [m, 680, 800, 270];
    if (t >= o.at - 0.1) { const n = Math.round(4096 * ckE(t, o.at, 1.1)); rect(a[0], a[1], a[2], 2, CK.ink); CK.lab('cookie lbl', 'One cookie', a[0], a[1] + 60, 40);   // bare numbers on a hairline (no slabs)
      _txt((n / 1024).toFixed(n < 4096 ? 1 : 0) + ' KB', a[0], a[1] + a[3] - 50, F.disp(wide ? 220 : 180), CK.ink, 'left', 'alphabetic', -0.045 * (wide ? 220 : 180)); }
    if (o.at2 != null && t >= o.at2 - 0.1) { const p = ckE(t, o.at2, 0.4); withA(p, () => { rect(b[0], b[1], b[2], 2, CK.ink); CK.lab('ls lbl', 'localStorage, per website', b[0], b[1] + 60, 40); _txt('≈ 5 MB', b[0], b[1] + b[3] - 50, F.light(wide ? 220 : 180), CK.grn, 'left', 'alphabetic', -0.045 * (wide ? 220 : 180)); }); }
    withA(ckE(t, o.at + 0.6, 0.4), () => CK.lab('scale src', o.src || 'Sources: RFC 6265 · MDN', m, wide ? 800 : 1000, 34, CK.ink, 'left', { lower: true })); });
};
/** session cookie vs persistent cookie (o.at1 / o.at2): two rows, a stamp on each */
CK.expiry = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.head(t, m, wide ? 110 : 90, 'How long a cookie lives', 'Expiry?', o.headAt != null ? o.headAt : o.at1 - 0.4, { size: wide ? 130 : 120 });
    const rows = [{ k: 'Session cookie', c: 'Set-Cookie: id=117', s: o.foot ? 'Gone*' : 'Gone', col: CK.red, at: o.at1, foot: o.foot ? '* when the browser closes, unless it restores your tabs' : null },
      { k: 'Persistent cookie', c: 'Set-Cookie: id=117; Max-Age=2592000', s: 'Stays', col: CK.grn, at: o.at2 }];
    rows.forEach((q, i) => { if (q.at == null || t < q.at - 0.1) return; const y = (wide ? 320 : 330) + i * (wide ? 230 : 340); const p = ckE(t, q.at, 0.4);
      withA(p, () => { rect(m, y - 10, L.w - 2 * m, 3, CK.ink); CK.lab('k' + i, q.k, m, y + 60, 44); CK.lab('c' + i, q.c, m, y + 130, wide ? 38 : 30, CK.mid, 'left', { lower: true }); });
      CK.stamp(t, 's' + i, q.s, q.col, wide ? L.w - m - 360 : L.w - m - 250, y + (wide ? 20 : 0), q.at + 0.5, -5, wide ? 100 : 76);
      if (q.foot) withA(ckE(t, q.at + 1.0, 0.4), () => CK.lab('f' + i, q.foot, m, y + (wide ? 190 : 260), 32, CK.ink, 'left', { lower: true, maxW: L.w - 2 * m })); }); });
};
/** a crash test: o.n ('01'), o.name ('Refresh the page'), o.head ('Refresh'), o.subject 'form' | 'cart' | 'login', o.test 'refresh' |
 *  'tab' | 'browser' | 'incognito', o.at (the test word), o.result 'there' | 'gone', o.resAt (the stamp), o.enter */
CK.test = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; const at = o.at;
    withA(ckE(t, at - 0.3, 0.3), () => { CK.mark(m + 34, wide ? 70 : 70, 64); CK.lab('test label', 'Test ' + o.n + ' · ' + o.name, m + 90, wide ? 86 : 86, wide ? 44 : 38); });
    const hz = wide ? 200 : 170; CK.text(t, 'head', o.head, m, (wide ? 140 : 150) + hz * 0.8, hz, { at: at - 0.05, enter: o.enter || 'slam', maxW: wide ? 1000 : L.w - 2 * m - 180, wrap: false });
    // the test's own prop: the refresh arrow spins / the tab is closed / the window shuts
    const px = wide ? 1150 : L.w - m - 110, py = wide ? 250 : 385;
    if (o.test === 'refresh') { const spin = E.inOutCubic(clamp((t - at - 0.1) / 0.9)) * Math.PI * 2; withT(px + (wide ? 100 : 0), py, 1, spin, () => { ctx.strokeStyle = CK.ink; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 70, -1.1, Math.PI * 1.55); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -100); ctx.lineTo(35, -55); ctx.lineTo(-10, -45); ctx.stroke(); }); }
    const sy = wide ? 420 : 470; const s = wide ? 1.25 : 1.2;
    if (o.test === 'tab' || o.test === 'incognito') CK.tab(t, wide ? 900 : m, wide ? 440 : sy - 10, wide ? 600 : L.w - 2 * m, o.test === 'incognito' ? 'Private window' : 'shop.example · checkout', { pressAt: at + 0.55, goneAt: at + 0.75 });
    const subY = wide ? 400 : (o.test === 'tab' || o.test === 'incognito' ? sy + 160 : sy);
    const wipe = o.result === 'gone' ? (o.resAt || at + 1.0) - 0.15 : null;
    if (o.test === 'browser') { const sh = o.shutAt != null ? o.shutAt : at + 0.3, op = o.openAt; const cl = ckE(t, sh, 0.35, 'inOutQuart') * (op != null ? 1 - ckE(t, op, 0.4) : 1);
      const bx = wide ? m : m, by = subY - 30, bw = wide ? 760 : L.w - 2 * m, bh = 330 * s + 80;
      if (cl > 0.02) { withA(cl, () => { rect(bx, by, bw, bh, CK.ink); CK.lab('closed', 'Browser closed', bx + bw / 2, by + bh / 2 + 14, 44, CK.white, 'center'); }); }
      if (cl < 0.98) withA(1 - cl, () => (o.subject === 'cart' ? CK.cartCard : CK.form)(t, m + 20, subY, s, { n: 2 })); }
    else (o.subject === 'cart' ? CK.cartCard : CK.form)(t, m, subY + (wide ? 0 : 0), s, { wipeAt: wipe, shakeAt: at + 0.15, n: 2 });
    if (o.resAt != null) CK.stamp(t, 'stamp', o.result === 'gone' ? 'Gone' : 'Still there', o.result === 'gone' ? CK.red : CK.grn, wide ? 820 : m + 60, wide ? (o.test === 'tab' || o.test === 'incognito' ? 640 : 520) : (o.test === 'tab' || o.test === 'incognito' ? 905 : 875), o.resAt, -5, wide ? 120 : 100); });
};
/** the results board (the spine): rows Login / Cart / Form x Refresh / Close tab / Close browser / Close incognito.
 *  o.cells: [[row, col, at], ...] cells to show (each lands at its time); o.at (board in); o.foot (the * note) at o.footAt;
 *  o.hi: a row index highlighted (black box behind its name) from o.hiAt */
CK.RES = [['ok', 'ok', 'dep', 'gone'], ['ok', 'ok', 'ok', 'gone'], ['ok', 'gone', 'gone', 'gone']];
CK.board = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; CK.floor(L);
    const rows = [['Login', 'cookie (HttpOnly)'], ['Cart', 'localStorage'], ['Form', 'sessionStorage']], cols = ['Refresh', 'Close tab', 'Close browser', 'Private window'];
    const nc = wide ? 4 : 4; const cw = wide ? 260 : 140, rw = wide ? 440 : 280, x0 = wide ? 60 : 30, y0 = wide ? 340 : 360, rh = wide ? 138 : 190;
    CK.head(t, x0, wide ? 56 : 80, o.kicker || "Results · Ada's shop", o.title || 'What survives?', o.at || 0, { size: wide ? 120 : 110, kz: wide ? 36 : 36, maxW: wide ? 1500 : 840 });
    cols.slice(0, nc).forEach((c, i) => withA(ckE(t, o.at || 0, 0.4), () => CK.text(t, 'col' + i, c.replace(' ', '\n'), x0 + rw + i * cw + cw / 2, y0 - (wide ? 62 : 62), wide ? 32 : 26, { font: 'mono', align: 'center', lh: 1.15 })));
    rows.forEach((q, j) => { const y = y0 + j * rh; withA(ckE(t, (o.at || 0) + 0.1 * j, 0.4), () => { rect(x0, y, rw + nc * cw, 3, CK.ink);
      if (o.hi === j && o.hiAt != null && t >= o.hiAt) { const p = ckE(t, o.hiAt, 0.35, 'outExpo'); rect(x0 - 10, y + 12, (rw - 10) * p, rh - 22, CK.ink); }
      const inv = o.hi === j && o.hiAt != null && t >= o.hiAt + 0.1;
      CK.text(t, 'row' + j, q[0], x0, y + (wide ? 68 : 80), wide ? 64 : 60, { col: inv ? CK.white : CK.ink });
      CK.lab('rowsub' + j, q[1], x0, y + (wide ? 112 : 128), wide ? 32 : 28, inv ? CK.white : CK.ink, 'left', { lower: true }); }); });
    (o.cells || []).forEach(([j, i, at]) => { if (i >= nc) return; CK.dot(t, x0 + rw + i * cw + cw / 2, y0 + j * rh + rh / 2 + 4, wide ? 50 : 40, CK.RES[j][i], at); });
    if (o.foot) withA(ckE(t, o.footAt || 0, 0.4), () => txtW(o.foot, x0, y0 + 3 * rh + 50, F.mono(wide ? 32 : 30, 500), CK.ink, L.w - 2 * x0, wide ? 42 : 40, 0, 'board foot')); });
};
/** the origin: the address bar splits into protocol / domain / port (o.at = [t1, t2, t3]) */
CK.origin = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.head(t, m, wide ? 110 : 100, null, 'The origin', o.at[0] - 0.5, { size: wide ? 140 : 130 });
    const parts = [['https://', 'Protocol'], ['shop.example', 'Domain'], [':443', 'Port']]; const z = wide ? 74 : 44; const f = F.mono(z, 600);
    let x = m + 40; const y = wide ? 470 : 520; const totalW = parts.reduce((a, p) => a + tw(p[0], f), 0) + 80;
    rect(m, y - z * 1.3, Math.min(L.w - 2 * m, totalW + 40), z * 2.0, CK.white);     parts.forEach((q, i) => { const w = tw(q[0], f); const at = o.at[i]; const on = t >= at; _txt(q[0], x, y, f, CK.ink);
      if (on) { const p = ckE(t, at, 0.6, 'outQuint'); const bx = x - 6, by = y + z * 0.9; withA(clamp(p * 2), () => { rect(bx, y + z * 0.45, w + 12, 8, CK.ink); CK.text(t, 'part' + i, q[1], x + w / 2, by + (wide ? 90 : 80) * p, wide ? 70 : 56, { align: 'center', raw: false }); }); }
      x += w; }); });
};
/** a page with three scripts that can all read localStorage (o.at = [t1, t2, t3]) and the stored cart */
CK.scripts = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50;
    CK.head(t, m, wide ? 110 : 90, 'Inside the browser', o.title || 'Scripts on the page', o.at[0] - 0.5, { size: wide ? 120 : 100, maxW: L.w - 2 * m });
    const ss = ['your-app.js', 'analytics.js', 'chat-widget.js']; const sx = m, sy0 = wide ? 360 : 330, sw = wide ? 560 : 520;
    const lx = wide ? 1050 : 120, ly = wide ? 430 : 820, lw = wide ? 460 : 660, lh = wide ? 260 : 200;
    rect(lx, ly, lw, lh, CK.ink); CK.lab('ls box', 'localStorage', lx + 36, ly + 70, 40, CK.white); CK.lab('ls kv', 'cart → [{"id":17}]', lx + 36, ly + (wide ? 150 : 140), wide ? 34 : 32, CK.grn, 'left', { lower: true });
    ss.forEach((s_, i) => { const at = o.at[i]; if (t < at - 0.1) return; const p = ckE(t, at, 0.4); const y = sy0 + i * (wide ? 150 : 140);
      withA(p, () => { rect(sx, y, sw, 100, i ? CK.white : CK.white);         CK.lab('script' + i, '<script src="' + s_ + '">', sx + 24, y + 62, wide ? 30 : 28, CK.ink, 'left', { lower: true });
        const q = ckE(t, at + 0.2, 0.45, 'inOutQuart'); const x0 = sx + sw, y0_ = y + 50, x1 = wide ? lx : lx + 80 + i * 200, y1 = wide ? ly + 40 + i * 90 : ly;
        ctx.strokeStyle = i === 0 ? CK.ink : CK.red; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0_); ctx.lineTo(x0 + (x1 - x0) * q, y0_ + (y1 - y0_) * q); ctx.stroke(); }); }); });
};
/** cookies travel, web storage stays: the browser, the server, a cookie chip rides each request (o.at); o.stayAt: localStorage
 *  / sessionStorage boxes stay inside the browser with "never sent by itself" */
CK.wire = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50;
    const bx = m, by = wide ? 220 : 120, bw = wide ? 760 : L.w - 2 * m, bh = wide ? 520 : 470; const sx = wide ? 1150 : m, sy = wide ? 330 : 800, sw = wide ? 360 : L.w - 2 * m, sh = wide ? 300 : 170;
    rect(bx, by, bw, bh, CK.white); rect(bx, by, bw, 60, CK.ink); CK.lab('browser', 'Your browser', bx + 30, by + 44, 34, CK.white);
    rect(sx, sy, sw, sh, CK.ink); CK.lab('server', 'Server', sx + sw / 2, sy + sh / 2 + 14, 48, CK.white, 'center');
    const ck = [bx + 40, by + 100, bw - 80, 90]; rect(...ck, CK.panel); CK.lab('cookie row', 'Cookie  session_id=117', ck[0] + 24, ck[1] + 58, wide ? 34 : 32, CK.ink, 'left', { lower: true });
    if (o.stayAt != null && t >= o.stayAt - 0.1) { const p = ckE(t, o.stayAt, 0.4); withA(p, () => { ['localStorage', 'sessionStorage'].forEach((s_, i) => { const y = by + 220 + i * 120; rect(bx + 40, y, bw - 80, 90, CK.ink); CK.lab('ws' + i, s_, bx + 64, y + 58, 36, CK.white, 'left', { lower: true }); });
      CK.stamp(t, 'stays stamp', 'Stays here', CK.grn, bx + 10, by + bh + (wide ? 4 : 10), o.stayAt + 0.5, -4, wide ? 64 : 60); }); }
    // the request lane with a riding cookie
    const x0 = wide ? bx + bw : bx + bw / 2, y0 = wide ? ck[1] + 45 : by + bh, x1 = wide ? sx : sx + sw / 2, y1 = wide ? sy + 80 : sy;
    if (t >= o.at - 0.1) { const p = E.inOutCubic(clamp(((t - o.at) % 1.6) / 1.2)); ctx.strokeStyle = CK.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      const cx = x0 + (x1 - x0) * p, cy = y0 + (y1 - y0) * p; withA(1 - Math.max(0, (p - 0.9) * 10), () => { circle(cx, cy, 34, CK.grn); _txt('117', cx, cy + 12, F.mono(28, 600), CK.white, 'center'); }); }
    if (o.foot) withA(ckE(t, o.footAt || o.at, 0.4), () => CK.text(t, 'foot', o.foot, m, wide ? 820 : 1040, wide ? 52 : 50, { maxW: L.w - 2 * m })); });
};
/** document.cookie in the console: the readable cookie shows, the HttpOnly one never does (o.at, o.lockAt) */
CK.httponly = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.head(t, m, wide ? 110 : 90, 'JavaScript vs your cookies', 'HttpOnly', o.headAt != null ? o.headAt : o.at - 0.4, { size: wide ? 150 : 130 });
    const tw_ = wide ? 820 : L.w - 2 * m; CK.term(t, m, wide ? 300 : 300, tw_, wide ? 300 : 280, [{ s: '> document.cookie', at: o.at }, { s: '"theme=dark"', at: o.at + 0.7, col: CK.grn }], { z: wide ? 40 : 36, key: 'console' });
    const cx = wide ? 1000 : m, cy = wide ? 300 : 640, cw = wide ? 520 : L.w - 2 * m; const p = ckE(t, o.lockAt, 0.4);
    if (t >= o.lockAt - 0.1) withA(p, () => { rect(cx, cy, cw, 300, CK.white);       CK.lab('jar1', 'session_id=117', cx + 30, cy + 80, 36, CK.ink, 'left', { lower: true }); CK.lab('jar2', 'HttpOnly ✓', cx + 30, cy + 140, 36, CK.grn, 'left', { lower: true });
      CK.lab('jar3', 'theme=dark', cx + 30, cy + 220, 36, CK.mid, 'left', { lower: true });
      CK.stamp(t, 'hidden stamp', 'Hidden from JS', CK.red, cx + 30, cy + 330, o.lockAt + 0.4, -4, wide ? 70 : 64); }); });
};
/** two tabs side by side: tab 1 keeps its form, tab 2 (opened by you) starts empty (o.at, o.at2) */
CK.tabs2 = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; const yb = o.noHead ? (wide ? 160 : 140) : CK.head(t, m, wide ? 110 : 90, 'Same site, second tab', 'Its own sessionStorage', o.at - 0.4, { size: wide ? 110 : 96, maxW: L.w - 2 * m });
    const s = wide ? 1.0 : 0.95; const t0y = Math.max(wide ? 330 : 290, yb + 50); const xs = wide ? [m, 860] : [m, m], ys = wide ? [t0y, t0y] : [t0y, t0y + 470];
    [0, 1].forEach((i) => { const at = i ? o.at2 : o.at - 0.2; if (t < at - 0.1) return; const p = ckE(t, at, 0.45); withA(p, () => withT(0, (1 - p) * 40, 1, 0, () => {
      CK.tab(t, xs[i], ys[i], wide ? 600 : 560, 'Tab ' + (i + 1) + ' · checkout'); CK.form(t, xs[i] + 20, ys[i] + 140, s * 0.95, { empty: i === 1, title: i ? 'Empty' : 'Filled' }); })); }); });
};
/** the correction (her rule 2026-11-02): "two exceptions", the second added with its source (o.at1, o.at2) */
CK.fix = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.lab('fix kicker', 'localStorage', m, 90, 40);
    if (o.at0 != null) CK.text(t, 'fix title', 'Two exceptions', wide ? m + 420 : m, wide ? 96 : 190, wide ? 64 : 72, { at: o.at0, light: false });
    const it = [{ n: '1', s: wide ? 'Private window:\ngone when\nyou close it' : 'Private window: gone\nwhen you close it', at: o.at1 }, { n: '2', s: wide ? 'Safari: can delete it after\n7 days of Safari use\nwithout a visit to the site' : 'Safari: can delete it\nafter 7 days of Safari use\nwithout a visit to the site', at: o.at2 }];
    it.forEach((q, i) => { if (t < q.at - 0.1) return; const x = wide ? m + i * 720 : m, y = wide ? 170 : 250 + i * 270;
      CK.text(t, 'n' + i, q.n, x, y + 110, 130, { at: q.at, enter: 'drop' }); CK.text(t, 'ex' + i, q.s, x + 110, y + 50, wide ? 66 : 58, { at: q.at + 0.1, maxW: wide ? 560 : L.w - 2 * m - 110, lh: 0.98 }); });
    if (t >= o.at2) { const cy = wide ? 470 : 800, w = L.w - 2 * m - 52;
      CK.clip(t, 'webkit-ls', m, cy, Math.min(w, wide ? 1300 : w), [[507, 72, 1132, 104], [30, 111, 590, 143]], o.at2 + 0.3, 'Source: WebKit blog, March 2020', { inAt: o.at2, cz: 32, crop: [20, 68, 1190, 146] }); } });
};
/** who reads it: three columns (cookies / localStorage / sessionStorage) x the server / JavaScript on the page; o.at (in),
 *  o.cells [[row, col, at]] answers landing on her words (row 0 server, row 1 JavaScript) */
CK.readers = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.head(t, m, wide ? 110 : 100, 'Who gets to read them', 'Who reads it?', o.at, { size: wide ? 140 : 120 });
    const cols = ['Cookies', 'localStorage', 'sessionStorage'], rows = ['The server', 'JavaScript\non the page']; const ans = [['ok', 'gone', 'gone'], ['ok', 'ok', 'ok']];
    const x0 = wide ? m + 420 : m + 250, cw = wide ? 360 : 200, y0 = wide ? 360 : 380, rh = wide ? 200 : 260;
    cols.forEach((c, i) => withA(ckE(t, o.at + 0.15 + i * 0.1, 0.4), () => CK.text(t, 'c' + i, c, x0 + i * cw + cw / 2, y0, wide ? 54 : 40, { align: 'center', upper: i === 0, maxW: cw - 20 })));
    rows.forEach((q, j) => { const y = y0 + 40 + j * rh; withA(ckE(t, o.at + 0.4 + j * 0.1, 0.4), () => { rect(m, y, L.w - 2 * m, 3, CK.ink); CK.text(t, 'r' + j, q, m, y + 90, wide ? 40 : 34, { font: 'mono', lh: 1.2 }); });
      cols.forEach((_, i) => { const cell = (o.cells || []).find(c => c[0] === j && c[1] === i); const cx = x0 + i * cw + cw / 2, cy = y + rh / 2 + 10;
        if (cell && t >= cell[2]) CK.dot(t, cx, cy, wide ? 50 : 40, ans[j][i], cell[2]); else withA(ckE(t, o.at + 0.6, 0.3), () => _txt('?', cx, cy + 30, F.disp(wide ? 90 : 72), CK.mid, 'center')); }); }); });
};
/** the closing summary: three rows fill in on her words (login / cart / form), o.at = [t1, t2, t3] */
CK.summary = (o) => (t, r) => { ground(r);
  CK.fit(r, (L) => { const wide = L.wide; const m = wide ? 90 : 50; CK.floor(L);
    CK.head(t, m, wide ? 100 : 90, "Ada's shop · most likely", 'Where it lives', o.headAt != null ? o.headAt : o.at[0] - 0.6, { size: wide ? 130 : 120 });
    const rows = [['Login', 'HttpOnly cookie', 0], ['Cart', 'localStorage', 1], ['Checkout form', 'sessionStorage', 2]];
    rows.forEach(([a, b, i]) => { const y = (wide ? 300 : 300) + i * (wide ? 170 : 230); const at = o.at[i]; withA(ckE(t, (o.headAt != null ? o.headAt : o.at[0] - 0.6) + 0.1, 0.4), () => { rect(m, y, L.w - 2 * m, 3, CK.ink); CK.text(t, 'k' + i, a, m, y + (wide ? 100 : 95), wide ? 84 : 74); });
      if (t >= at - 0.05) { ctx.save(); ctx.translate(wide ? m + 700 : m, wide ? 0 : 110); CK.text(t, 'v' + i, '[' + b + ']', 0, y + (wide ? 100 : 95), wide ? 84 : 74, { at, enter: 'rise', upper: false, hits: at + 0.1 }); ctx.restore(); } }); });
};

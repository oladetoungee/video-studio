/* working-full-time: the shorts FORMAT MIX + the COVER FRAME (ROLLOUT-BRIEF 2026-11-10; ported from http-status-codes moments/plan.js
 * FD_PLAN short + common.js FD.capFmt / titleFmt / jRoom / coverDraw, via how-to-read-research-papers moments/formats.js), drawn in THIS
 * video's look: charcoal wall #23201B / manila #E7D7AE / paper #F4EBD3 / ONE accent stamp red #C8102E (her headband; yellow #FFE45A
 * for a key word over her picture, where red would sink into the room), type set 02 Bold condensed (Anton caps, Inter Tight, DM Mono).
 * SHORTS-PLAYBOOK "Format menu". Manifest per short: "fmt" A-M, "frame9", "poster" (C / J: the words on the ground / on the screen
 * behind her), "cover" {on, dur, at, text ("~word~" = the accent word), style "photo" | "card" | "card-red"}.
 * Loaded after visuals.js, before plan.js (talking-head.json "common"). plan.js WF_PLAN('short') calls WFF.install.
 * Editable: titles 'label/label', posters 'label/poster', the K tag 'label/tag', captions 'caption/<n>', cover line 'cover/cover',
 * the card cut-out 'cover/@her'. */
'use strict';
(function wffFonts() {   // Inter Tight 800-900 (H / I / M) and DM Serif Display (K film subtitles), library/fonts (OFL)
  for (const [fam, file, desc] of [['WFHeavy', 'InterTightExtraBold.ttf', { weight: '800' }], ['WFHeavy', 'InterTightBlack.ttf', { weight: '900' }], ['WFSerif', 'DMSerifDisplay-Regular.ttf', {}]]) {
    const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); }
})();
const WFA = (s) => `400 ${Math.round(s * 0.92)}px Anton`, WFS = (s, w = 600) => (w >= 800 ? `${w} ${s}px WFHeavy` : `${w} ${s}px WFInter`), WFD = (s) => `400 ${s}px WFSerif`, WFM = (s) => `500 ${s}px "DM Mono"`;
const WFF = { spans: [], popN: 0, hi: WF.hl, acc: WF.red };
WFF.fmt = (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short') ? (FOOT.m.fmt || null) : null;
WFF.on = !!WFF.fmt && WFF.fmt !== 'E';
WFF.live = () => WFF.spans.filter(x => !x[2] || TH.segs.includes(x[2]));   // (a segment plan.js skipped after the fact is not a graphic)
WFF.inGfx = (t) => WFF.live().some(([a, b]) => t >= a && t < b);
WFF.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.28); ctx.shadowOffsetY = Math.max(1, z * 0.03); };
WFF.lab = (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.label) || '';   // (read at load: common.js blanks FOOT.m.label while the house post runs)
WFF.title = () => FOOT.m.label || WFF.lab || FOOT.m.title || '';
/** words of a rich line: [word, accent]; "*x y*" = accent run; Anton is upper-cased */
WFF.words = (s, up = true) => { const out = []; String(s).split(/(\*[^*]+\*)/).filter(Boolean).forEach(p => { const it = /^\*.*\*$/.test(p);
  p.replace(/\*/g, '').split(/\s+/).filter(Boolean).forEach(w => { if (/^[,.;:!?]+$/.test(w) && out.length) out[out.length - 1][0] += w; else out.push([up ? w.toUpperCase() : w, it]); }); }); return out; };
WFF.lay = (ws, z, maxW, f = WFA) => { const sp = z * 0.22; const L = [[]]; let cw = 0;
  for (const q of ws) { const ww = tw(q[0], f(z)); if (L[L.length - 1].length && cw + sp + ww > maxW) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(q); }
  return L; };
WFF.lw = (l, z, f = WFA) => l.reduce((a, [w], i) => a + tw(w, f(z)) + (i ? z * 0.22 : 0), 0);
/** a title set big inside r in Anton caps ("*word*" in colAcc); editable as 'label' (or o.key) */
WFF.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key);
  const def = o.def != null ? o.def : WFF.title(); const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; *word* = the accent colour; | = new line)' };
  try {
    if (ov.hide) { regBox(ov, r.x, r.y, r.w, r.h, info); return; }
    const ws = WFF.words(String(str).replace(/\s*\|\s*/g, ' ')); const maxW = r.w - (o.padX != null ? o.padX : 50) * 2; const maxL = o.maxL || 3; let z = o.zMax || 200, L = [];
    for (; z > 36; z -= 4) { L = WFF.lay(ws, z, maxW); if (L.length <= maxL && L.length * z * 0.98 <= r.h && (L.length === 1 || L[L.length - 1].length >= 2 || L[L.length - 1][0][0].length >= 6 || ws.length < 3)) break; }
    const lh = z * 0.98, hh = L.length * lh; const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
    moved(ov, () => { if (o.shadow) WFF.soft(z);
      L.forEach((l, i) => { let x = cx - WFF.lw(l, z) / 2; const y = y0 + z * 0.86 + i * lh;
        l.forEach(([w, it]) => { _txt(w, x, y, WFA(z), it ? (o.colAcc || WF.red) : (o.col || WF.ink), 'left', 'alphabetic', 0.004 * z); x += tw(w, WFA(z)) + z * 0.22; }); });
      ctx.shadowColor = 'rgba(0,0,0,0)'; regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  } finally { SCENE_ID = sid; }
};
/** B / C: the poster above her while she talks (B: the title on manila; C: the poster words huge on manila, her cut-out in front) */
WFF.poster = (t, r) => { if (WFF.fmt === 'C') WFF.bigTitle({ x: r.x, y: r.y + 20, w: r.w, h: r.h * 0.5 }, { key: 'poster', def: FOOT.m.poster || WFF.title(), zMax: 300, maxL: 2, valign: 'top', padX: 30, what: 'the big words behind her' });
  else { const ph = r.h - 190; rect(r.x, r.y, r.w, ph, WF.manila); WFF.bigTitle({ x: r.x + 20, y: r.y + 40, w: r.w - 40, h: ph - 80 }, { zMax: 170, maxL: 3 }); } };
/** J: a big screen on a dark wall (thin bezel, soft shadow); the screen shows the poster while she talks, a graphic when there is one */
WFF.JS = { x: 40, y: 110, w: 1000, h: 1000 };
WFF.jRoom = (t, q, content) => {
  const S = WFF.JS; rect(0, 1560, W, H - 1560, '#141210'); rect(0, 1556, W, 4, '#3A342B');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0908'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.5) }; rect(S.x, S.y, S.w, S.h, content ? WF.wall : WF.manila);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (!content) WFF.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || WFF.title(), zMax: 260, maxL: 2, padX: 10, what: 'the words on the screen behind her' });
    else content(t, r); });
  ctx.restore(); rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0908');
};
/** K: a small DM Mono tag top-left; M: the title in black Inter Tight 800 in a white rounded box ("|" = a new line) */
WFF.small = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
WFF.plain = (s) => String(s).replace(/\*/g, '');
WFF.tagK = () => WFF.small('tag', WFF.plain(WFF.title()).replace(/\s*\|\s*/g, ' ').toUpperCase(), (ov, str, info) => { const f = WFM(36); const w = tw(str, f, 36 * 0.1); const x = 64, y = 112;
  if (ov.hide) { regBox(ov, x, y - 34, w, 44, info); return; }
  moved(ov, () => { ctx.save(); WFF.soft(36); _txt(str, x, y, f, '#FFFFFF', 'left', 'alphabetic', 36 * 0.1); ctx.restore(); regBox(ov, x, y - 34, w, 44, info); }, [x, y]); }, 'small label top-left');
WFF.boxM = () => WFF.small('label', WFF.plain(FOOT.m.boxText || WFF.title()), (ov, str, info) => { const z = 66; const f = WFS(z, 800); const maxW = W - 220;
  const lines = str.split('|').map(x => x.trim()).filter(Boolean).flatMap(l => { const ws = l.split(/\s+/); const out = []; let cur = '';
    ws.forEach(w => { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; }); if (cur) out.push(cur); return out; }).slice(0, 3);
  const lh = z * 1.08, pw = 40, ph = 24; const bw = Math.max(...lines.map(l => tw(l, f))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
  if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
  moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center')); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)');
/** D: the title flashes in the top band for 1.6 s on stamp red, then wipes up and the band holds her captions */
WFF.flashD = (t) => { if (t > 1.8) return; const k = t < 1.6 ? 1 : 1 - (t - 1.6) / 0.2; const hb = 384 * k;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, hb); ctx.clip(); rect(0, 0, W, 384, WF.red);
  WFF.bigTitle({ x: 30, y: 40, w: W - 60, h: 300 }, { zMax: 120, maxL: 2, col: WF.paper, colAcc: WF.ink }); ctx.restore(); };
/** the title of formats D (flash), F (small, over her square), G (big, above her letterbox band), K (tag), M (white box) */
WFF.titleDraw = (t) => {
  const fm = WFF.fmt; const gfx = WFF.inGfx(t);
  if (fm === 'D') WFF.flashD(t);
  if (fm === 'F' && !gfx) WFF.bigTitle({ x: 40, y: 70, w: W - 80, h: 200 }, { zMax: 96, maxL: 2, col: WF.paper, colAcc: WF.red });
  if (fm === 'K' && !gfx) WFF.tagK();
  if (fm === 'M' && !gfx) WFF.boxM();
  if (fm === 'G') { const a = 1 - WFF.live().reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(gfx ? a : 1, () => WFF.bigTitle({ x: 30, y: 150, w: W - 60, h: 440 }, { zMax: 140, maxL: 3, col: WF.paper, colAcc: WF.red, valign: 'bottom' })); }
};

/* ---------- captions per format (her words as spoken; the key word = WF.redWord) ---------- */
WFF.wordTimes = (c, n) => { const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  return ws.length === n ? ws : Array.from({ length: n }, (_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, n)); };
WFF.capDraw = (t) => {
  WF.fixCaps(); const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const fm = WFF.fmt, gfx = WFF.inGfx(t); const yN = FOOT.capYNow;
  const S = { A: gfx ? { f: 'sans', cy: 1790, size: 70 } : { f: 'anton', cy: 1728, size: 92, ink: true },
    B: { f: 'sans', cy: yN != null ? yN - 25 : 1560, size: 70 },
    C: { f: 'anton', cy: gfx ? 1080 : 760, size: 86, ink: true },
    D: gfx ? { f: 'sans', cy: 760, size: 80 } : { f: 'sans', cy: 196, size: 80 },
    F: { f: 'anton', cy: gfx ? 1790 : 1650, lit: true, size: 96 },
    G: { f: 'sans', cy: gfx ? 1745 : 1440, lit: true, size: 62, grey: true },
    H: { f: 'heavy', cy: gfx ? 880 : 1500, chunk: true, size: 96, up: true },
    I: { f: 'heavy', cy: 1540, chunk: true, size: 76, up: true },
    J: { f: 'heavy', cy: 1700, chunk: true, size: 84, up: true },
    K: { f: 'serif', cy: 1690, size: 62, box: true, nokey: true },
    M: { f: 'heavy8', cy: gfx ? 1800 : 1560, size: 62, nokey: true } }[fm];
  if (!S) return;
  if (fm === 'D' && t < 1.8) return;   // the title flash owns the band
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : S.size; const cy = cst.y != null ? cst.y : S.cy;
  const font = (z) => (S.f === 'anton' ? WFA(z) : S.f === 'heavy' ? WFS(z, 900) : S.f === 'heavy8' ? WFS(z, 800) : S.f === 'serif' ? WFD(z) : WFS(z, 600));
  const up = S.f === 'anton' || S.up;
  const rw = raw.split(/\s+/).filter(Boolean).filter((w_, i_, a_) => !(i_ > 0 && w_.toLowerCase() === a_[i_ - 1].toLowerCase()));   // a doubled word ('the the')
  const all = rw.map(w => (up ? w.toUpperCase() : w)); if (!all.length) return;
  const key = S.nokey ? -1 : WF.redWord(rw); const wt = WFF.wordTimes(c, all.length);
  let idx = all.map((_, i) => i);
  if (S.chunk) { const ch = []; let cur = []; idx.forEach(i => { cur.push(i); if (/[,.?!:;]$/.test(all[i]) || cur.length === 3) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; idx = pick; }
  const maxW = W * (S.box ? 0.84 : 0.86); const sp = (z) => z * 0.26; const lwid = (l, z) => l.reduce((a, i, k) => a + tw(all[i], font(z)) + (k ? sp(z) : 0), 0);
  let lines = [idx]; if (lwid(idx, size) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < idx.length; k++) { const m_ = Math.max(lwid(idx.slice(0, k), size), lwid(idx.slice(k), size)); if (m_ < bm) { bm = m_; bi = k; } } lines = [idx.slice(0, bi), idx.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => lwid(l, size))); if (wide > maxW) size = Math.round(size * Math.max(0.66, maxW / wide)); }
  const lh = size * (S.box ? 1.32 : S.f === 'anton' ? 1.0 : 1.14); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36; let bx0 = 1e9, bx1 = -1e9;
  const keyCol = S.ink ? WF.red : (fm === 'D' || fm === 'G' || fm === 'F' ? '#FF5A4E' : WFF.hi);
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; const lw_ = lwid(ln, size); let x = CX - lw_ / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + lw_);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, lw_ + px * 2, size * 1.2, 6, 'rgba(0,0,0,0.86)'); }
    ln.forEach((i) => { const f = font(size); let col = S.ink ? WF.ink : '#FFFFFF'; if (i === key) col = keyCol;
      const unsaid = S.lit && t < wt[i] - 0.02;
      ctx.save(); if (!S.ink && !S.box && !unsaid) WFF.soft(size);
      _txt(all[i], x, y, f, unsaid ? (S.grey ? '#7C7C80' : 'rgba(255,255,255,0.4)') : col, 'left', 'alphabetic', 0); ctx.restore();
      x += tw(all[i], f) + sp(size); }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (her note 2026-11-10: "the real cover should be on the video"); SHORTS-PLAYBOOK "Cover frame" ---------- */
WFF.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
WFF.coverOn = (t) => { const c = WFF.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
WFF.coverDraw = (t) => {
  const c = WFF.coverOf(); const id = FOOT.m.id; const card = /^card/.test(c.style || ''); const red = c.style === 'card-red';
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    if (card) {   // a flat bold colour + a quiet same-hue line pattern (THUMBNAIL-STUDY §7), her cut-out at the foot
      rect(0, 0, W, H, red ? WF.red : WF.manila); ctx.save(); ctx.strokeStyle = red ? 'rgba(0,0,0,0.09)' : 'rgba(29,26,21,0.06)'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = -H; x < W + H; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore();
      const im = IMG['cover_' + id + '_cut']; if (im) { const h = 1000, w = im.width / im.height * h; const x = CX - w / 2, y = H - 240 - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); }
    } else { const im = IMG['cover_' + id]; if (im) themeFixed(() => ctx.drawImage(im, 0, 0, W, H)); else rect(0, 0, W, H, WF.wall); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the accent word)' };
    const f = (z) => WFS(z, 900); const ws = WFF.words(str.replace(/~([^~]+)~/g, '*$1*'), false); const maxW = W - 150, top = card ? 300 : 250, maxH = card ? 420 : 330; let z = 150, L = [];
    for (; z > 60; z -= 4) { L = WFF.lay(ws, z, maxW, f); if (L.length <= 4 && L.length * z * 1.04 <= maxH && (L.length === 1 || L[L.length - 1].length >= 2)) break; }
    const lh = z * 1.04; const bw = Math.max(...L.map(l => WFF.lw(l, z, f)));
    const base = card ? (red ? WF.paper : WF.ink) : '#FFFFFF', hiCol = card ? (red ? WF.hl : WF.red) : WFF.hi;
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, L.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      L.forEach((l, i) => { let x = CX - WFF.lw(l, z, f) / 2; const y = top + z * 0.84 + i * lh;
        l.forEach(([w, it]) => { _txt(w, x, y, f(z), it ? hiCol : base, 'left', 'alphabetic', -0.03 * z); x += tw(w, f(z)) + z * 0.22; }); });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, L.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
TH.over.push((t) => {
  if (!WFF.fmt || !PORTRAIT || t >= FOOT.dur) return;
  if (WFF.coverOn(t)) { WFF.coverDraw(t); return; }
  if (!WFF.on) return;
  if (SHOW.captions) { const s0 = SCENE_ID; SCENE_ID = 'captions'; WFF.capDraw(t); SCENE_ID = s0; }
  WFF.titleDraw(t);
});
if (WFF.on && PORTRAIT) TH.capOff.push([0, 1e9]);   // the built-in caption blocks step aside (they still make the .srt); the format draws them

/* ---------- where graphics go per format (called from plan.js WF_PLAN in a short) ---------- */
/** installs the format's layouts; returns { full, fill, restore } (fill = no plain-framing gaps for B C H-M; call after the plan) */
WFF.install = () => {
  const FMT = WFF.fmt; const talk0 = TH.talk, split0 = TH.split, half0 = TH.half, pres0 = TH.presenter, room0 = TH.room, tile0 = TH.tile, ots0 = TH.ots;
  if (/[FG]/.test(FMT)) TH.look.band = '#121110'; else if (FMT === 'A') TH.look.band = WF.manila; else if (FMT === 'D') TH.look.band = WF.wall;
  const mark = (sg) => { if (sg && sg.t0 != null) WFF.spans.push([sg.t0, sg.t1, sg]); return sg; };
  const last = () => TH.segs[TH.segs.length - 1];
  const lbBox = (sp_, o) => { const q = TH.span(sp_, o); const sg = TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, WF.wall); o.draw(t, r); ctx.restore();
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' }));
    sfx('paper', q.t0 + 0.2, -4); return sg; };
  const POP = { x: 84, y: 84, w: 912, h: 570 };
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = (WFF.popN = WFF.popN + 1); const tilt = (k % 2 ? -1 : 1) * 0.03;
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, WF.wall); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
        ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    sfx('pop', q.t0 + 0.06, -4); return sg; };
  const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
    const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
    const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: '#2B2722', grid: false, outline: WF.paper, outlinePx: 0, under: () => WFF.jRoom(t, q, content) }),
      () => CAM(q.t0, { box, z: 1 }), { cover: true });
    if (content) sfx('shutter', q.t0 + 0.05, -6); return sg; };
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: o.draw, noCaps: o.noCaps, enter: 0.3 }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, id: o.id, draw: o.draw, noCaps: o.noCaps, ground: 'wfCard', enter: 0.3 }),
    D: (sp_, o) => half0(sp_, { side: 'bottom', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
    F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    J: (sp_, o) => jSeg(sp_, o, o.draw),
    K: (sp_, o) => half0(sp_, { side: 'top', size: 940, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3, ground: 'wfBlack' }),
    M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
  };
  const top = (sp_, o = {}) => { const n0 = TH.segs.length; GFX[FMT](sp_, o); return TH.segs.length > n0 ? mark(last()) : undefined; };
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKM]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: WFF.poster, enter: 0, ground: 'wfWall', sound: false }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.64, id: o.id, draw: WFF.poster, enter: 0.0001, ground: 'wfCard', gr: [40, 110, W - 80, 1000], sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    J: (sp_, o) => jSeg(sp_, o, null),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  TH.tile = top; TH.room = top; TH.ots = top; TH.presenter = top; TH.half = top; TH.split = (sp_, o = {}) => (o.draw ? top(sp_, o) : split0(sp_, o));
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  const full = (sp_, draw, o = {}) => top(sp_, { ...o, draw });
  const fill = () => { if (!/[BCHIJKM]/.test(FMT)) return;
    const sg = TH.segs.slice().sort((x, y) => x.t0 - y.t0); let t = 0;
    for (const x of sg) { if (x.t0 - t > 0.45) TH.talk([t, x.t0], { id: 'fmt-' + t.toFixed(1).replace('.', '_') }); t = Math.max(t, x.t1); }
    if (TOTAL - t > 0.45) TH.talk([t, TOTAL], { id: 'fmt-end' }); };
  const restore = () => { TH.talk = talk0; TH.split = split0; TH.half = half0; TH.presenter = pres0; TH.room = room0; TH.tile = tile0; TH.ots = ots0; };
  return { full, fill, restore };
};

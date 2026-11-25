/* cheapest-countries shorts v3 (her notes 2026-11-12 night, HER-STANDARD "Added 2026-11-12 (night)"): every short's cover style and
 * caption style copy AT LEAST THREE videos of the formats board (studio /ideas/formats/, inspiration/short-formats/frames/), and its
 * fonts come from one of those videos (max 2 fonts per short). Never two text layers on top of each other, no bent / curved text, no
 * script overlays. The top label sits fully inside the top band (y 96-430, max 2 lines, it shrinks to fit) and hides while a graphic
 * is on screen. Covers with her = a real frame of her in her room (assets/covers/<id>.jpg), never a cut-out on a flat colour.
 *   sh01 [26, 36, 60]  Oswald + Inter Tight (font board shorts-06; colours shorts-06)   cream stacked caps title, single bold white lowercase words
 *   sh02 [47, 5, 3]  Poppins (thumbs-14; colours combo-06)   yellow caps title, white sentence captions in grey rounded boxes, graphics in a black panel under her
 *   sh03 [32, 60, 28]  Nunito + Inter Tight (shorts-07; colours shorts-07)   Formats 32 copy: rounded heavy lime words, small clean lowercase captions, running timer, flat colour slides
 *   sh04 [42, 63, 33]  Archivo Black (thumbs-12; colours thumbs-12)   black on a yellow box title, bold white caps captions with a yellow key word, yellow whiteboard drawings
 *   sh05 [24, 69, 21]  TikTok Sans + Libre Baskerville (shorts-05; colours combo-21)   TikTok white rounded title box, small bold serif captions, white number pills
 *   sh06 [19, 31, 53]  Big Shoulders Display + DM Mono (design-03, design-29; colours design-03)   numbered grey-box headings, typewriter captions, receipts, small source credits
 *   sh07 [4, 34, 54]  Bricolage Grotesque (design-24; colours combo-09)   soft white sentence title, big white sentence-case caption block
 *   sh08 [15, 1, 13]  Figtree (design-25; colours combo-10)   red pin city label + clean heavy caps, white captions with a green key word
 *   sh09 [14, 20, 22]  Montserrat (shorts-04; colours shorts-17)   heavy white title, condensed caps captions with one mint word
 * FONT-BOARD PASS (her rule 2026-11-12): every font and colour comes from inspiration/boards/fonts/board.json (LOOK fb / cb); old: build/boards.before-fontboard.js.
 * v4 (2026-11-12): a line break she types (Shift+Enter) is a real line break on covers, titles and labels (PCB.block / PCB.T).
 * Speech (in / out / cuts), mix levels and her edits are unchanged. Every text: ovr + regBox (editable, movable, resizable).
 * Loaded after formats.js (talking-head.json "common"); shorts/shNN.js call PCB_PLAN(). v2: build/boards.before-v3.js. */
'use strict';
(function pcbFonts() {   // 2026-11-12 font-board pass: ONLY fonts on the font board (studio /ideas/boards/fonts/, inspiration/boards/fonts/board.json)
  for (const [fam, file, desc] of [
    ['FBOsw', 'Oswald-Variable.ttf', { weight: '200 700' }],                                   // shorts-06 (Formats 26)
    ['FBIT', 'InterTightMedium.ttf', { weight: '500' }], ['FBIT', 'InterTightSemiBold.ttf', { weight: '600' }], ['FBIT', 'InterTightBold.ttf', { weight: '700' }], ['FBIT', 'InterTightExtraBold.ttf', { weight: '800' }],   // shorts-06 / shorts-07 body
    ['FBPop', 'Poppins-Bold.ttf', { weight: '700' }], ['FBPop', 'Poppins-SemiBold.ttf', { weight: '600' }],      // thumbs-14 (Thumbnails 96)
    ['FBNun', 'Nunito-Variable.ttf', { weight: '200 1000' }],                                     // shorts-07 (Formats 32)
    ['FBArB', 'ArchivoBlack-Regular.ttf', {}],                                                    // thumbs-12 (Thumbnails 89)
    ['FBTik', 'TikTokSans[opsz,slnt,wdth,wght].ttf', { weight: '300 900' }],                      // shorts-05 (Formats 24)
    ['FBLib', 'LibreBaskerville[wght].ttf', { weight: '400 700' }],                              // shorts-05 body (Formats 24)
    ['FBBig', 'BigShouldersDisplay[wght].ttf', { weight: '100 900' }],                            // design-03 (Design 400)
    ['FBDM', 'DMMono-Medium.ttf', { weight: '500' }],                                             // design-29 (Design 353)
    ['FBBri', 'BricolageGrotesque.ttf', { weight: '200 800' }],                                   // design-24 (Design 409)
    ['FBFig', 'Figtree.ttf', { weight: '300 900' }],                                              // design-25 (Design 370)
    ['FBMon', 'Montserrat-Variable.ttf', { weight: '100 900' }]]) {                               // shorts-04 (Formats 14)
    try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + encodeURIComponent(file), false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) { console.error('PCB-FONT-MISSING ' + file); continue; } const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { console.error('PCB-FONT-ERR ' + file + ' ' + e.message); } }
})();
const BF = {
  osw: (z, w = 600) => `${w} ${z}px FBOsw`, it: (z, w = 700) => `${w} ${z}px FBIT`, pop: (z, w = 700) => `${w} ${z}px FBPop`, nun: (z, w = 900) => `${w} ${z}px FBNun`,
  arb: (z) => `400 ${z}px FBArB`, tik: (z, w = 800) => `${w} ${z}px FBTik`, lib: (z, w = 700) => `${w} ${z}px FBLib`, big: (z, w = 800) => `${w} ${z}px FBBig`,
  dm: (z) => `500 ${z}px FBDM`, bri: (z, w = 800) => `${w} ${z}px FBBri`, fig: (z, w = 800) => `${w} ${z}px FBFig`, mon: (z, w = 800) => `${w} ${z}px FBMon`,
};
/* the fonts of each short (A = titles / big words, B = captions / small text) and its colours, ALL from the font board (her rule 2026-11-12);
 * fb = font-board ids of the fonts, cb = the font-board item the colours come from (also in talking-head.json "fonts" / "colours") */
const LOOK = {
  sh01: { fb: ['shorts-06'], cb: 'shorts-06', A: (z) => BF.osw(z, 600), B: (z) => BF.it(z, 700), cream: '#EDE2A0' },                                   // Formats 26: huge cream condensed caps + white Inter Tight
  sh02: { fb: ['thumbs-14'], cb: 'combo-06', A: (z) => BF.pop(z, 700), B: (z) => BF.pop(z, 600), yel: '#E5C63A', panel: '#101114', paper: '#E6DFCD' },  // Poppins Bold; colours of Design 351
  sh03: { fb: ['shorts-07'], cb: 'shorts-07', A: (z) => BF.nun(z, 900), B: (z) => BF.it(z, 500), lime: '#C8F25A', green: '#3A3530', cream: '#C8F25A' }, // Formats 32: Nunito Black lime + clean Inter Tight; cream = the light slide ground (lime, as Formats 32)
  sh04: { fb: ['thumbs-12'], cb: 'thumbs-12', A: (z) => BF.arb(z), B: (z) => BF.arb(z), yel: '#F7F02B', red: '#E2262B', ink: '#111111' },              // Thumbnails 89: Archivo Black red on yellow
  sh05: { fb: ['shorts-05'], cb: 'combo-21', A: (z) => BF.tik(z, 800), B: (z) => BF.lib(z, 700), navy: '#031150', red: '#E0262B' },                    // Formats 24: TikTok Sans box + bold serif captions; colours of Design 116
  sh06: { fb: ['design-03', 'design-29'], cb: 'design-03', A: (z) => BF.big(z, 800), B: BF.dm, acc: '#D44B29', ink: '#120F0E' },                      // Big Shoulders Display + DM Mono; colours of Design 400
  sh07: { fb: ['design-24'], cb: 'combo-09', A: (z) => BF.bri(z, 800), B: (z) => BF.bri(z, 600), pale: '#F2F3C4', indigo: '#2A1F6E', lav: '#6A63B2' }, // Bricolage Grotesque; colours of Design 409
  sh08: { fb: ['design-25'], cb: 'combo-10', A: (z) => BF.fig(z, 800), B: (z) => BF.fig(z, 700), green: '#EEEB98', blue: '#A0B8D7', navy: '#2E3E58' }, // Figtree; colours of Design 370 (green = the key-word colour slot)
  sh09: { fb: ['shorts-04'], cb: 'shorts-17', A: (z) => BF.mon(z, 800), B: (z) => BF.mon(z, 800), mint: '#7FF0C0' },                                    // Formats 14 Montserrat ExtraBold; the mint key word of Formats 20
};
const PCB = { cuts: [], hideTop: [], lights: [], split: null, halfZ: 1.0, B: () => (FOOT.m && FOOT.m.id) || '' };
PCB.L = () => LOOK[PCB.B()] || LOOK.sh01;
const pe = (t, at, d = 0.4, e = 'outQuint') => MOTION.ease(t, at, d, e);
const pb = (t, at, d = 0.38) => MOTION.ease(t, at, d, 'outBack');
const TOPB = { y0: 96, y1: 430 };   // the top band: every label fits inside it

/* ---------- timing: the first time she says q at / after `after` (moment seconds) ---------- */
PCB.w = (q, after = 0) => { const qs = String(q).split(/\s+/).map(norm).filter(Boolean);
  for (let i = 0; i <= WORDS.length - qs.length; i++) { if (WORDS[i].t < after - 0.01) continue; let ok = true;
    for (let k = 0; k < qs.length; k++) if (WORDS[i + k].n !== qs[k]) { ok = false; break; } if (ok) return WORDS[i].t; }
  console.error('PCB-MISSING "' + q + '" after ' + after.toFixed(2)); return null; };

/* ---------- segments ---------- */
/** a full-frame cutaway (her picture is covered; her voice and the captions go on) */
PCB.cut = (t0, t1, draw, id, o = {}) => { if (t0 == null || t1 == null || t1 - t0 < 0.5) return null; const q = { t0, t1 }; if (o.light) PCB.lights.push([t0, t1]);
  const sg = TH.seg('cutaway', q, { id, noCaps: o.noCaps }, (t) => draw(t, { x: 0, y: 0, w: W, h: H }), () => CAM(t0, { z: 1.0 }), { cover: true });
  PCB.cuts.push([t0, t1]); PCF.gfx.push([t0, t1]); if (o.sound !== false) sfx(o.sound || 'shutter', t0 + 0.02, o.db != null ? o.db : -4); return sg; };
/** graphics over her full frame (she never moves); o.top: the label steps aside (the graphic uses the top band) */
PCB.over = (t0, t1, draw, id, o = {}) => { if (t0 == null || t1 == null || t1 - t0 < 0.5) return null;
  const sg = TH.seg('pops', { t0, t1 }, { id }, (t) => draw(t), () => CAM(t0, { z: 1.0 })); if (o.top) PCB.hideTop.push([t0, t1]); return sg; };
PCB.blurBg = (key, o = {}) => { const im = o.clip ? IMG['clip_' + key] : IMG['px_' + key]; if (!im) { rect(0, 0, W, H, '#222'); return; } const s_ = Math.max(W / im.width, H / im.height) * (o.k || 1.15);
  ctx.save(); ctx.filter = 'blur(' + (o.blur || 14) + 'px)'; themeFixed(() => ctx.drawImage(im, (W - im.width * s_) / 2, (H - im.height * s_) / 2, im.width * s_, im.height * s_)); ctx.restore(); rect(0, 0, W, H, o.wash || 'rgba(0,0,0,0.45)'); };
/** the label steps aside while the one punch-in (manifest punch) brings her head up into the top band */
PCB.punchHide = (tw_) => { if (tw_ != null) PCB.hideTop.push([tw_ - 0.12, tw_ + 1.4]); };
PCB.inCut = (t) => PCB.cuts.some(([a, b]) => t >= a && t < b);
PCB.onLight = (t) => PCB.lights.some(([a, b]) => t >= a && t < b);
PCB.topHidden = (t) => PCB.inCut(t) || PCF.inGfx(t) || PCB.hideTop.some(([a, b]) => t >= a && t < b);

/* ---------- drawing parts (every text editable: ovr + regBox; every block movable: grp) ---------- */
/** one line of text. o: align, col, stroke, sw, shadow, blur, drop, sc (scale about its centre), ls, box (colour), boxPad, boxR, a (alpha), skew, strike */
PCB.T = (key, def, x, y, font, o = {}) => { const ov = ovr(key); const s = ov.s != null ? ov.s : def; const ls = o.ls || 0; const fs = fontPx(font); const SL = String(s).split('\n'); const w = Math.max(...SL.map(l => tw(l, font, ls))); const nH = fs * 1.05 * (SL.length - 1);   // v4: her Shift+Enter = a new line
  const bx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x; const by = y - fs * 0.8; const info = { text: s, def };
  const lx = (l) => { const lw_ = tw(l, font, ls); return o.align === 'center' ? x - lw_ / 2 : o.align === 'right' ? x - lw_ : x; };
  if (ov.hide) { regBox(ov, bx, by, w, fs * 1.05 + nH, info); return { w, s, fs }; }
  if (o.a != null && o.a <= 0.002) return { w, s, fs };
  moved(ov, () => { ctx.save(); if (o.a != null) ctx.globalAlpha *= clamp(o.a);
    const cx = bx + w / 2, cy = y - fs * 0.35; if (o.skew || (o.sc && o.sc !== 1)) { ctx.translate(cx, cy); if (o.skew) ctx.transform(1, 0, o.skew, 1, 0, 0); if (o.sc && o.sc !== 1) ctx.scale(o.sc, o.sc); ctx.translate(-cx, -cy); }
    if (o.box) { const p = o.boxPad != null ? o.boxPad : fs * 0.22; fillRR(bx - p, by - p * 0.55, w + 2 * p, fs * 1.02 + nH + p * 1.1, o.boxR || 0, o.box); }
    setFont(font, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = fs * (o.blur != null ? o.blur : 0.25); ctx.shadowOffsetY = fs * (o.drop != null ? o.drop : 0.04); }
    if (o.stroke) { ctx.lineJoin = 'round'; ctx.miterLimit = 2; ctx.lineWidth = o.sw || fs * 0.12; ctx.strokeStyle = o.stroke; SL.forEach((l, i) => ctx.strokeText(l, lx(l), y + i * fs * 1.05)); ctx.shadowColor = 'rgba(0,0,0,0)'; }
    ctx.fillStyle = o.col || '#FFFFFF'; SL.forEach((l, i) => ctx.fillText(l, lx(l), y + i * fs * 1.05));
    if (o.strike != null && o.strike > 0) rect(bx - 6, y - fs * 0.36, (w + 12) * clamp(o.strike), Math.max(6, fs * 0.08), o.strikeCol || '#E8202A');
    const p = o.box ? (o.boxPad != null ? o.boxPad : fs * 0.22) : 0;
    ctx.restore(); regBox(ov, bx - p, by - p * 0.55, w + 2 * p, fs * 1.02 + nH + p * 1.1, info); }, [bx + w / 2, y - fs * 0.4]);
  return { w, s, fs }; };
/** the largest size (zMax..zMin) at which s wraps into <= maxL lines of <= maxW and the block fits maxH */
PCB.fit = (s, font, zMax, maxW, maxL, maxH, lh, zMin = 26, ls = 0) => { for (let z = zMax; z >= zMin; z -= 2) { const L = PCF.wrap(s, font(z), maxW);
    if (L.length <= maxL && L.every(l => tw(l, font(z), ls * z) <= maxW) && (!maxH || L.length * z * lh <= maxH)) return { L, z }; }
  return { L: PCF.wrap(s, font(zMin), maxW).slice(0, maxL), z: zMin }; };
/** a block of text that fits a box: o {font, zMax, zMin, maxW, maxL, maxH, x, y, align, col, hi (colour of ~words~), up, lh, ls (em),
 *  edge, edgeW (em), shadow, lineBox (colour), boxPad (em), boxR, box (one box round all), skew, under(bbox)}. ov = the override; returns the bbox */
PCB.block = (ov, info, str, o) => { const lh = o.lh || 1.05, up = (s) => (o.up ? s.toUpperCase() : s); const plain = up(String(str).replace(/~/g, ''));
  const lsE = o.ls || 0; let L, zs;
  /* v4 (her note 2026-11-12): a line break she types (Shift+Enter) is a real line break. Her lines are never re-wrapped; they only
   * shrink to fit. o.fill: 'each' = every line sized to fill the width (capped at o.zLine), 'first' = the first line fills the
   * width, the rest share one size; otherwise one size for all lines. Text without a line break wraps as before. */
  const hand = plain.split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
  if (hand.length > 1) { L = hand; const zCap = o.zLine || o.zMax * 1.5, zMin = o.zMin || 26;
    const fitW = (l, zTop) => { let z = zTop; while (z > zMin && tw(l, o.font(z), lsE * z) > o.maxW) z -= 2; return z; };
    if (o.fill === 'each') zs = L.map(l => fitW(l, zCap));
    else if (o.fill === 'first') { const z0 = fitW(L[0], zCap); const zr = Math.min(Math.round(z0 * 0.72), ...L.slice(1).map(l => fitW(l, o.zMax))); zs = [z0, ...L.slice(1).map(() => zr)]; }
    else { const z1 = Math.min(...L.map(l => fitW(l, o.zMax))); zs = L.map(() => z1); }
    const band = o.y < TOPB.y1 ? TOPB.y1 - o.y - 6 : 0; const mh = o.maxH ? Math.max(o.maxH, band) : 0; const tot = zs.reduce((a, z) => a + z * lh, 0);
    if (mh && tot > mh) { const k = mh / tot; zs = zs.map(z => Math.max(zMin, Math.floor(z * k))); } }
  else { const r = PCB.fit(plain.replace(/\s+/g, ' '), o.font, o.zMax, o.maxW, o.maxL || 2, o.maxH, lh, o.zMin || 26, lsE); L = r.L; zs = L.map(() => r.z); }
  const z = Math.max(...zs); const F = zs.map(zz => o.font(zz)), LS = zs.map(zz => lsE * zz);
  const hiSet = new Set(); String(str).replace(/~([^~]+)~/g, (_, m) => { up(m).split(/\s+/).forEach(x => hiSet.add(x)); return ''; });
  const lw = L.map((l, i) => tw(l, F[i], LS[i])); const bw = Math.max(...lw); const LT = []; let acc = 0; zs.forEach(zz => { LT.push(acc); acc += zz * lh; }); const bh = acc;
  const bx = o.align === 'center' ? o.x - bw / 2 : o.align === 'right' ? o.x - bw : o.x; const by = o.y; const pad = (o.boxPad != null ? o.boxPad : 0.28) * z;
  const bb = o.lineBox || o.box ? [bx - pad, by - pad * 0.5, bw + 2 * pad, bh + pad] : [bx, by, bw, bh];
  if (ov.hide) { regBox(ov, ...bb, info); return bb; }
  moved(ov, () => { ctx.save(); if (o.skew) { ctx.translate(bx + bw / 2, by + bh / 2); ctx.transform(1, 0, o.skew, 1, 0, 0); ctx.translate(-(bx + bw / 2), -(by + bh / 2)); }
    if (o.box) fillRR(bb[0], bb[1], bb[2], bb[3], o.boxR != null ? o.boxR : 0, o.box);
    L.forEach((l, i) => { const zi = zs[i], f = F[i], ls = LS[i]; const x0 = o.align === 'center' ? o.x - lw[i] / 2 : o.align === 'right' ? o.x - lw[i] : o.x; const y = by + LT[i] + zi * 0.82 + (lh - 1) * zi * 0.5;
      const pd = (o.boxPad != null ? o.boxPad : 0.28) * zi;
      if (o.lineBox) fillRR(x0 - pd, y - zi * 0.86 - pd * 0.25, lw[i] + 2 * pd, zi * 1.08 + pd * 0.5, o.boxR != null ? o.boxR : 0, o.lineBox);
      let x = x0; const sp = tw(' ', f, ls);
      l.split(' ').forEach((wd) => { setFont(f, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.save();
        if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = zi * 0.28; ctx.shadowOffsetY = zi * 0.04; }
        if (o.edge) { ctx.lineJoin = 'round'; ctx.miterLimit = 2; ctx.lineWidth = zi * (o.edgeW || 0.16); ctx.strokeStyle = o.edge; ctx.strokeText(wd, x, y); if (!o.keepShadow) ctx.shadowColor = 'rgba(0,0,0,0)'; }
        ctx.fillStyle = hiSet.has(wd.replace(/[,.?!:]$/, '')) || hiSet.has(wd) ? (o.hi || o.col) : (o.col || '#FFFFFF'); ctx.fillText(wd, x, y); ctx.restore(); x += tw(wd, f, ls) + sp; }); });
    if (o.under) o.under(bb, z, L);
    ctx.restore(); regBox(ov, ...bb, info); }, [bb[0], bb[1]]);
  return bb; };
/** a photo (talking-head/assets/px/<key>.jpg) cover-cropped into r, a slow 3 % drift, optional dim and credit (in the short's small font) */
PCB.photo = (t, key, r, o = {}) => { const im = IMG['px_' + key]; if (!im) { rect(r.x, r.y, r.w, r.h, '#222'); return; }
  const k = 1.02 + 0.03 * prog(t, o.at || 0, o.dur || 8); const s = Math.max(r.w / im.width, r.h / im.height) * k; const sw = r.w / s, sh = r.h / s;
  const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
  grp('photo-' + key + (o.k || ''), r.x, r.y, r.w, r.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
    themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)); if (o.dim) rect(r.x, r.y, r.w, r.h, `rgba(0,0,0,${o.dim})`); ctx.restore(); }, { img: true, label: 'photo (drag to move, corners to resize)' });
  if (o.credit) PCB.T('credit-' + key + (o.k || ''), 'Photo: ' + o.credit + ' / Pexels', o.cx != null ? o.cx : r.x + r.w - 40, o.cy != null ? o.cy : r.y + 60, PCB.L().B(30), { align: o.cx != null && o.calign ? o.calign : 'right', col: o.credCol || 'rgba(255,255,255,0.88)', shadow: 'rgba(0,0,0,0.7)', blur: 0.3 });
};
/** a real page crop (assets/src/<name>.png, PC_CLIPS) as paper in cr: o.minS (keeps the words readable: crops around the first
 *  highlight), o.rot (deg), o.hl (time or one per highlight), o.hlCol, o.dof (blur all but the highlighted lines), o.credCol, o.shadow */
PCB.page = (t, name, cr, o = {}) => { const c = PC_CLIPS[name], im = IMG['clip_' + name]; if (!c || !im) return; const pad = o.pad != null ? o.pad : 22;
  let sx = 0, sw = c.w; const hl0 = (c.hl || [])[0]; const sMin = o.minS || 0;
  if (sMin && (cr.w - 2 * pad) / c.w < sMin && hl0) { sw = Math.min(c.w, (cr.w - 2 * pad) / sMin); sx = o.hleft ? 0 : clamp(hl0[0] + hl0[2] / 2 - sw * 0.4, 0, c.w - sw); }
  let sy = 0, shh = c.h; if (o.ycrop) { sy = o.ycrop[0]; shh = o.ycrop[1] - o.ycrop[0]; }
  const s = Math.min((cr.w - 2 * pad) / sw, o.maxS || 3.2, o.maxH ? (o.maxH - 2 * pad) / shh : 99); const w = sw * s + 2 * pad, h = shh * s + 2 * pad;
  const x = cr.x + (cr.w - w) / 2, y = cr.y; const a = pe(t, o.at || 0, 0.42); const dy = (1 - a) * 70;
  withA(Math.min(1, a * 1.6), () => grp('page-' + name, x, y, w, h, () => { ctx.save(); ctx.translate(x + w / 2, y + dy + h / 2); ctx.rotate((o.rot || 0) * Math.PI / 180); ctx.translate(-w / 2, -h / 2);
    if (o.shadow !== false) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; fillRR(0, 0, w, h, o.r || 0, '#FFFFFF'); ctx.restore(); } else fillRR(0, 0, w, h, o.r || 0, '#FFFFFF');
    const src = [sx * im.width / c.w, sy * im.height / c.h, sw * im.width / c.w, shh * im.height / c.h];
    if (o.dof) { ctx.save(); ctx.filter = 'blur(' + o.dof + 'px)'; themeFixed(() => ctx.drawImage(im, ...src, pad, pad, sw * s, shh * s)); ctx.restore(); }
    else themeFixed(() => ctx.drawImage(im, ...src, pad, pad, sw * s, shh * s));
    ctx.save(); ctx.beginPath(); ctx.rect(pad, pad, sw * s, shh * s); ctx.clip();
    (c.hl || []).forEach((q, i) => { const ht = Array.isArray(o.hl) ? o.hl[Math.min(i, o.hl.length - 1)] : o.hl; if (ht == null || ht > 1e8) return; const p = pe(t, ht + i * 0.1, 0.4, 'inOutQuart'); if (p <= 0) return;
      const hx = pad + (q[0] - sx) * s - 6, hy = pad + (q[1] - sy) * s - 3, hw = q[2] * s + 12, hh = q[3] * s + 6;
      if (o.dof) { ctx.save(); ctx.beginPath(); ctx.rect(hx, hy, hw, hh); ctx.clip(); rect(hx, hy, hw, hh, '#FFFFFF'); themeFixed(() => ctx.drawImage(im, ...src, pad, pad, sw * s, shh * s)); ctx.restore(); }
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(hx, hy, hw * p, hh, o.hlCol || 'rgba(255,214,10,0.8)'); ctx.restore(); });
    ctx.restore(); ctx.restore(); }, { img: true, label: 'real page (drag to move, corners to resize)' }));
  if (o.credit !== false) PCB.T('credit-' + name, c.src + ' · 2 Nov 2026', o.credX != null ? o.credX : x + 4, y + h + (o.credDy || 54) + dy, o.credFont || PCB.L().B(30), { col: o.credCol || '#FFFFFF', shadow: o.credShadow === false ? null : 'rgba(0,0,0,0.6)', a: a });
  return { x, y, w, h };
};
/** a flag in a circle (the board 21 icon) */
PCB.flagDot = (c, x, y, d) => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, d / 2, 0, Math.PI * 2); ctx.clip(); const fw = d * 1.6; PC.flag(c, x - fw / 2, y - fw / 3, fw); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, d / 2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); };
/** a polyline drawn on up to fraction p of its length (a marker line) */
PCB.stroke = (pts, p, col, lw) => { if (p <= 0 || pts.length < 2) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]); ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); left -= seg[i - 1]; }
  ctx.stroke(); ctx.restore(); };
/** a wobbly hand-drawn rectangle as points (seeded, so the same every frame) */
PCB.wob = (x, y, w, h, seed, j = 6) => { const r = (k) => (hash(seed * 13 + k) - 0.5) * j; return [[x + r(1), y + r(2)], [x + w + r(3), y + r(4)], [x + w + r(5), y + h + r(6)], [x + r(7), y + h + r(8)], [x + r(9), y + r(10) + 2]]; };
/** a drawn flag (Nigeria: green-white-green), a thin dark edge */
PCB.flagBox = (c, x, y, w) => { PC.flag(c, x, y, w); ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, w * 2 / 3); ctx.restore(); };

/* ---------- captions per short ---------- */
const SH = 'rgba(0,0,0,0.6)';
PCB.cue = (t) => { const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return null; if (TH.capOff.some(([a, b]) => t >= a && t < b)) return null;
  const ce = (EDIT.data.capShort || {})[c.i]; return { c, ce, raw: ce != null ? ce : c.text, cst: EDIT.data.captions9 || {} }; };
PCB.lay = (words, font, size, maxW, minK = 0.7) => { const j = (l) => l.join(' '); let f = font(size); let lines = [words];
  if (tw(j(words), f) > maxW && words.length > 1) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(j(words.slice(0, k)), f), tw(j(words.slice(k)), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  const wide = Math.max(...lines.map(l => tw(j(l), f))); if (wide > maxW) { size = Math.round(size * Math.max(minK, maxW / wide)); f = font(size); } return { lines, size, f }; };
/** generic caption block: st {font, size, cy, maxW, col, hi (index), hiCol, shadow, edge, box (per-line box colour), boxR, lh} */
PCB.capBlock = (q, words, st) => { const L = PCB.lay(words, st.font, q.cst.size || st.size, st.maxW || W * 0.84); const size = L.size, f = L.f; const lh = size * (st.lh || 1.16);
  const cy = q.cst.y != null ? q.cst.y : st.cy; const y0 = cy - (L.lines.length - 1) * lh / 2 + size * 0.36; const sp = tw(' ', f);
  let bx0 = 1e9, bx1 = -1e9, k = 0; ctx.save();
  L.lines.forEach((ln, li) => { const y = y0 + li * lh; const s = ln.join(' '); const wd = tw(s, f); const x0 = CX - wd / 2; bx0 = Math.min(bx0, x0); bx1 = Math.max(bx1, x0 + wd);
    if (st.box) { const px = size * (st.boxPx || 0.3); fillRR(x0 - px, y - size * 0.9, wd + px * 2, size * 1.24, st.boxR != null ? st.boxR : 6, st.box); }
    let x = x0; ln.forEach((w_) => { const on = k === st.hi; ctx.save(); setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (st.shadow) { ctx.shadowColor = st.shadow; ctx.shadowBlur = size * (st.blur || 0.3); ctx.shadowOffsetY = size * 0.05; }
      if (st.edge) { ctx.lineJoin = 'round'; ctx.miterLimit = 2; ctx.lineWidth = size * (st.edgeW || 0.16); ctx.strokeStyle = st.edge; ctx.strokeText(w_, x, y); ctx.shadowColor = 'rgba(0,0,0,0)'; }
      ctx.fillStyle = on ? (st.hiCol || '#FFE45A') : (st.col || '#FFFFFF'); ctx.fillText(w_, x, y); ctx.restore(); x += tw(w_, f) + sp; k++; }); });
  ctx.restore(); const px = st.box ? size * (st.boxPx || 0.3) : 0; const bt = y0 - size * 0.95, bh = (L.lines.length - 1) * lh + size * 1.3;
  regBox({ id: 'caption/' + q.c.i, edited: q.ce != null, hide: false }, bx0 - px, bt, bx1 - bx0 + 2 * px, bh, { kind: 'caption', text: q.raw, def: q.c.text, cue: q.c.i }); };
PCB.words = (q) => q.raw.split(/\s+/).filter(Boolean);
PCB.chunkNow = (q, t, n) => { const all = PCB.words(q); const wt = PCF.cueTimes(q.c, all.length); const pick = PCF.chunk(all, wt, t, n); return { all, wt, pick, words: pick.map(i => all[i]) }; };
const lowerNoDot = (w) => w.toLowerCase().replace(/[.,!?]+$/, '');
const keepI = (w) => (/^i('|$)/i.test(w) ? 'I' + w.slice(1).toLowerCase() : w.toLowerCase());
PCB.CAP = {
  // [26, 36]: ONE bold white lowercase word at a time, chest height
  sh01: (t, q) => { const { words } = PCB.chunkNow(q, t, 3);   // round 2 (critic): a short phrase of 2-4 words at a time, not single words
    PCB.capBlock(q, words.map(w_ => keepI(lowerNoDot(w_))), { font: LOOK.sh01.B, size: 72, cy: PCB.inCut(t) ? 1580 : 1490, shadow: 'rgba(0,0,0,0.55)', blur: 0.35, maxW: W * 0.9, lh: 1.1 }); },
  // [5, 3]: white sentence case on grey rounded boxes (one per line); in the black panel: at its foot
  sh02: (t, q) => PCB.capBlock(q, PCB.words(q), { font: LOOK.sh02.B, size: 54, cy: PCF.gfxNow(t) ? 1800 : 1480, box: 'rgba(16,17,20,0.86)', boxR: 14, boxPx: 0.32, lh: 1.36, maxW: W * 0.8 }),
  // [32, 60]: small clean lowercase, a few words at a time (dark on the light slides)
  sh03: (t, q) => { const { words } = PCB.chunkNow(q, t, 4); const lt = PCB.onLight(t);
    PCB.capBlock(q, words.map(keepI).map(w => w.replace(/[.]$/, '')), { font: LOOK.sh03.B, size: 54, cy: PCB.inCut(t) ? 1640 : 1560, col: lt ? LOOK.sh03.green : '#FFFFFF', shadow: lt ? null : 'rgba(0,0,0,0.6)', maxW: W * 0.8 }); },
  // [42, 8]: bold caps, 2-3 words, the key word yellow (dark ink with a green key word on the yellow / teal boards)
  sh04: (t, q) => { const { all, pick } = PCB.chunkNow(q, t, 3); const hi = PCF.hiWord(all); const lt = PCB.inCut(t);
    PCB.capBlock(q, pick.map(i => all[i].toUpperCase()), { font: LOOK.sh04.B, size: 78, cy: lt ? 1700 : 1480, col: lt ? LOOK.sh04.ink : '#FFFFFF', hi: pick.indexOf(hi), hiCol: lt ? LOOK.sh04.red : LOOK.sh04.yel, shadow: lt ? null : 'rgba(0,0,0,0.7)', edge: lt ? null : null, maxW: W * 0.84, lh: 1.08 }); },
  // [24, 69]: small bold serif, white, sentence case
  sh05: (t, q) => PCB.capBlock(q, PCB.words(q), { font: LOOK.sh05.B, size: 58, cy: PCB.inCut(t) ? 1660 : 1740, shadow: PCB.inCut(t) ? null : 'rgba(0,0,0,0.75)', box: PCB.inCut(t) ? 'rgba(0,0,0,0.78)' : null, boxR: 8, maxW: W * 0.78, lh: 1.3 }),
  // [19]: typewriter captions, lower case, typed on with her words
  sh06: (t, q) => { const { all, wt, pick } = PCB.chunkNow(q, t, 5); const ws = pick.map(i => all[i].toLowerCase());
    const shown = ws.map((w_, j) => { const t0 = wt[pick[j]]; const n = Math.ceil(w_.length * clamp((t - t0 + 0.02) / 0.18)); return t < t0 - 0.02 ? '' : w_.slice(0, Math.max(Math.min(3, w_.length), n)); });
    PCB.capBlock(q, shown.filter(Boolean).length ? shown.map(s => s || ' ') : [ws[0].slice(0, 1)], { font: LOOK.sh06.B, size: 58, cy: PCB.inCut(t) ? 1720 : 1500, shadow: 'rgba(0,0,0,0.85)', maxW: W * 0.82 }); },
  // [34, 54]: a big block of white sentence-case words, soft shadow
  sh07: (t, q) => PCB.capBlock(q, PCB.words(q), { font: LOOK.sh07.B, size: 64, cy: PCB.inCut(t) ? 1640 : 1545, shadow: 'rgba(0,0,0,0.6)', maxW: W * 0.8, lh: 1.1 }),
  // [15, 1]: white sans with a thin black edge, the key word green
  sh08: (t, q) => { const { all, pick } = PCB.chunkNow(q, t, 4); const hi = PCF.hiWord(all);
    PCB.capBlock(q, pick.map(i => all[i]), { font: LOOK.sh08.B, size: 62, cy: PCB.inCut(t) ? 1690 : 1470, shadow: 'rgba(0,0,0,0.6)', edge: LOOK.sh08.navy, edgeW: 0.12, hi: pick.indexOf(hi), hiCol: LOOK.sh08.green, maxW: W * 0.82 }); },
  // [20, 22]: condensed caps low in the frame, one word mint
  sh09: (t, q) => { const { all, pick } = PCB.chunkNow(q, t, 4); const hi = PCF.hiWord(all);
    PCB.capBlock(q, pick.map(i => all[i].toUpperCase()), { font: LOOK.sh09.B, size: 70, cy: 1560, shadow: 'rgba(0,0,0,0.6)', hi: pick.indexOf(hi), hiCol: LOOK.sh09.mint, maxW: W * 0.84, lh: 0.98 }); },
};

/* ---------- top labels (editable as 'label'; "|" = the second line); all inside TOPB, max 2 lines ---------- */
PCB.label = (draw, what) => PCF.smallText('label', PCF.lbl(), (ov, str, info) => draw(ov, str, { ...info, label: what || 'title (text; "|" = second line)' }));
const BANDW = W - 140;
PCB.TITLE = {
  // [26] cream stacked caps + a small white line
  sh01: () => PCB.label((ov, str, info) => { const [a, b] = PCF.parts(str); const LK = LOOK.sh01; const y = TOPB.y0 + 14;
    const bb = PCB.block(ov, info, a, { font: LK.A, zMax: 128, zMin: 60, maxW: BANDW, maxL: 1, maxH: 150, x: CX, y, align: 'center', col: LK.cream, up: true, lh: 1.0, ls: -0.02, shadow: 'rgba(0,0,0,0.45)' });
    if (b) { const sid = SCENE_ID; const o2 = ovr('label-2'); PCB.block(o2, { text: b, def: b, kind: 'box', label: 'title, small line' }, o2.s != null ? o2.s : b, { font: LK.B, zMax: 54, zMin: 34, maxW: BANDW, maxL: 1, x: CX, y: bb[1] + bb[3] + 10, align: 'center', col: '#FFFFFF', shadow: 'rgba(0,0,0,0.6)' }); SCENE_ID = sid; } }),
  // [47, 5] yellow bold caps, centred
  sh02: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh02.A, zMax: 80, zMin: 44, maxW: BANDW, maxL: 1, maxH: 110, x: CX, y: TOPB.y0 + 20, align: 'center', col: LOOK.sh02.yel, up: true, lh: 1.04, shadow: 'rgba(0,0,0,0.55)' })),
  // [32] rounded lime lowercase, top left (the timer sits top right)
  sh03: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh03.A, zMax: 84, zMin: 48, maxW: 600, maxL: 2, maxH: 200, x: 64, y: TOPB.y0 + 20, align: 'left', col: LOOK.sh03.lime, lh: 1.0, shadow: 'rgba(0,0,0,0.5)' })),
  // [42] black bold text on a yellow box, top left
  sh04: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh04.A, zMax: 66, zMin: 40, maxW: 760, maxL: 2, maxH: 160, x: 84, y: TOPB.y0 + 40, align: 'left', col: LOOK.sh04.ink, box: LOOK.sh04.yel, boxPad: 0.34, boxR: 0, lh: 1.08 })),
  // [24, 69] TikTok's own white rounded text box, black heavy sans, centred
  sh05: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh05.A, zMax: 70, zMin: 40, maxW: 820, maxL: 2, maxH: 170, x: CX, y: TOPB.y0 + 40, align: 'center', col: LOOK.sh05.navy, box: '#FFFFFF', boxPad: 0.4, boxR: 26, lh: 1.04 })),
  // [19] numbered heading in white caps on a grey box: "1. Czech Republic", then "2. Poland" from the moment she starts on Poland
  sh06: (t) => PCB.label((ov, str, info) => { const [a, b] = PCF.parts(str); const s = PCB.split != null && t >= PCB.split && b ? b : a;
    PCB.block(ov, info, s, { font: LOOK.sh06.A, zMax: 86, zMin: 46, maxW: 820, maxL: 1, maxH: 120, x: 70, y: TOPB.y0 + 40, align: 'left', col: '#FFFFFF', lineBox: 'rgba(18,15,14,0.92)', boxPad: 0.26, up: true, lh: 1.0 }); }, 'title (text; "|" = the heading from Poland on)'),
  // [4, 54] soft white sentence, centred
  sh07: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh07.A, zMax: 64, zMin: 40, maxW: 920, maxL: 1, maxH: 90, x: CX, y: TOPB.y0 + 24, align: 'center', col: LOOK.sh07.pale, lh: 1.1, shadow: 'rgba(0,0,0,0.55)' })),
  // [15] a red pin + the place (white), then green italic caps with a black edge
  sh08: () => PCB.label((ov, str, info) => { const [a, b] = PCF.parts(String(str).replace(/\s*\n\s*/, ' | ').replace(/\s+/g, ' ')); const z1 = 46, z2 = 72; const f1 = LOOK.sh08.B(z1), f2 = LOOK.sh08.A(z2); const B = (b || '').toUpperCase();
    const wA = tw(a, f1), wB = B ? tw(B, f2) : 0, gap = 26, tot = 44 + wA + (B ? gap + wB : 0); const x0 = CX - tot / 2, y = TOPB.y0 + 24 + z2 * 0.82;
    moved(ov, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 14; circle(x0 + 14, y - z1 * 0.5, 14, LOOK.sh08.blue); rect(x0 + 12, y - z1 * 0.5, 4, 26, LOOK.sh08.blue); _txt(a, x0 + 44, y, f1, '#FFFFFF', 'left'); ctx.restore();
      if (B) { const xb = x0 + 44 + wA + gap; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 3; setFont(f2, 0); ctx.fillStyle = LOOK.sh08.green; ctx.fillText(B, xb, y); ctx.restore(); }
      regBox(ov, x0, y - z2 * 0.84, tot, z2 * 1.0, info); }, [CX, y]); }, 'title (text; "|" = the green caps)'),
  // [14] heavy white sans with a black outline, top left
  sh09: () => PCB.label((ov, str, info) => PCB.block(ov, info, str.replace(/\s*\|\s*/g, ' '), { font: LOOK.sh09.A, zMax: 80, zMin: 46, maxW: W - 150, maxL: 2, maxH: 180, x: 70, y: TOPB.y0 + 20, align: 'left', col: '#FFFFFF', shadow: 'rgba(0,0,0,0.7)', lh: 1.02, ls: -0.015 })),
};
/* what stays on screen besides the label (sh03: the running timer of Formats 32, top right) */
PCB.EXTRA = {
  sh03: (t) => PCF.smallText('timer', '', (ov, str, info) => { const s = ov.s || (String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(Math.floor(t % 60)).padStart(2, '0')); const z = 62, f = LOOK.sh03.A(z);
    const w = tw(s, f), x = W - 64 - w, y = TOPB.y0 + 20 + z * 0.82; const lt = PCB.onLight(t);
    if (ov.hide) { regBox(ov, x, y - z * 0.82, w, z, info); return; }
    moved(ov, () => { ctx.save(); if (!lt) { ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 14; } _txt(s, x, y, f, lt ? LOOK.sh03.green : '#FFFFFF', 'left'); ctx.restore(); regBox(ov, x, y - z * 0.82, w, z, { ...info, text: s }); }, [x + w / 2, y]); }, 'running timer'),
};

/* ---------- covers (the first 0.1 s): her real frame or a board-style card; lines editable as cover/cover (+ cover/cover-2) ---------- */
PCB.her = (o = {}) => { const im = IMG['cover_' + FOOT.m.id]; if (!im) { rect(0, 0, W, H, '#222'); return; } const dy = o.dy || 0, h = o.h || H;
  grp('her', 0, 0, W, h, () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, h); ctx.clip(); themeFixed(() => ctx.drawImage(im, 0, -dy, W, H)); if (o.dim) rect(0, 0, W, h, `rgba(0,0,0,${o.dim})`); ctx.restore(); }, { img: true, label: 'her frame (drag to move, corners to resize)' }); };
PCB.cline = (key, def, o) => { const ov = ovr(key); const str = ov.s != null ? ov.s : def; return PCB.block(ov, { text: str, def, kind: 'box', label: 'cover line (text; ~word~ = the coloured word)' }, str, o); };
PCB.COVERS = {
  // [26] her in her room; huge cream caps stacked + a drawn Nigerian flag with the audience in bold white lowercase
  sh01: (c) => { PCB.her({ dim: 0.12 }); const [a, b] = PCF.parts(c.text);
    const bb = PCB.cline('cover', a, { font: LOOK.sh01.A, zMax: 200, zLine: 330, fill: 'each', zMin: 80, maxW: W - 110, maxL: 2, maxH: 480, x: CX, y: 110, align: 'center', col: LOOK.sh01.cream, up: true, lh: 0.9, ls: -0.03, shadow: 'rgba(0,0,0,0.5)' });   // v4: bigger, her lines (PROOF / OF FUNDS) each fill the width
    const f2 = LOOK.sh01.B(66); const s2 = b; const w2 = tw(s2, f2) + 110; const x2 = CX - w2 / 2, y2 = 1330;
    grp('flag', x2, y2 - 52, 90, 60, () => PCB.flagBox('NG', x2, y2 - 52, 90)); PCB.cline('cover-2', s2, { font: LOOK.sh01.B, zMax: 66, zMin: 44, maxW: W - 260, maxL: 1, x: x2 + 110, y: y2 - 62, align: 'left', col: '#FFFFFF', shadow: 'rgba(0,0,0,0.7)' }); return bb; },
  // [47] her on top, a black panel under her with bold yellow caps
  sh02: (c) => { rect(0, 0, W, H, LOOK.sh02.panel); PCB.her({ dy: 330, h: 1080 });
    return PCB.cline('cover', c.text, { font: LOOK.sh02.A, zMax: 118, zMin: 70, maxW: W - 140, maxL: 4, maxH: 520, x: CX, y: 1150, align: 'center', col: LOOK.sh02.yel, up: true, lh: 1.06 }); },
  // [32] her in her room; the rounded heavy lime words
  // round 2 (critic: sh03 / sh07 / sh09 covers too alike): a FRAME cover = the short's own lime slide (Formats 32) on top, her below
  sh03: (c) => { const LK = LOOK.sh03; rect(0, 0, W, H, LK.green);
    const im = IMG['cover_' + FOOT.m.id]; if (im) grp('her', 0, 980, W, H - 980, () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 980, W, H - 980); ctx.clip(); themeFixed(() => ctx.drawImage(im, 0, 420, W, H)); ctx.restore(); }, { img: true, label: 'her frame (drag to move, corners to resize)' });
    rect(0, 0, W, 980, LK.green);
    const bb = PCB.cline('cover', c.text, { font: LK.A, zMax: 150, zMin: 80, maxW: W - 160, maxL: 2, maxH: 300, x: 80, y: 150, align: 'left', col: LK.lime, lh: 1.0 });
    PCB.T('cover-n1', '€2,902', 80, 690, LK.A(118), { col: LK.lime }); PCB.T('cover-n1s', "a year · bachelor's", 86, 770, LK.B(48), { col: LK.lime });
    PCB.T('cover-n2', '€3,950', 560, 690, LK.A(118), { col: LK.lime }); PCB.T('cover-n2s', "a year · master's", 566, 770, LK.B(48), { col: LK.lime }); return bb; },
  // [63, 42] the yellow whiteboard: black bold caps + the Italian flag drawn in marker
  sh04: (c) => { rect(0, 0, W, H, LOOK.sh04.yel);
    const bb = PCB.cline('cover', c.text, { font: LOOK.sh04.A, zMax: 190, zMin: 90, maxW: W - 150, maxL: 4, maxH: 820, x: CX, y: 330, align: 'center', col: LOOK.sh04.red, up: true, lh: 0.98 });
    const fx = CX - 170, fy = bb[1] + bb[3] + 80; grp('flag', fx - 10, fy - 10, 360, 250, () => { rect(fx, fy, 113, 226, '#009246'); rect(fx + 113, fy, 114, 226, '#FFFFFF'); rect(fx + 227, fy, 113, 226, '#CE2B37'); PCB.stroke(PCB.wob(fx, fy, 340, 226, 7, 8), 1, LOOK.sh04.ink, 9); }); return bb; },
  // [24, 69] her in her room; TikTok's white rounded text box
  sh05: (c) => { PCB.her();
    return PCB.cline('cover', c.text, { font: LOOK.sh05.A, zMax: 86, zMin: 56, maxW: 860, maxL: 3, maxH: 230, x: CX, y: 270, align: 'center', col: LOOK.sh05.navy, box: '#FFFFFF', boxPad: 0.4, boxR: 30, lh: 1.06 }); },
  // [19, 31] Prague street; numbered grey-box headings
  sh06: (c) => { const im = IMG.px_prague; if (im) { const s = Math.max(W / im.width, H / im.height); themeFixed(() => ctx.drawImage(im, (W - im.width * s) / 2, (H - im.height * s) / 2, im.width * s, im.height * s)); } rect(0, 0, W, H, 'rgba(0,0,0,0.18)');
    const bb = PCB.cline('cover', c.text.replace(/[ \t]*\|[ \t]*/g, ' '), { font: LOOK.sh06.A, zMax: 120, zLine: 220, fill: 'first', zMin: 60, maxW: W - 180, maxL: 4, maxH: 760, x: 80, y: 360, align: 'left', col: '#FFFFFF', hi: LOOK.sh06.acc, lineBox: 'rgba(18,15,14,0.92)', boxPad: 0.24, up: true, lh: 1.2 });   // v4: her lines; the first line fills the width
    PCB.T('cover-credit', 'Photo: Ceyda Çiftci / Pexels', 80, 1600, LOOK.sh06.B(28), { col: '#FFFFFF', shadow: 'rgba(0,0,0,0.8)' }); return bb; },
  // [4, 34] her in her room; a soft white sentence
  sh07: (c) => { const LK = LOOK.sh07; PCB.her();   // her real room (her rule); the line big in pale Bricolage on a solid indigo band over the upper third, clear of her face
    grp('band', 0, 0, W, 600, () => rect(0, 0, W, 600, LK.indigo));
    return PCB.cline('cover', c.text, { font: LK.A, zMax: 130, zMin: 70, maxW: W - 160, maxL: 5, maxH: 450, x: 80, y: 80, align: 'left', col: LK.pale, lh: 0.98, ls: -0.03 }); },
  // [15] two city streets (Oslo / Helsinki) with red pin labels; green italic caps with a black edge across the middle
  sh08: (c) => { for (const [k, y, cr, pin] of [['oslo', 0, 'Eswaran Arulkumar', 'Oslo, Norway'], ['helsinki', 960, 'Antti Kulmanen', 'Helsinki, Finland']]) { const im = IMG['px_' + k]; if (!im) continue;
      const s = Math.max(W / im.width, 960 / im.height); themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, 960); ctx.clip(); ctx.drawImage(im, (W - im.width * s) / 2, y + (960 - im.height * s) / 2, im.width * s, im.height * s); ctx.restore(); });
      const f = LOOK.sh08.B(44); const yy = y + (y ? 1640 - 960 : 300); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 14; circle(96, yy - 18, 15, LOOK.sh08.blue); rect(94, yy - 18, 4, 28, LOOK.sh08.blue); ctx.restore();
      PCB.T('cover-pin-' + k, pin, 130, yy, f, { col: '#FFFFFF', shadow: 'rgba(0,0,0,0.75)' }); }
    const [a, b] = PCF.parts(c.text);
    grp('band', 0, 650, W, 460, () => rect(0, 650, W, 460, 'rgba(46,62,88,0.62)'));   // v4: a calm dark band across the seam so the words read on both streets
    const bb = PCB.cline('cover', a, { font: LOOK.sh08.A, zMax: 170, zLine: 190, fill: 'each', zMin: 80, maxW: W - 130, maxL: 2, maxH: 400, x: CX, y: 700, align: 'center', col: '#FFFFFF', hi: LOOK.sh08.green, up: true, lh: 1.0, ls: -0.01, shadow: 'rgba(0,0,0,0.5)' });
    if (b) PCB.cline('cover-2', b, { font: LOOK.sh08.B, zMax: 70, zMin: 44, maxW: W - 200, maxL: 1, x: CX, y: bb[1] + bb[3] + 26, align: 'center', col: '#FFFFFF', shadow: 'rgba(0,0,0,0.6)' }); return bb; },
  // [14] her in her room; heavy white sans with a black outline
  // round 2: HER PHOTO WITH A BOX LINE at the top (Formats 14 / 20 ground #2E2E33), clear of her face and neck
  sh09: (c) => { PCB.her(); const [a, b] = PCF.parts(c.text);
    const bb = PCB.cline('cover', a, { font: LOOK.sh09.A, zMax: 96, zMin: 60, maxW: W - 200, maxL: 2, maxH: 230, x: CX, y: 150, align: 'center', col: '#FFFFFF', box: '#2E2E33', boxPad: 0.32, boxR: 0, lh: 1.08, ls: -0.02 });
    if (b) PCB.cline('cover-2', b, { font: LOOK.sh09.B, zMax: 72, zMin: 44, maxW: W - 240, maxL: 1, x: CX, y: bb[1] + bb[3] + 30, align: 'center', col: '#2E2E33', box: LOOK.sh09.mint, boxPad: 0.3, boxR: 0, up: true }); return bb; },
};
(function pcbHooks() {
  const cap0 = PCF.capDraw, title0 = PCF.titleFmt, cover0 = PCF.coverDraw;
  PCF.capDraw = (t) => { const fn = PCB.CAP[PCB.B()]; if (!fn) return cap0(t); if (PC.fixCaps) PC.fixCaps(); const q = PCB.cue(t); if (!q) return;
    const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return; fn(t, q); };
  PCF.titleFmt = (t) => { const fn = PCB.TITLE[PCB.B()]; if (!fn) return title0(t); if (PCB.EXTRA[PCB.B()]) PCB.EXTRA[PCB.B()](t); if (!PCF.lbl()) return; if (!PCB.topHidden(t)) fn(t); };
  PCF.coverDraw = (t) => { const fn = PCB.COVERS[PCB.B()]; const c = PCF.coverOf(); if (!fn || !c) return cover0(t);
    const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear(); try { fn(c); } finally { SCENE_ID = sid; } };
})();

/* ---------- the plan per short ---------- */
function PCB_PLAN() {
  const id = FOOT.m.id; PCB.cuts = []; PCB.hideTop = []; PCB.lights = []; PCB.split = null;
  const TH0 = { talk: TH.talk, tile: TH.tile, cutaway: TH.cutaway, split: TH.split, presenter: TH.presenter, room: TH.room, half: TH.half, ots: TH.ots }; PCB.half0 = TH.half;
  PCF.setup({}, null);   // fmt H: her full frame at z 1 all through (no automatic zooms); TH.half = a panel rising from the foot, her above
  const fn = PCB.SH[id]; if (fn) { try { fn(PCB.w); } catch (e) { console.error('PCB-ERR', id, e.message, e.stack); } }
  PCF.fill();
  if (typeof FOOT !== 'undefined' && FOOT.dur) for (const x of TH.segs) if (x.t1 > FOOT.dur) x.t1 = FOOT.dur;
  Object.assign(TH, TH0);
}
PCB.SH = {};
const END = () => FOOT.dur;

/* sh01 [26, 36, 60] · Oswald + Inter Tight: full-frame photos, cream stacked caps (one block at a time), single white words as captions */
PCB.SH.sh01 = (w) => {
  const LK = LOOK.sh01;
  const big = (key, s, y, z, t, at, col = LK.cream) => { const p = pe(t, at, 0.36); if (p <= 0) return; PCB.T(key, s, CX, y + (1 - p) * 24, LK.A(z), { align: 'center', col, ls: -0.02 * z, a: Math.min(1, p * 1.6), shadow: 'rgba(0,0,0,0.5)' }); };
  const a = w('tuition'), b = w('so tuition fee', a), c = w('the money', b), d = w('to prove', c), e = w('and every country', d), f = w('in estonia', e), g = w('so that official', f);
  PCB.cut(a - 0.15, b - 0.04, (t, r) => { PCB.photo(t, 'euro-fan', r, { at: a, dim: 0.42, credit: 'Dom J' }); big('t-tuition', 'TUITION +', 820, 180, t, a); big('t-pof', 'PROOF OF FUNDS', 1010, 132, t, w('proof', a)); }, 'sh01-two');
  sfx('pop', w('proof', a), -4);
  PCB.cut(c - 0.12, d - 0.04, (t, r) => PCB.photo(t, 'passport-euro', r, { at: c, fx: 0.5, credit: 'Marta Branco' }), 'sh01-pass', { sound: 'paper' });
  PCB.cut(d - 0.04, e - 0.04, (t, r) => PCB.photo(t, 'card', r, { at: d, fx: 0.55, credit: 'Kaboompics' }), 'sh01-card', { sound: 'swipe' });
  PCB.cut(f - 0.12, g - 0.04, (t, r) => { PCB.photo(t, 'tallinn-roofs', r, { at: f, dim: 0.35, fx: 0.4, credit: 'Sergei Gussev' }); big('t-880', '€880', 900, 330, t, w('880', f) - 0.08); big('t-month', 'A MONTH IN ESTONIA', 1100, 92, t, w('every month', f), '#FFFFFF'); }, 'sh01-ee');
  sfx('sticker', w('880', f) - 0.08, -3);
};

/* sh02 [47, 5, 3] · Poppins: her on top, a black panel rises under her with bold yellow caps (Hank Green's panel); grey-box captions */
PCB.SH.sh02 = (w) => {
  const LK = LOOK.sh02, BLK = LOOK.sh02.panel;
  const cap = (key, s, y, z, t, at, col = LK.yel) => { const p = pe(t, at, 0.34); if (p <= 0) return; PCB.T(key, s, CX, y + (1 - p) * 26, LK.A(z), { align: 'center', col, a: Math.min(1, p * 1.6) }); };
  // the black panel (y 1020-1920) under her whole head (z 1: her face never cut by the panel)
  const panel = (t0, t1, id, draw) => { const sg = PCB.half0([t0, t1], { id, side: 'bottom', size: 900, z: PCB.halfZ, fy: 0.36, draw: (t, r) => { rect(r.x, r.y, r.w, r.h, BLK); draw(t, r); } }); if (sg) PCF.gfx.push([sg.t0, sg.t1]); return sg; };
  const a = w('at most public'), b = w('you still pay', a), c = w('but there are', b), d = w('now the major', c), e = w('so you put', d), f = w('germany is also', e), g = w('140', f), h = w('a lot of', g), k = w('the fee you', h);
  panel(a - 0.12, b - 0.04, 'sh02-free', (t, r) => { PCB.photo(t, 'berlin', { x: 0, y: r.y, w: W, h: 560 }, { at: a, dim: 0.35, credit: 'Irina Nesterenko', cy: r.y + 56 });
    cap('f-1', 'NO TUITION FEES', r.y + 360, 104, t, w('tuition', a)); cap('f-2', 'NIGERIANS INCLUDED', r.y + 660, 64, t, w('nigeria', a), '#FFFFFF'); });
  sfx('pop', w('tuition', a), -4); sfx('pop', w('nigeria', a), -4);
  panel(b - 0.1, c - 0.04, 'sh02-contrib', (t, r) => { cap('c-2', 'A SEMESTER FEE', r.y + 200, 72, t, b + 0.1, '#FFFFFF'); cap('c-1', 'A FEW HUNDRED €', r.y + 380, 96, t, w('few hundred', b)); });
  sfx('sticker', w('few hundred', b), -3);
  panel(c - 0.12, d - 0.04, 'sh02-bw', (t, r) => { cap('x-1', 'SOME EXCEPTIONS', r.y + 120, 80, t, w('exceptions', c)); PCB.page(t, 'de-bw', { x: 60, y: r.y + 190, w: W - 120, h: 420 }, { at: c, hl: w('exceptions', c), minS: 1.0, maxH: 420, credFont: LK.B(30) }); });
  panel(d - 0.12, e - 0.04, 'sh02-pof', (t, r) => { PCB.page(t, 'de-daad', { x: 40, y: r.y + 50, w: W - 80, h: 340 }, { at: d, hl: [w('992', d), w('every month', d)], minS: 1.5, maxH: 340, credFont: LK.B(30) });
    cap('p-1', '€11,904', r.y + 620, 150, t, w('11,904', d) - 0.1); cap('p-2', 'IN A BLOCKED ACCOUNT', r.y + 705, 60, t, w('blocked', d), '#FFFFFF'); });
  sfx('sticker', w('11,904', d) - 0.1, -3);
  panel(e - 0.12, f - 0.04, 'sh02-blocked', (t, r) => { PCB.photo(t, 'card', { x: 0, y: r.y, w: W, h: 700 }, { at: e, dim: 0.45, credit: 'Kaboompics', cy: r.y + 56 }); cap('b-1', '€992', r.y + 400, 190, t, w('fixed amount', e) - 0.05); cap('b-2', 'A MONTH', r.y + 520, 70, t, w('every month', e), '#FFFFFF'); }, );
  sfx('coins', w('fixed amount', e), -6);
  panel(g - 0.25, h - 0.04, 'sh02-work', (t, r) => { cap('w-1', '140 FULL DAYS', r.y + 260, 120, t, w('140', g) - 0.1); cap('w-2', 'OR 280 HALF DAYS', r.y + 420, 76, t, w('280', g) - 0.1, '#FFFFFF'); cap('w-3', 'OF WORK A YEAR', r.y + 520, 56, t, w('280', g) + 0.2, '#FFFFFF'); });
  sfx('tick', w('140', g), -4); sfx('tick', w('280', g), -4);
  const kp = Math.max(k - 0.1, w('affordable', h) + 1.4);   // after the punch-in on "affordable" has eased back out
  TH.talk([h - 0.04, kp], { id: 'de-afford' }); PCB.punchHide(w('affordable', h));
  panel(kp, END(), 'sh02-plan', (t, r) => { cap('l-2', 'PROOF OF FUNDS FOR A YEAR', r.y + 200, 60, t, kp + 0.05, '#FFFFFF'); cap('l-1', '€11,904', r.y + 400, 170, t, w('proof of funds', k)); });
};

/* sh03 [32, 60, 28] · Nunito + Inter Tight: Formats 32 copy. Her full frame, the rounded heavy lime word on a key moment, a running timer, flat colour slides */
PCB.SH.sh03 = (w) => {
  const LK = LOOK.sh03; const G = LK.green, LI = LK.lime, CR = LK.cream;
  const word = (key, s, x, y, z, t, at, col, o = {}) => { const p = pb(t, at, 0.34); if (p <= 0) return; PCB.T(key, s, x, y, LK.A(z), { align: o.align || 'left', col, sc: 0.75 + 0.25 * p, a: Math.min(1, p * 2), shadow: o.shadow, strike: o.strike, strikeCol: o.strikeCol }); };
  const sm = (key, s, x, y, z, t, at, col, o = {}) => { const p = pe(t, at, 0.36); PCB.T(key, s, x, y + (1 - p) * 20, LK.B(z), { align: o.align || 'left', col, a: p }); };
  const a = w('at public universities'), b = w('for 2026', a), c = w('universities used', b), d = w('so for the proof', c), e = w('but from august', d), f = w('which is about', e), g = w('some of the campus', f), h = w('if you add', g), k = w('when we compare', h);
  // her on camera: one lime word over her (the "boring" of Formats 32), below her chin, above the captions
  const pop = (t0, t1, s, id) => PCB.over(t0, t1, (t) => word('pop-' + id, s, 90, 1400, 120, t, t0, LI, { shadow: 'rgba(0,0,0,0.35)' }), 'sh03-' + id);
  PCB.cut(a - 0.12, w('2,902', b) - 0.35, (t, r) => { rect(0, 0, W, H, CR); sm('i-1', 'they are called', 90, 470, 54, t, w('called', a), G); word('i-2', 'differentiated fees', 90, 590, 104, t, w('differentiated', a), G);
    PCB.page(t, 'fr-icef', { x: 60, y: 700, w: W - 120, h: 300 }, { at: a, minS: 1.7, hl: w('higher fee', a), credCol: G, credShadow: false, shadow: false, r: 24, credFont: LK.B(30) }); }, 'sh03-icef', { sound: 'paper', light: true });
  PCB.cut(w('2,902', b) - 0.35, c - 0.04, (t, r) => { rect(0, 0, W, H, LI); word('f-1', '€2,902', 90, 640, 210, t, w('2,902', b) - 0.1, G); sm('f-2', "a year · bachelor's", 96, 760, 60, t, w('2,902', b), G);
    word('f-3', '€3,950', 90, 1020, 210, t, w("bachelor's", b) - 0.1, G); sm('f-4', "a year · master's", 96, 1140, 60, t, w("bachelor's", b) + 0.1, G); }, 'sh03-fees', { light: true });
  sfx('tick', w('2,902', b), -4); sfx('tick', w('3,950', b), -4);
  pop(w('exempt', c) - 0.1, d - 0.1, 'exempt', 'ex');
  PCB.cut(w('615', d) - 0.4, e - 0.04, (t, r) => { rect(0, 0, W, H, G); word('o-1', '€615', 90, 760, 240, t, w('615', d) - 0.1, LI); sm('o-2', 'a month for a student visa', 96, 860, 58, t, w('615', d) + 0.2, '#FFFFFF'); sm('o-3', '≈ €7,380 a year', 96, 950, 58, t, w('7,380', d), '#FFFFFF'); }, 'sh03-615');
  PCB.cut(e - 0.12, f - 0.04, (t, r) => { rect(0, 0, W, H, CR); word('d-1', 'from august 2026', 90, 520, 112, t, w('august', e) - 0.05, G);
    PCB.page(t, 'fr-funds', { x: 60, y: 620, w: W - 120, h: 300 }, { at: e, minS: 1.0, hl: [w('august', e), w('47', e)], credCol: G, credShadow: false, shadow: false, r: 24, credFont: LK.B(30) }); }, 'sh03-decree', { sound: 'paper', light: true });
  PCB.cut(f - 0.12, g - 0.04, (t, r) => { rect(0, 0, W, H, LI); word('n-1', '€615', 90, 560, 130, t, f, G, { strike: pe(t, w('878', f) - 0.15, 0.3), strikeCol: G }); word('n-2', '€877.50', 90, 820, 230, t, w('878', f) - 0.1, G);
    sm('n-3', 'a month · about €10,000+ a year', 96, 920, 56, t, w('10', f), G); }, 'sh03-877', { light: true });
  sfx('sticker', w('878', f) - 0.1, -3);
  pop(w('check the page', g) - 0.1, h - 0.1, 'check the page', 'chk');
  PCB.cut(h - 0.12, k - 0.04, (t, r) => { rect(0, 0, W, H, G); sm('m-1', "€3,950 master's fee", 96, 520, 66, t, h, '#FFFFFF'); sm('m-2', '+ €10,530 proof of funds', 96, 620, 66, t, w('two numbers', h), '#FFFFFF');
    const p = pe(t, w('14,480', h) - 0.2, 0.35); fillRR(96, 680, (W - 192) * p, 8, 4, LI); word('m-3', '€14,480', 90, 920, 230, t, w('14,480', h) - 0.1, LI); sm('m-4', 'your first year', 96, 1040, 60, t, w('first year', h), '#FFFFFF'); }, 'sh03-sum');
  sfx('tick', w('two numbers', h), -4); sfx('sticker', w('14,480', h) - 0.1, -3);
  PCB.cut(k - 0.12, END(), (t, r) => { rect(0, 0, W, H, CR); sm('v-0', 'first year, master\'s', 96, 420, 56, t, k, G);
    word('v-1', 'germany €11,904', 90, 620, 110, t, w('11,900', k) - 0.2, G); word('v-2', 'france €14,480', 90, 800, 110, t, w('2,500', k) - 0.4, G); word('v-3', '+ €2,500', 90, 1010, 170, t, w('2,500', k) - 0.2, G); }, 'sh03-vs', { light: true });
  sfx('tick', w('2,500', k) - 0.2, -4);
};

/* sh04 [42, 63, 33] · Archivo Black: yellow box title, white caps captions with a yellow key word, yellow / teal whiteboard drawings that draw themselves */
PCB.SH.sh04 = (w) => {
  const LK = LOOK.sh04; const YEL = LK.yel, TEAL = LK.yel, INK = LK.ink;   // font board thumbs-12: yellow / red / black only
  const hand = (key, s, x, y, z, t, at, o = {}) => { const p = pe(t, at, 0.35); PCB.T(key, s, x, y, LK.A(z), { align: o.align || 'center', col: o.col || INK, a: p }); };
  const note = (x, y, s, p, seed, wing) => { const pts = PCB.wob(x, y, 150 * s, 80 * s, seed, 5); PCB.stroke(pts, p, INK, 6); if (p > 0.6) { ctx.save(); ctx.globalAlpha *= (p - 0.6) / 0.4; rect(x + 8 * s, y + 8 * s, 134 * s, 64 * s, '#FFFFFF'); ctx.restore(); PCB.stroke(pts, 1, INK, 6); PCB.stroke([[x + 75 * s - 18 * s, y + 40 * s], [x + 75 * s + 18 * s, y + 40 * s]], 1, INK, 5); }
    if (wing && p > 0.8) { PCB.stroke([[x - 4, y + 10], [x - 60 * s, y - 40 * s], [x - 20 * s, y + 20 * s]], (p - 0.8) / 0.2, INK, 5); PCB.stroke([[x + 150 * s + 4, y + 10], [x + 210 * s, y - 40 * s], [x + 170 * s, y + 20 * s]], (p - 0.8) / 0.2, INK, 5); } };
  const a = w('so at many'), b = w('and then the italian', a), c = w('so for the proof', b), d = w('and when i was', c), e = w('the proof of funds is still', d);
  PCB.cut(a - 0.12, b - 0.04, (t, r) => { rect(0, 0, W, H, YEL); ctx.save(); ctx.translate(CX + 40, 820); ctx.scale(1.12, 1.12); ctx.translate(-CX, -820);
    const pI = pe(t, w('family income', a) - 0.1, 0.8, 'inOutQuart'); const house = [[150, 760], [150, 600], [270, 500], [390, 600], [390, 760], [150, 760]]; PCB.stroke(house, pI, INK, 8); PCB.stroke([[240, 760], [240, 680], [300, 680], [300, 760]], pI, INK, 6);
    hand('i-inc', 'FAMILY INCOME', 290, 860, 50, t, w('family income', a));
    const pD = pe(t, w('isee', a) - 0.35, 0.7, 'inOutQuart'); PCB.stroke(PCB.wob(560, 470, 360, 460, 3, 6), pD, INK, 8); for (let i = 0; i < 4; i++) PCB.stroke([[610, 660 + i * 56], [870, 660 + i * 56]], pe(t, w('isee', a) + 0.2 + i * 0.1, 0.3), INK, 5);
    hand('i-isee', 'ISEE', 740, 600, 100, t, w('isee', a)); hand('i-par', 'PARIFICATO', 740, 990, 46, t, w('parificato', a));
    PCB.stroke([[410, 640], [470, 640], [540, 640]], pe(t, w('declare', a), 0.5), INK, 7); PCB.stroke([[510, 615], [545, 640], [510, 665]], pe(t, w('declare', a) + 0.4, 0.2), INK, 7);
    const pF = pe(t, w('each university', a), 0.6, 'inOutQuart'); PCB.stroke([[740, 1030], [740, 1130]], pF, INK, 7); PCB.stroke([[710, 1100], [740, 1135], [770, 1100]], pe(t, w('each university', a) + 0.5, 0.2), INK, 7);
    hand('i-fee', 'YOUR FEE', 740, 1230, 80, t, w('each university', a) + 0.3); ctx.restore(); }, 'sh04-isee', { sound: 'marker' });
  sfx('marker', w('isee', a) - 0.3, -6); sfx('marker', w('each university', a), -6);
  PCB.cut(c - 0.12, d - 0.04, (t, r) => { rect(0, 0, W, H, TEAL); const bob = (i) => Math.sin((t - c) * 2.2 + i) * 14;
    [[110, 300, 1], [690, 270, 2], [130, 1140, 3], [680, 1110, 4]].forEach(([x, y, i]) => note(x, y + bob(i), 1.6, pe(t, c + 0.1 * i, 0.6, 'inOutQuart'), i, true));
    hand('p-num', '€10,179.85', CX, 860, 150, t, w('10,179.85', c) - 0.1); hand('p-yr', 'A YEAR', CX, 970, 70, t, w('a year', c));
    const pP = pe(t, w('ticket', c) - 0.2, 0.7, 'inOutQuart'); PCB.stroke([[300, 1360], [520, 1300], [760, 1300], [800, 1330], [760, 1360], [300, 1360]], pP, INK, 7); PCB.stroke([[520, 1300], [600, 1220], [640, 1220], [620, 1300]], pP, INK, 6); PCB.stroke([[540, 1360], [620, 1430], [660, 1430], [630, 1360]], pP, INK, 6);
    hand('p-tk', '+ A TICKET HOME', CX, 1540, 64, t, w('ticket', c) + 0.1); }, 'sh04-pof', { sound: 'marker' });
  sfx('sticker', w('10,179.85', c) - 0.1, -3); sfx('marker', w('ticket', c) - 0.2, -6);
  PCB.cut(e - 0.12, END(), (t, r) => { rect(0, 0, W, H, YEL); const n1 = 10, n2 = 12; const base = 1120;
    for (let i = 0; i < n2; i++) { const p = pe(t, e + 0.25 + i * 0.07, 0.3); if (i < n1) note(150, base - i * 52, 1.05, p, 40 + i, false); note(640, base - i * 52, 1.05, pe(t, w("germany's", e) - 0.2 + i * 0.07, 0.3), 80 + i, false); }
    hand('v-it', 'ITALY', 230, 1310, 76, t, e); hand('v-it2', '€10,180', 230, 1400, 60, t, e + 0.2);
    hand('v-de', 'GERMANY', 720, 1310, 76, t, w("germany's", e) - 0.2); hand('v-de2', '€11,904', 720, 1400, 60, t, w("germany's", e)); hand('v-close', 'PRETTY CLOSE', CX, 420, 110, t, w('close', e)); }, 'sh04-vs', { sound: 'marker' });
};

/* sh05 [24, 69, 21] · TikTok Sans + Libre Baskerville: TikTok white title box, small bold serif captions, white pills with a flag under her chin */
PCB.SH.sh05 = (w) => {
  const LK = LOOK.sh05, BLUE = LK.navy;
  const pill = (key, flag, s, y, t, at, o = {}) => { const p = pb(t, at, 0.38); if (p <= 0) return; const z = o.z || 70; const f = LK.A(z); const tw_ = tw(s, f); const h = z * 1.55, d = h * 0.74, wd = tw_ + d + z * 1.0; const x = CX - wd / 2; const sc = 0.6 + 0.4 * p;
    grp('pill-' + key, x, y - h / 2, wd, h, () => { ctx.save(); ctx.translate(CX, y); ctx.scale(sc, sc); ctx.translate(-CX, -y); ctx.globalAlpha *= Math.min(1, p * 2);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(x, y - h / 2, wd, h, h / 2, '#FFFFFF'); ctx.restore();
      PCB.flagDot(flag, x + h * 0.14 + d / 2, y, d); ctx.restore(); }, { label: 'number pill (drag to move, corners to resize)' });
    PCB.T('pill-' + key, s, x + h * 0.14 + d + z * 0.36, y + z * 0.36, f, { col: o.col || BLUE, sc, a: Math.min(1, p * 2) }); };
  const a = w('726.72'), b = w('austria also keeps', a), c = w('now for the proof', b), d = w('if you are under', c), e = w('and you have to show it', d), f = w('so if you are under', e);
  PCB.over(a - 0.3, b - 0.04, (t) => { pill('sem', 'AT', '€726.72 a semester', 210, t, a - 0.08); pill('yr', 'AT', '€1,506 a year', 360, t, w('1,506', a) - 0.08, { z: 60 }); }, 'sh05-fee', { top: true });
  sfx('pop', a - 0.08, -4); sfx('pop', w('1,506', a) - 0.08, -4);
  PCB.cut(b - 0.12, c - 0.04, (t, r) => { PCB.blurBg('at-list', { clip: true, blur: 10, wash: 'rgba(255,255,255,0.1)', k: 1.6 }); PCB.page(t, 'at-list', { x: -520, y: 60, w: W + 1040, h: 1900 }, { at: b, rot: -7, dof: 7, minS: 0, maxS: 2.2, shadow: false, hl: ['benin', 'ethiopia', 'senegal', 'togo', 'uganda'].map(x => w(x, b)), credit: false });
    PCB.T('credit-at-list', 'TU Wien · tuwien.at · 2 Nov 2026', 70, 150, LK.A(32), { col: '#FFFFFF', box: 'rgba(0,0,0,0.6)', boxPad: 10, a: pe(t, b, 0.4) });
    pill('ng', 'NG', 'Nigeria: not on the list', 1420, t, w('nigeria', b), { z: 62, col: LK.red }); }, 'sh05-list');
  sfx('pop', w('nigeria', b), -3);
  TH.talk([c - 0.04, d - 0.12], { id: 'at-age' }); PCB.punchHide(w('age', c));
  PCB.over(d - 0.12, e - 0.04, (t) => { pill('u24', 'AT', 'under 24: €722.58 a month', 210, t, w('722.58', d) - 0.1, { z: 56 }); pill('o24', 'AT', '24 and over: €1,308.39 a month', 360, t, w('1,308.39', d) - 0.1, { z: 52, col: LK.red }); }, 'sh05-age', { top: true });
  sfx('pop', w('722.58', d) - 0.1, -4); sfx('pop', w('1,308.39', d) - 0.1, -4);
  PCB.cut(e - 0.12, f - 0.04, (t, r) => { PCB.blurBg('vienna', { blur: 12 }); PCB.page(t, 'at-oead', { x: -60, y: 600, w: W + 120, h: 500 }, { at: e, rot: -4, dof: 3, minS: 0, maxS: 1.6, shadow: false, hl: [w('12', e), w('advance', e)], credX: 70, credFont: LK.A(32) }); PCB.T('credit-vienna', 'Photo: Jonas Horsch / Pexels', W - 40, 150, LK.A(28), { align: 'right', col: 'rgba(255,255,255,0.88)', shadow: 'rgba(0,0,0,0.7)' }); }, 'sh05-oead');
  PCB.over(w('8k', f) - 0.3, END() - 0.1, (t) => { pill('y1', 'AT', 'under 24: about €8,671 a year', 210, t, w('8k', f) - 0.1, { z: 52 }); pill('y2', 'AT', '24 and over: about €15,700 a year', 360, t, w('15,700', f) - 0.1, { z: 48, col: LK.red }); }, 'sh05-year', { top: true });
  sfx('pop', w('8k', f) - 0.1, -4); sfx('pop', w('15,700', f) - 0.1, -4);
};

/* sh06 [19, 31, 53] · Big Shoulders Display + DM Mono: numbered grey-box headings, lime caps, typed receipts, typewriter captions */
PCB.SH.sh06 = (w) => {
  const LK = LOOK.sh06;
  const gbox = (key, s, x, y, z, t, at) => { const p = pe(t, at, 0.3); if (p <= 0) return; PCB.T(key, s, x, y, LK.A(z), { col: '#FFFFFF', box: 'rgba(18,15,14,0.92)', boxPad: z * 0.26, a: Math.min(1, p * 2) }); };
  const lime = (key, s, x, y, z, t, at) => { const p = pe(t, at, 0.3); if (p <= 0) return; PCB.T(key, s, x, y, LK.A(z), { col: LK.acc, shadow: 'rgba(0,0,0,0.6)', a: Math.min(1, p * 2) }); };
  const receipt = (t, x, y, wd, rows, at, key) => { const p = pe(t, at, 0.5); if (p <= 0) return; const lh = 74; const h = 150 + rows.length * lh + 60; const yy = y + (1 - p) * 500;
    grp('receipt-' + key, x, yy, wd, h, () => { ctx.save(); ctx.translate(x + wd / 2, yy + h / 2); ctx.rotate(-0.03); ctx.translate(-wd / 2, -h / 2);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 36; ctx.shadowOffsetY = 14; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(wd, 0); ctx.lineTo(wd, h);
      for (let k = 0; k <= 20; k++) ctx.lineTo(wd - k * wd / 20, h - (k % 2 ? 0 : 18)); ctx.closePath(); ctx.fillStyle = '#FBFAF6'; ctx.fill(); ctx.restore();
      ctx.restore(); }, { label: 'receipt (drag to move, corners to resize)' });
    ctx.save(); ctx.translate(x + wd / 2, yy + h / 2); ctx.rotate(-0.03); ctx.translate(-(x + wd / 2), -(yy + h / 2));
    rows.forEach((rw, i) => { if (t < rw.at - 0.02) return; const ry = yy + 110 + i * lh;
      if (rw.rule) { rect(x + 40, ry - (rw.big ? 64 : 52), wd - 80, 3, LK.ink); }
      PCB.T(key + '-l' + i, rw.l, x + 44, ry, LK.B(rw.big ? 56 : 44), { col: LK.ink });
      if (rw.r) PCB.T(key + '-r' + i, rw.r, x + wd - 44, ry, LK.B(rw.big ? 56 : 44), { align: 'right', col: LK.ink, a: pe(t, rw.at + 0.2, 0.2) }); });
    ctx.restore(); };
  const a = w('in the czech republic'), b = w('if you study in english', a), c = w('and for the proof', b), d = w('in poland', c), e = w('you show', d);
  PCB.split = d - 0.12;
  PCB.cut(a - 0.12, b - 0.04, (t, r) => { PCB.photo(t, 'prague', r, { at: a, credit: 'Ceyda Çiftci', cx: 64, cy: 150, calign: 'left' }); gbox('h-cz', '1. CZECH REPUBLIC', 70, 1120, 92, t, a); lime('h-cz0', 'TUITION IN CZECH: €0', 76, 1270, 84, t, w('free', a)); }, 'sh06-cz');
  sfx('pop', w('free', a), -4);
  PCB.cut(c - 0.12, d - 0.04, (t, r) => { PCB.blurBg('prague', { blur: 16, wash: 'rgba(0,0,0,0.35)' }); PCB.page(t, 'cz-mv', { x: 40, y: 230, w: W - 80, h: 300 }, { at: c, rot: 1.5, minS: 1.4, hl: w('crowns', c), credX: 60, credFont: LK.B(28) });
    receipt(t, 150, 700, 780, [{ l: 'PROOF OF FUNDS', at: w('115,810', c) - 0.3 }, { l: 'CZECH REPUBLIC', at: w('115,810', c) - 0.1 }, { l: '12-MONTH STAY', at: w('12 month', c) },
      { l: 'TOTAL', r: '115,810 Kč', big: true, rule: true, at: w('115,810', c) + 0.3 }, { l: 'check with the embassy', at: w('confirm', c) }], c, 'cz'); }, 'sh06-czpof');
  sfx('type', w('115,810', c) - 0.3, -6, { n: 8, d: 0.9 }); sfx('tick', w('confirm', c), -4);
  PCB.cut(d - 0.12, e - 0.04, (t, r) => { PCB.photo(t, 'warsaw', r, { at: d, credit: 'Caio', cx: 64, cy: 150, calign: 'left' }); gbox('h-pl', '2. POLAND', 70, 1120, 92, t, d); lime('h-pl2', 'PROOF OF FUNDS: LOW', 76, 1270, 84, t, w('low', d)); }, 'sh06-pl');
  PCB.cut(e - 0.12, END(), (t, r) => { PCB.blurBg('warsaw', { blur: 16, wash: 'rgba(0,0,0,0.35)' });
    receipt(t, 130, 300, 820, [{ l: 'POLAND · A MONTH', at: e }, { l: 'living', r: '776 zł', at: w('776', e) - 0.1 }, { l: '+ your rent', at: w('rent', e) }, { l: '+ ticket home', r: '2,500 zł', at: w('2,500', e) - 0.1 },
      { l: 'TUITION (ENGLISH)', r: 'set by uni', rule: true, at: w('university sets', e) }], e, 'pl'); }, 'sh06-plpof');
  sfx('type', w('776', e) - 0.1, -6, { n: 6, d: 0.6 }); sfx('type', w('2,500', e) - 0.1, -6, { n: 6, d: 0.6 });
};

/* sh07 [4, 34, 54] · Bricolage Grotesque: soft white title, a big caption block, a dark list card in the top band, photos with one number */
PCB.SH.sh07 = (w) => {
  const LK = LOOK.sh07, YW = LK.pale;
  const big = (key, s, y, z, t, at, col = '#FFFFFF') => { const p = pe(t, at, 0.4); if (p <= 0) return; PCB.T(key, s, CX, y + (1 - p) * 24, LK.A(z), { align: 'center', col, shadow: 'rgba(0,0,0,0.55)', a: Math.min(1, p * 1.6) }); };
  const a = w('at tallinn'), b = w('and for your residence', a), c = w('and for working', b), d = w('i work full-time', c), e = w('so for estonia', d);
  PCB.over(w('4,000', a) - 0.5, b - 0.04, (t) => { const p = pe(t, w('4,000', a) - 0.45, 0.45); if (p <= 0) return; const x = 80, y = 110 - (1 - p) * 60, wd = W - 160, rows = 3, rh = 112, h = 100 + rows * rh;
    withA(Math.min(1, p * 1.6), () => { grp('ee-card', x, y, wd, h, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 30; fillRR(x, y, wd, h, 22, LK.indigo); ctx.restore(); }, { label: 'list card (drag to move, corners to resize)' });
      PCB.T('ee-h', 'Tallinn University · master\'s, 2027', x + 40, y + 70, LK.B(38), { col: LK.pale });
      const row = (i, lab, val, at, o = {}) => { const q = pe(t, at, 0.3); if (q <= 0) return; const ry = y + 100 + i * rh + 68; withA(q, () => { circle(x + 62, ry - 16, 20, LK.lav); PCB.stroke([[x + 52, ry - 16], [x + 60, ry - 7], [x + 74, ry - 26]], 1, '#FFFFFF', 5);
        PCB.T('ee-l' + i, lab, x + 104, ry, LK.B(44), { col: '#FFFFFF' }); PCB.T('ee-v' + i, val, x + wd - 40, ry, LK.A(50), { align: 'right', col: o.col || '#FFFFFF', strike: o.strike, strikeCol: LK.pale }); }); };
      row(0, 'Most programs', '€4,000–5,200', w('4,000', a) - 0.1);
      row(1, 'My program', '€6,000', w('6,000', a) - 0.1, { strike: pe(t, w('7k', a) - 0.2, 0.3) });
      row(2, 'My program now', '€7,000', w('7k', a) - 0.1, { col: YW }); });
  }, 'sh07-fees', { top: true });
  sfx('tick', w('4,000', a) - 0.1, -4); sfx('tick', w('6,000', a) - 0.1, -4); sfx('sticker', w('7k', a) - 0.1, -3);
  PCB.cut(b - 0.12, c - 0.04, (t, r) => { PCB.photo(t, 'tallinn-street', r, { at: b, dim: 0.35, credit: 'Argo Allvee' }); const yr = t >= w('10,500', b) - 0.12;
    big('b-pof', 'proof of funds', 560, 76, t, w('proof of funds', b));
    if (!yr) { big('b-880', '€880', 860, 230, t, w('880', b) - 0.1, YW); big('b-m', 'a month', 990, 76, t, w('month', b)); } else { big('b-10500', '€10,500', 860, 190, t, w('10,500', b) - 0.12, YW); big('b-y', 'for a year', 990, 76, t, w('year', b)); } }, 'sh07-pof');
  sfx('pop', w('880', b) - 0.1, -4); sfx('pop', w('10,500', b) - 0.12, -4);
  PCB.cut(c - 0.12, d - 0.04, (t, r) => { PCB.photo(t, 'work', r, { at: c, dim: 0.3, credit: 'Ketut Subiyanto' }); big('w-1', 'work part-time', 760, 110, t, w('work', c)); big('w-2', 'while you study full-time', 880, 64, t, w('full-time', c)); }, 'sh07-work', { sound: 'swipe' });
};

/* sh08 [15, 1, 13] · Figtree: city streets, a red pin label, clean green caps, green / red label boxes */
PCB.SH.sh08 = (w) => {
  const LK = LOOK.sh08, GR = LK.green;
  const pin = (key, s, t, at) => { const p = pe(t, at, 0.3); const z = 46; const f = LK.B(z); const wA = tw(s, f); const x = CX - (wA + 50) / 2, y = 180;
    withA(p, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 14; circle(x + 16, y - z * 0.42, 15, LK.blue); rect(x + 14, y - z * 0.42, 4, 28, LK.blue); ctx.restore(); PCB.T(key, s, x + 50, y, f, { col: '#FFFFFF', shadow: 'rgba(0,0,0,0.7)' }); }); };
  const gbox = (key, s, x, y, t, at) => { const p = pb(t, at, 0.3); if (p <= 0) return; PCB.T(key, s, x, y, LK.A(62), { col: LK.green, box: LK.navy, boxPad: 18, boxR: 6, sc: 0.7 + 0.3 * p, a: Math.min(1, p * 2) }); };
  const val = (key, s, x, y, z, t, at) => { const p = pe(t, at, 0.3); PCB.T(key, s, x, y, LK.B(z), { col: '#FFFFFF', box: 'rgba(46,62,88,0.88)', boxPad: z * 0.22, boxR: 6, a: p }); };
  const rbox = (key, s, x, y, t, at) => { const p = pb(t, at, 0.3); if (p <= 0) return; PCB.T(key, s, x, y, LK.A(64), { col: LK.navy, box: LK.green, boxPad: 18, boxR: 8, sc: 0.7 + 0.3 * p, a: Math.min(1, p * 2) }); };
  const big = (key, s, y, z, t, at) => { const p = pb(t, at, 0.34); if (p <= 0) return; PCB.T(key, s, CX, y, LK.A(z), { align: 'center', col: GR, shadow: 'rgba(0,0,0,0.6)', blur: 0.3, sc: 0.7 + 0.3 * p, a: Math.min(1, p * 2) }); };
  const a = w('i was checking'), b = w('finland also', a), c = w('but i noticed', b), d = w('maybe', c);
  PCB.cut(a - 0.12, b - 0.04, (t, r) => { PCB.photo(t, 'oslo', r, { at: a, credit: 'Eswaran Arulkumar', cy: 1870 }); pin('n-pin', 'Oslo, Norway', t, a);
    gbox('n-nhh', "NHH · MASTER'S", 80, 1080, t, w('norwegian school', a)); val('n-fee', 'NOK 204,000 a year', 84, 1210, 72, t, w('204,000', a) - 0.1);
    rbox('n-live', '+ NOK 170,000 FOR LIVING', 84, 1360, t, w('170,000', a) - 0.1); PCB.T('n-src', 'NHH · UDI (udiregelverk.no) · 2 Nov 2026', 84, 1460, LK.B(30), { col: '#FFFFFF', shadow: 'rgba(0,0,0,0.8)', a: pe(t, w('170,000', a), 0.3) }); }, 'sh08-no');
  sfx('pop', w('204,000', a) - 0.1, -4); sfx('sticker', w('170,000', a) - 0.1, -3);
  PCB.cut(b - 0.12, c - 0.04, (t, r) => { PCB.photo(t, 'helsinki', r, { at: b, credit: 'Antti Kulmanen', cy: 1870 }); pin('f-pin', 'Helsinki, Finland', t, b);
    gbox('f-uef', "UEF · MASTER'S", 80, 1080, t, w('eastern finland', b)); val('f-fee', '€10,000–12,000 a year', 84, 1210, 72, t, w('10,000', b) - 0.1);
    rbox('f-pof', '+ €9,600 IN YOUR ACCOUNT', 84, 1360, t, w('9,600', b) - 0.1); }, 'sh08-fi');
  sfx('pop', w('10,000', b) - 0.1, -4); sfx('sticker', w('9,600', b) - 0.1, -3);
  PCB.cut(c - 0.12, d - 0.04, (t, r) => { PCB.photo(t, 'graduation', r, { at: c, dim: 0.15, credit: 'clmcdk fejcn', fy: 0.4, cy: 1870 }); big('g-sch', 'SCHOLARSHIPS', 820, 128, t, w('scholarships', c)); gbox('g-cov', 'SOME COVER TUITION', 240, 1000, t, w('cover tuition', c)); }, 'sh08-sch');
  sfx('pop', w('scholarships', c), -4);
};

/* sh09 [14, 20, 22] · Montserrat: the heavy white title + condensed caps captions; her talking all through, ONE punch-in (manifest punch) */
PCB.SH.sh09 = (w) => { const a = w('czech republic'), b = w('and italy', a); TH.talk([a - 0.1, b - 0.04], { id: 'cz-free' }); PCB.punchHide(w('literally', a)); };

/* learn-to-code shorts, full-kit pass (projects/FULL-KIT-BRIEF-2026-11-12.md, HER-STANDARD.md "Shorts" + "Fonts"). Loaded LAST in the
 * manifest "common" (after formats.js): it keeps each short's layout (manifest "fmt") and the graphics of moments/plan.js (the
 * video's content, timed to her words), and replaces the LOOK: captions, top label, poster / screen, cover frame and the fonts.
 * Every short copies THREE videos of the formats board (studio /ideas/formats/, manifest "board"), and uses 1-2 fonts from the font
 * board (studio /ideas/boards/fonts/, manifest "fonts") in the colours of their font-board item (manifest "colours"):
 *   sh01 I  [16, 66, 8]   thumbs-02 Inter Tight Bold, white on #1C1C1C, the key word on a yellow #F8D61D box     (pop-up screenshots)
 *   sh02 G  [12, 40, 47]  pair-07 Gloock red #C03520 on black + combo-12 Switzer #A5A3B0 / white karaoke        (letterbox)
 *   sh03 J  [64, 65, 38]  shorts-15 Inter Tight black on a yellow #FFE600 highlight, page #F7F7F5 + DM Mono    (slide behind her)
 *   sh04 B  [6, 18, 25]   shorts-03 Permanent Marker white + orange #FF7A3D on #0E0E0E + design-29 DM Mono code (comic code explainer)
 *   sh05 M  [15, 29, 44]  thumbs-16 Anton white on #222222, the key word on a red #D7262B box                    (label boxes)
 *   sh06 K  [52, 67, 48]  shorts-11 Newsreader white on black boxes + shorts-10 Bodoni Moda caps white / #3C2A22 (film subtitles)
 *   sh07 A  [57, 58, 21]  shorts-20 Satoshi Black Italic, white on navy #1B2440                                   (wide + band)
 *   sh08 D  [9, 36, 3]    thumbs-18 Montserrat ExtraBold, white + yellow #F6C343 on #3A3D3A                       (captions on top)
 * Graphics inside a short draw in the short's own board font: the video kit's "Helvetica Neue" (FO) and RVMono (FM) faces are
 * re-pointed to the short's fonts for this page only (the full edit keeps its own). A line break she types (Shift+Enter) is a real
 * line break in covers and labels; they only shrink to fit. Every text: ovr + regBox (editable, movable, resizable). */
'use strict';
const LB = { id: (FOOT.m && FOOT.m.kind === 'short') ? FOOT.m.id : null };
if (LB.id === 'sh01') RV.skip('ladder');   // critic 2026-11-13: the ladder was unreadable in the small pop-up card; the real Indeed page carries the number
if (LB.id === 'sh04') {   // Formats 6 / 18 (kodekloud): every code panel dark, like the refs (the shorts default keeps them light)
  RV.night = (draw) => (t, r) => { const keep = {}, kg = {}; for (const k in RV.NIGHT) { keep[k] = RV[k]; RV[k] = RV.NIGHT[k]; }
    for (const gk of ['rvGrey', 'rvGreyB', 'rvWhite']) { kg[gk] = { ...G[gk] }; Object.assign(G[gk], RV.NIGHT_G); }
    try { draw(t, r); } finally { Object.assign(RV, keep); for (const gk in kg) G[gk] = Object.assign(G[gk], kg[gk]); } };
  const sheet0 = RV.sheet, form0 = RV.form; RV.sheet = (o) => RV.night(sheet0(o)); RV.form = (o) => RV.night(form0(o)); }
/* the teaser (v3): the kit's "Helvetica Neue" -> Archivo (font board design-07, ink on light grey / cream); its mono stays DM Mono (design-29) */
(function lbTeaserFonts() { if (!(FOOT.m && FOOT.m.kind === 'teaser')) return;
  for (const [file, wt] of [['Archivo.ttf', '100 900']]) {
    try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send(); if (x.status !== 200) continue;
      const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255; const ff = new FontFace('Helvetica Neue', u.buffer, { weight: wt }); document.fonts.add(ff); ff.load(); } catch (e) { /* */ } } })();
(function lbFonts() {
  if (!LB.id) return;
  const add = (fam, file, desc) => { try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + encodeURIComponent(file), false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) { console.error('LB-FONT-MISSING ' + file); return; } const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { console.error('LB-FONT-ERR ' + file + ' ' + e.message); } };
  const IT = (fam) => { add(fam, 'InterTightLight.ttf', { weight: '300' }); add(fam, 'InterTightRegular.ttf', { weight: '400' }); add(fam, 'InterTightMedium.ttf', { weight: '500' });
    add(fam, 'InterTightSemiBold.ttf', { weight: '600' }); add(fam, 'InterTightBold.ttf', { weight: '700' }); add(fam, 'InterTightExtraBold.ttf', { weight: '800' }); add(fam, 'InterTightBlack.ttf', { weight: '900' }); };
  const VAR = (fam, file, style) => add(fam, file, { weight: '100 900', ...(style ? { style } : {}) });
  const FONTS = {
    sh01: () => { IT('LBA'); IT('Helvetica Neue'); IT('LBMono'); },
    sh02: () => { add('LBA', 'Gloock-Regular.ttf', {}); VAR('LBB', 'Switzer-Variable.ttf'); VAR('Helvetica Neue', 'Switzer-Variable.ttf'); VAR('LBMono', 'Switzer-Variable.ttf'); },
    sh03: () => { IT('LBA'); IT('Helvetica Neue'); add('LBB', 'DMMono-Medium.ttf', { weight: '100 900' }); add('LBMono', 'DMMono-Medium.ttf', { weight: '100 900' }); },
    sh04: () => { add('LBA', 'PermanentMarker-Regular.ttf', {}); add('LBB', 'DMMono-Medium.ttf', { weight: '100 900' }); add('Helvetica Neue', 'DMMono-Medium.ttf', { weight: '100 900' }); add('LBMono', 'DMMono-Medium.ttf', { weight: '100 900' }); },
    sh05: () => { add('LBA', 'Anton-Regular.ttf', {}); add('Helvetica Neue', 'Anton-Regular.ttf', { weight: '100 900' }); add('LBMono', 'Anton-Regular.ttf', { weight: '100 900' }); },
    sh06: () => { VAR('LBB', 'Newsreader.ttf'); add('LBA', 'BodoniModa[opsz,wght].ttf', { weight: '400 900' }); VAR('Helvetica Neue', 'Newsreader.ttf'); VAR('LBMono', 'Newsreader.ttf'); },
    sh07: () => { VAR('LBA', 'Satoshi-VariableItalic.ttf'); VAR('Helvetica Neue', 'Satoshi-Variable.ttf'); VAR('LBMono', 'Satoshi-Variable.ttf'); },
    sh08: () => { VAR('LBA', 'Montserrat-Variable.ttf'); VAR('Helvetica Neue', 'Montserrat-Variable.ttf'); VAR('LBMono', 'Montserrat-Variable.ttf'); },
  };
  if (FONTS[LB.id]) FONTS[LB.id]();
})();
/* the video kit's mono (FM = "RVMono") -> the short's own face: FM is a const, so F.mono / FM read the family through this alias */
if (LB.id) { try { for (const f of [...document.fonts]) if (String(f.family).replace(/["']/g, '') === 'RVMono') document.fonts.delete(f); } catch (e) { /* keep */ }
}
(function lbMonoAlias() {   // re-register RVMono from the short's LBMono files (same files, family RVMono)
  if (!LB.id) return; const map = { sh01: ['InterTightMedium.ttf', '100 600', 'InterTightBold.ttf', '601 900'], sh02: ['Switzer-Variable.ttf', '100 900'], sh03: ['DMMono-Medium.ttf', '100 900'], sh04: ['DMMono-Medium.ttf', '100 900'],
    sh05: ['Anton-Regular.ttf', '100 900'], sh06: ['Newsreader.ttf', '100 900'], sh07: ['Satoshi-Variable.ttf', '100 900'], sh08: ['Montserrat-Variable.ttf', '100 900'] }[LB.id]; if (!map) return;
  for (let i = 0; i < map.length; i += 2) { try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + encodeURIComponent(map[i]), false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send(); if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let k = 0; k < s.length; k++) u[k] = s.charCodeAt(k) & 255; const ff = new FontFace('RVMono', u.buffer, { weight: map[i + 1] }); document.fonts.add(ff); ff.load(); } catch (e) { /* */ } }
})();

const LOOK = {
  sh01: { board: [16, 66, 8], fb: ['thumbs-02'], cb: 'thumbs-02', A: (z, w = 700) => `${w} ${z}px LBA`, B: (z, w = 800) => `${w} ${z}px LBA`, ground: '#1C1C1C', ink: '#FFFFFF', yel: '#F8D61D', dark: '#1C1C1C' },
  sh02: { board: [12, 40, 47], fb: ['pair-07', 'combo-12'], cb: 'pair-07 + combo-12', A: (z) => `400 ${z}px LBA`, B: (z, w = 500) => `${w} ${z}px LBB`, ground: '#000000', red: '#C03520', grey: '#A5A3B0', ink: '#FFFFFF' },
  sh03: { board: [64, 65, 38], fb: ['shorts-15'], cb: 'shorts-15', A: (z, w = 800) => `${w} ${z}px LBA`, B: (z) => `500 ${z}px LBB`, page: '#F7F7F5', yel: '#FFE600', ink: '#111111' },
  sh04: { board: [6, 18, 25], fb: ['shorts-03', 'design-29'], cb: 'shorts-03', A: (z) => `400 ${z}px LBA`, B: (z) => `500 ${z}px LBB`, ground: '#0E0E0E', org: '#FF7A3D', ink: '#FFFFFF' },
  sh05: { board: [15, 29, 44], fb: ['thumbs-16'], cb: 'thumbs-16', A: (z) => `400 ${z}px LBA`, B: (z) => `400 ${z}px LBA`, ground: '#222222', red: '#D7262B', ink: '#FFFFFF' },
  sh06: { board: [52, 67, 48], fb: ['shorts-11', 'shorts-10'], cb: 'shorts-11 + shorts-10', A: (z, w = 500) => `${w} ${z}px LBA`, B: (z, w = 400) => `${w} ${z}px LBB`, brown: '#3C2A22', ink: '#FFFFFF', box: 'rgba(0,0,0,0.86)' },
  sh07: { board: [57, 58, 21], fb: ['shorts-20'], cb: 'shorts-20', A: (z, w = 900) => `italic ${w} ${z}px LBA`, B: (z, w = 900) => `italic ${w} ${z}px LBA`, navy: '#1B2440', ink: '#FFFFFF' },
  sh08: { board: [9, 36, 3], fb: ['thumbs-18'], cb: 'thumbs-18', A: (z, w = 800) => `${w} ${z}px LBA`, B: (z, w = 700) => `${w} ${z}px LBA`, ground: '#3A3D3A', yel: '#F6C343', ink: '#FFFFFF' },
};
LB.L = () => LOOK[LB.id];
const TOPB = { y0: 96, y1: 430 };

/* ---------- the short's own colours on the shared grounds ---------- */
if (LB.id && LOOK[LB.id]) { const L = LB.L();
  const amb = { sh01: '#FFFFFF', sh03: L.page, sh04: L.ground }[LB.id];
  if (amb) G.lcAmb = { ...G.lcAmb, bg: amb, fg: LB.id === 'sh04' ? '#FFFFFF' : '#111111', mode: LB.id === 'sh04' ? 'dark' : 'light' };
  if (LB.id === 'sh07') TH.look.band = L.navy; else if (LB.id === 'sh08') TH.look.band = L.ground; else if (LB.id === 'sh04') TH.look.band = L.ground;
  if (LB.id === 'sh03') LCF.wall = '#2B2B2A';
  if (LB.id === 'sh02') { G.lbBlack = { ...G.rvInk, bg: '#000000', panel: '#111111' }; TH.look.ground = 'lbBlack'; }
}

/* ---------- text parts ---------- */
LB.split = (s) => String(s).split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
/** a block of text that fits a box. Her line breaks (\n) are kept, the lines only shrink; without one it wraps to <= maxL lines.
 *  o: font(z), zMax, zMin, maxW, maxL, maxH, x, y, align, col, hi (colour of ~words~), hiBox (box behind ~words~), hiInk, up, lh, ls (em),
 *  shadow, box (one box round all), lineBox (a box per line), boxPad (em), boxR, fill ('each' = each of her lines fills the width, zLine cap) */
LB.block = (ov, info, str, o) => { const lh = o.lh || 1.06, up = (s) => (o.up ? s.toUpperCase() : s); const plain = up(String(str).replace(/~/g, '')); const lsE = o.ls || 0; let L, zs;
  const zMin = o.zMin || 26; const fitW = (l, zTop) => { let z = zTop; while (z > zMin && tw(l, o.font(z), lsE * z) > o.maxW) z -= 2; return z; };
  const hand = LB.split(plain);
  if (hand.length > 1) { L = hand; zs = o.fill === 'each' ? L.map(l => Math.min(fitW(l, o.zLine || o.zMax * 1.4), o.zLine || 999)) : (() => { const z1 = Math.min(...L.map(l => fitW(l, o.zMax))); return L.map(() => z1); })();
    const tot = zs.reduce((a, z) => a + z * lh, 0); if (o.maxH && tot > o.maxH) { const k = o.maxH / tot; zs = zs.map(z => Math.max(zMin, Math.floor(z * k))); } }
  else { let z = o.zMax; for (; z >= zMin; z -= 2) { L = LCF.wrap(plain, o.font(z), o.maxW); if (L.length <= (o.maxL || 2) && L.every(l => tw(l, o.font(z), lsE * z) <= o.maxW) && (!o.maxH || L.length * z * lh <= o.maxH)) break; }
    z = Math.max(z, zMin); L = LCF.wrap(plain, o.font(z), o.maxW).slice(0, o.maxL || 2); zs = L.map(() => z); }
  const F = zs.map(z => o.font(z)), LS = zs.map(z => lsE * z); const hiSet = new Set(); String(str).replace(/~([^~]+)~/g, (_, m) => { up(m).split(/\s+/).forEach(x => hiSet.add(x)); return ''; });
  const lw = L.map((l, i) => tw(l, F[i], LS[i])); const bw = Math.max(...lw); const LT = []; let acc = 0; zs.forEach(z => { LT.push(acc); acc += z * lh; }); const bh = acc; const z0 = Math.max(...zs);
  const bx = o.align === 'center' ? o.x - bw / 2 : o.align === 'right' ? o.x - bw : o.x; const by = o.y; const pad = (o.boxPad != null ? o.boxPad : 0.28) * z0;
  const bb = o.box || o.lineBox ? [bx - pad, by - pad * 0.5, bw + 2 * pad, bh + pad] : [bx, by, bw, bh];
  if (ov.hide) { regBox(ov, ...bb, info); return bb; }
  moved(ov, () => { ctx.save(); if (o.box) fillRR(bb[0], bb[1], bb[2], bb[3], o.boxR || 0, o.box);
    L.forEach((l, i) => { const zi = zs[i], f = F[i], ls = LS[i]; const x0 = o.align === 'center' ? o.x - lw[i] / 2 : o.align === 'right' ? o.x - lw[i] : o.x; const y = by + LT[i] + zi * 0.82 + (lh - 1) * zi * 0.5;
      const pd = (o.boxPad != null ? o.boxPad : 0.28) * zi; if (o.lineBox) fillRR(x0 - pd, y - zi * 0.86 - pd * 0.25, lw[i] + 2 * pd, zi * 1.08 + pd * 0.5, o.boxR || 0, o.lineBox);
      let x = x0; const sp = tw(' ', f, ls);
      l.split(' ').forEach((wd) => { const on = hiSet.has(wd.replace(/[,.?!:]$/, '')) || hiSet.has(wd); const ww = tw(wd, f, ls); setFont(f, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.save();
        if (on && o.hiBox) { ctx.restore(); fillRR(x - zi * 0.1, y - zi * 0.86, ww + zi * 0.2, zi * 1.06, 0, o.hiBox); ctx.save(); setFont(f, ls); }
        if (o.shadow && !(on && o.hiBox)) { ctx.shadowColor = o.shadow; ctx.shadowBlur = zi * 0.28; ctx.shadowOffsetY = zi * 0.04; }
        ctx.fillStyle = on ? (o.hiBox ? (o.hiInk || '#111') : (o.hi || o.col)) : (o.col || '#FFFFFF'); ctx.fillText(wd, x, y); ctx.restore(); x += ww + sp; }); });
    if (o.under) o.under(bb, z0, L); ctx.restore(); regBox(ov, ...bb, info); }, [bb[0], bb[1]]);
  return bb; };
/** one plain line (editable): key, def, x, y (baseline), font, o {align, col, shadow, a} */
LB.T = (key, def, x, y, font, o = {}) => { const ov = ovr(key); const s = ov.s != null ? ov.s : def; const fs = fontPx(font); const w = tw(s, font); const bx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
  const info = { text: s, def }; if (ov.hide) { regBox(ov, bx, y - fs * 0.85, w, fs * 1.1, info); return; } if (o.a != null && o.a <= 0.002) return;
  moved(ov, () => { ctx.save(); if (o.a != null) ctx.globalAlpha *= clamp(o.a); if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = fs * 0.3; } _txt(s, bx, y, font, o.col || '#FFFFFF', 'left'); ctx.restore(); regBox(ov, bx, y - fs * 0.85, w, fs * 1.1, info); }, [bx + w / 2, y]); };
LB.cline = (key, def, o) => { const ov = ovr(key); const str = ov.s != null ? ov.s : def; return LB.block(ov, { text: str, def, kind: 'box', label: 'cover line (text; Shift+Enter = a new line; ~word~ = the coloured word)' }, str, o); };

/* ---------- captions ---------- */
LB.cue = (t) => { const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return null; const ce = (EDIT.data.capShort || {})[c.i]; return { c, ce, raw: ce != null ? ce : c.text, cst: EDIT.data.captions9 || {} }; };
/** the words of this cue now: n words at a time on her word times (phrases end on punctuation), or all of them */
LB.now = (q, t, n) => { const all = q.raw.replace(/([,.?!])\1+/g, '$1').split(/\s+/).filter(Boolean); const wt = (q.c.ws && q.c.ws.length === all.length) ? q.c.ws.map(w => w.t) : all.map((_, i) => q.c.t0 + (q.c.t1 - q.c.t0) * 0.9 * i / Math.max(1, all.length));
  if (!n) return { all, wt, pick: all.map((_, i) => i) };
  const ch = []; let cur = []; all.forEach((w, i) => { cur.push(i); if (/[,.?!:;]$/.test(w) || cur.length === n) { ch.push(cur); cur = []; } });
  if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length <= n) ch[ch.length - 1].push(...cur); else ch.push(cur); }
  let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; return { all, wt, pick }; };
/** st: font(size), size, cy, maxW, col, up, lower, hiCol, hiBox, hiInk, shadow, box (per line), boxR, lh, lit {dim}, n (words at a time) */
LB.cap = (t, q, st) => { const { all, wt, pick } = LB.now(q, t, st.n); const hi = LCF.hiWord(all); const fix = (w) => st.up ? w.toUpperCase() : st.lower ? (/^i('|$)/i.test(w) ? 'I' + w.slice(1).toLowerCase() : /^ai$/i.test(w.replace(/[.,?!]/g, '')) ? w : w.toLowerCase()).replace(/[.]$/, '') : w;
  const words = pick.map(i => fix(all[i])); let size = q.cst.size ? clamp(Math.round(q.cst.size), 36, 150) : st.size; const maxW = st.maxW || W * 0.84; let f = st.font(size); const j = (l) => l.join(' ');
  let lines = [words.map((w, k) => [w, pick[k]])];
  if (tw(j(words), f) > maxW && words.length > 1) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(j(words.slice(0, k)), f), tw(j(words.slice(k)), f)); if (m_ < bm) { bm = m_; bi = k; } }
    const p = words.map((w, k) => [w, pick[k]]); lines = [p.slice(0, bi), p.slice(bi)]; }
  const wide = Math.max(...lines.map(l => tw(l.map(x => x[0]).join(' '), f))); if (wide > maxW) { size = Math.round(size * Math.max(0.62, maxW / wide)); f = st.font(size); }
  const lh = size * (st.lh || 1.14); const cy = q.cst.y != null ? q.cst.y : st.cy; const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36; const sp = tw(' ', f); let bx0 = 1e9, bx1 = -1e9;
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; const s = ln.map(x => x[0]).join(' '); const wd = tw(s, f); const x0 = CX - wd / 2; bx0 = Math.min(bx0, x0); bx1 = Math.max(bx1, x0 + wd);
    if (st.box) { const px = size * 0.3; fillRR(x0 - px, y - size * 0.88, wd + px * 2, size * 1.22, st.boxR != null ? st.boxR : 6, st.box); }
    let x = x0; ln.forEach(([w_, k]) => { const ww = tw(w_, f); const on = k === hi && (st.hiCol || st.hiBox); ctx.save(); setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (on && st.hiBox) fillRR(x - size * 0.1, y - size * 0.86, ww + size * 0.2, size * 1.08, 4, st.hiBox);
      else if (st.shadow) { ctx.shadowColor = st.shadow; ctx.shadowBlur = size * 0.3; ctx.shadowOffsetY = size * 0.05; }
      let col = st.col || '#FFFFFF'; if (on) col = st.hiBox ? (st.hiInk || '#111111') : st.hiCol; if (st.lit && t < wt[k] - 0.02) col = st.lit;
      ctx.fillStyle = col; ctx.fillText(w_, x, y); ctx.restore(); x += ww + sp; }); });
  ctx.restore(); const px = st.box ? size * 0.3 : 0;
  regBox({ id: 'caption/' + q.c.i, edited: q.ce != null, hide: false }, bx0 - px, y0 - size * 0.95, bx1 - bx0 + 2 * px, (lines.length - 1) * lh + size * 1.3, { kind: 'caption', text: q.raw, def: q.c.text, cue: q.c.i }); };
LB.CAP = {
  // [8, 16, 66] nandini: bold caps 2-3 words, chest height; Thumbnails 21: the key word on a yellow box
  sh01: (t, q) => LB.cap(t, q, { font: (z) => LOOK.sh01.B(z, 800), size: 74, cy: 1540, n: 3, up: true, hiBox: LOOK.sh01.yel, hiInk: '#111111', shadow: 'rgba(0,0,0,0.75)', lh: 1.06 }),
  // [40] karaoke under the letterbox: unsaid words grey #A5A3B0, said words white (Switzer, combo-12)
  sh02: (t, q) => LB.cap(t, q, { font: (z) => LOOK.sh02.B(z, 600), size: 64, cy: LCF.inGfx(t) ? 1745 : 1440, col: '#FFFFFF', lit: 'rgba(255,255,255,0.55)', maxW: W * 0.82, lh: 1.2 }),
  // [64] bold white caps, a yellow key word, low on her (the screen behind her stays clear)
  sh03: (t, q) => LB.cap(t, q, { font: (z) => LOOK.sh03.A(z, 800), size: 76, cy: 1540, n: 3, up: true, hiCol: LOOK.sh03.yel, shadow: 'rgba(0,0,0,0.8)', lh: 1.04 }),
  // [6, 18] comic caps, white with an orange key word, on the black seam under the code
  sh04: (t, q) => LB.cap(t, q, { font: LOOK.sh04.A, size: 64, cy: 1730, n: 3, up: true, hiCol: LOOK.sh04.org, shadow: 'rgba(0,0,0,0.85)', box: 'rgba(14,14,14,0.9)', boxR: 10, lh: 1.16 }),
  // [15, 29] Anton caps, 2-3 words, the key word on a red box
  sh05: (t, q) => LB.cap(t, q, { font: LOOK.sh05.A, size: 92, cy: LCF.inGfx(t) ? 1735 : 1540, n: 3, up: true, hiBox: LOOK.sh05.red, hiInk: '#FFFFFF', shadow: 'rgba(0,0,0,0.7)', lh: 1.1 }),
  // [52, 67] white serif sentence case on black boxes, one box per line, low
  sh06: (t, q) => LB.cap(t, q, { font: (z) => LOOK.sh06.B(z, 450), size: 56, cy: LCF.inGfx(t) ? 1690 : 1560, box: LOOK.sh06.box, boxR: 4, maxW: W * 0.8, lh: 1.34 }),
  // [57, 58] huge white heavy italic lowercase, 2 words at a time, in the navy band
  sh07: (t, q) => LB.cap(t, q, { font: LOOK.sh07.B, size: 104, cy: LCF.inGfx(t) ? 1100 : 1700, n: 2, lower: true, box: LCF.inGfx(t) ? LOOK.sh07.navy : null, boxR: 0, maxW: W * 0.9, lh: 1.0 }),
  // [9, 36] clean sans sentence case, the key word yellow; in the top band (on her chest while a graphic is under her)
  sh08: (t, q) => LB.cap(t, q, { font: (z) => LOOK.sh08.A(z, 700), size: 64, cy: LCF.inGfx(t) ? 760 : 196, n: 5, hiCol: LOOK.sh08.yel, box: LCF.inGfx(t) ? 'rgba(58,61,58,0.94)' : null, boxR: 8, maxW: W * 0.86, lh: 1.16 }),
};

/* ---------- top labels (editable as 'label'; Shift+Enter = a second line); inside TOPB, max 2 lines, hidden while a graphic is up ---------- */
LB.label = (draw) => LCF.smallText('label', FOOT.m.topLabel || LCF.labText, (ov, str, info) => draw(ov, str, { ...info, label: 'title (text; Shift+Enter = a new line; ~word~ = the marked word)' }), 'title');
const BANDW = W - 140;
LB.TITLE = {
  sh01: (t) => { if (LCF.inGfx(t)) return; LB.label((ov, str, info) => LB.block(ov, info, str, { font: (z) => LOOK.sh01.A(z, 700), zMax: 78, zMin: 44, maxW: BANDW, maxL: 2, maxH: 200, x: CX, y: TOPB.y0 + 40, align: 'center', col: '#FFFFFF', hiBox: LOOK.sh01.yel, hiInk: '#111111', shadow: 'rgba(0,0,0,0.6)', lh: 1.1 })); },
  sh02: (t) => { const a = 1 - LCF.gfxSpans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0); if (a <= 0.01) return;
    withA(a, () => LB.label((ov, str, info) => LB.block(ov, info, str, { font: LOOK.sh02.A, zMax: 104, zMin: 56, maxW: W - 150, maxL: 3, maxH: 380, x: CX, y: 200, align: 'center', col: LOOK.sh02.red, lh: 1.08, ls: -0.01 }))); },
  sh05: (t) => { if (LCF.inGfx(t)) return; LB.label((ov, str, info) => LB.block(ov, info, str, { font: LOOK.sh05.A, zMax: 96, zMin: 50, maxW: BANDW, maxL: 2, maxH: 230, x: CX, y: TOPB.y0 + 40, align: 'center', col: '#FFFFFF', up: true, hiBox: LOOK.sh05.red, hiInk: '#FFFFFF', shadow: 'rgba(0,0,0,0.6)', lh: 1.08 })); },
  sh06: (t) => { if (LCF.inGfx(t)) return; LB.label((ov, str, info) => LB.block(ov, info, str, { font: (z) => LOOK.sh06.A(z, 500), zMax: 64, zMin: 36, maxW: BANDW, maxL: 2, maxH: 160, x: CX, y: TOPB.y0 + 50, align: 'center', col: '#FFFFFF', up: true, ls: 0.06, shadow: 'rgba(0,0,0,0.6)', lh: 1.1 })); },
  sh07: (t) => { if (LCF.inGfx(t)) return; LB.label((ov, str, info) => LB.block(ov, info, str, { font: LOOK.sh07.A, zMax: 70, zMin: 44, maxW: BANDW, maxL: 1, maxH: 120, x: 70, y: TOPB.y0 + 6, align: 'left', col: '#FFFFFF', shadow: 'rgba(0,0,0,0.6)', lh: 1.02, ls: -0.02 })); },
  sh08: (t) => { if (t >= LCF.FLASH + 0.35) return; const p = clamp((t - LCF.FLASH) / 0.35); const pe = p * p * (3 - 2 * p); const h = 384;
    withA(1 - pe, () => { rect(0, 0, W, h, LOOK.sh08.ground); LB.label((ov, str, info) => LB.block(ov, info, str, { font: (z) => LOOK.sh08.A(z, 800), zMax: 92, zMin: 48, maxW: BANDW, maxL: 2, maxH: 240, x: CX, y: 80, align: 'center', col: '#FFFFFF', hi: LOOK.sh08.yel, lh: 1.08 })); }); },
};
/* B (sh04): the title poster above her while she talks: comic caps on black (Formats 6) */
LB.poster04 = (t, r) => { const L = LOOK.sh04; rect(r.x, r.y, r.w, r.h, L.ground); if (LCF.coverOn(t)) return;
  LCF.smallText('poster', FOOT.m.topLabel || '', (ov, str, info) => LB.block(ov, info, str, { font: L.A, zMax: 170, zMin: 70, maxW: r.w - 140, maxL: 3, maxH: 280, x: r.x + r.w / 2, y: r.y + 110, align: 'center', col: '#FFFFFF', hi: L.org, up: true, lh: 1.04, ls: -0.01 }), 'the title above her (text; Shift+Enter = a new line; ~word~ = orange)'); };
/* J (sh03): the screen behind her = a Formats 65 page: mono line + black words on a yellow highlight */
LB.jRoom03 = (t, q, content, ground) => { const S = LCF.JS, L = LOOK.sh03; rect(0, 1560, W, H - 1560, '#1A1A19'); rect(0, 1556, W, 4, '#3A3A38');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.46) }; const isP = content === LCF.poster || !content; const g0 = g; g = G[isP ? 'lcAmb' : (ground || 'rvInk')] || g0; rect(S.x, S.y, S.w, S.h, isP ? L.page : g.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint'); ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (isP && LCF.coverOn(t)) return; if (isP) { LB.T('poster-mono', 'SKILL 1 OF 4  ·  AI WRITES THE CODE', r.x + 50, r.y + 76, LOOK.sh03.B(30), { col: '#111111' });
      const sid = SCENE_ID; SCENE_ID = 'label'; const ov = ovr('poster'); const def = FOOT.m.poster || 'Reading code'; const s = ov.s != null ? ov.s : def;
      LB.block(ov, { text: s, def, kind: 'box', label: 'the words on the screen behind her' }, s, { font: (z) => L.A(z, 800), zMax: 150, zMin: 60, maxW: r.w - 120, maxL: 2, maxH: r.h - 150, x: r.x + 56, y: r.y + 130, align: 'left', col: '#111111', lineBox: L.yel, boxPad: 0.12, lh: 1.12, ls: -0.03 }); SCENE_ID = sid; }
    else content(t, r); });
  ctx.restore(); g = g0; rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C'); };

/* ---------- covers (the first 0.1 s; lines editable as cover/cover, cover/cover-2) ---------- */
LB.her = (o = {}) => { const im = IMG['cover_' + LB.id]; if (!im) { rect(0, 0, W, H, '#222'); return; } const dy = o.dy || 0;
  grp('her', 0, 0, W, H, () => { ctx.save(); themeFixed(() => ctx.drawImage(im, 0, -dy, W, H)); if (o.dim) rect(0, 0, W, H, `rgba(0,0,0,${o.dim})`); ctx.restore(); }, { img: true, label: 'her frame (drag to move, corners to resize)' }); };
LB.page = (name, x, y, w, o = {}) => { const im = IMG['clip_' + name]; const c = (typeof RV_CLIPS !== 'undefined' && RV_CLIPS[name]) || null; if (!im) return 0; const h = w * im.height / im.width;
  grp('page-' + name, x, y, w, h, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; rect(x - 18, y - 18, w + 36, h + 36, '#FFFFFF'); ctx.restore(); themeFixed(() => ctx.drawImage(im, x, y, w, h)); }, { img: true, label: 'real page (drag to move, corners to resize)' });
  if (o.credit) LB.T('cover-credit', o.credit, x, y + h + 70, o.credFont, { col: o.credCol || 'rgba(255,255,255,0.8)' }); return h; };
LB.COVERS = {
  // frame kind: the real Indeed page from the short under the line (Formats 16 / 66 pop-up screenshot), dark ground of Thumbnails 21
  sh01: (c) => { const L = LOOK.sh01; LB.her({ dy: -180 }); grp('band', 0, 0, W, 640, () => rect(0, 0, W, 640, L.ground));
    return LB.cline('cover', c.text, { font: (z) => L.A(z, 800), zMax: 124, zLine: 150, fill: 'each', zMin: 64, maxW: W - 150, maxL: 4, maxH: 470, x: CX, y: 110, align: 'center', col: '#FFFFFF', hiBox: L.yel, hiInk: '#111111', lh: 1.1, ls: -0.02 }); },
  // her real room; a black band on top with the red Gloock line (pair-07), the letterbox look of Formats 12 / 40
  sh02: (c) => { const L = LOOK.sh02; rect(0, 0, W, H, L.ground);   // big line alone: the black page of Formats 12 / 40, red Gloock (pair-07) + a Switzer line (combo-12)
    const bb = LB.cline('cover', c.text, { font: L.A, zMax: 150, zLine: 170, fill: 'each', zMin: 64, maxW: W - 140, maxL: 4, maxH: 700, x: CX, y: 520, align: 'center', col: L.red, lh: 1.04 });
    if (c.sub) LB.cline('cover-2', c.sub, { font: (z) => L.B(z, 500), zMax: 54, zMin: 34, maxW: W - 200, maxL: 2, x: CX, y: bb[1] + bb[3] + 60, align: 'center', col: L.grey, lh: 1.2 }); return bb; },
  // big line alone: the Formats 65 page (mono line, black words on yellow highlight)
  sh03: (c) => { const L = LOOK.sh03; LB.her({ dy: -420 }); grp('page', 0, 0, W, 860, () => rect(0, 0, W, 860, L.page));   // frame: the short's own slide (Formats 65 page) over her
    LB.T('cover-mono', 'THE SKILL AI MAKES MORE IMPORTANT', 90, 300, L.B(34), { col: '#111111' });
    return LB.cline('cover', c.text, { font: (z) => L.A(z, 800), zMax: 130, zLine: 150, fill: 'each', zMin: 64, maxW: W - 200, maxL: 4, maxH: 420, x: 90, y: 370, align: 'left', col: '#111111', lineBox: L.yel, boxPad: 0.12, lh: 1.16, ls: -0.035 }); },
  // big line alone: comic caps huge on black (Formats 6 / 18 title cards)
  sh04: (c) => { const L = LOOK.sh04; rect(0, 0, W, H, L.ground);
    const bb = LB.cline('cover', c.text, { font: L.A, zMax: 230, zLine: 250, fill: 'each', zMin: 90, maxW: W - 140, maxL: 3, maxH: 700, x: CX, y: 520, align: 'center', col: '#FFFFFF', hi: L.org, up: true, lh: 1.02 });
    if (c.sub) LB.cline('cover-2', c.sub, { font: L.B, zMax: 48, zMin: 30, maxW: W - 160, maxL: 2, x: CX, y: bb[1] + bb[3] + 60, align: 'center', col: '#FFFFFF', lh: 1.2 }); return bb; },
  // her real room; Anton caps with the key word on a red box (Thumbnails 113)
  sh05: (c) => { const L = LOOK.sh05; LB.her();   // her real room, the words on the wall above her head (Formats 15: words in the street scene), strong shadow, no band
    const bb = LB.cline('cover', c.text, { font: L.A, zMax: 132, zMin: 70, maxW: W - 140, maxL: 3, maxH: 300, x: CX, y: 250, align: 'center', col: '#FFFFFF', up: true, hiBox: L.red, hiInk: '#FFFFFF', shadow: 'rgba(0,0,0,0.85)', lh: 1.06 });
    if (c.sub) LB.cline('cover-2', c.sub, { font: L.A, zMax: 56, zMin: 36, maxW: W - 200, maxL: 1, x: CX, y: bb[1] + bb[3] + 20, align: 'center', col: '#FFFFFF', up: true, shadow: 'rgba(0,0,0,0.85)' }); return bb; },
  // frame kind: the pharmacy shelf photo from the short, Bodoni caps (Formats 48) + a Newsreader line on a black box (Formats 52)
  sh06: (c) => { const L = LOOK.sh06; rect(0, 0, W, H, L.brown);   // frame: the short's own shelf (which batch expires first) under Bodoni caps (Formats 48) + a Newsreader line on a black box (Formats 52)
    const bb = LB.cline('cover', c.text, { font: (z) => L.A(z, 500), zMax: 132, zMin: 60, maxW: W - 140, maxL: 4, maxH: 400, x: CX, y: 300, align: 'center', col: '#FFFFFF', up: true, lh: 1.04, ls: 0.01 });
    let y2 = bb[1] + bb[3] + 60; if (c.sub) { const b2 = LB.cline('cover-2', c.sub, { font: (z) => L.B(z, 450), zMax: 60, zMin: 40, maxW: W - 220, maxL: 2, x: CX, y: y2, align: 'center', col: '#FFFFFF', lineBox: L.box, boxPad: 0.3, lh: 1.3 }); y2 = b2[1] + b2[3] + 60; }
    const r = { x: 70, y: Math.max(y2, 760), w: W - 140, h: 820 }; try { RV.shelf({ at: -20, firstAt: -19, batchAt: -18 })(30, r); } catch (e) { console.error('LB-COVER ' + e.message); } return bb; },
  // her real room; a navy band (shorts-20) with huge white heavy italic words (Formats 57)
  sh07: (c) => { const L = LOOK.sh07; LB.her({ dy: 120 }); grp('band', 0, 1180, W, H - 1180, () => rect(0, 1180, W, H - 1180, L.navy));   // her higher, the navy band under her (Formats 57 words low)
    return LB.cline('cover', c.text, { font: L.A, zMax: 120, zMin: 64, maxW: W - 150, maxL: 4, maxH: 420, x: 80, y: 1230, align: 'left', col: '#FFFFFF', lh: 1.0, ls: -0.03 }); },
  // big line alone: Montserrat white + the yellow line on #3A3D3A (Thumbnails 162), three plain boxes = the parts of an app
  sh08: (c) => { const L = LOOK.sh08; rect(0, 0, W, H, L.ground);
    const bb = LB.cline('cover', c.text, { font: (z) => L.A(z, 800), zMax: 150, zLine: 160, fill: 'each', zMin: 70, maxW: W - 160, maxL: 3, maxH: 520, x: CX, y: 420, align: 'center', col: '#FFFFFF', hi: L.yel, lh: 1.08, ls: -0.02 });
    if (c.sub) LB.cline('cover-2', c.sub, { font: (z) => L.B(z, 600), zMax: 56, zMin: 36, maxW: W - 220, maxL: 2, x: CX, y: bb[1] + bb[3] + 60, align: 'center', col: '#FFFFFF', lh: 1.2 });
    const y = 1230, bw = 250, gap = 70, x0 = CX - (bw * 3 + gap * 2) / 2; grp('parts', x0, y, bw * 3 + gap * 2, 170, () => { ['browser', 'server', 'database'].forEach((s, i) => { const x = x0 + i * (bw + gap);
      ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.strokeRect(x, y, bw, 150); ctx.restore(); _txt(s, x + bw / 2, y + 92, L.B(40, 700), '#FFFFFF', 'center');
      if (i < 2) { rect(x + bw + 8, y + 73, gap - 16, 5, L.yel); } }); }); return bb; },
};

/* ---------- hooks ---------- */
(function lbHooks() {
  if (!LB.id || !LOOK[LB.id]) return; const cap0 = LCF.capFmt, title0 = LCF.titleFmt, cover0 = LCF.coverDraw, jroom0 = LCF.jRoom, poster0 = LCF.poster;
  LCF.capFmt = (t) => { const fn = LB.CAP[LB.id]; if (!fn) return cap0(t); if (!PORTRAIT || t >= FOOT.dur || !LCF.capsOn) return; if (LB.id === 'sh08' && t < LCF.FLASH + 0.36) return;
    if (RV.fixCaps) RV.fixCaps(); const q = LB.cue(t); if (!q) return; const sc = SCENES[sceneIndex(t)]; if (sc && sc.noCaps) return; fn(t, q); };
  LCF.titleFmt = (t) => { const fn = LB.TITLE[LB.id]; if (fn) fn(t); };
  LCF.coverDraw = (t) => { const fn = LB.COVERS[LB.id]; const c = LCF.coverOf(); if (!fn || !c) return cover0(t); const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear(); try { fn(c); } finally { SCENE_ID = sid; } };
  if (LB.id === 'sh03') LCF.jRoom = LB.jRoom03;
  if (LB.id === 'sh04') LCF.poster = LB.poster04;
})();

/* nothing of the short's own graphics runs into the ending card (it entered over the last graphic for 0.2 s) */
if (LB.id) { const RVP0 = RV_PLAN; RV_PLAN = function (mode) { RVP0(mode); if (mode === 'short' && FOOT.dur) for (const x of TH.segs) if (x.t1 > FOOT.dur) x.t1 = FOOT.dur; }; }
/* teaser captions: a doubled comma / full stop from the transcript (",,", "..") shows once */
if (FOOT.m && FOOT.m.kind === 'teaser') { const cd0 = RV.capDraw; RV.capDraw = (t) => { for (const c of TH.caps || []) if (c.text && /([,.?!])\1/.test(c.text)) c.text = c.text.replace(/([,.?!])\1+/g, '$1'); return cd0(t); }; }

/* doomscrolling: shorts FORMATS + COVER (FULL-KIT pass 2026-11-13): ported from the-edge-case-you-think-is-impossible
 * moments/formats.js (font-board aware: BG.FB from moments/fontboard.js; Shift+Enter lines; cover styles photo / card / frame /
 * big, no line pattern when BG.FB is set), on top of this video's Offline Bingo panels (butter / ink). Kept from the old doomscrolling
 * version (build/before-fullkit/formats.js): B / C / J fill every gap with the format's talking layout; captions under her chin in
 * H / I / M. New: every caption is a short phrase (2-5 words) in every format (her rule 2026-11-12).
 * Manifest per short: "fmt" (A wide, B split poster, C cut-out + poster, D title flash, F square + karaoke, G letterbox, H full frame,
 * I pop-up pictures, J slide behind her, K film subtitles, M TikTok title box), "frame9", "label" ("|" or Shift+Enter = new line),
 * "poster", "cover" {at, text, style, big, shift, frameW}. Loaded after plan.js; BG_PLAN('short') calls BG.fmtInstall. */
'use strict';
BG.FMT = (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.fmt) || null;
BG.gfxSpans = []; BG.popN = 0;
if (BG.FMT) {
  TH.look.ground = 'bgInk';
  TH.look.band = BG.FMT === 'A' ? BG.butter : /[BC]/.test(BG.FMT) ? BG.butter : '#111114';
  BG.labText = FOOT.m.label || ''; FOOT.m.label = '';   // the built-in label steps aside: each format draws its own title
  TH.labelBottom = () => 0;
  TH.capOff.push([0, 1e9]);                              // the built-in captions step aside (they still make the .srt)
}
const EFS = (z) => (BG.FB ? BG.FB.A(z) : `400 ${z}px "DM Serif Display"`);   // font-board pass 2026-11-13: moments/fontboard.js            // titles, posters, cover line, K subtitles, some captions
const EFM = (z) => (BG.FB ? BG.FB.M(z) : `500 ${z}px "DM Mono"`);                      // second title lines, the K tag, mono captions
const EFH = (z, w = 900) => `${w} ${z}px EFHeavy, "Inter Tight", sans-serif`;   // H / I / J chunk captions + the M title box (set 05 allows Inter Tight)
const EFC = (f, z) => (BG.FB ? BG.FB.B(z) : f === 'heavy' ? EFH(z, 900) : f === 'bold' ? EFH(z, 800) : f === 'mono' ? EFM(z) : EFS(z));
const FBc = (k, def) => (BG.FB && BG.FB[k] != null ? BG.FB[k] : def);   // a font-board colour (or the old one)
const FBup = (s) => (BG.FB && BG.FB.up ? String(s).toUpperCase() : BG.FB && BG.FB.low ? String(s).toLowerCase() : s);
const FBls = (z) => (BG.FB && BG.FB.ls != null ? BG.FB.ls * z : -0.02 * z);
{ const r0 = TH.ready; TH.ready = async () => { await Promise.all([['InterTightExtraBold.ttf', '800'], ['InterTightBlack.ttf', '900']].map(([f, w]) => { const ff = new FontFace('EFHeavy', `url(/library/fonts/${f})`, { weight: w }); document.fonts.add(ff); return ff.load().catch(() => null); })); return r0(); }; }
BG.lightUnder = (pts) => { let light = 0, n = 0; try { for (const [x, y] of pts) { const d = ctx.getImageData(Math.round(x * BASE[0] + BASE[4]), Math.round(y * BASE[3] + BASE[5]), 1, 1).data; n++;
  if (d[3] > 200 && (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) > 150) light++; } } catch (e) { } return n > 0 && light / n > 0.5; };
BG.inGfx = (t) => BG.gfxSpans.some(([a, b]) => t >= a && t < b);
BG.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.16); ctx.shadowOffsetY = 2; };
BG.wrap = (s, f, maxW) => { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
BG.wrapH = (s, f, maxW) => (String(s).includes('\n') ? String(s).split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean) : BG.wrap(s, f, maxW));   // her Shift+Enter = a real line break, never re-wrapped (only shrunk)
BG.labelParts = (s) => { const i = String(s).indexOf('|'); return i < 0 ? [String(s).trim(), ''] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };
BG.isKey = (w) => BG.KEY.has(String(w).toLowerCase().replace(/[^a-z0-9%'-]/g, ''));
BG.hiWord = (ws) => ws.findIndex(w => BG.isKey(w));

/* ---------- layouts per format (called from BG_PLAN('short')) ---------- */
BG.fmtInstall = (s, first) => {
  const FMT = BG.FMT; if (!FMT) return null;
  const keep = { half: TH.half, split: TH.split, ots: TH.ots, presenter: TH.presenter, room: TH.room, tile: TH.tile, talk: TH.talk };
  const half0 = keep.half, split0 = keep.split, pres0 = keep.presenter, talk0 = keep.talk;
  const mark = (sg) => { if (sg && sg.t1 > sg.t0 + 0.5) BG.gfxSpans.push([sg.t0, sg.t1 - 0.3]); return sg; };   // (the panel is leaving in its last 0.3 s: captions go back to her chest, not over her eyes)
  const pass = (o) => ({ id: o.id, draw: o.draw, noCaps: o.noCaps, lead: o.lead, until: o.until, hold: o.hold });
  const lbBox = (sp_, o) => {   // G: her letterbox band slides down (her whole 16:9 frame), the graphic opens above it
    const q = TH.span(sp_, o); return TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; const g0 = g; g = G[o.ground || 'bgInk'] || g0;
      ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, g.bg); o.draw(t, r); ctx.restore(); g = g0;
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' })); };
  const POP = { x: 84, y: 84, w: 912, h: 570 };
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = ++BG.popN; const tilt = (k % 2 ? -1 : 1) * 0.03;
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        const g0 = g; g = G[o.ground || 'bgButter'] || g0;
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, g.bg); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
        g = g0; ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    BG.sfx && BG.sfx('pop', q.t0 + 0.06, -4); return sg; };
  const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
    const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
    const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: BG.wall, grid: false, outline: '#FFFFFF', outlinePx: 0, under: () => BG.jRoom(t, q, content || BG.poster, o.ground) }),
      () => CAM(q.t0, { box, z: 1 }), { cover: true });
    if (content && BG.sfx) BG.sfx('shutter', q.t0 + 0.05, -6); return sg; };
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, ground: o.ground, ...pass(o), z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, ground: o.ground, ...pass(o), enter: 0.3 }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, ...pass(o), ground: o.ground || 'bgButter', enter: 0.3 }),
    D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, ground: o.ground, ...pass(o), z: 1.25 }),
    F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, ground: o.ground, ...pass(o), z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    J: (sp_, o) => jSeg(sp_, o, o.draw),
    K: (sp_, o) => half0(sp_, { side: 'top', size: 940, ...pass(o), z: 1.3, ground: 'bgInk' }),
    M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
  };
  const top = (sp_, o = {}) => mark((GFX[FMT] || GFX.A)(sp_, o));
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKM]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: BG.poster, enter: 0, ground: BG.pg(), sound: false }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.8, id: o.id, draw: BG.poster, enter: 0.0001, ground: BG.pg(), gr: [40, 110, W - 80, 1000], sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    J: (sp_, o) => jSeg(sp_, o, null),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  const viaTop = (orig) => (sp_, o = {}) => (o.draw ? top(sp_, o) : mark(orig(sp_, o)));   // an image panel (o.img) keeps its own layout but counts as a graphic (captions move off her face)
  TH.half = viaTop(half0); TH.split = viaTop(split0); TH.ots = viaTop(keep.ots); TH.presenter = viaTop(pres0); TH.room = viaTop(keep.room); TH.tile = viaTop(keep.tile);
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  // B / C / J: her talking IS a layout (poster split, cut-out, screen behind her); fill every gap > 0.45 s with it (doomscrolling 2026-11-10)
  const fillGaps = () => { if (!/[BCJ]/.test(FMT)) return; const end = FOOT.dur; const ss = TH.segs.filter(x => x.t1 > x.t0).sort((x, y) => x.t0 - y.t0);
    const gaps = []; let cur = 0; for (const x of ss) { if (x.t0 - cur > 0.45) gaps.push([cur, x.t0]); cur = Math.max(cur, x.t1); } if (end - cur > 0.45) gaps.push([cur, end]);
    gaps.forEach(([a, b], k) => talkF[FMT]([a, b], { id: 'fmt-talk-' + k, lead: 0, hold: 0 })); };
  return { restore: () => { fillGaps(); Object.assign(TH, keep); } };
};

/* ---------- the title / poster of each format ---------- */
BG.wall = '#1F2318';   // J: the wall behind her (a dark olive, lighter than the screen)
BG.JS = { x: 40, y: 110, w: 1000, h: 1000 };
BG.jRoom = (t, q, content, ground) => {
  const S = BG.JS; rect(0, 1560, W, H - 1560, '#121410'); rect(0, 1556, W, 4, '#30361F');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.8) }; const g0 = g; g = G[content === BG.poster ? 'bgButter' : (ground || 'bgInk')] || g0; rect(S.x, S.y, S.w, S.h, content === BG.poster && BG.FB && BG.FB.poster ? BG.FB.poster.bg : g.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  // manifest "posterAt": the word that brings the poster in (sh04, 2026-11-12 her note: "O'Brien was just on the screen and I've not said anything about O'Brien"); before it the screen stays dark
  if (content === BG.poster && FOOT.m.posterAt) { if (BG.posterT == null) { try { BG.posterT = P(FOOT.m.posterAt, { from: 0, peek: true }).t - 0.1; } catch (e) { BG.posterT = -1; } }
    if (t < BG.posterT) { ctx.restore(); g = g0; rect(S.x, S.y, S.w, S.h, '#0C0C0C'); rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C'); return; } }
  withA(a, () => { if (content === BG.poster) BG.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || BG.labelParts(BG.labText)[0], whole: true, zMax: 220, maxL: 2, padX: 10, what: 'the words on the screen behind her' });
    else content(t, r); });
  ctx.restore(); g = g0;
  rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');
};
/** the title set big inside r (DM Serif Display, sentence case, as many lines as fit; the part after "|" in DM Mono under it); editable as 'label' (or o.key) */
BG.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : BG.labText; const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  const s2 = SCENE_ID; SCENE_ID = 'label';
  try {
    if (ov.hide) { regBox(ov, r.x, r.y, r.w, r.h, info); return; }
    const [a0, b] = o.whole ? [str, ''] : BG.labelParts(str); const a = FBup(a0); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const hand = a.includes('\n'); const maxL = hand ? Math.max(o.maxL || 3, a.split('\n').filter(x => x.trim()).length) : (o.maxL || 3);
    let z = Math.round((o.zMax || 160) * FBc('zK', 1)), la = [];   // zK: a condensed board font (Six Caps, Big Shoulders) sets bigger
    for (; z > 36; z -= 4) { la = BG.wrapH(a, EFS(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.5); const h = la.length * z * 1.0 + (b ? 16 + z2_ * 1.15 * 2 : 0);
      if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, EFS(z), FBls(z)))) <= maxW) break; }
    const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.5)); const lb = b ? BG.wrapH(b, EFM(z2), maxW) : [];
    const hh = la.length * z * 1.0 + (lb.length ? 16 + lb.length * z2 * 1.15 : 0);
    const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
    moved(ov, () => { let y = y0 + z * 0.84;
      la.forEach((l) => { _txt(l, cx, y, EFS(z), o.col || (BG.FB && BG.FB.poster ? BG.FB.poster.ink : BG.ink), 'center', 'alphabetic', FBls(z)); y += z; });
      y += 16 - z + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, EFM(z2), o.col2 || o.col || (BG.FB && BG.FB.poster ? BG.FB.poster.ink : BG.ink), 'center', 'alphabetic', -0.02 * z2); y += z2 * 1.15; });
      regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  } finally { SCENE_ID = s2; }
};
/** B: the title poster on lime above her while she talks; C: the named thing huge (manifest "poster") behind her cut-out */
BG.pg = () => { if (!(BG.FB && BG.FB.poster)) return 'bgButter'; G.fbPoster = G.fbPoster || { ...G.bgButter, bg: BG.FB.poster.bg, fg: BG.FB.poster.ink }; return 'fbPoster'; };   // the poster panel in the board item's ground
BG.poster = (t, r) => { if (BG.FB && BG.FB.poster) rect(r.x, r.y, r.w, r.h, BG.FB.poster.bg); if (BG.FMT === 'C') BG.bigTitle({ x: r.x, y: r.y + 20, w: r.w, h: r.h - 40 }, { key: 'poster', def: FOOT.m.poster || BG.labelParts(BG.labText)[0], whole: true, zMax: 230, maxL: 3, valign: 'top', padX: 20, what: 'the big words behind her' });
  else BG.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 140, maxL: 3, z2Max: 64 }); };
BG.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
BG.tagK = () => BG.smallText('tag', BG.labelParts(BG.labText)[0].toUpperCase(), (ov, str, info) => { const TL = String(str).split('\n').map(s => s.trim()).filter(Boolean); if (!TL.length) TL.push(''); const fw = (z) => Math.max(...TL.map(l => tw(l, BG.FB ? BG.FB.M(z) : F.mono(z), z * 0.12))); let zt = 52; while (zt > 22 && fw(zt) > W - 128) zt -= 2; const f = BG.FB ? BG.FB.M(zt) : F.mono(zt); const w = fw(zt); const x = 64, y = 112; const TLH = Math.round(zt * 1.25), hh = 44 + (TL.length - 1) * TLH;   /* her Shift+Enter = a new line (2026-11-16) */   /* shrinks to fit the width (2026-11-13) */
  if (ov.hide) { regBox(ov, x, y - 34, w, hh, info); return; }
  moved(ov, () => { ctx.save(); BG.soft(36); TL.forEach((l, i) => _txt(l, x, y + i * TLH, f, '#FFFFFF', 'left', 'alphabetic', zt * 0.12)); ctx.restore(); regBox(ov, x, y - 34, w, hh, info); }, [x, y]); }, 'small label top-left');
BG.boxM = () => BG.smallText('label', BG.labText.replace(/\s*\|\s*/, ' | '), (ov, str, info) => { const z = 64; const f = BG.FB && BG.FB.box ? BG.FB.box(z) : EFH(z, 800); const maxW = W - 220;
  const lines = str.split(/[|\n]/).map(x => x.trim()).filter(Boolean).flatMap(l => BG.wrap(l, f, maxW)).slice(0, 4);
  const lh = z * 1.1, pw = 40, ph = 26; const bw = Math.max(...lines.map(l => tw(l, f, -0.02 * z))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
  if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
  moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center', 'alphabetic', -0.02 * z)); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)');
BG.FLASH = 1.6;
BG.titleFmt = (t) => {
  const fm = BG.FMT; if (!BG.labText) return;
  if (fm === 'D' && t < BG.FLASH + 0.35) { const p = clamp((t - BG.FLASH) / 0.35); const pe = p * p * (3 - 2 * p); const h = 384;
    withT(0, -h * pe, 1, 0, () => { rect(0, 0, W, h, BG.FB && BG.FB.poster ? BG.FB.poster.bg : BG.butter); BG.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 110, maxL: 2, z2Max: 52 }); }); }
  if (FOOT.m.motionOnly && (fm === 'A' || fm === 'F')) { BG.bigTitle({ x: 0, y: 40, w: W, h: 230 }, { zMax: 104, maxL: 2, z2Max: 46, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.8)') }); return; }   // motion-only: bigger title on its band (critic 2026-11-19: 10 px sublines)
  if (fm === 'A' && !BG.inGfx(t)) BG.bigTitle({ x: 0, y: 60, w: W, h: 170 }, { zMax: 76, maxL: 2, z2Max: 44, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.72)') });   // 2026-11-12: A gets the short's topic on top too (sh11 "Edge cases in production")
  if (fm === 'F' && !BG.inGfx(t)) BG.bigTitle({ x: 0, y: 70, w: W, h: 190 }, { zMax: 78, maxL: 2, z2Max: 44, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.72)') });
  if (fm === 'K' && !BG.inGfx(t)) BG.tagK();
  if (fm === 'M' && !BG.inGfx(t)) BG.boxM();
  if (fm === 'G') { const a = 1 - BG.gfxSpans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(a, () => BG.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 120, maxL: 2, z2Max: 60, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.72)'), valign: 'bottom' })); }
};

/* ---------- her captions per format ---------- */
BG.capFmt = (t) => {
  if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions) return; const fm = BG.FMT;
  if (fm === 'D' && t < BG.FLASH) return;
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if ((TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1)) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const gfx = BG.inGfx(t); const yN = FOOT.capYNow;
  let S = {
    A: gfx ? { cy: 1790, size: 80, f: 'serif' } : { cy: 1728, size: 84, f: 'serif', ink: true },
    B: { cy: yN != null ? Math.min(yN - 60, 940) : 1730, size: 56, f: 'mono' },   // over a split: on the poster / graphic just above her; else low on her chest or the band (never on her face)
    C: { cy: 1790, size: 84, f: 'serif', hi: true },
    D: gfx ? { cy: 760, size: 58, f: 'mono' } : { cy: 196, size: 62, f: 'mono' },
    F: { cy: gfx ? 1790 : 1650, size: 88, f: 'serif', lit: true },
    G: { cy: gfx ? 1745 : 1700, size: 54, f: 'mono', lit: true, dim: '#7C7C80' },
    H: { cy: gfx ? 922 : 1500, size: 84, f: 'heavy', chunk: true, up: true, hi: true },
    I: { cy: 1540, size: 76, f: 'heavy', chunk: true, up: true, hi: true },
    J: { cy: 1700, size: 84, f: 'heavy', chunk: true, up: true, hi: true },
    K: { cy: 1690, size: 62, f: 'serif', box: true },
    M: { cy: gfx ? 1800 : 1560, size: 60, f: 'bold' },
  }[fm] || { cy: 1600, size: 62, f: 'mono' };
  if (BG.FB && BG.FB.noLit && S.lit) S = { ...S, lit: false, w: 600 };   // sh09: one colour, no grey karaoke words (critic 2026-11-13)
  const CB = BG.FB && BG.FB.capBox; if (CB && !S.lit) S = { ...S, box: true, ink: false, hi: false };
  if (S.lit && FOOT.m.motionOnly) S = CB ? { ...S, lit: false, box: true, ink: false, hi: false } : { ...S, lit: false };   // motion-only: the film's butter / ink screens change under her words, so every caption sits on its box (readable on both)   // font-board captions: the item's ink on boxes of its ground
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : Math.round(S.size * FBc('capK', 1)); let cy = cst.y != null ? cst.y : S.cy;
  if (FOOT.m.motionOnly && !cst.size) size = Math.max(size, 68);   // motion-only: captions at least 68 px (critic 2026-11-19)
  // full-bleed formats (H I M) with her picture alone: the caption sits under her chin, measured once per caption (doomscrolling 2026-11-10)
  if (cst.y == null && /[HIM]/.test(fm)) { try { const cm = camAt(t); if (cm && !cm.boxed && cm.face) { const chin = (cm.face.y + cm.face.h - cm.y) / cm.h * H;
    cy = Math.round(Math.max(cy, Math.min(1720, chin + size * 1.45))); } } catch (e) { } }
  const all = (S.up && !(BG.FB && BG.FB.low) || (BG.FB && BG.FB.capUp) ? raw.toUpperCase() : BG.FB && BG.FB.low ? raw.toLowerCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const wt = (c.ws && c.ws.length === all.length) ? c.ws.map(w => w.t) : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const hi = S.hi ? BG.hiWord(all) : -1;
  let words = all, k0 = 0;
  { const ch = []; let cur = []; const CN = S.chunk ? 3 : 4;   // every caption a short phrase (2-5 words), her rule 2026-11-12
    all.forEach((w, i) => { cur.push(i); if (/[,.?!:;]$/.test(w) || cur.length === CN) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; words = pick.map(i => all[i]); k0 = pick[0]; }
  const ls = -0.02 * size; let f = EFC(S.f, size); const maxW = W * (S.box ? 0.84 : 0.86); const join = (l) => l.join(' '); let lines = [words];
  if (tw(join(words), f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f, ls), tw(join(words.slice(k)), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = EFC(S.f, size); } }
  const lsz = -0.02 * size; const lh = size * (S.box ? 1.32 : S.up ? 1.02 : 1.16); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f, lsz)); const sp = tw(' ', f, lsz); let bx0 = 1e9, bx1 = -1e9, kk = k0;
  // over a light graphic (lime / white) her caption turns ink with no shadow and the key word red: never white on lime
  const onLight = !S.box && !S.ink && BG.lightUnder(lines.flatMap((l, li) => Array.from({ length: 7 }, (_, k) => [CX - widths[li] / 2 + widths[li] * k / 6, y0 + li * lh - size * 0.3])));
  if (onLight) S = { ...S, ink: true, inkHi: true };
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, CB ? CB.bg : 'rgba(0,0,0,0.86)'); }
    else if (!S.ink) BG.soft(size);
    ln.forEach((wd) => { let col = S.ink ? BG.ink : S.box && CB ? CB.ink : FBc('capInk', '#FFFFFF'); if (kk === hi) col = S.ink ? (S.inkHi ? BG.daub : BG.ink) : FBc('key', BG.butter);
      if (S.lit) { if (t < wt[kk] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, S.ink ? 'rgba(12,12,12,0.35)' : (FBc('dim', null) || S.dim || 'rgba(255,255,255,0.4)'), 'left', 'alphabetic', lsz); ctx.restore(); }
        else _txt(wd, x, y, f, S.ink ? (BG.isKey(wd) ? BG.daub : BG.ink) : (BG.isKey(wd) ? FBc('key', BG.butter) : FBc('capInk', '#FFFFFF')), 'left', 'alphabetic', lsz); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', lsz);
      x += tw(wd, f, lsz) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (SHORTS-PLAYBOOK "Cover frame") ----------
 * "cover": {"on": true, "dur": 0.1, "at": <source s>, "text": "line, ~one word~ in lime", "style": "photo" | "card", "scale", "shift"}.
 * Drawn OVER the first 0.1 s (no time inserted). ONE style for the series: her still (tools/covers.py -> assets/covers/<id>.jpg,
 * image cover_<id>) drawn at 90 % and 470 px lower on flat ink (her face sits high in this recording; lesson from scholarships
 * 2026-11-10: the line never touches her face), the line in DM Serif Display white with a soft shadow ABOVE her head (y ~300-800),
 * one word in lime. "card": lime with fine same-hue diagonal lines, the line in ink, the word knocked out of an ink block (the
 * video's marker, as on the thumbnails), her cut-out at the foot. */
BG.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
BG.coverOn = (t) => { const c = BG.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
BG.coverDraw = (t) => {
  const c = BG.coverOf(); const id = FOOT.m.id; const frame = c.style === 'frame'; const card = c.style === 'card' || frame;   // frame: a frame of the short (a slide) under the line, 2026-11-12
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    const FC = BG.FB && BG.FB.cover;   // font-board colours of this short's cover (moments/fontboard.js); no line pattern (her rule 2026-11-12)
    if (card) { if (FC) rect(0, 0, W, H, FC.card || FC.bg);
      else { rect(0, 0, W, H, c.bg || BG.butter); ctx.save(); ctx.strokeStyle = 'rgba(12,12,12,0.07)'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = -H; x < W + H; x += 26) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore(); }
      if (frame) { const fi = IMG['cover_' + id + '_frame']; const dy = c.shift != null ? c.shift : 470; if (fi) { const fw = W * (c.frameW || 1), fh = fw / fi.width * fi.height, fx = (W - fw) / 2;   // frameW < 1: a cropped screenshot, centred with a soft shadow (sh10, 2026-11-12)
        grp('frame', fx, dy, fw, fh, () => themeFixed(() => { ctx.save(); if (c.frameW) { ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; } ctx.drawImage(fi, fx, dy, fw, fh); ctx.restore(); }), { img: true, label: 'the slide under the cover line' }); } }
      const im = frame || c.big ? null : IMG['cover_' + id + '_cut']; /* big: the line alone, no cut-out on a plain colour (her rule 2026-11-12) */ if (im) { const h = 980, w = im.width / im.height * h; const x = CX - w / 2, y = H - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); } }
    else { const im = IMG['cover_' + id]; const k = c.scale || 0.9, dy = c.shift != null ? c.shift : 470; const w = W * k, h = H * k, x = (W - w) / 2; rect(0, 0, W, H, FC ? FC.bg : BG.ink);
      if (im) grp('her', x, dy, w, h, () => themeFixed(() => ctx.drawImage(im, x, dy, w, h)), { img: true, label: 'her still (drag to move, corners to resize)' }); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the lime word)' };
    const BR = '\u2028'; const segs = []; FBup(str).replace(/[ \t]*\n[ \t]*/g, ' ' + BR + ' ').split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      p_.replace(/~/g, '').split(/[ \t]+/).filter(Boolean).forEach(w => { if (w === BR) segs.push({ br: true }); else if (/^[,.?!:;]+$/.test(w) && segs.length && !segs[segs.length - 1].br) segs[segs.length - 1].w2 = w; else segs.push({ w, on }); }); });
    const hand = segs.some(s_ => s_.br);   // her Shift+Enter: her lines exactly, only shrunk to fit
    const big = !!c.big;   // big: the line alone fills the cover (no picture), 2026-11-12 her sh03
    const maxW = W - (big ? 140 : 150), maxH = big ? (frame ? 640 : 1100) : frame ? 360 : card ? 520 : 420; let top = frame ? (big ? 190 : 150) : big ? 0 : card ? 330 : 300;   // big + frame: the line big at the top, the slide under it (sh10, 2026-11-12)
    const lay0 = (zz, mw) => { const f = EFS(zz); const sp = tw(' ', f, FBls(zz)); const L = [[]]; let cw = 0;
      if (hand) { for (const s_ of segs) { if (s_.br) { if (L[L.length - 1].length) L.push([]); continue; } L[L.length - 1].push(s_); } return L.filter(l => l.length); }
      for (const s_ of segs) { const ww = tw(s_.w + (s_.w2 || ''), f, FBls(zz)); if (L[L.length - 1].length && cw + sp + ww > mw) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(s_); } return L; };
    const fitsW = (L, zz) => { const f_ = EFS(zz), sp_ = tw(' ', f_, FBls(zz)); return L.every(l => l.reduce((a, s_, i) => a + tw(s_.w + (s_.w2 || ''), f_, FBls(zz)) + (i ? sp_ : 0), 0) <= maxW); };
    const ok = (L, zz) => L.length * zz * 1.06 <= maxH && fitsW(L, zz) && (hand || L.length === 1 || (big ? L.every(l => l.length >= 2 || l[0].w.length > 3) : L[L.length - 1].length >= 2));   // big: no short word alone on a line (sh05 'in', 2026-11-12)
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (hand) return ok(L, zz) ? L : null; if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    let z = big ? 300 : 136, lines = null; for (; z >= 100 && !lines; z -= 4) lines = pick(z, big ? 4 : 3); if (lines) z += 4;
    if (!lines) for (z = 136; z > 40; z -= 4) { lines = lay0(z, maxW); if ((hand ? fitsW(lines, z) : lines.length <= 4) && lines.length * z * 1.06 <= maxH) break; }
    const f = EFS(z), lsz = FBls(z), sp = tw(' ', f, lsz), lh = z * 1.06; if (big && !frame) top = (H - lines.length * lh) / 2 - z * 0.1; const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), f, lsz);
    const lw_ = (l) => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0); const bw = Math.max(...lines.map(lw_));
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { let x = CX - lw_(l) / 2; const y = top + z * 0.86 + i * lh;
        for (const s_ of l) { const wv = tw(s_.w, f, lsz);
          if (FC) { if (s_.on && FC.keyBox) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, FC.keyBox); ctx.restore(); _txt(s_.w, x, y, f, FC.keyInk, 'left', 'alphabetic', lsz); }
            else _txt(s_.w, x, y, f, s_.on ? FC.key : FC.ink, 'left', 'alphabetic', lsz); }
          else if (card && s_.on) { rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, BG.ink); _txt(s_.w, x, y, f, BG.butter, 'left', 'alphabetic', lsz); }
          else _txt(s_.w, x, y, f, s_.on ? BG.butter : card ? BG.ink : '#FFFFFF', 'left', 'alphabetic', lsz);
          if (s_.w2) _txt(s_.w2, x + wv, y, f, FC ? FC.ink : card ? BG.ink : '#FFFFFF', 'left', 'alphabetic', lsz); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
/** motion-only shorts (2026-11-19): a solid band at the top in the short's caption-box colour (its font-board ground), so the
 *  title reads on any film screen (butter or ink); the film's own content starts below y 340. Height per format's title. */
BG.motionBand = (t) => { const fm = BG.FMT; const h = { A: 290, F: 300, M: 0, K: 200 }[fm]; if (!h) return;
  const CB = BG.FB && BG.FB.capBox; rect(0, 0, W, h, CB && fm !== 'K' ? CB.bg : '#161616'); };   // K: its tag is white
// draw order on top of everything: captions, then the format's title, and the cover over all of it for the first 0.1 s
TH.over.push((t) => {
  if (!(FOOT.m && FOOT.m.kind === 'short') || t >= FOOT.dur) return;
  if (BG.coverOn(t)) { BG.coverDraw(t); return; }
  if (!BG.FMT) return;
  if (FOOT.m.motionOnly) BG.motionBand(t);   // 2026-11-19 motion-only shorts: the film fills the frame; the title sits on its own band
  const sid = SCENE_ID; SCENE_ID = 'captions'; try { BG.capFmt(t); } finally { SCENE_ID = sid; }
  BG.titleFmt(t);
});

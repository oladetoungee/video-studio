/* dark-patterns: the talking-head look = the film's C · BLOWN UP (her pick 2026-11-02) + B's honest-vs-winning split as one
 * scene type. Flat pink #FF9EC4, ink #111111 and white UI; nothing else (B's split uses paper #EEECE6 / ink, with pink as
 * its one mark). The marker is a solid ink block with the word knocked out in pink. A black magnifying glass finds the trick.
 * Type (2026-11-07, her pick, set 03 Heavy + light): Helvetica Neue Bold 700 + Light 300, body 400, DM Mono labels; no outlines,
 * no boxes around captions, lines 2 px at most. Her 16:9 captions stay hers (Helvetica Neue, footage.js).
 * Loaded before every moment script ("common"), after film/assets/src/clips.js (CLIPS: the real page clippings).
 *
 * Every text is editable (txt / mono / DP.text with ovr keys) and every block movable (grp). In DP.text, [word] = a black
 * block on that word (she can type the brackets herself in the editor).
 *
 * Shorts: each short has its own top-title and caption style (moment "dpStyle": {lab, cap}, SOCIAL-PLAYBOOK T/C styles in
 * this look). They are drawn here (TH.over), still editable: the label is the element "label/label" (text, size, place), each
 * caption block is "caption/<n>" (the editor's caption fixes, "capShort"), her size / height sliders (captions9) apply. */
'use strict';
/* the shared look and graphics (DP, fonts, DP.popup ... DP.fix) live in film/scenes/dp.js (loaded first): this file sets the
 * talking-head look (TH.look), the full-frame insert, the black phrase card and the shorts' title + caption styles. */
{ const r0 = TH.ready; TH.ready = async () => { await DPF; for (const w of [300, 400, 500, 700]) await document.fonts.load(`${w} 40px "Helvetica Neue"`).catch(() => null); await document.fonts.load('500 40px "DM Mono"'); return r0(); }; }
Object.assign(TH.look, {
  disp: (s) => `700 ${s}px "Helvetica Neue"`, dispLS: -0.045, upper: false, font: 'disp', capFit: true, kwHideCap: true,
  cap16: (FOOT.m && FOOT.m.kind === 'teaser') ? 'three' : undefined,
  fg: DP.white, ink: DP.ink, acc: DP.pink, accOnDark: DP.pink,
  ground: 'dpPink', cardGround: 'dpInk', panel: 'dpWhite', grid: false,
  outline: DP.white, outlinePx: 10, ring: DP.ink, ringPx: 6, plate: 'dp', dim: 0.3,
  band: DP.ink, rule: 'rgba(17,17,17,0.5)',
});

/** a full-frame graphic insert (an L9-style cutaway without a film): her voice and captions go on (on a plate). */
DP.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++DPX.n); const enter = o.enter == null ? 0.25 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'dpPink', o,
    draw: (t) => { const p = enter ? E.outCubic(prog(t, t0, enter)) : 1; if (!PORTRAIT) FOOT.capX = [W / 2, W * 0.84];
      withT((1 - p) * W * 0.1, 0, 1, 0, () => draw(t, { x: 0, y: 0, w: W, h: H - (o.capRoom == null ? V(200, 0) : o.capRoom) }));
      if (o.capRoom !== 0 && !PORTRAIT) rect(0, H - V(200, 0), W, V(200, 0), G[o.ground || 'dpPink'].bg);
      if (p < 1) withA(1 - p, () => rect(0, 0, W, H, DP.pink)); } });
  if (o.sound) DP.sfx(o.sound, t0 + 0.05, o.db != null ? o.db : -4);
  return { t0, t1, id };
};
/** a black phrase card (the kit's 5 cards): pure ink, her words, one word in pink; hard cut in and out (TH.card in dpInk) */
DP.card = (s, lines, o = {}) => TH.card(s, lines, { ground: 'dpInk', riser: false, font: 'body', ...o });   // 'body' = Helvetica Neue 700 in sentence case (type set 03)

/* ======================= shorts: per-short top-title + caption styles (moment "dpStyle": {lab, cap}) ======================= */
DP.KEY = new Set(['dark', 'pattern', 'patterns', 'confirmshaming', 'cancel', 'roach', 'motel', 'basket', 'hidden', 'costs', 'subscription', 'trial', 'wording', 'untick', 'disguised', 'ads', 'nagging', 'notifications',
  'pre-selection', 'preselection', 'ticked', 'urgency', 'deadline', 'scarcity', 'stock', 'numbers', 'tricked', 'intentional', 'sued', 'illegal', 'consent', 'refund', 'gdpr', 'ftc', 'amazon', '399', '148', '42', '76%', '67%',
  'billion', 'law', 'banned', 'honest', 'fairness', 'saving', 'money', 'fee', 'spray', 'snapchat', 'again', 'wins', 'sales']);
DP.style = (FOOT.m && FOOT.m.kind === 'short' && !FOOT.m.fmt && FOOT.m.dpStyle) || null;   // 2026-11-10: a short with a format ("fmt", moments/formats.js) draws its own title + captions
if (DP.style) {
  TH.look.ground = 'dpInk';   // shorts: ink around her (her white captions never sit on pink)
  const SH = TH.shortStyle; const HNf = (w, s) => `${w} ${s}px "Helvetica Neue"`;
  DP.labText = FOOT.m.label; FOOT.m.label = '';   // the built-in white label steps aside: this look draws its own (same edit id)
  const LST = { pink: { size: 64, padX: 40, padY: 30, lh: 1.18 }, ink: { size: 60, padX: 22, padY: 16, lh: 1.0 }, white: { size: 62, padX: 24, padY: 18, lh: 1.0 }, plain: { size: 66, padX: 0, padY: 0, lh: 1.1 },
    mix: { size: 70, padX: 40, padY: 30, lh: 1.12 }, type: { size: 50, padX: 36, padY: 28, lh: 1.25 }, block: { size: 58, padX: 30, padY: 22, lh: 1.15 } };
  const ls = LST[DP.style.lab] || LST.pink; const top = 135; const LX = 50;
  const labStr = () => { const e = EDIT.data.t['label/label']; return e && e.s != null ? e.s : DP.labText; };
  const labK = () => { const e = EDIT.data.t['label/label']; const p = e && e.pos && e.pos[LAYOUT]; return (p && p.k) || 1; };
  const labDy = () => { const e = EDIT.data.t['label/label']; const p = e && e.pos && e.pos[LAYOUT]; return (p && p.dy) || 0; };
  const labHidden = () => { const e = EDIT.data.t['label/label']; const p = e && e.pos && e.pos[LAYOUT]; return !!(e && e.hide) || !!(p && p.hide); };
  const fontOf = (z) => DP.style.lab === 'type' ? F.mono(z, 500) : F.disp(z, 700);
  /** the label's lines: split at ': ' for the mixed stack, else balanced wrap inside the frame */
  const labLines = (str) => { const maxW = W - 2 * 50 - 2 * ls.padX; const f = fontOf(ls.size); const plain = (s) => s.replace(/[\[\]]/g, '');
    if (str.includes('\n')) return str.split('\n');
    if (DP.style.lab === 'mix' && str.includes(': ')) { const i = str.indexOf(': '); return [str.slice(0, i), str.slice(i + 2)]; }
    const out = []; let cur = ''; for (const w of str.split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(plain(DP.style.lab === 'type' ? nx.toUpperCase() : nx), f) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur);
    if (out.length === 2) { const ws = str.split(/\s+/); let best = null; for (let k = 1; k < ws.length; k++) { const a = ws.slice(0, k).join(' '), b = ws.slice(k).join(' '); const mm = Math.max(tw(plain(a), f), tw(plain(b), f)); if (mm <= maxW && (!best || mm < best[0])) best = [mm, [a, b]]; } if (best) return best[1]; }
    return out; };
  const labH = () => { const n = labLines(labStr()).length; return n * ls.size * ls.lh + 2 * ls.padY + (DP.style.lab === 'ink' || DP.style.lab === 'white' ? (n - 1) * 8 : 0); };
  TH.labelBottom = () => (!PORTRAIT || labHidden() ? 0 : top + labDy() + labK() * labH() + 10);
  /** auto block: the label's first key word gets the black block (pink / mix styles) unless she typed [brackets] */
  const autoBlock = (s) => { if (/\[/.test(s)) return s; const ws = s.split(' '); const i = ws.findIndex(w => DP.KEY.has(w.toLowerCase().replace(/[^a-z0-9%'-]/g, ''))); if (i < 0) return s; ws[i] = '[' + ws[i] + ']'; return ws.join(' '); };
  function drawLab(t) {
    if (!PORTRAIT) return; SCENE_ID = 'label'; EL.seen.clear(); const ov = ovr('label'); const str = ov.s != null ? ov.s : DP.labText;
    const lines = labLines(str); const z = ls.size; const H_ = labH(); const info = { text: str, def: DP.labText, kind: 'box', sk: ov.k, label: 'top label (text, size, place; [word] = black block)' };
    if (ov.hide) { regBox(ov, LX, top, W - 2 * LX, H_, info); return; }
    moved(ov, () => {
      const st = DP.style.lab; let y = top;
      if (st === 'pink' || st === 'mix') { rect(LX, top, W - 2 * LX, H_, st === 'mix' ? DP.ink : DP.pink); y = top + ls.padY;
        lines.forEach((l, i) => { const serif = st === 'mix' && i > 0; const f = serif ? `300 ${z}px "Helvetica Neue"` : F.disp(z, 700);
          if (serif) _txt(l.replace(/[\[\]]/g, ''), LX + ls.padX, y + z * 0.9, f, DP.pink, 'left'); else DP.text(t, '_lab' + i, st === 'mix' ? l : autoBlock(l), LX + ls.padX, y + z * 0.86, z, { f: () => f, ls: -0.01, col: st === 'mix' ? DP.white : DP.ink, knock: DP.pink, blockCol: DP.ink, hits: -1, raw: true });
          y += z * ls.lh; }); }
      else if (st === 'ink' || st === 'white') { y = top; lines.forEach((l) => { const s = l.replace(/[\[\]]/g, ''); const w = tw(s, F.disp(z, 700), -0.01 * z) + 2 * ls.padX; const h = z * ls.lh + 2 * ls.padY - 8;
          ctx.fillStyle = st === 'ink' ? DP.ink : DP.white; rr(CX - w / 2, y, w, h, 8); ctx.fill(); _txt(s, CX, y + ls.padY + z * 0.8, F.disp(z, 700), st === 'ink' ? DP.white : DP.ink, 'center', 'alphabetic', -0.01 * z); y += h + 8; }); }
      else if (st === 'plain') { y = top; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
        lines.forEach((l) => { _txt(l.replace(/[\[\]]/g, ''), CX, y + z * 0.86, F.disp(z, 700), DP.white, 'center', 'alphabetic', -0.01 * z); y += z * ls.lh; }); ctx.restore(); }
      else if (st === 'type') { rect(LX, top, W - 2 * LX, H_, DP.ink); const all = lines.map(l => l.replace(/[\[\]]/g, '').toUpperCase()); const tot = all.join(' ').length; const n = Math.floor(clamp(t / 1.3) * tot); let used = 0; y = top + ls.padY;
        all.forEach((l) => { const k = clamp(n - used, 0, l.length); used += l.length + 1; _txt(l.slice(0, k), LX + ls.padX, y + z * 0.9, F.mono(z, 500), DP.pink, 'left', 'alphabetic', z * 0.02); y += z * ls.lh; });
        if (n < tot && Math.floor(t * 3) % 2 === 0) rect(LX + ls.padX + 4, y - z * ls.lh + z * 0.1, z * 0.5, z * 0.9, DP.pink); }
      else if (st === 'block') { rect(LX, top, W - 2 * LX, H_, DP.pink); y = top + ls.padY; lines.forEach((l) => { _txt(l.replace(/[\[\]]/g, ''), CX, y + z * 0.86, F.disp(z, 700), DP.ink, 'center', 'alphabetic', -0.02 * z); y += z * ls.lh; }); }
      regBox(ov, LX, top, W - 2 * LX, H_, info);
    }, [CX, top]);
  }
  // her caption blocks: the built-in Helvetica captions step aside for the whole short (they still make the .srt); this style draws them
  TH.capOff.push([0, 1e9]);
  const capKw = (t) => (TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1);
  const stroke = (s, x, y, f, lw, fill, al = 'center', lsp = 0) => { setFont(f, lsp); ctx.textAlign = al; ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = DP.ink; ctx.strokeText(s, x, y); ctx.fillStyle = fill; ctx.fillText(s, x, y); ctx.textAlign = 'left'; };
  /* her caption blocks in type set 03 (her pick 2026-11-07): Helvetica Neue, solid fill, NO outline and NO box; a soft shadow
   * only for contrast on her footage. Styles vary per short: 'hl' (500, the key word in pink), 'light' (300 with the key word
   * in 700: heavy + light), 'big' (one word at a time, 700), 'karaoke' (400, said words turn pink), 'small' (400, at her chest). */
  const soft = (fn) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 2; fn(); ctx.restore(); };
  const CAPMAP = { outline: 'hl', pop: 'hl', serif: 'light', serifbox: 'hl', word: 'big', karaoke: 'karaoke', small: 'small', helv: 'hl', hl: 'hl', light: 'light', big: 'big' };
  function drawCap(t) {
    if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions) return; if (capKw(t)) return;
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    const cst = EDIT.data.captions9 || {}; const kz = cst.size ? clamp(cst.size / SH.cap.size, 0.6, 1.5) : 1; const dy = cst.y != null ? cst.y - SH.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text; const st = CAPMAP[DP.style.cap] || 'hl';
    const yC = (FOOT.capYNow || SH.cap.y) + dy + (st === 'small' ? -180 : 0); const ws = text.split(/\s+/).filter(Boolean);
    const isKey = (w) => DP.KEY.has(w.toLowerCase().replace(/[^a-z0-9%'-]/g, ''));
    const zBase = { hl: 66, light: 68, big: 104, karaoke: 62, small: 52 }[st] * kz; const wBase = { hl: 700, light: 400, big: 700, karaoke: 500, small: 500 }[st];
    let shown = ws.map((w, i) => [w, i]); if (st === 'big') { const ti = c.ws.filter(q => q.t <= t + 0.02).length - 1; const k = Math.max(0, Math.min(ws.length - 1, ti)); shown = [[ws[k], k]]; }
    const fontOf = (w) => `${st === 'light' && isKey(w) ? 700 : wBase} ${zBase}px "Helvetica Neue"`; const ls = -0.02 * zBase;
    const wid = (ln) => ln.reduce((a, [w]) => a + tw(w, fontOf(w), ls), 0) + tw(' ', `${wBase} ${zBase}px "Helvetica Neue"`) * (ln.length - 1);
    const lines = []; let cur = []; for (const it of shown) { const nx = [...cur, it]; if (cur.length && wid(nx) > W - 140) { lines.push(cur); cur = [it]; } else cur = nx; } if (cur.length) lines.push(cur);
    const lh = zBase * 1.14; const y0 = st === 'big' ? yC - 40 + (c.i % 3) * 60 : yC - (lines.length - 1) * lh / 2 + zBase * 0.35; let bw = 0;
    soft(() => lines.forEach((ln, li) => { const lw = wid(ln); bw = Math.max(bw, lw); let x = CX - lw / 2; const y = y0 + li * lh;
      ln.forEach(([w, i]) => { const said = c.ws[i] && t >= c.ws[i].t - 0.02;
        const col = st === 'karaoke' ? (said ? DP.pink : DP.white) : (st === 'hl' && isKey(w)) ? DP.pink : DP.white;
        _txt(w, x, y, fontOf(w), col, 'left', 'alphabetic', ls); x += tw(w, fontOf(w), ls) + tw(' ', `${wBase} ${zBase}px "Helvetica Neue"`); }); }));
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2 - 10, y0 - zBase * 0.9, bw + 20, (lines.length - 1) * lh + zBase * 1.2, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  TH.over.push((t) => { if (t >= FOOT.dur) return; drawCap(t); drawLab(t); });
}


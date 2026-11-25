/* working-full-time shorts: font-board looks (FULL-KIT-BRIEF 2026-11-12; HER-STANDARD.md "Fonts" + "Short covers" + "Shorts").
 * Every short keeps its format (manifest "fmt", moments/formats.js layouts) and takes:
 *   - three formats-board references for its title / caption / cover layout (manifest "board": [n, n, n] = studio /ideas/formats/ "Formats N"),
 *   - 1-2 fonts from the font board (studio /ideas/boards/fonts/, inspiration/boards/fonts/board.json), each used THE WAY ITS ITEM USES IT:
 *     the item's text colour on the item's ground colour (labels, captions and cover lines on boxes / bands of that ground),
 *   - the graphics (time card, week calendar, 24-hour dial, page crops' grounds) recoloured into that item's colours and set in its fonts.
 *   sh01 I  shorts-01 Montserrat ExtraBold caps, yellow key word (Formats 2)  white / #FFE135 on #3B3330           board 16, 10, 8
 *   sh02 A  shorts-13 Young Serif + Caveat Brush (Formats 62)                cream / yellow on sage #5C6B5A        board 62, 36, 4
 *   sh03 B  design-27 General Sans Semibold Italic (Design 355)              blue #2C3FB0 on grey #D9D5CB          board 5, 65, 31
 *   sh04 K  shorts-11 Newsreader (Formats 52)                                white on black boxes                  board 52, 22, 67
 *   sh05 J  design-19 Caveat Brush + pair-08 Inter Tight (Design 362)        dark green #18480E on #C4BF3B         board 64, 63, 19
 *   sh06 H  design-32 Oswald Bold (Design 405)                               black on orange #E57245               board 13, 20, 11
 *   sh07 M  shorts-05 TikTok Sans in a white box + bold serif captions (Formats 24)  black on white; white Libre Baskerville  board 24, 69, 17
 *   sh08 G  design-16 Bodoni Moda + pair-15 Archivo (Design 1)               cream #FBF3EC on wine #990915         board 12, 48, 45
 *   sh09 F  design-15 Bagel Fat One (Design 371)                             pink #DFB0AE on black #0A0A0A         board 47, 51, 13
 *   sh10 C  design-23 Shrikhand (Design 359)                                 navy #1F2C5C on cream #E8E4D6         board 33, 56, 3
 * No line-pattern grounds, no dark stat cards, no caption style shared with the last projects. Her Shift+Enter line breaks are kept
 * (covers, labels, posters: only shrunk). Editable: 'label/label', 'label/poster', 'caption/<n>', 'cover/cover', 'cover/sub'.
 * Loaded LAST in talking-head.json "common" (after plan.js): overrides WFF.capDraw / titleDraw / coverDraw / poster / jRoom. */
'use strict';
const LK_ID = (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short' && FOOT.m.id) || null;
const LKF = [];
const LK_FILES = {
  LKMont: [['Montserrat-Variable.ttf', { weight: '100 900' }]], LKYoung: [['YoungSerif-Regular.ttf', {}]], LKBrush: [['CaveatBrush-Regular.ttf', {}]],
  LKGenI: [['GeneralSans-VariableItalic.ttf', { weight: '200 700', style: 'italic' }]], LKNews: [['Newsreader.ttf', { weight: '200 800' }]],
  LKInter: [['InterTightMedium.ttf', { weight: '500' }], ['InterTightSemiBold.ttf', { weight: '600' }], ['InterTightBold.ttf', { weight: '700' }], ['InterTightExtraBold.ttf', { weight: '800' }]],
  LKOswald: [['Oswald-Variable.ttf', { weight: '200 700' }]], LKTik: [['TikTokSans[opsz,slnt,wdth,wght].ttf', { weight: '300 900' }]],
  LKBask: [['LibreBaskerville[wght].ttf', { weight: '400 700' }]], LKBodoni: [['BodoniModa[opsz,wght].ttf', { weight: '400 900' }]], LKArch: [['Archivo.ttf', { weight: '100 900' }]],
  LKBagel: [['BagelFatOne-Regular.ttf', {}]], LKShrik: [['Shrikhand-Regular.ttf', {}]],
};
const LK_FAM = { sh01: ['LKMont'], sh02: ['LKYoung', 'LKBrush'], sh03: ['LKGenI'], sh04: ['LKNews'], sh05: ['LKBrush', 'LKInter'], sh06: ['LKOswald'],
  sh07: ['LKTik', 'LKBask'], sh08: ['LKBodoni', 'LKArch'], sh09: ['LKBagel'], sh10: ['LKShrik'] };
(function lkFonts() {
  if (!LK_ID || !LK_FAM[LK_ID]) return;
  const add = (fam, file, desc) => { try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) { console.error('LK font missing ' + file); return; } const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); LKF.push(ff.load().catch(() => null)); } catch (e) { console.error('LK font ' + file, e); } };
  for (const fam of LK_FAM[LK_ID]) for (const [file, desc] of LK_FILES[fam]) add(fam, file, desc);
  const r0 = TH.ready; TH.ready = async () => { await Promise.all(LKF); return r0 ? r0() : undefined; };
})();
const LF = {
  mont: (z, w = 800) => `${w} ${z}px LKMont`, ysf: (z) => `400 ${z}px LKYoung`, brush: (z) => `400 ${z}px LKBrush`, genI: (z, w = 600) => `italic ${w} ${z}px LKGenI`,
  news: (z, w = 500) => `${w} ${z}px LKNews`, int: (z, w = 700) => `${w} ${z}px LKInter`, osw: (z, w = 700) => `${w} ${z}px LKOswald`, tik: (z, w = 800) => `${w} ${z}px LKTik`,
  bask: (z, w = 700) => `${w} ${z}px LKBask`, bod: (z, w = 700) => `${w} ${z}px LKBodoni`, arch: (z, w = 600) => `${w} ${z}px LKArch`, bagel: (z) => `400 ${z}px LKBagel`,
  shrik: (z) => `400 ${z}px LKShrik`,
};
const R = Math.round;

/* ---------- one look per short. wf = the graphics' colours (wall = panel ground, manila = card, ink = text on the card, red = the
 * one accent, paper = text on the wall, hl = a highlight); gfx = the graphics' fonts (disp = big caps/times, body, mono = small labels;
 * k = size factor so the wider board fonts fit the cells Anton was laid out for). ---------- */
const LOOK = {
  sh01: { board: [16, 10, 8], fontIds: ['shorts-01'], colours: 'shorts-01 (Formats 2)',
    wf: { wall: '#3B3330', manila: '#FFFFFF', ink: '#3B3330', red: '#3B3330', paper: '#FFFFFF', hl: '#FFE135', mid: '#B7AEA9', midInk: '#7A706B', rule: '#CFC8C3' },
    gfx: { disp: (s) => LF.mont(R(s * 0.7), 800), body: (s, w) => LF.mont(R(s * 0.9), w >= 600 ? 700 : 500), mono: (s) => LF.mont(R(s * 0.88), 700) },
    label: { kind: 'box', font: (z) => LF.mont(z, 800), col: '#FFFFFF', bg: '#3B3330', box: [70, 70, 940, 150], zMax: 52, caps: true, lh: 1.25 },
    cap: { font: (z) => LF.mont(z, 800), size: 76, chunk: 3, kase: 'upper', col: '#FFFFFF', key: '#FFE135', shadow: 0.7, ls: -0.01, y: 1540, yG: 1540 } },
  sh02: { board: [62, 36, 4], fontIds: ['shorts-13'], colours: 'shorts-13 (Formats 62)',
    wf: { wall: '#5C6B5A', manila: '#F4EBD0', ink: '#3F4A3D', red: '#5C6B5A', paper: '#F4EBD0', hl: '#F5D33F', mid: '#B9BFA8', midInk: '#5C6B5A', rule: '#C9C2A6' },
    gfx: { disp: (s) => LF.ysf(R(s * 0.72)), body: (s) => LF.ysf(R(s * 0.86)), mono: (s) => LF.ysf(R(s * 0.9)) },
    label: { kind: 'box', font: (z) => LF.ysf(z), col: '#F4EBD0', bg: '#5C6B5A', box: [70, 80, 940, 200], zMax: 70, lh: 1.2 },
    cap: { font: (z) => LF.ysf(z), size: 84, chunk: 3, kase: 'asis', col: '#F4EBD0', box: '#5C6B5A', key: '#F5D33F', ls: -0.01, y: 1745, yG: 1790 } },
  sh03: { board: [5, 65, 31], fontIds: ['design-27'], colours: 'combo Design 355 (grey / blue / black)',
    wf: { wall: '#2C3FB0', manila: '#D9D5CB', ink: '#111111', red: '#2C3FB0', paper: '#D9D5CB', hl: '#D9D5CB', mid: '#8F94C9', midInk: '#5A5850', rule: '#B5B0A4' },
    gfx: { disp: (s) => LF.genI(R(s * 0.72), 600), body: (s) => LF.genI(R(s * 0.86), 500), mono: (s) => LF.genI(R(s * 0.9), 600) },
    label: { kind: 'poster', font: (z) => LF.genI(z, 600), col: '#2C3FB0', ground: '#D9D5CB', zMax: 130 },
    cap: { font: (z) => LF.genI(z, 600), size: 66, chunk: 4, kase: 'asis', col: '#2C3FB0', box: '#D9D5CB', ls: -0.02, y: 905, yG: 905 } },
  sh04: { board: [52, 22, 67], fontIds: ['shorts-11'], colours: 'shorts-11 (Formats 52)',
    wf: { wall: '#111111', manila: '#FFFFFF', ink: '#111111', red: '#6E6A4E', paper: '#FFFFFF', hl: '#FFFFFF', mid: '#9A967E', midInk: '#6E6A4E', rule: '#CFCFCF', black: '#111111' },
    gfx: { disp: (s) => LF.news(R(s * 0.82), 600), body: (s) => LF.news(R(s * 0.95), 500), mono: (s) => LF.news(R(s * 1.0), 600) },
    label: { kind: 'tag', font: (z) => LF.news(z, 500), col: '#FFFFFF', bg: '#111111', box: [60, 80, 860, 150], zMax: 60 },
    cap: { font: (z) => LF.news(z, 500), size: 60, chunk: 0, kase: 'asis', col: '#FFFFFF', box: '#111111', ls: -0.005, y: 1690, yG: 1690 } },
  sh05: { board: [64, 63, 19], fontIds: ['design-19', 'pair-08'], colours: 'combo-11 (Design 362: #C4BF3B / #18480E)',
    wf: { wall: '#18480E', manila: '#C4BF3B', ink: '#18480E', red: '#18480E', paper: '#C4BF3B', hl: '#C4BF3B', mid: '#7E9A57', midInk: '#3E5A2A', rule: '#9E9A30' },
    gfx: { disp: (s) => LF.brush(R(s * 0.95)), body: (s) => LF.int(R(s * 0.92), 700), mono: (s) => LF.int(R(s * 0.92), 700) },
    label: { kind: 'screen', font: (z) => LF.brush(z), col: '#18480E', screen: '#C4BF3B', zMax: 230 },
    cap: { font: (z) => LF.int(z, 700), size: 64, chunk: 3, kase: 'lower', col: '#18480E', box: '#C4BF3B', ls: -0.02, y: 1700, yG: 1700 } },
  sh06: { board: [13, 20, 11], fontIds: ['design-32'], colours: 'combo Design 405 (orange / black)',
    wf: { wall: '#000000', manila: '#E57245', ink: '#000000', red: '#000000', paper: '#E57245', hl: '#E57245', mid: '#8A4A30', midInk: '#4A2414', rule: '#B85A35' },
    gfx: { disp: (s) => LF.osw(R(s * 0.86), 700), body: (s) => LF.osw(R(s * 0.92), 500), mono: (s) => LF.osw(R(s * 1.0), 600) },
    label: { kind: 'box', font: (z) => LF.osw(z, 700), col: '#000000', bg: '#E57245', box: [70, 70, 940, 190], zMax: 78, caps: true, lh: 1.12 },
    cap: { font: (z) => LF.osw(z, 700), size: 80, chunk: 3, kase: 'upper', col: '#000000', box: '#E57245', ls: 0.005, y: 1500, yG: 880 } },
  sh07: { board: [24, 69, 17], fontIds: ['shorts-05'], colours: 'shorts-05 (Formats 24)',
    wf: { wall: '#6B6059', manila: '#FFFFFF', ink: '#111111', red: '#111111', paper: '#FFFFFF', hl: '#FFFFFF', mid: '#C9C2BD', midInk: '#6B6059', rule: '#D6D1CC' },
    gfx: { disp: (s) => LF.tik(R(s * 0.78), 800), body: (s) => LF.tik(R(s * 0.9), 600), mono: (s) => LF.tik(R(s * 0.9), 700) },
    label: { kind: 'rbox', font: (z) => LF.tik(z, 800), col: '#111111', bg: '#FFFFFF', box: [110, 150, 860, 220], zMax: 64 },
    cap: { font: (z) => LF.bask(z, 700), size: 74, chunk: 0, kase: 'asis', col: '#FFFFFF', shadow: 0.8, ls: -0.01, y: 1560, yG: 1800 } },
  sh08: { board: [12, 48, 45], fontIds: ['design-16', 'pair-15'], colours: 'combo-15 (Design 1: wine / cream / blush)',
    wf: { wall: '#990915', manila: '#FBF3EC', ink: '#990915', red: '#990915', paper: '#FBF3EC', hl: '#FCBFBA', mid: '#D9A3A6', midInk: '#7A2A30', rule: '#E2CFCB' },
    gfx: { disp: (s) => LF.bod(R(s * 0.8), 700), body: (s) => LF.arch(R(s * 0.9), 500), mono: (s) => LF.arch(R(s * 0.92), 600) },
    label: { kind: 'gtitle', font: (z) => LF.bod(z, 700), col: '#FBF3EC', zMax: 120 },
    cap: { font: (z, w) => LF.arch(z, w || 500), size: 70, chunk: 0, kase: 'asis', col: '#FBF3EC', lit: '#F0C4C6', ls: -0.01, y: 1440, yG: 1745 }, band: '#990915' },
  sh09: { board: [47, 51, 13], fontIds: ['design-15'], colours: 'combo-04 (Design 371: black / pink / light grey)',
    wf: { wall: '#0A0A0A', manila: '#DFB0AE', ink: '#0A0A0A', red: '#0A0A0A', paper: '#DFB0AE', hl: '#DDDADC', mid: '#8A7A79', midInk: '#5A3E3D', rule: '#C99C9A' },
    gfx: { disp: (s) => LF.bagel(R(s * 0.74)), body: (s) => LF.bagel(R(s * 0.74)), mono: (s) => LF.bagel(R(s * 0.8)) },
    label: { kind: 'band', font: (z) => LF.bagel(z), col: '#DFB0AE', box: [40, 50, 1000, 200], zMax: 96, lower: true },
    cap: { font: (z) => LF.bagel(z), size: 80, chunk: 3, kase: 'lower', col: '#DFB0AE', ls: -0.01, y: 1650, yG: 1800 }, band: '#0A0A0A' },
  sh10: { board: [33, 56, 3], fontIds: ['design-23'], colours: 'combo Design 359 (cream / navy / brown)',
    wf: { wall: '#E8E4D6', manila: '#E8E4D6', ink: '#1F2C5C', red: '#1F2C5C', paper: '#1F2C5C', hl: '#835D59', mid: '#8F95AE', midInk: '#4B557A', rule: '#C9C3B0' },
    gfx: { disp: (s) => LF.shrik(R(s * 0.7)), body: (s) => LF.shrik(R(s * 0.66)), mono: (s) => LF.shrik(R(s * 0.72)) },
    label: { kind: 'cposter', font: (z) => LF.shrik(z), col: '#1F2C5C', ground: '#E8E4D6', zMax: 240 },
    cap: { font: (z) => LF.shrik(z), size: 70, chunk: 3, kase: 'lower', col: '#1F2C5C', box: '#E8E4D6', ls: 0, y: 1760, yG: 1760 } },
};
const LKL = LK_ID && LOOK[LK_ID] && WFF.on ? LOOK[LK_ID] : null;

/* ---------- palette + the graphics' type for this short ---------- */
if (LKL) {
  Object.assign(WF, LKL.wf);
  Object.assign(G.wfWall, { bg: WF.wall, fg: WF.paper, mid: WF.mid, acc: WF.hl, card: WF.manila, panel: WF.wall, line: 'rgba(0,0,0,0)' });
  Object.assign(G.wfCard, { bg: WF.manila, fg: WF.ink, mid: WF.midInk, line: WF.rule, acc: WF.red, card: WF.manila, panel: WF.manila });
  Object.assign(G.wfBlack, { bg: WF.wall, fg: WF.paper, mid: WF.mid, acc: WF.hl, card: WF.manila, panel: WF.wall });
  if (typeof PLATE !== 'undefined') { PLATE.wf = [WF.manila, WF.ink, WF.red]; PLATE.wfRed = [WF.red, WF.paper, WF.ink]; }
  Object.assign(TH.look, { fg: WF.manila, ink: WF.ink, acc: WF.red, accOnDark: WF.hl, outline: WF.manila, ring: WF.manila, band: LKL.band || WF.wall });
  WFF.hi = WF.hl; WFF.acc = WF.red;
  const g_ = LKL.gfx; FB = (s) => g_.disp(s); FW = (s, w = 500) => g_.body(s, w); FC = (s) => g_.mono(s);
  F.disp = (s) => FB(s); F.body = (s, w = 600) => FW(s, w); F.mono = (s) => FC(s); F.serif = (s) => FB(s);
  LS.disp = 0; LS.mono = 0.01; LS.serif = 0;
  const inst0 = WFF.install; WFF.install = (...a) => { const r = inst0(...a); TH.look.band = LKL.band || (WFF.fmt === 'A' ? LKL.cap.box || WF.wall : WF.wall); return r; };
}

/* ---------- helpers ---------- */
const lkWrap = (s, f, maxW, ls = 0) => { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f, ls) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur);
  if (out.length > 1 && !/\s/.test(out[out.length - 1])) { const pw = out[out.length - 2].split(' '); if (pw.length > 1) { const mv = pw.pop() + ' ' + out[out.length - 1]; if (tw(mv, f, ls) <= maxW) { out[out.length - 2] = pw.join(' '); out[out.length - 1] = mv; } } }
  return out; };
/** biggest size z <= zMax where s fits maxW in <= maxL lines and maxH tall. Her own line breaks (Shift+Enter, or "|") are kept: only shrunk. */
const lkFit = (s, fontFn, maxW, maxL, maxH, zMax, zMin = 26, lhK = 1.08, lsK = 0) => {
  let z = zMax, L = [];
  const hand = String(s).split(/\n|\s*\|\s*/).map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
  if (hand.length > 1) { for (; z > zMin; z -= 2) { const f = fontFn(z); if (hand.length * z * lhK <= Math.max(maxH, hand.length * zMin * lhK) && Math.max(...hand.map(l => tw(l, f, lsK * z))) <= maxW) break; } return { z, lines: hand }; }
  s = String(s).replace(/\s+/g, ' ').trim();
  for (; z >= zMin; z -= 2) { const f = fontFn(z); L = lkWrap(s, f, maxW, lsK * z); if (L.length <= maxL && L.length * z * lhK <= maxH && Math.max(...L.map(l => tw(l, f, lsK * z))) <= maxW) break; }
  return { z, lines: L };
};
const lkShadow = (a, z) => { ctx.shadowColor = `rgba(0,0,0,${a})`; ctx.shadowBlur = Math.max(6, z * 0.24); ctx.shadowOffsetY = Math.max(1, z * 0.04); };
const lkEl = (scene, key, def, what, draw) => { const sid = SCENE_ID; SCENE_ID = scene; EL.seen.delete(scene + '/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
const lkPlain = (s) => String(s || '').replace(/[*~]/g, '');
const lkLab = () => lkPlain(WFF.title());
/** lines of text, each on its own box of the item's ground (bg), centred on cx */
const lkLines = (lines, f, z, cx, y0, lh, col, bg, ls = 0, pad = 0.22, align = 'center', x0 = 0) => {
  lines.forEach((l, i) => { const yy = y0 + z * (0.84 + lh * i); const lw = tw(l, f, ls * z); const lx = align === 'left' ? x0 : cx - lw / 2;
    if (bg) rect(lx - z * pad, yy - z * 0.9, lw + z * pad * 2, z * Math.max(1.12, lh), bg); _txt(l, align === 'left' ? x0 : cx, yy, f, col, align, 'alphabetic', ls * z); }); };

/* ---------- the top title (the short's topic in plain words, inside the top band, max 2 lines, shrinks; steps aside under a graphic) ---------- */
WFF.LK_TITLE = (t) => {
  const L = LKL.label; const fm = WFF.fmt; const gfx = WFF.inGfx(t) || !!FOOT.panelRect;
  if (L.kind === 'poster' || L.kind === 'cposter' || L.kind === 'screen') return;   // B / C / J: the title is the poster / the screen
  if (L.kind === 'gtitle') {   // G (Formats 12 + 48): a serif title on the wine page above her letterboxed frame, gone while a page is up
    const a = 1 - WFF.live().reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0); if (a < 0.01) return;
    lkEl('label', 'label', lkLab(), 'title above her frame (text; Shift+Enter = new line)', (ov, str, info) => { const x = 70, y = 170, w = 940, h = 420;
      const { z, lines } = lkFit(str, L.font, w, 3, h, L.zMax, 30, 1.06, -0.01); const f = L.font(z); const hh = lines.length * z * 1.06; const y0 = y + (h - hh);
      if (ov.hide) { regBox(ov, x, y0, w, hh, info); return; }
      withA(a, () => moved(ov, () => { lkLines(lines, f, z, CX, y0, 1.06, L.col, null, -0.01); regBox(ov, x, y0, w, hh, info); }, [CX, y0])); });
    return;
  }
  if (gfx) return;
  lkEl('label', 'label', lkLab(), 'top title (text; Shift+Enter = new line)', (ov, str, info) => {
    const [x, y, w, h] = L.box; const s = L.caps ? str.toUpperCase() : L.lower ? str.toLowerCase() : str; const lh = L.lh || 1.12;
    if (L.kind === 'tag') {   // Formats 22 + 52: a small serif label top-left on a black box
      const pad = 18; const { z, lines } = lkFit(s, L.font, w - pad * 2, 2, h - pad, L.zMax, 26, 1.2, 0); const f = L.font(z);
      const bw = Math.max(...lines.map(l => tw(l, f))) + pad * 2, bh = lines.length * z * 1.2 + pad;
      if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
      moved(ov, () => { rect(x, y, bw, bh, L.bg); lines.forEach((l, i) => _txt(l, x + pad, y + pad * 0.5 + z * (0.92 + 1.2 * i), f, L.col, 'left')); regBox(ov, x, y, bw, bh, info); }, [x, y]);
      return; }
    if (L.kind === 'rbox') {   // Formats 24 / 69: black heavy sans in one white rounded box (TikTok's own text style)
      const pw = 36, ph = 22; const { z, lines } = lkFit(s, L.font, w - pw * 2, 2, h - ph * 2, L.zMax, 30, 1.1, -0.01); const f = L.font(z);
      const bw = Math.max(...lines.map(l => tw(l, f, -0.01 * z))) + pw * 2, bh = lines.length * z * 1.1 + ph * 2 - z * 0.1; const bx = CX - bw / 2;
      if (ov.hide) { regBox(ov, bx, y, bw, bh, info); return; }
      moved(ov, () => { fillRR(bx, y, bw, bh, 24, L.bg); lines.forEach((l, i) => _txt(l, CX, y + ph + z * (0.8 + 1.1 * i), f, L.col, 'center', 'alphabetic', -0.01 * z)); regBox(ov, bx, y, bw, bh, info); }, [CX, y]);
      return; }
    if (L.kind === 'band') {   // F (Formats 47): the title in the item's ink straight on the band above her square (the band is the item's ground)
      const { z, lines } = lkFit(s, L.font, w, 2, h, L.zMax, 30, 1.02, -0.01); const f = L.font(z); const hh = lines.length * z * 1.02; const y0 = y + (h - hh) / 2;
      if (ov.hide) { regBox(ov, x, y0, w, hh, info); return; }
      moved(ov, () => { lkLines(lines, f, z, CX, y0, 1.02, L.col, null, -0.01); regBox(ov, x, y0, w, hh, info); }, [CX, y0]);
      return; }
    // 'box': each line on its own box of the item's ground, centred
    const { z, lines } = lkFit(s, L.font, w - 40, 2, h, L.zMax, 26, lh, -0.01); const f = L.font(z); const hh = lines.length * z * lh;
    if (ov.hide) { regBox(ov, x, y, w, hh, info); return; }
    moved(ov, () => { lkLines(lines, f, z, CX, y, lh, L.col, L.bg, -0.01, 0.3); regBox(ov, x, y, w, hh, info); }, [CX, y]);
  });
};

/* ---------- posters: B (Formats 5 + 65: the title on the grey top panel), C (Formats 33 + 3: huge navy Shrikhand behind her) ---------- */
WFF.LK_POSTER = (t, r) => {
  const L = LKL.label;
  if (L.kind === 'poster') { const ph = r.h - 190; rect(r.x, r.y, r.w, r.h, WF.wall); rect(r.x, r.y, r.w, ph, L.ground);
    lkEl('label', 'label', lkLab(), 'title on the top panel (text; Shift+Enter = new line)', (ov, str, info) => { const mw = r.w - 120;
      const { z, lines } = lkFit(str, L.font, mw, 3, ph - 120, L.zMax, 30, 1.04, -0.02); const f = L.font(z); const hh = lines.length * z * 1.04; const y0 = r.y + (ph - hh) / 2;
      if (ov.hide) { regBox(ov, r.x + 60, y0, mw, hh, info); return; }
      moved(ov, () => { lkLines(lines, f, z, r.x + r.w / 2, y0, 1.04, L.col, null, -0.02); regBox(ov, r.x + 60, y0, mw, hh, info); }, [r.x + r.w / 2, y0]); });
    return; }
  if (L.kind === 'cposter') { rect(r.x, r.y, r.w, r.h, L.ground);
    lkEl('label', 'poster', lkPlain(FOOT.m.poster || WFF.title()), 'the big words behind her (Shift+Enter = new line)', (ov, str, info) => { const mw = r.w - 60;
      const { z, lines } = lkFit(str, L.font, mw, 2, r.h * 0.5, L.zMax, 40, 1.0, 0); const f = L.font(z); const hh = lines.length * z; const y0 = r.y + 30;
      if (ov.hide) { regBox(ov, r.x + 30, y0, mw, hh, info); return; }
      moved(ov, () => { lkLines(lines, f, z, r.x + r.w / 2, y0, 1.0, L.col, null, 0); regBox(ov, r.x + 30, y0, mw, hh, info); }, [r.x + r.w / 2, y0]); });
  }
};
/* J (Formats 38 + 63): her cut-out in front of a screen; the screen shows "Time blocking" in dark-green Caveat Brush on #C4BF3B */
WFF.LK_JROOM = (t, q, content) => {
  const L = LKL.label; const S = WFF.JS; rect(0, 1560, W, H - 1560, '#10300A'); rect(0, 1556, W, 4, '#2A5A1E');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0B1A08'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * (content ? 0.74 : 0.5)) }; rect(S.x, S.y, S.w, S.h, content ? WF.wall : L.screen);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (!content) lkEl('label', 'poster', lkPlain(FOOT.m.poster || WFF.title()), 'the words on the screen behind her (Shift+Enter = new line)', (ov, str, info) => { const mw = r.w - 100;
      const { z, lines } = lkFit(str, L.font, mw, 2, r.h - 70, L.zMax, 40, 1.0, 0); const f = L.font(z); const hh = lines.length * z; const y0 = r.y + (r.h - hh) / 2;
      if (ov.hide) { regBox(ov, r.x + 50, y0, mw, hh, info); return; }
      moved(ov, () => { ctx.save(); ctx.translate(r.x + r.w / 2, y0 + hh / 2); ctx.rotate(-0.05); ctx.translate(-(r.x + r.w / 2), -(y0 + hh / 2)); lkLines(lines, f, z, r.x + r.w / 2, y0, 1.0, L.col, null, 0); ctx.restore(); regBox(ov, r.x + 50, y0, mw, hh, info); }, [r.x + r.w / 2, y0]); });
    else content(t, r); });
  ctx.restore(); rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0B1A08');
};

/* ---------- her captions in this short's board style (2-5 word phrases, off her face, never over a graphic) ---------- */
WFF.LK_CAP = (t) => {
  WF.fixCaps(); const C = LKL.cap; const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const gfx = WFF.inGfx(t) || !!FOOT.panelRect;
  let cy = gfx ? C.yG : C.y; if (cy === 'divider') cy = FOOT.capYNow != null ? FOOT.capYNow - 25 : 1560; if (cst.y != null) cy = cst.y;
  let size = cst.size ? clamp(Math.round(cst.size), 36, 150) : C.size;
  const rw = raw.split(/\s+/).filter(Boolean).filter((w_, i_, a_) => !(i_ > 0 && w_.toLowerCase() === a_[i_ - 1].toLowerCase()));
  const kase = (w) => C.kase === 'upper' ? w.toUpperCase() : C.kase === 'lower' ? (w === 'I' || /^I'/.test(w) ? w : w.toLowerCase()) : w;
  const all = rw.map(w => kase(C.kase !== 'asis' ? w.replace(/[.,!;:]+$/, '') : w)).map((w, i) => w || rw[i]); if (!all.length) return;
  const wt = WFF.wordTimes(c, all.length);
  // chunks of 2-5 words (her rule: short phrases); chunk 0 = up to 5 words at a time, breaking at her commas
  const per = C.chunk || 5; let idx = all.map((_, i) => i);
  { const ch = []; let cur = []; idx.forEach(i => { cur.push(i); if ((cur.length >= 2 && /[,.?!:;]$/.test(rw[i] || '')) || cur.length === per) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < per + 1) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    const WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like', 'you', 'we', 'this', 'these', "i'm", 'also', 'just', 'of']);
    const nn = (w) => String(w || '').toLowerCase().replace(/[^a-z']/g, '');
    for (let k = 0; k < ch.length - 1; k++) while (ch[k].length > 2 && WEAK.has(nn(rw[ch[k][ch[k].length - 1]])) && !/[,.?!]$/.test(rw[ch[k][ch[k].length - 1]] || '') && ch[k + 1].length < per + 1) ch[k + 1].unshift(ch[k].pop());
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; idx = pick; }
  const key = C.key ? (() => { const sub = idx.map(i => rw[i]); const k = WF.redWord(sub); return k >= 0 ? idx[k] : -1; })() : -1;
  const fOf = (i, z) => (i === key && C.keyFont ? C.keyFont(z) : C.font(z));
  const lsK = C.ls != null ? C.ls : 0; const sp = (z) => tw(' ', C.font(z), lsK * z);
  const lwid = (l, z) => l.reduce((a, i, k) => a + tw(all[i], fOf(i, z), lsK * z) + (k ? sp(z) : 0), 0);
  const maxW = W * 0.84; let lines = [idx];
  if (lwid(idx, size) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < idx.length; k++) { const m_ = Math.max(lwid(idx.slice(0, k), size), lwid(idx.slice(k), size)); if (m_ < bm) { bm = m_; bi = k; } } lines = [idx.slice(0, bi), idx.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => lwid(l, size))); if (wide > maxW) size = Math.round(size * Math.max(0.62, maxW / wide)); }
  const lh = size * (C.box ? 1.32 : C.kase === 'upper' ? 1.06 : 1.16); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36; let bx0 = 1e9, bx1 = -1e9;
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; const lw_ = lwid(ln, size); let x = CX - lw_ / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + lw_);
    if (C.box) { const px = size * 0.3; rect(x - px, y - size * 0.92, lw_ + px * 2, size * 1.24, C.box); }
    ln.forEach((i) => { const f = fOf(i, size); const said = t >= wt[i] - 0.02; let col = C.col; if (i === key) col = C.key;
      if (C.lit && !said) col = C.lit;
      ctx.save(); if (C.shadow) lkShadow(C.shadow, size); _txt(all[i], x, y + (i === key && C.keyFont ? size * 0.06 : 0), f, col, 'left', 'alphabetic', lsK * size); ctx.restore();
      x += tw(all[i], f, lsK * size) + sp(size); }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover (first 0.1 s). kind "photo" = her real frame (her room) lowered, the line above her head on the item's ground;
 * "big" = the line alone on the item's ground (+ a small second line); "frame" = a still of the short under the line. ---------- */
const lkCoverPhoto = (c, str, o) => { const im = IMG['cover_' + FOOT.m.id]; const dy = o.dy || 430; rect(0, 0, W, H, o.ground);
  if (im) themeFixed(() => ctx.drawImage(im, 0, dy, W, H)); return lkCoverLine(str, o, [70, 70, 940, dy - 110]); };
const lkCoverLine = (str, o, box) => { const [x, y, w, h] = box; const s = o.caps ? str.toUpperCase() : o.lower ? str.toLowerCase() : str; const lh = o.lh || 1.12;
  const { z, lines } = lkFit(s, o.font, w - 40, o.maxL || 3, h, o.zMax || 120, 30, lh, o.ls || -0.01); const f = o.font(z); const hh = lines.length * z * lh; const y0 = y + (h - hh) / 2;
  if (o.rbox) { const pw = 40, ph = 26; const bw = Math.max(...lines.map(l => tw(l, f, (o.ls || -0.01) * z))) + pw * 2; fillRR(CX - bw / 2, y0 - ph, bw, hh + ph * 2 - z * 0.1, 26, o.bg);
    lkLines(lines, f, z, CX, y0, lh, o.col, null, o.ls || -0.01); }
  else lkLines(lines, f, z, CX, y0, lh, o.col, o.bg, o.ls || -0.01, 0.26);
  if (o.key) { /* the key word drawn again in the key colour (one word) */ const kw = o.key.toLowerCase(); lines.forEach((l, i) => { const ws = l.split(' '); const k = ws.findIndex(q => q.toLowerCase().replace(/[^a-z']/g, '') === kw); if (k < 0) return;
      const lw = tw(l, f, (o.ls || -0.01) * z); const pre = ws.slice(0, k).join(' ') + (k ? ' ' : ''); const xx = CX - lw / 2 + tw(pre, f, (o.ls || -0.01) * z); _txt(ws[k], xx, y0 + z * (0.84 + lh * i), f, o.keyCol, 'left', 'alphabetic', (o.ls || -0.01) * z); }); }
  return [x, y0, w, hh]; };
const lkCoverFrame = (c, str, o) => { rect(0, 0, W, H, o.ground); const im = IMG['cover_' + FOOT.m.id + '_frame']; const k = o.k || 0.6, dw = W * k, dh = H * k, dy = H - dh - (o.foot || 90);
  if (im) themeFixed(() => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.drawImage(im, CX - dw / 2, dy, dw, dh); ctx.restore(); });
  return lkCoverLine(str, o, [70, 90, 940, dy - 150]); };
const lkCoverBig = (c, str, o) => { rect(0, 0, W, H, o.ground); const r = lkCoverLine(str, o, [70, 420, 940, 760]);
  if (o.sub) lkEl('cover', 'sub', o.sub, 'cover, the small second line', (ov, s2, info) => { const S2 = String(s2).split('\n').map(q => q.trim()).filter(Boolean); if (!S2.length) S2.push('');   /* her Shift+Enter = a new line (2026-11-16) */
    let z2 = o.subZ || 70; while (z2 > 30 && Math.max(...S2.map(l => tw(l, o.subFont(z2)))) > 900) z2 -= 2; const f2 = o.subFont(z2); const y2 = r[1] + r[3] + 70; const h2 = z2 * 1.2 * S2.length;
    if (ov.hide) { regBox(ov, 70, y2, 940, h2, info); return; }
    moved(ov, () => { S2.forEach((l, i) => _txt(l, CX, y2 + z2 * (0.9 + 1.2 * i), f2, o.subCol, 'center', 'alphabetic', 0)); regBox(ov, 70, y2, 940, h2, info); }, [CX, y2]); });
  return r; };
const COVER = {
  sh01: (c, s) => lkCoverPhoto(c, s, { ground: '#3B3330', font: (z) => LF.mont(z, 800), col: '#FFFFFF', bg: '#3B3330', caps: true, zMax: 96, key: 'work', keyCol: '#FFE135', lh: 1.14 }),
  sh02: (c, s) => lkCoverBig(c, s, { ground: '#5C6B5A', font: LF.ysf, col: '#F4EBD0', zMax: 150, maxL: 4, lh: 1.08, sub: "full-time job + full-time master's", subFont: LF.brush, subZ: 92, subCol: '#F5D33F' }),
  sh03: (c, s) => lkCoverFrame(c, s, { ground: '#D9D5CB', font: (z) => LF.genI(z, 600), col: '#2C3FB0', zMax: 120, lh: 1.06 }),
  sh04: (c, s) => lkCoverBig(c, s, { ground: '#111111', font: (z) => LF.news(z, 500), col: '#FFFFFF', zMax: 150, maxL: 4, lh: 1.1, sub: 'give it more time than you think', subFont: (z) => LF.news(z, 400), subZ: 60, subCol: '#FFFFFF' }),
  sh05: (c, s) => lkCoverPhoto(c, s, { ground: '#C4BF3B', font: LF.brush, col: '#18480E', bg: '#C4BF3B', zMax: 130, lh: 1.0 }),
  sh06: (c, s) => lkCoverBig(c, s, { ground: '#E57245', font: (z) => LF.osw(z, 700), col: '#000000', caps: true, zMax: 190, maxL: 4, lh: 1.0, sub: "for master's students with a job", subFont: (z) => LF.osw(z, 500), subZ: 66, subCol: '#000000' }),
  sh07: (c, s) => lkCoverFrame(c, s, { ground: '#6B6059', font: (z) => LF.tik(z, 800), col: '#111111', bg: '#FFFFFF', rbox: true, zMax: 100, lh: 1.1 }),
  sh08: (c, s) => lkCoverBig(c, s, { ground: '#990915', font: (z) => LF.bod(z, 700), col: '#FBF3EC', zMax: 170, maxL: 3, lh: 1.04, sub: 'up to 30 days a year', subFont: (z) => LF.arch(z, 500), subZ: 64, subCol: '#FCBFBA' }),
  sh09: (c, s) => lkCoverFrame(c, s, { ground: '#0A0A0A', font: LF.bagel, col: '#DFB0AE', lower: true, zMax: 130, lh: 1.04, k: 0.62 }),
  sh10: (c, s) => { rect(0, 0, W, H, '#E8E4D6'); const im = IMG.px_mealprep; if (im) themeFixed(() => { const y0 = 640, h = H - y0, sc = Math.max(W / im.width, h / im.height); const sw = W / sc, sh = h / sc; ctx.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, 0, y0, W, h); });
    return lkCoverLine(s, { font: LF.shrik, col: '#1F2C5C', zMax: 140, lh: 1.02 }, [70, 70, 940, 520]); },
};
WFF.LK_COVER = (t) => {
  const c = WFF.coverOf(); const id = FOOT.m.id; const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    const ov = ovr('cover'); const str = lkPlain(ov.s != null ? ov.s : (c.text || FOOT.m.title || ''));
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; Shift+Enter = new line)' };
    if (ov.hide) { (COVER[id] || COVER.sh01)(c, ''); regBox(ov, 70, 90, 940, 300, info); return; }
    let r = null; moved(ov, () => { r = (COVER[id] || COVER.sh01)(c, str); if (r) regBox(ov, r[0], r[1], r[2], r[3], info); }, [CX, 200]);
  } finally { SCENE_ID = sid; }
};

if (LKL) {
  WFF.capDraw = WFF.LK_CAP; WFF.titleDraw = WFF.LK_TITLE; WFF.coverDraw = WFF.LK_COVER;
  if (/poster/.test(LKL.label.kind)) WFF.poster = WFF.LK_POSTER;
  if (LKL.label.kind === 'screen') WFF.jRoom = WFF.LK_JROOM;
}

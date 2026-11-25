/* dark-patterns shorts v4 (2026-11-12, her rule "Only use fonts from our boards", HER-STANDARD.md "Fonts"): every short keeps its
 * three formats-board references for LAYOUT (cover, top label, captions: "board": [n, n, n], studio /ideas/formats/), and takes its
 * 1-2 FONTS and its COLOURS only from the font board (studio /ideas/boards/fonts/, inspiration/boards/fonts/board.json; ids below and
 * in the manifest "fonts" / "colours"). Design-board fonts first; a font-board item whose source is one of the short's own formats when
 * there is one (sh02 Formats 32, sh06 Formats 64 + 65, sh09 Formats 38 + 57, sh10 Formats 68, sh11 Formats 48). White / black are
 * used as neutrals for captions on her video. The graphics' type (F.disp / F.body / F.mono) uses the short's fonts too.
 *   sh01 pair-01  Anton + Archivo            colours combo-01 (Design 368: navy / cream)        cream condensed caps stacked + single white words
 *   sh02 shorts-07 + design-09 Nunito Black + Inter Tight   combo-02 (Design 394: lime / black)  faithful Formats 32
 *   sh03 design-33 Archivo 70 % width 900    combo-19 (Design 395: black / yellow / red / blue) black words on a yellow bar + caps captions
 *   sh04 pair-04  Six Caps + Inter Tight     combo-16 (Design 367: paper / ink / red)           red Six Caps on the paper top panel
 *   sh05 design-25 + design-29 Figtree + DM Mono   combo-17 (Design 363: blue / white)          white bold captions on blue bars, mono label
 *   sh06 shorts-14 + shorts-15 Caveat + Inter Tight  shorts-15 (Formats 65: yellow / black)     handwritten slide on the screen, yellow highlight cover
 *   sh07 design-24 Bricolage Grotesque       combo-09 (Design 409: cream / indigo / violet)      big lowercase sentences, small edged title
 *   sh08 design-13 Switzer                   combo-12 (Design 350: black / grey / blue)          letterbox, plain light title, karaoke grey -> white
 *   sh09 shorts-09 + shorts-20 Young Serif + Satoshi Black Italic  shorts-09 (Formats 38: olive / yellow)  huge yellow serif behind her
 *   sh10 shorts-16 Oswald                    combo-21 (Design 116: navy / white / red)           caps captions at the top, one letter on a red box
 *   sh11 shorts-10 Bodoni Moda + Instrument Serif  combo-15 (Design 1: wine / cream / blush)     serif caps title + italic line, serif captions
 *   sh12 design-02 Big Shoulders Display     combo-07 (Design 397: orange / black)               orange condensed caps with a black edge
 *   sh13 pair-05  Libre Baskerville + Newsreader  combo-13 (Design 353: olive / yellow)          plain serif title above her frame, yellow captions
 *   sh14 design-18 + design-34 Gloock + Inter Tight  combo-18 (Design 389: pink / brown / cream)  soft serif hook at the top, small subtitles
 * The ending ("Full video on YouTube") stays her own design (Poppins Bold = font board thumbs-10). Speech, cuts, mix, covers' words,
 * her edits and the layouts are unchanged. Every text: ovr + regBox (editable: 'label/label', 'label/sub', 'caption/<n>', 'cover/cover').
 * A line break she types (Shift+Enter) in a cover or label is a real line break (her lines are never re-wrapped, only shrunk).
 * Loaded last (talking-head.json "common"); acts on shorts with a LOOK below and on the teaser (fonts only, see the end). */
'use strict';
const LK_ID = (FOOT.m && (FOOT.m.kind === 'short' || FOOT.m.kind === 'teaser') && FOOT.m.id) || null;
const LKF = [];
const LKP = '/p/dark-patterns/talking-head/assets/fonts/';   // width instances of Archivo (font board design-33 70 %, pair-02 62 %)
const LK_FILES = {
  LKAnton: [['Anton-Regular.ttf', {}]], LKArch: [['Archivo.ttf', { weight: '100 900' }]], LKArch70: [[LKP + 'Archivo-w70.ttf', { weight: '100 900' }]],
  LKArch62: [[LKP + 'Archivo-w62.ttf', { weight: '100 900' }]], LKNunito: [['Nunito-Variable.ttf', { weight: '200 1000' }]],
  LKInter: [['InterTightRegular.ttf', { weight: '400' }], ['InterTightMedium.ttf', { weight: '500' }], ['InterTightSemiBold.ttf', { weight: '600' }],
    ['InterTightBold.ttf', { weight: '700' }], ['InterTightExtraBold.ttf', { weight: '800' }], ['InterTightBlack.ttf', { weight: '900' }]],
  LKSix: [['SixCaps.ttf', {}]], LKFig: [['Figtree.ttf', { weight: '300 900' }]], LKMono: [['DMMono-Medium.ttf', { weight: '500' }]],
  LKCaveat: [['Caveat.ttf', { weight: '400 700' }]], LKBrico: [['BricolageGrotesque.ttf', { weight: '200 800' }]], LKSwz: [['Switzer-Variable.ttf', { weight: '100 900' }]],
  LKYoung: [['YoungSerif-Regular.ttf', {}]], LKSatI: [['Satoshi-VariableItalic.ttf', { weight: '300 900', style: 'italic' }]], LKOswald: [['Oswald-Variable.ttf', { weight: '200 700' }]],
  LKBodoni: [['BodoniModa[opsz,wght].ttf', { weight: '400 900' }]], LKInstr: [['InstrumentSerif-Regular.ttf', {}], ['InstrumentSerif-Italic.ttf', { style: 'italic' }]],
  LKBigS: [['BigShouldersDisplay[wght].ttf', { weight: '100 900' }]], LKBask: [['LibreBaskerville[wght].ttf', { weight: '400 700' }]], LKNews: [['Newsreader.ttf', { weight: '200 800' }]],
  LKGloock: [['Gloock-Regular.ttf', {}]], LKMarker: [['PermanentMarker-Regular.ttf', {}]],
};
/* the families each piece uses (only those are loaded) */
const LK_FAM = { sh01: ['LKAnton', 'LKArch'], sh02: ['LKNunito', 'LKInter'], sh03: ['LKArch70'], sh04: ['LKSix', 'LKInter'], sh05: ['LKMarker', 'LKInter'],
  sh06: ['LKCaveat', 'LKInter'], sh07: ['LKBrico'], sh08: ['LKSwz'], sh09: ['LKYoung', 'LKSatI'], sh10: ['LKOswald'], sh11: ['LKBodoni', 'LKInstr'],
  sh12: ['LKBigS'], sh13: ['LKBask', 'LKNews'], sh14: ['LKInter'], teaser: ['LKArch62', 'LKArch', 'LKMono'] };
(function lkFonts() {
  if (!LK_ID || !LK_FAM[LK_ID]) return;
  const add = (fam, file, desc) => { try { const x = new XMLHttpRequest(); x.open('GET', file.startsWith('/') ? file : '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) { console.error('LK font missing ' + file); return; } const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); LKF.push(ff.load().catch(() => null)); } catch (e) { console.error('LK font ' + file, e); } };
  for (const fam of LK_FAM[LK_ID]) for (const [file, desc] of LK_FILES[fam]) add(fam, file, desc);
  // the teaser's 16:9 captions are drawn by the studio in "Helvetica Neue" (not on the font board): in the teaser that name is Archivo (pair-02)
  if (LK_ID === 'teaser') add('Helvetica Neue', 'Archivo.ttf', { weight: '100 900' });
  const r0 = TH.ready; TH.ready = async () => { await Promise.all(LKF); return r0(); };
})();
const LF = {
  anton: (z) => `400 ${z}px LKAnton`, arch: (z, w = 800) => `${w} ${z}px LKArch`, a70: (z, w = 900) => `${w} ${z}px LKArch70`, a62: (z, w = 900) => `${w} ${z}px LKArch62`,
  nun: (z, w = 900) => `${w} ${z}px LKNunito`, int: (z, w = 700) => `${w} ${z}px LKInter`, six: (z) => `400 ${z}px LKSix`, fig: (z, w = 700) => `${w} ${z}px LKFig`,
  mono: (z) => `500 ${z}px LKMono`, cav: (z, w = 700) => `${w} ${z}px LKCaveat`, bri: (z, w = 800) => `${w} ${z}px LKBrico`, swz: (z, w = 400) => `${w} ${z}px LKSwz`,
  ysf: (z) => `400 ${z}px LKYoung`, satI: (z, w = 900) => `italic ${w} ${z}px LKSatI`, osw: (z, w = 600) => `${w} ${z}px LKOswald`, bod: (z, w = 700) => `${w} ${z}px LKBodoni`,
  ins: (z) => `400 ${z}px LKInstr`, insI: (z) => `italic 400 ${z}px LKInstr`, big: (z, w = 900) => `${w} ${z}px LKBigS`, bask: (z, w = 700) => `${w} ${z}px LKBask`,
  news: (z, w = 500) => `${w} ${z}px LKNews`, glo: (z) => `400 ${z}px LKGloock`, mk: (z) => `400 ${z}px LKMarker`,
};
const wB = (w, hi, lo) => (w >= 600 ? hi : lo);

/* ---------- one look per short (board = layout refs; fonts / colours = font-board ids). Her rule 2026-11-12 (later): every font is used
 * the way its board item uses it: the same text colour on the same ground colour (labels, captions and cover lines sit on boxes / bands of
 * that ground). spec: [ink, ground] of the item. ---------- */
const LOOK = {
  sh01: { board: [26, 36, 13], fontIds: ['pair-01'], colours: 'pair-01', pal: { acc: '#D8CDBB', ink: '#17357B', light: '#D8CDBB' },
    fonts: { disp: (s, w) => LF.arch(s, wB(w, 800, 500)), body: (s, w) => LF.arch(s, wB(w, 700, 500)), mono: (s) => LF.arch(s * 0.95, 600) },
    label: { kind: 'stack', font: LF.anton, col: '#D8CDBB', bg: '#17357B', box: [60, 70, 960, 290], zMax: 150, caps: true },
    cap: { font: (z) => LF.arch(z, 800), size: 92, chunk: 1, kase: 'lower', col: '#D8CDBB', box: ['#17357B', 0, 0.22, 'line'], ls: -0.01, y: 1470, yG: 880 } },
  sh02: { board: [32, 60, 28], fontIds: ['shorts-07', 'design-09'], colours: 'shorts-07 + design-09', pal: { acc: '#D9F44F', ink: '#070804', light: '#D9F44F' },
    fonts: { disp: (s, w) => LF.int(s, wB(w, 800, 500)), body: (s, w) => LF.int(s, wB(w, 700, 500)), mono: (s) => LF.int(s * 0.95, 600) },
    label: { kind: 'word', font: (z) => LF.nun(z, 1000), col: '#C8F25A', bg: '#3A3530', box: [70, 150, 940, 230], zMax: 170, lower: true },
    cap: { font: (z) => LF.int(z, 700), size: 58, chunk: 4, kase: 'lower', col: '#070804', box: ['#D9F44F', 0, 0.2, 'line'], ls: -0.03, y: 1560, yG: 1800,
      big: { words: ['confirmshaming'], font: (z) => LF.nun(z, 1000), size: 150, col: '#C8F25A', bg: '#3A3530', y: 1560, yG: 1780, hold: 1.1 } } },
  sh03: { board: [66, 42, 16], fontIds: ['design-33'], colours: 'design-33', pal: { acc: '#E6CD6F', ink: '#000000', light: '#E6CD6F' },
    fonts: { disp: (s, w) => LF.a70(s * 0.95, wB(w, 900, 600)), body: (s, w) => LF.a70(s * 0.95, wB(w, 800, 600)), mono: (s) => LF.a70(s * 0.9, 700) },
    label: { kind: 'ybox', font: (z) => LF.a70(z, 900), col: '#000000', bg: '#E6CD6F', box: [56, 110, 760, 200], zMax: 66, caps: true },
    cap: { font: (z) => LF.a70(z, 900), size: 84, chunk: 3, kase: 'upper', col: '#F4EFE6', box: ['#000000', 0, 0.2, 'line'], key: '#000000', keyBox: '#E6CD6F', keyLong: true, y: 1660, yG: 1660 } },
  sh04: { board: [5, 47, 9], fontIds: ['pair-04'], colours: 'pair-04', pal: { acc: '#CB482E', ink: '#CB482E', light: '#E9E0CC', accInk: '#E9E0CC' },
    fonts: { disp: (s, w) => LF.int(s, wB(w, 800, 500)), body: (s, w) => LF.int(s, wB(w, 700, 500)), mono: (s) => LF.int(s * 0.95, 600) },
    label: { kind: 'poster', font: LF.six, bandFont: (z) => LF.int(z, 800), col: '#CB482E', bandBg: '#E9E0CC', sub: '#CB482E', ground: '#E9E0CC', zMax: 230, zBand: 64 },
    cap: { font: (z) => LF.int(z, 700), size: 62, chunk: 0, kase: 'lower', col: '#CB482E', box: ['#E9E0CC', 0, 0.22, 'line'], y: 1735, yG: 1000 } },
  sh05: { board: [29, 39, 53], fontIds: ['design-20', 'combo-21'], colours: 'design-20 + combo-21', pal: { acc: '#E0262B', ink: '#031150', light: '#FFFFFF' }, band: '#031150',
    fonts: { disp: (s, w) => LF.int(s, wB(w, 800, 500)), body: (s, w) => LF.int(s, wB(w, 700, 500)), mono: (s) => LF.int(s * 0.95, 600) },
    label: { kind: 'mono', font: LF.mk, col: '#E8EAF4', bg: '#0D24C5', box: [70, 96, 940, 170], zMax: 52 },
    cap: { font: (z) => LF.int(z, 700), size: 68, chunk: 3, kase: 'asis', col: '#FFFFFF', box: ['#031150', 0, 0.2, 'line'], ls: -0.01, y: 1640, yG: 1830 } },
  sh06: { board: [64, 65, 11], fontIds: ['shorts-14', 'shorts-15'], colours: 'shorts-14 + shorts-15', pal: { acc: '#FFE600', ink: '#111111', light: '#F7F7F5' },
    fonts: { disp: (s, w) => LF.int(s, wB(w, 800, 500)), body: (s, w) => LF.int(s, wB(w, 700, 500)), mono: (s) => LF.int(s * 0.95, 600) },
    label: { kind: 'screen', font: (z) => LF.cav(z, 700), col: '#FFFFFF', screen: '#3B88D6' },
    cap: { font: (z) => LF.int(z, 800), size: 60, chunk: 4, kase: 'upper', col: '#111111', box: ['#FFE600', 0, 0.2, 'line'], ls: -0.01, y: 1720, yG: 1720 } },
  sh07: { board: [25, 54, 34], fontIds: ['design-24'], colours: 'design-24', pal: { acc: '#F2F3C4', ink: '#2A1F6E', light: '#F2F3C4' },
    fonts: { disp: (s, w) => LF.bri(s, wB(w, 800, 400)), body: (s, w) => LF.bri(s, wB(w, 700, 400)), mono: (s) => LF.bri(s * 0.95, 600) },
    label: { kind: 'plain', font: (z) => LF.bri(z, 700), col: '#2A1F6E', bg: '#F2F3C4', box: [80, 110, 920, 150], zMax: 54 },
    cap: { font: (z) => LF.bri(z, 800), size: 70, chunk: 0, kase: 'lower', col: '#2A1F6E', box: ['#F2F3C4', 0, 0.2, 'line'], ls: -0.03, y: 1470, yG: 1470 } },
  sh08: { board: [40, 12, 20], fontIds: ['design-13'], colours: 'design-13', pal: { acc: '#2A1FF3', ink: '#000000', light: '#A5A3B0' },
    fonts: { disp: (s, w) => LF.swz(s, wB(w, 700, 400)), body: (s, w) => LF.swz(s, wB(w, 600, 400)), mono: (s) => LF.swz(s * 0.95, 500) },
    label: { kind: 'plain', font: (z) => LF.swz(z, 400), col: '#A5A3B0', bg: '#000000', box: [70, 80, 940, 190], zMax: 66 },
    cap: { font: (z, w) => LF.swz(z, w || 600), size: 62, chunk: 0, kase: 'asis', col: '#FFFFFF', lit: '#A5A3B0', litW: 600, box: ['#000000', 0, 0.2, 'line'], y: 1650, yG: 1790 } },
  sh09: { board: [38, 57, 48], fontIds: ['shorts-09', 'shorts-20'], colours: 'shorts-09 + shorts-20', pal: { acc: '#F4E85C', ink: '#3A3A33', light: '#F4E85C' },
    fonts: { disp: (s) => LF.ysf(s), body: (s, w) => LF.satI(s, wB(w, 900, 500)), mono: (s) => LF.satI(s * 0.95, 700) },
    label: { kind: 'serifposter', font: LF.ysf, col: '#F4E85C', ground: '#3A3A33', bandBg: '#3A3A33' },
    cap: { font: (z) => LF.satI(z, 900), size: 92, chunk: 2, kase: 'lower', col: '#FFFFFF', box: ['#1B2440', 0, 0.2, 'line'], ls: -0.02, y: 1640, yG: 1800 } },
  sh10: { board: [68, 22, 10], fontIds: ['shorts-17'], colours: 'shorts-17', pal: { acc: '#7FF0C0', ink: '#2E2E33', light: '#FFFFFF' },
    fonts: { disp: (s, w) => LF.osw(s, wB(w, 700, 500)), body: (s, w) => LF.osw(s, wB(w, 600, 400)), mono: (s) => LF.osw(s, 500) },
    label: { kind: 'small', font: (z) => LF.osw(z, 500), col: '#FFFFFF', bg: '#2E2E33', box: [80, 92, 920, 110], zMax: 48 },
    cap: { font: (z) => LF.osw(z, 600), size: 66, chunk: 3, kase: 'upper', col: '#FFFFFF', key: '#7FF0C0', box: ['#2E2E33', 0, 0.2, 'line'], ls: 0, y: 300, yG: 880 } },
  sh11: { board: [58, 48, 52], fontIds: ['shorts-10'], colours: 'shorts-10', pal: { acc: '#B3ACA9', ink: '#3C2A22', light: '#FFFFFF' },
    fonts: { disp: (s, w) => LF.bod(s, wB(w, 700, 500)), body: (s) => LF.ins(s * 1.1), mono: (s) => LF.ins(s * 1.1) },
    label: { kind: 'serifcaps', font: (z) => LF.bod(z, 900), font2: LF.insI, col: '#FFFFFF', col2: '#FFFFFF', bg: '#3C2A22', box: [70, 100, 940, 250], zMax: 80 },
    cap: { font: (z) => LF.ins(z), size: 86, chunk: 0, kase: 'lower', col: '#FFFFFF', box: ['#3C2A22', 0, 0.2, 'line'], ls: 0.005, y: 1500, yG: 1830 } },
  sh12: { board: [31, 53, 47], fontIds: ['design-02'], colours: 'design-02', pal: { acc: '#E99A3F', ink: '#000000', light: '#E99A3F' },
    fonts: { disp: (s, w) => LF.big(s * 1.1, wB(w, 900, 600)), body: (s, w) => LF.big(s * 1.1, wB(w, 700, 600)), mono: (s) => LF.big(s * 1.1, 700) },
    label: { kind: 'plain', font: (z) => LF.big(z, 900), col: '#000000', bg: '#E99A3F', box: [60, 100, 960, 250], zMax: 108, caps: true },
    cap: { font: (z) => LF.big(z, 800), size: 72, chunk: 4, kase: 'upper', col: '#000000', box: ['#E99A3F', 0, 0.2, 'line'], ls: 0.01, y: 1720, yG: 1800 } },
  sh13: { board: [9, 12, 44], fontIds: ['pair-05'], colours: 'pair-05', pal: { acc: '#999997', ink: '#111111', light: '#E8E7E5' }, band: '#E8E7E5',
    fonts: { disp: (s, w) => LF.bask(s * 0.92, wB(w, 700, 400)), body: (s, w) => LF.news(s, wB(w, 600, 400)), mono: (s) => LF.news(s, 600) },
    label: { kind: 'gtitle', font: (z) => LF.bask(z, 700), col: '#111111', sub: '#111111', subFont: (z) => LF.news(z, 500) },
    cap: { font: (z) => LF.news(z, 600), size: 62, chunk: 0, kase: 'asis', col: '#111111', box: ['#E8E7E5', 0, 0.2, 'line'], ls: -0.005, y: 1440, yG: 1745 } },
  sh14: { board: [4, 60, 28], fontIds: ['design-26'], colours: 'design-26', pal: { acc: '#D92A11', ink: '#0C0C0C', light: '#FFFFFF' },
    fonts: { disp: (s, w) => LF.int(s, wB(w, 900, 500)), body: (s, w) => LF.int(s, wB(w, 700, 500)), mono: (s) => LF.int(s * 0.95, 600) },
    label: { kind: 'soft', font: (z) => LF.int(z, 900), col: '#FFFFFF', bg: '#0C0C0C', box: [90, 130, 900, 180], zMax: 60 },
    cap: { font: (z) => LF.int(z, 700), size: 66, chunk: 0, kase: 'lower', col: '#FFFFFF', box: ['#0C0C0C', 0, 0.2, 'line'], y: 1740, yG: 1820 } },
};
const LKL = LK_ID && LOOK[LK_ID] && DP.FMT ? LOOK[LK_ID] : null;

/* ---------- palette + the graphics' type for this short ---------- */
if (LKL) {
  if (LKL.pal) { const p = LKL.pal; DP.pink = p.acc; DP.soft = p.light;
    Object.assign(G.dpPink, { bg: p.light, panel: p.light }); Object.assign(G.dpInk, { bg: p.ink, acc: p.accInk || p.acc, panel: p.ink });
    if (typeof PLATE !== 'undefined') { PLATE.dp = [p.light, DP.ink, DP.ink]; PLATE.dpInk = [p.ink, DP.white, p.accInk || p.acc]; }
    Object.assign(TH.look, { acc: p.acc, accOnDark: p.acc }); }
  if (LKL.band) TH.look.band = LKL.band; else if (LKL.pal) TH.look.band = LKL.pal.ink;
  if (LKL.fonts) { F.disp = (s, w = 700) => LKL.fonts.disp(s, w); F.body = (s, w = 400) => LKL.fonts.body(s, w); F.mono = (s, w = 500) => LKL.fonts.mono(s, w); F.serif = (s) => LKL.fonts.body(s, 400); }
}

/* ---------- helpers ---------- */
const lkWrap = (s, f, maxW, ls = 0) => { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f, ls) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur);
  // no single word alone on the last line: move the previous line's last word down when it fits
  if (out.length > 1 && !/\s/.test(out[out.length - 1])) { const pw = out[out.length - 2].split(' '); if (pw.length > 1) { const mv = pw.pop() + ' ' + out[out.length - 1]; if (tw(mv, f, ls) <= maxW) { out[out.length - 2] = pw.join(' '); out[out.length - 1] = mv; } } }
  return out; };
/** biggest size z <= zMax where the text fits maxW in <= maxL lines and maxH tall (no single word alone on the last line if avoidable) */
const lkFit = (s, fontFn, maxW, maxL, maxH, zMax, zMin = 28, lhK = 1.08, lsK = 0) => {
  let z = zMax, L = [];
  // her line breaks (Shift+Enter in the studio) are law: her lines are kept as she typed them and only shrink to fit (as cheapest-countries v4)
  const hand = String(s).split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
  if (hand.length > 1) { for (; z > zMin; z -= 2) { const f = fontFn(z); if (hand.length * z * lhK <= Math.max(maxH, hand.length * zMin * lhK) && Math.max(...hand.map(l => tw(l, f, lsK * z))) <= maxW) break; } return { z, lines: hand }; }
  s = String(s).replace(/\s+/g, ' ');
  for (; z >= zMin; z -= 2) { const f = fontFn(z); L = lkWrap(s, f, maxW, lsK * z); if (L.length <= maxL && L.length * z * lhK <= maxH && Math.max(...L.map(l => tw(l, f, lsK * z))) <= maxW) break; }
  return { z, lines: L };
};
const lkShadow = (a, z) => { ctx.shadowColor = `rgba(0,0,0,${a})`; ctx.shadowBlur = Math.max(6, z * 0.22); ctx.shadowOffsetY = Math.max(1, z * 0.03); };
const lkStroke = (s, x, y, f, col, w, ls = 0, align = 'left') => { setFont(f, ls); ctx.lineJoin = 'round'; ctx.miterLimit = 2; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.strokeText(s, x, y); };
const lkEl = (key, def, what, draw) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
const lkParts = (s) => DP.labelParts(s);
/** a graphic is on screen this frame (a drawn panel sets FOOT.panelRect; pop cards / letterbox pages are in DP.gfxSpans) */
const lkGfx = (t) => !!FOOT.panelRect || (/[CJ]/.test(DP.FMT) && DP.inGfx(t));

/* ---------- the top label (the short's topic, inside the top band, max 2 lines, shrinks to fit) ---------- */
DP.LK_LABEL = (t) => {
  const L = LKL.label; const lab = DP.labText; if (!lab || FOOT.m.noLabels) return; const gfx = lkGfx(t) || DP.inGfx(t);   // the label also steps aside while a panel is still opening const fm = DP.FMT;
  // where graphics take the top of the frame the label steps aside (never two text layers on top of each other)
  if (gfx && L.kind !== 'gtitle') return;
  if (DP._bigAt === t) return;
  const [a, b] = lkParts(lab);
  // B / C between their poster segments (her 4:5 window): the same title, small, in the top band (y 40-250)
  if ((L.kind === 'poster' || L.kind === 'serifposter') && DP._pT !== t) {
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const s0 = L.kind === 'poster' ? str.toUpperCase() : str; const x = 60, y = 46, w = 960, h = b && L.kind === 'poster' ? 140 : 200;
      const { z, lines } = lkFit(s0, L.bandFont || L.font, w, 2, h, L.kind === 'poster' ? (L.zBand || 76) : 110, 28, 1.0, -0.015); const f = (L.bandFont || L.font)(z); const hh = lines.length * z;
      if (ov.hide) { regBox(ov, x, y, w, hh, info); return; }
      moved(ov, () => { if (L.bandBg) lines.forEach((l, i) => { const lw = tw(l, f, -0.015 * z), pd = z * 0.2; rect(CX - lw / 2 - pd, y + z * (0.84 + i) - z * 0.86, lw + pd * 2, z * 1.06, L.bandBg); });
        lines.forEach((l, i) => _txt(l, CX, y + z * (0.84 + i), f, L.colBand || L.col, 'center', 'alphabetic', -0.015 * z));
        if (b && L.kind === 'poster') _txt(b, CX, y + hh + 50, LF.int(42, 600), L.colBand || L.sub, 'center');
        regBox(ov, x, y, w, hh, info); }, [CX, y]); });
    return;
  }
  if (L.kind === 'stack' || L.kind === 'lime' || L.kind === 'word' || L.kind === 'soft' || L.kind === 'plain' || L.kind === 'outline' || L.kind === 'small') {
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const [x, y, w, h] = L.box; let s = L.caps ? str.toUpperCase() : L.lower ? str.toLowerCase() : str;
      const lh = L.kind === 'stack' ? 0.9 : L.kind === 'lime' ? 0.92 : 1.12; const ls = L.kind === 'stack' ? 0.0 : L.kind === 'word' ? -0.03 : -0.01;
      const { z, lines } = lkFit(s, L.font, w, L.kind === 'word' ? 1 : 2, h, L.zMax, 26, lh, ls);
      const hh = lines.length * z * lh; const y0 = y + (L.kind === 'word' || L.kind === 'soft' ? (h - hh) / 2 : 0);
      if (ov.hide) { regBox(ov, x, y0, w, hh, info); return; }
      moved(ov, () => { ctx.save(); lines.forEach((l, i) => { const yy = y0 + z * (lh * i + 0.8); const f = L.font(z);
          if (L.bg) { const lw = tw(l, f, ls * z), pd = z * 0.22; rect(CX - lw / 2 - pd, yy - z * 0.86, lw + pd * 2, z * Math.max(1.12, lh), L.bg); _txt(l, CX, yy, f, L.col, 'center', 'alphabetic', ls * z); }
          else if (L.kind === 'lime') { lkStroke(l, CX, yy, f, L.edge, z * 0.14, ls * z, 'center'); _txt(l, CX, yy, f, L.col, 'center', 'alphabetic', ls * z); }
          else if (L.kind === 'outline') { lkStroke(l, CX, yy, f, L.edge || 'rgba(0,0,0,0.95)', z * 0.16, ls * z, 'center'); _txt(l, CX, yy, f, L.col, 'center', 'alphabetic', ls * z); }
          else { ctx.save(); lkShadow(L.shadow || (L.kind === 'small' ? 0.65 : 0.45), z); _txt(l, CX, yy, f, L.col, 'center', 'alphabetic', ls * z); ctx.restore(); } });
        ctx.restore(); regBox(ov, x, y0, w, hh, info); }, [CX, y0]); });
    return;
  }
  if (L.kind === 'ybox') {   // Formats 42: black bold sans on a yellow box, top left
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const [x, y, w, h] = L.box; const pad = 22;
      const { z, lines } = lkFit(L.caps ? str.toUpperCase() : str, L.font, w - pad * 2, 2, h - pad * 2, L.zMax, 30, 1.15, -0.01); const f = L.font(z);
      const bw = Math.max(...lines.map(l => tw(l, f, -0.01 * z))) + pad * 2, bh = lines.length * z * 1.15 + pad * 1.6;
      if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
      moved(ov, () => { rect(x, y, bw, bh, L.bg); lines.forEach((l, i) => _txt(l, x + pad, y + pad * 0.8 + z * (0.86 + 1.15 * i), f, L.col, 'left', 'alphabetic', -0.01 * z)); regBox(ov, x, y, bw, bh, info); }, [x, y]); });
    return;
  }
  if (L.kind === 'mono') {   // Formats 29: white mono on a flat blue box
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const [x, y, w, h] = L.box; const pad = 24;
      const { z, lines } = lkFit(str, L.font, w - pad * 2, 2, h - pad, L.zMax, 26, 1.25); const f = L.font(z);
      const bw = Math.max(...lines.map(l => tw(l, f))) + pad * 2, bh = lines.length * z * 1.25 + pad; const bx = CX - bw / 2;
      if (ov.hide) { regBox(ov, bx, y, bw, bh, info); return; }
      moved(ov, () => { rect(bx, y, bw, bh, L.bg); lines.forEach((l, i) => _txt(l, CX, y + pad * 0.5 + z * (0.95 + 1.25 * i), f, L.col, 'center')); regBox(ov, bx, y, bw, bh, info); }, [CX, y]); });
    return;
  }
  if (L.kind === 'serifcaps') {   // Formats 48: condensed serif caps + a small italic line under it
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const [x, y, w, h] = L.box; const s = str.toUpperCase();
      const { z, lines } = lkFit(s, L.font, w, 2, h * 0.68, L.zMax, 30, 1.0, 0.02); const f = L.font(z); const hh = lines.length * z;
      if (ov.hide) { regBox(ov, x, y, w, hh, info); return; }
      moved(ov, () => { ctx.save(); if (L.bg) rect(x - 10, y - z * 0.12, w + 20, hh + z * 0.24 + (b ? Math.max(56, Math.round(z * 0.7)) * 1.25 + 14 : 0), L.bg); else lkShadow(0.5, z); lines.forEach((l, i) => _txt(l, CX, y + z * (0.82 + i), f, L.col, 'center', 'alphabetic', 0.02 * z)); ctx.restore(); regBox(ov, x, y, w, hh, info); }, [CX, y]);
      if (b) lkEl('sub', b, 'top label, the italic line', (ov2, s2, info2) => { const z2 = Math.max(56, Math.round(z * 0.7)); const f2 = L.font2(z2); const y2 = y + hh + 14;
        if (ov2.hide) { regBox(ov2, x, y2, w, z2 * 1.1, info2); return; }
        moved(ov2, () => { ctx.save(); if (!L.bg) lkShadow(0.5, z2); _txt(s2, CX, y2 + z2 * 0.8, f2, L.col2 || L.col, 'center'); ctx.restore(); regBox(ov2, x, y2, w, z2 * 1.1, info2); }, [CX, y2]); }); });
    return;
  }
  if (L.kind === 'gtitle') {   // Formats 12: plain white title above her letterboxed frame (fades out over the page)
    const al = 1 - DP.gfxSpans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0); if (al < 0.01) return;
    lkEl('label', a, 'top label (text)', (ov, str, info) => { const x = 70, y = 170, w = 940, h = 300;
      const { z, lines } = lkFit(str, L.font, w, 2, h * 0.72, 104, 30, 1.1, -0.015); const f = L.font(z); const hh = lines.length * z * 1.1; const y0 = y + (h * 0.72 - hh);
      if (ov.hide) { regBox(ov, x, y0, w, hh, info); return; }
      withA(al, () => moved(ov, () => { lines.forEach((l, i) => _txt(l, CX, y0 + z * (0.84 + 1.1 * i), f, L.col, 'center', 'alphabetic', -0.015 * z)); regBox(ov, x, y0, w, hh, info); }, [CX, y0]));
      if (b) lkEl('sub', b, 'top label, second line', (ov2, s2, info2) => { const z2 = Math.round(Math.min(48, z * 0.5)); const y2 = y0 + hh + 18;
        if (ov2.hide) { regBox(ov2, x, y2, w, z2 * 1.2, info2); return; }
        withA(al, () => moved(ov2, () => { _txt(s2, CX, y2 + z2 * 0.85, (L.subFont || L.font)(z2), L.sub, 'center'); regBox(ov2, x, y2, w, z2 * 1.2, info2); }, [CX, y2])); }); });
    return;
  }
};

/* ---------- posters (the label drawn ON the format's top panel / screen / ground) ---------- */
DP.posterLK = (t, r) => {
  DP._pT = t; const L = LKL.label; const [a, b] = lkParts(DP.labText || '');
  if (L.kind === 'poster') {   // Formats 5: white bold caps title + yellow subtitle on the dark top panel
    rect(r.x, r.y, r.w, r.h, L.ground);
    lkEl('label', a, 'title on the top panel', (ov, str, info) => { const s = str.toUpperCase(); const mw = r.w - 140;
      const { z, lines } = lkFit(s, L.font, mw, 2, r.h * 0.42, L.zMax || 116, 30, 1.0, -0.02); const f = L.font(z); const hh = lines.length * z;
      const z2 = Math.round(Math.min(58, z * 0.48)); const L2 = b ? lkWrap(b, LF.int(z2, 600), mw) .slice(0, 2) : []; const tot = hh + (L2.length ? 24 + L2.length * z2 * 1.15 : 0);
      const y0 = r.y + (r.h - tot) / 2 + 20;
      if (ov.hide) { regBox(ov, r.x + 70, y0, mw, tot, info); return; }
      moved(ov, () => { lines.forEach((l, i) => _txt(l, r.x + r.w / 2, y0 + z * (0.84 + i), f, L.col, 'center', 'alphabetic', -0.02 * z));
        L2.forEach((l, i) => _txt(l, r.x + r.w / 2, y0 + hh + 24 + z2 * (0.86 + 1.15 * i), LF.int(z2, 600), L.sub, 'center'));
        regBox(ov, r.x + 70, y0, mw, tot, info); }, [r.x + r.w / 2, y0]); });
    return;
  }
  if (L.kind === 'serifposter') {   // Formats 38: a huge yellow serif line behind her
    lkEl('poster', FOOT.m.poster || a, 'the big words behind her', (ov, str, info) => { const mw = r.w - 60;
      const { z, lines } = lkFit(str, L.font, mw, 3, r.h - 60, 230, 40, 0.98, -0.01); const f = L.font(z); const hh = lines.length * z * 0.98; const y0 = r.y + 40;
      if (ov.hide) { regBox(ov, r.x + 30, y0, mw, hh, info); return; }
      moved(ov, () => { lines.forEach((l, i) => _txt(l, r.x + r.w / 2, y0 + z * (0.8 + 0.98 * i), f, L.col, 'center', 'alphabetic', -0.01 * z)); regBox(ov, r.x + 30, y0, mw, hh, info); }, [r.x + r.w / 2, y0]); });
    return;
  }
};
/* J (sh06): her cut-out in front of a screen; the screen = a handwritten slide on blue (Formats 64) */
const jRoom0 = DP.jRoom;
DP.jRoomLK = (t, q, content, ground) => {
  const L = LKL.label; const S = DP.JS; rect(0, 1560, W, H - 1560, '#151A22'); rect(0, 1556, W, 4, '#2C3442');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const isP = content === DP.poster; const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * (isP ? 0.46 : 0.74)) };   // a graphic gets the screen down to her hair
  const g0 = g; g = G[isP ? 'dpInk' : (ground || 'dpInk')] || g0; rect(S.x, S.y, S.w, S.h, isP ? L.screen : g.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (isP) lkEl('poster', FOOT.m.poster || lkParts(DP.labText)[0], 'the slide on the screen behind her', (ov, str, info) => { const mw = r.w - 120;
      const { z, lines } = lkFit(str, L.font, mw, 2, r.h - 80, 150, 40, 1.0, 0); const f = L.font(z); const hh = lines.length * z; const y0 = r.y + (r.h - hh) / 2;
      if (ov.hide) { regBox(ov, r.x + 60, y0, mw, hh, info); return; }
      moved(ov, () => { lines.forEach((l, i) => _txt(l, r.x + r.w / 2, y0 + z * (0.8 + i), f, L.col, 'center')); regBox(ov, r.x + 60, y0, mw, hh, info); }, [r.x + r.w / 2, y0]); });
    else content(t, r); });
  ctx.restore(); g = g0;
  rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');
};
if (LKL) {
  if (/poster/.test(LKL.label.kind)) DP.poster = DP.posterLK;
  if (LKL.label.kind === 'screen') DP.jRoom = DP.jRoomLK;
}
// C (sh09): the poster stands on the dark ground, not the light one (her cut-out in front of the huge yellow serif)
if (LKL && DP.FMT === 'C') { const inst0 = DP.fmtInstall; DP.fmtInstall = (s, first) => { const pres = TH.presenter; const r = inst0(s, first); const talk1 = TH.talk;
  TH.talk = (sp_, o = {}) => pres(sp_, { side: 'right', scale: 0.64, id: o.id, draw: DP.poster, enter: 0.0001, ground: 'dpInk', gr: [40, 110, W - 80, 1000], sound: false });
  TH.talk.prev = talk1; return r; }; }

/* ---------- her captions in this short's board style ---------- */
DP.LK_CAP = (t) => {
  if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions) return; const C = LKL.cap;
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if ((TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1)) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const gfx = lkGfx(t);
  let cy = gfx ? C.yG : C.y; if (cy === 'divider') cy = FOOT.capYNow != null ? FOOT.capYNow - 20 : 1560; if (cst.y != null) cy = cst.y;
  let size = cst.size ? clamp(Math.round(cst.size), 36, 160) : C.size;
  const kase = (w) => C.kase === 'upper' ? w.toUpperCase() : C.kase === 'lower' ? (w === 'I' || /^I'/.test(w) ? w : w.toLowerCase()) : w;
  const all = raw.split(/\s+/).filter(Boolean).map(w => C.kase === 'lower' || C.kase === 'upper' ? w.replace(/[.,!?;:]+$/, (m) => (m === '?' ? '?' : '')) : w).map((w, i) => kase(w || raw.split(/\s+/).filter(Boolean)[i])); if (!all.length) return;
  const wt = (c.ws && c.ws.length === raw.split(/\s+/).filter(Boolean).length) ? c.ws.map(w => w.t) : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  // Formats 32: the key word, big and lime, over her when she says it (instead of the caption: one text layer)
  if (C.big) { const bi = all.findIndex(w => C.big.words.includes(w.toLowerCase().replace(/[^a-z]/g, '')));
    if (bi >= 0 && t >= wt[bi] - 0.05 && t < wt[bi] + C.big.hold) { DP._bigAt = t; const w = all[bi].toLowerCase().replace(/[^a-z'-]/g, ''); let z = C.big.size; const f0 = C.big.font;
      while (tw(w, f0(z), -0.04 * z) > W * 0.88 && z > 60) z -= 4; const f = f0(z); const p = MOTION.ease(t, wt[bi] - 0.05, 0.22, 'outBack'); const y = gfx ? C.big.yG : C.big.y; const ww = tw(w, f, -0.04 * z);
      withT(0, 0, 1, 0, () => { ctx.save(); ctx.translate(CX, y - z * 0.3); ctx.scale(0.85 + 0.15 * p, 0.85 + 0.15 * p); ctx.translate(-CX, -(y - z * 0.3)); if (C.big.bg) rect(CX - ww / 2 - z * 0.2, y - z * 0.88, ww + z * 0.4, z * 1.16, C.big.bg); else lkShadow(0.35, z); _txt(w, CX, y, f, C.big.col, 'center', 'alphabetic', -0.04 * z); ctx.restore(); });
      regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - ww / 2, y - z * 0.85, ww, z * 1.1, { kind: 'caption', text: raw, def: c.text, cue: c.i }); return; } }
  let words = all, k0 = 0;
  if (C.chunk) { const ch = []; let cur = [];
    all.forEach((w, i) => { cur.push(i); if ((C.chunk > 1 && /[,.?!:;]$/.test(raw.split(/\s+/).filter(Boolean)[i] || '')) || cur.length === C.chunk) { ch.push(cur); cur = []; } });
    if (cur.length) { if (C.chunk > 1 && cur.length === 1 && ch.length && ch[ch.length - 1].length < C.chunk + 1) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; words = pick.map(i => all[i]); k0 = pick[0]; }
  const lsK = C.ls != null ? C.ls : C.kase === 'upper' ? 0.0 : -0.02; let f = C.font(size); let ls = lsK * size; const maxW = W * 0.84; const join = (l) => l.join(' ');
  let lines = [words];
  if (tw(join(words), f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f, ls), tw(join(words.slice(k)), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.6, maxW / wide)); f = C.font(size); ls = lsK * size; } }
  const boxed = C.box && C.box[3] === 'line'; const lh = size * (C.box ? (boxed ? 1.34 : 1.24) : C.kase === 'upper' ? 1.06 : 1.16); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f, ls)); const sp = tw(' ', f, ls); let bx0 = 1e9, bx1 = -1e9, kk = k0;
  let keyIdx = C.key || C.redLetter ? DP.hiWord(all) : -1;
  if (C.keyLong && (keyIdx < k0 || keyIdx >= k0 + words.length)) { let bi = -1, bl = 4; words.forEach((w, i) => { const n = w.replace(/[^A-Za-z]/g, '').length; if (n > bl) { bl = n; bi = k0 + i; } }); keyIdx = bi; }   // Formats 66: one yellow word per chunk
  ctx.save();
  if (C.box && !boxed) { const px = size * C.box[2] * 1.6, py = size * 0.26; const bw = Math.max(...widths); const top = y0 - size * 0.86 - py; const bh = (lines.length - 1) * lh + size * 1.12 + py * 2;
    fillRR(CX - bw / 2 - px, top, bw + px * 2, bh, C.box[1], C.box[0]); }
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (boxed) { const px = size * C.box[2] * 1.4; fillRR(x - px, y - size * 0.9, widths[li] + px * 2, size * 1.22, C.box[1], C.box[0]); }
    ln.forEach((wd) => { const said = t >= wt[kk] - 0.02; const isKey = kk === keyIdx; let col = C.col;
      if (C.key && isKey) col = C.key;
      if (C.lit) { const fw = C.font(size, said ? 700 : 500); if (C.shadow) lkShadow(C.shadow, size); _txt(wd, x, y, C.litW ? C.font(size, C.litW) : fw, said ? (isKey && C.key ? C.key : C.col) : C.lit, 'left', 'alphabetic', ls); }
      else {
        if (C.keyBox && isKey) { const kw = tw(wd, f, ls); rect(x - size * 0.12, y - size * 0.9, kw + size * 0.24, size * 1.22, C.keyBox); }
        if (C.redLetter && isKey) { const l0 = wd[0]; const lw = tw(l0, f, ls); rect(x - size * 0.06, y - size * 0.86, lw + size * 0.12, size * 1.0, C.redLetter); }
        if (C.stroke) lkStroke(wd, x, y, f, C.stroke[0], size * C.stroke[1], ls);
        if (C.shadow) { ctx.save(); lkShadow(C.shadow, size); _txt(wd, x, y, f, col, 'left', 'alphabetic', ls); ctx.restore(); } else _txt(wd, x, y, f, col, 'left', 'alphabetic', ls); }
      x += tw(wd, f, ls) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = 18;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover (first 0.1 s): kind photo (her real frame), card (a big line alone), frame (a still of the short) ---------- */
/* covers: each line in its board item's text colour on that item's ground (a box per line or a flat card), her rule 2026-11-12 */
const COVER = {
  /* Formats 26 layout, pair-01: Anton cream on navy bands, stacked over her */
  sh01: (c, str) => coverStack(str, LF.anton, '#D8CDBB', 260, 0.98, [60, 90, 960, 560], 0, 0, '#17357B'),
  /* Formats 32, shorts-07: the rounded lime word on its dark brown box, over the lime frame of the short */
  sh02: (c, str) => coverHi(str, (z) => LF.nun(z, 1000), '#C8F25A', '#3A3530', [50, 40, 980, 250], 110),
  /* Formats 42 layout, design-33: words on tilted bars in the item's colours */
  sh03: (c, str) => coverBars(str.toUpperCase(), (z) => LF.a70(z, 900), [['#E6CD6F', '#000000'], ['#D24B2A', '#F4EFE6'], ['#2B2FA8', '#F4EFE6']], [60, 120, 960, 420], 104),
  /* Formats 5 layout, pair-04: still of the short + red Six Caps title and red line on cream */
  sh04: (c, str) => { const [a, b] = lkParts(str); rect(0, 0, W, 1075, '#E9E0CC'); coverShrink(0, 0, W, 890, 0.62, 30);
    coverPlain(a.toUpperCase(), LF.six, '#CB482E', [60, 600, 960, 330], 190, 2, 0); coverPlain(b, (z) => LF.int(z, 600), '#CB482E', [60, 950, 960, 80], 56, 1, -0.01); },
  /* Formats 29 layout, design-20: Permanent Marker white on bright blue */
  sh05: (c, str) => { const [a, b] = lkParts(str); rect(0, 0, W, H, '#0D24C5'); coverPlain(a, LF.mk, '#E8EAF4', [80, 520, 920, 560], 180, 3, 0);
    if (b) coverHi(b, (z) => LF.int(z, 700), '#FFFFFF', '#031150', [80, 1150, 920, 160], 58, 2); },
  /* Formats 65, shorts-15: still of the short + black Inter Tight on a yellow highlight */
  sh06: (c, str) => { rect(0, 0, W, 880, '#111111'); coverShrink(40, 110, 1000, 720, 0.7, 330); coverHi(str, (z) => LF.cav(z, 700), '#FFFFFF', '#3B88D6', [60, 100, 960, 240], 120); },
  /* Formats 34 layout, design-24: Bricolage indigo on cream boxes over her */
  sh07: (c, str) => coverHi(str, (z) => LF.bri(z, 800), '#2A1F6E', '#F2F3C4', [70, 130, 940, 280], 100),
  /* Formats 40 layout, design-13: black page, Switzer grey title, her frame in the middle */
  sh08: (c, str) => { rect(0, 0, W, H, '#000000'); const im = IMG['cover_' + FOOT.m.id]; const sq = 1000, y = 560;
    if (im) themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(40, y, sq, sq); ctx.clip(); const s_ = sq / im.width; ctx.drawImage(im, 40, y - im.height * s_ * 0.16, sq, im.height * s_); ctx.restore(); });
    coverPlain(str, (z) => LF.swz(z, 500), '#FFFFFF', [80, 240, 920, 280], 92, 3, -0.02); },
  /* Formats 38 layout, shorts-09: Young Serif yellow on its olive box */
  sh09: (c, str) => coverHi(str, LF.ysf, '#F4E85C', '#3A3A33', [60, 200, 960, 360], 140),
  /* Formats 68 layout, shorts-16: still of the short + white Oswald caps on grey, the figure on a red box */
  sh10: (c, str) => coverRed(str.toUpperCase(), (z) => LF.osw(z, 600), '#FFFFFF', null, [560, 1150, 470, 640], 120, '#2E2E33', '#7FF0C0'),
  /* Formats 48 layout, shorts-10: Bodoni caps + Instrument Serif italic, white on dark brown */
  sh11: (c, str) => { const [a, b] = lkParts(str); coverHi(a.toUpperCase(), (z) => LF.bod(z, 900), '#FFFFFF', '#3C2A22', [60, 90, 960, 290], 130, a.includes('\n') ? 3 : 2); if (b) coverHi(b, LF.insI, '#FFFFFF', '#3C2A22', [60, 400, 960, 110], 96); },
  /* Formats 31 layout, design-02: still of the short (the dots) + Big Shoulders black on orange */
  sh12: (c, str) => { rect(0, 0, W, 1000, '#000000'); coverShrink(0, 0, W, 990, 0.6, 390); coverHi(str.toUpperCase(), (z) => LF.big(z, 900), '#000000', '#E99A3F', [50, 50, 980, 330], 120); },
  /* Formats 12 layout, pair-05: a flat light-grey card, Libre Baskerville + Newsreader in black */
  sh13: (c, str) => { rect(0, 0, W, H, '#E8E7E5'); const [a, b] = lkParts(str); coverPlain(a, (z) => LF.bask(z, 700), '#111111', [80, 540, 920, 480], 150, 3, -0.02);
    if (b) { coverPlain(b, (z) => LF.news(z, 500), '#111111', [80, 1050, 920, 90], 60, 1, 0); } },
  /* Formats 4 layout, design-18: Gloock red on black boxes at the top */
  sh14: (c, str) => coverHi(str, (z) => LF.int(z, 900), '#FFFFFF', '#0C0C0C', [80, 110, 920, 300], 92),
};
/** a cover line with a solid edge in the colour pair's ink (no shadow), her line breaks kept */
function coverEdge(s, fontFn, col, edge, box, zMax, maxL, lsK = 0) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w, maxL, h, zMax, 30, 1.06, lsK); const f = fontFn(z);
  const hh = lines.length * z * 1.06; const y0 = y + (h - hh) / 2;
  lines.forEach((l, i) => { const yy = y0 + z * (0.84 + 1.06 * i); lkStroke(l, x + w / 2, yy, f, edge, z * 0.16, lsK * z, 'center'); _txt(l, x + w / 2, yy, f, col, 'center', 'alphabetic', lsK * z); }); }
/** design-33: each line on its own slightly tilted bar, bar colours in turn (combo-19) */
function coverBars(s, fontFn, pairs, box, zMax) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w - 60, 4, h, zMax, 30, 1.32, -0.01); const f = fontFn(z);
  lines.forEach((l, i) => { const lw = tw(l, f, -0.01 * z), yy = y + z * (1.0 + 1.32 * i), bx = x + 14 + (i % 2) * 26; const [bg, fg] = pairs[i % pairs.length];
    ctx.save(); ctx.translate(bx, yy); ctx.rotate(-0.05); rect(-14, -z * 0.92, lw + 28, z * 1.16, bg); _txt(l, 0, 0, f, fg, 'left', 'alphabetic', -0.01 * z); ctx.restore(); }); }
function coverPlain(s, fontFn, col, box, zMax, maxL, lsK = 0, shadow = 0) { if (!s) return null; const [x, y, w, h] = box;
  const { z, lines } = lkFit(s, fontFn, w, maxL, h, zMax, 30, 1.06, lsK); const f = fontFn(z); const hh = lines.length * z * 1.06; const y0 = y + (h - hh) / 2;
  ctx.save(); if (shadow) lkShadow(shadow, z); lines.forEach((l, i) => _txt(l, x + w / 2, y0 + z * (0.84 + 1.06 * i), f, col, 'center', 'alphabetic', lsK * z)); ctx.restore(); return [x, y0, w, hh]; }
function coverStack(s, fontFn, col, zMax, lhK, box, lsK, shadow, bg) { const [x, y, w, h] = box; const words = s.toUpperCase().split(/\s+/).filter(Boolean); const out = [];
  // Formats 26: each line its own size (short lines bigger), stacked tight
  let lines = []; let cur = ''; for (const wd of words) { const nx = cur ? cur + ' ' + wd : wd; if (cur && nx.length > 9) { lines.push(cur); cur = wd; } else cur = nx; } if (cur) lines.push(cur);
  const hand = s.toUpperCase().split('\n').map(q => q.replace(/\s+/g, ' ').trim()).filter(Boolean); if (hand.length > 1) lines = hand;   // her Shift+Enter lines
  const zs = lines.map(l => { let z = zMax; while (tw(l, fontFn(z)) > w && z > 40) z -= 4; return z; }); const tot = zs.reduce((a, z) => a + z * lhK, 0); const k = Math.min(1, h / tot);
  let yy = y + (h - tot * k) / 2; ctx.save(); if (shadow) lkShadow(shadow, 80); lines.forEach((l, i) => { const z = zs[i] * k; yy += z * lhK; if (bg) { const lw = tw(l, fontFn(z)), pd = z * 0.12; rect(CX - lw / 2 - pd, yy - z * 0.12 - z * 0.86, lw + pd * 2, z * lhK, bg); } _txt(l, CX, yy - z * 0.12, fontFn(z), col, 'center'); }); ctx.restore(); }
/** Formats 65: black bold sans on a yellow highlight, one highlight per line */
function coverHi(s, fontFn, col, hi, box, zMax, maxL = 3) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w - 40, maxL, h, zMax, 30, 1.18, -0.01); const f = fontFn(z);
  lines.forEach((l, i) => { const lw = tw(l, f, -0.01 * z); const yy = y + z * (0.9 + 1.18 * i); rect(CX - lw / 2 - 16, yy - z * 0.84, lw + 32, z * 1.08, hi); _txt(l, CX, yy, f, col, 'center', 'alphabetic', -0.01 * z); }); }
function coverBox(s, fontFn, col, bg, box, zMax) { const [x, y, w, h] = box; const pad = 28; const { z, lines } = lkFit(s, fontFn, w - pad * 2, 3, h - pad * 2, zMax, 30, 1.12, -0.01); const f = fontFn(z);
  const bw = Math.max(...lines.map(l => tw(l, f, -0.01 * z))) + pad * 2, bh = lines.length * z * 1.12 + pad * 1.6; rect(x, y, bw, bh, bg);
  lines.forEach((l, i) => _txt(l, x + pad, y + pad * 0.8 + z * (0.86 + 1.12 * i), f, col, 'left', 'alphabetic', -0.01 * z)); }
function coverLineBoxes(s, fontFn, col, bg, box, zMax) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w - 40, 3, h, zMax, 30, 1.3, -0.01); const f = fontFn(z);
  lines.forEach((l, i) => { const lw = tw(l, f, -0.01 * z); const yy = y + z * (0.9 + 1.3 * i); fillRR(CX - lw / 2 - 18, yy - z * 0.9, lw + 36, z * 1.18, 6, bg); _txt(l, CX, yy, f, col, 'center', 'alphabetic', -0.01 * z); }); }
/** the frame still's region (sx, sy, sw, sh) drawn again smaller, centred, from y dy (the graphic shrinks to make room for the words) */
function coverShrink(sx, sy, sw, sh, k, dy) { const im = IMG['cover_' + FOOT.m.id + '_frame']; if (!im) return; const s_ = im.width / W; const dw = sw * k, dh = sh * k;
  themeFixed(() => ctx.drawImage(im, sx * s_, sy * s_, sw * s_, sh * s_, CX - dw / 2, dy, dw, dh)); }
function coverRed(s, fontFn, col, red, box, zMax, lineBg, keyCol) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w, 5, h, zMax, 30, 1.08, 0); const f = fontFn(z); let done = false; const CX = x + w / 2;
  lines.forEach((l, i) => { const lw = tw(l, f); const yy = y + z * (0.86 + 1.08 * i); let xx = CX - lw / 2;
    if (lineBg) rect(xx - z * 0.14, yy - z * 0.9, lw + z * 0.28, z * 1.08, lineBg);
    if (!done && red) { const m = l.match(/\d/); if (m) { const pre = l.slice(0, m.index); const px = xx + tw(pre, f); const dw = tw(m[0], f); rect(px - z * 0.06, yy - z * 0.86, dw + z * 0.12, z * 1.0, red); done = true; } }
    if (keyCol && /\d/.test(l)) { const m = l.match(/\d+/); const pre = l.slice(0, m.index); _txt(pre, xx, yy, f, col, 'left'); _txt(m[0], xx + tw(pre, f), yy, f, keyCol, 'left'); _txt(l.slice(m.index + m[0].length), xx + tw(pre + m[0], f), yy, f, col, 'left'); return; }
    _txt(l, CX, yy, f, col, 'center'); }); }
function coverLime(s, fontFn, col, edge, box, zMax) { const [x, y, w, h] = box; const { z, lines } = lkFit(s, fontFn, w, 3, h, zMax, 30, 0.95, 0); const f = fontFn(z);
  lines.forEach((l, i) => { const yy = y + z * (0.82 + 0.95 * i); lkStroke(l, CX, yy, f, edge, z * 0.16, 0, 'center'); _txt(l, CX, yy, f, col, 'center'); }); }

DP.LK_COVER = (t) => {
  const c = DP.coverOf(); const id = FOOT.m.id; const kind = c.kind || 'photo';
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    if (kind === 'photo' || kind === 'frame') { const im = IMG[kind === 'frame' ? 'cover_' + id + '_frame' : 'cover_' + id]; if (im) themeFixed(() => ctx.drawImage(im, 0, 0, W, H)); else rect(0, 0, W, H, '#111114'); }
    const ov = ovr('cover'); const str = (ov.s != null ? ov.s : (c.text || FOOT.m.title || '')).replace(/~/g, '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; "|" = the second part)' };
    if (ov.hide) { regBox(ov, 60, 240, 960, 400, info); return; }
    moved(ov, () => { (COVER[id] || COVER.sh07)(c, str); regBox(ov, 60, 240, 960, 400, info); }, [CX, 240]);
  } finally { SCENE_ID = sid; }
};

/* ---------- hook in: formats.js's TH.over calls DP.capFmt / DP.titleFmt / DP.coverDraw ---------- */
if (LKL) {
  // the pop-up + magnifier: in a wide panel the magnifier sat at the right edge and its words ran out of the frame; in a short it
  // is drawn at 80 % round the panel's centre so the magnifier stays inside the frame
  { const p0 = DP.popup; DP.popup = (o) => { const f = p0(o); return (t, r) => { const R_ = DP.rr(r); if (R_.h > R_.w * 1.15) return f(t, r);
      rect(R_.x, R_.y, R_.w, R_.h, DP.pink); const k = 0.8, cx = R_.x + R_.w / 2, cy = R_.y + R_.h / 2;
      ctx.save(); ctx.beginPath(); ctx.rect(R_.x, R_.y, R_.w, R_.h); ctx.clip(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy); f(t, r); ctx.restore(); }; }; }
  // the EC press-release headline: in a short only its key line ("…practices found on 148 out of 399 online shops"), full width, ~2x bigger
  { const b0 = DP.big; DP.big = (key, o = {}) => { if (key !== 'ec-head' || !CLIPS['ec-head']) return b0(key, o);
      const c = CLIPS['ec-head']; const Y0 = 138, HH = 104; CLIPS['ec-line'] = { ...c, h: HH, hl: c.hl.map(b => [b[0], b[1] - Y0, b[2], b[3]]) };
      const f = b0('ec-line', { ...o, zoom: false });
      return (t, r) => { if (!IMG['clip_ec-line'] && IMG['clip_ec-head']) { const im = IMG['clip_ec-head'], sx = im.width / c.w, cv = document.createElement('canvas');
          cv.width = im.width; cv.height = Math.round(HH * sx); cv.getContext('2d').drawImage(im, 0, Y0 * sx, im.width, HH * sx, 0, 0, cv.width, cv.height); IMG['clip_ec-line'] = cv; }
        return f(t, r); }; }; }
  { const c0 = DP.cancel; DP.cancel = (o) => c0({ ...o, join: o.join || '1 click' }); }   // the join box is narrow in a short: "Join in one click" ran out of it
  { const text0 = DP.text; DP.text = (t, key, def, x, y, size, o = {}) => text0(t, key, def, x, y, size, o.ls == null ? { ...o, ls: -0.012 } : o); }   // the board fonts are tighter than Helvetica: less negative tracking
  // sh09: the countdown (Young Serif) is drawn the way shorts-09 uses it: yellow on dark olive (the board item), not dark on yellow
  if (LK_ID === 'sh09') { const tm0 = DP.timer; DP.timer = (o) => { const f = tm0(o); return (t, r) => { const k = ['pink', 'ink', 'white'].map(n => DP[n]);
      DP.pink = '#3A3A33'; DP.ink = '#F4E85C'; DP.white = '#3A3A33'; try { return f(t, r); } finally { [DP.pink, DP.ink, DP.white] = k; } }; }; }
  // sh12: Big Shoulders the way design-02 uses it, black on orange (the 642 stat and the 399 dots)
  if (LK_ID === 'sh12') { const st0 = DP.stat; DP.stat = (o) => st0({ ...o, ground: 'dpPink' });
    const dt0 = DP.dots; DP.dots = (o) => { const f = dt0(o); return (t, r) => { const k = [DP.night, DP.pink]; DP.night = '#E99A3F'; DP.pink = '#000000'; try { return f(t, r); } finally { [DP.night, DP.pink] = k; } }; }; }
  if (LK_ID === 'sh07') { const ck0 = DP.check; DP.check = (o) => ck0(o && /\[Untick\]/.test(o.s || '') ? { ...o, s: 'Untick this box if you\n[don\u2019t] want to stop\nreceiving emails.', hits: (o.hits || []).slice(1, 2) } : o); }
  if (LK_ID === 'sh02') { const pp0 = DP.popup; DP.popup = (o) => pp0({ ...o, blockAt: 1e9 }); }
  if (LK_ID === 'sh04') { const m0 = mono, w0 = monoW; mono = function (s_, ...a_) { if (s_ === 'PRODUCT PAGE') return; return m0(s_, ...a_); }; monoW = function (s_, ...a_) { return s_ === 'PRODUCT PAGE' ? -48 : w0(s_, ...a_); }; }
  DP.capFmt = DP.LK_CAP;
  DP.titleFmt = DP.LK_LABEL;
  DP.coverDraw = DP.LK_COVER;
}

/* ---------- the teaser (16:9 / 1:1 / 4:5): font board pair-02 (Design 351: Archivo 62 % width 900 + DM Mono), colours combo-06
 * (Design 351: paper #E6DFCD / ink #101114 / yellow #E5C63A / blue #173DAF). Her captions are the studio's ("Helvetica Neue" = Archivo
 * here, registered above). The ending stays her own design. ---------- */
if (LK_ID === 'teaser') {
  const T6 = { paper: '#E6DFCD', ink: '#101114', acc: '#E5C63A', blue: '#173DAF' };
  DP.pink = T6.paper; DP.ink = T6.ink; DP.mid = '#6E6B65'; DP.paper = T6.paper;   // pair-02 is ink on paper: the teaser's pink grounds become paper
  Object.assign(G.dpPink, { bg: T6.paper, fg: T6.ink, acc: T6.ink, panel: T6.paper }); Object.assign(G.dpInk, { bg: T6.ink, acc: T6.paper, mid: '#B9B3A6' });
  if (typeof PLATE !== 'undefined') { PLATE.dp = [T6.paper, T6.ink, T6.ink]; PLATE.dpInk = [T6.ink, DP.white, T6.acc]; }
  if (TH.look) Object.assign(TH.look, { acc: T6.ink, accOnDark: T6.paper });
  F.disp = (s, w = 700) => LF.a62(s, w >= 600 ? 900 : 600); F.body = (s, w = 400) => LF.arch(s, w >= 600 ? 700 : w <= 300 ? 300 : 500);
  F.mono = (s) => LF.mono(s); F.serif = (s) => LF.arch(s, 300);
  if (typeof LS !== 'undefined') { LS.disp = -0.005; LS.body = 0; LS.serif = 0; }
}
/* the teaser's 16:9 captions (her three-part style, studio drawCaptions3) set the way pair-02 is used: Archivo in ink #101114 on paper
 * #E6DFCD bands (the studio draws them with no band; this project-side copy only adds the band, the colours and the font) */
if (LK_ID === 'teaser' && typeof drawCaptions3 === 'function') {
  // eslint-disable-next-line no-global-assign
  drawCaptions3 = function (t, c, opt = {}) {
    const st = capSliderInfo(); const size = clamp(Math.round(st.size), 30, CAPSIZE.max16), yb = clamp(st.y, CAPSIZE.y16[0], 1040);
    const fz = (z) => `500 ${z}px LKArch`; const ce = (EDIT.data.cap16 || {})[c.i]; const text = ce != null ? ce.replace(/\n/g, ' ') : c.text;
    let words = c.ws.map(w => ({ s: w.s, t: w.t }));
    if (ce != null) { const parts = text.split(/\s+/).filter(Boolean); words = parts.map((s_, i) => ({ s: s_, t: c.ws[Math.min(c.ws.length - 1, Math.floor(i * c.ws.length / parts.length))].t })); }
    const groups = capSplit3(words); const cam = camAt(t); let x0 = W * CAP3.marginL, x1 = W * (1 - CAP3.marginR);
    if (cam.boxed) { const b = cam.box; if (b[2] >= W * 0.4 && b[3] >= H * 0.5) { x0 = b[0] + b[2] * 0.07; x1 = b[0] + b[2] * 0.93; } }
    const strs = groups.map(g => g.map(w => w.s).join(' ')); let z = size; const gap = 60, ls = () => z * -0.005;
    const widths = () => strs.map(s_ => tw(s_, fz(z), ls()));
    while (z > 34 && widths().reduce((a, b) => a + b, 0) + gap * (strs.length - 1) + strs.length * z * 0.6 > x1 - x0) z -= 2;
    const ww = widths(); const pd = z * 0.3; const xa = x0 + pd, xb = x1 - pd;
    const lefts = strs.length === 3 ? [xa, clamp((xa + xb) / 2 - ww[1] / 2, xa + ww[0] + gap + 2 * pd, xb - ww[2] - gap - 2 * pd - ww[1]), xb - ww[2]] : strs.length === 2 ? [xa, xb - ww[1]] : [xa];
    let bx0 = Infinity, bx1 = -Infinity;
    ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
    groups.forEach((g, i) => { if (t < g[0].t - 0.06) return; const w = ww[i], lx = lefts[i]; bx0 = Math.min(bx0, lx - pd); bx1 = Math.max(bx1, lx + w + pd);
      const p = clamp((t - g[0].t + 0.06) / 0.12); ctx.globalAlpha = p; rect(lx - pd, yb - z * 0.92, w + pd * 2, z * 1.3, '#E6DFCD'); _txt(strs[i], lx, yb, fz(z), '#101114', 'left', 'alphabetic', ls()); ctx.globalAlpha = 1; });
    ctx.restore();
    if (bx1 > bx0) regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, yb - z, bx1 - bx0, z * 1.3, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true });
  };
}

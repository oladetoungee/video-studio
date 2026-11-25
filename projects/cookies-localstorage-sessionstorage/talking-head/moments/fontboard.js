/* cookies: FONT-BOARD pass for the shorts + teaser (2026-11-13, projects/FULL-KIT-BRIEF-2026-11-12.md; her rule 2026-11-12: "Only use
 * fonts from our boards", used THE WAY they were used on the board item: same font + text colour + ground; readability wins).
 * Fonts + colours from inspiration/boards/fonts/board.json (studio /ideas/boards/fonts/, colours sampled by studio/tools/fontboard.mjs);
 * ids = "fonts" / "colours" in talking-head.json. None of these looks is used by edge-cases / dark-patterns / cheapest-countries
 * shorts (no line-pattern grounds, no dark stat cards, no shared caption style). Helvetica Neue (not on the board) is gone from
 * the shorts + teaser: graphics inside panels draw in Inter Tight (Font 58 thumbs-03, Inter Tight Medium + design-34 Inter Tight
 * Bold), DM Mono stays for code + small labels (design-29). The full edit is NOT touched (CK.FB stays null there).
 * Per short: A = titles, posters, cover line · B = captions · M = small lines (tag, 2nd title line) · box = M's title box.
 * Loaded last in manifest "common". */
'use strict';
CK.FB = null;
{
  const K = FOOT.m && FOOT.m.kind; const id = FOOT.m && FOOT.m.id;
  if (K === 'short' || K === 'teaser') {
    const FILES = [['FBIT', 'InterTightMedium.ttf', '500'], ['FBIT', 'InterTightSemiBold.ttf', '600'], ['FBIT', 'InterTightBold.ttf', '700'], ['FBIT', 'InterTightExtraBold.ttf', '800'], ['FBIT', 'InterTightBlack.ttf', '900'], ['FBIT', 'InterTightLight.ttf', '300'],
      ['FBYoung', 'YoungSerif-Regular.ttf', '400'], ['FBBrush', 'CaveatBrush-Regular.ttf', '400'], ['FBJB', 'JBMono-800.ttf', '800'], ['FBJB', 'JBMono-500.ttf', '500'],
      ['FBInstr', 'InstrumentSerif-Italic.ttf', '400'], ['FBBagel', 'BagelFatOne-Regular.ttf', '400'], ['FBMon', 'Montserrat-Variable.ttf', '100 900'],
      ['FBGS', 'GeneralSans-VariableItalic.ttf', '200 700'], ['FBOsw', 'Oswald-Variable.ttf', '200 700'], ['FBLond', 'LondrinaSolid-Black.ttf', '900'], ['FBLib', 'LibreBaskerville[wght].ttf', '400 700'],
      ['Inter Tight', 'InterTightSemiBold.ttf', '600'], ['Inter Tight', 'InterTightBold.ttf', '700']];   // devicePhone's status bar asks for "Inter Tight" by name
    const loads = FILES.map(([fam, f, w]) => { const ff = new FontFace(fam, `url(/library/fonts/${encodeURIComponent(f)})`, { weight: w, style: fam === 'FBGS' || fam === 'FBInstr' ? 'italic' : 'normal' }); document.fonts.add(ff); return ff.load().catch(e => console.error('FB-FONT ' + f, e)); });
    const r0 = TH.ready; TH.ready = async () => { await Promise.all(loads); return r0(); };
    const IT = (w) => (z) => `${w} ${z}px FBIT`;
    const f = { young: () => (z) => `400 ${z}px FBYoung`, jb: (w) => (z) => `${w} ${z}px FBJB`, bag: () => (z) => `400 ${z}px FBBagel`, mon: (w) => (z) => `${w} ${z}px FBMon`,
      gs: (w) => (z) => `italic ${w} ${z}px FBGS`, osw: (w) => (z) => `${w} ${z}px FBOsw`, lond: () => (z) => `900 ${z}px FBLond`, lib: (w) => (z) => `${w} ${z}px FBLib`, instr: () => (z) => `italic 400 ${z}px FBInstr` };
    /* title / key: title + key-word colour over her video · band / bandInk: the format's flat band (D top band, F + G page) and the words on it
     * cover: { bg (photo ground), card (big/frame ground), ink, key, keyBox, keyInk, lineBox (a box behind each line) }
     * poster: { bg, ink } (B poster, J screen, D title flash) · box: M's title box font, boxBg / boxInk · capBox / capBoxInk: K subtitle boxes */
    const LOOK = {
      // Font 47 shorts-13 (Formats 62): Young Serif cream #F4EBD0 on sage #5C6B5A, Caveat Brush yellow #F5D33F as the accent
      sh01: { fonts: ['shorts-13'], colours: 'shorts-13', A: f.young(), B: f.young(), M: f.young(), band: '#5C6B5A', title: '#F4EBD0', key: '#F5D33F', ls: -0.02, capK: 0.95,
        cover: { bg: '#5C6B5A', ink: '#F4EBD0', key: '#F5D33F' }, poster: { bg: '#5C6B5A', ink: '#F4EBD0' } },
      // Font 63 thumbs-08 (Thumbnails 65): JetBrains Mono ExtraBold #111111 on yellow #F6D83B
      sh02: { fonts: ['thumbs-08'], colours: 'thumbs-08', A: f.jb(800), B: f.jb(800), M: f.jb(500), ls: -0.03, capK: 0.86, title: '#111111', key: '#111111', band: '#F6D83B', bandInk: '#111111', conc: '#F6D83B',
        cover: { card: '#F6D83B', ink: '#111111', keyBox: '#111111', keyInk: '#F6D83B' }, poster: { bg: '#F6D83B', ink: '#111111' } },
      // Font 72 thumbs-17 (Thumbnails 152): Inter Tight 500 white + Instrument Serif italic on warm black #2B2420
      sh03: { fonts: ['thumbs-17'], colours: 'thumbs-17', A: IT(500), B: IT(500), M: f.instr(), keyFont: f.instr(), title: '#FFFFFF', key: '#FFFFFF', band: '#2B2420', dim: 'rgba(255,255,255,0.42)',
        cover: { bg: '#2B2420', ink: '#FFFFFF', key: '#FFFFFF', keyFont: f.instr() } },
      // Font 14 design-14 (Design 361, combo-03): Bagel Fat One cream #EDE6D9 on red #DC3E2B
      sh04: { fonts: ['design-14'], colours: 'combo-03', A: f.bag(), B: f.bag(), M: f.bag(), up: true, ls: 0, capK: 0.92, title: '#EDE6D9', key: '#EDE6D9',
        cover: { card: '#DC3E2B', ink: '#EDE6D9', key: '#EDE6D9' }, poster: { bg: '#DC3E2B', ink: '#EDE6D9' } },
      // Font 61 thumbs-06 (Thumbnails 58): Montserrat Black, yellow #F6D23A on #2B2B2B
      sh05: { fonts: ['thumbs-06'], colours: 'thumbs-06', A: f.mon(900), B: f.mon(800), M: f.mon(800), up: true, capRaw: true, capCol: '#F6D23A', ls: -0.02, title: '#FFFFFF', key: '#FFFFFF',
        cover: { bg: '#2B2B2B', ink: '#FFFFFF', key: '#F6D23A' } },
      // Font 27 design-27 (Design 355): General Sans Semibold Italic, blue #2C3FB0 on warm grey #D9D5CB
      sh06: { fonts: ['design-27'], colours: 'design-27', A: f.gs(600), B: f.gs(600), M: f.gs(600), capK: 1.3, conc: '#D9D5CB', box: f.gs(600), boxBg: '#D9D5CB', boxInk: '#2C3FB0', ls: -0.02, title: '#FFFFFF', key: '#FFFFFF',
        cover: { card: '#D9D5CB', ink: '#2C3FB0', key: '#111111' } },
      // Font 50 shorts-16 (Formats 68): Oswald caps white, one word boxed red #E0261B (ground #8E8A85)
      sh07: { fonts: ['shorts-16'], colours: 'shorts-16', A: f.osw(600), B: f.osw(600), M: f.osw(500), up: true, capUp: true, ls: 0, capK: 1.08, capDy: 110, title: '#FFFFFF', key: '#FFFFFF', keyBox: '#E0261B',
        cover: { bg: '#8E8A85', ink: '#FFFFFF', keyBox: '#E0261B', keyInk: '#FFFFFF' } },
      // Font 17 design-17 (Design 399): Libre Baskerville Bold, ink #111111 on light grey #E8E7E5 (accent #555555); 2026-11-13 critic: not a
      // second condensed caps next to sh07, not a second red tile next to sh04, dark words only on a light ground
      sh08: { fonts: ['design-17'], colours: 'design-17', A: f.lib(700), B: f.lib(700), M: f.lib(400), ls: -0.02, capK: 0.82, title: '#111111', key: '#111111', band: '#E8E7E5', bandInk: '#111111', dim: 'rgba(17,17,17,0.32)',
        cover: { card: '#E8E7E5', ink: '#111111', key: '#555555' } },
      // Font 74 thumbs-19 (Thumbnails 174): Inter Tight Medium, very tight, #111111 on paper #EFEDE6 (the subtitle boxes = that pair)
      sh09: { fonts: ['thumbs-19'], colours: 'thumbs-19', A: IT(500), B: IT(500), M: IT(500), ls: -0.04, capK: 1.18, title: '#FFFFFF', key: '#111111', conc: '#EFEDE6', capBox: '#EFEDE6', capBoxInk: '#111111', tagBox: '#EFEDE6',
        cover: { bg: '#111111', ink: '#111111', key: '#111111', lineBox: '#EFEDE6' } },
      // teaser: Font 32 design-32 Oswald Bold black on orange #E57245 (Design 405) for the title cards + design-29 DM Mono labels
      teaser: { fonts: ['design-32', 'design-29'], colours: 'design-32', A: f.osw(700), B: IT(600), M: (z) => `500 ${z}px "DM Mono"`, up: true, card: '#E57245', cardInk: '#000000' },
    };
    CK.FB = LOOK[id] || null;
    // graphics inside panels (ck.js / house.js): Inter Tight (board) instead of Helvetica Neue; DM Mono stays (design-29)
    F.disp = (s, w = 700) => `${w >= 500 ? 700 : 300} ${s}px FBIT`; F.light = (s) => `300 ${s}px FBIT`;
    F.body = (s, w = 400) => `${w >= 650 ? 700 : w >= 450 ? 500 : 500} ${s}px FBIT`; F.serif = (s) => `300 ${s}px FBIT`;
    if (TH.look) TH.look.disp = (s) => `700 ${s}px FBIT`;
    if (CK.FB && CK.FB.band && TH.look) TH.look.band = CK.FB.band;
    // conc: the light ground the crash-test graphics paint (CK.conc, G.ckLab) in this short's board colour (sh02 yellow, sh06 warm grey, sh09 paper)
    if (CK.FB && CK.FB.conc) { CK.conc = CK.FB.conc; G.ckLab.bg = CK.FB.conc; }
  }
}

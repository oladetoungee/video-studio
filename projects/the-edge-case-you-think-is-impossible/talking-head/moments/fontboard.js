/* edge cases: FONT-BOARD pass for the shorts + teaser (her rule 2026-11-12: "Only use fonts from our boards", used THE WAY they
 * were used on the board item: same font + text colour + ground). Fonts and colours come from inspiration/boards/fonts/board.json
 * (studio /ideas/boards/fonts/); ids below = "fonts" / "colours" in talking-head.json. Wording, layout, speech, mix and her edits
 * are unchanged; DM Serif Display (not on the board) is gone from every short and the teaser. The full edit is NOT touched
 * (EF.FB stays null there). Graphics inside the panels keep the video's lime / ink field, which is exactly the board's
 * Design 394 pair (combo-02: Inter Tight Black, ground #D9F44F, ink #070804) + DM Mono (design-29) for code and small labels.
 * Per short: A = cover line / titles / posters, B = captions (+ small lines). Loaded last in manifest "common". */
'use strict';
EF.FB = null;
{
  const K = FOOT.m && FOOT.m.kind; const id = FOOT.m && FOOT.m.id;
  if (K === 'short' || K === 'teaser') {
    const FILES = [['FBIT', 'InterTightMedium.ttf', '500'], ['FBIT', 'InterTightSemiBold.ttf', '600'], ['FBIT', 'InterTightBold.ttf', '700'], ['FBIT', 'InterTightExtraBold.ttf', '800'], ['FBIT', 'InterTightBlack.ttf', '900'],
      ['FBGloock', 'Gloock-Regular.ttf', '400'], ['FBMon', 'Montserrat-Variable.ttf', '100 900'], ['FBSix', 'SixCaps.ttf', '400'], ['FBPop', 'Poppins-Bold.ttf', '700'], ['FBPop', 'Poppins-SemiBold.ttf', '600'],
      ['FBTik', 'TikTokSans[opsz,slnt,wdth,wght].ttf', '300 900'], ['FBAnton', 'Anton-Regular.ttf', '400'], ['FBLib', 'LibreBaskerville[wght].ttf', '400 700'], ['FBNews', 'Newsreader.ttf', '200 800'],
      ['FBBig', 'BigShouldersDisplay[wght].ttf', '100 900'], ['FBBagel', 'BagelFatOne-Regular.ttf', '400'],
      ['Inter Tight', 'InterTightSemiBold.ttf', '600'], ['Inter Tight', 'InterTightBold.ttf', '700']];   // the phone status bar (house.js devicePhone) asks for "Inter Tight" by name
    const loads = FILES.map(([fam, f, w]) => { const ff = new FontFace(fam, `url(/library/fonts/${encodeURIComponent(f)})`, { weight: w }); document.fonts.add(ff); return ff.load().catch(e => console.error('FB-FONT ' + f, e)); });
    const r0 = TH.ready; TH.ready = async () => { await Promise.all(loads); return r0(); };
    const IT = (w) => (z) => `${w} ${z}px FBIT`;
    const f = { it: IT, gl: () => (z) => `400 ${z}px FBGloock`, mon: (w) => (z) => `${w} ${z}px FBMon`, six: () => (z) => `400 ${z}px FBSix`, pop: (w) => (z) => `${w} ${z}px FBPop`,
      tik: (w) => (z) => `${w} ${z}px FBTik`, ant: () => (z) => `400 ${z}px FBAnton`, lib: (w) => (z) => `${w} ${z}px FBLib`, news: (w) => (z) => `${w} ${z}px FBNews`, big: (w) => (z) => `${w} ${z}px FBBig`, bag: () => (z) => `400 ${z}px FBBagel` };
    /* A: titles, posters, cover line · B: captions (all caption kinds) · M: small mono-style lines (tag, 2nd title line)
     * title / key: title colour + key-word colour over her video · cover: { bg (photo cover ground), card (card ground), ink (line), key, keyBox, keyInk }
     * poster: { bg, ink } (J screen, B/C posters, D title flash) · up: caps for A */
    const LOOK = {
      sh01: { fonts: ['design-18', 'shorts-01'], colours: 'combo-08', A: f.gl(), B: f.mon(800), M: f.mon(700), capUp: true, title: '#FFFFFF', key: '#FFE135',
        cover: { bg: '#010101', ink: '#B8331F', key: '#B8331F' } },                                                                   // Gloock on Design 391 (rust red on black) + Montserrat ExtraBold caps, yellow key word (Formats 2)
      sh02: { fonts: ['combo-02', 'pair-03'], colours: 'combo-02', A: IT(900), B: IT(600), M: IT(600), title: '#FFFFFF', key: '#D9F44F',
        cover: { card: '#D9F44F', ink: '#070804', keyBox: '#070804', keyInk: '#D9F44F' } },                                             // Inter Tight Black on Design 394 lime / ink; white on black in the letterbox (Design 20)
      sh03: { fonts: ['design-01', 'pair-04'], colours: 'design-01', A: f.six(), B: IT(600), M: IT(600), zK: 1.7, up: true, ls: 0, title: '#FFFFFF', key: '#CB482E',
        cover: { card: '#E9E0CC', ink: '#CB482E', key: '#CB482E' }, poster: { bg: '#E9E0CC', ink: '#CB482E' } },                      // Six Caps rust on cream (Design 377) + Inter Tight (pair 04)
      sh04: { fonts: ['thumbs-10'], colours: 'thumbs-10', A: f.pop(700), B: f.pop(700), M: f.pop(600), title: '#FFFFFF', key: '#E5342B',
        cover: { bg: '#2A2522', ink: '#FFFFFF', key: '#E5342B' }, poster: { bg: '#2A2522', ink: '#FFFFFF' } },                          // Poppins Bold white, red key word, on #2A2522 (Thumbnails 84)
      sh05: { fonts: ['thumbs-09', 'shorts-05'], colours: 'thumbs-09', A: IT(900), B: IT(800), M: IT(700), box: f.tik(800), up: true, title: '#FFFFFF', key: '#E2231A',
        cover: { card: '#111111', ink: '#FFFFFF', keyBox: '#E2231A', keyInk: '#FFFFFF' } },                                             // Inter Tight Black white + red box on black (Thumbnails 68); TikTok Sans in the white box (Formats 24)
      sh07: { fonts: ['thumbs-16', 'shorts-21'], colours: 'thumbs-16', A: f.ant(), B: f.lib(400), M: f.lib(400), up: true, ls: 0, title: '#FFFFFF', key: '#FFFFFF', dim: 'rgba(255,255,255,0.62)',
        cover: { bg: '#222222', ink: '#FFFFFF', keyBox: '#D7262B', keyInk: '#FFFFFF' } },                                             // Anton white + red box on #222 (Thumbnails 113); Libre Baskerville white captions (Formats 45)
      sh08: { fonts: ['thumbs-18', 'shorts-11'], colours: 'thumbs-18', A: f.mon(800), B: f.news(500), M: f.mon(800), title: '#FFFFFF', key: '#F6C343',
        cover: { bg: '#3A3D3A', ink: '#FFFFFF', key: '#F6C343' } },                                                                   // Montserrat ExtraBold white + yellow line (Thumbnails 162); Newsreader white on black boxes (Formats 52)
      sh09: { fonts: ['thumbs-02'], colours: 'thumbs-02', A: IT(700), B: IT(700), M: IT(600), title: '#FFFFFF', key: '#F7D51D', dim: 'rgba(255,255,255,0.62)',
        cover: { bg: '#1C1C1C', ink: '#FFFFFF', keyBox: '#F7D51D', keyInk: '#111111' } },                                             // Inter Tight Bold white + yellow highlight (Thumbnails 21)
      sh10: { fonts: ['design-02'], colours: 'combo-07', A: f.big(900), B: f.big(700), M: f.big(700), capK: 1.3, zK: 1.25, up: true, ls: 0, title: '#FFFFFF', key: '#E99A3F',
        cover: { card: '#E99A3F', ink: '#000000', keyBox: '#000000', keyInk: '#E99A3F' }, poster: { bg: '#E99A3F', ink: '#000000' } },  // Big Shoulders Display black on orange (Design 397)
      sh11: { fonts: ['design-15', 'pair-14'], colours: 'combo-04', A: f.bag(), B: IT(700), M: IT(600), title: '#DFB0AE', key: '#DDDADC', titleLs: 0,
        cover: { bg: '#0A0A0A', ink: '#DFB0AE', key: '#DDDADC' } },                                                                   // Bagel Fat One pink on black (Design 371) + Inter Tight (pair 14)
      teaser: { fonts: ['combo-02', 'design-29'], colours: 'combo-02', A: IT(900), B: (z) => `500 ${z}px "DM Mono"`, M: (z) => `500 ${z}px "DM Mono"` },
    };
    EF.FB = LOOK[id] || null;
    // graphics inside panels (ef.js / house.js / teaser cards + keywords): Inter Tight on the lime / ink field (combo-02); DM Mono stays (design-29)
    const disp = IT(800); F.disp = (s) => disp(s); F.serif = (s) => disp(s);
    if (TH.look) TH.look.disp = (s) => `900 ${s}px FBIT`;
    if (K === 'teaser') F.disp = (s) => `900 ${s}px FBIT`;
  }
}

/* doomscrolling: FONT-BOARD pass for the shorts + teaser (FULL-KIT brief 2026-11-12; her rules "Only use fonts from our boards",
 * used THE WAY they were used on the board item: same font + text colour + ground; readability wins). Fonts and colours come from
 * inspiration/boards/fonts/board.json (studio /ideas/boards/fonts/); ids = "fonts" / "colours" in talking-head.json. League Gothic
 * (not on the board) is gone from every short and the teaser: graphics inside the panels keep the video's butter / ink and use
 * Big Shoulders Display (design-02) for numbers / headlines, Inter Tight (shorts-15) + DM Mono (design-29). The full edit is NOT touched.
 * Per short: A = cover line / titles / posters, B = captions, M = small lines, box = the M title box; colours: title / key / capInk,
 * capBox {bg, ink} = captions on boxes of the board item's ground, cover {bg | card, ink, key, keyBox, keyInk}, poster {bg, ink},
 * low / up = lowercase / caps. Loaded last in manifest "common" (after formats.js). */
'use strict';
BG.FB = null;
{
  const K = FOOT.m && FOOT.m.kind; const id = FOOT.m && FOOT.m.id;
  if (K === 'short' || K === 'teaser') {
    const FILES = [['FBIT', 'InterTightMedium.ttf', '500'], ['FBIT', 'InterTightSemiBold.ttf', '600'], ['FBIT', 'InterTightBold.ttf', '700'], ['FBIT', 'InterTightExtraBold.ttf', '800'], ['FBIT', 'InterTightBlack.ttf', '900'],
      ['FBYoung', 'YoungSerif-Regular.ttf', '400'], ['FBMon', 'Montserrat-Variable.ttf', '100 900'], ['FBInstr', 'InstrumentSerif-Italic.ttf', '400', 'italic'],
      ['FBLib', 'LibreBaskerville[wght].ttf', '400 700'], ['FBNews', 'Newsreader.ttf', '200 800'], ['FBGenI', 'GeneralSans-VariableItalic.ttf', '200 700', 'italic'],
      ['FBBagel', 'BagelFatOne-Regular.ttf', '400'], ['FBCavB', 'CaveatBrush-Regular.ttf', '400'], ['FBShri', 'Shrikhand-Regular.ttf', '400'],
      ['FBBod', 'BodoniModa[opsz,wght].ttf', '400 900'], ['FBTik', 'TikTokSans[opsz,slnt,wdth,wght].ttf', '300 900'], ['FBArch', 'Archivo.ttf', '100 900'],
      ['FBPop', 'Poppins-Bold.ttf', '700'], ['FBPop', 'Poppins-SemiBold.ttf', '600'], ['FBBric', 'BricolageGrotesque.ttf', '200 800'], ['FBDMM', 'DMMono-Medium.ttf', '500'], ['FBBig', 'BigShouldersDisplay[wght].ttf', '100 900'],
      ['Inter Tight', 'InterTightSemiBold.ttf', '600'], ['Inter Tight', 'InterTightBold.ttf', '700'], ['Inter Tight', 'InterTightExtraBold.ttf', '800']];   // devicePhone + bingo panels ask for "Inter Tight" by name
    if (K === 'teaser') FILES.push(['Helvetica Neue', 'BricolageGrotesque.ttf', '200 800']);   // the studio draws the teaser's 16:9 captions by this name: here it is Bricolage (pair-16)
    const loads = FILES.map(([fam, f, w, st]) => { const ff = new FontFace(fam, `url(/library/fonts/${encodeURIComponent(f)})`, { weight: w, style: st || 'normal' }); document.fonts.add(ff); return ff.load().catch(e => console.error('FB-FONT ' + f, e)); });
    const r0 = TH.ready; TH.ready = async () => { await Promise.all(loads); return r0(); };
    const fam = (name, w, st) => (z) => `${st ? st + ' ' : ''}${w} ${z}px ${name}`;
    const IT = (w) => fam('FBIT', w);
    const LOOK = {
      // I pop-up pictures · Formats 16 / 66 / 62 · Young Serif cream on sage + the yellow of Formats 62 (shorts-13, pair-11)
      sh01: { fonts: ['shorts-13', 'pair-11'], colours: 'shorts-13', capK: 1.15, capBox: { bg: '#5C6B5A', ink: '#F4EBD0' }, A: fam('FBYoung', 400), B: fam('FBYoung', 400), M: fam('FBYoung', 400), ls: 0,
        title: '#F4EBD0', key: '#E9CA41', capInk: '#F4EBD0', cover: { bg: '#5C6B5A', ink: '#F4EBD0', key: '#E9CA41' }, poster: { bg: '#5C6B5A', ink: '#F4EBD0' } },
      // D captions on top + title flash · Formats 36 / 37 / 2 · Montserrat ExtraBold white on deep green (shorts-08, pair-10)
      sh02: { fonts: ['shorts-08', 'pair-10'], colours: 'shorts-08', capK: 1.2, A: fam('FBMon', 800), B: fam('FBMon', 700), M: fam('FBInstr', 400, 'italic'),
        title: '#FFFFFF', key: '#FFFFFF', cover: { card: '#1F3A2C', ink: '#FFFFFF', key: '#FFFFFF' }, poster: { bg: '#1F3A2C', ink: '#FFFFFF' }, capBox: { bg: '#1F3A2C', ink: '#FFFFFF' } },
      // H full frame · Formats 45 / 52 / 58 · Libre Baskerville black on light grey, Newsreader captions on grey boxes (pair-05, design-17)
      sh03: { fonts: ['pair-05', 'design-17'], colours: 'pair-05', capK: 1.25, A: fam('FBLib', 700), B: fam('FBNews', 500), M: fam('FBNews', 500), ls: -0.01,
        title: '#111111', key: '#111111', capBox: { bg: '#E8E7E5', ink: '#111111' }, cover: { card: '#E8E7E5', ink: '#111111', key: '#111111' }, poster: { bg: '#E8E7E5', ink: '#111111' } },
      // K film subtitles · Formats 52 / 67 / 48 · Newsreader white on black boxes over olive (shorts-11)
      sh04: { fonts: ['shorts-11'], colours: 'shorts-11', capK: 1.6, A: fam('FBNews', 500), B: fam('FBNews', 500), M: fam('FBNews', 500), ls: 0, capK: 1.15,
        title: '#FFFFFF', key: '#FFFFFF', cover: { bg: '#6E6A4E', ink: '#FFFFFF', keyBox: '#111111', keyInk: '#FFFFFF' } },
      // H full frame · Formats 57 / 60 / 4 · General Sans Semibold Italic blue on warm grey (design-27)
      sh05: { fonts: ['design-27'], colours: 'design-27', capK: 1.25, A: fam('FBGenI', 600, 'italic'), B: fam('FBGenI', 600, 'italic'), M: fam('FBGenI', 600, 'italic'), low: true,
        title: '#2C3FB0', key: '#2C3FB0', capBox: { bg: '#D9D5CB', ink: '#2C3FB0' }, cover: { card: '#D9D5CB', ink: '#2C3FB0', key: '#2C3FB0' } },
      // B split poster · Formats 5 / 47 / 32 · Bagel Fat One cream on red (design-14) + Inter Tight (pair-14)
      sh06: { fonts: ['design-14', 'pair-14'], colours: 'design-14', capK: 1.5, A: fam('FBBagel', 400), B: IT(700), M: IT(600), up: true, ls: 0,
        title: '#EDE6D9', key: '#EDE6D9', capBox: { bg: '#DC3E2B', ink: '#EDE6D9' }, cover: { bg: '#DC3E2B', ink: '#EDE6D9', key: '#EDE6D9' }, poster: { bg: '#DC3E2B', ink: '#EDE6D9' } },
      // J slide behind her · Formats 38 / 64 / 65 · Caveat Brush dark green on olive-lime (design-19) + Inter Tight (pair-08)
      sh07: { fonts: ['design-19', 'pair-08'], colours: 'design-19', capK: 1.05, capBox: { bg: '#C4BF3B', ink: '#18480E' }, A: fam('FBCavB', 400), B: IT(800), M: IT(600), zK: 1.15, ls: 0,
        title: '#18480E', key: '#C4BF3B', cover: { card: '#C4BF3B', ink: '#18480E', key: '#18480E' }, poster: { bg: '#C4BF3B', ink: '#18480E' } },
      // C cut-out + the named thing huge behind her · Formats 3 / 26 / 56 · Shrikhand pink on charcoal (shorts-02)
      sh08: { fonts: ['shorts-02'], colours: 'shorts-02', capK: 1.2, A: fam('FBShri', 400), B: fam('FBShri', 400), M: fam('FBShri', 400), ls: 0,
        title: '#F7B6D2', key: '#F7B6D2', capInk: '#FFFFFF', cover: { bg: '#3A3936', card: '#3A3936', ink: '#F7B6D2', key: '#FFFFFF' }, poster: { bg: '#3A3936', ink: '#F7B6D2' } },
      // G letterbox · Formats 12 / 40 / 48 · Bodoni Moda caps + Instrument Serif italic, gold on olive (pair-13, thumbs-07)
      sh09: { fonts: ['pair-13', 'thumbs-07'], colours: 'pair-13', capK: 1.25, noLit: true, A: fam('FBBod', 700), B: fam('FBBod', 600), M: fam('FBInstr', 400, 'italic'), up: true, ls: 0.04, capK: 1.25,
        title: '#E0B04A', key: '#E0B04A', capInk: '#F2E6C8', dim: 'rgba(242,230,200,0.72)', cover: { bg: '#4F5A3E', card: '#4F5A3E', ink: '#E0B04A', key: '#F2E6C8' } },
      // M TikTok title box · Formats 24 / 69 / 14 · TikTok Sans in a white box + bold serif captions (shorts-05)
      sh10: { fonts: ['shorts-05'], colours: 'shorts-05', capK: 1.4, capBox: { bg: '#6B6059', ink: '#FFFFFF' }, A: fam('FBTik', 700), B: fam('FBLib', 700), M: fam('FBTik', 600), box: fam('FBTik', 700),
        title: '#FFFFFF', key: '#FFFFFF', cover: { bg: '#6B6059', card: '#6B6059', ink: '#FFFFFF', keyBox: '#FFFFFF', keyInk: '#111111' } },
      // F square + karaoke · Formats 40 / 10 / 34 · Bodoni Moda + Archivo, cream on deep red (pair-15, design-16)
      sh11: { fonts: ['pair-15', 'design-16'], colours: 'pair-15', capK: 1.15, A: fam('FBBod', 600), B: fam('FBArch', 600), M: fam('FBArch', 500), ls: 0,
        title: '#FBF3EC', key: '#FCBFBA', capInk: '#FBF3EC', dim: 'rgba(251,243,236,0.72)', cover: { card: '#990915', ink: '#FBF3EC', key: '#FCBFBA' }, poster: { bg: '#990915', ink: '#FBF3EC' } },
      // A wide · Formats 44 / 22 / 28 · Poppins Bold lowercase white on warm charcoal (thumbs-14)
      sh12: { fonts: ['thumbs-14'], colours: 'thumbs-14', capK: 1.3, A: fam('FBPop', 700), B: fam('FBPop', 600), M: fam('FBPop', 600), low: true, ls: -0.03,
        title: '#FFFFFF', key: '#FFFFFF', capBox: { bg: '#3A3632', ink: '#FFFFFF' }, cover: { bg: '#3A3632', ink: '#FFFFFF', key: '#FFFFFF' } },
      // teaser · Bricolage Grotesque + DM Mono, indigo on pale lemon (pair-16, combo-09)
      teaser: { fonts: ['pair-16', 'combo-09'], colours: 'combo-09', A: fam('FBBric', 800), B: fam('FBBric', 600), M: fam('FBDMM', 500), ink: '#2A1F6E', ground: '#F2F3C4', mid: '#6A63B2' },
    };
    BG.FB = LOOK[id] || null;
    // graphics inside panels (bingo.js / visuals.js / house.js): Big Shoulders Display (design-02, black on orange; condensed like the
    // League Gothic the panels were laid out for, so numbers and words keep their room) + Inter Tight (shorts-15) + DM Mono (design-29)
    F.disp = (s) => `800 ${s}px FBBig`; F.serif = (s) => `700 ${s}px FBIT`; F.body = (s, w = 600) => `${Math.max(500, Math.min(800, Math.round(w / 100) * 100))} ${s}px FBIT`;
    LS.disp = 0;
    if (TH.look) TH.look.disp = (s) => `900 ${s}px FBIT`;
  }
}

/* how-to-read-research-papers: FONT-BOARD pass for the shorts (projects/FULL-KIT-BRIEF-2026-11-12.md; her rules 2026-11-12/13:
 * "Only use fonts from our boards", used THE WAY they were used on the board item: same font + text colour + ground; readability wins).
 * Fonts + colours from inspiration/boards/fonts/board.json (studio /ideas/boards/fonts/); ids below = "fonts" / "colours" in
 * talking-head.json. None of these pairings is used by the last projects' shorts (edge cases, dark patterns, cheapest countries,
 * cookies, doomscrolling, learn-to-code). The graphics inside the panels keep this video's paper / desk look, with Newsreader 600
 * (shorts-11) in place of DM Serif Display (film/scenes/rp.js swaps it in shorts and the teaser only). The full edit is untouched
 * (RF_FB stays null there). Loaded before moments/formats.js (manifest "common"), which reads RF_FB.
 * Per short: A = titles / posters / cover line, B = captions, M = small tag, box = the M title box.
 * Colours: title / key (top title + its key word over her video), cap / capKey (captions over her video), capInk / capInkKey
 * (captions on a coloured band), capBox {bg, ink} (K subtitle boxes), band (F / G / A bands), poster {bg, ink, key} (B / C / J),
 * box {bg, ink} (M), tag {bg, ink} (K), cover {bg (photo ground), card (big / frame ground), ink, key, keyBox, keyInk}. */
'use strict';
var RF_FB = null;
{
  const K = typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind; const id = FOOT && FOOT.m && FOOT.m.id;
  if (K === 'short') {
    const P = '/p/how-to-read-research-papers/talking-head/assets/fonts/';
    const FILES = {
      sh01: [['FBPlay', '/library/fonts/PlayfairDisplayBlackItalic.ttf', { weight: '900', style: 'italic' }], ['FBPlay', '/library/fonts/PlayfairDisplayExtraBoldItalic.ttf', { weight: '800', style: 'italic' }]],
      sh02: [['FBBig', '/library/fonts/BigShouldersDisplay[wght].ttf', { weight: '100 900' }]],
      sh03: [['FBIT', '/library/fonts/InterTightBlack.ttf', { weight: '900' }], ['FBIT', '/library/fonts/InterTightExtraBold.ttf', { weight: '800' }], ['FBIT', '/library/fonts/InterTightBold.ttf', { weight: '700' }]],
      sh04: [['FBArch', '/library/fonts/Archivo.ttf', { weight: '100 900' }]],
      sh05: [['FBBask', '/library/fonts/LibreBaskerville[wght].ttf', { weight: '400 700' }]],
      sh06: [['FBShrik', '/library/fonts/Shrikhand-Regular.ttf', {}]],
      sh07: [['FBOsw', '/library/fonts/Oswald-Variable.ttf', { weight: '200 700' }]],
      sh08: [['FBArch', '/library/fonts/Archivo.ttf', { weight: '100 900' }]],
      sh09: [['FBIT', '/library/fonts/InterTightExtraBold.ttf', { weight: '800' }], ['FBIT', '/library/fonts/InterTightBold.ttf', { weight: '700' }]],
      sh10: [['FBCav', '/library/fonts/CaveatBrush-Regular.ttf', {}]],
      sh11: [['FBA68', P + 'Archivo-w68.ttf', { weight: '100 900' }]],
    }[id] || [];
    const loads = FILES.map(([fam, f, d]) => { const ff = new FontFace(fam, `url(${encodeURI(f)})`, d); document.fonts.add(ff); return ff.load().catch(e => console.error('FB-FONT ' + f, e)); });
    const r0 = TH.ready; TH.ready = async () => { await Promise.all(loads); return r0(); };
    const fnt = (fam, w, it) => (z) => `${it ? 'italic ' : ''}${w} ${z}px ${fam}`;
    const LOOK = {
      // H · Playfair Display Black Italic caps, cream on near-black (Thumbnails 41 "BE YOUR OWN PROFESSOR") · board 36 62 34
      sh01: { A: fnt('FBPlay', 900, 1), B: fnt('FBPlay', 800, 1), up: true, capUp: true, ls: 0.01, cap: '#F0E4CC', capKey: '#FFFFFF',
        cover: { bg: '#2A2A25', ink: '#F0E4CC', key: '#FFFFFF' } },
      // B · Big Shoulders Display, ink on warm grey (Design 396 "MAN MADE BUGS") · board 5 9 47
      sh02: { A: fnt('FBBig', 800), B: fnt('FBBig', 800), up: true, capUp: true, ls: 0, zK: 1.25, capK: 1.25, cap: '#FFFFFF', capKey: '#E0DAD4',
        poster: { bg: '#E0DAD4', ink: '#1E1E1A', key: '#1E1E1A' }, cover: { card: '#E0DAD4', ink: '#1E1E1A', key: '#1E1E1A', keyBox: '#1E1E1A', keyInk: '#E0DAD4' } },
      // M · Inter Tight Black, black on green (Design 270 "the crowd"); the title box in the board's own green · board 69 54 2
      sh03: { A: fnt('FBIT', 900), B: fnt('FBIT', 800), box: fnt('FBIT', 900), ls: -0.02, cap: '#FFFFFF', capKey: '#21F587',
        box9: { bg: '#21F587', ink: '#010000' }, cover: { card: '#21F587', ink: '#010000', key: '#010000', keyBox: '#010000', keyInk: '#21F587' } },
      // H · Archivo Black-weight caps, orange on black, gold accent (Design 395 "NO DEGREE") · board 26 68 20
      sh04: { A: fnt('FBArch', 900), B: fnt('FBArch', 800), up: true, capUp: true, ls: -0.01, cap: '#FFFFFF', capKey: '#E6CD6F',
        cover: { bg: '#000000', ink: '#D2492A', key: '#E6CD6F' } },
      // K · Libre Baskerville, ink on mint, caps label on pink (Thumbnails 106 "Erasmus Mundus") · board 67 39 22
      sh05: { A: fnt('FBBask', 700), B: fnt('FBBask', 400), M: fnt('FBBask', 700), ls: 0, capBox: { bg: '#CFE1DA', ink: '#2B2B2B' }, tag: { bg: '#E6B9E3', ink: '#2B2B2B' },
        cover: { card: '#CFE1DA', ink: '#2B2B2B', key: '#2B2B2B', keyBox: '#E6B9E3', keyInk: '#2B2B2B' } },
      // J · Shrikhand, navy on cream (Design 359 "One small step can change your whole year") · board 64 65 38
      sh06: { A: fnt('FBShrik', 400), B: fnt('FBShrik', 400), ls: 0, capK: 0.9, cap: '#FFFFFF', capKey: '#E6E5D4',
        poster: { bg: '#E6E5D4', ink: '#1E2A5A', key: '#1E2A5A' }, cover: { card: '#E6E5D4', ink: '#1E2A5A', key: '#1E2A5A' } },
      // G · Oswald Bold caps, black on sky blue (Thumbnails 87 "WEB3 EXPLAINED!"): the letterbox bands in the board's blue · board 12 40 47
      sh07: { A: fnt('FBOsw', 700), B: fnt('FBOsw', 600), up: true, capUp: true, ls: 0, zK: 1.15, band: '#2BA8DE', gTitle: '#0C0C0C', gKey: '#0C0C0C',
        capInk: '#0C0C0C', capInkKey: '#0C0C0C', capDim: 'rgba(12,12,12,0.38)', cover: { bg: '#2BA8DE', ink: '#0C0C0C', key: '#0C0C0C', keyBox: '#0C0C0C', keyInk: '#2BA8DE' } },
      // I · Archivo ExtraBold, ink on paper grey + red / gold / blue accents (Design 367 "UNDER PRESSURE") · board 66 16 10
      sh08: { A: fnt('FBArch', 800), B: fnt('FBArch', 800), up: true, capUp: true, ls: -0.01, cap: '#FFFFFF', capKey: '#DBC17A', pop: '#DFDBD0',
        cover: { card: '#DFDBD0', ink: '#161412', key: '#A83627' } },
      // A · Inter Tight ExtraBold, black on red (Design 398 "Be honest on your CV.") · board 42 21 44
      sh09: { A: fnt('FBIT', 800), B: fnt('FBIT', 800), ls: -0.03, band: '#D93C2A', cap: '#FFFFFF', capKey: '#FFFFFF', capInk: '#120C0C', capInkKey: '#120C0C',
        cover: { card: '#D93C2A', ink: '#120C0C', key: '#120C0C', keyBox: '#120C0C', keyInk: '#D93C2A' } },
      // C · Caveat Brush, dark green on olive yellow (Design 362 "Create it!") · board 65 33 63
      sh10: { A: fnt('FBCav', 400), B: fnt('FBCav', 400), ls: 0, zK: 1.1, capK: 1.1, capInk: '#18480E', capInkKey: '#18480E', poster: { bg: '#C2BC38', ink: '#18480E', key: '#18480E' },
        cover: { bg: '#C2BC38', ink: '#18480E', key: '#18480E' } },
      // F · Archivo Medium at 68 % width, brick red on stone (Design 273 "it's not hard, it's just new") · board 57 30 45
      sh11: { A: fnt('FBA68', 600), B: fnt('FBA68', 500), ls: -0.01, zK: 1.15, capK: 1.15, band: '#DAD3C7', title: '#FFFFFF', key: '#FFFFFF',
        capInk: '#C6403A', capInkKey: '#C6403A', capDim: 'rgba(198,64,58,0.35)', cover: { card: '#DAD3C7', ink: '#C6403A', key: '#C6403A' } },
    };
    RF_FB = LOOK[id] || null;
  }
}

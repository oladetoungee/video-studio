# scholarships film + edit: hand-off (FILM agent, 2026-11-02; resume from here)
Look: B "NOW BOARDING" (departures board, split-flap, graphite #1B1D21, letters #F3F0E8, green #2FD27A ONLY = still open, grey =
closed / passed / not open) + C's Pexels city photos per country. Fonts Barlow / Barlow Condensed (film/assets/fonts, loaded by kit.js).

## Voice + words
- `tools/edit_voice.py`: 6 manual cuts (CLEANUP 1-5, cut 1 extended to 125.62 to drop "scratch that"; + 487.45-489.46 "So do the same
  motivation letter", kit Q7) + pause tightening -> `audio/voice_edit.flac` (495.45 s). NOT cut: "Nigerians do get in as well" repeat
  (no clean join), "I don't even pronounce that" (kept, kit lean).
- `build/edit_dtw.json` (whisper DTW) -> `tools/words.py` (FIXES list = names + her words) -> data/words.json, captions.srt.
- Film time = edited voice + 0.3 s intro.

## Film (`/edit/scholarships-for-african-students-in-europe/`), 43 scenes, scenes/kit.js (components), s1.js, s2.js
- Components: flaps(), flapLines(), board(), gate(), pass(), clip() (real page + highlight + source), photo() (Pexels), phraseCard(), correction().
- Real pages: tools/capture.mjs + tools/capture-spec.json -> assets/src + data/clips.json -> tools/clipsjs.py -> scenes/clips.js + film.json images.
- Corrections: `aiss-fix` (AISS opens 2 Dec 2026, closes 2 Feb 2027), `hu-fix` (Federal Scholarship Board -> Department of Scholarship Awards (DSA)).

## Talking-head (`talking-head/`)
- Manifest common = ../film/scenes/clips.js, ../film/scenes/kit.js, moments/common.js (look, SC.* draws, C1 caption override), moments/plan.js (SC_SENT + SC_PLAN shared by full + shorts).
- Moments: full (cuts = the 6 voice cuts), sh01-sh09 (kit section 3 ranges; sh04 also cuts "most applicants" claim, unsourced), teaser (17 bites).
- Outro clips copied to talking-head/assets/outro/ (her FULL VIDEO ON YOUTUBE clips).

## Critic round 1 (film, fresh agent): 6/10 (fit 8, originality 7, craft 5, phone 4)
Fixed after round 1: green only for "still open" (FULLY FUNDED header, NIGERIA ✓, START NOW, UPDATE, page highlights now neutral
#D9D3C4 unless the window is open), rows never show empty tiles before they flip (board status column excepted), mid-flip
endings (three, daad-gate, nl-order, daad-list), "(her words)" note removed, "1-YEAR MASTER'S", Chevening "OCT 2026" (no
uncredited day), "AROUND AUG 2027", nl-city page under the flaps on a plate, pick = one huge centred "2 OR 3", prep line big.
Still open for round 2: dead holds (18 over 4 s: 47.8 routes, 174.8, 285.6, 313.4, 368.7, 439.4...), layout variety (too many
"label + flap rows" screens), 9:16 board density, si-steps as a two-gate track, boarding-pass pair placement.

## 2026-11-03 (after the usage-limit pause)
- Talking-head corrections switched to the engine's real pauses (talking-head.json "pauses": fix-aiss at raw 153.05, fix-dsa at
  raw 355.2, 5 s each); the stop-gap cutaways aiss-fix / hu-fix are gone from moments/plan.js (the FILM keeps its own typed
  correction scenes, the film engine has no pause). sh02 has "pauses": false (its AISS lines are cut).
- Outro: NO outro clip (coordinator: other projects' clips are not generic). Shorts "endCard": false = end on her last word.
- Critic round 1 of edit / short / teaser: 6.5 / 5.5 / 6. Fixed: empty panels (spans start at their content), s36 empty box,
  flap scramble 2-4 glyphs, page crops >= 0.95x (text ~34 px), title clamp, list numbers arrive with their rows, sh04/sh03/sh06
  start on the scholarship's name, sh04 label on two lines, 20 s panel split (si-steps + keyword), teaser: bites cut on breaths,
  one more bite (contact them early), 4 visible joins only (no black / cream frames).
- Review renders: outputs/_review/ (bin after her OK).

## 2026-11-07 final
Re-typed to set 06 (kit.js F.*, common.js captions/edges, plan.js short label, teaser.js); design re-typed by font aliasing.
Film dropped as a deliverable. Pauses fix-aiss / fix-dsa carry the corrections. Open: thumbnails 10 and 17 score low (3-4),
the board/flap rows in panels could be bigger, 9:16 page crops cut words at the window edges.

# learn-to-code: FILM agent hand-off (talking-head, shorts, teaser, film). Resume from here.
Agent: FILM (2026-11-02 night / 11-03), brief `projects/BUILD-BRIEF-2026-11.md`. Her pick: B · You are the reviewer + A's ladder (B colours) for the 4.5% part.
Correction: the 15% is Indeed's (US software postings, late Feb 2025 to June 2026) -> engine "pause her" at raw 41.8.

## Done
- Words: `talking-head/tools/words.py` (whisper t_dtw + caption fixes from corrections.json + kit Q11/13; unclear "some point before
  them start engineer" dropped; a few word times moved onto her voice) -> data/raw_words.json (1468 words).
- Sentences: `film/scenes/rvsent.js` (RV_SENT s0..s81, cut words left out; shared by plan + film).
- Real page crops: `talking-head/tools/clips.py` -> assets/src/*.png + clips.js (RV_CLIPS; '-p' = 9:16 crops).
- Pexels: assets/px/ (payment, pharmacy, laptop, truck, meeting), credits in film/assets/CREDITS.md. Fonts film/assets/fonts (Onest, Martian Mono).
- thsetup done: face track + manifest skeleton.

## Decisions (each one line to undo)
- Cuts in the full edit: CLEANUP restart [16.98, 20.08]; kit Q2 "Senior roles, yeah" [44.82, 46.62]; unclear half-sentence
  [317.82, 318.96] (kit Q12); end at "in this age and time" (out 396.27, kit Q4). Pauses tightened by footedl (kit Q5).
- Captions: "add the human in the loop" (corrections.json; kit Q10 asks her), "that stock app", "2027", "debugging", "they rose about 15%".

## Built (2026-11-03)
- Kit `film/scenes/rvkit.js` (RV.*: sheet, note, stamp, page, ladder, type, skill, form, flow, shelf, photo, full) shared by film + moments.
- `moments/common.js` (look, captions C2 Onest caps + amber word, ink plate over full graphics; shorts title T3 amber / "sheet").
- `moments/plan.js` RV_PLAN (full + shorts; RV.find survives words a tightened pause dropped). full.js, shorts/sh01-08.js.
- Manifest: full (385.9 s + 4.5 s pause = 390.4), sh01-sh08, teaser (13 bites + 3 cards, 95.9 s), top-level pause fix-15 at raw 41.8.
- Film: film.json, scenes/film.js, tools/edit_voice.py (same cuts) + tools/words.py; voice_edit.flac 384.3 s; render.mjs meta OK (78 scenes).
- Review stills: talking-head/build/stills/r1, r2 (bin after checks).
## Next
checks + critic round 1 (full, shorts, teaser, film) -> fixes -> stems (python3 studio/tools/stems.py <slug>) -> soundqa -> STATUS + report.
## 2026-11-03 later
- Film critic round 1: 16:9 5.5, 9:16 4.5. Applied: type scenes are hand-picked headlines of her words (HL() in film.js, 23),
  neighbours merged, grey ground only (ink for 4 punchlines), hard cuts between grey scenes (G.rvGreyB alias, no engine whip on
  every cut), 9:16 content centred in the middle band (RV.band), full-width sheets in 9:16, pages bigger (big number under the page),
  red not amber for "SELL FIRST" / "IF YOU CAN'T DEBUG", skill kicker grey, worth-it holds longer. Film stems built (-14.4 LUFS).
- r2 (talking-head stills + checks) never finished (session stopped): re-run.
## 2026-11-07 evening: "show, don't type" pass (edge-cases model) — DONE
- moments/visuals.js (NEW, manifest "common" after common.js): RV.night(draw) = the same review sheet / flow as a dark code editor
  (colour swap while it draws; shorts keep the light sheet under their top title); RV.capMode = captions decided by the pixels under
  them (ink on a light graphic, a dark band when half over one; common.js RV.capDraw); RV.parts = browser / server / database as
  objects, a request travels and is saved, the three questions are marks (red ?, the database glows, the answer travels back).
- moments/plan.js (old: build/plan.before.js): all 8 keywords dropped; typed cards that re-typed her lines -> her on camera with a
  push/punch ("is there even a point", "the advice I would give", "I recommend it", "debugging means", "how all the parts work",
  "a promise you can hold on to") or a picture ("yes, but not the way…" = a for-loop lesson typed then struck; "way faster with AI"
  = the laptop photo; "the fix AI gives you or the actual problem" = the two fixes as code; "how the web works" + the three
  system-design questions = RV.parts); sheet titles/notes that re-typed her lines dropped; photo labels dropped; Indeed receipts
  keep the big number, no sub-line repeating the screenshot; skill cards without the sub-line; plan list without the 4 repeated
  skills; free-places without "links in the description". Dark: four things, not read, crash, try-catch, read error, which fix,
  less of, your plan, the old way, webhook twice (+ the ink skill cards). read-error = presenter (layout variety).
- teaser.js (old: build/teaser.before.js): same title/sub/label/note removals; crash, try-catch, webhook twice on dark.
- Cut 2 end 46.62 -> 46.38 (it clipped her "So" of "So maybe you are learning…"; silence measured); footedl re-run.
  (film/tools/edit_voice.py still has 46.62: film only, dropped.)
- Text: python3 talking-head/build/textcount.py 6.52 talking-head/build/plan.before.js talking-head/moments/plan.js
  -> 628 -> 312 words (96.3 -> 47.9 / min); without typed code 608 -> 274. What is left is mostly the review sheets' code and
  lists (the look she picked, B · You are the reviewer).
- Checks: composite check full 16x9 + 9x16, sh01-08, teaser 16x9 + 9x16: no text collisions; layout variety pass (split 36 %).
- Sheets: outputs/_review/before16.jpg + after16.jpg (bin after she has looked).
- Open: the caption at ~2:29 reads "it The second skill that matters now more" (two sentences in one caption chunk); she can fix
  it in the editor (caption text) or we split the chunk.
- 2026-11-07 coordinator round: skill cards on off-black (G.rvNight), name in from the cut, entry wash in the card's own ground
  (rvkit RV.full; it flashed grey); captions never start with the last word of the sentence before (common.js RV.fixCaps,
  "it The second skill"); real fix, webhook, pharmacy, free places on dark; pharmacy lines show at once; lists max 3 items, bigger
  type (less-of window 1000 wide). The thin strip at ~3:09 is the first frames of the "make room" slide (her picture moving aside).
## 2026-11-10: shorts in a MIX of formats + covers + drawn end card (rollout brief 2026-11-10) — DONE, self-checked
- moments/formats.js (NEW, last in "common"): LCF.* = dark-patterns' formats.js ported (set 03 Helvetica Neue, amber #F2A900 as the
  accent, G.lcAmb, J wall #262A30); LCF.capFmt checks RV.capMode (ink on light graphics / amber, dark band when mixed); LCF.capsOn
  remembers SHOW.captions (RV.post switches it off while TH.over runs). plan.js: `FX = LCF.fmtInstall(...)` before the short block,
  keywords off in format shorts, `FX.restore()` at the end. Old: build/plan.before-formats.js, common.before-formats.js,
  talking-head.before-formats.json.
- Manifest: fmt/frame9 per short (sh01 I fill · sh02 H fill · sh03 J (poster "Reading code") · sh04 B 4x5 · sh05 M fill · sh06 K fill
  · sh07 F 1x1top · sh08 D wideLow), "cover" (photo: scale 1, shift 320, top 330, maxH 470 = her still lower, the line above her head;
  card sh04 amber, sh08 grey bg + amber hi), images cover_shNN, "outroCard" (02 thumbnail, the title), teaser endCard title updated.
- Tools: tools/covers.py (render lock), tools/fmtsheet.py (sheets). Stills outputs/_review/v2, chk, outro.
- Known: sh01 27.7 s the ladder's labels touch in the pop-up card (pre-existing graphic, smaller card); sh02 (H) has a 29 s stretch of
  her talking with captions only (H by design).

## 2026-11-13: full-kit pass (FULL-KIT-BRIEF-2026-11-12) — DONE, see STATUS.md
- moments/boards.js (NEW, last in "common", shorts + teaser only): LOOK per short (board refs, font-board fonts + colours), LB.CAP / LB.TITLE /
  LB.COVERS override LCF.capFmt / titleFmt / coverDraw; the kit's "Helvetica Neue" and RVMono faces are re-registered per page to the short's
  fonts (teaser: Archivo + DM Mono). sh01 skips the ladder (RV.skip); sh04 forces dark code panels (RV.night). Graphics are clamped to end
  at FOOT.dur (no overlap with the ending card). formats.js: POP card y 64-564 (above her head).
- Manifest: sh01 out 32.5 + cut [24.36, 27.08]; sh02 in 46.66 + cuts [58.28, 60.47] [75.26, 96.72]; sh03 out 133.24; sh06 out 314.08; fmt sh02 G,
  sh05 M, sh07 A; "board" / "fonts" / "colours" / "topLabel" / cover {text with \n, sub, style} per short; teaser bites v3 (gaps 1.2 s at 401.15,
  inside the source); outroCard thumb 01 + title. footedl re-run: the full edit's clips are unchanged. Backups: build/*.before-fullkit.*.
- edits/shNN.json "mix" (music -15, sfx -7). Tools: tools/v3check.mjs (text check), tools/kitstills.py (stills + sheets).
- teaser/teaser.js v3 + PLAN-v3.md (v2 in ../archive/teaser-v2/).

## 2026-11-19 (late): opening cut + caption accuracy pass — DONE (see STATUS.md)
- Manifest: cut [9.32, 15.30] in full / sh01 / teaser bite 1; "pauses" [] (old one in "pausesRemoved-2026-11-19"); full cut [317.82, 318.96] removed
  ("Some people call them staff engineer."); edge fixes sh02 sh03 sh04 sh05 sh06 sh07 sh08 + teaser bites (silence on voice16k.wav).
- tools/words.py: new stage FIX2 (phrase fixes), FIXT2/FIXT3 (times measured on the waveform), "into a model" retimed, inserted words,
  and a last step that moves any word whose start sits in a trimmed silence onto her voice (run footedl BEFORE words.py).
- film/scenes/rvsent.js: s1 starts "in the first quarter"; sentences follow the new words (s7 vibe, s16, s40, s42, s44 "and the third", s68 staff engineer…);
  plan.js / film.js word anchors updated ('and i have a strong', 'vibe', 'the save', 'a fix', 'save your data'); teaser.js b1("indeed's") -> b1('in the first').
- plan.js up-15: TH.room -> TH.ots (her face was out of frame).
- Caption check files: build/captioncheck-2026-11-19/ (turbo transcript of the full sound, caption-diff-after.txt); scratch scripts momdiff.py / dropcheck.py were in the session scratchpad.

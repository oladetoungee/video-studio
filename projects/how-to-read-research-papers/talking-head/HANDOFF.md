# how-to-read-research-papers: FILM agent hand-off (talking-head, shorts, teaser, film). Resume from here.
Agent: FILM (2026-11-02/03), brief `projects/BUILD-BRIEF-2026-11.md`. Her pick: A · The Margin + B's "Figure 2" in A's paper/type.
Order: full edit -> shorts -> teaser -> film. Correction: Caine = every paper AT CHI 2014. End screen: https://youtu.be/QmdZyQIws4w

## Built (all wired, meta builds without errors)
- Words `data/raw_words.json` (tools/words.py: t_dtw tokens + corrections + hand timing fixes for words whisper put inside cuts).
- Clippings + Pexels: tools/clips.py -> film/assets/src (+ clips.js: CLIPS, KESHAV phrase boxes; extra boxes tools/keshav_extra.json).
- Look: film/scenes/rp.js (RP.* graphics: page, src, head, parts, passes, fiveC, compare, twelve, list, photo, notes, reader, fix).
  moments/common.js (TH.look, RP.full insert, RP.card black phrase card, RP.fig = Figure 2 via TH.page, captions C1/C2 in 16:9
  (drawCaptions16 override) and 9:16 (TH.over), per-short top labels RP.SHORTS).
- moments/sent.js (tools/sent.py, sentences after cuts) + moments/plan.js RP_PLAN(mode) shared by full + sh01-sh11.
- Manifest: full (cuts = CLEANUP 3 retakes + 152.27-153.78 + 376.65-378.15), pauses fix-chi (CHI 2014 correction, 5.5 s paper
  screen) + full-only end-screen (14 s board for the YouTube end screen), sh01-sh11 (3x4 window, endCard false: no outro yet), teaser (17 bites + 4 gaps).
- Film: film/film.json + scenes/kit.js + scenes/film.js (66 scenes), tools/voice.py (voice = full edit cut). render.mjs meta OK.

## Next
16:9 full stills review (build/review/st1) -> fixes -> 720p review export -> critic -> shorts review -> teaser review -> film critic.
Review renders: talking-head/build/review/, film/build/review*/ (move to ~/.Trash when done).

## 2026-11-07 (her changes: BUILD-BRIEF "2026-11-07 CHANGES", TYPE-SYSTEM set 05)
- Re-typed in the shared look once: film/scenes/rp.js (DM Serif Display headlines + italic key word, DM Mono pen notes and
  credits, Inter Tight body; Caveat / Newsreader / HN Condensed gone), moments/common.js (captions = Inter Tight 600 or
  DM Mono, soft shadow, no outline, key word on the highlighter; short labels in DM Serif on a flat paper field, balanced
  lines; ring/outline 0 so no borders round her windows), teaser.js cards + end card.
- Standalone motion film DROPPED (her rule): film/ stays only because rp.js + assets live there. No more film renders/critics.
- design/ (thumbnails + carousels) now owned by this agent: re-typed via the font aliases in thumbnails/lib/rp.css and
  carousels/shared/base.css ('News' -> DM Serif Display, 'Hand' -> DM Mono), sticker borders removed, photo-led thumbnails
  on her new photos; 04/05/08/09 cut (Bin). Carousels rebuilt (checks clean IG; LI slide 1 rotation warning only).
- Review stills: talking-head/build/review/{st2, sh, tz} + sheets (bin when done).

## 2026-11-07 night: "show, don't type" pass (her edge-cases rule, FEEDBACK 2026-11-07 evening) — DONE
Files: moments/visuals.js (NEW, in "common" before plan.js: RP.pic photo full-bleed + push, RP.trio photo row); moments/plan.js (old:
build/plan.before.js); teaser/teaser.js (old: build/teaser.before.js); moments/sent.js s103 "were"; film/scenes/rp.js RP.fiveC o.noTitle (9:16).
Gone: all 12 keywords, the sentence cards (three parts, whole evening, weak spot, published, claim; "Who funded it?" stays), the pen notes that
re-typed her ("not a novel.", "the whole paper in one paragraph", "Keshav: 4-5 hours"), every hand note under a heading, the long Figure 2
titles and their sentence captions (now one short phrase: "The parts", "Five questions", "Another paper", "The deep dive", "Notes"),
the method list (now a real interview photo), the switching-apps question card (now stressed-at-screens / survey / heart-rate watch photos),
the lines over the nurses and printing photos, the titles that repeated the Cochrane / PubMed / Zotero screenshots, the tip sub-lines,
the compare questions (her own words in the captions), the repeated pass cards at s55. Teaser: 6 keywords gone, nurses photo, no heads.
Photos: film/assets/src/px-{9064799,5831256,5989928,5185082}.jpg (CREDITS.md; 5185082 fetched, not used yet).
Text count: python3 talking-head/build/textcount.py 582.9 talking-head/build/plan.before.js 582.9 talking-head/moments/plan.js -> 566 -> 258
(58.3 -> 26.6 a minute).
Cuts: all 5 cuts sit in silence and no retake survives (checked the words + waveform at each cut). Caption: "were more likely" (whisper "we are").
Checks: full 16:9 layout variety pass (room 33 %, split 26 %, page 18 %, ots 13 %, tile 9 %), no collisions (full 16:9, sh01-sh11, teaser),
empty panels 0. Left: the 9:16 version of the full edit has a 0.5 s overlap while "Three checks" rows enter (old, not in any short).
Sheets: outputs/_review/before16.jpg + after16.jpg (same times, every 20.1 s).
## 2026-11-07 night, round 2 (coordinator review) — DONE
- Kelly Caine, Cochrane title and Zotero screenshots full-frame (were in a split / tile, too small to read).
- Caption "a Paper. It was written by S": words.py drops the title quotes (the quote hid the full stop) and joins "S. Keshav." into one
  token; moments/sent.js s26/s27 re-split by hand ("…called how to read a paper" / "it was written by skeshav", RP_RAW s27 129.16).
  If tools/sent.py is run again, re-check s26/s27.
## 2026-11-10: shorts format mix + cover frames (ROLLOUT-BRIEF-2026-11-10) — DONE, self-checked
- Formats (SHORTS-PLAYBOOK "Format menu"; picked by content, each once, neighbours differ): sh01 H · sh02 B · sh03 M · sh04 E (the old
  paper-card look) · sh05 K · sh06 J (poster "Read it *in depth*") · sh07 G · sh08 I · sh09 A · sh10 C (poster "Notes + *Zotero*") · sh11 F.
- Code: moments/formats.js (NEW, manifest "common" before plan.js) = the HTTP formats ported to this look: RF.install (where graphics and
  her picture go per format; I pop-up cards, J screen on a dark wall, G letterbox, gap fill), RF.capDraw (captions per format in DM Serif
  Display / Inter Tight, key word = RP.keyIdx in yellow italic, F/G word-lit, K subtitles on black, M small sentence case), RF.titleDraw
  (F small title, G big title, K DM Mono tag, M white box), RF.bigTitle / RF.poster / RF.jRoom, RF.coverDraw (cover frame). New ground
  G.rpHi (yellow). common.js: shorts with fmt != E skip the old label / captions; plan.js: `const FX = RF.install(...)` (+ fill / restore).
  Old files: build/common.before-formats.js, build/plan.before-formats.js, build/talking-head.before-formats.json.
- Covers: manifest "cover" {on, dur 0.1, at, text (~word~ = yellow italic), style photo | card (yellow) | card-blue}; stills by
  tools/covers.py (copied from HTTP) -> assets/covers/; candidates: python3 tools/covers.py --candidates shNN 8. Photo covers keep the
  line above her head (y 236-536, inside the 3:4 grid crop). Cards: sh03, sh09 yellow, sh06 blue.
- Matte made for sh06 (J) and sh10 (C). Review sheets: tools/fmtsheet.py -> outputs/_review/shorts-formats-v2.jpg + covers.jpg
  (stills in outputs/_review/v2/; bin after she has looked). Proxies rebuild on open. In/out points and captions unchanged.

## 2026-11-13: FULL-KIT font-board pass (shorts, covers, teaser v3) — DONE
- moments/fontboard.js (NEW, manifest "common" before formats.js): RF_FB per short = font-board fonts + source colours (manifest "fonts", "colours", "board"). formats.js reads it (RFN/RFI/RFS/RFM, FBc/FBup/FBls; RF.words: Shift+Enter = real break; captions chunked 2-4 words in the board font, ink on coloured bands; B captions at y 1660; a graphic counts for caption placement only once its panel is on screen; RF.coverDraw rewritten: cover style photo | big | frame, ~word~ = key colour or key box). Old: build/formats.before-fontboard.js.
- film/scenes/rp.js: in shorts + teaser 'DM Serif Display' is loaded from talking-head/assets/fonts/Newsreader-600(-Italic).ttf (font board shorts-11); full edit unchanged. Archivo-w68.ttf = design-28 width instance.
- plan.js: short graphics clamp at FOOT.dur. common.js: teaser portrait captions low + none over title cards.
- Manifest: sh04 fmt H; sh10 in 515.05; sh11 in 556.80 out 594.05; covers rewritten; images cover_shNN_frame; teaser bites v3, endCard false (outroCard thumb 08 + "You're Reading Research Papers in the Wrong Order"). data/edl.json rebuilt (full unchanged, checked clip by clip). edits/shNN.json + teaser.json: mix music -15 sfx -7.
- teaser/teaser.js v3 + PLAN-v3.md (old v2: build/teaser.before-fontboard.js).
- Review: outputs/_review/fontboard-2026-11-13/ (bin after her OK).

## 2026-11-17 weakest pass (shorts) — DONE
- formats.js RF.jRoom: content box 1000x760 drawn at RF.JK[id] || 1.3 (compare 1). rp.js: fiveC 'tight' (PORTRAIT && r.h < 1200: no page card, 64 px rows, short credit); passes 'tightP' (40 px room + short credit). plan.js: s54 'hours-passes' (SHORT only, pass 3 lit on "three hours").
- Backups archive/weakest-2026-11-16/ (formats.js, rp.js, plan.js). Sheets outputs/_review/sh04- / sh06-before-after-2026-11-16.jpg.

## 2026-11-20: caption accuracy pass — DONE (see STATUS.md)
- tools/words.py: last block "2026-11-20" (4 phrase fixes, "this," retimed for sh11, words starting in a trimmed pause move onto her voice; never across teaser bite gaps). Run footedl BEFORE words.py.
- talking-head.json: 29 edges moved into silence (shorts' shared in/out points, teaser bites 3, 8, 9, 15). Files: build/captioncheck-2026-11-20/.

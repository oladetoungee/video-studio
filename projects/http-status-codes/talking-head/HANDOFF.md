# http-status-codes: FILM agent hand-off (talking-head, shorts, teaser, film). Resume from here.
Agent: FILM (2026-11-02 night), brief `projects/BUILD-BRIEF-2026-11.md` (Batch 2). Her pick: B · The First Digit
(`film/stills/directions/README.md`, code in `film/stills/directions/B-odometer/`).
Corrections: "Mistake 4" card where she says "the first one" (raw 8:11), caption "false" for APP_DEBUG (raw 8:34).

## Done
- 23:10 words: `talking-head/tools/words.py` -> `data/raw_words.json` (67 fixes from corrections.json + her own kit text).
- thsetup.py running (face track waits for the render lock).

## Next
look (moments/common.js) -> plan.js (full) -> stills + checks -> shorts SH1-SH13 -> teaser -> film.
- 2026-11-03 07:00-08:40 (after the usage-limit pause): receipts captured (talking-head/assets/caps -> tools/clips.py -> assets/src:
  rfc-301, rfc-401, laravel-false, rfc-teapot + the 5 from the directions), Pexels px-416583 teapot / 4801686 closed / 39183052 alarm
  (CREDITS.md). Kit: film/scenes/fdkit.js (FD.*), sentences film/scenes/fdsent.js, look talking-head/moments/common.js,
  plan talking-head/moments/plan.js (FD_PLAN full|short|film), full.js, shorts/sh01-13.js (manifest in/out from sentence times),
  teaser/teaser.js (16 bites incl. 3 gaps). Film: film.json + scenes/shim.js (runs the plan inside the film) + scenes/film.js,
  voice film/audio/voice_edit.flac (tools/edit_voice.py), words film/data/words.json (tools/words.py). meta OK: 95 scenes 514 s.
- Next: stills r2 (16:9 full), film sheet, fixes, checks, critic.
- 2026-11-03 later: panels lead (first element within 0.35 s, FD.lead via plan LD wrapper), tighter receipts (gh-hl, rfc-301
  one line, google-line), mistake counter layout, back-to-back talks merged (layout share max 23 %, 11 layouts/min),
  shorts/bites out points = last sentence end (clean-ends), shorts alternate two styles (odd: block title + C1 caps; even:
  "stack" band title + "box" sentence captions; manifest labelStyle/capStyle). Film stems built (-14.2 LUFS, TP -6).
- 2026-11-06 resumed: stills r2 had died with the session; re-running. soundqa on the film not run yet.
- 2026-11-06: film critic r1 16:9 6 / 9:16 5. Applied: type cards = whole sentences (>= 3 words, >= 1.6 s), on the part's
  group colour (no white), with the part's code rolling beside/above (mistakes: 200/500/401/500); FD.http alternates side /
  stack layouts; receipts stacked (code on top, page full width, scale <= 3); hero section openers (x4, x5); sub-labels
  44-64 px; phrase cards 140 px, serif only for whole-serif lines; vertical fit in FD.type; push 5 %. Film audit: dead
  holds 2; stems -14.9 LUFS (AAC), music under voice 17.3 dB. NOT re-scored yet.
- Talking-head stills r2 queued behind ~10 other agents' exports on the render lock (since ~22:00).
- 2026-11-07 (her feedback, BUILD-BRIEF "2026-11-07 CHANGES"): type set 02 everywhere. Kit fonts = Anton / Inter Tight / DM Mono
  (film/scenes/fdkit.js, same FD.* names); captions + keywords solid fill with a soft shadow (no boxes, no outlines); phrase cards
  = FD.type on black (Anton caps, *word* amber); shorts title block Anton + Inter Tight line. Standalone film DROPPED (film/ code kept:
  the edit uses fdkit/fdsent). Design (now mine): thumbnails + carousels re-typed in lib/hs.css + shared/base.css, tilts/shadows
  removed, her studio photos on 01-08, critic on sheets (thumbs best 7; IG 7, LI 7 before fixes). Review sheets in outputs/_review/.
- 2026-11-07 final: her call "finish quickly, no more critic rounds". Last own check on outputs/_review/full_16x9_r2.jpg: OK.
  Captions step aside on c3/c4/c5 panels (they spell her words). Review sheets kept in outputs/_review/ (small; bin when done).
## 2026-11-07 evening: "show, don't type" pass (edge-cases model) — DONE
Files: moments/visuals.js (NEW, manifest "common" after common.js): FD.http = dark code editor (no white sheet, methods blue,
status in its group colour), FD.table = big codes on dark (no white cards), FD.mistake = dark counter + one big code, HT.trip
(request travels client -> server / proxy / other branch, response comes back with its code; burst for 429, fail for 502,
spinner for 504), HT.net (generic network panel: first digits light up, then 4xx rows, then 5xx rows), HT.who (401 vs 403 as
two people), HT.admins (409: two admins, one book, the old price comes back), HT.phone (the ONE form: log in -> no access).
Captions (common.js FD.capDraw): ink on a light graphic, solid dark band when half over one (pixel check FD.capMode).
plan.js (old: build/plan.before.js): cards that re-typed her lines gone (different address -> trip redirect, two questions ->
her close-up, who are you -> HT.who, you shouldn't even know -> her close-up); keywords rarely / stay the same / 422 is clearer /
folder dropped; every note that re-typed her sentence dropped; kickers dropped; repeated names (code + status line) dropped;
photo credits off screen (film/assets/CREDITS.md); flow boxes -> HT.trip; two admins -> HT.admins (ROOM); front end -> HT.phone.
teaser.js (old: build/teaser.before.js): digit -> HT.net, who card -> HT.who, 504 -> HT.trip, re-typed names dropped.
Cut 2 end 49.63 -> 49.38 (it clipped "I've"; measured dip), tools/words.py retimes her kept words; footedl re-run.
Text: python3 talking-head/build/textcount.py 8.54 talking-head/build/plan.before.js talking-head/moments/plan.js
-> 581 -> 319 on-screen words (68.0 -> 37.4 / min); without typed request/code lines 364 -> 115 (42.6 -> 13.5 / min).
Checks: composite check full 16x9 + 9x16, sh01-13, teaser 16x9 + 9x16: no text collisions; layout variety pass (split 37 %).
Sheets: outputs/_review/before16.jpg + after16.jpg (bin after she has looked).
- 2026-11-07 coordinator round: tiles fill the frame (no beige strip; her tile over an empty corner), 401 vs 403 card starts on
  her "401" (was a black frame), 429 graphic clear of her tile, 404 tile bottom-left.
## 2026-11-08: shorts format mix (her note "everything is the same format") — DONE, one self-check
- Menu: inspiration/know-how/SHORTS-PLAYBOOK.md "Format menu" (A wide · B split · C cut-out · D captions on top · E window + title ·
  F square + karaoke · G letterbox). Manifest per short: "fmt", "frame9" (A wide, D wideLow, E 4x5, F 1x1top, G letterbox; B/C
  draw their own), C "poster" (the giant codes: sh04 "301 302 307 308", sh06 "404 410").
- Code: moments/plan.js FD_PLAN short = GFX[fmt] (where graphics go) + talkF (B poster split, C presenter cut-out, G z 1) + B/C gap
  fill; keyword y by format (E as before, F 1720, others 1300). moments/common.js: FD.capFmt (captions per format, F/G word-lit),
  FD.titleFmt (D flash 1.6 s, F small title, G big title), FD.poster / FD.bigTitle (editable as label / poster), label + labelBottom
  only for E. Old files: build/plan.before-formats.js, build/common.before-formats.js, build/talking-head.before-formats.json,
  build/edl.before-formats.json.
- ENGINE (backward compatible): studio/runtime/layouts.js TH.FRAMES gains wideLow / 1x1top / letterbox (new names only; frameBox
  reads f.at 'bottom' / f.y only for them). No other project's shorts change.
- sh05: started mid "...similar" (stray caption "sound similar"): in 210.94 -> 211.08 (measured dip 211.04-211.11), raw_words
  "similar." retimed 211.14 -> 210.98 (whisper had put it on top of "400"); footedl re-run (only sh05 changed).
- Checks: composite check sh01-13: no text collisions, no empty panels; short-zoom pass except C (cut-out, not measured) and G
  (0.10, letterbox by design). Sheet outputs/_review/shorts-formats.jpg (13 x 3: 1 s / middle / end). Known: G's GitHub receipt
  line is small (the same graphic as before); a split-second empty dark panel as sh12's alarm photo opens (pre-existing lead).
- Editor previews (proxies) rebuild on open; sh05's changed clip needs its proxy remade.
## 2026-11-09: five shorts to new formats (her note "some look so similar, it's just the colour") — DONE, self-checked
- sh03 H full frame + bold captions · sh06 J slide behind her · sh07 K film subtitles · sh10 I pop-up cards · sh13 M TikTok title
  box (SHORTS-PLAYBOOK "Format menu" H-M). sh12 untouched. Manifest: fmt (+ frame9 "fill" for H/I/K/M; J has no frame9, poster "404 410").
- Code: moments/plan.js GFX.H-M, talkF.J/H/I/K/M (full bleed at z 1.0), popCard (I), jSeg (J: own presenter-like seg on TH.cutout,
  needs the matte, which sh06 already had from C), gap fill also for H-M; keyword y for J/H-M. moments/common.js: fonts FDHeavy
  (Inter Tight 800/900) + FDSerif (DM Serif Display) from /library/fonts, FD.jRoom (wall + screen), FD.tagK, FD.boxM, FD.capNew
  (H/I/J 2-3-word chunks, K subtitles on black boxes, M small sentence case). Engine untouched (HT.phone / house.js not touched).
  Old files: build/plan.before-v2.js, build/common.before-v2.js, build/talking-head.before-v2.json.
- Checks (composite check, 9:16): text collision 0 on all five; label-over-graphic pass; no text over her face; short-zoom H/I/K/M
  0.31-0.32 (full bleed at z 1: brief asked 25-35 %, just over the 0.30 line on purpose); J cut-out not measured (~0.21); sh10
  "overflow" = the card's own box on the panel edge (false positive). In/out points unchanged (clean-ends as on 11-08).
- Sheet outputs/_review/shorts-formats-v2.jpg (stills in outputs/_review/v2/sheet/; bin after she has looked). Proxies rebuild on open.
## 2026-11-10: cover frame in every short (her note "the real cover should be on the video… nothing to do with thumbnails")
- Manifest "cover" per short {on, dur 0.1, at (source s), text (~word~ = code colour), style card for sh04/sh08/sh12} + images
  cover_shNN (+ cover_shNN_cut). Stills: tools/covers.py (cuts the 9:16 still at "at", full source height centred on her face; cards
  also run studio/tools/cutout.swift person) -> assets/covers/. Candidates for picking: tools/covers.py --candidates shNN 10.
- Code: moments/common.js FD.coverOf / coverOn / coverDraw; TH.post draws the cover INSTEAD of captions / titles while t < dur
  (scene 'cover': text 'cover/cover', block 'cover/@her'). No time inserted (EDL, audio, captions untouched).
- SHORTS-PLAYBOOK "Cover frame" section. Review: outputs/_review/covers.jpg (stills in outputs/_review/covers/; bin after she looked).

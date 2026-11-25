# doomscrolling FILM agent: progress notes (resume from here)
Brief: projects/BUILD-BRIEF-2026-11.md (Batch 2). Her pick: A · Offline Bingo (card = the 1-9 counter; labels appear whole).
Order: full talking-head edit -> shorts -> teaser -> motion film.

## Done
- data/raw_words.json from whisper tokens (t_dtw) + caption fixes: `tools/words.py` (incl. "cold turkey", doomscroller, Substack).
- data/sentences.txt = her sentences with raw times (after the CLEANUP cuts).
- face track + manifest skeleton (thsetup.py).
- Look: film/scenes/bingo.js (BG.*: card, mini counter, square, word, photo, src (NPR), cues, list, meter, call). Fonts copied to library/fonts (Dela Gothic One, Figtree, Red Hat Mono), registered by FontFace.
- Assets: film/assets/pexels/*.jpg (CREDITS.md), film/assets/src/npr-crop.jpg.
## Built 2026-11-03
- moments/common.js (look, mini counter, shorts label/caption styles bgStyle {lab: inv|butter|stack|mono, cap: c1|box|card|helv}), moments/plan.js (BG_PLAN, raw-time phrases X(a,b)), full.js, shorts/sh01-12.js, teaser/teaser.js; manifest: full (13:04), 12 shorts, teaser (88.8 s, 18 bites + 3 cards). footedl run.
- Film: film/film.json, scenes/film.js (104 scenes), scenes/rawmap.js + audio/voice_edit.flac + data/* from film/tools/voice.py. render.mjs meta OK.
- Fixed: MOTION.ease has no 'outCubic' (broke the meter).
## Next
- Review stills (outputs/_review/stills), fixes, a 720p review export of the full edit, critic, shorts review, teaser review, film stems + sheet.
- Extra cuts in the full edit: "number eight" (raw 907.84-908.76, item 6 slip; card shows 06), stray "Yeah." 962.8-963.6.
## 2026-11-06
- ffmpeg select-expression limit (~100 clips) broke the full export (ENGINE-REQUESTS 2026-11-06). Stop-gap: the FULL edit is planned
  with maxPause 1.2 (99 cuts, 13:38), the shorts + teaser with maxPause 0.55 (tight). edl.json is per moment: run
  `footedl.py <man> full` with edit.maxPause 1.2, then set it back to 0.55 and run `footedl.py <man> sh01 ... teaser`. Never
  re-run footedl for all with 0.55 until the engine fix is READY.
- Stills fixes: BG.word / BG.list centred in their panel, photo credit on a plate inside the photo, read-eat/coffee/pushups tiles at br.
## 2026-11-07 (her changes: BUILD-BRIEF "2026-11-07 CHANGES")
- Re-typed to set 06 (League Gothic caps + Inter Tight + DM Mono) in the shared look film/scenes/bingo.js + moments/common.js
  (shorts titles/captions without boxes or outlines; 16:9 captions overridden to Inter Tight 600, soft shadow) + teaser.js.
  No rings, no card borders (hairlines), [key] words = ink vs mustard + a 2 px rule (no blocks).
- Standalone motion film dropped (film/ stays only for bingo.js, the shared look). Do not render or critique film/.
- I own design/ now: thumbnails (lib/bingo.css font aliases Dela->League Gothic etc., her new photos in assets/cut/her-*.png and
  assets/frames/hs-*/st-* scenes, flat grounds) and carousels (shared/base.css aliases, build.mjs disp size x1.7, headshot end slide).
- Critics 2026-11-07: thumbnails v2 (04 8, 01 7, 03 7; fixes applied for 02/05/06/07/08/09/10), carousels IG 6 / LI 7 (fixes: cover
  daubs only 01, bigger progress dots, school-gate setup line, short source).
- Long holds broken up (fiction -> + "enjoy" window; formats -> split / talk / Kindle window; plants capped).
## 2026-11-07 night: "show, don't type" pass (her edge-cases rule, FEEDBACK 2026-11-07 evening) — DONE
Files: moments/visuals.js (NEW, in "common" before plan.js: BG.pic photo full-bleed + push, BG.trio photo row, BG.feed endless phone feed
(+ hearts), BG.reps push-up counter 1-10, BG.apps phone apps going away + time-limit bar, BG.phone); moments/plan.js (old: build/plan.before.js);
teaser/teaser.js (old: build/teaser.before.js).
Gone: every keyword (KW), the ink sentence cards except "No stopping cues" (easy way out, awkward, monetise, profound, genuine), every BG.word
that re-typed her sentence, the BG.list boxes, every photo caption ("Waiting for the kettle to boil"…), the quote lines on the squares.
Now: endless feed (apps are designed / influencers with hearts / reduce it), scrolling in bed, novels, paperback, e-reader, waiting / bus /
book row, crochet / painting / camera row, dinner / cooking / camera / plants row, friends chatting (parents), headphones + chores (background
noise), bags (reputation), push-up counter to 10, phone apps deleted + limit, dinner (genuine connection). Ink grounds on the rooms and splits.
Photos: film/assets/pexels/{scroll-bed,novels,ereader,chat,painting,camera,cooking,chores,bags,dinner}.jpg (CREDITS.md), images px-<name>.
Text count: python3 talking-head/build/textcount.py 818.5 talking-head/build/plan.before.js 810.8 talking-head/moments/plan.js -> 434 -> 42
authored words (31.8 -> 3.1 a minute; the bingo card's printed item names are not counted).
Cuts: "number eight" re-cut 907.40-908.53 on the waveform (the old 907.84-908.76 cut through the middle of both words); words.py moves the
stray "Yeah." (said 962.95-963.33, inside its cut) so the caption no longer shows it. footedl re-run for full only with maxPause 1.2, set
back to 0.55 (full 810.1 s, 100 clips). Captions: "with your boredom" (whisper "bottom"), "Medium", "doomscroller." (no double stop).
Checks: full 16:9 layout variety pass (split 35 %, room 23 %, tile 16 %, half 13 %, ots 9 %), no collisions (full, sh01-sh12, teaser; sh02
tired-meter title vs mark fixed by dropping the title in 9:16), empty panels 0. The 9:16 version of the full edit still shows split 51 %
(its tiles become splits in 9:16; structural, not new).
Sheets: outputs/_review/before16.jpg + after16.jpg (same times, every 28.2 s).
## 2026-11-07 night, round 2 (coordinator review) — DONE
- NPR clipping full-frame (was a small tile). Captions break at sentence ends (shared footage.js caps16, patched by another agent today).
- words.py snaps words whose whisper start sits in a removed pause of the FULL edit (data/edl.json) back to the kept edge (20 words were
  missing from captions, e.g. "the feed that never stops"). The shorts use tighter pauses (0.55 s): not covered by this snap.

## 2026-11-10 rollout (formats + covers + end card) — DONE
- moments/formats.js (NEW, manifest "common" last): ported from dark-patterns' formats.js (itself from http-status-codes) into BG / set 06
  (League Gothic caps titles, posters and A/C/F captions; Inter Tight 500-900 sentences; butter/ink). BG.fmtInstall is called from BG_PLAN
  short (plan.js, FX); shorts with "fmt" skip the old bgStyle look (common.js guard) and drop text cards + words-behind-her.
  New vs dark-patterns: B/C/J fill every gap between segments with the format's talking layout (FX.restore -> fillGaps; the runtime filled
  gaps with her plain 4:5 window); BG.inGfx asks which segment is on screen (latest started), not span overlap; captions sample the
  ground and turn ink on butter (key word dauber orange); C key word always orange.
- plan.js: sh01 gets the stopping-cues graphic cut to fit (pop-up card, pictures only: BG.cues noLabs in film/scenes/bingo.js), sh09 gets
  the photo row cut to fit; sh10's long-read photo shows from the segment start in shorts.
- tools/covers.py (copied), tools/locked.py (run a command under the render lock), tools/fmtsheet.py (review sheets). Mattes made for sh07 + sh08.
- Manifest: fmt/frame9/label/poster/cover per short, outroCard (top level). Backup before: build/talking-head.before-rollout.json.
- Open: sh07 frames 112-113 (0:03.73-0:03.77) rendered as a butter silhouette in `composite stills` (pad colour under her cut-out);
  3.73 and 3.80 fine. Not checked in an export.
- Follow-up 2026-11-10: sh07 3.74 butter silhouette = composite stills artifact (single-frame seek, pad colour under her hole; cams and
  matte frames are right). Export of 3.5-4.1 s checked frame by frame: clean (outputs/_review/sh07-check/, stills at 3.70/3.74/3.78 from
  that export). H/I/M captions with her alone move under her chin (camAt(face) at the caption start): sh05 0:42-0:44 face check clean.

## 2026-11-13: FULL-KIT pass (shorts + teaser) — DONE
- moments/formats.js REPLACED by a port of edge-case's formats.js (BG namespace; old one in build/before-fullkit/formats.js). Kept from ours: B/C/J fillGaps,
  chin rule for H/I/M captions (now per frame, camAt(t), any time her picture is full frame). New: every caption chunked (2-5 words), FB.capBox (captions
  on boxes of the board item's ground), FB.capInk, FB.low (lowercase), tag shrinks to fit, G title max 2 lines, big covers never draw a cut-out, J screen
  content area 80 % of the screen (was 46 %).
- moments/fontboard.js (NEW, last in "common"): BG.FB per short + teaser (fonts / colours from inspiration/boards/fonts). Panels: F.disp = Big Shoulders
  Display 800 (design-02), Inter Tight body, DM Mono; League Gothic is gone from shorts + teaser. Teaser registers "Helvetica Neue" = Bricolage.
- film/scenes/bingo.js: square header measures the number before the name; the call screen name shrinks to fit (backup build/before-fullkit/bingo.js).
- plan.js line 192: "genuine connection" photo px-dinner (a woman on her phone at dinner) -> px-coffee-talk (full edit + sh12; timing unchanged).
- Manifest: per short board / fonts / colours / cover {style photo|card|frame, big, shift, frameW}; frames assets/covers/sh02|sh07|sh10-frame.jpg; sh01 cover at
  33.87; sh08 poster "Hunting at / the thrift / store", sh07 poster "Learning to / ride a bike"; edits/shNN.json + teaser.json mix -15 / -7.
- Teaser v3: teaser/PLAN-v3.md, teaser.js rewritten (TZ.cut indices are 0-based bite numbers), bites + gaps in the manifest, footedl re-run for teaser.
- Sheets: python3 tools/mksheets.py (after tools/fmtsheet.py: stills + 3 board frames per row -> outputs/_review/fullkit/). Checks: composite check shNN --aspect 9x16.

## 2026-11-19: motion only (her note: blurry camera)
- The full video is the motion film (film/, editor /edit/<slug>/). Shorts sh01-sh12 + teaser show NO footage: shorts/shNN.js = TH.cutaway([0, FOOT.dur], {film: {aspect: '9x16'}}); teaser.js MONLY fills every gap between its inserts with film cutaways (one scene at a time in the runtime: a base cutaway under everything does NOT work, gaps become her talk shots).
- Manifest: "film": slug, per short "motionOnly": true, fmt A/F/M/K (fmtFootage = the old one), covers frame (assets/covers/shNN-film.jpg) / card big; outroCard = 09b + new title.
- formats.js: BG.motionBand (title band per fmt), motion-only A/F titles bigger, captions boxed (no karaoke dims) when motionOnly. Shorts without motionOnly are unchanged.
- film.js loads ../talking-head/moments/visuals.js (BG.pic, trio, feed, reps, apps) for 13 screens. The full talking-head edit still uses the same plan (unchanged).
- Backups: archive/footage-shorts-2026-11-19/.

## 2026-11-20: caption accuracy pass — DONE (see STATUS.md)
- talking-head/tools/words.py: last block "2026-11-20" (7 phrase fixes; words starting in a trimmed pause move onto her voice, for the moments AND for the film's own cut, film/data/edl-film.json). Then `python3 film/tools/voice.py` (rewrites words.json / captions.srt; the flac comes out byte-identical).
- talking-head.json: 19 short / teaser edges moved into silence.
- Careful: `footedl.py talking-head/talking-head.json` rewrites the retired "full" entry of data/edl.json (810 s -> 783 s: its stored 1.2 s pauses are not in the manifest). This pass restored it from build/edl.json.before-captions-2026-11-20; restore it the same way after any footedl run (words.py reads it).
- Files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt, film-diff-before/after.txt, caption-diff-before/after.txt, raw-diff-before.txt, doubtful-clips.txt, edges-after.txt).

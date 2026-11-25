# edge-case FILM agent: progress notes (resume from here)
Brief: projects/BUILD-BRIEF-2026-11.md (Batch 2). Pick: B · The Field (film/stills/directions/README.md). Order: full TH edit -> shorts -> teaser -> film.

## Built (2026-11-03 morning)
- Words: `talking-head/tools/words.py` (t_dtw, onset snap, kit fixes, hand fix "all" at 494.0) -> data/raw_words.json. Re-run after any thsetup (it overwrites).
- Sources: film/assets/src (B clips bbc, wired, azure + new stripe, sakurity, sakurity-race, hyrum; timeanddate blocked: clock drawn). `film/tools/clips.py` -> clips.js.
- Look: film/scenes/ef.js (EF.* graphics, draw(t, r); fonts Onest + JetBrains Mono from library/fonts, READY held until loaded).
- Talking head: moments/common.js (TH.look, EF.full, EF.card, shorts label/caption styles "efStyle"), moments/sent.js (phrases),
  moments/plan.js (EF_PLAN: ~95 segments, shared by full + shorts), full.js, shorts/sh01-sh11.js, teaser/teaser.js.
- Manifest: full (CLEANUP cuts + "Well, let me go"), top-level pause fix-azure (raw 308.3, 4.5 s: 2019 -> 2012), sh01-sh11 (sh07 cuts the 2019 phrase, pauses false), teaser (15 bites + 3 cards, ~88 s).
- Film: film/film.json, scenes/kit.js + film.js (80 scenes), tools/voice.py (= full edit cut + 4.5 s correction gap) -> audio/voice_edit.flac, data/words.json, captions.srt. `render.mjs meta` builds.
- Checks: `composite.mjs check` full: layout variety pass (7 kinds, split 30 %), collisions fixed except a few; review sheets in outputs/_review/ (bin after).

## Next
- 16:9 sheet review, fixes; critic round(s); shorts/teaser review renders (720p, outputs/_review/), film sheet + critic; sound QA; STATUS.md, report.

## 2026-11-06 film critic (agent a6ea999f422cd51f4)
- Round 1: 16:9 6 / 9:16 4.5 -> fixes applied (see report). Round 2: **16:9 7 / 9:16 6** (stills outputs/_review/critic/r2/).
- Round-2 fixes still to do (ranked): (1) 9:16 centre each graphic block vertically in FR() and scale up (correction headline >= 110 px, gift cards 420u);
  (2) 9:16 clips (stripe, bbc-jn, azure, azure-down) crop to the highlighted sentence via cropX so text >= 34 px; (3) gift note under the $20 in portrait;
  one-left result cut at the 16:9 bottom (lift lanes 80 px or result 50u); (4) 9:16 tickets clamp tx inside r; (5) 9:16 obrien SQL >= 34 px, 3 lines;
  (6) holds: them-us beat at "used to" (~438) + field at 442.2, one-left buyers at "two people" (163.6), api-order strike at "we didn't choose that" (416.2);
  (7) injection: second field label "Surname (typed on purpose)", start typing at "type something"; (8) utc start 353.5 or cut; (9) 16:9 azure-date: field h 260 centred + empty "Year" field.
- Keep: palette, tab transition, chapter field, correction screen, bytes, DST clocks, leap-date, api-break, clips, montage.
- Two queued edge-case full 16:9 review exports (pids 33172, 49352): output in outputs/talking-head/ is a REVIEW render -> move to outputs/_review/ then Bin. Then critic rounds on full edit / shorts / teaser, TH soundqa, CHECKS table.
- Film round 3 (last allowed): **16:9 8/10 PASS**, 9:16 7/10. Its must-fixes 1-3 applied after (Stripe/BBC/Azure 9:16 side crops, O'Brien SQL 4 lines in 9:16) and checked on stills; 9:16 not re-scored (3-round cap). Remaining 9:16 note: some screens still bottom-light.

## 2026-11-07 (BUILD-BRIEF "2026-11-07 CHANGES")
- Re-typed to set 05 Warm serif + mono: film/scenes/ef.js (DM Serif Display 400 + DM Mono 500, every outline efLine <= 2 px, thinner marks),
  moments/common.js (TH.look disp, no cut-out outline, 16:9 captions in DM Mono with a soft shadow, shorts labels on the band with no
  boxes, shorts/teaser captions mono/serif/karaoke/word with no boxes or strokes), teaser.js (no stroked boxes). Checks clean (full, sh01, sh06, teaser).
- Standalone film STOPPED (16:9 had passed 8/10); film/ scenes stay as code only.
- Stale Onest exports binned (~/.Trash/edge-stale-export). Contact sheets queued (one sequential job): outputs/_review/full16.jpg, teaser16.jpg, sh01-sh11.jpg. Next: one critic per piece on sheets, then report.
- 2026-11-07 final: one critic per piece on contact sheets (full 7, teaser 5.5 -> 6.5, shorts set 5.5); fixed the bugs they found (shorts label on an ink band
  + panels start below it, ink captions over lime, no black phrase cards in shorts, sh11 pauses false, teaser captions back on, no slab/boxes, topic card
  "EDGE CASES", end card, empty panels, kickers clipped). Re-sheets of sh01/sh11/teaser checked by eye; no more critic rounds (her call: finish fast). _review binned.

## 2026-11-07 evening: "show, don't type" pass (her review of the full edit) — DONE
Files: moments/visuals.js (NEW, in manifest "common" after common.js: EF.pic photo + push + overlay, EF.tapPath, EF.crowd avatars, EF.notify,
EF.sql typed query (break / inject), EF.signal bars, EF.disable button, EF.once counter), moments/plan.js (old copy: build/plan.before.js),
film/scenes/ef.js (efLine = no box edges except red errors; fields rounded flat; EF.src passes credit:false and centres a screenshot alone;
EF.clock centres when no label, o.top keeps it high), teaser/teaser.js (notify, clock, i-sold dropped), shorts sh02/sh03/sh07 (kicker/title/second result dropped).
Words: tools/words.py FIX "everything that I owe", "3:30, Tallinn time." -> data/raw_words.json; sent.js s2 "owe".
Cuts: full + sh01 [107.72, 109.45] "Idempotence-- like that." (silence both ends), CLEANUP.md rows 7-8; footedl.py re-run.
Photos: px-7534794, 5357816, 4559756, 37730212, 35838020 (CREDITS.md); manifest images px_<id>.
Text count: python3 talking-head/build/textcount.py talking-head/build/plan.before.js talking-head/moments/plan.js (570 -> 238 authored words, 73.6 -> 30.7 per min).
Checks: composite check full 16x9/9x16: layout variety pass (split 35 %), no text collisions; gaps left on purpose where she is on camera (431-445 "to them / to us", closing 448-465).
Still open / ideas: happy-path (Fill the form -> Click -> Wait) and the forms for cert / leap date / parking ticket / max-20 / Jennifer Null are kept (they explain), now flat with no edges;
re-check the closing recap montage (x2 / NULL / 29 FEB / 13) with her.
## 2026-11-07 evening round 2 (coordinator review) — DONE
- Dark grounds (#111114, EF.night) for about half the inserts: 8 chapter cards (new EF.chapter, no field box), SQL x2, resubmit dialog, BBC, Jennifer Null, cert, leap date, max-20, Stripe, Hyrum, place order, two-hours clock. EF.full o.dark = dark caption band.
- Forms gone except ONE, now a phone screen (EF.phoneForm, Jennifer Null; teaser too). Place order = EF.order button; parking = "Subject to ticket" photo (px-7549098) + a NULL plate object + tickets (EF.plateOnPhoto); cert = padlock + "+1 year" (EF.cert); leap = big dates, 2013 struck red (EF.leap); max-20 = name + 17/20 meter, 26 red on reject (EF.nameLen).
- BBC: full-frame, ~80 % wide, headline readable. Two-hours clock moved to an over-the-shoulder window (no overlap).
- studio/tools/composite.mjs stills: renders 2 frames and keeps the 2nd (in boxed layouts the 1st frame's crop fired late, so her box came out lime = the "empty boxes" and the pale captions on the sheets). Export was never affected (checked a 0.4 s export at 6.6 s).
- Sheets: outputs/_review/before16.jpg + after16.jpg (bin after she has looked).

## 2026-11-10: ROLLOUT (shorts formats + covers + ending) — DONE
- moments/formats.js (NEW, last in manifest "common"): EF.fmtInstall (called at the top of EF_PLAN in short mode, before plan.js's own overrides wrap it; kept installed for shorts/shNN.js extra panels), EF.titleFmt / capFmt / coverDraw, TH.over. A short with "fmt" skips common.js's efStyle look.
- talking-head.json: per short "fmt", "frame9", "poster" (sh04 O'Brien, sh07 29 February), "label" ("|" = 2nd line), "cover" {at, text, style, bg}; images cover_*; top-level "outroCard"; teaser endCard false. Backup: build/talking-head.before-rollout.json.
- tools/covers.py (stills + card cut-outs), tools/fmtsheet.py (outputs/_review/shorts-formats-v2.jpg + covers.jpg; stills via composite.mjs stills ... --prefix shNN_ into outputs/_review/v2/).
- plan.js: short graphics clamped to FOOT.dur (no collision with the end card). teaser.js: old end card off when outroCard is on.

## 2026-11-12 shorts review (agent)
- Zooms: plan.js short talks + hook always 'wide' (no mid/close/push/punch/alt); formats.js fallback talk 'wide', G H I K M L1 z 1 (as dark-patterns). `check` shortZoom.zooms = 0 on all 10 shorts.
- sh04: cut [200.42, 205.1] (snaps 200.50-205.07); sh04.js overrides EF_SENT.s53 (shortened sentence) so the hook + O'Brien SQL graphic still resolve; formats.js jRoom honours manifest "posterAt" (dark screen before that word).
- sh05 = old sh05 + sh06 (225.75-286.7, cuts 229.26-232.72 + 268.02-275.77), fmt M, label "Null errors in production", cover card big. sh06 removed from manifest; sh06.js + its cover in ../archive/shorts-2026-11-12/. Export names now number by position (short05..short10).
- sh07: fmt G / frame9 letterbox, poster removed, photo cover. visuals.js EF.cert: port = h > 0.85 w (near-square panels stack).
- sh10: cover style frame + big + frameW 0.9 + shift 900; coverDraw: big+frame = line at top (maxH 640), slide under it; frameW = centred with shadow.
- sh11: in 16.32; sh11.js adds the notify card from "report" (hookTo); formats.js titleFmt draws A's title at the top (white, outside graphics).
- coverDraw big: no short word (<=3 letters) alone on a line.

## 2026-11-13: FONT-BOARD pass (shorts + teaser) — DONE
- moments/fontboard.js (last in "common"): EF.FB per short/teaser (A titles/covers/posters, B captions, M small, box, colours title/key/cover/poster, zK/capK); F.disp/F.serif -> Inter Tight 800 in shorts/teaser (graphics), TH.look.disp Inter Tight 900; registers "Inter Tight" for devicePhone. Full edit untouched (EF.FB null).
- formats.js reads EF.FB everywhere type is drawn; cover card has no line pattern with EF.FB; EF.wrapH + cover "hand" = her Shift+Enter lines; EF.pg() = poster panel in the board ground (B/C). Backups in build/*.before-fontboard.*.
- Manifest per short: fonts, colours, board; outroCard thumb -> outputs/thumbnails/01-testing-vs-real-users.png.
- Font audit tool: scratchpad fontaudit (puppeteer, wraps fillText): run per id after any type change.

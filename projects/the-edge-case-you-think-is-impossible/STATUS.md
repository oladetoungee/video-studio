# STATUS: the-edge-case-you-think-is-impossible

Last updated 2026-11-16 (thumbnails 03b/04b/07b beside the 3 weakest; see the first dated section). Before: 2026-11-13 (FONT-BOARD pass on shorts + teaser, thumbnails set 4; see the first section). Before: 2026-11-12 (shorts after her review). Earlier: 2026-11-12 (shorts after her review, see "2026-11-12: shorts review"). Before: 2026-11-10 (ROLLOUT to the HTTP standard, see the section below). Before: 2026-11-07 evening (TH agent: "show, don't type" pass on the full edit after her review; see talking-head/HANDOFF.md). Earlier: 2026-11-07 (FILM agent: re-typed to type set 05 Warm serif + mono, DM Serif Display + DM Mono, hairlines only; the standalone motion film is dropped by her 2026-11-07 change).

## State
Her pick: **B · The Field** (lime form fields, one red). Full talking-head edit, 11 shorts, teaser and motion film are built in
the studio; review renders only (she exports). Thumbnails and carousels: built (DESIGN agent, 2026-11-07).

## 2026-11-16 (overnight): thumbnails, new versions of the 3 weakest (projects/WEAKEST-BRIEF-2026-11-16.md)
Old 03, 04, 07 untouched (folders + PNGs); new ones beside them, from design/thumbnails/tools/gen-set4b.py (`--force` resets their nudges), fonts copied: design/thumbnails/fonts/Oswald-Variable.ttf. Editable at /design/the-edge-case-you-think-is-impossible/thumbnails/.
| new | words | board | fonts | cold critic r1 / r2 / r3 (alone) | old in same rounds |
|---|---|---|---|---|---|
| 03b-bugs-that-break-apps | BUGS THAT BREAK APPS + "Only 1 left" note -> phone "In stock −1 / 2 people bought it" (1590, room washed #5A4F4A) | Thumbnails 126 (her UX RESEARCH) | shorts-06 Oswald cream #EDE2A0 on #5A4F4A | 7 / 6 / 4 (r3 = a try without the note + arrow, undone) | 03: 6 / 5 / 5.5 |
| 04b-bugs-your-tests-miss | Bugs your tests miss + "All tests passed" + 2 one-star reviews (charged twice / won't take my name), no face | Thumbnails 65 | thumbs-02 Inter Tight Bold + yellow #F7D51D on #1C1C1C | 6 (3 reviews) / 7 / 6 | 04: 5 / 6 / 6.5 |
| 07b-tests-wont-catch-this | YOUR TESTS WON'T CATCH THIS + sign-up form rejecting "Zoë" (1594, mouth closed) | Thumbnails 113 | thumbs-16 Anton + red box #D7262B on #222222 | 8 / 7.5 / 7 (top of all 11 each round) | 07: 4 / 5 / 4 |
Critics: 3 fresh general-purpose agents, PNGs of all 11 only, no notes. Stricter than 11-13's (01 7/7/7, 06 7/7/6.5, 05 4/6/4.5, 02 6/6/5.5, 08 6/6/5.5). Layout census: words left + her right = 02 + 07b (2). Recommended pair unchanged (01). Sheet: outputs/_review/thumbnails-before-after-2026-11-16.jpg. Kit section 2 updated (rows + note).
Flags for her: 06 still carries "O'Brien: invalid name" (a story detail, against her 11-12 rule; left alone because it is a Test & Compare pick); 05 (Test & Compare) scored under 7 in all 3 rounds and has "29 February" on it.

## 2026-11-13: font-board pass (shorts + teaser) + thumbnails set 4 (projects/FULL-KIT-BRIEF-2026-11-12.md)
Nothing exported; the full edit untouched (EF.FB stays null there).
- **Shorts + teaser fonts**: new talking-head/moments/fontboard.js (last in manifest "common"): per short font-board fonts + their source colours (manifest "fonts", "colours", "board": [3 Formats N]). formats.js: EFS/EFM/EFH/captions/covers/posters read EF.FB; covers lose the line pattern; Shift+Enter = real line break in covers, titles, M box (EF.wrapH, cover "hand" lines); zK/capK size steps for condensed faces. visuals.js plate "California" in Inter Tight in shorts. SH1 cover breaks by hand (3 lines). Old: talking-head/build/formats.before-fontboard.js, visuals.before-fontboard.js, talking-head.before-fontboard.json, refined-kit.before-fontboard.md.
  | short | fonts | colours | board |
  |---|---|---|---|
  | sh01 | design-18 Gloock + shorts-01 Montserrat | combo-08 | 16 66 8 |
  | sh02 | combo-02 + pair-03 Inter Tight | combo-02 | 12 40 5 |
  | sh03 | design-01 Six Caps + Inter Tight | design-01 | 68 31 9 |
  | sh04 | thumbs-10 Poppins | thumbs-10 | 38 64 65 |
  | sh05 | thumbs-09 Inter Tight + shorts-05 TikTok Sans | thumbs-09 | 24 69 17 |
  | sh07 | thumbs-16 Anton + shorts-21 Libre Baskerville | thumbs-16 | 47 45 40 |
  | sh08 | thumbs-18 Montserrat + shorts-11 Newsreader | thumbs-18 | 52 67 19 |
  | sh09 | thumbs-02 Inter Tight | thumbs-02 | 42 65 10 |
  | sh10 | design-02 Big Shoulders Display | combo-07 | 5 47 22 |
  | sh11 | design-15 Bagel Fat One + Inter Tight | combo-04 | 2 34 51 |
  | teaser | combo-02 Inter Tight + design-29 DM Mono | combo-02 | - |
  Checks: font audit (every fillText font over each moment, 0.5 s step): only board fonts drawn, all loaded (DM Serif Display gone). composite check 9:16: text collision 0 and labels pass in all 10; face / zoom flags identical to before the pass (covers read the hidden video; letterbox zoom measure). Teaser 16:9: 1 collision at 5.7 s inside the orders graphic (tab 2 sliding in), same as before the pass. Sheets: outputs/_review/fontboard-2026-11-13/ (shorts-sheet.jpg = 4 stills + its 3 board frames, covers-sheet.jpg, teaser/sheet.jpg).
- **Thumbnails set 4** (design/thumbnails/tools/gen-set4.py, lib/fb.css; `--force` rewrites nudges except 01's): 8 thumbnails, each a different board composition, fonts only from the font board in their own colours; 01 = her favourite (set-3 09) with her nudges + words kept; outroCard thumb repointed to 01. Cold critic 5 rounds (PNGs only): 01 8/8.5, 02 8/8.5, 05 8/8.5, 06 8/8.5, 04 7.5/8, 07 7.5/8.5 and 08 7.5/8.5 (both fixed after, not re-scored), 03 7/7.5 (recropped after). Dropped: bugs-your-tests-miss (6.5-7.5), tests-pass-app-breaks (looked like 06/07). Set 3 + drafts: ~/.Trash/edge-thumbnails-set3-2026-11-13/. Sheet: outputs/_review/thumbnails-vs-board.jpg.
Waiting on her: look in the studio (covers at 0:00), pick thumbnails; she exports.

## 2026-11-12: shorts review (her notes applied; waiting on her to look + export)
| Short | Change | Editor |
|---|---|---|
| all | No automatic zooms on her (plan.js hook + talks one framing 'wide'; formats.js G H I K M at z 1). Check: 0 zooms in every short | /moment/the-edge-case-you-think-is-impossible/<id>/ |
| sh04 | Cut "because we sometimes build names featuring like default names" (raw 200.50-205.07, silence); screen behind her dark until "O'Brien" (manifest posterAt), the name types on her word. 25.4 s | sh04/ |
| sh05 | sh05 + sh06 MERGED: "Null errors in production" (Jennifer Null + NULL plate), 49.5 s, M title box = the topic; cover big card "~Null~ errors in production" (her old cover nudge removed: it was for the photo cover). Old sh06 -> archive/shorts-2026-11-12/ | sh05/ |
| sh07 | Format C (red card cover) -> G letterbox; title "Leap year bugs"; photo cover "~Leap year~ bugs"; cert graphic restacked so "+1 year" fits | sh07/ |
| sh09 | Cover "Names with ~accents~ can cause bugs" | sh09/ |
| sh10 | Cover big "What is ~Hyrum's law~?" + the highlighted Hyrum's law screenshot (assets/covers/sh10-frame.jpg, style frame + big, frameW 0.9) | sh10/ |
| sh11 | Starts at "Someone is going to report an issue" (raw 16.33), 57.7 s; title "Edge cases in production" (A now draws a top title); new-issue card on "report" | sh11/ |
Review: outputs/_review/shorts-2026-11-12/ (covers-sheet.jpg, changed-shorts-sheet.jpg; bin after). Manifest backup: talking-head/versions/manual/talking-head.2026-11-12-before-review.json.

## 2026-11-10: rollout to the HTTP standard (projects/ROLLOUT-BRIEF-2026-11-10.md)
| Deliverable | State | Where |
|---|---|---|
| Thumbnails SET 3 (2026-11-11 night, her 3rd rejection: no story details on thumbnails; words strangers know, "edge cases" only in titles). 10 from her shoot (1579/1580/1583/1586/1588/1590/1591/1593) through Enhance photo, face untouched (no-lift), room dimmed behind words; each follows a board item. Set 2 in ~/.Trash/edge-case-thumbnails-old-2026-11-12/ | Done, waiting on her. Mix photo 4 / flat 3 / collage 1 / other 2. Cold critic, 5 rounds, PNGs only (last round alone / with title): 09 8.5/9, 05 8/8, 03 8/8, 10 8/7, 02 7/8, 06 7/8, 01 7/7, 07 7/7, 08 7/7, 04 6/6. **Upload 09 "Testing | Real users" + "Edge Cases: Why Code That Passes Tests Still Breaks"**; Test & Compare 05 + 03. Talking-head outro card repointed to 09 + that title. Source: design/thumbnails/tools/gen-set3.py (writes index.html + content.json; --force overwrites her studio nudges) | http://localhost:7700/design/the-edge-case-you-think-is-impossible/thumbnails/ · outputs/thumbnails/overview.png |
| Shorts formats (moments/formats.js NEW, ported from dark-patterns/HTTP; manifest "fmt" + "frame9" + "poster" + "label") | Done: sh01 I · sh02 G · sh03 D · sh04 J · sh05 M · sh06 H · sh07 C · sh08 K · sh09 F · sh10 B · sh11 A (each once; H I J K M = 5 new). Set 05 type (DM Serif Display, DM Mono, Inter Tight 800/900 for H/I/J chunk captions + M box), lime/ink/red; captions turn ink over lime | outputs/_review/shorts-formats-v2.jpg |
| Covers (manifest "cover", tools/covers.py, assets/covers/) | Done, 11 (8 her still drawn at 90 % and 470 px lower on ink so the line sits above her head; 3 cards: sh03 + sh10 lime, sh07 red) | outputs/_review/covers.jpg |
| Ending | outroCard (top level): thumbnail 01, upload title, ink/lime. Every short + the teaser end on it; the teaser's old end card is off (teaser.js returns when outroCard is on). Plan.js clamps short graphics at the last word | outputs/_review/outro/ |
| Phones | pass: EF.phoneForm already uses devicePhone (visuals.js); thumbnails use .phone markup + lib/phone.js | |
| Kit | Upload checklist at the top, At a glance, section 2 (images + words + titles + scores), each short: format + editor + cover line; date line 3 | http://localhost:7700/kit/the-edge-case-you-think-is-impossible/ |

| check (shorts) | result | note |
|---|---|---|
| text-collision | pass | all 11 + teaser (fixed: graphics running into the end card; teaser's old end card) |
| label-over-graphic | pass | all 11 |
| face (text over her face) | pass | captions moved off her face (H over graphics y 922; image panels count as graphics, minus their last 0.3 s; B captions on the poster or low on her chest); sh06 + sh10 re-checked clean; cover flags (sh05/sh06/sh11 0.06-0.14) read the hidden video face, the cover draws her lower |
| short-zoom | expected | fill formats sh01 0.34, sh05 0.35 (her face is larger in this recording than HTTP's); G sh02 0.11 (letterbox, one in the set); J sh04 not measured |
Nothing exported for her. Review stills in outputs/_review/ (v2/, outro/; bin after her OK).
Waiting on her: export + post (checklist at the top of the kit); her eye on the format mix and the 11 cover lines; her verdict on thumbnail set 3 (new recommended title "Edge Cases: Why Code That Passes Tests Still Breaks"); 04 is the weakest (6).

## Done
| Deliverable | State | Editor |
|---|---|---|
| Full talking-head edit (16:9 + 9:16) | built: ~95 layout segments in 7 kinds (split, half, tile, over-the-shoulder, presenter, make room, page) + full-screen field inserts + black phrase cards; 8 "Edge case 0N / 08" chapter fields; CLEANUP cuts + "Well, let me go" cut; **correction pause** after the Azure sentence (her "2019" -> "29 February 2012", plain lime screen, 4.5 s); Joseph Tartaro (droogie), DEF CON 27 credited on the plate | http://localhost:7700/moment/the-edge-case-you-think-is-impossible/full/ |
| Shorts sh01-sh11 (9:16, 4:5 window, no overlay text, no timer, end on her last word) | built; each its own top-title + caption style (talking-head.json "efStyle"); sh07 cuts the wrong "2019" out instead of pausing | /moment/the-edge-case-you-think-is-impossible/sh01/ … sh11/ |
| Teaser (16:9, 1:1, 4:5) | **v3 rebuilt 2026-11-12** (her note "it doesn't flow"; she loved it, then: she says each edge case's name, "one item left in stock" back): double-click hook -> "someone is going to report an issue" -> 4 cards DUPLICATE ORDERS / RACE CONDITIONS / NAMES / DAYLIGHT SAVING, each named by her + a complete mini-story -> "you probably wouldn't ship anything" (music drop) -> "What do we do about this?" -> Full video ending; ~120 s; plan `talking-head/teaser/PLAN-v3.md`, v2 in `archive/teaser-v2/`. Phone form (Jennifer Null) fixed everywhere: the error line has its own room above Continue. Waiting on her to watch + export | /moment/the-edge-case-you-think-is-impossible/teaser/ |
| Motion film (16:9 + 9:16) | DROPPED 2026-11-07 (no separate film); its last version had passed 16:9 at 8/10; was 80 scenes on her cleaned voice (same cut as the full edit + the 4.5 s correction screen) | http://localhost:7700/edit/the-edge-case-you-think-is-impossible/ |
| Thumbnails (13) + Instagram (10) and LinkedIn (11 + PDF) carousels | built 2026-11-07 by the DESIGN agent in type set 05 Warm serif + mono, no thick lines, her studio photos; cold critic: thumbnails 11 / 02 / 18 at 8.5 with title (Test & Compare), 01 / 17 at 8; Instagram 8, LinkedIn 7 before its last fixes (applied, not re-scored). Notes: `design/thumbnails/README.md` | http://localhost:7700/design/the-edge-case-you-think-is-impossible/thumbnails/ · /design/the-edge-case-you-think-is-impossible/carousels/instagram/ · /carousels/linkedin/ |

## 2026-11-07 evening: her review "too much text, looks like old websites" (done)
- Her 9 notes fixed (see talking-head/HANDOFF.md): 0:04 tap path over a photo (no Step 1/2/47), "owe" not "hope", modern notification card, few-users avatars (no NULL/29 FEB montage), photo for "real users", "idempotence, like that" retake cut (also in sh01), names chapter without the O'Brien/Null sub-line, typed SQL that breaks + injection typed live, BBC screenshot alone (no repeated BBC/author/2016 labels).
- Whole edit: 20+ text graphics cut or replaced by photos / animation; no box edges anywhere (ef.js efLine draws only red error edges). On-screen words (outside captions, authored text): ~74/min -> ~31/min.
- Round 2 (same evening): half the inserts on off-black, only one form left (Jennifer Null, as a phone screen), BBC full-frame, plate/cert/leap/name visuals. Sheets: outputs/_review/before16.jpg + after16.jpg (bin after she has looked).

## Waiting on her
- Listen (nobody here can): sound effects, music, the correction pause.
- Kit questions still open: DEF CON (we credit Tartaro on screen either way), "undo" at 476.5 (captions say "undo"), "thought of" at 21.0 (captions say "thought of"), "Well, let me go" (cut; remove the last cut in talking-head.json to keep it).
- Outro clips for this video (shorts and teaser end on her last word / the end card until then).
- Chapters must be re-timed on the file she exports (`composite.mjs meta … full` prints the pause position).

- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

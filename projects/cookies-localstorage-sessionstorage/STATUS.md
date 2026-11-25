# STATUS: cookies-localstorage-sessionstorage

Last updated 2026-11-20 by the CAPTION-ACCURACY agent (section below). Before: 2026-11-19 late (text cleanup in the graphics + teaser order, her notes A and B). Earlier 2026-11-19: thumbnails reworked from her 50 picks. Before: 2026-11-13 (FULL-KIT pass: thumbnails from the board, shorts in font-board fonts + new covers, teaser v3, kit). Before: 2026-11-10 (rollout).

## 2026-11-20: caption accuracy pass (her rule 2026-11-19: "I don't want to be correcting captions")
- Every caption of the full edit, the 9 shorts and the teaser checked against a second, stronger transcription (whisper large-v3-turbo) of each one's own sound, plus short clips around every doubtful word (turbo + small.en). **4 caption fixes**: 1:04 "accept cookies, accept necessary cookies" -> "accept cookie, don't accept cookie, accept necessary cookie" (it was listed as unclear; all three passes hear "don't accept"); 3:53 "search filter tab that someone picks" -> "search filter that someone picks"; 4:32 "read by JavaScript through document.cookie" -> "read by JavaScript, too, through document.cookie"; teaser 0:22 the missing "After" of "After you log in".
- **Clip edges**: 30 short / teaser edges sat on the first sound of a word (sh06 began without "The", sh01 ended on "So", the teaser had an "S-" after "close the tab"); each moved into the silence before it. Short lengths change by at most 0.17 s. Full edit: the incognito cut edges by 0.07 / 0.13 s; length the same (318.1 s), chapters unchanged.
- Checks: composite check all, 16:9 + 9:16: text collisions 0. Diff files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt first). Backups: talking-head/build/*.before-captions-2026-11-20.
- Listen to: 3:22 / 3:51 / 5:15 "half-filled" (the models hear "an R field" / "app-filled"), 3:54 "someone picks". Old exports have the old captions: export again.

## 2026-11-19 (late): text cleanup in the graphics (her note A) + teaser order (her note B). Nothing exported
Her notes: "tiny bits of text here and there that are not needed... significantly reduce the text"; teaser: complete the stateless idea,
then "so how does the server know it's you?", then COOKIES / LOCAL STORAGE / SESSION STORAGE, then "after you log in...".
| What | Result |
|---|---|
| Text in the graphics (shared code film/scenes/ck.js + moments/plan.js, so full, shorts and teaser all change) | Words drawn outside captions: full 502 -> 252 (16:9), teaser 163 -> 89, shorts 401 -> 293 (sh01 48->25, sh02 22->14, sh03 68->34, sh04 18->18, sh05 90->78, sh06 66->44, sh07 62->38, sh08 61->34, sh09 16->8). Text items in the full edit 211 -> 140. Cut: every kicker/eyebrow ("Three places in your browser", "Cookie vs localStorage", "How long a cookie lives", "Inside the browser", "JavaScript vs your cookies", "Results · Ada's shop", "Ada's shop · most likely"), titles that repeat her or the picture ("How much fits?", "Expiry?", "The origin", "Scripts on the page", "HttpOnly" over the console, "Where it lives", "Set-Cookie" over the code), "TEST 01 · CLOSE THE BROWSER" labels + the lone crash marker, "Browser closed", "Checkout form" / "Cart" labels (cart drawing instead), product names (grey bars), "Your browser" (window dots), "shop.example", "Response" / "Every request after" (arrowheads show the direction), the banner's small print, Set-Cookie code under expiry rows, the "Gone*" footnote, "Sources: RFC 6265 · MDN" under the numbers, the Pexels photo credit, "TICKET"/"COOKIE" on the ticket, "<script src=...>" (file names only, bigger), "cart -> [...]" under localStorage, "Filled"/"Empty", the board footnote, "PLACE 01/02/03" on teaser cards, the JSON panel 5 lines -> 2. Kept: what explains the idea (request names, Server, session_id=117 chips, code she talks about, stamps Still there / Gone / Stays here, board grid + its row/column names (bigger), summary rows, MDN/WebKit credits on real screenshots). |
| "But there are two exceptions." | Cut from the full edit too (manifest full cuts [187.9, 189.45], pauses false): no Safari correction pause or card (HER-STANDARD: cut, no correction card). Her private-window line now shows a crash test (cart, "Private window", Gone). Full edit 5:26 -> 5:18; chapters after 3:08 are 7.5 s earlier: 0:00 / 0:58 / 2:15 / 3:19 / 3:58 / 4:38 (kit 1b, 1c). |
| Teaser v3.1 | Hook kept whole (stateless -> every request on its own -> doesn't remember -> "So how does the server know that it's you?") -> her opening line "Cookies, localStorage and sessionStorage." [raw 0.03-2.90] as a full orange title card at 0:20 -> "After you log in…" at 0:23 -> the rest unchanged. Frame-1 topic plate removed. 1:50.6 + 6.5 s ending. Plan: talking-head/teaser/PLAN-v3.md. |
| Checks | composite check: text collision 0 on full 16:9 + 9:16, teaser 16:9 + 9:16, sh01-sh09 (sh05's old json-line touch is gone too); labels pass 9/9; chincheck teaser 1:1 + 4:5: 0 hits; whisper of the teaser voice = the new order, clean joins. Fresh cold critic (sheets only): 7/10, flagged lone test dots, unidentified tab pill, no direction on the cookie trip, unnamed cookie row, empty expiry/set-cookie cards, board title against the top, small board labels: all fixed after (not re-scored). Not changed (critic's other points): small MDN quote crops, code panels in shorts formats, sh08 bottom empty panel (as before). |
| Sheets | outputs/_review/text-cleanup-2026-11-19.jpg (same graphic before | after: full 16:9 + shorts), outputs/_review/teaser-2026-11-19.jpg (new order in 16:9 / 1:1 / 4:5 + before | after). Bin after she has looked. |
| Backups | archive/text-cleanup-2026-11-19/ (ck.js, plan.js, formats.js, teaser.js, PLAN-v3.md, talking-head.json, kit, STATUS, HANDOFF). Her edits files untouched (only mix levels in them). |
Waiting on her: watch the full edit, a few shorts and the teaser in the studio; previews rebuild by themselves; she exports.

## 2026-11-19: thumbnails reworked from her 50 picks (projects/THUMBS-REWORK-BRIEF-2026-11-19.md). Nothing exported
| | Thumbnail | Words | Copies | Cold critic round 3 (alone / with title) |
|---|---|---|---|---|
| kept | 01b | why is my cart / still here? | board Thumbnails 21 | 7 / 7 · **UPLOAD** with "I Closed the Tab and My Cart Was Still There. Here's Why" |
| new | 18 | what did you / just accept? | pick1119-43 | 7 / 7 · Test & Compare |
| new | 17 | IT'S NOT JUST COOKIES. (Øredev photo) | pick1119-22 | 7 / 7 · Test & Compare |
| reworked | 03 | anyone can / read this. (was "localStorage isn't private.") | board Thumbnails 31 | 7 / 6 |
| kept | 08 | what's in a browser cookie? | board Thumbnails 91 | 5 / 4 with a "user: ???" ticket; reverted to the 11-16 "user: Ada" version (8 alone then), not re-scored |
| new | 15 | 4 KB vs 5 MB (chart) | pick1119-39 | 6 / 6 on grey; moved to orange after, not re-scored |
Retired (archive/thumbnails-retired-2026-11-19/): 01 (01b replaces it; its PNG stays in outputs/ for the shorts' ending card), 05, 06, 09, 10, 12, 13, and two new ones that failed: 14 (pick1119-35, 5/5) and 16 (pick1119-42, 4/4).
Three fresh critics, each a new agent seeing only YouTube-style cards mixed with 10 picks not copied. Nothing reached 8; the picks themselves scored 4-8 there. Kit: line 3, upload checklist, 1a "New title options (2026-11-19)", section 2 (new set first, earlier sets below). Sheets: outputs/_review/thumbnails-2026-11-19.jpg, outputs/_review/thumbnails-2026-11-19-retired.jpg. Studio: http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/
Waiting on her: the pick; if 01b, change the shorts' ending card picture (outroCard still 01-cart-still-here.png, not repointed by us).

## 2026-11-13: full-kit pass (projects/FULL-KIT-BRIEF-2026-11-12.md). Nothing exported; the full edit untouched (CK.FB null there).
| Deliverable | State | Where |
|---|---|---|
| Thumbnails: 9, each a different thumbnail-board composition, font-board fonts in their own colours, shoot outfit A (hard-masked cut-outs, face no-lift). 6 fresh-critic rounds | Critic round 6 (alone / title): 01 6/7, 03 7/8, 05 6/7, 06 6/7, 08 7/7, 09 6/5 (retitled after), 10 7/7, 12 6/7, 13 6/7. **None reached 8 alone; brief asks 10-12, set is 9.** Upload 01 + "localStorage Explained: Why Your Cart Is Still There"; Test & Compare 03 + 10. outroCard path unchanged | http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ · outputs/thumbnails/overview.png · outputs/_review/thumbnails-vs-board.jpg · thumbnails-320.jpg (census: words-left+her-right = 1) · design/thumbnails/README.md |
| Shorts sh01-sh09: font-board pass (talking-head/moments/fontboard.js, CK.FB; formats.js reads it), manifest "fonts" / "colours" / "board" (3 Formats refs each), covers (photo / big line / slide; Shift+Enter breaks kept), captions 2-5 words never ending on a little word, edits/<id>.json mix music -15 sfx -7 | Done. sh05: "But there are two exceptions." cut + no correction card (whisper-checked). MDN lines re-set at phone size (sh03 G, sh05 I), code 38 px. Critic round 2 on the sheets: 4-7 (weak: sh04 holds, sh08/sh09 slide holds, captions near her hands); fixes after it (sh08 to Libre Baskerville on grey, sh05 yellow sentence-case captions, new cover stills) not re-scored | outputs/_review/fb/shorts-sheet.jpg · covers-sheet.jpg |
| Teaser v3 (hook -> idea -> COOKIES / LOCAL STORAGE / SESSION STORAGE / WHO CAN READ IT? -> online-shop takeaway -> ending), ~1:48 + 6.5 s ending | Done; whisper: one coherent story; collision 0. Critic 5-6 (wants a stronger opening line, shorter 16:9 captions) | talking-head/teaser/PLAN-v3.md · outputs/_review/fb/teaser-sheet16.jpg · v2 in archive/teaser-v2/ |
| Kit | Line 3 date, upload checklist, section 2 (new thumbnails + critic scores), section 3 (Look line per short), section 4 (v3 table) | http://localhost:7700/kit/cookies-localstorage-sessionstorage/ |

| short | fmt | fonts (font board) | board Formats | cover |
|---|---|---|---|---|
| sh01 | B | Font 47 shorts-13 Young Serif | 9 47 62 | photo: How do websites / remember you? (cookies) |
| sh02 | D | Font 63 thumbs-08 JetBrains Mono | 68 63 7 | big: What's a / cookie in / your browser? |
| sh03 | G | Font 72 thumbs-17 Inter Tight + Instrument Serif | 12 37 36 | photo: How long do cookies last? |
| sh04 | J | Font 14 design-14 Bagel Fat One | 38 65 32 | slide: How do / login cookies / work? |
| sh05 | I | Font 61 thumbs-06 Montserrat | 66 27 8 | photo: Why your cart / is still there / (localStorage) |
| sh06 | M | Font 27 design-27 General Sans Italic | 69 17 34 | big: What is / sessionStorage? |
| sh07 | H | Font 50 shorts-16 Oswald | 11 68 13 | photo: Is localStorage / safe? |
| sh08 | F | Font 17 design-17 Libre Baskerville | 1 45 29 | big: Cookies vs / localStorage vs / sessionStorage |
| sh09 | K | Font 74 thumbs-19 Inter Tight Medium | 52 67 42 | slide: Where websites keep / your login, cart / and form |
| teaser | | Font 32 design-32 Oswald + design-29 DM Mono | | |

Checks: composite check 9:16 all shorts: text collision 0 except sh05 'json' lines 3/4 (the pop-up card's 1.7 deg tilt makes the checker's boxes touch; on screen 13 px apart), labels pass 9/9, 0 camera zooms (sh03 letterbox / sh04 cut-out not measured, as before), text on face only sh07 caption 9 at 6 % (21.4 s). Font audit (talking-head/tools/fontaudit.mjs): only board fonts drawn (+ Poppins in her ending). Backups: talking-head/build/*.before-fontboard.*.
Waiting on her: look at covers (0:00 in each editor) + the teaser; pick a thumbnail; previews/exports need a refresh before she exports.


## 2026-11-16: weakest thumbnails reworked (projects/WEAKEST-BRIEF-2026-11-16.md). Set unchanged
Took the 3 lowest that are not the recommended one (round-6 cold scores alone: 09 6/5, 06 6/7, 12 6/7; 01 is the upload pick, left alone). Each got a new version beside the old, a different board composition, font-board fonts in their source colours:
| new | words | board | fonts | why the old stayed under 8 |
|---|---|---|---|---|
| 06b | Where websites save your login & cart | Thumbnails 125 (her Database Indexes) | Font 91 Bricolage + DM Mono, navy on pale | tiny column heads, "her + UI card" |
| 09b | HOW YOU STAY LOGGED IN (she holds a cookie, room washed taupe) | Thumbnails 126 (her UX RESEARCH) | Font 40 Oswald cream on taupe | "her + UI card", question without a topic word |
| 12b | CLOSE THE TAB. WHAT STAYS? (notepad sketch, empty tick boxes, she ponders) | Thumbnails 91 (TWO SUM) | Font 66 Oswald black on blue + Font 83 Caveat Brush green | small struck line, checklist gives the answer away |
Fresh cold critic (PNGs only, whole set incl. new, 3 rounds; the new drafts were changed between rounds): 06 6.5/7/6 vs 06b 5.5/5/6; 09 7.5/7/7 vs 09b 7/6/6; 12 6/5/6 vs 12b 5.5/6/6. **No new version beat its old one in the final round, so none was kept in the set** (12b won round 2 only). They are in archive/thumbnails-weakest-2026-11-16/ (directions/ + png/; to bring one back, move its folder into design/thumbnails/directions/ and run `node render.mjs <id>`). Sheet: outputs/_review/thumbnails-before-after-2026-11-16.jpg. Kit section 2 has a note; recommendation unchanged (01).
**01b added (coordinator's follow-up):** 01 with only the critic's repeated fix: the two empty grey cart squares now hold generic product drawings (running shoe, water bottle: design/thumbnails/assets/collage/product-shoe.svg, product-bottle.svg, editable as pictures p1/p2 in the studio). Fresh cold critic (PNGs of the set incl. 01b): **01 5 -> 01b 7**, so 01b is KEPT in the set (directions/01b-cart-still-here, outputs/thumbnails/01b-cart-still-here.png; pair added to the sheet). Recommendation stays 01; 01b scores higher. Same round: 08 8 (first 8 alone), 03 09 10 13 7, 05 06 6, 12 5.
Critic's recurring points for the whole set (none reached 8 in this test either, best 7: 01 03 08 09 10 13): 01's empty grey item squares; 03's small "Local storage" header + cart row; 05's empty phone halves on pale grey; 08/13 share the cookie photo + mono label card; 01/10 both yellow + UI mock-up; several thumbnails give the answer away (06, 12, 13, 05).

## State
Recorded (`kit/raw-video.mov`, 5:21 raw, 5:20 after the cut list in `kit/transcripts/CLEANUP.md`: only 1.4 s of room tone at the end). **Her kit's segments 7, 8 and 9 (cookie flags, where to store your login token, Laravel) were not recorded**, so this video is segments 1-6 plus a shorter summary.

## 2026-11-07 evening: "show, don't type" rework (same as the approved edge-cases pass)
- Full edit, shorts and teaser: cards and keywords that re-typed her sentences are gone (her on camera, one word behind her, or a
  picture instead); "it only stores strings" is now typed code; the box outlines (old-website look) are gone everywhere; about
  half the inserts are on off-black now; captions sit on an ink band under the graphics.
- On-screen words: 58 -> 34 a minute (typed code included); 51 -> 25 a minute without the code lines.
- Compare: `outputs/_review/before16.jpg` and `outputs/_review/after16.jpg`.
- To decide: the checkout form still shows in a few places (it is the topic); OK, or should it become a phone screen?

## Done
- Refined kit `kit/refined-kit.md` (2026-11-02): live research (no news hook; evergreen search topic; her own older video on the same topic did 22.8x her usual views), 11 titles (recommended: "localStorage vs sessionStorage vs Cookies (What Goes Where)", 59 characters), 9 thumbnail concepts (Test & Compare T1 "FORM GONE. CART STAYS.", T7 "REFRESH vs CLOSE TAB", T10 "CLOSE TAB?"), description, 6 chapters (cleaned edit + 12.7 s cold open), tags, first 30 seconds, edit notes, 9 shorts from the recording + 3 independent short scripts (the missing segments), teaser plan (14 bites), carousels, LinkedIn / X / community posts, essay fixed to the recording. Two cold-review rounds.
- Her original kit moved to `archive/original-kit/14-cookies-localstorage-sessionstorage-kit.md`.

## Next
1. Her answers to the questions below.
2. Apply the cut list; build the motion film (new look, 2-3 directions), the full talking-head edit with the cold open (1f), then re-time the chapters to the exported file.
3. Thumbnails (start with T1, T7, T10), shorts SH1-SH9, teaser, carousels.
4. If she agrees: part 2 video "Where to Store Your Login Token: localStorage or Cookie?" + IS1-IS3.

## Waiting on her
1. Segments 7-9: record them as a part 2 video (recommended) or as shorts only? Or were they recorded in another file?
2. "But there are two exceptions" (raw 3:08) only has one: on-screen card with both (recommended) or cut the line?
3. OK to open with her own cart + form lines moved to the front (12.7 s cold open)?
4. Listen at raw 1:03-1:07 ("accept cookies"?) and 3:51-3:55 ("search filter"?).
5. OK to link her older video on this topic (https://www.youtube.com/watch?v=3YNOsgIrUvI) in the description and end screen?
6. A photo of her without the mic, holding a cookie / at a laptop, for T3 and T6.


2026-11-02 14:19: her rules applied (no faceless videos: SH2 and IS1 now have her on camera; IS1-IS3 marked as word-for-word scripts).


## Directions (2026-11-02, waiting on her pick)
| Film / edit look: 3 directions (A Crash test "what survives", B Close the tab, C The cloakroom), 4+ stills 16:9 + 2+ stills 9:16 + a 7-8 s motion test each, talking-head frames, SH6 short frames, an in-edit correction frame ("two exceptions") | done, waiting on her pick | `film/stills/directions/` (README.md, overview.png) | round 1: A 7.2, B 6.3, C 6.8; round 2: **A 7.5 (recommended, with C's cloakroom as one scene in A's style)**, B 6.5, C 6.0; all 8 round-2 fixes for A applied, not scored again |
- Pick ONE look for the whole video (directions README).


## Build (FILM agent, 2026-11-03 → 11-06), her pick A · Crash test + the cloakroom as one scene
| Deliverable | State | Where (studio) | Score |
|---|---|---|---|
| Full talking-head edit 16:9 (+9:16 layout) | built, round-1 fixes applied | http://localhost:7700/moment/cookies-localstorage-sessionstorage/full/ | critic 6 (round 1); fixes applied, not re-scored |
| Shorts SH1-SH9 (9:16, 3:4 window, own top-title + caption style each, no timer, end on her last word) | built | /moment/cookies-localstorage-sessionstorage/sh01/ … sh09/ | not scored |
| Teaser 16:9 / 1:1 / 4:5 (17 bites, 3 title cards, music drop, end card) | built | /moment/cookies-localstorage-sessionstorage/teaser/ | not scored |
| Motion film | **dropped (her rule 2026-11-07: no separate motion film)**; its scene code stays only as the look file the edit uses (`film/scenes/ck.js`) | (not a deliverable) | — |
- Correction in the edit: "two exceptions" → a 6 s "pause her" (her picture held) types "Update: exception 2 is Safari…", then the card shows both exceptions with the WebKit sentence highlighted (credited). Film: the same card over her words.
- No pause tightening: the take is clean (CLEANUP: only 1.4 s of room tone at the end), so her rhythm is untouched.
- Chapters re-timed to the full edit in the kit (1b/1c).
- No outro clip (none recorded for this video): shorts end on her last word, the teaser on its own end card.
- Unclear words captioned as: "accept cookies, accept necessary cookies" (1:03) and "search filter tab that someone picks" (3:51): she can fix either caption in the editor.

- 2026-11-07: re-typed to set 03 Heavy + light (Helvetica Neue Bold + Light, DM Mono labels; TYPE-SYSTEM.md): no Saira/Chivo, no outlined captions, stamps without frames, every outline a 2 px hairline at most, marker without a ring, shorts titles/captions without boxes.

## Thumbnails + carousels (DESIGN agent, 2026-11-07)
| Deliverable | State | Where | Scores |
|---|---|---|---|
| Thumbnails set 2: 9 options, your type set 03, your new photos (5 photo, 2 flat, 2 other; no collage) | done, waiting on your pick | `outputs/thumbnails/` (+ overview.png), studio http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/, notes `design/thumbnails/README.md` | fresh cold critic R3 7.3 set; 05 8/8, 02 7.5/8, 09 7.5; fixes after R3 not re-scored |
| Instagram carousel (10 slides, 1080x1350) | done | `outputs/carousels/instagram/`, studio /design/cookies-localstorage-sessionstorage/carousels/instagram/ | R2 6.5, fixes applied after, not re-scored |
| LinkedIn carousel (10 slides + carousel.pdf) | done | `outputs/carousels/linkedin/`, studio /design/cookies-localstorage-sessionstorage/carousels/linkedin/ | as Instagram |
Waiting on you: thumbnail pick; a photo of you in a real room (no mic) if you want collage / room-photo options too.

- 2026-11-07 (final for this round): set 03 everywhere (full, 9 shorts, teaser); critic rounds on contact sheets: full 6, teaser 6 (all listed fixes applied: readable receipt crops of the exact MDN / WebKit lines, captions switch to ink on light panels, board footnote one line, sentence-case cards, graphics below the shorts label, bare 4 KB / 5 MB numbers, end card Bold + Light). Not re-scored (her call: finish). Checks: textCollision pass, layoutVariety pass (split 26 %, presenter 26 %, tile 15 %, ots 14 %), sh05 shortZoom 0.16 median pass, labelOverGraphic pass, every moment loads in 16:9 and 9:16. Review sheets binned (~/.Trash/cookies-review-2026-11-07/).
- Open: the "pause her" typing caret is the engine's (steady while typing); her listen; her answers to the kit questions (cold open not added, segments 7-9 not recorded).
- 2026-11-10: every short (sh01-sh09) and the teaser now end on the drawn "FULL VIDEO ON YOUTUBE" card (talking-head.json `outroCard`: thumbnail 02-close-the-tab.png, title "localStorage vs sessionStorage vs Cookies (What Goes Where)", off-black + white + crash red). It replaces the teaser's own end card and the shorts' 0.5 s tail (each short is now 6 s longer). Review stills: outputs/_review/outro/. Swap the thumbnail in the editor (scrub to the end, click it, "Change picture…") if you pick another one.


## 2026-11-10 rollout (ROLLOUT-BRIEF-2026-11-10): thumbnails, shorts formats, covers, ending
| Deliverable | State | Where |
|---|---|---|
| Thumbnails: NEW set of 10 from her shoot (outfit A white shirt: 1548 1549 1552 1553 1554 1555 1561 1563, none of dark-patterns' picks; Enhance photo + cut-out, class no-lift). Old set 2 (studio portraits) binned to ~/.Trash/cookies-localstorage-sessionstorage-thumbnails-old-2026-11-10/ | Done. Mix photo 4 / flat 2 / collage 2 / other 2. Cold test (fresh agent, PNGs only, two rounds): final 6-8 alone, 7-8 with title; every fix after round 2 applied (not re-scored). **Upload 01 "Why is my cart still here?" + "localStorage Explained: Why Your Cart Is Still There"**; Test & Compare 02 + 03 | http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ · outputs/thumbnails/overview.png · builder design/thumbnails/tools/make-set-2026-11-10.py (overwrites content.json: only to rebuild) |
| Shorts: format mix (talking-head.json "fmt"; moments/formats.js, ported from dark-patterns/HTTP) | Done: 9 shorts, 9 different formats, 5 of the new ones (H I J K M) | outputs/_review/shorts-formats-v2.jpg |
| Covers (first 0.1 s of each short, editable at 0:00; 3 cards: sh02 + sh08 yellow, sh06 concrete) | Done | outputs/_review/covers.jpg (full + 3:4 crop) |
| Ending: outroCard thumb -> 01-cart-still-here.png, title -> "localStorage Explained: Why Your Cart Is Still There" | Done | outputs/_review/outro/ |
| Phones in the edit | n/a: no phone is drawn in this project's moments / film code (checked ck.js, common, visuals, plan, teaser) | |
| Kit | Updated: Upload checklist, section 2 = new thumbnails as images, each short's format / editor / cover | http://localhost:7700/kit/cookies-localstorage-sessionstorage/ |

| Short | Format | Cover line | Editor |
|---|---|---|---|
| sh01 | B | Why websites need cookies | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh01/ |
| sh02 | D | What is a browser cookie, really? (card) | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh02/ |
| sh03 | G | How long does a cookie last? | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh03/ |
| sh04 | J | What's inside your login cookie? | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh04/ |
| sh05 | I | Why your cart is still there tomorrow | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh05/ |
| sh06 | M | Why your form vanished when you closed the tab (card) | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh06/ |
| sh07 | H | Any script on your page can read localStorage | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh07/ |
| sh08 | F | Cookies vs localStorage vs sessionStorage (card) | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh08/ |
| sh09 | K | Where shops keep your login, cart and form | http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh09/ |

Checks (composite check 9x16, every short): textCollision pass 8/9 (sh05: two typed code lines 'JSON.stringify' / 'JSON.parse(' sit 2 px apart while typing, readable); labelOverGraphic pass 9/9; shortZoom pass except sh03 G letterbox 0.096 (on purpose, one per set), sh05 I fill 0.301 (full-bleed, on the line on purpose), sh04 J cut-out (not measured); text-over-face: only the drawn ending card (no footage under it) and sh07/sh09 captions at 1-9 % (the full-bleed caption sits on her chin line). Fixes made in the port: B captions on her picture (white on concrete did not read), typed code laid out for phone width, I-format source lines centred in the card, J keeps her in front of the screen all through, no graphic runs into the ending, the Safari correction box sits lower in full-bleed shorts (it covered her face).
Waiting on her: the thumbnail pick (01 recommended); the cover lines (edit at 0:00 in each short); the title: 01's pair title vs the search title "localStorage vs sessionStorage vs Cookies (What Goes Where)".

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.
- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

# STATUS: dark-patterns

Last updated 2026-11-20 by the CAPTION-ACCURACY agent (section below). Before: 2026-11-19 (thumbnails reworked from her 50 new picks).

## 2026-11-20: caption accuracy pass (her rule 2026-11-19: "I don't want to be correcting captions")
- Every caption of the full edit, the 14 shorts and the teaser checked against a second, stronger transcription (whisper large-v3-turbo) of each one's own sound, plus short clips around every doubtful word (turbo + small.en). **5 caption fixes**: 4:17 "The page will say, oh, only two left" -> "A pair of shoes would say, oh, only two left"; 6:50 "you actually see a dark pattern" -> "you're asked to do the dark pattern"; 6:01 "pre-select" -> "pre-selected"; 4:11 "shopping apps, the website" -> "shopping apps, where the website"; teaser: "best for the user." lost its last word.
- **Clip edges**: almost every short and teaser edge sat a few hundredths of a second late, on the first sound of a word (shorts began on a clipped "Another": "Other dark pattern", "That pattern"; others ended on "A-" / "Th-" of the next sentence). 58 edges moved into the silence before that sound. Short lengths change by at most 0.17 s. Full edit: the A/B cut edges by 0.07 / 0.1 s; length the same (419.5 s), chapters unchanged.
- Checks: composite check all, 16:9 + 9:16: no new text collision you can see (sh03 / sh13 flag a hidden box behind the end card for 0.1 s; stills in the diff folder show nothing). Diff files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt first). Backups: talking-head/build/*.before-captions-2026-11-20.
- Listen to: 1:00 "Another pattern is hard to cancel" (the models hear "That pattern" / "Now that pattern"), 6:50 "you're asked to do the dark pattern" (one pass heard "build"), 7:06 the cut after "the honest version". Old exports have the old captions and edges: export again.

## 2026-11-19: thumbnails reworked from her 50 picks (projects/THUMBS-REWORK-BRIEF-2026-11-19.md)
- Set is now **7** (was 13): kept 02, 04, 08b, 09, 11 (small fixes: 02 "Sale ends in" bigger; 04 tag "€40 → €52" without "?"; 08b "+ cleaning spray" bigger, arc no longer cut by the top edge; 09 headline off the top edge, note bigger; 11 headline bigger). NEW 13 "THIS IS RUDE on purpose." (copies pick1119-43; phone with "No thanks, I hate saving money"), NEW 16 "SIGN UP 1 click / CANCEL good luck." (copies pick1119-45; Font 31 colours).
- Retired to archive/thumbnails-retired-2026-11-19/ (folders + PNGs): 01 (calm face, words like 07), 03 (5-6), 03b (busy at phone size, 16 says it simpler), 06 (5-6, tiny text), 06b (6-7, small pop-ups), 07 (template card), 08 (5, 08b replaces it), 12 (shared 02's 09:59 timer, clipped LEGAL), and three new tries that stayed under 7: 14 "WHEN ONE CLICK COSTS YOU MORE..." (pick1119-02; 5/6 then 3/5), 15 "Shopping apps are not your friend." (pick1119-26, Øredev stage photo; 6/6, 5/6), 17 "online shops tricked you." (pick1119-10, shoot 1561 then 1559; 5/7, 5/6, 5/6).
- Cold critic, YouTube-card style (fresh agent each round; cards with titles in a feed of 8-10 of her picks + the thumbnails alone at 320 px; no notes). Alone / with title, R1 · R2 · R3: 08b 7/8 · 7/8 · **8/8**; 02 7/7 · 7/8 · 7/8; 16 6/7 · 5/7 · 7/8; 09 7/7 · 7/8 · 7/8; 04 7/7 · 6/7 · 7/8; 13 5/7 · 4/7 · 6/7; 11 6/7 · 6/7 · 5/7. Fixes after R3 (08b arc, 09 top margin) not re-scored.
- **Upload: 08b + 'How Websites Trick You Into Buying Things You Didn't Add'** (critic's pick in R3). Test & Compare: 02 and 16. Previous: 02 + 'That Countdown Timer Is Fake. 11 Tricks Online Shops Use'. The shorts/teaser ending card (outroCard in talking-head.json) still shows 02 + that title: NOT repointed (her call).
- Layout census (320 px): words left + her right = 02, 09 only. Faces: 02, 08b, 09 (same white-shirt cut-out, critic flags it); 04, 11, 13, 16 no face.
- Kit: 1a "New title options (2026-11-19)", section 2 rewritten (7, 2-3 titles each), At a glance + upload checklist point to 08b; line 3 updated.
- New photo assets: assets/oredev/ (copied from learn-to-code: 55642240014-cut, 55642239799, -cut; 55642240014-bust = cut above the lectern), assets/shoot/1561.jpg + -person.png (Enhance, strength 0.7). Used only by retired tries now. Fonts added to lib/set.css: Switzer, Instrument Serif italic, Caveat (font board).
- Sheets: outputs/_review/thumbnails-2026-11-19.jpg (cards + score + the board item / pick each copies), outputs/_review/thumbnails-2026-11-19-retired.jpg. Edit: http://localhost:7700/design/dark-patterns/thumbnails/ . Nothing exported.

| check | result | note |
|---|---|---|
| board-copy | pass | each beside its source on thumbnails-2026-11-19.jpg; new ones copy pick1119-43 and -45 |
| fonts-from-board | pass | Font 64, 77, 66, 5+112, 18+26, 26, 31 in their specimen colours |
| stands-alone | fixed | 13 words changed after R1 ("IS THIS ON purpose?" -> "THIS IS RUDE on purpose."); critic still says it needs the title |
| honest | pass | generic UI; prices from the video; "charged for a whole year after a free trial" = her line in the video |
| small-size | pass | alone-320 sheet read by the critic every round |
| editable | pass | every word in content.json text (data-k), photos data-img, moves data-move |
| layout-census | pass | 2 of 7 words-left + her-right |
| delivered | n/a | she exports; nothing in Downloads |

## 2026-11-17 (night): shorts, weakest pass (projects/WEAKEST-BRIEF-2026-11-16.md)
- **sh14** (lowest, 16 s of talking): her opening line stays her; on her next line ("the way to counter it… we can get sued") the full edit's team photo (px-35184839) comes in as the bottom half, hard cut (no dark gap), up to "sued". Critic 4 -> 5 (round 1), 3 -> 4 (round 2). Kept. Critic still wants a real visual instead of a stock photo (e.g. a pushback message) and the end card shorter. Sheet outputs/_review/sh14-before-after-2026-11-16.jpg.
- **sh04** (coordinator note: "€40" touching the shoe photo): the price block keeps a 56 px gap from the photo in 9:16 side-by-side. Critic 6 -> 6 (round 1, too small to see on the sheet), 6 -> 6.5 with the full-size frame (round 2). Kept. Sheets outputs/_review/sh04-before-after-2026-11-16.jpg + -detail.jpg.
- **sh05** tried (the trial card from "a free trial"): reverted before scoring, it brought back the empty-card hold an earlier critic had fixed.
- Checks: composite check sh04 / sh14 9:16: 0 collisions, labels in band, zoom pass. Full 9:16 has one hit at 2:24 (trial day30 / charged; not touched by this pass). Every moment builds.
- Files: talking-head/moments/plan.js (s100b 'builders-s', short only), talking-head/moments/formats.js (pass() forwards "enter"; default unchanged), film/scenes/dp.js (DP.price gap). Old copies: archive/weakest-2026-11-16/ (plan.js, formats.js, dp.js, sh05.js). Previews need a refresh before she exports.

## 2026-11-12: A/B testing part cut (her note)
- Cut raw 4:33.6-5:03.2 in the full edit and SH11 (talking-head.json + cut list rebuilt). SH3, SH6, SH9 already skip that range. Full edit now 7:09 (with the 9 s Amazon card). No A/B graphic left; the "own goal" stretch gets a slow push so it isn't a dead hold. Stills: `outputs/_review/ab-cut/` (bin after her OK).
- Teaser: the "But an A/B test only measures the number you pick" bite removed; WHY? card ("It comes down to numbers") now goes straight into "A team is chasing a number… not really about what is best for the user" (team photo split, then close). 12 lines, 80.8 s + 6.5 s end card = 1:27. Voice checked with whisper: coherent.
- SH11 retitled "Why companies use dark patterns" (16 s), cover "Why apps trick you: it's the numbers" (frame raw 304.4, eyes open).
- Kit: description, chapters (0:00, 0:44, 2:28, 4:26, 4:42, 5:20, 6:41 on the edit's word times), SH11 block, teaser table, carousel slide 9, LinkedIn posts, X thread, essay rewritten without A/B testing.

## 2026-11-16: weakest thumbnails reworked (projects/WEAKEST-BRIEF-2026-11-16.md)
- Took the lowest of the set: 03 (6), 06 (6), 07 (5.5-6.5); 08 (Test & Compare) also scored 5 in every fresh round, so it got a new version too. 02 untouched (still the upload pick).
- New versions sit BESIDE the old ones (old PNGs + sources unchanged): **03b "why it's so hard to cancel"** (her left, cancel maze CANCEL -> ARE YOU SURE? -> CALL US TO CANCEL; copies Thumbnails 129, Font 10), **06b "websites that won't let you leave"** (her in her room between two leave-pop-ups; Thumbnails 123, Font 69 + Font 58), **08b "I didn't add this!"** (her centred on blue, IN MY CART €40 -> AT CHECKOUT €45 + cleaning spray; Thumbnails 81, Font 66).
- Cold critic (fresh agent each round, PNGs of the whole set alone, no notes), scores per round: 03 5/6/5 -> 03b 7/6/6 · 06 5.5/5/6 -> 06b 7/7/6 · 08 5/5/5 -> 08b 7/7. Kept: all three beat the old ones. None reaches 8 yet (critic: faces too calm, mockup text small at phone size).
- 07: the new try (07b "don't take the bait", a marker doodle of a BUY NOW button on a fishing hook) scored 6/3/4 vs old 5/5/5, so it was NOT kept (moved to ~/.Trash/dark-patterns-07b-2026-11-16/). 07 stays as it was.
- Layout census (320 px): words/card left + her right = 02, 09 only (03b is her left, 08b her centred).
- Critic flags still open (not changed, for her eye): 03 vs 03b, 06 vs 06b, 08 vs 08b are pairs on the same topic (pick one of each); 02 and 12 share the 09:59 timer card; 12's "LEGAL" is clipped behind her head (on purpose, reads as a glitch to the critic); 01 / 07 words close ("shops that trick you" / "why shops trick you").
- Sheet: outputs/_review/thumbnails-before-after-2026-11-16.jpg (bin after her OK). Overview refreshed: outputs/thumbnails/overview.png. Edit: http://localhost:7700/design/dark-patterns/thumbnails/ . Nothing exported.

## 2026-11-13: thumbnails rebuilt from the boards (her 11-12 notes)
| Deliverable | State | Where |
|---|---|---|
| 10 thumbnails, each copying a different thumbnail-board item (Thumbnails 101, 68, 116, 91, 124, 89, 55, 98, 36, 119; 01 03 06 08 12 rebuilt 2026-11-13 so only 02 is 'words left, her right'), fonts only from the font board in their specimen colours, words a stranger understands, nothing about A/B testing | Done. Cold critic 6 rounds (fresh agent each, PNGs alone, with titles, layouts); round 6: 02 and 09 at 8, the rest 5.5-7 (fixes after round 6 not re-scored); 1 of 10 'words left, person right'. Dropped 2 (collage, "how apps make you say yes"). **Upload 02 "this timer is fake" + 'That Countdown Timer Is Fake. 11 Tricks Online Shops Use'**; Test & Compare 08 + 09. outroCard switched to 02 + that title | http://localhost:7700/design/dark-patterns/thumbnails/ · outputs/thumbnails/overview.png · outputs/_review/thumbnails-vs-board.jpg · outputs/_review/thumbnails-320.jpg · kit section 2 |
| Old set of 11 (2026-11-10) | Binned | ~/.Trash/dark-patterns-thumbnails-old-2026-11-12/ |

| check | result | note |
|---|---|---|
| board-copy | pass | thumbnails-vs-board.jpg: each beside its board item; 10 different compositions; cut-out beside a headline: 02, 09 only |
| fonts-from-board | pass | Font 65, 64, 77, 25, 58, 9, 31, 5, 112, 18, 26, 71; each in its specimen's text/background colours (sampled from the specimen PNGs); picks.json has no "no" |
| stands-alone | fixed | words rewritten after each critic round (e.g. "IT'S A TRAP" -> "FREE TRIAL TRAP", "is this even" -> "are fake timers") |
| honest | pass | generic UI only, no shop brand; example prices from the video (shoes EUR 40, cleaning spray EUR 5, gift wrap EUR 2.99); receipt = Pexels free licence |
| small-size | pass | 320 px sheet read by the critic and by eye |
| editable | pass | every word in content.json text (data-k), objects data-move, photos data-img |
| banned-list | pass | flat grounds, no gradient grounds, no glow, no text outlines |
| delivered | n/a | she exports; nothing in Downloads |

## State
Recorded (raw `kit/raw-video.mov`, 7:41.5; 7:37.9 after the CLEANUP cuts in `kit/transcripts/CLEANUP.md`). Refined kit written 2026-11-02 (`kit/refined-kit.md`); her kit moved to `archive/original-kit/54-dark-patterns-kit.md`. Nothing built yet (no film, edit, shorts, thumbnails, carousels or teaser).

## Done
- Refined kit: 12 titles after the cold review (recommended 'Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name', 58 characters), 12 thumbnail concepts (Test & Compare pairs: title 1 + T9 "GUILT-TRIP BUTTONS", title 2 + T2 "I DIDN'T ADD THIS", title 3 + T4 "€40 → €52"), description with 7 chapters timed to the cleaned edit, tags, first 30 seconds, edit notes, 14 shorts from the recording + 3 independent short scripts (her on camera), teaser plan, carousels plan, posts, essay, research.

## Next
1. Cold review done 2026-11-02 (kit 7d); rewrites applied, not re-scored.
2. Her answers to the 18 questions at the top of the kit (urgent: ending cut, the "listen" items, posting before 11 Nov 2026, photos without the mic).
3. Apply the cuts, then the motion film (new look: 2-3 directions first), full talking-head edit, shorts, thumbnails, carousels, teaser.
4. Re-time the chapters to the exported talking-head file.

## Film directions (2026-11-02)
| Deliverable | State | Where |
|---|---|---|
| Film directions A Field guide / B Version A-B / C Blown up + talking-head and SH9 style frames | Done, waiting on her pick. Critic round 2: A 7.4, B 7.0, **C 8.1 (recommended)**, talking-head 7.3, shorts 7.5 | `film/stills/directions/README.md`, `overview.png`, `*/motion-test.mp4` |

## Waiting on her
- Pick a film look (A, B or C; recommended C with A's specimen labels and B's split as one scene) and listen to the three motion tests.
- Kit questions 1-18 (top of `kit/refined-kit.md`).
- Record IS1 (Microsoft Edge report) this week and IS2 (Digital Fairness Act, version A) before 11 Nov 2026.
- 2026-11-02: cold review run by the main session (kit 7d); rewrites applied, not re-scored.

## Thumbnails and carousels (design agent, 2026-11-02)
| Deliverable | State | Where |
|---|---|---|
| 22 thumbnails, look C, mix 9 photo / 4 collage / 5 flat / 4 other, 2-3 titles each | Done, cold critic R1 + R2 (best: 22 8/8.5, 02 7.5/8, 15 7.5/8, 16 7.5/8, 14 7.5/8). Waiting on her pick and her photos | http://localhost:7700/design/dark-patterns/thumbnails/ · `outputs/thumbnails/` · `design/thumbnails/README.md` |
| Instagram carousel, 10 slides 1080x1350 | Done, critic 7 then fixes (not re-scored) | http://localhost:7700/design/dark-patterns/carousels/instagram/ · `outputs/carousels/instagram/` |
| LinkedIn carousel, 10 slides + PDF | Done, critic 6.5 then fixes (not re-scored) | http://localhost:7700/design/dark-patterns/carousels/linkedin/ · `outputs/carousels/linkedin/carousel.pdf` |

| check | result | note |
|---|---|---|
| her-words | pass | carousel quotes checked against transcript.srt (intentional, one click, page after page, €5 cleaning spray, €2.99 gift wrap, refresh starts again, "literally charged me for a year's subscription", "we could be sued for this"); facts EC IP/23/418, FTC Sep 2025, UCPD/GDPR/CRD |
| stands-alone | fixed | critic R1/R2 cold reads; IG cover now names confirmshaming; LI cover rewritten (critic: "they" had no noun) |
| titles-paired | fixed | 2-3 kit titles per thumbnail (all 40-60 chars, keyword early); pairs that repeated or contradicted the words re-assigned after both rounds |
| no-dashes-no-hype | pass | no em dashes in any visible text |
| text-safe-area | fixed | thumbnails: badge zone cleared on 22, 04, 20, 01; carousels: build.mjs margin/footer checks clean |
| no-collisions | fixed | phone off her face (04), checkbox off her mouth (07), serif line off her mouth (12), black/pink edge bars removed (05, 10-13) |
| text-contrast | pass | headline on the pink-washed rooms moved to ink blocks / lighter wash (02, 05); design editor warns live |
| type-size | pass | carousels: mono >= 32 px, footer 34 px, no one-word last lines (build.mjs) |
| banned-list | pass | flat grounds, no glow/gradient; sticker shadows removed from white collage cards |
| unique-look | pass | built from the film's new look C; not started from another project's thumbnails |
| small-size | pass | sheets at 320x180 and 168x94 read by the critic; weak small reads (21 release text, collage labels) enlarged |
| editable | pass | both editors load (thumbnails list + carousel decks via the studio API); every text in content.json, photos swappable |
| delivered | n/a | her rule 2026-10-26: she exports; nothing put in Downloads |
| reading-time, motion, sound, format | n/a | stills only |

## Build (FILM agent, 2026-11-02 → 11-03): her pick C · Blown up + B's split
| Deliverable | State | Studio |
|---|---|---|
| Full talking-head edit (16:9, editable in 9:16) | Built, 7:37 with the pause. Cleaned (CLEANUP restart + kit Q1 ending cut). ~100 layout segments (L1, L2, L5, L10, L14-L19, full inserts, black phrase cards), real sources with credits, Amazon slip corrected with the engine's "pause her" card (fix-amazon). Critic r1 6.5 → fixes; r2 see HANDOFF | /moment/dark-patterns/full/ |
| 14 shorts (kit section 3) | Built, 9:16, 4:5 window, a different top-title + caption style per short (talking-head.json dpStyle). No outro clip yet (she records one for this video), no timers | /moment/dark-patterns/sh01/ … sh14/ |
| Teaser 16:9 / 1:1 / 4:5 | Built, 1:42, 3 title cards, music drop on "we could be sued for this", own end card | /moment/dark-patterns/teaser/ |
| Motion film 16:9 + 9:16 | Built, 7:31, 92 screens on her cleaned voice, lens wipes at each pattern, sound mixed (-14.8 LUFS) | /edit/dark-patterns/ |
Nothing exported for her (she exports). Review renders in outputs/_review/ (bin after her OK).
Open for her: outro clip for this video; listen to the ending join (7:2x "...the honest version. We can make the world a better place"); question 3 of the directions (captions: her usual cream ones are used).

## 2026-11-07 (her type set + lean finish)
- Re-typed to set 03 Heavy + light (Helvetica Neue 700 + 300, DM Mono labels) in the shared look `film/scenes/dp.js` + `talking-head/moments/common.js`: full edit, 14 shorts, teaser. No outlines, rings or boxes on captions; lines 2 px max; the magnifier is a flat white disc with a soft shadow; cards and words-behind in sentence case; shorts have ink around her (no white captions on pink), no "n / 11" counter, no second title.
- Amazon slip: engine pause `fix-amazon` (9 s card) in the full edit; shorts 03/13 show a "Correction" card while she keeps talking.
- Thumbnails (22) + Instagram/LinkedIn carousels re-typed (old families aliased to Helvetica Neue / DM Mono in `design/thumbnails/lib/dp.css`, `design/carousels/shared/base.css`); photo-led thumbnails and the carousel end slide use her new photos (`library/her-photos`, scenes in `design/thumbnails/assets/her/`).
- Motion film dropped as a deliverable (her 11-07 note); its scene code stays in film/scenes (the edit reuses dp.js).
- Critic scores before the last fixes: full edit 6-7, shorts 5-6, teaser 5, thumbnails 6, Instagram 8, LinkedIn 7. Last fixes checked on a contact sheet only (her instruction: no more critic rounds).
- Nothing exported for her; review renders binned (~/.Trash/dp-review-2026-11-07, -07b).

## 2026-11-07 evening: "show, don't type" rework (her rules FEEDBACK.md 2026-11-07 evening; edge-cases model)
| Deliverable | State | Where |
|---|---|---|
| Full talking-head edit, shorts, teaser | Reworked: re-typed sentences gone, pictures and animation instead, about half the inserts on off-black. On-screen authored words 726 -> ~220 (95 -> 29 per minute, same counter for edge cases: 91 -> 42). Checks clean (collisions: only the old trial-card one, layout variety pass) | /moment/dark-patterns/full/ · /moment/dark-patterns/teaser/ · /moment/dark-patterns/sh01/ … sh14/ |
| Before / after sheets for her | outputs/_review/before16.jpg, after16.jpg (bin after she has looked) | |
Waiting on her: a look at the sheets / the editor; one listen: 5:52 "So what's the law…? Are there even laws…?" (she asks it twice; kept as a rhetorical repeat).

## 2026-11-10: rollout to the HTTP standard (projects/ROLLOUT-BRIEF-2026-11-10.md) — URGENT, post before 11 Nov
| Deliverable | State | Where |
|---|---|---|
| Thumbnails: NEW set of 11 from her shoot (outfit A white shirt, Enhance photo + cutout, class no-lift); old 22 binned to ~/.Trash/dark-patterns-thumbnails-old-2026-11-10/ | Done. Mix photo 4 / collage 1 / flat 4 / other 2. Cold test (fresh agent, PNGs alone then with titles): 6-8.5 alone, 6.5-8.5 with title; every fix applied after (not re-scored). **Upload 01 "Shops do this on purpose" + title 'Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name'**; Test & Compare 06 + 08 | http://localhost:7700/design/dark-patterns/thumbnails/ · outputs/thumbnails/overview.png · design/thumbnails/README.md |
| Kit | Upload checklist at the top, At a glance, section 2 (images + words + titles), chapter 7 re-timed to 7:13 (the 9 s Amazon card), each short: format + editor + cover line | http://localhost:7700/kit/dark-patterns/ |
| Shorts formats (moments/formats.js, manifest "fmt" + "frame9" + "poster") | Done: sh01 D · sh02 M · sh03 H · sh04 B · sh05 A · sh06 J · sh07 I · sh08 F · sh09 C · sh10 H · sh11 K · sh12 M · sh13 G · sh14 A | outputs/_review/shorts-formats-v2.jpg |
| Covers (manifest "cover", tools/covers.py, assets/covers/) | Done, 14 (11 photo, 3 pink cards: sh04, sh08, sh12) | outputs/_review/covers.jpg |
| Phones | n/a: no phone is drawn in this project's moments / film code (thumbnails use .phone markup + lib/phone.js) | |

| check (shorts) | result | note |
|---|---|---|
| text-collision | pass | all 14 |
| label-over-graphic | pass | all 14 |
| face (text over her face) | pass / note | cover lines clear of her face after the fix; small caption touches remain (sh01 8.4 s 0.16, sh03 9.6 s 0.18, sh10 18 s 0.17); card covers flagged only because the check reads the hidden video face |
| short-zoom | pass / expected | fill formats sh07 0.313, sh11 0.318 (playbook: full-bleed 0.31-0.32 on purpose); G sh13 0.10 (letterbox, one in the set); J sh06 + C sh09 not measured (cut-out / presenter) |
| gaps | fixed | sh03: the cancel pages now show (plan.js fallback when "you know like this" is cut) |
Nothing exported for her. Review stills in outputs/_review/fmt/ (bin after her OK).
Waiting on her: export + post (checklist at the top of the kit); her eye on the format mix and the 14 cover lines.
- 2026-11-10: "Full video on YouTube" ending (outroCard) on: every short + teaser end on it (thumbnail 01, upload title, pink accent). Each short is ~6.5 s longer.

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.

## 2026-11-12 night: shorts v3 (her new brief: board looks, covers, labels, captions)
- New `talking-head/moments/looks.js` (manifest "common", last): each short's cover, top label, captions and the graphics' type copy 3 videos
  from the formats board ("board": [n, n, n] in the manifest + kit section 3), the fonts of the first one (max 2 per short; new free fonts in
  library/fonts: Nunito, Montserrat, Oswald, Barlow Condensed) and its colours (per-short palette instead of pink everywhere; sh14 keeps the pink).
  sh01 [26,36,13] · sh02 [32,60,28] (faithful Formats 32) · sh03 [66,42,16] · sh04 [5,47,9] · sh05 [29,39,53] · sh06 [64,65,11] · sh07 [25,54,34]
  · sh08 [40,12,20] · sh09 [38,57,48] · sh10 [68,22,10] · sh11 [58,48,52] · sh12 [31,53,47] · sh13 [9,12,44] · sh14 [4,60,28].
- Layouts changed: sh01 D->H, sh03 H->I, sh07 I->M, sh14 A->H (neighbours never share one). Speech (in/out/cuts, incl. the A/B cut) unchanged.
- Covers: plain search words ("What is a dark pattern?", "Why is it so hard to cancel Amazon Prime?", "Is that countdown timer fake?" ...); kinds mixed
  (her real frame / flat card / a frame of the short: assets/covers/shNN-frame.jpg); sh11 keeps "Why apps trick you: it's the numbers".
- Labels hide whenever a graphic is on screen (never two text layers); fit the top band, 2 lines max, shrink to fit.
- J (sh06) graphics now get the screen down to her hair (the gift-wrap cart rows were squashed to nothing before).
- Mix in every short's edits: music -15, sound effects -7.
- Review: outputs/_review/shorts-v3-2026-11-12/ (per short: board frames left, ours right; overall.jpg). Bin after her OK.
- Known: review stills show the manifest's pink "pad" for a frame while a panel slides in (stills bug, logged in HANDOFF); previews need a refresh before she exports.
- Critic round 1 (cold, sheets only): 5-7.5. Fixed after: sh02 cover now a frame of the short (the real "No thanks, I hate saving money"
  pop-up + the lime word over her room), labels/covers kept above her hair (sh01, sh06, sh11), captions off her face over graphics (sh04, sh07,
  sh09, sh10, sh11, sh14), sh08 dialog contrast, "1 click" join box (the old text ran out of its box), labels step aside while a panel opens.
- Each short has its own "pad" (manifest) = the colour shown for a frame while a panel opens (was the pink of the full edit in every short);
  studio/tools/composite.mjs padOf now reads a moment's "pad" (backward compatible; other projects unchanged).
- Critic round 2 fixes: sh02 cover = the real pop-up frame + one headline "What is confirmshaming?"; the pop-up + magnifier is drawn at 80 % in
  shorts so its words stay in the frame; sh08 prompt checked; sh10 captions over graphics sit on her chest (not on the photo); the EC press
  release is cropped round "148 out of 399" (bigger); sh07 is now full frame with pop-up pages (I); sh05 trial card opens on "of premium"
  and sh12's 642 panel on "consumer and" (shorts/sh05.js, sh12.js: no empty panels); covers sh06 (yellow highlight on the checkout frame)
  and sh13 (lavender card) no longer look like their neighbours.
- Round-3 fixes (no further critic, per coordinator): sh05 now full frame (I) with the trial card as a top panel from "free month";
  pop-up cards (I: sh03, sh05, sh07) 28 px higher / 70 px shorter, off her hair; sh07 cover 2 lines above her hair; sh03 captions lower
  + one yellow word per chunk (Formats 66); sh08 unspoken words brighter; sh10/sh12 captions moved off hands / mic. sh04's grey caption
  boxes are Formats 5's own (@JeffSu boxed captions), kept. All 14: 0 collisions, 0 labels over graphics, 0 zooms, 0 gaps.

## 2026-11-12/13: font-board pass on the 14 shorts + teaser (her rules: only font-board fonts; each used as on its board item)
- Every font and colour now comes from the font board (studio /ideas/boards/fonts/), used the way its item uses it: the item's text colour
  on the item's ground (labels, captions and cover lines on boxes of that ground). Manifest "fonts" / "colours" per moment; kit section 3-4.
  sh01 pair-01 Anton+Archivo cream on navy · sh02 shorts-07 Nunito lime on brown + design-09 Inter Tight black on lime · sh03 design-33 Archivo 70 %
  on yellow/red/blue bars · sh04 pair-04 Six Caps+Inter Tight red on cream · sh05 design-20 Permanent Marker white on blue · sh06 shorts-14 Caveat
  white on blue + shorts-15 Inter Tight black on yellow · sh07 design-24 Bricolage indigo on cream · sh08 design-13 Switzer grey on black ·
  sh09 shorts-09 Young Serif yellow on olive + shorts-20 Satoshi italic white on navy · sh10 shorts-16 Oswald white on grey, red letter ·
  sh11 shorts-10 Bodoni+Instrument Serif white on brown · sh12 design-02 Big Shoulders black on orange · sh13 pair-05 Libre Baskerville+Newsreader
  black on light grey · sh14 design-18 Gloock red on black + design-34 Inter Tight white on red · teaser pair-02 Archivo 62 %+DM Mono ink on paper.
- Shift+Enter line breaks she types in a cover / label are kept (only shrink); no single word alone on a last line.
- Cover frames (sh02/04/06/10/12) re-rendered in the new look; teaser's hidden old end card (under the outro) no longer drawn.
- Checks (composite check): all 14 + teaser 0 text collisions, labels in band, 0 zooms; font audit: every family drawn is a loaded board face
  (teaser 16:9 captions: the studio's "Helvetica Neue" is registered as Archivo in the teaser).
- Cold critics: r1 reject (median 6) -> fixes; r2 reject as a set (sh01/sh03/sh13 8, most 5-6, teaser 3) -> fixed sh09 timer colours, teaser
  subtitle (DM Mono caps), sh08 weight. Left (the board's own pairings, her rule wins): sh14 red-on-black and sh10 white-on-grey contrast;
  sh04 Six Caps thin; teaser 16:9 captions have no band (studio caption code). Not re-scored after the last fixes.
- Review: outputs/_review/shorts-fontboard-2026-11-12/ (overall.jpg, covers.jpg, teaser.jpg, stills/). Previews need a refresh before she exports.
- 2026-11-13 follow-up (coordinator: readability wins): sh10 -> shorts-17 (Oswald white on #2E2E33, mint key word), sh14 -> design-26 (Inter Tight
  Black white on black); sh09 countdown + sh12 642 / dots drawn in their item's colours; sh06 cover Caveat white on blue; sh04 band title Inter Tight;
  bigger captions sh04 / sh05 / sh11 / sh14; teaser title in caps, subtitle DM Mono caps, 16:9 captions now Archivo ink on paper bands
  (project copy of drawCaptions3 in looks.js, teaser only). Critic r3: 8 = sh01 sh03 sh12 sh13; 7 = sh02 sh08 sh09 sh10; 6 = sh04 sh06 sh07 sh11
  + teaser; 5 = sh05 sh14; fixes after r3 (caption sizes, sh11 cover, teaser caps) not re-scored. All checks still 0 collisions / labels in band / 0 zooms.
- 2026-11-13 last pass (no more critic rounds): sh05 captions + graphics in Inter Tight white on navy (combo-21), Permanent Marker only on the
  cover / label; sh07 one highlight ("don't") instead of three; sh02 lens without the yellow block; sh04 "PRODUCT PAGE" tag off the photo.
  sh03's "FTC press release" line is the source credit (kept). All checks pass; overall.jpg + covers.jpg regenerated.
- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

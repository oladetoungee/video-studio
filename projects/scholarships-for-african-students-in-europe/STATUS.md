# STATUS: scholarships-for-african-students-in-europe

Last updated 2026-11-10 by the rollout agent (new thumbnails from her shoot, shorts in a mix of formats, cover frames, kit upload checklist).

## Done
- Recorded (`kit/raw-video.mov`), transcribed, cut list in `kit/transcripts/CLEANUP.md` (cleaned edit about 8:20).
- **Refined kit** `kit/refined-kit.md` (the only kit; her original kit moved to `archive/original-kit/`): live research (news, outliers, search phrases), titles (all 40-60 characters, checked in code), a thumbnail concept per title (a mix of kinds), description with 7 chapters timed to the cleaned edit, tags, 9 shorts planned with raw in/out times and captions for YouTube Shorts / TikTok / Reels / LinkedIn / X, 3 independent shorts with full word-for-word scripts and recording directions, first 30 seconds of the edit, edit notes (receipts, black phrase cards, Pexels search words), teaser plan, carousel plans, long-form posts, her essay.
- Cold review (fresh agent, titles + thumbnails + short labels/captions only): everything under 8 was rewritten (details in kit 7d; not re-scored after the fixes).

## Recommended
- Title: Fully Funded Scholarships in Europe for Africans (2027)
- Opening line: "If you're a Nigerian or an African student and you want to start a master's in Europe in 2027, some scholarship deadlines have already passed…" (raw 0:00; first word may be clipped)
- End screen: https://youtu.be/wLtXqeqQiqU

## Directions (2026-11-02, waiting on her pick)
| deliverable | state | where | critic |
|---|---|---|---|
| Film / edit look: 3 directions (A Stamped passport, B Now Boarding departures board, C Postcards), 4+2 stills + 10 s motion test each | done, waiting on her pick | `film/stills/directions/` (README.md, overview.png) | round 2: A 6.5, **B 8.2 (recommended)**, C 6.5 |
| Talking-head style frames (4 layouts over her footage) | done | `film/stills/directions/TH/frames/` | th1 7.5, th2 8, th3 6.5, th4 7 |
| Short style frames (SH4 Swedish Institute, look B) | done | `film/stills/directions/SH/frames/` | s1 7.5, s2 8 |
Notes: A and C share devices with working-full-time's B-timecard / C-datestamp directions. Pexels credits in `film/assets/CREDITS.md`. Directions folder 57 MB.

## Thumbnails and carousels (DESIGN agent, 2026-11-02)
| deliverable | state | where | critic |
|---|---|---|---|
| 13 thumbnails in look B + city photos (cut from 20 after critic rounds; photo 6, collage 3, flat 2, other 2), 2-3 titles each | built, editable | http://localhost:7700/design/scholarships-for-african-students-in-europe/thumbnails/ · `outputs/thumbnails/` (+ overview.png) · notes `design/thumbnails/README.md` | R1 none at 8 → R2 best 7.5 → R3 12 = 8 → R4 01 7.5, 14 7.5, 12 7, 05 6; last fixes not re-scored. The photo of her is the limit (critics: +1 with a brighter photo with expression / a prop) |
| Instagram carousel, 13 slides | built, checks clean | http://localhost:7700/design/scholarships-for-african-students-in-europe/carousels/instagram/ · `outputs/carousels/instagram/` | R1 6.5 → R2 7.2 → R3 7.5 → R4 7.5 (cover 8; 02 and 05 named as the blockers, fixed after, not re-scored) |
| LinkedIn carousel, 13 slides + PDF (official site on each slide) | built, checks clean | http://localhost:7700/design/scholarships-for-african-students-in-europe/carousels/linkedin/ · `outputs/carousels/linkedin/carousel.pdf` | as Instagram |
Waiting on her: photos without the mic (pointing / holding papers), which the critic says would lift the photo thumbnails most; her pick of title + thumbnail (critic's Test & Compare: 01, 12, 04).

## Waiting on her
- 9 questions in kit section 0 (facts to check, cuts that need her ear, photos).
- Photos of her without the mic for the photo-led thumbnails.

## Next
- Apply the CLEANUP cuts + her answers, build the full talking-head edit in its own new look (2-3 directions first), then shorts, thumbnails, carousels, teaser. Re-time chapters to the exported file's .srt.

## Build (FILM agent, 2026-11-02 evening): her pick B "Now Boarding" + C's city photos behind her
| deliverable | state | where (studio) | notes |
|---|---|---|---|
| Cleaned voice (5 CLEANUP retakes + "So do the same motivation letter" cut) | done | film/audio/voice_edit.flac (8:15) | not cut: "Nigerians do get in as well" repeat (no clean join) |
| Motion film, 43 scenes, 16:9 + 9:16 | built, first pass, not critic-scored | http://localhost:7700/edit/scholarships-for-african-students-in-europe/ | 0 text collisions, 0 contrast failures, -14.2 LUFS stems |
| Full talking-head edit (8:16), ~70 layout segments, C1 captions | built, review stills in progress | http://localhost:7700/moment/scholarships-for-african-students-in-europe/full/ | corrections are real pauses now (ENGINE "pause her", 2026-11-03): `fix-aiss` at 2:26 and `fix-dsa` at 5:40, 5 s each, her picture and voice stop while the update types on, then the official page (aissprogram.eu / Embassy of Hungary in Abuja) as a receipt. Edit them in the moment editor's **Pause her** panel. Length is now 8:27 |
| 9 shorts (kit section 3) | built; sh06 export-checked (9:16 works) |  /moment/scholarships-for-african-students-in-europe/sh01/ ... sh09/ | sh04 drops the unsourced "most applicants" line; shorts end on her last word (no outro clip for this video yet: coordinator 2026-11-02; ux-research clips are not generic) |
| Teaser (17 bites, ~81 s) | built, not reviewed yet | /moment/scholarships-for-african-students-in-europe/teaser/ | |
| Thumbnails, carousels | DESIGN agent | | |

### Chapters timed to the cleaned edit WITH the two correction pauses (talkinghead-full_16x9.mp4, 8:27); re-check on the file she exports
0:00 Some 2027 deadlines have already passed · 0:28 How scholarships in Europe work · 1:21 Erasmus Mundus · 2:51 DAAD EPOS and the
Swedish Institute · 4:31 The Netherlands and Hungary · 5:59 Estonia and Chevening (UK) · 6:58 How to prepare your application
(the kit's 1c times were for the edit without pauses; the description in kit 1b needs these.)

### CHECKS (2026-11-06, FILM agent)
| id | result | note |
|---|---|---|
| text-contrast | fixed | film `render.mjs contrast`: 0 below the bar (photo credit now on a dark plate) |
| no-collisions / text-collision | fixed | film `textcollide.mjs` both sizes: 0 (was 21 + 27); edit/shorts: checked by eye on review renders |
| text-safe-area | pass | film 9:16 content inside 370-1440 (textcollide: 0 cut at the edge) |
| her-words | pass | captions = her words (whisper DTW + name fixes, film/tools/words.py); on-screen facts are her words or a credited official page |
| corrections | fixed | AISS dates + Federal Scholarship Board -> DSA as real pauses (engine "pause her"), receipts after each |
| green-means-open | fixed | green only on OPEN / ADMISSION OPEN / open-window highlights (critic round 1) |
| layout-variety | pass | full edit ~70 segments, 9 layout kinds (L1, L2, L4, L5, L9, L10, L14, L15, L17, L18, L19 + keywords) |
| short-zoom | pass | shorts use the 3:4 window (manifest frame9) |
| clean-ends | pass | shorts end on her last word (no outro clip for this video yet) |
| loudness | pass | review renders: full -14.1 LUFS / TP -1.0, short -14.0 / -1.9, teaser -14.1 / -1.9; film stems -14.2 |
| sfx-audible | fixed | flap role +9 dB (soundqa median over bed -5.7 -> +1.9 dB) |
| dead-holds | open | film: 18 holds over 4 s left (audit); edit: critic round 1 empty panels fixed |
| critic | open | film round 1: 6/10; edit 6.5, short 5.5, teaser 6 (round 1), fixes applied, round 2 not run yet |
| editable | pass | every text via txt/flaps/lab (ovr + regBox), boxes grp(); editors load (200) |
| delivered | n/a | she exports (review renders in outputs/_review, bin after) |

## 2026-11-07: re-typed to set 06 (League Gothic + Inter Tight), her type rules
- Full edit, 9 shorts, teaser: League Gothic headlines (30 % larger), Inter Tight captions with a soft shadow (no outline),
  1 px window edges, shorts top label in League Gothic (no white boxes, `topLabel` in talking-head.json, editable), page crops
  show one highlighted line, flap rows settle within ~0.5 s. Thumbnails (13) + Instagram/LinkedIn carousels re-typed (font
  aliases in design/thumbnails/lib/sch.css and carousels/shared/base.css), flap letters are plain words now, no sticker
  outlines, her new photos (library/her-photos) in thumbnails 05, 07, 08, 14, 20 and the carousel end slide.
- The standalone motion film is dropped (its scenes stay as inserts in the edit).
- Critic round (contact sheets, before the last fixes): edit 6, short 5, teaser 6, thumbnails set 6, carousels 6.5 / 7.
  Fixed after it: bigger headlines, one-line page crops, short label type, teaser topic + end card, routes insert split.
  No further rounds (her request). Loudness: full -14.0 LUFS / TP -2.2 dBTP; short and teaser -14 / -2.8.
- Review renders: outputs/_review/ (ranges of the full edit, sh04, teaser): bin after her OK.

## 2026-11-07 evening: "show, don't type" rework (her rules FEEDBACK.md 2026-11-07 evening; edge-cases model)
| Deliverable | State | Where |
|---|---|---|
| Full talking-head edit, 9 shorts, teaser | Reworked: sentences she says are no longer typed on screen; photos instead of word cards (notes, plane wing, dorm, planner, passports, letter writing); the board/flaps stay for names, numbers and dates. On-screen authored words (plan + the film scenes the edit uses) 582 -> 251 (69 -> 30 per minute). Checks: no text collisions in full/shorts, layout variety pass | /moment/scholarships-for-african-students-in-europe/full/ · /teaser/ · /sh01/ … /sh09/ |
| Before / after sheets for her | outputs/_review/before16.jpg, after16.jpg (bin after she has looked) | |
Waiting on her: the look is still mostly graphite (the flaps board is the video's identity); the new photos are the light grounds. Say if she wants a paper-coloured board for some inserts. Listen: 6:56 "Nigerians do get in as well. Nigerians get in really well." (said twice, no clean join, left in).

## 2026-11-10: rollout to the HTTP standard (brief projects/ROLLOUT-BRIEF-2026-11-10.md)
| Deliverable | State | Where |
|---|---|---|
| Thumbnails: 10 new, best first, her 29 Oct shoot (outfit D) through Enhance photo, a mix (photo 4, flat 3, collage 1, other 2), 2-3 titles each | built, editable; old set of 13 in the Bin (~/.Trash/scholarships-for-african-students-in-europe-thumbnails-old-2026-11-10/) | http://localhost:7700/design/scholarships-for-african-students-in-europe/thumbnails/ · outputs/thumbnails/ + overview.png |
| Recommended: 01 "€1,400" + "Fully Funded Scholarships in Europe for Africans (2027)"; Test & Compare 02 (Sweden pays, real si.se line) + 03 (Nigerians can apply) | waiting on her pick | kit section 2a |
| 9 shorts in 9 formats: sh01 D, sh02 I, sh03 B, sh04 M, sh05 G, sh06 H, sh07 A, sh08 K, sh09 F | built, she exports | /moment/scholarships-for-african-students-in-europe/sh01/ … /sh09/ · sheet outputs/_review/shorts-formats-v2.jpg |
| Cover frame in every short (first 0.1 s, editable at 0:00; her still lowered, the line above her head; cards sh04 green, sh08 paper) + "Full video on YouTube" outroCard at the end of every short and the teaser | built | sheets outputs/_review/covers.jpg, outputs/_review/outro/ |
| Kit: Upload checklist at the top (post before 13 Nov), section 2 = new thumbnails as images, each short = format + editor + cover line | done | http://localhost:7700/kit/scholarships-for-african-students-in-europe/ |
| Phones in the edit | n/a (none drawn) | |
Waiting on her: title + thumbnail pick; export the full edit and upload before 13 November.
### CHECKS (2026-11-10, shorts, composite check 9:16)
| id | result | note |
|---|---|---|
| text-collision | pass | 0 hits in all 9 |
| face (text over her face) | fixed | sh02 pop-up cards moved above her head, sh03 captions to the foot; left: sh01 one caption touches her chin box at 12 s, sh06 the DSA correction pause card (engine "pause her", by design) and one caption at 28.6 s |
| short-zoom | pass | 0.16-0.30, except sh05 G letterbox 0.09 (by design, one short in the set) |
| label-over-graphic | pass | all 9 |
| empty panels | open (old) | flap boards before they flip (sh01 47 s, sh04 8 s, sh06 3-9 s, sh08 7 s / 19-28 s), from the full edit's scene timing |
| stills glitch | n/a | composite stills show an empty frame at exactly 2.0 s in sh05 / sh09 (also before this change); a test export of that second is clean (binned) |
| editable | pass | titles 'label' / 'tag', cover line 'cover/cover', cut-outs 'cover/@her', captions as before |

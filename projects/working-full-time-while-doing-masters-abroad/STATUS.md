# STATUS: working-full-time-while-doing-masters-abroad

Last updated 2026-11-20 by the CAPTION-ACCURACY agent (section below). Before: 2026-11-02 by the social-strategist agent.


## 2026-11-20: caption accuracy pass (her rule 2026-11-19: "I don't want to be correcting captions")
- Every caption of the full edit, the 10 shorts and the teaser checked against a second, stronger transcription (whisper large-v3-turbo) of each one's own sound, plus short clips around every doubtful word (turbo + small.en). **18 caption fixes**, e.g. sh02's hook "Working while studying is the the real ghetto" -> "Working while studying, I swear, it's the real ghetto"; 6:29 "a little bit don't fear" -> "a little bit unfair"; 5:42 "You show who thinks you're on there" -> "You shuffle things here and there"; 5:54 "At school, we take a lot of my blood" -> "School will take a lot of my blood"; 9:25 "you really can have a perfect work-life balance" -> "can't". Also 2:25 "write credits" -> "write code, it's like", 3:10 "focus on my thesis", 4:38 "my class runs till 7:45", 6:06 "once a week", sh08 "of study leaves", 7:18 "the one to"; stray words at short / teaser starts removed.
- **Clip edges**: 31 short / teaser edges sat on the first sound of a word; each moved into the silence before it. Short lengths change by at most 0.4 s; teaser 88.1 s. Full edit unchanged (chapters unchanged).
- Checks: composite check all, 16:9 + 9:16: text collisions 0. Diff files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt first). Backups: talking-head/build/*.before-captions-2026-11-20.
- Listen to: 9:25 "you really can't have a perfect work-life balance" (two passes hear "can"), 7:35 "some strap privileges" ("extra"?), 8:46 "cooking a four-year-old on Wednesday afternoon", 6:26 "I was studying this in my classroom" ("telling this to my classmate"?), 2:25 "don't just write code". Old exports have the old captions: export again.

## 2026-11-19 thumbnails reworked from her 50 picks (THUMBS-REWORK-BRIEF-2026-11-19), nothing exported
Set of 5 (was 9). Editor: http://localhost:7700/design/working-full-time-while-doing-masters-abroad/thumbnails/
| | File | Words | Copies | Photo | Fonts | Score alone / with title (feed critic, 3 rounds) |
|---|---|---|---|---|---|---|
| NEW | 10-you-can-do-both | job + master's? doable. | pick1119-22 | Øredev talking + Pexels night desk | thumbs-10 Poppins Bold + red | R2 6/7, R3 6/7 · **UPLOAD** with "Can You Work Full Time and Do a Master's? Yes, Here's How" |
| NEW | 07-tired-but-still-here | job + master's, it's a lot. | pick1119-27 | Øredev evening (orange top) | thumbs-17 Inter Tight + Instrument Serif | R1 6/7, R3 5/6 (top line bigger after) · Test & Compare |
| REWORKED | 02b-my-work-and-study-week | my week: job + master's | Thumbnails 51 | shoot B | thumbs-19 | R2 7/7, R3 6/7 (3 days, labels 80 px after) · Test & Compare |
| NEW | 09-developer-by-day | Developer by day. Student by night. | pick1119-04 | Øredev on stage (cut-out) | thumbs-05 Libre Baskerville Bold | R2 7/7, R3 5/6 |
| KEPT | 03-9am-job-9pm-masters | 9 AM JOB / 9 PM MASTER'S | Thumbnails 69 | shoot B | design-34 | R2 7/6, R3 5/5 (shorts ending card uses it) |
- Retired to archive/thumbnails-retired-2026-11-19/ (directions/ + png/; 02b-before/ = 02b as it was): 01, 01b, 02, 04, 05, 06, 06b, and the new 03b (pick 31), 08 (pick 36), 11 (pick 12) that stayed at 6 or below.
- Previous recommendation: 03 + "How I Work Full Time While Doing a Master's Abroad". Not changed: outroCard still shows 03 (for her to decide).
- Nothing reached 8 (three fresh critics, feed-card style next to 10 picks). The shared ask: more alive photos of her at home / at a desk at night (the shoot only has calm faces).
- Photos new in assets/p1119/ (Enhance photo 0.35-0.5, faces natural; no Øredev logo or laptop sticker in frame).
- Sheets: outputs/_review/thumbnails-2026-11-19.jpg (final set as YouTube cards + the pick each copies), outputs/_review/thumbnails-2026-11-19-retired.jpg, outputs/thumbnails/overview.png. Kit 1a (new title options), 2 (new set), checklist, line 3 updated.

## 2026-11-17 (night): shorts, weakest pass (projects/WEAKEST-BRIEF-2026-11-16.md)
- **sh06** (critic: one long talking stretch). Found a bug: the 11-13 caption fix ("around 7:45", no "to") stopped the film's sentence s43g from matching, so the **tired-class time card had silently dropped out of the full edit AND sh06**. plan.js now tries a talking-head spelling (WF_ALT) when WF_SENT misses: the card is back in both. sh06 also gets a new week insert on s47-s48 (short only): WORK Thu/Fri, CLASS lands on "in class", REVIEW on "after class", then CATCH UP blocks stamp onto Fri / Sat / Sun on "pay attention", "always end up", "more time" (bigger block labels, 48 px). Time card: TIRED stamp moved onto the empty rows (it was cut off by the 900 px panel), a small push onto MON on "go to class". Format H panels slide in in 0.3 s (was 0.55: the dark gap under her showed). Cold critic (same critic, before vs after): 3 -> 6 (round 1), 6 (round 2), 6 (round 3). Kept. Sheet: outputs/_review/sh06-before-after-2026-11-16.jpg.
- **sh01** tried (the 45 ECTS card arrived 1 s early and empty): critic 4 -> 4, so reverted (rule: keep only if it scores higher).
- Checks: composite check sh06 9:16 (0 text collisions, no overflow, labels in band, 0 zooms), full 16:9 + 9:16 0 collisions; every moment builds.
- Files: talking-head/moments/plan.js, talking-head/moments/formats.js (H enter 0.3), film/scenes/wfkit.js (week block label size option labZ; default unchanged). Old copies: archive/weakest-2026-11-16/ (plan.js, formats.js, wfkit.js). Previews need a refresh before she exports.

## Done
- Recorded (`kit/raw-video.mov`), transcribed, cut list in `kit/transcripts/CLEANUP.md` (cleaned edit about 9:46).
- **Refined kit** `kit/refined-kit.md` (the only kit; her original kit moved to `archive/original-kit/`): live research (news, outliers, search phrases), titles (all 40-60 characters, checked in code), a thumbnail concept per title (a mix of kinds), description with 7 chapters timed to the cleaned edit, tags, 10 shorts planned with raw in/out times and captions for YouTube Shorts / TikTok / Reels / LinkedIn / X, 3 independent shorts with full word-for-word scripts and recording directions, first 30 seconds of the edit, edit notes (receipts, black phrase cards, Pexels search words), teaser plan, carousel plans, long-form posts, her essay.
- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md
- Cold review (fresh agent, titles + thumbnails + short labels/captions only): everything under 8 was rewritten (details in kit 7d; not re-scored after the fixes).

## Recommended
- Title: How I Work Full Time While Doing a Master's Abroad
- Opening line: "I have a full-time job as a full-stack software developer here in Estonia, and I'm also doing a full-time master's degree…" (raw 0:00)
- End screen: https://youtu.be/wLtXqeqQiqU

## Directions (2026-11-02)
- 3 looks ready to pick from: `film/stills/directions/overview.png` + README.md. A · One 24 hours (dial), **B · Clock in / clock out (time card, recommended)**, C · Date stamp (montage device). Motion tests at -14.1/-14.2 LUFS. Critic round 1: A 6.8, B 7.0, C 5.8; round 2: A 7.3, B 7.6, C 6.0; five quick B fixes listed in the README still open (not yet at 8).

## Design (2026-11-02, DESIGN agent)
- **22 thumbnails** in her picked look (time card + dial), a mix: 8 photo, 4 collage, 5 flat, 5 other. Editor: http://localhost:7700/design/working-full-time-while-doing-masters-abroad/thumbnails/ · files `outputs/thumbnails/` (+ overview.png). Cold critic R2: 18, 02, 05, 13, 04, 10, 12 at 8-9; the rest 6-7. Test & Compare: 18, 02, 05. Details `design/thumbnails/README.md`.
- **Carousels**: Instagram 12 slides http://localhost:7700/design/working-full-time-while-doing-masters-abroad/carousels/instagram/ and LinkedIn 12 slides + PDF http://localhost:7700/design/working-full-time-while-doing-masters-abroad/carousels/linkedin/ · files `outputs/carousels/{instagram,linkedin}/`. Real sources (Study in Estonia, TalTech, Adult Education Act § 13) on slides 2, 3, 7, credited.

## Waiting on her
- Pick ONE look for the whole video (directions README).
- 7 questions in kit section 0 (facts to check, cuts that need her ear, photos).
- Photos of her without the mic for the photo-led thumbnails.

## Next
- Apply the CLEANUP cuts + her answers, build the full talking-head edit in its own new look (2-3 directions first), then shorts, thumbnails, carousels, teaser. Re-time chapters to the exported file's .srt.

## Build 2026-11-02 night (FILM agent, her pick B Clock in / clock out + A's 24-hour dial)
Built, editable in the studio (http://localhost:7700/), nothing exported (she exports):
- Full talking-head edit 9:35 (`/moment/working-full-time-while-doing-masters-abroad/full/`): CLEANUP cuts + kit Q2 cut, 121 segments, 7 face + graphic layouts (split 33 %, room 23 %, ots 19 %, tile 14 %, presenter 9 %, page, half), real receipts (Study in Estonia, TalTech, Riigi Teataja § 13 current version), 45 ECTS correction screen, 10 tip cards, captions C1.
- 10 shorts sh01-sh10 (4:5 window, manila top title, captions C1, "tip number X" openings trimmed). No outro clip yet.
- Teaser 83 s (`/moment/.../teaser/`): 18 bites, 4 title cards, beat drop on "your health is important", end card.
- Motion film 9:36 (`/edit/working-full-time-while-doing-masters-abroad/`): 121 scenes, her voice tightened (film/data/cutlist.json), -14.2 LUFS stems.
- Critic round 1 (fresh, harsh): film 16:9 5, film 9:16 4, full edit 6, shorts 5. Round-1 fixes applied (see talking-head/HANDOFF.md); not re-scored.
- Study leave re-checked on the current Riigi Teataja text (in force since 1 Apr 2025): 30 days, 20 paid, 15 to finish, 14 days' notice: unchanged.

## Waiting on her
- Kit Q1-Q7 (we applied the kit's defaults: Q2 cut made, Q5 not cut), unclear words in captions (Q4), outro clips for shorts/teaser, photos without the mic.

## 2026-11-07 update (FILM agent)
- Re-typed to her set 02 (Anton + Inter Tight + DM Mono), no thick borders/outlines: full edit, 10 shorts, teaser, 22 thumbnails, both carousels.
- Standalone motion film dropped (her rule 2026-11-07).
- 45 ECTS correction = a real pause in her video (engine "pauses").
- Thumbnails use her new studio photos (no mic).
- Chapters for the full edit (talkinghead-full_16x9.mp4, with the 4.5 s pause): 0:00, 0:27, 1:52, 3:36, 5:09, 6:27, 8:19 (re-check on her export's .srt).
- Waiting on her: outro clips for this video; the unclear words (kit Q4); kit Q1-Q7.

## 2026-11-07 evening: "show, don't type" rework (her rules FEEDBACK.md 2026-11-07 evening; edge-cases model)
| Deliverable | State | Where |
|---|---|---|
| Full talking-head edit, 10 shorts, teaser | Reworked: no more typed re-runs of her sentences (type cards, lists, stacks, pop-arounds, 12 keywords, 6 phrase cards); lists she reads out now land as blocks in the week calendar (classes, deadline, meeting; release + exam); her goal / health / vacation lines are her on camera with a punch-in; source crops lost their titles (the page says it); photos lost their captions. Authored on-screen words 698 -> 251 (72 -> 26 per minute). Checks clean (no new collisions, layout variety pass) | /moment/working-full-time-while-doing-masters-abroad/full/ · /teaser/ · /sh01/ … /sh10/ |
| Before / after sheets for her | outputs/_review/before16.jpg, after16.jpg (bin after she has looked) | |
Captions: "doing a full-time master's" (was capital F after the cut), "since October 2025, and…", "this semester, before…", "end of the year, to sit…" (tools/words.py).
Kept on purpose (the video's look): the time card, the week calendar, the 24-hour dial, the tip cards, one card "Your health." (her beat-drop line, shortened).

## 2026-11-10 rollout to the HTTP standard (ROLLOUT-BRIEF-2026-11-10) — DONE, nothing exported (she exports)
| Deliverable | State | Where |
|---|---|---|
| Thumbnails | NEW set of 11 (old 22 in the Bin `~/.Trash/working-full-time-while-doing-masters-abroad-thumbnails-old-2026-11-10/`), her shoot outfit B through Enhance photo, mix photo 3 / collage 2 / flat 4 / other 2, cold-tested + fixed. **Upload 01 "Developer by day / Student by night" + "How I Work Full Time While Doing a Master's Abroad"**; Test & Compare 02, 03 | http://localhost:7700/design/working-full-time-while-doing-masters-abroad/thumbnails/ · `outputs/thumbnails/overview.png` · design/thumbnails/README.md |
| Shorts formats | 10 shorts, 10 different formats: sh01 I · sh02 A · sh03 B · sh04 K · sh05 J · sh06 H · sh07 M · sh08 G · sh09 F · sh10 C (moments/formats.js, manifest "fmt"); typed openers, tip cards, phrase cards and keywords off in shorts; her words, captions and in/out points unchanged | /moment/working-full-time-while-doing-masters-abroad/sh01/ … /sh10/ · `outputs/_review/shorts-formats-v2.jpg` |
| Covers | every short, first 0.1 s, 7 photo + 3 cards (sh03, sh10 manila, sh07 red); edit at 0:00 (`cover/cover`) | `outputs/_review/covers.jpg` · stills `talking-head/assets/covers/` (tools/covers.py) |
| Ending | manifest "outroCard": thumbnail 01, the YouTube title, charcoal / paper / red; on every short + the teaser | `outputs/_review/outro/` |
| Kit | upload checklist, section 2 = the new thumbnails, each short's format / editor / cover line | http://localhost:7700/kit/working-full-time-while-doing-masters-abroad/ |
Checks (composite check, 9:16): text collision pass ×10, label-over-graphic pass ×10, short-zoom pass except sh01 0.30 (full bleed, on purpose), sh08 0.09 (G letterbox, on purpose), sh05 / sh10 cut-outs (not measured); face: only entry frames (sh09 24.2 time card sliding in) and the outro card. No phones drawn in this project's edit code.
Waiting on her: pick / change the thumbnail; listen to the shorts; kit Q4 unclear words still captioned as heard ("coffee days" in sh10).

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.

## 2026-11-13 full-kit pass (FULL-KIT-BRIEF-2026-11-12): nothing exported (she exports)
| Deliverable | State | Where |
|---|---|---|
| Thumbnails | NEW set of 6 after 6 blind critic rounds (earlier rounds in ~/.Trash/working-full-time-thumbnails-old-2026-11-13/). Each copies a different board item, font-board fonts in their own colours, shoot outfit B. Final blind scores: 03 9 AM JOB / 9 PM MASTER'S 8 · 04 7.5 · 05 7 · 01 6.5 · 06 6 · 02 5. **Upload 03** + "How I Work Full Time While Doing a Master's Abroad"; Test & Compare 04, 01. Census: 1 "words left / her right" | /design/working-full-time-while-doing-masters-abroad/thumbnails/ · outputs/thumbnails/overview.png · outputs/_review/thumbnails-vs-board.jpg, thumbnails-320.jpg |
| Shorts sh01-sh10 | font-board looks (moments/looks.js): 3 board refs + 1-2 board fonts in source colours each, graphics recoloured, titles in the top band, 2-5 word captions, covers in 3 kinds (photo / big line / slide from the short) with no neighbours alike; mix music -15 / sfx -7. Caption fixes: "this confidence" (was "these coffee days", whisper re-run), "around 7:45," | /moment/working-full-time-while-doing-masters-abroad/sh01/ … /sh10/ · outputs/_review/fontboard-2026-11-13/ (covers.jpg, shorts-1.jpg, shorts-2.jpg) |
| Teaser v3 | hook stretch -> the idea -> BLOCK YOUR WEEK / ONE CALENDAR / STUDY LEAVE / MEAL PREP (each named) -> her takeaway (music drop) -> outroCard; 87.1 s + 6.5 s ending; pair-01 Anton + Archivo, navy/cream; voice checked with whisper | /moment/working-full-time-while-doing-masters-abroad/teaser/ · talking-head/teaser/PLAN-v3.md · outputs/_review/fontboard-2026-11-13/teaser-16x9.jpg |
| Kit | checklist (thumbnail 03), At a glance, section 2 (fork), 3 (look line per short), 4 (teaser v3), date line | /kit/working-full-time-while-doing-masters-abroad/ |
Checks (composite check): text collisions 0 in all 10 shorts and the teaser (16:9, 1:1, 4:5); labels in band; 0 zooms; face: only known hits (sh01 the 45-ECTS correction pause screen, sh09 the time card sliding in at 24.2 s, the outro card); teaser 4:5 captions sit on her chest (the check's face box reaches her chin).
Cold critic (shorts, round 3, before the last small fixes): sh01 / sh04 / sh07 / sh08 7, the rest 6; covers 6; teaser 6. Not at 8: the critic wants more inserts in sh01 / sh06 / sh07 (long talking stretches), bigger small graphic labels, and an English line on the Estonian law crop.
Waiting on her: listen to the shorts and teaser (refresh previews before export); pick the thumbnail; kit Q4 words still captioned as heard ("four-year-old" in sh10).

## 2026-11-16 thumbnails: the 3 weakest reworked (WEAKEST-BRIEF-2026-11-16), nothing exported, nothing replaced
New versions BESIDE the old ones (01, 02, 06 untouched; 03 still recommended, not changed). Editor: /design/working-full-time-while-doing-masters-abroad/thumbnails/
| New | Words | Board | Fonts | Blind critic old -> new (same rounds) |
|---|---|---|---|---|
| 01b-work-and-study-full-time | FULL-TIME JOB + FULL-TIME MASTER'S (her room washed navy, laptop with code + book stack either side) | Thumbnails 126 (her own UX RESEARCH) | design-05 Anton, cream on navy (Design 368) | 01: 6 -> 01b: 7 |
| 02b-my-work-and-study-week | my week: job + master's (full-frame week calendar: Work 9-5 / red Class every evening, she presents it) | Thumbnails 51 (yt-79) | thumbs-19 Inter Tight Medium, ink on cream (Thumbnails 174) | 02: 5 -> 02b: 7 |
| 06b-studying-after-work | master's after work. (night desk with code, her right, hand at chin) | Thumbnails 96 (yt-43 "just start.") | thumbs-14 Poppins Bold lowercase, white on #3A3632 | 06: 5 -> 06b: 7 |
- 3 blind critic rounds (fresh agent each, PNGs only). This critic is harsher than the 11-13 one: in the same round-3 run 03 = 7, 05 = 7, 04 = 6. None of the 9 reached 8; the critic's shared note for the whole set: the same neutral face / white tee in every thumbnail; it asks for a tired or smiling expression (needs new photos of her: none in the outfit-B shoot).
- Sheets: outputs/_review/thumbnails-before-after-2026-11-16.jpg (old | new with scores), thumbnails-320.jpg (census: words left / her right = 2: 04, 06b), thumbnails-vs-board.jpg, outputs/thumbnails/overview.png.

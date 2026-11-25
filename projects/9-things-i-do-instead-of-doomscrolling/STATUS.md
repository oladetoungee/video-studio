# STATUS: 9-things-i-do-instead-of-doomscrolling

Last updated 2026-11-20 by the CAPTION-ACCURACY agent (first section).

## 2026-11-20: caption accuracy pass (her rule 2026-11-19: "I don't want to be correcting captions")
- **The film (the video)**: its captions checked against a second, stronger transcription (whisper large-v3-turbo) of the film's own voice, doubtful words on short clips (turbo + small.en). **9 caption fixes**: 3:24 "or would I find anything" -> "or without finding anything"; 3:40 "small places. waiting for your kettle" -> "You're waiting for your kettle"; 6:08 "a bike before for them" -> "before then"; 10:10 "physical activities done much" -> "that much"; 11:31 "journal about your library" -> "your life"; 12:38 "feedback or you post" -> "feedback on your posts"; three words the film's tighter cut had dropped from the captions ("one" 9:06, "now." 11:04, "as" 12:36). The film's voice file is byte-identical; only its words / captions changed (film/data/words.json, captions.srt).
- **Shorts + teaser**: same fixes; 19 clip edges moved into the silence before a word (sh11 began on "-eight": now "Number eight"; sh05 "Number three"; sh09 "Just"; sh12 "And lastly"; teaser bite ends). Short lengths change by at most 0.33 s.
- Checks: composite check 9:16 (12 shorts + teaser) and 16:9 (teaser): text collisions 0. Diff files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt first; film-diff-*.txt for the film). Backups: talking-head/build/ and film/build/ *.before-captions-2026-11-20.
- Listen to: film 4:17 "you can just do a little bit of small talk" (one pass hears "can't"), 5:37 "where you're just using to make virtual connections". Old exports have the old captions: export again.

## 2026-11-19 (night): MOTION FILM is the video; shorts + teaser motion only (her note: "my camera was blurry") — waiting on her ears + eye
- **The video = the motion film** `film/film.json` (104 screens, 13:00, look A Offline Bingo, 16:9 + 9:16). She exports it from http://localhost:7700/edit/9-things-i-do-instead-of-doomscrolling/ (What = Whole film). The talking-head full edit is retired (kept, not deleted).
- **Voice**: rebuilt with the CORRECT cut: the full edit's cuts (CLEANUP retakes, the 11-07 waveform re-cut of "number eight" 907.40-908.53, the stray "Yeah.", 0.8 s before each new item) with tight 0.55 s pauses (`film/data/edl-film.json`, footedl on a scratch manifest; `film/tools/voice.py` reads it). The old film voice (11-03) still had the bad "number eight" cut (half words at raw 907.23-907.9) and no holds. The full edit's 1.2 s pauses were only an ffmpeg-limit stop-gap, not a choice. 777.44 s voice, words/captions/rawmap regenerated (scenes are on raw times, so they stay in sync). Old files: `archive/film-voice-2026-11-03/` (+ old flac in ~/.Trash/doom-film-voice-2026-11-03/).
- **Sound**: music Mixkit 443 + 150 alternating (Mixkit Stock Music Free License, `library/music/`), ducked 16 dB under her voice; 119 sound effects in 23 kinds, 0 whooshes (new: a sound on every key word of a type screen, picked from its meaning: notify on "phone", cash on "money", clock on "bored", boom on "Boom.", one riser into "genuine connection"; BG.word's sound now reaches the cue list). Her levels saved in `film/edits.json` mix: music -14, sound effects -7. Measured: whole film at her levels -14.1 LUFS, true peak -3.1 dBTP after AAC; soundqa: hits median +8.4 dB over the bed, sound timing median 3 ms after the cue. Nobody listened: **she should listen**.
- **Show, don't type (first pass)**: 13 type screens became pictures from the talking-head rework (endless feed x3, scrolling in bed, novels, friends chatting, hobby + try-it photo rows, bags, chores, push-up counter, apps going away, coffee talk). About 45 type screens remain (her quotes on butter): the next pass if she wants more pictures. Old film.js: `archive/film-voice-2026-11-03/film.before-visuals-2026-11-19.js`.
- **Speed**: the film export now has Speed (0.9-1.5×) like the moments: render.mjs `--speed`, mixclip.py `--speed` (atempo before the -14 LUFS master), video setpts + 30 fps, .srt / speed, file name `_1.2x`. Tested 12 s at 1.25× -> 9.6 s, 288 frames, -13.6 LUFS (clip); whole film at 1.2× = 10:50, -14.1 LUFS (audio measured). Test file binned.
- **Shorts sh01-sh12 motion only**: each `talking-head/shorts/shNN.js` = one full-frame film cutaway (9:16, synced by her words); manifest "film" link, "motionOnly": true, fmt A/F/M/K for title + captions (old fmt in "fmtFootage"), title on a band, captions boxed; covers alternate film screen (assets/covers/shNN-film.jpg) / big line. Ending = 09b + "How to Stop Doomscrolling: 9 Things I Do Instead". Footage versions: `archive/footage-shorts-2026-11-19/` (manifest, scripts, moments, edits, teaser, old kit).
- **Teaser**: motion only (film fills every stretch between the picture inserts; title cards and trailer sounds unchanged).
- Checks (composite check, 9:16): text collisions 0 (12 shorts + teaser), labels over graphics 0, gaps 0. Zoom / face rows are n/a (no footage). Sheets: `outputs/_review/shorts-motion-2026-11-19.jpg`, `film-contact-16x9-2026-11-19.jpg`, `film-contact-9x16-2026-11-19.jpg`, `teaser-motion-16x9-2026-11-19.jpg`, `teaser-motion-9x16-2026-11-19.jpg`.
- **2026-11-20 pictures pass 2 (coordinator brief):** 56 more type screens became pictures (49 new Pexels photos in film/assets/pexels/, credits in _credits.txt; photo rows for lists; feeds; bingo squares). Screens that still type words: 4 of 104 (open "Why is it so hard to stop doomscrolling?" = the topic on frame 1, "Boom.", the price "€5 or €7", the punchline "Social media can never beat genuine connection", now white on ink instead of gold), plus the labelled devices (bingo card names, the screen-time / tired meters, the NPR source, the stopping-cues cards). Was ~63 typed screens before. Photo arrival sounds vary by meaning (rows no longer all shutters). 16:9 bingo cards sit in the top 80 % (teaser 0:40 card no longer touches the caption). Captions in motion-only shorts at least 68 px. Covers: sh04/sh08/sh10/sh12 now a film photo under the line (8 picture covers, sh02 + sh06 big line alone). Backups: archive/film-voice-2026-11-03/film.before-pictures2-2026-11-19.{js,json}.
- Checks after pass 2: 0 text collisions, 0 labels over graphics, 0 gaps (12 shorts + teaser 9:16 and 16:9). Sound: 121 cues, 20 kinds, 0 whooshes; whole film at her levels -14.1 LUFS; AAC true peak <= -1.5 dBTP at 0 dB, -3.1 at her levels.
- Cold critics (sheets only): round 1 (before pass 1 fixes) shorts 4-6, covers 5, film 6, teaser 6 -> round 2 (after pictures) shorts 4-6, covers 4, film 6.5, teaser 5.5 -> round 3 (after cover + caption fixes) shorts 5-6 (sh01 03 04 05 07 12: 6), covers 5.5, film 7, teaser 6.5. Remaining critic notes: in 9:16 the film's landscape photos leave dark bands above/below; teaser 9:16 captions over busy photos; covers use her font-board serif faces (her rule, kept).
- Cold critic (sheets only, before the last fixes): shorts 4-6 (sh09 4), covers 5, film 6, teaser 6. Fixed after: bigger band titles (A/F), sh09 empty frame (a photo now opens the row), K tag on a dark band. Not fixed: captions caught mid-phrase in stills (karaoke chunks), teaser 16:9 the offline card touches the caption around 0:40, gold-on-black type screens, many butter type screens in a row.


## 2026-11-19: thumbnails reworked from her 50 picks (projects/THUMBS-REWORK-BRIEF-2026-11-19.md) — waiting on her eye
- Set is now 6 (best first): **09b** (kept, left scene brightened) · **11-is-5-hours-too-much** (NEW, copies pick1119-43) · **04b** (kept) · **14-read-dont-scroll** (NEW, pick1119-28) · **13-its-not-your-fault** (NEW, pick1119-22; her Øredev photo) · **03** (kept, After panel brightened).
- Retired to `archive/thumbnails-retired-2026-11-19/` (directions/ + png/ + kit-section-2-before.md): 01 (6/7, 6/6 this round), 04 (04b beat it), 07 + 07b (5-6.5 cold, a scold with no picture of the topic), 08 (flat lime template), 09 (replaced by 11), and two new ones that failed: 10 "I got my evenings back" (pick 17; 6/7, 6/6) and 12 "my offline evenings" (pick 12; 6/6, 4/5). **07's PNG stays in outputs/thumbnails/** because the shorts' end card (talking-head.json outroCard) points to it; not repointed (for her).
- Cold critic: 3 rounds, a fresh agent each, our cards shuffled into a YouTube feed with 10 of her picks (no notes). Alone r1/r2/r3; with title: 09b 7/7/7; 8/7/7 · 11 7/8/7; 7/7/7 · 04b 7/7/7; 7/7/7 · 14 5/7/7; 6/6/7 · 13 5/6/6; 6/7/7 · 03 6/7/6; 7/7/6. Same critics scored her picks 4-8 (pick 17 6/7, pick 12 5/6, pick 43 7/4-6). Nothing held 8 in every round; 13 and 03 are the weakest kept.
- **Upload 09b + "How to Stop Doomscrolling: 9 Things I Do Instead"**; Test & Compare 09b, 11, 04b (was 07 + same title; 07, 03, 08).
- Census (320 px): words left + her right = 2 (09b, 04b mirrored). Photos: her Øredev photos enhanced (Enhance photo --strength 0.5 --bg keep, face untouched) in design/thumbnails/assets/oredev/ (chin, smile, profile + cut-outs).
- New title options in kit 1a ("New title options (2026-11-19)"); kit section 2 rewritten; kit line 3 updated.
- Sheets: outputs/_review/thumbnails-2026-11-19.jpg (YouTube cards + the pick beside), outputs/_review/thumbnails-2026-11-19-retired.jpg. Generator: design/thumbnails/tools/gen-rework-2026-11-19.py (then `node render.mjs 11 13 14`; keeps her nudges, --force resets).

## 2026-11-16 (night): thumbnails, the 2 lowest of set 5 reworked (projects/WEAKEST-BRIEF-2026-11-16.md) — waiting on her eye
- Reworked 04 and 09 (lowest last scores: 09 r5 6.5, 04 r4 6.5). The old PNGs and sources stay exactly where they were; new ones beside them:
  - **04b-instead-of-scrolling**: INSTEAD OF SCROLLING + big red tags read / call home / ride a bike / + 6 more, her face big on the left, yellow. Board Thumbnails 129 (viral-3); font thumbs-12 Archivo Black red on yellow. Cold critic (PNGs alone): old 04 5.5 / 6 -> 04b 6.5 / 7 (rounds 2 / 3).
  - **09b-still-doomscrolling-at-2am**: STILL DOOMSCROLLING AT 2AM? over a stock photo of someone lit by a phone in bed (Pexels, cottonbro), her on the right in her dimmed room (1548). Board Thumbnails 98 (yt-45 IT'S A TRAP); font thumbs-16 Anton + red box. Cold critic: old 09 7 / 6 -> 09b 7 / 7.5 (rounds 2 / 3), best of round 3.
  - Round 1 drafts (DOOMSCROLLING IS A TRAP, 6; INSTEAD OF SCROLLING navy, 6) were replaced, not kept (my scratch only).
- **07b-wasting-your-evenings-scrolling** (07 copy with ONE fix: a 5th line "scrolling"; same board 84, Poppins, red "wasting", photo 1558; 07 untouched): round 4 cold critic 07 5 -> 07b 6 ("scrolling names the topic"; still "a scold with no payoff"). Recommendation stays 07; 07b now scores higher. Critic: 07 and 07b are the same thumbnail twice, keep one.
- Round 4 (all 9 PNGs): 01 7.5, 03 7, 04b 7, 09 7, 04 6, 08 6, 07b 6, 09b 6, 07 5. So 09b beat 09 in round 3 (7.5 vs 6), tied in round 2 (7/7), lost in round 4 (6 vs 7: "two faces fighting"): over 3 rounds 6.8 vs 6.7, a coin toss, kept beside 09 for her to judge. 04b beat 04 in all three rounds.
- Sheet: outputs/_review/thumbnails-before-after-2026-11-16.jpg (3 pairs). Generator: design/thumbnails/tools/gen-rework-2026-11-16.py (then `node render.mjs 04b 09b`). Kit section 2b has both new lines; recommended pair (07) unchanged.
- Census: words-over-picture left + her right is now 2 of 8 (07, 09b) = the max. Critic flags: 04b and 04 read as the same idea twice (pick one), 09b and 07 share a structure.
- Note for her: in these 3 cold rounds the recommended 07 scored 5 / 6 / 6.5 alone (critics: nothing says phone). Not changed (her pick stays); 09b and 01 scored higher in this pass.
- Still held back by photos: every photo of her is the same seated pose in one room (hand at chin / palm out). Critics keep asking for her reacting or doing the thing; photos of her reading, on the bike, thrifting, journaling or on a call with her mum would lift 01, 03, 04b and 09b (likely the step from 7 to 8).

## 2026-11-13: FULL-KIT pass (projects/FULL-KIT-BRIEF-2026-11-12.md) — DONE, waiting on her eye
- **Thumbnails (set 5, lifestyle look)**: 6 kept (07 wasting your evenings · 03 before/after · 08 LOG OFF · 01 OFFLINE hobbies · 04 my no-phone list · 09 cut your screen time), each a different thumbnail-board composition, font-board fonts in their colours; 5 cold-critic rounds, 23 tried, only these held >= 7. Upload 07 + "How to Stop Doomscrolling: 9 Things I Do Instead" (7.5 / 8); Test & Compare 07, 03, 08. Short of the brief's 10-12: needs her photos doing the hobbies. Notes design/thumbnails/README.md (SET 5).
- **Shorts sh01-sh12**: moments/formats.js ported from edge-case (font-board aware; Shift+Enter lines; covers photo / card big / frame; captions 2-5 words; chin rule) + moments/fontboard.js (per short fonts + colours, 3 board refs each in the manifest). Covers alternate kinds, search words. Mix -15 / -7 (edits/shNN.json). Cuts: sh07 out 666.8, sh10 908.55-961.6, sh11 cut "absolutely" 1052.88-1053.60. Checks: 0 collisions, labels in band, 0 zooms, 0 captions on her face (all 12). Cold critic r2: sh12 8; sh05 sh06 sh10 7; sh01 sh02 sh03 sh11 6; sh04 sh07 sh08 5; sh09 3; covers 5. Fixes after r2 (not re-scored): caption boxes in each item's ground (sh01 sh07 sh10), bigger captions (sh04 sh09), brighter karaoke (sh09 sh11), sh08/sh11 cover words, phone name fits.
- **Teaser v3** (PLAN-v3.md): hook whole -> idea -> READING / SOMETHING NEW / THRIFTING / CALL YOUR PEOPLE -> "It can never beat genuine connection" (drop) -> WHICH ONE WOULD YOU TRY? -> outroCard; ~110 s; voice transcript clean. Critic r2: 5 (bare talking stretches, length); opener made full-frame + question card after.
- Targeted pass after critic r2 (no more critic rounds): sh09 captions Bodoni cream, one colour, photos as full-width rows (visuals.js BG.trio), cover = big line + hobby photos; sh08 her larger (C scale 0.8), captions lower; sh07/sh08 pad dark (no yellow silhouette in stills); sh04 captions + tag bigger; sh10 cover = her in her room. Checks still clean.
- End card (outroCard): thumbnail 07 + new title. Old 01-too-tired thumbnail binned.
- Review: outputs/_review/fullkit/ (shorts-vs-board.jpg, covers.jpg, teaser16.jpg, snd/teaser-voice.txt) + outputs/_review/fmt/. Bin after her OK. Previews need a refresh before she exports.

Last updated 2026-11-13 by the full-kit agent (earlier: 2026-11-10 rollout agent (thumbnails, shorts formats, covers,

## 2026-11-10: rollout to the HTTP standard (ROLLOUT-BRIEF-2026-11-10) — DONE
- **Thumbnails rebuilt**: 10 new from her 29 Oct shoot (white shirt), Enhance photo, type set 06, best first, a mix (photo 4, collage 2,
  flat 3, other 1); old 12 in `~/.Trash/9-things-i-do-instead-of-doomscrolling-thumbnails-old-2026-11-10/`. Cold test by a fresh agent,
  fixes after it. **Upload: 01 "Too tired to stop scrolling?" + "9 Easy Things I Do Instead of Doomscrolling"**; Test & Compare 02 "Less
  phone, more life", 03 "I scroll less now". Editor http://localhost:7700/design/9-things-i-do-instead-of-doomscrolling/thumbnails/ ; sheet `outputs/thumbnails/overview.png`.
- **Shorts in a mix of formats** (talking-head.json "fmt"): sh01 I · sh02 D · sh03 H · sh04 K · sh05 H · sh06 B · sh07 J · sh08 C · sh09 G ·
  sh10 M · sh11 F · sh12 A. Sheet `outputs/_review/shorts-formats-v2.jpg`.
- **Covers** at 0:00 of every short (3 butter cards: sh02, sh08, sh11). Sheet `outputs/_review/covers.jpg` (full + 3:4 grid crop).
- **Ending**: "Full video on YouTube" card (manifest outroCard: thumbnail 01, the title, ink/cream/butter) on every short + the teaser.
  Stills `outputs/_review/outro/`.
- Kit updated (upload checklist, section 2 thumbnails as images, format + editor + cover per short): http://localhost:7700/kit/9-things-i-do-instead-of-doomscrolling/
- Checks (composite check, 9:16): text collision pass 12/12, label-over-graphic pass 12/12, short-zoom pass 9/12 (sh07 J / sh08 C cut-outs
  not measured; sh09 G letterbox 0.09, on purpose), face: small caption-over-chin touches in sh05 at 0:42-0:44 (0.01-0.09).
- sh07 0:03.74 flat-yellow cut-out: only in the stills tool (its single-frame seek showed the pad colour); a real export of 3.5-4.1 s is clean (outputs/_review/sh07-check/). sh05 captions now sit under her chin (face check clean). Kit 1a points to the new thumbnails 01-10.
 end card).

## 2026-11-07 night: "show, don't type" rework (same as the edge-cases video she approved)
Words on screen outside captions: 434 -> 42 (32 -> 3 a minute). Keywords, sentence cards, word panels, list boxes and photo captions are gone;
photos, an endless phone feed, a push-up counter, apps disappearing from a phone, and off-black grounds for the rooms and splits.
Cut fixes: "number eight" is now cut cleanly (the old cut left half-words) and the stray "Yeah." caption is gone. Caption fixes: "boredom",
"Medium". Compare: outputs/_review/before16.jpg and after16.jpg. Details: talking-head/HANDOFF.md.
Please listen to (whisper is unsure; times in the recording): 7:44 "people's voices sit with the little bit strange…", 10:30 "I didn't even own a bike before for
them", 16:53 "physical activities done much", 19:04 "journal about your library".

## Done
- Recorded (`kit/raw-video.mov`), transcribed, cut list in `kit/transcripts/CLEANUP.md` (cleaned edit about 14:46).
- **Refined kit** `kit/refined-kit.md` (the only kit; her original kit moved to `archive/original-kit/`): live research (news, outliers, search phrases), titles (all 40-60 characters, checked in code), a thumbnail concept per title (a mix of kinds), description with 7 chapters timed to the cleaned edit, tags, 12 shorts planned with raw in/out times and captions for YouTube Shorts / TikTok / Reels / LinkedIn / X, 3 independent shorts with full word-for-word scripts and recording directions, first 30 seconds of the edit, edit notes (receipts, black phrase cards, Pexels search words), teaser plan, carousel plans, long-form posts, her essay.
- Cold review (fresh agent, titles + thumbnails + short labels/captions only): everything under 8 was rewritten (details in kit 7d; not re-scored after the fixes).

## Recommended
- Title: 9 Easy Things I Do Instead of Doomscrolling
- Opening line: "Why is it so hard to stop doomscrolling? Well, maybe because the apps are intentionally designed…" (raw 0:24.9, after 24 s of setup)
- End screen: https://youtu.be/5Fpb2bUhHXc

## Film directions (2026-11-02, directions agent, batch 2)
- `film/stills/directions/`: 3 looks: **A · Offline Bingo** (recommended: the 3x3 card is the 1-9 counter), B · Junk Journal, C · The End (stopping cues). Each has 4 x 16:9 + 2 x 9:16 stills and a motion test with her voice (-14 LUFS); talking-head frames over her real footage (TH: half and half, screen behind her, journal page behind her, NPR receipt, number-8 correction) and shorts frames (SH s1-s3, no timers). `overview.png` = everything at one glance, grouped by look. README.md has the scores.
- **Waiting on her:** pick ONE look for the whole video.

## Waiting on her
- 7 questions in kit section 0 (facts to check, cuts that need her ear, photos).
- Photos of her without the mic for the photo-led thumbnails.

## Next
- Apply the CLEANUP cuts + her answers, build the full talking-head edit in its own new look (2-3 directions first), then shorts, thumbnails, carousels, teaser. Re-time chapters to the exported file's .srt.

## Design (2026-11-06, design agent)
- **Thumbnails**: 12 in look A Offline Bingo (5 photo, 2 collage, 3 flat, 2 other), 2-3 kit titles each; three cold critic rounds (18 built, 6 cut). Best pairs scored 8: 09 9 EASY SWAPS, 10 MY NO-PHONE LIST; 11 SWAP THIS → FOR THIS 7.5-8. `outputs/thumbnails/` + overview; editor http://localhost:7700/design/9-things-i-do-instead-of-doomscrolling/thumbnails/ ; notes `design/thumbnails/README.md`.
- **Carousels**: Instagram 13 slides, LinkedIn 9 slides + carousel.pdf, in look A, her words from the transcript. `outputs/carousels/`; editors /design/9-things-i-do-instead-of-doomscrolling/carousels/instagram/ and /linkedin/.
- Waiting on her: picks; her own photos (kit question 5) and a photo of her without the mic.

## Build (FILM agent, 2026-11-03 → 11-06): her pick A · Offline Bingo
- **Full talking-head edit** (`talking-head/talking-head.json` moment `full`, plan `talking-head/moments/plan.js`): her whole video cleaned (CLEANUP retakes + pauses tightened to 0.55 s, 0.8 s kept before each new item), 13:04. The bingo card is the 1-9 counter (a mini card top right while she talks; every item opens the big card and daubs its square). "number eight" for long-form (raw 15:07.7) is cut and the card shows 06 (kit question 1; to keep her words, remove that cut in the manifest). Stray "Yeah." (16:03) cut (question 3). 118 layout segments (half, split, tile, room, presenter, over-the-shoulder, words behind her, keywords, ink phrase cards, full inserts). Her usual 16:9 captions.
- **12 shorts** sh01-sh12 (kit section 3 ranges), 9:16, her 4:5 window, each its own top-title + caption style in the bingo look, end on her last word (no outro clip yet: the old ones show other videos).
- **Teaser** 88.8 s: 18 bites, 3 title cards (9 SWAPS, OFF LINE, INSTEAD OF DOOMSCROLLING), the music drops for "It can never beat genuine connection", end card with the full card.
- **Motion film** (`film/film.json`, 104 screens, voice = the full edit's cut, 13:00), 16:9 + 9:16.
- Chapters on the full edit (until she exports): 0:00 Why it's so hard · 1:05 How to choose · 1:31 1-2 · 3:56 3-4 · 5:54 5-6 · 9:49 7-8 · 11:40 Cutting back and 9.
- Caption fixes from whisper slips: doomscroller, Substack, "cold turkey" (raw 19:26, heard "kotoki": please check), "if I still knew how to", "you live alone".

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.
- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

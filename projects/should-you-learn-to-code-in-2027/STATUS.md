# STATUS: should-you-learn-to-code-in-2027

Last updated 2026-11-19 (late) by the caption agent; before: 2026-11-13 by the FULL-KIT agent (projects/FULL-KIT-BRIEF-2026-11-12.md): thumbnails, all 8 shorts, teaser v3, kit. Full edit untouched (timing identical, checked in data/edl.json).

2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

## 2026-11-19 (late): her notes on the full edit: opening cut, no correction screen, caption accuracy pass
- **Opening (her note):** cut "I was checking and I was seeing this thing from Indeed's research team, and they found out that" (raw 9.32-15.30 -> 6.03 s; manifest cut in full, sh01, teaser bite 1). Starts on "In the first quarter of 2026". The correction pause (fix-15) is removed (kept as "pausesRemoved-2026-11-19" in talking-head.json); the Indeed pages + "Source: Indeed Hiring Lab" credit carry the source (indeed-title at "in the first quarter", 4.5%, +15%). The +15% page is now over her shoulder (TH.ots) instead of "make room", which showed only the shelf.
- **Captions:** ~30 word fixes (list: kit 7e) from her 5 notes + a whisper large-v3-turbo pass (~/.cache/whisper/ggml-large-v3-turbo.bin) on the raw sound, short clips and every moment's rendered voice. Words dropped by the engine (start in a trimmed silence) moved onto her voice; moment edges moved into silence (sh02 in 46.36 / out 110.60, sh03 out 133.10, sh04 out 214.62, sh05 in 237.52, sh06 out 313.95, sh07 cut 360.70-372.0, sh08 in 214.62, teaser bites 119.30-133.10, 158.0-161.20, 166.95-181.95, 237.52-256.08). The 5:17 cut is undone: "Some people call them staff engineer." (kit Q12).
- **Lengths:** full 391.43 -> 381.77 s (export 6:22); sh01 26.7, sh02 46.6, sh03 28.3, sh04 68.1, sh05 30.7, sh06 53.3, sh07 65.4, sh08 27.7, teaser 107.5 (each incl. the ending). Chapters re-timed in kit 1b/1c (0:00 0:34 1:37 2:18 3:20 4:12 5:10).
- **Checks:** composite check full 16x9 + 9x16: text collision 0, layout variety pass (split 39 %). Every moment's graphics unchanged (same scene ids as before). caption-accuracy: remaining diffs are read and kept on purpose (final "s" disagreements, her "vibe"/"a model"/"are", silence hallucinations "Thank you", "Maybe not"): talking-head/build/captioncheck-2026-11-19/caption-diff-after.txt. Stills: outputs/_review/learn-opening-2026-11-19.jpg.
- Backups: talking-head/build/*.before-captions-2026-11-19. Film (dropped) words regenerated with the same fixes (film/data/words.json); its own voice edit still ends with the old cuts.
- Waiting on her: listen to the opening and 5:00-5:05 ("staff engineer" back); export again (old exports have the pause and the old captions).

## 2026-11-19: thumbnails reworked from her 50 picks (projects/THUMBS-REWORK-BRIEF-2026-11-19.md)
- **Kept:** 01 chart (cold 6/7, 7/7, 6/7; the 4.5% label is now 92 px and the source line reads "Share of US developer job posts, Indeed 2026"), 04b (6/6, 6/7, 7/7; red CHARGED TWICE tag added), 05b (7/6, 6/6, 7/6; new main title "Stop Learning to Code the Old Way (Do This Instead)").
- **New:** 07 BEFORE / AFTER + 2027 ROADMAP (copies pick1119-06; before = shoot 1613 in her room, after = Øredev, explaining with both hands): 6/4, 6/6, 5/6. Kept as the only before/after, below 7.
- **Retired** (moved to archive/thumbnails-retired-2026-11-19/, directions + PNGs): 02, 03, 06 (the same calm face), 04 and 05 (replaced by 04b and 05b), the old set-2 02-4-5-percent PNG (no editor used it), and the new 08 (pick 09), 09 (pick 07), 10 (pick 04), 11 (pick 48), 12 (pick 32), 13 (pick 22), which scored 3-6 with three fresh cold critics shown YouTube-card feeds of the picks.
- Øredev photos enhanced into design/thumbnails/assets/oredev/ (6 photos + cut-outs; the Øredev logo and the laptop sticker are cropped out wherever used).
- **Recommended:** 05b + "Stop Learning to Code the Old Way (Do This Instead)" (the round-3 critic's upload pick); Test & Compare 01 + 04b. Was: 01 + "Junior Developer Jobs Are Rare. Should You Still Code?". outroCard NOT repointed (still 01): listed for her.
- **Short of the brief:** 4 thumbnails, not 6-10, and none at 8. The copies of the picks lost to the originals (they read as knock-offs), and the soft second messages ("it's not too late.", "Still worth it?") did not say coding.
- Sheets: outputs/_review/thumbnails-2026-11-19.jpg (cards + the board item each copies), outputs/_review/thumbnails-2026-11-19-retired.jpg. Source: design/thumbnails/tools/set_2026_11_19.py (07; `--all` rebuilds the retired ones), tools/cards.py (YouTube-card sheets).

## 2026-11-16: weakest thumbnails reworked (projects/WEAKEST-BRIEF-2026-11-16.md)
Took the 3 lowest of set 3 (05 5/6, 04 6/7, 06 6/7.5); old PNGs and sources untouched, new versions beside them, editable in the thumbnail editor.
- **04b** `outputs/thumbnails/04b-read-the-code-ai-writes.png`: board yt-38 (TWO SUM: topic huge across the top, a sheet of paper below), no face. READ THE CODE / AI WRITES + a printout where the card is charged twice, the second `charge(order.card);` circled in red. Fonts thumbs-13 Archivo Black (white, black outline, on tan #C79A5E) + thumbs-08 JetBrains Mono. Cold alone: R1 6.5, R2 7, R3 7 (old 04 in the same rounds: 6.5, 6, 6). **Kept.**
- **05b** `outputs/thumbnails/05b-learn-to-code-the-new-way.png`: board yt-60 (STOP LEARNING CODE THE OLD WAY), mirrored: her left (shoot photo 1619, hand at her hair: the one pose not used yet), STOP LEARNING TO CODE / THE OLD WAY (red box) + `print("Hello World")` struck through. Fonts thumbs-11 Oswald Bold #111 on blue #2EA6DE + thumbs-01 Anton on a red box. Cold alone: R1 6, R2 6, R3 7, ranked first in R3 (old 05: 6, 6, 6). **Kept.**
- 06b (yt-79: her left, a screen of code labelled "// written by AI", "too late? / to learn to code"): R1 6, R2 6.5, R3 6, so no better than 06 (6.5, 6, 6) and every critic called it 06's twin. **Not kept** (in ~/.Trash/should-you-learn-to-code-thumb-06b-not-kept-2026-11-16/).
- Sheet: `outputs/_review/thumbnails-before-after-2026-11-16.jpg` (old | new, scores under each). Recommended thumbnail unchanged (01). Layout census on the 320 px sheet: words left + her right = 2 (02, 04).
- Still none at 8 alone. All three critics named the same blocker: the same outfit and the same calm face in 7-8 of 9 thumbnails. The two that went up did it by not leaning on her face (04b has none, 05b's hook is the words). Expressive outfit-D photos (pointing, surprised, laughing, holding a laptop or phone) are still the one thing that would lift the face-led ones.
- Critic notes not applied (would need another round): 04b a small red CHARGED TWICE beside the circle; 05b the code card about 1.6x bigger; 02 needs a visible error under its code line; 01 a label saying what the % measure (share of dev job posts).

## 2026-11-13: full-kit pass (her standard, one pass)
**Thumbnails (set 3, 6):** each copies a different board item (yt-36, yt-25, her ux-research thumb, yt-51, yt-29, yt-76), font-board fonts in their colours, outfit-D shoot photos (Enhance, no-lift). 13 built, 7 dropped by 3 cold rounds. Scores alone / with title, round 3: 01 7/7 (7/8 earlier), 02 7/7.5, 03 7/8, 04 6/7, 05 5/6 (rebuilt, not re-scored), 06 6/7.5. **Short of the brief: 6 not 10-12, none 8 alone**; blocker = all outfit-D photos share one calm face / crossed arms: ask her for expressive photos. Recommended: 01 + "Junior Developer Jobs Are Rare. Should You Still Code?"; Test & Compare 03 + 02. Sheet outputs/_review/thumbnails-vs-board.jpg; overview outputs/thumbnails/overview.png. Old 02 PNG kept until she looks; old set in ~/.Trash/should-you-learn-to-code-thumbnails-set2-2026-11-12/, dropped ones in ~/.Trash/should-you-learn-to-code-thumbnails-set3-dropped-2026-11-13/.
**Shorts (8, rebuilt look):** talking-head/moments/boards.js (NEW, last in "common"): per short 3 formats-board refs ("board"), 1-2 font-board fonts ("fonts", "colours"), its own captions / label / cover; the kit graphics draw in the short's fonts ("Helvetica Neue" + RVMono re-pointed per page).
| short | fmt | board | fonts | cover (kind) |
|---|---|---|---|---|
| sh01 | I pop-ups | 16 · 66 · 8 | thumbs-02 Inter Tight | Only 4.5% of software / job posts on Indeed / are entry level (her room) |
| sh02 | G letterbox | 12 · 40 · 47 | pair-07 Gloock + combo-12 Switzer | Is learning / to code still / worth it with AI? (big line) |
| sh03 | J slide behind | 64 · 65 · 38 | shorts-15 Inter Tight + DM Mono | Learn to read code, / not just write it (slide over her) |
| sh04 | B split | 6 · 18 · 25 | shorts-03 Permanent Marker + design-29 DM Mono | DEBUGGING / AI CODE (big line) |
| sh05 | M full frame | 15 · 29 · 44 | thumbs-16 Anton | WHY ONE PAYMENT / GETS SAVED TWICE (her room) |
| sh06 | K subtitles | 52 · 67 · 48 | shorts-11 Newsreader + shorts-10 Bodoni Moda | AI BUILT A / PHARMACY APP (slide: the shelf) |
| sh07 | A wide + band | 57 · 58 · 21 | shorts-20 Satoshi Black Italic | Learning to code / in 2027 is not / a job guarantee (her room) |
| sh08 | D captions on top | 9 · 36 · 3 | thumbs-18 Montserrat | System design / for beginners (big line) |
Speech: sh01 ends on "doesn't exist anymore" (no correction card) and drops the unclear "struggling… reduced"; sh02 drops "this video is for you" + the someone-I-know / so-easy aside; sh03 ends on "what you asked for"; sh06 ends before the unclear "is the reason why…". Whisper of each new sound: clean. Mix edits/shNN.json music -15, sfx -7. Ending: outroCard = thumbnail 01 + the recommended title.
Checks: tools/v3check.mjs all pass (no text on text, labels in band, nothing on her face); composite check 9:16: text collision 0, 0 zooms; sh02 face 0.09 (letterbox, by design), sh03 cut-out (not measured), sh01 5.6 s with no graphic (the ladder card was unreadable small, dropped).
Critic (fresh, sheets only): round 1 shorts 6-8, covers 5-7, teaser 6; round 2 shorts sh02 sh03 sh07 sh08 = 8, sh01 sh04 sh05 sh06 = 7, covers 7-9 (sh01/05/07 alike), teaser 7. Fixed after round 2 (not re-scored): sh01 ladder dropped, sh04 code panels dark + captions on her video, sh05/sh06 captions higher, covers sh04 big line / sh05 words on her wall / sh07 band under her, teaser font Archivo + dark split ground.
**Teaser v3** (106 s + 6.5 s ending, 16:9 / 1:1 / 4:5; plan talking-head/teaser/PLAN-v3.md; v2 in archive/teaser-v2/): hook (junior roles rare + Indeed 4.5%) -> the idea (is there a point? yes, not the old way) -> READING CODE -> DEBUGGING (crash, try-catch, still not signed up) -> PAYMENTS (webhook twice) -> takeaway (music stops) -> ending. Fonts design-07 Archivo + design-29 DM Mono. Checks: text collision 0 in all three. 4:5 / 9:16: she sits on top with an ink caption band under her whenever she talks (captions off her chin; composite check face: clean). 1:1: check still flags ~0.2, a false positive: its face box is in layout px, the captions in 1:1 output px; mapped, captions sit about 100 px below her chin. Voice transcript outputs/_review/fullkit-2026-11-13/teaser/teaser-voice-transcript.txt.
Sheets: outputs/_review/fullkit-2026-11-13/ (sheet-shNN.jpg = 3 board refs + 4 stills, sheet-shorts.jpg, covers.jpg, check/, teaser/, outro/).
Waiting on her: look in the studio (scrub to 0:00 for each cover), export; expressive photos for thumbnails; the year + title (kit "Upload" 6: year-free title recommended); listen items below.

## Before (earlier passes)
Earlier: last updated 2026-11-10 (rollout: thumbnails, short formats, covers, end card).

## State
Her pick (2026-11-02): **B · You are the reviewer** for the whole video, with **A's missing-rung ladder** in B's colours for the
4.5 % part. Built in the studio (2026-11-03 to 11-06) by the FILM agent: full talking-head edit, 8 shorts, teaser, motion film.
Nothing exported (she exports). Thumbnails and carousels: DESIGN agent (design/, outputs/thumbnails|carousels).

## 2026-11-07 evening: "show, don't type" rework (same as the approved edge-cases pass)
- Full edit, shorts and teaser: every keyword and every card that re-typed her sentences is gone (her on camera with a push, or a
  picture: the old for-loop lesson struck through, the two fixes as code, browser -> server -> database with the request
  travelling, the laptop photo); about half the review sheets are now dark code views; captions read on every ground.
- On-screen words: 96 -> 48 a minute (what is left is mostly code and the review-sheet lists of the look she picked).
- Fixed a cut: the "Senior roles, yeah" cut clipped her "So" of the kept line (now cut in the silence).
- Compare: `outputs/_review/before16.jpg` and `outputs/_review/after16.jpg`.
- To decide: fewer review sheets if she wants even less text; caption at ~2:29 "it The second skill…" (editable in the studio).

## 2026-11-10: rollout to the HTTP standard (projects/ROLLOUT-BRIEF-2026-11-10.md): DONE, self-checked
- **Thumbnails** rebuilt: the 20 old ones (video frames, shorthand) are in ~/.Trash/should-you-learn-to-code-in-2027-thumbnails-old-2026-11-10/.
  10 new ones (`outputs/thumbnails/01-…10-`, overview.png), her shoot photos outfit D (IMG_1607, 1611, 1614, 1615, 1616, 1618: none of
  the scholarships ones) through Enhance (`design/thumbnails/assets/shoot/`), class no-lift. Mix: photo 01 03 07 08, flat 02 05 09,
  collage 04 10, other 06. Cold review 3 rounds (fresh agent, pictures only): 02 03 06 07 08 09 = 8/8; 01 04 05 10 fixed after
  round 3 (were 7), not re-scored. **Recommended: 02 "4.5% of developer job posts are for beginners" + "Junior Developer Jobs Are
  Rare. Should You Still Code?"**; Test & Compare 03 + 09.
- **Shorts in a mix of formats** (manifest "fmt"): sh01 I · sh02 H · sh03 J · sh04 B · sh05 M · sh06 K · sh07 F · sh08 D (each once,
  new formats H I J K M = 5). Code: talking-head/moments/formats.js (port of dark-patterns' formats, set 03 + amber), plan.js calls
  LCF.fmtInstall (shorts only; full edit unchanged). Captions read the pixels under them (ink on amber / light sheets).
- **Covers** in every short (first 0.1 s, editable at 0:00 'cover/cover'): photo covers show her still 320 px lower so the line
  (y 330-800) sits above her head; cards sh04 (amber) + sh08 (grey). Stills: talking-head/tools/covers.py -> assets/covers/.
- **Ending**: manifest "outroCard" (thumbnail 02, the title above, ink / white / grey / amber) on every short + the teaser.
- **Phones**: none drawn in this project's moments / film code (checked).
- Sheets: outputs/_review/shorts-formats-v2.jpg, covers.jpg, outro/ (bin after she has looked).
- Checks (composite check 9x16): text collision passes on sh03 sh05-08; hits only on the 0.2 s entry of the end card (opaque card)
  and sh01 27.7 s (the ladder's "69.3%" and "ENTRY LEVEL" touch inside the smaller pop-up card); face ok; short-zoom pass
  (sh03 J = cut-out, not measured, as in the playbook); label-over-graphic pass.
- To decide: the year (titles say 2026: switch to 2027 in early January), the title (click-led recommended vs search-led backup).

## Editors (studio: http://localhost:7700)
- Full talking-head edit: http://localhost:7700/moment/should-you-learn-to-code-in-2027/full/
- Shorts: http://localhost:7700/moment/should-you-learn-to-code-in-2027/sh01/ … /sh08/
- Thumbnails: http://localhost:7700/design/should-you-learn-to-code-in-2027/thumbnails/
- Teaser: http://localhost:7700/moment/should-you-learn-to-code-in-2027/teaser/
- Motion film: http://localhost:7700/edit/should-you-learn-to-code-in-2027/

## What is built
- **Full edit** (6:30 = 385.9 s of her + the 4.5 s correction pause): CLEANUP restart cut, "Senior roles, yeah" cut (kit Q2),
  the unclear half-sentence at 5:17 cut (kit Q12), ends on "in this age and time" (kit Q4), pauses tightened.
  **Correction (pause her)** after "June this year": "Correction: Indeed found this, not me. US software development postings
  rose almost 15%, late February 2025 to June 2026." Layouts: split, over-the-shoulder window, window tile, make room, presenter,
  page, side stack, pop-around, phrase cards, full-frame review sheets; receipts = the real Indeed Hiring Lab pages (credited).
- **Shorts** sh01-sh08 (kit section 3; SH1 also gets the correction pause). Her 4:5 window, top title amber box or review-sheet tab
  (alternating), captions C2. No timer, no overlay shout, no outro clip (none recorded for this video): each ends on her last word.
- **Teaser** (95.9 s, 13 lines, 3 title cards, music stops for the promise line, end card). 16:9 / 1:1 / 4:5 in the editor.
- **Motion film** (6:27): one scene per line of hers, review sheets, real pages, ladder, webhook, pharmacy shelf; 16:9 + 9:16.

## Decisions (tell her; each is one line to undo in talking-head/talking-head.json "cuts")
- Cut [44.82, 46.62] "Senior roles, yeah"; cut [317.82, 318.96] the unclear "some point before them start engineer"; end at 396.27.
- Captions follow kit fixes: "add the human in the loop" (she may have said "your mind", kit Q10), "that stock app", "2027",
  "debugging", "they rose about 15%".

## Waiting on her
1. Listen at raw 0:25 ("struggling"?), 3:20 ("the human" / "your mind"), 4:45, 5:14-5:18 (we cut the unclear half-sentence).
2. Outro clip ("full video on YouTube") for this video, if she wants one on the shorts and teaser.
3. Title + year (kit Upload 6: year-free title recommended). Re-time the chapters on the file she exports (the pause adds 4.5 s after 0:38).

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.

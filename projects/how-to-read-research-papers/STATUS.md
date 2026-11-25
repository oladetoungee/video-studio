# STATUS: how-to-read-research-papers

Last updated 2026-11-20 by the CAPTION-ACCURACY agent (section below). Before: 2026-11-19 (thumbnails reworked from her 50 picks, see the first block); 2026-11-16 (thumbnail rework); before: 2026-11-13 by the FULL-KIT agent (projects/FULL-KIT-BRIEF-2026-11-12.md). Nothing exported; she exports.

## 2026-11-20: caption accuracy pass (her rule 2026-11-19: "I don't want to be correcting captions")
- Every caption of the full edit, the 11 shorts and the teaser checked against a second, stronger transcription (whisper large-v3-turbo) of each one's own sound, plus short clips around every doubtful word (turbo + small.en). **5 caption fixes**, the big one: 3:41 (and sh04) "a research paper that is relevant to your own study" -> "that is **not** relevant" (the caption said the opposite of what you said). Also 5:54 "I would say a student" -> "I would say if you're a student"; 7:21 "or at these people's offices" -> "Was it at these people's offices"; 9:13 "So survey paper" -> "A survey paper"; a stray "this," on sh11's first caption.
- **Clip edges**: the shorts are cut back to back, and most cut points sat on the first sound of a word (sh02 began without "You", sh05 and sh07 without "Now", sh08 without "The"; sh03, sh04, sh06, sh09 ended on the first sound of the next sentence). 29 edges moved into the silence before. Short lengths change by at most 0.3 s; teaser 99.4 s. Full edit unchanged (chapters unchanged).
- Checks: composite check all, 16:9 + 9:16: text collisions 0 new. Diff files: talking-head/build/captioncheck-2026-11-20/ (CHANGES.txt first). Backups: talking-head/build/*.before-captions-2026-11-20.
- Listen to: 8:18 "they found that a study sponsored by the companies" (or "the studies"), 5:58 "just project like 3-4-5 hours", 1:52 "what their study cannot tell you". Old exports have the old captions: export again.

## 2026-11-19: thumbnails reworked from her 50 picks (projects/THUMBS-REWORK-BRIEF-2026-11-19.md)
- **Final set: 4** (02b, 08, 09b, 12). Cold critic: 3 fresh rounds, each card shown as a YouTube card (thumbnail + title) in a feed of 10 of her picks, and alone at phone size. Round 3, alone / with title: **08 7/8 (recommended, unchanged)**, **02b 7/7 (Test & Compare)**, 09b 6/7, **12 6/7 (new)**.
- **Kept:** 08 (best in all 3 rounds: 6/7, 7/8, 7/8), 02b (7/7, 6/7, 7/7), 09b (6/7, 7/7, 6/7). **New:** 12 "STOP READING / EVERY WORD" copies pick1119-24 (Øredev photo 55642441705, Libre Baskerville Bold = thumbs-05; 6/7 all rounds).
- **Retired** to archive/thumbnails-retired-2026-11-19/ (directions/ + png/): 02 (02b says it in numbers, scores higher), 05 (text-loaded clippings, no face), 09 (three text blocks; 09b keeps the idea).
- **New drafts dropped under 7 with title** (archive/thumbnails-retired-2026-11-19/drafts-below-7/): 10 Read Smarter (pick 28; 3/5, a near-copy of the pick), 11 finally, it makes sense. (pick 27; 4/5), 14 you're not slow. (pick 22; 5/6), 13 Skim. Read. Deep dive. (pick 34; 4/6, 4/6, 3/5), 15 is 10 min enough? (pick 43; 3/5, 4/6), 16 read like a researcher (pick 11; 5/5, 4/5). To revive one: move its folder back into design/thumbnails/directions/ and run node render.mjs <name>.
- Layout census: words left / her right = 08 + 12 (2, the max). Fonts all from the font board in their source colours. Her face untouched (Øredev photos through Enhance photo --bg keep --strength 0.5; compared side by side with the originals).
- Kit: line 3, 1a "New title options (2026-11-19)", section 2 rewritten (previous recommendation line kept). Shorts ending card (outroCard) keeps 08: nothing to repoint.
- Sheets: outputs/_review/thumbnails-2026-11-19.jpg (set as YouTube cards + the pick each copies), outputs/_review/thumbnails-2026-11-19-retired.jpg, outputs/thumbnails/overview.png. Source: design/thumbnails/tools/gen-rework-2026-11-19.py (writes only 12 unless --all). New assets: design/thumbnails/assets/photo/oredev/ (5 photos + cut-outs), fonts/Poppins-Bold.ttf (font board thumbs-10, used by a dropped draft).
- Waiting on her: pick the upload thumbnail (08 recommended), export.

## 2026-11-17 (night): shorts, weakest pass (projects/WEAKEST-BRIEF-2026-11-16.md)
- **sh06** (J, critic: panels hold small graphics in a mostly empty screen). The J screen now gives a graphic the space down to just above her head (760 px, was 460) and draws it 1.3x larger (the two-card compare stays at 1x, it needs the width; its third row now fits in the card). Critic 4 -> 5. Kept. Sheet outputs/_review/sh06-before-after-2026-11-16.jpg.
- **sh04** (H, the five Cs list and Keshav page were tiny in the 900 px panel). In a low 9:16 panel the five Cs show the five questions alone, big (64 px rows, bigger ticks, short credit; the page is on screen just before in the Figure 2 shot). New short-only insert on "three hours, four hours, five hours": the three passes with pass 3 (4-5 hours) lit (was 24 s of talking). Pass cards keep room for a short credit in low panels. Critic 4 -> 4.5 (round 1) -> 5 (round 2). Kept. Sheet outputs/_review/sh04-before-after-2026-11-16.jpg.
- Checks: composite check sh04 / sh06 9:16: 0 text collisions (sh06 labelOverGraphic "fails" = pages above the frame top in a no-label format, as before); teaser 16:9 / 1:1 / 4:5 0 collisions; full 9:16 only the old three-checks hit at 6:22 (was there before: checked with the old files). Every moment builds.
- Files: talking-head/moments/formats.js (RF.jRoom + RF.JK), talking-head/moments/plan.js (s54 hours-passes), film/scenes/rp.js (RP.fiveC + RP.passes low-panel layout, 9:16 only when the panel is under 1200 px). Old copies: archive/weakest-2026-11-16/. Previews need a refresh before she exports.

## 2026-11-16 night: thumbnails 02 and 09 reworked (WEAKEST-BRIEF-2026-11-16), old ones kept beside them
- **02b "4 hours | 10 minutes"** + "same research paper" (beside 02 "every word | 3 passes", which used the method's name strangers don't know): same split (Thumbnails 69), right photo now 1603 (knowing smile), numbers from Keshav (detailed pass 4-5 hours for beginners, first pass 5-10 minutes). Cold critic, 3 fresh rounds, alone: 02 5.5 / 4 / 5.5 -> **02b 7 / 7 / 7**.
- **09b "Can you trust this study?"** (beside 09): a different board composition (Thumbnails 141: the real paper big, her in a round camera bubble) instead of a second "words left / her right"; two verbatim lines of Caine's abstract ("and the most / common sample size is 12."), re-shot from open.clemson.edu at 3x, highlighted, 12 circled; thumbs-01 Anton + red box. 09 7 / 7 / 6 -> 09b 6 / 7 / 6.5 (about level; round 1 saw an earlier draft with the full paragraph and a small bubble).
- 05b (each Keshav label with its question written out) scored lower than 05 (3 vs 4: text ~6 px on a phone): dropped, in ~/.Trash/research-thumbnails-05b-2026-11-16/.
- Recommended stays **08** (critics 6.5 / 6 / 6 alone in these rounds; nothing in the set reached 8 alone). Critic notes that apply to the whole set: the same calm face in most of them; 08 gives the answer away (list visible).
- Sheet: outputs/_review/thumbnails-before-after-2026-11-16.jpg. Source tools/gen-rework-2026-11-16.py (same editable system as set 3). Old PNGs untouched (md5 checked). Kit section 2 has both lines.

## 2026-11-13: full kit to her standard (thumbnails set 3, shorts font-board pass + new covers, teaser v3, kit)
- **Thumbnails set 3**: 12 built over 6 cold-critic rounds (PNGs only), 4 kept: **08 "Read these parts first"** (7.5 alone / 8.5 with "You're Reading Research Papers in the Wrong Order", recommended, outroCard thumb), 05 (7 / 7.5), 02 (6 / 7.5), 09 (6.5 / 7.5). Each copies a different board item; font-board fonts in board colours; outfit C shoot photos (face untouched); only 08 is words left / her right. Set 2 + drafts in ~/.Trash/research-thumbnails-set*. Source design/thumbnails/tools/gen-set3.py (03 dropped after it: see README). Sheets outputs/_review/thumbnails-vs-board.jpg, thumbnails-census-320.jpg, outputs/thumbnails/overview.png.
- **Shorts** (all 11): new moments/fontboard.js (RF_FB per short: board fonts + source colours) + formats.js hooks (titles, posters, tag, M box, bands, captions in 2-4 word phrases, Shift+Enter line breaks in covers/titles, no line pattern) + 3 cover kinds (photo = her real room / big line / frame = a slide from the short; assets/covers/shNN-frame.jpg). SH4 E -> H. Graphics serif in shorts + teaser = Newsreader 600 (shorts-11; rp.js swaps it, full edit keeps DM Serif). sh10 starts on "How do you keep notes on your research papers?" (raw 515.05); sh11 starts on "If you think…" (556.80), "But yeah, that's it" cut (594.05). Mix music -15 / sfx -7 (edits/shNN.json). Graphics clamp at the last word (plan.js). Backups talking-head/build/*.before-fontboard.*.
  | short | fmt | board | fonts | cover |
  |---|---|---|---|---|
  | sh01 | H | 36 62 34 | thumbs-04 Playfair Black Italic | photo |
  | sh02 | B | 5 9 47 | design-04 Big Shoulders | frame |
  | sh03 | M | 69 54 2 | combo-22 Inter Tight Black | big |
  | sh04 | H | 26 68 20 | combo-19 Archivo 900 | photo |
  | sh05 | K | 67 39 22 | thumbs-15 Libre Baskerville | frame |
  | sh06 | J | 64 65 38 | design-23 Shrikhand | big |
  | sh07 | G | 12 40 47 | thumbs-11 Oswald | photo |
  | sh08 | I | 66 16 10 | combo-16 Archivo 800 | frame |
  | sh09 | A | 42 21 44 | design-12 Inter Tight 800 | big |
  | sh10 | C | 65 33 63 | combo-11 Caveat Brush | photo |
  | sh11 | F | 57 30 45 | design-28 Archivo 68% width | frame |
  Checks (composite check 9:16): text collisions 0 in all 11; captions on her face 0; zooms 0 (face median 0.16-0.29; J/C not measured, G letterbox 0.09 as designed). labelOverGraphic "fails" in sh02/03/05/06 are Keshav pages extending above the frame top in formats with no top label (n/a). Sheets outputs/_review/fontboard-2026-11-13/ (covers-sheet.jpg, shorts-sheet-1/2.jpg with board refs).
- **Teaser v3** (plan talking-head/teaser/PLAN-v3.md): hook (not a novel / same parts) -> Keshav's three passes -> cards PASS ONE / PASS TWO / PASS THREE / READ CRITICALLY, each with 2 complete lines -> takeaway "limitations = your research gap" (music stops) -> "Do you read them digitally?" -> outroCard. ~100 s + 6.5 s ending. Fonts shorts-11 Newsreader white on black + DM Mono + Inter Tight. Checks: 0 collisions in all 4 sizes; captions off her face in 16:9 + 9:16 (1:1 / 4:5: small overlaps with her hands/chin box, 0.15-0.2). Voice transcript outputs/_review/fontboard-2026-11-13/teaser/teaser-v3-voice-transcript.txt. Cold critic: 5 -> 6.5; its round-2 fixes applied (topic panel on frame 1, parts lit one by one, limitations marked on the parts sheet, research-gap heading cut), not re-scored.
- After the shorts critic (set 6/10; fixes applied, not re-scored): sh07 cuts "published in 2014" (her CHI slip; whisper-checked: "looked at every paper and found…") instead of the white correction pause (the Caine graphic says CHI 2014); H captions sit above the bottom panel; sh09 cover "Who funded this research paper?"; the Figure 2 line under her picture now reads "Figure 2: the five Cs (S. Keshav, 2007)" (also in the full edit, text only, timing unchanged). Open critic notes: sh06 captions are Shrikhand white (the board refs use bold yellow caps; we kept Design 359's own colours), sh04 cover "HOW TO" red on black is the board pair but low contrast, some panels hold small credit-only graphics.
- **Kit** updated: line 3, upload checklist, at a glance, section 2 (4 thumbnails), section 3 table + each short's format/board/fonts/cover, section 4 teaser v3.
Waiting on her: look at the shorts (covers at 0:00) and the teaser in the studio, pick the thumbnail, export.


## 2026-11-07 night: "show, don't type" rework (same as the edge-cases video she approved)
Words on screen outside captions: 566 -> 258 (58 -> 27 a minute). Keywords, sentence cards, pen notes and long figure titles that repeated her
are gone; real photos (an interview, a survey, a heart-rate watch, stress at the screens) and short one-phrase titles instead. Caption fix:
"were more likely". Compare: outputs/_review/before16.jpg and after16.jpg. Details: talking-head/HANDOFF.md.
Please listen to (her words, not changed; times in the recording): 4:05 "You don't want to dedicate … to reading a research paper that is relevant" (she means "not
relevant"; the caption keeps what she says), 9:12 "You can open your PDF inside these highlights" (whisper unsure).

## 2026-11-10: brought up to the HTTP standard (ROLLOUT-BRIEF)
- **Thumbnails set 2**: 11, numbered best first, on her shoot photos (outfit C cream knit, IMG 1595/1599/1600/1601: not the HTTP shots), this video's look (graphite, paper, highlighter yellow, blue pen, DM Serif Display; quiet-pattern grounds). Mix: photo 4, collage 1, flat 4, other 2. Cold critic 3 rounds. **Recommended: 01 "Read any paper in 10 minutes" + "How to Read a Research Paper (The 3-Pass Method)"; Test & Compare 02 (the real Keshav paper) and 03 (Is this study any good?).** Old set 1 in the Bin (`~/.Trash/how-to-read-research-papers-thumbnails-old-2026-11-10/`). Editor http://localhost:7700/design/how-to-read-research-papers/thumbnails/ · sheet `outputs/thumbnails/overview.png`.
- **Shorts format mix**: sh01 H · sh02 B · sh03 M · sh04 E · sh05 K · sh06 J · sh07 G · sh08 I · sh09 A · sh10 C · sh11 F (each once; H I J K M = 5 new ones). Code `talking-head/moments/formats.js` (new) + small hooks in common.js / plan.js; manifest "fmt", "frame9", "poster". Sheet `outputs/_review/shorts-formats-v2.jpg`.
- **Covers** in every short (first 0.1 s, editable at 0:00): 8 her stills + 3 cards (sh03 / sh09 yellow, sh06 blue). Sheet `outputs/_review/covers.jpg`.
- Phones: none drawn in this project's edit code (n/a). Kit updated (upload checklist, section 2 with images, format + cover per short).
- Waiting on her: pick the thumbnail (01 recommended), look at the shorts in their editors, export.

## Done
- 2026-11-06 **design (thumbnails + carousels)** in the picked look A The Margin: 15 thumbnails (6 photo, 2 collage, 4 flat, 3 other; 2-3 titles each; cold critic 3 rounds, best 8/10 with title: 15, 18, 03, 13, 11), Instagram carousel 14 slides and LinkedIn carousel 13 slides + PDF (critic R1 6.5, R2 7, R3 IG 7 / LI 6.5, last fixes not re-scored). Editors: /design/how-to-read-research-papers/thumbnails/, /carousels/instagram/, /carousels/linkedin/. Details `design/thumbnails/README.md`, `design/HANDOFF.md`.
- 2026-11-07 (FILM agent, her pick **A · The Margin + B's Figure 2**, re-typed to her **set 05** DM Serif Display + DM Mono + Inter Tight captions, no handwriting, no borders): built in the studio: full talking-head edit (http://localhost:7700/moment/how-to-read-research-papers/full/, 9:43 incl. a 5.5 s "pause her" correction for Kelly Caine = every paper at CHI 2014, and a 14 s end-screen board for her "how to read a book" video), 11 shorts (`/moment/how-to-read-research-papers/sh01/` … `sh11/`, end on her last word, no outro clip yet), teaser 87 s (`/moment/how-to-read-research-papers/teaser/`, 16:9 / 1:1 / 4:5). Standalone motion film dropped (her 11-07 rule; `film/` keeps the shared look rp.js + sources). Thumbnails: 11 (photo-led ones on her new photos; 04/05/08/09 cut), carousels IG 14 / LinkedIn 13 re-typed. Nothing exported; she exports. Details: `talking-head/HANDOFF.md`, `design/thumbnails/README.md`.
- 2026-11-02 evening: **film directions** (batch 2): 3 looks, 4 + 2 stills and a 9.6 s motion test each, 4 talking-head frames over her footage, 2 short frames (SH7), in-edit correction frames for the CHI 2014 slip, fresh critic. `film/stills/directions/`.
- Recorded (`kit/raw-video.mov`), transcribed, cut list in `kit/transcripts/CLEANUP.md` (cleaned edit about 9:28).
- **Refined kit** `kit/refined-kit.md` (the only kit; her original kit moved to `archive/original-kit/`): live research (news, outliers, search phrases), titles (all 40-60 characters, checked in code), a thumbnail concept per title (a mix of kinds), description with 7 chapters timed to the cleaned edit, tags, 11 shorts planned with raw in/out times and captions for YouTube Shorts / TikTok / Reels / LinkedIn / X, 3 independent shorts with full word-for-word scripts and recording directions, first 30 seconds of the edit, edit notes (receipts, black phrase cards, Pexels search words), teaser plan, carousel plans, long-form posts, her essay.
- Cold review (fresh agent, titles + thumbnails + short labels/captions only): everything under 8 was rewritten (details in kit 7d; not re-scored after the fixes).

## Recommended
- Title: How to Read a Research Paper (The 3-Pass Method)
- Opening line: "Research papers are not written to be read from start to finish, like a novel." (raw 0:20.4, after 20 s of setup)
- End screen: her "how to read a book" video (link needed)

## Waiting on her
- **Pick ONE look** for the whole video: A The Margin (recommended), B Typeset, C Copy Room. One page: `film/stills/directions/overview.png`; details + scores in `film/stills/directions/README.md`; motion tests `film/stills/directions/*/motion-test.mp4`.
- 7 questions in kit section 0 (facts to check, cuts that need her ear, photos).
- Photos of her without the mic for the photo-led thumbnails.

## Next
- Apply the CLEANUP cuts + her answers, build the full talking-head edit in its own new look (2-3 directions first), then shorts, thumbnails, carousels, teaser. Re-time chapters to the exported file's .srt.

- 2026-11-12: shorts zoom fix (her note "remove the zoom effect"): no automatic zooms on her in any short (one framing per short; full-screen formats stay at z 1, frame9 unchanged). All shorts: 0 camera zooms (composite check shortZoom.zooms). Stills: outputs/_review/zoom-fix/contact-sheet.jpg. Previews/exports need a refresh before she exports.
- 2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md

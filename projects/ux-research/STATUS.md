# ux-research: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/ux-research/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


"What is UX research?": her field explained from zero by an HCI master's student. She covers UI vs UX, what UX and UX research are, why research matters (don't build the wrong thing), what a UX researcher does, the three big pairs (generative/evaluative, qualitative/quantitative, attitudinal/behavioural, with the say-vs-do lesson), the other pairs, seven methods, research on a small budget, UX research vs user research vs market research, AI, the job market from a student's view, and how to get in. Created 2026-10-12. **Everyone reads `BRIEF.md` first** (what she says vs the kit, whisper fixes, verified facts, the Don Norman decade error).

## Kit (`kit/`)
- `UX research. .mov`: her recording, 4K, 12:56. **0:00-0:37 is silence** (whisper made up text there). Speech runs 0:37-12:46. Never flip her face.
- `transcripts/`: whisper small.en (`transcript.srt/.json`, `transcript.words.json`, `voice16k.wav`). Corrections are in `BRIEF.md`.
- `what-is-ux-research-kit.md`: her dictated draft (18 segments, titles, shorts, clip breakdown, captions, carousel, essay, references). **Not the source of truth**: the recording wins. It contains lines she didn't record (the no-coding line, the card sorting explanation, the book title, the comment ask, the Medium author's name).
- `refined-kit.md`: the strategist's refined kit (below).

## Deliverables
| Item | State |
|---|---|
| `BRIEF.md` (what she says vs the kit, whisper fixes, verified facts with sources) | **Done** 2026-10-12 (social strategist) |
| Refined kit `kit/refined-kit.md` | **Done, waiting on her pick** (2026-10-12). It contains: live research (outlier videos, YouTube/Google search suggestions, current news); 15 titles (9 search-led, 6 click-led, all 46-59 characters, checked by code); 22 thumbnail concepts, each paired with titles; description, chapters and tags; 6 shorts plus 2 spares with cut times; captions per short for TikTok, Reels, Shorts, LinkedIn and X; slide-1 hooks for both carousels; sources. 3 cold-review rounds. Top 3 for Test & Compare: **T02 + S4** "UI vs UX vs UX Research: The Difference Explained", **T03 + S1** "What Is UX Research? Why Good-Looking Apps Still Fail", **T11 + C3** "Built an App Nobody Uses? You Skipped UX Research". |
| Motion film (studio project in `film/`, 16:9 + 9:16) | **Exported, critic 6.3/10 after 3 rounds (bar 8: not reached)** (2026-10-13, FILM agent). `outputs/video/ux-research_motion_16x9.mp4` + `_9x16.mp4` (+ `.srt`), 12:04.6, -14.4 LUFS, true peak -1.8 dBTP; copies in `~/Downloads/ux-research/`. Editor: http://localhost:7700/edit/ux-research/ . Look A · research wall + C's dive for the opening. Voice 775.5 s -> 719.5 s (`film/data/cutlist.json`): silent 36.5 s, retakes, **"back in the eighties" cut from the narration** (the board shows Don Norman's NN/g bio: joined Apple in the early 1990s). Real sources highlighted: NN/g definition, Norman's NN/g bio, Maze, IxDF. Medium line credited "Line from a Medium article" (no author). Open (critic round 3): ~9 holds of 4-7 s with only the slow push (56, 291, 373, 427, 563, 571, 635, 649, 655 s); the opening dive has 2-3 s still stretches; portrait text often under 32 px on busy boards; 12 minutes of one board grammar (punch-ins added for variety). See `film/HANDOFF.md`. |
| **Directions (film look + talking-head + shorts style frames)** | **Done, waiting on her pick** (2026-10-13). `film/stills/directions/README.md`: A · The research wall (sticky notes + index cards on a deep-green wall, camera travels along it; recommended), B · Pop-up book (cut-paper people + her cut-out stand up off flat colour spreads), C · Under the surface (one vertical cross-section: phone = crust, UX questions = strata, people = bedrock). Each: contact sheet, 4+2 stills, 10-12 s motion test with sound. Talking-head stills (L5, L2, L7, L6) in `talking-head/`, short SH2 stills in `shorts/`. Fresh-critic scores in the README. |
| Full talking-head edit with graphics (the whole video, zooms, elements beside her, text on key words) | **Exported 2026-10-13 19:41 (EXPORT agent)**: `outputs/talking-head/talkinghead-full_16x9.mp4` + `talkinghead-full_9x16.mp4` (+ .srt), 11:58 each, -14.1 LUFS, true peak -1.3 dBTP; hard-linked in ~/Downloads/ux-research/talking-head/. The first try crashed (ffmpeg ran out of memory on the boxed-footage graph; engine fixed, see projects/EXPORT-HANDOFF.md). Critic (fresh, 1 round): 16:9 6/10, 9:16 4/10. Open [big, film content]: the 9:16 film scenes cut text at the frame edges when the wall camera punches in (0:30, 0:42, 2:06, 3:18, 5:18, 7:42, 10:06) and the Coursera sticky sits on the heading at 4:18; near-empty wall frames (1:41 'GOOD…', 6:05 lone '03'); empty card bodies (UX designer 3:42, primary 7:18, diary studies 8:18); 10:42 two tags overlap in 9:16. Captions match the BRIEF corrections (spelling nits: 'categorization', 'human computer'). Editor: http://localhost:7700/moment/ux-research/full/ |
| Shorts (9:16, her caption style per `inspiration/know-how/SHORTS-PLAYBOOK.md`) | **+9 more shorts 2026-10-15 (SHORTS agent section at the bottom).** **Exported 2026-10-13 (EXPORT agent)**: `outputs/shorts/short01-ui-vs-ux` (49 s) · `short02-say-vs-do` (42 s) · `short03-why-apps-fail` (label now 'why most apps fail', opens on "You don't want to build the wrong thing.") · `short04-small-budget` (34 s) · `short05-numbers-vs-why` (label 'UX research: numbers vs why', 'usually you want both' now on the wall) · `short06-get-into-ux-research` (opens on "the way I'm getting into it…", ends on "…something you might love."), all `_9x16.mp4` + .srt, -14.0/-14.1 LUFS, TP <= -1.3; hard-linked in ~/Downloads/ux-research/shorts/. End cards 4 s. Critic scores before fixes: sh1 6, sh2 5, sh3 5, sh4 5, sh5 5, sh6 4. Open: small sticky / index-card text in 9:16 inserts (film content), caption over her forehead at the seam of 9:16 halves, sh1 ellipse crosses the label at 43.8 s, sh2 two cards collide at 23.8 s, sh4 12 s face-only over the 'five people / three friends' lines; ask her: sh6 caption 'the method when to use one way'. Editors: http://localhost:7700/moment/ux-research/sh1/ … sh6 |
| YouTube thumbnails (20 or more, from the 22 concepts; mostly photo-led, a few flat) | **Done, waiting on her pick** (2026-10-13, design agent). 21 directions in the film's research-wall look (16 photo-led on her 4K frames, warm grade, never flipped; 3 flat; 1 collage over her; 1 half wall). Each has 2-3 titles and its scores from 3 rounds of fresh critics (image only, title pair, taste). Recommended 3: **18 Why apps confuse you**, **19 0 years?**, **05 Say ≠ Do**. Edit: http://localhost:7700/design/ux-research/thumbnails/ · notes `design/thumbnails/NOTES.md` · PNGs + overview `outputs/thumbnails/` and `~/Downloads/ux-research-thumbnails/`. |
| **YouTube thumbnails set 2** (her bar: her own database-indexes thumbnail) | **Done, waiting on her pick** (2026-10-16, thumbnail agent). Set 1 archived (`design/thumbnails/archive/v1/`, `outputs/thumbnails/archive-v1/`). 5 options in a new flat look (topic huge + one literal picture + her calm cut-out): recommended **02 What is UX research? (complaints -> arrow -> app)**, **03 UI vs UX**, **04 Become a UX Researcher (badge)**; also 05 no budget, 01 alternate. 7 fresh critic rounds against her thumbnail; only 4 reached 8 (scores and dropped options in `design/thumbnails/NOTES.md`). Edit: http://localhost:7700/design/ux-research/thumbnails/ · PNGs + overview `outputs/thumbnails/` and `~/Downloads/ux-research-thumbnails/`. |
| **YouTube thumbnails set 3** (a MIX, after her 10-16 correction) | **Done, waiting on her pick** (2026-10-16, thumbnail agent). 20 options: 7 her photo as the background (brighter room, green pulled out, each its own crop, closed-mouth frames, one prop at most), 3 collage over her photo, 6 graphic, 4 other (full-bleed blue, before/after, say ≠ do, big face). Phone mockups down to 3. 5 critic rounds (fresh agent each): all 20 pass the cold topic test; 15 at the 7.5 bar, 6 at 8; 5 kept as alternates below the bar (01, 05, 09, 08, 10). Recommended: **16 no budget, 07 researcher vs designer, 15 first job badge, 03 UI vs UX hands, 17 UX vs market research, 12 types**. Notes, titles, scores, licences: `design/thumbnails/NOTES.md`. Edit: http://localhost:7700/design/ux-research/thumbnails/ · PNGs + overview `outputs/thumbnails/` and `~/Downloads/ux-research-thumbnails/` (set 2 in `old-v2/`; set 3 round 1 in `outputs/thumbnails/archive-v3-round1/`). |
| Instagram carousel (1080×1350) | **Done** (2026-10-13, design agent): 10 slides, research-wall look (sticky notes, index cards, marker), `build.mjs` checks clean, cold critic rounds in `design/carousels/NOTES.md`. Edit: http://localhost:7700/design/ux-research/carousels/instagram/ · `outputs/carousels/instagram/` + `~/Downloads/ux-research-carousels/instagram/`. |
| LinkedIn carousel (PDF) | **Done** (2026-10-13, design agent): 10 slides + `carousel.pdf`, career angle (products fail two ways, how a study runs, the job market with AcademyUX numbers, how to get in). Edit: http://localhost:7700/design/ux-research/carousels/linkedin/ · `outputs/carousels/linkedin/` + `~/Downloads/ux-research-carousels/linkedin/`. |

## Waiting on her
- **Empty the Bin** (old film exports are there): the machine has 6.4 GB free and exports stop under 8 GB, so the talking-head edit and the 6 shorts are not exported yet. (Resolved 2026-10-13 19:43: exported with GM_MIN_FREE_GB=3 as the only job.)
- Listen to the film's sound (-14.4 LUFS measured; nobody can listen here).
- Pick titles and thumbnails (or approve the 3 Test & Compare pairs).
- Thumbnails: pick from set 3 (20 options, recommended 16, 07, 15, 03, 17, 12; overview `~/Downloads/ux-research-thumbnails/overview.png`). **Her own photos for thumbnails**, in these poses: phone held out to the camera, clipboard, leaning in to study a screen, puzzled at a phone, two badges, at a sticky-note wall. Put them in `assets/uploads/`.
- The Don Norman decade: cut "back in the eighties", or keep it with an on-screen correction?
- The Medium quote source (Wardharaheem) couldn't be opened from here (Medium blocks it). Can she confirm the line is in that article before we print the author's name?
- Will the upload start at her first word (0:37)? The chapters in the refined kit assume it does (the raw times are listed too).

## Her pick (2026-10-13)
Film look approved: see film/stills/directions/README.md (recommended direction A). Build phase started per projects/BUILD-BRIEF.md.

## Motion film: CHECKS (2026-10-13, FILM agent)
| id | result | note |
|---|---|---|
| her-words | pass | every quote checked against `film/data/words.json`; whisper fixes from BRIEF.md + new ones in `film/tools/words.py`; Medium author not named; Norman decade cut from the voice |
| text-safe-area | fixed | `film/tools/safearea.mjs`: 9:16 boxes outside 370..1440 0 except the 2 s wall overview and the Norman bio punch-in (by design); 16:9 0 except the same two |
| no-collisions | fixed | 3 critic rounds; round 3 still lists small ones at 576-584 s (oval vs labels) |
| text-contrast | n/a | not run this pass (dark wall + ink on cream cards, paint #F4F0E6 on #1D3A32 ~10:1) |
| type-size | fixed | 16:9 labels >= 44 px; 9:16 note text ~26-30 px on busy boards (critic: under 32): open |
| reading-time | pass | 116 flags are the slap spring's settle and the slow camera push, not text moving away |
| frame-sheet | fixed | blackdetect 0; freezedetect flags 1.5-5 s still stretches in the opening dive (1-21 s) |
| no-blank-cuts | pass | `lab.mjs board`: 48 cuts, 0 blank / flash flags |
| transitions-carried | pass | `film/data/transitions.json`: all 48 cuts have carrier + why |
| banned-list | pass | flat grounds, no HUD, no glow / gradients |
| unique-look | pass | research wall (sticky notes, index cards, Permanent Marker / Courier Prime / Schibsted), not used before |
| motion-craft | pass | 0 dead stops, 0 linear moves; 9 short moves (camera punch-ins / exits) |
| dead-holds | open | 16:9: 9 holds 4.1-7.2 s (56, 291, 373, 427, 563, 571, 635, 649, 655 s); 9:16 more |
| expects | pass | 5 / 5 |
| determinism | pass | seek(t) only, hash() for randomness; caches bounded (an export crashed on unbounded caches, fixed) |
| sync | fixed | cue nudges from the audit (`film/data/cue_nudges.json`); 6 cues off, 24 swipes / risers / hits peak early by design |
| hits-audible | fixed | 163 cues (thinned from 227), median +4.9 dB over the bed, 50 under +3 dB |
| music-under-voice | pass | 14.0 dB |
| loudness | pass | export -14.4 LUFS, true peak -1.8 dBTP (after AAC) |
| phone-band | pass | drop -1.4 dB, energy < 60 Hz 0.4 % |
| dc-offset | pass | mix -74 dBFS |
| stems-fresh | pass | stems cue key = meta |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 yuv420p BT.709 + AAC, 724.6 s |
| editable | pass | http://localhost:7700/edit/ux-research/ |
| delivered | pass | `~/Downloads/ux-research/` |

## CHECKS: talking-head + shorts export (EXPORT agent, 2026-10-13)
| id | result | note |
|---|---|---|
| her-words | pass | critic read every .srt vs BRIEF corrections (Jakob Nielsen, popularised, when he was at Apple, human-centred, much bigger, no retake): clean; listen-check sh6 "the method when to use one way" |
| stands-alone | fixed | sh3 and sh6 now open on a complete statement; sh5 label reworded |
| text-safe-area | n/a | open [big]: the film's 9:16 punch-ins cut wall text at the edges (film content) |
| no-collisions | n/a | open: sh1 ellipse over label, sh2 card collision, 9:16 10:42 tags (film content) |
| frame-sheet | pass | sheets 1/12 s and 1/2.5 s looked at; blackdetect: none |
| dead-holds | fixed | sh5 'usually you want both' on the wall; open: sh4 13.8-26.2 face only |
| banned-list | pass | flat green wall, stickies, no HUD |
| loudness | pass | -14.0 to -14.1 LUFS, true peak -1.3 to -1.9 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 + AAC |
| editable | pass | /moment/ux-research/full/, /sh1/ ... /sh6/ |
| delivered | pass | hard links in ~/Downloads/ux-research/talking-head/ and shorts/ |
| reading-time, motion-craft, sync | n/a | engine layouts and cues unchanged in this run |

## Content pass: labels + missing footage (CONTENT agent, 2026-10-14)
- **Labels removed (19)**: film s1 (1 "ILLUSTRATION" on the app screen), s2 (2: "ILLUSTRATION", "Illustration: notes from interviews"), s3 (5: bars, methods, two screens, "Illustration, not data" under the job-title piles); carousel (instagram) corner "// illustration"; thumbnails: 11 labels in 10 directions (+ `tools/gen.py`). All screens are generic (never a real product).
- **Missing-footage segments fixed** (old times): full 0:45-0:55 (11 s), 1:19-1:33 (14 s), 3:37, 4:15-4:38 (24 s), 6:00, 6:45, 7:18, 8:43, 9:15-9:30 (15 s) (both sizes); sh1 0:09-0:16 and 0:38-0:45; sh5 0:22-0:29; sh6 0:03.5-0:18 (14.5 s) and 0:34-0:43. Note: 16:9 4:22-4:38 her circle sits on the corner of the "primary" sticky note (small overlap).
- **Rule now in `talking-head/moments/common.js`** (every moment of this project, full + shorts): a film-only cutaway (L9) longer than 6 s keeps ~3 s full frame (cut on a word start), then her picture comes back: 16:9 her circle over the same film (L11), 9:16 half and half (film on top, 1130 px; her below). `keepAlone: true` on a TH.cutaway call opts out. Audit after: no stretch without her longer than ~6 s except L10 cards and L6 cut-outs (she is in those).
- Engine bug (her picture at a later box's place, claude-rule 1:37-1:47): fix present in `studio/tools/composite.mjs` (per-branch sendcmds); every current export was made after it (2026-10-13 19:05+). The stills tool does not exercise that path: confirm on the re-export's contact sheet.
- Stills: instagram carousel + 10 thumbnails re-rendered and hard-linked into ~/Downloads/ux-research-carousels/ and -thumbnails/.
- **Needs re-export** (not run: disk ~2.8 GB): motion film (16x9 + 9x16), talking-head full (both), every short. See `projects/EXPORT-HANDOFF.md`.

## Re-export after content pass (EXPORT agent, 2026-10-14 12:18-13:15)
All replaced in place and hard-linked (inode checked) into `~/Downloads/ux-research/` (film), `.../talking-head/`, `.../shorts/`.
- talking-head full 16x9 (her captions on) + 9x16: 11:57.6, -14.1 LUFS, TP -1.8 dBTP.
- shorts sh1-sh6: 0:48.5, 0:41.9, 0:46.6, 0:33.7, 0:33.1, 0:47.0; -14.0/-14.1 LUFS, TP -1.8/-1.9.
- motion film 16x9 + 9x16: 12:04.6, -14.4 LUFS, TP -1.8 dBTP (stems fresh, cue key 45e6377c).
- **Fix made**: five half-and-half stretches in the full edit used `side: 'left'` in both sizes, so in 9:16 the film sat in a
  narrow side panel with its cards cut off ("titudinal", "aluative", "I"; e.g. 6+ s at 6:21).
  Now `side: V('left', 'top')` (`moments/full.js` lines 22, 55, 108, 139, 193): 16:9 unchanged, 9:16 film on top. Full 9x16 re-exported.
- Still there (small): 16:9 4:22-4:38 her circle sits on the corner of the "primary" sticky note (noted by the content pass).

| id | result | note |
|---|---|---|
| her-words | pass | OCR every 2-3 s of all 10 files: 0 "illustration" / disclaimer hits |
| no-collisions | fixed | 9:16 side panels clipping the film's cards (above); circle vs "primary" note 4:22 left (small) |
| frame-sheet | pass | contact sheets looked at; her picture in its box on boxed stretches |
| footage-present | pass | texture scan every 0.5 s: no stretch without her > ~6 s |
| captions | pass | 16:9 full: her captions on, readable, faint box on lighter frames |
| loudness | pass | -14.0..-14.4 LUFS, TP <= -1.8 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, h264 yuv420p + AAC |
| stems-fresh | pass | cue key = meta |
| delivered | pass | hard links, inode match |

## Circle off the "primary" note (ENGINE agent, 2026-10-14 13:40)
- 16:9 4:17-4:38 (the "So many ways to categorise it" stretch): her circle now goes to the emptiest corner (`corner: 'auto'` on that
  `TH.cutaway` in `moments/full.js`; `common.js` passes `corner` through to the split's L11): top-right, clear of the title and every
  sticky note (stills 4:19, 4:23, 4:28, 4:33, 4:37). Only that stretch changed (hashes: every other frame identical; 9:16 identical).
- Re-exported 13:40: `outputs/talking-head/talkinghead-full_16x9.mp4` (+ .srt, captions on), 11:57.6, -14.1 LUFS, TP -1.8 dBTP,
  hard-linked (inode match) in ~/Downloads/ux-research/talking-head/. Contact sheet (1/15 s) looked at.
  Seen on the sheet, not changed: ~7:30 the circle (bottom-left) sits next to the "secondary" card of "A few more, quickly".

## Refined kit restructured (KIT EDITOR, 2026-10-14)
- `kit/refined-kit.md` now follows the fixed structure (at a glance, YouTube, thumbnails, shorts, teaser, carousels, long-form posts, research last); v1 kept as `kit/refined-kit.v1.md`. Chapters (not parts) timed to `outputs/talking-head/talkinghead-full_16x9.mp4` with the film's times beside; recommended title now pairs with thumbnail 18; each built short has YouTube Shorts title/description/tags plus TikTok, Reels, LinkedIn, X captions. Left open: teaser file (being built), Medium author confirmation, her listen-checks (sound, sh6 caption).


## Teaser for LinkedIn and X (TEASER agent, 2026-10-14)
| Item | State |
|---|---|
| Teaser (LinkedIn and X) | **Exported 2026-10-14**: `outputs/teaser/teaser-ux-research_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:25.5 each, -14.0 LUFS, true peak <= -1.9 dBTP; hard-linked in `~/Downloads/ux-research/teaser/`. Editor http://localhost:7700/moment/ux-research/teaser/ (16:9, 1:1, 4:5, 9:16; 9:16 not exported). Bites, order and look in `talking-head/teaser/teaser.js` + `talking-head.json` "teaser". Look: Research wall (deep green, canary sticky notes, index cards, marker): the promise on an index card from frame 1 ("Why some apps are so confusing"), sticky notes 3-2-1, a sticky-note label, film wall inserts, end card pinned to the wall with a marker underline. Music: Mixkit 750 (rises; opens up on the end card). Fresh critic: 6 -> 7.5 (round 2); its fixes 1, 3, 4, 6 (1:1 edge, closing card typing, AI question big and centred, countdown centred) made and checked, not re-scored. Spec: `inspiration/know-how/TEASER-PLAYBOOK.md`. |

| id | result | note |
|---|---|---|
| her-words | pass | every bite cut from her corrected words (`talking-head/data/raw_words.json`), whole sentences, edges checked so no bite clips a word or starts inside the previous one; lost-word check 0 (a hold keeps a pause that carried a word); critics found no slips or meaning changes |
| stands-alone | pass | topic in plain words on frame 1 (big type / countdown card) + a "new video" label; critics: topic clear within ~1 s |
| text-safe-area | fixed | 1:1 / 4:5 film inserts re-cropped, oversize zooms reduced after stills; keyword pops shown whole |
| no-collisions | fixed | end cards re-laid, captions step aside where the film spells her words (`noCaps`) |
| type-size | fixed | label 36-44 px at 1920, end-card titles >= 60 px, small film screens zoomed (`zoom`) |
| frame-sheet | pass | contact sheets (1 frame / 2 s) of every 16:9 and 1:1 export looked at; blackdetect / freezedetect on every file: 0 |
| dead-holds | fixed | inserts or keyword pops added in the talking stretches; end card slow push |
| loudness | pass | -14.0 LUFS, true peak -1.9 / -2.0 dBTP (ebur128, after AAC) |
| format | pass | ffprobe: 1920x1080 / 1080x1080 / 1080x1350, 30 fps, H.264 yuv420p + AAC |
| editable | pass | /moment/ux-research/teaser/ opens (headless check, all four sizes offered) |
| delivered | pass | hard links in ~/Downloads/ux-research/teaser/ (same inode) |
| sync | n/a | cues placed by the layouts / bite starts; not run through soundqa.py |

## SHORTS agent, 2026-10-15: 9 more shorts (15 in all)
Her rule (10-15): no cap at 6. Both old spares built, plus seven more. New (raw times on `kit/UX research. .mov`; critic round 1 average 6.3 -> trims -> fresh re-score):
| short | label | length | raw | re-score |
|---|---|---|---|---|
| sh7 `short07-what-is-ux-research` | what is UX research? | 0:35 | 0:36.5-2:51.4 (0:52-2:36 cut) | 8 |
| sh8 `short08-what-ux-means` | what UX really means | 0:45 | 1:47.1-2:33.5 (the "eighties" slip cut) | 8 |
| sh9 `short09-what-a-ux-researcher-does` | what a UX researcher does | 0:33 | 3:39.1-4:12.8 (2 cuts) | 8 |
| sh10 `short10-researcher-vs-designer` | UX researcher vs UX designer | 0:25 | 4:13.0-4:34.2 | 8 |
| sh11 `short11-before-vs-after` | UX research: before vs after you build | 0:48 | 5:31.9-6:15.5 | 7 |
| sh12 `short12-how-ux-research-is-done` | how UX research is done | 0:39 | 8:31.1-9:09.2 ("earlier part" aside cut) | 7 |
| sh13 `short13-ux-vs-user-research` | UX research vs user research | 0:43 | 9:51.6-10:31.1 | 7 |
| sh14 `short14-ai-and-ux-research` | will AI replace UX research? | 0:24 | 10:43.6-11:05.5 | 9 |
| sh15 `short15-ux-research-jobs` | UX research jobs | 0:33 | 11:05.7-11:34.9 | 8 |
Scripts `talking-head/shorts/sh7.js`-`sh15.js`; end-card thumbnails per short (manifest `images`). Captions/tags in `kit/refined-kit.md` section 3 (posting order: SH1-SH6, then SH7, SH8, SH11, SH14, SH9, SH10, SH12, SH13, SH15). Editors http://localhost:7700/moment/ux-research/sh7/ ... /sh15/.
Open: sh11/sh12 a film sticky slides up under the label for under a second (42.8 s / 25.8 s); sh12 and sh13 end flat (7/10).

| id | result | note |
|---|---|---|
| her-words | fixed | captions read against BRIEF corrections; stray next-sentence words cut with exact cuts (RMS-checked); doubled / split words fixed in `talking-head/edits/<id>.json` capShort (and the .srt patched to match) |
| stands-alone | fixed | openers that needed the long video cut (critic round 1); every short starts on its topic line under a plain top label |
| text-safe-area / no-collisions | fixed | full-frame inserts under two-line labels turned into top halves (film starts below the label); hooks placed under the label |
| dead-holds | fixed | inserts start when the film shows something; no empty film > ~1 s (re-score critic) |
| type-size | open | film text inside 9:16 half panels is ~20-24 px (film content, not the shorts) |
| frame-sheet | open | one empty frame where a half hands back to her full frame: engine bug, logged in projects/ENGINE-REQUESTS.md (all shorts, old ones too); re-export after the STUDIO fix |
| loudness | pass | -14.0 to -14.2 LUFS, peak <= -1.5 dBFS |
| format | pass | 1080x1920, 30 fps, H.264 + AAC |
| editable | pass | studio /moment/<slug>/<id>/ |
| delivered | pass | hard links (inode checked) in ~/Downloads/<slug>/shorts/ (the older shorts were missing there; linked too) |


## Teaser v2 "movie trailer" (STUDIO agent, 2026-10-15)
Her note: not smooth; move from point to point with visible transitions, like a movie teaser. **Exported** `outputs/teaser/teaser-ux-research_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:22 each, -14.0 LUFS, true peak -1.9 dBTP, no freezes > 2.5 s; hard-linked in `~/Downloads/ux-research/teaser/` (v1 files kept in `outputs/teaser/previous-v1/`). Editor http://localhost:7700/moment/ux-research/teaser/.
Order: sticky-note countdown 1.5 s -> the problem -> card THE FIX -> card THE TWIST -> music stops for "Good design doesn't start with screens. Good design starts with people." -> card UX RESEARCH (index card) -> stinger "Will AI replace UX research?" -> end card (4 s). The payoff bite now starts at "Good" (it started mid-phrase); the .srt lone "good" cue is merged ("Good design doesn't start with screens"; the word data is left as is because the full edit's cut depends on it, so re-merge after a re-export). Cuts: flash / black / whip (opaque accent panel) / glitch, never the same twice in a row; cut sounds flash, boom, swipe, glitchHit; risers into the cards; music in sections (measured on the music track: about +10 dB from act 1 to act 3, +8 dB on each card, silent under the biggest line). Critic (fresh, 2 rounds): 5 -> 6/10; round-2 fixes (louder cold open with the topic big, louder bed, harder card slam, shorter end card, less repetition) applied and checked on contact sheets, not re-scored. Out of scope by her rules: the critics wanted bold white captions; her 16:9 caption style stays.
Also 2026-10-15: every short, the teaser and the full edit re-exported after the engine fix for one empty frame where a half-and-half layout hands back to her full frame.
- 10-17: her "FULL VIDEO ON YOUTUBE" clips (kit/landscape|portrait - full video on youtube.mp4; landscape used to 6.25 s, it turns plain white after) end all 15 shorts + the teaser (talking-head.json `outro`). Re-exported 10-17: sh1-sh15 (9:16) + teaser 16:9 / 1:1 / 4:5 (83.7 s), -14.0/-14.1 LUFS, TP <= -1.9; hard-linked into ~/Downloads/ux-research/shorts/ + teaser/. Her own thumbnail `kit/ux-research-thumbnail.png` is the one to post (THUMBNAILS.md "Her second own thumbnail"). Outro fit in 1:1 / 4:5: clip's full height + middle 52 % kept in view, black around (composite.mjs outroFit).
- 2026-10-30: her raw recording moved to the Bin at her request (to free space). Finished exports in outputs/ are kept; the talking-head edits, shorts and teaser can no longer be re-exported (motion film still can: voice in kit/transcripts).

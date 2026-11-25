# october-attacks: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/october-attacks/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


Kit arrived 2026-10-26: her kit (now `archive/original-kit/october-2026-security-attacks-kit.md`) (her version 4 script, news recap of October 2026: PHP2Shell,
Railway, Zeabur, OpenCode, eMudhra, AI-agent hacker) + `kit/october internet attacks.mov` (4K HEVC 30 fps, 8:00).
She said: post soon (news video, short window). Her notes for this kit (FEEDBACK.md 10-26): shorts less zoomed in; more
ways to share the screen with graphics than the circle; lots of real screenshots / screen recordings of the news sites;
a unique look that is intuitive to the topic.

## Wave 1 (started 2026-10-26)
| Piece | State | Where |
|---|---|---|
| Transcript (whisper, word times) | done | `kit/transcripts/` |
| Refined kit (social-strategist) | **done** 2026-10-26 01:07 (her kit archived) | `kit/refined-kit.md` |
| Real sources (screenshots + scroll recordings) | **done** 2026-10-26 03:30: 58 real pages (all 7 stories, primary sources + outlets + HN/X), each fold PNG + full JPG + scroll MP4 that stops on each key line, highlight boxes in `sources.json`; "Facts to flag" at the top of SOURCES.md (197 MB) | `assets/sources/SOURCES.md`, `assets/sources/sources.json` |
| Film look: 3 directions (style frames + motion test) | ready for her pick (critic round 2: A 7.5, B 6, C 5.5; A fixed again after round 2; open in A: 9:16 Zeabur crop, a4 two focal points, a2 empty corner; recommended A) | `film/stills/directions/` |
| Motion film (A The Month + B keys) | **built 2026-10-26**: 8:00, 58 scenes, 16:9 + 9:16, critic 6.4 -> 7.2 -> 7.6 (round-3 notes fixed after, not re-scored) | `film/`, editor http://localhost:7700/edit/october-attacks/, `outputs/video/october-attacks_motion_{16x9,9x16}_v1.mp4`, Downloads `october-attacks/film/` |
| Shorts framing options + new face-and-graphics layouts | done, boards ready for her pick (recommended shorts B 4:5) | `talking-head/`, engine `studio/runtime/layouts.js` |

## Refined kit summary (2026-10-26)
- Recommended title: "PHP2Shell Explained: The PHP Flaw and October's Other Hacks" (59). Test & Compare thumbnails T1 "PATCH YOUR PHP", T7 "HACKED: $1,000 AI BILL", T9 "AI AGENTS HACKED 100+ SITES" (15 concepts in kit section 2, mixed kinds, not built).
- 16 shorts planned with raw times, labels and every platform's text (SH1-SH16, kit section 3); teaser bite list of 15 lines (section 4); carousels, LinkedIn/X/community posts, essay (5-6).
- Research: single-topic "PHP2Shell explained" videos were the outliers (15-500x their channel's usual); roundups underperformed. Facts re-checked: Railway preliminary report (Oct 22, at most 1.85% of workspaces, entry point still undisclosed); no confirmed big PHP2Shell break-in made public; eMudhra also blocked by Apple and Microsoft.
- Recording vs kit differences listed at the top of the kit. All times are RAW: re-time chapters to the exported talking-head file.
- `assets/sources/SOURCES.md` landed 2026-10-26 03:30: reconcile its "Facts to flag" (12 items) with kit 7e.

## Waiting on her
- Pick the title; listen at 2:34 ("restart your patch" = Apache?) and 7:55 ("stuck over…"); OK to show the fixed PHP version numbers on screen (not spoken); photo of her at a laptop (no mic) for thumbnails.

## Her picks (2026-10-26)
- Film: A · The Month + B's pictorial keys (keys moving, taken, dropping) mixed in.
- Shorts framing: C (3:4) default, dropdown per short / section in the short editor.
- Layouts: all L14-L19, mixed across screens (circle only as one option).

## Wave 2: full build (started 2026-10-26)
- Film, full talking-head edit + 16 shorts + teaser, thumbnails + carousels.

## Thumbnails + carousels (DESIGN agent, done 2026-10-26)
- **21 thumbnails** (mix: 9 photo of her with the room washed or natural, 3 collage, 5 flat, 4 other/no face), each with 2-3 titles; fresh cold critic, 2 rounds (scores in `design/thumbnails/README.md`). Top: 18 HACKED: $1,000 AI BILL (8.5), 13 IS YOUR PHP PATCHED? (8.5), 14 IS YOUR PHP SAFE? terminal (8.5), 15 AI AGENTS HACKED 100+ SITES (8), 16 HACKERS WANT YOUR .ENV (8), 07 CHANGE YOUR API KEYS with the real TechCrunch headline (8), 19 HACKED TWICE, SHUT DOWN (8). Kit top 3: 02 PATCH YOUR PHP (7), 18, 15. PNGs `outputs/thumbnails/` + `overview.png`; editor http://localhost:7700/design/october-attacks/thumbnails/
- **Carousels** in the film's look A: Instagram 10 slides, LinkedIn 11 slides + `carousel.pdf` (build.mjs checks clean). `outputs/carousels/{instagram,linkedin}/`; editors `/design/october-attacks/carousels/instagram/` and `/linkedin/`. Text from kit section 5 (LinkedIn got an 11th end slide; small wording fixes for one-word last lines).
- Hard links in `~/Downloads/october-attacks/{thumbnails,carousels}/`.
- Waiting on her: thumbnail pick (+ Test & Compare trio); a photo of her **without the mic** (at a laptop, serious or hand on forehead; one pointing/holding something) would lift every photo option.

## Motion film (2026-10-26, FILM agent)
- Her narration tightened: one retake cut ("that your browsers need," at raw 6:05, listen there) + 3 pauses: 7:57.4 of voice (cutlist `film/data/cutlist.json`). Whisper heard "restart your **Apache**" clearly on the edited voice: Apache in captions.
- Look: direction A (October 2026 calendar, orange / night / bone, Anton / Manrope / Spline Sans Mono) with B's keys redrawn in A's palette (Railway keys swapped, Zeabur's orange admin key "since Jan 2024, no expiry" kept and circled, OpenCode's AI keys taken, eMudhra's key stamped 4, the five "what you can do" key pictures). 27 real article clippings (crops only, highlighted on her words, outlet + date), checked automatically for cut letters and body text under 28 px.
- Fact updates from SOURCES.md applied on screen: Railway "Update, 22 Oct" card (build system -> CI credentials, at most 1.85 %); "100+ company websites" of 1,200+ tried (1 tile = 10 sites); $50 = a researcher's estimate; government sites "taken offline as a precaution: no breach reported"; Amazon honeypot Oct 17.
- Fonts Anton, Manrope, Spline Sans Mono added to library/fonts + studio/runtime/fonts.css (OFL 1.1).
- Critic: round 1 6.4, round 2 7.2, round 3 7.6 (fresh critic: "8.1-8.3 after the listed fixes"); all round-3 notes then fixed (collisions, cut crops, end objects, blank cuts, quiet sounds), not re-scored.
- Listen: 6:03 (the retake join "...one of the companies | that your browsers trust"), 2:34 (Apache), 7:55 (whisper's "stuck over"), sound levels overall (whoosh-free: 0 whooshes, 206 cues, 24 roles).

| id | result | note |
|---|---|---|
| her-words | pass | captions = her words (whisper DTW + the kit 7e fixes); on-screen lines are her phrases; every quote is a real crop with outlet + date; "meant most of the websites" left as heard (listen) |
| text-safe-area | pass | 9:16 content inside 370-1440 on all 58 end-of-scene stills (sheets `film/stills/v3_end_9x16.jpg`) |
| no-collisions | fixed | round 2-3 collisions fixed (updated, end, four, both, count, news, offline, ai-sides) and re-checked on stills |
| text-contrast | pass | `render.mjs contrast`: 0 failures (both modes, both aspects) |
| type-size | pass | mono labels >= 28-32 px (a few 26-30 px credits); clip body text >= 28 px enforced by a runtime check |
| reading-time | pass | lab audit: 0 in 16:9 and 9:16 |
| frame-sheet | fixed | contact sheets per scene both aspects; ffmpeg blackdetect found sparse night-ground openings (exploit, console, april, both, php, found): each now opens with content |
| no-blank-cuts | pass | `lab.mjs board`: 0 blank / flash flags |
| transitions-carried | pass | 57 cuts, all with carrier + why (hard cut / whip / dive) |
| banned-list | pass | flat grounds, no gradients / glow / HUD / pills / tickers; no fake brand UI (generic tiles, cards, terminal) |
| unique-look | pass | her picked direction A for this video only |
| motion-craft | pass | lab audit: 0 dead stops, 0 linear moves, 0 short moves (stamps 0.5 s outQuint) |
| dead-holds | pass | lab audit 9:16: 0; 16:9: 1 flag at 391.5 s (`april`) that is a written choice: terminal lines + a fill bar step every 0.6 s, below the audit's change threshold (checked on stills) |
| expects | pass | 1 expect, 0 fails |
| determinism | pass | seek(t) only, hash() for variety, no timers / Math.random |
| sync | fixed | 24 cue nudges from the audit (`scenes/nudges.js`); 1 cue still 4 f off in 16:9 (stamp 104.6 s), 4 in 9:16; soundqa first peak median -24 ms vs frame+1 |
| hits-audible | fixed | over-bed median 6.0 dB (was 0.6); 49 of 206 still under 3 dB (soft textures: marker, slide, scribble) |
| music-under-voice | pass | 16.1 dB |
| loudness | pass | exports measured (ffmpeg ebur128): both -14.0 LUFS, true peak -5.5 dBFS; mix uses the levels saved in film/edits.json at 09:47 (music -18 dB, sound effects -13 dB) |
| phone-band | pass | -1.6 dB drop, 2 % under 60 Hz |
| dc-offset | pass | mix -72 dBFS |
| stems-fresh | pass | cue key matches meta |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 yuv420p + AAC, 8:00.23 (9:16 encoded with libx264: VideoToolbox failed under load, see ENGINE-REQUESTS) |
| editable | pass | every text through txt / KT / lab / mono (editable), boxes via grp; light / dark alternates on night and bone screens |
| delivered | pass | hard links in ~/Downloads/october-attacks/film/ (videos only, no .srt) |

## Talking-head agent (2026-10-26): full edit, 16 shorts, teaser: BUILT
| Piece | File | Length | Critic |
|---|---|---|---|
| Full edit 16:9 | `outputs/talking-head/talkinghead-full_16x9.mp4` (+ Downloads) | 7:57 | 5 -> 6.5 -> 7.5 (round-3 fixes applied, exported, not re-scored) |
| Full edit 9:16 | `outputs/talking-head/talkinghead-full_9x16.mp4` (+ Downloads) | 7:57 | (same plan) |
| 16 shorts | `outputs/shorts/short01-...` to `short16-..._9x16.mp4` (+ Downloads) | 9-55 s | 5.5 -> 6.9 (round-2 fixes applied + re-exported: film panels below the label, wider framing; not re-scored) |
| Teaser | `outputs/teaser/teaser-october-attacks_{16x9,1x1,4x5}.mp4` (+ Downloads) | 88 s | 6 -> 6.5 (its round-2 list fixed + re-exported: inserts held in their film scenes, stamped 4, louder cards, near-silent drop; not re-scored) |
- Editors: /moment/october-attacks/full/ · /sh01/ ... /sh16/ · /teaser/ (studio http://localhost:7700).
- Plan shared by the full edit and the shorts: `talking-head/moments/plan.js`; look + real-page helpers `moments/common.js`;
  real page crops `talking-head/assets/src/` (tools/hicap.mjs + srcsync.py).
- Kit: chapters timed to the 16:9 file (0:00, 0:38, 2:23, 2:54, 5:20, 5:57, 6:49); section 3 has the built shorts' files;
  section 4 the teaser.
- Open / for her: listen at 0:09 ("the language behind most of the websites": both whisper passes heard "meant"), 2:34
  (captioned "Apache"), 7:55 ("stuck over"); no outro clip for this video yet (shorts and teaser end without one: send the
  "FULL VIDEO ON YOUTUBE" clips and they go in); the fixed PHP version numbers are on screen (film's to-do card).
- Checks (all exports): -14.0 / -14.1 LUFS, true peak -1.9 to -4.5 dBTP; 1920x1080 / 1080x1920 / 1080x1080 / 1080x1350, 30 fps H.264 + AAC; no black frames; layout-variety pass (top split 22 %, circle 2 %); short-zoom 0.17-0.30 (3:4 window); label-over-graphic pass (16/16); clean-ends pass (16/16: every short's last caption is its sentence's last word); sources: Railway shows the preliminary report's 1.85 % (no "nothing is known"), $50 labelled a researcher's estimate.

## Her review 2026-10-26 (full edit screenshots): fixed, NOT exported (her new rule: she exports in the studio)
- Graphics ahead of her words (OpenCode alerts before she said them): every film offset removed; teaser inserts re-timed; check `insert-sync` passes everywhere.
- 3/4 card text ran into its source line: card layout fixed; check `text-collision` passes everywhere.
- Opening calendar (mono line behind OCTOBER, cut tag): the film agent fixes film/scenes/s1.js; re-check the opening split after.
- **To re-export in the studio:** full (16:9 + 9:16), teaser (16:9, 1:1, 4:5), shorts sh01, sh02, sh03, sh06, sh07, sh08, sh09, sh11, sh12, sh13, sh15, sh16 (sh01 added after the film's opening calendar fix). The files in outputs/ and Downloads are the earlier versions until she does.
- Before / after stills: `talking-head/build/review/before/`, `talking-head/build/review/after/`.

### 2026-10-26 later: her review of the opening (FILM agent)
- Fixed: the "this month on the internet" / "2026" row sat behind OCTOBER (now above it, OCTOBER and the month grid moved down in 9:16); the 21 is now the same size as every date (its two labels are smaller instead); text-on-text sweep of every scene in both sizes (`studio/tools/textcollide.mjs`, new CHECKS `text-collision`): 0 overlaps; one frame at 9.0 s where the OPENCODE label leaves the frame during the camera dive (a move, kept). Also fixed: PHP sentence under the giant PHP, Railway "AI companies" card label, headlines-wall credit (one line), April page in 9:16 (dates were 22 px).
- OpenCode on her words: the three usage alerts now land on "OpenAI" (4:49.5), "Anthropic" (4:50.1), "Google" (4:50.8) (they were one word early); the old system's door opens on "older", the keys go on "took".
- Her volume levels kept (music -18, sound effects -13). No export made (her rule): the files in outputs/video/ and ~/Downloads/october-attacks/film/ from 10:53 are from BEFORE these fixes. Re-export from the editor.
- Before / after stills: `film/stills/review-2026-10-26/` (before/, after/, before_after_16x9.jpg, before_after_9x16.jpg, after/sheet_end_{16x9,9x16}.jpg).
- After the film agent's calendar fix: the opening split shows the whole calendar in 16:9 and 9:16 (nothing cut; no panel change needed); all checks re-run and pass (insert-sync, text-collision, label-over-graphic, short-zoom, layout-variety) on full, 16 shorts, teaser 16:9 / 1:1 / 4:5. Stills: `talking-head/build/review/after2/`.
- Opening re-check (main session note): OCTOBER no longer sits on the weekday row. In 16:9 the label row moved to y 80, OCTOBER is 180 px at baseline 296 and the grid moved down 24 px with 128 px rows, leaving about 45 px of air above and below OCTOBER. In 9:16 OCTOBER is 196 px at baseline 716, and the main session's banner edit (y 434, underline offset 9) is kept. The "two thin dark lines" were the weekday T and W directly under OCTOBER's T and E stems, so the T and E looked extended down to the row; with the gap they are gone. The text sweep now also registers the calendar digits, the weekday row and the month's top rule (`qaBox` in kit.js) and flags any text touching them: 0 in both sizes. Stills: `film/stills/review-2026-10-26/after-underline/` (5, 8.5, 12 s in both sizes, `check_8.5.jpg`, and `full-edit/board.jpg`, which shows the full edit's split panels at 3, 5 and 8 s: clean, banner whole).

## 2026-10-26 afternoon: her screenshot notes fixed (no exports by us; SHE re-exports)
Fixed: calendar text collisions (16:9 + 9:16), 3/4 card source line, film inserts running ahead of her words (all offsets removed; insert-sync check), OpenCode console/alerts timed to her words, 4 more film screens + 3 cards with text overlaps (text-collision check). Her film volume (music -18, SFX -13) is HER choice: kept.
She re-exports in the studio: film (both sizes); full (both); teaser (3 sizes); shorts sh01, sh02, sh03, sh06, sh07, sh08, sh09, sh11, sh12, sh13, sh15, sh16. Unchanged: sh04, sh05, sh10, sh14.
Still open: her listen points (0:09 "behind", 2:34 "Apache", ~6:03 retake join in the film, 7:55 "stuck over"); outro clips; photo without mic; title pick; no confirmed 8/10 re-score.
- 2026-10-26 13:07: her outro clips arrived (kit/landscape|portrait - full video on youtube (1).mp4); being wired into all 16 shorts + teaser (landscape turns white ~7.0 s: trimmed). Thumbnail 23 (combined) scored 8: recommended.
- Outro clips (her "FULL VIDEO ON YOUTUBE", kit/landscape + portrait (1).mp4) wired 2026-10-26 in talking-head.json "outro": 16:9 dur 6.267 s (the clip turns plain white from 6.30 s), 9:16 dur 6.867 s (good to its last frame); on for all 16 shorts and the teaser (16:9, 1:1, 4:5: the 16:9 clip centred). Not exported. **Re-export in the studio: all 16 shorts (sh01-sh16), the teaser (16:9, 1:1, 4:5) and the full edit (16:9 + 9:16, from the earlier fixes).** Stills: talking-head/build/review/outro/.
- 2026-10-26 13:55: POSTED on YouTube: https://youtu.be/E5Hj7IHSN2Y (link in every [LINK] of the refined kit).
- 2026-10-30: posted; raw recording + temp jobs moved to the Bin at her request. Finished exports in outputs/ kept; the full edit, shorts and teaser can no longer be re-exported (the film still can).

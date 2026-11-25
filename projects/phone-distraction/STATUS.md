# phone-distraction: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/phone-distraction/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. Note: the studio film is now the Receipt rebuild, so re-rendering it does not give back the posted Lock-screen film. See [reference/PATTERNS.md](reference/PATTERNS.md).


"Why can't I stop scrolling? It was designed that way": an HCI master's student explains the design features that keep you on your phone (pull-to-refresh, infinite scroll, autoplay, red badges, likes), where they came from (Herbert Simon's attention economy, B.J. Fogg's Stanford lab), what the EU found in 2026, why she left Instagram for six years at 19, and what she does now. Created 2026-10-12. **Everyone reads `BRIEF.md` first** (what she actually says vs the kit, whisper fixes, verified facts with sources).

## Kit (`kit/`)
- `phone addiction.mov`: her recording, 4K (3840x2160) HEVC, 14:56.7 (896.7 s); speech 0:00-14:52. She sits in her room (plants, bookshelf, green door) in a lilac top and headband, holding a **green handheld microphone, not a phone**. Never flip her face; check mirroring before any crop.
- `transcripts/`: whisper small.en `transcript.srt`, `transcript.json`, `transcript.words.json` (word level), `voice16k.wav`. Corrections list in `BRIEF.md`.
- `phone-designed-to-distract-kit.md`: her content kit (a draft she recorded from, **not the source of truth**): 14-segment script, title options, description, tags, a 2-min main short, shorts 2-7, clip breakdown, captions. Several kit lines are not in the recording (Aza Raskin's name, "Facebook apps / ten weeks", "the Guardian", the brain-drain replication). See `BRIEF.md`.
- `refined-kit.md`: **the strategist's refined kit** (see below).

## Deliverables
| Item | State |
|---|---|
| Brief (`BRIEF.md`) | **Done 2026-10-12** (strategist): what she says with times, kit-only vs recording-only lines, whisper corrections, 19 claims checked (verified / reported / contested, with sources), current news, her stance. |
| Refined kit (`kit/refined-kit.md`) | **Done 2026-10-12, waiting on her pick** (strategist). Live research: 15 YouTube searches + channel baselines via yt-dlp (19 outliers, ratios 31x-2,560x), YouTube / Google / TikTok search suggestions, news to 12 Oct 2026. **17 titles** (all 40-60 characters, keyword in the first 40, checked by code), **20 thumbnail concepts** each paired with titles (4 rounds of rewrites, 3 cold reviews), description + chapters + tags, posts for the full video, captions for 9 shorts x 5 platforms, carousel slide-1 and short hooks. **Top 3 pairs** (each 8/10 cold): S8 "Why Can't I Stop Scrolling? It Was Designed That Way" + TH19 "1:40 AM. AGAIN."; "He Invented Pull-to-Refresh. Later He Called It Addictive" + TH04 "THIS GESTURE"; "How to Stop Scrolling: Phone Settings That Actually Help" + TH20 "MAKE IT BORING". |
| Motion film (studio project in `film/`, 16:9 + 9:16) | **Built and exported 2026-10-13** in look **A · Lock screen** (her pick). Editable at http://localhost:7700/edit/phone-distraction/. 81 screens over her whole narration, voice tightened 14:57 -> 14:31 (4 retakes / repeats + 3 long pauses cut, `film/data/cutlist.json`). Her lines land as notification banners with red underline / red-word events on her spoken words; the clock rolls; badges count; 16 pull-to-refresh transitions and 5 red badge bursts (her biggest claims). Real sources: the pull-to-refresh patent FIG. 8 (plots on, zooms to "Pull down to refresh...", ringed on "addictive"), the EU press releases on TikTok (6 Feb 2026) and Meta (10 Jul 2026) with the named features highlighted on her words, the CHI 2016 paper title. Facts: "Reportedly" on the blue -> red badge story, "preliminary" on the EU findings, 2009 for Tweetie (she says 2008), "contested" on the brain-drain claim. Critics: red-badge section 6.5 -> 7.6 -> **8.0 pass**; whole film 6 -> 7 -> **7.5** (3 rounds; open: the screen-template mix, see Waiting on her). Exports: `outputs/video/phone-distraction_motion_16x9.mp4` and `_9x16.mp4` (+ .srt), 14:36, -14.3 LUFS, true peak -2.5 dBTP after AAC; copies in `~/Downloads/phone-distraction-film/`. |
| Talking-head edit (her face + graphics) | **Exported 2026-10-13 (EXPORT agent), both sizes**: `outputs/talking-head/talkinghead-full_16x9.mp4` + `talkinghead-full_9x16.mp4` (+ .srt), 14:30 each, -14.1 LUFS, true peak -1.7 dBTP; hard-linked in ~/Downloads/phone-distraction/talking-head/. Critic (fresh, 1 round): 16:9 6.5/10, 9:16 5.5/10. Fixed: caption "and that's not knowing" -> "and that not knowing". Open: 9:16 round face inset covers card text (0:30, 2:18, 4:06, 6:06, 7:06, 10:30, 11:30); one grey frame at the 8:06 cut; 4:30 red PULL-TO-REFRESH title on her headband; 9:42 the 'Ward 2017 / not replicated 2022' line is tiny; the big-word-over-her-chest treatment used ~10 times. **Listen-check for her**: 12:05 the caption reads "they don't have my mobile number to call me directly" (meaning inverted? likely "if they have my number they can call me"), 11:07 "If I even understood this thing", 1:15 "think about [how] our social media apps make their money". Editor: http://localhost:7700/moment/phone-distraction/full/ |
| Shorts (9:16) | **+9 more shorts 2026-10-15 (SHORTS agent section at the bottom).** **Exported 2026-10-13 (EXPORT agent)**: `outputs/shorts/short01-free-apps` (now opens on "You don't pay Instagram to use Instagram.") · `short02-rewards` · `short03-pull-to-refresh` · `short04-infinite-scroll` (88 s -> 73 s: the book-chapter and buying-season-two asides cut) · `short05-red-badges` (ends on "…if that makes sense.") · `short06-eu` (opens on "In February 2026, the European Commission…", ends on "…how this all goes.") · `short07-quit-instagram` (ends on "I'll see it when I open the app."), all `_9x16.mp4` + .srt, -14.0/-14.1 LUFS, TP -1.9; hard-linked in ~/Downloads/phone-distraction/shorts/. Labels no longer say "(pt N)" (each short stands alone). End cards 4 s. Critic before fixes: s01 6, s02 4.5, s03 6, s04 4.5, s05 5, s06 5, s07 6. Open: burned captions sit on insert text in several shorts (caption band vs insert layout, [big] per short), hooks type on one word at a time, s03 caption 'around 2008' vs card '2009', s05 made-up book page filler should be labelled, s07 toggles show YouTube/WhatsApp on while she says all off. Editors: http://localhost:7700/moment/phone-distraction/s01/ … s07 |
| YouTube thumbnails | **v3: 20 options 2026-10-16, waiting on her pick** (after she said v2 was one formula with script-like words). A real MIX: 8 her photo as background, 4 collage over her photo, 5 flat graphic (13, 14 kept from v2), 3 other (split before/after, the real European Commission headline, close face). Wording gate first (no 3-word run from her transcript; a cold critic read all 20 texts). 4 fresh critic rounds vs her own thumbnail. **Recommended:** 13 "Phone addiction is by design", 03 "How apps keep you scrolling", 17 "5 tricks apps use on you". Collages and 06 are the weakest (5.5-7): real object photos and her own photos (holding her phone, at night, no mic) would lift them. Editor: http://localhost:7700/design/phone-distraction/thumbnails/ · PNGs + `overview.png` (2-3 titles each, scores) in `outputs/thumbnails/` and `~/Downloads/phone-distraction-thumbnails/` (v2 in `old-v2/`, v1 in `old-v1/`) · notes `design/thumbnails/NOTES.md` · v2 directions in `design/thumbnails/archive/v2/`. |
| Instagram carousel (1080x1350) | **Done 2026-10-13** (design agent): 10 slides, "Books end. Your feed doesn't.", the 5 design choices, the EU, what to switch off, end card. Editor: http://localhost:7700/design/phone-distraction/carousels/instagram/ · `outputs/carousels/instagram/` + Downloads · notes `design/carousels/instagram/NOTES.md`. build.mjs checks clean; cold critic 7 -> 7 -> **8/10** (round 3). |
| LinkedIn carousel (PDF) | **Done 2026-10-13** (design agent): 8 pages for product teams (the EU findings, defaults, stopping cues, the CHI study, Fogg, 5 design-review questions). Editor: http://localhost:7700/design/phone-distraction/carousels/linkedin/ · `outputs/carousels/linkedin/carousel.pdf` + PNGs + Downloads · notes `design/carousels/linkedin/NOTES.md`. build.mjs checks clean; cold critic 7 -> 7 -> 7 -> **8/10** (round 5, its last small fixes applied). |

## Waiting on her
- **Film (2026-10-13): please watch** `~/Downloads/phone-distraction-film/phone-distraction_motion_16x9.mp4` **with sound**. The critic's last open point is taste, not a bug: most screens use the same lock-screen grammar (headline left, phone card right). Keep it as the film's system, or ask for ~10 screens rebuilt as centred / full-bleed layouts.
- **Listen at 12:32 of her recording** (film 12:09): "if someone's trying to reach me and they **don't** have my mobile number" vs "**have**": the film shows "doesn't have my number".
- **Disk** (resolved 2026-10-13 ~20:00: exported as the only job with a 3 GB floor): about 5 GB free, so the talking-head edit and the shorts were built but not exported. Empty the Bin (several GB of old renders) and they export from the studio.
- **Pick a film look** (A lock screen recommended; see `film/stills/directions/README.md` and the 3 motion tests with sound). Please listen to them.
- **Pick** a title and the thumbnail directions to design (or say "make all 20").
- **Photos** (10 minutes on her phone): holding her phone up; in bed or on the sofa at night lit by the phone; phone face down on the desk; peeking at the phone over a cup; any photo of her at about 19.
- **Her app blocker**: whisper heard "app block" at 13:26; what is it called? Can we name it?
- **Swearing**: "made a shitload of money" (3:36): keep, bleep or cut in the film? (No proposed short includes it.)
- **Facts to confirm by listening**: "about 2008" for pull-to-refresh (the Guardian says 2009: we'll show 2009 or no year); "if they have / don't have my mobile number" (12:32); "put these things in place" and "they're all working so hard" (14:16-14:22, whisper unclear).
- **Talking-head scope**: the full video with graphics, or the strongest moments only?
- **"HCI researcher" or "HCI student"** in titles and captions? (Titles now say "a Researcher Explains"; posts say "a master's in human-computer interaction".)

## Her pick (2026-10-13)
Film look approved: see film/stills/directions/README.md (recommended direction A). Build phase started per projects/BUILD-BRIEF.md.


## Design hand-off checks (thumbnails T, carousels C), 2026-10-13
| id | result | note |
|---|---|---|
| her-words | pass | carousel quotes checked against transcript.srt ("stopping point", "deciding to stop takes effort", "your attention is, in a way, the product", "a small burst of social approval", "what do I need from it right now"); facts only from BRIEF.md verified table (dated sources on the slides); illustrations labelled |
| stands-alone | fixed | T: `tools/check.py` finds no 3-word run from her transcript on any thumbnail; cold image-only critic (2 rounds): "STILL NOTHING?" and "5 MINUTES LATER..." cut as meaningless cold; C: slide 1 / page 1 read cold in about a second (critics) |
| titles-paired | pass | 2-3 titles each, 40-60 characters, checked by `tools/check.py`; title-pair critic 2 rounds, best pairs swapped first |
| no-dashes-no-hype | pass | `tools/check.py` (titles); carousel copy read by eye |
| text-safe-area | pass | C: build.mjs margin check clean; T: text >= 24 px from edges except full-bleed type by design (06) |
| no-collisions | fixed | C: build.mjs clean (footer check now ignores parts clipped on purpose); T: overlaps fixed after taste critic (07, 09, 12, 15, 17, 18) |
| text-contrast | pass | palette pairs measured: red #FF4433 on ink 5.7:1, ink on red 5.7:1, white on red 3.4:1 (large type only), red #E0301F on paper 4.0:1 (display only), muted #8B8D94 on ink 5.9:1; photo-led headlines carry a soft shadow |
| type-size | pass | C: mono >= 32 px and one-word last lines checked by build.mjs; T: ILLUSTRATION tags 18 px (were 12) |
| banned-list | fixed | taste critic: card edge strips removed, labels-on-every-object (21) cut, leader line (11) cut, eyebrows cut to the ones that number the 5 choices; flat grounds only |
| unique-look | pass | own look from the approved film look A + her Pinterest editorial; nothing started from reading-stack or ghana-marrify thumbnails |
| small-size | pass | `tools/review.py` sheet at 320x180 and 168x94 (`design/thumbnails/review/review_sheet.png`); the microphone reads oddly small (her photos would fix it) |
| editable | pass | all 23 directions and both decks open in the studio editors; exports run the same render.mjs / build.mjs |
| delivered | pass | `~/Downloads/phone-distraction-thumbnails/` (23 + overview), `~/Downloads/phone-distraction-carousels/{instagram,linkedin}/` (PNGs, overview, carousel.pdf) |
| her-photo | pass | never flipped or retouched; light warm grade only; closed-mouth frames checked by eye |

## Checks: motion film (2026-10-13, FILM agent)
| id | result | note |
|---|---|---|
| her-words | pass | banners/headlines are her words (words.json, whisper fixes in film/tools/fixes.py); 2009 for Tweetie, "Reportedly" on blue -> red, "preliminary" on the EU, brain drain "contested"; open: "doesn't have my number" (listen) |
| text-safe-area | pass | 9:16 grids shrink to end above y 1440; critic round 3: no collisions in either aspect |
| no-collisions | fixed | 7 found in critic round 2 (cues, unfinished, patent, grayscale, class, blocker, likes), all cleared in round 3 |
| text-contrast | pass | render.mjs contrast: 6611 texts, 0 below the bar (both modes) |
| type-size | fixed | headlines 84 px, one-sentence screens 130-170 px, credits 40 px, labels 34 px (16:9) |
| reading-time | fixed | audit reading-time flags 65 -> 39 (remaining are banner step-downs right after a land) |
| frame-sheet | pass | blackdetect flags only dark lock-screen frames (ink #0C0D10 ground, checked by eye); freezes are UI holds under 4 s |
| no-blank-cuts | fixed | board 21 -> 0 flags (screens open with their content) |
| transitions-carried | pass | 80 cuts, all with carrier + why (16 pull-to-refresh, 5 badge bursts, hard cuts on her word) |
| banned-list | pass | no gradients, glow, particles, HUD; one accent (badge red) |
| unique-look | pass | look A, approved |
| motion-craft | fixed | dead stops 15 -> 0; short moves 18 (banner drops, deliberate) |
| dead-holds | fixed | 17 -> 0 (word-by-word lines + push-ins on the last 10) |
| expects | n/a | no MOTION.expect registered |
| determinism | pass | every frame from seek(t); no timers / random |
| sync | fixed | audit 40 off -> 0 (measured nudges, film/scenes/nudges.js) |
| hits-audible | fixed | soundqa over_bed median 0.3 -> 7.2 dB; 239 -> 135 cues (quiet ones dropped) |
| music-under-voice | pass | 14.1 dB |
| loudness | pass | -14.3 LUFS, true peak -2.5 dBTP after AAC |
| phone-band | pass | drop -1.9 dB, 1.3 % under 60 Hz |
| dc-offset | pass | mix -76 dBFS |
| stems-fresh | pass | soundqa: stems up to date |
| format | pass | 1920x1080 and 1080x1920, 30 fps, H.264 yuv420p + AAC, 876.6 s |
| editable | pass | http://localhost:7700/edit/phone-distraction/ |
| delivered | pass | ~/Downloads/phone-distraction-film/ |

## CHECKS: talking-head + shorts export (EXPORT agent, 2026-10-13)
| id | result | note |
|---|---|---|
| her-words | fixed | critic read every .srt vs BRIEF corrections: names right (Herbert Simon, B.J. Fogg, Gbemisola); "that's not knowing" fixed; listen-checks for her at 12:05, 11:07, 1:15; "B.J." splits the caption line (engine caption splitter, open) |
| stands-alone | fixed | "(pt N)" dropped from labels; s01 and s06 open on a full statement; s05 / s06 / s07 end on full sentences |
| text-safe-area | pass | composite check: 0 overflow |
| no-collisions | n/a | open: captions over insert text, face inset over cards in 9:16 (layout work, [big]) |
| frame-sheet | pass | blackdetect hits = the lock-screen ink ground with type-on text (17.5 s, 320.7 s), checked by eye; one grey frame at 8:06 (open) |
| dead-holds | n/a | critic measured 6-7.6 s holds at 4:28, 5:33, 6:01, 7:41, 7:56, 8:12, 9:14, 11:33, 11:58 (open) |
| loudness | pass | -14.0 to -14.1 LUFS, true peak -1.7 to -1.9 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 + AAC |
| editable | pass | /moment/phone-distraction/full/, /s01/ ... /s07/ |
| delivered | pass | hard links in ~/Downloads/phone-distraction/talking-head/ and shorts/ |
| reading-time, motion-craft, sync | n/a | engine layouts and cues unchanged in this run |

## Content pass: labels + missing footage (CONTENT agent, 2026-10-14)
- **Labels removed (~46)**: film `kit.js` illus() is now a no-op (19 "Illustration" labels on drawn phone screens); carousels: the tag on the Instagram feed slide and the up-next player's tag (both decks); thumbnails: 27 labels in 20 directions (+ `tools/gen.py`). Every phone/app drawing is generic (no real app, logo or interface); real-source credits kept.
- **Missing-footage segments fixed** (old times): full 3:28, 6:22 (7 s), 6:50, 9:20, 11:19 (both sizes). Shorts had no film-only stretch over 6 s.
- **Rule now in `talking-head/moments/common.js`** (every moment of this project, full + shorts): a film-only cutaway (L9) longer than 6 s keeps ~3 s full frame (cut on a word start), then her picture comes back: 16:9 her circle over the same film (L11), 9:16 half and half (film on top, 1130 px; her below). `keepAlone: true` on a TH.cutaway call opts out. Audit after: no stretch without her longer than ~6 s except L10 cards and L6 cut-outs (she is in those).
- Engine bug (her picture at a later box's place, claude-rule 1:37-1:47): fix present in `studio/tools/composite.mjs` (per-branch sendcmds); every current export was made after it (2026-10-13 19:05+). The stills tool does not exercise that path: confirm on the re-export's contact sheet.
- Stills: both carousels + 20 thumbnails re-rendered and hard-linked into ~/Downloads/phone-distraction-carousels/ and -thumbnails/.
- **Needs re-export** (not run: disk ~2.8 GB): motion film (16x9 + 9x16), talking-head full (both), every short. See `projects/EXPORT-HANDOFF.md`.

## Re-export after content pass (EXPORT agent, 2026-10-14 12:46-13:08)
All replaced in place and hard-linked (inode checked) into `~/Downloads/phone-distraction/` (film), `.../talking-head/`, `.../shorts/`.
- talking-head full 16x9 (her captions on) + 9x16: 14:29.9, -14.1 LUFS, TP -1.7 / -1.5 dBTP.
- shorts s01-s07: 0:38.8, 0:50.0, 0:34.2, 1:13.0, 0:47.9, 0:57.3, 1:03.3; -14.0/-14.1 LUFS, TP -1.9.
- motion film 16x9 + 9x16: 14:36.6, -14.3 LUFS, TP -2.5 dBTP (stems fresh, cue key d4ed023e).
- No fixes needed. Notes: 9:16 0:14-0:20 is 6 s without her (red name card + "In this video" film), on the limit;
  her circle touches the edge of the "Older forms of media" cards (~4:45) and the Loren Brichter card in 9:16 (small).

| id | result | note |
|---|---|---|
| her-words | pass | OCR every 2-3 s of all 11 files: 0 "illustration" / disclaimer hits |
| no-collisions | pass | contact sheets looked at; small circle touches noted above |
| frame-sheet | pass | edits 1/15 s, shorts 1/3 s, films 1/15 s |
| footage-present | pass | texture scan every 0.5 s: only 9:16 0:14-0:20 (6 s, intro card) |
| captions | pass | 16:9 full: her captions on and readable |
| loudness | pass | -14.0..-14.3 LUFS, TP <= -1.5 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, h264 yuv420p + AAC |
| stems-fresh | pass | cue key = meta |
| delivered | pass | hard links, inode match |

## Refined kit restructured (KIT EDITOR, 2026-10-14)
- `kit/refined-kit.md` now follows the fixed structure (at a glance, YouTube, thumbnails, the 7 built shorts with captions for every platform + YouTube Shorts tags, teaser, carousels, long-form posts, research last); 16 chapters timed to `talkinghead-full_16x9.mp4` with the film's times beside them; the old version is kept as `kit/refined-kit.v1.md`. Open: teaser file (being built), her title/thumbnail pick (carousel end slides still name "Why Can't I Stop Scrolling? It Was Designed That Way"), the "have / don't have my number" listen-check, app blocker name.


## Teaser for LinkedIn and X (TEASER agent, 2026-10-14)
| Item | State |
|---|---|
| Teaser (LinkedIn and X) | **Exported 2026-10-14**: `outputs/teaser/teaser-phone-distraction_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:37.0 each, -14.0 LUFS, true peak <= -1.9 dBTP; hard-linked in `~/Downloads/phone-distraction/teaser/`. Editor http://localhost:7700/moment/phone-distraction/teaser/ (16:9, 1:1, 4:5, 9:16; 9:16 not exported). Bites, order and look in `talking-head/teaser/teaser.js` + `talking-head.json` "teaser". Look: Lock screen (ink, badge red, Inter Tight): countdown as a lock-screen clock 0:03-0:01 with a notification from @WithGbemi, a notification-pill label with a red badge, film lock-screen / red full-bleed inserts, end card as a lock screen with the video as a notification. Music: Mixkit 1009 (rises; opens up on the end card). Fresh critic: 5.5 -> 7 (round 2); its fixes (gambling insert drawn twice in the film: replaced by her + keyword; "years" counter: replaced by her + "six good years"; CHI card scaled; Instagram card ahead; YouTube URL back on the end card) made and checked, not re-scored. Spec: `inspiration/know-how/TEASER-PLAYBOOK.md`. |

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
| editable | pass | /moment/phone-distraction/teaser/ opens (headless check, all four sizes offered) |
| delivered | pass | hard links in ~/Downloads/phone-distraction/teaser/ (same inode) |
| sync | n/a | cues placed by the layouts / bite starts; not run through soundqa.py |

## SHORTS agent, 2026-10-15: 9 more shorts (16 in all)
Her rule (10-15): no cap at 6. All four old spares built, plus five more. New (raw times on `kit/phone addiction.mov`; critic round 1 average ~6 -> hand-built scripts -> fresh re-score):
| short | label | length | raw | re-score |
|---|---|---|---|---|
| s08 `short08-attention-economy` | the attention economy | 0:39 | 0:00-1:07.3 (intro 0:14-0:46 cut) | 8.5 |
| s09 `short09-persuasive-technology` | persuasive technology | 0:54 | 1:57.1-3:27.4 (3 cuts; her swear word not included) | 7 |
| s10 `short10-why-you-open-apps` | what makes you open an app | 0:35 | 2:40.4-3:11.0 | 7.5 |
| s11 `short11-autoplay` | autoplay | 0:52 | 6:54.0-7:42.0 | 7.5 |
| s12 `short12-likes` | why you keep checking your likes | 0:58 | 9:01.5-9:55.3 | 7 |
| s13 `short13-notifications-study` | notifications on for a week: a study | 0:29 | 8:32.6-9:01.4 (her "CHI, CHI" repeat cut) | 8.5 |
| s14 `short14-use-your-phone-less` | how to use your phone less | 0:47 | 12:45.6-13:29.0 | 7 |
| s15 `short15-before-you-open-an-app` | how I stop myself scrolling | 0:31 | 13:29.0-13:56.3 | 8 |
| s16 `short16-attention-is-an-asset` | your attention is an asset | 0:49 | 13:56.4-14:50.4 | 7.5 |
Scripts `talking-head/shorts/s08.js`-`s16.js` (hand-built; `tools/gen_shorts.py` now takes ids and only writes those); hook text types inside 1.2 s and sits under the label. Data fix: `data/raw_words.json` "mountains or some valleys" -> "and" (BRIEF correction; backup in the SHORTS agent's scratch). Captions/tags in `kit/refined-kit.md` section 3 (posting order: old seven, then SH11, SH13, SH12, SH8, SH9, SH10, SH14, SH15, SH16). Editors http://localhost:7700/moment/phone-distraction/s08/ ... /s16/.
Open: openers with bridge words she says ("now", "also", "another"); s09/s12 run 54-58 s; the film's lock-screen clock jumps (s16, film content); "students use" (whisper; she may say "used": listen).

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
Her note: not smooth; move from point to point with visible transitions, like a movie teaser. **Exported** `outputs/teaser/teaser-phone-distraction_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:37 each, -14.0 LUFS, true peak -1.9 dBTP, no freezes > 2.5 s; hard-linked in `~/Downloads/phone-distraction/teaser/` (v1 files kept in `outputs/teaser/previous-v1/`). Editor http://localhost:7700/moment/phone-distraction/teaser/.
Order: lock-screen countdown 1.5 s -> hook -> card THE PRODUCT -> card THE TRICKS -> card THE PROOF -> card THE COST -> music stops for "your attention is an asset..." -> card CAN'T STOP SCROLLING? -> stinger "So what exactly can we, you, me, do about this?" -> end card (4 s). 1:1 / 4:5: captions step aside on the CHI study card (they sat on its Week B row). Cuts: flash / black / whip (opaque accent panel) / glitch, never the same twice in a row; cut sounds flash, boom, swipe, glitchHit; risers into the cards; music in sections (measured on the music track: about +10 dB from act 1 to act 3, +8 dB on each card, silent under the biggest line). Critic (fresh, 2 rounds): 5 -> 6/10; round-2 fixes (louder cold open with the topic big, louder bed, harder card slam, shorter end card, a 5th card) applied and checked on contact sheets, not re-scored. Out of scope by her rules: the critics wanted bold white captions; her 16:9 caption style stays.
Also 2026-10-15: every short, the teaser and the full edit re-exported after the engine fix for one empty frame where a half-and-half layout hands back to her full frame.
- 10-18: s07 (I quit Instagram at 19): cut "I feel like if I continued using Instagram at that rate, I would have turned out to be one influencer or something" (source 700.95-707.25, her request); 59.3 s -> 52.9 s. The opening shout (repeated the label, drawn under it) replaced by her talking. Hand-edited s07.js: gen_shorts.py would undo it.
- 10-18: posted: https://youtu.be/5Fpb2bUhHXc (in the kit's At a glance + every [LINK]).
- 2026-10-30: her raw recording moved to the Bin at her request (to free space). Finished exports in outputs/ are kept; the talking-head edits, shorts and teaser can no longer be re-exported (motion film still can: voice in kit/transcripts).

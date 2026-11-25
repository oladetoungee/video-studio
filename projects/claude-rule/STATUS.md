# claude-rule: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/claude-rule/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


"Anthropic's new rule about being cruel to Claude, and is AI conscious?": from 12 November 2026 Anthropic's usage policy bans "sustained and needless abusive or cruel behavior" toward its models (announced 8 Oct 2026; Claude ending the chat is the main enforcement). Gbemi isn't defending cruelty; she argues Claude is a powerful tool, not a conscious being, that giving tools human attributes is a slippery slope, asks whether a "maybe-conscious" Claude could be tired at 9pm (and what that would make Anthropic), and says we should be kind for our own sake. Created 2026-10-12. **News deadline: post before 12 November.** Everyone reads `BRIEF.md` first (what she says vs the kit, whisper fixes, verified facts, her stance).

## Kit (`kit/`)
- `anthropic rule for claude.mov`: her recording, 4:32, 3840×2160 HEVC, landscape. Never mirror-flip.
- `claude-abuse-rule-ai-consciousness-kit.md`: her kit, "Version 3" (script, titles, description, tags, main short + 4 shorts, 11-clip breakdown, captions, X, comments, Instagram carousel, Medium essay, sources). **A draft, not the source of truth**: the recording wins (`BRIEF.md` lists what's in the kit but not said on camera).
- `transcripts/`: whisper `transcript.srt`, `transcript.json`, `transcript.words.json` (word level), `voice16k.wav`. Names misspelled ("clod", "Antropic"): corrections in `BRIEF.md`. Lines to confirm by ear: 0:00 "12th of November" (whisper: "draft of"), 2:02 "impose", 4:01 "guard your heart", 4:10 "No, it's not".

## Deliverables
| Item | State |
|---|---|
| Brief (`BRIEF.md`) | **Done 2026-10-12** (social strategist): what she says with times, kit lines she never says, whisper fixes, verified facts with sources, unverified claims, her stance, project rules (illustration labels, no "now banned"). |
| Refined kit (`kit/refined-kit.md`) | **Done 2026-10-12** (social strategist). Research (news, 15 outlier videos with channel baselines, YouTube/Google suggestions), 12 titles (code-checked), **22 thumbnail concepts** each paired with 2-3 titles, top 3 pairs for Test & Compare, description + chapters + tags, 6 shorts, captions per platform per short, carousel and short hooks, three cold-review rounds logged. Top pairs: T6 "Is It Okay to Be Mean to AI? Anthropic's New Rule" + "AI CAN HANG UP" (8/10); T3 "Claude Can End Your Chat If You're Cruel. But Why?" + "TOO RUDE FOR AI?" (8); T3 + "FRUSTRATED VS CRUEL" (8). Ten thumbnails rebuilt after round 3 have not had their own cold test yet. |
| Real source capture | **Done 2026-10-13**: Anthropic's "2026 Usage Policy update" page (top, the abuse section, "takes effect on November 12", crops, an 8 s scroll recording) and the constitution's "moral status is deeply uncertain" paragraph, captured with headless Chrome, with phrase boxes for exact highlights: `film/assets/sources/anthropic/` (script `film/tools/sources/anthropic.mjs`). |
| Film directions (gate: her pick) | **Done 2026-10-13, waiting on her pick**: `film/stills/directions/README.md`. A · The Thread (chat-thread film; recommended), B · The Fine Print (real page lifts into editorial type), C · The Slope (plank tilts on "slippery slope"). Each has 4+2 stills, a contact sheet, and a 10-11 s motion test on her voice with sound. Also talking-head style frames (L2, L5, L4, L11) and SH2 short frames. Critic (2 rounds): A 8.0 passes (fixes made), B 7.0, C 5.5. |
| Motion film (studio project in `film/`, 16:9 + 9:16, editable) | **Built 2026-10-13 (FILM agent), waiting on her review**: `/edit/claude-rule/`, 57 screens in look A · The Thread + B's two voices + C's plank (twice). Voice tightened 272.3 s -> 262.2 s (`film/data/cutlist.json`). Real sources highlighted as she cites them: Anthropic's policy update + constitution, Mustafa Suleyman's essay (captured 2026-10-13). Exports: `outputs/video/claude-rule_motion_16x9.mp4` + `_9x16.mp4` (+ .srt), copies in ~/Downloads/claude-rule/. Critic rounds: 6.3, 6.9, 7.0 (3 rounds; the bar of 8 was not reached; round-3 fixes made but not re-scored, see `film/README.md` "Open"). |
| Full talking-head edit with graphics (her face + zooms, things beside her, words on key lines) | **Exported 2026-10-13 19:08 (EXPORT agent)**: `outputs/talking-head/talkinghead-full_16x9.mp4` + `talkinghead-full_9x16.mp4` (+ .srt), 4:22 each, -14.1 LUFS, true peak -1.8 dBTP, 1920x1080 / 1080x1920, 30 fps; hard-linked in ~/Downloads/claude-rule/talking-head/. Editor `/moment/claude-rule/full/`. Critic (fresh, 1 round): 16:9 6/10, 9:16 6/10 before fixes. Fixed: her half missing at 1:37-1:47 (engine bug, see projects/EXPORT-HANDOFF.md), 9:16 pop words cut at the edges, 9:16 film top line cut in half panels, the 36 s face-only stretch 3:29-4:08 (now three film halves), ILLUSION raised above her head, "feeling" smaller. Open [bigger]: her cut-out covers part of the Constitution / Suleyman screenshots (1:03, 2:39); screenshot body text small; film fragments "But I" (1:45) and "But overall," (4:09) are the film's own type-on. |
| Shorts (6, per `inspiration/know-how/SHORTS-PLAYBOOK.md`) | **Exported 2026-10-13 19:09-19:14 (EXPORT agent)**: `outputs/shorts/short01-rule-pt1` (34 s) · `short02-rule-pt2` (42 s, label now "What Anthropic's new rule actually says", ends on "…dabbling with the idea.") · `short03-is-claude-conscious` (43 s) · `short04-ai-like-a-person` (64 s, opens on the numbered list) · `short05-can-ai-get-tired` (44 s, opens on the what-if list, not leftover film) · `short06-be-nice-to-ai` (31 s), all `_9x16.mp4` + .srt, -14.0/-14.1 LUFS, TP <= -1.6; hard-linked in ~/Downloads/claude-rule/shorts/. End cards 5 s. Critic scores before fixes: sh1 6, sh2 5, sh3 6, sh4 5, sh5 4, sh6 7. Captions checked against BRIEF corrections: clean. Open: sh3 slow first line, sh1 meter hold ~7 s, captions double the chat bubbles in sh1/sh2, Suleyman screenshot text small in sh4. SH5 keeps the slave-owner line (her call). |
| YouTube thumbnails (≥ 20 directions, each with titles) | **Done 2026-10-13, waiting on her pick** (DESIGN agent): 21 options in the film's Thread look, mostly her real room (4K frames, never flipped, lightly warmed, closed-mouth frames picked by face landmarks) + real Anthropic clippings (credited) + drawn chat UIs (ILLUSTRATION). 3 gates, 3 rounds. **Recommended: 01 TOO RUDE FOR AI? (pair 8/8), 20 IS CLAUDE CONSCIOUS? / my answer: no (8/8), 22 NEW CLAUDE RULE / FROM NOV 12 (9/8, only before 12 Nov; then 02 AI CAN HANG UP, 8/8).** Editor: http://localhost:7700/design/claude-rule/thumbnails/ · `outputs/thumbnails/overview.png` · `~/Downloads/claude-rule-thumbnails/` · notes `design/thumbnails/NOTES.md`. Her own photos would still beat video frames. |
| Instagram carousel (1080×1350) + LinkedIn carousel (PDF) | **Done 2026-10-13** (DESIGN agent): 10 + 10 slides in the Thread look (real Anthropic screenshots highlighted + credited, her verbatim words as bubbles, drawn chats marked ILLUSTRATION, the model never speaks). Cold critic: 6.5 → 8.0 (Instagram) / 8.1 (LinkedIn) over 7 rounds; last small fixes applied. `build.mjs` checks clean. Editors: http://localhost:7700/design/claude-rule/carousels/instagram/ and /linkedin/ · `outputs/carousels/{instagram,linkedin}/` (+ `carousel.pdf`) · `~/Downloads/claude-rule-carousels/`. The end slides name the video "Claude Can End Your Chat If You're Cruel. But Why?" until she picks a title. |

## Waiting on her
- Pick a film look: A The Thread, B The Fine Print, C The Slope, or a mix. See `film/stills/directions/README.md`, the `contact.jpg` in each folder, and the motion tests.
- Pick: lead with the news fact ("Claude can end your chat if you're cruel", strongest with strangers) or the consciousness question (bigger search, weaker cold scores)?
- The slave-owner line: keep in SH5 or end SH5 at 3:35 ("…be an offender?")? (It stays off titles, thumbnails and slide 1 either way.)
- Her own photos for thumbnails.
- Confirm by ear the four whisper lines above.
- TikTok search suggestions for "claude" and "is ai conscious" (we can't see TikTok from here).

## Her pick (2026-10-13)
Film look approved: see film/stills/directions/README.md (recommended direction A). Build phase started per projects/BUILD-BRIEF.md.

## Disk-space wait: resolved (EXPORT agent, 19:14)
- Talking-head edit and the 6 shorts re-exported with the bigger chats and fixes (rows above).

## Waiting on her (FILM agent, 2026-10-13)
- Watch the film (`~/Downloads/claude-rule/claude-rule_motion_16x9.mp4`), the full talking-head edit and the 6 shorts; the critic stopped at 7.0/10 after 3 rounds (open notes in `film/README.md`).
- SH5: keep the slave-owner line or end at "…be an offender?"
- Confirm by ear: "From the 12th of November 2026" (0:00) and "impose a human consciousness in a machine" (2:01).

## CHECKS: talking-head + shorts export (EXPORT agent, 2026-10-13)
| id | result | note |
|---|---|---|
| her-words | pass | every .srt read by the critic against BRIEF corrections: Claude, impose, possess, guard, the head of AI at Microsoft, has consciousness, It's selling it, whole; no kit-only lines |
| text-safe-area | fixed | 9:16 pops clamped inside the frame, behind-her words shrink to fit, film panels kept below the shorts label |
| no-collisions | fixed | ILLUSION above her head; film top line no longer under the label; open: cut-out over screenshots (1:03, 2:39) |
| type-size | fixed | "feeling" keyword smaller; open: screenshot body text small (film content) |
| reading-time | n/a | moments reuse the film's timings; not re-measured in this export run |
| frame-sheet | pass | contact sheets 1/6 s (full) and 1/2.5 s (shorts) looked at; blackdetect hits = the film's off-black type-on frames (25.1 s, 246.8 s), no true black |
| dead-holds | fixed | full 3:29-4:08 face-only stretch filled with three film halves |
| banned-list | pass | no corner HUD, flat grounds |
| motion-craft | n/a | layouts unchanged (engine layouts), not re-measured |
| sync | n/a | cue timing from the moment engine, unchanged |
| loudness | pass | all files -14.0 to -14.1 LUFS, true peak -1.6 to -1.9 dBTP (after AAC) |
| format | pass | ffprobe: 1920x1080 / 1080x1920, 30 fps, H.264 + AAC, lengths above |
| editable | pass | /moment/claude-rule/full/, /sh1/ ... /sh6/ |
| delivered | pass | hard links in ~/Downloads/claude-rule/talking-head/ and shorts/ |

## Content pass: labels + missing footage (CONTENT agent, 2026-10-14)
- **Labels removed (film 7, carousels 2 kinds per deck, thumbnails 16)**: film `scenes1.js` "ILLUSTRATION · a sum…" (kept the line without the word), the meter's "ANTHROPIC, AS SHE READS IT · ILLUSTRATION"; `scenes2.js` "ILLUSTRATION · a long day of requests" (now a 12:30 PM time line), "HER WHAT-IF" twice; `thread.js` the chat input's "ILLUSTRATION". Carousels: chat window "Illustration" tag (both decks), "Illustration." in the Where-the-line-is source line (now "Lists from Anthropic's update, 8 Oct 2026"). Thumbnails: 16 labels in 16 directions (+ `tools/gen.py`).
- **Content changed instead of labelled**: "Hey, I'm tired. I don't want to do anything else." was a grey reply bubble (looked like Claude speaking, labelled "her what-if · not a real reply"). It is now in HER bubble, continuing her own sentence ("…the ability to say like,"), so nobody reads it as a Claude reply.
- `talking-head.json` "pad": "#CDBFF3" (lilac): a half-and-half panel sliding in no longer shows an empty paper strip (full 0:05.8, 1:58, 3:30).
- **Missing-footage segments fixed** (old times; film-only stretches): full 0:28.5-0:36.5 (8 s, the meter), 0:39.8-0:46.0, 2:21-2:31 (10 s, the slope), 4:08-4:14 (both sizes); sh1 0:01.5-0:11 and 0:21-0:29; sh2 0:03-0:13 and 0:17-0:32 (15 s); sh3 0:05-0:19 (14 s) and 0:21-0:29; sh4 0:18-0:33 (15 s) and 0:39-0:48; sh5 0:00-0:09 and 0:15-0:22; sh6 0:02-0:08.5.
- **Rule now in `talking-head/moments/common.js`** (every moment of this project, full + shorts): a film-only cutaway (L9) longer than 6 s keeps ~3 s full frame (cut on a word start), then her picture comes back: 16:9 her circle over the same film (L11), 9:16 half and half (film on top, 1130 px; her below). `keepAlone: true` on a TH.cutaway call opts out. Audit after: no stretch without her longer than ~6 s except L10 cards and L6 cut-outs (she is in those).
- Engine bug (her picture at a later box's place, claude-rule 1:37-1:47): fix present in `studio/tools/composite.mjs` (per-branch sendcmds); every current export was made after it (2026-10-13 19:05+). The stills tool does not exercise that path: confirm on the re-export's contact sheet.
- Stills: carousels + 16 thumbnails re-rendered and hard-linked into ~/Downloads/claude-rule-carousels/ and claude-rule-thumbnails/.
- **Needs re-export** (not run: disk ~2.8 GB): motion film (16x9 + 9x16), talking-head full (both), every short. See `projects/EXPORT-HANDOFF.md`.

## Re-export after content pass (EXPORT agent, 2026-10-14 11:52-12:03)
All in `outputs/` replaced in place and hard-linked (same inode checked) into `~/Downloads/claude-rule/` (film),
`~/Downloads/claude-rule/talking-head/`, `~/Downloads/claude-rule/shorts/`.
- talking-head full 16x9 (her captions on, contrast box measured) + 9x16: 4:21.8, -14.1 LUFS, TP -1.8 / -1.7 dBTP.
- shorts sh1-sh6 (9x16): 0:34.3, 0:42.0, 0:42.7, 1:03.6, 0:43.6, 0:31.4; -14.0/-14.1 LUFS, TP -1.6..-1.9.
- motion film 16x9 + 9x16: 4:28.7, -14.2 LUFS, TP -1.4 dBTP (stems checked fresh: cue key 7059f61e = meta).
- **Fix made**: full 16:9 2:19-2:32 (the plank / slope, L11 + the split cutaway) her circle covered the film's "TOOL" label:
  circle there is now 170 px (`full.js` `d`, `cornerD`; `common.js` passes `cornerD` to the corner cam). Full 16x9 re-exported.

| id | result | note |
|---|---|---|
| her-words | pass | OCR (tesseract) every 2-3 s of all 10 files: 0 "illustration" / disclaimer hits (old film: 33) |
| no-collisions | fixed | circle vs "TOOL" label 2:19-2:32 (16:9); contact sheets of all files looked at |
| frame-sheet | pass | contact sheets 1/15 s (edits), 1/3 s (shorts), 1/10 s (films); her picture in its box on boxed stretches |
| footage-present | pass | no stretch without her > ~6 s in edits / shorts (texture scan every 0.5 s + strips; only flag 2:21-2:29 = her circle, present) |
| captions | pass | 16:9 full: her captions on, readable; step aside on film cutaways / corner cam by design |
| loudness | pass | all -14.0..-14.2 LUFS, TP <= -1.4 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, h264 yuv420p + AAC |
| stems-fresh | pass | cue key = meta |
| delivered | pass | hard links, inode match |

## Refined kit restructured (KIT EDITOR, 2026-10-14)
- `kit/refined-kit.md` now follows the fixed structure (At a glance, 1 YouTube, 2 Thumbnails, 3 Shorts, 4 Teaser, 5 Carousels, 6 Long-form posts, 7 Research and sources); the old version is `kit/refined-kit.v1.md`. Chapters replaced by **4 parts** timed to `outputs/talking-head/talkinghead-full_16x9.mp4` (0:00, 1:15, 1:57, 2:59; film 0:00, 1:16, 1:58, 3:01). Shorts re-mapped to the 6 built files with YouTube Shorts titles, descriptions and 12-13 tags each. Recommended: T6 "Is It Okay to Be Mean to AI? Anthropic's New Rule" + thumbnail 22 (swap to 02 on 12 Nov); 21/22 no longer paired with "Claude Can End Your Chat…". Teaser post text written; the teaser file is still being built.


## Teaser for LinkedIn and X (TEASER agent, 2026-10-14)
| Item | State |
|---|---|
| Teaser (LinkedIn and X) | **Exported 2026-10-14**: `outputs/teaser/teaser-claude-rule_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:33.8 each, -14.0 LUFS, true peak <= -1.9 dBTP; hard-linked in `~/Downloads/claude-rule/teaser/`. Editor http://localhost:7700/moment/claude-rule/teaser/ (16:9, 1:1, 4:5, 9:16; 9:16 not exported). Bites, order and look in `talking-head/teaser/teaser.js` + `talking-head.json` "teaser". Look: The Thread (lilac, ink chat bubbles): opens on her face with the topic in a big ink bubble ("Anthropic's new rule: don't be cruel to Claude"), "new video" pill, film chat inserts typed in step with her words, end card as a chat thread (title, "Full video on YouTube", @WithGbemi). No countdown (no silent stretch in the recording). Music: Mixkit 282 (rises; opens up on the end card). Fresh critic: 6 -> 7.5 (round 2); the two round-2 fixes it named (slope insert centred and scaled, the blank first second of the attributes insert) were made and checked on stills, not re-scored. Spec: `inspiration/know-how/TEASER-PLAYBOOK.md`. |

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
| editable | pass | /moment/claude-rule/teaser/ opens (headless check, all four sizes offered) |
| delivered | pass | hard links in ~/Downloads/claude-rule/teaser/ (same inode) |
| sync | n/a | cues placed by the layouts / bite starts; not run through soundqa.py |

## Raw video removed (2026-10-15)
She posted this video and asked to delete the raw recording to free space; it was moved to the Bin (~/.Trash/posted-raw-videos-2026-10-15/). Film, edits, exports, thumbnails and carousels remain; talking-head/shorts can no longer be re-exported from the 4K source.

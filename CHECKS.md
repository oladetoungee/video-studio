# Named checks (every deliverable reports them)

Every agent that hands over a deliverable (film, film export, talking-head moment, thumbnails, carousel) reports **every
check that applies** to it, in a table in its hand-off and in `projects/<slug>/STATUS.md`:

| id | result | note |
|---|---|---|
| text-contrast | pass | `render.mjs contrast`: 0 failures |
| sync | fixed | f2313 impact moved +3 f (soundqa first peak -105 ms -> +8 ms) |
| loudness | n/a | stills only, no sound |

`result` is **pass**, **fixed** (note says what changed) or **n/a** (note says why). A missing check means the deliverable is
not done. The main session refuses a hand-off without the table. (Pattern from the Mortiflix harness, which refuses a
submission that leaves a check out; see `inspiration/know-how/WORKFLOW-UPGRADES.md`.)

**The list grows.** When Gbemi (or the main session) finds an error that no check caught, add a check here the same session
(next free id, date, the error that started it) and run it on every future deliverable. A taste note does not become a
check: it goes into CLAUDE.md "Her taste" / THUMBNAILS.md and FEEDBACK.md.

Applies to: **F** motion film · **M** talking-head moment · **T** thumbnails · **C** carousels.

## Words and meaning
| id | applies | how it is checked | target |
|---|---|---|---|
| her-words | F M T C | every on-screen quote, caption and claim checked against `kit/transcripts/transcript.srt` and the sources in BRIEF.md; names spelled right | 0 invented words, quotes or data; mockups generic (no "ILLUSTRATION" stamps, no invented quotes from real people or companies) |
| stands-alone | T C (+ clip captions) | read cold: would a stranger scrolling past understand it in a second? (CLAUDE.md "Every piece stands alone", THUMBNAILS.md rule 0/1) | no phrase lifted from the script on a thumbnail |
| titles-paired | T | 2-3 titles per thumbnail, main keyword in the first 40 characters, 40-60 characters (refined-kit.md) | all thumbnails |
| no-dashes-no-hype | T C, captions | no em dashes, no hype words, full sentences | 0 |

## Picture
| id | applies | how | target |
|---|---|---|---|
| text-safe-area | F M T C | portrait content inside `SAFE.contentTop..contentBottom` (370..1440), captions own 1460..1660; landscape text >= 5 % inside each edge (96 / 54 px); carousels: `build.mjs` margin check | 0 outside |
| no-collisions | F M T C | contact sheets at end / mid of every scene, both aspects; carousels `build.mjs`; photos never touch text | 0 |
| text-contrast | F C T | `render.mjs contrast <slug>` (3:1 text >= 24 px, 4.5:1 below, both light / dark modes); design editor warning (3:1) | 0 failures |
| type-size | F M C | mono labels >= 32 px at 1080 wide; no single word alone on a last line (`build.mjs` for carousels) | 0 |
| reading-time | F M | text on screen >= words/3 + 1 s after it lands (and >= `MOTION.hold`); `lab.mjs audit` "reading time": text still >= 8 frames before it moves again | 0 |
| frame-sheet | F M | look at `lab.mjs contact` / `render.mjs sheet` (1 frame per second or every 12th frame); `ffmpeg blackdetect=d=0.05:pix_th=0.10` and `freezedetect=n=0.001:d=1.5` on the export | no black, flash or frozen frames |
| no-blank-cuts | F | `lab.mjs board`: frames +1..+5 after each cut keep >= 30 % of the settled shot's detail; no flash | 0 flags, or each one a choice written in the board |
| transitions-carried | F | `film/data/transitions.json`: every cut has a carrier, a why (>= 20 characters) and a landing word | all cuts |
| banned-list | F M T C | none of CLAUDE.md "Banned"; no corner HUD; flat grounds only | 0 |
| unique-look | F T | not a previous project's look (CLAUDE.md "Every video gets its own look"; thumbnails never start from a previous project) | yes |
| small-size | T | thumbnail read at 168x94 and 320x180 | text readable, face readable |

## Motion
| id | applies | how | target |
|---|---|---|---|
| motion-craft | F M | `lab.mjs speed` per new kind of move: no "dead stop" (lands soft), no unintended "linear move", moves >= 0.3 s ("short move" only for deliberate exits); `lab.mjs onion` on each hero move (ghosts bunch up at the end) | 0 unexplained flags |
| dead-holds | F M | `lab.mjs audit` "dead hold": nothing visibly changes for > 4 s | 0 |
| expects | F | `lab.mjs audit`: every `MOTION.expect()` the scenes register passes | 0 fails |
| determinism | F | render the same frames twice (`render.mjs hashes` twice): identical; after any runtime change, approved films unchanged (`render.mjs hashes` against `film/build/hashes/`) | 0 diffs |

## Sound
| id | applies | how | target |
|---|---|---|---|
| sync | F M | `lab.mjs audit` "sound sync" (cue frame vs where the picture changes, +-1 frame; "soft visual" = no single hit frame, choose a softer sound) and `soundqa.py` timing (each hit's FIRST peak within one frame after its visual frame; the first peak is the loudest) | unexplained offsets 0 |
| hits-audible | F M | `soundqa.py` over_bed: each hit's first 60 ms (K-weighted) against music alone >= +6 dB and against voice + music not under -10 dB | 0 under, impacts especially |
| music-under-voice | F M | `soundqa.py` music_under_voice: voice over music while she speaks | 12-18 dB |
| loudness | F M | `soundqa.py` aac / export: -14 LUFS +-1; true peak <= -1 dBTP measured AFTER the AAC encode | yes |
| phone-band | F M | `soundqa.py` phone_band: 200 Hz-6 kHz loudness within 3 dB of the full band; < 10 % of energy under 60 Hz | yes |
| dc-offset | F M | `soundqa.py` dc_dbfs | below -60 dBFS |
| stems-fresh | F | `soundqa.py` first line: stems' cue key = meta.json's (else re-mix the sound first) | up to date |

## Files
| id | applies | how | target |
|---|---|---|---|
| format | F M | ffprobe: 1920x1080 / 1080x1920 (4:5 1080x1350), constant 30 fps, H.264 yuv420p BT.709 + AAC; length matches the range | yes |
| editable | F M T C | it opens in the studio editor (http://localhost:7700) and the export from there gives the same file | yes |
| delivered | F M T C | a copy in her Downloads; the path given to her in plain words | yes |

## Added from her feedback (newest last)
| id | added | error that started it | how |
|---|---|---|---|
| caption-gaps | 2026-10-15 | database-indexes full: no caption over film cutaways / corner cams / long keyword holds | contact sheet every 2 s of a talking-head export: no stretch > 4 s where she speaks and neither a caption nor a keyword is on screen (cards excepted) |
| keyword-overlap | 2026-10-15 | two L8 keywords drawn at once ("put EXPLAIN" over "is it used?") | engine trims the earlier keyword; check stills at each keyword start |
| film-title-in-panel | 2026-10-15 | the film's title cut off at the top of an L5 half | still at each half's title word: the film's top line fully inside the panel |
| editors-load | 2026-10-15 | an engine edit deleted TH.corner: the full edit stuck on "Loading..." ("TH.corner is not a function") | after ANY change in studio/runtime: `composite.mjs stills` for full, one short and the teaser of every project with footage, 16:9 and 9:16; all must write a frame |
| moved-files | 2026-10-16 | thumbnail sets archived (outputs/thumbnails -> archive-v1) while talking-head.json "images" still pointed at them: every moment of ux-research stopped loading ("image ... did not load") | before moving or archiving ANY output file, grep the project (talking-head.json, content.json, film.json) for its path and repoint; then run editors-load. The runtime now leaves a missing picture out instead of failing |
| caption-over-graphic | 2026-10-18 | shorts: captions sat on top of the film graphic and hid it, with free space elsewhere | on the contact sheet of every short, look at each frame with a graphic: does the caption cover part of it? If yes and a free place exists (over her, the divider, a band above/below the graphic), move it there (per-segment caption height, or `capYNow`) |
| overlap-select | 2026-10-18 | an element she wanted to hide sat under another one's click box: never selectable, went out in 7 posted shorts | in the editor, every element must be reachable: clicking the same spot again cycles through the elements under it (canvasedit.js). When building, never place one text element under another's box |
| export-vs-intent | 2026-10-18 | she believed an element was removed; the export showed it | before handing over or when she says she edited a batch: contact-sheet the exports (first 4 s + every 5 s) and list every text overlay visible; anything she said she removed must be absent; if an element repeats across many pieces and she hid it in most, ask about the rest |
| short-zoom | 2026-10-26 | shorts: "my head is literally filling the whole screen… you can already know it wasn't originally made to be short form" (her face was ~39 % of the 9:16 height: a 1215x2160 slice of her close 16:9 shot) | `composite.mjs check <man> <short> --aspect 9x16` prints `shortZoom` {frame, median, max}: her face height / 1920 on her own footage (cards and film scenes left out) between **0.15 and 0.30** (median). Fix with a shorts framing (`frame9`: 4x5, 3x4, 1x1, 4x5band; studio editor "How much of her the short shows"). Measured on october-attacks short 01: fill 0.39, wide 0.32, 3x4 0.30, 4x5 0.28, 1x1 0.22. **2026-11-12** (her: "you add a zoom effect by yourselves... let it just be once in a while"): full-screen formats (frame9 `fill`, H I K M) are accepted up to a median of 0.36; `shortZoom.zooms` lists camera zooms on her (z more than 6 % over that layout's usual z: push-ins, punch-ins, mid / close frames) and the check FAILS on more than 1 per short, or any in a short under 30 s; `over` lists samples above 0.36 (her own leaning in at z 1 is accepted, a zoom is not). Every short hand-off reports frame, median, max and the zoom count. Try a framing without saving it: `--frame9 wide`. G (letterbox, ~0.10) and cut-out formats (C, J: median 0, not measured) fail on purpose; say so. |
| layout-variety | 2026-10-26 | "whenever you want to put me on the screen with graphics, you put me in that circle thing… there are so many different methods" | `composite.mjs check <man> full` prints `layoutVariety` {share per face + graphic layout: L5 half, L6 sticker, L11 corner, L14 split, L15 tile, L16 page, L17 presenter, L18 room, L19 ots}: no single one over **40 %** of the face + graphic time, and the circle (L11) never the most used. Never set `TH.look.corner` / L11 as the default way to show her with a graphic |
| clean-ends | 2026-10-26 | october-attacks shorts v1: 14 of 16 ended on the first word of the next sentence ("now there", "so basically"): whisper word times abut, so "last word end + 0.28 s" ran into the next word | for every short / teaser bite: the out point is before the next word's start (`out < next.t - 0.03`); read the last caption of each `.srt`: it must end on the sentence's last word |
| window-graphic | 2026-10-26 | a project helper moved its graphic "below the shorts label" using local coordinates inside an L19 window: the window showed an empty box | any graphic drawn inside a window / tile: look at a still of every L15 / L19 segment in 9:16; the window is never > 85 % one flat colour |
| label-over-graphic | 2026-10-26 | october-attacks shorts: side-stack items ("I write Laravel") and full-frame film cards sat at the top of the 9:16 frame, under the white top label | `composite.mjs check <man> <short> --aspect 9x16` prints `labelOverGraphic` {labelBottom, hits}: no registered text / box inside the label band; film panels in shorts go on the top panel that starts below the label (`TH.half` side top) and a still of each film insert is looked at |
| insert-sync | 2026-10-26 | october-attacks full edit: film inserts pushed ahead with `film.offset` (2.5-4 s) showed things before she said them (the OpenCode usage alerts while she was still on "broke into an older system"); her words: "what I was saying in that moment was not in line with what is on the screen" | `composite.mjs check` prints `insertSync` {ahead: [segment, seconds ahead, at, [scene shown, scene she is on]]}: no film inside a segment more than 0.3 s ahead of the film time of the words she is saying, never a later scene. No `film.offset` to fill an empty panel: start the segment later instead. Teaser inserts (`scene` + `from`): from = the film time of the insert's first word minus the scene start, and `film: {scene}` so it never runs into the next scene |
| text-collision | 2026-10-26 | october-attacks 3/4 card: "of the websites in the world" wrapped onto the source line under it | `composite.mjs check` prints `textCollision` {hits: [t, text A, text B]}: no two visible graphic texts overlapping by more than 12 % of the smaller; cards lay out bottom-up (source line, then the wrapped line(s), then the big number) |
| text-collision | 2026-10-26 | october-attacks film: a small mono label ("THIS MONTH ON THE INTERNET" / "2026") sat behind the giant OCTOBER; a tag ran off the frame | `node studio/tools/textcollide.mjs <slug>` (every 0.2 s, 16:9 + 9:16): 0 text-on-text overlaps (> 6 px both ways), 0 texts touching a film's raw calendar digits / weekday row / top rule with less than 6 px of air (films register those with `qaBox()` / `qaTxt()`, QA only, never in the editor) and 0 editable texts cut at the frame edge, except a camera move written as a choice; report in `film/build/qa/textcollide_<aspect>.json` |

| `sfx-audible` (2026-10-26) | Talking-head edits, shorts, teasers: render the stems (`composite.mjs sound … --tracks voice,sfx`) and measure each sound effect's peak against her voice in the same 300 ms. Median within -4..+2 dB at her slider settings, no more than 10 % below -12 dB. Her note: "I can't hear the sound effect at all" (cues sat ~9 dB under her voice). Fix with `audio.sfx.gainDb` in talking-head.json. |

- **glyph-collision** (2026-11-06, http-status-codes design): zoom every display font at 200 % on her name, @handle and headlines; letter shapes that merge or read as another word fail (Funnel Display made "Gbemi" read "G.bemi").

### Added 2026-11-16 (overnight)
| id | applies | what + how |
|---|---|---|
| chin-fitted | M (teasers, 1:1 + 4:5) | 2026-11-16: `composite.mjs check` compared caption boxes (frame px) with her face (9:16 layout px), so captions on her mouth in 1:1/4:5 window shots went unseen. Run `node studio/tools/chincheck.mjs <slug> teaser 1x1` and `4x5`: 0 hits (her chin = 0.88 of the face box). |
| caption-accuracy | M (every edit, short, teaser) | 2026-11-19: she found 5 wrong captions in one video ("vibe" missing, "U", "ids" for "hides"...). Re-transcribe the EXPORTED sound with a stronger model (whisper medium or large, not small.en), diff it word by word against the captions, read every diff and every odd word in context; fix all; list what changed. 0 open diffs. Also (learn-to-code 11-19): (1) a caption word whose whisper start sits in a silence the edit trimmed is DROPPED by the engine ("maybe the [model] that", "in software [development]"): list words outside every kept clip and move them onto her voice; (2) every moment / bite edge must sit in silence (RMS < -45 dB at the clip edge, voice16k.wav): edges inside a word left "Ma-", "And", half a "So maybe"; (3) a doubtful word is checked on a short clip around it with the stronger model AND small.en; a plural "s" the models disagree on is left alone; her own correction wins. Tool model: ~/.cache/whisper/ggml-large-v3-turbo.bin. |
| clip-edges | M (shorts, teasers) | 2026-11-20: 166 short/teaser edges sat 0.05-0.15 s late, on the first sound of a word (shorts began on "Other dark pattern", ended on "A-"). Every edge must sit in silence (voice under -45 dB on voice16k.wav) with the snap applied; tools in studio/tools/captioncheck/ (pass.sh, momdiff.py, snap.py, setedge.py). |
| typed-line-breaks | M (covers, titles, labels, tags) | 2026-11-16: her Shift+Enter was ignored by several small drawers (tags, poster sub-lines, cover second lines). Run `node studio/tools/breaktest.mjs <slug>`: every cover/label/title changes when a break is typed (mock-up text inside graphics excepted). |

## Visual-not-text check (2026-11-07)
For every graphic in the edit: (a) does it repeat her sentence as text? cut it. (b) does it need something she says later? move or replace it. (c) does it repeat a label already in a screenshot? remove. (d) is it a bordered form/box/old-website UI? replace with an image, person, object or animation. (e) count on-screen words per minute: target under ~40 outside captions. Report the count before/after.
(f) screenshots: shown big (~70-80 % of frame width, highlighted line readable at 1080p) or dropped; no credit line repeating what the screenshot shows. (g) no small photo/graphic floating in a big empty panel: fill the panel (full-bleed + slow push). (h) panels show their content within ~0.4 s of arriving. (i) captions break at sentence ends (shared footage.js since 2026-11-07).

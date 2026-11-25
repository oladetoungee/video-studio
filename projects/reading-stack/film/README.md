# Reading Stack: the motion film (v3)

A motion-graphics YouTube explainer on her own narration: how to read properly and actually remember what you
read. The idea is to study a book's structure (contents, chapters, sub-headings) first, so every idea has "a
shelf". It is demonstrated on *How to Read and Write Critically* (Alex Baratta) and *Convivial Toolbox* (Liz Sanders &
Pieter Jan Stappers).

**v3 (Oct 2026), the content pass.** Her note on v2 was "we need more visuals" and "give it sound". v3 keeps the v2 design
system but fills the frames with substance:
- real book imagery cut from her footage (book only, flipped so the text reads);
- honest diagrams;
- recurring objects;
- a composed 9:16;
- a new, audible sound design.

The plan, per section, is `CONTENT_PASS.md`. Scene ids are unchanged, and `edits.json` is empty.

This folder is a studio project: open it in the studio (`Start Studio.command`) to play, edit, switch 16:9 / 9:16 / 4:5
and export. The engine lives in `../../../studio/` (see `studio/README.md`).

| Deliverable | File |
|---|---|
| Video 16:9, 1920×1080, 30 fps, H.264 + AAC, 15:59 (959.03 s) | `../outputs/video/reading-stack_motion_16x9_v3.mp4` |
| Video 9:16, 1080×1920, same audio | `../outputs/video/reading-stack_motion_9x16_v3.mp4` |
| Captions (video time, 1.8 s title offset) | `../outputs/video/reading-stack_motion_16x9_v3.srt` (= `data/captions.srt`) |
| v2 → v3 still pairs | `stills/v3_before_after/` |
| Content plan (v3) / design plan (v2) | `CONTENT_PASS.md` / `PLAN.md` |
| v2 (kept for comparison) | `../outputs/video/reading-stack_motion_16x9_v2.mp4` |

## What v3 adds
- **Real objects:**
  - The three spines of her stack (raw 0:15) drop into a stack at the title, the end card and "your turn".
  - The Baratta and Convivial spines slide out of the stack and become their covers.
  - The Marple cover (raw 0:58.5).
  - The two covers fan in as she names them.
  - These come from `tools/realframes.py` (assets `spine_*.png`, `cover_marple.jpg`, `book_*.jpg`).
- **Diagrams of what she says:**
  - a calendar that fills;
  - a crosshair that can't lock on, then does;
  - a contents card that opens out of a book;
  - a 1940 → now timeline;
  - a heading map that thickens;
  - pigeonholes;
  - a chapter ruler with idea cards piling up;
  - shelves that ideas slot into;
  - the 10-block chapter map (fills, merges 05-07 into STRUCTURE, gets "?" on every block);
  - a Venn of thinking / writing / reading;
  - a parts bar (80 / 50 / 140+ pages, her numbers);
  - a crowd (everybody / nobody / a select few);
  - a gap and a bridge.
- **Motion vocabulary:**
  - masked text rise with a short trail;
  - highlighter sweeps that follow her voice;
  - wipes into the blue punchlines;
  - counters;
  - shared-element handoffs;
  - a slow log-space camera push.
- **Honesty:**
  - Illustrative meters and cards are labelled "Illustration".
  - Dictionary cards are left blank.
  - The dedication shows "Ivan *something.*" (her words).
  - Contents rows are the real Convivial / Baratta titles she reads.
- The title card is now **1.8 s** (was 3 s), so v3 time = v2 time − 1.2 s. `captions.srt` was shifted and `tools/words.py` updated.
- New film tools:
  - `tools/realframes.py` (real imagery);
  - `tools/holds.mjs` (measures holds > 4 s, dark spans and near-empty frames in both aspects, with the camera push off).
- Engine:
  - `studio/runtime/house.js` gained an additive block: `smear`, `KR`, `flood`, `imgCard`, `counter`, `spineBlock`, `phoneFrame`, `bubble`, `pushCam`. 16:9 hashes of other films were checked unchanged.
  - `core.js` and `boot.js` are untouched.
  - Film-only helpers are in `scenes/kit.js`.

## Style
See `PLAN.md` for the full design system and scene vocabulary.

- **Grounds (flat):**
  - paper `#EDE9E2`
  - ink `#111114`
  - card `#FFFDF6`
  - full-bleed electric blue `#1B3FD8` for punchlines
- **Accent:** one per scene, blue. Safety orange `#FF4713` appears three times ("STRUCTURE", "1940", "!").
- **Type:**
  - Bricolage Grotesque 800 for display.
  - Archivo 700 for sentences.
  - DM Mono for labels and corners.
  - Instrument Serif italic for one accent word, with a hand underline.
- **Never used:** gradients, glows, particles, textures or shadows.
- **Motion:**
  - Every phrase appears on the word she says it (whisper word timings on the edited track), snapping from blur to sharp.
  - A change of ground is a hard cut; a change on the same ground is a whip.
  - Cards slide in, text types on and the cursor clicks.

To change a choice later:
- The display face is `F.disp` and the palette `C` / `G` in `studio/runtime/house.js` (shared by every film).
- The top-right mark is `"hud"` in `film.json` (drawn by `hud()` in `house.js`).

## Where things live
- `film.json`: the manifest (scripts, data, images, audio choices: music medley, SFX roles, levels).
- `scenes/kit.js` (v3 film helpers: real stack, shelves, sweeps, wipes, sound helpers, cue pruning), `scenes/scenes1.js` to `scenes3.js`: the 78 scenes, each with a stable `id`; `scenes/film.js`: `buildFilm()`.
  Every position is `V(landscape, portrait)`; the 9:16 layouts are recomposed per scene.
- `data/`: `words.json` (word timings on the edited voice), `captions.srt`, `cutlist.json`, `meta.json` (generated).
- `audio/voice_edit.flac` (her edited voice), `audio/sfx/` (Mixkit SFX + the keystroke bank). The music is in `../../../library/music/`.
- `edits.json` + `versions/`: her edits from the studio (start: none, the approved film).
- `build/stems/`: generated audio stems for the preview and exports.
- `tools/`: film-only scripts (below). The old standalone engine (`src/`, `render.mjs`, `mix.py`) is in `../archive/v2-standalone-engine/`.

Every beat is pinned to a spoken phrase (`P()`), so if the voice edit changes, the visuals follow.

## How to re-render
Open the studio and use **Export** (whole film, a screen, a line, a range or a frame). From a terminal, at the workspace root:
```sh
node studio/tools/render.mjs meta reading-stack            # scene list + SFX cues -> data/meta.json (render check in 16:9 and 9:16)
python3 studio/tools/stems.py reading-stack                # voice + ducked music + SFX -> build/stems/ (-14 LUFS master gain)
node studio/tools/render.mjs export reading-stack --what film --aspect 16x9          # -> outputs/video/
node studio/tools/render.mjs export reading-stack --what scene --scene 23 --aspect 9x16 --captions
node studio/tools/render.mjs sheet reading-stack --aspect 9x16           # -> film/build/sheet_9x16.jpg
```
Film-only tools (run from this folder):
```sh
python3 tools/edit_voice.py   # ../kit/transcripts/voice.m4a -> audio/voice_edit.flac + data/cutlist.json (+ film.json voiceDuration)
python3 tools/words.py        # whisper DTW output -> data/words.json + data/captions.srt (needs build/edit_dtw.json, see the script)
python3 tools/realframes.py   # v3 real imagery: spines + Marple cover from the raw file, sharpened covers
node tools/holds.mjs          # holds > 4 s, dark spans, near-empty frames (both aspects) -> build/holds.json
python3 tools/covers.py       # book-cover inserts from ../kit/raw-video.mov (already in assets/)
python3 tools/keys.py         # keystroke bank for typing SFX (already in audio/sfx/keys/)
python3 tools/levels.py       # measure the stems: voice vs music vs SFX
python3 tools/contact.py <dir> <out>   # contact sheets from stills
```
Rendering runs at about 150-250 frames per second; frames are piped straight into ffmpeg, no image sequence on disk.

## Book-cover inserts
`tools/covers.py` takes one frame of her raw footage (`../kit/raw-video.mov`), flips it
back (the camera recorded mirrored), and warps the four corners of the cover onto a flat rectangle. The crop
can only contain the book, never her face; her fingers holding the book are visible.
- *How to Read and Write Critically* comes from 5:12 of the raw file.
- *Convivial Toolbox* comes from 11:46 of the raw file.
- A halftone treatment was tried and dropped because it greyed out the recognisable covers.
- v3 (`tools/realframes.py`) adds the following, by the same flip-and-warp method:
  - the three spines from 0:15, saved as `assets/spine_*.png`;
  - the Miss Marple cover from 0:58.5, saved as `assets/cover_marple.jpg`;
  - sharpened Baratta and Convivial crops, saved as `assets/book_*.jpg`.
- Adler's *How to Read a Book* stays type-only (labelled "Illustration").

## Her audio
Unchanged from v1 (`data/cutlist.json`, `tools/edit_voice.py`, which now reads `../kit/transcripts/voice.m4a` and reproduces the same edit sample for sample). The original 17:58 recording was edited to
**15:51** (951.2 s):
- About 29 s of retakes and slips removed: dead air, "Miss Marple's Final Cases. Scratch that.", a contents false start,
  "critical thinking, how every-", and "page one,".
- 93 long pauses tightened, removing 98 s.
- Every cut sits in silence and is joined with a 35 ms crossfade.
- The voice gets a 75 Hz high-pass, 3:1 compression and a light de-esser.

See v1's README for the full cut table and caption corrections.

## Music
The same Mixkit medley as v1, each track levelled to the same loudness (Mixkit Stock Music Free License: YouTube use is allowed, no
attribution required):
- Sleepy Cat
- Lo-Fi 04
- A Blue Day
- Digital Clouds
- Sweet September
- Relaxation 04
- Serene View
- Thinking About You

The music is ducked by an envelope driven by the voice: about 15 dB under speech, rising in pauses, and at full level for
the title and end cards.

## Sound effects (v3)
v3 replaces the v2 cue set with a louder, more varied social-video sound bed. It uses the Mixkit Sound Effects Free License,
with files from `../../../library/sounds/` (read-only) and `audio/sfx/`.
- There are **279 cues** (v2 had 168). Each sits on its measured peak (`align: peak`) at the visual frame.
- `scenes/kit.js` overrides `SFX_PRI` / `SFX_GAP` so busy patches thin out: impacts need 4 s of air, pops 2.6 s and pens 2.2 s.

Levels are measured by `tools/levels.py` as the median 100 ms peak per role, alongside the music at the same moment. Voice speech median: −17.9.

| Role | On screen | Files | n | SFX | vs music | vs voice |
|---|---|---|---|---|---|---|
| type | text typing on | keystroke bank (`tools/keys.py`) | 10 | −22.5 | +5.6 | −4.6 |
| pen | underlines, strikes, marker sweeps | marker-line, pencil-short/fast, scribble | 29 | −21.4 | +5.1 | −3.5 |
| page | pages, book opening, page turns | page-turn-single/big, paper-slide | 8 | −22.3 | +6.6 | −4.4 |
| book | spines and books landing | punch-soft-quick, hit-weak | 19 | −20.4 | +7.3 | −2.5 |
| pop | things landing, bubbles, figures | pop-dry, explainer-pop-whoosh, pop-hard-click, mk2357 | 42 | −21.8 | +5.8 | −3.9 |
| click | cursor presses, chips | mk2568, click-classic, mk3124 | 23 | −20.0 | +6.7 | −2.1 |
| card | cards sliding in | card-place, paper-quick-move, card-flick | 19 | −22.0 | +4.5 | −4.1 |
| whoosh | moves, wipes | whoosh-small/short-sweep, mk164, mk3115 | 44 | −22.3 | +3.8 | −4.4 |
| cut | section cuts | whoosh files | 41 | −22.3 | +3.5 | −4.4 |
| impact | core ideas only | mk1143 | 33 | −23.6 | +4.1 | −5.7 |
| riser | into the six key statements (window includes the impact) | mk790, mk1492 | 6 | −17.2 | +10.5 | +0.7 |
| tick | list rows | tap-small-hit, click-box-check | 5 | −21.8 | +2.8 | −3.9 |

The music bed is unchanged. It sits about 11.5 dB under the voice in speech (voice −17.9 vs music −29.4 in speech windows),
rises to −26.7 in pauses, and reaches −20.4 under the title card.

## Loudness (final files)
Measured with ffmpeg `ebur128=peak=true` on `../outputs/video/reading-stack_motion_16x9_v3.mp4`. The 9:16 file has the same audio.
- **Integrated: −14.0 LUFS**
- **True peak: −1.7 dBTP**
- Loudness range: 4.6 LU

## Verification (final files, both aspects)
- **Duration:** 959.033 s; video 28,771 frames at 30 fps; AAC 959.033 s.
- **blackdetect** (`pix_th=0.10`, 0.3 s):
  - No true black.
  - The ink-ground frames holding only small type register as "black": 16 spans in 16:9 and 18 in 9:16.
  - The longest is 2.1 s, at 615.8 (the "my guess" counter on ink).
- **freezedetect** (`n=0.001`, 6 s): **none** in either aspect (v2 had 14 holds of 6-8.4 s).
- **`tools/holds.mjs`** (camera push off):
  - 0 holds > 4 s and 0 dark spans > 2 s in both aspects.
  - The longest near-empty span is 1.2 s: the recap start and the "Before you read the book," rise.
- **Stills:** 12 per aspect taken from the encoded files and checked by eye.
- **Contact sheets:** `build/sheet_16x9.jpg`, `build/sheet_9x16.jpg`.

## Known weaknesses
- **Nothing was listened to.** The SFX and their levels were set by measurement only. Please listen, especially to:
  - the 33 impacts;
  - the density of pops and whooshes;
  - the risers.
- **The real spines are soft.** They are cut from a 1080p frame of the stack at 0:15, so their text is not readable at large sizes.
- **Same-ground cuts use the house 0.26 s whip,** which blends two frames for a moment (core engine, left unchanged).
- **The fresh critic scored v3 below the 8/10 bar:**
  - Rounds: 6 → 6.5 → 7 → 6.8.
  - The round-4 fixes are applied but not re-scored.
  - Remaining notes: 9:16 is sparser than 16:9 in places (e.g. 690, 839), many layouts are still headline-left / object-right, and the 9:16 contents pages use 17-20 px text.
- **Illustration, not the books:**
  - meters (labelled);
  - generic video, pins and phone cards;
  - idea cards;
  - the to-do card.
- **The Convivial "Part 1 · Basics" row** is taken from her words ("part one is kind of like basics"), not read from the page.
- **The Baratta chapter list** is the published order (from v1). It was not re-checked against her footage.
- **Word timing** comes from whisper DTW (±0.15 s).

# Ghana / Marrify: the motion film ("Blink" look)

This is a motion-graphics film on her own narration: Ghana's Marrify, centralised data, and what Estonia taught her. It is a studio project, so open `/edit/ghana-marrify/` in the studio to play it, edit it, switch 16:9 / 9:16 and export. The engine is `../../../studio/`.

The look is her pick, **A "Blink" plus B's real-source scenes**. See `stills/directions/README.md` and `../inspiration/STYLE_STUDY.md`. The v1 deck-style scenes were turned down and are archived in `../archive/film-v1/`.

| Deliverable | File |
|---|---|
| Film 16:9, 1920×1080, 30 fps, H.264 + AAC, 5:02.7 | `../outputs/video/ghana-marrify_motion_16x9.mp4` (+ `.srt`) |
| Film 9:16, 1080×1920, recomposed (not cropped), same audio | `../outputs/video/ghana-marrify_motion_9x16.mp4` (+ `.srt`) |
| Checkpoint stills (studio port vs direction A) | `stills/blink-checkpoint/` |

## The look (`scenes/blink.js`, a kit shared with the talking-head moments)
- **Ground:** one clear white world, `#F4F4F4`. Colour lives in the characters, not in the ground.
- **Records as characters with eyes:** certificate, folder, envelope, stamp, gazette, register, ID card, shop, court.
  - Blinks close in 0.05 s and open in 0.09 s.
  - Pupils dart toward the new thing.
  - Lids close to a line. Happy eyes appear on good news.
  - In the serious beats, eyes look down; there are no eye gags there.
- **Searchers:** grey faces with typographic eyes that swap hard (`o o` / `– –` / `> <` / `* *`), with the two eyes one frame apart.
- **Crowds:** faces pack in from the edges ("searchable by anyone", "the average individual").
- **Type:**
  - Headlines are Instrument Sans 600, sentence case, top-centre, with one coloured word.
  - Captions and credits are Geist Mono.
  - Headline entrances rotate between a blur rise, a pop and a hard cut on her word.
- **Transitions:**
  - Eyelid wipes at the section changes.
  - A pupil dive and iris open into the TechCabal drawback and into the minimal answer.
  - Springy pops with overshoot.
- **Real sources** (`assets/src_*`, from `assets/sources/`), credited "Screenshot · outlet · date":
  - the TechCabal Daily newsletter (8 Sep 2026), highlighted on her words;
  - the Marrify homepage search box only, with faces gathering at it. It is empty, no name is typed, and no record list or "1886" hero is shown;
  - headline crops from Graphic Online, Technext and ITWeb (no bylines or photos).
- **Diagrams** are labelled ILLUSTRATION or "Diagram: placeholder fields, no real records". This covers the column-lock fold for data minimisation and the access levels.
- **Her photos** are never flipped:
  - cut-outs `assets/her_cut_*.png` from `design/thumbnails/assets/cut/`;
  - footage frames `assets/her_*.jpg` made by `tools/polaroids.py` (Estonia, "explore further", "in my head").

## Scale + fill pass (2026-10-02)
Gbemi's rule is no empty frames. The global scale lives in `BSCALE` in `scenes/blink.js` (moments can set `BSCALE.on = false`):
- **Headlines:** 16:9 at 96 px or more, lead-ins at 48 px or more; 9:16 at 88 px or more. They auto-wrap to the frame, and `noWrap` shrinks a line to fit instead.
- **Elements:** characters ×1.45, faces ×1.5, her photo ×1.4, bubbles ×1.22, tables ×1.4.
- **Real screenshots:** shown at 1300-1640 px wide in 16:9.
- **Layout:** every scene was re-laid out so its content is centred and fills the frame.
- **Coverage check:** `node tools/holds.mjs --fps 5` also reports the content bounding box, as a fraction of the frame in 16:9 and of the 370-1440 safe area in 9:16.

| Measure | Before | After |
|---|---|---|
| 16:9, samples under target (box at least 55 % wide and 50 % tall), 2 fps | 32.2 % | 16.1 % (5 fps) |
| 16:9, median box (width × height) | 0.66 × 0.66 | 0.76 × 0.74 |
| 9:16, samples under target (at least 60 % of the safe area) | 31.2 % | 17.0 % |
| 9:16, median box (width × height) | 0.74 × 0.75 | 0.81 × 0.81 |

Contact sheets before and after: `stills/scale-pass/`.

## Her voice, words, captions
- **Voice:** `tools/edit_voice.py` turns `../kit/transcripts/voice.m4a` (311.8 s) into `audio/voice_edit.flac` (297.2 s). The cutlist is in `data/cutlist.json`. The film opens on her first word, with `intro` 0.5 s.
- **Words and captions:** `tools/words.py` produces `data/words.json` and `data/captions.srt` from whisper DTW plus the BRIEF.md corrections. This includes her confirmed lines "Ghana just launched" and "And I see Ghana doing something in this direction".
- **Beat map:** `data/beatmap_v1.json` lists her words per screen. It came from the v1 timing and is still valid for the timing.

## Sound
- **Music:** Mixkit (Stock Music Free License). Tracks are 150 "A Blue Day" then 175 "Digital Clouds" (Alejandro Magaña), from `library/music/`.
  - The bed ducks about 12 dB under speech and lifts in pauses.
- **SFX:** Mixkit (Sound Effects Free License), 76 cues. Roles (`film.json`):
  - pop, blink and lid (eyelid wipe whoosh);
  - dive, pen (highlighter), tick and click (column locks);
  - whoosh, impact, crowd, type.
- **Master:** `python3 ../../../studio/tools/stems.py ghana-marrify` gives -14.0 LUFS and -1.9 dBTP. The exports measure the same.

## Engine notes
- `studio/runtime/boot.js` and `footage.js` now load an optional manifest `"fonts"` list. `fonts.css` declares Instrument Sans and Geist Mono, both from `library/fonts`. This is additive: reading-stack's 16:9 and 9:16 hashes are unchanged (150/150 each).
- Film-only helpers live in `scenes/bfilm.js`: the scene wrapper (eyelid wipes, dive, iris, slow push) and the sound roles. The scenes are in `scenes/bscenes1.js` (0:00–1:39) and `bscenes2.js` (1:39–5:03).

## Tools (run from this folder)
```sh
python3 tools/edit_voice.py      # voice edit + cutlist
python3 tools/words.py           # word timings + captions (needs build/edit_dtw.json)
python3 tools/polaroids.py       # her footage frames for the polaroids (never flipped)
node tools/holds.mjs             # holds > 4 s, dark and near-empty spans, both aspects
python3 tools/lockrun.py <cmd>   # run a heavy job under /tmp/gm-render.lock
```

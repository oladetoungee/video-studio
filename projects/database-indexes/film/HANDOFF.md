# database-indexes film + talking-head + shorts: hand-off (FILM agent)

Resume from disk with this file. Look approved by her: **A · Query Plan** (`stills/directions/README.md`), with C's phone book
redrawn in A's line style (composite chapter) and B's "1 new order = 7 writes" drawn flat (cost section).

## Film (done 2026-10-13, critic 8.0 PASS after 3 rounds)
- Voice: `tools/edit_voice.py` -> `audio/voice_edit.flac` (628.9 s from 657.1 s). Cuts in `data/cutlist.json`: 19.5 s of
  silence, her 2:52 slip ("Without an index, you will do way less", cut whole), the garbled Laravel aside, the third "Seq Scan"
  (whisper: "sex scan"), "you only show the first,", "stops at the first,", 6 long pauses.
- Words: whisper small.en + DTW on the edited voice -> `tools/words.py` (BRIEF corrections) -> `data/words.json`, `data/captions.srt`.
- Scenes: `scenes/qp.js` kit (palette + light map, fonts "QP Sans"/"QP Mono" = IBM Plex loaded by the film, strokes, code
  type-on, B-tree node, table, phone-book page, chapter card with the video's plan as a query path, sound roles + per-role
  offsets), `s1.js` open + ch 01-02, `s2.js` ch 03 + add + EXPLAIN, `s3.js` ch 04 types, `s4.js` cost + ch 05 + recap + end.
  55 screens. Scene starts +0.1 s and run 0.16 s ahead for 0.32 s (cuts land on her word, open half-built).
- Sound: no whoosh; music Mixkit 157 Opalescent, 102 Xanthos, 160 Focus on Yourself (looped, ducked); key clicks from
  library keyboard-typing (`tools/keys.py`). Riffle cues dropped (buried under her voice).
- Exports: `outputs/video/database-indexes_motion_{16x9,9x16}.mp4` + `.srt`; copies in `~/Downloads/database-indexes/`.

### CHECKS (film)
| id | result | note |
|---|---|---|
| her-words | pass | captions from her words with BRIEF corrections; 2:52 slip cut; kit-only lines not used as her quote; "10 and 15" left as heard (listen-check for her) |
| text-safe-area | fixed | 9:16 labels moved inside 370..1440 (illustration labels one line at y 1432); 16:9 right edges <= 1850 |
| no-collisions | fixed | critic rounds 1-3 (page labels, recap line, readouts, composite-tip labels) |
| text-contrast | pass | `render.mjs contrast`: 4278 texts, 0 failures (both modes, both aspects) |
| type-size | fixed | 9:16 code/labels >= 28 px (tabs dropped in 9:16) |
| reading-time | pass | audit 10 flags per aspect = KT word boxes + slow push (text never moves after landing; accepted by critic) |
| frame-sheet | pass | sheets both aspects; blackdetect hits = the off-black ground (design), no true black; freezes < 4 s |
| no-blank-cuts | fixed | board 0 blank / flash flags (16:9 + 9:16) |
| transitions-carried | pass | 54 cuts, carrier + why in `data/transitions.json` |
| banned-list | pass | flat off-black + grid, no glow/gradient/particles, no corner HUD; one yellow = query path |
| unique-look | pass | A · Query Plan (not a previous project's look) |
| motion-craft | pass | audit: 0 dead stops, 0 linear, 0 short moves |
| dead-holds | fixed | audit 0 in 16:9 and 9:16 (chapter plan path, hash boxes, recap lines added) |
| expects | pass | 4 / 3 MOTION.expect, 0 fails |
| determinism | pass | seek(t) only, hash() for made-up rows |
| sync | fixed | audit 0 cues off (both aspects); soundqa 137/213 within one frame, 0 late > 2 frames, 13 early (first transient before the loudest peak) |
| hits-audible | fixed | median +3.7 dB over voice+music; 86/213 under +3 dB (mostly ticks/typing under speech); quietest -10.6 dB |
| music-under-voice | pass | 13.9 dB |
| loudness | pass | export -14.2 LUFS, true peak -1.9 dBTP (AAC check -1.1) |
| phone-band | pass | -1.2 dB drop, <2 % under 60 Hz |
| dc-offset | pass | mix -75 dBFS |
| stems-fresh | pass | cue key = meta |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 yuv420p BT.709 + AAC, 633.5 s |
| editable | pass | http://localhost:7700/edit/database-indexes/ |
| delivered | pass | ~/Downloads/database-indexes/ |

## Talking-head (engine READY): `talking-head/`
- `python3 studio/tools/thsetup.py database-indexes` done (face track, words mapped back through the film's cutlist).
- Manifest `talking-head.json`: `full` (cuts = the film's + [0, 19.35] silent start) and 6 shorts (sh1-sh6, refined-kit §4,
  raw times; SH2 trims "A little bit of a reason", SH3 trims the spoken article mention: the film insert credits it).
- `moments/common.js`: the Query Plan look for TH + the Plex fonts (READY held). `moments/full.js`: a sequencer; each layout
  runs from its phrase to the next one; L8 keywords are overlays. 9:16 half-and-half = film panel 1150 px (`fit: 'safe'`).
- Exports: `node studio/tools/composite.mjs export projects/database-indexes/talking-head/talking-head.json full --aspect both`
  then `... sh1` … `sh6` (shorts are 9:16 only). Log: `talking-head/build/export_full.log`.
- `composite.mjs check`: the remaining "gaps" are L1 talk stretches (3-7 s) with jump-cut reframing + keyword overlays.

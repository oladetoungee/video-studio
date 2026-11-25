# Ghana's Marrify: talking-head clips

Seven short edits of Gbemi's recording (`../kit/ghana-marrify.mov`, 4K, 5:12), one per clip of her kit's clip breakdown
(section 5c, minus clip 3 which isn't in the recording), each 23-46 s, in 9:16 (captions burned in) and 16:9, with motion graphics in the film's "Blink" look on her footage (white world, records and faces with eyes, eyelid wipes, real
credited sources). The deck-style first version is retired (her decision, 2026-10-02).
- Which clips, the hook on each, kit copy vs ours, every beat: `MOMENTS.md`.
- Post captions + hashtags per clip: `CAPTIONS.md`.
- Finished files: `../outputs/talking-head/momentNN-<slug>_{9x16,16x9}.mp4` + `.srt`.
- Edit in the browser: start the studio and open `http://localhost:7700/moment/ghana-marrify/m01/` … `/m07/`.

The engine is the shared studio (`studio/runtime/footage.js`, `studio/tools/composite.mjs`, `footmix.py`, `footedl.py`,
`facetrack.py`): see `studio/README.md` and `projects/reading-stack/talking-head/README.md`, which this folder copies.
Nothing in `studio/` or in the film's `blink.js` was changed for these clips. Project-only behaviour lives in `moments/common.js`: whole-phrase reveals,
captions stepping aside under plate pairs, 9:16 splits cutting in at once after another split or a card, SFX thinning tuned
for short clips.

```
talking-head/
├── talking-head.json      manifest: source, data files, edit settings, audio (voice chain, SFX roles, levels), the 7 moments;
│                          "common" loads ../film/scenes/blink.js (the film's shared kit) then moments/common.js; "fonts"
│                          (Instrument Sans, Geist Mono); "images" = the film's real source captures (../film/assets/src_*)
├── moments/common.js      footage layer for Blink: shots/cards with eyelid wipes (bshot/bcard), the white split panel,
│                          camera presets (her face is big and low: 9:16 full shots z >= 1.16, splits window z 0.84),
│                          speech bubbles beside her (bubPair), peeking characters, Blink-style burned captions, lockTableS,
│                          safe-zone rules (9:16 x 80..940, y <= 1640)
├── moments/m0N-*.js       one file per clip: camera keys, beats, SFX cues, all pinned to her words (P('phrase'))
├── edits/m0N.json         her browser edits (empty = as designed)
├── data/whisper_dtw.json  whisper small.en with DTW token times (better word timing than the kit transcript)
├── data/raw_words.json    her words on the raw video, BRIEF corrections applied (tools/rawwords.py)
├── data/raw_rms_db.npy    10 ms loudness of the raw audio (onset snapping, pause detection)
├── data/face_track.json   her face, 6 times a second (studio/tools/facetrack.py, macOS Vision)
├── data/edl.json          each clip's kept source ranges (studio/tools/footedl.py)
├── audio/sfx/             Mixkit SFX copied from reading-stack (+ keys/ typing bank); the rest come from library/sounds
├── tools/                 rawwords.py, outwords.py (a clip's words on its own timeline), words_in.py, grid.sh (review
│                          stills), review.sh (critic pack: sheets + stills), padcheck.mjs (every frame: text overlaps,
│                          text out of its card, 9:16 safe zone, window framing showing its paper strip), lock.sh
│                          (machine-wide render lock), verify.py (exports: duration, loudness, black frames, transcript)
└── build/                 review stills, sheets, preview proxies (build/proxy/, used by the moment editor)
```

## Rebuild / re-render (from the workspace root)
```sh
TH=projects/ghana-marrify/talking-head/talking-head.json
python3 projects/ghana-marrify/talking-head/tools/rawwords.py          # words (only if corrections change)
python3 studio/tools/footedl.py $TH                                     # cuts (after changing in/out/cuts)
node studio/tools/composite.mjs check  $TH all                          # gaps, holds, empty panels, text over her face
node projects/ghana-marrify/talking-head/tools/padcheck.mjs m01 m02     # overlaps, safe zone, paper strip
projects/ghana-marrify/talking-head/tools/grid.sh m01 1,5,9             # stills both formats
projects/ghana-marrify/talking-head/tools/lock.sh node studio/tools/composite.mjs export $TH m01 --aspect both
projects/ghana-marrify/talking-head/tools/lock.sh node studio/tools/composite.mjs proxy $TH all
python3 projects/ghana-marrify/talking-head/tools/verify.py             # durations, LUFS / true peak, transcript check
```
`tools/lock.sh` takes the machine-wide `/tmp/gm-render.lock` (BRIEF.md): one heavy render at a time.

## Sound
- Voice: the EDL's ranges of her recording, 6 ms fades at each join, high-pass, light noise reduction, de-esser, 3:1
  compressor, +1.5 dB presence; levelled to −16 LUFS.
- Music: one Mixkit track per clip (free licence, https://mixkit.co/license/), ducked 10 dB under her voice, 6 dB in pauses.
  Tracks (ids in `library/music/`): m01 175, m02 150, m03 766, m04 443, m05 234, m06 282, m07 135.
- SFX: Mixkit (library/sounds + audio/sfx), on the graphic hits; levels raised over reading-stack (she found quiet SFX inaudible).
- Master: −14 LUFS integrated, true peak ≤ −1 dBTP, measured on every export (`tools/verify.py`).

## Her footage
Only cropped and scaled: never flipped, never colour-changed. No book or text is visible in this recording, so mirroring
does not matter here.

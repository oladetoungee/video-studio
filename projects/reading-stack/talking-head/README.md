# Reading stack: talking-head moments

Seven short edits of Gbemi's own talking-head video. Each one is 22-54 s, in 9:16 (captions burned in) and 16:9, with motion graphics in her house style on top of her footage.
- Which moments, and every beat in them: `MOMENTS.md`.
- Finished files: `../outputs/talking-head/`.

| File | What |
|---|---|
| `moment0N-<slug>_9x16.mp4` | 1080×1920, 30 fps, H.264 + AAC, burned-in captions (the spoken word highlighted) |
| `moment0N-<slug>_16x9.mp4` | 1920×1080, 30 fps, no burned captions |
| `moment0N-<slug>_9x16.srt`, `_16x9.srt` | Subtitle lines, timed to the clip (same text) |
| `overview.jpg` | One still per beat of every moment, both formats |

## How it is built

A moment is a **studio film with her video underneath**.
- The graphics are written with the same scene API as the motion film (`addScene`, `KT`, `IDX`, `meter`, `polaroid`… from `studio/runtime/core.js` + `house.js`), plus a footage layer, `studio/runtime/footage.js`.
- The footage layer adds:
  - the edit (jump cuts)
  - her word timings on the clip's timeline, so `P('phrase')` works
  - a virtual camera over the 4K source that follows her face: punch-ins, split framing, slow pushes
  - the social captions
  - footage components: `plateText`, `panel`, `slam`, `tag`
- The renderer, `studio/tools/composite.mjs`:
  - draws the graphics in headless Chrome on a transparent canvas and pipes them into ffmpeg as PNG frames.
  - lets ffmpeg decode the 4K HEVC source (VideoToolbox), keep the EDL's frames, crop each frame where the camera says (`sendcmd` → `crop`), scale it to the output size and lay the graphics over it.
  - does all of this in one pass, with no intermediate files.

  A 40 s moment renders in about 15 s.

Her footage is never flipped or colour-changed. It is only cropped and scaled. The source is recorded mirrored, so book covers she holds up read backwards. Wherever a cover matters, a correctly oriented polaroid of it slides in (`assets/`, the same crops as the film and carousels).

```
talking-head/
├── talking-head.json        manifest: source, data files, edit settings, audio (voice chain, SFX roles, levels), the 7 moments
│                            (source in/out, cuts, holds, music track + start, script)
├── moments/common.js        shared layout: plate positions, split panel, camera presets, contents card, idea card, bars
├── moments/m01-problem.js … m07-fiction.js   one file per moment: camera keys, shots, cards, SFX cues (all pinned to her words)
├── edits/m0N.json           text edits / moves / hides, same format as a film's edits.json (empty = as designed)
├── data/raw_words.json      her word timings on the raw video (tools/rawwords.py)
├── data/face_track.json     her face, 6 times a second (studio/tools/facetrack.py, macOS Vision)
├── data/edl.json            each moment's kept clips (studio/tools/footedl.py)
├── data/raw_rms_db.npy      10 ms loudness of the raw audio (speech/silence detection)
├── assets/                  correctly oriented cover crops for the polaroids
├── audio/sfx/               the Mixkit SFX the moments use (+ keys/ keystroke bank)
├── tools/                   rawwords.py, words_in.py, outwords.py (word lists for planning), grid.sh (review stills),
│                            verify.py (duration, loudness, transcript check of the exports), overview.py (outputs/overview.jpg)
└── build/                   review stills and sheets (safe to delete)
```

## Edit something

**In the browser (easiest):** start the studio and open a moment from http://localhost:7700 (`/moment/reading-stack/m01/` …).
Her footage plays under the graphics exactly as exported; click text to change it, drag to move, resize or hide photos, export 9:16 / 16:9.
It writes the same `edits/m0N.json` described below (plus `"capShort"` for a corrected burned-in caption chunk).

By hand:

- **Change a word on screen:**
  - In `moments/m0N-*.js`, change the text in `plateText` / `plates2` / `KT` (`*word*` = accent colour, `~word~` = serif accent), then re-render.
  - Or, without touching code, add an override to `edits/m0N.json`:
    ```json
    { "t": { "problem/You read a *book.*": { "s": "You finish a *book.*" } } }
    ```
    The key is `<shot id>/<default text>`. `"hide": true` hides an element. `"pos": {"9x16": {"dx": 0, "dy": 40}}` moves it in one format only.
- **Fix a caption:** `edits/m0N.json` → `"captions": { "<cue index>": "new text" }`.
- **Change the framing:** the `CAM(t, {z, fx, fy, d})` lines at the top of each moment.
  - `z` is the zoom (1 = full frame).
  - `fx`/`fy` set where her face sits (0..1).
  - `d` is the move duration (0 = cut).
  - In 9:16, `z` is never below 1.08 (see `common.js`).
- **Change the cut:** the moment's `in`/`out`/`cuts`/`holds` in `talking-head.json`, then `python3 studio/tools/footedl.py projects/reading-stack/talking-head/talking-head.json`.
- **Change the music:** the moment's `"music": [track id, start seconds]` (tracks in `library/music/`, Mixkit). Levels are in `audio.levels`.

## Re-render (from the workspace root)

```sh
TH=projects/reading-stack/talking-head/talking-head.json
node studio/tools/composite.mjs check  $TH all                     # gaps (>2 s), static holds (>3 s), empty panels, text past a panel edge, text over her face
node studio/tools/composite.mjs stills $TH m01 --aspect 9x16 --captions --at 2.4,9.2,13.3
node studio/tools/composite.mjs sheet  $TH m01 --aspect 16x9 --every 1.5
node studio/tools/composite.mjs export $TH m01 --aspect both       # or: all ; --no-music / --no-sfx
projects/reading-stack/talking-head/tools/grid.sh m01 2.4,9.2,13.3 # stills in both formats + two review grids
```

`export` waits while another heavy render (ffmpeg / headless Chrome) is running on the machine. It writes nothing large except the final mp4, rendered to a hidden `.part` file and renamed over the old one when complete.

```sh
python3 projects/reading-stack/talking-head/tools/verify.py      # durations, LUFS / true peak, whisper transcript vs. the kept words
python3 projects/reading-stack/talking-head/tools/overview.py    # outputs/talking-head/overview.jpg
```

Rebuild the data (only needed if the source or the film's voice edit changes):
```sh
python3 projects/reading-stack/talking-head/tools/rawwords.py
python3 studio/tools/facetrack.py projects/reading-stack/kit/raw-video.mov projects/reading-stack/talking-head/data/face_track.json
python3 studio/tools/footedl.py $TH
```

## Sound
- **Voice:** the EDL's clips of her recording, with 6 ms fades at every join. Then: high-pass 80 Hz → `afftdn` light noise reduction → de-esser → 3:1 compressor → +1.5 dB at 3.2 kHz. Levelled to −16 LUFS.
- **Music:** one Mixkit track per moment (titles in `MOMENTS.md`), free licence (https://mixkit.co/license/). It is ducked 15 dB under her voice, opens to −9 dB in pauses, and fades at the start and end.
- **SFX:** Mixkit (`library/sounds`, `audio/sfx`), placed on the graphic hits by the moment scripts (`sfx(role, t)`). Whooshes and hits have their peak on the frame of the hit.
- **Master:** −14 LUFS integrated, true peak ≤ −1 dBTP (oversampled limiter). Measured on every export.

## Studio changes
Originally additive (new files only; the 16:9 film hashes were identical). Since 2026-10-01 the studio also has a moment editor
(`studio/editor/moment.*`), `composite.mjs proxy` (the editor's preview footage in `build/proxy/`), a voice toggle in `footmix.py`,
and burned-in caption edits under `"capShort"`.
- `studio/runtime/footage.js`, `studio/runtime/moment.html`
- `studio/tools/composite.mjs`, `footmix.py`, `footedl.py`, `facetrack.py` + `facetrack.swift`

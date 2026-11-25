# studio/ handoff (ENGINE agent)

## 2026-10-14: moment editor captions (16:9 her style + contrast box), export parity, plain-language errors
- `runtime/footage.js` CAP16 / buildCaptions16 / drawCaptions16 / capBoxAlpha / capBgNeed / setCapBg / capSliderInfo; size + height
  edits for 9:16 (house + shorts, `layouts.js` drawShortCaption). `layouts.js` T.post routes 16:9 to drawCaptions16.
- `tools/composite.mjs`: `export --t0 --t1 --captions/--no-captions`, `frame`, `capbg`, `Plain` errors + `@error`, data-volume free space.
- `tools/jobs.mjs` (moment what/t0/t1/t/captions; `captions` kind), `server.mjs` (hard links into Downloads, `job.error`, plainError,
  cap16 / captions16 / captions9 kept), `editor/shell.js` (linked files, error + Details), `editor/moment.*` (Export What, Captions pane).
- Regression: reading-stack + ghana-marrify moments and claude-rule sh1/sh2 identical to the old captions behaviour
  (hashes, 1990 + 2108 + 626 checks; baseline taken from a copy of the studio with the caption changes reverted).
- Open: 16:9 captions are hidden on L9 cutaways / L11 corner cams by design (say if she wants them there); no `.srt` change.

## 2026-10-13: talking-head engine (full-length, layouts L1-L13, shorts, matte)
Done and verified:
- `runtime/layouts.js` (TH): layouts L1-L13, film-in-moment (hidden film frame, word-synced), matte layer, shorts label /
  captions / end card, palette sound priorities, whoosh rationing. Hooks in `footage.js` (boot, finish, render), boxes +
  face-fill in `CAM`, `layout` in meta. `moment.html` grab(t, matte).
- `tools/composite.mjs`: render lock (`lock.mjs`), box graph (one fixed-size branch per box size), matte feed (`MatteReader`),
  chunked proxy with matte band and separate sound key, shorts/full naming + output dirs, `matte` and `hashes` modes, 8 GB guard.
- `tools/matte.py` + `matte.swift`, `thsetup.py`, `sound-palette.json`, `gmlock.py`; `footmix.py` (palette roles, film: roles,
  shorts tail), `footedl.py` (out "end", retakes); `server.mjs` (chunked proxy API, home groups); editor `moment.js/html`
  (two-video chunk playback, matte from band, boxes, shorts lock 9:16, names); `film.html` exposes `FILMAPI`; fonts.css.
- Regression: reading-stack + ghana-marrify moments identical (graphics pixels every 0.25 s both sizes, camera crops, cues,
  captions: 1990 + 2108 checks; footmix WAVs cmp-identical; reading-stack EDL identical). Baselines were in the engine
  scratchpad; re-take with `composite.mjs hashes ... --out` before changing footage.js again.
- Test exports: `projects/claude-rule/talking-head/build/engine-test/` (16:9 + 9:16 engine test 76 s, short 28.7 s).
Next / open:
- Boxes cannot change size while moving (by design of the box graph).
- Proxy last frame count: exports have N-1 frames in ffprobe (pre-existing behaviour of -frames:v with overlay shortest).
- Watch `projects/ENGINE-REQUESTS.md`.

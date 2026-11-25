# october-attacks film directions: progress notes (resume from here)

Agent: film-directions (2026-10-26). Brief: 3 directions, 6x16:9 + 2x9:16 stills each, a 12-20 s motion test each (studio seek(t)
runtime), README + overview.jpg, fresh critic, scores in README.

## Plan
- A-month: THE MONTH. October 2026 calendar as the spine; attacks land on their dates; zoom into a day per story.
- B-keys: THE KEY CABINET. Every story is about keys (env secrets, admin tokens, API keys, a signing key that was "4"): a pegboard key wall.
- C-status: THE STATUS PAGE. "The internet's status page for October": uptime bars, incident updates, coverage attached.
- Each direction = a mini studio film (film.json + scenes + data/words.json, voice times = voice.m4a times, intro 0),
  served by `_tools/serve-render.mjs` which maps /p/oa-<X>/film/ -> <X>/ and /studio/runtime -> studio/runtime (no engine edits).

## Done
- Tools: `_tools/capture.mjs` (real article captures -> `_src/`), `_tools/clips.py` (crops -> `_src/clips/` + `_shared/clips.js`),
  `_tools/oa.mjs stills|video|meta <X>`, `_tools/mixtest.py <X> t0 t1 silent out` (voice + Mixkit bed 766 + cues, -14 LUFS), `_tools/sheet.py`.
- A-month: 8 stills + 2 portrait in `A-month/frames/` (a1..a8, p1, p2; c* = check frames, ignore). Motion test 2.6-22.6 s (opening). DONE.
- B-keys: stills done (b1, b4..b8, p1, p2). Motion test 239.75-257.25 s (Zeabur) rendering.
- C-status: next.
- 01:15 all three motion tests rendered (A 20 s -14.1 LUFS, B 17.5 s -13.6, C 18.2 s -14.0). overview.jpg built (`_tools/overview.py`).
- Next: README.md, fresh critic round 1, fixes, scores in README.
- Re-render a test: `cd _tools && node oa.mjs meta X && node oa.mjs video X t0 t1 ../X/_silent.mp4 && python3 mixtest.py X t0 t1 ../X/_silent.mp4 ../X/motion-test.mp4`
  (A 2.6 22.6 · B 239.75 257.25 · C 183.4 201.6). Stills: see the times in README / overview.py.
- 01:30 critic round 1: A 6.5, B 5.5, C 5 (pick A). Round-2 fixes done in all three (see README "Round 1 notes"),
  all tests re-rendered (A 2.6-22.6, B 240.1-257.25, C 183.4-201.6), README written, critic round 2 requested
  (agent a367b150d9ff2f878). After it: fix, fill the README score table, final report.
- 01:45 critic round 2: A 7.5, B 6, C 5.5 (pick A). Quick A fixes 1/2/3/5/7 applied + A test re-rendered (-14.1 LUFS).
  Open for A: p2 crop to whole words, a4 two focal points, a2 empty lower right. Scores in README.

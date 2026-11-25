# working-full-time directions: progress notes (resume from here)
Agent: directions (2026-11-02, resumed after her pause). Brief: projects/DIRECTIONS-BRIEF-2026-11.md.

## Looks claimed (checked against the siblings' HANDOFF files)
- scholarships has: passport (burgundy/gold, DM Serif Display), departures board (graphite/green), postcards (Pexels cities, rounded inserts).
- dark-patterns has: field-guide drawer (teal/pin red), VERSION A / B split (paper vs ink), blown-up UI on pink.
- So NOT here: split-screen paper-vs-ink, departures board, rounded cinematic postcards, passport.

## Plan (three directions)
- A-day · ONE 24 HOURS: the whole film is a single 24-hour dial (her line "you have the same one 24 hours").
  Night #101418 / day sand #ECE4D3 grounds, accent screen cyan #29B6E8 (= study time only). Familjen Grotesk + JetBrains Mono
  + Source Serif 4 italic accent. Test: 335.1-344.3 (two calendars = two 24 hours -> one).
- B-timecard · CLOCK IN / CLOCK OUT: a punch-clock time card. Manila #E7D7AE, ink #1D1A15, stamp red #C8102E (her headband).
  Bebas Neue + Work Sans + Cutive Mono stamps. Test: 514.9-524.5 ("clock out of work... 5 p.m. is really when work ends").
- C-datestamp · DATE STAMP: montage + voice-over (yemshaven #23/#24) of full-bleed clips with an orange camcorder date stamp
  (DSEG7, #FF8A1F) "MON 07:45" that runs her week; Caveat handwriting; her own footage cut in full-frame. Test: 76.1-86.2
  ("Working while studying is the real ghetto... Monday... till Friday, Saturday").
- talking-head/: 4 stills on her real frames (4 layouts). shorts/: 2 x 9:16 of SH7 (one calendar) or SH8 (study leave).

## Pipeline
- `_tools/r.mjs` (copied from scholarships): `node _tools/r.mjs shots <X>/index.html 1920x1080 name...`;
  `node _tools/r.mjs video <X>/index.html 1920x1080 t0 t1 <X>/_silent.mp4 [id:path:ss:WxH feeds]` (holds the render lock).
- `_tools/mixtest.py` (voice + Mixkit bed + cues) -> motion-test.mp4 at -14 LUFS (needs adapting to cues.json).
- Words: `_shared/words.json` (raw recording times). Sources: `_src/clips/` (Study in Estonia hours + balance, Riigi Teataja § 13).
- Pexels: `film/assets/pexels/` (9 clips, 1280x720, 5 s), credits `film/assets/CREDITS.md`.

## Done (2026-11-02 evening)
- Pages: A-day/, B-timecard/, C-datestamp/, talking-head/, shorts/ (index.html each, shared _shared/lib.js + fonts.css).
- Stills: A a1-a4 + p1 p2, B b1-b4 + p1 p2, C c1-c4 + p1 p2, talking-head th1-th4, shorts s1 s2. overview.png built (_tools/overview.py).
- Motion tests (16:9, her voice, -14.1 LUFS): A 335.0-344.9, B 514.8-524.4, C 78.0-87.6 (C feeds: her footage + 11 Pexels feeds, see command in README).
- Loudness: mixtest.py then a one-pass gain + limiter to -14.
## Next
- critic round 1 -> fixes -> round 2; README.md; STATUS.md row; report.

## Round 1 critic (2026-11-02): A 6.8, B 7.0, C 5.8 -> fixes applied (see README); new rules from her mid-task: corrections in the
edit (b6), no timers in shorts, overview grouped by look ("pick one look"). Added s3 (B) and s4 (C) shorts frames. Round 2 requested.
C motion-test feeds: her:../../../kit/raw-video.mov:78.0:1920x1080:0 plus m_<clip>:../../assets/pexels/<clip>.mp4:<ss>:1280x720:<start-78.0-0.05>
for the MONT list in C-datestamp/index.html (ss = 0.4 + md5(id)%20/10).
- Round 2: A 7.3, B 7.6, C 6.0. Open B fixes listed in README (clamp push-in, cell overflow, OUT stamp to FRI, early punch, b6 source).

# dark-patterns film directions: progress notes (resume from here)
Agent: directions (2026-11-02). Brief: projects/DIRECTIONS-BRIEF-2026-11.md.

## Plan
- A-guide: THE FIELD GUIDE. Every trick has a name: each dark pattern is a pinned specimen (UI object + tag) in a
  museum drawer (teal #0E4A4C, card #F5F1E6, pin red #E5322B; Young Serif / Hanken Grotesk / Martian Mono). Test: roach motel 60.9-70.5.
- B-split: VERSION A / VERSION B. Every screen split: honest version (paper) vs the version that wins (ink), red only on B.
  Space Grotesk / Space Mono. Test: sneak into basket 94.9-103.
- C-zoom: BLOWN UP. Spot the trick: UI at poster scale on pink #FF9EC4, black ink, yellow highlight, magnifier ring.
  Geist / Geist Mono / DM Serif Display italic for her quoted words. Test: opening 0.2-9.9.
- TH: talking-head style frames over her real frames (_src/footage, raw times in names) + shorts frames (SH9 fake timers).
- Engine: studio runtime via _tools/dp.mjs (copied from october-attacks oa.mjs): `node _tools/dp.mjs stills <X> 16x9 name=t ...`,
  `node _tools/dp.mjs meta <X>`, `node _tools/dp.mjs video <X> t0 t1 <X>/_silent.mp4`, then `python3 _tools/mixtest.py <X> t0 t1 <X>/_silent.mp4 <X>/motion-test.mp4`.
- Words: _shared/words.json (raw recording times, from whisper tokens). Sources: _src (captures) -> _tools/clips.py -> _src/clips + _shared/clips.js.
- Pexels: _src/pexels, credits in film/assets/CREDITS.md.

## Done
- sources captured (deceptive.design types/about, EC IP/23/418, FTC 10 Jul 2024, GDPR recital 32), clips cut, Pexels (shoe, cockroach, laptop), footage frames, fonts.
- A-guide DONE: frames a1-a6 (16:9), p1-p4 (9:16), motion-test.mp4 (60.6-70.6, -14 LUFS). Next: B-split, C-zoom, TH, critic.
- B-split DONE: frames b0-b6, p1-p3, motion-test 94.6-103.0
- C-zoom DONE (c0-c6, p1-p4, test 0.1-9.9). TH DONE (th1-4, sh9-1/2). overview.png. Next: README draft, critic round 1.
- round 1 critic: A 6.0, B 6.0, C 7.3 (pick C); round-2 fixes applied (A ochre, crops, B timing, C lens + sharp FTC capture, TH/shorts). Next: critic round 2, README.
- 2026-11-02 critic round 2: A 7.4, B 7.0, C 8.1 (pick C), TH 7.3, shorts 7.5. Post-round-2 fixes applied (not re-scored). README.md written. DONE.
- 2026-11-02 coordinator's new rules applied: per-look short frames (no timers), correction frame fix-C-correction (Amazon .5bn), overview grouped by look with 'Pick ONE look' heading, README leads with the one question.

# the-edge-case-you-think-is-impossible: film directions, progress notes (resume from here)
Agent: directions (batch 2, 2026-11-02 evening). Brief: projects/DIRECTIONS-BRIEF-2026-11.md.

## Looks I am trying (other batch-2 agents: please stay clear of these)
- A · HERE BE DRAGONS: the edge of the map. The happy path is a dotted route on an old chart; every edge case lives
  out at the map's edge (sea-monster margins). Chart paper + ink + one red. Serif cartography labels.
- B · THE FIELD: ONE giant text input at poster scale on a flat acid-lime ground (no browser chrome). Every edge case is
  typed into it (O'Brien, Null, Adébáyọ̀, 29/02, 03:30, a double click on Place order); red validation messages are the accent.
- C · THE PLATE PRESS: every edge case is stamped letter by letter into an embossed (generic) licence plate
  (NULL, 29 FEB, O'BRIEN, 03:30); flat steel-blue ground, plate white, ink-navy letters, parking-ticket yellow.
(Dropped a tabloid-newspaper idea: too close to should-you-learn-to-code's classifieds. Avoiding cookies' browser window.)

## Done
- (nothing yet)
- Tools: _tools/r.mjs (stills/meta/video), mixtest.py, capture.mjs, clips.py (manual highlight boxes), frames.sh (footage), matte.swift.
- Sources: _src (bbc, wired, azure captures; Sophos refused automated fetch) -> _src/clips. Pexels: _src/pexels (4 photos).
- A-map stills a1-a4 + p1-p2 DONE; B-field b1-b4 + p1-p2 DONE; C-plate c1-c4 + p1-p2 DONE (first pass, self-reviewed).
- Test windows: A 2.18-12.5 (opening), B 46.1-54.6 (double-click), C 255.25-265.7 (NULL plate). No CLEANUP cuts inside any of them.
- Next: motion tests, TH frames, shorts frames, correction frame, critic, README, overview, STATUS.
- Motion tests DONE (A 2.18-12.5, B 46.1-54.6, C 255.25-265.7; -14.1 to -14.8 LUFS, peak -1.4 to -1.6). TH th1-th4 + fix-correction + sh6-A/B/C DONE. overview.png DONE (_tools/overview.py [A|B|C] marks the pick).
- Next: critic round 1 (fresh agent), fixes, round 2, README, STATUS row.
- Round 1 critic: A 6, B 7, C 6.5, TH 6, shorts 6, fix 7. Round-2 fixes applied (A sea-chart palette + lining figures, B HUD removed + tab 2 + byte boxes + leap date field + B correction, C letters fit + tickets + stamp, TH captions/matte, shorts). Tests re-rendered. Next: critic round 2.
- README + STATUS row written; critic round 2 still running at hand-off (agent a9df59701079e3ba3).
- Round 2: A 6.5, B 7.5, C 6.5, TH 6.5, shorts 6.5, B correction 8. Round-3 B fixes applied, B test re-rendered (-13.9 LUFS); round-3 re-score sent to critic a0f5034da4acfd5ca.
- Round 3: B 7.8. Left for 8: source clips cropped to highlighted lines at >=26 px body text (b3, b5, th2); b4 rebalanced (72 px boxes at y 640-760, strlen at y 950).

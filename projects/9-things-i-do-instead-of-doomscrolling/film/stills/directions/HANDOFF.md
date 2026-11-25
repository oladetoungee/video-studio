# 9-things-i-do-instead-of-doomscrolling directions: progress notes (resume from here)
Agent: directions (batch 2, 2026-11-02 evening). Brief: projects/DIRECTIONS-BRIEF-2026-11.md (incl. Batch 2).

## Looks I am trying (claimed for this project; other batch-2 agents please stay clear)
- A · OFFLINE BINGO: the nine swaps are a 3x3 bingo card (nine items = nine squares). Each item daubs its square with a
  translucent orange dauber dot; the card IS the 1-9 counter; full card = "BINGO" at the end. Butter-yellow ground #F7D44C,
  card #FFFDF5, ink #161616, dauber #F0532D (only ever = "done, offline"). Bowlby One numerals + Figtree + Red Hat Mono.
- B · JUNK JOURNAL: her own hobby as the look: a scrapbook page per item. Kraft #CDB38E ground, cream notebook paper,
  Pexels photos taped in as prints with mint washi tape #8FD3BE (tape = the only accent), handwritten notes (Reenie Beanie),
  Gloock serif headings, stamped item numbers.
- C · THE END (stopping cues): her argument made visible. The video gets the stopping cues a feed doesn't have: each item
  is an "episode" with a thin progress bar that fills, then an end card ("End of 03 · next: 04"); black intertitle phrase
  cards. Night #0D0C0B, butter #F2E2A0 (= an ending), Bodoni Moda italic + Sofia Sans Extra Condensed + Lora captions.
(Avoiding: lock screen, receipt (phone-distraction), feed/pull-to-refresh, departures board, passport, postcards, punch
clock, 24-h dial, date stamp, shelf labels, calculator, highlighter, typeset paper, xerox, ticket counter, cloakroom,
classifieds, ladder, code review, map edge, web form, tabloid.)

## Pipeline (copied from scholarships): _tools/r.mjs (shots / video, render lock), mix.py, capture.mjs, overview.py; _shared/lib.js.

## Done
- tools copied; looks claimed.
- 2026-11-02 night: all stills done: A-bingo a1-a4 p1 p2, B-journal b1-b4 p1 p2, C-theend c1-c4 p1 p2, TH th1 (A half/half), th2 (C screen behind her), th3 (B journal page behind her), th4 (C receipt), fix (A correction "number eight" -> 6), SH s1 (A, T3+C1), s2 (C, letterbox T8+C8), s3 (B, T11+C3). overview.png built (_tools/overview.py).
- Motion tests (16:9, her voice, -14.2/-14.3 LUFS): A 973.6-982.4 (her footage feed + split + daub 07), B 1110.0-1120.0 (junk journaling), C 69.3-79.5 (stopping cue, pause, three panes).
  Re-render: cd _tools && node r.mjs video <X>/index.html 1920x1080 t0 t1 ../<X>/_silent.mp4 [her:../../../kit/raw-video.mov:973.6:1920x1080 for A] && python3 mix.py <X> t0 t1 ../<X>/_silent.mp4 ../<X>/motion-test.mp4
- Next: critic round 1, fixes, round 2, README.md, STATUS row.
- Round 1 critic: A 7.0, B 6.5, C 6.5 (pick A). Fixes applied to all (see README), tests re-rendered (A -14.2, B -13.9, C 70.2-79.5 -14.2). Next: round 2.
- Round 2: A 7.5/7.6, B 6.5/6.0, C 6.5/6.8; fix 8. A's must-fixes applied + re-rendered (round-3 confirm pending). README scores updated. overview rebuilt.
- Round 3: A 8.2 (passes), th1 8.2, s1 7.8, B 6.5. README updated. DONE except her pick.

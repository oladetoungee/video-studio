# scholarships directions: progress notes (resume from here)
Agent: directions (2026-11-02). Brief: projects/DIRECTIONS-BRIEF-2026-11.md.

## The three looks (claimed for this project, so the other study-abroad project can pick something else)
- A · STAMPED: a scholarship passport. Burgundy #5A1424, page cream #F2E8D5, ink #1A1416, gold #C9A043 (= fully funded / money). DM Serif Display + Hanken Grotesk + Azeret Mono. Stamps, MRZ line, page turns.
- B · NOW BOARDING: a departures board. Graphite #1B1D21, flap #0E0F11, letters #F3F0E8, signal green #2FD27A (= still open). Barlow Condensed + Barlow + DM Mono. Split-flap cascades, boarding pass, side timer.
- C · POSTCARDS: photo-led (Pexels cities) postcards. White card #FFFFFF, ink #121212, marker yellow #FFD43B. Big Shoulders Display + Plus Jakarta Sans + Instrument Serif italic. Postcard flip, rounded cinematic inserts, title flash, her cut-out over a city (green screen).

## Pipeline
- `_tools/r.mjs` (static server + puppeteer): `still` and `video` (her footage / Pexels video decoded by ffmpeg into the page frame by frame, no files), lock /tmp/gm-render.lock.
- Pages: `A-stamped/index.html`, `B-boarding/index.html`, `C-postcards/index.html`, `TH/index.html`, `SH/index.html`; shared `_shared/lib.js`.
- `_tools/mix.py <dir> t0 t1 silent out`: voice.m4a + Mixkit bed + cues.json, -14 LUFS.
- Sources: `_src/raw_*.jpg` (her frames, not flipped), `_src/cap/` (official pages 2026-11-02), `_src/pexels/` (credits in film/assets/CREDITS.md).

## Done
- frames, captures, Pexels, fonts.
- 2026-11-02 (after the pause): A-stamped done: frames a1-a4, p1, p2; motion-test.mp4 (raw 108.6-118.9, Erasmus Mundus covers + Programme Guide receipt, -14.5 LUFS, TP -1.0). Render: `cd _tools && node r.mjs shots A-stamped/index.html 1920x1080 a1 a2 a3 a4`; video + `python3 mix.py A-stamped 108.6 118.9 silent out`.
- Next: B-boarding (board, Sweden steps, boarding passes, flap phrase card; test raw 0.2-10.2 with her footage feed), then C, TH, SH, critic.
- B-boarding done (b1-b4, p1, p2, motion-test raw 0.2-10.2 with her footage, -14 LUFS). C-postcards done (c1-c4, p1, p2, motion-test raw 241.15-251.35 with Pexels video). TH/frames th1-th4, SH/frames s1-s2 (SH4 in B look). overview.png built (`python3 _tools/overview.py`).
- Next: critic round 1 (fresh agent), fixes, round 2, README.md + STATUS row.
- Critic round 1 (agent a0c615f6e3ed3b98c): A 6.0, B 7.5, C 6.0; th1 7, th2 7.5, th3 5, th4 6.5; s1 7, s2 6. Pick B. A collides with working-full-time B-timecard (red stamps on cream), C with its C-datestamp (Pexels city + italic caption).
- Round-1 fixes applied (B: ADMISSION OPEN, AISS closes 2 FEB, labels 40 px, board inside 100 px margins, b2 receipt 1.6x full width, passes without stubs, test push + FEB underline sweep; A: widows, MRZ 30 px one line, a4 stamps one line, receipt padding; C: postmarks off photos/addresses, c2 her words "Federal Scholarship Board", p2 balanced; TH: th2 status column clear of her, th3 hard matte + title up + caption band, th1 card taller, th4 padding; SH: s1 footage to bottom, s2 receipt removed (dates line), caption 2 lines). Next: round 2.
- Critic round 2: A 6.5, B 8.2, C 6.5; th1 7.5 th2 8 th3 6.5 th4 7; s1 7.5 s2 8. Post-round-2 fixes applied (B push 5 %, b2 crop 3 lines, c2 one row, th2 label 34 px, th3 matte choked). README.md written. DONE except her pick.

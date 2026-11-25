# october-attacks design: handoff (thumbnails + carousels)

Resume notes for the DESIGN agent. Read top to bottom, continue from the last unchecked step.

## Set-up (done 2026-10-26)
- Frames of her: `thumbnails/assets/frames/f_<sec>.jpg` (2560 px, from `kit/october internet attacks.mov`): 176.6 palms up (closed mouth),
  3.0 calm hands clasped, 410.0 calm hands together. Never flipped.
- Cut-outs `thumbnails/assets/cut/gbemi-<sec>.png`; full-frame person layers (for "room washed, her in colour")
  `thumbnails/assets/scene/gbemi-<sec>-person.png` + `gbemi-<sec>.jpg` (1920x1080, aligned).
- Real headline crops (untouched pixels, credited on the design): `thumbnails/assets/src/*.png` (BleepingComputer PHP / Zeabur / eMudhra,
  TechCrunch Railway, SecurityWeek, The Hacker News, Help Net Security).
- Fonts: Anton, Manrope, Spline Sans Mono (film look A) + Instrument Serif, Permanent Marker, Caveat.
- `thumbnails/render.mjs` (copied mechanics), `lib/bind.js`, `lib/arrow.js`, `lib/oa.css` (this set's look).

## Plan: 22 thumbnails, mix
photo bg 8 · collage 4 · flat graphic 5 · other 4. Top 3 from the kit: PATCH YOUR PHP, HACKED: $1,000 AI BILL, AI AGENTS HACKED 100+ SITES.

## Progress
- [x] 21 directions written + rendered + overview (2026-10-26)
- [x] 168/320 sheets, cold critic R1 + R2, fixes, README.md with scores
- [x] carousels instagram (10) + linkedin (11 + PDF), own build.mjs/base.css in look A, checks clean
- [x] Downloads hard links, STATUS.md (2026-10-26). DONE.

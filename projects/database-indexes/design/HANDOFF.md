# database-indexes design: hand-off (DESIGN agent, 2026-10-13)

## Done
- Thumbnails: 26 directions in `thumbnails/directions/` (index.html + content.json each), rendered to `outputs/thumbnails/`.
  Generator: `python3 thumbnails/tools/gen.py [prefix] [--reset]` (layouts in `thumbnails/tools/dirs.py`, round 2 + round 3 overrides at the end),
  then `node thumbnails/render.mjs` (all + overview.png). Without --reset her studio edits in content.json are kept.
- Her frames: `thumbnails/assets/frames/` (4K grabs, never flipped) -> `assets/scene/` (2560 wide, warm grade `tools/warm.py`)
  -> `assets/cut/` (Vision person masks). Closed-mouth frames picked with `tools/expr.swift` (mouth/eye openness).
- Gates: 3 rounds (cold image-only topic critic, title-pair critic, taste critic). Scores in each content.json + NOTES.md.
- Carousels: `carousels/instagram`, `carousels/linkedin` (content.json); build `node carousels/shared/build.mjs instagram linkedin`.

## Status (end of session)
- Thumbnails: 26, 4 gate rounds, scores in content.json + `thumbnails/NOTES.md`; recommended 05, 07, 20.
- Carousels: IG 8 slides, LI 7 slides + PDF, 6 critic rounds, last scores IG 7.5 (all listed fixes then applied) / LI 8.
- Downloads copies refreshed.

## Next / open
- Ask her for photos holding a book open at its index page, a laptop, a phone (all frames are one webcam angle).

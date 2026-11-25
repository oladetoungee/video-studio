# Design hand-off (thumbnails + carousels), ux-research

Owner: the DESIGN agent (projects/BUILD-BRIEF.md). Resumable from disk.

## Done (2026-10-13)
- Thumbnails: 21 directions in `design/thumbnails/directions/`, 3 gate rounds, scores + recommended 3 in each content.json and
  `design/thumbnails/NOTES.md`; PNGs + overview in `outputs/thumbnails/`, copy in `~/Downloads/ux-research-thumbnails/`.
  Editor: http://localhost:7700/design/ux-research/thumbnails/
- Carousels: `design/carousels/instagram` (10 slides) and `linkedin` (11 slides + carousel.pdf), research-wall layouts added to
  `design/carousels/shared/build.mjs` (notes, cards, phone, quote, stat). Notes in `design/carousels/NOTES.md`.
  Editors: http://localhost:7700/design/ux-research/carousels/instagram/ and .../linkedin/

## Next (if anything)
- Her pick of thumbnails/titles; her own photos into `assets/uploads/` would lift every photo-led thumbnail.
- If she confirms the Medium author: add the name to the end-slide credit line (both decks).
- Critics' open points: sticky notes have no paper texture; phone props are small at 168 px.

## How to rebuild
- Thumbnails: `cd design/thumbnails && python3 tools/gen.py [NN] && python3 tools/scores.py && node render.mjs` (no --reset keeps her edits).
- Carousels: `cd design/carousels && node shared/build.mjs instagram linkedin` (checks print; must say "checks clean").

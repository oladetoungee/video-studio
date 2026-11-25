# claude-rule design: handoff (DESIGN agent, 2026-10-13)

## Done
- **Thumbnails**: 21 options in `thumbnails/directions/` (editor: http://localhost:7700/design/claude-rule/thumbnails/),
  PNGs + `overview.png` in `outputs/thumbnails/`, copy in `~/Downloads/claude-rule-thumbnails/`. Notes, gates (3 rounds), scores and the
  recommended 3 (01, 20, 22; 02 after 12 Nov) in `thumbnails/NOTES.md` (and in each content.json "scores" / "recommended").
  Rebuild: `python3 tools/gen.py [prefix] [--reset]` then `node render.mjs [prefix]` (from `thumbnails/`).
- **Carousels** (cold critic 8.0 IG / 8.1 LI after 7 rounds; build.mjs checks clean): Instagram (10 slides) and LinkedIn (10 slides + `carousel.pdf`) in the Thread look; content in
  `carousels/<deck>/content.json`, engine `carousels/shared/build.mjs` + `base.css` (layouts: hook, source, chat, line, breakout,
  quote, punch, end). Render: `node shared/build.mjs instagram linkedin` (from `carousels/`). Outputs in `outputs/carousels/<deck>/`.

## Next / open
- Her own photos would beat video frames (the mic sits at her chin in every frame). Drop them in `assets/uploads/` or use
  "Add photo" in the thumbnail editor.
- 22 (calendar "FROM NOV 12") goes stale after 12 November.
- Before posting: end slides name the video "Claude Can End Your Chat If You're Cruel. But Why?": change if she picks another title.
- Carousel slide copy and checks: `carousels/NOTES.md`.

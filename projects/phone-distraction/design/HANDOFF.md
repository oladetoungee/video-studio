# Design agent hand-off (phone-distraction, 2026-10-13)

Owner: DESIGN agent (`design/`, `outputs/thumbnails/`, `outputs/carousels/`). Resumable from disk.

## Done
- Thumbnails: 23 directions in `design/thumbnails/directions/` (generator `tools/gen.py`, look `lib/pd.css`), rendered to `outputs/thumbnails/` + `overview.png`; three gates run twice (image-only, title pair, taste), scores + recommended in each `content.json`; notes in `design/thumbnails/NOTES.md`. Cut in round 1: `archive/thumbnails-round1/`.
- Her frames: whole video scanned (`review/expr.tsv`), 46 4K frames, warmed + person masks in `design/thumbnails/assets/scene/warm/`.
- Carousels: `design/carousels/{instagram,linkedin}/content.json`, builder `shared/build.mjs` (own layouts, ghana-marrify's studio contract and checks), look `shared/base.css`. Outputs in `outputs/carousels/`. Cold critic rounds in STATUS.md.

## Next (if resumed)
- When she sends photos (`assets/uploads/`): swap them into 01, 08, 12, 14, 15, 20 (Change photo in the editor, or `images.scene` in content.json; for words behind her head also make a person mask: Remove background in the editor, or `tools/cutout_full.swift` + `tools/warm.py`).
- Re-run `python3 tools/check.py`, `node render.mjs`, `python3 tools/review.py`; copy to `~/Downloads/phone-distraction-thumbnails/`.
- Carousels: `node shared/build.mjs instagram linkedin` from `design/carousels/`; copy to `~/Downloads/phone-distraction-carousels/`.

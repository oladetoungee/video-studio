# Sources capture: handoff (resume notes)
- Tools: `tools/urls.json` (pages), `tools/quotes.json` (key lines per page), `tools/capture.mjs`.
- Phase 1: `node tools/capture.mjs text [story/slug]` -> `_text/<story>__<slug>.txt` (article text, status).
- Phase 2: `node tools/capture.mjs full [story/slug]` -> `<story>/<slug>_{fold.png,full.jpg,scroll.mp4}` + `<story>/<slug>.json`.
- Progress log below.

## Progress
- 2026-10-26: URL list written (47 pages). Phase 1 starting.
- 01:15 Phase 1 done for 61 URLs (5 marked `skip` in urls.json with reason). quotes.json written + verified against page text.
- 01:30 Phase 2 (full) running in background: `SKIP_DONE=1 node tools/capture.mjs full > full.log`. Resume = same command (skips pages with a .json).
- Notes: ad/tracker requests are blocked (pages hang otherwise); dialogs dismissed; per-page timeout 420 s.
- Fact-check notes so far live in my head -> will be in SOURCES.md "Facts to flag".
- 02:00 Batch 1 done (172 MB). Fixes added: html-level consent overlays (Transcend), inner scroll containers, HN title boxes. Redoing 13 pages -> redo.log
- 02:25 All fixes in (largest-font match, html-level overlays, body overflow, zoom for HN/openwall/X, reload for X). Full re-run of every page -> full2.log (same command, no SKIP_DONE).
- 02:50 Added: in-flow ad-unit removal, visible/h1-preferred matching. Final full re-run -> full3.log
- 03:30 DONE. 58 pages captured (all loaded), 6 not captured (reasons in sources.json). SOURCES.md + sources.json built by `python3 -I tools/build_index.py` (reads tools/urls.json, tools/manual.json, tools/facts.md and each <story>/<slug>.json). Total 197 MB. Last run log: full3.log.
- To add a page: append to tools/urls.json (+ key lines in tools/quotes.json), run `node tools/capture.mjs full <story>/<slug>`, then rebuild the index.

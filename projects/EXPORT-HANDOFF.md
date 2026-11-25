# Export run (EXPORT agent, 2026-10-13): keep current

Driver: `studio/build/export-queue.sh <slug> <id[:both]> ...` (one export at a time, stops under 3 GB free on the data volume,
`GM_MIN_FREE_GB=3` lowers the engine's 8 GB guard for this run; done items append to `projects/<slug>/talking-head/build/exported.txt`).
After each export: `ln -f` into `~/Downloads/<slug>/talking-head/` or `~/Downloads/<slug>/shorts/` (hard links, no extra space).

| # | project | items | state |
|---|---|---|---|
| 1 | claude-rule | full (both), sh1-sh6 | DONE 19:14 (sh2/sh4 last). Was: exported 18:00-18:55; critic r1 (6/6/6/5/6/5/4/7) fixes made in moments (sh2 label+end, sh4 opening half, sh5 opener scene, ILLUSION up, full 3:29-4:08 halves, end cards 5 s); re-export queued after #2 (`studio/build/export-claude-rule3.log`) |
| 2 | database-indexes | full (both: the 11:43 9x16 had the box bug), sh1-sh6 | DONE 19:24 after critic fixes (STATUS) |
| 3 | ux-research | full (both), sh1-sh6 | DONE 19:58 (sh3/sh5/sh6 re-exported after critic fixes) |
| 4 | phone-distraction | full (both), s01-s07 | DONE 20:18 (after critic fixes: labels, trims, caption) |

After each project: ffprobe / ebur128 / blackdetect, contact sheet, one critic subagent, cheap fixes + re-export, STATUS + CHECKS.

## Engine fixes made in this run (studio/)
- `tools/composite.mjs` footGraph: boxed footage (her picture in a box: half-and-half, corner cam) got a LATER box's position and
  crop when the graph decoded ahead (one sendcmd before the split). Now per-branch sendcmds (crop after the branch's select,
  overlay position on the overlay's main input). Symptom was an empty paper half (claude-rule full 1:37-1:47). Every export made
  before 18:15 on 2026-10-13 with `"boxed": true` may have it (database-indexes full 9x16 of 11:43: re-export).
- `runtime/layouts.js`: pop-around plates clamped inside the frame; words-behind-her shrink to fit the width; film `fit: 'safe'`
  falls back to contain when cover would cut > 4 % of the content band (9:16 half panels cut the film's top line).
- `GM_MIN_FREE_GB` env overrides the 8 GB export guard.
- The Mac went into "Thermal Emergency Sleep" at 18:17 during an export; `caffeinate -is` runs for the session.
- ux-research full crashed silently (ffmpeg `write EPIPE`): the boxed-footage graph's per-group `select` made ffmpeg queue 4K frames
  until macOS killed it. Branches now get every frame (tiny 16x16 crop outside their runs). `FF_V=info` shows ffmpeg's log.
- `talking-head.json` "pad" set: database-indexes #0E1013, ux-research #1D3A32, phone-distraction #0C0D10. End cards 4-5 s.

**Run complete 2026-10-13 20:20.** Open items per project are in each STATUS.md (talking-head + shorts rows, CHECKS table).

# To export after content pass (CONTENT agent, 2026-10-14)
Not exported by the content agent (disk ~2.8 GB free). Everything below changed: "ILLUSTRATION" / disclaimer labels removed
from the four films (moments show the film inside, so they change too), and long film-only stretches now bring her picture back
(`talking-head/moments/common.js` in each project: cutaways > 6 s split into ~3 s full film + her circle (16:9) / half and half (9:16)).
Order: claude-rule first. After each: `ln -f` into `~/Downloads/<slug>/...`, contact sheet, and check that her picture is in its
box on boxed stretches (the 1:37-1:47 box bug: fix is in composite.mjs; exports must show her, not an empty paper half).

| # | project | items |
|---|---|---|
| 1 | claude-rule | talking-head full (16x9 + 9x16), sh1-sh6, motion film (16x9 + 9x16) |
| 2 | database-indexes | talking-head full (both), sh1-sh6, motion film (both) |
| 3 | ux-research | talking-head full (both), sh1-sh6 (sh1, sh5, sh6 have splits; all show film inserts), motion film (both) |
| 4 | phone-distraction | talking-head full (both), s01-s07 (film inserts lost their labels), motion film (both) |

Thumbnails and carousels are already re-rendered and hard-linked into Downloads (no export needed).

## Export run after content pass (EXPORT agent, 2026-10-14): keep current
Driver: scratchpad `run.sh <slug> <items>` = `studio/build/export-queue.sh` one item at a time, stops under 6 GB free.
Film: `node studio/tools/render.mjs export <slug> --what film --aspect 16x9|9x16 --dir video/_new`, then `mv` over
`outputs/video/<slug>_motion_<size>.mp4` (+ .srt) and `ln -f` into `~/Downloads/<slug>/`. Stems checked fresh first
(`render.mjs meta` + cue key vs `film/build/stems/stems.json`).

| # | project | talking-head full (both) | shorts | film 16x9 | film 9x16 | checks |
|---|---|---|---|---|---|---|
| 1 | claude-rule | DONE 11:56 (16x9 again 12:00 after circle fix) | DONE 11:58 | DONE 12:01 | DONE 12:02 | DONE (STATUS) |
| 2 | database-indexes | DONE 12:08 | DONE 12:14 (sh3 again ~12:45: last cutaway -> top half, label covered the film's code line) | DONE 12:16 | DONE 12:17 | DONE; OPEN: her circle (L11) covers film text bottom-left, see STATUS |
| 3 | ux-research | DONE 12:25 (9x16 again 13:15: 9:16 side panels -> top halves) | DONE | DONE | DONE 12:38 | DONE (STATUS) |
| 4 | phone-distraction | DONE 12:58 | DONE | DONE | DONE 13:08 | DONE (STATUS) |

**Run complete 2026-10-14 13:15.** ~~Open: database-indexes full edit, her circle (L11, bottom-left) covers film text in ~10 places~~
**CLOSED 13:45 (ENGINE agent)**: `TH.corner` `corner: 'bl'|'br'|'tl'|'tr'|'auto'` (default unchanged; other projects' hashes identical).
database-indexes uses 'auto' (common.js); ux-research 4:17-4:38 too. Re-exported database-indexes full 16x9 + 9x16 and ux-research
full 16x9, hard-linked into ~/Downloads/<slug>/talking-head/ (see both STATUS.md).

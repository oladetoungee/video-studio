# dark-patterns thumbnails (set 2026-11-19, reworked from her 50 picks)

7 thumbnails, 1280x720: 02, 04, 08b (UPLOAD), 09, 11, 13 (NEW, copies pick1119-43), 16 (NEW, copies pick1119-45; Test & Compare with 02).
PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit: http://localhost:7700/design/dark-patterns/thumbnails/ . Render: `node render.mjs` (all) or
`node render.mjs 13`. The new folders were written by hand (no generator script); `tools/make-set-*.py` would OVERWRITE content.json
and refer to retired folders: don't run them. Retired (11) in `../../archive/thumbnails-retired-2026-11-19/`. Sheets:
`outputs/_review/thumbnails-2026-11-19.jpg`, `-retired.jpg`. Scores and reasons: STATUS.md 2026-11-19.

---- previous set notes below (history) ----

# dark-patterns thumbnails (set 2026-11-12)

10 thumbnails, 1280x720. PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit: http://localhost:7700/design/dark-patterns/thumbnails/ .
Built by `tools/make-set-2026-11-12.py` (OVERWRITES content.json + index.html; don't run after her studio edits). Shared CSS
`lib/set.css` (font-board fonts copied into `fonts/`). Each content.json records "board" (the thumbnail-board item it copies),
"fonts" (Font N) and "colours" (the specimen colours). Review: `outputs/_review/thumbnails-vs-board.jpg` (`tools/vs-board.py`),
`outputs/_review/thumbnails-320.jpg`. Upload 02 + 'That Countdown Timer Is Fake. 11 Tricks Online Shops Use'; Test & Compare 11, 04.
Old set (2026-11-10) in ~/.Trash/dark-patterns-thumbnails-old-2026-11-12/.

---- previous set notes below (history) ----

# dark-patterns thumbnails (set 2026-11-10, rollout to the HTTP standard)

11 thumbnails, 1280x720, best first. PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit in the studio:
http://localhost:7700/design/dark-patterns/thumbnails/ . The old 22 (studio portraits, shorthand words) are in
`~/.Trash/dark-patterns-thumbnails-old-2026-11-10/`.

- Photos: her 29 Oct shoot, outfit A white shirt (IMG_1550, 1557, 1558, 1559, 1562, 1564), through Enhance photo
  (`studio/.cache/enhance --bg keep --cutout`) + `cutout.swift auto` -> `assets/shoot/<n>.jpg` (room), `<n>-person.png`
  (same box, lines up with the room), `<n>-cut.png` (clean cut-out, no chair). Class `no-lift` on every one that shows her.
- Look: type set 03 (Helvetica Neue 700 + 300, DM Mono labels), pink #FF9EC4 / ink / paper, quiet same-hue line pattern (`.pat`).
- Photo layout: `.pf` (lib/dp.css): `--pw` size, `--pl` / `--pt` place; washed rooms (`.pf.washed`, `--wash`, `--wc`, `--wb`).
- Mix: photo 01 03 06 11 · collage 05 · flat 02 07 08 10 · other 04 09.
- Cold test (fresh agent, PNGs only, then with titles): scores below; fixes applied after it, not re-scored.
- Upload: **01 + 'Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name'**; Test & Compare 06 and 08.
- `tools/make-set-2026-11-10.py` rebuilt this set from scratch (overwrites content.json: don't run it after her edits).

| # | Words on it | Kind | Cold test | Titles (1 = best pair) |
|---|---|---|---|---|
| 01 | Shops do this on purpose | photo | UPLOAD THIS (with title 1) · cold test 7 alone, 8 with title (words changed to "Shops do this on purpose", link bigger after) | Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name / The Tricks Online Shops Use to Make You Say Yes / Dark Patterns Explained: 11 Tricks Websites Use on You |
| 02 | dark patterns, explained | flat | cold test 8 / 8.5 | The Tricks Online Shops Use to Make You Say Yes / What Are Dark Patterns? 11 Examples From Online Shops / Dark Patterns in UX: 11 Examples and Why Companies Use Them |
| 03 | I didn't add this | photo | cold test 7.5 / 8 (cart text bigger after) | Dark Patterns Examples: How Online Shops Trick You / Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot / Dark Patterns Explained: 11 Tricks Websites Use on You |
| 04 | Hidden fees | other | cold test 7 / 7.5 (her face added, labels + arrow bigger after) | Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot / Dark Patterns Examples: How Online Shops Trick You / What Are Dark Patterns? 11 Examples From Online Shops |
| 05 | tricks online shops use | collage | cold test 6 / 7 (words moved, bigger, heavy on pink strips, one sticker dropped after) | What Are Dark Patterns? 11 Examples From Online Shops / Dark Patterns Explained: 11 Tricks Websites Use on You / That Countdown Timer Is Fake. 11 Tricks Online Shops Use |
| 06 | Can't cancel? | photo | Test & Compare B · cold test 8.5 / 8.5 | Dark Patterns Explained: 11 Tricks Websites Use on You / Dark Patterns in UX: 11 Examples and Why Companies Use Them / Dark Patterns Examples: How Online Shops Trick You |
| 07 | Already ticked for you | flat | cold test 7.5 / 8 (price bold after) | Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot / Dark Patterns Explained: 11 Tricks Websites Use on You / The Tricks Online Shops Use to Make You Say Yes |
| 08 | This timer is fake | flat | Test & Compare C · cold test 8.5 / 8.5 | Dark Patterns Examples: How Online Shops Trick You / What Are Dark Patterns? 11 Examples From Online Shops / Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot |
| 09 | Is this legal? | other | cold test 7 / 8 (paper ground, line rewrapped after) | Are Dark Patterns Illegal? What EU and US Law Says / Dark Patterns Explained: 11 Tricks Websites Use on You / Hard to Cancel Subscriptions? 11 Dark Patterns Explained |
| 10 | Only 2 left? | flat | cold test 6 / 6.5 (A MONTH LATER, her face added after) | Dark Patterns Examples: How Online Shops Trick You / Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot / What Are Dark Patterns? 11 Examples From Online Shops |
| 11 | Why apps keep asking | photo | cold test 7.5 / 8 (calmer wall, bigger buttons after) | Dark Patterns in UX: 11 Examples and Why Companies Use Them / Dark Patterns Explained: 11 Tricks Websites Use on You |

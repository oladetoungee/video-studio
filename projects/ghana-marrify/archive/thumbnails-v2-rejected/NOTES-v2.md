# Thumbnails: notes (ghana-marrify)

## Files
- **Edit in the browser:** http://localhost:7700/design/ghana-marrify/thumbnails/ (studio). Click text to rewrite it, drag blocks, swap
  her photo (Photos panel: "Cut-outs" has every expression we pulled, "Video frames" the full 4K stills), change ground/accent colours.
  It writes each direction's `content.json` and exports with `render.mjs`.
- **Source:** `directions/NN-name/index.html` (layout) + `content.json` (text, photo, colours, paired title). Shared look in
  `lib/base.css` (same tokens as reading-stack), flat flags in `lib/flags.js`, content binding in `lib/bind.js`.
- **Render:** `node render.mjs` → `outputs/thumbnails/*.png` (1280×720) + `overview.png`; `node render.mjs 04` renders one.
- **Small-size check:** `python3 tools/review.py` → `review/review_sheet.png` (full, 320×180 and 168×94, with a 5:12 duration badge).
- **Her photos:** `tools/frames.json` (chosen 4K frame times + what she's doing) → `zsh tools/frames.sh` re-extracts them (takes the
  shared render lock), cuts them out with macOS Vision (`studio/tools/cutout.swift`, raw in `assets/cut/raw/`) and cleans them
  (`tools/clean.py` + `tools/clean.json`: the gaming chair behind her shoulders and the odd hand fragment removed by hand-drawn
  polygons). Her footage is never flipped or retouched; only the masks change. Face boxes: `swift tools/faces.swift <png>`.
- `node_modules` is a link to reading-stack's (puppeteer-core); `npm install` here if that project ever moves.

## How the frames were chosen
Whole recording scanned at 2 frames/s as face crops (13 contact sheets), ~20 candidates pulled at 30 fps windows and scored for
sharpness, best frame per moment kept. The footage is soft and green-tinted (room light), so faces read well at feed size but are less
crisp than a lit studio shot. All expressions are real moments; the time is in each direction's description.

## Directions (final: 3 ship, 4 archived)
Cold critic = a fresh agent each round that saw only the PNGs (full, 320×180, 168×94 with the duration badge) and the paired titles.
Scores are overall /10 with the paired title.

| # | Folder | Thumbnail | Her frame | Paired title | Critic R1 → R2 → R3 |
|---|---|---|---|---|---|
| 04 | `04-divorce-searchable` | Ghana flag · **YOUR DIVORCE, SEARCHABLE.** (keyword in a white box) on full-bleed orange | 1:08, hand over mouth, wide eyes | Ghana Launched an App to Check If Someone Is Married (hers, #1) | **8 → 7 → 8** (R2 asked for Ghana: added) |
| 01 | `01-one-search` | **ANYONE CAN SEE THIS.** + a generic search result (MARRIED / DIVORCED, labelled ILLUSTRATION) | 2:48, side-eye toward the card | Ghana Launched an App to Check If Someone Is Married | 6.5 → 7 → 7 (**8 with title 1**) |
| 06 | `06-married-check` | Ghana flag · **MARRIED? DIVORCED? LOOK IT UP.** on paper | 1:15, incredulous | Should Marriage and Divorce Records Be Public? (hers, #3) | 7 → 7.5 → 7 (R3 fixes applied after: background wedge by her neck and hand fragment removed, "LOOK IT UP." 10% bigger; not re-scored) |

Archived in `projects/ghana-marrify/archive/` (move a folder back into `directions/` to edit or render it again; last PNGs in `archive/thumbnails-round2/png/`):
- `thumbnails-round1/05-public-fair` ("PUBLIC. SEARCHABLE. FAIR?"): 4. No subject, "tired three-word formula".
- `thumbnails-round2/02-yes-or-no` (her yes/no data-minimisation idea as a redacted record): 4.5 → 3. Reads as a quiz or a form; the
  idea needs the video to land. Better as a carousel slide or a film moment than a thumbnail.
- `thumbnails-round2/03-same-record` (Estonia "NOBODY CARES." vs Ghana "STIGMA."): 5.5 → 4. Very legible, but both critics read it as
  reducing Ghana to one negative word; Ghanaian viewers could take it as condescending. Her point is about an African context and
  women, said with care; a thumbnail can't carry that care.
- `thumbnails-round2/05-records-public` ("MARRIAGE RECORDS, NOW PUBLIC." on off-black): 5. News-ticker feel, off-black melts into
  dark-mode YouTube, tone clashes with "I love…".

## Recommended test
Title 1 for all + Test & Compare **04 vs 01 vs 06** (details and title alternatives in `../YOUTUBE.md`).

## Honest weaknesses
- **Cut-out edges.** Vision flattens her cheek on the side away from the light (01: the right jaw looks slightly clipped at full size;
  fine at feed size) and leaves a soft edge on the hair crown. The chair behind her and stray hand fragments were removed by hand
  (`tools/clean.json`). If she has a sharper photo of herself making one of these faces, drop it in through the editor's Photos panel.
- **The footage is soft and green-tinted**, and skin highlights are bright (R3 suggested pulling them down ~15%). We did not grade or
  retouch her face: ask her first.
- **Hand over mouth (04)** is a classic YouTube pose; it is also a real moment of hers (1:08, reacting to how much is online in
  Estonia), used here for a different line. Her expression, not a staged one, but not tied to the divorce point in the video.
- 01's search box is an illustration, not Marrify's interface (no name, no logo, labelled). Don't swap in a real screenshot without
  checking it.


# database-indexes: three looks for the motion film (directions, 2026-10-13)

Phase: DIRECTIONS ONLY (`projects/DIRECTIONS-BRIEF.md`). Nothing is built yet: she picks a look first.
The video is an 11-minute technical explainer, so the "peculiar video type" is a **diagram film**: the database's own
structures (rows, a B-tree, a query plan) are the stage, built step by step on her words.

Each direction folder has `frames/` (4 stills 16:9 + 2 stills 9:16), `contact.jpg`, an 8-9 s motion test in 16:9
**with sound effects** (no voice, no music yet) and its `_sheet.jpg` (3 frames a second), plus the HTML page that draws it.
Pages are seek(t) pages (`_tools/kit.js`): every frame is a pure function of t, so they port straight into studio scenes.
Render: `node _tools/render.mjs stills <page> 16x9|9x16 <outdir> name=t …` / `video <page> 16x9 out.mp4 t0 t1 30 2`
(takes `/tmp/gm-render.lock`); sound: `python3 _tools/sfx.py in.mp4 out.mp4 sound@time[:dB[:peak|start[:maxlen]]] …`
(library sounds, each one's loudest peak on its frame). Fonts in `_fonts/` (all OFL, see `LICENCES.txt`); Helvetica Neue
for the shorts is loaded with `local()` only, never copied.

Honesty: all rows, names, row numbers and the "database book" index are made up and labelled "Illustration". The
bob / dave / alice walk is credited to Sergey Egorenkov's Medium article. EXPLAIN output is real PostgreSQL wording
(`EXPLAIN (COSTS OFF)` so no invented costs): `Seq Scan on users` + `Filter:`, `Index Scan using idx_email on users` +
`Index Cond:`. B-tree facts follow BRIEF.md: "about 20 comparisons", "a few levels, 3-4 page reads", never "20 disk reads".
The B-tree is drawn as a real B+tree (2 keys per node shown, pointers between keys, leaves pointing at rows).

---

## A · Query Plan (`A-queryplan/`), RECOMMENDED
**Concept.** A Manim-style diagram film. An off-black ground with a faint 60 px grid, hairline white strokes that draw
themselves, and ONE colour, yellow, which is always *the path the query takes*: the scan cursor, the walk down the
B-tree, the pointer to Bob's row, the `Index Scan` line. Code types on whenever she reads SQL or Laravel. Everything
she explains becomes a diagram you can follow with your eyes.
**Built from:** 3Blue1Brown / Manim explainers (strokes drawing on, the camera following one path); Skillry Opus 5.5
explainer category ("how QR codes hold and repair a message", "how a mechanical keyboard works", the Manim derivative
explainer); her R1 TixFox reference for type-on + one thing that *does something* per scene (`inspiration/know-how/MOTION-REFERENCES.md`);
Mr. Claude's "concept built term by term" prompt.
**Look.** Ground `#0E1013` + grid lines `#181B20` every 60 px; ink `#ECEAE4`; dim `#7A808A`; hairlines `#2C313A`;
panels `#15181D`; accent yellow `#FFC53D` (only for the query's path). IBM Plex Sans 600 headlines (76-92 px, -0.02em),
IBM Plex Mono for code (32-38 px) and labels (30-32 px). Left-aligned, one diagram per frame.
**Motion.** Strokes draw with outExpo over 0.4-0.55 s, levels staggered 0.25-0.3 s, siblings 3 f; type-on at ~40
characters a second; the query token moves inOutQuart 0.55 s along each edge; compare flashes 0.15 s in / 0.3 s out;
found = solid yellow fill in 0.2 s; slow 2.5 % push over each 8 s hold. Nothing linear except the scan counter.
**Signature transitions (carriers).** (1) The yellow path itself: the camera follows the line into the next node or
table (match cut on the line). (2) Type-on: a new code line types and the diagram builds under it. (3) Hard cut on a
word for the big contrasts (Seq Scan / Index Scan).
**Sound roles.** typing bed while code types (`keyboard-typing`, cut to length), chalk / pencil while strokes draw
(`chalk-line`, `pencil-short`), ui ticks on each comparison (`ui-select-click`, `ui-modern-select`), `correct-answer`
on found, `pop-dry` on the row; risers + `hit-short-bass` only for chapter turns; whoosh none in the test.
**Stills.** A1 full table scan (counter 469,871 / 1,000,000, made-up rows) · A2 the B-tree walk, bob < dave, bob > alice,
found · A3 EXPLAIN before / after · A4 "up to 1,000,000 checks" vs "about 20 comparisons" · A5/A6 9:16.
**Risk.** Off-black + Plex is close to phone-distraction A's dark lock-screen base: A's identity is the grid, the
hairlines and the single yellow path (keep all three in every scene). Dark films need the light/dark alternative the
studio already offers.

## B · Index Warehouse (`B-warehouse/`)
**Concept.** An isometric data film: the database is a building of blocks. A table is a slab of row layers, an index is
a slim sorted stack beside it, a query is a green block that moves. Best at *cost*: one new order drops onto the table
and six index stacks each take a new card (counter 1 → 7).
**Built from:** Mr. Claude's "isometric workflow" prompt (blocks rise, a dot travels); isometric warehouse / logistics
explainers on whatships.com; R1 TixFox counters.
**Look.** Concrete ground `#DCE2E8`; faces `#FBFCFD` / `#C9D1D9` / `#AAB5C0` with 2 px ink `#15191E` edges; accent
green `#00A86B` (faces `#008F5B`, `#00764B`); visited blocks `#3F4853`. Space Grotesk 700 headlines, Martian Mono labels.
(v1 used sage + orange; changed after the critic found it matched ux-research C.)
**Motion.** Falling blocks with gravity (ease-in) and a damped bounce (e^-6t); cards drop in 0.32 s, 0.3 s apart;
B-tree floors light top to bottom 0.7 s apart.
**Sound roles.** `hit-short-bass` on the order landing, `typewriter-single-hit` per index card, `bell-service-ding` on
"7", `card-place`, ui ticks per floor, `correct-answer` on the leaf.
**Risk.** Iso blocks make EXPLAIN, code and the phone book awkward; labels have to sit off the blocks; the B-tree tower
shows levels but no keys. Strongest as a few inserts (cost, scan), weakest as the whole film.

## C · Directory (`C-directory/`)
**Concept.** Printed reference material as the stage: a phone book with guide words (OBI / OJUKWU), thumb tabs (A-B …
Y-Z), dot leaders, and the index at the back of a book. "Found" = the line printed in reverse. Her own examples
(Adeyemi, Okafor, Ada, Chidi) carry the composite-index chapter: Ada Okafor is one lookup; "everyone named Ada" means
pages 12, 418 and 961, so "Pages to read: 1,000 of 1,000".
**Built from:** real telephone directories and book indexes (guide words are literally how a B-tree node routes a
search); R5 "talent manager" tag + bullet type-on.
**Look.** Directory yellow `#F4CC2E`, page cream `#FFF8E2`, ink `#141414`; Schibsted Grotesk 800 headlines, 400/800
listings; Oswald 600 for guide words, tabs and page numbers. 3 px ink rules, no shadows.
**Motion.** Pages slide up 0.55 s outExpo; the tab pulls out 0.35 s; a found line reverses in one frame; the spread
leaves sideways 0.35 s inOutQuart and three pages fan in 0.12 s apart.
**Sound roles.** `book-paging-single`, `card-flick` on the tab, `pop-hard-click` on found, `page-turn-big` on the turn,
shutters on each Ada, `book-browsing-fast` under the page counter, `wood-hard-hit` on "All of them".
**Risk.** Perfect for the book index, the phone book and composite indexes; no natural home for EXPLAIN, Laravel or the
B-tree, which is most of the 11 minutes. Yellow + heavy black type is near phone-distraction B and ux-research B.

---

## Talking-head (full edit) style frames (`TH-talkinghead/`, in look A, over her real footage, never flipped)
Frames from `kit/database indexes.mov` at 2:05, 2:56, 3:40, 6:25; person mattes by macOS Vision.
- TH1 **L5 half and half** (2:05 "what mechanism…"): the B-tree walk on the left half, her on the right.
- TH2 **L2 behind her** (2:56): "B-TREE" in yellow behind her head, her caption under it.
- TH3 **L7 pop-around** (6:25): hash, bitmap, spatial, full-text as four small diagram cards around her (labelled illustration).
- TH4 **L11 corner cam** (3:40): the EXPLAIN scene full frame, her in a yellow-ringed circle bottom-right.

## Shorts style frames (`SH-shorts/`)
SH3 "how a database index works" (raw 2:03.0-2:52.0, ends before the 2:52 slip), her caption spec from
`inspiration/know-how/SHORTS-PLAYBOOK.md`: white label box (Helvetica Neue Regular, top 130 px; 72 px instead of 82 so the
26-character label fits inside 1080 with margins), caption Helvetica Neue Medium 76 px `#DFD7CB` on black 40 %, centre
y ≈ 1535. One still over her footage (4K crop to 9:16), one over the film's 9:16 B-tree scene.

---

## Critic scores (fresh critic agent, harsh motion director, default reject)
Two rounds. Round 1: A 7.0, B 5.5, C 6.5, TH 7, SH 6. Fixes made between rounds (exactly): A grid added (60 px,
`#181B20`); tree draws from 0.8 s (type-on 0.1-1.0 s); A1 row ids follow the counter and a match turns yellow only after
the cursor passes; A2 tree moved up 40-60 px, credit one block of 32 px ending above y 1010; step 2 now "bob > alice
right of alice"; the bob token fades out 6.0-6.25 s instead of sitting on a line; all labels 30-32 px; A5 tree rebuilt for
9:16 (x 62..1018); A6 heading rewrapped (no widow). B palette changed (sage + orange -> concrete `#DCE2E8` + green
`#00A86B`) and the write-cost line corrected; B5 moved inside y 370..1440. C highlight padding 14 px both sides; C5
heading no longer breaks the name; C6 total and label no longer touch; tabs inside x 1018; C test re-timed (no 2.3 s hold).
TH2 word 290 px; TH3 labels 26 px. Motion-test sound levelled: A -17.3, B -18.5, C -19.8 LUFS (effects only, peaks <= -1.4 dBFS).

| | fit | originality | craft | phone readability | correctness | overall |
|---|---|---|---|---|---|---|
| A Query Plan | 9 | 7 | 8 | 7 | 9 | **8.0** |
| B Index Warehouse | 6 | 5 | 6 | 7 | 6 | **6.0** |
| C Directory | 7 | 5 | 7 | 8 | 8 | **6.5** |
| Talking-head frames | | | | | | **7.5** |
| Shorts frames | | | | | | **7** |

Open (not fixed, on purpose or for the build): B4/B6 branch boxes read as a staircase and have no keys; B3 pointer
arcs should read index -> row; C's yellow + heavy black type repeats phone-distraction B and ux-research B; TH4 circle
must clear YouTube's end-screen zone in the last 20 s; SH caption tracking is her measured -0.08..-0.12 em (letters touch
on purpose: her spec); SH film token should travel 20 px left of the path.

## Recommendation
**A · Query Plan**, the only one at the 8/10 bar, and the one that fits a technical explainer: every chapter (scan,
B-tree, CREATE INDEX + Laravel, EXPLAIN, write cost, LOWER() and LIKE '%…', foreign keys, ORDER BY + LIMIT) has a
natural diagram in it. For the composite-index chapter, fold in C's best idea (the phone book with guide words, Ada Okafor
vs every Ada on pages 12 / 418 / 961) redrawn in A's line style: hairline pages, yellow = the found line. B's
"1 new order = 7 writes" can become A's cost scene drawn flat. Not to be shown as separate looks unless she asks.

## Open questions for her
1. Which look: A, B or C (or A with C's phone book redrawn in A's line style for the composite chapter)?
2. A is a dark film: happy with dark as the main mode (the studio's light-mode button still gives a paper version per screen)?
3. Shorts label size: her measured 82 px makes "how a database index works" wider than the screen; OK to use 72 px for long labels?

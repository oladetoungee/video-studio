# database-indexes: patterns of the finished project

Written 2026-11-01, after the video was posted. "Database indexes explained": a plain-language explainer for developers whose app gets slow as it grows (full table scan, what an index is, the B-tree walk, adding one in SQL and Laravel, EXPLAIN, index types, the cost, two mistakes, the PostgreSQL foreign key gotcha, when to add one).

**The finished MP4s were moved to the Bin on 2026-11-01.** What is left is this folder: contact sheets (`sheets/`, one per MP4, timestamps on every frame) and full-size stills (`stills/`). The motion film can be re-rendered in the studio (http://localhost:7700/edit/database-indexes/; the voice is still in `kit/transcripts/` and `film/audio/`). The talking-head edit, the shorts and the teaser **cannot** be re-exported: her raw recording went to the Bin on 2026-10-30. Thumbnails and carousels (PNG/PDF) stay in `outputs/`.

Sources: `../STATUS.md`, `../BRIEF.md`, `../film/HANDOFF.md`, `../film/stills/directions/README.md`, `../design/HANDOFF.md`, `../design/thumbnails/NOTES.md`, `../kit/refined-kit.md`, `../film/film.json`, `../film/data/transitions.json`, `../film/build/qa/soundqa.json`, `../talking-head/talking-head.json`, `../talking-head/moments/full.js`, and the house files `FEEDBACK.md`, `STATE.md`, `THUMBNAILS.md`.

---

## Every MP4, its length and its sheet

| File (was in `outputs/`) | Size | Length | Sheet |
|---|---|---|---|
| video/database-indexes_motion_16x9.mp4 (motion film) | 1920x1080 | 10:33.5 | [sheet](sheets/video__database-indexes_motion_16x9.jpg) |
| video/database-indexes_motion_9x16.mp4 | 1080x1920 | 10:33.5 | [sheet](sheets/video__database-indexes_motion_9x16.jpg) |
| talking-head/talkinghead-full_16x9.mp4 (the file she uploaded) | 1920x1080 | 10:24.4 | [sheet](sheets/talking-head__talkinghead-full_16x9.jpg) |
| talking-head/talkinghead-full_9x16.mp4 | 1080x1920 | 10:24.4 | [sheet](sheets/talking-head__talkinghead-full_9x16.jpg) |
| teaser/teaser-database-indexes_16x9.mp4 (v2, "movie trailer") | 1920x1080 | 1:17.4 | [sheet](sheets/teaser__teaser-database-indexes_16x9.jpg) |
| teaser/teaser-database-indexes_1x1.mp4 | 1080x1080 | 1:17.4 | [sheet](sheets/teaser__teaser-database-indexes_1x1.jpg) |
| teaser/teaser-database-indexes_4x5.mp4 | 1080x1350 | 1:17.4 | [sheet](sheets/teaser__teaser-database-indexes_4x5.jpg) |
| teaser/previous-v1/teaser-database-indexes_16x9.mp4 (v1, superseded) | 1920x1080 | 1:33.2 | [sheet](sheets/teaser__previous-v1__teaser-database-indexes_16x9.jpg) |
| teaser/previous-v1/teaser-database-indexes_1x1.mp4 (v1) | 1080x1080 | 1:33.2 | [sheet](sheets/teaser__previous-v1__teaser-database-indexes_1x1.jpg) |
| teaser/previous-v1/teaser-database-indexes_4x5.mp4 (v1) | 1080x1350 | 1:33.2 | [sheet](sheets/teaser__previous-v1__teaser-database-indexes_4x5.jpg) |
| shorts/short01-index-every-column_9x16.mp4 | 1080x1920 | 0:53.7 | [sheet](sheets/shorts__short01-index-every-column_9x16.jpg) |
| shorts/short02-composite-phone-book_9x16.mp4 | 1080x1920 | 1:13.4 | [sheet](sheets/shorts__short02-composite-phone-book_9x16.jpg) |
| shorts/short03-how-an-index-works_9x16.mp4 | 1080x1920 | 0:49.9 | [sheet](sheets/shorts__short03-how-an-index-works_9x16.jpg) |
| shorts/short04-is-your-index-used_9x16.mp4 | 1080x1920 | 0:39.6 | [sheet](sheets/shorts__short04-is-your-index-used_9x16.jpg) |
| shorts/short05-postgres-foreign-keys_9x16.mp4 | 1080x1920 | 0:31.1 | [sheet](sheets/shorts__short05-postgres-foreign-keys_9x16.jpg) |
| shorts/short06-index-ignored_9x16.mp4 | 1080x1920 | 0:47.2 | [sheet](sheets/shorts__short06-index-ignored_9x16.jpg) |
| shorts/short07-why-apps-get-slow_9x16.mp4 | 1080x1920 | 0:52.0 | [sheet](sheets/shorts__short07-why-apps-get-slow_9x16.jpg) |
| shorts/short08-what-is-an-index_9x16.mp4 | 1080x1920 | 0:36.2 | [sheet](sheets/shorts__short08-what-is-an-index_9x16.jpg) |
| shorts/short09-add-an-index_9x16.mp4 | 1080x1920 | 0:20.8 | [sheet](sheets/shorts__short09-add-an-index_9x16.jpg) |
| shorts/short10-btree-and-unique_9x16.mp4 | 1080x1920 | 0:48.1 | [sheet](sheets/shorts__short10-btree-and-unique_9x16.jpg) |
| shorts/short11-more-index-types_9x16.mp4 | 1080x1920 | 1:00.2 | [sheet](sheets/shorts__short11-more-index-types_9x16.jpg) |
| shorts/short12-clustered_9x16.mp4 | 1080x1920 | 0:38.6 | [sheet](sheets/shorts__short12-clustered_9x16.jpg) |
| shorts/short13-when-to-index_9x16.mp4 | 1080x1920 | 0:55.0 | [sheet](sheets/shorts__short13-when-to-index_9x16.jpg) |

Lengths measured with ffprobe on 2026-11-01. Shorts lengths include her 6-7 s "FULL VIDEO ON YOUTUBE" outro clip.

## Stills (full size, picked from the sheets)

| Still | What it shows |
|---|---|
| [film 0:54](stills/film-16x9_0054_full-table-scan-counter.jpg) | Full table scan: rows ticking past, the big counter (868,361 of 1,000,000), yellow cursor row |
| [film 2:18](stills/film-16x9_0218_btree-walk-finds-bob.jpg) | The signature: the B-tree walk, yellow path dave -> alice -> bob, steps on the right, arrow to Bob's row, Egorenkov credit |
| [film 3:24](stills/film-16x9_0324_explain-seq-vs-index-scan.jpg) | EXPLAIN before / after: Seq Scan vs Index Scan (real PostgreSQL wording) |
| [film 5:36](stills/film-16x9_0536_phone-book-every-ada.jpg) | Composite index as a phone book: every Ada lit across three pages |
| [film 6:36](stills/film-16x9_0636_spatial-near-me.jpg) | Spatial index: the map grid, only the box around you checked |
| [film 7:42](stills/film-16x9_0742_we-cannot.jpg) | Single-sentence screen "We cannot." + INSERT / UPDATE / DELETE |
| [film 10:32](stills/film-16x9_1032_end-card.jpg) | End card: "Database indexes", @WithGbemi, the tree with one yellow node |
| [film 9:16 2:18](stills/film-9x16_0218_btree-walk.jpg) | The same B-tree screen recomposed for 9:16 (not cropped) |
| [full edit 0:42](stills/th-16x9_0042_corner-circle-over-film.jpg) | Corner circle: her face in a yellow-ringed circle over the full film screen |
| [full edit 1:12](stills/th-16x9_0112_card-what-is-an-index.jpg) | Chapter card: "WHAT IS A DATABASE INDEX?" on off-black, one yellow phrase |
| [full edit 2:36](stills/th-16x9_0236_btree-behind-her.jpg) | Words behind her: "B-TREE" huge, her head in front of the type |
| [full edit 5:06](stills/th-16x9_0506_half-phone-book.jpg) | Half and half: her on the left, the phone-book film on the right |
| [full edit 6:30](stills/th-16x9_0630_half-spatial-serif-word.jpg) | Half and half with a serif keyword pop ("only places around") |
| [full edit 7:36](stills/th-16x9_0736_shout-we-cannot-word-by-word.jpg) | Shout: "WE CANNOT" building word by word over her full frame |
| [full edit 9:16 2:06](stills/th-9x16_0206_film-top-her-below.jpg) | 9:16 full edit: film on top, her below, captions with one word on a blue highlight |
| [teaser 0:00](stills/teaser-16x9_0000_countdown-title.jpg) | Cold open: yellow countdown ring "3" + "DATABASE INDEXES" huge |
| [teaser 0:14](stills/teaser-16x9_0014_scan-counter.jpg) | Film insert: the scan counter (990,615 rows checked) |
| [teaser 1:01](stills/teaser-16x9_0101_every-index-has-a-cost.jpg) | Keyword pop "every index has a *cost*" (serif italic accent word) |
| [teaser 1:10](stills/teaser-16x9_0110_wont-use-it.jpg) | The biggest line: "won't *use it*" (music stops under it) |
| [teaser 1:14](stills/teaser-16x9_0114_her-outro-clip.jpg) | Her own "FULL VIDEO ON YOUTUBE" outro clip |
| [teaser 4:5](stills/teaser-4x5_0003_her-full-frame-captions.jpg) | 4:5 version: her centred, bold two-line caption on a dark plate |
| [teaser v1 (old)](stills/teaser-v1-old_16x9_0030_for-comparison.jpg) | Superseded v1 (smooth montage), for comparison only |
| [short01](stills/short01-index-every-column_at14s4.jpg) · [short02](stills/short02-composite-phone-book_at48s4.jpg) · [short03](stills/short03-how-an-index-works_at20s8.jpg) · [short04](stills/short04-is-your-index-used_at20s8.jpg) · [short05](stills/short05-postgres-foreign-keys_at20s8.jpg) · [short06](stills/short06-index-ignored_at23s6.jpg) · [short07](stills/short07-why-apps-get-slow_at6s5.jpg) | One still per short (film on top, her below, label at the top; short07 is the "MORE USERS. A SLOWER APP." shout) |
| [short08](stills/short08-what-is-an-index_at23s6.jpg) · [short09](stills/short09-add-an-index_at11s6.jpg) · [short10](stills/short10-btree-and-unique_at23s6.jpg) · [short11](stills/short11-more-index-types_at36s4.jpg) · [short12](stills/short12-clustered_at14s4.jpg) · [short13](stills/short13-when-to-index_at20s8.jpg) | |

---

## 1. The look: "A · Query Plan"

She picked direction A of three (A Query Plan 8.0, B Index Warehouse 6.0, C Directory 6.5 at the direction critic). It is a Manim-style diagram film: the database's own structures (rows, a B-tree, a query plan) are the stage, built on her words.

- **Ground**: off-black `#0E1013` with a faint 60 px grid, grid lines `#181B20`. Panels `#15181D`, hairlines `#2C313A`. Each screen also has a light (paper) version in the studio, but the posted film is dark.
- **Ink** `#ECEAE4`, dim text `#7A808A`.
- **One accent: yellow `#FFC53D`**, and it only ever means *the path the query takes*: the scan cursor, the walk down the tree, the pointer to the row, the `Index Scan` line, the found entry. Red appears only for errors (Seq Scan as the bad answer, struck lines).
- **Fonts**: IBM Plex Sans 600 for headlines (76-92 px, -0.02em tracking, sentence case, left-aligned), IBM Plex Mono for code (32-38 px) and labels (30-32 px). Registered in the film as "QP Sans" / "QP Mono" from `film/assets/fonts/` (OFL).
- **Over her footage** (talking-head, shorts, teaser): big white grotesque type (shouts, words behind her), one serif italic accent word for keyword pops ("cost", "use it", "around", "small", "million", "clustered"), the film's off-black as the padding colour when a half slides in.
- Layout rule: left-aligned, one diagram per frame, lots of empty grid.

## 2. The motion film

- **Length**: 10:33.5 exported (voice tightened from 657 s raw to 628.9 s: 19.5 s of silence, her 2:52 slip, the garbled Laravel aside, the third "Seq Scan", two repeats, six long pauses; `film/data/cutlist.json`). Intro 0.6 s, outro 4.0 s.
- **Scenes**: 55 screens (54 cuts in `film/data/transitions.json`), every one in 16:9 and a recomposed 9:16. Scene scripts: `qp.js` (the kit: palette, strokes, code type-on, B-tree node, table, phone-book page, chapter card), `s1.js` open + ch 01-02, `s2.js` ch 03 + add + EXPLAIN, `s3.js` ch 04 types, `s4.js` cost + ch 05 + recap + end. Average screen ~11.5 s, but inside each screen something builds every 2-4 s.
- **How sections are introduced**: a chapter card that is the video's plan drawn as a query path: a short vertical list of the five parts on the right ("Without an index / What an index is / How it finds a row / The types / Mistakes") with a yellow dot moving down to the current one, a mono "02 / 05" number and a two-line Plex question on the left ("What is a database index?", "How does it find things so fast?"). Seen at 1:12, 1:48, 3:54, 8:24 on the sheet.
- **Transitions**: 51 of 54 cuts are hard cuts on her word between twin off-black grounds, with the next screen opening half-built (scene starts +0.1 s, runs 0.16 s ahead for 0.32 s). 3 are match cuts where the same query line stays on screen across the cut (books table -> "no idea", SQL -> Laravel, composite -> tip). No wipes, no whoosh transitions.
- **Signature moves**:
  1. Code types on (~40 characters a second, with real key-click sounds) whenever she reads SQL or Laravel, and the diagram builds under it.
  2. The scan counter: rows stream past, a big Plex counter climbs to 1,000,000 (the only linear motion in the film).
  3. The B-tree walk (Sergey Egorenkov's bob/dave/alice example, credited on screen): yellow token moves inOutQuart 0.55 s per edge, compare flashes 0.15 s in / 0.3 s out, the found key fills solid yellow in 0.2 s, an arrow drops to Bob's row, "levels read 3 of 3".
  4. EXPLAIN before / after with real PostgreSQL output (`COSTS OFF`, no invented costs) and the MySQL `type` column (ALL vs ref / range).
  5. Phone book (from direction C, redrawn in A's hairlines): Ada Okafor is one lookup; "everyone named Ada" lights rows on three far-apart pages.
  6. "1 new order = 7 writes" bar chart (from direction B, drawn flat): six index bars + the table, the last bar white.
  7. Single-sentence screens for the punchlines: "Very problematic.", "Usually much smaller.", "We cannot.", "Small table? It skips your index.".
  8. Strokes draw with outExpo over 0.4-0.55 s, levels staggered 0.25-0.3 s, siblings 3 frames apart; slow 2.5 % push over long holds.
- **9:16**: recomposed, not cropped. Content sits in a band in the upper 60 % (labels kept inside y 370..1440), code and labels >= 28 px, tabs dropped. On the sheet the lower third is often empty grid.

## 3. Full talking-head edit (the uploaded video)

- `talkinghead-full_16x9.mp4`, 10:24.4, same voice cuts as the film plus the silent first 19.35 s. Her captions on.
- Layout mix, measured from the studio's own timeline for this edit (`composite.mjs meta ... full --aspect 16x9`, 114 segments over 624.4 s) and matching the sheet:

| Layout | Segments | Time | Share |
|---|---|---|---|
| Corner circle (L11): film full screen, her face in a 216 px yellow-ringed circle, corner picked automatically to avoid text | 27 | 183.5 s | 29 % |
| Half and half (L5): her on one side, a film panel on the other | 16 | 163.5 s | 26 % |
| Her full frame talking (L1, jump-cut reframes, keyword pops on top) | 32 | 119.1 s | 19 % |
| Film-only cutaway (L9), max ~3 s alone before her picture comes back | 17 | 53.1 s | 8.5 % |
| Stack (film top, her below) | 5 | 42.4 s | 7 % |
| Chapter cards (L10) | 7 | 21.5 s | 3.5 % |
| Words behind her (L2, "B-TREE") | 4 | 17.5 s | 3 % |
| Shout (big words over her, built word by word: "WE CANNOT", "TYPES OF", "WHEN") | 5 | 16.2 s | 2.5 % |
| Pops (things popping around her) | 1 | 7.6 s | 1 % |

Plus 22 keyword overlays (serif-accent phrases) on the talk stretches. In short: she is on screen almost all the time, the film is on screen about 75 % of the time, and the same layout is never used twice in a row. Rule kept in `talking-head/moments/common.js`: a film-only cutaway longer than 6 s keeps ~3 s full frame, then her picture comes back.
- **9:16 version**: film panel on top (about 1130-1150 px), her below; the corner circle moves to a top corner above the film's content band.
- Sound in the edit: 172 cues, mostly pops (44), film ticks (24), swipes (19) and film pops/draws; music Mixkit 157 under the whole thing.

## 4. Caption style

- **16:9 full edit**: her words in a thin, light sans (lowercase, sentence fragments), centred near the bottom, on a dark see-through plate when over film or beside her circle. Keywords as separate pops with one serif italic word. After her note of 2026-10-15, captions also run over full-screen film parts and corner-circle parts, and keyword captions end 0.6 s after their phrase.
- **9:16 full edit**: smaller bold white words with one word on a blue highlight box (see the 9:16 still).
- **Shorts and the teaser's 1:1 / 4:5**: her style: bold Helvetica, white, two lines, centred, on a dark see-through plate, placed on her half (below the film panel) so they never cover the diagram.

## 5. Shorts

13 shorts (6 on 2026-10-13, 7 more on 2026-10-15 after her "no cap at 6" rule), all 9:16, each opening on its topic line and ending on her own "FULL VIDEO ON YOUTUBE" clip (6.8 s, replaced our end card on 2026-10-16).

Framing, the same in every short: a **top label in white boxes with black text** (one box per line, two lines), then either her full frame or **film panel on top + her below** (film panels zoom to fill after her 10-15 note), keyword shouts on her full frame (short07 "MORE USERS. A SLOWER APP." with "SLOWER" in yellow).

| Short | Label on screen (as edited by her) | Length | Critic score |
|---|---|---|---|
| SH1 index-every-column | You should not add a database index on every column | 0:53.7 | 6 before fixes (not re-scored) |
| SH2 composite-phone-book | Composite Database Indexes | 1:13.4 | 4 before fixes |
| SH3 how-an-index-works | How does a Database Index work? | 0:49.9 | 6 before fixes |
| SH4 is-your-index-used | is your index being used? | 0:39.6 | 5 before fixes |
| SH5 postgres-foreign-keys | MySQL vs PostgreSQL foreign keys | 0:31.1 | 6 before fixes |
| SH6 index-ignored | Why your Database Index gets ignored | 0:47.2 | 5 before fixes |
| SH7 why-apps-get-slow | why your database gets slow | 0:52.0 | 8.5 (fresh re-score) |
| SH8 what-is-an-index | what is a database index? | 0:36.2 | 8 |
| SH9 add-an-index | how to add a database index | 0:20.8 | 7.5 |
| SH10 btree-and-unique | Common Database Indexes | 0:48.1 | 7 |
| SH11 more-index-types | more Database Index types | 1:00.2 | 7 |
| SH12 clustered | clustered vs non-clustered indexes | 0:38.6 | 7.5 |
| SH13 when-to-index | when to add a database index | 0:55.0 | 8 |

Posting order from the kit: SH7, SH8, SH3, SH9, SH4, SH10, SH2, SH11, SH12, SH1, SH6, SH5, SH13 (the long video's order). Music per short rotates Mixkit 102 / 157 / 160. Loudness -14.0 to -14.2 LUFS, true peak about -1.9 dBTP.

## 6. Teaser (LinkedIn and X)

- **v1** (2026-10-14, superseded): 1:33.2, smooth cold-open montage, 3-2-1 countdown as a draining yellow ring, "-- new video:" label in SQL-comment style, film inserts, end card as a query result row; music Mixkit 766. Critic 6.5 -> 7.
- **v2 "movie trailer"** (2026-10-15, posted version, 1:17.4 after her outro clip replaced our end card): her note was "not smooth; move from point to point with visible transitions, like a movie teaser".
  - Countdown 1.5 s with DATABASE INDEXES huge -> act 1 the problem -> title card (she renamed "02 THE FIX" to "DATABASE INDEX") -> act 2 the fix -> card THE CATCH -> act 3 the catch -> music stops (tape stop) for "You can have a database index and the database still won't use it." -> title card DATABASE INDEXES -> her outro clip.
  - Cuts: flash / black / whip (opaque accent panel) / glitch, never the same twice in a row; cut sounds flash, boom, swipe, glitch hit; risers into the cards.
  - Music in sections (Mixkit 766): act 1 -10 dB, act 2 -5, act 3 0, title + end +4; silent under the biggest line.
  - The MySQL / PostgreSQL foreign-key bites were cut (too niche for a trailer).
  - 16:9 + 1:1 + 4:5 exported; 9:16 available in the editor, not exported.
  - Critic: 5 -> 6.5 (2 rounds); round-2 fixes applied, not re-scored.

## 7. Thumbnails

- We made **26 directions** (`outputs/thumbnails/01-…png` to `26-…png` + `overview.png`), 4 critic gate rounds: A = cold topic/click critic, B = title + thumbnail pair, C = taste vs her samples.
- Our top 3 by the final gate: **05 reads-every-row** (A 5/7, B 8, C 7), **07 index-like-a-book** (A 5/7, B 8, C 7), **20 collage-explained** (A 5/5, B 8, C 8, the only taste 8). Other high pairs: 02, 03, 04, 13 (B 8).
- **What won: her own thumbnail.** On 2026-10-16 she said "Our thumbnails are not solid enough, I cannot use any of them" and made her own from our parts: `kit/database indexes (1).png` (also saved as `inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png`). It is: the topic name "Database Indexes" huge, one big literal mechanism (book index card -> yellow arrow -> table row), her small black-and-white cut-out with an orange outline, clean dark grid ground, one yellow. It became the quality bar in `THUMBNAILS.md` (topic name plain and huge, one clear idea drawn big, few big elements, calm closed-mouth face).
- Title posted with it: S1 "Database Indexes: Why Your App Slows Down as It Grows" (recommended; her own outro clip shows "How to make your Database Query faster? (Database Indexes - System Design)", so check YouTube for the final title).
- Why ours lost (critics + her): one dim webcam angle for every photo, 6-12 small labels and UI bits stacked on a cluttered frame, topic not named plainly.

## 8. Carousels

- **Instagram**: 8 slides, 1080x1350, `outputs/carousels/instagram/01.png`-`08.png` + `overview.png`. Hook: "Why your app gets slower as it grows" with two phones (10 users / 100,000 users). Query Plan look.
- **LinkedIn**: 7 slides + `outputs/carousels/linkedin/carousel.pdf` + PNGs + `overview.png`. Hook: "Your index exists. Your database ignores it." (2 reasons Postgres skips your index, 1 index it never creates, how to check).
- 6 cold-critic rounds; last scores IG 7.5 (fixes then applied), LI 8. Editors /design/database-indexes/carousels/instagram/ and /linkedin/.

## 9. Sound

- **Film music**: Mixkit 157 "Opalescent", 102 "Xanthos", 160 "Focus on Yourself", looped with 6 s crossfades, ducked 13 dB under her voice (measured voice over music while speaking: 13.9 dB).
- **Full edit**: Mixkit 157. **Shorts**: 102 / 157 / 160 in rotation. **Teaser**: Mixkit 766 (track name not recorded).
- **Film sound effects** (213 cues): ticks 56, pops 32, pencil/chalk draw 26, real key-typing 26, hits 20, found 16, error 10, page 8, card 7, risers 5, swipes 4, ding 2, shutter 1, tape stop 1. **No whooshes at all** in the film. Riffle cues dropped (buried under her voice).
- Sync: 137 of 213 cues within one frame, 0 late by more than 2 frames, 13 early. Audibility: median +3.7 dB over voice and music; 86 of 213 under +3 dB (mostly ticks and typing under speech).
- **Loudness**: film -14.2 LUFS, true peak -1.9 dBTP (after AAC -1.1); full edit -14.1 LUFS, TP -1.3 dBTP; shorts -14.0 / -14.1, TP about -1.9; teaser -14.0, TP -1.9. Phone-band drop -1.3 dB.

## 10. Critic scores per round

| Piece | Rounds | Scores |
|---|---|---|
| Film directions (A / B / C) | 2 | A 7.0 -> 8.0, B 5.5 -> 6.0, C 6.5 -> 6.5 |
| Motion film | 3 | 6.5 -> 7.5 -> **8.0 PASS** |
| Full talking-head edit | 1 | 6/10 before fixes (not re-scored) |
| Shorts SH1-SH6 | 1 | 6, 4, 6, 5, 6, 5 before fixes (not re-scored) |
| Shorts SH7-SH13 | 2 | round 1 average 6.3 -> fresh re-score 8.5, 8, 7.5, 7, 7, 7.5, 8 |
| Teaser v1 | 2 | 6.5 -> 7 |
| Teaser v2 | 2 | 5 -> 6.5 |
| Thumbnails | 4 gates | top: 05 / 07 at pair 8, taste 7; 20 at taste 8 |
| Carousels | 6 | IG 7.5, LI 8 (last round) |

**What made the film reach 8/10** (from the direction critic's breakdown and the film checks): fit 9 and correctness 9: every chapter has a natural diagram (scan, tree, CREATE INDEX, EXPLAIN, write cost, LOWER(), LIKE '%…', foreign keys, ORDER BY + LIMIT), and the facts were checked first (`BRIEF.md`: "about 20 comparisons", never "20 disk reads"; clustered "in MySQL and SQL Server"; real PostgreSQL EXPLAIN wording). One accent with one meaning (yellow = the query's path) made every screen readable at a glance. Code always typed on when she read it. The film's measured checks were clean: 0 dead holds, 0 linear moves, 0 dead stops, 4,278 texts with 0 contrast failures, every cut carried and written down. Rounds 1-3 fixed collisions (page labels, recap line, readouts, composite-tip labels) and 9:16 type size (>= 28 px).

## 11. Her feedback on this project

- 2026-10-13: picked film look A · Query Plan (with C's phone book and B's "7 writes" folded in).
- 2026-10-14 (house rule): no "ILLUSTRATION" labels on anything she posts: 14 removed from the film, carousel and thumbnail 11.
- 2026-10-15, full edit: the "Full table scan" title was cut off at 0:55 in a half panel; **long stretches with no caption** over full-screen film and corner-circle parts ("it should have caption"); two keyword captions on top of each other ("put EXPLAIN" over "is it used?", "rarely searched" over "a small table?"). All fixed; new checks `caption-gaps`, `keyword-overlap`.
- 2026-10-15, teaser: "not smooth; move from point to point with visible transitions, like a movie teaser" -> v2. Card "02 THE FIX" -> "DATABASE INDEX"; title cards and "new video" label were not editable (fixed).
- 2026-10-15, shorts: the top label could not be resized (fixed); 9:16 film panels "don't use the space… maximize it so the graphic looks bold" (fixed: panels zoom to fill, up to 1300 px).
- 2026-10-16: her "FULL VIDEO ON YOUTUBE" clips end every short and the teaser. Chapters 16 -> 7. Our 26 thumbnails rejected; her own used. Refined kit merged into one file.
- 2026-10-18: captions and posts "not in my tone, in my voice": long-form posts rewritten from `HER-VOICE.md`.
- Open listen-checks she was asked about: "books priced between 10 and 15" (kit said 50) and "titles that start with Harry". Answer not recorded.

## 12. What to beat next time

- **Thumbnails** (weakest part overall): none of 26 used. Next time start from her bar: topic name huge, one literal mechanism, few big elements, calm face, and get real photos (one dim webcam angle capped every photo-led option).
- **Teaser**: lowest video score (v2 6.5). The trailer structure works; the critics wanted a louder cold open, bigger topic type and harder card slams.
- **First six shorts**: scored 4-6 before fixes and were never re-scored; SH2 stayed long (1:13) and SH6 opened on "and there are several mistakes". The later seven (7-8.5) show what works: open on the topic line, cut the opener that needs the long video.
- **Small film text in 9:16 panels**: EXPLAIN output and code inside 9:16 halves are ~20-24 px, too small on a phone. The 9:16 film also leaves the lower third empty on many screens.
- **Full edit**: 6/10 at its only critic round; near-empty frames at 0:34-0:36 and 10:00-10:05 (film type-on timing), 9:25-9:40 sparse; at 5:24-5:34 her circle still touches the page strip.
- **Sound**: 86 of 213 film effects under +3 dB over the bed (ticks and typing get lost under speech); "1,000,000 rows" box in the film is near-black (seen in SH7 at 0:43).
- **List shorts** (SH10, SH11) sat at 7: a list of types needs one strong picture per item or a sharper single claim.

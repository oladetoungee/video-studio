# database-indexes: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/database-indexes/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


"Database indexes explained": a plain-language explainer for developers whose app is getting slow as it grows. What a database does without an index (full table scan), what an index is (the back of a book), how it finds one row in a million (bob/dave/alice, B-tree), adding one (SQL + Laravel), checking it with EXPLAIN (PostgreSQL + MySQL), the types (B-tree, unique, composite with the phone book; hash, bitmap, spatial, full-text; clustered vs non-clustered), the cost of indexing every column, two mistakes that make the database ignore an index, the PostgreSQL foreign key gotcha, and when to add one. Created 2026-10-12. **Everyone reads `BRIEF.md` first** (what she actually says vs the kit, whisper fixes, verified facts).

## Kit (`kit/`)
- `database indexes.mov`: her recording, 4K, 10:57 (657 s). **0:00-0:20 is silence**: trim it (chapters in the refined kit give raw and trimmed times).
- `transcripts/`: whisper small.en (`transcript.srt`, `transcript.json`, `transcript.words.json`, `voice16k.wav`). Many misheard terms ("B3", "sex scan", "rules" for rows, "Sony" for surname): the correction list is in `BRIEF.md`.
- `database-indexes-kit.md`: her content kit, version 4 (script she read from, titles, description, tags, shorts scripts, 22-clip breakdown, captions, X posts, carousel, essay, sources). **Not the source of truth**: what she says wins; several kit lines are not in the recording (listed in `BRIEF.md`).
- `refined-kit.md`: the strategist's research + titles, thumbnail concepts, description, captions, hooks, shorts plan (see below).

## Deliverables
| Item | State |
|---|---|
| Brief (`BRIEF.md`) | **Done** 2026-10-12: what she says (timed), kit lines not in the recording, whisper corrections, verified technical facts (simplified lines marked: "about 20 steps" = comparisons, a real B-tree is 3-4 levels; "always fix this"; clustered index does not apply to PostgreSQL; composite "usually" right because of PostgreSQL 18 / MySQL skip scan; bitmap not creatable in PostgreSQL/MySQL; spatial = the "near me" part). |
| Refined kit (strategist) | **Done, waiting on her pick** 2026-10-12: `kit/refined-kit.md`. Live research: no news hook (evergreen; PostgreSQL 19 still beta; the live conversation is apps built fast getting slow as data grows). Outliers: problem/mistake/contrast titles break out ("Database Indexes - You Might Be Using Them Wrong" 5.8x, "Postgres and MySQL Indexes Are Completely Different" 28x, "7 Simple Tricks… SQL Queries" 8.4x); plain definitions don't. Keywords: "database indexes explained", "database indexing explained", "how do database indexes work", "sql indexes explained", "types of database indexes", "how to make sql query faster". 15 titles (8 search-led, 7 click-led; all 40-60 characters, keyword in the first 40, checked by code), 22 thumbnail concepts each paired with 2 titles, description (first two lines stand alone), chapters (raw + trimmed), tags (488 characters), captions per platform for the main post and 8 shorts, short-form hooks, carousel slide-1 options (Instagram + LinkedIn), sources. Two cold-review rounds. **Top 3 pairs: T12 "FAST… THEN SLOW?" + S1 "Database Indexes: Why Your App Slows Down as It Grows"; T07 "IS IT USING THE INDEX?" + C2 "Added an Index and It's Still Slow? Check This First"; T06 "LOWER() BREAKS IT" + C6 "Why Your Database Ignores Your Index (2 Common Mistakes)".** |
| Motion film (studio project in `film/`, 16:9 + 9:16) | **Done, for her review** (2026-10-13, FILM agent). Look A · Query Plan, with C's phone book (composite chapter) and B's "1 new order = 7 writes" drawn flat. Voice tightened 657 s -> 629 s (`film/data/cutlist.json`: 19.5 s silence, the 2:52 slip, the garbled Laravel aside, the third "Seq Scan", 2 repeats, 6 pauses). 55 screens, every one in 16:9 and a recomposed 9:16, light/dark per screen. Critic: 6.5 -> 7.5 -> **8.0 PASS** (3 rounds). Exports: `outputs/video/database-indexes_motion_{16x9,9x16}.mp4` (+ .srt), copies in ~/Downloads/database-indexes/. Editor: http://localhost:7700/edit/database-indexes/ . Checks table in `film/HANDOFF.md`. |
| Full talking-head edit with graphics | **Exported 2026-10-13 19:21 (EXPORT agent), both sizes**: `outputs/talking-head/talkinghead-full_16x9.mp4` + `talkinghead-full_9x16.mp4` (+ .srt), 10:24 each, -14.1 LUFS, TP -1.7 dBTP; hard-linked in ~/Downloads/database-indexes/talking-head/. The 11:43 9:16 had the engine's boxed-footage bug (her half could show on the wrong side), so it was redone. Critic (fresh, 1 round): 6/10 before fixes. Fixed: cream strip / panels while a half slides in (talking-head.json "pad": the film's off-black), overlapping keywords at 7:35, stray quote marks in captions. Open [film content]: 0:34-0:36 and 10:00-10:05 near-empty frames (the film's own type-on timing), 9:25-9:40 sparse. Editor: http://localhost:7700/moment/database-indexes/full/ |
| Shorts | **+7 more shorts 2026-10-15 (SHORTS agent section at the bottom).** **Exported 2026-10-13 19:22-19:24 (EXPORT agent)**: `outputs/shorts/short01-index-every-column` (51 s) · `short02-composite-phone-book` (71 s, now opens on "The third one is the composite index…") · `short03-how-an-index-works` (47 s, the pointer and the 20-steps film now stay up) · `short04-is-your-index-used` (37 s, ends on the ALL / ref / range line, the EXPLAIN slip cut) · `short05-postgres-foreign-keys` (28 s) · `short06-index-ignored` (44 s, the wildcard picture stays while she explains it), all `_9x16.mp4` + .srt, -14.0/-14.1 LUFS, TP <= -1.7; hard-linked in ~/Downloads/database-indexes/shorts/. End cards 4 s. Film panels now sit below the top label. Critic scores before fixes: sh1 6, sh2 4, sh3 6, sh4 5, sh5 6, sh6 5. Open: small film text in 9:16 splits (EXPLAIN output, code), sh2 still 71 s, sh6 opens on "and there are several mistakes". Editors: http://localhost:7700/moment/database-indexes/sh1/ … sh6 |
| YouTube thumbnails (at least 20) | **Done, waiting on her pick** 2026-10-13 (DESIGN agent): 26 directions, 4 gate rounds (cold topic, title pair, taste), closed-mouth frames, own type (IBM Plex + serif), varied layouts. Editor http://localhost:7700/design/database-indexes/thumbnails/ ; `outputs/thumbnails/` + overview.png; `design/thumbnails/NOTES.md` (references, titles, scores per round). **Recommended:** 05 reads-every-row + "Database Indexes: Why Your App Slows Down as It Grows"; 07 index-like-a-book + "Database Indexing for Beginners: Fix Slow SQL Queries"; 20 collage + S1. Copy in ~/Downloads/database-indexes-thumbnails/. |
| Instagram carousel (1080×1350) + LinkedIn carousel (PDF) | **Done** 2026-10-13: Instagram 8 slides ("Why your app gets slower as it grows"), LinkedIn 7 slides + carousel.pdf ("Your index exists. Your database ignores it."), Query Plan look, `build.mjs` checks clean, 6 cold-critic rounds (last: IG 7.5 -> fixes applied, LI 8; every remaining item fixed). Editors /design/database-indexes/carousels/instagram/ and /linkedin/ ; copy in ~/Downloads/database-indexes-carousels/. |

## Waiting on her
- Pick a film look: A · Query Plan (recommended), B · Index Warehouse or C · Directory (`film/stills/directions/README.md`, contact sheets + motion tests in each folder). Also: OK with a dark film as the main mode? OK with 72 px series labels on long shorts labels?
- Pick a title + thumbnail pair (top 3 above), or point at others in `kit/refined-kit.md`.
- Photos for thumbnails: her holding an open book at its index page, a thick phone book, a laptop (the frames from the recording are dim and all one pose).
- Listen-checks for the captions: "books priced between 10 and 15" (kit says 50) at ~4:36; "titles that start with Harry" (whisper heard "Ari") at ~4:43.
- Shorts: cut from this recording (our plan) or re-record the kit's shorts scripts?

## Her pick (2026-10-13)
Film look approved: see film/stills/directions/README.md (recommended direction A). Build phase started per projects/BUILD-BRIEF.md.


## Waiting on her (FILM agent, 2026-10-13)
- Listen: "books priced between 10 and 15" (~4:11 in the film; her kit says 50). Both whisper passes hear 10 and 15; the film shows `BETWEEN 10 AND 15`.
- Listen to the sound mix (measured only: -14.2 LUFS, sound effects mostly within one frame).
- (Disk wait resolved 19:24: talking-head 16:9 + 9:16 and the 6 shorts exported.)

## CHECKS: talking-head + shorts export (EXPORT agent, 2026-10-13)
| id | result | note |
|---|---|---|
| her-words | fixed | critic read every .srt vs BRIEF corrections (B-tree, hash, Seq Scan, rows, column, can't…): clean; stray quote marks removed from the words (`talking-head/data/raw_words.json`), "Seq Scan" capitalised; sh4's "you can use, and that confirms" slip trimmed |
| text-safe-area | fixed | shorts: film panels start below the label (was covering panel titles in all six) |
| no-collisions | fixed | 7:35 two keywords on top of each other (one removed) |
| type-size | n/a | open: film code / EXPLAIN text small in 9:16 splits (film content, [big]) |
| frame-sheet | pass | sheets looked at; blackdetect hits are the off-black design ground |
| dead-holds | fixed | sh3 / sh4 / sh6 film inserts extended over her explanation; open: full 0:34-0:36, 10:00-10:05 |
| banned-list | pass | flat off-black + grid, one yellow |
| loudness | pass | -14.0 to -14.1 LUFS, true peak -1.7 to -1.9 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, H.264 + AAC |
| editable | pass | /moment/database-indexes/full/, /sh1/ ... /sh6/ |
| delivered | pass | hard links in ~/Downloads/database-indexes/talking-head/ and shorts/ |
| reading-time, motion-craft, sync | n/a | engine layouts and cues unchanged in this run |

## Content pass: labels + missing footage (CONTENT agent, 2026-10-14)
- **Labels removed (14)**: film `qp.js` illus() is now a no-op (13 "Illustration · made-up rows / names / places / store / people / token" labels across s1-s3); `s2.js` "Illustration · real nodes hold hundreds of keys" -> "Real nodes hold hundreds of keys" (16:9 only). Carousel (instagram) two tags ("ILLUSTRATION", "Illustration, made-up rows"); thumbnail 11-near-me "ILLUSTRATION". Credits kept ("Simplified, after S. Egorenkov", "Example after Sergey Egorenkov, Medium").
- **Missing-footage segments fixed** (old times): full 0:34, 0:59, 1:28, 1:53 (12 s), 2:10, 3:28 (11 s), 4:06 (14 s), 4:40 (15 s), 5:21 (15 s), 5:53 (12 s), 6:34 (14 s), 7:12, 7:50, 8:30, 9:15, 9:33 (16 s) (both sizes); sh1 0:09.5-0:18; sh2 0:00-0:15 and 0:40-0:53; sh3 0:04-0:21 (17 s) and 0:31-0:38; sh4 0:09-0:33 (24.5 s); sh5 0:05.5-0:12.5; sh6 0:11.5-0:23.5 and 0:30.5-0:39.
- **Rule now in `talking-head/moments/common.js`** (every moment of this project, full + shorts): a film-only cutaway (L9) longer than 6 s keeps ~3 s full frame (cut on a word start), then her picture comes back: 16:9 her circle over the same film (L11), 9:16 half and half (film on top, 1130 px; her below). `keepAlone: true` on a TH.cutaway call opts out. Audit after: no stretch without her longer than ~6 s except L10 cards and L6 cut-outs (she is in those).
- Engine bug (her picture at a later box's place, claude-rule 1:37-1:47): fix present in `studio/tools/composite.mjs` (per-branch sendcmds); every current export was made after it (2026-10-13 19:05+). The stills tool does not exercise that path: confirm on the re-export's contact sheet.
- Stills: instagram carousel + thumbnail 11 re-rendered and hard-linked into ~/Downloads/database-indexes-carousels/ and -thumbnails/.
- **Needs re-export** (not run: disk ~2.8 GB): motion film (16x9 + 9x16), talking-head full (both), every short. See `projects/EXPORT-HANDOFF.md`.

## Re-export after content pass (EXPORT agent, 2026-10-14 12:04-12:43)
All replaced in place and hard-linked (inode checked) into `~/Downloads/database-indexes/` (film), `.../talking-head/`, `.../shorts/`.
- talking-head full 16x9 (her captions on) + 9x16: 10:24.4, -14.1 LUFS, TP -1.3 dBTP.
- shorts sh1-sh6: 0:50.9, 1:10.6, 0:47.1, 0:36.8, 0:28.2, 0:44.3; -14.0/-14.1 LUFS, TP -1.8/-1.9.
- motion film 16x9 + 9x16: 10:33.5, -14.2 LUFS, TP -1.1 dBTP (stems fresh, cue key c8fa0bf6).
- **Fix made**: sh3 0:30-0:35 the last full-frame cutaway (about 20 comparisons) had the short's label over the film's
  `SELECT … WHERE email` line: now a top half (`shorts/sh3.js`, film under the label, her below). sh3 re-exported.
- **OPEN (needs an engine option, not changed: studio/ was off limits this run)**: her circle (L11 corner cam, bottom-left,
  216 px at x 48) covers film text that sits bottom-left in this film. 16:9 full, about: 0:36-0:45 (book rows), 1:21-1:27
  (numbers list), 1:57-2:15 ("Real nodes hold hundreds of keys" + leaves), 2:45 (42 -> row 69), 3:57-4:06 (timestamps,
  Harry Potter list), 4:27 (AND first_name), 6:51-7:00 (index on created_at / "like the index at the back of a book"),
  7:27-7:30 (Falling Upward list), 8:00 (users list); 9:16 also at ~2:30 (Egorenkov credit), ~7:15, ~8:00. Suggested fix:
  `TH.corner` option for the circle's corner (`pos: 'tr'`/`'br'`) or auto-pick the emptiest corner from the film canvas, then
  set it in `talking-head/moments/common.js` (split cutaways) and the explicit `TH.corner` calls in `full.js`; re-export full both.

| id | result | note |
|---|---|---|
| her-words | pass | OCR every 2-3 s of all 10 files: 0 "illustration" / disclaimer hits |
| no-collisions | fixed / OPEN | sh3 label over film code fixed; her circle over bottom-left film text in the full edit (above) |
| frame-sheet | pass | contact sheets looked at (edits 1/15 s, shorts 1/3 s, films 1/15 s); her picture in its box on boxed stretches |
| footage-present | pass | no stretch without her > ~6 s (texture scan every 0.5 s; one flag 0:59-1:06 = her circle present, checked) |
| captions | pass | 16:9 full: her captions on and readable |
| loudness | pass | -14.0..-14.2 LUFS, TP <= -1.1 dBTP |
| format | pass | 1920x1080 / 1080x1920, 30 fps, h264 yuv420p + AAC |
| stems-fresh | pass | cue key = meta |
| delivered | pass | hard links, inode match |

## Her circle moved off the film's text (ENGINE agent, 2026-10-14 13:20-13:45)
- `TH.corner` gained `corner: 'bl'|'br'|'tl'|'tr'|'auto'` (studio/README.md "L11 corner"). This project's `talking-head/moments/common.js`
  sets `TH.look.corner = 'auto'`: each corner-cam stretch measures the film under the four possible circles and keeps the emptiest
  corner for the whole stretch. 16:9: 27 stretches, 22 moved (mostly bottom-right, top-right for the B-tree / "Real nodes" and
  Non-clustered stretches). 9:16: 11 stretches; the top corners sit above the film's content band (y 52..354), so the circle no longer
  covers the Bitmap / Non-clustered / "Small table?" / phone book text. Picks + scores: `node studio/tools/composite.mjs meta
  projects/database-indexes/talking-head/talking-head.json full --aspect 16x9` -> `corners`.
- Checked with stills at every listed time in both sizes (0:36-0:45, 1:57-2:15, 3:02-3:05, 3:34, 4:17, 4:27, 6:03-6:11, 7:27, 8:06,
  9:16 1:39/2:07/5:16/6:10/7:23/8:06). The old 1:21-1:27 and 6:51-7:00 times are no corner stretches in the current edit.
  Left (small): 16:9 5:24-5:34 "Everyone whose first name is Ada?": every corner touches something; the circle stays bottom-left
  on the left end of the page strip (its first tick).
- Re-exported 13:31 / 13:35: `outputs/talking-head/talkinghead-full_16x9.mp4` (captions on) + `_9x16.mp4` (+ .srt), 10:24.4,
  -14.1 LUFS, TP -1.3 dBTP, 1920x1080 / 1080x1920 30 fps h264 + AAC; hard-linked (inode match) in ~/Downloads/database-indexes/talking-head/.
  Contact sheets (1 frame / 15 s) looked at: her picture in its circle / half in every boxed frame. Shorts unchanged (no corner cams).

| id | result | note |
|---|---|---|
| no-collisions | fixed | circle vs film text: auto corner (above); 5:24-5:34 small overlap with the page strip left |
| frame-sheet | pass | stills at every listed time + contact sheets both sizes |
| regression | pass | other projects' hashes identical (engine default unchanged) |
| loudness / format / delivered | pass | -14.1 LUFS, TP -1.3; 30 fps h264 + AAC; hard links, inode match |

## Refined kit restructured (KIT EDITOR, 2026-10-14)
- `kit/refined-kit.md` now follows the fixed structure (at a glance, YouTube, thumbnails, the 6 built shorts with captions for every platform + Shorts tags, teaser, carousels, long-form posts, research last); 16 chapters timed to talkinghead-full_16x9.mp4 (motion film times too); untouched copy kept as `kit/refined-kit.v1.md`. Open: teaser file name/length (being built), her title + thumbnail pick, listen-checks at 4:11 ("10 and 15") and 4:22 ("Harry").


## Teaser for LinkedIn and X (TEASER agent, 2026-10-14)
| Item | State |
|---|---|
| Teaser (LinkedIn and X) | **Exported 2026-10-14**: `outputs/teaser/teaser-database-indexes_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:33.2 each, -14.0 LUFS, true peak <= -1.9 dBTP; hard-linked in `~/Downloads/database-indexes/teaser/`. Editor http://localhost:7700/moment/database-indexes/teaser/ (16:9, 1:1, 4:5, 9:16; 9:16 not exported). Bites, order and look in `talking-head/teaser/teaser.js` + `talking-head.json` "teaser". Look: Query Plan (off-black, one yellow): 3-2-1 countdown as a query running (a draining yellow ring, "Database indexes, explained / Why your app gets slow, and the fix"), an SQL-comment label "-- new video:", film inserts (row-scan counter, book index, finding bob, EXPLAIN, "We cannot.", more indexes slower writes, MySQL vs PostgreSQL), end card as a query result row. Music: Mixkit 766 (rises; opens up on the end card). Fresh critic: 6.5 -> 7 (round 2); its fixes 1-4 (blank screen after EXPLAIN, book-index collision, one-word keyword fragments, 1:1 heading margin) and 5-6 made and checked on stills, not re-scored. Spec: `inspiration/know-how/TEASER-PLAYBOOK.md`. |

| id | result | note |
|---|---|---|
| her-words | pass | every bite cut from her corrected words (`talking-head/data/raw_words.json`), whole sentences, edges checked so no bite clips a word or starts inside the previous one; lost-word check 0 (a hold keeps a pause that carried a word); critics found no slips or meaning changes |
| stands-alone | pass | topic in plain words on frame 1 (big type / countdown card) + a "new video" label; critics: topic clear within ~1 s |
| text-safe-area | fixed | 1:1 / 4:5 film inserts re-cropped, oversize zooms reduced after stills; keyword pops shown whole |
| no-collisions | fixed | end cards re-laid, captions step aside where the film spells her words (`noCaps`) |
| type-size | fixed | label 36-44 px at 1920, end-card titles >= 60 px, small film screens zoomed (`zoom`) |
| frame-sheet | pass | contact sheets (1 frame / 2 s) of every 16:9 and 1:1 export looked at; blackdetect / freezedetect on every file: 0 |
| dead-holds | fixed | inserts or keyword pops added in the talking stretches; end card slow push |
| loudness | pass | -14.0 LUFS, true peak -1.9 / -2.0 dBTP (ebur128, after AAC) |
| format | pass | ffprobe: 1920x1080 / 1080x1080 / 1080x1350, 30 fps, H.264 yuv420p + AAC |
| editable | pass | /moment/database-indexes/teaser/ opens (headless check, all four sizes offered) |
| delivered | pass | hard links in ~/Downloads/database-indexes/teaser/ (same inode) |
| sync | n/a | cues placed by the layouts / bite starts; not run through soundqa.py |

## SHORTS agent, 2026-10-15: 7 more shorts (13 in all)
Her rule (10-15): no cap at 6. Whole transcript read; every stretch that stands alone was cut. New (raw times on `kit/database indexes.mov`; critic round 1 average 6.3 -> fixes -> fresh re-score):
| short | label | length | raw | re-score |
|---|---|---|---|---|
| sh7 `short07-why-apps-get-slow` | why your database gets slow | 0:49 | 0:19.5-1:27.6 (agenda cut) | 8.5 |
| sh8 `short08-what-is-an-index` | what is a database index? | 0:33 | 1:27.6-1:56.9 | 8 |
| sh9 `short09-add-an-index` | how to add a database index | 0:18 | 3:10.4-3:30.3 (Laravel aside cut) | 7.5 |
| sh10 `short10-btree-and-unique` | the 2 most common database indexes | 0:45 | 4:22.0-5:03.8 | 7 |
| sh11 `short11-more-index-types` | 4 more database index types | 0:57 | 6:21.2-7:16.1 | 7 |
| sh12 `short12-clustered` | clustered vs non-clustered indexes | 0:36 | 7:19.2-7:51.1 | 7.5 |
| sh13 `short13-when-to-index` | when to add a database index | 0:52 | 9:54.8-10:52.5 | 8 |
Scripts `talking-head/shorts/sh7.js`-`sh13.js`; captions for every platform + tags in `kit/refined-kit.md` section 3 (posting order updated: SH7, SH8, SH3, SH9, SH4, SH10, SH2, SH11, SH12, SH1, SH6, SH5, SH13). Editors http://localhost:7700/moment/database-indexes/sh7/ ... /sh13/. No spares left worth cutting.
Open: sh10 and sh11 are list shorts (7/10); the "1,000,000 rows" box in the film is near-black (sh7 43 s, film content); her "B-tree. B-tree." repeat at sh10 1.8 s (not cut: whisper timing unreliable there).

| id | result | note |
|---|---|---|
| her-words | fixed | captions read against BRIEF corrections; stray next-sentence words cut with exact cuts (RMS-checked); doubled / split words fixed in `talking-head/edits/<id>.json` capShort (and the .srt patched to match) |
| stands-alone | fixed | openers that needed the long video cut (critic round 1); every short starts on its topic line under a plain top label |
| text-safe-area / no-collisions | fixed | full-frame inserts under two-line labels turned into top halves (film starts below the label); hooks placed under the label |
| dead-holds | fixed | inserts start when the film shows something; no empty film > ~1 s (re-score critic) |
| type-size | open | film text inside 9:16 half panels is ~20-24 px (film content, not the shorts) |
| frame-sheet | open | one empty frame where a half hands back to her full frame: engine bug, logged in projects/ENGINE-REQUESTS.md (all shorts, old ones too); re-export after the STUDIO fix |
| loudness | pass | -14.0 to -14.2 LUFS, peak <= -1.5 dBFS |
| format | pass | 1080x1920, 30 fps, H.264 + AAC |
| editable | pass | studio /moment/<slug>/<id>/ |
| delivered | pass | hard links (inode checked) in ~/Downloads/<slug>/shorts/ (the older shorts were missing there; linked too) |


## Teaser v2 "movie trailer" (STUDIO agent, 2026-10-15)
Her note: not smooth; move from point to point with visible transitions, like a movie teaser. **Exported** `outputs/teaser/teaser-database-indexes_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (+ `.srt`), 1:15 each, -14.0 LUFS, true peak -1.9 dBTP, no freezes > 2.5 s; hard-linked in `~/Downloads/database-indexes/teaser/` (v1 files kept in `outputs/teaser/previous-v1/`). Editor http://localhost:7700/moment/database-indexes/teaser/.
Order: countdown 1.5 s (DATABASE INDEXES big) -> act 1 the problem -> card THE FIX -> act 2 -> card THE CATCH -> act 3 -> music stops for "You can have a database index and the database still won't use it." -> card DATABASE INDEXES -> end card (4 s). The MySQL/PostgreSQL foreign-key bites were cut (critic: too niche for a trailer). Cuts: flash / black / whip (opaque accent panel) / glitch, never the same twice in a row; cut sounds flash, boom, swipe, glitchHit; risers into the cards; music in sections (measured on the music track: about +10 dB from act 1 to act 3, +8 dB on each card, silent under the biggest line). Critic (fresh, 2 rounds): 5 -> 6.5/10; round-2 fixes (louder cold open with the topic big, louder bed, harder card slam, shorter end card) applied and checked on contact sheets, not re-scored. Out of scope by her rules: the critics wanted bold white captions; her 16:9 caption style stays.
Also 2026-10-15: every short, the teaser and the full edit re-exported after the engine fix for one empty frame where a half-and-half layout hands back to her full frame.

## Her notes on the full edit (2026-10-15, main session)
- Fixed in the editor (reload http://localhost:7700/moment/database-indexes/full/): 0:55 "Full table scan" title no longer cut off (16:9 halves now show the film's whole content area; the film inside any half can be dragged / resized); captions now run over full-screen film parts and corner-circle parts (dark plate, beside her circle); keyword captions leave 0.6 s after their phrase (were held up to ~10 s with no caption) and never overlap (3:12 "put EXPLAIN", 10:14 "rarely searched").
- **Needs re-export** (full 16:9 + 9:16): not started, she is editing. Shorts / teaser exports are unchanged until re-exported (engine change also gives 16:9 teaser inserts captions).
- 10-15 (2nd note): teaser card 02 now "DATABASE INDEX"; title cards, "-- new video:" and the countdown subline editable; shorts label resizable; 9:16 film panels zoom to fill. **Needs re-export**: teaser (all sizes), all shorts, full 9:16 (engine change also affects phone-distraction / ux-research shorts + teasers when re-exported).
- 10-16: her "FULL VIDEO ON YOUTUBE" clips (kit/landscape|portrait - full video on youtube (1).mp4) end every short + the teaser (talking-head.json `outro`; replaces our end card). **Re-exported 12:16-12:22**: sh1-sh13 (9:16) + teaser 16:9 / 1:1 / 4:5 (77.4 s), all -14.0/-14.1 LUFS, TP -1.9; hard-linked into ~/Downloads/database-indexes/shorts/ and teaser/ (inode checked). Includes her studio edits and the 10-15 fixes. Full talking-head edit not re-exported (no outro there).
- 10-16: her own thumbnail (kit/database indexes (1).png) is the one to post; saved as the thumbnail bar in inspiration/youtube-thumbnail/her-own/.
- 2026-10-30: her raw recording moved to the Bin at her request (to free space). Finished exports in outputs/ are kept; the talking-head edits, shorts and teaser can no longer be re-exported (motion film still can: voice in kit/transcripts).

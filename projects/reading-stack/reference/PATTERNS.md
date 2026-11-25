# reading-stack: what we made and how (reference)

"My current reading stack": how to read a non-fiction book so you remember it (study the structure first: Adler's inspectional
reading, Justin Sung's priming, the TikTok "memorise it" version), shown on Baratta's *How to Read and Write Critically* and
Sanders & Stappers' *Convivial Toolbox*. Built 2026-09-29 to 2026-10-18, posted. **This was the first project in the studio**:
many of the house rules in `CLAUDE.md` and `FEEDBACK.md` were first learned here.
Written 2026-11-01 from the project files and contact sheets of every finished MP4, so the next video can learn from it.

**The finished MP4s were moved to the Bin on 2026-11-01.** The motion film can be rendered again in the studio
(http://localhost:7700/edit/reading-stack/ : her edited voice `film/audio/voice_edit.flac`, scenes and sound are still on disk),
and so can every clip in `outputs/clips/` (they are exports of single film screens or lines). The talking-head moments cannot:
her raw recording went to the Bin (first on 2026-10-15, the rest on 2026-10-30). What is left of them is the sheets and stills below.
Thumbnails (PNG) and carousels (PNG + PDF) stay in `outputs/`.

## The main MP4s (length measured with ffprobe)

| File | Size | Length | Contact sheet |
|---|---|---|---|
| video/reading-stack_motion_16x9_v3.mp4 (current) | 1920x1080 | 15:59.0 | [sheet](sheets/video__reading-stack_motion_16x9_v3.jpg) |
| video/reading-stack_motion_9x16_v3.mp4 (current) | 1080x1920 | 15:59.0 | [sheet](sheets/video__reading-stack_motion_9x16_v3.jpg) |
| video/reading-stack_motion_16x9_v2.mp4 (superseded, the one she approved as a base) | 1920x1080 | 16:00.2 | [sheet](sheets/video__reading-stack_motion_16x9_v2.jpg) |
| talking-head/moment01-problem (16x9 + 9x16) | both | 0:37.4 | [16x9](sheets/talking-head__moment01-problem_16x9.jpg) · [9x16](sheets/talking-head__moment01-problem_9x16.jpg) |
| talking-head/moment02-inspectional | both | 0:25.6 | [16x9](sheets/talking-head__moment02-inspectional_16x9.jpg) · [9x16](sheets/talking-head__moment02-inspectional_9x16.jpg) |
| talking-head/moment03-memorise | both | 0:29.4 | [16x9](sheets/talking-head__moment03-memorise_16x9.jpg) · [9x16](sheets/talking-head__moment03-memorise_9x16.jpg) |
| talking-head/moment04-shelves | both | 0:47.8 | [16x9](sheets/talking-head__moment04-shelves_16x9.jpg) · [9x16](sheets/talking-head__moment04-shelves_9x16.jpg) |
| talking-head/moment05-chapter-one | both | 0:42.5 | [16x9](sheets/talking-head__moment05-chapter-one_16x9.jpg) · [9x16](sheets/talking-head__moment05-chapter-one_9x16.jpg) |
| talking-head/moment06-manual | both | 0:37.9 | [16x9](sheets/talking-head__moment06-manual_16x9.jpg) · [9x16](sheets/talking-head__moment06-manual_9x16.jpg) |
| talking-head/moment07-fiction | both | 0:22.0 | [16x9](sheets/talking-head__moment07-fiction_16x9.jpg) · [9x16](sheets/talking-head__moment07-fiction_9x16.jpg) |

Plus 89 clips in `outputs/clips/` (listed at the end). 105 MP4s in all.

## The look: her own deck style (v2, approved 2026-09-30)

Built from her own slide decks (`inspiration/my-decks/`) and the Pocketsflow promo she loves, after the v1 "night library"
look was rejected. **She later said not to repeat this look** (2026-10-01, when ghana-marrify v1 came back in the same style:
"No two videos must look the same"). Take the craft, not the look.

- **Grounds, flat only**: paper `#EDE9E2`, ink `#111114`, card `#FFFDF6`, full-bleed electric blue `#1B3FD8` for punchlines.
  In the v3 film: 40 paper scenes, 30 ink, 8 blue (measured from `film/data/meta.json`).
- **Accent**: blue, one key word or rule per scene (`#6E8CFF` when it sits on ink). Safety orange `#FF4713` exactly three times
  ("STRUCTURE", "1940", the fiction "!").
- **Type**: Bricolage Grotesque 800 for display (uppercase, -0.03 em tracking, 0.92 leading), Archivo 700 for sentences, DM Mono
  for labels and numbers (uppercase, letter-spaced), Instrument Serif italic for one accent word with a hand underline.
- **Grid**: a thin 160 px grid on some ink and blue slides only.
- **Never**: gradients, glows, vignettes, particles, textures, drama shadows.
- **Vocabulary from her decks**: kinetic statement (small line + huge uppercase, one blue word), numbered index (mono 01 + line +
  hairline rule), full-bleed blue punchline, blue grid + huge number, generic UI mockups with a cursor, polaroid of a real cover,
  outlined meters, one serif accent word.
- **Corner HUD**: the exported v2 and v3 files still show it (`// 01 — the stack` top-left, `HOW TO READ 00:00:42:00` top-right;
  see the stills). She asked for it to be removed for good on 2026-10-01; studio exports since then have no HUD.

Stills: [three books, real covers fan in](stills/film-v3-16x9_00m42_three-books-covers-fan.jpg) ·
[book one, spine becomes the cover](stills/film-v3-16x9_04m31_book-one-spine-to-cover.jpg) ·
[fiction: orange "!" on the real Marple cover](stills/film-v3-16x9_15m29_marple-fiction-exclaim.jpg)

## The motion film (v3, 15:59)

- **Length and scenes**: 959.03 s, 78 scenes (`film/data/meta.json`), 1.8 s title card + her edited voice (951.2 s) + 6 s end card.
  Her 17:58 recording was cut to 15:51: about 29 s of retakes and slips removed and 93 long pauses tightened (98 s), every cut in
  silence with a 35 ms crossfade.
- **Transitions**: a change of ground is a hard cut (62 of 78); a change on the same ground is a 0.26 s horizontal blur whip (16).
  Blue punchline scenes get a colour flood in.
- **Every phrase lands on the word she says it** (whisper word timings): blur to sharp with a small rise, fast in, soft settle.
  Cards slide in, UI text types on with a caret, a cursor clicks, underlines and strikes draw on, highlighter sweeps follow her voice.
- **How sections and books are introduced**: a kinetic statement on ink ("BOOK ONE.", "BOOK TWO."), then the book's real spine
  slides out of her stack and turns into its cover (a shared-element handoff), then the title with words marked in blue, then the
  contents read row by row as she reads them.
- **Recurring objects carry the story**: her real three-book stack (title, book one, book two, "your turn", end card); a 1940 to
  now timeline; the 10-block chapter map (fills while she reads the contents, blocks 05-07 merge into STRUCTURE, every block gets a
  "?" at "my guess"); the shelves (the central metaphor: "you're building the shelves before you put something on them").
- **Diagrams of what she says**: calendar that fills, crosshair that cannot lock on and later does, contents card opening out of a
  book, heading map that thickens, pigeonholes, idea cards piling up, Venn of thinking / writing / reading, parts bar 80 / 50 / 140+
  pages (her numbers), a crowd (everybody / nobody / a select few), a gap and a bridge.
- **Real imagery**: book-only crops from her mirrored footage, flipped so the text reads (her face never flipped, never in the film).
  The spines are soft (cut from a 1080p frame).
- **Measured**: 0 holds over 4 s and 0 dark spans over 2 s in both aspects (`film/tools/holds.mjs`); freezedetect (6 s) found none
  (v2 had 14 holds of 6-8.4 s).
- **9:16** is recomposed per scene (type 15-30 % bigger, visuals in y 370-1440, captions in 1460-1660), not cropped, but it stays
  sparse in places (e.g. the "10 CHAPTERS" contents, 17-20 px contents text).

v3 stills (16:9): [ch 8, four approaches](stills/film-v3-16x9_08m39_ch8-four-approaches-grid.jpg) ·
[page-count bars](stills/film-v3-16x9_11m12_page-count-bars.jpg) ·
[ordinary people crowd](stills/film-v3-16x9_12m48_ordinary-people-crowd.jpg) ·
[blue punchline "A NO-BRAINER"](stills/film-v3-16x9_14m40_blue-punchline-no-brainer.jpg)
v3 stills (9:16): [TikTok version, phone](stills/film-v3-9x16_03m12_tiktok-memorise-phone.jpg) ·
[book one](stills/film-v3-9x16_04m31_book-one.jpg) · [ordinary people](stills/film-v3-9x16_12m48_ordinary-people.jpg) ·
[a sparse 9:16 frame (10 chapters)](stills/film-v3-9x16_05m09_10-chapters-sparse.jpg)
v2 for comparison (type-only, before "more visuals"): [THIS METHOD FIXES (blue)](stills/film-v2-16x9_01m36_this-method-fixes-blue.jpg)

**Versions**: v0 pen-and-paper single-file studio (archived) -> v1 "night library" (indigo gradient, glow, dust, Outfit + Fraunces;
rejected as "tacky", deleted) -> v2 her deck style, mostly type (approved: "a very good place to start", but "we need more visuals",
"give it sound") -> v3 content pass (real covers and spines, diagrams, 279 sound cues). v3 was never confirmed by her in writing.

## Talking-head: 7 "moments", not a full edit

This older project used short moments (her rule then, 2026-10-01: only the best 15-60 s). On 2026-10-12 she replaced that rule:
every later project gets a **full-length** talking-head edit. The first full edit (v1) here was rejected on 2026-09-30 for "hours
of nothing" and an un-mirrored face, and deleted.

- **7 moments**, 22-48 s each, 9:16 (captions burned in) + 16:9 (no burned captions) + .srt. Each opens on a hook and ends on a
  payoff line. Plan with every beat: `talking-head/MOMENTS.md`.
- **Edit**: pauses over 0.42 s cut to 0.24 s, asides and false starts removed, every export transcribed again (word match 85-100 %).
- **Her footage**: never flipped or colour-changed, only cropped. A virtual camera over the 4K source follows her face (Vision
  face track): punch-ins, slow pushes, reframing. In 9:16 the zoom never goes below 1.08.
- **Layouts**: Beside (flat plates of heavy type next to her face: 16:9 left third, 9:16 under her chin), Split (flat panel: 16:9
  left 880 px with her reframed right; 9:16 from y 1110 down with her smaller above), Band (16:9 bottom 34 %), Card (full frame while
  her voice goes on), Punch (camera cut or push in). Where she holds a book (it reads backwards) a correctly oriented polaroid or a
  panel covers it.
- **Mix**: roughly a new graphic event every 1-3 s, no 2 s gap with nothing added (checked by `composite.mjs check`). Ends on a blue
  card with grid for the payoff (m02, m04, m06, m07).
- **Critic round 3: 4-7/10, below the bar.** Panels often near-empty (one label or blank bars), a lone floating word plate, mirrored
  books still visible in places. Next step was to ask her for a talking-head reference to reverse-engineer; it never happened here.

Stills: [m04 split, pile of ideas](stills/moment04-16x9_split-pile-of-ideas.jpg) ·
[m04 beside plates "STRUCTURE FIRST"](stills/moment04-16x9_beside-plates-structure-first.jpg) ·
[m04 blue card payoff](stills/moment04-16x9_blue-card-building-shelves.jpg) ·
[m06 page bars split](stills/moment06-16x9_page-bars-split.jpg) ·
[m01 meter card under her chin (9:16)](stills/moment01-9x16_meter-card-under-chin.jpg) ·
[m01 ink split "READ THE STRUCTURE FIRST"](stills/moment01-9x16_ink-split-read-the-structure.jpg) ·
[m05 dictionary card split](stills/moment05-9x16_dictionary-card-split.jpg) ·
[m07 comic punch "OH. IT DOES!"](stills/moment07-9x16_comic-punch-oh-it-does.jpg)

## Captions

- **Moments (9:16, burned in)**: short chunks of 2-4 words in bold white sans on a black plate, the word she is saying
  highlighted in a blue box. Placed under the graphic plates, or on the panel line in splits. 16:9 moments have no burned captions.
  (This was before her Helvetica short-caption style of 2026-10-17, which replaced it on later projects.)
- **Film**: `.srt` only (`outputs/video/reading-stack_motion_16x9_v3.srt`, video time with the 1.8 s title offset). The studio can
  burn them in: white text on black boxes, bottom centre ([4:5 test with the old HUD](stills/clip-test_4x5_old-hud-and-captions.jpg),
  [9:16 test](stills/clip-test_screen24_tiktok-9x16-captions.jpg)).

## Shorts: her own 5

She cut and posted her own shorts from the recording (files in `inspiration/my-shorts/1007*.MOV`, her label style on screen
"how to read a book (pt N)"); none of our moments were used as shorts. Kit section 3 (`kit/refined-kit.md`) has the text per platform.

| # | Her short | Length | State |
|---|---|---|---|
| SH1 | my current reading stack | 0:22 | to post |
| SH2 | how to read a book (pt 1) | 1:25 | posted |
| SH3 | how to read a book (pt 2): why the method works | 0:49 | to post |
| SH4 | how to read a book (pt 3): priming, on Baratta | 1:56 | posted |
| SH5 | how to read a book (pt 4): page numbers, Convivial | 0:54 | posted |

Our 7 moment captions as spare shorts are archived in `archive/refined-kit-our-moment-shorts.md`.

## Teaser

None, her call (2026-10-18: the raw recording was gone, not worth making from the film or the low-quality previews).

## Thumbnails (PNGs stay in `outputs/thumbnails/`)

Three rounds, each one teaching a rule:
1. **v1 inside-joke directions** ("only the vibe", "Don't start on page 1", "Build the shelves first") failed her "stands alone"
   rule ("what the hell does that even mean?"). Archived in `archive/thumbnails-v1-directions/`.
2. **v2 flat set 01-09** (2026-10-01; flat ground + heavy caps + a cut-out of her). Cold critic best: **06 "01 TITLE. 02 CONTENTS.
   03 MEMORISE." 8/8**, then 05 "JUDGE A BOOK BY ITS CONTENTS." 8/7, 02 "MEMORISE THIS PAGE." 7/7. A 2026-10-16 cold reader gave
   06 only 4/10 ("looks like homework"). **Her own edit** on 01: she swapped our mouth-open cut-out for her own photo pointing at her
   head, about 1.5x bigger. This flat formula later became the thing she did not want repeated (ghana-marrify, 2026-10-06).
3. **Collage set C1-C8** (2026-10-07, her "collage over the creator" samples): her full room photo, 3-4 small real cut-outs (book
   covers, Baratta's contents page from her video, a notebook, coffee), one Playfair Display serif line across her chest, one small
   label. 3 rounds of 3 critics; **none passed all gates** (pass = 8/8 with title and 8 taste).

| Thumbnail | Words | Round-3 scores: cold conf/click · with title clarity/click · taste | Verdict |
|---|---|---|---|
| `outputs/thumbnails/C1-stop-forgetting-books.png` | Stop forgetting books. | 4/6 · 8/7 · 7 | **recommended #1** (kit) |
| `outputs/thumbnails/C3-forgot-what-you-read.png` | Forgot what you read? | 4/6 · 8/6 · 7 | recommended #2 |
| `outputs/thumbnails/C8-why-you-forget-books.png` | Why you forget books / and the fix | 5/7 · 8/6 · 6 | recommended #3 (flat) |
| `outputs/thumbnails/C7-remember-what-you-read.png` | Remember what you read. | 5/6 · 7/6 · 7.5 | runner-up |
| C2, C4, C5, C6 | | 2-4/4-5 · 7-8/5-7 · 5.5-7 | fail |

Kit recommendation: title S9 "How to Remember What You Read: A Method From 1940" with C1, C3 and C8 for Test & Compare.
**Which thumbnail and title she actually posted: not recorded.** Contact sheet `outputs/thumbnails/overview.png`; notes and every
score in `design/thumbnails/NOTES.md`. Critics' repeated complaints: same photo in 6 of 8, the silver mic reads as "a knife",
soft contents page, flat publisher covers. More photos of her (mic lower, brighter room) and phone photos of the real books were asked for.

## Carousels (PNGs stay in `outputs/carousels/`)

Rewritten on 2026-10-01 to stand alone (her rule came from this project). Research and rules: `design/carousels/RESEARCH.md`.
- **Instagram, 8 slides, 1080x1350** (`outputs/carousels/instagram/01.png`-`08.png`, `overview.png`): ink cover "How to remember
  what you read." with the two covers as polaroids; slide 2 a second cover ("So what was that book about?"); blue method slide;
  why it works (shelves); two labelled real examples; a save slide; video as an optional extra on the last slide.
- **LinkedIn, 10 pages + PDF** (`outputs/carousels/linkedin/01.png`-`10.png`, `carousel.pdf`): "Remember what you read for work",
  a numbered 4-step system (STEP N OF 4), a comparison table, where it pays off, a one-page summary.
- Same deck look as the film; every slide carries a number + segmented progress meter; labels at least 32 px (build check).
- Cold critic round 3: Instagram 8/10 clear, 7/10 swipe; LinkedIn 8 / 7. End slides say "How to Actually Remember What You Read"
  and @WithGbemi.

## Sound

- **Music**: Mixkit medley (Sleepy Cat, Lo-Fi 04, A Blue Day, Digital Clouds, Sweet September, Relaxation 04, Serene View, Thinking
  About You), levelled, 5 s crossfades, ducked about 11.5 dB under her voice in speech (voice -17.9 vs music -29.4), rising to -26.7
  in pauses and -20.4 under the title card. Moments: one Mixkit track each, ducked 15 dB under speech, 9 dB in pauses.
- **Sound effects (film v3)**: 279 cues (v2 had 168, v1 329), each on its measured peak at the visual frame. Roles and counts:
  pop 42, whoosh 44, cut 41 (whoosh files), impact 33, pen 29, click 23, book 19, card 19, type 10, page 8, riser 6, tick 5.
  Roughly 3.5-7 dB over the music and 2-6 dB under her voice. So whoosh-type sounds were 85 of 279 (about 1 in 3): this is the
  overuse she later called out ("we are overusing whooshes", 2026-10-12).
- **Loudness (measured)**: film v3 -14.0 LUFS integrated, true peak -1.7 dBTP, range 4.6 LU. Every moment -14.0 LUFS, -1.9 dBTP.
- Nobody listened before hand-off; all levels were set by measurement only.

## Critic scores per round

| Piece | Rounds | Result |
|---|---|---|
| Film v1 "night library" | her review | rejected |
| Film v2 | critic score not recorded | approved by her as a base |
| Film v3 | 6 -> 6.5 -> 7 -> 6.8 (round-4 fixes applied, not re-scored) | below the 8 bar |
| Talking-head moments | round 3: 4-7/10 | below the bar |
| Thumbnails v2 flat | 3 cold rounds, best 06 at 8/8 | not used as main pick |
| Thumbnails collage C1-C8 | 3 rounds x 3 critics, best C1 8/7 with title, taste 7 (C7 taste 7.5) | none passed all gates |
| Carousels | 3 cold rounds: IG 8/7, LinkedIn 8/7 | shipped |
| Refined kit | two cold copy rounds, everything under 8 rewritten | done |

## Her feedback on this project (much of `FEEDBACK.md` started here)

- 09-29: synthesized sound effects were inaudible ("all I hear is whoosh"): wants real, clearly audible, social-media sounds, a
  pencil sound while drawing.
- 09-30: v1 "night library" rejected ("looks like 2027", "tacky"); wants clear colours, clear text, white space. Her taste = her
  decks + the Pocketsflow promo.
- 09-30: talking-head full edit v1 rejected: "hours of nothing"; never un-mirror her face (it looked wrong to her).
- 09-30: v2 approved as "a very good place to start", but "we need more visuals" and "give it sound".
- 10-01: remove the corner HUD permanently. Every piece must stand alone ("only the vibe", "a few minutes before page one" meant
  nothing). Thumbnail wording: "judge a book by its contents is still a little bit okay". Only edit the best moments (later replaced).
- 10-01: Voice / Music / Sound effects toggles; her own studio edit of thumbnail 01 (her expressive photo, bigger).
- 10-01 (on ghana-marrify): this deck look must not be reused: "No two videos must look the same".
- 10-02: volume sliders per stem and sound-only downloads.
- 10-07: more thumbnails in the collage-over-creator style, using her own photos.
- 10-15 / 10-30: posted; raw recording deleted. 10-17: shorts = her own 5. 10-18: no teaser.

## What to beat next time

- **Film**: the 6.8 ceiling. v3 filled the frame but kept repeating headline-left / object-right; next time vary layouts on purpose
  and start from a reference she gives, reverse-engineered frame by frame. Make 9:16 as rich as 16:9 (no 17-20 px text, no
  half-empty frames).
- **A look of its own**: this deck style is now off-limits as a whole; keep only the craft (flat grounds, readable type, one accent).
- **Sound**: about 1 in 3 cues were whoosh-type; keep whoosh to about 1 in 6 and vary (shutters, ticks, typewriter, risers).
  Have her listen before calling it done.
- **Talking-head**: full length, not moments; no near-empty panels or lone word plates; show more of her in 9:16.
- **Real material beats crops from a mirrored, dim recording**: ask early for phone photos of the real objects and several photos of
  her with hands free, so thumbnails and inserts are sharp.
- **Thumbnails**: start from her own references, plain topic words, a mix of kinds; get a set where at least one passes all gates.
- **Record what she posted** (title, thumbnail, file) so the next reference can say what worked.

## All clips in `outputs/clips/` (89 files)

Studio exports of single film screens ("screenN" = scene number N in `film/data/meta.json`) or single caption lines ("lineN"),
made 2026-10-01 to 10-07, almost all with no voice and no music (sound effects only). Who exported them and what for is not
recorded (most likely her, for use in her own edits or shorts). `_tests/` holds early export tests, some with captions and the old HUD.
Several are exact duplicates ("copy 2", "copy 3"). All can be exported again from the film editor (Export: a screen or a line).

Representative stills: [screen05 three books 9:16](stills/clip_screen05_three-books-9x16.jpg) ·
[screen20 inspect](stills/clip_screen20_inspect-16x9.jpg) · [screen28 shelves](stills/clip_screen28_shelves-16x9.jpg) ·
[screen37 challenged?](stills/clip_screen37_challenged-16x9.jpg) · [screen43 A BLOCK: STRUCTURE](stills/clip_screen43_block-structure-16x9.jpg) ·
[screen57 page count 9:16](stills/clip_screen57_page-count-9x16.jpg) · [screen61 book two ch 1, 4:5](stills/clip_screen61_b2-ch1-4x5.jpg) ·
[screen67 bridging 9:16](stills/clip_screen67_bridging-9x16.jpg) · [line191 single line](stills/clip_line191_single-line-16x9.jpg) ·
[test: 4:5 with captions + old HUD](stills/clip-test_4x5_old-hud-and-captions.jpg) · [test: 9:16 TikTok screen with captions](stills/clip-test_screen24_tiktok-9x16-captions.jpg)

| Screen / line | Folder | Length | Versions (sheet links) |
|---|---|---|---|
| line191 | clips | 2.3 s | [16x9](sheets/clips__reading-stack_line191_16x9_novoice_nomusic.jpg) · [9x16 copy 2](sheets/clips__reading-stack_line191_9x16_novoice_nomusic-2.jpg) · [9x16](sheets/clips__reading-stack_line191_9x16_novoice_nomusic.jpg) |
| line192 | clips | 1.7 s | [9x16 copy 2](sheets/clips__reading-stack_line192_9x16_novoice_nomusic-2.jpg) · [9x16](sheets/clips__reading-stack_line192_9x16_novoice_nomusic.jpg) |
| line207 | clips | 4.4 s | [16x9](sheets/clips__reading-stack_line207_16x9_novoice_nomusic.jpg) |
| line208 | clips | 5.0 s | [16x9](sheets/clips__reading-stack_line208_16x9_novoice_nomusic.jpg) |
| line209 | clips | 5.4 s | [16x9 copy 2](sheets/clips__reading-stack_line209_16x9_novoice_nomusic-2.jpg) · [16x9](sheets/clips__reading-stack_line209_16x9_novoice_nomusic.jpg) |
| screen05-three-books | clips | 31.4 s | [16x9 copy 2](sheets/clips__reading-stack_screen05-three-books_16x9_novoice_nomusic-2.jpg) · [16x9 copy 3](sheets/clips__reading-stack_screen05-three-books_16x9_novoice_nomusic-3.jpg) · [16x9 copy 4](sheets/clips__reading-stack_screen05-three-books_16x9_novoice_nomusic-4.jpg) · [16x9](sheets/clips__reading-stack_screen05-three-books_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen05-three-books_9x16_novoice_nomusic.jpg) |
| screen06-today | clips | 12.0 s | [16x9](sheets/clips__reading-stack_screen06-today_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen06-today_9x16_novoice_nomusic.jpg) |
| screen07-read-a-book | clips | 5.9 s | [16x9](sheets/clips__reading-stack_screen07-read-a-book_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen07-read-a-book_9x16_novoice_nomusic.jpg) |
| screen08-question | clips | 4.6 s | [16x9](sheets/clips__reading-stack_screen08-question_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen08-question_9x16_novoice_nomusic.jpg) |
| screen11-fixes-that | clips | 2.4 s | [16x9](sheets/clips__reading-stack_screen11-fixes-that_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen11-fixes-that_9x16_novoice_nomusic.jpg) |
| screen12-method | clips | 2.2 s | [16x9](sheets/clips__reading-stack_screen12-method_16x9_novoice_nomusic.jpg) |
| screen14-contents | clips | 18.4 s | [16x9](sheets/clips__reading-stack_screen14-contents_16x9_novoice_nomusic.jpg) · [9x16 copy 2](sheets/clips__reading-stack_screen14-contents_9x16_novoice_nomusic-2.jpg) · [9x16](sheets/clips__reading-stack_screen14-contents_9x16_novoice_nomusic.jpg) |
| screen20-inspect | clips | 3.9 s | [16x9](sheets/clips__reading-stack_screen20-inspect_16x9_novoice_nomusic.jpg) · [9x16 copy 2](sheets/clips__reading-stack_screen20-inspect_9x16_novoice_nomusic-2.jpg) · [9x16](sheets/clips__reading-stack_screen20-inspect_9x16_novoice_nomusic.jpg) |
| screen21-before-ch1 | clips | 14.4 s | [16x9](sheets/clips__reading-stack_screen21-before-ch1_16x9_novoice_nomusic.jpg) |
| screen27-cold | clips | 29.4 s | [16x9](sheets/clips__reading-stack_screen27-cold_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen27-cold_9x16_novoice_nomusic.jpg) |
| screen28-shelves | clips | 14.1 s | [16x9](sheets/clips__reading-stack_screen28-shelves_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen28-shelves_9x16_novoice_nomusic.jpg) |
| screen32-b1-contents | clips | 39.5 s | [16x9](sheets/clips__reading-stack_screen32-b1-contents_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen32-b1-contents_9x16_novoice_nomusic.jpg) |
| screen33-ch1-question | clips | 14.3 s | [16x9](sheets/clips__reading-stack_screen33-ch1-question_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen33-ch1-question_9x16_novoice_nomusic.jpg) |
| screen37-challenged | clips | 25.5 s | [16x9](sheets/clips__reading-stack_screen37-challenged_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen37-challenged_9x16_novoice_nomusic.jpg) |
| screen40-ch3-strategy | clips | 3.9 s | [16x9](sheets/clips__reading-stack_screen40-ch3-strategy_16x9_novoice_nomusic.jpg) · [9x16 captions](sheets/clips__reading-stack_screen40-ch3-strategy_9x16_captions.jpg) · [9x16](sheets/clips__reading-stack_screen40-ch3-strategy_9x16_novoice_nomusic.jpg) |
| screen41-ch4 | clips | 10.5 s | [16x9](sheets/clips__reading-stack_screen41-ch4_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen41-ch4_9x16_novoice_nomusic.jpg) |
| screen42-ch4-questions | clips | 13.4 s | [16x9](sheets/clips__reading-stack_screen42-ch4-questions_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen42-ch4-questions_9x16_novoice_nomusic.jpg) |
| screen43-ch5-7 | clips | 28.5 s | [16x9](sheets/clips__reading-stack_screen43-ch5-7_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen43-ch5-7_9x16_novoice_nomusic.jpg) |
| screen44-ch8-10 | clips | 6.3 s | [16x9](sheets/clips__reading-stack_screen44-ch8-10_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen44-ch8-10_9x16_novoice_nomusic.jpg) |
| screen45-ch8-head | clips | 17.4 s | [16x9](sheets/clips__reading-stack_screen45-ch8-head_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen45-ch8-head_9x16_novoice_nomusic.jpg) |
| screen46-ch8-four | clips | 9.4 s | [16x9](sheets/clips__reading-stack_screen46-ch8-four_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen46-ch8-four_9x16_novoice_nomusic.jpg) |
| screen47-ch9 | clips | 7.8 s | [16x9](sheets/clips__reading-stack_screen47-ch9_16x9_novoice_nomusic.jpg) · [9x16 copy 2](sheets/clips__reading-stack_screen47-ch9_9x16_novoice_nomusic-2.jpg) · [9x16](sheets/clips__reading-stack_screen47-ch9_9x16_novoice_nomusic.jpg) |
| screen48-ch10 | clips | 17.8 s | [16x9](sheets/clips__reading-stack_screen48-ch10_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen48-ch10_9x16_novoice_nomusic.jpg) |
| screen56-b2-parts | clips | 23.8 s | [16x9](sheets/clips__reading-stack_screen56-b2-parts_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen56-b2-parts_9x16_novoice_nomusic.jpg) |
| screen57-page-count | clips | 14.1 s | [16x9 copy 2](sheets/clips__reading-stack_screen57-page-count_16x9_novoice_nomusic-2.jpg) · [16x9 copy 3](sheets/clips__reading-stack_screen57-page-count_16x9_novoice_nomusic-3.jpg) · [16x9](sheets/clips__reading-stack_screen57-page-count_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen57-page-count_9x16_novoice_nomusic.jpg) |
| screen61-b2-ch1 | clips | 10.5 s | [16x9](sheets/clips__reading-stack_screen61-b2-ch1_16x9_novoice_nomusic.jpg) · [4x5](sheets/clips__reading-stack_screen61-b2-ch1_4x5_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen61-b2-ch1_9x16_novoice_nomusic.jpg) |
| screen62-who-creative | clips | 3.5 s | [16x9](sheets/clips__reading-stack_screen62-who-creative_16x9_novoice_nomusic.jpg) · [4x5](sheets/clips__reading-stack_screen62-who-creative_4x5_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen62-who-creative_9x16_novoice_nomusic.jpg) |
| screen65-ordinary-people | clips | 27.5 s | [9x16](sheets/clips__reading-stack_screen65-ordinary-people_9x16_novoice_nomusic.jpg) |
| screen66-link-convivial | clips | 9.2 s | [16x9](sheets/clips__reading-stack_screen66-link-convivial_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen66-link-convivial_9x16_novoice_nomusic.jpg) |
| screen67-bridging | clips | 15.6 s | [16x9](sheets/clips__reading-stack_screen67-bridging_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen67-bridging_9x16_novoice_nomusic.jpg) |
| screen73-recap | clips | 13.2 s | [16x9](sheets/clips__reading-stack_screen73-recap_16x9_novoice_nomusic.jpg) · [9x16](sheets/clips__reading-stack_screen73-recap_9x16_novoice_nomusic.jpg) |
| 01m35s-01m47s | clips/_tests | 11.5 s | [4x5 captions](sheets/clips___tests__reading-stack_01m35s-01m47s_4x5_captions.jpg) |
| line045 | clips/_tests | 1.6 s | [16x9 captions_nomusic](sheets/clips___tests__reading-stack_line045_16x9_captions_nomusic.jpg) |
| line120 | clips/_tests | 4.1 s | [9x16 captions](sheets/clips___tests__reading-stack_line120_9x16_captions.jpg) |
| screen14-contents | clips/_tests | 18.4 s | [16x9](sheets/clips___tests__reading-stack_screen14-contents_16x9.jpg) |
| screen23-priming | clips/_tests | 11.5 s | [9x16 captions](sheets/clips___tests__reading-stack_screen23-priming_9x16_captions.jpg) · [9x16 captions_nosfx](sheets/clips___tests__reading-stack_screen23-priming_9x16_captions_nosfx.jpg) |
| screen24-tiktok | clips/_tests | 7.0 s | [9x16 captions](sheets/clips___tests__reading-stack_screen24-tiktok_9x16_captions.jpg) · [9x16 nosfx](sheets/clips___tests__reading-stack_screen24-tiktok_9x16_nosfx.jpg) |
| screen25-memorising | clips/_tests | 14.4 s | [16x9](sheets/clips___tests__reading-stack_screen25-memorising_16x9.jpg) |

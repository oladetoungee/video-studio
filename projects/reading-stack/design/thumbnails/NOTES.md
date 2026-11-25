# Thumbnails: notes

## Collage directions C1-C8 (2026-10-07, her new "collage over the creator" style)
Built from the strategist's 8 concepts (`kit/refined-kit.md` section 4) and her samples in `inspiration/viral-samples/collage/`.
Edit: http://localhost:7700/design/reading-stack/thumbnails/ (pick a C-direction in the strip). Every object is a block she can
drag, resize, hide or swap (photo picker: new group **Collage objects**); every text is click-to-edit; her photo is `img:photo`.
- Source: `directions/C*/` (index.html written by `tools/collage_build.py`; it only rewrites content.json with `--force`, so her
  studio edits are safe). Shared look: `lib/collage.css`. Review sheets: `python3 tools/collage_review.py` -> `review/collage/`
  (cold sheets at 1280/320/168, mocked feed next to her samples, `vs_samples.png`).
- Look (measured on the samples, then corrected by 3 critic rounds): her full room photo; one Playfair Display 500 serif line
  (tight tracking, white, soft shadow) across her chest at ~60 % of the frame width; 1 small sans label (Instrument Sans 23 px);
  3-4 real photo cut-outs 110-220 px with one shadow recipe; the 150x70 duration-badge corner kept clear.

| Dir | Concept | Words | Photo | Main title (alternates in content.json) | Round 3: (a) conf/click · (b) clarity/click · (c) taste | Result |
|---|---|---|---|---|---|---|
| C1-stop-forgetting-books | T1 | Stop forgetting books. | pointing at her head (Screenshot-2026-09-17, warm) | How to Remember What You Read: A Method From 1940 | 4/6 · 8/7 · 7 (b was 8/8 in round 2) | closest; **recommended** |
| C2-read-the-contents-page-first | T2 | read the / contents page first. | 16 | Why You Forget the Books You Read (and the Fix I Use) | 3/4 · 7/6 · 6.5 | fail |
| C3-forgot-what-you-read | T3 | Forgot what you read? | 16 | How to Read Non-Fiction and Actually Remember It | 4/6 · 8/6 · 7 | **recommended** |
| C4-read-like-a-researcher | T4 | Read like a researcher | 16 | How to Study a Book Before You Read It (and Remember More) | 3/5 · 7/7 · 5.5 | fail |
| C5-memorise-this-first | T5 | Memorise *this* first. | 16 | How to Read Non-Fiction Books Without Forgetting Them | 2/5 · 7/7 · 6.5 | fail |
| C6-how-to-study-a-book | T6 | How to study a book | 16 | How to Retain What You Read: Start With the Contents Page | 4/4 · 8/5 · 7 | fail (search-only) |
| C7-remember-what-you-read | T7 | Remember what you read. | 16 | I Memorise a Book's Chapters Before I Read It. Here's Why | 5/6 · 7/6 · 7.5 | runner-up |
| C8-why-you-forget-books | T8 (flat) | Why you forget books / *and the fix* | 16 in a polaroid | How to Remember the Non-Fiction Books You Read | 5/7 · 8/6 · 6 | **recommended** (cold #1) |

**None passed all three gates** (pass = b 8/8 and c 8). Round-by-round: (b) C1 8/7 -> 8/8 -> 8/7; (c) C1 4 -> 6 -> 7, C3 3 -> 7 -> 7,
C7 6 -> 6 -> 7.5. After round 3 a last polish was applied without a 4th gate (line raised ~36 px, labels cut to one and made
smaller, stronger object shadows, C2 kicker roman and smaller, C4 crops no longer overlap, C5 gets the Baratta cover on the right,
C8 polaroid enlarged so her face is ~200 px).
**Recommended 3 (Test & Compare):** C1 + "How to Remember What You Read: A Method From 1940"; C3 + "How to Read Non-Fiction and
Actually Remember It"; C8 + "How to Remember the Non-Fiction Books You Read". Runner-up C7.

Changes from the concepts (each because a gate failed):
- **C1** uses the photo of her pointing at her head (the one she put on thumbnail 01 herself) instead of photo 18: at feed size the
  mic at her lips in 18 read as "a knife in her mouth" (cold critic, round 1). Photos 18/19 are unused.
- **C2** "Read this page first." -> kicker "read the" + "contents page first." (round 2 cold: "this page" could not be read off
  the small page, confidence 2/5). Wording now states the method; pairs with C1/C7 titles that ask "why".
- **C3** "Forgot the last book you read?" -> "Forgot what you read?" (one line; two lines were rejected by the taste critic).
- **C6** main title S4 (S7 repeated "How to study a book").
- Labels cut from 2-3 to 1 (every cold critic: unreadable at 320/168 px). Peonies, the white teacup and the blue stock book stack
  were dropped (read as random decoration / a 3D render / clip-art).

Weaknesses the critics kept naming (not fixable without new material):
- **Same photo in 6 of 8** (photo 16). Fine for one published thumbnail, but as a set they look alike. Photos 18/19 have the mic
  at her lips; 17 is too small. More photos of her (hands free, mic lower, brighter room) would help most.
- **The silver mic** at her chin reads as "a knife" to cold viewers in every photo-16 option (never retouched; the line sits over it).
- **The contents page** is a real frame from her video (5:40.97), so it is soft; at feed size it reads as "a grey page with a red
  circle". A sharp phone photo of Baratta's open contents page would fix C2 and C5.
- **Book covers** are flat publisher covers; a phone photo of each real book at a slight angle would look far more real.
- Her photo 16 is dim/cool next to the bright samples; a light warm + exposure lift is applied (`assets/photo/gbemi16_warm.jpg`,
  colour only, red lipstick checked). C1's photo uses the ghana-marrify warm grade.

### Material used
| File | What | Source | Licence |
|---|---|---|---|
| `assets/photo/gbemi16_warm.jpg` | her photo 16, light warm + ~1/4 stop lift (colour only, never flipped) | `assets/uploads/gbemi-photo-16.png` | hers |
| `assets/photo/gbemishot_warm.jpg` | her photo pointing at her head, warm grade (`ghana-marrify/.../tools/warm.py`) | `assets/uploads/Screenshot-2026-09-17-at-12.56.37.png` | hers |
| `assets/photo/gbemi18_warm.jpg`, `gbemi19_warm.jpg` | warm copies, not used | uploads 18/19 | hers |
| `assets/collage/baratta_contents_page.png` | Baratta's real contents page: frame 5:40.97 of `kit/raw-video.mov`, un-mirrored (book crop only), rotated level, flattened, her fingertips at the top corner painted out with paper tone | her video | hers |
| `assets/collage/cover_baratta_clean.jpg` | *How to Read and Write Critically* (Alex Baratta) cover | https://covers.openlibrary.org/b/id/12398723-L.jpg | publisher cover, shown to identify the real book |
| `assets/collage/cover_convivial_clean.jpg` | *Convivial Toolbox* (Sanders and Stappers) cover | https://covers.openlibrary.org/b/isbn/9789063692841-L.jpg | publisher cover, shown to identify the real book |
| `assets/collage/book_stack_old.png` | stack of old books, cut out (Vision), alpha eroded, -12 % saturation | https://www.pexels.com/photo/books-on-the-table-near-white-wall-10251770/ | Pexels licence (free, no attribution) |
| `assets/collage/notebook_notes.png` | open notebook with handwritten notes and a pen, cut out | https://www.pexels.com/photo/open-notebook-with-handwritten-notes-and-pen-34079281/ | Pexels licence |
| `assets/collage/coffee_top.png` | coffee in a mug from above, cut out | https://www.pexels.com/photo/top-view-of-a-cup-of-coffee-11127537/ | Pexels licence |
| `assets/collage/peonies.png` | pink peonies, cut out (tried, dropped) | https://www.pexels.com/photo/pink-peonies-17557218/ | Pexels licence |
Fonts added (OFL, from ghana-marrify / library): Playfair Display (+Italic), Instrument Serif Regular, Instrument Sans.
Studio: `studio/server.mjs` photo picker gained a "Collage objects" group (`design/thumbnails/assets/collage/`).

## Earlier directions (01-09, 2026-10-01)

## Files
- **Edit in the browser:** http://localhost:7700/design/reading-stack/thumbnails/ (studio). It writes `content.json` (text, images, `vars`, `nudge`) and exports with `render.mjs`.
- **Source:** `directions/NN-name/index.html` holds the layout. `content.json` holds the text, image, options (CSS vars) and the paired title.
- **Re-render everything:** `node render.mjs` writes `outputs/thumbnails/*.png` and `overview.png`.
  - `node render.mjs 04` renders one direction.
  - `node render.mjs --guides` writes duration-badge checks to `review/`.
- **Photos:**
  - `tools/frames.json` lists the chosen 4K frame times.
  - `tools/prep.py` builds the cut-outs (`assets/cut/`) and photos (`assets/photo/`).
  - `tools/segment.swift` makes the person masks with macOS Vision.
  - `tools/faces.swift` gives face boxes.
- **Small-size check:** `python3 tools/review.py` writes `review/review_sheet.png` at full, 320x180 and 168x94 sizes, with a duration badge.
- **Mirroring:**
  - Her face is never flipped.
  - On the two book shots, only the cover's text blocks are un-mirrored, in place.
  - Faint rectangles around those blocks are visible at full size if you look closely, but not at feed size.

## Frames used (source time in raw-video.mov)
| Asset | Time | Moment |
|---|---|---|
| baratta_gaze | 5:12.65 | calm eye contact, holding *How to Read and Write Critically* |
| convivial_gaze | 11:31.60 | holding *Convivial Toolbox* against her cheek |
| concerned | 0:39.13 | furrowed brow |
| grin | 17:52.50 | big smile (outro) |
| explain | 15:05.18 | explaining, hand at temple |
| neutral | 0:08.05 | still, direct eye contact |

## Directions (v2, standalone rewrite 2026-10-01)
Her rule: thumbnail + title must make sense to a stranger who has never seen her. Inside phrases ("only the vibe", "Don't start on page 1", "Build the shelves first", "Read like it's 1940", "My current stack") were retired; their folders are in `projects/reading-stack/archive/thumbnails-v1-directions/` (re-render by moving one back into `directions/`).

| # | Folder | Thumbnail text | Paired title | Cold critic, round 3 (clear / click) |
|---|---|---|---|---|
| 01 | 01-contents-first | READ THE CONTENTS FIRST. | How to Remember the Non-Fiction You Read | rounds 1-2: 9 / 6 (photo being changed in the editor, see below) |
| 02 | 02-memorise-this-page | MEMORISE THIS PAGE. + real contents page | Do This Before You Read Any Non-Fiction Book | 7 / 7 (8 / 8 in rounds 1-2) |
| 03 | 03-forgot-kept (new) | READ IT. FORGOT IT. / READ IT. KEPT IT. (her concerned vs smiling face) | Why You Forget What You Read (and How to Fix It) | 6 / 8 before "Read it." was added |
| 04 | 04-stop-forgetting (new) | STOP FORGETTING *books.* | The Simple Habit That Makes Non-Fiction Stick | 7 / 5 |
| 05 | 05-judge-by-contents | JUDGE A BOOK BY ITS CONTENTS. | Why I Read the Table of Contents Before Chapter One | 8 / 7 |
| 06 | 06-reading-order (new) | 01 TITLE. 02 CONTENTS. 03 MEMORISE. (holding the book) | Read Non-Fiction in This Order (So It Sticks) | **8 / 8** (critic's #1) |
| 08 | 08-it-stuck | THE BOOK ACTUALLY STUCK. | I Memorised a Book's Contents Before Reading It | 5 / 6 for "It actually stuck"; "The book" added after |
| 09 | 09-do-this-first (new) | NON-FICTION? DO THIS *first.* (off-black) | How to Remember What You Read (It Takes a Few Minutes) | 7 / 5 |

## Recommendation
- **Test & Compare (thumbnail-only, one title for all three): 06 vs 02 vs 03**, title **"How to Actually Remember What You Read"**. That is method-as-a-list + face, faceless contents page, and before/after faces. The carousel end slides already point to that title.
- 05 is the strongest reserve (clear pun + real photo). 04 and 09 are the weakest on click for cold viewers; keep them only as alternates.
- Never "5-minute": she says "a few minutes".

## Honest weaknesses
- **01 is mid-edit in the studio.** While this pass ran, someone (her, or the studio agent's photo-upload test) swapped its photo for uploaded cut-outs (`assets/uploads/cutouts/…`). I left that alone; its text and title are unchanged. The earlier Baratta-book version is in the editor's version history ("Before this session's edits").
- **Cut-out edges:** a dark chair residue shows at a shoulder in `neutral` and next to the hand in `convivial_gaze` (subtle on off-black, visible on bright grounds; that is why 09 moved from green to off-black). A 1-2 px sliver beside her ear in `grin` (08, 03).
- **Lighting:** the footage is dim and cool; faces read well but are less crisp than a lit studio shot.
- **Un-mirrored cover text** sits in faint rectangles at full size (01 original, 05, 06).
- **Before uploading:** look at every option on a phone yourself.

# Thumbnails: database-indexes (DESIGN agent, 2026-10-13)

From the strategist's 22 concepts (`../../kit/refined-kit.md` section 2) plus directions the taste critic asked for. THUMBNAILS.md RULE 0 (topic in plain words + a literal picture) and RULE 1 (no script phrases, 1-5 words, 2-3 titles each).

- Edit: http://localhost:7700/design/database-indexes/thumbnails/
- Source: `directions/<name>/` (index.html + content.json). Generator `python3 tools/gen.py [prefix] [--reset]` (layouts in `tools/dirs.py`, later rounds as override blocks at its end), then `node render.mjs`. Without --reset her studio edits are kept.
- Outputs: `../../outputs/thumbnails/` + overview.png; copy in `~/Downloads/database-indexes-thumbnails/`.

## Her photos
Frames from `kit/database indexes.mov` (4K), never flipped or retouched. 1274 frames scanned at 2 fps; mouth/eye openness measured with macOS Vision (`tools/expr.swift`); only closed-mouth, eyes-open frames used. Warm grade `tools/warm.py` (her OK), masks `tools/cutout_full.swift`. Every taste critic names the ceiling: one dim webcam angle. Ask her for photos holding a book open at its index page, a laptop, a phone.

## References used (her board)
- Viral sample 1 (topic huge behind the head): 21, 15.
- Viral sample 2 (one object = the outcome): 05, 12, 14.
- Viral sample 3 (framework as boxes / sticky notes): 09, 23, 25.
- Viral sample 4 (diagram beside the creator): 04, 06, 10, 16.
- Viral sample 5 (topic named + scene): 01, 22.
- Collage samples (full photo, small objects, one serif line): 20, 24, 07.
- Pinterest board: serif words woven into the scene (01, 09, 20, 24); hard split (26); Day 1 / Day 900 before-after (02).
- Dev-YouTube outliers in the refined kit (code card + verdict; PlanetScale 28x, techTFQ 8x): 03, 04, 08, 13, 16.
- The film's Query Plan look: 06, 17, 18, 19.

## Gates (fresh critic agents)
A = image-only cold topic critic (topic 1-5 / click 0-10), B = title + thumbnail pair (0-10), C = taste vs her samples (0-10).
- Round 1 (23): failed. ghana-marrify's condensed caps, mid-word faces, technical errors (LOWER() fix changed the query, a diagram read as a linked list, "20 steps" by a 3-level tree), text over her eyes.
- Round 2 (26): own type (IBM Plex Sans Bold, sentence case, one key word on a block), closed-mouth frames, new 24/25/26.
- Round 3: expression-index fix, ~20 comparisons, matching row numbers, EXPLAIN before adding the index, halos removed (06 corner cam, 23 framed photo), editorial 01.
- Round 4: six compositions changed for variety (03, 09, 10, 12, 14, 15); final gate; last fixes (13 join line to customers.id, 07 names only, 02 label, 26 spacing).

## Recommended 3 (for the whole video)
1. **05-reads-every-row** + "Database Indexes: Why Your App Slows Down as It Grows"
2. **07-index-like-a-book** + "Database Indexing for Beginners: Fix Slow SQL Queries"
3. **20-collage-explained** + "Database Indexes: Why Your App Slows Down as It Grows"
Section ones (03, 04, 08, 13, 16, 25) suit chapters, Shorts and community posts. Not for the main upload: 11, 15, 22, 24.

## All directions
### 01-slow-database
- Words: why is my database so slow? · frame 4:00.5 (hand on head, mouth closed) · concept T01
- Titles: Database Indexes: Why Your App Slows Down as It Grows / SQL Indexes: Make Slow Queries Fast with One Line / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 4/7 · B 7.5 · C 5 · round 3 B 7 · C 8 · final gate (round 4): A topic/click 2/6 · B pair 7 · C taste 6
- Photo-led: her real room, hand on her head (her own gesture in the recording), large on the right. The problem in two words on the left, "Slow" on a red block. Follows viral sample 5 (topic named + scene). Round 2: closed-mouth frame, Plex type, no icons. Round 3: editorial lowercase serif instead of the sans + red box (taste: too close to the shared template).

### 02-fast-then-slow
- Words: Fast… then slow? · frame 2:21.9 (both hands in, calm) · concept T12
- Titles: Database Indexes: Why Your App Slows Down as It Grows / No Index? Your Database Reads Every Single Row / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 2/5 · B 8 · C 7.5 · round 3 B 7 · C 7.5 · final gate (round 4): A topic/click 2/7 · B pair 8 · C taste 6
- Before / after split on her real photo. Left: the app with a few users has loaded. Right: the same app with thousands of users, an empty skeleton list still loading. No invented timings. Follows her saved "Day 1 / Day 900" splits and the "fast with 10 rows, crawls with 10,000" conversation. Round 2: no spinner or cylinder, labels on the phones, headline clear of her headwrap. Round 3: "Fast" in white (one accent), 100,000 users (10,000 was not convincing), darker skeleton, a "database" cue on the slow phone.

### 03-is-it-using-the-index
- Words: Is it using the index? · frame 10:51.8 (raised eyebrow, mouth closed) · concept T07
- Titles: Added an Index and It's Still Slow? Check This First / Database Index Mistakes (and How to Check with EXPLAIN) / Seq Scan vs Index Scan: Is Your Query Using the Index?
- Scores: round 2 A 5/6 · B 8 · C 4.5 · round 3 B 8 · C 6 · final gate (round 4): A topic/click 4/7 · B pair 8 · C taste 7
- Photo-led with the film's terminal panel: a real PostgreSQL EXPLAIN, and the answer every developer dreads, Seq Scan, big and red. Her on the right, thinking. Follows the code-card outliers (techTFQ, LearnThatStack). Round 2: closed-mouth frame, query one line, Seq Scan 58 px. Round 3: new frame (round 2's pout read sulky): raised-eyebrow look. Round 4 (composition): centred: question across the top, her centred, the EXPLAIN result as a full-width bar across her chest.

### 04-lower-breaks-index
- Words: LOWER() skips your index · frame 6:50.2 (wary frown, mouth closed) · concept T06
- Titles: Why Your Database Ignores Your Index (2 Common Mistakes) / Database Index Mistakes (and How to Check with EXPLAIN) / 2 Database Index Mistakes (and a Postgres Gotcha)
- Scores: round 2 A 5/6 · B 8 · C 6 · round 3 B 7 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 8 · C taste 6
- Mistake format: the query with LOWER(email) and a plain index on email gets Seq Scan (red); the fix, an index on the same expression, gets Index Scan (yellow). Her wary on the left. Real PostgreSQL behaviour. Round 2: the fix is now the expression index (the first version silently changed the query), words "skips" (it only skips a plain index). Round 3: labelled PostgreSQL (MySQL 8 writes the index as ((LOWER(email)))).

### 05-reads-every-row (RECOMMENDED)
- Words: No index? It reads every row · frame 8:16.8 (pointing at the table, mouth closed) · concept T03
- Titles: Database Indexes: Why Your App Slows Down as It Grows / No Index? Your Database Reads Every Single Row / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 5/7 · B 7.5 · C 7 · round 3 B 7 · C 5 · final gate (round 4): A topic/click 5/7 · B pair 8 · C taste 7 · RECOMMENDED
- Photo-led now (round 1 was the flat cut-out formula): she points at a tall printout of a books table pinned over the wall of her room; a red line runs down every row, the one row it wanted in yellow. The slow behaviour drawn as an object (viral sample 2). Round 3: her moved right so "every row" no longer touches her eye; "No index?" white; table header no longer clipped.

### 06-20-steps
- Words: 1 row in a million, ~20 comparisons · frame 0:22.7 (calm, in the corner cam) · concept T21
- Titles: How Database Indexes Find 1 Row in a Million / No Index? Your Database Reads Every Single Row / What Is a Database Index? (And Why Your App Needs One)
- Scores: round 2 A 5/6 · B 7.5 · C 6 · round 3 B 4 · C 5 · final gate (round 4): A topic/click 4/6 · B pair 7 · C taste 7
- The film's Query Plan look (off-black, hairline grid, one yellow path): the index tree, pruned to the path that finds bob@email.com and his row, nodes 1.5x bigger than round 1; her real "this small" gesture on the right. "About 20 steps" is her own phrase (20 comparisons over 3-4 page reads; BRIEF). Round 3: the cut-out (chair fringe) replaced by the film's round corner cam with a yellow ring; "~20 comparisons" (a 3-level tree next to "20 steps" read as a contradiction).

### 07-index-like-a-book (RECOMMENDED)
- Words: A database index is this · frame 2:21.9 (both hands in, mouth closed) · concept T02
- Titles: Database Indexing for Beginners: Fix Slow SQL Queries / What Is a Database Index? (And Why Your App Needs One) / How Database Indexes Find 1 Row in a Million
- Scores: round 2 A 4/5 · B 8 · C 7 · round 3 B 8 · C 7 · final gate (round 4): A topic/click 5/7 · B pair 8 · C taste 7 · RECOMMENDED
- Collage over her photo: the index page at the back of a book (everyone has used one), one entry highlighted, an arrow to the matching row of a database table. She points at it. Topic named plainly + its object. Round 2: no cylinder, no scribble, arrow ends clear of the table header. Round 3: the index entry and the row now match (index says 48, the row is row 48); new frame (the old one read as "shh").

### 08-column-order
- Words: Wrong column order? · frame 4:28.7 (chin on hand, thinking) · concept T05
- Titles: Composite Index Explained: Why Column Order Matters / Database Index Types: Which One Should You Use? / 2 Database Index Mistakes (and a Postgres Gotcha)
- Scores: round 2 A 5/6 · B 8.5 · C 6 · round 3 B 6 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 8 · C taste 6
- Composite index as code: an index on (last_name, first_name); a search by surname ticked green, a search by first name only crossed red (usually not used; BRIEF). Her own names (Okafor, Ada). Round 2: one prop only, closed-mouth thinking frame, code 34 px. Round 3: the cross now says "usually" (PostgreSQL 18 and MySQL 8 skip scan can sometimes help).

### 09-which-index
- Words: which index type? · frame 3:14.4 (hands up, puzzled, mouth closed) · concept T08
- Titles: Database Index Types: Which One Should You Use? / B-Tree vs Hash vs Full-Text: Database Index Types / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 4/5 · B 6.5 · C 6 · round 3 B 6 · C 7 · final gate (round 4): A topic/click 4/5 · B pair 6 · C taste 7
- Three sticky notes stuck on the wall beside her, each an index type and what it is for (B-tree: ranges and sorting; hash: exact match; full-text: words in text). Follows viral sample 3 (framework on sticky notes). Round 2: no mini icons, notes spaced apart, marker handwriting. Round 4 (composition): her centred with the three notes stuck round her, the question in lowercase serif along the bottom.

### 10-index-every-column
- Words: Index every column? · frame 2:28 (sceptical side look, mouth closed) · concept T09
- Titles: Why Indexing Every Column Makes Your Database Slower / 6 Indexes, 7 Writes: The Hidden Cost of Database Indexes / Don't Add a Database Index Before You Run EXPLAIN
- Scores: round 2 A 5/6 · B 8.5 · C 5.5 · round 3 B 5 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 6 · C taste 6
- The beginner's question on a real-looking orders table: every column header highlighted as indexed; her sceptical side look. Follows viral sample 4 (the question the viewer already has). Round 2: no pill tags (the whole header row is yellow instead), closed-mouth frame. Round 3: the note is plain words now. Round 4 (composition): split headline around her centred head (like the "Fast… then slow?" split), the table as a full-width strip at the bottom.

### 11-near-me
- Words: How "near me" works · frame 0:22.7 (calm, mouth closed) · concept T11
- Titles: Spatial Index Explained: How 'Near Me' Search Works / Database Index Types: Which One Should You Use? / Spatial and Full-Text Indexes: How Apps Search Fast
- Scores: round 2 A 5/6 · B 7.5 · C 5.5 · round 3 B 6 · C 6 · final gate (round 4): A topic/click 1/6 · B pair 7 · C taste 6 · not for the main upload: reads as a maps video; only for a spatial-index short
- Everyday object fills the frame: a phone map (illustration, no real app) with coffee pins, a dashed circle round "you", only the pins inside lit. What a spatial index does. Round 2: calm frame, no cylinder, title made spatial-only.

### 12-one-line-of-sql
- Words: Slow query? One line. · frame 7:28.7 (pointing at the card, mouth closed) · concept T13
- Titles: What Is a Database Index? (And Why Your App Needs One) / Database Indexing for Beginners: Fix Slow SQL Queries / SQL Indexes: Make Slow Queries Fast with One Line
- Scores: round 2 A 3/4 · B 7.5 · C 5 · round 3 B 8 · C 7 · final gate (round 4): A topic/click 5/7 · B pair 7 · C taste 7
- One object = the outcome (viral sample 2): a paper card with the one real line, CREATE INDEX (works in PostgreSQL and MySQL), yellow on the key words; she points at it. Round 2: no scribble, closed-mouth frame. Round 3: words name the result (cold read: "one line of SQL" did not say what it does). Round 4 (composition): centred: one-line headline across the top, the SQL card held across the middle of the frame.

### 13-postgres-foreign-keys
- Words: Postgres doesn't index this · frame 2:28 (sceptical side look, mouth closed) · concept T15
- Titles: Postgres Foreign Key Index: Why Your Joins Got Slow / 2 Database Index Mistakes (and a Postgres Gotcha) / Added an Index and It's Still Slow? Check This First
- Scores: round 2 A 5/7 · B 8.5 · C 6.5 · round 3 B 7 · C 7 · final gate (round 4): A topic/click 4/7 · B pair 8 · C taste 6
- Two tables joined by a foreign key; orders.customer_id (the column PostgreSQL does not index for you; MySQL InnoDB does) ringed red with a NO INDEX tag. Her sceptical on the left. Real behaviour (BRIEF). Follows PlanetScale "Postgres and MySQL Indexes Are Completely Different" (28x). Round 2: tag in mono instead of a script caption, no cut hand. Round 3: NO INDEX tag moved outside the ring; her moved right off the edge.

### 14-when-to-index
- Words: When to add an index · frame 3:27.7 ("this small" pinch, mouth closed) · concept T16
- Titles: Why Indexing Every Column Makes Your Database Slower / Don't Add a Database Index Before You Run EXPLAIN / What Is a Database Index? (And Why Your App Needs One)
- Scores: round 2 A 5/5 · B 8 · C 6.5 · round 3 B 6 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 7 · C taste 6
- A clipboard checklist beside her (viral sample 2, the DONE clipboard): WHERE, JOIN, ORDER BY ticked in ink, "every column" struck out in red. Round 2: hand-drawn ink ticks (no icon circles), "every column" 38 px, closed-mouth frame. Round 3: new frame ("this small" pinch); clipboard shortened. Round 4 (composition): mirrored: her on the left, the headline and clipboard on the right.

### 15-laravel-index
- Words: Slow Laravel app? · frame 8:53.6 (finger at temple, mouth closed) · concept T18
- Titles: Laravel Database Indexing: Fix Slow Queries in One Line / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 5/6 · B 8.5 · C 6 · round 3 B 7 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 7 · C taste 5 · not for the main upload: Laravel-only audience
- For Laravel developers (she uses Laravel; "laravel database indexing" is a search phrase): only the one migration line that adds the index, 46 px in the film's terminal panel; her thinking on the right. Round 2: one line instead of three, closed-mouth frame. Round 3: code 44 px, caption removed. Round 4 (composition): words behind her head (her board's "big word behind the head"), the migration line as a bar across the bottom.

### 16-like-wildcard
- Words: Why your index gets ignored · frame 0:38.6 (hands open: why?, mouth closed) · concept T20
- Titles: Database Index Mistakes (and How to Check with EXPLAIN) / Why Your Database Ignores Your Index (2 Common Mistakes) / 2 Database Index Mistakes (and a Postgres Gotcha)
- Scores: round 2 A 5/7 · B 8 · C 6.5 · round 3 B 6 · C 6 · final gate (round 4): A topic/click 4/6 · B pair 7 · C taste 6
- One huge line of real SQL, WHERE title LIKE '%fall%', the first % ringed red (a leading wildcard, so a normal B-tree index cannot help). Her hands open, "why?". Round 2: the code sits below her face (round 1 covered her eyes), ring centred on the %. Round 3: code lifted 30 px.

### 17-slower-writes
- Words: 1 new order = 7 writes · frame none (faceless, Query Plan look) · concept T22
- Titles: Why Indexing Every Column Makes Your Database Slower / 6 Indexes, 7 Writes: The Hidden Cost of Database Indexes / Don't Add a Database Index Before You Run EXPLAIN
- Scores: round 2 A 3/4 · B 8.5 · C 4 · round 3 B 4 · C 4 · final gate (round 4): A topic/click 3/5 · B pair 8 · C taste 6
- Faceless option in the film's look: one new order (yellow) lands in the orders table AND in each of its six indexes (her own example), every stack labelled. Round 2: "index" labels on each stack (round 1 was too abstract).

### 18-seq-vs-index-scan
- Words: Same query. Slow / fast · frame none (faceless, Query Plan look) · concept new (pairs S8, C2)
- Titles: Seq Scan vs Index Scan: Is Your Query Using the Index? / Added an Index and It's Still Slow? Check This First
- Scores: round 2 A 4/4 · B 7.5 · C 3 · round 3 B 5 · C 4 · final gate (round 4): A topic/click 3/5 · B pair 5 · C taste 6
- Faceless, the film's A3 still made bold: the same query EXPLAINed before the index (Seq Scan, red) and after (Index Scan, yellow). Real PostgreSQL output (COSTS OFF). Round 2: not two equal cards any more: a red strike across the slow line, the fast result larger.

### 19-million-vs-20
- Words: 1,000,000 checks or ~20? · frame none (faceless, Query Plan look) · concept new (pairs S2, C1)
- Titles: How Database Indexes Find 1 Row in a Million / No Index? Your Database Reads Every Single Row / Database Indexes Explained: How Apps Search Fast
- Scores: round 2 A 4/4 · B 8 · C 4 · round 3 B 4 · C 5 · final gate (round 4): A topic/click 4/5 · B pair 7 · C taste 6
- Faceless numbers in the film's look: up to 1,000,000 checks with no index against about 20 comparisons with one, bars drawn to scale (the 20 is a sliver, labelled). Wording per BRIEF ("about 20 comparisons", never "20 disk reads").

### 20-collage-explained (RECOMMENDED)
- Words: database indexes, explained · frame 0:22.7 (calm, mouth closed) · concept new (collage style she asked for, 2026-10-07)
- Titles: Database Indexes: Why Your App Slows Down as It Grows / What Is a Database Index? (And Why Your App Needs One) / Database Indexes Explained: How Apps Search Fast
- Scores: round 2 A 4/3 · B 5.5 · C 8 · round 3 B 6 · C 7 · final gate (round 4): A topic/click 5/5 · B pair 8 · C taste 8 · RECOMMENDED
- Collage over the creator (her collage samples "Time to lock in.", "Capsule wardrobe"): the full photo of her, three objects of the topic (the book index page, the index tree on a sticky note, a terminal line), one big lowercase serif line set off-centre over the dark chair, two tiny labels. Round 2: 3 props instead of 6, line moved left and lowercase (round 1 was centred like reading-stack). Round 3: "when not to add one" moved up out of the duration-badge corner.

### 21-remake-sample1
- Words: DATABASE INDEXES · frame 4:00.5 (hand on head, mouth closed) · concept REMAKE of viral sample 1
- Titles: Database Indexes: Why Your App Slows Down as It Grows / Database Indexes Explained: How Apps Search Fast / What Is a Database Index? (And Why Your App Needs One)
- Scores: round 2 A 5/5 · B 7 · C 3.5 · round 3 B 5 · C 6 · final gate (round 4): A topic/click 5/6 · B pair 6 · C taste 6
- REMAKE of viral sample 1 ("FINANCIAL LITERACY", Tina Huang, 1.9M): the topic in two huge white words behind her head, her hand at her head, the topic's object flying past her shoulder (money -> table-row cards). Round 2: closed-mouth frame, fewer, bigger cards, her lower so INDEXES reads. Round 3: no separate blurred copy behind her (round 2 showed a ghost of her head); the room is the same frame, words behind her head.

### 22-remake-sample5
- Words: how to fix a slow query · frame 0:22.7 (calm) · concept REMAKE of viral sample 5
- Titles: SQL Indexes: Make Slow Queries Fast with One Line / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 4/5 · B 7 · C 6.5 · round 3 B 5 · C 4 · final gate (round 4): A topic/click 2/6 · B pair 7 · C taste 4 · not for the main upload: meaningless side tables, face cut
- REMAKE of viral sample 5 ("how to be consistent"): the how-to phrase small, the key words giant in red behind her head, her centred, two tall printouts of table rows either side (the books -> the rows). Round 2: real room not blurred, how-to line on a white band for contrast, printouts with visible rows. Round 3: words raised so "query" clears her headwrap; the how-to line is plain text with a shadow.

### 23-remake-sample3
- Words: How an index finds a row · frame 7:28.7 (pointing up at the words, mouth closed) · concept REMAKE of viral sample 3
- Titles: How Database Indexes Find 1 Row in a Million / What Is a Database Index? (And Why Your App Needs One) / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 5/6 · B 8 · C 5 · round 3 B 7 · C 7 · final gate (round 4): A topic/click 5/6 · B pair 7 · C taste 7
- REMAKE of viral sample 3 ("FITNESS SALES FRAMEWORK"): the topic in heavy black on a paper grid with a red underline, the framework as coloured boxes: the index search from her video drawn as a branching tree (dave -> left to alice, mia faded; alice -> right to bob -> his row); her on the right pointing at it. Example after Sergey Egorenkov's article. Round 2: a real branching tree (round 1 read as a linked list), closed-mouth frame. Round 3: her photo in a clean frame instead of a cut-out (halo on white); one accent (yellow path, white boxes).

### 24-index-page-hero
- Words: how a database index works · frame 3:09.1 (hands framing, mouth closed) · concept new (taste critic: "a printed book index page held in front of her as the hero object")
- Titles: What Is a Database Index? (And Why Your App Needs One) / Database Indexing for Beginners: Fix Slow SQL Queries / Database Indexes Explained: How Apps Search Fast
- Scores: round 2 A 5/5 · B 6 · C 8 · round 3 B 7 · C 8 · final gate (round 4): A topic/click 4/5 · B pair 6 · C taste 5 · not for the main upload: weaker twin of 07
- Editorial, her Pinterest board: lowercase serif words woven into the photo, and the object everyone already knows, the index page at the back of a book, big between her hands, one entry highlighted with its page number. The line names the topic plainly. Round 3: card lowered 20 px so her fingers grip its top edge; 4 rows, nothing cut at the bottom.

### 25-sticky-wall
- Words: slow query? → run EXPLAIN → add an index · frame 8:53.6 (finger at temple, mouth closed) · concept new (taste critic: "handwritten marker on paper or sticky notes")
- Titles: Don't Add a Database Index Before You Run EXPLAIN / Added an Index and It's Still Slow? Check This First / Database Indexing for Beginners: Fix Slow SQL Queries
- Scores: round 2 A 5/6 · B 8 · C 6 · round 3 B 7 · C 8 · final gate (round 4): A topic/click 4/6 · B pair 7 · C taste 7
- Text woven into the scene: three sticky notes on the empty wall of her room, written in marker, the fix as a 3-step path (slow query? -> add an index -> check EXPLAIN), one red arrow. Her thinking beside them. Close to her Pinterest board (handwritten words, real room), not used in any earlier project. Round 3: the steps in the right order (check with EXPLAIN before adding the index), thicker arrows, plain words.

### 26-split-without-with
- Words: without an index / with an index · frame 8:16.8 (pointing at the panel, mouth closed) · concept new (taste critic: "a before/after split")
- Titles: How Database Indexes Find 1 Row in a Million / No Index? Your Database Reads Every Single Row / Database Indexes: Why Your App Slows Down as It Grows
- Scores: round 2 A 5/6 · B 7.5 · C 6.5 · round 3 B 6 · C 6 · final gate (round 4): A topic/click 5/7 · B pair 7 · C taste 6
- A hard 50/50 split like "THE 9-5 COLLAPSE" / "JOBS ARE DEAD" on her board: left half a flat panel, the same lookup twice, without an index (1,000,000 rows read, red) and with one (1 row, yellow); right half her real photo pointing at it. Round 3: one accent (the million line grey), no tiny query line, wider frame.

# Refined kit: Database indexes

Written 2026-10-12 by the social media strategist (`.claude/agents/social-strategist.md`). This replaces the kit's titles, thumbnail ideas, description, captions and hooks. Her kit (`database-indexes-kit.md`) stays the source of the script and clip ideas; the recording wins over both (`../BRIEF.md`). Every number below has a link in section 9.

---

## 0. What the research says (read this first)

1. **No news hook; this is an evergreen search topic.** Nothing about database indexes is in the news this month. PostgreSQL 19 is still in beta (Beta 4, 24 Sep 2026); PostgreSQL 18 (Sep 2025) added "skip scan" for multi-column indexes. The live public conversation next to this topic is **apps built fast (often with AI tools) that get slow as their data grows**, and missing indexes as the usual cause (HackerNoon, May 2026; Lovable "app slow after adding data" guides). Her opening ("as you get more users… your app takes longer to load") is exactly that problem, so captions lead with the symptom, not the term.
2. **People search the term plus "explained".** YouTube suggests: "database indexes explained", "database indexing explained", "how do database indexes work", "types of database indexes", "sql indexes explained", "database indexing system design", "database indexing postgresql / mysql", "clustered vs non clustered index". Google adds the symptom side: "why is my sql query so slow", "how to make sql query faster", "full table scan vs index scan", "seq scan vs index scan postgresql", "postgres foreign key index", "database index vs primary key".
3. **What breaks out (last 6-12 months):** a problem or a contrast about indexes, not a definition. "Database Indexes - You Might Be Using Them Wrong" (5.8x its channel's usual), "Postgres and MySQL Indexes Are Completely Different" (28x), "99% of Developers Don't Get PostgreSQL" (19x), "7 Simple Tricks to Instantly Make Your SQL Queries Better" (8x). Definitions ("Database Indexes Explained In 6 Minutes", "How SQL Indexes Actually Work") get only their channel's normal views. **So: the keyword at the front for search, the symptom (slow) or the mistake for the click.**
4. **Their thumbnails:** the topic word huge (INDEXES, PostgreSQL, SQL), plus one literal object: code with a red X and a green tick, a B-tree drawn on a board, a clock, a book held up, the elephant logo. Face in 8 of 12, 1-4 words, one yellow highlight. Her viral samples do the same thing for life topics: topic named + the topic's object.
5. **Her channel:** recent long videos get 40-230 views; her database videos got 161 ("DATABASE RELATIONSHIPS") and 56 ("Database Normal Forms"). Search is how a small channel gets found on a topic like this, so **lead with a search-led title** and test click-led thumbnails against it.

**Topic sentence a stranger recognises:** *How database indexes work, and how they make slow SQL queries fast (and when they don't).*

**Main keywords (with evidence):**
| Keyword | Evidence |
|---|---|
| database indexes explained / database indexing explained | YouTube + Google suggestion for "database index", "database indexes", "database indexing" |
| how do database indexes work | YouTube + Google suggestion; Milan Jovanović "How SQL Indexes Actually Work" 40K |
| sql indexes explained / sql index | YouTube suggestion ("sql indexes explained", "...in 20 minutes"); Socratica "SQL Index" 640K (older) |
| types of database indexes / database index types | YouTube + Google suggestion |
| slow sql query / how to make sql query faster | Google suggestions "why is my sql query so slow", "how to make sql query faster"; techTFQ 155K (8x) |

---

## 1. YouTube titles (all checked by code: 40-60 characters, keyword inside the first 40)

**Recommended upload title: S1.** Top pairs and Test & Compare plan in section 2. Round 1 of the cold review rewrote every title that scored under 8 (section 8).

### Search-led (exact search words first)
| ID | Title | Chars | Keyword ends at |
|---|---|---|---|
| S1 | Database Indexes: Why Your App Slows Down as It Grows | 53 | 16 |
| S2 | How Database Indexes Find 1 Row in a Million | 44 | 20 |
| S3 | Database Indexing for Beginners: Fix Slow SQL Queries | 53 | 17 |
| S4 | SQL Indexes: Make Slow Queries Fast with One Line | 49 | 11 |
| S5 | Database Index Types: Which One Should You Use? | 47 | 20 |
| S6 | What Is a Database Index? (And Why Your App Needs One) | 54 | 24 |
| S7 | Clustered vs Non-Clustered Index (and Other Index Types) | 56 | 32 |
| S8 | Database Index Mistakes (and How to Check with EXPLAIN) | 55 | 14 |

### Click-led (stakes, contrast, curiosity; still true to the video)
| ID | Title | Chars | Keyword ends at |
|---|---|---|---|
| C1 | No Index? Your Database Reads Every Single Row | 46 | 8 |
| C2 | Added an Index and It's Still Slow? Check This First | 52 | 14 |
| C3 | Why Indexing Every Column Makes Your Database Slower | 52 | 25 |
| C4 | 6 Indexes, 7 Writes: The Hidden Cost of Database Indexes | 56 | 9 |
| C5 | 2 Database Index Mistakes (and a Postgres Gotcha) | 49 | 16 |
| C6 | Why Your Database Ignores Your Index (2 Common Mistakes) | 56 | 36 |
| C7 | Don't Add a Database Index Before You Run EXPLAIN | 49 | 26 |

Honesty notes: "1 Row in a Million" is her own example (about 20 comparisons, a few B-tree levels). "One Line" = `CREATE INDEX …` / `$table->index()`, which she shows. "2 Common Mistakes" = the function and the leading wildcard; C5's "Postgres Gotcha" is the foreign key point she presents right after them. "6 Indexes, 7 Writes" is her orders-table example (the table plus six indexes). "Check This First" (C2) = EXPLAIN. S7 leads with clustered vs non-clustered because it is a big search phrase; the video covers it in its types section (about 35 s) alongside B-tree, unique, composite, hash, bitmap, spatial and full-text. No title says an index fixes every slow app (BRIEF: simplified claim).

---

## 2. Thumbnail concepts (22), each with the titles it pairs with

Rules applied (THUMBNAILS.md RULE 0 + 1): topic in plain words + a literal picture of the topic; 1-5 words; not the title again; never a line from her script. Every concept carries a **database cue** (a table of rows, a database cylinder, SQL code or a logo) because the cold reviewer read "INDEXES" alone as a book or stock index. **Her photos:** frames from the recording show her in an orange headwrap and cream jumper, desk chair, plants and a bookshelf behind, with good gestures (pinch "this small", hand on head, pointing). Concepts marked **[photo ask]** are much stronger with a new photo of her holding the prop; otherwise use the prop as a cut-out beside a video frame (collage style). Logos (PostgreSQL elephant, MySQL dolphin) only small, as identification. Her orange headwrap is a free accent: use orange `#FF4713` for the one highlight in most of these.

**Top 3 title + thumbnail pairs (after 2 cold-review rounds):** ★ T12 + S1, ★ T07 + C2, ★ T06 + C6. For a thumbnail-only Test & Compare under one title, use S1 with T12, T07 and T06.

| # | Words on it | Picture (objects, her pose, layout) | Follows | Why a stranger gets it | Pair with |
|---|---|---|---|---|---|
| T01 | **SLOW DATABASE?** ("SLOW" in an orange box) | Her at the desk, hand on her head (her real gesture in the recording), laptop beside her showing a loading spinner over a table of rows with a database cylinder icon. | Sample 5 (topic named + scene); LearnThatStack's "INDEXES SLOWER?" (5.8x) | Names the problem and the subject in two words; the face says "frustrating". | S1, S4, C2 |
| T02 | **DATABASE INDEX = THIS** | She holds up an open book at its index page ("Index… Alice 12, Bob 47…"), pointing at it; a small database table at the bottom corner with an arrow from the page. **[photo ask]** | Sample 1 (topic + its object) | Everyone has used a book's index; the arrow to the table says "your database works the same way". | S6, S3 |
| T03 | **READS EVERY ROW** | Warm paper ground. A tall printout of a database table (database cylinder icon at the top) with a red line running down every row; one row at the bottom highlighted orange; her small at the right edge, eyebrows raised. | Sample 2 (object = the outcome) | The slow behaviour, drawn: a whole table read for one row. | C1, S1 |
| T04 | **20 STEPS** | Her pointing at a hand-drawn tree labelled "index" (3 levels, emails in the boxes, one orange path down to bob@email.com, ending at a table row labelled "Bob's row"). | Sample 4 (diagram on a board) + Ben Dicken's board (11x) | A labelled index tree with one path + a small number = how it finds data fast. | S2, C1 |
| T05 | **WRONG COLUMN ORDER** | She holds a thick phone book; a big code card beside her: `INDEX (last_name, first_name)` with a green tick under `last_name` and a red X under `first_name`. **[photo ask]** | Sample 3 (framework on sticky notes) | Code + red/green ties the phone book to databases; the words name the mistake. | S5, C5 |
| ★ T06 | **LOWER() BREAKS IT** | Split code card: left `WHERE LOWER(email) = …` with a red X, right `WHERE email = …` with a green tick. Her on the right, eyebrows raised, pointing at the red one. | techTFQ "7 SQL tricks" (8x) + sample 4 | Real code + red/green = a mistake you might be making; the words don't repeat the title. | C6, C5, S1 |
| ★ T07 | **IS IT USING THE INDEX?** | A dark terminal card with one huge red line: `Seq Scan on orders`; her leaning in with a squint. | Code-card outliers | A plain question every developer has; "Seq Scan" in red is the answer they dread. | C2, S8 |
| T08 | **WHICH INDEX?** | Three big sticky notes on a database table printout: B-TREE (exact match + range drawn as a ruler), HASH (one key), SPATIAL (a map pin); her hand on chin. | Sample 3 | Three named choices with a picture each = "which type should I use". | S5, S7 |
| T09 | **INDEX EVERYTHING?** | A database table whose every column header has a small orange tag on it; her sceptical face, arms crossed. | Sample 4 (the question the viewer has) | The beginner's question, shown on a real table. | C4, C7 |
| T10 | **CLUSTERED vs NON-CLUSTERED** | Left: a phone book (the data itself in order). Right: a book's back-page index with arrows out to pages. Her between, one hand toward each. | Saved "X vs Y" splits | The two kinds shown as two familiar books; a common interview question. | S7, S5 |
| T11 | **"NEAR ME" NEEDS AN INDEX** | A phone map with coffee-cup pins, a dashed circle around the blue "you are here" dot, only the pins inside the circle lit; small database cylinder in the corner; her looking at the phone. | Sample 1 (topic object fills the frame) | Everyone has searched "near me"; it shows an index type doing something real. | S5, S7 |
| ★ T12 | **FAST… THEN SLOW?** | Before/after split: left a phone showing an app that has loaded (small label "10 users"), right the same app stuck on a spinner with a database cylinder icon under it (small label "10,000 users"). Her face between, worried. No invented timings. | Saved "Day 1 / Day 900" splits + the "fast with 10 rows, crawls with 10,000" conversation | The exact symptom her opening describes; anyone with a growing app sees themselves. | S1, C1 |
| T13 | **ONE LINE OF SQL** | Paper card with `CREATE INDEX ON books (author_id);` in big mono type, orange highlight on CREATE INDEX; her holding up one finger. | Sample 2 (one object = the outcome) | One line + real code = small effort, clear payoff. | S4, S3 |
| T14 | **SMALL TABLE? SKIP IT** | A tiny 10-row table on a sticky note next to a towering printout of rows; an index tab only on the tall one; her pointing at the small one, shaking her head. | Sample 2 + scale contrast | Says plainly when an index is not worth it. | C7, C4 |
| T15 | **POSTGRES FOREIGN KEYS** | PostgreSQL elephant on the left, two tables joined by a line with a red warning sign on the join; her frowning. | PlanetScale "Postgres and MySQL Indexes Are Completely Different" (28x) | Postgres users recognise the logo and the join at once; the words name what to check. | C5, C2 |
| T16 | **WHEN TO INDEX** | Her holding a clipboard with 3 big lines: "WHERE ✓", "ORDER BY ✓", "every column ✗" (the last line red). | Sample 2 (clipboard + DONE) | A three-line checklist reads at phone size. | C7, S6 |
| T17 | **SLOW JOINS?** | Her frowning at a laptop; on screen two database tables joined by a line, the line red with a small warning sign. | LearnThatStack's warning-sign thumbnail | A real pain with a database picture. | C5, C2 |
| T18 | **LARAVEL INDEX** | Her pointing at a big code card: `$table->index('author_id');` inside a migration; the Laravel name small in the corner; a database cylinder beside it. | Code-card outliers + sample 2 | Laravel developers search "laravel database indexing"; the code shows the one line. | S3, S4 |
| T19 | **SEARCH INSIDE TEXT** | A shop search bar typed "wireless headphones" and three product cards with those words highlighted; small database cylinder; her pointing at the search bar. | Sample 9 (objects of the topic) | Shows the full-text index doing what everyone uses daily. | S5, S7 |
| T20 | **INDEX IGNORED?** | One huge line of code across the frame: `WHERE title LIKE '%fall%'` with the first `%` circled red; a database cylinder with a "skip" arrow; her wincing. | Code-card outliers | One readable line, one red circle: the mistake is visible. | C6, C5 |
| T21 | **20 STEPS, NOT A MILLION** | Flat off-black ground, a big white tree labelled "index" with one orange path ending in a table row; her large on the right pointing at it. | Ben Dicken / ByteMonk tree visuals | The payoff in numbers plus the structure that does it. | S2, C1 |
| T22 | **MORE INDEXES, SLOWER WRITES** | Her pointing at a simple bar chart, "reads" bar short (fast), "writes" bar long; six index tags on a database table beside it. | Sample 4 (a diagram of the trade-off) | Surprises people who think indexes only make things faster. | C3, C7 |

Why the top 3:
- **T12 "FAST… THEN SLOW?" + S1** is the symptom from her own opening and from the current "my app got slow as it grew" conversation; the cold reviewer scored the pair 8 and needed no database knowledge.
- **T07 "IS IT USING THE INDEX?" + C2** (8): the most common frustration ("I added an index and it's still slow") with the answer they dread in red.
- **T06 "LOWER() BREAKS IT" + C6** (8): the mistake format that out-performs plain definitions this year, with code a developer reads at a glance.
- Runner-up: **T21 "20 STEPS, NOT A MILLION" + S2** (8).

---

## 3. Description, chapters, tags

**First two lines (they show in search and stand alone):**
> Database indexes explained: why your app and SQL queries get slow as your tables grow, and how an index finds one row out of a million in about 20 comparisons.
> I cover what a database index is, B-tree, unique and composite indexes, how to check your index with EXPLAIN (PostgreSQL and MySQL), and the mistakes that stop an index from working.

**Rest of the description:**
> I learned the "find bob@email.com" example from Sergey Egorenkov's article, linked below; it's the clearest explanation I've read.
>
> In this video: what your database does with no index (a full table scan), the index at the back of a book, how a B-tree finds data, adding an index in SQL and in a Laravel migration, Seq Scan vs Index Scan, B-tree, unique and composite indexes (the phone book example), hash, bitmap, spatial and full-text indexes, clustered vs non-clustered, why you shouldn't index every column, two mistakes that make your database ignore your index, the PostgreSQL foreign key gotcha, and when to actually add an index.
>
> CHAPTERS
> (keep her kit's source list, "SOURCES AND FURTHER READING", and "CONNECT WITH ME" links below this)

**Chapters.** Times on the raw file, and on the upload if the first 20 seconds of silence are trimmed (recommended):
| Trimmed upload | Raw file | Chapter |
|---|---|---|
| 0:00 | 0:20 | Why your app gets slower as your data grows |
| 0:26 | 0:46 | What happens without an index (full table scan) |
| 1:08 | 1:28 | What a database index is |
| 1:43 | 2:03 | How an index finds one row in a million |
| 2:34 | 2:54 | B-trees |
| 2:50 | 3:10 | How to add an index (SQL and Laravel) |
| 3:11 | 3:31 | Check your index is used with EXPLAIN |
| 3:51 | 4:11 | Index types: B-tree |
| 4:31 | 4:51 | Unique index |
| 4:44 | 5:04 | Composite index (the phone book) |
| 5:55 | 6:15 | Hash, bitmap, spatial and full-text indexes |
| 7:00 | 7:20 | Clustered vs non-clustered indexes |
| 7:35 | 7:55 | Why not index every column? |
| 8:28 | 8:48 | Two mistakes that stop your index working |
| 9:09 | 9:29 | The PostgreSQL foreign key gotcha |
| 9:33 | 9:53 | When to add a database index |

**Tags (paste-ready, 488 characters, under the 500 limit):**
database indexes explained, database indexing explained, database index, how do database indexes work, sql indexes explained, sql index, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan, explain analyze postgresql, postgres index, mysql index, postgres foreign key index, full table scan, database performance, laravel index

---

## 4. Shorts to cut from the recording (6 + 2 spare)

Follows `inspiration/know-how/SHORTS-PLAYBOOK.md` (her own shorts, studied 2026-10-12): one idea per short from one continuous stretch, in the long video's order; start on the line that states the topic, end on a punch line; trim asides and retakes; a **series label** box at the top all the way through (it carries the context so a stranger knows the topic from frame 1); her spoken caption at the bottom; end card "FULL VIDEO ON YOUTUBE" 5-7 s; most of hers run 34-61 s. The on-screen hook below is the first caption beat / opening insert; the series label is separate. Times are on the RAW file (word timings from `transcript.words.json`).

| # | Cut (raw) | Length | On-screen hook (first 2 s) | Why a stranger gets it |
|---|---|---|---|---|
| SH1 | 7:57.5 → 8:44.6 ("if database indexes make queries so fast…" → "You don't index everything.") | 47 s | **Why not index every column in your database?** | Starts on the question every beginner has; she answers it fully (writes, storage, small tables, what to index). |
| SH2 | 5:04.1 → 6:14.6 ("And the third one, this one kind of always confuses me…" → "…most often first.") Trim "A little bit of a reason" (~5:22) to land near 60 s. | ~62 s | **Why your 2-column index can't find everyone called Ada** | The phone book is a complete story; her "this one always confuses me" makes it relatable. |
| SH3 | 2:03.0 → 2:52.0 ("Now, what mechanism does a database index use to find things so fast?" → "…worst case scenario.") Optional: cut the spoken article mention (2:06.3-2:13.4) and credit the article on screen instead. | 42-49 s | **How a database finds 1 row in a million** | Bob / Dave / Alice is a self-contained puzzle; ends on 20 steps vs a million. |
| SH4 | 3:31.0 → 4:11.5 ("Once you've added your database index…" → "…or is it using an index?") | 40 s | **You added an index. Is it even being used?** | A practical check anyone can run today; Seq Scan vs Index Scan on screen. |
| SH5 | 9:29.2 → 9:53.4 ("Another database index gotcha…" → "…joins suddenly get slow.") | 24 s | **Moved to Postgres and joins got slow? Here's why.** | A surprising, checkable fact; MySQL vs Postgres is a contrast people share. |
| SH6 | 8:48.3 → 9:29.0 ("And there are several mistakes…" → "…the index cannot help you find it.") | 41 s | **2 ways to make your index useless** | Two concrete mistakes with code on screen; useful even if you know indexes. |
| spare SH7 | 1:28.2 → 2:02.0 ("What is a database index?…" → "…than the table itself.") | 34 s | **This is a database index** (book index page fills the frame) | The book-index analogy; perfect for beginners. |
| spare SH8 | 0:46.6 → 1:28.0 ("So to understand why a database index matters…" → "…at a million rows, then it's a problem.") | 41 s | **Why apps slow down as they grow** | One query, a million rows, every row checked: a complete picture. |

**Series labels (top box, her Helvetica style, plain words a stranger understands):** SH1 "why not index every column?" · SH2 "composite indexes (the phone book)" · SH3 "how a database index works" · SH4 "is your index being used?" · SH5 "Postgres foreign keys" · SH6 "why your index gets ignored" · SH7 "what is a database index?" · SH8 "why apps get slow". Optional series in the long video's order: "database indexes (pt 1)" = SH8, "(pt 2)" = SH7, "(pt 3)" = SH3, "(pt 4)" = SH4, "(pt 5)" = SH2, "(pt 6)" = SH1, "(pt 7)" = SH6, "(pt 8)" = SH5, each ending on its punch line. Each short ends on a complete thought: SH1 "You don't index everything.", SH2 "put the column you search by most often first", SH3 "up to a million checks in the worst case", SH4 "full scan or is it using an index?", SH5 "joins suddenly get slow", SH6 "the index cannot help you find it".

On-screen corrections inside the shorts (BRIEF): caption "Seq Scan" (never "sex scan"), "B-tree", "Okafor", "Adeyemi", "rows" (not "rules"), "can't" at 9:12, and at 2:52 do NOT caption "Without an index, you will do way less" (end SH3 before it).

---

## 5. Captions (every one stands alone; simple words, full sentences, no em-dashes, no hype words)

### Main video post (for the upload week)
**YouTube community / LinkedIn:**
> Your app was fast with a few users. Now it has thousands, and every page loads slowly.
> Often the reason is a missing database index.
> My new video explains, in plain words, how an index finds one row in a million, and how to check that your queries actually use it.
> Full video on my channel, With Gbemi. Link in the comments.
> #Databases #SQL #SoftwareEngineering

**LinkedIn, optional news angle (our framing, not her quote):**
> Some apps built fast this year are hitting the same wall: quick with test data, slower every week once real users arrive. Often the cause: the database has no index on the columns it searches, so it reads every row. My new video explains how indexes work, how to spot this with EXPLAIN, and when not to add one.

**X:**
> Your database can find one row in a million in about 20 comparisons, or check all million rows. The difference is an index. New video: how database indexes work, explained simply.

### SH1 Why not index every column?
- **TikTok:** Six indexes on a table means seven writes for every new row. That's why you don't index every column in your database. #database #sql #webdev #techtok #learntocode
- **Reels:** Six indexes on a table means seven writes for every new row. Every insert, update and delete has to update each index too, and indexes take up space. So index only the columns you search, filter, join or sort by. Full video on YouTube: With Gbemi. #database #sql #backend #webdev #softwareengineering
- **Shorts title:** 6 indexes = 7 writes for every new row #shorts #database #sql
- **LinkedIn:** Six indexes on an orders table means seven writes for every new order. That's the cost people forget when they ask "why not just index every column?" Each index has to be updated on every insert, update and delete, and each one takes space. Index what you search, filter, join or sort by. #Databases #SQL
- **X:** Why not index every column? Because a table with six indexes does seven writes for every new row.

### SH2 Composite index and the phone book
- **TikTok:** Your index on last name and first name won't help you find everyone called Ada. A phone book shows why. #sql #database #postgresql #mysql #techtok
- **Reels:** Your index on last name and first name won't help you find everyone called Ada. Think of a phone book, or a contacts list sorted by surname: so Ada Okafor is easy to find, but every Ada is spread across the whole book. Put the column you search most often first. #sql #database #backend #webdev #learntocode
- **Shorts title:** Your index can find Ada Okafor but not every Ada #shorts #sql
- **LinkedIn:** An index on (last_name, first_name) won't help you find everyone called Ada. A phone book explains it: sorted by surname first, so "Okafor, Ada" is quick, but the Adas are scattered across every page. Composite indexes work the same way. Put the column you search by most often first. #SQL #Databases
- **X:** An index on (last_name, first_name) is a phone book. Great for "Okafor, Ada". No help for "everyone called Ada".

### SH3 How a database finds 1 row in a million
- **TikTok:** How does a database find one email in a million rows in about 20 comparisons? It never reads them all. #database #sql #coding #techtok #learntocode
- **Reels:** One email, a million rows. Without an index, the database may check every row. With an index, it skips most of the list at every step and gets there in about 20 comparisons. #database #sql #backend #computerscience
- **Shorts title:** How a database finds 1 row in a million #shorts #database
- **LinkedIn:** One email, a million rows. No index: up to 1,000,000 checks. With an index: about 20 comparisons, because each step rules out most of what's left. That one idea is why indexes matter. (Example credit: Sergey Egorenkov's article.) #Databases #SoftwareEngineering
- **X:** One email, a million rows. No index: up to 1,000,000 checks. With an index: about 20.

### SH4 Is your query using your index?
- **TikTok:** Added an index and your query is still slow? Ask the database. Put EXPLAIN in front of the query. #postgresql #mysql #sql #webdev #techtok
- **Reels:** Added an index and your query is still slow? Put EXPLAIN in front of it. If PostgreSQL says Seq Scan, it's reading every row. If it says Index Scan, it's using your index. #postgresql #mysql #sql #backend #webdev
- **Shorts title:** You added an index. Is it even being used? #shorts #sql
- **LinkedIn:** Added an index and the query is still slow? Before guessing, ask the database: put EXPLAIN in front of the query. "Seq Scan" in PostgreSQL, or type "ALL" in MySQL, means every row is being read. #SQL #PostgreSQL #MySQL
- **X:** Slow query? Put EXPLAIN in front of it first. "Seq Scan" means your database is reading every row.

### SH5 Postgres doesn't index your foreign keys
- **TikTok:** Moved to Postgres and your joins got slow? MySQL indexes your foreign keys for you. PostgreSQL doesn't. #postgresql #mysql #laravel #webdev #techtok
- **Reels:** Moved to Postgres and your joins got slow? MySQL creates an index on a foreign key column automatically. PostgreSQL doesn't. Check that your foreign key columns have indexes. #postgresql #mysql #backend #laravel #database
- **Shorts title:** Moved to Postgres and joins got slow? Here's why #shorts #postgresql
- **LinkedIn:** A small difference that causes slow joins: MySQL (InnoDB) indexes foreign key columns automatically, PostgreSQL doesn't. Teams moving from MySQL to Postgres often find this out the hard way. Worth checking your schema today. #PostgreSQL #MySQL #Databases
- **X:** MySQL indexes your foreign keys automatically. PostgreSQL doesn't. Check yours.

### SH6 Two mistakes that make your database ignore your index
- **TikTok:** You added an index and your database ignores it. Two common reasons: LOWER(email) in your WHERE, and a LIKE that starts with %. #sql #database #postgresql #webdev #techtok
- **Reels:** You added an index and your database ignores it. Two common reasons: you wrapped the column in a function, like LOWER(email), or your LIKE search starts with a wildcard, like '%fall%'. #sql #database #backend #webdev #learntocode
- **Shorts title:** 2 ways to make your index useless #shorts #sql
- **LinkedIn:** You added an index and your database still ignores it. Two common reasons: a function around the indexed column (LOWER(email) needs an index on that same expression) and a LIKE search that starts with a wildcard. #SQL #Databases
- **X:** Your index exists but isn't used. Two reasons: LOWER(email) in the WHERE, and LIKE '%word%'.

### Spare SH7 / SH8
- **SH7:** Your database reads every row unless it has this. A database index works like the back page of a book. It's a sorted list of values, each pointing to where the row lives, so the database goes straight there instead of reading every row. #database #sql #learntocode
- **SH8:** Your app is slow because your database reads every row. With no index, a database looking for one author's books in a million-row table starts at row one and checks every single row. That's a full table scan. #database #sql #webdev

---

## 6. Hooks

### Short-form hooks (on screen, first 2 seconds)
1. Why not index every column in your database?
2. Your app was fast with 10 users. Not with 10,000.
3. How a database finds 1 row in a million
4. You added an index. Is it even being used?
5. Moved to Postgres and joins got slow? Here's why.
6. 2 ways to make your index useless
7. This is a database index (the book's index page fills the frame in the first second)

### Carousel slide 1 options
**Instagram (1080×1350):**
1. Why your app gets slower as more people use it
2. How a database finds 1 row in a million
3. Why your contacts list explains database indexes
4. Before you add a database index, check these 5 things (the 5, from her when-to-index section: searched in WHERE, joined, sorted, EXPLAIN shows a full scan, read far more than written)

**LinkedIn (PDF):**
1. Database indexes in 9 slides: when to add one, when not to
2. Slow query? 2 index mistakes and 1 Postgres gotcha
3. The database index cheat sheet: B-tree, unique, composite, hash, spatial, full-text
4. Indexing every column makes your database slower. Here's why.

---

## 7. Cold review (quality gate)
See section 8: a fresh reviewer with no context read only the titles, thumbnail concepts and captions.

## 8. Cold review results
Two fresh reviewers with no context saw only the titles, thumbnail concepts and captions (2026-10-12).
- **Round 1:** titles 5-8 (only C1, C2, C6 at 8); thumbnails alone 3-7, five CAN'T PLACE (T03, T05, T19, T22, and T02 nearly: "INDEXES" read as a book or stock index); best pairs 8. Captions 6-8, no em-dashes or hype. Fixes: every title under 8 rewritten; a database cue (table, cylinder, code, logo) added to every thumbnail; thumbnail words changed where they echoed the title; captions now open with the concrete fact or frustration.
- **Round 2:** titles 6-8 (C2, C6 at 8); pairs T07+C2, T21+S2, T12+S1, T06+C6 at 8; two CAN'T PLACE left (T10 collage, T20 "it"). Flags: duplicate ideas (four "1 in a million", three book-index, four "slow" thumbnails), mismatched pairs (T05, T15, T17), inconsistent mistake counts (2 / 3 / 5), and "cut in half at every step" being binary-search wording a developer would correct. Fixes applied: the duplicates replaced by new, distinct concepts (T10 clustered vs non-clustered, T11 "near me", T14 small tables, T18 Laravel, T19 full-text); T20 reworded; pairs fixed; counts made consistent ("2 mistakes and a Postgres gotcha"); "about 20 comparisons" in captions; S7, S8, C3, C4, C5, C7 rewritten.
- **Still under 8 after round 2, kept on purpose:** the plain search-led titles (S3, S5, S6 scored 6): they exist to match exact searches, not to win clicks; they pair with the strongest thumbnails. The new concepts from round 2's fixes were not re-scored.

---

## 9. Sources (checked 2026-10-12)

**News and conversation**
- PostgreSQL home page, news list (19 Beta 4 released 2026-09-24; no final 19 yet): https://www.postgresql.org/
- PostgreSQL 18 release notes, 2025-09-25 (skip scan for multicolumn B-tree indexes): https://www.postgresql.org/docs/release/18/ and https://www.postgresql.org/about/featurematrix/detail/skip-scan-on-multicolumn-b-tree-indexes
- HackerNoon, "Why Vibe Coders Eventually Hit a Database Wall (and Don't Know Why)", HariMindi, 4 May 2026: https://hackernoon.com/why-vibe-coders-eventually-hit-a-database-wall-and-dont-know-why
- "Lovable app slow after adding data (2026)": https://aliteq.com/lovable-app-slow-after-adding-data-2026
- AppSignal, "What metrics to monitor in your vibe coded app", 1 Apr 2026: https://blog.appsignal.com/2026/04/01/what-metrics-to-monitor-in-your-vibe-coded-app.html
- Laravel 13 release notes (released 17 Mar 2026; no index changes): https://laravel.com/docs/13.x/releases

**Outlier videos** (views read 2026-10-12 with yt-dlp; "usual" = median views of the channel's last ~30 uploads; ratio = views ÷ usual. Upload dates from YouTube where yt-dlp could read them; the rest came from YouTube's "this year" filter, so 2026.)
| Video | Channel | Views | Channel usual | Ratio | Uploaded |
|---|---|---|---|---|---|
| [Postgres and MySQL Indexes Are Completely Different](https://www.youtube.com/watch?v=T3P9TLi5R08) | PlanetScale (42.7K subs) | 40,276 | 1,450 | 28x | 2026-08-28 |
| [The One Trick To 10x Your Database Performance](https://www.youtube.com/watch?v=934J1v_B238) | Plato Codes (4 videos) | 6,885 | 285 | 24x | 2026 |
| [99% of Developers Don't Get PostgreSQL](https://www.youtube.com/watch?v=P8rrhZTPEAQ) | The Coding Gopher | 358,961 | 18,500 | 19x | 2026 |
| [Make computers FAST (Systems Performance ch. 1)](https://www.youtube.com/watch?v=RBpIzmOcPmw) | Ben Dicken | 64,730 | 4,000 | 16x | 2026 |
| [Why More Database Connections Make Your App Slower](https://www.youtube.com/watch?v=4IeCUl64Ar0) | Perfology | 25,655 | 2,000 | 13x | 2026 |
| [Write-Ahead Logs. The secret to fast database queries.](https://www.youtube.com/watch?v=s3hKYMOpp3E) | Ben Dicken | 43,815 | 4,000 | 11x | 2026 |
| [7 Simple Tricks to Instantly Make Your SQL Queries Better](https://www.youtube.com/watch?v=p5PKnqGyDaE) | techTFQ | 155,391 | 18,500 | 8.4x | 2026 |
| [Database Indexes - You Might Be Using Them Wrong](https://www.youtube.com/watch?v=RufupUDBtYY) | LearnThatStack (112K subs) | 61,306 | 10,500 | 5.8x | 2026-02-25 |
| [Database Indexing Rapid Fire (Short)](https://www.youtube.com/shorts/k7TAISCoefA) | The Curious Coder | 86,311 | 15,000 (shorts) | 5.8x | 2026 |
| [Advanced SQL Query Optimization: 7 Performance Tricks](https://www.youtube.com/watch?v=Qzq3ykoZaDA) | Manish Sharma | 19,259 | 3,800 | 5.1x | 2026 |
| [12 minutes to understand all about INDEX in Database](https://www.youtube.com/watch?v=CcfEjMISKoQ) | sydexa | 22,803 | 6,000 | 3.8x | 2026 |
| [B-trees and data organization (Database Internals ch. 2)](https://www.youtube.com/watch?v=-FzLvbCYL0o) | Ben Dicken | 14,669 | 4,000 | 3.7x | 2026 |
| Not outliers (for contrast): [How SQL Indexes Actually Work (Step-by-Step)](https://www.youtube.com/watch?v=teMXE6hzva0), Milan Jovanović, 40,025 vs usual 16,500 (2.4x), 2025-12-30 · [The Postgres Performance Trap Every Developer Falls Into](https://www.youtube.com/watch?v=BharE_Kc9sQ), Tech With Tim, 67,424 vs 63,500 (1.1x), 2026-03-17 · [Database Indexes Explained In 6 Minutes](https://www.youtube.com/watch?v=YC50j-nozZs), PawelCodeStuff, 7,754 vs 26,500 (0.3x), 2026-04-12 | | | | | |

What they share: the topic word or database name in the first 3 words; a problem, mistake, contrast or number ("Using Them Wrong", "Completely Different", "99%", "7 tricks", "Slower"); thumbnails with 1-4 words, one literal object (code with ✓/✗, a B-tree on a board, a clock with a warning sign, a book held up, a logo), a face in most. Plain definitions without a problem did not break out. TikTok and Instagram: no view data could be read (TikTok pages return no content to our tools; no `inspiration/social/` recordings yet), so the shorts plan leans on YouTube Shorts and her viral samples.

**Search suggestions** (YouTube `ds=yt` and Google, fetched 2026-10-12 from suggestqueries.google.com, seeds + a-z expansions): "database indexes explained", "database indexing explained", "how do database indexes work", "types of database indexes", "database indexing system design", "database indexing postgresql", "database indexing mysql", "database indexing b tree", "sql indexes explained", "sql indexes explained in 20 minutes", "clustered vs non clustered index", "b tree index", "postgres index types", "postgres composite index", "index in sql with example", "what is indexing in database", "database indexing interview questions", "database indexing in laravel", "laravel database indexing"; Google only: "why is my sql query so slow", "how to make sql query faster", "full table scan vs index scan", "seq scan vs index scan postgresql", "postgres foreign key index", "postgres does foreign key create index", "database index vs primary key", "explain analyze postgres".

**Her channel** (yt-dlp, 2026-10-12): recent long videos 18-234 views; "Everything you need to know about DATABASE RELATIONSHIPS" 161; "Database Normal Forms in 6 minutes" 56; best ever "nobody warned me about studying in Europe as a Nigerian" 6,400.

**Technical facts** (see `../BRIEF.md` "Verified facts")
- PostgreSQL indexes: https://www.postgresql.org/docs/current/indexes.html · EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html · expression indexes: https://www.postgresql.org/docs/current/indexes-expressional.html · partial: https://www.postgresql.org/docs/current/indexes-partial.html · ORDER BY: https://www.postgresql.org/docs/current/indexes-ordering.html · foreign keys: https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK
- MySQL EXPLAIN output: https://dev.mysql.com/doc/refman/8.0/en/explain-output.html · multi-column indexes: https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html · foreign keys: https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html · clustered index: https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html
- Use The Index, Luke (leading wildcards, function on column): https://use-the-index-luke.com/
- Sergey Egorenkov, "How Database Indexes Work (In Simple Words)" (the bob/dave/alice example; Medium blocked our fetch, details from her kit): https://medium.com/databases-in-simple-words/how-database-indexes-work-in-simple-words-f22558869c03
- Laravel migrations, indexes: https://laravel.com/docs/migrations#indexes

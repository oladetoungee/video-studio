# Refined kit: how database indexes work and why apps get slow without them

> **THE CURRENT KIT** for this video. Last updated: 2026-10-18 20:38. Her original kit is in `archive/original-kit/` (not current; don't read it).

Written 2026-10-12 by the social media strategist, restructured 2026-10-14 by the kit editor into the fixed order (same content, sorted, updated to what was actually built). Facts as in `../BRIEF.md`. This is the only kit file: everything from your own kit that we use (X posts, replies, the essay) is merged in below (2026-10-16); your original is in `../archive/database-indexes-kit.md`.

## At a glance
| | |
|---|---|
| Topic | How a database index works, how it makes slow SQL queries fast, and when it stops helping. |
| Recommended title | Database Indexes: Why Your App Slows Down as It Grows (53 characters) |
| Thumbnail | **Yours**: `kit/database indexes (1).png` ("Database Indexes", the book index → row picture). Pair it with S1 "Database Indexes: Why Your App Slows Down as It Grows". Our 26 options stay in `outputs/thumbnails/` as spare parts. |
| File to upload | `outputs/talking-head/talkinghead-full_16x9.mp4` (10:24, her edited video with graphics; chapters below are timed to it). Alternative: the motion film `outputs/video/database-indexes_motion_16x9.mp4` (10:34; its chapter times are in 1c). |
| Posting order | 1. Long video + YouTube community post + LinkedIn post (day 1)  2. Teaser on LinkedIn and X (day 1, once the video is live)  3. Instagram carousel (day 2)  4. LinkedIn carousel (day 3)  5. Shorts, one every day or two, in the long video's order: SH7, SH8, SH3, SH9, SH4, SH10, SH2, SH11, SH12, SH1, SH6, SH5, SH13 (days 3 to about 25)  6. X thread (any day in week 1) |
| Files | Thumbnails `outputs/thumbnails/` (copy in `~/Downloads/database-indexes-thumbnails/`) · Shorts `outputs/shorts/` (`~/Downloads/database-indexes/shorts/`) · Full edit `outputs/talking-head/` (`~/Downloads/database-indexes/talking-head/`) · Motion film `outputs/video/` (`~/Downloads/database-indexes/`) · Carousels `outputs/carousels/instagram/` and `outputs/carousels/linkedin/` (`~/Downloads/database-indexes-carousels/`). Studio (start it first): full edit http://localhost:7700/moment/database-indexes/full/ · shorts http://localhost:7700/moment/database-indexes/sh1/ to `/sh13/` · film http://localhost:7700/edit/database-indexes/ · thumbnails http://localhost:7700/design/database-indexes/thumbnails/ · carousels http://localhost:7700/design/database-indexes/carousels/instagram/ and `/linkedin/` |
| Where each platform's text is | YouTube title, description (with chapters, sources, connect, hashtags), tags, pinned comment: **section 1** · Thumbnails: **2** · Shorts (YouTube Shorts, TikTok, Reels, LinkedIn, X, per short): **3** · Teaser posts (LinkedIn, X): **4** · Carousel captions (Instagram, LinkedIn): **5** · Main video LinkedIn post, community post, X thread, more X posts, replies, essay: **6** |
| Open questions | 1. Pick the title (S1 recommended). 2. Listen at 4:11 in the full edit: "books priced between 10 and 15" (your kit says 50; the screen shows 10 and 15). 3. Listen at 4:22 for "titles that start with Harry" (whisper heard "Ari"). 4. Optional: new photos of you holding an open book at its index page, a phone book or a laptop, for stronger thumbnails.  |

## 1. YouTube

### 1a. Titles
All checked by code: 40 to 60 characters, keyword ("index", "indexes", "indexing" or the index type) inside the first 40 characters. S = search-led, C = click-led, D = added by the thumbnail designers on 2026-10-13.

| # | Title | Characters | Type | Pairs with thumbnail |
|---|---|---|---|---|
| S1 | Database Indexes: Why Your App Slows Down as It Grows | 53 | **recommended**, search-led | 05, 20, 01, 02, 21, 26 |
| S3 | Database Indexing for Beginners: Fix Slow SQL Queries | 53 | search-led (pairs with recommended thumbnail #2) | 07, 01, 02, 05, 09, 12, 15, 22, 23, 24, 25 |
| C2 | Added an Index and It's Still Slow? Check This First | 52 | click-led | 03, 13, 18, 25 |
| C6 | Why Your Database Ignores Your Index (2 Common Mistakes) | 56 | click-led | 04, 16 |
| S2 | How Database Indexes Find 1 Row in a Million | 44 | search-led | 06, 07, 19, 23, 26 |
| S4 | SQL Indexes: Make Slow Queries Fast with One Line | 49 | search-led | 01, 12, 22 |
| S5 | Database Index Types: Which One Should You Use? | 47 | search-led | 08, 09, 11 |
| S6 | What Is a Database Index? (And Why Your App Needs One) | 54 | search-led | 06, 07, 12, 14, 20, 21, 23, 24 |
| S7 | Clustered vs Non-Clustered Index (and Other Index Types) | 56 | search-led | (no built thumbnail) |
| S8 | Database Index Mistakes (and How to Check with EXPLAIN) | 55 | search-led | 03, 04, 16 |
| C1 | No Index? Your Database Reads Every Single Row | 46 | click-led | 02, 05, 06, 19, 26 |
| C3 | Why Indexing Every Column Makes Your Database Slower | 52 | click-led | 10, 14, 17 |
| C4 | 6 Indexes, 7 Writes: The Hidden Cost of Database Indexes | 56 | click-led | 10, 17 |
| C5 | 2 Database Index Mistakes (and a Postgres Gotcha) | 49 | click-led | 04, 08, 13, 16 |
| C7 | Don't Add a Database Index Before You Run EXPLAIN | 49 | click-led | 10, 14, 17, 25 |
| D1 | Seq Scan vs Index Scan: Is Your Query Using the Index? | 54 | search-led | 03, 18 |
| D2 | Composite Index Explained: Why Column Order Matters | 51 | search-led | 08 |
| D3 | B-Tree vs Hash vs Full-Text: Database Index Types | 49 | search-led | 09 |
| D4 | Spatial Index Explained: How 'Near Me' Search Works | 51 | search-led (for a spatial short only) | 11 |
| D5 | Spatial and Full-Text Indexes: How Apps Search Fast | 51 | search-led | 11 |
| D6 | Postgres Foreign Key Index: Why Your Joins Got Slow | 51 | search-led | 13 |
| D7 | Laravel Database Indexing: Fix Slow Queries in One Line | 55 | search-led (Laravel viewers only) | 15 |
| D8 | Database Indexes Explained: How Apps Search Fast | 48 | search-led | 19, 20, 21, 24 |

Honesty notes: "1 Row in a Million" is her own example (about 20 comparisons, a few levels in a real B-tree). "One Line" is `CREATE INDEX …` or `$table->index()`, which she shows. "2 Common Mistakes" are the function on the column and the leading wildcard; the "Postgres Gotcha" is the foreign key point. "6 Indexes, 7 Writes" is her orders-table example. No title says an index fixes every slow app (BRIEF: her "always" is a simplification). S7 and D3 name types she covers only briefly.

### 1b. Description
Ready to paste. Chapters are timed to `talkinghead-full_16x9.mp4`; if you upload the motion film instead, swap in its times from 1c.

```text
Database indexes explained: why your app and SQL queries get slow as your tables grow, and how an index finds one row out of a million in about 20 comparisons.
I cover what a database index is, B-tree, unique and composite indexes, how to check your index with EXPLAIN (PostgreSQL and MySQL), and the mistakes that stop an index from working.

I learned the "find bob@email.com" example from Sergey Egorenkov's article, linked below. It's the clearest explanation I've read.

In this video: what your database does with no index (a full table scan), the index at the back of a book, how a B-tree finds data, adding an index in SQL and in a Laravel migration, Seq Scan vs Index Scan, B-tree, unique and composite indexes (the phone book example), hash, bitmap, spatial and full-text indexes, clustered vs non-clustered, why you shouldn't index every column, two mistakes that make your database ignore your index, the PostgreSQL foreign key gotcha, and when to actually add an index.

CHAPTERS
0:00 Why your app gets slower as your data grows
1:07 What a database index is and how it works
2:47 How to add an index and check it with EXPLAIN
3:46 Types of database indexes
7:27 Why not index every column?
8:18 Common mistakes that stop your index working
9:23 When to add a database index

SOURCES AND FURTHER READING
How Database Indexes Work (In Simple Words), Sergey Egorenkov: https://medium.com/databases-in-simple-words/how-database-indexes-work-in-simple-words-f22558869c03
Database Indexing, Design Gurus: https://www.designgurus.io/blog/database-indexing
Indexing in Databases, GeeksforGeeks: https://www.geeksforgeeks.org/dbms/indexing-in-databases-set-1/
PostgreSQL documentation, Indexes: https://www.postgresql.org/docs/current/indexes.html
PostgreSQL documentation, EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
MySQL documentation, How MySQL Uses Indexes: https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html
Use The Index, Luke, Markus Winand: https://use-the-index-luke.com/
Laravel documentation, Migrations and Indexes: https://laravel.com/docs/migrations#indexes

CONNECT WITH ME:
LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
Twitter/X: https://x.com/OladetounGee
Instagram: https://www.instagram.com/officialgbemmy/
Website: https://www.gbemisolaoladetoun.com/

#databases #sql #softwareengineering
```
The three hashtags at the end show above the title on YouTube (YouTube uses the first three).

### 1c. Chapters
**7 broad chapters, not more** (her rule 2026-10-16: too many chapters can put viewers off; 5-7 at most). Times are where each part's first line starts in the exported file's `.srt`, not the raw recording.

| Chapter | Full edit `talkinghead-full_16x9.mp4` (upload this) | Motion film (if you upload that instead) |
|---|---|---|
| Why your app gets slower as your data grows | 0:00 | 0:00 |
| What a database index is and how it works | 1:07 | 1:08 |
| How to add an index and check it with EXPLAIN | 2:47 | 2:48 |
| Types of database indexes | 3:46 | 3:48 |
| Why not index every column? | 7:27 | 7:30 |
| Common mistakes that stop your index working | 8:18 | 8:22 |
| When to add a database index | 9:23 | 9:27 |

Motion film description chapters (paste these instead if you upload the film):
```text
0:00 Why your app gets slower as your data grows
1:08 What a database index is and how it works
2:48 How to add an index and check it with EXPLAIN
3:48 Types of database indexes
7:30 Why not index every column?
8:22 Common mistakes that stop your index working
9:27 When to add a database index
```

### 1d. Tags
One line, 488 characters (checked by code, under the 500 limit).

```text
database indexes explained, database indexing explained, database index, how do database indexes work, sql indexes explained, sql index, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan, explain analyze postgresql, postgres index, mysql index, postgres foreign key index, full table scan, database performance, laravel index
```

### 1e. Pinned comment
```text
What's the slowest query you've ever fixed by adding one index? Tell me the before and after times, I'd love to see them.
```

## 2. Thumbnails
Full notes, references and every round of scores: `../design/thumbnails/NOTES.md`. Edit them at http://localhost:7700/design/database-indexes/thumbnails/ . Scores are the final gate (round 4): A = a stranger seeing only the image (topic 1-5 / would click 0-10), B = title + thumbnail pair (0-10), C = taste against your references (0-10).

### 2a. Recommended 3
You made your own thumbnail and it is the one to post (`kit/database indexes (1).png`). The three below are our earlier picks, kept only as Test & Compare spares.
| # | File | Words on it | Title it pairs with | Cold scores (A · B · C) |
|---|---|---|---|---|
| 1 | `outputs/thumbnails/05-reads-every-row.png` | No index? It reads every row | S1 Database Indexes: Why Your App Slows Down as It Grows | 5/7 · 8 · 7 |
| 2 | `outputs/thumbnails/07-index-like-a-book.png` | A database index is this | S3 Database Indexing for Beginners: Fix Slow SQL Queries | 5/7 · 8 · 7 |
| 3 | `outputs/thumbnails/20-collage-explained.png` | database indexes, explained | S1 Database Indexes: Why Your App Slows Down as It Grows | 5/5 · 8 · 8 |

For a thumbnail-only Test & Compare under one title: S1 with 05, 07 and 20. The section thumbnails (03, 04, 08, 13, 16, 25) suit Shorts, community posts and later re-tests.

### 2b. All thumbnails
Contact sheet: `outputs/thumbnails/overview.png`. "Concept" refers to the original concept list in `refined-kit.v1.md` section 2.

| File | Words | Titles it pairs with | Note (final A · B · C) |
|---|---|---|---|
| 01-slow-database | why is my database so slow? | S1, S4, S3 | 2/6 · 7 · 6; concept T01 |
| 02-fast-then-slow | Fast… then slow? | S1, C1, S3 | 2/7 · 8 · 6; concept T12 (was a top pick before it was built) |
| 03-is-it-using-the-index | Is it using the index? | C2, S8, D1 | 4/7 · 8 · 7; concept T07; good for SH4 |
| 04-lower-breaks-index | LOWER() skips your index | C6, S8, C5 | 4/6 · 8 · 6; concept T06; good for SH6 |
| 05-reads-every-row | No index? It reads every row | S1, C1, S3 | 5/7 · 8 · 7; **recommended #1** |
| 06-20-steps | 1 row in a million, ~20 comparisons | S2, C1, S6 | 4/6 · 7 · 7; concept T21; good for SH3 |
| 07-index-like-a-book | A database index is this | S3, S6, S2 | 5/7 · 8 · 7; **recommended #2** |
| 08-column-order | Wrong column order? | D2, S5, C5 | 4/6 · 8 · 6; concept T05; good for SH2 |
| 09-which-index | which index type? | S5, D3, S3 | 4/5 · 6 · 7; concept T08 |
| 10-index-every-column | Index every column? | C3, C4, C7 | 4/6 · 6 · 6; concept T09; good for SH1 |
| 11-near-me | How "near me" works | D4, S5, D5 | 1/6 · 7 · 6; not for the main upload (reads as a maps video) |
| 12-one-line-of-sql | Slow query? One line. | S6, S3, S4 | 5/7 · 7 · 7; concept T13 |
| 13-postgres-foreign-keys | Postgres doesn't index this | D6, C5, C2 | 4/7 · 8 · 6; concept T15; good for SH5 |
| 14-when-to-index | When to add an index | C3, C7, S6 | 4/6 · 7 · 6; concept T16 |
| 15-laravel-index | Slow Laravel app? | D7, S3 | 4/6 · 7 · 5; not for the main upload (Laravel only) |
| 16-like-wildcard | Why your index gets ignored | S8, C6, C5 | 4/6 · 7 · 6; concept T20; good for SH6 |
| 17-slower-writes | 1 new order = 7 writes | C3, C4, C7 | 3/5 · 8 · 6; no photo; concept T22 |
| 18-seq-vs-index-scan | Same query. Slow / fast | D1, C2 | 3/5 · 5 · 6; no photo |
| 19-million-vs-20 | 1,000,000 checks or ~20? | S2, C1, D8 | 4/5 · 7 · 6; no photo |
| 20-collage-explained | database indexes, explained | S1, S6, D8 | 5/5 · 8 · 8; **recommended #3** |
| 21-remake-sample1 | DATABASE INDEXES | S1, D8, S6 | 5/6 · 6 · 6; remake of your viral sample 1 |
| 22-remake-sample5 | how to fix a slow query | S4, S3 | 2/6 · 7 · 4; not for the main upload |
| 23-remake-sample3 | How an index finds a row | S2, S6, S3 | 5/6 · 7 · 7; remake of your viral sample 3 |
| 24-index-page-hero | how a database index works | S6, S3, D8 | 4/5 · 6 · 5; not for the main upload (weaker twin of 07) |
| 25-sticky-wall | slow query? / run EXPLAIN / add an index | C7, C2, S3 | 4/6 · 7 · 7; sticky notes on your wall |
| 26-split-without-with | without an index / with an index | S2, C1, S1 | 5/7 · 7 · 6; before/after split |

## 3. Shorts
_Rewritten 2026-10-18 in her voice (HER-VOICE.md)._
All thirteen are built from this recording, 9:16, with the series label at the top, your captions at the bottom and a 4 s end card. Files in `outputs/shorts/` (copies in `~/Downloads/database-indexes/shorts/`); edit at http://localhost:7700/moment/database-indexes/sh1/ to `/sh13/`. Raw times are on the original recording `kit/database indexes.mov`.

Posting order (the long video's order, so they also work as a series), one every day or two after the long video: SH7, SH8, SH3, SH9, SH4, SH10, SH2, SH11, SH12, SH1, SH6, SH5, SH13. SH7 to SH13 added 2026-10-15 (13 in all: the video had more than six stand-alone ideas).

### SH1 · why not index every column?
File `outputs/shorts/short01-index-every-column_9x16.mp4` · 0:51 · label on screen "why not index every column?" · from 7:57.1 to 8:44.2 (raw)
Hook (first line she says): "If database indexes makes queries so fast, why don't we just index every column and be done with it?"

**YouTube Shorts**
```text
Title: Why not index every column in your database?

Description: If database indexes make queries so fast, why don't we just index every column and be done with it? We cannot. Every index has a cost. Every insert, update and delete also has to update every index on that table, so an orders table with six indexes means updating the table and all six indexes for every new order. Indexes take up storage too, and on a small table the database will often skip your index and just scan the table anyway. So you only index the columns you actually search, filter, join or sort by.

#Shorts #database #sql #webdev #backend

Tags: database index, database indexes explained, index every column, too many indexes, database performance, sql index, sql indexes explained, how do database indexes work, database indexing explained, postgres index, mysql index, full table scan, slow writes database, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster
```
**TikTok**
```text
Why don't we just index every column in our database? Because every index has a cost: an orders table with six indexes has to update the table and all six indexes for every new order.
#database #sql #webdev #backend #learntocode #techtok
```
**Instagram Reels**
```text
So why don't we just index every column and be done with it? We cannot. Every insert, update and delete also updates every index on the table, and indexes take up storage too. Index only the columns you search, filter, join or sort by. Full video on YouTube: @WithGbemi
#database #sql #backend #webdev #softwareengineering #learntocode
```
**LinkedIn**
```text
If database indexes make queries so fast, why don't we just index every column and be done with it?

We cannot. Every index has a cost.

Every time you insert, update or delete a row, the database also has to update every index on that table. So if your orders table has six indexes, every new order means updating the table and all six indexes. The more indexes you have, the slower your writes get, and each one takes up storage space as well.

And for a small table (like 10 rows), the database will often skip your index and just scan the table anyway, because that's faster.

So what you do is only index the columns you actually search, filter, join or sort by. As good as indexes are, they can get costly too 🫠

How many indexes are sitting on your busiest table right now?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend
```
**X**
```text
Why not index every column? Because every insert, update and delete also has to update every index, so six indexes on an orders table means seven writes for every new order.
```

### SH2 · composite indexes (the phone book)
File `outputs/shorts/short02-composite-phone-book_9x16.mp4` · 1:11 · label on screen "composite indexes (the phone book)" · from 5:06.3 to 6:15.0 (raw), with 5:21.8 to 5:23.0 cut
Hook (first line she says): "The third one is the composite index, which is an index on more than one column."

**YouTube Shorts**
```text
Title: Composite index explained with a phone book

Description: A composite index is an index on more than one column, and this one kind of always confuses me. Say you index last name and first name together, in that order. It helps when you search by last name, or by last name and first name, but it usually doesn't help when you search by first name only. Think of a phone book sorted by surname: all the Adeyemis are together, all the Okafors are together, so finding Ada Okafor is easy. But everyone named Ada is spread across the whole book. So put the column you search by most often first.

#Shorts #sql #database #postgresql #mysql

Tags: composite index sql, composite index, postgres composite index, multi column index, column order index, database index, database indexes explained, sql indexes explained, types of database indexes, how do database indexes work, mysql index, postgres index, database indexing explained, sql index, what is a database index, database index types, b tree index, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan
```
**TikTok**
```text
Composite indexes kind of always confuse me, so I explained one with a phone book 😅 It's sorted by surname, so Ada Okafor is easy to find, but everyone named Ada is spread across every page.
#sql #database #postgresql #mysql #learntocode #techtok
```
**Instagram Reels**
```text
The composite index is the one that kind of always confuses me, so here it is with a phone book. An index on last name and first name works like a phone book sorted by surname: Ada Okafor is easy to find, but Ada Adeyemi is at the front and Ada Williams near the end. Put the column you search by most often first. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #learntocode #postgresql
```
**LinkedIn**
```text
A composite index is an index on more than one column, and it's the one that kind of always confuses me 😅

So I explained it with a phone book. Say your index is on last name and first name, in that order. A phone book is sorted the same way: all the Adeyemis are together, all the Okafors are together, and inside each surname it's sorted by first name.

Finding Ada Okafor is easy. But if I want everyone whose first name is Ada, there's Ada Adeyemi at the front, Ada Okafor in the middle and Ada Williams near the end. Nothing groups the Adas together, so I'd have to read every page.

That's exactly what happens with the index. The tip is to put the column you search by most often first.

Which part of databases confused you the most when you were learning?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #postgresql
```
**X**
```text
A composite index on (last_name, first_name) works like a phone book sorted by surname. Finding Ada Okafor is easy, but finding everyone called Ada means reading every page.
```

### SH3 · how a database index works
File `outputs/shorts/short03-how-an-index-works_9x16.mp4` · 0:47 · label on screen "how a database index works" · from 2:02.2 to 2:51.8 (raw), with the article mention 2:06.1 to 2:12.8 cut
Hook (first line she says): "Now what mechanism does a database index use to find things so fast?"

**YouTube Shorts**
```text
Title: How a database index finds 1 row in a million

Description: How does a database index find things so fast? I read an article on this and loved the way the writer explained it, so I used his example. Say you have an index on email and you're looking for bob@email.com. The database opens the index in the middle and sees dave. Bob comes before Dave, so it moves left. It sees alice. Bob comes after Alice, so it moves right, and it keeps going until it finds Bob. Bob's entry points to his row in the table. Even with a million rows, that's about 20 comparisons. Example from Sergey Egorenkov's article "How Database Indexes Work (In Simple Words)".

#Shorts #database #sql #coding #computerscience

Tags: how do database indexes work, database indexes explained, database indexing explained, what is a database index, b tree index, database indexing b tree, database index, sql indexes explained, sql index, full table scan, database performance, computer science, types of database indexes, database index types, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan, explain analyze postgresql
```
**TikTok**
```text
How does a database index find one email in a million rows? It opens the index in the middle, moves left or right, and gets to Bob in about 20 comparisons (example from Sergey Egorenkov's article).
#database #sql #coding #computerscience #learntocode #techtok
```
**Instagram Reels**
```text
This is how a database index finds bob@email.com in a million rows. It opens the index in the middle, sees dave, moves left, sees alice, moves right, and keeps going until it finds Bob: about 20 comparisons instead of up to a million checks. I loved Sergey Egorenkov's explanation of this, so I used his example. Full video on YouTube: @WithGbemi
#database #sql #backend #computerscience #learntocode #webdev
```
**LinkedIn**
```text
How does a database index find things so fast?

I read an article on this by Sergey Egorenkov and I loved the way he explained it, so I used his example in my video.

Say you have an index on the email column and you're looking for bob@email.com. The database opens the index in the middle and maybe sees dave@email.com. Bob comes before Dave, so it moves left. Now it sees alice@email.com. Bob comes after Alice, so it moves right. And it keeps going like this until it finds Bob, whose entry points to where his row lives in the table.

Even with a million rows, that's about 20 comparisons. Without an index, it could be up to a million checks.

How did you first learn how indexes work?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #computerscience
```
**X**
```text
With an index on email, the database finds bob@email.com by opening the index in the middle and moving left or right. A million rows, about 20 comparisons.
```

### SH4 · is your index being used?
File `outputs/shorts/short04-is-your-index-used_9x16.mp4` · 0:37 · label on screen "is your index being used?" · from 3:30.2 to 4:04.1 (raw), with 3:51.9 to 3:52.6 cut
Hook (first line she says): "Once you've added your database index, you can confirm whether your query is actually using it or not."

**YouTube Shorts**
```text
Title: Is your query actually using your index?

Description: Once you've added your database index, you can confirm whether your query is actually using it. Just ask the database: put EXPLAIN in front of your query. In PostgreSQL, Seq Scan (sequential scan) means it's reading every single row, and Index Scan means it's using your index. In MySQL the result comes back as a small table: ALL means a full table scan, and ref or range means it's using an index. So if a query is slow, this is how you first confirm what is going on.

#Shorts #postgresql #mysql #sql #webdev

Tags: seq scan vs index scan postgresql, seq scan vs index scan, explain analyze postgresql, postgres explain, mysql explain, full table scan vs index scan, full table scan, why is my sql query so slow, database index, postgres index, mysql index, sql index, database indexes explained, database indexing explained, how do database indexes work, sql indexes explained, what is a database index, types of database indexes, database index types, b tree index, sql query slow
```
**TikTok**
```text
Once you've added an index, you can check your query is actually using it. Put EXPLAIN in front of it: Seq Scan means every row is read, Index Scan means your index is used.
#postgresql #mysql #sql #webdev #backend #techtok
```
**Instagram Reels**
```text
You can ask your database whether your query is using your index. Put EXPLAIN in front of the query. In PostgreSQL, Seq Scan means it's reading every row and Index Scan means it's using your index. In MySQL, ALL means a full table scan, and ref or range means an index is used. Full video on YouTube: @WithGbemi
#postgresql #mysql #sql #backend #webdev #database
```
**LinkedIn**
```text
Once you've added a database index, you can confirm whether your query is actually using it or not. You just ask the database.

Put the word EXPLAIN in front of your query.

In PostgreSQL, if you see Seq Scan (sequential scan), the database is reading every single row. If you see Index Scan, it's using your index.

In MySQL, the result comes back as a small table. If it says ALL, that's a full table scan. If it says something like ref or range, then it's using an index.

So if a query is slow, this is how you first confirm what is going on.

Do you run EXPLAIN before you change a query, or after?

Full Video on YouTube - [LINK]

#softwareengineering #postgresql #mysql #sql #backend
```
**X**
```text
Before you fix a slow query, put EXPLAIN in front of it. In PostgreSQL, Seq Scan means it's reading every row and Index Scan means it's using your index.
```

### SH5 · Postgres foreign keys
File `outputs/shorts/short05-postgres-foreign-keys_9x16.mp4` · 0:28 · label on screen "Postgres foreign keys" · from 9:28.9 to 9:53.3 (raw)
Hook (first line she says): "Another database index gotcha is that in MySQL, when you add a foreign key, the database creates an index on that column for you automatically."

**YouTube Shorts**
```text
Title: Postgres doesn't index your foreign keys

Description: A database index gotcha: in MySQL, when you add a foreign key, the database creates an index on that column for you automatically, if there isn't one already. In PostgreSQL, it doesn't. So if you're on Postgres, or you've moved from MySQL to Postgres, check that your foreign key columns actually have indexes. It's one of the common reasons joins suddenly get slow.

#Shorts #postgresql #mysql #laravel #webdev

Tags: postgres foreign key index, postgres does foreign key create index, postgresql foreign key, postgres index, mysql vs postgres, mysql index, slow joins, database index, laravel foreign key, database performance, sql index, database indexes explained, database indexing explained, how do database indexes work, sql indexes explained, what is a database index, types of database indexes, database index types, b tree index, composite index sql, sql query slow
```
**TikTok**
```text
In MySQL, adding a foreign key creates an index on that column for you. In PostgreSQL it doesn't, so check your foreign key columns if your joins suddenly got slow.
#postgresql #mysql #laravel #webdev #backend #techtok
```
**Instagram Reels**
```text
MySQL creates an index on your foreign key columns automatically. PostgreSQL doesn't. If you're on Postgres, or you moved from MySQL, check that your foreign key columns have indexes, because it's a common reason joins suddenly get slow. Full video on YouTube: @WithGbemi
#postgresql #mysql #backend #laravel #database #webdev
```
**LinkedIn**
```text
PostgreSQL doesn't create an index on your foreign keys for you. MySQL does.

In MySQL, when you add a foreign key, the database creates an index on that column automatically if there isn't one already. In PostgreSQL, it doesn't.

So if you're on Postgres, or you've moved from MySQL to Postgres, you have to check and confirm that your foreign key columns actually have indexes. It's one of the common reasons joins suddenly get slow.

Have you checked your foreign key columns?

Full Video on YouTube - [LINK]

#softwareengineering #postgresql #mysql #databases #backend
```
**X**
```text
MySQL creates an index on your foreign key columns for you. PostgreSQL doesn't, so if your joins suddenly got slow on Postgres, check those columns first.
```

### SH6 · why your index gets ignored
File `outputs/shorts/short06-index-ignored_9x16.mp4` · 0:44 · label on screen "why your index gets ignored" · from 8:47.6 to 9:28.8 (raw)
Hook (first line she says): "And there are several mistakes you can make that can stop your database index from working as well."

**YouTube Shorts**
```text
Title: 2 reasons your database ignores your index

Description: You can have a database index and the database still won't use it. The first common mistake is wrapping your column in a function, like LOWER(email). A normal index on email is sorted by the emails exactly as they were stored, so the lowercase versions are not in it, unless you create an index on that same expression. The second is a wildcard at the start of a LIKE, like '%fall%'. The index is sorted by how each value starts, and if you don't know how it starts, the index can't help you find it.

#Shorts #sql #database #postgresql #webdev

Tags: why is postgres not using my index, index not used, database index mistakes, like wildcard index, expression index postgres, lower function index, why is my sql query so slow, how to make sql query faster, seq scan vs index scan, postgres index, sql index, database index, database indexes explained, database indexing explained, how do database indexes work, sql indexes explained, what is a database index, types of database indexes, database index types, mysql index
```
**TikTok**
```text
You can have a database index and your database still won't use it. Two common reasons: LOWER(email) in your WHERE, and a LIKE search that starts with %.
#sql #database #postgresql #webdev #backend #techtok
```
**Instagram Reels**
```text
You can have an index and the database still won't use it. Wrap the column in a function, like LOWER(email), and the lowercase values aren't in the index. Start a LIKE with a wildcard, like '%fall%', and the index can't help, because it's sorted by how values start. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #learntocode #postgresql
```
**LinkedIn**
```text
You can have a database index and the database still won't use it. A few mistakes cause this, and two of them are really common.

The first one is wrapping your column in a function, like LOWER(email). A normal index on email is sorted by the emails exactly as they were stored. The lowercase versions are not in that index, so the database can't use it, unless you create an index on the same expression.

The second is adding a wildcard at the start of a LIKE. The index is sorted by how each value starts, and if you don't know how it starts, the index cannot help you find it.

Which of these has caught you before? 😅

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #postgresql
```
**X**
```text
You can have an index and your database still won't use it. Two common reasons: wrapping the column in a function like LOWER(email), and a LIKE that starts with %.
```

### SH7 · why your database gets slow
File `outputs/shorts/short07-why-apps-get-slow_9x16.mp4` · 0:49.2 · label on screen "why your database gets slow" · from 0:19.5 to 1:27.6 (raw), with the agenda 0:31.8 to 0:53.9 cut
Hook (first line she says): "As you get more users, your database grows and your tables get bigger."

**YouTube Shorts**
```text
Title: Why your app gets slower as your database grows

Description: As you get more users, your database grows and your tables get bigger, and your app starts taking a little bit longer to load. Say a bookstore's books table has a million rows and you search for author 42's books. Without an index, the database has no idea where those books are, so it starts at the first row and checks every single row. That's called a full table scan. With 10 or 100 rows you wouldn't notice. At a million rows, it's a problem.

#Shorts #database #sql #webdev #backend

Tags: why is my app slow, slow database, full table scan, database index, database indexes explained, slow sql query, database performance, sql performance, how do database indexes work, sql index, postgres slow query, mysql slow query, database scaling, database indexing explained, sql indexes explained, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow
```
**TikTok**
```text
As you get more users, your tables get bigger and your app gets slower. Without an index, your database checks every single row to find what you asked for, and at a million rows that's a problem.
#database #sql #webdev #backend #learntocode #techtok
```
**Instagram Reels**
```text
As your app gets more users, your database grows and pages take longer to load. Without an index, a search for one author's books in a million-row table starts at the first row and checks every single row. That's called a full table scan. Full video on YouTube: @WithGbemi
#database #sql #backend #webdev #softwareengineering #learntocode
```
**LinkedIn**
```text
As you get more users, your database grows and your tables get bigger. Then your app takes a little bit longer to load, and now you're having performance issues.

To understand why, you have to know what your database does without an index.

Say you have a bookstore and the books table has a million rows. You search for every book by author 42. Without an index, the database has no idea where author 42's books are, so it does the only thing it can do. It starts at the first row and checks every single row, all one million of them. That's called a full table scan.

When your table has 10 or 100 rows, you probably wouldn't notice. At a million rows, it's a problem.

Has your app gotten slower as it grew?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend #webdevelopment
```
**X**
```text
As your tables grow, your app gets slower. Without an index, the database checks every single row to answer a query, which is fine at 100 rows and a problem at a million.
```

### SH8 · what is a database index?
File `outputs/shorts/short08-what-is-an-index_9x16.mp4` · 0:33.3 · label on screen "what is a database index?" · from 1:27.6 to 1:56.9 (raw)
Hook (first line she says): "What is a database index and how does it solve this problem of speed and performance?"

**YouTube Shorts**
```text
Title: What is a database index? A simple explanation

Description: The easiest way to think about a database index is the index at the back of a book. If you want every page that mentions a word, you don't read the whole book. You go to the index at the back, it's sorted alphabetically, and it tells you the page number. A database index works the same way: it stores the values from a column in sorted order, and for each value it keeps a pointer to where that row actually lives. It only stores the column and the pointer, so it's usually much smaller than the table.

#Shorts #database #sql #coding #learntocode

Tags: what is a database index, database index, database indexes explained, database indexing explained, sql index, sql indexes explained, how do database indexes work, database basics, sql for beginners, database tutorial, indexing in dbms, postgres index, mysql index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan, laravel index
```
**TikTok**
```text
A database index is like the index at the back of a book. It keeps a column's values sorted, with a pointer to where each row lives, so the database doesn't have to read everything.
#database #sql #coding #learntocode #computerscience #techtok
```
**Instagram Reels**
```text
What is a database index? The easiest way to think about it is the index at the back of a book: it's sorted, you find the word, and it tells you the page. A database index keeps a column's values in sorted order, each with a pointer to where the row lives. Full video on YouTube: @WithGbemi
#database #sql #backend #learntocode #computerscience #webdev
```
**LinkedIn**
```text
What is a database index? The easiest way I can explain it is the index at the back of a book.

If you want to find every page that mentions a particular word, you don't read the whole book from the beginning. You go to the index at the back. It's sorted alphabetically, you find the word, and it tells you the page number.

A database index works the same way. It's a separate structure that stores the values from a column in sorted order, and for each value, it keeps a pointer to where that row actually lives. Because it only stores the column and the pointer, it's usually much smaller than the table itself.

What's the analogy that finally made it click for you?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #learntocode
```
**X**
```text
A database index is like the index at the back of a book: a column's values in sorted order, each pointing to where its row lives.
```

### SH9 · how to add a database index
File `outputs/shorts/short09-add-an-index_9x16.mp4` · 0:17.9 · label on screen "how to add a database index" · from 3:10.4 to 3:30.3 (raw), with the garbled Laravel aside 3:17.7 to 3:23.7 cut
Hook (first line she says): "Adding a database index will literally up your query optimisation game, and it's kind of a one-liner."

**YouTube Shorts**
```text
Title: How to add a database index (it's one line of SQL)

Description: Adding a database index will literally up your query optimisation game, and it's kind of a one-liner. In SQL: CREATE INDEX idx_books_author_id ON books (author_id); If you're using Laravel, it's $table->index('author_id') in your migration. Now when you search books by author, the database goes to the index first, finds author 42 and goes straight to those rows.

#Shorts #sql #database #coding #webdev

Tags: create index sql, how to add an index, add index sql, database index, sql index, database indexes explained, sql indexes explained, postgres create index, mysql create index, sql query optimization, speed up sql query, database performance, database indexing explained, how do database indexes work, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index, sql query slow
```
**TikTok**
```text
Adding a database index will literally up your query optimisation game, and it's kind of a one-liner: CREATE INDEX on the column you search by.
#sql #database #coding #webdev #backend #techtok
```
**Instagram Reels**
```text
Adding a database index is kind of a one-liner: CREATE INDEX in SQL, or $table->index() in a Laravel migration. Then a search by author goes to the index first and straight to the right rows. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #learntocode #softwareengineering
```
**LinkedIn**
```text
Adding a database index is kind of a one-liner, and it will literally up your query optimisation game 🙂

In SQL, it looks something like this:
CREATE INDEX idx_books_author_id ON books (author_id);

If you're using Laravel, you simply add it in your migration:
$table->index('author_id');

Now when you search books by author, the database goes to the index first, finds author 42 and goes straight to those rows, instead of checking every single row in the table.

Just make sure it's a column you actually search by.

Which column in your app gets searched the most?

Full Video on YouTube - [LINK]

#softwareengineering #sql #laravel #databases
```
**X**
```text
Adding a database index is kind of a one-liner: CREATE INDEX idx_books_author_id ON books (author_id); Then a search by author goes straight to the right rows.
```

### SH10 · the 2 most common database indexes
File `outputs/shorts/short10-btree-and-unique_9x16.mp4` · 0:45.2 · label on screen "the 2 most common database indexes" · from 4:22.0 to 5:03.8 (raw)
Hook (first line she says): "The first one is B-tree. The B-tree is the default one."

**YouTube Shorts**
```text
Title: B-tree and unique indexes: the 2 you'll use most

Description: There are a few types of database index, and these are two of the most common. The B-tree is the default: when you create an index without saying what type it is, this is the one you get. It can find exact matches (the user with this email), ranges (books priced between 10 and 15), sorted results (the newest orders first) and values by how they start (every title that starts with Harry), all because the index is sorted. The unique index makes sure no two rows have the same value, so no two users can sign up with the same email. Your primary key already has one.

#Shorts #sql #database #backend #learntocode

Tags: b tree index, unique index, types of database indexes, database index types, database index, database indexes explained, sql indexes explained, primary key index, sql unique constraint, postgres index types, mysql index types, how do database indexes work, database indexing explained, sql index, what is a database index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan, postgres index
```
**TikTok**
```text
The B-tree is the index you get by default, and it handles exact matches, ranges, sorting and "starts with" searches. The unique index makes sure no two users sign up with the same email.
#sql #database #backend #learntocode #coding #techtok
```
**Instagram Reels**
```text
The B-tree is the default database index: create one without naming a type and this is what you get. It handles exact matches, ranges, sorting and "starts with" searches, because it's sorted. A unique index makes sure no two rows have the same value, and your primary key already has one. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #learntocode #postgresql
```
**LinkedIn**
```text
There are a few types of database index, but two you'll use a lot are the B-tree and the unique index.

The B-tree is the default one. When you create an index without saying what type it is, this is the one you get. It can find exact matches, like the user with this email. It can find ranges, like books priced between 10 and 15. It can sort, like showing the newest orders first. And it can find values by how they start, like every title that starts with "Harry". That all works because the index is sorted.

The unique index makes sure no two rows have the same value, so no two users can sign up with the same email. Your primary key already has one 🙂

Did you know you were already using one?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend
```
**X**
```text
The B-tree is the database index you get by default, for exact matches, ranges, sorting and "starts with". The unique index makes sure no two rows share a value, and your primary key already has one.
```

### SH11 · 4 more database index types
File `outputs/shorts/short11-more-index-types_9x16.mp4` · 0:57.4 · label on screen "4 more database index types" · from 6:21.2 to 7:16.1 (raw)
Hook (first line she says): "The hash index, which is for exact matches only."

**YouTube Shorts**
```text
Title: Hash, bitmap, spatial and full-text indexes explained

Description: Beyond the B-tree, these are the other database index types you'll hear about. The hash index is for exact matches only, like looking up someone's login session by its exact token. It can't do ranges or sorting, so most people just use a B-tree. A bitmap index is for columns with only a few values, like a status that's active, inactive or banned, and you mostly see it in databases built for reports. A spatial index is for location data, like coffee shops near you or a ride app looking for drivers close to you. And a full-text index is for searching inside text, like an online store search for wireless headphones.

#Shorts #database #sql #backend #computerscience

Tags: types of database indexes, hash index, bitmap index, spatial index, full text index, database index types, database indexes explained, sql indexes explained, database index, full text search, postgres index types, database tutorial, database indexing explained, how do database indexes work, sql index, what is a database index, b tree index, composite index sql, clustered vs non clustered index, sql query slow, how to make sql query faster, seq scan vs index scan
```
**TikTok**
```text
Four more database index types, one line each: hash for exact matches, bitmap for columns with only a few values, spatial for things near you, and full-text for searching inside text.
#database #sql #backend #computerscience #learntocode #techtok
```
**Instagram Reels**
```text
Beyond the B-tree: a hash index is for exact matches only. A bitmap index is for columns with only a few values, like a status. A spatial index is for location data, like drivers close to you. A full-text index is for searching inside text, like "wireless headphones" in an online store. Full video on YouTube: @WithGbemi
#database #sql #backend #webdev #computerscience #learntocode
```
**LinkedIn**
```text
Beyond the B-tree, there are a few other database index types you'll hear people talk about.

The hash index is for exact matches only, like looking up someone's login session by its exact token. It can't do ranges or sorting, so most people just use a B-tree.

A bitmap index is for columns with only a few values, like a status column that's mostly active, inactive or banned. You mostly see it in databases built for reports.

A spatial index is for location data. When a ride app looks for drivers close to you, it groups places that are near each other on the map, so it only checks around you instead of the whole world.

And a full-text index is for searching inside text, like searching an online store for wireless headphones.

Which of these have you actually used?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend
```
**X**
```text
Four database index types beyond the B-tree: hash for exact matches, bitmap for columns with only a few values, spatial for location data and full-text for searching inside text.
```

### SH12 · clustered vs non-clustered indexes
File `outputs/shorts/short12-clustered_9x16.mp4` · 0:35.7 · label on screen "clustered vs non-clustered indexes" · from 7:19.2 to 7:51.1 (raw)
Hook (first line she says): "You also hear about clustered and non-clustered indexes. And the difference between those is very simple."

**YouTube Shorts**
```text
Title: Clustered vs non-clustered index, explained simply

Description: You also hear about clustered and non-clustered indexes, and the difference between them is very simple. A clustered index decides the order the table's rows are actually stored in. Think of a phone book: the data itself is sorted by surname, so once you've found the name, you've found everything. A table can only have one, because the rows can only be stored in one order. A non-clustered index is a separate structure that points back to the row, like the index at the back of a book, so a table can have lots of them. (Clustered indexes work like this in MySQL and SQL Server; PostgreSQL doesn't keep one.)

#Shorts #sql #database #sqlserver #mysql

Tags: clustered vs non clustered index, clustered index, non clustered index, clustered index sql server, mysql clustered index, database index types, types of database indexes, database index, database indexes explained, sql indexes explained, sql interview questions, database tutorial, database indexing explained, how do database indexes work, sql index, what is a database index, b tree index, composite index sql, sql query slow, how to make sql query faster
```
**TikTok**
```text
A clustered index is the order the table's rows are actually stored in, like a phone book sorted by surname, so a table only gets one. A non-clustered index is like the index at the back of a book, and you can have lots.
#sql #database #sqlserver #mysql #learntocode #techtok
```
**Instagram Reels**
```text
The difference between clustered and non-clustered indexes is very simple. A clustered index is the order the rows are actually stored in, like a phone book sorted by surname, so a table gets only one. A non-clustered index is a separate structure that points back to the row, like a book's index, so a table can have many. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #learntocode #softwareengineering
```
**LinkedIn**
```text
You hear about clustered and non-clustered indexes a lot, and the difference between them is very simple.

A clustered index decides the order the table's rows are actually stored in. Think of a phone book: the data itself is sorted by surname, so once you've found the name, you've found everything. A table can only have one, because the rows can only be stored in one order.

A non-clustered index is a separate structure that points back to the row. Think of the index at the back of a book: it tells you where to go, and you go there. So a table can have lots of them.

(This is how it works in MySQL and SQL Server. PostgreSQL doesn't maintain a clustered index.)

Has this one ever come up for you in an interview? 🙂

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #mysql
```
**X**
```text
A clustered index is the phone book itself, sorted by surname, so a table gets only one. A non-clustered index is the index at the back of a book, and a table can have lots.
```

### SH13 · when to add a database index
File `outputs/shorts/short13-when-to-index_9x16.mp4` · 0:52.2 · label on screen "when to add a database index" · from 9:54.8 to 10:52.5 (raw), with a repeated line 10:30.2 to 10:37.0 cut
Hook (first line she says): "When to actually use a database index: use it when a column keeps showing up in your WHERE clauses, your joins or your ORDER BY."

**YouTube Shorts**
```text
Title: When to add a database index (and when not to)

Description: So when should you actually use a database index? When a column keeps showing up in your WHERE clauses, your joins or your ORDER BY. Say you're sorting a million orders by date and only showing the first 10. With no index, the database looks at a million rows and sorts them before it can give you those 10. With an index, it reads them in order and stops after the first 10. Also when EXPLAIN shows a slow query doing a full table scan, and when a table is read a lot more than it's written. But you probably don't need one when the table is small, or when it's constantly written to and rarely searched.

#Shorts #sql #database #backend #webdev

Tags: when to use database index, when to add an index, database index, sql index, database indexes explained, sql indexes explained, sql query optimization, slow sql query, database performance, order by index, where clause index, postgres index, mysql index, database indexing explained, how do database indexes work, what is a database index, types of database indexes, database index types, b tree index, composite index sql, clustered vs non clustered index
```
**TikTok**
```text
When should you add a database index? When a column keeps showing up in your WHERE, joins or ORDER BY, and when the table is read a lot more than it's written. Not when the table is small.
#sql #database #backend #webdev #learntocode #techtok
```
**Instagram Reels**
```text
Add a database index when a column keeps showing up in your WHERE, joins or ORDER BY, when EXPLAIN shows a slow full table scan, or when a table is read a lot more than it's written. You probably don't need one when the table is small, or constantly written to and rarely searched. Full video on YouTube: @WithGbemi
#sql #database #backend #webdev #softwareengineering #learntocode
```
**LinkedIn**
```text
So when should you actually add a database index?

When a column keeps showing up in your WHERE clauses, your joins or your ORDER BY. Say you're sorting a million orders by date and only showing the first 10. Without an index, the database has to look at a million rows and sort them before it can give you those 10. With an index, it reads them in order and stops after the first 10.

Also when EXPLAIN shows that a slow query is doing a full table scan, and when a table is read a lot more than it's written.

But when the table is small, or it's constantly written to and rarely searched, you probably don't need one.

What's the last index you added, and did it help?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend
```
**X**
```text
Add a database index when a column keeps showing up in your WHERE, joins or ORDER BY. Skip it when the table is small, or constantly written to and rarely searched.
```

### Not built (spares)
None left worth cutting on their own (2026-10-15). The old spares became SH7 ("why your database gets slow") and SH8 ("what is a database index?"). Not used: the agenda (0:32-0:54), the PostgreSQL/MySQL EXPLAIN detail already in SH4, and her closing "so that's it".

## 4. Teaser (LinkedIn and X)
Files: `outputs/teaser/teaser-database-indexes_16x9.mp4` (X, LinkedIn landscape), `_1x1.mp4` (LinkedIn / X feed square), `_4x5.mp4` (LinkedIn portrait), 1:17 each, ending on your "FULL VIDEO ON YOUTUBE" clip; copies in `~/Downloads/database-indexes/teaser/`.

**LinkedIn**
```text
I made a video on database indexes, from what your database does when there's no index to the mistakes that stop one from working.

As you get more users, your tables get bigger and your app gets slower. Very often, the database is checking every single row to find the one you asked for, and an index is how you stop that.

I used an example from an article I loved (Bob, Dave and Alice), and a phone book full of Adeyemis and Okafors for the composite index, which is the one that kind of always confuses me 😅

This is a little bit of it. Which part of databases do you still find confusing?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #backend
```
**X**
```text
I made a video on database indexes, from what happens with no index to the mistakes that stop one from working. This is a little bit of it, full video on YouTube: youtube.com/@WithGbemi
```

## 5. Carousels

### 5a. Instagram
Files: `outputs/carousels/instagram/01.png` to `08.png` (1080×1350, 8 slides; contact sheet `overview.png`; copy in `~/Downloads/database-indexes-carousels/`). Edit at http://localhost:7700/design/database-indexes/carousels/instagram/ .
Slide 1 as built: "Why your app gets slower as it grows" with "Fast with 10 users, slow with 100,000. Often the fix is a database index." and two phones (10 users / 100,000 users).

```text
Why does your app get slower as more people use it? Very often, your database is checking every single row to find the one you asked for. Swipe for what a database index is, how to add one in one line and how to check it's actually being used (and no, we can't just index every column 🫠).

Full video on YouTube: @WithGbemi

#database #sql #backend #webdev #learntocode #softwareengineering #postgresql
```

### 5b. LinkedIn
File: `outputs/carousels/linkedin/carousel.pdf` (7 slides, 1080×1350; PNGs beside it; copy in `~/Downloads/database-indexes-carousels/`). Edit at http://localhost:7700/design/database-indexes/carousels/linkedin/ .
Document title: "Your index exists. Your database ignores it."
Slide 1 as built: "Your index exists. Your database ignores it." with "2 reasons Postgres skips your index, 1 index it never creates for you, and how to check."

```text
You can have a database index and your database still won't use it.

Before adding another index, put EXPLAIN in front of your query and ask the database what it's doing. Seq Scan means it's reading every row. Index Scan means it's using your index.

Then check the two common mistakes: wrapping the column in a function, like LOWER(email), and starting a LIKE search with a wildcard. And if you're on PostgreSQL, check your foreign key columns too, because unlike MySQL, it doesn't index them for you.

Have you ever added an index and seen nothing change? 😅

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #postgresql
```

## 6. Long-form posts
_Rewritten 2026-10-18 in her own voice (`inspiration/know-how/HER-VOICE.md`: her posts and what performs). Every personal line is something she says in the video._


### 6a. LinkedIn post (main video, upload day)
```text
When your app has a few users, every page loads fast. Then you get more users, your database grows, your tables get bigger, and suddenly everything takes a little bit longer to load.

One thing you can always use to fix that is a database index.

Without an index, your database has no idea where the data you asked for is, so it starts at the first row and checks every single row. That's called a full table scan. At 100 rows it's fine. At a million rows, it's a problem.

An index works like the index at the back of a book. If you want every page that mentions a word, you don't read the whole book, you go to the index at the back and it tells you exactly where to look.

I read an article by Sergey Egorenkov on how an index finds things so fast, and I loved the way he explained it, so I used his example in the video (it's linked in the description). I also used a phone book full of Adeyemis and Okafors to explain the composite index, which is the one that kind of always confuses me 😅

And if you're on PostgreSQL, one gotcha: unlike MySQL, it doesn't create an index on your foreign keys for you, so you have to check and add it yourself.

Have you ever fixed a slow query with just one index?

Full Video on YouTube - [LINK]

#softwareengineering #databases #sql #postgresql #backend
```

### 6b. X thread
```text
1/ A thread on database indexes, in plain words. As you get more users, your tables get bigger and your app takes a little bit longer to load. Very often, a missing index is part of the reason.

2/ Without an index, your database has no idea where the row you want is, so it starts at the first row and checks every single one. On a million rows, that's a full table scan.

3/ An index works like the index at the back of a book: a column's values in sorted order, each with a pointer to where its row lives.

4/ Looking for bob@email.com, the database opens the index in the middle and sees dave, so it goes left. It sees alice, so it goes right, and keeps going. A million rows, about 20 comparisons (example from Sergey Egorenkov's article).

5/ To check your query is using it, put EXPLAIN in front of it. In PostgreSQL, Seq Scan means every row is read and Index Scan means your index is used.

6/ Two mistakes that make your database ignore an index: LOWER(email) in the WHERE, and a LIKE that starts with %. And PostgreSQL, unlike MySQL, doesn't index your foreign keys for you.

7/ Full video on YouTube: youtube.com/@WithGbemi
```

### 6c. YouTube community post (upload day)
```text
New video on database indexes! As you get more users, your tables get bigger and your app gets slower, and an index is one of the first things to check. I explained it from the very beginning, with a bookstore and a phone book full of Adeyemis and Okafors 🙂

What's the slowest query you've ever had to fix?
```

### 6d. More X posts (from your kit)

**What the two X searches showed.** Your first search had one standout. Alex Xu's "Database Index Types Every Developer Should Know," posted as one image, got about 62K views. The second batch you pasted adds a few more patterns worth copying the shape of (never the words).
- **The big explainer accounts** (Level Up Coding, Nikki Siapno, SQL Daily, Inferam) post a short line plus a visual. They also have huge followings, so their numbers come partly from the following and partly from the format.
- **The tweets that started conversations were concrete.** Stackgik's tweet about write cost only got 568 views, but it pulled replies because it said something specific and then asked people to guess the rest. Rohan's reply about ORDER BY and LIMIT is the best tweet in the batch. It names one situation, says exactly what happens, and says what the index changes.
- **Questions and quizzes invite replies.** Melly.Tech posted a multiple-choice question, and Krishna asked "vibe coder, do you know what a database index actually does?"
- **The arrow lists and fragment tweets** ("→ Faster reads ⚡ → Fewer disk scans") are the ones that read most like AI, so none of yours use that shape.
- **Your note on Inferam's post** said it could be a short list of tips, so there's one of those below.

So this section has one image post, one tips list, one quiz and one "can you guess" tweet, plus single tweets that each say one specific thing. In every case, post the link as a reply, never in the first tweet.

#### THE IMAGE POST

**Tweet text:**
> database index types, and when you'd actually use each one 👇

**Image content (one clean card in Canva):**
> **DATABASE INDEX TYPES**
> **B-tree** · the default · exact matches, ranges, sorting, "starts with"
> **Unique** · no two rows can have the same value · emails, usernames
> **Composite** · more than one column · column order matters
> **Hash** · exact matches only · no ranges, no sorting
> **Bitmap** · columns with only a few values · status, region
> **Spatial** · location data · "coffee shops near me"
> **Full-text** · searching inside text
> **Covering** · has every column the query needs
> **Partial** · only some rows · e.g. active users only (PostgreSQL)
> **Clustered** · the table itself is stored in this order · one per table

**Reply:**
> I went through the main ones from the beginning here: [LINK]

---

#### THE TIPS LIST (the format from your note on Inferam's post)

> database index tips I wish someone had told me earlier
>
> 1. run EXPLAIN before you change anything
> 2. in a composite index, put the column you search by most first
> 3. LOWER(email) can't use a normal index on email
> 4. LIKE '%text%' generally can't use an index either
> 5. postgres doesn't index your foreign keys for you
> 6. every extra index makes your inserts and updates slower

**Reply:** full video on all of these: [LINK]

---

#### THE QUIZ

> you have an index on (last_name, first_name). which query usually can't use it?
>
> A. WHERE last_name = 'Okafor'
> B. WHERE last_name = 'Okafor' AND first_name = 'Ada'
> C. WHERE first_name = 'Ada'

**Your reply a few hours later:**
> it's C. the index is sorted by last name first, so it's like a phone book. great for finding every Okafor, useless for finding every Ada

---

#### THE "CAN YOU GUESS" TWEET

> there's one thing MySQL does for your foreign keys that postgres doesn't. any guesses?

**Your reply:**
> MySQL creates an index on the foreign key column for you. postgres doesn't, so if you're on postgres, go and check your joins

---

#### THE LAUNCH TWEET

> made a video on database indexes from the very beginning, with a bookstore, an article example I loved and a phone book full of Okafors 🙂

**Reply:** [LINK]

---

#### STANDALONE TWEETS

> your database stores and reads your data in blocks called pages. in postgres a page is 8kb, in mysql it's 16kb. so to get one row, it loads the whole page that row lives on

> looking for bob@email.com in an index, the database checks the middle and sees dave. bob comes before dave, so it goes left. it sees alice. bob comes after alice, so it goes right. found him. that's a million rows in about twenty comparisons

> showing the 10 newest orders sounds cheap. but if created_at has no index, the database sorts every single order before it can give you those 10

> six indexes on your orders table means every new order updates the table and six indexes. that's why you don't index every column

> before you rewrite a slow query, put EXPLAIN in front of it. if it says Seq Scan, it's reading every row

> what's the slowest query you've ever fixed with one index? give me the before and after

---

### 6e. Your comments and ready replies (from your kit)

#### YouTube (pin):
> what's the slowest query you've ever fixed with a single index? drop the before and after times, I genuinely want to see them 👀

#### Instagram:
> EXPLAIN is the most underrated command in databases. run it before you change anything.

#### TikTok:
> the LIKE '%text%' one catches so many people 😭

#### LinkedIn:
> Put EXPLAIN in front of the query before you change anything. Once it shows a full scan where you expected an index, the fix is usually much easier to see 🙂

#### X (reply to your own tweet):
> quick check if you're on Postgres: look for every foreign key column in your migrations and make sure it has an index

#### REPLIES TO EXPECT (ready to paste)

**"Doesn't the primary key already have an index?"**
> yes, every primary key has a unique index automatically. the slow queries usually come from searching on other columns, like a foreign key or an email

**"Should I just index every column then?"**
> please don't 😭 every index slows down inserts, updates and deletes, and takes up space. index the columns your slow queries actually search on

**"It depends on the workload though."**
> yes, completely. a write-heavy table and a read-heavy table need very different amounts of indexing, which is why EXPLAIN and real query times should decide it

**"Why is Postgres ignoring my index?"**
> a few common reasons. the table might be small enough that a scan is faster, the query might wrap the column in a function, or it might skip the first column of a composite index. EXPLAIN will usually show you which

**"Hash or B-tree?"**
> B-tree almost every time. hash only helps exact matches, and a B-tree is nearly as fast for those while also handling ranges and sorting

**"Where's the bob/dave/alice example from?"**
> it's from Sergey Egorenkov's Medium article, How Database Indexes Work (In Simple Words). the link is in the description

---

### 6f. Essay for Substack / Medium (from your kit, updated)

#### Title:
> Database Indexes Explained: Why Your SQL Queries Get Slow

#### Subtitle:
> What a database index really is, how it finds things so fast, and the mistakes that stop it from being used.

#### SEO Title:
> Database Indexes Explained: Why Your SQL Queries Get Slow

#### SEO Description:
> How database indexes work from the beginning: full table scans, B-trees, index types, clustered vs non-clustered, composite indexes, EXPLAIN, write costs and common mistakes.


As more people use an application, its database grows, its tables get bigger, and pages that used to load instantly start to lag. Very often the fix is a database index.

Without an index, a query such as finding every book by a given author forces the database to check every row, a full table scan. That cost goes unnoticed at a thousand rows and becomes painful at a million.

An index works like the index at the back of a book. It stores a column's values in sorted order, each with a pointer to the row it belongs to, and because it holds only that column and the pointers, it is far smaller than the table. Sorting is what makes it fast. Sergey Egorenkov explains it with a lovely example. To find bob@email.com, the database checks the middle of the index and finds dave@email.com, so it moves left, finds alice@email.com, moves right, and lands on Bob. Each comparison throws away a large part of what's left, so a million rows can be searched in about twenty comparisons. Most databases use B-trees, which branch many ways at each step, so even very large tables need only a few levels.

Adding an index is a single CREATE INDEX statement or one line in a Laravel migration, and EXPLAIN shows whether a query uses it. In PostgreSQL, Seq Scan means every row is read and Index Scan means the index is used.

There are many types of index, but three cover most everyday work. The B-tree is the default and handles exact matches, ranges and sorting. A unique index stops two rows from sharing a value, such as an email. A composite index covers several columns, and its column order matters, since a phone book sorted by surname cannot find everyone with a given first name. Hash, bitmap, spatial, full-text, covering and partial indexes exist for more specialised searches. Separately, a clustered index determines the physical order of the table's rows, so a table can have only one, while non-clustered indexes are separate structures that point back to the rows.

Indexes carry a cost. Every insert, update and delete must update each index on the table, so six indexes on an orders table means six extra updates per order, and each index takes space. On small tables, the database often scans anyway. Some patterns also stop an existing index from helping, such as wrapping the column in a function like LOWER, or starting a LIKE search with a wildcard. PostgreSQL also does not index foreign key columns automatically, unlike MySQL, which is a common cause of slow joins.

The best candidates for an index are the columns that keep appearing in filters, joins and sorting. Sorting is easy to overlook. Showing the ten newest orders sounds cheap, but without an index on the date, the database has to sort every order before it can return the first ten. Add indexes for the slow queries you can actually see, and check them with EXPLAIN.


*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*


**Medium tags:** Databases, SQL, Backend, Performance, Software Engineering

## 7. Research and sources
Checked 2026-10-12 by the strategist.

### 7a. What is happening with the topic now
- No news hook: this is an evergreen search topic. PostgreSQL 19 is still in beta (Beta 4, 24 Sep 2026). PostgreSQL 18 (Sep 2025) added "skip scan" for multi-column indexes, which is why "usually" is right in the composite section.
- The live conversation next to this topic: apps built fast (often with AI tools) that get slow as their data grows, with missing indexes as the usual cause (HackerNoon, May 2026; "app slow after adding data" guides). Her opening is exactly that problem, so captions lead with the symptom, not the term.
- Her channel: recent long videos get 18 to 234 views; her database videos got 161 ("DATABASE RELATIONSHIPS") and 56 ("Database Normal Forms"). Search is how a small channel gets found on a topic like this, so the recommended title is search-led.

### 7b. What people search (keywords with evidence)
| Keyword | Evidence |
|---|---|
| database indexes explained / database indexing explained | YouTube + Google suggestion for "database index", "database indexes", "database indexing" |
| how do database indexes work | YouTube + Google suggestion; Milan Jovanović "How SQL Indexes Actually Work" 40K |
| sql indexes explained / sql index | YouTube suggestion ("sql indexes explained", "...in 20 minutes"); Socratica "SQL Index" 640K (older) |
| types of database indexes / database index types | YouTube + Google suggestion |
| slow sql query / how to make sql query faster | Google suggestions "why is my sql query so slow", "how to make sql query faster"; techTFQ 155K (8x) |

Full suggestion list (YouTube `ds=yt` and Google, fetched 2026-10-12, seeds + a-z): "database indexes explained", "database indexing explained", "how do database indexes work", "types of database indexes", "database indexing system design", "database indexing postgresql", "database indexing mysql", "database indexing b tree", "sql indexes explained", "sql indexes explained in 20 minutes", "clustered vs non clustered index", "b tree index", "postgres index types", "postgres composite index", "index in sql with example", "what is indexing in database", "database indexing interview questions", "database indexing in laravel", "laravel database indexing"; Google only: "why is my sql query so slow", "how to make sql query faster", "full table scan vs index scan", "seq scan vs index scan postgresql", "postgres foreign key index", "postgres does foreign key create index", "database index vs primary key", "explain analyze postgres". The Shorts tags in section 3 use these phrases first, plus a few plain topic words.

### 7c. Outlier videos
Views read 2026-10-12 with yt-dlp; "usual" = median views of the channel's last ~30 uploads; ratio = views ÷ usual.

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

Not outliers (for contrast): [How SQL Indexes Actually Work (Step-by-Step)](https://www.youtube.com/watch?v=teMXE6hzva0), Milan Jovanović, 40,025 vs usual 16,500 (2.4x), 2025-12-30 · [The Postgres Performance Trap Every Developer Falls Into](https://www.youtube.com/watch?v=BharE_Kc9sQ), Tech With Tim, 67,424 vs 63,500 (1.1x), 2026-03-17 · [Database Indexes Explained In 6 Minutes](https://www.youtube.com/watch?v=YC50j-nozZs), PawelCodeStuff, 7,754 vs 26,500 (0.3x), 2026-04-12.

What they share: the topic word or database name in the first 3 words; a problem, mistake, contrast or number; thumbnails with 1 to 4 words, one literal object (code with a tick and a cross, a B-tree on a board, a clock, a book held up, a logo), a face in most. Plain definitions without a problem did not break out. TikTok and Instagram: no view data could be read, so the shorts plan leans on YouTube Shorts and her viral samples.

### 7d. What worked with strangers
- **Titles and concepts, cold review round 1** (2026-10-12): titles 5 to 8 (only C1, C2, C6 at 8); thumbnail concepts alone 3 to 7, five could not be placed ("INDEXES" alone read as a book or stock index). Fixes: every title under 8 rewritten; a database cue (table, cylinder, code, logo) added to every thumbnail; captions now open with the concrete fact or frustration.
- **Round 2:** titles 6 to 8; best pairs at 8. Flags fixed: duplicate ideas, mismatched pairs, inconsistent mistake counts (now "2 mistakes and a Postgres gotcha"), "cut in half at every step" (binary-search wording a developer would correct; now "about 20 comparisons"). Plain search-led titles (S3, S5, S6) stayed at 6 on purpose: they match exact searches.
- **Built thumbnails, 4 gate rounds** (2026-10-13, `../design/thumbnails/NOTES.md`): round 1 failed (condensed caps from another project, mid-word faces, technical errors). Lessons kept: closed-mouth frames only, own type (IBM Plex + serif), the LOWER() fix must not change the query, "~20 comparisons" not "20 steps" beside a 3-level tree, check with EXPLAIN before adding the index. The strategist's pre-build top 3 (T12 "Fast… then slow?", T07, T06) scored lower once built than 05, 07 and 20, which is why the recommendation changed.
- **Shorts critic** (2026-10-13): scores before fixes 4 to 6; fixed: film panels under the label, cutaways that left her off screen, sh3's label over code.
- **Dropped ideas:** v1 short-form on-screen hooks (shorts now use series labels instead), carousel slide 1 options not built (IG "How a database finds 1 row in a million", "Why your contacts list explains database indexes", "Before you add a database index, check these 5 things"; LinkedIn "Database indexes in 9 slides", "The database index cheat sheet", "Indexing every column makes your database slower"). Thumbnail concepts T04, T10, T11-as-main, T14, T17, T19 were not built as main thumbnails.
- **Original thumbnail concept briefs** (T01 to T22, with picture, pose and reasoning): `refined-kit.v1.md` section 2. The file each one became is in 2b above.

### 7e. What changed from her kit (and accuracy notes)
- Titles, thumbnails, description, tags and captions come from this kit, not `database-indexes-kit.md`. Her kit's description, source list and CONNECT links are kept in 1b.
- Chapters: her kit had 13 untimed chapters; these are 16, timed to the exported full edit (the first 19.35 s of silence and five small slips are cut, so times are earlier than the raw recording).
- Shorts: her kit planned seven scripted shorts to record separately. Instead, six were cut from this recording (section 3); her kit's ORDER BY + LIMIT short has no built version.
- **ILLUSTRATION labels removed** (her rule, 2026-10-14): `BRIEF.md` once said to label illustrative screens "ILLUSTRATION". Those labels were taken off the film, the carousel and thumbnail 11; illustrative screens stay generic instead. Source credits stay ("Simplified, after S. Egorenkov").
- Accuracy (from `BRIEF.md`): her "one thing you can always use to fix this" is a simplification, so no title or caption says an index fixes every slow app. "About 20 steps" is written as "about 20 comparisons" (a real B-tree is 3 to 4 levels). Clustered indexes apply to MySQL InnoDB and SQL Server, not PostgreSQL. Bitmap indexes can't be created in PostgreSQL or MySQL. At 2:52 raw she says "Without an index, you will do way less": a slip for "with"; it is cut from the edit and SH3. "Seq Scan" is never captioned as whisper heard it.
- Lines in her kit that are not in the recording (for example "a thousand rows", "No, we can't", the closing "faster reads, slower writes" line) are never quoted as hers.
- Still to listen: "between 10 and 15" (kit says 50) and "Harry" (whisper heard "Ari").

### 7f. Sources
**News and conversation**
- PostgreSQL home page, news list (19 Beta 4 released 2026-09-24): https://www.postgresql.org/
- PostgreSQL 18 release notes, 2025-09-25 (skip scan): https://www.postgresql.org/docs/release/18/ and https://www.postgresql.org/about/featurematrix/detail/skip-scan-on-multicolumn-b-tree-indexes
- HackerNoon, "Why Vibe Coders Eventually Hit a Database Wall (and Don't Know Why)", HariMindi, 4 May 2026: https://hackernoon.com/why-vibe-coders-eventually-hit-a-database-wall-and-dont-know-why
- "Lovable app slow after adding data (2026)": https://aliteq.com/lovable-app-slow-after-adding-data-2026
- AppSignal, "What metrics to monitor in your vibe coded app", 1 Apr 2026: https://blog.appsignal.com/2026/04/01/what-metrics-to-monitor-in-your-vibe-coded-app.html
- Laravel 13 release notes (17 Mar 2026; no index changes): https://laravel.com/docs/13.x/releases

**Technical facts** (see `../BRIEF.md` "Verified facts")
- PostgreSQL indexes: https://www.postgresql.org/docs/current/indexes.html · EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html · expression indexes: https://www.postgresql.org/docs/current/indexes-expressional.html · partial: https://www.postgresql.org/docs/current/indexes-partial.html · ORDER BY: https://www.postgresql.org/docs/current/indexes-ordering.html · foreign keys: https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK
- MySQL EXPLAIN output: https://dev.mysql.com/doc/refman/8.0/en/explain-output.html · multi-column indexes: https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html · foreign keys: https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html · clustered index: https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html
- Use The Index, Luke (leading wildcards, function on column): https://use-the-index-luke.com/
- Sergey Egorenkov, "How Database Indexes Work (In Simple Words)" (the bob/dave/alice example; Medium blocked our fetch, details from her kit): https://medium.com/databases-in-simple-words/how-database-indexes-work-in-simple-words-f22558869c03
- Laravel migrations, indexes: https://laravel.com/docs/migrations#indexes

**Her channel** (yt-dlp, 2026-10-12): "Everything you need to know about DATABASE RELATIONSHIPS" 161 views; "Database Normal Forms in 6 minutes" 56; best ever "nobody warned me about studying in Europe as a Nigerian" 6,400.

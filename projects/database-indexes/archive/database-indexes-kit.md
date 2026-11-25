# Database Indexes Explained: Why Your Queries Get Slow: Content Kit
**Version 4. The script is now your dictated read-through, cleaned up, with the questions you asked while reading answered inside it. See "What changed" just below the pools.**
**Every segment still opens with enough context to stand alone, so any of them can be cut into a clip.**
**The X section is rebuilt again using the second batch of tweets you pasted. See the note at the top of section 7.**

---

## TAG POOL (103 tags, every tag used anywhere in this kit, deduplicated)

database index, database indexes explained, sql index, what is a database index, how database indexes work, why is my query slow, slow sql query, database performance, sql performance, b-tree index, clustered vs non clustered index, composite index, covering index, partial index, unique index, database index types, sql explain, postgres index, mysql index, laravel index, laravel migration index, postgres foreign key index, full table scan, query optimization, backend development, web development, sql tutorial, database tutorial, system design, order by index, software engineering, learn sql, postgresql, mysql, laravel, php, gbemisola oladetoun, withgbemi, database index explained, how indexes work, b-tree search, binary search example, composite index order, multi column index, leftmost prefix, compound index, laravel foreignid index, mysql vs postgres, slow join, function on indexed column, expression index, index not used, sargable queries, too many indexes, index write cost, write amplification, when to add an index, order by limit index, sort performance sql, index for order by, pagination performance, slow database query, app getting slow, sequential scan, no index query, sql index basics, how btree works, database index example, how indexes find data, create index sql, laravel add index, database index tutorial, explain query plan, seq scan vs index scan, mysql explain type all, types of indexes in sql, btree index, unique constraint, prevent duplicate emails, laravel unique, clustered index explained, primary key clustered index, why is my index not used, query planner, small table seq scan, like wildcard index, leading wildcard, like query slow, full text search, lower email index, mysql vs postgres foreign keys, index best practices, database optimisation, database index summary, when to use an index, query optimisation, hash index, bitmap index, spatial index, full text index, geospatial index, how near me search works, location search database

## HASHTAG POOL (29 hashtags, every hashtag used anywhere in this kit)

#Shorts #database #sql #backend #webdev #postgres #mysql #coding #programming #developer #learntocode #computerscience #algorithms #postgresql #laravel #php #performance #bestpractices #systemdesign #techtok #debugging #interview #search #maps #tech #funfacts #softwareengineering #databases #webdevelopment

---

## WHAT CHANGED (from your dictated read-through)

Your read-through is now the script. I kept your order, your phrasings and your asides ("And that is very problematic," "So now that begs the question," "No, we can't," "So what you do is that you index..."). Here's everything I changed.

**Transcription fixes:** "10 hundred rows" to "a thousand rows," "sex scan" to Seq Scan, "Larabelle" to Laravel, "HOTO / auto" to author, "B3" to B-tree, "Ash" to hash, "premier quee" to primary key, "white card" to wildcard, "gulture" to gotcha, "ISQL" to MySQL, "wear closes, joints, other buy" to WHERE clauses, joins, ORDER BY, "really search" to rarely searched, "hack the database" to ask the database, "Okafo, Adeumi" to Okafor, Adeyemi. I also removed the "He approached the device, a garbage" line that got picked up in the background, as you asked.

**Factual slips fixed:**
- "Alice comes after Bob" became "Bob comes after Alice."
- "A table can have a clustered index" became "A table can only have one clustered index," since that's the point of the line.
- "Is it using a database query?" became "Is it using an index?"
- Your types list said "partial" twice and skipped spatial, so the second one is now spatial.

**Your questions, answered inside the script:**
- **"If the index tells it exactly where, why does it move left and right?"** There are two steps. The left and right moves are the database searching *the index* for Bob's entry. Once it finds Bob's entry, that entry holds a pointer to Bob's row in the *table*, so it goes straight there. Segment 4 now says it in that order, with an on-screen line showing the two steps.
- **"The MySQL EXPLAIN part is confusing."** Postgres gives you one line to read (Seq Scan or Index Scan). MySQL gives you a small table instead, and you read two columns from it. The type column says ALL for a full scan, or something like ref or range when it's using an index. The key column shows the name of the index it used, and says NULL when it didn't use one. Segment 6 now walks through it like that.
- **"Searches on how a value starts" was confusing.** The B-tree part now gives a real example for each of the four things it does, and "starts with" is explained with every book title that starts with "Harry."
- **"Why can't the phone book find by first name?"** The phone book is sorted by surname first, and only then by first name inside each surname. So all the Okafors sit together, but the Adas are scattered: Ada Adeyemi near the front, Ada Okafor in the middle, Ada Williams near the end. Nothing groups them, so you'd have to read every page. Segment 7 now tells it that way.
- **"Each type can get a little more."** Hash, bitmap, spatial and full-text now each get two or three sentences with a real-life example, written in the same "coffee shop near me" style you liked. Spatial also gets one simple line on how it works. Covering and partial get one sentence each, since you hadn't dictated those.

**Small additions, so the segments make sense on their own:**
- "I'll link it in the description" after you mention the article.
- One sentence explaining what '%fall%' means in the LIKE mistake.
- The code blocks you didn't read out are still on screen where they were.

**Your call:**
- **You dropped the third mistake** (skipping the first column of a composite index) because you didn't understand it well enough to say it. Once the phone book version in Segment 7 makes sense to you, it's the same idea, and you can add it back with this line: *"And the third one is the composite index. If your index is on last name and then first name, and your query only searches by first name, the index usually can't help, the same way the phone book can't find all the Adas."*
- **Your ending stops at "add them when they actually help,"** so I left it there. The old comment question and sign-off are marked optional below it.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** it's your dictated read-through, cleaned up. Every segment still names its own topic in its first lines, so the clip breakdown in section 5c can cut it cleanly. Code stays on screen while you talk through it.

---

**[SEGMENT 1: OPEN]**

As you get more users on your app, your database grows and your tables get bigger.

Now it takes longer for your app to load, and you're having performance issues.

One thing you can always use to fix this is a database index.

In this video, we'll be going over what your database does when there is no index, what an index actually is, how it finds things so fast and helps performance, the different types of index, and the mistakes people make when they use database indexes.

---

**[SEGMENT 2: WHAT HAPPENS WITHOUT AN INDEX]**

To understand why a database index matters, you first have to see what your database does without an index.

Say we have a bookstore, and the books table has a million rows. We have a million books in here.

And we run this query.

**[CODE ON SCREEN]**
```sql
SELECT * FROM books WHERE author_id = 42;
```

Without an index, the database has no idea where author 42's books are.

So it does the only thing it can. It starts at the first row and checks every single row, all one million of them.

That is called a full table scan.

And that is very problematic.

When your table has a thousand rows, maybe it wouldn't be a problem and you wouldn't notice.

But at a million rows, there is a problem.

---

**[SEGMENT 3: WHAT AN INDEX IS]**

**[~1:00 BEAT: the problem is set. This question is the reason to keep watching]**

So now, what is a database index, and how does it solve this problem of speed?

The easiest way to think about it is the index at the back of a book.

If you want to find every page that mentions a particular word, you don't read the whole book from the beginning.

You go to the index at the back. It's sorted alphabetically. You find the word, and it tells you the page number.

A database index works the same way.

It's a separate structure that stores the values from a column in sorted order.

And for each value, it keeps a pointer to where that row actually lives.

And it only stores the column and the pointer, so it is much smaller than the table itself.

---

**[SEGMENT 4: HOW AN INDEX FINDS THINGS SO FAST]**

So what mechanism does a database index use to find things so fast?

I read an article on this, and I love the way the writer explained it, so I'm going to use their example. I'll link it in the description.

Say you have an index on the email column, and you're looking for bob@email.com.

The database opens the index in the middle and sees dave@email.com.

Bob comes before Dave, so it moves to the left.

Now it sees alice@email.com. Bob comes after Alice, so it moves right.

And it keeps moving strategically like this until it finds bob@email.com in the index.

Bob's entry in the index has a pointer to where Bob's row is in the table, so the database goes straight there.

**[ON SCREEN: step 1, search the index: dave → alice → bob / step 2, follow the pointer → Bob's row in the table]**

So with this strategy, even with a million rows, you can get to the row you're looking for in about 20 steps.

Without an index, you will do up to a million checks in the worst case. With an index, you will do way less than that.

**[ON SCREEN: no index = up to 1,000,000 checks / with index = about 20 steps]**

Most databases store their indexes in a structure called a B-tree, and a B-tree works the way that example from the article showed.

So even with a table with hundreds of millions of rows, you usually only need a few levels to get to the right place.

---

**[SEGMENT 5: HOW TO ADD A DATABASE INDEX]**

**[~3:00 BEAT: first real payoff, they can now do it themselves]**

Adding a database index will literally up your query optimisation game.

And it's a one-liner.

In SQL, it looks like this.

**[CODE ON SCREEN]**
```sql
CREATE INDEX idx_books_author_id ON books (author_id);
```

If you're using Laravel, for example, you simply add it in your migration like this.

**[CODE ON SCREEN]**
```php
Schema::table('books', function (Blueprint $table) {
    $table->index('author_id');
});
```

Now, when you search books by author, the database goes to the index first, finds author 42, and goes straight to those rows.

---

**[SEGMENT 6: HOW TO CHECK YOUR INDEX IS BEING USED]**

Once you've added your database index, you can confirm whether your query is actually using it. You can ask the database.

Just put the word EXPLAIN in front of your query.

**[CODE ON SCREEN]**
```sql
EXPLAIN SELECT * FROM books WHERE author_id = 42;
```

In PostgreSQL, if you see Seq Scan, it means the database is reading every single row.

But if you see Index Scan, it means the database is using your index.

In MySQL, the result comes back as a small table, and there are two columns to look at.

The type column tells you how it's reading the table. If it says ALL, that means it's doing a full scan. If it says something like ref or range, it's using an index.

The key column tells you which index it chose. If it says NULL, no index was used.

**[ON SCREEN: PostgreSQL → Seq Scan = every row / Index Scan = using your index. MySQL → type ALL = every row / key = the index it used]**

So when a query is slow, run EXPLAIN first to confirm what is going on.

Is this query doing a full scan, or is it using an index?

---

**[SEGMENT 7: THE TYPES OF DATABASE INDEX]**

There are a few types of database index.

You'll hear people talk about B-tree, hash, bitmap, spatial, full-text, unique, composite, covering and partial indexes.

You probably won't use all of them.

So I'm just going to focus on the three that are most common and important.

**[ON SCREEN: index types cheat sheet, with B-tree, unique and composite highlighted]**

The first one is the B-tree.

The B-tree is the default one. So when you create an index without saying what type it is, this is the one you get.

It can find exact matches, like the user with this exact email.

It can find ranges, like books priced between 10 and 50.

It can sort, like showing the newest orders first.

And it can find values by how they start, like every book title that starts with "Harry."

That last one works because the index is sorted, so all the titles that start with "Harry" sit next to each other.

The second commonly used type of database index is the unique index.

It makes sure that no two rows have the same value. For example, no two users can sign up with the same email.

If someone tries to sign up with an email that's already there, the database refuses it.

Your primary key already has one.

**[CODE ON SCREEN]**
```php
$table->unique('email');
```

**[~6:00 BEAT, optional line]**

And this third one is the one that confused me the most.

The third one is the composite index, which is an index on more than one column.

So say you index last name and first name together, in that order.

It helps you when you search by last name, and it helps you when you search by last name and first name.

But when you search only by first name, it usually doesn't help.

Let's use the example of a phone book to understand this.

Think of a phone book sorted by surname. All the Adeyemis are together, and further along, all the Okafors are together.

And inside each surname, it's sorted by first name. So in the Okafors, Ada Okafor comes before Chidi Okafor.

So if I'm looking for Ada Okafor, it's easy. I go to the O's, find Okafor, and then find Ada.

But what if I want everyone whose first name is Ada?

There's Ada Adeyemi near the front, Ada Okafor in the middle, and Ada Williams near the end.

They're spread across the whole phone book, because the book is sorted by surname first.

So nothing groups the Adas together, and I'd have to read every page to find them all.

That's exactly what happens with a composite index on last name and first name. So put the column you search by most often first.

**[CODE ON SCREEN]**
```php
$table->index(['last_name', 'first_name']);
// helps: WHERE last_name = 'Okafor'
// helps: WHERE last_name = 'Okafor' AND first_name = 'Ada'
// usually can't help: WHERE first_name = 'Ada'
```

For the rest, they are for special kinds of searches.

A hash index is for exact matches only. It's very fast at "find this exact value," like looking up someone's login session by its exact token. But it can't do ranges or sorting, so most people just use a B-tree.

A bitmap index is for columns with only a few values, like a status column that's only ever active, inactive or banned. You mostly see it in databases built for reports, where you're filtering millions of rows by things like status and region at the same time.

A spatial index is for location data. Like when you search for coffee shops near me, or when a ride app looks for drivers close to you. It groups places that are near each other on the map, so the app only checks the places around you instead of every coffee shop on earth.

A full-text index is for searching inside text. For example, when you search an online shop for "wireless headphones," it finds every product description with those words in it. It works by indexing each word in the text, instead of the whole value.

And two more you'll hear about. A covering index includes every column a query needs, so the database can answer from the index without going to the table at all. And a partial index only covers some of the rows, like only the active users, because those are the only ones you ever search.

---

**[SEGMENT 8: CLUSTERED VS NON-CLUSTERED INDEXES]**

You'll also hear people talk about clustered and non-clustered indexes, and the difference is very simple.

A clustered index decides the order the table's rows are actually stored in.

Think of it as a phone book. The data itself is sorted by surname, so once you've found the name, you've found everything.

A table can only have one clustered index, because the rows can only be stored in one order.

In MySQL, the primary key is the clustered index.

A non-clustered index is a separate structure that points back to the row.

Think of it as the index at the back of a book. It tells you where to go, and you go there.

A table can have lots of non-clustered indexes.

So this is the difference between clustered and non-clustered.

**[ON SCREEN: clustered = phone book (the data is sorted) / non-clustered = book index (points to the page)]**

---

**[SEGMENT 9: THE HIDDEN COST OF INDEXES]**

So now that begs the question. If database indexes make queries so fast, why don't we just index every column and be done with it?

No, we can't, because every index has a cost.

Every time you insert, update or delete a row, the database also has to update every index on that table.

So if your orders table has six indexes, every new order means updating the table and all six indexes.

So the more indexes you have, the slower your writes get.

And indexes also take up storage space.

Also, for a small table, the database will often skip your index and just scan the table anyway, because that's faster.

If I just have like 10 rows, it's faster to read them all than to go through an index first.

So what you do is that you index the columns you actually search on, filter on, join on, or sort by.

You don't index everything.

---

**[SEGMENT 10: MISTAKES THAT STOP YOUR INDEX FROM WORKING]**

There are several mistakes you can make that can stop your database index from working as well.

You can have a database index, and the database still won't use it. And these are the common mistakes that cause it.

The first one is wrapping your column in a function.

**[CODE ON SCREEN]**
```sql
SELECT * FROM users WHERE LOWER(email) = 'ada@example.com';
```

For example, in this case, a normal index on email is sorted by the emails exactly as they were stored.

The lowercase versions are not in it, so the database can't use it here, unless you create an index on that same expression.

The second one is having a wildcard at the start of a LIKE.

**[CODE ON SCREEN]**
```sql
WHERE title LIKE 'fall%'    -- can use the index
WHERE title LIKE '%fall%'   -- generally can't
```

The index is sorted by how each value starts.

'%fall%' means "fall" could be anywhere in the title, so the database doesn't know how the value starts.

And if you don't know how it starts, the index cannot help you find it.

---

**[SEGMENT 11: THE FOREIGN KEY GOTCHA]**

Another database index gotcha is that in MySQL, when you add a foreign key, the database creates an index on that column for you automatically, if there isn't one already.

But in PostgreSQL, it doesn't.

**[CODE ON SCREEN]**
```php
$table->foreignId('author_id')->constrained();
// MySQL: indexed for you
// PostgreSQL: add $table->index('author_id') yourself
```

So if you're on Postgres, or you've moved from MySQL to Postgres, you have to check and confirm that your foreign key columns actually have indexes.

It's one of the most common reasons a join suddenly gets slow.

---

**[SEGMENT 12: WHEN TO ACTUALLY USE A DATABASE INDEX]**

So at what point then, if we're not just going to throw database indexes around on every column, do we actually need to add a database index?

When a column keeps showing up in your WHERE clauses, your joins or your ORDER BY.

So say you are sorting a million orders by date, and you only show the first 10.

If there's no index, the database has to look at all million rows and sort them before it can give you those 10.

But with an index, it reads them in order and stops after the first 10.

**[CODE ON SCREEN]**
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

You should also add an index when EXPLAIN shows a full scan on a query that is slow.

So if your query is slow, and you check with EXPLAIN and see that it's running a full scan, you should probably consider adding an index there.

Also, when a table gets read a lot more than it gets written to, that is also a good situation for a database index.

But you shouldn't when the table is small, or when the table is written to constantly but rarely searched. Then you probably don't need a database index.

---

**[SEGMENT 13: CLOSING]**

So that's it with database indexes.

They make your reads faster, but they make your writes slower.

So you have to be conscious enough to add them when they actually help.

**[OPTIONAL, from the last draft]**

Tell me in the comments the slowest query you've ever fixed with a single index. I want to see the before and after.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("database index explained" and "why is my query slow" are both steady, high-intent searches)
> 1. Database Indexes Explained: Why Your Queries Get Slow — 53 — 58
> 2. How Database Indexes Work (With Real Examples) — 46 — 51
> 3. What Is a Database Index? Explained Simply — 42 — 47
> 4. Database Index Types Every Developer Should Know — 48 — 53
> 5. Why Is My SQL Query Slow? It's Probably This — 44 — 49
> 6. Clustered vs Non-Clustered Index, Explained Simply — 50 — 55
> 7. B-Tree Indexes Explained for Beginners — 38 — 43

**CLICK-LED**
> 8. The One Line That Fixes Most Slow Queries — 41 — 46
> 9. How Your Database Finds One Row Out of a Million — 48 — 53
> 10. Why Not Just Index Every Column? — 32 — 37
> 11. Postgres Doesn't Index Your Foreign Keys — 40 — 45
> 12. Your Database Is Reading a Million Rows. Here's Why. — 52 — 57

**RECOMMENDED: 1.** It matches both the concept search and the symptom search in one title. 4 is worth testing if the first stalls, because it's the exact framing of Alex Xu's post that got 62K views in your first X search. 9 pairs well with the bob/dave/alice walkthrough if you use that as the thumbnail moment. Thumbnail: the back of a book's index next to a database table, with "1,000,000 rows vs 20 steps" as the text.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "How Your Database Finds One Row Out of a Million" (48). Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in the same spot you always use. On the left, a huge "1,000,000" crossed out with "20" next to it. No other text. Squint at it, and if the 1,000,000 vs 20 still reads, it works. It shouldn't repeat the title.

**Recording notes:**
- Shoot two takes of the first 20 seconds, so you can pick the stronger one.
- Segment 7 runs about 4 to 5 minutes. That's long but fine, because the marked line inside it at ~6:00 gives people a reason to stay.
- Your closing doesn't refer back to anything specific, so the edit can end cleanly after it.
- At your speaking pace the full video is roughly 13 to 15 minutes. That's comfortably over 8, so nothing needs padding.

**Retention beats (marked in the script):**
- ~1:00 is Segment 3's question, "how does it solve this problem of speed?"
- ~3:00 is the bob/dave/alice walkthrough, then "Adding a database index will literally up your query optimisation game."
- ~6:00 is inside the types segment, just before composite indexes.

**After publishing:**
- Post the X image post as the video goes live, and share the link with a few people who'll actually watch it all the way through.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3 and 6 minutes. Wherever the big drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> As you get more users, your database grows, your tables get bigger, and your app takes longer to load. One thing you can always use to fix that is a database index.
>
> In this video I start from the beginning. What your database does when there's no index, what an index actually is (think of the index at the back of a book), and how it finds one row out of a million in about twenty steps, using a great example from Sergey Egorenkov's article. Then how to add an index in SQL and in a Laravel migration, and how to check it's being used with EXPLAIN.
>
> I also go through the types of database index, with a closer look at B-tree, unique and composite indexes, then clustered vs non-clustered, the hidden cost of indexing every column, the mistakes that stop an index from working, the foreign key gotcha on PostgreSQL, and when you should actually add one.
>
> What's the slowest query you've ever fixed with one index?
>
> CHAPTERS (add times after editing)
> 0:00 Why your app gets slower as your data grows
> What happens without an index
> What a database index is
> How an index finds things so fast
> How to add a database index
> How to check your index is being used (EXPLAIN)
> The types of database index
> Clustered vs non-clustered indexes
> The hidden cost of indexes
> Mistakes that stop your index from working
> The foreign key gotcha
> When to actually use a database index
> Wrap up
>
> SOURCES AND FURTHER READING
> How Database Indexes Work (In Simple Words), Sergey Egorenkov: https://medium.com/databases-in-simple-words/how-database-indexes-work-in-simple-words-f22558869c03
> Database Indexing, Design Gurus: https://www.designgurus.io/blog/database-indexing
> Indexing in Databases, GeeksforGeeks: https://www.geeksforgeeks.org/dbms/indexing-in-databases-set-1/
> PostgreSQL documentation, Indexes: https://www.postgresql.org/docs/current/indexes.html
> MySQL documentation, How MySQL Uses Indexes: https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html
> Use The Index, Luke, Markus Winand: https://use-the-index-luke.com/
> Laravel documentation, Migrations and Indexes: https://laravel.com/docs/migrations#indexes
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (483 characters, under YouTube's 500 limit):**

database index, database indexes explained, sql index, what is a database index, how database indexes work, why is my query slow, slow sql query, database performance, sql performance, b-tree index, clustered vs non clustered index, composite index, covering index, partial index, unique index, database index types, sql explain, postgres index, mysql index, laravel index, laravel migration index, postgres foreign key index, full table scan, query optimization, backend development

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

As you get more users, your tables get bigger and your app gets slower. One thing you can always use to fix that is a database index.

**[WITHOUT ONE]**

Without an index, your database checks every single row to find what you asked for. That's a full table scan.

**[WHAT IT IS]**

An index is like the index at the back of a book. It's a sorted list of values, each pointing to where the row lives.

**[HOW IT FINDS THINGS]**

Looking for bob@email.com? The database opens the middle and sees dave. Bob comes before Dave, so it goes left. It sees alice. Bob comes after Alice, so it goes right. Found him. A million rows in about twenty steps.

**[ADD ONE]**

**[CODE ON SCREEN]**
```php
$table->index('author_id');
```

**[CHECK IT]**

Put EXPLAIN in front of your query. Seq Scan in Postgres means every row. Index Scan means your index is working.

**[TYPES]**

The B-tree is the default. A unique index stops duplicate emails. And in a composite index, column order matters, the same way a phone book sorted by surname can't find everyone called Ada.

**[THE COST]**

But don't index everything. Every insert, update and delete has to update every index too.

**[THE MISTAKES]**

Wrapping a column in LOWER stops the index being used. So does starting a LIKE with a wildcard. And Postgres doesn't index your foreign keys for you. MySQL does.

**[LAND]**

So when your app gets slow, run EXPLAIN before you do anything else.

**Caption:** why your app gets slower as your tables grow, and the one line that usually fixes it 🗂️
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #webdev #postgres #mysql #coding #programming #developer #learntocode
**Tags:** database index explained, why is my query slow, how indexes work, sql performance

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: How an index finds bob@email.com (20-30 sec)

You're looking for bob@email.com, and there's an index on email.

The database opens the index in the middle and sees dave@email.com. Bob comes before Dave, so it moves left.

Now it sees alice@email.com. Bob comes after Alice, so it moves right.

And there's Bob. That's how a database index gets to one row out of a million in about twenty steps.

**Caption:** how a database index finds one email out of a million, using a walkthrough from Sergey Egorenkov's article that I love 🔎
full video: [LINK]
**Hashtags:** #Shorts #database #sql #computerscience #algorithms #backend #coding #programming #developer #learntocode
**Tags:** how database indexes work, b-tree search, binary search example, database index explained

---

### SHORT 3: The phone book (20-30 sec)

If you index last name and first name together, in that order, it helps when you search by last name.

But searching only by first name usually can't use it.

Think of a phone book sorted by surname. Brilliant for finding everyone called Okafor. Useless for finding everyone called Ada.

That's why column order matters in a composite index.

**Caption:** a phone book sorted by surname can't find everyone called Ada. composite indexes work exactly the same way 📖
full video: [LINK]
**Hashtags:** #Shorts #sql #database #backend #webdev #coding #programming #developer #postgres #mysql
**Tags:** composite index order, multi column index, leftmost prefix, compound index

---

### SHORT 4: Postgres doesn't index your foreign keys (20-30 sec)

In MySQL, when you add a foreign key, it creates an index on that column for you.

In PostgreSQL, it doesn't.

So if you're on Postgres, or you moved from MySQL, go and check your foreign key columns actually have indexes. It's one of the most common reasons a join suddenly gets slow.

**Caption:** MySQL indexes your foreign keys for you. Postgres doesn't. go and check yours 👀
full video: [LINK]
**Hashtags:** #Shorts #postgres #postgresql #mysql #laravel #database #backend #sql #developer #php
**Tags:** postgres foreign key index, laravel foreignid index, mysql vs postgres, slow join

---

### SHORT 5: LOWER() and your index (20-30 sec)

You have an index on email. Then you write WHERE LOWER(email) equals something.

The index is sorted by the emails exactly as they were stored. The lowercased versions aren't in it, so the database can't use it, and it's back to checking every row.

Unless you create an index on that exact expression.

**Caption:** wrapping a column in a function like LOWER() can quietly stop your index from being used 😬
full video: [LINK]
**Hashtags:** #Shorts #sql #database #performance #backend #coding #programming #developer #postgres
**Tags:** function on indexed column, expression index, index not used, sargable queries

---

### SHORT 6: Why not index every column? (20-30 sec)

If indexes make queries faster, why not index every column?

Because every time you insert, update or delete a row, the database has to update every index on that table too.

Six indexes on your orders table means every new order updates the table and six indexes. So you index what you actually search on.

**Caption:** every index you add makes every insert, update and delete a little slower. index what you actually search on ⚖️
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #performance #coding #bestpractices #developer #systemdesign
**Tags:** too many indexes, index write cost, write amplification, when to add an index

---

### SHORT 7: ORDER BY and LIMIT (20-30 sec)

Say you sort a million orders by date and only show the first ten.

Without an index on the date, the database has to look at all million rows and sort them before it can give you those ten.

With an index on the date, it reads them already in order and stops after ten.

**Caption:** showing the 10 newest orders can still mean sorting a million rows, if the date column has no index 📅
full video: [LINK]
**Hashtags:** #Shorts #sql #database #postgres #mysql #backend #performance #coding #developer
**Tags:** order by limit index, sort performance sql, index for order by, pagination performance

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: your app got slower as your data grew
**Caption:** more users means bigger tables, and bigger tables mean a slower app. one thing you can always use to fix that is a database index.
full video: [LINK]
**Hashtags:** #Shorts #database #backend #webdev #performance #sql #coding #programming #developer #learntocode
**Tags:** why is my query slow, slow database query, app getting slow, database performance

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** what a full table scan is
**Caption:** without an index, the database starts at the first row and checks every single one. all million of them.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #backend #coding #programming #developer #learntocode #webdev
**Tags:** full table scan, sequential scan, no index query, sql performance

---

### CLIP 3 — Segment 3 (whole)
**Overlay:** database indexes, explained
**Caption:** like the index at the back of a book. a sorted list of values, each pointing to where the row actually lives.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #webdev #coding #programming #learntocode #developer
**Tags:** what is a database index, database index explained, how indexes work, sql index basics

---

### CLIP 4 — Segment 4 (whole)
**Overlay:** how a database index finds things so fast
**Caption:** looking for bob@email.com, the database checks the middle, sees dave, goes left, sees alice, goes right, and finds bob's entry. then it follows the pointer straight to his row.
full video: [LINK]
**Hashtags:** #Shorts #computerscience #algorithms #database #sql #coding #programming #developer #backend
**Tags:** how database indexes work, b-tree index, binary search example, how btree works

---

### CLIP 5 — subset of Segment 4
**Starts:** "Say you have an index on the email column..." **Ends:** "...so the database goes straight there."
**Overlay:** finding bob@email.com in a million rows
**Caption:** dave, then alice, then bob. that's how a sorted index finds one email without checking the rest.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #computerscience #coding #developer #learntocode #techtok
**Tags:** binary search example, database index example, b-tree search, how indexes find data

---

### CLIP 6 — Segment 5 (whole)
**Overlay:** how to add a database index
**Caption:** one line in SQL, or one line in a Laravel migration. that's genuinely it.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #sql #database #backend #webdev #coding #developer
**Tags:** create index sql, laravel migration index, laravel add index, database index tutorial

---

### CLIP 7 — Segment 6 (whole)
**Overlay:** how to check if your index is being used
**Caption:** put EXPLAIN in front of your query. Seq Scan in Postgres means every row. Index Scan means your index is working. in MySQL, type ALL means every row, and the key column shows the index it used.
full video: [LINK]
**Hashtags:** #Shorts #sql #postgres #mysql #database #backend #debugging #developer #performance
**Tags:** sql explain, explain query plan, seq scan vs index scan, mysql explain type all

---

### CLIP 8 — Segment 7 (whole)
**Overlay:** database index types every developer should know
**Caption:** there are lots of types, and the three you'll use most are B-tree, unique and composite.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #systemdesign #backend #coding #programming #developer #techtok
**Tags:** database index types, types of indexes in sql, btree index, unique index, composite index

---

### CLIP 9 — subset of Segment 7
**Starts:** "The third one is the composite index..." **Ends:** "...search by most often first."
**Overlay:** why column order matters in an index
**Caption:** a phone book sorted by surname can't find everyone called Ada. composite indexes work the same way.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #backend #coding #programming #developer #mysql #postgres
**Tags:** composite index order, multi column index, leftmost prefix, compound index

---

### CLIP 10 — subset of Segment 7
**Starts:** "The second commonly used type of database index is the unique index." **Ends:** "...Your primary key already has one."
**Overlay:** how to stop duplicate emails in your database
**Caption:** a unique index makes sure no two users can sign up with the same email. your primary key already has one.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #laravel #backend #coding #developer #webdev
**Tags:** unique index, unique constraint, prevent duplicate emails, laravel unique

---

### CLIP 11 — Segment 8 (whole)
**Overlay:** clustered vs non-clustered index
**Caption:** clustered is a phone book, where the data itself is sorted. non-clustered is the index at the back of a book, pointing you to the page.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #backend #mysql #coding #programming #developer #interview
**Tags:** clustered vs non clustered index, clustered index explained, primary key clustered index

---

### CLIP 12 — Segment 9 (whole)
**Overlay:** why not index every column?
**Caption:** every insert, update and delete has to update every index too. six indexes on your orders table means six extra updates per order.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #performance #coding #bestpractices #developer
**Tags:** too many indexes, index write cost, write amplification, when to add an index

---

### CLIP 13 — subset of Segment 9
**Starts:** "Also, for a small table..." **Ends:** "...than to go through an index first."
**Overlay:** when the database ignores your index
**Caption:** on small tables, the database often skips your index and scans anyway, because that's faster.
full video: [LINK]
**Hashtags:** #Shorts #database #postgres #sql #backend #performance #developer #coding
**Tags:** why is my index not used, query planner, small table seq scan

---

### CLIP 14 — Segment 10 (whole)
**Overlay:** mistakes that stop your index from working
**Caption:** wrapping the column in a function, or starting a LIKE with a wildcard, can stop your index from being used even when it's there.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #performance #backend #coding #developer #debugging
**Tags:** index not used, function on indexed column, like wildcard index, sargable queries

---

### CLIP 15 — subset of Segment 10
**Starts:** "The second one is having a wildcard at the start of a LIKE." **Ends:** "...the index cannot help you find it."
**Overlay:** why LIKE '%text%' is slow
**Caption:** the index is sorted by how each value starts. if you don't know how it starts, the index can't help you.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #search #backend #coding #developer
**Tags:** like wildcard index, leading wildcard, like query slow, full text search

---

### CLIP 16 — subset of Segment 10
**Starts:** "The first one is wrapping the column in a function." **Ends:** "...an index on that same expression."
**Overlay:** LOWER() and your index
**Caption:** a normal index on email doesn't have the lowercased versions in it, so WHERE LOWER(email) can't use it.
full video: [LINK]
**Hashtags:** #Shorts #sql #postgres #mysql #database #backend #developer #coding
**Tags:** function on indexed column, expression index, lower email index, index not used

---

### CLIP 17 — Segment 11 (whole)
**Overlay:** Postgres doesn't index your foreign keys
**Caption:** MySQL creates the index for you when you add a foreign key. PostgreSQL doesn't. go and check yours.
full video: [LINK]
**Hashtags:** #Shorts #postgres #laravel #mysql #database #backend #php #developer
**Tags:** postgres foreign key index, laravel foreignid index, mysql vs postgres foreign keys, slow join

---

### CLIP 18 — Segment 12 (whole)
**Overlay:** when to add a database index
**Caption:** when a column keeps showing up in WHERE, JOIN or ORDER BY, and EXPLAIN shows a full scan on a slow query.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #bestpractices #coding #developer #performance
**Tags:** when to add an index, index best practices, database optimisation

---

### CLIP 19 — subset of Segment 12
**Starts:** "So say you are sorting a million orders by date..." **Ends:** "...stops after the first 10."
**Overlay:** why showing the 10 newest orders can be slow
**Caption:** without an index on the date, the database sorts every row before it can give you the first ten. with one, it stops after ten.
full video: [LINK]
**Hashtags:** #Shorts #sql #database #postgres #mysql #backend #performance #developer
**Tags:** order by limit index, sort performance sql, index for order by, pagination performance

---

### CLIP 20 — Segment 13 (whole)
**Overlay:** database indexes in one sentence
**Caption:** they make your reads faster and your writes slower, so you add them where they actually help.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #developer #coding #backend #learntocode
**Tags:** database index summary, when to use an index, query optimisation
**If you record the optional ending,** change the overlay to "what's the slowest query you've fixed?" and the caption to "tell me the before and after. I want to see it 👀"

---

### CLIP 21 — subset of Segment 7
**Starts:** "For the rest, they are for special kinds of searches." **Ends:** "...the only ones you ever search."
**Overlay:** hash, bitmap, spatial and full-text indexes
**Caption:** hash for exact values like a login token, bitmap for columns like status, spatial for "coffee shops near me," and full-text for searching inside product descriptions.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #systemdesign #backend #coding #developer #computerscience #techtok
**Tags:** hash index, bitmap index, spatial index, full text index, types of indexes in sql

---

### CLIP 22 — subset of Segment 7
**Starts:** "A spatial index is for location data." **Ends:** "...instead of every coffee shop on earth."
**Overlay:** how apps find "coffee shops near me"
**Caption:** a spatial index groups places that are near each other on the map, so the app only checks the places around you.
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #database #maps #backend #coding #developer #tech #funfacts
**Tags:** spatial index, geospatial index, how near me search works, location search database

---

**Posting order:** 1 first (the relatable problem), then 5 (bob/dave/alice is the easiest one to follow cold), then 9 (the phone book), then 17 (the Postgres gotcha), then 19 (ORDER BY), then 12.

---

## 6. CAPTIONS

### TikTok caption:
> more users, bigger tables, slower app 😭 one thing you can always use to fix that is a database index. here's what it actually does.
**Hashtags:** #database #sql #backend #coding #learntocode

### Instagram Reel caption:
> As you get more users, your database grows, your tables get bigger, and your app starts taking longer to load.
>
> One thing you can always use to fix that is a database index. Without one, your database checks every row to find what you asked for. With one, it works like the index at the back of a book, sorted so it can go almost straight to the answer.
>
> I also go through the types of index, why you shouldn't index every column, and the mistakes that stop an index from working even when it's there.
>
> Full video on YouTube, link in bio.
>
> #database #sql #backend #webdev #learntocode

### LinkedIn caption:
> Why does an app get slower as more people use it? Very often, the answer is a missing or unused database index.
>
> Without an index, the database has to check every row in the table to answer a query, which you never notice at a thousand rows and always notice at a million.
>
> An index fixes that by keeping a sorted copy of a column's values with pointers to the rows, so the database can find a value in a few steps instead of a million.
>
> Indexes have a cost, though, because every insert, update and delete has to keep them up to date, which is why indexing every column makes writes slower.
>
> And an index only helps if the query can use it. Wrapping a column in a function or starting a LIKE with a wildcard can stop it from being used, and PostgreSQL doesn't index foreign keys automatically the way MySQL does.
>
> The habit worth building is running EXPLAIN before changing anything.
>
> Full walkthrough: [LINK]
>
> #softwareengineering #databases #backend #sql #webdevelopment

---

## 7. X / TWITTER

**What the two X searches showed.** Your first search had one standout. Alex Xu's "Database Index Types Every Developer Should Know," posted as one image, got about 62K views. The second batch you pasted adds a few more patterns worth copying the shape of (never the words).
- **The big explainer accounts** (Level Up Coding, Nikki Siapno, SQL Daily, Inferam) post a short line plus a visual. They also have huge followings, so their numbers come partly from the following and partly from the format.
- **The tweets that started conversations were concrete.** Stackgik's tweet about write cost only got 568 views, but it pulled replies because it said something specific and then asked people to guess the rest. Rohan's reply about ORDER BY and LIMIT is the best tweet in the batch. It names one situation, says exactly what happens, and says what the index changes.
- **Questions and quizzes invite replies.** Melly.Tech posted a multiple-choice question, and Krishna asked "vibe coder, do you know what a database index actually does?"
- **The arrow lists and fragment tweets** ("→ Faster reads ⚡ → Fewer disk scans") are the ones that read most like AI, so none of yours use that shape.
- **Your note on Inferam's post** said it could be a short list of tips, so there's one of those below.

So this section has one image post, one tips list, one quiz and one "can you guess" tweet, plus single tweets that each say one specific thing. In every case, post the link as a reply, never in the first tweet.

### THE IMAGE POST

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

### THE TIPS LIST (the format from your note on Inferam's post)

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

### THE QUIZ

> you have an index on (last_name, first_name). which query usually can't use it?
>
> A. WHERE last_name = 'Okafor'
> B. WHERE last_name = 'Okafor' AND first_name = 'Ada'
> C. WHERE first_name = 'Ada'

**Your reply a few hours later:**
> it's C. the index is sorted by last name first, so it's like a phone book. great for finding every Okafor, useless for finding every Ada

---

### THE "CAN YOU GUESS" TWEET

> there's one thing MySQL does for your foreign keys that postgres doesn't. any guesses?

**Your reply:**
> MySQL creates an index on the foreign key column for you. postgres doesn't, so if you're on postgres, go and check your joins

---

### THE LAUNCH TWEET

> made a video on database indexes from the very beginning, what happens without one, how it finds one row out of a million, the types, and the mistakes that stop it working

**Reply:** [LINK]

---

### STANDALONE TWEETS

> your database stores and reads your data in blocks called pages. in postgres a page is 8kb, in mysql it's 16kb. so to get one row, it loads the whole page that row lives on

> looking for bob@email.com in an index, the database checks the middle and sees dave. bob comes before dave, so it goes left. it sees alice. bob comes after alice, so it goes right. found him. that's a million rows in about twenty steps

> showing the 10 newest orders sounds cheap. but if created_at has no index, the database sorts every single order before it can give you those 10

> six indexes on your orders table means every new order updates the table and six indexes. that's why you don't index every column

> before you rewrite a slow query, put EXPLAIN in front of it. if it says Seq Scan, it's reading every row

> what's the slowest query you've ever fixed with one index? give me the before and after

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what's the slowest query you've ever fixed with a single index? drop the before and after times, I genuinely want to see them 👀

### Instagram:
> EXPLAIN is the most underrated command in databases. run it before you change anything.

### TikTok:
> the LIKE '%text%' one catches so many people 😭

### LinkedIn:
> The habit worth building is reading the query plan before changing anything. Most slow-query fixes become obvious once EXPLAIN shows a full scan where you expected an index.

### X (reply to your own tweet):
> quick check if you're on Postgres: look for every foreign key column in your migrations and make sure it has an index

### REPLIES TO EXPECT (ready to paste)

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

## 9. INSTAGRAM CAROUSEL

**Slide 1:** why your app gets slower as your data grows
**Slide 2:** without an index, the database checks every single row.
**Slide 3:** an index is like the index at the back of a book. sorted, with pointers to the rows.
**Slide 4:** looking for bob@email.com? it checks dave, goes left, checks alice, goes right, and finds bob.
**Slide 5:** that's a million rows in about twenty steps.
**Slide 6:** B-tree is the default. unique stops duplicates. in a composite index, column order matters.
**Slide 7:** run EXPLAIN to check your index is actually being used.
**Slide 8:** don't index everything. every index slows down writes.
**Slide 9:** Postgres doesn't index foreign keys automatically. MySQL does.

**Carousel caption:**
> what a database index is and how it finds one row out of a million, explained from the beginning. full video on YouTube, link in bio.
>
> #database #sql #backend #webdev #learntocode

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> The One Line That Fixes Most Slow Queries

### Subtitle:
> What a database index really is, how it finds things so fast, and the mistakes that stop it from being used.

### SEO Title:
> Database Indexes Explained: Why Your SQL Queries Get Slow

### SEO Description:
> How database indexes work from the beginning: full table scans, B-trees, index types, clustered vs non-clustered, composite indexes, EXPLAIN, write costs and common mistakes.

---

As more people use an application, its database grows, its tables get bigger, and pages that used to load instantly start to lag. One fix you can almost always reach for is a database index.

Without an index, a query such as finding every book by a given author forces the database to check every row, a full table scan. That cost goes unnoticed at a thousand rows and becomes painful at a million.

An index works like the index at the back of a book. It stores a column's values in sorted order, each with a pointer to the row it belongs to, and because it holds only that column and the pointers, it is far smaller than the table. Sorting is what makes it fast. Sergey Egorenkov explains it with a lovely example. To find bob@email.com, the database checks the middle of the index and finds dave@email.com, so it moves left, finds alice@email.com, moves right, and lands on Bob. Each comparison throws away a large part of what's left, so a million rows can be searched in about twenty steps. Most databases use B-trees, which branch many ways at each step, so even very large tables need only a few levels.

Adding an index is a single CREATE INDEX statement or one line in a Laravel migration, and EXPLAIN shows whether a query uses it. In PostgreSQL, Seq Scan means every row is read and Index Scan means the index is used.

There are many types of index, but three cover most everyday work. The B-tree is the default and handles exact matches, ranges and sorting. A unique index stops two rows from sharing a value, such as an email. A composite index covers several columns, and its column order matters, since a phone book sorted by surname cannot find everyone with a given first name. Hash, bitmap, spatial, full-text, covering and partial indexes exist for more specialised searches. Separately, a clustered index determines the physical order of the table's rows, so a table can have only one, while non-clustered indexes are separate structures that point back to the rows.

Indexes carry a cost. Every insert, update and delete must update each index on the table, so six indexes on an orders table means six extra updates per order, and each index takes space. On small tables, the database often scans anyway. Some patterns also stop an existing index from helping, such as wrapping the column in a function like LOWER, or starting a LIKE search with a wildcard. PostgreSQL also does not index foreign key columns automatically, unlike MySQL, which is a common cause of slow joins.

The best candidates for an index are the columns that keep appearing in filters, joins and sorting. Sorting is easy to overlook. Showing the ten newest orders sounds cheap, but without an index on the date, the database has to sort every order before it can return the first ten. Add indexes for the slow queries you can actually see, and check them with EXPLAIN.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Databases, SQL, Backend, Performance, Software Engineering

---

## 11. REFERENCES & SOURCES

**1. The sources you shared, and what each one supports**
- **Sergey Egorenkov, "How Database Indexes Work (In Simple Words)," Medium, March 2025:** the bob/dave/alice walkthrough in Segment 4 (credited in the script as the article you read, and linked in the description), the table-of-contents framing, and the page-size fact used in the pages tweet. https://medium.com/databases-in-simple-words/how-database-indexes-work-in-simple-words-f22558869c03
- **Design Gurus, "Database Indexing":** the list of index types in Segment 7, clustered vs non-clustered, the leftmost-prefix rule for composite indexes, the write cost in Segment 9, and the when-to-index and when-not-to checklist in Segment 12. https://www.designgurus.io/blog/database-indexing
- **GeeksforGeeks, "Indexing in Databases":** the definitions of clustered and non-clustered indexes, and the trade-offs (faster reads, extra storage, slower writes). https://www.geeksforgeeks.org/dbms/indexing-in-databases-set-1/
- **Reddit, r/SQL "What's database indexing?":** Reddit blocks automated access, so I couldn't read it, and nothing in the kit relies on it.
- **Your two X searches:** used for the formats in section 7. The ORDER BY and LIMIT point in Segment 12 was prompted by Rohan's (@proxy_vector) reply, rewritten in your words and checked against the PostgreSQL docs below.

**2. Corrections to the sources, so you don't repeat them on camera**
- **Design Gurus says bitmap indexes are "strong in PostgreSQL."** That's misleading. PostgreSQL doesn't let you create a bitmap index. It builds bitmaps temporarily while running a query (a "bitmap index scan"). The script just says bitmap is for columns with only a few values, which is true everywhere.
- **Design Gurus gives very specific numbers** like "27 comparisons" and "a 3.7-million-fold reduction" at 100 million rows. The maths works, but the script uses the simpler "about twenty steps for a million rows," since two to the power of twenty is just over a million.
- **Design Gurus suggests skipping indexes on tables under about 1,000 rows.** That's a rough rule of thumb, so the script just says "when the table is small."
- **The bob/dave/alice walkthrough is a simplification,** which is fine for the video. A real B-tree compares against several values at each level, so it needs even fewer levels than the walkthrough suggests. The script says "a few levels," which is accurate.

**3. Page sizes (for the tweet, verified)**
- PostgreSQL's default block size is 8 KB: https://www.postgresql.org/docs/current/storage-page-layout.html
- MySQL InnoDB's default page size is 16 KB (innodb_page_size): https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_page_size

**4. How indexes work, EXPLAIN, ORDER BY, and the mistakes**
- PostgreSQL, Indexes: https://www.postgresql.org/docs/current/indexes.html
- PostgreSQL, Using EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
- PostgreSQL, Indexes and ORDER BY (an index can return rows in order, which is especially useful with LIMIT): https://www.postgresql.org/docs/current/indexes-ordering.html
- MySQL, EXPLAIN output (type ALL = full scan): https://dev.mysql.com/doc/refman/8.0/en/explain-output.html
- Composite index order: https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html
- Expression indexes as the fix for LOWER(): https://www.postgresql.org/docs/current/indexes-expressional.html. MySQL supports functional indexes from 8.0.13.
- Leading-wildcard LIKE: covered in *Use The Index, Luke*: https://use-the-index-luke.com/
- The script keeps "usually can't" and "generally can't," since some databases have partial workarounds.

**5. Index types and clustered indexes**
- Hash indexes: PostgreSQL supports them and they've been crash-safe since version 10, but a B-tree is the usual choice. https://www.postgresql.org/docs/current/hash-index.html
- Partial indexes: PostgreSQL yes, MySQL no. https://www.postgresql.org/docs/current/indexes-partial.html
- Clustered index: in MySQL InnoDB, the table is stored in primary key order. PostgreSQL doesn't keep tables sorted, though it has a one-time CLUSTER command. https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html

**6. Foreign keys: MySQL vs PostgreSQL (verified)**
- MySQL InnoDB requires an index on foreign key columns and creates one if none exists: https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
- PostgreSQL does not automatically index the referencing column: https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK

**7. Laravel**
- `$table->index()`, `$table->unique()` and composite indexes: https://laravel.com/docs/migrations#indexes

---

## NOTES

- **The phone book now does two jobs.** It explains composite column order (Segment 7) and clustered indexes (Segment 8). The emails explain how the search works (Segment 4).
- **Thirteen segments, twenty-two clips, seven shorts.** The main short and additional shorts are recorded separately, so they're unchanged.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later. That reply is also where the conversation happens.
- **Cross-links:** your API request video (which says the database is often the slowest part), the API series, and the reading method video.

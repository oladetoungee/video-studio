# Developing Software for Impossible Edge Cases: Content Kit
**Version 3, built on your 29 October read-through. Your read-through is the script. I only fixed voice-to-text, your self-corrections and the facts you had slightly off, and I swapped the bookstore for the online shop everywhere.**
**Every incident was checked again on the original write-up or a named news source, as of 29 October 2026, and every person whose story you tell is named on camera.**
**Every segment opens with its own topic, so any segment can be cut into a clip.**

**WHAT CAME FROM ME, NOT YOU (check before you record)**
These are my guesses at what you meant, plus everything I wrote that wasn't in your read-through.
1. Segment 1. "I promise you with everything that I have and I hope someone" became "with everything that I have and I own, someone", because "and I own" is how your original tweet said it. If you meant something else, change it back.
2. Segment 4. Your Starbucks numbers were off. Egor Homakov bought three gift cards at five dollars each, so fifteen dollars in total, and after the double transfer they had twenty dollars between them. The script now says fifteen and twenty. The on-screen card with his name, his post's title and the year 2015 is mine.
3. Segment 4. The race condition fix. You read only the result lines, so the code (an UPDATE that takes one from the stock only if the stock is more than zero) and a one-line on-screen card that says what it does are on screen only. You don't read either of them.
4. Segment 3. The idempotency key code is on screen only, and you don't read it. "So a retried request doesn't necessarily a second payment" became "So a retried request doesn't create a second payment." I dropped "necessarily", because Stripe says a retry with the same key won't perform the same operation twice.
5. Segment 5. "In 2016, the BBC wrote" stays as you said it. The writer's name (Chris Baraniuk) is on the on-screen card.
6. Segment 6. "A story that I had been told at a conference" became "a story that was told at a conference called DEF CON in 2019, where a security researcher called Joseph Tartaro...". I'm guessing you weren't at DEF CON yourself, and this credits him by name. "Over 12,000 tickets" became "over twelve thousand dollars in fines", because the reports give a dollar amount, not a number of tickets.
7. Segment 7. You said "the 29th of February 2019". It's 2012 (the outage) giving 2013 (the date that doesn't exist). "Microsoft's cloud window Azor" is "Microsoft's cloud, Windows Azure", its name in 2012.
8. Segment 8. The on-screen card and its one-line tip (schedule in UTC) are mine. You don't say the tip.
9. Segment 9. Your fix line was "normalize the text before it saves". That keeps the same name stored the same way, but it doesn't fix the length check on its own, so the line now says both parts in simple words. The sentence "some functions count bytes, not letters, like strlen in PHP, for example" is the wording you asked for. All the counts were run in PHP 8.3, Python and Node, and the on-screen code shows them.
10. Segment 10. Hyrum's **[say: HY-rum's]**. The line naming Hyrum Wright and Google is mine. The law is now in its exact words from hyrumslaw.com, so it reads "it does not matter" instead of "it doesn't matter". "We didn't use that" became "We didn't choose that", and "if we on our hand added an index" became "if we, on our end, add an index". Those are guesses.
11. Segment 10. "You can't undo every single one" became "You can't handle every single one". That's a guess too.
12. The retention beat markers, every on-screen card and code block, the segment titles, and everything after the script (titles, thumbnail, description, shorts, clips, captions, X, comments, carousel, essay and references).

---

## TAG POOL (78 tags, every tag used anywhere in this kit, deduplicated)

edge cases, edge cases in software, software edge cases, why bugs happen in production, production bugs, real software bugs, race condition, race conditions explained, idempotency, idempotency key, duplicate orders, double submit, sql injection, names that break computers, jennifer null, null license plate, sql null, leap year bug, leap day bug, azure outage 2012, time zone bugs, daylight saving time bug, unicode bugs, strlen vs mb_strlen, unicode normalization, yoruba names unicode, hyrums law, api design, backend development, web development, software engineering, programming, gbemisola oladetoun, withgbemi, null value bug, droogie def con, joseph tartaro, starbucks race condition, egor homakov, concurrency bug, idempotency explained, stripe idempotency key, date bugs, cron job dst, scheduled task runs twice, impossible bug, developer life, happy path, real users, user behavior, developer humor, duplicate submission, disable button after click, duplicate form submission, network retry, what is idempotent, atomic update, race condition example, gift card bug, overselling stock, race condition fix, atomic update sql, last item in stock, name validation, apostrophe in name sql, prepared statements, query bindings, null surname, daylight saving time, clocks change estonia, string length bytes, breaking changes, hyrum wright, api breaking changes, sql order by, shipping software, developer mindset, edge case testing

## HASHTAG POOL (35 hashtags, every hashtag used anywhere in this kit)

#Shorts #softwareengineering #webdev #coding #programming #developer #backend #debugging #learntocode #bugs #techtok #database #sql #funfacts #cybersecurity #security #api #payments #ecommerce #bestpractices #cloud #azure #devops #unicode #php #naija #timezones #estonia #devtok #ux #javascript #frontend #forms #systemdesign #webdevelopment

---

## HOW THIS KIT IS BUILT

The script follows your read-through in your order. It opens on your tweet lines about the craziest edge case, then real users who don't follow the path you built, then duplicate submissions and idempotency keys, race conditions (the Starbucks gift card bug and the last item in stock), names (O'Brien and Jennifer Null), null (the NULL license plate), leap years (the 2012 Azure outage), time zones and daylight saving time in Tallinn, Unicode (Adébáyọ̀), and Hyrum's law. It ends inside Hyrum's law with your own closing about not being able to catch every edge case. The old "how to protect your app" segment, the maths segment, the Hawaii surname, SQL null comparisons, the JavaScript date code, emoji and utf8mb4 are gone, because you didn't read them. The comment question lives in the description and the pinned comment only. The pronunciation note for Hyrum is in bold brackets right after the word, so it shows on the teleprompter.

**QUESTIONS FOR YOU**
All story points are filled or written generally. No open questions.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** ten segments, in your order. Each one names its own topic in its first line or two, so a viewer who lands there (or a clip cut from it) understands it. Code stays on screen while you talk, and you never read code out. About 1,550 spoken words, so roughly 10 to 11 minutes at your pace.

---

**[SEGMENT 1: OPEN]**

If you're a software developer, I want you to think of the craziest edge case in the world.

The one thing where you thought, like, oh yeah, there is no way your user is going to navigate and navigate and navigate and end up in that kind of situation.

I promise you, with everything that I have and I own, someone is going to report an issue, and it's going to be exactly that edge case that you never thought would happen.

It doesn't even have to be, like, something big.

You don't even need to have a lot of users for edge cases that you didn't, you know, write for, to exist.

---

**[SEGMENT 2: REAL USERS DON'T FOLLOW THE PATH YOU BUILT]**

Usually when we build, you create a path, you know, and you build for that path, right?

The user fills a form, they click a button, and they wait.

But I promise you, it sounds so straightforward, but real users don't always do that.

Real users don't always just fill the form and click the button and wait.

**[~1:00 BEAT: the list of what real users do. Say it fast, like you've seen every one of them]**

Real users double click. They be like ta-ta-ta-ta-ta-ta-ta. They click a lot.

Real users open two different tabs.

Real users' network drops halfway.

Real users leave the page open for two hours and then come back.

And they are not doing anything strange. They are just being users.

---

**[SEGMENT 3: DUPLICATE SUBMISSIONS AND IDEMPOTENCY KEYS]**

One of the most common edge cases in production is the duplicate submission.

If, for example, in an online shop, someone clicks "Place order," and maybe the page feels a little slow, they click it again.

Now our server gets two requests, and it creates two orders.

And if we charge on each order, we can charge the user twice.

It doesn't even need a double click.

The phone can lose network after the request was sent, and the app retries.

Or they refresh the page, the browser asks them if they want to send the form again, and they say yes.

Disabling the button after the first click helps, but it only covers the double click part.

It does nothing for, like, a retry or a second tab.

The fix that is common for this is using an idempotency key.

Idempotent is a big word for a simple idea.

Basically, it puts things in place such that doing something twice has the same result as doing it just once.

**[CODE ON SCREEN, you don't read it]**
```js
// made once, when the checkout page loads
const key = crypto.randomUUID();

fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': key,
  },
  body: JSON.stringify({ product_id: 42 }),
});
```
```sql
-- the server saves the key with the order, and the key must be unique
ALTER TABLE orders ADD COLUMN idempotency_key VARCHAR(255) UNIQUE;
-- same key again? send back the order you already made
```

Stripe's API uses the same idea, with an Idempotency-Key header.

So a retried request doesn't create a second payment.

---

**[SEGMENT 4: RACE CONDITIONS]**

Another common edge case in production is a race condition.

A race condition is when two things happen at the same time, and your code assumed that they would happen one after the other.

There was this researcher called Egor Homakov that found one of these race conditions in Starbucks gift cards.

**[ON SCREEN: Egor Homakov, "Hacking Starbucks for unlimited coffee" (2015). Link in the description]**

So he had gift cards worth fifteen dollars in total.

Now he sent the same balance transfer twice, at the same time, from two different sessions.

**[~3:00 BEAT: the payoff. Pause before "twenty dollars"]**

Both transfers went through, and his cards ended up with twenty dollars between them.

So each request checked the balance, saw that there was enough money, and moved it. Neither request waited for the other one to finish.

He reported it, and Starbucks fixed it. The link is right in the description box.

The same thing can happen in your app.

For example, in our online shop, say we have one item left in stock, and two people click buy in the exact same second.

Both requests check the stock, both see one item left, both create an order.

Now we have sold an item that we do not have.

What do we do about this?

**[CODE ON SCREEN, you don't read it]**
```sql
-- take one from the stock, only if there's one left, in one step
UPDATE products
SET stock = stock - 1
WHERE id = 42 AND stock > 0;

-- 1 row updated: this buyer got it
-- 0 rows updated: sold out
```

**[ON SCREEN: the database takes one from the stock only if the stock is more than zero, all in one step]**

So if the two requests arrive at the same time, only one of them can take the last item.

The other one gets zero rows updated, and that's how you know it's sold out.

---

**[SEGMENT 5: NAMES THAT BREAK YOUR APP]**

A lot of edge cases in production also happen with names, because most of us build the name field picturing names like our own.

Take the name O'Brien, for example.

That apostrophe is the same character that starts and ends a piece of text in SQL.

So if your code glues the name straight into the query, the apostrophe ends the text early, and the query breaks.

**[CODE ON SCREEN, you don't read it]**
```php
// breaks on O'Brien
$db->query("SELECT * FROM customers WHERE last_name = '$name'");

// safe: the name is sent separately, as a value
$stmt = $db->prepare('SELECT * FROM customers WHERE last_name = ?');
$stmt->execute([$name]);
```

And if an apostrophe can break your query by accident, it means that someone can type something after the apostrophe on purpose, and that would be SQL injection.

In 2016, the BBC wrote about a woman called Jennifer Null.

**[ON SCREEN: "The names that break computer systems", Chris Baraniuk, BBC Future (2016)]**

When Jennifer Null tries to buy a plane ticket, most websites tell her that she has left the surname field blank.

Her surname is Null.

The website sees the name Null and treats it as empty.

---

**[SEGMENT 6: NULL VALUES AND THE NULL LICENSE PLATE]**

So null, apart from even being a name situation, is also an edge case that catches almost everybody, because null means no value.

There was also another story, told at a conference called DEF CON in 2019, where a security researcher called Joseph Tartaro got a personalized license plate in California that said NULL.

**[ON SCREEN: Joseph Tartaro ("Droogie"), DEF CON 27, August 2019]**

Then he started getting parking tickets, over twelve thousand dollars in fines, that were not his tickets.

They were tickets where no plate number had been recorded, and in the system that processes the tickets, those were linked to a plate called NULL.

So all of them landed on his plate, right?

So this is also another situation.

---

**[SEGMENT 7: LEAP YEAR BUGS]**

**[~6:00 BEAT: a leap day that took down part of a real cloud]**

Another thing that can cause very interesting edge cases in production is leap years.

Leap years are an edge case that only shows up once every four years, which is exactly why they get missed.

On the 29th of February 2012, Microsoft's cloud, Windows Azure, had an outage because of a leap day bug.

Part of their system made security certificates that were valid for one year.

It worked out the end dates by taking today's date and adding one to the year.

So on the 29th of February 2012, that gave the 29th of February 2013, and that day doesn't exist.

**[ON SCREEN: 29 Feb 2012 + 1 year = 29 Feb 2013 (that date doesn't exist)]**

So creating the certificate failed, and part of Azure went down with it.

So yeah, this is something to also think about, leap year bugs.

---

**[SEGMENT 8: TIME ZONES AND DAYLIGHT SAVING TIME]**

Another edge case that causes issues is time zones and daylight saving time.

They are also an edge case that a lot of people do not think about.

In Estonia, where I live, the clock changes twice a year.

On the 29th of March 2026, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m.

So 3:30 that morning never happened.

The same way, on the 25th of October 2026, the clocks went from 4 a.m. back to 3 a.m.

So 3:30 happened twice.

**[ON SCREEN: Tallinn, 29 March 2026: 02:59, then 04:00. 25 October 2026: 03:00 to 03:59 happens twice. Tip: schedule in UTC, which never changes its clocks]**

Now imagine our online shop sends a daily sales report at 3:30 a.m. Tallinn time.

One day, it just wouldn't run.

And one day, yeah, it can run twice.

So these are things to consider.

---

**[SEGMENT 9: UNICODE BUGS]**

Another common edge case is Unicode bugs.

Unicode is the edge case that breaks names with accents and tone marks, and a lot of Nigerian names, for example, are like that.

So take Adébáyọ̀, for example.

In Adébáyọ̀, you can see seven letters.

But some functions count bytes, not letters, like strlen in PHP, for example.

It says thirteen, because letters like é and ọ̀ take more than one byte each.

**[CODE ON SCREEN, you don't read it]**
```php
// save the same name the same way every time
$name = Normalizer::normalize('Adébáyọ̀', Normalizer::FORM_C);

strlen($name);          // 13 (bytes)
mb_strlen($name);       // 8  (characters: ọ̀ is ọ plus a tone mark)
grapheme_strlen($name); // 7  (the letters you see)
```

So if you check "the name must be at most 20 characters" with the wrong function, you can reject real names.

The fix for this, usually, is to count with a function that counts characters, like mb_strlen in PHP.

And to normalize the text before it saves, so the same name is always stored the same way.

**[ON SCREEN: é can be saved as one character, or as e plus a separate accent. They look the same, but your code sees two different names]**

---

**[SEGMENT 10: HYRUM'S LAW]**

Hyrum's **[say: HY-rum's]** law is about a different kind of edge case.

It is the behavior in your app that you never actually promised.

It's named after Hyrum Wright, who noticed it when he was a software engineer at Google.

**[~9:00 BEAT, optional: "And this one is the edge case you create without writing any bug at all."]**

Hyrum's law states, "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody."

**[ON SCREEN: the quote, with "Hyrum Wright, hyrumslaw.com"]**

So let's say our online shop API happens to return products in the order that they were added.

We didn't choose that. The query just happened to come back that way.

Now, if someone is using our API to show products in their app, and they are showing the newest product by taking the last product in the list, then if we, on our end, add an index, or we change the query, the order changes and their app breaks.

To them, we've broken something.

To us, we didn't break anything, because we never promised that behavior.

But because they used to get that behavior, they now think that we broke something.

So this is also something that is kind of like an edge case that you also have to consider.

**[CLOSING]**

To be honest, there's so much more.

You can't handle every single one, right?

You cannot protect your app from every single edge case, because you cannot even predict every single one.

If you want to wait till you predict every single edge case, you probably wouldn't ship anything.

You can catch a few of them with some of the ones I talked about in this video, but you probably wouldn't be able to catch all of them.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("edge cases", "race condition", "idempotency" and "production bugs" are all phrases developers type into YouTube)
> 1. Edge Cases That Break Real Apps (With Real Examples) — 52
> 2. Software Edge Cases Every Developer Should Know — 47
> 3. Why Bugs Happen in Production (Real Examples) — 45
> 4. Race Conditions Explained With a Real Starbucks Bug — 51
> 5. What Is an Edge Case in Software? 8 Real Examples — 49
> 6. Time Zone and Daylight Saving Bugs Explained — 44
> 7. Edge Cases in Software Development, Explained Simply — 52

**CLICK-LED**
> 8. The Edge Case You Think Is Impossible — 37
> 9. The NULL License Plate That Got $12,000 in Fines — 48
> 10. The Leap Day Bug That Took Down Part of Azure — 45
> 11. Your Users Will Find the Bug You Said Was Impossible — 52
> 12. 8 Edge Cases That Break Real Apps — 33

**YOUR PICK (use this): "Developing Software for Impossible Edge Cases" (45 chars).** The options below stay for thumbnails, alt titles and A/B tests.

**RECOMMENDED: 1.** "Edge cases" is the keyword, and it's the first two words. "Break real apps" promises real incidents, and the video delivers them (Starbucks, Jennifer Null, the NULL plate, Azure). "With real examples" tells a searcher this isn't a theory lecture. It's short enough not to cut off on mobile. 12 is a strong backup, because the number is exact (duplicate submissions, race conditions, names, null, leap years, time zones, Unicode and Hyrum's law). 9 is the most clickable, but it's one story out of ten segments, so it works better as a Short or a tweet than as the main title.

**Thumbnail pairing:** the title already says "edge cases", so the thumbnail shouldn't. Use the NULL license plate as the picture (see 2b). The title tells them it's about bugs, and the plate makes them curious which bug.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "The Bugs You Said Were Impossible (Real Examples)". Every story in the video is a bug somebody would have called impossible. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot, looking at the plate with a "seriously?" face. On the left, a big California-style license plate that reads NULL, with a pile of parking tickets tucked under it. No other words. Squint at it, and if you can still read NULL and see the tickets, it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** a calendar page showing "29 FEB" with a red error icon on it, your face on the right.

**Recording notes:**
- Shoot two takes of Segment 1, one at your normal pace and one a little slower, and pick the stronger one in the edit. Your tweet lines are the hook, so say them with the same certainty you wrote them.
- You never read code. Every code block is on screen while you keep talking.
- Hyrum's has a pronunciation note in bold brackets. It's for you, so don't read it out.
- Say Adébáyọ̀ the way you'd normally say it. The on-screen code shows the spelling.
- Read the Hyrum's law quote as a quote, with a tiny pause before and after, so viewers hear they're his words.
- The closing doesn't refer back to anything specific, so the edit can end cleanly on your last line.
- About 1,550 spoken words, so roughly 10 to 11 minutes at your pace.

**Retention beats (marked in the script):**
- ~1:00, Segment 2, the fast list of what real users actually do.
- ~3:00, Segment 4, the Starbucks payoff (fifteen dollars became twenty).
- ~6:00, the start of Segment 7, the leap day that took down part of Azure.
- ~9:00, Segment 10, the optional line before the Hyrum's law quote.

**After publishing:**
- Post the X image post as the video goes live, and send the link to a few developer friends who'll watch the whole thing.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. Wherever the biggest drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> Think of the craziest edge case in your app, the one thing you're sure your user would never end up in. Someone is going to report it. In this video I go through the edge cases that break real apps, with the real stories behind them.
>
> We start with real users, who double click, open two tabs and lose their network halfway. Then duplicate submissions and idempotency keys, race conditions (the Starbucks gift card bug and the last item in stock), names that break your app (O'Brien and Jennifer Null), the NULL license plate, the leap day bug that took down part of Azure in 2012, daylight saving time in Tallinn, Unicode and the name Adébáyọ̀, and Hyrum's law.
>
> What's the craziest edge case anyone has ever reported to you? Tell me in the comments.
>
> CHAPTERS (add times after editing)
> 0:00 The edge case you think is impossible
> Real users don't follow the path you built
> Duplicate submissions and idempotency keys
> Race conditions (the Starbucks bug)
> Names that break your app
> The NULL license plate
> Leap year bugs (the Azure outage)
> Time zones and daylight saving time
> Unicode bugs
> Hyrum's law
>
> SOURCES AND FURTHER READING
> Stripe docs, Idempotent requests: https://docs.stripe.com/api/idempotent_requests
> Egor Homakov, Hacking Starbucks for unlimited coffee (2015): https://sakurity.com/blog/2015/05/21/starbucks.html
> Chris Baraniuk, The names that break computer systems, BBC Future (2016): https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems
> Joseph Tartaro (Droogie), DEF CON 27 talk listing (2019): https://ioactive.com/event/def-con-27-joseph-tartaro
> The Drive, the NULL license plate (2019): https://www.thedrive.com/news/29388/california-mans-plot-to-avoid-tickets-with-null-vanity-plate-nets-him-12k-in-fines
> Microsoft, Summary of Windows Azure Service Disruption on Feb 29th, 2012: https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/
> EU summer-time rules (Directive 2000/84/EC): https://eur-lex.europa.eu/eli/dir/2000/84/oj
> PHP manual, mb_strlen: https://www.php.net/manual/en/function.mb-strlen.php
> PHP manual, Normalizer: https://www.php.net/manual/en/class.normalizer.php
> Hyrum Wright, Hyrum's Law: https://www.hyrumslaw.com/
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (487 characters, under YouTube's 500 limit):**

edge cases, edge cases in software, software edge cases, why bugs happen in production, production bugs, real software bugs, race condition, race conditions explained, idempotency, idempotency key, duplicate orders, double submit, sql injection, names that break computers, jennifer null, null license plate, sql null, leap year bug, leap day bug, azure outage 2012, time zone bugs, daylight saving time bug, unicode bugs, strlen vs mb_strlen, unicode normalization, yoruba names unicode

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

If you're a software developer, think of the craziest edge case in the world.

The one thing where you thought, there is no way my user ends up there.

I promise you, someone is going to report it.

**[REAL USERS]**

Real users double click. They open two tabs. Their network drops halfway. They're not doing anything strange, they're just being users.

**[DUPLICATES]**

Someone clicks "Place order," the page feels slow, they click again, and now you have two orders and maybe two charges.

An idempotency key makes doing it twice have the same result as doing it once.

**[RACE CONDITIONS]**

Two people click buy on the last item in the same second. Both see one left, and both get an order.

**[CODE ON SCREEN]**
```sql
UPDATE products SET stock = stock - 1
WHERE id = 42 AND stock > 0;
-- 0 rows updated: sold out
```

Take one from the stock only if there's one left, in one step, and only one of them gets it.

**[NAMES AND NULL]**

The apostrophe in O'Brien can break a SQL query. Websites tell Jennifer Null her surname field is blank. And a man with a NULL license plate got over twelve thousand dollars in fines that weren't his.

**[DATES]**

On leap day 2012, adding one to the year gave the 29th of February 2013, and part of Azure went down. And in Tallinn this year, 3:30 a.m. never happened in March and happened twice in October.

**[UNICODE]**

Adébáyọ̀ has seven letters, but strlen in PHP says thirteen, because it counts bytes.

**[HYRUM'S LAW]**

And with enough users, someone will depend on behavior you never promised.

**[LAND]**

You can't predict every edge case. You can catch a few of them.

**Caption:** the edge case you think is impossible will get reported. here are the ones that break real apps, with the real stories behind them
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #webdev #coding #programming #developer #backend #debugging #learntocode #bugs #techtok
**Tags:** edge cases in software, why bugs happen in production, real software bugs, production bugs

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: The NULL license plate (25-35 sec)

In 2019, at DEF CON, a security researcher called Joseph Tartaro told this story.

He got a personalized license plate in California that said NULL.

Then the parking tickets started coming. Over twelve thousand dollars in fines, and they were not his tickets.

They were tickets where no plate number had been recorded. And in the system that processes them, those tickets were linked to a plate called NULL.

So all of them landed on his plate.

**Caption:** a security researcher got a license plate that said NULL, and every ticket with no plate number landed on him
full video: [LINK]
**Hashtags:** #Shorts #programming #coding #softwareengineering #database #sql #developer #techtok #funfacts #bugs #cybersecurity
**Tags:** null license plate, null value bug, sql null, droogie def con, joseph tartaro

---

### SHORT 3: The Starbucks race condition (25-35 sec)

A race condition is when two things happen at the same time, and your code assumed they would happen one after the other.

In 2015, a researcher called Egor Homakov had Starbucks gift cards worth fifteen dollars in total.

He sent the same balance transfer twice, at the same time, from two different sessions.

Both went through, and his cards ended up with twenty dollars between them.

Each request checked the balance, saw there was enough money, and moved it. Neither one waited for the other to finish.

**Caption:** how sending the same request twice at the same moment turned $15 of starbucks gift cards into $20
full video: [LINK]
**Hashtags:** #Shorts #security #backend #coding #programming #developer #softwareengineering #webdev #cybersecurity #techtok
**Tags:** race condition, race conditions explained, starbucks race condition, egor homakov, concurrency bug

---

### SHORT 4: Double click, double charge (25-35 sec)

Someone clicks "Place order," the page feels a little slow, so they click it again.

Now your server gets two requests, and it creates two orders. And if you charge on each order, you charge them twice.

Disabling the button helps, but it only covers the double click. It does nothing for a retry when the network drops, or a second tab.

The common fix is an idempotency key. Idempotent is a big word for a simple idea. Doing something twice has the same result as doing it once.

Stripe's API uses the same idea, so a retried request doesn't create a second payment.

**Caption:** disabling the button only stops the double click. an idempotency key covers the retry and the second tab too
full video: [LINK]
**Hashtags:** #Shorts #backend #api #webdev #coding #programming #developer #payments #ecommerce #bestpractices
**Tags:** idempotency key, duplicate orders, double submit, idempotency explained, stripe idempotency key

---

### SHORT 5: The leap day that broke Azure (20-30 sec)

On the 29th of February 2012, Microsoft's cloud, Windows Azure, had an outage because of a leap day bug.

Part of their system made security certificates that were valid for one year.

It worked out the end date by taking today's date and adding one to the year.

That gave the 29th of February 2013. That day doesn't exist.

So creating the certificate failed, and part of Azure went down with it.

**Caption:** adding one to the year sounds safe until the date is the 29th of february
full video: [LINK]
**Hashtags:** #Shorts #programming #coding #developer #softwareengineering #cloud #azure #bugs #techtok #devops
**Tags:** leap year bug, leap day bug, azure outage 2012, date bugs

---

### SHORT 6: How long is Adébáyọ̀? (20-30 sec)

The name Adébáyọ̀ has seven letters you can see.

But some functions count bytes, not letters, like strlen in PHP. It says thirteen, because é and ọ̀ take more than one byte each.

So if your name field checks "at most 20 characters" with the wrong function, you can reject real names.

Count with a function that counts characters, like mb_strlen. And normalize the text before it saves, so the same name is always stored the same way.

**Caption:** a seven-letter yoruba name, and php's strlen says thirteen
full video: [LINK]
**Hashtags:** #Shorts #unicode #php #webdev #coding #programming #developer #naija #learntocode #backend
**Tags:** unicode bugs, strlen vs mb_strlen, unicode normalization, yoruba names unicode

---

### SHORT 7: The 3:30 that never happened (20-30 sec)

In Estonia, where I live, the clock changes twice a year.

On the 29th of March 2026, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m. So 3:30 that morning never happened.

On the 25th of October, they went from 4 a.m. back to 3 a.m. So 3:30 happened twice.

So if your app sends a report at 3:30 a.m. Tallinn time, one day it won't run, and one day it can run twice.

**Caption:** if your app schedules anything in a time zone that changes its clocks, one night a year it can run twice
full video: [LINK]
**Hashtags:** #Shorts #webdev #backend #coding #programming #developer #timezones #devops #estonia #techtok
**Tags:** daylight saving time bug, time zone bugs, cron job dst, scheduled task runs twice

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: the edge case you said was impossible
**Caption:** think of the craziest edge case in your app, the one you were sure no user would ever reach. someone is going to report it
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #coding #programming #developer #webdev #devtok #techtok #bugs
**Tags:** edge cases in software, impossible bug, production bugs, developer life

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** real users vs the path you built
**Caption:** we build for one path. fill the form, click the button, wait. real users don't always do that
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #coding #programming #developer #webdev #ux #bugs #learntocode
**Tags:** happy path, edge cases in software, why bugs happen in production, real users

---

### CLIP 3 — subset of Segment 2
**Starts:** "Real users double click..." **Ends:** "...They are just being users."
**Overlay:** POV: real users using your app
**Caption:** they double click, open two tabs, lose network halfway and come back two hours later. they're just being users
full video: [LINK]
**Hashtags:** #Shorts #webdev #ux #coding #programming #developer #devtok #techtok #bugs
**Tags:** real users, user behavior, edge cases, developer humor

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** POV: your user double clicks "place order"
**Caption:** a double click, a network retry or a resent form can all create two orders, and maybe two charges. this is what an idempotency key is for
full video: [LINK]
**Hashtags:** #Shorts #backend #api #javascript #webdev #coding #developer #payments #ecommerce #bestpractices
**Tags:** idempotency key, duplicate orders, double submit, duplicate submission

---

### CLIP 5 — subset of Segment 3
**Starts:** "It doesn't even need a double click..." **Ends:** "...It does nothing for, like, a retry or a second tab."
**Overlay:** is disabling the button enough?
**Caption:** disabling the button after the first click helps with double clicks. it doesn't help when the app retries or someone uses a second tab
full video: [LINK]
**Hashtags:** #Shorts #webdev #frontend #backend #coding #developer #ux #forms #bestpractices
**Tags:** disable button after click, double submit, duplicate form submission, network retry

---

### CLIP 6 — subset of Segment 3
**Starts:** "The fix that is common for this is using an idempotency key..." **Ends:** "...So a retried request doesn't create a second payment."
**Overlay:** what is an idempotency key?
**Caption:** idempotent is a big word for a simple idea. doing something twice has the same result as doing it once, and stripe's api uses it for payments
full video: [LINK]
**Hashtags:** #Shorts #api #backend #payments #coding #developer #webdev #systemdesign #learntocode
**Tags:** idempotency explained, idempotency key, stripe idempotency key, what is idempotent

---

### CLIP 7 — Segment 4 (whole)
**Overlay:** what is a race condition?
**Caption:** two requests at the same moment can both pass your check. that's how $15 of starbucks gift cards became $20, and how a shop sells its last item twice
full video: [LINK]
**Hashtags:** #Shorts #backend #security #database #sql #coding #programming #developer #softwareengineering
**Tags:** race condition, race conditions explained, concurrency bug, atomic update

---

### CLIP 8 — subset of Segment 4
**Starts:** "There was this researcher called Egor Homakov..." **Ends:** "...The link is right in the description box."
**Overlay:** the Starbucks gift card bug
**Caption:** he sent the same gift card transfer twice at the same moment, both went through, and $15 became $20
full video: [LINK]
**Hashtags:** #Shorts #security #cybersecurity #coding #programming #developer #techtok #bugs #backend
**Tags:** starbucks race condition, race condition example, egor homakov, gift card bug

---

### CLIP 9 — subset of Segment 4
**Starts:** "For example, in our online shop, say we have one item left in stock..." **Ends:** "...and that's how you know it's sold out."
**Overlay:** POV: two people buy the last item at the same time
**Caption:** both requests see one item left and both create an order. an update that only takes stock when there's some left lets just one of them through
full video: [LINK]
**Hashtags:** #Shorts #sql #database #backend #ecommerce #coding #developer #programming #webdev
**Tags:** overselling stock, race condition fix, atomic update sql, last item in stock

---

### CLIP 10 — Segment 5 (whole)
**Overlay:** names that break your app
**Caption:** an apostrophe can break your sql query, and a woman called jennifer null gets told her surname field is blank
full video: [LINK]
**Hashtags:** #Shorts #webdev #backend #sql #coding #programming #developer #ux #forms
**Tags:** names that break computers, name validation, sql injection, jennifer null

---

### CLIP 11 — subset of Segment 5
**Starts:** "Take the name O'Brien, for example..." **Ends:** "...and that would be SQL injection."
**Overlay:** why O'Brien breaks your SQL query
**Caption:** the apostrophe ends the text early when your code glues a name into a query. that same gap is how sql injection works
full video: [LINK]
**Hashtags:** #Shorts #sql #security #php #backend #coding #developer #webdev #cybersecurity
**Tags:** sql injection, apostrophe in name sql, prepared statements, query bindings

---

### CLIP 12 — subset of Segment 5
**Starts:** "In 2016, the BBC wrote about a woman called Jennifer Null..." **Ends:** "...The website sees the name Null and treats it as empty."
**Overlay:** the woman whose surname is Null
**Caption:** when jennifer null tries to buy a plane ticket, most websites tell her she left the surname field blank
full video: [LINK]
**Hashtags:** #Shorts #programming #coding #webdev #developer #ux #techtok #funfacts #bugs
**Tags:** jennifer null, names that break computers, null surname, null value bug

---

### CLIP 13 — Segment 6 (whole)
**Overlay:** the man with the NULL license plate
**Caption:** tickets with no plate number got linked to a plate called NULL, so every one of them landed on his
full video: [LINK]
**Hashtags:** #Shorts #programming #coding #database #developer #techtok #funfacts #bugs #security
**Tags:** null license plate, droogie def con, joseph tartaro, null value bug

---

### CLIP 14 — Segment 7 (whole)
**Overlay:** the leap day bug that broke Azure
**Caption:** a system added one to the year on the 29th of february 2012, got a date that doesn't exist, and part of azure went down
full video: [LINK]
**Hashtags:** #Shorts #programming #cloud #azure #coding #developer #softwareengineering #bugs #devops
**Tags:** leap year bug, leap day bug, azure outage 2012, date bugs

---

### CLIP 15 — Segment 8 (whole)
**Overlay:** time zone and daylight saving bugs
**Caption:** in tallinn, 3:30 a.m. didn't happen on 29 march 2026 and happened twice on 25 october. a daily report at 3:30 can skip a day or run twice
full video: [LINK]
**Hashtags:** #Shorts #backend #devops #coding #developer #webdev #timezones #estonia #programming
**Tags:** daylight saving time bug, time zone bugs, cron job dst, scheduled task runs twice

---

### CLIP 16 — subset of Segment 8
**Starts:** "On the 29th of March 2026, the clocks in Tallinn..." **Ends:** "...So 3:30 happened twice."
**Overlay:** the 3:30 that never happened
**Caption:** when the clocks go forward, 3:30 a.m. never happens. when they go back, it happens twice
full video: [LINK]
**Hashtags:** #Shorts #timezones #estonia #coding #programming #developer #techtok #funfacts #devops
**Tags:** daylight saving time, clocks change estonia, time zone bugs, daylight saving time bug

---

### CLIP 17 — Segment 9 (whole)
**Overlay:** Unicode bugs, explained
**Caption:** a seven-letter yoruba name, thirteen bytes in php's strlen, and the two things that fix a name length check
full video: [LINK]
**Hashtags:** #Shorts #unicode #php #webdev #coding #developer #naija #backend #programming
**Tags:** unicode bugs, strlen vs mb_strlen, unicode normalization, yoruba names unicode

---

### CLIP 18 — subset of Segment 9
**Starts:** "So take Adébáyọ̀, for example..." **Ends:** "...you can reject real names."
**Overlay:** how long is "Adébáyọ̀"?
**Caption:** you can see seven letters. php's strlen says thirteen, because it counts bytes
full video: [LINK]
**Hashtags:** #Shorts #unicode #php #coding #programming #developer #naija #learntocode #webdev
**Tags:** strlen vs mb_strlen, unicode bugs, yoruba names unicode, string length bytes

---

### CLIP 19 — Segment 10 (whole)
**Overlay:** Hyrum's law, explained
**Caption:** with enough users, someone will depend on behavior you never promised. and you can't predict every edge case, so you won't catch all of them
full video: [LINK]
**Hashtags:** #Shorts #api #softwareengineering #backend #coding #programming #developer #systemdesign
**Tags:** hyrums law, api design, breaking changes, hyrum wright

---

### CLIP 20 — subset of Segment 10
**Starts:** "So let's say our online shop API happens to return products..." **Ends:** "...that you also have to consider."
**Overlay:** POV: you add an index and someone else's app breaks
**Caption:** your api returned products in the order they were added. you never promised that, but someone built on it
full video: [LINK]
**Hashtags:** #Shorts #api #backend #database #coding #developer #webdev #systemdesign #softwareengineering
**Tags:** hyrums law, api breaking changes, api design, sql order by

---

### CLIP 21 — subset of Segment 10
**Starts:** "To be honest, there's so much more..." **Ends:** "...you probably wouldn't be able to catch all of them."
**Overlay:** can you catch every edge case?
**Caption:** if you wait till you can predict every single edge case, you probably won't ship anything
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #coding #programming #developer #devtok #techtok #learntocode
**Tags:** edge cases in software, shipping software, developer mindset, edge case testing

---

**Posting order:** 13 first (the NULL plate is the easiest to follow cold), then 8 (Starbucks), then 18 (Adébáyọ̀, for your Nigerian audience), then 4 (the double click), then 16 (the 3:30 that never happened), then 12 (Jennifer Null), then 1.

---

## 6. CAPTIONS

### TikTok caption:
> that edge case you're sure will never happen? someone is going to report it. here are the ones that break real apps, like a license plate that said NULL and a leap day that took down part of azure
**Hashtags:** #softwareengineering #coding #programming #webdev #developer

### Instagram Reel caption:
> If you build software, think of the craziest edge case in your app, the one thing you're sure your user would never end up in. Someone is going to report it.
>
> In the full video I go through the edge cases that break real apps, with the real stories behind them. A researcher turned fifteen dollars of Starbucks gift cards into twenty by sending the same request twice at once. A man whose license plate said NULL got over twelve thousand dollars in fines that weren't his. A leap day took down part of Microsoft Azure in 2012.
>
> Full video on YouTube, link in bio.
>
> #softwareengineering #webdev #coding #programming #developer

### LinkedIn caption:
> Why do the edge cases we call impossible keep getting reported?
>
> Real users don't follow the path we build, because they double click, open a second tab, lose their network halfway and come back to a page they left open two hours ago.
>
> An idempotency key handles the repeats that disabling a button can't, so a retried request gets the same result as the first one instead of a second order or a second charge.
>
> A race condition is the next problem, since two requests that arrive at the same moment can both pass a check, which is how Egor Homakov turned fifteen dollars of Starbucks gift cards into twenty in 2015.
>
> Real data breaks our assumptions too, from an apostrophe in O'Brien to a woman whose surname is Null, a 29th of February that added up to a date that doesn't exist, and a 3:30 a.m. that happened twice in Tallinn this October.
>
> Hyrum's law adds that with enough users, someone will depend even on behaviour we never promised.
>
> None of us can predict every edge case, but each of these is a few lines of code to catch once you know it exists.
>
> Full walkthrough: [LINK]
>
> #softwareengineering #backend #webdevelopment #programming #api

---

## 7. X / TWITTER

**How this section is built.** Same rules as your last kits. Image cheat sheets do far better than text, conversations start when a tweet names one real situation and what happened, quizzes and "can you guess" tweets pull replies, and the link always goes in a reply. Everything is typed lowercase like you, and no tweet uses arrows or fragment lists.

### THE IMAGE POST

**Tweet text:**
> edge cases that break real apps, and what happened when they did

**Image content (one clean card in Canva):**
> **EDGE CASES THAT BREAK REAL APPS**
> **Double submit** · a double click or a retry creates two orders · fix: idempotency key
> **Race condition** · two requests buy the last item at once · fix: UPDATE ... WHERE stock > 0
> **Apostrophes** · O'Brien breaks glued-together SQL · fix: prepared statements
> **Null** · Jennifer Null gets told her surname is blank · fix: never treat the word "null" as empty
> **Leap day** · 29 Feb 2012 + 1 year = a date that doesn't exist · fix: test 29 February
> **Daylight saving** · 3:30 a.m. can happen twice or never · fix: schedule in UTC
> **Unicode** · "Adébáyọ̀" is 7 letters, 13 bytes · fix: mb_strlen and normalize

**Reply:**
> the real story behind each one is in the video: [LINK]

---

### THE TIPS LIST

> edge cases I'd tell any backend dev to test
>
> 1. click "place order" twice, fast
> 2. buy the last item from two tabs at the same second
> 3. sign up as O'Brien
> 4. sign up with the surname Null
> 5. set the date to 29 february
> 6. check the length of Adébáyọ̀

**Reply:** full video on all of these: [LINK]

---

### THE QUIZ

> two people click buy on the last item in stock in the same second. your code checks the stock first, then creates the order.
>
> what happens?
>
> A. one order, one "sold out"
> B. two orders
> C. the database throws an error

**Your reply a few hours later:**
> it's B. both requests check the stock before either one updates it, so both see one item left and both create an order. that's a race condition. if the update itself only takes stock WHERE stock > 0, only one of them gets it

---

### THE "CAN YOU GUESS" TWEET

> in 2012 part of microsoft azure went down on the 29th of february. can you guess what the code was doing with the date?

**Your reply:**
> it made certificates valid for one year by adding one to the year. on 29 feb 2012 that gave 29 feb 2013, a date that doesn't exist, so creating them failed

---

### THE LAUNCH TWEET

> made a video on the edge case you think is impossible. starbucks gift cards, a woman whose surname is Null, a license plate that said NULL, and the 3:30 a.m. that never happened in tallinn

**Reply:** [LINK]

---

### STANDALONE TWEETS

> a security researcher got a license plate that said NULL. tickets with no plate number were linked to NULL in the system, so they all landed on him. over $12,000 in fines that weren't his

> someone double clicks "place order" because the page felt slow, and now they have two orders and maybe two charges. disabling the button doesn't stop a network retry, an idempotency key does

> on 29 march the clocks in tallinn went from 3 a.m. straight to 4. if your app had a report scheduled for 3:30 that night, it just didn't run

> Adébáyọ̀ is seven letters. php's strlen says 13, because it counts bytes. if your name field checks length with strlen, it can reject a real name

> in 2015 a researcher sent the same starbucks gift card transfer twice at the exact same moment. both went through and $15 became $20

> what's the craziest edge case anyone has ever reported to you? I'm collecting them

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what's the craziest edge case anyone has ever reported to you? the one you were sure no user would ever end up in. I want to read them all 👀

### Instagram:
> the NULL plate one still gets me. every ticket with no plate number got linked to NULL, and his plate literally said NULL

### TikTok:
> if your test data doesn't have O'Brien and Adébáyọ̀ in it, please add them today 😭

### LinkedIn:
> The one I'd test first is the double click on "Place order". It takes a minute to try, and if it creates two orders, a retry on a bad network will too.

### X (reply to your own tweet):
> quick check you can do today: search your codebase for sql strings with a variable inside the quotes. if O'Brien can break it, so can someone typing on purpose

### REPLIES TO EXPECT (ready to paste)

**"Just disable the button, problem solved."**
> do that too, it helps with the double click. but it doesn't stop the app retrying when the network drops, or someone placing the same order in a second tab

**"Why not just check the stock first and then update it?"**
> because two requests can both check before either one updates. if the update itself says WHERE stock > 0, the database only lets one of them take the last item

**"Is the NULL plate story real?"**
> yes, it was a security researcher called Joseph Tartaro, who goes by Droogie. he talked about it at DEF CON in 2019, and the source is in the description

**"Use mb_strlen and you get 7."**
> mb_strlen gives 8 for Adébáyọ̀, because the ọ̀ is a letter plus a separate tone mark. it's still fine for a length limit. grapheme_strlen gives you the 7 letters you see

**"Hyrum's law means we can never change anything."**
> you can still change things, you just have to expect someone to notice. being clear about what your API promises makes it a lot less painful

**"You can't test for every edge case."**
> I agree, I say that at the end of the video too. you won't catch all of them, but a few of these take minutes to check

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** The edge case you think is impossible is going to get reported.
**Slide 2:** Real users double click, open two tabs and lose their network halfway.
**Slide 3:** A double click can create two orders, and an idempotency key stops the repeat.
**Slide 4:** In 2015, the same Starbucks gift card transfer sent twice at once turned fifteen dollars into twenty.
**Slide 5:** Two people buying the last item in the same second can both get an order.
**Slide 6:** Most websites tell Jennifer Null that she left her surname field blank.
**Slide 7:** A man whose license plate said NULL got over twelve thousand dollars in fines that weren't his.
**Slide 8:** On the 29th of February 2012, adding one year gave a date that doesn't exist, and part of Azure went down.
**Slide 9:** In Tallinn this year, 3:30 a.m. never happened in March and happened twice in October.
**Slide 10:** Adébáyọ̀ has seven letters, but strlen in PHP says thirteen.

**Carousel caption:**
> edge cases that break real apps, and the real stories behind them. the full video is on YouTube, link in bio.
>
> #softwareengineering #webdev #coding #programming #backend

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> The Edge Case You Think Is Impossible

### Subtitle:
> Real users, real incidents, and why someone will always report the one thing you were sure could never happen.

### SEO Title:
> Edge Cases That Break Real Apps (With Real Examples)

### SEO Description:
> Duplicate orders, race conditions, names like O'Brien and Null, leap day bugs, daylight saving time, Unicode and Hyrum's law, with the real incidents behind each one.

---

If you're a software developer, think of the craziest edge case in the world, the one thing where you thought there was no way your user would navigate and navigate and end up there. I promise you, with everything that I have and I own, someone is going to report it. You don't even need a lot of users for that to happen. When we build, we picture one path. The user fills the form, clicks the button and waits. Real users double click, open two tabs, lose their network halfway, and leave the page open for two hours before they come back. They aren't doing anything strange. They are just being users.

The double click is where a lot of apps meet their first impossible bug. Someone clicks "Place order" in an online shop, the page feels slow, and they click again, so the server gets two requests and creates two orders, and maybe two charges. It doesn't even need a double click, because the phone can lose its network after the request was sent and the app retries. Disabling the button helps with the double click, but it does nothing for a retry or a second tab. The common fix is an idempotency key, which makes doing something twice have the same result as doing it once. Stripe's API uses the same idea with an Idempotency-Key header, so a retried request doesn't create a second payment.

A race condition is when two things happen at the same time, and your code assumed they would happen one after the other. In 2015, the researcher Egor Homakov had Starbucks gift cards worth fifteen dollars in total. He sent the same balance transfer twice, at the same moment, from two sessions, and both went through, so his cards ended up with twenty dollars between them. Each request checked the balance, saw enough money, and moved it without waiting for the other. He reported it, and Starbucks fixed it. An online shop can make the same mistake with the last item in stock, when two buyers both see one left and both get an order. If the update itself only takes one from the stock when the stock is more than zero, only one request can take the last item, and the other gets zero rows updated, which is how you know it's sold out.

Names catch a lot of us, because we build the name field picturing names like our own. The apostrophe in O'Brien is the same character that starts and ends a piece of text in SQL, so code that glues a name straight into a query breaks on it, and anyone can type something after that apostrophe on purpose, which is SQL injection. In 2016, Chris Baraniuk wrote for the BBC about Jennifer Null, who gets told by most websites that she left the surname field blank when she tries to buy a plane ticket. Her surname is Null, and the website treats it as empty.

Null catches almost everybody, because null means no value. In 2019, the security researcher Joseph Tartaro, who goes by Droogie, told DEF CON how he got a personalized license plate in California that said NULL. Then the tickets started coming, over twelve thousand dollars in fines that weren't his. They were tickets where no plate number had been recorded, and the system that processed them linked them to a plate called NULL, so they all landed on him.

Dates are behind some of the best-known outages. On the 29th of February 2012, part of Microsoft's Windows Azure went down because a component worked out a certificate's end date by adding one to the year, which gave the 29th of February 2013, a date that doesn't exist, so creating the certificate failed. Time zones are the other trap. In Estonia, where I live, the clocks change twice a year. On the 29th of March 2026, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m., and on the 25th of October they went from 4 a.m. back to 3 a.m. A daily sales report set for 3:30 a.m. Tallinn time would skip one day and could run twice on another.

Unicode breaks names with accents and tone marks, and a lot of Nigerian names are like that. Adébáyọ̀ has seven letters you can see, but some functions count bytes, not letters, like strlen in PHP, which says thirteen. A check like "the name must be at most 20 characters" done with the wrong function can reject real names. The fix is to count with a function that counts characters, like mb_strlen, and to normalize the text before it saves, so the same name is always stored the same way.

Hyrum's law, named after Hyrum Wright, who noticed it while he was a software engineer at Google, is about a different kind of edge case. It says, "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." If your shop's API happens to return products in the order they were added, someone will take the last product in the list as the newest one, and the day you add an index or change the query, their app breaks. You never promised that order, but they built on it anyway.

To be honest, there's so much more. You can't protect your app from every single edge case, because you can't even predict every single one, and if you wait until you can, you probably won't ship anything. You can catch a few of them, though, and the ones in this piece are a good place to start.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Software Engineering, Programming, Web Development, Software Testing, Backend Development

---

## 11. REFERENCES & SOURCES

**1. Idempotency keys (Segment 3)**
- Stripe docs, Idempotent requests: "The API supports idempotency for safely retrying requests without accidentally performing the same operation twice." The header is `Idempotency-Key`, and Stripe suggests V4 UUIDs for keys. Read on 29 October 2026 (the .md version of the page). https://docs.stripe.com/api/idempotent_requests
- `crypto.randomUUID()` (on screen) only works in secure contexts (HTTPS or localhost), which is fine for a checkout page. https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID

**2. Starbucks race condition (Segment 4), verified from the researcher's write-up**
- Egor Homakov, "Hacking Starbucks for unlimited coffee," Sakurity blog, 21 May 2015. He bought "3 Starbucks cards $5 each" ($15 in total), sent the same transfer from two sessions at once, and ended with "2 cards with 15 and 5 (20 in total)." He emailed Starbucks security, and he says the bug was fixed in about ten days. https://sakurity.com/blog/2015/05/21/starbucks.html
- Bruce Schneier also covered it at the time. https://www.schneier.com/blog/archives/2015/05/race_condition_.html

**3. Race condition fix (Segment 4)**
- `UPDATE products SET stock = stock - 1 WHERE id = 42 AND stock > 0` is a single statement. In PostgreSQL and MySQL (InnoDB), a second UPDATE on the same row waits for the first one to finish, then checks `stock > 0` again, so only one buyer gets the last item, and the other gets 0 rows affected. https://www.postgresql.org/docs/current/transaction-iso.html

**4. Names (Segment 5)**
- Chris Baraniuk, "The names that break computer systems," BBC Future, 25 March 2016: "When Jennifer Null tries to buy a plane ticket, she gets an error message on most websites. The site will say she has left the surname field blank." Read through a quoting blog (mjtsai.com), since bbc.com wasn't reachable from here. https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems
- SQL injection and prepared statements: OWASP, SQL Injection Prevention Cheat Sheet. https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

**5. The NULL license plate (Segment 6)**
- IOActive's event page lists Joseph Tartaro's DEF CON 27 talk, "Go NULL Yourself: How I Learned to Start Worrying While Getting Fined for Other's Auto Infractions," on 10 August 2019. https://ioactive.com/event/def-con-27-joseph-tartaro
- Sophos Naked Security (15 August 2019): "$12,000 in traffic violation fines" landed on Droogie's car because of the NULL plate. Mental Floss says "more than $12,000 in parking fines". Neither gives a number of tickets. https://news.sophos.com/en-us/2019/08/15/null-license-plate-gets-security-researcher-12k-in-tickets/ and https://www.thedrive.com/news/29388/california-mans-plot-to-avoid-tickets-with-null-vanity-plate-nets-him-12k-in-fines

**6. Leap day bug (Segment 7), verified from the primary source**
- Microsoft's own incident summary: the Guest Agent "calculated the valid-to date by simply taking the current date and adding one to its year," which gave "February 29, 2013, an invalid date that caused the certificate creation to fail." Microsoft calls it a "partial service outage" of Windows Azure Compute and services that depended on it. The script says "part of Azure went down," which matches. https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/

**7. Daylight saving time (Segment 8), verified**
- Checked with the IANA time zone database (Python zoneinfo, Europe/Tallinn). On 29 March 2026, 02:59 EET is followed by 04:00 EEST. On 25 October 2026, 03:59 EEST is followed by 03:00 EET, so 03:00 to 03:59 happens twice.
- The EU rule behind it: summer time starts and ends at 01:00 UTC on the last Sunday of March and the last Sunday of October, which is 3 a.m. and 4 a.m. in Tallinn. https://eur-lex.europa.eu/eli/dir/2000/84/oj

**8. Unicode (Segment 9), run locally**
- Adébáyọ̀ in NFC (the normal, composed form) is 8 code points and 13 bytes in UTF-8. There's no single character for ọ̀, so it's ọ plus a combining grave accent. In NFD (fully decomposed) it's 11 code points and 15 bytes.
- PHP 8.3, after `Normalizer::normalize(..., FORM_C)`: `strlen` is 13, `mb_strlen` is 8, `grapheme_strlen` is 7. Node 22 gives `.length` 8 and 7 grapheme segments. https://www.php.net/manual/en/function.mb-strlen.php and https://www.php.net/manual/en/class.normalizer.php
- Without normalizing, the same name typed as NFD gives `strlen` 15 and `mb_strlen` 11, which is why both parts of the fix are in the script.

**9. Hyrum's law (Segment 10), verified**
- hyrumslaw.com, quoted exactly: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." The site says Hyrum Wright made the observation while he was a software engineer at Google, and that Titus Winters gave it the name. He is now at Adobe, so the script says he noticed it "when he was a software engineer at Google." https://www.hyrumslaw.com/
- It's also in *Software Engineering at Google* (Winters, Manshreck and Wright, 2020), Chapter 1. https://abseil.io/resources/swe-book/html/ch01.html

**10. Corrections / careful wording**
- **Starbucks:** you said fifty dollars in total. It was three five-dollar cards, fifteen dollars in total, and they ended with twenty.
- **NULL plate:** you said over 12,000 tickets. The reports give over twelve thousand dollars in fines, and no ticket count, so the script says dollars.
- **Azure:** you said 2019. The outage was on 29 February 2012, and the bad date was 29 February 2013. Microsoft calls it partial, so the script says "part of Azure went down."
- **Unicode fix:** normalizing alone doesn't fix a length check, so the script names both parts (count characters with mb_strlen, and normalize). It doesn't claim mb_strlen gives seven.
- **Idempotency:** "doesn't necessarily a second payment" became "doesn't create a second payment", which matches Stripe's wording.
- **Jennifer Null:** the BBC says "most websites", and the script uses the same words.
- **Leap years** "once every four years" is true for every year we'll live through. 2100 skips it, and the script doesn't need to say so.

---

## NOTES

- **What's new vs version 2:** the script is now your read-through. It's shorter (about 10 to 11 minutes instead of 14 to 16), it uses the online shop everywhere, and it ends on your own closing.
- **Cross-links:** your HTTP status codes video (13), since a sold-out item is a good place to talk about 409 Conflict, and your "what happens when you send an API request" video (15), since the network retry in Segment 3 happens on that journey. Your Paystack video (16) fits Segment 3, because payments are where idempotency keys matter most.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back a few hours later and post the answer as a reply.

---

## WHAT CHANGED (from your 29 October read-through)

1. **Voice-to-text fixes:** "HKCs", "HKS" and "eight case" are edge case(s), "create a part" and "for that part" are "create a path" and "for that path", "feels a firm" is "fills a form", "body ones" is "button", "app feel the page" is "the page", "charge on each other" is "charge on each order", "send the phone again" is "send the form again", "I then potent" is "Idempotent", "as the same result" is "has the same result", "Egom Omar Cove" is Egor Homakov, "his cars" is "his cards", "You reported it and Starbucks it" is "He reported it, and Starbucks fixed it", "Our link is right up in" is "The link is right in", "hub" is "app", "test" is "text", "Chinese 16" is 2016, "Our surname is null" is "Her surname is Null", "traces" is "treats", "fucking tickets" is "parking tickets", "lip years" and "leap air box" are leap years and leap year bugs, "window Azor" and "Azura" are Windows Azure and Azure, "added to the year" is "adding one to the year", "tall in time" is Tallinn time, "box" is bugs, "stick your buyer" and "a debaio" are Adébáyọ̀, "php is trying" is strlen in PHP, "a and r" is é and ọ̀, "savers" is saves, and "Iron's law" and "ARM's law" are Hyrum's law.
2. **Your notes to me are out of the script:** "Okay, I see that you put two options. There's no need to talk about the first one... Can we put that in simple words?" and "please can you put the pronunciation... in bracket for me". The pronunciation is now in the bracket after Hyrum's.
3. **Self-corrections kept as the final version:** "on the on the 12th, on the 29th of February" is "on the 29th of February", "some of these from some of the ones I talked about" is "some of the ones I talked about", and the repeated "you don't even" lines are one sentence each.
4. **Bookstore to online shop:** "a bookstore app" is "an online shop", "one signed copy of a book left" is "one item left in stock", "sold a book" is "sold an item", "bookstore API" and "books" are "online shop API" and "products". "Daily sales report" stays.
5. **Race condition fix:** only the conditional update is left, as code on screen. The old "check, then decrement" code and the lockForUpdate option are gone. Your two lines about one request taking the last item and the other getting zero rows updated are the spoken part.
6. **Facts fixed in place:** Starbucks fifty dollars to fifteen, twelve thousand tickets to twelve thousand dollars in fines, 2019 to 2012 for Azure, and the Unicode fix line now names both parts.
7. **Credits added on camera:** Joseph Tartaro (DEF CON 2019) and Hyrum Wright (Google). Egor Homakov and the BBC were already named by you. Their links are in the description.
8. **Your new closing** ends the video, inside Segment 10. The comment question is only in the description and the pinned comment.
9. **Gone, because you didn't read them:** the "how to protect your app" segment (five habits and the Pest test), the one-in-a-million maths, the Hawaii surname, the "Falsehoods Programmers Believe About Names" link, SQL null comparisons and Tony Hoare, the JavaScript and PHP leap year code, the Laravel scheduler warning and UTC advice (UTC is now only an on-screen tip), JavaScript string lengths, emoji and utf8mb4, and ORDER BY. That removed the maths clip, the emoji clip, the null comparison clip, the habits clip, the SQL null quiz, the old tips list and the replies that depended on them.
10. **Rebuilt to match:** ten segments, about 1,550 spoken words (10 to 11 minutes), a main short, six additional shorts, 21 clips, and new titles, description, tags, captions, X posts, comments, carousel, essay and references.

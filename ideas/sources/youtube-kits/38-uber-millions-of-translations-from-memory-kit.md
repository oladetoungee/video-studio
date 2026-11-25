# How Uber Serves Millions of Translations From Memory: Content Kit
**A simple explainer of Uber Engineering's post "Translations at Scale: Memory Optimization Techniques That Kept Uber's P99 Under 1ms" by Cristian Velazquez (15 October 2026). It covers what app translations are, why holding them in memory got expensive for Uber's Go services, the two fixes, the real numbers, and what a regular developer can take from it.**
**Every number in the script comes from the Uber post itself (read in full on 26 October 2026), and the Laravel comparison is checked against the Laravel 12 docs and the framework source. Nothing about Uber's setup is guessed. Where the post doesn't say something (like how many languages Uber supports), the script doesn't say it either.**
**Every segment opens with its own topic, so any segment can be cut into a clip.**

---

## TAG POOL (61 tags, every tag used anywhere in this kit, deduplicated)

uber engineering, how uber serves translations, uber translations memory, uber system design, golang memory optimization, go garbage collection, golang performance, i18n explained, internationalization, localization in software, app translations, uber engineering blog, translations at scale, sync.map vs map, golang rwmutex, in-memory cache, memory and disk cache, lru cache explained, hash collisions explained, sharding explained, p99 latency, system design case study, backend engineering, memory optimization, garbage collector explained, laravel localization, laravel translations, cristian velazquez uber, software engineering explained, tech explained simply, gbemisola oladetoun, withgbemi, cache refresh, out of memory, cache hit ratio, go optimization tricks, what is i18n, translation keys, ram vs disk, why use memory cache, what is garbage collection, memory management, gogctuner, go gc tuning, go map concurrency, rwmutex explained, go concurrency, atomic swap, system design tradeoffs, microservices tradeoffs, hashing explained, hash function, birthday problem, least recently used, cache eviction, what is p99, latency explained, laravel lang json, laravel performance, performance tips, software engineering lessons

## HASHTAG POOL (24 hashtags, every hashtag used anywhere in this kit)

#Shorts #softwareengineering #systemdesign #golang #backend #programming #coding #developer #uber #techexplained #webdev #i18n #localization #learntocode #computerscience #performance #go #devops #caching #concurrency #architecture #math #laravel #php

---

## HOW THIS KIT IS BUILT

The angle is a real engineering story told so that a curious non-developer can follow it, and a developer still learns something. Uber Engineering published a post on 15 October 2026 saying they serve millions of translations per second, all from memory, and that their translation library had become one of the biggest users of memory and objects across their Go services. The video goes in the order the story happened. First what app translations are and why Uber keeps them in memory, then why that got expensive (the garbage collector, explained as a cleaner checking every box in a warehouse), then fix one (fewer objects, over 30% less CPU), then the second problem (800MB of translations, and memory doubling on every refresh), then fix two (keep the popular translations in memory and the rest on disk), then the results with Uber's real numbers. It ends with an honest segment on what this means for your own app, using Laravel's lang files, and it says plainly that most Laravel apps will never have Uber's problem.

Cristian Velazquez (Senior Staff Engineer at Uber) is named on camera as the author, and Uber's Internationalization team gets credit too, because the post thanks them.

**QUESTIONS FOR YOU**
All story points are filled or written generally. No open questions.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in the first line or two, so a viewer landing anywhere (or a clip cut from it) still knows what it's about. Numbers go on screen while you say them, because there are a lot of them.

---

**[SEGMENT 1: OPEN]**

So there's this thing I read from Uber's engineering team, posted on the 15th of October, 2026.

Uber serves millions of translations per second, all from memory, and the library holding them had become one of the biggest users of memory across their Go services.

In this video, I'll explain why that got expensive, the two things Uber changed, and their real numbers, and you don't need to be a developer to follow.

---

**[SEGMENT 2: WHAT APP TRANSLATIONS ARE, AND WHY UBER KEEPS THEM IN MEMORY]**

First, what do we mean by translations in an app?

When you open an app in French, every button and every message is in French. The app doesn't have a separate copy of itself for every language.

Instead, every piece of text gets a name, called a key. And for every key, there's a version in each language.

Developers call this internationalisation, or i18n for short, because there are 18 letters between the i and the n.

Say we have a bookstore app, and we want to tell a customer their order has been placed.

**[CODE ON SCREEN]**
```json
// en
{ "order.placed": "Your order has been placed." }

// fr
{ "order.placed": "Votre commande a été passée." }
```

The code only asks for "order.placed", and the user gets it in their own language.

**[~1:00 BEAT: how many translations Uber is holding]**

Uber's post describes a translation as a key and a language together.

So one key in ten languages is ten translations.

And in the service they use as their example, there were over 2 million translations.

**[ON SCREEN: "a translation is a <key>-<language> combination" (Uber Engineering)]**

Uber keeps all of them in memory. In their words, "To save costs and reduce latency, we serve all these translations from memory."

Memory here means the RAM of the server. Reading from RAM is very fast, much faster than asking another service over the network, or reading from a disk.

Think of a waiter who has the whole menu memorised, compared to one who walks to the back office every time you ask what's in a dish.

**[TRANSITION: the setup is clear, now the cost]**

But memory isn't free, and when you run thousands of copies of a service, it adds up very quickly.

---

**[SEGMENT 3: WHY HOLDING TRANSLATIONS IN MEMORY GOT EXPENSIVE]**

So why did keeping translations in memory become a problem for Uber?

Most of the services involved here are written in Go, the programming language.

Go has something called a garbage collector.

While your program runs, it keeps creating small things in memory, called objects.

The garbage collector's job is to find the objects nobody is using anymore and free that memory, so you don't have to do it by hand.

Picture a cleaner in a warehouse. Every so often, they walk through and check every box to see if anyone still needs it.

If the warehouse has a few hundred boxes, that's quick.

If it has millions, the cleaner spends a lot of time walking around, and that time is CPU your servers are paying for.

**[ON SCREEN: more objects = more for the garbage collector to check = more CPU]**

**[~3:00 BEAT: the real Uber numbers on what this was costing]**

Uber's post says garbage collection "continues to be a top consumer of compute for our Go services."

When they looked at memory profiles across their fleet, their translation library was, in their words, "one of the top contributors in terms of size and number of objects."

In one translation service, 70% of the objects came from translations, and over 20% of the service's CPU was going to garbage collection.

Uber had already tried tuning the garbage collector before. Back in 2021, the same author wrote about a tool they built called GOGCTuner.

But that kind of tuning works by letting the app use more of the memory it has. The post says it "does nothing when free memory is already low."

So this time, they had to change how the translations were stored.

---

**[SEGMENT 4: FIX ONE, FEWER OBJECTS PER TRANSLATION]**

Uber's first fix for the translation library was to cut down the number of objects each translation created.

The translations were stored in something in Go called a sync.Map. It's a map that's safe to use from many parts of the program at the same time.

But the way sync.Map worked before Go 1.24, storing one translation created four separate objects in memory.

So it's like packing one book inside a box, inside another box, inside another box, inside another box.

With over 2 million translations, that's millions of boxes for the cleaner to check.

**[CODE ON SCREEN]**
```go
// before: four objects for every translation
var store sync.Map

// after: a plain map of strings, with one lock for the whole map
type Store struct {
    mu    sync.RWMutex
    items map[string]string
}
```

So they moved to a plain Go map of strings, with one lock in front of it.

That lock is called an RWMutex. Many readers can read at the same time, and when a writer needs to update the translations, it waits its turn.

For the service in their example, that one change gave them "over 30% improvement in CPU usage."

**[TWIST: first big payoff, then the memory problem]**

Over 30% from changing how a map stores things. That's a big win.

But the memory was still high, and that was the next problem.

---

**[SEGMENT 5: THE SECOND PROBLEM, 800MB OF TRANSLATIONS AND A DOUBLE COPY]**

Even after fixing the objects, Uber's translations were still taking up a lot of memory.

The post explains why. They had cut down the pointers, but they were still storing the same amount of text.

For the service in their example, the translations came as a compressed JSON file of about 150 megabytes.

Once it was uncompressed and loaded into memory, it took about 800 megabytes.

**[ON SCREEN: 150MB compressed file, about 800MB in memory]**

And there was a second problem with refreshing.

Every couple of hours, the service loads a fresh copy of the translations.

It builds the new copy in the background, and when it's ready, it swaps it in for the old one in one step, so users never see half-loaded text.

But for up to a minute, the service is holding two full copies at once.

So 800 megabytes becomes about 1.6 gigabytes for that minute, and the post says that in some services, this caused them to run out of memory.

**[~6:00 BEAT: the observation that changes the whole design]**

Then the team noticed something important. In their words, "the percentage of translations used was pretty low."

So they looked at their options.

One option was to move translations to a separate service and fetch them over the network. They said no, because of "higher costs due to overhead from network calls, higher latency, and higher chances of failures."

Another option was to give each service only the translations it needs. They said no to that too, because of the maintenance, like having to update a key in many repositories.

---

**[SEGMENT 6: FIX TWO, POPULAR TRANSLATIONS IN MEMORY, THE REST ON DISK]**

Uber's second fix was a hybrid. In their words, "a small portion was in memory, everything else on disk."

Think of a bookshop. The books people ask for every day stay on the counter. Everything else goes to the store room, and the staff keep a small card that says exactly where each book is.

The rest of the code didn't have to change. It still calls the same Get and Put functions it always did.

**[ON SCREEN: Get() and Put() stay the same. Popular translations in memory, everything else on disk.]**

The small card works like this.

Every key stays in memory, but in a much smaller form. They run the key through a hash, which turns any text into a short fixed-size code, like a fingerprint. Uber uses 6 bytes.

The first byte picks one of 256 groups, called shards. Each shard has its own lock, its own entries in memory, and its own file on disk.

So instead of one big queue at one counter, you have 256 counters, and people spread out.

Now, a short fingerprint has a risk. Two different keys could end up with the same code. That's called a collision. It's like two people in a room sharing a birthday.

Uber did the maths for 10 million keys. With 6 bytes, the chance of even one collision was about 16%, and the expected number of collisions was less than one. With 5 bytes, they'd expect about 45.

So they chose 6 bytes, and for the rare key that collides, there's a fallback that uses the original key. The post says only a couple of keys hit that path.

**[ON SCREEN: 6-byte fingerprint per key. 256 shards. Collisions fall back to the original key.]**

The value next to each key is also tiny. 2 bytes say where the translation sits in memory, if it's there, and 3 bytes say where it sits in the file on disk.

So each entry is 11 bytes in total, no matter how long the translation is.

**[~9:00 BEAT: the clever part, deciding what stays in memory]**

Then they had to decide which translations stay in memory. For that, they used something called an LRU, which means least recently used.

It's like a small fridge. When it's full, the thing you haven't touched in the longest time is the one that comes out.

Updating that list on every single read would cost too much, so they only save the last time each entry was used.

And this is a small detail I love. When they profiled it, just checking the time was adding 3 to 5% extra CPU.

So they have one background task that keeps the current time in a shared value, and everyone reads from that.

Like one big clock on the office wall, so nobody has to keep checking their phone.

**[OPTIONAL RE-ENGAGEMENT: And the refresh problem from earlier gets fixed here too.]**

When the translations refresh every couple of hours, they only preload the entries that were used in the last 15 minutes.

Before they did that, the share of reads served from memory dropped every time a refresh happened, and disk reads went up. Preloading the recent ones fixed that.

---

**[SEGMENT 7: THE RESULTS, WITH UBER'S REAL NUMBERS]**

So what did Uber's translation changes actually achieve? These numbers are all from their post.

At startup, the translation store now sits at about 40 megabytes, which is only the keys and the small cards. Before, it was about 800. That's an over 90% improvement.

They capped memory at 50,000 translations, which usually keeps it between 80 and 120 megabytes.

A refresh now needs about 40 megabytes extra, instead of a second full copy.

**[ON SCREEN: about 800MB before. About 40MB at startup. Usually 80 to 120MB with a 50,000 cap.]**

In the service they show at the end, about 30,000 out of more than 4 million entries are in memory. That's about 1%.

And over 99.9% of reads are still answered from memory.

For the less than 0.1% that have to go to disk, the p99 is under 100 microseconds.

p99 means 99 out of every 100 of those reads are faster than that. And a microsecond is a millionth of a second.

Overall, that service's memory went from about 2.7 gigabytes to about 750 megabytes.

**[ON SCREEN: about 1% in memory. Over 99.9% served from memory. Memory 2.7GB to 750MB.]**

**[TRANSITION: from Uber's numbers to what this means for you]**

The post ends by saying, "Due to our scale, having unoptimized in-memory cache solutions across thousands of instances gets expensive." They're now looking at other caches that use a lot of memory, and they might build a general version of this.

The post also thanks Uber's Internationalization team, who helped with the reviews and the rollout.

---

**[SEGMENT 8: WHAT YOU CAN TAKE FROM UBER'S TRANSLATIONS FIX FOR YOUR OWN APP]**

So what can you take from Uber's translations story if your app is nowhere near Uber's size?

To be honest, most apps will never have this exact problem. A bookstore app in English and French might have a few hundred strings.

If you're using Laravel, for example, your translations live in a lang folder.

**[CODE ON SCREEN]**
```php
// lang/en/orders.php
return [
    'placed' => 'Your order has been placed.',
];

// in your code
echo __('orders.placed');
```

Laravel already loads translations lazily. The orders file for French is only read the first time a request asks for something in it, and then it's kept for the rest of that request.

With the usual PHP setup, every request starts fresh, so that memory is gone when the request ends.

One thing I found in Laravel's code. If you also keep a JSON file for a language, like lang/fr.json, the first translation in that language loads the whole JSON file.

So if that one file grows to thousands of lines, you're loading all of them to show one sentence.

And queue workers are different. Laravel's docs say they're long-lived processes that keep the app in memory. So what one job loads can still be there for the next job.

So the lessons I'm taking from Uber are simple ones.

Measure first. Uber didn't guess. They looked at memory profiles and saw the translation library near the top. In PHP, even memory_get_peak_usage() will tell you how much a request used.

Then ask how much of what you load is actually used. Uber found most of their translations were barely touched, and that changed the whole design.

And Uber's own two lessons from the post are, "Create the smallest possible amount of references," because that's less work for the garbage collector, and "Keep an eye on the total memory consumed and how often those objects are truly used."

So, what's something your app loads on every request that it might not need? Tell me in the comments.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("uber system design", "golang memory optimization", "go garbage collection" and "i18n" are the phrasings developers type; "how uber" is a strong search starter)
> 1. How Uber Serves Millions of Translations From Memory — 52
> 2. Uber System Design: How Uber Handles App Translations — 53
> 3. Golang Memory Optimization: Uber's Translations Fix — 51
> 4. Go Garbage Collection Explained With Uber's Example — 51
> 5. What Is i18n? How Uber Translates Its App at Scale — 50
> 6. How Uber Cut a Go Service From 2.7GB to 750MB — 45
> 7. Uber Engineering Case Study: Translations at Scale — 50

**CLICK-LED**
> 8. Uber Only Needed 1% of Its Translations in Memory — 49
> 9. Why Uber Moved Most of Its Translations to Disk — 47
> 10. One Go Map Change Cut CPU by 30% at Uber — 40
> 11. Uber's Translations Were Eating Its Servers' Memory — 51
> 12. What Uber's Translation Fix Means for Your App — 46

**RECOMMENDED: 1.** It's almost word for word what Uber's post says, so it never overpromises, and "How Uber" at the front catches people who search Uber engineering and system design stories. It also tells a non-developer what the video is about without any jargon. 2 is the backup search title, since "uber system design" is the phrase a lot of developers preparing for interviews type. Thumbnail pairing: the title already says "translations" and "memory," so the thumbnail shouldn't repeat either word. Use the 1% idea instead (see 2b), so the pair reads as "here's the topic" plus "here's the surprising number."

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Uber Only Needed 1% of Its Translations in Memory" (title 8). In the example service Uber shows, about 30,000 of over 4 million entries sit in memory and over 99.9% of reads are still served from memory, and Segment 7 says exactly that. Use it as the backup if title 1 underperforms. Because this is a news-style explainer, only swap on day one if it's clearly flat; after that, leave it.

**Thumbnail:** your face on the right, in your usual spot, looking surprised. On the left, a huge stack of speech bubbles in different languages (Hello, Bonjour, Hola, Ẹ n lẹ, and so on), all greyed out, with one small bubble glowing bright. The only big text is "1%" next to the glowing bubble. Squint at it, and if you can still see "a big grey pile and one bright bit," it works. It doesn't repeat the title. Don't use Uber's logo; the title carries the name.

**Backup thumbnail (for the swap):** a memory bar going from red and full ("2.7GB") to green and short ("750MB"), your face on the right. Those two numbers are the only words.

**Backup intro (only if your own intro doesn't land on the day):**
> Every button in the Uber app shows up in your language, and Uber's engineers say they serve millions of those translations every second, all from memory. That got so expensive that they had to rethink how it works. In this video, I'll explain what app translations are, the two things Uber changed, and the real numbers, and at the end, what you can take from it for your own app.

**Recording notes:**
- Shoot two takes of your own Segment 1 intro, so you can pick the stronger one. The backup intro above is there only if neither take works.
- Segments 5 and 6 each run over 2 minutes. Segment 6 has an optional re-engagement line inside it. Segment 5 doesn't need one because the twist ("so they looked at their options") does that job.
- Every number has an [ON SCREEN] line. Put them on screen while you say them, because this video has a lot of numbers and people remember what they see.
- The closing sits inside Segment 8 and doesn't refer back, so the edit can end cleanly on the comment question.
- The script is about 1,990 spoken words, so at your pace the video is roughly 12 and a half minutes. If you want it nearer 10, the easiest cuts are the GOGCTuner lines in Segment 3 (Clip 7 goes with them), the two rejected options in Segment 5 (Clip 12 goes with them), and the "next steps" line in Segment 7. Nothing else depends on those.

**Retention beats (marked in the script):**
- ~1:00 is in Segment 2, where Uber's definition of a translation leads to "over 2 million translations" in one service.
- ~3:00 is in Segment 3, Uber's own numbers on what garbage collection was costing (70% of objects, over 20% of CPU).
- ~6:00 is in Segment 5, "the percentage of translations used was pretty low," the line that changes the whole design.
- ~9:00 is in Segment 6, deciding what stays in memory (the fridge and the clock trick).
- The end of Segment 4 ("But the memory was still high") is an extra hook at about 5 minutes.

**After publishing:**
- Post the X image post (the before and after card) as the video goes live, and send the link to a few developer friends who'll watch it all the way through. Tagging Uber Engineering on X and LinkedIn is fair, since you credit them by name.
- This one is news-like, so judge it on day one. If it's clearly below your channel average after 24 hours, swap to the stretch title and the memory-bar thumbnail. If it's doing fine, leave it alone.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. Wherever the biggest drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> How does Uber serve millions of translations per second from memory? Uber Engineering wrote about it in October 2026, and I explain it here in simple words, for developers and for anyone curious how big apps work.
>
> I start with what app translations (i18n) are and why Uber keeps them in memory. Then I explain why that got expensive for Uber's Go services, using the garbage collector, and the first fix, which cut CPU use by over 30% in one service. After that comes the second problem (800MB of translations, and memory doubling on every refresh) and the second fix, which keeps the popular translations in memory and everything else on disk, with hashing, sharding and an LRU. Then the real results from Uber's post, and what you can take from all this for your own app, with Laravel as the example.
>
> All credit for the engineering goes to Cristian Velazquez and Uber Engineering. Any mistakes in the explaining are mine.
>
> What's something your app loads on every request that it might not need?
>
> CHAPTERS (add times after editing)
> 0:00 Uber serves millions of translations from memory
> What app translations are, and why Uber keeps them in memory
> Why it got expensive (Go's garbage collector)
> Fix one: fewer objects, over 30% less CPU
> The second problem: 800MB and a double copy
> Fix two: popular translations in memory, the rest on disk
> The results, with Uber's numbers
> What you can take from this for your own app
>
> SOURCES AND FURTHER READING
> Uber Engineering, "Translations at Scale: Memory Optimization Techniques That Kept Uber's P99 Under 1ms" by Cristian Velazquez (15 October 2026): https://www.uber.com/blog/translations-at-scale/
> Uber Engineering, "How We Saved 70K Cores Across 30 Mission-Critical Services (Large-Scale, Semi-Automated Go GC Tuning @Uber)" by Cristian Velazquez (2021): https://www.uber.com/blog/how-we-saved-70k-cores-across-30-mission-critical-services/
> Laravel documentation, Localization: https://laravel.com/docs/localization
> Laravel documentation, Queues (long-lived workers): https://laravel.com/docs/queues
> Go documentation, A Guide to the Go Garbage Collector: https://go.dev/doc/gc-guide
> Go documentation, sync.Map: https://pkg.go.dev/sync#Map
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (492 characters, under YouTube's 500 limit):**

uber engineering, how uber serves translations, uber translations memory, uber system design, golang memory optimization, go garbage collection, golang performance, i18n explained, internationalization, localization in software, app translations, uber engineering blog, translations at scale, sync.map vs map, golang rwmutex, in-memory cache, memory and disk cache, lru cache explained, hash collisions explained, sharding explained, p99 latency, system design case study, backend engineering

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

Uber says it serves millions of translations every second, all from memory, and that got really expensive.

**[WHAT TRANSLATIONS ARE]**

Every piece of text in an app gets a key, like "order.placed", and each key has a version in every language. Uber counts one key in one language as one translation, and one of their services had over 2 million.

**[WHY IT GOT EXPENSIVE]**

Their services are written in Go, and Go has a garbage collector that keeps checking every object in memory to see if it's still needed. In one service, 70% of the objects were translations, and over 20% of the CPU went to garbage collection.

**[FIX ONE]**

Each translation was creating four objects. They switched to a plain map with one lock, and CPU use improved by over 30%.

**[CODE ON SCREEN]**
```go
items map[string]string // guarded by a sync.RWMutex
```

**[THE SECOND PROBLEM]**

But the translations still took about 800 megabytes, and every refresh briefly held two copies. And most of the translations were barely used.

**[FIX TWO]**

So they kept the popular ones in memory and moved the rest to disk. Every key became a 6-byte fingerprint, split across 256 shards, with an 11-byte entry pointing to where the text lives.

**[THE RESULTS]**

Startup memory went from about 800 megabytes to about 40. About 1% of entries sit in memory, and over 99.9% of reads still come from memory. That service went from about 2.7 gigabytes to 750 megabytes.

**[LAND]**

Uber's lesson is to keep an eye on how much memory you use and how often that data is actually used. Credit to Cristian Velazquez and Uber Engineering.

**Caption:** uber serves millions of translations per second from memory, and it got so expensive they had to redesign how it's stored. here's what they changed, in simple words 🌍
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #systemdesign #golang #backend #programming #coding #developer #uber #techexplained #webdev
**Tags:** how uber serves translations, uber engineering, golang memory optimization, uber system design

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: What i18n means (20-30 sec)

When you switch an app from English to French, it doesn't load a different app.

Every piece of text has a name, called a key, like "order.placed", and every key has a version in each language.

The code asks for the key, and you get the text in your language.

Developers call this i18n, because there are 18 letters between the i and the n in internationalisation.

**Caption:** how one app shows up in every language without a separate copy for each one. this is what developers mean by i18n 🌍
full video: [LINK]
**Hashtags:** #Shorts #i18n #localization #webdev #programming #coding #learntocode #developer #techexplained #softwareengineering
**Tags:** i18n explained, internationalization, localization in software, app translations

---

### SHORT 3: The garbage collector, explained with a cleaner (25-35 sec)

Languages like Go have a garbage collector.

Picture a cleaner in a warehouse who walks through every so often and checks every box, to see if anyone still needs it.

A few hundred boxes is quick. Millions of boxes takes a lot of time, and that time is CPU your servers pay for.

At Uber, in one translation service, 70% of the objects in memory were translations, and over 20% of the CPU went to garbage collection.

**Caption:** a garbage collector checks every object in memory to see if it's still needed. the more objects you create, the more CPU it costs. uber found this with their translations 🧹
full video: [LINK]
**Hashtags:** #Shorts #golang #programming #backend #coding #developer #softwareengineering #computerscience #techexplained #performance
**Tags:** go garbage collection, garbage collector explained, golang performance, golang memory optimization

---

### SHORT 4: Four boxes for one book (25-35 sec)

At Uber, storing one translation in a Go sync.Map was creating four objects in memory.

It's like packing one book inside four boxes.

With over 2 million translations, that's millions of boxes for the garbage collector to check.

So they switched to a plain map of strings with one lock in front of it.

For that service, CPU use improved by over 30%.

**[CODE ON SCREEN]**
```go
mu    sync.RWMutex
items map[string]string
```

**Caption:** uber's translation store was creating four objects for every translation. one change to a plain map with a lock cut CPU use by over 30% for that service 📦
full video: [LINK]
**Hashtags:** #Shorts #golang #go #backend #programming #coding #developer #performance #softwareengineering #systemdesign
**Tags:** sync.map vs map, golang rwmutex, golang performance, uber engineering

---

### SHORT 5: Why memory doubled every refresh (25-35 sec)

Uber's translations took about 800 megabytes in memory in one service.

Every couple of hours, the service loads a fresh copy in the background and swaps it in when it's ready, so users never see half-loaded text.

But for up to a minute, there are two full copies in memory.

In some services, that was enough to run out of memory.

**Caption:** a safe way to refresh data is to build the new copy and swap it in. for uber, that meant holding two 800MB copies at once, and some services ran out of memory 🔁
full video: [LINK]
**Hashtags:** #Shorts #backend #systemdesign #softwareengineering #programming #devops #developer #coding #uber #golang
**Tags:** in-memory cache, cache refresh, out of memory, uber system design

---

### SHORT 6: The 1% that does all the work (25-35 sec)

Uber noticed that most of their translations were barely used.

So they kept the popular ones in memory and put everything else on disk.

In the service they show, about 30,000 out of more than 4 million entries sit in memory. That's about 1%.

And over 99.9% of reads are still answered from memory.

**Caption:** uber keeps about 1% of its translations in memory in one service, and over 99.9% of reads still come from memory. here's how 🧠
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #caching #backend #softwareengineering #programming #developer #coding #uber #techexplained
**Tags:** memory and disk cache, lru cache explained, uber translations memory, cache hit ratio

---

### SHORT 7: One clock on the wall (20-30 sec)

When Uber built their new translation cache, they saved the last time each entry was used.

But just checking the time on every read was adding 3 to 5% extra CPU.

So one background task keeps the current time in a shared value, and everyone reads from that.

Like one big clock on the office wall, so nobody has to keep checking their phone.

**Caption:** checking the time on every read cost uber 3 to 5% extra CPU in their translation cache. so they gave everyone one shared clock instead ⏰
full video: [LINK]
**Hashtags:** #Shorts #golang #performance #backend #programming #coding #developer #softwareengineering #systemdesign
**Tags:** golang performance, lru cache explained, uber engineering, go optimization tricks

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** how Uber serves millions of translations per second
**Caption:** uber's engineering team says they serve millions of translations per second, all from memory, and the library holding them became one of the biggest memory users in their go services.
full video: [LINK]
**Hashtags:** #Shorts #uber #softwareengineering #systemdesign #golang #backend #programming #developer #techexplained #coding
**Tags:** how uber serves translations, uber engineering, uber engineering blog, translations at scale

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** how apps show text in every language
**Caption:** every piece of text in an app gets a key, and every key has a version in each language. here's how that works, and why uber keeps over 2 million of them in memory in one service.
full video: [LINK]
**Hashtags:** #Shorts #i18n #localization #webdev #programming #coding #learntocode #developer #softwareengineering
**Tags:** i18n explained, internationalization, localization in software, app translations

---

### CLIP 3 — subset of Segment 2
**Starts:** "Developers call this internationalisation, or i18n for short..." **Ends:** "...and the user gets it in their own language."
**Overlay:** what i18n means
**Caption:** i18n is short for internationalisation, because there are 18 letters between the i and the n. here's what it looks like in code.
full video: [LINK]
**Hashtags:** #Shorts #i18n #webdev #programming #coding #learntocode #developer #techexplained
**Tags:** i18n explained, what is i18n, internationalization, translation keys

---

### CLIP 4 — subset of Segment 2
**Starts:** "Uber keeps all of them in memory." **Ends:** "...it adds up very quickly."
**Overlay:** why read from memory instead of a database
**Caption:** reading from RAM is much faster than asking another service or reading from a disk. it's like a waiter who has the whole menu memorised.
full video: [LINK]
**Hashtags:** #Shorts #backend #systemdesign #softwareengineering #programming #developer #coding #techexplained
**Tags:** in-memory cache, ram vs disk, why use memory cache, backend engineering

---

### CLIP 5 — Segment 3 (whole)
**Overlay:** why Uber's translations got expensive
**Caption:** uber's go services have a garbage collector that checks every object in memory, and their translation library was one of the top contributors by size and number of objects.
full video: [LINK]
**Hashtags:** #Shorts #golang #backend #programming #softwareengineering #performance #developer #coding #uber
**Tags:** go garbage collection, golang memory optimization, uber engineering, garbage collector explained

---

### CLIP 6 — subset of Segment 3
**Starts:** "Go has something called a garbage collector." **Ends:** "...that time is CPU your servers are paying for."
**Overlay:** what a garbage collector does
**Caption:** a garbage collector is like a cleaner who checks every box in a warehouse to see if anyone still needs it. more boxes means more time, and more CPU.
full video: [LINK]
**Hashtags:** #Shorts #golang #programming #computerscience #coding #learntocode #developer #techexplained
**Tags:** garbage collector explained, go garbage collection, what is garbage collection, memory management

---

### CLIP 7 — subset of Segment 3
**Starts:** "Uber had already tried tuning the garbage collector before." **Ends:** "...they had to change how the translations were stored."
**Overlay:** when GC tuning stops helping
**Caption:** uber's earlier tool, GOGCTuner, works by letting an app use more of its memory. their post says it does nothing when free memory is already low.
full video: [LINK]
**Hashtags:** #Shorts #golang #performance #backend #devops #programming #developer #softwareengineering
**Tags:** gogctuner, go gc tuning, golang performance, uber engineering

---

### CLIP 8 — Segment 4 (whole)
**Overlay:** sync.Map vs a plain map in Go
**Caption:** storing one translation in a go sync.Map was creating four objects. uber switched to a plain map with one lock, and CPU use improved by over 30% for that service.
full video: [LINK]
**Hashtags:** #Shorts #golang #go #backend #programming #performance #coding #developer #softwareengineering
**Tags:** sync.map vs map, golang rwmutex, golang performance, go map concurrency

---

### CLIP 9 — subset of Segment 4
**Starts:** "So they moved to a plain Go map of strings, with one lock in front of it." **Ends:** "...over 30% improvement in CPU usage."
**Overlay:** what an RWMutex does
**Caption:** an RWMutex lets many readers read at the same time, and makes a writer wait its turn. that plus a plain map gave uber over 30% better CPU use in one service.
full video: [LINK]
**Hashtags:** #Shorts #golang #concurrency #backend #programming #coding #developer #performance
**Tags:** golang rwmutex, rwmutex explained, go concurrency, golang performance

---

### CLIP 10 — Segment 5 (whole)
**Overlay:** 800MB of translations, explained
**Caption:** a 150MB compressed file became about 800MB in memory, every refresh briefly held two copies, and most of the translations were barely used. here's what uber considered next.
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #backend #softwareengineering #programming #developer #devops #coding #uber
**Tags:** in-memory cache, out of memory, uber system design, cache refresh

---

### CLIP 11 — subset of Segment 5
**Starts:** "And there was a second problem with refreshing." **Ends:** "...this caused them to run out of memory."
**Overlay:** why memory doubled on every refresh
**Caption:** building a fresh copy in the background and swapping it in is a safe way to refresh data. for up to a minute, though, there are two full copies in memory.
full video: [LINK]
**Hashtags:** #Shorts #backend #systemdesign #devops #programming #developer #softwareengineering #coding
**Tags:** cache refresh, atomic swap, out of memory, in-memory cache

---

### CLIP 12 — subset of Segment 5
**Starts:** "So they looked at their options." **Ends:** "...like having to update a key in many repositories."
**Overlay:** two fixes Uber said no to
**Caption:** uber could have moved translations to a separate service, or given each service only what it needs. they said no to both, and gave their reasons.
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #softwareengineering #backend #architecture #programming #developer #coding
**Tags:** system design tradeoffs, uber system design, microservices tradeoffs, backend engineering

---

### CLIP 13 — Segment 6 (whole)
**Overlay:** how Uber split translations between memory and disk
**Caption:** popular translations stay in memory, everything else goes to disk, and every key becomes a tiny 11-byte entry. hashing, sharding and an LRU, explained simply.
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #caching #backend #golang #softwareengineering #programming #developer #coding
**Tags:** memory and disk cache, hash collisions explained, sharding explained, lru cache explained

---

### CLIP 14 — subset of Segment 6
**Starts:** "Every key stays in memory, but in a much smaller form." **Ends:** "...and people spread out."
**Overlay:** hashing and sharding, explained
**Caption:** uber turns every translation key into a 6-byte fingerprint, and the first byte picks one of 256 shards, each with its own lock and its own file.
full video: [LINK]
**Hashtags:** #Shorts #systemdesign #computerscience #backend #programming #coding #developer #techexplained
**Tags:** sharding explained, hashing explained, hash function, uber system design

---

### CLIP 15 — subset of Segment 6
**Starts:** "Now, a short fingerprint has a risk." **Ends:** "...only a couple of keys hit that path."
**Overlay:** what a hash collision is
**Caption:** two different keys can end up with the same short code, like two people sharing a birthday. here's how uber picked 6 bytes and what happens when it collides.
full video: [LINK]
**Hashtags:** #Shorts #computerscience #programming #systemdesign #coding #developer #math #techexplained
**Tags:** hash collisions explained, birthday problem, hash function, uber engineering

---

### CLIP 16 — subset of Segment 6
**Starts:** "Then they had to decide which translations stay in memory." **Ends:** "...so nobody has to keep checking their phone."
**Overlay:** what an LRU cache is
**Caption:** an LRU is like a small fridge. when it's full, the thing you haven't touched in the longest time comes out. plus the clock trick that saved uber 3 to 5% CPU.
full video: [LINK]
**Hashtags:** #Shorts #caching #systemdesign #golang #backend #programming #developer #performance #coding
**Tags:** lru cache explained, least recently used, golang performance, cache eviction

---

### CLIP 17 — Segment 7 (whole)
**Overlay:** Uber's translation fix, by the numbers
**Caption:** from about 800MB to about 40MB at startup, about 1% of entries in memory, over 99.9% of reads still from memory, and 2.7GB to 750MB for one service.
full video: [LINK]
**Hashtags:** #Shorts #uber #systemdesign #softwareengineering #performance #backend #programming #developer #golang
**Tags:** uber translations memory, memory optimization, p99 latency, uber engineering

---

### CLIP 18 — subset of Segment 7
**Starts:** "In the service they show at the end..." **Ends:** "...a microsecond is a millionth of a second."
**Overlay:** what p99 latency means
**Caption:** p99 means 99 out of every 100 requests are faster than that number. for uber's translations that go to disk, it's under 100 microseconds.
full video: [LINK]
**Hashtags:** #Shorts #performance #backend #systemdesign #softwareengineering #programming #developer #devops
**Tags:** p99 latency, what is p99, latency explained, cache hit ratio

---

### CLIP 19 — Segment 8 (whole)
**Overlay:** what Uber's fix means for your app
**Caption:** most apps will never have uber's translation problem. here's how laravel loads translations, where memory can sneak up on you, and the two lessons from uber's post.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #webdev #backend #programming #developer #coding #performance
**Tags:** laravel localization, laravel translations, memory optimization, backend engineering

---

### CLIP 20 — subset of Segment 8
**Starts:** "If you're using Laravel, for example, your translations live in a lang folder." **Ends:** "...you're loading all of them to show one sentence."
**Overlay:** how Laravel loads translation files
**Caption:** laravel only reads a translation file the first time a request needs it. but a big lang JSON file gets loaded whole on the first translation in that language.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #webdev #backend #coding #developer #programming
**Tags:** laravel localization, laravel translations, laravel lang json, laravel performance

---

### CLIP 21 — subset of Segment 8
**Starts:** "So the lessons I'm taking from Uber are simple ones." **Ends:** "...how often those objects are truly used."
**Overlay:** 2 lessons from Uber's engineering team
**Caption:** measure before you change anything, and check how much of what you load is actually used. plus uber's own two lessons from their post.
full video: [LINK]
**Hashtags:** #Shorts #softwareengineering #backend #performance #programming #developer #coding #webdev
**Tags:** memory optimization, performance tips, uber engineering, software engineering lessons

---

**Posting order:** 1 first (the hook), then 6 (the cleaner, easiest to follow cold), then 15 (hash collisions), then 18 (p99), then 11 (memory doubling), then 16 (LRU and the clock), then 20 (Laravel), then 17 (the numbers). Space the whole-segment clips out between the subset clips so the same footage doesn't run twice in a row.

---

## 6. CAPTIONS

### TikTok caption:
> uber says it serves millions of translations every second, all from memory, and it got so expensive that they had to redesign how they're stored 🌍 here's what they changed, in simple words.
**Hashtags:** #softwareengineering #systemdesign #golang #techexplained #uber

### Instagram Reel caption:
> Every button in an app like Uber shows up in your language, and Uber's engineers say they serve millions of those translations every second, straight from memory.
>
> In October 2026 they wrote about how that became one of the biggest users of memory in their Go services, and what they changed. They kept the translations people use often in memory, moved everything else to disk, and in one service memory went from about 2.7GB to about 750MB.
>
> I explain the whole thing in simple words, for developers and for anyone curious how big apps work.
>
> Full video on YouTube, link in bio.
>
> #softwareengineering #systemdesign #golang #techexplained #uber

### LinkedIn caption:
> How does an app with millions of translations keep every one of them fast without running out of memory?
>
> Uber serves millions of translations per second from memory, because reading from RAM is cheaper and faster than calling another service.
>
> In Go, every object in memory is something the garbage collector has to check, and Uber's translation library was one of the top contributors by size and number of objects across their fleet.
>
> Their first fix replaced a sync.Map, which created four objects per translation, with a plain map behind one lock, and that improved CPU use by over 30% in one service.
>
> Their second fix kept only the frequently used translations in memory and moved the rest to disk, with each key reduced to an 11-byte entry, so startup memory fell from about 800MB to about 40MB.
>
> In the example service, about 1% of entries now sit in memory, over 99.9% of reads are still served from memory, and total memory went from about 2.7GB to about 750MB.
>
> All credit to Cristian Velazquez and Uber Engineering for the work and the write-up.
>
> Full walkthrough: [LINK]
>
> #softwareengineering #systemdesign #golang #backend #performance

---

## 7. X / TWITTER

**How this section works.** It follows what your X searches showed. Image cheat sheets get far more reach than text tweets, and the tweets that start conversations name one specific situation and what happens. So there's one image post, one tips list, one quiz, one "can you guess" tweet, the launch tweet, and single tweets that each say one specific thing. Everything is lowercase, no arrows, no hashtags, and the link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> uber wrote about how they serve millions of translations per second from memory without it eating their servers. I put their numbers on one card

**Image content (one clean card in Canva):**
> **HOW UBER SHRANK ITS TRANSLATIONS IN MEMORY**
> *(Uber Engineering, October 2026)*
> **The problem** · translations were one of the top memory users across their Go services
> **Fix 1** · sync.Map made 4 objects per translation. a plain map + one lock = over 30% less CPU
> **Fix 2** · popular translations in memory, everything else on disk
> **Each key** · a 6-byte fingerprint, 256 shards, 11 bytes per entry
> **Startup memory** · about 800MB before, about 40MB after
> **In memory** · about 1% of entries
> **Served from memory** · over 99.9% of reads
> **One service** · 2.7GB down to 750MB
> *source: "Translations at Scale" by Cristian Velazquez, uber.com/blog*

**Reply:**
> I explained the whole thing in simple words, garbage collector and all: [LINK]

---

### THE TIPS LIST

> things I'm taking from uber's translations post, even for a small app
>
> 1. measure memory before you guess what's using it
> 2. check how much of what you load is actually used
> 3. fewer objects means less work for the garbage collector
> 4. if you refresh by building a new copy, remember you hold two for a while
> 5. keep what's popular close and the rest somewhere cheaper

**Reply:** full video on uber's fix: [LINK]

---

### THE QUIZ

> uber kept translations in memory and they took about 800MB in one service. what did they do?
>
> A. moved them all to a separate translation service
> B. gave each service only the translations it needs
> C. kept the popular ones in memory and the rest on disk
> D. bought bigger servers

**Your reply a few hours later:**
> it's C. they said no to a separate service because of network costs, latency and more chances of failure, and no to per-service subsets because of the maintenance. about 1% of entries sit in memory now and over 99.9% of reads still come from memory

---

### THE "CAN YOU GUESS" TWEET

> uber's engineers found that one tiny thing was adding 3 to 5% extra CPU to their translation cache. can you guess what it was?

**Your reply:**
> checking the current time on every read 😭 they fixed it with one background task that keeps the time in a shared value, so everyone reads that instead

---

### THE LAUNCH TWEET

> made a video explaining how uber serves millions of translations per second from memory, what made it expensive, the two fixes, and their real numbers. simple enough for non-developers too

**Reply:** [LINK]

---

### STANDALONE TWEETS

> uber's go sync.Map was creating four objects for every translation. switching to a plain map with one lock improved CPU use by over 30% in that service

> uber's translations were a 150MB compressed file that became about 800MB in memory. and every refresh held two copies for up to a minute

> in one uber service, about 30,000 out of more than 4 million translation entries sit in memory, and over 99.9% of reads still come from memory

> i18n is short for internationalisation because there are 18 letters between the i and the n. I only learnt that this year

> if you keep a big lang/fr.json in laravel, the first translation in french loads the whole file for that request

> what's something your app loads on every request that it probably doesn't need? 👀

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what's something your app loads on every request that it might not need? and if you work on a big Go service, I'd love to know if you've hit garbage collection problems like this 👀

### Instagram:
> the part that got me was that about 1% of the translations sit in memory, and over 99.9% of reads still come from memory.

### TikTok:
> checking the time was costing them 3 to 5% extra CPU 😭 one shared clock fixed it

### LinkedIn:
> The step I'd copy from this post is the first one. Uber profiled memory across their fleet before changing anything, which is how they found the translation library near the top.

### X (reply to your own tweet):
> credit to cristian velazquez and uber engineering for writing this up so clearly. the full post has the collision maths and the charts

### REPLIES TO EXPECT (ready to paste)

**"Why not just use Redis?"**
> uber looked at moving translations to a separate service and said no, because of network costs, higher latency and more chances of failure. reading from local memory or local disk avoids the network completely

**"Isn't disk slow?"**
> it's slower than memory, but only the rarely used translations go there. for the less than 0.1% of reads that hit disk, uber says the p99 is under 100 microseconds

**"Doesn't Go 1.24 fix sync.Map?"**
> go 1.24 changed how sync.Map works inside, and uber's post says it describes the older behaviour. their bigger win came from the second fix anyway, which cut the memory itself

**"What happens if two keys get the same hash?"**
> there's a fallback that keeps the original key for those. uber says only a couple of keys hit that path

**"Does Laravel have this problem?"**
> most laravel apps won't, because each request starts fresh with php-fpm and translation files load only when needed. queue workers stay in memory though, and a huge lang JSON file loads whole, so it's worth a look if yours is big

**"Why would Uber need millions of translations?"**
> their post doesn't break it down, but one translation is one key in one language, so lots of text multiplied by lots of languages adds up fast. one of their services had over 2 million

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** Uber serves millions of translations per second, all from memory.
**Slide 2:** A translation is one piece of text, called a key, in one language.
**Slide 3:** In Go, the garbage collector checks every object in memory, and that costs CPU.
**Slide 4:** Uber's translation library was one of the top users of memory and objects across its Go services.
**Slide 5:** Fix one replaced four objects per translation with a plain map and one lock, for over 30% better CPU use.
**Slide 6:** The translations still took about 800MB, and every refresh briefly held two copies.
**Slide 7:** Fix two kept the popular translations in memory and moved the rest to disk.
**Slide 8:** Startup memory went from about 800MB to about 40MB.
**Slide 9:** About 1% of entries sit in memory, and over 99.9% of reads still come from memory.
**Slide 10:** All credit to Cristian Velazquez and Uber Engineering, and the full explainer is on my YouTube.

**Carousel caption:**
> how uber keeps millions of translations fast without running out of memory, explained simply. full video on YouTube, link in bio.
>
> #softwareengineering #systemdesign #golang #techexplained #uber

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> How Uber Serves Millions of Translations From Memory

### Subtitle:
> A simple walk through Uber Engineering's October 2026 post, and what a regular app can take from it.

### SEO Title:
> How Uber Serves Millions of Translations Per Second From Memory, Explained

### SEO Description:
> A plain explanation of Uber Engineering's "Translations at Scale" post, covering i18n, Go's garbage collector, the sync.Map fix, the memory and disk hybrid, and the real results.

---

On the 15th of October 2026, Uber Engineering published a post by Cristian Velazquez, a senior staff engineer there, called "Translations at Scale: Memory Optimization Techniques That Kept Uber's P99 Under 1ms." The first lines say that Uber serves millions of translations per second, and that "to save costs and reduce latency, we serve all these translations from memory." I read it twice, because it's a very good example of a problem most developers will never meet at that size, solved with ideas most developers can understand.

A translation, in an app, is one piece of text in one language. The code doesn't hold the words themselves. It holds a key, something like "order.placed," and the app looks up that key in the user's language. Developers call this internationalisation, or i18n, because there are 18 letters between the i and the n. Uber's post describes a translation as a key and a language together, so one key in ten languages counts as ten. In the service they use as an example, there were over 2 million of them.

Keeping all of that in memory is fast, but it isn't free, and Go makes the cost easy to see. Go has a garbage collector, which every so often checks the objects a program has created and frees the ones nobody uses. I think of it as a cleaner walking through a warehouse and checking every box. The more boxes there are, the longer the walk, and the walk costs CPU. Uber says garbage collection "continues to be a top consumer of compute for our Go services," and when they profiled memory across their fleet, the translation library was "one of the top contributors in terms of size and number of objects." In one translation service, 70% of the objects came from translations, and over 20% of the CPU went to garbage collection. Uber had built a GC tuning tool, GOGCTuner, back in 2021, but the post points out that it "does nothing when free memory is already low."

The first fix was about the number of objects. The translations were stored in a Go sync.Map, and in the way sync.Map worked before Go 1.24, storing one translation created four objects. The team moved to a plain map of strings guarded by a single RWMutex, a lock that lets many readers in at once and makes a writer wait. For that service, the post reports "over 30% improvement in CPU usage."

The memory itself was still high, though. A compressed translations file of about 150MB became about 800MB once it was loaded. Every couple of hours the service builds a fresh copy in the background and swaps it in, which is a safe way to refresh, but for up to a minute it holds two full copies, and in some services that meant running out of memory. Then came the observation that shaped everything after it. In the post's words, "the percentage of translations used was pretty low." The team considered moving translations to a separate service and rejected it for network overhead, latency and more chances of failure. They considered giving each service its own subset and rejected that for the maintenance cost.

What they built is a hybrid, "a small portion was in memory, everything else on disk," behind the same Get and Put functions the rest of the code already used. Every key stays in memory, but as a 6-byte hash. The first byte picks one of 256 shards, each with its own lock, its own in-memory entries and its own file on disk. The team checked the collision risk for 10 million keys and found that 6 bytes gave less than one expected collision, with a fallback to the original key for the couple of keys that do collide. Each entry ends up as 11 bytes, holding the hash, where the translation sits in memory if it's there, and where it sits on disk. A time-based LRU decides which translations stay in memory, and one detail I loved is that reading the clock on every access was adding 3 to 5% extra CPU, so a background task now keeps the current time in a shared value. On each refresh, only entries used in the last 15 minutes are preloaded, which stopped the hit ratio from dropping every couple of hours.

In the post's results, the store starts at about 40MB instead of about 800MB, which the post calls an over 90% improvement. With a cap of 50,000 items in memory, it usually sits between 80 and 120MB, and a refresh needs about 40MB extra instead of a second full copy. In the example service, about 30,000 of more than 4 million entries are in memory, around 1%, and over 99.9% of reads are still served from memory. The rare reads that go to disk have a p99 under 100 microseconds, and the service's memory went from about 2.7GB to about 750MB.

Most apps will never need any of this, and I don't want to pretend otherwise. If you're using Laravel, for example, translation files are only read the first time a request needs them, and with the usual PHP-FPM setup each request starts fresh. There are two places where it's worth a look, though. A JSON translation file like lang/fr.json is loaded whole on the first translation in that language, and Laravel's docs describe queue workers as long-lived processes that keep the app in memory between jobs. Uber closes with two lessons that apply at any size: "Create the smallest possible amount of references," and "Keep an eye on the total memory consumed and how often those objects are truly used." The second one is what I'm taking with me. Before you make something faster, find out how much of it anyone is using.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Software Engineering, Golang, System Design, Performance, Uber

---

## 11. REFERENCES & SOURCES

**1. The Uber post (primary source for every Uber fact in the kit)**
Cristian Velazquez, "Translations at Scale: Memory Optimization Techniques That Kept Uber's P99 Under 1ms," Uber Engineering blog, 15 October 2026. Read in full on 26 October 2026. https://www.uber.com/blog/translations-at-scale/
- "At Uber, we serve millions of translations per second." and "To save costs and reduce latency, we serve all these translations from memory." Supports Segments 1 and 2.
- GC "continues to be a top consumer of compute for our Go services," and in "memory profile analyses for our fleet," the translation library "was one of the top contributors in terms of size and number of objects." Supports Segments 1 and 3 and Gbemi's original wording.
- GOGCTuner "only helps by using all the memory available for the application" and "does nothing when free memory is already low." Supports Segment 3.
- "Over 20% of the service's CPU was consumed by GC." Figure 1: "Memory profile showing that 70% of the objects came from translations." Supports Segment 3.
- "a translation is a <key>-<language> combination," "over 2 million translations" in the example service. Supports Segment 2.
- sync.Map: "to store a single translation we require 4 objects to be created" (key pointer, entry pointer, the atomic pointer inside the entry, value pointer), and the post says it describes behaviour before Go 1.24. Supports Segment 4.
- Moved to "map[string]string with a RwMutex to support live updates," "over 30% improvement in CPU usage" for "the service in question." Supports Segment 4.
- "we reduced pointers, not the actual data being stored," compressed JSON "around 150MB," "memory consumption going up to 800MB," refreshes "every couple of hours," background build plus atomic swap, "double-consumption problem for up to one minute, which in some services translated to running out of memory." Supports Segment 5.
- "the percentage of translations used was pretty low." The external service was rejected for "higher costs due to overhead from network calls, higher latency, and higher chances of failures," and per-service subsets for "a higher maintenance cost, like having to update a key in many repositories." Supports Segment 5.
- "a small portion was in memory, everything else on disk." Same Get()/Put() API. 6-byte keys, first byte for 256 shards, "each shard has its own RWMutex, in-memory entries, and disk file." Supports Segment 6.
- Collision table for a 10 million key repository. 6 bytes: about 16% probability, about 0.177 expected collisions. 5 bytes: about 45 expected. "we keep a fallback mechanism that uses the key in its original format," and "only a couple of keys hit that path." Supports Segment 6.
- "11 bytes per entry" (6-byte key, 2-byte in-memory index, 3-byte disk offset). Supports Segment 6. (The post's CompressedOffsets detail, offsets divisible by 8 to reach "128MB per shard (32 GB total)", is left out of the script because it needs too much explaining for this audience.)
- "a global LRU, but time-based," storing "the last time an entry was accessed," getting the time "was adding 3-5% extra CPU," fixed with a background goroutine and an atomic time value. Preload of entries "used in the last 15 minutes," which fixed the hit ratio "going down (and disk latency was going up) every time we hit the refresh cycle." Supports Segment 6.
- Metrics: "initial size sitting at around 40MB (metadata only, an over 90% improvement)," "max memory items to be 50,000 which usually puts memory usage in the 80-120MB," "around 30,000 out of over 4 million (18Kx256), which translates to around 1%," "hit ratio is pretty high (over 99.9%)," "For the 0.1% of misses, our p99 latency is less than 100 µs," a chart with a mean of about 217 million memory hits per minute, Figure 12 "Memory went from ~2.7GB to ~750MB." The 40MB extra on reload is from the same section. Supports Segment 7.
- Conclusion: "Due to our scale, having unoptimized in-memory cache solutions across thousands of instances gets expensive," next steps on other memory-heavy caches and a possible generic solution, the two lessons quoted in Segment 8, and thanks to "the Internationalization team, who helped us with the reviews and approvals." Supports Segments 7 and 8.

**2. Uber's earlier GC post (context for GOGCTuner)**
Cristian Velazquez, "How We Saved 70K Cores Across 30 Mission-Critical Services (Large-Scale, Semi-Automated Go GC Tuning @Uber)," Uber Engineering, 22 December 2021. https://www.uber.com/blog/how-we-saved-70k-cores-across-30-mission-critical-services/
- Supports "Back in 2021, the same author wrote about a tool they built called GOGCTuner" in Segment 3.

**3. Laravel (12.x docs and framework source, checked 26 October 2026)**
- Localization docs: language files live in `lang/{locale}/*.php` or `lang/{locale}.json`, the `lang` folder is created with `php artisan lang:publish`, and `__('messages.welcome')` reads them. https://laravel.com/docs/localization
- Framework source, `Illuminate/Translation/Translator.php`: `load()` returns early if a group is already loaded and otherwise stores the lines in `$this->loaded`, so a group file is read the first time it's needed and kept for the life of that app instance. `get()` calls `$this->load('*', '*', $locale)` first, which loads the whole JSON file for that locale before looking at group files. Supports the lazy loading and the lang/fr.json lines in Segment 8. https://github.com/laravel/framework/blob/12.x/src/Illuminate/Translation/Translator.php
- Queues docs: "queue workers are long-lived processes and store the booted application state in memory." Supports the queue worker line in Segment 8. https://laravel.com/docs/queues
- PHP manual, `memory_get_peak_usage()`: returns the peak memory allocated to the PHP script. https://www.php.net/manual/en/function.memory-get-peak-usage.php

**4. Go**
- A Guide to the Go Garbage Collector, background for the "cleaner" explanation (the GC traces live objects through pointers, so fewer objects and pointers means less work): https://go.dev/doc/gc-guide
- sync.Map and sync.RWMutex package docs: https://pkg.go.dev/sync

**5. Corrections / careful wording**
- **"Uber has X languages."** The post doesn't say how many languages or what the translations are used for, so the script never gives a number. The "lots of text times lots of languages" reply is framed as general reasoning.
- **"Millions per second" vs the example service.** "Millions of translations per second" is Uber-wide. The 217 million hits per minute, 2 million translations, 800MB and 2.7GB figures are for the example services in the post. The script says "in the service they use as their example" or "in the service they show at the end" each time.
- **2 million vs 4 million.** The post says the earlier example service had "over 2 million translations," and the metrics section shows "over 4 million (18Kx256)" entries. The post doesn't say whether these are the same service, so the script keeps them apart and never adds them up.
- **"Over 90% less memory."** That figure is for the initial size (800MB to about 40MB of metadata). Typical use with the cap is 80 to 120MB. The script says "at startup" for the 90%, and gives the 80 to 120MB range separately.
- **"P99 under 1ms."** That's in the post's title. The body's specific number is the p99 for disk misses, "less than 100 µs," so the script uses that one.
- **Misses being promoted into memory.** The post's diagram mentions promoting keys to memory, but the text doesn't explain when. The script only says the popular translations stay in memory, which the text supports.
- **mmap, SSDs, compression on disk.** The post doesn't say how disk reads are done, so the script doesn't mention mmap or disk type.
- **sync.Map in Go 1.24.** The post says its sync.Map description is the pre-1.24 behaviour. The script says "the way sync.Map worked before Go 1.24," and the reply says Go 1.24 changed the internals without claiming more.
- **"The garbage collector checks every object."** It's a simplification for non-developers. Go's collector traces reachable objects through pointers, which is why the post's lesson is about the number of references. The cleaner analogy keeps that idea.
- **Laravel and Octane.** I didn't claim anything about how Laravel Octane handles translations, because I couldn't confirm it from the docs. Only queue workers are mentioned, using the docs' own wording.
- **The 1.6GB line.** "800 megabytes becomes about 1.6 gigabytes for that minute" is the post's "double-consumption" applied to its own 800MB figure. The post doesn't print 1.6GB, so if you want zero arithmetic on screen, say "two copies, so about double" instead.

---

## NOTES

- **New topic.** There's no older version of this kit.
- **Cross-links:** the database indexes video (hashing and lookups), "what happens when you send an API request" (Kit 15, for why a network call costs more than a memory read), the AI data centers water video (Kit 20, servers and what they cost to run), and HTTP status codes (Kit 13) if you want an end screen to another backend video.
- **Credit.** Cristian Velazquez and Uber Engineering are named in the script, description, LinkedIn, essay and X. Don't use Uber's logo on the thumbnail.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later.
- **Decided:** your own intro ("there's this thing I read about Uber") stays as Segment 1. The CompressedOffsets lines in Segment 6 are cut, because they needed too much explaining to follow on one listen. No clip depended on them.

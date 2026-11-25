# Refined kit: edge cases in software development, with the real bugs behind them

> **THE CURRENT KIT** for this video. Last updated: 2026-11-16 (LinkedIn post 6a from her draft).

Written 2026-11-02 by the social media strategist from your recording (`kit/transcripts/transcript.srt`, 8:23 raw, 7:47 after the cuts in `kit/transcripts/CLEANUP.md`) and your kit version 3 (now `../archive/original-kit/21-the-edge-case-you-think-is-impossible-kit.md`). The recording wins over the kit everywhere: titles, chapters, shorts and captions follow what you actually said. There is no BRIEF.md for this project; section 7e is the fact list, and every incident was re-checked on 2026-11-02. Everything usable from your kit (X posts, replies, essay, sources) is merged in sections 6 and 7. Nothing is built yet, so every file below is a plan.

## Upload checklist (do these in order)
1. **Export the video**: open http://localhost:7700/moment/the-edge-case-you-think-is-impossible/full/ , Export 16:9 at speed 1× (it lands in your Downloads).
2. **YouTube**: upload it; title **Edge Cases: Why Code That Passes Tests Still Breaks** (section 1a); description (1b) with the chapters re-timed to the exported file (1c); tags (1d); pinned comment (1e).
3. **Thumbnail**: `outputs/thumbnails/01-testing-vs-real-users.png` (section 2a). Test & Compare: add `06-your-app-will-break.png` and `05-test-these-before-you-ship.png`.
4. **Same day**: LinkedIn post (6a), X thread (6b), community post (6c), and short SH5 (null errors: Jennifer Null + the NULL plate; section 3). Export each short from its editor and pick the cover frame at 0:00 when you upload.
5. Then one short a day in the posting order at the top of section 3; the teaser on LinkedIn and X on day 2.

## Questions for Gbemi

1. **Wrong year at raw 4:58 ("On the 29th of February, 2019, Microsoft's cloud…").** The Azure outage was on 29 February 2012 (Microsoft's own summary says the code "calculated the valid-to date by simply taking the current date and adding one to its year", which gave "February 29, 2013": [Microsoft, Summary of Windows Azure Service Disruption on Feb 29th, 2012](https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/)). You correct it yourself 30 s later. **Recommendation:** cut "On the 29th of February, 2019," (raw about 297.9 to 301.7; there is a clean silence at about 301.4 to 301.75 before "Microsoft's", listen to the exact frame), so the sentence starts "Microsoft's cloud, Windows Azure, had an outage because of a leap year bug", and put a date card "29 Feb 2012" on screen. Nothing needs re-recording.
2. **Raw 4:46 restart ("Another one that is common, another thing that can cause very interesting edge cases situation in production is leap years").** No clean gap between the two starts. **Recommendation:** leave it in; the chapter card "Leap years" covers it.
3. **Raw 4:12 "There was another story, I was told at a conference…".** This sounds like you were at the conference. The story was told by the security researcher Joseph Tartaro (Droogie) at DEF CON 27 in August 2019 (his talk is on the official channel: [droogie, Go NULL Yourself, DEF CON 27](https://www.youtube.com/watch?v=TwRE2QK1Ibc); fines of about $12,000 reported by [Sophos Naked Security, 15 Aug 2019](https://news.sophos.com/en-us/2019/08/15/null-license-plate-gets-security-researcher-12k-in-tickets/)). Were you there? **Recommendation:** if not, keep your line (it is quick) but the on-screen card names "Joseph Tartaro (Droogie), DEF CON 27, 2019", and every caption says "a story told at DEF CON in 2019", never "I was told". The NULL short (SH6) starts after that phrase.
4. **Raw 0:22 to 0:30 "You don't even have to have a lot of users for edge cases that you didn't write for to exist"** is a little loose. **Recommendation:** keep it, it sounds like you.
5. **Raw 7:18 "Well, let me go."** (between the Hyrum's law quote and the online shop example). **Recommendation:** cut it (about 438.7 to 439.55, listen first). It is a little aside.
6. **Raw 7:56 "You can't undo every single one, right?"** The transcript hears "undo"; your kit guessed "handle". **Please listen at 476.5.** Captions use the word you actually said.
7. **Raw 0:21 "…exactly that edge case that you never thought you'd offer."** Probably "thought of". **Please listen at 21.0**; captions follow you.
8. **Your title pick from the kit was "Developing Software for Impossible Edge Cases" (45 characters).** It is in the list as title 6. People search "edge cases in software development" and "edge cases in software testing" with those words first (7b), so I recommend title 1 for search, and yours as the Test & Compare back-up title if you love it. Your call.
9. **Photos.** Every photo-led thumbnail is better with a photo of you without the mic (holding your phone and frowning at it, or at a laptop with a hand on your forehead, or holding a printed "NULL" plate). Can you take 3-4 in good daylight?
10. **Facts, all checked 2026-11-02 and correct as you say them** (details in 7e): Starbucks $15 became $20 (Egor Homakov's own write-up); Jennifer Null in the BBC in 2016; NULL plate and over $12,000 in fines; Azure 29 Feb 2012 (once the 2019 is cut); Tallinn clocks 29 March 2026 3 a.m. to 4 a.m. and 25 October 2026 4 a.m. back to 3 a.m. (checked with the time zone database); Adébáyọ̀ is 13 bytes; Hyrum's law in its exact words; Stripe's Idempotency-Key header.

**What you actually say vs your kit (the recording wins):**
- You say only "Edgar" (Egor Homakov), and you don't say he reported it and Starbucks fixed it. His name goes on the receipt card.
- You don't name DEF CON or Joseph Tartaro (question 3).
- You don't say Hyrum Wright worked at Google. You say "It's named after Hyrum Wright."
- You don't say the UTC tip for daylight saving; it stays on screen only.
- The Unicode fix is "count with a function that counts characters and normalize the text before it saves" (mb_strlen, grapheme_strlen and Normalizer are on screen only).
- Added by you: "Real users don't just always fill the form and click the button and wait", "Real users double-click, like ta-ta-ta-ta-ta", and your closing "If you want to wait till you predict every single one, you probably wouldn't ship anything."
- Your opening is "with everything that I have and everything that I hope" (the kit had "and I own").

## At a glance
| | |
|---|---|
| Topic | Eight edge cases that break real apps (double orders, race conditions, names like O'Brien and Null, a NULL license plate, a leap day bug, daylight saving time, Unicode names and Hyrum's law), with the real incidents behind them. |
| Recommended title | **Edge Cases: Why Code That Passes Tests Still Breaks** (51 characters; "edge cases" first; changed 2026-11-12 to pair with the new thumbnails). Back-up for pure search: "Edge Cases in Software Development (8 Real Examples)" (52). |
| Recommended thumbnail | **01 "Testing | Real users"** (`outputs/thumbnails/01-testing-vs-real-users.png`) with the recommended title. Test & Compare: add **06 "your app will break."** and **05 "Test these first"**. Section 2. |
| File to upload | The full talking-head edit: export it from http://localhost:7700/moment/the-edge-case-you-think-is-impossible/full/ (16:9, it lands in your Downloads). The motion film was dropped (2026-11-07). Chapters in 1c must be re-timed to that exported file. |
| Posting order | Evergreen, search-led video, no news window. 1. Long video + LinkedIn post (6a) + X thread (6b) + community post (6c), a weekday morning CET.  2. Same day: SH5 "Null errors in production" on Shorts, TikTok, Reels (strongest stranger story).  3. Day 2: SH1 "Duplicate orders from a double click" + teaser on LinkedIn and X.  4. Day 3: SH7 "The leap day bug that took down part of Azure".  5. Day 4: SH2 Starbucks, Instagram carousel.  6. Day 5: LinkedIn carousel.  7. Then one a day: SH3, SH9, SH4, SH8, SH10, SH11.  8. Independent shorts IS1-IS3 when recorded (IS3 is best saved for the week of 22 March 2027, before the clocks change on 28 March 2027). |
| Files | Thumbnails `outputs/thumbnails/` (built) · Shorts and teaser: export them from their editors (http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh01/ … sh11/ (no sh06: merged into sh05 2026-11-12), /teaser/) · Full edit: /full/ · Carousels: paused (your note 2026-11-08). |
| Where each platform's text is | YouTube title, description (chapters, sources, connect, hashtags), tags, pinned comment, first 30 seconds, edit notes: **section 1** · Thumbnails: **2** · Shorts (YouTube Shorts, TikTok, Reels, LinkedIn, X, per short) + independent shorts to record: **3** · Teaser bites + posts: **4** · Carousels: **5** · Main LinkedIn post, X thread, community post, more X posts, replies, essay: **6** · Research: **7** |
| Open questions | 1. Cut the wrong "2019" (recommended yes). 2. Leave the 4:46 restart (recommended). 3. Were you at DEF CON? (recommended: credit Tartaro on screen). 4. Keep 0:22 line (yes). 5. Cut "Well, let me go" (yes). 6-7. Listen at 476.5 ("undo") and 21.0 ("offer"). 8. Title 1 or your own title. 9. Photos without the mic. Full list above. |

## 1. YouTube

### 1a. Titles
**2026-11-12: new recommended title "Edge Cases: Why Code That Passes Tests Still Breaks"** (51) to pair with thumbnail 09. Every new thumbnail's titles are in section 2b; the story titles below (NULL plate, Woman Named Null) no longer have a thumbnail that matches, so use them only with a new picture.

All counted by code (7f): 40 to 60 characters; for search-led titles the main keyword ends inside the first 40 characters. Why search leads: the exact phrases people type start with "edge cases in software…" (YouTube's own top suggestion is "edge cases in software testing", Google adds "…development" and "…engineering"), and the one plain "importance of considering edge cases in software engineering" video from a 90-view channel has 4,249 views, 47 times its usual (7c). Story titles (NULL plate, leap day) are where the big outliers are, so they lead the click-led side and the shorts.

| # | Title | Characters | Type | Pairs with thumbnail | Cold score |
|---|---|---|---|---|---|
| 1 | Edge Cases in Software: A License Plate Called NULL | 51 | **recommended**, search-led + story ("edge cases in software" ends at 22). **Test & Compare A** | TH2 | 8 (as "A License Plate Called NULL and 7 More Edge Cases") |
| 2 | A Woman Named Null and 7 Other Bugs That Break Apps | 51 | click-led. **Test & Compare B** | TH5 | 8 (grammar fixed after review) |
| 3 | Famous Software Bugs Explained: NULL, Leap Day and More | 55 | search-led ("famous software bugs" ends at 20). **Test & Compare C** | TH3 | 7 |
| 4 | Edge Cases in Software Development (8 Real Examples) | 52 | search-led back-up (the exact suggestion, ends at 34) | TH1, TH2 | 5 (reads like a syllabus) |
| 5 | Edge Cases in Software Testing: 8 Bugs Real Users Find | 54 | search-led (YouTube's top suggestion) | TH10 | 6 |
| 6 | What Is an Edge Case in Programming? 8 Real Examples | 52 | search-led | TH1 | 5 |
| 7 | A License Plate Called NULL and 7 More Edge Cases | 49 | click-led | TH2 | 8 |
| 8 | Your Users Will Find the Bug You Said Was Impossible | 52 | click-led (developers only) | TH4 | 6 |
| 9 | Developing Software for Impossible Edge Cases | 45 | your pick from your kit (keyword ends at 45, so not the search title) | TH1 | 3 (vague to a stranger) |

Dropped after the cold review: "Race Conditions and Idempotency Keys With Real Bugs" (3, jargon), "Software Edge Cases Every Developer Should Know" (5), "The Edge Case You Think Is Impossible Will Happen" (5), "8 Edge Cases That Break Real Apps (With Real Stories)" (6), "Real Users Double Click: 8 Edge Cases That Break Apps" (5). The reviewer's rule for this video: titles that name one odd, real thing (a NULL plate, a woman named Null, a leap day) win; titles that lead with the category word "edge cases" lose with anyone who is not already a developer. Title 1 keeps the exact search words first and the story second, so it serves search and the click.

Not used: anything with "How to Fix Them" (you give fixes for three of the eight, so it would over-promise), "insane", "shocking".

### 1b. Description
```text
Edge cases in software development are the situations you were sure no user would ever end up in, and someone always reports them. In this video I go through 8 edge cases that break real apps, with the real stories behind them.

We start with what real users actually do (double click, open two tabs, lose their network halfway), then duplicate orders and idempotency keys, race conditions (the Starbucks gift card bug and the last item in stock), names that break your app (O'Brien and Jennifer Null), the NULL license plate, the leap day bug that took down part of Azure in 2012, daylight saving time in Tallinn, Unicode and the name Adébáyọ̀, and Hyrum's law.

What is the craziest edge case anyone has ever reported to you? Tell me in the comments.

CHAPTERS
0:00 Edge cases real users will find
1:05 Duplicate orders and idempotency keys
2:03 Race conditions (the Starbucks bug)
3:07 Names and NULL (O'Brien, Jennifer Null, the NULL plate)
4:27 Leap years and daylight saving time
5:54 Unicode names and Hyrum's law

SOURCES AND FURTHER READING
Stripe docs, Idempotent requests: https://docs.stripe.com/api/idempotent_requests
Egor Homakov, Hacking Starbucks for unlimited coffee (2015): https://sakurity.com/blog/2015/05/21/starbucks.html
Chris Baraniuk, The names that break computer systems, BBC Future (2016): https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems
OWASP, SQL Injection Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
Joseph Tartaro (droogie), Go NULL Yourself, DEF CON 27 (2019): https://www.youtube.com/watch?v=TwRE2QK1Ibc
Sophos Naked Security, NULL license plate gets security researcher $12k in tickets (2019): https://news.sophos.com/en-us/2019/08/15/null-license-plate-gets-security-researcher-12k-in-tickets/
Microsoft, Summary of Windows Azure Service Disruption on Feb 29th, 2012: https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/
EU summer-time rules (Directive 2000/84/EC): https://eur-lex.europa.eu/eli/dir/2000/84/oj
PHP manual, mb_strlen: https://www.php.net/manual/en/function.mb-strlen.php
PHP manual, Normalizer: https://www.php.net/manual/en/class.normalizer.php
Hyrum Wright, Hyrum's Law: https://www.hyrumslaw.com/

CONNECT WITH ME
LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
X: https://x.com/OladetounGee
Instagram: https://www.instagram.com/officialgbemmy/
Website: https://www.gbemisolaoladetoun.com/

#softwareengineering #webdevelopment #programming
```

### 1c. Chapters
Six chapters, because the video is a clear list of edge cases with a short intro. Times are for the **cleaned edit** (the raw recording minus the 6 cuts in CLEANUP.md; cleaned time = raw time minus the length of every cut before it, worked out with code), not for any exported file. **They must be re-timed to the exported `outputs/talking-head/talkinghead-full_16x9.mp4`** once it exists (find each start line in that file's .srt). If question 1 and 5 trims are made, chapters 5 and 6 move about 3.8 s and 4.6 s earlier.

| # | Chapter | Starts on (her words) | Raw | Cleaned edit |
|---|---|---|---|---|
| 1 | Edge cases real users will find | "If you're a software developer, I want you to think of the craziest edge cases in the world" | 0:02.18 | 0:00 |
| 2 | Duplicate orders and idempotency keys | "One of the most common edge cases in production is the duplicate submission" | 1:07.60 | 1:05 |
| 3 | Race conditions (the Starbucks bug) | "Another common edge case in production is a race condition" | 2:06.10 | 2:03 |
| 4 | Names and NULL (O'Brien, Jennifer Null, the NULL plate) | "A lot of edge cases… can also happen with names" | 3:15.80 | 3:07 |
| 5 | Leap years and daylight saving time | "Another one that is common… is leap years" | 4:46.90 | 4:27 |
| 6 | Unicode names and Hyrum's law | "Another common edge case is the Unicode bug" | 6:21.10 | 5:54 |

### 1d. Tags
```text
edge cases in software development, edge cases in software testing, what is an edge case in programming, edge cases, software edge cases, race condition explained, idempotency key, idempotency in rest api, duplicate orders, sql injection explained, null license plate, jennifer null, leap year bug, azure leap day bug, daylight saving time bug, unicode bug, hyrum's law, famous software bugs
```

### 1e. Pinned comment
```text
What's the craziest edge case anyone has ever reported to you? The one you were sure no user would ever end up in. I want to read them all 👀
```

### 1f. First 30 seconds of the edit
- **Opening line (kept where it is):** raw 0:02.18 "If you're a software developer, I want you to think of the craziest edge cases in the world. The one thing that you thought, oh yeah, there's no way a user would navigate and navigate and navigate and end up in this kind of situation." It names the topic (edge cases) and the viewer in one breath, so nothing needs to move. The false start (0:00 to 0:02.18) is cut.
- **Hook type:** call-out plus a promise (SOCIAL-PLAYBOOK "Call-out" + "Uncomfortable truth about you"): "I promise you, with everything that I have and everything that I hope, someone is going to report an issue" (raw 0:12.96).
- **0 to 3 s on screen:** spoken "If you're a software developer…"; on screen the words **EDGE CASES** huge (the film's display type) with a cursor clicking a "Place order" button three times fast, a counter under it going "Orders: 1, 2, 3"; a slow push-in on you. Sound: three mouse-click sounds on the clicks, then a soft error buzz. That is three hooks stacked (sentence, words, motion + sound).
- **3 to 22 s:** you on screen; at "someone is going to report an issue" (raw 0:15.2) a generic bug-report card slides in from the right ("New issue: customer charged twice", made-up, generic, no real brand).
- **22 to 30 s, the open loop:** over "It doesn't even have to be something big. You don't even have to have a lot of users…" (raw 0:22.6 to 0:31.0), a 2-second fast montage of the four receipts the video will reach (the NULL plate, a "29 FEB" calendar page, a sign-up form saying "Surname is required" under the name Null, "Adébáyọ̀ = 13?"), each 0.5 s, with a camera-shutter sound on each. The loop: "how does a license plate, a leap day and a surname break an app?" The video answers each one later (3:07, 4:27, 5:54).
- **Format:** talking head with receipts and half-screen running-example graphics (nandini_mpe receipts + kodekloud-style drawings beside you, never without you).

### 1g. Edit notes for the editor
**One running example:** the online shop she uses all through ("in our online shop", raw 1:11, 2:49, 6:06, 7:19). Build one generic shop (made-up name, e.g. a plain "shop" wordmark, no real brand) with one product card, a "Place order" button, a stock counter "1 left", an orders table and a "daily sales report" job. Every section reuses it: double click creates two rows in the orders table; two buyers hit "1 left"; the report clock for daylight saving; the API list for Hyrum's law.

**Receipts within 5 s of each claim (real pages, with a small source credit):**
| Raw | Her words | Receipt on screen |
|---|---|---|
| 1:58.7 | "Stripe's API uses the same idea with an idempotency key header" | Stripe docs page, "Idempotent requests", `Idempotency-Key` highlighted: https://docs.stripe.com/api/idempotent_requests |
| 2:21.2 | "this researcher called Egor… in Starbucks gift cards" | Egor Homakov's blog post title + "3 Starbucks cards $5 each" and "(20 in total)" highlighted: https://sakurity.com/blog/2015/05/21/starbucks.html (card says "Egor Homakov, Sakurity, 2015") |
| 3:45.8 | "the BBC wrote about a woman called Jennifer Null" | BBC Future headline "The names that break computer systems" (25 March 2016) + the Jennifer Null paragraph highlighted |
| 3:42 | "that will be SQL injection" | OWASP SQL Injection Prevention Cheat Sheet header |
| 4:15 | "a security researcher got a personal license plate in California that said NULL" | a still from the DEF CON 27 talk "Go NULL Yourself" (official DEF CON YouTube, credit "DEF CON 27, droogie") + Sophos headline "$12k in tickets" |
| 5:01 | "Microsoft's cloud, Windows Azure, had an outage" | Microsoft's summary page, the sentence "adding one to its year" highlighted |
| 5:47 | "In Estonia where I live, the clock changes twice in a year" | a time zone table (timeanddate.com Tallinn page or our own drawn clock), "29 Mar 2026 03:00 → 04:00" and "25 Oct 2026 04:00 → 03:00" |
| 6:57 | "Hyrum's law… named after Hyrum Wright" | hyrumslaw.com page with the quote highlighted |

**Black phrase cards** (pure black, one accent serif, her own words, 0.5-1.8 s each):
| Raw | Phrase (hers) |
|---|---|
| 1:05.3 | "They are just being users." |
| 1:52.6 | "doing something twice has the same result as doing it just once" |
| 3:03.0 | "now we have sold an item that we do not have" |
| 5:31.6 | "that date doesn't exist" |
| 5:54.8 / 6:06.0 | "3:30 never happened" / "3:30 happened twice" (two flashes) |
| 8:03.5 | "you probably wouldn't ship anything" |

**Code on screen (she never reads code):** `UPDATE products SET stock = stock - 1 WHERE id = 42 AND stock > 0` with "0 rows updated = sold out" (raw 3:08); a query string with `'O'Brien'` breaking (3:27); `29 Feb 2012 + 1 year = 29 Feb 2013 ✗` (5:25); `strlen("Adébáyọ̀") // 13` vs `grapheme_strlen // 7` (6:33); `Idempotency-Key: <uuid>` (1:58).

**Pexels (search words only, key at ~/.config/pexels/key; do not download in this task):** "clicking mouse close up" (1:15 double click), "person on phone train" (1:28 network drops), "gift card coffee" (2:26; no Starbucks logo in frame), "airport check in kiosk" (3:49 plane ticket), "parking ticket windshield" (4:22), "calendar february" (4:57), "Tallinn old town night" (5:47), "clock change" (5:54), "name tag sticker" (6:22).

**Recording-vs-kit fixes on screen:** "29 Feb 2012" card over the Azure line (question 1); "Joseph Tartaro (droogie), DEF CON 27, 2019" card on the NULL story (question 3); "Egor Homakov" on the Starbucks card; "schedule in UTC" as a small tip line on the daylight saving card (never spoken); a number "1" to "8" chip in the corner as each edge case starts (helps the "8 Real Examples" title).

## 2. Thumbnails
**Set 4 (2026-11-13, font-board pass).** Eight thumbnails, each copying a DIFFERENT composition from your thumbnail board (studio /ideas/boards/thumbnails/, "Thumbnails N"), with fonts ONLY from the font board, used in their own colours (same font + text colour + ground as the board item). Only one is "words left / you right" (02). Mix: split 1, flat 2 (one without your face), your room photo 4, collage 1. Your shoot photos (white tee, red headband) through Enhance photo, your face untouched. 01 is your favourite from set 3 (was 09) with your moves and words kept; only its fonts and colours moved to the board's (green #21F587 + ink, Design 270; black + white + red, Design 20); its quiet line pattern is gone. Set 3 and the two dropped set-4 drafts ("bugs your tests miss" 6.5-7.5, "tests pass. app breaks." 7) are in the Bin (`~/.Trash/edge-thumbnails-set3-2026-11-13/`).
A fresh reviewer saw only the PNGs, 5 rounds; scores are "alone / with its title" (8 = post as is). Edit them at http://localhost:7700/design/the-edge-case-you-think-is-impossible/thumbnails/ (all on one page: `outputs/thumbnails/overview.png`; each beside its board item: `outputs/_review/thumbnails-vs-board.jpg`).

### 2a. Upload this pair
**Thumbnail 01 "Testing | Real users" + title "Edge Cases: Why Code That Passes Tests Still Breaks"** (51 characters, "edge cases" first).

![](../outputs/thumbnails/01-testing-vs-real-users.png)

**YouTube Test & Compare** (same title): add **06 "your app will break."** (8 / 8.5) and **05 "Test these first"** (8 / 8.5).

### 2b. All 8
| # | Words on it | Picture | Copies | Font (font board) | Score | Titles |
|---|---|---|---|---|---|---|
| 01 | TESTING \| REAL USERS | split (green / black), her in the middle | Thumbnails 55 + 66 (before \| after) | combo-22 + pair-03 Inter Tight Black | 8 / 8.5 | Edge Cases: Why Code That Passes Tests Still Breaks · Why Code That Passes Tests Still Breaks (Edge Cases) |
| 02 | CLICKED TWICE? · 1 click = 1 order / 2 clicks = paid twice | flat orange, you point from the right | Thumbnails 82 | design-02 Big Shoulders Display | 8 / 8.5 | Why Users Get Charged Twice (Edge Cases Explained) · Edge Cases: Why Code That Passes Tests Still Breaks |
| 03 | PASSED ALL TESTS / STILL BROKEN | your room, a line on top and one at the foot | Thumbnails 101 | thumbs-18 Montserrat ExtraBold | 7 / 7.5, then recropped (not re-scored) | Your Code Passed Every Test. Why Is It Still Broken? (Edge Cases) · Why Code That Passes Tests Still Breaks (Edge Cases) |
| 04 | the leap year bug. (a February 29 calendar page) | one object on black, no face | Thumbnails 47 | design-13 Switzer | 7.5 / 8 | The Leap Year Bug and 7 Other Edge Cases That Break Apps · Edge Cases: 8 Real Bugs That Broke Apps |
| 05 | Test these first · Double click / Two tabs open / 29 February | hand-drawn list on blue, you on the left | Thumbnails 63 | design-20 Permanent Marker | 8 / 8.5 | Edge Cases Every Developer Should Test Before Shipping · What Is an Edge Case? 8 Real Examples |
| 06 | your app will break. (+ O'Brien: invalid name, Sold twice) | collage over your room, you in the middle | Thumbnails 117 | thumbs-09 Inter Tight + red box | 8 / 8.5 | Edge Cases in Software: Why Your App Will Break · Edge Cases Developers Miss: 8 Real Bugs That Broke Apps |
| 07 | IT WORKED IN TESTING. | your room, you left, a card right | Thumbnails 97 | design-10 Inter Tight Black | 7.5 / 8.5, then a closed-mouth photo (not re-scored) | It Worked in Testing: Edge Cases That Break Real Apps · Edge Cases: Why Code That Passes Tests Still Breaks |
| 08 | "That will never happen." (+ New bug report) | your photo left, a serif quote right | Thumbnails 48 | thumbs-05 Libre Baskerville | 7.5 / 8.5, then the stray hand cropped (not re-scored) | Your Users Will Find the Bug You Said Was Impossible · Edge Cases in Software: 8 Times "Never" Happened |

**01** `outputs/thumbnails/01-testing-vs-real-users.png`

![](../outputs/thumbnails/01-testing-vs-real-users.png)

**02** `outputs/thumbnails/02-clicked-twice.png`

![](../outputs/thumbnails/02-clicked-twice.png)

**03** `outputs/thumbnails/03-passed-tests-still-broken.png`

![](../outputs/thumbnails/03-passed-tests-still-broken.png)

**04** `outputs/thumbnails/04-the-leap-year-bug.png`

![](../outputs/thumbnails/04-the-leap-year-bug.png)

**05** `outputs/thumbnails/05-test-these-before-you-ship.png`

![](../outputs/thumbnails/05-test-these-before-you-ship.png)

**06** `outputs/thumbnails/06-your-app-will-break.png`

![](../outputs/thumbnails/06-your-app-will-break.png)

**07** `outputs/thumbnails/07-it-worked-in-testing.png`

![](../outputs/thumbnails/07-it-worked-in-testing.png)

**08** `outputs/thumbnails/08-that-will-never-happen.png`

![](../outputs/thumbnails/08-that-will-never-happen.png)

## 3. Shorts
Posting order (2026-11-12, 10 shorts): SH5, SH1, SH7, SH2, SH3, SH9, SH4, SH8, SH10, SH11 (strongest stranger stories first), then IS1-IS3 when recorded. All shorts have you on camera (no faceless shorts, her rule 2026-11-02). **Built 2026-11-10 in a mix of 11 formats** (each used once: A B C D F G H I J K M; see the Format line in each block), each with a designed cover as its first frame, and each ends on our "Full video on YouTube" card (your thumbnail 01 + the title, Subscribe, Like). The "Format" lines below replace the old plans. Raw times are from `kit/raw-video.mov`; ends are at the next word minus 0.03 s (whisper word times run about 0.3 s late, so snap every in/out to the nearest silence).


**Font-board pass (2026-11-13).** Every short and the teaser now use ONLY fonts from the font board, each in its own colours (wording, layout, speech, sound and your edits unchanged; DM Serif Display is gone). Graphics inside the panels keep the lime / ink field in Inter Tight (it is the board's Design 394 pair) with DM Mono (Design 353) for code and small labels. A line break you type in a cover or title (Shift+Enter) is now a real line break (never re-wrapped, only shrunk); SH1's cover now breaks by hand: "Ever been charged twice / for one order? / (duplicate submission)". The lime cards no longer carry the fine line pattern.

| Short | Board formats ("Formats N") | Fonts (font board) | Cover line |
|---|---|---|---|
| SH01 | 16, 66, 8 | Gloock (rust red on black, Design 391) for the cover line + Montserrat ExtraBold caps captions, yellow key word (Formats 2) (design-18 + shorts-01) | Ever been charged twice / for one order? / (duplicate submission) |
| SH02 | 12, 40, 5 | Inter Tight Black on lime / ink (Design 394) for the cover; Inter Tight white on black in the letterbox (Design 20) (combo-02 + pair-03) | Hacking Starbucks gift cards with a race condition |
| SH03 | 68, 31, 9 | Six Caps rust on cream (Design 377) for the cover + title; Inter Tight captions (design-01 + pair-04) | What is a race condition? |
| SH04 | 38, 64, 65 | Poppins Bold white, red key word, on #2A2522 (Thumbnails 84): cover, the screen behind you, captions (thumbs-10) | Names can break your database |
| SH05 | 24, 69, 17 | Inter Tight Black white + red box on black (Thumbnails 68) for the cover + captions; TikTok Sans in the white title box (Formats 24) (thumbs-09 + shorts-05) | Null errors in production |
| SH07 | 47, 45, 40 | Anton white + red box (Thumbnails 113) for cover + title; Libre Baskerville white captions (Formats 45) (thumbs-16 + shorts-21) | Leap year bugs |
| SH08 | 52, 67, 19 | Montserrat ExtraBold white + yellow (Thumbnails 162) for cover + tag; Newsreader white on black boxes (Formats 52) for the subtitles (thumbs-18 + shorts-11) | Daylight saving time can break your code |
| SH09 | 42, 65, 10 | Inter Tight Bold white + yellow highlight (Thumbnails 21) (thumbs-02) | Names with accents can cause bugs |
| SH10 | 5, 47, 22 | Big Shoulders Display black on orange (Design 397): cover, the poster above you, captions (design-02) | What is Hyrum’s law? |
| SH11 | 2, 34, 51 | Bagel Fat One pink on black (Design 371) for cover + title; Inter Tight captions (pair 14) (design-15 + pair-14) | Real users double-click: edge cases you must test |

### SH1 · Duplicate orders from a double click
File `outputs/shorts/sh01-duplicate-orders_9x16.mp4` (built; you export it from its editor) · about 56 s · no title on screen (her first line names the topic) · from 1:11.40 to 2:06.21 (raw; starts on the shop story, cold review 2026-11-02 scored the old "One of the most common edge cases…" opener 5, "opens like a lecture"), cutting "Idempotence, like that." (about 1:47.2 to 1:49.6, listen)
Hook (first line she says): "If, for example, in an online shop, someone clicks place order, and maybe the page feels a little slow, they click it again."
Format: **I · Pop-up cards over her** (2026-11-10 mix; the old plan is replaced). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh01/ . Cover: "Why your app charges twice" (your still, the line above your head; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Duplicate orders from a double click (idempotency key)

Description: Someone clicks Place order, the page feels slow, and they click again. Now your server has two orders and maybe two charges. Disabling the button only covers the double click, and an idempotency key covers the retry too.

#Shorts #webdevelopment #backend #api #softwareengineering

Tags: duplicate orders, double click bug, double submit, idempotency key, idempotency key in rest api, idempotency in api, what is idempotency, stripe idempotency key, prevent duplicate requests, edge cases in software development, payment double charge, backend development, api design, web development, software engineering
```
**TikTok**
```text
someone clicks place order, the page feels slow, they click again, and now there are two orders and maybe two charges 😅 disabling the button only fixes the double click. this is what an idempotency key is for
#webdev #backend #api #coding #techtok
```
**Instagram Reels**
```text
A customer clicks Place order, the page feels a little slow, and they click it again. Now your server gets two requests and creates two orders, and if you charge on each order, you charge them twice.

It doesn't even need a double click. The phone can lose the network after the request was sent and the app retries. Disabling the button helps with the double click, but it does nothing for a retry or a second tab. The common fix is an idempotency key, so doing something twice has the same result as doing it once. Stripe's API uses the same idea.

Full video on YouTube, link in bio
#webdevelopment #backend #api #softwareengineering #coding
```
**LinkedIn**
```text
One of the most common edge cases in production is the duplicate submission.

Someone clicks "Place order" in an online shop, the page feels a little slow, and they click it again. Now the server gets two requests and creates two orders, and if we charge on each order, we charge the user twice.

It doesn't even need a double click. A phone can lose the network after the request was sent and the app retries, or someone refreshes and says yes when the browser asks to send the form again. Disabling the button helps with the double click, but it does nothing for a retry or a second tab.

The common fix is an idempotency key, which makes doing something twice have the same result as doing it once. Stripe's API uses the same idea with an Idempotency-Key header, so a retried request doesn't create a second payment.

Have you ever had a duplicate order show up in production?

#softwareengineering #backend #api #webdevelopment
```
**X**
```text
someone double clicks "place order" because the page felt slow, and now there are two orders and maybe two charges. disabling the button doesn't stop a network retry or a second tab. an idempotency key does
```

### SH2 · Starbucks gift card race condition
File `outputs/shorts/sh02-starbucks-race-condition_9x16.mp4` (built; you export it from its editor) · about 36 s · title on screen "Starbucks gift cards had a race condition bug" · from 2:21.08 to 2:48.41 (raw; starts on the story, the old "Another common edge case…" opener scored 4)
Hook: "[There] was this researcher called Egor that found one of these race conditions in Starbucks gift cards." (the take after the retake; if "There" is lost in the cut, the label carries it)
Format: **G · Letterbox (her whole frame, title above)** (2026-11-10 mix; the old plan is replaced). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh02/ . Cover: "The Starbucks bug that made free money" (your still, the line above your head; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: The Starbucks gift card race condition ($15 became $20)

Description: A race condition is when two things happen at the same time and your code assumed they would happen one after the other. In 2015 a researcher sent the same Starbucks gift card transfer twice at the same moment, and both went through.

#Shorts #racecondition #softwareengineering #cybersecurity #backend

Tags: race condition, race condition explained, race condition vulnerability, starbucks race condition, starbucks gift card bug, egor homakov, race condition example, concurrency bug, what is a race condition, famous software bugs, edge cases in software development, bug bounty, backend development, software engineering
```
**TikTok**
```text
a race condition is two things happening at the same time when your code expected them one after the other. a researcher sent the same starbucks gift card transfer twice at once and $15 turned into $20
#racecondition #coding #cybersecurity #softwareengineering #techtok
```
**Instagram Reels**
```text
A race condition is when two things happen at the same time and your code just assumes they would happen one after the other.

In 2015, a researcher called Egor Homakov had Starbucks gift cards worth $15 in total. He sent the same balance transfer twice, at the same time, from two different sessions. Both transfers went through, and his cards ended up with $20 between them. Each request checked the balance, saw there was enough money, and moved it, and neither one waited for the other to finish.

Full video on YouTube, link in bio
#racecondition #softwareengineering #cybersecurity #backend #coding
```
**LinkedIn**
```text
A race condition is when two things happen at the same time, and your code assumed they would happen one after the other.

In 2015, the researcher Egor Homakov had Starbucks gift cards worth $15 in total. He sent the same balance transfer twice, at the same moment, from two different sessions. Both transfers went through, and his cards ended up with $20 between them.

Each request checked the balance, saw that there was enough money, and moved it. Neither request waited for the other one to finish. He wrote about it on his blog, and I love it as an example because there is nothing clever about it. Two requests, same time.

The same thing can happen in our own apps, anywhere we check something and then change it in two separate steps.

Where would a race condition hurt most in what you're building?

#softwareengineering #backend #cybersecurity #webdevelopment
```
**X**
```text
in 2015 a researcher sent the same starbucks gift card transfer twice at the exact same moment. both went through and $15 became $20. that's a race condition
```

### SH3 · Race condition: two buyers, one item left
File `outputs/shorts/sh03-race-condition-last-item_9x16.mp4` (built; you export it from its editor) · about 36 s · title on screen "Race condition: two buyers, one item left" · from 2:50.08 to 3:15.10 (raw, ends on "sold out"; starts on "For example, in our online shop…", so it no longer shares an opener with SH2)
Hook: "For example, in our online shop, say we have one item left in stock, two people click buy in the exact same second."
Format: **D · Captions on top (the title flashes first)** (2026-11-10 mix; the old plan is replaced). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh03/ . Cover: "What is a race condition?" (a colour card with your cut-out; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Race condition explained: two buyers, one item left

Description: Two people click buy on the last item in the exact same second. Both requests check the stock, both see one item left, and both create an order. This is how you make sure only one of them gets it.

#Shorts #racecondition #database #backend #softwareengineering

Tags: race condition explained, race condition, race condition in database, overselling bug, last item in stock, concurrency explained, sql update where stock, how to prevent race conditions, race condition example, edge cases in software development, ecommerce bugs, backend development, database, system design, software engineering
```
**TikTok**
```text
two people click buy on the last item in the same second. both check the stock, both see one left, both get an order, and now you've sold something you don't have 🫠
#racecondition #backend #database #coding #techtok
```
**Instagram Reels**
```text
Say an online shop has one item left in stock, and two people click buy in the exact same second. Both requests check the stock, both see one item left, both create an order, and now the shop has sold an item it does not have.

That is a race condition. If the two requests arrive at the same time, only one of them should be able to take the last item, and the other one gets zero rows updated. That is how you know it is sold out.

Full video on YouTube, link in bio
#racecondition #database #backend #softwareengineering #webdevelopment
```
**LinkedIn**
```text
Two people click buy on the last item in stock in the exact same second. What happens in your app?

If the code checks the stock first and then creates the order, both requests check, both see one item left, and both create an order. Now we have sold an item we do not have. That is a race condition, two things happening at the same time when the code assumed one after the other.

The fix I talk about is to let the update itself decide. Take one from the stock only if the stock is more than zero, in one step. If two requests arrive together, only one of them can take the last item, and the other one gets zero rows updated, which is how you know it's sold out.

Has your shop or app ever oversold something?

#softwareengineering #backend #database #webdevelopment
```
**X**
```text
two people click buy on the last item in the same second. both check the stock, both see 1 left, both get an order. if the update itself only takes stock WHERE stock > 0, one of them gets 0 rows updated and that's your "sold out"
```

### SH4 · O'Brien: the name that breaks SQL queries
File `outputs/shorts/sh04-obrien-sql_9x16.mp4`: export it from its editor · about 25 s · from 3:15.60 to 3:45.60 (raw), cutting "because we sometimes build names featuring like default names" (3:20.50 to 3:25.07, in silence), so it goes from "…can also happen with names" straight to "Take the name O\'Brien" (your note 2026-11-12)
Hook: "A lot of edge cases in production can also happen with names." (then "Take the name O'Brien, for example.")
Format: **J · Slide behind her**; the screen behind you stays dark until you say "O\'Brien", then the name types on your word (your note 2026-11-12). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh04/ . Cover: "Names can break your database" (your still, the line above your head). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Why the name O'Brien can break your SQL query

Description: The apostrophe in O'Brien is the same character that starts and ends a piece of text in SQL. If your code glues a name straight into a query, the query breaks, and someone can type something after that apostrophe on purpose. That is SQL injection.

#Shorts #sql #sqlinjection #cybersecurity #webdevelopment

Tags: sql injection explained, sql injection, o'brien sql, apostrophe in sql, names that break computers, sql injection explained simply, prepared statements, parameterized queries, input validation, edge cases in software development, web security, backend development, database, software engineering
```
**TikTok**
```text
the apostrophe in O'Brien is the same character that ends a piece of text in SQL. glue the name straight into a query and it breaks. and if one apostrophe can break it by accident, someone can break it on purpose
#sql #sqlinjection #cybersecurity #coding #techtok
```
**Instagram Reels**
```text
Take the name O'Brien. The apostrophe is the same character that starts and ends a piece of text in SQL, so if your code glues the name straight into the query, the apostrophe ends the text early and the query breaks.

And if an apostrophe can break your query by accident, someone can type something after the apostrophe on purpose. That is SQL injection.

Full video on YouTube, link in bio
#sql #sqlinjection #cybersecurity #webdevelopment #coding
```
**LinkedIn**
```text
A user called O'Brien can break your SQL query without trying.

The apostrophe in the name is the same character that starts and ends a piece of text in SQL. So if the code glues the name straight into the query, the apostrophe ends the text early and the query breaks.

And if one apostrophe can break a query by accident, it means someone can type something after the apostrophe on purpose. That is SQL injection, and it is why we pass values to the database separately instead of building the query as one string.

Does your test data have an O'Brien in it?

#softwareengineering #cybersecurity #sql #webdevelopment
```
**X**
```text
the apostrophe in O'Brien ends a piece of text in SQL. if your code glues names straight into the query, O'Brien breaks it by accident, and someone else can break it on purpose
```

### SH5 · Null errors in production (Jennifer Null + the NULL licence plate; was SH5 and SH6)
File: export it from its editor (2026-11-12: your old SH5 and SH6 are one short now, both are about null) · about 50 s · title box on screen "Null errors in production" · from 3:45.73 to 4:46.70 (raw), trimming the pause 3:49.26 to 3:52.72 and cutting the retake 4:28.02 to 4:35.77
Hook: "In 2016, the BBC wrote about a woman called Jennifer Null."
Format: **M · TikTok title box**. Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh05/ . Cover: "Null errors in production" (big line on lime, no picture, like SH3; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Null errors in production: two real stories

Description: When Jennifer Null tries to buy a plane ticket, most websites tell her she left the surname field blank. A security researcher got a licence plate that said NULL and then over $12,000 in parking fines that were not his. Null means no value in code, and it catches almost everyone.

#Shorts #softwareengineering #programming #webdevelopment #bugs

Tags: null errors in production, null value bug, what is null in programming, jennifer null, null license plate, null license plate tickets, def con null, null in sql, names that break computer systems, famous software bugs, edge cases in software development, database bugs, software engineering
```
**TikTok**
```text
null means no value in code. so a woman called Jennifer Null can't buy a plane ticket online, and a guy with a NULL licence plate got over $12,000 in tickets that weren't his 💀
#programming #coding #softwareengineering #bugs #techtok
```
**Instagram Reels**
```text
In 2016, the BBC wrote about a woman called Jennifer Null. When she tries to buy a plane ticket, most websites tell her she has left the surname field blank. The website sees Null and treats it as empty.

Then there's the security researcher in California who got a licence plate that said NULL. Tickets where no plate number had been recorded got linked to a plate called NULL, so over $12,000 in fines landed on him.

Null means no value, and that is why it catches almost everyone.

Full video on YouTube, link in bio
#softwareengineering #programming #webdevelopment #bugs #coding
```
**LinkedIn**
```text
Null means no value in code, and it catches almost everyone.

In 2016, the BBC wrote about Jennifer Null. When she tries to buy a plane ticket, most websites tell her she left the surname field blank. Her surname is Null, and the system reads it as empty.

A security researcher in California got a licence plate that said NULL. Tickets with no plate number recorded were linked to a plate called NULL, so over $12,000 in fines landed on him. Joseph Tartaro told that story at DEF CON in 2019.

A real value that happens to spell "null" and a missing value should never look the same. How does your system tell them apart?

#softwareengineering #webdevelopment #database #programming
```
**X**
```text
null means no value in code. that's why Jennifer Null can't buy a plane ticket online, and why a guy with a NULL licence plate got $12,000 in tickets that weren't his
```

### (SH6 is now part of SH5: removed 2026-11-12, old file in `archive/shorts-2026-11-12/`)

### SH7 · Leap year bugs (the leap day that took down part of Microsoft Azure)
File `outputs/shorts/sh07-azure-leap-day_9x16.mp4` (built; you export it from its editor) · about 35 s · no title on screen (her first line names the topic) · from 4:52.60 to 5:37.67 (raw), cutting "On the 29th of February, 2019," (about 4:57.9 to 5:01.7) and the retake 5:18.78 to 5:25.25
Hook: "Leap years are an edge case that will show up every four years, which is exactly why they get missed."
Format: **G · Letterbox** (calmer, your note 2026-11-12: the red full background was too much); title on screen "Leap year bugs". Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh07/ . Cover: "Leap year bugs" (your still, the line above your head). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: The leap day bug that took down part of Azure (2012)

Description: On 29 February 2012, part of Microsoft's Windows Azure went down. The system made certificates valid for one year by adding one to the year, and 29 February 2013 doesn't exist.

#Shorts #softwareengineering #programming #azure #bugs

Tags: leap year bug, leap day bug, azure leap day bug, azure outage 2012, microsoft leap year bug, february 29 bug, date bugs in programming, famous software bugs, edge cases in software development, cloud outage explained, software engineering, programming bugs, datetime bugs
```
**TikTok**
```text
in 2012 part of microsoft azure went down on the 29th of february. the code made certificates valid for one year by adding one to the year, and 29 february 2013 doesn't exist 🫠
#programming #azure #coding #bugs #techtok
```
**Instagram Reels**
```text
Leap years are an edge case that only shows up every four years, which is exactly why they get missed.

On the 29th of February 2012, part of Microsoft's cloud, Windows Azure, went down because of a leap year bug. Part of their system made security certificates that were valid for one year, and it worked out the end date by taking today's date and adding one to the year. That gave the 29th of February 2013, a date that doesn't exist, so creating the certificate failed.

Full video on YouTube, link in bio
#softwareengineering #programming #azure #bugs #coding
```
**LinkedIn**
```text
On the 29th of February 2012, part of Microsoft's Windows Azure went down because of a leap year bug.

Part of the system made security certificates that were valid for one year. It worked out the end date by taking today's date and adding one to the year. On leap day that gave the 29th of February 2013, a date that doesn't exist, so creating the certificate failed and part of Azure went down with it. Microsoft explained all of this in its own summary of the outage.

Leap years show up every four years, which is exactly why they get missed. The next one is 29 February 2028.

Is 29 February in your test data?

#softwareengineering #cloud #programming #devops
```
**X**
```text
in 2012 part of microsoft azure went down on 29 february. the code made certificates valid for one year by adding one to the year. 29 feb 2013 doesn't exist, so creating them failed
```

### SH8 · Daylight saving time can break scheduled jobs
File `outputs/shorts/sh08-daylight-saving-bug_9x16.mp4` (built; you export it from its editor) · about 40 s · title on screen "Daylight saving bug when the clocks change" · from 5:49.00 to 6:21.23 (raw; starts on Estonia, the old "Another edge case…" opener scored 3)
Hook: "In Estonia where I live, the clock changes twice in a year."
Format: **K · Film subtitles** (2026-11-10 mix; the old plan is replaced). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh08/ . Cover: "Daylight saving can break your code" (your still, the line above your head; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Daylight saving time bug: the 3:30 a.m. that happened twice

Description: In Tallinn the clocks jumped from 3 a.m. to 4 a.m. on 29 March 2026, and went from 4 a.m. back to 3 a.m. on 25 October. A job scheduled for 3:30 would not run on one day and would run twice on the other.

#Shorts #softwareengineering #programming #timezones #backend

Tags: daylight saving time bug, daylight saving bug, time zone bugs, timezone bug, cron job daylight saving, utc vs local time, scheduled jobs time zone, dst bug programming, edge cases in software development, estonia daylight saving, backend development, datetime bugs, software engineering
```
**TikTok**
```text
in estonia where I live the clocks change twice a year. in march 3:30 a.m. never happened, in october it happened twice. a report scheduled for 3:30 skips one day and runs twice on another 😅
#programming #timezones #coding #estonia #techtok
```
**Instagram Reels**
```text
In Estonia where I live, the clock changes twice a year. On the 29th of March, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m., so 3:30 that morning never happened. On the 25th of October, the clocks went from 4 a.m. back to 3 a.m., so 3:30 happened twice.

Now imagine an online shop sends a daily sales report at 3:30. On one day of the year that job would not run, and on another day it would run twice.

Full video on YouTube, link in bio
#softwareengineering #programming #timezones #backend #estonia
```
**LinkedIn**
```text
In Estonia, where I live, the clocks change twice a year, and that makes for a very quiet edge case in production.

On the 29th of March 2026, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m., so 3:30 that morning never happened. On the 25th of October, they went from 4 a.m. back to 3 a.m., so 3:30 happened twice.

Now imagine an online shop that sends a daily sales report at 3:30 Tallinn time. On one day of the year that job would not run, and on another day it would run twice.

Do you schedule your jobs in UTC or in local time?

#softwareengineering #backend #devops #estonia
```
**X**
```text
on 29 march the clocks in tallinn went from 3 a.m. straight to 4. on 25 october they went from 4 back to 3. a job scheduled for 3:30 skips one day and runs twice on another
```

### SH9 · Why the name Adébáyọ̀ breaks character limits
File `outputs/shorts/sh09-unicode-names_9x16.mp4` (built; you export it from its editor) · about 36 s · title on screen "Why Adébáyọ̀ breaks character limits" · from 6:29.36 to 6:57.35 (raw; starts on the name, the old "Another common edge case is the Unicode bug" opener scored 3)
Hook: "Take Adébáyọ̀. Adébáyọ̀, for example, you can see seven letters, but some functions count bytes, not letters."
Format: **F · Square + karaoke** (2026-11-10 mix; the old plan is replaced). Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh09/ . Cover: "Names with accents can cause bugs" (2026-11-12) (your still, the line above your head; it is the first frame: pick it as the cover when you upload). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Unicode bug: why Adébáyọ̀ counts as 13

Description: Adébáyọ̀ has seven letters you can see, but some functions count bytes, not letters, and they say 13. Check a name length with the wrong function and you can reject real names. Count characters and normalize the text before it saves.

#Shorts #unicode #php #webdevelopment #softwareengineering

Tags: unicode bug, unicode names, strlen vs mb_strlen, utf-8 bytes vs characters, unicode normalization, yoruba names unicode, names with accents bug, string length bytes, grapheme_strlen, edge cases in software development, form validation, php unicode, software engineering
```
**TikTok**
```text
Adébáyọ̀ is seven letters. some functions count bytes, not letters, and say 13. so a "max 20 characters" check with the wrong function can reject real names. a lot of Nigerian names have tone marks like this
#unicode #php #coding #naija #techtok
```
**Instagram Reels**
```text
Unicode is the edge case that breaks names with accents and tone marks, and a lot of Yoruba names have them. Take Adébáyọ̀. You can see seven letters, but some functions count bytes, not letters, and those say 13, because letters with marks take more than one byte.

So if you check that a name is at most 20 characters with the wrong function, you can reject real names. The fix is to count with a function that counts characters, and to normalize the text before it saves.

Full video on YouTube, link in bio
#unicode #webdevelopment #softwareengineering #php #naija
```
**LinkedIn**
```text
Unicode is the edge case that breaks names with accents and tone marks, and a lot of Yoruba names have them.

Take Adébáyọ̀. You can see seven letters, but some functions count bytes, not letters. PHP's strlen says 13, because the letters with marks take more than one byte each. So a rule like "the name must be at most 20 characters", checked with the wrong function, can reject real names.

The fix is to count with a function that counts characters, and to normalize the text before it saves, so the same name is always stored the same way.

Is your name field tested with names like Adébáyọ̀?

#softwareengineering #webdevelopment #php #africa
```
**X**
```text
Adébáyọ̀ is seven letters. php's strlen says 13, because it counts bytes. if your name field checks length with strlen, it can reject a real name
```

### SH10 · Hyrum's law explained
File `outputs/shorts/sh10-hyrums-law_9x16.mp4` (built; you export it from its editor) · about 55 s · title on screen "Hyrum’s law explained" · from 6:57.20 to 7:54.79 (raw), cutting the stumble 7:15.35 to 7:16.68 and "Well, let me go." (about 7:18.70 to 7:19.55, question 5)
Hook: "Hyrum's law is about a different kind of edge case. It's the behavior in your app that you actually never promised."
Format: **B · Split (the title poster on lime above her)**. Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh10/ . Cover: "What is Hyrum\'s law?" big on lime like SH3, with the Hyrum\'s law screenshot from the short (about 0:20, highlighted) under it, no photo of you (2026-11-12). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Hyrum's law explained with one API example

Description: With enough users of an API, it does not matter what you promise in the contract. All observable behaviors of your system will be depended on by somebody. Here is what that looks like with an online shop's product list.

#Shorts #api #softwareengineering #backend #programming

Tags: hyrum's law, hyrum's law explained, hyrum's law in api design, hyrum's law examples, hyrum's law in software engineering, api design, api breaking changes, backward compatibility, software engineering at google, edge cases in software development, backend development, programming laws, software engineering
```
**TikTok**
```text
hyrum's law says that with enough users, someone will depend on behaviour you never promised. your API happens to return products in one order, someone builds on it, you add an index, and their app breaks
#api #programming #backend #coding #techtok
```
**Instagram Reels**
```text
Hyrum's law is about a different kind of edge case, the behaviour in your app that you never promised. It's named after Hyrum Wright, and it says that with a sufficient number of users of an API, it does not matter what you promise in the contract. All observable behaviours of your system will be depended on by someone.

Say an online shop's API happens to return products in the order they were added. Someone uses the last product in the list as the newest one. Then we add an index or change the query, the order changes, and their app breaks. To us we broke nothing, because we never promised that order.

Full video on YouTube, link in bio
#api #softwareengineering #backend #programming #webdevelopment
```
**LinkedIn**
```text
Hyrum's law is about a different kind of edge case, the behaviour in your app that you never actually promised.

It's named after Hyrum Wright, and it says: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody."

Say our online shop's API happens to return products in the order they were added. We didn't choose that, the query just came back that way. Someone builds an app that shows the newest product by taking the last one in the list. Then we add an index or change the query, the order changes, and their app breaks. To them, we broke something. To us, we didn't, because we never promised that order.

What's a behaviour in your system that you know someone depends on?

#softwareengineering #api #backend #programming
```
**X**
```text
hyrum's law says that with enough users, someone depends on behaviour you never promised. your api happens to return products in insert order, someone takes the last one as "newest", you add an index, their app breaks
```

### SH11 · Edge cases in production (real users double-click, open tabs and lose network)
File `outputs/shorts/sh11-real-users-edge-cases_9x16.mp4`: export it from its editor · about 58 s · title on screen "Edge cases in production" · from 0:16.33 to 1:07.63, then 7:58.13 to 8:07.20 (raw: starts at "Someone is going to report an issue, and it\'s going to be exactly that edge case…", your note 2026-11-12, no more "If you\'re a software developer… I promise you…")
Hook: "If you're a software developer, I want you to think of the craziest edge cases in the world."
Format: **A · Wide (her picture full width, captions on a lime band)**, the topic on top; a "new issue" card comes in on "report". Editor: http://localhost:7700/moment/the-edge-case-you-think-is-impossible/sh11/ . Cover: "Real users double-click: edge cases you must test" (your still). Ends on the "Full video on YouTube" card.

**YouTube Shorts**
```text
Title: Your users will find the edge case you said was impossible

Description: Think of the craziest edge case in your app, the one you're sure no user would ever end up in. Someone is going to report it. Real users double click, open two tabs and lose their network halfway, and they're just being users.

#Shorts #softwareengineering #programming #webdevelopment #developer

Tags: edge cases, edge cases in software development, what is an edge case in programming, edge cases in software testing, real users vs happy path, happy path testing, user behavior, software testing, bugs in production, why bugs happen in production, developer life, software engineering, programming
```
**TikTok**
```text
think of the craziest edge case in your app, the one you're sure no user would ever end up in. I promise you someone is going to report it 😭 real users double click, open two tabs, leave the page open for two hours. they're just being users
#softwareengineering #coding #developer #programming #techtok
```
**Instagram Reels**
```text
If you're a software developer, think of the craziest edge case in your app, the one where you thought there was no way a user would end up there. I promise you, someone is going to report it.

When we build, we picture one path. The user fills the form, clicks the button and waits. Real users double click. They open different tabs. Their network drops halfway. They leave the page open for two hours and come back. They're not doing anything strange. They are just being users.

Full video on YouTube, link in bio
#softwareengineering #programming #webdevelopment #developer #coding
```
**LinkedIn**
```text
If you're a software developer, think of the craziest edge case in your app, the one where you were sure no user would ever end up there. Someone is going to report it.

When we build, we usually create one simple path. The user fills a form, clicks a button and waits. Real users don't always do that. They double click. They open different tabs. Their network drops halfway. They leave the page open for two hours and then come back.

And they're not doing anything strange. They are just being users. You don't even need a lot of users for this to happen.

What's the craziest edge case a user has ever reported to you?

#softwareengineering #webdevelopment #ux #programming
```
**X**
```text
real users double click, open two tabs, lose their network halfway, and leave the page open for two hours. they're not doing anything strange, they're just being users. that edge case you said was impossible will get reported
```

### Independent shorts to record (new scripts)
Full scripts, word for word: read them exactly as written. You are on camera in all three (no faceless shorts). Directions in brackets are for you and the editor, not to be read out.

**IS1 · "Test your sign-up form with these names" (about 40 s)**
Recording: the living room, seated on the sofa or at a table, front light from a window. Props: three A5 cards you write by hand with a thick marker, one name per card: "O'Brien", "Null", "Adébáyọ̀". Hold each card up close to the lens when you say the name (books-on-camera style, #27). Camera at eye level, 4K, phone or camera in landscape; the edit makes the 9:16. Format: talking head + props, top label "Names that break sign-up forms", captions C1.
Script:
> If you build sign-up forms, test them with these names before your users do.
> O'Brien. The apostrophe in O'Brien is the same character that starts and ends a piece of text in SQL. If your code glues the name straight into the query, the query breaks.
> Null. There is a woman called Jennifer Null, and when she tries to buy a plane ticket, most websites tell her she left her surname blank. The website reads her name as no value.
> Adébáyọ̀. You can see seven letters, but if you count it in bytes, you get thirteen. So a rule like "at most twenty characters", checked with the wrong function, can reject a real name.
> These are real names. Put them in your test data today.

**IS2 · "What is an idempotency key?" (about 45 s)**
Recording: at your desk, standing behind it or sitting, laptop open beside you showing any checkout page (blurred in the edit), phone in your hand. Wear something plain. Camera slightly to the side so there is room on the right for a graphic. Format: half-screen, you on the left, the online shop's "Place order" button and orders table drawn on the right (kodekloud drawing style, with you in frame). Top label "What is an idempotency key?", captions C6.
Script:
> What is an idempotency key?
> Say you click "Place order" in an online shop. The page feels slow, so you click again.
> (tap your phone twice)
> Now the server gets two requests, and it creates two orders. And if it charges on each order, you've been charged twice.
> An idempotency key fixes this. Before the request goes out, the app creates one unique key for this order and sends it with the request. If the same request comes in again with the same key, the server doesn't create a new order. It sends back the result of the first one.
> So doing something twice has the same result as doing it once. That's what idempotent means.
> Stripe's API works like this, with a header called Idempotency-Key.

**IS3 · "Daylight saving time can run your job twice" (about 40 s; post in the week of 22 March 2027)**
Recording: kitchen or by a window, standing, holding a simple wall clock or an alarm clock (a real prop) in both hands at chest height. A second angle from the side for one cut. Format: talking head + prop + a corner clock graphic in DM Mono. Top label "Daylight saving time and scheduled jobs", captions C2.
Script:
> In Europe the clocks go forward on the 28th of March 2027, and if you have a job scheduled at night, check it before then.
> In Tallinn, where I live, the clocks jump from 3 a.m. straight to 4 a.m. that morning. So 3:30 doesn't happen. A job scheduled for 3:30 local time won't run.
> In October it's the other way. The clocks go from 4 a.m. back to 3 a.m., so 3:30 happens twice, and the same job can run twice.
> That's why a lot of developers schedule jobs in UTC. UTC never changes its clocks.
> So check your scheduler, check your cron jobs, and check what time zone they think they're in.

(Your kit's "main short" script, about 90 s, is still in `../archive/original-kit/` section 5 if you want a fourth to record; the twelve cut shorts above already cover its content from the recording.)

## 4. Teaser (LinkedIn and X)
Fonts (2026-11-13 font-board pass): Inter Tight Black on lime / ink for the title cards and EDGE CASES (Design 394, combo-02) + DM Mono captions (Design 353, design-29); structure, words and sound unchanged.
File (built; you export it from its editor; ends on the "Full video on YouTube" card): 16:9, 1:1, 4:5, **about 120 s** (113.8 s of her lines + 4 cards + the 6.5 s ending), moment `"kind": "teaser"`, editor `/moment/the-edge-case-you-think-is-impossible/teaser/`. **v3 (2026-11-12, your note "it doesn't flow"; revised the same day: you say each edge case's name, race condition keeps its "one item left in stock" set-up)**, per TEASER-PLAYBOOK 0a: one story a stranger can follow. Plan as plain text: `talking-head/teaser/PLAN-v3.md`; v2 is in `archive/teaser-v2/`.

| # | Part | Raw | Her line | Cut into it |
|---|---|---|---|---|
| 1 | hook (EDGE CASES big on frame 1) | 0:50.3 to 1:07.6 | "Real users double-click, like ta-ta-ta-ta… They click a lot. Real users open different tabs. Real users, network drop halfway. Real users leave the page open for two hours… They are just being users." | - |
| 2 | the idea | 0:16.4 to 0:22.4 | "Someone is going to report an issue, and it's going to be exactly that edge case that you never thought of." | flash |
| card | | gap | **DUPLICATE ORDERS** (Edge case 01) | card |
| 3 | example | 1:07.6 to 1:26.6 | "One of the most common edge cases in production is the duplicate submission. If, for example, in an online shop someone clicks place order… you can charge the user twice." | - |
| card | | gap | **RACE CONDITIONS** (Edge case 02) | card |
| 4 | example | 2:06.0 to 2:14.6 | "Another common edge case in production is a race condition. A race condition is when two things happen at the same time, and your code just assumes that they would happen one after the other." | - |
| 5 | example | 2:50.0 to 3:06.1 | "For example, in our online shop, say we have one item left in stock. Two people click buy in the exact same second… now we have sold an item that we do not have." | whip |
| card | | gap | **NAMES** (Edge case 03) | card |
| 6 | example | 3:45.6 to 3:49.3 + 3:52.7 to 4:03.6 | "In 2016, the BBC wrote about a woman called Jennifer Null. When Jennifer Null tries to buy a plane ticket, most websites tell her that she has left the surname field blank. Her surname is Null. The website sees the name Null and treats it as empty." | - |
| card | | gap | **DAYLIGHT SAVING** (Edge case 04) | card |
| 7 | example | 5:41.2 to 5:45.3 | "Another edge case that can cause issues: time zones and daylight saving." | - |
| 8 | example | 5:51.8 to 5:59.3 | "On the 29th of March, the clocks in Tallinn jump from 3 a.m. straight to 4 a.m. So 3:30 that morning never happened." | flash |
| 9 | example | 6:08.7 to 6:17.4 | "Now imagine our online shop sends a daily sales report at 3:30, Tallinn time. On one day of the year, that job would not run." | whip |
| 10 | close (**drop**: music stops on the last sentence) | 7:58.1 to 8:07.3 | "You can't protect your app from every single possible edge case, because you can't even predict every single one. If you want to wait till you predict every single one, you probably wouldn't ship anything." | glitch |
| 11 | stinger | 3:06.2 to 3:07.4 | "What do we do about this?" | black, then the "Full video on YouTube" ending |

**LinkedIn post (teaser)**
```text
Edge cases are the situations you were sure no user would ever end up in, and someone always reports them.

I made a video on eight of them, with the real stories behind them. A Starbucks gift card transfer sent twice at the same moment. A woman called Jennifer Null whose surname websites read as empty. A license plate that said NULL. A leap day that took down part of Azure in 2012. And the 3:30 a.m. that happened twice in Tallinn this October.

Which one have you run into?

Full Video on YouTube - [LINK]

#softwareengineering #webdevelopment #backend #programming
```
**X post (teaser)**
```text
edge cases that break real apps: a starbucks race condition, a woman called Jennifer Null, a NULL license plate, a leap day that took down part of azure, and the 3:30 a.m. that happened twice in tallinn. full video on youtube - [LINK]
```

## 5. Carousels
(built 2026-11-07; paused for now, your note 2026-11-08) 1080 × 1350, 10 slides each, built in the studio's carousel editor. Every slide one idea, her words, a real receipt where she cites one.

### 5a. Instagram
Files (plan): `outputs/carousels/instagram/slide-01.png` … `slide-10.png`.
Slide 1 options (pick one): A "8 edge cases that break real apps" with the NULL plate photo-object · B "The bug you said was impossible will get reported" · C "Test these before your users do" with a checklist.
Slides 2-10: real users (double click, two tabs, network drops) · two orders from one click (idempotency key) · Starbucks $15 to $20 · last item sold twice · O'Brien breaks SQL · Jennifer Null · the NULL plate · 29 Feb 2012 + 1 year · Adébáyọ̀ = 13 bytes, and the last slide "Full video on YouTube: Edge Cases in Software Development, @WithGbemi".
Caption:
```text
If you're a software developer, think of the craziest edge case in your app, the one where no user would ever end up. Someone is going to report it.

These are eight edge cases that break real apps, and most of them come with a real story. A researcher turned $15 of Starbucks gift cards into $20 by sending the same transfer twice at once. A woman called Jennifer Null gets told her surname is blank. A man with a NULL license plate got over $12,000 in fines that weren't his. And part of Azure went down on the 29th of February 2012.

Which one have you seen in production?

Full video on YouTube, link in bio
```
Hashtags (first comment or under the caption line, she decides): #softwareengineering #webdevelopment #programming #backend #coding

### 5b. LinkedIn
File (plan): `outputs/carousels/linkedin/edge-cases-in-software-development.pdf`. Document title: "8 edge cases that break real apps (with the real stories)". Slide 1: "Edge cases in software development: 8 that break real apps".
Post text:
```text
Edge cases in software development are the situations we were sure no user would ever end up in.

I put eight of them in this document, from the duplicate order that a double click creates, to the 3:30 a.m. that happened twice in Tallinn last month. Most of them come with a real incident, like the Starbucks race condition in 2015 and the leap day that took down part of Azure in 2012.

You can't catch all of them before you ship. You can catch a few.

Which one would you add?

Full Video on YouTube - [LINK]

#softwareengineering #webdevelopment #backend #programming
```

## 6. Long-form posts

### 6a. LinkedIn post (main video, upload day; her draft 2026-11-16, smallest edits)
```text
One of the things I love the most about software development is the unpredictability of user actions. You as a software developer can be the most confident about the user journey you have built, and then the craziest edge case you never prepared for shows up because of a user.

When we build, we usually picture one simple path, which is the easiest thing to picture, right? It's the one that makes sense. The user fills the form, they click the button and then they wait. But real users do more than that. Real users will double click, real users will open two tabs, they lose their network halfway, they leave the page open for two hours before they come back to it, and they are not doing anything weird or strange. They are just being users.

I've been reading a lot about edge cases, and I decided to make a video about it. In this video I went through about eight different situations, and I think it's a nice video (so I think you should watch it).

You can't protect your app from every edge case because you can't predict every one. And if you wait until you can, you probably won't ship anything. But you can catch a few of them from time to time.

Full Video on YouTube - [LINK]

#softwareengineering #webdevelopment #backend #programming
```

### 6b. X thread
```text
1/ think of the craziest edge case in your app, the one you're sure no user would ever end up in. someone is going to report it. here are 8 that break real apps, with the real stories

2/ duplicate orders. someone clicks "place order", the page feels slow, they click again. two orders, maybe two charges. disabling the button doesn't stop a network retry. an idempotency key does

3/ race conditions. in 2015 a researcher sent the same starbucks gift card transfer twice at the same moment. both went through and $15 became $20

4/ names. the apostrophe in O'Brien ends a piece of text in SQL. and most websites tell Jennifer Null her surname is blank

5/ null. a security researcher got a license plate that said NULL. tickets with no plate number were linked to NULL, so over $12,000 in fines landed on him

6/ dates. on 29 feb 2012 part of azure went down because the code added one to the year, and 29 feb 2013 doesn't exist. in tallinn this year, 3:30 a.m. never happened in march and happened twice in october

7/ unicode. Adébáyọ̀ is seven letters, but strlen says 13. and hyrum's law says that with enough users, someone depends on behaviour you never promised

8/ you can't catch all of them, but you can catch a few. full video on youtube - [LINK]
```

### 6c. YouTube community post (upload day)
```text
New video! Eight edge cases that break real apps, with the real stories behind them: a Starbucks race condition, a woman called Jennifer Null, a NULL license plate, the leap day that took down part of Azure, and the 3:30 a.m. that happened twice in Tallinn.

Which one have you seen in your own app? [LINK]
```

### 6d. More X posts (from your kit, cleaned up)
Image post (a card with the 8 edge cases, one line each: double submit, race condition, apostrophes, null, leap day, daylight saving, unicode, Hyrum's law):
```text
edge cases that break real apps, and what happened when they did
```
Reply: `the real story behind each one is in the video: [LINK]`

Tips list:
```text
edge cases I'd tell any backend dev to test

1. click "place order" twice, fast
2. buy the last item from two tabs at the same second
3. sign up as O'Brien
4. sign up with the surname Null
5. set the date to 29 february
6. check the length of Adébáyọ̀
```
Reply: `full video on all of these: [LINK]`

Quiz:
```text
two people click buy on the last item in stock in the same second. your code checks the stock first, then creates the order.

what happens?

A. one order, one "sold out"
B. two orders
C. the database throws an error
```
Your reply a few hours later: `it's B. both requests check the stock before either one updates it, so both see one item left and both create an order. that's a race condition. if the update itself only takes stock WHERE stock > 0, only one of them gets it`

"Can you guess":
```text
in 2012 part of microsoft azure went down on the 29th of february. can you guess what the code was doing with the date?
```
Your reply: `it made certificates valid for one year by adding one to the year. on 29 feb 2012 that gave 29 feb 2013, a date that doesn't exist, so creating them failed`

Launch tweet:
```text
made a video on the edge case you think is impossible. starbucks gift cards, a woman whose surname is Null, a license plate that said NULL, and the 3:30 a.m. that never happened in tallinn
```
Reply: `[LINK]`

Standalone:
```text
a security researcher got a license plate that said NULL. tickets with no plate number were linked to NULL in the system, so they all landed on him. over $12,000 in fines that weren't his
```
```text
on 29 march the clocks in tallinn went from 3 a.m. straight to 4. if your app had a report scheduled for 3:30 that night, it just didn't run
```
```text
Adébáyọ̀ is seven letters. php's strlen says 13, because it counts bytes. if your name field checks length with strlen, it can reject a real name
```
```text
what's the craziest edge case anyone has ever reported to you? I'm collecting them
```

### 6e. Your comments and ready replies
Comments to post yourself:
- Instagram: `the NULL plate one still gets me. every ticket with no plate number got linked to NULL, and his plate literally said NULL`
- TikTok: `if your test data doesn't have O'Brien and Adébáyọ̀ in it, please add them today 😭`
- LinkedIn: `The one I'd test first is the double click on "Place order". It takes a minute to try, and if it creates two orders, a retry on a bad network will too.`
- X (reply to your own tweet): `quick check you can do today: search your codebase for sql strings with a variable inside the quotes. if O'Brien can break it, so can someone typing on purpose`

Ready replies:
- "Just disable the button, problem solved." → `do that too, it helps with the double click. but it doesn't stop the app retrying when the network drops, or someone placing the same order in a second tab`
- "Why not just check the stock first and then update it?" → `because two requests can both check before either one updates. if the update itself says WHERE stock > 0, the database only lets one of them take the last item`
- "Is the NULL plate story real?" → `yes, it was a security researcher called Joseph Tartaro, who goes by Droogie. he talked about it at DEF CON in 2019, and the source is in the description`
- "Use mb_strlen and you get 7." → `mb_strlen gives 8 for Adébáyọ̀, because the ọ̀ is a letter plus a separate tone mark. it's still fine for a length limit. grapheme_strlen gives you the 7 letters you see`
- "Hyrum's law means we can never change anything." → `you can still change things, you just have to expect someone to notice. being clear about what your API promises makes it a lot less painful`
- "You can't test for every edge case." → `I agree, I say that at the end of the video too. you won't catch all of them, but a few of these take minutes to check`
- "Were you at DEF CON?" (if asked) → answer with what is true for you (question 3).

### 6f. Essay for Substack / Medium (your kit's essay, matched to the recording)
Title: The Edge Case You Think Is Impossible
Subtitle: Real users, real incidents, and why someone will always report the one thing you were sure could never happen.
SEO title: Edge Cases in Software Development (8 Real Examples)
SEO description: Duplicate orders, race conditions, names like O'Brien and Null, leap day bugs, daylight saving time, Unicode and Hyrum's law, with the real incidents behind each one.

If you're a software developer, think of the craziest edge case in the world, the one thing where you thought there was no way your user would navigate and navigate and end up there. I promise you, with everything that I have and everything that I hope, someone is going to report it. You don't even need a lot of users for that to happen. When we build, we picture one path. The user fills the form, clicks the button and waits. Real users double click, open two tabs, lose their network halfway, and leave the page open for two hours before they come back. They aren't doing anything strange. They are just being users.

The double click is where a lot of apps meet their first impossible bug. Someone clicks "Place order" in an online shop, the page feels slow, and they click again, so the server gets two requests and creates two orders, and maybe two charges. It doesn't even need a double click, because the phone can lose its network after the request was sent and the app retries, or someone refreshes and tells the browser to send the form again. Disabling the button helps with the double click, but it does nothing for a retry or a second tab. The common fix is an idempotency key, which makes doing something twice have the same result as doing it once. Stripe's API uses the same idea with an Idempotency-Key header, so a retried request doesn't create a second payment.

A race condition is when two things happen at the same time, and your code assumed they would happen one after the other. In 2015, the researcher Egor Homakov had Starbucks gift cards worth fifteen dollars in total. He sent the same balance transfer twice, at the same moment, from two sessions, and both went through, so his cards ended up with twenty dollars between them. Each request checked the balance, saw enough money, and moved it without waiting for the other. He reported it, and Starbucks fixed it. An online shop can make the same mistake with the last item in stock, when two buyers both see one left and both get an order. If the update itself only takes one from the stock when the stock is more than zero, only one request can take the last item, and the other gets zero rows updated, which is how you know it's sold out.

Names catch a lot of us, because we build the name field picturing names like our own. The apostrophe in O'Brien is the same character that starts and ends a piece of text in SQL, so code that glues a name straight into a query breaks on it, and anyone can type something after that apostrophe on purpose, which is SQL injection. In 2016, Chris Baraniuk wrote for the BBC about Jennifer Null, who gets told by most websites that she left the surname field blank when she tries to buy a plane ticket. Her surname is Null, and the website treats it as empty.

Null catches almost everybody, because null means no value. In 2019, the security researcher Joseph Tartaro, who goes by Droogie, told DEF CON how he got a personalised license plate in California that said NULL. Then the tickets started coming, over twelve thousand dollars in fines that weren't his. They were tickets where no plate number had been recorded, and the system that processed them linked them to a plate called NULL, so they all landed on him.

Dates are behind some of the best-known outages. On the 29th of February 2012, part of Microsoft's Windows Azure went down because a component worked out a certificate's end date by adding one to the year, which gave the 29th of February 2013, a date that doesn't exist, so creating the certificate failed. Time zones are the other trap. In Estonia, where I live, the clocks change twice a year. On the 29th of March 2026, the clocks in Tallinn jumped from 3 a.m. straight to 4 a.m., and on the 25th of October they went from 4 a.m. back to 3 a.m. A daily sales report set for 3:30 a.m. Tallinn time would skip one day and could run twice on another.

Unicode breaks names with accents and tone marks, and a lot of Yoruba names are like that. Adébáyọ̀ has seven letters you can see, but some functions count bytes, not letters, like strlen in PHP, which says thirteen. A check like "the name must be at most 20 characters" done with the wrong function can reject real names. The fix is to count with a function that counts characters, and to normalize the text before it saves, so the same name is always stored the same way.

Hyrum's law, named after Hyrum Wright, who noticed it while he was a software engineer at Google, is about a different kind of edge case. It says, "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." If your shop's API happens to return products in the order they were added, someone will take the last product in the list as the newest one, and the day you add an index or change the query, their app breaks. You never promised that order, but they built on it anyway.

To be honest, there's so much more. You can't protect your app from every single edge case, because you can't even predict every single one, and if you wait until you can, you probably won't ship anything. You can catch a few of them, though, and the ones in this piece are a good place to start.

Full Video on YouTube - [LINK]

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

Medium tags: Software Engineering, Programming, Web Development, Software Testing, Backend Development

Changes from your kit's essay: "and I own" became "and everything that I hope" (what you say in the video); "a lot of Nigerian names" became "a lot of Yoruba names" (what you say); the retry line adds the refresh case you say in the video; the full-video line added; "personalized" spelled the British way.

## 7. Research and sources

### 7a. What is happening with the topic now
This is an evergreen topic; there is no single news story this month. What is current and useful:
- **Clocks changed in the EU on 25 October 2026** (a week ago), exactly the daylight saving example she gives. The next change is **28 March 2027** (last Sunday of March; checked with Python's calendar and the Europe/Tallinn time zone data). The EU has debated ending clock changes for years without a binding decision ([sigmalive, EU renews debate](https://en.sigmalive.com/eu-renews-debate-on-ending-daylight-saving-time); [timeanddate, EU DST](https://www.timeanddate.com/time/europe/eu-dst.html)). IS3 is timed for the March change.
- **Race conditions are in the news through big outages.** AWS's us-east-1 outage of 19-20 October 2025 started with a race condition in DynamoDB's DNS automation ([BleepingComputer](https://www.bleepingcomputer.com/news/technology/amazon-this-weeks-aws-outage-was-caused-by-major-dns-failure/); [InfoQ](https://www.infoq.com/news/2025/11/aws-dynamodb-outage-postmortem)). Atlassian's 14 May 2026 multi-product incident was traced to a race condition in a deployment platform ([Atlassian status](https://jira-software.status.atlassian.com/incidents/zq3f0j7wph20)). Useful as a one-line "this still happens" in replies; she doesn't mention them, so they are not in the video text.
- **Double charges keep happening to banks and telcos** (T-Mobile AutoPay double charges 10-13 April 2025: [PhoneArena](https://www.phonearena.com/news/t-mobile-autopay-double-charge-refund_id169506)). I found no double-charging incident in October 2026.
- **Computerphile's "Race Conditions on a Human Scale"** (8 October 2026, 123K views) shows the concept has a fresh general audience right now (7c).

### 7b. What people search (keywords with evidence)
Collected 2026-11-02 with YouTube (`ds=yt`) and Google suggestions.
| Phrase | Evidence | Used in |
|---|---|---|
| edge cases in software testing | YouTube's first suggestion for "edge case", "edge cases" and "edge cases in software" | title 3, tags, SH11 |
| edge cases in software development / engineering | Google suggestions for "edge cases in software" | title 1 (recommended), description line 1 |
| what is an edge case in programming | Google suggestions for "what is an edge case" and "edge case" ("edge case in programming") | title 2, tags |
| race condition explained (simply) | YouTube and Google suggestions; "race condition vulnerability explained" too | title 4, SH2, SH3 |
| idempotency key / idempotency in rest api / idempotency key in payment | YouTube suggestions for "idempotency" and "idempotency key" | title 4, SH1, IS2 |
| sql injection explained (simply) | YouTube suggestions | SH4 |
| null license plate (story, tickets, california) | Google suggestions for "null license plate" | title 9, SH5 |
| leap year bug / microsoft leap year bug | Google suggestions (YouTube gave none) | title 7, SH7 |
| daylight saving time bugs | Google suggestions (YouTube gave none) | SH8, IS3 |
| hyrum's law (explained, in api design, examples) | Google suggestions | SH10 |
| famous software bugs / worst software bugs in history | YouTube suggestions for "software bugs" | title 7 |
TikTok search terms: not checked this time (earlier forks found TikTok's site search returned nothing); hashtags come from her kit's pool and the YouTube terms above.

### 7c. Outlier videos (ratio = views ÷ median of the channel's last 25 uploads, measured 2026-11-02 with yt-dlp)
| Video | Channel | Upload | Views | Channel median | Ratio |
|---|---|---|---|---|---|
| [The Terrible Mistake of Choosing 'Null' as a License Plate](https://www.youtube.com/watch?v=_c1am8NSx_s) | Half as Interesting | 2020-06-09 | 3,747,839 | 375,000 | 10.0x (older, still the template for the NULL story) |
| [The importance of considering edge cases in software engineering](https://www.youtube.com/watch?v=Xv4ODQDJdNg) | Thinklair | 2019-04-23 | 4,249 | 90 | 47x (evergreen search) |
| [Idempotency in APIs: you should be aware of this!](https://www.youtube.com/watch?v=t99NvIazD68) | Software Developer Diaries | 2023-10-20 | 58,672 | 6,500 | 9.0x |
| [The $440 Million Software Bug: Knight Capital Collapse](https://www.youtube.com/watch?v=Ltx3Ct6HJ58) | Company Lore | 2026-02-10 | 2,584 | 264 | 9.8x (last 12 months) |
| [UTC vs Timezone - The Bug That Costs Developers Hours](https://www.youtube.com/watch?v=rPHZwB9rLYM) | LearnThatStack | 2026-01-21 | 34,634 | 8,650 | 4.0x (last 12 months) |
| [IDEMPOTENTITY (idempotency key) what is it and why is it needed?](https://www.youtube.com/watch?v=hTciTPbReKw) | Kirill Grishchuk | 2026-04-01 | 6,432 | 2,200 | 2.9x (last 12 months) |
| [Race Conditions on a Human Scale](https://www.youtube.com/watch?v=W0jPTqIo5oE) | Computerphile | 2026-10-08 | 123,151 | 128,000 | 1.0x in 3 weeks |
| [The most expensive software bug in history...](https://www.youtube.com/watch?v=UuqSy1jPSUw) | Fireship | 2026-08-27 | 1,333,790 | 1,900,000 | 0.7x |
| [How to Handle Race Conditions in System Design](https://www.youtube.com/watch?v=O-jExVEQB1U) | ShowOffer | 2026-03-27 | 58,835 | 86,000 | 0.7x |
| [The Weirdest Bug in Programming - Race Conditions](https://www.youtube.com/watch?v=bhpzTWtee2A) | Core Dumped | 2025-06-05 | 165,513 | 151,000 | 1.1x |
| [25 crazy software bugs explained](https://www.youtube.com/watch?v=Iq_r7IcNmUk) | Fireship | 2024-11-01 | 2,662,656 | 1,900,000 | 1.4x |
| [How Bad Leap Day Math Took Down Microsoft](https://www.youtube.com/watch?v=0Rl76cZ7Nic) | Kevin Fang | 2024-05-02 | 419,196 | 519,000 | 0.8x |
| [Idempotency - What it is and How to Implement it](https://www.youtube.com/watch?v=XAccGbtl3Z8) | Alex Hyett | (not checked) | 87,430 | 37,000 | 2.4x |
| [When Software Bugs Cause DISASTERS](https://www.youtube.com/watch?v=_J2Poo_KELE) | Codeolences | 2023-11-12 | 11,672 | 18,000 | 0.6x |
| ["Null" Licence Plates Wreaks Havoc](https://www.youtube.com/watch?v=ft_07hgI6Qk) | The PrimeTime | (not checked) | 155,754 | (not checked) | - |
| [droogie - Go NULL Yourself - DEF CON 27](https://www.youtube.com/watch?v=TwRE2QK1Ibc) | DEFCONConference | 2019 | 16,361 | (not checked) | - (the receipt) |
Her own channel for comparison: median of the last 25 uploads is about 100 views (yt-dlp, 2026-11-02); "nobody warned me about studying in Europe as a Nigerian" 6,800 is her outlier.

**What the winners have in common:** one concrete story or one plain concept per title ("Null as a License Plate", "UTC vs Timezone", "Idempotency in APIs"); a money number or a big name in story titles ("$440 Million", "Took Down Microsoft"); 30-55 characters; thumbnails show one object (a plate, a clock, a dollar figure) with 1-4 words, often no face or a small face. Roundups ("25 crazy bugs") only win for channels that are already huge. So: the long video goes search-led ("Edge Cases in Software Development"), and the single stories (NULL plate, leap day, Starbucks, double charge) go out as shorts and as thumbnail objects.

### 7d. What worked with strangers (cold reviews)
Cold review run 2026-11-02 by a fresh agent with no context (titles, thumbnail words + pictures, short labels + first lines).
- **Overall:** "this only works on developers. Non-devs bounce on edge case, Azure, idempotency, Unicode, Hyrum. The story items (NULL plate, woman named Null) are the only ones that reach past that crowd."
- **Titles:** NULL plate 8, woman named Null 8, famous bugs 7, testing 6, users-will-find 6, the plain search titles 5, race conditions 3, her kit's pick 3.
- **Thumbnails:** $12,000 IN FINES 8 ("best in the set; works even for non-devs"), HER NAME IS NULL 8, THIS DATE BROKE AZURE 7, CHARGED TWICE 6, 1 LEFT 2 SOLD 6, EDGE CASES 5, 3:30 AM 5, TEST THESE FIRST 4, HAPPY PATH 4, 13 BYTES 3, IT WILL BREAK 3, IMPOSSIBLE BUG? 3.
- **Shorts:** NULL plate 9, Jennifer Null 8, Azure 6, duplicate orders 5, O'Brien 5, Starbucks 4, last item 4, Hyrum 4 (6 for developers), real users 4, daylight saving 3, Unicode 3, can't predict 1. Pattern: four openers started with "Another…" and needed the long video.
- **What we changed:** titles re-ranked (story + search words), five titles and five thumbnails dropped, TH1/TH3/TH5 reworked, SH1/SH2/SH3/SH4/SH8/SH9 now start on her story line (new raw in-times), labels rewritten to name the thing, SH12 folded into SH11. The changes are not re-scored.
- **Lesson:** in a list video, every short must start on its own story, never on the list's connector ("Another common edge case is…").

### 7e. What changed from her kit (and accuracy notes)
- Titles: her pick "Developing Software for Impossible Edge Cases" is title 6; recommended title is now search-led with "Edge Cases in Software Development" first (7b).
- Chapters: 6 broad chapters instead of 10 (house rule 5-7 max), timed to the cleaned edit.
- Shorts: 12 cut from what she actually said (her kit had 6 to record + 21 clips); her main short stays in the archive as an optional extra.
- Captions rewritten in her voice; Instagram ends "Full video on YouTube, link in bio"; Shorts descriptions have no "full video" line.
- Facts (all checked 2026-11-02): Starbucks "3 Starbucks cards $5 each" and "2 cards with 15 and 5 (20 in total)", fixed "in like 10 days" ([Sakurity](https://sakurity.com/blog/2015/05/21/starbucks.html)). Azure: "adding one to its year", "February 29, 2013", "partial service outage" ([Microsoft](https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/)). Tallinn: 29 March 2026 02:59 EET then 04:00 EEST, 25 October 2026 03:59 EEST then 03:00 EET (Python zoneinfo, Europe/Tallinn). Adébáyọ̀ in NFC: 8 code points, 13 bytes (Python, matches her kit's PHP run: strlen 13, mb_strlen 8, grapheme_strlen 7). NULL plate: DEF CON 27 talk by droogie (official DEF CON channel) and "$12,000" ([Sophos](https://news.sophos.com/en-us/2019/08/15/null-license-plate-gets-security-researcher-12k-in-tickets/)). Jennifer Null: BBC Future, 25 March 2016 (her kit's check, through a quoting blog). Hyrum's law exact wording: [hyrumslaw.com](https://www.hyrumslaw.com/). Stripe: `Idempotency-Key` ([Stripe docs](https://docs.stripe.com/api/idempotent_requests)).
- On screen only (not said): Egor Homakov's surname, Tartaro and DEF CON, "29 Feb 2012", the UTC tip, the code lines.
- Careful wording kept: "part of Azure went down" (Microsoft calls it partial); "most websites" (BBC's words); "$12,000 in fines" (dollars, not a ticket count).

### 7f. Sources (every link, date, number)
- Title character counts and keyword positions: Python `len()` and `str.find()` on 2026-11-02 (title 1: 52 characters, keyword ends at 34; title 2: 52/35; title 3: 54/30; title 4: 51/14; title 5: 47/19; title 7: 55/20; title 6 is 45 with the keyword ending at 45).
- Search suggestions: https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=… and ds= (Google), 2026-11-02.
- Outlier numbers: yt-dlp 2026.08.19, flat playlist and per-video metadata, 2026-11-02 (table 7c, links there).
- [Stripe docs, Idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [Egor Homakov, Hacking Starbucks for unlimited coffee, 21 May 2015](https://sakurity.com/blog/2015/05/21/starbucks.html)
- [Chris Baraniuk, The names that break computer systems, BBC Future, 25 March 2016](https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [droogie, Go NULL Yourself, DEF CON 27 (YouTube)](https://www.youtube.com/watch?v=TwRE2QK1Ibc); [IOActive event page](https://ioactive.com/event/def-con-27-joseph-tartaro); [Sophos, 15 Aug 2019](https://news.sophos.com/en-us/2019/08/15/null-license-plate-gets-security-researcher-12k-in-tickets/); [The Drive](https://www.thedrive.com/news/29388/california-mans-plot-to-avoid-tickets-with-null-vanity-plate-nets-him-12k-in-fines)
- [Microsoft, Summary of Windows Azure Service Disruption on Feb 29th, 2012](https://azure.microsoft.com/en-us/blog/summary-of-windows-azure-service-disruption-on-feb-29th-2012/)
- [EU Directive 2000/84/EC](https://eur-lex.europa.eu/eli/dir/2000/84/oj); [timeanddate EU DST](https://www.timeanddate.com/time/europe/eu-dst.html); [sigmalive, EU renews debate](https://en.sigmalive.com/eu-renews-debate-on-ending-daylight-saving-time)
- [PHP mb_strlen](https://www.php.net/manual/en/function.mb-strlen.php); [PHP Normalizer](https://www.php.net/manual/en/class.normalizer.php)
- [Hyrum's Law](https://www.hyrumslaw.com/); [Software Engineering at Google, ch. 1](https://abseil.io/resources/swe-book/html/ch01.html)
- AWS 19-20 Oct 2025 outage: [BleepingComputer](https://www.bleepingcomputer.com/news/technology/amazon-this-weeks-aws-outage-was-caused-by-major-dns-failure/), [InfoQ](https://www.infoq.com/news/2025/11/aws-dynamodb-outage-postmortem); Atlassian 14 May 2026: [status page](https://jira-software.status.atlassian.com/incidents/zq3f0j7wph20); T-Mobile April 2025: [PhoneArena](https://www.phonearena.com/news/t-mobile-autopay-double-charge-refund_id169506)
- Her channel baseline: https://www.youtube.com/@WithGbemi/videos (yt-dlp, last 25 uploads, 2026-11-02)

# Refined kit: cookies, localStorage and sessionStorage, the three places a website keeps things in your browser

> **THE CURRENT KIT** for this video. Last updated: 2026-11-20 (caption accuracy pass: 4 caption fixes, 30 clip edges moved into silence; STATUS.md 2026-11-20). Before that: 2026-11-19 23:55 (text cleanup in the graphics; "But there are two exceptions" cut from the full edit too, so the chapters after 3:08 moved 7.5 s earlier (1b, 1c); teaser order changed: her opening line "Cookies, localStorage and sessionStorage" now comes as a title card right after "So how does the server know that it's you?" (section 4). Earlier today: thumbnails reworked from your 50 new picks)

Written 2026-11-02 by the social media strategist from your recording (`kit/raw-video.mov`, 5:21 raw, 5:20 after cleanup; `kit/transcripts/transcript.srt` + `CLEANUP.md`) and your kit version 3 (now `../archive/original-kit/14-cookies-localstorage-sessionstorage-kit.md`). The recording wins over the kit. There is no BRIEF.md for this project: section 7e is the fact list. Everything usable from your kit (X posts, replies, carousel, essay) is merged in below and fixed to what you actually said. Everything below is built; you export from the studio.

## Upload checklist (do these in order)
1. **Export the video**: open http://localhost:7700/moment/cookies-localstorage-sessionstorage/full/ , Export 16:9 at speed 1× (it lands in your Downloads).
2. **YouTube**: upload it; title **I Closed the Tab and My Cart Was Still There. Here's Why** (pairs with thumbnail 01b, 2026-11-19; the search title "localStorage vs sessionStorage vs Cookies (What Goes Where)" is the safe second choice); description + chapters (1b, 1c), tags (1d), pinned comment (1e).
3. **Thumbnail**: `outputs/thumbnails/01b-cart-still-here.png` (section 2, set 2026-11-19). Test & Compare: add `18-what-did-you-accept.png` and `17-not-just-cookies.png`. (Before 2026-11-19 this said 01 + Test & Compare 03 and 10.)
4. **Same day**: LinkedIn post (6a), X thread (6b), community post (6c) and short SH8 (section 3; export it from its editor and pick the cover frame at 0:00 when you upload).
5. Then one short a day in the posting order at the top of section 3. Every short and the teaser end on the drawn "Full video on YouTube" card, which still shows thumbnail 01 and the old title: if you upload 01b, swap the picture there too (scrub to the end of a short, click the thumbnail, "Change picture…" -> 01b-cart-still-here.png) and the title.

## Questions for Gbemi

1. **Segments 7, 8 and 9 of your kit are not in the recording.** The recording goes from "...unless the server explicitly marks them HttpOnly" (raw 4:39) straight to your summary (4:40). Missing: **7** the cookie security flags (HttpOnly, Secure, SameSite Strict / Lax / None), **8** where to store your login token (localStorage + Authorization header vs an HttpOnly cookie, XSS, the OWASP quote, CSRF), **9** cookies and sessions in Laravel (shop-online-session, EncryptCookies). About 575 words, roughly 4-5 minutes. Did you record them in another file? If not, **my recommendation: record them as a separate part 2 video**, "Where to Store Your Login Token: localStorage or Cookie?" (4-5 min). "where to store jwt token", "cookies vs local storage for jwt" and "httponly cookie vs localstorage" are their own searches (7b), so part 2 gets found on its own, and each video's end screen sends people to the other (more watch time on your channel). The three independent short scripts in section 3 are those segments, written as shorts, so you can record them in the same sitting. Everything in this kit only promises what this recording says: no title, description or caption mentions tokens, JWT, flags or Laravel.
2. **"But there are two exceptions" (raw 3:08) is followed by only one** (the private or incognito window). Then you say "Also, localStorage data is never sent to the server", which is a separate point. The second exception in your kit is Safari: with Intelligent Tracking Prevention on (its default), Safari deletes a site's script-writable storage, localStorage included, after seven days of Safari use without the user interacting with the site ([WebKit blog, March 2020](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)). **Recommendation:** keep your line and put both exceptions on screen as a small card at 3:08-3:14 (private window + Safari, with "Source: WebKit" credit). The other choice is to cut "But there are two exceptions." (raw 187.94-189.46, 1.5 s) in the edit. Which do you prefer?
3. **The cold open from your kit was not recorded** (the checkout form that disappears while the cart and login stay). You did say both halves later, so I built the cold open from your own lines (1f): the cart line (raw 2:20) and the form line (raw 3:23), then your first line. OK to move them to the front? (Recommended yes; it is 12.7 s and they still play again in their places.)
4. **No closing line.** It ends on "...the half-filled checkout form is probably in sessionStorage." That is a clean last line and works with an end screen. If you want a sign-off, a 10-second line to record is in 1f ("If you want to know where your login token should go..."), which only makes sense once part 2 exists.
5. **Listen at raw 1:03-1:07**: whisper heard "you see things like a set cookie, a set necessary cookie". It is almost certainly "accept cookies, accept necessary cookies" (the cookie banner). Captions will say "accept cookies, necessary cookies, and all of that" unless you hear something else.
6. **Listen at raw 3:51-3:55**: "like a half-filled form, or search field tab that someone picks". Is it "the search filter tab someone picks"? Captions will say "or the search filter someone picks" unless you tell me otherwise.
7. **Small slip, no fix needed:** at 0:36 the cloakroom ticket has "a name on it", then at 0:43 they "use that number". The picture on screen will be a numbered ticket, which matches what the ticket does.
8. **You already have a video on this exact topic**: "Local Storage vs Session Storage vs Cookies | Examples | UseCase | Syntax" (https://www.youtube.com/watch?v=3YNOsgIrUvI, 12:45, 2,327 views when we checked on 2026-11-02, while the median of your last 25 uploads is 102 views: **22.8 times your usual**). It is your proof that this search topic works for you. Recommendation: keep the new title different (recommended title 1 below is), link the old one in the description as the code walkthrough, and use it on the end screen. Is it OK to link it?
9. **Video length: 5:20.** Watch hours count at any length, but this is shorter than your 8-15 minute tutorials. The part 2 video in question 1 plus end screens linking the two (and the old video) is the cheapest way to turn one search visit into 10+ minutes.
10. **Facts to check (CLEANUP.md: none wrong).** I re-checked each one on live sources on 2026-11-02, all correct:
    - "Each cookie can hold about 4 kilobytes" ✓ ([RFC 6265 section 6.1](https://www.rfc-editor.org/rfc/rfc6265#section-6.1): browsers should support at least 4096 bytes per cookie).
    - "Most browsers give you about five megabytes per website. But it varies." ✓ ([MDN, Storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria): "Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin.")
    - Session cookies "meant to" be deleted, because tabs get restored ✓ ([MDN, Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie): "Session cookies will also be restored, as if the browser was never closed.")
    - Private or incognito window clears it ✓ (MDN quotas page: "stored data is usually deleted when the private browsing mode ends").
    - Origin = protocol + domain + port ✓ ([MDN, Origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)).
    - HttpOnly stops JavaScript reading a cookie through document.cookie ✓ (MDN Set-Cookie: "Forbids JavaScript from accessing the cookie, for example, through the Document.cookie property").
    - A second tab you open yourself gets its own sessionStorage ✓ ([MDN, Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage): "Opening a page in a new tab or window creates a new session").
11. **A photo for thumbnails**: one of you without the mic, holding a real chocolate-chip cookie (T3 and T6 use it), and one at a laptop. Video frames will work, but your own photos have always done better.

**What you actually say vs your kit (the recording wins; details in 7e):**
1. The video opens on "Cookies, localStorage and sessionStorage." (kit: the checkout-form cold open, and "by the end of this video, you will know where to keep what").
2. Cloakroom: "We have something similar in my school" (kit: "We live in the Baltics, and there's usually a cloakroom at an event").
3. Added: "If you use a website, you see things like accept cookies, necessary cookies, and all of that" and "You obviously don't want to keep very important things in sessionStorage."
4. Not said: Chrome's 400-day cookie limit; the http and https versions of a site getting separate localStorage; Safari's seven days (see question 2).
5. Not said: segments 7, 8 and 9 in full (question 1). Your summary is shorter: no "nothing secret goes into localStorage or sessionStorage" line.

## At a glance
| | |
|---|---|
| Topic | The three places a website can keep things in your browser (cookies, localStorage and sessionStorage), how long each one lasts, and who can read them, explained with an online shop. |
| Recommended title | **localStorage vs sessionStorage vs Cookies (What Goes Where)** (59 characters) |
| Recommended thumbnail | **01 "Why is my cart still here?"** `outputs/thumbnails/01-cart-still-here.png` with the title **localStorage Explained: Why Your Cart Is Still There**. Test & Compare with **02 "localStorage isn't private"** and **03 "sessionStorage: refresh vs close tab"** (section 2). |
| File to upload | The full edit you export from http://localhost:7700/moment/cookies-localstorage-sessionstorage/full/ (16:9, 5:20). The motion film was dropped (your rule 2026-11-07). Chapters in 1c are timed to this edit. |
| Posting order | 1. Long video + LinkedIn post (6a) + X thread (6b) + community post (6c), a weekday morning CET  2. Same day: SH8 "Cookies vs localStorage vs sessionStorage in 25 seconds" (the search short)  3. Day 2: SH5 "What is localStorage?" + teaser on LinkedIn and X  4. Day 3: SH6 "What is sessionStorage?" + Instagram carousel  5. Day 4: SH1 "HTTP is stateless" + LinkedIn carousel  6. Day 5: SH7 "Who can read your localStorage?"  7. Then one a day: SH2, SH3, SH4, SH9  8. When recorded: part 2 video + independent shorts IS1-IS3 |
| Files | Thumbnails `outputs/thumbnails/` (+ `overview.png`) · edit them at http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ · full edit, shorts and teaser are studio editors (links in sections 3 and 4); you export, nothing goes to Downloads from us. Carousels `outputs/carousels/instagram/` and `outputs/carousels/linkedin/`. |
| Where each platform's text is | YouTube title, description, chapters, tags, pinned comment, first 30 seconds, edit notes: **section 1** · Thumbnails: **2** · Shorts (YouTube Shorts, TikTok, Reels, LinkedIn, X, per short) + independent short scripts: **3** · Teaser bites + posts: **4** · Carousels: **5** · Main LinkedIn post, X thread, community post, more X posts, replies, essay: **6** |
| Open questions | 1. Segments 7-9: record as part 2? (recommended) 2. "Two exceptions": on-screen card or cut? 3. OK to open with your cart + form lines? 4. Listen at 1:03 and 3:51. 5. Link your older video on this topic? 6. A photo of you holding a cookie, no mic. (Full list above.) |

## 1. YouTube

### 1a. Titles
All checked by code (7d): 40 to 60 characters. Search-led titles start with the exact phrase people type (7b). Note: the three-way phrase "localStorage vs sessionStorage vs Cookies" is 41 characters by itself, so it starts at character 1 and ends at 41; there is no shorter way to write the exact search phrase. Your older video proves the search works for you (22.8x your usual, 7c), and the top outliers of the last year in this niche are plain, specific titles (7c).

| # | Title | Characters | Type | Pairs with thumbnail |
|---|---|---|---|---|
| 1 | localStorage vs sessionStorage vs Cookies (What Goes Where) | 59 | **recommended**, search-led, **Test & Compare with T1, T7, T10** (cold 8) | T1, T7, T10 |
| 2 | Cookies vs localStorage vs sessionStorage: Which to Use? | 56 | search-led, other word order (cold 7: kept for search) | T1, T4 |
| 3 | Local Storage vs Session Storage vs Cookies (Shop Example) | 58 | search-led, spaced spelling (cold 6: kept for search, use only if 1 and 2 stall) | T4 |
| 4 | Session Storage vs Local Storage: Why Your Form Disappeared | 59 | search-led (cold 8) | T7 |
| 5 | What Are Browser Cookies? How Websites Remember You | 51 | search-led, non-developer search (cold 7) | T3, T6 |
| 6 | Why Websites Need Cookies (HTTP Is Stateless) | 45 | search-led, "http is stateless" search (cold 7) | T6, T3 |
| 7 | localStorage vs Cookies: Who Can Read Your Data? | 48 | search-led (cold 8) | T2 |
| 8 | Why Your Cart Stays but Your Checkout Form Disappears | 53 | click-led (cold 8) | T7, T10 |
| 9 | What Survives When You Close a Tab? Cookies vs Storage | 54 | click-led (cold 8) | T10, T5 |
| 10 | Any Script on Your Page Can Read Your localStorage | 50 | click-led, her own line at 4:21 (cold 8) | T8, T2 |
| 11 | How Does a Website Know It's You? Cookies Explained | 51 | click-led (cold 8) | T6, T3 |

**New title options (2026-11-19)**, in the voice of your 50 picks (first person, a confession or "here's why", words people say out loud), each paired with a thumbnail from the 2026-11-19 set. The table above is kept.

| Title | Characters | Pairs with thumbnail |
|---|---|---|
| I Closed the Tab and My Cart Was Still There. Here's Why | 56 | 01b |
| localStorage Is Why Your Cart Is Still There | 44 | 01b |
| How Websites Remember Your Cart (localStorage vs Cookies) | 57 | 01b |
| Why Every Website Asks About Cookies (Explained Simply) | 55 | 18 |
| What Happens When You Click Accept All Cookies? | 47 | 18 |
| What Are Browser Cookies, Really? (Explained Simply) | 52 | 18 |
| Where Websites Really Keep Your Cart and Login | 46 | 17 |
| How Websites Remember You (It's Not Only Cookies) | 49 | 17 |
| Cookies vs localStorage vs sessionStorage: What I Wish I Knew | 61 | 17 |
| Any Script on Your Page Can Read localStorage | 45 | 03 |
| Is localStorage Safe? I Checked Who Can Read It | 47 | 03 |
| localStorage vs Cookies: Which One Can Scripts Read? | 52 | 03 |
| How Websites Keep You Logged In (It's a Cookie) | 47 | 08 |
| How Login Cookies Actually Work | 31 | 08 |
| What's Actually Inside a Browser Cookie? | 40 | 08 |
| Cookies vs localStorage: Why Not Just Use the Bigger One? | 57 | 15 |
| Why Websites Don't Keep Everything in Cookies | 45 | 15 |
| localStorage vs Cookies: How Much Can Each Hold? | 48 | 15 |

### 1b. Description
Paste as is. Replace the chapter times after the export (1c).
```text
Cookies, localStorage and sessionStorage are the three places a website can keep things in your browser, and they behave very differently. I made this video to explain each one with an online shop, how long each one lasts and who can read them.

Before any of them can make sense, you need to know why a browser has to remember anything at all. HTTP is stateless, so every request your browser sends stands on its own and the server doesn't remember the one before it. A cookie kind of works like the ticket you get at a cloakroom (we have something similar in my school). They don't remember your face because there's a lot of people, they just use the ticket. After you log in, the server gives your browser a cookie with a session ID in it, and your browser shows it on every request after that.

localStorage is the reason your cart is still there when you close the browser and come back, and sessionStorage is the reason a half-filled checkout form can disappear when you close the tab. The other big difference between all three of them is who gets to read them, because any JavaScript running on your page can read localStorage and sessionStorage, and that includes the third-party scripts you added, like an analytics script or a chat widget.

If you want the code side (setItem, getItem and examples), I made an earlier video on it: https://www.youtube.com/watch?v=3YNOsgIrUvI

What do you keep in localStorage in your own projects?

CHAPTERS
0:00 Why the browser has to remember anything
0:58 Cookies
2:15 localStorage
3:19 sessionStorage
3:58 Who can read cookies, localStorage and sessionStorage
4:38 Summary: the login, the cart and the checkout form

SOURCES AND FURTHER READING
MDN, Using HTTP cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
MDN, Set-Cookie header (session cookies, HttpOnly): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
MDN, Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
MDN, Window.sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
MDN, Storage quotas and eviction criteria (the 5 MiB figure): https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
RFC 6265, HTTP State Management Mechanism (cookies): https://www.rfc-editor.org/rfc/rfc6265
OWASP HTML5 Security Cheat Sheet (local storage): https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
WebKit, Full Third-Party Cookie Blocking and More (Safari's seven days): https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/

CONNECT WITH ME
LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
Twitter/X: https://x.com/OladetounGee
Instagram: https://www.instagram.com/officialgbemmy/
Website: https://www.gbemisolaoladetoun.com/

#localstorage #javascript #webdevelopment
```
(The WebKit link can go: since 2026-11-19 the "two exceptions" line is cut from the full edit (no Safari card). Check the 3 hashtags before posting.)

### 1c. Chapters
**Chapters, not parts**: the video has clear separate sections (why the browser remembers, then each of the three, then who can read them, then the summary). Six chapters, inside the 5-7 limit.

**Which times:** the cleaned edit (CLEANUP.md). The only cut is 1.4 s of room tone after your last word, so the cleaned times equal the raw times; mapped with code (cleaned = raw minus the length of every cut before it). The description uses the last column, which adds the 12.7 s cold open (1f) to every chapter after the first. **These get re-timed to the exported `outputs/talking-head/talkinghead-full_16x9.mp4`** (and the motion film, if you upload that instead) from its own .srt once it exists.

**Re-timed 2026-11-19 (current):** "But there are two exceptions." (raw 3:07.9-3:09.45) is now cut from the full edit as well (your rule: cut a mistake, no correction card) and the 6-second Safari correction pause is gone, so every chapter after 3:08 is 7.5 s earlier than before: **0:00 / 0:58 / 2:15 / 3:19 / 3:58 / 4:38** (in 1b). Full edit length 5:18.

(Old) **Re-timed 2026-11-06 to the built full edit** (`/moment/cookies-localstorage-sessionstorage/full/`, the file you export as `talkinghead-full_16x9.mp4`): no cold open was added (question 3 is still open), and a 6-second correction pause sits after "…when you close the window" (3:13), so every chapter after it is 6 s later. The description in 1b uses these times: 0:00 / 0:58 / 2:15 / 3:27 / 4:06 / 4:46. If you upload the motion film instead (no pause, 0.4 s lead-in): 0:00 / 0:58 / 2:15 / 3:21 / 4:00 / 4:40.

| Chapter | Starts on (her words) | Raw | Cleaned edit | Cleaned edit + cold open (in 1b) |
|---|---|---|---|---|
| Why the browser has to remember anything | "Cookies, localStorage and sessionStorage." | 0:00.5 | 0:00 | 0:00 (the cold open sits inside this chapter) |
| Cookies | "So the first place that a website can keep something in your browser is in a cookie." | 0:58.4 | 0:58 | 1:11 |
| localStorage | "The second place a website can keep things in your browser is localStorage." | 2:15.1 | 2:15 | 2:27 |
| sessionStorage | "The third place is the sessionStorage." | 3:21.0 | 3:21 | 3:33 |
| Who can read cookies, localStorage and sessionStorage | "Now, who can read cookies, localStorage, sessionStorage?" | 4:00.1 | 4:00 | 4:12 |
| Summary: the login, the cart and the checkout form | "So based on the comparison, cookies are small..." | 4:40.2 | 4:40 | 4:52 |

### 1d. Tags
```text
localstorage vs sessionstorage vs cookies, cookies vs localstorage vs sessionstorage, local storage vs session storage vs cookies, localstorage vs sessionstorage, local storage vs session storage, cookies vs local storage, localstorage vs cookies, session storage, localstorage, browser cookies, what are cookies, http is stateless, session cookie, httponly cookie, browser storage, web storage api, javascript, web development
```
(427 characters, checked by code.)

### 1e. Pinned comment
```text
What do you keep in localStorage in your own projects? I'm curious if anyone has moved something out of it after thinking about who can read it 😅
```

### 1f. First 30 seconds of the edit
**Hook type:** scenario puzzle about an everyday act (SOCIAL-PLAYBOOK hook library, "Number puzzle about an everyday act" / "Scenario question", #25, #32), then the topic said plainly. **Format:** talking head with a full-width browser running example and real DevTools receipts (nandini_mpe "talking head + receipts", #08, #21) with a few kodekloud-style drawn inserts (#03).

| Edit time | What plays (raw times) | On screen | Motion / sound |
|---|---|---|---|
| 0.0-7.4 s | Her line, raw 140.30-147.65: "localStorage is the reason why maybe you add something to your cart and close the browser, and when you come back and reopen it, you still see the stuff in your cart." | **Frame 1 (0-3 s):** a generic online-shop browser window full frame, cart icon with a badge "2", her small in a corner circle. Written hook top: **"Close the tab. What stays?"** At 1.4 s ("close the browser") the window shuts; at 3.0 s it reopens and the badge is still "2". | Slow push-in on the window from frame 1 (visual hook), a soft click on the close button, a pop as the badge reappears. |
| 7.8-12.3 s | Her line, raw 203.18-207.71: "It's the reason why a half-filled checkout form can disappear when you close the tab." | Label "sessionStorage" slides in over "It's"; a checkout form with three filled fields, the tab closes, the fields come back empty. | Paper-tear or erase sound on the empty form. |
| 12.7 s → | Her real opening, raw 0.52 onward: "Cookies, localStorage and sessionStorage. Before cookies and localStorage and all of it can make sense, you need to know first of all why a browser has to remember anything at all." | Topic card in big type on her first word: **COOKIES · localStorage · sessionStorage** as three labelled boxes (cookie, cart, form). | One impact on the topic card. |
| ~22-30 s | "The web runs on HTTP, and HTTP is stateless..." (raw 9.62) | Black phrase card **"HTTP is stateless."** (0.8 s), then two request cards with no link between them. | Typewriter tick on the card. |

**The open loop:** the cold open shows two of the three answers (cart and form) and leaves out the login. "And your login?" is the question the video answers at the very end (raw 306.08: "the login is most likely an HttpOnly cookie"). Put a tiny third box with a question mark on the topic card, and fill it in only at the summary.

**Optional sign-off to record (10 s, only once part 2 exists):** "If you want to know where your login token should go, cookie or localStorage, I made a second video just on that."

### 1g. Edit notes for the editor
**One running example for the whole video:** her online shop (she says "shopping website", "my e-commerce store", "our online shop"). One generic browser window that never changes design: a login state ("Hi, Ada"), a cart badge, and a three-field checkout form. Every concept acts on this window: the cookie travels with each request, the cart survives a browser close, the form clears on tab close. No real shop's brand or logo.

**Receipts within 5 s of each claim** (real pages, cropped, key words highlighted, small source credit):
| Raw time | Her claim | Receipt |
|---|---|---|
| 0:09.6 | "HTTP is stateless" | RFC 6265 abstract, "stateful session over the mostly stateless HTTP protocol" highlighted (https://www.rfc-editor.org/rfc/rfc6265) |
| 1:02.7 | "you see things like accept cookies, necessary cookies" | a generic cookie banner mockup (no real brand) with "Accept all" / "Necessary only" |
| 1:14.0 | "a header on the response called Set-Cookie" | Real Chrome DevTools Network tab, a response header `Set-Cookie: session_id=...` (record it on any local dev site) |
| 1:25.6 | "Each cookie can hold about 4 kilobytes" | RFC 6265 section 6.1, "at least 4096 bytes per cookie" highlighted |
| 1:39.9 | "I say meant to because a lot of browsers can restore your tab" | MDN Set-Cookie warning box: "Session cookies will also be restored, as if the browser was never closed." |
| 1:57.3 | "through document.cookie" | DevTools Console: `document.cookie` returning a string |
| 2:27.5 | "a simple store of key and value" | DevTools Application > Local Storage, a key `cart` with a JSON value |
| 2:37.8 | "JSON.stringify / JSON.parse" | two lines of code on screen only (she doesn't read code out) |
| 2:44.1 | "about five megabytes per website. But it varies." | MDN quotas page, "up to 5 MiB of local storage" highlighted |
| 2:52.8 | "the origin, which is the protocol, the domain name, the ports" | the address bar split into three coloured parts: `https://` `shop.example` `:443` |
| 3:08.4 | "two exceptions" | CUT 2026-11-19 (her rule: cut a mistake, no correction card): the line is gone in the full edit and sh05; the private window is shown as one more crash test (cart, "Private window", Gone) |
| 3:27.5 | "setItem, getItem, removeItem" | three method names typed on |
| 3:42.0 | "the second tab gets its own separate sessionStorage" | two real tabs side by side in DevTools, one with `checkout_form`, one empty |
| 4:21.4 | "any JavaScript running on your page can read your localStorage" | DevTools Console: `localStorage.getItem("cart")` from a second "widget.js" script (generic name) |
| 4:32.8 | "except the server explicitly marks them HttpOnly" | DevTools Application > Cookies with the HttpOnly column ticked; Console `document.cookie` not showing it |

**Black phrase cards** (pure black, one accent, her words; 0.8-1.5 s each, on the word):
- raw 0:11.4 "HTTP is stateless."
- raw 0:46.5 "A cookie kind of works like that ticket."
- raw 2:33.2 "It only stores strings."
- raw 3:35.8 "sessionStorage belongs to one tab."
- raw 4:21.4 "Any JavaScript on your page can read it."
- raw 5:06.1 the summary as a three-row card that fills in on her words: login = HttpOnly cookie, cart = localStorage, checkout form = sessionStorage (this is also the screenshot-able end table; hold it 4 s).

**Pexels photos and video (search words; key at ~/.config/pexels/key; do not download in this task):** "cloakroom", "coat check ticket", "coat rack jackets" (0:29-0:49); "online shopping laptop", "add to cart phone" (cart line); "closing laptop", "browser tabs" (tab close); "typing credit card form" (checkout form); "server room" (requests going to the server, 1:20). Record each licence in NOTES.md.

**Recording-vs-kit fixes on screen:** captions say "So how does the server know that it's you?" at raw 0:27 (whisper heard "So, as the server knows"); "accept cookies, necessary cookies" at 1:03 (question 5); "half-filled" at 3:24 and 3:51 (whisper: "R field", "app-filled"); "third-party" at 4:28; "HttpOnly" spelled that way everywhere; "localStorage" and "sessionStorage" as one word. Apply `kit/transcripts/corrections.json` to every caption.

## 2. Thumbnails
**Set 2026-11-19 (rework from your 50 picks, projects/THUMBS-REWORK-BRIEF-2026-11-19.md).** 6 thumbnails. Each copies one pick or board item, fonts from the font board in their own colours, your Øredev photos used as well as the shoot. Words are a second message next to the title (a question or a twist, 3-5 words), and fewer of them (your 11-19 note on tiny text). A fresh cold critic saw them as YouTube cards in a feed of 10 of your picks (not the ones copied), 3 rounds, a new critic each round. **Nothing reached 8**; your picks scored 4-8 in the same feed (most 6-7).

**Upload:** 01b + "I Closed the Tab and My Cart Was Still There. Here's Why". **Test & Compare:** 18 + 17. (Previous recommendation, 2026-11-13 to 11-16: 01 + "localStorage Explained: Why Your Cart Is Still There", Test & Compare 03 + 10.)
The shorts' and teaser's ending card still shows 01 (not repointed): change it to 01b in the editor if you upload 01b.
Sheets: `outputs/_review/thumbnails-2026-11-19.jpg` (each as a YouTube card beside the pick it copies) · `outputs/_review/thumbnails-2026-11-19-retired.jpg`. Edit: http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/

### 01b · "why is my cart / still here?"
![](../outputs/thumbnails/01b-cart-still-here.png)

kept (11-16); copies board Thumbnails 21; Font 57.
Titles: 1. I Closed the Tab and My Cart Was Still There. Here's Why · 2. localStorage Is Why Your Cart Is Still There · 3. How Websites Remember Your Cart (localStorage vs Cookies)
Score (cold critic round 3, alone / with title 1): 7 / 7 · **UPLOAD**

### 18 · "what did you / just accept?"
![](../outputs/thumbnails/18-what-did-you-accept.png)

NEW, copies pick1119-43 (How to never procrastinate); Font 64 (Inter Tight Bold + red box on black); replaces 10.
Titles: 1. Why Every Website Asks About Cookies (Explained Simply) · 2. What Happens When You Click Accept All Cookies? · 3. What Are Browser Cookies, Really? (Explained Simply)
Score (cold critic round 3, alone / with title 1): 7 / 7 · Test & Compare

### 17 · "it's not just cookies."
![](../outputs/thumbnails/17-not-just-cookies.png)

NEW, copies pick1119-22 (I'm 45. If you're in your 30s, watch this.); your Øredev photo (orange top); Font 35 (Montserrat ExtraBold, white + yellow word).
Titles: 1. Where Websites Really Keep Your Cart and Login · 2. How Websites Remember You (It's Not Only Cookies) · 3. Cookies vs localStorage vs sessionStorage: What I Wish I Knew
Score (cold critic round 3, alone / with title 1): 7 / 7 · Test & Compare

### 03 · "anyone can / read this. (panel: localStorage)"
![](../outputs/thumbnails/03-localstorage-isnt-private.png)

kept, words reworked (was "localStorage isn't private.", which gave the answer away); copies board Thumbnails 31; Font 58.
Titles: 1. Any Script on Your Page Can Read localStorage · 2. Is localStorage Safe? I Checked Who Can Read It · 3. localStorage vs Cookies: Which One Can Scripts Read?
Score (cold critic round 3, alone / with title 1): 7 / 6

### 08 · "what's in a browser cookie?"
![](../outputs/thumbnails/08-whats-in-a-browser-cookie.png)

kept on its record (8 alone on 11-16); copies board Thumbnails 91; Font 14 + Font 63.
Titles: 1. How Websites Keep You Logged In (It's a Cookie) · 2. How Login Cookies Actually Work · 3. What's Actually Inside a Browser Cookie?
Score (cold critic round 3, alone / with title 1): 5 / 4 in round 3 with "user: ???" on the ticket; back to "user: Ada / logged in: yes" (the 11-16 version), not re-scored · under 7

### 15 · "4 KB vs 5 MB"
![](../outputs/thumbnails/15-4kb-vs-5mb.png)

NEW, copies pick1119-39 (How to Scale from 1 to 1,000,000 Users); no face; Font 2 (Big Shoulders, black on orange).
Titles: 1. Cookies vs localStorage: Why Not Just Use the Bigger One? · 2. Why Websites Don't Keep Everything in Cookies · 3. localStorage vs Cookies: How Much Can Each Hold?
Score (cold critic round 3, alone / with title 1): 6 / 6 on a grey ground; moved to orange after, not re-scored · under 7

### Earlier sets (kept for the record; retired ones now live in archive/thumbnails-retired-2026-11-19/)

Rebuilt 2026-11-13 (FULL-KIT brief, six rounds with a fresh cold critic): 9 options, each copying a DIFFERENT thumbnail-board composition ("Thumbnails N"), fonts only from the font board in that item's own colours ("Font N"), your shoot (outfit A, white shirt; Enhance photo, face untouched). Mix: her photo or cut-out 4 (01 03 06 09), no face 5 (05 08 10 12 13). Only 03 is "words left + you right". Edit any of them: http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ . The 2026-11-10 set is in the Bin (`~/.Trash/cookies-thumbnails-old-2026-11-13/`).
Scores below are the fresh critic's last round (alone / with title 1). Honest note: none reached 8 alone; 03 reached 8 with its title.

**Upload:** 01 with title 1 (it is also the picture on the shorts' and teaser's ending). **Test & Compare:** 03 + 10.

**2026-11-16 rework test (06, 09, 12):** each got a new version (06b "Where websites save your login & cart", 09b "HOW YOU STAY LOGGED IN" with you holding a cookie, 12b "CLOSE THE TAB. WHAT STAYS?" on a notepad). A fresh cold critic scored old and new side by side for three rounds; no new version beat its old one (final round: 06 6 vs 06b 6, 09 7 vs 09b 6, 12 6 vs 12b 6), so the set and the recommendation are unchanged. Side by side: `outputs/_review/thumbnails-before-after-2026-11-16.jpg`. The new versions are kept in `archive/thumbnails-weakest-2026-11-16/` if you want one back.
**01b (2026-11-16):** 01 with one fix, the two empty grey squares in the cart now show a running shoe and a water bottle (generic drawings, no brand); everything else is 01. In the same cold round **01b scored 7, 01 scored 5**, so 01b scores higher. The recommendation stays 01 (your call): if you upload 01b, swap the picture on the shorts' ending too.

#### 01 · "why is my cart / still here?" (Thumbnails 21 · Font 57)
![](../archive/thumbnails-retired-2026-11-19/png/01-cart-still-here.png)

Titles: 1. localStorage Explained: Why Your Cart Is Still There · 2. How Websites Remember Your Cart (localStorage vs Cookies) · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 6 / 7 · UPLOAD

#### 01b · "why is my cart / still here?" with product pictures (Thumbnails 21 · Font 57)
![](../outputs/thumbnails/01b-cart-still-here.png)

Titles: same as 01 (1. localStorage Explained: Why Your Cart Is Still There)
Scores: fresh cold critic 2026-11-16 (alone): 7 (01 in the same round: 5)

#### 03 · "localStorage isn't private." (Thumbnails 31 · Font 58)
![](../outputs/thumbnails/03-localstorage-isnt-private.png)

Titles: 1. Is localStorage Safe? Who Can Read Your Data · 2. localStorage vs Cookies: Which Is More Secure? · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 7 / 8 · Test & Compare

#### 05 · "sessionStorage: refresh = still there / close tab = gone" (Thumbnails 69 · Font 49)
![](../archive/thumbnails-retired-2026-11-19/png/05-refresh-vs-close-tab.png)

Titles: 1. sessionStorage: Why Your Form Disappears When You Close the Tab · 2. sessionStorage vs localStorage: What Survives a Closed Tab? · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 6 / 7

#### 06 · "WHAT GOES WHERE?" (Thumbnails 63 · Font 61 + Font 58)
![](../archive/thumbnails-retired-2026-11-19/png/06-what-goes-where.png)

Titles: 1. localStorage vs sessionStorage vs Cookies (What Goes Where) · 2. Cookies vs localStorage vs sessionStorage: Which One to Use? · 3. Where Online Shops Keep Your Login, Cart and Form
Scores: fresh cold critic round 6 (alone / with title): 6 / 7

#### 08 · "what's in a browser cookie?" (Thumbnails 91 · Font 14 + Font 63)
![](../outputs/thumbnails/08-whats-in-a-browser-cookie.png)

Titles: 1. What's Actually Inside a Browser Cookie? · 2. How Login Cookies Work: Session IDs Explained Simply · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 7 / 7

#### 09 · "HOW AM I STILL LOGGED IN?" (Thumbnails 44 · Font 72)
![](../archive/thumbnails-retired-2026-11-19/png/09-still-logged-in.png)

Titles: 1. How Do Websites Keep You Logged In? (Cookies Explained) · 2. How Login Cookies Work: Session IDs Explained Simply · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 6 / 5 (old title; retitled after)

#### 10 · "why every website asks about cookies" (Thumbnails 112 · Font 67 + Font 58)
![](../archive/thumbnails-retired-2026-11-19/png/10-why-websites-ask-about-cookies.png)

Titles: 1. Why Websites Need Cookies (Explained Simply) · 2. What Are Browser Cookies? Why Every Site Asks You to Accept Them · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 7 / 7 · Test & Compare

#### 12 · "Close the tab. What's left?" (Thumbnails 36 · Font 17)
![](../archive/thumbnails-retired-2026-11-19/png/12-close-the-tab-whats-left.png)

Titles: 1. Close the Tab: What Your Browser Keeps (Cookies vs localStorage vs sessionStorage) · 2. Why Your Cart Stays but Your Checkout Form Disappears · 3. localStorage vs sessionStorage vs Cookies (What Goes Where)
Scores: fresh cold critic round 6 (alone / with title): 6 / 7

#### 13 · "COOKIES vs LOCALSTORAGE" (Thumbnails 13 · Font 56 + Font 63)
![](../archive/thumbnails-retired-2026-11-19/png/13-cookies-or-localstorage.png)

Titles: 1. Cookies vs localStorage: Which Should You Use? · 2. localStorage vs Cookies: Where Should Your Data Go? · 3. Cookies vs localStorage (Explained With an Online Shop)
Scores: fresh cold critic round 6 (alone / with title): 6 / 7

## 3. Shorts
Posting order: SH8 (search short) on upload day · SH5 · SH6 · SH1 · SH7 · SH2 · SH3 · SH4 · SH9, one a day, then IS1-IS3 when recorded. Every short is built (you export it from its editor); times are raw, each in point on her first word, out at the next word's start minus 0.03 s. Optional series sub-label for all nine: "browser storage (pt N)". Every short ends on the drawn "Full video on YouTube" card (thumbnail 01 + the title). Each short has its own format (2026-11-10 mix: no two neighbours alike) and a designed cover in its first frame (scrub to 0:00 in the editor to see or edit it; pick it as the cover when you upload).

### SH1 · Why websites need cookies to remember you
File `outputs/shorts/short01-http-is-stateless_9x16.mp4` (built; you export it from its editor) · about 49 s · label on screen "Why websites need cookies to remember you" · from 0:09.62 to 0:58.41 (raw)
Format: **B · Split (the title poster on concrete above you, graphics there)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh01/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 9, 47, 62** · fonts Font 47 shorts-13 (Young Serif), in that board item's own colours (shorts-13) · cover (her real room (a still of her)): **"How do websites / remember you? (cookies)"** (Shift+Enter line breaks are kept).
Hook (first line she says): "The web runs on HTTP, and HTTP is stateless."
Format: **TV / slide behind her** (nandini_mpe #32): a slide on a TV beside her with two request cards, then a cloakroom photo (Pexels "coat check ticket"). Top title **T1 stacked black boxes** ("browser storage (pt 1)" / the label). Captions **C4 serif on black box**.

**YouTube Shorts**
```text
Title: Why websites need cookies (HTTP is stateless)

Description: HTTP is stateless, which means every request your browser sends stands on its own and the server doesn't remember the one before it. So when you log in and then click on My Orders, a cookie is how the server knows it's still you (it works a bit like the ticket you get at a cloakroom).

#Shorts #http #webdevelopment #cookies #javascript

Tags: http is stateless, why http is stateless, what is stateless, how cookies work, what are cookies, browser cookies, session id, how websites remember you, cookies explained, http cookies explained, web development, backend basics, stateless vs stateful explained, how does a website know who you are, session cookie explained
```
**TikTok**
```text
http is stateless, so the server doesn't actually remember you from one request to the next 😅 a cookie is kind of like a cloakroom ticket, they don't remember your face, they just use the ticket
#webdev #http #cookies #learntocode #techtok
```
**Instagram Reels**
```text
HTTP is stateless, which means every request your browser sends stands on its own and the server doesn't remember the one that came before it.

So when you log in and then click on My Orders, the server needs some way to know it's still you. Think about a cloakroom. We have something similar in my school, where you hand over your jacket or your coat and they give you a ticket. They don't remember your face (there's a lot of people), but when you come back, they use the ticket to find your coat. A cookie kind of works like that ticket.

Full video on YouTube, link in bio
#webdevelopment #http #cookies #javascript #learntocode
```
**LinkedIn**
```text
Websites need cookies because HTTP is stateless, and I think that's the best place to start if you want cookies to make sense.

Every request your browser sends stands on its own, and the server doesn't remember the one that came before it. So logging into a shopping website is one request, and clicking on My Orders is a brand new request on its own.

In my video I explained it with the cloakroom we have in my school. You hand over your coat, they give you a ticket, and they don't remember your face because there's a lot of people, they just use the ticket to find your coat when you come back. A cookie kind of works like that ticket, right? After you log in, the server gives your browser a cookie with a session ID in it, and your browser shows it on every request after that.

What analogy did you learn cookies with?

#webdevelopment #http #softwareengineering #backend
```
**X**
```text
http is stateless, so the server doesn't remember you from one request to the next. a cookie is basically the ticket you get at a cloakroom (they don't remember your face, they just use the ticket)
```

### SH2 · What is a browser cookie?
File `outputs/shorts/short02-what-is-a-browser-cookie_9x16.mp4` (built; you export it from its editor) · about 24 s · label "What is a browser cookie?" · from 1:07.94 to 1:31.97 (raw)
Format: **D · Captions on top (the title flashes first)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh02/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 68, 63, 7** · fonts Font 63 thumbs-08 (JetBrains Mono), in that board item's own colours (thumbs-08) · cover (big line alone): **"What's a / cookie in / your browser?"** (Shift+Enter line breaks are kept).
Hook: "A cookie is a small piece of text, usually a name and a value that the server asks your browser to hold on to."
Format: **half and half, you on camera + the running-example graphic** (graphics in kodekloud style, never faceless: her rule 2026-11-02): you in the bottom half of the frame (4x5 window), the top half a black panel with one shop window, a `Set-Cookie` header arriving, then a small cookie riding on every request arrow. Top title **T10 handwritten typed-on** ("WHAT IS A COOKIE?", "Set-Cookie" as the second section title). Captions C6 (one word at a time) on your half only, never over the graphic.

**YouTube Shorts**
```text
Title: What is a browser cookie? (Set-Cookie explained)

Description: A cookie is a small piece of text, usually a name and a value, that the server asks your browser to hold on to. The server sets it with a Set-Cookie header, and after that your browser sends it back with every request to that site, which is why it's good to keep them small (about 4 KB each).

#Shorts #cookies #webdevelopment #http #javascript

Tags: what is a cookie, what are cookies, browser cookies, what are cookies in browser, http cookies explained, set-cookie header, cookie header, how cookies work, cookie size limit, cookies explained, web development, javascript cookies, how do browser cookies work, cookies vs local storage, what are cookies used for
```
**TikTok**
```text
a cookie is honestly just a small piece of text, a name and a value the server asks your browser to keep 🍪 and your browser sends it back with every request to that site
#cookies #webdev #http #learntocode #techtok
```
**Instagram Reels**
```text
If you've ever wondered what a cookie in your browser actually is, it's a small piece of text, usually a name and a value, that the server asks your browser to hold on to.

The server sets it with a header on the response called Set-Cookie. After that, every time your browser sends a request to that site, it sends the cookie back automatically. Each cookie can hold about 4 kilobytes, and it's good to keep them very small because they travel with every request.

Full video on YouTube, link in bio
#cookies #webdevelopment #http #javascript #frontend
```
**LinkedIn**
```text
A browser cookie is a lot simpler than all the cookie banners make it look. It's a small piece of text, usually a name and a value, that the server asks your browser to hold on to.

The server sets it with a Set-Cookie header on the response, and from then on your browser sends it back in a Cookie header with every request to that site, without your code doing anything. Each one holds about 4 kilobytes, and because they travel with every request, it's good to keep them small (you don't want to carry a heavy cookie up to the server on every single click).

Did you know cookies were this simple when you first saw a cookie banner?

#webdevelopment #http #softwareengineering #frontend
```
**X**
```text
a cookie is just a small piece of text the server asks your browser to keep (that's what Set-Cookie does), and your browser sends it back with every request to that site. so keep them small, about 4 KB each
```

### SH3 · How long does a browser cookie last?
File `outputs/shorts/short03-how-long-does-a-cookie-last_9x16.mp4` (built; you export it from its editor) · about 27 s · label "How long does a browser cookie last?" · from 1:32.00 to 1:59.49 (raw)
Format: **G · Letterbox (your whole frame in a band, the title big above)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh03/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 12, 37, 36** · fonts Font 72 thumbs-17 (Inter Tight), in that board item's own colours (thumbs-17) · cover (her real room (a still of her)): **"How long do cookies last?"** (Shift+Enter line breaks are kept).
Hook: "Now, how long can a cookie live?"
Format: **talking head + screenshot as the heading** (nandini_mpe #08): the MDN Set-Cookie warning ("Session cookies will also be restored...") as a white card in the top third, yellow marker on "restored". Top title **T9 screenshot heading** (the label sits in a small box above it). Captions **C3 small serif lowercase**.

**YouTube Shorts**
```text
Title: How long does a browser cookie last?

Description: If the server doesn't give a cookie an expiry, it's a session cookie, and it's meant to be deleted when you close the browser. I say meant to because a lot of browsers restore your tabs, and the session cookie can come back with them. If the server sets Expires or Max-Age, it's a persistent cookie and it stays until that time.

#Shorts #cookies #webdevelopment #javascript #http

Tags: how long do cookies last, session cookie, persistent cookie, session cookie vs persistent cookie, cookie expiry, cookie max-age, cookie expires, session cookies explained, browser cookies, document.cookie, http cookies, web development, how long do browser cookies last, do cookies expire when you close the browser, session restore cookies
```
**TikTok**
```text
session cookies are meant to be deleted when you close the browser, but if your browser restores your tabs, the session cookie can come back with them 👀
#cookies #webdev #javascript #learntocode #techtok
```
**Instagram Reels**
```text
How long a cookie lives depends on whether the server gives it an expiry.

If it doesn't, it's a session cookie, and it's meant to be deleted when you close the browser. I say meant to, because a lot of browsers can restore your tabs when you reopen them, and the session cookie can come back with them (so closing the browser doesn't always mean it's gone). If the server sets Expires or Max-Age, it's a persistent cookie, and it stays until that time.

Full video on YouTube, link in bio
#cookies #webdevelopment #javascript #http #frontend
```
**LinkedIn**
```text
How long does a browser cookie last? The usual answer is that it's gone when you close the browser, and that's only partly true.

A cookie with no expiry is a session cookie, and it's meant to be deleted when you close the browser. I say meant to because many browsers restore your tabs when you reopen them, and MDN's own docs warn that session cookies are restored with them, as if the browser was never closed.

If the server sets Expires or Max-Age, it's a persistent cookie, and it stays until that time. And JavaScript on the page can also read and write cookies through document.cookie.

Did you know session cookies could survive a browser restart?

#webdevelopment #http #javascript #softwareengineering
```
**X**
```text
session cookies are meant to be deleted when you close the browser. I say meant to because if your browser restores your tabs, the session cookie comes back too (MDN even warns about it)
```

### SH4 · What's inside your login cookie? (session ID)
File `outputs/shorts/short04-what-is-a-session-id_9x16.mp4` (built; you export it from its editor) · about 16 s · label "What's inside your login cookie? (session ID)" · from 1:59.52 to 2:15.09 (raw)
Format: **J · Slide behind you (you in front of a big screen that says "Session ID")**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh04/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 38, 65, 32** · fonts Font 14 design-14 (Bagel Fat One), in that board item's own colours (combo-03) · cover (a slide from the short under the line): **"How do / login cookies / work?"** (Shift+Enter line breaks are kept).
Hook: "Now in my e-commerce store, the login lives in a cookie like this."
Format: **talking head + black phrase cards** (nor3mak7 #29): one red-serif-style card in this video's accent, "only a random ID", at 2:05.1. Top title **T2 plain white, no box, soft shadow**. Captions **C5 tiny serif at the chest**.

**YouTube Shorts**
```text
Title: What is a session ID? (how your login cookie works)

Description: When you log into an online shop, the login lives in a cookie, and the cookie itself only holds a random ID called the session ID. The server keeps the real details about you and uses that ID to look them up, like the number on a cloakroom ticket and your jacket.

#Shorts #cookies #webdevelopment #authentication #backend

Tags: what is a session id, session id, session cookie, login cookie, how login works, session based authentication, how cookies work, cookies explained, web development, backend basics, authentication basics, what is a session id in web development, session id cookie explained, session vs cookie, what are cookies and session
```
**TikTok**
```text
your login cookie only holds a random ID, the session ID 🎟️ the server keeps your real details and uses that ID to look you up, like a cloakroom number and your jacket
#webdev #cookies #backend #learntocode #techtok
```
**Instagram Reels**
```text
When you log into an online shop, the login lives in a cookie, and the cookie itself only holds a random ID (the session ID).

The server keeps the real details about you and uses that ID to look them up. It's like the cloakroom we have in my school, where the number on your ticket is how they find your jacket.

Full video on YouTube, link in bio
#webdevelopment #cookies #backend #authentication #learntocode
```
**LinkedIn**
```text
Your login cookie usually only holds a random ID, the session ID.

In my online shop example, the login lives in a cookie like that. The server keeps the real details about the user and uses that ID to look them up. I used the cloakroom again for this one, because it's the same idea, right? The number on your ticket doesn't tell anyone who you are, it's just how they find your jacket.

When you first learned this, did you expect the cookie to hold more?

#webdevelopment #backend #authentication #softwareengineering
```
**X**
```text
your login cookie usually only holds a random session ID. the server keeps your actual details and looks you up with that ID, like a cloakroom number and your jacket
```

### SH5 · What is localStorage? (why your cart survives)
File `outputs/shorts/short05-what-is-localstorage_9x16.mp4` (built; you export it from its editor) · about 59 s · label "What is localStorage? (why your cart survives)" · from 2:20.30 to 3:20.97 (raw), with "But there are two exceptions." (3:07.94-3:09.46) cut out unless she keeps the card (question 2)
Format: **I · Pop-up screenshots (cards pop up over you)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh05/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 66, 27, 8** · fonts Font 61 thumbs-06 (Montserrat), in that board item's own colours (thumbs-06) · cover (her real room (a still of her)): **"Why your cart / is still there / (localStorage)"** (Shift+Enter line breaks are kept).
Hook: "localStorage is the reason why maybe you add something to your cart and close the browser, and when you come back and reopen it, you still see the stuff in your cart."
Format: **background behind her** (green-screen style, jason_swet #19): her cut-out over the real DevTools Application > Local Storage panel showing a `cart` key; the running shop window for the cart line. Top title **T3 inverse box** (white box, black heavy sans). Captions **C1 caps + one coloured word** ("CART", "STRINGS", "5 MB", "ORIGIN").

**YouTube Shorts**
```text
Title: What is localStorage? (with a shopping cart example)

Description: localStorage is the reason your cart is still there when you close the browser and come back. It's a simple key and value store for one website that only stores strings (so a cart goes in with JSON.stringify), and it stays until your code removes it or the user clears their browser data.

#Shorts #localstorage #javascript #webdevelopment #frontend

Tags: what is localstorage, localstorage, localstorage in javascript, localstorage javascript, local storage explained, localstorage max size, localstorage json stringify, localstorage getitem, localstorage setitem, web storage api, browser storage, javascript tutorial, frontend development, localstorage vs sessionstorage
```
**TikTok**
```text
localStorage is why your cart is still there after you close the browser and come back 🛒 it stays until your code removes it or you clear your browser data
#javascript #localstorage #webdev #frontend #learntocode
```
**Instagram Reels**
```text
localStorage is the reason your cart is still there when you close the browser and come back.

It's a simple store of keys and values that lives in your browser for one website (and by website I mean the origin, so the protocol, the domain and the port together). It only stores strings, so for a shopping cart you turn it into a string with JSON.stringify, and you get it back with JSON.parse. Most browsers give you about 5 MB per origin, but it varies, so you don't want something too big in there.

It stays until your code removes it or the user clears their browser data, and it's never sent to the server by itself. If the server needs your cart, your code has to send it.

Full video on YouTube, link in bio
#javascript #localstorage #webdevelopment #frontend #learntocode
```
**LinkedIn**
```text
localStorage is the reason a shopping cart can still be there after you close the browser and come back, and I used exactly that example in my video (I think we've all seen it happen).

It's a key and value store that lives in the browser for one origin, which is the protocol, the domain and the port together. It only stores strings, so a cart goes in with JSON.stringify and comes back out with JSON.parse. Most browsers give about 5 MB per origin, though it varies, so it's not the place for anything too big.

Closing the tab or even the whole browser doesn't clear it, although a private or incognito window usually does when you close it. It stays until your code removes it or the user clears their browser data. And it's never sent to the server by itself, so if the server needs the cart, your code has to send it.

What do you keep in localStorage in your projects?

#javascript #webdevelopment #frontend #softwareengineering
```
**X**
```text
localStorage is why your cart is still there after you close the browser. it only stores strings (hello JSON.stringify) and it never goes to the server unless your code sends it
```

### SH6 · What is sessionStorage? (why your form disappeared)
File `outputs/shorts/short06-what-is-sessionstorage_9x16.mp4` (built; you export it from its editor) · about 39 s · label "What is sessionStorage? (why your form disappeared)" · from 3:21.00 to 4:00.11 (raw)
Format: **M · TikTok title box (white box with the title)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh06/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 69, 17, 34** · fonts Font 27 design-27 (General Sans), in that board item's own colours (design-27) · cover (big line alone): **"What is / sessionStorage?"** (Shift+Enter line breaks are kept).
Hook: "The third place is the sessionStorage. It's the reason why a half-filled checkout form can disappear when you close the tab."
Format: **screen demo** (nandini_mpe #04, mariahtyesha #13 insets): rounded inset windows of two real tabs while she talks (refresh keeps the form, close empties it, a second tab starts empty). Top title **T4 yellow box, types on**, then leaves. Captions **C12 pop-up keywords** ("REFRESH: STILL THERE", "CLOSE: GONE") with small captions under.

**YouTube Shorts**
```text
Title: What is sessionStorage? (why your form disappeared)

Description: sessionStorage is the reason a half-filled checkout form can disappear when you close the tab. It has the same methods as localStorage, but it belongs to one tab, so a refresh keeps it and closing the tab clears it. If you open the same site yourself in a second tab, that tab gets its own separate sessionStorage.

#Shorts #sessionstorage #javascript #webdevelopment #frontend

Tags: what is sessionstorage, sessionstorage, session storage, session storage in javascript, is sessionstorage shared between tabs, session storage is tab specific, session storage vs local storage, localstorage vs sessionstorage, web storage api, browser storage, javascript tutorial, frontend development, what is session storage in js
```
**TikTok**
```text
sessionStorage is why your half-filled checkout form disappears when you close the tab 😭 a refresh keeps it, but closing the tab clears it
#javascript #sessionstorage #webdev #frontend #learntocode
```
**Instagram Reels**
```text
sessionStorage is the reason a half-filled checkout form can disappear when you close the tab.

It has the same methods as localStorage (setItem, getItem and removeItem), and the difference is that sessionStorage belongs to one tab. If you refresh the page, it's still there, but if you close the tab, it's gone. And if you open the same website yourself in a second tab, that second tab gets its own separate sessionStorage.

So it's good for things that only matter in this tab right now, like a half-filled form, and you obviously don't want to keep very important things in it.

Full video on YouTube, link in bio
#javascript #sessionstorage #webdevelopment #frontend #learntocode
```
**LinkedIn**
```text
sessionStorage is the reason a half-filled checkout form can disappear when you close the tab (and that's a very annoying thing to happen to a user, right?).

It uses the same methods as localStorage, setItem, getItem and removeItem, and the big difference is that it belongs to one tab. If you refresh the page, it's still there, but if you close the tab, it's gone. And if you open the same site yourself in a second tab, that tab gets its own separate sessionStorage.

So sessionStorage is good for things that only matter in this tab right now, like a half-filled form. You obviously don't want to keep very important things in it.

Have you ever lost a form to a closed tab? 😅

#javascript #webdevelopment #frontend #ux
```
**X**
```text
sessionStorage belongs to one tab, so a refresh keeps it and closing the tab clears it. that's why your half-filled checkout form was gone when you came back
```

### SH7 · Who can read your localStorage and cookies?
File `outputs/shorts/short07-who-can-read-localstorage_9x16.mp4` (built; you export it from its editor) · about 40 s · label "Who can read your localStorage and cookies?" · from 4:00.14 to 4:40.17 (raw)
Format: **H · Full frame + bold captions (2-3 words at a time)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh07/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 11, 68, 13** · fonts Font 50 shorts-16 (Oswald), in that board item's own colours (shorts-16) · cover (her real room (a still of her)): **"Is localStorage / safe?"** (Shift+Enter line breaks are kept).
Hook: "Now, who can read cookies, localStorage, sessionStorage?"
Format: **talking head + receipts** (nandini_mpe #08, #21): the OWASP HTML5 Security Cheat Sheet line "Do not store session identifiers in local storage as the data is always accessible by JavaScript" as a card in the top third at "any JavaScript running on your page" (4:21), then DevTools showing an HttpOnly cookie hidden from document.cookie (4:35). Top title **T9 screenshot as heading** is already used in SH3, so here **T7 mixed-font stack** ("Who can read" bold sans + "your localStorage" italic serif + "and cookies?" small). Captions **C2 caps + one word in a coloured box** at the top band.

**YouTube Shorts**
```text
Title: Who can read your localStorage and cookies?

Description: Cookies go to the server with every request that matches their domain and path, while localStorage and sessionStorage never leave the browser by themselves. But inside the browser, any JavaScript running on your page can read localStorage and sessionStorage, and that includes every third-party script you added, like an analytics script or a chat widget.

#Shorts #websecurity #javascript #localstorage #cookies

Tags: localstorage security, is localstorage safe, localstorage vs cookies, httponly cookie, httponly cookie vs localstorage, document.cookie, third party scripts, xss localstorage, cookies vs local storage security, web security, browser storage, javascript security, is localstorage secure for tokens, who can read localstorage
```
**TikTok**
```text
any JavaScript running on your page can read your localStorage 👀 and that includes the third-party scripts you added, like analytics or a chat widget
#websecurity #javascript #webdev #cybersecurity #learntocode
```
**Instagram Reels**
```text
Another big difference between cookies, localStorage and sessionStorage is who gets to read them.

Cookies go to the server, because the browser attaches them to every request that matches their domain and path. localStorage and sessionStorage never leave the browser by themselves, and the server only sees them if your code sends them.

But inside the browser, any JavaScript running on your page can read localStorage and sessionStorage. That includes your own code, and it also includes every third-party script you've added (maybe an analytics script or a chat widget). Cookies can be read through document.cookie too, unless the server marks them HttpOnly.

Full video on YouTube, link in bio
#websecurity #javascript #localstorage #webdevelopment #cybersecurity
```
**LinkedIn**
```text
Any JavaScript running on your page can read your localStorage and sessionStorage, and that includes the scripts you didn't write yourself.

Your own code can read them, of course, but so can every third-party script you've added, like maybe an analytics script or a chat widget. Cookies are a bit different, because the browser sends them to the server with every request that matches their domain and path. JavaScript can read them through document.cookie as well, unless the server marks them HttpOnly.

OWASP's HTML5 Security Cheat Sheet says it plainly, "Do not store session identifiers in local storage as the data is always accessible by JavaScript."

How many third-party scripts are running on the app you work on?

#websecurity #javascript #webdevelopment #softwareengineering
```
**X**
```text
any js running on your page can read your localStorage, and that includes every third-party script you added (the analytics one, the chat widget). cookies too, unless they're HttpOnly
```

### SH8 · Cookies vs localStorage vs sessionStorage in 25 seconds
File `outputs/shorts/short08-cookies-vs-localstorage-vs-sessionstorage_9x16.mp4` (built; you export it from its editor) · about 26 s · label "Cookies vs localStorage vs sessionStorage in 25 seconds" · from 4:40.20 to 5:06.05 (raw)
Format: **F · Square + karaoke (said words light up)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh08/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 1, 45, 29** · fonts Font 17 design-17 (Libre Baskerville), in that board item's own colours (design-17) · cover (big line alone): **"Cookies vs / localStorage vs / sessionStorage"** (Shift+Enter line breaks are kept).
Hook: "So based on the comparison, cookies are small, and they go to the server with every matching request."
Format: **flat colour slides + bold text** (aishahwasim #16) with a **countdown timer** in the corner ("00:25" down to "00:00", DM Mono): one flat card per storage (lime cookie, blue local, orange session), her 16:9 frame in a band. Top title **T7 mixed-font** would repeat SH7, so here **T6 full-frame title flash**: "COOKIES / vs localStorage / vs sessionStorage" over her for 1.2 s, then gone; the label box returns after. Captions **C7 huge word-at-a-time for the first line**, then small.

**YouTube Shorts**
```text
Title: Cookies vs localStorage vs sessionStorage in 25 seconds

Description: Cookies are small, they go to the server with every matching request, and JavaScript can read them unless they're HttpOnly. localStorage and sessionStorage hold more and stay in the browser, but every script on the page can read them, and localStorage stays until it's cleared while sessionStorage lives with the tab.

#Shorts #localstorage #javascript #webdevelopment #cookies

Tags: cookies vs localstorage vs sessionstorage, localstorage vs sessionstorage vs cookies, local storage vs session storage vs cookies, localstorage vs sessionstorage, cookies vs local storage, local storage vs session storage, session storage vs local storage, browser storage, web storage, javascript interview questions, frontend interview, web development, localstorage sessionstorage cookies difference
```
**TikTok**
```text
cookies vs localStorage vs sessionStorage in 25 seconds ⏱️ cookies go to the server, the other two stay in the browser, and sessionStorage is gone when you close the tab
#javascript #webdev #frontend #localstorage #learntocode
```
**Instagram Reels**
```text
This is cookies vs localStorage vs sessionStorage in one go (save it for your next interview 😅).

Cookies are small, and they go to the server with every matching request. JavaScript can read them unless they are set as HttpOnly.

localStorage and sessionStorage, on the other hand, hold more than a cookie, but they stay in the browser, they don't get sent to the server, and every script on the page can read them. localStorage stays until it's cleared, and sessionStorage lives with a tab, so if you close the tab, it's gone.

Full video on YouTube, link in bio
#javascript #localstorage #webdevelopment #frontend #learntocode
```
**LinkedIn**
```text
This is the short version of cookies vs localStorage vs sessionStorage, the way I summed it up at the end of my video.

Cookies are small and go to the server with every matching request, and JavaScript can read them unless they are HttpOnly. localStorage and sessionStorage hold more than a cookie, but they stay in the browser and aren't sent to the server by themselves, and every script on the page can read them. localStorage stays until it's cleared, while sessionStorage lives with the tab.

Which one did you mix up when you started?

#javascript #webdevelopment #frontend #softwareengineering
```
**X**
```text
cookies go to the server with every matching request. localStorage and sessionStorage stay in the browser, and sessionStorage is the one that's gone when you close the tab
```

### SH9 · Where online shops keep your login, cart and form
File `outputs/shorts/short09-online-shop-login-cart-form_9x16.mp4` (built; you export it from its editor) · about 13 s · label "Where online shops keep your login, cart and form" · from 5:06.08 to 5:19.50 (raw)
Format: **K · Film subtitles (sentence boxes, a small mono tag)**. Editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/sh09/ . Cover: see the Look line.
Look (2026-11-13, font-board pass): board **Formats 52, 67, 42** · fonts Font 74 thumbs-19 (Inter Tight), in that board item's own colours (thumbs-19) · cover (a slide from the short under the line): **"Where websites keep / your login, cart / and form"** (Shift+Enter line breaks are kept).
Hook: "So in our online shop, the login is most likely an HttpOnly cookie..."
Format: **letterbox** (diimejii #06): her 16:9 frame in the middle band of a black 9:16 page, the label above, three small icons fill in (lock, cart, form) as she names them. Top title **T8 letterbox title**. Captions **C8 karaoke on black** under the video. A 13 s single thought, like hoodsocialist #14/#15.

**YouTube Shorts**
```text
Title: Where an online shop keeps your login, cart and form

Description: This is how I summed up the whole video with an online shop. The login is most likely an HttpOnly cookie, the guest's cart is probably in localStorage, and the half-filled checkout form is probably in sessionStorage.

#Shorts #webdevelopment #javascript #localstorage #cookies

Tags: where to store login, httponly cookie, localstorage cart, sessionstorage form, cookies vs localstorage vs sessionstorage, browser storage, e-commerce web development, shopping cart localstorage, web storage, frontend development, web development, where does a website store my cart, localstorage vs sessionstorage vs cookies, session storage vs local storage, cookies explained
```
**TikTok**
```text
so in an online shop, the login is most likely an HttpOnly cookie, the cart is probably in localStorage, and your half-filled checkout form is probably in sessionStorage 🛒
#webdev #javascript #frontend #ecommerce #learntocode
```
**Instagram Reels**
```text
Your login, your cart and your half-filled checkout form are probably kept in three different places on an online shop.

The login is most likely an HttpOnly cookie, and the guest's cart is probably in localStorage, while the half-filled checkout form is probably in sessionStorage (which is why it's the one that disappears when you close the tab).

Full video on YouTube, link in bio
#webdevelopment #javascript #localstorage #frontend #ecommerce
```
**LinkedIn**
```text
In our online shop example, the login is most likely an HttpOnly cookie, and the guest's cart is probably in localStorage, while the half-filled checkout form is probably in sessionStorage.

That's how I wrapped up my video on cookies, localStorage and sessionStorage, because once you know how long each one lasts and who can read it, you can see that each one fits a different job.

Is that how your team does it, or do you keep the cart on the server?

#webdevelopment #javascript #frontend #softwareengineering
```
**X**
```text
in an online shop, the login is most likely an HttpOnly cookie, the guest's cart is probably in localStorage, and the half-filled checkout form is probably in sessionStorage
```

### Independent shorts to record (new scripts)
These are your kit's segments 7-9, which you didn't record, rewritten as shorts that stand alone. Each first line says the topic. Record them in the same sitting as part 2 (question 1), or alone.

**IS1 · HttpOnly, Secure and SameSite cookies explained** (about 50 s)
- Format: TV / slide beside you (nandini_mpe #32), graphics in kodekloud style: you on camera on the right third, the cookie line `Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax` on a black panel (or a real TV) on the left two thirds, each flag lighting up in one accent colour as you name it. Top title T10 handwritten, one section title per flag. Captions C1 under you, never over the panel.
- Recording: standing beside the TV (or a plain wall, if the panel is added in the edit) in the bigger room, camera on a tripod at chest height, framed wide enough to leave the left two thirds free. Turn slightly towards the panel and point at it on each flag name. Read the script exactly as written; two takes.
- Script (read it word for word; built from your read-through words):
> HttpOnly, Secure and SameSite are the three cookie settings that matter most for security. People call them flags. HttpOnly means JavaScript cannot read the cookie at all. The browser still sends it with requests, your code just can't see what's inside. Secure means the cookie is only sent over HTTPS, so it never goes out over plain HTTP, where someone on the same wifi could read it. And SameSite decides whether the cookie is sent when the request starts on a different website. Strict means it's only sent when the request comes from your own site. Lax is the middle one. The cookie is sent when you click a normal link from another site into yours, but not when another site submits a form to yours. None means send it everywhere, and you'd only use that for things like an embedded widget.
- On screen: `Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax`. Fact check: MDN Set-Cookie (HttpOnly still sent with fetch; SameSite=None needs Secure, keep that for replies).

**IS2 · Should you store your login token in localStorage?** (about 55 s)
- Format: talking head + receipts (nandini_mpe #08): OWASP HTML5 Security Cheat Sheet card in the top third. Sitting at your desk with a laptop open, closer framing, a glass of water on the desk. Hook type "direct instruction" (#36).
- Script (read it word for word):
> If you're storing your login token in localStorage, think about who else can read it. A lot of apps get a token from the server, often a JWT, save it in localStorage, and add it to every request. The problem is XSS, cross-site scripting. That's when an attacker manages to run their own JavaScript on your page, maybe through an npm package that got compromised, or a review box that shows what people type without escaping it. Their script can read localStorage, take your token, and use it from anywhere until it expires. In the words of OWASP's security cheat sheet, you shouldn't store session identifiers in local storage, because the data is always accessible by JavaScript. An HttpOnly cookie can't be read by JavaScript. But HttpOnly doesn't make XSS harmless, because the attacker's script can still send requests from your page with the cookie attached. So you still need to stop XSS.
- Fact check: OWASP HTML5 Security Cheat Sheet quote verified 2026-11-02 (7f).

**IS3 · Laravel already sets up your session cookie** (about 30 s)
- Format: screen demo (#04): `config/session.php` on screen, you in a corner circle. Sitting, laptop on the desk, mic out of frame. Hook "If you're X" (#17).
- Script (read it word for word):
> If you're using Laravel, a lot of the cookie setup is already done for you. Laravel keeps your login in a session cookie, and in recent versions that cookie is named after your app. So if your app is called Shop Online, the cookie is shop-online-session. The cookie only holds the session ID, and the session data stays on the server. By default it's HttpOnly and SameSite Lax, and Laravel encrypts and signs every cookie it creates, so the user can't read or change what's inside.
- Fact check: Laravel 12/13 skeleton `config/session.php` (`Str::slug(APP_NAME).'-session'`, http_only true, same_site lax); Laravel 11 used `shop_online_session`. Check your Laravel version before recording.

## 4. Teaser (LinkedIn and X)
**v3.1, changed 2026-11-19 (your note):** it still opens on "HTTP is stateless" and keeps that idea whole (every request stands on its own, the server doesn't remember the one before, "So how does the server know that it's you?"); then your own opening line "Cookies, localStorage and sessionStorage." comes in as a full orange title card naming the three (each name lands as you say it); then "After you log in, the server gives your browser a cookie…" and everything after it as before. The frame-1 topic plate is gone (the names now come where you asked). The small "PLACE 01/02/03" labels on the title cards are gone too. You export it from its editor: http://localhost:7700/moment/cookies-localstorage-sessionstorage/teaser/ (16:9, 1:1, 4:5). 1:50.6 of your lines + 4 title cards, then the drawn "Full video on YouTube" ending (6.5 s) = about 1:57. Plan in plain text: `talking-head/teaser/PLAN-v3.md`; v3 is in `archive/text-cleanup-2026-11-19/teaser/`, v2 in `archive/teaser-v2/`. Checked: whisper on the new sound reads in this order with clean joins; text collision 0 (16:9 and 9:16); captions off your chin in 1:1 and 4:5 (0 hits).

| # | Part | Raw in-out | Plays at | Her line |
|---|---|---|---|---|
| 1 | hook (one stretch, kept whole) | 0:09.45-0:29.60 | 0:00 | "The web runs on HTTP, and HTTP is stateless. That means that every request your browser sends stands on its own. The server doesn't remember the request that came before it. So if you log into your shopping website, that's one request. If you click on My Orders, that's a brand new request on its own. So how does the server know that it's you?" |
| 2 | title card: COOKIES / LOCAL STORAGE / SESSION STORAGE (your voice) | 0:00.03-0:02.90 | 0:20 | "Cookies, localStorage and sessionStorage." |
| 3 | the idea | 0:48.93-1:02.35 | 0:23 | "After you log in, the server gives your browser a cookie with a session ID in it. … So the first place that a website can keep something in your browser is in a cookie." |
| card | | | 0:36 | COOKIES |
| 4 | cookies | 1:07.40-1:13.70 | 0:37 | "A cookie is a small piece of text, usually a name and a value that the server asks your browser to hold on to." |
| card | | | 0:43 | LOCAL STORAGE |
| 5 | localStorage | 2:15.00-2:27.62 | 0:44 | "The second place … is localStorage. localStorage is the reason why … you still see the stuff in your cart." |
| 6 | localStorage | 3:03.50-3:07.88 | 0:57 | "Closing the tab or even closing the whole browser doesn't clear your localStorage." |
| card | | | 1:01 | SESSION STORAGE |
| 7 | sessionStorage | 3:21.00-3:27.60 | 1:02 | "The third place is the sessionStorage. It's the reason why a half-filled checkout form can disappear when you close the tab." |
| 8 | sessionStorage | 3:37.55-3:42.00 | 1:09 | "If you refresh the page, it's still there. But if you close the tab, it's gone." |
| card | | | 1:13 | WHO CAN READ IT? |
| 9 | who reads it | 4:00.05-4:03.30 | 1:14 | "Now, who can read cookies, localStorage, sessionStorage?" |
| 10 | who reads it (music stops on "any JavaScript") | 4:13.88-4:32.64 | 1:17 | "localStorage and sessionStorage never leave the browser by itself. … any JavaScript running on your page can read your localStorage and sessionStorage. That includes … every third-party script that you've added, like maybe an analytic script or a chat widget." |
| 11 | takeaway | 5:06.00-5:20.60 | 1:36 | "So in our online shop, the login is most likely an HttpOnly cookie, and the guest's cart is probably in localStorage, while the half-filled checkout form is probably in sessionStorage." |
| end | | | 1:51 | the drawn "Full video on YouTube" card (thumbnail 01 + the title) |

**LinkedIn post (with the teaser)**
```text
Your login, your cart and a half-filled checkout form are kept in three different places in your browser, and those three places are cookies, localStorage and sessionStorage.

It all starts with HTTP being stateless, so the server doesn't remember you between requests and something in the browser has to remind it (that's the cookie). localStorage is the reason your cart is still there after you close the browser, and sessionStorage is the reason a half-filled checkout form disappears when you close the tab.

The bit I really wanted people to get is who can read each one, because any JavaScript running on your page can read localStorage and sessionStorage, and that includes every third-party script you've added.

Where do you keep your users' carts?

Full Video on YouTube - [LINK]

#webdevelopment #javascript #softwareengineering #websecurity #frontend
```
**X post (with the teaser)**
```text
made a video on cookies, localStorage and sessionStorage, the three places a website keeps things in your browser (and who can actually read them). full video on youtube - [LINK]
```

## 5. Carousels

### 5a. Instagram (1080 × 1350, 10 slides) (built)
Files `outputs/carousels/instagram/slide01.png` … `slide10.png`. Every slide is what you said in the recording.
1. **cookies vs localStorage vs sessionStorage**, the 3 places a website keeps things in your browser
2. HTTP is stateless. The server doesn't remember the request before this one.
3. A cookie works like a cloakroom ticket. Your browser shows it on every request.
4. Cookies are small, about 4 KB each, and they go to the server with every request.
5. Your login cookie usually holds only a random session ID. The server keeps the rest.
6. localStorage is why your cart is still there after you close the browser.
7. localStorage only stores strings, about 5 MB per origin, and stays until it's cleared.
8. sessionStorage belongs to one tab. Refresh: still there. Close the tab: gone.
9. Any JavaScript on your page can read localStorage and sessionStorage, third-party scripts too.
10. In an online shop: login = HttpOnly cookie, cart = localStorage, checkout form = sessionStorage. @WithGbemi

Slide 1 options: "cookies vs localStorage vs sessionStorage" · "where your browser keeps your login, cart and form" · "close the tab: what stays?"

**Caption**
```text
Cookies, localStorage and sessionStorage are the three places a website can keep things in your browser, and they don't behave the same.

Your cart surviving a closed browser is usually localStorage. Your half-filled checkout form disappearing with the tab is usually sessionStorage. And your login is most likely an HttpOnly cookie. Save this one for the next time you have to pick 😅

Full video on YouTube, link in bio
#javascript #webdevelopment #localstorage #frontend #learntocode
```

### 5b. LinkedIn (PDF, 1080 × 1350, 10 slides) (built)
File `outputs/carousels/linkedin/cookies-localstorage-sessionstorage.pdf`. Document title: **Cookies vs localStorage vs sessionStorage, explained with an online shop**. Same 10 slides as 5a; slide 1 option for LinkedIn: "Where does a website keep your login, your cart and your half-filled form?"

**Post**
```text
Where does a website keep your login, your cart and your half-filled checkout form?

In three different places in your browser. HTTP is stateless, so a cookie with a session ID reminds the server who you are on every request. localStorage keeps things like a guest's cart until it's cleared, even after you close the browser. sessionStorage belongs to one tab and is gone when the tab closes.

The difference I'd pay the most attention to is who can read them. Any JavaScript on your page can read localStorage and sessionStorage, including third-party scripts. Cookies can be read too, unless the server marks them HttpOnly.

What do you keep in localStorage today?

Full Video on YouTube - [LINK]

#webdevelopment #javascript #softwareengineering #websecurity
```

## 6. Long-form posts

### 6a. LinkedIn post (main video, upload day)
```text
Cookies, localStorage and sessionStorage are the three places a website can keep things in your browser, and I made a video explaining all three with an online shop.

Before any of them can make sense, you need to know why a browser has to remember anything at all. HTTP is stateless, so every request your browser sends stands on its own. If you log into a shopping website, that's one request, and if you click on My Orders, that's a brand new request on its own, so something has to tell the server it's still you.

That's what the cookie is for. I compared it to the cloakroom we have in my school, where you hand over your coat and they give you a ticket. They don't remember your face (I mean, there's a lot of people), they just use the ticket to find your coat when you come back. In the same way, after you log in, the server gives your browser a cookie with a session ID in it, and your browser shows it on every request after that.

localStorage is the reason your cart is still there when you close the browser and come back, and it never goes to the server by itself. sessionStorage belongs to one tab, which is why a half-filled checkout form can disappear when you close that tab.

The other big difference between all three of them is who gets to read them. Any JavaScript running on your page can read localStorage and sessionStorage, and that includes every third-party script you've added, like an analytics script or a chat widget (cookies can be read through document.cookie too, unless the server marks them HttpOnly).

So in our online shop, the login is most likely an HttpOnly cookie, the guest's cart is probably in localStorage, and the half-filled checkout form is probably in sessionStorage.

What do you keep in localStorage in your own projects?

Full Video on YouTube - [LINK]

#webdevelopment #javascript #softwareengineering #websecurity #frontend
```

### 6b. X thread
```text
1/ made a video on cookies, localStorage and sessionStorage, the three places a website can keep things in your browser, and I explained all of them with an online shop 🧵

2/ it starts with http being stateless. every request your browser sends stands on its own, so logging in is one request and clicking on my orders is a brand new one, and the server doesn't remember the first one

3/ a cookie kind of works like a cloakroom ticket (we have one in my school). after you log in, the server gives your browser a cookie with a session ID in it, and your browser shows it on every request after that

4/ localStorage is the reason your cart is still there after you close the browser and come back. it only stores strings, so the cart goes in with JSON.stringify, and it never goes to the server unless your code sends it

5/ sessionStorage belongs to one tab, so a refresh keeps it and closing the tab clears it. that's usually where a half-filled checkout form lives, which is why it's gone when you come back

6/ and any javascript running on your page can read localStorage and sessionStorage, including the third-party scripts you added. cookies too, unless the server marks them HttpOnly

7/ so in an online shop, the login is most likely an HttpOnly cookie, the cart is probably in localStorage, and the checkout form is probably in sessionStorage. full video on youtube - [LINK]
```

### 6c. YouTube community post (upload day)
```text
I made a new video on cookies, localStorage and sessionStorage, the three places a website keeps things in your browser 🍪

Quick question before you watch it. You add something to your cart, fill half of the checkout form, then close the tab by mistake. When you come back, which one is still there? Tell me in the comments (and the video explains why).

[LINK]
```

### 6d. More X posts (from your kit, fixed to the recording)
Post these over the week. The ones about flags, tokens and Laravel are held for part 2 (they are not in this video).
```text
I put cookies vs localStorage vs sessionStorage on one card, so you don't have to keep the whole thing in your head
```
(Image card, one clean slide: Cookie, about 4 KB each, sent to the server with every matching request, JS can read it unless HttpOnly, lives until it expires (session cookie: meant to go when the browser closes). localStorage, about 5 MB per origin (varies), never sent by itself, any JS on the page can read it, stays until cleared. sessionStorage, about 5 MB per origin (varies), never sent by itself, any JS on the page can read it, gone when the tab closes. Online shop: login = HttpOnly cookie, cart = localStorage, checkout form = sessionStorage. Reply: "I went through all of it from the beginning here: [LINK]")
```text
browser storage things that catch people out. localStorage only stores strings, so you JSON.stringify your objects. sessionStorage survives a refresh but not closing the tab, and a new tab you open yourself gets its own. and every script on your page can read your localStorage
```
```text
you put a half-filled checkout form in sessionStorage. which of these clears it?

A. refreshing the page
B. closing the tab
C. opening the site yourself in a new tab
```
(Your reply a few hours later: "it's B. a refresh keeps it, and a new tab you open yourself just gets its own empty sessionStorage. the first tab still has the form")
```text
you close a tab by mistake and the checkout form is gone, but the cart is still there 😭 that's usually because the form was in sessionStorage and the cart was in localStorage
```
```text
session cookies are meant to be deleted when you close the browser. I say meant to because a lot of browsers restore your tabs, and the session cookie comes back with them
```
**Held for part 2** (true, but not in this video): the 400-day Chrome cookie limit quiz, "http and https get separate localStorage", the SameSite=Strict tweet, the compromised npm package and HttpOnly/XSS tweets, "where have you been storing your login tokens?".

### 6e. Your comments and ready replies
**YouTube (pin):** see 1e.
**Instagram:** "a session cookie is only meant to be deleted when you close the browser, because if your browser restores your tabs, it can come back with them 😅"
**TikTok:** "refresh keeps it, closing the tab deletes it. that's sessionStorage in one line 😭"
**LinkedIn:** "If there's one thing from this video I'd want people to remember, it's that any script on the page can read localStorage, including the scripts you didn't write yourself."
**X (reply to your own tweet):** "if you're on Laravel, the session cookie is already HttpOnly and SameSite Lax by default (I'll go through that properly in part 2)" (post this one only once part 2 is recorded)

**Replies to expect (ready to paste)**
- "So where should I store my JWT?" → "that's exactly what part 2 is about 😅 the short version is that OWASP says not to keep session identifiers in localStorage because any JavaScript can read it, and an HttpOnly cookie can't be read by JavaScript"
- "Isn't sessionStorage safer than localStorage?" → "it's cleared sooner, which helps a bit, but any script on the page can read sessionStorage too, so for that risk it's really the same"
- "What about IndexedDB?" → "IndexedDB is more for bigger, structured data, like offline apps. any script on the page can read it too, so the same thinking applies"
- "The 5 MB isn't the same in every browser." → "yes, that's why I said it varies 🙂 MDN puts it at up to 5 MiB of local storage per origin in most browsers"
- "Session cookies are deleted when you close the browser." → "they're meant to be, that's why I said meant to. if your browser restores your tabs, MDN says session cookies are restored too, as if the browser was never closed"
- "What about mobile apps?" → "mobile apps are a different setup, they usually keep things in the phone's secure storage. this one was just about the browser"

### 6f. Essay for Substack / Medium (your kit's essay, fixed to the recording)
**Title:** Cookies, localStorage and sessionStorage, and Where Your Browser Keeps Things
**Subtitle:** Why a website can remember you at all, what each of the three is for, and who can read them.
**SEO title:** Cookies vs localStorage vs sessionStorage, Explained with an Online Shop
**SEO description:** How cookies, localStorage and sessionStorage differ in size, how long they last and who can read them, explained with an online shop's login, cart and checkout form.

If you have ever closed a tab by mistake halfway through a checkout form on an online shop, you have probably seen all three of these at work. The form was gone when you came back, but your cart was still there, and you were still logged in. Those three things were kept in three different places in your browser.

It starts with HTTP being stateless. Every request your browser sends stands on its own, and the server does not remember the request before it. If you log into your shopping website, that is one request. If you click on My Orders, that is a brand new request on its own. RFC 6265, the standard that defines cookies, describes them as a way of "letting the servers maintain a stateful session over the mostly stateless HTTP protocol." I think of a cookie as a cloakroom ticket. We have something similar in my school, where you hand over your jacket or your coat and they give you a ticket. They don't remember your face, because there are a lot of people, but when you come back, they use the ticket to find your coat. In the same way, after you log in, the server gives your browser a cookie with a session ID in it, and your browser shows that cookie on every request after that.

A cookie is a small piece of text, usually a name and a value, that the server asks your browser to hold on to. The server sets it with a header on the response called Set-Cookie, and after that the browser sends it back automatically in a Cookie header with every request to that site. Each cookie holds about four kilobytes, and it is good to keep them small because they travel with every request. A cookie with no expiry is a session cookie, meant to be deleted when you close the browser. I say "meant to" because a lot of browsers restore your tabs when you reopen them, and MDN warns that session cookies come back with them. A cookie with Expires or Max-Age is a persistent cookie, and it stays until that time. In an online shop, the login lives in a cookie like this, and the cookie itself only holds a random ID. The server keeps the real details about you and uses that ID to look them up, like the cloakroom number and your coat.

localStorage is the reason you can add something to your cart, close the browser, and still see it when you come back. It is a simple key and value store for one website, and by website I mean the origin, which is the protocol, the domain name and the port together. It only stores strings, so a cart goes in with JSON.stringify and comes out with JSON.parse. Most browsers give it about five megabytes per origin, but it varies. It stays until your code removes it or the user clears their browser data, and closing the tab or even the whole browser doesn't clear it, although a private or incognito window usually clears it when you close the window. localStorage is also never sent to the server. If the server needs the cart, your code has to send it.

sessionStorage has the same methods, setItem, getItem and removeItem, but it belongs to one tab. If you refresh the page it is still there, and if you close the tab it is gone. If you open the same shop yourself in a second tab, that tab gets its own separate sessionStorage. So it is good for things that only matter in this tab right now, like a half-filled checkout form, and you obviously don't want to keep very important things in it.

Who can read each one is the other big difference. Cookies go to the server, because the browser attaches them to every request that matches the cookie's domain and path. localStorage and sessionStorage never leave the browser by themselves, and the server only sees them if your code sends them. Inside the browser, though, any JavaScript running on your page can read localStorage and sessionStorage, and that includes your own code and every third-party script you have added, like an analytics script or a chat widget. Cookies can be read through document.cookie too, unless the server marks them HttpOnly.

So in our online shop, the login is most likely an HttpOnly cookie, the guest's cart is probably in localStorage, and the half-filled checkout form is probably in sessionStorage.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

**Medium tags:** Web Development, JavaScript, Web Security, Cookies, Programming

**Held for the part 2 essay (not in this video, keep for later):** your kit's paragraphs on the cookie flags (HttpOnly, Secure, SameSite Strict / Lax / None), the login token question (the OWASP quote, XSS through a compromised npm package or an unescaped review box, CSRF and CSRF tokens) and Laravel (shop-online-session, EncryptCookies), plus Chrome's 400-day cap and Safari's seven days. They are in `../archive/original-kit/14-cookies-localstorage-sessionstorage-kit.md`, section 10.

## 7. Research and sources

### 7a. What is happening with the topic now
- **No news hook this month.** Searches on 2026-11-02 found no October 2026 news about cookies or web storage. This is an evergreen search topic, so the package leans fully on search (7b) and the proof from your own older video (7c).
- **Third-party cookies**: Google decided in April 2025 to keep its current approach to third-party cookie choice in Chrome instead of a standalone prompt ([Privacy Sandbox blog](https://privacysandbox.google.com/blog/privacy-sandbox-next-steps)); I found no primary source changing that in 2026. Not part of this video (your kit already took third-party cookies out).
- **The wider conversation that touches your "every third-party script" line**: npm supply-chain attacks kept coming through 2026 (for example the TanStack packages compromise reported by [The Register, 12 May 2026](https://www.theregister.com/cyber-crime/2026/05/12/cache-poisoning-caper-turns-tanstack-npm-packages-toxic/5238650) and the Axios compromise noted by [Simon Willison, 31 March 2026](https://simonwillison.net/2026/Mar/31/supply-chain-attack-on-axios/)). Those stole developer credentials at install time, not browser localStorage, so they are context for part 2's XSS point, not a claim for this video.
- 2026 guides repeat the same trade-off (localStorage readable by any script; HttpOnly cookies out of script reach): [techinterview.org, Frontend Cookies, Storage, and Privacy in 2026](https://www.techinterview.org/post/3233475403/frontend-cookies-storage-privacy-2026/).

### 7b. What people search (keywords with evidence)
YouTube suggestions (`ds=yt`) and Google suggestions, pulled 2026-11-02 with alphabet expansions.
| Phrase | Evidence | Used in |
|---|---|---|
| **localstorage vs sessionstorage vs cookies** | 1st YouTube suggestion for "localstorage vs"; also for "localstorage s", "session storage"; Google: 3rd for "localstorage vs" | Title 1, SH8, tags |
| local storage vs session storage (vs cookies) | YouTube: top suggestions for "local storage vs session storage"; "... in javascript" too | Titles 3, 4, tags |
| cookies vs local storage | YouTube + Google; Google adds "for jwt", "for auth", "security" | Title 7, SH7 tags |
| session storage | YouTube: "session storage in js", "session storage vs local storage vs cookies"; Google: "is sessionstorage shared between tabs", "session storage is tab specific", "session storage size limit" | SH6 |
| localstorage in javascript | YouTube: 2nd for "localstorage"; "localstorage e" → "local storage explained" | SH5, title 3 |
| what are cookies | YouTube: "what are cookies used for", "what are cookies and session", "what are cookies in chrome"; Google: "what are cookies in browser" | Title 5, SH2 |
| http is stateless | YouTube: "http is stateless", "why http is stateless protocol" | Title 6, SH1 |
| session cookie | YouTube: "session cookies", "session cookie authentication", "session cookies vs jwt" | SH3, SH4 |
| httponly cookie (vs localstorage) | YouTube: "httponly cookie vs localstorage", "httponly cookie jwt"; Google: "httponly cookie vs localstorage", "httponly cookie meaning" | SH7 tags; part 2 |
| where to store jwt token | YouTube + Google: "where to store jwt token", "... in frontend", "... in react", "... in browser" | **Part 2 only** (not in this recording) |
TikTok and Instagram search terms: a `site:tiktok.com` search returned no TikTok pages for this topic, so I have no TikTok data; hashtags follow the YouTube phrases and the kit's pool.

### 7c. Outlier videos
Measured 2026-11-02 with yt-dlp. Ratio = views ÷ the median views of the channel's last 25 uploads on its Videos tab. "2026" = returned by YouTube's "This year" upload filter. Upload dates beyond that could not be read (YouTube's bot check blocked full metadata).
| Views | Channel | Ratio | When | Title | Link |
|---|---|---|---|---|---|
| 2,327 | **Gbemisola Oladetoun (yours)** | **22.8x** (median 102) | older | Local Storage vs Session Storage vs Cookies \| Examples \| UseCase \| Syntax | https://www.youtube.com/watch?v=3YNOsgIrUvI |
| 859,001 | Hayk Simonyan | 86.8x (9,900) | 2026 | 7 Authentication Concepts Every Developer Should Know | https://www.youtube.com/watch?v=iX8g4LqF8p8 |
| 802,198 | Simple Things - Surprising Histories | 25.9x (31,000) | 2026 | What Are Cookies and What Happens When You Click "Accept All"? | https://www.youtube.com/watch?v=FnFU97jaRkQ |
| 550,286 | Simple but Surprising | 788x (698) | 2026 | What Are Cookies and What Happens When You Click "Accept All?" | https://www.youtube.com/watch?v=32orHBBvn6U |
| 458 | Breaking Code | 15.8x (29) | 2026 | Cookies vs Sessions vs Local Storage: What Goes Where? | https://www.youtube.com/watch?v=PUMAu8VjNSA |
| 105 | Sysvora | 8.8x (12) | 2026 | localStorage vs HttpOnly Cookie: What Actually Protects Your JWT | https://www.youtube.com/watch?v=mXb4Vf4Eiso |
| 543 | TechExtensor | 5.8x (93) | 2026 | LocalStorage vs SessionStorage vs Cookies – Complete Browser Storage Guide | https://www.youtube.com/watch?v=2gEZeLrgjkA |
| 2,173 | Visualcoders | 4.2x (520) | 2026 | JWT vs Sessions: Why Developers Get This Wrong | https://www.youtube.com/watch?v=sCRzY2VzPD0 |
| 1,836 | Code Wrap | 3.6x (504) | 2026 | Authentication Explained (Simply): Basic Auth, Session, JWT, OAuth | https://www.youtube.com/watch?v=DDKbz9XiCQ4 |
| 2,939 | AgentStax | 2.7x (1,100) | 2026 | Cookies, Sessions & Tokens Explained In 15 Minutes | https://www.youtube.com/watch?v=zXdUBd1g3W0 |
| 3,707 | WsCube AI & Tech School | 2.5x (1,500) | 2026 | Local Storage, Session Storage & Cookies in JavaScript \| Explained Simply | https://www.youtube.com/watch?v=kCGIIpdt-RI |
| 7,312 | Nova Designs | 2.5x (2,900) | 2026 | Why Every Developer Needs to Understand Local Storage | https://www.youtube.com/watch?v=0LUK2ziL8xg |
| 18,358 | LearnThatStack | 2.1x (8,600) | 2026 | Why Your Token Storage Could Be Your Biggest Security Risk - XSS and CSRF Attack in Action | https://www.youtube.com/watch?v=vTroMvQy6K0 |
| 39,150 | Addie LaMarr | 2.1x (19,000) | 2026 | How Websites Identify You Without Cookies (It's Scarier Than You Think) | https://www.youtube.com/watch?v=50vdcySh-nI |
Evergreen leaders in the same search (all-time, no date): Web Dev Simplified "JavaScript Cookies vs Local Storage vs Session Storage" 849,042 · Fireship "Session vs Token Authentication in 100 Seconds" 1,461,943 · freeCodeCamp "cookies vs localStorage vs sessionStorage - Beau teaches JavaScript" 187,231 · Ben Awad "How to Store JWT for Authentication" 218,255 and "Why LocalStorage is Vulnerable to XSS (and cookies are too)" 104,480.

**What they have in common:** the winners in the developer niche say the exact comparison in the title ("X vs Y vs Z", sometimes "Explained", "What Goes Where?"), 40-65 characters, no hype. The non-developer winners ("What Are Cookies and What Happens When You Click Accept All?") start from the everyday cookie banner, which is why title 5 and the 1:03 banner receipt exist. Token storage and XSS is the second cluster (Ben Awad, LearnThatStack, Sysvora), which is where part 2 lives. The thumbnails could not be fetched in bulk this time; from the search pages, the common objects are a cookie, browser windows and three labelled boxes, which T1, T3 and T4 use (with your face added, which most of these lack).

**Her viral samples as the bar** (`inspiration/viral-samples/`): each names the topic or the result plainly and shows its literal object (1 money behind "FINANCIAL LITERACY", 2 the DONE clipboard, 3 the framework drawn, 4 the anger-loop diagram on a whiteboard, 5 her among books, 6 a real 503 error screen). Here that means the cookie itself, the cart and the form in a browser window, and the real DevTools Storage panel.

### 7d. What worked with strangers
**Title checks (by code, 2026-11-02):**
| # | Characters | 40-60 | Keyword (starts-ends) |
|---|---|---|---|
| 1 | 59 | yes | "localstorage vs sessionstorage vs cookies" 1-41 |
| 2 | 56 | yes | "cookies vs localstorage vs sessionstorage" 1-41 |
| 3 | 58 | yes | "local storage vs session storage vs cookies" 1-43 |
| 4 | 59 | yes | "session storage vs local storage" 1-32 |
| 5 | 51 | yes | "what are browser cookies" 1-24 |
| 6 | 45 | yes | "http is stateless" 28-44 |
| 7 | 48 | yes | "localstorage vs cookies" 1-23 |
| 8-11 | 53, 54, 50, 51 | yes | click-led |
The three-way phrase is 41-43 characters by itself, so in titles 1-3 it starts at character 1 and ends at 41-43. Title 6 is "why websites need cookies" first (a search phrase too) with "http is stateless" in brackets at 28-44.

**Cold review:** two fresh cold reviewers (general-purpose agents, no context, text only) on 2026-11-02.
- **Round 1** (the first draft): search titles 5-7 ("generic, hundreds of identical videos"), click-led 7-8; thumbnails T1 7/7, T2 8 alone but 6 with title 1, T4 "3 PLACES" 4/7, collage "browser storage" 3/5, T6 8/8, T7 5/6, T8 "ANY SCRIPT. ANY KEY." 5/7 ("key" read as a keyboard key), "LOGIN · CART · FORM" 4/5, T10 7/8, "YOUR COOKIE = A TICKET" 5/7, "4 KB vs 5 MB" 6/5; short labels SH7 8, the rest 5-7 (SH5/SH6 "a definition", SH1 "stateless jargon"); first lines 5-8. It also said the set doesn't pick one audience (developers vs everyone).
- **Rewrites:** title 1 got "(What Goes Where)" (the wording of the 15.8x Breaking Code outlier), title 4 got "Why Your Form Disappeared", "Not All" title replaced by "What Survives When You Close a Tab?"; T1 down to one window; T4, T7, T8, T3, T5 reworded or simplified; four thumbnails dropped; SH1, SH4, SH5, SH6, SH8, SH9 labels rewritten; three first lines rewritten.
- **Round 2** (rewrites only): title 1 **8**, 4 **8**, 9 **8**, 2 7, 6 7, 3 6, 11 (old) 7. Thumbnails T1 **8 / 9 with title 1**, T7 8/8, T10 8/8, T8 8/8, T6 8/8 (7 with title 1), T2 8 (pair with 7 or 10), T4 6/7, T3/T5 not above 7 (simplified after). Short labels SH5 **8**, SH6 **8**, SH8 **8**, SH4 7, SH9 7, SH1 6 (then changed to "Why websites need cookies to remember you", not re-scored). First lines 1 and 3 **8**, 4 7 (shortened after), 2 6 (rewritten after).
- **Its pick for Test & Compare:** title 1 with T1, T7 and T10 (all show kept vs wiped). That is the recommendation in 2a.
- **Kept under 8 on purpose:** titles 2, 3, 5 and 6 are exact-search variants ("cookies vs localstorage vs sessionstorage", "local storage vs session storage vs cookies", "what are cookies", "http is stateless"); a stranger browsing rates them lower, but they are for people who typed those words. SH4 and SH9 (7) are search-worded labels.

**Lessons and dropped ideas:**
- Dropped every token, JWT, flags and Laravel angle from this video's titles and captions (your kit's titles 3, 4, 5, 7, 9, 10, 12 and the "SAFE?" thumbnail): you didn't record that part. They return with part 2.
- Dropped your kit's backup thumbnail with no words (three plain boxes): RULE 0 needs the topic readable from the thumbnail alone.

### 7e. What changed from her kit (and accuracy notes)
- Titles, chapters, shorts, captions and the essay are rebuilt for what you recorded (segments 1-6 and a shorter summary). Your kit's 22 clips and 7 shorts became 9 shorts from the recording (four of yours, SameSite, login token, CSRF and Laravel, are not in it) plus 3 independent scripts for the missing segments.
- Cold open: built from your own recorded cart and form lines (1f).
- Cloakroom: your words "We have something similar in my school" replace the kit's Baltics line everywhere.
- Your kit's Instagram caption and carousel slides 8-9 (HttpOnly / Secure / SameSite) are replaced with things you said (session ID, private window, who can read them).
- Your LinkedIn caption had "Full walkthrough: [LINK]" and an essay-style list; it is rewritten in your post pattern (plain first line, you in it, a question, "Full Video on YouTube - [LINK]").
- Accuracy notes: "two exceptions" (question 2); 1:03 and 3:51 unclear words (questions 5, 6); "a ticket with a name on it" then "that number" (question 7); "So, as the server knows" is "So how does the server know" (corrections.json). Every number you said was checked (question 10).

### 7f. Sources (every link, date, number)
- Recording: `kit/raw-video.mov` 321.04 s; cleaned 319.64 s; cut list `kit/transcripts/CLEANUP.md` (2026-11-02).
- RFC 6265 (cookies; stateless HTTP; 4096 bytes per cookie, section 6.1): https://www.rfc-editor.org/rfc/rfc6265
- MDN Set-Cookie (session cookie restore warning; HttpOnly; SameSite=None needs Secure), read 2026-11-02: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- MDN Storage quotas ("up to 5 MiB of local storage, and 5 MiB of session storage per origin"; private mode data usually deleted), read 2026-11-02: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN Window.sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- MDN Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN Origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin
- MDN Using HTTP cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- OWASP HTML5 Security Cheat Sheet ("Do not store session identifiers in local storage as the data is always accessible by JavaScript." / "Cookies can mitigate this risk using the httpOnly flag."), read 2026-11-02: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- OWASP CSRF Prevention Cheat Sheet (part 2): https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- WebKit, Full Third-Party Cookie Blocking and More (March 2020; seven days of Safari use without interaction): https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
- Laravel skeleton config/session.php 12.x (IS3): https://github.com/laravel/laravel/blob/12.x/config/session.php · Laravel docs, responses / cookies: https://laravel.com/docs/responses
- Privacy Sandbox next steps (April 2025): https://privacysandbox.google.com/blog/privacy-sandbox-next-steps
- The Register, TanStack npm compromise (12 May 2026): https://www.theregister.com/cyber-crime/2026/05/12/cache-poisoning-caper-turns-tanstack-npm-packages-toxic/5238650
- Simon Willison, supply chain attack on Axios (31 March 2026): https://simonwillison.net/2026/Mar/31/supply-chain-attack-on-axios/
- techinterview.org, Frontend Cookies, Storage, and Privacy in 2026: https://www.techinterview.org/post/3233475403/frontend-cookies-storage-privacy-2026/
- Search suggestions: `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=...` and `ds=` (Google), 2026-11-02.
- Outlier numbers: yt-dlp 2026.08.19 flat search + channel Videos tab (last 25), 2026-11-02 (7c).
- Her monetisation reference (from the brief): "How to Add Paystack Payment to your Website (Next.js React App) in 15 MINUTES!", 8.86 % click rate, 138 watch hours.
- Her TikTok references: `inspiration/tiktok-references/INDEX.md` (#03, #04, #06, #08, #13, #14, #15, #16, #19, #21, #25, #29, #32, #36); playbooks `inspiration/know-how/SOCIAL-PLAYBOOK.md`, `SHORTS-PLAYBOOK.md`, `TEASER-PLAYBOOK.md`.

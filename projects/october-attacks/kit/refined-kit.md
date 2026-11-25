# Refined kit: PHP2Shell and October 2026's attacks on developers, in plain words

> **THE CURRENT KIT** for this video. Last updated: 2026-10-26 16:24 (Instagram: "Full video on YouTube, link in bio"). Her original kit is in `archive/original-kit/` (not current; don't read it).

> **The video is live:** https://youtu.be/E5Hj7IHSN2Y (every "full video" line below now points to it).

Written 2026-10-26 by the social media strategist from your recording (`kit/transcripts/transcript.srt`, 8:00 raw) and your kit version 4 (now `../archive/original-kit/october-2026-security-attacks-kit.md`). Facts re-checked against reporting up to 2026-10-26 (section 7). There is no BRIEF.md for this project yet; section 7e is the fact list. Everything usable from your kit (X posts, replies, essay, pinned comment) is merged in below. **All times in this file are RAW-recording times** (the 8:00 `.mov`) until the talking-head edit is exported; chapters must then be re-timed to the exported file.

**What you actually say vs your kit (short; the recording wins, details in 7e):**
1. "I write **Laravel** at work" (kit: "I write PHP at work").
2. "The shell part of the name is actually **very important**" (kit: "actually scary").
3. You never say the fixed PHP version numbers out loud: they go on screen and in the captions only.
4. "You have to restart your **patch**" is what the transcript heard at 2:34; it is almost certainly "your **Apache**". You don't say PHP-FPM. **Please listen at 2:34.**
5. Zeabur: no "They're like, no, we can't do this anymore". You say "like they're literally checking out".
6. OpenCode: you don't say "1.4 percent of Console users".
7. eMudhra: the kit's added line "Chrome and Firefox blocked those keys" is **not in the recording**. We put it on screen and in captions so nobody thinks the danger is still live.
8. AI hacker: you name SharkNinja and Cummins (not Deere), and there is no "Jesus", no GitHub video line, no "on Twitter, on YouTube".
9. Ending: "I have people that are working in companies that have literally been stuck **over** dealing with attacks. It's been crazy, really crazy." (the word after "stuck" is unclear: **listen at 7:55**). No comment question is spoken.
10. Opening is "**A lot of** things have been happening on the internet this month."

## At a glance
| | |
|---|---|
| Topic | What happened in developer security in October 2026 (the PHP2Shell flaw in PHP, the Railway and Zeabur breaches, stolen OpenCode AI keys, a weak eMudhra certificate key and a hacker using AI agents) and what to do about it today. |
| Recommended title | **PHP2Shell Explained: The PHP Flaw and October's Other Hacks** (59 characters) |
| Recommended thumbnail | (plan, not built yet) **T1 "PATCH YOUR PHP"** (a cracked generic elephant + a terminal `php -v` showing a fixed version + you, calm). Test it against **T7 "HACKED: $1,000 AI BILL"** (a receipt) and **T9 "AI AGENTS HACKED 100+ SITES"** (website tiles turning red, "$50 each (estimate)") in YouTube Test & Compare, all with title 1. Files will land in `outputs/thumbnails/`. |
| File to upload | `outputs/talking-head/talkinghead-full_16x9.mp4` (7:57, built 2026-10-26; also in `~/Downloads/october-attacks/talking-head/`), chapters in 1b timed to it. Or the motion film `outputs/video/october-attacks_motion_16x9.mp4` (re-time the chapters if you upload that). |
| Posting order | It is a news video, so the window is days, not weeks. 1. Long video + LinkedIn post (6a) + X thread (6b) + community post (6c), **as soon as the edit is ready (aim Mon 26 or Tue 27 Oct, morning CET)**  2. Same day: SH6 "How to fix PHP2Shell" on Shorts, TikTok, Reels  3. Day 2: SH2 "What is PHP2Shell?", SH11 "OpenCode hack", teaser on LinkedIn and X  4. Day 3: SH14 "The number 4 key", SH9 "Zeabur shutting down", Instagram carousel  5. Day 4: SH15 "AI agents hacker", SH13 "Protect your API keys", LinkedIn carousel  6. Days 5-10, two a day: SH4, SH8, SH10, SH12, SH1, SH3, SH5, SH16, SH7 (SH7 only on platforms where SH6 did not go out). |
| Files | (plan, not built yet) Thumbnails `outputs/thumbnails/` · Shorts `outputs/shorts/` · Teaser `outputs/teaser/` · Full edit `outputs/talking-head/` · Motion film `outputs/video/` · Carousels `outputs/carousels/instagram/` and `outputs/carousels/linkedin/` · Downloads copies in `~/Downloads/october-attacks/`. Studio (start it first): full edit http://localhost:7700/moment/october-attacks/full/ · shorts `/moment/october-attacks/sh1/` to `/sh16/` · teaser `/moment/october-attacks/teaser/` · film http://localhost:7700/edit/october-attacks/ · thumbnails http://localhost:7700/design/october-attacks/thumbnails/ · carousels `/design/october-attacks/carousels/instagram/` and `/linkedin/` |
| Where each platform's text is | YouTube title, description (chapters, sources, connect, hashtags), tags, pinned comment: **section 1** · Thumbnails: **2** · Shorts (YouTube Shorts, TikTok, Reels, LinkedIn, X, per short): **3** · Teaser bites + posts: **4** · Carousels (Instagram, LinkedIn): **5** · Main LinkedIn post, X thread, community post, more X posts, replies, essay: **6** |
| Open questions | 1. Pick the title (recommended above). 2. **Listen at 2:34** ("restart your patch" = "Apache"?) and **at 7:55** ("stuck over…"). 3. The fixed version numbers are not spoken: OK to show them on screen in the edit and in SH6? (recommended yes). 4. Do you want a photo of yourself at a laptop (no mic, serious or head in hand) for T10 and the collage thumbnails? 5. Railway's final report may land this week: if it says how they got in, add one line to the description and pinned comment (ready text in 6e). |

## 1. YouTube

### 1a. Titles
All checked by code: 40 to 60 characters, main keyword inside the first 40 characters for search-led titles. Why PHP2Shell leads: single-topic "PHP2Shell explained" videos from small channels got 15x to 500x their usual views this week, while roundup titles from big channels ("Why is everything getting hacked", "A Bad Week for the Web") did 0.5x to 0.7x their usual (7c). Your audience writes PHP and Laravel, and "php2shell explained" is a live YouTube suggestion (7b).

| # | Title | Characters | Type | Pairs with thumbnail |
|---|---|---|---|---|
| 1 | PHP2Shell Explained: The PHP Flaw and October's Other Hacks | 59 | **recommended**, search-led, **Test & Compare with T1, T7, T9** | T1, T7, T9 (also T2, T5) |
| 2 | PHP2Shell Explained: Is Your PHP Server Patched? | 48 | search-led | T2 (also T4) |
| 3 | PHP2Shell, Railway and OpenCode: What Developers Should Do | 58 | search-led | T3 |
| 4 | PHP Vulnerability 2026: How to Check and Patch PHP2Shell | 56 | search-led | T4 |
| 5 | Is PHP Patched? PHP2Shell and the October 2026 Hacks | 52 | search-led | T5 |
| 6 | Railway Hack, Zeabur and OpenCode: Change Your API Keys | 55 | search-led | T6 |
| 7 | OpenCode Hacked, Railway Breached: Protect Your API Keys | 56 | search-led | T7 |
| 8 | Cybersecurity Awareness Month 2026 Went Badly for Developers | 60 | search-led | T8 |
| 9 | AI Hacking News: One Hacker, AI Agents, 100+ Companies | 54 | search-led | T9 |
| 10 | October Was a Terrible Month for Developer Security | 51 | click-led (your kit's stretch title) | T10 |
| 11 | Three Breaches This Month Went After Developers' Secret Keys | 60 | click-led | T11 |
| 12 | Developers Had a Rough October: PHP, Railway, OpenCode | 54 | click-led | T12 |
| 13 | A Hosting Platform Is Shutting Down After Two Hacks | 51 | click-led (Zeabur short or community post, not the main video) | T13 |
| 14 | What October's Hacks Mean for Your PHP and API Keys | 51 | click-led | T14 |
| 15 | The October 2026 Hacks Every Developer Should Know | 50 | click-led | T15 |

**Test & Compare (YouTube lets you test 3 thumbnails):** keep title 1 and test T1 "PATCH YOUR PHP", T7 "HACKED: $1,000 AI BILL" and T9 "AI AGENTS HACKED 100+ SITES". All three are stories in the video, and the title says it covers "October's other hacks". Title 1 keeps the search words "PHP2Shell explained" (a live YouTube suggestion) and now says plainly what it is ("the PHP flaw"), because both cold reviewers said "PHP2Shell" alone means nothing to strangers. If day one is clearly weak, switch the title to 7 or 9.
Not used: "PHP Got Hacked" (PHP the language had security holes; it was not hacked) and "Every Hack That Hit Developers…" (we can't promise "every").

### 1b. Description
Paste as is. Chapter times are timed to the exported talking-head file `outputs/talking-head/talkinghead-full_16x9.mp4` (7:57), the file to upload (1c). The version numbers are on screen in the video, so they are in the description too.
```text
PHP2Shell is two critical security holes in PHP, the language behind nearly three quarters of the websites in the world, and PHP shipped the fix on October 21, 2026. If you run PHP anywhere, update it and restart it.

October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other. On the same day as the PHP fix, Railway told its users to change their secret keys. Zeabur, another platform developers use to deploy apps, is shutting down after being hacked twice. OpenCode users found out about a hack from their AI bills. And Reuters reported that one hacker used AI agents to break into more than a hundred company websites.

I write Laravel at work, and the Railway pause even affected me. So I went through each story in plain words, and what you can actually do today.

The fixed PHP versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35. After updating, restart PHP-FPM or Apache, and if you use Docker, rebuild your images. Updating Laravel alone does not fix this, because the loophole is in PHP itself.

Which of these stories surprised you the most?

CHAPTERS
0:00 October's attacks, quickly
0:38 PHP2Shell, and why it is so bad
2:23 How to fix PHP2Shell
2:54 Railway, Zeabur and OpenCode
5:20 How to protect your API keys
5:57 The certificate key that was the number 4
6:49 AI on both sides

SOURCES AND FURTHER READING
PHP2Shell analysis (Datadog Security Labs): https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
PHP ships emergency patches (BleepingComputer): https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws
Amazon saw an attempt before the announcement (AWS Security Blog): https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
Who found PHP2Shell, with help from AI (Reuters via Deseret News): https://www.deseret.com/business/2026/10/21/website-computer-server-security-flaw-artificial-intelligence-hackers-cybersecurity-php-programming-language/
Railway's preliminary incident report: https://blog.railway.com/p/preliminary-report-october-security-incident
Railway urges users to revoke keys (TechCrunch): https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/
Zeabur is shutting down (Zeabur): https://zeabur.com/blogs/zeabur-is-shutting-down
Zeabur's second breach (BleepingComputer): https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/
OpenCode hack and AI charges (TechCrunch): https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/
Browsers block eMudhra certificates (BleepingComputer): https://bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates
One hacker, AI agents and 100+ company websites (Reuters via Star-Advertiser): https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/
Node.js October 2026 security release (SecurityOnline): https://securityonline.info/nodejs-security-release-october-2026/

CONNECT WITH ME
LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
Twitter/X: https://x.com/OladetounGee
Instagram: https://www.instagram.com/officialgbemmy/
Website: https://www.gbemisolaoladetoun.com/

#php2shell #cybersecurity #php
```

### 1c. Chapters
Seven broad chapters (the most allowed, her rule 2026-10-16): the video has clear, separate stories, so real chapters fit. **The times below are RAW-recording times** (the 8:00 `.mov`), for finding the spots only. When `outputs/talking-head/talkinghead-full_16x9.mp4` is exported, take each start from that file's `.srt` (the line where the chapter begins) and put it in the description above; do the same for the motion film if you upload that instead.

| Chapter | Starts with (her words) | Raw time | Talking-head 16:9 (exported) | Motion film (exported) |
|---|---|---|---|---|
| October's attacks, quickly | "A lot of things have been happening on the internet this month." | 0:00 | 0:00 | 0:00 |
| PHP2Shell, and why it is so bad | "I believe the PHP one is the biggest one so far." | 0:39.5 | 0:38 | TBD |
| How to fix PHP2Shell | "So basically if you're running PHP anywhere, you have to update your PHP." | 2:24.1 | 2:23 | TBD |
| Railway, Zeabur and OpenCode | "Now while everyone was busy patching PHP, Railway happened on the same day." | 2:54.8 | 2:54 | TBD |
| How to protect your API keys | "When you put Railway, Zeabur and OpenCode's incidents side by side…" | 5:20.6 | 5:20 | TBD |
| The certificate key that was the number 4 | "Now there's one more story from the October drama…" | 5:57.3 | 5:57 | TBD |
| AI on both sides | "And I think in the middle of all of this attack drama…" | 6:53.3 | 6:49 | TBD |

### 1d. Tags
473 characters by YouTube's count (a tag with a space counts 2 extra), checked by code, under the 500 limit.
```text
php2shell, php2shell explained, php2shell vulnerability, php vulnerability 2026, is php patched, php security update, php update, railway hack, railway environment variables, zeabur shutting down, opencode hacked, ai hacking news, api key stolen, rotate api keys, laravel security, cybersecurity news, cybersecurity awareness month 2026, cve-2026-109618, emudhra, cyber attack php, developer security, web security, php issue explained, ai agents hacking
```

### 1e. Pinned comment
```text
If you run PHP, the fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and you have to restart PHP-FPM or Apache (or rebuild your Docker image) after updating, otherwise the old code keeps running. Did you have to patch anything or change any keys this week?
```

## 2. Thumbnails
**Built 2026-10-26**: 21 thumbnails in `outputs/thumbnails/` with scores and best titles in `design/thumbnails/README.md` (top: 18 "HACKED: $1,000 AI BILL", 13 "IS YOUR PHP PATCHED?", 14 terminal "IS YOUR PHP SAFE?"; kit trio = 02, 18, 15).

(original plan) One concept per title. Wording gate (THUMBNAILS.md RULE 0 and 1): every text below names the topic or its outcome in plain words, none is a line from the script, and none repeats its title. The set is a mix: photo background (T1, T6, T10, T12, T14), collage over your photo (T5, T8), flat drawn idea (T2, T3, T4, T9, T11), other (T7 a bill, T13 a sign, T15 a wall of real headlines). The outlier thumbnails this week (7c) share: dark ground, the topic name huge, the PHP elephant oval or a terminal prompt, one red accent, 2-4 words. We keep the clarity and use your look (calm face, few big objects, one accent), never their logos: a generic elephant, not the PHP logo; plain "railway" text only if it's a real screenshot with a credit.

### 2a. Recommended 3 (for YouTube Test & Compare, all with title 1)
| # | File | Words on it | Title it pairs with | Cold scores (7d) |
|---|---|---|---|---|
| 1 | (plan) `outputs/thumbnails/t1-patch-your-php.png` | PATCH YOUR PHP | 1. PHP2Shell Explained: The PHP Flaw and October's Other Hacks (also 2) | round 1: 5 with the old title; the new title now says "the PHP flaw", which this thumbnail answers |
| 2 | (plan) `outputs/thumbnails/t7-hacked-ai-bill.png` | HACKED: $1,000 AI BILL | 1 (also 7) | 8 in round 1, 7 in round 2 until "hacked" was added (added) |
| 3 | (plan) `outputs/thumbnails/t9-ai-agents-100-sites.png` | AI AGENTS HACKED 100+ SITES | 1 (also 9) | 8 in round 1, 7 in round 2 until the words said what happened (rewritten) |
Back-ups: T13 "HACKED TWICE, SHUT DOWN" and T2 "IS YOUR PHP PATCHED?".

### 2b. All thumbnail concepts
| # | Words (1-5) | The literal picture | Follows | Why a stranger gets it and clicks | Pairs with titles |
|---|---|---|---|---|---|
| T1 | PATCH YOUR PHP | Dark slate ground. Left: a big generic blue-grey elephant (flat drawing) with a red crack across it and a plaster on the crack. Right: you, medium, calm and serious, closed mouth, one hand pointing at a small terminal card under the elephant: `$ php -v` then `PHP 8.4.27` with a green tick. Words huge, top left, "PHP" in the one accent (red). | Her database-indexes thumbnail (topic huge + one literal mechanism + her cut-out); viral 5 (topic named + the scene shows it) | Anyone who runs PHP knows the elephant and reads an instruction aimed at them; the title adds "what is PHP2Shell". | 1, 2 |
| T2 | IS YOUR PHP PATCHED? | Flat off-black. A grid of 12 small browser windows, 9 of them carrying a big elephant badge and the large label "runs on PHP" (grey, not red: running PHP is not the same as being hacked); one window in the middle has a red warning triangle. Your small B&W cut-out bottom right. | Viral 2 (faceless, one object = the stakes), viral 1 (topic + literal picture) | Shows how much of the web runs PHP without claiming it was all hacked (the second cold reviewer flagged a red grid as false). Honest: W3Techs via Reuters, "nearly three quarters" run PHP. | 1, 2 |
| T3 | YOUR TO-DO LIST | Warm paper ground. A clipboard checklist, huge, three lines in hand-writing: "Update PHP", "Restart PHP", "Change API keys", each with a red tick box (two ticked, the third empty). You beside it holding a pen, calm. | Viral 2 (clipboard with DONE), viral 3 (the framework drawn) | It promises a short to-do list, which is exactly what developers want in a bad news week; the title names the stories. | 3, 14 |
| T4 | 8.3.35 IS NOT SAFE | Full-bleed terminal (black, mono). `$ php -v` → two result lines: `8.3.35` with a red X and `8.3.36` with a green tick. Small elephant top right. No face. | Her database-indexes (one clear mechanism, few big elements) | A developer recognises the command instantly and wants to know which number is safe. | 4, 2 |
| T5 | A MONTH OF HACKS | Collage over your full photo (your room, washed in one deep red, you in full colour, calm, arms folded): 4-5 real headline clippings pinned around you (PHP2Shell patches, Railway urges users to revoke keys, Zeabur shutting down, OpenCode hack), each a cropped real screenshot from `assets/sources/` with a tiny source credit, key words highlighted yellow. | Her ghana-marrify 10b (newspaper clipping + highlight) and the collage style (viral collage samples) | Real headlines say "this is the news roundup" at a glance; the words say there were many. | 5, 1, 15 |
| T6 | STOLEN SECRET KEYS | Your photo as the background (calmed with a one-colour wash), you holding up a big cut-out key with a red paper tag "STOLEN"; a `.env` card floats beside it with three lines (`DB_PASSWORD=`, `OPENAI_API_KEY=`, `AWS_SECRET_ACCESS_KEY=`), values blurred. | Her ux-research thumbnail (her photo, one wash, she gestures at the object) | Keys + a .env file = every developer's secrets; "stolen" is the stake. | 6, 11 |
| T7 | HACKED: $1,000 AI BILL | Other: a long paper receipt, huge, on plain white: "AI usage" lines (no brand logos), total "$1,000+" circled in red marker. Small: a phone notification "Usage alert". No face. | Viral 2 (one object = the outcome) | Everyone fears a bill they didn't run up; the title says OpenCode was hacked. | 1, 7 |
| T8 | SO MANY HACKS | Collage over your full photo: a big October calendar page in front of you, four dates circled in red (14, 17, 19, 21), small cut-outs stuck on the days (key on 14, padlock with "4" on 17, robot on 19, elephant and a second key both on 21). | Viral 7 (vlog collage of places), viral 9 (collage of the things) | A calendar of red dates = "a month of incidents", readable at phone size. | 8, 12, 15 |
| T9 | AI AGENTS HACKED 100+ SITES | Flat off-black. A grid of 100 tiny website tiles, many turning red; a small robot/agent icon row along the top sending lines to them; a price tag "$50 each (estimate)" hanging off one tile, big enough to read. | Viral 4 (a diagram of the idea), viral 2 | The price is the shock and it's true as an estimate; the title says one hacker used AI agents. | 1, 9 |
| T10 | DON'T SKIP THESE | Your photo at a laptop (needs a new photo: no mic), hand on forehead; the laptop screen shows a stack of red notification cards ("Update PHP", "Rotate your keys", "Unusual AI usage"). | Her saved YouTube thumbnails (person in her real setting with a laptop, big expressive face) | Every developer recognises the alert pile-up; the title says October was bad. | 10 |
| T11 | THEY WANT THIS | Flat warm paper. A `.env` card in the middle; three hands (flat drawn) reach in from three sides, each sleeve with a small plain label: "Railway", "Zeabur", "OpenCode". | Viral 3 (the framework drawn) | It shows three attacks aiming at one thing, your keys. | 11, 6 |
| T12 | WHAT TO FIX FIRST | Your photo, room washed in one green, three huge objects in a row in front of you: the elephant, a key, a receipt; a yellow arrow from left to right. | Her ux-research thumbnail (three big objects, one arrow, one wash) | Order of action for a busy developer; title names the stories. | 12, 14 |
| T13 | HACKED TWICE, SHUT DOWN | Other: a server rack photo (stock, Pexels) with a paper "CLOSED" sign taped on it and a big key tag hanging from the door "one old token". No face. | Viral 2 (one object tells the story) | A shop-closed sign on a server is instantly readable; the title says a hosting platform is shutting down. | 13 |
| T14 | CHECK THESE 2 THINGS | Your photo, holding up two fingers; beside you, two big cards: the elephant (PHP) and a key (API keys). | Viral 5 (topic named + scene shows it) | Two concrete things to check is a small, clickable promise. | 14 |
| T15 | 6 STORIES, ONE MONTH | Other: three big real headline cards (real screenshots, credits), one highlighted line on each, no face. | Ghana-marrify 10b (clipping on plain white) | Real headlines, addressed to developers, read as a briefing. | 15, 5 |

## 3. Shorts
**Built 2026-10-26** (studio `/moment/october-attacks/sh01/` to `/sh16/`, files in `outputs/shorts/` and `~/Downloads/october-attacks/shorts/`): 16 shorts the recording honestly supports. Her picture in the 3:4 window (her pick); your "FULL VIDEO ON YOUTUBE" clip ends every short and the teaser (added 2026-10-26). Each runs on its own for a stranger: the top label names the topic in plain words, her first line is a clean start, and nothing points back to the long video. Some overlap on purpose (SH3 sits inside SH2, SH5 inside SH4, SH7 inside SH6, SH10 inside SH9, SH12 inside SH11): post the overlapping pair on different days, or on different platforms. All times are **raw** (the 8:00 recording). No big overlay text at the start (her rule 2026-10-18).
Posting order: SH6, SH2, SH11, SH14, SH9, SH15, SH13, SH4, SH8, SH10, SH12, SH1, SH3, SH5, SH16, SH7 (two a day in the first five days, then one a day).
Spoken version numbers: none. Put `8.5.12 · 8.4.27 · 8.3.36 · 8.2.35` on screen in SH6 and SH7 (as a terminal card, not as a dot list in captions).
Dropped: the closing line on its own (7:52.4-7:59.4, 7 s, too thin) and "PHP runs most of the web" on its own (0:42.5-0:54.4, 12 s, no payoff).

### SH1 · A PHP flaw and 3 hacks in one month
File `outputs/shorts/short01-october-security-news_9x16.mp4` (built 2026-10-26, 40 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "A PHP flaw and 3 hacks in one month" · from 0:00.1 to 0:39.5 (raw)
Hook (first line she says): "A lot of things have been happening on the internet this month."

**YouTube Shorts**
```text
Title: October 2026 cyberattacks: PHP2Shell, Railway, Zeabur and AI

Description: October is supposed to be Cybersecurity Awareness Month, and it has been one attack after the other. PHP, the language behind most of the websites in the world, had two critical security holes. Railway had to tell its users to change their secret keys. Zeabur is shutting down after being hacked twice. And one hacker used AI agents to break into more than a hundred companies.

#Shorts #cybersecurity #php #technews #webdev

Tags: october 2026 cyberattacks, cybersecurity news, cybersecurity awareness month 2026, php2shell, php2shell explained, php vulnerability 2026, railway hack, zeabur shutting down, opencode hacked, ai hacking news, cyber attack news, cybersecurity news this week, developer security, security news, tech news, web security, php security update, api key stolen, ai agents hacking, is php patched, php2shell vulnerability, railway environment variables, emudhra
```
**TikTok**
```text
october is supposed to be cybersecurity awareness month and it has been one attack after the other 😅 PHP had two critical security holes, Railway told users to change their secret keys, Zeabur is shutting down after being hacked twice, and one hacker used AI agents on 100+ companies.
#cybersecurity #php #technews #developer #webdev
```
**Instagram Reels**
```text
October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other.

PHP had two critical security holes. Railway told its users to change their secret keys. Zeabur is shutting down after being hacked twice. And one hacker used AI agents to break into more than a hundred companies.

Full video on YouTube, link in bio
#cybersecurity #php #technews #webdev #developer
```
**LinkedIn**
```text
October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other.

PHP, which runs most of the websites in the world, had two critical security holes. Railway, a platform a lot of us deploy our apps on, had to tell its users to change their secret keys. Zeabur, another deployment platform, is shutting down after being hacked twice. And Reuters reported that one hacker used AI agents to break into more than a hundred companies.

It's been an overflow of attacks this month. Which of these did you have to deal with?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #softwareengineering #php #technews
```
**X**
```text
october is supposed to be cybersecurity awareness month, and php had two critical security holes, railway told users to change their keys, zeabur is shutting down after two hacks, and one hacker used ai agents on 100+ companies
```

### SH2 · PHP2Shell: a PHP loophole that lets hackers in
File `outputs/shorts/short02-what-is-php2shell_9x16.mp4` (built 2026-10-26, 38 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "PHP2Shell: a PHP loophole that lets hackers in" (hers, 2026-10-26; ours was "PHP2Shell: a PHP flaw that lets hackers in") · from 0:42.5 to 1:48.1 (raw) · built cut leaves out the two-bug explainer (raw 1:16.1-1:44.1): it ends "So it is really terrible. These are huge loopholes that people have already tried to exploit."
Hook: "PHP runs nearly three quarters of the websites in the world."

**YouTube Shorts**
```text
Title: What is PHP2Shell? The PHP flaw explained

Description: PHP runs nearly three quarters of the websites in the world, including WordPress and Laravel sites, and two critical security holes were found in it this month. They're calling it PHP2Shell. Getting a shell means an attacker can type commands on your server as if it were their own computer. PHP rated it 9.2 out of 10. One bug is about memory and the other is about leftover data from earlier requests, and people have already tried to exploit them.

#Shorts #php2shell #php #cybersecurity #webdev

Tags: php2shell, what is php2shell, php2shell explained, php2shell vulnerability, php vulnerability 2026, php vulnerability 2026 news, php vulnerability, php security issue, php issue explained, php remote code execution, cve-2026-109618, cve-2026-109619, wordpress php vulnerability, laravel security, php security update, php security alert, is php patched, cyber attack php, php shell vulnerability, php security vulnerability, php critical vulnerability, php2shell cves
```
**TikTok**
```text
PHP runs nearly 3/4 of the websites in the world, and it just had two critical security holes. they're calling it PHP2Shell, and "shell" means an attacker can type commands on your server like it's their own computer.
#php2shell #php #cybersecurity #webdev #laravel
```
**Instagram Reels**
```text
PHP runs nearly three quarters of the websites in the world. WordPress runs on it, Laravel runs on it, and I write Laravel at work.

This month two critical security holes were found in PHP, and they're calling it PHP2Shell. The "shell" part is the important bit: it means an attacker can type commands on your server as if it were their own computer. PHP rated it 9.2 out of 10.

Full video on YouTube, link in bio
#php2shell #php #cybersecurity #webdev #laravel
```
**LinkedIn**
```text
PHP runs nearly three quarters of the websites in the world, and this month two critical security holes were found in it. They're calling it PHP2Shell.

I write Laravel at work, and I believe this is the biggest story of the month.

The "shell" in the name is the important part. Getting a shell means an attacker can type commands on your server as if it were their own computer. PHP rated it 9.2 out of 10.

The first bug is about memory. If PHP runs out of memory at a very specific moment while it's reading a request, it leaves half-finished data behind, and its clean-up code treats that data like it's real. The second is about leftover data on PHP workers from earlier requests that should have been thrown away.

If you run PHP anywhere, have you checked your version yet?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#php #cybersecurity #laravel #webdevelopment #softwareengineering
```
**X**
```text
php runs nearly 3/4 of the web and it just had two critical security holes (php2shell, rated 9.2/10). "shell" means an attacker can type commands on your server like it's their own computer
```

### SH3 · PHP2Shell: hackers could run commands on your server
File `outputs/shorts/short03-shell-meaning_9x16.mp4` (built 2026-10-26, 22 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "PHP2Shell: hackers could run commands on your server" · from 0:54.4 to 1:16.1 (raw; the built cut starts one sentence earlier, on "And two critical loopholes have been found in PHP this month", so strangers know what "it" is)
Hook: "They're calling it the PHP2Shell."

**YouTube Shorts**
```text
Title: PHP2Shell: how hackers could run commands on your server

Description: The new PHP security holes are called PHP2Shell, and the shell part of the name is the important part. Getting a shell means an attacker can type commands on your server as if they were on their own computer. PHP rated it 9.2 out of 10.

#Shorts #php2shell #php #cybersecurity #infosec

Tags: php2shell meaning, what is a shell, php2shell, php2shell explained, what is php2shell, remote code execution explained, remote code execution, php vulnerability 2026, php security issue, reverse shell explained, web shell, cybersecurity for beginners, php2shell vulnerability, php shell vulnerability, php shell explained, php issue explained, cve-2026-109618, cybersecurity news, what does shell mean, shell access explained, php2shell wiz, php security vulnerability
```
**TikTok**
```text
why is the new PHP flaw called PHP2Shell? because getting a "shell" means an attacker can type commands on your server like it's their own computer 😬
#php2shell #php #cybersecurity #learntocode #infosec
```
**Instagram Reels**
```text
The new PHP security holes are called PHP2Shell, and the "shell" part is the important part. Getting a shell means an attacker can type commands on your server as if they were on their own computer. PHP rated it 9.2 out of 10.

Full video on YouTube, link in bio
#php2shell #php #cybersecurity #learntocode #infosec
```
**LinkedIn**
```text
The new PHP security holes are called PHP2Shell, and the "shell" part of the name is the important part.

Getting a shell means the attack is so bad that an attacker can type commands on your server as if they were on their own computer. That's why PHP rated it 9.2 out of 10.

When you hear "shell" in a vulnerability's name, that's the level of access it means. Did you know that's what it meant?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #php #softwareengineering #webdevelopment
```
**X**
```text
the "shell" in php2shell is the important part. getting a shell means an attacker can type commands on your server as if it were their own computer
```

### SH4 · PHP2Shell attack happens before your code runs
File `outputs/shorts/short04-login-cant-stop-it_9x16.mp4` (built 2026-10-26, 37 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "PHP2Shell attack happens before your code runs" (hers, 2026-10-26; ours was "This PHP attack happens before your code runs") · from 1:48.2 to 2:24.1 (raw)
Hook: "The thing about PHP2Shell and why it's really so crazy is that it happens before your code even runs."

**YouTube Shorts**
```text
Title: Why your login can't stop PHP2Shell

Description: The PHP2Shell flaw in PHP happens before your code even runs. PHP reads the incoming request first, and the loophole is in that reading part, so your login, your middleware and your authentication never get a chance to stop it. Amazon reported that someone tried it on one of its trap servers four days before it was announced, and some government websites in Europe went offline while they patched.

#Shorts #php2shell #php #cybersecurity #webdev

Tags: php2shell explained, php2shell, php remote code execution, php2shell vulnerability, php vulnerability 2026, php zero day, php2shell exploit, php security issue, php authentication bypass, middleware security, php issue explained, government websites offline, amazon honeypot, laravel security, unauthenticated rce, is php patched, cybersecurity news, php before code runs, php request parsing bug, php2shell wiz, php security vulnerability, php critical vulnerability
```
**TikTok**
```text
the scary part about PHP2Shell is when it happens: while PHP is reading the request, before your code runs. so your login and middleware never get a say 😬
#php2shell #php #cybersecurity #webdev #backend
```
**Instagram Reels**
```text
The thing that makes PHP2Shell so bad is that it happens before your code even runs.

PHP reads the incoming request first, and the loophole is in that reading part. So your login, your middleware and your authentication don't stand a chance. You can have the best login in the world and it wouldn't matter.

Amazon even saw someone try it on one of its trap servers four days before it was announced.

Full video on YouTube, link in bio
#php2shell #php #cybersecurity #webdev #backend
```
**LinkedIn**
```text
The PHP2Shell flaw in PHP happens before your code even runs, and that's what makes it so bad.

PHP reads the incoming request first, and the loophole is in that reading part. So your login, your middleware and your authentication never get a chance. You can have the best login in the world and it wouldn't matter.

Amazon reported that someone tried it on one of its honeypot servers (a trap server set up to catch attackers) four days before it was even announced. And some government websites in Europe went offline while they patched.

So the only real fix is updating PHP itself. Has your team patched yet?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #php #softwareengineering #backend
```
**X**
```text
php2shell happens while php is reading the request, before your app code runs. your login, middleware and auth never get a say. the only real fix is updating php itself
```

### SH5 · Amazon got a share of the PHP Attack
File `outputs/shorts/short05-before-the-fix_9x16.mp4` (built 2026-10-26, 13 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Amazon got a share of the PHP Attack" (hers, 2026-10-26; ours was "Someone tried this PHP attack 4 days early") · from 2:06.1 to 2:18.2 (raw) · built cut ends on "...just four days before it was even announced."
Hook: "You can have the best login in the world and it wouldn't matter."

**YouTube Shorts**
```text
Title: Amazon caught a PHP2Shell attack before it was announced

Description: With the PHP2Shell flaw in PHP, you can have the best login in the world and it wouldn't matter. Amazon reported that someone tried to use it on one of its trap servers four days before it was announced, and government websites in Europe went offline while they patched.

#Shorts #php2shell #php #cybersecurity #aws

Tags: php2shell exploit, amazon honeypot, php2shell, php2shell timeline, php zero day, php2shell explained, government websites offline, php vulnerability 2026, php security news, honeypot explained, cyber attack php, php2shell vulnerability, aws madpot, what is a honeypot, php vulnerability 2026 news, php security alert, websites offline php, cybersecurity news, php2shell news, php2shell leak, php security breach, cloudflare php2shell, php critical vulnerability
```
**TikTok**
```text
Amazon says someone tried the new PHP2Shell attack on one of its trap servers 4 days before the flaw was even announced. and some government websites in Europe went offline while they patched.
#php2shell #php #cybersecurity #aws #technews
```
**Instagram Reels**
```text
Amazon reported that someone tried the new PHP2Shell attack on one of its honeypot servers (a trap server set up to catch attackers) four days before the flaw was announced. Government websites in Europe even went offline while they patched.

Full video on YouTube, link in bio
#php2shell #php #cybersecurity #technews #infosec
```
**LinkedIn**
```text
Amazon reported that someone tried to use PHP2Shell, the new flaw in PHP, on one of its honeypot servers four days before it was announced.

A honeypot is basically a trap server set up to catch attackers. So someone had it before the rest of us knew it existed. And some government websites in Europe literally went offline while they patched.

If something this big can be tried before the announcement, how fast does your team patch after one?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #php #infosec #softwareengineering
```
**X**
```text
amazon's honeypot saw a php2shell attempt on october 17, four days before the flaw was announced. some government sites in europe went offline while they patched
```

### SH6 · How to Fix the PHP2Shell Vulnerability
File `outputs/shorts/short06-fix-php2shell_9x16.mp4` (built 2026-10-26, 31 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "How to Fix the PHP2Shell Vulnerability" (hers, 2026-10-26; ours was "Fixing PHP2Shell: update, then restart") · from 2:24.1 to 2:54.8 (raw) · on screen: terminal card `php -v` and `8.5.12 · 8.4.27 · 8.3.36 · 8.2.35`
Hook: "So basically if you're running PHP anywhere, you have to update your PHP."

**YouTube Shorts**
```text
Title: How to fix PHP2Shell (update and restart PHP)

Description: If you run PHP anywhere, update it. The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and if you're still on PHP 8.1 or older, upgrade. Updating the package is not enough on its own: restart PHP-FPM or Apache, and if you use Docker, rebuild your images. Your Laravel version doesn't protect you, because the loophole is in PHP underneath Laravel. Node.js also had a security release on the same day.

#Shorts #php2shell #php #laravel #devops

Tags: php2shell fix, how to fix php2shell, php security update, is php patched, is php fixed, php update, php update version, php 8.5.12, php 8.4.27, php 8.3.36, php 8.2.35, php version check, php-fpm restart, laravel php2shell, php2shell, php vulnerability 2026, node js security release, php update command, docker rebuild image, cve-2026-109618, php2shell scanner, update php ubuntu, php update wordpress, php security patch, php critical vulnerability, web security
```
**TikTok**
```text
if you run PHP, update it today: 8.5.12, 8.4.27, 8.3.36 or 8.2.35. then restart PHP-FPM or Apache (or rebuild your Docker image), otherwise the old code keeps running 🔧
#php2shell #php #laravel #devops #webdev
```
**Instagram Reels**
```text
If you're running PHP anywhere, you have to update it. The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and if you're on 8.1 or older, it's time to upgrade.

Updating the package isn't even enough. Restart PHP-FPM or Apache, and rebuild your Docker images. And your Laravel version doesn't protect you here, because the loophole is in PHP itself.

Full video on YouTube, link in bio
#php2shell #php #laravel #devops #webdev
```
**LinkedIn**
```text
If you're running PHP anywhere, you have to update it this week.

The fixed versions for PHP2Shell are 8.5.12, 8.4.27, 8.3.36 and 8.2.35. If you're still on PHP 8.1 or older, this is the time to upgrade.

And updating the package is not even enough. You have to restart PHP-FPM or Apache, and if you use Docker, rebuild your images, otherwise the old code keeps running.

If you use Laravel (like me), your Laravel version doesn't protect you here, because the loophole is in PHP, which is underneath Laravel. Node.js also had its own security release on the same day, so update that too if you run Node.

Have you run php -v on your servers yet?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#php #laravel #devops #cybersecurity #softwareengineering
```
**X**
```text
php2shell fix: update to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart php-fpm or apache (or rebuild your docker image). updating laravel alone doesn't fix it, the hole is in php
```

### SH7 · updating Laravel won't fix PHP2Shell
File `outputs/shorts/short07-laravel-php2shell_9x16.mp4` (built 2026-10-26, 9 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "updating Laravel won't fix PHP2Shell" (hers, 2026-10-26; ours was "Laravel devs: updating Laravel won't fix this") · from 2:39.1 to 2:47.6 (raw: the Laravel sentence only, so it no longer repeats SH6) · alternative to SH6 for Laravel audiences.
Hook (built cut, 9 s): "Everyone has been patching, and if you're using Laravel, for example, your Laravel version doesn't even protect you here, because the loophole is in PHP, which is underneath Laravel."

**YouTube Shorts**
```text
Title: Does updating Laravel fix PHP2Shell? No

Description: If you use Laravel, your Laravel version doesn't protect you from PHP2Shell, because the loophole is in PHP, which is underneath Laravel. You have to update PHP itself (8.5.12, 8.4.27, 8.3.36 or 8.2.35), and if you're on PHP 8.1 or older, upgrade. Then restart PHP-FPM or Apache, or rebuild your Docker images.

#Shorts #laravel #php #php2shell #webdev

Tags: laravel php2shell, laravel security, php2shell laravel, php version laravel, laravel security update, php2shell fix, php2shell, php security update, is php patched, php 8.4.27, php 8.3.36, php-fpm restart, laravel 12, php vulnerability 2026, laravel php version, laravel tips, php update version, how to fix php2shell, laravel developer, laravel php 8.4, laravel news, update php laravel, php2shell vulnerability, laravel php upgrade, php security patch, php news
```
**TikTok**
```text
Laravel devs: updating Laravel doesn't fix PHP2Shell. the hole is in PHP, underneath Laravel, so update PHP itself and restart it.
#laravel #php #php2shell #webdev #backend
```
**Instagram Reels**
```text
If you use Laravel, your Laravel version doesn't protect you from PHP2Shell. The loophole is in PHP, which is underneath Laravel. So update PHP itself to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart PHP-FPM or Apache, or rebuild your Docker images.

Full video on YouTube, link in bio
#laravel #php #php2shell #webdev #backend
```
**LinkedIn**
```text
If you use Laravel, updating Laravel won't protect you from PHP2Shell.

I write Laravel at work, so I wanted to say this plainly. The loophole is in PHP, which is underneath Laravel. So the fix is updating PHP itself to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, and then restarting PHP-FPM or Apache, or rebuilding your Docker images.

Which PHP version are your Laravel apps running on right now?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#laravel #php #webdevelopment #softwareengineering
```
**X**
```text
laravel devs: your laravel version doesn't protect you from php2shell. the hole is in php underneath it. update php and restart it
```

### SH8 · Railway got hacked
File `outputs/shorts/short08-railway-hack_9x16.mp4` (built 2026-10-26, 34 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Railway got hacked" (hers, 2026-10-26; ours was "The platform I deploy on got hacked (Railway)") · from 2:59.2 to 3:32.9 (raw)
Hook: "If you don't know what Railway is, Railway is a deployment platform where you can deploy your apps."

**YouTube Shorts**
```text
Title: Railway hack: what happened to developers' keys

Description: Railway is a deployment platform where developers deploy their apps. Railway said someone may have accessed its customers' encrypted environment variables, the place where apps keep passwords and API keys. It paused deployments for a while and asked users to revoke and change their API keys and cloud keys. Railway still hasn't said how the attackers first got in, but says the attack was aimed at getting to AI companies.

#Shorts #railway #cybersecurity #devops #apikeys

Tags: railway hack, railway security incident, railway environment variables, railway breach, railway data breach, railway app, rotate api keys, api key stolen, environment variables security, secrets management, railway deploy, cybersecurity news, developer security, env file security, railway app review, railway env vars, railway security breach, what to rotate after a breach, railway hacker news, railway incident report, railway preliminary report, change api keys
```
**TikTok**
```text
Railway, a platform a lot of developers deploy their apps on, said someone may have accessed customers' environment variables. deployments paused (this even affected me) and everyone was told to change their keys.
#railway #cybersecurity #devops #apikeys #developer
```
**Instagram Reels**
```text
Railway is a deployment platform where a lot of developers deploy their apps. This month it said someone may have accessed its customers' encrypted environment variables.

If you're a developer, you know that's where your passwords and API keys live. Railway paused deployments for a while (this even affected me) and asked users to revoke and change their API keys and cloud keys.

Full video on YouTube, link in bio
#railway #cybersecurity #devops #apikeys #developer
```
**LinkedIn**
```text
Railway, a deployment platform a lot of developers use, said someone may have accessed its customers' encrypted environment variables.

If you're a developer, you know how important it is to keep your environment variables safe. That's where your database password, your payment keys and your AI keys live.

Railway paused deployments for a while, and this even affected me. Then it asked users to revoke and change their API keys and cloud keys. Its preliminary report says at most 1.85% of workspaces had environment variables potentially exposed, but it still hasn't said how the attackers first got in.

Did you have to change any keys this week?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #devops #softwareengineering #cloud
```
**X**
```text
railway said someone may have accessed customers' encrypted environment variables. deployments paused (it even affected me) and users were told to change their api and cloud keys. still no word on how they first got in
```

### SH9 · Zeabur is shutting down after being hacked twice
File `outputs/shorts/short09-zeabur-shutting-down_9x16.mp4` (built 2026-10-26, 56 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Zeabur is shutting down after being hacked twice" (hers, 2026-10-26; ours was "Zeabur: hacked twice, now shutting down") · from 3:33.0 to 4:27.9 (raw)
Hook: "Now Zeabur, the company that is shutting down because of attacks, is a very interesting one."

**YouTube Shorts**
```text
Title: Why Zeabur is shutting down after two breaches

Description: Zeabur, a platform developers use to deploy apps, is shutting down completely. It was breached in August, and again on October 14 and 15 with leaked internal credentials. The second breach covered about 321,810 accounts and about 3.2 million environment variable records. The attackers got back in through an admin token that had no expiry date and hadn't been changed since January 2024, because it was left out when keys were changed after the first attack. Services pause in December.

#Shorts #zeabur #cybersecurity #devops #infosec

Tags: zeabur shutting down, zeabur breach, zeabur, zeabur hack, zeabur data breach, zeabur app, admin token expiry, api key expiry, key rotation, secrets management, hosting platform shutting down, cybersecurity news, data breach 2026, developer security, environment variables security, zeabur alternative, zeabur migration, rotate api keys, zeabur closing, zeabur n8n, platform shut down after hack, admin token, second data breach, leaked credentials, web security
```
**TikTok**
```text
a deployment platform called Zeabur is shutting down after being hacked twice in two months. the second time, attackers got in with an admin token that never expired and hadn't been changed since january 2024 😳
#zeabur #cybersecurity #devops #infosec #technews
```
**Instagram Reels**
```text
Zeabur, a platform developers use to deploy their apps, is shutting down completely after being hacked twice.

The first breach was in August. The second, on October 14 and 15, covered about 321,810 accounts and 3.2 million environment variable records. The way back in was an admin token with no expiry date that hadn't been changed since January 2024, and it was left out when they changed their keys after the first attack.

Full video on YouTube, link in bio
#zeabur #cybersecurity #devops #infosec #technews
```
**LinkedIn**
```text
Zeabur, a platform developers use to deploy their apps, is shutting down completely after being hacked twice in two months.

They were breached in August, and then again on October 14 and 15. The second breach covered about 321,810 accounts and about 3.2 million environment variable records.

How did the attackers get in the second time? According to Zeabur, an admin token had no expiry date and hadn't been changed since January 2024. After the first attack, when they changed their keys, that token wasn't included. That kind of opened the gates again.

Services pause on December 1 and everything shuts down by the end of December. Do the keys in your own systems have an expiry date?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #devops #cloud #softwareengineering
```
**X**
```text
zeabur is shutting down after two breaches in two months. the second came through an admin token with no expiry date, unchanged since january 2024, that was missed when they rotated keys after the first one
```

### SH10 · Hackers got into Zeabur with admin tokens from 2024
File `outputs/shorts/short10-zeabur-token_9x16.mp4` (built 2026-10-26, 28 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Hackers got into Zeabur with admin tokens from 2024" (hers, 2026-10-26; ours was "Hackers got back in with a token from 2024") · from 3:60.0 to 4:27.0 (raw)
Hook: "So how did the attackers get in the second time after they got in the first time?"

**YouTube Shorts**
```text
Title: Zeabur hack: admin tokens from 2024 let hackers back in

Description: Zeabur, a deployment platform, was hacked twice in two months and is now shutting down. The second time, the attackers used an admin token that had no expiry date and hadn't been changed since January 2024. After the first attack they changed their keys but left that token out, and that opened the gates again.

#Shorts #zeabur #cybersecurity #devops #apikeys

Tags: zeabur admin token, zeabur breach, zeabur shutting down, admin token expiry, api key expiry, key rotation, rotate api keys, token expiration best practices, secrets management, zeabur hack, api key security, devops security, cybersecurity news, how often to rotate api keys, should you rotate api keys, zeabur data breach, credential rotation, developer security, admin token, non expiring token, leaked credentials, token rotation, api token best practices
```
**TikTok**
```text
how did attackers get into Zeabur a second time? an admin token with no expiry date that hadn't been changed since january 2024. now the whole platform is shutting down.
#zeabur #cybersecurity #devops #apikeys #infosec
```
**Instagram Reels**
```text
How did attackers get into Zeabur, a deployment platform, a second time? An admin token with no expiry date that hadn't been changed since January 2024. When they changed their keys after the first attack, that token was left out. Now the whole platform is shutting down.

Full video on YouTube, link in bio
#zeabur #cybersecurity #devops #apikeys #infosec
```
**LinkedIn**
```text
Zeabur, a deployment platform, is shutting down after being hacked twice, and the second time came through one old admin token.

According to Zeabur, the token had no expiry date and hadn't been changed since January 2024. After the first attack, when they changed their keys, that particular token wasn't included. And that kind of opened the gates again.

If your service allows it, give your keys an expiry date. When did you last check the old tokens in your systems?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #devops #softwareengineering #security
```
**X**
```text
zeabur's second breach came through an admin token with no expiry date that hadn't been changed since january 2024. one forgotten token, and now the platform is closing
```

### SH11 · OpenCode was Hacked
File `outputs/shorts/short11-opencode-hack_9x16.mp4` (built 2026-10-26, 53 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "OpenCode was Hacked" (hers, 2026-10-26; ours was "People found out they were hacked from their AI bill") · from 4:27.9 to 5:20.6 (raw)
Hook: "The OpenCode one is also very, very interesting because people found out OpenCode had been hacked from their bills."

**YouTube Shorts**
```text
Title: OpenCode hacked: AI bills users never ran

Description: OpenCode is an open-source AI coding tool with an online platform called OpenCode Console, where people store their AI API keys. OpenCode said attackers broke into an older system and took those keys. People found out from alerts from OpenAI, Anthropic and Google, with charges in the hundreds of dollars and a few over a thousand, for AI usage they did not run. OpenCode calls it a distillation attack. The stolen keys have been blocked and refunds are going out.

#Shorts #opencode #ai #cybersecurity #apikeys

Tags: opencode hacked, opencode hack, opencode console breach, opencode console, stolen ai api keys, api key stolen, openai api key stolen, distillation attack, ai api key security, openai bill, anthropic api key, ai coding tool hacked, cybersecurity news, ai hacking news, opencode hacker news, gemini api key stolen, opencode console api key, unexpected openai charges, opencode, opencode ai, ai api bill, api key leaked, ai coding tools, tech news, web security
```
**TikTok**
```text
people found out OpenCode had been hacked from their AI bills 😭 attackers took AI API keys stored in OpenCode Console, and some users got charges over $1,000 for usage they never ran.
#opencode #ai #cybersecurity #apikeys #developer
```
**Instagram Reels**
```text
People found out OpenCode had been hacked from their bills.

OpenCode is an open-source AI coding tool, and people store their AI API keys in its online Console. Attackers broke into an older system and took those keys, and users started getting alerts from OpenAI, Anthropic and Google. Some charges were in the hundreds of dollars, and a few were over a thousand. Imagine getting alerts for things you didn't use.

The keys have been blocked and refunds are going out.

Full video on YouTube, link in bio
#opencode #ai #cybersecurity #apikeys #developer
```
**LinkedIn**
```text
People found out OpenCode had been hacked from their AI bills.

OpenCode is an open-source AI coding tool. It has an online platform called OpenCode Console where people store their AI API keys. OpenCode said attackers broke into an older system and took those keys.

So people started getting alerts from OpenAI, Anthropic and Google. Some charges were in the hundreds of dollars, and a few were over a thousand dollars, for AI usage they did not run. Imagine getting alerts for things you didn't use.

OpenCode calls it a distillation attack, which is when someone asks an AI model loads of questions and uses the answers to train their own model. So, in simple words, someone may have been building their own AI on other people's bills. The keys are blocked now and refunds are going out, which is good.

Do you have spending alerts on your AI accounts?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#ai #cybersecurity #softwareengineering #apikeys
```
**X**
```text
opencode users found out about the hack from their ai bills. some charges were over $1,000 for usage they never ran. if you don't have spending alerts on your ai accounts, this is your sign
```

### SH12 · Hackers are using stolen AI keys to train their own AI
File `outputs/shorts/short12-distillation-attack_9x16.mp4` (built 2026-10-26, 41 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Hackers are using stolen AI keys to train their own AI" (hers, 2026-10-26; ours was "Stolen AI keys used to train another AI?") · from 4:35.2 to 5:15.5 (raw)
Hook (built cut starts one sentence earlier so strangers know what OpenCode is): "OpenCode is an open source AI coding tool."

**YouTube Shorts**
```text
Title: Hackers using stolen AI keys to train their own AI (OpenCode)

Description: Attackers broke into an older OpenCode system and took AI API keys people had stored there, and users got AI charges for usage they never ran. OpenCode calls it a distillation attack: someone asks an AI model loads of questions and uses the answers to train their own model. So someone may have been building their own AI on other people's bills.

#Shorts #ai #opencode #cybersecurity #machinelearning

Tags: distillation attack, what is a distillation attack, model distillation, ai distillation, opencode hack, opencode hacked, stolen ai api keys, api key stolen, ai api key security, ai security, llm distillation, opencode console breach, ai hacking news, knowledge distillation, openai api key stolen, anthropic distillation, ai model theft, cybersecurity news, ai model distillation explained, stolen api keys, ai training data, api abuse, tech news, web security
```
**TikTok**
```text
someone may have been building their own AI on other people's bills 🫠 that's what a "distillation attack" is: ask an AI model loads of questions with stolen keys and train your own model on the answers.
#ai #opencode #cybersecurity #machinelearning #apikeys
```
**Instagram Reels**
```text
OpenCode said attackers took AI API keys from an older system, and users got charges for AI usage they never ran. OpenCode calls it a distillation attack: someone asks an AI model loads of questions and uses the answers to train their own model. So, in simple words, someone may have been building their own AI on other people's bills.

Full video on YouTube, link in bio
#ai #opencode #cybersecurity #machinelearning #apikeys
```
**LinkedIn**
```text
OpenCode, an open-source AI coding tool, said attackers took AI API keys that people had stored in its Console, and users got charges for AI usage they never ran.

OpenCode calls it a distillation attack. That is when someone asks an AI model loads of questions and just uses the answers to train their own model.

So in simple words, someone may have been building their own AI on other people's bills. It's also a good reason not to leave your keys in tools that don't need them.

Had you heard of distillation attacks before this?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#ai #machinelearning #cybersecurity #softwareengineering
```
**X**
```text
a "distillation attack" is when someone asks an ai model loads of questions and trains their own model on the answers. with stolen opencode keys, someone may have done it on other people's bills
```

### SH13 · Cybersecurity Attacks in October
File `outputs/shorts/short13-protect-api-keys_9x16.mp4` (built 2026-10-26, 37 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "Cybersecurity Attacks in October" (hers, 2026-10-26; ours was "3 hacks this month wanted your API keys") · from 5:20.6 to 5:57.2 (raw)
Hook: "When you put Railway, Zeabur and OpenCode's incidents side by side, you realise they are kind of the same pattern."

**YouTube Shorts**
```text
Title: Cybersecurity attacks in October: Railway, Zeabur, OpenCode

Description: Railway, Zeabur and OpenCode were three different incidents this month, but the attackers went straight for the same place, where developers keep their secret keys. Change any key you're not sure about. Give your keys an expiry date wherever the service allows it. Give each key only the access it needs, so a key that only reads one storage bucket only gets that bucket. Set spending limits and alerts on your AI and cloud accounts, and don't store keys in tools that don't need them.

#Shorts #apikeys #cybersecurity #devops #webdev

Tags: api key security, how to protect api keys, rotate api keys, api key stolen, secrets management best practices, secrets management, api key expiry, least privilege, environment variables security, railway hack, opencode hacked, zeabur breach, spending alerts aws, developer security, how often to rotate api keys, should you rotate api keys, env file security, api keys, env file, api key best practices, cloud security, spending limits, web security, tech news
```
**TikTok**
```text
Railway, Zeabur and OpenCode all got hit this month, and every time attackers went for the same thing: developers' secret keys. change keys you're unsure about, give them expiry dates and only the access they need, and set spending alerts 🔑
#apikeys #cybersecurity #devops #webdev #developer
```
**Instagram Reels**
```text
Railway, Zeabur and OpenCode were three different incidents this month, and they are kind of the same pattern. The attackers went straight for the place where developers keep their secret keys.

So change any key you're not sure about. Give your keys an expiry date wherever the service allows it. Give each key only the access it needs. Set spending limits and alerts on your AI and cloud accounts. And honestly, don't store keys in tools that don't need them.

Full video on YouTube, link in bio
#apikeys #cybersecurity #devops #webdev #developer
```
**LinkedIn**
```text
When you put the Railway, Zeabur and OpenCode incidents side by side, they are kind of the same pattern. In all three, the attackers went straight for the place where developers keep their secret keys.

So if you use any of these platforms, change any key you're not sure about.

Give your keys an expiry date wherever the service allows it. Give each key only the access it needs, so if a key only needs to read one storage bucket, it only gets that one bucket. Set spending limits and alerts on your AI and cloud accounts.

And honestly, don't store keys in tools that don't need them. Which of these does your team already do?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #devops #softwareengineering #cloud
```
**X**
```text
railway, zeabur and opencode: three incidents, same target, the place developers keep secret keys. change keys you're unsure about, give them expiry dates and only the access they need, and set spending alerts
```

### SH14 · eMudhra's security Incidence
File `outputs/shorts/short14-key-number-4_9x16.mp4` (built 2026-10-26, 53 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "eMudhra's security Incidence" (hers, 2026-10-26; ours was "A security key that was the number 4") · from 5:57.3 to 6:53.2 (raw) · add a small on-screen line at the end: "Chrome, Firefox, Apple and Microsoft have blocked these keys" (she doesn't say it; it is true and stops the fear)
Hook: "Now there's one more story from the October drama, and this one actually sounds so made up."

**YouTube Shorts**
```text
Title: eMudhra security incident: a key that was the number 4

Description: eMudhra is one of the companies your browser trusts to confirm that a website is who it says it is, the little padlock. It turned out that eight of its signing keys were so weak that one of them was literally the number 4, because a script went wrong when the keys were made in April 2025. With keys like that, someone could have faked a website and your browser would still have shown the padlock. Chrome, Firefox, Apple and Microsoft have since blocked these keys.

#Shorts #cybersecurity #https #infosec #technews

Tags: emudhra, emudhra certificate, emudhra news, weak private key, private key of 4, certificate authority compromised, ssl certificate explained, https padlock, browser padlock, certificate authority explained, emudhra security incident, chrome blocks certificates, cybersecurity news, emudhra share latest news, how https works, tls certificate, mozilla emudhra, ssl certificate, certificate authority, https explained, weak keys, browser security, web security, tech news
```
**TikTok**
```text
this sounds made up: a company your browser trusts for the little padlock had 8 signing keys so weak that one of them was literally the number 4 😭 browsers have blocked them since.
#cybersecurity #https #infosec #technews #tech
```
**Instagram Reels**
```text
This one sounds so made up.

eMudhra is one of the companies your browser trusts to confirm that a website is who it says it is. It's like that little padlock your browser depends on. Eight of its signing keys turned out to be so weak that one of them was literally the number 4, because a script went wrong when the keys were made in April 2025.

With keys like that, someone could have faked a website and your browser would still show the padlock. Chrome, Firefox, Apple and Microsoft have blocked them now.

Full video on YouTube, link in bio
#cybersecurity #https #infosec #technews #tech
```
**LinkedIn**
```text
eMudhra, one of the companies your browser trusts to confirm that a website is who it says it is, had eight signing keys so weak that one of them was literally the number 4.

That's how weak their keys were. Just number four. A script went wrong when the keys were made in April 2025, and it made a second set of weak keys.

With keys like that, someone could have faked a website and your browser would still have shown the padlock. Chrome and Firefox blocked them on October 17, and Apple and Microsoft followed.

To be honest, I don't think there is much the average user can do about things like this, other than keeping your stuff updated. Had you heard about this one?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #infosec #webdevelopment #tech
```
**X**
```text
a certificate authority your browser trusted had 8 signing keys so weak that one of them was literally the number 4. chrome and firefox blocked them on oct 17, apple and microsoft after
```

### SH15 · One hacker + AI agents broke into 100+ sites
File `outputs/shorts/short15-ai-agents-hacker_9x16.mp4` (built 2026-10-26, 28 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "One hacker + AI agents broke into 100+ sites" · from 7:00.9 to 7:27.9 (raw)
Hook: "Reuters reported that one attacker used AI agents to break into more than a hundred company websites."

**YouTube Shorts**
```text
Title: One hacker, AI agents and 100+ company websites

Description: Reuters reported that one attacker used AI agents to break into more than a hundred company websites, including sites belonging to SharkNinja and Cummins. The attacker gave the agents short instructions and let them run on their own for hours. A researcher estimated the cost at about $50 in AI tokens per successful hack.

#Shorts #ai #aiagents #cybersecurity #technews

Tags: ai agents hacking, ai hacking news, ai hacker, hacker used ai, ai cyberattack 2026, ai agents cyberattack, ai hacking october, ai hacker 100 websites, cost of ai hacking, norforge, cairn ai agent, reuters ai hacker, ai security, cybersecurity news, ai hacking incident, ai hacker agent, ai hacking other companies, sharkninja hack, ai agents, claude code hacker, ai cyber attack, autonomous ai agents, web shell, web security, tech news
```
**TikTok**
```text
one hacker used AI agents to break into 100+ company websites. short instructions, then the agents ran on their own for hours. the estimated cost was about $50 in AI tokens per successful hack 🤯
#ai #aiagents #cybersecurity #technews #hacking
```
**Instagram Reels**
```text
Reuters reported that one attacker used AI agents to break into more than a hundred company websites. The attacker gave the agents short instructions and just let them run on their own for hours.

A researcher estimated the cost at about $50 in AI tokens per successful hack. It's so crazy that we've gotten to a point where it costs $50 to hack into a company.

Full video on YouTube, link in bio
#ai #aiagents #cybersecurity #technews #hacking
```
**LinkedIn**
```text
Reuters reported that one attacker used AI agents to break into more than a hundred company websites, including sites belonging to SharkNinja and Cummins.

What the attacker did was give the agents short instructions and let them run on their own for hours. The researcher who found it estimated the cost at about $50 in AI tokens per successful hack.

It's so crazy that we've gotten to the point where it costs $50 to hack into a company. What do you think this means for small teams that can't patch fast?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#ai #cybersecurity #aiagents #technews
```
**X**
```text
one hacker gave ai agents short instructions and let them run for hours. more than 100 company websites later, the estimated cost was about $50 in tokens per successful hack
```

### SH16 · The role of AI in Cyberattacks
File `outputs/shorts/short16-ai-both-sides_9x16.mp4` (built 2026-10-26, 20 s; Downloads: `~/Downloads/october-attacks/shorts/`) · label on screen "The role of AI in Cyberattacks" (hers, 2026-10-26; ours was "AI found the PHP bug, and AI helps hackers too") · from 7:32.7 to 7:52.4 (raw)
Hook: "What I find even interesting is how AI is literally on both sides."

**YouTube Shorts**
```text
Title: The role of AI in cyberattacks: PHP2Shell and AI agents

Description: AI is on both sides now. The PHP2Shell security holes in PHP were found with help from AI, and AI agents are also being used by attackers to break into companies. The same tools that are helping defenders find bugs faster are also helping attackers break in faster.

#Shorts #ai #cybersecurity #aiagents #infosec

Tags: ai in cybersecurity, ai hacking news, ai agents hacking, ai found php2shell, ai cyberattack 2026, ai security, ai vs hackers, ai bug hunting, php2shell, ai hacker, cybersecurity news, future of cybersecurity, ai and hacking, ai hacking october, php2shell ai, ai finds vulnerabilities, ai hacking incident, ai agents security, ai agents, ai cybersecurity, ai hacking 2026, ai vulnerability research, web security, tech news, ai news
```
**TikTok**
```text
AI helped find the biggest PHP security holes this month, and AI agents also helped one hacker break into 100+ companies. the same tools are speeding up both sides.
#ai #cybersecurity #aiagents #infosec #tech
```
**Instagram Reels**
```text
What I find really interesting is how AI is on both sides now. The PHP2Shell security holes were found with help from AI, and AI is also being used by attackers. The same tools that are helping defenders find bugs faster are helping attackers break in faster.

Full video on YouTube, link in bio
#ai #cybersecurity #aiagents #infosec #tech
```
**LinkedIn**
```text
What I find really interesting about this month's attacks is how AI is on both sides.

The PHP2Shell security holes in PHP were found with help from AI. And in the same month, Reuters reported that one hacker used AI agents to break into more than a hundred company websites.

So the same tools that are helping defenders find bugs faster are also helping attackers break in faster. It's almost like a back and forth. Which side do you think it helps more right now?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#ai #cybersecurity #softwareengineering #infosec
```
**X**
```text
ai helped find php2shell. ai agents helped one hacker break into 100+ companies. the same tools are making both sides faster
```

## 4. Teaser (LinkedIn and X)
**Built 2026-10-26**: `outputs/teaser/teaser-october-attacks_16x9.mp4`, `_1x1.mp4`, `_4x5.mp4` (about 89 s; also in `~/Downloads/october-attacks/teaser/`; studio `/moment/october-attacks/teaser/`). 13 of the lines below (row 6, the government websites, was left out to keep it under 100 s; row 15 plays last, after the title card), three title cards in the film's October look (YOUR SECRET KEYS, THE NUMBER 4, OCTOBER'S ATTACKS), the music drops for "the same tools that are helping the defenders…", end card with the title, the question and @WithGbemi. No "new video" tag, no riser. Your "FULL VIDEO ON YOUTUBE" clip ends it in every size (added 2026-10-26). Frame 1 topic in big type: **"PHP2Shell and October's hacks"**. Bites in play order (raw times, from the word timings):

| # | Act | Raw time | Her line |
|---|---|---|---|
| 1 | hook | 0:02.9-0:09.0 | "October is supposed to be cybersecurity awareness month and it has ironically been one attack after the other." |
| 2 | PHP tension | 0:54.4-0:57.4 | "And two critical loopholes have been found in PHP this month." |
| 3 | PHP tension | 1:02.4-1:11.4 | "Getting a shell means that the attack is so bad that an attacker can type commands on your server as if they were on their own personal computer." |
| 4 | PHP tension | 1:48.2-1:54.6 | "The thing about PHP2Shell and why it's really so crazy is that it happens before your code even runs." |
| 5 | PHP tension | 2:06.1-2:09.1 | "You can have the best login in the world and it wouldn't matter." |
| 6 | PHP tension | 2:18.3-2:24.1 | "And there are government websites in Europe that literally went off while they patched…" |
| 7 | title card | (gap) | "YOUR SECRET KEYS" |
| 8 | keys | 0:15.0-0:23.0 | "Railway… has had to literally tell their users to change their secret keys." |
| 9 | keys | 0:23.0-0:30.5 | "There is also another platform, Zeabur, that is literally shutting down after being hacked twice…" |
| 10 | keys | 4:04.3-4:10.9 | "Their admin token had no expiry date. So they had not changed this token since January 2024." |
| 11 | keys | 4:53.6-5:01.8 | "A few of them were even over a thousand dollars for AI usage that users did not run. Like imagine getting alerts for things you didn't use." |
| 12 | odd one (payoff) | 6:22.3-6:28.3 | "The keys were so weak that one of them literally was the number four. Just number four." |
| 13 | AI (payoff) | 7:23.0-7:28.0 | "It's so crazy that we've gotten to the point where it's costing $50 to hack into a company." |
| 14 | AI (payoff) | 7:43.6-7:49.8 | "So the same tools that are helping the defenders find the bugs faster are also helping the attackers break in faster." |
| 15 | question | 5:26.3-5:32.3 | "The attackers went straight for the place where developers keep their secret keys." then end card question: **"Is your PHP patched, and are your keys safe?"** |

About 88 s of bites plus the end card. Captions on every line (fix the whisper names: Zeabur, PHP2Shell, eMudhra).

**LinkedIn (teaser)**
```text
October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other.

PHP, which runs most of the web, had two critical security holes. Railway told its users to change their secret keys. Zeabur is shutting down after being hacked twice. OpenCode users got AI bills they never ran. And one hacker used AI agents to break into more than a hundred companies.

I went through each one in plain words, and what you can actually do today. Which of these affected you?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #php #softwareengineering #ai
```
**X (teaser)**
```text
october was supposed to be cybersecurity awareness month. instead we got php2shell, railway, zeabur shutting down, opencode bills and an ai-agent hacker. here's all of it in plain words, and what to do today

full video: https://youtu.be/E5Hj7IHSN2Y
```

## 5. Carousels
**Built 2026-10-26**: `outputs/carousels/instagram/` (10 slides) and `outputs/carousels/linkedin/` (11 slides + `carousel.pdf`; slide 11 is the end slide with @WithGbemi). The slide text as built lives in `design/carousels/<deck>/content.json` (small wording changes so no line ends on one word). Captions below are unchanged.

(original plan) Each slide stands alone. One idea per slide, big type, real screenshots from `assets/sources/` where a slide names a story (with a small source credit).

### 5a. Instagram (1080 × 1350, 10 slides)
Slide 1 options (pick one): **"October 2026 was a rough month for developer security"** (recommended) · "PHP, Railway, Zeabur and OpenCode all made security news this month" · "What happened in developer security this October, in plain words"
| Slide | Text |
|---|---|
| 1 | October 2026 was a rough month for developer security. Here is what happened, in plain words. |
| 2 | PHP had two critical security holes, called PHP2Shell. PHP runs nearly three quarters of the websites in the world. |
| 3 | PHP2Shell happens while PHP reads the request, before your code runs. So your login can't stop it. |
| 4 | To fix it, update PHP to 8.5.12, 8.4.27, 8.3.36 or 8.2.35. Then restart PHP-FPM or Apache. |
| 5 | Railway, a deployment platform, told its users to change their secret keys after someone got into their environment variables. |
| 6 | Zeabur is shutting down after two breaches. The second one came through an admin token that never expired. |
| 7 | OpenCode users found out about a hack from their AI bills. Some were over $1,000 for usage they never ran. |
| 8 | Change keys you're not sure about. Give them expiry dates, only the access they need, and spending alerts. |
| 9 | AI helped find PHP2Shell. AI agents also helped one hacker break into over 100 company websites. |
| 10 | Did you have to patch or change keys this month? Full video on YouTube, @WithGbemi |

**Caption**
```text
October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other. I put the main stories in one place, in plain words, with what you can actually do today.

If you only do one thing, check your PHP version 🫠

Full video on YouTube, link in bio

#cybersecurity #php #webdev #developer #technews #apikeys
```

### 5b. LinkedIn (PDF, 1080 × 1350, 10 slides)
Document title: **October 2026 developer security news, in plain words**
Slide 1 options: **"The security news every developer should know from October 2026"** (recommended) · "PHP2Shell, Railway, Zeabur, OpenCode: what happened and what to do"
| Slide | Text |
|---|---|
| 1 | The security news every developer should know from October 2026 |
| 2 | PHP2Shell: two critical security holes in PHP, rated 9.2 out of 10. PHP runs nearly three quarters of websites. |
| 3 | It happens while PHP reads the request, before your code runs, so authentication and middleware can't block it. |
| 4 | The fix is PHP 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then a restart of PHP-FPM or Apache, and rebuilt Docker images. Updating Laravel alone doesn't fix it. |
| 5 | Railway said someone may have accessed customers' encrypted environment variables. Users were told to rotate their keys. |
| 6 | Zeabur is shutting down after two breaches. The second used an admin token with no expiry date, unchanged since January 2024. |
| 7 | Attackers took AI keys stored in OpenCode Console. Users saw charges in the hundreds, a few over $1,000. |
| 8 | All three went for the same place: where developers keep their secret keys. Expiry dates, least access and spending alerts limit the damage. |
| 9 | eMudhra, a certificate authority, had signing keys so weak that one was the number 4. Browsers have blocked them. |
| 10 | AI is on both sides: it helped find PHP2Shell, and one hacker used AI agents on 100+ companies. Full video on YouTube, @WithGbemi |

**Post text**
```text
October is supposed to be Cybersecurity Awareness Month, and for developers it has ironically been one attack after the other.

I put the main stories into ten slides: PHP2Shell, Railway, Zeabur, OpenCode, the eMudhra key that was literally the number 4, and the hacker who used AI agents. Each slide has what happened and, where there is one, what you can do about it.

The part I keep thinking about is that three of these went straight for the same thing, the place where developers keep their secret keys. When did you last check yours?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #softwareengineering #php #devops #ai
```

## 6. Long-form posts

### 6a. LinkedIn post (main video, upload day)
```text
PHP had two critical security holes this month, and it was only one of the attacks developers had to deal with in October.

October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other. Railway told its users to change their secret keys. Zeabur is shutting down after being hacked twice. OpenCode users found out about a hack from their AI bills. And Reuters reported that one hacker used AI agents to break into more than a hundred companies.

I write Laravel at work, so the PHP one is the one I think is the biggest. They're calling it PHP2Shell, and what makes it so bad is that it happens while PHP is reading the request, before your code even runs. Your login, your middleware and your authentication never get a chance. Updating Laravel doesn't help either, because the loophole is in PHP, underneath Laravel. You have to update PHP itself (8.5.12, 8.4.27, 8.3.36 or 8.2.35) and restart it.

Railway, Zeabur and OpenCode are kind of the same pattern. In all three, the attackers went straight for the place where developers keep their secret keys. Railway paused deployments for a while, and that even affected me.

What I find really interesting is how AI is on both sides. The PHP2Shell bugs were found with help from AI, and the hacker who broke into over a hundred company websites was running AI agents, at an estimated $50 in AI tokens per successful hack. The same tools that are helping defenders find bugs faster are helping attackers break in faster.

Did you have to patch anything or change any keys this week?

Full Video on YouTube - https://youtu.be/E5Hj7IHSN2Y

#cybersecurity #php #laravel #softwareengineering #ai
```

### 6b. X thread
```text
1/ october is supposed to be cybersecurity awareness month, and it has been one attack after the other. here's what happened to developers, in plain words 🧵

2/ php2shell: two critical security holes in php, rated 9.2/10. php runs nearly 3/4 of the web. it happens while php reads the request, before your code runs, so your login can't stop it

3/ the fix: php 8.5.12, 8.4.27, 8.3.36 or 8.2.35. then restart php-fpm or apache, or rebuild your docker image. updating laravel alone does nothing here, the hole is in php

4/ railway told users to rotate their keys after someone got into encrypted environment variables. they paused deployments (it even affected me). they still haven't said how the attacker first got in

5/ zeabur is shutting down after two breaches in two months. the second came through an admin token with no expiry date, unchanged since january 2024

6/ opencode users found out from their ai bills. keys stored in opencode console were stolen, and some people saw charges over $1,000 for usage they never ran

7/ and one hacker used ai agents on 100+ company websites, at an estimated $50 in tokens per successful hack. ai also helped find php2shell. same tools, both sides

8/ so: update php and restart it, change keys you're unsure about, give keys expiry dates and only the access they need, and turn on spending alerts

full video: https://youtu.be/E5Hj7IHSN2Y
```

### 6c. YouTube community post (upload day)
```text
October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other 🫠

I made a video on PHP2Shell (the two critical holes in PHP), Railway, Zeabur shutting down, the OpenCode AI bills, a certificate key that was literally the number 4, and the hacker who used AI agents on 100+ companies.

If you run PHP, the fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and remember to restart it after updating. Which story surprised you the most?
```

### 6d. More X posts (from your kit, cleaned up)
**The image post** (a clean card; build it in the carousel editor or Canva)
```text
october 2026 developer security checklist 👇
```
Card text: "OCTOBER 2026: WHAT TO DO TODAY" / "PHP2Shell: update to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart PHP or rebuild images" / "Railway users: rotate every environment variable and API key" / "OpenCode Console users: replace your AI keys with each provider" / "Everyone: give keys expiry dates and only the access they need" / "Everyone: turn on spending alerts for AI and cloud accounts"
Reply: `I went through every one of these stories here: https://youtu.be/E5Hj7IHSN2Y`

**The tips list**
```text
things worth doing this week after october's security mess

1. run php -v and check you're on a fixed version
2. restart php-fpm or apache after updating
3. rotate any api key you're not sure about
4. give keys an expiry date if the service allows it
5. turn on spending alerts for your ai and cloud accounts
```
Reply: `full breakdown here: https://youtu.be/E5Hj7IHSN2Y`

**The "can you guess" tweet**
```text
a deployment platform is shutting down after its second breach in two months. can you guess what the attacker used to get in the second time?
```
Your reply a few hours later: `an admin token with no expiry date that hadn't been changed since january 2024. it was missed when they changed keys after the first breach`

**Launch tweet**
```text
made a video on everything that happened in developer security this october. php2shell, railway, zeabur, opencode, a certificate key that was the number 4, and the hacker who used ai agents on 100+ companies
```
Reply: `https://youtu.be/E5Hj7IHSN2Y`

**Standalone posts**
```text
if you run php, check your version today. the fixed versions for php2shell are 8.5.12, 8.4.27, 8.3.36 and 8.2.35
```
```text
updating php isn't enough on its own. restart php-fpm or apache, or rebuild your docker image, or the old code keeps running
```
```text
railway, zeabur and opencode were all breaches of the same thing, the place developers keep their secret keys
```
```text
what did you have to patch or rotate this week?
```

### 6e. Your comments and ready replies
**Your first comments**
- YouTube: the pinned comment in 1e.
- Instagram: `if you only do one thing today, check your PHP version.`
- TikTok: `the admin token that never expired 😭`
- LinkedIn: `One habit worth picking up from this month: give every key an expiry date where the service allows it. Zeabur's second breach came through an admin token that hadn't been changed since January 2024.`
- X (reply to your own tweet): `if you're on php 8.1 or older, there's no official release for you. some vendors have backported fixes, but this is your sign to upgrade`

**Ready replies**
| They say | You reply |
|---|---|
| "I use Laravel, am I affected?" | `yes, if the PHP on your server is an affected version. the bug is in PHP itself, so check php -v on the actual server and update PHP` |
| "I updated but nothing changed." | `did you restart php-fpm or apache? if you use docker, rebuild the image. otherwise the old code keeps running` |
| "I'm on shared hosting, what do I do?" | `check with your host. most hosts are patching their servers, but ask them directly which PHP version you're on` |
| "How did Railway get hacked?" | `their preliminary report says the attacker got into their build systems and then CI credentials, but they still haven't said how they first got in. a final report is coming` |
| "Was anyone actually hacked through PHP2Shell?" | `lots of attempts have been reported (Amazon saw one 4 days before the announcement, Cloudflare said millions), but as far as I know no big confirmed break-in has been made public yet. that's why patching now matters` |
| "Is AI making hacking worse?" | `it's making everything faster, on both sides. the same month an attacker used AI agents on 100+ sites, AI helped researchers find PHP2Shell` |
| "Do I need to rotate keys if I wasn't affected?" | `if Railway or OpenCode told you that you weren't affected, you're probably fine. but rotating keys you're unsure about is always a good habit` |
| "Is the eMudhra thing still dangerous?" | `browsers blocked those keys (Chrome and Firefox on October 17, Apple and Microsoft soon after), so keep your browser updated and you're covered` |

**If Railway's final report lands** (add to the description and pin as a reply): `Update: Railway's final report says [how they got in, one line]. Link: https://youtu.be/E5Hj7IHSN2Y`

### 6f. Essay for Substack / Medium (your kit's essay, updated and in your voice)
Title: **October Was Supposed to Be Cybersecurity Awareness Month**
Subtitle: PHP2Shell, Railway, Zeabur, OpenCode and the hacker with AI agents, and what each one means for developers.
SEO title: PHP2Shell, Railway and the October 2026 Cyberattacks Explained
SEO description: What happened with PHP2Shell, the Railway and Zeabur breaches, stolen OpenCode API keys and AI-run attacks in October 2026, and what developers should do now.
Medium tags: Cybersecurity, PHP, DevOps, Software Engineering, Artificial Intelligence
```text
A lot of things have been happening on the internet this month. October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other.

I believe the PHP one is the biggest. PHP runs nearly three quarters of the websites in the world (WordPress runs on it, Laravel runs on it, and I write Laravel at work), and this month two critical security holes were found in it. They're calling it PHP2Shell, tracked as CVE-2026-109618 and CVE-2026-109619, and PHP rated them 9.2 out of 10. The "shell" part of the name is the important part. Getting a shell means an attacker can type commands on your server as if they were on their own computer.

There are two bugs. The first is about memory: if PHP runs out of memory at a very specific moment while it's reading a request, it leaves half-finished data behind, and its clean-up code treats that broken data like it's real. The second is about leftover data on PHP workers from earlier requests that should have been thrown away. What makes them so bad is when they happen. PHP reads the incoming request before any of your code runs, and the loophole is in that reading part. So your login, your middleware and your authentication never get a chance to stop it.

People have already tried to use it. Amazon said its honeypot network (trap servers set up to catch attackers) saw an attempt on October 17, four days before the flaws were announced. Details leaked early, so PHP brought its release forward to October 21, and some government websites in Europe went offline while they patched.

So if you run PHP anywhere, update it. The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and if you're still on 8.1 or older, this is the time to upgrade. Updating the package isn't enough on its own. Restart PHP-FPM or Apache, and rebuild your Docker images, or the old code keeps running. If you use Laravel, your Laravel version doesn't protect you here, because the loophole is in PHP, underneath Laravel. Node.js also had its own security release on the same day, so update that too.

While everyone was busy patching PHP, Railway happened. Railway is a deployment platform where a lot of us deploy our apps, and it said someone may have accessed its customers' encrypted environment variables, and decrypted some of them. It paused deployments for a while (this even affected me) and asked users to revoke and change their API keys and cloud keys. Its preliminary report says at most 1.85% of workspaces had environment variables potentially exposed, and that the attacker moved through its build systems to CI credentials. It still hasn't said how the attacker first got in.

Zeabur, another platform developers use to deploy apps, is shutting down completely. It was breached in August, and again on October 14 and 15. According to BleepingComputer, the second breach covered about 321,810 accounts and about 3.2 million environment variable records, and it came through an admin token that had no expiry date and hadn't been changed since January 2024. After the first attack, when they changed their keys, that token was left out, and that opened the gates again. Services pause on December 1 and everything shuts down by the end of December.

OpenCode, an open-source AI coding tool, has an online platform called OpenCode Console where people store their AI API keys. Attackers broke into an older system and took those keys, and people found out from their bills: alerts from OpenAI, Anthropic and Google, with charges in the hundreds of dollars and a few over a thousand, for AI usage they did not run. OpenCode calls it a distillation attack, which is when someone asks an AI model loads of questions and uses the answers to train their own model. So, in simple words, someone may have been building their own AI on other people's bills. The keys have been blocked and refunds are going out.

When you put Railway, Zeabur and OpenCode side by side, they are kind of the same pattern. The attackers went straight for the place where developers keep their secret keys. So change any key you're not sure about. Give your keys an expiry date wherever the service allows it, and give each key only the access it needs. Set spending limits and alerts on your AI and cloud accounts. And honestly, don't store keys in tools that don't need them.

There was one more story this month, and it sounds so made up. eMudhra is one of the companies your browser trusts to confirm that a website is who it says it is, the little padlock. Eight of its signing keys turned out to be so weak that one of them was literally the number 4, because a script went wrong when the keys were made in April 2025. With keys like that, someone could have faked a website and your browser would still have shown the padlock. Chrome and Firefox blocked them on October 17, and Apple and Microsoft followed. I don't think there is much the average person can do about something like this, other than keeping your stuff updated.

And in the middle of all of this is AI. Reuters reported that one attacker used AI agents to break into more than a hundred company websites, including sites belonging to SharkNinja and Cummins. The attacker gave the agents short instructions and let them run on their own for hours, and the researcher who found it estimated the cost at about $50 in AI tokens per successful hack. It's so crazy that we've gotten to the point where it costs $50 to hack into a company. And the PHP2Shell holes themselves were found by a researcher with help from an AI model. So the same tools that are helping defenders find bugs faster are also helping attackers break in faster.

I have people working in companies that have literally been stuck dealing with attacks this month. It's been crazy. If you do three things this week, update PHP and restart it, change any key you're unsure about, and turn on spending alerts.

Full video on YouTube - https://youtu.be/E5Hj7IHSN2Y

Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!
```

## 7. Research and sources
Research done 2026-10-26 (00:30-01:15 CET).

### 7a. What is happening with the topic now
- **PHP2Shell is still the main story.** PHP shipped 8.5.12, 8.4.27, 8.3.36 and 8.2.35 on October 21 after details leaked on October 20 (a day early). Rated 9.2 (CVSS v4.0; a leaked post said 10, that number is the leak's, not PHP's). Google Cloud says 5.4 through 8.5.11 are affected; watchTowr says even PHP 5. Amazon's MadPot honeypots saw an attempt on October 17. Cloudflare's CEO spoke of millions of attempts; CISA said it was not aware of exploitation and had not added it to its known-exploited list (as of about October 21-22). On October 25, CYFIRMA reported a suspected North Korea-linked campaign scanning unpatched hosts, Palo Alto said PAN-OS is affected with no fix yet, and Searchlight Cyber released a free scanner. **No big confirmed break-in through PHP2Shell has been made public that I could find.** Public conversation: "is PHP patched / fixed / still down", "is PHP dead" jokes, and that AI (a Calif researcher using an OpenAI model) found it.
- **Government sites offline**: agencies, universities and media in the Netherlands, Finland and Austria took sites down as a precaution; UK councils (Edinburgh, Oxford) and the Met Police too. None reported a breach.
- **Railway**: preliminary report published October 22. Attacker inside from October 20 13:58 UTC to October 22 03:32 UTC; "privilege escalation in our build infrastructure", then CI credentials, then a subset of encrypted environment variables decrypted; at most 1.85% of workspaces potentially exposed; source code access not ruled out; entry point not disclosed; a final forensic report is promised, no date. TechCrunch: Railway said the attack aimed at "compromising AI inference providers".
- **Zeabur**: shutting down (renewals off and shared-cluster services paused December 1, everything closed by December 31). Preliminary report: a shared-cluster admin token created January 2024 that never expired, plus internal AWS keys, both stored in plain text in a private config repository, probably exposed in August and never rotated.
- **OpenCode**: 1.4% of Console users; a legacy system being retired; OpenAI, Anthropic and Google keys stored in workspaces; the CLI and open-source app not affected. Losses are user claims ($400, about $1,700); OpenAI refunded, Anthropic and Google blocked keys. Some people doubt the "distillation" explanation.
- **eMudhra**: eight intermediate certificates, P-384 keys made in April 2025 with values under 256 (one was 4). Chrome and Firefox blocked them on October 17, Apple on October 19 and Microsoft on October 20 (TNW; your kit said Apple October 22 from BleepingComputer: sources differ, so we say "Apple and Microsoft followed"). eMudhra says only one was used in production and none issued end-user certificates; its shares fell 20% on October 21; Mozilla is moving to distrust one root.
- **AI-agent hacker**: Reuters, October 19, from NorForge's Snorre Fagerland: 100+ sites broken into out of 1,200+ tried, using the open-source agent platform Cairn; instructions under 100 Chinese characters; about $50 in tokens per successful hack (his estimate; about $5 per task on average). Deere, SharkNinja and Cummins named (Cummins says it was a vendor-run site).
- **Node.js**: October 21 release, 10 fixes (4 high), fixed in 22.23.4, 24.22.1 and 26.12.1.

### 7b. What people search (keywords with evidence)
Autocomplete pulled 2026-10-26 (YouTube = `ds=yt`, Google = empty; US English). Suggestions lag new words, so "php2shell" alone returned nothing, but with a trailing space it did.
| Phrase | Where it showed | Use |
|---|---|---|
| php2shell explained, php2shell vulnerability | YouTube + Google | main keyword, titles 1-2, tags |
| php2shell fireship, php2shell tryhackme, php2shell wiz, php2shell ai, php2shell cves | YouTube / Google | shows people look for explainers and the AI angle |
| is php patched, is php fixed, is php still down | Google ("is php …") | title 5, SH6 tags |
| php issue explained, php issue today | YouTube + Google ("php is…") | tags |
| php vulnerability 2026, php vulnerability 2026 news | YouTube + Google | title 4, tags |
| php security alert, php security issue, php security breach, php security flaw | Google / YouTube | tags |
| cyber attack php | Google ("cyber attack …") | tags |
| railway environment variables, railway env vars | YouTube + Google | SH8 tags |
| railway hacker news, railway hacker | Google / YouTube (mixed with Indian Railways noise) | weak; "railway hack" is ambiguous, so never lead a title with it alone |
| opencode hacks, opencode hacker news | YouTube + Google | SH11 tags |
| zeabur, zeabur app (no "shut down" suggestion yet) | YouTube + Google | Zeabur is a small, mostly Taiwanese search; keep it secondary |
| emudhra (+ digital signature, share price) | YouTube + Google | India-heavy; SH14 tags |
| ai hacking news, ai hacking october, ai hacking incident, ai hacker agent | YouTube + Google | title 9, SH15 tags |
| cybersecurity awareness month 2026 | Google | title 8 |
| api key stolen, openai api key stolen, gemini api key stolen | Google | SH11, SH13 tags |
| rotate api keys, should you rotate api keys, how often to rotate api keys | Google | SH13 tags |
TikTok and Instagram search terms: not visible from here (no search data without logging in). Hashtags chosen from what the topic videos use (#php2shell, #cybersecurity, #php, #laravel, #apikeys).

### 7c. Outlier videos (last weeks; ratio = views ÷ the median of the channel's last 25 uploads, measured 2026-10-26 with yt-dlp)
| Views | Channel (subs) | Ratio | Title | Link |
|---|---|---|---|---|
| 41,744 | Refreshing AI Latest (1.2K) | 506x | PHP2Shell - The PHP Flaw That Took Government Websites Offline, Explained | https://youtu.be/v5NjeVJiF7Q |
| 12,987 | The Progress Archive (204) | 361x | PHP Vulnerability 2026: The 2-Year-Old Bug an AI Found That Took Government Sites Offline | https://youtu.be/up9B9_FcOXA |
| 7,395 | Under the Weights (35) | 284x | The PHP Bug That Shook 70% of the Internet | https://youtu.be/zUPA8kyo0Fo |
| 5,582 | Alfian Busyro (36) | 65x | PHP2Shell, Node2Shell, HTTP2Shell: The Internet Had a Week | https://youtu.be/ZPIiXWgCs2g |
| 20,547 | Cristi Vlad (35.8K) | 43x | PHP2Shell Explained | https://youtu.be/w1d8QSqCSH0 |
| 37,918 | NextWork (72.5K) | 38x | PHP2Shell Explained (2026) (also tested as "Why Governments Pulled Their Own Websites Offline (PHP2Shell)") | https://youtu.be/dl6OtgMgBJY |
| 190,652 | Code Bear (55.2K) | 36x | OpenCode Got Hacked BADLY ( Explained! ) | https://youtu.be/oHVrI4Sfri8 |
| 110,389 | General Musings with Kevin Powell (12.7K) | 28x | This PHP vulnerability is a big deal | https://youtu.be/cBD1AgkM1VQ |
| 31,645 | WLTechBlog (6.9K) | 19x | MASSIVE PHP Security Vulnerability - Your Website Is Not Safe (Yet) | https://youtu.be/cmjSbBCme7M |
| 14,850 | Richard Echols (1.7K) | 16x | OpenCode Got Hacked. Anthropic and OpenAI Refused to Help. | https://youtu.be/rfyWMTVSb-4 |
| 13,044 | SimplyExplain (1.5K) | 15x | PHP2Shell Explained: The PHP Bug That Put 70% of Websites at Risk | https://youtu.be/f-Vmxz3Zwro |
| 1,515,772 | Low Level (1.19M) | 4.7x | php situation is insane | https://youtu.be/QRABrn606LE |
| 8,634 | Eric Roby (39.3K) | 3.9x | Software Developers Have a BIG Security Problem Right Now (Railway) | https://youtu.be/Cmbz3BinijU |
| 194,388 | LiveOverflow (948K) | 3.4x | The race to the first exploit // php2shell | https://youtu.be/7CiZmq2llDg |
| 20,038 | Cloud Codes (43.2K) | 2.9x | 4 Security Failures in One Week. Which One Hits You? | https://youtu.be/yZuOxQ_hKOI |
| 203,308 | Better Stack (242K) | 2.8x | A PHP Bug Just Took Websites Offline Worldwide | https://youtu.be/Gxi_n-PtQBo |
| *Below baseline (roundups)* | | | | |
| 49,145 | Traversy Media (2.42M) | 0.7x | A Bad Week for the Web: What's Confirmed and What to Do | https://youtu.be/RE2c_eH0Sq4 |
| 50,324 | David Ondrej (421K) | 0.6x | Everything Is Getting Hacked (it's over) | https://youtu.be/wuv61uEq7uY |
| 14,241 | Ras Mic (104K) | 0.5x | Why is everything getting hacked | https://youtu.be/U09tv18rSn8 |

**What the winners share.** Titles: the exact name "PHP2Shell" (often "PHP2Shell Explained") in the first 20 characters, plus one concrete stake ("took government websites offline", "70% of websites"), 30-90 characters. Small channels won with plain "Explained" titles; vague roundups ("everything is getting hacked") lost even on big channels, and the only roundup above 2x put a number on it ("4 Security Failures in One Week"). Thumbnails (contact sheet looked at): dark ground, the topic name huge (PHP2SHELL, PHP RCE, OPENCODE HACKED), the PHP elephant oval or a terminal prompt `$ _`, one red or yellow accent, 2-4 words, about half with a face (serious, not shocked). Lessons for her: lead with PHP2Shell, keep the roundup in the second half of the title, give one concrete stake, and keep the face calm.

### 7d. What worked with strangers
Two fresh cold reviewers (general-purpose agents, no context) saw only the titles, thumbnail concepts, short labels, Shorts titles and TikTok captions. Scores are "would I click", 1-10.
| Item | Round 1 | What changed | Round 2 |
|---|---|---|---|
| Title 1 + T1 "PATCH YOUR PHP" | 5 ("PHP2Shell" means nothing cold) | title now says "The PHP Flaw"; T1 kept for PHP viewers | (title judged vague; kept for search, see 1a) |
| T2 "3/4 OF THE WEB" | 7 | **red grid flagged as false** (running PHP is not being hacked): words now "IS YOUR PHP PATCHED?", grid grey with one warning | 6 before the fix |
| T7 "SURPRISE AI BILL" | 8 (best) | "HACKED:" added so it doesn't read as overspending | 7 before the fix |
| T9 "$50 PER HACK" | 8 | words now say what happened; "$50 each (estimate)" on the tag | 7 before the fix |
| T13 Zeabur sign | 8 | words "HACKED TWICE, SHUT DOWN", key tag "one old token" | 5 before the fix |
| A3/T3, A10/T10, A11/T11, A12, A14, A15/T15 | 4-6 | words rewritten (YOUR TO-DO LIST, DON'T SKIP THESE, THEY WANT THIS, 6 STORIES, ONE MONTH); kept as back-ups only | not re-scored |
| A8/T8 calendar | 6, **bug: 21 circled twice** | four dates, two stickers on the 21st | not re-scored |
| SH4, SH5, SH7, SH11, SH14 | 6-9 | labels sharpened | **8** (keep) |
| SH1 | 4 | label "A PHP flaw and 3 hacks in one month" | 4 before the fix |
| SH2, SH3, SH6, SH9, SH10, SH12, SH13, SH15, SH16 | 4-7 | labels rewritten to say what happened in plain words; SH3, SH14, SH16 titles rewritten | 5-7 before the last fix; not re-scored again |
Lessons: strangers don't know PHP2Shell, Railway, Zeabur or OpenCode by name, so labels lead with what happened and the name comes second. Money and absurd facts (AI bill, key = 4) stop the scroll. Never colour a "runs PHP" picture as "hacked". SH9/SH10 and SH2/SH3 overlap: post them days apart, or drop SH10 and SH3 if you want fewer.

Dropped ideas: "PHP Got Hacked" (false); "Every Hack…" (overclaim); a title on the number-4 key for the main video (it is one story of seven, so it would mislead); "admin token" wording on thumbnails (jargon cold); the kit's thumbnail word "ROTATE" (not plain to non-developers).

### 7e. What changed from her kit (and accuracy notes)
**Recording vs kit:** listed at the top of this file (10 points). Whisper mishearings to fix in every caption: "HP" = PHP, "Hapsun" = apps, "Zebra / Zibor / the borough" = Zeabur, "security roles" = security holes, "PHP two shell / PHP social" = PHP2Shell, "on-import servers" = honeypot servers, "just for this before" = just four days before, "loop all / loop rules" = loophole(s), "restart your patch" = (listen) Apache, "post deployment" = paused deployments, "the ads asked" = and they asked, "how the attack has gotten" = how the attackers got in, "pass services" = pause services, "from the abuse" = from their bills, "open AI and Tropic" = OpenAI, Anthropic, "distillation account" = distillation attack, "Emudra" = eMudhra, "assignee keys" = signing keys, "affect the website" = fake a website, "shark, ninj, commies" = SharkNinja, Cummins, "find the box" = find the bugs.

**Facts that changed or got clearer since her kit (as of 2026-10-26):**
1. **Railway** published a preliminary report (October 22): at most 1.85% of workspaces, entry through privilege escalation in build infrastructure then CI credentials, first entry point still not disclosed. Her spoken line "still no full details from Railway on how the attackers got in" is **still true**. The kit's reply "their CEO said a full post-mortem is coming" is updated in 6e.
2. **PHP2Shell**: still no publicly confirmed big break-in; many attempts (Cloudflare: millions), a suspected North Korea-linked scanning campaign (October 25), Palo Alto devices affected. Her "people have already tried to exploit" stays accurate. Never say "PHP got hacked".
3. **eMudhra**: Apple and Microsoft also blocked the keys (dates differ between sources: Apple October 19 per TNW vs October 22 in your kit's BleepingComputer note). eMudhra says only one of the eight was used in production.
4. **AI-agent hacker**: the $50 is the researcher's rough estimate per successful hack; 100+ sites out of 1,200+ tried. Cummins says the site was run by a vendor. You say "SharkNinja, Cummins": fine.
5. **Zeabur**: the old token was stored in plain text in a private config repo; pause December 1, close December 31. Her "by the end of December" is right.
6. **Railway's aim**: she says "a series of attacks on platforms like theirs with the goal of getting to AI companies"; TechCrunch reports Railway called it a broader attack "with the aim of compromising AI inference providers". Close enough; captions say "aimed at getting to AI companies".
7. "Nearly three quarters" (W3Techs via Reuters) vs "70%" in other coverage: both fine; we use her words.

**Kept from your kit:** all the X posts, replies, image post, pinned comment idea, essay structure, SEO title and description, Medium sign-off. **Changed:** titles (PHP2Shell first, see 7c), thumbnails (topic words, not "PATCH" alone), description in your voice with 7 chapters (kit had 11), shorts rebuilt from what you actually say with raw times (kit had 16 clips + 6 scripted shorts; the scripted ones you didn't record are dropped), YouTube Shorts text without "full video" lines and with ~480-character tags.

### 7f. Sources (every link, date, number)
- PHP2Shell analysis, Datadog Security Labs (two CVEs, 9.2, default configs, restart warning): https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
- BleepingComputer, PHP ships emergency patches (fixed versions, discoverers Calif, OpenAI, Wiz; backports for 7.4-8.1): https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws
- AWS Security Blog, MadPot saw exploitation attempt October 17: https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
- The Hacker News, attempt before disclosure: https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html
- Help Net Security, week in review October 25: https://helpnetsecurity.com/2026/10/25/week-in-review-php-vulnerabilities-patched-exploited-palo-alto-globalprotect-vpn-flaw
- Deseret News (Reuters), "nearly three quarters", Calif + OpenAI model, European government sites: https://www.deseret.com/business/2026/10/21/website-computer-server-security-flaw-artificial-intelligence-hackers-cybersecurity-php-programming-language/
- Netherlands/Finland/Austria sites offline: https://pasqualepillitteri.it/en/news/26110/php2shell-netherlands-finland-switch-off-government-sites-before-patch ; UK councils and Met Police: https://www.insurancebusinessmag.com/uk/news/cyber/uk-councils-and-met-police-among-sites-pulled-offline-after-ncsc-alert-594424.aspx ; Luxembourg: https://en.paperjam.lu/article/php2shell-thousands-of-websites-exposed-in-luxembourg
- CISA advisory coverage (SC World): https://www.scworld.com/news/cisa-advises-orgs-to-patch-php2shell-bugs-immediately ; Nextgov: https://nextgov.com/cybersecurity/2026/10/us-agencies-urge-fixes-programming-language-flaws-putting-millions-web-systems-risk/416726
- watchTowr FAQ (older branches incl. PHP 5): https://watchtowr.com/intelligence/php-cve-2026-109618-faq/ ; Arctic Wolf: https://arcticwolf.com/resources/blog/php2shell-critical-php-vulnerabilities-enable-unauthenticated-remote-code-execution/
- Railway preliminary report (October 22; 1.85% of workspaces; timeline): https://blog.railway.com/p/preliminary-report-october-security-incident
- TechCrunch, Railway urges users to revoke keys (October 22; "AI inference providers"): https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/
- GitGuardian, Railway rotation guidance: https://blog.gitguardian.com/railway-october-2026-incident-environment-variables/
- Zeabur, "Zeabur is shutting down": https://zeabur.com/blogs/zeabur-is-shutting-down ; BleepingComputer (321,810 accounts, 3.2 million records, token since January 2024): https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/ ; SC World: https://www.scworld.com/brief/zeabur-to-shut-down-following-major-security-breach
- TechCrunch, OpenCode (October 19; 1.4%, hundreds and over $1,000, refunds): https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/ ; BleepingComputer: https://bleepingcomputer.com/news/security/opencode-hack-exposes-api-keys-amid-ai-distillation-attacks
- BleepingComputer, browsers block eMudhra: https://bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates ; The Next Web (key was 4; Chrome/Mozilla October 17, Apple October 19, Microsoft October 20): https://thenextweb.com/news/emudhra-certificates-weak-keys-browsers-block ; Inc42 (one in production, 20% share fall): https://inc42.com/buzz/emudhras-security-key-flaw-what-went-wrong-and-why-google-mozilla-stepped-in/
- Reuters via Star-Advertiser, AI agents and 100+ sites (October 19): https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/ ; The Next Web (1,200+ tried, Cairn, $50 estimate): https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge
- Node.js October 21 release (10 fixes; 22.23.4, 24.22.1, 26.12.1): https://securityonline.info/nodejs-security-release-october-2026/ ; https://www.konfirmity.com/advisories/nodejs-october-2026-security-releases
- Real-source captures: `assets/sources/SOURCES.md` (with its "Facts to flag" list) was not written yet when this kit was finished (2026-10-26); when it lands, check its list against 7e and fix any line that differs.
- Outlier numbers: yt-dlp, 2026-10-26, links in 7c. Autocomplete: suggestqueries.google.com, 2026-10-26.

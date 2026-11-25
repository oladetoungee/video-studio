# october-attacks film: hand-off (for the TALKING-HEAD agent, and to resume the film agent)

Look: direction A "The Month" (October calendar spine; orange #F2541B / night #16110D / bone #EFE7D8; Anton, Manrope,
Spline Sans Mono) with B's keys (rails, keys taken / swapped / stamped 4). Editor: http://localhost:7700/edit/october-attacks/

## Timing
- Times below are FILM seconds = edited-voice seconds + intro 0.30 s. Total 480.24 s (outro 2.5 s).
- Voice: `audio/voice_edit.flac` = her raw `kit/transcripts/voice.m4a` tightened (cutlist `data/cutlist.json`: one retake
  cut at raw 365.29-367.05 "that your browsers need," + 3 pauses tightened, 2.3 s in all). Raw time ≈ voice time before
  365.3 s; after it add 1.76 s (see `segments` in the cutlist).
- Words: `data/words.json` (whisper DTW on the edited voice + the kit's name fixes: PHP2Shell, Zeabur, OpenCode, eMudhra,
  honeypot, Apache, January 2024...). Sync by words (the moment runtime matches words), so pauses cut differently are fine.
- Every scene is drawn for 16:9 AND 9:16 (`V(landscape, portrait)`), portrait content inside y 370-1440.

## Scenes (id, ground, start, end in film seconds; what it shows)
| # | id | ground | start | end | shows |
|---|---|---|---|---|---|
| 1 | `month` | oct | 0.00 | 8.86 | October 2026 calendar draws in, "Cybersecurity Awareness Month" banner, days 14/15/17/19/21 go black one by one |
| 2 | `php` | night | 8.86 | 15.90 | camera dives into the 21st: PHP, "most of the websites", BleepingComputer headline, CVE numbers |
| 3 | `railway` | night | 15.90 | 23.21 | Railway; keys on a rail drop and new orange keys swing in on "change their secret keys"; TechCrunch revoke line highlighted |
| 4 | `zeabur-open` | bone | 23.21 | 30.76 | Zeabur (day 14): a door closes, AUG / OCT stamps, CLOSED sign |
| 5 | `agents-open` | night | 30.76 | 36.62 | 120 website tiles, 11 turn orange (1 square = 10 sites tried: 100+ of 1,200+), "one hacker used AI agents", 100+ |
| 6 | `overflow` | oct | 36.62 | 42.64 | the month again, "an overflow of attacks", 21 circled "the biggest one" |
| 7 | `share` | bone | 42.64 | 54.57 | 100 squares, 75 ink: nearly three quarters of the web; PHP / WordPress / Laravel stack ("I write this at work") |
| 8 | `found` | night | 54.57 | 59.64 | a PHP block with two holes punched; "PHP2Shell" |
| 9 | `shell` | night | 59.64 | 71.56 | terminal on "your-server": whoami, ls; "type commands on your server" |
| 10 | `score` | oct | 71.56 | 76.46 | 9.2 out of 10 meter (orange), "really terrible", Dark Reading line |
| 11 | `bug1` | bone | 76.46 | 87.39 | bug 01 memory: a request typed into memory cells, OUT OF MEMORY, unfinished data left behind |
| 12 | `bug1b` | bone | 87.39 | 94.35 | the cleanup pass ticks the broken cells as real; attacker command in a terminal |
| 13 | `bug2` | bone | 94.35 | 102.73 | bug 02 leftovers: three PHP workers keep a scrap from earlier requests |
| 14 | `exploit` | night | 102.73 | 108.38 | centred: "not just random bugs" (struck), The Hacker News headline underlined, "huge loopholes people already tried to exploit" |
| 15 | `before` | night | 108.38 | 126.46 | day view of a request: FIRST request, THEN PHP reads it (the hole), login / middleware / auth struck; BleepingComputer quote |
| 16 | `login` | bone | 126.46 | 129.61 | a door with three padlocks; the request slides under it; "wouldn't matter" |
| 17 | `amazon` | bone | 129.61 | 138.72 | AWS blog headline, a honeypot server in a cage, Oct 17 -> 21 "4 days early" |
| 18 | `offline` | night | 138.72 | 144.70 | Insurance Business headline, six government site tiles switch to "offline"; "switched off to patch"; "taken offline as a precaution: no breach reported" |
| 19 | `fix` | bone | 144.70 | 159.50 | to do on the 21st: update your PHP, fixed versions 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35, php -v, checklist (8.1 upgrade, package not enough, restart Apache / PHP-FPM, rebuild Docker) |
| 20 | `laravel` | night | 159.50 | 167.82 | Laravel layer on a PHP layer; a crack in PHP underneath |
| 21 | `node` | night | 167.82 | 175.06 | top/bottom split: PHP2Shell + Node.js blocks full width, nodejs.org headline centred, "Running Node? Update that too" |
| 22 | `busy` | oct | 175.06 | 179.65 | the month, RAILWAY lands on the 21st, "same day" |
| 23 | `deploy` | bone | 179.65 | 184.14 | your code -> Railway -> your app (deployment platform) |
| 24 | `env` | night | 184.14 | 193.80 | .env card, three keys on a ring with tags, TechCrunch "may have accessed encrypted environment variables" |
| 25 | `paused` | bone | 193.80 | 201.40 | Deploy button turns "Deploys paused", "(this one affected me too)", Railway blog line; keys revoked and changed |
| 26 | `unknown` | night | 201.40 | 204.94 | a door ajar with "?": how did they get in, no full details yet + "Update, 22 Oct" card (Railway preliminary report: build system, then CI credentials, at most 1.85% of workspaces) |
| 27 | `series` | bone | 204.94 | 213.13 | three platforms -> AI companies, Railway blog "AI inference providers" |
| 28 | `zeabur` | night | 213.13 | 224.92 | full-width ZEABUR storefront, the shutter rolls down; the real Zeabur "shutting down" headline |
| 29 | `breaches` | bone | 224.92 | 231.60 | AUGUST page stamped BREACHED, OCTOBER 14 and 15 marked, "again" |
| 30 | `count` | oct | 231.60 | 240.44 | 321,810 accounts and 3.2 million records count up (orange), BleepingComputer numbers |
| 31 | `zeabur-keys` | night | 240.44 | 256.46 | key rail AWS / GCP / DATABASE / GITHUB APP / ADMIN; the orange admin key tagged "since Jan 2024, no expiry" stays while the others are swapped; circled; a Jan 2024 -> Oct 2026 bar |
| 32 | `gates` | night | 256.46 | 263.97 | the door opens again with the orange key in it; BleepingComputer "admin tokens had no expiry" |
| 33 | `december` | bone | 263.97 | 268.03 | DECEMBER 2026 page: Dec 1 paused, Dec 31 off; Zeabur notice |
| 34 | `bills` | bone | 268.03 | 277.95 | day 19 OpenCode: AI usage chart flat then a spike; "found out from their bills" |
| 35 | `console` | night | 277.95 | 287.68 | OpenCode Console key cabinet; AI keys taken through an older system's door |
| 36 | `alerts` | bone | 287.68 | 299.20 | usage alerts from OpenAI / Anthropic / Google, "hundreds of dollars", $1,000+, TechCrunch line |
| 37 | `imagine` | oct | 299.20 | 301.83 | a phone lock screen filling with usage alerts (orange) |
| 38 | `distill` | night | 301.83 | 316.19 | questions into an AI model, answers out into "their own model" that grows; "on other people's bill" |
| 39 | `blocked` | bone | 316.19 | 320.75 | keys stamped BLOCKED, refunds check |
| 40 | `pattern` | oct | 320.75 | 332.42 | days 21 / 14 / 19 side by side, each gets an orange key: the same pattern (orange) |
| 41 | `do-change` | bone | 332.42 | 335.84 | 01 change any key you're not sure about (the "?" key is swapped) |
| 42 | `do-expiry` | bone | 335.84 | 340.54 | 02 expiry dates: a key with an expiry tag |
| 43 | `do-access` | bone | 340.54 | 348.98 | 03 one key, one lock: a read-only key goes to one bucket of three |
| 44 | `do-limits` | bone | 348.98 | 353.91 | 04 spending limit line, the bar passes it, a spending alert |
| 45 | `do-store` | bone | 353.91 | 357.27 | 05 don't store keys in tools that don't need them |
| 46 | `one-more` | oct | 357.27 | 363.54 | the month, 17 circled: one more story, "sounds made up" |
| 47 | `trust` | bone | 363.54 | 375.75 | your browser -> trusts eMudhra -> vouches for the website; address bar padlock circled |
| 48 | `four` | bone | 375.75 | 390.96 | eight signing keys on a rail; one stamped 4 grows big; BleepingComputer quote |
| 49 | `april` | night | 390.96 | 397.71 | APRIL 2025 page; a key script makes weak keys, then again |
| 50 | `fake` | bone | 397.71 | 404.24 | a real and a FAKE site, both with the padlock |
| 51 | `updated` | night | 404.24 | 411.41 | centred padlock, "keep your stuff updated", update bar fills, BleepingComputer "Mozilla, Google, Apple block..." |
| 52 | `ai-sides` | oct | 411.41 | 420.32 | the month, "AI" chips land on 19 and 21: "AI found the bugs, ran the attacks, and was the target" |
| 53 | `hundred` | night | 420.32 | 430.27 | Reuters (Star-Advertiser) headline; 120 tiles, 11 taken (1 square = 10 sites); SharkNinja and Cummins |
| 54 | `run-hours` | bone | 430.27 | 436.47 | short instructions note; a clock spinning for hours |
| 55 | `fifty` | oct | 436.47 | 446.48 | $50 per successful hack (orange, "a researcher's estimate"), The Next Web headline |
| 56 | `news` | bone | 446.48 | 450.84 | a wall of six real headlines with a shared credit row |
| 57 | `both` | night | 450.84 | 468.30 | defenders card (PHP2Shell found with AI: BleepingComputer line) and attackers card (tiles, "one hacker, 100+ sites, ~$50 each (estimate)"); an AI chip goes back and forth |
| 58 | `end` | oct | 468.30 | 480.24 | "back and forth": each black day becomes its object (keys, a 4, a jagged hole for PHP); the month steps back, a blank NOVEMBER 2026 page: "still dealing with attacks"; "crazy, really crazy" |

## Notes for embedding
- Good full-frame cutaways (L9 / tile / split): `month`, `railway`, `agents-open`, `score` (orange), `before`, `login`,
  `fix`, `count` (orange), `zeabur-keys`, `gates`, `alerts`, `pattern` (orange), `four`, `fifty` (orange), `news`, `end`.
- Orange screens have no light / dark alternative; night and bone screens do (editor Light / Dark per screen).
- Scene ids are stable: edits in `film/edits.json` key on them.

## Status (film agent)
- 2026-10-26 ~04:00: critic rounds 6.4 -> 7.2 -> 7.6; round-3 notes and the coordinator's fact updates applied (see STATUS.md).
  Final exports (10:53): outputs/video/october-attacks_motion_{16x9,9x16}_v1.mp4, -14.0 LUFS, hard-linked in ~/Downloads/october-attacks/film/. Scene ids above are final; times are stable
  unless her words change. Lab: 0 dead holds, 0 blank cuts, 0 contrast failures, -14.9 LUFS / -1.8 dBTP (AAC).
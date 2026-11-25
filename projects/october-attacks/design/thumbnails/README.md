# october-attacks thumbnails (set 1, 2026-10-26)

21 thumbnails, 1280x720. PNGs in `outputs/thumbnails/` (+ `overview.png`, recommended first). Editable in the studio:
http://localhost:7700/design/october-attacks/thumbnails/ (text in place, drag, resize, swap photos, colours).

## Mix (THUMBNAILS.md quota)
- Photo background, her room washed in one colour and she in full colour (8): 01, 02, 03, 04, 05, 06, 07, 08 (+ 12, natural colour, no wash).
- Collage over her full natural photo (3): 09, 10, 11.
- Flat graphic (5): 13, 14, 15, 16, 17.
- Other, no face or real news screenshots (4): 18 receipt, 19 server with CLOSED sign, 20 padlock "4", 21 real headlines.
Her picture appears as a washed-room background, natural photo, colour cut-out with outline (17), B&W-free colour cut-out (13), and not at all (14, 15, 16, 18-21).

## Scores (fresh cold critic, thumbnail alone first, then with titles; 8 = post as is)
| # | Words on it | Kind | R1 | R2 | Best title |
|---|---|---|---|---|---|
| 18 | HACKED: $1,000 AI BILL | other (kit top 3) | 6 | **8.5** | Stolen API Keys Can Cost You $1,000 in AI Bills |
| 13 | IS YOUR PHP PATCHED? | flat | 7.5 | **8.5** | PHP Vulnerability 2026: How to Check and Patch PHP2Shell |
| 14 | IS YOUR PHP SAFE? | flat (terminal) | 8 | **8.5** | PHP Vulnerability 2026: How to Check and Patch PHP2Shell |
| 15 | AI AGENTS HACKED 100+ SITES | flat (kit top 3) | 7 | **8** | AI Hacking News: One Hacker, AI Agents, 100+ Companies |
| 16 | HACKERS WANT YOUR .ENV | flat | 8 | **8** | Railway Hack, Zeabur and OpenCode: Change Your API Keys |
| 07 | CHANGE YOUR API KEYS | photo + real TechCrunch headline | 7 | **8** | OpenCode Hacked, Railway Breached: Protect Your API Keys |
| 19 | HACKED TWICE, SHUT DOWN | other | 8 | **8** | A Hosting Platform Is Shutting Down After Two Hacks |
| 03 | STOLEN SECRET KEYS | photo | 7.5 | 7.5 | Railway Hack, Zeabur and OpenCode: Change Your API Keys |
| 05 | CHECK THESE 2 THINGS | photo | 7 | 7.5 | What October's Hacks Mean for Your PHP and API Keys |
| 01 | PHP2Shell, the hole in PHP | photo | 6.5 | 7.5 | PHP2Shell Explained: Is Your PHP Server Patched? |
| 02 | PATCH YOUR PHP | photo (kit top 3) | 7.5 | 7 | PHP2Shell Explained: The PHP Flaw and October's Other Hacks |
| 04 | WHAT TO FIX FIRST | photo | 6.5 | 7 | What October's Hacks Mean for Your PHP and API Keys |
| 17 | YOUR SECURITY TO-DO | flat + her cut-out | 6.5 | 7 | PHP2Shell, Railway and OpenCode: What Developers Should Do |
| 21 | OCTOBER 2026 SECURITY NEWS | other (real headlines) | 6.5 | 7 | The October 2026 Hacks Every Developer Should Know |
| 06 | DEVELOPERS, UPDATE NOW | photo | 6 | 6.5 | The October 2026 Hacks Every Developer Should Know |
| 08 | AI AGENTS HACKED 100+ SITES | photo (same words as 15) | 6.5 | 6.5 | AI Hacking News: One Hacker, AI Agents, 100+ Companies |
| 12 | A security hole in PHP | photo, natural | 5 | 6.5 | PHP Vulnerability 2026: How to Check and Patch PHP2Shell |
| 20 | ITS SECRET KEY WAS THE NUMBER 4 | other (rewritten after R1: 3.5) | 3.5 | 6.5 | eMudhra Explained: A Secret Key That Was the Number 4 |
| 10 | A MONTH OF HACKS | collage | 5.5 | 6 | Developers Had a Rough October: PHP, Railway, OpenCode |
| 11 | PROTECT YOUR API KEYS | collage | 5 | 6 | OpenCode Hacked, Railway Breached: Protect Your API Keys |
| 09 | OCTOBER'S DEV HACKS | collage | 4.5 | 5.5 | The October 2026 Hacks Every Developer Should Know |
After R2 we also applied: 09/10/11 words moved from the thin italic serif to the heavy face on a dark band (the critic's top fix), 15/08 "$50 per hack", 18 headline lower and bigger, 19 "A HOSTING PLATFORM" line bigger. Not re-scored.

**YouTube Test & Compare (kit plan, title 1 "PHP2Shell Explained: The PHP Flaw and October's Other Hacks")**: 02 PATCH YOUR PHP, 18 HACKED: $1,000 AI BILL, 15 AI AGENTS HACKED 100+ SITES. The critic warns that 18 and 15 promise stories title 1 doesn't name; if you'd rather keep each pair honest, test 02, 13 and 14 (all PHP) with title 1, and use 18 / 15 / 19 for the OpenCode, AI-agents and Zeabur shorts or community posts.

## Facts checked (critic's flags)
- Fixed PHP versions: 8.5.12, 8.4.27, 8.3.36, 8.2.35 (kit 7f, PHP security team). 02 shows 8.4.27, 14 shows 8.3.35 (unsafe) vs 8.3.36: both correct branches.
- $1,000: her words at 4:50 in the raw recording ("some of these charges were in hundreds of dollars. A few of them were even over a thousand dollars"); the receipt is obviously generic ("not you" lines), total "$1,000+".
- $50: "A researcher estimated the cost at about $50 in AI tokens per successful hack" (Reuters via kit SH15), labelled "researcher's estimate".
- Zeabur: admin token with no expiry (BleepingComputer, Start With Identity). eMudhra: one private key was the number 4 (BleepingComputer; browsers blocked the certificates).
- PHP was never called "hacked": 01/12 say "hole".
- Real screenshots are untouched crops with a credit under each (BleepingComputer, TechCrunch). No brand logos; the elephant is a generic drawing, not the PHP logo.

## What would lift the set
A photo of you **without the mic**, at a laptop (serious, or hand on forehead), well lit; and one pointing or holding something up. Every photo option here uses video frames (small lapel mic on your chest; most frames are mid-word). Drop it into the editor with "Add photo" and the photo options (01-08, 09-12) can switch to it.

## Files
`directions/<NN-name>/{index.html,content.json}`, shared look `lib/oa.css`, drawings `assets/draw/` (generic elephant, key, robot, padlock),
her frames `assets/frames/` (176.6 palms up, 3.0 calm, 9.0 calm close-up, 410.0 hands together; never flipped), aligned layers
`assets/scene/`, cut-outs `assets/cut/`, real headline crops `assets/src/`. Render: `node render.mjs` (all + overview) or `node render.mjs 07`.

## Combined "everything, but calm" (her 10-26 brief): 22-25
Base 13 (night ground, her cut-out with the orange outline) + 14's terminal and elephant + real headlines (Zeabur, Railway, OpenCode, eMudhra, Reuters on the AI-agents hacker; untouched crops) + 15's robots. Side-by-side board: `outputs/thumbnails/combined-board.png`.
| # | Big words | R1 | R2 | Best title |
|---|---|---|---|---|
| **23** terminal hero | IS YOUR PHP SAFE? · 100+ SITES HACKED | 7 | **8 (post)** | PHP2Shell, Railway, AI Agents: October 2026 Hacks Explained |
| 25 AI agents lead | AI AGENTS HACKED 100+ SITES · IS YOUR PHP SAFE? | 6.5 | 7 | PHP2Shell and AI Agents: The October 2026 Hacks Explained |
| 24 split stack | OCTOBER'S HACKS · IS YOUR PHP SAFE? | 6 | 6.5 | PHP2Shell, Railway, OpenCode: October 2026's Big Hacks |
| 22 three tiles | OCTOBER'S HACKS · IS YOUR PHP SAFE? | 5.5 | 6 | October 2026 Hacks Explained: PHP2Shell, Railway, AI Agents |
After R2: 23 card edges aligned; 25 headline cards narrowed and moved off her hand. Exact wording option for 25: "HACKER + AI AGENTS: 100+ SITES" (the source says one hacker used AI agents).

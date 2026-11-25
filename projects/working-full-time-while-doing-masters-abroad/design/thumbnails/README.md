# 2026-11-19: reworked from her 50 picks (THUMBS-REWORK-BRIEF-2026-11-19): set of 5
- Kept 03 (unchanged), 02b (3 days, labels 80 px, her at the right edge; layout() now uses the calendar's width, CSS var --cw / --evz). New: 07 (pick1119-27), 09 (pick1119-04), 10 (pick1119-22), hand-built (not in any make-set script). Photos assets/p1119/ (Øredev + shoot C IMG_1597; Enhance photo --bg keep, strength 0.35-0.5; person layers via tools/personlayer.swift, stage cut-out via studio/tools/cutout.swift).
- Retired (with 03b pick 31, 08 pick 36, 11 pick 12 that were built and dropped): archive/thumbnails-retired-2026-11-19/. lib/set.css: FMO Montserrat + .panel added.
- Upload 10 + "Can You Work Full Time and Do a Master's? Yes, Here's How"; Test & Compare 07, 02b. Scores and titles in each content.json ("scores", "titles"), STATUS.md, kit section 2.

# 2026-11-16: 01b, 02b, 06b added beside 01, 02, 06 (WEAKEST-BRIEF-2026-11-16; hand-built, not in make-set-2026-11-13f.py, so a --force rebuild does not touch them)
- 01b Thumbnails 126 + design-05 Anton (Design 368) · 02b Thumbnails 51 + thumbs-19 Inter Tight Medium (calendar built in its index.html layout(); text keys days / work / class / unlabelled) · 06b Thumbnails 96 + thumbs-14 Poppins Bold. Blind critic: 01 6 -> 01b 7, 02 5 -> 02b 7, 06 5 -> 06b 7.

# working-full-time thumbnails (set 2026-11-13, round 6 = polish, FULL-KIT-BRIEF-2026-11-12)

6 thumbnails, 1280x720. PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit: http://localhost:7700/design/working-full-time-while-doing-masters-abroad/thumbnails/
Built by `tools/make-set-2026-11-13f.py` (`--force` OVERWRITES content.json + index.html; without it her text edits and moves are kept), then
`node render.mjs`. CSS `lib/set.css`. Each content.json records "board" ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N), "fonts"
(font-board ids, inspiration/boards/fonts/, used in their source colours), "colours", "layout".
- Six cold-critic rounds. Round-5 scores: 04 8, 01 / 02 / 03 7, 05 / 06 6 (07-09 dropped at 4-5). Round 6 = polish to the critic's notes:
  04 red box 16-20 px padding on one left edge, "+" tight, room 13 % brighter; 03 labels 46 px higher, night room neutral dark (#111114), boxes 35 px
  either side of the divider; 01 FULL-TIME at 100 px (cap ~70 px), matte choked 11 px, her shoulders reach the bottom; 02 two solid bars (Job 9-5,
  Study 6-9 PM), photo without hands (1578), matte choked 11 px; 05 "JOB + MASTER'S IN" on a 30 % scrim over ESTONIA, 50+ px to her headband;
  06 "Master's after a 9-5" in white, no black strip, her face about half the frame height. Every one says job + master's (or work + study).
  Old rounds: `~/.Trash/working-full-time-thumbnails-old-2026-11-13/` (round1/ ... round5/, round5-dropped/).
- Photos of her: 29 Oct shoot, outfit B, Enhance photo + cut-out (assets/shoot2/), face untouched. Pexels (credits film/assets/CREDITS.md): Tallinn (05), desk at night (06).
- Census (320 px sheet): words left / her right = 1 (04). Review: `outputs/_review/thumbnails-vs-board.jpg`, `outputs/_review/thumbnails-320.jpg`.
- Round-6 blind re-score (final): 03 8 · 04 7.5 · 05 7 · 01 6.5 · 06 6 · 02 5. Upload: 03 + "How I Work Full Time While Doing a Master's Abroad" (the shorts' outro card now uses 03); Test & Compare 04 and 01.

| # | Words on it | Kind | Board | Fonts | Round-5 score | Titles (1 = best pair) |
|---|---|---|---|---|---|---|
| 01 | FULL-TIME WORK | FULL-TIME STUDY (heavy, either side above her) | flat, huge words above either side of her (her big, running off the bottom) | Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words, the head between) | design-02 Big Shoulders Display Black (black #000000 on orange #E99A3F, Design 397) | 7 | How I Work Full Time While Doing a Master's Abroad / Working Full Time While Doing a Master's Abroad / Masters While Working Full Time: My First Year |
| 02 | 9-5 + MASTER'S + Job 9-5 / Study 6-9 PM | flat + her on the LEFT, a plain day plan on the right (Job 9-5 bar, Study 6-9 PM bar) | Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her with her plan behind her) | design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394) | 7 | Full-Time Job and Full-Time Master's: How I Plan My Week / Working a 9-5 While Doing a Master's Abroad / My Week as a Developer and a Full-Time Master's Student |
| 03 | 9 AM JOB | 9 PM MASTER'S | split: her at 9 AM (room bright and cool) | her at 9 PM (room in the dark); her face untouched in both | Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it) | design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373) | 7 | How I Work Full Time While Doing a Master's Abroad / Working a 9-5 While Doing a Master's Abroad / My Week as a Developer and a Full-Time Master's Student |
| 04 | FULL-TIME JOB + MASTER'S | photo (her room, close; words left / her right, 1 of 2) | Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right) | thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113) | 8 | Masters While Working Full Time: My First Year / How I Work Full Time While Doing a Master's Abroad / Working While Studying Abroad: How I Do Both |
| 05 | JOB + MASTER'S IN ESTONIA (over Tallinn old town) | real Tallinn photo (darkened, softened), huge words over it, her big on the right in front | Thumbnails 127 (viral-1 "FINANCIAL LITERACY": the topic huge across the picture, the person in front) | shorts-17 Oswald caps, white + mint key word (#FFFFFF, #7FF0C0 on #2E2E33, Formats 20) | 6 | Study and Work in Estonia: My Full-Time Job + Master's / Can International Students Work Full Time in Estonia? / Studying in Europe as a Nigerian With a Full-Time Job |
| 06 | MASTER'S AFTER A 9-5 (her tired, a desk with code at night) | real scene (a desk at night, code on the screen) + her, tired, bottom left; words on a dark plate right | Thumbnails 94 (yt-41 "AI has rewired my brain": "It Clicked." one short line on a dark picture) | design-26 Inter Tight Black (white #FFFFFF, red #D92A11 on #0C0C0C, Design 20) | 6 | Studying After Work: My Master's With a Full-Time Job / How I Work Full Time While Doing a Master's Abroad / Working a 9-5 While Doing a Master's Abroad |

---- previous set notes below (history) ----

# working-full-time thumbnails (set 2026-11-10, rollout to the HTTP standard)

11 thumbnails, 1280x720, best first. PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit in the studio:
http://localhost:7700/design/working-full-time-while-doing-masters-abroad/thumbnails/ . The old 22 (studio portrait, shorthand words) are in
`~/.Trash/working-full-time-while-doing-masters-abroad-thumbnails-old-2026-11-10/`.

- Photos: her 29 Oct shoot, outfit B white tee + red headband (IMG_1577 1579 1580 1584 1589 1593 1594), Enhance photo (`--bg keep --long 1800`)
  + `cutout.swift auto` via `tools/shoot.py` -> `assets/shoot/<n>.jpg` (room), `<n>-person.png` (same box), `<n>-cut.png`. Class `no-lift` on all.
  Props: `assets/collage/` (laptop, books; Pexels) and talking-head/assets/px (desk, lecture room; credits film/assets/CREDITS.md).
- Look (this video's): charcoal #23201B, manila #E7D7AE, paper, ONE accent stamp red #C8102E (her headband); type set 02 (Anton, Inter Tight,
  DM Mono); quiet same-hue line pattern (`.pat`). CSS `lib/wft.css`. Photo layout `.pf`: `--pw` size, `--pl` / `--pt` place, `.washed` + `--wash`.
- Mix: photo 02 07 11 · collage 08 10 · flat 04 05 06 09 · other 01 (split) 03 (real page).
- Cold test: a fresh agent saw only the PNGs, then with titles; fixes applied after it, not re-scored.
- Upload: **01 + "How I Work Full Time While Doing a Master's Abroad"**; Test & Compare 02 and 03.
- `tools/make-set-2026-11-10.py` rebuilds this set from scratch (OVERWRITES content.json: don't run it after her edits).

| # | Words on it | Kind | Cold test | Titles (1 = best pair) |
|---|---|---|---|---|
| 01 | Developer by day, student by night | other (split) | UPLOAD THIS (with title 1) · cold test 8 / 8 (night half darkened + cooled after) | How I Work Full Time While Doing a Master's Abroad / My Week as a Developer and a Full-Time Master's Student / I Work Full Time and Study Full Time. This Is How |
| 02 | Full-time job + master's | photo | Test & Compare B · cold test 7 / 7 (books dropped, laptop bigger in her hands after) | How I Work Full Time While Doing a Master's Abroad / Working Full Time While Doing a Master's Abroad / Masters While Working Full Time: My First Year |
| 03 | Work while you study in Estonia | other (real page) | Test & Compare C · cold test 8 / 8 (critic's no. 1) | Can International Students Work Full Time in Estonia? / Working Full Time While Doing a Master's Abroad / How I Work Full Time While Doing a Master's Abroad |
| 04 | 30 days off to study | flat | cold test 8 / 8 (card clear of her hand after) | Working While Studying in Estonia? You Get Study Leave / Can International Students Work Full Time in Estonia? / Working Full Time While Doing a Master's Abroad |
| 05 | Job + master's in 24 hours | flat | cold test 7 / 8 (24H bigger after) | My Day as a Developer and a Full-Time Master's Student / Full-Time Job and Full-Time Master's: How I Plan My Week / How I Work Full Time While Doing a Master's Abroad |
| 06 | 9-5 job, then class | flat | cold test 7 / 6 (one work row + one class row, 80 px, title changed after) | Masters While Working Full Time: My Evening Schedule / How I Work Full Time While Doing a Master's Abroad / Masters While Working Full Time: My First Year |
| 07 | Work full time. Study full time. | photo | cold test 7 / 5 (title changed, room darker, words clear of her hair after) | How I Juggle a Full-Time Job and a Full-Time Master's / I Work Full Time and Study Full Time. This Is How / How I Work Full Time While Doing a Master's Abroad / One Year of a Full-Time Job and a Full-Time Master's |
| 08 | From Nigeria to Estonia: job + master's | collage | cold test 6 / 8 (job + master's line bold and bigger, laptop dropped after) | Studying in Europe as a Nigerian With a Full-Time Job / How I Work Full Time While Doing a Master's Abroad / Working Full Time While Doing a Master's Abroad |
| 09 | My work + study week | flat | cold test 5 / 7 (words now say work + study, WORK / CLASS on Monday after) | Full-Time Job and Full-Time Master's: How I Plan My Week / My Week as a Developer and a Full-Time Master's Student / How I Work Full Time While Doing a Master's Abroad |
| 10 | 1 year of work + study | collage | cold test 5 / 6 (3 props dropped, words on a solid band after) | One Year of a Full-Time Job and a Full-Time Master's / Masters While Working Full Time: My First Year / How I Work Full Time While Doing a Master's Abroad |
| 11 | 10 tips for working students | photo | cold test 7 / 7 | Working Full Time While Studying Abroad (10 Tips) / How I Work Full Time While Doing a Master's Abroad / Masters While Working Full Time: My First Year |

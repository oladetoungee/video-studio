# 9 things thumbnails: REWORK 2026-11-19 (her 50 picks, THUMBS-REWORK-BRIEF-2026-11-19) — the current set, 6
Kept 09b, 04b, 03 (light fixes: 09b left scene and 03 After panel brightened in their index.html). New, from `tools/gen-rework-2026-11-19.py`
(each copies one of her picks, inspiration/boards/thumbnails/img/pick1119-NN.jpg): 11 (pick 43), 13 (pick 22), 14 (pick 28). Retired (with
10 and 12, new ones that failed) in `../../archive/thumbnails-retired-2026-11-19/`; their relative paths there no longer resolve (archive only).
Her Øredev photos: `assets/oredev/` (chin, smile, profile + -cut.png; smile-head-cut.png = smile cut-out cropped to head and shoulders).
Upload 09b + "How to Stop Doomscrolling: 9 Things I Do Instead"; Test & Compare 09b, 11, 04b. Sheets outputs/_review/thumbnails-2026-11-19*.jpg.

| Direction | Words | Copies | Fonts | Cold critic r1/r2/r3 alone; with title |
|---|---|---|---|---|
| 09b-still-doomscrolling-at-2am | STILL DOOMSCROLLING AT 2AM? | board Thumbnails 98 (closest pick 17) | thumbs-16 Anton + red box | 7/7/7; 8/7/7 (recommended) |
| 11-is-5-hours-too-much | is 5 hours too much? (+ phone, 5h 12m example) | pick1119-43 | thumbs-09 Inter Tight Bold, red #E1251B | 7/8/7; 7/7/7 |
| 04b-instead-of-scrolling | INSTEAD OF SCROLLING + tags | board Thumbnails 129 | thumbs-12 Archivo Black | 7/7/7; 7/7/7 |
| 14-read-dont-scroll | Read, don't scroll | pick1119-28 | thumbs-02 Inter Tight Bold on yellow | 5/7/7; 6/6/7 |
| 13-its-not-your-fault | it's not your fault. | pick1119-22 | thumbs-18 Montserrat ExtraBold + #F6C343 | 5/6/6; 6/7/7 |
| 03-before-after | Before / After | board Thumbnails 66 (closest pick 06) | thumbs-18 Montserrat ExtraBold | 6/7/6; 7/7/6 |

# 9 things thumbnails: SET 5 (2026-11-13, FULL-KIT-BRIEF-2026-11-12, lifestyle look), final after 5 cold-critic rounds
6 directions from `tools/gen-set5.py` (then `node render.mjs`; `--force` resets her studio nudges). Each copies a DIFFERENT thumbnail-board
composition (content.json "board"), fonts only from the font board in their specimen colours ("fonts", "colours"), styles in `lib/s5.css`.
Photos: her shoot outfit A (assets/shoot/, face untouched, `no-lift`; cut-out edges tightened in assets/set5/<n>-cut-clean.png) + Pexels
(assets/set5/CREDITS.md). Sheets: `outputs/_review/thumbnails-vs-board.jpg`, `outputs/_review/thumbnails-320-census.jpg` (words left / her
right = 1 of 6, 07). `tools/sheet5.py big|small|board OUT.jpg`. The phone in 09 is generic (lib/phone.js), its 6h 41m is an example, not hers.
Cold critic (a fresh agent each round, PNGs alone then with titles), 5 rounds, 23 designs tried; rule: keep 8, drop under 7. Only these 6
held 7 or more. Dropped (binned in ~/.Trash/9things-thumbs-set5-r1, -r3, -r4, -r5; their functions stay in the generator, not run):
stock-scene collages and full-bleed stock scenes ("less scrolling, more living" x2, "log off", "phone-free evenings", "let yourself be
bored", "pick up a hobby"), the board-124 room + die-cut objects collage (stickers read cheap), her among die-cut objects, object-only flats
("PHONE DOWN", "PUT THE PHONE DOWN. DO THIS."), serif quote cards ("Read more. Scroll less.", "Your phone can wait."), the list-photo card
("Things to do instead of scrolling"), "less screen time" split, "STOP SCROLLING" red box. Critics disagree between rounds (01: 8 in r3, 7 in r4).
**Upload: 07 + "How to Stop Doomscrolling: 9 Things I Do Instead" (r4: 7.5 / 8; r5 critic: still the best). Test & Compare: 07, 03, 08.**
Old set (2026-11-10) is in ~/.Trash/9things-thumbs-set-2026-11-10/ except outputs/thumbnails/01-too-tired-to-stop.png (kept: the shorts' end card).

| Direction | Words on it | Layout | Board | Fonts (font board) | Critic (alone / with title) | Titles (1 = best pair) |
|---|---|---|---|---|---|---|
| 01-offline-hobbies | OFFLINE hobbies (+ photos: crochet, painting) | her centred + photos | Thumbnails 140 | shorts-10 Bodoni Moda caps + Instrument Serif italic (white on #3C2A22, Formats 48) | r3: 7 / 8 · r4: 6.5 / 7 | Things to Do Instead of Doomscrolling (That I Actually Do) / 9 Easy Things I Do Instead of Doomscrolling |
| 03-before-after | Before (on her phone in bed in the dark) | After (reading on the sofa in daylight) | split, no face | Thumbnails 66 | thumbs-18 Montserrat ExtraBold, yellow key word (white + #F6C343 on #3A3D3A, Thumbnails 162) | r3: 6 / 7 · r4: 7 / 7.5 | I'm Replacing Doomscrolling With These 9 Habits / 9 Easy Things I Do Instead of Doomscrolling |
| 04-my-no-phone-list | my no-phone list: read, call home, ride a bike, thrift, journal (ticked) | her left, list right | Thumbnails 63 | shorts-14 Caveat Bold (white on #3B88D6, Formats 64) | r3: 7 / 7.5 · r4: 6.5 / 7 | 9 Easy Things I Do Instead of Doomscrolling / Things to Do Instead of Doomscrolling (That I Actually Do) |
| 07-wasting-your-evenings | you're wasting your evenings | words left / her right | Thumbnails 84 | thumbs-10 Poppins Bold lowercase, red key word (white + #E5342B on #2A2522, Thumbnails 84) | r4: 7.5 alone / 8 with title (best of round 4) | How to Stop Doomscrolling: 9 Things I Do Instead / 9 Easy Things I Do Instead of Doomscrolling |
| 08-log-off | LOG OFF (behind her head) | her centred, word behind | Thumbnails 58 | combo-02 Inter Tight Black (#070804 on #D9F44F, Design 394) | r4: 7 / 7.5 (hair edge cleaned + gap under the word after; not re-scored) | 9 Easy Things I Do Instead of Doomscrolling / Offline Hobbies to Replace Doomscrolling (9 Easy Ones) |
| 09-cut-your-screen-time | cut your SCREEN TIME (+ a generic phone: Screen Time, daily average 6h 41m, an example number, not hers) | her left, phone right | Thumbnails 97 | thumbs-02 Inter Tight Bold + yellow highlight (white + #F7D51D on #1C1C1C, Thumbnails 21) | r5: 6.5 / 7 (cut-out edge, fuller phone screen, smaller gap after; not re-scored) | How to Stop Doomscrolling: 9 Things I Do Instead / 9 Easy Things I Do Instead of Doomscrolling |

| 04b-instead-of-scrolling (2026-11-16 rework of 04) | INSTEAD OF SCROLLING + tags read / call home / ride a bike / + 6 more | her left (face big), title + tags right | Thumbnails 129 | thumbs-12 Archivo Black (red #E2262B on yellow #F7F02B, Thumbnails 89) | 2026-11-16: r2 6.5 · r3 7 alone (old 04 5.5 · 6) | Offline Hobbies to Replace Doomscrolling (9 Easy Ones) / 9 Easy Things I Do Instead of Doomscrolling |
| 09b-still-doomscrolling-at-2am (2026-11-16 rework of 09) | STILL DOOMSCROLLING AT 2AM? (over a stock photo of someone lit by a phone in bed) | scene left + her right | Thumbnails 98 | thumbs-16 Anton + red box (white + #D7262E on #1E1E1E, Thumbnails 113) | 2026-11-16: r2 7 · r3 7.5 · r4 6 alone (old 09 7 · 6 · 7) | How to Stop Doomscrolling: 9 Things I Do Instead / What to Do Instead of Scrolling on Your Phone (9 Ideas) |
| 07b-wasting-your-evenings-scrolling (2026-11-16 copy of 07 + "scrolling"; hand-copied folder, not in a generator) | you're wasting your evenings scrolling | words left / her right | Thumbnails 84 | thumbs-10 Poppins Bold (as 07) | 2026-11-16 r4: 6 (07 5) | as 07 |
2026-11-16 reworks: `tools/gen-rework-2026-11-16.py` (keeps her nudges; `--force` resets). Old 04 and 09 unchanged. Sheet `outputs/_review/thumbnails-before-after-2026-11-16.jpg`.

# 9 things I do instead of doomscrolling: thumbnails (set 2026-11-10, rollout to the HTTP standard)

10 thumbnails, 1280x720, best first. PNGs: `outputs/thumbnails/` (+ `overview.png`). Edit in the studio:
http://localhost:7700/design/9-things-i-do-instead-of-doomscrolling/thumbnails/ . The old 12 (photos from before the shoot, some
words that needed the video) are in `~/.Trash/9-things-i-do-instead-of-doomscrolling-thumbnails-old-2026-11-10/`.

- Photos: her 29 Oct shoot, outfit A white shirt (IMG_1550, 1551, 1557, 1558, 1559, 1561, 1562, 1564; enhanced copies shared with
  dark-patterns, 1548/1561/1563 enhanced here with `studio/.cache/enhance --bg keep` + `cutout.swift auto` + `tools/personlayer.swift`)
  -> `assets/shoot/<n>.jpg` (room), `<n>-person.png` (same box), `<n>-cut.png`. Class `no-lift` on every one that shows her.
- Look: type set 06 (League Gothic caps via the 'Dela' alias, Inter Tight, DM Mono), Offline Bingo colours (butter / ink / cream /
  dauber orange), quiet same-hue line pattern (`.pat`). Photo layout `.pf` (lib/bingo.css 2026-11-10 block): `--pw` size, `--pl`/`--pt` place, `.pf.washed` + `--wash`.
- Mix: photo 01 03 05 07 · collage 08 09 · flat 04 06 10 · other 02.
- Cold test (fresh agent, PNGs only, then with titles); fixes applied after it where noted, not re-scored.
- Upload: **01 + "9 Easy Things I Do Instead of Doomscrolling"**; Test & Compare 02 and 03.
- `tools/make-set-2026-11-10.py` rebuilt this set from scratch (overwrites content.json: don't run it after her edits).

| # | Words on it | Kind | Cold test | Titles (1 = best pair) |
|---|---|---|---|---|
| 01 | Too tired to stop scrolling? | photo | UPLOAD THIS with title 1 · cold test 8 alone, 9 with its title | 9 Easy Things I Do Instead of Doomscrolling / How to Stop Doomscrolling When You're Tired / How to Stop Doomscrolling: 9 Things I Do Instead |
| 02 | Less phone, more life | other | Test & Compare B · cold test 8 / 8 | What to Do Instead of Scrolling on Your Phone (9 Ideas) / I'm Replacing Doomscrolling With These 9 Habits |
| 03 | I scroll less now | photo | Test & Compare C · cold test 7 / 8 (room wash lighter after) | 9 Easy Things I Do Instead of Doomscrolling / I'm Replacing Doomscrolling With These 9 Habits / How to Stop Doomscrolling: 9 Things I Do Instead |
| 04 | The feed never ends | flat | cold test 6 / 8 | Why Is It So Hard to Stop Doomscrolling? (9 Swaps) / How to Stop Doomscrolling: 9 Things I Do Instead |
| 05 | Put the phone down | photo | cold test 7 / 8 | How to Stop Doomscrolling: 9 Things I Do Instead / 9 Easy Things I Do Instead of Doomscrolling |
| 06 | 9 easy swaps for doomscrolling | flat | cold test 7 / 7 (yarn dropped, "for doomscrolling" 2x bigger after; not re-scored) | I'm Replacing Doomscrolling With These 9 Habits / 9 Easy Things I Do Instead of Doomscrolling / What to Do Instead of Scrolling on Your Phone (9 Ideas) |
| 07 | doomscrolling (crossed out), what I do instead | photo | cold test 7 / 6 (face 15% bigger, new title that does not repeat "instead" after; not re-scored) | I'm Replacing Doomscrolling With These 9 Habits / Things to Do Instead of Doomscrolling (That I Actually Do) |
| 08 | 9 things to do offline | collage | cold test 7 / 7 (grid 9 -> 4 photos, its own title after; not re-scored) | 9 Things to Do Offline Instead of Scrolling / What to Do Instead of Scrolling on Your Phone (9 Ideas) |
| 09 | offline hobbies | collage | cold test 6 / 6 (2 photos not 4, words heavy caps 1.7x, title changed after; not re-scored) | Things to Do Instead of Doomscrolling (That I Actually Do) / How to Stop Doomscrolling: 9 Things I Do Instead |
| 10 | My analog hobbies | flat | cold test 6 / 7 (her face added, cake + handbag + phone dropped, title changed after; not re-scored) | How to Stop Doomscrolling: 9 Things I Do Instead / 9 Easy Things I Do Instead of Doomscrolling |

## Earlier notes (set 2026-11-03 / 11-07, binned)
# 9 things I do instead of doomscrolling: thumbnails (set 1, 2026-11-03 → 11-06)

12 thumbnails, 1280x720, in the film's picked look A "Offline Bingo" (butter #F7D44C, card #FFFDF5, ink #161616, the orange dauber
#FF6A1A; Dela Gothic One, Figtree, Red Hat Mono; Instrument Serif for the collage line), used freely so each kind looks different.
PNGs: `outputs/thumbnails/` (+ `overview.png`, recommended first, words, titles and scores under each).
Edit in the studio: http://localhost:7700/design/9-things-i-do-instead-of-doomscrolling/thumbnails/

Not a repeat of the posted phone-distraction set: that set was phone-led (apps, badges, settings); this one is led by the offline
things (books, yarn, a bike, a notebook) and her list. Built 18, cut 6 over three cold-critic rounds (quality over count).

## Mix (THUMBNAILS.md quota)
- Photo background, her real frame (5): 01 natural, 02 black-and-white room + her in colour, 03 room washed near-black, 04 B&W room + her in colour, 05 room washed deep green.
- Collage over her photo (2): 06 two taped polaroids, 07 two-photo grid with a band.
- Flat graphic (3): 08 book vs feed on ink, 09 phone → swaps on butter, 10 numbered list + her cut-out (hard butter outline).
- Other (2): 11 before/after split (no face), 12 still life of analog things (no face).
Her frames (never flipped, only lifted and warmed): 21.0, 22.0, 22.8 (calm, closed mouth), 96.5 (hand in her hair). All video frames with the clip-on mic: your own photos would lift every photo option (drop one on a photo in the editor).

## Scores (fresh cold critic R3 — alone, then with its best title; 8 = post as is)
| # | Words on it | Kind | Scores | Titles (first = best pair) |
|---|---|---|---|---|
| 01 | PHONE DOWN | photo | R3 alone 6 · paired 6.5 | 9 Easy Things I Do Instead of Doomscrolling / How to Stop Doomscrolling: 9 Things I Do Instead / Things to Do Instead of Doomscrolling (That I Actually Do) |
| 02 | DOOMSCROLLING (crossed out) | photo | R3 alone 6 · paired 7 | What to Do Instead of Scrolling on Your Phone (9 Ideas) / 9 Easy Things I Do Instead of Doomscrolling |
| 03 | OFFLINE hobbies | photo | R3 alone 6.5 · paired 7 | 9 Easy Things I Do Instead of Doomscrolling / I'm Replacing Doomscrolling With These 9 Habits / Hobbies Instead of Doomscrolling: What Works for Me |
| 04 | TOO TIRED TO STOP SCROLLING? | photo | R3 alone 6.5 · paired 7 | Why Is It So Hard to Stop Doomscrolling? (9 Swaps) / 9 Easy Things I Do Instead of Doomscrolling |
| 05 | LESS PHONE, MORE OF THIS | photo | R3 alone 7 · paired 7.5 | I'm Replacing Doomscrolling With These 9 Habits / 9 Easy Things I Do Instead of Doomscrolling |
| 06 | MY OFFLINE HABITS | collage | R3 alone 6.5 · paired 7 | How to Stop Doomscrolling: 9 Things I Do Instead / Things to Do Instead of Doomscrolling (That I Actually Do) |
| 07 | INSTEAD OF SCROLLING | collage | R3 alone 6 · paired 6.5 | I'm Replacing Doomscrolling With These 9 Habits / 9 Easy Things I Do Instead of Doomscrolling |
| 08 | THE FEED NEVER ENDS | flat | R3 alone 7 · paired 7.5-8 | How to Stop Doomscrolling: 9 Things I Do Instead / Why Is It So Hard to Stop Doomscrolling? (9 Swaps) |
| 09 | 9 EASY SWAPS | flat · **recommended** | R3 alone 7.5 · paired 8 | What to Do Instead of Scrolling on Your Phone (9 Ideas) / I'm Replacing Doomscrolling With These 9 Habits |
| 10 | MY NO-PHONE LIST: 01 READ 02 GET BORED 03 TALK | flat · **recommended** | R3 alone 7.5 · paired 8 | 9 Easy Things I Do Instead of Doomscrolling / I'm Replacing Doomscrolling With These 9 Habits |
| 11 | SWAP THIS → FOR THIS | other · **recommended** | R3 alone 7 · paired 7.5 (R2 paired 8) | What to Do Instead of Scrolling on Your Phone (9 Ideas) / I'm Replacing Doomscrolling With These 9 Habits |
| 12 | MY ANALOG HOBBIES | other | R3 alone 7 · paired 7.5 | 9 Easy Things I Do Instead of Doomscrolling / How to Stop Doomscrolling: 9 Things I Do Instead |

**Test & Compare (critic R3):** 09 9 EASY SWAPS + "What to Do Instead of Scrolling on Your Phone (9 Ideas)", 10 MY NO-PHONE LIST + "9 Easy Things I Do Instead of Doomscrolling", 11 SWAP THIS → FOR THIS. Reserve: 08 THE FEED NEVER ENDS.
The critic's standing notes: the same book-stack sticker shows up in several options (use your own book photo if you have one), and the same webcam frame repeats (your own photos fix this).

## Files
`directions/<NN-name>/{index.html,content.json}` (the source; `tools/gen-first-version.py` and `tools/gen-r2.py` wrote earlier versions and are frozen), look `lib/bingo.css`, `lib/bind.js`,
her frames `assets/frames/`, person layers `assets/scene/` (`tools/personlayer.swift`), cut-outs `assets/cut/` (hard outlines baked by `tools/outline.py`),
Pexels photos `assets/pexels/` + die-cuts `assets/collage/` (Vision object cut-outs; credits in `film/assets/CREDITS.md`). Render: `node render.mjs` (all + overview) or `node render.mjs 09`.

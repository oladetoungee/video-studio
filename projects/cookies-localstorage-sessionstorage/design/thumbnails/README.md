# cookies-localstorage-sessionstorage thumbnails (set 2026-11-19, rework from her 50 picks)

6 thumbnails (projects/THUMBS-REWORK-BRIEF-2026-11-19.md). Kept 01b 03 08, new 15 17 18; 9 retired to
archive/thumbnails-retired-2026-11-19/ (directions/ + png/; to bring one back, move its folder into directions/ and `node render.mjs <id>`).
outputs/thumbnails/01-cart-still-here.png stays only because the shorts' ending card (talking-head.json outroCard) uses it; its
direction folder is archived. The OLD builders in tools/ (make-set-*, set-round*) overwrite content.json: don't run them.

| # | Words | Copies | Photo | Fonts | Score R3 (alone / title) | Title 1 |
|---|---|---|---|---|---|---|
| 01b | why is my cart / still here? | board Thumbnails 21 | shoot 1559 | Font 57 | 7 / 7 · UPLOAD | I Closed the Tab and My Cart Was Still There. Here's Why |
| 18 | what did you / just accept? | pick1119-43 | none (phone + cookie banner) | Font 64 thumbs-09 | 7 / 7 · T&C | Why Every Website Asks About Cookies (Explained Simply) |
| 17 | IT'S NOT JUST COOKIES. | pick1119-22 | Øredev 55642230148 (assets/oredev/orange-thinking.jpg) + cookie + cart cut-outs | Font 35 shorts-01 | 7 / 7 · T&C | Where Websites Really Keep Your Cart and Login |
| 03 | anyone can / read this. (panel: localStorage) | board Thumbnails 31 | shoot 1554 | Font 58 | 7 / 6 | Any Script on Your Page Can Read localStorage |
| 08 | what's in a / browser cookie? | board Thumbnails 91 | none (cookie pair) | Font 14 + Font 63 | 5 / 4 (with "user: ???", reverted to "user: Ada") | How Websites Keep You Logged In (It's a Cookie) |
| 15 | 4 KB vs 5 MB | pick1119-39 | none (chart) | Font 2 design-02 | 6 / 6 (grey ground; orange after, not re-scored) | Cookies vs localStorage: Why Not Just Use the Bigger One? |

Retired today: 01 (replaced by 01b), 05 06 12 13 (gave the answer away), 09 (third "her + UI card"), 10 (yellow UI like 01b; idea rebuilt as 18),
14 your browser remembers you (new, pick1119-35, 5/5) and 16 where does your login live (new, pick1119-42, Øredev stage photo, 4/4).
New fonts copied from library/fonts: Big Shoulders Display, Poppins Bold, TikTok Sans (lib/set.css, LICENCES.txt).
Sheets: outputs/_review/thumbnails-2026-11-19.jpg · outputs/_review/thumbnails-2026-11-19-retired.jpg
Edit: http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ · Render: `node render.mjs`

---

# cookies-localstorage-sessionstorage thumbnails (set 2026-11-13, round 6)

9 thumbnails, 1280x720 (projects/FULL-KIT-BRIEF-2026-11-12.md). Each copies ONE named thumbnail-board item ("Thumbnails N" = item N
of inspiration/boards/thumbnails/board.json), fonts ONLY from the font board ("Font N" = item N of inspiration/boards/fonts/board.json)
in that specimen's own text + ground colours (content.json "fonts", "colours"). Her shoot, outfit A (white shirt), 8 different
photos/poses: 1557 calm · 1562 palm up · 1554 hand on chin · 1559 palm out · 1549 straight · 1553 + 1558 smiling / amused · 1550
explaining (Enhance photo + person layer + cut-out; 1550 1557 1558 1559 1562 copied from dark-patterns' processed set; *-cut-clean.png =
alpha eroded 2 px, no halo). Class no-lift: face untouched. Props: Pexels cookie, cookie pair, carts (../CREDITS.md).
Round 2 (fresh cold critic round 1: none 8+ alone): side splits 5 -> 2 (03, 06); "words left + her right" = 1 (03); one hand-on-cheek
pose; dropped the code thumbnail (duplicated "is it safe"), the stock triptych and the brush sketch; new 02 WHICH ONE?, 07 TODAY /
TOMORROW, 09 logged-in browser card, 10 browser window with real objects.
Mix: photo 3 (01 06 09) · cut-out 3 (02 03 04) · split photo 1 (07) · flat 1 (05) · object 2 (08 10). No face: 05 08 10.
Upload 01 + "localStorage Explained: Why Your Cart Is Still There"; Test & Compare 02 + 06. outroCard path unchanged (01-cart-still-here.png).
Scores: builder self-check (alone / with title 1), NOT a fresh critic.
Sheets: outputs/_review/thumbnails-vs-board.jpg · outputs/_review/thumbnails-320.jpg · outputs/thumbnails/overview.png
Edit: http://localhost:7700/design/cookies-localstorage-sessionstorage/thumbnails/ · Render: `node render.mjs` · board sheet: `python3 tools/vs-board.py`
Builder: tools/make-set-2026-11-13.py + tools/set-round2.py (rewrite content.json + index.html, keep scores + her nudges).
Binned: set 2026-11-10 -> ~/.Trash/cookies-thumbnails-old-2026-11-13/; round-1 drops -> ~/.Trash/cookies-thumbnails-round1-2026-11-13/.

Round 3 (critic round 2: 03 05 06 08 best): dropped 07 TODAY/TOMORROW (mic in both halves, halves alike) and 10 (same trio as 02); 01 now flat #1C1C1C + one question block; 02 no props; 04 she holds the cookie on her palm (person layer, no fringe), title distinct from 08; 05 kept / gone, empty form shown; 06 full column names + cart row lit; 09 HOW AM I STILL LOGGED IN?. Round-2 drops: ~/.Trash/cookies-thumbnails-round2-2026-11-13/. Builder now also loads tools/set-round3.py.

Round 4 (last; critic round 3 none 8 alone): dropped 02 WHICH ONE? and 04 cookies label (-> ~/.Trash/cookies-thumbnails-round3-2026-11-13/); 01 her left (person layer 1559, no matte fringe) presenting a generic browser cart window; 03 storage panel (email / token / cart) replaces the padlock; 05 "gone" on red; 06 full margin, short heads; 09 no text shadow, darker room, card +15%; NEW 10 COOKIES behind her (Thumbnails 80), 11 real scene at her desk (shoot 1556, Thumbnails 46), 12 Close the tab checklist (Thumbnails 36), 13 COOKIES or LOCALSTORAGE? corners (Thumbnails 13). Builder loads tools/set-round4.py (patches round 3 -> round 2).

Round 5 (final; critic round 4): every cut-out is now assets/shoot/<n>-hard.png (person layer, hard mask, 0 px halo); 01 yellow ground (Font 57 colours swapped); 03 dark key/value panel 42 px; 05 sessionStorage headline, kept/gone 72 px, phones tilted in; 06 flat #2B2B2B, rows cookie / localStorage / sessionStorage 48 px; 08 ticket "user: Ada / logged in: yes"; 09 her right, card left; 10 COOKIES across her chest, all letters clear (Thumbnails 58); 11 rebuilt, no face, a browser as a chest of drawers; 12 tab with X + the three names, red strike; 13 split ground black / red, COOKIES vs LOCALSTORAGE. Builder loads tools/set-round5.py (patches 4 -> 3 -> 2).

Round 6 (final critic on round 5: 01 08 09 ship-ready): 03 panel rows 50 px; 05 rebuilt (two whole phones, refresh: still there / close tab: gone); 10 rebuilt as 10-why-websites-ask-about-cookies (phone with a generic cookie banner, no face); 11 dropped (could not reach 8); 12 rebuilt with a browser tab and its X; 13 no face, cookie + "user: Ada" vs cart + "cart: 2 items". Round-5 drops: ~/.Trash/cookies-thumbnails-round5-2026-11-13/. Builder loads tools/set-round6.py.

| # | Words on it | Kind | Copies | Fonts | Score (alone / with title) | Titles (1 = best pair) |
|---|---|---|---|---|---|---|
| 01 | why is my cart / still here? | cut-out | Thumbnails 21 | Font 57 | 8 / 8.5 (self-check round 6) · UPLOAD THIS with title 1 | localStorage Explained: Why Your Cart Is Still There / How Websites Remember Your Cart (localStorage vs Cookies) / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 03 | localStorage isn't private. | cut-out | Thumbnails 31 | Font 58 | 8 / 8 (self-check round 6) | Is localStorage Safe? Who Can Read Your Data / localStorage vs Cookies: Which Is More Secure? / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 05 | sessionStorage: refresh = still there / close tab = gone | flat | Thumbnails 69 | Font 49 | 8 / 8.5 (self-check round 6) | sessionStorage: Why Your Form Disappears When You Close the Tab / sessionStorage vs localStorage: What Survives a Closed Tab? / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 06 | WHAT GOES WHERE? | photo | Thumbnails 63 | Font 61 + Font 58 | 7.5 / 8 (self-check round 6) | localStorage vs sessionStorage vs Cookies (What Goes Where) / Cookies vs localStorage vs sessionStorage: Which One to Use? / Where Online Shops Keep Your Login, Cart and Form |
| 08 | what's in a browser cookie? | object | Thumbnails 91 | Font 14 + Font 63 | 8 / 8 (self-check round 6) · Test & Compare | What's Actually Inside a Browser Cookie? / How Login Cookies Work: Session IDs Explained Simply / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 09 | HOW AM I STILL LOGGED IN? | photo | Thumbnails 44 | Font 72 | 8 / 8 (self-check round 6) · Test & Compare | Why Websites Need Cookies (How You Stay Logged In) / How Login Cookies Work: Session IDs Explained Simply / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 10 | why every website asks about cookies | object | Thumbnails 112 | Font 67 + Font 58 | 8 / 8.5 (self-check round 6) | Why Websites Need Cookies (Explained Simply) / What Are Browser Cookies? Why Every Site Asks You to Accept Them / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 12 | Close the tab. What's left? | flat | Thumbnails 36 | Font 17 | 7.5 / 8 (self-check round 6) | Close the Tab: What Your Browser Keeps (Cookies vs localStorage vs sessionStorage) / Why Your Cart Stays but Your Checkout Form Disappears / localStorage vs sessionStorage vs Cookies (What Goes Where) |
| 13 | COOKIES vs LOCALSTORAGE | split | Thumbnails 13 | Font 56 + Font 63 | 8 / 8 (self-check round 6) | Cookies vs localStorage: Which Should You Use? / localStorage vs Cookies: Where Should Your Data Go? / Cookies vs localStorage (Explained With an Online Shop) |

Fresh cold critic on round 6 (PNGs + titles only, 2026-11-13; the table's scores above are the builder's): 01 6/7 · 03 7/8 · 05 6/7 ·
06 6/7 · 08 7/7 · 09 6/5 (its title 1 said "cookies" while the picture doesn't; retitled after: "How Do Websites Keep You Logged In?
(Cookies Explained)") · 10 7/7 · 12 6/7 · 13 6/7. None reached 8 alone in six critic rounds (the same unchanged PNGs moved 1-2 points
between rounds). Its open points: 4 of 9 are "her + a UI card"; small text at 320 px (01 URL, 05 form fields, 06 table heads, 12 struck
line); 13's cart edges; 08 and 13 share the cookie photo. content.json "scores" now carry the critic's numbers.

2026-11-16: 01b-cart-still-here = 01 with the two empty cart squares filled (assets/collage/product-shoe.svg, product-bottle.svg, drawn here, no brand; pictures p1/p2). Cold critic: 01 5 -> 01b 7, kept. 06b/09b/12b tried and not kept (archive/thumbnails-weakest-2026-11-16/). Fonts added: BricolageGrotesque.ttf, CaveatBrush-Regular.ttf (used only by the archived drafts).

# http-status-codes thumbnails (set 1, 2026-11-06; re-typed 2026-11-07)

**2026-11-07 (her feedback):** re-typed to set 02 Bold condensed (Anton UPPERCASE headlines, Inter Tight, DM Mono; `lib/hs.css`),
no tilted / shadowed cards, no outlines or sticker borders, colour cut-outs only; 01-08 now use her studio photos
(`assets/photo/headshot.png`, `seated.jpg`, person layers by `tools/personlayer.swift`) on flat group-colour grounds.
05 now says "SERVER'S FAULT", 13 "201 = CREATED", 04 "401 VS 403" (Anton has no ≠). Cold critic (contact sheet, before these
fixes): 02 7, 10 7, 11 7, 15 7; top three to post: 02, 10, 15. Older scores below are for the Funnel version.

17 thumbnails, 1280x720, in the film's picked look B "The First Digit": one flat ground per class of code (1xx stone #D9D4C7,
2xx mint #8FE3B0, 3xx sky #8EC5FF, 4xx amber #FFA51F, 5xx tomato #FF5A3C), ink #121212, white cards, Funnel Display 800 for numbers
and headlines, Funnel Sans for words, the odometer digit. PNGs: `outputs/thumbnails/` (+ `overview.png`, recommended first, with the
words, 2-3 titles and scores under each). Edit in the studio: http://localhost:7700/design/http-status-codes/thumbnails/

## Mix (THUMBNAILS.md quota)
- Photo background, her real frame, room in grey washed one class colour, she in full colour (6): 01 amber, 02 split amber/tomato, 03 stone,
  04 amber, 05 tomato, 06 stone.
- Collage over her full natural photo (2): 07 keycard polaroid + 401/403 stickers, 08 four code stickers + one serif line.
- Flat graphic (6): 09 request -> response with her cut-out, 10 the odometer (no face), 11 five-colour cheat sheet (no face),
  12 400 or 422 (black-and-white cut-out), 13 201 (colour cut-out), 14 find vs findOrFail (black-and-white cut-out).
- Other, no face (3): 15 a leaking JSON error, 16 GitHub's real docs (cropped, credited), 17 a generic DevTools Network panel.

Her frames (never flipped) were picked by measuring every third of a second of the recording with macOS Vision
(`tools/scan.sh` + `tools/facescore.swift`: mouth closed, eyes open), after the critic flagged mid-word and eyes-closed frames.
All are video frames with the clip-on mic; your own photos (kit question 10) would lift every photo option: drop one on a photo in the editor.

## Scores (three fresh cold critics, default reject; 8 = post as is)
Nothing reached 8. The gap is mostly her face: every frame is mid-sentence from the recording with the clip-on mic. Your own photos
(no mic, mouth closed, looking at the lens) would lift the photo ones by about a point each: drop one on a photo in the editor.

| # | Words on it | Kind | Scores | Titles (1 = best pair) |
|---|---|---|---|---|
| 01 | HTTP STATUS CODES | photo | cold critic R1 5 · R2 6.5 · R3 alone 6.5, with title 6.5 (fixes after R3 not re-scored) | HTTP Status Codes Explained: 200, 404, 500 and More / Every HTTP Status Code You Will Actually Use / HTTP Status Codes Explained: Is It You or the Server? |
| 02 | 4XX = YOU / 5XX = SERVER | photo · **recommended** | cold critic R1 6 · R2 7 · R3 alone 7.5, with title 7.5 (fixes after R3 not re-scored) | HTTP Status Codes Explained (and the Mistakes to Avoid) / HTTP Status Codes Explained: Is It You or the Server? / API Status Codes Explained for Backend Developers |
| 03 | BUT IT FAILED (under a 200 OK) | photo | cold critic R1 6.5 · R2 6 · R3 alone 6.5, with title 7.5 (fixes after R3 not re-scored) | Stop Returning 200 OK for Errors (HTTP Status Codes) / Why Your API Shouldn't Send 200 OK for an Error / HTTP Status Code Mistakes That Break Your Frontend |
| 04 | 401 ≠ 403 | photo | cold critic R1 5.5 · R2 5.5 · R3 alone 6.5, with title 7 (fixes after R3 not re-scored) | HTTP 401 vs 403: Unauthorized vs Forbidden Explained / The HTTP Status Codes Developers Mix Up the Most |
| 05 | NOT YOUR FAULT (503) | photo | cold critic R1 5 · R2 6 · R3 alone 6.5, with title 7 (fixes after R3 not re-scored) | HTTP Status Codes Explained: Is It You or the Server? / HTTP Status Codes Explained (With Real API Examples) / HTTP Status Codes Explained: 200, 404, 500 and More |
| 06 | READ THE FIRST DIGIT | photo | cold critic R1 6 · R2 6.5 · R3 alone 7, with title 7.5 (fixes after R3 not re-scored) | How to Remember HTTP Status Codes Without a Cheat Sheet / Every HTTP Status Code You Will Actually Use / HTTP Status Codes Explained: Is It You or the Server? |
| 07 | 401 vs 403 (keycard) | collage | cold critic R1 – · R2 4.5 · R3 alone 4.5, with title 5 (fixes after R3 not re-scored) | HTTP 401 vs 403: Unauthorized vs Forbidden Explained / The HTTP Status Codes Developers Mix Up the Most |
| 08 | status codes, explained | collage | cold critic R1 4.5 · R2 5.5 · R3 alone 5.5, with title 6 (fixes after R3 not re-scored) | Every HTTP Status Code You Will Actually Use / HTTP Status Codes Explained (With Real API Examples) / HTTP Status Codes Explained With a Bookstore API |
| 09 | HTTP STATUS CODES (request → response) | flat · **recommended** | cold critic R1 – · R2 7.5 · R3 alone 7, with title 7.5 (fixes after R3 not re-scored) | HTTP Status Codes Explained With a Bookstore API / HTTP Status Codes Explained (With Real API Examples) / HTTP Status Codes Explained: 200, 404, 500 and More |
| 10 | FIRST DIGIT = WHO BROKE IT | flat | cold critic R1 4.5 · R2 6 · R3 alone 6, with title 6.5 (fixes after R3 not re-scored) | HTTP Status Codes Explained: Is It You or the Server? / API Status Codes Explained for Backend Developers / How to Remember HTTP Status Codes Without a Cheat Sheet |
| 11 | HTTP STATUS CODES (five classes) | flat · **recommended** | cold critic R1 6.5 · R2 6.5 · R3 alone 7, with title 7.5 (fixes after R3 not re-scored) | Every HTTP Status Code You Will Actually Use / HTTP Status Codes Explained: 200, 404, 500 and More |
| 12 | 400 OR 422? | flat | cold critic R1 6.5 · R2 6 · R3 alone 6.5, with title 7 (fixes after R3 not re-scored) | HTTP 400 vs 422: Which One Should Your API Return? / REST API Status Codes: Which One Should You Return? |
| 13 | CREATED SOMETHING? 201 | flat | cold critic R1 3 · R2 4.5 · R3 alone 5, with title 5.5 (fixes after R3 not re-scored) | REST API Status Codes: Which One Should You Return? / API Status Codes Explained for Backend Developers / HTTP Status Codes Explained (With Real API Examples) |
| 14 | find() vs findOrFail() | flat | cold critic R1 6.5 · R2 6.5 · R3 alone 6.5, with title 7 (fixes after R3 not re-scored) | HTTP Status Code Mistakes That Break Your Frontend / HTTP Status Codes Explained (Laravel API Examples) |
| 15 | YOUR 500 IS LEAKING | other · **recommended** | cold critic R1 7 · R2 7 · R3 alone 7, with title 7 (fixes after R3 not re-scored) | HTTP Status Code Mistakes That Break Your Frontend / HTTP Status Codes Explained (and the Mistakes to Avoid) |
| 16 | 404, NOT 403. ON PURPOSE. | other | cold critic R1 5 · R2 5.5 · R3 alone 5.5, with title 6 (fixes after R3 not re-scored) | The HTTP Status Codes Developers Mix Up the Most / HTTP 401 vs 403: Unauthorized vs Forbidden Explained |
| 17 | WHAT THESE NUMBERS MEAN | other | cold critic R1 6.5 · R2 6.5 · R3 alone 6.5, with title 7 (fixes after R3 not re-scored) | HTTP Status Codes Explained: Is It You or the Server? / HTTP Status Codes Explained: 200, 404, 500 and More / Every HTTP Status Code You Will Actually Use |

**Test & Compare (critic R2 + R3):** 02 4XX = YOU / 5XX = SERVER, 09 request -> 404, 11 the five-colour cheat sheet (one title for all
three: "HTTP Status Codes Explained: Is It You or the Server?"). 15 YOUR 500 IS LEAKING is the strongest no-face option for the mistakes titles.
**Near-duplicates (keep one if you trim):** 401 vs 403: 04 / 07 / 16 · first digit: 06 / 10 / 11 · one error card beside you: 01 / 05 · "200 but failed": 03 / 15.
**After R3 (not re-scored):** headlines moved to Funnel Sans 800 (Funnel Display's b spur read as a dot: "G.bemi"), 07 and 08 serif lines
on a paper strip, 03 says 200 OK once, 11 labels You / Server, 16 shows only GitHub's highlighted sentence.

## Files
`directions/<NN-name>/{index.html,content.json}` (`tools/gen-first-version.py` wrote them; once you edit one in the studio its
content.json is yours), look `lib/hs.css`, `lib/bind.js`, her frames `assets/frames/`, aligned person layers `assets/scene/`, cut-outs
`assets/cut/`, GitHub capture `assets/src/` (`tools/capture-para.mjs`, provenance in the .json next to it), keycard photo `assets/props/`
(Pexels, credited in `film/assets/CREDITS.md`). Render: `node render.mjs` (all + overview) or `node render.mjs 07`.

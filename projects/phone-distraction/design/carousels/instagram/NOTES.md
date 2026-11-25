# Instagram carousel: notes (2026-10-13, design agent)

10 slides, 1080x1350. PNGs + `overview.png` in `outputs/carousels/instagram/` (copy in `~/Downloads/phone-distraction-carousels/instagram/`).
Look: the film's look A "Lock screen" (ink #0C0D10 / paper #F2EFE9, badge red #FF4433, Inter Tight, IBM Plex Mono labels >= 32 px, one Newsreader italic word, notification cards). Generic phone / web / app drawings only, tagged ILLUSTRATION. Hook from `kit/refined-kit.md` section 8 ("Books end. Your feed doesn't.", 8/10 there).

## Edit and re-render
- Browser: http://localhost:7700/design/phone-distraction/carousels/instagram/ (edit text in place, move, colours, photos, live checks, export).
- Or edit `content.json` (`*accent*`, `_serif_`, `\n`) and run `node shared/build.mjs instagram` from `design/carousels/`. Layouts and visuals: `shared/build.mjs`; look: `shared/base.css`.
- Checks run on every build: text into the footer or margins (only what is visible), mono labels under 32 px, one-word last lines, photos near text.

## Slides
| # | Ground | Copy |
|---|---|---|
| 01 | ink | Books end. Your feed doesn't. 5 design choices that keep you scrolling, and what to switch off. (book "The End" vs a feed running off its box) |
| 02 | ink | You don't pay. Your time does. Ads between posts (ILLUSTRATION). "Your attention is, in a way, the product." (her words) |
| 03 | paper | 01 Pull-to-refresh: Pull down. Maybe something. Maybe nothing. Three reels: a like / a message / nothing. Works like a slot machine. Brichter: "Pull-to-refresh is addictive." (The Guardian, 2017) |
| 04 | paper | 02 Infinite scroll: Websites had a Next page button (faded, GONE). That click was a stopping point (her words). |
| 05 | ink | 03 Autoplay: Stopping takes effort. Going on takes none. (her words) Up next 5. Few people change defaults. |
| 06 | ink | 04 Red badges: The badge was once blue. Reportedly (Tristan Harris quoting a friend at Facebook, The Guardian 2017). |
| 07 | ink | 05 Likes: You post. Then you keep checking. "A small burst of approval" (her "a small burst of social approval"). |
| 08 | paper | Europe, 2026: Europe says this design may break the law. Real Commission screenshot (10 Jul 2026). Preliminary, not final. |
| 09 | ink | Make your phone boring: grayscale (Holte and Ferraro: students, about 38 min a day less), autoplay off, notifications you don't need off, apps off the home screen. Save this for tonight. |
| 10 | red | Your attention is worth taking back. Her question: "what do I need from it right now?" Send this to someone who scrolls in bed. Full video + @WithGbemi + her photo (7:22, warmed frame). |

Before posting: set slide 10's `video` to the final YouTube title if it changes (now the strategist's main title S8).

## Critique
Cold critic round 1: 7/10 (fixed: banned edge strip on a card, the "0" reel unlabeled, the cross over Next page, the repeated idea on 07, unsourced default claim softened, grayscale study named, the letterbox on the photo, a save/send line, decorative eyebrows cut). Round 2: 7/10; round 3: 8/10 (its last small fixes applied).

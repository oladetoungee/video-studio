# Reading Motion v2: plan

> **v3 (Oct 2026):** the content pass in `CONTENT_PASS.md` supersedes the section table below for what is on screen
> (real covers and spines from her footage, diagrams, chapter map, shelves, bridge, new sound). The design system is
> unchanged. The title card is now 1.8 s (was 3 s), so video time = v2 time − 1.2 s; total 959.03 s.

A motion-graphics YouTube explainer (1920×1080, 30 fps) over her own narration. v2 is a full visual rebuild in
her own design language; the audio edit, word timings and captions are reused unchanged from v1.
Video time = 3 s title card + edited voice (951.2 s) + ~6 s end card = **960.24 s**. The title card holds until
just before her first word (3.36 s). Timestamps below are video time.

## Why v2
v1 (a deep-indigo "night library" with gradients, drifting dust, glows, Outfit + Fraunces and slow camera pushes)
was rejected as tacky. Her brief: clear colours, clear text, enough white space. v2 is built from her own decks
(`inspiration/my-decks/`) and the motion reference she loves.

## Design system (`studio/runtime/house.js`, shared)
- **Grounds, flat only:**
  - paper `#EDE9E2`
  - ink `#111114`
  - card `#FFFDF6`
  - full-bleed electric blue `#1B3FD8` for punchlines
- **Accent:**
  - Blue, used on one key word, number or rule per scene (`#6E8CFF` on ink, her deck's "blue as text in dark").
  - Safety orange `#FF4713` exactly three times: "STRUCTURE", "1940" and the fiction "!".
- **Never used:** gradients, glows, vignettes, particles, textures or drama shadows.
- **Grid:** a thin 160 px grid on some ink and blue slides only, as in her Uber and 404 decks.
- **Type (full font files from the google/fonts repo, in `fonts/`):**
  - Bricolage Grotesque 800 for display: uppercase, −0.03 em tracking, 0.92 leading.
  - Archivo 700 for sentences.
  - DM Mono for labels, numbers and corners (uppercase, letter-spaced).
  - Instrument Serif italic for one elegant accent word, with a hand-drawn underline.
- **Corners (the reference's HUD):** `// 04 — the method` top-left and `HOW TO READ  00:01:42:15` top-right.
- **Motion:**
  - Every word snaps in on the word she says it: blur to sharp with a 0.12 em rise, fast in (expo) with a soft settle.
  - A different ground is a hard cut.
  - The same ground is a 0.26 s horizontal motion-blur whip.
  - Cards slide in, UI text and captions type on with a caret, a cursor clicks, and underlines and strikes draw on.
  - Beats leave with a 0.16 s fade and lift.
  - Nothing floats aimlessly.

## Scene vocabulary and where it comes from in her work
| Layout | Used for | Her source |
|---|---|---|
| Kinetic statement (small line + huge uppercase, one blue word) | "READING STACK.", "BOOK ONE.", "A GAP PROBLEM." | "SO UBER LEFT NIGERIA.", "WHAT HAPPENS WHEN YOU TYPE A URL" |
| Single sentence, centred, eyebrow | "So what is this book about?", "Who is *creative?*" | "THE QUESTION" slide |
| Numbered index (mono 01 + uppercase line + hairline rule) | the three books, the Baratta contents, inspectional steps, parts, recap | "YOUR STARTUP COULD CLOSE." list |
| Full-bleed blue punchline | "READ THE STRUCTURE FIRST.", "THE SHELVES", "A MANUAL *masquerading as* A TEXTBOOK." | "IT'S NOT HARD, IT'S A QUERY." |
| Blue grid + huge bleeding number | *How to Read a Book*, 1940 | 404 slide |
| UI mockups (browser, contents card, to-read list, subscribe, phone, comments) + cursor | method, Pinterest/YouTube, Justin Sung, comments | 404 browser cards, "YOU ARE IN YOUR BROWSER", reference cursor |
| Polaroid of the real cover, mono caption | Baratta, Convivial Toolbox | Uber deck inset print |
| Meter (outlined bar, mono labels) | memorising vs skimming, anticipation, page counts | "IN FLIGHT" slide |
| Serif accent word | "A few *minutes* for a book.", "*remember it.*" | reference "in *minutes.*", "*sell?*" |

## Sections
| Time | Section | What we see |
|---|---|---|
| 0:00 | intro | Paper title card: "HOW TO READ / and actually *remember it.*" |
| 0:03 | the stack | "SO, THIS IS MY CURRENT READING STACK." on ink + grid. A YouTube window where the cursor presses play and the quote types. The three books as a numbered list, with polaroids of the real covers ("FROM THE LIBRARY", "FOR MY THESIS"); Miss Marple struck through, "FICTION — NOT TODAY". |
| 0:51 | today | "A reading method to *remember* a huge chunk of what you read." |
| 1:03 | the problem | "YOU READ A BOOK." + a days → weeks meter. "So what is this book about?" "THE GIST. THE VIBE." (permanently soft) vs "ONE OR TWO THINGS." "YOU CAN'T PINPOINT IT." "the feeling about the book". Blue: "THIS METHOD FIXES THAT." |
| 1:37 | the method | Blue grid: "READ THE STRUCTURE FIRST." A new book, then its contents card with chapters, sub-headings and layout labelled, and "flip and start reading" struck. 01 read the structure / 02 then read the book. |
| 2:07 | an old idea | Pinterest and YouTube browser windows. "IT'S AN OLD IDEA." Blue grid: *How to Read a Book*, Mortimer J. Adler, orange 1940. The cursor adds it to a to-read list. |
| 2:29 | inspectional reading | "INSPECTIONAL *reading.*" Index: contents page, chapter titles, sub-headings, a little skim. |
| 2:47 | priming | Justin Sung channel card (the cursor clicks subscribe). "PRIMING." "Ask *how the parts connect.*" + connecting parts. "The TikTok version: MEMORISE IT." + phone contents. Memorising vs skimming meters, "THE MAPPING GETS STRONGER." |
| 3:31 | why it works | "So why does this *work?*" "SOMEWHERE TO PUT THINGS." Reading cold: idea cards pile up ("Nowhere to *file it*", "Nothing to *attach to*"). Shelves CH 01–06 with ideas snapping on. Blue: "YOU'RE BUILDING THE SHELVES *before you put something on them.*" |
| 4:28 | book one | "BOOK ONE." + polaroid. Title with READ and WRITE marked in blue. "10 CHAPTERS" + the contents, row by row as she reads (in the book's order). |
| 5:36 – 9:08 | chapters 01–10 | ch 1 a question, an empty dictionary card, "BE CRITICAL." repetition, the definition filled in, challenged? / supported? · ch 2 tip cards · ch 3 life skill / marked well / philosophical, then blue "PRACTICAL ACADEMIC STRATEGY." · ch 4 critical thinking/writing/reading + the questions · ch 5–7 "A BLOCK: STRUCTURE." · ch 8 the four approaches · ch 9 quotes, plagiarism · ch 10 "*hedging.*", critical / not critical |
| 9:08 | my guess | "All of these are still *my guess.*" right? / wrong? "MY MIND HAS A POSITION." |
| 9:23 | book two | "BOOK TWO." + polaroid. CONVIVIAL TOOLBOX with the authors typed and "PETER" backspaced to "PIETER JAN STAPPERS". The three major words. "What does *convivial* mean?" Dedicated to Ivan *Illich*. Tools that give power back, with an expert → user slider. "DESIGN RESEARCH TOOLS FOR ORDINARY PEOPLE, NOT JUST RESEARCHERS." |
| 10:39 | structure | Parts 1–3, the page-count bars (80 / 50 / 140+), "OPENS WITH THEORY. VERY PRACTICAL." Blue: "A MANUAL *masquerading as* A TEXTBOOK." THEORY → PRACTICE. |
| 11:39 | book two ch 01 | Sub-headings; "Who is *creative?*"; her three quotes; "ORDINARY PEOPLE." everybody / nobody / a select few; linked to CONVIVIAL; a shelf. |
| 13:00 | book two ch 10 | "BRIDGING." + the 4 questions. "THERE'S A GAP PROBLEM." The same page read primed (gap marked) vs read cold (missed). |
| 13:49 | worth it | "IT FEELS LIKE A LOT OF WORK." then "A few *minutes* for a book." "IT RAISES YOUR ANTICIPATION." + a filling meter. |
| 14:32 | recap | Blue: "NON-FICTION: A NO-BRAINER." Index of the steps. "MEMORISE IT." |
| 15:07 | fiction? | Miss Marple as a type-only book card. "Not for fiction." "Has a contents page?" "?" becomes an orange "!". |
| 15:31 | the method | Blue index: read the structure / headings & chapters / take a guess / then read the book. |
| 15:41 | your turn | "WHAT'S IN YOUR READING STACK?" + a comment box typing, with the cursor clicking send. |
| 15:54 | end | The title card again, "SEE YOU IN THE NEXT ONE". |

## Audio
The voice edit, music bed and loudness target are as in v1 (see README). The SFX are re-cued to the v2 visuals, with
168 cues (v1 had 329).

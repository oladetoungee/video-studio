# Carousels: What is UX research (ux-research, 2026-10-13)

Two decks, both 1080x1350, in the film's approved look (direction A, the research wall): deep-green wall `#1D3A32` ("ink" ground), warm
paper, canary and orange sticky notes, index cards with a red head rule and blue lines, paint-marker strikes and circles; Schibsted
Grotesk 900 headlines, Permanent Marker on notes, Courier Prime on cards, DM Mono labels (>= 32 px). Built from the refined kit's
hooks (`kit/refined-kit.md` section 7) and only what she says in the recording (`BRIEF.md`).

- **Instagram** (10 slides, general audience): hook "That app you hate using?" (two notes: where's the pay button? why so many ads?) -> UI vs UX cards -> great UI, terrible UX (checkout
  illustration, pay button a tiny grey word) -> what UX research is -> apps fail two ways -> users don't do what they say -> three
  pairs -> 7 ways to study users -> no budget? -> "Good design doesn't start with screens. It starts with people." + @WithGbemi.
- **LinkedIn** (10 slides + `carousel.pdf`, career audience): hook "Products fail two ways." with the two ways as notes (from an HCI
  master's student) -> even with AI, building is expensive -> UI vs UX -> how a study runs (5 notes) -> say vs do -> three pairs ->
  no research budget -> the job market, plainly (752 vs 17,339 with bars to scale, AcademyUX, Sep 2026) -> how to get in -> the
  closing line + repost ask.

## Edit and build
- Browser: http://localhost:7700/design/ux-research/carousels/instagram/ and http://localhost:7700/design/ux-research/carousels/linkedin/
- Text in `<deck>/content.json` (markup: `*accent*`, `_serif_`, `~struck~`, `{circled}`, `\n`), then `node shared/build.mjs instagram linkedin`
  -> `outputs/carousels/<deck>/NN.png`, `overview.png`, LinkedIn `carousel.pdf`; copies in `~/Downloads/ux-research-carousels/`.
- New layouts in `shared/build.mjs`: `notes` (sticky-note wall), `cards` (UI / UX index cards with notes), `phone` (checkout
  illustration + marker callout + zoom bubble), `quote` (index card with struck / circled words), `stat` (big sourced numbers + bars),
  `pairs` (the three pairs as note pairs), `methods` (wide notes: method + what it means); `hook` can carry notes.

## Honesty
- The checkout, the "I always use search" / "taps the menu instead" notes and the five people are illustrations, marked
  ("// illustration", "// an example").
- The closing line is credited only to "a Medium article": the author named in her kit could not be confirmed (BRIEF.md). If she
  confirms it, add the name to the credit line.
- The one-line meanings of the 7 methods (Instagram slide 8) are standard definitions, not her words (she only names card sorting
  and A/B testing); "Many people, briefly" for surveys paraphrases hers ("reach many, less depth").
- Job numbers: AcademyUX, published 15 Sep 2026 (US, August 2026). Not her words; shown with the source.
- Not used: the no-coding line, the card-sorting explanation, the book title, the comment ask (not in her recording); Don Norman (no
  decade shown anywhere).

## Checks
`build.mjs`: checks clean on both decks (margins, footer, mono >= 32 px, no one-word last lines, photos clear of text).
Cold critic rounds (fresh critic each time, PNGs only): round 1 Instagram 6 / LinkedIn 4 (broken cover photo, empty middles); round 2
7 / 7; round 3 7.5 / 8; round 4 7.5 / 8 (LinkedIn passes); round 5 (Instagram only) 7.5. Its top fixes were then applied without a further
round: slide 7 plain words only, slide 8 colours by meaning (yellow ask / orange watch) with a key, SAYS/DOES on slide 6, a 2-line cover,
thinner strike on the closing card. LinkedIn passes (8); Instagram last scored 7.5 before those fixes.

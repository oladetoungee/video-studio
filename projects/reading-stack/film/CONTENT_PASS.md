# Content pass (v3): more visuals, real sound

Her note on v2: "a very good place to start… we need more visuals", and "give it sound, your own kind of sound".
Her style stays (flat grounds, heavy type, one accent, space, her deck vocabulary). What changes is the substance in
the frame: real imagery from her footage, honest coded illustrations and diagrams, richer UI, more motion vocabulary,
and a 9:16 that is composed for the phone instead of shrunk.

## Rules for this pass
- **Real imagery** (her footage, book only, flipped so the text reads): the three spines of her stack (0:15 of the raw
  file, `tools/realframes.py`), the Miss Marple cover (0:58.5), and the sharper Baratta / Convivial crops from the
  carousel assets. Her face never appears.
- **Illustrations are honest**: shelves, maps, Venn, bridge, crowd, calendar, chapter blocks are diagrams of what she
  says, never invented book content. UI mockups are generic ("video", "pins", "short video"), not copies of a brand UI.
- **Recurring objects** carry the story: the stack (title → book one → book two → your turn), the 1940 → now timeline,
  the chapter map (10 blocks: read → grouped into a block → guessed), the shelves.
- **Something meaningful every 2-4 s**; no hold over ~4 s (measured with `tools/holds.mjs`, camera push disabled).
  A slow camera push (log-space zoom, ≤ 3.5 %) only polishes; it never counts as the change.
- **Motion vocabulary added**: masked text rise, highlighter sweep, strike, counters, meters, cards that stack and fan,
  shared-element handoffs (spine → cover), colour floods into the blue punchlines, subframe motion blur on big moves.
- **9:16**: type 15-30 % bigger, visuals fill y 370-1440, captions keep 1460-1660.

## Sound
Rebuilt around the visuals, clearly audible, under the voice:
typing for type-on · pencil/marker for strokes and underlines · page and paper for books and cards · pops for things
landing · whooshes on moves and section cuts · a satisfying impact on the core ideas · a soft riser into the key
statements. Each cue sits on its measured peak at the visual frame. Levels measured (`tools/levels.py`): SFX clearly
above the ducked music, below the voice.

## Per section (what we add and why)
| Section | Add | Why |
|---|---|---|
| 0 title | Her three real spines drop onto a stack beside the title | a real object in the first second |
| 1 the stack | The spines stay (shared element across the cut); "stack-again" rebuilds the stack big; the video window gets a heart on "I love this" and the phrase underlined | the stack is the subject; the second stack scene was a repeat |
| 2 three books | Covers fan in as she names each (real Baratta, Convivial, Marple photos), captions type on, Marple gets struck and slides away | 31 s of one list; three real books |
| 3 today | A book as a column of pages; a big chunk fills ("a huge chunk"); the two test books appear on "practically" | the promise as a picture |
| 4 the problem | Calendar grid filling days → weeks; a chat bubble asks the question; a crosshair that can't lock on ("pinpoint"); the book vs the feeling as two cards; colour flood into "THIS METHOD FIXES THAT" | each line had only type |
| 5 the method | Riser + impact into "STRUCTURE"; the new book flips open to its contents; rows map into blocks; a "pages read: 0" counter that stays at 0 | the core idea gets a mechanism |
| 6 an old idea | Richer generic pins/video mockups; a 1940 → now timeline; "1940" counts down from 2026; the to-read list | "old" made visible |
| 7 inspectional | A scan line inspecting a contents page; a book diagram whose parts light with each step | the list gets a picture |
| 8 priming | Timeline marker moves to now; a heading map whose links connect; a phone with a short-video card; memorising vs skimming meters, then the map's links thicken | "mapping stronger" shown literally |
| 9 why it works | Empty pigeonholes ("somewhere to put things"); reading cold: a chapter ruler advances while idea cards pile up; shelves with spines where ideas slot in; flood into "THE SHELVES" | the film's central metaphor, drawn |
| 10 book one | The Baratta spine slides out of the stack and turns into the cover; a library shelf; the title marked; the chapter map: 10 blocks fill while she reads the contents, with a counter | 40 s list → a map we reuse |
| 11-17 chapters | Block 01 zooms into the question; chat bubbles pile up "be critical"; a video card of hers; tips fan out; a score-band bar; a Venn of thinking/writing/reading that separates and bundles; blocks 05-07 merge into STRUCTURE; a speech bubble branching to interpretations; quote marks; a blank "hedging" dictionary card (she doesn't know yet) | every chapter beat gets one visual idea |
| 18 my guess | Every block gets a "?"; the crosshair from "pinpoint" now locks ("a position") | callback, payoff |
| 19-20 book two | The Convivial spine slides out (thicker: "bigger"); cover with its title words boxed as she names them; dictionary card for "convivial"; dedication; power slider | real object + her reading of the title |
| 21 structure | A book bar split by parts (80 / 50 / 140+ pages, her numbers) carried across three scenes; page counters; "more than half" bracket; flood into "A MANUAL" | numbers become proportions |
| 22 ch 01 | Quotes as speech bubbles; a "how creative" meter (me vs people I meet); a crowd of figures for everybody / nobody / a select few | the claim about people, shown with people |
| 23 ch 10 | A gap and a bridge that builds as she reads the questions; reading line passes the gap cold, stops primed | "gap" drawn |
| 24-25 worth it, recap | A clock wedge for "a few minutes"; question marks popping as anticipation rises; a check that draws on "no-brainer"; recap rows with a contents card ticking; a sticky note on "it sticks" | holds broken with meaning |
| 26 fiction | The real Marple cover; "?" → orange "!" | real book |
| 27-29 end | The method index; her stack with an empty dashed spine on top ("your reading stack?"); comment box; end card with the stack | callback to the opening |

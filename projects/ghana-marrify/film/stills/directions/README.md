# ghana-marrify: three new looks for the motion film (2026-10-02)

The v1 style frames (`../style-frames/`, deck style, the same as reading-stack) were turned down. She wants a whole different vibe, grounded in what she liked in the galleries: "clear background", "all the motion", "bring people together", "the eyelid effects". The study is in `../../../inspiration/STYLE_STUDY.md`.

Each folder has:
- `frames/`: 4 stills in 16:9 and 2 in 9:16
- `contact.jpg`
- a ~10 s motion test in 16:9, with no sound
- `<name>_motiontest_16x9_sheet.jpg`: the test at 4 fps
- the HTML page that draws it

**How the pages work:** they are seek(t) pages (`_tools/kit.js`). Every frame is a pure function of t, so they port straight into studio scenes.

**Rendering:**
- `node _tools/render.mjs stills <page> 16x9|9x16 <outdir> name=t …`
- `node _tools/render.mjs video <page> 16x9 out.mp4 t0 t1 30 2`
- Videos use 2 subframes per frame for motion blur. The encode takes `/tmp/gm-render.lock`.

**Fonts:** in `_fonts/` (all OFL; see `_fonts/LICENCES.txt`).

**Labelling and honesty:**
- Real screenshots carry a credit, for example "Screenshot · TechCabal Daily · 8 Sep 2026" or "Screenshot · marrify homepage · 1 Oct 2026".
- Diagrams are labelled "Illustration" / "Diagram · placeholder fields, no real records".
- No fake Marrify UI, no Marrify logo.
- Her photos are cut-outs from `design/thumbnails/assets/cut/` (her own frames, never flipped).
- All the words are hers (BRIEF.md) or TechCabal's, quoted from the capture.

---

## A · Blink (`A-blink/`)

**Concept.** Every record is a little character with eyes, and the film is about who is looking.
- The hook gathers all kinds of marriages and divorces into one place as a row of records that pop in and blink.
- When she gets to "searchable by anyone that has your name", a divorce record sits asleep in the middle. A ring of eyes opens around it, and they all dart to look at it at once.
- The camera dives into a pupil, and the pupil opens as an iris onto the next scene. There a grey "someone" asks "is this person currently free to marry?" and a record answers with one line ("Nothing else.").
- Estonia is her own photo, brought into the group with characters ticking things off.
- Reciprocity is the record looking back at whoever is looking.

**Built from:**
- OpenAI "Get ready" (her longest dwell): the camera inside a face, glyph-eye blinks, a crowd packing in.
- Cue and Orthogonal: mascots with blinking eyes on white, springy pops, pupils that dart to the new thing.
- vince_builds DesignLoop: bringing people together.

**Palette.**
- Ground: white `#F4F4F4` (sampled from Cue).
- Ink: `#141414`.
- Characters: blue `#3D8BF2`, red `#EE4B3B`, yellow `#FFC21A`, green `#17C26E`, purple `#8B5CF6`, orange `#FF6A1F`, brown `#B7744E`.
- Each scene's headline uses one of these as its accent word.

**Type.** Instrument Sans 600 for headlines (sentence case, tight, centred, 62-104 px), Geist Mono for tiny captions. Nothing from the house set.

**Signature motion.**
1. **The eyelid effect:**
   - Blinks: 0.05 s close, 0.09 s open.
   - Lids drop to a line.
   - Pupils dart together.
   - Eyes open one by one with a spring.
2. **The eyelid wipe:** two ink lids with curved edges close over the frame and open on the next scene.
3. **The pupil dive:** a pupil grows to cover the frame, then reopens as an iris (6.0-7.4 s in the test).

Pops are springs with about +25 % overshoot (Cue measured +60 %).

**Real material.** Her cut-out photo in a circle (Estonia). A real TechCabal or Marrify screenshot could sit in a bubble, but A is mostly characters.

**Risk.**
- It is the most "cartoon". She asked for faces and eyelids, but the subject is divorce stigma, so the characters must stay gentle and never mock anyone.
- The circle-and-triangle record characters must not read as Cue's mascots (ours are different shapes, but the same genre).

**Files.** `contact.jpg`, `A_blink_motiontest_16x9.mp4`. The motion test covers:
- gather
- lid wipe
- watched by eyes
- pupil dive
- iris open
- minimal answer

---

## B · Multiplayer (`B-multiplayer/`)

**Concept.** One continuous camera take, with no cuts, across a white canvas holding the real material:
- the TechCabal paragraph
- Marrify's actual search box
- a record table

People are named cursors:
- Gbemi's cursor (with her face) highlights "launched Marrify" in the real article.
- On "searchable by anyone", six cursors ("An employer", "A neighbour", "An ex", "A stranger", "A colleague", "You") converge on the real search box from every edge.
- On access levels and minimisation, the camera glides to a table. Its columns lock one by one (lock icons) and fold away until only "Status: Active marriage" is left, and the camera pushes in on it.
- Reciprocity is a phone notification: "Someone looked up your marriage record." (labelled illustration).

**Built from:**
- vince_builds DesignLoop: named cursors, highlight, one take, camera pushes.
- wustep "Column permissions" (Notion): locked columns, "Who sees salary?".
- P37 Neuro / Google homepage: white, calm, one object centred.
- Cue: a group of people brought together.

**Palette.**
- Ground: `#FCFCFC` (sampled from Orthogonal / Google / P37).
- Ink: `#111`.
- One accent green `#11A35A` for the coloured word.
- Cursor colours: violet `#6C4BF4`, amber `#F2A10D`, rose `#E8467C`, sky `#1F8FFF`, slate `#4B5563`.
- The screenshots bring their own colours (TechCabal red link, Marrify navy/orange).

**Type.** Geist 500 for headlines (sentence case, -0.035em), Geist Mono for credits.

**Signature motion.**
- The continuous camera (eased in log-zoom space, never a cut).
- Cursor choreography: a highlight sweep, six cursors springing in out of order with arcs.
- Column lock and fold: lock swaps at 0.16 s intervals, then widths collapse with ease-in-out.

**Real material.** This direction uses the most of it: the TechCabal crops and the Marrify homepage capture (`film/assets/sources/`), plus her face on her cursor. It shows Marrify's real search box as a credited screenshot, never a fake one.

**Risk.**
- It is calmer and more "product launch" than A.
- Faces are small (cursor avatars), so "bring people together" is symbolic.
- Small UI text in the screenshots needs the camera to push in.

**Files.** `contact.jpg`, `B_multiplayer_motiontest_16x9.mp4`. The motion test covers:
- the article highlight
- the glide to the search box
- the cursors converging
- the glide to the table
- the locks
- the fold to Status

---

## C · Paperwork (`C-paperwork/`)

**Concept.** The record as a physical object.
- On a cool grey desk, documents fly in and scatter in 3D. They are generic and labelled illustration: marriage certificate, court decree, Gazette notice, church register, NIN slip, licence, affidavit.
- This matches "pieces of paper everywhere, NIN and this and that".
- They gather into one neat stack, a red stamp slams "ONE RECORD" with a 2-frame shake, and her cut-out rises into frame beside it.
- The whole page then turns over like a sheet (page-turn transition) to reveal the record. Black redaction bars sweep over every field except "Status: Active marriage". "NOTHING ELSE." drops in word by word.
- Consent is a manila folder labelled "Divorce · 2003" against a phone and "3 SEC".
- TechCabal's real drawback paragraph is taped on as a clipping, with a red marker under "sensitive personal information".

**Built from:**
- stokebuilder LegalQuants: papers, stamps, a filter.
- jevgrep: paper and ink with one orange-red.
- itsahmedharoon "The Electricity Trap" (her most-hovered Skillry card): heavy type, one red, numbers, red underline.
- Orthogonal: cards in 3D.

**Palette.**
- Ground: cool grey `#D7DADD` (a "clear" ground, not white).
- Paper: `#FFFFFF`.
- Ink: `#15171A`.
- One red `#E5402A` (stamp, accent word, marker).
- Manila: `#E9C98F`.

**Type.** Archivo at its narrowest width (wdth 62, weight 800, uppercase) for headlines, JetBrains Mono for document labels. This is new to her films: condensed and tabloid-ish rather than Bricolage.

**Signature motion.**
- Documents springing in on 3D paths (rotateX/Y settle).
- The stamp slam with screen shake.
- The page turn (the whole frame rotates over its left edge, 105°, ease-in).
- Redaction bars sweeping on with 0.16 s staggers.
- Condensed words dropping in with overshoot.

**Real material.** Her cut-out (bottom of frame, never flipped) and TechCabal clippings as paper, credited.

**Risk.**
- Closest in spirit to her old deck look (heavy uppercase type on flat ground plus one accent), though the paper objects, 3D and page turn are new.
- It is the least like the "eyelid / clear white / people" picks.
- Redaction bars could read as censorship. That fits minimisation, but it is the "warning video" tone she doesn't want.

**Files.** `contact.jpg`, `C_paperwork_motiontest_16x9.mp4`. The motion test covers:
- scatter
- gather
- the stamp
- her rising in
- the page turn
- redaction
- "Nothing else."

---

## Critic scores and recommendation (fresh critic agent, harsh motion director, default reject, 2 rounds)

Scores are (a) faithful to her references, (b) different from reading-stack, (c) fits the subject, (d) craft, then the overall.

| Direction | Round 1 | Round 2 | After round-2 fixes (our own check, no third round) |
|---|---|---|---|
| **A · Blink** | 9 / 9 / 6 / 5 = **6.5** | 9 / 9 / 8 / 7 = **7.5** ("about 30 minutes of work from 8/10") | The critic's three must-fixes are done: the lids and iris are now crisp (no stepped blur), the iris opens centred on the searcher who is already there, and A3 is a two-person exchange with even 64 px gaps. Two more of its notes are also done: the cast is packed as an overlapping crowd at three sizes (coral certificate replaced by an ID card), and the gazette is redrawn as a rolled sheet. The A6 dotted line now connects both ends. |
| **B · Multiplayer** | 5 / 8 / 8 / 6 = **6.5** | 5 / 8 / 8 / 7 = **6.5** | Capped by (a): no eyelids, faces or crowd energy. Still open: the cursors land in a tidy row and read as tags; the Gbemi tag covers "divorce" in B1; the table bleeds off the left edge in B3; the first glide is a 0.9 s smear; the portrait crop ends mid-word. |
| **C · Paperwork** | 3 / 3 / 7 / 7 = **4.5, reject** | not re-scored | "It is the v1 deck again": top-left heavy condensed uppercase plus one red word on a flat non-white ground. Redaction bars read as censorship, the warning tone she doesn't want. Kept for reference only. |

Round-1 fixes in A were:
- a new cast drawn from the subject, so it no longer reads as Cue
- grey glyph-eyed searchers that differ from the sclera-eyed records
- the wipe swapping scenes on the shut frames
- a black hold of 4 frames
- text at 30 px or more
- re-rendered with 8 subframes and correctly aligned blending (the first renders had a one-frame lag in the blend; fixed in `_tools/render.mjs`)

**Recommendation: A · Blink.** The critic agreed in both rounds. Fold two beats from B into A's white world as scenes:
- the real Marrify search box (credited screenshot), with the searchers' grey glyph-faces clustering at it instead of cursor tags
- the column-lock fold for "expose the minimum" / access levels

Her real photo cut-outs work in A (A4). Before a full build, show her `A-blink/contact.jpg` plus the 10 s test, with B's contact sheet as the alternative.

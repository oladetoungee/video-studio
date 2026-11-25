# ux-research: three looks for the motion film, plus talking-head and shorts style frames (2026-10-13)

Video: "What is UX research?" (12:56, her speech 0:37-12:46). Her field explained from zero by an HCI master's student.
The brief asked for a peculiar video type that fits the video, different from reading-stack (deck look),
ghana-marrify (Blink) and the other three new kits (claude-rule chat, database-indexes diagrams, phone-distraction phone UI).

**Nothing here is a full build.** This is the directions gate: she picks one (or mixes) before anything else is made.

## What is in each folder
- `frames/`: 4 stills at 16:9 and 2-3 at 9:16, with real lines she says (checked against `kit/transcripts/transcript.srt`).
- `contact.jpg`: all the stills on one sheet.
- `*_motiontest_16x9.mp4`: a 9-12 s motion test with sound effects and a quiet music bed.
- `*_motiontest_16x9_sheet.jpg`: the motion test at 3 frames per second.
- `sound-cues.json`: the sound effects used in the test.
- The `.html` page: a seek(t) page. Every frame is a pure function of time, so it ports straight into studio scenes.

**Rendering**
- Stills: `node _tools/render.mjs stills <page> 16x9|9x16 <outdir> name=t …`
- Video: `node _tools/render.mjs video <page> 16x9 out.mp4 t0 t1 30 1`. This takes `/tmp/gm-render.lock`.
- Sound: `python3 _tools/mix.py silent.mp4 out.mp4 sound-cues.json`. Peak-aligned Mixkit sounds from `library/sounds/`, plus music `library/music/282.mp3`.

**Other folders**
- Fonts are in `_fonts/` (OFL / Apache, see `LICENCES.txt`).
- Her frames and person mattes are in `_src/`. They come from `kit/UX research. .mov` and are never flipped. The mattes are from macOS Vision, via `_tools/cutout_full.swift`, a full-frame copy of `studio/tools/cutout.swift`.

## A · THE RESEARCH WALL (recommended)
**Video type: an affinity-wall documentary.** The film does UX research on UX research.
- One long deep-green wall holds index cards, sticky notes and polaroids of her.
- Everything she explains is written on a card or a note on the word she says it. Then it gets sorted:
  - clustered into patterns
  - circled with paint marker
  - crossed out
- The camera travels along the wall from topic to topic, so the wall itself carries every transition.
- It is the real tool of her field (affinity mapping, card sorting), so the look is the subject.
- **References:**
  - Mr. Claude's "whiteboard / hand-drawn strokes" style (`studio/PROMPTS.md` §5)
  - R1 TixFox, "UI that does something", in `inspiration/know-how/MOTION-REFERENCES.md`
  - R5, numbered list beside her
  - her polaroid inserts (her decks)

**Look**
- Wall `#1D3A32` (the green of her door and room grade).
- Canary note `#FFE15A`. The one accent per board is her headband orange `#F26A2E` (notes, marker).
- Index card `#FFFDF6`, with a printed red head rule and pale blue lines. Ink `#17140F`. Paint marker `#F4F0E6`.
- **Type:**
  - Permanent Marker (notes, wall words)
  - Courier Prime 36-58 px (typed cards, credits at 44 px)
  - Schibsted Grotesk 800 (card headlines, 92-150 px, tracking -4 to -6 px)
- Boards are 1920×1080 side by side, 2200 px apart. In 9:16 they stack 3400 px apart and are re-laid out, not cropped.

**Motion**
- **Note "slap":** spring 2.6 Hz, damping 0.58, from scale 1.32, rotation +9° and y -36 px. The shadow tightens from 46 to 16 px blur over 0.35 s (outExpo).
- Notes land on her words, staggered 0.25 s (7-8 frames).
- **Marker strokes:** outQuint, 0.4-0.7 s.
- **Camera travel:** 0.8 s inOutQuart, with a horizontal blur scaled to speed (σ up to 36 px). The blur clears as the camera lands.
- **Clustering:** inOutQuart, 0.8 s, with 0.12 s between clusters.

**Signature transitions**
- The camera travelling along the wall. The carrier is the wall plus the marker line that leads to the next board.
- A card slapping in on the cut word.
- Proposed for the full film: a push into one sticky note until it becomes the next full-frame scene.

**Sound roles** (`A-wall/sound-cues.json`). Whoosh is 0 of 14 cues; swipe is 1 of 14.
- **Paper:** card-place on cards.
- **Pop:** pop-dry / pop-hard-click on notes.
- **Pen:** marker-line, started with the stroke.
- **Swipe:** one swipe-fast-zoom on the camera travel.
- **Shutter:** on the polaroid.

**Stills**
- A1: UI vs UX, with her five UI words and her four UX questions, word for word.
- A2: say vs do, with her "first semester" polaroid.
- A3: find patterns. The notes are labelled "Illustration: notes from interviews".
- A4: "Good design doesn't start with screens. It starts with people.", with "screens" struck through and "people" circled. Credit: "Line from a Medium article". There is no author name until she confirms it.
- 9:16: A5 (UI), A7 (UX), A6 (say vs do).

**Test (10.6 s):** the UI board builds → the UX board builds → the camera travels → the say/do board builds.

**Risk**
- Sticky notes are a familiar look. It stays ours through the dark green wall, her orange and her real polaroids.
- Schibsted Grotesk is also used in database-indexes C. Swap it for a different heavy grotesk if both of those are picked.

## B · POP-UP BOOK
**Video type: a paper pop-up storybook.**
- Each idea is a spread of flat colour.
- Cut-paper people, a paper phone, and her own cut-out with a white paper edge stand up off the page from a hinge at their base.
- Her words are printed paper strips.
- Between spreads everything folds flat, and the next spread stands up.
- The strongest single image is **say vs do as a person and their shadow**: the person stands still while the shadow is on its phone. Her line underneath: "We are just not very good at noticing our own behaviours."
- **References:**
  - Mr. Claude's "paper collage" style (parallax 1.0 / 0.5 / 0.2)
  - R5 (cut-out with an outline on a flat ground)
  - her collage-thumbnail taste (THUMBNAILS.md)

**Look**
- Spreads in mustard `#EBB23C`, tomato `#E5533C` and sky `#8EC5E8`. Paper `#FBF7EE`, ink `#1B1B1F`.
- Young Serif 44-64 px on strips with a jagged cut edge. JetBrains Mono labels at 32 px.

**Motion**
- **Pop-up:** rotateX 86° → 0, spring 2.4 Hz, damping 0.55, drop shadow growing from 2 to 14 px.
- **Fold:** 0.42 s inOutQuart.
- **Strips:** slide 26 px, outExpo 0.32 s.
- **Shadow:** separates from the person with a spring (1.8 Hz, damping 0.7), skew -18° → -6°.

**Sound:** paper-quick-move, paper-slide, card-flick, page-turn, pop. No whoosh.

**Risk (critic)**
- Her outlined cut-out on a flat colour echoes ghana-marrify C "Paperwork", which she turned down.
- Mustard is close to database-indexes C.
- The pop-up hinge reads more like a scale-in than a real fold. It needs a visible fold line and hinge shadow.

## C · UNDER THE SURFACE
**Video type: one continuous vertical cross-section, a single dive.**
- The phone (UI) stands on a thin crust.
- Under it are flat strata, one per UX question she asks:
  - "Can a user find what they're looking for?"
  - "Does it make sense to the user?"
  - "Did the users get frustrated using it?"
  - "Did the user come back to use it?"
- An orange probe (UX research) drills down from the phone. Each question types on as the tip passes, with the user's path drawn in that layer: wandering, a loop, a knot, a return.
- The camera pulls back on "The experience is much bigger than what is on the screen." It ends at the bedrock: "Good design doesn't start with screens. Good design starts with people."
- 9:16 is the native shape.
- **References:** the R1 TixFox camera with directional blur, and Mr. Claude's "concept built term by term" style.

**Look**
- Paper `#F3EFE6`. Strata `#CFE7E0`, `#93CDBF`, `#3E9A8B`, `#1F5E55`. Bedrock `#0F2B28`. Probe `#F26A2E`. Ink `#12201E`.
- Hanken Grotesk 800 at 88 px (tracking -3 px); questions at 700 / 72 px.
- No gradients: each band is a flat colour with a hand-cut wavy edge.

**Motion**
- The probe drills one stratum every 1.5 s (inOutQuart over 70 % of it).
- The camera follows over 1.05 s with a vertical blur.
- The pull-back goes to zoom 0.3 over 1.0 s.
- The traces are drawn in 0.65 s (outQuint).

**Sound**
- A UI tick as the tip reaches each stratum.
- A riser that ends on a soft hit at the pull-back reveal.
- A bass hit at the bedrock.

**Risk:** it is the most original, but it is thin for 13 minutes. Methods, AI, career and budget need their own scenes. Best used as A's opening and closing (see the recommendation).

## Talking-head (full edit) style frames: `talking-head/`
These are over her real footage, never flipped. The layout names are from `inspiration/know-how/MOTION-REFERENCES.md`.
- **TH1 · L5 half and half** (raw 1:15): the A wall on the left, her on the right (cropped only). Her four UX questions are on notes.
- **TH2 · L2 words behind her** (raw 7:20): giant "say" (paint white) and "do" (orange) set behind her head using her person matte. Caption: "are often very different".
- **TH3 · L7 pop-around** (raw 8:50): the seven methods she names pop in around her head as sticky notes, as she says each one. "Card sorting" is in orange (whisper heard it as "CAD sorting").
- **TH4 · L6 sticker on paper, B look** (raw 5:47): her cut-out on sky blue, with "01 / 03" (the first of the three big pairs she covers) and the generative / evaluative strips.

## Shorts style frames: `shorts/`
Proposed short **SH2 "what people say vs what they do"**. It runs raw 7:12-7:57 per `kit/refined-kit.md` §5 and ends on "…working out why they don't match is also a very useful finding."
- **Series label:** her spec from `inspiration/know-how/SHORTS-PLAYBOOK.md`. Helvetica Neue Regular 82 px, white boxes, one box per line.
- **Caption:** Helvetica Neue Medium 76 px, tracking -0.09 em, `#DFD7CB` on 40 % black, centred on y 1535.
- **SH2a:** her footage, a 9:16 crop of the 4K frame.
- **SH2b:** a full-screen A film scene under the same label and caption.
- The tight tracking is her measured style (letters nearly touch). The critic asked for 0; we kept hers.

## Critic (fresh agent, harsh motion director, default reject)
Fresh agent, two rounds, no files touched. Scores are fit / originality / craft / phone readability, then the overall.

| | Round 1 | Round 2 |
|---|---|---|
| **A · Research wall** | 8 / 6 / 5 / 7 = **6.5** | 8 / 6 / 7 / 8 = **7.5** |
| **C · Under the surface** | 8 / 8 / 6 / 7 = **7** | 8 / 8 / 6.5 / 7 = **7** |
| **B · Pop-up book** | 6 / 4 / 5 / 8 = **5** | 6 / 4 / 5.5 / 8 = **5** |
| Talking-head frames | 6.5 | 7.5 |
| Shorts frames | 5 | 6.5 |

**Fixed after round 1**
- **Ghost blur:** the stepped 2-subframe ghost blur is replaced by a directional blur scaled to camera speed.
- **Her exact words:**
  - "Can a user find what they're looking for?" and the other three questions, word for word
  - "the notes **or** the recordings"
  - the short's label now uses "people"
- **Lone last-line words:** none left.
- **Minimum sizes:**
  - credits: 44 px at 16:9, 36 px at 9:16
  - 9:16 subtitles: 36 px
- **Even note sizes:** sticky notes of the same kind are now the same size.
- **TH3:** the overflow is fixed and the notes sit inside the safe margin.
- **TH2:** "do" is now visibly behind her head.
- **C:**
  - removed "under the screen: the experience" (not her words)
  - the probe now comes out of the phone
  - the dive is slower

**Fixed after round 2 (not re-scored by the critic)**
- **A test:** "SAY" now writes from 6.87 s, so there are at most 2 empty frames after the camera lands.
- **A1:**
  - the "come back" note is 40 px higher, so its circle sits inside the safe margin
  - the notes are re-spaced so "TO THE USER?" clears its neighbour
- **A6:** the index card is shrunk to fit its text, and the polaroid now overlaps it deliberately, pinned by 24 px.
- **C:**
  - questions are capped at 1180 px wide, so they clear the probe
  - the "come back" hook no longer crosses the text
  - the C5 headline is 80 px higher, clear of the phone

**Not changed, by choice**
- The caption tracking on the shorts is her own measured style (SHORTS-PLAYBOOK).
- On SH2a the caption sits on her mic pack, because her spec puts it at y 1535. That covers the mic, not her face. Moving it lower would break her style.
- The empty lower third of the A 9:16 frames is the caption zone (CHECKS.md: content stays in y 370-1440).

**Still open**
- B's pop-up still reads more like a scale-in than a fold, and her cut-out still has a halo (B is not recommended).
- TH4 is in B's look and has the same halo. If she picks A, TH4 becomes her cut-out on the green wall beside an index card.
- C's strata are still about 60 % empty in the pull-back. C also has no plan yet for the methods, AI and career sections.

**Sound:** the motion tests mix peak-aligned Mixkit sounds with a music bed, then a limiter. They measure -15.5 to -17.8 LUFS integrated, with peaks of -1.6 to -2.4 dBFS. These are short, sparse tests; the full film is mastered to -14 LUFS through `soundqa.py`. Not a single whoosh is used.

## Recommendation
**A · The research wall**, with **C's dive borrowed for the opening and the last line**.
- **Opening:** her question "Who is this app for, and what do they actually need it for?" can sit on the screen crust, before the camera drops onto the wall.
- **Closing:** "Good design starts with people" lands on the bedrock.

**Why A**
- The wall is the real tool of her field, so the look itself explains UX research.
- It carries every section of a 13-minute film:
  - **UI vs UX and the pairs:** cards and notes.
  - **Methods:** notes popping on as she names them.
  - **Find patterns:** clustering.
  - **Small budget:** five notes for five people.
  - **AI:** a transcript card summarising itself.
  - **Career:** her polaroids and the routes she lists.
- It shares one system with the talking-head edit (TH1-TH3) and the shorts (SH2b).
- It is unlike reading-stack, ghana-marrify and the three other new kits.

## Open questions for her
1. Pick A, B or C, or "A with C's dive for the opening and the end".
2. **Don Norman:** in the film narration, cut "back in the eighties", or keep it and show "early 1990s" on screen? (BRIEF.md)
3. **The Medium line:** can she confirm the article (Wardharaheem) so we can credit the author by name? Until then it says "Line from a Medium article".
4. Caption style for this video's shorts: her Helvetica style (shown), or the handwritten one from the ghana shorts? The handwritten one would match A's marker look.

## Engine notes (not changed; for the full build)
- **A** needs:
  - a "world + camera" layer, with keys and speed-scaled directional blur, in the studio runtime (`_tools/ux.js` `camera()` here)
  - a per-note text fit
  - SVG stroke draw-on
- **B** needs CSS 3D (`rotateX` with perspective) in the renderer.
- **TH2** needs her person matte as a small matte video per clip (Vision `.accurate`), never an image sequence.

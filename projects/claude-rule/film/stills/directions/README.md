# claude-rule: three looks for the motion film, plus talking-head and short style frames (2026-10-13)

Video: "Anthropic's new rule about being cruel to Claude, and is AI conscious?" (4:32). Anthropic announced the rule on
8 Oct 2026; it takes effect on **12 Nov 2026**, so she should post before then. Her view: be kind for your own sake, but
Claude is a tool, not a conscious being, and this is a slippery slope. Tone: curious, sceptical, a bit amused.

**Nothing here is a full build.** This is the directions gate: she picks one (or a mix) before anything else is made.

## What is in each folder
- `frames/`: 4 stills at 16:9 and 2 at 9:16. Every line on screen is hers (checked against `kit/transcripts/transcript.srt`,
  with the whisper fixes from `BRIEF.md`) or Anthropic's / Mustafa Suleyman's, credited.
- `contact.jpg`: all the stills on one sheet.
- `*_motiontest_16x9.mp4`: a 10-11 s motion test on **her real voice** with sound effects (no music bed yet), mastered to
  -14 LUFS, true peak about -1 dB.
- `*_motiontest_16x9_sheet.jpg`: the test at 2 frames per second.
- The `.html` page: a seek(t) page timed on her word timestamps (`_tools/words.js`). Every frame is a pure function of time,
  so the scenes port straight into the studio.

**The real source.** `../../assets/sources/anthropic/` holds the live Anthropic pages, captured 12 Oct 2026 with headless
Chrome (`../../tools/sources/anthropic.mjs`, nothing on the page edited, only the cookie dialog closed with "Reject all"):
- the "2026 Usage Policy update" (8 Oct 2026): top, the "Addressing abusive behavior toward our models" section, the
  "takes effect on November 12" paragraph, tight crops, an 8 s scroll recording ending on the section
  (`ap_scroll_1920x1080.mp4`), and `ap_capture.json` (the page text and the box of every quoted phrase, so highlights land
  on the exact words);
- Claude's constitution: the "Claude's moral status is deeply uncertain." paragraph (`ac_*`).
Every use carries a source line ("Screenshot · anthropic.com · 8 Oct 2026").

**Rendering**
- Stills: `node _tools/render.mjs stills <page> 16x9|9x16 <outdir> name=t …` (t = seconds in her raw recording).
- Video: `node _tools/render.mjs video <page> 16x9 out.mp4 t0 t1 30 4` (4 sub-frames of motion blur; takes `/tmp/gm-render.lock`).
- Sound: `python3 _tools/mixtest.py out.m4a t0 t1 "sound:time:dB[:peak|start]" …` (her voice from the recording + Mixkit
  sounds from `library/sounds/`, peak-aligned).
- Her frames: `_tools/grab.sh` (1920x1080 stills from the 4K file, never flipped, never graded) and `_tools/matte.swift`
  (a full-frame person matte with macOS Vision, for words behind her). Both run under `_tools/lockrun.py`.
- Fonts in `_fonts/` (all OFL, see `LICENCES.txt`). Helvetica Neue on the short frames is the Mac system font, local only.

## A · THE THREAD (recommended, critic 8.0)
**Video type: a chat-thread film.** The whole 4:32 is one conversation on screen, because the rule is literally about how
you talk to Claude and how a chat can end.
- Her lines arrive as **her messages**, word by word on her voice (the not-yet-spoken words wait at 22 %).
- A typing indicator fills the breath before she speaks.
- **Sources arrive from the other side** as cards: the real policy page, the highlight wiping across "sustained and
  needless abusive or cruel behavior toward our models" as she reads it.
- **The model never speaks.** Only system lines ("Usage policy · from November 12, 2026", "9:00 PM"). Her 9 pm what-if is
  a grey reply labelled "her what-if · not a real reply".
- **Punch lines break out:** on "cruel." and "a tool." the thread cuts away and one giant word fills 75 % of the width.
- **Chapters end like a chat:** "This conversation has ended" draws across, the input field greys to "You can start a new
  chat", and the next chapter is a new chat.
- Everything chat-shaped carries `ILLUSTRATION` in the input row: never Claude's real interface, no logo.
- **Refs:** the DIRECTIONS-BRIEF starting point; R1 TixFox word-by-word type-on with a highlighter on the payoff word;
  R2 @johnbucog key word 2-3x bigger (the breakout).
- **Look:** ground lilac `#CDBFF3` (her top in this recording), her bubbles ink `#15131C` with `#F4F1FA` text, source cards
  white, mono `#3E3852`. Schibsted Grotesk 500 (bubbles 58 px) / 800 (breakouts 470-560 px), IBM Plex Mono 34 px.
- **Motion:** bubbles scale 0.94→1 from their tail corner, outQuint 12 f, opacity in 3 f; the thread scrolls by each new
  message's height, outQuint 14 f; system lines type on in 0.3 s; breakout outExpo 15 f from the spoken word's position, the
  white highlighter wipes in 6 f after 10 f; the card unrolls top-down, outQuint 12 f.
- **Sound roles:** notification pops on messages (3 different files), a soft bass hit on the breakout, typing ticks on
  system lines, a page-turn when a source card lands, a "tape-stop" on "This conversation has ended". No whooshes.
- **Test:** 0:00-0:11, "From the 12th of November 2026… cannot be abusive or cruel to Claude." → "cruel."

## B · THE FINE PRINT
**Video type: an editorial close reading of the real document.**
- The stage is the real Anthropic text. The camera zooms onto the captured page, her voice highlights the phrase she reads,
  then the phrase **lifts off** into giant Newsreader type and the page leaves.
- **Two voices, never mixed:** Anthropic's (and Suleyman's) words in roman paper white with a source line; her words in
  periwinkle italic with "GBEMI".
- **Look:** espresso `#1F1B18`, paper `#F3EDE3`, periwinkle `#93A6FF`. Newsreader 300 / 600 / italic 400, captions in
  Newsreader 500 caps 30 px.
- **Motion:** page zoom 0.55→1 outExpo 18 f; highlight wipes at her reading speed; the lift: the page leaves outExpo 12 f
  and fades in 6 f, the words land 2 f apart, blur 6 px→0 and rise 18 px, outQuint 10 f.
- **Refs:** her ask to show real sources highlighted at the moment she mentions them (FEEDBACK 10-01); R3's serif accent
  word; Florence's "concept built term by term".
- **Test:** 0:39.6-0:50, "The exact wording is…" → "only in extreme cases."

## C · THE SLOPE
**Video type: a physical-metaphor film.** One object carries it: a plank, the line between "tool" and "human".
- Level, it is a measuring rule with Claude pinned at the "tool" end.
- Her claims slide in as heavy blocks; each new block goes under the pile, so it reads top-down in the order she said it.
- "very, very, very powerful" stacks until the plank dips.
- On "slippery slope" the plank tilts (outExpo 0.6 s, hold 8 f) and the pile slides off (a = 1800 px/s²).
- **Look:** ochre `#E7B53A`, ink `#1A1712`, paper `#F6F1E6` (the one accent block); Big Shoulders Display 800 caps;
  Space Mono 32 px labels.
- **Test:** 2:24.7-2:35.3, "A tech company says this model may be conscious…" → "It's a very slippery slope, man."
- The critic's view: the metaphor only carries 2:00-2:58. So the best use is as **one set piece inside A**.

## Talking-head (full edit) style frames (`talking-head/frames/`)
Her real footage, never flipped, never graded:
- `TH1_L2_behind-her_slope`: L2, "SLIPPERY" behind her head, from her matte
- `TH2_L5_half-and-half_fineprint`: L5, Anthropic's wording beside her
- `TH3_L4_side-stack_thread`: L4, her messages stacking beside her raised hand ("cannot be abusive or cruel"), `ILLUSTRATION`
- `TH4_L11_corner-cam_slope`: L11, the 9 pm what-if full frame, with her in a circle so she never disappears

Whichever film look she picks, the talking-head edit uses that look's type and colours across these layouts.

## Short style frames (`shorts/frames/`)
**SH2 "Anthropic's new rule for Claude (pt 2)"** (refined kit section 5), in her Helvetica caption spec:
- top label in white boxes
- spoken caption in Helvetica Neue Medium 76 px, `#DFD7CB` on 40 % black, centred at y about 1535
- S1 is her footage
- S2 is a full-screen film insert (B's lift) with the caption running on top

## Critic scores (fresh critic agent, harsh motion director, default reject, 2 rounds)
Each direction is scored on fit, originality, craft and readability. The bar is 8.

| Direction | Round 1 | Round 2 (fit / originality / craft / readability) | Verdict |
|---|---|---|---|
| **A · The Thread** | 6.5 | 8.5 / 8 / 7.5 / 8 = **8.0** | **Passes**, after three fixes (below), all made |
| B · The Fine Print | 6.0 | 7 / 7 / 7 / 8 = 7.0 | Reject: the most generic news-explainer look, and only 2 layouts for 4:32 |
| C · The Slope | 5.0 | 5.5 / 4 / 6 / 7 = 5.5 | Reject: see below |

**Round 1 notes, all fixed in round 2:**
- A opened on 2 s of near-empty screen.
- A and B had double-exposure crossfades.
- B's lift eased in.
- C's stack read bottom-up, its tilt never settled, and "POWERFUL. VERY VERY VERY" reversed her word order.
- The grounds repeated earlier looks: A was reading-stack's paper, B its off-black, and C's green clashed with ux-research.
- TH1 read "SLOP", and her footage had been graded green.
- S2 showed the same phrase twice.

**Round 2 fixes made after the critic's final notes:**
- **A1 (blur):** the "cruel." / "a tool." scale-up is now drawn without motion blur and starts at 60 % size instead of 16 %. Frames 285-290 are clean, with no stacked copies.
- **A2 (credit):** the card credit now reads "Screenshot · anthropic.com · 8 Oct 2026" and is no longer clipped.
- **A3 (dimmed bubbles):** dimmed bubbles now fade to 45 %, not 25 %. Text is readable.
- **A3 ("This conversation has ended"):** this line is now 66 px.
- **TH1:** "SLIPPERY" moved up 60 px, so it no longer reads "SLIPPERV".

**Still open:**
- **B:** a grey ghost of the page is visible for about 5 frames during the lift.
- **B:** the 9:16 type sits high.
- **C:** its ochre `#E7B53A` now matches three sibling kits (ux-research B, database-indexes C, phone-distraction B). Its slide ends in a linear move, and its metaphor fits only about 1 minute of the video.

## Recommendation
**A · The Thread.** The rule is about how you talk to Claude, and how a chat can end. So the conversation itself is the stage. "This conversation has ended" becomes the chapter break and the closing beat. The motion test is on her voice: `A-thread/A_thread_motiontest_16x9.mp4`.

**Fold in from B and C:**
- **From B, the two voices:** Anthropic's and Suleyman's words in roman serif with a source line, her words in her own bubbles.
- **From B, the whole-line crop:** the real page cropped to whole lines, highlighted as she reads it. It is already in A's card.
- **From C, the plank:** one set piece for 2:24-2:35 ("A tech company says this model may be conscious… It's a very slippery slope, man.").
  - It uses A's palette and C's spoken-order stack and outExpo tilt.
  - The slide needs rebuilding so it eases out of frame in 0.6 s or less.

**Taste risk to show her:**
- The lilac ground matches her top in this recording. Flat lilac is not one of her bans; the ban is on purple gradients and the indigo "night library".
- Show `A-thread/frames/A2_cruel_16x9.png` next to `talking-head/frames/TH3_L4_side-stack_thread.png`.

**If she picks A:** TH1 and TH4 (now in C's ochre) get redone in A's palette.

## Checks (directions phase)
| id | result | note |
|---|---|---|
| her-words | pass | Every line on screen is checked against `transcript.srt`, with the BRIEF whisper fixes (Claude, 12th of November, "It's a very slippery slope"). Anthropic's and Suleyman's words are credited. Her what-if is labelled "her what-if · not a real reply". |
| banned-list | pass | No gradients, glow, particles or corner HUD. Chat UI is labelled ILLUSTRATION. No Anthropic or Claude logo. |
| unique-look | pass (A) | Grounds were sampled against reading-stack, ghana and the three sibling kits (critic round 2). C fails this check. |
| type-size | pass (A) | Mono labels are 34 px, the card credit 30 px and the breakouts 470-560 px. C6's "her what-if" is 32 px in code; the critic measured about 18 px on the 9:16 sheet. |
| text-safe-area | pass | The 9:16 content sits inside y 370-1440 (B's portrait was moved for this). Short captions sit at y 1468-1602. |
| loudness | pass | Motion tests measure -14.2 LUFS, with a peak of -1.2 to -1.5 dBFS (ebur128). |
| sync | n/a | These are direction tests. Cues are placed by hand on the word times; soundqa.py runs at the build. |
| no-blank-cuts / motion-craft | fixed (A) | The "cruel." hard cut is clean. A's scroll uses 4-sample motion blur. lab.mjs runs at the build. |
| editable | n/a | Directions only. The chosen look becomes a studio film project. |
| delivered | n/a | Nothing has been exported to Downloads yet; that waits for her pick. |

## Questions for her
- Which look: A, B, C, or A with B's real-page reading and C's plank as set pieces?
- The lilac ground in A is taken from her top in this recording. Is that a nice touch, or too matchy?
- Is it OK for words to sit behind her head (TH1)? It uses a person matte; her footage itself is untouched.

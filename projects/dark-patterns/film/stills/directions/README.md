# dark-patterns: three film directions (2026-11-02)

**One question: which look for the whole video, A, B or C?** The look you pick is used for everything: the motion film,
your talking-head edit, the shorts and the teaser. The talking-head and short frames below only show how each look sits
around you. They are not separate choices. My suggestion is **C**. If you like two of them, C works well with one piece of
B inside it: B's "honest version / trick version" split as one scene type.

Your video is about the small tricks in apps and online shops, and the names they have. Here are three looks. Each one is
built from lines you really say and from the real sources: Harry Brignull's site deceptive.design, the European Commission's
January 2023 check of online shops, the FTC's July 2024 review, and GDPR Recital 32. The pages are cropped, never changed,
and each one has a small source credit. The shop is a made-up one with no brand, and the photos are from Pexels (listed in
`film/assets/CREDITS.md`).

None of the three repeats an earlier film: not your deck look, Blink, the chat thread, the database grid, the green research
wall, the lock screen or the receipt, or the October calendar. They also stay clear of the other two videos in this batch
(the scholarship passport, departures board and postcards; the working-student seam, timecard and reel). None of them uses
the phone's own screen as the stage.

**Look at everything in one go:** `overview.png`. There is one row per look, and everything in a row is that same look: film
frames, then the talking-head edit, then a 9:16 film frame and a short.

**Each folder has:**
- `frames/`: the stills. The 9:16 ones are named `p…`.
- `motion-test.mp4`: 16:9, on your real voice, with real sound effects and a quiet music bed, at about -14 LUFS. **Please
  listen to them. Nobody here can.**
- the code that draws it (`kit.js`, `scenes.js`). This is the studio's own engine, so the look you pick becomes the full film.

Times below are seconds into your recording. All three tests come before the only cut in your cleanup list (5:57), so the
voice in them is the same as the cleaned edit.

---

## C · BLOWN UP (`C-zoom/`): spot the trick. **Recommended**

**Idea.** The trick is always in the small print, so this film makes the small print huge. Every trick is shown as a big
version of the screen it lives on, on a flat pink ground. A black magnifying glass finds the trick and reads it out loud.
Then the camera zooms through the lens into the next screen.
- Opening: the 10% pop-up builds, and the lens finds "No thanks, I hate saving money".
- Hidden costs: €40 is crossed out, "+ service fee" is blocked out, and €52 arrives.
- Trick wording: "Untick this box if you don't want to stop receiving emails", with the three negatives blocked out one by
  one as you say them.
- Fake urgency: the timer counts down, you press Refresh, and it is back at 10:00.
- The FTC review: the lens reads "Nearly 76%" on the real page.

**Look.**
- Pink `#FF9EC4`, ink `#111111` and white UI. There is no other colour.
- The marker is a solid ink block with the word cut out in pink.
- Type: **Geist** 800/900 for the screens and headlines, Geist 300 for your quoted words, and **Geist Mono** for labels and
  a "04 / 11" counter in the corner.

**Motion.**
- Pieces arrive with outQuint over 0.35-0.55 s.
- The lens pops in with a small overshoot (outBack, 0.55 s).
- The zoom-through takes 0.42 s (inOutQuart), with a hard cut on your word into the next screen.
- Something changes every 1-3 s, always on your words.

**Signature transitions.** The zoom through the lens, and a hard cut on the word.

**Sound roles.** Pop (pop-up), typewriter (the link typing on), camera focus (the lens), marker (the block), swipe (the zoom),
hit (the name), coins (prices), ticks (each negative), clock and rewind tape (the timer), shutter (a source lands). There
are no whooshes: the one move that could take one gets a swipe instead.

**Test.** 0.1-9.9, the opening.

## A · THE FIELD GUIDE (`A-guide/`): every trick has a name

**Idea.** Harry Brignull named these tricks in 2010, so the film is a field guide. Each trick is a specimen pinned in a
drawer: the thing itself on a cream card (the pop-up, the cart, the countdown) with a red pin and a paper tag. Beside it are
its common name in a big serif and the real deceptive.design entry, pinned like a reference plate. "Specimen 02 / 11" keeps
count.
- Roach motel gets a real cockroach photo.
- The EU check is a "field survey" with the press release pinned in.
- "It's not bad design, it's intentional" is a black phrase card.

**Look.**
- Ochre felt `#D19B2C`, cream cards `#F5F1E6`, ink `#1B1608`.
- One accent, pin red `#E5322B`, used only on cards: the pins, the trick circled, the counter.
- Type: **Young Serif** for names and numbers, **Hanken Grotesk** for sentences, **Martian Mono** for labels and tags.

**Motion.**
- The drawer slides one specimen to the next in 0.75 s (inOutQuart).
- Pins drop in with an overshoot (0.28 s).
- Names type on word by word.
- A 3.5 % push runs during long explanations.

**Signature transitions.** The drawer slide and the pin drop.

**Sound roles.** Paper slide, card place, pin click, typewriter, shutter (the photo), pencil and marker, a clock tick, and a
tape rewind (the timer restarting). No whooshes.

**Test.** 60.6-70.6, hard to cancel / roach motel.

## B · VERSION A / VERSION B (`B-split/`): the video's own A/B test

**Idea.** You explain that teams A/B test their designs, so every screen is split in two:
- A, the honest version, on paper.
- B, the version that wins the test, on ink.

The same made-up shop sits on both sides, and only B has the trick, in red: the cleaning spray in the cart, gift wrapping
already ticked, "No thanks, I hate saving money". For the A/B testing part, your sentence runs across the divider. At the
end, A takes over the whole screen on "build the honest version".

**Look.**
- Paper `#EEECE6` against ink `#141414`.
- Red `#FF3B30` appears only on side B.
- Type: **Space Grotesk** and **Space Mono**.

**Motion.**
- The divider slides in over 0.65 s (inOutQuart).
- A stays still while B changes on your words: the row lands with an overshoot, and the total flips.

**Signature transition.** The divider.

**Sound roles.** Slide, pop, click, coins, marker, and a "wrong" sound on "can't tell whether anyone was tricked".

**Test.** 94.6-103.0, sneak into basket.

---

## How each look sits around you (`TH/`, your real footage)

Your frames are only cropped, never flipped or retouched. There are four different layouts:
- **th1, a window over your shoulder** (A's look): the "Nagging" specimen card beside you.
- **th2, half and half** (B's look): the B checkout on the left, you on the right.
- **th3, words behind you** (C's look): "FAKE URGENCY" sits behind your head, using an Apple Vision cut-out of you.
- **th4, receipt + side counter**: the Commission headline as a card at the top left, with "399 shops checked / 148 with a
  trick" counting up at the side.

All four use your usual captions (Helvetica Neue Light, cream), with a faint box only where your top would wash them out.
For the shorts, the top-title and caption style changes from short to short.

**Short SH9 "Fake countdown timers on shopping sites", the same moment in each look.** Your picture is a 4:5 window (not too
zoomed in), and there are no timers in shorts (your rule).
- `sh9-A-hook`: a cream specimen tag as the top title, with serif captions on black boxes.
- `sh9-B-hook`: the split as the title ("A real deal ends when it ends" / "A fake timer starts again"), with one caption word
  on a red box.
- `sh9-C-hook`: a pink title box with "timers" blocked out, and the key caption word cut out of an ink block.
- `sh9-C-receipt`: the real Commission line "42 websites used fake countdown timers" under the title.

**A correction in the edit (your new rule), `fix-C-correction`.** At 6:48 you say "Amazon actually did pay 2.5 billion
dollars". The FTC's numbers are a $1 billion penalty and up to $1.5 billion in refunds, and Amazon did not admit
wrongdoing. The edit pauses you after "to settle this", cuts to a plain pink screen where the correction types on (about
3.5 s, with the FTC source), then comes back to you. If you would rather treat it as a small slip, it can be a card over
you instead. The other fixes are small ones that go in the captions: FTC (not "FCC"), "hard to cancel", "I hate saving
money".

## Critic scores (a fresh critic agent: a harsh motion director, starts from reject, pass mark 8)

| Round | A · Field guide | B · A/B split | C · Blown up | Talking-head frames | Short frames |
|---|---|---|---|---|---|
| 1 | 6.0 | 6.0 | **7.3** | 6.5 | 6 |
| 2 | 7.4 | 7.0 | **8.1** | 7.3 | 7.5 |

The critic picked C in both rounds. It is the only direction where the picture is the topic (looking closely at the small
print), and nothing like it has been done before.

**Round 1 → 2 changes:**
- A moved from teal to ochre, because teal with cream cards was too close to the ux-research green wall. Its reference cards
  are cropped to the heading and definition. The cockroach photo is cropped tighter and lands 1.4 s earlier, and a slow push
  covers the hold.
- In B, the A side stays still while only B builds on your words. The total moves down before the new row lands, the card
  is lower, and the ellipse stays inside the card.
- In C, "10% OFF" arrives with the box. The lens shows the whole "No thanks, I hate saving money". The definition line is
  46 px. The FTC lens now uses a sharp 4x capture of the same page.
- In the talking-head frames: a faint caption box, the receipt cropped to the headline, and the counter in C's pink.
- In the short: a new frame of you (eyes open), the window moved down, the timer kept at one height, and the receipt cut to
  the "42 websites" line.

**After round 2 (applied, not re-scored):**
- C's opening starts with the pop-up already on screen.
- C's letter-spacing was loosened (a seam between the two t's).
- The overview label was corrected.
- Faint caption boxes on all four talking-head frames.
- The th4 receipt is cropped tighter.
- The sh9 receipt fits the width, and the timer moved off the ceiling glare.

**Still open (the critic's round-2 list):**
- A: titles type on letter by letter, which reads as flicker (make them whole-word reveals), and the bottom of the card is
  empty for about 5 s before "one click".
- B: thin motion. The A half is still for 8 s. Add a 2-3 % push, or make the total count up.
- C: the critic saw a black last frame at 9.8 s of the test. I checked 9.7 s and it is pink, so it is probably just the end
  of the file.
- th3: your hair still touches the bottom of "URGENCY". That is the point of "behind you", but say if you want it higher.

## My recommendation
**C · Blown up.** It is the clearest and the most new, and it is the only one at 8 or above. When building it, borrow two
things:
- A's "specimen" name label, as the small mono caption for each pattern's name.
- B's split checkout, as one before/after scene type inside C.

For the talking-head edit, rotate all four layouts in C's pink (th3 words behind you, th4 receipt + counter, plus a half
and half and an over-the-shoulder window).

## Questions for you
1. **Which look for the whole video: A, B or C?** (Or C with B's split as one scene, as I suggest.)
2. Pink: is `#FF9EC4` right, or do you want it softer or stronger?
3. For the talking-head edit, do you want your usual cream captions (as in the frames), or a bolder caption for this video?
4. The Amazon correction: a plain screen (as shown), or a small card over you?

## Her pick (2026-11-02)
**C · Blown up for the whole video, plus B's honest-vs-winning split as one scene type.**

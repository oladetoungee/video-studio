# phone-distraction: three looks for the motion film (2026-10-13)

Video: "Your phone was intentionally designed to distract you" (14:57, her HCI explainer). The starting point (`projects/DIRECTIONS-BRIEF.md`) was **the phone's own UI as the stage**. Each direction below is a different kind of video built on that idea, and none of them reuses reading-stack (deck look) or ghana-marrify (Blink / Multiplayer / Paperwork).

Each folder has:
- `frames/`: 4 stills in 16:9 and 2 in 9:16, using her real lines (word-timed from `kit/transcripts/`)
- `contact.jpg`
- a ~10 s motion test in 16:9 **with sound** (her real voice + library sounds, mastered to -14 LUFS)
- `<name>_motiontest_16x9_sheet.jpg`: the test at 3 frames per second
- the seek(t) HTML page that draws it (same engine pattern as ghana-marrify, `_tools/kit.js`), so a picked look ports into studio scenes

Talking-head layouts and shorts frames are in `TH-shorts/`.

## Real sources (captured 13 Oct 2026, in `film/assets/sources/`)
- **European Commission press releases**: TikTok (6 Feb 2026) and Meta (10 Jul 2026), screenshotted headless (`film/tools/sources/eu.mjs`). The phrase boxes for "infinite scroll", "autoplay" and "push notifications" are in `eu-*.json`.
- **US Patent 8,448,084 B2** "User interface mechanics". Inventor: Loren Brichter; assignee: Twitter, Inc.; filed 8 Apr 2010, granted 21 May 2013. All figures are from Google Patents (`patent/`). FIG. 8 shows "Pull down to refresh...". `patent-US8448084-fig8-ink.png` is the same drawing with the white made see-through, so it sits on any ground.

The generic phone UI (tiles, banners, rail) is our own drawing, labelled ILLUSTRATION. There are no logos and no copies of real apps.

---

## A · LOCK SCREEN (`A-lockscreen/`): recommended

**Video type.** "OS film." The whole frame is a phone's lock screen and home screen, and the film happens in phone events:
- Her lines arrive as notification banners from @WithGbemi.
- The clock rolls from 1:20 to 1:40 on "20 minutes later".
- Badges count up on the home screen.
- Pull-to-refresh is the signature transition between beats.
- The EU finding lands as a notification carrying the real Commission screenshot.
- For the grayscale tip, the home screen literally loses its colour.

**References.**
- R1 TixFox (`inspiration/motion-references/Screen Recording 2026-10-11 at 19.56.03.mov`): UI that *does something* every scene, and a highlighter on the payoff word.
- The phone OS itself (the subject of the video).
- The critic's note: lock-screen anatomy (a big clock, stacked banners, badges), never chat bubbles. This keeps it apart from claude-rule's chat film.

**Look.**
- Ground: ink `#0C0D10`.
- Text: `#F4F1EA`; muted `#8B8D94`.
- Cards: `#1D1F25`.
- The **one accent is badge red `#FF4433`**.
- Grayscale scene: `#D6D5D1`.
- Type is Inter Tight only:
  - clock 200 at 330 px, tracking -0.045 em
  - banners 500 at 60 px
  - headlines 600 at 72-80 px
  - labels 600 at 34 px, +0.12 em tracking

**Motion (in numbers).**
- **Banners:** drop in whole from y-40 in 0.35 s (outExpo). Older banners step down by the new one's height + 22 px over 0.35 s. In 9:16 only the newest two stay.
- **Key-word events while a banner holds:**
  - a red underline wipes under the word in 0.35 s, on the word's time
  - or the word flips to red on its time
- **Clock:** a slow push from 100 to 104 % across the hold. The digit roll takes 0.48 s (outExpo) with a 0-8 px blur peak.
- **Pull-to-refresh:**
  - the screen drags down 22 % of the height (240 px at 1080) in 0.4 s (outExpo)
  - the 12-tick spinner holds about 0.45 s
  - it springs back at 2.0 Hz, zeta 0.67 (about 6 % overshoot)
- Motion blur comes from 4 sub-frames per frame.

**Signature transitions.**
1. Pull-to-refresh (the carrier: the screen itself is dragged down and new content arrives).
2. The badge burst: a red badge scales up to fill the frame and becomes a full-red card (planned for her biggest claims, at most 1 per minute).
3. App-close zoom: a scene shrinks into an app tile on the home grid.

**Sounds.** Notifications (message pop, bubble pop, positive), a switch tap on the pull, a clock tick on the roll, a marker line on the underline, pop-dry. The motion test has no whoosh.

**Risk.** It is dark and UI-heavy. Every 2-4 s needs a phone-native event (a badge tick, a banner, the clock, the pull) so it never feels like a slideshow of cards.

## B · THE FEED (`B-feed/`)

**Video type.** "Doomscroll film." The film *is* an endless vertical feed:
- Each idea is a full-bleed flat-colour post with an action rail (heart, comment, share) and an autoplay progress bar.
- Beats change with a swipe-up snap (spring 1.9 Hz, zeta 0.78, hard edges).
- The "stopping cues" (book chapter, next episode, Next page) get flicked off screen on "taken away".
- The scroll-bar thumb shrinks to nothing on "your feed does not have a last page".
- It ends on "keep scrolling forever".

**Look.**
- Grounds: bone `#F2EFE9`, tomato `#FF4F2E`, yellow `#FFE14D`, mint `#9FF0C8`, ink `#111`.
- Unbounded 800 caps at 100-130 px; Inter Tight for UI.
- The like count is always "?" (the unpredictable reward).

**References.** R1 (a colour per beat), R2 @johnbucog (cut rhythm).

**Critic's verdict.** Flat coloured caps grounds are too close to her deck look (reading-stack) and to two sibling kits. Kept as an alternative; not recommended.

## C · PATENT OFFICE (`C-patent/`)

**Video type.** "Design forensics." The features are shown as evidence:
- The **real patent drawing** (FIG. 8) plots onto paper.
- The camera pushes into "Pull down to refresh...", and a red marker circles it.
- The Guardian quote "Pull-to-refresh is addictive." (Brichter, 2017) lands on her word "addictive".
- Other features are drawn *in patent style*, each labelled "drawn in patent style · illustration":
  - Fogg's motivation / ability / prompt as numbered boxes
  - the red badge as FIG. B
- The EU releases appear as "Exhibit" screenshots.

**Look.**
- Paper `#F6F5F0`, ink `#151515`, one marker red `#E2382B`.
- Newsreader 500 for her lines; IBM Plex Mono 34 px for figure numbers and credits.

**Motion.**
- The plot-on wipe takes 1.1 s.
- The camera push is inOutQuart over 0.9 s (scale 1 to 2.2).
- The marker ellipse draws in 0.55 s.
- The underline is a child of the word, so it follows the line wrap.

**Critic's verdict.** It has the best single sequence, but the metaphor is thin for 15 minutes, and the paper and serif overlap ux-research. **Recommended use: C's FIG. 8 push-in as the real-source insert inside A for 4:52-5:25.**

---

## Talking-head (full edit) and shorts (`TH-shorts/`)
Four layouts from the menu (`inspiration/know-how/MOTION-REFERENCES.md`) over her real footage, never flipped, restyled into look A:

| Frame | Layout | Time in her video | What it shows |
|---|---|---|---|
| TH1 | **L2 words behind her** | 0:03 | "distract", 380 px, in badge red, set behind her head with her person matte (macOS Vision, `_tools/matte.swift`), plus her caption |
| TH2 | **L5 half and half** | 5:07 | the real patent FIG. 8 on the left half, her on the right (a crop, not flipped), with the caption centred in her half |
| TH3 | **L7 pop-around** | 8:19 | red badges only, popping around her head; the keyword "a red badge" on the wall to her right |
| TH4 | **L11 corner cam** | 10:57 | A's EU / Meta notification scene full frame, with her in a circle bottom-left; no caption, because the slide already says it |

**Shorts.** Proposed short: **"the pull-to-refresh story"** (4:52-5:25). The top label and spoken caption follow her Helvetica spec (`inspiration/know-how/SHORTS-PLAYBOOK.md`):
- **SH1:** her footage (a 9:16 crop from the 4K file).
- **SH2:** a full-screen film scene (the patent).

On light film scenes the caption box needs **72 % black** instead of 40 % to stay readable. That is a proposal, so ask her.

## Critic (fresh agent, harsh motion director, 2 rounds)
Scores out of 10 (fit / originality / craft / phone readability, then overall). The bar is 8; nothing has passed yet.

| | Round 1 | Round 2 | Main notes |
|---|---|---|---|
| **A lock screen** | 6.5 | **7.5** (8 / 7 / 7 / 8) | Fixed in round 2: banners drop in whole; the pull is 22 % with a clean spring; the Meta release now matches her line; 9:16 shows only two banners; all text is 34 px or larger. Fixed after round 2: the clock and stack in 9:16 are bigger and lower; the caption is on one line; the logo crop is whole; the test is re-rendered with 12 sub-frames against the strobing at the pull. Still to do for 8: a 20-30 s test on the red-badge section (7:42-8:20): badge 3 to 4, a new banner, blue to red, one sound on each hit. |
| B the feed | 5 | 5.5 (7 / 4 / 6 / 6) | It reads as her reading-stack deck grammar (caps on flat yellow, orange and mint) and sits next to database-indexes C and ux-research B. It cannot pass on originality. Dropped. |
| C patent office | 6.5 | 6.5 (6 / 8 / 7 / 6) | It has the best real-source moment, but the metaphor only covers about 30 s of the talk. Use it as the FIG. 8 insert inside A. |
| Talking-head + shorts | 5.5 | 7 (8 / 7 / 7 / 7) | Restyled into A after round 1. Fixed after round 2: the word behind her stays readable; the keyword is 40 px or more clear of her hand; the TH2 title is in Inter Tight; the corner cam sits 64 px from the corner. |

**Recommendation:** A as the film and the talking-head look, with C's real patent FIG. 8 as the source insert for the pull-to-refresh part. B is not recommended.

## Engine notes (nothing in studio/ was changed)
A needs these in the studio:
- a "pull" transition (drag the whole scene layer down by N % with a spinner layer, then a spring back that swaps the scene)
- a per-word style event (underline wipe or colour flip at a word time) on text elements

Both are small additions to the scene runtime, described here and not built.

## How to re-render
- Stills: `node _tools/render.mjs stills <page> 16x9|9x16 <outdir> name=t ...`
- Video: `node _tools/render.mjs video <page> 16x9 out.mp4 t0 t1 30 4`. This takes `/tmp/gm-render.lock`.
- Sound: `python3 _tools/mixtest.py spec.json`. It mixes her voice range with `library/sounds` placed by loudest peak, masters with loudnorm to -14 LUFS, and checks with ebur128.

## Checks (CHECKS.md)
| id | result | note |
|---|---|---|
| her-words | pass | every on-screen line is from `transcript.srt` (whisper fixes: Loren, Tweetie); "2009" is shown as a fact, never inside her quote; quotes from Brichter and Harris are credited (Guardian 2017, "reportedly") |
| text-safe-area | pass | 16:9 text >= 60 px inside the edges; 9:16 shorts captions sit in 1460-1660 |
| no-collisions | fixed | the round 1-2 critic notes on the home indicator, caption across the split, keyword over her hand and the word behind her head were all fixed (see the critic table) |
| type-size | fixed | all labels and credits are 34 px or more (were 30-32) |
| text-contrast | fixed | B's faded mint lines are now full ink; the caption box on light scenes is 72 % black (proposal) |
| banned-list | pass | no gradients, glow, particles or corner HUD; no type-on on every element in A; the badge red is the only accent in A |
| unique-look | pass (A, C) / fail (B) | the critic says B repeats the reading-stack deck grammar |
| reading-time | n/a | stills and 10-12 s tests; checked again in the full build |
| dead-holds | fixed | A's first hold has word events every ~1.5 s and a slow clock push; C still holds the drawing about 5 s (an insert only) |
| motion-craft | fixed | A's pull strobed with 2 and 4 sub-frames; re-rendered with 12 (clean blur) |
| sync | pass | each sound is placed by its loudest peak on the visual frame (`_tools/mixtest.py` prints the offsets) |
| loudness | pass | A -15.2 LUFS / -1.2 dBTP, B -14.8 / -1.1, C -14.4 / -1.4 (ebur128 after the AAC encode) |
| format | pass | 1920x1080, 30 fps, H.264 + AAC |
| editable | n/a | directions phase: these are seek(t) pages, not studio scenes yet |
| delivered | pass | the tests and contact sheets are copied to `~/Downloads/phone-distraction-directions/` |

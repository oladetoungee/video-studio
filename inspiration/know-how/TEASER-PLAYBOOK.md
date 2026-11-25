# Teaser playbook: the cold-open montage for LinkedIn and X (2026-10-14)

> **She exports, not us (her rule 2026-10-26).** Never export finished pieces for her or put files in her Downloads; any "hard-link into ~/Downloads" step below is retired. Build, check with review renders inside the project, give her the editor link.

Her request (2026-10-14): a new deliverable per video for LinkedIn and X: "like when a YouTube video is about to start they
take snapshots of a few banger things the person said during the video and use it as an intro… some people do a countdown
once you click on the video… different snapshots of them saying different things… things that would actually grab
people's attention… in different ratios… each video can have a different vibe". About 1:30-2:00.



## 0a. v3 (2026-11-12): a teaser a stranger can FOLLOW (her rule, read this first; overrides the bite choice in v2)
Her note: "it doesn't flow... we take a part out of a portion of the video and we just move to another part... the person
cannot follow... someone that watches just the teaser can literally be okay with that... I don't want the teaser to just be
everywhere." Keep the trailer energy (cuts shown, title cards, music sections), but the BITES tell one small story:
1. **Hook = one relatable stretch, kept whole** (10-25 s): a run of her lines on ONE idea, e.g. "real users double-click
   ta-ta-ta... real users open different tabs... they are just being users". Not single lines from all over.
2. **The idea, in one statement** (one bite): the line that names what the video is about ("someone is going to report an
   issue, and it's going to be exactly that edge case you never thought of").
3. **A quick tour: 3-5 examples, each a COMPLETE mini-thought** (setup + what happens, 6-20 s each), in the video's order,
   a title card naming each one (DUPLICATE ORDERS, RACE CONDITIONS, NAMES...). Never a punchline without its setup, never a
   "he"/"that" whose subject was cut. Don't explain everything: the fix stays in the full video.
4. **Close on her takeaway line** (one bite), then the ending (outroCard).
Test before building: write the teaser as plain text (her lines in order) and read it cold. If a sentence needs something
that isn't in the teaser to make sense, change the bite. 85-110 s.

## 0. v2 (2026-10-15): a MOVIE TRAILER, not a smooth montage (her rule, read this first)
Her note on v1: "you're trying to make it very smooth… but they should feel like I'm moving from one point to another…
some form of transition… like a movie teaser." So the joins are SHOWN, never hidden. This section overrides anything
below that says to hide the jumps.

**Structure (bites in this order):** cold open (countdown or the sharpest line, topic big) -> **act 1 setup** (2-5 bites:
the problem) -> **title card** -> **act 2 escalation** (2-4 bites) -> **title card** -> **act 3** (3-6 bites, faster cuts)
-> **the beat drop**: the music stops (tape stop) and the **biggest line** plays in near silence -> **title card with the
topic** (boom, music back up) -> optional **stinger** (one short line after the title, e.g. her question) -> **end card**.

**Cut grammar (numbers):**
- Every bite change is a deliberate cut with ONE of: `flash` (2-3 frames of white or the film's accent, alpha 1 / .65 /
  .3), `black` (2-4 frames), `whip` (8 frames, a film-ground panel with motion smear crossing right -> left), `glitch`
  (3-4 frames of slices and colour bars, one black frame). Never the same type twice in a row; about 4 types per teaser.
- **Title cards**: 2-3 per teaser, 0.8 s each (the last, with the topic, 1.2-1.3 s); 1-2 words (max 3), in the film's look
  (its ground, its type, its accent on the last line), hard in with a 0.22 s scale slam (1.07 -> 1), hard out (a 2-frame
  accent flash or a black frame). They sit on silent "gap" bites, so her voice is never covered.
- **Music in sections**: act 1 at -6 dB, +3 dB at each card (-3, 0), +3 after the topic card; a short riser peaking on each
  card's first frame; the music stops for the biggest line (`TZ.drop`) with a tape stop 0.55 s before; the end card opens up.
- **Sounds on cuts** (SOUND-PALETTE): flash -> shutter, black -> impact (`boom`), whip -> `swipe`, glitch -> `glitchHit`,
  card -> `hit`/`paper`, topic card -> `boom`; risers `riserShort`, `tapeStop`. 0 whooshes (<= 1 in 6 at most). One sound
  per cut; cut sounds are never thinned by the cue pruning (`keep`).
- Inside a bite keep the reading rules (keyword pops, film inserts in step with her words, captions on every spoken line).

**Engine** (`studio/runtime/teaser.js`):
```js
const B = TZ.bites(), G = TZ.gaps();             // speech bites (lead = 0) and the title-card gaps, both in play order
TZ.cut(3, { type: 'black' });                    // a cut into bite 3: 'flash' | 'black' | 'whip' | 'glitch'
TZ.cut(G[0], { type: 'card', text: 'THE FIX', draw: (t, r, lt, text) => {...}, out: 'flash', outOpts: { color } });
TZ.music(G[0].t0, -3, 0.08);                     // the bed's level from t (dB, ramp s): sections
TZ.drop(B[13].t0 - 0.2, 4.4);                    // the music silent for d s (the beat drop)
```
Manifest: a gap is a bite `{"gap": 0.8, "at": <a silent source second>}` (the lead's start works); `footedl.py` keeps it
whole; `TZ.bites()` numbering ignores gaps, so adding a card never renumbers a script.

**Mandatory critic (every teaser, before export):** a FRESH agent that did not build it, run in the foreground, looks at a
contact sheet (every 1 s) plus the frames around each cut and card, and the cue list. Scores 1-10 on: (1) stops the scroll
in 2 s? (2) understandable cold, for someone who never saw the video? (3) feels like a trailer with clear beats (acts,
cards, a drop)? (4) makes you want the full video? Overall >= 8 to ship; fix what it names (frame numbers, measurable),
re-score; at most 2 rounds, then report the score honestly.

## 1. What her two references do (frame study)
Both are silent screen recordings (no audio track: no transcript and no sound study possible), 1072x606 at 100 fps
captures of a YouTube player. Studied with scene detect (threshold 0.2), 1 fps contact sheets, 4-6 fps strips around the
changes, single frames.

| | `intro.mov` (65.9 s): solo creator, talking head | `intro2.mov` (50.9 s): two-person podcast |
|---|---|---|
| Length of the montage | ~58.6 s of bites, then 3.1 s SUBSCRIBE card, then the video starts (61.7 s) | ~48.6 s of bites, ~1.7 s black, then the video (50.3 s) |
| Bites | ~22-25 lines, 1-6 s each (median ~2.5 s); a new caption about every 2.4 s | ~20 lines, 1-4 s each; a new caption about every 2.4 s |
| Label | "coming up…" italic, white, small, centred mid-frame, on every frame | "coming up…" bold italic, white, top right, on every frame |
| Captions | lowercase as spoken, bold italic, pale yellow, bottom third, no box | lowercase, small white, bottom centre, no box |
| Framing / effects | a camcorder overlay (REC, 16:9[F], HD, 30 fps) on top; the picture shrinks into a black or brown frame for a few bites (13-15.8 s, 52.9-54.3 s); a 3 s meme insert at 2.5-5.2 s; a flurry of quick cuts / zooms at 44-48 s | punch-ins on one speaker for emphasis (2.9-3.3 s, 7.3-9.7 s, 45.2-47.1 s); one blur transition (~31 s); everything else locked-off |
| Order | hook ("this video is about how I'm done with social media") -> tension -> the most personal line near the end ("this is not sustainable for my soul", "I can't keep doing this") -> subscribe card | topic line ("today we just want to talk about dating") -> hot takes -> a laugh ("i am tireddd!") -> black -> episode |
| Countdown | none in either | none |

KEEP: one label on every frame, captions on every line, a new line every 2-3 s, punch-ins and reframes (v1 hid the jumps; v2 SHOWS them, section 0),
one insert that is not her, a clean end. CHANGE for LinkedIn/X: the montage is the whole post (not an intro before the video),
so it must say what the video is on frame 1 and end on where to watch; "coming up" is YouTube-intro language (a cold critic
read it as meaningless in a feed): we write **"new video"**.

Online (rules of thumb from creator blogs, not platform rules): a cold open should start on the most interesting moment
within 0-3 s and deliver what the title promises; LinkedIn feed video plays muted (burn in captions), native uploads beat
links, square / 4:5 suit the phone feed, 16:9 suits desktop and X; hook in the first ~3-8 s. Sources:
[renderforest](https://www.renderforest.com/blog/how-long-should-youtube-intro-be),
[subscribr](https://subscribr.ai/youtube-strategy/youtube-analytics-improve-video-hooks-intros),
[creatoressentials](https://www.creatoressentials.com/glossary/cold-open/),
[opus.pro](https://www.opus.pro/blog/ideal-linkedin-video-length-format-for-retention),
[kapwing](https://www.kapwing.com/resources/linkedin-video-size-guide-aspect-ratios-resolution-length-and-best-practices-3/).

## 2. The spec (in numbers)
- **Length**: 85-100 s including the end card (her 1:30-2:00; the feed rewards shorter, so we sit at the low end).
  Never over 2:00.
- **Bites**: 12-14 of her lines, each 2-12 s (median ~5 s; longer than the references because hers are explanations, not
  hot takes). Each one a whole sentence that stands alone and means what she meant (checked against the transcript and
  BRIEF.md); never a slip, a retake or a line that sounds like the opposite of her stance. Cut with the bite finder edges:
  start 0.12 s before the first word (never into the previous word), end 0.22 s after the last word (never into the next
  word); pauses inside a bite are tightened by footedl like any moment (`holds` keep a pause that carries a word).
- **Order**: (countdown) -> **hook** (the sharpest question or the promise, 2-10 s) -> **the problem / tension** -> **her
  answer** -> **the turn** -> **payoff** -> **the button** (a question or a cliffhanger that only the full video answers) ->
  end card. Bites may come from anywhere in the video and in any order.
- **At most ONE riser (`riserShort`) per teaser**, and none before every title card (her note 2026-10-18: the long dramatic swell was in every teaser, under "within weeks the app had millions of users": overused). Cards land on a hit / boom without a build-up.
- **NO "new video" tag / pill at the top of the teaser, ever** (her rule 2026-10-17: "please remove it"). The topic still opens big on frame 1, then leaves; the end card says where to watch.
- **Frame 1**: the topic in plain words, big: >= 74 px at 1920 wide (>= 60 px on a 1080 frame), with "new video". It stays
  ~2.5-3 s, then shrinks into a small pill ("new video · <topic>", >= 32 px) that stays on her shots for the rest. The pill
  hides on film inserts (their own type is the picture).
- **Countdown (optional, per vibe)**: 3 s, only when the recording has a silent stretch to sit under it (no new engine
  "head" needed: the silent stretch is bite 0, `"lead": true`), and it must carry the topic. 3-2-1 in the video's own
  language (a draining progress ring, a lock-screen clock, sticky notes). Clock ticks on each number.
- **Her framing**: a different framing on every bite (wide / mid / close, slow pushes, punch-ins on a key word) so two bites
  never look like a jump cut. In 1:1 and 4:5 the zooms are eased back (`TZ.zoom`), never below fit.
- **Inserts**: 15-35 % of the time, 1-5 s each, from her own film, **in step with her words** (`sync: '<phrase>'`: the film's
  word timings, so its type lands with her voice). If the insert spells her words, captions step aside (`noCaps`); never two
  texts saying the same thing. No blank or still-typing frames: start an insert where the film's screen is already readable.
- **Captions**: on every spoken line. 16:9 = her own 16:9 style (Helvetica Neue Light, #E2D8CC, her rule 10-14, contrast box
  only where measured contrast < 3:1); 1:1, 4:5 and 9:16 = her shorts style (Helvetica Neue Medium, #DFD7CB on 40 % black).
  A caption never spans two bites (`FOOT.capBreaks`). 1-2 keyword pops (`TH.keyword`) on the strongest lines.
- **Sound**: a music bed that rises (tracks with a soft start: 282, 750, 766, 1009, 480; ducked ~18 dB under her voice, so it
  opens up on the end card); a sound on about every second bite change, chosen by meaning (notify, shutter, tape, cash,
  clock, error, glitch, paper, pop, tick); 0 whooshes; a riser that peaks on the end card's first frame + a hit; -14 LUFS,
  true peak <= -1 dBTP.
- **End card**: 6.5 s, in the video's look: "new video", the YouTube title (>= 60 px at 1080 / >= 72 px at 1920, shown at
  once, editable), **@WithGbemi** big, "Full video on YouTube" (+ youtube.com/@WithGbemi >= 32 px). A slow 3.5 % push so the
  last seconds are never dead still.
- **Ratios**: 16:9 1920x1080 (X, LinkedIn desktop), 1:1 1080x1080 and 4:5 1080x1350 (LinkedIn / X phone feed); 9:16 on
  request (opens in the editor; not exported by default to save disk). H.264, 30 fps, 9 Mbps (16:9) / 8 Mbps.
- **Every video its own vibe**: label, countdown and end card are drawn in the film's look (chat thread; query plan; lock
  screen; research wall). Never reuse another video's teaser look.

## 3. How to build one (engine)
1. Pick the bites from `talking-head/data/raw_words.json` (corrected words). A scratch helper finds exact edges from
   "first words" / "last words".
2. `talking-head.json`: a moment `{ "id": "teaser", "kind": "teaser", "bites": [[in, out] | {in, out, holds}, ...],
   "lead": true (bite 0 is the silent countdown stretch), "tail": 6.5, "captionStyle": "shorts", "music": ["<id>", 0],
   "endCard": {"title": "<YouTube title>"}, "script": "teaser/teaser.js" }`, plus `"teaserOut": "../outputs/teaser"`.
3. `python3 studio/tools/footedl.py <talking-head.json> teaser` (plans each bite; edl.json "bites" = output times).
4. `teaser/teaser.js` with `runtime/teaser.js` (`TZ.bites / at / talk / insert / card / layer / endCard`), see the four
   projects' scripts.
5. Stills (`composite.mjs stills ... --aspect 16x9|1x1|4x5|9x16 --captions`), look, fix; export
   (`GM_MIN_FREE_GB=2 composite.mjs export <man> teaser --aspect 16x9,1x1,4x5`); the first export splices the bites into
   `talking-head/build/splice/` (4K HEVC, ~230 MB; delete when done); ffprobe + ebur128 + freezedetect + a contact sheet.
6. A fresh critic per video: would a stranger on X/LinkedIn stop in 2 s, understand the topic, want the full video? >= 8.
7. Hard-link into `~/Downloads/<slug>/teaser/`; editor `/moment/<slug>/teaser/` (16:9, 1:1, 4:5, 9:16).

## 4. Lessons (round 1 critic, claude-rule, 6/10 -> fixes)
- Opening on a film screen still typing a date taught a stranger nothing in 2 s: open on her face with the sharpest line and
  the topic in big type.
- "coming up" means nothing outside YouTube: "new video".
- 20 s of plain talking head (27-47 s) read as dead: an insert or keyword at least every ~8 s.
- Film inserts whose content sits small in a corner (the tilting plank) get `zoom` + `zoomAt` + `zoomGround`.
- End card text was too small for a phone and the title typed on: show it whole, >= 60 px.

## Ending: "FULL VIDEO ON YOUTUBE" (2026-11-10)
The teaser's end card is now the shared drawn ending (manifest `outroCard`, studio/README.md "Ending"), replacing a project-drawn
`TZ.endCard` (its sounds go too; the music cues stay) unless her clip (`"outro"`) exists. Recomposed per size: 16:9 thumbnail left +
title / channel / Subscribe / Like-Comment-Share right; 1:1 two columns with the actions under them; 4:5 and 9:16 a centred stack.
Thumbnail = the video's recommended one, title = the YouTube title, colours from the video. No counts. Check with
`studio/tools/outrostills.mjs` before handing over.

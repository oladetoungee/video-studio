# Writing a film brief in numbers (directed prompt, render contract, critic format)

Adjectives are where the default AI look lives ("premium, modern" gives navy space, glow, particles, a made-up tagline).
Every brief, scene request, critic note and follow-up here is written in **numbers, frame numbers and named things to avoid**.
Sources: Florence's "Opus 5.5 Motion Lab" (`inspiration/know-how/opus-motion-lab-florence.md`), the Opus 5.5 Motion Design
Harness / Mortiflix and Mr. Claude's 8 prompts (`inspiration/know-how/harness-and-8-prompts.md`); what we took and why:
`inspiration/know-how/WORKFLOW-UPGRADES.md`. The checks every deliverable reports are in `CHECKS.md` (workspace root).

## 1. The brief (fill every line; one per film in `projects/<slug>/BRIEF.md`, one short one per scene request)
```
GOAL     one sentence: what the viewer should feel / do.            e.g. "Understand in 5 min why a public marriage register worries her."
OUTPUT   16:9 1920x1080 AND 9:16 1080x1920 (recomposed, never cropped); 4:5 = the 9:16 layout fitted.
TIME     <s> x 30 fps = <frames>; narration sets the clock (words.json); no loop / loop (last frame flows into frame 0).
LOOK     ground hexes (one per scene), ONE accent hex per scene, type: family weight size(px) tracking(px) for display,
         body and mono labels (labels >= 32 px at 1080 wide). Written once in the film's kit file, never per scene.
MOTION   easing as MOTION.EASE names / cubic-beziers (enter outExpo .16,1,.3,1 or outQuint .22,1,.36,1; moves inOutQuart
         .76,0,.24,1; exits inExpo .7,0,.84,0 at ~55 % of the entrance); springs as damping ratio (0.8 premium, 0.5 playful;
         position may bounce, opacity never); durations in frames (moves >= 9 f, big moves 15-23 f); stagger 2-4 f.
SHOTS    one row per scene: frames f0-f1, the ONE hero move, its landing word (word + time), what carries the cut into the
         next scene (transition board, section 4). Default to a hard cut on a word or beat; something changes every 2-4 s.
SOUND    music bed and its duck (voice 12-18 dB over music while she speaks); which actions get a sound (about 1 in 5,
         the hits that matter); each sound's role from film.json; the frame it lands on.
BANNED   name the exact defaults to avoid for THIS film (not "avoid generic"): e.g. "no glow, no gradient, no particles,
         no fade-and-slide on every element, no centred title + three cards, no corner HUD, no look from <previous film>".
QA       stills at named frames (start / middle / settled of each beat) -> contact sheet -> onion skin + speed graph of every
         new kind of move -> numeric audit -> sound QA -> CHECKS.md report. Only then the full render.
```
Read time on screen: **words / 3 + 1 s after the text lands** (Mortiflix), and never less than CLAUDE.md's 0.3 s per word
+ 0.5 s (`MOTION.hold(words)`). ~150 spoken words per minute when a script has to fit a length.

## 2. Render contract (paste under any request that writes scene code)
- Every frame is a pure function of time: `renderFrame(t)` / `seek(t)`; no `Date.now`, timers, CSS transitions, unseeded
  `Math.random` (use `hash(n)`), no network except the house fonts. Rendering the same frame twice gives the same pixels.
- All timing numbers come from word times (`P()`, `PS()`) or one constants block at the top of the scene file.
- Use `MOTION.*` names for easings, springs, durations, beat grids (`studio/runtime/motion.js`); core's `E.*` and `sn()`
  stay valid. Register what must be true with `MOTION.expect('label', t, {el|state})` next to the visual.
- Loops: render frames 0..N-1 and make N-1 flow into 0 (check the seam with `ffmpeg -stream_loop 1`); every period in the
  scene divides N.
- Check a beat with 3 stills (start, middle, settled) before rendering motion.

## 3. Critic and follow-up format (fresh critic agent, default reject, 8/10 bar)
- Each defect: **frame number(s) + what is measured + the measurable fix**, e.g. "f973-975: empty ground for 3 frames after
  the cut (board: blank after cut) -> start the headline type-on at f973" or "f2313: impact's first peak lands 105 ms
  before the slam (soundqa) -> trim the sample's pre-hit or move the cue +3 frames". Never "feels slow", "make it pop".
- Sort every note (hers or a critic's) into **error** (a rule was broken: it gets a check, see CHECKS.md) or **taste**
  (a preference: it goes into CLAUDE.md "Her taste" / THUMBNAILS.md and FEEDBACK.md).
- Answer every note in the next version with **exactly what changed** ("moved the impact cue from 77.09 s to 77.19 s",
  "trimmed 130 ms off mk1143"), never "addressed" or "fixed".
- Reports quote the tools: `lab.mjs audit` summary line, `soundqa.py` numbers, `render.mjs contrast`, the CHECKS.md table.

## 4. Transition board (`projects/<slug>/film/data/transitions.json`, made by `node studio/tools/lab.mjs board <slug>`)
Every cut names its **carrier** (what brings the next shot in: a shape, a line, a word, a camera move, or "hard cut"),
**why** (the reason, >= 20 characters) and the **word it lands on**. The tool fills frames, kinds and landing words and keeps
what the author wrote. Rules: the screen never goes blank or flashes white between shots; a crossfade only when nothing
better exists; 2-4 transition families per film. Our engine's house transitions: hard cut (different grounds) and whip
(same ground). Review the board as a still per cut: `lab.mjs contact <slug> --from <t-0.2> --to <t+0.4> --every 1`.

## 5. Style prompts worth reusing (Mr. Claude's 8 explainer styles, each with its own Avoid line)
Kinetic type on word timestamps (we have it: `KT`) · whiteboard / hand-drawn strokes (`handLine`, `handCircle`) ·
isometric workflow (blocks rise, a dot travels between steps) · data chart from a CSV, numbers count to the real values ·
concept built term by term · app walkthrough from real screenshots (zoom, cursor, callouts) · **paper collage** (photo
grounds + cut-outs at depths, white paper edges, parallax 1.0 / 0.5 / 0.2: fits her collage-thumbnail taste) ·
talking-head auto edit (cut silences > 0.5 s, captions 2 lines max). When proposing a film's 2-3 directions, any of these
can be one, written as a brief above with its own BANNED line.

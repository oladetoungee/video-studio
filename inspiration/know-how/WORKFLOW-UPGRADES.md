# Workflow upgrades from what Gbemi found online (2026-10-11)

Her brief: "anything that can make our workflow produce better things… I'm leaving you to it." Each source below: what it
offered, what we adopted (with the file), what we skipped and why. Then the measured results on ghana-marrify.
Nothing she approved changed: pixel hashes of reading-stack (150 times, 16:9 + 9:16, against `film/build/hashes/`) and
ghana-marrify (112 times, 16:9 + 9:16) are identical before and after the runtime changes.

## Sources

### 1. Florence (@flxrnc), "Opus 5.5 Motion Lab" (her paste; notes in `opus-motion-lab-florence.md`)
Offered: briefs where every adjective becomes a number; easing / spring / duration / beat-grid numbers; a render contract;
the lab loop (stills, contact sheet every 12th frame, onion skin, speed graph, numeric audit reading the live scene every
frame); sound measured, never listened (hit on frame+1 with the first peak the largest, hits 3-6 dB over the bed, phone-band
loudness, DC, AAC true-peak headroom, loop seams).
Adopted:
- `studio/PROMPTS.md`: the brief template (GOAL / OUTPUT / TIME / LOOK / MOTION / SHOTS / SOUND / BANNED / QA), the render
  contract, the critic format (frame numbers + measurement + measurable fix).
- `studio/runtime/motion.js`: one global `MOTION` with what core.js lacked: cubic-bezier presets (outExpo, outQuint,
  inOutQuart, inExpo, outBack) and a bezier solver, closed-form damped spring by damping ratio (+ settle time, k/d ->
  ratio), duration / stagger ranges, `hold(words)`, `exit(d)`, beat grid computed from time, `MOTION.expect()` /
  `MOTION.state()`. core.js's `E.*` and `sn()` stay. One global so it can't clash (blink.js already has its own `spring`).
- `studio/tools/lab.mjs`: `contact`, `onion`, `speed`, `audit` (+ `board`, from Mortiflix). Frames are analysed inside
  headless Chrome, nothing written but small PNG / JSON reports.
- `studio/tools/soundqa.py`: all the sound measurements.
Skipped: building tonal hits as cosine-crest buffers (we use real Mixkit sounds, her rule; we measure their first peak
instead); animation principles for characters (squash / stretch numbers) as tooling: they're in PROMPTS.md as numbers to
ask for. **Not found**: the rest of the article after "The lab loop" (equipment, last mile, fixes table). It isn't indexed
anywhere we could reach and X blocks fetching. If she pastes the rest, fold it in here.

### 2. Opus 5.5 Motion Design Harness + Mortiflix (github.com/GTKottman/mortiflix-oss, **AGPL-3.0**)
Offered: gates only the owner approves (brief, script, style frames, transitions, animatic, final), with approved work
frozen; named checks per pipeline (the explainer has 14, from spelling-and-facts to transitions-carried) reported
`pass | fixed | n/a` with notes, a missing check refused; "for every error no check caught, write a new check", proposed then
approved studio-wide; TASTE.md (one line per lesson, inlined into every session); a transition board (carrier, why,
landing word, a strip of mid-transition frames tested for blank / flash); notes answered with exactly what changed; read
time words/3 + 1 s; music ~18 dB under voice; sound on ~1 action in 5; guards against runaway sessions.
Adopted (patterns only; AGPL code is not copied):
- `CHECKS.md` (workspace root): our named checks (words, picture, motion, sound, files), each with how it's measured and
  its target, reported as a table on every hand-off; "Added from her feedback" grows by one check per uncaught error.
- PROCESS.md section 2: the gates she approves, the lab loop, the CHECKS table, error-or-taste sorting, answering notes with
  exactly what changed.
- `lab.mjs board` -> `film/data/transitions.json`: every cut with its kind, frame and landing word; carrier / why for the
  author (kept on re-runs); flags cuts whose next frames are near-empty or flash.
- `soundqa.py` music-under-voice measure; PROMPTS.md read time words/3 + 1 s and ~1 sound per 5 actions.
- TASTE.md: **not a third file**. FEEDBACK.md (every note, with where it's enforced) + CLAUDE.md "Her taste" + THUMBNAILS.md
  already play that role and every session reads them; FEEDBACK.md now says to sort each note into error (-> CHECKS.md) or
  taste (-> CLAUDE.md / THUMBNAILS.md).
Skipped: their Remotion pipeline and `mfx` CLI (our studio already has the engine, editor and queue); session-count guards
(our agents are run by the main session); the animatic gate as a separate step (our 45 s preview is it).

### 3. Mr. Claude's 8 explainer prompts (@claudeskills101)
Offered: eight styles each with an explicit Avoid line. Adopted: PROMPTS.md section 5 lists them as starting points when we
propose a film's 2-3 directions (paper collage fits her collage-thumbnail taste; isometric and data chart give "more
visuals"). Every brief now has a BANNED line naming exact things. The full prompt texts were truncated in her paste.

### 4. Replies: adaptive motion blur (Marouane Gazouzi, github.com/Kimeur/motion-launch-videos, MIT)
Offered: subframes from measured movement (one per 5 px, 4-64), never across a cut. Adopted in `studio/runtime/film.html`,
**opt-in per film** (`film.json` `"motionBlur": true` or `render.mjs export --blur`): 180 deg shutter centred on the frame,
clamped inside the scene, movement measured from the edit boxes, one subframe per 5 px up to 64, averaged in linear light.
A frame where nothing moves is byte-identical to the unblurred frame (tested); off for every existing film. His min of 4
subframes on any moving frame is not copied (ours starts at 1 because a still frame must stay identical).
Limitation: drawings without an edit box (`txt`, `KT`, `grp`) aren't measured; set `min` for such films.

### 5. ui-skills.com (catalogue by ibelick, MIT): 17 skills
Installed into `.claude/skills/` (MIT, LICENSE copied, a house note on top saying where her rules win):
- `review-animations` (Emil Kowalski) + STANDARDS.md: motion-craft review (curves, never scale from 0, stagger 30-80 ms,
  blur to hide an imperfect crossfade, review in slow motion). Its "UI animations under 300 ms" is for product UI, not films.
- `better-typography` (Jakub Krehel) + 6 reference files: line-height, tracking, tabular numbers for counters, line length,
  load every face. For thumbnails, carousels and film type.
Skipped: `baseline-ui` (React/Tailwind product rules; its design bans are already in CLAUDE.md's Banned list, and "never
change letter-spacing" fights her tight display type), `12-principles-of-animation` (no licence file: read, not copied),
`frontend-design` / `impeccable` / `taste-skill` / dashboard and React skills (web product UI, not video).

### 6. everythingproducteducation.com, "Create motion graphic videos with Claude"
Offered: story in four parts, storyboard per scene, Remotion + FFmpeg one scene at a time with a still for approval first,
outside AI B-roll tools. Same as our process. Adopted the reading-speed number (about 1/3 s per word, in PROMPTS.md).
Skipped: paid AI B-roll (Veo, Kling, Runway...): against "real images, never invented" and free licences.

### 7. Claude Motion and Claude Dashboards (Anthropic, beta, 2026-10-08)
Confirmed: https://claude.com/resources/articles/dashboards-and-motion. **Motion**: Claude writes code that animates text,
charts, shapes and images (no video-generation model), editable, MP4 out; **Team and Enterprise plans only**, started with
`/motion` in the Claude app. **Dashboards**: live dashboards on data warehouses. **Unconfirmed**: any way to use them from
Claude Code on this Mac (nothing says so), and which plan she is on. If she has Team / Enterprise she could try `/motion`
for quick one-off clips; it's the same idea as our studio (code-animated, her real content), so nothing to port.

### 8. Others
HyperFrames (HeyGen, Apache-2.0): HTML + GSAP seeked per frame + FFmpeg, our architecture; not adopted. ClaudeAnimationBase
(John Heibel, MIT, p5.js): "reads" per shot set its length, one BPM drives all motion, detail crops that follow a point;
noted. Alex dc's "Code to Video Studio": the repo now returns 404, not reviewed.

## Measured on ghana-marrify (2026-10-11; nothing changed in her mix or film)
Sound (`python3 studio/tools/soundqa.py ghana-marrify --export outputs/video/ghana-marrify_motion_16x9.mp4`):
| measure | result | target | verdict |
|---|---|---|---|
| stems vs scenes | cue key e78eb359 = stems | same | up to date |
| loudness / true peak, master WAV | -14.0 LUFS / -1.9 dBTP | -14 / <= -1 | ok |
| after AAC 256k (and the real export) | -14.0 LUFS / -1.9 dBTP, lift 0.0 dB, audio offset 0 ms | <= -1 dBTP | ok (the 4x-oversampled limiter at 0.80 already leaves AAC headroom) |
| voice over music while she speaks | 13.2 dB (music 4.5 dB fuller in pauses) | 12-18 dB | ok |
| phone band (200 Hz-6 kHz) vs full | -15.1 vs -14.0 LUFS (1.1 dB); 0.9 % energy < 60 Hz, 19.8 % < 200 Hz | within 3 dB, < 10 % | ok |
| DC offset | -75 dBFS mix, below -117 dBFS for music / sound effects | < -60 | ok |
| hit timing, first peak vs cue (73 cues, typing excluded) | median -44 ms; pops -9 ms; impacts -105 ms; lids -82; whooshes -73 | within one frame after | impacts early |
| hit level over music, first 60 ms | median +11.7 dB; impacts -0.1 dB | >= +6 | impacts too quiet |
| hit level over voice + music | median -5.7 dB; impacts -18.5 dB | 3-6 dB (voice films: not under -10) | impacts buried |
Picture (`node studio/tools/lab.mjs audit ghana-marrify`, 9080 frames in ~20 s; `lab.mjs board`):
74 sound cues checked against where the picture changes: 24 flagged 2-4 frames off, 9 on soft fades (no single hit
frame), 26 with no clear visual hit. Spot checks: f977's pop is exactly on its text fade-in; f3670's pop sits 4 frames
after the word highlight but probably belongs to the character settling. So they are leads, not verdicts. Motion flags:
0 dead holds, 17 dead stops, 1 linear move, 12 short moves (mostly 3-frame card exits), 17 reading-time flags.
Transition board: 41 cuts, 18 open on about 3 frames (0.1 s) of empty ground before anything appears (e.g. f973-975 into
"Is it actually licensed?").
Recommended fixes (for her to decide; nothing applied):
1. Impacts: trim mk1143's 130 ms pre-hit so the slam is its first peak (or swap the sample), raise the impact role from
   -9 dB to about -3 dB, re-mix (editor: Advanced -> Re-mix the sound), re-run soundqa.
2. Whooshes / lids that peak 70-80 ms early: check each against its move in a contact strip; move the cue or set the
   role's align so the crest meets the move.
3. Empty frames after cuts: start the first element on the cut frame (type-on or the card already moving in) where she
   wants a snappier cut; it's a style choice, so ask her.
4. Keep the WAV master's 0.80 limiter ceiling: AAC added no peak here, so no extra headroom is needed.

## Next suggestions
- Register `MOTION.expect()` checks in the next film's scenes from day one (each hero reveal on its word), so the audit
  proves "visuals land on her words" every render.
- When she pastes the rest of Florence's article (after "The lab loop"), add its fixes table here and to CHECKS.md.
- Try a short motion-blurred export of one fast scene in the next film (`--blur`) and let her compare.

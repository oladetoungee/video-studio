# Sound palette (2026-10-12): fewer whooshes, more kinds of sound

Her note (2026-10-12): "less whoosh, more varied sound effects (shutters, build-ups / risers, etc.)". Earlier notes still
stand: real, clearly audible social-media sounds (FEEDBACK.md 09-29), present but not overloaded, and every hit on its
visual frame (CLAUDE.md sound rules, CHECKS.md sync / hits-audible).

Library: `library/sounds/` (now **102 files, 6.8 MB**), listed in `library/sounds/index.json`. All Mixkit, **Sound Effects
Free License** (commercial use OK, no attribution, don't redistribute as a pack). The 51 files added today carry extra
fields in index.json: `role`, `seconds`, `onset_s` (first sound above 10 % of peak) and `loudest_s` (time of the loudest
peak; with `align: "peak"` the mixer puts this on the cue frame). Six long ones were trimmed (noted in `note`).

## The palette by role
Use a film's `film.json` `audio.sfx.roles` (`library:<name>`). Levels below are starting points relative to the role
levelling in `studio/tools/stems.py`; check with `soundqa.py` (hits +6 dB over music, not under -10 dB against voice).

| role | when | files (library:) | align | db |
|---|---|---|---|---|
| **shutter** | a photo, screenshot or real document lands; a "snapshot" freeze; her still photo appears; thumbnail-like card | `shutter-click`, `shutter-hard-click`, `shutter-vintage`, `shutter-digital`, `camera-autofocus` (focus pull before a reveal) | peak | -4 |
| **riser** (build-up) | the 1-4 s before a big reveal, a card (L10) or a chapter title; ends exactly on the hit | `riser-cinematic-trailer` (2.6 s), `riser-metallic-sweep` (4.1 s), `riser-synth` (9.3 s, use 2-4 s of its tail via maxlen + peak align), `riser-suspense-swell`, `riser-short-stutter` (6.5 s), `drum-roll-tension` (5.6 s, ends on its hit) | peak | -14 to -10 |
| **hit** (soft, lands a riser or a punch line) | the reveal frame after a riser; a strong claim; a card slamming in | `hit-short-bass`, `hit-futuristic-bass`, `drum-deep-impact`, `bass-quick-switch`, plus `punch-soft-quick`, `hit-weak`, `wood-hard-hit` | peak | -6 |
| **pop** | stickers, logos, icons, chips appearing (L7 pop-around, L4 side stack) | `pop-dry`, `pop-hard-click`, `pop-cartoon-bubble`, `notify-bubble-pop`, `explainer-pop-whoosh`, `pop-long` | peak | -5 |
| **ui-tick** | a cursor click, a toggle, a checkbox, a menu option, a counter step | `ui-select-click`, `ui-modern-select`, `ui-click-tone`, `ui-option-select`, `ui-device-click`, `mouse-double-click`, `switch-tap`, `click-classic`, `click-box-check` | peak | -4 |
| **notification** | a message / alert / phone UI appears; "someone looked up your record" | `notify-message-pop`, `notify-positive`, `notify-confirmation`, `bell-notification`, `magic-notification-ring` | peak | -6 |
| **typing** | text typing on in a mockup, a search bar, a document being written | `typewriter-soft-click` (per letter, sparse), `typewriter-single-hit` (per word), `typewriter-return-bell` (end of a line), `keyboard-typing` / `laptop-typing` (4 s beds, `maxlen` to the type-on length), or the studio's `KEYS` | start | -8 |
| **glitch** | a "digital", "data", "error", "hack" word; a screen switching; the R2 RGB-split word | `glitch-small-electric`, `glitch-static`, `glitch-intro-text`, `glitch-crackles`, `glitch-rewind-transition` | peak | -8 |
| **tape / record** | a rewind ("let's go back"), a stop ("wait"), a record scratch for a turn in the story, a needle drop to start music | `tape-rewind-fast`, `tape-rewind`, `magic-rewind`, `tape-switch`, `tape-stop-slowdown` (3 s), `record-scratch-stop`, `needle-drop` | peak (rewind: start) | -6 |
| **cash / ding** | money, prices, "paid", a win; a correct answer; "done" | `coins-clinking`, `coin-win`, `bell-service-ding`, `bell-cooking-ding`, `correct-answer`, `achievement-bubbly` | peak | -6 |
| **error** | "no", a wrong assumption crossed out, a fail | `wrong-answer`, `buzzer-fail` | peak | -8 |
| **paper / pen** | pages, cards, cut-outs on paper (L6), drawing a line | `page-turn-single`, `page-turn-big`, `paper-slide`, `paper-quick-move`, `card-place`, `card-flick`, `marker-line`, `pencil-short`, `scribble-on-paper` | start | -4 |
| **swipe** (instead of whoosh) | a push transition, a panel sliding in, a fast zoom | `swipe-fast-zoom`, `transition-tech-slide`, `air-zoom-vacuum` | peak | -8 |
| **whoosh** (rationed) | only a big camera move or a cross-screen push | `whoosh-small-sweep`, `whoosh-short-sweep`, `whoosh-air` | peak | -8 |
| **clock** | time, deadlines, "a few minutes" | `clock-tick-single`, `clock-wall-tick-tock` | peak | -6 |

## When-to-use rules
1. **Whoosh at most 1 in 6 cues**, and never on two cuts in a row. A cut gets no sound by default (hard cuts are silent);
   if it needs one, prefer swipe, shutter, tape-switch or a soft hit over a whoosh.
2. **At least 5 different roles per minute** of film, and **no file used twice within 10 s** (rotate the `files` list).
3. **Sound on about 1 action in 5** (Mortiflix) for long films; shorts and talking-head edits can go to 1 in 3 on the
   hook (first 3 s) and on punch lines.
4. **Risers end on something**: a riser's loudest peak sits on the reveal frame (`align: "peak"`), always followed by a
   hit or a card on that frame. Max 1 riser per 30 s; duck the music 3-4 dB under it.
5. **Meaning first**: pick the role from what the picture *is* (a photo -> shutter, a price -> coins, a message ->
   notification, a cursor -> ui-tick, a rewind -> tape), not from "something moved".
6. **Typing beds** run only while letters actually appear; cut them with `maxlen` and a 50 ms fade.
7. **Glitch and record-scratch are spice**: max 1 each per minute, and only where the words justify it.
8. Measure, then tell her to listen: `python3 studio/tools/soundqa.py <slug>` (hit timing, hits over the bed, loudness
   -14 LUFS / <= -1 dBTP after AAC).

## Ready-to-paste roles (film.json `audio.sfx.roles`)
```json
"shutter":  {"files": ["library:shutter-click", "library:shutter-hard-click", "library:shutter-vintage"], "align": "peak", "db": -4},
"riser":    {"files": ["library:riser-cinematic-trailer", "library:riser-metallic-sweep"], "align": "peak", "db": -12},
"hit":      {"files": ["library:hit-short-bass", "library:drum-deep-impact", "library:hit-futuristic-bass"], "align": "peak", "db": -6},
"pop":      {"files": ["library:pop-dry", "library:notify-bubble-pop", "library:pop-hard-click", "library:pop-cartoon-bubble"], "align": "peak", "db": -5},
"tick":     {"files": ["library:ui-select-click", "library:ui-modern-select", "library:ui-click-tone", "library:switch-tap"], "align": "peak", "db": -4},
"notify":   {"files": ["library:notify-message-pop", "library:notify-positive", "library:notify-confirmation"], "align": "peak", "db": -6},
"typeHit":  {"files": ["library:typewriter-single-hit", "library:typewriter-soft-click"], "align": "peak", "db": -8},
"glitch":   {"files": ["library:glitch-small-electric", "library:glitch-static", "library:glitch-intro-text"], "align": "peak", "db": -8},
"tape":     {"files": ["library:tape-rewind-fast", "library:tape-switch", "library:record-scratch-stop"], "align": "peak", "db": -6},
"cash":     {"files": ["library:coins-clinking", "library:coin-win", "library:bell-service-ding"], "align": "peak", "db": -6},
"error":    {"files": ["library:wrong-answer", "library:buzzer-fail"], "align": "peak", "db": -8},
"swipe":    {"files": ["library:swipe-fast-zoom", "library:transition-tech-slide", "library:air-zoom-vacuum"], "align": "peak", "db": -8},
"whoosh":   {"files": ["library:whoosh-small-sweep", "library:whoosh-short-sweep"], "align": "peak", "db": -8}
```

## What was added today (51 files, all from mixkit.co, ids in index.json)
shutter-click, shutter-hard-click, shutter-digital, shutter-vintage, camera-autofocus · riser-cinematic-trailer,
riser-short-stutter, riser-synth, riser-suspense-swell, riser-metallic-sweep, drum-roll-tension · glitch-small-electric,
glitch-static, glitch-intro-text, glitch-rewind-transition, glitch-crackles · ui-select-click, ui-modern-select,
ui-click-tone, ui-option-select, ui-device-click, mouse-double-click, switch-tap · notify-message-pop, notify-bubble-pop,
notify-positive, notify-confirmation · typewriter-soft-click, typewriter-single-hit, typewriter-return-bell,
keyboard-typing, laptop-typing · tape-rewind-fast, tape-switch, record-scratch-stop, tape-stop-slowdown, needle-drop ·
coins-clinking, coin-win, bell-service-ding, bell-cooking-ding · hit-short-bass, hit-futuristic-bass, bass-quick-switch,
drum-joke-accent, drum-deep-impact · wrong-answer, buzzer-fail · swipe-fast-zoom, transition-tech-slide, air-zoom-vacuum.

Notes: Mixkit has no "stamp" category (use `wood-hard-hit` or `typewriter-single-hit` for a stamp). The six reference
recordings in `inspiration/motion-references/` are silent, so this palette comes from her brief, not from them. Some
sounds peak late (risers 2-6 s, `drum-joke-accent` 0.67 s, `glitch-intro-text` 1.0 s): always place them with
`align: "peak"`, never "start", or they land early/late.

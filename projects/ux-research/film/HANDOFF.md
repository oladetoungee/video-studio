# ux-research film: handoff (FILM agent, keep current)

Look: **A · The research wall** (her pick 2026-10-13), C's dive for the opening question. Editor: http://localhost:7700/edit/ux-research/

## Done
- Voice: `tools/edit_voice.py` -> `audio/voice_edit.flac` (775.5 s raw -> 719.5 s). Cuts in `data/cutlist.json`: the silent first 36.5 s; the retake "The term was popularised, subscribe to that"; **"back in the eighties" cut** (Don Norman was at Apple in 1993; the line now reads "popularised by Don Norman when he was at Apple"; the board also shows his NN/g bio with "He joined Apple in the early 1990s"); the "You see quantitative and... describe that" false start; the "Now another question I wanted to ask. Excuse that." retake; "Right?"; the unclear "that I did find it from a medium as if I can, is that" before the closing line (the Medium credit is on screen).
- Words: whisper small.en DTW (`-nfa` needed: flash attention breaks DTW) on the edited voice -> `tools/words.py` (BRIEF.md fixes + new ones) -> `data/words.json`, `data/captions.srt`.
- Kit: `scenes/wall.js` (fonts registered from `assets/fonts/` as UXMarker / UXHand / UXGrot / UXType / UXHank; palette; note / card / polaroid / sourceShot / strokes / wall words; boards + camera world with a slow push; light alternative = paper wall).
- Boards: `scenes/s1.js` (opening dive, UI/UX), `s2.js` (UX, Norman, quote, UX research, why, fail, researcher, week, patterns, vs designer, curiosity, categories), `s3.js` (the three pairs, say vs do, more categories, methods, budget, user/market research, AI, career, get in, close).
- Sources: `tools/shoot.mjs` screenshots in `assets/sources/` -> crops `assets/src_*.jpg` (NN/g definition, Don Norman's NN/g bio, Maze guide, IxDF). Polaroids of her: `tools/polaroids.py` -> `assets/her_<raw s>.jpg` (never flipped).
- Sound: film.json roles (card, pop, pen, shutter, swipe, whoosh, riser, hit, tick, typeHit, error, crumple, cash, notify, clock, ding, tape, glitch); stems.py; soundqa.

## Progress (2026-10-13 afternoon)
- Critic rounds: 1 = 5.5/10, 2 = 6.0/10 (fixes listed in STATUS), round 3 running. Fixes: cue thinning (film.js MINOR roles 2.6 s apart), limiter ceiling 0.6, punch-ins (cam() within boards), portrait framing PFRAME / landscape LFRAME (wall.js), safe-area check `tools/safearea.mjs`.
- 16:9 export v1 done (outputs/video/ux-research_motion_16x9.mp4) before round-2/3 fixes: re-export both aspects after the last fixes.
- Talking-head: `../talking-head/talking-head.json` (thsetup), `moments/common.js` (look), `moments/full.js` (full edit), `shorts/sh1-6.js`. Auto-retakes OFF (27 false positives: her rhetorical repeats); the film's manual cuts are the moment's `cuts`.

## Next (state at hand-off)
- Film exported (16:9 + 9:16, final code) and cloned to ~/Downloads/ux-research/. Critic: 5.5 -> 6.0 -> 6.3 (3 rounds, bar 8 not reached); open items in STATUS.md "Motion film: CHECKS".
- Talking-head full edit + SH1-SH6 authored and checked (`composite.mjs meta` / `check`), NOT exported: disk 6.4 GB < 8 GB. When there is room: `node studio/tools/composite.mjs export projects/ux-research/talking-head/talking-head.json full --aspect both`, then `... sh1` … `sh6` (9:16), copy to ~/Downloads/ux-research/.
- If the film changes again: re-export both aspects (each ~35-40 min with motion blur).

## Gotchas
- `V(landscape, portrait)`: in this film positions are passed as x = V(xL, xP), y = V(yL, yP) (not V([x, y], ...)). Mixing them up put several items off-board.
- A phrase index past the end gives `undefined` times: the kit now throws ("slap without a time", "wallWord without a time"); `render.mjs meta` finds them.
- Never name a local `G` (the engine's grounds table).

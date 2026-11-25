# Build brief for the 4 kits (2026-10-13)
She approved one film look per kit (direction A in each `film/stills/directions/`): claude-rule = The Thread · database-indexes = Query Plan · phone-distraction = Lock screen · ux-research = The research wall. Her bar: "blow my mind", post-on-X-worthy, each video its own peculiar type. **Priority: claude-rule first** (news, the rule takes effect 12 Nov 2026).

## Read first (every agent)
CLAUDE.md, FEEDBACK.md, PROCESS.md, CHECKS.md (report the table at hand-off), studio/README.md, studio/PROMPTS.md, inspiration/know-how/ (MOTION-REFERENCES layout menu, SHORTS-PLAYBOOK caption spec, SOUND-PALETTE), the project's BRIEF.md, kit/refined-kit.md, STATUS.md and film/stills/directions/README.md (the approved look in numbers, critic fixes still open).

## Agents and ownership (never edit another agent's files)
- **ENGINE agent** owns `studio/` (shared code): full-length talking-head + shorts engine features. Everyone else: if you need an engine feature, write a request in `projects/ENGINE-REQUESTS.md` and continue with what exists.
- **FILM agent per kit** owns `projects/<slug>/film/` and `outputs/video|clips|frames/`. Later (when ENGINE reports ready in `projects/ENGINE-REQUESTS.md` "READY" section) also `talking-head/` and `outputs/talking-head|shorts/`.
- **DESIGN agent per kit** owns `projects/<slug>/design/` and `outputs/thumbnails|carousels/`.

## Deliverables
1. Motion film (FILM agent): the full narration in the approved look, ported into the studio (`film/film.json` + scenes; editable at /edit/<slug>/), 16:9 + 9:16 (recomposed), the voice tightened (cut retakes/long pauses; cutlist in film/data), word-timed visuals, real sources highlighted at the moment she cites them, the open critic fixes from the directions README, varied sound per SOUND-PALETTE (whoosh ≤ 1 in 6), music bed, -14 LUFS. Lab loop: `studio/tools/lab.mjs` contact/speed/audit/board, `studio/tools/soundqa.py`. Fresh critic rounds (8/10 bar, ≤ 3). Light/dark tokens per studio/README so the per-screen switch works.
2. Full talking-head edit (FILM agent, after ENGINE ready): her WHOLE video tightened, with motion throughout using the layout menu (L1-L13: half-and-half with film scenes, words behind her via person matte, pop-around, side stack, corner cam, cutaways, keyword captions…): something changes every 3-6 s, same layout never twice in a row, ≥ 4 layouts per minute, never flipped, no face retouching. 16:9 (and 9:16 if the engine supports it). Editable in the moment editor.
3. Shorts (FILM agent, after ENGINE ready): the refined kit's proposed shorts (4-6), per SHORTS-PLAYBOOK: top label, her caption spec, 35-60 % film inserts, end card, -14 LUFS, standalone for strangers. 9:16.
4. Thumbnails ≥ 20 (DESIGN agent): from the refined kit's concepts, per THUMBNAILS.md (RULE 0 topic + literal picture; RULE 1 wording; gates: image-only topic critic, title-pair critic, taste critic vs her samples incl. viral-samples/collage); photo-led mostly (her frames, warmed lightly per her OK; her own photos if she adds them to assets/uploads), some flat/graphic in the film's look; each with 2-3 titles; editable in the thumbnail editor; overview.png; copy to ~/Downloads/<slug>-thumbnails/.
5. Instagram (1080×1350) + LinkedIn (+PDF) carousels (DESIGN agent): from the refined kit's hooks, in the film's look, standalone, build.mjs checks clean, cold critic ≥ 8; editable in the carousel editor.

## Machine rules (DISK ~16 GB free: critical)
- ONE heavy job machine-wide: mkdir lock `/tmp/gm-render.lock` (loop with sleep, owner file, rmdir after) around every ffmpeg encode, export, 4K read, face/matte pass.
- Exports at sensible sizes (H.264 1080p, CRF ~20 or videotoolbox ~8-10 Mbps); keep current + previous only; mv superseded/temp to ~/.Trash/; never write image sequences. Before any export check `df -h /`: if < 8 GB free, stop exporting, finish authoring, and report.
- Long jobs in the background with progress (10-min watchdog). If you hit an API/session limit, your work must be resumable from disk: keep a `HANDOFF.md` in your area current (what's done, what's next).
- Studio must be running at the end (`curl -s localhost:7700` fails → `cd /Users/gbemi/Desktop/CODE/videos && nohup node studio/server.mjs > studio/build/studio-server.log 2>&1 < /dev/null & disown`).
- Update your rows in the project's STATUS.md. Final message: concise, plain words, editor links, CHECKS table, open questions.

## Notes from the main session (2026-10-13, after reviewing the ENGINE test)
- Shorts with a half-page film insert: keep the film panel's content clear of the top label zone (the label box covered panel text in the test).
- Captions in talking-head edits and shorts must use the corrected words (BRIEF corrections), never raw whisper (test showed "…is actually: bans").
- Delete the engine-test entries from claude-rule's talking-head.json once real moments exist.

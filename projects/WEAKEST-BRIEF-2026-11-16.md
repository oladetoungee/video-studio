# Weakest items toward 8/10 (overnight 2026-11-16)

Gbemi is asleep: never ask her anything, never pick a thumbnail/title/short for her, never delete what she made, no exports,
nothing into ~/Downloads, rm -rf is blocked (mv to ~/.Trash). Don't touch studio/runtime. Don't touch other projects.

## Read first
inspiration/know-how/HER-STANDARD.md (every line), CLAUDE.md (Banned, Her taste), THUMBNAILS.md (newest notes at the
bottom), inspiration/know-how/THUMBNAIL-STUDY.md, projects/FULL-KIT-BRIEF-2026-11-12.md, then the project's STATUS.md,
design/thumbnails/README.md (or tools/), talking-head/HANDOFF.md and kit/refined-kit.md section 2 / 3.

## Thumbnails job (one project)
1. From STATUS.md / the kit / outputs/_review, list the current set and its last cold scores. Take the 2-3 LOWEST that
   are still in the set (never her favourite or one she picked/nudged; never the recommended one unless it is under 7).
2. For each: name what keeps it under 8 (read the critic notes; look at the PNG at full size AND at 320 px). Fix it the
   way HER-STANDARD says: words a stranger understands and wants (plain, search words), picture that carries the topic,
   words pop (room darkened behind words, her natural on top, strong shadow), fonts only from the font board in their
   source colours, a DIFFERENT board composition from the rest of the set (layout census: max 2 "words left + her right").
3. KEEP THE OLD ONE BESIDE THE NEW: the new version gets the next free suffix (e.g. 05 -> 05b); the old PNG and its source
   stay exactly where they are. Every word stays editable in the studio design editor (same system the set already uses).
4. A FRESH critic (spawn a new general-purpose agent; give it ONLY the PNG paths of the whole set incl. new versions, no
   notes, no your opinion): "cold YouTube viewer, harsh; per thumbnail: what is this video about, would you click, 1-10
   alone; 'looks alike' flags". Iterate up to 3 rounds. Keep a new version only if it beats the old one.
5. Make outputs/_review/thumbnails-before-after-2026-11-16.jpg: each reworked pair side by side (old | new) with both
   scores printed under them in small mono type.
6. Update STATUS.md (one dated block: what changed, scores old -> new, sheet path) and kit section 2 (add the new
   version's line beside the old; do NOT change which one is recommended, just say if the new one now scores higher).
7. Report: per reworked thumbnail: words, board item, old score -> new score, path; the sheet path; anything for her.

## Shorts job (projects in order, one heavy render at a time; composite.mjs uses the render lock)
For each project: the 1-2 lowest-scored shorts the STATUS names, with the critic's concrete notes (e.g. "long talking
stretches: more inserts", "captions over her hands", "small graphic labels"). Make the smallest change in the moment's
code/manifest that fixes the note (back up the file into archive/weakest-2026-11-16/ first; the old version stays there
so she can compare). Check: `node studio/tools/composite.mjs check <talking-head.json> <id> --aspect 9x16` (0 text
collisions, labels in band, face, zoom) and stills sheets before/after (outputs/_review/<id>-before-after-2026-11-16.jpg).
A fresh critic sees only the before/after sheets and scores both. Keep the change only if it scores higher.
Update STATUS.md + HANDOFF.md. Report per short: note, change, old -> new score, sheet path.

# talking-head engine work (2026-10-26, STUDIO engine agent): progress notes

Task: (1) shorts less zoomed in (framing option, comparison stills), (2) new face + graphic layouts beyond the circle.

## Done
- thsetup.py ran (words from whisper, face track, manifest). Face is big: median face height 36 % of the source height.
- Baseline hashes (before engine edits) in the agent scratchpad; after the first engine edit: claude-rule sh2+full,
  phone-distraction s01+full, database-indexes sh3 all **identical** (1749 checks).
- Engine: footage.js (FOOT.under hook, CAM resize steps opt-in, FOOT.capX for 16:9 captions), layouts.js (L14-L19,
  TH.FRAMES shorts framing, camera plan + TH.recam), moment.html (?frame9=), composite.mjs (--frame9, --prefix, check:
  shortZoom + layoutVariety).
- Project: moments/common.js (placeholder look: ink ground, cream cards), shorts/s01.js (framing test short), moments/lab.js
  (LAYOUT LAB engine test, one segment per new layout), manifest frame9 = '4x5'.
## Next
- stills/layouts v1 -> look, fix; stills/shorts-framing; boards; editor select (moment.js + server whitelist);
  CHECKS.md, README, MOTION-REFERENCES, SHORTS-PLAYBOOK; final regression hashes.

## Finished (2026-10-26)
- Boards: stills/shorts-framing/board.jpg (A fill 0.39, B 4x5 0.28 recommended, C 3x4 0.30, D 1x1 0.22, E 4x5band 0.28,
  F wide 0.32: face height / frame height) and stills/layouts/board.jpg (L14-L19, 16:9 + 9:16, stills v3_*).
- Editor: moment.js "How much of her the short shows" pane (frame9 / frame9seg, reload), TH.recam after every edit (her box
  drag); server.mjs saves frame9 / frame9seg (and captions3, which it used to drop): needs a studio restart to take effect.
- composite.mjs check: shortZoom + layoutVariety; her own box excluded from the face-overlap list.
- Final regression: claude-rule sh2+full, phone-distraction s01+full, database-indexes sh3 identical (1749 checks);
  every project's full / short / teaser loads in 16:9 and 9:16.
- Not yet tried on real screenshots (assets/sources had only text when this ran): o.img + o.credit path is in place.

# TALKING-HEAD agent (wave 2, 2026-10-26): full edit + 16 shorts + teaser. Progress notes (resume from here)
- Words corrected in `data/raw_words.json` (whisper original kept as `data/raw_words.whisper.json`): names (PHP2Shell,
  Zeabur, OpenCode, eMudhra, MadPot, SharkNinja, Cummins, Anthropic), "patch" -> **Apache** (a second whisper pass with a
  vocabulary prompt also heard "Apache": FLAG for her), "for this" -> "four days" (second pass), "the language meant most"
  -> "the language **behind** most" (FLAG: both passes heard "meant"), "the abuse" -> "their bills", "post deployment" ->
  "paused deployments", "assignee" -> "its signing", "affect" -> "fake", "box" -> "bugs", "distillation account" -> "attack".
  "stuck over" (7:55) left as heard (FLAG).
- Manifest: moment `full` (in 0, out end, retakes on; `keep` undoes 4 false retakes; 2 real retakes cut: "that your
  browsers need", "keys were so weak. The"): 479.7 -> 476.5 s. Music 160. Fonts Anton / Manrope / Spline Sans Mono.
- Real pages: `tools/hicap.mjs` (sharp DPR-2 crops of the real articles at a 640 px phone-width layout, quote lines for
  the highlighter) -> `assets/src/*.jpg` + `index.json`; `tools/srcsync.py` writes `assets/src/index.js` + manifest images.
- Look: `moments/common.js` re-skinned to A · The Month (night / bone / orange, Anton / Manrope / Spline Sans Mono) +
  OA.* helpers (src page with scroll + highlighter + credit, stat, term, month, key, list, flow, lock, layers, wall, heads,
  OA.full = full-frame insert without film).
- `moments/full.js`: the whole edit planned (~95 segments, L1-L19 mixed + real pages). Film inserts: not wired yet (film
  agent still building; check film/HANDOFF.md).
- (later) The plan moved to `moments/plan.js` (OA_SENT her sentences + OA_PLAN(mode)): `moments/full.js` = OA_PLAN('full');
  every short `shorts/shNN.js` = OA_PLAN('short') (its stretch of the same graphics; first sentence = her talking, no L3
  shout, max one keyword). Film wired (`"film": "october-attacks"`, scenes from film/HANDOFF.md).
- Engine changes (additive, opt-in): composite.mjs check regex bug fixed (`/\/@her$/` inside a template string became a
  comment: the check never ran); footage.js `TH.look.capFit` (16:9 caption shrinks to fit a narrow strip);
  layouts.js `TH.look.kwHideCap` (a keyword hides the shorts-style caption) and `"endCard": false` (no end card).
- Critic full edit: round 1 5/10, round 2 6.5/10, round-2 fixes applied (dead frames, film offsets, PiP over the to-do
  card, page runs, keywords over the caption in 9:16, keys copy).
- Shorts sh01-sh16 in the manifest (kit ranges, 3:4 window, "endCard": false, tail 0.5; outro slot empty: no outro clip yet).
- Teaser: 13 bites + 3 cards (gaps at 404.3 s, the quietest 0.8 s), `teaser/teaser.js` (Month look, end card @WithGbemi).
- FINAL (2026-10-26 ~11:00): full edit 16:9 + 9:16 (critic 7.5 after 3 rounds), 16 shorts (critic 5.5 -> 6.9, then fixed),
  teaser 16:9/1:1/4:5 (6 -> 6.5, then fixed) all exported and hard-linked into ~/Downloads/october-attacks/. Short-mode rules
  live in plan.js OA_PLAN('short'). Teaser inserts use scene + from (not sync: sync ran past the scene's end).
- 2026-10-26 (her review of the full edit): all film offsets removed (they ran graphics ahead of her words); teaser inserts
  re-timed to the film time of her words and clamped to their scenes; OA.stat laid out bottom-up (3/4 card); bucket keyword
  ends before the keys list. New checks in composite.mjs check: insertSync, textCollision (both pass on full 16:9 + 9:16,
  all 16 shorts, teaser). Her new rule: no exports, nothing into ~/Downloads: she re-exports in the studio. Changed moments:
  full, teaser, sh02, sh03, sh06, sh07, sh08, sh09, sh11, sh12, sh13, sh15, sh16. Review stills: build/review/{before,after}/.

# reading-stack: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/reading-stack/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


"My current reading stack": how to read non-fiction so you remember it (study the structure first; Adler's inspectional reading, Justin Sung's priming, the TikTok "memorise it" version), demonstrated on Baratta's *How to Read and Write Critically* and Sanders & Stappers' *Convivial Toolbox*. Updated 2026-10-01.

## Kit
- `kit/raw-video.mov`: 4K HEVC, 30 fps, 18 min. **Recorded mirrored** (book text reads backwards). Never flip her face.
- `kit/script.md` (written script), `kit/transcripts/` (whisper: `transcript.srt/.json`, `transcript.words.json`, `voice.m4a`, plus the reference transcript).
- Project reference: `inspiration/why-you-cant-explain-what-you-read.mp4` (calm talking head; style only).

## Deliverables
Every deliverable below is **editable in the browser**: start the studio (`Start Studio.command` in Finder, or VS Code task "Start Studio") and open http://localhost:7700.

| Item | State | Where |
|---|---|---|
| Motion film v2 (16:9) | **Approved by her** as the base ("a very good place to start"; she asked for more visuals and sound) | `outputs/video/reading-stack_motion_16x9_v2.mp4` (+ `_v2.srt`) |
| Studio (every output editable) | **Editable in browser**: film, 7 moments, thumbnails, both carousels, one shared editor shell (2026-10-01). Film editor also got: Voice / Music / Sound effects toggles (preview + export), Done + "Saved ✓", Enter saves, photo resize + hide per frame size, exports downloaded to her Downloads + Show in Finder, automatic sound re-mix. The corner HUD (section label + timecode) is removed from the film everywhere. Thumbnail + carousel editors also got (2026-10-01, her feedback): **Add photo…** / drag-and-drop of her own photos (JPG, PNG, HEIC, WebP -> `assets/uploads/`, "Your photos" group), **Remove background** (Vision cut-out into "Cut-outs", original kept), remove an upload to the Bin (blocked while used), and a **custom colour picker + editable project palette** (`palette.json`, shared by all design editors; add, remove with undo, lighter/darker, contrast warning). | `Start Studio.command`; http://localhost:7700; how-to in `studio/README.md` |
| Film editor: Play this screen + Light / Dark (2026-10-04) | **Built and verified**: **⟲ Play this screen** next to Play (`L`) loops the current screen with its sound; **☀ Light / ☾ Dark** in the top bar (`D`) switches only the current screen to its designed alternative (dark screens get a light version, light screens a dark one; the 8 blue punchlines have none). Saved in `film/edits.json` as `"modes"`; exports follow. None chosen yet, so the film is unchanged. | Sheets `film/stills/modes/review_*.jpg`; `studio/README.md` Film editor |
| Film content pass v3 (more visuals + sound, 16:9 + 9:16) | **Done, below bar** (critic 6 → 6.5 → 7 → 6.8 over 4 rounds; round-4 fixes applied, not re-scored). Real book spines and covers, many diagrams, 279 SFX (+3 to +7 dB over music, −2 to −6 dB under voice), no holds over 4 s. Weak: 9:16 still sparse in places (e.g. "10 CHAPTERS", the ch 1 contents card), headline-left/object-right repeats, soft spines. **Awaiting her watch + listen.** | `outputs/video/reading-stack_motion_{16x9,9x16}_v3.mp4` (+ `.srt`), before/after `film/stills/v3_before_after/`, details `film/README.md`, `film/CONTENT_PASS.md`. **Editable in browser**: http://localhost:7700/edit/reading-stack/. The v3 files still show the old corner HUD; any export from the studio is HUD-free (Export → Whole film to replace them). |
| Talking-head moments (7 × 9:16 + 16:9) | **Draft, below bar** (critic round 3: 4-7/10; main-session review agrees): panels often near-empty (one label or blank bars), a lone floating word plate, mirrored books still visible in places. Engine works (footage layer: `studio/runtime/footage.js`, `studio/tools/composite.mjs`, face tracking via Vision). **Next: ask her for a talking-head edit reference she likes, reverse-engineer it frame by frame (SPEC.md), rebuild the graphics to it.** | `outputs/talking-head/`, plan in `talking-head/MOMENTS.md`, how-to in `talking-head/README.md`. **Editable in browser**: http://localhost:7700/moment/reading-stack/m01/ … `/m07/` (her footage under the graphics, preview proxies in `talking-head/build/proxy/`) |
| YouTube thumbnails, collage C1-C8 (2026-10-07) | **Built** from the strategist's 8 concepts in her collage-over-creator style: her photos (16 warm; C1 the pointing-at-head photo), real contents-page frame from her video (chapter 1 circled), real book covers, Pexels props, one Playfair serif line, 1 label. 3 rounds of 3 fresh critics (cold image-only, mocked feed with title, taste vs her samples): **none passed all gates**; closest C1 (feed 8/7, taste 7). Recommended Test & Compare: **C1** + "How to Remember What You Read: A Method From 1940", **C3** + "How to Read Non-Fiction and Actually Remember It", **C8** (flat) + "How to Remember the Non-Fiction Books You Read"; runner-up C7. Scores and sources in `design/thumbnails/NOTES.md`. | `outputs/thumbnails/C*.png`, `overview.png`; copies + sample-vs-ours sheet in `~/Downloads/reading-stack-thumbnails/`. **Editable**: http://localhost:7700/design/reading-stack/thumbnails/ |
| YouTube thumbnails (8 directions, v2 standalone) | **Rewritten 2026-10-01 so each makes sense to a stranger** (her rule: no "vibe", no "page 1" riddles). Inside-joke directions archived (`archive/thumbnails-v1-directions/`). 3 rounds of a cold critic who saw only PNGs + titles; best now 8/8 (06 "Title. Contents. Memorise."). Recommended test: **06 vs 02 vs 03** with the title "How to Actually Remember What You Read". 01's photo was being changed in the editor during the pass (left alone). | `outputs/thumbnails/` (`overview.png`); notes, scores and research ("Standalone hooks") in `design/thumbnails/`. **Editable in browser**: http://localhost:7700/design/reading-stack/thumbnails/ |
| Instagram carousel (8) + LinkedIn carousel (10 + PDF), v2 standalone | **Rewritten 2026-10-01 to stand alone** (no video context needed). IG: "How to remember what you read", second cover "So what was that book about?", method, shelves, two labelled examples, save slide, video as optional extra. LinkedIn: "Remember what you read for work", a 4-step system with a takeaway per page. Cold critic round 3: IG 8/10 clear, 7/10 swipe; LinkedIn 8 / 7; round-3 fixes applied after scoring. All `build.mjs` checks clean. New captions in both `NOTES.md`. | `outputs/carousels/`; source `design/carousels/`. **Editable in browser**: http://localhost:7700/design/reading-stack/carousels/instagram/ and `/linkedin/` |

**In progress (agent, started 2026-10-01 evening):** browser editors for thumbnails, carousels and talking-head moments inside the studio (click-to-edit text, drag, palette/photo swap, versions, PNG/PDF/clip export). If a new session finds this unfinished, check `studio/README.md` and the studio home page for what landed and finish it per the brief in `PROCESS.md` (deliverables table).

## In flight (2026-10-01 evening)
- **Copy rewrite: done 2026-10-01.** Carousels + thumbnails rewritten to stand alone; see the two rows above and `design/*/NOTES.md`.
- **Studio features (agent):** "Add photo…" (upload from her computer + drag-and-drop, HEIC ok, stored in `assets/uploads/`, optional background removal via macOS Vision) and an editable colour palette (colour picker, add/remove swatches, per project in `palette.json`).
If a new session finds these unfinished: check the studio editors and `design/**/content.json`, then finish per the briefs summarised here.

**Next session:** photos + palette in the design editors are done and verified headless (see `studio/README.md` → Design editor); ask her to try them (her own photo, Remove background, a custom ground) and say if the cut-out quality or the palette UI needs work. Test leftovers: versions named "Photo/colour test (agent)" on thumbnail 01 (its cut-out photo is in the Bin) and the Instagram deck.

Channel handle set to **@WithGbemi** on both carousel end slides (re-rendered, checks clean).

## Studio changes (2026-10-02 → 10-04, shared with every project)
- Volume sliders for Voice / Music / Sound effects and Export → Sound only downloads (film + moments); reading-stack output unchanged unless she moves a slider (verified byte-identical).
- In progress 10-04: "Play this screen" on repeat and a per-screen Light / Dark switch; this film gets designed alternatives too (contact sheets in `film/stills/modes/`). Default look unchanged (hash-checked).

## Refined kit rebuilt (2026-10-16)
| Item | State | Where |
|---|---|---|
| Refined kit, fixed structure | **Rebuilt** in the current order (At a glance, 1 YouTube, 2 Thumbnails, 3 Shorts, 4 Teaser, 5 Carousels, 6 Long-form posts, 7 Research). Description with 7 chapters, sources, connect links and 3 hashtags; tags 492/500; 12 Shorts blocks (her own 5 shorts from `inspiration/my-shorts/1007*` + our 7 moments as spares), each with YouTube Shorts title, description, hashtags and tags plus TikTok, Reels, LinkedIn, X; her own kit merged (LinkedIn post, X posts, comments, essay corrected to the recording). Chapters timed to the motion film v3 (`outputs/video/reading-stack_motion_16x9_v3.srt`); **check against her upload** (the video was not on the public channel list on 2026-10-16). Teaser: not built (offered). Two cold copy rounds; everything under 8 rewritten. | `kit/refined-kit.md` (only kit file); old version `archive/refined-kit.v1.md`; her content kit copied to `archive/reading-method-priming-kit.md` (original still in `~/Downloads/`); `kit/script.md` kept (her script) |

## Refined kit (social strategist, 2026-10-07) (superseded by the 2026-10-16 rebuild above)
`kit/refined-kit.md`: live research (19 outlier videos with view ratios, YouTube/Google search suggestions, the summer-2026 "dialogue-only reading" debate), 15 titles (all 40-60 characters, checked by script), 8 thumbnail concepts in her new **collage-over-creator** style (her photos 16 and 18, real book covers, contents-page cut-out, one serif line, 1-2 labels), description + chapters + tags, captions for all 7 moments on 5 platforms, carousel and short-form hooks. 3 cold-review rounds.
**Recommended Test & Compare:** (1) "Read this page first." + "Why You Forget the Books You Read (and the Fix I Use)"; (2) "Stop forgetting books." (photo 18) + "How to Remember What You Read: A Method From 1940"; (3) "Forgot the last book you read?" + "How to Read Non-Fiction Books Without Forgetting Them". This replaces the older title suggestion "How to Actually Remember What You Read" (update the carousel end slides if she agrees).
**Waiting on her:** pick a collage thumbnail (C1/C3/C8 recommended); phone photos of the two book covers (at a slight angle) and of Baratta's open contents page, plus 2-3 more photos of her (mic lower or out of hand, brighter room): the critics' main complaints were the soft contents page, flat covers, the mic reading as a knife, and the same photo in 6 of 8. Collage thumbnails built 2026-10-07 (row above).

## Waiting on her
- **Channel name** for the carousel end slides (`[ YOUR CHANNEL NAME ]`): she can type it on the last slide in the carousel editors.
- **YouTube title.** Recommended: "How to Actually Remember What You Read". Both carousel end slides quote it (`video` field on the last slide); update them if she picks another.
- **Thumbnails**: which to use. Recommended Test & Compare: **06** "Title. Contents. Memorise." (holding the book), **02** "Memorise this page" (faceless contents page), **03** "Read it. Forgot it. / Read it. Kept it." (before/after faces). Is 01's new uploaded photo hers to keep (it was changed in the editor during the rewrite)?
- **Carousels**: read v2 cold herself. Keep orange "STRUCTURE" on IG slide 3 or all blue? Keep LinkedIn page 8 ("Where it pays off"; partly our framing)?
- **Film**: heading font (Bricolage Grotesque now; Archivo Black or Bebas Neue are alternatives), how much orange (3 uses), top-right label ("HOW TO READ" vs her channel name).
- She should **listen** to everything: all audio was set by measurement only.

## Next steps
1. Get her verdict on v3 (watch AND listen) and the talking-head drafts.
2. **Ask her for references** to break the 6-7/10 ceiling: a talking-head edit she loves, and ideally a motion explainer whose pacing she wants. Reverse-engineer each frame by frame into SPEC.md (CLAUDE.md workflow step 1; the skill's remake mode) and rebuild to it, instead of inventing more.
3. Apply her decisions above (channel name, thumbnails, carousel choices, font, orange, label).
4. Not done yet for this kit: v3 9:16 checked on a phone. (Carousels and thumbnails had 3 cold-critic rounds on 2026-10-01.)

## History (short)
v0 pen-and-paper single-file studio (archived) → v1 motion "night library" (rejected, deleted) → talking-head full edit v1 (rejected: empty stretches, un-mirrored face; deleted) → v2 motion in her deck style (approved) → workspace restructured into studio/ + projects/ (2026-10-01).

## Raw video removed (2026-10-15)
She posted this video and asked to delete the raw recording to free space; it was moved to the Bin (~/.Trash/posted-raw-videos-2026-10-15/). Film, edits, exports, thumbnails and carousels remain; talking-head/shorts can no longer be re-exported from the 4K source.
- 10-17: kit section 3 = her own 5 shorts only (SH2/SH4/SH5 posted, SH1 + SH3 to post); our moment shorts SH6-SH12 moved to archive/refined-kit-our-moment-shorts.md.
- 10-18: no teaser (her call: raw recording gone). Kit 6a = her posted LinkedIn post + a second post in her voice; community post in her voice.
- 2026-10-30: her raw recording moved to the Bin at her request (to free space). Finished exports in outputs/ are kept; the talking-head edits, shorts and teaser can no longer be re-exported (motion film still can: voice in kit/transcripts).

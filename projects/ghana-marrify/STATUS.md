# ghana-marrify: status

**2026-11-01: finished videos moved to the Bin at her request** (`~/.Trash/finished-videos-2026-11-01/ghana-marrify/`); patterns kept in reference/ (PATTERNS.md + contact sheets + stills); motion films can be re-rendered in the studio; talking-head edits/shorts/teasers cannot (raw recordings gone). .srt, thumbnail/carousel PNGs and PDFs are still in outputs/. See [reference/PATTERNS.md](reference/PATTERNS.md).


"Ghana's Marrify, centralised data, and what Estonia taught me": an HCI researcher living in Estonia looks at Ghana's new public marriage/divorce verification platform (Marrify). She's excited about African digital public infrastructure AND serious about consent, data minimisation and culture. Created 2026-10-01. **All deliverables built 2026-10-02 and handed to her for review** (studio started, links given). Everyone reads `BRIEF.md` first (what she actually says vs the kit, whisper fixes, verified facts).

## Kit (`kit/`)
- `ghana-marrify.mov`: her recording, 4K (3840×2160), 5:12 (311.8 s). Check orientation (reading-stack was mirrored) before any crop; never flip her face.
- `0930 (2).srt`: her own captions. Useful for spellings ("Marrify"; the first line says "I just launched" but the script says "So Ghana just launched": check the audio).
- `ghana-marrify-data-kit (1).md`: her content kit. **Not the source of truth** (her correction 2026-10-01): what she says in the recording wins; the kit gives structure, clip ideas, starting copy. See `BRIEF.md`.
  1. YouTube script (her dictation, edited)
  2. Title options
  3. Description
  4. Tags
  5. Main Short (about 2 min)
  - 5b. Additional Shorts 2-7 (30-45 s each)
  - 5c. Clip breakdown: clips 1-8 to cut from the long video, auto-framed vertical
  6. Captions (TikTok, Reels, LinkedIn)
  7. X posts
  8. Creator comments
  9. Instagram carousel
  10. Substack/Medium essay

## Deliverables (per CLAUDE.md, adapted to this kit)
| Item | State |
|---|---|
| Transcripts (whisper word-level, names fixed from her .srt) | **Done** `kit/transcripts/` (transcript.srt/.json, transcript.words.json, voice.m4a, voice16k.wav). Corrections list in `BRIEF.md`. |
| Motion film (studio project in `film/`, 16:9 + 9:16) | **Done, waiting on her review (2026-10-02, after a scale + fill pass)**. Look: A "Blink" + B's real-source scenes. Exports: `outputs/video/ghana-marrify_motion_16x9.mp4` and `_9x16.mp4` (+ `.srt`), 5:02.7, -14.0 LUFS, -1.9 dBTP, no black or frozen spans. Editable at `/edit/ghana-marrify/` (42 screens). The kit `film/scenes/blink.js` is shared with the clips. Scale pass: headlines 96 px+ (16:9), elements ×1.4-1.5, frames under the fill target down from 32 % to 16 % (16:9) and from 31 % to 17 % (9:16); before/after sheets in `film/stills/scale-pass/`. Critic rounds: 6, 7, 7, then 6.5 on the scale-pass check (its fixes applied afterwards, no further round). Notes: `film/README.md`. |
| Talking-head clips: the kit's clip breakdown (5c) as edited vertical clips with graphics, editable in the studio's moment editor | **Done in the Blink look, waiting on her review** (clips agent, 2026-10-02): 7 clips restyled to the film's look A "Blink" (shared kit `film/scenes/blink.js`), each 9:16 (captions burned in) + 16:9 + .srt in `outputs/talking-head/`: 01 marrify 43.9 s · 02 estonia 45.5 s · 03 one-search-away 43.9 s · 04 yes-or-no 44.2 s (now ends on **access levels**, kit 6b, as she asked) · 05 not-neutral 31.7 s · 06 reciprocity 23.4 s · 07 build-it 24.9 s. "I see Ghana doing something in this direction" kept (02). All −14.0 LUFS, true peak ≤ −1.9 dBTP, no black frames, words intact (whisper spot-checked against the source). Fresh critic on the Blink version, 3 rounds: r1 5.5-7, r2 7-7.5, r3 m01/m02/m04 8, m03/m05/m06/m07 7.5 (their remaining one-or-two fixes applied after r3, not re-scored). Editable at `/moment/ghana-marrify/m01/` … `/m07/` (proxies rebuilt). Notes: `talking-head/MOMENTS.md`; post captions + hashtags: `talking-head/CAPTIONS.md` (04 covers access levels). Deck-style exports moved to `~/.Trash/gm-talking-head-deckstyle-exports/`. Kit clip 3 ("no record found") is not in the recording: skipped. |
| Shorts (5, 5b): check with her whether these are re-recordings or cuts from this video | ask her |
| YouTube thumbnails + titles | **Remakes of her 8 viral samples added (2026-10-06), waiting on her pick**: `directions/R1-…R9-…` (same design as each sample, new subject; spec `design/thumbnails/REMAKES.md`, scores in NOTES.md "Remakes"). 3 critic rounds: faithfulness 8-9 for R2, R3, R4, R7, R8, R9; R1 and R5 at 7 (last fixes applied, not re-scored). Strongest to click: R7 "Ghana's new MARRIAGE APP", R5 "how to check if someone is married", R3 "GHANA MARRIAGE CHECKER". R8 is a plain frame with no words (faithful to sample 8; says nothing alone). Side by side: `outputs/thumbnails/remakes_side_by_side.png`. Before that: **Round 4 (the strategist's 11 concepts from `kit/refined-kit.md`), waiting on her pick (2026-10-06).** 11 thumbnails, one per concept T1-T11, each with its title + 1-2 alternates; her frames lightly warmed (colour balance only, `design/thumbnails/tools/warm.py`, her OK). 3 critic rounds (cold image-only, title-in-feed, taste): all 11 pass the topic gate (none archived); 01 "BEFORE YOU SAY YES", 03 "not so PRIVATE", 11 "MARRIED? DIVORCED? PUBLIC." also pass the title gate (8/8) and are recommended for Test & Compare under "You Can Now Check If Someone Is Married in Ghana". **No thumbnail reached 8 on taste (best 7: 11)**: every critic says the ceiling is the one dim webcam room in all frames; her own brighter photos (holding a phone, a ring box, chin on hand) are the fix. Round 3 moved to `archive/thumbnails-v3/`. Editor: `/design/ghana-marrify/thumbnails/`; PNGs + overview in `outputs/thumbnails/` and `~/Downloads/ghana-marrify-thumbnails/`. Notes: `design/thumbnails/NOTES.md`. |
| Instagram carousel (kit section 9 copy) + LinkedIn carousel | **v4 built, waiting on her review** (carousels agent): Instagram 10 slides + LinkedIn 9 pages + `carousel.pdf`; cold-critic scores IG 6 → 6 → 6.5 → 7, LinkedIn 6 → 6.5 → 6.5 → 7 (8 = bar, not reached; the remaining critic notes are about slide order, her call). End-slide video title = kit option 1, the recommended title. Files in `outputs/carousels/`, editable at `/design/ghana-marrify/carousels/{instagram,linkedin}/`. Notes, caption, post text, critique: `design/carousels/*/NOTES.md`. |
| Refined kit (strategist, 2026-10-06) | **Done, waiting on her pick**: `kit/refined-kit.md`. Live research (YouTube outliers via yt-dlp, YouTube/Google search suggestions, news + reactions, her viral samples). Finding: "Marrify" itself is a tiny search (videos 5-579 views; best 11.9K, a drama-framed Ghanaian news channel); "check if someone is married" / "check marital status online" is the big evergreen search (826K, 427K, 101K videos). 11 titles (all 40-60 chars, keyword in first 40, checked by code) each with a thumbnail concept; 3 cold-review rounds. Top 3 for Test & Compare: T10 "BEFORE YOU SAY YES" (ring box + phone), T7 "TYPE A NAME.", T9 "NOT SO PRIVATE"; title "You Can Now Check If Someone Is Married in Ghana". Also a new description + chapters + tags, captions per clip (TikTok/Reels/Shorts, LinkedIn, X) replacing `talking-head/CAPTIONS.md` "Ours", and new slide-1 hooks for both carousels (designs not changed). Asks: where her photos are (`assets/uploads/`), what sample 6 (503 screenshot) was, "he" vs "your partner". |
| Real source captures for the film (TechCabal, Marrify site, news headlines) | **Done** (sources agent, 2026-10-01 night): `film/assets/sources/` + `SOURCES.md` (URLs, capture times, verbatim quotes). TechCabal Daily 8 Sep 2026 Marrify section: stills, crops, highlight boxes (`tc_boxes.json`), 2 scroll recordings (no highlight burned in). marrifyapp.com: desktop/mobile homepage, its own "still uploading records" disclaimer banner, empty divorce/marriage search pages (cropped above the name lists), 2 recordings. 6 news headline shots. Marrify's record lists show real people's names: never captured; don't show them. Scripts: `film/tools/sources/`. |

## Decisions 2026-10-02
She picked film look A "Blink" + B's best scenes (see `film/stills/directions/`), asked for the clips to be restyled to match, confirmed "Ghana" at 1:28, and wants access levels back in clip 04. Details in `BRIEF.md`.

## Needs redo (2026-10-06)
- **Thumbnails**: redone twice more on 10-06 (round 2 rejected; round 3 built topic-first, see the table row).

## Waiting on her (2026-10-02)
- **Watch AND listen** to the film and clips: all sound set by measurement only. Music: Mixkit "A Blue Day" + "Digital Clouds" (calm; more playful?).
- Film: OK to quote TechCabal's own words ("sensitive personal information") on screen? "Me, in Estonia" polaroid caption OK?
- Clips: main-session review found the 9:16 graphic panels under her face often half-empty (small content in the top of the panel). Offer a fill pass. Hooks per platform OK? Clip 04 at 44 s with access levels OK?
- Thumbnails: "YOUR DIVORCE, SEARCHABLE." (04) framing OK? May we soften skin shine / green tint on her cut-outs? Does she have sharper photos? Upload raw 5:12 or a trimmed cut (chapters are timed on the raw)?
- Carousels: IG order (concerns → "Centralised data. Finally." → "I want Africa building this") OK? Does she use Estonia's data tracker (name it on IG 8 / LinkedIn 7)? Ghanaian line kept in the IG caption (caption only).
- Title: recommended her option 1 + thumbnail 04; ours in `design/YOUTUBE.md`.
- Shorts (kit 5, 5b) are scripts for re-recording, not cuts: does she want to record them?
- She said she had taken screenshots from the video herself: none were found; if she shares them, the thumbnails can use them.

## Studio changes since the handover (2026-10-02 → 10-04)
- **Volume sliders + Sound only downloads** (10-02, built and verified): Voice / Music / Sound effects each have a dB slider in the film and moment editors (saved in edits as `"mix"`, used by exports, master stays −14 LUFS) and Export → Sound only → Download voice / music / sound effects / all three (WAV, sample-aligned). No levels set yet for this project.
- **Studio went down twice** (10-03); restarted detached; she has Terminal steps in README.md.
- **Play this screen + Light / Dark per screen** (10-04, built and verified): film editor **⟲ Play this screen** next to Play (`L`, loops the screen with its sound) and **☀ Light / ☾ Dark** in the top bar (`D`, this screen only; saved in `film/edits.json` as `"modes"`; exports follow). Every screen of this film has a designed dark version (none chosen yet: the film looks exactly as before). Sheets: `film/stills/modes/`. Details: `studio/README.md` (Film editor, "Light / dark tokens").

## Measured QA, 2026-10-11 (nothing changed; suggestions for her to decide)
Reports in `film/build/qa/` (`soundqa.json`, `audit_16x9.json`) and `film/data/transitions.json` (new: draft transition board).
- Sound: -14.0 LUFS, -1.9 dBTP in the WAV and after AAC (export too), audio offset 0 ms, DC -75 dBFS, phone band only 1.1 dB
  quieter than full band (0.9 % of energy under 60 Hz), voice 13.2 dB over music while she speaks. All fine.
- The 8 **impacts** (sample mk1143) are the weak spot: an early pre-hit makes their first audible hit land ~105 ms (3 frames)
  before the visual, and they sit level with the music and ~18 dB under her voice. Suggested: trim mk1143 so its slam is the
  first peak (or swap it), raise the impact role from -9 dB to about -3 dB, re-mix, re-run `soundqa.py`. Whooshes / lids peak
  70-80 ms early (fine if they lead into the move; check by eye). Pops are on time (median -9 ms).
- Picture: 74 sound cues checked against the frames: 24 flagged 2-4 frames off, 9 on soft fades, 26 with no single hit frame
  (leads, check each with `lab.mjs contact --every 1`); 18 of 41 cuts open on ~3 frames of empty ground (`lab.mjs board`);
  17 "dead stop" and 17 "reading time" flags, 0 holds over 4 s. Ask her before changing anything she approved.

## Notes
- Long video is short (5 min), so full motion film and clip renders are cheap.
- Topic needs care: real institutions (Ghana's Ministry of Gender, Children and Social Protection; Registrar-General's Department; TechCabal's article). Never invent facts beyond the kit/transcript; label illustrative UI (don't fake Marrify's real interface; use a generic "search records" mockup labelled as illustration unless she supplies screenshots).

## Raw video removed (2026-10-15)
She posted this video and asked to delete the raw recording to free space; it was moved to the Bin (~/.Trash/posted-raw-videos-2026-10-15/). Film, edits, exports, thumbnails and carousels remain; talking-head/shorts can no longer be re-exported from the 4K source.

# claude-rule film: handoff (FILM agent, keep current)

## Done
- Voice tightened: `tools/edit_voice.py` (her .mov audio -> `audio/voice_edit.flac`, 272.3 s -> 262.2 s; cutlist `data/cutlist.json`:
  "I don't even," retake, "And I don't think that, so", "This," retake, and the trailing "If you follow through with the formula…
  if you somehow…" 226.50-232.44 s). Every cut checked by re-transcribing the edited voice.
- Words + captions: whisper DTW on the edited voice (`build/edit_dtw.json`) + `tools/words.py` (BRIEF whisper fixes) -> `data/words.json`, `data/captions.srt`.
- Studio port: `film.json`, `scenes/thread.js` (the Thread kit: fonts, palette, light/dark maps, chat engine, breakout, big type,
  sound roles), `scenes/scenes1.js` (0:00-2:12), `scenes/scenes2.js` (2:12-end), `scenes/film.js`. 34 screens, 77 sound cues.
- Fonts: Schibsted Grotesk, IBM Plex Mono, Newsreader copied to `library/fonts/`; loaded by thread.js until ENGINE adds them to
  fonts.css (request in `projects/ENGINE-REQUESTS.md`).
- Music: Mixkit 480 "Curiosity" (Diego Nava), 722 "Odd Beats 01" (Lily J), 167 "Brainiac" (Alejandro Magaña), downloaded to `library/music/`.
- Lab loop run: meta, sheets (`build/qa/sheet_*`), audit (0 expect fails, 0 sound cues off), board (`data/transitions.json`, all cuts
  carried; 3 deliberate "new chat" near-empty openings), contrast, soundqa (-14.0 LUFS, AAC TP -1.6).

## Since (10:40+)
- Film v4: 53 screens (about half chat, half full-frame: questions, meter, real-page zooms, serif lifts, stickers, night type,
  numbered list, plank x2, chain, breakouts, day/night, "I don't know", big "This conversation has ended"). Critic: r1 6.3, r2 6.9, r3 running.
- Fonts now in studio fonts.css (film.json "fonts"); the self-loader was removed. Suleyman essay captured: `assets/sources/suleyman/`.
- Talking-head: `talking-head/moments/common.js` (look), `moments/full.js` (full edit), `shorts/sh1-6.js`; manifest `talking-head.json`
  (engine-test entries removed). Raw-word fix: "dabbling" timing in `talking-head/data/raw_words.json`.

## Done 11:30
- Film final exports: outputs/video/claude-rule_motion_16x9 + 9x16 (+srt), copied to ~/Downloads/claude-rule/.
- Talking-head full: outputs/talking-head/talkinghead-full_16x9 + 9x16; shorts: outputs/shorts/short01..06 (Downloads copies/links).

## Next
1. After critic r3: final film exports 16:9 + 9:16 (render.mjs export --dir video), copy to ~/Downloads/claude-rule/.
2b. Export talking-head full (both sizes) + 6 shorts with composite.mjs export; copy to Downloads.
2. STATUS.md rows. TH1/TH4 talking-head mocks in A's palette.
3. When ENGINE-REQUESTS.md has READY: full talking-head edit + shorts.

## Commands (from the workspace root)
```
python3 projects/claude-rule/film/tools/edit_voice.py      # voice edit (then whisper + words.py)
node studio/tools/render.mjs meta claude-rule
python3 projects/claude-rule/film/tools/lockrun.py python3 studio/tools/stems.py claude-rule
node studio/tools/lab.mjs audit|board claude-rule ; python3 studio/tools/soundqa.py claude-rule
python3 projects/claude-rule/film/tools/lockrun.py node studio/tools/render.mjs export claude-rule --what film --aspect 16x9
```

## Pending (disk under 8 GB at 11:40, exports refused)
The chat-size change and the centred mono-line wrap are in the code and in the film exports (done 11:33, copied to Downloads).
Still to re-export once >= 8 GB free (the old 10:59-11:19 versions are in outputs/ and Downloads):
```
node studio/tools/composite.mjs export projects/claude-rule/talking-head/talking-head.json full --aspect both
for s in sh1 sh2 sh3 sh4 sh5 sh6; do node studio/tools/composite.mjs export projects/claude-rule/talking-head/talking-head.json $s; done
```
then hard-link / copy into ~/Downloads/claude-rule/{talking-head,shorts}/ (talking-head: `ln -f`, the old links point to the old files).
Check short03's sum insert (the ILLUSTRATION line now wraps inside the margins) with a still at its insert.

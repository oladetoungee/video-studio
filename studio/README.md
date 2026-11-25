# Studio

The shared engine for every project in `projects/`: a local web studio where **every output is editable in the browser**
(the motion film, each talking-head moment, the thumbnails, the Instagram and LinkedIn carousels), a frame-exact
renderer and an audio mixer. Nothing in here is specific to one video.

## Using it
1. Double-click **Start Studio.command** (workspace root), or in VS Code **Terminal → Run Task → Start Studio**, or run `node studio/server.mjs`.
2. Chrome opens <http://localhost:7700/>: every project with everything in it that opens in an editor, grouped as
   Motion film · Talking-head moments (your video with graphics) · Thumbnails · Carousels.
   Each project is an accordion (click its title to open or close it; the item count is beside it): the most recently
   edited project comes first and is open the first time; what you open or close is remembered (localStorage).
3. All editors share one shell: the back link and title on the left of the toolbar, the frame toggles,
   **✎ Edit / Done**, **Undo / Redo** on the right (film and moments: a second toolbar line with the save state on the left and the
   sound row on the right); the list on the left; **Export** and **Versions** on the right.
   Edits save by themselves ("Saved ✓" after each change). **Done** just leaves edit mode.
   Every export downloads into the Mac's **Downloads** folder when it finishes and is also kept in `projects/<slug>/outputs/…`
   (the panel names the exact folder); each finished file has **Show in Finder**.

### Film editor (`/edit/<slug>/`)
- **Play / scrub** the film. **Voice**, **Music** and **Sound effects** (second toolbar line) switch each part of the sound on or off
  (preview); the export has the same three boxes, in any combination. **Captions** shows the burned-in captions.
- **Volume**: a slider next to each of those toggles (**Voice volume**, **Music volume**, **Sound effects volume**), −24 dB … +12 dB in
  1 dB steps, the value beside it ("−6 dB"); **0 dB = as mixed**. Double-click the slider (or its value) to put it back to 0 dB;
  arrow keys move it 1 dB. Applied live in the preview (Web Audio gain per track) and saved in `film/edits.json` as `"mix"`, so it
  survives reloads, is in **Undo / Redo** and **Versions**, and every export uses it. The export panel repeats the levels
  ("Volume: voice 0 dB · music −6 dB · …") with the line "The overall loudness stays the same for YouTube; these change the balance":
  the master is still normalised to −14 LUFS with the true-peak limiter. A moved level counts as one edit. **Clear all edits** clears
  text and positions and keeps the sound levels.
- **⟲ Play this screen** (next to **▶ Play**, or `L`): plays the screen you are on from its first frame to its end, over and over
  (picture and the voice, music and sound effects tracks jump back together, at her on/off toggles and volume levels). The
  transport says **Looping screen N**. The button again, `L`, `Space` or **Play** stop it; moving to another screen (`[` `]`, the
  Screens list, the timeline) loops that screen instead.
- **☀ Light / ☾ Dark** (top bar, after Captions, or `D`): shows the current screen's mode and switches **only this screen** to its
  other version. The button turns blue-outlined when the screen differs from its design, and the Screens list says
  "☾ dark (switched)". Full-bleed blue punchlines have no alternative: the button reads **◼ Colour**, greyed, tooltip "This screen is a
  colour punchline: no alternative". Saved in `film/edits.json` as `"modes"`, in **Undo / Redo** and **Versions**; every export
  (whole film, screen, line, in/out, frame PNG, 16:9 / 9:16 / 4:5, captions) uses it (the export summary says "dark (switched)" or
  "N screens switched light / dark"). The **Light / dark** panel (right) counts the switched screens; its **Advanced → All screens:
  ☀ Light / ☾ Dark / As designed** sets every screen at once (one undo step). **Clear all edits** keeps the light / dark choices.
- **Screens** and **Lines** (left) jump to a scene or a spoken line. **16:9 / 9:16 / 4:5** switch the frame
  (9:16 is its own layout, not a crop; 4:5 is the 9:16 layout fitted).
- **✎ Edit** (or `E`; the button then says **Done**): click any text to rewrite it (**Enter** saves, **Shift+Enter** is a new line),
  drag anything to move it. Click a **photo or card** to get corner handles and a **Size** slider, and **Hide in 9:16** (or 16:9):
  size and that hide apply to the current frame size only, like moves. A hidden one stays as a dashed box: click it to show it again.
  Text changes apply to every frame size. Edited items get a blue "edited" tag. **Undo / Redo** (`⌘Z` / `⇧⌘Z`).
- **Versions**: name and save a version; **Restore** any version (what you had is saved first); **Clear all edits** (also saved first).
- **Export**: this screen, this line, a custom in/out, this frame (PNG) or the whole film; 16:9, 9:16 or 4:5; captions burned in
  or not; voice / music / sound effects on or off; an `.srt` timed to the clip. Jobs run one at a time below the button.
- **Sound only** (in Export): **Download voice**, **Download music**, **Download sound effects**, **Download all three**, for the range
  chosen in **What** (screen, line, in/out or whole film; not a frame). Each is a WAV (48 kHz, 24-bit, stereo) of that part exactly as
  it sits in the export's mix: her volume level, the master gain, the clip's music fades and loudness gain, before the limiter and not
  levelled on its own. The files are as long as the video (same frames), start on its first frame and add up to its sound, so they
  can go straight under the video in an editing app. Saved to Downloads and to `outputs/audio/<slug>_<range>_{voice,music,sound-effects}.wav`
  (`<range>` = `whole-film`, `screen03-<id>`, `line012`, `01m00s-01m10s`; never overwritten: `-2` …). Made from the existing stems
  in seconds; when the sound is out of date it is re-mixed first ("Updating sound…"), as for an export.
- **Sound** updates by itself: when the scenes or sound cues changed, opening the editor (or exporting) re-mixes the stems first
  ("Updating sound…" → "Sound is up to date"). **Advanced → Re-mix the sound** does it by hand.
- Keys: `Space` play, `L` this screen on repeat, `D` light / dark (this screen), `←`/`→` one frame (`⇧` one second), `[` `]` previous/next screen, `C` captions, `E` edit, `Esc` close.
- The old corner HUD (section label top left, title + timecode top right) is gone from preview and exports, in every frame size.

### Moment editor (`/moment/<slug>/<id>/`): her video with the graphics on top
- **Preview**: her footage (the moment's cut, framed by the moment's own virtual camera, exactly as the export frames it) with the
  graphics drawn by the same runtime as the export. Scrub, play with sound; **Voice / Music / Sound effects** toggles, each with its
  **volume** slider (as in the film: −24 … +12 dB, double-click = 0 dB, live in the preview, saved as `"mix"` in
  `talking-head/edits/<id>.json`, used by the export, master still −14 LUFS); **16:9 / 9:16**
  (the page reloads: camera and layout are built per frame size); **Captions** on / off per frame size (default: 9:16 on;
  16:9 on for a full edit, off for moments; remembered in the browser).
- The footage comes from a small **preview proxy** per moment (`talking-head/build/proxy/<id>.mp4`, 720p, the same frames
  `composite.mjs` exports, plus the export's sound as three tracks). It is built by itself the first time (about 10 s per moment) and
  again when the cut, cues or music change (**Advanced → Rebuild the preview footage**). Exports always use the 4K source.
- **✎ Edit**: same as the film: click text on plates and cards to rewrite it, drag to move (per frame size), photos (polaroids) get
  handles, a size slider and hide-in-this-size; any element can be hidden. A burned-in caption chunk can be corrected by clicking it (9:16).
- **Export** (as in the film editor): **What** = the whole video (default), **this section** (the layout segment under the
  playhead: the moment script's TH.* segments = `META.SCENES`, start -> end), **this sentence** (the spoken caption line under
  the playhead, `META.captions.long`, t0 -> t1), a custom in / out (Set in / Set out) or **this frame as a still image (PNG)**;
  a hint under the menu says "A video file" / "One still image" (her 10-14 confusion: she picked the PNG expecting a video).
  Section and sentence are ranges with a name: job `{what: 'section'|'sentence', t0, t1, label}` -> `composite.mjs export
  --t0 --t1 --label section07-half|line42` -> `clips/<name>_section07-half_16x9.mp4` / `<name>_line42_16x9.mp4` (+ `.srt`;
  the label word is the layout: talk, behind, shout, stack, half, sticker, pops, cutaway, card, corner; `shot` for a plain scene).
  16:9, 9:16 or both; **Burn in captions** (starts as the preview's Captions toggle); voice / music / sound effects on or off, at
  her volume levels; through the queue (`jobs.mjs` moment `{what, t0, t1, t, captions}` -> `composite.mjs export [--t0 --t1]
  [--captions|--no-captions]` / `composite.mjs frame --at`). Whole: replaces `outputs/talking-head/<name>_<size>.mp4` (+ `.srt`);
  in / out: `outputs/talking-head/clips/<name>_<size>_01m00s-01m10s.mp4` + `.srt` (lines inside the range, from its start);
  frame: `outputs/talking-head/frames/<name>_<size>_frame-00m03s12f.png` (clips and frames never overwrite: `-2` …). A range
  **Speed** (2026-11-07): 1× (default, exactly as before) / 1.1× / 1.2× / 1.3×, remembered per moment (editor prefs).
  Job `{speed}` -> `composite.mjs export --speed 1.2`: footmix.py `--speed` runs `atempo` on the mix (pitch kept) BEFORE the
  -14 LUFS / -1 dBTP master; video gets `setpts=PTS/s,fps=<fps>` at the very end of the graph (captions + graphics speed up
  with the frames); `.srt` times / s; file name `<name>_<size>_1.2x.mp4` (a 1× file is never replaced by a sped-up one).
  decodes only its own source frames and cuts its sound from the moment's mix. When a moment job finishes, the **server
  hard-links each file into ~/Downloads** (`ln -f`: no second copy on a full disk; falls back to a copy across volumes); the
  editor does not download it again, **Show in Finder** reveals the Downloads link.
- **Failures in plain words**: a tool that knows the cause prints `@error {"msg", "detail"}` (composite.mjs `Plain` errors: the
  free-space guard, ffmpeg out of space / killed); the server keeps it as `job.error`, else `plainError()` maps the log (disk,
  script error, font, encoder quit, …) to a sentence. Every editor's job list (Shell.jobs) shows the sentence and folds the
  log under **Details**. The free-space check reads the data volume (`df -k /System/Volumes/Data`); `GM_FAKE_FREE_GB` simulates it (tests).
- **Her 16:9 captions** (`footage.js` CAP16, measured from `inspiration/know-how/her-caption-style-16x9.png`): Helvetica Neue
  Light (300, the Mac's font by name, never copied), `#E2D8CC`, letter-spacing −0.05 em, 92 px at 1080 (cap height 68 px),
  block centred at y 905; chunks of one breath from the moment's words file (her corrected words), ≤ 42 characters, broken at
  pauses / sentence ends / commas, never after a little word ("a", "the", "to"…), lowercase as spoken, no end punctuation; two
  balanced lines when wider than 80 % (Shift+Enter in a corrected chunk sets the break). Where her picture sits in a box (L5 half and
  half) the caption sits under her half; they step aside on full-frame cards, L9 cutaways and L11 corner cams (the film spells
  the words there) and under an L8 keyword. **Contrast box**: per chunk, `composite.mjs capbg` measures her 4K source at 30 % and
  70 % of the chunk, framed by the moment's camera (lower half of the frame in 32 px cells, linear luminance, paper outside her box:
  `talking-head/build/captions/<id>_16x9.json`, cached per source frame + framing, ~0.1 s a sample, 3 at a time); each frame the
  graphics under the caption are read from the canvas and laid over it. Text vs the 75th-percentile luminance behind it < 3:1 ->
  a black rounded box just dark enough for 3:1, clamped 25-55 % (her footage: 25-36 %; light film panels up to 55 %).
  Measured: claude-rule full 15 of 84 shown chunks boxed (lilac top: mostly none), database-indexes 143 of 155 (pale yellow sweater).
  The editor loads the file and queues a **Measuring behind the captions** job (`captions`) when samples are missing; exports
  and frame PNGs measure first. Edits: `"captions16": {size, y}`, `"cap16": {"<chunk>": "text"}`; 9:16: `"captions9": {size, y}`
  (house and shorts captions; absent = exactly as before). **Captions** pane: Size, Height, As designed.
- **Sound only** (in Export): **Download voice / music / sound effects / all three** for the whole moment: WAVs (48 kHz, 24-bit) of each
  track as it sits in the export's mix (her levels, master gain, before the limiter), as long as the video, adding up to its sound.
  `composite.mjs sound` -> `footmix.py --tracks`; a few seconds. Replaces `outputs/talking-head/audio/momentNN-<slug>_{voice,music,sound-effects}.wav`.
- **Versions**, **Undo / Redo**, **Clear all edits** as in the film. Edits save into `talking-head/edits/<id>.json`.
- Her footage is only ever cropped and scaled, never flipped (the source is mirrored as recorded).

- **Preview footage fix (2026-10-15)**: "The preview footage stopped partway (the video encoder quit)" came from her matte frames
  being written into ffmpeg after it had already finished a chunk (it stops at the chunk's frame count): node crashed on the
  closed pipe (`write EPIPE`). Now a closed pipe is ignored, each chunk is checked by its frame count, and if VideoToolbox
  quits a chunk is made once more with the software encoder (libx264, slower). If her original recording is gone from
  `kit/` (deleted to free space) the editor says so in plain words instead. `FF_V=warning composite.mjs proxy ...` prints a
  line per chunk (encoder, frames, matte frames fed).
- **Long edits** (a whole 5-15 minute talking-head): the preview footage comes in 30 s chunks (`build/proxy/<id>/vNNN-<key>.mp4`);
  playback hands over from chunk to chunk without a stop (two video elements, the next one loaded ahead). Only chunks whose
  frames changed are made again; a moved sound cue only re-mixes the sound (seconds). The editor can be used as soon as the
  first chunk exists. The home page lists **Talking-head edit**, **Moments** and **Shorts** apart.
- **Shorts** open in 9:16 only: the top label and each caption block are editable (click), the end card's texts too.

### Talking-head layouts (`runtime/layouts.js`, one global `TH`): full edits, moments, shorts
Her menu L1-L13 (`inspiration/know-how/MOTION-REFERENCES.md`) as calls in a moment script. Timings come from her words like a
film's (`PS()` / `P()` phrases on the moment's output timeline). Each call is a **segment** from its start to its end; a gap
until the next segment is filled with her plain framing (L1), a sliver under 0.45 s is absorbed. Every text is editable and
every box movable in the moment editor, per frame size; each segment shows in the Graphics list as "L5 half and half" etc.
`span` = a phrase (`k.a`: starts 0.12 s before its first word, ends 0.5 s after its last), `[t0, t1]` seconds, or
`{from: k.a, to: k.b}`. Common options: `id` (stable edit id; default `<layout>-<n>`), `sound: false` (no automatic cue),
`z` / `fx` / `fy` (override the layout's camera), `times` (one time per display word), `key` (edit key of a text).
```js
function buildMoment() {
  const k = PS({ rule: 'from the 12th of november 2026 there is a new rule', pol: 'anthropic updated its usage policy', ... });
  TH.shout(k.rule, ['12 Nov 2026:', 'a *new rule*'], { times: pick(k.rule, [2, 4, 5, 8, 9, 10]) });   // L3 giant type over her
  TH.talk(k.talk, { frame: 'mid', punch: ['claude'] });          // L1: wide|mid|close|tight, side, push [z0, z1], punch [words], alt (new framing per jump cut)
  TH.half({ from: k.pol, to: k.pol }, { film: {} });             // L5: the film's scene for these words on one half, her on the other (side 'left'|'right'|'top'|'bottom')
  TH.behind(k.cruel, ['cruel?'], { times: [k.cruel.w[7]] });     // L2: words BEHIND her head (person matte)
  TH.keyword(k.fight, 'not ~here~ to fight', { times: ... });    // L8: chest-height keyword, ~serif~ word 2.2x; replaces the caption
  TH.stack({ from: k.want, to: k.matter }, [{ s: 'Do I want to abuse it?', at: 'do i want' }, { s: 'Do you?', at: 'do you want' }]);   // L4 (img: key for a picture)
  TH.card(k.what, V(['The thought behind the rule'], ['The thought', 'behind', 'the rule']), { times: pick(k.what, [8, 10, 12, 13, 14]) });   // L10 (+ riser and hit)
  TH.pops(k.idea, ['a tool?', 'a person?', 'conscious?', { img: 'logo' }], { focus: 2, focusAt: 'conscious' });   // L7
  TH.glitch(k.think.w[9], { text: 'CONSCIOUS?' });               // L13 (without text: the graphics split for 2 frames)
  TH.cutaway({ from: k.say, to: k.bans }, { enter: 'push', film: {} });   // L9: a film scene full frame, her voice goes on
  TH.highlight(k.extreme.w[11], 'extreme');                      // L12: accent block behind that word in any TH text / short caption
  TH.corner({ from: k.enforce, to: k.seem }, { film: {} });      // L11: film full frame, her in a circle (o.corner, o.d, o.face)
  TH.sticker({ from: k.con, to: k.moral }, { img: 'moral', docAt: 'document', tag: 'Claude’s constitution', lines: ['Moral status:', '*deeply uncertain*'], linesAt: 'moral' });   // L6
}
```
(the whole demo: `projects/claude-rule/talking-head/moments/engine-test.js`, an engine test, not her edit.)
- **L11 corner** (2026-10-14): `o.corner: 'bl'` (default, as before) `| 'br' | 'tl' | 'tr' | 'auto'`; a project sets its default
  with `TH.look.corner` in `moments/common.js` (database-indexes: `'auto'`). `'auto'` measures the film under the segment once,
  before the cameras are set (`TH.resolveCorners`, called by `bootMoment`): 6-24 film frames at half size, pixels in each
  candidate circle's box (+24 px) that differ from the frame's most common colour; the emptiest corner wins and stays for the
  whole segment (no jumping). Bottom-left stays unless another corner is emptier by > 0.3 % of the box. 16:9 corners sit 48 px
  from the edges; 9:16 top corners sit above the film's content band (y = 370 - d - 18), bottom ones on the band's foot (as
  before). The picks and scores are in `composite.mjs meta` (`corners`). Projects without `'auto'` render byte-identical
  (hashes checked on claude-rule, ux-research, phone-distraction, reading-stack, ghana-marrify). The split cutaways in
  ux-research's `common.js` pass `corner` through (`TH.cutaway(.., { corner: 'auto' })`). Not measured: the moment's own
  graphics (a short's top label), only the film.
- **Camera**: each layout sets its own framing (L4 puts her left, L5 into her half, L11 into the circle, L6 right / low).
  `CAM()` gained `box: [x, y, w, h]` (layout px: her picture sits in that box, the crop takes its shape; a move between two keys
  slides a box of the same size, a new size starts at once: the export scales each box size in its own branch) and `face: 0.5` (zoom so her face is that share of the box height). A box is
  exported by ffmpeg (crop -> scale -> placed on a paper ground) and drawn the same way in the editor. Never flipped.
- **Film scenes inside a moment** (L5, L9, L11, L6 `film: {}`, short inserts): `talking-head.json` `"film": "<slug>"` (the
  project's own film). The film runs in a hidden frame with the film runtime (its edits and light / dark choices included) and
  is drawn into the moment, frame-exact. **Sync by words**: her words in the moment and in the film are matched (longest common
  subsequence), so the film's visuals land on the same spoken words here even though the pauses were cut differently.
  `film: { scene: 'id' }` holds inside one film scene, `{ at: 41.2 }` plays from that film time, `aspect: '9x16'|'16x9'`
  (half and half uses the film's phone layout by default), `fit: 'cover'|'contain'|'safe'`, `focus: [fx, fy]`,
  `sound: false` (cutaways and corner cams bring the film's own sound effects for that stretch, as `film:<role>` cues).
- **The look**: `Object.assign(TH.look, { disp: (s) => '800 ' + s + 'px "Schibsted Grotesk"', fg, acc, accOnDark, ground, cardGround, outline, ring, plate, dim, talk: { z: [1, 1.08] } })`
  in the project's `moments/common.js` (each video its own look; the menu fixes the grammar, not the palette).
- **Sound**: each layout adds meaningful cues from the palette (L3 typeHit per line, L4 / L7 pop, L5 / L9 swipe, L6 paper +
  shutter, L10 riser ending on a hit (max one per 30 s), L11 pop, L12 mark, L13 glitch, short end card notify + tick).
  Roles missing from the manifest come from `tools/sound-palette.json` (SOUND-PALETTE.md). Whooshes are rationed (at most 1 in
  6 cues, never two in a row: the rest become swipes). Music bed ducking: new manifests duck 18 dB under her voice.

### Face + graphic layouts L14-L19 (2026-10-26, her note "not only the circle")
Her picture shares the frame with a graphic in many ways (the L11 circle stays one option, never the default; CHECKS
`layout-variety`). Each works in 16:9 and 9:16; her footage is only cropped and scaled (a camera box), never flipped, her
face never cut. **Her box is an element in the moment editor** (`<segment id>/@her`, per frame size: drag to move, corners /
size slider to resize); the cameras are rebuilt at once (`TH.recam()`, called by the editor after every edit). The graphic:
`film: {}` (her film's scene), `img: '<image key>', credit: 'Source'` (a real screenshot, top-aligned, `scroll` px), `draw(t, r)`,
or `card: {kicker, lines, at: '<word she says>', foot}` (a flat card, her words land one per spoken word from `at`). All texts editable.
```js
TH.split(k.a, { her: 0.34, side: 'left', card: { kicker: 'PHP2Shell', lines: ['Huge loopholes', 'tried to *exploit*'], at: 'huge' } });  // L14: her strip 30-45 %, left / right (16:9), bottom / top (9:16); o.rule: a hairline on the join
TH.tile(k.b, { at: 'br', w: 560, keys: [{ at: 'runs', to: 'tr' }], img: 'php-net', credit: 'php.net' });   // L15: square-cornered window, any corner or [x, y, w, h]; slides between keys (same size), a new size at once or in `resize` steps
TH.page(k.c, { kicker: 'How it works', title: ['PHP reads the request first'], titleAt: 'php reads', below: '...', device: 'browser' });   // L16: her picture is the page's lead image; the page rises in and scrolls (o.scroll)
TH.presenter(k.d, { side: 'right', scale: 0.84, card: {...} });   // L17: her cut-out (matte), bottom-anchored, IN FRONT of the graphic; o.outlinePx for a light outline
TH.room({ from: k.e, to: k.f }, { at: 'a trap server', back: false, card: {...} });   // L18: full-frame her slides (16:9, no scaling) / shrinks in o.steps (9:16) to her side while the graphic opens; ends as L14
TH.ots(k.g, { side: 'auto', w: 720, card: {...} });   // L19: over-the-shoulder window beside her head (9:16: above her)
```
- Captions: 16:9 the layout places them (`FOOT.capX`: centred in the free part, a plate over the tile's graphic); 9:16 at the
  panel's foot (`FOOT.capYNow`). Sounds: split / room / presenter swipe, tile / ots pop, page paper + type.
- Camera additions (footage.js, opt-in, nothing old changes): `CAM(t, {resize: n})` = a box that changes size during the move
  in n steps (each size is one export branch, so a few, never one per frame; centre glides); `FOOT.under(t)` = drawn before
  the scenes (flat bands around a framed picture); `FOOT.capX` = 16:9 caption centre + width for this frame.
- Demo (engine test, not her edit): `projects/october-attacks/talking-head/moments/lab.js` (moment `lab`), stills + board in
  `projects/october-attacks/talking-head/stills/layouts/`.

### Shorts framing (2026-10-26, her note "I look so zoomed in")
In 9:16 her picture used to always fill the frame (a 1215x2160 slice of her 16:9 shot, + talk z 1.08: her face ~39 % of the
height). `TH.FRAMES` shows a wider window of her frame, full width, with the top label and captions on flat bands of the
video's ground (`TH.look.band`, else the look's ground; never blur or gradients):
| name | her picture | captions | face share (october-attacks s01) |
|---|---|---|---|
| `fill` | as before (the default for every project) | on her | 0.39 |
| `4x5` | 1080x1350 window (a 1728x2160 source crop) under the label | on her chest | 0.28 |
| `3x4` | 1080x1440 window | on her chest | 0.30 |
| `1x1` | 1080x1080 window (podcast-clip look) | in the band under her | 0.22 |
| `4x5band` | 4:5 window, high (a long label may sit on its top) | in the band under her | 0.28 |
| `wide` | full width, zoom 0.8 (z < 1), picture from the top, band at the foot | on her | 0.32 |
Where it is set (first wins): `?frame9=` (comparison stills: `composite.mjs stills ... --frame9 4x5 --prefix 4x5_`), the
editor's per-section pick (edits `"frame9seg": {"<segment id>": name}`), the editor's whole-short pick (edits `"frame9"`), a
segment's `o.win`, the moment's `"frame9"`, the manifest's `"frame9"`, `TH.look.frame9`. Only keys without a box of their own
change (L5 / L6 / L11 / L14-L19 keep theirs). Editor: **How much of her the short shows** (Whole short / This section; the page
reloads to rebuild the cameras). october-attacks: manifest `"frame9": "4x5"`. Check: CHECKS `short-zoom`.

### Her matte (L2 words behind her, L6 cut-out)
`tools/matte.py` (macOS Vision `VNGeneratePersonSegmentationRequest`, accurate, via `tools/matte.swift`): her silhouette at
768x432, the largest region kept (a cushion or a chair edge Vision also lifts is dropped), stored as small H.264 videos of 600
source frames in `talking-head/build/matte/c00007.mp4` + `matte.json`. Made once, on demand: only the chunks the layouts need
(about 25 s per 20 s of video; a whole 4:30 video ~6 min). Exports read it frame by frame (`composite.mjs` hands each frame's
matte to the page); the editor's preview footage carries it in a band under the picture. The runtime feathers the edge
(`TH.matte.feather`, px). By hand: `node studio/tools/composite.mjs matte <talking-head.json> <id|all>`.

### Shorts (moment `"kind": "short"`)
```json
{ "id": "s01", "kind": "short", "slug": "rule-pt1", "title": "Anthropic's new rule for Claude (pt 1)", "label": "Anthropic's new rule for Claude (pt 1)",
  "sublabel": "", "in": 36.9, "out": 59.6, "cuts": [], "script": "shorts/s01.js", "music": ["722", 4.0],
  "endCard": { "seconds": 6, "thumb": "<image key>", "title": "<the long video's title>", "avatar": "<image key>" } }
```
9:16 only. Her caption spec (SHORTS-PLAYBOOK): **Helvetica Neue** Medium 76 px (the Mac's own font, drawn by name; never
copied anywhere), tight tracking, `#DFD7CB` on 40 % black, radius 10, centred at y 1535, phrase blocks of one breath (<= 44
characters, two balanced lines), lowercase as spoken (names and "I" kept, no full stops), hard swaps. The top label: white
boxes, Helvetica Neue Regular 82 px, top at y 135, two balanced lines when long, on screen the whole short (over inserts),
never animated. Film inserts with `TH.cutaway` (full page) and `TH.half` (half page, film on top). The **end card** (the
`endCard.seconds` after her last word): cream ground, a dark phone-style card with FULL VIDEO ON YOUTUBE, the thumbnail, the
title, the channel row (with Gbemi, @WithGbemi, a cursor taps Subscribe), Like / Comment / Share buttons (no invented counts).
Exports: `<shortsOut, default ../outputs/shorts>/shortNN-<slug>_9x16.mp4` + `.srt`, -14 LUFS. Any moment can use the shorts
caption style with `"captionStyle": "shorts"` (moment or manifest).

### Full-length talking-head (moment `"kind": "full"`)
`"in": 0, "out": "end"` makes the moment the whole video; `"retakes": true` cuts a phrase she starts and says again (2-5
words repeated within a few words; listed in `edl.json` "retakes" to check; `"keep": [[a, b]]` undoes one); pauses are
tightened as in any moment. Export: `talkinghead-<slug>_<16x9|9x16>.mp4` in one pass (the 4K source decoded once, graphics
streamed, ~1.8x real time on this Mac for 16:9). New project: `python3 studio/tools/thsetup.py <slug>` writes the manifest
skeleton (film link, palette, ducking), her words on the source timeline (from the film's corrected words via
`film/data/cutlist.json`, else whisper) and the face track; then add moments and run `footedl.py`.

### "Pause her": correction inserts (2026-11-02, FEEDBACK "the edit fixes what the recording gets wrong")
For a big slip (a renamed thing, a wrong date): at a point of her cleaned timeline her picture AND voice stop for `d`
seconds, a plain screen in the video's own look (TH.look's ground, display face and accent) types the correction on, then
her video goes on exactly where it stopped. Everything after it moves later (her words, captions, P()/PS() layouts, sound
cues, the export's length; chapters must be timed on the exported file). Works in full edits, moments and shorts, 16:9 and
9:16, in the editor preview and in exports. Not in teasers unless the teaser moment lists its own.
```json
"pauses": [ { "id": "fix-dsa", "at": 355.2, "d": 4, "text": "Update: the Federal Scholarship Board is now the Department of Scholarship Awards (DSA)" },
            [66.55, 3.5, "Update: ..."] ]
```
- **Where**: manifest top level (every full edit / moment / short whose cut contains `at`; a moment opts out with
  `"pauses": false`), a moment's own `"pauses"`, and the moment editor (edits `"pauses": {"<id>": {at, d, look, sound, off}}`;
  same id = overrides the manifest's, `off: true` deletes it). Short form `[at, d]` or `[at, d, "text"]` (id `p<at>`).
- `at` = a second of her **source recording** (as in `cuts` / `holds`); it moves to the end of the word she is saying there
  (`"exact": true` keeps it) and onto a frame. In a stretch the cut removed: just before the next clip.
- `d` seconds (1-20 in the editor). The text types at >= 26 characters/s from 0.3 s in and leaves >= 1.4 s to read; a
  steady caret (no blinking). A label before a colon (`Update:`) is in the accent colour. Line breaks: `\n`.
- `"look": "card"` (default: full-frame card, everything else hidden) or `"frozen"` (her last frame held, the text on a flat
  plate in the lower part). `"ground": "<G key>"`, `"fg"`, `"acc"` override the colours.
- `"sound": true` (default): a soft keyboard bed (`typeSoft`: library keyboard-typing / laptop-typing, -15 dB, exactly as long
  as the typing). Her voice is silent; the music bed goes on (it opens up as in any pause); other sound cues inside the
  pause are dropped.
- Editable: text `pause-<id>/text` (click it in ✎ Edit, or the editor's **Pause her** panel), block `pause-<id>/@box`
  (drag / Size). The panel: **Add a pause at the playhead**, text, seconds, Plain screen / Her picture held, typing sound,
  Go to, Delete. Adding, deleting or changing length / look / sound saves and reloads the page (the timeline is rebuilt);
  the preview footage rebuilds by itself (its key includes the clips).
- How: the EDL is untouched. When the moment loads (`bootMoment`), `applyPauses` splits the clip at `at` and inserts a clip
  `[at, at + d, {"pause": id, "f": held source frame}]` (`FOOT.clips`, `meta.clips`, `meta.pauses`). `composite.mjs` reads
  the source once in order: the held frame is selected once and repeated (`setpts` gap + `fps`, `holdChain`), no splice.
  `footmix.py --clips` (passed only when a pause exists) writes silence for it. Words / captions skip it (`capBreaks`, lines
  end where it starts), `cutTimes()` leaves out its joins, `outToRaw()` inside it = the held frame.
- Moments without a pause: nothing changes (hashes checked 2026-11-02: graphics, cameras, cues, captions of full, shorts and
  teaser of a scholarships copy and claude-rule sh2 identical; footmix output bit-identical).

### Teasers (moment `"kind": "teaser"`, 2026-10-14): her best lines for LinkedIn and X
Spec and the reference study: `inspiration/know-how/TEASER-PLAYBOOK.md`.
```json
{ "id": "teaser", "kind": "teaser", "slug": "<slug>", "title": "...", "lead": true,
  "bites": [[15.2, 18.3], [19.48, 28.61], {"in": 568.87, "out": 581.71, "holds": [[579.3, 580.4, 0.55]]}, ...],
  "tail": 6.5, "captionStyle": "shorts", "music": ["766", 0], "endCard": {"title": "<YouTube title>"}, "script": "teaser/teaser.js" }
```
- **Bites in any order** (source seconds, the order they play). `footedl.py` plans each bite like a small moment (its own
  `cuts` / `holds`; pauses tightened) and writes `edl.json` `"bites"` (output t0 / t1 of each). `"lead": true`: bite 0 is a
  silent stretch that sits under a countdown card. Manifest `"teaserOut"` (default `../outputs/teaser`); files
  `teaser-<slug>_<size>.mp4` (+ `.srt`), 9 Mbps (16:9) / 8 Mbps.
- **Clips that go back in the source** (any teaser): `composite.mjs` export and preview first splice the needed source frames
  in output order into `talking-head/build/splice/<id>-<key>.mp4` (4K HEVC 28 Mbps, one short ffmpeg per run, joined
  without re-encoding; ~230 MB for 90 s; reused by every frame size; an older cut is removed; trash it when done). Moments in
  source order read the source exactly as before (hashes checked: claude-rule sh2/sh6, database-indexes full identical).
  `footmix.py` decodes the span of all clips (min..max), so the sound follows any order.
- **Captions never span two bites** (`FOOT.capBreaks`, and a word repeated across two bites is not taken for a retake).
- **Frame sizes**: 16:9, **1:1 (1080x1080)** and **4:5 (1080x1350)** (both the 9:16 layout fitted, `core.js` ASPECTS: 1:1 =
  portrait y 250..1670, 4:5 = y 230..1650), 9:16. The camera crops the part of her picture the window shows (`visRect()`,
  `camAt` `vis`), boxes map through `BASE`; 16:9 / 9:16 are untouched. Editor: the 1:1 and 4:5 buttons and export options
  appear for teasers only; Export can make **All four sizes**. CLI: `composite.mjs export <man> teaser --aspect 16x9,1x1,4x5`
  (or `all`).
- **`runtime/teaser.js` (`TZ`)**, loaded after layouts.js: `TZ.bites()`, `TZ.at(i, 'words')`, `TZ.vis()` (the visible layout
  rect), `TZ.talk(i | [t0, t1], o)` (TH.talk; zooms eased back in 1:1 / 4:5), `TZ.insert(span, o)` (her own film full frame,
  `sync: '<phrase>'` = in step with her words via the film's word timings, `back`, `after`, `scene`/`from`, `at`, `film:
  {offset}` (film ahead so its type is already on screen), `noCaps` (captions step aside when the film spells her words),
  `enter: 'snap'`, `zoom` / `zoomAt` / `zoomGround`; in 1:1 / 4:5 the film's 9:16 frame is cropped to the window),
  `TZ.card(span, draw)` (countdown), `TZ.layer(t0, t1, draw)` (label), `TZ.endCard(draw)` (after her last word; a slow 3.5 %
  push). Each project draws its label / countdown / end card in its own look (`projects/<slug>/talking-head/teaser/teaser.js`).
- **Movie-trailer cuts (v2, 2026-10-15; TEASER-PLAYBOOK section 0)**: `TZ.cut(at, {type})` shows the join instead of hiding it:
  `'flash'` (2-3 frames of light, `color`), `'black'` (2-4 frames across the join), `'whip'` (8-frame panel with motion smear,
  `color`, `streak`), `'glitch'` (3-4 frames of slices + one black frame, `colors`), `'card'` (a title-card interstitial on a
  gap bite: `text`, `draw(t, r, lt, text)` in the film's look, `out: 'flash' | 'black'`); `at` = a bite index, a bite / gap
  object, or seconds with `{time: true}`; `sound` / `db` (defaults: flash -> `flash`, black -> `boom`, whip -> `swipe`, glitch ->
  `glitchHit`, card -> `hit`), `drop` (s of music silence before the cut). Drawn above the captions (`TH.over`). Cut sounds carry
  `keep` (never thinned by `pruneCues`). **Gaps**: a bite `{"gap": 0.8, "at": <silent source s>}` (footedl keeps it whole;
  `TZ.gaps()`; `TZ.bites()` numbers speech bites only, so adding a card never renumbers a script).
  **Music sections**: `TZ.music(t, db, ramp)` and `TZ.drop(t, d)` write `@mgain` / `@mdrop` cues that `footmix.py` applies to
  the music bed (level steps; silence with a 0.08 s fade). New palette roles: `tapeStop`, `boom`, `riserShort`, `flash`,
  `glitchHit` (`tools/sound-palette.json`).

### Export fix (2026-10-15): one empty frame at a box -> full-frame handover
Every crop / overlay command in the footage graph was timed `(f / fps).toFixed(4)`, which rounds UP for about half the frames
(605 / 30 = 20.16666 -> 20.1667), so the command fired one frame late. Where a half-and-half (her picture in a box) handed back
to her full frame, the full-frame branch still cropped its parked 16x16 corner (pad colour) for that frame: one empty frame
with only the label and captions. Commands are now timed half a frame early (`ct(f)`), which also lands every camera move
exactly on its frame in un-boxed moments. Check: a near-flat middle band (std < 6, 54x96 grey) between two frames that are
not (the shorts' end card has one such frame by design: its first frame before the card fades in).

### Export fixes (2026-10-13, EXPORT agent)
- Her picture in a box (half and half, corner cam): every size group of the footage graph now gets every frame and its own
  sendcmd (crop timed in the branch, position on the overlay's main input). Before, a later box's position could land early
  (an empty paper half) and a long edit with gaps could run ffmpeg out of memory (silent kill, `write EPIPE`).
- `talking-head.json` `"pad": "#RRGGBB"`: the colour under her picture while a panel slides in (default paper `#EDE9E2`; a dark
  film look sets its own ground). `FF_V=info` shows ffmpeg's log during an export.
- Layouts: pop-around plates stay inside the frame; words behind her shrink to fit the width; a film `fit: 'safe'` panel falls
  back to contain when cover would cut > 4 % of the content; in shorts a 9:16 top film panel starts below the label
  (`TH.labelBottom()`; `underLabel: true` keeps the old placement).

### Render lock
Every heavy step (export, preview footage, stills, matte, face track) takes the machine-wide lock `/tmp/gm-render.lock`
(`tools/lock.mjs`, `tools/gmlock.py`: owner file "name pid N"; a lock left by a dead studio process is taken over; anyone
else's is waited for, the queue shows "waiting for another render"). Exports refuse to start under 8 GB free. When an export is the only
job on the machine, `GM_MIN_FREE_GB=3 node studio/tools/composite.mjs export …` lowers that guard for that run (default stays 8).

### Design editor (`/design/<slug>/thumbnails/`, `/design/<slug>/carousels/<deck>/`)
- **Preview**: the real design page (the same HTML the export renders) at true size, scaled to fit. Thumbnails: one direction at a time
  with a strip of all directions on the left. Carousels: one slide at a time with a strip of all slides.
- **✎ Edit / Done** (on by default): **click any text to edit it in place** (Enter saves, Shift+Enter = new line, Esc cancels; select a word and
  press **Accent colour** or **Serif**). **Drag** anything to move it, **corner handles** or the **Size** slider to resize, **Hide**
  (bring it back from "Moved, resized or hidden"), arrow keys nudge the selection (`⇧` 10 px). Going inward / outward: **Select inside**
  (`Enter`: the first visible thing one level inside the block; on a text with nothing inside, Enter starts editing it) and **Select
  whole block** (`⇧Enter`; `Esc` also goes up one level, then clears the selection).
- **Download this part** (selection toolbar; also Export → **This part (PNG): what you selected**): the selected element with
  everything inside it as a PNG. `studio/tools/part.mjs` through the job queue (`jobs.mjs` design `what: 'part'`): it loads the page
  exactly as the export does (thumbnails: render.mjs's server, Chrome flags and first chrome-headless-shell; carousels: `build.mjs
  <deck> --html`, then `index.html` from file:// with build.mjs's Chrome), finds the element by its studio name (data-move, data-k,
  `img:<data-img>`), and captures the box of it and all its visible children, with their shadows and a little room for overhanging
  letters, clipped to the design's edge. **Behind it** (Export panel, remembered): *Nothing* (default: everything outside the part is
  `visibility:hidden`, its parents' backgrounds, borders, shadows and ::before/::after cleared, `omitBackground`), *Keep the background
  behind it* (other elements hidden, the parents' grounds kept, carousel `.grid` lines kept), *Everything behind it* (a plain crop of
  the export; checked pixel-identical to the full PNG). **Size**: full (as exported) or 2× (`deviceScaleFactor` 2). A photo alone in a
  frame comes with its frame; rotation, moves, sizes, hidden items, colours and photos are hers, from `content.json`. Files:
  `outputs/thumbnails/parts/<direction>_<part>.png`, `outputs/carousels/<deck>/parts/<NN>_<part>.png` (`img:scene` -> `photo-scene`;
  `@2x`, `-on-ground`, `-crop` suffixes), downloaded to Downloads with Show in Finder like other exports. Run by hand:
  `node studio/tools/part.mjs <slug> thumbnails <direction> <part> [--scale 2] [--bg none|ground|all]` or
  `... carousels <deck> <slide> <part> ...`.
- **Colours**: the project palette (`projects/<slug>/palette.json`, shared by every design editor of the project; the house set
  ink, paper, card, blue, orange, green until it is first changed). Thumbnails: ground and accent (the headline colour follows the
  ground: light or dark, whichever reads better; "Back to the design's own colours"). Carousels: this slide's ground (any swatch, or the
  full-bleed accent) and the deck's accent (every slide; a dark custom accent gets a lighter shade on ink slides).
  **Custom colour**: `<input type=color>` + hex field, **Lighter / Darker** (±8 % HSL lightness), **Use as ground / accent**,
  **Add to palette**. Right-click a swatch or its × removes it from the palette (an inline **Undo** row, and ⌘Z). Undo/redo covers the
  palette as well as the design. A warning shows when the headline or the accent words on the ground are under 3:1 (WCAG AA, large text),
  measured on the page itself.
- **Photos**: **Change…** opens a picker grouped as Your photos (her uploads, newest first), Cut-outs, Photos of her, Video frames,
  Books and covers. **Add photo…** (Photos panel or picker header, file chooser, several at once) or drag files onto the picker or
  the design (on a photo: it replaces that photo). Uploads go to `projects/<slug>/assets/uploads/` (JPG, PNG; HEIC -> JPG and WebP ->
  JPG/PNG with `sips`; over 3000 px scaled down; the original file name made safe, `-2` if taken; the same file again is not duplicated).
  **Remove background** (picker tile, Photos panel, or the selected photo's toolbar, which also swaps the cut-out in) runs
  `tools/cutout.swift` (macOS Vision: person segmentation, quality accurate, kept where `VNGenerateForegroundInstanceMaskRequest` agrees,
  so the sofa does not leak in; objects alone when there is no person) -> `assets/uploads/cutouts/<name>-cutout.png`, cropped to the
  subject, original kept. **Person only** uses the person mask alone. **×** on an upload moves it to the Bin; refused while a design's
  current content uses it, a warning when only saved versions do.
- A change is always made on the newest `content.json` (the editor re-reads it first), so edits made elsewhere meanwhile (another
  tab, an agent) are kept.
- **All text**: every text of the design or slide in one list (also empty ones, which are not shown); thumbnails also the paired YouTube title.
- **Checks** (carousels): the same checks `build.mjs` runs, live (labels under 32 px, single word on a last line, photos too close to
  text, text into the page number or past the margins), in the strip, in the Checks pane and on each export.
- **Export**: thumbnails: this one or all (+ overview). Carousels: this slide, all slides, or (LinkedIn) the PDF. Server-side jobs run
  the project's own `render.mjs` / `build.mjs`, so the file is exactly what you see. It replaces the file of the same name in
  `outputs/thumbnails/` or `outputs/carousels/<deck>/` and downloads a copy.
- **Duplicate** (thumbnails) copies the direction to `<name>-v2` to try a variant; **Remove variant** moves a duplicate to the Bin.
- **Versions** of each direction / deck (a "Before this session's edits" version is saved before the first change).
- Every change is saved into the design's `content.json`; the preview reloads behind the scenes after each change.


### Opt-ins added 2026-10-26 (october-attacks talking-head agent; every other project unchanged)
- `TH.look.capFit: true` (footage.js): a 16:9 caption in a narrow strip (her side of an L14 / L18) shrinks to fit, down to 64 % of her size, instead of running off the frame.
- `TH.look.kwHideCap: true` (layouts.js): a keyword (L8) hides the shorts-style caption while it is up (9:16 full edits, shorts).
- Moment `"endCard": false` (layouts.js): no end card (a short or teaser while her outro clip is not there yet).

### Ending: "FULL VIDEO ON YOUTUBE" drawn by us (manifest `outroCard`, 2026-11-10)
Every short and the teaser end on our own drawn card when the video has no clip of hers (`"outro"`, which always wins). Order as her
clips (`inspiration/outro/`): watch the full video (camera mark + "Full video / on YouTube", the video's thumbnail, its title) ->
subscribe (her round photo, "With Gbemi", @WithGbemi; a cursor presses Subscribe at 1.9 s: it turns "Subscribed" + a ringing bell)
-> like / comment / share (Like fills in the accent at 3.1 s, Share nudges at 4.5 s). No counts, ever.
```json
"outroCard": { "on": true, "thumb": "../outputs/thumbnails/<chosen>.png", "title": "<YouTube title>", "dur": 6.5,
  "photo": "/library/her-photos/avatar.png",
  "style": { "ground": "#0E0E0E", "ink": "#FFFFFF", "mid": "#A3A7A5", "accent": "#E5262A" },
  "at": { "sub": 1.9, "like": 3.1, "share": 4.5 } }
```
- Top level of talking-head.json = every short + the teaser; a moment can override any key (`"outroCard": {...}`) or switch it off
  (`"outroCard": false`). `title` falls back to the manifest's `videoTitle`; `photo` defaults to `library/her-photos/avatar.png`
  (IMG_1549 from her shoot, enhanced, cropped round). Optional texts: `headline`, `headline2`, `channel`, `handle`. `style` also
  takes `button` / `buttonInk` (the Subscribe pill; default ink / ground). Default style: off-black ground, cream ink, orange accent.
- The card's length (`dur`) replaces the moment's `tail`; the old end card (`endCard`) and every sound after her last word go (music
  cues stay). Sounds: `pop` on the card, `mouseClick` (Mixkit click-classic, new palette role) on Subscribe, `tick` on Like, a quiet
  `tick` on Share.
- Recomposed per frame size (layouts.js `ocLayout`): 9:16 a tall stack inside x 80..900 and SAFE (clear of the platforms' buttons;
  the slow 2 % push is anchored at the left edge); 4:5 the stack centred; 1:1 two columns + the actions row under them; 16:9
  thumbnail left, title / channel / Subscribe / actions right. A thumbnail as light/dark as the ground gets a hairline.
- Editable in the moment editor (scrub to the end): every text (txt keys `outrocard/headline`, `headline2`, `title`, `channel`,
  `handle`, `sub-on`, `sub-done`, `act-Like|Comment|Share`), the thumbnail and her photo move / resize, and **Change picture…** in
  their popover uploads another picture (saved in projects/<slug>/assets/uploads/, the edit stores its path; Reset all = original).
- Review stills (no export): `node studio/tools/outrostills.mjs <slug> projects/<slug>/outputs/_review/outro sh01:9x16,teaser:16x9`
  (uses the running studio on :7700 and the render lock).
- composite.mjs check: fixed a regex inside the page script (`/\/@her$/` became a comment: the whole check threw a SyntaxError); new `labelOverGraphic` for shorts (CHECKS `label-over-graphic`).
- october-attacks itself: `talking-head/moments/plan.js` (one plan for the full edit and all shorts: OA_PLAN('full' | 'short')), `moments/common.js` OA.* helpers (real page crops with scroll + highlighter + credit, stat, terminal, month calendar, keys, list, flow), `tools/hicap.mjs` (sharp phone-width crops of the real articles) + `tools/srcsync.py`.

## What lives where
```
studio/
├── server.mjs        HTTP server (no framework): home (every project + its editors), the editors, edits / content / versions API,
│                     the job queue, "Show in Finder" (/api/reveal), media with byte ranges
├── runtime/          the film engine, loaded by the editors AND by the renderers (so preview = export)
│   ├── core.js       aspect + V(), easing, primitives, kinetic type KT(), typing, timeline P()/addScene()/sfx(),
│   │                 renderFrame(t), edit ids + overrides (moves, sizes, hides), captions
│   ├── motion.js     MOTION: easing presets (cubic-bezier), damped springs (damping ratio), durations / staggers, beat grid,
│   │                 MOTION.expect() / MOTION.state() for the numeric audit (one global, draws nothing)
│   ├── house.js      her design system: palette C/G, fonts F, mono labels, IDX lists, browser, polaroid, imgCard, bookCard,
│   │                 cursor, checkbox, meter, grid, (old) HUD
│   ├── boot.js       loads projects/<slug>/film/film.json, fonts, images, words, captions, edits, the scene scripts
│   ├── footage.js    talking-head moments: cut, virtual camera (+ boxes, face-fill), face track, plates, panels, social captions
│   ├── layouts.js    TH: the layout menu L1-L13, her matte, the film inside a moment, shorts (label, captions, end card)
│   ├── fonts.css     house fonts from library/fonts
│   ├── film.html     headless render host (/render/<slug>?aspect=9x16&captions=1)
│   └── moment.html   headless render host for moments (composite.mjs)
├── editor/           index.html + editor.js (film), moment.html + moment.js, design.html + design.js,
│                     shell.js (versions, undo, export list, downloads, checks: shared), canvasedit.js (hit boxes, drag, resize,
│                     popover: shared by film + moments), editor.css (one look for all three)
├── tools/
│   ├── render.mjs    film: headless Chrome -> ffmpeg: meta, stills, sheet, export, sound (sound only), hashes (also the queue's film job runner)
│   ├── jobs.mjs      the queue's runner for design exports (project render.mjs / build.mjs), moment exports, moment sound only and preview proxies
│   ├── composite.mjs moments: stills, sheet, check, export (4K source cropped per frame + graphics), sound (sound only), proxy (editor preview)
│   ├── cutout.swift  "Remove background": macOS Vision person + foreground masks -> transparent PNG cut-out (design editor photo picker)
│   ├── lab.mjs       QA lab loop: contact (every Nth frame), onion (onion skin), speed (speed graph), audit (numeric audit),
│   │                 board (transition board + blank / flash frames) -> film/build/qa/, film/data/transitions.json
│   ├── soundqa.py    sound QA: hit timing (first peak vs frame+1), hits over the bed, music under voice, phone band, DC,
│   │                 true peak after AAC, export offset -> film/build/qa/soundqa.json (changes nothing)
│   ├── stems.py      voice + ducked music + SFX cues -> film/build/stems/{voice,music,sfx}.flac (+ .m4a previews), -14 LUFS master gain
│   ├── mixclip.py    mixes one film export's audio from the stems (voice / music / SFX toggles, her levels, fades, loudness;
│   │                 --track-* writes each track alone for "Sound only")
│   ├── footmix.py    a moment's audio: her voice (cut), ducked music, SFX, her levels, mastered (+ the three tracks for the
│   │                 preview; --tracks writes them as WAVs for "Sound only")
│   ├── footedl.py, facetrack.py   moment cuts (EDL, full-length, retakes) and face track
│   ├── matte.py, matte.swift      her person matte (cached chunks in talking-head/build/matte/)
│   ├── thsetup.py    sets up a project's talking-head folder (manifest, words, face track)
│   ├── sound-palette.json         default sound roles for moments (SOUND-PALETTE.md)
│   └── lock.mjs, gmlock.py        the machine-wide render lock
├── package.json, node_modules/   puppeteer-core (Chrome comes from ~/.cache/puppeteer)
└── vendor/claude-motion-design/  reference implementation (MIT), not used at runtime
```
What each editor writes:

| Editor | Saves into | Versions in | Export runs |
|---|---|---|---|
| Film | `film/edits.json` (texts, positions, captions, sound levels `mix`) | `film/versions/` | `tools/render.mjs job` -> `outputs/{video,clips,frames}/` (never overwrites); Sound only -> `outputs/audio/` (never overwrites) |
| Moment | `talking-head/edits/<id>.json` (same + `capShort`, `mix`) | `talking-head/versions/<id>/` | `tools/composite.mjs export` -> `outputs/talking-head/` (replaces); Sound only (`composite.mjs sound`) -> `outputs/talking-head/audio/` (replaces) |
| Thumbnails | `design/thumbnails/directions/<d>/content.json` | `…/directions/<d>/versions/` | `design/thumbnails/render.mjs <d>` -> `outputs/thumbnails/` (replaces) |
| Carousel | `design/carousels/<deck>/content.json` (+ regenerated `index.html`) | `…/<deck>/versions/` | `design/carousels/shared/build.mjs <deck> [--slide N / --pdf]` -> `outputs/carousels/<deck>/` (replaces) |
| Photos, palette (design editors) | `assets/uploads/` (+ `cutouts/`), `palette.json` | (palette: undo only) | |

Design content written by the editor (all optional, the renders read them):
- thumbnails `content.json`: `text.<key>` (HTML), `images.<key>`, `vars` (`--ground`, `--fg`, `--accent`, `--gridc`, `--rule` for colours;
  any other CSS variable the direction uses), `nudge.<name>` = `{dx, dy, s, hide}`; dotted text keys (`chapters.3`, `books.0.title`)
  are paths into the file. A direction marks movable blocks with `data-move`, text with `data-k`, photos with `data-img`
  (`design/thumbnails/lib/bind.js`), and declares `--ground` / `--fg` / `--accent` on `.t` to get the colour controls.
- carousel `content.json`: text fields as before (markup `*accent*`, `_serif_`, `\n`), `slides[i].ground`, `slides[i].nudge.<name>`,
  `accent` + `accentOnInk`; a polaroid `img` is a file in `shared/assets/` or a path relative to the deck folder (uploads:
  `../../../assets/uploads/…`). Optional `slides[i].groundColor: "#RRGGBB"` (custom ground from the colour picker): `ground` then stays
  `ink` or `paper` for the text colours and `build.mjs` paints the slide that colour (hairlines and muted text follow the text colour).
  Slides without it build byte-identically to before.

## Making a new film
1. `projects/<slug>/film/film.json` (copy reading-stack's and change it). `scripts` are loaded in order; one must define `buildFilm()`.
2. Voice: edit her narration to `film/audio/voice_edit.flac`, word timings to `film/data/words.json`
   (`[{w, t, e}]`, seconds on the edited voice; the runtime adds `intro`), captions to `film/data/captions.srt` (video time).
3. Write scenes (below), then `node studio/tools/render.mjs meta <slug>` (cue list + a render check of every 0.2 s in 16:9 and 9:16)
   and `python3 studio/tools/stems.py <slug>` (or **Rebuild audio**).
4. Look at stills: `node studio/tools/render.mjs sheet <slug> --aspect 9x16` (one cell per scene) and `... stills <slug> 12.5,60 --aspect 16x9`.

## Writing scenes
Every frame is a pure function of time: no timers, no `Math.random` (use `hash(n)`).
```js
function buildScenes1() {
  const k = PS({ a: 'so this is my current reading stack', b: 'right now i have three books' });  // phrases she says, in order
  addScene(S(k.a), 'ink', '// 01 — the stack', (t) => {                // start a hair before the phrase; ground; HUD label
    KT(t, { lines: V(['So, this is my current'], ['So, this is', 'my current']), x: L, y: V(330, 640), size: V(110, 104), times: k.a.w.slice(0, 5) });
    mono('Agatha Christie', L + 6, V(900, 1300), 26);
  }, { id: 'stack', grid: true });                                       // id: stable, used by edits and export names
  sfx('hitS', k.a.w[5], -4);                                             // sound role, time (s), level offset (dB)
}
```
- `P('phrase')` finds her words after the previous match; `.t` start, `.e` end, `.w[i]` each word's start. `S(ph, lead)` = scene start.
- Grounds: `paper`, `ink`, `card`, `blue`. Two scenes that look the same at the join (same ground, or a ground switched to
  match the other: paper switched to dark = ink) join with a whip; a different look is a hard cut. Sound effect cues come from
  the design, so a join that changes from whip to cut keeps its cut sound 0.1 s late (inaudible in practice).
- `KT` kinetic text: `*accent*`, `~serif accent~` (hand underline), `_dim_`; one time per word (`times`), or `TM(ph, n)` to spread.
- Components: `sent` (centred sentence), `IDX` (numbered list), `browser`, `polaroid`/`polaroidIn`, `bookCard`, `meter`,
  `cursorAt`, `checkbox`, `typeText`, `handLine`, `strikeBar`, `marker`, `grid`. State: `beat(t, t0, t1, fn)`, `withA`, `withT`, `sn`.
- Motion tokens (`runtime/motion.js`, one global `MOTION`): `MOTION.ease(t, t0, d, 'outQuint')`, `MOTION.spring(t - t0, 0.8, 2)`
  (damping ratio, Hz), `MOTION.hold(words)`, `MOTION.grid(bpm, offset)` (beats from time, never accumulated), `MOTION.f(s)`.
  State what must be true for the audit: `MOTION.expect('row 3 lit', k.c3.w[1], { el: 'Anything philosophical' })`.
- Text helpers: `txt` (one line), `txtW` (wraps), `mono` (label; wraps in portrait). Use `_txt` / `mono(..., {raw: true})` for
  computed strings (timecodes, counters) so they are not editable.

### Light / dark tokens (every film's kit)
Each screen can be drawn in its designed mode or its alternative (the editor's ☀ Light / ☾ Dark). core.js recolours at draw time,
by role, so scene code needs no changes (plain `C.*` / `BL.*` values and literals are all mapped; `MC()` is a leftover no-op):
- Give each ground its designed mode: `G.<ground>.mode = 'light' | 'dark'` (no mode = a colour punchline without an alternative),
  optionally `altKey` = the ground it matches once switched (house: paper ↔ ink), for whips.
- Declare the kit's tables once: `themeMap(dir, role, [[from, to], ...])`, dir = the mode a screen is switched to (`'dark'`,
  `'light'`), role = `'ground'` (the screen's ground, filled once per frame), `'surface'` (cards, slabs, big blocks: fillRect over
  16 px both ways, `fillRR`, `circle` over 14 px) or `'mark'` (text, strokes, hairlines and bars of 16 px or less, small dots, other
  path fills), or `'both'`. Anything not listed keeps its colour; `drawImage` (photos, screenshots) is never touched.
- So an ink slab on paper becomes a lifted #2A2A30 slab while ink text becomes paper; a deep blue block stays #1B3FD8 while blue text
  lightens to #6E8CFF; a dark screen going light keeps its white cards (with a hairline, `THEME.edges[dir] = [{col, line}]`) and its ink
  objects (a phone, a video player) while its ground turns paper.
- Two automatic safety nets while a switched screen is drawn (core.js keeps a list of the surfaces drawn so far in the frame):
  a fill in the screen's own ground colour that sits on the ground (a full-frame wipe, a plate behind a label) is treated as ground;
  a text that read at 3:1 or more as designed but not after recolouring gets `THEME.text = [light, dark]`, whichever reads.
- `themeFixed(fn)` draws without recolouring: eye whites and pupils, photo prints (house `polaroid` / `imgCard`, Blink `bPolaroid`),
  flags. `THEME.role = 'surface'` around a fill forces a role (Blink: a record's body keeps its own colour). `groundLight()` tells a
  component whether the ground under it reads light right now.
- House (house.js): paper screen → dark: ground #111114, cards #1A1A1D (hairline 14 % paper), panels #232327, ink slabs #2A2A30, blue
  blocks stay; text ink → paper, mid → #8A8780, blue → #6E8CFF, muted text on slabs #A19D95. Ink screen → light: ground paper, ink
  objects #2A2A30, light slabs #D9D3C7, white cards stay (hairline 18 % ink); text paper → ink, inkMid → #67655F, blueT → blue.
  Blink (blink.js), light screens → dark: ground #0E1116, cards / bubbles / tables #1B1E25 (light hairline), searcher faces #262A33
  with near-white eye glyphs, the black stamp record → light #E9E9E6, text near-white, greys #A4A4A0 / #85868B, accent text green
  #22E08A / cobalt #7A95FF / purple #A58CF5 (record bodies keep their colour), the eyelid wipe light; flags get a light edge.
- Check: `render.mjs sheet <slug> --modes pair` (each screen as designed + its alternative) and `render.mjs contrast <slug>` (every text
  drawn at full opacity, in the colour really drawn, measured against the pixels under it; both modes, 16:9 + 9:16; 3:1 for text
  ≥ 24 px, 4.5:1 below; report in `film/build/contrast.json`). Sheets of both films: `projects/<slug>/film/stills/modes/review_{16x9,9x16}_NN-NN.jpg`.

### Layouts per aspect
- Scenes draw in a layout space: 1920×1080 (16:9) or 1080×1920 (portrait). `V(landscape, portrait)` picks a number, array or object.
  `W`, `H`, `CX` (centre), `L` (left margin: 110 / 80) and `PORTRAIT` follow the frame.
- Portrait is a recomposition: re-break lines (`lines: V([...], [...])`), stack columns, resize type. Keep content inside
  `SAFE.contentTop..SAFE.contentBottom` (370..1440): TikTok/Reels/Shorts UI covers ~250 px top and bottom, the HUD sits at 300,
  captions own 1460..1660. Edit mode shows these lines.
- Safety nets in portrait: `KT` shrinks a block that would leave the frame (`fitW` sets your own limit), `IDX` rows wrap onto
  two lines then shrink, `mono` wraps. They prevent overflow, they don't compose: still give each scene real portrait values.
- 4:5 (1080×1350) is the portrait layout scaled into the frame (`ASPECTS['4x5'].fit`), so it needs no extra work.
- Check with `render.mjs sheet <slug> --aspect 9x16 --at end` (also `--at mid` or `--at 3.5` seconds into each scene).
- The landscape film must not change by accident: `render.mjs hashes <slug> times.json out.json` gives pixel hashes to compare.
  reading-stack keeps its sample times and the current baseline in `film/build/hashes/` (`times.json`, `nohud_16x9.json`, `nohud_9x16.json`).
  `--hud` draws the removed corner HUD again, to compare with hashes taken before 2026-10-01.

### Edit ids
Every text and movable box registers `<sceneId>/<key>`; the key is its default text (or `key`/`id` you pass), `@name` for
boxes (`grp('name', x, y, w, h, fn)` makes any group movable). `edits.json`:
```json
{ "modes": { "video": "dark" },
  "t": { "stack/So, this is my current": { "s": "So, this is our current", "pos": { "9x16": { "dx": 0, "dy": 40 } } },
         "to-read/@to-read list": { "hide": true } },
  "captions": { "12": "corrected caption text" },
  "mix": { "voice": 0, "music": -6, "sfx": 3 } }
```
`modes` = light / dark per screen: `{"<sceneId>": "light" | "dark"}`, only screens that differ from their design (no key = every
screen as designed, pixel-identical to before: checked with `render.mjs hashes`). Exports from the editor send the current choice
with the job (like `mix`); from the command line the file's `modes` is used.
`mix` = her volume sliders in whole dB (−24 … +12, 0 = as mixed). The server stores it only when a level is moved (all three at 0 dB
= no key, so a project without it sounds exactly as before). Exports read it from the job (the editor sends the current levels) or,
from the command line, from this file; `render.mjs export|sound ... --voice-db -3 --music-db -6 --sfx-db 3` and
`composite.mjs export|sound ... --music-db -6` override it.
`s` and `hide` apply to every frame size; `pos` is per layout (`16x9`, `9x16`; 4:5 uses 9:16) and may also hold `k` (size of a
movable box such as a photo or card, `grp()`, scaled around its centre) and `hide: true` (hidden in that layout only).
Moments use the same format in `talking-head/edits/<id>.json`, plus `"capShort": {"<chunk>": "text"}` for a burned-in caption chunk
(`captions` there are the `.srt` lines). If you change a text or a scene
id in code, an edit made on the old one no longer applies (it stays in the file, harmlessly). Keep scene ids stable.

### Sound
- Cues come from the scenes: `sfx(role, t, db)`, `sfxType(t, chars, cps)` for typing. Section changes and blue punchlines get a
  `cut` automatically (`film.json` `cutSounds.punch`). `pruneCues()` thins busy patches (priority `SFX_PRI`, clear air `SFX_GAP` in core.js).
- `film.json` `audio.sfx.roles` maps each role to files (`library:<name>` = `library/sounds/<name>.mp3`, else `film/audio/sfx/`),
  `align: peak` puts the loudest moment of the file on the cue, `db` is the role level.
- `stems.py` measures, ducks (music ~12 dB under speech, fuller in pauses), masters to -14 LUFS and writes the stems with the master
  gain applied, so voice + music + SFX through the same limiter is the master. Exports: her levels (`mix`) multiply each stem first;
  whole film renormalised to -14 LUFS when music or SFX is off or a level is moved; clips pulled toward -14 (±6 dB, clips of 3 s or
  more), music fades in 0.6 s and out 0.9 s. With all levels at 0 dB the export audio is bit-identical to before the sliders existed
  (checked 2026-10-02: mixclip/footmix WAVs `cmp`-identical, and a reading-stack 10 s export's AAC packets and decoded PCM had the same MD5).
- "Sound only" files = `mixclip.py --track-voice/--track-music/--track-sfx` (film) or `footmix.py --tracks` (moments): each track × her
  level × master gain × the export's loudness gain, with the same fades, before the limiter. Their sum equals the pre-limiter mix
  (max difference 2.4e-7, 24-bit rounding); they are as long as the video (e.g. whole ghana-marrify film: 14 528 000 samples = 9080
  frames / 30). The mastered mix inside an exported video sits 3.0 ms (144 samples) later than these files and the stems, because
  the limiter (`alimiter`, attack 3 ms lookahead) is not latency-compensated: this was already so before, a tenth of a frame.

## QA tools (the lab loop: render, look, measure, fix)
Written 2026-10-11 from Florence's "Opus 5.5 Motion Lab", the Mortiflix harness and Marouane Gazouzi's harness
(`inspiration/know-how/WORKFLOW-UPGRADES.md`). They read the film in headless Chrome with the same runtime as the editor
and the exports, analyse frames in the page (no image sequences on disk) and write small reports. Brief / critic format:
`studio/PROMPTS.md`; the checks each hand-off reports: `CHECKS.md`.
```
node studio/tools/lab.mjs contact <slug> --from 32.3 --to 32.8 --every 1        # every Nth frame (default 12), frame numbers on cells
node studio/tools/lab.mjs onion   <slug> --from 10.0 --to 10.8 [--mode darken]  # one move, its frames laid over each other
node studio/tools/lab.mjs speed   <slug> --scene 3 [--el key]                   # picture change + per-element px/frame, flags
node studio/tools/lab.mjs audit   <slug> [--scene N | --from --to] [--aspect 9x16] [--lock]
node studio/tools/lab.mjs board   <slug>                                        # film/data/transitions.json + blank / flash flags
python3 studio/tools/soundqa.py   <slug> [--export outputs/video/<file>.mp4]
```
- **speed** flags: *dead stop* (an element stops from >= 35 % of its top speed in one frame: land soft), *linear move*
  (constant speed for 6+ frames: fine only for slow pushes, progress, loop phase), *short move* (> 60 px in under 0.3 s),
  *reading time* (text still for fewer than 8 frames before it moves again), *dead hold* (nothing changes for > 4 s).
  Element speeds come from the edit boxes (`txt`, `KT`, `grp`...), so drawings without a box only show in the energy line.
- **audit**: (1) every `MOTION.expect(label, t, {el | el + settled | state + value, tol})` the scenes register (element
  visible at alpha >= 0.5 from that frame; stopped moving by that frame; `MOTION.state()` reported from that frame); (2) every
  sound cue against where the picture starts changing (+-4 frames; cut / whip frames are ignored unless the cue sits on the
  cut; a change that builds over > 4 frames is "soft visual"); (3) the motion flags above. Whole 5-minute film: ~20 s.
  Sound-sync flags are leads: look at `contact --every 1` around the frame before moving a cue.
- **board**: one entry per cut with its kind, frame and the word it lands on; you write `carrier` and `why` (kept on re-runs).
  Flags a cut whose frames +1..+5 show under 30 % of the settled shot's detail (empty ground) or a white flash.
- **soundqa**: per cue in the sound-effects stem: onset, first peak (first time it reaches half its max), loudest peak, against
  the cue and the frame+1 target; K-weighted first 60 ms against voice + music and against music alone; voice over music
  while she speaks; 200 Hz-6 kHz loudness against full band, energy under 60 / 200 Hz; DC; the whole-film master WAV
  (mixclip.py) -> AAC 256k -> true peak; with `--export`, the real file's loudness, true peak and audio offset.

### Adaptive motion blur (opt-in, off for every existing film)
`film.json` `"motionBlur": true` (or `{ "shutter": 180, "px": 5, "max": 64, "min": 1 }`), or `render.mjs export ... --blur`
(`--no-blur` forces it off). Per frame (`runtime/film.html`): the shutter (180 deg, centred on the frame) is clamped inside
the current scene, so nothing blurs across a cut; the biggest move of any text / box in that interval sets the number of
subframes (one per 5 px, max 64); subframes are averaged in linear light. A frame where nothing moves is the plain frame,
byte for byte. Video exports only (PNG frames stay sharp); the editor preview is unblurred. Costs time only on fast frames.

## Known limitations
- The film and moment editors have no photo picker or colour controls, so uploads and the palette are only in the thumbnail and
  carousel editors. Uploads are per project (not shared across projects).
- Cut-outs are only as good as Vision: a chair right behind her or loose hair can keep a grey fringe (try **Person only**); a book
  shot flat on its own works with the object mask. Restoring a saved version whose photo was moved to the Bin shows a missing photo.
- Undo / redo lives in the open page (one history per design); after a reload, use Versions. Removing a swatch has no version
  (palette.json is not versioned), only undo.
- Cursor paths are absolute: if you drag a browser window, the cursor still clicks where the window used to be.
- Editing a text in one frame size keeps your line breaks in the other; the portrait safety net shrinks it if it doesn't fit.
- Long single words cannot wrap in portrait (they shrink).
- Light / dark: the surface / mark split is a size rule (16 px), so an unusual drawing (a thick ink rule, a big icon drawn as a path)
  can get the other role's colour; screens whose design already has low contrast keep it in the alternative (contrast report:
  `film/build/contrast.json`). Moments (talking-head) have no light / dark switch. Sound effect timing is the design's.
- Film preview audio is the m4a stems; scrubbing is silent, playback follows the voice track (even when Voice is off).
- Volume in the preview is the raw gain: the preview does not renormalise, so turning music up also makes the preview louder
  overall (the export keeps −14 LUFS), and +12 dB on a loud part can clip in the preview only (exports go through the limiter).
  The sliders start working with the first click or key press on the page (browsers keep Web Audio silent until then; before
  that, playback is at 0 dB with the on/off toggles working).
- "Download all three" downloads three files: Chrome may ask once to allow multiple downloads. WAVs are large
  (about 17 MB per minute per track: a 16-minute film is ~280 MB per track).
- Only photos and cards (`grp` boxes) can be resized in the film and moments; text keeps its designed size there (in the designs, anything can).
- Layouts: film scenes inside a moment are not editable there (edit them in the film editor; the moment shows the change).
  Her matte is Vision's: loose hair and a hand moving fast can be soft at the edge; a chair touching her can stay attached.
  The L11 circle size and corner and the L6 framing are script options, not editor handles. `TH.highlight` does not mark serif-accent words.
- Moment preview footage is a 720p proxy, so a 9:16 punch-in looks softer in the preview than in the 4K export. A moment's camera
  (punch-ins, framing) is code (`CAM()` in the moment script), not editable in the browser.
- Moment and design exports replace the file of the same name in `outputs/` (film exports never overwrite). Restore a version and export again to go back.
- A carousel or thumbnail export with "All" downloads several files: Chrome asks once to allow multiple downloads.
- Editing a caption chunk in a moment changes the burned-in captions, not the `.srt` (the `.srt` lines come from her words).
- One render at a time; a whole 16-minute film takes a few minutes and ~1.3 GB per aspect.
- "Download this part" captures a rectangle: on a see-through download of a rotated element the corners around it are transparent,
  but with "Keep the background behind it" they show the ground. Things painted on top of the part are only left out in the first
  two modes ("Everything behind it" is the export as it is). Effects that come from outside the part (a dim layer or a person
  cut-out lying over it) are not in a see-through download. A part with the same name again replaces the earlier PNG in `parts/`.

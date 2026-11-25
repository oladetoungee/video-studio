# phone-distraction FILM agent: hand-off (keep current)

## State (2026-10-13 ~12:00)
- **Motion film: done + exported** (16:9 and 9:16, `outputs/video/`, copies in `~/Downloads/phone-distraction-film/`).
  Critics: red-badge section 8.0 (pass, 3 rounds); whole film 6 -> 7 -> 7.5 (3 rounds, max). Open (taste): screen-template mix.
- **Talking-head full edit + 7 shorts: authored, NOT exported** (disk ~5 GB < 8 GB rule). Export from the moment editor
  (http://localhost:7700/moment/phone-distraction/full/ and /s01/ .. /s07/) or `node studio/tools/composite.mjs export
  projects/phone-distraction/talking-head/talking-head.json all --aspect both` once 8 GB are free.


## REBUILD IN PROGRESS (2026-10-17): look B · The Receipt (her pick)
- Old Lock-screen scenes archived in `film/archive/lockscreen-v1/` (kit, parts, s1-s4, film.json, edits.json).
- New kit: `scenes/kit.js` (palette, grounds blue/blueB/slip/gray, rich text with soft marker, stack, receipt, clip, prt halftone
  prints with auto credits `cr`, slip, stamp, phone UI, addR wrapper), `scenes/parts.js` (featureTitle, punch, barcode, uiReels).
- Halftone prints: `assets/receipt/` built by `assets/directions-v2/build_receipt.py` (sources in assets/directions-v2/cut|raw,
  licences in raw/_licences.json). New sound roles in film.json: print, bell, tear, paper, stamp.
- Status (2026-10-17 ~20:30): ALL 81 screens rebuilt (s1 21, s2 19, s3 20, s4 20 + end card); film builds (meta: 81 scenes, 293 cues).
  Critic scores: pass 1 (1-21) 5 -> 5.5 (fixes applied after, not re-scored); pass 2 (22-40) 6.5 (fixes applied, not re-scored);
  passes 3 (41-60) and 4 (61-81): critics were launched, results not yet read.
- NEXT (successor): re-run critics per pass until >= 8; then tools/qa_loop.sh (cue sync, quiet-cue drops, dead-hold push-ins,
  re-mix stems, -14 LUFS / TP <= -1); then talking-head insert check (composite.mjs stills ... full --at ...); then exports
  (film 16:9 + 9:16, TH full both, 16 shorts, teaser 16x9,1x1,4x5) one at a time, hard-linked into ~/Downloads/phone-distraction/...
- Pass 4 critic (61-81): 5/10. Main asks: one hand+phone print on at most 4 of 21 screens (new subjects for 71 notification stack,
  72 emptied home screen, 77 people at a design desk, 79 tug of war); credits on photos fixed to 26 px clear of images; 63 delete
  dialog large and central; 73 something every 3 s, stamp <= 796 s, 9:16 strip inside 60 px; 75 asset: >= 3.5 s, a visible tear in
  two pieces over >= 0.6 s, "an asset." >= 200 px centred, no grey highlight; 69 9:16 label/credit clash; 76 receipt from a slot,
  chips >= 500 px; 78 credit off the photo; 64 one-line credit; 80 the four lines print on a receipt; 81 end on the torn receipt.
- Pass 3 critic (41-60): 6/10. Main asks: break the "text top-left + hand on the right" layout on >= 6 of 20 screens (big clipping,
  receipt as hero, paper full-bleed, crowd/desk photo), no cut-out on > 2 screens per pass; 44 hard blue->red swap on "changed" + a
  credited clipping by 464 s; 48 week receipts by ~496 s; 57/58 clippings ~1100 px wide centred y 300-850, marked phrase >= 30 px;
  41 phone settings text >= 32 px; 43 first notification by 452 s, no half-covered page text; 59 not the same TikTok clip a 3rd time;
  drop the FEATURE 0n eyebrows (banned) or make them receipt lines; 9:16 collisions on 44, 53, 60, 54.
- Coordinator APPROVED (2026-10-17): re-skin talking-head/moments/common.js grounds, plates, outlines, rings to blue #1F3BD6 / paper
  #FBF8EE / ink #15161A / soft marker #F1E9A6 and talking-head.json "pad" -> #1F3BD6. Do NOT touch kw 'stack', kwCol '#F7EED2', cap16
  (three-part only for teasers), the "new video" tag (off) or add any handle. Check cream keywords/captions >= 3:1 on blue cards; on
  paper they step aside or switch to ink. Then stills for full, a short and the teaser in 16:9 + 9:16 before exporting.
- Sheets of the current state: stills/receipt-passes/all_{16x9,9x16}_{mid,end}.jpg
- Passes: contact sheets in `stills/receipt-passes/`; critic scores logged at the bottom of this file as they come in.

### Visual critic loop (2026-10-17 evening, successor agent): progress
- Screen numbers = contact-sheet order (`render.mjs sheet --from/--to`): passes 1-21, 22-40, 41-60, 61-81 (81 = end card).
- New halftone prints (build_receipt.py now takes names to build only those; `gamma` lifts/darkens a photo): ht_register,
  ht_newspaper, ht_bandit, ht_gadgets, ht_metro, ht_woman, ht_floor, ht_reader, ht_remote, ht_servers, ht_gavel (in film.json;
  licences in raw/_licences.json, new Commons downloads: remote, servers, gavel2, openbook, berlaymont; ht_eu / ht_openbook /
  ht_manphone / ht_late / ht_heap built but too weak, unused).
- Kit: featureTitle has no "FEATURE 0n" eyebrow; receipt small rows 0.9 of fs. Hand-and-phone prints now on ~1, 4 (plan), 10,
  28, 42 (close-up), 51, 69 only.
- Pass 1 (1-21): r1 6, r2 6, r3 6 (3 rounds done). Then applied: 20 server print + stamp on receipt, 13 bigger barcode,
  21 bigger desk phone + card + headline at y 700, 11 bigger receipt, 9 price tag hero. Left (critic r3): 17/18 have no photo,
  12 metro still busy, 5 mid frame empty on the left.
- Pass 2 (22-40): r1 6, r2 6; r3 critic running at hand-off (sheets scratch r3p2). Applied after r2: 24 photo under the
  clipping, 34 servers, 35 ink button, 36 cues 2x, 39 no TV (decision card hero), 40 remote print + stamp on receipt.
- Pass 3 (41-60): r1 6; r2 critic running (sheets r2p3). Applied after r1: 47 receipt (unread / unfinished struck) + badge,
  49 slips below the reader, 50 bigger hearts, 53/54 9:16 collisions, 55 bigger release, 59 gavel print, 60 bigger tag.
- Pass 4 (61-81): rebuilt (no hand except 69): 61 receipt hero + stamp, 62 paper photo grid, 63 big delete card ("REMOVED"),
  64/65/68 receipt heroes, 66 settings card + ALL OFF, 67 her post card, 71 notification slips struck, 72 paper home screen,
  74 answer cards, 75 TEAR in two pieces (0.12 s strain + 0.75 s apart, stub stays, screen now runs to "pays" >= 3.5 s, line
  "Your phone is designed to hold it."), 76 bigger chips, receipt from a slot, 77 giant clock callback, 78 desk phone drops in,
  79 tug of war (three company tags pull the stub), 80 the four lines print on a receipt, 81 end card ends on the struck stub +
  TAKEN BACK stamp. r1 critic running (sheets r1p4).
- Critic results that came in at hand-off (not yet acted on):
  - Pass 2 r3: 6.5. Last marked word not landed 0.3 s before the cut on 30 ("down.") and 32 ("point."): land >= 8 frames before
    the end; 31/33/34 halftones read as noise (use nameable subjects >= 35 % frame height); empty areas 38 bottom-left, 39 bottom
    45 % (card too small), 32 bottom-left, 9:16 30/32/39; 40 CONTINUING stamp covers EFFORT, remote overlaps the receipt (24 px
    clear), receipt mono 36 px; 36 Season card on the TV, marker gaps; 31 back on blue (paper ground only for 37); 29 move the
    "addictive gesture" line by the quote; 23 9:16 lost its print.
  - Pass 3 r2: 6. 57 release clipping >= 1000 px wide, marked line >= 40 px; 55/58 crop to headline + marked sentence (marker
    >= 36 px), 55 headline under the clipping edge; 48 citation >= 30 px, receipts 1.4x; 50 one big heart instead of the card
    row; 43 bigger text + fill; 42/51/53/54 phone prints: swap 51 or 54; 54 receipt/body collision, CONTESTED stamp opacity
    >= 0.8; 44 tear over the headline; 46 badge numbers >= 32 px; 60 enlarge stars + receipt; 56/60 9:16 icons above y 1400.
  - Pass 4 r1: 6. 75 tear: receipt 35-40 % width, both halves in frame, >= 60 px jagged gap, >= 80 px from the headline, 9:16
    top half in view; 81 stub 2x and fill the lower third (NOT with @WithGbemi: banned by the coordinator); 62 9:16 text into
    the grid; mid emptiness 64/68/71/72/74 (land objects within 0.5 s), 74 label >= 32 px; 77 clock in the heavy weight, +2 HOURS
    >= 32 px, fill bottom-left; 9:16 overlaps 66 (card vs line), 70 (receipt vs TV legs), 72 (badge vs card edge), 69 credit vs
    headline; 79 tag labels >= 30 px; 63 add an icon / strike; 65 bottom-right empty.
- NEXT: act on the critic results above (or re-run: brief in the agent report), fix, re-score passes 2-4 to >= 8 or 3 rounds.
  Sound cues were only moved where visuals moved (30 pulls, 47, 59, 75, 76, 81); qa_loop still needed later.

### Sound + talking-head re-skin (2026-10-17 night, sound/TH agent; film visuals NOT touched, nothing exported)
- Sound: film.json roles levelled for the receipt cues (were 3-25 dB under the voice and ~200 ms late: align "start" on files
  whose hit is 0.2-0.3 s in): paper +13 dB align peak, print +10 peak, stamp +7 peak, bell +8, tear +7, refresh +6.
  tools/nudges.py: DROP_DB (quiet-cue threshold, default 3; used 0), THIN=1 (2nd cue of a role within 0.8 s dropped),
  HOLDS=0 (no new push-ins while the pictures are under review). Run: `HOLDS=0 DROP_DB=0 bash tools/qa_loop.sh`
  (DROP_DB=3 cut 291 cues to 143 and left minutes with 4 roles: too thin).
- Result (2 loop passes): 217 sounding cues (was 291): print 68, paper 37, mark 20, tick 17, pop 17, stamp 14, shutter 10,
  bell 8, tear 5, hit 5, notify 5, refresh 4, cash 3, clock 2, error 1, tape 1, swipe 1; whoosh-type 1 of 217, none in a row.
  57 cue nudges + 82 drops in scenes/nudges.js (generated table; HOLDS empty). Stems -14.0 LUFS, TP -3.7 dBTP (wav);
  soundqa AAC -14.4 LUFS, TP -1.4 dBTP (AAC lift 2.2 dB: re-measure after any level change, it went to +0.3 once at
  higher levels); hits over bed median 5.9 dB (65 still < 3 dB but > 0); lab audit cuesOff 1; voice over music 14.1 dB.
  Minutes 11 and 12 have 4 distinct roles (rule: 5).
- Talking-head look: moments/common.js -> Receipt palette (G.rcBlue ground, G.rcSlip paper punch card with ink type, PLATE.rc
  paper chips, paper outline + ring, marker accent on blue; PDX keys kept for teaser.js, remapped: ink=blue, card=slot blue,
  text=white, muted=sky, red=marker); talking-head.json "pad" #1F3BD6; shorts endCard ground #1F3BD6, handle " " (no
  @WithGbemi). teaser.js: no "@WithGbemi" (countdown notification from "YouTube", end card "New video" + "Full video on
  YouTube", handle line removed, end card moved down), whip / flash panels paper. shorts/s05.js: the "every app uses a red
  badge" half moved to the top (its caption sat on the film's paper "grab" screen, < 3:1).
- Stills checked (scratchpad): full 13 times x 16:9 + 9:16, s01, s05, teaser 16:9 / 1:1 / 9:16. Open: keyword stack runs off
  the right edge in 9:16 when her face is central (s01 ~33.5 s "attention", s05 ~9 s "interruption", ~27.5 s "grab your"):
  engine (layouts.js keywordStack, avail floor 260 px); shorts end card thumbnail is still the old Lock-screen thumbnail
  (outputs/thumbnails/archive-v1/01-1-40-am.png); film screens in some cutaways are near-empty at their start (600, 851 s).

## How the film is built
- Voice: `tools/edit_voice.py` (manual cuts with DTW times) -> `audio/voice_edit.flac`, `data/cutlist.json`.
- Words: `whisper-cli ... -dtw small.en -nfa` (flash attention OFF, else DTW returns -1) + a `-ml 1` pass for stretches DTW
  loses (`tools/words.py`, fixes in `tools/fixes.py`).
- Scenes: `scenes/kit.js` (look A kit, `addL` wrapper: pull-to-refresh, badge burst, slow push, cut-on-content, hold push-ins),
  `scenes/parts.js` (layout, headlines with word / drop / type entrances, widgets), `scenes/s1..s4.js`, `scenes/film.js`.
- Measured fixes: `tools/qa_loop.sh` = meta -> stems -> soundqa -> lab audit -> `tools/nudges.py` (cue sync from the audit,
  quiet cues dropped, push-ins on dead holds -> `scenes/nudges.js`), twice, then board. Run it after any scene change.
- Inter Tight is loaded by the film itself (FontFace in kit.js, READY held until loaded); engine request re-sent in
  `projects/ENGINE-REQUESTS.md`.

## Talking-head / shorts
- `talking-head/tools/gen_full.py` -> `moments/full.js`; `talking-head/tools/gen_shorts.py` -> `shorts/sNN.js`
  (re-run after editing PICK / labels). Manifest `talking-head/talking-head.json` (film retake cuts copied into the full
  moment's "cuts"; shorts in/out snapped to her words). Look: `talking-head/moments/common.js`.

# dark-patterns FILM agent: progress notes (resume from here)
Brief: projects/BUILD-BRIEF-2026-11.md. Her pick: C "Blown up" + B's honest-vs-winning split (film/stills/directions/README.md).
Order: full talking-head edit -> shorts -> teaser -> motion film. Post before 11 Nov 2026.

## Built (2026-11-02, evening)
- Words: `data/raw_words.json` = whisper tokens (t_dtw) with the kit's caption fixes (`tools/words.py`; original in raw_words.whisper.json).
- Sources: `film/assets/src/` (real page crops + Pexels; `tools/clips2.py` writes `clips.js` = CLIPS). New captures: FTC Amazon
  (17 Sep 2026), UCPD Annex I point 7, CRD Art 22, CMS on the DFA (11 Nov 2026 draft). Pexels via `tools/pexels.py`.
- Fonts: Geist + DM Serif Display copied to library/fonts; registered by `moments/common.js` (FontFace) because
  studio/runtime/fonts.css lacks them (ENGINE-REQUESTS).
- Manifest `talking-head.json`: full (0-459.8, cuts = CLEANUP restart + kit Q1 ending), sh01-sh14 (kit ranges, 4:5 window,
  `dpStyle` = per-short top-title + caption style, endCard false: no outro clip from her yet), teaser (13 bites + 3 gaps).
- `moments/common.js` = the look (DP.* graphics: popup+lens, word cards with [block] markup, page clippings with pink marker
  + lens, cart, price, cancel pages, photo, trial, checkbox, search, nag prompt, timer, stock, vs split, stat, eleven tags,
  correction card, full insert, black phrase card) + per-short label/caption styles (TH.over).
- `moments/plan.js` = DP_SENT (112 phrases) + DP_RAW guard + DP_PLAN(mode): full edit ~100 segments; shorts reuse it.
- `teaser/teaser.js` trailer (3 cards, drop on "we could be sued for this").

## Known engine issue
- `composite.mjs stills ... --captions` (and some stills times) draw the pad colour where her boxed picture should be; exports
  are right. Review from export frames, not stills with --captions. (Logged in projects/ENGINE-REQUESTS.md.)

## Next
- Review export of full 16:9 -> contact sheet -> fixes -> critic -> 9:16 -> shorts review -> teaser review -> film.

## 2026-11-02 late
- Shared look moved to `film/scenes/dp.js` (moments + film load it). Push-transform bug fixed (graphics drifted right in splits).
- Review exports live in `outputs/_review/` (full 16:9 + shorts/): bin after the checks.
- Critic round 1 (full 16:9): 6.5. Fixes applied: caption centre on full inserts, [bracket] leak, cart/148 moved to ots/presenter,
  graphics land with their layout, lenses on GDPR/CRD/DFA, bigger mono labels, timer split at refresh, why/how-common behind
  words higher, keywords in long talks, phrase-card line breaks, no collapse at the end. Not done: end card (YouTube end screen).
- Outro: NOT wired (the ux-research clips are video-specific; copies moved to ~/.Trash/dp-outro-copies). Shorts end on her last word (endCard false, tail 0.5), teaser on its own end card, until she records outro clips for this video.
- Film: film/film.json, scenes/kit.js + film.js (92 scenes from DP_SENT), tools/voice.py (voice = full edit's cut). Meta builds.

## 2026-11-06
- Amazon correction = engine pause `fix-amazon` (manifest `pauses`, 9 s, short text); stop-gap card removed. Shorts sh03/sh13
  opt out (`"pauses": false`) and show a top-panel "Correction" card while she keeps talking (she stays on camera).
- Critic r2: full 7.0, shorts 6.0, teaser 4.5, film 6.5. Applied: B panes land with A, nag count off in windows, serif caption
  stroke thicker, sh13 own style (mix + outline), teaser trimmed to 92.7 s (bite 11 starts on "and they found out"), teaser end
  card bigger, film 9:16 quotes 1.3x, film correction shorter. Teaser captions = her three-part style (her rule: teasers only).
- Film sound: nudges from the lab audit (scenes/nudges.js), quiet roles raised; -14.2 LUFS stems.

## 2026-11-07 FINAL
- Re-type to set 03 done everywhere (see STATUS.md). Film dropped. Pause fix-amazon in the full edit. Design re-typed, her photos in. Ready for her to export from the studio.

## 2026-11-07 evening: "show, don't type" pass — DONE
Files: moments/visuals.js (NEW, manifest "common" after common.js: DP.pic photo + push, DP.badge, DP.maze roach motel dot, DP.flow coins
user -> shop, DP.crowd people with "?", DP.dots 399-shop grid, DP.ring 67 %, DP.cal calendar page; DP.tag specimen tags off in the edit),
moments/plan.js (old copy: build/plan.before.js), teaser/teaser.js (old: build/teaser.before.js).
Gone: phrase cards that re-typed her (kept only "Dark pattern." / "Intentional." / "Sued." one-word punches), keywords repeating her
sentence (pattern names kept), word cards (definition, business, easy in/hard out, free trial, opposite, part of the page, deadline,
tricked, better/worse, chasing, not published yet, this is wrong), TH.page title cards (hidden costs, selling out, UCPD, developer?),
titles/kickers above every screenshot (the page shows them), the 11-name list at 0:28 and 2:29 (names not explained yet), the 01/11 tags.
New: photos (shopping online, roach, card, half-empty shelves, A/B team, team at table, EU flag, developer), maze, coins, crowd, dots
(148 and 70 of 399), ring 67 %, calendar 11 Nov 2026; ground dpInk on screenshots, stats and the new graphics (half the inserts).
Shorts: s59-60 now the real countdown (DP.timer) instead of a word card. Photos: film/assets/CREDITS.md.
Captions: tools/words.py now also fixes sentence-start capitals (Confirmshaming, Fake urgency), "and you're", "selling out, when".
Cuts: CLEANUP cuts 1 (restart "Depending on where you live,") and the kit ending cut [451.45, 457.79] checked on word times: clean.
Text count: python3 build/textcount.py 7.63 build/plan.before.js moments/plan.js -> 726 -> ~220 words (95 -> 29 per min).
Known, left: trial card "NOW YOU PAY" touches its day labels at 2:24 (old, small); captions over her chin in some shorts (old position).
## 2026-11-07 late (coordinator review): big screenshots, no thick lines — DONE
- DP.big (visuals.js): real page crops on ink at ~78-90 % of the frame, centred, slow push, pink highlight; dense strips crop round
  the highlighted words. Brignull, Confirmshaming, Nagging, Fake urgency, EC 399/148, EC 42, GDPR 32, FTC Amazon x2 now full inserts.
  Dropped (unreadable at any fitting size): UCPD Annex I, CRD Art 22, CMS DFA (her on camera); FTC 76 % is a ring now.
- Roach motel = a filled block (no outline); trail and rings 2 px. Cancel graphic: "1 click" and "page N" removed (film/scenes/dp.js).
- 16:9 captions: CAP16 weight 500, colour #F6F1EA (visuals.js). Amazon insert starts on the phrase (no empty panel).

## 2026-11-10 rollout (formats + covers)
- moments/formats.js (NEW, manifest "common" last): DP.fmtInstall (called from DP_PLAN short) routes graphics + her talking per "fmt"
  (A B C D F G H I J K M, ported from http-status-codes FD_PLAN/common.js in type set 03 + pink/ink); its own captions (DP.capFmt), titles
  (DP.titleFmt: D flash, F small, G big, K mono tag, M white box; B/C/J poster via DP.poster / DP.jRoom) and the cover (DP.coverDraw).
  Shorts with "fmt" skip the old dpStyle look (common.js guard). Labels now use "|" for the second line.
- plan.js: FX = DP.fmtInstall(...) + restore; sh03 fallback for the cancel pages (s18 without s18b).
- tools/covers.py (copied from http): `python3 tools/covers.py [shNN]`, `--candidates shNN 6`. Stills in assets/covers/, images cover_<id>(_cut).
- Mattes made for sh06 (J) + sh09 (C).

## 2026-11-12 late: font-board pass (her rule "Only use fonts from our boards")
- moments/looks.js v4: per short LOOK.fontIds / colours (font board ids, inspiration/boards/fonts/board.json); fonts loaded per piece (LK_FAM),
  Archivo width instances in talking-head/assets/fonts/ (Archivo-w70 = design-33, Archivo-w62 = pair-02). Teaser block at the end of looks.js
  (pair-02 + combo-06; "Helvetica Neue" is registered as Archivo in the teaser only, because the studio draws 16:9 captions by that name).
- lkFit / coverStack keep her Shift+Enter lines (only shrink), as cheapest-countries v4.
- Cover frames re-rendered in the new look (assets/covers/sh02/04/06/10/12-frame.jpg; old ones in build/covers-before-fontboard/).
- Backups: build/looks.before-fontboard.js, talking-head.before-fontboard.json, teaser.before-fontboard.js, refined-kit.before-fontboard.md.
- Font audit (every family drawn is a loaded board face): scratch tool, see STATUS.

## 2026-11-17 weakest pass (shorts) — DONE
- plan.js s100b 'late' builders-s (SHORT && first === 's100a', enter 0.01). formats.js pass() + enter. dp.js DP.price x gap V(80, 56).
- sh05 trial-early test reverted (shorts/sh05.js back to its old copy). Backups archive/weakest-2026-11-16/. Sheets outputs/_review/sh14- / sh04-before-after-2026-11-16.jpg.

## 2026-11-20: caption accuracy pass — DONE (see STATUS.md)
- tools/words.py: last block "2026-11-20" (phrase fixes, "user." retimed, the move-onto-voice step for words starting in a trimmed pause; never across teaser bite gaps). Run footedl BEFORE words.py.
- talking-head.json: 58 edges moved into silence (whisper t_dtw sits ~0.1 s late in this recording, so edges set from word times landed on word onsets). Tool used: scratch snap.py (quiet run < -45 dB on voice16k.wav, nearest boundary).
- Files: build/captioncheck-2026-11-20/ (CHANGES.txt, caption-diff-before/after.txt, raw-diff-before.txt, doubtful-clips.txt, edges-after.txt, sh03-sh13-endcard-check.jpg).

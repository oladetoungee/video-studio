# working-full-time: FILM agent hand-off (talking-head, shorts, teaser, film). Resume from here.
Agent: FILM (2026-11-02 evening), brief `projects/BUILD-BRIEF-2026-11.md`. Her pick: B Clock in / clock out + A's 24-hour dial.

## Done so far
- Directions: the 5 open round-2 B fixes applied in `film/stills/directions/B-timecard/index.html` (push-in x1.12, card times
  38 px, OUT ??:?? in the FRI out cell, FRI OUT 17:00 stamped red on "clock out", b6 correction with the TalTech 45 ECTS crop and
  40 px body); stills b1 b4 b6 p1 re-rendered.
- Study leave re-checked on the CURRENT Riigi Teataja text (Täiskasvanute koolituse seadus, version in force since 1 Apr 2025,
  RT I 30.01.2025, 1; via the public API `/public-api/api/v1/akt/130012025002/xml`): § 13 (1) up to 30 calendar days a year,
  (3) average pay for 20 calendar days, (4) 15 more days to finish formal studies at the minimum-wage rate, (6) 14 calendar days'
  notice. Same numbers as before. Crops of the current Estonian text: `talking-head/assets/src/rt13-*.png`. The old English
  (2019-2025) crops were moved to the Bin (`~/.Trash/wftd-old-rt/`).
- New real-page crops: TalTech "45 ECTS by the end of each academic year" (`tt-45`) and "TRP will be canceled" (`tt-cancel`).
- Talking-head set up: `talking-head/talking-head.json` (full + sh01-sh10), words `data/raw_words.json` (t_dtw, fixes in
  `tools/words.py`; the kept "block" moved after CLEANUP cut 3), face track, EDL (full 9:35).
- Look in the studio: `moments/common.js` (WF.* helpers: time card, real clipping, type, stat, list, week calendar, 24-hour
  dial, weeks bars, course outline, degree, polaroid photo, correction screen, tip stub, clock-out scene; captions C1 and the
  manila top title by wrapping TH.post). Plan: `moments/plan.js` (shared by full + shorts).
- Pexels photos `assets/px/` (credits in `film/assets/CREDITS.md`).

## Decisions taken (tell her; each is one line to undo)
- Cut "This month makes it a year … full-time" (raw 12.0-16.55): kit Q2 recommendation (the line dates the video). Undo: remove
  `[12.0, 16.55]` from the full moment's `cuts`.
- Kept the "I like to add full-time" cut (CLEANUP default) and the loose sleep sentence (kit Q5 not applied).
- The 45 ECTS slip ("at any university") is fixed with a manila correction screen over her next sentence (WF.fix). A true
  pause (her picture frozen while the card types on) needs an engine feature: request in `projects/ENGINE-REQUESTS.md`.
- Unclear words are captioned as whisper heard them (kit Q4 list): "real ghetto", "strap privileges", "coffee days",
  "four-year-old", "take a lot of my blood", "don't fear". She can correct each caption in the editor.
- No outro clip yet (her "FULL VIDEO ON YOUTUBE" clips are per video): shorts end on her last word (`endCard: false`).

## Next
full edit stills + checks + critic -> shorts stills + checks -> teaser -> film (film/film.json + scenes in the same look).

## State at end of session (2026-11-02 night)
- Built: full, sh01-sh10, teaser (talking-head.json), film (film/film.json, scenes/wfkit.js shared kit, wfsent.js sentences, film.js).
- Critic round 1: film 16:9 5, 9:16 4, full 6, shorts 5. Applied: phrase-end chunking + no filler/lone last words in film type, list centring, bigger calendar labels, no duplicate tip stamp, Bebas-only sub-lines and keywords (F.body), first item never later than segment start + 0.35 s (WF.lead), caption side margins 96 px, manila title with a dark rule, tip openings trimmed in shorts, one-line law crop, label bottom computed (graphics no longer pushed down), stat spacing, keywords in long talk stretches.
- Still open from the critic (next round): 9:16 calendar stretched (show 3 days), shorts panel graphics small (aim 900 px wide), screenshots cropped to one line at 44 px+ in 9:16, headline = caption duplicates (hide caption), off-frame dial tops in 9:16 film, film sound cues sparse (59 in 9:36), no cold-open graphic in shorts.
- Tool note: `composite.mjs stills` leaves her boxed picture empty (tile/split/4:5 window); exports are correct (checked sh02, a 16:9 tile range, the teaser). Review renders were moved to ~/.Trash/wftd-review-exports/.

## 2026-11-07 (her type change + lean work)
- Re-typed to set 02 Bold condensed in the shared kit `film/scenes/wfkit.js` (Anton caps, Inter Tight from library/fonts via
  FontFace, DM Mono labels); stamps have no frames, the clock no rim; captions + keywords in Inter Tight / Anton, solid fill +
  soft shadow (no outline); the shorts' manila title has no dark rule. Time-card idea kept.
- 45 ECTS slip: now the engine pause (talking-head.json "pauses" fix-45, 4.5 s after raw 66.55); the old WF.fix card is gone,
  the TalTech crop sits in a tile over her next sentence. Chapters on the full edit move +4.5 s after 1:00.
- Standalone film dropped (her rule): film/ keeps the shared kit only; no film renders or critiques.
- Thumbnails + carousels (design/, now ours): fonts remapped in thumbnails/lib/wf.css and carousels/shared/base.css (old family
  names -> Anton / Inter Tight / DM Mono with size-adjust), borders thinned to <= 1-2 px, stamp frames / sticker outlines removed,
  her new photos (library/her-photos) as cut-outs and full-frame person layers (assets/scene/photo-*), placed with --ph-x;
  carousel photos replaced; the law crop is the current Estonian text (in force since 1 Apr 2025).
- ux-research outro clips are NOT generic (they show the UX RESEARCH video): unwired; shorts/teaser need her own outro clips.
- 2026-11-07 end: critic scores (one per piece, after fixes where noted): full edit 5 -> fixes (no shadows/punch holes/ghost text, flat dial wedges, brighter caption red), shorts 6, teaser 6 (fixed after: boxless topic + cards, bigger end card, one-line crops, dial labels), thumbnails set 6 (best 02, 05 at 7.5), carousels 7. Coordinator: no more critic rounds. Review renders moved to ~/.Trash/wftd-review-exports3/.

## 2026-11-07 evening: "show, don't type" pass — DONE
Files: moments/plan.js (old: build/plan.before.js), teaser/teaser.js (old: build/teaser.before.js), tools/words.py (+ caption joins).
Gone: WF.type cards (rules question, my goal, a job, November, weekly review, advantages, two big things), WF.list (in this video,
December, write to, first into the calendar -> week blocks, release/exam -> week blocks, what each course asks -> week blocks),
stacks/pops (how many, morning/afternoon, thesis/placement/internship, work/school deadlines), phrase cards (school does not know,
don't underestimate, free time, listen, vacation alone, health -> "Your health."), all filler keywords (one kept: "weekly review"),
the Electives page, the s16 outline tile (the s19-20 outline stays: one document per video), kickers/titles on weeks and crops,
photo captions and stamps that re-typed her (meal prep, save your life, good deal, still on top of things).
Text count: python3 build/textcount.py 9.66 build/plan.before.js moments/plan.js (698 -> 251; time-card numbers count as words).
Cuts: the 7 manifest cuts checked on word times (CLEANUP 1-6 + kit Q2 12.0-16.55): no retake words left.
Checks: composite check full 16x9/9x16, teaser, sh01-sh10: no new collisions (9x16 dial labels touch at 5:24: old), variety pass.
Sheets: outputs/_review/before16.jpg + after16.jpg.
## 2026-11-07 late (coordinator review) — DONE
- moments/visuals.js (NEW, after common.js): WF.photo fills its panel full-bleed with a slow push + a solid band under her 16:9 captions.
- TalTech 45 ECTS and Study in Estonia hours crops: full inserts, ~80 % wide. FIXED HOURS card: a split (big). Degree panel fills at +0.4 s.

## 2026-11-10 rollout (formats + covers + ending) — DONE
- moments/formats.js (NEW, manifest "common" after visuals.js): WFF.install (called from plan.js WF_PLAN short) routes graphics + her talking
  per "fmt" (A B C F G H I J K M; D written, unused), ported from http-status-codes via how-to-read formats.js in type set 02 + charcoal/manila/red;
  its own captions (WFF.capDraw: doubled words dropped), titles (F small, G big, K mono tag, M white box, D flash; B/C/J posters) and the cover
  (WFF.coverDraw, styles photo / card / card-red). common.js TH.post: shorts with "fmt" only blank the house label and let formats.js draw.
- plan.js: FX = WFF.install(); in format shorts the kinds 'kw', 'card', 'tip' are skipped; WF.open {span, draw, snd} = a short's opening
  graphic (sh07 dial, sh10 meal-prep photo); FX.fill() + FX.restore() at the end. Old shorts scripts: build/shorts.before/; old manifest:
  build/talking-head.before-formats.json.
- sh09 skips 'five-pm' (the clock-out quote card re-typed her). sh04 title "Plan more time for your thesis" (the old one ran off the K tag).
- Mattes made for sh05 (J) + sh10 (C). tools/covers.py, tools/fmtsheet.py (from how-to-read), tools/stills.sh (review stills -> outputs/_review/v2).
- Manifest "outroCard" (thumb ../outputs/thumbnails/01-developer-by-day.png).

## 2026-11-13 full-kit pass (projects/FULL-KIT-BRIEF-2026-11-12.md) — font-board looks, covers, teaser v3
- moments/looks.js (NEW, manifest "common" LAST): per short LOOK = 3 shorts-board refs ("board"), 1-2 font-board fonts used in their
  item's own colours ("fonts"/"colours"), graphics recoloured (WF palette per short) and set in the short's fonts (FB/FW/FC are now `let`
  in film/scenes/wfkit.js so looks.js can swap them). Overrides WFF.capDraw / titleDraw / coverDraw / poster (B, C) / jRoom (J).
  Titles now drawn in A / H / I too (top band, steps aside under a graphic). Captions 2-5 word chunks. Her Shift+Enter / "|" lines kept.
- Covers: kinds photo (her real frame, lowered, line on the item's ground above her head) / big (line alone + small second line,
  'cover/sub') / frame (a still of the short shrunk under the line: assets/covers/shNN-frame.jpg, made with composite stills; re-make
  after changing a short's look). Grid: row 1 P B F P F, row 2 B F B F P (no neighbours alike, also vertically).
- No line-pattern grounds anywhere now (the old card cover is gone). Mix: edits/shNN.json + teaser.json "mix" music -15, sfx -7.
- Captions: "this confidence" (was "these coffee days") and "this week can" (sh10), "around 7:45," (sh06): tools/words.py, whisper
  re-run on 538-558 s alone. footedl.py re-run (teaser bites changed; the full edit and shorts EDL unchanged inputs).
- Teaser v3: teaser/teaser.js rewritten (old: build/teaser.before-v3-2026-11-13.js), plan teaser/PLAN-v3.md, bites in the manifest.
  Font board pair-01 (Anton + Archivo) in combo-01 colours; "Helvetica Neue" = Archivo in the teaser only (studio 16:9 captions).
- wfkit WF.dial: label A hidden when the two dials are stacked (it ran into dial B's "24 H": teaser 1:1 / 4:5 / 9:16, full 9:16).
- outroCard thumb -> ../outputs/thumbnails/03-9am-job-9pm-masters.png (thumbnails set 2026-11-13, the critic's only 8).
- Backups: build/talking-head.before-looks-2026-11-13.json, build/wfkit.before-looks-2026-11-13.js, build/words.before-2026-11-13.py,
  build/refined-kit.before-2026-11-13.md. Review: outputs/_review/fontboard-2026-11-13/ (covers.jpg, shorts-1/2.jpg = stills + board refs,
  teaser-16x9.jpg, sh*_ stills). Previews/proxies need a refresh before she exports.

## 2026-11-17 weakest pass (shorts) — DONE
- plan.js: WF_ALT (s43g talking-head spelling; the tired-class card was missing since the 11-13 "7:45" caption fix, full edit + sh06); s47-s48 'class-catchup' week insert in shorts only (the full edit keeps the two talks); s48 clock cue full edit only; tired-class TIRED stamp y 520 / 120 px + MON push in shorts.
- formats.js H enter 0.3. wfkit.js WF.week o.labZ (block label size). Backups archive/weakest-2026-11-16/. Sheet outputs/_review/sh06-before-after-2026-11-16.jpg.

## 2026-11-20: caption accuracy pass — DONE (see STATUS.md)
- tools/words.py: last block "2026-11-20" (12 phrase fixes, 5 word times moved so short / teaser starts don't show a word said before them, words starting in a trimmed pause move onto her voice; never across teaser bite gaps or bite cuts). Run footedl BEFORE words.py.
- talking-head.json: 31 short / teaser edges moved into silence; full edit cuts unchanged (a snap of full cut 12.00 -> 11.71 clipped "2025" and was reverted). Files: build/captioncheck-2026-11-20/.

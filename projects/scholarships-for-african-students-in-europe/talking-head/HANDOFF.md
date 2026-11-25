# scholarships talking-head: handoff notes (resume from here)

## 2026-11-07 evening: "show, don't type" pass — DONE
Files: moments/visuals.js (NEW, manifest "common" after common.js: SC.pic = a Pexels photo full-panel with a slow push + credit, PHOTOS
entries notes/dorm/planner/passports/writing/wing), moments/plan.js (old: build/plan.before.js), teaser/teaser.js (old: build/teaser.before.js),
film/scenes/s1.js + s2.js (old: build/s1.before.js, s2.before.js): labels and typed sentences removed from the scenes the edit uses
(routes descriptions, "How much they cover", "If you get it, it covers", window labels, "Not every programme…" sentence -> a grid of
programmes where only some light up "€", DAAD "Also helps with"/"Only for specific courses"/"Apply through the course…", si.se
"Confirm the dates", NL "Who"/"Deadline"/"Not everything…", Estonia labels + "I got a partial scholarship", calendar "+ the documents",
"I'm rooting for you" (board stays), prep-2028 "This is the time to start"), film/scenes/kit.js pass(): one row = a big value.
Plan: gone = keywords re-typing her (African students, again and again, uni first, literally anyone, Nigerian graduates, not on that
list, get in really well, take time, not your full living cost), the 3-question stack, the "checked" tile (date already on the
opening title), cards "Starting in 2028? Prepare now" / "Start preparing a year before you go", flapsCards for Pick/Who/Hungary
covers/References; photos for two-things, em-run, Hungary covers (dorm), a year before (planner), documents (passports, now ots),
motivation letter (s58-s58b; s58c-e her on camera). Chapter card = "How it works".
Captions: raw_words.json "Programme. it ended" -> "It ended" (hand fix; no generator script for raw_words in this project).
Cuts: the 6 manifest cuts checked on word times (CLEANUP 1-5 + "So do(n't) the same motivation letter"): no retake words left.
Text count: python3 build/textcount.py 8.45 build/plan.before.js moments/plan.js (274 -> 146) + python3 build/textcount_scenes.py
<plan> ../film/scenes/s1.js ../film/scenes/s2.js (308 -> 105). Sheets: outputs/_review/before16.jpg, after16.jpg.
Known, left: teaser check flags the topic lines touching at 0.2-0.7 s (topic card, not changed here); empty panels before flaps flip
(75-81 s em-covers, 457-468 s) are the old scene timing.
## 2026-11-07 late (coordinator review) — DONE
- Panels whose flaps flipped late now start on the first flipped word (routes, em-covers, em-1400, DAAD gate, NL gate, si-steps,
  hu-status spans in plan.js). OKP crop: split instead of a tile (her tile covered it).
- Left: the one-line page crops inside the gate scenes (DAAD 2 years, NL €5,000, €1,400) stay small (fixed scene layout).
## 2026-11-10: shorts in a MIX of formats + a cover frame in every short (rollout brief 2026-11-10) — DONE, self-checked
- Formats (manifest "fmt" + "frame9" + "topLabel" = the title, "|" = second line): sh01 D · sh02 I · sh03 B · sh04 M · sh05 G ·
  sh06 H · sh07 A · sh08 K · sh09 F (each once; new formats H I K M = 4). In/out points, cuts and her caption timing unchanged.
- Code: moments/formats.js (NEW, last in "common"): SCF.setup (where graphics go per format, her framing per format; film scenes
  drawn in a 16:9 box for I / G), SCF.fill (no plain gaps for B H I K M), SCF.titleFmt / bigTitle / boxM / tagK (titles, editable as
  'label' / 'tag'), SCF.capDraw / capNew (captions per format, key word yellow #FFD23F), SCF.coverDraw (the cover frame, first 0.1 s,
  editable at 0:00 as 'cover/cover'). plan.js: SC_PLAN short calls SCF.setup (shorts without fmt: as before) and SCF.fill.
  Old files: build/plan.before-formats.js, build/common.before-formats.js, build/talking-head.before-formats.json.
- Covers: manifest "cover" {on, dur 0.1, at, text (~word~ yellow), style photo | card (+ "bg")}; cards sh04 (green) + sh08 (paper).
  Stills: tools/covers.py (copy of the HTTP tool, under the render lock) -> assets/covers/. The photo line sits on her top under her
  face (y ~760-1160: her face is high in this framing), inside the 3:4 grid crop.
- Sheets: outputs/_review/shorts-formats-v2.jpg, outputs/_review/covers.jpg (stills in outputs/_review/formats/; bin after she looked).
- Phones: none drawn in this project's moments / film scenes (checked), nothing to change.
- Coordinator fixes (same day): photo covers draw her still at 85 % and 490 px lower on the graphite ground (cover "scale" / "shift";
  head top ~y 950, chin ~1470), the line above her head (y 330-830); D captions over a graphic at y 905, H captions over a panel only
  while her picture is really moved up (camAt boxed). Manifest "outroCard" (thumb 01-1400-a-month.png, the YouTube title, graphite /
  cream / yellow); review stills outputs/_review/outro/ (sh01 9:16).

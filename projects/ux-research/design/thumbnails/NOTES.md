# ux-research thumbnails: set 3 (2026-10-16), DONE: waiting on her pick
Why: her 10-16 correction ("stop being so one way"): every set is a MIX of kinds, every rule adds up, her database-indexes
thumbnail is a QUALITY bar, not a template. Wording gate: every text names the topic for a stranger; none is a line from the transcript.

## How it is built
- Generator `tools/gen3.py` (01-12 and 17-20; run `python3 tools/gen3.py --content`, it keeps the hand-fixed titles and her nudges;
  never `--reset`). 13-16 are hand-written html (kept from set 2, fixed by hand). Shared look `lib/v3.css`. Render `node render.mjs`.
- Photos: her 4K recording `kit/UX research. .mov` (never flipped). Frames `assets/scene/g/` re-graded by `tools/grade3.py` into
  `assets/scene/g2/` (round-1 critic: "dim green-grey room"): +0.5 EV, green/teal hues pulled to a warm grey, shadows lifted.
  Her cut-out (`g2/cut/`) gets the SAME grade as the room, so there is no seam or halo where she overlaps text (round-2 critic
  saw a 6-12 px glow when she was graded separately). `crop()` places her face from the Vision face box (`tools/faces_g2.txt`),
  so each option has its own crop. Closed-mouth frames picked from a mouth contact sheet: 287.9, 300.6, 309, 330.5, 349, 584.2,
  686.7, 692.7, 9.5, 246.8, 459.5.
- Props (at most one per photo option), all free: wooden clipboard (Wikimedia Commons, public domain), coffee cup "Café Butter"
  (Wikimedia Commons, CC0), magnifier (Met Museum ADA5941, CC0; no longer used in the final set). Everything else (sticky notes,
  name tags, badge, phones, chat window, call frame, cards) is drawn in CSS, generic, no brand. "72%"-style data was removed.
- Phone mockups: 3 options (13, 14, 18), down from 7.

## Mix (final): 7 photo background (01-03, 05-08; 08 is a paper/photo split in B&W) · 3 collage over her photo (09-11) ·
6 graphic (04 steps + her outlined cut-out, 13-17) · 4 other (12 full-bleed blue, 18 before/after, 19 say ≠ do, 20 off-black block + big face).
Planned ~8/4/5/3; one collage (types) became the blue graphic 12 after two critics found the collage version abstract.

## Critic rounds (fresh agent each time, image only, against her sample; R1 = the previous designer's round)
R2: all 20 pass the cold topic test; photo options 5.5-8 (halo, open mouths, look-alikes). R3: halo gone; 4 at 7.5. R4: 8 at 7.5+
(variety: "11 are the same room shot"), so 04 and 12 were rebuilt as graphic / full-bleed. R5: 15 of 20 at 7.5+, 6 at 8.
Shipped all 20: 15 at the bar, 5 kept as alternates below it (01, 05, 09: 6.5; 08, 10: 7). Small fixes after R5 (02 bigger
checklist, 03 heavier "vs") are not re-scored.

| Direction | Kind | Words on it | Titles (1 = main) | References | Scores |
|---|---|---|---|---|---|
| 01-ux-research-plain-words | photo | UX research in plain words | What Is UX Research? Explained From Scratch / UX Research for Beginners: What It Is and How It Works / What Is UX Research? Explained With Real App Examples | yt 'FAVOR' / 'UI UX roadmap' (word behind the head), Pinterest 'COOK', 'keep trying' (mixed type). | R1 6 · R2 7.5 · R3 6.5 · R4 7 · R5 6.5 · below the 7.5 bar (alternate) |
| 02-what-does-a-ux-researcher-do | photo | What does a UX researcher do? | What Does a UX Researcher Actually Do All Week? / What Is UX Research? A Beginner's Path Into the Field / UX Researcher vs UX Designer: Who Does What on a Team? | yt 'POV' (29), Pinterest 'how to be consistent' (person + plain question), her database-indexes sample (few big elements). | R1 6 · R2 6.5 · R3 6 · R4 6.5 · R5 7.5 |
| 03-ui-vs-ux-hands **(recommended)** | photo | UI vs UX | UI vs UX vs UX Research: The Difference Explained / UI vs UX Explained: What Users See vs How It Feels / UI vs UX: Why a Pretty App Can Still Fail | yt 'Before/After' splits (12, 21), 'UI UX roadmap' (26), viral 'Fitness sales framework' (labelled blocks). | R1 6.5 · R2 8 · R3 7.5 · R4 7.5 · R5 8 |
| 04-become-a-ux-researcher-steps | graphic | How to become a UX researcher | What Is UX Research? A Beginner's Path Into the Field / How to Get Into UX Research With No Experience / UX Research Careers: What I've Noticed as a Student | her database-indexes sample (one literal diagram + her outlined cut-out), viral 'Fitness sales framework', yt 'Zero to Data scientist' (27). | R1 6.5 · R2 6.5 · R3 5.5 · R4 6.5 · R5 7.5 (rebuilt as a graphic) |
| 05-ux-research-for-startups | photo | UX research for startups | UX Research on a Small Budget: Start With 5 Users / Can't Afford UX Research? Start With 5 Conversations / Test Your App Idea Before You Build It (UX Research) | Pinterest 'JOBS ARE DEAD' / 'THE 9-5 COLLAPSE' (highlight bars), yt 'stop lying to yourself' (14). | R1 6 · R2 6.5 · R3 6.5 · R4 7 · R5 6.5 · below the 7.5 bar (alternate) |
| 06-will-ai-replace-ux-research | photo | Will AI replace UX research? | AI and UX Research: What a Master's Student Thinks / UX Research for Beginners: What It Is and How It Works / What Is UX Research? Explained From Scratch | yt 'Run AI agents locally' (22), 'It clicked' (4), DOAC 'stop lying' (14). | R1 7 · R2 5.5 · R3 6 · R4 7 · R5 7.5 |
| 07-researcher-vs-designer **(recommended)** | photo | UX researcher vs UX designer | What Does a UX Researcher Actually Do All Week? / How to Become a UX Researcher With No Experience / UX Research for Beginners: What It Is and How It Works | yt 'Before/After' splits (12, 21), 'Ruthless / Relaxed' (21b), Pinterest 'LOCKED FOCUS'. | R1 6.5 · R2 7 · R3 7 · R4 7 · R5 8 |
| 08-is-ux-research-a-good-career | photo | Is UX research a good career? | UX Research Careers: What I've Noticed as a Student / How to Get Into UX Research With No Experience / UX Researcher or UX Designer: Which Job Fits You? | Pinterest 'how to be consistent' / 'no one cares.' (editorial), viral 'Financial literacy', yt 'you're wasting your 20s' (30). | R1 7 · R2 7.5 · R3 7.5 · R4 7.5-8 · R5 7 · below the 7.5 bar (alternate) |
| 09-collage-ux-research-for-beginners | collage | UX research for beginners | UX Research for Beginners: What It Is and How It Works / What Is UX Research? Explained From Scratch / UX Research Explained Simply (No Jargon, Just Examples) | viral collage 'Capsule wardrobe', 'Time to lock in.', 'Thought of these?'. | new in R2: R2 6 · R3 6 · R4 6 · R5 6.5 · below the 7.5 bar (alternate) |
| 10-collage-get-into-ux-research | collage | How to get into UX research | How to Get Into UX Research With No Experience / How to Become a UX Researcher (From a Master's Student) / What Is UX Research? A Beginner's Path Into the Field | viral collage 'How to be Feminine', 'in defense of being online', Pinterest 'new york city writing'. | new in R2: R2 5.5 · R3 5 · R4 6.5 · R5 7 · below the 7.5 bar (alternate) |
| 11-collage-ux-research-methods | collage | UX research methods | 7 UX Research Methods, From Interviews to A/B Tests / How Is UX Research Done? Interviews, Tests and Surveys / UX Research for Beginners: What It Is and How It Works | viral collage 'Time to lock in.' (labels around the person), yt 'HELPED ME LEARN' (16), Pinterest editorial bands. | new in R2: R2 6.5 · R3 7 · R4 7 · R5 7.5 |
| 12-types-of-ux-research **(recommended)** | other | Types of UX research | Types of UX Research Explained: Qualitative vs Quantitative / 3 Types of UX Research, Explained Simply / UX Research for Beginners: What It Is and How It Works | her decks (one full-bleed accent for a punchline), yt 'Space complexity' (34), her database-indexes sample (two things side by side, drawn literally). | new in R4 (blue graphic): R5 8 |
| 13-what-is-ux-research | graphic | What is UX research? | Why Some Apps Are So Confusing (UX Research Explained) / UX Research Explained Simply (No Jargon, Just Examples) / Why Beautiful Apps Can Be Awful to Use (UX Research) | her database-indexes thumbnail (a mechanism with an arrow), viral 'Fitness sales framework', yt 'Two sum'. | R1 8 · R2 7.5 · R3 7.5 · R4 8 · R5 7.5 |
| 14-ui-vs-ux-screens | graphic | UI or UX? The real difference | UI vs UX: The Experience Is Bigger Than the Screen / UI vs UX Explained: What Users See vs How It Feels / UI vs UX: Why a Pretty App Can Still Fail | her database-indexes thumbnail (one mechanism drawn literally), yt 'Complete roadmap UI UX' (26), 'Two sum' (notebook sketch). | R1 7.5 · R2 7 · R3 7 · R4 7.5 · R5 7.5 |
| 15-become-a-ux-researcher-badge **(recommended)** | graphic | Your first UX research job | How to Get Into UX Research With No Experience / How to Become a UX Researcher (From a Master's Student) / What Is UX Research? A Beginner's Path Into the Field | her database-indexes thumbnail, yt 'I QUIT' (5b), 'Zero to Data scientist' (27). | R1 7.5 · R2 7 · R3 7 · R4 7.5 · R5 8 |
| 16-no-budget-video-call **(recommended)** | graphic | UX research with no budget | Can't Afford UX Research? Start With 5 Conversations / How to Do UX Research for Free (Beginner's Guide) / UX Research on a Small Budget: Start With 5 Users | yt '13 girl tips on a budget' (2), 'Run AI agents locally' (22), her database-indexes thumbnail. | R1 8 · R2 7.5 · R3 7 · R4 7.5 · R5 8 |
| 17-ux-vs-market-research **(recommended)** | graphic | UX research vs market research | UX Research vs User Research: Are They the Same? / UX Research vs User Research vs Market Research / What Is UX Research? Explained From Scratch | her database-indexes thumbnail (one idea, drawn literally), yt 'Space complexity' (34), 'Before/After' (32). | R1 8.5 · R2 8 · R3 7.5 · R4 8 · R5 8 |
| 18-what-ux-research-fixes | other | What UX research fixes | Why Some Apps Are So Confusing (UX Research Explained) / What Is UX Research? Why Good-Looking Apps Still Fail / Why Beautiful Apps Can Be Awful to Use (UX Research) | yt 'before / after' (1, 12, 21, 32), 'my-project.vercel.app vs myproject.com' (28). | R1 8.5 · R2 7 · R3 7 · R4 7.5 · R5 7.5 |
| 19-why-ux-researchers-watch-users | other | Why UX researchers watch users | UX Research: Why Users Say One Thing and Do Another / UX Research for Beginners: Watch Users, Don't Just Ask / What Is UX Research? Explained From Scratch | yt tweet-card thumbnails ('Forget about going viral' 20, 'QUIT DATA NOW'), her database-indexes thumbnail (two things linked by an arrow). | R1 7.5 · R2 7.5 · R3 7.5 · R4 7 · R5 7.5 |
| 20-start-ux-research-from-zero | other | UX research with 0 experience | How to Become a UX Researcher With No Experience / How to Get Into UX Research With No Experience / UX Research for Beginners: What It Is and How It Works | yt 'Never get distracted again' (11, face + text block), 'Zero to Data scientist' (27), 'THEY LIED TO US' (24b). | R1 6.5 · R2 7 · R3 7 · R4 7 · R5 7.5 |

Recommended (all scored 8 in R5): **16 no budget**, **07 researcher vs designer**, **15 first job badge**, **03 UI vs UX hands**,
**17 UX vs market research**, **12 types (blue)**. Top 3 for Test & Compare: 16, 07, 03 (three different kinds and promises).
Round-1 build of set 3: `archive/v3-round1/` (html) and `outputs/thumbnails/archive-v3-round1/` (PNGs).

# ux-research thumbnails: set 2 (2026-10-16)

Why: she could not use any of set 1 ("not solid enough"). The bar is her own database-indexes thumbnail
(`inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png`): topic name huge, one big literal picture,
parts linked by an arrow or a reading path, lots of air, one accent colour, calm closed-mouth face. Set 1 is in
`archive/v1/` (directions) and `outputs/thumbnails/archive-v1/` (PNGs).

## How it is built
- Shared look `lib/v2.css` (Schibsted Grotesk 900 for the topic, Permanent Marker on sticky notes, one Instrument Serif
  italic "vs"), `lib/arrow.js` (thick curved arrows from `data-a="x1 y1 cx cy x2 y2"`), `lib/bind.js` (editor binding).
  Colours are `vars` in each content.json (`--ground`, `--fg`, `--accent`, `--ol` = her outline colour); text in `text`; her photo in `images.me`.
- Her cut-outs, all from `kit/UX research. .mov` (4K, never flipped), closed mouth picked by measuring the lips with
  macOS Vision face landmarks, hands-free frames checked with Vision hand pose; cut with `studio/tools/cutout.swift`,
  warm grade (`tools/warm.py` + `tools/grade.py`), dark chair fringe removed, then a hard smoothed edge so the outline is even:
  `assets/cut/gbemi-direct-hard.png` (0:09.6, before she starts talking, looking at the camera; used in 01-05),
  `gbemi-calm-hard.png` (10:43.4), plus softer versions (`gbemi-calm.png`, `gbemi-calm-steeple.png`, `gbemi-hand-cheek.png`,
  `gbemi-finger-up.png`; the last two were rejected: hand at the face, motion blur on the raised hand).
  `assets/photo/room-*.jpg`: her real frame with the room blurred (used by the dropped photo-led options).
- Every screen, badge and video call is generic (no brand, no real app). No "Illustration" stamps (her 2026-10-14 rule).

## The set (critic = fresh agent each round, image + titles only, scored against her thumbnail; ship bar 8)
| # | File | Idea | Words | Titles (1 = main) | Scores R1..R7 |
|---|---|---|---|---|---|
| 02 | 02-wall-to-better-app | users' sticky-note complaints, curved arrow, an app that answers them ("On its way!"); faceless, off-black + canary | What is UX research? | UX Research Explained Simply (No Jargon, Just Examples) / UX Research for Beginners: Watch Users, Don't Just Ask / Why Some Apps Are So Confusing (UX Research Explained) | 7.5 · 8 · 8 · 8 · 7.5 · 8.5 · 7 |
| 03 | 03-ui-vs-ux-journey | three screens: UI = the one circled screen, UX = the arrow across the whole trip; paper + orange, her B&W with ink outline | UI vs UX | UI vs UX: The Experience Is Bigger Than the Screen / UI vs UX Explained: What Users See vs How It Feels / UI vs UX: Why a Pretty App Can Still Fail | 7 · 7.5 · 7 · 7 · 8.5 · 8 · 8 |
| 04 | 04-become-a-ux-researcher | a staff badge on a lanyard with her face as the photo; off-black + green | Become a UX Researcher | How to Get Into UX Research With No Experience / What Is UX Research? A Beginner's Path Into the Field / How to Become a UX Researcher (From a Master's Student) | 6.5 · 7 · 8 · 8 · 8 · 8 · 7 |
| 05 | 05-no-budget-video-call | a video call (her + a user) with a "$0" tag on the laptop; paper + orange, her in colour | UX research with no budget | Can't Afford UX Research? Start With 5 Conversations / UX Research on a Small Budget: Start With 5 Users / How to Do UX Research for Free (Beginner's Guide) | 7 · 8 · 8 · 6.5 · 8 · 8 · 6.5 |
| 01 | 01-findings-on-the-app (alternate, below the bar) | checkout stuck at "Step 3 of 7" with two complaint notes, a note arrow to Pay; green + canary, her B&W | UX Research | What Is UX Research? Why Some Apps Are So Confusing / UX Research for Beginners: What It Is and How It Works / What Is UX Research? The Step Bad Apps Skip | 7 · 8 · 7 · 7.5 · 7 · 7 · 7 |

Recommended: **02, 03, 04** (A/B test set: three different promises: what it is, UI vs UX, getting in). 05 if she leans on the budget angle.

Dropped (below 8 after reworks, files kept for the editor history in `archive/`, PNGs in `outputs/thumbnails/archive-v2-*`):
06 photo + big sticky note (5.5-6: generic, cut-out halo), 07 photo "What does a UX researcher do?" (4: no picture of the idea),
08 magnifier on the app (6-7: repeated 01), users say vs do (4.5-7.5: the "do" side never read cleanly at 320 px; best idea, worth redrawing),
seven methods (fan, then cards: 6.5-7.5: cards too small to label, listicle look), researcher vs designer split (6.5-7.5: stock "vs" template).

What the critics kept saying (lessons for the next set): soft Vision cut-out edges look cheap: harden the alpha and keep the
outline 6-8 px; never let hands into the crop; the face must join the picture (in the reading path), not float in a corner;
grey placeholder bars inside phones read as dead space at 320 px; scores from one critic to the next swing by 1-1.5 points,
so judge by the median over rounds.

---

# Thumbnails: What is UX research (ux-research, 2026-10-13)

Built from the social strategist's 22 concepts (`../../kit/refined-kit.md` section 3, T01-T22) per `THUMBNAILS.md` (RULE 0: topic in plain
words + a literal picture of it; RULE 1: no script phrases, 1-5 words, 2-3 titles each). 21 directions kept (T17 left out as the weakest
concept; T07 "Where's the why?" and T18 "UI vs UX vs RESEARCH" were built and dropped after round 1, in the Bin). Two extra: a collage over
the creator (22) and a research-wall half (23). Own look, taken from the approved film direction A (deep-green wall #1D3A32, canary
#FFE15A and orange #F26A2E sticky notes, index cards, paint-marker strokes, Schibsted Grotesk / Permanent Marker / Courier Prime);
nothing started from a previous project's thumbnails.

## Files
- **Edit in the browser:** http://localhost:7700/design/ux-research/thumbnails/
- **Source:** `directions/<NN-name>/index.html` + `content.json` (text, photos, colours, the titles, the critic scores). Shared parts: `lib/ux.css`.
- **Generator:** `python3 tools/gen.py [03] [--reset]` then `node render.mjs`. Without `--reset` her studio edits are kept.
  `python3 tools/scores.py` writes the gate scores and the recommended flag (from `tools/scores_r3.json`).
- **Review tools:** `python3 tools/gates.py <dir>` (A: image only at 640/320/168 with a duration badge; B: a mocked feed with her viral
  samples; C: everything beside her references), `python3 tools/sheet.py out.jpg [prefixes]`.
- **Outputs:** `outputs/thumbnails/<NN-name>.png` + `overview.png` (titles, scores, recommended first), copied to `~/Downloads/ux-research-thumbnails/`.

## Her photo
- Only frames from her recording (`kit/UX research. .mov`, 4K, speech from 0:37), never flipped, never retouched. Scanned at 1 frame / 3 s,
  then 3 frames around each candidate. Used: 0:38.5, 0:41.5, 5:37, 6:49, 9:46, 10:01, 10:28, 10:41.5, 10:53.5, 11:10, 11:26.5, 11:28,
  12:20.5, 12:37 (seconds in `assets/frames/f_<s>.jpg`). Avoid 10:55 (eyes half closed) and 2:47.5 (hand blurred mid-gesture).
- Person masks: `tools/cutout_full.swift` (macOS Vision, person mode). Face boxes: `tools/faces.swift` -> `tools/faces.txt`.
- **Grade (colour balance and exposure only):** `tools/warm.py` (the ghana-marrify warm grade) then `tools/grade.py` (round 2: about +0.4 EV,
  warmer, green pulled toward magenta, soft highlight shoulder), applied to the frame AND its mask: `assets/scene/g/`. The room behind
  her is darkened in CSS (`--bgb`); round 2 also blurred it, which spread her sweater past the mask edge and read as a glow, so round 3
  has no blur.
- **Her own photos would lift every photo-led one** (the strategist's list: phone held out to the camera, clipboard, leaning in to a
  screen, puzzled at a phone, two badges, at a sticky-note wall). Drop them in `projects/ux-research/assets/uploads/` or use "Add photo".

## Honesty
Every app screen (a generic checkout "Your order", a settings page, pop-ups), badge, job ad, laptop call and textbook is a generic
illustration marked "Illustration"; no real app, company or person. The job ad has no company. The 5 people on the call are initials.
No stock faces. Thumbnail words are the strategist's cold-tested words or plain rewrites; none is a line from her script.

## The set
| Direction | Concept | Words | Titles (1 = main) | Frame (s) | Scores a · b · c (rounds 1 · 2 · 3) |
|---|---|---|---|---|---|
| 01-ui-vs-ux-split | T02 (top pair 1) | UI | UX | UI vs UX: Why a Pretty App Can Still Fail / UI vs UX vs UX Research: The Difference Explained / Why Beautiful Apps Can Be Awful to Use (UX Research) | 601 | a 4/5 · 4/6 · 3/6 | b 7/6 · 6/6 · 8/7 | c 3 · 4 · 6 |
| 02-pretty-but-unusable | T03 (top pair 2) | PRETTY BUT UNUSABLE | What Is UX Research? Why Good-Looking Apps Still Fail / Why Beautiful Apps Can Be Awful to Use (UX Research) | 688 | a 4/7 · 4/7 · 4/6 | b 8/7 · 8/7 · 7/7 | c 5 · 5 · 5 |
| 03-zero-users | T11 (top pair 3) | 0 USERS | Built an App Nobody Uses? You Skipped UX Research / What Is UX Research? Why Good-Looking Apps Still Fail | 653.5 | a 2/4 · 2/5 · 2/5 | b 8/7 · 8/8 · 8/8 | c 3 · 5 · 5 |
| 04-wrong-button | T15 | USERS TAP THE WRONG BUTTON | Why Beautiful Apps Can Be Awful to Use (UX Research) / What Is UX Research? Why Good-Looking Apps Still Fail | 670 | a 3/6 · 4/7 · 4/6 | b 7/7 · 6/6 · 8/7 | c 5 · 6 · 6 |
| 05-say-vs-do **(recommended)** | T06 | SAY ≠ DO | UX Research: Why Users Say One Thing and Do Another / UX Research for Beginners: Watch Users, Don't Just Ask | 757 | a 2/4 · 3/6 · 2/5 | b 7/6 · 8/7 · 8/8 | c 4 · 7 · 7 |
| 06-ux-research-explained | T01 | UX RESEARCH, explained simply | What Is UX Research? Explained From Scratch / What Is UX Research? Explained With Real App Examples | 628 | a 5/6 · 4/5 · 5/6 | b 5/4 · 6/4 · 8/5 | c 7 · 6 · 7 |
| 07-inside-ux-research | T04 | WHAT UX RESEARCHERS DO | What Does a UX Researcher Actually Do All Week? / A Week in UX Research: Plan, Interview, Find Patterns | 586 | a 4/5 · 4/6 · 4/5 | b 6/5 · 8/6 · 8/5 | c 5 · 6 · 5 |
| 08-which-one | T05 | WHICH ONE ARE YOU? | UX Researcher or UX Designer: Which Job Fits You? / UX Researcher vs UX Designer: Who Does What on a Team? / UX Researcher or UX Designer? Here's the Real Difference | 409 | a 3/5 · 4/7 · 4/7 | b 8/8 · 8/7 · 8/8 | c 4 · 6 · 4 |
| 10-three-types | T08 | 3 TYPES OF UX RESEARCH | 3 Types of UX Research, Explained Simply / Types of UX Research Explained: Qualitative vs Quantitative | 628 | a 5/7 · 4/6 · 4/6 | b 6/6 · 6/5 · 8/6 | c 6 · 2 · 3 |
| 11-seven-ways | T09 | 7 ways to study users | 7 UX Research Methods, From Interviews to A/B Tests / 7 Ways to Study Your Users (UX Research for Beginners) | 41.5 | a 3/5 · 3/4 · 3/4 | b 8/7 · 8/5 · 7/6 | c 6 · 7 · 7 |
| 12-five-users-zero | T10 | 5 USERS. $0. | Can't Afford UX Research? Start With 5 Conversations / No Budget for UX Research? Talk to 5 Users First | 757 | a 3/6 · 2/5 · 2/6 | b 8/8 · 7/8 · 8/8 | c 3 · 5 · 6 |
| 13-sketch-first | T12 | SKETCH FIRST. BUILD LATER. | Test Your App Idea on Paper Before You Pay to Build It / Test Your App Idea Before You Build It (UX Research) | none (flat) | a 4/6 · 4/5 · 3/4 | b 9/7 · 9/6 · 9/7 | c 2 · 6 · 6 |
| 14-ui-is-not-ux-iceberg | T13 | UI IS NOT UX | UI vs UX: The Experience Is Bigger Than the Screen / UI vs UX vs UX Research: The Difference Explained | none (flat) | a 4/6 · 4/6 · 5/6 | b 7/7 · 7/5 · 8/7 | c 2 · 8 · 6 |
| 15-no-jargon | T14 | UX RESEARCH, NO JARGON | UX Research Explained Simply (No Jargon, Just Examples) / What Is UX Research? Explained With Real App Examples | 41.5 | a 5/7 · 4/6 · 4/6 | b 8/7 · 8/6 · 8/6 | c 5 · 5 · 5 |
| 16-nobody-tested | T16 | NOBODY TESTED THIS APP | What Is UX Research? The Step Bad Apps Skip / Why Beautiful Apps Can Be Awful to Use (UX Research) | 686.5 | a 4/7 · 4/7 · 4/7 | b 7/8 · 7/7 · 8/8 | c 6 · 5 · 4 |
| 18-why-apps-confuse-you **(recommended)** | T19 | WHY APPS CONFUSE YOU | Why Some Apps Are So Confusing (UX Research Explained) / What Is UX Research? Why Some Apps Are So Confusing / Why Beautiful Apps Can Be Awful to Use (UX Research) | 740.5 | a 5/8 · 4/7 · 5/7 | b 8/8 · 8/7 · 9/8 | c 6 · 6 · 5 |
| 19-zero-years **(recommended)** | T20 | 0 YEARS? | How to Become a UX Researcher With No Experience / How to Get Into UX Research With No Experience | 601 | a 4/7 · 3/6 · 3/6 | b 9/8 · 9/8 · 8/8 | c 5 · 7 · 6 |
| 20-dont-just-ask-watch | T21 | UX RESEARCH: DON'T JUST ASK USERS. WATCH THEM. | UX Research for Beginners: Watch Users, Don't Just Ask / UX Research: Why Users Say One Thing and Do Another | 337 | a 2/5 · 4/7 · 4/6 | b 6/6 · 7/6 · 7/7 | c 6 · 8 · 7 |
| 21-said-vs-did | T22 | USERS SAID vs DID | UX Research: Why Users Say One Thing and Do Another / UX Research for Beginners: Watch Users, Don't Just Ask | none (flat) | a 4/6 · 3/5 · 1/3 | b 8/7 · 8/7 · 7/6 | c 3 · - · 6 |
| 22-what-is-ux-research-collage | Collage over the creator (her 2026-10-07 style) | UX research, in plain words | UX Research for Beginners: What It Is and How It Works / What Is UX Research? Explained With Real App Examples | 586 | a 4/3 · 4/5 · 4/4 | b 5/4 · 4/4 · 5/4 | c 7 · 8 · 8 |
| 23-wall-ui-vs-ux | T02 variant in the film look | UI / UX on the research wall | UI vs UX Explained: What Users See vs How It Feels / UI vs UX vs UX Research: The Difference Explained | 653.5 | a 3/4 · 4/7 · 4/7 | b 7/5 · 8/6 · 8/6 | c 5 · 8 · 7 |
a = image only, cold: topic confidence /5 and click /10 · b = with its main title in a mocked feed next to her viral samples: clarity /10
and click /10 (pass 8/8) · c = taste against her viral samples, collage samples and Pinterest board /10 (pass 8). Fresh critics every round.

## Recommended 3
1. **18 Why apps confuse you** + "Why Some Apps Are So Confusing (UX Research Explained)": the strongest in the cold image-only gate in
   all three rounds and a title-pair pass (9/8).
2. **19 0 years?** + "How to Become a UX Researcher With No Experience": passed the title-pair gate in all three rounds (9/8, 9/8, 8/8);
   her favourite ghana-marrify clipping look.
3. **05 Say ≠ Do** + "UX Research: Why Users Say One Thing and Do Another": title-pair pass (8/8), taste 7, the film's sticky-note language.
Also worth a look: **22** (her collage style, taste 8 in rounds 2 and 3, weak on small sizes), **03 0 users** (the strategist's
Test & Compare pick, title-pair pass 8/8), **12 5 users $0** (title-pair pass), **20** (her hands holding the notes, taste 7-8).
For YouTube Test & Compare: 18 + 19 + 05, or 18 + 03 + 22.

## What the gates changed (rounds 1 -> 3)
- Round 1 (23 directions): the clip-art bowl app on 10 of them read as amateur; small labels and thin serif vanished at 168 px; dim green
  photo; several main titles were shared or mismatched. Dropped 09 (no topic word, chart under the badge) and 17 (text stack).
- Round 2: new text-led checkout screen; stronger grade; photo everywhere instead of flat ground + cut-out; a distinct main title per
  thumbnail; notes and cards moved off her face. Taste critic found a glow round her (the blurred room) and cards over her face (10).
- Round 3: no blur; phones 1.2-1.5x; 10's cards became three plain pairs in an arc under her chin; 03's dashboard became a "Launch day!"
  note; 05's orange note moved to her other side; 23 lets her stand in front of the wall. Still open (critics): sticky notes look flat
  (no paper texture), phone props stay small at 168 px, 21 reads as a puzzle cold, 22 is busy at small sizes.

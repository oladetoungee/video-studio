# phone-distraction thumbnails v3 (2026-10-16): a real MIX, 20 options

Why v3: she was angry that v2 turned her one sample (database-indexes) into a template (flat ground + small B&W cut-out on every option) and brought back script-like lines. Her rule (THUMBNAILS.md top section): a sample raises the QUALITY bar, it never cancels earlier feedback; every set is a mix; wording gate first.

**Mix (counted):** photo background 8 (01-08) · collage over her photo 4 (09-12) · flat graphic 5 (13-17) · other 3 (18 split before/after, 19 real European Commission headline screenshot, 20 big-face close crop). Her picture in different ways: full photo background (01-05, 07, 08), black-and-white photo (06), collage over her full photo (09-12), B&W cut-out with white outline (13), B&W cut-out with red outline (15), colour cut-out with white outline (16) and red outline (19), split (18), close face crop (20), no face (14, 17).
**Kept from v2** (their words passed the gate): 13 "Phone addiction is by design" (was 08), 14 "Make your phone boring" (was 04). The other six v2 options are in `archive/v2/` (PNGs in `outputs/thumbnails/archive-v2/`, Downloads `old-v2/`); "Built like a slot machine", "Books end. Feeds don't.", "Pull. Refresh. Repeat.", "Can you ignore this?", "Just 5 minutes?" are not used in any form.

## Wording gate (before design)
20 texts, 1-6 words, each naming the topic or its plain promise. `tools/check.py`: no 3-word run from her transcript (rewrote "Your phone is designed to addict you", "Why social media is addictive", "5 features that keep you hooked", "Infinite scroll is addictive" and the 7-word "Why you can't put your phone down"). A fresh cold critic read the 20 texts only: every one read as "phone apps are designed to keep you scrolling / phone addiction"; it flagged 5, 14, 15, 17, which were rewritten (14 kept: its picture shows colour -> grey).

## Frames
Closed or near-closed mouth frames with real gestures, checked by eye at the mouth (the microphone hides it): 300.0 (hand by cheek, closed smile), 157.0 (finger at chin), 350.9 (hand at temple), 475.2 (raised finger), 292.7 (palm up), 238.5, 152.0, 437.0, 747.0, 163.5, 874.7 (hand up), 442.5, 554.5 / 695.5 (frowning, for "before"). 350.9, 475.2, 292.7, 874.7 newly pulled at 4K (`assets/frames/`), warm grade + person mask via `tools/prep.sh`. Brightened in CSS (`--br` 1.14, contrast 1.06). Never flipped. Cut-outs: `assets/cut/` (895.75, 895.9: the microphone-free last second).

## Build / edit
- Generator: `tools/gen3.py` (round fixes are later `add()` calls with the same name, they replace the earlier ones) -> `directions/<NN-name>/index.html` + `content.json`; look `lib/v3.css` (imports `lib/v2.css`). `python3 tools/gen3.py [NN] [--reset]`, then `node render.mjs` (all + `overview.png`), `python3 tools/check.py`, `python3 tools/review3.py` (`review/v3_640.jpg`, `review/v3_320.jpg` next to her thumbnail).
- Editor: http://localhost:7700/design/phone-distraction/thumbnails/ (all 20; text, photo, colours, drag).
- 19 uses a crop of the real European Commission press page (`film/assets/sources/eu-meta-lead.png` -> `assets/props/eu-headline.png`, the first two lines of the headline of 10 Jul 2026: "Commission preliminarily finds the addictive design of Instagram and Facebook in breach of the Digital Services Act"), with a small source credit (CLAUDE.md: real screenshots keep a credit). Highlights are drawn on top.
- All phones, icons, cards, clocks and the slot machine are generic drawings; no stock photos used (a Wikimedia search found only tiny or share-alike object photos; real object cut-outs would lift the collages).

## Critic rounds (4 fresh critics, none saw earlier rounds; scores vs her own thumbnail, 8 = sits next to hers)
- R1: every option passed the cold topic test. Fixes: arrows from nowhere removed, corner phones, tiny labels, text crossing faces, 09-11 rebuilt, 06 and 15 replaced, 19 turned into the real headline screenshot.
- R2: collages not yet like time-to-lock-in, duplicated stickers (1:40 phone twice), two options with the same cut-out (16/19), "Phone addiction" 5 times. Fixes: 09 rebuilt in the reference manner (one serif line low across her, labelled stickers), 12 a clock + moon, 15 rebuilt with her cut-out and a feed that runs off the frame, 16 uses the other cut-out, 18 text "Break your scrolling habit".
- R3 and R4: see the table. **Honest result:** 13, 03, 17, 14, 05, 19, 02, 20 sit at 7.5-8. The collages (09-12) and 06 stay at 5.5-7 in R4: the critics want real photographed objects (not drawn icons) and a real night photo for 12. Her photo is the same webcam frame in 14 of 20 (her room and the hand mic): her own photos (holding her phone, at night, without the mic) would lift every photo-led option.

## Recommended
1. **13 Phone addiction is by design** + "Why You Keep Picking Up Your Phone Without Thinking" (8 in all four rounds).
2. **03 How apps keep you scrolling** + "Why Am I Addicted to My Phone? 5 Design Tricks to Blame" (best photo-led: her face + the labelled mechanism; 8.2 / 7.5).
3. **17 5 tricks apps use on you** + "Why Can't I Stop Scrolling? It Was Designed That Way" (8 / 7.5).
Next: 14 Make your phone boring, 05 Turn off these addictive settings, 19 The EU vs addictive apps.

## All 20
| Direction | Kind | Text | Titles | References (her folders) | Scores (R1 · R2 · R3 · R4) |
|---|---|---|---|---|---|
| 01-why-cant-stop-scrolling | photo | Why you can’t stop scrolling | How Apps Are Designed to Be Addictive, a Researcher Explains / Phone Addiction Isn’t an Accident: The 5 Features Behind It | stop lying to yourself (DOAC, highlight box) · Never get distracted again (Justin Sung) · it’s a problem (Pinterest, words low) | r1 7 · r2 6.5 · r3 7 · r4 6.5 |
| 02-apps-engineered-to-addict | photo | Apps engineered to addict you | Why Can’t I Stop Scrolling? It Was Designed That Way / Why You Can’t Stop Scrolling: 5 Features Designed on Purpose / Why You Keep Picking Up Your Phone Without Thinking | FAVOR / POV (huge word over the head) · COOK (fpt.doc) · UI UX roadmap | r1 7 · r2 6.5 · r3 7 · r4 7.5 |
| 03-how-apps-keep-you-scrolling | photo | How apps keep you scrolling | Why Am I Addicted to My Phone? 5 Design Tricks to Blame / Phone Addiction Isn’t an Accident: The 5 Features Behind It | Fitness sales framework (drawn steps) · Pinterest annotated vlogs (arrows, handwriting) · new york city writing | r1 6 · r2 7.5 · r3 8.2 · r4 7.5 |
| 04-stop-doomscrolling | photo | Stop doomscrolling | How to Use Your Phone Less (Simple Settings That Help) / Why You Can’t Put Your Phone Down at Night | STOP THIS! (red box) · Stop wasting evenings · Never get distracted again | r1 7.5 · r2 7 · r3 7 · r4 7 |
| 05-turn-off-these-settings | photo | Turn off these addictive settings | Why Am I Addicted to My Phone? 5 Design Tricks to Blame / Why Can’t I Stop Scrolling? It Was Designed That Way | Everything done by 2pm (checklist card) · Boring way (notification cards beside the face) · Forget about going viral (tweet card) | r1 7 · r2 7.5 · r3 7.8 · r4 7.5 |
| 06-use-your-phone-less | photo | How to use your phone less | How to Stop Scrolling: Phone Settings That Actually Help / Why Your Phone Is So Hard to Put Down, Explained | Day 1 / Day 900 (black-and-white photo) · how to be consistent (one red word) · just start. (editorial) | r1 6 · r2 7 · r3 6.3 · r4 6 |
| 07-screen-time-not-an-accident | photo | Your screen time isn’t an accident | How Apps Are Designed to Be Addictive, a Researcher Explains / Why You Can’t Stop Scrolling: 5 Features Designed on Purpose | Never get distracted again (card beside the face) · Space complexity (chart) · stop lying to yourself (boxed words) | r1 7.5 · r2 7.5 · r3 7.5 · r4 6.5 |
| 08-why-social-media-addictive | photo | Why is social media addictive? | Why You Keep Picking Up Your Phone Without Thinking / Why Can’t I Stop Scrolling? It Was Designed That Way | you’re in a war (icons around the head) · Why we can’t focus (sentence case) · I CAN’T DO THIS | r1 6 · r2 7 · r3 6.8 · r4 7 |
| 09-cant-put-your-phone-down | collage | Can’t put your phone down? | Why Am I Addicted to My Phone? 5 Design Tricks to Blame / Phone Addiction Isn’t an Accident: The 5 Features Behind It | Time to lock in. (one serif line across her, small labels scattered) · Capsule wardrobe · Thought of these? | r1 4 · r2 6 · r3 6.4 · r4 5.5 (r4 fixes applied after) |
| 10-phone-addiction-explained | collage | Phone addiction, explained | Why Can’t I Stop Scrolling? It Was Designed That Way / Why You Can’t Stop Scrolling: 5 Features Designed on Purpose | How to be Feminine (big serif) · in defense of being online (paper strip) · Capsule wardrobe | r1 4 · r2 7 · r3 7.2 · r4 5.5 |
| 11-apps-impossible-to-close | collage | Why apps feel impossible to close | Infinite Scroll Explained: Why It Never Stops / Why Can’t I Stop Scrolling? It Was Designed That Way | Thought of these? (one object by the hand) · in defense of being online · Time to lock in. | r1 5 · r2 6.5 · r3 6.9 · r4 6 (r4 fixes applied after) |
| 12-stop-scrolling-at-night | collage | how to stop scrolling at night | Why Your Phone Is So Hard to Put Down, Explained / How to Use Your Phone Less (Simple Settings That Help) | Time to lock in. (stickers + small labels) · alone in korea (lowercase serif) · new york city writing | r1 5 · r2 6.5 · r3 7 · r4 6.5 |
| 13-addictive-by-design | graphic | Phone addiction is by design | Why You Keep Picking Up Your Phone Without Thinking / Why Can’t I Stop Scrolling? It Was Designed That Way | her own database-indexes thumbnail (quality bar) · Jobs are dead (Pinterest, bold flat) · I CAN’T DO THIS | r1 8 · r2 8 · r3 8 · r4 8 |
| 14-make-your-phone-boring | graphic | Make your phone boring | How to Stop Scrolling: Phone Settings That Actually Help / How to Use Your Phone Less (Simple Settings That Help) | Before / After (Justin Sung) · Coding was hard until (before/after arrow) · her database-indexes thumbnail | r1 8 · r2 8 · r3 8 · r4 7.5 |
| 15-infinite-scroll-feels-addictive | graphic | Why infinite scroll feels addictive | Why Websites Got Rid of the "Next Page" Button / Why Can’t I Stop Scrolling? It Was Designed That Way | her database-indexes thumbnail (one drawn mechanism + cut-out) · div div div (repetition) · Two Sum (flat drawing) | r1 7 · r2 5.5 · r3 6.7 · r4 7 |
| 16-why-notifications-are-red | graphic | Why notifications are red | Why You Keep Picking Up Your Phone Without Thinking / Why Am I Addicted to My Phone? 5 Design Tricks to Blame | her database-indexes thumbnail (cut-out with outline) · stop lying to yourself (one red word) · 18+ THEY LIED TO US (one badge) | r1 7.5 · r2 7 · r3 7.8 · r4 7 |
| 17-five-tricks-apps-use | graphic | 5 tricks apps use on you | Why Can’t I Stop Scrolling? It Was Designed That Way / Phone Addiction Isn’t an Accident: The 5 Features Behind It | her database-indexes thumbnail (one mechanism, numbered) · Fitness sales framework · Space complexity of an algorithm | r1 7 · r2 7.5 · r3 8 · r4 7.5 |
| 18-before-after | other | Break your scrolling habit | How to Stop Scrolling: Phone Settings That Actually Help / How to Use Your Phone Less (Simple Settings That Help) | Before / After (Justin Sung) · Day 1 / Day 900 · 12:30 PM / 7:30 PM split | r1 7 · r2 8 · r3 7.3 · r4 7 |
| 19-eu-vs-addictive-apps | other | The EU vs addictive apps | Europe Says Infinite Scroll May Break the Law. Here’s Why / Instagram’s Addictive Design Explained: What Europe Found / Why Can’t I Stop Scrolling? It Was Designed That Way | her own ghana-marrify 10b edit (real document + highlight) · a paper screenshot (viral sample) · QUIT DATA NOW (tweet card) | r1 6 · r2 7 · r3 7.8 · r4 7.5 |
| 20-not-your-fault | other | Phone addiction isn’t your fault | Why Am I Addicted to My Phone? 5 Design Tricks to Blame / Why Can’t I Stop Scrolling? It Was Designed That Way | I QUIT (big face) · Never get distracted again (face + words) · It Clicked. (one line, one face) | r1 7.5 · r2 7.5 · r3 7 · r4 7.5 |

---

# phone-distraction thumbnails v2 (2026-10-16): the set to choose from

She could not use any v1 thumbnail ("not solid enough"). The bar is now **her own database-indexes thumbnail** (`inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png`, THUMBNAILS.md RULE −1): the topic in plain words, huge; one big literal drawing of the mechanism; few, big elements; lots of air; one accent; calm face. Not copied: no grid ground, no corner brackets, no pen tool. v1 (23 options) is in `archive/v1/` (PNGs in `outputs/thumbnails/archive-v1/`); dropped v2 rounds in `archive/v2-round*/`.

## Look
From the film's look A "Lock screen": ink #0C0D10, paper #F2EFE9, one accent badge red #FF4433, Inter Tight 800 (`lib/v2.css`), Newsreader italic as the one serif accent (07 "Just", 08 "by design", 03 "The End"). Two options use a different single accent where the colour is the idea: 04 (colourful icons vs grey) and 07 (the EU's blue and gold). Every phone, app icon and feed is a generic drawing (no real app, logo or UI). No ILLUSTRATION stamps.

## Her photo
No more video frames under the design (v1's dim room). One clean cut-out: **the last second of her recording (895.75 s), when she leans in to stop the camera: no microphone, mouth closed, calm**; macOS Vision cut-out (`studio/tools/cutout.swift`), then `tools/prep_cut.py` (black-and-white + red or white outline, colour version too) -> `assets/cut/`. Never flipped. Also cut: 895.9 s (glancing). Her own photos would still give more poses (holding her phone, at night).

## Edit and re-render
- Browser: http://localhost:7700/design/phone-distraction/thumbnails/ (text, photo, colours, drag).
- Source: `tools/gen2.py` writes `directions/<NN>/index.html` + `content.json` (keeps her studio edits unless `--reset`). Then `node render.mjs` (all + `overview.png`). Checks: `python3 tools/check.py` (words, no 3-word run from her transcript, titles 40-60 characters). Review sheets next to her thumbnail: `python3 tools/review2.py` -> `review/v2_640.jpg`, `review/v2_320.jpg`.

## The 8 options (scores: fresh cold critic vs her thumbnail, 8 = postable next to hers)
| # | Thumbnail text | Idea | Titles | R1 | R2 | R3 | R4 | R5 | R6 | Final |
|---|---|---|---|---|---|---|---|---|---|---|
| 06-just-5-minutes **(rec 1)** | Just 5 minutes? | 11:02 PM -> arrow -> a lock screen at 1:40 AM | Why You Can't Put Your Phone Down at Night / Why Your Phone Is So Hard to Put Down, Explained / Why Can't I Stop Scrolling? It Was Designed That Way | 7.5 | 6.5 | 6.5 | 8 | 8 | 8 | 7.5 |
| 04-make-it-boring **(rec 2)** | Make your phone boring | before/after: colourful home screen with red badges -> grey and quiet | How to Stop Scrolling: Phone Settings That Actually Help / How to Use Your Phone Less (Simple Settings That Help) | 7.5 | 7.5 | 7.5 | 7.5 | 7 | 8 | 7 |
| 01-slot-machine **(rec 3)** | Built like a slot machine | the phone as a slot machine (two hearts, a near miss, a lever) + her | How Apps Are Designed to Be Addictive, a Researcher Explains / Why Am I Addicted to My Phone? 5 Design Tricks to Blame / Phone Addiction Isn't an Accident: The 5 Features Behind It | 6.5 | 7 | 7 | 7.5 | 7.5 | 7.5 | 7.5 |
| 03-books-end | Books end. Feeds don't. | an open book on "The End" next to a feed running off the bottom | Infinite Scroll Explained: Why It Never Stops / Why Can't I Stop Scrolling? It Was Designed That Way / Why Websites Got Rid of the "Next Page" Button | | | | | | 7 | 7.5 |
| 08-addictive-by-design | Phone addiction is by design | full-bleed red, her face large, a phone with one 99+ app | How Apps Are Designed to Be Addictive, a Researcher Explains / Why Can't I Stop Scrolling? It Was Designed That Way / Why Am I Addicted to My Phone? 5 Design Tricks to Blame | 6.5 | 7 | 7.5 | 7.5 | 6 | 7.5 | 7 |
| 05-pull-refresh-repeat | Pull. Refresh. Repeat. | a pulled-down feed with a spinner inside one red loop arrow | Why Can't I Stop Scrolling? It Was Designed That Way / How Apps Are Designed to Be Addictive, a Researcher Explains / Why You Keep Picking Up Your Phone Without Thinking | 5.5 | 7 | 6.5 | 7.5 | 7.5 | 7.5 | 7 |
| 02-red-badge | Can you ignore this? | one giant app icon with a red 99+ badge + her | Why Every Notification Badge Is Red (Facebook's Was Blue) / Why You Keep Picking Up Your Phone Without Thinking / Why Am I Addicted to My Phone? 5 Design Tricks to Blame | 7 | 6.5 | 7 | 6.5 | 7.5 | 7 | 6.5 |
| 07-eu-vs-infinite-scroll | The EU vs infinite scroll | a phone inside the EU's ring of stars, a red line cutting its feed | Instagram's Addictive Design Explained: What Europe Found / Why TikTok and Instagram Are in Trouble With Europe | 5 | 6.5 | 5.5 | 7 | 6.5 | 5.5 | 6 |

Critic rounds: 7 fresh critics, none had seen the work or the video. Every round, the cold read from the image alone matched the topic for every option. Fixes after each round: one face treatment (black-and-white, red outline), light phone screens instead of grey wireframes, more grounds (paper, full-bleed red, blue), hook and loop drawings rebuilt, lever attached, intact star ring, straight apostrophes -> curly, no one-word last lines. Dropped along the way (in `archive/v2-round*/`): "Designed to hook you" (the hook never read as a hook), "Your feed is on trial", "Can't put your phone down?" (no mechanism), "5 tricks in every app" (a row of equal tiles: banned pattern), "How to stop scrolling" settings card (nothing happening), two "Why you can't stop scrolling" feeds.
**Honest result:** the critics put the best three at 8 in some rounds and 7.5 in others; nothing is a steady 8 yet. 07 (EU) is the weakest (6); keep it only for a news angle. What the critics still want: her face *with* the mechanism in one composition (01 does it), and more varied poses of her (her own photos would fix this).
Honesty: the blue badge story is "reportedly" (Tristan Harris, the Guardian 2017); the EU findings are preliminary ("vs", not "banned"); the EU stars are used as a news reference, not a logo on a product.

---

# phone-distraction thumbnails: notes (2026-10-13, design agent)

23 directions (1280x720), built from the strategist's 20 concepts (`kit/refined-kit.md` section 3) plus 3 extras, after THUMBNAILS.md (RULE 0 topic + literal picture, RULE 1 wording), three gate rounds and her references (`inspiration/viral-samples/` + `collage/`, `inspiration/pinterest-thumbnail/`). Own look: the approved film look A "Lock screen" (ink #0C0D10, badge red #FF4433, Inter Tight, notification cards) mixed with her Pinterest editorial (Newsreader serif, red-pen circles, paper clippings). Not started from any previous project.

## Edit and re-render
- **In the browser:** http://localhost:7700/design/phone-distraction/thumbnails/ (click text to edit, drag, colours, swap photos, Add photo, export).
- **Source:** `directions/<name>/index.html` + `content.json` (text, photo, colours, titles, scores, recommended). Shared look: `lib/pd.css`.
- **Generator:** `python3 tools/gen.py [prefix] [--reset]`, then `node render.mjs` (all + `overview.png`) or `node render.mjs 03`. Without `--reset` her studio edits are kept.
- **Checks:** `python3 tools/check.py` (1-5 words, no 3-word run from her transcript, 2-3 titles of 40-60 characters, no dashes or hype words); `python3 tools/review.py` (each at 640, 320x180 and 168x94 -> `review/review_sheet.png`).
- **Outputs:** `outputs/thumbnails/<name>.png` + `overview.png` (titles, scores, recommended first), copied to `~/Downloads/phone-distraction-thumbnails/`.

## Her photo
- Only frames from her recording (`kit/phone addiction.mov`, 4K), never flipped or retouched. The whole video was scanned at 2 fps (`tools/scan.sh`, `tools/expr.swift`: face, mouth and hand measures -> `review/expr.tsv`), 46 frames pulled at 4K (`tools/frames.json`, `tools/frames.sh`) and checked by eye for a closed mouth (`tools/faces.txt` = face boxes). The mouth measure is unreliable because the microphone covers the lips: always check by eye.
- Light warm grade, per her OK (`tools/warm.py`, same as ghana-marrify) on the frame and its person mask (`tools/cutout_full.swift`, macOS Vision), at 2560x1440: `assets/scene/warm/` and `assets/scene/warm/mask/` (`tools/prep.sh`).
- **She holds a green handheld microphone at her mouth in every frame.** Two cold critics said it reads as "a butter knife" at small size. Nothing we can do with video frames: **her own photos would lift most of these** (list below, also in `refined-kit.md` 3b).

## Photos to ask her for (marked "better with a new photo" in the overview)
1. Holding her phone up, screen to the camera (08, 12). 2. In bed or on the sofa at night, lit by the phone (01, 20). 3. Relaxed at her desk, phone face down (15). 4. Any photo of her at about 19 (14). 5. Any photo without the microphone (every photo-led one). Drop them in `projects/phone-distraction/assets/uploads/` or use Add photo in the editor.

## Honesty
- Every phone, app, website, settings card and video player is a generic drawing (no real app, logo or interface), labelled ILLUSTRATION (18 px mono).
- 13: the real European Commission headline of 10 Jul 2026 (`film/assets/sources/eu-meta.png`), re-set as a clipping with "addictive design" highlighted. No source line on the card, as in her ghana-marrify 10b edit; the source is here and in the description.
- 16: Loren Brichter's words to the Guardian (Paul Lewis, 5 Oct 2017): "Pull-to-refresh is addictive." (verified in BRIEF.md), credited on the card.
- 04 / titles C3: Facebook's blue badge is "reportedly" (Tristan Harris, the Guardian 2017).
- New titles written here (N1-N19 in `tools/gen.py`) say only what the video says.

## Gates (round 1 -> round 2 -> round 3)
- Round 1 (22): image-only cold critic, title-pair critic, taste critic. Cut "STILL NOTHING?" and "5 MINUTES LATER..." (meaningless cold; in `archive/thumbnails-round1/`). Fixed the mid-word frames, the clutter, the overlaps and the tiny labels. Added words behind her head, a real clipping (13), a real quote card (16) and serif options.
- Round 2 (22): scores below (A = what the video is about from the image alone, clarity/click; B = with its best title; C = taste against her references). Applied after it: 04 a lone red dot; 05 cut the label on the phone; 06 the word really behind her head; 10 no sub line; 13 no source line; 18-21 recomposed; titles swapped where B found a better pair; new 23 (the strongest idea with her face).
- Every hand-off check is in STATUS.md.

## Recommended
1. **03 MAKE IT BORING** + "How to Stop Scrolling: Phone Settings That Actually Help" (A 8/8, B 8.5, C 7: the clearest promise; 23 is the same with her face).
2. **22 IT'S NOT YOU.** + "Why Am I Addicted to My Phone? 5 Design Tricks to Blame" (A 8/8, B 9, the best pair in both rounds).
3. **20 picked it up again?** + "Why You Can't Put Your Phone Down at Night" (A 8/8, C 8, the most on-taste photo-led one; best of all with a night photo of her).
Runners-up: 13 EU vs THE ENDLESS FEED (news), 05 SLOT MACHINE IN YOUR POCKET (colour), 16 ITS INVENTOR SAID THIS, 10 4 SWITCHES (A 9/8).
For YouTube Test & Compare under one title, the strategist's main title S8 "Why Can't I Stop Scrolling? It Was Designed That Way" pairs well with 19, 08 and 01.

## All directions
| Direction | Concept | Words | Titles (first = best pair) | Scores (round 2) | Better with a new photo | Recommended |
|---|---|---|---|---|---|---|
| 01-1-40-am | TH19 | 1:40 AM. AGAIN. | Why You Can't Put Your Phone Down at Night<br>Why Can't I Stop Scrolling? It Was Designed That Way<br>Why You Can't Stop Scrolling: 5 Features Designed on Purpose | A topic (image only) 7/7 · B with best title 8.5 · C taste 6 (round 2; fixes from round 2 applied after) | her in bed or on the sofa at night, lit by the phone |  |
| 02-this-gesture | TH04 | THIS GESTURE | He Invented Pull-to-Refresh. Later He Called It Addictive<br>Pull-to-Refresh Explained: Why You Keep Pulling Down | A topic (image only) 6/6 · B with best title 8.5 · C taste 4 (round 2; fixes from round 2 applied after) |  |  |
| 03-make-it-boring | TH20 | MAKE IT BORING | How to Stop Scrolling: Phone Settings That Actually Help<br>How to Use Your Phone Less (Simple Settings That Help) | A topic (image only) 8/8 · B with best title 8.5 · C taste 7 (round 2; fixes from round 2 applied after) |  | 1 · pair with "How to Stop Scrolling: Phone Settings That Actually Help" |
| 04-why-this-dot | TH05 | WHY THIS DOT? | Why Every Notification Badge Is Red (Facebook's Was Blue)<br>Why Notifications Are Red, and Why You Can't Ignore Them | A topic (image only) 8/7 · B with best title 8.5 · C taste 5 (round 2; fixes from round 2 applied after) |  |  |
| 05-slot-machine | TH02 | SLOT MACHINE IN YOUR POCKET | How Apps Are Designed to Be Addictive, a Researcher Explains<br>Pull-to-Refresh Explained: Why You Keep Pulling Down | A topic (image only) 8/8 · B with best title 8.5 · C taste 7 (round 2; fixes from round 2 applied after) |  |  |
| 06-doomscrolling | new (sample 1 remake) | DOOMSCROLLING | Why Your Phone Is So Hard to Put Down, Explained<br>Why Am I Addicted to My Phone? 5 Design Tricks to Blame | A topic (image only) 8/6 · B with best title 7.5 · C taste 6 (round 2; fixes from round 2 applied after) |  |  |
| 07-set-up-to-scroll | TH07 | SET UP TO SCROLL | How Apps Are Designed to Be Addictive, a Researcher Explains<br>Why Am I Addicted to My Phone? 5 Design Tricks to Blame | A topic (image only) 7/7 · B with best title 8 · C taste 4 (round 2; fixes from round 2 applied after) |  |  |
| 08-feed-has-no-end | TH08 | THE FEED HAS NO END | Why Websites Got Rid of the "Next Page" Button<br>Why Can't I Stop Scrolling? It Was Designed That Way | A topic (image only) 7/6 · B with best title 8 · C taste 5 (round 2; fixes from round 2 applied after) | her holding her phone up, screen towards the camera |  |
| 09-they-removed-this | TH09 | THEY REMOVED THIS | Infinite Scroll Explained: Why It Never Stops<br>Why Websites Got Rid of the "Next Page" Button | A topic (image only) 7/7 · B with best title 8.5 · C taste 7 (round 2; fixes from round 2 applied after) |  |  |
| 10-four-switches | TH10 | 4 SWITCHES | How to Stop Scrolling: Phone Settings That Actually Help<br>How to Use Your Phone Less (Simple Settings That Help) | A topic (image only) 9/8 · B with best title 8.5 · C taste 6 (round 2; fixes from round 2 applied after) |  |  |
| 11-not-the-customer | TH11 | YOU'RE NOT THE CUSTOMER | Attention Economy Explained: Who Pays for Free Apps?<br>If the App Is Free, Who Pays? The Attention Economy | A topic (image only) 7/6 · B with best title 8.5 · C taste 5 (round 2; fixes from round 2 applied after) |  |  |
| 12-built-to-hook | TH12 | BUILT TO HOOK YOU | Why You Keep Picking Up Your Phone Without Thinking<br>Phone Addiction Isn't an Accident: The 5 Features Behind It | A topic (image only) 8/7 · B with best title 8.5 · C taste 6 (round 2; fixes from round 2 applied after) | her holding her phone up to the camera |  |
| 13-eu-vs-feed | TH13 | EU vs THE ENDLESS FEED | Instagram's Addictive Design Explained: What Europe Found<br>Europe Says Infinite Scroll May Break the Law. Here's Why | A topic (image only) 8/8 · B with best title 8 · C taste 7 (round 2; fixes from round 2 applied after) |  |  |
| 14-six-years-off | TH14 | 6 YEARS OFF THE APP | Why I Left Instagram at 19 (and the Rule I Use Now)<br>I Quit Instagram at 19. Here's My Rule for Social Media | A topic (image only) 7/7 · B with best title 8 · C taste 4 (round 2; fixes from round 2 applied after) | any photo of her at about 19 (for a then / now polaroid) |  |
| 15-turned-them-off | TH15 | ALL NOTIFICATIONS: OFF | Why I Keep My Phone Silent (and You Can Too)<br>How to Stop Scrolling: Phone Settings That Actually Help | A topic (image only) 7/5 · B with best title 7.5 · C taste 5 (round 2; fixes from round 2 applied after) | her relaxed at her desk, phone face down |  |
| 16-inventor-quote | new (TH04 as a quote) | ITS INVENTOR SAID THIS | Pull-to-Refresh Explained: Why You Keep Pulling Down<br>How Apps Are Designed to Be Addictive, a Researcher Explains | A topic (image only) 8/8 · B with best title 7.5 · C taste 7 (round 2; fixes from round 2 applied after) |  |  |
| 17-didnt-pick-this | TH17 | YOU DIDN'T PICK THIS | Autoplay Explained: Why the Next Video Starts on Its Own<br>Why You Keep Watching: Autoplay Decides for You | A topic (image only) 7/7 · B with best title 8.5 · C taste 4 (round 2; fixes from round 2 applied after) |  |  |
| 18-on-purpose | TH21 | ENDLESS, ON PURPOSE | Infinite Scroll Explained: Why Apps Removed the Last Page<br>Why Can't I Stop Scrolling? It Was Designed That Way | A topic (image only) 6/5 · B with best title 8 · C taste 6 (round 2; fixes from round 2 applied after) |  |  |
| 19-books-end | TH22 | BOOKS END. FEEDS DON'T. | Why Can't I Stop Scrolling? It Was Designed That Way<br>Why You Can't Stop Scrolling: 5 Features Designed on Purpose | A topic (image only) 8/7 · B with best title 8 · C taste 6 (round 2; fixes from round 2 applied after) |  |  |
| 20-picked-it-up | TH01 | picked it up again? | Why You Can't Put Your Phone Down at Night<br>Why Am I Addicted to My Phone? 5 Design Tricks to Blame | A topic (image only) 8/8 · B with best title 8 · C taste 8 (round 2; fixes from round 2 applied after) | her on the sofa at night, face lit by the phone | 3 · pair with "Why You Can't Put Your Phone Down at Night" (best photo-led; even better with a night photo of her) |
| 21-collage-five-tricks | extra (collage) | not an accident | Why You Can't Stop Scrolling: 5 Features Designed on Purpose<br>Why Am I Addicted to My Phone? 5 Design Tricks to Blame | A topic (image only) 5/5 · B with best title 7 · C taste 6 (round 2; fixes from round 2 applied after) |  |  |
| 22-not-you-lockscreen | extra (film look) | IT'S NOT YOU. | Why Am I Addicted to My Phone? 5 Design Tricks to Blame<br>Phone Addiction Isn't an Accident: The 5 Features Behind It | A topic (image only) 8/8 · B with best title 9 · C taste 7 (round 2; fixes from round 2 applied after) |  | 2 · pair with "Why Am I Addicted to My Phone? 5 Design Tricks to Blame" |
| 23-boring-with-her | TH20 + her | MAKE IT BORING | How to Use Your Phone Less (Simple Settings That Help)<br>How to Stop Scrolling: Phone Settings That Actually Help | new in round 3 (the face version of 03, asked for by gates A and C); not gated yet |  |  |

# Thumbnails, round 4 (ghana-marrify, 2026-10-06)

Built from the social strategist's 11 concepts in `../../kit/refined-kit.md` (section 2-3: T1-T11, each a title + a thumbnail
concept). Rules: `THUMBNAILS.md` RULE 0 (topic in plain words + a literal picture of it) and RULE 1 (no script phrases; the words are
the strategist's, already cold-tested). Round 3 (12 directions + PNGs + its notes) is in `../../archive/thumbnails-v3/`; rounds 1-2 in
`../../archive/thumbnails-v1/`, `thumbnails-v2-rejected/`, `thumbnails-v3-cut/`.

## Files
- **Edit in the browser:** http://localhost:7700/design/ghana-marrify/thumbnails/
- **Source:** `directions/<NN-name>/index.html` + `content.json` (text, photos, colours, the title + alternates, the critic scores).
  Shared parts: `lib/r4.css` (phone with free screen, record card, divorce decree, news clipping, polaroid) on top of `lib/r3.css`/`r2.css`.
- **Generator:** `python3 tools/gen4.py [01] [--reset]`, then `node render.mjs`. Without `--reset` her studio edits are kept.
- **Outputs:** `outputs/thumbnails/<NN-name>.png` + `overview.png` (titles, scores, recommended), copied to `~/Downloads/ghana-marrify-thumbnails/`.

## Her photo
- Only frames from her recording (`kit/ghana-marrify.mov`, 4K), never flipped, never retouched. 312 s scanned at 2 fps for
  expressions; new frames: 1:16, 1:58, 2:13, 2:45, 2:47, 2:59, 3:14, 4:33 (+ 0:46, 1:35, 4:02 from round 3). Person masks:
  `tools/cutout_full.swift`; face boxes: `tools/faces.swift` -> `tools/faces.txt`.
- **Warmed, per her OK:** `tools/warm.py` (one fixed grade for every frame: red up, green and blue down a touch in linear light,
  shadows lifted slightly; colour balance only), applied to the frame AND its mask so they stay identical:
  `assets/scene/warm/` and `assets/scene/warm/mask/`. The originals in `assets/scene/` are untouched. `lib/r4.css` adds a small
  brightness/contrast lift on both layers.
- **Much better with her own photo (flagged):** 01 (her holding a phone, or a ring box), 02 and 09 (her holding the phone out to the
  camera), 06 (chin on hand), 08 (her holding papers). Every taste critic, every round, named the single dim webcam room with skin
  shine as the ceiling. Drop photos into `projects/ghana-marrify/assets/uploads/` (or "Add photo" in the editor).

## Concept -> build
| Dir | Concept | Words | Main title (+ alternates in content.json) | Frame | Props |
|---|---|---|---|---|---|
| 01-before-you-say-yes | T10 (top 1) | BEFORE YOU / SAY YES | Is He Already Married? Ghana Built an App to Check | 3:14 side-eye, raised hand | proposal polaroid (stock); phone in her raised hand: [name] -> MARRIED |
| 02-type-a-name | T7 (top 2) | TYPE A / NAME. | Married? In Ghana, Anyone Can Now Look You Up | 2:45 eye contact | phone held out: [name] -> MARRIED, 2019 |
| 03-not-so-private | T9 (top 3) | not so / PRIVATE | Your Divorce, Searchable by Name? Ghana Just Did It | 2:13 wry, looking off | divorce decree (generic) pulled into a search bar |
| 04-taken-or-single | T1 | TAKEN OR / SINGLE? | You Can Now Check If Someone Is Married in Ghana | 2:47 side-eye | phone: 1 marriage on record |
| 05-before-the-wedding | T2 | BEFORE THE / WEDDING | Check If Someone Is Married: Ghana Now Has an App | 2:59 eyes to camera | search result she peers over: ALREADY MARRIED |
| 06-even-your-divorce | T3 | even your / DIVORCE | Ghana's Marriage Records Are Now Online. Should They Be? | 1:58 hands at chin | record card, DIVORCE line in red |
| 07-pastor-licensed | T4 | IS YOUR PASTOR / LICENSED? | Marrify: Ghana's App to Check If Someone Is Married | 0:46 finger up | phone: your pastor -> LICENSED ✓ |
| 08-anyone-can-open-it | T5 | MARRIAGE RECORDS: / OPEN TO ANYONE | Should Marriage Records Be Public? Ghana Just Made Them | 4:02 hands low | tied bundle of old paper files (stock) |
| 09-even-yours | T6 | EVEN / YOURS | Check Marital Status Online: Ghana's New App | 1:16 eye contact | phone to camera: [your name] -> MARRIED |
| 10-anyone-can-check | T8 | ANYONE / CAN CHECK | Ghana Made Marriages Searchable. Anyone Can Check Yours | 4:33 glance up | real Graphic Online headline, exact words cut with ellipses, credited |
| 11-married-divorced-public | T11 | MARRIED? / DIVORCED? / PUBLIC. | Ghana Put Marriage and Divorce Records Online. Good Idea? | 1:35 sceptical frown | record card, DIVORCE on record |

Changes from the concepts (each because a gate failed):
- **08** words "ANYONE CAN OPEN IT" -> "MARRIAGE RECORDS: OPEN TO ANYONE" (cold critic round 1: confidence 1/5, "open what?"). The
  phone was dropped (the bundle on a phone read as a layer error). Folder name kept so her studio links don't break.
- **05** the certificate became a printed search result stamped ALREADY MARRIED (round 1 read the certificate as "wedding paperwork",
  2/5). Her phone in the other hand was dropped: in that frame it could only float.
- **04** words behind her head (sample 1) were tried twice and hid "SINGLE"; set beside her face instead.
- **07** the concept's "she points at the phone": the 0:32 pointing frame has a red nail on her nose (read as a nosebleed in round 3),
  so 0:46 (finger up) is used. Phone row reads "Your pastor / LICENSED ✓".
- **11** main title is the kit's own softer variant (no "every"); the critic flagged "every" (records are still being uploaded).
- Not repeated: any angle from inside the video; any round 1-3 layout.

## Props, sources, licences
| File | What | Source | Licence |
|---|---|---|---|
| `assets/stock/proposal_hands.jpg` | hands holding an open ring box (brand name on the lid painted out with the box's own velvet) | https://www.pexels.com/photo/man-holding-box-with-engagement-ring-26811980/ | Pexels licence (free, no attribution) |
| `assets/stock/ringbox_black_cut.png` | the same box cut out (not used in the final set) | same | Pexels licence |
| `assets/stock/paper_bundles_cut.png` | tied bundles of old paper records, cut out | https://www.pexels.com/photo/7654125/ | Pexels licence |
| Graphic Online headline (10) | "App launched to help Ghanaians verify prospective partners' marital status before marriage", 3 Sep 2026; quoted exactly, cut with ellipses, credited on the card | `film/assets/sources/SOURCES.md` | quoted news headline, credited |
Phones, search bars, record cards, the decree and the search result are generic illustrations (labelled ILLUSTRATION), never Marrify's
interface; every name is "[name]" / "[your name]". No stock faces. No Marrify record pages, no real person's name.

## Gates (fresh critics, foreground, 3 rounds)
(a) cold, image only, at 1280 / 320×180 / 168×94 with a duration badge: "this video is about ___", topic confidence 1-5, click 1-10.
(b) thumbnail + its title in a mocked YouTube feed next to 6 of her viral samples: clarity / click, pass = 8/8.
(c) taste vs `inspiration/viral-samples/` + the Pinterest board, pass = 8.
Fixes between rounds: bigger faces, warmer + lifted grade, closed-mouth frames where one existed, phones cropped to one big result word,
grey filler bars removed, props moved out of the duration-badge corner, shorter quote, 08 + 05 reworked (above).

| Dir | (a) conf/click r1 · r2 · r3 | (b) clarity/click r1 · r2 · r3 | (c) taste r1 · r2 · r3 | Result |
|---|---|---|---|---|
| 01 before you say yes | 4/7 · 4/7 · 3/6 | 8/8 · 8/8 · 8/8 | 5 · 6 · 5 | **recommended** (topic + title gates) |
| 02 type a name | 3/6 · 2/4 · 3/6 | 7/7 · 8/7 · 8/7 | 5 · 5 · 5 | kept |
| 03 not so private | 3/6 · 3/5 · 4/7 | 8/8 · 8/8 · 8/8 | 5 · 6 · 5 | **recommended** |
| 04 taken or single | 4/7 · 2/5 · 2/5 | 9/7 · 9/7 · 9/7 | 7 · 6 · 6 | kept (reads as dating without its title) |
| 05 before the wedding | 2/4 · 4/7 · 5/8 | 7/6 · 9/8 · 9/7 | 5 · 5 · 5 | kept (passed (b) in round 2) |
| 06 even your divorce | 3/5 · 4/6 · 3/6 | 8/8 · 8/7 · 8/7 | 6 · 5 · 6 | kept |
| 07 pastor licensed | 4/5 · 4/6 · 4/6 | 5/6 · 6/5 · 6/6 | 6 · 6 · 6 | kept (critics: side feature, title mismatch) |
| 08 records open to anyone | 1/2 · 4/6 · 5/7 | 6/6 · 8/6 · 8/6 | 2 · 3 · 4 | kept (words changed, see above) |
| 09 even yours | 3/5 · 3/5 · 3/6 | 7/6 · 7/6 · 7/7 | 5 · 5 · 5 | kept |
| 10 anyone can check | 5/8 · 4/7 · 4/7 | 8/7 · 7/6 · 7/6 | 6.5 · 7 · 6.5 | kept (thumbnail repeats its title's "anyone can check") |
| 11 married divorced public | 4/6 · 5/8 · 5/8 | 9/8 · 9/8 · 9/8 | 7 · 7 · 7 | **recommended**, the critics' favourite overall |

**Topic gate:** every thumbnail, every round, was read as some form of "Ghana / a lookup shows whether someone is married or divorced"
(08 only from round 2, after its words changed), so none was archived. **Taste gate: none reached 8** (best 7). The critics agree why:
one dim webcam room in all 11, skin shine, mid-word mouths in most frames, and flat illustrated props; several layouts share the
condensed-caps-top-left formula. Last-round fixes after the round-3 critics (not re-scored): 04's phone and 11's card moved out of the
duration-badge corner, 05's card nudged left.

## Recommended for Test & Compare
**01 "BEFORE YOU SAY YES" + 03 "not so PRIVATE" + 11 "MARRIED? DIVORCED? PUBLIC."**, all three under
**"You Can Now Check If Someone Is Married in Ghana"** (T1, the strategist's Test & Compare title; repeats none of the three).
Three different doors: dating (01), divorce privacy (03), public status (11). Round-3 title critic's alternative: a new title
"Ghana Now Lets Anyone Look Up Your Marriage Record" (not from the kit; her call).
If only one: T10 title "Is He Already Married? Ghana Built an App to Check" + 01.

## Questions for her
- Her own photos (bright, sharp): holding her phone up and side-eyeing it; holding it out to the camera; chin on hand; holding a
  small box or papers. These would lift every thumbnail past the taste bar.
- "he" vs "your partner" in T10's title.
- Is the relationship door (01, 04, 05) OK, given the video is half about privacy? 03 and 11 are the privacy doors.

## Remakes of her viral samples (2026-10-06)
Her request: "Take each of these designs I shared with you and just use each of them." Eight one-to-one remakes
(`directions/R1-…` to `R9-…`; sample 6, the 503 screenshot, is not a thumbnail). Per-sample spec (KEEP / CHANGE, measured
positions and sizes): `REMAKES.md`. The 11 round-4 directions are untouched. Overview: remakes first, each next to its sample;
`outputs/thumbnails/remakes_side_by_side.png` shows sample | remake per row.

| Remake | Sample | Words | Titles (1 = recommended) | Faithful r1 · r2 · r3 | Cold read (r3, remake alone) | Click r3 |
|---|---|---|---|---|---|---|
| R1 marriage records | 1 | MARRIAGE RECORDS | 1 You Can Now Check If Someone Is Married in Ghana · 2 Is He Already Married? Ghana Built an App to Check · 3 Married? In Ghana, Anyone Can Now Look You Up | 7 · 7 · 7 | "marriage records… whose? why?" | 4 |
| R2 anyone can check | 2 | Married? Anyone can check. | 1 Ghana's Marriage Records Are Now Online. Should They Be? · 2 Should Marriage Records Be Public? Ghana Just Made Them · 3 Ghana Put Marriage and Divorce Records Online. Good Idea? | 8 · 8 · 8 | "anyone can look up whether someone is married" | 6 |
| R3 marriage checker | 3 | GHANA MARRIAGE CHECKER | 1 Married? In Ghana, Anyone Can Now Look You Up · 2 Is He Already Married? Ghana Built an App to Check · 3 You Can Now Check If Someone Is Married in Ghana | 7 · 8 · 9 | "a tool to check if someone in Ghana is married" | 6-7 |
| R4 searchable | 4 | your marriage is searchable | 1 You Can Now Check If Someone Is Married in Ghana · 2 Ghana's Marriage Records Are Now Online. Should They Be? · 3 Ghana Put Marriage and Divorce Records Online. Good Idea? | 8 · 8 · 8 | "your marriage records are public and searchable online" | 6-7 |
| R5 how to check | 5 | how to check if someone is **married** | 1 Is He Already Married? Ghana Built an App to Check · 2 Married? In Ghana, Anyone Can Now Look You Up · 3 Ghana Made Marriages Searchable. Anyone Can Check Yours | 6 · 6 · 7 | "how to check if someone is married" | 7 |
| R7 marriage app collage | 7 | Ghana's new MARRIAGE APP | 1 You Can Now Check If Someone Is Married in Ghana · 2 Should Marriage Records Be Public? Ghana Just Made Them · 3 Ghana Put Marriage and Divorce Records Online. Good Idea? | 7 · 8 · 8 | "Ghana's new app for checking a partner's marital status, plus her take" | 7 |
| R8 plain frame | 8 | (none: the title carries it, like the sample) | 1 You Can Now Check If Someone Is Married in Ghana · 2 Is He Already Married? Ghana Built an App to Check · 3 Married? In Ghana, Anyone Can Now Look You Up | 7 · 9 · 9 | "nothing, a woman talking" (by design) | 2-3 |
| R9 married or divorced | 9 | Married or divorced? | 1 You Can Now Check If Someone Is Married in Ghana · 2 Marrify: Ghana's App to Check If Someone Is Married · 3 Check Marital Status Online: Ghana's New App | 6 · 8 · 8 | "finding out whether someone is married or divorced (Ghana)" | 6 |

Gates: a fresh critic each round (3 rounds, foreground), not told the topic, looked at each remake alone first and then
beside its sample. Topic gate: 7 of 8 read as "checking whether someone is married (in Ghana)"; R1 reads only as "marriage
records" (weak), R8 says nothing on its own, exactly like her sample 8 (a plain frame; the title does the work).
Faithfulness ≥ 8 in round 3: R2, R3, R4, R7, R8, R9. **R1 and R5 stayed at 7** after 3 rounds. Their round-3 fixes were
applied but not re-scored: R1's certificates now tumble at mixed angles like the bills; R5 lowered 56 px so "married" reads.
R1's face hides "CO" of RECORDS (her head sits where the sample's head hides "ER" of LITERACY).
Critics' click ranking: R7 = R5 > R3 = R4 = R2 = R9 > R1 > R8. Best remakes to show her first: **R7, R5, R3**.
Not done (her rules): no relighting or smoothing of her face (critics asked for +15 % exposure); no mic added in R8.
Fixes between rounds: cleaner cut-out matte for R3 (gentle at the hair, strict at the body, chair ghost gone), sizes and
positions matched to the measured samples, the news tile cropped to the headline with the Graphic logo and photo hidden,
pixel words clipped to their notes, R2's grid removed, R4's chart labels raised to 20 px and its phone redrawn.

Extra assets for the remakes:
| File | What | Source | Licence |
|---|---|---|---|
| `assets/stock/bright_room.jpg` | bright white room with a window and plants (R5 background, blurred) | https://www.pexels.com/photo/interior-of-a-living-room-7836571/ | Pexels licence |
| `assets/stock/file_stack_cut.png` | stack of old files, cut out (Vision) from `file_stack.jpg` (already recorded above) | as `file_stack.jpg` | Pexels licence |
| `assets/samples/s*.jpg` | her viral samples cropped out of the YouTube UI, for side-by-side review only (never published) | `inspiration/viral-samples/` | reference only |
| `assets/scene/s_92.90/117.60/123.40/87.10/128.10` | new frames from her recording (+ warm copies and person masks) | `kit/ghana-marrify.mov` | hers |
Fonts added (OFL): Montserrat, Inter, IM Fell English (+SC), Patrick Hand, Kalam, Gochi Hand (`fonts/LICENSES.txt`).
Code: `lib/rm.css`, `lib/rm.js` (pixelated words), `tools/remakes_sheet.py`; `lib/bind.js` gained an optional `window.__extra` hook.

**2026-10-06, her edit of 10 -> `10b-verify-marital-status`** (10 untouched): she loved 10's newspaper clipping; asked to remove "Graphic Online" and the date, make it "verify marital status online" with "marital status" highlighted, remove "Anyone can check", put it on a white background with 09's phone on the other side. Done: white ground, no photo; clipping (no source/date, no quote marks/ellipses, tape corners, -2.5deg) reads "You can now verify *marital status* online"; 09's phone (illustration) on the right, 6deg. Titles: "You Can Now Check If Someone Is Married in Ghana" first, then 10's. Highlight uses a hard-stop background so it does not cover the descender of "verify". overview.png rebuilt (no other direction re-rendered).

# Style study: what Gbemi picked in the galleries (2026-10-02)

This is for the ghana-marrify motion film's new look. The v1 style frames were in the reading-stack deck style, and she turned them down: "No two videos must look the same… the whole vibe of the video has to be different."

- **Inputs:** her two screen recordings, `inspiration/Screen Recording 2026-10-01 at 23.46.49.mov` (41 s) and `…23.48.55.mov` (63 s). Both are 1434×1214, 100 fps, with **no audio track**, so there is no narration to transcribe.
- **References:** downloaded to `inspiration/refs/{skillry,whatships}/` (total ≈ 475 MB, all short).
- **Contact sheets:** `inspiration/refs/sheets/<name>.jpg`, 30 frames with timestamps. The sheet of her picks is `sheets/_HER_PICKS.jpg`.
- **Cuts:** cut lists are in `sheets/_cuts.txt`.
- **Tools:**
  - `refs/tools/study.py` finds cuts from frame-diff spikes and makes the sheets.
  - `refs/tools/palette.py` samples the modal ground and accent colours.

## 1. What she watched (how we know)

**Recording 1 (23.46.49): skillry.dev/ai-videos/opus-5-5.** The page autoplays card previews on hover. The browser status bar (bottom left) shows the link under her pointer. The URLs she hovered, from a 2 fps strip of the status bar (`sheets` not kept; reproducible), were:

| Hovered (time in recording) | Card | File |
|---|---|---|
| 0:00-0:02, 0:05-0:07, 0:11-0:13, 0:17-0:19 (four returns) | **itsahmedharoon-544194**, "The Electricity Trap" (explainer, 41 s) | `refs/skillry/itsahmedharoon-544194.mp4` |
| 0:02-0:03, 0:08-0:09 | **petert-635793**, 3D yuzu can ad (9:16) | `refs/skillry/petert-635793.mp4` |
| 0:24-0:26, 0:31-0:33 | **vince-builds-355650**, DesignLoop "Bring people together" (56 s) | `refs/skillry/vince-builds-355650.mp4` |
| 0:14-0:15, 0:21-0:22 | stokebuilder-356793 (LegalQuants paper filter), georgejimenez98-431559 (Crealix) | both in `refs/skillry/` |
| 0:27-0:41 (scrolling) | petert-540960 / 350098, kingokings-992769, chapi13-131449, papaneco-life-541187 | in `refs/skillry/` (glance only) |

**Recording 2 (23.48.55): whatships.com.** Hovering a tile shows its handle and duration badge (for example "@chrispicket… 0:57", "@kbcspace 0:24"). Her picks are below, in order of dwell:

| Dwell | Video | Notes | File |
|---|---|---|---|
| **0:44-0:51 (≈7 s, longest, pointer parked on the tile)** | **OpenAI, "Get ready"** (12 s, 10 M views) | **the eyelid faces** | `refs/whatships/openai-get-ready.mp4` |
| 0:13-0:15 | **Cue (Manus)**, "its own computer" (75 s) | mascots with blinking eyes, white ground, people as characters | `refs/whatships/cue.mp4` |
| 0:00-0:05 | **Introducing OpenAI's Dots × Orthogonal** (57 s) | blob characters with eyes + real photos of a person + clean white UI | `refs/whatships/orthogonal-dots.mp4` |
| 0:57-1:03 (≈6 s, end of recording) | **An all-new Google homepage** (24 s) | phone on white | `refs/whatships/google-homepage.mp4` |
| 0:23-0:24 | Magnific × Claude Sonnet 5.5 | photo-led, big type over people | `refs/whatships/magnific-claude-sonnet-5-5.mp4` |
| 0:13, 0:21 | P37 Neuro | white, icons orbiting a sentence | `refs/whatships/p37-neuro.mp4` |
| 0:14 | Claude Opus 5.5 for launch videos (Motion) | warm off-white, orange pills | `refs/whatships/motion-opus-5-5.mp4` |
| 0:25-0:35 (scroll stops) | Cursor /visualize, Figma Dev Mode, ElevenLabs × Runway, Headphone (1) Pro, Ideogram 4.5, Higgsfield, mtioon, jevgrep | glances | `refs/whatships/` |

**Her words:** "always like a clear background", "look at all the motion", "bring people together", "the eyelid effects, the moving, the motion". These map cleanly onto the picks:

- **Clear background:** Cue, Orthogonal, Google, P37, Motion, DesignLoop are all `#F4F4F4`-`#FCFCFC` white grounds.
- **Bring people together:** DesignLoop's headline is literally "Bring people together." Cue puts its agents "in a group chat". Orthogonal mixes characters with a real person.
- **Eyelid effects:** OpenAI "Get ready", plus the Cue/Orthogonal eye blinks.

## 2. "Eyelid effects": what it is, precisely

**OpenAI "Get ready"** (12 s, 60 fps, 1920×1080, black ground `#040404`, faces `#DCDCDC`, then green `#14D44C`, purple `#8C3CEC`, orange `#F46C1C`, blue, grey). Strips: `sheets/_EYELID_openai_0-4.8s_10fps.jpg`.

1. **0.00-0.70 s, the pull-back reveal.** It opens *inside* a face: the frame is full grey with two huge `*` glyphs (the eyes). The camera pulls back hard. The face's diameter, measured as a share of the frame width, is 100 % until 0.12 s, then 82 % at 0.15 s, 66 % at 0.20 s, 61 %, 57 %, 55 %, and 50 % at 0.35 s, ending at 35 % at 1.5 s. That is a big jump then a long soft settle: classic arrive-fast/land-soft.
2. **0.7-1.5 s.** The face drifts left and turns. The eyes slide out of frame and back, so the face rotates under its eyes (one eye at a time disappears behind the edge of the circle).
3. **1.5-2.5 s, the blink sequence.** The eyes are **typographic glyphs that swap hard, frame-cut, with no tween.** `* *` → `– –` (lids closed, 1.6-1.8 s) → `o o` (wide open, 1.9-2.1 s) → `> <` (squeeze, 2.2-2.4 s) → `* *`. Each state holds about 0.3 s.
   - The left and right eye flip **1 frame apart** (60 fps), which makes it feel alive rather than mechanical.
4. **2.4-4.4 s, people brought together.** More faces (purple `o o`, orange `/ /`, green `+ +`, black `^ ^`, blue `> <`) slide in from every edge until they pack against each other edge-to-edge, like a crowd. Each blinks on its own clock.
5. **4.4-4.8 s.** The whole crowd scales down to dots and vanishes.
6. **5.0-7.0 s.** The text "1 day. 20+ launches." assembles from orange dots (particle-to-glyph). Then "OpenAI DevDay [2026]" glitch-types in.

**Cue (Manus)** and **Orthogonal** use the softer version: cartoon eyes (white sclera, black pupil) on flat coloured shapes. Strip: `sheets/_EYELID_cue_blink_6.3s_20fps.jpg`.

- **Blink:** the white of the eye squashes vertically (scaleY 1 → ~0.15) in **2 frames**, holds 1 frame, and reopens in 3 frames.
- **Pupils:** they dart toward whatever just appeared, such as a new card or the next mascot.
- **Pop-in:** mascots pop in with overshoot. On Cue's first mascot, measured pixel area went 0 → 181 → 369 → 494 → **542 (peak, +60 %)** → 532 → 463 → 397 → … → 340 (rest). That is a spring with roughly 1.5 overshoot cycles over 0.5 s.
- **Ground:** `#F4F4F4`.

So, **"the eyelid effect" = characters and objects that look, blink and react** (eyes closing to a line, opening wide, squeezing), and **the camera opening from inside an eye/face**. A third reading we turned into a transition: **lids that close over the whole frame and open on the next scene**. This is our extrapolation, built in direction A, not something in the references.

## 3. Frame studies of the main picks (cuts = frame-diff spikes > 3× neighbours)

| Pick | Cuts / median shot | Ground (sampled) | Accents | Type | Motion signature | People | Sound (not studied: none of her picks were heard; recordings are silent) |
|---|---|---|---|---|---|---|---|
| **OpenAI Get ready** (12 s) | 0 hard cuts: one continuous take | `#040404` (opens on `#DCDCDC` face) | `#14D44C` `#8C3CEC` `#F46C1C` + blue | small grotesk, centred, tiny (5 % of height) | camera inside a face then pull-back; glyph-eye swaps; crowd packing; dot-to-text | faces as abstract circles with glyph eyes | — |
| **Cue** (75 s) | 6 cuts, median 6.3 s | `#F4F4F4` | blue `#3D8BF2`-ish, red, yellow `#F4BC04`, purple `#8C54F4`, brown `#AC6C4C` | big medium-weight grotesk, one word in blue ("AI agents", "its own", "you say so") | mascots pop with overshoot, blink, look at each other; UI cards (phone, email) slide in beside them; type-on of an email address | each agent = a mascot with eyes, and a group chat brings them together | — |
| **Orthogonal × dots** (57 s) | 21 cuts, median 1.9 s | `#FCFCFC` | blob colours (orange, blue, purple, green) | small, quiet UI type | blobs with eyes bounce around a logo; real photo of a person (desk, night) then cut to UI; cards fan in 3D; table rows cascade | **a real person's photos** between UI scenes | — |
| **vince_builds DesignLoop** (56 s) | 1 cut: one take with camera moves | `#F4FCF4` to `#FCF4E4`, pale mint/cream | mint `#9CECD4` highlight, dark green button | serif display ("Bring people together.") + small sans captions under each move | cursor with a name tag "You" / "Alex" (multiplayer), highlight a headline → comment card → board; camera pushes into the page and pulls back; before/after cards side by side | named cursors = people collaborating | — |
| **Motion "Opus 5.5 for launch videos"** (30 s) | 1 cut | `#ECECE4` / `#F4F4EC` | orange-red `#EC340C`, blue `#0C5CF4` | light serif + medium sans, words in orange pills | big red "+" button pressed by a big cursor; icons burst in a ring; "422 Tools" | — | — |
| **itsahmedharoon Electricity Trap** (41 s, 4 hovers) | 0 cuts | `#0C140C` near-black with faint grid | red `#EC3C1C` only | heavy grotesk + mono labels; huge counting number | numbers count (21,592 → 49,651 MW); icon grid fills; stepped line chart draws; underline under "expensive" | none | — |
| **stokebuilder LegalQuants** (16 s) | 1 cut | grey halftone `#5A5A5A`-ish | none (b/w) | bold sans, stamps "90 % HIT", "FIRST FILTER" | papers stream past a machine; a paper is pulled out, stamped; speed lines; a sieve | none | — |
| **Google homepage** (24 s) | 0 cuts | `#FCFCFC` | from the app content | n/a | phone centred, content scrolls, cards expand | n/a | — |
| **P37 Neuro** (16 s) | 0 cuts | `#FCFCFC` | none | small medium sans | type-on in a pill; words roll up like a slot; icons orbit a sentence and highlight in turn; logo morph | — | — |
| **petert yuzu can** (24 s, 9:16) | 1 cut | dusk gradient / yellow rays | — | Japanese bold | 3D can turns, lid pops, slices fly | — | (3D + gradients: off her taste; she probably liked the motion, not the look) |

Also downloaded for comparison (not her picks; same vein: clean ground, people, explainer):

- **Skillry:** wustep-884086 "Column permissions" (Notion: locked columns, "Who sees salary?", doodle avatars), sachaarbonel-673648, amitsingha89-780553, lepadev-475414, danilowm-412022, leadnotifi-960983, shushant-l-619370, joao-felixl-809438, thayto-dev-739735, codestackr-328129, andginja-618685, 1littlecoder-914649, acoramaa-248467 ("magic eye", 9-blade iris), moritzkremb-466494, rpa-dake-593915, itsyashf-692347, daniel-haida-636937, djadkison-394122, itakahashikun-990109, piyushaaryan2-196586, tejasthange3-128242, ambiguous-ai-505873, kingokings-992769, chapi13-131449 ("Every app wants your data", privacy), papaneco-life-541187.
- **whatships:** treg-people-search, umbra-privacy, raindrop-pii-guard-2-0, nabil-record-of-why, x-numbers, commons, tempo-health, team-bots (Grok bots with eyes), okara-dots, space-infinite, wabi-2, open-analytics, wonder-intro, figma-draw, ideogram-4-5, higgsfield, mtioon, jevgrep, cursor-visualize, figma-dev-mode, elevenlabs-v4-runway, headphone-1-pro.

The most relevant of these are **wustep "Column permissions"** (privacy as locked columns, and literally "Who sees salary?", the same question as her access levels) and **team-bots** (eyed blob avatars on pastel grounds).

## 4. What makes them feel different from the reading-stack film

| Reading-stack (v2/v3, and the turned-down ghana v1 frames) | Her picks |
|---|---|
| Flat paper `#EDE9E2` / ink `#111114` / full-bleed blue, orange and green grounds, **hard cuts between grounds** | **One white or near-white world** (`#F4F4F4`-`#FCFCFC`) for the whole film; colour lives in *objects*, not grounds |
| Huge heavy uppercase display (Bricolage 800), DM Mono labels, Instrument Serif italic word | Medium-weight sentence-case grotesk, **small** (headline ≈ 5-9 % of frame height); one coloured word; almost no mono |
| Slides: one statement per frame, polaroids, numbered lists | **Continuous takes**: a camera that travels across one world (DesignLoop, P37, OpenAI 0 cuts) |
| Type is the design | **Characters and people are the design**: things with eyes, named cursors, real photos of people |
| Motion = type-on, blur-to-sharp, whips | Motion = **springs with visible overshoot** (pop +60 %), blinks, glances, crowds converging, cursor actions (click, highlight, drag) |

## 5. KEEP vs CHANGE

**KEEP (from the refs):**
- White/near-white clear ground.
- Springy pops with one overshoot.
- **Eyes** that blink (2-frame close, 1 hold, 3-frame open), dart toward the new thing, and react.
- The camera opening from inside an eye and pulling back (big first jump, long soft settle).
- Continuous camera through one world.
- Named multiplayer cursors as people.
- Crowd converging and packing.
- Small, quiet sentence-case headlines with one coloured word.
- Real photos of a person between diagrams.
- Locked columns as access control (wustep).
- Stamps on paper (stokebuilder).

**CHANGE:**
- Never reuse their mascots, logos, glyph faces, music or people. Our characters are our own shapes, our cursors carry her name.
- Their black OpenAI ground stays out: her taste and her words are "clear background".
- No 3D renders, gradients, glows or halftone noise (petert, stokebuilder, Crealix are off her taste).
- Her real face (never flipped) and real screenshots replace their stock photos.
- Readability: our headlines are bigger than theirs (≥ 62 px at 1080p) because hers are explainer sentences, not launch taglines.

## 6. The three directions built from this

See `film/stills/directions/README.md` (concept, palette, type, signature transition, frames, motion tests, critic scores).

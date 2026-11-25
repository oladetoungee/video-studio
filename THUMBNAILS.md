# Thumbnail playbook (read before making ANY thumbnail)

## 2026-11-09: START HERE: `inspiration/know-how/THUMBNAIL-STUDY.md` (what her 140+ saved thumbnails do) + her likes on the boards
(studio `/ideas/boards/thumbnails/`, `/ideas/boards/design/`; `inspiration/boards/*/picks.json`). Write the PAIR (picture + 1-5 words a
stranger understands + a title that adds the story) before any design. No labels on things. Photos: her shoot, `library/her-photos/shoot-2026-10-29/`.

## READ THIS FIRST: every rule below adds up; a new sample never cancels an old rule (her correction, 2026-10-16)
She sent one sample (her own database-indexes thumbnail) and we turned it into a template: every option became a flat
background with her small black-and-white cut-out, and script-like phrases came back ("Built like a slot machine", "Books end.
Feeds don't.", "Pull. Refresh. Repeat.", "Can you ignore this?", "Just 5 minutes?"). Her words: "Because I give one more
feedback doesn't mean we should dismiss every feedback we've had so far… stop being so one way." So:
- **A new sample raises the QUALITY bar. It is never the new template.** Keep everything below (RULE 0, RULE 1, her references,
  collage style, photo-led options, flat options) at the same time.
- **Every set is a MIX of kinds** (her rule since 10-06, restated 10-16: "it doesn't have to be a specific type… it should be all
  kinds, we should try to be creative"). In each set of 10-20, roughly: ~40 % her photo as the background (her in a real, well-lit
  scene, text woven into the photo, props/annotations on it), ~20 % collage over her full photo (10-07 style), ~25 % graphic /
  flat ground with a drawn idea (like her sample), ~15 % something else (split before/after, a real screenshot or document, no
  face). Her picture is used in different ways: full background, medium in the scene, cut-out with outline, colour AND B&W.
  No two options share a layout. Check the mix by counting before the critic round.
- **Wording gate before any design** (RULE 1): write every option's text first; a cold reader who knows nothing about the video
  must say the topic from the text alone. A metaphor or a line that only makes sense after watching fails, however clever.

## NEXT FOCUS (her note 2026-11-08): she is NOT satisfied with our thumbnails. Learn the "pronounced" look of AI thumbnails
Refs: `inspiration/youtube-thumbnail/ai-pronounced-2026-11-08/` (two Google-image screens of AI thumbnails; `flyer-before-original-photo.png` = a soft phone photo, `flyer-after-enhanced.png` = the same man in a flyer, suddenly crisp and "pronounced").
Her words: "they always look so bold and pronounced… even if the picture is not sharp, they make it really sharp… we can get lessons from this… not to say I want AI thumbnails, so many colours… but the pronouncing, the way it pronounces things, works."
TAKE: the subject treatment only — upscaled + face-restored (crisp eyes, skin texture, hair edges), strong local contrast / clarity, clean cut-out edge that separates her from the background (light edge / rim light, darker or simpler background behind), relit face (bright, even, warm), saturated but natural skin, big face (40-60 % of the height), expression readable at phone size.
DON'T TAKE: rainbow colours, neon/glow everywhere, fake 3D clutter, obvious AI faces; her flat bold design rules + type sets still apply; never change her identity (no face reshaping, no skin smoothing to plastic, never flip).
Tools to try (research first, then test on `library/her-photos/` + video frames): AI upscale + face restore (Real-ESRGAN / GFPGAN / CodeFormer, e.g. realesrgan-ncnn-vulkan on Mac, or Upscayl), relight (IC-Light / Clipdrop relight), Canva (connected: remove-background, generate) / Photoroom, plus Core Image (local contrast, unsharp mask) in `studio/tools/cutout.swift`'s pipeline. Build it as a studio "Enhance photo" step so every thumbnail photo goes through it; show her before/after on 3-4 of her photos before redoing any set.
**Status 2026-11-08 (night):** first version built: `studio/tools/enhance.swift` (offline, Vision + Core Image; compiled to `studio/.cache/enhance`): cool-cast fix, upscale (Lanczos), shadow lift, clarity, detail sharpen, face relight, thin rim on her outline (off for tiny photos), background calm/dark/keep, optional enhanced cut-out. Before/after on 4 photos: `library/her-photos/_review/enhance-before-after.jpg`; results in `library/her-photos/enhanced/`. Limit: tiny/soft photos (e.g. a 427 px upload) stay soft without an AI upscaler. Real-ESRGAN (realesrgan-ncnn-vulkan macOS, downloaded to the session scratchpad) was blocked by the Claude Code auto-mode safety check twice, even after she said to allow it; needs a permission rule or her running it once. v1 skin looked "weird" to her (gritty/orange) → v2 leaves skin natural (FEEDBACK.md 2026-11-08 night). Waiting on her verdict on v2 (too strong / right / more) before wiring it into the studio photo picker and redoing any thumbnail set.

## Her own thumbnail: the QUALITY bar (2026-10-16, database-indexes)
She could not use any of our 26 and made her own from our parts: `inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png`.
Copy its **qualities**, not its layout, ground or the way her picture is placed:
1. The text is the **topic name**, plain and huge ("Database Indexes"): a stranger knows the subject instantly.
2. **One clear idea**, drawn big and literally (book index → arrow → table row): elements relate, a natural reading path. It feels
   flowy, not forced.
3. **Few, big, readable elements**, lots of air, one accent colour, polished. Ours failed by stacking 6-12 small labels / UI bits
   on a dim, cluttered frame of her room. A photo background is fine; a muddy, crowded one is not.
4. Calm, closed-mouth face.


**Her second own thumbnail (2026-10-17, ux-research):** `inspiration/youtube-thumbnail/her-own/ux-research_her-thumbnail.png`.
She took our option 13's parts (sticky note "Where's my Order?" → yellow arrow → phone "On its way! / Track order") and put them on
**her own photo as the full background**: her room, **washed in one colour (deep green)** so the busy room turns calm, she in full colour in
the middle, **gesturing at the phone** (palm up under it). Text = the topic name only, "UX RESEARCH", huge, in a tall condensed display
face, yellow, across the whole top. Three big objects, one arrow, nothing else. Proof that photo-led works when the photo is calmed
(one-colour wash) and the props are few and huge, and that she reuses our strongest drawn idea: build ideas as reusable parts.

## RULE 0: THE THUMBNAIL ALONE MUST SAY WHAT THE VIDEO IS ABOUT (2026-10-06, after she rejected 18 thumbnails)
Her words: "I don't watch any of those videos, but just by the thumbnails I have an idea of what the video is about… You're taking a random point in the video and trying to make the thumbnail out of it… the YouTube video script is completely independent of what people see on the timeline. None of what we have done passes."
- **Method of every reference on her board: TOPIC in plain words + a LITERAL picture of the topic.** "Capsule wardrobe" + clothes; "Financial literacy" + money; "I quit my job" + a box of desk things; "Jobs are dead / skills aren't" + a robot; "How to be consistent" + studying among books; "Everything done by 2pm" + a checklist; "Fitness sales framework" + the framework drawn; "Writing a book" + her writing. The person is shown DOING or HOLDING the topic.
- So: first write the video's topic as a stranger would search or recognise it (ghana-marrify: "Ghana launched an app to check if someone is married"). The thumbnail text names that topic or its plainest hook; the image shows the topic's objects (rings, a marriage certificate, a phone showing a marriage search, the Ghana flag), with her reacting to or holding them.
- **Never an angle from inside the video** ("too public?", "who looked you up?", "as an African / as a researcher", "Estonia vs Ghana" for a video that is about Ghana's app). Angles go in the title at most.
- **Gate (mandatory):** a cold critic sees ONLY the thumbnail (no title) and must write what the video is about in one sentence. If that sentence doesn't match the topic, the thumbnail fails, whatever it looks like. Then the same with the title paired.
- Stock photos/objects with free licences (Pexels, Unsplash) are fine for props (rings, certificate, phone, wedding imagery), recorded in NOTES.md; never imply a real person in a stock photo is in a record.

## Style she asked for (2026-10-07): collage over the creator
Samples in `inspiration/viral-samples/collage/` ("Time to lock in.", "How to be Feminine", "Capsule wardrobe", "in defense of being online", "Thought of these?"): a **full, natural photo of the creator** in her room (not a tight cut-out), **small cut-out photos of objects floating on top** around her (books, flowers, shoes, coffee, a notebook), **one big elegant serif line** across the middle naming the topic, plus **2-4 tiny secondary labels** scattered ("New years goals", "Manifest your goals"). She now shares **her own photos** for thumbnails (reading-stack: `assets/uploads/gbemi-photo-*.png`); prefer them over video frames.

## RULE 1: THE WORDING (her biggest correction, repeated several times)
**Never lift a phrase from the video script onto a thumbnail.** Lines like "You only remember the vibe", "Don't start on page 1" or "A few minutes. Before page one." are things she *says in the video*. To someone who hasn't watched it they mean nothing, and they won't click. She has made this correction more than once; it must not happen again.
- Write thumbnail text **for a stranger scrolling YouTube**: it states the promise, problem or result of the video in plain words ("REMEMBER WHAT YOU READ", "READ THE CONTENTS FIRST"). 1-5 words.
- **Thumbnail text and title work as a pair**: the title says what the video is; the thumbnail adds the hook (an outcome, a contrast, a question). They never repeat each other, and neither needs the video to make sense.
- **For every thumbnail, suggest 2-3 titles** that go hand in hand with it, so she can choose. Show them under each option in `overview.png` and in `NOTES.md`.
- Test: show only the thumbnail and its title to a cold critic that knows nothing about the video. If it can't say what the video is about and why to watch, rewrite the words before touching the design.
- Her video's own phrases can go in the *title* only if they're clear on their own; never assume context.

Written 2026-10-06 because a new session made the ghana-marrify thumbnails in the old reading-stack formula (flat colour ground + heavy caps + a cut-out of her), which she had already corrected. Everything here is her feedback or comes from her own inspiration folders. **Do not start from a previous project's thumbnails.**

## Her inspiration (study these first, every time)
- `inspiration/pinterest-thumbnail/`: 3 screenshots of her Pinterest board of thumbnails (dozens of examples).
- `inspiration/youtube-thumbnail/`: 69 thumbnails she saved from YouTube.
- `inspiration/youtube-slides/` and `inspiration/pinterest/` for typography and mood.
Make a contact sheet of them, look at it, and write down which 3-5 examples each new direction is based on (in `design/thumbnails/NOTES.md`).

## What her references actually look like
**Pinterest board** (aesthetic, editorial, "video essay / studytube / authortube"):
- **Real photographic scenes**: the person inside a real environment (desk, library, café, bookshelves, a room with warm lamp light), often cinematic and moody. Not a cut-out on a flat colour.
- **Editorial type**: serif and italic serif, lowercase ("alone in korea", "keep trying", "adulting habits"), handwritten or script words, mixed fonts in one title.
- **Text woven into the photo**: big words behind the subject's head ("COOK", "SEMINARU", "WRITING a book"), text placed on the scene rather than on a panel.
- **Collage and annotation**: hand-drawn arrows, scribbled notes, little stickers or doodles, polaroid-like inserts, tweet or quote cards ("How to get ridiculously better at communication?").
- **Real props**: stacks of books, an open notebook, a laptop, a coffee, a clipboard.
- Calm, thoughtful or wry faces, not shocked faces. Words are few: 1-5.
- A few bolder ones: red/yellow highlight boxes on one word ("JOBS ARE DEAD", "Why You're Stuck"), clean white-and-red editorial ("how to be consistent", "no one cares.").

**Saved YouTube thumbnails** (tech, career, productivity: her niche):
- The person in their real setting with a laptop, books or a whiteboard. Big expressive face.
- **Before / after** or **Day 1 / Day 900** splits.
- One word highlighted in a coloured box ("stop **lying** to yourself", "QUIT DATA **NOW**").
- Big words partly behind the head ("FAVOR", "POV", "UI UX"), and curved text around the head ("HELPED ME LEARN").
- Tweet or chat cards, a browser bar, simple hand-drawn sketches on paper.

## Her direct corrections (reading-stack and ghana-marrify)
1. **The thumbnail must make sense to a stranger** who never saw the video. Rejected: "YOU ONLY REMEMBER THE *vibe*." ("what the hell does that even mean?"), "Don't start on page 1." "Judge a book by its contents" was "still a little bit okay". Be holistic: say what the video gives the viewer.
2. **Her own edit on reading-stack thumbnail 01**: she replaced the agent's cut-out (mouth open, holding the book) with **her own expressive photo** (pointing at her head), made it **~1.5× bigger** and moved it. So: big face, a real expressive gesture, her own good photos over a random video frame. Mouth-mid-word frames are out.
3. She wants to **bring her own photos** (Add photo / drag-and-drop in the thumbnail editor) and pick colours with a **colour picker**. Ask her for photos for each video; she often has better ones than video frames.
4. **Every video gets its own look** (her rule): thumbnails too. Don't repeat a previous project's layout, palette or type treatment.
5. **Look**: real photos of her in a scene are what she sees working most on YouTube, so most directions should be photo-led. But **flat/plain-colour backgrounds are welcome too** as some of the options when they're good: she likes having multiple to choose from. What failed before was never the flat colour itself; it was the wording (rule 1) and making every option the same formula.
6. **Her edit of ghana-marrify 10 (2026-10-06)**: she loved the **newspaper-clipping look** (serif headline on a paper card, yellow highlight, slight tilt) and wanted it on **plain white**, with the **phone from 09 on the other side**: clipping + phone only, no photo, no big caption ("Anyone can check" removed), **no source line or date** on the clipping, and the **key words highlighted** ("verify *marital status* online"). A clipping without a source is no longer a quote: drop the quotation marks and ellipses. Built as `10b-verify-marital-status`.

## How to build a set (per video)
0. **Archiving an old set:** other editors use thumbnail PNGs (shorts end cards, talking-head `images`). Before moving `outputs/thumbnails/*.png`, grep the project for their names and repoint (2026-10-16: moving them broke every ux-research video editor).
1. Re-read this file, `FEEDBACK.md` and the project's `STATUS.md`. Ask her for photos (or check `assets/uploads/`).
2. Contact-sheet her inspiration folders; pick reference examples per direction.
3. Make 5-8 genuinely different directions (mostly photo-led, plus some flat-colour ones), each with **2-3 suggested titles**: mostly **photo-led**: her in a real scene (pick wide, well-lit frames from her 4K video, not tight cut-outs), with text integrated into the photo, editorial or mixed type, an annotation or a prop that tells the story. Maybe one or two graphic or faceless options for contrast.
4. Each direction pairs with a clear title. Thumbnail text 1-5 words, understandable cold, not repeating the title.
5. Check at 1280×720, 320×180 and 168×94 next to her reference examples (same size). A **cold critic** (knows nothing about the video) judges clarity and "would I click", AND a **taste critic** compares against her inspiration folders and rejects anything that looks like the old flat-cut-out formula.
6. Build in the studio's thumbnail editor format (`design/thumbnails/directions/<name>/content.json` + `index.html`), so she can edit text, photos and colours herself. Record what she changes (her studio edits are feedback: diff her versions and add the lesson here).

- 2026-11-12 (edge-case thumbnails, she is frustrated: "how many times do I have to talk about this"): NEVER put a story detail from inside the video on a thumbnail ("plate number NULL", "29 February 2012", "$12,000 in fines", "O'Brien", "Her name is Null"): nobody who hasn't watched knows why it matters. The words must say what the video is FOR, to the viewer, so they recognise themselves and want it: "you're wasting your 20s" + "Watch this before applying to one more job" (board yt-31), "STOP WASTING TIME", "I QUIT", "IT'S A TRAP", "CODE IN 2026", "Never get distracted again", tech = topic huge + "explained / made easy" (WEB3 EXPLAINED, ALGORITHMS MADE EASY). Not every thumbnail needs her photo. Before designing, LOOK at the board images (studio /ideas/boards/thumbnails/, 180 items) and name the board item each pair follows. Gate question: "would a stranger know what this video gives them and want it?" Her 10 new YouTube screenshots added as yt-72..yt-81.
- 2026-11-11 night (edge-case set 3, built after the note above): what passed a cold reviewer (5 rounds) was ONE plain fact about users or code + the literal thing drawn ("Testing | Real users" split with one order vs the same order charged twice = 8.5/9; "Users click twice" + a Pay now button = 8; "Test this before you ship" + a 3-item checklist = 8). What failed: developer memes that point to another topic ("It works on my machine" read as a Docker/setup video), soft lines ("think like a user." read as UX design), generic threats with no picture ("Your code will break"), and many small props. A small error card ("Something went wrong") says nothing; show the specific failure instead.

- 2026-11-12 (cheapest-countries + edge-cases + scholarships thumbnails): "we seem to be stuck on the same pattern... we are not using the thumbnail board at all." Our sets all repeat ONE formula: her cut-out on the right + heavy condensed caps on the left + flat colour or dimmed room. RULE: at most 2 per set use "cut-out beside a caps headline". Each thumbnail copies the COMPOSITION of one named board item (layout, type style, picture kind), shown side by side with that reference on a review sheet (outputs/_review/thumbnails-vs-board.jpg) before she sees it. Every set uses at least 5 different board compositions, including real-scene photos (stock city/object photos with free licence are fine), photo collages with soft serif/lowercase type, objects/flat-lays, maps, hand-drawn or editorial type, before/after only when the topic is a change. Also vary the type: not everything in heavy condensed caps.

- 2026-11-19: 50 new picks with their titles on the board (group "Your new picks 19 Nov"); read THUMBNAIL-STUDY.md §8 first. Words on
  the thumbnail = a second message to the title (feeling / twist, 2-5 words, lowercase fine, or no words); warm real scenes; alive
  face (Øredev photos in library/her-photos/oredev-2026-11-10/ are allowed for any video). Cheapest: keep 07 (fix the country-name
  font) and 09.
- 2026-11-19 (rework lessons): thumbnail words that are only a feeling fail cold; name the topic inside the feeling ("still
  doomscrolling at 2am?"). Øredev mid-word close-ups read awkward; smiles / gestures work.
- 2026-11-19 (rework lessons, cont.): the same shoot photo/outfit in more than 2 thumbnails of a set reads as "one thumbnail three
  times" cold; Øredev STAGE photos (wide, dark, small face) read as "a conference clip" and score lowest; the warm close Øredev ones
  (orange top smiling, chin on hands) work. Critics in every set asked for her REACTING (stressed / relieved / laughing) in her room.

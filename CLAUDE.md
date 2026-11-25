# Video design workspace: house rules

This is Gbemi's content studio. She sends a **kit** per video (script, her recorded video, optional project references). We turn it into finished outputs. Every film, slide, thumbnail and carousel follows the rules below. When a rule conflicts with her direct feedback, her feedback wins: update this file.

## Start here (every new session)
00. **Read `inspiration/know-how/HER-STANDARD.md` first** (her rule 2026-11-12: a note on one video is a rule for ALL videos; one page of every current rule). Every helper brief starts with it; every new note of hers goes there the same day.
0. Read **`NEXT-SESSION.md`** (the open checklist) and **`STATE.md`** (one page: where every project stands, what's in progress, what's waiting on her).
0b. **Content lead (her rule 2026-11-02):** we own ideas → script → kit → recording directions; she records. Before other work, check the Ideas board (`ideas/`, studio `/ideas/`) and add fresh ideas if it has none from the last day. Read `inspiration/know-how/SOCIAL-PLAYBOOK.md` + `inspiration/tiktok-references/INDEX.md` before any kit, script or edit.
1. Read this file, then **`FEEDBACK.md`** and, for thumbnails, **`THUMBNAILS.md`** (every piece of feedback she has given, so she never repeats herself), then `PROCESS.md` (how a kit becomes outputs, quality gates, lessons learned), `CHECKS.md` (the named checks every hand-off reports) and `RESOURCES.md` (links she shared, tools, asset sources, licences).
1b. Read **`REFERENCE.md`**: the standard to beat (patterns, scores and weak spots of every finished project; each `projects/<slug>/reference/PATTERNS.md` has contact sheets and stills). The finished MP4s of the 7 posted projects went to the Bin 2026-11-01.
2. Read `projects/*/STATUS.md` for what's done, in progress, and waiting on her. Update it whenever a deliverable changes state.
3. Before building anything, check `df -h` and running renders (`pgrep -fl "ffmpeg|chrome-headless"`).
4. **When you finish any work for her: start the studio yourself** (if `curl -s localhost:7700` fails: `cd /Users/gbemi/Desktop/CODE/videos && nohup node studio/server.mjs > studio/build/studio-server.log 2>&1 < /dev/null & disown`, then `open -a "Google Chrome" http://localhost:7700/`; a server started from an agent session can still die when that session ends, so also remind her of the Terminal way in README.md "How to open the studio") and give her the direct link to each editor/output you touched. She struggles to start it herself. Every output (film, talking-head moments, thumbnails, carousels) must be editable in the studio, not just rendered.

cd /Users/gbemi/Desktop/CODE/videos && node studio/server.mjs


## Layout
```
videos/
├── CLAUDE.md                 these rules (read first, every session)
├── README.md                 how to use the workspace (for Gbemi)
├── FEEDBACK.md               every piece of her feedback + where it's enforced
├── PROCESS.md                the pipeline, quality gates, lessons learned
├── RESOURCES.md              links, tools, asset sources, licences
├── THUMBNAILS.md             thumbnail playbook: her references + corrections (read before any thumbnail)
├── Start Studio.command      double-click → local studio at http://localhost:7700
├── studio/                   shared engine (read studio/README.md before touching a film)
│   ├── server.mjs            local server: film list, editor, edits + versions, export queue
│   ├── runtime/              seek(t) canvas engine + her design system (house.js), used by editor AND renderer
│   ├── editor/               the editing UI
│   ├── tools/                render.mjs (frames -> ffmpeg), stems.py (voice/music/SFX stems), mixclip.py
│   └── vendor/claude-motion-design/   howseen-ai repo (MIT), reference implementation
├── library/                  shared assets: sounds/ (SFX), music/ (Mixkit tracks), fonts/ (house fonts)
├── inspiration/              GENERIC references, used for every project
│   ├── my-decks/             her own slide decks (+ stills/): the strongest taste signal
│   ├── motion-references/    motion videos she likes (pocketsflow-promo.mov)
│   ├── youtube-slides/  youtube-thumbnail/  instagram-carousel/  linkedin-carousel/  pinterest/
└── projects/<slug>/
    ├── kit/                  what she sends: script.md, raw-video.*, transcripts/ (we generate)
    ├── inspiration/          references for THIS project only (optional)
    ├── film/                 the motion film (a studio project): film.json, scenes/ (V(landscape, portrait) layouts),
    │                         data/ (words, captions), audio/, assets/, edits.json + versions/ (her edits), build/stems/
    ├── design/               source for stills: thumbnails/, carousels/ (content in JSON, rendered to PNG/PDF)
    ├── outputs/              video/ clips/ frames/ thumbnails/ carousels/{instagram,linkedin}/ talking-head/
    ├── STATUS.md             what's done / in progress / waiting on her
    └── archive/              superseded versions worth keeping (small files only)
```

## Deliverables for a kit (unless she says otherwise)
0. **Refined kit** (`kit/refined-kit.md`) (**ONE kit per video, her rule 2026-10-18**: `kit/` holds only `refined-kit.md`; her original kit is moved to `archive/original-kit/` the moment the refined kit exists; line 3 of the refined kit says `THE CURRENT KIT … Last updated: <date time>` and is updated on every edit; never leave a kit copy in Downloads) by the **social-strategist** agent (`.claude/agents/social-strategist.md`), FIRST, before any thumbnail, carousel or caption: live research (topic news, outlier videos of the last 6-12 months, what people type into YouTube/TikTok search, her `inspiration/viral-samples/`), then search-led + click-led titles (main keyword in the first 40 characters, 40-60 total, exact search words), a thumbnail concept per title, description, captions per platform and short, with YouTube Shorts tags (stand alone, simple words, full sentences, no em-dashes, no hype words). Thumbnails, carousels and captions are built from it. **Sorted in one fixed structure** (2026-10-14: "let's make it well sorted"): At a glance, then 1 YouTube, 2 Thumbnails, 3 Shorts (one block per built short, every platform), 4 Teaser, 5 Carousels, 6 Long-form posts, 7 Research and sources last (template in the strategist file). **Chapters: 5-7 at most, broad parts (her rule 2026-10-16: too many chapters can put viewers off).** Chapters only when the video has clear distinct sections; a continuous talk (e.g. claude-rule) gets 3-4 broad parts with plain titles** (still YouTube chapter format, first at 0:00), timed to the exported file she uploads (say which file), never the raw recording.
1. ~~Motion film~~ (DROPPED 2026-11-07, her choice to save tokens; the full talking-head edit is the video): the full script as pure motion graphics on her narration. Editable in the studio: edit text, move elements, switch 16:9 / 9:16 (layouts recomposed, never cropped), captions on/off, sound on/off, export the whole film, one screen, one line, or a single frame as PNG.
2. **Talking-head edit: FULL length** (her rule, 2026-10-12; replaces the old "moments only" rule): her whole video, tightened, with motion throughout in varied layouts: half the screen motion + her face in the other half, her full-frame with things popping up and moving around, full-screen motion inserts (see `inspiration/know-how/MOTION-REFERENCES.md` layout menu). Never mirror-flip, crop out her face, or apply other global changes to her footage without asking.
2b. **Shorts** (9:16; **a MIX of formats per video**, her rule 2026-11-08: SHORTS-PLAYBOOK.md "Format menu", one format at most ~1 in 4, neighbours differ; HTTP status codes = the model): as many standalone shorts as the video honestly supports (no cap at 6; her rule 2026-10-15), built the way she builds hers (`inspiration/my-shorts/`, `inspiration/know-how/SHORTS-PLAYBOOK.md`): a stranger who never saw the long video understands it; her caption style (bold Helvetica). Shorts may use motion inserts (full or half page) or her video full-frame with motion on top.
3. **YouTube thumbnails**: at least 20 directions per video (2026-10-12), using frames from her video or her own photos. Research what is working on YouTube now before designing.
4. **(PAUSED for new kits, her note 2026-11-08: focus on thumbnails first)** **Instagram carousel** (1080×1350) and **LinkedIn carousel** (1080×1350 or 1080×1080, PDF for LinkedIn).
5. **Teaser for LinkedIn and X** (her rule, 2026-10-14): a 85-100 s cold-open montage of 12-14 of her best lines from the whole video, ordered hook -> tension -> payoff -> a question only the full video answers, with the topic in big type on frame 1, an optional 3-2-1 countdown in the video's own look, short film inserts in step with her words, her captions, and an end card (title, @WithGbemi, where to watch). 16:9 + 1:1 + 4:5 (9:16 on request). Spec: `inspiration/know-how/TEASER-PLAYBOOK.md`; moment `"kind": "teaser"`, editor `/moment/<slug>/teaser/`.

## Her channel and identity
- **Gbemisola Oladetoun**, YouTube **With Gbemi**, handle **@WithGbemi** (https://www.youtube.com/@WithGbemi). Tagline on the banner: **TECH | CAREER | RESEARCH**. As of 2026-10-01: 834 subscribers, 203 videos. Use `@WithGbemi` wherever a channel name or handle goes (carousel end slides, end cards, captions).
- She's a Nigerian HCI researcher (thesis on design research) living in Estonia for about a year. Topics: tech (e.g. 404 pages), career, research, reading, African digital public infrastructure.
- Her existing channel look: a black banner with heavy condensed white type ("WITH GBEMI") and line-drawn doodles (laptop, bulb, book stack). Her current thumbnails are mostly her face with small caption-style text; the new flat bold style from her decks is the direction we're building toward.

## Working with her
- She dictates (expect transcription noise) and isn't a developer. Use plain words: "sound effects", not "SFX"; "re-mix the sound", not "rebuild stems". Give exact clickable paths and links, and say where every file lands.
- **Every text she can see must be editable in the studio, and every label / box resizable** (2026-10-15: teaser title cards, "new video" and the shorts label size were not). Draw with `txt()` / `grp()` / `ovr()` + `regBox`, never a bare `_txt` for words she might change.
- **She exports, not us** (her rule 2026-10-26: "Why are you exporting it? I don't need you to do that"). Agents never do final exports for her and never put anything in her Downloads folder; renders needed for checks/critics stay inside the project (`build/`, `outputs/_review/`) and are binned after. Hand her studio editor links; she exports. When SHE exports from the studio, the video (never the .srt; her rule 2026-10-18, unticked "Also save the captions file (.srt)" box) lands in her Downloads as a hard link (`ln -f`).
- **Captions and posts are written in HER voice** (2026-10-18): read `inspiration/know-how/HER-VOICE.md` first (her own posts + what performs). Prose, personal, plain, her phrases; no bullet lists of what the video covers, no "Link in the comments".
- New feedback goes into `FEEDBACK.md` the same session (and here, if it's a lasting rule).

## Design QA (from the critic rounds)
- **Visuals tell the story; text is the exception** (her rule 2026-11-07, FEEDBACK.md): on-screen text only to help understanding, emphasise, or style one short phrase; never re-type what she says; show pictures, people, objects, animation; no graphic that needs context she hasn't given yet; no labels repeating what a screenshot shows; no bordered form boxes / "old website" look.
- Text readable on a phone: mono labels ≥ 32 px at 1080 wide; one idea per slide or frame; no wall-of-text slides; no single word alone on a last line; photos never touch or cover text; her own words, checked against `transcript.srt`.
- **Phones look real** (her rule 2026-11-09, ref: a product site's phones): never a flat rounded box. Canvas (films, shorts, edits): `devicePhone(x, y, w, h, body, o)` in studio/runtime/house.js (h ≈ 2.05 w); designs (thumbnails, carousels): `<div class="phone"><div class="scr">` + `library/ui/phone.js` (each design lib has a copy, loaded by bind.js). Metal frame + side buttons, thin bezel, island, status bar, home bar, no logo.
- **More visuals**: not just type. Real images (book or object crops, her photos), simple flat diagrams, UI mockups (generic, no "ILLUSTRATION" stamps), varied layouts. Something meaningful changes every 2-4 s.
- Sound must be **clearly audible**, real social-media-style SFX (Mixkit), never thin synthesized blips. Present but not overloaded.

## Every piece stands alone (her rule, 2026-10-01)
The YouTube video is the foundation, but each thumbnail, carousel and post must make complete sense to someone who has NEVER seen the video. No inside references or phrases that only land after watching ("only the vibe", "a few minutes before page one", "judge a book by its contents" without context). Write each platform's content natively for that platform: slide 1 / the thumbnail must say plainly what this is and why the viewer should care, within a second. Test every hook by reading it cold: "would a stranger scrolling past understand it and want more?" If not, rewrite. Pointing to the full video is fine at the end, never as a requirement for understanding.

## Thumbnails: read `THUMBNAILS.md` first (her rule, 2026-10-06)
**2026-11-09:** then `inspiration/know-how/THUMBNAIL-STUDY.md` and her likes on the studio boards `/ideas/boards/thumbnails/` + `/ideas/boards/design/`. Photos from her shoot (`library/her-photos/shoot-2026-10-29/`, by outfit = video), through Enhance photo.
**Feedback adds up (2026-10-16):** a new sample or note from her raises the bar; it never cancels earlier rules. Every thumbnail set is a mix of kinds (photo background, collage, flat graphic, other), never one formula. This applies to all her feedback, not only thumbnails.
**Wording first: never put a phrase lifted from the video script on a thumbnail** (she corrected this repeatedly: "anyone who hasn't watched the video wouldn't understand"). Thumbnail text (1-5 words) states the promise in plain words; each thumbnail comes with **2-3 suggested titles** that pair with it. Mostly photo-led (her in a real scene, from `inspiration/pinterest-thumbnail/`, `youtube-thumbnail/`), but flat-colour options are welcome too; give her several to choose from. Never start from a previous project's thumbnails.

## Every video gets its own look (her rule, 2026-10-01)
"No two videos must look the same. We are too creative for that." Never rebuild a new film in a previous project's look (ghana-marrify v1 style frames were turned down for repeating reading-stack's deck style). For each new film: study fresh references first (her screen recordings in `projects/<slug>/inspiration/`, the Skillry Opus 5.5 gallery and whatships.com, see RESOURCES.md), propose 2-3 distinct directions as style frames + a short motion test, and get her pick. What carries over is the craft and the bans (clean, clear backgrounds, readable type, the Banned list), not the look. Show real sources where she cites them (screenshots / scroll recordings of the actual article or site, highlighted at the moment she mentions them).

## Her taste (from her decks + the pocketsflow reference)
- **Bold colour may carry a quiet pattern** (her refs 2026-11-09): fine static lines / halftone / grain in the same hue, a few % lighter or darker, so the ground still reads flat; never moving, never a gradient (THUMBNAIL-STUDY.md §7).
- **Flat solid grounds only**: off-black `#111114`/`#0E1116`, warm paper `#EDE9E2`/`#EAE6DA`, card `#FFFDF6`, or ONE full-bleed accent for a punchline (electric blue `#1B3FD8`, green `#22E08A`, safety orange `#FF4713`). Thin grid lines allowed on some slides.
- **Type is the design**: huge, heavy, tight display type, often uppercase (Bricolage Grotesque 800, Archivo Black, Bebas Neue); body Archivo; small DM Mono labels; one Instrument Serif italic accent word.
- One accent colour per scene. Lots of empty space. One idea per frame.
- Structures she uses: numbered lists (mono 01 + bold line + hairline rule), single-sentence slide, full-bleed punchline slide, simple UI mockups (browser, address bar, cards), polaroid photo inserts with mono captions, meters/progress bars.
- **No corner HUD in films**: no top-left section label ("// 14 — chapter 05-07") and no top-right title + timecode ("HOW TO READ 00:07:32:00"). She asked for these to be removed permanently (2026-10-01).
- **She rejected**: gradients, glows, drifting particles/dust, indigo "night library", Outfit/Fraunces ("looks like 2027", "tacky"); minutes with nothing happening on screen; un-mirroring her face.

## Banned (common AI-design tells)
Gradients and glowing backgrounds · purple anything-gradient · continuously moving background particles · frosted glass over blur · abstract 3D objects floating by headlines · everything entering with the same fade-and-slide · centred headline + three equal cards · rounded cards inside rounded cards · decorative icon beside every point · icon in a coloured rounded square on every card · pill shapes everywhere · blinking "live" dots and badges · scrolling ticker banners · glowing dots travelling along thin lines · coloured strips on card edges · eyebrow text above every heading · descriptions repeating the heading · captions explaining obvious pictures · labels on every object · arrows after every link · "word · word · word" dot lists · glow on text · unreadable moving text · several things fighting for attention · fake product UI or invented content (keep mockups generic and obviously not a real brand's UI; no "ILLUSTRATION" stamps).
Note: her own decks DO use mono corner labels and letter-spaced mono captions. Keep them, but sparingly (corner marks and captions), not above every heading.

## Workflow (always in this order)
reference → frame study → brief → visual rules → stills → motion → sound → critique → final render
1. **Reference first.** If a reference video is given, reverse-engineer it frame by frame before building: cuts from frame-diff spikes, per-shot timing, positions, easing, blur, colours sampled from pixels, sound hit times. Write `SPEC.md`. The frames are the truth. Decide KEEP (timing, cuts, easing, camera) vs CHANGE (brand, copy, colours, fonts).
2. **Lock the visual system once** (fonts, palette, spacing, accent) in one file, and make every scene use it.
3. **Stills before motion.** Render 5-8 key stills, look at each zoomed in (hierarchy, spacing, type, overlaps, stray shapes), fix, and get her OK on a new look before a full render.
4. **Critique with a fresh agent** that didn't build it: harsh motion director, default reject. Frame numbers + measurable fixes. Nothing ships below 8/10.
5. **Measure, then report** (2026-10-11): write briefs in numbers (`studio/PROMPTS.md`); run the lab loop (`studio/tools/lab.mjs` contact / onion / speed / audit / board, `studio/tools/soundqa.py`); every hand-off carries the `CHECKS.md` table (pass / fixed / n/a + note). An error she finds that no check caught becomes a new check. Keep folding in the resources she sends (`inspiration/know-how/WORKFLOW-UPGRADES.md`).

## Motion rules
- Arrive fast, land soft: each frame covers ~12-19 % of the remaining distance. Never linear, never a dead stop.
- Every move ≥ 0.3 s; big moves 0.5-0.75 s. Stagger grouped elements 2-4 frames apart.
- Motion blur follows direction and speed and clears as things settle. Never blend across a cut.
- Text stays still ≥ 8 frames before it moves again; give reading time.
- One focal point per frame. Something changes every 2-4 s; no dead holds over ~4 s (use a slow push, a type-on, a highlight).
- Visuals land on her words (word-level timestamps). Cuts land on the beat or 2 frames before it.
- Determinism: every frame is a pure function of time (`seek(t)`), no timers, no `Math.random` (seeded PRNG).

## Sound rules
- Music bed under the voice, ducked about 9-15 dB; free licences only (Mixkit), recorded in the project README.
- **Vary the sounds** (2026-10-12: "we are overusing whooshes"): shutters, build-ups/risers, clicks, pops, glitches, ticks, typewriter, impacts; whoosh at most about 1 cue in 6 (`inspiration/know-how/SOUND-PALETTE.md`).
- SFX land on their measured peak exactly on the visual hit (click on the press frame, whoosh peaking with the move, impact on the reveal). Fewer, deliberate sounds beat many.
- Master to −14 LUFS integrated, true peak ≤ −1 dBTP. Nobody can listen here: verify by measurement and tell her to listen.

## Machine hygiene
- Disk is tight (often < 10 GB free). Stream frames into ffmpeg, never write image sequences. Delete intermediates, keep current + previous render only.
- `rm -rf` is blocked by her permission settings: move things to `~/.Trash/` instead and tell her.
- One heavy render at a time. Run long jobs in the background and poll (a 10-minute no-output watchdog kills blocked agents).
- Tools: Node 24, Python 3.14 + numpy, ffmpeg (h264_videotoolbox), Chrome / puppeteer chrome-headless-shell (`~/.cache/puppeteer`), whisper-cli + `~/.cache/whisper/ggml-small.en.bin`.

## Honesty
Never invent book contents, quotes, data or features. **Don't print "ILLUSTRATION" or disclaimer notes on what she posts** (her rule, 2026-10-14: "what you are working on is a ready-made thing I want to export and post"): instead keep illustrative UI generic (no real brand's UI or logo faked, no invented quotes from real people or companies, made-up data clearly not presented as a real record). Real screenshots keep a small source credit. Captions and claims stay true. Never reuse a reference's music, voice or people.

See also `.claude/skills/motion-design/SKILL.md` (code-only motion pipeline: seek(t) engine, render, audio, remake mode, critique loop). It was written for another brand: take the techniques, not its colours or brand rules.

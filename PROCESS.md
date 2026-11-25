# Process: from a kit to finished outputs

How we work, what runs where, and the lessons that cost us time. Rules and taste are in `CLAUDE.md`; links and tools are in `RESOURCES.md`; each project's live state is in `projects/<slug>/STATUS.md`.

## 0. A new kit arrives (`projects/<slug>/kit/`)
- **Kits can include a content-kit markdown** (e.g. `projects/ghana-marrify/kit/ghana-marrify-data-kit (1).md`): her edited script, YouTube title options, description, tags, shorts scripts, a clip breakdown, captions per platform, X posts, carousel copy, an essay. **It is a starting point, not gospel** (her words, 2026-10-01: "the kit itself I will not say is excellent… you can make the kits better"). Order of truth: (1) **what she actually says in the recording** for every quote, caption, overlay and film line; (2) verified facts (check the kit's claims on the web, note sources); (3) the kit for structure, clip ideas and starting copy. Improve weak copy, but keep her version visible next to ours so she can choose. **Diff the recording against the kit first** and write it into a per-project `BRIEF.md` (ghana-marrify: whole kit sections, e.g. the "no record found" insert, 1886, "bury someone online", were never said on camera).
- Kits may include an `.srt` she made. Still run whisper for word-level timings (the motion film needs them), and use her `.srt` to fix names and spellings.
0b. **Run the social-strategist** (`.claude/agents/social-strategist.md`; if the agent type isn't loaded in the session, a general-purpose agent told to follow that file) as soon as the transcript exists. It writes `kit/refined-kit.md`; thumbnails, carousels and captions are built from its titles and concepts, not from her kit.
1. Create the project skeleton: `kit/ inspiration/ film/ design/ outputs/{video,clips,frames,thumbnails,carousels/instagram,carousels/linkedin,talking-head} archive/`, plus `STATUS.md`.
2. **Transcribe** her recording with whisper.cpp (segment and word-level JSON plus SRT) into `kit/transcripts/`. Extract `voice.m4a` (`ffmpeg -vn -c:a copy`). Fix misheard names.
3. Check her footage orientation: **reading-stack was recorded mirrored** (book text backwards). Never flip her face. Flip only book-only crops.
4. Look at frames of her footage and any project references. If there's a reference video, reverse-engineer it into `SPEC.md` (see CLAUDE.md workflow).

## 1. Deliverables and who builds them
We run **parallel background agents** (Agent tool, `run_in_background`), each owning its own folders, plus a **fresh critic agent** per deliverable. The main session reviews every result itself (pulls its own stills) before telling Gbemi.

| Deliverable | Source | Output | Notes |
|---|---|---|---|
| Motion film | `film/` (studio project: `film.json`, `scenes/*.js` with `V(landscape, portrait)`, `data/`, `audio/`) | `outputs/video/<slug>_motion_<16x9|9x16>_vN.mp4`, clips, frames | Narrated by her real voice, tightened (retakes and long pauses cut, cutlist in `film/data/`). Visuals land on word timings. Editable in the studio. |
| Talking-head moments | `talking-head/` (`MOMENTS.md`, tools, per-moment specs) | `outputs/talking-head/momentNN-<slug>_{9x16,16x9}.mp4` + `.srt` | 5-7 moments of 15-60 s; punch-ins from 4K, graphics every 2-4 s, never flipped. |
| Full talking-head edit + shorts (2026-10-13) | `talking-head/` (`python3 studio/tools/thsetup.py <slug>`, then a `"kind": "full"` moment and `"kind": "short"` moments; layouts `TH.*`, see studio/README.md "Talking-head layouts") | `outputs/talking-head/talkinghead-<slug>_{16x9,9x16}.mp4`, `outputs/shorts/shortNN-<slug>_9x16.mp4` (+ `.srt`) | Whole video tightened (pauses, retakes), something changes every 3-6 s, layout never twice in a row, >= 4 layouts a minute, film scenes synced by her words; shorts per SHORTS-PLAYBOOK. Check with `composite.mjs check`, stills, an export, loudness. |
| Teaser for LinkedIn and X (2026-10-14) | `talking-head/` moment `"kind": "teaser"` with `"bites"` (source ranges in the order they play) + `teaser/teaser.js` (`runtime/teaser.js`: `TZ.*`), per `inspiration/know-how/TEASER-PLAYBOOK.md` | `outputs/teaser/teaser-<slug>_{16x9,1x1,4x5}.mp4` (+ `.srt`), hard-linked in `~/Downloads/<slug>/teaser/` | 12-14 bites, 85-100 s, topic big on frame 1, inserts synced to her words (`sync`), end card. `footedl.py` then stills in all sizes, export (`--aspect 16x9,1x1,4x5`; the first one splices the bites into `build/splice/`, trash it after), a fresh critic per video (>= 8). |
| Thumbnails | `design/thumbnails/` (HTML + `content.json` per direction, `render.mjs`) | `outputs/thumbnails/*.png`, `overview.png` | Research first; check at 168×94 and 320×180. |
| Carousels | `design/carousels/{instagram,linkedin}/content.json` + `shared/build.mjs` | `outputs/carousels/...` PNGs (+ `carousel.pdf` for LinkedIn) | `build.mjs` auto-checks labels ≥ 32 px, single-word last lines, overlaps. |
| **Editors (all of the above)** | the studio (`studio/editor/`), http://localhost:7700 | the same outputs + a copy in her Downloads | Every deliverable opens in a browser editor: film `/edit/<slug>/`, moments `/moment/<slug>/<id>/`, thumbnails `/design/<slug>/thumbnails/`, carousels `/design/<slug>/carousels/<deck>/`. Keep new designs editable: `data-k` text, `data-move` blocks, `data-img` photos, `--ground/--fg/--accent` on `.t` (see `studio/README.md`). |

## 2. Quality gates (never skip)
Gates she approves (the model never approves its own work; what she approved is frozen as a version): **brief** (written in numbers, `studio/PROMPTS.md`) → **style frames** (2-3 directions) → **transition board** (one still per cut, carrier + landing word) → **45 s preview** → full build → **final** (MP4 + contact sheet + the CHECKS.md table).
1. **Checkpoint on a new look**: style frames + a 45 s preview, then the main session reviews against `inspiration/my-decks/stills/` and asks her before a full build. This is how v2 got approved after v1 was rejected.
2. **The lab loop** (every new scene or kind of move, before any full render; all measured, see `studio/README.md` "QA tools"):
   stills at named frames (start / middle / settled) → `lab.mjs contact` (every 12th frame) → `lab.mjs onion` + `lab.mjs speed` on each hero move (ghosts bunch up at the end; no dead stops, no linear moves) → `lab.mjs audit` (the scenes' `MOTION.expect()` checks, every sound cue against the frame the picture changes, reading time, dead holds; ~20 s for a 5-min film) → `lab.mjs board` (every cut carried, no blank / flash frames) → `soundqa.py` (hit timing, hits over the bed, music under voice, phone band, DC, true peak after AAC) → `render.mjs contrast`.
3. **Fresh critic agent**: a harsh director who didn't build it, defaulting to reject, with frame numbers and measurable fixes (format in `studio/PROMPTS.md` section 3, quoting the lab and sound-QA numbers), up to 3 rounds, 8/10 bar. Check its "not her words" claims against `transcript.srt` (critics were wrong several times).
4. **Main-session verification**: ffprobe, loudness (`ebur128`), blackdetect/freezedetect, and our own stills at random times.
5. **The CHECKS.md table**: every hand-off reports every check that applies (pass / fixed / n/a with a note); a missing check = not done. Her notes are sorted into error (a new check in CHECKS.md, run on every future video) or taste (CLAUDE.md "Her taste" / THUMBNAILS.md + FEEDBACK.md), and the next version answers each note with exactly what changed.

## 3. Studio basics (details in `studio/README.md`)
- `Start Studio.command` (or VS Code task "Start Studio") → http://localhost:7700 → one editor per output: film, each talking-head moment, thumbnails, Instagram, LinkedIn. Edit text in place, drag, resize photos, undo, versions, exports (downloaded to her Downloads too).
- After changing scenes or SFX cues the film editor re-mixes the sound by itself (or Advanced → Re-mix the sound; CLI: `render.mjs meta` + `stems.py`). The film has no corner HUD any more (`hud=1` / `hashes --hud` only for old comparisons).
- Protect approved looks: `node studio/tools/render.mjs hashes <slug> <times.json> <out.json>` before and after refactors (reading-stack: `film/build/hashes/`).
- Contact sheets: `node studio/tools/render.mjs sheet <slug> --aspect 9x16 --at end|mid|<s>`.
- Lab tools: `node studio/tools/lab.mjs contact|onion|speed|audit|board <slug> ...` and `python3 studio/tools/soundqa.py <slug> [--export outputs/video/<file>.mp4]`; reports in `film/build/qa/`.
- Adaptive motion blur (opt-in per film, off for every approved film): `film.json` `"motionBlur": true` or `render.mjs export ... --blur`.

## 4. Machine hygiene
- Check `df -h` first. 18 min of 4K source is 4.5 GB; a full-film export is about 0.5-1.3 GB. Stream frames into ffmpeg and never write image sequences.
- `rm -rf` is blocked: `mv x ~/.Trash/` and ask her to empty the Bin.
- One heavy render at a time machine-wide (`pgrep -fl "ffmpeg|chrome-headless"`).
- Agents: run long jobs in the background and poll. There's a 10-minute no-output watchdog. API session limits and session restarts stop agents: resume them with `SendMessage` (they keep their transcript), telling them what's on disk.

## 5. Lessons learned (don't repeat)
- **She exports, not us (2026-10-26).** Agents never do final exports or write into her Downloads; review renders stay in the project and are binned. Any older line here or in the playbooks that says "export … hard-link into ~/Downloads" is retired: it describes what the studio's Export button does when SHE presses it.
- **Teasers (2026-10-14)**: a film insert synced to her words lands while the film is still typing (blank or one-word screens): push the film ahead (`film: {offset: 1-2.5}`) or start the insert later; a film group that sits small in a corner gets `zoom` + `zoomAt` + `zoomGround`; "coming up" means nothing in a LinkedIn/X feed (write "new video"); open on her sharpest line with the topic in big type, not on a typing screen; a countdown's first frame must already show its first number (an off-by-one showed "4").
- **Thin, quiet synthesized SFX were inaudible** ("all I hear is whoosh"). Use real Mixkit sounds at clearly audible levels, placed on the visual frame.
- **v1 motion film rejected**: indigo gradients, glow, Outfit/Fraunces, "looks like 2027". Start from her deck vocabulary.
- **Talking-head edit v1 rejected**: it copied a minimal reference literally, leaving 4-minute stretches with nothing on screen ("hours of nothing"), and it un-mirrored her face without asking. A reference sets the style, never a ceiling on density. Ask before global changes to her footage.
- **Live Server broke the old single-file studio** because the page source contained the text `</body>` inside a JS string (Live Server injects its script before the first `</body>`). Split such strings (`'</bo'+'dy>'`).
- Real-time MediaRecorder export drifted when frames were slow. Exports are now server-side frame-exact renders.
- Whisper misspells names (Baratta, Agatha Christie, Convivial Toolbox, Marple, Pieter Jan Stappers).
- Never invent book contents, quotes or data. Captions and claims must match `transcript.srt`.
- **The studio server dies with the agent session that started it** (2026-10-03: down twice; its log in `/tmp` was wiped too). Start it detached (`nohup … & disown`, log in `studio/build/studio-server.log`) and teach her the Terminal way (README.md). If it's down when a session starts, restart it before anything else.
- **Sessions hit API limits mid-build** (2026-10-02 night: both film and clips agents stopped). Resume each with `SendMessage`, telling it what's on disk and that the render lock is free (`/tmp/gm-render.lock`).
- **Measure, don't guess** (2026-10-11 workflow upgrade, `inspiration/know-how/WORKFLOW-UPGRADES.md`): sound QA on ghana-marrify found the 8 impacts' first hit ~105 ms (3 frames) before the slam and 18 dB under her voice, invisible in every listen-free check before; the transition board found 18 of 41 cuts opening on ~3 frames of empty ground. The sound-sync audit is a lead, not a verdict: look at a contact strip of the flagged frames before moving a cue (some flags match a different change on screen).
- **A shared kit change can break another deliverable**: the film's global `BSCALE` scale-up in `blink.js` broke the clip layouts; the clips switch it off in their `common.js`. When two agents share a kit, additive options only, default off for the other user, and tell the main session.
- **whisper word timings (DTW) need flash attention off** (`whisper-cli … -nfa`), otherwise every word time comes back as -1 (phone-distraction, 2026-10-13).
- **Nine parallel agents filled the disk to 0.2 GB** (2026-10-13): exports must check free space right before starting, not only at the start of a phase; run at most 2-3 export-heavy agents at once.
- **Check free space on the data volume** (`df -h /System/Volumes/Data`), not `df -h /` (the sealed system volume reports misleading numbers). **Downloads copies must be hard links** (`ln -f <output> ~/Downloads/...`, same volume), never full copies: on 2026-10-13 duplicate copies (raw videos + exports, ~10 GB) were the difference between a full disk and finishing. Emptying the Bin alone freed little.

## Lean work (2026-11-07, her request: same quality, far fewer tokens)
- No separate motion film; build each graphic once and reuse it across the full edit, shorts, teaser, carousel and thumbnails.
- Look at work through small contact sheets (≤ 2000 px wide, frames ≤ 400 px), never full-size frames one by one; read files in parts, not whole.
- One fresh critic per piece, on a contact sheet; a second round only if it scores < 7. Fix, then check the fix yourself on a sheet.
- Range exports for review (the parts that changed), never a full re-render to check one fix; one queued render per project.
- Change shared things once (type set, colours) in the project's shared look file, not scene by scene.
- Report briefly: links, scores, her questions.

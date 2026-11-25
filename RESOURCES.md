# Resources

Everything this workspace uses: links, tools, asset sources, licences. Keep this current when something new is adopted.

## Inspiration and know-how she shared
| What | Where | Notes |
|---|---|---|
| **claude-motion-design** (howseen-ai, MIT) | https://github.com/howseen-ai/claude-motion-design | Code-only motion pipeline: `seek(t)` HTML engine, Playwright/Chrome frame render, subframe motion blur, SFX placed by measured peak, beat-synced music, **remake mode** (frame-locked copy of a reference), critique loop. Copied to `studio/vendor/claude-motion-design/`; skill installed at `.claude/skills/motion-design/` (invoke with `/motion-design`). Written for another brand: use the techniques, not its colours. |
| **Skillry: Opus 5.5 videos** | https://skillry.dev/ai-videos/opus-5-5 | Gallery of ~475 code-made videos (motion graphics, explainers, 3D, games) with creators, durations and tool stacks. Thumbnails only; no downloads, rarely prompts. Use it to browse ideas; save any video she likes into `inspiration/motion-references/` so it can be studied frame by frame. |
| **Twitter threads on Opus motion design** | pasted by Gbemi, 2026-10-01 (dawood46 @notdwd "Frame by Frame"; Shann @shannholmberg "26 things to avoid"; John @johncodunayo AE MCP prompts) | Distilled into `CLAUDE.md`: reverse-engineer references frame by frame into SPEC.md, KEEP vs CHANGE lists, motion rules (arrive fast / land soft, stagger, blur follows motion, reading time), stills before render, fresh harsh critic, sound on the exact frame, −14 LUFS, banned AI-design tells. |
| **What Ships** | https://whatships.com/ | 2,300+ product launch videos from X. `https://whatships.com/search-index.json` lists them; each `/videos/<slug>/` page embeds `videoUrl` (a direct video.twimg.com mp4). She recommended it 2026-10-01 for motion ideas. |
| Skillry downloads | (see Skillry row) | The gallery page HTML holds ~950 direct preview mp4s: `https://media.skillry.dev/opus-5-5/<creator-id>/{original,remake}-card.<hash>.mp4`. |
| **Florence (@flxrnc), "Opus 5.5 Motion Lab"** | pasted by Gbemi 2026-10-11 (truncated at "The lab loop"; the full article is not indexed anywhere we could reach, X blocks fetching) | Notes: `inspiration/know-how/opus-motion-lab-florence.md`. Took: briefs in numbers (`studio/PROMPTS.md`), easing / spring / beat-grid tokens (`studio/runtime/motion.js`), the lab loop (contact sheet, onion skin, speed graph, numeric audit: `studio/tools/lab.mjs`), sound measured not heard (`studio/tools/soundqa.py`). |
| **Opus 5.5 Motion Design Harness + Mortiflix** (GTKottman, **AGPL-3.0**: patterns only, never copy its code) | https://github.com/GTKottman/mortiflix-oss ; PDF notes `inspiration/know-how/harness-and-8-prompts.md` | Took: gates she approves, named checks reported pass / fixed / n/a and a new check for every error no check caught (`CHECKS.md`), notes sorted into error / taste and answered with exactly what changed, transition board with carrier + why + landing word and a blank / flash test (`lab.mjs board`), read time words/3 + 1 s, music-under-voice measure. |
| **Mr. Claude's 8 explainer prompts** (@claudeskills101, X, 2026-10-05) | in `inspiration/know-how/harness-and-8-prompts.md` (prompt texts truncated) | Eight styles with an Avoid line each; listed in `studio/PROMPTS.md` section 5 as starting points for a film's 2-3 directions (paper collage fits her taste). |
| **Marouane Gazouzi, motion-launch-videos** (MIT) | https://github.com/Kimeur/motion-launch-videos | Adaptive motion blur: subframes from measured movement (one per 5 px, max 64), never across a cut. Ours (`runtime/film.html`, opt-in) measures the edit boxes and averages in linear light (his averages sRGB). |
| **ui-skills.com** (catalogue by ibelick, MIT) | https://www.ui-skills.com/ | 17 skills. Installed (MIT, LICENSE in each folder, house note on top): `.claude/skills/review-animations/` (Emil Kowalski: motion craft review + STANDARDS.md) and `.claude/skills/better-typography/` (Jakub Krehel). Skipped: baseline-ui (React/Tailwind product UI; its design bans already in our Banned list), 12-principles-of-animation (no licence), the rest (product UI / dashboards). |
| everythingproducteducation.com | https://everythingproducteducation.com/create-motion-graphic-videos-with-claude/ | Remotion + FFmpeg, scene-by-scene with a still for approval first: same as our process. Took the reading-speed rule (about 1/3 s per word) into PROMPTS.md. |
| **Claude Motion / Claude Dashboards** (Anthropic, beta 2026-10-08) | https://claude.com/resources/articles/dashboards-and-motion | Motion: code-animated text, charts, shapes, images in claude.ai, editable, MP4 out; **Team / Enterprise plans only**, started with `/motion` in the Claude app. No sign it runs from Claude Code. Dashboards: live data dashboards (Snowflake, BigQuery...). Neither is used here. |
| HyperFrames (HeyGen, Apache-2.0) | https://github.com/heygen-com/hyperframes | HTML + GSAP seeked per frame in headless Chrome, then FFmpeg: the same architecture as our studio. Not adopted (our engine already does this); its GSAP easing names map to `MOTION.EASE`. |
| ClaudeAnimationBase (John Heibel, MIT) | https://github.com/JohnHeibel/ClaudeAnimationBase | p5.js starter. Ideas: "reads" per shot set its length, one BPM drives all motion, detail crops that follow a point. Alex dc's "Code to Video Studio" (github.com/alexdcd/code-to-video-studio) now returns 404: not reviewed. |
| **Her own decks** | `inspiration/my-decks/*.html` + `stills/` | Built with her "Slide Studio v2" engine (`studio-v2/lib/engine.js`, NOT on this Mac). To view slides without it: serve the folder over HTTP and add class `active` to `section.slide` elements in headless Chrome. Fonts/palettes are in each file's `:root`. |
| **Pocketsflow promo** | `inspiration/motion-references/pocketsflow-promo.mov` | Motion she loves: white/black/blue grounds, grotesk + Instrument Serif italic accent, DM Mono corner labels + timecode, type-on and blur-to-sharp, hard cuts. |
| **Six motion screen recordings** (2026-10-11/12) | `inspiration/motion-references/Screen Recording 2026-10-1*.mov` | Frame study + the **layout menu** for talking-head-with-graphics (L1-L13): `inspiration/know-how/MOTION-REFERENCES.md`. TixFox promo, @johnbucog captions reel, UAE podcast keyword captions, Busy Blooming Podcast (giant type over/behind her), talent-manager split screen, tools pop-around. Silent recordings. |
| **Her own shorts** (11 files) | `inspiration/my-shorts/` | How she cuts shorts + exact caption spec (Helvetica Neue, measured): `inspiration/know-how/SHORTS-PLAYBOOK.md`. |
| **Sound palette** | `library/sounds/` (102 Mixkit files) | Roles + when-to-use rules (whoosh at most 1 in 6 cues): `inspiration/know-how/SOUND-PALETTE.md`. |

## Social research (social-strategist)
- YouTube search suggestions: `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=<query>"` (works from this Mac, no key); Google suggestions with `ds=` removed.
- `yt-dlp` (install with `brew install yt-dlp` if missing) for view counts and channel baselines: `yt-dlp "ytsearch30:<query>" --flat-playlist --print "%(view_count)s|%(channel)s|%(title)s|%(url)s"`.
- Her taste bars: `inspiration/viral-samples/` (README), `inspiration/pinterest-thumbnail/`, `inspiration/youtube-thumbnail/`, `inspiration/social/`.

## Asset sources (free licences only)
| Source | Use | How |
|---|---|---|
| **Mixkit SFX** (Sound Effects Free License: commercial OK, no attribution, no standalone redistribution) | sound effects | Listing pages `https://mixkit.co/free-sound-effects/<term>/`; ids in `data-audio-player-item-id-value`; file `https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3`. Search helper: `.claude/skills/motion-design/scripts/mixkit_sfx_search.py`. Library: `library/sounds/` (index.json lists titles + ids). |
| **Mixkit music** (Stock Music Free License: YouTube OK; don't register with Content ID) | music beds | `https://assets.mixkit.co/music/<id>/<id>.mp3`; crawl `/free-stock-music/<genre>/`. Library: `library/music/`. |
| **Google Fonts** (OFL) | house fonts | Bricolage Grotesque, Archivo, Archivo Black, Bebas Neue, DM Mono, Instrument Serif. Full files in `library/fonts/` (the hyperframes cache had subset fonts that silently fell back: always use these). |
| Pexels / Unsplash / 3dicons.co / svgl | stock photos, icons, logos | See the skill's section 5. Rarely needed for her style. |

## Tools on this Mac
- **Node 24**, **Python 3.14** (+ numpy), **ffmpeg/ffprobe** (Homebrew; `h264_videotoolbox`, `-hwaccel videotoolbox` for her 4K HEVC).
- **Headless Chrome**: puppeteer's `chrome-headless-shell` in `~/.cache/puppeteer/`; `puppeteer-core` in `studio/node_modules`.
- **whisper.cpp**: `whisper-cli` (Homebrew) with model `~/.cache/whisper/ggml-small.en.bin`. Transcribe: `ffmpeg -i in.mov -vn -ac 1 -ar 16000 voice16k.wav`, then `whisper-cli -m ~/.cache/whisper/ggml-small.en.bin -f voice16k.wav -oj -osrt -of transcript` and, for word timings, `-ml 1 -sow -oj -of transcript.words`. 18 min takes about 25 s. It misspells names: fix them in a corrections list.
- **Apple Vision** person segmentation (offline cut-outs of her from video frames): write a small Swift script using `VNGeneratePersonSegmentationRequest` (quality `.accurate`) and run it with `swift`. The thumbnail agent used one but didn't keep it in the project: save it to `studio/tools/` next time. Check mask edges on a still (chair slivers, soft hair).
- **QA lab** (ours): `studio/tools/lab.mjs` (contact sheet, onion skin, speed graph, numeric audit, transition board) and `studio/tools/soundqa.py` (sound measured, not heard). Docs: `studio/README.md` "QA tools"; checks: `CHECKS.md`.
- **Studio** (ours): `Start Studio.command` → `node studio/server.mjs` → http://localhost:7700. Docs: `studio/README.md`.

## Research already done (reuse, refresh when stale)
- YouTube thumbnails (2025-26 data, niche analysis, her 69 saved thumbnails): `projects/reading-stack/design/thumbnails/RESEARCH.md`
- Instagram + LinkedIn carousels (formats, ranking signals, slide 2 re-serve): `projects/reading-stack/design/carousels/RESEARCH.md`

## Pexels (added 2026-11-02)
- API key: stored privately at `~/.config/pexels/key` (never copy it into project files). Use: `curl -H "Authorization: $(cat ~/.config/pexels/key)" "https://api.pexels.com/v1/search?query=...&per_page=15"` (photos) or `https://api.pexels.com/videos/search?query=...` (video clips).
- Licence: free for commercial use, no attribution required (credit the photographer when easy); don't sell unaltered copies or imply the people endorse her. Record each file's Pexels URL + photographer in the project's `film/assets/CREDITS.md`.
- Limits: 200 requests/hour, 20,000/month.

## Fonts added 2026-11-12
Fontshare (ITF Free Font License, free for personal + commercial use; licences in library/fonts/licences/): Clash Display, Satoshi, General Sans, Cabinet Grotesk, Boska, Zodiak, Gambetta, Switzer, Sentient, Panchang. Google Fonts (OFL): Syne, Unbounded, Young Serif, Gloock, Bebas Neue, Space Grotesk, Familjen Grotesk, Poppins, Nunito, Montserrat, Oswald, Barlow Condensed. All in library/fonts, declared in studio/runtime/fonts.css.

## Font board fonts (added 2026-11-12, studio /ideas/boards/fonts/)
Matches for the type on her idea boards, all Google Fonts: Big Shoulders Display, Six Caps, Bagel Fat One, Bodoni Moda, Libre Baskerville, Caveat Brush, Shrikhand, Londrina Solid, Kaushan Script, TikTok Sans, Silkscreen (SIL Open Font License 1.1) and Permanent Marker (Apache 2.0). Free for commercial use; licence texts in library/fonts/licences/ (OFL-*.txt, Apache-2.0-PermanentMarker.txt); declared in studio/runtime/fonts.css. Her rule: only fonts on the font board are used (see HER-STANDARD.md "Fonts"). Rebuild the board: `node studio/tools/fontboard.mjs` (studio running).

# More know-how shared by Gbemi, 2026-10-11

## 1. "Opus 5.5 Motion Design Harness" (PDF, Google Drive 1GFxgHGhZFz9NI4P00u1NbM_bRVbmTqqE; independent guide, Oct 2026)
A prompt + a harness (Mortiflix, open source: https://github.com/GTKottman/mortiflix-oss, Node 20 + ffmpeg, backends claude-code / anthropic-api / demo; web studio on :4646).
- **Gates, owner approves every one; the model never approves its own work**: 1 brief [me] (3 lines; only questions that change the video, each with a default) → 2 script [me] (one idea per beat, one visual note per beat) → 3 style frames [me] (3-5 full-res stills, real shots with real words) → 4 transitions [me] (one panel per cut) → 5 animatic [me] (every beat timed, simple motion, 720p) → 6 build (internal) → 7 final [me] (MP4 + frame sheet). Approved work is frozen (script word for word, frames fix the look, animatic fixes the timing).
- LOOK.md before drawing: 1 background, 1-2 neutrals, 1 accent; one headline + one body family on a 1.25 scale; headlines ≥ 5% of frame height (16:9); title-safe 5%, action-safe 3.5%; shape language written down.
- Layout: one focal point; everything on the grid; left-aligned unless one centred line; no text on a busy area without a plate; nothing touches the edge except full-bleed shapes.
- Timing: narration sets the clock; ~150 spoken words/min; **read time = words/3 + 1 s after the text lands**; let the key idea sit still for a beat.
- Motion: never linear except machines; stagger 2-4 frames; overlap; **every cut has a carrier** (a shape, line or camera move bringing the next scene in; crossfade only if nothing better); the screen never goes blank (no dips to flat colour, no white flashes).
- Sound: music ~18 dB under the voice while it speaks; sound design on ~1 action in 5.
- Render contract: frame = pure function of frame number; no timers/unseeded randomness/network; all timing numbers in one file; check a beat with 3 stills (start, middle, settled) before rendering motion.
- **12 checks, reported per submission as pass / fixed / n/a (fixed and n/a need a note; a missing check is refused)**: spelling-and-facts · script-fits-length · text-safe-area (5% inside each edge) · no-collisions · text-contrast (4.5:1 at worst frame, on screen words/3+1 s) · frame-sheet (no black/flash/frozen frames; view one frame per second) · format (1080p+, constant fps, H.264+AAC, length within 5%) · loudness (-14 LUFS ±1, ≤ -1 dBTP, no clicks) · sync (key word lands with its visual within 2 frames) · music-check · music-under-voice · transitions-carried (each cut names a carrier, a reason, a landing word).
- **Notes**: answer every note in the next version and say exactly what changed ("Warmed the sky toward golden hour"), never "addressed"; sort each note into error or taste; **for every error no check caught, write a new check and run it on every future video**; taste carries across projects in TASTE.md.
- Sessions end at gates with a handoff/journal; a fresh session picks up. Guards against runaway loops (2 sessions with no progress pause the project). Renders one at a time studio-wide.
- Pipelines: explainer, social-short (hook frames → transitions → final, vertical, hook first), logo-sting. Cost measured: 5-s logo sting ≈ 12.5 min, $3.52 API.

## 2. "8 explainer prompts" (Mr. Claude @claudeskills101, X, 5 Oct 2026, 440K views)
Styles, each runnable in Claude Code (Remotion/FFmpeg/Manim), each with an explicit **Avoid line** (Anthropic's Opus 5.5 guide: naming exact things to avoid beats "avoid a generic look"):
1 kinetic typography synced to word-level timestamps · 2 whiteboard drawing (SVG strokes draw themselves, 6-scene script) · 3 isometric workflow (blocks rise, a dot travels between steps) · 4 animated data chart from a CSV (numbers count to real values) · 5 Manim math/concept explainer (build the formula term by term) · 6 app walkthrough from screenshots (find the click target, zoom, cursor, callouts) · 7 **paper collage** (background images + transparent PNG cut-outs at depths, white paper edges, parallax) · 8 **talking-head auto edit** (Whisper, cut silences > 0.5 s, burned captions 2 lines max).
(Full prompt texts were truncated in her paste.)

## 3. From the replies (X, late Sep - Oct 2026)
- Marouane Gazouzi: 4 motion-blur subframes show stepped copies on fast moves; he samples **up to 64 subframes per frame, one per 5 px of movement, never across a cut**; open-sourced his harness (GitHub).
- Alex dc: "Code to Video Studio", a free boilerplate (Claude/ChatGPT → video) on GitHub.
- John Heibel's **ClaudeAnimationBase** (repo used by theWEVR: a song + the repo + a prompt → 2 h of Claude Code, 2% of a weekly $100-plan quota).
- Walid: applied "house rules + critique loop" in Arabic; hardest part was keeping Arabic letters correct (script shaping).

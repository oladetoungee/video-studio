# Set up the video studio on another Mac, for Codex

This moves the whole `videos/` workspace to a new Mac and gets **OpenAI Codex** (the CLI or the VS Code extension) working in it
the same way Claude Code works here: same house rules, same studio, same tools.

Written 2026-11-25 from the machine as it is today (macOS 26.5, Apple Silicon, Node 24, Python 3.14, ffmpeg 8.1).

---

## 0. What the new Mac needs

| Need | Why |
|---|---|
| **Apple Silicon Mac** (M1 or newer) | the renderer looks for the `mac-arm64` Chrome, exports use the Mac's video chip (`h264_videotoolbox`) |
| **macOS 14 or newer** | "Remove background" and "Enhance photo" use macOS Vision features that start at 14 |
| **Free space: 60 GB+** if you copy every project, ~5 GB without `projects/` | `projects/` is 47 GB today; exports need 8 GB free on top |
| **Google Chrome** | the studio opens in it |

---

## 1. Copy the workspace

What's in `videos/` today:

| Folder | Size | Copy it? |
|---|---|---|
| the `.md` files at the top (`CLAUDE.md`, `FEEDBACK.md`, `STATE.md` …) | < 1 MB | **yes, all of them** (they are the rules and the memory of the work) |
| `.claude/` (agents + skills) | 184 KB | **yes** (Codex reads the files, see step 4) |
| `studio/` | 769 MB | **yes**, but skip `studio/node_modules` and `studio/build` (rebuilt in step 3) |
| `library/` (fonts, sounds, music, her photos, phone frame) | 520 MB | **yes** |
| `inspiration/` (her references, know-how docs) | 2.6 GB | **yes** (the `know-how/` docs are required reading for every task) |
| `ideas/` | 7 MB | yes |
| `projects/` | 47 GB | only the projects you still work on |

**Before you copy, on THIS Mac**, save Claude's memory notes into the workspace so they travel with it
(Codex has no memory of its own between sessions; these notes are what it will read instead):

```bash
cp -R ~/.claude/projects/-Users-gbemi-Desktop-CODE-videos/memory /Users/gbemi/Desktop/CODE/videos/agent-memory
```

**Copy** with an external drive, or straight over the network (both Macs on the same Wi-Fi, Remote Login switched on in
System Settings → General → Sharing on the new Mac):

```bash
rsync -avh --progress \
  --exclude 'studio/node_modules' --exclude 'studio/build' \
  --exclude 'outputs/_review' --exclude '.DS_Store' --exclude '__pycache__' \
  /Users/gbemi/Desktop/CODE/videos/  NEWUSER@NEW-MAC.local:~/Desktop/CODE/videos/
```

Add `--exclude 'projects/'` to leave the projects behind, or `--exclude 'projects/<slug>/'` for single ones.

---

## 2. Install the tools

Open Terminal on the new Mac and run these one block at a time.

```bash
# Apple's developer tools (gives you git, and swift for the photo tools)
xcode-select --install

# Homebrew (skip if `brew --version` already works)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node, Python, ffmpeg, Whisper (speech-to-text), Vulkan (used by the photo upscaler)
brew install node python@3.14 ffmpeg whisper-cpp vulkan-loader

# Python libraries the sound and caption tools use
python3 -m pip install --upgrade numpy pillow
```

Speech-to-text models (word timings for captions). The small one is the default; the large one is the slower, more accurate one:

```bash
mkdir -p ~/.cache/whisper
curl -L -o ~/.cache/whisper/ggml-small.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin
curl -L -o ~/.cache/whisper/ggml-large-v3-turbo.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin
```

The photo upscaler (`studio/vendor/enhance/realesrgan-ncnn-vulkan`) is already inside the copied folder. macOS may block it the first time
because it came from another machine; clear that once:

```bash
cd ~/Desktop/CODE/videos
xattr -dr com.apple.quarantine studio/vendor/enhance
chmod +x studio/vendor/enhance/realesrgan-ncnn-vulkan "Start Studio.command"
```

---

## 3. Set up the studio

```bash
cd ~/Desktop/CODE/videos/studio
npm install                                                    # puppeteer-core
npx @puppeteer/browsers install chrome-headless-shell@stable --path ~/.cache/puppeteer
```

The renderer finds Chrome by itself in `~/.cache/puppeteer/chrome-headless-shell/<version>/chrome-headless-shell-mac-arm64/`.

### Fix the paths that point at this Mac

If the new Mac's user is not `gbemi`, a handful of helper scripts still point at `/Users/gbemi/Desktop/CODE/videos`.
Run this once from the `videos` folder (it only changes the studio's tools and the agent files, not her projects):

```bash
cd ~/Desktop/CODE/videos
NEW="$PWD"
grep -rlI "/Users/gbemi/Desktop/CODE/videos" studio/tools studio/*.mjs .claude CLAUDE.md README.md \
  | xargs sed -i '' "s#/Users/gbemi/Desktop/CODE/videos#$NEW#g"
```

The other `.md` notes mention the old path as history; they still make sense and can stay.

### Check it works

```bash
cd ~/Desktop/CODE/videos
node --version            # v24 or newer
python3 --version         # 3.14
ffmpeg -hide_banner -encoders | grep videotoolbox    # should list h264_videotoolbox
whisper-cli --help | head -1
swift --version
node studio/server.mjs    # then open http://localhost:7700 in Chrome
```

The home page should list every project you copied. Open one editor, press Play, and try one small export to be sure Chrome,
ffmpeg and the sound mix all run. Stop the server with Ctrl+C.

---

## 4. Set up Codex

### Install and sign in

```bash
npm install -g @openai/codex
codex login          # sign in with your ChatGPT account (or set OPENAI_API_KEY)
```

In VS Code, the Codex extension is "Codex – OpenAI's coding agent" in the Extensions panel; it uses the same login and settings.

### Codex settings (`~/.codex/config.toml`)

Codex reads `AGENTS.md`, not `CLAUDE.md`. These settings make it read `CLAUDE.md` too, give it room for the long rule files,
and let it search the web (the social strategist role needs live research). Create the file with:

```toml
# ~/.codex/config.toml
model = "gpt-5-codex"                       # or whichever Codex model you prefer
approval_policy = "on-request"
sandbox_mode = "workspace-write"
project_doc_fallback_filenames = ["CLAUDE.md"]
project_doc_max_bytes = 65536               # CLAUDE.md is 22 KB; the default cap is 32 KB

[sandbox_workspace_write]
network_access = true                       # npm, web research, whisper model downloads

[tools]
web_search = true
```

Setting names change between Codex versions. If Codex complains about one, run `codex --help` and check the current
config reference at https://github.com/openai/codex/blob/main/docs/config.md. Web search can also be switched on per session with
`codex --search`.

### `AGENTS.md` (put this in the `videos/` folder)

Codex loads this at the start of every session. It points Codex at the same rule files Claude uses, so there is one source of truth.
Create `~/Desktop/CODE/videos/AGENTS.md` with:

```markdown
# Agent instructions (Codex)

This workspace was built with Claude Code. **`CLAUDE.md` is the house rulebook and applies to you in full.** Read it first, then
follow its "Start here" list exactly:

1. `inspiration/know-how/HER-STANDARD.md` (one page of every current rule; read FIRST)
2. `NEXT-SESSION.md` and `STATE.md` (what is open, where every project stands)
3. `FEEDBACK.md`, `THUMBNAILS.md` (for any thumbnail), `PROCESS.md`, `CHECKS.md`, `RESOURCES.md`, `REFERENCE.md`
4. `inspiration/know-how/SOCIAL-PLAYBOOK.md`, `inspiration/know-how/HER-VOICE.md`, `inspiration/tiktok-references/INDEX.md`
5. `studio/README.md` before touching anything in the studio
6. `agent-memory/*.md`: notes carried over from earlier sessions (who she is, her taste, standing rules). Start with
   `agent-memory/MEMORY.md`. When you learn a lasting preference, add or update a note there in the same format.

## Translating Claude-only words in the rule files
- "**agent** / **subagent** / **helper** / **fresh agent**" → do that step yourself as a separate, clearly marked pass. For a critic
  round, review the work as a harsh outside reviewer who did not build it (default reject, frame numbers, measurable fixes).
- "**social-strategist agent**" → read `.claude/agents/social-strategist.md` and follow it as your role for that task.
- "**skill** `motion-design` / `better-typography` / `review-animations`" → read `.claude/skills/<name>/SKILL.md` (and the files
  next to it) before that kind of work.
- "**WebSearch / WebFetch**" → your web search tool.
- "**memory**" → `agent-memory/`.
- "**Bin / Trash**" → `rm -rf` is not allowed here: move things to `~/.Trash/` and say so.

## Non-negotiables (full detail in CLAUDE.md)
- She exports, not you. Never put files in ~/Downloads; review renders stay in the project (`build/`, `outputs/_review/`).
- Check `df -h` and running renders (`pgrep -fl "ffmpeg|chrome-headless"`) before any render. One heavy render at a time.
- Plain words for her (she is not a developer); give exact paths and studio links.
- When you finish work for her, start the studio (`node studio/server.mjs`, http://localhost:7700) and give her the editor links.
- New feedback from her goes into `FEEDBACK.md` and `inspiration/know-how/HER-STANDARD.md` the same session.
```

### Skills (optional)

Codex can also pick up skills on its own. If your Codex version supports them, link the workspace skills where it looks
(`~/.codex/skills/`); otherwise the `AGENTS.md` lines above already tell it to read them:

```bash
mkdir -p ~/.codex/skills
for s in ~/Desktop/CODE/videos/.claude/skills/*; do ln -sfn "$s" ~/.codex/skills/"$(basename "$s")"; done
```

### First run

```bash
cd ~/Desktop/CODE/videos
codex
```

Then ask it: *"Read AGENTS.md and the start-here files, then tell me where every project stands and what is waiting on me."*
If its answer matches `STATE.md` and `NEXT-SESSION.md`, it is set up right.

---

## 5. Things that do not carry over

- **Connectors** Claude uses here (Canva, Figma, Google Drive/Docs/Sheets, Gmail, Calendar) belong to the Claude account. Codex
  needs its own MCP servers set up in `~/.codex/config.toml` under `[mcp_servers.<name>]` if you want them. None are needed for the
  studio itself.
- **Claude's published artifacts** (claude.ai pages) stay on claude.ai.
- **Fonts**: the studio loads its fonts from `library/fonts/`, so nothing needs installing. Helvetica Neue (her caption font) ships with macOS.
- **Licences**: music and sound effects are Mixkit (free licence, listed in `RESOURCES.md`); the vendored `claude-motion-design`
  repo is MIT.

## Quick checklist

- [ ] memory notes copied into `videos/agent-memory/` before moving
- [ ] workspace copied (without `node_modules`, `build`, `_review`)
- [ ] Xcode tools, Homebrew, node, python 3.14, ffmpeg, whisper-cpp, vulkan-loader installed
- [ ] `pip install numpy pillow`
- [ ] whisper models in `~/.cache/whisper/`
- [ ] `npm install` + chrome-headless-shell in `studio/`
- [ ] quarantine cleared on `studio/vendor/enhance`
- [ ] old `/Users/gbemi/...` paths replaced (only if the username differs)
- [ ] studio opens at http://localhost:7700 and one test export works
- [ ] Codex installed, logged in, `~/.codex/config.toml` written
- [ ] `AGENTS.md` in `videos/`
- [ ] first Codex run reports the same state as `STATE.md`

# Rollout brief (2026-11-10): bring each video up to the HTTP standard

http-status-codes is the model (posted 2026-11-10, https://youtu.be/6ins1mk78mA). Her verdict: the videos are good; thumbnails were
the weak spot; shorts looked too alike. Each of the other 9 videos gets the same four upgrades, in this order. One agent per video.

## Read first
CLAUDE.md, FEEDBACK.md (bottom: 2026-11-07 → 2026-11-10), THUMBNAILS.md (top), inspiration/know-how/THUMBNAIL-STUDY.md (all of it),
inspiration/know-how/SHORTS-PLAYBOOK.md ("Format menu" A-M + "Cover frame"), inspiration/know-how/HER-VOICE.md, the project's
STATUS.md + talking-head/HANDOFF.md + kit/refined-kit.md. Study the HTTP code you will port: projects/http-status-codes/talking-head/
moments/plan.js + common.js (formats, FD.capNew, FD.jRoom, covers), talking-head/tools/covers.py, design/thumbnails/ (directions
01-10, lib/hs.css, lib/bind.js), and its sheets in projects/http-status-codes/outputs/_review/ (shorts-formats-v2.jpg, covers.jpg).
Boards (look at the images): inspiration/boards/thumbnails/ and inspiration/boards/design/ (board.json + img/).

## 1. Thumbnails (most important)
- Bin every existing thumbnail whose words need the video (shorthand, labels, script phrases): move the direction folders + PNGs to
  ~/.Trash/<slug>-thumbnails-old-2026-11-10/. Keep only ones a stranger understands, fixed up. Final set: 10 or more, best first,
  numbered 01-…, a MIX of kinds (photo background / collage / flat graphic / other; THUMBNAIL-STUDY §3), each with 2-3 paired titles
  that add to the words, never repeat them (§2).
- Write the PAIRS first (picture + 1-5 words + title), check each cold, then design.
- Her photos: from HER SHOOT for this video's outfit, `library/her-photos/shoot-2026-10-29/<outfit>/` (README there maps outfit →
  video). Every photo goes through Enhance: `studio/.cache/enhance <in> <out.png> --cutout <cut.png>` (compile once from
  studio/tools/enhance.swift with swiftc if missing), then `swift studio/tools/cutout.swift <enhanced.png> <cut.png> auto` for a
  clean cut-out without the chair. Thumbnails using shoot photos carry class `no-lift` (no extra brightening; add the hs.css rule
  `.t.no-lift .scene .me-c, .t.no-lift .cut { filter: none; }` to the project's lib css). Her face: natural brightness, never lightened.
- Phones: `.phone > .scr` markup only (lib/phone.js makes it realistic; already wired in every lib/bind.js).
- Bold colour grounds may carry a quiet same-hue pattern (§7). Banned list still applies (no gradients, outlines, glow).
- Cold test: a fresh agent (general-purpose) sees ONLY the PNGs, says what each is about, scores alone and with title; fix every one
  under 8 or drop it. Render with the project's design/thumbnails/render.mjs (writes outputs/thumbnails/ + overview.png).

## 2. Shorts: a MIX of formats (A-M)
Port the HTTP format system to this project's moments code (talking-head.json "fmt" per short). Pick by content (SHORTS-PLAYBOOK
"Pick by content"); no format more than ~1 in 4; neighbours differ; at least 4 of the new ones (H I J K M) across the set. Keep her
words, caption timing and in/out points. Use this video's type set (inspiration/know-how/TYPE-SYSTEM.md) and colours, not HTTP's.

## 3. Covers in every short
Same as HTTP: first 0.1 s, drawn over the picture, manifest "cover" {on, dur, at, text, style}, editable at 0:00, one style for the
series, 2-3 colour cards with a quiet pattern; words + face inside y 240-1680 (line around y 300-900). Lines a stranger understands.

## 4. Phones in the edit
Any phone drawn in this project's moments / film code uses `devicePhone()` (studio/runtime/house.js). Check visuals.js etc.

## 5. Kit
Update kit/refined-kit.md: section 2 = the new thumbnails as images `![](../outputs/thumbnails/<dir>.png)` + words + titles, one
recommended upload pair + 2 for Test & Compare; each short block gets its format, editor link and "Cover: <line>"; remove "(plan, not
built yet)" for things that exist; an "Upload" checklist at the top; line 3 date updated. She reads it at http://localhost:7700/kit/<slug>/.

## 6. Ending: outroCard on every short + teaser (unless her clip exists)
Manifest `"outroCard": {"on": true, "thumb": "<this video's recommended thumbnail PNG, relative to talking-head/>", "title": "<the
YouTube title>", "style": {ground, ink, mid, accent from this video's palette}}` (studio/README.md "Ending"). Her clip ("outro") wins
when present (HTTP, database-indexes). Check stills: `node studio/tools/outrostills.mjs <slug> projects/<slug>/outputs/_review/outro
sh01:9x16,teaser:16x9,teaser:1x1,teaser:4x5`. Model: cookies-localstorage-sessionstorage.

## Rules
She exports, never us; nothing into ~/Downloads; review stills only in projects/<slug>/outputs/_review/; ONE heavy render at a time
(render lock studio/tools/lock.mjs / gmlock.py; other agents run in parallel); check df -h; rm -rf is blocked (use ~/.Trash/).
Every text editable in the studio. Don't touch studio/runtime/* or another project's files. Update STATUS.md + HANDOFF.md.
DONE = sheets in outputs/_review/: thumbnails overview.png, shorts-formats-v2.jpg (3 stills per short, format letters), covers.jpg
(full + 3:4 crop); CHECKS for shorts run (text collision, face, short-zoom, label-over-graphic). Report under 250 words: the
recommended thumbnail + title, the format per short, the cover lines, anything she must decide.

- Covers (lesson from scholarships 2026-11-10): the cover line must never touch her face. If her face sits high in the footage, show her still lower/smaller on the cover frame and put the line above her head.

# Build brief, November 2026 batch (main session, 2026-11-02)
Her picks: dark-patterns = C "Blown up" + B split scene (POST BEFORE 11 NOV) · scholarships = B "Now Boarding" + C city photos behind her per country (post before 13 Nov) · working-full-time = B "Time card" + A's dial for the "one 24 hours" part (apply the 5 open round-2 fixes first). Each project's `film/stills/directions/README.md` + HANDOFF.md hold the look in numbers and the tools that drew it.

## Read first (every agent)
CLAUDE.md, STATE.md, FEEDBACK.md (ALL, incl. every 2026-11-02 entry), REFERENCE.md (the bar to beat), PROCESS.md, CHECKS.md (report the table), studio/README.md, studio/PROMPTS.md, inspiration/know-how/ (SOCIAL-PLAYBOOK, MOTION-REFERENCES layouts, SHORTS-PLAYBOOK, SOUND-PALETTE, TEASER-PLAYBOOK, HER-VOICE), the project's kit/refined-kit.md (titles, opening, chapters, shorts plan in section 3 with posting captions, edit notes, questions), kit/transcripts/ (CLEANUP.md cut list + cuts.json + corrections.json; word times: use token `t_dtw`), STATUS.md. Look at a past project that was fully built (e.g. projects/october-attacks or phone-distraction) to see how film.json, scenes, talking-head moments, shorts and teasers are wired in the studio.

## Her rules that bite in this build
- Her recording is NOT pre-cleaned: apply the CLEANUP cut list (retakes, dead air, pauses) everywhere.
- **Fix factual slips in the edit** (FEEDBACK 2026-11-02): big ones = pause her, plain screen in the video's look where the correction types on, then back; small ones = a card or corrected caption. The kit's questions/facts lists say which.
- She is always on camera in shorts; no timers in shorts; vary caption/top-title styles per the chosen look and the playbook; black phrase cards; receipts (real pages, credited) within 5 s of claims; Pexels allowed (credit in film/assets/CREDITS.md).
- **SHE EXPORTS, NOT US** (2026-10-26): never put anything in Downloads; review renders stay in the project (`build/`, `outputs/_review/`) and are binned after checks. Everything must be editable in the studio (`txt()/grp()/ovr()` + `regBox`, every text editable, every box resizable).
- Never flip or retouch her footage.

## Deliverables per project (see CLAUDE.md "Deliverables")
1. Motion film in the picked look, in the studio (`film/film.json` + scenes; /edit/<slug>/), 16:9 + 9:16 recomposed, cleaned voice, word-timed, sound per SOUND-PALETTE, music bed, -14 LUFS.
2. FULL talking-head edit: her whole cleaned video with motion throughout in varied layouts (≥ 4 layouts/min, same layout never twice in a row, something changes every 3-6 s), corrections in the edit, her captions per the look. Moment editor.
3. Shorts: every short in the kit's section 3 that is cut from the long video (9:16, standalone for strangers, her outro clip at the end per manifest `outro`, no overlay shout, no timer).
4. Teaser (TEASER-PLAYBOOK; a side countdown is allowed here).
5. ≥ 20 thumbnails (THUMBNAILS.md gates; a mix of kinds) and Instagram + LinkedIn carousels (DESIGN agent).
Fresh critic rounds (harsh, default reject, 8/10 bar, ≤ 3 rounds). Lab loop tools: studio/tools/lab.mjs, soundqa.py.

## Agents and ownership
FILM agent per project owns `projects/<slug>/film/`, `talking-head/`, `outputs/` except thumbnails/carousels. DESIGN agent per project owns `design/` and `outputs/thumbnails|carousels/`. Nobody edits `studio/` shared code: write requests in `projects/ENGINE-REQUESTS.md` and work with what exists (if blocked, say so in your report).

## Machine rules (disk ~20 GB free)
ONE heavy job machine-wide: mkdir lock `/tmp/gm-render.lock` (loop with sleep, owner file, rmdir after) around every ffmpeg encode, 4K read, matte pass. H.264 1080p review renders only; keep current + previous; mv temp to ~/.Trash/; never image sequences. Stop exporting if < 8 GB free. Long jobs in the background with progress. Keep a `HANDOFF.md` current in your area (network cuts happen). Studio must be running at the end. Final message: plain words, editor links, CHECKS table, open questions.

## Batch 2 builds (her picks 2026-11-02 night)
cheapest = A Price Check · doomscrolling = A Offline Bingo · research papers = A The Margin + B "Figure 2" layout · http = B The First Digit · cookies = A Crash test + cloakroom scene · learn to code = B You are the reviewer + A's ladder for 4.5% · edge cases = B The Field. Each project's directions README ends with "Her pick".
**Outro clips:** the old "full video on YouTube" clips in other projects are NOT generic (they show that video's thumbnail/title): never reuse them. End shorts and teasers on her last word or an end card until she records outros for the video.
**Corrections:** an ENGINE agent is building a real "pause her" insert; use it once ENGINE-REQUESTS.md marks it READY.
**Disk is tight (~18 GB, 10 builds share it):** review renders only at 720p where possible, bin each after its check, keep nothing but the current review render per output. If free space < 10 GB, stop rendering and report.

## Render queue rule (2026-11-06, main session)
Ten projects share ONE render lock. Each agent keeps at most ONE queued render job at a time; never start a second export while one is waiting; prefer range exports or 720p for review renders. Priority order: dark-patterns (post before 11 Nov), scholarships (13 Nov), then the rest.

## 2026-11-07 CHANGES (her feedback; read before continuing)
1. **Re-type everything** to the project's assigned set in `inspiration/know-how/TYPE-SYSTEM.md` (talking-head edit, shorts, teaser, thumbnails, carousels). Remove thick borders/outlines/stamp frames/rings/outlined captions and handwriting fonts. Do it in the shared look file once, then re-check on a contact sheet.
2. **No separate motion film**: stop work on `film/` as a standalone deliverable (keep any scene code the edit reuses as inserts). Don't render or critique the film.
3. **Thumbnails**: use her new photos in `library/her-photos/` (no mic) for the photo-led ones.
4. **Lean work** (PROCESS.md): contact sheets, one critic per piece on a sheet, range exports, brief reports.

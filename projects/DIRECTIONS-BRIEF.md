# Directions brief for the 4 kits of 2026-10-12 (claude-rule, database-indexes, phone-distraction, ux-research)
Shared by the four direction agents. Written by the main session.

## Her ask
"Blow my mind… post this on X and boast it came from one take." Each video gets a PECULIAR video type that fits its nature. Outputs per kit: (1) motion film (full script, 16:9 + 9:16, editable in the studio), (2) FULL talking-head edit with graphics (her whole video, many layouts), (3) shorts (standalone, her caption style), (4) ≥ 20 thumbnails, (5) Instagram + LinkedIn carousels. This phase = DIRECTIONS ONLY (gate: she picks before any full build).

## Read first
CLAUDE.md (esp. "Every video gets its own look", Motion rules, Sound rules, Banned), FEEDBACK.md, PROCESS.md, CHECKS.md, studio/PROMPTS.md (write the brief in numbers), studio/README.md, inspiration/know-how/*.md (MOTION-REFERENCES layout menu L1-L13, SHORTS-PLAYBOOK caption spec, SOUND-PALETTE, Florence motion lab, harness + 8 explainer styles), the project's BRIEF.md + kit/refined-kit.md + transcript, her motion references (inspiration/motion-references/, contact sheets in the know-how notes), RESOURCES.md galleries (Skillry, whatships) for fresh references, and look at what NOT to repeat: projects/reading-stack/film/stills/ (deck look) and projects/ghana-marrify/film/stills/directions/A-blink (Blink).

## Starting points (distinct per video; you may propose better, but keep the four videos visibly different from each other)
- claude-rule (4:32, news + ethics, AI): a CHAT-INTERFACE / kinetic-typography film: the conversation itself is the stage (message bubbles, "This chat has ended", typing indicators, the rule text highlighted from the real Anthropic announcement), editorial type, tense calm.
- database-indexes (11:00, technical explainer): a DIAGRAM / Manim-style or ISOMETRIC data film: tables, B-tree, phone book, query plans (Seq Scan vs Index Scan) built step by step with exact timing; code typed on; the "fast then slow" app.
- phone-distraction (14:57, design ethics, attention): the PHONE'S OWN UI as the stage: red badges, pull-to-refresh, infinite feed, autoplay, notifications, a home screen made boring; dark-pattern anatomy; real news clippings (EU, Meta) captured as real sources.
- ux-research (12:56, career + method explainer): PAPER COLLAGE / whiteboard / sticky-note research wall: interviews, card sorting, personas, "what people say vs do", UI vs UX split, app walkthrough of a pretty-but-unusable screen.

## Deliver (per project, under projects/<slug>/film/stills/directions/)
1. 2-3 film directions, each: a one-paragraph concept naming the video type + the reference videos it draws on (by file/link), LOOK (palette hex, type, grid), MOTION (easing/springs/durations in numbers), signature transitions with their carriers, SOUND palette roles (varied: shutters, risers, ticks, typing…; whoosh ≤ 1 in 6), 4 stills in 16:9 + 2 in 9:16 (real lines she says, real sources credited, illustrations labelled), and one 6-10 s motion test (16:9 mp4, sound optional but nice). Contact sheet per direction.
2. TALKING-HEAD (full edit) style frames: 4 stills over her REAL footage (frames from kit/*.mov, never flipped) showing 4 different layouts from the layout menu, matched to the chosen film directions (e.g. L5 half-and-half with the film's motion, L2 words behind her, L7 pop-around, L11 corner cam).
3. SHORTS style frames: 2 stills (9:16) of one proposed short: the top label + her caption spec from SHORTS-PLAYBOOK (Helvetica Neue Medium from /System/Library/Fonts/HelveticaNeue.ttc, local renders only), one with her footage and one with a full-screen film scene.
4. Fresh critic (Agent tool, foreground, harsh motion director, default reject): scores each direction on fit to the video's nature, originality vs our past films and vs the other 3 kits (read projects/*/film/stills/directions/ of the others if present), craft, readability; up to 2 rounds.
5. Update the project's STATUS.md (directions row) and write film/stills/directions/README.md (directions, scores, your recommendation).

## Machine rules (DISK IS CRITICAL: ~11 GB free)
Keep each project under +600 MB for this phase. No image sequences; stream frames into ffmpeg; mv temp files to ~/.Trash/. One heavy job at a time machine-wide: mkdir lock /tmp/gm-render.lock (loop, owner file, rmdir after) around ffmpeg encodes and 4K frame reads. Don't build full films, don't touch other projects' files, don't change studio/ shared code (if a direction needs an engine feature, describe it). Final message: concise: directions + scores + recommendation, paths, open questions.

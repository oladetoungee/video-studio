# Full-kit brief (2026-11-12): bring one video's thumbnails, shorts, teaser and kit to her standard in ONE pass

Her words: "Using our actual design, let's work on the rest of the kits. I don't want to keep going back and forth making
corrections. I'm too tired for that." So the bar is: she reviews FINISHED work. Nothing goes to her that fails a rule below.

## Read first (all of it)
1. inspiration/know-how/HER-STANDARD.md (the rulebook; every line applies).
2. CLAUDE.md (Banned, Her taste, Motion, Sound), THUMBNAILS.md (2026-11-12 notes at the bottom), inspiration/know-how/
   THUMBNAIL-STUDY.md, SHORTS-PLAYBOOK.md, TEASER-PLAYBOOK.md §0a (v3), HER-VOICE.md (any text she posts).
3. The boards (LOOK at the images): thumbnail board inspiration/boards/thumbnails/ (contact sheets: scratchpad yt1-3.jpg if
   present, else make your own), shorts formats inspiration/short-formats/ (formats.json + frames/), design board
   inspiration/boards/design/, FONT BOARD inspiration/boards/fonts/ (board.json + picks.json + img/).
4. The project: STATUS.md, talking-head/HANDOFF.md, kit/refined-kit.md, talking-head/talking-head.json, moments/*.js.
5. The model projects just finished: projects/cheapest-european-countries-for-nigerian-students (shorts with 3 board refs,
   font-board fonts, covers incl. "big"/"frame"/her-room styles, Shift+Enter line breaks: moments/*.js) and
   projects/the-edge-case-you-think-is-impossible (teaser v3: talking-head/teaser/).

## Thumbnails (10-12)
- Each copies a DIFFERENT board composition (cite "board"); max 2 of "words left / her right"; a mix of real photos /
  objects / flat / collage / split; some with no face. Words: what the video gives a stranger, plain, search words people
  use; niche terms in the TITLE. 2-3 titles each.
- Fonts ONLY from the font board, used with their source colours (same font + text colour + background colour).
- Her shoot photos for this video's outfit (library/her-photos/shoot-2026-10-29/README.md) via Enhance + cutout; face
  natural (no-lift). Words on photos pop. No gradients as grounds, no glow, no outlines on text, generic UI only, no
  invented facts. Every word editable.
- Fresh critic on PNGs alone: fix or drop anything under 8 or flagged "looks alike". Sheet vs board refs.
- Layout census on a 320 px sheet: count "words/card left + her right"; more than 2 = rebuild before reporting.

## Shorts (all of them)
- Each short: 3 board format refs for its layout ("board": [n,n,n]); 1-2 fonts from the font board with their source colours
  ("fonts", "colours"); no two neighbours alike; no reuse of the last projects' looks (no line-pattern grounds, no dark stat
  cards, no shared caption style).
- Covers: plain + targeted words people type on TikTok/YouTube (search to check), not "X: Y" research titles, not the same
  pattern twice; kinds vary (her in her REAL room background / big line alone / a slide from the short); never text on her face.
- Captions: short phrases (2-5 words), never on her face/hands/mic, never over a graphic, never overlapping a title.
  Labels/titles inside the top band (max 2 lines, auto-shrink). Shift+Enter line breaks work in covers and titles.
- Zoom only as a quick punch-in at a key moment; nothing sitting zoomed. Graphics appear when she says the thing.
- Each short starts where its idea starts and stands alone; cut retakes/asides cleanly (check the voice with whisper).
- Mix: music -15, sfx -7 (each short's edits "mix"). Ending = her "Full video on YouTube" design (outroCard, recommended
  thumbnail).

## Teaser (v3)
- One relatable stretch kept whole as the hook -> the idea in one line -> 3-5 examples, each a complete mini-thought she
  names out loud, with a title card -> her takeaway -> ending. Write PLAN-v3.md as plain text first; read it cold.

## Checks before reporting
- composite.mjs check per short/teaser (0 collisions, labels in band, face, zoom), covers sheet, shorts sheet (3 stills each
  + its board refs), teaser voice transcript, thumbnails sheet vs board. A fresh critic on the sheets. Fix until it passes.
- One heavy render at a time (pgrep -fl composite.mjs / render.mjs; others may be rendering: wait).
- Don't export, nothing into ~/Downloads, rm -rf blocked (mv to ~/.Trash), don't touch other projects or studio/runtime.
- Update kit (sections 2, 3, 4, upload checklist, line 3 date), STATUS.md, HANDOFF.md.
- Report: thumbnails table (words, title, board, fonts, score), shorts table (refs, fonts, cover line), teaser order +
  length, critic verdicts, sheet paths, editor links.

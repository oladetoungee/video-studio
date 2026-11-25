# Same Language, Different Code (Øredev 2026 talk)

Talk: Øredev 2026, Malmö, **Thursday 5 November 2026, 10:20**, 40 minutes.
Script: her latest script pasted 2026-11-04 (no outbox / retry storm / load shape; Forgiveness is row 6). Older handoff: `kit/same-language-different-code-decisions.md`.

## The deck
- Open it: http://localhost:7700/p/same-language-different-code/deck-v1/index.html (studio running) or double-click `deck-v1/index.html` (works offline, no internet needed).
- How to present: `deck-v1/HOW-TO-PRESENT.md`.
- Look: "Two Kitchens". Poster type (Anton / Archivo / JetBrains Mono / DM Mono / Instrument Serif italic), flat grounds, technical-drawing marks. Red = the Lagos kitchen, blue = the Tallinn kitchen, lime = a decision. Press T for a dark version if the hall is dark.
- Every slide is a small motion piece: builds on each click, typed code, drawn diagrams, animated maps (d3-geo, bundled offline).
- Files: `deck-v1/slides/01-opening.js` … `08-close.js` (one file per section; words for each slide sit at the top of each slide in `notes`), `deck-v1/config.js` (her LinkedIn + the QR link), `deck-v1/assets/` (photos, real source screenshots, credits in `assets/CREDITS.md`, fact checks in `assets/ASSETS-REPORT.md`).
- Backup PDF: `node deck-v1/tools/pdf.mjs` → `deck-v1/build/deck-backup.pdf`.

## Waiting on her
- Her LinkedIn address and the link for the QR code (put both in `deck-v1/config.js`).
- Whether the hall is dark (then press T before starting).

## 2026-11-04: v1 rejected (too much text, didn't like the poster look/font). v1 kept in deck-v1/. v2 starts from 2-3 directions for her pick.
- v2 directions (2026-11-04): A · The Same System (Geist, diagram), B · The Kitchen (Onest, illustrated objects), C · One World (Instrument Sans, travelling map). Page: http://localhost:7700/p/same-language-different-code/directions/index.html. Waiting on her pick (or a mix).

## 2026-11-04 (later): v2 = her pick "a mix"
v1's motion + story, Direction A's simple clear look (Geist, warm white, fine lines). Built in `deck/` (v1 stays in `deck-v1/`).
Added: slide numbers on every slide; practice bar (slide no., go to slide, fold-out script per slide that follows the clicks). Turn off for the talk in `deck/config.js` (`practice: false`).

## 2026-11-04 (review round 1, slides 3-60 applied)
- Her notes for old slides 3-60 applied (fewer clicks, no tiny tags, no mono tag font, no 01/02 numbering, fact notes folded into her script, USSD cut to 3 slides, push-pull slide merged into the Pix slide). Deck now 89 slides; every slide's clicks match the [click] marks in her script.
- She'll send notes for the rest (old 61-92, now 60-89) next. Known: the Estonian ID labels on slide 60 overlap ("Gender and century" / "Date of birth").
- Shared copy for her mentor: https://claude.ai/artifact/QmFYGsgM8yuNutS9THWoiZ (built by `node deck/tools/artifact-build.mjs`, CDN libs + datamaps world map; "Comment on this slide" button). Private until she shares it from the page's Share menu.

## Deck review round 2 (2026-11-04)
Her notes for slides 1–89 applied; deck is now **85 slides**:
- Added: slide 2 "about me" (full-stack dev in Estonia, Laravel · JavaScript, MSc HCI at Tallinn University, YouTube + QR).
- Title headline is now "How moving from Nigeria to Estonia rewired how I build software".
- Removed: old 72–74 (forgiveness levels merged into the ladder slide, scripts kept there), old 82 (1,200-byte test; script moved to budgets slide), old 89 (final jollof backdrop).
- Most slides now play by themselves; the remaining clicks match the [click] marks in the script (checked over all 85).
- Slide 60 (ID code) overlap fixed. "Bind to devices" → "Tie each account to the user's own phone".
- QR slide (now 82) points to the shared deck page. That page must be shared publicly before the talk or the audience can't open it.
- Waiting on her: the LinkedIn address (config.js, for the LinkedIn QR on the last two slides) and the photo for the "open to work" slide (now 85).
- Shared page updated: https://claude.ai/artifact/QmFYGsgM8yuNutS9THWoiZ (version 2).

- 2026-11-04 later: her photos (slide 2 headshot, 84-85 yellow photo), LinkedIn QR set. Abstract tie-back added: new slide 80 "What travelled, and what didn't" (universal vs only-true-in-one-place, script carries the "goes both ways" point, no story slide); diverse-teams lines in the + Yours script (24); blind-spot lines in the profile-final script (82). Deck = 86 slides. Shared page version 4.
- 2026-11-04 evening: slide 1 subtitle removed; slide 2 stack row removed; slide 9 once/twice/never at once; slide 11 script (law firms + legal institutions; FleetFox = fleet management software for B2B companies across the EU); car wash slide removed (script folded into the forgiveness row of the profile reveal); India removed from the Uber numbers slide. 85 slides. Shared page version 5.
- 2026-11-04 night: Case 2 cut to two Strachan ideas (atom, routing). Removed the GDPR slide and the "do the same thing every time" slide with their scripts; routing script has no throw/fallback talk; "Idea n of 4" labels gone. 83 slides.
- 2026-11-04 night: state machine slide: refund label is "Refund: a new payment", line rerouted (no overlap). "It's a new design" slide removed with its script. 82 slides.
- 2026-11-04 late: removed "assurance high enough" (script into identity interface slide), money+identity filled rows, the forgiveness ladder (summary lines into the Undo script), "search every store". CI policy slide plays by itself with her shorter script. "What travelled" is now a two-way cycle: Nigeria <-> Estonia, what moves each way, what stays. 78 slides. Backup PDF regenerated.

## Two versions (2026-11-04)
- Version 1 = full talk (78 slides, ~40 min). Version 2 = short talk (67 slides, ~33 min): `deck/slides/short.js` lists the cut slides and shorter scripts; everything else is shared, so fixes land in both.
- Switch: buttons in the practice bar; links `#1` (full) and `#short-1` (short); local tools take `V=short`.
- Short cuts: about-me, jollof (4 slides), Cantrill + values, USSD intro + Vogels, Toxiproxy checks, duplicate name slide. Shorter scripts: crontab (adds a one-line hello), lagos-clock, two-kitchens ("built in both places"), not-i18n, profile rows, + Yours, one packet, USSD session, Toxiproxy, What travelled.
- PDFs: deck/build/deck-backup-full.pdf, deck/build/deck-backup-short.pdf.

## 2026-11-04 · Mentor review of version 2 (short) applied
- Short version now 62 slides, ~30 min of script (+ audience moments ≈ 33–35 min). Full version 81 slides.
- New in BOTH versions: "Three stories" slide before Case 1; "What would you do?" Uber question after the mismatch slide; internet-gap chart before the USSD session (ITU Facts and Figures 2025: Africa 36% online vs 94% high-income; mobile data ~7× the income share in lower-middle-income countries); "case study" → "story" in scripts; end slide: no photo, "Open to work" big, name smaller, LinkedIn QR.
- Short only: about-me back, after the cron story (after lagos-clock); USSD intro back with "does anybody remember USSD?"; cut three-words, routing-code, side-doors, jurisdiction-filled, state-machine, sim-defences, identity-provider, identity-cost, budgets, takeaways, profile-final; new identity-question slide (short only); takeaways + profile-final scripts merged into the QR slide; reading/test/Toxiproxy scripts shortened.
- Engine: `only: 'short'` slides, `after:` moves in short.js. `node tools/list.mjs short|full [ids]` lists slides, timing and click checks.
- Kept for her decision: Volvo slides (43–44 in short).

## 2026-11-04 · Two links, short version only
- Presenting copy (slides only, no script/comments, Full screen button top-right on mouse move, F key): https://claude.ai/artifact/JP61nZY8pTYynhZ5syZioa — built with `node tools/artifact-build.mjs present` → build/artifact-present/. The QR slide points here. PRIVATE until she sets Share → Anyone with the link.
- iPad copy (slides + script bar, swipe, comments): https://claude.ai/artifact/QmFYGsgM8yuNutS9THWoiZ — `node tools/artifact-build.mjs` → build/artifact/.
- config.js `version: 'short'` locks the deck to version 2; the version switch is gone (delete that line to bring it back). Swipe left/right works everywhere.
- Backup PDF: build/deck-backup.pdf (62 pages). Old full/short PDFs moved to the Bin.

- 2026-11-04 (later): about-me back to slide 2 (her call: "weird in the middle"). It opens with "Hi everyone."; the cron slide opens with "So, I want to start with a question." Presenting link is now shared as Anyone with the link.

- 2026-11-04 (later): iPad copy = CONFIG.glance (set by artifact-build.mjs): no clicks, one swipe = one whole slide shown finished, script panel always open and grows to fit the whole script (slide shrinks above). Tested at iPad landscape 1180x820: no slide needs scrolling. R now really replays (forced re-entry); #N slide links fixed.

- 2026-11-04 (final): slide 58 names Open Policy Agent and Checkov at the top; last slide = Open to work + name left, LinkedIn QR 560px right; QR codes drawn as one gap-free path. She said: done.

- 2026-11-04 (final): slides QR (slide 60) now ends in #no_universal_links: phones with the Claude app opened claude.ai/artifact links in the app (home screen) instead of the slides; that fragment is excluded from the app link rules (claude.ai/.well-known/apple-app-site-association), so it opens in the browser.

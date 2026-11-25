# Overnight log (run of 2026-11-16 night)

Resume rule: read OVERNIGHT.md, then this log; continue from the first step not marked DONE.

## Step 1 · Conversational captions (8 kits): DONE (all 8; CHANGES.md in each archive/captions-2026-11-16/)
- 2026-11-16: brief written; one helper agent per kit (text only). Old text goes to projects/<slug>/archive/captions-2026-11-16/refined-kit-before.md.
- Projects: cheapest, dark-patterns, edge-case (rest), learn-to-code, cookies, doomscrolling, research-papers, working-full-time.
- DONE research-papers (66 blocks, CHANGES.md in archive/captions-2026-11-16/). Her: 6e "which AI" reply names no tool; 6a borrows "(I don't really have a choice🫠)" from her reading post.
- DONE learn-to-code (48 blocks; fixed 'Developer Developer', repeated sentences). Her: emojis added (🫠 x1, 😅 x3); 'in usual fashion' reused; 'human in the loop' line waits on kit Q10.
- DONE edge-case (77 blocks, 6a untouched). Her: carousel captions still list stories (paused); 6a keeps 'In this video I went through'; 6b tweet 1 reuses her 6a opener.
- DONE dark-patterns (76 blocks; no A/B part). Her: Digital Fairness Act draft (due 11 Nov) may be out, check SH13/IS2; 6a 'Hidden costs are the big one for me' slightly beyond her words; SH1 LinkedIn says 'linked in the description'.
- DONE cheapest (58 blocks + pinned 1e/6e). Her: SH8 LinkedIn now says '(I have a separate video on scholarships too)'; 6e 'For me it has been' (Estonia worth it).
- DONE cookies (64 blocks). Her: part-2 replies (Laravel, JWT) wait on a part 2 video; check 3 small opinions (SH1 LI 'best place to start', SH5 LI aside, 6e comment).
- Checked 23:15: all 8 kits are their own text (title same as backup, 94-137 lines changed, 0 dashes in prose).
- DONE working-full-time (61 blocks; 'not to die' + 'real ghetto' checked: her words). Her: keep 'real ghetto' in SH2 TikTok?; ready reply promises a job-search video.
- DONE doomscrolling (71 blocks). Her: 6a could name the habit she reaches for most; essay says banana bread failed "three times" (recording doesn't say a number).

## Step 2 · Weakest items toward 8/10: DONE (20 thumbnails + 7 shorts improved, none at 8)
- Brief projects/WEAKEST-BRIEF-2026-11-16.md. Thumbnails ALL 8 DONE (results below); wave 1: cheapest, cookies, WFT, learn-to-code. Wave 2 RUNNING (agents): research, edge, dark, doom. Shorts helper RUNNING (WFT -> research -> cheapest -> dark).
## Step 3 · Shift+Enter line breaks: DONE (all covers/labels/titles pass in 8 projects; only mock-up UI lines inside graphics left; tool kept at studio/tools/breaktest.mjs)
- Test harness: scratchpad brk/breaktest.mjs (renders each cover/label/title with the words on one line vs a typed break; identical pixels = ignored). Results brk/<slug>.jsonl.
- First run: cheapest 25/25 OK. Fails: tagK (small top-left tag) in 6 projects -> PATCHED formats.js tagK (backups archive/linebreaks-2026-11-16/formats.js). Rerun (all times): doom, cookies, research now pass; dark label/sub PATCHED looks.js. WFT cover/sub PATCHED, learn LB.T PATCHED (WFT 22/22, dark 31/33 = only mock-up labels). Still to fix: label/poster (doom sh08, dark sh06 sh09, research sh06 sh10, learn sh04), label/sub (dark sh11 sh13), cover/sub (WFT sh02 sh04 sh06 sh08), cover-mono (learn sh03), label/label on cover frame (doom sh06, cookies sh01, research sh02).
## Step 4 · Teaser 1:1 / 4:5 captions off her chin: DONE (chincheck 0 hits in all 8 teasers, 1:1 + 4:5; text collisions unchanged; sheet cookies outputs/_review/teaser-1x1-captions-before-after-2026-11-16.jpg)
- INCIDENT fixed: a // comment in cheapest+WFT common.js swallowed code (bx0) for a few minutes; fixed with /* */, all shorts render again (breaktest 0 errors).
- Left (old, not captions): dark teaser 1:1 0.2 s popup link vs topic sub, 4:5 0.7 s popup 'off' vs topic; edge 4:5 5.7 s orders mock-up labels.
- composite check's face test is wrong in 1:1/4:5 (caption boxes canvas px vs faceOut layout px). New tool studio/tools/chincheck.mjs maps the face through BASE; chin = 0.88 of the face box (measured on 2 frames).
- Before: captions on her face/chin in 7 teasers (window layouts: across her mouth). Edge-case clean.
- Fix: new runtime helper capClearFace(t, yTop, bh) at the end of studio/runtime/layouts.js (backup studio/archive-2026-11-16/layouts.js), only acts when visRect() (1:1/4:5): below chin -> just above her window (panelRect bottom) -> above her head. Used by the shared shorts caption drawer (dark, learn, cookies, doom) + project drawers: research common.js, cheapest common.js, WFT common.js (backups archive/chin-2026-11-16/).
- Note for posted HTTP/scholarships: their teasers use the shared drawer; only matters if re-rendered.
## Step 5 · Ideas board: DONE. 4 ideas merged (59 total): trust-your-hands (thought, 7), connected-no-internet (tech, 7), instagram-teen-ai (news 9 Nov, 8), spouse-estonia-student (study abroad, 8). Her: who said 'trust your hands'; her opinion gap on Instagram (post soon); confirm the 2-year spouse rule with politsei.ee; iPhone or Android for the Wi-Fi short.
## Step 6 · Morning review pack: BUILT once (re-run after shorts): pages projects/<slug>/outputs/_review/morning-2026-11-17/index.html, index MORNING-2026-11-17.html, decisions projects/MORNING-DECISIONS-2026-11-17.json. Generator (studio/tools/morningpack.py <decisions.json> 2026-11-17); run after thumbnails. Recs: cheapest 01, dark 02, edge 01, learn 02, cookies 01, doom 07, research 08, WFT 03.
## Morning report: DONE (top of NEXT-SESSION.md; STATE.md top block; CHECKS.md +2 checks; studio running; MORNING-2026-11-17.html opened)

### Step 2 results (as they land)
- THUMBS cheapest DONE: 03b 6->7, 06b 5.5->6, 08b 6->6.5 (none at 8). Sheet outputs/_review/thumbnails-before-after-2026-11-16.jpg. Her: keep 08 or 08b (look alike); 02 vs 10 both price lists; 03/06/03b same flat face (needs expressive photo); €11,904 on 4 thumbs.
- THUMBS cookies: 06b/09b/12b did NOT beat old (moved to archive/thumbnails-weakest-2026-11-16/). Set unchanged. Critic: 01 (recommended, 6 alone) has empty grey cart squares -> sent helper back for 01b (old 01 kept). Her: 08/13 same cookie photo; 01/10 both yellow UI.
- THUMBS WFT DONE: 01b 6->7, 02b 5->7, 06b 5->7 (harsher critic: 03 got 7 this round). Her: every thumb has the same neutral face/white tee; critics want tired/smiling/overwhelmed photos (none in outfit-B shoot).
- THUMBS learn DONE: 04b 6->7 (no face, circled double charge), 05b 5->7 kept; 06b not kept (Trash). Her: needs 3-4 expressive outfit-D photos (all thumbs same flat face/crossed arms). Unapplied critic notes: 04b "CHARGED TWICE" tag, 05b bigger code card, 02 visible error, 01 label the %.
- THUMBS cookies 01b DONE: 01 5 -> 01b 7 (shoe + bottle drawings fill the cart). 08 scored 8 alone this round. Her: 01 vs 01b (if 01b, swap the ending-card picture too).
- THUMBS doom DONE: 04b 6->7, 09b 7->7.5 (best). Recommended 07 scored 5/6/6.5 (no phone cue) -> sent helper back for 07b. Her: 04 vs 04b look alike; hobby photos + reaction faces are what lifts the set to 8.
- THUMBS edge DONE: 07b 4-5 -> 8/7.5/7 (top every round), 03b ~6.5 (vs 5.5), 04b ~6.5 (vs 6). Her: Test & Compare 06 has "O'Brien" and 05 has "29 February" (story details, her 11-12 rule) and 05 scored 4-6 -> suggest 07b for a Test & Compare slot.
- THUMBS dark DONE: 03b 5.3->6.3, 06b 5.5->6.7, 08b 5->7 (Test & Compare 08 was 5 every round); 07b lost (Trash). Note: full render.mjs re-rendered all dark PNGs from their sources. Her: pick one of 03/03b, 06/06b, 08/08b; 08b for Test & Compare?; 02 + 12 share the 09:59 timer; 12 'LEGAL' clipped reads as a glitch.
- THUMBS research DONE: 02b 5->7 (4 hours | 10 minutes, Keshav's own numbers), 09b ~level with 09 (6.5 vs 6.7), 05b dropped (Trash). Her: 02b into Test & Compare?; 09 or 09b; recommended 08 scored 6-6.5 alone this time (8.5 with title earlier) - flagged, not reworked.
- THUMBS doom 07b: 07 5 -> 07b 6 (adds "scrolling"); round 4: 01 7.5 best; 09b vs 09 about even. Her: 07 now scores 5-6.5; 07b/01/03/04b score higher -> revisit the recommendation (her call).
- SHORTS helper: network drop mid research sh04/sh06 round 2 (00:xx 11-17). WFT done (sheet outputs/_review/sh06-before-after-2026-11-16.jpg; backups archive/weakest-2026-11-16/). Checked all WFT + research shorts build (0 errors). Resumed.
- SHORTS DONE (7 kept, 2 reverted): WFT sh06 3->6 (time card had silently dropped out of sh06 AND the full edit since 11-13; restored; new week insert); research sh06 4->5, sh04 4->5; cheapest sh03 4.5->5 (ICEF/decree headlines whole); dark sh14 4->5 (team photo half), sh04 6->6.5 (€40 gap). Not done: dark sh02 magnifier. Critic asks: more inserts, end cards ~3 s (shared outro), sh14 real visual. Proxies need refresh before export.

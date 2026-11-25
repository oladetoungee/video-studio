# cheapest-countries FILM agent hand-off (resume from here)
Brief: projects/BUILD-BRIEF-2026-11.md (batch 2). Her pick: A · Price Check (film/stills/directions/README.md).
Order: full talking-head edit -> shorts -> teaser -> film. Corrections: France 964 h (pause her), France €877.50 since 1 Aug 2026
(card WAS €615 / NOW €877.50), Germany 280 HALF days (caption + label), Austria €1,505.84 a year (card), Czech "$6,000" CUT.

## Done
- talking-head/tools/words.py -> data/raw_words.json (t_dtw - 0.08, corrections.json + whisper fixes). thsetup: manifest skeleton + face track.
- film/tools/edit_voice.py (cuts: opening trim 5.36-7.37 kit Q1, CLEANUP 1-4, Czech $6,000 502.08-504.85) -> film/audio/voice_edit.flac (672.3 s);
  film/tools/words.py maps raw words -> film/data/words.json + captions.srt.
- talking-head/tools/capture.mjs + capture-spec.json -> assets/src/<name>.png/.json (real page crops).
## Next
fonts + Pexels, clips.js, pckit.js (look), pcsent.js, plan.js, full moment, shorts, teaser, film.

## State 2026-11-06 (after a pause)
- Built: talking-head.json (full + sh01-sh09 + teaser, pauses fix-964; tools/manifest.py writes moments, tools/bites.py the teaser),
  film/scenes/pckit.js (look), pcsent.js (phrases, checked by talking-head/tools/sentcheck.py), moments/common.js (captions C2,
  keywords, top title T3, PC.full), moments/plan.js (shared by full + shorts), shorts/sh01-09.js, teaser/teaser.js, film/scenes/film.js.
- Real pages: talking-head/assets/src (capture.mjs; bot-blocked: diplo.de, make-it-in-germany, migri, NHH, TLU, Poznań -> label + source line only).
- meta passes: full 707.8 s (incl. 4.5 s pause), shorts, teaser 96.5 s, film 675 s / 92 scenes / 107 cues. Film stems mixed once
  (AAC -15.3 LUFS, ceiling too low 0.5): NEXT raise film ceiling to 0.8 + sfx roles +4 dB, re-mix.
- Next: review stills of full / shorts / teaser (lock queue is long), fix, critic round, studio links, STATUS.md.

## 2026-11-07 (her changes: BUILD-BRIEF "2026-11-07 CHANGES")
- Re-typed to set 01 (see STATUS.md). Film dropped as a deliverable (kit kept). Design (thumbnails + carousels) now mine:
  thumbnails use her new photos (design/thumbnails/assets/photos, cut-outs via studio/tools/cutout.swift; gen.py scene() and C).
- Review without the render lock: `node talking-head/tools/gsheet.mjs <id> <16x9|9x16> every:N <out.jpg>` (graphics over one
  fixed still of her; boxed layouts show the wrong part of her frame). Sheets in talking-head/build/review, design/review.
- Critic round 1 (fresh, one per piece): full 5, shorts 6, teaser 6, thumbnails top 8 (02, 12, 14), carousels 6.5. Fixes applied; round 2 sent.

## 2026-11-07 evening: switched to set 06 + paper/off-black/orange (coordinator: her note). Critic rounds stopped by the coordinator; self-checked on sheets; all composite checks clean. DONE.

## 2026-11-07 night: "show, don't type" pass (her edge-cases rule, FEEDBACK 2026-11-07 evening) — DONE
Files: moments/visuals.js (NEW, manifest "common" after common.js: PC.dk = any shelf screen on off-black, PC.pic = Pexels photo full-bleed + push,
PC.trio = photo row with one word each, PC.blocked = padlock + balance paying out €992 a month); moments/plan.js (old copy: build/plan.before.js);
teaser/teaser.js (old copy: build/teaser.before.js). ots windows lost their hairline box (edge transparent).
Gone: every keyword (KW) and both TH.cards (they re-typed her sentence), the PC.list "old website" boxes (proof of funds, what changes the cost,
blocked account, Germany 2027, France decree, ISEE, work in Estonia, also add), the two phrase cards that re-typed her ("Lower living cost…",
"Do the numbers…"), screenshot titles that repeated the page, and the long mono lines under labels.
Now: EU passports + euros (b03), lecture / keys / work photo row (b09-b11 and again j16), padlock + countdown (c12-c13), family papers +
"ISEE PARIFICATO" (e03), lecture (h03), two baristas (h11), graduation (i09), calculator (j01), laptop in a library (a07). Dark ground on
the cheap card, photo row, blocked account, Germany 140/280, France fees, Italy proof of funds, OeAD / UDI (now full-frame, readable),
Tallinn, Austria age pair (teaser), ranking.
Photos: px-8197558 lecture, 7489107 keys, 4350036 work, 8524972 family-papers, 53621 calculator, 29229903 graduation, 8085250 laptop-library,
29485310 passport-euro (film/assets/CREDITS.md; images px_<name> in talking-head.json).
Text count: python3 talking-head/build/textcount.py 707.8 talking-head/build/plan.before.js talking-head/moments/plan.js -> 630 -> 343 words, 53.4 -> 29.1 a minute.
Cuts: CLEANUP 4 widened to 361.07-371.42 (the old cut left "list the minimum for a … funds. So for the proof of funds"; now "list the minimum.
So for the proof of funds…"), cut points on the waveform dips. tools/words.py: "own," moved before the cut (it is said; the caption had dropped it),
"which" moved inside the Czech cut (it is not said any more), "check." -> "Czech." (11:59, "Germany or Italy or, you know, Czech").
Checks: composite check full 16:9 + 9:16 layout variety pass (split 37 %, ots 24 %, presenter 21 %, room 11 %, tile 7 %), text collisions 0
(full, sh01-sh09, teaser). Only overflow left: de-plan @her (old, room layout).
Sheets: outputs/_review/before16.jpg + after16.jpg (same 29 times, every 24.4 s).
## 2026-11-07 night, round 2 (coordinator review of after16) — DONE
- Screenshots big: plan.js SRC() = full-frame real page on off-black, hcrop around the highlight (PC.card o.hcrop/minS, new o.hleft for the
  TU Wien list), about 85-90 % of the width: ICEF, Tübingen, LesMRE décret (now its own full screen before the €877.50 label), service-public
  964 h, TU Wien list, OeAD, mv.gov.cz (own screen before the 115,810 Kč label), UDI. Dropped: the TU Wien fee card inside the Austria label.
- film/scenes/pckit.js (old: talking-head/build/pckit.before.js): PC.tag = ONE small label (name unless it is the country: the flag says it,
  + kicker + line joined) and a bigger number; with o.was the old price is the big number until priceAt, then WAS struck + the new one.
  PC.city = photo full panel + one off-black block top-left (big price or the place's name, flag, one label), there within 0.35 s.
  PC.rail = no-op (the hairline crossed the bigger numbers). City inserts and presenter on the dark ground (white captions).
- Captions: visuals.js PC.fixCaps re-cuts her lines: a sentence end or a 0.5 s pause always breaks, balanced lines <= 44 characters.
  words.py: "in a year." re-timed (it fell into a removed pause), and any word whose whisper start sits in a removed pause snaps to the
  kept edge (reads data/edl.json; run words.py again after footedl).
- 659 s: Czech / Italy pair now "€0" vs "Cheaper" (her words: "Italy can work out cheaper on tuition").
- Checks: full 16:9 + all shorts + teaser 0 collisions, layout variety pass; 9:16 version of the full edit one 0.8 s empty panel (old).

## 2026-11-10: shorts in a MIX of formats + covers + "Full video" ending (ROLLOUT-BRIEF-2026-11-10) — DONE, self-checked
- Formats (manifest "fmt" + "frame9" + "topLabel", "label" emptied): sh01 D · sh02 I · sh03 B · sh04 K · sh05 H · sh06 M · sh07 A · sh08 G · sh09 F.
- Code: moments/formats.js (NEW, last in "common"; ported from scholarships' port of HTTP): PCF.setup / fill / titleFmt / capDraw / capNew /
  coverDraw, type set 06 (League Gothic via pckit FX, Inter Tight PCI), off-black #111114 / paper #EDE9E2 / orange #FF4713 key word.
  plan.js: PC_PLAN short calls PCF.setup (else the old 3:4 window), PCF.fill, segs clamped to FOOT.dur, TH restored at the end; spans of
  sh-two, fr-fees, fr-sum, at-year start on their first number (no empty panels). teaser.js: old end card off when FOOT.ocard.
  tools/manifest.py keeps fmt / frame9 / topLabel / label / cover / outroCard and formats.js. Old files: build/*.before-formats.*
- Covers: manifest "cover" {on, dur 0.1, at, text (~word~ orange), style, scale 0.85, shift 600}; cards sh04 (paper), sh08 (orange).
  Stills: tools/covers.py (render lock) -> assets/covers/. Line y 300-680, her head top ~710 (her face sits high in the footage).
- Ending: top-level "outroCard" (thumb ../outputs/thumbnails/01-free-tuition-in-europe.png, the upload title).
- Review: tools/fmtstills.py -> outputs/_review/formats/ + shorts-formats-v2.jpg + covers.jpg; outrostills -> outputs/_review/outro/ (bin after she looked).

## 2026-11-12 (late): shorts copy the formats board + teaser v3 — DONE
- Manifest per short: "board": N (inspiration/short-formats/formats.json item N), "fmt" = layout base (H I K M G D + new X = cut to a full-screen
  insert with her in a circle, S = graphic on top / her below at 50 %, N = M's title box with graphics rising from the foot), "punch" {id, word}
  = one quick punch-in (sh02 affordable, sh05 age). formats.js "board formats" block: PCF.BCAP (captions per board), PCF.BTITLE (titles),
  PCF.icon (67), PCF.gfxNow (a graphic really on screen), cover "big" / "frame" (+ c.maxH / c.top / c.ink / c.credit / c.lines).
  tools/manifest.py keeps board / punch / the shorts' own cuts. Review stills: tools/boardstills.py -> outputs/_review/shorts-2026-11-12/.
- Teaser v3: teaser/PLAN-v3.md + teaser/teaser.js; 5 gaps (4 country cards + DO THE MATHS). TZ.cut numbers bites from 0 (gaps not counted).
- Left from critic round 3: sh05 cover page list is small (texture), sh06 cover eyes, sh09/sh01 both text-only covers; teaser 21 s "CHEAP =" builds on "tuition" a beat later.

## 2026-11-12 (night): shorts v2, LOOK from the formats board — DONE
- Her verdict: the shorts looked like the last three kits (line-pattern ground, dark stat cards, same captions). Now moments/boards.js (last in
  "common") owns the shorts: PCB_PLAN() (shorts/shNN.js) = PCF.setup (fmt H, her full frame z 1) + PCB.SH.<id> (full-screen cuts PCB.cut, overlays
  PCB.over, circle PCB.circle, real pages PCB.page with dof / tape / credit font) + PCF.fill. Captions PCB.CAP[board], titles PCB.TITLE[board], cover type
  PCB.COVER[board] (formats.js coverDraw: no lines any more). Boards: sh01 37 · sh02 62 · sh03 45 · sh04 63 · sh05 21 · sh06 19 · sh07 56 · sh08 15 · sh09 14.
- plan.js PC_PLAN('short') is no longer used by the shorts (full edit + teaser unchanged). Old: build/*.before-v2.*.
- Review: python3 tools/v2stills.py -> outputs/_review/shorts-v2-2026-11-12/.

## 2026-11-12 (late night): shorts v3 (her notes: labels into the picture, fonts on top of each other, ugly fonts, covers = her) — DONE
- moments/boards.js rewritten: LOOK per short (A/B fonts), PCB.block (fit text into a box: max lines, shrink, per-line or whole box, edge, skew, ~hi~),
  PCB.TITLE / PCB.CAP / PCB.COVERS keyed by short id (PCB.B() = id now; manifest "board" is a list of three), PCB.EXTRA (sh03 timer),
  PCB.punchHide (label off during the punch-in), titles hide over any graphic (PCB.topHidden includes PCF.inGfx). sh02 panels via PCB.half0 (z 1).
- Covers: PCF.coverDraw is replaced per short (PCB.COVERS); her frames = assets/covers/<id>.jpg (sh07 at 532.44, sh09 at 700.03 re-cut).
- Check: node tools/v3check.mjs <id|all> [--grab t,t dir] (graphics layer, no render lock). Review: python3 tools/v3stills.py.

## 2026-11-12 (late): covers v4 + her own line breaks — DONE
- PCB.block: text with a typed line break (Shift+Enter) keeps her lines (no re-wrap, shrink to fit); o.fill 'each' (every line fills the width, cap o.zLine)
  or 'first' (line 1 fills, the rest one size). PCB.T draws "\n" as lines. PCF.parts keeps newlines around "|". Manifest cover texts now carry "\n".
- sh01 fill each y 150 · sh03 y 190 · sh06 fill first · sh08 LOOK = Clash Display + Satoshi (cover band, label, big words, no skew/edge) · sh09 LOOK = Cabinet Grotesk + Bebas Neue.
  Fonts load in boards.js pcbFonts (P4Clash, P4Sat, P4Cab, P4Beb). Old: build/*.before-v4.*. Review: outputs/_review/covers-v4-2026-11-12/.

## 2026-11-12 (23:55): font-board pass (her rule: only fonts + colour pairs from inspiration/boards/fonts/board.json) — DONE
- boards.js: font loader = board fonts only (FB* families), LOOK[id].fb / .cb = font-board ids; manifest "fonts" / "colours" per moment (manifest.py keeps them).
- teaser.js: PCL face swapped to Anton, PC colours set to combo-20 for the teaser page only; visuals.js '#EDE9E2' -> PC.cream || '#EDE9E2'.
- Review: python3 tools/fbstills.py [ids|--sheets] -> outputs/_review/shorts-fontboard-2026-11-12/. Old: build/*.before-fontboard.*

## 2026-11-17 weakest pass (shorts) — DONE
- sh03: real-page headlines reflowed onto 3 lines (fr-icef-2l, fr-funds-3l; made from the original crops with PIL, cut at word gaps; json beside them so tools/clipsjs.py keeps them). boards.js sh03 uses them (no minS crop); 'from august 2026' 100 px.
- Backups archive/weakest-2026-11-16/. Sheet outputs/_review/sh03-before-after-2026-11-16.jpg.

## 2026-11-20: caption accuracy pass — DONE (see STATUS.md)
- tools/words.py: new last block "2026-11-20" (_find/_put phrase fixes with times from the turbo pass; "one"/"think." ends trimmed; words starting in a trimmed pause move onto her voice, but never across a gap between two teaser bites). Run footedl BEFORE words.py.
- Manifest edges: sh01 in 41.60, sh02 out 208.30, sh03 in 208.40 / out 300.80, sh04 out 398.28, sh06 in 472.75, sh08 out 675.30, sh09 out 733.95, teaser bite 144.38.
- Files: build/captioncheck-2026-11-20/ (CHANGES.txt, caption-diff-before/after.txt, raw-diff-before.txt, doubtful-clips.txt, edges-after.txt). Voice WAVs in ~/.Trash/captioncheck-wavs-2026-11-20/.

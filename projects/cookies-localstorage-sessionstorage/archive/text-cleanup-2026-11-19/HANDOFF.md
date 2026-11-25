# cookies FILM agent: progress notes (resume from here)
Brief: projects/BUILD-BRIEF-2026-11.md (Batch 2). Her pick: A Crash test + the cloakroom as one scene in A's style.
Order: full edit -> shorts -> teaser -> film.
## Done
- thsetup ran (face track, manifest skeleton). Words: `tools/words.py` (whisper t_dtw tokens from film/stills/directions/_shared/words.json + caption fixes) -> data/raw_words.json.
- Fonts Saira Condensed Black/SemiBold + Chivo Mono copied to library/fonts (OFL); registered by film/scenes/ck.js (FontFace "Saira CK", "Chivo Mono").
- Sources: film/assets/src/ (MDN session, MDN Set-Cookie warning, RFC 4096, WebKit 7 days, MDN quotas line, 4 Pexels).
- Look + graphics: film/scenes/ck.js (CK.*).
## Next
moments/common.js (TH.look + C1 captions), moments/plan.js (CK_SENT + CK_PLAN), manifest moments, stills/review, shorts, teaser, film.
## 2026-11-03 morning (after the usage-limit pause)
- Built: moments/common.js (TH.look, C1 16:9 captions, CK.full, CK.card, shorts ckStyle label/caption styles), moments/plan.js
  (CK_SENT 73 sentences + CK_RAW guard + CK_PLAN), full.js, shorts/sh01-sh09.js, teaser/teaser.js; manifest (full, sh01-09,
  teaser 17 bites + 3 cards, pauses safari-fix d 6 at 193.5, sfx roles, frame9 3x4, maxPause 1.2 = no pause tightening:
  the take is clean and DTW word times sat inside the tightened pauses).
- Correction: pause "safari-fix" (types the Safari 7-day rule) + CK.fix card (both exceptions + the WebKit crop) around it.
- Film: film/film.json, scenes/kit.js + film.js (59 scenes), tools/voice.py -> audio/voice_edit.flac, data/words.json. meta OK.
- Next: review stills (talking-head/build/review/), fixes, export review 720p, critic.
## 2026-11-06
- Bug fixed: CK.lab was both the concrete colour and the label function (grounds drew black in moments): colour is now CK.conc.
- Full 16:9 review export (outputs/_review/talkinghead-full_16x9.mp4) -> critic 6; all items 1-16 applied (chip/headline/caption
  collisions, board footnote, sources one line, panels open with their first line, test numbering in order, "By website, I mean",
  keyword length + lighter green, pause look "frozen" so exception 1 stays). Layout shares now split 26 / presenter 26 / tile 15 / ots 14
  (composite check: layoutVariety pass, textCollision pass).
- Film critic 6.5 -> fixes: stamps inside frame, board pitch + "Private window", board in the cookie chapter + form row, fewer
  type-only runs (readers diagram, cloak tag, trip), sound cues +, end push, "most likely" kept. Film sound -14.5 LUFS, TP -2.9 (AAC).
- Review exports queued one at a time: sh05, sh06 (tools/review_exports.sh lists the rest). Bin outputs/_review after checks.
## 2026-11-07 (her changes: BUILD-BRIEF "2026-11-07 CHANGES")
- Re-typed to set 03 in film/scenes/ck.js (shared) + moments/common.js (captions 16:9 Helvetica Neue 500 + soft shadow; shorts ckStyle lab heavylight|kicker|plain, cap body|word|light|karaoke) + teaser cards. Old Saira version in the Bin (cookies-ck-saira-2026-11-07.js).
- Motion film dropped as a deliverable. Review exports of sh05/sh06 failed (puppeteer protocol timeout while queued): lean reviews now = contact sheets in outputs/_review/sheets/ (bin after).
## 2026-11-07 done
Set 03 re-type finished (full, shorts, teaser); critic fixes applied; checks pass; review sheets binned. Final report sent. Nothing queued on the render lock.
## 2026-11-07 evening: "show, don't type" pass (edge-cases model) — DONE
- film/scenes/ck.js (old: talking-head/build/ck.before.js): every box outline gone (10 strokeRect "old website" frames; the cookie row
  and the "Necessary only" button are flat fills now); CK.stateless has no default kicker; CK.tabs2 o.noHead; scripts title
  "Scripts on the page" (was her sentence); origin card without "By website, I mean"; CK.fix 9:16 rows moved down (title overlap).
- moments/visuals.js (NEW, manifest "common" after common.js): CK.night(draw) = the same graphic on off-black (colour swap while it
  draws). Dark now: cloakroom x3, cookie trip, test 01 (close browser), test 03 (close tab), second tab, cookies-to-server, scripts
  (+ the four dark chapter cards and the ink caption bands).
- moments/plan.js (old: build/plan.before.js): cards that re-typed her lines -> gone (stateless = one word behind her; "how long can
  a cookie live", "any JavaScript", "belongs to one tab" = her on camera with a push; "it only stores strings" = typed code
  setItem('qty', 2) -> getItem -> "2"); place cards = "01 Cookies" / "02 localStorage" / "03 sessionStorage" / "04 Who reads it";
  keywords dropped (stands on its own, sends it back, too big, this tab right now, small, every script); titles/kickers that
  repeated her words or the screenshot dropped (cloak, trip foot, code titles, MDN receipts); 16:9 tiles: her tile top corner +
  an ink caption band under the graphic (BAND: captions were white on concrete).
- teaser.js (old: build/teaser.before.js): same removals; cloak / trip / close-tab / scripts on dark.
- Captions: "Max-Age, Then" -> "then" (tools/words.py). No retakes in CLEANUP; nothing to cut.
- Text: python3 talking-head/build/textcount.py 5.44 talking-head/build/plan.before.js talking-head/moments/plan.js
  -> 315 -> 186 words (57.9 -> 34.2 / min); without typed code lines 277 -> 138 (50.9 -> 25.4 / min).
- Checks: composite check full 16x9 + 9x16, sh01-09, teaser 16x9 + 9x16: no text collisions, layout variety pass (split 27 %).
- Sheets: outputs/_review/before16.jpg + after16.jpg (bin after she has looked).
- Open: the checkout form still appears as a flat form in tests 02/03, the board and "form gone" (it IS the subject); if she wants
  only one form, make it a phone screen.
## 2026-11-10 rollout (formats, covers, ending) — DONE
- moments/formats.js (NEW, manifest "common" last): CK.fmtInstall (called in CK_PLAN('short') before talk0) + capFmt/titleFmt + the cover frame;
  port of dark-patterns/formats.js with this video's palette (concrete, ink, crash yellow cards, green kept / red gone key words).
  Cookies-only additions: CK.code fit 1000x720 in shorts, I receipts centred, J gap fill (screen-N), segments clipped at FOOT.dur, the
  pause box lowered 440 px in H/I/K/M. common.js: CK.style off when "fmt" is set. plan.js: FX install + restore, sh09 summary-short.
- Manifest: fmt/frame9/label/poster/cover per short, images cover_shNN(_cut); outroCard thumb/title -> thumbnail 01. Old manifest:
  build/talking-head.before-fmt.json.
- tools/covers.py (copy of dark-patterns'), tools/fmtsheet.py (shorts-formats-v2.jpg + covers.jpg).

## 2026-11-13: FULL-KIT pass (font board, covers, teaser v3)
- moments/fontboard.js (last in manifest "common"): CK.FB per short / teaser (fonts + their board colours; conc = graphic ground for sh02/06/09); F.disp etc. -> Inter Tight in shorts + teaser.
- formats.js: CKS/CKC/CKM2 fonts, FBc colours, Shift+Enter (CK.wrapH), coverDraw ported (photo / big / frame, lineBox, keyFont, top), caption chunks 2-4 words (never end on a little word), band ink (D/F/G), MDN warning (G) + MDN quota line (I) re-set at phone size, code >= 38 px. Backup build/formats.before-fontboard.js.
- Manifest: sh05 cut [187.9,189.45] + pauses false; covers; board/fonts/colours; teaser v3 bites (footedl.py re-run; full edit EDL unchanged). edits/<id>.json mix -15/-7.
- teaser/teaser.js v3 + PLAN-v3.md; v2 in ../archive/teaser-v2/.
- Tools: tools/fontaudit.mjs (fonts drawn per moment), tools/fbsheet.py (shorts-sheet.jpg + covers-sheet.jpg in outputs/_review/fb/).
- Open (critic): sh01 cloakroom photo credit cut by the ticket card (film code), sh04 / sh09 slides hold > 4 s, some captions near her hands, 16:9 teaser captions are long phrases.

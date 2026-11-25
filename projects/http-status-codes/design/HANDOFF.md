# http-status-codes design: handoff (thumbnails + carousels)

Resume notes for the DESIGN agent. Look B "The First Digit" (class grounds 1xx stone #D9D4C7, 2xx mint #8FE3B0, 3xx sky #8EC5FF,
4xx amber #FFA51F, 5xx tomato #FF5A3C; ink #121212; Funnel Display 800 / Funnel Sans / Fragment Mono; odometer digit).

- [x] Set-up: tools copied from dark-patterns (render.mjs, overview.html, bind.js, personlayer.swift), own look `thumbnails/lib/hs.css`.
      Her frames `thumbnails/assets/frames/` (1920 px), aligned person layers `assets/scene/`, cut-outs `assets/cut/` (alpha eroded 2 px + feathered).
      Real GitHub paragraph captured at phone width: `assets/src/gh-para.png` (+ .json provenance; `tools/capture-para.mjs`), crop `gh-lines.png`.
      Pexels keycard crop `assets/props/keycard-door.jpg` (px-4907178, Ketut Subiyanto, already in film/assets/CREDITS.md).
- [x] 18 thumbnails v1 from `thumbnails/tools/gen-first-version.py` (regenerates index.html; `--force` rewrites content.json: only until she edits).
- [x] Cold critic R1 thumbnails: none at 8; best 15/03/14/11 ~7. Main problem: mid-word / teeth / eyes-closed frames (01 02 04 05 06 07 13 18).
      Fixes planned: closed-mouth frames via `tools/scan.sh` + `tools/facescore.swift` (mouth < 0.03, eyes > 0.30), 40-60 px clearance from her,
      nothing under ~44 px, drop 07 09 18, fix 10 (sharp 5, ghost 04, one ground), 11 digits bigger, 15 JSON two lines 44 px,
      16 only the highlighted lines, 17 four rows, add new: keycard collage (401 vs 403) + flat request -> response mechanism.
- [x] Carousels: `carousels/instagram` (10) + `carousels/linkedin` (10 + carousel.pdf), own `shared/build.mjs` + `base.css`; critic R1 IG 5.5, LI 6.5;
      all its fixes applied (cover sharp, 404 slide added, duplicate split slide cut, eyebrows cut, facts fixed: 403 "as the same user",
      "carries a code", 500 vs proxy, APP_DEBUG -> stack traces; flat cards, no soft shadows). Not re-scored yet.
- [x] Thumbnails v2/v3: calm frames via scan + facescore (277.5, 215.5, 508.99, 479.5, 175.66, 251.66, 377.83, 527.8; cut-outs 516.83,
      344.6, 207.17, 304.93), dropped 07/09/18 (Bin), added 07 keycard collage + 09 request -> response. Critic R2 best 7.5, R3 best 7.5
      (02); R3 fixes applied, not re-scored. Headlines in Funnel Sans 800 (Funnel Display's b spur read as a dot).
- [x] Carousels critic R2 (IG 6, LI 7) + R3 (IG 5.5, LI 6.5, mostly the font collision) fixes applied, not re-scored.
- [x] README (scores table), STATUS.md, CREDITS lines. Review copies binned.
- [ ] Waiting on her: picks, her own photos without the mic (lifts every photo option), wording changes in the studio.
Nothing exported to Downloads. Review copies: `thumbnails/review/` (bin after).

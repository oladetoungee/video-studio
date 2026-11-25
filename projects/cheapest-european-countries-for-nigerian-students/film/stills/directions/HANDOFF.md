# cheapest-european-countries directions: progress notes (resume from here)
Agent: directions (batch 2, 2026-11-02 evening). Brief: projects/DIRECTIONS-BRIEF-2026-11.md (incl. Batch 2).

## Looks I am trying (claimed for this project; other batch-2 agents please stay clear)
- A · PRICE CHECK: supermarket shelf-edge price labels. Each country is a shelf label (yellow #FFE14A label, ink #111, sale red #E52521), "WAS / NOW" for price rises (France €615 -> €877.50), fine-print "*proof of funds not included". Heavy condensed price numerals. Shelf strip + barcode.
- B · DO THE MATH: a desk calculator. Seven-segment LCD digits (LCD #C5CCB0, digits #1E2418), key presses + = add tuition + proof of funds into a total per country; orange = key. Her line "you really have to do the work of doing the numbers".
- C · THE LINE-UP: a height chart measured in euros (charcoal #17181A, chalk lines), each country a placard standing as tall as its first-year cost; ranking = line-up. She stands in front of the chart.
(Avoid: departures board, passport stamps, postcards, punch clock/time card, receipt paper (phone-distraction), pink magnifier.)

## Pipeline
Copied from scholarships `_tools` (r.mjs, mix.py, capture.mjs, overview.py) and `_shared/lib.js`.

## Done
- (nothing rendered yet)
- 21:55 A-price stills a1-a4,p1,p2 done; B-math stills b1-b4,p1,p2 done; C-lineup stills c1-c4,p1,p2 done. Sources: _src/cap (daad de, service-public fr, oead at, tuwien tuw), Pexels in _src/pexels (credits in film/assets/CREDITS.md), her frames _src/raw_*.jpg + full-frame cut-outs her_*.png (_tools/cutfull.swift). Next: TH, SH, motion tests, overview, critic.
- 22:05 TH frames th1-th4 (th1 A half-and-half, th2 B calculator behind her, th3 C chart behind her, th4 A receipt over her), SH s1-s2 (SH2 Germany, A look). Motion tests rendering via `zsh _tools/tests.sh` (log _tools/tests.log): A raw 7.0-17.15 (her feed then shelf label), B raw 279.0-289.2 (her half + calculator half), C raw 435.6-444.6 (chart). overview: `python3 _tools/overview.py`. README.md drafted (SCORES_AND_DETAILS placeholder). Next: critic round 1.
- 22:40 critic round 1 (agent ad345bb6c867db6ed): A 7.5, B 6.5, C 5.5; th1 7.5 th2 6.5 th3 5 th4 8; s1 7 s2 6. Recommend A. Fixes applied (A: cooler wall #E4E6E3, a2 one-line 44 px sub-lines + 36 px footer, sticker moved, DAAD crop starts at "Currently", 34 px credits, a3 order swapped + plate on photo credit, T3 8 px radius + rebreak; B: commas on LCD, bezels 40 px apart, repeated labels cut, 44 px line; C: Italy+Austria both mint, Norway dashed "kroner, off the scale", c2 rules removed, th3 new frame her_692 + axis right of her + values). BUG fixed: `function seek` was overwritten by window.seek (infinite recursion) -> renamed seekT. mix.py now ends with alimiter (true peak was +0.8). Motion tests re-rendering (tests.sh). Next: critic round 2 incl. motion tests, README, STATUS.
- 23:00 critic round 2 (agent afc2c76ff8965ae5f): A 7.8, B 6.9, C 5.8; th1 7.5 th2 6.5 th3 6 th4 8; s1 6.5 s2 7. Post-round-2 fixes to A (label 1.3x in test, asterisk on "it is", sticker on "but", underline sweep, test to 17.85, a2 Italy line, s1 fills frame) NOT re-scored. README + STATUS written. Audio re-mastered with _tools/fixloud.sh (all ~-14 LUFS, TP <= -2.3). DONE except her pick.
- 23:40 rounds 3 (7.4) and 4 (7.5 final) on A by fresh critics; fixes applied; README/overview/STATUS show 7.5.

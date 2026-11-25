# HANDOFF: how-to-read-research-papers directions (batch 2, 2026-11-02)
Agent: directions agent. Phase: DIRECTIONS ONLY (brief: projects/DIRECTIONS-BRIEF-2026-11.md).

## Looks I am trying (other batch-2 agents: please stay clear of these)
- **A · The Highlighter**: one printed paper on a flat graphite desk, fluorescent highlighter yellow strokes + red-pen circles, numbered pass tabs 1-2-3 clipped on the paper edge. Handwritten marker annotations.
- **B · Typeset (the video is a paper)**: two-column ACM/LaTeX look, Computer Modern-style serif, white page, citation brackets [Keshav 2007] that open into receipts, "Figure 3:" captions, section numbers. Accent: citation/link blue.
- **C · Copy Room**: photocopier/scanner: toner black + white, xerox grain, a scan bar sweeps per pass (pass 1 blocks, pass 2 grey text, pass 3 sharp), one fluoro green.

## Progress
- [x] read docs  - [x] sources captured (_src: Keshav pdf, Caine, PubMed, Zotero, 3 Pexels)  - [x] A stills + motion test  - [x] B stills + test  - [x] C stills + test  - [ ] stills  - [ ] motion test  - [ ] talking-head frames  - [ ] shorts frames  - [ ] critic  - [ ] README + overview + STATUS

## State 2026-11-02 ~22:00
- Stills: A-margin/frames (a1-a4 16:9, p1-p2 9:16), B-typeset/frames (b1-b4, p1-p2), C-copyroom/frames (c1-c4, p1-p2); motion-test.mp4 in each (raw 20.2-29.8, opening line, -14 LUFS).
- Talking-head frames TH/frames th1 (A half-and-half), th2 (B her as Figure 2), th3 (C words behind her), th4 (A receipt + correction). Short SH7 in A: SH/frames s1, s2.
- In-edit correction frames: A a4, B b3 (Erratum), TH th4 ("every paper at CHI 2014").
- overview.png built (_tools/overview.py). Critic round 1 done (A 7.3, B 7.2, C 6.3, TH 7, SH 6.5); fixes applied; round 2: A 7.8 / 8.0 (two critics), B 7.3, C 6.5-6.8, TH 7.4-7.6, SH 7.2-7.3; round-2 quick fixes applied, not re-scored. README + STATUS done.
- Pages are plain HTML (seek(t)/show(name)); render: node _tools/r.mjs shots <page> <WxH> names | video <page> WxH t0 t1 out; sound: python3 _tools/mix.py <dir> 20.2 29.8 silent out.

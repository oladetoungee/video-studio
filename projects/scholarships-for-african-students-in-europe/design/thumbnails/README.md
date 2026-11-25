# Scholarships thumbnails (set 2026-11-10, rollout to the HTTP standard)

10 thumbnails, best first, 1280x720. PNGs + overview in `outputs/thumbnails/`. Editable in the studio:
http://localhost:7700/design/scholarships-for-african-students-in-europe/thumbnails/ (text in place, drag, resize, photos, colours).
Set 1 (13 options from video frames, 2026-11-02) is in the Bin: `~/.Trash/scholarships-for-african-students-in-europe-thumbnails-old-2026-11-10/`.

- Source of the set: `tools/set_2026_11_10.py` wrote directions/NN-*/ (index.html + content.json). After that the directions are
  the editable sources; re-running the script OVERWRITES her studio edits (only run it for a full rebuild).
- Her photos: the 29 Oct shoot, outfit D (black top, pink headband), `library/her-photos/shoot-2026-10-29/D-black-top-pink-headband/`,
  each through Enhance photo (`studio/.cache/enhance --bg keep`), cut out with `studio/tools/cutout.swift auto` (no chair), and put
  back in place on the room photo with `tools/place_cut.py` (full-frame cut-out aligned with the room, for text behind her).
  `assets/shoot/room-NNNN.jpg` (room), `room-NNNN-cut.png` (aligned cut-out), `cut-NNNN.png` (cropped cut-out). Class `no-lift`.
- Facts: €1,400 a month (Erasmus+ Programme Guide), 8-24 February 2027 (si.se, real crop `assets/src/si-feb-dates.png`),
  24 February 2027 (si.se), €5,000 first year (studyinnl.org), 15 January 2027 (University Admissions, si.se). Checked 2 Nov 2026.
- Mix: photo 01, 03, 05, 09 · flat 04, 06, 07 (quiet same-hue line pattern) · collage 08 · other 02 (real si.se line), 10 (documents).
- Cold review: 3 rounds by a fresh reviewer (pictures only, then with the title); every note under 8 fixed after each round.
  Round 3: 01 8/8, 02 8/7, 03 7/8 (the three for Test & Compare); the fixes after round 3 were not re-scored.

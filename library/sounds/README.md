# Sound library

Shared by every video in this folder. A film picks sounds per job (screen change, card, tick, click, hit…) in its
`film/film.json` (`audio.sfx.roles`, written as `library:<file name without .mp3>`), and the studio mixes them
(`studio/tools/stems.py`), levelled automatically so a swap never comes out too loud.

- `index.json` lists the sounds with their titles and sources.
- To add your own: drop an `.mp3` in here and add a line to `index.json`.

The Mixkit sounds are under the Mixkit Sound Effects Free License
(free for commercial use, no attribution): https://mixkit.co/license/#sfxFree
Don't redistribute them as a standalone sound pack.

Roles and when-to-use rules (fewer whooshes, shutters, risers, glitches, UI ticks...): `inspiration/know-how/SOUND-PALETTE.md`.

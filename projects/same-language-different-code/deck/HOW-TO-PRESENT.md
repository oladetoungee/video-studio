# How to present the deck

## Open it
- On your laptop: double-click `index.html` in this folder. It opens in Chrome, needs no internet and no studio.
- Or with the studio running: http://localhost:7700/p/same-language-different-code/deck/index.html

## On stage
1. Plug in the screen and set it to **extend** (not mirror) in macOS Displays settings.
2. Open the deck. Press **S** to open your presenter window. Drag the deck window onto the big screen, click it and press **F** for full screen. Keep the presenter window on your laptop.
3. Click, or use the clicker. Right arrow, space or Page Down goes forward one step. Left arrow or Page Up goes back.

## Practice bar (for rehearsing)
At the bottom of the deck you'll see: the slide number, the section with its planned time, a **Go to slide** box (type a number, press Enter) and a **Script** button. Script opens your words for this slide under it; the part for the current click is bright, what you've said is dimmed. It remembers if you left it open.
**For the real talk, turn it off:** open `config.js` and change `practice: true` to `practice: false` (and `numbers: true` to `numbers: false` if you don't want the small slide numbers).

## Keys (in the deck window)
| Key | What it does |
|---|---|
| → / space / Page Down / click | next step |
| ← / Page Up | back one step |
| S | open the presenter window (notes, timer, next slide) |
| F | full screen on/off |
| T | dark version for a dark hall / LED wall (it remembers your choice) |
| B | black screen (press again to come back) |
| G | grid of all slides; click one to jump there |
| R | replay this slide's motion |
| a number, then Enter | jump to that slide |

## If something goes wrong
- The deck freezes or a window closes: reopen `index.html`. It comes back on the same slide (the slide number is in the address bar).
- The laptop dies: `build/deck-backup.pdf` has every slide as a still page. Open it on any computer.
- The screen cuts off the edges: the slides keep everything important away from the edges, so you can carry on.

## Before the talk
- Sit in the back row of your room during an earlier talk and check how dark it is. If it's dark, press **T** before you start.
- Run through the whole deck once with the clicker so you know where each click lands. The [click] marks in your presenter notes show where each step comes.

## Two versions
- **Version 1 · full** (78 slides, about 40 minutes) and **Version 2 · short** (67 slides, about 33 minutes).
- Switch with the two buttons in the practice bar at the bottom. The page remembers the last one you used.
- Direct links: add `#short-1` to the end of the address for the short talk, `#1` for the full talk.
- Backup PDFs: `deck/build/deck-backup-full.pdf` and `deck/build/deck-backup-short.pdf`.

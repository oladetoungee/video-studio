# Video studio

## Starting a new video
1. Make a folder `projects/<short-name>/kit/` and put in:
   - your **script** (`script.md` or a doc),
   - your **recorded video**,
   - optional: anything you want this video to look like → `projects/<short-name>/inspiration/`.
2. Tell Claude: "new kit in projects/<short-name>".

## What comes back (in `projects/<short-name>/outputs/`)
| Folder | What |
|---|---|
| `video/` | the full motion film (16:9 and 9:16), captions file |
| `clips/` | single screens or lines you exported |
| `frames/` | single frames as PNG |
| `talking-head/` | short edited moments of your own video with graphics (if you asked) |
| `thumbnails/` | YouTube thumbnail options |
| `carousels/instagram/`, `carousels/linkedin/` | carousels (PNG slides, PDF for LinkedIn) |

## How to open the studio
**The easiest way (Terminal):**
1. Open **Terminal** (press ⌘ + Space, type `Terminal`, press Enter).
2. Paste this and press Enter:
   ```
   cd /Users/gbemi/Desktop/CODE/videos && node studio/server.mjs
   ```
3. Open **http://localhost:7700** in Chrome.
4. **Leave that Terminal window open** while you work. Closing it (or pressing Ctrl+C) stops the studio.

If it says **"address already in use"**, the studio is already running: just reload the page in Chrome.
If the page says it can't connect, the studio has stopped: do steps 1-3 again.

Other ways: in Finder, right-click **`Start Studio.command`** (in the `videos` folder) → **Open With → Terminal** (it also opens Chrome).
In VS Code: **Terminal → Run Task → Start Studio**. (A plain double-click may open the file as text in VS Code instead.)

The home page lists everything you can edit: the **motion film**, each **talking-head moment (your video with graphics)**,
the **thumbnails**, and the **Instagram** and **LinkedIn carousels**. Click one to open its editor.

## Editing (the same in every editor)
- **✎ Edit**, then click any text to change it (**Enter** saves) and drag things to move them. Click a photo to resize it
  (corner handles or the Size slider) or hide it. The button says **Done** while you edit; press it when you are finished.
- You never need to save: **"Saved ✓"** appears after every change. **Undo** / **Redo** if you change your mind.
- **Versions** keeps named copies you can go back to; restoring saves what you had first.
- **Export** downloads the file into your **Downloads** folder and also keeps it in the project's `outputs/` folder
  (the panel says exactly which one). **Show in Finder** opens it.

What each editor adds:
- **Film**: play and scrub, jump to a screen or a spoken line; **16:9 / 9:16 / 4:5** (each keeps its own positions);
  **Captions**, **Voice**, **Music**, **Sound effects** on or off in the preview and in the export. Export this screen, this line,
  your own in and out points, one frame as an image, or the whole film. The sound updates by itself when it needs to.
  - **⟲ Play this screen** (next to ▶ Play, or press **L**): plays only the screen you're on, over and over. Press it again, Space or Play to stop.
  - **☀ Light / ☾ Dark** (after Captions, or press **D**): switches only this screen to its other mode (each screen keeps the mode it was
    designed in until you switch it). Exports use your choice. The **Light / dark** panel on the right can switch **all screens** at once or
    put them back **As designed**. Full-colour punchline screens show a grey **◼ Colour** button: they have no other mode.
  - **Volume**: a slider next to **Voice**, **Music** and **Sound effects** (top right) makes each one quieter or louder
    (double-click puts it back to normal). Exports use your levels; the overall loudness stays right for YouTube, the sliders change the balance.
    Click once on the page first: the browser keeps sound off until you do.
  - **Sound only** (in Export): **Download voice / music / sound effects / all three** as separate sound files (WAV) that line up
    with the video, for the whole film, one screen, one line or your own in/out.
- **Talking-head edits, moments and shorts**: your video with the graphics on top, exactly as it will export; play it with sound, switch 9:16 / 16:9,
  **Captions** on or off; edit the words on the plates and cards, move or hide things.
  - **Captions in 16:9** are in your style (Helvetica Neue, light cream, letters close together, lower third). A very faint
    dark box appears only behind lines where the picture is too light to read them. In the **Captions** box on the right:
    **Size** and **Height** sliders (double-click = back to normal, **As designed** resets). To fix a word: **✎ Edit**, click the caption.
    The 9:16 / shorts captions have the same Size and Height sliders.
  - **Export** (right): **The whole video** (the default), **This section** (the part with one layout, where the playhead is),
    **This sentence** (the line she is saying at the playhead), **Custom in / out** (Set in / Set out at the playhead): all four
    are **video files**; only **This frame as a still image (PNG)** gives a picture. The line under the menu says which you get.
    16:9, 9:16 or both; **Burn in captions** on or off; voice / music / sound effects on or off. The file appears in your
    **Downloads** by itself (and in `projects/<name>/outputs/talking-head/`, in `clips/` for sections, sentences and in/out
    (named like `..._section07-half_16x9.mp4`, `..._line42_16x9.mp4`), `frames/` for stills); **Show in Finder** finds it.
  - If an export can't run, the list says why in plain words (for example "Not enough free space on your Mac: 2.8 GB free,
    exports need 8 GB…"); the technical part is folded under **Details**.
  The same **volume sliders** and **Sound only** downloads as the film. Your footage is never flipped.
- **Thumbnails**: one design at a time, all of them in the strip on the left. Change the words, move and resize anything,
  pick the ground and accent colour from your palette, swap the photo for another frame, **Duplicate** to try a variant.
  Export one PNG or all of them.
- **Carousels**: one slide at a time, all slides in the strip. Same editing, plus each slide's ground and the deck's accent colour.
  The **Checks** list warns about labels under 32 px, a single word on a last line, photos too close to text.
  Export this slide, all slides, or the LinkedIn PDF.
- **Download just one part** (thumbnails and carousels): click something, then **Download this part** in the little bar above it.
  You get only that piece (with everything inside it) as a PNG with a see-through background, in your Downloads and in
  `outputs/thumbnails/parts/` (or `outputs/carousels/<deck>/parts/`). To pick a bigger or smaller piece: **Select whole block**
  (or `Shift+Enter` / `Esc`) goes out to the group, **Select inside** (or `Enter`) goes in. In **Export** on the right, choose
  **This part** to set the size (normal or double) and whether to **keep the background behind it**.

Photos and colours (thumbnails and carousels):
- **Your own photos**: **Add photo…** (in the Photos panel or the photo picker), or drag photos from Finder onto the picker or
  onto the design (dropped on a photo, it replaces that photo; Undo puts the old one back). JPG, PNG, HEIC (iPhone) and WebP;
  big photos are scaled down to 3000 px. They are kept in the project (`projects/<slug>/assets/uploads/`) and show up under
  **Your photos** in every design of that project.
- **Remove background** (on any photo in the picker, or on the photo in your design) makes a cut-out PNG under **Cut-outs** and keeps
  the original. If her chair or the book comes out wrong, try **Person only**.
- **×** on one of your photos moves it to the Bin. It won't let you while a design uses it (change that photo first).
- **Colours**: your palette is the swatches; click one to use it. **Custom colour**: pick any colour (or type a hex like `#EFB428`),
  **Lighter / Darker** for a shade, then **Use as ground**, **Use as accent** or **Add to palette**. Right-click a swatch (or its ×)
  to take it out of the palette; **Undo** brings it back. The palette is the same in every thumbnail and carousel of the project.
  A warning appears when text on the ground is too faint to read (under 3:1 contrast).

## Inspiration (used for every project)
`inspiration/`: your decks (`my-decks/`), motion videos you like (`motion-references/`), YouTube slides, thumbnails, Instagram and LinkedIn carousels, Pinterest finds. Drop new things into the right folder anytime.

## House rules
`CLAUDE.md` holds the design rules, banned list, motion and sound rules. Claude reads it every session. If you give feedback that should apply to every video, ask Claude to add it there.

## Your kit as a web page (2026-11-10)
On the studio home page, open a video: the first row, **Kit**, opens its refined kit (titles, thumbnails, description, chapters,
tags, captions for every short) as a page with a contents list and a **Copy** button on every block you paste somewhere.
Direct link: http://localhost:7700/kit/<video-folder-name>/ (for example http://localhost:7700/kit/http-status-codes/).
It updates by itself when the kit changes.

- **New line in a cover or title** (2026-11-12, cheapest-countries shorts): click the words, press **Shift+Enter** where you want the new line, then **Enter** to save.

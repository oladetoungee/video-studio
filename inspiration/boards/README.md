# Inspiration boards (studio: /ideas/boards/thumbnails/ and /ideas/boards/design/)

Built 2026-11-09 from her folders, so she can like / skip / note each one (her ask: "a board like the short formats page").
- thumbnails/: single pins cut from inspiration/pinterest-thumbnail/ (studio/tools/boardcrop.py), her YouTube screenshots
  (inspiration/youtube-thumbnail/, thumbnail + title), her own thumbnails, her viral samples.
- design/: single pins cut from inspiration/pinterest/ and inspiration/pinterest-type-2026-11/ (duplicates Pinterest showed
  twice were removed; a few near-copies may remain).
- picks.json in each board = her likes / notes. READ IT before designing thumbnails.
To add new screenshots: run boardcrop.py on them into the board's img/ and add items to board.json.
- fonts/ (added 2026-11-12, studio /ideas/boards/fonts/): ONLY fonts found on her boards (design board, shorts formats board, thumbnail
  board), each specimen in the colours of its source item (Design N / Formats N / Thumbnails N), plus font pairs and colour combos.
  Here (only) each card has a "Not for me" toggle: picks.json pick "no" = never use. Built by `node studio/tools/fontboard.mjs`
  (renders img/*.png with the real font files through /studio/runtime/fonts.css and checks none fell back; rewrites board.json).

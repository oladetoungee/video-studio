# LinkedIn carousel: notes

10 pages, 1080×1350, uploaded as a PDF document post. `carousel.pdf` (live text, about 0.75 MB), the page PNGs and `overview.png` are in `outputs/carousels/linkedin/`.

## Edit and re-render
0. **In the browser:** http://localhost:7700/design/reading-stack/carousels/linkedin/ (studio): edit text in place, move, colours, photos, live checks, export. It writes `content.json` and runs `build.mjs`.
1. Change text in `content.json`. Markup: `*word*` = accent, `_word_` = serif italic, `\n` = line break.
2. Run `node shared/build.mjs linkedin` from `design/carousels/`. It rewrites `index.html`, the PNGs, `carousel.pdf` and `overview.png`.
3. **Before posting:** replace `[ YOUR CHANNEL NAME ]` on page 10, and make the `video` title match the real YouTube title.
4. **Document title for the upload.** LinkedIn requires one and shows it on the post: *A 4-step system to remember the books you read for work*. It is also stored as `docTitle` in `content.json`.

## Pages (v2, standalone rewrite 2026-10-01)
A professional framework that makes sense without the video; the video is an optional extra on page 10.

| # | Ground | Idea (takeaway) |
|---|---|---|
| 01 | orange | Cover: "Remember what you read for work." A 4-step system for non-fiction, a few minutes per book. Her photo |
| 02 | paper | Problem: "So what was that book about?" You keep a feeling about the book, not the book itself |
| 03 | ink | Why: "Ideas stick when they have a place to go." Table: start at page 1 vs structure first |
| 04 | paper | Step 1, decode the title: *Convivial Toolbox*, look up the word you don't know (Illich) → her guess at the argument |
| 05 | paper | Step 2, map the contents: pages per part → a manual masquerading as a textbook; the theory is there to make the tools make sense |
| 06 | paper | Step 3, memorise it: chapter titles by heart, sub-headings if you can; her line on skimming vs memorising; Adler (1940) |
| 07 | paper | Step 4, guess, then read to check: the last chapter's real sub-headings ("Bridging") → her guess that a "gap" problem is central, so she'll notice "gap" early |
| 08 | ink | Where it pays off: thesis and research, textbooks and manuals, books you'll have to explain. Skip it for fiction |
| 09 | card | The system on one page (save slide) |
| 10 | orange | "Try it on your next book." Optional: full video on YouTube + channel placeholder |

## Choices
- **Standalone first (her rule).** Page 1 names the outcome for a work audience; every page carries one takeaway; examples are introduced by name. Three cold critics read it with no video context; see `projects/reading-stack/STATUS.md`.
- **Not a resized Instagram post.** Its own cover and step system (`STEP 2 OF 4`), the comparison table, different examples (the title *Convivial*, the Bridging chapter) and a "where it pays off" page.
- **Accent:** safety orange so the feeds differ. For the film's blue, set `"accent": "#1B3FD8"` and `"accentOnInk": "#6E8CFF"`.
- **The old memorising meter is gone** (cold readers took it for fake data). Page 6 now states her experience in words.
- **Page 8 is partly my framing.** Thesis reading is hers (her co-supervisor's book). "Textbooks and manuals" and "books you'll have to explain" are suggestions drawn from her problem statement, with no claims about results.
- **Page 10 video title** is "How to Actually Remember What You Read" (the recommended YouTube title); change `video` if she picks another.
- **Photo on page 1** is `design/thumbnails/assets/photo/neutral.jpg` (no mirrored book text in frame; her face not flipped).

## Suggested post text

> Weeks after finishing a book for work, someone asks what it was about. You can give the gist and one or two points. Not the argument.
>
> The fix happens before page one. A 4-step system I use for non-fiction:
> 1. Decode the title. One key word often predicts the argument.
> 2. Map the contents: chapters, sub-headings, even page counts per part.
> 3. Memorise the chapter titles, if you can.
> 4. Guess what each part will argue, then read to check.
>
> Why it works: every new idea has a place to go, so it doesn't float away by chapter six. It takes a few minutes per book. The idea is old (Mortimer Adler, How to Read a Book, 1940); some call it priming.
>
> I walk through it on two real books, one of them for my thesis, in my latest YouTube video: [link / channel name].
>
> Do you do anything before you start a book for work or research?

(No hashtags needed on LinkedIn. If she wants some: #learning #research #phd #reading.)

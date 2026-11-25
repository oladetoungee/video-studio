# Instagram carousel: notes

8 slides, 1080×1350 (4:5). PNGs and `overview.png` are in `outputs/carousels/instagram/`.

## Edit and re-render
0. **In the browser:** http://localhost:7700/design/reading-stack/carousels/instagram/ (studio): edit text in place, move, colours, photos, live checks, export. It writes `content.json` and runs `build.mjs`.
1. Change text in `content.json`. Markup: `*word*` = accent colour, `_word_` = serif italic, `\n` = line break. Display lines shrink themselves to fit if you make them longer.
2. Run `node shared/build.mjs instagram` from `design/carousels/`. It rewrites `index.html` (open it in a browser to preview), the PNGs and `overview.png`. It also prints warnings for: text running into the footer or margins, mono labels under 32 px, polaroids within 24 px of text, clipped polaroid captions, and paragraphs whose last line is a single word.
3. **Before posting:** replace `[ YOUR CHANNEL NAME ]` on slide 8, and make the `video` title match the real YouTube title. Once the text no longer starts with `[`, the dashed box and the "placeholder" note disappear.

## Slides (v2, standalone rewrite 2026-10-01)
Written for someone who has never seen the video. Nothing before slide 8 depends on it.

| # | Ground | Idea |
|---|---|---|
| 01 | ink | Cover: "How to remember what you read." Sub: study one page before any non-fiction book, a few minutes. Her two book covers as polaroids (no captions) |
| 02 | paper | Second cover (Instagram re-serves slide 2): "So what was that book about?" You remember a feeling about the book, not the book itself. "The fix happens before you read →" |
| 03 | blue | The method: "Read the structure first." Contents page, learn the chapter titles by heart if you can, guess, read to check. Adler (1940) in one line |
| 04 | paper | Why it works: "ideas need shelves". Start-at-page-1 vs contents-first diagram |
| 05 | paper | Example 1 (a book on critical writing): "Guess what each chapter says." 5 of its 10 real chapter titles with her guesses |
| 06 | ink | Example 2 (design research): "Page counts are clues too." ~80 / ~50 / 140+ pages; the theory is there to make the tools make sense |
| 07 | card | Save slide: study the contents, learn the chapters, guess what each says, read to check. A few minutes. Non-fiction only |
| 08 | blue | "Save it for your next book." Send-to-a-friend corner, then the optional "Full video on YouTube" + channel placeholder + her photo |

## Choices
- **Standalone first (her rule).** Slide 1 is the outcome in plain words; the examples are introduced as examples; the video is an extra on the last slide. Three cold critics (no video context) read it; see `projects/reading-stack/STATUS.md`.
- The steps on slides 3, 5, 6 and 7 use the same words, so the summary matches the body.
- The accent is the film's electric blue. Orange appears only as the punch word on blue slides.
- Every claim traces to her transcript: chapter titles as she reads them, page counts as she says them ("about 80", "50", "over 140"), her guesses ("starts by fixing the definition", "tips", "a block… about structure", "the theory at the front is there to make the manual make sense"), "a few minutes for a book", "memorise the chapters if you can", "not for fiction".
- **Slide 8 video title** is set to "How to Actually Remember What You Read" (the recommended YouTube title). Change `video` in slide 8 if she picks another title.
- **Photo on slide 8** is `design/thumbnails/assets/photo/neutral.jpg` (her face, no book text in frame, not flipped). The old stack frame showed a mirrored spine.
- Book covers on slides 1, 5, 6 are sharp, flipped, book-only crops (no face).

## Suggested caption

> How to remember the non-fiction you read (save this for your next book)
>
> You finish a book, someone asks "so what was it about?", and all you have is the gist and one or two points.
>
> What I do now, before page one:
> 1. Study the contents page: chapter titles, sub-headings, even page counts.
> 2. Learn the chapter titles by heart, if you can.
> 3. Guess what each chapter will argue.
> 4. Read to check your guesses.
>
> Every new idea then has a shelf to go on, so it doesn't just float. It takes a few minutes a book. It's an old idea (Mortimer Adler, How to Read a Book, 1940). Not for fiction, though: there I want the surprise.
>
> I walk through it on two real books in my latest YouTube video (link in bio).
>
> Send this to the friend with a pile of unread non-fiction. And tell me: what are you reading right now?
>
> #howtoread #readingtips #nonfiction #studytips #bookstagram #studygram #thesislife #learninghowtolearn

(Keywords in the first line and body matter more than hashtags for Instagram search now.)

Alt text (slide 1): "Black slide with large text: How to remember what you read. Study one page before you start any non-fiction book. It takes a few minutes. Photos of two book covers: How to Read and Write Critically, and Convivial Toolbox."

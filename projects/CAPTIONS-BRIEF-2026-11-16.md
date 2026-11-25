# Captions brief (2026-11-16): rewrite one kit's captions and posts in her conversational voice

Her rule 2026-11-16: every caption and post sounds like her talking to a friend. You are rewriting the TEXT in ONE kit.
You only touch `projects/<slug>/kit/refined-kit.md` (and the archive copy below). No renders, no other files, no exports.

## Read first (all of it, in this order)
1. `inspiration/know-how/HER-STANDARD.md` (last section "Captions and posts" is the rule).
2. `inspiration/know-how/HER-VOICE.md` Part A (her writing guide, verbatim, and the banned AI tells) and Part B (her posts).
3. The model: `projects/the-edge-case-you-think-is-impossible/kit/refined-kit.md` section **6a** (her own draft). Notice:
   a personal opener ("One of the things I love the most about…"), flowing spoken sentences, "right?", brackets for asides
   ("(so I think you should watch it)"), what she actually did ("I've been reading a lot about edge cases, and I decided to
   make a video about it"), her takeaway in her words, then "Full Video on YouTube - [LINK]", then hashtags.
4. Your kit: `projects/<slug>/kit/refined-kit.md` (whole file), its transcript `projects/<slug>/kit/transcripts/transcript.srt`
   (or the cleaned one named in CLEANUP.md) and her original kit in `projects/<slug>/archive/original-kit/`. Her words in the
   transcript and her original kit are the raw material: reuse her real phrases.

## First: keep the old text
Copy the kit, unchanged, to `projects/<slug>/archive/captions-2026-11-16/refined-kit-before.md` BEFORE editing (cp, don't move).

## What to rewrite
- **1b** YouTube description: only the opening paragraph(s) above CHAPTERS. Keep chapters, sources, connect, hashtags as is.
- **3** every short, every platform block: YouTube Shorts description (NOT the Title or Tags lines), TikTok, Instagram Reels,
  LinkedIn, X (and any other platform block there). Every built short.
- **4** the teaser's post text(s) for LinkedIn / X, if present.
- **6** every long-form post: LinkedIn post, X thread, YouTube community post, extra X posts, ready replies, essay intro if it
  is post text. If she wrote a draft (marked "her draft", or present in her original kit), make the SMALLEST edit that works
  (HER-VOICE Part A §3) and keep her order and phrasing.

## How it should sound
- Like her talking to a friend: full, flowing sentences; her asides in brackets; "right?" or "you know" where she would say it;
  first person; warm, a bit cheeky. Read every block aloud in your head: would she say this to a friend? If not, redo it.
- First line states the topic plainly (HER-VOICE "The first line"). No teaser tricks, no curiosity-gap.
- She is in it, but ONLY with what is true: what she says in the recording or her kit (she is Nigerian, a Laravel developer at
  FleetFox, MSc HCI student at Tallinn University, in Estonia about a year). Never invent experiences, feelings or numbers.
  "I made a video about it" style lines are fine. If a personal line would need a story she hasn't told, leave it out.
- Explain one thing per caption in plain prose. NO list of what the video covers, no stacked story details as proof
  (e.g. "a Starbucks bug, Jennifer Null, a NULL plate and the Azure leap day" is the thing to avoid), no bullet lists.
- Banned: em-dashes (—) and en-dashes used as dashes, colon reveals, "not X but Y", threes for rhythm, self-answered questions,
  stacked one-line paragraphs, "Here's the thing/why", "Let's dive in", "In this video I cover", "Link in the comments",
  hype words, the buzzword list in Part A.
- Platform fit: TikTok short and casual (lowercase fine, 1-3 sentences); Instagram a few short paragraphs, may end
  "Full video on YouTube, link in bio"; LinkedIn longer prose with a real question or her takeaway, then
  "Full Video on YouTube - [LINK]" where it is about the long video; X short, one thought (threads: each tweet a full
  sentence or two, still her voice, not a list of facts); YouTube Shorts description 1-3 sentences, ends with the
  hashtag line (#Shorts first), never "full video on my channel".
- Keep every fact true and as it is in the kit (facts were checked). Keep hashtags, tags, titles, links, file paths, notes.
- Don't make every caption start the same way ("One of the things I love…" on all 40 is a new formula and wrong). Vary
  openers the way a person would.

## Finish
- Update line 3 of the kit: `> **THE CURRENT KIT** for this video. Last updated: 2026-11-16 <HH:MM> (captions and posts
  rewritten conversationally; old text in archive/captions-2026-11-16/)`.
- Checks: `grep -c "—" kit/refined-kit.md` inside the sections you edited = 0; no "Link in the comments"; no "In this video".
- Write `projects/<slug>/archive/captions-2026-11-16/CHANGES.md`: per section, 2-3 before/after examples (the most changed
  ones), the count of blocks rewritten, and any block you left as is and why. Add one line to `projects/<slug>/STATUS.md`
  ("2026-11-16: captions and posts rewritten conversationally, see archive/captions-2026-11-16/CHANGES.md").
- Report back: blocks rewritten per section, the dash count, 2 sample before/after pairs, anything that needs HER (e.g. a
  personal story only she can supply) as one plain line each.

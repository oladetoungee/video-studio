# Daily ideas routine (for every future session)

Gbemi opens the Ideas board (http://localhost:7700/ideas/) each day and records from it. Our job is to keep it stocked with
ideas she can record straight away. She only records. Ideas, scripts, recording directions and reference frames are ours.

## Before you start
1. Read `CLAUDE.md`, `FEEDBACK.md` (newest entries), `inspiration/know-how/HER-VOICE.md`, `inspiration/know-how/SOCIAL-PLAYBOOK.md`
   and `inspiration/tiktok-references/INDEX.md`.
2. Open `ideas/ideas.json` and every file in `ideas/batches/`. Build the list of ids, titles and source kits already used.
   Check each item's `status` and `note`: her "no" or "recorded" tells you what to make more or less of.

## How many
**3-5 new ideas a day.** A normal day has 1 thought short, 1 tech idea (faceless or talking head), 1 news idea when there is
real news, and 1 study-abroad or reading idea every 2-3 days. Never more than 2 of the same pillar in one day.

## Where to look (in this order)
1. **News of the last 7 days** in her pillars (tech, AI, Africa tech, Nigeria, Estonia/EU digital government, study abroad).
   Sources: Techpoint Africa (techpoint.africa works with WebFetch; techcabal.com blocks it), Nairametrics, Technext, AP/Reuters
   copies on local news sites, The Verge, ICEF Monitor and GOV.UK for student visas. WebSearch with "extended" mode finds
   recent items better. Use only what you can read and date yourself. Every fact gets a source link in `sources`.
   Present it the nandini_mpe / funmiyakubu way: name the company or person, explain every hard word in the same breath,
   the receipt (article card) on screen within 5 s.
2. **Her thought kits** `ideas/sources/thought-kits/` (37 spoken essays). Use section 1 "THE ORIGINAL (what I said first)" as
   the script base, with the smallest edit (HER-VOICE Part A, section 3). The "FINAL" sections are AI-written; borrow facts from
   them, not sentences. Faith, courtroom and relationship kits (17, 18, 19, 27, 29, 33, 36) only when she asks.
   Not used yet after the first batch: 01, 02, 04, 06, 07, 09, 10, 11, 14, 15, 16, 22, 23, 24, 25, 26, 28, 30, 32, 34.
3. **Her youtube kits 21-56** in `ideas/sources/youtube-kits/` are AI drafts, so treat them as topics, not her words. Good
   short material: 25 brain rot, 35 Truecaller, 41 why you can't explain what you read, 46 regex, 47 cognitive bias,
   48 metacognition, 49 networking basics, 55 CORS, 56 finding research papers.
4. **Creators to watch** (playbook section 7). Check their newest posts for formats and topics that are working:
   `yt-dlp --flat-playlist --playlist-end 30 --print "%(view_count)s|%(upload_date)s|%(title)s|%(url)s" "https://www.tiktok.com/@kodekloud"`
   (also @nandini_mpe, @funmiyakubu, @hoodsocialist, @philosophyminis, @nor3mak7, @thekenyanjukebox, @28kaira, @zeebeezeezoo7,
   @rainaships). Flag a post that has 3x or more the creator's usual views. Take the format, never the content.
5. **What people type**: `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=<seed>"`
   with seeds from her pillars ("studying in estonia", "masters in europe as a nigerian", "how does * work", "what is cors",
   "reading", "doomscrolling") and alphabet expansions ("<seed> a", "<seed> b" ...).
6. **Her own channel**: `yt-dlp --flat-playlist --print "%(view_count)s|%(title)s|%(url)s" "https://www.youtube.com/@WithGbemi/videos"`.
   Shorts that lead into her strong long videos are always welcome (study in Europe as a Nigerian: wLtXqeqQiqU, 6,800 views;
   Paystack tutorial: wUhrFX8klSU, 6,500 views).

## Avoid repeats
- No idea whose source kit, news story or main claim is already in `ideas.json` or `ideas/batches/`, unless it is a clearly
  different angle (write the angle in `note`).
- Vary the room (bedroom, living room, kitchen, dining table, hallway wall, desk, outside, campus), the format and the
  title style across each day and across the week. No two ideas in a row with the same top-title style.

## Every idea object (the fields the board reads)
```json
{
  "id": "short-slug",
  "date": "YYYY-MM-DD",
  "title": "the on-screen / post title, topic in plain words",
  "kind": "short | faceless short | long + shorts",
  "format": "format from the playbook menu + the top-title and caption style (T1-T13, C1-C12)",
  "pillar": "thinking | tech | study abroad | news | reading",
  "length": "computed from the spoken words (about 2.3-2.7 words a second)",
  "hook": "the exact first sentence she says",
  "why": "1-2 plain sentences: why this, why now, with real numbers from the references or her channel",
  "record": {"where": "", "how": "", "props": "", "wear": "only if it matters"},
  "script": "the full script in her voice; a [CHANGES ...] note at the end when it comes from her words",
  "refs": [{"img": "/ideas/img/<id>-ref.jpg", "caption": "@creator: exactly what to copy, and at what second", "url": "TikTok link from INDEX.md"}],
  "sources": ["link (date: what fact it supports)"],
  "status": "new",
  "note": "what she must decide or check, else empty"
}
```
Write the day's ideas to `ideas/batches/<YYYY-MM-DD>.json` (a JSON array); then run `python3 -I ideas/merge.py` (adds new ideas to `ideas/ideas.json`, keeps her status and notes).

## Always attach a reference frame
Pick the reference video in `inspiration/tiktok-references/NN-*/` whose look you want (read its `hook.txt` for timings), then:
`ffmpeg -ss <seconds> -i inspiration/tiktok-references/NN-*/video.mp4 -frames:v 1 -vf "scale='min(900,iw)':-2" -q:v 3 ideas/img/<id>-ref.jpg`
Open the frame and check it shows the thing the caption names (the card, the title, the props).

## Quality gate before you hand over
- Script rules: HER-VOICE Part A banned list (no em-dashes, colon reveals, "not X but Y", threes, stacked one-liners, magic
  adverbs). Never invent her experiences, feelings or opinions: leave a [gap] for her reaction instead.
- First line names the topic plainly (playbook lesson 1); no greeting.
- Length: 15-60 s for shorts; compute it from the word count.
- Cold check: give a fresh agent only the titles + first lines and ask "about ___ / stop 1-10". Rework anything under 7.
- Recording directions name a room, a position, the energy and the props. Faceless ideas say "VOICE-OVER ONLY".


## Her rules for ideas (2026-11-02, later)
- She is ALWAYS on camera: no faceless or voice-over-only ideas. Faceless creators are references for topics and graphics only.
- No `why` field. Fields: id, date, title, kind, format, pillar, length, hook, record, script (full, word for word), changes (what you changed from her words), ournote (our notes and questions to her), refs, sources, kit, status, note. **`note` is HERS only: always write it as "".**
- Mix sources: editing style from one reference, topic from another, or neither. Refs can be several frames from different videos, or none.
- Her kit tracker kits are already on the board (`ideas/batches/tracker-kits.json`); don't re-add them as new ideas, but you may turn one into a short.
- **Main source = her kit tracker** (`ideas/sources/youtube-kits/`, all 39 kits; her words, 2026-11-02: "look at all the content ideas I already have"). Each kit holds several shorts (every segment opens with its own topic). The thought kits are only an addition. Then news, references and search.
- **Scripts are full and word for word** (her rule): she reads them exactly as written. A long video idea carries the whole script (600-1,500+ words, structured in her kit style: open, sections, close); a short carries every word she says. Never an outline.
- **Field shapes (2026-11-02)**: `script` = markdown, only the main script she reads (paragraphs, `### Part` headings, `*[on screen: …]*`); `record_shorts` = [{title, hook, script, record}] ONLY for shorts she records separately (never shorts cut from the main script: we cut those); `ournote` = markdown numbered list (questions first); `changes` = markdown bullet list.

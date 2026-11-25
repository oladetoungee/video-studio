# http-status-codes: three looks for the film (2026-11-02)

**One question: which look for the whole video, A, B or C?** The look you pick is used for everything: the motion film,
your talking-head edit, the shorts and the teaser. The talking-head and short frames below only show how each look sits
around you. They are not separate choices. My suggestion is **B · The first digit**. If you like two of them, B works well
with one piece of C inside it: C's dot-matrix "NOW SERVING" board as the way the GitHub receipt and the 401 / 403 part land.

Your video explains what the three-digit number at the top of every response means, with one bookstore API the whole way
through. Each look is built from lines you really say, on your real voice, and from real pages: RFC 9110 §15 (the spec),
GitHub's REST API docs (404 instead of 403) and Google Search Central (how Google treats 4xx codes). Pages are cropped,
never changed, and carry a small source credit. Photos are from Pexels (listed in `film/assets/CREDITS.md`).

None of the three repeats an earlier film (your deck look, Blink, the chat thread, the Query Plan grid, the research wall,
the lock screen, the receipt, the October calendar) or the other videos being designed now (pink magnifier, departures
board, punch clock, shelf labels, calculator, bingo card, highlighter, crash test, browser tabs, cloakroom, classifieds,
ladder, code review, map edge, giant form field, licence plate).

**Look at everything in one go:** `overview.png`. One row per look; everything in a row is that same look: film frames,
then your talking-head edit, then a 9:16 film frame and a short.

**Each folder has** `frames/` (the stills; 9:16 ones are named `p…`), `motion-test.mp4` (16:9, your real voice, real
sound effects and a quiet music bed, about -14 LUFS: **please listen, nobody here can**), and the code that draws it
(`kit.js`, `scenes.js`, the studio's own engine, so the look you pick becomes the full film).

Times are seconds into your recording. The three tests sit between the cleanup cuts, so the voice is the same as in the
cleaned edit.

---

## B · THE FIRST DIGIT (`B-odometer/`). **Recommended**

**Idea.** You say "you can already tell a lot from the first digit", so the whole screen IS the first digit. Status codes
are giant black numbers that roll like a car's mileage counter from one code to the next. When the first digit rolls, the
colour of that group floods the screen: 2xx mint, 3xx sky blue, 4xx amber, 5xx tomato (1xx stone). Viewers learn the
groups by colour without being told.
- Opening: the number rolls and settles on 200 on mint, "status code" and "OK, reason phrase" land on your words.
- 1:14-1:23: "2xx" with the last two digits faded to "xx"; on "four" it rolls to 4 and the screen turns amber, "check the
  request"; on "five" it rolls to 5 and turns tomato, "check the server".
- Google's page on amber: 404 and 410, "treated the same way", with Google's own sentence highlighted.

**Look.** Flat full-bleed grounds, one per group (mint `#8FE3B0`, sky `#8EC5FF`, amber `#FFA51F`, tomato `#FF5A3C`,
stone `#D9D4C7`), ink `#121212`, nothing else. **Funnel Display** 800 for numbers, **Funnel Sans** for your words,
**Fragment Mono** for one small corner label and credits.

**Motion.** Digit roll 0.5 s (inOutQuart, +0.03 s per extra step), vertical motion blur up to 14 px while rolling; the
colour wipes down from the top in the same 0.5 s; words land on your word times (0.34 s, outExpo, 6 px blur clearing);
something changes every 1-3 s.

**Signature transition.** The odometer roll + colour flood (a hard cut on your word otherwise).

**Captions and top titles.** Talking-head edit: your sentence captions (Helvetica, white on a 50 % dark box) with the
code in its group colour; words BEHIND you (the giant 404 between you and the room). Shorts: a group-colour block on top
with the code in giant ink and a mixed-font title ("401 vs 403" heavy + "Unauthorized vs Forbidden" italic serif, T7),
captions in heavy caps with one coloured word (C1).

**Sound roles.** Tape switch (the roll lands), a ticking clock (spinning), click tone (underline), typewriter hit (words),
shutter (a page lands), marker (highlight). No whooshes.

**Test.** 73.9-83.3 ("look at the first digit… four… five").

## C · NOW SERVING (`C-serving/`)

**Idea.** A take-a-number counter. Every request is a paper ticket printed from a red dispenser ("REQUEST · GET
/repos/private"); the server's answer lights up on an amber dot-matrix "NOW SERVING" board ("404 NOT FOUND"). Real pages
are taped to the wall. The hotel keycard part uses a Pexels photo in a rounded window: "401 NO CARD", then "403 ANOTHER
ROOM".

**Look.** Pale wall `#DDE3E6`, dispenser red `#D6281F` (only ever = a request), board black with amber dots `#FFB21A`
(only ever = the server's answer), ticket paper `#FFFDF4`. **Reddit Sans** 800 + **Reddit Mono**, and the board's own
5x7 dot font.

**Motion.** Ticket prints 0.8 s (outQuint), tears and slides 0.55 s; board digits flick on row by row in 0.22 s; page
tapes in 0.5 s with a marker sweep 0.5 s.

**Signature transitions.** The board flick (with a service-bell ding) and the ticket tear.

**Captions and top titles.** Talking-head edit: the real page taped across you (receipt card), plain sentence captions.
Shorts: the board itself is the top title, your face below, sentence captions in amber with a black outline (C9).

**Sound roles.** Paper move (print), paper tear, service bell (board), buzzer (403), marker, typewriter hit, tape card.
No whooshes.

**Test.** 359.3-368.6 (404 instead of 403, then GitHub's docs).

## A · LINE DRAWING (`A-line/`): the kodekloud way, with you beside it

**Idea.** One bookshop counter drawn in thin white pen lines on near-black is the running example for the whole video.
Requests and responses are small code tags that travel between a laptop (the client) and the counter (the server):
`GET /books/42` goes over, a green `200 OK` comes back with the book. Titles are handwritten caps that type on.

**Look.** Near-black `#0B0B0C`, pen white `#F2F2EE`, grey `#8A8A86`; the group colour is the only colour (2xx lime
`#B6F36A`, 3xx sky `#74C7FF`, 4xx amber `#FFB547`, 5xx coral `#FF6F61`). **Kalam** 700 caps titles, **Fragment Mono**
tags.

**Motion.** Lines draw on like a pen (0.9-1.0 s, outQuint); tags travel 0.7-0.8 s (inOutQuart) along a dashed line that
draws ahead of them, with a short ghost trail; 2.5 % slow push per scene.

**Captions and top titles.** Talking-head edit: half and half (the black drawing panel left, you right). Shorts: the
drawing on top, you below, one word at a time (C6), handwritten title typing on (T10).

**Sound roles.** Pencil, typewriter click, UI click (request), dry pop (response), box tick. No whooshes.

**Test.** 110.0-119.9 (GET /books/42 → 200 OK, then 201 Created).

---

## How each look sits around you (`TH/`, frames from your real recording, never flipped)
- `th1-A-half.png` (A): half and half, the counter drawing beside you at 1:52.
- `th2-B-behind.png` (B): a giant amber 404 behind you at 3:56 ("404 not found").
- `th3-C-receipt.png` (C): GitHub's own sentence taped across you at 6:06, highlighted.
- `th4-card.png` (any look): a black phrase card, "401: Who are you?", your line at 5:34.
- `fix-B-correction.png`: **a correction in the edit.** At 8:11 you say "The first one is leaking stack traces", but it is
  the fourth mistake. The edit cuts to a "4 / 4" mistake counter for 1.5 s and the caption reads "The fourth one". No
  re-recording needed.
- Short SH8 "401 vs 403", one frame per look: `sh8-A-hook.png`, `sh8-B-hook.png`, `sh8-C-hook.png`, plus
  `sh8-card.png` (the 403 line as a phrase card). No timers in shorts.

## Scores (fresh critic, default reject, two rounds)
| | round 1 | round 2 | talking-head frame | short frame |
|---|---|---|---|---|
| A · Line drawing | 5.5 | 6.3 | 6.5 | 6 |
| **B · The first digit** | 7.3 | **7.9** | 8 | 8 |
| C · Now serving | 6.8 | 7.2 | 6.5 | 7.5 |
Correction frame 8, phrase card 7.

After round 2 the critic said B "should clear 8 once the 4xx-to-5xx change is one clean wipe and the Google crop is at
least 34 px". Both are fixed (the rolling digit now stays inside its own window; Google's sentence is about 46 px), plus
C's fixes (one sentence of GitHub at about 40 px across you in th3, blank gaps on the board, bigger ticket text). These
last fixes have **not** been re-scored. A was dropped by the critic as too close to the database-indexes look (dark
ground, mono tags, one lit path); it stays here because it is the kodekloud style your kit asked about.

## Questions for you
1. Which look for the whole video: A, B or C (or B with C's board for the receipts)?
2. B uses one colour per group. Happy with amber for 4xx and tomato for 5xx (your mistakes section would be mostly amber
   and tomato)?
3. The kit's open questions still stand (listen at 2:46 "302 or 308", 8:34 "false"); the correction frame above shows how
   any slip is fixed on screen.

## Her pick (2026-11-02)
**B · The First Digit for the whole video.**

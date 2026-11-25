# october-attacks: three film directions (2026-10-26)

The video: "October was supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the
other". None of the three directions repeats an earlier film: not your deck look, Blink, Thread, the SQL console, the
research wall, or the receipt. Each one is a picture that explains the video by itself, and each one shows the real news
pages: a screenshot of the actual article, a highlighter on the line you say, and a small source credit underneath. The
pages are only cropped, never changed.

**Overview:** `overview.jpg`, one row per direction. Each row has 6 frames in 16:9, then 2 frames in 9:16.

Each folder has:
- `frames/`: every still. The 9:16 ones are named `p1-…` and `p2-…`; the extra 16:9 ones were made along the way.
- `motion-test.mp4`: 16:9, on your real voice, with real sound effects and a quiet music bed, at about -14 LUFS. Please
  listen to it: nobody here can.
- the code that draws it (`kit.js`, `scenes.js`, `film.json`). This is the studio's own engine, so the direction you pick
  becomes the full film directly.

Times in this file are seconds into your recording. The real pages were captured on 2026-10-26 into `_src/`, and
`_src/clips/` holds the crops each frame uses.

---

## A · THE MONTH (`A-month/`): October is the film's spine (recommended)

**Idea.** You open by saying October was supposed to be Cybersecurity Awareness Month. So the film is that month: a big
October 2026 wall calendar with "Cybersecurity Awareness Month" printed on it.
- On "one attack after the other", the days turn black one by one, each with its story written in it: 14 and 15 Zeabur,
  17 eMudhra, 19 OpenCode, 21 PHP2Shell and Railway.
- Then the camera dives into a day, and that story plays inside the day's square. The date stays big in the corner, and
  the neighbouring days peek in at the edges, so you never leave the calendar.
- PHP2Shell is drawn as the request's day: first a request comes in, then PHP reads it (the hole), then your login and
  your middleware, which never get a chance.
- The fix is that day's to-do list. Zeabur's token is drawn as a strip of months from January 2024 that never ends. The
  eMudhra key is a calendar square holding the number 4.

It fits because anyone can read a calendar in a second, and "a month of attacks" is literally the point of the video.

**Look.**
- Grounds: October orange `#F2541B` for the month, night `#16110D` for inside a day, bone `#EFE7D8` for the explainers.
- Ink is `#16110D`. Each scene has one accent: ink on orange, orange on night and on bone.
- Type: **Anton** (numbers and headlines, all caps), **Manrope** 700 (sentences), **Spline Sans Mono** (labels and code).

**Real sources.** Each story frame has its article as a white clipping inside the day, wide enough to read (text about
33-36 px). A light orange highlighter sweeps the line as you say it, with the source and date underneath:
- BleepingComputer: "before any application code runs", the PHP2Shell headline, Zeabur's "The admin tokens had no
  expiry", eMudhra's "so weak that anyone could recover them almost instantly".
- TechCrunch: "may have accessed encrypted environment variables", and "all users should revoke and rotate all of their
  keys".

**Motion test** (0:02.6 to 0:22.6, the opening):
- The month draws in, with a slow push.
- The banner wipes on, and is underlined on "ironically".
- The days fill on "one attack after the other".
- The camera dives into the 21st, and PHP lands on your "PHP".
- The Railway coverage comes in, and its line is highlighted on "change their secret keys".
- Sounds: a low hit, paper slide, marker, pencil, a card place / tap / pop on three of the dates, zoom, shutter, punch.

## B · THE KEY BOARD (`B-keys/`): who has your keys?

**Idea.** Almost every story is about keys: the secret keys in a `.env` file, an admin token that never expired, stolen AI
API keys, a signing key that was the number 4. So the film is a pegboard key wall, the place where keys are kept. Each
platform has a hook with a printed name plate.
- On "one attack after the other", the keys are taken one by one and the plates turn red.
- Railway's keyring is emptied when users are told to revoke.
- Zeabur: the other keys are swapped for new ones after August, while the old brass admin key ("since Jan 2024, no expiry,
  never changed") stays on its hook and gets circled.
- eMudhra's key has a 4 stamped on it.

It is the most tactile and playful of the three. It stretches for PHP2Shell (drawn as a door that the request slips under,
before any lock) and does not cover the AI-agent hacker story.

**Look.**
- Pegboard tan `#C99A66` with a fixed grid of holes `#B4844F`, tag paper `#FBF5E8`, ink `#1D1A16`.
- Keys are nickel `#E6E2D8`. The old admin key is brass `#D9A441`, and the new keys are dark `#3A332B`.
- One accent, tag red `#E2231A`. A dark ground (ink) for the fix.
- Type: **Bowlby One** (headlines), **Figtree** 800 (sentences), **Overpass Mono** (plates, tags, code).

**Real sources.** The articles are clipped to the board with a black bulldog clip, as if pinned up next to the keys. Same
highlighter and credit as in A.

**Motion test** (3:59.75 to 4:17.25, Zeabur):
- The keys hang up.
- The camera pushes in to the admin key while you say "admin token had no expiry date", and its card fills in on your
  words.
- On "when they changed their keys", the old keys drop and new dark keys swing in.
- On "they didn't include that particular set of tokens", the admin key gets circled in red.

## C · THE STATUS PAGE (`C-status/`): the internet's status page for October

**Idea.** When something breaks, developers check the status page. This film is the internet's status page for October:
- PHP, Node.js, Railway, Zeabur, OpenCode and eMudhra each have 31 daily uptime bars.
- A "Scheduled: Cybersecurity Awareness Month" notice sits above them.
- On "one attack after the other", the bars of the attack days turn red, and the banner flips from "All systems
  operational" to "Major outage".
- Each story is an incident post: investigating, identified, action needed.

It is the most "developer" of the three, and the cleanest. It is also the closest to a product UI, so it has the least
punch.

**Look.**
- Page `#F1F2F4`, white cards with `#D8DCE2` hairlines, ink `#0E1116`, uptime green `#3FAE72` (data only).
- One accent, incident red `#E5383B`. Dark code blocks `#0E1116`.
- Type: **Public Sans** 900 / 700 and **Red Hat Mono**.

**Real sources.** Each article is attached as "Coverage" under the incident post, with the same highlighter and credit.
On TechCrunch's green header, the highlight is a yellow underline instead.

**Motion test** (3:03.4 to 3:21.6, Railway):
- Railway's own uptime row turns red on the 21st.
- The incident updates come in on your words: investigating, deploys paused, action needed. "(this one affected me too)"
  appears when you say it.
- The `.env` values switch to REVOKED on "revoke and change".

---

## Critic scores (fresh critic agent: a harsh motion director, starts from reject, pass mark 8)

| Round | A · Month | B · Key board | C · Status page | What changed after |
|---|---|---|---|---|
| 1 | 6.5 | 5.5 | 5 | (see below) |
| 2 | **7.5** | 6 | 5.5 | A: "change their secret keys" now wipes in as one block, the a3 still is taken after the move settles, the 9:16 label is 22 px higher, the eMudhra crop is cleaned, the corner day numbers sit 30 px inside. The critic's pick both rounds: A. |

Still open before a full A build (critic round 2): the 9:16 Zeabur page crop cuts words at the right edge (crop to whole words); a4 has two focal points (bring the quote in after the blocks); a2 has an empty lower right. B: the push-in cuts two keys at the edge, the Zeabur source arrives 10 s after the line, and the kraft dot ground and rough type are off her taste. C: still reads as a generic dashboard, and its motion is the weakest.

Round 1 notes, and what I changed:
- **All three: more real sources, readable, highlighted.**
  - Added the PHP quote, the PHP headline, the eMudhra quote and two TechCrunch text crops.
  - Shown 1400-1700 px wide (text about 33-36 px), and in 9:16 a narrower crop of the same page.
- **A**
  - Every story now sits inside its day square.
  - The numbered list became a day view of event blocks.
  - In the opening the 21 sits top-left, the zoomed cell number fades out, and PHP lands on your word.
  - Supporting lines wipe in as one block (a second entry style).
  - The six date sounds became three.
  - The ellipse became an underline.
  - The 9:16 frames moved inside the safe area.
- **B**
  - The Zeabur plates now name the systems in Zeabur's own attack chart (AWS keys, GCP key, database, GitHub App,
    secrets).
  - The keys stop swinging after about a second.
  - The arrow runs under the door.
  - A bigger 4, and the bulldog clip no longer covers the screenshot.
  - Three sounds instead of six fast ones.
- **C**
  - Invented token dates removed: only the admin token row, which comes from the source, has dates.
  - Removed the coloured strip on the card edge.
  - Fixed the card widths.
  - The coverage comes in 2 s earlier (it was a 4 s dead hold).
  - The game-show buzzer became a low alert sound.

**Dates:**
- 14-15 Oct: Zeabur's second breach (Zeabur, via BleepingComputer).
- 17 Oct: the eMudhra weakness was found (BleepingComputer).
- 19 Oct: TechCrunch's OpenCode story.
- 21 Oct: PHP2Shell, plus Railway's blog post ("on Wednesday", TechCrunch, 22 Oct). You say Railway happened on the same
  day as PHP.

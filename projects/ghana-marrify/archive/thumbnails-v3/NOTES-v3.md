# Thumbnails, round 3 (ghana-marrify, 2026-10-06)

Round 3 after she rejected all 18 from rounds 1-2 ("all of these thumbnails tell me nothing about the video"). Built to
`THUMBNAILS.md` RULE 0: **the topic in plain words + a literal picture of the topic**, never an angle from inside the video.
Round-2 notes: `../../archive/thumbnails-v2-rejected/NOTES-v2.md`.

## The topic, as a stranger would recognise it
**Ghana launched an app that lets anyone check whether someone is married (or divorced).**
The press framed it this way: Graphic Online, 3 Sep 2026, "App launched to help Ghanaians verify prospective partners' marital
status before marriage" (`film/assets/sources/SOURCES.md`).

## Files
- **Edit in the browser:** http://localhost:7700/design/ghana-marrify/thumbnails/
- **Source:** `directions/01-already-married/` (`index.html` + `content.json`). The shared parts are in `lib/r3.css`: phone, search
  bar, certificate and stamp, all of them generic illustrations labelled ILLUSTRATION, never Marrify's real interface. They build
  on `lib/r2.css` (her photo with a person mask on top).
- **Generator:** `python3 tools/gen3.py [01] [--reset]`, then `node render.mjs`. The directions that were cut are kept in
  gen3.py as `CUT[...]`. Their folders and PNGs are in `../../archive/thumbnails-v3-cut/`. To bring one back, move its folder
  into `directions/`, rename `CUT[` to `D[` in gen3.py, and render.
- **Outputs:** `outputs/thumbnails/01-already-married.png` and `overview.png` (titles under each thumbnail).

## Step 1: wording gate (text plus a one-line picture description, no title, fresh cold critic)
28 candidates. **Pass** means the critic's "this video is about…" sentence matched the topic with confidence 4 or higher.

| # | Text | Critic: "this video is about…" | Conf | Click | Result |
|---|---|---|---|---|---|
| 01 | Is he already married? | a way to look up whether a man in Ghana is already married | 4 | 8 | **pass** |
| 02 | Ghana's marriage app | a Ghanaian dating/matchmaking app | 2 | 4 | fail ("marriage app" reads as dating) |
| 03 | Check if someone's married | a tool in Ghana to check if someone is married | 5 | 7 | **pass** |
| 04 | Search anyone's marriage | some marriage lookup site | 3 | 4 | fail |
| 05 | Marriage records: now online | government marriage records now online | 4 | 6 | **pass** |
| 06 | Ghana's new marriage check | a new Ghanaian service for checking marriage status | 4 | 6 | **pass** |
| 07 | Is your partner married? | finding out if your partner is secretly married | 4 | 7 | weak (reads as cheating drama) |
| 08 | Secret marriage? Look it up. | how to find a hidden marriage | 3 | 6 | fail |
| 09 | An app for secret marriages | an app to keep marriages secret | 2 | 5 | fail (read the wrong way) |
| 10 | Married? There's an app. | an app that tells you if someone's married | 3 | 5 | fail |
| 11 | Divorce records, now public | divorce records becoming searchable | 3 | 4 | fail |
| 12 | Look up any marriage | how to look up a marriage record | 3 | 5 | fail |
| 13 | Ghana's marriage search app | a Ghanaian app for searching marriage records | 5 | 6 | **pass** |
| 14 | Check before you marry | checking your future spouse isn't already married | 4 | 7 | **pass** |
| 15 | Is she already married? | finding out the woman you'll marry has a husband | 4 | 7 | fail (a wedding photo stamped MARRIED is redundant) |
| 16 | Verify before "I do" | verifying something before your wedding | 2 | 4 | fail |
| 17 | Marriage status: searchable | marriage status becoming searchable in Ghana | 4 | 5 | **pass** |
| 18 | Ghana: check any marriage | Ghana launching a way to check anyone's marriage status | 5 | 6 | **pass** |
| 19 | Married or not? One search. | a single search that tells you if someone is married | 4 | 7 | **pass** |
| 20 | Your marriage, on an app | a digital marriage certificate wallet | 2 | 5 | fail |
| 21 | Ghana made marriages searchable | Ghana making all marriage records searchable | 5 | 7 | **pass** |
| 22 | Married? Divorced? Search it. | looking up whether someone is married or divorced | 4 | 6 | **pass** |
| 23 | The marriage-check app | an app that verifies someone is married | 3 | 5 | fail |
| 24 | Should this app exist? | some controversial app, unclear which | 1 | 4 | fail |
| 25 | Good idea? Ghana's marriage app | whether Ghana's marriage app is a good idea (dating?) | 3 | 6 | fail |
| 26 | I love it… but | no topic | 1 | 3 | fail |
| 27 | Too public? | something too public online | 1 | 3 | fail |
| 28 | Every marriage, one search away | Ghana digitising all marriage records | 5 | 6 | **pass** |

12 passed. Lesson: "marriage app" on its own reads as dating. The words that make the topic clear are the verbs (check, search,
look up, searchable) plus "already married". Angle-only lines (24, 26, 27) say nothing, which is exactly what she rejected.

## Step 2: designs and gates
12 thumbnails were built from the passing wordings, with these props: real wedding rings from Pexels, a real ring box, real
paper records, the real Graphic Online headline, flat Ghana flags, a generic phone, search bar and certificate (illustrations),
and the film's Blink record character. Her frames are never flipped or retouched. Each round had three fresh critics, run in the
foreground:
(a) a cold critic who saw the images only (1280, 320×180 and 168×94 with a duration badge, no titles) and wrote "this video is
about ___"; (b) a packaging critic who scored the titles paired with each thumbnail; (c) a taste critic who compared them with
her Pinterest board and YouTube thumbnail sheets.

**Every design passed the topic gate in every round.** Every cold sentence was some form of "Ghana has an app or way to check
whether someone is married". The bar to ship was 8/10 or better on both (b) and (c).

| Thumbnail | Round 1 (b clarity/click · c taste) | Round 2 | Round 3 | After fixes | Result |
|---|---|---|---|---|---|
| **01 "is he already MARRIED?"** | 8/8 · 7.5 | 7/8 · 7.5 | 8/8 · 7.5 | **8/8 · 8** | **SHIPS** |
| 08 "Check before YOU MARRY" | 8/7 · 6 | 8/8 · 7 | 8/8 · 7.5 | 8/6.5 · 7 | near miss: face mid-word, phone floats |
| 04 "Ghana's new MARRIAGE CHECK" + real Graphic Online clipping | 8/6 · 7.5 | 7/6 · **8** | 8/5 · **8** | (not changed) | near miss: most "her board", but "marriage check" is vague and the clipping is mush at feed size |
| 10 "MARRIED? / DIVORCED?" + "Search Ghana's records" | 7/8 · 6.5 | 7/7.5 · 7.5 | 7/7 · 7.5 | (not changed) | near miss: her face mid-word, eyes to the side |
| 03 "Ghana made marriages SEARCHABLE" | 7/7 · 7 | 8/7 · 7 | 9/8 · 6.5 | 7/7 · 6.5 | cut: no tension; every frame tried had a problem (head over the word, a "shh" nail that read as a nosebleed, mid-word face) |
| 02 "Check if someone's MARRIED" (paper + photo panel) | 9/6 · 6 | 8/6 · 7.5 | 9/5 · 7 | (not changed) | cut: clearest words, flattest feel, awkward hand-over-mouth frame |
| 05 Before/after: paper records → phone | 9/5 · 6 | 7/5 · 5 | n/a | n/a | cut after round 2: reads like a government notice |
| 09 "Every marriage, ONE SEARCH AWAY" (records photo) | 7/5 · 6 | 6/5 · 5 | n/a | n/a | cut after round 2 |
| 06 Certificate + search, "Marriage status: SEARCHABLE" | 7/7 · 5 | n/a | n/a | n/a | cut after round 1: busy fake document |
| 07 Blink character + search bar, "Married or not? One search." | 7/6 · 4 | n/a | n/a | n/a | cut after round 1: looks like a SaaS ad |
| 11 Ghana flag on the wall, "GHANA: check any marriage" | 7/6 · 4 | n/a | n/a | n/a | cut after round 1: four focal points |
| 12 White-and-red editorial cut-out, "marriage search app" | 9/5 · 3 | n/a | n/a | n/a | cut after round 1: the old cut-out-on-flat formula |

"After fixes" was one extra check of the round-3 fixes (01, 03 and 08 only), run by two fresh critics.

## The thumbnail that ships: 01-already-married
- **Text:** (Ghana flag) *is he already* / **MARRIED?**, plus a search bar reading "Search Ghana's records" (labelled ILLUSTRATION).
- **Her frame:** 1:35, sceptical frown, hands at her ears (the taste critic read it as "taking the earrings off, ready for a
  fight"). The face is big on the right; the words sit on the left, fully readable at 168×94.
- **References from her board:** "Capsule wardrobe" and "THIS IS WAR" (serif italic over heavy caps), "Why You're Stuck" (the
  topic's object in frame), "FAVOR" (a big word next to the face).
- **Cold critic, image only:** "You can use Ghana's records to find out whether a man you're dating is secretly married." Would
  click 7.5-8/10.
- **Titles:**
  1. Ghana Launched an App to Check If Someone Is Married (51), her own kit title 1. It is the most searchable, and the critic's
     pick for the one title to use across a Test & Compare.
  2. You Can Now Look Up Marriages in Ghana. Should You? (51), the critic's best pair: clarity 8, click 8. It adds the real
     question her video asks.
  3. Ghana's New Marriage Search App: Good Idea or Privacy Risk? (59)
- **Honesty:** "is he already married?" is not a line from her script. It is the press framing (Graphic Online: "verify
  prospective partners' marital status"). The video opens on exactly that (0:00-0:16: "search/verify marriages"), then gives her
  take, so the thumbnail does not over-promise. The search bar is a generic illustration.
- **Risk (two critics):** "he" leans towards relationship drama. If watch time drops in the first 30 s, test "Is your partner /
  MARRIED?" (the text can be edited in the studio).

## Recommended 3 for Test & Compare (one title for all three: "Ghana Launched an App to Check If Someone Is Married")
1. **01 "is he already MARRIED?"**: passed every gate.
2. **08 "Check before YOU MARRY"**: a near miss, and the most practical promise. Pair critic 8/8 in round 3.
3. **04 the real Graphic Online clipping + "MARRIAGE CHECK"**: a near miss, and the most "her board" (taste 8). It works as a
   news-led contrast.

08 and 04 are in `archive/thumbnails-v3-cut/` because they missed the 8/10 bar on one gate. If she likes them, they come back in
one move (see Files). Better still, give us a sharper, more expressive photo of her for 08.

## Stock and sources (free licences)
| File | What | Source | Licence |
|---|---|---|---|
| `assets/stock/rings_cut.png` | two wedding rings on a leaf, cut out with macOS Vision | https://www.pexels.com/photo/28503709/ | Pexels licence (free, no attribution required) |
| `assets/stock/ringbox_cut.png` | rings in a white box, cut out | https://www.pexels.com/photo/15950900/ | Pexels licence |
| `assets/stock/rings_paper.jpg` | gold rings on an invitation (not used in the final set) | https://www.pexels.com/photo/30232952/ | Pexels licence |
| `assets/stock/paper_bundles.jpg` | tied bundles of old paper records (05, cut) | https://www.pexels.com/photo/7654125/ | Pexels licence |
| `assets/stock/file_stack.jpg` | stack of old folders (09, cut) | https://www.pexels.com/photo/37100690/ | Pexels licence |
| `assets/stock/archive_shelf.jpg` | archive shelf (not used) | https://www.pexels.com/photo/3927131/ | Pexels licence |
| `assets/props/graphic_headline.png` | the real Graphic Online headline, 3 Sep 2026 (04, cut), credited on the clipping | `film/assets/sources/SOURCES.md` | quoted news headline, credited |
No stock photo shows a face. A real Brazilian marriage certificate photo (Pexels 15379427) was rejected because it shows a real
name. Marrify's record pages were never used.

## Questions for her
- Does 01 work for her? Is "he" fine, or would she rather have "your partner"?
- Does she have a sharper, better-lit photo of herself making a sceptical face, or holding her phone? Every critic's top
  remaining note was the soft, green-tinted video frames. May we lightly warm the footage (no retouching)?
- Should 08 and 04 come back from the archive for a three-way Test & Compare?

## Main-session decision (2026-10-06)
All 12 round-3 designs passed the topic gate (a cold critic named the topic from the image alone). Only 01 reached 8/10 on taste + title pairing; the critics' main remaining complaint was the soft, green-tinted video frames. Since she asked for "as many good solid thumbnails as we can", all 12 are restored to the editor for her to choose (none of the rejected v1/v2 angle-thumbnails). Recommended: 01 (passed every gate), then 08 and 04 for Test & Compare.

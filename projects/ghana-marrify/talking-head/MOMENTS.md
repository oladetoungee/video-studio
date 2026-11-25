# Talking-head clips: Ghana's Marrify

Seven clips from her 5:12 recording, one per clip in her kit's breakdown (section 5c), mapped to what she actually says
(BRIEF.md). Each opens on a hook panel that is on screen from frame 0 and says plainly what the clip is about, for someone
who has never seen the video, and ends on her own payoff line.

**Times:** source in/out = seconds on `kit/ghana-marrify.mov`; length = the finished clip after cuts, plus a 1.5 s hold;
beat times are on the finished clip.

**Cuts (`data/edl.json`, `studio/tools/footedl.py`):** every pause over 0.40 s is cut to 0.24 s (she speaks fluidly, so this
removes little); the retakes and asides listed below are removed; cuts land in silences on frame boundaries.

**Density:** `composite.mjs check` on every clip, both formats: no gap over 2 s without graphics, no hold over 3 s without a
change, no empty panel over 0.4 s, nothing over her face (two 1-2 % touches of a plate edge on her chin). Something new
lands every 1-3 s, each on her word.

**Look (2026-10-02): the film's "Blink" look** (her pick; the earlier deck-style version is retired, see Critique). Built on the
film's shared kit `../film/scenes/blink.js` (loaded first from `talking-head.json`), with `moments/common.js` for what footage
needs. One clear white world (#F4F4F4); colour lives in the characters: records with eyes (certificate, folder, envelope, stamp,
gazette, register, ID card, shop, court) and grey searcher faces with typographic eyes that blink, squeeze (`> <`), close
(`– –`) and look at the new thing. Instrument Sans headlines with one coloured word, Geist Mono small captions. Entrances are
springy pops, blinks and eyelid wipes (into and out of the full white cards), not fades. Serious beats (a divorce record is
personal, consent, stigma for women) use a calmer register: eyes closed or looking down, slow moves without overshoot.
- **Split:** a white panel (16:9 left 880 px; 9:16 the bottom 860 px, her drawn smaller above it). Panel content stays in
  x 80..940, y <= 1640 in 9:16 (app UI); the burned captions sit on the panel line and step aside while the panel slides in.
- **Full:** a punch-in or slow push on her; white speech bubbles beside her (9:16: under her chin, where the captions were,
  so the captions step aside while bubbles show her words); a character pops up beside the bubbles and looks at her.
- **Card:** the full white world for a punchline, entered and left with the eyelid wipe (the lids shut for 2 frames).
- **Real sources** in white cards with a mono credit: TechCabal Daily (8 Sep 2026) with the highlighter on her words (m01, m03);
  Marrify's real, empty search box (marrifyapp.com, captured 1 Oct 2026) with searcher faces around it (m01, m03). Per the
  BRIEF privacy rule, no record list or record page is ever shown and no name is typed into Marrify's search. Every made-up
  interface (tables, phone, notification) carries a mono `ILLUSTRATION` mark.
- Burned captions: white label, the spoken word marked in highlighter yellow (restyled in `common.js`, same words and timing).

| # | Kit | Slug | Source in-out | Length | Hook (frame 0) | Payoff |
|---|---|---|---|---|---|---|
| 01 | C1 | marrify | 0.00-43.45 | 43.9 s | Ghana now lets you check if someone is *married.* (records with eyes, Ghana flag) | card: Centralised data. *Finally, finally.* (every record packs together) |
| 02 | C2 | estonia | 53.82-100.98 | 45.5 s | In Estonia, you can get *divorced* online. (+ "I've lived here a year") | One *reliable* record (instead of pieces of paper everywhere; NIN = Nigeria's ID number) |
| 03 | C4 | one-search-away | 104.20-166.98 | 43.9 s | (Ghana just put marriage records online.) Your divorce, searchable by anyone with your *name.* | courthouse 2003 vs a phone, 3.0 s (illustration) |
| 04 | C5 + C6b | yes-or-no | 169.19-221.46 | 44.2 s | (Ghana just put marriage records online.) Is this person free to marry? That's a *yes or no.* | access levels: an individual sees one level; certain organisations or institutions can access more (illustration) |
| 05 | C6 | not-neutral | 225.72-259.60 | 31.7 s | A divorce record. In Estonia: nobody cares. In an African context: still stigmatised, especially for women. | card: It's also a *cultural design* thing. (people and records together) |
| 06 | C7 | reciprocity | 262.78-284.62 | 23.4 s | (Ghana just put marriage records online.) Someone looks up your marriage record. Do you get to *know?* | Do I get to *see* that? |
| 07 | C8 | build-it | 285.42-310.55 | 24.9 s | (Ghana just put its marriage records online.) I want African countries building *this.* And *questioning* it. | Running in my head: I love the idea / and the drawbacks + @WithGbemi |

**Not built:** kit clip 3 ("no record found" / the empty screen / nobody reads disclaimers) is not in the recording.
Kit clip 6b (access levels, ~12 s of speech, under the 15 s floor) closes clip 04 again, as she asked on 2026-10-02.

## Hooks: kit vs ours
The kit's overlays (section 5c) are kept visible here; ours replace them on screen. Each was read cold ("would a stranger
scrolling past understand it and want more?") and checked against what she says in that clip.

| # | Kit overlay | Ours | Why |
|---|---|---|---|
| 01 | Ghana made it possible to check if someone is secretly married | Ghana now lets you check if someone is married. | "Secretly" is not hers and oversells; the plain version is what the platform does ("search and verify marriages"). |
| 02 | they were not joking about Estonia being fully digital | In Estonia, you can get divorced online. (+ "I've lived here a year") | Concrete and surprising in one line; she says "you can divorce online". The kit line needs you to know who "they" are. |
| 04 (kit 4) | "it was already public" is not the defence people think it is | Your divorce, searchable by anyone with your name. | She never makes the "already public" argument in the recording; she says "searchable by anyone that has your name". |
| 05 (kit 5) | the question is yes or no. so why does it return your whole history? | Is this person free to marry? That's a yes or no. | The kit line claims what Marrify returns, which she doesn't say. Ours is her sentence. |
| 06 (kit 6) | the same app means something completely different depending on where you live | A divorce record. In Estonia: nobody cares. In an African context: still stigmatised, especially for women. | Kept the idea, made it concrete with her own two examples, keeping her qualifiers. |
| 07 (kit 7) | can you see who has been looking you up? | Someone looks up your marriage record. Do you get to know? | Same question, her words ("if someone looks up my marriage record"). |
| 08 (kit 8) | I want Africa building this. I want us asking the second question. | (Ghana just put its marriage records online.) I want African countries building this. And questioning it. | "The second question" is the kit's phrase; she says "probe it a little bit and question it". |

## Removed inside clips (beyond pause tightening)
| Clip | Removed (source s) | What was said |
|---|---|---|
| 02 | 67.35-69.10 | "It's like the eighth papers." (unclear, not captionable) |
| 02 | 90.78-92.22 | "At least, even though it's not like it." |
| 03 | 101.85-104.20 | "And I think the main thing that even made me record this video is like" (refers to the long video) |
| 03 | 110.28-111.04 | "I don't know. Like," |
| 03 | 124.44-126.98 | "You can check how much a business, you don't know anything about it." (stumble) |
| 03 | 136.68-139.56 | "So that really got me thinking about the drawbacks, of course." |
| 03 | 141.80-150.12 | "But I also really don't know how to balance it well with personal data and privacy issues. Something to think about that I've been thinking about." |
| 03 | 152.66-156.60 | "Because I want to believe that divorce information, right? There's a consent part" (retake) |
| 03 | 161.86-163.62 | "and there's a difference in that." |
| 04 | 167.64-169.19 | "And I was also then thinking about" |
| 04 | 187.96-197.30 | "I was also thinking about how data minimization can come to play here as well. Could we minimize data to the point where we are not exposing much more than is being asked for?" (restates the definition) |
| 05 | 224.50-225.72 | "And again, I always say this, that" |
| 05 | 226.86-227.62 | "It works." (false start) |
| 05 | 248.40-250.76 | "when I think about the drawbacks first, that" |
| 07 | 292.60-293.84 | a hum between sentences |

## Beats (Blink)
(Exact word cues in each `moments/m0N-*.js`. 16:9 and 9:16 share beats; layouts are recomposed per format.)

**01 marrify.** hook panel: headline + Ghana flag + four records with eyes, "It's called Marrify." pops on her word · split: the
real Marrify search bar (credited), a searcher face squints at it; MARRIAGES / DIVORCES / LICENSED MARRIAGE OFFICIALS tick on her
words · full: "Launched last month / with the Ministry of Gender" + chip "Launched in Accra, 28 Aug 2026" (verified) · split (9:16) / full
card (16:9, capture 1200 px wide): the real TechCabal Daily section, "launched Marrify" highlighted on "TechCabal" · split: Registrar-General's Department, the courts,
local assemblies wire into one folder ("one search"), each lights as she names it · full: all kinds of marriages / divorces ·
card (lid): "It goes all the way back." records shrinking into the past, TODAY at the front · split: "Check if it's licensed:"
a church / a pastor / a marriage venue tick on "licensed", a green stamp pops happy · full: I really love this / As an African:
"Wow." · card (lid): Centralised data. *Finally, finally.* every record springs in and packs together, eyes turn happy.

**02 estonia.** hook (Estonia flag, three records, "I've lived here a year.") · full: the digital hub of Europe (or something
like that) → I'm not going to lie: it's so real · split: "Everything you want to do here is online." records get green checks ·
full: your health records / everything links · split: health records, getting married, divorcing online, each a record + a
ticked bubble ("There's a link for everything.") · split: the data ecosystem (health records, marriage, divorce, you), links
draw, everyone blinks at once on "syncs" · full: I genuinely admire it · split: Nigeria → Estonia flags, records pop wide on
"blew", "It blew my mind." · full: I see Ghana doing / something in this direction (Ghana flag) · card (lid): Yes, please.
*More of this.* (records bounce) · split: dizzy records = pieces of paper everywhere (struck on "instead of NIN", "NIN: Nigeria's
ID number"), then One *reliable* record.

**03 one-search-away.** hook (context line, a divorce folder looking down, searcher faces turned to it) · split (9:16) / full card
(16:9): TechCabal's own words, "But there's a drawback" and "sensitive personal information" highlighted on her words · full (calm): A divorce
record is *personal.* / About someone's life, a sleeping folder drifts in · split: the real Marrify search bar, faces gather in
an arc and stare at it ("Searchable by anyone that has your name.") · full: I like open data / still a genuine drawback · split:
in Estonia, a business (shop with eyes, how much it made in a year, public entity / public money / public accountability tick,
"That's fine.") → a divorce: a little bit *different* (the folder wakes, looking down) · full: I don't really know / I love the
idea of open data · card (lid, calm): There's also the *consent* part (a folder looking down closes its eyes on "consent") · split: a courthouse with sleeping
divorce papers, 2003 vs a phone (illustration) typing "Their name", DIVORCE · 2003 in 3.0 s.

**04 yes-or-no.** hook (a searcher asks "Is this person free to marry?", a record waits; YES / NO) · split: Data minimisation:
expose the *minimum.* a record table locks column by column and folds down to Status · split: the question bubble, YES / NO
(both light together on "yes or no"; neither is ticked: no answer is implied) · split: "Answering it does not require showing:" columns lock on her words (married, spouse,
divorced, court) · full: In the case of Marrify in Ghana: / Is this person married? · split: "The answer is simple:" This person
currently has an *active marriage* on record ✓, *Nothing else.* name of spouse / dates / history struck on her words · split:
"Another person could request another thing." → "Maybe: access levels." an individual (one level) and certain organisations or
institutions (can access more), the individual tier lit from "another person", the institutions tier on "organisations" (illustration; the status column shows no record).

**05 not-neutral.** hook (two rows: Estonia, a relaxed folder, "nobody cares." / Nigeria + Ghana, a folder looking down under two
staring faces, "still stigmatised, especially for women.") · full: Technology is *not neutral.* / It takes the form of the place
you use it in · split: Same technology, Estonia | Nigeria, Ghana, the same record in both; on "completely different" one smiles,
one looks down · split: in Estonia a divorce record could just be *administrative.* (a stamp), passers-by look away: Nobody
cares · split (calm): In an African context, to a large extent, (9:16: one headline building word by word on her voice) divorce,
especially *for women,* is still pretty *stigmatised.* the folder looks down as faces slowly turn to stare · full: it's very tricky / I myself need to explore the human side · split:
It's not just a *privacy engineering* conversation (a locking table) · card (lid): It's also a *cultural design* thing, people
and records pack together and blink once on "design".

**06 reciprocity.** hook (a searcher's dotted gaze on "my record", "In Estonia, you can." in 16:9) · split: you and the system,
your data one way, you see what happens to it the other way ✓ · card (lid): Transparency runs *both ways.* a face and a record,
a two-way arrow · full: if we're creating open data in Africa (Ghana + Nigeria flags) → we also need to ask the question of… ·
card (lid): *Reciprocity.* · full: Where is the *reciprocity* / for the average individual? · split: someone's gaze reaches my
marriage record (illustration), the record turns and squints; Do I get to *see* that? (16:9 adds a faded "what it could look
like" notification).

**07 build-it.** hook (green context line, headline, Ghana + Nigeria flags, records smiling) · split: Why build it: it solves the
problem ✓ / technology helps ✓ · full: If we *build* this, / as people, we still need to… · card (lid): Probe it. *Question it.*
faces squeeze (`> <`) at a record · full: I really *like* the idea. Super cool. → I really *love* it. · split: Running in my
head: I love the idea ✓ / and the drawbacks, Full video on YouTube @WithGbemi.

## Critique
### Deck-style version (2026-10-01, retired 2026-10-02)
Fresh critic agent (harsh short-form editor, default reject, given only the sheets/stills, CLAUDE.md and the BRIEF's
"what she says" list).

**Round 1** (2026-10-01): m01 6 · m02 5 · m03 6 · m04 6.5 · m05 7 · m06 6 · m07 5. Main problems and what changed:
- Word-by-word reveals left lone words ("It", "Does", "Same") and near-empty panels → every plate and heading now lands as
  a whole phrase on its first word (accent words still pop on their own word); every panel opens with its heading and
  first content item.
- The same words twice (plate + burned caption) → the captions step aside while a plate pair shows her words.
- Content under the app UI → 9:16 panel content kept inside x 80..940, y <= 1640; the end CTA moved up.
- Payoffs small and held 0.8 s → end hold 1.5 s; payoff cards (m05 "It's also a cultural design thing", m06
  "Reciprocity.", m02 "One reliable record" in green) and bigger end beats.
- Hooks still blurring in at 0.6 s → every hook is fully on screen at frame 0; m04, m06, m07 gained a context line
  ("Ghana just put marriage records online.").
- Mid-video connectors at the start of the audio → m03 now starts at "a drawback that TechCabal raised", m04 at "data
  minimization", m05 at "technology is not neutral". m03 also lost "But I also really don't know how to balance it…"
  (and its balance-scale beat) to get under 45 s.
- Honesty fixes the critic found (checked against the transcripts): "A STRANGER / AN EX / A NEIGHBOUR" removed (she says
  "anyone that has your name"); "AN INDIVIDUAL → YES / NO" is now "A PARTICULAR LEVEL" (her words); "Now Ghana is doing
  something in this direction" plate is now just "Something in this direction" (that sentence is unclear in the audio:
  whisper heard "I see, then I read" and "I see Dana doing", her own .srt "I'm gonna do"); "THE STATE SEES YOU" labels
  removed; "AFRICA" column relabelled "NIGERIA, GHANA" with both flags; caption "Marrify?" → "Marrify.".

**Round 2:** m01 7 · m02 6.5 · m03 7 · m04 6.5 · m05 7.5 · m06 7 · m07 6.5. Accent words still landed late (holes like
"It ___ from:"), so every word now lands with its phrase; panels open with content; the x <= 940 squeeze had created a few
collisions (now caught by `tools/padcheck.mjs`, which checks every frame for text overlaps, text out of its card, text
outside the 9:16 safe zone, and the window framing showing its paper strip); m04 now ends on its payoff; payoffs became the
biggest type (m06 "Do I get to see that?"). The critic retracted one round-1 honesty flag: the corrected words read "And I
see Ghana doing something in this direction" (BRIEF agrees), so that plate is back.

**Round 3 (final):** m01 8 ✓ · m06 8 ✓ · m02 7.5 · m03 7.5 · m04 7.5 · m05 7.5 · m07 7.5 ("each held back by 2-3 specific
bugs, none structural"; honesty clean, every plate checked against her words). Fixed after round 3, not re-scored: plates land
with no blur and a 10 ms stagger (the "ghost word" frames), m02 strike thinner over larger type, m03 courthouse/phone and
business cards on the panel's first frame, m04 panels and answer bar filled on frame 1 and the "Nothing else" spacing,
m05 "for women" highlight glitch removed and the orange panel filled on frame 1, m06 notification spacing, m07 end list
present on its first frame and a bigger @WithGbemi call to action. The critic's "checklist is ~40 px" note was wrong (62 px).

**Verification (exports, 2026-10-02):** 14 files, durations match the edit, all −14.0 LUFS integrated (m04 −14.1), true peak
−1.9 to −2.1 dBTP, no black frames (blackdetect), .srt for each. Each export was re-transcribed with whisper and compared with
the kept words (`tools/verify.py`); the differences are whisper re-hearing names and soft starts. The trimmed starts were checked
by ear-proxy (transcribing the source from the cut point): m03 now starts on "a drawback that TechCabal raised", m04 on "data
minimization", m05 on "Technology is not neutral" (a first pass clipped "tech-" and "da-": fixed). Word timings for those first
words were hand-corrected in `tools/rawwords.py` (DTW ran ~0.3 s late there).

### Blink restyle (2026-10-02)
A new fresh critic (same brief, plus the style study and the approved Blink frames).

**Round 1:** m01 6.5 · m02 6.5 · m03 5.5 · m04 6 · m05 7 · m06 7 · m07 6.5. Main problems and what changed: split panels half
empty and small (bigger type, characters and tables in 9:16; real captures 1000 px wide); characters and labels in the right
rail or past the margins (peeking characters now stay inside x <= 920); 16:9 headlines running under her footage (fitted to the
panel); the caption pill sat on her mouth while a panel slid in, and a stray "it." chunk (captions now step aside during the
slide; a lone short chunk joins the previous one); characters acting as props (eye events on her keywords: squints, blinks,
looking away, a synchronized blink); honesty: the m03 hook put her point next to "TechCabal" (removed), the m05 hook dropped
"still… especially for women" (restored), the m06 notification showed as fact what she asks (now only a faded "what it could
look like" in 16:9), missing ILLUSTRATION marks on the m04/m05 tables (added). Privacy rule: no violations.

**Round 2:** m01 7.5 · m02 7.5 · m03 7 · m04 7 · m05 7.5 · m06 7.5 · m07 7. Fixed after: overlaps and margin breaks (m05 plate
under a peek, m06 line through its label, m03 faces on the credit, m02 records touching "It blew my mind", m04 "Active marriage"
clipped, labels left of x 80), the missing 9:16 divorce beat in m03, the m04 access panel sitting at 25 % for 2.5 s, small type
(NIN tag, "you see what happens to it", mono lines). Also the coordinator's floors, applied to every clip: 9:16 headlines
>= 72 px, 16:9 card headlines >= 84 px and 16:9 panel headlines up to 72 px wherever no new line wrap appears; real captures
>= 60 % of the frame width at the highlight (the 16:9 TechCabal beats became full white cards with the capture 1200 px wide);
bigger hero characters. The film's kit gained a global scale-up (`BSCALE`, on by default); the clips switch it off in
`common.js` and size every element themselves, because the scale-up broke their tuned layouts.

**Round 3 (final):** m01 8 · m02 8 · m03 7.5 · m04 8 · m05 7.5 · m06 7.5 · m07 7.5. Privacy and honesty clean. Fixed after round 3,
not re-scored (each was one or two position or timing fixes the critic said would take the clip to 8): m05 holds "is still pretty
stigmatised." 1.3 s longer before "tricky" (it was readable for only 0.5 s), the green peek and the privacy table's unlabelled
column; m06 Ghana + Nigeria flags no longer hidden behind the document; m07 peeks now pop in place inside x <= 935 (no slide
through the right rail; all clips) and the end characters sit 40 px lower; m03 search arc 50 px lower (clear of the credit);
m01 "all the way back" stack 50 px left, the licensed panel held longer; m02 margins and a tighter record stagger; m04
ILLUSTRATION marks moved clear of the headlines. Burned captions now appear together with their first word (an empty label could
show for a few frames before it). m07's end split keeps its burned captions (the bubbles summarise, they are not her exact
words).

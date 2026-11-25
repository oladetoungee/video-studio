# Instagram carousel: notes

10 slides, 1080×1350 (4:5). PNGs and `overview.png` are in `outputs/carousels/instagram/`.

## Edit and re-render
0. **In the browser:** http://localhost:7700/design/ghana-marrify/carousels/instagram/ (studio): edit text in place, move, colours, photos, live checks, export. It writes `content.json` and runs `build.mjs`.
1. Or change text in `content.json`. Markup: `*word*` = accent colour, `_word_` = serif italic, `\n` = line break. Display lines shrink to fit.
2. Run `node shared/build.mjs instagram` from `design/carousels/`. It rewrites `index.html`, the PNGs and `overview.png`, and prints warnings (text into the footer or margins, mono labels under 32 px, polaroids within 24 px of text, one-word last lines).
3. **Before posting:** make slide 10's `video` match the real YouTube title (set to kit title option 1 for now).

## Slides (v4, 2026-10-01, after 4 rounds of cold critique)
Written for a stranger who has never seen the video. Nothing before slide 10 needs it. Accents (`BRIEF.md`): blue = the system, orange = the human cost, green = the good part / transparency; one per slide (a slide's own `accent` overrides the deck's blue).

| # | Ground | Copy |
|---|---|---|
| 01 | ink | "Anyone in Ghana can look up your marriage." Marriages and divorces are now searchable on a new public app, Marrify. Who should be able to see them? Her photo (5:05, mouth closed, not flipped) |
| 02 | paper | Second cover. Corner "// Marrify, Ghana's new app". "Type a name, see their marriage record." Records from: Registrar-General, the courts, local assemblies, Ghana Gazette, wired into one line down to a search box (ILLUSTRATION). Divorce records too, some reportedly going back to 1886 |
| 03 | paper, orange | "Is a divorce really public?" A business: its yearly revenue; in Estonia anyone can check it, a business answers to the public: fine. A person: their divorce, in Ghana now searchable by name: different? I like open data; I just don't know yet how that works with personal records |
| 04 | ink | "Public in theory. Now one search away." Before: a divorce file in a courthouse; now: on a stranger's phone, in seconds (effort bars, ILLUSTRATION). Did the people in these records ever agree to that kind of reach? |
| 05 | paper | "What if the app only answered what was asked?" A proposal (ILLUSTRATION): "Is this person free to marry?" then "No. Active marriage on record."; left out: spouse's name, dates, history, which court. Data minimisation |
| 06 | paper | "Not everyone needs the same view." Table: an individual sees status only (rest redacted), certain organisations see more (ILLUSTRATION: one possible split). Who decides which organisations get the fuller view? |
| 07 | orange | "Same record. Different weight." Estonia: a divorce record can be just admin. Many African contexts: stigma, especially for women. Her quote, credited "— Gbemi, @WithGbemi" |
| 08 | ink, green | "If someone looks you up, do you get to see that?" An "Imagined access log" (ILLUSTRATION, 3 rows). In Estonia, I can see what happens to my data in the system. Could Ghana do that too? |
| 09 | green | Corner "// my first thought, as an African". "Centralised data. Finally." Nigeria: pieces of paper everywhere. Estonia: a link for everything, even marriage and divorce. One reliable record solves so many problems |
| 10 | blue | "I want Africa building this." And questioning it while we do. "Send this to someone in Ghana." Full video (title still a placeholder: kit option 1, the `video` field) + @WithGbemi + her photo (4:07) |

Order (main session's decision, 2026-10-01): concerns first, her hope (09) second-last, her stance last. Ask Gbemi if she prefers the hope slide third.
Slide 10 stays close to her words ("I really want African countries building this kind of infrastructure… we still need to probe it and question it"); "built right" was rejected as a verdict she didn't give.

## Truth check
- Her words (checked in `kit/transcripts/transcript.srt`): "centralised data, finally" (0:39), marry/divorce online, health records, "pieces of paper everywhere" (1:00-1:30), business lookup + public entity/money/accountability (1:55), 2003 courthouse vs phone in three seconds (2:30), data minimisation definition (2:47), access levels individual vs organisations (3:30), "technology is not neutral" (3:43), Estonia admin vs stigma especially for women (4:00), "transparency runs both ways", "if someone looks up my marriage record" (4:25), "probe it and question it" (5:00).
- Verified facts, not her words: launch August 2026, the four sources, divorce records **reportedly** back to 1886, the platform's own "still adding records, no result is not proof" warning (`BRIEF.md`).
- Every mockup is generic and tagged ILLUSTRATION. No Marrify logo or interface. The log entries on slide 8 are invented for the illustration and labelled 'Proposal: access log' + ILLUSTRATION.

## Suggested caption (kit section 9 caption as the base, expanded so the post stands alone)

> Ghana just launched Marrify, a public platform to search and verify marriages, divorces and licensed marriage officers. It pulls from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette, and divorce records reportedly go back to 1886.
>
> As an African, my first thought was: centralised data, finally. I've lived in Estonia for about a year, where you can marry and divorce online and everything syncs. So part of me really wants this.
>
> But marriage and divorce records are sensitive. What I keep thinking about:
> 1. A divorce file sitting in a courthouse is public in theory. On an app, a stranger can find it in three seconds.
> 2. "Is this person free to marry?" is a yes or no. It doesn't need the whole history.
> 3. Not everyone needs the same level of access.
> 4. In Estonia a divorce record is admin. In many African contexts, especially for women, it carries stigma.
> 5. If someone looks up my record, do I get to see that?
>
> I want this built. I also want us to keep asking these questions.
>
> Full video on my YouTube, link in bio. Ghanaians, I especially want your take. ← not said on camera, caption only (from her kit)
>
> #ghana #marrify #africa #dataprivacy #privacy #hci #uxdesign #estonia #digitalgovernment #tech

(Keywords in the first line matter more than hashtags for Instagram search. "Ghanaians, I especially want your take" is from her kit caption; she doesn't say it in the video, which is fine for a caption she posts herself.)

Alt text (slide 1): "Black slide with large text: Anyone in Ghana can look up your marriage. Marriages and divorces are now searchable on a new public app, Marrify. Who should be able to see them? A photo of Gbemi talking to camera."

## Critique (fresh cold critic each round, PNGs only, default reject, 8/10 bar)
- Round 1 (v1): **6/10**. Hook had no stakes; double negatives; redaction bars read backwards; too many corner labels; triads.
- Round 2 (v2): **6/10**. Mockups needed "proposal" framing; label wraps from wide mono tracking; aphorism closers; "Here" pointing at the wrong country.
- Round 3 (v3): **6.5/10**. Three proposal mockups in a row; quotes uncredited; slide 10 "this" unclear; dead middles on 1, 4, 8.
- Round 4 (v4): **7/10**. Hook "clear in about a second". Open: slides 5 and 6 feel like the same point (merge or cut 6?); "Public in theory. Now one search away." / "Same record. Different weight." share an "X. Y." headline shape; slide 9 quote could carry "— Gbemi" too; footer clearance varies 40-120 px. After round 4 I swapped slide 1's photo for a mouth-closed frame, relabelled the slide 8 mockup "Imagined access log", cut slide 10's repeated body, and moved slide 2's ILLUSTRATION tag under the search bar. Not re-scored.
- Refused (would invent facts): naming which organisations; naming Estonia's data-access tool; dropping "reportedly" on 1886; removing the progress meter (house style).
- Slop pass (no-ai-slop, detect): fixed the caption's vague contrast; slide fragments kept as her voice.
- **Still below the 8/10 bar.** Next step is her eye: the critics now argue about structure (slide order, merging 5 and 6), which is her call.

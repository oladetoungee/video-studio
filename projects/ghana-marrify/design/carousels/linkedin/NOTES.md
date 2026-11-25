# LinkedIn carousel: notes

9 pages, 1080×1350, posted as a PDF document. `carousel.pdf` (live text), the page PNGs and `overview.png` are in `outputs/carousels/linkedin/`.

## Edit and re-render
0. **In the browser:** http://localhost:7700/design/ghana-marrify/carousels/linkedin/ (studio): edit text in place, move, colours, photos, live checks, export (slide, all, or the PDF).
1. Or change `content.json`, then run `node shared/build.mjs linkedin` from `design/carousels/` (PNGs, `carousel.pdf`, `overview.png`, checks).
2. **Document title for the upload** (LinkedIn requires one and shows it on the post): *4 design questions before you make personal records searchable* (`docTitle` in `content.json`).
3. **Before posting:** make page 9's `video` match the real YouTube title (set to kit title option 1 for now).

## Pages (v4, 2026-10-01)
A professional framework: four privacy-by-design questions for any public records platform, with Ghana's Marrify as the case. Nothing depends on the video, which is an optional extra on page 9.

| # | Ground | Takeaway |
|---|---|---|
| 01 | blue | "Ghana made marriages searchable by name." 4 design questions it raises for any public registry, from an HCI researcher living in Estonia. Her photo (5:05) |
| 02 | paper | What is Marrify? 01 launched August 2026 · 02 four official sources · 03 records back to 1886 (divorce records, as reported by Ghanamma) · 04 search isn't proof. Via Graphic Online, GhanaWeb, Ghanamma |
| 03 | ink | "Public record. Now one search away." Paper record vs public search (who can find it, how fast). "Same record. Far more people can reach it." + mono "Design questions, not a review" |
| 04 | paper | 01 of 4: "Answer yes or no, not the whole history." Proposal mockup (ILLUSTRATION). Data minimisation |
| 05 | paper | 02 of 4: "Who sees how much?" Access table (ILLUSTRATION: a proposal). Decide which organisations get the fuller view, and why, before anyone searches |
| 06 | orange | 03 of 4: "Does a record mean the same thing everywhere?" Estonia vs many African contexts. Her quote, credited "— Gbemi, @WithGbemi" |
| 07 | ink, green | 04 of 4: "Can people see who looked them up?" "Imagined access log" (ILLUSTRATION). In Estonia I can see what happens to my data |
| 08 | card | The checklist (save page): smallest answer, access levels, what it means locally, show people who looked, each with a concrete example |
| 09 | blue | "Which question would you add?" She wants more African countries building infrastructure like this, and questioning it while we do. Video (title placeholder, `video` field) + @WithGbemi + her photo (5:11) |

## Choices
- **Not a resized Instagram post.** Its own cover (a framework promise), a facts page with sources, the "technically public vs one search away" comparison table as the frame, numbered question pages, a checklist, and a comment question at the end.
- **Her stance survives:** the end page leads with "Build it". The good side (Estonia, centralised data) is carried by the cover line and page 9; the Instagram deck has the full "Centralised data. Finally." slide. A first-round critic found a bio page slowed the deck, so it was cut here.
- **Truth:** her words are checked in `kit/transcripts/transcript.srt` (see the Instagram notes for times). The facts on page 2 are from `BRIEF.md` (verified sources). Mockups are generic and labelled; times in the page-7 log are invented for the illustration; page 5 is labelled as a proposal.
- **Not used (would be inventing):** naming which organisations get more access, and naming Estonia's data-access tool. Both critics asked for them. If she wants, she can name the tool she actually uses (e.g. the Data Tracker on eesti.ee, if that is what she means) and we add it.

## Suggested post text (kit section 6 as the base, corrected: nothing presented as hers that she didn't say)

> Ghana has launched Marrify, a public platform to search and verify marriages, divorces and licensed marriage officers. It brings together records from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette. Divorce records reportedly go back to 1886.
>
> My first reaction, as an African: centralised data, finally.
>
> I've lived in Estonia for about a year. Almost everything here is online, from health records to marriage and divorce, and it all syncs. Coming from Nigeria, that blew my mind. So when an African country builds in this direction, I want more of it.
>
> My second reaction came from TechCabal's coverage: marriage and divorce records are sensitive personal information. I study how people use technology, and I keep coming back to four design questions that apply to any public records platform:
>
> 1. What is the smallest answer? "Is this person free to marry?" is a yes or no. It doesn't need the spouse's name, the dates or which court granted a divorce.
> 2. Who sees how much? An individual could see one level, certain organisations more.
> 3. What does this record mean here? In Estonia a divorce record can be purely administrative. In many African contexts divorce still carries stigma, especially for women.
> 4. Can people see who looked them up? In Estonia, your data being in the system is paired with you seeing what happens to it.
>
> All four come from one gap. A divorce file sitting in a courthouse is public in theory. On a public search, a stranger with your name can find it on their phone in three seconds.
>
> The platform itself says records are still being added, so an empty search doesn't prove someone is unmarried.
>
> I want African countries building this kind of infrastructure. I also think we should keep probing it while we build.
>
> I talk it through in my latest YouTube video: [link]. If you work on govtech, data protection or digital public infrastructure, especially in Ghana: which question would you add?
>
> #privacybydesign #digitalpublicinfrastructure #govtech #dataprotection #hci

What changed from the kit's LinkedIn caption: removed the "no record found will be read as proof / nobody reads disclaimers" argument as her view (she doesn't make it in the video; the platform's own warning stays as a plain fact), removed "people who discover too late that a marriage... was never legally available" (not in the video), "most digital country in Europe" kept out (she says "digital hub of Europe or something like that"), and the close is her own "build it, keep probing it". Hashtags swapped toward the professional audience.

## Critique (fresh cold critic each round, PNGs only, default reject, 8/10 bar)
- Round 1 (v1, 10 pages): **6/10**. First question only on page 5; a bio page stalled the deck; key on the access table backwards.
- Round 2 (v2, 9 pages): **6.5/10**. Ending read as a thesis flip; "critique or proposal?" unclear; page 3 headline a puzzle.
- Round 3 (v3): **6.5/10**. Cover buried the Ghana news; 4-line hedge on page 3; quote uncredited; terminology drift.
- Round 4 (v4): **7/10**. P2 7.5, P7 7.5, P8 7.5 (the save page). Open: page 4 is an instruction while 2-4 are questions (try "Should it just say yes or no?"); the "Shown" blue repeats; illustration-label placement differs on page 5. After round 4 I replaced page 3's filler line, changed "An African context" to "Many African contexts", relabelled page 7 "Imagined access log", dropped "e.g." from the checklist, and fixed the page 9 Q/Y collision and polaroid margin. Not re-scored.
- Refused (would invent facts): naming organisations; naming Estonia's tool.
- Slop pass: rewrote the post's colon-reveal and "worth knowing" lines.
- **Still below the 8/10 bar.** Her review is the next step.

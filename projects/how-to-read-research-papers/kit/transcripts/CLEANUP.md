# Cleanup cut list: How to read research papers

Source: `kit/raw-video.mov` (596.61 s = 9:56.61). Times are in the original recording, to 0.01 s. Every cut point sits in silence measured on the waveform (`voice16k.wav`, 10 ms frames, silence = below -55 dB), not on whisper times. Nothing has been cut yet: this is the list to apply.

**Before: 9:56.61 (596.61 s). After all cuts: 9:27.94 (567.94 s).** Removed 28.67 s in 5 cuts (3 retakes/stumbles, 0 pause trims, 2 start/end trims).

20 s of silence/setup before her first word, then a fairly clean take: one name repeated, one retake, one more retake, and no pause over 1.2 s once she starts talking.

Words around each cut: the part in **[brackets]** is removed.


## 1. Start and end

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 0:00.00 (0.00) | 0:19.85 (19.85) | 19.85 s | ... **[]** Research papers are not written to be... | 20 s of silence and small setup sounds; no speech (checked with whisper: "no speech detected") |
| 2 | 9:55.36 (595.36) | 9:56.61 (596.61) | 1.25 s | ...things wrong sometimes. But yeah, that's it. **[]** ... | after her last word |

## 2. Retakes and stumbles

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 2:12.92 (132.92) | 2:15.50 (135.50) | 2.58 s | ...How to Read a Paper." It was written by S. Keshav. **[In]** his word, you should read the paper... | She says the author's name twice ("S. Keshav. ⟨pause⟩ S. Keshav."), probably checking the pronunciation. This keeps the first; if the second sounds better, cut 130.20 to 132.92 instead. |
| 2 | 3:36.52 (216.52) | 3:38.97 (218.97) | 2.45 s | ...other papers is this paper related to? **[Number three, correctness. No.]** Number three, correctness is whether the assumptions... | "Number three, correctness." then again "Number three, correctness is whether the assumptions seem valid." Keeps the full second take. |
| 3 | 7:19.16 (439.16) | 7:21.70 (441.70) | 2.54 s | ...how people experience something. But traffic people **[can't tell you]** what percentage of all students do something.... | "12 people can't tell you the percentage of all," then "can't tell you what percentage of all students do something". Keeps the second. |

## 3. Long pauses inside speech

Pauses over 1.2 s, trimmed to about 0.4 s (0.2 s kept each side).

None found.


## 4. Needs her decision

- **6:14 "According to the person that this method, that wrote about this method"**: a stumble in continuous speech (no clean gap before "that this method"). Left in; a caption reading "According to Keshav" would cover it, or try cutting 375.66 to 376.92 by ear.
- **8:35-8:39 notes section opening** ("And coming back to the idea of whether printing out your research papers or not, how do you keep notes … How do you even read them?") is a little circular but fine.
- **Ending**: "…they are getting things wrong sometimes. But yeah, that's it." No sign-off and no call to action (the kit had "Tell me in the comments what paper you're reading right now, and which pass you're on").


## 5. Recording vs her written kit

**Skipped from the kit:**
- The opening promise "…go over how to tell if a paper is any good, and how to keep notes so you don't lose what you read".
- "For example, for a paper that my thesis is built on, I would need to go through this third pass." (she says it more generally: "the ones that, for example, your thesis is built on").
- CHI by name ("every paper published **at CHI** in 2014"): see facts.
- Andreas Lundh by name for the Cochrane review (on-screen only in the kit).
- Closing call to action (comments: which paper, which pass).

**Added:** "This is something that I do now … print it out so you can mark it up"; "I have started to print them out … a few papers that are really, really major for me"; "I would say to a student … be on the higher side, just project like three, four, five hours"; "Also you can use AI to explain dense paragraphs. I do this a lot. Just check what it tells you against the paper itself."

**Facts to check:**
- 7:01 **"Kelly Caine looked at every paper published in 2014 and found the most common sample size was 12"**: she dropped "at CHI". Without it the claim sounds like *every paper in 2014*. Needs the on-screen card (CHI 2014 papers; Caine, CHI 2016) or a caption.
- 6:14 third pass: she says "about three, four, five hours for beginners and about an hour for an experienced reader"; Keshav's paper says about four or five hours for beginners. Minor.
- 8:10 Cochrane review 2017 (industry-sponsored studies more likely to report favourable results) ✓ kit.
- 9:06 Zotero "I think it is free and open source" ✓ (it is).
- 2:04 Keshav's "How to Read a Paper" is two pages ✓; pass one 5-10 minutes ✓; pass two up to an hour ✓.


## Machine-readable list (seconds, original timeline)

```
0.00	19.85	Dead air / setup at the start
132.92	135.50	Repeat (her call)
216.52	218.97	Retake
439.16	441.70	Retake
595.36	596.61	Dead air / setup at the end
```

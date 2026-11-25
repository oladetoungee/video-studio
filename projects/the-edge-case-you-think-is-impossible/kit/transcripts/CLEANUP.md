# Cleanup cut list: The edge case you think is impossible

Source: `kit/raw-video.mov` (503.34 s = 8:23.34). Times are in the original recording, to 0.01 s. Every cut point sits in silence measured on the waveform (`voice16k.wav`, 10 ms frames, silence = below -58 dB), not on whisper times. Nothing has been cut yet: this is the list to apply.

**Before: 8:23.34 (503.34 s). After all cuts: 7:47.40 (467.40 s).** Removed 35.94 s in 7 cuts (6 retakes/stumbles, 0 pause trims, 1 start/end trims).

Four retakes (two of them "scratch that"), one stumble, and one 3.9 s gap before the Jennifer Null story. The file starts on her first word and ends 1.2 s after the last.

Words around each cut: the part in **[brackets]** is removed.


## 1. Start and end

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 8:15.03 (495.03) | 8:23.34 (503.34) | 8.31 s | ...be able to catch all of them. **[]** ... | after her last word |

## 2. Retakes and stumbles

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 0:00.00 (0.00) | 0:02.18 (2.18) | 2.18 s | ... **[If you're a developer-- start that.]** If you're a software developer, I want... | "If you're a developer, like that," then the real start "if you're a software developer, I want you to think of the craziest edge cases in the world". The video opens on the second take. |
| 2 | 2:14.64 (134.64) | 2:21.08 (141.08) | 6.44 s | ...they would happen one after the other. **[There was this researcher called Edgar that found one of these race conditions in Starbucks, scratch that data.]** was this researcher called Edgar that found... | "There was this researcher called Egor that found one of these race conditions in Starbucks, scratch that." Keeps the repeat of the same sentence that ends "…in Starbucks gift cards." |
| 3 | 3:49.26 (229.26) | 3:52.72 (232.72) | 3.46 s | ...wrote about a woman called Jennifer Null. ⟨pause⟩  When Jennifer Null tries to buy a... | 3.9 s gap (two silences of 2.0 s and 1.7 s with a tiny sound between) after "…the BBC wrote about a woman called Jennifer Null." Trimmed to about 0.4 s. (If she wants a dramatic beat before "When Jennifer Null tries to buy a plane ticket", keep 0.8 s instead: cut to 232.32.) |
| 4 | 4:28.02 (268.02) | 4:35.77 (275.77) | 7.75 s | ...over $12,000 in fine that were not his tickets. **[There were tickets where no plate number had been recorded. And in the system that process in this, it's like that.]** There were tickets where no plate number... | "There were tickets where no plate number had been recorded. And in the system, that process in this, it's like that." Keeps the clean second take: "There were tickets where no plate number had been recorded. And in the system that processes the tickets, those were now linked to a plate called NULL." |
| 5 | 5:18.78 (318.78) | 5:25.25 (325.25) | 6.47 s | ...and just adding one to the year. **[So on the 29th of February, 2019, that logic gave 29th of February, 2013. Sorry, scratch that.]** So on the 29th of February, 2012,... | "So on the 29th of February, 2019, that logic gave the 29th of February, 2013. Sorry, scratch that." Keeps the corrected take with 2012. |
| 6 | 7:15.35 (435.35) | 7:16.68 (436.68) | 1.33 s | ...contract. All observable behaviors of your system **[will be adopted on,]** will be depended on by someone. Well,... | "will be adopted on, will be depended on by someone": keeps "…all observable behaviors of your system will be depended on by someone" (the real Hyrum's law wording). |
| 7 | 1:47.72 (107.72) | 1:49.45 (109.45) | 1.73 s | ...is using an idempotency key. **[Idempotence-- like that.]** Basically, an idempotency key... | Added 2026-11-07 after her review ("it was supposed to be cut"): her retake of the word. Both cut points sit in silence (-72 dB at 107.72, -80 dB at 109.45). Also in sh01. |
| 8 | 7:18.55 (438.55) | 7:19.45 (439.45) | 0.90 s | ...depended on by someone. **[Well, let me go.]** So let's say... | kit Q5, cut in the full edit. |

## 3. Long pauses inside speech

Pauses over 1.2 s, trimmed to about 0.4 s (0.2 s kept each side).

None found.


## 4. Needs her decision

- **4:58 wrong year that a cut can't fix**: "On the 29th of February, **2019**, Microsoft's cloud, Windows Azure, had an outage" (it was **2012**; she corrects it in the retake later, but this first mention stays). Options: an on-screen date "29 Feb 2012" over it, or re-record the line.
- **4:46 "Another one that is common, another thing that can cause very interesting edge cases situation in production, is leap years"**: a restart in continuous speech, no clean gap; left in.
- **4:13 "There was another story, also, that the Chrome friends(?)…"**: the kit says "told at a conference called DEF CON in 2019, … Joseph Tartaro". Listen to what she says here; the on-screen card should name DEF CON 27 / Joseph Tartaro.
- 0:22-0:30 "You don't even have to have a lot of users for edge cases that you didn't ⟨1 s⟩ write for to exist" is a little loose but fine.


## 5. Recording vs her written kit

**Skipped from the kit:**
- "Egor Homakov" (she says only "Egor"), "He reported it, and Starbucks fixed it."
- "In 2016" for the BBC story is said (whisper: "In training system"), but not the article name (on-screen only).
- The DEF CON / Joseph Tartaro naming (see decisions).
- Hyrum Wright "who noticed it when he was a software engineer at Google".
- The daylight-saving tip "schedule in UTC, which never changes its clocks" (on-screen in the kit; not said).
- The Unicode fix wording: she says "count with a function that counts characters and normalize the text before it saves" (kit had mb_strlen / grapheme_strlen / Normalizer on screen).

**Added:** the cold open is hers ("I promise you with everything that I have … someone is going to report an issue and it's going to be exactly that edge case"); "Real users don't just always fill the form and click the button and wait"; closing "You can't protect your app from every single possible edge case … if you wait till you predict every single one, you probably wouldn't ship anything".

**Facts to check:**
- 4:58 Azure leap-day outage year: **2012**, not 2019 (see decisions).
- 2:28 Starbucks: "gift cards worth $15 in total … ended up with $20" ✓ kit (Egor Homakov, 2015).
- 4:20 NULL licence plate: "over $12,000 in fines" ✓ (Tartaro, DEF CON 2019).
- 5:48 Tallinn clock changes: 29 March 2026 (3 a.m. → 4 a.m.) and 25 October 2026 (4 a.m. → 3 a.m.) ✓ kit.
- 6:31 Adebayo: "seven letters … 13 bytes" ✓ kit (strlen 13).


## Machine-readable list (seconds, original timeline)

```
0.00	2.18	Restart at the start
134.64	141.08	Retake ("scratch that")
229.26	232.72	Long pause
268.02	275.77	Retake
318.78	325.25	Retake ("scratch that")
435.35	436.68	Stumble
495.03	503.34	Dead air / setup at the end
```


## Caption fixes (2026-11-07, her review)
- 0:16 "everything that I **owe**" (whisper: "hope").
- 6:12 "a daily sales report at 3:30, **Tallinn** time" (whisper dropped "Tallinn").
Both in `talking-head/tools/words.py` FIX.


## 2026-11-11 fix (her review: "scratch that" at about 4:37 in the full edit)
- Cut 297.80-301.76: her first take "On the 29th of February, 2027... like that."
- Cut 303.03-303.83 (exact): the wrong year "2019" in the retake, so the line is "On the 29th of February, Microsoft's cloud, Windows Azure, had an outage" (the year 2012 comes two lines later, right).
- Removed the 4.5 s "Correction: ... 2012, not 2019" card (pause fix-azure); no longer needed. Same cuts in sh07.

# Cleanup cut list: HTTP status codes

Source: `kit/raw-video.mov` (528.42 s = 8:48.42). Times are in the original recording, to 0.01 s. Every cut point sits in silence measured on the waveform (`voice16k.wav`, 10 ms frames, silence = below -51 dB), not on whisper times. Nothing has been cut yet: this is the list to apply.

**Before: 8:48.42 (528.42 s). After all cuts: 8:33.51 (513.51 s).** Removed 14.91 s in 5 cuts (4 retakes/stumbles, 0 pause trims, 1 start/end trims).

The file starts on her first word (0.08 s) and ends right after "Bye.", and she never pauses longer than 1.2 s, so the cuts are her retakes: two "scratch that" moments and two small slips.

Words around each cut: the part in **[brackets]** is removed.


## 1. Start and end

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 8:47.30 (527.30) | 8:48.42 (528.42) | 1.12 s | ...for the fun of it. 418, I'm a teapot. Bye. **[]** ... | after her last word |

## 2. Retakes and stumbles

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 0:14.95 (14.95) | 0:17.45 (17.45) | 2.50 s | ...case here, 200 is the status code. **[Okay is the reason, reason phase, scratch that.]** Okay is the reason phase. The job... | "OK is the reason phase. Scratch that." Keeps "OK is the reason phrase." |
| 2 | 0:47.50 (47.50) | 0:49.63 (49.63) | 2.13 s | ...let me check. Two XX means success. **[Hey, I've got your back. Yeah, it is.]** I've got your book, right? Yeah, it... | "Hey, I've got your back. Yeah, it is." (back for book), then "I've got your book, right? Yeah, it is." Keeps the second. The end point is inside fast speech (no silence there): listen and move by a few frames if a syllable is clipped. |
| 3 | 3:05.00 (185.00) | 3:12.92 (192.92) | 7.92 s | ...the browser is allowed to switch from POST to GET. **[So for normal web pages, 301 or 302 are fine. You're redirecting an API where post 301 and 302 are fine. Scratch that.]** So for normal web pages, 301 and... | First take of the 301/302 line goes wrong ("…an API where post 301 and 302 are fine. Scratch that."). Keeps the second, correct take: "So for normal web pages, 301 and 302 are fine. If you're redirecting an API where POST requests matter, I would use 307 and 308." |
| 4 | 7:03.22 (423.22) | 7:04.46 (424.46) | 1.24 s | ...the moment, and that situation is temporary. **[It might be overlooked.]** It might be that the server is... | "It might be overlooked." then "It might be that the server is overloaded". Keeps the second. |

## 3. Long pauses inside speech

Pauses over 1.2 s, trimmed to about 0.4 s (0.2 s kept each side).

None found.


## 4. Needs her decision

- **4:55 "Now, 401 versus 403. 401 versus 403 are two status codes that people mix up"**: the repeat works as a section title; cut 295.17 to 297.00 only if she wants it tighter (not counted).
- **5:06 "Case one, now let's look at two scenarios. Case one, a request…"**: the first "Case one," is a slip but sits in continuous speech with no clean gap; left in. A caption/insert can cover it.
- **8:10 "The first one is leaking stack traces"**: it's the **fourth** mistake (kit: "The fourth one"). Can't be fixed by cutting; a number on screen saying 4 will cover it, or re-record the line.
- 2:43 she says "that's a 302 or 307"(?) for temporary moves: whisper first heard "a 308, 307". Listen: if she says 308 there, it's wrong (308 is permanent).


## 5. Recording vs her written kit

**Skipped from the kit:** the line explaining 307/308 ("POST stays a POST, and the data you sent goes with it. With 301 and 302 … many browsers do. That's like walking into the other branch just to look around, and the form never gets handed in"); the spec wording for 401 ("a request that lacks valid authentication credentials"). Everything else is there in her own words, in the kit order.

**Added:** "So two different cases, right?"; the hotel keycard line is extended ("…it's for another room, and you're trying to enter another room"); "Your front end sees 200 and is like, OK, yeah, book saved"; "That can just set off an alarm for nothing"; ends on "418, I'm a teapot. Bye." with a laugh (the kit's RFC 2324 note is on-screen only).

**Facts to check:**
- 2:43 temporary redirect codes: must be 302 or 307 (see decisions).
- 8:10 "first" should be "fourth" mistake (see decisions).
- 4:16 "Google's docs say it treats 404 and 410 the same way": matches the kit. (Google's Search docs say both are treated similarly; 410 can be dropped slightly faster. Fine at this level.)
- 0:40 "1xx … 101 Switching Protocols when a connection upgrades to a WebSocket" ✓. 422 "Unprocessable Content" ✓ (RFC 9110 name). 429 "Too Many Requests … rate limited" ✓.
- 6:04 GitHub's API returning 404 for private repos you can't see ✓ (documented by GitHub).


## Machine-readable list (seconds, original timeline)

```
14.95	17.45	Retake ("scratch that")
47.50	49.63	Slip (listen)
185.00	192.92	Retake ("scratch that")
423.22	424.46	Slip
527.30	528.42	Dead air / setup at the end
```

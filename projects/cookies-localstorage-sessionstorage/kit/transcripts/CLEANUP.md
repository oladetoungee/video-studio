# Cleanup cut list: Cookies, localStorage and sessionStorage

Source: `kit/raw-video.mov` (321.04 s = 5:21.04). Times are in the original recording, to 0.01 s. Every cut point sits in silence measured on the waveform (`voice16k.wav`, 10 ms frames, silence = below -56 dB), not on whisper times. Nothing has been cut yet: this is the list to apply.

**Before: 5:21.04 (321.04 s). After all cuts: 5:19.64 (319.64 s).** Removed 1.40 s in 1 cuts (0 retakes/stumbles, 0 pause trims, 1 start/end trims).

A clean take: no retakes, no "scratch that", no pause over 1.2 s, and the file starts and ends on her voice (first word at 0.44 s; her voice ends at 5:19.25). The only cut is 1.4 s of room tone at the end. **The big issue is content, not cleanup: she did not record kit segments 7, 8 and 9** (see section 5).

Words around each cut: the part in **[brackets]** is removed.


## 1. Start and end

| # | Cut from | Cut to | Length | Words around the cut | Why |
|---|---|---|---|---|---|
| 1 | 5:19.64 (319.64) | 5:21.04 (321.04) | 1.40 s | ...half-filled checkout form is probably in sessionStorage. **[]** ... | after her last word |

## 2. Retakes and stumbles

None found.


## 3. Long pauses inside speech

Pauses over 1.2 s, trimmed to about 0.4 s (0.2 s kept each side).

None found.


## 4. Needs her decision

- **Missing segments 7-9** (cookie security flags: HttpOnly, Secure, SameSite Strict/Lax/None; where to store your login token; cookies and sessions in Laravel). About 575 words of the kit, probably 4-5 minutes. Did she record them in another file, or is this the whole video now? The recording jumps from "…unless the server explicitly marks them HttpOnly" (4:39) straight to the summary.
- **The cold open** ("You are halfway through a checkout form … your cart is still there, and you're still logged in…") was also not recorded; the video starts on "Cookies, localStorage, sessionStorage. Before cookies and localStorage…". A motion cold open over the first line could stand in for it.
- **Ending**: it ends on "…the half-filled checkout form is probably in sessionStorage." with no sign-off; fine for a cut, but there's no closing line.
- Unclear words: 1:02 "you see things like a set cookie(?), a necessary cookie" (probably "accept cookies, necessary cookies"); 3:51 "like a half-filled form or search field tab as someone's peaks(?)".


## 5. Recording vs her written kit

**Skipped from the kit:**
- Segment 1 cold open (checkout form / cart / still logged in) and "by the end of this video, you will know where to keep what".
- Cookies: "Chrome, for example, won't keep any cookie for more than 400 days after it's set".
- localStorage: "the http and https versions of your site get their own localStorage"; "Safari can delete it after seven days of you using Safari without interacting with the site".
- **Segments 7, 8, 9 in full** (security flags, login token storage, Laravel).
- Summary is shortened: no "where to keep what" rule list at the end.

**Changed:** the cloakroom example became "We have something similar in my school" (kit: "We live in the Baltics, and there's usually a cloakroom at an event").

**Added:** "If you use a website, you see things like accept cookies, necessary cookies, and all of that"; "You obviously don't want to keep very important things in sessionStorage".

**Facts to check:** none wrong in what she said. 4 KB per cookie, about 5 MB per origin for localStorage, "session cookies can come back when the browser restores tabs", origin = protocol + domain + port: all correct.


## Machine-readable list (seconds, original timeline)

```
319.64	321.04	Dead air / setup at the end
```

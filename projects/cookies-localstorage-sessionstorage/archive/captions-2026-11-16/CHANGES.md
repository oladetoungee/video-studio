# Captions and posts rewrite, 2026-11-16 (cookies-localstorage-sessionstorage)

Brief: `projects/CAPTIONS-BRIEF-2026-11-16.md`. Old kit, unchanged: `refined-kit-before.md` (this folder).
No draft of hers existed for these posts (her original kit's captions were our earlier drafts too), so every block was rewritten from her recording's own phrases ("We have something similar in my school", "they don't remember your face because I mean there's a lot of people", "A cookie kind of works like that ticket", "I say meant to", "Another big difference between all three of them is who gets to read them", "You obviously don't want to keep very important things in sessionStorage", "So in our online shop..."). Facts, hashtags, titles, tags, links and notes are unchanged.

## Blocks rewritten
| Section | Blocks |
|---|---|
| 1b YouTube description (opening above CHAPTERS) | 1 |
| 3 Shorts (SH1-SH9 x YouTube Shorts description, TikTok, Instagram Reels, LinkedIn, X) | 45 |
| 4 Teaser posts (LinkedIn, X) | 2 |
| 6a LinkedIn post | 1 |
| 6b X thread (7 tweets) | 1 |
| 6c Community post | 1 |
| 6d More X posts (image post text, tips post, two standalone posts) | 4 |
| 6e Comments and ready replies | 9 |
| **Total** | **64** |

Em-dashes in the edited sections: 0 (also 0 in the whole file). No "Link in the comments", no "In this video I...". All X posts and thread tweets are 280 characters or less (checked by code; the tips post was cut from 304 to 277).

## Before / after (the most changed)

**1b, first paragraph**
- Before: "localStorage vs sessionStorage vs cookies is a question every web developer runs into. They are the three places ... In this video I explain each one with an online shop, how long each one lasts, and who can read them."
- After: "Cookies, localStorage and sessionStorage are the three places a website can keep things in your browser, and they behave very differently. I made this video to explain each one with an online shop, how long each one lasts and who can read them." (and the cloakroom paragraph now uses her own lines)

**3, SH8 X**
- Before: "cookies: small, sent to the server with every matching request, readable by js unless HttpOnly. / localStorage: bigger, stays in the browser until cleared, any script can read it. / sessionStorage: same, but gone when the tab closes." (a colon list)
- After: "cookies go to the server with every matching request. localStorage and sessionStorage stay in the browser, and sessionStorage is the one that's gone when you close the tab"

**3, SH1 LinkedIn**
- Before: "Websites need cookies because the server doesn't remember you between requests. / HTTP is stateless. Every request ... Logging in is one request. Clicking on My Orders is a brand new one."
- After: "Websites need cookies because HTTP is stateless, and I think that's the best place to start if you want cookies to make sense. ... In my video I explained it with the cloakroom we have in my school. ... A cookie kind of works like that ticket, right?"

**3, SH6 X**
- Before: "sessionStorage belongs to one tab. refresh: still there. close the tab: gone. open the site in a new tab: that tab gets its own. that's why your half-filled checkout form vanished"
- After: "sessionStorage belongs to one tab, so a refresh keeps it and closing the tab clears it. that's why your half-filled checkout form was gone when you came back"

**4, teaser X**
- Before: "cookies, localStorage and sessionStorage, the three places a website keeps things in your browser, and who can actually read them. full video on youtube: [LINK]"
- After: "made a video on cookies, localStorage and sessionStorage, the three places a website keeps things in your browser (and who can actually read them). full video on youtube - [LINK]"

**6a LinkedIn**
- Before: "Your login, your cart and a half-filled checkout form are kept in three different places in your browser. Those three places are cookies, localStorage and sessionStorage. / It all starts with HTTP being stateless. ..."
- After: "Cookies, localStorage and sessionStorage are the three places a website can keep things in your browser, and I made a video explaining all three with an online shop. / Before any of them can make sense, you need to know why a browser has to remember anything at all. ..." (her "(I mean, there's a lot of people)" aside kept, her "The other big difference between all three of them is who gets to read them" line used)

**6b X thread, tweet 7**
- Before: "so in an online shop: login = HttpOnly cookie, cart = localStorage, checkout form = sessionStorage. full video: [LINK]"
- After: "so in an online shop, the login is most likely an HttpOnly cookie, the cart is probably in localStorage, and the checkout form is probably in sessionStorage. full video on youtube - [LINK]"

**6d tips post**
- Before: "browser storage things I wish I'd learned earlier" + a numbered list of 5 (the "I wish" was a feeling she never said)
- After: one flowing post, "browser storage things that catch people out. localStorage only stores strings, so you JSON.stringify your objects. ..."

**6e Instagram comment**
- Before: "the one that surprised people most when I explained it is that a session cookie can come back..." (an invented reaction)
- After: "a session cookie is only meant to be deleted when you close the browser, because if your browser restores your tabs, it can come back with them 😅"

## Left as is (and why)
- 6d quiz post and its answer reply: a quiz needs the A/B/C options, and the wording was already hers.
- 6e TikTok comment ("refresh keeps it, closing the tab deletes it. that's sessionStorage in one line 😭"): already in her voice, from her own kit.
- 1e pinned comment, 5 carousel captions/post, 6f essay: outside the brief's list (1b, 3, 4, 6 posts). The essay is an article and its opening is already conversational; carousels are paused.
- 1b chapters, sources, connect, hashtags; every short's Title and Tags lines: kept as the brief says.
- 6e X reply about Laravel and the "where should I store my JWT?" reply mention part 2: reworded, and the Laravel one is marked "post only once part 2 is recorded".

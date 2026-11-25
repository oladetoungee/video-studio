# Teaser v3 plan (2026-11-13): her lines in play order

Playbook: inspiration/know-how/TEASER-PLAYBOOK.md section 0a (one story a stranger can follow) + section 0 (trailer grammar).
Raw-recording times; starts and ends sit in the gaps between her words (raw_words.json), checked after with whisper.
v2 (17 lines from all over) is in ../../archive/teaser-v2/.

Frame 1: COOKIES, LOCALSTORAGE, SESSIONSTORAGE (big, Oswald black on orange)

1. Hook, one stretch kept whole [9.45-29.60]
   "The web runs on HTTP, and HTTP is stateless. That means that every request your browser sends stands on its own. The server
   doesn't remember the request that came before it. So if you log into your shopping website, that's one request. If you click
   on My Orders, that's a brand new request on its own. So how does the server know that it's you?"

2. The idea [48.86-62.35]
   "After you log in, the server gives your browser a cookie with a session ID in it. And your browser shows that cookie on every
   request after that. So the first place that a website can keep something in your browser is in a cookie."
   (Answers the hook, and names the video: the places a website keeps things in your browser.)

Card: COOKIES (place 01)
3. [67.40-73.70] "A cookie is a small piece of text, usually a name and a value that the server asks your browser to hold on to."

Card: LOCALSTORAGE (place 02)
4. [135.00-147.62] "The second place a website can keep things in your browser is localStorage. localStorage is the reason why maybe you
   add something to your cart and close the browser, and when you come back and reopen it, you still see the stuff in your cart."
5. [183.50-187.88] "Closing the tab or even closing the whole browser doesn't clear your localStorage."

Card: SESSIONSTORAGE (place 03)
6. [201.00-207.60] "The third place is the sessionStorage. It's the reason why a half-filled checkout form can disappear when you close
   the tab."
7. [217.55-222.00] "If you refresh the page, it's still there. But if you close the tab, it's gone."

Card: WHO CAN READ IT?
8. [240.05-243.30] "Now, who can read cookies, localStorage, sessionStorage?"
9. [253.88-272.64] "localStorage and sessionStorage never leave the browser by itself. The server only see them if your code sends them.
   But inside the browser, any JavaScript running on your page can read your localStorage and sessionStorage. That includes
   your own code, but it also includes every third-party script that you've added, like maybe an analytic script or a chat
   widget." (the music stops on "any JavaScript running on your page")

10. Takeaway [306.00-320.60] "So in our online shop, the login is most likely an HttpOnly cookie, and the guest's cart is probably in
   localStorage, while the half-filled checkout form is probably in sessionStorage."

Ending: the outroCard (Full video on YouTube), 6.5 s.

## Cold read (someone who sees only the teaser)
- Hook: one idea (the server forgets you between requests), ends on her question.
- The idea answers it in her words and says there are places (first, second, third) a website keeps things: the tour follows.
- Each place: what it is + what a user sees (cart still there, form gone, refresh vs close tab). No "that"/"it" without its subject.
- "Who can read it" has its setup ("never leave the browser") before the "But inside the browser" turn.
- The takeaway ties the three places to one online shop; "HttpOnly" is the one word left for the full video (why the login sits there).
- Not used (on purpose): the cloakroom story (long, and the ticket line needs it), 4 KB, JSON, the Safari exception, document.cookie.
- Length: her lines 101.0 s + 4 cards x 0.8 s = 104.2 s, + the 6.5 s ending = 110.7 s.

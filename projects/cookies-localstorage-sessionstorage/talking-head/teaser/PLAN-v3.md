# Teaser v3.1 plan (2026-11-19, her note B): her lines in play order

Her note (2026-11-19): "I love that it starts on HTTP stateless. But complete that idea: every request your browser sends stands on its own;
the browser doesn't remember the request that came before it. Then 'so how does the server know it is you?' At that point come in with
cookies / localStorage / sessionStorage (the first thing we said in the full video), then continue with 'after you log in the server gives
you a cookie...' and continue everything you did from there."
Playbook: inspiration/know-how/TEASER-PLAYBOOK.md section 0a + section 0. Raw-recording times (raw_words.json); "plays at" = teaser time.
v3 (2026-11-13) is in ../../archive/text-cleanup-2026-11-19/teaser/; v2 in ../../archive/teaser-v2/.

Frame 1: her, "The web runs on HTTP" (the old COOKIES/LOCALSTORAGE/SESSIONSTORAGE plate on frame 1 is gone: the names come at 0:20,
where she asked). "Stateless" big behind her on her word (0:02).

1. Hook, one stretch kept whole [9.45-29.60], plays 0:00
   "The web runs on HTTP, and HTTP is stateless. That means that every request your browser sends stands on its own. The server
   doesn't remember the request that came before it. So if you log into your shopping website, that's one request. If you click
   on My Orders, that's a brand new request on its own. So how does the server know that it's you?"
   (Her real words; whisper hears "So, as the server knows that it's you" in both the recording and the teaser: same audio.)

2. Title card COOKIES / LOCAL STORAGE / SESSION STORAGE, in her voice [0.03-2.90], plays 0:20
   "Cookies, localStorage and sessionStorage."  (the first line of the full video; each name lands on her word, orange Oswald card,
   no caption under it; a black cut + impact in, a white flash out)

3. The idea [48.93-62.35], plays 0:23
   "After you log in, the server gives your browser a cookie with a session ID in it. And your browser shows that cookie on every
   request after that. So the first place that a website can keep something in your browser is in a cookie."

Card: COOKIES (0:36)
4. [67.40-73.70] "A cookie is a small piece of text, usually a name and a value that the server asks your browser to hold on to."

Card: LOCAL STORAGE (0:43)
5. [135.00-147.62] "The second place a website can keep things in your browser is localStorage. localStorage is the reason why maybe you
   add something to your cart and close the browser, and when you come back and reopen it, you still see the stuff in your cart."
6. [183.50-187.88] "Closing the tab or even closing the whole browser doesn't clear your localStorage."

Card: SESSION STORAGE (1:01)
7. [201.00-207.60] "The third place is the sessionStorage. It's the reason why a half-filled checkout form can disappear when you close
   the tab."
8. [217.55-222.00] "If you refresh the page, it's still there. But if you close the tab, it's gone."

Card: WHO CAN READ IT? (1:13)
9. [240.05-243.30] "Now, who can read cookies, localStorage, sessionStorage?"
10. [253.88-272.64] "localStorage and sessionStorage never leave the browser by itself. The server only see them if your code sends them.
   But inside the browser, any JavaScript running on your page can read your localStorage and sessionStorage. That includes
   your own code, but it also includes every third-party script that you've added, like maybe an analytic script or a chat
   widget." (the music stops on "any JavaScript running on your page")

11. Takeaway [306.00-320.60], plays 1:36 "So in our online shop, the login is most likely an HttpOnly cookie, and the guest's cart is
   probably in localStorage, while the half-filled checkout form is probably in sessionStorage."

Ending: the outroCard (Full video on YouTube), 6.5 s. Length: 110.6 s + 6.5 s = 1:57.

## Cold read (someone who sees only the teaser)
- Hook: one idea, complete (each request on its own, the server forgets the one before), ends on her question.
- Her answer starts by naming the three places (the card), then the first one in action ("After you log in…"): question -> answer.
- Each place: what it is + what a user sees. "Who can read it" has its setup before the "But inside the browser" turn.
- The takeaway ties the three places to one online shop; "HttpOnly" is left for the full video.
- Checked 2026-11-19: whisper of the teaser voice = this order, joins clean; composite check text collision 0 (16:9, 9:16); chincheck 1:1
  and 4:5 0 hits.

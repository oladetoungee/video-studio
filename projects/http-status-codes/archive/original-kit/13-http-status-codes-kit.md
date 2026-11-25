# HTTP Status Codes Explained (With Real API Examples): Content Kit
**Version 3, rebuilt on your 27 October read-through. Your read-through is the script. I fixed dictation slips, rewrote the 3xx part the way you asked, moved code onto the screen instead of saying it, and rebuilt every other section to match.**
**It goes from what a status code is, to the five classes as a bookshop counter, then group by group through the bookstore API (1xx and 2xx, 3xx, 4xx, 401 vs 403, 5xx), then the four common mistakes, and ends on your 418 line.**
**Every fact was checked again against RFC 9110, MDN, Google Search Central, GitHub's REST docs and the Laravel docs. Everything that changed from your read-through is listed in WHAT CHANGED at the end.**

---

## TAG POOL (88 tags, every tag used anywhere in this kit, deduplicated)

http status codes, http status codes explained, http response codes, api status codes, rest api status codes, 401 vs 403, 400 vs 422, 404 vs 410, 301 vs 308, 502 vs 504, 200 ok, 201 created, 204 no content, 409 conflict, 422 unprocessable content, 429 too many requests, 500 internal server error, 502 bad gateway, 503 service unavailable, 504 gateway timeout, http status code classes, http redirects explained, api error handling, http status code mistakes, rest api design, backend development, web development, http basics, api tutorial, laravel, 418 im a teapot, gbemisola oladetoun, withgbemi, unauthorized vs forbidden, authentication vs authorization, 401 unauthorized meaning, 403 forbidden meaning, 200 ok with error, rest api best practices, laravel validation 422, api validation errors, 301 vs 302 vs 307 vs 308, 302 vs 307, permanent vs temporary redirect, nginx 502, laravel findorfail 404, find vs findorfail, laravel 500 error, what is an http status code, http response explained, reason phrase, 1xx 2xx 3xx 4xx 5xx, status code categories, http status codes explained simply, 4xx vs 5xx, client error vs server error, debugging api errors, http status code first digit, 200 vs 201, rest api success codes, 101 switching protocols, location header, laravel 201 response, rest api post response, 301 vs 302, post redirect becomes get, 4xx errors, client errors, bad request vs unprocessable content, 410 gone, 404 not found, concurrent updates api, optimistic locking, rest api conflict, unauthorized vs unauthenticated, 404 instead of 403, github private repo 404, hide resource existence, api security, 500 vs 502, server errors explained, gateway timeout, bad gateway explained, api design mistakes, api bugs, 404 vs 500, laravel app_debug production, stack trace leak

## HASHTAG POOL (29 hashtags, every hashtag used anywhere in this kit)

#Shorts #webdev #api #backend #http #coding #programming #developer #laravel #learntocode #restapi #security #authentication #bestpractices #debugging #php #validation #redirects #seo #devops #nginx #servers #computerscience #techtok #systemdesign #frontend #github #webdevelopment #softwareengineering

---

## HOW THIS KIT IS BUILT

The script is your read-through, cleaned up. It opens on what a status code is, with a raw response on screen, then explains the five classes as asking for a book at a bookshop counter, and gives the first-digit rule (4 means check the request, 5 means check the server). After that it doesn't list the classes again. It goes straight into the codes group by group with the bookstore API, gives 401 vs 403 its own segment, covers the 5xx codes with the proxy in front of your app, and ends with the four common mistakes and your 418 line. Code only appears on screen. You never say "it looks like this."

**QUESTIONS FOR YOU**
None.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in the first line or two, so a viewer landing anywhere (or a clip cut from it) still knows what it's about. The code blocks are on-screen graphics only. You don't read them out.

---

**[SEGMENT 1: WHAT AN HTTP STATUS CODE IS]**

Every time your browser or your app sends a request to a server, the server sends back a response.

And the first line of that response has a three-digit number.

That number is the HTTP status code.

**[ON SCREEN: code, a raw response from the bookstore API, with 200 and OK highlighted]**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "title": "Things Fall Apart", "author": "Chinua Achebe"}
```

In this case here, 200 is the status code.

OK is the reason phrase.

The job of the status code is to tell you what happened, while the body gives you the details.

And you can already tell a lot from the first digit of that number.

---

**[SEGMENT 2: THE FIVE CLASSES OF HTTP STATUS CODES]**

HTTP status codes are grouped into five classes.

The first digit of the three-digit number tells you which class it's in.

**[~1:00 BEAT: the bookshop picture is the first payoff, and the first-digit rule lands right after it]**

The easiest way to think of them is to think of asking for a book at a bookshop counter.

1xx means, hold on, I'm working on it.

Like the attendant telling you, give me a second, let me check.

2xx means success.

Hey, I got your book. Here it is.

3xx means redirection.

We moved that book to our other branch, so go there.

4xx means client error.

Something is wrong with what you asked for.

Maybe you asked for a book that doesn't exist, or you didn't show us your bookshop membership card.

5xx means server error.

Your request was fine, but something broke on our end.

Our bookstore computer system is down, whatever it is.

**[ON SCREEN: 1xx = hold on / 2xx = here you go / 3xx = it's somewhere else / 4xx = problem with the request / 5xx = problem on the server]**

So when something fails or succeeds, look at the first digit first.

If it starts with a 4, start by checking the request the client sent.

If it starts with a 5, start by checking the server.

Now we'll go through each group, using our bookstore API.

---

**[SEGMENT 3: 1XX AND 2XX STATUS CODES, 200 VS 201 VS 204]**

We start with the 1xx status codes.

You rarely see the 1xx HTTP codes yourself.

You might see 101 Switching Protocols when a connection upgrades to a WebSocket, but your day-to-day API is mostly 2xx to 5xx HTTP status codes.

The 2xx status codes mean success, and there are three you will use all the time.

200 OK means your request worked, here is the result.

So GET /books/42 returns 200 OK with the book.

201 Created means the request worked, and something new was created.

So when you POST /books to add a new book, the right answer is 201.

You can also send a Location header that points to the new book.

**[ON SCREEN: code, the 201 response with its Location header, and the Laravel controller that sends it]**
```http
HTTP/1.1 201 Created
Location: /books/43
```
```php
// Laravel
$book = Book::create($request->validated());

return response()->json($book, 201)
    ->header('Location', route('books.show', $book));
```

204 No Content means your request worked, and there's nothing to send back.

You get 204 a lot with DELETE.

For example, when you delete book 42, there is nothing left to show, so you return 204 with an empty body.

**[ON SCREEN: code]**
```php
// Laravel
$book->delete();

return response()->noContent(); // 204
```

---

**[SEGMENT 4: 3XX REDIRECTS, 301 VS 302 VS 307 VS 308]**

The 3xx HTTP status codes are redirects.

They tell the client that what it wants is at a different address, and the new address goes in the Location header.

**[~3:00 BEAT: four redirect codes, and only two questions to pick one]**

There are four you'll see, and to pick the right one, you only need to answer two questions.

The first question is, is the move permanent or temporary?

If our bookshop moved that book to the other branch for good, that's a 301 or a 308.

If the book is only there for now and it's coming back, that's a 302 or a 307.

The second question is, does the request stay the same when the client follows the redirect?

Say you came to the counter to hand in an order form, and they send you to the other branch.

With 307 and 308, you take the same form to the other branch and hand it in there.

In HTTP terms, a POST stays a POST, and the data you sent goes with it.

With 301 and 302, the browser is allowed to switch the POST to a GET, and many browsers do.

That's like walking into the other branch just to look around, and the form never gets handed in.

**[ON SCREEN: table]**

| | keeps POST as POST | may switch POST to GET |
|---|---|---|
| **permanent** | 308 | 301 |
| **temporary** | 307 | 302 |

So for normal web pages, 301 and 302 are fine.

If you're redirecting an API where POST requests matter, I would use 307 or 308.

---

**[SEGMENT 5: 4XX CLIENT ERRORS, 400 VS 422, 404 VS 410, 409 AND 429]**

The 4xx status codes are client errors.

They mean the server thinks something is wrong with the request, and they are the ones you will debug the most.

Let's start with 400 and 422, because they sound similar.

400 Bad Request means the server can't read your request properly.

Like broken JSON, with a missing bracket.

422 Unprocessable Content means the server could read the request just fine, but the data inside does not make sense.

So if you send our bookstore a new book with no title, or with a price of minus five, that's a 422.

**[ON SCREEN: code]**
```php
// Laravel: if this fails on a JSON request, the client gets 422
$request->validate([
    'title' => 'required|string',
    'price' => 'required|numeric|min:0',
]);
```

Some APIs send 400 for validation errors too.

I think 422 is clearer, because it tells the frontend that the format was fine, and the data is what needs fixing.

404 Not Found means there's nothing at this address.

So if I send GET /books/9999, and there is no book 9999, the book does not exist, so the client gets a 404 Not Found.

You've probably seen a 404 yourself.

**[ON SCREEN: code]**
```php
// Laravel
$book = Book::findOrFail($id); // no book 9999? the client gets 404
```

410 Gone is a stronger version of 404.

It means this resource was here, it was removed on purpose, and it will not be back.

Like a book that you've taken out of the catalogue for good.

In practice, most APIs just use 404.

And Google's own docs say it treats 404 and 410 the same way.

So you use 410 Gone when you want to be very clear that something is gone for good.

**[~6:00 BEAT: a real two-admins bug, and 401 vs 403 is next]**

409 Conflict means the request clashed with the current state of the thing you're changing.

Say two admins open book 42 at the same time.

Admin A changes the price and saves.

Admin B is still looking at the old version.

They change the title and save, and that save will put the old price back.

If your API keeps track of versions, it can reply 409 Conflict to Admin B instead, so that they can reload and try again.

429 Too Many Requests means you are being rate limited.

It means you have sent too many requests in a short time, so slow down.

---

**[SEGMENT 6: 401 VS 403]**

401 and 403 are the two HTTP status codes that people mix up the most.

So let's use a real example.

Our bookstore has an admin route, DELETE /books/42.

Only admins can delete books.

Case one.

A request comes in with no token at all, or the token has expired.

The server has no idea who this is.

That is a 401 Unauthorized.

Case two.

The request has a valid token, so the server knows exactly who it is.

It's a customer, and customers can't delete books.

That is a 403 Forbidden.

So, two different cases.

Think of a hotel key card.

401 is when you don't have a key card, or your card doesn't work at all.

403 is when your card works fine, but it's for room 12, and you're trying to open room 40.

So 401 is kind of, who are you?

While 403 says, I know who you are, and you can't do this.

**[ON SCREEN: 401 = "who are you?" / 403 = "I know who you are, and you can't do this"]**

The part that confuses people is the name.

401 is called Unauthorized, but it's really about authentication, meaning the server doesn't know who you are.

The spec describes it as a request that lacks valid authentication credentials.

403 is the one about permission.

On a 401, the right move is to send the user to log in, or refresh their token.

On a 403, logging in again won't help, because the server already knows who they are.

So you just show them a message that they don't have access.

Sometimes a server will return 404 instead of 403 on purpose, just to hide that something exists.

For example, GitHub's API does this.

If you ask for a private repository that you don't have access to, you get a 404, so that GitHub doesn't confirm to you that the repository exists.

You shouldn't have access to it, and you shouldn't even know that it exists.

---

**[SEGMENT 7: 5XX SERVER ERRORS, 500 VS 502 VS 504 VS 503]**

**[~9:00 BEAT: the 5xx codes, and the mistakes segment right after]**

The 5xx status codes are server errors.

The request looked fine, but the server failed to handle it.

500 Internal Server Error is the general one.

Something unexpected went wrong.

Usually, it's an exception in your code that nothing caught.

In most real setups, a request first hits a proxy, like nginx [engine-x], or a load balancer, and the proxy passes it on to your app.

**[ON SCREEN: browser, then proxy (nginx or a load balancer), then your app]**

502 Bad Gateway means the proxy got an invalid response from your app, or couldn't get a proper response from it at all.

504 Gateway Timeout means the proxy waited for your app, and your app took too long to answer.

A very slow database query can lead to this.

503 Service Unavailable means the server cannot handle requests right now, and it's temporary.

It might be overloaded, or maybe the server is down for maintenance.

---

**[SEGMENT 8: COMMON HTTP STATUS CODE MISTAKES]**

These are the most common HTTP status code mistakes in APIs.

The first one is returning 200 OK for everything.

If your request fails, and the API still sends 200 OK with something like "error, something went wrong" inside the body, your frontend sees 200 and shows "Book saved!"

And your monitoring counts it as a success.

**[ON SCREEN: code]**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"error": "something went wrong"}
```

So send the real status code, and put the details in the body.

The second one is using 500 for things the client got wrong.

Say someone requests GET /books/9999.

You use find instead of findOrFail, so the book comes back as null.

Then your code tries to read the title from null, it crashes, and the client gets a 500.

**[ON SCREEN: code]**
```php
// Laravel
$book = Book::find($id);
return $book->title;            // null, so this crashes: 500

$book = Book::findOrFail($id);  // no book: 404
```

The right answer here is 404, because the book does not exist.

In this scenario, 500 is the wrong code, because 500 says your server is broken, and it can set off an alarm for nothing.

The third mistake is mixing up 401 and 403.

If you return 403 when the user's token has expired, your frontend doesn't send them back to log in.

They are just stuck.

The fourth one is leaking stack traces in your 500 responses.

In Laravel, if APP_DEBUG is true and something crashes, the JSON error response includes the exception message, the file path, the line number and the full stack trace.

That's useful for you on your laptop.

In production, however, you are showing someone your folder structure and how your code runs.

So APP_DEBUG should always be false in production.

**[ON SCREEN: code]**
```bash
# .env in production
APP_DEBUG=false
```

With debug off, your 500 response just says "Server Error."

That's all your user needs to see.

And one last HTTP status code, just for the fun of it.

418, I'm a teapot.

**[ON SCREEN: 418 I'm a teapot, from an April Fools' joke spec, RFC 2324, 1 April 1998]**

Bye.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("http status codes", "http status codes explained", "401 vs 403" and "301 vs 302" are the phrasings people type)
> 1. HTTP Status Codes Explained (With Real API Examples) — 52
> 2. HTTP Status Codes Every Developer Should Know — 45
> 3. HTTP Status Codes Explained: 200, 404, 500 and More — 51
> 4. REST API Status Codes: Which One Should You Return? — 51
> 5. 401 vs 403: Unauthorized vs Forbidden Explained — 47
> 6. 301 vs 302 vs 307 vs 308 Redirects Explained Simply — 51
> 7. 502 vs 503 vs 504 Errors Explained Simply — 41

**CLICK-LED**
> 8. HTTP Status Codes Most Developers Get Wrong — 43
> 9. Stop Returning 200 OK for Errors — 32
> 10. 401 or 403? The Status Codes Developers Mix Up — 46
> 11. 4 HTTP Status Code Mistakes That Break Your Frontend — 52
> 12. What the First Digit of a Status Code Tells You — 47

**RECOMMENDED: 1.** "HTTP status codes explained" is the exact phrase people type, it sits right at the front, and "With Real API Examples" tells a developer this goes past a list of definitions, which the bookstore API delivers in every segment. 4 is the backup search title if 1 stalls, because it matches the "which code should I return" question developers search while they're building. Thumbnail pairing: the title already says "status codes explained," so the thumbnail shouldn't show a list of codes. Use the hotel key card (see 2b), so the two together read as "here's the topic" plus "here's the pair you keep mixing up."

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "HTTP Status Codes Most Developers Get Wrong" (title 8). The video has a whole segment on the four common mistakes, and 401 vs 403 is framed as the pair people mix up the most. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot, with a "hmm, which one?" look. On the left, a hotel key card with "401" on it and a locked door with "403" on it. No other words. Squint at it, and if you can still see a card and a door with two numbers, it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** a big green "200 OK" badge with a small red code block under it showing `{"error": ...}`, your face on the right. The only big words are "200 OK." This pairs well with the stretch title.

**Recording notes:**
- Shoot two takes of Segment 1 (the first 20 seconds), so you can pick the stronger one.
- The code blocks are on-screen graphics. Don't read them out. Leave a short pause after each line that introduces one, so the edit has room to show it.
- nginx is pronounced "engine-x."
- The video ends on "418, I'm a teapot" and "Bye," which is the ending you chose. Hold a beat after "Bye" so the edit can cut cleanly.
- The script is about 1,800 spoken words, so at your pace the video is roughly 11 to 12 minutes. Nothing in it is padding. If you want it nearer 10, the easiest cut is the 409 example in Segment 5 (Clip 12 would then go).

**Retention beats (marked in the script):**
- ~1:00 is the bookshop counter in Segment 2, with the first-digit rule right after it.
- ~3:00 is the start of Segment 4, "you only need to answer two questions" for redirects.
- ~6:00 is the 409 two-admins example in Segment 5, just before 401 vs 403.
- ~9:00 is the start of Segment 7, the 5xx codes, with the mistakes right after.

**After publishing:**
- Post the X image post (the cheat sheet) as the video goes live, and send the link to a few people who'll actually watch it all the way through.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the 200 OK thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3 and 6 minutes. Wherever the big drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> HTTP status codes explained with a real bookstore API. This is what each status code means, which one to send, and how the first digit tells you where to look when something fails.
>
> I start with what a status code is and where it sits in an HTTP response. Then I explain the five classes as asking for a book at a bookshop counter, and go through the codes you'll use as a developer, group by group. That covers 101, 200, 201 and 204, the two questions that decide between 301, 302, 307 and 308, 400 vs 422, 404 vs 410, 409, 429, the 401 vs 403 pair people mix up the most, and 500, 502, 503 and 504. At the end, I go through the four most common status code mistakes in APIs.
>
> Which HTTP status code has confused you the most?
>
> CHAPTERS (add times after editing)
> 0:00 What an HTTP status code is
> The five classes of HTTP status codes
> 1xx and 2xx: 200 vs 201 vs 204
> 3xx redirects: 301 vs 302 vs 307 vs 308
> 4xx: 400 vs 422, 404 vs 410, 409 and 429
> 401 vs 403
> 5xx: 500, 502, 504 and 503
> Common HTTP status code mistakes
>
> SOURCES AND FURTHER READING
> RFC 9110, HTTP Semantics, Section 15 (Status Codes): https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes
> MDN, HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
> RFC 6585 (429 Too Many Requests): https://www.rfc-editor.org/rfc/rfc6585.html
> RFC 2324, Hyper Text Coffee Pot Control Protocol (418): https://www.rfc-editor.org/rfc/rfc2324.html
> Google Search Central, how HTTP status codes affect Google's crawlers: https://developers.google.com/search/docs/crawling-indexing/http-network-errors
> GitHub REST API docs, why some requests return 404 instead of 403: https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api
> Laravel documentation, Validation (422 responses): https://laravel.com/docs/validation
> Laravel documentation, Error Handling (APP_DEBUG): https://laravel.com/docs/errors
> My video on 404 pages and soft 404s: https://youtu.be/bZgqA1vTHXY
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (475 characters, under YouTube's 500 limit):**

http status codes, http status codes explained, http response codes, api status codes, rest api status codes, 401 vs 403, 400 vs 422, 404 vs 410, 301 vs 308, 502 vs 504, 200 ok, 201 created, 204 no content, 409 conflict, 422 unprocessable content, 429 too many requests, 500 internal server error, 502 bad gateway, 503 service unavailable, 504 gateway timeout, http status code classes, http redirects explained, api error handling, http status code mistakes, rest api design

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

Every HTTP response starts with a three-digit number, and that number tells you what happened.

**[WHAT IT IS]**

**[ON SCREEN: code]**
```http
HTTP/1.1 200 OK
```

200 is the status code. OK is the reason phrase. The body gives you the details.

**[THE FIVE CLASSES]**

The first digit tells you the class. Think of a bookshop counter. 1 means hold on, let me check. 2 means here's your book. 3 means we moved it to our other branch. 4 means something is wrong with what you asked for. 5 means something broke on our end.

So if it starts with a 4, check the request. If it starts with a 5, check the server.

**[2XX AND 3XX]**

200 means it worked. 201 means something new was created, like a new book. 204 means it worked and there's nothing to send back, like after a delete.

For redirects, ask two questions. Is the move permanent, so 301 or 308, or temporary, so 302 or 307? And should a POST stay a POST? 307 and 308 keep it. 301 and 302 let the browser switch it to a GET.

**[4XX]**

400 means the server can't read your request. 422 means it can, but the data is wrong. 404 means nothing is there. 429 means slow down.

**[401 VS 403]**

401 means the server doesn't know who you are. 403 means it knows, and you still can't do this. Like a hotel key card that works, but for a different room.

**[5XX]**

500 is something breaking in your code. 502 and 504 come from the proxy in front of your app, when your app gives a bad answer or takes too long. 503 means it's temporarily unavailable.

**[THE MISTAKES]**

So don't send 200 for errors. Don't send 500 when the client got it wrong. Don't mix up 401 and 403. And turn APP_DEBUG off in production, so a crash doesn't show your stack trace.

**[LAND]**

And 418 means I'm a teapot. Bye.

**Caption:** every http status code you'll actually use as a developer, what each one means, and where the first digit tells you to look when something fails 📦
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #http #coding #programming #developer #laravel #learntocode #restapi
**Tags:** http status codes explained, api status codes, http response codes, rest api status codes, http status code classes

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: 401 vs 403 (30-40 sec)

Our bookstore has a route to delete a book, and only admins can use it.

If the request has no token, or the token has expired, the server doesn't know who you are. That's a 401.

If the token is valid, it's a customer, and customers can't delete books, the server knows exactly who you are. You still can't do it. That's a 403.

So on a 401, send the user to log in. On a 403, logging in again won't help.

**Caption:** 401 means the server doesn't know who you are. 403 means it knows who you are, and you still can't do this. here's how to tell them apart with one example 🔑
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #security #authentication #http #coding #programming #developer #laravel
**Tags:** 401 vs 403, unauthorized vs forbidden, authentication vs authorization, 401 unauthorized meaning, 403 forbidden meaning

---

### SHORT 3: Stop returning 200 OK for errors (25-35 sec)

You save a book. The API sends back 200 OK.

Your frontend sees 200 and shows "Book saved!"

But the body says, error, something went wrong. The book was never saved.

Your monitoring counted it as a success too, because it also reads the status code.

So send the real status code, like a 422 or a 500, and put the details in the body.

**Caption:** if your API sends 200 OK with an error inside the body, your frontend and your monitoring both think it worked 😬
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #bestpractices #coding #programming #developer #http #debugging
**Tags:** 200 ok with error, api error handling, rest api best practices, http status code mistakes

---

### SHORT 4: 400 vs 422 (25-35 sec)

400 Bad Request means the server can't read your request properly. Like broken JSON with a missing bracket.

422 Unprocessable Content means it read your request fine, but the data doesn't make sense. Like a new book with no title, or a price of minus five.

Some APIs send 400 for both. I think 422 is clearer, because it tells the frontend the format was fine and the data is what needs fixing.

**[ON SCREEN: code]**
```php
'price' => 'required|numeric|min:0',
```

**Caption:** 400 means the server couldn't read your request. 422 means it read it fine and the data is what's wrong ✅
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #webdev #validation #coding #developer #http
**Tags:** 400 vs 422, 422 unprocessable content, laravel validation 422, api validation errors

---

### SHORT 5: 301 vs 302 vs 307 vs 308 (30-40 sec)

There are four redirect codes, and you only need two questions to pick one.

Is the move permanent? Then it's 301 or 308. Is it only for now? Then it's 302 or 307.

Should a POST stay a POST when the client follows the redirect? With 307 and 308, it does, and the data goes with it. With 301 and 302, the browser is allowed to switch it to a GET, and many browsers do.

So for an API where POST requests matter, I would use 307 or 308.

**Caption:** four redirect codes, two questions. is the move permanent, and should your POST stay a POST? 🔀
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #http #backend #redirects #coding #programming #developer #seo
**Tags:** 301 vs 302 vs 307 vs 308, 301 vs 308, 302 vs 307, permanent vs temporary redirect, http redirects explained

---

### SHORT 6: 502 vs 504 (25-35 sec)

In most real setups, a request first hits a proxy, like nginx or a load balancer, and the proxy passes it to your app.

502 Bad Gateway means the proxy got an invalid response from your app, or couldn't get a proper response at all.

504 Gateway Timeout means the proxy waited, and your app took too long to answer. A very slow database query can do that.

So the error comes from the proxy, but you go and check your app.

**Caption:** 502 and 504 errors come from the proxy in front of your app, and the cause is usually your app. here's how to tell them apart 🛠️
full video: [LINK]
**Hashtags:** #Shorts #devops #backend #webdev #nginx #servers #debugging #http #coding #developer
**Tags:** 502 vs 504, 502 bad gateway, 504 gateway timeout, nginx 502

---

### SHORT 7: find vs findOrFail (25-30 sec)

Someone requests GET /books/9999, and that book doesn't exist.

If you use find in Laravel, the book comes back as null. Your code tries to read the title from null, it crashes, and the client gets a 500.

If you use findOrFail, the client gets a 404, which is the right answer.

A 500 says your server is broken, and it can set off an alarm for nothing.

**[ON SCREEN: code]**
```php
$book = Book::findOrFail($id); // no book: 404
```

**Caption:** a missing record should be a 404, and using find instead of findOrFail can turn it into a 500 that sets off your alerts for nothing
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #webdev #debugging #coding #developer #http
**Tags:** laravel findorfail 404, find vs findorfail, laravel 500 error, http status code mistakes

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** what an HTTP status code is
**Caption:** every HTTP response starts with a three-digit number, and that number is the status code. it tells you what happened, and the body gives you the details.
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #api #backend #coding #programming #learntocode #developer
**Tags:** what is an http status code, http response explained, reason phrase, http basics

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** the 5 classes of HTTP status codes
**Caption:** 1xx, 2xx, 3xx, 4xx and 5xx, explained like asking for a book at a bookshop counter, plus where to look first when something fails.
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #api #coding #programming #learntocode #developer #computerscience
**Tags:** http status code classes, 1xx 2xx 3xx 4xx 5xx, http status codes explained, status code categories

---

### CLIP 3 — subset of Segment 2
**Starts:** "The easiest way to think of them is to think of asking for a book at a bookshop counter." **Ends:** "...Our bookstore computer system is down, whatever it is."
**Overlay:** HTTP status codes explained with a bookshop
**Caption:** 1xx is the attendant saying let me check. 2xx is here's your book. 3xx is we moved it to our other branch. 4xx is a problem with what you asked for, and 5xx is something breaking on their end.
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #api #coding #programming #learntocode #developer #techtok
**Tags:** http status codes explained simply, http status code classes, 1xx 2xx 3xx 4xx 5xx

---

### CLIP 4 — subset of Segment 2
**Starts:** "So when something fails or succeeds, look at the first digit first." **Ends:** "...If it starts with a 5, start by checking the server."
**Overlay:** where to look first when a request fails
**Caption:** a status code starting with 4 means check the request that was sent. starting with 5 means check the server.
full video: [LINK]
**Hashtags:** #Shorts #debugging #webdev #api #backend #coding #programming #developer #http
**Tags:** 4xx vs 5xx, client error vs server error, debugging api errors, http status code first digit

---

### CLIP 5 — Segment 3 (whole)
**Overlay:** 200 vs 201 vs 204
**Caption:** 200 when it worked, 201 when something new was created, and 204 when it worked and there's nothing to send back. plus where 101 Switching Protocols shows up.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #laravel #php #http #coding #developer #restapi
**Tags:** 200 vs 201, 201 created, 204 no content, rest api success codes, 101 switching protocols

---

### CLIP 6 — subset of Segment 3
**Starts:** "201 Created means the request worked, and something new was created." **Ends:** "...You can also send a Location header that points to the new book."
**Overlay:** when to return 201 Created
**Caption:** when you add a new book with POST /books, the right answer is 201 Created, and you can send a Location header that points to the new book.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #webdev #restapi #coding #developer
**Tags:** 201 created, location header, laravel 201 response, rest api post response

---

### CLIP 7 — Segment 4 (whole)
**Overlay:** 301 vs 302 vs 307 vs 308
**Caption:** four redirect codes, and two questions to pick the right one. is the move permanent or temporary, and should a POST stay a POST?
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #redirects #seo #backend #api #coding #developer
**Tags:** 301 vs 302 vs 307 vs 308, http redirects explained, permanent vs temporary redirect, 301 vs 302

---

### CLIP 8 — subset of Segment 4
**Starts:** "The second question is, does the request stay the same when the client follows the redirect?" **Ends:** "...and the form never gets handed in."
**Overlay:** why 307 and 308 exist
**Caption:** with 307 and 308, a POST stays a POST and the data goes with it. with 301 and 302, the browser is allowed to switch it to a GET, and many browsers do.
full video: [LINK]
**Hashtags:** #Shorts #api #http #webdev #backend #redirects #coding #programming #developer
**Tags:** 301 vs 308, 302 vs 307, post redirect becomes get, http redirects explained

---

### CLIP 9 — Segment 5 (whole)
**Overlay:** 4xx errors, explained
**Caption:** 400, 422, 404, 410, 409 and 429, explained with a bookstore API.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #laravel #http #debugging #coding #developer
**Tags:** 4xx errors, client errors, 409 conflict, 429 too many requests, rest api status codes

---

### CLIP 10 — subset of Segment 5
**Starts:** "Let's start with 400 and 422, because they sound similar." **Ends:** "...the format was fine, and the data is what needs fixing."
**Overlay:** 400 vs 422
**Caption:** 400 means the server couldn't read your request, like broken JSON. 422 means it read it fine and the data inside doesn't make sense.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #validation #webdev #coding #developer
**Tags:** 400 vs 422, 422 unprocessable content, laravel validation 422, bad request vs unprocessable content

---

### CLIP 11 — subset of Segment 5
**Starts:** "404 Not Found means there's nothing at this address." **Ends:** "...when you want to be very clear that something is gone for good."
**Overlay:** 404 vs 410
**Caption:** 404 means there's nothing at this address. 410 means it was here, it was removed on purpose, and it won't be back.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #laravel #seo #backend #http #coding #developer
**Tags:** 404 vs 410, 410 gone, 404 not found, laravel findorfail 404

---

### CLIP 12 — subset of Segment 5
**Starts:** "409 Conflict means the request clashed with the current state of the thing you're changing." **Ends:** "...so that they can reload and try again."
**Overlay:** what 409 Conflict is for
**Caption:** two admins edit the same book at the same time, and the second save would put the old price back. that's what 409 Conflict is for.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #restapi #http #coding #developer #systemdesign
**Tags:** 409 conflict, concurrent updates api, optimistic locking, rest api conflict

---

### CLIP 13 — Segment 6 (whole)
**Overlay:** 401 vs 403
**Caption:** 401 means the server doesn't know who you are. 403 means it knows, and you still can't do this. with a bookstore example and what your frontend should do on each one.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #security #authentication #backend #laravel #http #coding #developer
**Tags:** 401 vs 403, unauthorized vs forbidden, authentication vs authorization, 401 unauthorized meaning, 403 forbidden meaning

---

### CLIP 14 — subset of Segment 6
**Starts:** "Think of a hotel key card." **Ends:** "...While 403 says, I know who you are, and you can't do this."
**Overlay:** 401 vs 403, explained with a hotel key card
**Caption:** no key card is a 401. a key card that works, but for a different room, is a 403.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #security #authentication #http #coding #programming #developer
**Tags:** 401 vs 403, 401 unauthorized meaning, 403 forbidden meaning, authentication vs authorization

---

### CLIP 15 — subset of Segment 6
**Starts:** "The part that confuses people is the name." **Ends:** "...So you just show them a message that they don't have access."
**Overlay:** why 401 is called Unauthorized
**Caption:** 401 is named Unauthorized, but it's about authentication. on a 401 you send the user to log in, and on a 403 logging in again won't help.
full video: [LINK]
**Hashtags:** #Shorts #security #authentication #api #webdev #frontend #http #coding #developer
**Tags:** 401 unauthorized meaning, unauthorized vs unauthenticated, 401 vs 403, authentication vs authorization

---

### CLIP 16 — subset of Segment 6
**Starts:** "Sometimes a server will return 404 instead of 403 on purpose, just to hide that something exists." **Ends:** "...and you shouldn't even know that it exists."
**Overlay:** why GitHub shows 404 for private repos
**Caption:** a 403 would confirm that the private repository exists, so GitHub's API sends a 404 instead.
full video: [LINK]
**Hashtags:** #Shorts #security #github #api #webdev #backend #http #coding #developer
**Tags:** 404 instead of 403, github private repo 404, hide resource existence, api security

---

### CLIP 17 — Segment 7 (whole)
**Overlay:** 500 vs 502 vs 503 vs 504
**Caption:** 500 is an exception nothing caught. 502 and 504 come from the proxy in front of your app, and 503 means the server can't handle requests for now.
full video: [LINK]
**Hashtags:** #Shorts #devops #backend #webdev #servers #nginx #debugging #http #developer
**Tags:** 500 vs 502, 502 bad gateway, 503 service unavailable, 504 gateway timeout, server errors explained

---

### CLIP 18 — subset of Segment 7
**Starts:** "In most real setups, a request first hits a proxy" **Ends:** "...A very slow database query can lead to this."
**Overlay:** 502 vs 504
**Caption:** 502 means the proxy got a bad response from your app, or none at all. 504 means it waited and your app took too long.
full video: [LINK]
**Hashtags:** #Shorts #devops #nginx #backend #webdev #servers #debugging #coding #developer
**Tags:** 502 vs 504, nginx 502, gateway timeout, bad gateway explained

---

### CLIP 19 — Segment 8 (whole)
**Overlay:** common HTTP status code mistakes
**Caption:** sending 200 for errors, sending 500 when the client got it wrong, mixing up 401 and 403, and leaking stack traces in production.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #bestpractices #webdev #laravel #coding #programming #developer
**Tags:** http status code mistakes, api error handling, rest api best practices, api design mistakes

---

### CLIP 20 — subset of Segment 8
**Starts:** "The first one is returning 200 OK for everything." **Ends:** "...So send the real status code, and put the details in the body."
**Overlay:** POV: your API says 200 OK but nothing saved
**Caption:** if the API sends 200 OK with an error inside the body, the frontend shows "book saved" and the monitoring counts it as a success.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #debugging #coding #programming #developer #http #techtok
**Tags:** 200 ok with error, api error handling, http status codes, api bugs

---

### CLIP 21 — subset of Segment 8
**Starts:** "The second one is using 500 for things the client got wrong." **Ends:** "...and it can set off an alarm for nothing."
**Overlay:** find vs findOrFail
**Caption:** a book that doesn't exist should be a 404. using find instead of findOrFail crashes on null and sends a 500 instead.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #webdev #debugging #coding #developer
**Tags:** laravel findorfail 404, find vs findorfail, laravel 500 error, 404 vs 500

---

### CLIP 22 — subset of Segment 8
**Starts:** "The fourth one is leaking stack traces in your 500 responses." **Ends:** "...That's all your user needs to see."
**Overlay:** turn APP_DEBUG off in production
**Caption:** with APP_DEBUG on, a Laravel 500 response includes your file paths and the full stack trace. with it off, it just says "Server Error."
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #security #backend #webdev #bestpractices #coding #developer
**Tags:** laravel app_debug production, stack trace leak, laravel 500 error, api security

---

**Posting order:** 20 first (the 200 OK bug is the most relatable), then 14 (the key card is the easiest one to follow cold), then 10 (400 vs 422), then 8 (why 307 and 308 exist), then 18 (502 vs 504), then 22 (APP_DEBUG), then 3 (the bookshop). Space the whole-segment clips out between the subset clips so the same footage doesn't run twice in a row.

---

## 6. CAPTIONS

### TikTok caption:
> every http status code you'll actually use, explained with a bookstore API. the first digit already tells you whether to check the request or the server 📦
**Hashtags:** #webdev #api #backend #coding #learntocode

### Instagram Reel caption:
> Every HTTP response starts with a three-digit number, and that number tells you what happened.
>
> The first digit already tells you a lot. A 4 means something is wrong with the request, and a 5 means something broke on the server.
>
> I go through the codes you'll actually use with a bookstore API, including the difference between 401 and 403, which is the pair people mix up the most, and the mistakes that cause real bugs.
>
> Full video on YouTube, link in bio.
>
> #webdev #api #backend #coding #learntocode

### LinkedIn caption:
> How does your frontend know whether a request worked?
>
> It reads the HTTP status code, the three-digit number in the first line of every response, while the body carries the details.
>
> The first digit gives the class, so a 4xx tells you to check the request and a 5xx tells you to check the server.
>
> Inside the 4xx class, the exact code tells the frontend what to do next, because a 422 means the data needs fixing while a 401 means the user needs to log in again.
>
> 401 and 403 are the pair worth getting right, since a 403 means the server already knows who you are, so sending the user to log in again won't help.
>
> And an API that sends 200 OK with an error in the body takes all of that away, because the frontend and the monitoring both read the code first.
>
> Full walkthrough: [LINK]
>
> #webdevelopment #api #backend #softwareengineering #laravel

---

## 7. X / TWITTER

**How this section works.** It follows what your X searches showed. Image cheat sheets get far more reach than text tweets, and the tweets that start conversations name one specific situation and what happens. So there's one image post, one tips list, one quiz, one "can you guess" tweet, the launch tweet, and single tweets that each say one specific thing. Everything is lowercase, no arrows, no hashtags, and the link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> the http status codes you'll actually use as a developer, on one card

**Image content (one clean card in Canva):**
> **HTTP STATUS CODES YOU'LL ACTUALLY USE**
> **200 OK** · it worked, here's the result
> **201 Created** · something new was created (POST)
> **204 No Content** · it worked, nothing to send back (DELETE)
> **301 / 308** · moved for good (308 keeps POST as POST)
> **302 / 307** · moved for now (307 keeps POST as POST)
> **400 Bad Request** · the server can't read your request
> **401 Unauthorized** · the server doesn't know who you are
> **403 Forbidden** · it knows who you are, and you still can't
> **404 Not Found** · nothing at this address
> **409 Conflict** · clashes with the current state
> **410 Gone** · removed on purpose, for good
> **422 Unprocessable Content** · readable, but the data is wrong
> **429 Too Many Requests** · slow down
> **500** · something broke on the server
> **502 / 504** · the proxy got a bad answer / waited too long
> **503** · temporarily unavailable

**Reply:**
> I went through all of these with a bookstore API: [LINK]

---

### THE TIPS LIST

> http status code habits I wish I'd picked up earlier
>
> 1. never send 200 with an error in the body
> 2. send 201 when you create something
> 3. use 422 for validation errors so the frontend knows to fix the data
> 4. 401 means log in again, 403 means you can't do this
> 5. use findOrFail so a missing record is a 404 and not a 500
> 6. APP_DEBUG=false in production, always

**Reply:** full video on all of these: [LINK]

---

### THE QUIZ

> a customer is logged in with a valid token, and she tries to delete a book, which only admins can do. what should the api return?
>
> A. 400
> B. 401
> C. 403
> D. 404

**Your reply a few hours later:**
> it's C, 403. the server knows exactly who she is, she just doesn't have permission. a 401 would tell the frontend to log her in again, and that wouldn't help her at all

---

### THE "CAN YOU GUESS" TWEET

> there's an http status code that came from an april fools' joke in 1998 and is still reserved in the spec today. can you guess which one?

**Your reply:**
> 418, I'm a teapot. it's from a joke spec for controlling coffee pots over the internet, and the current http spec keeps 418 reserved

---

### THE LAUNCH TWEET

> made a video on http status codes with a bookstore API, from what one is, to the five classes, every group of codes, 401 vs 403, and the mistakes that cause real bugs

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if your api sends 200 OK with {"error": "something went wrong"} in the body, your frontend shows "saved!" and your monitoring counts it as a success

> a 301 redirect is allowed to turn your POST into a GET when the client follows it. if you need the POST to stay a POST, that's what 307 and 308 are for

> if you return 403 when the user's token has expired, your frontend never sends them back to log in. they're just stuck there

> using find instead of findOrFail in laravel means a missing book can crash your code and send a 500, when the honest answer was a 404

> with APP_DEBUG=true, a laravel 500 response includes your file paths and the full stack trace. check your production .env today

> github sends a 404 for a private repo you can't access, so it doesn't even confirm the repo exists

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> which status code has confused you the most? and if you've ever shipped a 200 with an error inside the body, you're safe here, tell me about it 😅

### Instagram:
> the 401 vs 403 one changed how I handle logins on the frontend. a 401 sends you to log in, a 403 doesn't.

### TikTok:
> the 200 OK with an error inside the body is the one I see the most 😭

### LinkedIn:
> The habit I'd push for in code review is checking the status code on every error path, because the frontend, the monitoring and any client calling the API all decide what to do from that number first.

### X (reply to your own tweet):
> quick check for your own api: make one request fail on purpose and look at the status code. if it says 200, that's your first fix

### REPLIES TO EXPECT (ready to paste)

**"I always use 400 for validation, not 422."**
> that's fine, plenty of APIs do. I prefer 422 because it tells the frontend the request was readable and the data is what needs fixing. the main thing is to be consistent across your API

**"Shouldn't 401 be called Unauthenticated?"**
> yes 😭 the spec still calls it Unauthorized, but it describes it as a request that lacks valid authentication credentials. so it's about who you are, and 403 is about what you're allowed to do

**"Why not just return 404 for everything I don't want people to see?"**
> you can, and GitHub's API does it for private repos so it doesn't confirm they exist. just use it on purpose, because a 404 tells your own frontend less than a 403 does

**"You didn't mention 304."**
> 304 Not Modified is a caching one. the browser asks if its copy has changed, and if it hasn't, the server says 304 and the browser keeps what it has. I kept the video to the codes you'd send from an API

**"GraphQL returns 200 for errors though."**
> yes, a lot of GraphQL servers send errors inside a 200 response, and the client reads the errors field instead. this video is about REST APIs, where the status code is how clients know what happened

**"Is 418 real?"**
> it started as an april fools' joke in 1998, RFC 2324, and the current http spec keeps 418 reserved, so nobody can give it another meaning for now

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** every HTTP response starts with a three-digit number.
**Slide 2:** that number is the status code, and it tells you what happened.
**Slide 3:** the first digit tells you the class, from 1xx up to 5xx.
**Slide 4:** a 4 means check the request, and a 5 means check the server.
**Slide 5:** send 201 when you create something, and 204 when there's nothing to send back.
**Slide 6:** 307 and 308 keep a POST as a POST when the client follows the redirect.
**Slide 7:** 400 means the server can't read the request, and 422 means the data is wrong.
**Slide 8:** 401 means the server doesn't know who you are, and 403 means you still can't do this.
**Slide 9:** 502 and 504 come from the proxy in front of your app when your app gives a bad answer or takes too long.
**Slide 10:** never send 200 with an error in the body, and turn APP_DEBUG off in production.

**Carousel caption:**
> the http status codes you'll actually use, explained with a bookstore API. full video on YouTube, link in bio.
>
> #webdev #api #backend #coding #learntocode

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> HTTP Status Codes, Explained at a Bookshop Counter

### Subtitle:
> What each group of status codes means, which one to send, and the mistakes that make APIs hard to work with.

### SEO Title:
> HTTP Status Codes Explained With Real API Examples

### SEO Description:
> A plain guide to HTTP status codes with a bookstore API, covering the five classes, 200 to 504, how to pick a redirect, 401 vs 403, and the most common status code mistakes.

---

Every time your browser or your app sends a request to a server, the server sends back a response, and the first line of that response has a three-digit number. That number is the HTTP status code. In a response like "HTTP/1.1 200 OK," 200 is the code and OK is the reason phrase. The code tells you what happened, and the body gives you the details.

The first digit tells you the class, and I find it easiest to picture asking for a book at a bookshop counter. A 1xx is the attendant saying "give me a second, let me check." A 2xx is "here's your book." A 3xx is "we moved that book to our other branch, so go there." A 4xx means something is wrong with what you asked for, maybe a book that doesn't exist or a missing membership card, and a 5xx means your request was fine and something broke on their end. So when something fails, the first digit tells you where to start. A 4 sends you to the request, and a 5 sends you to the server.

You rarely see 1xx codes yourself, apart from 101 Switching Protocols when a connection upgrades to a WebSocket. For success there are three you'll use all the time. 200 means it worked and here's the result, 201 means something new was created, ideally with a Location header pointing to it, and 204 means it worked and there's nothing to send back, which suits a DELETE.

Redirects come down to two questions. The first is whether the move is permanent, which is 301 or 308, or temporary, which is 302 or 307. The second is whether the request should stay the same. RFC 9110 lets a browser switch a POST to a GET when it follows a 301 or 302, "for historical reasons," and many browsers do. 307 and 308 don't allow that, so the POST stays a POST and the data goes with it. For ordinary pages 301 and 302 are fine, and for an API where POST requests matter, I would use 307 or 308.

Client errors are the ones you'll debug the most. A 400 means the server can't read the request, like broken JSON, while a 422 means it can read it and the data is wrong, like a book with no title or a price of minus five. Some APIs use 400 for both, but I think 422 is clearer, because it tells the frontend the format was fine and the data is what needs fixing. A 404 means nothing is at the address, and a 410 means something was removed on purpose and won't be back, although Google's documentation says its crawlers treat all 4xx errors except 429 the same way. A 409 means the request clashes with the current state, like two admins saving different versions of the same book, and a 429 means the client is being rate limited.

The pair people mix up most is 401 and 403. A 401 means the server doesn't know who you are, because the token is missing or has expired. RFC 9110 describes it as a request that "lacks valid authentication credentials," despite the name "Unauthorized." A 403 means the server knows exactly who you are and you still aren't allowed, like a hotel key card that works, but for a different room. The difference matters on the frontend, because a 401 should send the user to log in again, while a 403 should not. Some servers send 404 in place of 403 on purpose, and GitHub's documentation says its API does this to avoid confirming that a private repository exists.

On the server side, a 500 means something unexpected went wrong, usually an exception nothing caught. In most setups a proxy like nginx or a load balancer sits in front of the app. A 502 means that proxy got an invalid response from the app, or none at all, and a 504 means the proxy waited and the app took too long, which a very slow database query can cause. A 503 means the service can't handle requests right now, because it's overloaded or down for maintenance.

The mistakes I see most come straight out of all this. Sending 200 for errors hides failures from every tool that reads the status code. Sending 500 when the client asked for something that doesn't exist makes your server look broken, and in Laravel, using findOrFail instead of find returns the honest 404. Mixing up 401 and 403 leaves users stuck, because a 403 never sends them back to log in. Leaving APP_DEBUG on in production means a Laravel 500 response includes file paths and a full stack trace, which the Laravel docs warn can expose sensitive configuration values. And if you want one to remember just for fun, 418 "I'm a teapot" began as an April Fools' joke in RFC 2324 in 1998, and RFC 9110 still keeps it reserved.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Web Development, API, Backend, Laravel, Programming

---

## 11. REFERENCES & SOURCES

**1. RFC 9110, HTTP Semantics (June 2022), the current definition of every code in the video**
https://www.rfc-editor.org/rfc/rfc9110.html
- Section 15: "The first digit of the status code defines the class of response," and the five class definitions. Supports Segment 2.
- Section 15.1: reason phrases are "only recommendations." Supports "OK is the reason phrase" in Segment 1.
- 15.2.2: 101 Switching Protocols. RFC 6455 is the WebSocket handshake that answers with 101 (https://www.rfc-editor.org/rfc/rfc6455.html). Supports Segment 3.
- 15.3.1, 15.3.2, 15.3.5: 200, 201 (the new resource is identified by the Location header, or by the target URI if there isn't one), 204. Segment 3 says "you can also send a Location header," which matches.
- 15.4.2, 15.4.3, 15.4.8, 15.4.9: 301 Moved Permanently and 302 Found carry the note "For historical reasons, a user agent MAY change the request method from POST to GET." 307 Temporary Redirect and 308 Permanent Redirect do not allow the method to change. Supports the two questions in Segment 4.
- 15.5.1, 15.5.2, 15.5.4: 400, 401 ("lacks valid authentication credentials"), 403 ("understood the request but refuses to fulfill it"), and "An origin server that wishes to 'hide' the current existence of a forbidden target resource MAY instead respond with a status code of 404." Supports Segment 6.
- 15.5.5, 15.5.10, 15.5.11: 404, 409 (the spec's own example is a versioning conflict, which is the two-admins example in Segment 5), 410 ("likely to be permanent").
- 15.5.19: 418 is "(Unused)" and reserved.
- 15.5.21: 422 Unprocessable Content. Supports the name used in Segment 5.
- 15.6.1, 15.6.3 to 15.6.5: 500, 502 ("received an invalid response from an inbound server"), 503 ("temporary overload or scheduled maintenance"), 504. Supports Segment 7.

**2. Other RFCs**
- RFC 6585 (2012), 429 Too Many Requests: https://www.rfc-editor.org/rfc/rfc6585.html
- RFC 2324 (1 April 1998), Hyper Text Coffee Pot Control Protocol, where 418 comes from. Supports the on-screen line at the end of Segment 8. https://www.rfc-editor.org/rfc/rfc2324.html

**3. MDN**
- HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- 301 and 302 pages: browsers commonly change a POST into a GET when following these, which is why MDN points to 307 and 308 when the method must not change. Supports "many browsers do" in Segment 4.
- 307 and 308 pages: the method and the body aren't changed when the redirect is followed. Supports "the data you sent goes with it."

**4. Google Search Central (checked 27 October 2026)**
- "All 4xx errors, except 429, are treated the same." 410 has no separate explanation on the page. Supports "Google's own docs say it treats 404 and 410 the same way" in Segment 5. https://developers.google.com/search/docs/crawling-indexing/http-network-errors

**5. GitHub REST API docs (checked 27 October 2026)**
- "If you make a request to access a private resource and your request isn't properly authenticated, you will receive a 404 Not Found response." GitHub uses 404 instead of 403 to avoid "confirming the existence of private repositories." Supports Segment 6. https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api

**6. Laravel (docs and framework source)**
- Validation: on an XHR or JSON request, failed validation returns a 422 with the errors. Supports the on-screen code in Segment 5. https://laravel.com/docs/validation
- Eloquent: if the ModelNotFoundException from findOrFail isn't caught, "a 404 HTTP response is automatically sent back to the client." https://laravel.com/docs/eloquent#not-found-exceptions
- Configuration and errors: "For local development, you should set the APP_DEBUG environment variable to true. In your production environment, this value should always be false. If the variable is set to true in production, you risk exposing sensitive configuration values to your application's end users." Supports Segment 8. https://laravel.com/docs/errors
- Framework source, `Foundation/Exceptions/Handler::convertExceptionToArray`: with debug on, the JSON error includes message, exception, file, line and trace. With debug off, it says "Server Error." Supports Segment 8.
- `response()->noContent()` defaults to 204 (`Routing/ResponseFactory`). Supports the on-screen code in Segment 3.

**7. Corrections / careful wording**
- **"401 means unauthenticated."** The spec still names it "Unauthorized," so the script says it's "really about authentication" and quotes the spec's own definition instead of claiming the name is wrong. The spec also says that if credentials were sent, a 401 means they were refused, so the script says "no token at all, or the token has expired."
- **"410 removes pages from Google faster."** That's a common SEO claim, and Google's John Mueller has said in the past that 410 can be processed a little faster than 404. Google's current documentation says all 4xx errors except 429 are treated the same, so the script says "Google's own docs say," which is exactly what the docs say.
- **301/302 and POST.** The spec says clients MAY switch POST to GET, not that they always do. The script says "allowed to," and "many browsers do."
- **"I would use 307 or 308 for an API"** is framed as your opinion. 301 is still common and fine for GET-only URLs.
- **400 vs 422 for validation** has no single right answer. Laravel uses 422, and plenty of APIs use 400. The script says "I think 422 is clearer."
- **GitHub's 404.** GitHub's docs describe a request to a private resource that "isn't properly authenticated." The script's "a private repository that you don't have access to" covers that case without claiming more.
- **418.** RFC 9110 keeps it reserved. The video only says the name, and the on-screen line gives the source.

---

## NOTES

- **What's new vs version 2:** the script is now your read-through. The 3xx part is rewritten as two questions with one table. Code is on screen only. The old open, the "codes you'll actually use" list, 304, the RFC 471 rule, and most Laravel spoken lines are gone (full list in WHAT CHANGED). There are 8 segments, 22 clips, a main short and 6 additional shorts.
- **Cross-links:** your 404 pages video (soft 404s, already in the description), 15 What happens when you send an API request (where a response comes from), and 49 Networking basics every internet user should know.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later.
- **On-screen code:** the 201 snippet uses `response()->json($book, 201)->header(...)`, which works on every recent Laravel version.

---

## WHAT CHANGED (from your 27 October read-through)

**Dictation fixes (your words, cleaned)**
- "status quo / status quoes" is now "status code(s)." "reason phase" is "reason phrase."
- "3x / 1x hex / 2x / four XS" are now 3xx, 1xx, 2xx and 4xx. "one-on-one switching protocol" is 101 Switching Protocols, and "upgrades to a one to a web socket" is "upgrades to a WebSocket."
- "order branch" is "other branch." "on our hand" is "on our end."
- "Jason" is JSON. "4 to 2" is 422. "404 non-file" is "404 Not Found." "Fortnite too many requests" is 429 Too Many Requests. "four nine conflict / conflit" is 409 Conflict.
- "call about 404 yourself" was unclear, so it's now "You've probably seen a 404 yourself." The findOrFail line sits on screen under it.
- "Google through it's 404 and 401 the same" is now "Google's own docs say it treats 404 and 410 the same way" (you meant 410, and "own docs" matches what Google's page says).
- "Our book saw as" is "Our bookstore has." "the token hasn't expired" is "the token has expired."
- "it is other other is a customer customer scan the lead book" is now "It's a customer, and customers can't delete books." (No names, so Ada is gone.)
- "Why 403s? I know who you are and you can do this" is now "While 403 says, I know who you are, and you can't do this."
- "Is describe a request that lacks valid authentication credential" is now "The spec describes it as a request that lacks valid authentication credentials."
- "NG's" is now "nginx [engine-x]." "504 502 bad gateway" is 502 Bad Gateway. "service are unavailable" is Service Unavailable. "an old overload" is "overloaded."
- "API C send" is "API still sends." "sign the real status code" is "send the real status code."
- "find or fill" is findOrFail. "What five of" is cut. "set up a lamp" is "set off an alarm."
- "forced in production" is "false in production." "says salary" is "says Server Error."
- "stock" is "stuck." "The first one is leaking" is "The fourth one is leaking."
- "418 and me t bot" is "418, I'm a teapot."
- Your notes to me ("we can remove that part," "why are you explaining it separately," "I don't think we need to mention the PHP-FPM part," "put the pronunciation in bracket") are removed from the script.

**Your instructions, applied**
- The five classes are explained once. After the first-digit tip, the script goes straight into the codes with "Now we'll go through each group, using our bookstore API."
- Code is never said out loud. The 201 + Location response, noContent, the validation rules, findOrFail, the 200-with-an-error response, find vs findOrFail and APP_DEBUG=false are all **[ON SCREEN: code]** directions.
- The 3xx part is rewritten. It asks two questions only (permanent or temporary, and does a POST stay a POST), uses the bookshop and an order form for the second one, and puts one table on screen.
- The line about older articles calling 422 "Unprocessable Entity" is gone.
- nginx has its pronunciation in brackets.
- PHP-FPM is gone, from the script and from every short, clip and tag.
- Mistake 2 is "using 500 for things the client got wrong" (you said 400 by slip). It keeps your find vs findOrFail example and ends with the false alarm.
- The video ends on your 418 line and "Bye." I added one on-screen line for 418 (where it comes from), so a viewer isn't lost, but you don't say it.

**Small additions for a stranger (one line each)**
- In 3xx, "many browsers do" was added after "the browser is allowed to switch," because the spec only says "allowed," and MDN says browsers commonly do it.

**What you dropped from the old script (so it's out of this kit)**
- The opening about an API saying 200 OK when the save failed (that bug now lives in mistake 1 only).
- "HTTP/1.1 is the version," "the reason phrase is there for humans," and the reason phrase not being sent in HTTP/2 and HTTP/3.
- The RFC 9110 rule that clients must understand unknown codes by their class (the 471 example).
- The whole "codes you'll actually use" list segment.
- The Laravel auto-201 detail, the spoken "if you're using Laravel" lines for 422, 404 and abort(404), throttle and Retry-After for 429, Sanctum 401, Gate 403, the Accept header, denyAsNotFound, and php artisan down for 503.
- 304 Not Modified, ETags and caching.
- "So with a 502 or a 504, check your app first."
- Quoting the Laravel docs on APP_DEBUG, and "the full details go in your logs."
- The 418 history (RFC 2324, reserved in the spec) and the comment question at the end.
- All the optional re-engagement lines. Segment 5 runs a little over 2 minutes without one, and that's your call.
- Because of these, the old clips on 304, the old "codes you'll actually use" clip, the 418 clip and short, the PHP-FPM tags, and the denyAsNotFound references are removed. A find vs findOrFail short and clips for the bookshop, the 401 name, 201, the 200 OK mistake and find vs findOrFail are new.

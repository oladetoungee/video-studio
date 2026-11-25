# What Happens When You Send an API Request? (Step by Step): Content Kit
**Version 4, rebuilt on your second 27 October read-through. Your read-through is the whole script now. I fixed the dictation slips and took out the Network tab segment, the promise of it in the open, and the slow-query line, the way you asked.**
**One click on "Place order" at shoponline.com, followed through the browser, the load balancer, the web server, your app, the checks, validation, the database and the response, and all the way back to "Order placed."**
**Facts checked against MDN, RFC 9110 and the Express and Laravel docs. Everything that changed from your read-through is in WHAT CHANGED at the end.**

---

## TAG POOL (72 tags, every tag used anywhere in this kit, deduplicated)

what happens when you send an api request, how api requests work, api request lifecycle, how an api call works, frontend to backend, how apis work, api request step by step, http request explained, http response explained, cors preflight, load balancer explained, reverse proxy explained, api routing, middleware explained, api validation, api database, 201 created, 401 vs 403, x-forwarded-for, fetch api, javascript fetch post request, backend development, web development, api tutorial, api for beginners, http status codes, gbemisola oladetoun, withgbemi, options request, why two requests network tab, cors explained, 401 unauthorized, 403 forbidden, api authentication, first request slow, connection reuse, keep alive connection, dns tcp tls, raw http request, http request format, parts of an http request, origin header, real ip behind load balancer, why is my api slow, slow query, database performance, fetch post request, request headers and body, http methods, what is an origin, http performance, nginx, tls termination, express routing, laravel routing, how routing works, rate limiting 429, 429 too many requests, rate limiting explained, api rate limit, request validation, 422 unprocessable content, 400 bad request, slow api database, sql insert, api status codes, json response, http response, access-control-allow-origin, fetch response, cors error, cors response header

## HASHTAG POOL (32 hashtags, every hashtag used anywhere in this kit)

#Shorts #webdev #api #backend #frontend #javascript #coding #programming #developer #learntocode #techtok #cors #debugging #codingtips #security #authentication #http #webperformance #networking #computerscience #devops #systemdesign #servers #nginx #database #sql #performance #nodejs #laravel #validation #webdevelopment #softwareengineering

---

## HOW THIS KIT IS BUILT

The script is your second read-through, cleaned. A customer clicks "Place order" on shoponline.com, and the video follows that one request through what it's made of, the CORS preflight and the connection, the load balancer and reverse proxy, the web server handing it to your app, routing, the token and permission checks, validation, the database, the response, and the trip back. It ends on your line, "All of that happens in about one second," and one comment question. Laravel appears once, next to Express. Code only appears on screen. You never read it out.

**QUESTIONS FOR YOU**
None.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in the first line or two, so a viewer landing anywhere (or a clip cut from it) still knows what it's about. The code blocks are on-screen graphics only. Estimated runtime is about 6 to 8 minutes at your pace.

---

**[SEGMENT 1: OPEN]**

If a user clicks "Place order" on an online shopping website, about a second later they get a confirmation that the order is placed.

In that one second, their request leaves the browser, goes through a load balancer, a web server, your app and your database, and then it comes all the way back.

In this video, we're going to follow that one API request, step by step.

---

**[SEGMENT 2: WHAT AN API REQUEST IS MADE OF]**

Every API request starts in your frontend code.

It's always made of the same few parts.

This is the fetch call behind the "Place order" button.

**[ON SCREEN: code]**
```javascript
const response = await fetch("https://api.shoponline.com/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({ product_id: 42, quantity: 2 }),
});
```

The URL is where the request is going.

The method says what we want to do.

GET is for reading something. POST is for creating something.

We are creating a new order, so it is POST.

The headers are extra information about the request.

Content-Type tells the server that the body is JSON.

Accept tells the server that we want JSON back.

Authorization carries your token. It's how the server knows that, yeah, this is this person.

And the body is the actual data.

When this leaves your browser, this is what the server actually receives.

**[ON SCREEN: code]**
```http
POST /orders HTTP/1.1
Host: api.shoponline.com
Origin: https://shoponline.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer 7f3a9c...
Content-Length: 30

{"product_id":42,"quantity":2}
```

The method, the path and the HTTP version, then the headers, one on each line, and then an empty line, and then the body.

Now, the browser added some headers by itself, like Host and Origin.

Origin tells the server which website the request came from.

**[~1:00 BEAT: the request is built. Before it even leaves, the browser might send a different request first]**

---

**[SEGMENT 3: BEFORE THE API REQUEST LEAVES THE BROWSER]**

Before your API request leaves the browser, two things can happen first.

The first thing is the CORS preflight.

Our frontend is on, for example, shoponline.com, and our API is on api.shoponline.com, so they are different origins.

**[ON SCREEN: origin = https:// + the domain + the port. shoponline.com and api.shoponline.com are different origins]**

And because we are sending JSON with an Authorization header, the browser first sends a small OPTIONS request to ask the API if this is allowed.

And the second thing that happens is the connection.

DNS turns api.shoponline.com into an IP address.

TCP opens the connection to that address, and TLS encrypts it.

But this setup usually doesn't happen on every request.

Browsers keep connections open and reuse them.

So the first API call to a server pays for the setup, and the calls after it usually skip it and go straight out.

That is one of the reasons the first request on a page often feels slower than the ones after it.

---

**[SEGMENT 4: THE LOAD BALANCER AND REVERSE PROXY]**

When your API request reaches the server side, it usually doesn't land on your app straight away.

A load balancer spreads the requests across several servers.

A reverse proxy is a server that receives the requests on behalf of your app and then passes them along.

Nginx is a common one.

**[ON SCREEN: Nginx (said "engine-x")]**

And it is also often at this point that the HTTPS encryption ends.

The load balancer decrypts the request and passes it inward to your server.

So your app sees the request coming in from the load balancer, and the real user's IP address travels in a header called X-Forwarded-For.

**[ON SCREEN: X-Forwarded-For: 102.89.x.x (the user's real IP)]**

---

**[SEGMENT 5: ROUTING]**

**[~3:00 BEAT: the request finally reaches your app, and the first job is finding the right code]**

After the load balancer, your API request gets to the web server, and the web server hands it to your app.

When your API request gets to your app, the first job is routing.

Routing means finding the code that should handle this request.

The router looks at two things, the method and the path.

Here, we have POST and /orders.

**[ON SCREEN: code]**
```javascript
// Express (Node.js)
app.post("/orders", placeOrder);
```
```php
// Laravel (PHP)
Route::post('/orders', [OrderController::class, 'store']);
```

If you're using Laravel, for example, there's one line in your routes file, and in Express it looks almost the same.

It says, when a POST comes in for /orders, run the code that places an order.

If no route matches, the request stops there, and you get a 404 Not Found.

---

**[SEGMENT 6: THE CHECKS BEFORE YOUR CODE RUNS]**

Before the code that places your order runs, your API request goes through some checks.

In a lot of frameworks, these checks are called middleware.

Think of the airport. Before you get to your gate, you go through checks, and any one of those checks can stop you.

The first check is, is this token valid?

Your app reads the token from the Authorization header and works out which user it belongs to.

If the token is missing or wrong, the request stops right there, and you get back a 401 Unauthorized.

The second check is, is this user allowed to do this?

A logged-in user can place an order for themselves, but they shouldn't be able to cancel somebody else's order.

So if they are not allowed to do this, you get a 403 Forbidden.

And in both cases, the code that places the order never actually runs.

Some apps add other checks here too, like rate limiting, which stops one user from sending too many requests in a short time.

That one comes back with a 429 Too Many Requests.

---

**[SEGMENT 7: VALIDATION]**

Once your API request passes the checks, your app validates the data, which means checking that the order makes sense.

You can't trust what comes in, because anybody can send anything to your API, even without using your website.

So your app asks things like, does product 42 exist?

Is the quantity at least one?

If someone sends a quantity of zero, or a product that doesn't exist, the request stops there.

You usually get a 400 Bad Request or a 422, depending on your framework, with a message on what is wrong.

**[ON SCREEN: code]**
```json
{
  "message": "The quantity must be at least 1.",
  "errors": {
    "quantity": ["The quantity must be at least 1."]
  }
}
```

**[ON SCREEN: the exact shape of this error depends on your framework]**

---

**[SEGMENT 8: THE DATABASE]**

If the data is fine, your API request reaches the database, and this is where the order actually gets saved.

Your app sends the database a query, something like this, saying, yo, save this order for this user.

**[ON SCREEN: code]**
```sql
select * from products where id = 42;

insert into orders (user_id, product_id, quantity)
values (3, 42, 2);
```

The database is often a separate server, so every query is a small trip from your app to the database and back.

And one request usually runs more than one query.

For this order, for example, your app might check the product and then save the order.

If one of the queries is slow, the whole request is slow, because your app cannot send the response until the work is done.

**[~6:00 BEAT: the order is saved. Now the answer has to get back to the button]**

---

**[SEGMENT 9: BUILDING THE RESPONSE]**

Once the order is saved, your app builds the response to your API request.

The response has three parts, the status code, the headers and the body.

**[ON SCREEN: code]**
```http
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: https://shoponline.com

{"id":1093,"product_id":42,"quantity":2,"status":"placed"}
```

The status code here is 201 Created, which means that the request worked and something new was created.

The body is JSON. Here, it's the new order with its ID.

---

**[SEGMENT 10: THE TRIP BACK TO THE BROWSER]**

The response to your API request travels back the same way it came, in reverse.

From your app to the web server, through the load balancer, back to the browser, over the same connection.

**[ON SCREEN: browser, load balancer, web server, your app, database, then the same arrows going back]**

Because our API is on a different origin, the browser checks one header first, Access-Control-Allow-Origin.

If it allows shoponline.com, your JavaScript can read the response.

Then your code checks that the status is a success, reads the JSON, and the button changes to "Order placed."

All of that happens in about one second.

Tell me in the comments which part of this journey was new to you.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("what happens when you send an API request," "how API requests work" and "API request lifecycle" are the phrases people type, and your URL video already ranks on the "what happens when you..." shape)
> 1. What Happens When You Send an API Request? (Step by Step) — 57
> 2. How API Requests Work, Step by Step — 35
> 3. API Request Lifecycle Explained for Beginners — 45
> 4. How an API Call Works, From the Browser to the Database — 55
> 5. Frontend to Backend: How an API Request Travels — 47
> 6. How APIs Work: One Request From Click to Database — 49
> 7. What Happens on the Server When You Call an API — 47

**CLICK-LED**
> 8. Follow One API Request From Click to Database and Back — 54
> 9. What Happens in the One Second After You Click "Buy" — 52
> 10. Everything That Happens When You Click "Place Order" — 52
> 11. One Click, One Request: The Full Journey Explained — 50
> 12. What Your Server Does While Your App Is Waiting — 47

**RECOMMENDED: 1.** It's the exact question developers search, and it mirrors your URL video ("What Happens When You Type a URL..."), so YouTube can recommend one after the other. "(Step by Step)" tells people it's a walkthrough, which is the format behind your best CTR. The video is generic, so it fits beginners whatever language they use. Thumbnail pairing: the title already says "API request," so the thumbnail shouldn't. Use the "1 CLICK" idea below.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "What Happens in the One Second After You Click "Buy"" (title 9). The video follows exactly that second. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in the same spot you always use. On the left, a "Place order" button at the top with a long winding line running down to a database cylinder at the bottom, passing a few small boxes on the way (no labels needed). The only text is "1 CLICK" in big letters near the button. Squint at it, and if you can still see "a button, a long path, a database," it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** a big "Order placed" button with a stopwatch next to it showing "1s," and no other words.

**Recording notes:**
- Shoot two takes of Segment 1 (the first 15 seconds), so you can pick the stronger one.
- Keep each code block on screen the whole time you talk through it, especially the raw request in Segment 2.
- Nginx is said "engine-x."
- The closing is a comment question inside the last point, so the edit can end cleanly after it.
- The script is about 1,200 spoken words. Your URL video script was about 2,340 words and ran about 9 and a half minutes, so expect roughly 6 to 8 minutes here. That's under the 8-minute aim for tech videos, but nothing should be padded to reach it.

**Retention beats (marked in the script):**
- ~1:00 is the end of Segment 2, where the browser might send a different request first.
- ~3:00 is the start of Segment 5, where the request reaches your app.
- ~6:00 is the end of Segment 8, where the order is saved and the answer heads back. If the video comes in nearer 6 minutes, this beat lands a little earlier.

**After publishing:**
- Post the X image post as the video goes live, and share the link with a few people who'll watch it all the way through.
- After 2 to 3 days, compare views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, check the retention graph around 1, 3 and 6 minutes. Wherever the big drop is, that's the part to tighten next time.
- Add this video to an end screen on your URL video, your status codes video and your networking basics video, and the other way round.

---

## 3. YOUTUBE DESCRIPTION

> What happens when you send an API request? In this video I follow one request from the moment someone clicks "Place order" on an online shop, through the server and the database, and back to the browser.
>
> We start with what a request is made of (the URL, the method, the headers and the body) and what the server actually receives. Then the CORS preflight and the connection, the load balancer and reverse proxy, the web server handing the request to your app, routing, the token and permission checks, validation, the database, the response with its status code, and the trip back to "Order placed."
>
> Which part of this journey was new to you?
>
> CHAPTERS (add times after editing)
> 0:00 What happens when you send an API request
> What an API request is made of
> Before the request leaves the browser (CORS preflight, DNS, TCP, TLS)
> The load balancer and reverse proxy
> Routing
> The checks before your code runs (401, 403 and 429)
> Validation
> The database
> Building the response
> The trip back to the browser
>
> RELATED VIDEOS
> HTTP status codes: [LINK]
> Cookies vs localStorage vs sessionStorage: [LINK]
> Networking basics every internet user should know: [LINK]
> What happens when you type a URL and press enter: https://youtu.be/-ynxNpYqcYI
>
> SOURCES AND FURTHER READING
> MDN, Using the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
> MDN, HTTP messages: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages
> MDN, Cross-Origin Resource Sharing (CORS): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
> MDN, X-Forwarded-For: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
> RFC 9110, HTTP Semantics (status codes): https://www.rfc-editor.org/rfc/rfc9110
> Express, Routing: https://expressjs.com/en/guide/routing.html
> Laravel, Routing: https://laravel.com/docs/routing
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (488 characters, under YouTube's 500 limit):**

what happens when you send an api request, how api requests work, api request lifecycle, how an api call works, frontend to backend, how apis work, api request step by step, http request explained, http response explained, cors preflight, load balancer explained, reverse proxy explained, api routing, middleware explained, api validation, api database, 201 created, 401 vs 403, x-forwarded-for, fetch api, javascript fetch post request, backend development, web development, api tutorial

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

You click "Place order," and about a second later it says "Order placed." This is everything that happens in that one second.

**[THE REQUEST]**

Your frontend builds the request. The URL, the method, which is POST because we're creating an order, the headers, like your Authorization token, and the body, which is the order itself.

**[ON SCREEN: code]**
```javascript
fetch("https://api.shoponline.com/orders", { method: "POST", headers, body })
```

**[THE BROWSER]**

If your API is on a different origin, the browser may send a small OPTIONS request first, to ask if this is allowed. Then it needs a connection, DNS, TCP and TLS, unless one is already open and gets reused.

**[THE SERVER SIDE]**

A load balancer spreads requests across servers, and this is often where HTTPS ends. Then the web server hands the request to your app.

**[YOUR APP]**

Your app finds the route for POST /orders. It checks your token, and sends a 401 if it's wrong, or a 403 if you're not allowed. It checks the data, and stops you if the quantity is zero.

**[THE DATABASE]**

Then it saves the order in the database. If one query is slow, the whole request is slow.

**[THE WAY BACK]**

Your app sends back a 201 Created with the order as JSON, the same way it came, and the button says "Order placed." All of that, in about one second.

**Caption:** everything that happens between clicking "place order" and seeing "order placed," from your browser to the database and back 🛒
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #frontend #javascript #coding #programming #developer #learntocode #techtok
**Tags:** what happens when you send an api request, api request lifecycle, how api requests work, frontend to backend, how apis work

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: Why you see two requests in the Network tab (25-35 sec)

You send one API request, and the Network tab shows two.

That's usually a CORS preflight.

If your website is on shoponline.com and your API is on api.shoponline.com, those are different origins.

And if you send JSON, or an Authorization header, the browser first sends a small OPTIONS request to ask the API if your real request is allowed.

If the API says yes, your real request goes out.

**Caption:** if your frontend and your API are on different origins and you send JSON or a token, the browser asks the API for permission first with an OPTIONS request 👀
full video: [LINK]
**Hashtags:** #Shorts #webdev #cors #frontend #javascript #api #coding #developer #debugging #codingtips
**Tags:** cors preflight, options request, why two requests network tab, cors explained

---

### SHORT 3: 401 vs 403 (20-30 sec)

Before your API runs the code that places an order, it does two checks.

First, is the token valid? If the token is missing or wrong, you get a 401 Unauthorized.

Second, is this user allowed to do this? A user can place their own order, but they shouldn't cancel somebody else's. If they're not allowed, you get a 403 Forbidden.

Either way, the code that places the order never runs.

**Caption:** a 401 means the API doesn't know who you are, and a 403 means it knows who you are but you're not allowed to do that 🔐
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #security #authentication #coding #developer #programming #http
**Tags:** 401 vs 403, 401 unauthorized, 403 forbidden, api authentication

---

### SHORT 4: Why the first API call is slower (20-30 sec)

The first API call on a page often feels slower than the ones after it.

That's because the first call to a server has to set up the connection. DNS finds the IP address, TCP opens the connection, and TLS encrypts it.

But browsers keep connections open and reuse them.

So the calls after it usually skip all of that and go straight out.

**Caption:** the first call to a server pays for setting up the connection, and the calls after it usually reuse it ⚡
full video: [LINK]
**Hashtags:** #Shorts #webperformance #networking #webdev #frontend #api #coding #developer #codingtips #learntocode
**Tags:** first request slow, connection reuse, keep alive connection, dns tcp tls

---

### SHORT 5: What your server actually receives (20-30 sec)

When your fetch call leaves the browser, this is what the server receives.

**[ON SCREEN: the raw POST /orders request from Segment 2]**

The first line is the method, the path and the HTTP version.

Then the headers, one on each line.

Then an empty line, and then the body.

And the browser adds some headers by itself, like Host, and Origin, which tells the server which website the request came from.

**Caption:** your fetch call turns into a method, a path, some headers, an empty line and a body. this is what the server actually reads 📦
full video: [LINK]
**Hashtags:** #Shorts #http #webdev #backend #api #javascript #coding #developer #computerscience #learntocode
**Tags:** raw http request, http request format, parts of an http request, origin header

---

### SHORT 6: Why your app sees the wrong IP address (20-30 sec)

If your app sits behind a load balancer, every request can look like it's coming from the same IP address.

That's because your app sees the request coming in from the load balancer.

The load balancer is often where HTTPS ends. It decrypts the request and passes it inward to your server.

So the real user's IP address travels in a header called X-Forwarded-For.

**Caption:** behind a load balancer, your app sees the load balancer's address, and the user's real IP comes in a header called X-Forwarded-For 🌍
full video: [LINK]
**Hashtags:** #Shorts #devops #backend #networking #systemdesign #webdev #developer #servers #coding #nginx
**Tags:** x-forwarded-for, real ip behind load balancer, load balancer explained, reverse proxy explained

---

### SHORT 7: One slow query, one slow request (20-30 sec)

Your API can't send the response until the database work is done.

And one request usually runs more than one query. To place an order, your app might check the product and then save the order.

The database is often a separate server, so every query is a small trip there and back.

So if one of those queries is slow, the whole request is slow.

**Caption:** your API waits for every database query before it can answer, so one slow query makes the whole request slow 🐢
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #performance #api #webdev #developer #coding #codingtips
**Tags:** why is my api slow, slow query, api database, database performance

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: you click "place order"
**Caption:** one click, and your request goes through a load balancer, a web server, your app and your database before it comes back.
full video: [LINK]
**Hashtags:** #Shorts #webdev #api #backend #frontend #coding #programming #developer #javascript #techtok
**Tags:** what happens when you send an api request, api request lifecycle, how apis work, frontend to backend

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** what an API request is made of
**Caption:** the URL, the method, the headers and the body, and what the server actually receives when your fetch call goes out.
full video: [LINK]
**Hashtags:** #Shorts #api #javascript #webdev #http #coding #programming #learntocode #developer
**Tags:** parts of an http request, fetch post request, request headers and body, http methods

---

### CLIP 3 — subset of Segment 2
**Starts:** "When this leaves your browser, this is what the server actually receives." **Ends:** "...which website the request came from."
**Overlay:** what your server actually receives
**Caption:** a fetch call turns into the method, the path and the HTTP version, then the headers, an empty line, and the body.
full video: [LINK]
**Hashtags:** #Shorts #http #webdev #backend #api #coding #developer #computerscience #learntocode
**Tags:** raw http request, http request format, http request explained, origin header

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** before your API request leaves the browser
**Caption:** the browser might send a CORS preflight first, and it needs a connection. DNS, TCP and TLS, unless one is already open.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cors #networking #frontend #javascript #coding #developer #api
**Tags:** cors preflight, options request, dns tcp tls, connection reuse

---

### CLIP 5 — subset of Segment 3
**Starts:** "The first thing is the CORS preflight." **Ends:** "...to ask the API if this is allowed."
**Overlay:** what a CORS preflight is
**Caption:** when your frontend and your API are on different origins and you send JSON with a token, the browser asks the API first with a small OPTIONS request.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #frontend #javascript #api #debugging #developer
**Tags:** cors preflight, options request, cors explained, what is an origin

---

### CLIP 6 — subset of Segment 3
**Starts:** "Browsers keep connections open and reuse them." **Ends:** "...feels slower than the ones after it."
**Overlay:** why the first API call is slower
**Caption:** the first call to a server pays for setting up the connection. the calls after it usually reuse it and skip that part.
full video: [LINK]
**Hashtags:** #Shorts #webperformance #networking #webdev #frontend #coding #developer #api
**Tags:** keep alive connection, connection reuse, first request slow, http performance

---

### CLIP 7 — Segment 4 (whole)
**Overlay:** load balancer vs reverse proxy
**Caption:** a load balancer spreads requests across servers, a reverse proxy receives them for your app and passes them along, and the user's real IP travels in X-Forwarded-For.
full video: [LINK]
**Hashtags:** #Shorts #devops #backend #nginx #systemdesign #webdev #developer #coding
**Tags:** load balancer explained, reverse proxy explained, x-forwarded-for, nginx

---

### CLIP 8 — subset of Segment 4
**Starts:** "And it is also often at this point that the HTTPS encryption ends." **Ends:** "...travels in a header called X-Forwarded-For."
**Overlay:** why your app sees the wrong IP address
**Caption:** behind a load balancer, your app sees the request coming from the load balancer, so the user's real IP address comes in a header called X-Forwarded-For.
full video: [LINK]
**Hashtags:** #Shorts #devops #backend #networking #systemdesign #webdev #developer #servers
**Tags:** x-forwarded-for, real ip behind load balancer, tls termination, load balancer explained

---

### CLIP 9 — Segment 5 (whole)
**Overlay:** what routing means in an API
**Caption:** the router looks at the method and the path, POST and /orders, and finds the code that should handle the request. no match gives a 404.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #nodejs #laravel #coding #developer
**Tags:** api routing, express routing, laravel routing, how routing works

---

### CLIP 10 — Segment 6 (whole)
**Overlay:** the checks before your code runs
**Caption:** before the code that places an order runs, the API checks your token and checks you're allowed. a 401 or a 403 means it stopped you there.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #security #authentication #coding #developer
**Tags:** middleware explained, api authentication, 401 vs 403, rate limiting 429

---

### CLIP 11 — subset of Segment 6
**Starts:** "The first check is, is this token valid?" **Ends:** "...the code that places the order never actually runs."
**Overlay:** 401 vs 403, explained
**Caption:** a missing or wrong token gets a 401. a logged-in user doing something they're not allowed to do gets a 403.
full video: [LINK]
**Hashtags:** #Shorts #api #http #backend #authentication #security #webdev #developer
**Tags:** 401 vs 403, 401 unauthorized, 403 forbidden, api authentication

---

### CLIP 12 — subset of Segment 6
**Starts:** "Some apps add other checks here too, like rate limiting" **Ends:** "...a 429 Too Many Requests."
**Overlay:** where a 429 comes from
**Caption:** rate limiting stops one user from sending too many requests in a short time, and it answers with a 429.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #http #security #developer #coding
**Tags:** rate limiting 429, 429 too many requests, rate limiting explained, api rate limit

---

### CLIP 13 — Segment 7 (whole)
**Overlay:** why your API validates the data
**Caption:** anybody can send anything to your API, so it checks that the product exists and the quantity makes sense before it saves anything.
full video: [LINK]
**Hashtags:** #Shorts #api #backend #webdev #validation #security #coding #developer
**Tags:** api validation, request validation, 422 unprocessable content, 400 bad request

---

### CLIP 14 — Segment 8 (whole)
**Overlay:** what happens in the database during an API request
**Caption:** the order gets saved with a query, every query is a small trip to the database and back, and one slow query makes the whole request slow.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #backend #performance #webdev #api #developer
**Tags:** api database, slow api database, database performance, sql insert

---

### CLIP 15 — subset of Segment 8
**Starts:** "And one request usually runs more than one query." **Ends:** "...until the work is done."
**Overlay:** why one slow query slows down your API
**Caption:** one request can run a few queries, and your app can't answer until all of them are done.
full video: [LINK]
**Hashtags:** #Shorts #database #sql #performance #backend #api #developer #codingtips
**Tags:** why is my api slow, slow query, api database, database performance

---

### CLIP 16 — Segment 9 (whole)
**Overlay:** what an API response is made of
**Caption:** a status code, headers and a body. a 201 Created means the request worked and something new was created.
full video: [LINK]
**Hashtags:** #Shorts #api #http #backend #webdev #coding #developer #learntocode
**Tags:** http response explained, 201 created, api status codes, json response

---

### CLIP 17 — Segment 10 (whole)
**Overlay:** how the response gets back to the browser
**Caption:** the response goes back the same way it came, the browser checks Access-Control-Allow-Origin, and then the button says "order placed."
full video: [LINK]
**Hashtags:** #Shorts #webdev #frontend #javascript #cors #api #coding #developer
**Tags:** http response, access-control-allow-origin, fetch response, how apis work

---

### CLIP 18 — subset of Segment 10
**Starts:** "Because our API is on a different origin, the browser checks one header first" **Ends:** "...your JavaScript can read the response."
**Overlay:** the header your browser checks first
**Caption:** when your API is on a different origin, your JavaScript can only read the response if Access-Control-Allow-Origin allows your site.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #frontend #javascript #api #debugging #developer
**Tags:** access-control-allow-origin, cors error, cors explained, cors response header

---

**Posting order:** 1 first (the POV), then 5 (CORS preflight), then 11 (401 vs 403), then 8 (the wrong IP), then 6 (the first call), then 15, then the rest.

---

## 6. CAPTIONS

### TikTok caption:
> you click "place order" and a second later it says "order placed." I followed that one request from the browser to the database and back 🛒
**Hashtags:** #webdev #api #backend #javascript #learntocode

### Instagram Reel caption:
> When you click a button like "Place order" on an online shop, your browser sends one API request, and about a second later you see the result.
>
> In that second, the request goes through a load balancer and a web server, and then it reaches the app. The app checks who you are and whether the order makes sense, saves it in the database, and sends the answer back the same way it came.
>
> I followed one request through all of it, step by step.
>
> Full video on YouTube, link in bio.
>
> #webdev #api #backend #javascript #learntocode

### LinkedIn caption:
> What happens between clicking "Place order" on a website and seeing "Order placed" a second later?
>
> The browser builds a request from a method, a URL, headers and a body, and if the API is on another origin, it may first send a preflight to ask whether the request is allowed.
>
> A load balancer or reverse proxy usually receives it before the application does, which is often where HTTPS ends.
>
> The web server then hands it to the application, and the router finds the code for that method and path.
>
> Checks run before that code, so a bad token returns a 401 and a user without permission gets a 403.
>
> Validation stops bad data before it reaches the database, where the order is saved and where a single slow query can slow the whole request.
>
> The response goes back the same way with a status code such as 201 Created, and the button finally says "Order placed."
>
> Full walkthrough: [LINK]
>
> #webdevelopment #softwareengineering #backend #api #http

---

## 7. X / TWITTER

**How this section is built:** one image cheat sheet (those did far better than text posts in your X research), one short tips list, one quiz with your answer as a reply later, one "can you guess" tweet, the launch tweet with the link in a reply, and single tweets that each name one situation and what happens. Everything typed lowercase like you, no arrows, no hashtags.

### THE IMAGE POST

**Tweet text:**
> what happens in the one second after you click "place order," in one picture

**Image content (one clean card in Canva, top to bottom):**
> **ONE API REQUEST, START TO FINISH**
> **1. your frontend** · method, URL, headers, body
> **2. the browser** · CORS preflight if the API is on another origin
> **3. the connection** · DNS, TCP, TLS (or reuse one that's open)
> **4. load balancer / reverse proxy** · picks a server, often ends HTTPS
> **5. web server** · hands it to your app
> **6. routing** · POST /orders finds the right code
> **7. checks** · bad token 401, not allowed 403, too many 429
> **8. validation** · bad data 400 or 422
> **9. database** · saves the order
> **10. response** · 201 Created + JSON
> **11. the trip back** · same way, button says "order placed"

**Reply:**
> I walked through every step here, with an online shop as the example: [LINK]

---

### THE TIPS LIST

> things I check when an API request fails
>
> 1. look at the status code first, it usually tells you which step stopped it
> 2. a 401 means the token is the problem, a 403 means the user isn't allowed
> 3. if you see two requests, the first one is probably a CORS preflight
> 4. a 400 or 422 means your data didn't pass validation, read the message
> 5. if every user has the same IP in your logs, look at X-Forwarded-For

**Reply:** the full journey of one request, step by step: [LINK]

---

### THE QUIZ

> your frontend is on shoponline.com and your API is on api.shoponline.com. you send a POST with a JSON body. what does the browser do first?
>
> A. sends the POST straight away
> B. sends an OPTIONS request first
> C. blocks it, they're the same website

**Your reply a few hours later:**
> it's B. those are different origins, and a JSON body isn't one of the content types allowed without asking, so the browser sends a preflight first

---

### THE "CAN YOU GUESS" TWEET

> the first API call on my page takes way longer than the next five calls to the same server. same endpoint, same data. any guesses why?

**Your reply:**
> the first call sets up the connection, DNS, TCP and TLS. the browser keeps that connection open, so the calls after it usually skip all of that

---

### THE LAUNCH TWEET

> new video. I followed one API request from the "place order" button, through the load balancer, the web server, the app and the database, and back to the browser

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if your app sits behind a load balancer and every request seems to come from the same IP, that's the load balancer's IP. the real one is in X-Forwarded-For

> a 401 means the API doesn't know who you are. a 403 means it knows who you are and you're still not allowed to do that

> your API can't send the response until the database is done, so one slow query makes the whole request slow

> you send one request and the network tab shows two. the first one is usually the browser asking your API if the real one is allowed

> anybody can send anything to your API, even without using your website. that's why your app validates the data before it saves an order

> which part of an API request did you only understand recently? for me it was the preflight

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> which part of this journey was new to you? I want to see if it's the same answer for everyone 👀

### Instagram:
> the next time an API call fails, check the status code first. it usually tells you which step stopped it.

### TikTok:
> it took me a while to get the difference between a 401 and a 403 😅

### LinkedIn:
> When an API call fails, I find it helps to walk the request through each step in order. The status code usually tells you which step stopped it.

### X (reply to your own tweet):
> if you watched my URL video, this is the same trip with a load balancer, your app and a database added on the end

### REPLIES TO EXPECT (ready to paste)

**"Not every setup has a load balancer."**
> true, a small app can go straight to one server. I said "usually" because most apps in production have something in front of them, and the rest of the steps stay the same

**"Does the preflight happen on every request?"**
> not always. the API can tell the browser to remember the answer for a while with the Access-Control-Max-Age header, so it doesn't ask every time

**"Why do I get a 422 and my friend gets a 400 for the same mistake?"**
> different frameworks pick different codes for bad data. laravel uses 422, a lot of others use 400. both mean the data you sent wasn't accepted

**"Does every request go through PHP?"**
> no, it goes to whatever your backend is written in. php, node, python, go. the steps after the web server look almost the same in all of them

**"What about HTTP/2 and HTTP/3?"**
> the request carries the same information. on HTTP/2 it travels in binary frames, and HTTP/3 runs over QUIC instead of TCP, but the journey through your app is the same

**"Where's the token coming from?"**
> usually from logging in. I talked about where to keep it in my cookies vs localStorage vs sessionStorage video

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** what happens in the one second after you click "place order"?
**Slide 2:** your frontend builds a request with a method, a URL, headers and a body.
**Slide 3:** if your API is on another origin, the browser may ask for permission first with a preflight.
**Slide 4:** the first call sets up the connection, and the calls after it usually reuse it.
**Slide 5:** a load balancer or reverse proxy usually gets the request before your app does.
**Slide 6:** the web server hands it to your app, and the router finds the code for POST /orders.
**Slide 7:** a bad token gets a 401, and a user who isn't allowed gets a 403.
**Slide 8:** your app checks the data, then saves the order in the database.
**Slide 9:** the response comes back with a 201 Created, and the button says "order placed."

**Carousel caption:**
> one API request, followed from the "place order" button to the database and back. full video on YouTube, link in bio.
>
> #webdev #api #backend #javascript #learntocode

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Following One API Request From the Click to the Database and Back

### Subtitle:
> What happens in the one second between "Place order" and "Order placed."

### SEO Title:
> What Happens When You Send an API Request? A Step by Step Guide

### SEO Description:
> One API request followed from the browser through CORS, a load balancer, a web server, routing, checks, validation and the database, and back to the button that says "Order placed."

---

When you click "Place order" on an online shop, the page usually says "Order placed" about a second later. In that second, one API request leaves your browser, travels through a few layers on the server side, reaches a database, and comes all the way back. Knowing what those layers are makes it much easier to work out what went wrong when a request fails, so I want to follow one request from a shop at shoponline.com, whose API lives at api.shoponline.com.

The request starts in the frontend. It has a URL, which says where it's going, and a method, which says what we want to do. GET is for reading something and POST is for creating something, so placing an order is a POST. It has headers, which carry extra information, like Content-Type to say the body is JSON, Accept to say we want JSON back, and Authorization to carry the user's token. And it has a body, which is the order itself. When it leaves the browser, the server receives the method, the path and the HTTP version on the first line, then the headers one per line, then an empty line, then the body. The browser adds some headers by itself, like Host and Origin, and Origin tells the server which website the request came from.

Two things can happen before the request even leaves. Because shoponline.com and api.shoponline.com are different origins, and because the request sends JSON with an Authorization header, the browser first sends a small OPTIONS request, called a CORS preflight, to ask the API whether the real request is allowed. MDN lists only three content types that can skip this step, and application/json isn't one of them. The browser also needs a connection, which means DNS to find the IP address, TCP to open the connection and TLS to encrypt it. Browsers keep connections open and reuse them, so usually only the first call to a server pays for that setup, which is one reason the first request on a page often feels slower than the rest.

On the server side, the request usually reaches a load balancer or a reverse proxy before it reaches the app. A load balancer spreads requests across several servers, and a reverse proxy receives requests on behalf of the app and passes them along. This is often where HTTPS ends, so the app sees the request coming from the load balancer, and the user's real IP address travels in a header called X-Forwarded-For. From there, a web server hands the request to the app itself.

The app first finds the code that should handle the request by looking at the method and the path, here POST and /orders, and returns a 404 if nothing matches. Then it runs some checks, which many frameworks call middleware. If the token is missing or wrong, the request stops with a 401 Unauthorized. If the token is fine but the user isn't allowed to do this, it stops with a 403 Forbidden. Either way, the code that places the order never runs. Some apps also rate limit here, and a user who sends too many requests in a short time gets a 429. If the request gets through, the app validates the data, because anybody can send anything to an API. A quantity of zero or a product that doesn't exist usually gets a 400 Bad Request or a 422, depending on the framework.

Then the order is saved in the database. The database is often on a separate server, so each query is a small trip there and back, and one request usually runs more than one. The app can't respond until that work is done, so one slow query is enough to make the whole request slow. Once the order is saved, the app sends back a response with a status code, headers and a JSON body. Here it's 201 Created, which RFC 9110 describes as a request that "has been fulfilled and has resulted in one or more new resources being created."

The response travels back the same way it came, through the web server and the load balancer, over the same connection. Because the API is on a different origin, the browser checks the Access-Control-Allow-Origin header before it lets the page's JavaScript read the response. Then the code checks that the status is a success, reads the JSON, and the button changes to "Order placed," all in about one second.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Web Development, API, Backend, JavaScript, Programming

---

## 11. REFERENCES & SOURCES

**1. The request itself (Segment 2)**
- MDN, Using the Fetch API: shows `Content-Type: application/json` set by hand for a JSON body, and the Authorization header on a fetch call. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN, HTTP messages: a request is a request line (method, request target, protocol), headers, an empty line, then an optional body. On HTTP/2 the same information travels in binary frames. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages
- Content-Length 30 is the exact length of `{"product_id":42,"quantity":2}`, which is what `JSON.stringify({ product_id: 42, quantity: 2 })` produces.
- MDN, Origin header: the browser sets it, and it says where the request came from (scheme, host and port). https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
- shoponline.com and api.shoponline.com are used as example names for a made-up shop.

**2. CORS preflight (Segment 3)**
- MDN, CORS-safelisted request header: the only safelisted headers are Accept, Accept-Language, Content-Language, Content-Type and Range, and Content-Type only counts when it's `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`. So a JSON body or an Authorization header makes a cross-origin request preflighted with OPTIONS. https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
- MDN, CORS: preflighted requests, Access-Control-Allow-Origin on the actual response, and Access-Control-Max-Age for caching the preflight answer (used in the replies). https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- MDN, Origin (glossary): two URLs have the same origin only when the scheme, host and port all match, so a subdomain is a different origin. https://developer.mozilla.org/en-US/docs/Glossary/Origin

**3. Connection setup and reuse (Segment 3)**
- MDN, Connection management in HTTP/1.x: persistent connections stay open and get reused, and HTTP/2 sends many requests over one connection. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x

**4. Load balancer, reverse proxy and X-Forwarded-For (Segment 4)**
- MDN, X-Forwarded-For: "a de-facto standard header for identifying the originating IP address of a client connecting to a web server through a proxy server." https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
- nginx, proxy module docs (Nginx as a reverse proxy, passing requests to an upstream server): https://nginx.org/en/docs/http/ngx_http_proxy_module.html
- HTTPS ending at the load balancer is said as "often," because some setups pass the encrypted traffic all the way to the app server.

**5. Routing (Segment 5)**
- Express, Routing: `app.post('/', ...)` matches by method and path. https://expressjs.com/en/guide/routing.html
- Laravel, Routing: `Route::post($uri, $callback)`. In Laravel, routes in routes/api.php get an /api prefix by default, so the on-screen comment only says "Laravel (PHP)" and doesn't name a file. https://laravel.com/docs/routing
- 404 when nothing matches is the default in both.

**6. The checks (Segment 6)**
- RFC 9110: 401 Unauthorized means the request "lacks valid authentication credentials," and 403 Forbidden means the server "understood the request but refuses to fulfill it" (sections 15.5.2 and 15.5.4). https://www.rfc-editor.org/rfc/rfc9110
- RFC 6585: 429 Too Many Requests, "the user has sent too many requests in a given amount of time." https://www.rfc-editor.org/rfc/rfc6585
- "In a lot of frameworks, these checks are called middleware" is true of Express, Laravel, Django and ASP.NET Core, and the script doesn't say every framework uses the word.

**7. Validation (Segment 7)**
- RFC 9110 defines 400 Bad Request and 422 Unprocessable Content (sections 15.5.1 and 15.5.21). Laravel returns 422 for failed validation on JSON requests. Many other frameworks and APIs use 400, so the script says "depending on your framework," and the error shape on screen is labelled as varying.

**8. The database (Segment 8)**
- The SQL is a simplified example. "Often a separate server" is hedged because small apps sometimes run the database on the same machine.

**9. The response (Segment 9)**
- RFC 9110, 201 Created: "the request has been fulfilled and has resulted in one or more new resources being created" (section 15.3.2). https://www.rfc-editor.org/rfc/rfc9110
- MDN, HTTP messages: a response is a status line, headers and a body.

**10. The trip back (Segment 10)**
- MDN, CORS: for a cross-origin request, the browser only lets your JavaScript read the response if Access-Control-Allow-Origin allows your origin. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

**11. Corrections / careful wording**
- **"Every request does DNS, TCP and TLS."** Usually only the first one to a server does. The script says "usually."
- **"The load balancer always ends HTTPS."** The script says "often."
- **"Validation errors are always 422."** Laravel uses 422, many others use 400. The script names both.
- **"Every API request has a body."** A GET usually doesn't. Your line says every request is "made of the same few parts," which holds, because the body is one of the parts even when it's empty.
- **Your slip "404 Unauthorized"** is fixed to 401 Unauthorized.

---

## NOTES

- **What's new vs version 3:** the script is now your second read-through. The Network tab segment, the promise of it in the open, and the slow-query and indexes line are gone, and so are the "does every request go through PHP?" answer and the two cross-links (cookies, networking basics), which you skipped. The video ends on "All of that happens in about one second" and a comment question. There are 10 segments, 18 clips, a main short and 6 additional shorts.
- **Cross-links:** none are said on camera now. HTTP status codes (13), cookies (14), networking basics (49) and your URL video are in the description and on end screens, and the cookies video is in one ready reply.
- **Runtime:** about 1,200 spoken words, so this is now a 6 to 8 minute video.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later.

---

## WHAT CHANGED (from your second 27 October read-through)

**Dictation fixes (your words, cleaned)**
- "your hub" and "your lab" are "your app." "The others" is "The headers." "Accept all the server" is "Accept tells the server." "Jason" is JSON.
- "the metal, the part and the HTTP versions" is "the method, the path and the HTTP version." "fetch called" is "fetch call." "and this leaves your browser" is "When this leaves your browser."
- "cost preflight" is "CORS preflight." "authorization head" is "Authorization header." "the browser that sends the browser for send a small option request" is "the browser first sends a small OPTIONS request."
- "DNS API.shop online dots com into an IP address" is "DNS turns api.shoponline.com into an IP address." "ccp" is TCP. "the call after is usually skips it and goes" is "the calls after it usually skip it and go." "ons a page often feel" is "on a page often feels."
- "server size" is "server side." "engine X" is Nginx (pronunciation on screen). "it is often it is also often" keeps "it is also often." "an header called XForded4" is "a header called X-Forwarded-For."
- "to the web to the web server" keeps one. "adds it to your app" is "hands it to your app." "undo the request. this request" is "handle this request." "the paths yeah we have posts and we have others" is "the path. Here, we have POST and /orders." "says when a post come in for orders" is "It says, when a POST comes in for /orders." "if no routes matches the request stop there" is "If no route matches, the request stops there."
- "midware" is middleware. "think of it think of the airport" keeps one. "gates" is "gate." "which users" is "which user."
- "it gets back a 404 unauthorized" is "you get back a 401 Unauthorized" (your slip, the code for this is 401). "A login user" is "A logged-in user." "if they are not allowed this" is "if they are not allowed to do this." "403 forbidding" is "403 Forbidden."
- "some app add" is "Some apps add." "which said you stops a user from sending who stops one user" is "which stops one user." "a short night short time" is "a short time." "four to nine" is 429.
- "passes the check" is "passes the checks." "you usually get a four oh four hundred bad request or four two two" is "You usually get a 400 Bad Request or a 422." "Yeah app" is "Your app." "reaches database" is "reaches the database."
- "For and one request" is "And one request." "might go, might check" keeps "might check." "the old request" is "the whole request." "until work is done" is "until the work is done."
- "views the response" is "builds the response." "the head" is "the headers." "which means that the request work" is "which means that the request worked." "the body is JSON is like is the new order" is "The body is JSON. Here, it's the new order." "the reference to your api request" is "The response to your API request."
- "shop online does come" is shoponline.com. "your javascripts" is "your JavaScript." "check that" is "checks that." "other placed" is "Order placed." "all of that This happens" is "All of that happens."
- Your notes to me ("We don't have to add that," "Or maybe we should remove this segment 12," "I think we should remove the old segment 12") are removed from the script.

**Your instructions, applied**
- Segment 12 (the Network tab and the Timing tab) is gone, and so is the promise in the open ("at the end I will show you how to see where the time went").
- The line "Very often, a slow query is searching a column that has no index" and the database indexes video mention are gone.
- The video ends on your line "All of that happens in about one second," plus one comment question: "Tell me in the comments which part of this journey was new to you."

**Small changes for accuracy or for a stranger (one line each)**
- "a confirmation that order is placed" is "a confirmation that the order is placed."
- "So post. So it is post" keeps one, "so it is POST."
- The on-screen origin explanation and the Nginx pronunciation stay on screen only.

**What you dropped from version 3 (so it's out of this kit)**
- The cookies video pointer in Segment 2 and the networking basics pointer in Segment 3.
- The whole "does every request go through PHP?" part of the old Segment 5 ("Your app is the backend code you or your team wrote," the list of languages, "the web server and your app are even the same program," "I'll just call it your app," "the steps from here look almost the same"). Your next line opens routing, so Segment 5 is now routing. The answer lives on as a ready reply in Section 8.
- "I have a full video on HTTP status codes" in the response segment.
- The whole Network tab segment and the slow-query and indexes line.
- Because of these, the "does every request go through PHP" short and clip, the Timing tab short, the four Timing tab clips, the indexes clip, the Network tab title options, the Timing-tab backup thumbnail, the Timing-tab tips and tweets, the PHP standalone tweet, and the Chrome DevTools sources are removed. New ones are an X-Forwarded-For short, a slow-query short, a 429 clip, a CORS response-header clip, and a "which part was new to you" pinned comment.

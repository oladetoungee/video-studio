# Refined kit: What happens when you send an API request, followed step by step

> **THE CURRENT KIT** for this video. Last updated: 2026-11-02 16:54. Her original kit is in archive/original-kit/ (not recorded yet).

Written 2026-11-02 by the social-strategist (rework before recording). The script is her second 27 October read-through (her kit version 4), kept with the smallest edits; only the first 30 seconds and two open-loop lines are new. Her original: `archive/original-kit/15-what-happens-when-you-send-an-api-request-kit.md`.

---

## 0. RECORDING SHEET (read this before you press record)

### 0a. Final title options (pick one before recording; the thumbnail pairs with it)
Every count checked by code. The main search words sit in the first 40 characters of every search-led title.

| # | Title | Chars | Type | Thumbnail it pairs with |
|---|---|---|---|---|
| 1 | What Happens When You Send an API Request? (Step by Step) | 57 | **recommended**, search-led | A "BROWSER → DATABASE" |
| 2 | How Does an API Work? One Request, Step by Step | 47 | search-led | A or E |
| 3 | How an API Request Works, From Click to Database | 48 | search-led | B "IN ONE SECOND" |
| 4 | API Request and Response, Explained Step by Step | 48 | search-led | D "WHAT THE SERVER SEES" |
| 5 | Frontend to Backend Flow: One API Request Explained | 51 | search-led | A |
| 6 | How APIs Work With a Database, Step by Step | 43 | search-led | F "FROM BUTTON TO DATABASE" |
| 7 | What Happens in the One Second After You Click Buy | 50 | click-led | B |
| 8 | Follow One API Request From Click to Database | 45 | click-led | A |
| 9 | Everything Your Server Does When You Click Place Order | 54 | click-led | E "API REQUEST" |
| 10 | Every Place an API Request Can Fail, Step by Step | 49 | click-led | C "WHERE IT STOPS" |
| 11 | What Your Server Does in the One Second You Wait | 48 | click-led | B |

Why title 1: it is the exact question developers type, and it mirrors your "What happens when you type a URL" video, so YouTube can recommend one after the other (your LinkedIn post on the URL video got 396 impressions, one of your better ones). "How does an API work" (title 2) is the biggest search phrase we found ("how does an api work", "how does an api work with a database" in YouTube suggestions), so it is the A/B swap.

**Thumbnail concepts** (plan, not built yet; a mix of kinds, topic in plain words, no line from the script):
- **A · photo-led, her beside the screen.** Words: **BROWSER → DATABASE**. Her seated beside the TV (or a big monitor), turned to it, palm open toward it. On the screen, huge and flat: a "Place order" button on the left, a thick dotted path through three plain boxes, ending at a database cylinder on the right. Room washed in one colour (deep blue) so it reads calm, she in full colour. Follows her own ux-research thumbnail (photo washed one colour, three big objects, one arrow) and viral sample 4 (a diagram on a board beside the person). A stranger sees "a click going to a database" and knows it is a web explainer.
- **B · flat graphic.** Words: **IN ONE SECOND**. A giant "Place order" button with a cursor clicking it, a stopwatch at "1s" beside it, a thin path running off the frame. No face (or her small cut-out in a corner, calm). Follows viral sample 2 (one object = the outcome). Pairs with "one second" titles so the pair reads "what happens in one second after a click".
- **C · faceless, status-code stamps.** Words: **WHERE IT STOPS**. The same path from button to database, with red stamp marks on it at each stop: 404, 401, 403, 422, and a green 201 at the end. Follows viral sample 3 (the framework drawn). Pairs only with title 10, where the title names the topic.
- **D · split screen.** Words: **WHAT THE SERVER SEES**. Left half: a short fetch() code window. Right half: the raw request it becomes (POST /orders, headers, body). Arrow between. Her small, closed-mouth, pointing at the right half. Follows her saved "browser bar / code card" thumbnails. For developers who search "api request and response".
- **E · topic name, her photo.** Words: **API REQUEST**, huge, tall condensed type across the top. Her in full colour holding a phone toward the lens showing "Order placed ✓". Follows her own database-indexes thumbnail (the topic name, huge) + viral sample 1 (topic words behind her head).
- **F · collage over her photo.** Words: **FROM BUTTON TO DATABASE** (big serif line) + 2 tiny labels ("load balancer", "your app"). Cut-out objects floating around her: a cursor on a button, a server rack, a database cylinder, a padlock. Follows the collage samples in `inspiration/viral-samples/collage/`.

**Test & Compare (3 strongest pairs):** title 1 with A, B and D.

### 0b. The first 30 seconds (NEW; replaces her first three lines, keeps her second line word for word)

**Exact first sentence:** "What happens when you send an API request?"

Then (her lines, then the new open loops):
> What happens when you send an API request? Say a customer clicks "Place order" on an online shop, and about a second later they get a confirmation that the order is placed.
> In that one second, their request leaves the browser, goes through a load balancer, a web server, your app and your database, and then it comes all the way back. *(her line)*
> And at almost every one of those stops, the request can be turned away, each time with a different error code. By the end of this video, you'll know which stop each error comes from. *(NEW, open loop 1, paid off in "The checks" and "Validation")*
> Before it even leaves your browser, the browser might send a completely different request first. We'll get to that. *(NEW, open loop 2, paid off in "Before the request leaves the browser")*
> So let's follow that one API request, step by step. *(her line, "In this video, we're going to" shortened)*

**On screen 0-3 s (three hooks stacked):**
- Verbal: the question above, no greeting, already mid-energy.
- Written: top title "WHAT HAPPENS WHEN YOU SEND AN API REQUEST?" (handwritten-style typed on, the kodekloud #03 look, key term "API REQUEST" in one accent colour).
- Visual + sound: on the TV beside you (or full-frame in the edit) a "Place order" button; a cursor clicks it at 0.6 s with a real mouse-click sound, and a dotted line starts running out of the button.

**Hook options (from the playbook hook library):**
1. **Plain question = the title** (#03 kodekloud, 262K): "What happens when you send an API request? Say a customer clicks..." **(our pick: it is the search phrase and it states the topic in word one).**
2. **Scenario question, "Say you..."** (#32 nandini_mpe, 6.6 % saves): "Say you click "Place order" on an online shop, and a second later it says "Order placed". What happened in that one second?"
3. **Number puzzle about an everyday act** (#25 kodekloud, 1.1M): "You click one button, and in about one second your request passes through five different places and comes back. So where does it actually go?" (five = browser, load balancer, web server, app, database).

### 0c. Format: TV / slide behind her + one running example (and motion beside her)
**Talking head with a screen behind or beside her** (playbook format "TV / slide behind her", #32 nandini_mpe), with **one running example for the whole video** (the shoponline.com "Place order" request, like kodekloud's "your online store", #03), and **motion graphics beside her** for the code and the path diagram (the kodekloud #25 style of drawing, but you stay on camera the whole time: split screen or the TV; her rule 2026-11-02, no faceless parts).
Why: this is a "class" topic with a diagram that grows step by step. The TV makes it feel like a lesson and still works at 7+ minutes (#32: 7:37, 6.6 % saves). The same diagram (browser → load balancer → web server → app → database) stays on screen, and the stop she is talking about lights up, so the viewer always knows where the request is. That map is what holds people to the end. Each new step gets its own section title (kodekloud #03: the title changes per term).
If you have no TV or big monitor: record against a plain wall with space on one side, and we put the slides in that space in the edit (half her, half the diagram).

### 0d. Recording directions
- **Where:** the living room, sitting on a stool or the arm of the sofa, **beside the TV or a big monitor** (not at your desk). If the TV is on a wall, sit to its right, as in the reference frame. Window light on your face from the side, not behind you. A plain wall or a shelf behind you is fine; avoid a busy kitchen background.
- **Sitting or standing:** sitting, turned 3/4 toward the camera, so you can turn to the screen and point.
- **Framing:** 4K landscape, wide enough to show the screen and you from the waist up. Keep about a third of the frame above your head clear and leave space on your side of the frame, so a 9:16 crop of just you (head and shoulders) still works for shorts.
- **What's on the TV:** we will send you the slides (one per step, the same path diagram with the current stop lit). If the TV can't show them, record anyway; we add them in the edit. If you film with the selfie camera, tell us, because slide text would read backwards (we mirror them first).
- **Props:** your phone with a shop's checkout page open, for the first line (hold it up on "clicks Place order").
- **Wear:** a plain top in one solid colour that is not the slide colour (avoid blue if the slides are blue).
- **Energy:** a calm teacher. Point at the screen every time you name a stop.
- **Look reference:** `inspiration/tiktok-references/32-nandini_mpe-7679413199711603998/sheet.jpg`, frame 0:24 (she sits on the right, turns and points at the merchant icon on the TV). Saved as `ideas/img/what-happens-when-you-send-an-api-request-ref.jpg`. For the inserts: `25-kodekloud-.../sheet.jpg` at 0:00 (black ground, handwritten title typing on).

### 0e. Lines to say twice, extra lines for shorts and the outro
- Say the first 30 seconds **twice**: once as written, once with hook option 2.
- Say each status-code line slowly and on its own, so it can be cut cleanly: "you get back a 401 Unauthorized", "you get a 403 Forbidden", "a 429 Too Many Requests", "a 400 Bad Request or a 422", "201 Created".
- **Extra line for the link to your URL video (say it once after the first 30 s; we decide in the edit):** "If you've watched my video on what happens when you type a URL into your browser, this is the same trip, with your app and a database added on the end."
- **Outro A (to the URL video):** "If you want the part before all of this, what happens when you type a URL into your browser and press enter, I made a whole video on it, and it's right here."
- **Outro B (to HTTP status codes, recorded, not posted yet):** "Every one of those error codes has a reason behind it, and I made a full video on HTTP status codes. It's right here."
- Keep your comment question as the last spoken line: "Tell me in the comments which part of this journey was new to you."

### 0f. Shorts to record separately (each one with its full script)

**SH1 · 401 vs 403: What's the Difference?** (25-30 s, **record separately**, standing or seated, phone at chest height, 9:16 or wide with room to crop)
YouTube Shorts title: "401 vs 403: What's the Difference?"
> A 401 and a 403 both mean your API stopped the request, for two different reasons.
> A 401 Unauthorized means the API doesn't know who you are. Your token is missing, or it's wrong.
> A 403 Forbidden means the API knows exactly who you are, and you're still not allowed to do this. Like a logged-in user trying to cancel somebody else's order.
> And in both cases, the code behind that request never runs.
> So if you get a 401, check the token. If you get a 403, check the permissions.
Recording note: hold up one finger for 401 and two for 403; we flash "401" and "403" as black phrase cards (#29 style).

We cut every other short from the long video ourselves (posting plan in section 3), so there is nothing else to record.

### 0g. Things to check before recording
| Fact in the script | Value | Source | Verified |
|---|---|---|---|
| A request is a request line, headers, an empty line, a body | as said | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages | yes (her kit, 27 Oct; standard) |
| JSON body or Authorization header makes a cross-origin request preflighted | as said | https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header | yes (her kit; MDN) |
| shoponline.com and api.shoponline.com are different origins | scheme + host + port must match | https://developer.mozilla.org/en-US/docs/Glossary/Origin | yes |
| X-Forwarded-For carries the client IP through proxies | as said | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For | yes |
| 401 = missing/invalid credentials; 403 = understood but refused | as said | https://www.rfc-editor.org/rfc/rfc9110 (15.5.2, 15.5.4) | yes |
| 429 Too Many Requests | as said | https://www.rfc-editor.org/rfc/rfc6585 | yes |
| 400 or 422 for bad data, depending on framework (Laravel 422) | as said | RFC 9110 15.5.1, 15.5.21; https://laravel.com/docs/validation | yes |
| 201 Created | as said | RFC 9110 15.3.2 | yes |
| Content-Length: 30 for `{"product_id":42,"quantity":2}` | 30 bytes | counted | yes |
| "All of that happens in about one second" | an everyday example, not a measurement | n/a | fine as a spoken example |
| News you may want to mention: HTTP got a new method, QUERY | RFC 10008, June 2026 | https://www.rfc-editor.org/rfc/rfc10008.html | yes (month); exact day UNVERIFIED |
| The URL video link | https://youtu.be/-ynxNpYqcYI | her kit | yes (her link) |

### 0h. Questions for Gbemi
1. Do you have a TV or a big monitor you can sit beside? If not, we use the half-screen layout in the edit.
2. Do you want one line about the new HTTP QUERY method (published June 2026, RFC 10008) where you explain GET and POST? Draft, only if you want it: "There's also a new method called QUERY, published this year, for reading data when the request needs a body. Browsers don't support it yet." Your call; it is not in your read-through.
3. Is the HTTP status codes video going up before this one? If yes we use Outro B; if not, Outro A.
4. Are you happy with the new open-loop lines in the first 30 s (they are mine, not yours)?

---

## 0i. SCRIPT (her read-through; smallest edits, NEW lines marked)

**[PART 1 · OPEN]** *(chapter: What happens when you send an API request)*

**[ON SCREEN 0-3 s: "Place order" button, cursor click + click sound, top title types on]**

What happens when you send an API request? *(NEW)*

Say a customer clicks "Place order" on an online shopping website, and about a second later they get a confirmation that the order is placed. *(her line, "If a user clicks" → "Say a customer clicks")*

In that one second, their request leaves the browser, goes through a load balancer, a web server, your app and your database, and then it comes all the way back.

And at almost every one of those stops, the request can be turned away, each time with a different error code. By the end of this video, you'll know which stop each error comes from. *(NEW, open loop 1)*

Before it even leaves your browser, the browser might send a completely different request first. We'll get to that. *(NEW, open loop 2)*

So let's follow that one API request, step by step.

**[OPTIONAL extra line, see 0e: the URL video link]**

---

**[PART 2 · WHAT AN API REQUEST IS MADE OF]** *(chapter: What a request is made of)*

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

**[~1:00 BEAT: the request is built. Pays off open loop 2 next]**

---

**[PART 3 · BEFORE THE API REQUEST LEAVES THE BROWSER]** *(chapter: Before it leaves the browser)*

Before your API request leaves the browser, two things can happen first.

The first thing is the CORS preflight. *(pays off open loop 2)*

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

**[PART 4 · THE LOAD BALANCER AND REVERSE PROXY]** *(chapter: Load balancer, web server and routing)*

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

**[PART 5 · ROUTING]**

**[~3:00 BEAT: the request finally reaches your app]**

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

If no route matches, the request stops there, and you get a 404 Not Found. **[ON SCREEN: first error stamp on the path map, 404 at "routing" (open loop 1 starts paying off)]**

---

**[PART 6 · THE CHECKS BEFORE YOUR CODE RUNS]** *(chapter: The checks and validation)*

Before the code that places your order runs, your API request goes through some checks.

In a lot of frameworks, these checks are called middleware.

Think of the airport. Before you get to your gate, you go through checks, and any one of those checks can stop you.

The first check is, is this token valid?

Your app reads the token from the Authorization header and works out which user it belongs to.

If the token is missing or wrong, the request stops right there, and you get back a 401 Unauthorized. **[ON SCREEN: 401 stamp]**

The second check is, is this user allowed to do this?

A logged-in user can place an order for themselves, but they shouldn't be able to cancel somebody else's order.

So if they are not allowed to do this, you get a 403 Forbidden. **[ON SCREEN: 403 stamp]**

And in both cases, the code that places the order never actually runs.

Some apps add other checks here too, like rate limiting, which stops one user from sending too many requests in a short time.

That one comes back with a 429 Too Many Requests. **[ON SCREEN: 429 stamp]**

---

**[PART 7 · VALIDATION]**

Once your API request passes the checks, your app validates the data, which means checking that the order makes sense.

You can't trust what comes in, because anybody can send anything to your API, even without using your website.

So your app asks things like, does product 42 exist?

Is the quantity at least one?

If someone sends a quantity of zero, or a product that doesn't exist, the request stops there.

You usually get a 400 Bad Request or a 422, depending on your framework, with a message on what is wrong. **[ON SCREEN: 400 / 422 stamp; the path map now shows every error stop (open loop 1 paid off)]**

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

**[PART 8 · THE DATABASE]** *(chapter: The database and the response)*

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

**[PART 9 · BUILDING THE RESPONSE]**

Once the order is saved, your app builds the response to your API request.

The response has three parts, the status code, the headers and the body.

**[ON SCREEN: code]**
```http
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: https://shoponline.com

{"id":1093,"product_id":42,"quantity":2,"status":"placed"}
```

The status code here is 201 Created, which means that the request worked and something new was created. **[ON SCREEN: green 201 at the end of the path]**

The body is JSON. Here, it's the new order with its ID.

---

**[PART 10 · THE TRIP BACK TO THE BROWSER]** *(chapter: The trip back)*

The response to your API request travels back the same way it came, in reverse.

From your app to the web server, through the load balancer, back to the browser, over the same connection.

**[ON SCREEN: browser, load balancer, web server, your app, database, then the same arrows going back]**

Because our API is on a different origin, the browser checks one header first, Access-Control-Allow-Origin.

If it allows shoponline.com, your JavaScript can read the response.

Then your code checks that the status is a success, reads the JSON, and the button changes to "Order placed."

All of that happens in about one second.

Tell me in the comments which part of this journey was new to you.

**[OUTRO A or B, see 0e; end screen to the URL video and HTTP status codes]**

---

## At a glance
| | |
|---|---|
| Topic | What happens, step by step, when a website sends an API request: browser, load balancer, web server, your app, database, and back. |
| Recommended title | What Happens When You Send an API Request? (Step by Step) (57 characters) |
| Recommended thumbnail | A "BROWSER → DATABASE" (plan, not built yet) + B "IN ONE SECOND" and D "WHAT THE SERVER SEES" for Test & Compare |
| File to upload | (plan, not built yet) `outputs/talking-head/talkinghead-full_16x9.mp4`, about 7-8 min (about 1,300 spoken words) |
| Posting order | 1. Long video  2. SH1 401 vs 403 (same day)  3. SH2 CORS preflight (day 2)  4. SH4 X-Forwarded-For (day 4)  5. SH3 first call slower (day 6)  6. LinkedIn post + X image post (day 1)  7. carousels (day 3)  8. teaser on LinkedIn and X (day 5) |
| Files | (plan, not built yet) outputs/thumbnails/, outputs/shorts/, outputs/carousels/{instagram,linkedin}/; studio http://localhost:7700/ |
| Where each platform's text is | YouTube: section 1 · Shorts, TikTok, Reels, LinkedIn and X per short: section 3 · teaser: 4 · carousels: 5 · LinkedIn post, X thread, community post, comments, essay: 6 |
| Open questions | see 0h (TV or not, QUERY line, which outro, new open-loop lines) |

## 1. YouTube

### 1a. Titles
See 0a (11 titles, counts, pairings). Recommended: title 1.

### 1b. Description
```text
What happens when you send an API request? In this video I follow one request, from the moment a customer clicks "Place order" on an online shop, through the load balancer, the web server, your app and the database, and all the way back to "Order placed".

I wanted to explain it the way I wish someone had explained it to me, with one example from start to finish. We look at what a request is made of, the CORS preflight and the connection, routing, the token and permission checks (where 401, 403 and 429 come from), validation, the database, and the response with its status code.

Which part of this journey was new to you?

CHAPTERS (times after the edit)
0:00 What happens when you send an API request
What a request is made of
Before it leaves the browser
Load balancer, web server and routing
The checks and validation
The database and the response
The trip back

RELATED VIDEOS
What happens when you type a URL and press enter: https://youtu.be/-ynxNpYqcYI
HTTP status codes: [LINK]

SOURCES AND FURTHER READING
MDN, Using the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
MDN, HTTP messages: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages
MDN, Cross-Origin Resource Sharing (CORS): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
MDN, X-Forwarded-For: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
RFC 9110, HTTP Semantics (status codes): https://www.rfc-editor.org/rfc/rfc9110
RFC 6585 (429 Too Many Requests): https://www.rfc-editor.org/rfc/rfc6585
Express, Routing: https://expressjs.com/en/guide/routing.html
Laravel, Routing: https://laravel.com/docs/routing

CONNECT WITH ME
LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
X: https://x.com/OladetounGee
Instagram: https://www.instagram.com/officialgbemmy/
Website: https://www.gbemisolaoladetoun.com/

#webdevelopment #api #backend
```

### 1c. Chapters or parts
Real chapters (the video is a sequence of clear steps), 7 broad ones, never one per segment. Times are filled in from the `.srt` of the exported file she uploads (`outputs/talking-head/talkinghead-full_16x9.mp4`), never from the raw recording.
| Chapter | Starts at the line | Time (after the edit) |
|---|---|---|
| What happens when you send an API request | "What happens when you send an API request?" | 0:00 |
| What a request is made of | "Every API request starts in your frontend code." | tbd |
| Before it leaves the browser | "Before your API request leaves the browser, two things can happen first." | tbd |
| Load balancer, web server and routing | "When your API request reaches the server side..." | tbd |
| The checks and validation | "Before the code that places your order runs..." | tbd |
| The database and the response | "If the data is fine, your API request reaches the database..." | tbd |
| The trip back | "The response to your API request travels back the same way it came..." | tbd |

### 1d. Tags (449 of 500 counted YouTube's way)
```text
what happens when you send an api request, how does an api work, api request and response, how api request works, api request step by step, frontend to backend flow, how does an api work with a database, api explained with real world example, cors preflight request, 401 vs 403, load balancer explained, reverse proxy explained, x-forwarded-for, http request explained, api for beginners, backend development, withgbemi
```

### 1e. Pinned comment
```text
Which part of this journey was new to you? For me it was the preflight, the browser asking the API for permission before the real request even goes out.
```
(Check: is the preflight really the part that was new to you? Her kit's X post said so: "for me it was the preflight".)

## 2. Thumbnails
(plan, not built yet; built from 0a once she picks the title)

### 2a. Recommended 3
| # | File | Words on it | Title it pairs with | Cold scores |
|---|---|---|---|---|
| A | (plan) | BROWSER → DATABASE | 1, 2, 5, 8 | in 7d after the central cold review |
| B | (plan) | IN ONE SECOND | 3, 7, 11 | in 7d |
| D | (plan) | WHAT THE SERVER SEES | 4 | in 7d |

### 2b. All thumbnails
| File | Words | Titles it pairs with | Note |
|---|---|---|---|
| A (plan) | BROWSER → DATABASE | 1, 2, 5, 8 | photo-led, her beside the screen, room washed one colour |
| B (plan) | IN ONE SECOND | 3, 7, 11 | flat: button + cursor + stopwatch "1s" |
| C (plan) | WHERE IT STOPS | 10 | faceless path with 404 / 401 / 403 / 422 stamps, green 201 |
| D (plan) | WHAT THE SERVER SEES | 4 | split: fetch() code → raw request |
| E (plan) | API REQUEST | 2, 9 | topic name huge; her holding a phone with "Order placed ✓" |
| F (plan) | FROM BUTTON TO DATABASE | 6 | collage over her photo: cursor, server rack, database, padlock |
Mix: 2 photo-led (A, E), 1 collage (F), 2 flat (B, C), 1 split/other (D). Build at least 20 directions from these when the video is recorded.

## 3. Shorts
Posting order (plan, not built yet): SH1 401 vs 403 → SH2 CORS preflight → SH4 X-Forwarded-For → SH3 first call slower → SH5 the whole request in 90 s → then the cut clips in the table at the end of this section. Captions in her voice; Instagram ends with "Full video on YouTube, link in bio"; YouTube Shorts descriptions end with hashtags (#Shorts first) and no "full video" line (she links the related video in YouTube itself).

### SH1 · 401 vs 403: What's the Difference?
File (plan, not built yet) · 25-30 s · label on screen "401 vs 403: What's the Difference?" · record separately (script in 0f)
Hook (first line she says): "A 401 and a 403 both mean your API stopped the request, for two different reasons."

**YouTube Shorts**
```text
401 vs 403: What's the Difference?
```
```text
A 401 means the API doesn't know who you are. A 403 means it knows who you are, and you're still not allowed to do that.
#Shorts #api #webdevelopment #backend
```
Tags (14 tags, 403 of 500 counted YouTube's way):
```text
401 vs 403, difference between 401 and 403, 401 unauthorized vs 403 forbidden, 401 unauthorized, 403 forbidden, authentication vs authorization, api authentication and authorization, http status codes explained, rest api status codes, api error codes explained, what does 401 unauthorized mean, what does 403 forbidden mean, backend development for beginners, web development
```
**TikTok**
```text
401 vs 403, because it took me a while to get the difference too 😅 A 401 means the API doesn't know who you are. A 403 means it knows exactly who you are, and you still can't do it.
#webdev #api #backend #coding #learntocode
```
**Instagram Reels**
```text
401 and 403 both mean your API said no, and the reason is different.

A 401 Unauthorized means the API doesn't know who you are. The token is missing or wrong.

A 403 Forbidden means it knows who you are, and you're still not allowed to do this, like trying to cancel somebody else's order.

Full video on YouTube, link in bio

#webdev #api #backend #coding #learntocode
```
**LinkedIn**
```text
A 401 and a 403 both mean an API stopped your request, and I still see them mixed up in code reviews and API docs.

A 401 Unauthorized means the API doesn't know who you are. The token is missing, expired or wrong, so the fix is on the authentication side.

A 403 Forbidden means the API knows exactly who you are, and you're still not allowed to do this. A logged-in user trying to cancel somebody else's order should get a 403.

In both cases the code behind the request never runs.

Which one does your API send when a token has expired?

Full Video on YouTube - [LINK]

#webdevelopment #api #backend #softwareengineering
```
(Check: "I still see them mixed up in code reviews" is my line; keep it only if true for you.)
**X**
```text
a 401 means the API doesn't know who you are. a 403 means it knows who you are and you're still not allowed to do that
```

### SH2 · Why Your API Request Shows Up Twice (CORS Preflight)
File (plan, not built yet) · 25-35 s · label "Why Your API Request Shows Up Twice (CORS Preflight)" · cut from part 3
Hook: "If you send one API request and your Network tab shows two, the first one is usually a CORS preflight."

**YouTube Shorts**
```text
Why Your API Request Shows Up Twice (CORS Preflight)
```
```text
When your website and your API are on different origins and you send JSON or a token, the browser first asks the API for permission with a small OPTIONS request.
#Shorts #cors #webdevelopment #javascript
```
Tags (14 tags, 373 of 500):
```text
cors preflight request, cors preflight request options method, why two requests in network tab, options request, what is cors, cors explained, cors error explained, access-control-allow-origin, fetch api post request, javascript fetch post request, what is an origin in web development, frontend development, web development for beginners, withgbemi
```
**TikTok**
```text
If your Network tab shows two requests when you only sent one, the first one is usually the browser asking your API for permission. It's called a CORS preflight 👀
#webdev #cors #javascript #frontend #learntocode
```
**Instagram Reels**
```text
If you send one API request and your Network tab shows two, the first one is usually a CORS preflight.

Your website on shoponline.com and your API on api.shoponline.com are different origins to the browser. When you send JSON or an Authorization header, the browser first sends a small OPTIONS request to ask the API if your real request is allowed.

Full video on YouTube, link in bio

#webdev #cors #javascript #frontend #learntocode
```
**LinkedIn**
```text
If you send one API request and your browser's Network tab shows two, the first one is usually a CORS preflight.

Your frontend on shoponline.com and your API on api.shoponline.com count as different origins, because the host is different. And a JSON body or an Authorization header is enough to make the browser ask first. So it sends a small OPTIONS request, and only when the API says yes does your real request go out.

The API can also tell the browser to remember that answer for a while, with the Access-Control-Max-Age header, so it doesn't ask every time.

Did this one confuse you too when you first saw it?

Full Video on YouTube - [LINK]

#webdevelopment #javascript #frontend #api
```
**X**
```text
you send one request and the network tab shows two. the first one is usually the browser asking your API if the real one is allowed. that's the CORS preflight
```

### SH3 · Why the First API Call on a Page Is Slower
File (plan, not built yet) · 20-30 s · label "Why the First API Call on a Page Is Slower" · cut from part 3
Hook: "The first API call on a page often feels slower than the ones after it."

**YouTube Shorts**
```text
Why the First API Call on a Page Is Slower
```
```text
The first call to a server has to set up the connection with DNS, TCP and TLS. Browsers keep that connection open, so the calls after it usually skip all of that.
#Shorts #webperformance #api #webdevelopment
```
Tags (13 tags, 361 of 500):
```text
why is the first api call slow, first api request slow, keep alive connection, http connection reuse, dns tcp tls explained, tls handshake explained, tcp handshake explained, web performance, api performance, why is my api slow, what happens when you send an api request, networking basics for developers, web development for beginners
```
**TikTok**
```text
The first API call on a page is often the slowest one, and it's not your code. The first call has to set up the connection, and the ones after it reuse it ⚡
#webdev #api #webperformance #coding #learntocode
```
**Instagram Reels**
```text
The first API call on a page often feels slower than the ones after it.

The first call to a server has to set up the connection. DNS finds the IP address, TCP opens the connection and TLS encrypts it. Browsers keep that connection open and reuse it, so the calls after it usually skip all of that.

Full video on YouTube, link in bio

#webdev #api #webperformance #coding #learntocode
```
**LinkedIn**
```text
The first API call on a page often feels slower than the ones after it, even when it hits the same endpoint with the same data.

The first call to a server pays for the connection. DNS turns the domain into an IP address, TCP opens the connection, and TLS encrypts it. Browsers keep that connection open and reuse it, so the calls after it usually go straight out.

So before you start optimising that first endpoint, check how much of its time was the connection itself. The Timing tab in your browser shows it.

Full Video on YouTube - [LINK]

#webdevelopment #webperformance #api #softwareengineering
```
**X**
```text
the first API call on my page takes longer than the next five calls to the same server. same endpoint, same data. it's the connection setup, DNS, TCP and TLS. the browser reuses it after that
```

### SH4 · X-Forwarded-For: Why Every Request Has the Same IP
File (plan, not built yet) · 20-30 s · label "X-Forwarded-For: Why Every Request Has the Same IP" · record separately or cut from part 4
Hook: "If your app sits behind a load balancer, every request can look like it's coming from the same IP address."

**YouTube Shorts**
```text
X-Forwarded-For: Why Every Request Has the Same IP
```
```text
Behind a load balancer, your app sees the load balancer's address. The user's real IP travels in a header called X-Forwarded-For.
#Shorts #backend #devops #webdevelopment
```
Tags (13 tags, 374 of 500):
```text
x-forwarded-for, x forwarded for header explained, real ip behind load balancer, load balancer explained, reverse proxy explained, load balancer vs reverse proxy, nginx reverse proxy, tls termination, get client ip address behind proxy, what happens when you send an api request, backend development for beginners, devops basics, system design basics
```
**TikTok**
```text
If every request in your logs has the same IP address, that's probably your load balancer. The user's real IP is in a header called X-Forwarded-For 🌍
#backend #devops #webdev #coding #systemdesign
```
**Instagram Reels**
```text
If your app sits behind a load balancer, every request can look like it's coming from the same IP address.

Your app sees the request coming in from the load balancer, which is often where HTTPS ends. So the real user's IP address travels in a header called X-Forwarded-For.

Full video on YouTube, link in bio

#backend #devops #webdev #coding #systemdesign
```
**LinkedIn**
```text
If your app sits behind a load balancer and every request in your logs seems to come from the same IP address, that address is the load balancer.

The load balancer, or a reverse proxy like Nginx, receives the request first. It is often where HTTPS ends, and then it passes the request inward to your server. So the user's real IP address travels in a header called X-Forwarded-For.

One thing to be careful about is that anyone can send that header, so your app should only trust it when it comes from your own proxy.

Full Video on YouTube - [LINK]

#backend #devops #webdevelopment #softwareengineering
```
**X**
```text
if your app sits behind a load balancer and every request seems to come from the same IP, that's the load balancer's IP. the real one is in X-Forwarded-For
```

### SH5 · What Happens When You Send an API Request (in 90 seconds)
File (plan, not built yet) · about 90 s · label "What Happens When You Send an API Request?" · her kit's main short; record separately or cut together from the long video
Hook: "You click "Place order", and about a second later it says "Order placed". This is everything that happens in that one second."
Script (her kit's main short, unchanged): the request (URL, POST, headers, body) → the browser (preflight, DNS, TCP, TLS unless reused) → load balancer (often where HTTPS ends) → the web server hands it to your app → routing, 401 / 403, validation → the database ("if one query is slow, the whole request is slow") → 201 Created back the same way, "Order placed".

**YouTube Shorts**
```text
What Happens When You Send an API Request?
```
```text
One click on "Place order", followed from the browser through the load balancer, the web server, your app and the database, and back to "Order placed".
#Shorts #api #webdevelopment #backend
```
Tags (14 tags, 390 of 500):
```text
what happens when you send an api request, how does an api work, api request and response, how api request works, api request step by step, frontend to backend flow, api explained with real world example, how does an api work with a database, http request explained, cors preflight request, 401 vs 403, backend development, web development for beginners, withgbemi
```
**TikTok**
```text
You click "Place order" and a second later it says "Order placed". I followed that one request from the browser to the database and back 🛒
#webdev #api #backend #javascript #learntocode
```
**Instagram Reels**
```text
When you click "Place order" on an online shop, your browser sends one API request, and about a second later you see the result.

In that second, the request goes through a load balancer and a web server, and then it reaches the app. The app checks who you are and whether the order makes sense, saves it in the database, and sends the answer back the same way it came.

Full video on YouTube, link in bio

#webdev #api #backend #javascript #learntocode
```
**LinkedIn** (the main LinkedIn post is in 6a; use this one only if SH5 is posted on its own)
```text
What happens between clicking "Place order" on a website and seeing "Order placed" a second later?

I followed one request through all of it, in 90 seconds.

Full Video on YouTube - [LINK]

#webdevelopment #api #backend #softwareengineering
```
**X**
```text
everything that happens in the one second between "place order" and "order placed", in 90 seconds
```

### Planned clips cut from the long video (her kit's clip list, labels rewritten with the topic first)
One-line caption works for TikTok, Reels (add "Full video on YouTube, link in bio") and the Shorts description (add "#Shorts #api #webdevelopment"). Full blocks get written when a clip is built.
| Clip | From → to (script lines) | Label / Shorts title | Caption |
|---|---|---|---|
| C1 | Part 1 whole | What Happens When You Send an API Request? | One click, and your request goes through a load balancer, a web server, your app and your database before it comes back. |
| C2 | Part 2 whole | What an API Request Is Made Of | The URL, the method, the headers and the body, and what the server actually receives when your fetch call goes out. |
| C3 | "When this leaves your browser..." → "...which website the request came from." | What Your Server Actually Receives | A fetch call turns into the method, the path and the HTTP version, then the headers, an empty line, and the body. |
| C4 | Part 3 whole | What Happens Before an API Request Leaves the Browser | The browser might send a CORS preflight first, and it needs a connection, DNS, TCP and TLS, unless one is already open. |
| C5 | Part 4 whole | Load Balancer vs Reverse Proxy | A load balancer spreads requests across servers, and a reverse proxy receives them for your app and passes them along. |
| C6 | Part 5 whole | What Routing Means in an API | The router looks at the method and the path, POST and /orders, and finds the code that should handle the request. No match gives a 404. |
| C7 | "Some apps add other checks here too..." → "...a 429 Too Many Requests." | Where a 429 Too Many Requests Comes From | Rate limiting stops one user from sending too many requests in a short time, and it answers with a 429. |
| C8 | Part 7 whole | Why Your API Validates the Data (400 vs 422) | Anybody can send anything to your API, so it checks that the product exists and the quantity makes sense before it saves anything. |
| C9 | Part 8 whole | Why One Slow Query Slows Down Your Whole API | Your app can't answer until every query is done, so one slow query makes the whole request slow. |
| C10 | Part 9 whole | What an API Response Is Made Of (201 Created) | A status code, headers and a body. A 201 Created means the request worked and something new was created. |
| C11 | "Because our API is on a different origin..." → "...your JavaScript can read the response." | Access-Control-Allow-Origin: the Header Your Browser Checks | When your API is on a different origin, your JavaScript can only read the response if Access-Control-Allow-Origin allows your site. |

## 4. Teaser (LinkedIn and X)
(plan, not built yet) 85-100 s cold-open montage per TEASER-PLAYBOOK: hook "What happens when you send an API request?" → the path → "the browser might send a completely different request first" → 401 / 403 → "If one of the queries is slow, the whole request is slow" → ends on a question only the full video answers ("which stop does each error come from?"). 16:9, 1:1, 4:5.

**LinkedIn**
```text
What happens when you send an API request?

I followed one request, from a customer clicking "Place order" on an online shop to the database and back, and this is a short cut of it. The part I think most developers skip is that almost every stop on the way can turn the request away with its own error code.

Full Video on YouTube - [LINK]

#webdevelopment #api #backend #softwareengineering
```
**X**
```text
what happens when you send an API request, from the "place order" button to the database and back. short version here, full video in the reply
```

## 5. Carousels
(plan, not built yet)

### 5a. Instagram
Slide 1 options: "What happens when you click 'Place order'?" · "One API request, from the button to the database and back" · "Where does a 401 come from?"
Slides (her kit): 2 the request (method, URL, headers, body) · 3 the preflight · 4 the first call sets up the connection · 5 load balancer / reverse proxy · 6 web server hands it to your app, the router finds POST /orders · 7 401 vs 403 · 8 validation, then the database · 9 201 Created, "Order placed" · 10 @WithGbemi, full video on YouTube.
```text
When you click "Place order" on an online shop, one API request leaves your browser and comes back about a second later. I followed it through every stop, from the button to the database and back, with the error code each stop can send.

Full video on YouTube, link in bio

#webdev #api #backend #javascript #learntocode
```

### 5b. LinkedIn
PDF, 1080×1350. Document title: "One API request, from the button to the database". Slide 1: "What happens when you send an API request?" Same slides as 5a.
```text
What happens when you send an API request?

I put the whole trip into a few slides, using one example from start to finish, a customer clicking "Place order" on an online shop. The slide I find most useful is the one with the error codes, because it tells you which stop turned your request away.

Full Video on YouTube - [LINK]

#webdevelopment #api #backend #softwareengineering
```

## 6. Long-form posts

### 6a. LinkedIn post (main video)
```text
What happens when you send an API request?

I made a video on what happens when you type a URL into your browser, and this one picks up where that one ends. One customer clicks "Place order" on an online shop, and I follow that request all the way to the database and back.

The browser builds the request from a method, a URL, headers and a body. If the API is on another origin, it may first send a preflight to ask whether the request is allowed.

A load balancer or reverse proxy usually receives it before the application does, and that is often where HTTPS ends. The web server then hands it to the application, and the router finds the code for that method and path.

Checks run before that code. A bad token returns a 401, and a user without permission gets a 403. Validation stops bad data before it reaches the database, where the order is saved, and where a single slow query can slow the whole request.

The response goes back the same way with a status code like 201 Created, and the button finally says "Order placed".

Which part of this journey was new to you?

Full Video on YouTube - [LINK]

#webdevelopment #softwareengineering #backend #api #http
```

### 6b. X thread
```text
1/ what happens in the one second after you click "place order", in one picture [image card below]
2/ the request is a method, a URL, headers and a body. if the API is on another origin, the browser may ask first with an OPTIONS request
3/ a load balancer usually gets it before your app does. that's often where HTTPS ends, which is why the real user IP is in X-Forwarded-For
4/ then routing, then the checks. bad token 401, not allowed 403, too many requests 429
5/ then validation (400 or 422), the database, and a 201 Created back the same way
6/ I walked through every step with one online shop as the example: [LINK]
```
Image card (her kit): ONE API REQUEST, START TO FINISH · 1 your frontend · 2 the browser (preflight) · 3 the connection (DNS, TCP, TLS or reuse) · 4 load balancer / reverse proxy · 5 web server · 6 routing · 7 checks (401, 403, 429) · 8 validation (400 or 422) · 9 database · 10 response (201 + JSON) · 11 the trip back.

### 6c. YouTube community post
```text
New video: what happens when you send an API request, followed from one "Place order" click to the database and back. Before you watch, which status code do you think you see most often in your own work? 401, 403, 404 or 422?
```

### 6d. More X posts (her kit, kept)
```text
things I check when an API request fails
1. look at the status code first, it usually tells you which step stopped it
2. a 401 means the token is the problem, a 403 means the user isn't allowed
3. if you see two requests, the first one is probably a CORS preflight
4. a 400 or 422 means your data didn't pass validation, read the message
5. if every user has the same IP in your logs, look at X-Forwarded-For
```
```text
your frontend is on shoponline.com and your API is on api.shoponline.com. you send a POST with a JSON body. what does the browser do first?
A. sends the POST straight away
B. sends an OPTIONS request first
C. blocks it, they're the same website
```
(Answer reply a few hours later: "it's B. those are different origins, and a JSON body isn't one of the content types allowed without asking, so the browser sends a preflight first")
```text
your API can't send the response until the database is done, so one slow query makes the whole request slow
```
```text
anybody can send anything to your API, even without using your website. that's why your app validates the data before it saves an order
```

### 6e. Her comments and ready replies
- Instagram: "the next time an API call fails, check the status code first. it usually tells you which step stopped it."
- TikTok: "it took me a while to get the difference between a 401 and a 403 😅"
- LinkedIn: "When an API call fails, I find it helps to walk the request through each step in order. The status code usually tells you which step stopped it."
- X (reply to own tweet): "if you watched my URL video, this is the same trip with a load balancer, your app and a database added on the end"

Ready replies (her kit, kept):
- "Not every setup has a load balancer." → "true, a small app can go straight to one server. I said "usually" because most apps in production have something in front of them, and the rest of the steps stay the same"
- "Does the preflight happen on every request?" → "not always. the API can tell the browser to remember the answer for a while with the Access-Control-Max-Age header, so it doesn't ask every time"
- "Why do I get a 422 and my friend gets a 400?" → "different frameworks pick different codes for bad data. laravel uses 422, a lot of others use 400. both mean the data you sent wasn't accepted"
- "Does every request go through PHP?" → "no, it goes to whatever your backend is written in. php, node, python, go. the steps after the web server look almost the same in all of them"
- "What about HTTP/2 and HTTP/3?" → "the request carries the same information. on HTTP/2 it travels in binary frames, and HTTP/3 runs over QUIC instead of TCP, but the journey through your app is the same"
- "What about the new QUERY method?" → "it's new this year (RFC 10008). it's for reading data when you need to send a body, like a big search filter. browsers don't support it yet, so for now it's mostly server side"
- "Where's the token coming from?" → "usually from logging in. I talked about where to keep it in my cookies vs localStorage vs sessionStorage video"

### 6f. Essay (Substack / Medium), in full
**Title:** Following One API Request From the Click to the Database and Back
**Subtitle:** What happens in the one second between "Place order" and "Order placed".
**SEO title:** What Happens When You Send an API Request? A Step by Step Guide
**SEO description:** One API request followed from the browser through CORS, a load balancer, a web server, routing, checks, validation and the database, and back to the button that says "Order placed."

When you click "Place order" on an online shop, the page usually says "Order placed" about a second later. In that second, one API request leaves your browser, travels through a few layers on the server side, reaches a database, and comes all the way back. Knowing what those layers are makes it much easier to work out what went wrong when a request fails, so I want to follow one request from a shop at shoponline.com, whose API lives at api.shoponline.com.

The request starts in the frontend. It has a URL, which says where it's going, and a method, which says what we want to do. GET is for reading something and POST is for creating something, so placing an order is a POST. It has headers, which carry extra information, like Content-Type to say the body is JSON, Accept to say we want JSON back, and Authorization to carry the user's token. And it has a body, which is the order itself. When it leaves the browser, the server receives the method, the path and the HTTP version on the first line, then the headers one per line, then an empty line, then the body. The browser adds some headers by itself, like Host and Origin, and Origin tells the server which website the request came from.

Two things can happen before the request even leaves. Because shoponline.com and api.shoponline.com are different origins, and because the request sends JSON with an Authorization header, the browser first sends a small OPTIONS request, called a CORS preflight, to ask the API whether the real request is allowed. MDN lists only three content types that can skip this step, and application/json isn't one of them. The browser also needs a connection, which means DNS to find the IP address, TCP to open the connection and TLS to encrypt it. Browsers keep connections open and reuse them, so usually only the first call to a server pays for that setup, which is one reason the first request on a page often feels slower than the rest.

On the server side, the request usually reaches a load balancer or a reverse proxy before it reaches the app. A load balancer spreads requests across several servers, and a reverse proxy receives requests on behalf of the app and passes them along. This is often where HTTPS ends, so the app sees the request coming from the load balancer, and the user's real IP address travels in a header called X-Forwarded-For. From there, a web server hands the request to the app itself.

The app first finds the code that should handle the request by looking at the method and the path, here POST and /orders, and returns a 404 if nothing matches. Then it runs some checks, which many frameworks call middleware. If the token is missing or wrong, the request stops with a 401 Unauthorized. If the token is fine but the user isn't allowed to do this, it stops with a 403 Forbidden. Either way, the code that places the order never runs. Some apps also rate limit here, and a user who sends too many requests in a short time gets a 429. If the request gets through, the app validates the data, because anybody can send anything to an API. A quantity of zero or a product that doesn't exist usually gets a 400 Bad Request or a 422, depending on the framework.

Then the order is saved in the database. The database is often on a separate server, so each query is a small trip there and back, and one request usually runs more than one. The app can't respond until that work is done, so one slow query is enough to make the whole request slow. Once the order is saved, the app sends back a response with a status code, headers and a JSON body. Here it's 201 Created, which RFC 9110 describes as a request that "has been fulfilled and has resulted in one or more new resources being created."

The response travels back the same way it came, through the web server and the load balancer, over the same connection. Because the API is on a different origin, the browser checks the Access-Control-Allow-Origin header before it lets the page's JavaScript read the response. Then the code checks that the status is a success, reads the JSON, and the button changes to "Order placed," all in about one second.

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

Medium tags: Web Development, API, Backend, JavaScript, Programming

---

## 7. Research and sources

### 7a. What is happening with the topic now
- This is an evergreen explainer; there is no news cycle around "API requests". The one recent change: the IETF published **RFC 10008, the HTTP QUERY method**, in June 2026, a safe, idempotent method for reads that need a request body; no major browser supports it yet; Node.js and Go support it server side (rfc-editor.org/rfc/rfc10008.html; InfoWorld; linuxiac). kodekloud's short on it (#09, 74K views) shows developers want to hear about it. Offered as an optional line (0h).
- Conversation developers keep having (from search suggestions): "api request failed" (often with 401 / 429), "cors preflight request options method", "401 vs 403". Those are exactly SH1, SH2 and the status-code stamps.

### 7b. What people search (YouTube and Google suggestions, fetched 2026-11-02)
- "how does an api work" (YouTube: also "how does an api work with a database", "how does api authentication work")
- "api request and response" (top YouTube completion for "api request"), "api requests explained", "how api request works"
- "api explained with real world example", "api explained for dummies"
- "frontend to backend flow", "frontend backend database explained"
- "cors preflight request", "cors preflight request options method"; "401 vs 403"
- Google: "api request lifecycle" (mostly Kubernetes and .NET results), "how api works in web application", "how api works with database"
- "what happens when you send an api request" itself returned no suggestions (low volume as a typed phrase). It stays as title 1 because it pairs with her URL video; "how does an api work" is the volume phrase (title 2 = the swap).

### 7c. Outlier videos (yt-dlp, 2026-11-02; views ÷ channel median of its last 15 uploads where we could fetch it)
| Views | Channel (subs) | Date | Title | Ratio |
|---|---|---|---|---|
| 669K | SoftsWeb (16.9K) | 2025-02-10 | API Authentication EXPLAINED! OAuth vs JWT vs API Keys | ~239× (median 2.8K) |
| 86K | Rayhan's Tech Realm (2.6K) | 2024-12-11 | REST APIs Explained (in 5 minutes) | ~36× (median 2.4K) |
| 149K | Tamara Jost (2.5K) | 2024-10-31 | Frontend, API, Backend and Database explained | ~60× subs (baseline not fetched) |
| 1.14M | Codist (62K) | 2025-09-27 | Every Type of API Simply Explained in 9 Minutes! | ~18× subs |
| 679K | Cloud X Berry (86.7K) | 2026-08-06 | MCP vs API Explained: Do We Still Need API After MCP? | ~8× subs |
| 122K | CodeHead (104K) | 2026-01-24 | FastAPI explained in 2 minutes | ~1× subs |
| 203K | ByteByteGo (1.44M) | 2025-05-15 | APIs Explained in 6 Minutes! | below channel size |
| 198K | ByteMonk (406K) | 2024-10-22 | Web Application Architecture: Full Request-Response Lifecycle | below |
| 211K | Dave's Garage (1.15M) | 2024-11-14 | How an HTTP Request Gets Served - In Great Detail | below |
| 3.0M | Aced/Exponent (512K) | 2023-05-22 | APIs Explained (in 4 Minutes) | older, evergreen |
| 1.1M TikTok | kodekloud #25 | 2026 | How do zip files shrink... (one running example) | profile top |
| 262K TikTok | kodekloud #03 | 2026 | What is a DDoS attack? (your online store) | |
What they share: the topic named plainly at the start ("APIs Explained", "Frontend, API, Backend and Database explained"), a time promise ("in 5 minutes", "in 9 minutes"), one diagram as the thumbnail (boxes and arrows, 1-3 words), and for the small-channel outliers, a beginner framing with the whole path (frontend → API → backend → database), which is exactly this video. Faces are optional; the diagram does the work.

### 7d. What worked with strangers (cold reviews)

**Central cold review (2026-11-02, a fresh reviewer who saw only titles, thumbnail words, first lines):** Title 1 + A scored 8; titles 4 and 10 8. First sentence 7 (a bare question): the Place-order line comes straight after it, so keep it. SH1, SH2 8; SH3, SH4 7.


### 7e. Changes from her kit
1. **New first 30 seconds**: the first sentence is now the title question ("What happens when you send an API request?"), "If a user clicks" became "Say a customer clicks", and two open-loop lines are added (error codes at each stop; the browser's other request). Her second line is unchanged.
2. **Open loops paid off on screen**: status-code stamps appear on the path map at 404, 401, 403, 429, 400/422 and the green 201, so the promise in the open is kept visibly.
3. **Format and directions**: TV / slide behind her with one running example, recording directions, reference frame.
4. **Titles**: her 12 options re-checked; "How Does an API Work?" added as the swap because it is the volume search; "1 CLICK" thumbnail replaced by six concepts in a mix (her "1 CLICK" alone did not name the topic for a stranger).
5. **Chapters**: 10 segments merged into 7 broad chapters (her rule: 5-7 max).
6. **Shorts**: four independent shorts written to stand alone with topic-first labels; her main short kept as SH5; her 18 clips trimmed to 11 non-overlapping clips with labels that name the topic first (her 10-26 label rules). Shorts descriptions no longer say "full video: [LINK]" (her 10-16 rule).
7. **Captions**: rewritten in her voice (first line = topic, closing question, "Full Video on YouTube - [LINK]"); Instagram ends with "Full video on YouTube, link in bio".
8. **Outros**: two outro lines added (to the URL video; to HTTP status codes).
Accuracy: nothing in her script was wrong; "about one second" stays as an example.

### 7f. Sources
- Her kit (27 Oct 2026, version 4): `archive/original-kit/15-what-happens-when-you-send-an-api-request-kit.md` (all MDN / RFC / Express / Laravel links in its section 11).
- RFC 10008, The HTTP QUERY Method, June 2026: https://www.rfc-editor.org/rfc/rfc10008.html · InfoWorld: https://www.infoworld.com/article/4196909/ietf-publishes-query-method-to-allow-safe-and-idempotent-http-requests.html · linuxiac: https://linuxiac.com/ietf-standardizes-http-query-as-proposed-standard/
- MDN Messages: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages · CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS · CORS-safelisted headers: https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header · Origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin · X-Forwarded-For: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
- RFC 9110: https://www.rfc-editor.org/rfc/rfc9110 · RFC 6585: https://www.rfc-editor.org/rfc/rfc6585
- Outliers (yt-dlp, 2026-11-02): SoftsWeb https://www.youtube.com/watch?v=GcVtElYa17s · Rayhan's Tech Realm https://www.youtube.com/watch?v=09od8C-Fd-A · Tamara Jost https://www.youtube.com/watch?v=NzEYYemQ3_8 · Codist https://www.youtube.com/watch?v=pBASqUbZgkY · Cloud X Berry https://www.youtube.com/watch?v=7yNvsFrwpp0 · CodeHead https://www.youtube.com/watch?v=umbU5Pk03CM · ByteByteGo https://www.youtube.com/watch?v=hltLrjabkiY · ByteMonk https://www.youtube.com/watch?v=xv0Be4QfkH0 · Dave's Garage https://www.youtube.com/watch?v=hWyBeEF3CqQ · Aced https://www.youtube.com/watch?v=bxuYDT-BWaI
- Search suggestions: suggestqueries.google.com (ds=yt and Google), fetched 2026-11-02, seeds listed in 7b.
- TikTok references: #32 https://www.tiktok.com/@nandini_mpe/video/7679413199711603998 · #03 https://www.tiktok.com/@kodekloud/video/7686480772315860245 · #25 https://www.tiktok.com/@kodekloud/video/7699481944286825780 · #09 https://www.tiktok.com/@kodekloud/video/7702071096496950549
- Her URL video: https://youtu.be/-ynxNpYqcYI · her LinkedIn URL post: 396 impressions (HER-VOICE.md).

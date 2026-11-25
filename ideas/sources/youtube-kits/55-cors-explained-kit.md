# CORS Explained: Why Your Fetch Request Is Blocked: Content Kit
**A from-the-beginning CORS video that opens on the moment everyone knows. Your fetch request is "blocked by CORS policy," and the exact same request works in an API client like Apidog.**
**Apidog version: you're proposing a paid sponsorship to Apidog, so every request in the video is sent from the Apidog desktop app, and there's a short sponsor read in Segment 2.**
**It builds up in order, from origins and the same-origin policy, to what CORS adds, preflight, the headers, cookies, the mistakes, and Laravel's setup. The bookstore app runs through it, with the frontend on one origin and the API on another.**
**Every segment opens with its own topic, so each one can be cut into a clip on its own.**

---

## TAG POOL (98 tags, every tag used anywhere in this kit, deduplicated)

cors, cors explained, what is cors, cors error, blocked by cors policy, how to fix cors error, cross origin resource sharing, same origin policy, access control allow origin, no access control allow origin header, cors preflight request, options request, works in postman but not in browser, cors laravel, laravel cors config, config cors php, cors credentials, cors cookies, cors wildcard, access control allow credentials, access control allow headers, access control max age, apidog, what is an origin, fetch api cors, cors mode no-cors, vite proxy cors, cors tutorial, web security, api development, backend development, web development, javascript, laravel, gbemisola oladetoun, withgbemi, cors postman, works in api client but not in browser, api client cors, why cors only in browser, cors error explained, same origin, scheme host port, cross origin request, why two requests in network tab, application json preflight, cors security, does cors protect my api, cors vs authentication, api security, opaque response, fetch no-cors, fix cors on frontend, failed to fetch cors, cors request reached server, cors response blocked, cors simple request, cors localhost, localhost cors error, different port cors, vite laravel cors, same origin policy explained, why cors exists, browser security, cross origin reads, same origin policy example, cookie security, origin header, simple request vs preflight, access control request method, what triggers cors preflight, authorization header preflight, cors preflight, network tab options, cors headers, access control allow methods, access control expose headers, cors preflight cache, preflight caching, cors performance, credentials include, common cors mistakes, cors debugging, cors fix, cors error on 500, cors error 413, cors headers missing on error, vite server proxy, dev proxy cors, laravel cors, php artisan config publish cors, laravel sanctum cors, supports credentials laravel, laravel cors cookies, laravel spa authentication, how to debug cors, cors debugging checklist, cors network tab

## HASHTAG POOL (33 hashtags, every hashtag used anywhere in this kit)

#Shorts #cors #webdev #javascript #api #backend #frontend #coding #programming #developer #laravel #apidog #ad #debugging #learntocode #http #security #cybersecurity #localhost #vite #websecurity #privacy #tech #devtools #performance #cookies #nginx #react #vue #php #sanctum #webdevelopment #softwareengineering

---

## HOW THIS KIT IS BUILT

The angle is the moment almost every developer has had. The browser blocks a fetch request, and an API client like Apidog runs the same one without complaining. The video answers that first (the browser does the check, and the request often reached your server), so the first real payoff lands before the one-minute mark. Then it builds up in order. What an origin is, the same-origin policy and why browsers need it, what CORS adds, simple requests vs preflight, the headers (all named, then the main ones explained), cookies and the star, what CORS can't protect, the common mistakes and their fixes, and Laravel's setup. It ends on a short debugging checklist and a comment question.

Everything about Laravel was checked against the current docs (Laravel 13.x) and the framework's own `config/cors.php` and `HandleCors` source. No questions for you this time. The only thing to check is the optional personal line in the pinned comment.

This is the Apidog version. Apidog replaces the API client everywhere viewers can see it, the sponsor read sits at the end of Segment 2 after the first payoff, and the disclosure lines are in Segment 1, the description, the pinned comment and every caption that names Apidog. The search phrase that names the competitor stays only in the hidden YouTube tags.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in its first lines, so section 5c can cut any of them cleanly. Code stays on screen while you talk through it. Estimated runtime is about 15 to 17 minutes at your pace.

---

**[SEGMENT 1: OPEN]**

You write a fetch request from your frontend to your API, you open the browser, and the console shows you this.

**[CODE ON SCREEN]**
```
Access to fetch at 'https://api.bookstore.com/books' from origin
'https://bookstore.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

So you copy the exact same request into an API client like Apidog, and it works. You get your books back.

**[ON SCREEN: Apidog desktop app, GET https://api.bookstore.com/books, 200 OK with the books in the response]**

In this video, I'll go through why that happens, what CORS actually is, and how to fix it properly on the server, including in Laravel.

Apidog is sponsoring this video, and it's the API client I'll use to send the requests.

---

**[SEGMENT 2: WHY IT WORKS IN AN API CLIENT BUT NOT IN THE BROWSER]**

**[NOTE FOR YOU: send every request in this video from the Apidog desktop app. The web version runs inside your browser, so it needs Apidog's browser extension or Cloud Agent to get around CORS, and the Cloud Agent can't reach localhost.]**

When a request works in an API client like Apidog but fails in the browser with a CORS error, it's because the blocking is done by your browser.

The Apidog desktop app isn't a browser. Neither is curl.

They send the request, get the response, and show it to you. They don't do this check at all.

Your browser does one extra check before it lets your JavaScript see the response.

**[~1:00 BEAT: the surprise. Most people assume the request never left]**

And for a simple GET request like this one, the request usually did reach your server.

Your server got it, ran the code, and sent back a response with your books.

The browser received that response, looked at the headers, didn't find the permission it was looking for, and refused to hand it to your JavaScript.

That's also why the error is so unhelpful from inside your code.

For security reasons, the browser doesn't tell your JavaScript what went wrong. In Chrome, your code just gets "Failed to fetch." The real reason is only in the console.

**[ON SCREEN: Apidog: sends the request, shows you the response. Browser: sends the request, checks the response headers, then decides if your JavaScript can read it]**

**[SPONSORED: Apidog]**

**[ON SCREEN: Apidog desktop app with the bookstore requests saved in one folder, then the environment switcher at the top right]**

Since Apidog is sponsoring this video, let me show you a bit more of it.

You send a request, save it, and keep all your bookstore requests together in one folder, so you're not typing them again every time.

You can also set up environments. So the same requests go to localhost while you're building, and to your live API later, and you only switch the environment.

And you can keep your API docs and your tests in the same place.

If you want to try it, the link is in the description.

**[END OF SPONSORED PART]**

So what is the browser checking for? It's checking whether your page and your API are on the same origin.

---

**[SEGMENT 3: WHAT AN ORIGIN IS]**

To understand CORS errors, you need to know what an origin is.

An origin is three things together. The scheme, the host and the port.

Take https://bookstore.com.

The scheme is https. The host is bookstore.com. And the port is 443, which is the default for https, so you don't see it written.

If any one of those three is different, it's a different origin.

**[CODE ON SCREEN]**
```
https://bookstore.com/books     same origin (only the path is different)
https://api.bookstore.com       different origin (different host)
http://bookstore.com            different origin (different scheme)
https://bookstore.com:8080      different origin (different port)
```

The path doesn't count. /books and /authors on the same site are the same origin.

In our bookstore app, the frontend is on bookstore.com, and the API is on api.bookstore.com.

They both belong to us. But to the browser, they are two different origins, because the host is different.

And you see this even more when you're working locally.

Your frontend runs on localhost port 5173, and your Laravel API runs on localhost port 8000.

Same machine, same localhost, but different ports, so they are different origins.

That's why so many people meet their first CORS error on day one of a new project.

---

**[SEGMENT 4: THE SAME-ORIGIN POLICY AND WHY BROWSERS HAVE IT]**

Browsers have a rule called the same-origin policy.

It says that JavaScript running on one origin generally can't read responses from a different origin.

**[~3:00 BEAT: the stakes. This is why the rule exists, told as something that could happen to them]**

Think about what could happen without it.

Say you're logged in to your email in one tab. Then you open some random website in another tab.

If there were no same-origin policy, that website's JavaScript could send a request to your email provider.

If your browser attached your login cookies to that request, the response would be your inbox.

And the random website could read it and send it off to its own server.

There's a second example that has nothing to do with cookies.

Your browser can reach places that a stranger on the internet can't, like your home router's settings page, or your company's internal tools that only work inside the office network.

Without the same-origin policy, any website you visit could use your browser to read those pages too.

So the same-origin policy stops a page from reading what comes back from another origin.

Sending is treated differently. A page can still send some cross-origin requests, like submitting a form to another site. What it generally can't do is read the response.

That's why, with a simple request, your request reaches the server and only the reading gets blocked.

Browsers today also have extra protections for cookies, like SameSite cookies. But the same-origin policy is the older rule, and it's the one behind your CORS error.

---

**[SEGMENT 5: WHAT CORS IS]**

So if the browser blocks cross-origin reads by default, how does our bookstore frontend ever get data from our own API?

That's what CORS is for. CORS stands for Cross-Origin Resource Sharing.

It's a way for a server to tell the browser which other origins are allowed to read its responses.

So CORS relaxes the same-origin policy, for the origins the server chooses.

And it works with headers.

When your frontend makes a cross-origin request, the browser adds an Origin header to say where the request is coming from.

**[CODE ON SCREEN]**
```http
GET /books HTTP/1.1
Host: api.bookstore.com
Origin: https://bookstore.com
```

If the server is happy for that origin to read the response, it sends back this header.

**[CODE ON SCREEN]**
```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://bookstore.com
Content-Type: application/json
```

The browser compares the two.

If the origin in that header matches your page's origin, or the header is a star, which means any origin, your JavaScript gets the response.

If the header is missing, or it names a different origin, you get the error. "No 'Access-Control-Allow-Origin' header is present on the requested resource."

So when you see that message, the browser is telling you the server didn't give permission. The fix lives on the server.

---

**[SEGMENT 6: SIMPLE REQUESTS VS PREFLIGHT REQUESTS]**

For CORS, the browser puts cross-origin requests into two groups. Simple requests, and requests that need a preflight.

A simple request goes straight to the server. The browser sends it, then checks the response headers when they come back.

A request is simple when it uses GET, HEAD or POST, it only sets a few basic headers, and if it has a Content-Type, it's one of three. Form data, multipart form data for file uploads, or plain text.

Anything outside that needs a preflight.

So a PUT, a PATCH or a DELETE needs one. Sending an Authorization header with a token needs one. And sending JSON with a Content-Type of application/json needs one too.

That last one surprises a lot of people, because most of our API calls send JSON. So a lot of the API calls a modern frontend makes get a preflight.

**[~6:00 BEAT + RE-ENGAGE, optional line: the part that explains the bugs they couldn't solve]**

And the preflight is where a lot of the confusing CORS bugs come from, so stay with me here.

A preflight is a small request the browser sends first, before your real request, to ask the server for permission. It uses the OPTIONS method.

Say our bookstore frontend wants to update a book's price.

**[CODE ON SCREEN]**
```javascript
fetch("https://api.bookstore.com/books/42", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer abc123",
  },
  body: JSON.stringify({ price: 15 }),
});
```

Before it sends this, the browser sends this.

**[CODE ON SCREEN]**
```http
OPTIONS /books/42 HTTP/1.1
Host: api.bookstore.com
Origin: https://bookstore.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: authorization, content-type
```

It's basically asking the server, can bookstore.com send you a PUT, with these two headers?

And the server answers.

**[CODE ON SCREEN]**
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://bookstore.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 7200
```

The answer has to be a success, so a status in the 200s, and the headers have to cover what the browser asked for.

Only then does the browser send the real PUT.

If the preflight fails, your real request never leaves the browser.

So when you open the Network tab and see two requests for one fetch, an OPTIONS and then your real one, that's the preflight. Nothing is wrong.

---

**[SEGMENT 7: THE MAIN CORS HEADERS]**

There are six CORS headers a server can send back.

Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Access-Control-Max-Age and Access-Control-Expose-Headers.

**[ON SCREEN: the six headers as a list, with Allow-Origin, Allow-Methods / Allow-Headers and Max-Age highlighted]**

Access-Control-Allow-Origin says which origin can read the response.

It takes one origin, or a star. You can't put a list of origins in it.

So if your API should allow both bookstore.com and admin.bookstore.com, the server looks at the Origin of each request. If that origin is on its list, it sends that one origin back.

Most CORS libraries do this for you. They also add a header called Vary: Origin, so that a cache doesn't hand a response meant for one origin to a request from another.

Access-Control-Allow-Methods and Access-Control-Allow-Headers are the answers to the preflight.

They say which methods, like PUT and DELETE, and which request headers, like Authorization or Content-Type, the server will accept from another origin.

One small thing here. If you allow headers with a star, the Authorization header still has to be listed by name.

Access-Control-Max-Age says how long, in seconds, the browser can remember the preflight answer, so it doesn't ask again before every single request.

If you don't send it, the browser only remembers for five seconds.

And browsers put a cap on it. Chrome and other Chromium browsers cap it at two hours. Firefox caps it at twenty-four hours.

Access-Control-Expose-Headers lets your JavaScript read extra response headers, like a total count header for pagination. By default, it can only read a few basic ones.

And Access-Control-Allow-Credentials is for cookies, and it comes with a stricter rule.

---

**[SEGMENT 8: CREDENTIALS, COOKIES AND WHY THE STAR DOESN'T WORK]**

By default, when your frontend calls an API on another origin, fetch doesn't send your cookies.

If your bookstore uses cookie-based login, like Laravel Sanctum does for single-page apps, you have to ask for cookies on purpose.

**[CODE ON SCREEN]**
```javascript
// fetch
fetch("https://api.bookstore.com/orders", { credentials: "include" });

// or axios
axios.defaults.withCredentials = true;
```

Once a request carries credentials, the browser gets stricter.

The server has to send Access-Control-Allow-Credentials: true.

And Access-Control-Allow-Origin has to name the exact origin. A star is not allowed.

**[CODE ON SCREEN]**
```http
Access-Control-Allow-Origin: https://bookstore.com
Access-Control-Allow-Credentials: true
```

If the server sends a star on a request that has cookies, the browser blocks the response.

The reason makes sense when you think about what the star means. The star means any website at all.

If any website could send a request with your logged-in users' cookies and read the answer, any website could read your users' private data. Their orders, their address, their account.

The same goes for methods and headers. With credentials, a star in Allow-Methods or Allow-Headers is treated as a plain star character, so you have to list them.

So if your API uses cookies, name your frontend's origin, and turn credentials on.

---

**[SEGMENT 9: WHAT CORS CAN'T DO FOR YOUR API]**

A lot of people set up CORS on their API and think it's now protected.

CORS is a set of rules that browsers follow. It only changes what a web page, running in a browser, is allowed to read.

An API client like Apidog doesn't follow those rules. Neither does curl, or a Python script, or another server.

So anyone can still call your API directly, with any Origin header they like, and your server will answer.

**[ON SCREEN: in Apidog, send GET https://api.bookstore.com/books with the header Origin: https://some-other-site.com, and the books still come back]**

Setting your allowed origins to only bookstore.com won't stop someone from calling api.bookstore.com from their terminal.

What protects your API is on the server. Authentication, checking that the user is allowed to do what they're asking for, and rate limiting.

CORS protects your users from other websites, inside their own browser.

I have a video on API authentication if you want to go deeper on that part.

---

**[SEGMENT 10: COMMON CORS MISTAKES AND HOW TO FIX THEM]**

There are a few CORS mistakes that come up over and over, so let's go through them.

The first one is trying to fix CORS from the frontend.

Chrome's error message even suggests it. It says, if an opaque response serves your needs, set the request's mode to 'no-cors'.

**[CODE ON SCREEN]**
```javascript
fetch("https://api.bookstore.com/books", { mode: "no-cors" });
// no error, but the response is opaque
// you can't read the status or the body
```

That makes the error go away, but you get back an opaque response. Your JavaScript can't read the status or the body, so for an API call, it's useless.

Another one is adding Access-Control-Allow-Origin to your request. That's a header the server sends, so putting it on your request does nothing for CORS. And because the browser doesn't count it as a basic header, it can even trigger a preflight.

And browser extensions that turn CORS off only change your own browser. Your users won't have that extension.

The fix goes on the server, because the server is the one giving permission.

**[RE-ENGAGE, optional]**

If you've been stuck on a CORS error for hours, there's a good chance it's one of the next ones.

The second mistake is using the star with cookies. If your requests send credentials, name the origin.

The third one is sneaky. Your CORS setup works, until something fails.

Say a user uploads a book cover that's too big. Your web server, like nginx, rejects it with a 413 before the request even reaches your app. Or your app is down, and the server sends back a 502 error page.

Those error responses often don't have the CORS headers, because your CORS code never ran.

So the browser shows you a CORS error, and the real problem, the 413 or the 502, is hidden behind it.

When a CORS error only happens sometimes, check the Network tab for the real status code, and check your server logs.

The fourth one is the preflight itself not being handled.

If your server sends back a 404 or a 401 for the OPTIONS request, maybe because there's no route for it, or your auth middleware runs first and rejects it, the preflight fails.

Preflight requests never carry your cookies or your token, so your server has to answer them before any login check.

And the last one is a tool a lot of people use without knowing why it works, which is a dev proxy.

If you use Vite, you can tell its dev server to forward your API calls to your backend.

**[CODE ON SCREEN]**
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
};
```

Now your frontend calls /api/books on localhost:5173, which is its own origin.

Vite forwards that request to localhost:8000 from the server side, where there's no browser and no CORS check.

This only works in development. In production, you either set up CORS properly on your API, or you serve your API from the same origin, like bookstore.com/api.

---

**[SEGMENT 11: HOW TO SET UP CORS IN LARAVEL]**

If you're using Laravel, for example, CORS support is already built in.

Laravel has a middleware called HandleCors in its global middleware stack. It runs on every request, and it answers the preflight OPTIONS requests for you.

On Laravel 11 and newer, the CORS config file isn't there by default. You publish it with this command.

**[CODE ON SCREEN]**
```bash
php artisan config:publish cors
```

On older versions, config/cors.php is already in your config folder.

This is what it looks like for our bookstore.

**[CODE ON SCREEN]**
```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://bookstore.com',
        'http://localhost:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 7200,

    'supports_credentials' => true,
];
```

paths is which routes get the CORS headers. By default, it's your api routes and Sanctum's CSRF cookie route. If a route isn't covered here, Laravel won't add the headers to it.

allowed_origins is the list of frontends allowed to read your responses. The default is a star. For our bookstore, I've put the live site and the local Vite dev server. In a real app, you'd usually read these from your .env file.

max_age is how long the browser can remember the preflight answer. The default is zero, so I've set it to two hours, which is the most Chrome will use anyway.

supports_credentials turns on Access-Control-Allow-Credentials. You turn it on if you use cookies, like with Sanctum's single-page app login.

And when it's on, make sure allowed_origins lists your real origins.

If you leave allowed_origins as a star with credentials turned on, Laravel sends back whatever origin asks. That means any website could read your logged-in users' responses.

And if you change this file and nothing happens, your config might be cached. Run php artisan config:clear, or run config:cache again in production.

---

**[SEGMENT 12: HOW TO DEBUG A CORS ERROR]**

When you see a CORS error, this is the order I'd check things in.

First, open the Network tab and find the request. If there's an OPTIONS request before it, check that one first, because if the preflight fails, your real request never went out.

Look at the status code. If it's a 404, a 401, a 413 or a 500, you have a server problem showing up as a CORS error.

Then look at the response headers. Is Access-Control-Allow-Origin there, and does it match your page's origin exactly, with the same scheme and the same port?

If you're sending cookies, is Access-Control-Allow-Credentials set to true, and does the origin header name your site?

If you're sending a custom header, or using PUT or DELETE, are those in Allow-Headers and Allow-Methods?

All of these fixes go on the server.

Tell me in the comments the strangest CORS error you've ever hit, and what it turned out to be.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("cors error," "blocked by cors policy" and "what is cors" are what people paste into search the moment they hit it)
> 1. CORS Explained: Why Your Fetch Request Is Blocked — 49
> 2. How to Fix CORS Errors (Blocked by CORS Policy) — 47
> 3. What Is CORS? Cross-Origin Resource Sharing Explained — 53
> 4. CORS Preflight Request Explained (OPTIONS Request) — 50
> 5. How to Fix CORS in Laravel (config/cors.php) — 44
> 6. Same-Origin Policy and CORS Explained for Beginners — 51
> 7. No Access-Control-Allow-Origin Header? How to Fix It — 52

**CLICK-LED**
> 8. Why Your Request Works in an API Client but Not the Browser — 59
> 9. Your Request Probably Reached the Server Anyway — 47
> 10. Why Access-Control-Allow-Origin * Breaks Your Login — 51
> 11. Stop Using mode no-cors to Fix CORS Errors — 42
> 12. CORS Won't Protect Your API From curl — 37

**RECOMMENDED: 1.** "CORS explained" is the head term and sits in the first 15 characters, and "fetch request is blocked" matches the words in the error people are staring at. It also promises exactly what the video does, which is explain the block before fixing it. 8 is the strongest click title. It uses "API client" so the sponsor's competitor isn't named anywhere viewers see, and the search phrase people type with the competitor's name lives in the hidden tags instead. It's the stretch pick below. 2 is the backup if search traffic is clearly the main source after a week. Thumbnail pairing: the title says "explained," so the thumbnail should show the problem (the browser failing next to Apidog succeeding) and not repeat any title words.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Why Your Request Works in an API Client but Not the Browser" (59). Segment 2 answers it inside the first minute, and the rest of the video explains why. Use it as the swap if title 1 underperforms.

**Thumbnail:** your face on the right, in the same spot you always use. On the left, two small windows side by side. A browser window with a red X, and an Apidog window with a green "200 OK." No other words. Squint at it, and if the red X next to the green 200 still reads, it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** the red console line "blocked by CORS policy" big across the left, with your face on the right looking at it.

**Recording notes:**
- Send every request from the Apidog desktop app, not the web version. The web version runs inside a browser and needs the extension or Apidog's Cloud Agent to get around CORS.
- When you upload, tick the paid promotion box in YouTube Studio (Details, then Show more, then Paid promotion), since Apidog is paying for this video.
- Shoot two takes of Segment 1, so you can pick the stronger one. It's about 20 seconds.
- Segments 6, 7, 10 and 11 run close to or over two minutes. Segments 6 and 10 have an optional re-engagement line marked inside them. Segment 7 is a list with the headers on screen, and Segment 11 is mostly code on screen, so both hold on their own.
- Segment 12 ends on the comment question and doesn't refer back to anything, so the edit can stop right after it.
- The script is about 2,600 spoken words with the sponsor read, which is roughly 15 to 17 minutes at your pace with code on screen. That's long, but each segment is one thing the brief asked for. If you want it shorter, Segment 7's Expose-Headers line and Segment 10's dev proxy part are the easiest cuts, and both still work as clips if you record them.

**Retention beats (marked in the script):**
- ~1:00 is inside Segment 2, at "for a simple GET request like this one, the request usually did reach your server," which is the surprise most people don't expect.
- The sponsor read adds about 30 seconds at the end of Segment 2, so the beats after it land about 30 seconds later than marked.
- ~3:00 is early in Segment 4, at the email example, where the reason for the rule becomes something that could happen to them.
- ~6:00 is inside Segment 6, at the optional line saying the preflight is where a lot of the confusing bugs come from, right before the PUT example.

**After publishing:**
- Post the X image post (the CORS headers cheat sheet) as the video goes live, and send the link to a few people who'll actually watch it all the way through.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3 and 6 minutes. Wherever the big drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> #ad This video is sponsored by Apidog, the API client I use to send the requests in it. Try it here: [APIDOG LINK]
>
> If your fetch request is "blocked by CORS policy" but the exact same request works in an API client like Apidog, this video explains why, and how to fix it on the server.
>
> I start from the beginning. What an origin is (scheme, host and port), the same-origin policy and why browsers need it, and what CORS adds on top, which is a way for your server to tell the browser which other origins can read its responses. Then simple requests vs preflight requests, the main CORS headers, why the star doesn't work once cookies are involved, and why CORS can't protect your API from API clients or curl. I also go through the common mistakes, like mode no-cors, error responses with no CORS headers, and dev proxies, and how to set CORS up in Laravel with config/cors.php. The running example is a bookstore app with the frontend on one origin and the API on another.
>
> What's the strangest CORS error you've ever hit, and what did it turn out to be?
>
> CHAPTERS (add times after editing)
> 0:00 Blocked by CORS policy, but it works in an API client
> Why it works in an API client but not the browser
> Sponsor: Apidog
> What an origin is
> The same-origin policy and why browsers have it
> What CORS is
> Simple requests vs preflight requests
> The main CORS headers
> Credentials, cookies and why the star doesn't work
> What CORS can't do for your API
> Common CORS mistakes and how to fix them
> How to set up CORS in Laravel
> How to debug a CORS error
>
> SOURCES AND FURTHER READING
> MDN, Cross-Origin Resource Sharing (CORS): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
> MDN, Same-origin policy: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
> MDN, Preflight request: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
> MDN, Access-Control-Max-Age: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age
> MDN, Access-Control-Allow-Headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers
> WHATWG Fetch Standard (where CORS is defined): https://fetch.spec.whatwg.org/
> Laravel documentation, CORS: https://laravel.com/docs/routing#cors
> Laravel documentation, Sanctum CORS and cookies: https://laravel.com/docs/sanctum#cors-and-cookies
> Vite documentation, server.proxy: https://vite.dev/config/server-options
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (485 characters, under YouTube's 500 limit):**

cors, cors explained, what is cors, cors error, blocked by cors policy, how to fix cors error, cross origin resource sharing, same origin policy, access control allow origin, no access control allow origin header, cors preflight request, options request, works in postman but not in browser, cors laravel, laravel cors config, config cors php, cors credentials, cors cookies, cors wildcard, access control allow credentials, access control allow headers, access control max age, apidog

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

Your fetch request says "blocked by CORS policy," and the exact same request works in an API client like Apidog. This is why.

**[THE BROWSER]**

The browser does the blocking. The Apidog desktop app and curl don't do this check. For a simple GET, your request usually reached the server, and the browser just wouldn't let your JavaScript read the answer.

**[ORIGIN]**

An origin is the scheme, the host and the port. So localhost:5173 and localhost:8000 are different origins.

**[SAME-ORIGIN POLICY]**

By default, a page can't read responses from another origin. Without that rule, any website you open could read your inbox in another tab, if your login cookies went along.

**[CORS]**

CORS is how a server tells the browser which other origins are allowed to read its responses.

**[CODE ON SCREEN]**
```http
Access-Control-Allow-Origin: https://bookstore.com
```

**[PREFLIGHT]**

For PUT, DELETE, an Authorization header or JSON, the browser first sends an OPTIONS request to ask permission. If that fails, your real request never goes out.

**[COOKIES]**

If you send cookies, the star doesn't work. Name the origin and send Access-Control-Allow-Credentials: true.

**[WHAT IT CAN'T DO]**

And CORS doesn't stop anyone calling your API with curl. That's the job of authentication.

**[THE FIX]**

So the fix goes on the server. In Laravel, run php artisan config:publish cors and list your frontend in allowed_origins.

**Caption:** why your fetch request gets blocked by CORS when the same request works in an API client, and where the fix actually goes 🔒
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #javascript #api #backend #frontend #coding #programming #developer #laravel
**Tags:** cors explained, blocked by cors policy, works in postman but not in browser, how to fix cors error

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: Works in an API client, fails in the browser (25-35 sec)

Your request works in an API client like Apidog and fails in the browser with a CORS error.

That's because the check is done by your browser. The Apidog desktop app isn't a browser, so it doesn't do it.

And for a simple GET request, your request usually did reach your server. The server sent back your data.

The browser looked at the response headers, didn't find permission for your page's origin, and refused to give the response to your JavaScript.

**Caption:** your request works in an API client and fails in the browser. the browser is the one doing the check, and your server probably already answered.
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #javascript #api #apidog #frontend #coding #programming #developer #debugging
**Tags:** works in postman but not in browser, cors postman, works in api client but not in browser, why cors only in browser, cors error explained

---

### SHORT 3: What an origin is (20-30 sec)

An origin is three things together. The scheme, the host and the port.

https://bookstore.com and https://api.bookstore.com are different origins, because the host is different.

http and https are different origins, because the scheme is different.

And localhost:5173 and localhost:8000 are different origins, because the port is different.

That's why your own frontend and your own API can still hit a CORS error.

**Caption:** your frontend and your API both belong to you, and the browser still treats them as two different origins. this is what an origin actually is.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cors #javascript #frontend #backend #coding #learntocode #programming #developer
**Tags:** what is an origin, same origin, scheme host port, cross origin request

---

### SHORT 4: Why sending JSON triggers a preflight (25-35 sec)

If you send JSON from your frontend to an API on another origin, your browser sends two requests.

First an OPTIONS request, then your real one.

That's because application/json isn't one of the three content types the browser counts as simple. The others are form data, multipart form data and plain text.

So the browser asks the server for permission first. That's called a preflight.

If the server doesn't answer it properly, your real request never goes out.

**Caption:** if you're seeing an OPTIONS request before every API call in your Network tab, that's a preflight, and sending JSON is enough to trigger one.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #api #javascript #http #backend #frontend #coding #developer
**Tags:** cors preflight request, options request, why two requests in network tab, application json preflight

---

### SHORT 5: Why the star breaks your login (25-35 sec)

If your API uses cookies, Access-Control-Allow-Origin can't be a star.

The browser blocks the response if a request has credentials and the server answers with a star.

The star means any website at all. If any website could send your users' cookies and read the answer, any website could read their private data.

So name your frontend's origin, and send Access-Control-Allow-Credentials: true.

**Caption:** setting Access-Control-Allow-Origin to * works until your API needs cookies. with credentials, the browser needs the exact origin.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #security #api #backend #javascript #laravel #coding #developer
**Tags:** cors credentials, cors wildcard, cors cookies, access control allow credentials

---

### SHORT 6: CORS doesn't stop curl (20-30 sec)

CORS is a set of rules that browsers follow.

An API client like Apidog doesn't follow them. Neither does curl, or a script on someone's server.

So setting your allowed origins to only your own site won't stop anyone calling your API directly.

CORS protects your users from other websites inside their browser. Protecting your API is the job of authentication, permission checks and rate limiting.

**Caption:** CORS only changes what a web page in a browser can read. anyone can still call your API with curl, so you still need real authentication 🔐
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #security #api #backend #webdev #cybersecurity #coding #developer #programming
**Tags:** cors security, does cors protect my api, cors vs authentication, api security

---

### SHORT 7: Don't use mode no-cors (20-30 sec)

When you get a CORS error, Chrome suggests setting your fetch mode to no-cors.

It makes the error go away. But you get back an opaque response, and your JavaScript can't read the status or the body.

For an API call, that's useless.

CORS is fixed on the server, because the server is the one giving permission.

**Caption:** mode no-cors makes the CORS error disappear and gives you a response you can't read. the fix goes on the server.
full video: [LINK]
**Hashtags:** #Shorts #cors #javascript #webdev #frontend #api #coding #debugging #developer #programming
**Tags:** cors mode no-cors, opaque response, fetch no-cors, fix cors on frontend

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live. Clips 1, 2 and 15 show or name Apidog, so their captions carry "#ad sponsored by Apidog." If you cut a clip that ends up showing Apidog on screen, add the same line to it.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: your fetch request gets blocked by CORS
**Caption:** the console says blocked by CORS policy, and the exact same request works in an API client like Apidog. this is the full breakdown of why.
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #javascript #frontend #api #coding #programming #developer #debugging
**Tags:** blocked by cors policy, cors error, what is cors, no access control allow origin header

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** why it works in an API client but not your browser
**Caption:** the browser does an extra check before your JavaScript can read the response. API clients like Apidog and curl don't. and in chrome your code only gets "failed to fetch," with the real reason in the console.
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #javascript #apidog #api #frontend #coding #developer #debugging
**Tags:** works in postman but not in browser, cors postman, works in api client but not in browser, failed to fetch cors, why cors only in browser

---

### CLIP 3 — subset of Segment 2
**Starts:** "And for a simple GET request like this one..." **Ends:** "...refused to hand it to your JavaScript."
**Overlay:** your request probably reached the server
**Caption:** for a simple GET, your server got the request, ran the code and sent back the data. the browser just wouldn't hand it to your JavaScript.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #javascript #api #backend #frontend #coding #developer
**Tags:** cors request reached server, cors response blocked, cors simple request, cors explained

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** what counts as the same origin
**Caption:** an origin is the scheme, the host and the port. change any one of them and it's a different origin, even if both sites are yours.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cors #frontend #backend #javascript #learntocode #coding #programming #developer
**Tags:** what is an origin, scheme host port, same origin, cross origin request

---

### CLIP 5 — subset of Segment 3
**Starts:** "Your frontend runs on localhost port 5173..." **Ends:** "...meet their first CORS error on day one of a new project."
**Overlay:** why localhost gets CORS errors
**Caption:** your frontend on localhost:5173 and your API on localhost:8000 are on the same machine, and they're still different origins because the ports are different.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #localhost #vite #laravel #javascript #coding #developer
**Tags:** cors localhost, localhost cors error, different port cors, vite laravel cors

---

### CLIP 6 — Segment 4 (whole)
**Overlay:** why browsers block cross-origin requests
**Caption:** the same-origin policy stops a page reading responses from another origin. without it, a website you open could read your data from other sites you're logged in to, and pages on your home or office network.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #cors #webdev #cybersecurity #javascript #coding #programming #developer
**Tags:** same origin policy explained, why cors exists, browser security, cross origin reads

---

### CLIP 7 — subset of Segment 4
**Starts:** "Say you're logged in to your email in one tab." **Ends:** "...send it off to its own server."
**Overlay:** what the same-origin policy protects you from
**Caption:** if there were no same-origin policy, a random website open in another tab could request your email provider and read your inbox, if your login cookies went along.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #cybersecurity #cors #webdev #privacy #tech #coding #developer
**Tags:** same origin policy example, why cors exists, browser security, cookie security

---

### CLIP 8 — Segment 5 (whole)
**Overlay:** what CORS actually is
**Caption:** CORS is a way for a server to tell the browser which other origins can read its responses. the browser sends an Origin header, and the server answers with Access-Control-Allow-Origin.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #api #backend #http #javascript #coding #programming #developer
**Tags:** cors explained, cross origin resource sharing, access control allow origin, origin header

---

### CLIP 9 — Segment 6 (whole)
**Overlay:** simple requests vs preflight requests
**Caption:** some cross-origin requests go straight to the server. others make the browser send an OPTIONS request first to ask permission. this is how the browser decides, with a real example.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #api #http #backend #javascript #coding #programming #developer
**Tags:** cors preflight request, simple request vs preflight, options request, access control request method

---

### CLIP 10 — subset of Segment 6
**Starts:** "So a PUT, a PATCH or a DELETE needs one." **Ends:** "...a modern frontend makes get a preflight."
**Overlay:** what triggers a CORS preflight
**Caption:** PUT, PATCH, DELETE, an Authorization header, or a Content-Type of application/json. any one of them means the browser asks permission first.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #api #http #javascript #backend #coding #developer
**Tags:** what triggers cors preflight, application json preflight, authorization header preflight, options request

---

### CLIP 11 — subset of Segment 6
**Starts:** "So when you open the Network tab and see two requests for one fetch..." **Ends:** "...Nothing is wrong."
**Overlay:** why one fetch shows two requests
**Caption:** an OPTIONS request and then your real one, for a single fetch call. that first one is the preflight.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #devtools #javascript #frontend #debugging #coding #developer
**Tags:** why two requests in network tab, options request, cors preflight, network tab options

---

### CLIP 12 — Segment 7 (whole)
**Overlay:** the main CORS headers, explained
**Caption:** Allow-Origin, Allow-Methods, Allow-Headers, Allow-Credentials, Max-Age and Expose-Headers. what each one does, and the small rules that catch people out.
full video: [LINK]
**Hashtags:** #Shorts #cors #http #webdev #api #backend #coding #programming #developer
**Tags:** cors headers, access control allow methods, access control allow headers, access control expose headers

---

### CLIP 13 — subset of Segment 7
**Starts:** "Access-Control-Max-Age says how long..." **Ends:** "...Firefox caps it at twenty-four hours."
**Overlay:** how long the browser remembers a preflight
**Caption:** without Access-Control-Max-Age, the browser only remembers the preflight answer for five seconds. chromium browsers cap it at two hours, firefox at twenty-four.
full video: [LINK]
**Hashtags:** #Shorts #cors #http #webdev #performance #api #backend #developer
**Tags:** access control max age, cors preflight cache, preflight caching, cors performance

---

### CLIP 14 — Segment 8 (whole)
**Overlay:** CORS with cookies
**Caption:** fetch doesn't send cookies to another origin unless you ask. and once it does, the server has to name the exact origin and send Access-Control-Allow-Credentials: true.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #cookies #javascript #api #backend #laravel #coding #developer
**Tags:** cors credentials, cors cookies, credentials include, access control allow credentials

---

### CLIP 15 — Segment 9 (whole)
**Overlay:** does CORS protect your API?
**Caption:** CORS is a set of rules browsers follow. API clients like Apidog, curl and scripts don't follow them, so your API still needs authentication, permission checks and rate limiting.
#ad sponsored by Apidog
full video: [LINK]
**Hashtags:** #Shorts #cors #security #api #backend #webdev #cybersecurity #coding #developer
**Tags:** does cors protect my api, cors security, cors vs authentication, api security

---

### CLIP 16 — Segment 10 (whole)
**Overlay:** common CORS mistakes and how to fix them
**Caption:** trying to fix it on the frontend, the star with cookies, error responses with no CORS headers, preflights that hit auth, and what a dev proxy is doing for you.
full video: [LINK]
**Hashtags:** #Shorts #cors #webdev #debugging #javascript #api #backend #coding #developer #programming
**Tags:** how to fix cors error, common cors mistakes, cors debugging, cors fix

---

### CLIP 17 — subset of Segment 10
**Starts:** "The first one is trying to fix CORS from the frontend." **Ends:** "...because the server is the one giving permission."
**Overlay:** why mode no-cors doesn't fix CORS
**Caption:** no-cors makes the error disappear and hands you an opaque response you can't read. adding Access-Control-Allow-Origin to your request doesn't help either.
full video: [LINK]
**Hashtags:** #Shorts #cors #javascript #webdev #frontend #debugging #coding #developer
**Tags:** cors mode no-cors, opaque response, fix cors on frontend, fetch no-cors

---

### CLIP 18 — subset of Segment 10
**Starts:** "The third one is sneaky." **Ends:** "...and check your server logs."
**Overlay:** when a CORS error is hiding a different error
**Caption:** if nginx rejects an upload with a 413, or your app is down and you get a 502, that response often has no CORS headers. so the browser shows a CORS error instead of the real one.
full video: [LINK]
**Hashtags:** #Shorts #cors #debugging #webdev #nginx #backend #api #coding #developer
**Tags:** cors error on 500, cors error 413, cors headers missing on error, cors debugging

---

### CLIP 19 — subset of Segment 10
**Starts:** "And the last one is a tool a lot of people use without knowing why it works..." **Ends:** "...like bookstore.com/api."
**Overlay:** how a Vite proxy gets around CORS
**Caption:** your frontend calls its own origin, and the Vite dev server forwards the request to your API from the server side, where there's no CORS check. it only works in development.
full video: [LINK]
**Hashtags:** #Shorts #vite #cors #javascript #webdev #frontend #react #vue #coding #developer
**Tags:** vite proxy cors, vite server proxy, dev proxy cors, cors localhost

---

### CLIP 20 — Segment 11 (whole)
**Overlay:** how to set up CORS in Laravel
**Caption:** HandleCors is already in Laravel's global middleware. on Laravel 11 and newer you publish config/cors.php with one command, then set paths, allowed origins and credentials.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #cors #backend #webdev #api #coding #developer #programming
**Tags:** laravel cors, laravel cors config, config cors php, php artisan config publish cors

---

### CLIP 21 — subset of Segment 11
**Starts:** "supports_credentials turns on Access-Control-Allow-Credentials." **Ends:** "...any website could read your logged-in users' responses."
**Overlay:** Laravel CORS with Sanctum cookies
**Caption:** turn on supports_credentials for Sanctum's single-page app login, and list your real origins. a star with credentials on means Laravel echoes back whatever origin asks.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #cors #sanctum #security #backend #webdev #developer
**Tags:** laravel sanctum cors, supports credentials laravel, laravel cors cookies, laravel spa authentication

---

### CLIP 22 — Segment 12 (whole)
**Overlay:** how to debug a CORS error
**Caption:** check the OPTIONS request first, then the status code, then the response headers. all the fixes go on the server.
full video: [LINK]
**Hashtags:** #Shorts #cors #debugging #webdev #devtools #api #javascript #coding #developer
**Tags:** how to debug cors, cors debugging checklist, cors network tab, how to fix cors error

---

**Posting order:** 2 first (the "works in my API client, fails in the browser" confusion is the most relatable moment), then 10 (what triggers a preflight), then 7 (the inbox example), then 17 (no-cors), then 18 (the hidden 413 or 502), then 15 (does CORS protect your API, which pulls comments), then 20 for the Laravel audience on its own day.

---

## 6. CAPTIONS

### TikTok caption:
> your fetch request is blocked by CORS and the same request works in an API client like Apidog 😭 this is what the browser is checking, and where the fix goes. sponsored by Apidog.
**Hashtags:** #ad #cors #webdev #javascript #coding #learntocode

### Instagram Reel caption:
> If your fetch request gets blocked by CORS while the exact same request works in an API client like Apidog, it's because your browser is doing a check that API clients don't do.
>
> Browsers don't let a page read responses from a different origin unless the server says that origin is allowed. An origin is the scheme, the host and the port together, so even localhost:5173 and localhost:8000 count as two different ones.
>
> In the full video I go through preflight requests, the CORS headers, why the star stops working once cookies are involved, and how to set it up in Laravel.
>
> Full video on YouTube, link in bio. This video is sponsored by Apidog.
>
> #ad #cors #webdev #javascript #backend #learntocode

### LinkedIn caption:
> Why does a request that works in an API client like Apidog fail in the browser with a CORS error?
>
> Browsers follow the same-origin policy, which stops a page from reading responses from a different origin, meaning a different scheme, host or port.
>
> CORS lets a server relax that rule for the origins it chooses, by sending headers such as Access-Control-Allow-Origin.
>
> For requests that use methods like PUT or DELETE, an Authorization header, or JSON, the browser first sends an OPTIONS preflight to ask permission, and the real request only goes out if the server's answer allows it.
>
> When cookies are involved, the server has to name the exact origin and send Access-Control-Allow-Credentials, because a wildcard would let any website read a logged-in user's data.
>
> And since API clients and curl don't follow these rules at all, CORS protects users inside their browser while the API itself still needs authentication.
>
> Full walkthrough (sponsored by Apidog): [LINK]
>
> #ad #webdevelopment #softwareengineering #api #javascript #laravel

---

## 7. X / TWITTER

**The approach, same as the database indexes kit.** One image cheat sheet (the format that got about 62K views in your search, against a few hundred for text tweets), one short tips list, one quiz you answer in a reply later, one "can you guess," the launch tweet with the link in a reply, and single tweets that each name one situation and what happens. Everything is lowercase like you type, with no arrows and no hashtags.

### THE IMAGE POST

**Tweet text:**
> the CORS headers, and what each one actually does 👇

**Image content (one clean card in Canva):**
> **CORS HEADERS CHEAT SHEET**
> **Access-Control-Allow-Origin** · which origin can read the response · one origin or * · no * with cookies
> **Access-Control-Allow-Methods** · which methods are allowed, like PUT and DELETE · answers the preflight
> **Access-Control-Allow-Headers** · which request headers are allowed · Authorization must be listed by name
> **Access-Control-Allow-Credentials** · true if cookies are allowed · needs an exact origin
> **Access-Control-Max-Age** · how long the browser remembers the preflight · default 5s · Chrome caps it at 2h
> **Access-Control-Expose-Headers** · which response headers your JavaScript can read
> **Origin = scheme + host + port**
> **Preflight = an OPTIONS request sent before PUT, DELETE, JSON or custom headers**

**Reply:**
> I went through all of these from the beginning here: [LINK]

---

### THE TIPS LIST

> CORS things I wish someone had told me earlier
>
> 1. your request works in an API client like apidog because only your browser does the CORS check
> 2. sending JSON is enough to trigger a preflight
> 3. if you send cookies, Access-Control-Allow-Origin can't be *
> 4. mode no-cors gives you a response you can't read
> 5. a 500 or 413 with no CORS headers shows up as a CORS error
> 6. CORS doesn't stop anyone calling your API with curl
>
> (the video is sponsored by apidog)

**Reply:** full video on all of these: [LINK]

---

### THE QUIZ

> which of these cross-origin requests does NOT trigger a CORS preflight?
>
> A. a POST with Content-Type: application/json
> B. a GET with no custom headers
> C. a DELETE
> D. a GET with an Authorization header

**Your reply a few hours later:**
> it's B. a plain GET is a simple request, so it goes straight to the server. JSON, DELETE and the Authorization header all make the browser send an OPTIONS request first

---

### THE "CAN YOU GUESS" TWEET

> your fetch fails with a CORS error, but your server logs show the request came in and returned 200. can you guess what happened?

**Your reply:**
> the server answered, but without an Access-Control-Allow-Origin header for your page's origin. so the browser got the response and refused to hand it to your JavaScript

---

### THE LAUNCH TWEET

> made a video on CORS from the very beginning (sponsored by apidog), why your API client works when the browser doesn't, what an origin is, preflight requests, the headers, cookies, and how to set it up in laravel

**Reply:** [LINK]

---

### STANDALONE TWEETS

> localhost:5173 and localhost:8000 are different origins. same machine, different port. that's why your first CORS error usually shows up on day one of a project

> when you see an OPTIONS request before your real one in the network tab, that's the browser asking your server for permission first. nothing is broken

> chrome's CORS error suggests mode no-cors. if you do that, the error goes away and you get a response your code can't read

> your upload fails with a CORS error, but the real problem is that nginx rejected the file as too big. the 413 page didn't have CORS headers, so the browser showed you a CORS error instead

> if you're using laravel sanctum with a separate frontend, turn on supports_credentials and list your real origins in config/cors.php. leaving a * there with credentials on means any origin gets echoed back

> what's the strangest CORS error you've ever hit, and what did it turn out to be?

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what's the strangest CORS error you've ever hit, and what did it turn out to be? 👀
>
> (this video is sponsored by apidog. if you want to try the API client I used, the link is [APIDOG LINK])

### Instagram:
> the moment it made sense for me was realising my request had already reached the server. the browser just wouldn't let my code read the answer.

### TikTok:
> if you've ever set the mode to no-cors and thought you fixed it, this one is for you 😭

### LinkedIn:
> The habit worth building is checking the Network tab before changing any config. Look at the OPTIONS request first, then the real status code, then the response headers, and the cause is usually obvious.

### X (reply to your own tweet):
> if you're debugging one right now, check for an OPTIONS request in the network tab first. if that one failed, your real request never went out

### REPLIES TO EXPECT (ready to paste)

**"Just set it to * and move on."**
> that's fine for a public API with no cookies. the moment you send credentials, the browser rejects * and you have to name the origin

**"So CORS is useless for security?"**
> it protects your users inside their browser, so other websites can't read their data. it does nothing against curl or API clients, which is why your API still needs auth

**"Why does my request show up twice in the network tab?"**
> the first one is the preflight, an OPTIONS request asking permission. sending JSON, an Authorization header, or using PUT or DELETE triggers it

**"I added the header in my fetch and it still fails."**
> Access-Control-Allow-Origin is a response header, so it has to come from the server. adding it to your request can even trigger a preflight

**"It works locally but not in production."**
> check that your production frontend's origin is in your allowed origins exactly, https and all, and if you're on laravel, clear your cached config after changing it

**"Can I just use a proxy?"**
> in development, yes, the vite proxy is great for that. in production you either set up CORS on the API or serve the API from the same origin as the frontend

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** why your fetch request gets blocked by CORS
**Slide 2:** it works in an API client like Apidog because the check is done by your browser, and the Apidog desktop app doesn't do it.
**Slide 3:** an origin is the scheme, the host and the port together.
**Slide 4:** so localhost:5173 and localhost:8000 are two different origins.
**Slide 5:** browsers don't let a page read responses from another origin, to protect you from other websites.
**Slide 6:** CORS is how a server tells the browser which other origins can read its responses.
**Slide 7:** for PUT, DELETE, JSON or an Authorization header, the browser sends an OPTIONS preflight first.
**Slide 8:** if you send cookies, the server has to name the exact origin, because * isn't allowed.
**Slide 9:** CORS doesn't stop anyone calling your API with curl, so you still need authentication.
**Slide 10:** every CORS fix goes on the server.

**Carousel caption:**
> CORS explained from the beginning, with the bookstore app as the example. full video on YouTube, link in bio. sponsored by Apidog.
>
> #ad #cors #webdev #javascript #backend #learntocode

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Why Your Request Works in an API Client and Fails in the Browser

### Subtitle:
> What CORS is, why browsers block cross-origin reads, and where the fix actually goes.

### SEO Title:
> CORS Explained: Same-Origin Policy, Preflight Requests and How to Fix CORS Errors

### SEO Description:
> A plain explanation of CORS errors, origins, the same-origin policy, preflight requests, CORS headers, credentials, common mistakes, and how to configure CORS in Laravel.

---

*The video this post goes with is sponsored by Apidog.*

Almost everyone who builds a frontend that talks to an API meets the same message in the console. The request "has been blocked by CORS policy," and the same request copied into an API client like Apidog works perfectly. The difference is that the browser runs a check before it lets JavaScript read a response, and a desktop API client like Apidog, or curl, doesn't run that check at all. For a simple GET request, the request usually reaches the server and gets a full response. The browser then looks at the response headers, doesn't find the permission it needs, and keeps the response away from the page. MDN notes that, for security reasons, the details of a CORS failure aren't available to JavaScript, which is why, in Chrome, your code sees a vague "Failed to fetch" while the real reason sits in the console.

The check is about origins. An origin is the scheme, the host and the port taken together, so https://bookstore.com and https://api.bookstore.com are different origins, and so are http and https versions of the same site. During development it is even more common, because a frontend on localhost:5173 and an API on localhost:8000 are on the same machine and still count as two origins.

Browsers enforce the same-origin policy, which generally stops a page on one origin from reading responses from another. MDN describes it as cross-origin writes being typically allowed and cross-origin reads being typically disallowed. Without it, a website open in one tab could request your email provider and, if your login cookies went along, read your inbox. It could also use your browser to read pages a stranger's server can't reach, such as a home router's settings page or an office's internal tools.

CORS, Cross-Origin Resource Sharing, lets a server relax that policy for the origins it chooses. The browser sends an Origin header with the cross-origin request, and if the server answers with a matching Access-Control-Allow-Origin header, or a wildcard, the browser lets the page read the response. When that header is missing or names another origin, you get the familiar error, and the fix belongs on the server.

Some requests need permission before they are even sent. A request is simple when it uses GET, HEAD or POST, sets only a few basic headers, and uses one of three content types, which are form data, multipart form data and plain text. Anything else, including PUT, DELETE, an Authorization header or a JSON body, makes the browser send an OPTIONS preflight first. The server has to answer with a success status and headers that cover the requested method and headers, and only then is the real request sent. Access-Control-Max-Age lets the browser remember that answer. Without it the default is five seconds, and Chromium browsers cap it at two hours while Firefox caps it at twenty-four.

Cookies make the rules stricter. Fetch doesn't send cookies to another origin unless the request asks for them with credentials set to include, and when it does, the server has to send Access-Control-Allow-Credentials: true along with an exact origin. A wildcard isn't accepted, because it would let any website read a logged-in user's data. CORS also has limits. It only governs what a page in a browser can read, so anyone can still call an API with curl or a script, and the API needs its own authentication, permission checks and rate limiting.

A lot of CORS bugs come from a short list of mistakes. Setting fetch's mode to no-cors hides the error but returns an opaque response the code can't read. Error responses produced before the application runs, like a 413 from nginx or a 502 when the app is down, often lack CORS headers, so the browser reports a CORS error that hides the real one. Preflights that hit authentication middleware fail, since they never carry credentials. A dev proxy, like Vite's server.proxy, avoids CORS during development because the browser only ever talks to its own origin. In Laravel, the HandleCors middleware is already in the global stack and answers preflights, and on Laravel 11 and newer you publish config/cors.php with php artisan config:publish cors, then list your real origins and turn on supports_credentials if you use cookies.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Web Development, JavaScript, API, Laravel, Web Security

---

## 11. REFERENCES & SOURCES

**1. How CORS works (MDN, primary reference for the script)**
- **MDN, "Cross-Origin Resource Sharing (CORS)":** the simple request conditions in Segment 6 (GET, HEAD or POST, safelisted headers, and the three Content-Type values), the credentials rules in Segment 8 (no `*` for Allow-Origin, Allow-Headers, Allow-Methods or Expose-Headers on credentialed requests, and the browser blocking the response if it sees `*`), "preflight requests must never include credentials" (Segment 10), Vary: Origin when the server picks one origin from an allowlist (Segment 7), and "specifics about the error are not available to JavaScript" (Segment 2). https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- **MDN, "Same-origin policy":** the scheme/host/port definition and the comparison table that Segment 3's examples follow, plus "cross-origin writes are typically allowed... cross-origin reads are typically disallowed," which supports "sending is treated differently" in Segment 4. https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
- **MDN, "Access-Control-Max-Age":** default 5 seconds, Firefox caps at 86400 seconds (24 hours), Chromium from v76 caps at 7200 seconds (2 hours). https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age
- **MDN, "Access-Control-Allow-Headers":** `*` only counts as a wildcard without credentials, and "The Authorization header doesn't accept wildcard and always needs to be listed explicitly." https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers
- **MDN, "Preflight request":** https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

**2. The Fetch Standard (WHATWG)**
- Defines CORS, CORS-safelisted methods ("GET, HEAD, or POST") and an ok status ("a status in the range 200 to 299, inclusive"), which supports "a status in the 200s" for the preflight answer in Segment 6. https://fetch.spec.whatwg.org/

**3. Laravel (checked against Laravel 13.x docs and the framework source)**
- **Laravel docs, CORS:** HandleCors is "automatically included in your application's global middleware stack," answers OPTIONS requests, and `php artisan config:publish cors` places `cors.php` in `config`. https://laravel.com/docs/routing#cors
- **Laravel framework, default `config/cors.php`:** paths `['api/*', 'sanctum/csrf-cookie']`, allowed_methods `['*']`, allowed_origins `['*']`, allowed_headers `['*']`, max_age `0`, supports_credentials `false`. These are the defaults Segment 11 quotes. https://github.com/laravel/framework/blob/13.x/config/cors.php
- **HandleCors source:** it returns early for paths that don't match `paths` (so no headers on those routes), and answers preflights before the request reaches your route middleware, which is why auth middleware doesn't break preflights in Laravel. https://github.com/laravel/framework/blob/13.x/src/Illuminate/Http/Middleware/HandleCors.php
- **fruitcake/php-cors (the library HandleCors uses):** with allowed_origins `['*']` and supports_credentials off, it sends `*`. With credentials on, it sends back the request's own Origin instead, and adds Vary: Origin. That's the source for "Laravel sends back whatever origin asks" in Segment 11. With allowed_headers `['*']`, it echoes the requested headers, so Authorization works without being listed in Laravel. https://github.com/fruitcake/php-cors/blob/master/src/CorsService.php
- **Laravel Sanctum, "CORS and Cookies":** publish the cors config, set supports_credentials to true, and enable withCredentials (and withXSRFToken) on axios. https://laravel.com/docs/sanctum#cors-and-cookies
- `config:publish` arrived with Laravel 11's slimmer skeleton. Older apps already have `config/cors.php`, so the script says "on older versions, config/cors.php is already in your config folder" without naming a version number.

**4. Dev proxies**
- **Vite, server.proxy:** "custom proxy rules for the dev server," and the server options section says these apply only to dev unless noted. https://vite.dev/config/server-options

**5. Apidog (sponsor, checked on docs.apidog.com in October 2026)**
- **Apidog introduction:** Apidog describes itself as "a comprehensive platform designed to streamline the entire API lifecycle," covering design, sending and saving requests, testing, mock data and published API docs. That supports the sponsor read's "send a request, save it," "folder" and "API docs and your tests." https://docs.apidog.com/introduce-apidog-643492m0
- **Environments & Services:** each environment holds a Base URL and variables, and switching the environment switches where the same endpoints go (for example local, test and production). That supports "localhost while you're building, and your live API later." https://docs.apidog.com/environments-services-584758m0
- **Apidog Agent:** the web app needs an agent "for circumventing the cross-origin resource sharing (CORS) restrictions imposed by web browsers." The Cloud Agent routes requests through Apidog's servers and "cannot access private or local resources," the Browser Agent "may encounter CORS limitations," and "The Apidog desktop app provides full functionality with no restrictions when sending requests." That's why the script says "the Apidog desktop app isn't a browser" and the note tells you to record in the desktop app. https://docs.apidog.com/apidog-agent-644359m0
- **Browser Extension:** lets you use Apidog in the browser, with limits from browser security rules (it can't send cookies, for example), and points to the desktop client, which has no such restrictions. https://docs.apidog.com/browser-extension-821769m0

**6. Corrections / careful wording**
- **"Apidog isn't a browser."** Only the desktop app sends requests without the browser's CORS check. The web version runs inside a browser and goes through the extension or an agent, so the script and short say "the Apidog desktop app" where it matters, and "an API client like Apidog" elsewhere.
- **The sponsor read** only names features from Apidog's own docs (sending and saving requests, folders, environments, docs, tests) and makes no claims about speed, price or being the best.
- **"CORS blocks your request."** The same-origin policy does the blocking, and CORS is the server relaxing it. The script says "CORS relaxes the same-origin policy, for the origins the server chooses."
- **"CORS secures your API."** It doesn't stop non-browser clients. Segment 9 says this in plain sentences ("CORS is a set of rules that browsers follow... An API client like Apidog doesn't follow those rules") rather than with a "not X but Y" contrast.
- **"The request always reaches the server."** Only true for simple requests. For preflighted requests, the real request is only sent if the preflight succeeds. The script says "for a simple GET request like this one, the request usually did reach your server."
- **The email example is written as a hypothetical** ("If there were no same-origin policy... If your browser attached your login cookies"). Modern browsers also have SameSite cookie defaults that would often stop the cookies being sent, so the script mentions SameSite in one line and doesn't claim the attack works today.
- **"Chrome's error suggests no-cors."** The full Chrome message includes "If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled." The script paraphrases it closely and only for Chrome.
- **"Failed to fetch"** is Chrome's wording. Firefox says "NetworkError when attempting to fetch resource," so the script says "In Chrome."
- **Error responses without CORS headers.** In Laravel, most exceptions thrown inside the app are turned into responses that still pass back through HandleCors, so they usually do get CORS headers. The script's examples are deliberately ones that happen outside your app (an nginx 413, a 502 when the app is down), and it says "often," not "always."
- **"A lot of the API calls a modern frontend makes get a preflight"** is kept as "a lot," not "most," since GET requests without custom headers don't need one.
- **Max-Age caps are set by each browser,** and the header itself doesn't define them, so the script says "browsers put a cap on it" and names Chrome (Chromium) and Firefox only.

---

## NOTES

- **What's new vs your old CORS kit:** it now starts from the beginning (origin, same-origin policy, then CORS) with a second same-origin example that doesn't depend on cookies, gives every header its own explanation, adds Max-Age and Expose-Headers, a full mistakes segment (no-cors, the request header mistake, error responses with no CORS headers, preflights hitting auth, dev proxies), the Laravel config walked through line by line with the credentials-plus-star warning, and a debugging checklist ending. The Express segment is gone, since the brief was Laravel. If you want it back, it's one short clip on its own.
- **Twelve segments, twenty-two clips, seven shorts.** The main short and additional shorts are recorded separately.
- **Twitter:** the quiz and the "can you guess" tweet only work if you post the answer as a reply a few hours later.
- **Sponsorship:** replace [APIDOG LINK] in the description and pinned comment with the link Apidog gives you. If they ask for specific talking points, they go in the [SPONSORED: Apidog] block in Segment 2, which you can cut cleanly if the deal doesn't happen (then put back "an API client" without the name).
- **Cross-links:** the "what happens when you type a URL" video (origins build on the URL breakdown), the API request journey video (which mentions the CORS check and preflight), the API authentication video (Segment 9 points to it), the cookies vs localStorage vs sessionStorage video (credentials), the HTTP status codes video (the 413 and 502 in Segment 10), and the QUERY method video (QUERY isn't CORS-safelisted, so it always gets a preflight).

---

## WHAT CHANGED

- Postman swapped for Apidog (proposed sponsor); sponsor segment and disclosure added.
- Visible titles now say "API client" (title 8 and the stretch title), title 12 says curl, and "works in postman but not in browser" stays only in the hidden YouTube tags and the tag pool.
- Added "#ad sponsored by Apidog" to every caption and post that names Apidog, an Apidog link placeholder in the description and pinned comment, a "Sponsor: Apidog" chapter, the paid promotion reminder in 2b, and the Apidog sources in References.
- Nothing else changed. The bookstore and Laravel examples are as they were.

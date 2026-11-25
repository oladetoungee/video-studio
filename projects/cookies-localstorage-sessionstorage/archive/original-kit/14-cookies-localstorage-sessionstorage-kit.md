# Cookies vs localStorage vs sessionStorage, Explained: Content Kit
**Version 3, rebuilt on your 27 October read-through. Your read-through is the script. I fixed dictation slips, rewrote the session ID line the way you asked, moved the full flag list onto the screen, switched every example to the online shop, and took out third-party cookies and consent.**
**It goes from the closed-tab moment, to why the browser has to remember anything (the cloakroom ticket), then cookies, localStorage, sessionStorage, who can read what, the three security flags, where to store your login token, the Laravel note, and your wrap-up.**
**Every fact was checked again against MDN, RFC 6265 and 6265bis, Chrome's developer blog, WebKit, OWASP and the Laravel skeleton and docs. Everything that changed from your read-through is listed in WHAT CHANGED at the end.**

---

## TAG POOL (86 tags, every tag used anywhere in this kit, deduplicated)

cookies vs localstorage vs sessionstorage, cookies vs localstorage, localstorage vs sessionstorage, where to store jwt, where to store auth token, httponly cookie, samesite cookie, secure cookie, browser storage explained, web storage api, localstorage explained, sessionstorage explained, http cookies explained, set-cookie header, session cookie vs persistent cookie, cookie flags explained, xss localstorage, csrf explained, jwt localstorage vs cookie, laravel session cookie, http is stateless, document.cookie, localstorage setitem, frontend security, web security, javascript tutorial, web development, backend development, authentication, laravel, javascript, how cookies work, session id explained, samesite lax vs strict, gbemisola oladetoun, withgbemi, what is a session cookie, samesite none, cross site request forgery, csrf token, samesite csrf, laravel encrypted cookies, encryptcookies middleware, laravel cookies, why did my form disappear, why websites use cookies, how login works, cookie header, http headers explained, cookie max-age, cookie expires, cookie 400 days, server side sessions, localstorage size limit, localstorage per origin, localstorage json stringify, localstorage json parse, save cart in localstorage, localstorage objects, when is localstorage cleared, localstorage incognito, safari localstorage 7 days, localstorage persistence, sessionstorage vs localstorage, sessionstorage per tab, who can read localstorage, are cookies sent to server, localstorage security, browser storage comparison, cookie attributes, httponly vs secure, cookie security, samesite explained, token storage security, jwt vs session cookie, jwt localstorage, authorization header, session based authentication, xss explained, cross site scripting, owasp localstorage, httponly cookie xss, does httponly prevent xss, xss protection, storage cheat sheet, when to use localstorage

## HASHTAG POOL (24 hashtags, every hashtag used anywhere in this kit)

#Shorts #webdev #javascript #cookies #localstorage #websecurity #frontend #coding #programming #developer #learntocode #techtok #http #backend #computerscience #cybersecurity #authentication #csrf #laravel #php #safari #cheatsheet #webdevelopment #softwareengineering

---

## HOW THIS KIT IS BUILT

The script is your read-through, cleaned up. It opens on the checkout form that disappears while the cart and the login stay, explains HTTP being stateless with your cloakroom ticket from the Baltics, then goes through cookies, localStorage and sessionStorage, who can read each one, the three cookie flags that matter most for security, where to store a login token (XSS and CSRF), and how Laravel already handles the cookie for you. It ends inside your wrap-up, with the online shop: login in an HttpOnly cookie, the guest's cart in localStorage, the half-filled form in sessionStorage. Code only appears on screen. You never read it out.

**QUESTIONS FOR YOU**
None.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in the first line or two, so a viewer landing anywhere (or a clip cut from it) still knows what it's about. The code blocks are on-screen graphics only. You don't read them out.

---

**[SEGMENT 1: OPEN]**

You are halfway through a checkout form on an e-commerce website, and you close the tab by mistake.

You open the tab again, and you realise that the form is empty, but your cart is still there, and you're still logged in.

The reason why is because all three of these things are kept in three different places, cookies, localStorage and sessionStorage.

And by the end of this video, you will know where to keep what.

---

**[SEGMENT 2: WHY THE BROWSER NEEDS TO REMEMBER THINGS]**

Before cookies and localStorage can make sense, you need to know why a browser has to remember anything at all.

The web runs on HTTP, and HTTP is stateless.

That means that every request your browser sends stands on its own.

The server doesn't remember the request that came before it.

So if you log in to your shopping website, that's one request.

If you click My Orders, that's a brand new request, and on its own, it says nothing about who you are.

So how does the server know that it's you?

**[~1:00 BEAT: the problem is set, and the cloakroom ticket is the answer]**

Think about the cloakroom.

We live in the Baltics, and there's usually a cloakroom at an event where you hand over your coat.

We have something similar in my school, where you hand over your jacket or your coat, and they give you a ticket with a number on it.

They don't remember your face, because, I mean, it's a whole lot of people that have brought their coats and their jackets.

But when you come back, you show them the ticket, and they use that number to find your jacket or your coat.

A cookie works like that ticket.

After you log in, the server gives your browser a cookie with a session ID in it, and your browser shows that cookie on every request after that.

**[ON SCREEN: request 1, log in, the server sends back a cookie / request 2, My Orders, the browser sends the cookie back]**

---

**[SEGMENT 3: COOKIES]**

So the first place a website can keep something in your browser is in a cookie.

If you use websites, you see things like, oh, accept cookies, and all of that.

A cookie is a small piece of text, a name and a value, that the server asks your browser to hold on to.

The server usually sets it with a header on the response, called Set-Cookie.

**[ON SCREEN: code]**
```http
HTTP/1.1 200 OK
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

After that cookie has been set, every time your browser sends a request to that site, it sends the cookie back automatically, in a Cookie header.

**[ON SCREEN: code]**
```http
GET /orders HTTP/1.1
Host: shop.example.com
Cookie: session_id=abc123
```

Each cookie can hold about 4 kilobytes, and it's good to keep them small, because they travel with every request.

Now, how long can a cookie live?

If the server doesn't give the cookie an expiry, then it's a session cookie. It's meant to be deleted when you close the browser.

I say "meant to," because a lot of browsers can restore your tabs when you reopen them, and the session cookies can come back with them.

If the server, however, sets Expires or Max-Age, then it's a persistent cookie. It stays until that time.

Chrome, for example, won't keep any cookie for more than 400 days after it's set.

**[ON SCREEN: code]**
```http
Set-Cookie: theme=dark; Max-Age=2592000
```

JavaScript on a page can also read and write cookies, through document.cookie.

**[ON SCREEN: code]**
```javascript
document.cookie = "theme=dark; max-age=2592000; path=/";

console.log(document.cookie); // "theme=dark"
```

Now, in my e-commerce store, the login lives in a cookie like this.

The cookie itself only holds a random ID, the session ID.

The server keeps the real details about you, and uses that ID to look them up, like the cloakroom number and your coat.

---

**[SEGMENT 4: LOCALSTORAGE]**

**[~3:00 BEAT: cookies are done, and this is why the cart survived]**

The second place a website can keep things in your browser is localStorage.

localStorage is the reason why, maybe you add something to your cart and you close your browser, and when you come back and reopen it, you still see the stuff in your cart.

localStorage is a simple store of keys and values that lives in your browser, for one website.

**[ON SCREEN: code]**
```javascript
localStorage.setItem("theme", "dark");

localStorage.getItem("theme"); // "dark"
```

It only stores strings.

So for a cart, a shopping cart, you turn it into a string with JSON.stringify.

And when you want to get it back, you get it back with JSON.parse.

**[ON SCREEN: code]**
```javascript
const cart = [{ productId: 42, name: "Ankara tote bag", qty: 1 }];

localStorage.setItem("cart", JSON.stringify(cart));

const savedCart = JSON.parse(localStorage.getItem("cart"));
```

Most browsers give you about five megabytes per website, but it varies, so you don't want something that is too big in your localStorage.

And by website, I mean the origin, which is the protocol, the domain and the port, all together.

So the http and https versions of your site get their own localStorage.

localStorage stays until your code removes it, or until the user clears their browser data.

Closing the tab, or even the whole browser, doesn't clear your localStorage.

But there are two exceptions.

In a private or incognito window, it is usually deleted when you close that window.

And Safari can delete it after seven days of you using Safari without interacting with the site.

Also, localStorage is never sent to the server.

If the server needs your cart, your code has to send it.

---

**[SEGMENT 5: SESSIONSTORAGE]**

The third place is sessionStorage.

It is the reason a half-filled checkout form can disappear when you close the tab.

sessionStorage has the same methods as localStorage, setItem, getItem and removeItem.

**[ON SCREEN: code]**
```javascript
const form = { name: "Ada", city: "Lagos", deliveryNote: "Leave it at the gate" };

sessionStorage.setItem("checkoutForm", JSON.stringify(form));
```

The difference is that sessionStorage belongs to one tab.

If you refresh the page, it's still there, but if you close that tab, it's gone.

If you open the same e-commerce website by yourself in a second tab, that tab gets its own separate sessionStorage.

So sessionStorage is good for things that only matter in this tab right now, like a half-filled form, or search filters that someone picks.

You obviously don't want to put stuff like card details in your sessionStorage.

---

**[SEGMENT 6: WHO CAN READ COOKIES, LOCALSTORAGE AND SESSIONSTORAGE]**

Another big difference between cookies, localStorage and sessionStorage is who gets to read them.

Cookies go to the server.

The browser attaches them to every request that matches the cookie's domain and path.

localStorage and sessionStorage never leave the browser by themselves.

The server only sees them if your code sends them.

But inside the browser, any JavaScript running on your page can read localStorage and sessionStorage.

That includes your own code, and it also includes every third-party script that you've added, like maybe an analytics script or a chat widget.

Cookies can be read by JavaScript too, through document.cookie, unless the server explicitly marks them HttpOnly.

**[ON SCREEN: cookies = sent to the server, readable by JavaScript unless HttpOnly / localStorage and sessionStorage = stay in the browser, readable by any JavaScript on the page]**

---

**[SEGMENT 7: THE COOKIE SECURITY FLAGS]**

Cookies come with settings called attributes.

People usually call them flags, and there are quite a few of them.

They decide where a cookie goes, and who can touch it.

**[ON SCREEN: HttpOnly, Secure, SameSite, Domain, Path, Expires, Max-Age, Partitioned, __Host- prefix]**

The three that matter most for security are HttpOnly, Secure and SameSite.

HttpOnly means JavaScript cannot read the cookie at all.

The browser still sends it with requests, even fetch requests from your own code.

Your code just can't see what's inside.

Secure means that the cookie is only sent over HTTPS, so it never goes out over plain HTTP, where someone on the same wifi, for example, can read it.

**[~6:00 BEAT: SameSite is the one flag to remember, and it sets up the login token question]**

If you only remember one flag from this video, make it the next one, SameSite.

SameSite decides whether the cookie is sent when the request starts on a different website.

It has three different values.

Strict means that the cookie is only sent when the request comes from your own site.

So if someone emails you a link to the e-commerce website and you click it, you land on that first page looking logged out.

Lax is the middle one.

The cookie is sent when you click a normal link from another website into the e-commerce site.

But if another website submits a form that posts to the e-commerce site, the cookie is not sent.

None means send it everywhere, including on requests from other sites.

You'd only use that for things like an embedded widget.

**[ON SCREEN: code]**
```http
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
```

---

**[SEGMENT 8: WHERE SHOULD YOU STORE YOUR LOGIN TOKEN?]**

Where should you store your login token, in a cookie or in localStorage?

There are two common setups.

In the first one, the server gives your frontend a token, often a JWT, and your code saves it in localStorage and adds it to every request in an Authorization header.

**[ON SCREEN: code]**
```javascript
localStorage.setItem("token", data.token);

fetch("/api/orders", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
```

In the second one, the server puts a session ID in an HttpOnly cookie, and the browser sends it by itself.

The bigger issue with the localStorage one is XSS, cross-site scripting.

That's when an attacker manages to run their own JavaScript on your page.

Maybe an npm package you use got compromised, or a product review box shows what people type without escaping it.

Their script can read localStorage, take your token, and send it to their own server, and they can use it from anywhere until it expires.

So, in the words of OWASP's security cheat sheet, you don't want to "store session identifiers in local storage as the data is always accessible by JavaScript."

**[ON SCREEN: OWASP HTML5 Security Cheat Sheet, "Do not store session identifiers in local storage as the data is always accessible by JavaScript."]**

And you can make the argument that you can use an HttpOnly cookie, because that cannot be read by JavaScript.

But HttpOnly doesn't make XSS harmless.

The attacker's script can still send requests to your site, and the browser will attach the cookie.

So HttpOnly stops them from stealing the token and using it elsewhere.

You still need to stop XSS.

**[~9:00 BEAT: cookies sound like the safe answer, and CSRF is the catch that keeps them watching]**

So far, it sounds like cookies are the safe choice when it comes to login tokens.

But cookies have their own risks.

It's called CSRF, cross-site request forgery.

The browser sends cookies automatically, so another website could make your browser send a request to your shopping site, like a hidden form that places an order, and your login cookie would go with it.

If you set your SameSite to Lax or Strict, that will block a lot of that.

And frameworks usually add a CSRF token on top, a secret value that the attacker's website cannot know.

So even if they send fake requests, they get rejected.

---

**[SEGMENT 9: COOKIES AND SESSIONS IN LARAVEL]**

If you are using a framework like Laravel, for example, a lot of this whole cookie setup is already done for you.

Laravel keeps your login in a session cookie, and in recent versions of Laravel, that cookie is named after your app.

So if your app is called Shop Online, you get shop-online-session.

**[ON SCREEN: code]**
```php
// config/session.php (Laravel 12 and 13 defaults)
'cookie' => env('SESSION_COOKIE', Str::slug((string) env('APP_NAME', 'laravel')).'-session'),
'http_only' => env('SESSION_HTTP_ONLY', true),
'same_site' => env('SESSION_SAME_SITE', 'lax'),

// APP_NAME="Shop Online"  gives  shop-online-session
// (Laravel 11 used shop_online_session)
```

The cookie holds the session ID, and the session data stays on the server.

Laravel also encrypts and signs every cookie it creates, through the EncryptCookies middleware, so the user can't read or change what's inside.

---

**[SEGMENT 10: COOKIES VS LOCALSTORAGE VS SESSIONSTORAGE, THE SUMMARY]**

So that's about it for cookies, localStorage and sessionStorage.

Cookies are small.

They go to the server with every matching request, and JavaScript can read them unless they are HttpOnly.

localStorage and sessionStorage hold a lot more than cookies, and they stay in the browser, and any script on the page can read them.

localStorage stays until it is cleared, and sessionStorage goes when the tab is closed.

**[ON SCREEN: table]**

| | Cookie | localStorage | sessionStorage |
|---|---|---|---|
| Size | about 4 KB each | about 5 MB per origin (varies) | about 5 MB per origin (varies) |
| Sent to the server | yes, with every matching request | never by itself | never by itself |
| JavaScript can read it | yes, unless HttpOnly | yes, any script on the page | yes, any script on the page |
| Lives until | it expires (session cookie: the browser closes) | it's cleared | the tab closes |
| Online shop | login (HttpOnly cookie) | guest's cart | half-filled checkout form |

So in our online shop, the login is an HttpOnly cookie, the guest's cart is probably in localStorage, and the half-filled checkout form is in sessionStorage.

And nothing secret goes into localStorage or sessionStorage.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("cookies vs localstorage" and "where to store jwt" are the two phrasings people type most for this topic)
> 1. Cookies vs localStorage vs sessionStorage Explained — 51
> 2. localStorage vs sessionStorage vs Cookies in JavaScript — 55
> 3. Where to Store JWT Tokens? Cookies vs localStorage — 50
> 4. HttpOnly, Secure and SameSite Cookies Explained — 47
> 5. Where Should You Store Auth Tokens in the Browser? — 50
> 6. Browser Storage Explained: Cookies and Web Storage — 50
> 7. localStorage vs Cookies for Login Tokens (XSS and CSRF) — 55

**CLICK-LED**
> 8. Why Your Form Disappeared but Your Cart Didn't — 46
> 9. Is Your Login Token Safe in localStorage? — 41
> 10. The 3 Cookie Settings That Protect Your Login — 45
> 11. Where Your Browser Keeps Your Login, Cart and Form — 50
> 12. You're Probably Storing Your Login Token Wrong — 46

**RECOMMENDED: 1.** It's the exact three-way phrasing people search, with "Explained" at the end, and the main keyword sits right at the front. 3 is the one to test if the first stalls, because "where to store jwt" is its own big search and Segment 8 answers it. Thumbnail pairing: the title already names all three, so the thumbnail shouldn't. Use the login token idea instead (see 2b), so together they say "three storage options, and one of them is risky for your token."

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "You're Probably Storing Your Login Token Wrong." A lot of tutorials put the token in localStorage, and Segment 8 shows what an XSS script can do with it, while the summary puts the login in an HttpOnly cookie and says nothing secret goes in localStorage. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in the same spot you always use. On the left, a big key sitting inside an open box labelled localStorage, with a red warning triangle on it. One word, "SAFE?", in large letters. Squint at it, and if the key, the box and the question still read, it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** three plain boxes, a cookie, a box marked "local" and a box marked "tab", with only the cookie box glowing. No words.

**Recording notes:**
- Shoot two takes of the first 20 seconds (the closed-tab moment), so you can pick the stronger one.
- Segment 8 runs a little over two minutes. Your own line "So far, it sounds like cookies are the safe choice" sits in the middle of it and does the re-engagement job, so nothing extra is added.
- The closing is your summary and the on-screen table, and it doesn't refer back to anything, so the edit can end cleanly on "nothing secret goes into localStorage or sessionStorage."
- Hold the table on screen long enough to screenshot.
- The script is about 1,750 spoken words, so at about 150 words a minute it runs roughly 11 to 12 minutes. That is comfortably over 8, and nothing needs padding.

**Retention beats (marked in the script):**
- ~1:00 is inside Segment 2, right after "So how does the server know that it's you?", before the cloakroom.
- ~3:00 is the start of Segment 4, localStorage, which explains why the cart survived.
- ~6:00 is in Segment 7, at "If you only remember one flag from this video."
- ~9:00 is in Segment 8, at "So far, it sounds like cookies are the safe choice," right before CSRF.

**After publishing:**
- Post the X image post (the cheat sheet card) as the video goes live, and share the link with a few people who'll watch all the way through.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. Wherever the big drop is, that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> Cookies, localStorage and sessionStorage all keep data in your browser, but they behave very differently, and the difference matters most when you're deciding where to store a login token.
>
> I start from the beginning, with why the browser has to remember anything at all (HTTP is stateless), using a cloakroom ticket as the example. Then I go through each one with an online shop. The login lives in a cookie, the guest's cart in localStorage, and the half-filled checkout form in sessionStorage. You'll see how big each one is, how long it lasts, and who can read it. I also cover the three cookie flags that matter most for security (HttpOnly, Secure and SameSite), XSS and CSRF, and how Laravel already handles the session cookie for you.
>
> Where have you been storing your login tokens?
>
> CHAPTERS (add times after editing)
> 0:00 Your form is gone but your cart isn't
> Why the browser needs to remember things (HTTP is stateless)
> Cookies
> localStorage
> sessionStorage
> Who can read cookies, localStorage and sessionStorage
> HttpOnly, Secure and SameSite
> Where should you store your login token?
> Cookies and sessions in Laravel
> Summary
>
> SOURCES AND FURTHER READING
> MDN, Using HTTP cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
> MDN, Set-Cookie header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
> MDN, Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
> MDN, Window.sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
> MDN, Storage quotas and eviction criteria: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
> RFC 6265, HTTP State Management Mechanism: https://www.rfc-editor.org/rfc/rfc6265
> RFC 6265bis draft: https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/
> Chrome for Developers, cookie expiry capped at 400 days: https://developer.chrome.com/blog/cookie-max-age-expires
> WebKit, Full Third-Party Cookie Blocking and More (7-day storage cap): https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
> OWASP HTML5 Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
> OWASP CSRF Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
> Laravel docs, HTTP Responses (cookies and encryption): https://laravel.com/docs/responses
> Laravel skeleton, config/session.php: https://github.com/laravel/laravel/blob/12.x/config/session.php
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (478 characters, under YouTube's 500 limit):**

cookies vs localstorage vs sessionstorage, cookies vs localstorage, localstorage vs sessionstorage, where to store jwt, where to store auth token, httponly cookie, samesite cookie, secure cookie, browser storage explained, web storage api, localstorage explained, sessionstorage explained, http cookies explained, set-cookie header, session cookie vs persistent cookie, cookie flags explained, xss localstorage, csrf explained, jwt localstorage vs cookie, laravel session cookie

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

You close a tab by mistake. Your checkout form is gone, but your cart is still there, and you're still logged in.

That's because those three things are kept in three different places.

**[WHY]**

HTTP is stateless, so the server doesn't remember your last request.

A cookie works like a cloakroom ticket. After you log in, the server gives your browser a cookie with a session ID, and your browser shows it on every request.

**[COOKIES]**

Cookies are about four kilobytes each, and the browser sends them to the server with every matching request.

**[ON SCREEN: code]**
```http
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
```

**[LOCALSTORAGE]**

localStorage holds about five megabytes in most browsers, stays until it's cleared, and never goes to the server by itself. That's where the cart was.

**[SESSIONSTORAGE]**

sessionStorage belongs to one tab. Refresh and it's still there. Close the tab and it's gone. That's where the form was.

**[WHO CAN READ IT]**

Any script on your page can read localStorage and sessionStorage. JavaScript can read cookies too, unless they're HttpOnly.

**[THE FLAGS]**

HttpOnly means JavaScript can't read the cookie. Secure means HTTPS only. SameSite decides if the cookie goes along when the request starts on another website.

**[THE TOKEN]**

If your login token is in localStorage, an attacker's script can take it. An HttpOnly cookie can't be read that way, but you still need to stop XSS, and cookies bring CSRF, which SameSite and CSRF tokens block.

**[LARAVEL]**

If you're using Laravel, for example, the session cookie is already set up for you, and every cookie it creates is encrypted and signed.

**[LAND]**

So the login goes in an HttpOnly cookie, the cart in localStorage, the form in sessionStorage, and nothing secret goes in either storage.

**Caption:** why your checkout form disappears when you close a tab but your cart and your login don't, and where a login token should live 🍪
full video: [LINK]
**Hashtags:** #Shorts #webdev #javascript #cookies #localstorage #websecurity #frontend #coding #programming #developer #learntocode
**Tags:** cookies vs localstorage vs sessionstorage, browser storage explained, where to store jwt, httponly cookie

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: Why the form disappeared but the cart didn't (25-35 sec)

You close a tab by mistake, and your half-filled checkout form is gone.

But your cart is still there.

That's because the form was in sessionStorage, and the cart was in localStorage.

sessionStorage belongs to one tab. It's still there after a refresh, and it's gone when you close the tab.

localStorage stays even after you close the whole browser, until your code removes it or the user clears it.

**Caption:** same website, same browser, and one thing survives closing the tab while the other doesn't. this is sessionStorage vs localStorage 🗂️
full video: [LINK]
**Hashtags:** #Shorts #javascript #webdev #frontend #localstorage #coding #programming #learntocode #developer #techtok
**Tags:** localstorage vs sessionstorage, sessionstorage explained, localstorage explained, web storage api

---

### SHORT 3: HTTP is stateless, and the cloakroom ticket (25-35 sec)

Every request your browser sends stands on its own. The server doesn't remember the one before it.

So you log in, then you click My Orders, and that second request says nothing about who you are.

Think about a cloakroom. You hand over your coat, and they give you a ticket with a number on it.

They don't remember your face. When you come back, you show the ticket.

A cookie is that ticket. Your browser shows it on every request, and that's how the server knows it's you.

**Caption:** the server forgets you between every single request. this is how cookies fix that, explained with a cloakroom ticket 🎟️
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #backend #cookies #coding #programming #learntocode #developer #computerscience
**Tags:** http is stateless, how cookies work, what is a session cookie, http cookies explained

---

### SHORT 4: SameSite Strict, Lax and None (25-35 sec)

SameSite decides whether a cookie is sent when the request starts on a different website.

Strict means it's only sent from your own site. Click a link to the shop from an email, and you land on that first page looking logged out.

Lax is the middle one. Clicking a normal link in sends the cookie, but another website submitting a form that posts to the shop doesn't.

None sends it everywhere, and you'd only use that for things like an embedded widget.

**Caption:** SameSite Strict, Lax and None, with one example each, so you know what your login cookie is doing 🍪
full video: [LINK]
**Hashtags:** #Shorts #webdev #websecurity #cookies #backend #cybersecurity #coding #programming #developer #http
**Tags:** samesite cookie, samesite lax vs strict, samesite none, cookie flags explained

---

### SHORT 5: Your login token and localStorage (30-40 sec)

If you store your login token in localStorage, any JavaScript on your page can read it.

So if an attacker gets a script onto your page, maybe through a compromised npm package or a review box that doesn't escape what people type, they can take the token and use it from anywhere until it expires.

An HttpOnly cookie can't be read by JavaScript, so it can't be taken away like that.

But the attacker's script can still send requests to your site, and the browser will attach the cookie. So you still need to stop XSS.

**Caption:** what an attacker's script can do with a token in localStorage, and what an HttpOnly cookie does and doesn't protect you from 🔐
full video: [LINK]
**Hashtags:** #Shorts #websecurity #cybersecurity #javascript #webdev #authentication #frontend #coding #developer #programming
**Tags:** where to store jwt, xss localstorage, jwt localstorage vs cookie, httponly cookie

---

### SHORT 6: CSRF, the risk cookies bring (25-35 sec)

The browser sends cookies automatically.

So another website could make your browser send a request to your shopping site, like a hidden form that places an order, and your login cookie would go with it.

That's called CSRF, cross-site request forgery.

Setting SameSite to Lax or Strict blocks a lot of that.

And frameworks usually add a CSRF token on top, a secret value the attacker's website can't know, so the fake request gets rejected.

**Caption:** cookies get sent automatically, and that's exactly what CSRF uses. this is how SameSite and CSRF tokens stop it 🛡️
full video: [LINK]
**Hashtags:** #Shorts #websecurity #csrf #webdev #backend #cybersecurity #coding #programming #developer #authentication
**Tags:** csrf explained, cross site request forgery, csrf token, samesite csrf

---

### SHORT 7: Laravel already does this for you (20-30 sec)

If you're using Laravel, for example, your login already lives in a session cookie.

In recent versions, it's named after your app, so an app called Shop Online gets shop-online-session.

The cookie holds the session ID, and the session data stays on the server.

And Laravel encrypts and signs every cookie it creates, through the EncryptCookies middleware, so the user can't read or change what's inside.

**Caption:** what Laravel already does with your login cookie before you write a single line, straight from the default config and the docs 🛡️
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #webdev #backend #authentication #websecurity #coding #developer #programming
**Tags:** laravel session cookie, laravel encrypted cookies, encryptcookies middleware, laravel cookies

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: you close the tab by mistake
**Caption:** your checkout form is gone, but your cart is still there and you're still logged in. that's because they're kept in three different places in your browser.
full video: [LINK]
**Hashtags:** #Shorts #webdev #javascript #frontend #coding #programming #developer #learntocode #techtok
**Tags:** cookies vs localstorage vs sessionstorage, browser storage explained, why did my form disappear

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** why websites need cookies
**Caption:** HTTP is stateless, so the server doesn't remember your last request. a cookie is how your browser tells it who you are every time.
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #backend #cookies #coding #programming #learntocode #developer
**Tags:** http is stateless, why websites use cookies, how login works, http cookies explained

---

### CLIP 3 — subset of Segment 2
**Starts:** "Think about the cloakroom." **Ends:** "...your browser shows that cookie on every request after that."
**Overlay:** cookies, explained with a cloakroom ticket
**Caption:** they don't remember your face, they use the number on your ticket to find your coat. a session cookie works the same way.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cookies #backend #coding #learntocode #developer #techtok
**Tags:** what is a session cookie, how cookies work, session id explained, http is stateless

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** how cookies work
**Caption:** the server sets a cookie with Set-Cookie, your browser sends it back with every request to that site, and each one holds about 4KB.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cookies #http #backend #javascript #coding #programming #developer
**Tags:** how cookies work, set-cookie header, document.cookie, http cookies explained

---

### CLIP 5 — subset of Segment 3
**Starts:** "A cookie is a small piece of text, a name and a value" **Ends:** "...it sends the cookie back automatically, in a Cookie header."
**Overlay:** what Set-Cookie actually does
**Caption:** the server asks your browser to hold a name and a value, and after that your browser sends it back on every request to that site without you writing any code.
full video: [LINK]
**Hashtags:** #Shorts #webdev #http #cookies #backend #coding #developer #learntocode
**Tags:** set-cookie header, cookie header, how cookies work, http headers explained

---

### CLIP 6 — subset of Segment 3
**Starts:** "Now, how long can a cookie live?" **Ends:** "...won't keep any cookie for more than 400 days after it's set."
**Overlay:** session cookie vs persistent cookie
**Caption:** no expiry makes it a session cookie, meant to go when the browser closes. Expires or Max-Age makes it persistent. and Chrome caps any cookie at 400 days.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cookies #http #backend #coding #developer #learntocode
**Tags:** session cookie vs persistent cookie, cookie max-age, cookie expires, cookie 400 days

---

### CLIP 7 — subset of Segment 3
**Starts:** "Now, in my e-commerce store, the login lives in a cookie like this." **Ends:** "...like the cloakroom number and your coat."
**Overlay:** what's actually inside your login cookie
**Caption:** the cookie only holds a random ID. the server keeps the real details about you and uses that ID to look them up.
full video: [LINK]
**Hashtags:** #Shorts #webdev #cookies #backend #authentication #coding #developer #techtok
**Tags:** session id explained, what is a session cookie, how login works, server side sessions

---

### CLIP 8 — Segment 4 (whole)
**Overlay:** what localStorage is for
**Caption:** a key and value store in your browser, about 5MB per origin in most browsers, strings only, and it stays until it's cleared. it never goes to the server by itself.
full video: [LINK]
**Hashtags:** #Shorts #javascript #webdev #frontend #localstorage #coding #programming #learntocode #developer
**Tags:** localstorage explained, localstorage setitem, localstorage size limit, localstorage per origin

---

### CLIP 9 — subset of Segment 4
**Starts:** "It only stores strings." **Ends:** "...you get it back with JSON.parse."
**Overlay:** saving a cart in localStorage
**Caption:** localStorage only stores strings, so a cart goes in with JSON.stringify and comes back out with JSON.parse.
full video: [LINK]
**Hashtags:** #Shorts #javascript #webdev #frontend #localstorage #coding #learntocode #developer
**Tags:** localstorage json stringify, localstorage json parse, save cart in localstorage, localstorage objects

---

### CLIP 10 — subset of Segment 4
**Starts:** "localStorage stays until your code removes it, or until the user clears their browser data." **Ends:** "...after seven days of you using Safari without interacting with the site."
**Overlay:** when does localStorage get deleted?
**Caption:** closing the browser doesn't clear it. private windows usually do, and Safari can delete it after seven days of use without interacting with the site.
full video: [LINK]
**Hashtags:** #Shorts #javascript #webdev #frontend #localstorage #safari #coding #developer
**Tags:** when is localstorage cleared, localstorage incognito, safari localstorage 7 days, localstorage persistence

---

### CLIP 11 — Segment 5 (whole)
**Overlay:** sessionStorage vs localStorage
**Caption:** same methods as localStorage, but it belongs to one tab. it's still there after a refresh and it's gone when you close the tab.
full video: [LINK]
**Hashtags:** #Shorts #javascript #webdev #frontend #coding #programming #learntocode #developer
**Tags:** sessionstorage vs localstorage, sessionstorage explained, sessionstorage per tab, web storage api

---

### CLIP 12 — Segment 6 (whole)
**Overlay:** who can read your cookies and localStorage
**Caption:** cookies go to the server with every matching request. localStorage and sessionStorage stay in the browser, but any script on your page can read them, including your analytics script and your chat widget.
full video: [LINK]
**Hashtags:** #Shorts #webdev #javascript #websecurity #frontend #coding #developer #programming
**Tags:** who can read localstorage, are cookies sent to server, localstorage security, browser storage comparison

---

### CLIP 13 — Segment 7 (whole)
**Overlay:** cookie security flags, explained
**Caption:** cookies come with quite a few settings, and HttpOnly, Secure and SameSite are the three that matter most for security.
full video: [LINK]
**Hashtags:** #Shorts #webdev #websecurity #cookies #cybersecurity #backend #coding #developer #http
**Tags:** cookie flags explained, cookie attributes, httponly cookie, secure cookie, samesite cookie

---

### CLIP 14 — subset of Segment 7
**Starts:** "The three that matter most for security are HttpOnly, Secure and SameSite." **Ends:** "...where someone on the same wifi, for example, can read it."
**Overlay:** HttpOnly and Secure, explained
**Caption:** HttpOnly hides the cookie from JavaScript but the browser still sends it with requests. Secure keeps it to HTTPS only.
full video: [LINK]
**Hashtags:** #Shorts #webdev #websecurity #cookies #cybersecurity #javascript #coding #developer
**Tags:** httponly cookie, secure cookie, httponly vs secure, cookie security

---

### CLIP 15 — subset of Segment 7
**Starts:** "If you only remember one flag from this video, make it the next one, SameSite." **Ends:** "...You'd only use that for things like an embedded widget."
**Overlay:** SameSite Strict vs Lax vs None
**Caption:** what Strict, Lax and None each do, with an online shop example for each one.
full video: [LINK]
**Hashtags:** #Shorts #webdev #websecurity #cookies #backend #cybersecurity #coding #developer
**Tags:** samesite cookie, samesite lax vs strict, samesite none, samesite explained

---

### CLIP 16 — Segment 8 (whole)
**Overlay:** where should you store your login token?
**Caption:** localStorage vs an HttpOnly cookie for your login token, what XSS can do to each, and the CSRF risk that comes with cookies.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #authentication #webdev #javascript #cybersecurity #coding #developer #programming
**Tags:** where to store jwt, where to store auth token, jwt localstorage vs cookie, token storage security

---

### CLIP 17 — subset of Segment 8
**Starts:** "There are two common setups." **Ends:** "...and the browser sends it by itself."
**Overlay:** JWT in localStorage vs session cookie
**Caption:** one setup keeps a token in localStorage and adds it to every request yourself. the other keeps a session ID in an HttpOnly cookie that the browser sends by itself.
full video: [LINK]
**Hashtags:** #Shorts #webdev #authentication #javascript #backend #coding #developer #programming
**Tags:** jwt vs session cookie, jwt localstorage, authorization header, session based authentication

---

### CLIP 18 — subset of Segment 8
**Starts:** "The bigger issue with the localStorage one is XSS, cross-site scripting." **Ends:** "...as the data is always accessible by JavaScript.""
**Overlay:** POV: your login token is in localStorage
**Caption:** if an attacker gets a script onto your page, it can read localStorage and send your token to their own server. OWASP says not to store session identifiers there.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #cybersecurity #javascript #webdev #authentication #coding #developer
**Tags:** xss localstorage, xss explained, cross site scripting, owasp localstorage

---

### CLIP 19 — subset of Segment 8
**Starts:** "And you can make the argument that you can use an HttpOnly cookie" **Ends:** "...You still need to stop XSS."
**Overlay:** what HttpOnly cookies don't protect you from
**Caption:** an attacker's script can't read an HttpOnly cookie, but it can still send requests to your site, and the browser attaches the cookie.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #cybersecurity #webdev #javascript #authentication #developer #coding
**Tags:** httponly cookie xss, does httponly prevent xss, cookie security, xss protection

---

### CLIP 20 — subset of Segment 8
**Starts:** "So far, it sounds like cookies are the safe choice" **Ends:** "...So even if they send fake requests, they get rejected."
**Overlay:** CSRF, explained
**Caption:** because cookies are sent automatically, another site can try to make your browser send a request with them. SameSite and CSRF tokens are how you stop it.
full video: [LINK]
**Hashtags:** #Shorts #websecurity #csrf #webdev #backend #cybersecurity #coding #developer
**Tags:** csrf explained, cross site request forgery, csrf token, samesite csrf

---

### CLIP 21 — Segment 9 (whole)
**Overlay:** how Laravel handles your login cookie
**Caption:** the session cookie is named after your app, the session data stays on the server, and every cookie Laravel creates is encrypted and signed.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #webdev #backend #authentication #coding #developer
**Tags:** laravel session cookie, laravel encrypted cookies, encryptcookies middleware, laravel cookies

---

### CLIP 22 — Segment 10 (whole)
**Overlay:** cookies vs localStorage vs sessionStorage cheat sheet
**Caption:** size, whether it goes to the server, who can read it, and how long it lives, side by side, with where each one fits in an online shop.
full video: [LINK]
**Hashtags:** #Shorts #webdev #javascript #frontend #cheatsheet #coding #programming #developer #learntocode
**Tags:** cookies vs localstorage vs sessionstorage, browser storage comparison, storage cheat sheet, when to use localstorage

---

**Posting order:** 1 first (the relatable moment), then 18 (the token in localStorage, which is what people search), then 15 (SameSite gets saved), then 3 (the cloakroom works cold), then 22 (the cheat sheet), then 10 and 20. Post 21 on its own day for the Laravel audience.

---

## 6. CAPTIONS

### TikTok caption:
> you close the tab by mistake, your checkout form is gone, but your cart and your login are still there 😅 that's cookies, localStorage and sessionStorage doing three different jobs, and this is where your login token should go.
**Hashtags:** #webdev #javascript #cookies #websecurity #learntocode

### Instagram Reel caption:
> Have you ever closed a tab by mistake and lost a half-filled form, but your cart and your login were still there?
>
> That happens because websites keep things in three different places in your browser. Cookies are sent to the server with every request, and that's how a site knows you're logged in. localStorage stays in the browser until it's cleared, even after you close it. sessionStorage belongs to one tab, so it's gone when that tab closes.
>
> I also go through HttpOnly, Secure and SameSite, and where a login token should go, because anything in localStorage can be read by any script that ends up on your page.
>
> Full video on YouTube, link in bio.
>
> #webdev #javascript #frontend #websecurity #learntocode

### LinkedIn caption:
> Where should a web app keep a user's login?
>
> HTTP doesn't remember anything between requests, so the browser has to send something back each time to say who the user is.
>
> Cookies do that automatically, because the browser attaches them to every matching request, and the HttpOnly flag stops JavaScript from reading them.
>
> localStorage keeps far more data and never leaves the browser on its own, but any script on the page can read it, which is why OWASP advises against storing session identifiers there.
>
> sessionStorage has the same exposure, and it is cleared when the tab closes, so it suits short-lived things like a half-filled form.
>
> Cookies bring their own risk in cross-site request forgery, which SameSite and CSRF tokens address, and none of these choices removes the need to prevent cross-site scripting.
>
> Full walkthrough: [LINK]
>
> #webdevelopment #websecurity #javascript #softwareengineering #laravel

---

## 7. X / TWITTER

**The approach.** Each tweet says one concrete thing in your lowercase typing. The cheat sheet goes out as an image because that format has done far better than text in your searches. The quiz and the "can you guess" tweet only work if you post the answer as a reply a few hours later. The link always goes in a reply, never in the first tweet.

### THE IMAGE POST

**Tweet text:**
> cookies vs localStorage vs sessionStorage, the whole thing on one card

**Image content (one clean card in Canva):**
> **COOKIES vs localStorage vs sessionStorage**
> **Cookie** · about 4 KB each · sent to the server with every matching request · JS can read it unless HttpOnly · lives until it expires (session cookie: until the browser closes)
> **localStorage** · about 5 MB per origin (varies by browser) · never sent to the server by itself · any JS on the page can read it · stays until cleared
> **sessionStorage** · about 5 MB per origin (varies) · never sent by itself · any JS on the page can read it · gone when the tab closes
> **Cookie flags that matter most** · HttpOnly = no JS access · Secure = HTTPS only · SameSite = Strict / Lax / None
> **Online shop** · login = HttpOnly cookie · guest's cart = localStorage · checkout form = sessionStorage

**Reply:**
> I went through all of it from the beginning here: [LINK]

---

### THE TIPS LIST

> browser storage tips I wish I'd learned earlier
>
> 1. localStorage only stores strings, so JSON.stringify your objects
> 2. sessionStorage survives a refresh but not closing the tab
> 3. http and https versions of your site get separate localStorage
> 4. anything in localStorage can be read by every script on your page
> 5. HttpOnly hides a cookie from javascript but the browser still sends it
> 6. an HttpOnly cookie still needs CSRF protection

**Reply:** full video on all of these: [LINK]

---

### THE QUIZ

> you put a half-filled checkout form in sessionStorage. which of these clears it?
>
> A. refreshing the page
> B. closing the tab
> C. opening the site yourself in a new tab

**Your reply a few hours later:**
> it's B. a refresh keeps it, and a new tab you open yourself just gets its own empty sessionStorage. the first tab still has the form

---

### THE "CAN YOU GUESS" TWEET

> can you guess the longest Chrome will let a cookie live, no matter what expiry the server sets?

**Your reply:**
> 400 days. if a server asks for longer, chrome cuts it down to 400 days from when the cookie was set

---

### THE LAUNCH TWEET

> made a video on cookies, localStorage and sessionStorage from the very beginning. why the browser has to remember anything, what each one is for, the cookie flags, and where your login token should go

**Reply:** [LINK]

---

### STANDALONE TWEETS

> you close a tab by mistake and the checkout form is gone, but the cart is still there. that's usually the form living in sessionStorage and the cart living in localStorage

> if your login token is in localStorage and a compromised npm package gets onto your page, that package can read the token and send it anywhere

> an HttpOnly cookie can't be read by javascript, but an attacker's script on your page can still send requests with it. so you still have to stop the XSS itself

> SameSite=Strict on your login cookie means someone who clicks a link to your shop from their email lands on the first page looking logged out

> localStorage on http://yoursite.com and https://yoursite.com are two separate stores, because the origin includes the protocol

> where have you been storing your login tokens? no judgement, I promise

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> where have you been storing your login tokens, localStorage or a cookie? and if it's localStorage, what made you pick it? no judgement, a lot of tutorials do it that way 😅

### Instagram:
> the Safari one surprised me most while I was reading for this. localStorage can get deleted after seven days of using Safari without interacting with the site

### TikTok:
> refresh keeps it, closing the tab deletes it. that's sessionStorage in one line 😭

### LinkedIn:
> One thing I tried to be careful about in this one. HttpOnly cookies stop a script from reading the token, but they don't stop a script that is already running on the page from sending requests. Preventing XSS is still the job, wherever the token lives.

### X (reply to your own tweet):
> if you're on Laravel, the session cookie is already HttpOnly and SameSite Lax by default, and every cookie it creates is encrypted. check that before building your own token setup

### REPLIES TO EXPECT (ready to paste)

**"JWT in localStorage is fine if you just prevent XSS."**
> if you really can prevent every XSS, then yes, the risk is much smaller. but one compromised dependency is enough, and with an HttpOnly cookie a script can't carry the token off your site

**"HttpOnly doesn't stop XSS though."**
> agreed, I say that in the video. a script on your page can still send requests with the cookie. HttpOnly stops it from stealing the token and using it somewhere else

**"SameSite=None needs Secure."**
> yes it does. browsers reject SameSite=None without Secure, so you'd set both

**"What about mobile apps? They don't have cookies."**
> mobile apps are a different setup, they usually keep tokens in the phone's secure storage. this video is about the browser

**"Isn't sessionStorage safer than localStorage for tokens?"**
> it's cleared sooner, which helps a bit, but any script on the page can read sessionStorage too. so for XSS it's the same risk

**"What about IndexedDB?"**
> IndexedDB is for bigger, structured data, like offline apps. it's also readable by any script on the page, so the same advice about tokens applies

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** cookies vs localStorage vs sessionStorage, explained simply
**Slide 2:** the server forgets you between requests, so your browser has to remind it who you are.
**Slide 3:** a cookie is like a cloakroom ticket, and your browser shows it on every request.
**Slide 4:** cookies are about 4KB each and get sent to the server with every matching request.
**Slide 5:** localStorage holds about 5MB in most browsers and stays until it's cleared.
**Slide 6:** sessionStorage belongs to one tab, so it's gone when you close that tab.
**Slide 7:** any script on your page can read localStorage and sessionStorage.
**Slide 8:** HttpOnly means JavaScript can't read the cookie, and Secure means HTTPS only.
**Slide 9:** SameSite decides if the cookie goes along when another website starts the request.
**Slide 10:** in an online shop, the login is an HttpOnly cookie, the cart is in localStorage, and the checkout form is in sessionStorage.

**Carousel caption:**
> the browser storage cheat sheet, with where each one fits in an online shop. full video on YouTube, link in bio.
>
> #webdev #javascript #frontend #websecurity #learntocode

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Where Should Your Login Token Live?

### Subtitle:
> Cookies, localStorage and sessionStorage, what each one is for, and why the choice matters most for your login.

### SEO Title:
> Cookies vs localStorage vs sessionStorage: Where to Store Auth Tokens

### SEO Description:
> How cookies, localStorage and sessionStorage differ in size, lifetime and who can read them, what HttpOnly, Secure and SameSite do, and where to store a login token.

---

If you have ever closed a tab by mistake halfway through a checkout form on an online shop, you have probably seen all three of these storage options at work. The form was gone when you came back, but your cart was still there, and you were still logged in. Those three things were kept in three different places in your browser.

It starts with HTTP being stateless. Every request your browser sends stands on its own, and the server does not remember the request before it. RFC 6265, the standard that defines cookies, describes them as a way of "letting the servers maintain a stateful session over the mostly stateless HTTP protocol." I think of a cookie as a cloakroom ticket. We live in the Baltics, and at my school you hand over your coat and they give you a ticket with a number on it. They don't remember your face, they use the number. In the same way, after you log in, the server gives your browser a cookie with a session ID in it, your browser shows it on every request after that, and the server uses that ID to look up the real details about you.

Cookies are small, about four kilobytes each, and the browser attaches them to every request that matches their domain and path. A cookie with no expiry is a session cookie, meant to go when the browser closes, although MDN warns that browsers with session restore can bring them back. A cookie with Expires or Max-Age is persistent, and Chrome caps that at 400 days. localStorage is a key and value store that only holds strings, so a cart goes in with JSON.stringify and comes out with JSON.parse. Most browsers give it about five megabytes per origin, and it stays until your code or the user clears it, with two exceptions. Private windows usually clear it when they close, and Safari can delete it after seven days of Safari use without the user interacting with the site. sessionStorage has the same methods but belongs to a single tab, so it survives a refresh and is cleared when the tab closes.

Who can read each one is the difference that matters most. Cookies go to the server, while localStorage and sessionStorage stay in the browser unless your code sends them. Inside the browser, though, any script on your page can read localStorage and sessionStorage, and that includes analytics scripts, chat widgets and every package you installed. Cookies can be read through document.cookie too, unless the server marks them HttpOnly.

Cookies come with quite a few settings, called attributes or flags, and three of them matter most for security. HttpOnly hides a cookie from JavaScript, although the browser still sends it with requests. Secure keeps it to HTTPS. SameSite decides whether the cookie is sent when the request starts on a different website. Strict sends it only from your own site, so someone who clicks an emailed link lands on that first page looking logged out. Lax also sends it when someone follows a normal link in, but not when another site submits a form to yours. None sends it everywhere, and you would only use it for something like an embedded widget.

For login tokens, the OWASP HTML5 Security Cheat Sheet is direct: "Do not store session identifiers in local storage as the data is always accessible by JavaScript." If an attacker manages to run a script on your page, through a compromised npm package or a product review box that shows what people type without escaping it, that script can read a token from localStorage and send it to their own server. An HttpOnly cookie cannot be read that way. It does not make XSS harmless, though. A script running on your page can still send requests to your site with the cookie attached, so you still need to stop XSS. Cookies also bring cross-site request forgery, where another site makes your browser send a request with your cookie on it. SameSite set to Lax or Strict blocks a lot of that, and frameworks usually add a CSRF token, a secret value the attacker's site cannot know.

If you use Laravel, a lot of this is already set up. Your login lives in a session cookie named after your app, so an app called Shop Online gets shop-online-session in recent versions. The cookie holds the session ID, the session data stays on the server, and the EncryptCookies middleware encrypts and signs every cookie Laravel creates so the user cannot read or change it. So in an online shop, I would put the login in an HttpOnly cookie, the guest's cart in localStorage, and the half-filled checkout form in sessionStorage, and nothing secret in either storage.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Web Development, JavaScript, Web Security, Cookies, Programming

---

## 11. REFERENCES & SOURCES

**1. Why the browser needs to remember things (Segment 2)**
- RFC 6265, abstract: cookies let servers "maintain a stateful session over the mostly stateless HTTP protocol." Supports "HTTP is stateless" and the cloakroom framing. https://www.rfc-editor.org/rfc/rfc6265
- MDN, Using HTTP cookies (session management as the main use). https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies

**2. Cookies: size, lifetime, document.cookie (Segment 3)**
- RFC 6265 section 6.1: browsers SHOULD support "at least 4096 bytes per cookie," and servers should keep cookies small because the Cookie header goes in every request. Supports "about 4 kilobytes" and "keep them small." https://www.rfc-editor.org/rfc/rfc6265
- RFC 6265bis draft: ignores a cookie whose name plus value is over 4096 octets, and caps Expires and Max-Age at 400 days. https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/
- Chrome for Developers: from Chrome 104 (August 2022), a cookie's expiry can't be set more than 400 days in the future. Supports "won't keep any cookie for more than 400 days after it's set." https://developer.chrome.com/blog/cookie-max-age-expires
- MDN, Set-Cookie: a cookie without Expires or Max-Age is a session cookie, and the session restore warning ("Session cookies will also be restored, as if the browser was never closed"). Supports "meant to." https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- MDN, Document.cookie. https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

**3. localStorage and sessionStorage (Segments 4 and 5)**
- MDN, Web Storage API (origin-scoped, strings only). https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN, Storage quotas and eviction criteria: "Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin," and private browsing data is usually deleted when private mode ends. Supports "about five megabytes, but it varies" and the incognito line. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN, Window.sessionStorage: a page session "survives over page reloads and restores," "Opening a page in a new tab or window creates a new session," and "Closing the tab/window ends the session and clears the data." Supports the refresh, close and second-tab lines. https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- WebKit, Full Third-Party Cookie Blocking and More (March 2020, Safari 13.1): ITP deletes "all of a website's script-writable storage after seven days of Safari use without user interaction on the site," and localStorage is on the list. Supports the Safari line, worded as "without interacting with the site." https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/

**4. Cookie flags (Segment 7)**
- MDN, Set-Cookie: the full attribute list shown on screen (HttpOnly, Secure, SameSite, Domain, Path, Expires, Max-Age, Partitioned, and the __Host- prefix). HttpOnly "Forbids JavaScript from accessing the cookie," and an HttpOnly cookie "will still be sent with JavaScript-initiated requests," for example fetch(). Secure is HTTPS only. SameSite Strict, Lax and None. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie

**5. The login token question (Segment 8)**
- OWASP HTML5 Security Cheat Sheet, quoted exactly in the script and on screen: "Do not store session identifiers in local storage as the data is always accessible by JavaScript. Cookies can mitigate this risk using the httpOnly flag." https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
- OWASP CSRF Prevention Cheat Sheet: SameSite is "a defense-in-depth control," CSRF tokens are the main defence, and "Cross-Site Scripting (XSS) can defeat all CSRF mitigation techniques!" Supports "SameSite blocks a lot of that," "frameworks usually add a CSRF token on top," and "HttpOnly doesn't make XSS harmless." https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

**6. Laravel (Segment 9)**
- Laravel skeleton config/session.php, 12.x and 13.x: the cookie name is Str::slug(APP_NAME).'-session', so "Shop Online" gives shop-online-session. 11.x used Str::slug(APP_NAME, '_').'_session', so shop_online_session. http_only defaults to true and same_site to 'lax'. https://github.com/laravel/laravel/blob/12.x/config/session.php
- Laravel docs, HTTP Responses, Cookies and Encryption: "thanks to the Illuminate\Cookie\Middleware\EncryptCookies middleware, all cookies generated by Laravel are encrypted and signed so that they can't be modified or read by the client." https://laravel.com/docs/responses

**7. Corrections / careful wording**
- **"Session cookies are deleted when you close the browser."** Only when session restore isn't on. MDN warns about this, and your own "I say meant to" line covers it.
- **"Chrome keeps cookies for at most 400 days."** The cap is on how far ahead the expiry can be set, so a site that re-sets the cookie can keep extending it. The script says "after it's set."
- **"localStorage is 5MB."** Common figure and MDN uses it, but browsers differ, so the script keeps your "it varies."
- **Safari's seven days.** WebKit's wording is "seven days of Safari use without user interaction on the site," so "without visiting the site" became "without interacting with the site." It applies when Intelligent Tracking Prevention is on, which is Safari's default, so the script keeps "can delete."
- **"Every new tab gets its own sessionStorage."** True for a tab you open yourself, which is exactly your line. A duplicated tab (or a page opened from another page) starts with a copy, so the "by yourself" stays in.
- **"localStorage and sessionStorage hold a little more than cookies."** About 5 MB against about 4 KB is a lot more, so the summary says "a lot more."
- **"Strict means you land logged out."** You're still logged in, the cookie just isn't sent on that first request, so the script says "looking logged out."
- **"The login lives in a session cookie" in Segment 3.** Right after you define a session cookie as one with no expiry, this could sound like the login cookie has no expiry. It became "the login lives in a cookie like this." Laravel calls its cookie the session cookie, so Segment 9 keeps your wording.
- **"HttpOnly cookies protect you from XSS."** They only stop the token being read. The script keeps your line that the attacker's script can still send requests with the cookie, which matches OWASP's CSRF cheat sheet.
- **SameSite=None needs Secure.** True in every current browser, but you asked to stop after the embedded widget line, so it's in the replies to expect instead.
- **The OWASP line** is a direct quote, credited on camera and shown on screen.
- **Laravel cookie name.** "shop-online-session" is right for Laravel 12 and 13. Laravel 11 gives "shop_online_session," which is noted on screen.

---

## NOTES

- **What's new vs version 2:** the script is now your read-through. Every example is the online shop (no bookstore). The session ID line is rewritten the way you asked. The flag list is on screen only, and the spoken part goes straight to HttpOnly, Secure and SameSite. Third-party cookies and consent, Domain and Path, the SameSite default, Sanctum and the duplicated-tab case are gone (full list in WHAT CHANGED). There are 10 segments, 22 clips, a main short and 6 additional shorts.
- **Cross-links:** 15 What happens when you send an API request (the request and response headers in Segment 3 show up there too), 13 HTTP status codes, 16 Paystack payments in a Laravel app (where card details actually go), and 49 Networking basics every internet user should know.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later.
- **Before recording:** the Laravel line says shop-online-session, which is what Laravel 12 and 13 give. If your project is on Laravel 11, say shop_online_session.

---

## WHAT CHANGED (from your 27 October read-through)

**Dictation fixes (your words, cleaned)**
- "still logging" is "still logged in." "return remember" is "remember." "my hudders" is "My Orders." "sticket" is "ticket." "section ID" is "session ID."
- "small piece of test" is "small piece of text." "on expiry" is "an expiry." "I say mental" is "I say 'meant to'." "maxim max age" is Max-Age. "document or cookie" and "true document.cookie" are document.cookie.
- "JSON.pass" is JSON.parse. "megapytes" is megabytes. "the old browser" is "the whole browser." "your cards" is "your cart."
- "section storage" and "storage session storage" are sessionStorage. "R field" and "and fill" are "half-filled." "parts" is "path." "analytics screen" is "analytics script."
- "same side / straight" is SameSite / Strict. "aspires" is Expires. "partition and name preferences like O's" is Partitioned and the __Host- prefix (on screen only). "ATTPS" is HTTPS.
- "job WT" is JWT. "head" is header. "MPM" is npm. "xxs amlex" is "XSS harmless." "XX" is XSS. "rigs" is "risks." "eating form" is "hidden form."
- "Lara" is Laravel. "The other also encrypts" is "Laravel also encrypts." "encrypt cookies middleware" is the EncryptCookies middleware. "marching request" is "matching request." "HTCP" is HTTP. "guest cards the cards" is "the guest's cart."
- "cloak section" is "cloakroom." "we can touch it" is "who can touch it." "the browser asks your that the server asks your browser" is "the server asks your browser." "after that after that" and "to that website to that site" keep one each.
- Your notes to me ("that statement is a little bit confusing," "I don't have to go over this list," "We can leave out the rest," "I'm not using book store example in this case," "I don't think we need to talk about third parties") are removed from the script.

**Your instructions, applied**
- The session ID line is now "The cookie itself only holds a random ID, the session ID. The server keeps the real details about you, and uses that ID to look them up, like the cloakroom number and your coat."
- The flags segment says "Cookies come with settings called attributes. People usually call them flags, and there are quite a few of them," shows the full list on screen only, and goes straight to HttpOnly, Secure and SameSite.
- SameSite ends on "You'd only use that for things like an embedded widget." The SameSite default, the Secure requirement for None, Domain, Path and short Max-Age are gone.
- Every example is the online shop. The review box is a product review box, and the cart on screen holds a product.
- The third-party cookies and consent segment is gone.
- Your Baltics and school cloakroom lines are kept as you said them.

**Small changes for accuracy or for a stranger (one line each)**
- "Chrome won't keep any cookie for more than 400 days" gained "after it's set," because the cap is on the expiry date.
- Safari's seven days now say "without interacting with the site," which is WebKit's wording.
- "you land on that first page logged out" is now "looking logged out."
- In Segment 3, "the login lives in a session cookie" is now "the login lives in a cookie like this," so it doesn't clash with the session cookie definition two lines up.
- Segment 4 opens with "The second place a website can keep things in your browser is localStorage," so a clip of it makes sense on its own.
- "hold a little more than cookies" is now "a lot more" (about 5 MB against about 4 KB).
- Your OWASP line is now credited: "So, in the words of OWASP's security cheat sheet, you don't want to 'store session identifiers in local storage as the data is always accessible by JavaScript.'" The quote is also on screen.
- "So if your app is shop online, you get shop online session" is now "shop-online-session," with Laravel 11's underscore version on screen.

**What you dropped from the old script (so it's out of this kit)**
- The duplicated-tab case for sessionStorage, and the Safari note on it.
- The SameSite default in Chrome, Secure being required with None, Domain, Path, and "keep Max-Age short."
- The OWASP SameSite "extra layer" line, "if you ask me" (your recommendation for a website or SPA), the in-memory access token with a refresh cookie, and "stopping XSS is still the main job."
- The Laravel config defaults spoken out loud, and all of Sanctum (the csrf-cookie call, the "does not use tokens of any kind" quote, the same-domain rule, API tokens).
- Third-party cookies in Safari, Firefox and Chrome, the Privacy Sandbox dates, and the EU consent line.
- The comment question at the end ("where have you been storing your login tokens?"). It's still the pinned comment and the description question.
- Because of these, the duplicated-tab clip, the Domain and Path clip, the Sanctum clip, the third-party cookies clip and short, the "can you guess" tweet about Chrome's third-party cookies, the Domain and SameSite-default tips, the duplicated-tab Instagram comment, the Chrome reply to expect, and the Sanctum and Privacy Sandbox sources are removed. New ones are a Set-Cookie clip, a "what's inside your login cookie" clip, a JSON clip, a two-setups clip, a CSRF short, the 400-day "can you guess" tweet, and a SameSite=None reply.

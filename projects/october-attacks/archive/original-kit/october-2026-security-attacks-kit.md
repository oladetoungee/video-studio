# PHP2Shell, Railway and Stolen API Keys: October 2026 Security Recap: Content Kit
**A news video for tomorrow. October is Cybersecurity Awareness Month, and it turned out to be one of the roughest months for developers in a while. This kit covers what happened with PHP, Railway, Zeabur and OpenCode, and the hacker who used AI agents to break into over 100 companies. It also covers what each one means for you and what to do today.**
**Every segment stands alone, so each one can be cut into a clip. Every fact is checked against the reporting as of October 25, 2026.**

---

## TAG POOL (67 tags, every tag used anywhere in this kit, deduplicated)

php2shell, php vulnerability, php security update, railway hack, railway security incident, cybersecurity news, cybersecurity awareness month, october 2026 cyberattacks, api keys stolen, environment variables security, rotate api keys, zeabur breach, zeabur shutting down, opencode hack, ai agents hacking, ai cyberattack, emudhra certificates, php patch, laravel security, php 8.5.12, php-fpm vulnerability, remote code execution, developer security, secrets management, web security, tech news, backend development, web development, gbemisola oladetoun, withgbemi, php2shell fix, php version check, php-fpm restart, php2shell explained, php remote code execution, php vulnerability 2026, api key expiry, admin token security, ai cyberattack 2026, norforge cairn, ai hacker 100 websites, cybersecurity awareness month 2026, what is php2shell, cve-2026-109618, what is a shell, php2shell meaning, remote code execution explained, php zero day, php2shell exploit, amazon honeypot, php2shell timeline, laravel php2shell, php version laravel, railway environment variables, admin token expiry, key rotation, zeabur admin token, stolen ai api keys, opencode console breach, api key security, secrets management best practices, weak private key, certificate authority compromised, ai found php2shell, ai agents cyberattack, cost of ai hacking, developer life

## HASHTAG POOL (32 hashtags, every hashtag used anywhere in this kit)

#Shorts #cybersecurity #php #php2shell #webdev #developer #technews #infosec #backend #laravel #programming #wordpress #devops #railway #apikeys #zeabur #cloud #ai #aiagents #hacking #tech #learntocode #aws #security #opencode #openai #bestpractices #https #browser #techlife #relatable #softwareengineering

---

## WHAT CHANGED (version 4, your new read-through is the base)

This is your new read-through, in your order and your words, including "like they are checking out, they're like no, we can't do this anymore," "that's how weak their keys were, like just number four," and "it's been crazy." I only cleaned up the transcription and split it into segments for clips.

**What you dropped (now gone from the script, clips and captions):**
- The line saying "three quarters" doesn't mean three quarters of sites were hacked.
- Who found the bugs (Calif, Wiz, OpenAI).
- The Ubuntu/Debian version-number note.
- The fixes for PHP 7.4 to 8.1.
- The Railway "couldn't push new keys" line.
- The asides to me ("I'll remove the option I had").

**Transcription fixes:**
- "the language man, most of the website" became "the language behind most of the websites"
- "security rules" became "security holes"
- "deploy hubs" became "deploy apps"
- "Zebur / the bill" became Zeabur
- "another account" became "another hacker"
- "mediaware" became middleware
- "only port servers" became honeypot servers
- "8.1 or holder, get offgrade" became "8.1 or older, upgrade"
- "railwheel" became Railway
- "will have accessed" became "may have accessed"
- "bridge" became breach
- "admin stocken" became admin tokens
- "from the abuse" became "from their bills"
- "open soul code console" became OpenCode Console
- "took those case" became "took those keys"
- "getting a lot" became "getting alerts"
- "things that you know use" became "things that you didn't use"
- "reforms" became refunds
- "it mudr" became eMudhra
- "home signing keys" became "signing keys"
- "he made a second set" became "it made a second set"
- "AHI / he hi" became AI
- "act into" became "hack into"
- "find the box" became "find the bugs"

**Fact fixes:**
- **"More than a million company websites"** became "more than a hundred". Reuters reported over 100.
- **"Restart your php your Apache"** became "restart PHP-FPM or Apache".
- **"Someone can literally fake a website and your browser will still…"** became "someone could have faked a website". You trailed off there, and the browsers have since blocked those keys. I added one short line saying Chrome and Firefox blocked them as soon as it was found, so nobody can say the danger is still live. Delete it if you want.
- **"The GitHub situation":** you answered my question in the recording, so the line now reads "I remember earlier this year there was the GitHub situation, I even made a video about it."

**Still optional:** the comment question at the very end. Your ending, "It's been crazy," works on its own.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** your read-through, cleaned up and split into standalone segments.

---

**[SEGMENT 1: OPEN]**

Things have been happening on the internet this month.

October is supposed to be Cybersecurity Awareness Month, and it has ironically been one attack after the other.

PHP, which is the language behind most of the websites in the world, had two critical security holes.

Railway, which is a popular platform among developers where we deploy our apps, has had to literally tell their users to change their secret keys.

There's also another platform, Zeabur, that is literally shutting down after being hacked twice. Like they are checking out. They're like, no, we can't do this anymore.

And there is news of another hacker that has used AI agents to break into more than a hundred companies.

So it's been an overflow of attacks this month.

---

**[SEGMENT 2: PHP2SHELL]**

I think the PHP one is the biggest one.

PHP runs nearly three quarters of the websites in the world. WordPress runs on PHP. Laravel runs on PHP.

I write PHP at work. Most of the web runs on PHP.

And two critical loopholes have been found in PHP this month. They're calling it PHP2Shell.

**[ON SCREEN: PHP2Shell = CVE-2026-109618 + CVE-2026-109619 · rated 9.2 out of 10]**

The "shell" part of the name is actually scary.

Getting a shell means that the attack is so bad that an attacker can type commands on your server as if they were on their own computer.

PHP has rated this 9.2 out of 10. So it is really terrible.

There are two bugs reported.

The first one is about memory. So if PHP runs out of memory at a very specific moment while it's reading a request, it leaves some half-finished data behind. Then its clean-up code treats that broken data like it's real, and an attacker can use that to run their own commands.

The second bug is more about leftover information. Like leftover stuff on PHP workers from previous requests that it should have thrown away.

Now, these are not just random bugs. They are huge loopholes that people have already tried to exploit.

**[~1:00 BEAT: next is why this one is so much worse]**

---

**[SEGMENT 3: WHY PHP2SHELL IS SO CRAZY]**

The thing about PHP2Shell, and why it's really so crazy, is that it happens before your code even runs.

So PHP reads the incoming request first, and this loophole is in that reading part.

So your login, your middleware, your authentication, nobody stands a chance against this stuff.

You can have the best login in the world, and it wouldn't matter.

Even Amazon has reported that someone tried to use it on one of their honeypot servers, which is basically a trap server set up to catch attackers, just four days before it was announced.

And there are government websites in Europe that literally went offline while they patched, because of all of this.

---

**[SEGMENT 4: WHAT TO DO ABOUT PHP2SHELL]**

So basically, if you're running PHP anywhere, you have to update your PHP.

**[CODE ON SCREEN]**
```bash
# Fixed versions
# 8.5.12   8.4.27   8.3.36   8.2.35

php -v   # check what you're running
```

If you're still on PHP 8.1 or older, upgrade.

And updating the package is not even enough. You have to restart PHP-FPM or Apache, and if you use Docker, you have to rebuild your images.

So everybody has been patching.

**[~3:00 BEAT: the fix, the part people will come back for]**

And if you're using Laravel, for example, your Laravel version doesn't even protect you here, because the loophole is in PHP, which is underneath Laravel.

And it's not even just PHP. Node.js also had its own security release on that same day. So if you run Node, you need to update that too.

---

**[SEGMENT 5: THEN RAILWAY HAPPENED]**

Now, while everyone was busy patching PHP, Railway happened on the same day.

If you don't know what Railway is, Railway is a deployment platform where you can deploy your apps.

So basically, Railway said that someone may have accessed their customers' encrypted environment variables.

And if you're a developer, you know how important it is to keep your environment variables safe.

**[CODE ON SCREEN]**
```bash
# .env
DB_PASSWORD=...
OPENAI_API_KEY=sk-...
AWS_SECRET_ACCESS_KEY=...
```

So Railway paused deployments for a while, and this even affected me myself. And they had to ask their users to revoke and change their API keys and cloud keys.

There's still no full detail from Railway on how the attackers got in.

They did say that they think it's part of a series of attacks on platforms like theirs, with the goal of getting to AI companies.

---

**[SEGMENT 6: ZEABUR IS SHUTTING DOWN]**

And Zeabur, the company that is shutting down because of attacks, is even the interesting one.

This is also another platform that developers use to deploy their apps, and they are shutting down completely. Like they are completely checking out.

So they got breached in August, and then on October 14th and 15th, they got breached again with leaked internal credentials.

The second breach covered about 321,810 accounts and about 3.2 million environment variable records.

So how did the attackers get in the second time, after the first time?

According to Zeabur, their admin tokens had no expiry date. So they had not changed these tokens since January 2024.

So after the first attack, when they changed their keys, they didn't include that particular set of tokens.

And that kind of opened the gates again, and now the whole platform is literally just closing.

They said they will pause services and just shut everything down by the end of December.

This is crazy.

---

**[SEGMENT 7: OPENCODE AND THE SURPRISE AI BILLS]**

The OpenCode one is also very interesting, because people found out OpenCode had been hacked from their bills.

OpenCode is an open-source AI coding tool. It has an online platform called OpenCode Console, where some people store their AI API keys.

Now, OpenCode said attackers broke into an older system and took those keys. That was about 1.4 percent of Console users.

So people started getting alerts from OpenAI, Anthropic and Google, and some of these charges were in the hundreds of dollars.

A few of them were even over a thousand dollars, for AI usage that they did not run.

Now imagine getting alerts for things that you didn't use.

OpenCode calls it a distillation attack. That's when someone asks an AI model loads of questions and just uses the answers to train their own model.

So basically, in simple words, someone may have been building their own AI on other people's bills.

Of course, the AI companies have blocked the stolen keys, and refunds are going out, so that's a good one.

**[~6:00 BEAT: next is what all three have in common]**

---

**[SEGMENT 8: RAILWAY, ZEABUR AND OPENCODE ARE THE SAME PATTERN]**

When you put Railway, Zeabur and OpenCode side by side, you realise they are kind of the same pattern.

In these three situations particularly, the attackers went straight for the place where developers keep their secret keys.

So if you use any of these platforms, you want to change any keys you're not sure about.

You want to give your keys an expiry date wherever the service allows it.

You want to give each key only the access it needs. So if a key only needs to read one storage bucket, just give it access to that one storage bucket.

Set spending limits, set alerts on all your AI and cloud accounts.

And honestly, do not store your keys in tools that don't need them.

---

**[SEGMENT 9: THE CERTIFICATE KEY THAT WAS THE NUMBER 4]**

Now, there's one more story from October, and this one sounds so made up.

eMudhra is one of the companies that your browser trusts to confirm that a website is who it really says it is. This is how important this company is.

Right? So it's like this little padlock that your browser depends on.

Now, it turns out that eight of their signing keys were so weak that one of them was literally the number four.

That's how weak their keys were. Like, just number four.

The script went wrong when the keys were made in April 2025, and it made a second set of weak keys.

So with keys like that, someone could have faked a website, and your browser would still have shown the padlock.

**[SMALL ADD, delete if you want]** Chrome and Firefox blocked those keys as soon as it was found.

I don't even think there is anything the average person can do about those things, but just keep your stuff updated.

---

**[SEGMENT 10: AI IS ON BOTH SIDES NOW]**

Now, this one is interestingly about AI.

Reuters reported that one hacker used AI agents to break into more than a hundred company websites.

This includes sites belonging to Deere, SharkNinja, Cummins and all of those.

So basically, what the attacker did in this case was give the agents short instructions, and just let them run on for hours on their own.

And the cost was estimated at about fifty dollars in AI tokens per successful hack.

Jesus, it's so crazy that we've gotten to a point where it's costing $50 to hack into a company.

I remember earlier this year there was the GitHub situation, I even made a video about it.

It's just been interesting seeing all the news, on Twitter, on YouTube, everywhere.

What I even find interesting is how AI is literally on both sides.

For example, the PHP2Shell loopholes were found with help from AI. And AI is also being used by the attackers.

So the same tools that are helping defenders find bugs faster are also helping attackers break in faster.

So it's almost like this back and forth situation.

---

**[SEGMENT 11: CLOSING]**

October, honestly. I literally have people that work in companies that have literally been stuck all week dealing with attackers.

It's just been crazy, man. It's been crazy.

**[OPTIONAL]** Tell me in the comments, which of these surprised you the most?

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** (PHP2Shell, Railway hack and the October cyberattacks are being searched right now)
> 1. PHP2Shell Explained: What Every PHP Developer Should Do Now — 59
> 2. October 2026 Cyberattacks: PHP2Shell, Railway and More — 54
> 3. PHP2Shell Vulnerability: How to Check and Patch Your Server — 59
> 4. Railway Hack Explained: Rotate Your API Keys Now — 48
> 5. The Biggest Security News of October 2026, Explained — 52
> 6. Zeabur Shutting Down After Breach: What Happened — 48
> 7. Cybersecurity Awareness Month 2026: What Actually Happened — 58

**CLICK-LED**
> 8. October Was a Terrible Month for Developer Security — 51
> 9. Change Your API Keys Today. Here's Why. — 39
> 10. One Hacker, AI Agents and 100 Company Websites — 46
> 11. PHP Got Hacked. What Now? — 25
> 12. One Old Key Shut Down a Whole Platform — 38

**RECOMMENDED: 2.** It catches people searching for any of the stories, and "and More" makes it clear this is a roundup. Use 1 instead if you want it to be mainly a PHP video, since PHP2Shell is where your audience has to act. Thumbnail: your face on the right, and on the left the PHP elephant logo shape (a generic elephant, not the official logo) with a big red crack through it. One word, "PATCH". The thumbnail shouldn't repeat "October" or "Railway" from the title.

Note: 11 is a little stronger than the truth, since PHP the language had a vulnerability, it wasn't "hacked" itself. Keep it as a thumbnail idea only.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "October Was a Terrible Month for Developer Security" (51). Use it as the backup if the main title underperforms on day one.

**Thumbnail:** your face on the right with a serious look. On the left, a cracked elephant (generic, not the PHP logo) or a key with a red warning badge. One word at most, "PATCH" or "ROTATE". Squint at it, and if the crack and the word still read, it works.

**Recording notes:**
- Shoot two takes of Segment 1.
- The closing doesn't refer back to anything specific, so the edit can end cleanly.
- It's about 1,500 spoken words, so roughly 9 to 10 minutes.
- **Check before you record:** whether Railway has published its post-mortem (if yes, add one line saying how they got in), and the latest PHP2Shell exploitation news.

**Retention beats:**
- ~1:00 is "the part that really blew my mind is when it happens."
- ~3:00 is the fixed versions and the restart warning.
- ~6:00 is where the three secrets stories come together.

**After publishing (news video rules):**
- Post the X image post and the launch tweet as it goes live.
- Only swap the title or thumbnail on day one, because news videos have a short window. If day one is clearly weak, switch to the stretch title.
- Pin the comment with the version numbers, since people will come back to copy them.

---

## 3. YOUTUBE DESCRIPTION

> PHP2Shell, the Railway breach, Zeabur shutting down, stolen OpenCode API keys, and a hacker who used AI agents to break into over 100 companies. October 2026 was Cybersecurity Awareness Month, and it turned out to be one of the roughest months for developers in a long time.
>
> In this video I go through what happened in each story, what it means for you, and what to do today. That includes which PHP versions fix PHP2Shell, why you need to restart PHP after updating, why environment variables were the target in three different breaches, and the simple habits that would have limited the damage.
>
> Which of these stories affected you? Tell me in the comments.
>
> CHAPTERS (add times after editing)
> 0:00 One attack after the other
> PHP2Shell
> Why PHP2Shell is so crazy
> What to do about PHP2Shell
> Then Railway happened
> Zeabur is shutting down
> OpenCode and the surprise AI bills
> The same pattern, and what to do
> The certificate key that was the number 4
> AI is on both sides now
> October has been a lot
>
> FIXED PHP VERSIONS: 8.5.12, 8.4.27, 8.3.36, 8.2.35 (then restart PHP-FPM or Apache, and rebuild Docker images)
>
> SOURCES AND FURTHER READING
> Datadog Security Labs, PHP2Shell analysis: https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
> BleepingComputer, PHP ships emergency patches for PHP2Shell: https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws
> The Hacker News, PHP2Shell exploit attempt before disclosure: https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html
> Deseret News (Reuters), who found PHP2Shell: https://www.deseret.com/business/2026/10/21/website-computer-server-security-flaw-artificial-intelligence-hackers-cybersecurity-php-programming-language/
> TechCrunch, Railway urges users to revoke keys: https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/
> GitGuardian, Railway incident guidance: https://blog.gitguardian.com/railway-october-2026-incident-environment-variables/
> BleepingComputer, Zeabur shutting down: https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/
> TechCrunch, OpenCode hack: https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/
> BleepingComputer, browsers block eMudhra certificates: https://bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates
> SecurityOnline, Node.js October 2026 security release: https://securityonline.info/nodejs-security-release-october-2026/
> Reuters via Star-Advertiser, hacker used AI agents on 100+ sites: https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (495 characters, under YouTube's 500 limit):**

php2shell, php vulnerability, php security update, railway hack, railway security incident, cybersecurity news, cybersecurity awareness month, october 2026 cyberattacks, api keys stolen, environment variables security, rotate api keys, zeabur breach, zeabur shutting down, opencode hack, ai agents hacking, ai cyberattack, emudhra certificates, php patch, laravel security, php 8.5.12, php-fpm vulnerability, remote code execution, developer security, secrets management, web security, tech news

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

October is supposed to be Cybersecurity Awareness Month, and it has been one attack after the other.

**[PHP2SHELL]**

PHP, the language behind nearly three quarters of the web, had two critical holes. They're calling it PHP2Shell, and it's rated 9.2 out of 10.

And it happens before your code even runs, so your login can't stop it. Someone even tried it four days before it was announced.

**[WHAT TO DO]**

Update to 8.5.12, 8.4.27, 8.3.36 or 8.2.35. Then restart PHP, or rebuild your Docker images.

**[CODE ON SCREEN]**
```bash
php -v
```

**[THE SECRETS STORIES]**

Then on the same day, Railway told every user to change their secret keys. Zeabur is shutting down after its second breach, which came through admin tokens that never expired. And OpenCode users got AI bills they never ran, some over a thousand dollars.

**[THE LESSON]**

So change keys you're unsure about, give them expiry dates and only the access they need, and turn on spending alerts.

**[AI]**

And one hacker used AI agents to break into over a hundred companies, for about fifty dollars a hack. But AI also helped find PHP2Shell.

**[LAND]**

So update PHP, change your keys and turn on alerts. Which of these surprised you the most?

**Caption:** PHP2Shell, Railway, Zeabur, OpenCode and AI agents hacking 100+ companies. here's what happened in october and what to do today 🔐
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #php #php2shell #webdev #developer #technews #infosec #backend #laravel #programming
**Tags:** php2shell, october 2026 cyberattacks, railway hack, rotate api keys

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: Check your PHP version today (20-30 sec)

If you run PHP, check your version today.

There are two critical flaws called PHP2Shell, and the fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35.

And after you update, restart PHP-FPM or Apache, or rebuild your Docker image. Otherwise the old code keeps running.

**Caption:** if you run PHP, these are the version numbers you need to see after PHP2Shell, and don't forget to restart 🔧
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #laravel #wordpress #webdev #cybersecurity #backend #developer #devops
**Tags:** php2shell fix, php security update, php version check, php-fpm restart

---

### SHORT 3: Why your login can't stop PHP2Shell (20-30 sec)

The scary part about PHP2Shell is when it happens.

PHP reads the incoming request before your code runs, and the flaw is in that reading part.

So your login, your middleware and your authentication never get a chance to stop it. That's why the only real fix is to update PHP itself.

**Caption:** PHP2Shell happens before your app code even runs, so your login can't block it 😬
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #cybersecurity #webdev #infosec #backend #developer #programming
**Tags:** php2shell explained, php remote code execution, php vulnerability 2026

---

### SHORT 4: An environment variable is a password (20-30 sec)

Railway told all its users to rotate their keys this month. Here's why that matters.

Environment variables are where your app keeps its secrets. Your database password, your payment keys, your AI keys.

If someone gets them, they don't need to hack your app. They can log in as you. And a leaked key stays dangerous until you change it.

**Caption:** why the Railway breach was so serious, and why "rotate your keys" is the advice every time 🔑
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #railway #devops #webdev #developer #apikeys #backend #technews
**Tags:** railway hack, environment variables security, rotate api keys, secrets management

---

### SHORT 5: The key that never expired (20-30 sec)

Zeabur, a deployment platform, is shutting down after two breaches in two months.

In the second one, the attacker used admin tokens that had no expiry date, hadn't been changed since January 2024, and weren't rotated after the first breach.

So if your keys can expire, let them.

**Caption:** a deployment platform is shutting down, and the second breach came through admin tokens that never expired 😳
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #zeabur #devops #infosec #developer #technews #cloud #backend
**Tags:** zeabur breach, zeabur shutting down, api key expiry, admin token security

---

### SHORT 6: A hacker used AI agents on 100+ companies (30-40 sec)

Reuters reported that one hacker used AI agents to break into more than a hundred company websites.

A researcher at NorForge found that the hacker gave short instructions and let the agents run for hours on their own, at an estimated fifty dollars in AI tokens per successful hack.

And the same month, AI helped the researcher who found PHP2Shell. AI is now on both sides.

**Caption:** one hacker, AI agents, and over 100 company websites. AI is now helping both attackers and defenders 🤖
full video: [LINK]
**Hashtags:** #Shorts #ai #cybersecurity #aiagents #infosec #technews #hacking #developer #tech
**Tags:** ai agents hacking, ai cyberattack 2026, norforge cairn, ai hacker 100 websites

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** October 2026 in cybersecurity
**Caption:** october was supposed to be cybersecurity awareness month, and it's been an overflow of attacks. PHP, Railway, Zeabur and a hacker using AI agents.
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #technews #php #webdev #developer #infosec #programming #ai #tech
**Tags:** october 2026 cyberattacks, cybersecurity awareness month 2026, cybersecurity news

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** what is PHP2Shell?
**Caption:** two critical loopholes in PHP itself, the language behind nearly three quarters of websites. getting a "shell" means an attacker can type commands on your server.
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #cybersecurity #webdev #wordpress #laravel #infosec #backend #developer
**Tags:** php2shell, what is php2shell, php vulnerability, cve-2026-109618

---

### CLIP 3 — subset of Segment 2
**Starts:** "The 'shell' part of the name is actually scary." **Ends:** "...as if they were on their own computer."
**Overlay:** what "shell" means in PHP2Shell
**Caption:** getting a shell means an attacker can type commands on your server like it's their own computer.
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #cybersecurity #infosec #learntocode #developer #tech
**Tags:** what is a shell, php2shell meaning, remote code execution explained

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** why PHP2Shell is so crazy
**Caption:** it happens before your code even runs, so your login and middleware never stand a chance. and someone tried it four days before it was announced.
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #cybersecurity #infosec #webdev #backend #developer #programming
**Tags:** php2shell explained, php remote code execution, php zero day

---

### CLIP 5 — subset of Segment 3
**Starts:** "Even Amazon has reported" **Ends:** "...just four days before it was announced."
**Overlay:** someone had it before it was announced
**Caption:** Amazon says someone tried PHP2Shell on one of its trap servers four days before the world knew about it.
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #cybersecurity #aws #infosec #technews #developer
**Tags:** php2shell exploit, amazon honeypot, php2shell timeline

---

### CLIP 6 — Segment 4 (whole)
**Overlay:** how to fix PHP2Shell
**Caption:** update to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart PHP-FPM or Apache, or rebuild your Docker images.
full video: [LINK]
**Hashtags:** #Shorts #php #php2shell #laravel #wordpress #devops #cybersecurity #backend #developer #webdev
**Tags:** php2shell fix, php security update, php 8.5.12, php-fpm restart

---

### CLIP 7 — subset of Segment 4
**Starts:** "And if you're using Laravel, for example" **Ends:** "...which is underneath Laravel."
**Overlay:** does updating Laravel fix PHP2Shell?
**Caption:** your Laravel version doesn't protect you here. the loophole is in PHP, underneath Laravel.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #php2shell #webdev #backend #developer #cybersecurity
**Tags:** laravel php2shell, laravel security, php version laravel

---

### CLIP 8 — Segment 5 (whole)
**Overlay:** what happened at Railway
**Caption:** Railway said someone may have accessed customers' encrypted environment variables, paused deployments, and told users to change their keys.
full video: [LINK]
**Hashtags:** #Shorts #railway #cybersecurity #devops #webdev #developer #technews #infosec #cloud
**Tags:** railway hack, railway security incident, railway environment variables

---

### CLIP 9 — Segment 6 (whole)
**Overlay:** a platform shutting down after two breaches
**Caption:** Zeabur got breached twice in two months, and the second time came through admin tokens that never expired. now it's shutting down.
full video: [LINK]
**Hashtags:** #Shorts #zeabur #cybersecurity #devops #infosec #technews #cloud #developer
**Tags:** zeabur breach, zeabur shutting down, admin token expiry

---

### CLIP 10 — subset of Segment 6
**Starts:** "So how did the attackers get in the second time, after the first time?" **Ends:** "...the whole platform is literally just closing."
**Overlay:** the key that never expired
**Caption:** admin tokens with no expiry date, unchanged since January 2024, and left out when they changed their keys after the first attack.
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #devops #infosec #developer #apikeys #security
**Tags:** api key expiry, key rotation, zeabur admin token

---

### CLIP 11 — Segment 7 (whole)
**Overlay:** stolen AI keys and surprise bills
**Caption:** OpenCode users found out about the hack from their AI bills. a few were charged over a thousand dollars for usage they didn't run.
full video: [LINK]
**Hashtags:** #Shorts #ai #opencode #cybersecurity #developer #apikeys #technews #openai #infosec
**Tags:** opencode hack, stolen ai api keys, opencode console breach

---

### CLIP 12 — Segment 8 (whole)
**Overlay:** what to do about your API keys
**Caption:** change keys you're not sure about, give them expiry dates and only the access they need, set spending alerts, and don't store them where you don't need to.
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #devops #apikeys #developer #webdev #backend #infosec #bestpractices
**Tags:** api key security, rotate api keys, secrets management best practices

---

### CLIP 13 — Segment 9 (whole)
**Overlay:** a security key that was the number 4
**Caption:** a company your browser trusts for the padlock had eight signing keys so weak that one of them was literally the number 4.
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #https #infosec #technews #browser #security #tech
**Tags:** emudhra certificates, weak private key, certificate authority compromised

---

### CLIP 14 — Segment 10 (whole)
**Overlay:** AI is on both sides now
**Caption:** one hacker used AI agents on 100+ companies for about $50 a hack, and AI also helped find PHP2Shell.
full video: [LINK]
**Hashtags:** #Shorts #ai #aiagents #cybersecurity #infosec #technews #hacking #developer #tech
**Tags:** ai agents hacking, ai cyberattack, ai found php2shell

---

### CLIP 15 — subset of Segment 10
**Starts:** "Reuters reported that one hacker used AI agents" **Ends:** "...it's costing $50 to hack into a company."
**Overlay:** $50 to hack into a company
**Caption:** one hacker gave AI agents short instructions and let them run for hours. the estimated cost was about $50 per successful hack.
full video: [LINK]
**Hashtags:** #Shorts #ai #aiagents #cybersecurity #technews #hacking #infosec #tech
**Tags:** ai hacker 100 websites, ai agents cyberattack, cost of ai hacking

---

### CLIP 16 — Segment 11 (whole)
**Overlay:** october has been a lot
**Caption:** some people I know have literally been stuck at work all week dealing with attackers. october has been crazy.
full video: [LINK]
**Hashtags:** #Shorts #cybersecurity #developer #techlife #infosec #relatable #tech
**Tags:** cybersecurity awareness month, october 2026 cyberattacks, developer life

---

**Posting order:** 6 first (people need the fix), then 3, then 11, then 15, then 10. Post 13 on a quiet day, because it's the most shareable story.

---

## 6. CAPTIONS

### TikTok caption:
> october is cybersecurity awareness month and it might be the worst month developers have had in a while 😭 PHP, Railway, Zeabur, OpenCode, and a hacker using AI agents on 100+ companies. here's what to do today.
**Hashtags:** #cybersecurity #php #developer #technews #webdev

### Instagram Reel caption:
> October is Cybersecurity Awareness Month, and it turned into one of the roughest months for developers in a long time.
>
> PHP, which runs most of the web, had two critical flaws. Railway told every user to change their secret keys. Zeabur is shutting down after being breached twice, and OpenCode users got surprise AI bills after their keys were stolen.
>
> I went through what each one means for you and the few things worth doing today.
>
> Full video on YouTube, link in bio.
>
> #cybersecurity #php #webdev #developer #technews

### LinkedIn caption:
> October is Cybersecurity Awareness Month, and this year it came with some of the most serious developer security news in a long time.
>
> PHP2Shell, two critical flaws in PHP itself, can be triggered before an application's own code runs, so authentication can't block it, and the only complete fix is updating PHP to 8.5.12, 8.4.27, 8.3.36 or 8.2.35 and restarting it.
>
> Railway, Zeabur and OpenCode were all breaches of the place developers keep their secrets, which is why rotating keys, giving them expiry dates and limited access, and setting spending alerts matter more than any single platform.
>
> And AI now sits on both sides, helping one attacker break into more than a hundred companies and helping a researcher find PHP2Shell in the first place.
>
> Full breakdown: [LINK]
>
> #cybersecurity #php #softwareengineering #devops #ai

---

## 7. X / TWITTER

**How these are written.** It's a news week, so speed matters more than polish. Post the image and the "check your version" tweet first, because those are what people will save and share. The link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> october 2026 developer security checklist 👇

**Image content (one clean card in Canva):**
> **OCTOBER 2026: WHAT TO DO TODAY**
> **PHP2Shell** · update to 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 · then restart PHP or rebuild images
> **Railway users** · rotate every environment variable and API key
> **OpenCode Console users** · replace your AI keys with each provider
> **Everyone** · give keys expiry dates and only the access they need
> **Everyone** · turn on spending alerts for AI and cloud accounts

**Reply:**
> I went through every one of these stories here: [LINK]

---

### THE TIPS LIST

> things worth doing this week after october's security mess
>
> 1. run php -v and check you're on a fixed version
> 2. restart php-fpm or apache after updating
> 3. rotate any api key you're not sure about
> 4. give keys an expiry date if the service allows it
> 5. turn on spending alerts for your ai and cloud accounts

**Reply:** full breakdown here: [LINK]

---

### THE "CAN YOU GUESS" TWEET

> a deployment platform is shutting down after its second breach this year. can you guess what the attacker used to get in the second time?

**Your reply a few hours later:**
> admin tokens that had no expiry date and hadn't been changed since january 2024. they also weren't rotated after the first breach

---

### THE LAUNCH TWEET

> made a video on everything that happened in security this october. php2shell, railway, zeabur, opencode, and the hacker who used ai agents on 100+ companies

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if you run php, check your version today. the fixed versions for php2shell are 8.5.12, 8.4.27, 8.3.36 and 8.2.35

> the scary thing about php2shell is that it happens before your app code runs. your login and middleware never get a say

> updating php isn't enough on its own. restart php-fpm or apache, or rebuild your docker image, or the old code keeps running

> railway, zeabur and opencode were all breaches of the same thing, the place developers keep their secret keys

> opencode users found out their keys were stolen from ai spending alerts. if you haven't set one up, this is your sign

> what did you have to patch or rotate this week?

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> fixed PHP versions for PHP2Shell: 8.5.12, 8.4.27, 8.3.36, 8.2.35. remember to restart PHP or rebuild your images after updating. what did you have to patch this week? 👀

### Instagram:
> if you only do one thing today, check your PHP version.

### TikTok:
> the admin tokens that never expired 😭

### LinkedIn:
> One habit worth adopting from this month: give every key an expiry date where the service allows it. The Zeabur breach came through admin tokens that hadn't been changed in almost three years.

### X (reply to your own tweet):
> if you're on php 8.1 or older, there's no official release for you. there are backported fixes, but this is your sign to upgrade

### REPLIES TO EXPECT (ready to paste)

**"I use Laravel, am I affected?"**
> yes, if the PHP on your server is an affected version. the bug is in PHP itself, so check php -v on the actual server and update PHP

**"I updated but nothing changed."**
> did you restart php-fpm or apache? if you use docker, rebuild the image. otherwise the old code keeps running

**"I'm on shared hosting, what do I do?"**
> check with your host. most hosts are patching their servers, but ask them directly which PHP version you're on

**"How did Railway get hacked?"**
> they haven't said yet. their CEO said a full post-mortem is coming, so watch their blog

**"Is AI making hacking worse?"**
> it's making everything faster, on both sides. the same month an attacker used AI agents on 100+ sites, AI helped a researcher find PHP2Shell

**"Do I need to rotate keys if I wasn't affected?"**
> if Railway or OpenCode told you that you weren't affected, you're probably fine. but rotating keys you're unsure about is always a good habit

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** october was cybersecurity awareness month. it didn't go well.
**Slide 2:** PHP had two critical flaws called PHP2Shell, rated 9.2 out of 10.
**Slide 3:** the attack happens before your app code runs, so your login can't stop it.
**Slide 4:** the fix is PHP 8.5.12, 8.4.27, 8.3.36 or 8.2.35, and then a restart.
**Slide 5:** Railway told all its users to rotate their secret keys.
**Slide 6:** Zeabur is shutting down after two breaches. the second came through keys that never expired.
**Slide 7:** OpenCode users got AI bills of hundreds of dollars after their keys were stolen.
**Slide 8:** give keys expiry dates, limited access and spending alerts.
**Slide 9:** AI is now helping both attackers and defenders.
**Slide 10:** what did you have to patch this week?

**Carousel caption:**
> everything that happened in developer security this october, and what to do today. full video on YouTube, link in bio.
>
> #cybersecurity #php #webdev #developer #technews

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> October Was Supposed to Be Cybersecurity Awareness Month

### Subtitle:
> PHP2Shell, Railway, Zeabur, OpenCode and the hacker with AI agents, and what each one means for developers.

### SEO Title:
> PHP2Shell, Railway and the October 2026 Cyberattacks Explained

### SEO Description:
> What happened with PHP2Shell, the Railway and Zeabur breaches, stolen OpenCode API keys and AI-run attacks in October 2026, and what developers should do now.

---

October is Cybersecurity Awareness Month, and in 2026 it turned into one of the roughest months developers have had in a long time.

The biggest story was PHP2Shell, two critical vulnerabilities in PHP itself, tracked as CVE-2026-109618 and CVE-2026-109619 and rated 9.2 out of 10. PHP runs nearly three quarters of the world's websites. One flaw comes from how PHP cleans up after running out of memory at the wrong moment, and the other from a worker reusing state it should have thrown away. According to Datadog's analysis, both are reachable in default configurations, and because PHP processes a request before any application code runs, authentication can't block the attack. Amazon said it saw an exploit attempt on October 17, four days before the flaws were announced, and PHP brought its release forward to October 21 after details leaked early. The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and a server keeps running the old code until PHP-FPM or Apache is restarted or the container image is rebuilt.

The second story was Railway, a deployment platform that disclosed on October 21 that attackers may have accessed customers' encrypted environment variables, and decrypted some of them. Railway paused deployments and asked all users to rotate their keys. It hasn't yet said how the attackers got in.

Environment variables are where applications keep their secrets, so the story matters beyond Railway. A database password, a payment key or a cloud key lets an attacker skip the application entirely and log in as the owner.

Zeabur, another deployment platform, announced it would shut down after its second breach in two months. According to BleepingComputer, the October breach covered 321,810 accounts and about 3.2 million environment variable records, and it came through admin tokens that had no expiry date, hadn't been changed since January 2024, and were missed when keys were rotated after the first breach. OpenCode, an open-source AI coding tool, said attackers took API keys stored in its Console, and users discovered it through spending alerts and charges that sometimes passed a thousand dollars.

Taken together, the three breaches teach one lesson. Keys should expire where possible, carry only the access they need, sit only in tools that need them, and be watched by spending alerts. When in doubt, rotate them at the source first.

The last story is about AI. Reuters reported that a single hacker used AI agents to break into more than a hundred company websites, and the NorForge researcher who found it estimated the cost at about fifty dollars in tokens per successful hack. PHP2Shell itself was found by a researcher at Calif with help from an OpenAI model. AI is shortening the time it takes both to find a bug and to use one, which makes patching quickly more important than ever.

So if you do three things this week, update PHP and restart it, rotate any key you're unsure about, and turn on spending alerts.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Cybersecurity, PHP, DevOps, Software Engineering, Artificial Intelligence

---

## 11. REFERENCES & SOURCES

**1. PHP2Shell**
- **Datadog Security Labs:** the two CVEs, how each works, CVSS 9.2, affected runtimes (mod_php, PHP-FPM, php-cgi, FrankenPHP, LiteSpeed), "any PHP script exposes the vulnerable path," default configurations, why app authentication can't block it, fixed versions, the restart/rebuild warning, and the temporary settings in Segment 4. https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
- **The Hacker News:** Amazon's honeypot saw an exploit attempt on October 17, four days before disclosure; CVE IDs and a proof of concept leaked early, so the PHP Foundation moved disclosure up a day to October 21. https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html
- **BleepingComputer:** discoverers listed as researchers at Calif, OpenAI and Wiz; no official releases for 8.1 and older, with backported fixes for 7.4, 8.0 and 8.1. https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws
- **Deseret News, citing Reuters and W3Techs:** PHP powers nearly three quarters of websites; Ryan Austin at Calif found it during an August audit with help from OpenAI's model; European government websites went dark while fixes were applied. https://www.deseret.com/business/2026/10/21/website-computer-server-security-flaw-artificial-intelligence-hackers-cybersecurity-php-programming-language/

**2. Railway**
- **TechCrunch:** the October 21 disclosure, "may have accessed encrypted environment variables and, for some of them, obtained the decrypted contents," paused builds, all users told to rotate, the AI inference providers link, post-mortem promised, root cause not disclosed. https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/
- **GitGuardian:** rotation guidance, including private registry credentials and sealed variables. https://blog.gitguardian.com/railway-october-2026-incident-environment-variables/

**3. Zeabur**
- **BleepingComputer:** August and October 14–15 breaches, 321,810 accounts, ~3.2 million environment variable records, the admin token quote, shutdown dates. https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/

**4. OpenCode**
- **TechCrunch:** 1.4% of OpenCode Console users, stored AI API keys, charges in the hundreds and a few over $1,000, CLI not affected, keys blocked and refunds underway. https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/

**5. AI agents**
- **Reuters, via the Honolulu Star-Advertiser:** NorForge's Snorre Fagerland, one hacker, more than 100 companies, agents running for hours, ~$5,000 in tokens or about $50 per successful hack (his estimate), Deere, SharkNinja and Cummins and their statements. https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/

**5b. Added in version 3 (from checking other creators' coverage; facts only, no wording used)**
- **eMudhra (Segment 9):** BleepingComputer. Eight intermediate certificates with P-384 keys generated April 2025; a script error made weak keys with values under 256; one published key was literally 4; found October 17; Mozilla and Chrome blocked them on October 17, Apple on October 22; no evidence of misuse. https://bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates
- **Node.js (Segment 4 optional line):** October 21, 10 fixes including CVE-2026-111497 in the Brotli decoder; fixed in 22.23.4, 24.22.1, 26.12.1; no exploitation reported. https://securityonline.info/nodejs-security-release-october-2026/
- **Distro backports:** Datadog notes vendors sometimes backport fixes without changing version numbers (Segment 4).
- **"Distillation attack":** OpenCode's own description, per TechCrunch; skeptics question whether distillation was really the goal, which is why the script says "may have been."

**6. Careful wording, and what I left out**
- **"PHP got hacked"** is wrong. PHP had vulnerabilities, so the script says "two critical security holes."
- **CVSS score:** some posts say 10. The PHP2Shell analyses I checked use 9.2 on CVSS v4.0, so the script uses 9.2.
- **The "59% of PHP hosts are unpatched" number** that's going around only covers hosts that advertise their version on Shodan, so I left it out.
- **Railway's root cause** isn't public yet, so the script says so.
- **Which AI models the hacker used** (DeepSeek and Claude Code) is the researcher's estimate, so I left the model names out of the script.
- **Other October incidents** were left out because they're only reported in roundup blogs I couldn't confirm against primary sources: the Node.js security release, the malicious Rank Math PRO update, the OVHcloud CLI hijack and the eMudhra certificates. Mention them in a follow-up if you want.

---

## NOTES

- **Post tomorrow morning.** It's a news video, so the window is short.
- **Re-check two things before recording.** Has Railway published its post-mortem? Have there been big confirmed PHP2Shell compromises since October 23?
- **This fits your audience exactly.** Most of your viewers write PHP or Laravel, so Segment 4 is the part they'll come back to. The pinned comment has the version numbers for that reason.
- **Cross-links:** your CORS, cookies and HTTP status codes videos for the web security background, and your API authentication video for the API keys part.

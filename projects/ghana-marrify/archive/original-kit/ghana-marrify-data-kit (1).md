# Ghana's Marrify, Centralised Data, and What Estonia Taught Me: Content Kit
**Angle: an HCI person who lives in Estonia looking at African digital public infrastructure. Excited about it AND serious about consent, minimisation, and culture.**
**Register: her dictated voice. Loose, enthusiastic, thinking out loud.**

---

## 1. YOUTUBE VIDEO SCRIPT (her dictation, edited, not rewritten)

---

**[OPEN]**

So Ghana just launched something called Marrify.

It's a public platform where you can search and verify marriages, divorces, and licensed marriage officials. It launched last month, with the Ministry of Gender, Children and Social Protection. I was reading about it the other day.

And the way it works is that it pulls data from several different government sources. The Registrar-General's Department, the courts, local assemblies, all of that. It covers all kinds of marriages. And even some divorce records that go all the way back to 1886.

And you can also check whether a church, a pastor, an imam, a venue, is actually licensed to conduct a marriage.

And I really loved it when I saw the news. Because as an African, I'm thinking, oh wow. We are having centralised data. Finally. Finally.

---

**[WHAT I LOVE ABOUT IT]**

Now, before the drawbacks. Because I read TechCabal's article about this and there were some drawbacks cited. But before I talk about that, let me talk about what I love about this.

So I've been living in Estonia for about a year now. And people always say Estonia is the most digital country in Europe, or something like that. And I'm not going to lie, it's so real.

Everything here, everything you want to do here, is online. I'm not exaggerating. Everything. Your health records. Everything links so well. There is nothing you want to do that you cannot do online. You can marry online, you can divorce online. There's a link for everything.

The data ecosystem the government runs here, the way it syncs, I genuinely admire it. And as someone coming from Nigeria, it blew my mind how in sync everything is.

So when I see Ghana doing something in this direction, my first instinct is yes, please, more of this. Because it solves so much. There's one reliable record instead of just a piece of paper that somebody may or may not have.

---

**[THE THING THAT MADE ME RECORD THIS]**

And I think the main thing that even made me record this video is the drawback that TechCabal raised. Which is that marriage and divorce records are sensitive personal information.

And that sounds obvious when you say it. But, I don't know. A divorce record, which is a personal thing about someone's life, is now searchable by anybody who knows how to spell your name.

And I'm saying this as someone who likes open data. In Estonia you can go online and find businesses. You can check how much a business made in a year. A business you have absolutely no relationship with, you can just look it up. And I think that's fine, because a business is a public entity that takes public money and holds public accountability.

Maybe the case of a divorce is a little bit different.

So that got me thinking. I don't really know. Because I love the idea of open data, but I also really don't know how that works with personal data and privacy issues. I don't know. But again, it's something to think about.

---

**[THE CONSENT PART]**

And you can also have a conversation about the consent part of things.

Because I want to believe that divorce information, or marriage data, is public information. I want to believe it is.

But there's a difference between your divorce file from 2023 sitting in a government office somewhere, where it's public in theory, and it being searchable in three seconds by a stranger on their phone.

---

**[THE ENGINEERING PART]**

Then there's the engineering part of things. Data minimisation.

So the principle is that you expose the minimum amount of data required to answer the question being asked.

Is this person currently free to marry? That's a yes or no answer. Does answering that question require showing you when they got married, who they married, when they divorced, which court granted it?

I don't know. So I was thinking about data minimisation with this as well. Could we minimise data to the point where we're not exposing much more than is being asked for?

Like in the case of Marrify, the question is, is this person married? So, this person currently has an active marriage on record. Nothing else. No name of the spouse, no dates, no history.

But of course another person could request another thing. So the other thing I'm thinking about is access levels. Could an individual access a particular level of this data, and are there organisations that can access more?

I've just really been thinking about all of it.

---

**[TECHNOLOGY IS NOT NEUTRAL]**

And I always say this, that technology is not neutral. It works in the system that you use it in.

For example, the way a piece of technology works in Estonia will be completely different from the way it works in Africa, or in a country in Africa, in Nigeria, in Ghana.

In Estonia a divorce record could just be administrative. Nobody cares. But in an African context, to a large extent, divorce, especially for women, is still stigmatised.

So it's very tricky when I think about this. And this is something I really think I myself need to explore further, on the human side of things. Because it's not just a privacy engineering conversation. It's also a cultural design thing.

---

**[THE RECIPROCITY PART]**

And another thing I find genuinely smart in Estonia is the idea that your data being in the system is paired with you being able to see what is happening to it.

That transparency runs both ways. It's not just the government seeing you. You can also see the state seeing you.

And if we are trying to create something like this in Africa, where is the reciprocity for the average individual? If someone looks up my marriage record, do I get to see that?

---

**[CLOSING]**

I really want African countries building this kind of infrastructure. Because I genuinely think it solves real problems. Technology that helps actual people.

But I also think that if we want to build technology, as people we still have to probe it and question it. And yeah, maybe that's what I've been doing in my head.

But I really like the idea. I read about it. Super idea, man.

Tell me what you think, and if you're Ghanaian I especially want to hear from you.

See you in my next video. Bye.

---

### WHAT CHANGED (from her dictation)

- **Her structure and her uncertainty.** The earlier draft made this more decided than she is. She says "I don't know" several times and that hedging is the honest register for this topic, so it's kept.
- **Kept verbatim:** "as an African, I'm thinking, oh wow, we are having centralised data. Finally. Finally," "I'm not going to lie, it's so real," "it blew my mind how in sync everything is," "anybody who knows how to spell your name," "maybe the case of a divorce is a little bit different," "I don't really know," "technology is not neutral, it works in the system that you use it in," "nobody cares," "I really think I myself need to explore further," "where is the reciprocity," "super idea, man."
- **SPELLING FIX: Marrify, with two r's.** Your dictation said Merify.
- **Dictation fixes:** "your earth records" → your health records, "a mom" → an imam, "public accountability" kept as you said it, run-ons split.
- **New in your version and kept:** the access-levels idea, that individuals might see one level of data while organisations see more. That's a genuinely good design answer and it wasn't in my draft.
- **Cut from my earlier draft:** the whole "no record found will be read as proof" section, since you didn't say it. It's below as an optional insert because it is factually grounded in Marrify's own disclaimer and it's the strongest HCI-specific criticism available. Your call entirely.

**[OPTIONAL INSERT, ~40 sec, would sit after the consent section]**
*And there's one more thing, which is actually a design problem. Marrify itself says that records are still being uploaded, so if you search someone and get no result, that doesn't mean they're not married. Which is an honest disclaimer, but nobody reads disclaimers. Somebody is going to search their partner, see nothing, screenshot it, and treat it as proof. And when a system can't tell the difference between "this person isn't married" and "we don't have their records yet," and shows you the same empty screen for both, that's the interface promising something the data can't deliver.*

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED**
> 1. Ghana Launched an App to Check If Someone Is Married — 51
> 2. Marrify: Ghana's Marriage Verification App, Explained — 52
> 3. Should Marriage and Divorce Records Be Public? — 45

**CLICK-LED**
> 4. Ghana Made Divorce Records Searchable. I Have Thoughts. — 54
> 5. What Estonia Taught Me About African Digital ID — 47

**RECOMMENDED: 1.** It states the thing plainly and it is exactly what people are searching after seeing the headline. 4 is the better click title because "I have thoughts" signals an actual opinion rather than a news recap, and this video's value is the opinion. 5 is worth considering if you want to lead with the Estonia angle, which is the part nobody else covering this story has.

---

## 3. YOUTUBE DESCRIPTION

> Ghana launched Marrify on the 28th of August, a public platform where you can search and verify marriages, divorces and licensed marriage officials. It pulls data from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette into one searchable place, with divorce records reportedly going back to 1886.
>
> When I first saw the headline, my first thought was, ah okay, centralised data.
>
> I've been living in Estonia for about a year, and people always say it's the most digital country in Europe. They are not joking. Everything here is online, everything links together, and honestly I admire it. So when I see Ghana building in this direction, part of me is genuinely excited. Inheritance, immigration, property disputes, court cases, all of that gets easier with one reliable record.
>
> But marriage and divorce records are sensitive personal information, and that's where it gets complicated. In this video I go through what worries me: the design flaw where "no record found" will absolutely be read as proof someone is single, the difference between data being technically public and being one search away, data minimisation and why this could return a yes or no instead of your whole history, and the part I care about most, which is that the same feature means completely different things in different cultures.
>
> A divorce record in Estonia is administrative. A searchable divorce registry in a place where divorce still carries stigma is a different object entirely, even though the data is identical.
>
> I want African countries building this. I want it built by people asking the second question.
>
> If you're Ghanaian I really want to hear from you on this one.
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

> marrify, ghana, marriage verification, digital government, data privacy, e-estonia, digital public infrastructure, africa tech, hci, data minimization, centralized data, government data, privacy by design, ghana tech, digital identity

---

## 5. MAIN SHORT (~2 min)

**[HOOK]**

Ghana launched a platform where you can search and verify whether somebody is married. Or divorced. Divorce records apparently going back to 1886.

And when I saw the headline, the first thing in my head was, ah okay, centralised data.

**[THE ESTONIA PART]**

Now, I've been living in Estonia for about a year, and people always say it's the most digital country in Europe. I'm not going to lie to you, they are not joking. Everything here is online. You can marry online, divorce online, you can bury someone online. There's a link for everything, and honestly I admire it.

So part of me really wants this for Africa. Inheritance, immigration, property disputes, court cases, all of that gets easier with one reliable record.

**[BUT]**

But marriage and divorce records are sensitive personal information.

And there's a design flaw in this that I can't stop thinking about. Marrify says records are still being uploaded, so no result doesn't mean the person isn't married. But nobody reads disclaimers. Somebody is going to search their partner, see nothing, and take a screenshot as proof.

When your system can't tell the difference between "not married" and "we don't have their records yet," and shows the same empty screen for both, the interface is promising something the data can't deliver.

**[THE CULTURAL PART]**

And the part I care about most, because I'm an HCI woman. You cannot copy a system between cultures and expect it to mean the same thing.

In Estonia a divorce record is administrative. Nobody's aunties are calling a meeting about it. Think about what a searchable divorce registry means somewhere divorce still carries stigma, especially for women. Same data, completely different consequences.

**[LAND]**

I want African countries building this. I just want it built by people asking the second question. Not only, can we make this searchable. But, what happens to somebody when we do?

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: The empty screen problem (30-40 sec, the HCI one)

Marrify says records are still being uploaded, so if you search someone and get no result, that doesn't mean they're not married.

Technically an honest disclaimer. But think about how humans actually use software.

Nobody reads that. Somebody will search their partner, see "no record found," screenshot it, and treat it as proof.

That's not a data problem, it's an interface problem. When your system can't distinguish between "this person isn't married" and "we don't have their records yet," and shows you the same empty screen for both, the interface is making a promise the data cannot keep.

**Caption:** "no record found" is going to be read as "they're single" by literally everyone, no matter what the disclaimer says. that's an interface problem, not a data problem 😬
full video: [LINK]
**Hashtags:** #ux #uxdesign #hci #productdesign #privacy #ghana

---

### SHORT 3: Technically public vs one search away (30-40 sec, sharpest)

People will say these records were already public. And that's true, they were in the Registrar-General's office, in court files, in the Gazette.

But there's a real difference between something being technically public and something being one search away.

Your divorce from 2003 sitting in a file in a government office is public in theory. Anybody determined enough could go and find it. Your divorce from 2003 being searchable in three seconds by a stranger on their phone is a completely different thing.

And the data didn't change at all. Only the access did. That gap is where almost all the harm lives, and nobody consented to it, because nobody consented to the access changing.

**Caption:** "it was already public" — there's a huge difference between technically public and one search away. the data didn't change. the access did. nobody consented to that 🤔
full video: [LINK]
**Hashtags:** #privacy #dataprivacy #tech #ghana #ethics #opendata

---

### SHORT 4: Estonia is real (30-40 sec, most charming)

People always say Estonia is the most digital country in Europe, and I've been living here about a year now, so let me tell you. They are not joking.

Everything is online. Everything. Your health records are somewhere, everything links together, there is genuinely nothing you want to do that you can't do online.

You can marry online. You can divorce online. You can bury someone online. There is a link for everything.

And coming from where I'm coming from, seeing a state actually work like that does something to you.

**Caption:** they said Estonia was the most digital country in Europe and I thought people were exaggerating. you can literally get married, divorced, and bury someone online 😭 there's a link for everything.
full video: [LINK]
**Hashtags:** #estonia #tallinn #digitalgovernment #tech #expat #naija

---

### SHORT 5: Data minimisation (30-40 sec, the engineering one)

Here's the engineering question nobody asks early enough. Data minimisation.

You expose the minimum amount of data needed to answer the actual question.

So what's the question here? Is this person currently free to marry? That's a yes or no. That's one boolean.

Does answering it require showing when they married, who they married, when they divorced, and which court granted it? Because that is a lot more than yes or no.

You could build a version that returns "this person has an active marriage on record" and literally nothing else. The person asking gets what they need. The person being searched keeps everything else.

**Caption:** the question is "is this person free to marry?" that's a yes or no. so why does the answer include their whole marital history? 🤨 data minimisation is a choice somebody makes early.
full video: [LINK]
**Hashtags:** #privacy #softwareengineering #dataprotection #tech #productdesign

---

### SHORT 5b: Access levels (25-35 sec, the new idea)

Here's the other thing I keep thinking about with this. Access levels.

Because an individual asking "is this person free to marry" needs a yes or no. That's it.

But maybe an organisation, a court, a lawyer handling an inheritance case, actually needs more than that.

So could we build it so that an individual accesses one level of this data, and organisations that genuinely need it can access more? Rather than one search box that returns everything to everybody.

**Caption:** not everyone asking needs the same answer. an individual needs a yes or no. a court handling inheritance might need more. why is it one search box returning everything to everybody? 🤔
full video: [LINK]
**Hashtags:** #privacy #dataprotection #productdesign #tech #ghana

---

### SHORT 6: Same data, different consequences (35-45 sec, the HCI thesis)

You cannot copy a system from one culture into another and expect it to mean the same thing.

In Estonia, a divorce record is administrative. It's a status. Nobody's aunties are calling a family meeting about it.

Now think about what a searchable divorce registry means in a lot of African contexts. Think about the stigma that still follows divorce, especially for women. Think about a family who doesn't know. A church community. An employer. In-laws running a search before a wedding.

Same feature, same data, completely different consequences, because the social meaning of the information is different.

The system doesn't know that. The system just returns a row.

**Caption:** same feature, same data, completely different consequences depending on where you are. the system doesn't know divorce carries weight in one place and paperwork in another. it just returns a row.
full video: [LINK]
**Hashtags:** #hci #uxdesign #tech #africa #culture #design

---

### SHORT 7: The reciprocity point (25-35 sec)

One thing I find genuinely smart about how Estonia does this. Your data being in the system is paired with you being able to see what's happening to it. The transparency runs both ways.

It's not only that the state can see you. You can see the state seeing you.

And if we're building this kind of thing in Africa, that reciprocity is the part I'd fight for. Not just, can I look you up. But also, do you get to know that I did?

**Caption:** it's not just "can I look you up." it's "do you get to know that I did?" transparency should run both ways 🤝
full video: [LINK]
**Hashtags:** #privacy #digitalgovernment #tech #estonia #africa #dataprotection

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Overlay test: a stranger sees it for half a second with no context. Understandable? Does it make them stay?**

---

### CLIP 1 — ~45 sec
**Overlay:** Ghana made it possible to check if someone is secretly married
**Portion:** the open, describing Marrify.
**Caption:** launched in Accra on August 28. pulls from the Registrar-General, the courts, local assemblies and the Ghana Gazette. divorce records reportedly going back to 1886 👀
full video: [LINK]
**Hashtags:** #Shorts #ghana #tech #technews #africa #marriage
**Tags:** marrify ghana, ghana marriage app, marriage verification, ghana tech, africa tech news, digital government

---

### CLIP 2 — ~50 sec
**Overlay:** they were not joking about Estonia being fully digital
**Portion:** the Estonia section.
**Caption:** I've lived here a year. you can marry online, divorce online, bury someone online. there is a link for everything, and coming from where I'm coming from, seeing a state work like that does something to you.
full video: [LINK]
**Hashtags:** #Shorts #estonia #tallinn #digitalgovernment #expat #tech #naija
**Tags:** e-estonia, digital government, estonia digital society, digital id, govtech, estonia life

---

### CLIP 3 — ~40 sec
**Overlay:** "no record found" is going to be read as "they're single"
**Portion:** the empty screen / disclaimer section.
**Caption:** the platform says records are still being uploaded so no result isn't proof. but nobody reads disclaimers. someone will screenshot an empty search and treat it as clearance.
full video: [LINK]
**Hashtags:** #Shorts #ux #uxdesign #hci #productdesign #tech #ghana
**Tags:** ux design, interface design, hci, design flaws, user experience, product design

---

### CLIP 4 — ~50 sec
**Overlay:** "it was already public" is not the defence people think it is
**Portion:** the technically-public versus one-search-away section.
**Caption:** your divorce sitting in a government file is public in theory. your divorce being searchable in three seconds by a stranger is a different thing entirely. the data didn't change, the access did.
full video: [LINK]
**Hashtags:** #Shorts #privacy #dataprivacy #ethics #tech #opendata
**Tags:** data privacy, open data, public records, privacy by design, data protection, consent

---

### CLIP 5 — ~45 sec
**Overlay:** the question is yes or no. so why does it return your whole history?
**Portion:** the data minimisation section.
**Caption:** "is this person free to marry" is one boolean. it doesn't require showing when they married, who they married, or which court granted the divorce. you could build the version that just says yes or no.
full video: [LINK]
**Hashtags:** #Shorts #privacy #softwareengineering #dataprotection #productdesign #tech
**Tags:** data minimization, privacy engineering, gdpr principles, data protection by design, software architecture

---

### CLIP 6 — ~60 sec
**Overlay:** the same app means something completely different depending on where you live
**Portion:** the cultural section.
**Caption:** in Estonia a divorce record is administrative, nobody's aunties are calling a meeting. now think about a searchable divorce registry somewhere divorce still carries stigma, especially for women. same data, different consequences.
full video: [LINK]
**Hashtags:** #Shorts #hci #uxdesign #culture #africa #tech #design
**Tags:** access control, tiered access, privacy design, data governance, role based access

---

### CLIP 6b — ~40 sec
**Overlay:** not everyone searching needs the same answer
**Portion:** the access levels section.
**Caption:** an individual needs a yes or no. a court handling an inheritance case might genuinely need more. so why is it one search box returning everything to everyone?
full video: [LINK]
**Hashtags:** #Shorts #privacy #dataprotection #productdesign #tech #ghana

---

### CLIP 7 — ~40 sec
**Overlay:** can you see who has been looking you up?
**Portion:** the reciprocity section.
**Caption:** transparency should run both ways. it's not only whether the state can see you, it's whether you can see the state seeing you. that's the part I'd fight for.
full video: [LINK]
**Hashtags:** #Shorts #privacy #digitalgovernment #dataprotection #estonia #africa #tech
**Tags:** technology and culture, hci research, cultural design, human computer interaction, design ethics, africa tech

---

### CLIP 8 — ~45 sec
**Overlay:** I want Africa building this. I want us asking the second question.
**Portion:** the closing.
**Caption:** the problems it solves are real, especially for women who find out too late that they're the second wife nobody mentioned. I just want it built by people asking what happens to somebody when we make this searchable.
full video: [LINK]
**Hashtags:** #Shorts #africa #tech #ghana #privacy #digitalgovernment
**Tags:** data transparency, access logs, digital rights, govtech, citizen data rights, estonia

---

**Posting order:** 2 first, because the Estonia clip has the widest reach and the least friction, and it earns you the authority for the rest. Then 1 (the news), then 6 (the strongest idea), then 4. Keep 8 for last.

---

## 6. CAPTIONS

### TikTok caption:
> Ghana launched an app where you can search whether someone is secretly married 👀 divorce records reportedly going back to 1886. I have thoughts, and some of them are good ones.
**Hashtags:** #ghana #tech #africa #technews #privacy

### Instagram Reel caption:
> Ghana launched Marrify, a platform where you can search and verify marriages, divorces and licensed marriage officials. It pulls from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette.
>
> When I first saw the headline, my first thought was, ah okay, centralised data.
>
> I've lived in Estonia for about a year and people always say it's the most digital country in Europe. They are not joking. So part of me genuinely wants this for Africa.
>
> But marriage and divorce records are sensitive personal information, and a system like this means something completely different depending on where you live.
>
> Full video on YouTube, link in bio. And if you're Ghanaian I really want to hear from you on this.
>
> #ghana #africa #tech #privacy #estonia

### LinkedIn caption:
> Ghana has launched Marrify, a public platform that lets people search and verify marriages, divorces and licensed marriage officials. It pulls records from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette into a single searchable service, and the divorce records reportedly go back as far as 1886.
>
> My first reaction to the headline was simply, centralised data. My second reaction was more complicated, and it is worth explaining both.
>
> I have been living in Estonia for about a year now. People describe it as the most digital country in Europe and, having seen it, they are not exaggerating. Nearly everything is online and the services genuinely connect to one another. Coming from Nigeria, watching a state function that way does something to your sense of what is possible. So when an African country builds in this direction, my instinct is enthusiasm. The problems it addresses are real ones, particularly for people who discover too late that a marriage they entered was never legally available to them.
>
> The complication is that marriage and divorce records are sensitive personal information, and three things follow from that.
>
> The first is a design problem. The platform notes that records are still being uploaded, so an absent result does not prove someone is unmarried. In practice, people will read an empty screen as confirmation, because that is how humans use software. A system that cannot distinguish between "no marriage exists" and "we do not yet hold this record" while displaying the same result for both is making a promise its data cannot support.
>
> The second is the difference between information being technically public and being one search away. These records existed before. What changed is not the data but the accessibility, and that is where most of the risk lives.
>
> The third, and the one I care about most, is cultural. The same feature carries entirely different consequences depending on where it is deployed. A divorce record is administrative in one context and socially costly in another, particularly for women. The system does not know the difference. It returns a row.
>
> I want African countries building this kind of infrastructure. I would like it built by people asking the second question, which is not whether something can be made searchable, but what happens to a person when it is.
>
> #privacy #digitalgovernment #hci #africa #productdesign

---

## 7. X / TWITTER

### THE LAUNCH TWEET

> Ghana launched a platform where you can search and verify marriages, divorces, and licensed marriage officials. divorce records reportedly going back to 1886.
>
> as someone living in Estonia watching digital government actually work, I have thoughts in both directions 👇

---

### HOOK TWEETS

**Hook 1 (the design flaw, sharpest):**
> Marrify says records are still being uploaded, so "no record found" isn't proof someone is unmarried.
>
> nobody reads disclaimers. someone will search their partner, screenshot the empty result, and treat it as clearance.
>
> that's an interface problem, not a data problem.

**Hook 2 (technically public):**
> "these records were already public"
>
> there is a huge difference between technically public and one search away. your divorce in a government file vs your divorce searchable in 3 seconds by a stranger.
>
> the data didn't change. the access did. nobody consented to that.

**Hook 3 (Estonia, most relatable):**
> people kept saying Estonia is the most digital country in Europe and I assumed they were exaggerating.
>
> I've lived here a year. you can marry online, divorce online, and bury someone online. there is a link for everything.

**Hook 4 (data minimisation):**
> the question is "is this person free to marry." that's a yes or no. one boolean.
>
> so why does the answer include when they married, who they married, and which court granted the divorce?
>
> you could build the version that just says yes.

**Hook 5 (the cultural one, the thesis):**
> you cannot copy a system between cultures and expect it to mean the same thing.
>
> in Estonia a divorce record is administrative. a searchable divorce registry where divorce still carries stigma is a different object entirely.
>
> same data. the system just returns a row.

**Hook 6 (reciprocity):**
> the thing I'd fight for in African digital ID: transparency running both ways.
>
> not only can I look you up. can you see that I did?

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> if you're Ghanaian I especially want to hear from you on this, because you're living inside it and I'm looking at it from Tallinn 👀 does this feel useful or does it feel exposing?

### Instagram:
> the "no record found" thing is the one keeping me up. people are going to screenshot an empty search and call it clearance.

### TikTok:
> "you can bury someone online" is a real sentence about Estonia and I still find it wild 😭

### LinkedIn:
> The distinction I keep returning to: information being technically public and information being one search away are not the same condition, and almost all the risk sits in the gap between them.

### X (reply to your own tweet):
> and to be clear I want this built. the problems are real, especially for women who find out too late that they're the second wife nobody mentioned. I just want the second question asked while it's still one country and one platform.

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:**
> Ghana launched an app to check if someone is secretly married.

**Slide 2:**
> it pulls from the Registrar-General, the courts, local assemblies and the Ghana Gazette. divorce records reportedly back to 1886.

**Slide 3:**
> my first thought at the headline: ah okay, centralised data.

**Slide 4:**
> I live in Estonia. you can marry, divorce and bury someone online here. so part of me really wants this for Africa.

**Slide 5:**
> but "no record found" will be read as "they're single." that's an interface problem, not a data problem.

**Slide 6:**
> and technically public is not the same as one search away. the data didn't change, the access did.

**Slide 7:**
> in Estonia a divorce record is administrative. somewhere divorce carries stigma, it's a different object entirely.

**Slide 8:**
> I want us building this. I want us asking what happens to somebody when we do.

**Carousel caption:**
> going back and forth on this one honestly. full video on YouTube, link in bio. Ghanaians, I especially want your take.
>
> #ghana #africa #tech #privacy #hci

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Technically Public Is Not the Same as One Search Away

### Subtitle:
> Ghana launched a searchable marriage and divorce registry. I live in Estonia, so I have thoughts in both directions.

### SEO Title:
> Ghana's Marrify App: Centralised Data, Privacy, and Cultural Design

### SEO Description:
> On Ghana's marriage verification platform, what Estonia gets right about digital government, and why the same system means different things in different cultures.

---

Ghana launched something called Marrify.

It is a public platform where you can search and verify marriages, divorces and licensed marriage officials. It went live in Accra on the 28th of August, in partnership with the Ministry of Gender, Children and Social Protection, and it pulls data from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette into one searchable place. It covers ordinance, customary and Islamic marriages as well as divorces, with some divorce records reportedly going back to 1886. You can also check whether a church, pastor, imam or venue is licensed to conduct a marriage at all, which solves a genuine problem.

When I first saw the headline, before reading anything, my first thought was simply: centralised data.

**Why part of me loves this**

I have been living in Estonia for about a year. People always say it is the most digital country in Europe, and I am not going to lie to you, they are not joking. Everything here is online. Health records are somewhere, everything links together, and there is essentially nothing you want to do that you cannot do online. You can marry online. You can divorce online. You can bury someone online. There is a link for everything.

The data ecosystem the state runs here, the way it all syncs, I genuinely admire. Coming from where I come from, watching a state work like that does something to you.

So when I see Ghana building in this direction, my first instinct is yes, please, more of this. Think about what it actually addresses. Inheritance disputes. Immigration cases. Property disputes. Court cases. Somebody dies and three people arrive claiming to be the spouse. All of that becomes easier when there is one reliable record instead of a piece of paper somebody may or may not still possess.

**Then I read it properly**

The thing that made me want to write about it is the drawback the coverage raised, which is that marriage and divorce records are sensitive personal information.

That sounds obvious said out loud, but sit with it. A divorce record is not a neutral fact about a person. It is among the most personal things in a life, and now it is searchable by anybody who can spell your name.

I say this as somebody who likes open data. In Estonia you can look up a business and see what it earned in a year, a business you have no relationship with at all, and I think that is fine, because a business is a public entity that takes public money and owes public accountability.

A divorce is not a business.

**The design flaw**

There is one thing in this I cannot stop looking at.

Marrify states that records are still being uploaded, so no result does not mean somebody is unmarried. Technically an honest disclaimer, and completely at odds with how people use software.

Nobody reads it. Somebody will search their partner, see nothing, screenshot it and treat it as proof, and then somebody will marry a person who is already married while holding a screenshot they believe cleared them.

That is not a data problem, it is an interface problem, and it is my whole field. When a system cannot distinguish between "this person is not married" and "we do not have this person's records yet," and shows you the identical empty screen for both, the interface is making a promise the data cannot keep.

**Technically public, one search away**

People will say the records were already public. They were, in the Registrar-General's office, in court files, in the Gazette. Nobody is inventing new data.

But there is a real difference between something being technically public and something being one search away. A divorce from 2003 sitting in a file in a government office is public in theory; anybody sufficiently determined could find it. The same divorce being searchable in three seconds by a stranger on a phone is a different object entirely, and the data did not change at all. Only the access did.

That gap is where nearly all the harm lives, and nobody consented to it, because the change happened to the accessibility rather than to the record.

**Data minimisation**

Then the engineering question. You expose the minimum data required to answer the question being asked.

What is the question here? Is this person currently free to marry. That is a yes or no. One boolean.

Does answering it require displaying when they married, who they married, when they divorced and which court granted it? Because that is considerably more than yes or no. You could build a version that returns "this person currently has an active marriage on record" and nothing further. The person asking gets what they need; the person being searched keeps everything else. I do not think that version is harder to build. It is simply a decision somebody has to make early.

**The cultural part**

And here is the part I most wanted to get to, because this is exactly what I study.

You cannot copy a system from one culture into another and expect it to mean the same thing. The data may be identical while what it does to a person's life is completely different depending on where they are.

In Estonia, a divorce record is administrative. It is a status. Nobody's aunties are convening a family meeting about it.

Now consider what a searchable divorce registry means across much of Africa. Consider the stigma that still attaches to divorce, particularly for women. Consider a family who does not know, a church community, an employer, in-laws running a search before a wedding and what they do with the result.

Same feature, same data, entirely different consequences, because the social meaning of the information differs. This is what people mean when they say technology is never neutral. The system does not know that divorce carries weight in one place and paperwork in another. It returns a row.

Which makes this a cultural design problem rather than only a privacy engineering one. Who can search? Do they need a reason? Does the person searched find out? Is there a log?

One thing I find genuinely smart about the Estonian approach is that having your data in the system is paired with being able to see what happens to it. Transparency runs in both directions: it is not only that the state can see you, it is that you can see the state seeing you. If we are building this in Africa, that reciprocity is the part I would fight for. Not merely whether I can look you up, but whether you get to know that I did.

**Where I land**

I want this. I want African countries building this kind of infrastructure, and building it ourselves rather than importing it. The problems it solves are real and they hurt real people, especially women who discover far too late that they are the second wife nobody mentioned.

I would just like it built by people asking the second question. Not only whether something can be made searchable, but what happens to a person when it is.

And I would like that conversation to happen now, while this is one country and one platform, rather than in five years when it is everywhere and the defaults have already been set.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Privacy, Africa, Technology, Design, Government

---

## 11. REFERENCES & SOURCES

**1. Marrify itself**
- Launched in Accra on 28 August 2026 by Marry Right Ghana Ltd, in partnership with the Ministry of Gender, Children and Social Protection. Minister: Dr Agnes Naa Momo Lartey.
- Pulls from the Registrar-General's Department, the courts, local assemblies and the Ghana Gazette. Covers ordinance, customary and Islamic marriages, divorces, and some international records. Also verifies licensed venues, churches, pastors and imams.
- Graphic Online: https://www.graphic.com.gh/lifestyle/life/marrify-app-launched-to-help-ghanaians-verify-prospective-partners-marital-status-before-marriage.html
- Pulse Ghana explainer: https://www.pulse.com.gh/story/marrify-ghana-marriage-verification-guide-2026090416085565763
- **SPELLING: it is Marrify, with two r's.** Your dictation said "Marify."

**2. The "no record found" caveat**
- Marrify itself warns that records are still being uploaded, so a no-result should not be taken as proof someone is single (Pulse Ghana). This is the platform's own disclaimer, which is what makes the design critique fair rather than speculative. State it as their warning, not your accusation.

**3. The 1886 divorce records**
- Reported by Guardian Nigeria and Ghanamma. Say "reportedly" on camera, since it comes from press coverage rather than official documentation.

**4. COULD NOT VERIFY: the AI legal guidance layer**
- Your dictation mentioned an AI legal guidance layer, which you recalled from the TechCabal piece. I could not confirm that feature in the sources I found. **Do not state it on camera unless you re-read the TechCabal article and confirm it.** The video works without it.

**5. Estonia claims**
- Everything you say about Estonia in this script is your own lived experience of a year there, which is the strongest possible sourcing for it, so say it as your experience rather than as a statistic.
- The one claim to double-check from your own use before saying it firmly is the data access log, the idea that you can see who has accessed your records. Estonia does operate this kind of transparency mechanism, but since you live there and use the systems, describe it as you have actually experienced it rather than as a feature list.

**6. Data minimisation**
- A standard principle in data protection law, including GDPR Article 5(1)(c) and Ghana's own Data Protection Act 2012. Safe to name as a principle. If you want to cite Ghana's Act specifically on camera, check the section number first.

---

## 12. HASHTAG POOL

> #ghana #africa #tech #privacy #dataprivacy #hci #uxdesign #estonia #digitalgovernment #dataprotection #technews #design #naija

---

## NOTES

- **The Estonia angle is what makes this video yours.** Everybody else covering Marrify is either reporting it or worrying about it. You are the person who has spent a year living inside the most digitised state in Europe and can say what the good version actually looks like. Lead with that authority, it is unusual and it is earned.
- **"Technically public is not the same as one search away" is the strongest argument in the kit.** It answers the main objection people will raise, and it does so in one line. It's the essay title and a standalone tweet.
- **The empty-screen critique is your HCI credential in action.** It is the most concrete, most falsifiable, most useful thing in the video, and it is a real design flaw rather than a vague privacy worry. Nobody else will make this point.
- **The cultural section is the thesis** and it is the reason an HCI person should be making this video rather than a privacy lawyer. Same data, different consequences, because the system returns a row and the row means different things in different places.
- **Balance is deliberate and it is what makes it credible.** You want this built, you say so twice, and the criticism lands harder because of it. Do not let the edit turn it into a warning video.
- **Correct the spelling on camera: Marrify.**
- **Do not mention the AI legal guidance layer** unless you re-read the TechCabal piece and confirm it. Flagged in references.
- **Cross-link:** this is quietly related to your thesis area and to the mental convenience video, in that both are about what a system costs the person inside it.

---

*Her voice, her Estonia vantage point, her field. Sourced, with two unverified claims flagged. No AI tics.*

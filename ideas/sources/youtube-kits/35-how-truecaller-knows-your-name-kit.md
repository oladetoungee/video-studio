# How Truecaller Knows Your Name (and the Lagos Court Case): Content Kit
**A news explainer for Nigerian developers and tech-curious people. It answers the question you started with, how Truecaller can show your name when you never signed up, and then goes through the Lagos High Court judgment of 14 September 2026, Truecaller's side, and how to unlist your number.**
**It's built on what Truecaller, the court and Nigerian outlets have said on record, dated as of October 2026. Where your notes were slightly off, the script corrects it in your own voice, and HOW THIS KIT IS BUILT lists every correction.**
**Every segment opens with its own topic, so any segment can be cut into a clip.**

---

## TAG POOL (48 tags, every tag used anywhere in this kit, deduplicated)

how does truecaller work, how truecaller gets your name, truecaller privacy, how to remove number from truecaller, truecaller unlist, truecaller unlisting, truecaller nigeria, truecaller court case nigeria, truecaller lagos high court, truecaller lawsuit, how does truecaller know my name, truecaller enhanced search, caller id app, nigeria data protection act, ndpa 2023, data privacy nigeria, ndpc, data privacy lawyers association, olumide babalola, consent and contacts, contact upload, crowdsourced caller id, spam calls nigeria, phone number privacy, hashing phone numbers, data protection for developers, privacy by design, nigerian tech news, truecaller explained, is truecaller safe, gbemisola oladetoun, withgbemi, truecaller wrong name, hmac phone numbers, laravel security, does truecaller upload contacts, truecaller name suggestion, truecaller spam reports, reverse phone lookup, truecaller lookup, sql group by, truecaller name search, truecaller gdpr, nitda truecaller, truecaller privacy policy, truecaller europe, truecaller court ruling, ndpc truecaller

## HASHTAG POOL (40 hashtags, every hashtag used anywhere in this kit)

#Shorts #truecaller #privacy #dataprivacy #nigeria #lagos #naijatech #techexplained #developer #techtok #nigeriantech #phonetips #learnontiktok #law #naijanews #techlaw #nigeriannews #techtips #howto #lifehacks #funny #relatable #programming #security #laravel #php #webdev #softwareengineering #codingtips #spamcalls #scamalert #nigerianews #sql #gdpr #dataprotection #nitda #europe #ndpc #cybersecurity #techpolicy

---

## HOW THIS KIT IS BUILT

You told me Truecaller is such a very interesting product, that you don't have to sign up to be on it, that you believe it gets contacts from people who sign up, and that there was a case, you thought in Lagos. You asked me to check all of it and correct you where you were wrong. So the video keeps your opening thought in your own words, then answers it with what's on record, then goes into the case.

**What I corrected from your notes (as of October 2026)**
- **"It gets contacts from people that sign up."** Partly right. Uploaded phone books were one of the main ways Truecaller built its database, and contact sharing still exists as a feature called Enhanced Search. But Truecaller has said since at least 2018 that the versions from the Google Play Store and the Apple App Store don't upload your phone book, and in the Lagos case it told the court that contacts are only uploaded if a user takes "a separate voluntary step." A Hong Kong consumer watchdog test in 2024 found the same thing (upload only after installing the version from Truecaller's own website and turning on Enhanced Search). Names also come from people suggesting names for numbers, from users' own profiles, from spam reports and from public business listings. So the script says contact sharing is one of the main sources, and not the only one.
- **"Truecaller had this case, I think in Lagos."** Correct, and there are actually several Nigerian cases. The one you're thinking of is almost certainly the Lagos State High Court judgment of **14 September 2026** (Justice N. O. Ojuromi), brought by the Data Privacy Lawyers Association and two named non-users against Truecaller International LLP. The court said a user's consent doesn't cover the people in their contacts, and then **dismissed the case** because the applicants didn't prove harm. There was also a 2017 Lagos case (Daniel John), a 2024 Federal High Court ruling in Abuja that went Truecaller's way, a 2019 NITDA investigation, and an NDPC investigation announced in March 2025.
- **"You don't have to sign up on Truecaller."** Right, in the sense that your number and a name can be in Truecaller's database without you ever installing it. To search numbers yourself, you do need the app and an account.

**QUESTIONS FOR YOU**
All story points are filled or written generally. No open questions.

Your answer from the voice note is the hook now. You have never signed up on Truecaller, and you've seen Truecaller show your name. Segment 6 frames your opinion as a UX and HCI person interested in user privacy and how technology finds its way into our lives, and cross-references your Marrify and Uber videos once. Your "I think" lines in Segments 6 and 8 stay, since they match that view. The Segment 8 unlisting marker is cut (you didn't say you unlisted). The Europe and earlier-cases blocks stay in; they're still optional cuts in 2b if you want it shorter.

- **The applicants say they'll appeal** (reported by TechCabal and Innovation Village, late September 2026). If anything new comes out before you post, the script's "as of October 2026" lines are where to update it.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in the first line or two, so a viewer landing anywhere (or a clip cut from it) still knows what it's about. The two code snippets are simplified illustrations of the idea, and the script says so out loud. Nothing here claims to be Truecaller's real code.

---

**[SEGMENT 1: OPEN]**

I have never signed up on Truecaller.

But I've seen Truecaller show my name.

And if you've never downloaded it either, your name can still show up on someone's screen when you call them.

Truecaller is such a very interesting product, because you don't have to sign up on Truecaller for it to know who you are.

In this video, I'll show you where that name comes from, what a Lagos court said about it in September 2026, and how to take your number off Truecaller.

---

**[SEGMENT 2: HOW TRUECALLER GETS YOUR NAME]**

So how does Truecaller get your name, even if you never signed up?

Before I made this video, the way I believed Truecaller worked is that it gets contacts from people that sign up.

So you sign up, and Truecaller gets your whole phone book.

I went and checked, and that's partly right.

Truecaller has a few sources for the names it shows, so I'll name them all quickly and then explain the three big ones.

**[ON SCREEN: where Truecaller's names come from / shared contacts (Enhanced Search) / names people suggest / users' own profiles / spam reports / public business listings]**

There are people who share their contacts with Truecaller.

There are names that people suggest for a number after a call.

There are users' own profiles, because when you sign up, you put in your own name.

There are spam reports from the community.

And there are public business listings.

The first big one is shared contacts.

For years, uploaded phone books were one of the main ways Truecaller built its database.

Today, Truecaller calls this feature Enhanced Search.

If a user turns it on, the numbers in their phone book, and the names they saved them with, go to Truecaller's servers.

So if your friend saved you as "Gbemi Tallinn" and shared their contacts, Truecaller now has your number next to "Gbemi Tallinn".

**[CODE ON SCREEN]**
```json
{
  "shared_by": "+2348031112222",
  "contacts": [
    { "number": "+2348059876543", "saved_as": "Gbemi Tallinn" },
    { "number": "+2348067778888", "saved_as": "Tunde Mechanic" }
  ]
}
```
**[ON SCREEN: a simplified illustration of shared contacts, not Truecaller's real format]**

**[~1:00 BEAT: the correction to her own belief is the reason to stay, because it changes how the viewer thinks their name got there]**

Now this is where I was wrong, or at least not fully right.

Truecaller has said since at least 2018 that the versions you download from the Google Play Store and the Apple App Store don't upload your phone book.

And in the Lagos court case I'll talk about in a minute, Truecaller told the court that contacts only get uploaded if a user takes a separate, voluntary step.

In 2024, Hong Kong's Consumer Council tested this, and they found the same thing.

Truecaller uploaded contact lists only after they installed the version from Truecaller's own website and turned on Enhanced Search.

But there's another side to it.

In 2022, Rest of World reported that on some phones where Truecaller came already installed, Enhanced Search was ticked by default.

And everything people shared over the years is still part of how the database got this big.

The second big source is name suggestions.

After a call from a number Truecaller doesn't know well, the app can ask you to suggest a name for it.

So a stranger you called once can type a name for your number, and that name can become part of what Truecaller knows about you.

The third big source is spam reports.

When enough people mark a number as spam, Truecaller labels it for everyone.

That's the part most of us like, because it's how you know that unknown number is a loan app calling you for the fifth time.

---

**[SEGMENT 3: HOW A TRUECALLER LOOKUP WORKS]**

So what happens when a Truecaller user gets a call from your number?

The app takes your number and looks it up.

It checks the phone's own contacts first, and if your number isn't there, it asks Truecaller's servers who this number belongs to.

The servers might have your number saved under many different names, from many different people.

So Truecaller has to pick one.

Truecaller hasn't published exactly how it picks, so I can't show you their real logic.

But to show you the idea, if I were building something like this, the simplest version would be to pick the name most people saved you as.

**[CODE ON SCREEN]**
```sql
SELECT saved_as, COUNT(*) AS times_saved
FROM shared_contacts
WHERE number = '+2348059876543'
GROUP BY saved_as
ORDER BY times_saved DESC
LIMIT 1;
```
**[ON SCREEN: a simplified illustration of the idea, not Truecaller's real code]**

If thirty people saved you as "Gbemi" and two people saved you as "Gbemi Landlord", this query gives you "Gbemi".

In 2022, Truecaller told Rest of World that people sharing their contacts makes its algorithm more accurate, and this is the kind of thing they mean.

More people saving your number means more names to choose from.

It also explains why Truecaller sometimes shows a name that's wrong, or a name that's a bit embarrassing.

If the only person who saved your number saved you as "Mummy's Tailor", that might be what strangers see.

One more thing Truecaller said in court is that the app only lets you search a number to get a name.

So you need someone's number first, and then it tells you the name.

You can't type a name and get someone's number back, at least in the app versions Truecaller described to the court.

---

**[SEGMENT 4: WHY TRUECALLER IS A PRIVACY QUESTION]**

The privacy question with Truecaller is about people who never signed up.

If I share my contacts with Truecaller, I've agreed to Truecaller's terms.

But the two hundred people in my phone book didn't agree to anything.

Their numbers, and the names I saved them as, go to a company they may never have heard of.

**[~3:00 BEAT: the viewer now knows where their name comes from, and the next stake is whether that's even legal in Nigeria]**

Privacy groups have been saying this for years.

When Privacy International asked Truecaller about it in 2019, Truecaller pointed non-users to its unlisting option.

And Privacy International's answer, as TechCabal reported it, was that unlisting only helps people who already know they're in the database.

In September 2019, Nigeria's NITDA, the National Information Technology Development Agency, said it had started an investigation into Truecaller.

NITDA said Truecaller's privacy policy wasn't in line with Nigeria's data protection rules at the time, and that it "collects far more information than it needs to provide its primary service."

NITDA also said more than seven million Nigerians were using Truecaller back then.

And it pointed out something I found really interesting.

Nigerian users were covered by Truecaller's Indian company, with a different privacy policy from the one for users in Europe.

Europe is where this gets different.

Because of GDPR, the EU's data protection law, Truecaller said in 2022 that Enhanced Search is only offered to users outside the EU, and that contact data from the EU gets rejected.

And in September 2025, Truecaller, which is a Swedish company, announced that Sweden's data protection authority had closed an investigation into it, saying the investigation didn't show a GDPR breach.

So the same app can treat your contacts differently depending on where you are.

---

**[SEGMENT 5: THE TRUECALLER COURT CASE IN LAGOS]**

Truecaller has been to court in Nigeria more than once, and the most recent case was decided in Lagos on the 14th of September, 2026.

**[OPTIONAL RE-ENGAGEMENT: And stay for how this case ended, because both sides walked away with something.]**

The case was at the Lagos State High Court, before Justice N. O. Ojuromi.

It was brought by the Data Privacy Lawyers Association, for its members who don't use Truecaller, together with two named applicants.

Their lawyer was Olumide Babalola.

One of the applicants, Esther Odunze, said that around March 2025, a vendor she'd never dealt with told her he'd found her name and number on Truecaller.

And she said she had never registered on Truecaller or given them her number.

They sued Truecaller International LLP, which is Truecaller's company in India.

They asked the court to stop Truecaller from processing the numbers of non-users without consent, to delete that data, and to pay three hundred million naira in damages.

**[ON SCREEN: Lagos State High Court / judgment 14 September 2026 / Data Privacy Lawyers Association v Truecaller International LLP / ₦200m general + ₦100m exemplary damages asked for]**

Truecaller argued that the Lagos court had no jurisdiction, because it operates from India and has no office or servers in Nigeria.

It argued that users give consent, and that contacts only get uploaded when a user chooses to share them.

And it pointed out that one applicant's number was already public on Instagram, and another looked like a business number.

**[~6:00 BEAT: the judgment itself, which is the payoff of the whole case]**

So what did the court decide?

First, the judge said the court did have jurisdiction, because data protection is part of your right to privacy under Section 37 of the Nigerian Constitution.

Second, and this is the part I think matters most, the court said a user's consent does not cover the people in their contacts.

In the judge's words, as The ICIR reported from the court's certified copy, "Consent to one does not equate to consent to the other."

So your friend agreeing to Truecaller's terms is not you agreeing.

But then the court dismissed the case.

The judge said the applicants didn't prove, with evidence, that they had suffered harm.

The judgment says "the mere misappropriation of personal information, without a resultant economic harm," isn't enough on its own.

So nobody got damages, and the court didn't order Truecaller to delete non-users' data.

The court did note that Truecaller had already deleted the applicants' own numbers after they asked.

And after the judgment, their lawyer said the applicants plan to appeal the part about harm.

That's how things stand as of October 2026.

**[ON SCREEN: what the Lagos court said / a user's consent is not their contacts' consent / but no proven harm, so the case was dismissed / applicants say they'll appeal]**

If you're wondering whether this was the first Nigerian case, it wasn't.

In 2017, a Nigerian named Daniel John sued Truecaller in Lagos, also with Olumide Babalola's firm, and the High Court struck it out in 2018 over jurisdiction and how the papers were served. It went to the Court of Appeal, and I couldn't find how that ended.

Then in 2024, BusinessDay reported a Federal High Court ruling in Abuja that went Truecaller's way.

That court said the users who shared their contacts were the ones responsible for that data, and not Truecaller.

The Lagos judge went the other way and treated Truecaller as responsible.

And in March 2025, the Nigeria Data Protection Commission, the NDPC, said it was investigating Truecaller. I couldn't find a public result of that yet.

So in Nigeria, this isn't settled, and an appeal court will probably have the final say.

---

**[SEGMENT 6: TRUECALLER'S SIDE OF THE STORY]**

To be fair to Truecaller, there's a real reason millions of Nigerians use it.

Truecaller's own data says that in 2025, 51% of unknown calls Nigerians got were spam or fraud, the highest share in Africa in their report.

When you get calls like that every day, an app that tells you who's calling is useful.

After the Lagos judgment, Truecaller put out a statement, which TechCabal reported.

They said, "We welcome the court's recognition that caller identification and spam detection serve an important public-safety purpose."

They also said, "Anyone, whether or not they use Truecaller, can remove their number from our service at any time."

Truecaller also says consent isn't its only legal basis.

Under Section 25 of the Nigeria Data Protection Act, a company can also process data for legitimate interests or the public interest, and Truecaller says caller ID and spam protection fall there.

The Lagos court said legitimate interest has limits when it clashes with someone's rights.

And Truecaller said it won't suspend or redesign its service in Nigeria.

I have never signed up on Truecaller, and I've still seen it show my name.

I look at this as a UX and HCI person. I'm interested in user privacy, and in how technology finds its way into our lives.

It's the same reason I made my videos on Ghana's Marrify and on how Uber serves millions of translations from memory.

So this is what I think.

I think the spam protection is useful, and I understand why people install it.

I think the weak spot is the people who never signed up, because they're the ones whose names are in there without anyone asking them.

And I think the court saying a user's consent isn't their contacts' consent is the most important line in that whole judgment, even though Truecaller won the case.

---

**[SEGMENT 7: WHAT DEVELOPERS CAN LEARN FROM TRUECALLER]**

If you're a developer building an app that asks for contacts, the Truecaller case has a lesson for you too.

When your user taps "Allow" on contacts, that's your user's consent.

According to the Lagos court, it isn't the consent of everyone in their phone book.

**[~9:00 BEAT: the developer section is the most practical part for her core audience, so it's a good reason for the second half to stay]**

So before you upload anyone's contacts, ask if you really need them on your server at all.

A lot of contact features can run on the phone itself, without sending the whole phone book anywhere.

The second lesson is about hashing phone numbers.

After the ruling, Truecaller said that when someone unlists, it keeps a one-way hash of that number, so the number doesn't get added back the next time a user shares their contacts.

A hash turns a value into a fixed string that you can't turn back into the original directly.

That's a good idea, and I want to add one thing every developer should know.

Phone numbers are easy to guess, because there aren't that many of them.

Moxie Marlinspike, who founded Signal, wrote in 2014 that "There are only roughly 10^10 phone numbers," which is about ten billion.

**[ON SCREEN: "There are only roughly 10^10 phone numbers" / "Inverting these hashes is basically a straightforward dictionary attack." / Moxie Marlinspike, Signal blog, 2014]**

And he wrote that "inverting these hashes is basically a straightforward dictionary attack."

That means if someone gets a list of plain hashed phone numbers, they can hash every possible number and match them up.

Truecaller says its hash can't be reversed, and I don't know how they built it, so I'm not saying theirs is weak.

I'm saying that if you build something like this yourself, a plain hash isn't enough.

If you're using Laravel, for example, you can use a keyed hash, with a secret key that only your server knows.

**[CODE ON SCREEN]**
```php
// a plain hash of a phone number (easy to guess back)
$plain = hash('sha256', '+2348059876543');

// a keyed hash, with a secret only your server knows
$keyed = hash_hmac('sha256', '+2348059876543', config('services.phone_hash_key'));

// keep unlisted numbers out when someone shares contacts
$isUnlisted = UnlistedNumber::where('number_hash', $keyed)->exists();
```

Without the secret key, someone with your list can't just hash every number and compare.

---

**[SEGMENT 8: HOW TO REMOVE YOUR NUMBER FROM TRUECALLER]**

If you want to take your number off Truecaller, you can do it even if you've never used the app.

Truecaller's unlisting page is at truecaller.com/unlisting.

**[ON SCREEN: truecaller.com/unlisting / enter your number with +234 / complete the check / tap Unlist, then confirm]**

You enter your phone number with your country code, so +234 for Nigeria.

You complete the little check that you're not a robot, tap Unlist, and confirm it.

Guides I found say it can take up to 24 hours.

If you do have a Truecaller account, you have to deactivate it in the app first, under Settings and then Privacy Center, and then unlist on the website.

And once you're unlisted, you can't use Truecaller to search numbers with that number, because you've taken yourself out.

Truecaller says it keeps that hash of your number, so you don't get added back when someone shares their contacts again.

Unlisting doesn't change what your friends saved you as in their own phones.

And it doesn't touch other caller ID apps, or any other website that has your number.

I think unlisting should be easier to find, because most people who need it don't even know they're on Truecaller.

So now you know where to look.

Tell me in the comments, would you unlist your number, or do you think the spam protection is worth it?

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("how does truecaller work", "how truecaller knows my name", "remove number from truecaller", "truecaller unlist" and "truecaller nigeria" are the phrasings people type)
> 1. How Truecaller Knows Your Name (Even If You Never Signed Up) — 60
> 2. How Does Truecaller Work? Where Your Name Comes From — 52
> 3. How to Remove Your Number From Truecaller (Nigeria) — 51
> 4. Truecaller Court Case in Nigeria Explained — 42
> 5. How Truecaller Gets Your Name and Number — 40
> 6. Truecaller Privacy: The Lagos Court Ruling Explained — 52
> 7. Is Truecaller Legal in Nigeria? What the Court Said — 51

**CLICK-LED**
> 8. Who Told Truecaller Your Name? — 30
> 9. A Lagos Court Just Ruled on Truecaller — 38
> 10. Your Name Is on Truecaller. You Never Signed Up. — 48
> 11. Truecaller Won the Case. The Court Still Said This. — 51
> 12. Why Truecaller Shows the Wrong Name for People — 46

**RECOMMENDED: 1.** "How Truecaller knows your name" is the exact question people search, and it's at the very front. The bracket speaks to the person who never installed it, which is the hook of the whole video. It also stays useful after the news cycle, so it can keep getting search views for months. Title 3 is the strongest practical backup, and it's the one to try if the video gets impressions but the click-through is low. Thumbnail pairing: the title already says "your name", so the thumbnail shouldn't repeat it. Use the incoming-call screen with a stranger's view of your name and the court gavel (see 2b), so together they read as the question plus "and it went to court".

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Who Told Truecaller Your Name?" (title 8). The video answers it directly (people who shared contacts, people who suggested a name, your own profile, spam reports, business listings). Use it as the swap if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot, with a raised eyebrow. On the left, a phone with an incoming call screen and a plain blue caller ID bar that reads "Gbemi Tallinn" (use a generic blue bar, no Truecaller logo). A small gavel in the bottom left corner. The only big words are "MY NAME?". Squint at it, and if you can still see a phone with a name on it and a gavel, it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** your face on the right, and on the left a big phone book with names spilling out of it into a cloud. No words. It pairs with the stretch title.

**Recording notes:**
- Shoot two takes of Segment 1 (about 20 seconds), so you can pick the stronger one. Say the first two lines like you're telling a friend.
- Read the case details in Segment 5 slowly. The judge's name, the date and the two quotes need to be exact, and the on-screen card backs them up.
- Say "a simplified illustration" when the code comes up in Segments 2 and 3. It matters for accuracy, because nobody outside Truecaller knows their exact code.
- Segments 2, 5 and 7 each run over 2 minutes. Segment 5 has an optional re-engagement line, and Segments 2, 5 and 7 have beats inside them.
- The video ends inside Segment 8 on the comment question. Nothing refers back to "in this video we covered", so the edit can end cleanly.
- The script is about 2,300 spoken words, so at your pace it's roughly 15 minutes, which is over the batch target. The cleanest cuts are the earlier-cases block at the end of Segment 5 (from "If you're wondering whether this was the first Nigerian case" to "an appeal court will probably have the final say", about 190 words) and the Europe block in Segment 4 (from "Europe is where this gets different" to the end of the segment, about 90 words). With both cut it's about 2,050 words, roughly 13 to 14 minutes. Clips 11 and 15 depend on those blocks, so drop them if you cut.

**Retention beats (marked in the script):**
- ~1:00 lands in Segment 2, at "this is where I was wrong".
- ~3:00 lands in Segment 4, right as the question turns to whether this is legal in Nigeria.
- ~6:00 lands in Segment 5, at "so what did the court decide?"
- ~9:00 lands in Segment 7, the developer lessons.

**After publishing (news video, so only swap on day one):**
- Post the X image post as the video goes live, and send the link to a few people who'll actually watch it all the way through. Nigerian developer friends and anyone in data protection are the right people.
- This is news, so check after the first day. If it's clearly below your channel average, swap to the stretch title and backup thumbnail then. After that, leave it, because the search title will carry it.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. Wherever the big drop is, that's the part to tighten next time.
- If the appeal is filed or the NDPC announces a result, pin a comment with the update instead of re-uploading.

---

## 3. YOUTUBE DESCRIPTION

> How does Truecaller know your name, even if you never signed up? In this video I explain where Truecaller's names come from, what the Lagos High Court said about it in September 2026, and how to remove your number from Truecaller.
>
> I go through Truecaller's main sources (shared contacts through Enhanced Search, name suggestions, users' own profiles, spam reports and business listings), how a lookup works, with a simplified SQL example of the idea, and why this is a privacy question for people who never signed up. Then the Lagos case brought by the Data Privacy Lawyers Association, where the court said a user's consent doesn't cover their contacts and then dismissed the case for lack of proven harm, plus the earlier Nigerian cases and the NDPC investigation. I also give Truecaller's side, two lessons for developers who build apps with contacts (including why a plain hash of a phone number isn't enough), and the steps to unlist your number. Everything is as of October 2026.
>
> Would you unlist your number, or is the spam protection worth it to you?
>
> CHAPTERS (add times after editing)
> 0:00 Your name on Truecaller when you never signed up
> How Truecaller gets your name
> How a Truecaller lookup works
> Why Truecaller is a privacy question
> The Truecaller court case in Lagos
> Truecaller's side of the story
> What developers can learn from Truecaller
> How to remove your number from Truecaller
>
> SOURCES AND FURTHER READING
> The ICIR, "Truecaller: Court rejects users' consent for processing non-users' phone numbers" (22 Sept 2026): https://www.icirnigeria.org/?p=282195
> TechCabal, Truecaller's statement after the ruling (28 Sept 2026), as republished: https://pro.edgex.exchange/en-US/news/article/lagos-court-dismisses-truecaller-privacy-suit
> Innovation Village, "Truecaller lets Nigerians unlist phone numbers" (28 Sept 2026): https://innovation-village.com/truecaller-lets-nigerians-unlist-phone-numbers/
> Techloy on the ruling and consent: https://www.techloy.com/truecaller-court-ruling-nigeria-contacts-consent/
> BusinessDay on the 2024 Federal High Court ruling: https://businessday.ng/?p=887870
> TechCabal on Daniel John v Truecaller (2019): https://techcabal.com/2019/09/30/the-people-v-big-tech-nigerian-takes-truecaller-to-court-for-alleged-violation-of-privacy-rights/
> Techpoint Africa on the NDPC investigation (March 2025): https://techpoint.africa/news/ndpc-probes-tiktok-truecaller-for-alleged-data-privacy-violations/
> IT Edge News on NITDA's 2019 investigation: https://www.itedgenews.africa/nitda-investigates-truecallers-service-over-possible-breach-of-privacy-rights-of-nigerians/
> The Standard (Hong Kong) on the Consumer Council's 2024 test: https://www.thestandard.com.hk/news/article/216426/Two-spam-call-blockers-upload-users-contact-lists-into-databases-Consumer-Council
> Rest of World, "How Truecaller built a billion-dollar ID data empire in India" (2022): https://restofworld.org/2022/how-truecaller-built-a-billion-dollar-id-data-empire-in-india/
> Truecaller press release on IMY closing its GDPR investigation (5 Sept 2025): https://www.mfn.se/cis/a/truecaller/truecaller-ab-swedish-authority-for-privacy-protection-imy-dismisses-claim-that-truecaller-breached-gdpr-3461b87c
> Moxie Marlinspike, "The Difficulty Of Private Contact Discovery" (Signal, 2014): https://signal.org/blog/contact-discovery/
> Truecaller's unlisting page: https://www.truecaller.com/unlisting
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (489 characters, under YouTube's 500 limit):**

how does truecaller work, how truecaller gets your name, truecaller privacy, how to remove number from truecaller, truecaller unlist, truecaller unlisting, truecaller nigeria, truecaller court case nigeria, truecaller lagos high court, truecaller lawsuit, how does truecaller know my name, truecaller enhanced search, caller id app, nigeria data protection act, ndpa 2023, data privacy nigeria, ndpc, data privacy lawyers association, olumide babalola, consent and contacts, contact upload

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

I have never signed up on Truecaller, but I've seen Truecaller show my name. So where did it get it?

**[WHERE NAMES COME FROM]**

Some users share their contacts with Truecaller through a feature called Enhanced Search, so the name your friend saved you as goes to Truecaller's servers. People can also suggest names for numbers after a call, and spam reports label numbers for everyone. Truecaller says the app store versions don't upload your phone book unless you choose to share it.

**[HOW A LOOKUP WORKS]**

When you call, the app checks Truecaller's servers, and if your number is saved under different names, it has to pick one. That's why the name is sometimes wrong.

**[THE LAGOS CASE]**

On the 14th of September 2026, the Lagos State High Court said a user's consent does not cover the people in their contacts. "Consent to one does not equate to consent to the other." But it dismissed the case, because the applicants didn't prove harm. They say they'll appeal.

**[TRUECALLER'S SIDE]**

Truecaller says caller ID and spam protection serve public safety, and that anyone can remove their number at any time.

**[FOR DEVELOPERS]**

If your app reads contacts, your user's consent isn't their contacts' consent. And a plain hash of a phone number can be guessed back, so use a keyed hash.

**[HOW TO UNLIST]**

Go to truecaller.com/unlisting, enter your number with +234, and confirm. Would you unlist yours?

**Caption:** you never signed up for truecaller, so how does it know your name? where the names come from, what a lagos court said in september 2026, and how to remove your number 📱
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #dataprivacy #nigeria #lagos #naijatech #techexplained #developer #techtok #nigeriantech
**Tags:** how does truecaller work, how truecaller gets your name, truecaller nigeria, truecaller unlist, truecaller court case nigeria

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: Where Truecaller's names come from (30-40 sec)

If you've never signed up for Truecaller, your name can still be on it.

Some users share their contacts with Truecaller, so the name your friend saved you as goes to Truecaller's servers.

People can suggest a name for a number after a call.

Users put in their own names when they sign up, and spam reports label numbers for everyone.

Truecaller says the app store versions don't upload your phone book unless you choose to share it, but years of shared contacts are a big part of how the database got this big.

**Caption:** you never signed up for truecaller and it still knows your name. these are the places truecaller's names come from 👀
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #techexplained #nigeria #dataprivacy #naijatech #phonetips #techtok #learnontiktok
**Tags:** how truecaller gets your name, how does truecaller know my name, truecaller enhanced search, crowdsourced caller id

---

### SHORT 3: What the Lagos court said (30-40 sec)

On the 14th of September 2026, the Lagos State High Court ruled on a case against Truecaller.

The Data Privacy Lawyers Association said Truecaller was processing the numbers of people who never signed up.

The judge said a user's consent does not cover the people in their contacts. In the judge's words, "Consent to one does not equate to consent to the other."

But the court dismissed the case, because the applicants didn't prove they'd been harmed. Their lawyer says they'll appeal.

**Caption:** a lagos court said your friend agreeing to truecaller's terms isn't you agreeing. then it dismissed the case. this is what happened ⚖️
full video: [LINK]
**Hashtags:** #Shorts #truecaller #nigeria #lagos #law #dataprivacy #privacy #naijanews #techlaw #nigeriannews #techtok
**Tags:** truecaller court case nigeria, truecaller lagos high court, data privacy lawyers association, consent and contacts

---

### SHORT 4: How to remove your number from Truecaller (20-30 sec)

You can take your number off Truecaller, even if you've never used it.

Go to truecaller.com/unlisting.

Enter your number with your country code, so +234 for Nigeria, complete the check, tap Unlist and confirm.

If you have a Truecaller account, deactivate it in the app first, under Settings and then Privacy Center.

Guides say it can take up to 24 hours.

**Caption:** how to remove your number from truecaller, even if you never signed up. it takes a minute 📵
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #phonetips #techtips #nigeria #dataprivacy #naijatech #howto #techtok #lifehacks
**Tags:** how to remove number from truecaller, truecaller unlist, truecaller unlisting, phone number privacy

---

### SHORT 5: Why Truecaller shows the wrong name (25-35 sec)

When someone with Truecaller gets a call from you, the app looks up your number on Truecaller's servers.

Your number might be saved there under lots of different names, from lots of different people.

So Truecaller has to pick one, and it hasn't published exactly how.

If the only person who shared your number saved you as "Mummy's Tailor", that might be what strangers see.

**Caption:** if truecaller shows someone with a weird name, this is probably why 😭
full video: [LINK]
**Hashtags:** #Shorts #truecaller #funny #relatable #techexplained #nigeria #naijatech #phonetips #techtok #privacy
**Tags:** truecaller wrong name, how does truecaller work, truecaller explained, crowdsourced caller id

---

### SHORT 6: Hashing phone numbers isn't enough (30-40 sec)

If you're a developer and you're hashing phone numbers to protect them, a plain hash isn't enough.

Phone numbers are easy to guess, because there aren't that many of them.

Moxie Marlinspike, who founded Signal, wrote that "There are only roughly 10^10 phone numbers," so someone can hash every possible number and match them up.

If you're using Laravel, for example, use hash_hmac with a secret key that only your server knows.

**Caption:** hashing phone numbers doesn't protect them as much as you'd think, because there are only so many phone numbers. use a keyed hash 🔐
full video: [LINK]
**Hashtags:** #Shorts #developer #programming #security #laravel #php #webdev #dataprivacy #softwareengineering #codingtips #techtok
**Tags:** hashing phone numbers, hmac phone numbers, data protection for developers, privacy by design, laravel security

---

### SHORT 7: Truecaller's side (25-35 sec)

Truecaller's own data says that in 2025, 51% of unknown calls Nigerians got were spam or fraud, the highest share in Africa in their report.

That's why so many people install it.

After the Lagos ruling, Truecaller said caller ID and spam detection "serve an important public-safety purpose", and that anyone can remove their number at any time.

It also says consent isn't its only legal basis, and points to legitimate interest and public interest in Nigeria's data protection law.

**Caption:** there's a reason millions of nigerians use truecaller. this is what truecaller says in its own defence 📞
full video: [LINK]
**Hashtags:** #Shorts #truecaller #spamcalls #nigeria #scamalert #privacy #naijatech #dataprivacy #techtok #nigerianews
**Tags:** spam calls nigeria, truecaller nigeria, is truecaller safe, truecaller privacy

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: your name shows up on an app you never downloaded
**Caption:** I have never signed up on truecaller, but I've seen truecaller show my name. the full video explains where it comes from 👀
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #nigeria #relatable #naijatech #techtok #dataprivacy #techexplained
**Tags:** how does truecaller know my name, truecaller privacy, truecaller nigeria, phone number privacy

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** where Truecaller gets your name
**Caption:** shared contacts, names people suggest, users' own profiles, spam reports and business listings. this is where truecaller's names come from, and where I was wrong about it.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #techexplained #nigeria #dataprivacy #naijatech #developer #techtok #learnontiktok
**Tags:** how truecaller gets your name, how does truecaller work, crowdsourced caller id, truecaller enhanced search

---

### CLIP 3 — subset of Segment 2
**Starts:** "The first big one is shared contacts." **Ends:** "...Truecaller now has your number next to "Gbemi Tallinn"."
**Overlay:** what Truecaller's Enhanced Search does
**Caption:** if a truecaller user turns on enhanced search, the numbers in their phone book and the names they saved them with go to truecaller's servers.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #techexplained #dataprivacy #nigeria #phonetips #techtok #naijatech
**Tags:** truecaller enhanced search, contact upload, how truecaller gets your name, phone number privacy

---

### CLIP 4 — subset of Segment 2
**Starts:** "Now this is where I was wrong, or at least not fully right." **Ends:** "...everything people shared over the years is still part of how the database got this big."
**Overlay:** does Truecaller upload your contacts?
**Caption:** truecaller says the app store versions don't upload your phone book unless you choose to share it. a 2024 test in hong kong found the same, and a 2022 report found it was ticked by default on some phones.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #dataprivacy #techexplained #nigeria #techtok #naijatech #phonetips
**Tags:** does truecaller upload contacts, truecaller enhanced search, contact upload, is truecaller safe

---

### CLIP 5 — subset of Segment 2
**Starts:** "The second big source is name suggestions." **Ends:** "...it's how you know that unknown number is a loan app calling you for the fifth time."
**Overlay:** how strangers name you on Truecaller
**Caption:** after a call, truecaller can ask people to suggest a name for a number. and when enough people mark a number as spam, it gets labelled for everyone 📞
full video: [LINK]
**Hashtags:** #Shorts #truecaller #spamcalls #relatable #nigeria #naijatech #techexplained #techtok #privacy
**Tags:** truecaller name suggestion, truecaller spam reports, crowdsourced caller id, spam calls nigeria

---

### CLIP 6 — Segment 3 (whole)
**Overlay:** what happens when a Truecaller user gets your call
**Caption:** the app checks the phone's contacts, then asks truecaller's servers. if your number is saved under different names, it has to pick one, and truecaller hasn't published exactly how.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #developer #techexplained #sql #programming #nigeria #techtok #softwareengineering
**Tags:** how does truecaller work, truecaller explained, reverse phone lookup, truecaller lookup

---

### CLIP 7 — subset of Segment 3
**Starts:** "But to show you the idea, if I were building something like this," **Ends:** "...that might be what strangers see."
**Overlay:** why Truecaller shows the wrong name
**Caption:** a simplified sql example of the idea. if the only person who shared your number saved you as "mummy's tailor", that might be what strangers see 😭
full video: [LINK]
**Hashtags:** #Shorts #truecaller #sql #developer #programming #relatable #funny #techtok #naijatech
**Tags:** truecaller wrong name, sql group by, how does truecaller work, crowdsourced caller id

---

### CLIP 8 — subset of Segment 3
**Starts:** "One more thing Truecaller said in court is that the app only lets you search a number to get a name." **Ends:** "...at least in the app versions Truecaller described to the court."
**Overlay:** can you search someone's name on Truecaller?
**Caption:** truecaller told a lagos court that the app only lets you search a number to get a name, so you need someone's number first.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #nigeria #techexplained #dataprivacy #techtok #naijatech
**Tags:** truecaller name search, reverse phone lookup, truecaller explained, phone number privacy

---

### CLIP 9 — Segment 4 (whole)
**Overlay:** why Truecaller is a privacy question
**Caption:** if you share your contacts with truecaller, you agreed to the terms. the people in your phone book didn't. this is what privacy groups, nitda and europe's data law have said about it.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #dataprivacy #gdpr #nigeria #techlaw #naijatech #techtok #dataprotection
**Tags:** truecaller privacy, truecaller gdpr, nitda truecaller, consent and contacts

---

### CLIP 10 — subset of Segment 4
**Starts:** "In September 2019, Nigeria's NITDA," **Ends:** "...with a different privacy policy from the one for users in Europe."
**Overlay:** when NITDA investigated Truecaller
**Caption:** in 2019, nitda said truecaller "collects far more information than it needs to provide its primary service", and that nigerian users had a different privacy policy from users in europe.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #nitda #nigeria #dataprivacy #privacy #naijatech #nigeriannews #techtok
**Tags:** nitda truecaller, truecaller nigeria, data privacy nigeria, truecaller privacy policy

---

### CLIP 11 — subset of Segment 4
**Starts:** "Europe is where this gets different." **Ends:** "...So the same app can treat your contacts differently depending on where you are."
**Overlay:** Truecaller in Europe vs Nigeria
**Caption:** truecaller said in 2022 that enhanced search is only offered outside the eu, and that contact data from the eu gets rejected. same app, different rules.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #gdpr #europe #nigeria #dataprivacy #privacy #techtok #dataprotection
**Tags:** truecaller gdpr, truecaller europe, truecaller enhanced search, data privacy nigeria

---

### CLIP 12 — Segment 5 (whole)
**Overlay:** the Truecaller court case in Lagos, explained
**Caption:** on 14 september 2026, the lagos state high court said a user's consent doesn't cover their contacts, then dismissed the case for lack of proven harm. plus the earlier nigerian cases.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #nigeria #lagos #law #dataprivacy #naijanews #techlaw #nigeriannews #privacy #techtok
**Tags:** truecaller court case nigeria, truecaller lagos high court, truecaller lawsuit, data privacy lawyers association

---

### CLIP 13 — subset of Segment 5
**Starts:** "The case was at the Lagos State High Court, before Justice N. O. Ojuromi." **Ends:** "...and to pay three hundred million naira in damages."
**Overlay:** who sued Truecaller in Lagos, and why
**Caption:** one applicant said a vendor she'd never dealt with found her name and number on truecaller, and she'd never registered. they asked for ₦300 million in damages.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #nigeria #lagos #law #naijanews #dataprivacy #nigeriannews #techlaw
**Tags:** truecaller lawsuit, data privacy lawyers association, olumide babalola, truecaller lagos high court

---

### CLIP 14 — subset of Segment 5
**Starts:** "So what did the court decide?" **Ends:** "...the applicants plan to appeal the part about harm."
**Overlay:** what the Lagos court decided about Truecaller
**Caption:** the court said "consent to one does not equate to consent to the other", and then dismissed the case because harm wasn't proven. the applicants say they'll appeal ⚖️
full video: [LINK]
**Hashtags:** #Shorts #truecaller #law #nigeria #lagos #dataprivacy #techlaw #naijanews #privacy #nigeriannews
**Tags:** truecaller court ruling, consent and contacts, nigeria data protection act, truecaller lagos high court

---

### CLIP 15 — subset of Segment 5
**Starts:** "If you're wondering whether this was the first Nigerian case, it wasn't." **Ends:** "...and an appeal court will probably have the final say."
**Overlay:** every time Truecaller went to court in Nigeria
**Caption:** a 2017 case in lagos, a 2024 ruling in abuja that went truecaller's way, an ndpc investigation in 2025, and now the 2026 lagos judgment. it isn't settled yet.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #nigeria #law #ndpc #dataprivacy #naijanews #techlaw #nigeriannews
**Tags:** truecaller lawsuit, ndpc truecaller, truecaller court case nigeria, data privacy nigeria

---

### CLIP 16 — Segment 6 (whole)
**Overlay:** Truecaller's side of the story
**Caption:** truecaller's own data says 51% of unknown calls nigerians got in 2025 were spam or fraud. this is what truecaller says in its defence, and what I think as someone who has never signed up and still sees my name on it.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #spamcalls #nigeria #privacy #scamalert #naijatech #dataprivacy #techtok
**Tags:** truecaller nigeria, spam calls nigeria, is truecaller safe, truecaller privacy

---

### CLIP 17 — Segment 7 (whole)
**Overlay:** if your app asks for contacts, watch this
**Caption:** your user's consent isn't their contacts' consent, and a plain hash of a phone number can be guessed back. two lessons for developers from the truecaller case.
full video: [LINK]
**Hashtags:** #Shorts #developer #programming #dataprivacy #laravel #php #security #webdev #softwareengineering #techtok
**Tags:** data protection for developers, privacy by design, hashing phone numbers, contact upload

---

### CLIP 18 — subset of Segment 7
**Starts:** "The second lesson is about hashing phone numbers." **Ends:** "...someone with your list can't just hash every number and compare."
**Overlay:** why hashing phone numbers isn't enough
**Caption:** there are only so many phone numbers, so a plain hash can be guessed back. moxie marlinspike, who founded signal, called it "a straightforward dictionary attack". use a keyed hash 🔐
full video: [LINK]
**Hashtags:** #Shorts #developer #security #programming #laravel #php #webdev #cybersecurity #codingtips #techtok
**Tags:** hashing phone numbers, hmac phone numbers, laravel security, privacy by design

---

### CLIP 19 — Segment 8 (whole)
**Overlay:** how to remove your number from Truecaller
**Caption:** go to truecaller.com/unlisting, enter your number with +234, complete the check and confirm. if you have an account, deactivate it in the app first 📵
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #phonetips #techtips #nigeria #howto #dataprivacy #naijatech #lifehacks
**Tags:** how to remove number from truecaller, truecaller unlist, truecaller unlisting, phone number privacy

---

### CLIP 20 — subset of Segment 8
**Starts:** "Unlisting doesn't change what your friends saved you as in their own phones." **Ends:** "...any other website that has your number."
**Overlay:** what unlisting from Truecaller doesn't do
**Caption:** unlisting takes your number off truecaller. it doesn't change what your friends saved you as, and it doesn't touch other caller id apps.
full video: [LINK]
**Hashtags:** #Shorts #truecaller #privacy #phonetips #dataprivacy #nigeria #techtips #naijatech #techtok
**Tags:** truecaller unlist, phone number privacy, truecaller unlisting, caller id app

---

**Posting order:** 1 first (the most relatable), then 19 (the practical how-to, it'll get saved and shared), then 14 (the judgment), then 7 (the wrong-name clip, the funniest), then 4 (does it upload your contacts), then 13 (who sued), then 18 (for your developer audience), then 10 (NITDA), then 15 (every Nigerian case). Space the whole-segment clips out between the subset clips so the same footage doesn't run twice in a row.

---

## 6. CAPTIONS

### TikTok caption:
> you've never downloaded truecaller, so how does it know your name? I looked into where the names come from, what a lagos court said in september 2026, and how to take your number off 📱
**Hashtags:** #truecaller #privacy #nigeria #dataprivacy #naijatech

### Instagram Reel caption:
> If you've ever called someone and Truecaller showed them your name, even though you've never used Truecaller, this is how it happened.
>
> Some users share their contacts with Truecaller, so the name your friend saved you as can end up on Truecaller's servers. People can also suggest names for numbers after a call, and spam reports label numbers for everyone.
>
> In September 2026, the Lagos State High Court said a user's consent doesn't cover the people in their contacts, and then dismissed the case because harm wasn't proven. I go through the case, Truecaller's side, and how to remove your number in the full video.
>
> Full video on YouTube, link in bio. Would you unlist your number?
>
> #truecaller #dataprivacy #nigeria #privacy #naijatech

### LinkedIn caption:
> How does Truecaller show the name of someone who never signed up?
>
> A large part of the answer is contact sharing, where users who turn on a feature called Enhanced Search send the numbers and saved names in their phone book to Truecaller's servers.
>
> Name suggestions and community spam reports fill in what contact sharing misses, which is why the name shown is sometimes wrong.
>
> On 14 September 2026, the Lagos State High Court addressed the consent question directly, holding that "consent to one does not equate to consent to the other," so a user's agreement does not cover the people in their contacts.
>
> The court still dismissed the case, because the applicants did not prove harm, and they have said they will appeal, which means the legal position in Nigeria is not settled.
>
> For developers, the practical lesson is that a user's consent to share contacts is not consent from those contacts, and that a plain hash of a phone number can be reversed by trying every number, so a keyed hash is the safer choice.
>
> Full walkthrough, including how to unlist your number: [LINK]
>
> #dataprotection #privacy #nigeria #softwareengineering #techpolicy

---

## 7. X / TWITTER

**How this section works.** Image cheat sheets get far more reach than text tweets, and the tweets that start conversations name one specific situation and what happens. So there's one image post, one tips list, one poll (whether to unlist is partly opinion), one "can you guess" tweet, the launch tweet, and single tweets that each say one specific thing. Everything is lowercase, no arrows, no hashtags, and the link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> where truecaller gets your name from, and how to take your number off, on one card

**Image content (one clean card in Canva, no Truecaller logo):**
> **HOW TRUECALLER KNOWS YOUR NAME**
> **shared contacts** · users who turn on Enhanced Search send their phone book (numbers + saved names)
> **name suggestions** · people can suggest a name for a number after a call
> **user profiles** · the name you type when you sign up
> **spam reports** · enough reports and a number gets labelled for everyone
> **business listings** · public numbers for businesses
> **the lagos ruling (14 sept 2026)** · a user's consent doesn't cover their contacts, but the case was dismissed for lack of proven harm
> **to unlist** · truecaller.com/unlisting · number with +234 · deactivate your account first if you have one

**Reply:**
> I went through each of these, the court case and truecaller's side here: [LINK]

---

### THE TIPS LIST

> things I'd tell anyone worried about their number on truecaller
>
> 1. you can unlist at truecaller.com/unlisting even if you've never used the app
> 2. if you have an account, deactivate it in the app first
> 3. use +234 when you enter your number
> 4. unlisting doesn't change what your friends saved you as
> 5. check your app's settings before you turn on any "enhanced search" or contact sharing
> 6. if you build apps, your user's consent isn't their contacts' consent

**Reply:** full video on all of these: [LINK]

---

### THE POLL

> would you unlist your number from truecaller?
>
> yes, today
> no, I like the spam protection
> I didn't know I could
> I'm not even on it (I think)

**Your reply a few hours later:**
> the "I'm not even on it" people should check, because you can be on truecaller without ever signing up. someone who saved your number can be enough

---

### THE "CAN YOU GUESS" TWEET

> a lagos court ruled on truecaller in september 2026. it said a user's consent doesn't cover the people in their contacts. can you guess who won the case?

**Your reply:**
> truecaller. the court agreed on consent, but dismissed the case because the applicants didn't prove they were harmed. they say they'll appeal

---

### THE LAUNCH TWEET

> made a video on how truecaller knows your name when you never signed up, the lagos court case from september, truecaller's side, and how to unlist your number

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if your friend saved you as "mummy's tailor" and shared their contacts with truecaller, that can be the name strangers see when you call them

> the lagos judgment on truecaller had this line: "consent to one does not equate to consent to the other." your friend agreeing to the terms is not you agreeing

> if you're hashing phone numbers to protect them, there are only about 10 billion possible numbers. someone can hash all of them and match yours. use a keyed hash

> truecaller told the court it only lets you search a number to get a name, so you need someone's number first. you can't type a name and get their number

> in 2019 nitda said truecaller "collects far more information than it needs to provide its primary service." seven years later the question is still in court

> you can be on truecaller without ever downloading it. have you checked yours? 👀

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> would you unlist your number from truecaller, or is the spam protection worth it to you? and has truecaller ever shown you a name that made you laugh? 👀

### Instagram:
> the line from the judgment I keep thinking about is "consent to one does not equate to consent to the other." that's the whole question in one sentence.

### TikTok:
> what's the funniest name truecaller has shown you for someone 😭

### LinkedIn:
> If your product asks users for their contacts, I'd be curious how your team thinks about the people in those contacts, because the Lagos court has now said their consent is separate.

### X (reply to your own tweet):
> if you unlist after watching, tell me how long it took to come off. guides say up to 24 hours and I'd like to know if that's still right

### REPLIES TO EXPECT (ready to paste)

**"Truecaller uploads all your contacts the moment you install it."**
> that was more true in the past. truecaller says the play store and app store versions don't upload your phone book unless you choose to share it, and a 2024 test in hong kong found the same. older uploads and some preinstalled versions are a different story, so the video covers both

**"So Truecaller won? Then it's legal."**
> they won the case, but the court also said a user's consent doesn't cover their contacts. it was dismissed because harm wasn't proven, and the applicants say they'll appeal. so it isn't settled

**"I unlisted and my name still shows on my friend's phone."**
> if your friend saved you in their contacts, their phone shows that name, and unlisting can't change that. unlisting only takes you off truecaller's database

**"Just don't use Truecaller then."**
> you can be on it without using it, which is the whole point of the video. not installing it doesn't keep you out. unlisting does

**"Every caller ID app does this."**
> a lot of them work on similar ideas, and the hong kong test looked at another one too. I focused on truecaller because it's the one in the nigerian courts

**"Hashing is secure, what are you talking about?"**
> hashing is fine for lots of things. phone numbers are the problem, because there are so few possible ones that someone can hash all of them and compare. a keyed hash with a secret fixes that

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** how truecaller knows your name, even if you never signed up.
**Slide 2:** some users share their contacts with truecaller, and the names they saved go with them.
**Slide 3:** people can also suggest a name for a number after a call.
**Slide 4:** spam reports label a number for everyone once enough people mark it.
**Slide 5:** that's why truecaller sometimes shows a wrong or funny name for someone.
**Slide 6:** on 14 september 2026, a lagos court said a user's consent doesn't cover their contacts.
**Slide 7:** the court still dismissed the case, because the applicants didn't prove harm.
**Slide 8:** truecaller says caller id and spam protection serve public safety.
**Slide 9:** you can unlist your number at truecaller.com/unlisting, even if you've never used it.

**Carousel caption:**
> how truecaller gets your name, what the lagos court said, and how to take your number off. full video on YouTube, link in bio.
>
> #truecaller #dataprivacy #nigeria #privacy #naijatech

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> How Truecaller Knows Your Name, and What a Lagos Court Said About It

### Subtitle:
> Where Truecaller's names come from, the September 2026 judgment on consent, Truecaller's side, and how to unlist your number.

### SEO Title:
> How Does Truecaller Know My Name? The Lagos Court Case Explained

### SEO Description:
> A plain explanation of how Truecaller builds its caller ID database, what the Lagos State High Court ruled in September 2026 about non-users' consent, and how to remove your number from Truecaller.

---

I have never signed up on Truecaller, but I've seen Truecaller show my name. If you've never downloaded it, it can still know your name too. When you call someone who has the app, a name can appear on their screen, and it may be the name you use or the name somebody saved you as years ago. I've always thought Truecaller is a very interesting product for exactly that reason, and before I looked into it properly, I believed it got everyone's contacts from the people who sign up. That turned out to be partly right, and a Lagos court ruled on that exact question this year, which matters to anyone who builds apps.

Truecaller's names come from a few places. Users can share their contacts with it through a feature it calls Enhanced Search, which sends the numbers in their phone book, and the names they saved them under, to Truecaller's servers. People can suggest a name for a number after a call. Users type their own name when they sign up, enough spam reports will label a number for everyone, and public business listings fill in more. Uploaded phone books were one of the main ways the database grew. But Truecaller has said since at least 2018 that the versions from the Google Play Store and the Apple App Store don't upload your phone book, and in court in Lagos it said contacts are uploaded only when a user takes a separate, voluntary step. Hong Kong's Consumer Council tested this in 2024 and found the upload happened only after installing the version from Truecaller's own website and switching Enhanced Search on. Rest of World reported in 2022 that Enhanced Search came ticked by default on some phones where Truecaller was preinstalled, so what people shared in earlier years is still part of the database.

When a Truecaller user gets a call, the app checks their phone's contacts first and then asks Truecaller's servers. Your number might be stored there under many names, from many people, and Truecaller has to choose one. It hasn't published how it chooses. The simplest version of that idea would be to pick the name most people used, which also explains why the result is sometimes wrong, or a bit embarrassing, when only one person ever shared your number.

The privacy question is about the people who never agreed to anything. If I share my contacts, I've accepted Truecaller's terms, and the hundreds of people in my phone book haven't. Nigeria's NITDA raised this in 2019, saying Truecaller "collects far more information than it needs to provide its primary service" and noting that Nigerian users were covered by a different policy from users in Europe. In the EU, Truecaller said in 2022 that Enhanced Search isn't offered and contact data from the EU is rejected, and in September 2025 Truecaller announced that Sweden's data protection authority had closed an investigation, saying it didn't show a GDPR breach.

On 14 September 2026, the Lagos State High Court, before Justice N. O. Ojuromi, ruled on a case brought by the Data Privacy Lawyers Association and two non-users against Truecaller International LLP, with Olumide Babalola as their counsel. One applicant said a vendor she had never dealt with told her he found her name and number on Truecaller. They asked for an order stopping the processing of non-users' numbers, deletion, and ₦300 million in damages. According to The ICIR, which reported from the certified copy, the court held that it had jurisdiction, treated Truecaller as responsible for the data, and said that "Consent to one does not equate to consent to the other." It then dismissed the case, because the applicants had not proved harm with evidence, and the judgment says that the mere misappropriation of personal information "without a resultant economic harm" isn't enough on its own. The applicants say they will appeal. This was not the first case. Daniel John sued in Lagos in 2017 and the case was struck out in 2018, a Federal High Court in Abuja ruled for Truecaller in 2024 and said the users who shared contacts were responsible, and the NDPC announced an investigation in March 2025. As of October 2026, the question isn't settled.

Truecaller's side deserves a fair hearing. By its own data, 51% of unknown calls that Nigerians received in 2025 were spam or fraud, the highest share in Africa in its report, and that is why so many people install it. After the ruling, Truecaller said, "We welcome the court's recognition that caller identification and spam detection serve an important public-safety purpose," and that "Anyone, whether or not they use Truecaller, can remove their number from our service at any time." It also says consent isn't its only legal basis under the Nigeria Data Protection Act, and points to legitimate interest and public interest. I think the spam protection is useful. I also think the court's line on consent is the most important thing to come out of the case, even though Truecaller won it.

For developers, there are two lessons. When your user allows access to their contacts, that's their consent, and according to the Lagos court it isn't the consent of the people in their phone book, so ask whether you need those contacts on your server at all. And if you hash phone numbers, a plain hash isn't enough. Moxie Marlinspike, who founded Signal, wrote in 2014 that "There are only roughly 10^10 phone numbers," which is about ten billion, and that "inverting these hashes is basically a straightforward dictionary attack." Truecaller says it keeps a one-way hash of unlisted numbers so they don't get added back, and I don't know how it built that, but if you build something similar, use a keyed hash with a secret only your server knows.

If you want your number off Truecaller, go to truecaller.com/unlisting, enter your number with your country code, complete the check and confirm. If you have an account, deactivate it in the app first. It won't change what your friends saved you as in their own phones, and it won't touch other apps that have your number. I'd like to know whether you'd unlist, or whether the spam protection is worth it to you.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Privacy, Data Protection, Nigeria, Software Development, Technology

---

## 11. REFERENCES & SOURCES

**1. The Lagos State High Court judgment, 14 September 2026 (main case in Segment 5)**
- The ICIR, Marcus Fatunmole, "Truecaller: Court rejects users' consent for processing non-users' phone numbers," 22 September 2026, reported from a certified true copy of the judgment. https://www.icirnigeria.org/?p=282195
  - Supports: court (Lagos State High Court), judge (Justice N. O. Ojuromi), suit number LD/2021MFHR/2025, originating motion filed 13 August 2025, judgment 14 September 2026. Applicants: Incorporated Trustees of Data Privacy Lawyers Association (for non-user members), with Esther Odunze and Ilashe E. Nike. Counsel Olumide Babalola. Respondent Truecaller International LLP.
  - Odunze's account (a vendor told her around March 2025 he'd found her on Truecaller; she never registered). Reliefs: declarations under Section 37 of the Constitution and Sections 25 and 26 of the NDPA, injunctions, deletion within seven days, ₦200m general and ₦100m exemplary damages.
  - Truecaller's defences: no jurisdiction (registered and operating in India, no office or servers in Nigeria); upload only if the user takes a separate voluntary step; one number public on Instagram, another a business number; app only allows number-for-name searches; data processed in India.
  - Holdings: jurisdiction yes (Section 37 covers personal data); association can sue for members; Truecaller treated as a data controller; "Consent to one does not equate to consent to the other"; a user's voluntary upload doesn't establish non-users' implied consent; but no cogent evidence of infringement, and "the mere misappropriation of personal information, without a resultant economic harm" isn't damage on its own; application dismissed; Truecaller had deleted the applicants' numbers on request.
- Techloy, on the ruling and how it departs from an earlier Nigerian case. https://www.techloy.com/truecaller-court-ruling-nigeria-contacts-consent/
- Innovation Village, Jessica Adiele, 28 September 2026. https://innovation-village.com/truecaller-lets-nigerians-unlist-phone-numbers/ Supports: the court's "insufficient to establish implied consent" finding, Truecaller's legitimate-interest and public-safety argument and the court's view that legitimate interest is limited where it conflicts with rights, Babalola saying the applicants plan to appeal the treatment of injury, Truecaller saying it won't suspend or redesign its Nigerian service, and the hash of unlisted numbers.
- Managers.tn, 30 September 2026 (French), confirms the outcome. https://managers.tn/2026/09/30/truecaller-gagne-son-proces-au-nigeria-mais/

**2. Truecaller's statement after the ruling (Segments 6, 7, 8)**
- TechCabal, 28 September 2026, as republished by edgeX (TechCabal's own page wouldn't load this session). https://pro.edgex.exchange/en-US/news/article/lagos-court-dismisses-truecaller-privacy-suit
  - Exact quotes used: "We welcome the court's recognition that caller identification and spam detection serve an important public-safety purpose" and "Anyone, whether or not they use Truecaller, can remove their number from our service at any time."
  - Paraphrased (not quoted in the script): the one-way hash of unlisted numbers, which Truecaller says can't be reversed; legitimate interest and public interest under NDPA Section 25; Section 45 public-safety argument; no suspension or redesign in Nigeria.

**3. Earlier Nigerian cases and regulators (Segments 4 and 5)**
- Daniel John v True Software Scandinavia AB: TechCabal, 30 September 2019. https://techcabal.com/2019/09/30/the-people-v-big-tech-nigerian-takes-truecaller-to-court-for-alleged-violation-of-privacy-rights/ Filed 2017 in the Lagos State High Court with Olumide Babalola LP; struck out 5 July 2018 over service irregularities and jurisdiction (telephones being a federal matter); on appeal at the Court of Appeal in 2019. Also the source for Privacy International's point that unlisting only helps people who know they're in the database, and Truecaller pointing non-users to unlisting.
- Olumide Babalola LP and Olasunkami Bello v True Software Scandinavia AB and NITDA, Federal High Court, Abuja (Justice J. K. Omotosho): BusinessDay, 26 September 2024. https://businessday.ng/?p=887870 Ruled for Truecaller; found the applicants hadn't shown their numbers were searchable through Truecaller, and that the users who consented to share contacts were the controllers.
- NITDA investigation, 24 September 2019: IT Edge News. https://www.itedgenews.africa/nitda-investigates-truecallers-service-over-possible-breach-of-privacy-rights-of-nigerians/ Quote used: "collects far more information than it needs to provide its primary service." Also "over seven million Nigerians," and Nigerian users contracting with Truecaller India under a policy different from the EEA one.
- NDPC investigation, 20 March 2025: Techpoint Africa. https://techpoint.africa/news/ndpc-probes-tiktok-truecaller-for-alleged-data-privacy-violations/ Dr Vincent Olatunji: "We are currently investigating TikTok and Truecaller in the area of data privacy."

**4. How Truecaller builds its database (Segments 2 and 3)**
- Beebom, 26 September 2018, quoting Truecaller's Manan Shah: "We do not upload the phone book from users who download the app from Google Play Store and Apple App Store." Also name suggestions after calls and data partners for business listings. https://beebom.com/how-truecaller-works-privacy-concerns/amp/
- Truecaller press release, 3 October 2022: Enhanced Search is an option for non-EU users to share data on a consent basis; EU-originated data is automatically rejected. https://mb.cision.com/Main/20429/3641129/1633543.pdf
- The Standard (Hong Kong), 16 May 2024, on the Consumer Council's test: Truecaller uploaded contact lists only after installing the APK from its website and enabling Enhanced Search. https://www.thestandard.com.hk/news/article/216426/Two-spam-call-blockers-upload-users-contact-lists-into-databases-Consumer-Council
- Rest of World, Rachna Khaira, March 2022: Enhanced Search auto-checked on some preinstalled devices (Micromax, Samsung, Wileyfox, per a former employee); Truecaller saying contact sharing improves its algorithm's accuracy. https://restofworld.org/2022/how-truecaller-built-a-billion-dollar-id-data-empire-in-india/
- Truecaller's 2013 privacy policy (archived), showing the contact-aggregation model and name suggestions on Android in earlier years. https://tostracker.app/document/truecaller-privacy/version/668578

**5. Truecaller in Europe and its size (Segments 4 and 6)**
- Truecaller release, 5 September 2025: IMY "investigation does not show that Truecaller has breached GDPR," closed with no enforcement action. https://www.mfn.se/cis/a/truecaller/truecaller-ab-swedish-authority-for-privacy-protection-imy-dismisses-claim-that-truecaller-breached-gdpr-3461b87c
- Truecaller interim report, 17 July 2026: 471.0 million average MAU excluding iOS in Q2 2026 (not used in the script, here for replies). https://mfn.se/cis/a/truecaller/truecaller-ab-sequential-growth-across-all-revenue-streams-11b34ed8
- The Guardian Nigeria, 6 May 2026, from Truecaller's data: 51% of unknown calls to Nigerians in 2025 were spam or fraud, eighth worldwide and first in Africa. https://guardian.ng/technology/communications/nigeria-is-africas-most-spammed-country-as-51-of-unknown-calls-to-citizens-rank-as-fraud/

**6. Hashing phone numbers (Segment 7)**
- Moxie Marlinspike, "The Difficulty Of Private Contact Discovery," Signal blog, 3 January 2014. https://signal.org/blog/contact-discovery/ Quotes used: "There are only roughly 10^10 phone numbers" and "Inverting these hashes is basically a straightforward dictionary attack." (The script says "inverting" in lowercase mid-sentence.)
- PHP's hash_hmac is a standard PHP function. The config key name in the snippet is illustrative.

**7. Unlisting steps (Segment 8)**
- Guiding Tech (updated August 2023): deactivate first if you have an account (Settings, Privacy Center), then truecaller.com/unlisting, number with country code, CAPTCHA, Unlist and confirm, up to 24 hours. https://www.guidingtech.com/how-to-unlist-your-phone-number-from-truecaller/
- Incogni (2022): same steps and the 24-hour window. https://blog.incogni.com/truecaller-opt-out/
- Truecaller's September 2026 statement (group 2) confirms unlisting is open to anyone, users or not.

**8. Things I couldn't verify (hedged or left out)**
- **Truecaller's own privacy policy, help centre and unlisting page** were blocked from this session, so I couldn't read the current (2026) wording or check whether the unlisting steps have changed. The script relies on Truecaller's statements in court and to the press. Open truecaller.com/unlisting yourself before recording, and if the steps look different, adjust Segment 8.
- **Whether contact sharing is on by default in today's app** is stated only as Truecaller's claim plus the 2024 Hong Kong test. I couldn't test the current app.
- **The outcome of Daniel John's appeal** and **the NDPC investigation** aren't public anywhere I could find. The script says so.
- **The exact date of the Abuja ruling.** BusinessDay's article is dated 26 September 2024 and doesn't give the ruling date, so the script says "in 2024, BusinessDay reported".
- **Wikipedia lists two more Nigerian suits (Onwubuariri and Okafor v Truecaller International LLP).** I couldn't find a reputable report on them, so they're left out.
- **The ICIR uses "controller" and "processor" loosely** (it says the judge found Truecaller a controller with processor responsibilities). The script only says the Lagos judge "treated Truecaller as responsible," which is safe either way.

**9. Corrections / careful wording**
- **"Truecaller uploads everyone's contacts when they sign up."** Left out as a flat claim. The script says uploaded phone books were one of the main ways the database grew, that Truecaller says app store versions don't upload unless the user chooses to, and gives the Hong Kong and Rest of World evidence on both sides.
- **"The court ruled against Truecaller."** Avoided. The court made a finding against Truecaller's consent argument and still dismissed the case. The script says both, in that order.
- **The ₦300 million** is what the applicants asked for (₦200m general plus ₦100m exemplary), never what was awarded.
- **The "about 450 million numbers" figure** is an allegation from the applicants' affidavit, so it's left out.
- **How Truecaller picks a name** isn't public. The SQL snippet is labelled on screen and out loud as a simplified illustration, and the script says Truecaller hasn't published its logic.
- **The hash point** doesn't claim Truecaller's hash is weak. It says Truecaller describes it as non-reversible, that you don't know how they built it, and that the lesson is for developers building their own.
- **Truecaller International LLP** is described as Truecaller's company in India (the entity Nigerian users contract with, per NITDA), and Truecaller itself as a Swedish company. The ICIR's "based in India" refers to the LLP.
- **"Truecaller won"** in the tweets is accurate in the sense that the application was dismissed. The replies always add that the consent finding went against it.
- **Kenya** has a 2024 complaint against Truecaller at its data protection commissioner. It's left out so it doesn't overlap with video 37 (Kenya vs Meta), and because I couldn't find an outcome.

---

## NOTES

- **New topic.** There's no older version of this kit.
- **Cross-links in the batch:** 37 (Kenya vs Meta) is the natural next video for "African courts taking on big tech", and could mention Kenya's Truecaller complaint. 15 (what happens when you send an API request) fits the lookup in Segment 3. 13 (HTTP status codes) and 14 (cookies vs localStorage) sit with the developer audience from Segment 7. 36 (US governments banning Chinese AI) is the other data-and-borders story.
- **News timing.** The judgment was 14 September 2026 and the coverage peaked in late September, so post this soon. The search title will keep it useful after the news fades.
- **Length call:** I kept the Europe block and the earlier-cases block, so it runs about 15 minutes. Both are clean optional cuts (see 2b) if you want it nearer 13.
- **Before recording,** open truecaller.com/unlisting on your phone to confirm the steps, since I couldn't load it this session.

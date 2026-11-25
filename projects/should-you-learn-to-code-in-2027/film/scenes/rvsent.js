/* learn-to-code: her sentences (her corrected words, talking-head/data/raw_words.json, in order, cut words left out).
 * Shared by the film (scenes/film.js) and the talking-head plan (talking-head/moments/plan.js). Raw times in the comments. */
'use strict';
const RV_SENT = {
"s0": "if you want to get into software development like right now the reality is that junior developer roles have just become very very very very rare",   // 0.40 If you want to get into software development, like right now
"s1": "in the first quarter of 2026 only 45 of software development job postings on indeed were entry level and i have a strong feeling that that number has even reduced",   // 9.52 I was checking and I was seeing this thing from Indeed's res
"s2": "i almost feel like junior software developer is becoming a role that just doesn't exist anymore",   // 27.09 I almost feel like junior software developer is becoming a r
"s3": "i think software development posting i was seeing that it has gone up a little bit",   // 32.46 I think software development post, and I was seeing that it 
"s4": "we found out that in the us they rose about 15 between february last year to june this year",   // 36.42 We found out that in the US, they rose about 15% between Feb
"s5": "so the job postings are mostly for senior roles",   // 42.02 So the job postings are mostly for senior roles.
"s6": "so maybe if you are learning how to code or you're trying to build actual software development skills",   // 46.70 So maybe you are learning how to code or you're trying to bu
"s7": "of course you can just vibe code",   // 51.42 Of course, you can just write code.
"s8": "but if you want to maybe properly just build software development skills in 2027 then this video is for you",   // 53.06 But if you want to maybe properly just build software develo
"s9": "because i know you're probably asking yourself and this is a very valid question to ask but is there even a point to doing that anymore",   // 60.06 Because I know you're probably asking yourself, and this is 
"s10": "i would say yes personally but of course you are not trying to learn how to code the same way people learned how to code three four years ago",   // 67.02 I would say yes, personally, but of course you are not tryin
"s11": "someone i know is really really interested in being a software developer right now",   // 75.26 Someone I know is really, really interested in being a softw
"s12": "and i don't even i was thinking about the advice to give them and that was even what led me to recording this video",   // 79.58 And I don't even, I was thinking about the advice to give th
"s13": "because at this point i would even say it was easier like when i started it was so easy",   // 84.65 because at this point, I would even say it was easier, like 
"s14": "now i'm realizing how easy it was because then i was like oh my god it was so hard",   // 90.58 Now I'm realizing how easy it was, because then I was like, 
"s15": "but now i'm like oh my god it was so easy",   // 94.60 When I'm like, "Oh my God, it was so easy."
"s16": "if you're a beginner right now i would say you should try of course with the realities and using ai tools and trying to do things but i would say if you focus on four things reading code debugging fundamentals with a little bit of system design and domain knowledge",   // 96.72 The beginner right now, I will say you should try, of course
"s17": "one of the skills that matter now is reading code",   // 110.72 One of the skills that matter now is reading code.
"s18": "ai would write a lot of code for you i swear",   // 112.77 AI would write a lot of code for you, I swear.
"s19": "everybody is using ai to write code i promise you that",   // 116.70 Everybody using AI to write code, I promise you that.
"s20": "and people are writing a lot of code these days that we are all not even reading",   // 119.40 And people are writing a lot of code these days that we are 
"s21": "but i would say reading code is a very very important skill right now",   // 123.82 But I will say reading code is a very, very important skill 
"s22": "reading code means that you can look back on whatever ai wrote and you can tell what it does and whether it's what you asked for",   // 127.64 Reading code means that you can look back on whatever AI wro
"s23": "and this is even interesting because you'd usually have to write code to even read code",   // 133.24 And this is even interesting because you're usually out to w
"s24": "but now i don't know i recommend it as a skill for anyone that is starting to build a career in software development right now",   // 138.56 But now, I don't know, I recommend it as a skill for anyone 
"s25": "the skill of reading code because a lot of code will be written and you need to learn how to read it if there's a need to read it",   // 145.84 The skill of reading code, because a lot of code will be wri
"s26": "the second skill that matters now more than ever is debugging",   // 152.60 The second skill that matters now more than ever is debuggin
"s27": "debugging means finding out why something is broken in your code",   // 155.48 Debugging means finding out why something is broken in your 
"s28": "say a user sign up on your app and the app crashes with this error",   // 158.36 Say a user sign up on your app and the app crashes with this
"s29": "ai is really good at debugging as well",   // 161.32 AI is really good at debugging as well.
"s30": "and i'm not even joking",   // 163.20 And I'm not even joking.
"s31": "but it doesn't always understand context sometimes",   // 164.48 But it doesn't always understand context sometimes.
"s32": "for example if i paste this into a model that is not so solid and i say fix this one easy fix it might give is to wrap the save in a trycatch",   // 167.08 For example, if I paste this into AI, maybe the model that i
"s33": "so the error is caught and the crash goes away",   // 175.84 So the error is caught and the crash goes away.
"s34": "so the page stops crashing right",   // 178.52 So the page stops crashing, right?
"s35": "but the user still isn't signed up",   // 180.36 But the user still isn't signed up.
"s36": "and yeah nobody can tell them why",   // 182.04 And yeah, nobody can tell them why.
"s37": "but if you can read the error yourself you can come to the conclusion that somebody with this email already has an account and the database is refusing to save a second one",   // 183.92 But if you can read the error yourself, you can come to the 
"s38": "so the real fix is to actually check for that and tell the user that the email is already taken",   // 192.04 So the real fix is to actually check for that and tell the user
"s39": "so debugging is a skill that gives you that bandwidth",   // 197.70 So debugging is a skill that gives you that bandwidth.
"s40": "when you use ai to code you are the human in the loop",   // 200.29 When you use AI to code, you add the human in the loop..
"s41": "and it would help a lot if you know how to debug",   // 204.04 And it would help a lot if you know how to debug.
"s42": "but you have to know enough to understand when a fix that ai gives you only hides the actual problem",   // 207.32 But you have to know enough to understand when the fix that 
"s43": "if you don't know how to debug you wouldn't know right",   // 212.68 If you don't know how to debug, you wouldn't know, right?
"s44": "and the third skill that matters now is the fundamentals and a little bit of system design",   // 215.00 The third skill that matters now is the fundamentals and a l
"s45": "fundamentals are basically about how the web works all the stuff underneath what happens when you send a request how does the database save your data",   // 218.88 Fundamentals are basically about how the web works, all the 
"s46": "system design is thinking about how all the parts of your app work together",   // 225.68 System design is thinking about how all the parts of your ap
"s47": "you know what can go wrong between these different parts",   // 230.12 What can go wrong between these different parts?
"s48": "where is your user data saved",   // 231.88 Where is your user data saved?
"s49": "how does it connect to what the user sees",   // 233.40 How does it connect to what the user sees?
"s50": "let's take a real example from payment",   // 235.88 Let's take a real example from payment.
"s51": "when a customer pays for an order on maybe an online shopping platform the payment provider sends your server a message to say that oh payment was successful",   // 237.92 When a customer pays for an order on maybe an online shoppin
"s52": "that message is called a webhook",   // 246.80 That message is called a webhook.
"s53": "many providers will send the webhook again if your server doesn't reply in time",   // 248.12 Many providers will send the webhook again if your server do
"s54": "so your app can receive the same payment successful message twice",   // 251.28 So your app can receive the same payment successful message 
"s55": "your code has to be ready for that",   // 254.32 Your code has to be ready for that.
"s56": "or else you could record a payment twice or send the customer's order twice right",   // 256.09 Or else you could record a payment twice, or send the custom
"s57": "so you kind of just need knowledge of these fundamentals or how everything works together",   // 261.76 So you kind of just need knowledge of these fundamentals or 
"s58": "another thing i would say is domain knowledge",   // 266.84 Another thing I would say is domain knowledge.
"s59": "that means understanding the area that your software is for",   // 269.40 That means understanding the area that your software is for.
"s60": "software can be for different kinds of things in health finance where i work i write code for a fleet management company",   // 272.36 Software can be for different kinds of things, in health, fi
"s61": "some people write code in finance some people write code in health in payments in logistics for school",   // 278.56 Some people write code in finance, some people write code in
"s62": "so say you're building a stock app for a pharmacy right",   // 282.84 So say you're building a stock app for your pharmacy, right?
"s63": "ai can write that stock app very quickly the pharmacy needs to sell the medicine that expires first before the newer stock right",   // 285.61 AI can write that stock app very quickly, but the pharmacy n
"s64": "and it needs to know which batch a product came from",   // 293.88 And it needs to know which batch a product came from.
"s65": "if you have the domain knowledge you would ask ai to build it but you also understand what is missing",   // 297.36 If you have the domain knowledge, you would ask AI to build 
"s66": "but if you do not have that domain knowledge you're still able to build your app with ai but the app is not solid enough for the pharmacy for example",   // 303.04 But if you do not have that domain knowledge, you're still a
"s67": "so whatever field you're in you need to establish domain knowledge in that field",   // 309.88 So whatever field you're in, you need to establish domain kn
"s68": "it's the reason why in companies they will always have some engineers that everybody goes to some people call them staff engineer a big part of what makes them so valuable is that they know the business well",   // 314.09 is the reason why in companies, they will always have some e
"s69": "so this is part of the domain knowledge that you have to build",   // 323.12 So this is part of the domain knowledge that you have to bui
"s70": "so i would say that if you want to learn how to code in 2027 of course you can learn faster way faster with ai",   // 325.68 So I would say that if you want to learn how to code in 2027
"s71": "i think it's still worth it",   // 332.56 I think it's still worth it.
"s72": "i just think you might need to focus on other things as opposed to like maybe learning syntax or learning how to write a for loop or stuff like that",   // 333.64 I just think you might need to focus on other things as oppo
"s73": "and i just don't think you should think of it as something that would give you a junior developer role",   // 340.48 And I just don't think you should think of it something that
"s74": "i don't think you should put so much trust in the fact that if you learn how to code you get a junior developer role right now",   // 345.12 I don't think you should put so much trust in the fact that 
"s75": "so i'll say try to build with ai first learn to work with it and then start to learn the rest like reading code like reading other people's code like debugging like the fundamentals a little bit of system design",   // 350.20 So I'll say try to build with AI first, learn to work with i
"s76": "there are a lot of free reliable places to learn these things from",   // 361.16 A lot of free reliable places to learn these things from.
"s77": "i'll try to add some links in the description box",   // 364.44 I'll try to add some links in the description box.
"s78": "there are just so many free reliable places to learn system design to learn fundamentals",   // 366.44 There are just so many free reliable places to learn system 
"s79": "so yeah i think you should actually commit to it",   // 372.04 So yeah, I think you should actually commit to it.
"s80": "i think just the learning itself it's so good for you but you also need to understand the reality of the market and the impact that ai has had on the market as well",   // 374.60 I think just the learning itself, it's so good for you, but 
"s81": "so if anybody is telling you that you learn how to code now you get a junior software developer role you have to think about it very well because i'm not sure that is a promise you can hold on to at least in this age and time",   // 383.56 So if anybody is telling you that you learn how to code now,
};

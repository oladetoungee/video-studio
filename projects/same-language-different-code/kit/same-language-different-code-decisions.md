# Same Language, Different Code: decisions from start to finish

This file is a handoff. It explains every decision behind the talk, in the order they were made, so a slide designer (person or agent) can build the deck without having been part of the conversation.

The source of truth for the words is the tab **"Øredev script (40 min) v2"** in the Claude doc "Same Language, Different Code: talk research". Every `[Slide: ...]` cue in that tab is a slide. The full slide list is at the end of this file.

---

## 1. The talk at a glance

| | |
|---|---|
| Title | Same Language, Different Code |
| Programme subtitle | How Moving from Nigeria to Estonia Rewired How I Build Software |
| Speaker | Gbemisola (Gbemi) Oladetoun |
| Event | Øredev 2026, Malmö, 4 to 6 November 2026 (her notes say Thursday morning, Ancestors track; confirm in the programme) |
| Slot | 40 minutes |
| Audience | Senior engineers and architects at a paid, expensive conference. They expect something solid they can use. |
| Thesis | Every system carries a hidden model of its environment. Write the environment down, derive decisions from it, and enforce those decisions in your pipeline. |
| Take-home model | The Environment Profile: six questions plus "forgiveness" |
| Structure | Opening, the model, three deep cases, fitness functions, close |

---

## 2. How we got here, decision by decision

### Step 1. Research first, talk second

We started with deep research on talks, books and podcasts about how users in different countries shape software architecture. That produced the raw material: Uber Lite, USSD, multi-region data residency (Rippling, Atlassian), the AWS European Sovereign Cloud, India's payment-data rule and Mastercard, M-Pesa in South Africa, time zones, money and identity rails.

YouTube-only ideas (USSD explainer, the AI tokenizer paper, Uber translations, a series on African fintech engineering) were parked in a separate video-ideas file and kept out of the talk.

### Step 2. The talk is not a personal story

Gbemi's instruction was clear. The talk must not be her story. The idea is the same language and stack meeting different assumptions when software moves between environments. It should read like a well-written book chapter in plain words.

**Later refinement (latest decision):** light, true references to her own work are welcome "here and there", but no failure story about a system she built. These are now in v2:

- In the opening, she says she worked for more than three years on LawyeredUp, a legal-tech product used mostly in Nigeria, South Africa and Botswana, and now works at FleetFox, a fleet care company in Estonia.
- In the forgiveness part of the model, there's the FleetFox AI car-wash quality check. It looks at a sample of one in five orders, which is fine because a wrong score is cheap and reviewable. Nobody would check one payment in five.
- In the data-laws case, there's one line: if you send customer photos to an AI model, as FleetFox does for car-wash checks, where that model runs belongs in the Jurisdiction row.

### Step 3. Study the best talks before writing

We studied the transcripts of all 13 talks in the Øredev 2025 Architecture track and six ffconf talks, which Gbemi loves. The audio was never played. We pulled transcripts only.

The findings that shaped everything after are below.

- Øredev architecture talks run about 35 to 44 minutes.
- The strong talks share eight habits.
  1. They stand on a real system.
  2. They name the scope early.
  3. They give the audience a model.
  4. They name trade-offs.
  5. They show failure honestly.
  6. They use numbers.
  7. They take their humour from the domain.
  8. They end with takeaways and a way to keep going, like a QR code and further reading.
- ffconf adds human stakes, and real output shown on stage.

### Step 4. The first script was rejected

The first full script (one hour, 18 parts) used the jollof opening, the 03:30 cron question, Uber Lite and leap days. The Mars Climate Orbiter was dropped at Gbemi's request.

Her verdict was that it was "YouTube quality, not international conference quality". It was a tour of many short examples, with no model and too little depth. Basics like UTC, Unicode and `0.1 + 0.2` taught this audience nothing new.

### Step 5. The rebuild: one model, three deep cases

| Decision | Why |
|---|---|
| 40 minutes | Matches the slot and the Øredev norm |
| One model, the Environment Profile | Strong talks give a model people can use on Monday |
| Three deep cases instead of many shallow ones | Depth is what a senior audience pays for |
| Case 3 is money and identity rails, not her own system | Gbemi chose "no own case" |
| Fitness functions as the practical ending | Turns every decision into a check that fails the build |
| Static slides, no live coding | Lower risk on stage |
| Out of the talk | Unicode and Turkish i demos, `0.1 + 0.2`, the AI tokenizer, WhatsApp commerce, EskomSePush, China's missing Google services |

### Step 6. The six questions are fixed wording

Gbemi specifically loved these questions and wants them used as written.

| Row | Question |
|---|---|
| Connectivity | How reliable and how expensive is the network for our users? |
| Devices | What hardware do our users actually hold? |
| Money rails | How fast and how reversible is settlement? |
| Identity rails | What do users already trust to prove who they are? |
| Jurisdiction | Which laws and promises decide where data lives and how failures are handled? |
| Load shape | Which real-world events make everyone arrive at once? |
| Forgiveness (under all six) | What have users here learned to tolerate, and what can't be undone? |

The test the audience should remember is to ask, for every row that differs between environments, whether the difference changes a setting or a decision.

### Step 7. A 60-minute version exists too

There's a 60-minute script in its own tab. It adds a fourth case on load shape and time (the Tatkal 10:00 booking wall, salary day, Azure's 2012 leap-day outage, Cloudflare's 2017 leap second), Estonia's data embassy, DORA, and a prepared Q&A. **The deck is for the 40-minute version.**

### Step 8. Lecture notes, then v2

Gbemi asked for lecture notes that teach her every step of the talk in depth. She then asked that the best of that depth come back into the talk, kept simple but more technical. That became v2.

- **The opening** is built from her own dictated read-through. Her words, order and jokes are kept. The jollof countries are Nigeria, Ghana and Senegal. Uganda was removed because it isn't part of the rivalry. The clock change is EU-wide, at 01:00 UTC on the last Sunday of March and October.
- **The thesis and profile intro** are nearly word for word from her dictation. That covers "every system carries a hidden model of its environment" and "99.9 percent quietly assumes a network, a payment system and a legal system".
- **The cases** now explain the mechanisms. These include MTU and round trips, partial failure, server-side idempotency keys, the dual-write problem and the outbox, the 4 × 4 × 4 = 64 retry storm, residency versus localisation versus sovereignty, AWS partitions, push versus pull payments, decoding an Estonian ID code, and SIM swap and number recycling.

### Step 9. Critique round, applied to v2

v2 was scored against the eight habits. Here's what changed.

| Problem | Fix in v2 |
|---|---|
| The model vanished after minute 7 | Each case now ends with its profile row "filled in". That shows the question, two answers, and the decisions each answer leads to. |
| Humour and interaction stopped after the opening | A second show of hands in Case 1 ("Who has a state that means 'we don't know yet'?"), a retry-storm joke, and a "same recipe, different kitchen" callback after M-Pesa |
| Too much code to read from a seat | The payment code went from 25 lines to 12. The checksum is now a worked sum. The time-zone code is now its three results. Full code goes on the QR page. |
| Case 3 had no trade-offs | Added the cost of pluggable identity |
| Title promises a personal journey | A short line linking her move to the "rewired" in the title |
| Running long | Three sections marked cuttable: "Three words people mix up", Atlassian, and "When not to do this" |

---

## 3. Voice and wording rules (for any text on slides)

- Use plain, everyday words and short sentences.
- No em dashes.
- No colon reveals ("Here's the thing: ...").
- Avoid "not X, it's Y" contrasts and stacked fragment lists. Write full sentences.
- Credit sources by name on the slide where their idea or example is used. That covers Uber, Alex Strachan (Rippling, QCon SF 2023), Atlassian, AWS, Martin Gunnarsson (Parkster, Øredev 2025), Christian Fredriksson and Henrik Lindström (Volvo Cars, Øredev 2025), Werner Vogels, Marc Brooker, Stripe, Bryan Cantrill, Neal Ford, Rebecca Parsons and Patrick Kua, and Shopify (Toxiproxy).
- Don't overstate. Phrases like "Stripe puts it at", "AWS says", "about 500 ms at P90" and "around 76,000" are deliberate. Keep them as written.

---

## 4. Design guidance for the deck

These come from the critique and from what worked in the talks we studied.

1. **One idea per slide.** Most slides are a short phrase, a number, or a simple diagram. The speaker carries the words.
2. **Big numbers get their own slide.** Examples are 56%, 46 million and 33% (Uber Lite), 4 × 4 × 4 = 64, July 2021 to June 2022, and 10 million against 76,000.
3. **The Environment Profile is a recurring visual.** Design one table (six rows plus Forgiveness under a line) and reuse it.
   - It's revealed row by row in the model section.
   - It returns with one row highlighted and "filled in" at the end of each case. Those are the Connectivity row, the Jurisdiction row, and the Money and Identity rows.
   - Its blank version goes behind the QR code.
4. **Code is short and readable from row 15.**
   - The payment code is the longest at 12 lines. Highlight the key line (`const key = payment.idempotencyKey`).
   - Other code slides are the routing function, three Toxiproxy commands, and one `expect(...)` line.
   - Use a large monospace font, high contrast, and no scrolling.
5. **Diagrams to draw**
   - The payment state machine: CREATED to SENT, then PAID, FAILED or UNKNOWN, with UNKNOWN going to RECONCILING and ending in PAID or FAILED.
   - The same state machine for push payments, with AWAITING_CUSTOMER and EXPIRED added in a different colour.
   - The outbox: one transaction writing two rows, then a relay sending to the provider.
   - A to B to C retries.
   - Routing by company ID at the gateway.
   - Copy, check, switch, keep, delete.
   - The AWS partitions as four separate boxes.
6. **The two timestamps slide** (00:30 UTC shows 03:30 EEST, 01:30 UTC shows 03:30 EET) appears in the opening and again in the close, next to the jollof photo.
7. **The jollof photo** opens the talk and returns at the close. Use a real, licensed photo, not a drawing of a branded dish.
8. **The QR slide** links to the Environment Profile template, every source, and the full code. That page still needs to be made.
9. **Timing markers** like `[Timing check]` and `[Cuttable]` are speaker notes, not slide content. Put them in the presenter notes.

---

## 5. Full slide list for the 40-minute v2 script

In order, as written in the `[Slide: ...]` cues. Items marked *(no cue yet)* are moments that would benefit from a slide but don't have one in the script.

**Opening**
1. A photo of a plate of jollof rice.
2. A terminal showing the crontab line `30 3 * * *`.
3. Two timestamps. 00:30 UTC shows 03:30 EEST. 01:30 UTC shows 03:30 EET.
4. *(no cue yet)* Speaker credibility. LawyeredUp (Nigeria, South Africa, Botswana) and FleetFox (Estonia).
5. "Every system carries a hidden model of its environment."

**The Environment Profile**

6. "The Environment Profile".
7. The six rows revealed one at a time, using the questions in section 2, step 6.
8. The six rows, then a line, then a seventh row called Forgiveness.
9. *(no cue yet)* The FleetFox car-wash sample (one in five orders) next to "you can't check one payment in five".
10. The table with two columns, "Where we built it" and "Where it's going".
11. Three examples sorted into Setting and Decision.

**Case 1: Connectivity**

12. "Engineering Uber Lite", Uber Engineering blog, 2019.
13. Three numbers. 56%. 46 million. 33%.
14. The decisions, revealed one at a time.
15. Three words. YES. NO. I DON'T KNOW.
16. "Does your system have a state for 'we don't know yet'?" (show of hands).
17. The payment state machine.
18. The client code (12 lines).
19. The server's key table. key, request hash, status, stored response.
20. The outbox diagram.
21. A scheduled job matching UNKNOWN payments against the provider's settlement report.
22. A feature phone screen with a short numbered menu (USSD).
23. A calls B calls C. 4 × 4 × 4 = 64.
24. Four defences.
25. AWS us-east-1, October 2025.
26. "Offline-first has a price." *(cuttable)*
27. The Connectivity row, filled in.

**Case 2: Jurisdiction**

28. Residency. Localisation. Sovereignty. *(cuttable)*
29. April 2018. Reserve Bank of India. "Storage of payment system data".
30. July 2021 to June 2022, as a bar.
31. "The atom". Alex Strachan, QCon San Francisco 2023.
32. The routing code.
33. Copy, check, switch, keep, delete. *(Atlassian, cuttable)*
34. aws. aws-cn. aws-us-gov. aws-eusc.
35. Volvo Cars, "10 years of Kafka", Øredev 2025.
36. The bill, as a list, including the side doors (logs, error trackers, analytics, backups, support tools, AI APIs).
37. The Jurisdiction row, filled in.

**Case 3: Money and identity rails**

38. Authorise. Capture. Settle. Reverse.
39. Four rails. Card. UPI. Pix. OXXO.
40. The state machine with AWAITING_CUSTOMER and EXPIRED.
41. `{ amountMinor: 1000, currency }` gives EUR 10.00, JPY 1000 and KWD 1.000.
42. 3 760503 029 9 (the Estonian ID code split into its parts).
43. The worked checksum. 3×1 + 7×2 + ... = 108. 108 mod 11 = 9.
44. Nigeria. Phone number plus SMS code. BVN, 11 digits.
45. IdentityProvider returns subjectId, method, and assurance (low, substantial, high).
46. A target of 10 million users. 76,000 active users.
47. The Money rails and Identity rails rows, filled in.

**Fitness functions**

48. The fitness-function definition quote, *Building Evolutionary Architectures*.
49. Toxiproxy commands.
50. Three results. Tallinn on 25 October, 03:30 found twice. Tallinn on 29 March, never. Lagos, once.
51. A CI check failing with "bucket payroll-exports: data class REGIONAL, region us-east-1, not allowed for atom group EU".
52. Three budgets. App size. Response size. Requests per screen.
53. "Too strict" and "too loose", side by side.

**Close**

54. Three takeaways.
55. QR code. "Environment Profile template and every source from this talk."
56. The jollof photo again, next to the two timestamps.
57. Further reading.
58. Name, handles, "Find me at the speaker corner".

---

## 6. Facts still to verify before the talk

These are the claims most likely to be questioned. They're attributed carefully in the script, but check them against their sources before they go on slides.

- Stripe's figures for UPI (more than 80 percent of online domestic payments in India) and Pix (more than 40 percent of online payments in Brazil).
- M-Pesa South Africa: the 10 million target, around 76,000 active users, shut down on 30 June 2016.
- The description of operator SIM-change APIs.
- The AWS October 2025 outage summary link.
- The FleetFox and LawyeredUp lines, which Gbemi should confirm are worded the way she'd say them.

## 7. Where everything lives

All of these are tabs in the Claude doc "Same Language, Different Code: talk research". Each tab can be downloaded from the doc as Markdown, Word or PDF.

| Tab | Use |
|---|---|
| Øredev script (40 min) v2 | **The final script. Build the deck from this.** |
| Critique of v2 | Why v2 looks the way it does |
| Lecture notes (40 min) | Deep explanations for the speaker, not for slides |
| Øredev script (40 min) | The earlier version of the 40-minute script, kept for reference |
| Øredev script (60 min) | The longer version with Case 4 and Q&A |
| Conference standard | The talks studied, the eight habits, the Environment Profile table |
| The script, The one-hour talk, Great talks, main tab | Earlier research and drafts. Not needed for the deck. |

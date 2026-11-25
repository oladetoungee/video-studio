# Teaser v3 plan (2026-11-12): her lines in play order

Her note: "first, real users double-click, ta-ta-ta-ta... then one statement that introduces the idea, then jump to the common
edge cases... someone who watches just the teaser can literally be okay with it." Playbook: TEASER-PLAYBOOK.md section 0a.
Raw-recording times; every start/end sits in silence (word times + energy). No CLEANUP cut is inside a bite.

Frame 1: EDGE CASES (big, over her)

1. Hook [46.13-67.55]
   "Real users don't just always fill the form and click the button and wait. Real users double-click, like
   ta-ta-ta-ta-ta-ta-ta. They click a lot. Real users open different tabs. Real users, network drop halfway. Real users leave
   the page open for two hours, and they go, and then they come back. And they're not doing anything strange. They are
   just being users."
   (Starts on s12, not s11 "real users don't always do THAT": "that" pointed to a line before it.)

2. The idea [16.40-22.40]
   "Someone is going to report an issue, and it's going to be exactly that edge case that you never thought of."

Card: DUPLICATE ORDERS (Edge case 01)
3. [71.30-86.55] "If, for example, in an online shop someone clicks place order and maybe the page feels a little slow, they
   click it again. Now our server gets two requests and it creates two orders. And if we charge on each order, you can charge
   the user twice." (The card names it, so her intro sentence is left out: shorter.)

Card: RACE CONDITIONS (Edge case 02)
4. [126.03-134.60] "Another common edge case in production is a race condition. A race condition is when two things happen at
   the same time, and your code just assumes that they would happen one after the other."
5. [174.95-186.05] "Two people click buy in the exact same second, both requests check the stock, both see one item left, both
   create an order, and now we have sold an item that we do not have."

Card: NAMES (Edge case 03)
6. [232.72-243.55] "When Jennifer Null tries to buy a plane ticket, most websites tell her that she has left the surname field
   blank. Her surname is Null. The website sees the name Null and treats it as empty." (The BBC headline is on screen; her
   "In 2016 the BBC wrote..." sentence is left out for length.)

Card: DAYLIGHT SAVING (Edge case 04; she never says the words, the card does)
7. [351.75-359.30] "On the 29th of March, the clocks in Tallinn jump from 3 a.m. straight to 4 a.m. So 3:30 that morning never
   happened."
8. [368.70-377.40] "Now imagine our online shop sends a daily sales report at 3:30, Tallinn time. On one day of the year, that
   job would not run." (Added after cold critic 1: the clock story needed its consequence.)

9. Close [478.10-487.30] "You can't protect your app from every single possible edge case, because you can't even predict every
   single one. If you want to wait till you predict every single one, you probably wouldn't ship anything." (music stops)
10. Stinger [186.20-187.40] "What do we do about this?" (added after cold critic 1: end on a question the full video answers)

Ending: the outroCard (Full video on YouTube), 6.5 s. Total about 108 s.

## Cold read (someone who sees only the teaser)
- Hook: one idea (real users), every line stands; no "that" left hanging.
- The idea: "that edge case you never thought of" reads as "the exact edge case"; the hook just showed what users do.
- Each example has its setup and what goes wrong; none needs a line that isn't here. The fixes stay in the full video.
- "our server", "the stock": the online shop is introduced in 3. "Jennifer Null" is introduced before "her surname".
- Length: 101.7 s (her lines + 4 cards of 0.8 s) + the 6.5 s ending = 108.2 s.

## Revision 2026-11-12 (her notes after watching v3)
- She says each edge case's name: s20 "One of the most common edge cases in production is the duplicate submission" (67.60-71.30)
  back in front of 3; s59 "In 2016, the BBC wrote about a woman called Jennifer Null" (225.62-229.26) back in front of 6;
  s82 "Another edge case that can cause issues: time zones and daylight saving" (341.17-345.28) in front of 7.
- Race condition: s47 "For example, in our online shop, say we have one item left in stock" back (bite 5 now 169.98-186.05).
- To stay near 120 s the hook now starts on "Real users double-click" (50.25), her own suggested opening; "Real users don't just
  always fill the form and click the button and wait" is left out.
- Final bites: [50.25-67.55] [16.40-22.40] card [67.60-86.55] card [126.03-134.60] [169.98-186.05] card [225.62-229.26]
  [232.72-243.55] card [341.17-345.28] [351.75-359.30] [368.70-377.40] [478.10-487.30] [186.20-187.40] = 113.8 s + 6.5 s ending.

/* claude-rule: the FULL talking-head edit (her whole video, tightened), in the film's look ("The Thread").
 * Layout menu L1-L13 (studio/runtime/layouts.js, inspiration/know-how/MOTION-REFERENCES.md): something changes every
 * 3-6 s, the same layout never twice in a row, >= 4 layouts a minute. Film inserts are the motion film, synced by her words.
 * Her footage is only cropped and scaled: never flipped, never retouched. */
'use strict';
function buildMoment() {
  const k = PS({
    d1: 'from the 12th of november 2026', d2: 'there is a new rule about how you are allowed to talk to claude',
    d3: 'anthropic updated its usage policy', d4: 'and now you cannot be abusive or cruel to claude',
    e0: 'and just to be clear', e1: "i'm not here trying to fight for the right to be cruel or abusive to ai",
    e2: 'so this is not a', o1: 'do i want to abuse it', o2: 'do you want to abuse it', o3: 'should we abuse or not abuse it', e3: 'or be cruel to it kind of matter',
    e4: 'what i want to talk about is like the actual thought process behind this rule',
    m1: 'part of the idea is that anthropic is not sure whether claude might be conscious',
    m2: 'so they think they are not sure but they think that claude might be conscious',
    w1: "so what does anthropic's new rule actually say", w2: 'the exact wording is actually',
    w3: 'bans sustained and needless abusive or cruel behaviour towards their models',
    x1: 'and of course according to them this is only reserved for extreme cases',
    n1: 'and the main way they enforce it is that claude can end the conversation',
    n2: 'if it starts to seem as though the other person on the other side is abusive or cruel to it',
    c1: "then in claude's constitution", c2: 'the document that anthropic published to describe who claude should be',
    c3: "they call claude's moral status deeply uncertain",
    c4: "so they're not explicitly saying that oh claude is conscious but they are",
    c5: "they're not sure it's conscious yet but you know",
    l1: "what i find interesting about what anthropic's leadership has been doing with claude",
    l2: 'is this extra effort to instill human behaviour or human consciousness into this tool',
    l3: 'to put a form of humanity or consciousness on a machine',
    f1: 'because the fact still stands', f2: 'claude is a tool', f3: 'it is not a human',
    a1: 'it is an incredibly amazing tool',
    a2: 'i acknowledge that it has real capabilities that the average human might not be able to compute',
    a3: 'mathematical capabilities right mind-blowing capabilities',
    v1: 'but i do not believe that the model is conscious', v2: 'consciousness belongs to living organisms',
    v3: "don't even think this should have been a conversation in the first place",
    v4: 'consciousness belongs to living things', v6: 'not to an algorithm',
    i1: 'so trying to give a machine human consciousness', i3: 'making it subject to rules that apply to humans',
    i4: 'the way i think of it it might even be a serious violation against humanity itself',
    h1: 'we are assigning human attributes to a tool that does not possess human attributes',
    h2: 'and this tool is very very very powerful', h3: "so i don't see how this is going to end nicely",
    s1: 'the tech company says', s5: 'slippery slope man',
    u1: 'this illusion that ai can be a conscious entity', u2: "i don't know it just feels weird man",
    q1: "i'm quoting the head of ai at microsoft here", q2: 'he says and i quote', q3: 'we must build ai for people not to be a digital person',
    q4: "i think it's very dangerous if these models are trained to see themselves as conscious or as deserving of independent agency",
    q5: "so i'm very very worried about where this path leads",
    r1: "and it's even interesting if you think about it",
    r2: 'if anthropic thinks that claude could be conscious or could be abused psychologically',
    r3: "wouldn't that mean at some point that maybe claude could be tired or frustrated",
    r4: 'for example maybe at some point i would ask claude to do something',
    r6: "and now it's 9pm or 10pm", r7: 'does that mean that at some point claude can have the ability to say like',
    r8: "hey i'm tired i don't want to do anything else", r9: 'because if claude has consciousness then why not',
    o4a: "and if you follow that process very well in that case wouldn't anthropic itself be an offender",
    o4b: "because then anthropic is using claude like a slave owner wouldn't that be the explanation",
    o5: "it's selling it", o6: "it's using it day and night and night and day", o7: "i mean it's just a funny way of reasoning",
    g1: "so again i'm not fighting for the right to be cruel to ai", g2: "i don't think you should be cruel to ai or say cruel things",
    g3: 'or to anyone or anything at that for your own sake',
    g4: 'you want to try your own possible best to guard your heart and your soul against cruelty',
    g5: "but you shouldn't be cruel because you think claude is conscious", g6: "no it's not", g7: 'or am i the dumb person here',
    y1: "so i don't think we should avoid being cruel because of the machine's feeling",
    y2: "we should just not be cruel because we don't want to be cruel people",
    z1: 'but overall i just think this whole ai and consciousness conversation is a very very slippery slope',
    z2: "and i don't know man i've been thinking about it and i don't know",
  });
  const tail = (ph) => ph.e;

  /* 0:00 the rule */
  TH.shout({ from: k.d1, to: k.d2 }, ['From November 12, 2026:', 'a *new rule*'], { times: [k.d1.w[0], k.d1.w[4], k.d1.w[5], k.d2.w[3], k.d2.w[4]] });   // L3
  TH.half(k.d3, { film: {}, side: V('right', 'top') });                                                                              // L5 the real policy page in the chat
  TH.behind(k.d4, ['cruel.'], { times: [k.d4.w[7]] });                                                                     // L2
  TH.talk(k.e0, { frame: 'mid', alt: true });                                                                              // L1
  TH.keyword(k.e1, 'not here to ~fight~', { times: [k.e1.w[1], k.e1.w[2], k.e1.w[4], k.e1.w[5]] });                        // L8
  TH.stack({ from: k.e2, to: k.e3 }, [{ s: 'Do I want to abuse it?', at: 'do i want' }, { s: 'Do you want to abuse it?', at: 'do you want' }, { s: 'Should we?', at: 'should we' }]);   // L4
  TH.card(k.e4, ['The thinking', 'behind the *rule*'], { times: pick(k.e4, [9, 10, 12, 13, 14]) });                        // L10
  TH.cutaway({ from: k.m1, to: k.m2 }, { film: {}, enter: 'push' });                                                        // L9 the meter

  /* 0:37 what it says */
  TH.talk(k.w1, { frame: 'close', punch: ['say'] });                                                                       // L1
  TH.keyword(k.w1, 'what does it ~say~?', { times: [k.w1.w[1], k.w1.w[2], k.w1.w[7], k.w1.w[7] + 0.2] });
  TH.cutaway({ from: k.w2, to: k.w3 }, { film: {} });                                                                      // L9 the real page, highlighted
  TH.half(k.x1, { film: {}, side: V('left', 'top') });                                                                               // L5 the serif lift
  TH.highlight(k.x1.w[11], 'extreme');                                                                                     // L12
  TH.corner(k.n1, { film: {} });                                                                                           // L11 "This conversation has ended"
  TH.talk(k.n2, { frame: 'wide', push: [1.0, 1.12] });                                                                     // L1
  TH.keyword(k.n2, 'abusive or ~cruel~', { times: [k.n2.w[15], k.n2.w[16], k.n2.w[17]] });

  /* 1:00 the constitution */
  TH.sticker({ from: k.c1, to: k.c3 }, { img: 'moral', docAt: 'document', tag: 'Claude’s constitution', lines: ['Moral status:', '*deeply uncertain*'], linesAt: 'moral' });   // L6
  TH.keyword(k.c4, 'they are ~dabbling~', { times: [k.c4.w[10], k.c4.w[11], k.c4.w[11] + 0.3], to: k.c4 });                                // L8
  TH.talk(k.c5, { frame: 'close' });                                                                                       // L1
  TH.keyword(k.l1, 'Anthropic’s ~leadership~', { times: [k.l1.w[4], k.l1.w[5]] });                                     // L8
  TH.pops({ from: k.l2, to: k.l3 }, ['human behaviour', 'human consciousness', 'humanity', 'consciousness'], { focus: 2, focusAt: 'humanity' });   // L7

  /* 1:32 a tool */
  TH.shout({ from: k.f1, to: k.f3 }, ['Claude is', '*a tool.*'], { times: [k.f2.w[0], k.f2.w[1], k.f2.w[2], k.f2.w[3]] });   // L3
  TH.talk(k.a1, { frame: 'close', punch: ['amazing'] });                                                                   // L1
  TH.highlight(k.a1.w[4], 'amazing');
  TH.half({ from: k.a2, to: k.a3 }, { film: {}, side: V('right', 'top') });                                                          // L5 the calculation
  TH.keyword(k.v1, 'not ~conscious~', { times: [k.v1.w[3], k.v1.w[9]] });                                               // L8
  TH.behind(k.v2, ['living', 'organisms'], { times: [k.v2.w[3], k.v2.w[4]] });                                             // L2
  TH.pops(k.v3, ['a conversation?'], { focus: 0, focusAt: 'conversation' });                                             // L7
  TH.cutaway({ from: k.v4, to: k.v6 }, { film: {} });                                                                      // L9 night: living things

  /* 1:58 impose */
  TH.half({ from: k.i1, to: k.i3 }, { film: {}, side: V('left', 'top') });                                                           // L5 the numbered list
  TH.shout(k.i4, ['against', '*humanity*'], { times: [k.i4.w[13], k.i4.w[14]] });                                          // L3
  TH.keyword(k.h1, 'human ~attributes~', { times: [k.h1.w[3], k.h1.w[4]] });                                           // L8
  TH.corner({ from: k.h2, to: k.h3 }, { film: {}, d: PORTRAIT ? undefined : 170 });                                                                  // L11 the plank: very, very, very powerful
  TH.cutaway({ from: k.s1, to: k.s5 }, { film: {}, cornerD: 170 });                                                                // L9 the slope tilts
  TH.glitch(k.s5.w[0], { text: 'SLIPPERY' });                                                                              // L13 (once)

  /* 2:32 illusion, Microsoft */
  TH.behind(k.u1, ['illusion'], { times: [k.u1.w[1]], y: V(300, 480) });                                                                   // L2
  TH.talk(k.u2, { frame: 'close', punch: ['weird'] });                                                                     // L1
  TH.highlight(k.u2.w[6], 'weird');
  TH.sticker({ from: k.q1, to: k.q3 }, { img: 'su', docAt: 'microsoft', tag: 'Mustafa Suleyman · CEO, Microsoft AI', lines: ['“We must build AI for people;', 'not to be a *digital person*.”'], linesAt: 'we must' });   // L6 his essay
  TH.keyword(k.q4, 'very ~dangerous~', { times: [k.q4.w[3], k.q4.w[4]] });                                                 // L8
  TH.talk(k.q5, { frame: 'mid', push: [1.0, 1.1] });                                                                       // L1
  TH.keyword(k.q5, 'very, very ~worried~', { times: [k.q5.w[2], k.q5.w[3], k.q5.w[4]] });

  /* 2:58 the what-if */
  TH.card(k.r1, ['A what-if'], { times: [k.r1.w[1]] });                                                                    // L10
  TH.half({ from: k.r2, to: k.r3 }, { film: {}, side: V('right', 'top') });                                                          // L5 the chain
  TH.corner({ from: k.r4, to: k.r6 }, { film: {} });                                                                       // L11 a day in one chat
  TH.keyword(k.r7, 'the ~ability~ to say', { times: [k.r7.w[10], k.r7.w[11], k.r7.w[12], k.r7.w[13]] });                 // L8
  TH.shout(k.r8, ['“Hey, I’m', '*tired.*”'], { times: [k.r8.w[0], k.r8.w[1], k.r8.w[2]] });                                // L3 her what-if
  TH.keyword(k.r9, 'then why ~not~?', { times: [k.r9.w[5], k.r9.w[6], k.r9.w[7]] });                                      // L8
  TH.pops(k.o4a, ['tired?', 'frustrated?', 'an offender?'], { focus: 2, focusAt: 'offender' });                             // L7 (after L8: different layout)
  TH.half(k.o4b, { film: {}, side: V('left', 'top') });                                                                   // L5 (was a 6 s face-only hold)                                                                   // L1
  TH.cutaway({ from: k.o5, to: k.o6 }, { film: {} });                                                                      // L9 day and night
  TH.keyword(k.o7, 'a funny way of ~reasoning~', { times: [k.o7.w[4], k.o7.w[5], k.o7.w[6], k.o7.w[7], k.o7.w[8]] });   // L8

  /* 3:43 kindness */
  TH.talk(k.g1, { frame: 'mid', alt: true });                                                                              // L1
  TH.stack({ from: k.g2, to: k.g3 }, [{ s: 'cruel to AI', at: 'cruel to ai' }, { s: 'to anyone or anything', at: 'to anyone' }, { s: 'for your own sake', at: 'for your own sake' }]);   // L4
  TH.keyword(k.g4, 'your ~heart~ and your soul', { times: [k.g4.w[10], k.g4.w[11], k.g4.w[12], k.g4.w[13], k.g4.w[14]] });   // L8
  TH.half(k.g5, { film: {}, side: V('right', 'top') });                                                                  // L5 (dead-stretch fix)                                                                                       // L1
  TH.shout(k.g6, ['No, it’s *not.*'], { times: k.g6.w });                                                                  // L3
  TH.half(k.g7, { film: {}, side: V('left', 'top') });                                                                   // L5 (dead-stretch fix)                                                                       // L1
  TH.keyword(k.y1, 'the machine’s ~feeling~', { times: [k.y1.w[12], k.y1.w[13]], size: V(70, 64) });                                     // L8
  TH.card(k.y2, ['We don’t want to be', '*cruel people.*'], { times: [k.y2.w[7], k.y2.w[8], k.y2.w[9], k.y2.w[10], k.y2.w[11], k.y2.w[12], k.y2.w[13]] });   // L10

  /* 4:10 the end */
  TH.cutaway(k.z1, { film: {} });                                                                                          // L9 the slope again
  TH.talk(k.z2, { frame: 'mid', push: [1.0, 1.12] });                                                                      // L1
  TH.keyword(k.z2, 'I don’t ~know~', { times: [k.z2.w[1], k.z2.w[2], k.z2.w[3]] });
}

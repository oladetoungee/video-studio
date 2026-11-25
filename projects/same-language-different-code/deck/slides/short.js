/* VERSION 2 · SHORT TALK
   The short version is the full deck with some slides left out and some scripts shortened.
   Every other slide (and every fix to it) is shared with version 1.
   cut: true      → slide is not in the short version
   notes: `...`   → shorter script for the short version (keep the same number of [click] marks)
   replace: [[a, b]] → swap text a for b in this slide's script and on the slide */
window.SHORT = {
  // about-me is slide 2, right after the title (her call, 4 Nov)
  'about-me': {
    replace: [['Before we start, a little about me.', 'Hi everyone. Before we start, a little about me.']],
  },
  'jollof': { cut: true },
  'jollof-war': { cut: true },
  'ingredients': { cut: true },
  'code-same': { cut: true },

  'crontab': {
    replace: [['Hands up if you\'ve ever scheduled a job', 'So, I want to start with a question.\nHands up if you\'ve ever scheduled a job']],
  },
  'lagos-clock': {
    replace: [['but a different kitchen, a different environment.', 'but a different environment.']],
  },
  'two-kitchens': {
    replace: [['Right. Now, I\'ve cooked in both kitchens.', 'Now, I\'ve built software in both places.'],
              ['>I\'ve cooked in both kitchens<', '>I\'ve built in both places<']],
  },
  'not-i18n': {
    notes: `So again, this is not an internationalisation talk. I'm not going to tell you to use UTC, or Unicode, or a translation library. You already know that.
[click] This is an architecture talk. It's about the environment your users live in, their network, their money, their identity systems, their laws. And how that environment should change the shape of your system.
And I have a model for that, one I've built and used over the past year, and we'll go deep into real stories with it.`,
  },

  'profile-reveal': {
    notes: `Now I'll go over the rows very quickly, before we pick up each of them.
[click] The first one is connectivity. How reliable and how expensive is the network for our users? "Expensive" is there on purpose. In a lot of the world, every megabyte your app downloads is money out of the user's pocket.
[click] Number two is devices. What hardware do our users actually hold? Not the phone we think is the norm. Old phones have less memory, slower processors, and storage that's already full.
[click] The third one is money rails. How fast and how reversible is settlement? Cards, instant bank transfers, mobile money and cash all behave differently.
[click] The fourth one is identity rails. What do users already trust to prove who they are? In some countries it's a government digital ID. In others, it's a phone number and a code sent by SMS.
[click] The fifth row is jurisdiction. Which laws and promises decide where data lives, and how failures are handled? "Promises" is intentional, because a lot of these rules come from contracts with your customers.
[click] And the last one is forgiveness. What have users here learned to tolerate, and what can't be undone? The same bug can be minor in one environment and unforgivable in another. At my workplace, an AI model checks one car wash in five, and that's fine. But I can't check one payment in five.`,
  },
  'cantrill': { cut: true },
  'values-places': { cut: true },
  'plus-yours': {
    notes: `Now, I have six rows here, from my experience of building products on one continent and then moving to build them on another. But it's not a complete list. Take it home, add your own rows, and remove what doesn't work for you.
And the quickest way to fill in a row is someone on your team who has lived there. That's a big part of why teams with developers from different places build more resilient software.
Even as of this morning, I was thinking that perhaps I need to add accessibility to the list. But I made a decision not to edit my slides. [let them laugh]
So yeah, let's go deep.`,
  },

  'd2-mtu': {
    notes: `The next decision: every network response has to fit into one packet. Under one MTU, which is the biggest packet a network link carries in one go. On Ethernet, that's 1,500 bytes.
[click] Because if a response needs ten packets and one of them gets lost, TCP has to resend it and wait. And on a weak mobile network, that's not good news.`,
  },
  'ussd': {
    notes: `Now, does anybody here remember USSD? [wait for hands] [if someone does: Okay, and when were you born?]
If you're Nigerian or Kenyan, you definitely know it. You dial a short code like *123#, and a little text menu pops up. It works on any phone, even with no data plan. That's how I used to buy data back home, and in Nigeria, Kenya and Rwanda it's still how a lot of people bank and send mobile money.
[click] Every step goes from the mobile operator to your server, and the session times out quickly.`,
  },
  'ussd-session': {
    notes: `So here's the design problem. The user confirms "send 5,000 naira", and the session drops before your server answers.
[click] They dial again. What should happen? [pause]
[click] The good design creates the transaction, with its own ID, the moment the user confirms. When they dial again, your server first looks for a recent transaction from that phone number, and the first screen says "Your transfer of 5,000 naira is being processed".
So the user sees the truth, and nobody sends money twice.`,
  },
  'vogels': { cut: true },
  'd3-roundtrips': {
    notes: `Decision three: one request per screen, on a connection that's already open.
Because on a poor network, every new connection costs round trips before any data moves, and each one can take hundreds of milliseconds.`,
  },

  // Jurisdiction: one idea from the Strachan talk, no definitions slide, no side doors, no summary
  'three-words': { cut: true },
  'atom-source': {
    replace: [['and I want to take two ideas from it.\nThe first idea is the atom.', 'and I want to take one idea from it. The atom.']],
  },
  'routing-code': { cut: true },
  'side-doors': { cut: true },
  'jurisdiction-filled': { cut: true },

  // Money and identity: money ends on the three rails; identity ends on a question, no solutions
  'state-machine': { cut: true },
  'sim-defences': { cut: true },
  'identity-provider': { cut: true },
  'identity-cost': { cut: true },

  'test-title': {
    notes: `Now, a few practical tips. Beyond the Uber decisions we already saw, here's how you test for your users.`,
  },
  'toxiproxy-idea': {
    notes: `For connectivity, test on your users' network. Shopify built an open-source tool called Toxiproxy. It sits between your service and the things it depends on, in your tests.
It adds latency, limits bandwidth and cuts connections, until the network looks like your users' network. Then you check that the screens still load and that nobody gets charged twice.`,
  },
  'toxiproxy-cmds': {
    notes: `(Let the commands type out, about ten seconds, then move on. No need to talk here.)`,
  },
  'budgets': { cut: true },
  'toxiproxy-checks': { cut: true },
  'kept-unlearned': {
    replace: [['Identity behind one interface', 'Strong identity checks']],
    notes: `So, looking back, some of what I learned in Nigeria travelled with me. Small responses, safe retries, testing on a bad network. That works everywhere.
Some things travel the other way. Estonia taught me to know exactly where my data lives, and to take identity checks seriously.
And some things stay where they are, like the phone number as identity, or clocks that change twice a year.
It goes both ways. Some things I built for back home, I don't need here. And some things I build here, I never had to think about back home. The Environment Profile is how I tell the difference.`,
  },

  // The close: one QR slide carries the three things to take home
  'takeaways': { cut: true },
  'profile-final': { cut: true },
  'qr': {
    notes: `So, I want you to take three things home with you.
The first one is to write the Environment Profile down. Six rows, for where you built your system and for where it's going. And for every row that's different, ask whether it changes a setting or a decision.
The second one is to test it for your users. Their network, their clocks, their laws and their phones.
And the third one is to keep researching. This list isn't complete, and every environment is different.
I didn't see the hidden model in my own code until my environment changed. You don't have to move countries to see yours. You just have to write it down.
The slides from this talk are behind this QR code, with the Environment Profile and every source I used today. They're yours to keep.`,
  },
  'reading': {
    notes: `If you want to go further on this topic, these are the resources I'd suggest.`,
  },
  'name': { cut: true },
};

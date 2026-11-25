# Paystack vs Flutterwave (2026): Content Kit
**A side-by-side of Paystack and Flutterwave for a business in Nigeria, built from their official pricing pages, support pages and developer docs, as of October 2026.**
**The script is your 27 October read-through, cleaned up. It walks through what each one charges, the same dress orders on both, selling outside Nigeria, payouts, signing up with or without CAC, the four developer steps, and which one to pick.**
**Every segment names its topic in its first lines, so any of them can be cut into a clip.**

---

## TAG POOL (66 tags, every tag used anywhere in this kit, deduplicated)

paystack vs flutterwave, paystack vs flutterwave 2026, paystack vs flutterwave fees, paystack vs flutterwave which is better, paystack or flutterwave, best payment gateway in nigeria, payment gateway nigeria, paystack fees, flutterwave fees, paystack charges nigeria, flutterwave charges nigeria, paystack vs flutterwave for developers, paystack integration, flutterwave integration, paystack webhook, flutterwave webhook, accept payments in nigeria, online payments nigeria, paystack starter business, flutterwave starter business, cac registration payment gateway, paystack settlement, flutterwave settlement, how to choose a payment gateway, payment gateway comparison, cheapest payment gateway nigeria, paystack transfer fees, flutterwave transfer fees, what is a payment gateway, paystack pricing 2026, flutterwave pricing 2026, paystack vs flutterwave 2027, fintech nigeria, nigerian developers, gbemisola oladetoun, withgbemi, paystack fee cap, accept payments without cac, how payment gateway integration works, paystack payment flow, x-paystack-signature, verif-hash, how payment gateways work, flutterwave transaction fee, pass charges to customer, paystack pass fees to customers, paystack vs flutterwave charges, payment gateway fees nigeria, paystack countries, flutterwave countries, paystack international payments, flutterwave international payments, paystack usd payout, receive dollars nigeria, flutterwave settlement currency, paystack registered business, paystack starter business limit, flutterwave standard, paystack api, flutterwave api, flutterwave payment flow, what is a webhook, which payment gateway to use, backup payment gateway, multiple payment gateways, payment gateway strategy

## HASHTAG POOL (29 hashtags, every hashtag used anywhere in this kit)

#Shorts #paystack #flutterwave #fintech #nigeria #webdev #developer #startup #payments #techinnigeria #smallbusiness #ecommerce #naija #founder #entrepreneur #backend #api #laravel #php #coding #webhooks #security #learntocode #africa #africanstartups #freelancer #dollars #startups #softwareengineering

---

## HOW THIS KIT IS BUILT

The script is your read-through from 27 October, with the voice-to-text errors fixed and your wording and order kept. The third-company lines are out, the old Flutterwave fee history is out, and the webhook step is now one simple line. Every number was checked again on Paystack's and Flutterwave's own pages on 27 October 2026, and the script says "as of October 2026" and "listed price" where a number could change. The spoken script is about 1,130 words, so roughly 7 to 8 minutes. The code is on screen only. You don't read it out.

All story points are filled or written generally. No open questions.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** each segment names its topic in its first lines, so section 5c can cut it cleanly. Numbers go on screen whenever you say them, because people pause to read them. Code blocks are for the screen, not for reading aloud.

---

**[SEGMENT 1: OPEN]**

If you're building an app in Nigeria and you want people to pay you online, you'll most likely choose between Paystack and Flutterwave.

In this video, I'm comparing the two using their official pricing pages and documentation, as of October 2026.

We'll go through what they charge, how fast you get paid, how to sign up and how to build with each one, and then which one I would pick for which kind of app.

---

**[SEGMENT 2: WHAT PAYSTACK AND FLUTTERWAVE DO]**

Paystack and Flutterwave are payment gateways.

A payment gateway sits between your app and your customer's bank.

So if I have a cute dresses app, and someone is buying a dress for 100,000 naira, my app sends them to Paystack's or Flutterwave's checkout.

The gateway collects the money, tells my app that the payment worked, and later sends the money to my bank account.

It removes its own fee before the money gets to that bank account.

**[ON SCREEN: customer pays on the checkout / gateway tells your app / money reaches your bank, minus the fee]**

Now, like I said, these payment gateways also take their own fees.

---

**[SEGMENT 3: PAYSTACK FEES IN NIGERIA]**

**[~1:00 BEAT: the money starts here, what each one charges]**

These are Paystack's fees for a business in Nigeria, from their pricing page as of October 2026.

For local payments, Paystack charges 1.5% plus 100 naira, whether your customer paid with a card, a bank transfer or USSD.

If the payment is under 2,500 naira, Paystack waives the 100 naira, and you only pay the 1.5%.

And the fee is capped at 2,000 naira.

So whether somebody pays 200,000 naira or 2 million naira, the local fee is 2,000 naira.

For international cards, it's 3.9% plus 100 naira, and American Express cards are 4.5%.

**[ON SCREEN: Paystack Nigeria, Oct 2026 / local: 1.5% + ₦100 / ₦100 waived under ₦2,500 / capped at ₦2,000 / international cards: 3.9% + ₦100 / Amex: 4.5%]**

---

**[SEGMENT 4: FLUTTERWAVE FEES IN NIGERIA]**

Now, these are Flutterwave's fees for a business in Nigeria, also from their pricing page as of October 2026.

For local payments, Flutterwave charges 2%, which they split into a 1.4% transaction fee and a 0.6% platform fee.

Flutterwave's pricing page doesn't list a maximum fee for local payments, so a bigger payment means a bigger fee.

For international payments, it's 4.8%, and the page says the fees are subject to 7.5% VAT.

**[ON SCREEN: Flutterwave Nigeria, Oct 2026 / local: 2% (1.4% transaction fee + 0.6% platform fee) / no maximum fee listed / international: 4.8% / fees subject to 7.5% VAT]**

On Flutterwave, your customer pays the fee by default, on top of your price, and you can change that.

On Paystack, passing the fee to your customer is a setting you turn on.

---

**[SEGMENT 5: THE SAME ORDER ON PAYSTACK AND FLUTTERWAVE]**

**[~3:00 BEAT: the payoff. Same orders, both gateways, real numbers]**

Now, which one is cheaper, Paystack or Flutterwave?

It depends on the size of the order, so let's run the same pretty dress orders through both.

I'm using their listed prices and leaving VAT out for both, so we are comparing like with like.

A 2,000 naira order.

Paystack waives the 100 naira, so the fee is 30 naira.

Flutterwave's fee in this case will be 40 naira.

A 10,000 naira order.

Paystack's fee is 250 naira.

Flutterwave's fee is 200 naira.

For a 50,000 naira order, Paystack's fee is 850 naira, while Flutterwave's is 1,000 naira.

For a 200,000 naira order, Paystack's fee is capped, so it's 2,000 naira, while Flutterwave's is 4,000 naira.

**[ON SCREEN: table / order: ₦2,000 · ₦10,000 · ₦50,000 · ₦200,000 / Paystack: ₦30 · ₦250 · ₦850 · ₦2,000 / Flutterwave: ₦40 · ₦200 · ₦1,000 · ₦4,000 / listed prices, before VAT, Oct 2026]**

So on listed prices, Flutterwave is a little cheaper for orders between 2,500 and 20,000 naira.

Paystack is cheaper under 2,500 and above 20,000, and the gap grows as the order gets bigger.

And also, with Paystack, if you process a lot of money, their pricing page says you can get a volume discount on the fee.

---

**[SEGMENT 6: SELLING OUTSIDE NIGERIA WITH PAYSTACK AND FLUTTERWAVE]**

If you are selling outside Nigeria and using Paystack or Flutterwave, there are also some things to consider.

Paystack's services are available to businesses registered in Nigeria, Ghana, South Africa and Kenya, with a private beta in Côte d'Ivoire and Egypt.

Flutterwave's pricing page has 12 African countries, including Uganda, Tanzania, Rwanda and Senegal.

**[ON SCREEN: Paystack: Nigeria, Ghana, South Africa, Kenya (+ private beta: Côte d'Ivoire, Egypt) / Flutterwave pricing page: 12 African countries]**

For international cards, Paystack charges 3.9% plus 100 naira, while Flutterwave charges 4.8%.

By default, both of them settle the payment to a Nigerian business in naira.

Now, Paystack lets you choose to be settled in dollars instead, into a Zenith Bank domiciliary account.

**[ON SCREEN: Paystack USD settlement into a Zenith Bank domiciliary account (public pilot, per Paystack's pricing page)]**

---

**[SEGMENT 7: HOW FAST PAYSTACK AND FLUTTERWAVE PAY YOU]**

Now, how fast do Paystack and Flutterwave pay you?

Once a customer pays, how fast does the money reach your account?

Paystack's pricing page says the next working day, so Monday's payments will arrive on Tuesday.

Flutterwave's pricing page says the next day for local payments, and international payments vary by region.

**[ON SCREEN: Paystack: next working day (T+1) / Flutterwave: next day for local, international varies by region]**

If you're paying out from your account, like, for example, maybe you are paying a designer whose dresses you sell on your own platform, Paystack and Flutterwave charge the same transfer fees.

It's 10 naira for 5,000 and below, 25 naira for up to 50,000, and 50 naira above that.

**[ON SCREEN: transfers in Nigeria, both: ₦10 (₦5,000 and below) / ₦25 (₦5,001 to ₦50,000) / ₦50 (above ₦50,000)]**

---

**[SEGMENT 8: SIGNING UP FOR PAYSTACK OR FLUTTERWAVE WITHOUT CAC]**

If you're a Nigerian business setting up online payments, do you need to register with CAC before you can accept payments with Flutterwave or Paystack?

Actually, on both, you can start as an unregistered business.

On Paystack, it's called a Starter Business.

You sign up with your government ID, your BVN and your personal bank account, all in the same name.

And a Starter Business can take up to 8 million naira, but it can't send transfers.

To remove those limits, you have to upgrade to a Registered Business with your CAC documents.

With Flutterwave, the starter option asks for your BVN, your NIN, an ID, proof of address, a website or social media page, and your estimated monthly sales.

**[ON SCREEN: Paystack Starter: ID + BVN + personal bank account, same name / up to ₦8m, no transfers / Flutterwave starter: BVN + NIN, ID, proof of address, website or social page, estimated monthly sales / Registered on both: CAC documents]**

---

**[SEGMENT 9: HOW PAYSTACK AND FLUTTERWAVE INTEGRATION WORKS]**

If you're a developer, Paystack and Flutterwave kind of work the same way, in four steps.

First, your server starts the payment with your secret key and gets back a checkout link.

Second, your customer pays on that checkout, and they are sent back to your site.

Third, your server asks the payment gateway if the payment went through, and checks the status and the amount before marking the order as paid.

And fourth, the gateway also tells your server directly that the payment went through, with something called a webhook.

**[ON SCREEN: 1. start the payment / 2. customer pays / 3. verify on your server / 4. webhook]**

**[CODE ON SCREEN]**
```php
// If you're using Laravel, for example

// Paystack: start the payment, then verify
Http::withToken($paystackSecret)->post('https://api.paystack.co/transaction/initialize', [
    'email'  => $order->email,
    'amount' => $order->total * 100, // kobo
]);

Http::withToken($paystackSecret)
    ->get("https://api.paystack.co/transaction/verify/{$reference}");
// paid only if data.status is "success" and the amount matches

// Flutterwave Standard (v3): start the payment, then verify
Http::withToken($flutterwaveSecret)->post('https://api.flutterwave.com/v3/payments', [
    'tx_ref'       => $order->reference,
    'amount'       => $order->total,
    'currency'     => 'NGN',
    'redirect_url' => route('payment.callback'),
    'customer'     => ['email' => $order->email],
]);

Http::withToken($flutterwaveSecret)
    ->get("https://api.flutterwave.com/v3/transactions/{$transactionId}/verify");
// paid only if data.status is "successful" and the amount and currency match
```

For webhooks, Paystack signs each one with your secret key in a header called x-paystack-signature.

Flutterwave sends the secret hash you set in your dashboard, in a header called verif-hash.

On both of them, you check that header before you trust the webhook, and you send back a 200.

**[CODE ON SCREEN]**
```php
// Paystack
$valid = hash_equals(
    hash_hmac('sha512', $request->getContent(), $paystackSecret),
    (string) $request->header('x-paystack-signature')
);

// Flutterwave
$valid = hash_equals($flutterwaveSecretHash, (string) $request->header('verif-hash'));
```

---

**[SEGMENT 10: PAYSTACK OR FLUTTERWAVE, WHICH ONE SHOULD YOU USE?]**

**[~6:00 BEAT: the answer everyone stayed for]**

So which one should you use, Paystack or Flutterwave?

This is how I would decide.

If you sell in Nigeria and your orders are usually above 20,000 naira, like courses or electronics, I'd lean a little bit towards Paystack, because of the lower percentage and the 2,000 naira cap.

If most of your orders are between 2,500 and 20,000 naira, like books or food, Flutterwave's listed price comes out a little cheaper.

If you want your business live in more African countries, I'd look at Flutterwave first.

If you haven't registered with CAC, yes, both of them let you start, but Paystack has an 8 million naira Starter limit.

If payments are your whole business, I think it's worth setting up both, so on a bad day, your company is not stuck with one provider.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("paystack vs flutterwave" is the exact phrase people type, often with a year, "fees" or "which is better")
> 1. Paystack vs Flutterwave (2026): Which Should You Use? — 53
> 2. Paystack vs Flutterwave Fees in Nigeria (2026) — 46
> 3. Paystack vs Flutterwave: Which Is Better for Developers? — 56
> 4. Paystack vs Flutterwave in 2027: Fees, Payouts, Setup — 53
> 5. Paystack or Flutterwave? Fees and Integration Compared — 54
> 6. Best Payment Gateway in Nigeria: Paystack vs Flutterwave — 56
> 7. How to Choose the Best Payment Gateway for Your App — 51

**CLICK-LED**
> 8. Paystack or Flutterwave? It Depends on Your Order Size — 54
> 9. The ₦20,000 Point Where Paystack Gets Cheaper — 45
> 10. What Paystack and Flutterwave Really Charge You (2026) — 54
> 11. Paystack vs Flutterwave: Same Order, Different Fee — 50
> 12. I Read the Paystack and Flutterwave Docs for You — 48

**RECOMMENDED: 1.** "Paystack vs Flutterwave" sits in the first 23 characters, which is the exact phrase people search, the year tells them the fees are current, and "Which Should You Use?" is what Segment 10 answers. It also sits well next to your Paystack tutorial (your second-biggest video), so YouTube has a reason to suggest one after the other. If you publish in 2027, swap the year to 2027 and keep the rest. 2 is the strongest backup for pure search, because "fees in Nigeria" is what founders type when they're about to sign up. Thumbnail pairing: the title names both companies, so the thumbnail shouldn't. Use the fee numbers instead (see 2b).

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Paystack vs Flutterwave: Which One Is Actually Cheaper?" Segment 5 answers it with the four dress orders and the 2,500 to 20,000 naira range. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot. On the left, two big price tags, "₦2,000" and "₦4,000", with "same order" small underneath, or no words at all. One idea, the same order with two different fees. Squint at it, and if the two numbers still read, it works. It doesn't repeat the title, because the title has the names and the thumbnail has the money.

**Backup thumbnail:** a big "₦20,000" with a line down the middle, one half green and one half orange (colours only, no logos).

**Recording notes:**
- Shoot two takes of the first 20 seconds.
- Segment 5 is all numbers. Say them slowly, because the on-screen table is doing half the work.
- The code in Segment 9 is on screen only. Keep talking through the four steps while it shows.
- The closing ends on "not stuck with one provider" and doesn't refer back to anything, so the edit can stop cleanly.
- At about 1,130 spoken words, the video should run roughly 7 to 8 minutes.

**Retention beats (marked in the script):**
- ~1:00 is the start of Segment 3, where the money starts.
- ~3:00 is the start of Segment 5, the same orders on both.
- ~6:00 lands near the end of Segment 9 (webhooks), and the marker sits at the start of Segment 10, the answer, at about 6:30.

**After publishing:**
- Post the X image post (the fee card) as the video goes live, and send the link to a few developers and founders who will watch it through.
- After 2 to 3 days, if views are clearly below your channel average, swap to the stretch title and the backup thumbnail. If it's doing well, leave it.
- In week one, check retention at 1, 3 and 6 minutes.
- If either company changes its Nigerian fees, pin a comment with the new numbers and the date.

---

## 3. YOUTUBE DESCRIPTION

> Paystack vs Flutterwave, which one should you use for your app or business in Nigeria? I compare them using their official pricing pages, support pages and developer docs, as of October 2026.
>
> We go through what each one charges in Nigeria, the same dress orders on both (and where the cheaper one changes), selling outside Nigeria, how fast you get paid and what transfers cost, what you need to sign up with or without CAC registration, and how the integration works on both, including webhooks. I finish with which one I would pick for which kind of app.
>
> Prices change, so check both pricing pages before you sign up.
>
> Which one are you using right now, and what made you pick it?
>
> CHAPTERS (add times after editing)
> 0:00 Paystack vs Flutterwave
> What Paystack and Flutterwave do
> Paystack fees in Nigeria
> Flutterwave fees in Nigeria
> The same order on both
> Selling outside Nigeria
> How fast they pay you
> Signing up (with or without CAC)
> How the integration works
> Which one should you use?
>
> Watch next: How to add Paystack payments to a Laravel app [LINK TO KIT 16 VIDEO]
> My first Paystack tutorial: [LINK TO "How to Add Paystack Payment to your Website in 15 MINUTES"]
>
> SOURCES AND FURTHER READING
> Paystack pricing: https://paystack.com/pricing
> Paystack transaction pricing by country: https://support.paystack.com/en/articles/2130306
> Paystack countries: https://support.paystack.com/en/articles/2130562
> Paystack business types (Starter vs Registered): https://support.paystack.com/hc/en-us/articles/360009972759
> Paystack compliance requirements for Nigeria: https://support.paystack.com/en/articles/2123970
> Paystack Accept Payments: https://paystack.com/docs/payments/accept-payments/
> Paystack webhooks: https://paystack.com/docs/payments/webhooks/
> Flutterwave pricing (Nigeria): https://flutterwave.com/ng/pricing
> Flutterwave Nigeria onboarding requirements: https://flutterwave.com/us/support/my-account/onboarding-requirements-for-using-flutterwave-in-nigeria
> Flutterwave Standard: https://developer.flutterwave.com/v3.0/docs/flutterwave-standard-1
> Flutterwave transaction verification: https://developer.flutterwave.com/v3.0/docs/transaction-verification
> Flutterwave webhooks: https://developer.flutterwave.com/v3.0/docs/webhooks
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (474 characters, under YouTube's 500 limit):**

paystack vs flutterwave, paystack vs flutterwave 2026, paystack vs flutterwave fees, paystack vs flutterwave which is better, paystack or flutterwave, best payment gateway in nigeria, payment gateway nigeria, paystack fees, flutterwave fees, paystack charges nigeria, flutterwave charges nigeria, paystack vs flutterwave for developers, paystack integration, flutterwave integration, paystack webhook, flutterwave webhook, accept payments in nigeria, online payments nigeria

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

Paystack or Flutterwave? These are their official numbers for Nigeria, as of October 2026.

**[THE FEES]**

Paystack charges 1.5% plus 100 naira on local payments, capped at 2,000 naira.

Flutterwave charges 2%, and its pricing page doesn't list a maximum fee, so a bigger payment means a bigger fee.

**[SAME ORDER]**

So on a 10,000 naira order, Flutterwave is cheaper, 200 against 250.

On a 200,000 naira order, Paystack is cheaper, 2,000 against 4,000.

**[COUNTRIES AND INTERNATIONAL]**

Paystack lists four countries for businesses. Flutterwave's pricing page lists twelve.

International cards are 3.9% plus 100 naira on Paystack and 4.8% on Flutterwave.

**[PAYOUTS]**

Paystack pays out the next working day, and Flutterwave says the next day for local payments.

**[SIGNING UP]**

You can start on both without CAC registration. On Paystack, a Starter Business can take up to 8 million naira and can't send transfers.

**[BUILDING]**

The integration works the same way on both. Your server starts the payment, the customer pays on the checkout, your server verifies it, and the gateway sends a webhook that you check before you trust it.

**[CODE ON SCREEN]**
```php
// Paystack:    x-paystack-signature
// Flutterwave: verif-hash
```

**[LAND]**

If your orders are usually above 20,000 naira, I'd lean towards Paystack. If they're between 2,500 and 20,000, or you want more African countries, look at Flutterwave.

**Caption:** paystack or flutterwave? I went through their official pricing pages and docs, and the cheaper one depends on your order size 🧮
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #fintech #nigeria #webdev #developer #startup #payments #techinnigeria #smallbusiness
**Tags:** paystack vs flutterwave, paystack vs flutterwave fees, best payment gateway in nigeria, paystack or flutterwave

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: The same order on Paystack and Flutterwave (25-35 sec)

I ran the same orders through Paystack and Flutterwave, using their listed prices for Nigeria.

On a 2,000 naira order, Paystack is 30 naira and Flutterwave is 40.

On 10,000, Paystack is 250 and Flutterwave is 200.

On 200,000, Paystack is 2,000 because of its cap, and Flutterwave is 4,000.

So Flutterwave is a little cheaper between 2,500 and 20,000 naira, and Paystack is cheaper under 2,500 and above 20,000.

**Caption:** same order, two different fees. on their listed prices in nigeria, the cheaper one depends on how big the order is
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #ecommerce #startup #payments #naija
**Tags:** paystack vs flutterwave fees, paystack fees, flutterwave fees, cheapest payment gateway nigeria

---

### SHORT 3: Paystack's fee cap and Flutterwave's 2% (20-30 sec)

Paystack caps its local fee in Nigeria at 2,000 naira.

So whether somebody pays 200,000 naira or 2 million naira, the fee is 2,000 naira.

Flutterwave's local fee is 2%, and its pricing page doesn't list a maximum fee.

So on Flutterwave, a bigger payment means a bigger fee.

**Caption:** if most of your orders are big, this one detail on the two pricing pages makes a real difference to what you pay
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #payments #naija #founder #ecommerce
**Tags:** paystack fee cap, paystack fees, flutterwave fees, flutterwave charges nigeria

---

### SHORT 4: Do you need CAC to accept payments? (25-35 sec)

You can start accepting payments on Paystack and Flutterwave before you register with CAC.

On Paystack, that's a Starter Business. You need a government ID, your BVN and a personal bank account, all in the same name.

You can take up to 8 million naira, and you can't send transfers until you upgrade.

On Flutterwave, the starter option asks for your BVN and NIN, an ID, proof of address, a website or social media page, and your estimated monthly sales.

**Caption:** you don't need CAC registration to start taking payments on paystack or flutterwave, but there are limits you should know about
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #smallbusiness #startup #founder #fintech #naija #entrepreneur
**Tags:** paystack starter business, flutterwave starter business, cac registration payment gateway, accept payments without cac

---

### SHORT 5: Paystack and Flutterwave work the same way (25-35 sec)

If you can build with Paystack, you can build with Flutterwave, because the flow is the same.

Your server starts the payment with your secret key and gets a checkout link.

The customer pays and comes back to your site.

Your server asks the gateway if the payment went through and checks the amount.

And the gateway also tells your server directly, with a webhook.

**[ON SCREEN: 1. start the payment / 2. customer pays / 3. verify on your server / 4. webhook]**

**Caption:** paystack and flutterwave integrations follow the same four steps. this is the flow from start to finish
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #webdev #backend #api #developer #laravel #php #coding
**Tags:** paystack integration, flutterwave integration, how payment gateway integration works, paystack payment flow

---

### SHORT 6: Checking a payment webhook (20-30 sec)

A webhook is the payment gateway calling your server to tell it about a payment.

Anyone can send a request to that URL, so you check a header first.

Paystack sends a signature made with your secret key in x-paystack-signature.

Flutterwave sends the secret hash you set in your dashboard in verif-hash.

If it doesn't match, ignore the request. If it does, send back a 200.

**[CODE ON SCREEN]**
```php
hash_equals($flutterwaveSecretHash, (string) $request->header('verif-hash'));
```

**Caption:** anyone can send a request to your payment webhook url. this is how paystack and flutterwave let you check it really came from them 🔐
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #webhooks #backend #security #api #developer #webdev #laravel
**Tags:** paystack webhook, flutterwave webhook, x-paystack-signature, verif-hash

---

### SHORT 7: How fast you get paid, and what transfers cost (20-30 sec)

Once a customer pays, how fast does the money reach your account?

Paystack's pricing page says the next working day, so Monday's payments arrive on Tuesday.

Flutterwave's pricing page says the next day for local payments.

And if you send money out, both charge the same in Nigeria. It's 10 naira for 5,000 and below, 25 naira up to 50,000, and 50 naira above that.

**Caption:** how long paystack and flutterwave take to pay you in nigeria, and what it costs when you send money out
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #startup #payments #founder #naija
**Tags:** paystack settlement, flutterwave settlement, paystack transfer fees, flutterwave transfer fees

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** Paystack vs Flutterwave
**Caption:** if you want people in nigeria to pay you online, you'll probably choose between these two. this is how they compare using their own pricing pages and docs, as of october 2026.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #fintech #nigeria #webdev #developer #startup #payments #techinnigeria
**Tags:** paystack vs flutterwave, paystack or flutterwave, payment gateway comparison

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** what a payment gateway does
**Caption:** the gateway sits between your app and your customer's bank. it collects the money, tells your app the payment worked, and sends you the money after taking its fee.
full video: [LINK]
**Hashtags:** #Shorts #fintech #payments #webdev #backend #developer #learntocode #ecommerce #nigeria #startup
**Tags:** what is a payment gateway, how payment gateways work, online payments nigeria

---

### CLIP 3 — Segment 3 (whole)
**Overlay:** Paystack fees in Nigeria (2026)
**Caption:** 1.5% plus 100 naira on local payments, the 100 is waived under 2,500 naira, and the fee is capped at 2,000. international cards are 3.9% plus 100, and american express is 4.5%.
full video: [LINK]
**Hashtags:** #Shorts #paystack #nigeria #fintech #smallbusiness #ecommerce #startup #payments #naija #founder
**Tags:** paystack fees, paystack charges nigeria, paystack pricing 2026

---

### CLIP 4 — subset of Segment 3
**Starts:** "And the fee is capped at 2,000 naira." **Ends:** "...the local fee is 2,000 naira."
**Overlay:** Paystack's 2,000 naira cap, explained
**Caption:** on paystack in nigeria, 2,000 naira is the most you pay in fees on one local payment, whether the order is 200,000 or 2 million.
full video: [LINK]
**Hashtags:** #Shorts #paystack #nigeria #fintech #smallbusiness #ecommerce #payments #naija #founder
**Tags:** paystack fee cap, paystack charges nigeria, paystack fees

---

### CLIP 5 — Segment 4 (whole)
**Overlay:** Flutterwave fees in Nigeria (2026)
**Caption:** flutterwave's pricing page lists 2% for local payments, 4.8% for international, and says fees are subject to 7.5% VAT. by default your customer pays the fee.
full video: [LINK]
**Hashtags:** #Shorts #flutterwave #nigeria #fintech #smallbusiness #ecommerce #startup #payments #naija #founder
**Tags:** flutterwave fees, flutterwave charges nigeria, flutterwave pricing 2026

---

### CLIP 6 — subset of Segment 4
**Starts:** "For local payments, Flutterwave charges 2%..." **Ends:** "...a bigger payment means a bigger fee."
**Overlay:** does Flutterwave have a fee cap?
**Caption:** flutterwave charges 2% on local payments in nigeria, and its pricing page doesn't list a maximum fee, so bigger payments pay bigger fees.
full video: [LINK]
**Hashtags:** #Shorts #flutterwave #nigeria #fintech #smallbusiness #payments #naija #ecommerce
**Tags:** flutterwave fees, flutterwave charges nigeria, flutterwave transaction fee

---

### CLIP 7 — subset of Segment 4
**Starts:** "On Flutterwave, your customer pays the fee by default..." **Ends:** "...a setting you turn on."
**Overlay:** who pays the transaction fee?
**Caption:** on flutterwave your customer pays the fee by default, and you can change it. on paystack, passing the fee to your customer is a setting you turn on.
full video: [LINK]
**Hashtags:** #Shorts #flutterwave #paystack #smallbusiness #ecommerce #fintech #nigeria #payments
**Tags:** pass charges to customer, flutterwave transaction fee, paystack pass fees to customers

---

### CLIP 8 — Segment 5 (whole)
**Overlay:** the same order on Paystack and Flutterwave
**Caption:** 2,000, 10,000, 50,000 and 200,000 naira orders, run through both on their listed prices, before VAT.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #ecommerce #startup #payments #naija
**Tags:** paystack vs flutterwave fees, paystack vs flutterwave charges, cheapest payment gateway nigeria

---

### CLIP 9 — subset of Segment 5
**Starts:** "So on listed prices, Flutterwave is a little cheaper..." **Ends:** "...a volume discount on the fee."
**Overlay:** which is cheaper, Paystack or Flutterwave?
**Caption:** on listed prices, flutterwave is a little cheaper between 2,500 and 20,000 naira, and paystack is cheaper under 2,500 and above 20,000. paystack's pricing page also mentions volume discounts.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #payments #naija #ecommerce
**Tags:** paystack vs flutterwave fees, cheapest payment gateway nigeria, payment gateway fees nigeria

---

### CLIP 10 — Segment 6 (whole)
**Overlay:** selling outside Nigeria with Paystack or Flutterwave
**Caption:** paystack lists four countries for businesses plus a private beta in two more. flutterwave's pricing page lists twelve african countries. international cards are 3.9% plus 100 naira on paystack and 4.8% on flutterwave.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #africa #fintech #startup #africanstartups #payments #founder #nigeria
**Tags:** paystack countries, flutterwave countries, paystack international payments, flutterwave international payments

---

### CLIP 11 — subset of Segment 6
**Starts:** "For international cards, Paystack charges 3.9% plus 100 naira..." **Ends:** "...into a Zenith Bank domiciliary account."
**Overlay:** getting paid in dollars as a Nigerian business
**Caption:** both settle international card payments in naira by default. paystack lets you choose dollar settlement into a zenith bank domiciliary account, which its pricing page calls a public pilot.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #freelancer #founder #payments #dollars
**Tags:** paystack usd payout, receive dollars nigeria, flutterwave settlement currency

---

### CLIP 12 — Segment 7 (whole)
**Overlay:** how fast Paystack and Flutterwave pay you
**Caption:** paystack settles the next working day, and flutterwave says the next day for local payments. both charge 10, 25 or 50 naira to send money out in nigeria.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #startup #payments #founder
**Tags:** paystack settlement, flutterwave settlement, paystack transfer fees, flutterwave transfer fees

---

### CLIP 13 — subset of Segment 7
**Starts:** "If you're paying out from your account..." **Ends:** "...and 50 naira above that."
**Overlay:** Paystack and Flutterwave transfer fees
**Caption:** sending money out from paystack or flutterwave in nigeria costs the same on both. it's 10 naira for 5,000 and below, 25 naira up to 50,000, and 50 naira above that.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #fintech #smallbusiness #payments #founder #naija
**Tags:** paystack transfer fees, flutterwave transfer fees, payment gateway fees nigeria

---

### CLIP 14 — Segment 8 (whole)
**Overlay:** do you need CAC to use Paystack or Flutterwave?
**Caption:** you can start on both as an unregistered business. this is what each one asks for, and the limits that come with it on paystack.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #nigeria #smallbusiness #startup #founder #fintech #naija #entrepreneur
**Tags:** cac registration payment gateway, paystack starter business, flutterwave starter business, accept payments without cac

---

### CLIP 15 — subset of Segment 8
**Starts:** "On Paystack, it's called a Starter Business." **Ends:** "...with your CAC documents."
**Overlay:** Paystack Starter Business, explained
**Caption:** a paystack starter business signs up with an id, bvn and personal bank account in the same name. it can take up to 8 million naira and can't send transfers until it upgrades.
full video: [LINK]
**Hashtags:** #Shorts #paystack #nigeria #smallbusiness #startup #founder #fintech #naija
**Tags:** paystack starter business, paystack registered business, paystack starter business limit

---

### CLIP 16 — Segment 9 (whole)
**Overlay:** Paystack and Flutterwave integration, side by side
**Caption:** the four steps both follow and how each one lets you check its webhooks, with the code on screen.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #laravel #php #backend #webdev #api #developer #coding
**Tags:** paystack integration, flutterwave integration, flutterwave standard, paystack api, flutterwave api

---

### CLIP 17 — subset of Segment 9
**Starts:** "If you're a developer, Paystack and Flutterwave kind of work the same way..." **Ends:** "...with something called a webhook."
**Overlay:** how payment gateway integration works
**Caption:** start the payment on your server, the customer pays, verify it on your server, and the gateway also tells your server with a webhook. paystack and flutterwave both work this way.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #backend #webdev #api #developer #learntocode #payments
**Tags:** how payment gateway integration works, paystack payment flow, flutterwave payment flow

---

### CLIP 18 — subset of Segment 9
**Starts:** "For webhooks, Paystack signs each one..." **Ends:** "...you send back a 200."
**Overlay:** payment webhooks on Paystack and Flutterwave
**Caption:** paystack sends a signature in x-paystack-signature, flutterwave sends your secret hash in verif-hash, and on both you check it before you trust the webhook.
full video: [LINK]
**Hashtags:** #Shorts #webhooks #paystack #flutterwave #backend #security #api #developer #webdev
**Tags:** paystack webhook, flutterwave webhook, x-paystack-signature, verif-hash, what is a webhook

---

### CLIP 19 — Segment 10 (whole)
**Overlay:** Paystack or Flutterwave, which should you use?
**Caption:** this is how I would decide, depending on your usual order size, the countries you want, and whether you've registered with CAC yet.
full video: [LINK]
**Hashtags:** #Shorts #paystack #flutterwave #fintech #startup #founder #nigeria #africa #payments #smallbusiness
**Tags:** paystack vs flutterwave which is better, best payment gateway in nigeria, which payment gateway to use

---

### CLIP 20 — subset of Segment 10
**Starts:** "If payments are your whole business..." **Ends:** "...not stuck with one provider."
**Overlay:** why some businesses use two payment gateways
**Caption:** if payments are your whole business, I think it's worth setting up both, so on a bad day you're not stuck with one provider.
full video: [LINK]
**Hashtags:** #Shorts #fintech #startup #founder #ecommerce #payments #nigeria #smallbusiness
**Tags:** backup payment gateway, multiple payment gateways, payment gateway strategy

---

**Posting order:** 9 first (which is cheaper), then 4 (Paystack's cap), then 14 (the CAC question), then 17 (the four steps), then 13 (transfer fees), then 11 (getting paid in dollars), then 19.

---

## 6. CAPTIONS

### TikTok caption:
> paystack or flutterwave? I went through their official pricing pages and docs, and in nigeria the cheaper one depends on your order size 🧮
**Hashtags:** #paystack #flutterwave #fintech #nigeria #webdev

### Instagram Reel caption:
> If you're building an app or selling online in Nigeria, you'll probably have to choose between Paystack and Flutterwave at some point.
>
> I compared them using their own pricing pages and docs as of October 2026, and ran the same orders through both. On their listed prices, Flutterwave is a little cheaper for orders between 2,500 and 20,000 naira, and Paystack is cheaper above that, partly because it caps its fee at 2,000 naira.
>
> I also go through selling outside Nigeria, how fast you get your money, what you need to sign up without CAC registration, and how the integration works on both. The full video is on YouTube, and the link is in my bio.
>
> #paystack #flutterwave #fintech #nigeria #startup

### LinkedIn caption:
> Which payment gateway should you use if you're building in Nigeria, Paystack or Flutterwave?
>
> Paystack's listed local fee is 1.5% plus 100 naira, capped at 2,000 naira, so a big order never costs more than 2,000 in fees.
>
> Flutterwave's listed local fee is 2%, and its pricing page doesn't list a maximum, which makes it slightly cheaper for orders between 2,500 and 20,000 naira and more expensive above that.
>
> Flutterwave's pricing page covers twelve African countries against Paystack's four plus a private beta, which matters once you want to operate beyond Nigeria.
>
> Both let you start without CAC registration, although a Paystack Starter Business is limited to 8 million naira and can't send transfers.
>
> And for developers, the integration follows the same four steps on both, so the choice can come down to your order sizes and your countries.
>
> Full walkthrough: [LINK]
>
> #fintech #payments #startups #softwareengineering #africa

---

## 7. X / TWITTER

**The approach.** Short tweets typed the way you type, each one saying one concrete thing. The fee comparison goes out as an image, because image cheat sheets did far better than text in your X research. The poll suits this topic, since people like to defend the gateway they use. The link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> paystack vs flutterwave fees in nigeria, same orders on both, from their official pricing pages (october 2026)

**Image content (one clean card in Canva):**
> **PAYSTACK vs FLUTTERWAVE · NIGERIA · OCT 2026**
> **Local fee** · Paystack: 1.5% + ₦100, capped at ₦2,000 (₦100 waived under ₦2,500) · Flutterwave: 2%, no maximum listed
> **₦2,000 order** · Paystack ₦30 · Flutterwave ₦40
> **₦10,000 order** · Paystack ₦250 · Flutterwave ₦200
> **₦50,000 order** · Paystack ₦850 · Flutterwave ₦1,000
> **₦200,000 order** · Paystack ₦2,000 · Flutterwave ₦4,000
> **International cards** · Paystack 3.9% + ₦100 · Flutterwave 4.8%
> **Transfers out** · both ₦10 / ₦25 / ₦50
> *Listed prices, before VAT. Check both pricing pages before you sign up.*

**Reply:**
> I also went through payouts, signing up without CAC, and how the integration works on both: [LINK]

---

### THE TIPS LIST

> things I'd check before picking paystack or flutterwave
>
> 1. your usual order size, because the cheaper one changes with it
> 2. which countries you want your business live in
> 3. whether you need to be paid in dollars
> 4. whether you're registered with CAC yet
> 5. who pays the fee by default, you or your customer

**Reply:** full video on all of these: [LINK]

---

### THE POLL

> if you're building in nigeria, which payment gateway are you using right now?
>
> Paystack
> Flutterwave
> Both
> Something else

**Your reply a day later:**
> I think it really depends on your order size and your countries. on listed prices, paystack wins on big naira orders because of the 2,000 cap, and flutterwave covers more african countries

---

### THE "CAN YOU GUESS" TWEET

> can you guess the order size where paystack and flutterwave charge exactly the same fee in nigeria? (listed prices)

**Your reply:**
> 20,000 naira. paystack is 1.5% plus 100, so 400. flutterwave is 2%, also 400. above that paystack is cheaper, and between 2,500 and 20,000 flutterwave is

---

### THE LAUNCH TWEET

> made a paystack vs flutterwave video using their official pricing pages and docs. fees, payouts, signing up, the integration, and which one I'd pick for what

**Reply:** [LINK]

---

### STANDALONE TWEETS

> paystack caps its local fee in nigeria at 2,000 naira. so a 2 million naira order and a 200,000 naira order pay the same fee

> flutterwave's nigerian pricing page doesn't list a maximum fee for local payments. it's 2%, so a 500,000 naira order is a 10,000 naira fee

> you can start taking payments on paystack before registering with cac, but a starter business tops out at 8 million naira and can't send transfers

> on flutterwave, your customer pays the transaction fee by default. if you'd rather absorb it, that's a dashboard setting

> paystack and flutterwave both charge 10 naira to send out 5,000 naira or less. I didn't expect them to match exactly

> anyone can send a request to your payment webhook url. paystack signs theirs and flutterwave sends your secret hash, so check the header before you trust it

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> which one are you using right now, and was it the fees, the countries or the docs that made you pick it? if either pricing page changes, I'll update the numbers here 👇

### Instagram:
> what's your usual order size? that's the number that decides which one is cheaper for you

### TikTok:
> if your orders are usually above 20k naira, run the numbers before you pick 👀

### LinkedIn:
> One more thing I'd check before choosing is how international payments settle. Both settle to naira by default, and whether you can get paid in dollars may matter more to you than a small difference in the fee.

### X (reply to your own tweet):
> quick check if you already have a gateway set up. go to your settings and see who's paying the transaction fee right now, you or your customer

### REPLIES TO EXPECT (ready to paste)

**"Flutterwave is capped at 2,000 naira too."**
> their current nigerian pricing page shows 2% for local payments and doesn't list a maximum fee. if you have a custom rate from them, use your own numbers

**"Flutterwave gave me a different rate."**
> the numbers in the video are the listed prices on their public pages as of october 2026. if you got a custom rate, plug it in and the same maths works

**"What about Stripe?"**
> on stripe's own country page, nigeria is marked "extended network" and the link goes to paystack instead of stripe's own sign-up. stripe agreed to buy paystack in 2020, so for a nigerian business the stripe route is paystack
*(Source, checked 27 Oct 2026: https://stripe.com/global and https://stripe.com/newsroom/news/paystack-joining-stripe)*

**"What about Monnify / Interswitch / Opay?"**
> they're real options too, I kept this one to the two people ask me about most. which one do you use?

**"Why didn't you include VAT?"**
> I left it out for both so the comparison is like for like. flutterwave's page says its fees are subject to 7.5% VAT, so check your invoices for the final number

**"Do you have a tutorial for Paystack in Laravel?"**
> yes! the full step by step one is linked in the description, and my first paystack tutorial is there too

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** paystack or flutterwave? these are their official numbers for nigeria, as of october 2026.
**Slide 2:** paystack's listed local fee is 1.5% plus 100 naira, capped at 2,000 naira.
**Slide 3:** flutterwave's listed local fee is 2%, and its pricing page doesn't list a maximum fee.
**Slide 4:** on a 10,000 naira order, flutterwave is 200 and paystack is 250.
**Slide 5:** on a 200,000 naira order, paystack is 2,000 and flutterwave is 4,000.
**Slide 6:** flutterwave is a little cheaper between 2,500 and 20,000 naira, and paystack is cheaper outside that range.
**Slide 7:** flutterwave's pricing page lists twelve african countries, and paystack lists four plus a private beta.
**Slide 8:** you can start on both without CAC registration, but a paystack starter business is capped at 8 million naira.
**Slide 9:** the integration works the same way on both, so pick on your order size and your countries.

**Carousel caption:**
> paystack vs flutterwave for anyone building in nigeria, using their own pricing pages and docs as of october 2026. the full video is on YouTube, and the link is in my bio.
>
> #paystack #flutterwave #fintech #nigeria #startup

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Paystack or Flutterwave? It Depends on Your Order Size

### Subtitle:
> What each one charges in Nigeria, what you need to sign up, and how the integration works, from their own pages.

### SEO Title:
> Paystack vs Flutterwave (2026): Fees, Payouts, Signup and Integration Compared

### SEO Description:
> A comparison of Paystack and Flutterwave for developers and businesses in Nigeria, built from their official pricing pages and developer docs as of October 2026.

---

If you're building an app in Nigeria and you want people to pay you online, you'll most likely end up choosing between Paystack and Flutterwave. Both are payment gateways, which means they sit between your app and your customer's bank. Say you have an app that sells dresses. When someone buys a dress, your app sends them to the gateway's checkout, the gateway collects the money and tells your app the payment worked, and later it sends the money to your bank account after taking its own fee. I went through each company's pricing pages, support pages and developer documentation in October 2026 to compare them, and I came away thinking the right answer depends on what you sell, where your customers are, and how big your orders usually are.

The fees are where the two differ most. Paystack's listed local fee in Nigeria is 1.5% plus 100 naira, whether the customer pays with a card, a bank transfer or USSD. The 100 naira is waived on payments under 2,500 naira, and the whole fee is capped at 2,000 naira, so a 200,000 naira order and a 2 million naira order pay the same fee. International cards cost 3.9% plus 100 naira, and American Express cards cost 4.5%. Flutterwave's pricing page lists 2% for local payments, made up of a 1.4% transaction fee and a 0.6% platform fee, and it doesn't list a maximum fee, so a bigger payment means a bigger fee. International payments cost 4.8%, and the page says its fees are subject to 7.5% VAT. On Flutterwave the customer pays the fee by default, on top of your price, and you can change that. On Paystack, passing the fee to the customer is a setting you turn on.

Running the same orders through both makes the difference easy to see. On a 2,000 naira order, Paystack's fee is 30 naira and Flutterwave's is 40. On a 10,000 naira order, Paystack is 250 and Flutterwave is 200. On a 50,000 naira order, Paystack is 850 and Flutterwave is 1,000. On a 200,000 naira order, Paystack stops at its 2,000 cap while Flutterwave charges 4,000. So on listed prices, before VAT, Flutterwave is a little cheaper between 2,500 and 20,000 naira, and Paystack is cheaper below and above that, by a gap that keeps growing as orders get bigger. Paystack's pricing page also says merchants who process large volumes get a discount on the fee.

If you want to sell beyond Nigeria, the country lists split the two. Paystack says its services are available to businesses registered in Nigeria, Ghana, South Africa and Kenya, with a private beta in Côte d'Ivoire and Egypt. Flutterwave's pricing page covers twelve African countries, including Uganda, Tanzania, Rwanda and Senegal. Both settle international card payments to a Nigerian business in naira by default, and Paystack lets you choose dollar settlement into a Zenith Bank domiciliary account, which its pricing page describes as a public pilot.

Getting paid is close on both. Paystack's pricing page says the next working day, so Monday's payments arrive on Tuesday, and Flutterwave's says the next day for local payments, with international payments varying by region. If you need to send money out, for example to a designer whose dresses you sell, both charge the same transfer fees in Nigeria, which are 10 naira for 5,000 and below, 25 naira up to 50,000, and 50 naira above that.

You don't need CAC registration to start on either. Paystack's Starter Business signs up with a government ID, a BVN and a personal bank account in the same name, and it can take up to 8 million naira but can't send transfers. To remove those limits, you upgrade to a Registered Business with your CAC documents. Flutterwave's starter option asks for your BVN and NIN, an ID, proof of address, a website or social media page and your estimated monthly sales.

For developers, the two work the same way in four steps. Your server starts the payment with your secret key and gets a checkout link. The customer pays on that checkout and is sent back to your site. Your server asks the gateway if the payment went through and checks the status and the amount before marking the order as paid. And the gateway also tells your server directly with a webhook. Paystack signs each webhook with your secret key in a header called x-paystack-signature, and Flutterwave sends the secret hash you set in your dashboard in a header called verif-hash. On both, you check that header before you trust the webhook, and you send back a 200.

So here is how I would choose. If most of your customers are in Nigeria and your orders are usually above 20,000 naira, I would lean towards Paystack. If most of your orders are between 2,500 and 20,000 naira, or you want to be live in more African countries, I would look closely at Flutterwave. If you haven't registered with CAC, both let you start, but keep Paystack's 8 million naira Starter limit in mind. And if payments are your whole business, I think it's worth having both set up, so on a bad day you're not stuck with one provider.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Fintech, Payments, Startups, Nigeria, Web Development

---

## 11. REFERENCES & SOURCES

All pages below are official Paystack or Flutterwave pages, checked on 27 October 2026.

**1. Paystack pricing, Nigeria**
- Supports Segments 3, 5, 6 and 7. "1.5% + NGN 100", "NGN 100 waived for transactions under NGN 2,500", "Local transactions fees are capped at ₦2000, meaning that's the absolute maximum you'll ever pay in fees per transaction", international "3.9% + NGN 100", international cards "charged and settled in Naira by default" with an option to settle in USD, USD settlement "in Zenith Bank domiciliary accounts" described as a public pilot, "Volume discounts available" and "Merchants who process large volumes enjoy a discount on the transaction fee", settlement "the next working day (T+1)", transfers NGN 10 (5,000 and below), NGN 25 (5,001 to 50,000), NGN 50 (above 50,000). https://paystack.com/pricing
- Same numbers by country, "1.5% + NGN 100 (all local channels, including Direct Debit)", and "4.5% (via American Express cards)". American Express isn't on the main pricing page, so this article is the source for it. https://support.paystack.com/en/articles/2130306
- Passing fees to customers is a dashboard setting. https://support.paystack.com/hc/en-us/articles/360009973579-Can-I-pass-the-transaction-charges-to-my-customers-

**2. Flutterwave pricing, Nigeria**
- Supports Segments 4, 5, 6 and 7. Local "2% per transaction" with "1.4% transaction fee + 0.6% platform fee", international "4.8% per transaction", "Transaction fees are subject to a 7.5% Value Added Tax (VAT)", "By default, your customers bear the transaction charges" (changeable in the dashboard), "the next day for local payments", international settlement "varies depending on your region", international cards "charged and settled in your local currency by default", transfers NGN 10 / 25 / 50 on the same tiers as Paystack, and the twelve-country picker (Cameroon, Ghana, Ivory Coast, Kenya, Malawi, Nigeria, Rwanda, Senegal, South Africa, Tanzania, Uganda, Zambia). The page lists no maximum or cap on local or international fees, and no volume pricing. https://flutterwave.com/ng/pricing

**3. The fee maths in Segment 5 (my calculations from the two pricing pages, before VAT)**
- ₦2,000: Paystack 1.5% = ₦30 (₦100 waived), Flutterwave 2% = ₦40.
- ₦10,000: Paystack ₦150 + ₦100 = ₦250, Flutterwave ₦200.
- ₦50,000: Paystack ₦750 + ₦100 = ₦850, Flutterwave ₦1,000.
- ₦200,000: Paystack ₦3,100 capped to ₦2,000, Flutterwave ₦4,000.
- Where they meet: 0.015x + 100 = 0.02x gives x = ₦20,000 (both ₦400). Below ₦2,500, Paystack's 1.5% (no ₦100) beats Flutterwave's 2%. From ₦2,500 up to ₦20,000, Flutterwave is cheaper. Above ₦20,000, Paystack is cheaper, and its cap kicks in at about ₦126,667.
- The ₦500,000 example in the standalone tweet is 2% of ₦500,000 = ₦10,000.

**4. Countries**
- Paystack: "Our services are available only to businesses registered in Nigeria, Ghana, South Africa and Kenya", and "We're currently running a private beta program in Côte d'Ivoire and Egypt." https://support.paystack.com/en/articles/2130562
- Flutterwave: the twelve-country picker on its pricing page (source 2). The script says "Flutterwave's pricing page has 12 African countries" because that's where the list comes from.

**5. Signing up in Nigeria**
- Paystack business types: Starter Business is "designed for merchants who are yet to register their businesses", Nigeria collection limit NGN 8,000,000, "payments for your business will be temporarily disabled" at the limit, "Starter businesses can't access certain Paystack features like Transfers", upgrade from Compliance > Profile. https://support.paystack.com/hc/en-us/articles/360009972759-What-are-the-requirements-for-using-Paystack-as-a-Registered-Business-
- Paystack Nigeria compliance: Starter needs a government-issued ID, BVN, personal bank account and owner details, and "the names must match". Registered businesses supply CAC documents by registration type. https://support.paystack.com/en/articles/2123970
- Flutterwave Nigeria onboarding: Starter needs a website URL or social media page, a residential address with proof of address, estimated monthly sales, a business profile, BVN and NIN, and a valid ID. The page sets no starter limit. https://flutterwave.com/us/support/my-account/onboarding-requirements-for-using-flutterwave-in-nigeria

**6. Integration (code on screen in Segment 9)**
- Paystack Accept Payments: POST /transaction/initialize with email and amount in the subunit (kobo for NGN), verify with the reference, data.status "success". https://paystack.com/docs/payments/accept-payments/
- Paystack webhooks: x-paystack-signature is "a HMAC SHA512 signature of the event payload signed using your secret key", return 200 OK. https://paystack.com/docs/payments/webhooks/
- Flutterwave Standard (v3): POST https://api.flutterwave.com/v3/payments with tx_ref, amount, currency, redirect_url and customer. https://developer.flutterwave.com/v3.0/docs/flutterwave-standard-1
- Flutterwave verification: GET /v3/transactions/{id}/verify, check status "successful", amount and currency. https://developer.flutterwave.com/v3.0/docs/transaction-verification
- Flutterwave webhooks: the secret hash is sent "in a header called verif-hash", discard the request if it's missing or different, and the endpoint must return 200. https://developer.flutterwave.com/v3.0/docs/webhooks

**7. Corrections / careful wording**
- **"No cap."** Changed to "Flutterwave's pricing page doesn't list a maximum fee for local payments, so a bigger payment means a bigger fee." That says exactly what the page shows, without claiming no merchant anywhere has a custom rate.
- **Transfer fees.** The read-through said 100 naira for 5,000 and below. Both pricing pages say 10 naira, so the script says 10.
- **Volume discounts.** The read-through said "I think you can also negotiate volume discounts". Paystack's page says volume discounts are available for merchants who process large volumes, so the script quotes that. Flutterwave's page doesn't mention volume pricing, so the script doesn't claim it for Flutterwave.
- **Flutterwave countries.** The read-through said "about 12". The pricing page lists exactly twelve, so the script says "Flutterwave's pricing page has 12 African countries".
- **Paystack above 20,000 naira.** The read-through said Paystack is better for big orders "because of the 2,000 naira cap". Between 20,000 and about 126,667 naira the cap isn't involved yet, and Paystack is cheaper because of its lower percentage, so the line says "because of the lower percentage and the 2,000 naira cap".
- **USD settlement.** Paystack's pricing page calls it a public pilot, so the on-screen text says so.
- **"Paystack is always cheaper" / "Flutterwave is always cheaper."** Neither is true on listed prices. The script gives the order-size ranges.
- **VAT.** Flutterwave's page says its fees attract 7.5% VAT. Paystack's Nigerian pricing page doesn't mention VAT, so the fee maths leaves it out for both and says so.

---

## NOTES

- **Twelve segments became ten.** You didn't read the payment methods segment or the testing segment, so they're gone, along with their clips, shorts and the test cards in the description. The integration "what changes is the names" lines and the cross-link line at the end of the integration segment are also gone from the script. The Paystack and Flutterwave code still shows on screen during the four steps.
- **Cross-links:** kit 16 (Paystack in a Laravel app) and your first Paystack tutorial are no longer named on camera, but both are in the description. Use both as end screens.
- **Before recording, open two pages once:** paystack.com/pricing and flutterwave.com/ng/pricing. If any Nigerian fee has changed, the numbers in Segments 3 to 5, the main short, shorts 2 and 3, the image post and the carousel all need the same update.
- **Ten segments, twenty clips, a main short and six additional shorts.** Segment 5's on-screen table carries the video, so it's worth getting that graphic clean.
- **The poll and the "can you guess" tweet** only work if you come back and post the reply.

---

## WHAT CHANGED (from your 27 October read-through)

**Your read-through is the script.** Voice-to-text fixes only, plus the corrections below. Your order and wording are kept ("cute dresses app", "pretty dress orders", "kind of work the same way", "I'd lean a little bit towards Paystack", "on a bad day, your company is not stuck with one provider").

**Your directions, applied**
- The Stripe lines are out of the script, titles, shorts, clips, captions, tweets, carousel, essay, tags and hashtags. Stripe now appears only in one ready reply in section 8, in case someone asks.
- The old Flutterwave fee history is gone everywhere. The script only talks about what's on the pricing page now.
- "There is no cap on that page" is now "Flutterwave's pricing page doesn't list a maximum fee for local payments, so a bigger payment means a bigger fee." It means Flutterwave's fee keeps growing with the payment. Paystack's stops at 2,000 naira, and Flutterwave's page shows no such stopping point.
- Step 4 is now "the gateway also tells your server directly that the payment went through, with something called a webhook." The closing-the-tab explanation is gone.

**Facts corrected from the read-through**
- Transfer fee for 5,000 naira and below is 10 naira, not 100 (both pricing pages).
- Flutterwave's country count is exactly twelve on its pricing page, not "about 12".
- "I think you can negotiate volume discounts" is now what Paystack's page says, that merchants who process large volumes get a discount.
- Paystack being cheaper above 20,000 naira is "because of the lower percentage and the 2,000 naira cap", since the cap only starts at about 126,667 naira.
- "Paying a writer whose book you sell" became "paying a designer whose dresses you sell", to match the dress app.
- "If you're Nigerian, if you're setting up..." was garbled in the dictation, so it's now "If you're a Nigerian business setting up online payments".

**Added (small)**
- "also from their pricing page as of October 2026" on the Flutterwave fees line, so both companies are credited the same way.
- The 15-second open (Segment 1) is kept from the old script, trimmed to match what the video now covers. You didn't read it, so cut it if you'd rather start on "Paystack and Flutterwave are payment gateways."
- On-screen text for the transfer fees and the USD pilot.

**Removed because you didn't read them**
- How your customers can pay (cards, Verve, USSD, QR, Apple Pay, OPay), testing and test cards, the "what changes is the names" lines, the re-engagement line, the "two fees meet at 20,000 where both are 400" line, Flutterwave's "no starter limit, ask them" line, the cross-link line, and the closing comment question (it's in the pinned comment instead).
- Matching clips, shorts (the old fee-cap and test card shorts), tweets, replies and carousel slides were removed or replaced. New short 7 covers payouts and transfer fees.

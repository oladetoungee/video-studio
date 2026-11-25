# How to Add Paystack Payment to Your Laravel App: Content Kit
**A screen-recorded, build-along tutorial. A customer buys a book in the bookstore app, pays on Paystack, and gets the book once, and only after the payment is confirmed. It's the Laravel version of your Next.js Paystack video.**
**It goes in the order you build it. The payment flow on one diagram, then account and test keys, .env, the orders table and kobo, initializing the transaction, the callback and verify, test cards, webhooks with the signature check, testing webhooks locally, not giving the book twice, and going live.**
**Every endpoint, header and field is checked against Paystack's docs, and every Laravel line against the Laravel docs (12 and 13 where they differ). Every segment opens by naming its own step, so any of them can be cut into a clip.**

---

## TAG POOL (114 tags, every tag used anywhere in this kit, deduplicated)

paystack laravel, paystack laravel integration, how to add paystack payment, paystack payment integration, laravel paystack tutorial, paystack api tutorial, paystack webhook laravel, paystack verify transaction, paystack initialize transaction, accept payments in laravel, laravel payment gateway, paystack test cards, paystack callback url, paystack webhook signature, x-paystack-signature, paystack charge.success, paystack kobo, paystack nigeria, online payment nigeria, laravel http client, laravel webhook csrf, laravel 13, laravel 12, laravel tutorial, php payment integration, idempotency payments, payment gateway tutorial, ecommerce laravel, backend development, web development, laravel, php, gbemisola oladetoun, withgbemi, paystack integration, paystack tutorial, paystack amount, paystack amount in kobo, naira to kobo, paystack payment verification, payment security, hmac sha512 php, verify webhook signature, paystack webhook retry, paystack webhook 200, laravel queue webhook, webhook best practices, paystack duplicate webhook, laravel race condition, idempotent webhook, paystack test card number, paystack test mode, test payments, how paystack works, paystack payment flow, paystack redirect, callback vs webhook, what is a webhook, webhook explained, paystack webhook, paystack test keys, paystack secret key, paystack public key, paystack api keys, paystack public key vs secret key, api key security, sk_test, laravel env config, laravel services config, paystack laravel env, laravel config cache, laravel env null, laravel config cache env, env vs config laravel, laravel production bug, laravel orders table, laravel migration, paystack minimum amount, paystack authorization_url, laravel http withtoken, call external api laravel, paystack api php, paystack reference, laravel str ulid, laravel redirect away, paystack transaction reference, paystack callback laravel, payment verification, paystack callback security, verify payment before delivery, paystack verify, paystack data.status, paystack verify response, paystack status success, paystack api response, paystack test payment, paystack demo, laravel webhook, paystack webhook tutorial, laravel 419 webhook, laravel csrf except, preventrequestforgery laravel 13, webhook timeout, test webhooks locally, ngrok paystack, paystack webhook localhost, ngrok laravel, race condition database, conditional update sql, atomic update, paystack go live, paystack live keys, paystack live webhook, paystack activate business

## HASHTAG POOL (27 hashtags, every hashtag used anywhere in this kit)

#Shorts #paystack #laravel #php #webdev #backend #coding #programming #developer #nigeria #fintech #javascript #security #webhooks #queues #database #testing #nextjs #systemdesign #learntocode #techtok #api #debugging #devops #csrf #ngrok #backenddevelopment

---

## HOW THIS KIT IS BUILT

The angle is a single purchase. Someone clicks buy on a book, pays with a card, and the app has to give them the book only if the money really arrived, and only once. Everything in the video is in service of that one purchase, which keeps it concrete. It uses the redirect method (your server starts the payment and sends the customer to Paystack's checkout page), because it keeps every Paystack call on the server, which suits Laravel. Each step has a **[SCREEN: ...]** direction so you know what to have open while you talk, and the code blocks are complete, so you can copy them into your project before you record.

Structure: open, the payment flow on one diagram (restaurant receipt for the callback, the cashier calling the kitchen for the webhook), account and test keys, .env and config, the orders table and kobo, initializing the transaction, the callback and verify, test cards and a full test payment, webhooks (CSRF, signature, respond fast, queue), testing webhooks locally with a tunnel, not giving the book twice, and going live. It ends inside the going-live step with a comment question.

**QUESTIONS FOR YOU**
All story points are filled or written generally. No open questions.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** teleprompter format, one statement per line. **[SCREEN: ...]** lines tell you what should be on screen. Code stays up while you talk through it. Typing and clicking time is not in the word count, so expect the recording to run a few minutes longer than the spoken words alone.

---

**[SEGMENT 1: OPEN]**

**[SCREEN: the bookstore app, a book page for "Things Fall Apart" with a Buy for ₦5,000 button]**

Someone opens your bookstore app, picks a book, and clicks buy.

They pay with their card on Paystack.

Now your app has two jobs. Give them the book only if the payment really went through, and give it to them only once.

In this video, we'll add Paystack payments to a Laravel app, step by step. Test keys, the checkout, verifying the payment, webhooks, test cards, and going live.

Everything runs in test mode, so no real money moves until the very end.

---

**[SEGMENT 2: HOW A PAYSTACK PAYMENT WORKS]**

Before we write any code, let's look at how a Paystack payment actually works, because once you see the flow, the code makes sense.

**[SCREEN: a simple diagram with four numbered arrows between "Your Laravel app", "Paystack" and "Customer"]**

There are four steps.

First, your Laravel app tells Paystack, this customer wants to pay five thousand naira. Paystack gives you back a checkout link.

Second, you send the customer to that link. They pay on Paystack's own page, so their card details never touch your server.

Third, when they're done, Paystack sends them back to your app. That's called the callback.

Fourth, Paystack also sends a message straight to your server, in the background, to say this payment succeeded. That's called a webhook.

Think of it like a restaurant where you pay at the counter.

The cashier gives you a receipt, and you carry it back to your table. That's the callback.

But the cashier also calls the kitchen directly to say table six has paid. That's the webhook.

So if you drop your receipt on the way back, the kitchen still knows you paid.

**[~1:00 BEAT: the reason to keep watching is that most tutorials stop at the callback]**

And that's why we're building both.

If the customer closes the tab or loses network before Paystack sends them back, your callback never runs. The webhook still arrives.

---

**[SEGMENT 3: CREATE A PAYSTACK ACCOUNT AND GET YOUR TEST KEYS]**

To add Paystack to your app, you need a Paystack account and your test keys.

**[SCREEN: paystack.com, click Create free account, fill in the sign-up form]**

Go to paystack.com and create an account. It's free.

**[SCREEN: the dashboard, zoom in on the Test Mode label]**

When you log in, your dashboard is in test mode. Test mode means no real money moves, so you can try things as many times as you like.

**[SCREEN: open the Developers section of the dashboard where the API keys are. Menu names can differ slightly between the old and new dashboard, so point at whatever yours says]**

Now go to the developers section of your dashboard. That's where your API keys are.

You'll see two keys. A public key that starts with pk_test, and a secret key that starts with sk_test.

The public key is for code that runs in the browser or in a mobile app, like Paystack's popup checkout. We don't need it today, because we're using Paystack's redirect method, where every call stays on the server. I like that for Laravel.

The secret key is the one we need. It lets your server talk to Paystack as you, so treat it like a password.

Paystack's own docs say, "Don't commit your secret keys to git, or use them in client-side code."

**[SCREEN: click to reveal and copy the test secret key, then blur it in the edit]**

So copy your test secret key, and let's put it somewhere safe.

---

**[SEGMENT 4: ADD YOUR PAYSTACK KEY TO .ENV AND CONFIG]**

The safe place for your Paystack secret key in a Laravel app is the .env file.

**[SCREEN: open .env in the editor, scroll to the bottom]**

**[CODE ON SCREEN]**
```dotenv
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

A new Laravel app already lists .env in its .gitignore, so this file stays off GitHub.

**[SCREEN: open config/services.php, add the paystack entry at the bottom of the array]**

Then in config/services.php, add a paystack entry that reads it.

**[CODE ON SCREEN]**
```php
// config/services.php

'paystack' => [
    'secret_key' => env('PAYSTACK_SECRET_KEY'),
],
```

You might wonder why we don't just call env() inside the controller.

When you run php artisan config:cache in production, Laravel stops loading the .env file, and env() calls outside your config files return null.

So read env() in your config files, and use config() everywhere else.

---

**[SEGMENT 5: THE ORDERS TABLE AND WHY PAYSTACK USES KOBO]**

**[~3:00 BEAT: this is a mistake they can avoid today, so it lands as a payoff]**

Before Paystack can charge anyone for a book, we need to talk about kobo.

Paystack wants the amount in the smallest unit of the currency. For naira, that's kobo, and a hundred kobo makes one naira.

So if a book costs five thousand naira, you send five hundred thousand.

**[SCREEN: big text, ₦5,000 = 500000 kobo / send 5000 and the customer pays ₦50]**

If you send 5000 thinking it's naira, the customer pays fifty naira.

And fifty naira is the smallest amount Paystack lets you charge in naira, so that payment would even go through.

That's why I store my book prices in kobo from the start. No multiplying by 100 in random places, and no decimals.

Now we need a table to record each order.

**[SCREEN: terminal]**

**[CODE ON SCREEN]**
```bash
php artisan make:model Order -m
```

**[SCREEN: open the new migration file]**

**[CODE ON SCREEN]**
```php
// database/migrations/xxxx_xx_xx_create_orders_table.php

Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->foreignId('book_id')->constrained();
    $table->unsignedInteger('amount'); // in kobo
    $table->string('reference')->unique();
    $table->string('status')->default('pending');
    $table->timestamp('paid_at')->nullable();
    $table->timestamps();
});
```

The reference is our own ID for this payment. It's unique, because it's how we find the order again when Paystack talks back to us.

The status starts as pending. It only becomes paid after we've confirmed the money with Paystack.

**[SCREEN: open app/Models/Order.php]**

**[CODE ON SCREEN]**
```php
// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = ['user_id', 'book_id', 'amount', 'reference', 'status', 'paid_at'];

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

**[SCREEN: terminal]**

**[CODE ON SCREEN]**
```bash
php artisan migrate
```

---

**[SEGMENT 6: INITIALIZE A PAYSTACK TRANSACTION IN LARAVEL]**

To start a Paystack payment, you initialize a transaction. That's Paystack's name for asking for a checkout link.

**[SCREEN: Paystack API docs, Initialize Transaction, highlight the endpoint and the Authorization header]**

You send a POST request to api.paystack.co/transaction/initialize, with your secret key in the Authorization header as a Bearer token.

The two fields you must send are the customer's email and the amount, in kobo.

I'm also sending our own reference, and a callback_url, which is where Paystack sends the customer when they're done.

If you're using Laravel, the HTTP client makes this short. I'll put the Paystack calls in one small service class.

**[SCREEN: create app/Services/PaystackService.php]**

**[CODE ON SCREEN]**
```php
// app/Services/PaystackService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PaystackService
{
    private string $baseUrl = 'https://api.paystack.co';

    public function initialize(string $email, int $amount, string $reference, string $callbackUrl): array
    {
        return Http::withToken(config('services.paystack.secret_key'))
            ->acceptJson()
            ->post("{$this->baseUrl}/transaction/initialize", [
                'email' => $email,
                'amount' => $amount, // in kobo
                'reference' => $reference,
                'callback_url' => $callbackUrl,
            ])
            ->throw()
            ->json('data');
    }
}
```

withToken puts your key in the Authorization header as a Bearer token.

And post sends the data as JSON by default, which is what Paystack expects.

throw() means that if Paystack returns an error, Laravel throws an exception, instead of carrying on like nothing happened.

**[SCREEN: the sample response from the docs, highlight data.authorization_url]**

Paystack replies with three things inside data. An authorization_url, an access_code, and a reference.

The authorization_url is the checkout link, and that's the one we need.

**[OPTIONAL RE-ENGAGEMENT LINE]** Stay with me, because in the next minute the customer actually gets to pay.

Now the button. When the customer clicks buy, we create the order, ask Paystack for the link, and send them there.

**[SCREEN: terminal, then open app/Http/Controllers/PaymentController.php]**

**[CODE ON SCREEN]**
```bash
php artisan make:controller PaymentController
```

**[CODE ON SCREEN]**
```php
// app/Http/Controllers/PaymentController.php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function buy(Request $request, Book $book, PaystackService $paystack)
    {
        $order = Order::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'amount' => $book->price, // already in kobo
            'reference' => 'BOOK-' . Str::ulid(),
            'status' => 'pending',
        ]);

        $data = $paystack->initialize(
            email: $request->user()->email,
            amount: $order->amount,
            reference: $order->reference,
            callbackUrl: route('payment.callback'),
        );

        return redirect()->away($data['authorization_url']);
    }
}
```

The reference is BOOK, a dash, and a ULID, which is a unique ID Laravel can generate for you.

Paystack only allows letters, numbers, dashes, dots and equals signs in a reference, and a ULID is only letters and numbers, so it fits.

We use redirect()->away because the checkout link is outside our app.

**[SCREEN: routes/web.php]**

**[CODE ON SCREEN]**
```php
// routes/web.php

use App\Http\Controllers\PaymentController;

Route::middleware('auth')->group(function () {
    Route::post('/books/{book}/buy', [PaymentController::class, 'buy'])->name('books.buy');
    Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');
});
```

**[SCREEN: the book page Blade file]**

**[CODE ON SCREEN]**
```blade
<form method="POST" action="{{ route('books.buy', $book) }}">
    @csrf
    <button type="submit">Buy for ₦{{ number_format($book->price / 100) }}</button>
</form>
```

---

**[SEGMENT 7: THE PAYSTACK CALLBACK AND VERIFYING THE TRANSACTION]**

When a customer finishes paying on Paystack, Paystack sends them back to your callback URL, with the reference added to the URL.

**[SCREEN: browser address bar showing /payment/callback?reference=BOOK-01JB...]**

Something like /payment/callback, question mark, reference equals, and then your reference.

**[~6:00 BEAT: the rule that stops people giving away free books]**

Paystack's docs are very clear on this. Don't give the customer anything just because they reached your callback URL.

Anyone can type that URL into a browser with a reference on the end.

So before you give the book, you confirm the payment with Paystack.

**[SCREEN: Paystack API docs, Verify Transaction, highlight GET /transaction/verify/:reference]**

You do that with a GET request to /transaction/verify/ and then the reference, with the same secret key in the header.

**[SCREEN: back in PaystackService, add the verify method under initialize]**

**[CODE ON SCREEN]**
```php
// app/Services/PaystackService.php (add under initialize)

public function verify(string $reference): array
{
    return Http::withToken(config('services.paystack.secret_key'))
        ->acceptJson()
        ->get("{$this->baseUrl}/transaction/verify/" . rawurlencode($reference))
        ->throw()
        ->json('data');
}
```

**[SCREEN: the verify sample response, highlight the top-level "status": true and then data.status, data.amount, data.currency]**

Paystack sends back the whole transaction, and there are two status fields in it.

The status at the top only tells you the API call worked.

The one you care about is data.status, and you want it to say success.

Then check the amount. data.amount has to equal what the book costs, in kobo. And check the currency is NGN.

I'll put those checks in one class, because the webhook is going to use the exact same checks later.

**[SCREEN: create app/Actions/ConfirmOrderPayment.php]**

**[CODE ON SCREEN]**
```php
// app/Actions/ConfirmOrderPayment.php (first version)

namespace App\Actions;

use App\Models\Order;

class ConfirmOrderPayment
{
    public function handle(array $transaction): ?Order
    {
        $order = Order::where('reference', $transaction['reference'])->first();

        if (! $order
            || $transaction['status'] !== 'success'
            || (int) $transaction['amount'] !== $order->amount
            || $transaction['currency'] !== 'NGN') {
            return null;
        }

        // We'll make this part safe against double delivery later in the video.
        $order->update(['status' => 'paid', 'paid_at' => now()]);
        $order->user->books()->attach($order->book_id);

        return $order;
    }
}
```

The books() relationship is the customer's library. In my app it's a book_user table, but this is wherever your app gives someone access to what they bought.

**[SCREEN: back in PaymentController, add the callback method under buy]**

**[CODE ON SCREEN]**
```php
// app/Http/Controllers/PaymentController.php (add under buy)
// also add at the top: use App\Actions\ConfirmOrderPayment;

public function callback(Request $request, PaystackService $paystack, ConfirmOrderPayment $confirm)
{
    $reference = $request->query('reference');
    abort_unless($reference, 404);

    $order = $confirm->handle($paystack->verify($reference));

    if ($order?->status === 'paid') {
        return redirect()->route('library')->with('success', 'Payment confirmed. Enjoy your book!');
    }

    return redirect()->route('books.index')->with('error', 'We could not confirm your payment yet.');
}
```

If the payment is confirmed, we send them to their library. Send them wherever makes sense in your app.

If it isn't confirmed, we say we couldn't confirm it yet, because some payments are still processing when the customer lands back on your site. The webhook will catch those.

---

**[SEGMENT 8: PAYSTACK TEST CARDS AND YOUR FIRST TEST PAYMENT]**

To test your Paystack payment without real money, Paystack gives you test cards.

**[SCREEN: Paystack docs, Test Payments page, the test cards table]**

The simplest one is 4084 0840 8408 4081, with CVV 408. Use the expiry date shown on Paystack's test payments page.

That card succeeds straight away, without asking for a PIN or an OTP.

There's also a card that gets declined, 4084 0800 0000 5408 with CVV 001, and one for insufficient funds, 4084 0800 0067 0037 with CVV 787.

And if you want to see the PIN and OTP screens a lot of Nigerian customers go through, there are test cards for that too. I'll put the full list in the description.

**[SCREEN: run php artisan serve, log in to the bookstore, open "Things Fall Apart", click Buy for ₦5,000]**

So let's buy a book.

**[SCREEN: the Paystack checkout page, point at the test mode label and the ₦5,000 amount]**

I click buy, and I'm on Paystack's checkout page. You can see it's in test mode, and the amount is five thousand naira, so our kobo is right.

**[SCREEN: choose card, type the test card details, pay]**

I put in the test card and pay.

**[SCREEN: redirected back to the app, the library page with the success message and the book listed]**

And Paystack sends me back to the app, and the book is in my library.

**[SCREEN: the orders table in your database tool, the row with status paid and paid_at filled in]**

In the database, the order has gone from pending to paid.

**[SCREEN: Paystack dashboard, Transactions, the test transaction at the top]**

And in the Paystack dashboard, the transaction is there too.

**[OPTIONAL: repeat with the declined card, show the error, show the order still pending]**

**[~9:00 BEAT: the open question that pulls them into the webhook]**

So that works when everything goes well. But if the customer pays and closes the tab before Paystack sends them back, none of this code runs.

---

**[SEGMENT 9: PAYSTACK WEBHOOKS IN LARAVEL]**

A Paystack webhook is a POST request that Paystack sends straight to your server when something happens on your account.

When a payment succeeds, the event is called charge.success.

The webhook doesn't depend on the customer's browser at all. So if they close the tab, your server still finds out.

There are three parts to get right. The route and CSRF, the signature, and responding fast.

**[SCREEN: routes/web.php, add the webhook route outside the auth group]**

**[CODE ON SCREEN]**
```php
// routes/web.php (outside the auth group)

use App\Http\Controllers\PaystackWebhookController;

Route::post('/paystack/webhook', PaystackWebhookController::class);
```

Laravel protects every POST route in web.php with CSRF protection.

CSRF protection stops another website from submitting forms to your app on your user's behalf. Every form in your app sends a hidden token, which is what that @csrf line does, to prove the form came from your app.

Paystack doesn't have that token. So if you leave this route protected, Laravel rejects every webhook, usually with a 419.

So we exclude this one route in bootstrap/app.php.

**[SCREEN: bootstrap/app.php, inside withMiddleware]**

**[CODE ON SCREEN]**
```php
// bootstrap/app.php (Laravel 13)

->withMiddleware(function (Middleware $middleware): void {
    $middleware->preventRequestForgery(except: [
        'paystack/webhook',
    ]);
})
```

**[ON SCREEN NOTE: Laravel 12 uses $middleware->validateCsrfTokens(except: ['paystack/webhook']);]**

If you're on Laravel 12, the method is called validateCsrfTokens instead. Same idea.

Now, the signature.

Anyone on the internet can send a POST request to /paystack/webhook and pretend to be Paystack.

So Paystack signs every webhook. It takes the body of the request, runs it through HMAC SHA512 using your secret key, and puts the result in a header called x-paystack-signature.

You do the same calculation on your side. If your result matches the header, the request came from Paystack.

Think of it like a seal that only you and Paystack know how to make, because only you and Paystack have the secret key.

**[OPTIONAL RE-ENGAGEMENT LINE]** This check is short, but it's the one line that stops someone faking a payment, so stay for it.

**[SCREEN: terminal, then create the controller]**

**[CODE ON SCREEN]**
```bash
php artisan make:controller PaystackWebhookController --invokable
php artisan make:job ConfirmPaystackPayment
```

**[CODE ON SCREEN]**
```php
// app/Http/Controllers/PaystackWebhookController.php

namespace App\Http\Controllers;

use App\Jobs\ConfirmPaystackPayment;
use Illuminate\Http\Request;

class PaystackWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $signature = (string) $request->header('x-paystack-signature');

        $expected = hash_hmac(
            'sha512',
            $request->getContent(),
            config('services.paystack.secret_key')
        );

        if (! hash_equals($expected, $signature)) {
            abort(401);
        }

        if ($request->input('event') === 'charge.success') {
            ConfirmPaystackPayment::dispatch($request->input('data.reference'));
        }

        return response('OK', 200);
    }
}
```

We hash $request->getContent(), which is the raw body exactly as it arrived. If you rebuild the JSON yourself, the spacing or order can change, and the hash won't match.

hash_equals compares the two values safely.

And the last part, responding fast.

Paystack expects a 200 OK. If it doesn't get one, it counts the webhook as failed and sends it again. In live mode, that's every 3 minutes for the first 4 tries, then every hour for the next 72 hours.

Paystack's docs also warn that long-running tasks lead to a request timeout. So we don't do the real work inside the request. We put it on a queue, and reply 200 straight away.

**[SCREEN: open app/Jobs/ConfirmPaystackPayment.php]**

**[CODE ON SCREEN]**
```php
// app/Jobs/ConfirmPaystackPayment.php

namespace App\Jobs;

use App\Actions\ConfirmOrderPayment;
use App\Services\PaystackService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ConfirmPaystackPayment implements ShouldQueue
{
    use Queueable;

    public $tries = 5;

    public $backoff = 60;

    public function __construct(public string $reference) {}

    public function handle(PaystackService $paystack, ConfirmOrderPayment $confirm): void
    {
        $confirm->handle($paystack->verify($this->reference));
    }
}
```

The job verifies the transaction with Paystack again, then uses the same ConfirmOrderPayment class as the callback.

So whichever way the news arrives, it goes through the same checks.

If Paystack's API is slow for a moment, the job tries again, up to five times, a minute apart.

**[SCREEN: terminal]**

**[CODE ON SCREEN]**
```bash
php artisan queue:work
```

New Laravel apps use the database queue by default, so you need a queue worker running to process the job.

---

**[SEGMENT 10: TESTING PAYSTACK WEBHOOKS ON LOCALHOST]**

Paystack webhooks can't reach localhost, because localhost only exists on your own computer.

So to test webhooks while you build, you need a public URL that forwards to your app. A tunnelling tool like ngrok does this.

**[SCREEN: a second terminal]**

**[CODE ON SCREEN]**
```bash
php artisan serve
# in another terminal
ngrok http 8000
```

**[SCREEN: copy the https forwarding URL from ngrok]**

ngrok gives you an https link. Copy it, and add /paystack/webhook to the end.

**[SCREEN: Paystack dashboard, Developers section, paste it into the Test Webhook URL field and save]**

Then in your Paystack dashboard, in the developers section, paste it into the test webhook URL field and save.

**[SCREEN: make another test payment, then close the checkout tab straight after paying]**

Now make another test payment, and this time close the tab right after paying, so the callback never runs.

**[SCREEN: the queue:work terminal showing the ConfirmPaystackPayment job running, then the orders table showing paid]**

The webhook arrives, the job runs, and the order still becomes paid.

**[SCREEN: Paystack dashboard, Developers, Webhooks, a delivery with response code 200]**

In the new Paystack dashboard, under Developers and then Webhooks, you can see every webhook Paystack sent, what your server replied, and you can retry one from there.

Every time you restart ngrok on the free plan, the link changes, so update it in the dashboard.

---

**[SEGMENT 11: IDEMPOTENCY, OR HOW NOT TO GIVE THE BOOK TWICE]**

Your Paystack code has to be idempotent.

That's a big word for a simple idea. Doing the same thing twice should leave you in the same place as doing it once.

One payment can reach your code more than once, in a few ways.

On a normal successful payment, the callback runs and the webhook arrives, so that's already twice.

The customer can refresh the callback page.

Paystack resends a webhook if your server didn't reply with 200 in time.

And you can click retry on a webhook in the dashboard yourself.

Paystack's docs tell you to check that you haven't already given value for a transaction before you give it.

Think of a cashier who stamps your receipt PAID the moment they hand over your order. If you come back with the same receipt, they see the stamp and don't hand you another one.

Our stamp is the status column.

But checking first and then updating can still go wrong when two requests arrive at the same moment.

If the callback and the webhook both read the order at the same time, they both see pending, and they both give the book.

So we do the check and the update in one step, inside the database.

**[SCREEN: open app/Actions/ConfirmOrderPayment.php, replace the bottom half]**

**[CODE ON SCREEN]**
```php
// app/Actions/ConfirmOrderPayment.php (final version)

namespace App\Actions;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class ConfirmOrderPayment
{
    public function handle(array $transaction): ?Order
    {
        $order = Order::where('reference', $transaction['reference'])->first();

        if (! $order
            || $transaction['status'] !== 'success'
            || (int) $transaction['amount'] !== $order->amount
            || $transaction['currency'] !== 'NGN') {
            return null;
        }

        DB::transaction(function () use ($order) {
            // Only moves pending to paid. If it's already paid, nothing changes.
            $updated = Order::where('id', $order->id)
                ->where('status', 'pending')
                ->update(['status' => 'paid', 'paid_at' => now()]);

            if ($updated === 1) {
                $order->user->books()->attach($order->book_id);
            }
        });

        return $order->fresh();
    }
}
```

The update only changes the row if the status is still pending.

update() tells you how many rows it changed. Only one request can ever get a 1. Every other request gets 0, and it doesn't give the book.

And because it's inside a database transaction, if giving the book fails, the order goes back to pending, and the next retry can try again.

---

**[SEGMENT 12: GOING LIVE WITH PAYSTACK]**

When your Paystack integration works in test mode, going live is mostly swapping keys and URLs.

**[SCREEN: Paystack dashboard, the activate business prompt]**

First, activate your business on Paystack. They'll ask for your business details and review them before you can take live payments.

**[SCREEN: switch the dashboard toggle from Test to Live, open the Developers section]**

Then switch your dashboard to live mode, and copy your live secret key. It starts with sk_live.

**[SCREEN: production .env, blurred]**

Put it in your production .env file, never in your code.

If you cache your config in production, run php artisan config:cache again, so Laravel picks up the new key.

**[SCREEN: Developers section, the Live Webhook URL field]**

Set your live webhook URL. Test and live have separate webhook settings, so the ngrok link you used in testing doesn't carry over.

Make sure a queue worker is running on your server too, or the webhook jobs will just sit in the queue.

**[SCREEN: buy a cheap book on the live site with a real card, then show the transaction in the live dashboard]**

Then buy one cheap book yourself with a real card, and check it shows up in your Paystack dashboard and in your app's library.

If you're still deciding between Paystack, Flutterwave and Stripe, I have a separate video comparing them.

And tell me in the comments what you're going to sell with Paystack first.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("paystack laravel", "paystack integration in laravel" and "how to add paystack payment" are the phrases people type, and the last one matches the title of your 8.9% CTR video)
> 1. How to Add Paystack Payment to Your Laravel App — 47
> 2. Paystack Laravel Integration Tutorial (Step by Step) — 52
> 3. Laravel Paystack Payment Integration for Beginners — 50
> 4. Paystack Webhook in Laravel: Verify Payments Safely — 51
> 5. Accept Payments in Laravel with Paystack (Webhooks Too) — 55
> 6. Paystack API with Laravel: Initialize, Verify, Webhooks — 55
> 7. Paystack Payment Integration in Laravel (Full Tutorial) — 55

**CLICK-LED**
> 8. Sell Your First Book Online with Laravel and Paystack — 53
> 9. The Paystack Mistake That Gives Away Free Orders — 48
> 10. Why Your Laravel App Needs a Paystack Webhook — 45
> 11. Paystack in Laravel, From Test Card to Live Payments — 52
> 12. Stop Giving Customers Their Order Twice (Paystack) — 50

**RECOMMENDED: 1.** It puts the exact words from your best tutorial ("How to Add Paystack Payment to") in front of "Laravel App", so it catches both the Paystack searches and the Laravel searches, and people who liked the Next.js video will recognise it. **No title claims "in 15 minutes".** The spoken script is about 2,450 words, which is roughly 16 minutes at 150 words a minute before any typing or demo time, so the finished video will run longer than 15. If you cut it down to 15 or under in the edit, you can add "in 15 Minutes" to title 1 (it becomes 61 characters). Thumbnail pairing: the title says how, so the thumbnail shows the result, a phone or browser with the green Paystack "Payment successful" style screen and a book cover, with "₦5,000" as the only big text. Don't repeat "Laravel" or "Paystack" in big letters, since they're already in the title.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Sell Your First Book Online with Laravel and Paystack" (53). The video takes a real payment for a book from a live card at the end, so it delivers. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot. On the left, a checkout screen with a big "₦5,000" and a small green tick. No other words. Squint at it, and if the amount and the tick still read, it works. Backup thumbnail for the swap: the same layout with "PAID ✓" stamped on a book cover, which matches the receipt stamp from Segment 11.

**Recording notes:**
- Shoot two takes of Segment 1 (about 20 seconds), so you can pick the stronger one.
- Build the whole thing once before recording, with the code from this kit, so the demos in Segments 8 and 10 work first time. Then record the code going in, either typed or pasted in chunks, whichever you did for the Next.js video.
- Blur both secret keys in the edit (Segment 3 and Segment 12), even the test one.
- Segments 6, 7 and 9 are each over two minutes. Each has an optional re-engagement line marked inside it, or a beat.
- The closing is inside Segment 12 and doesn't refer back to anything specific, so the edit can end cleanly after the comment question.
- Estimated runtime: about 16 minutes of speaking (around 2,450 words), plus typing and demo time, so roughly 18 to 20 minutes before you tighten it. Speed up typing and dashboard clicks in the edit rather than cutting explanation. It's longer than the batch's 10-13 minute target because every step of a working integration is in it, and none of it is padding.

**Retention beats (marked in the script):**
- ~1:00 is the restaurant analogy in Segment 2, and "that's why we're building both."
- ~3:00 is the kobo trap at the start of Segment 5 (send 5000 and the customer pays ₦50).
- ~6:00 is in Segment 7, "Don't give the customer anything just because they reached your callback URL."
- ~9:00 is the end of Segment 8, "if the customer pays and closes the tab before Paystack sends them back, none of this code runs."
- By word count alone these land nearer 1:20, 3:45, 7:30 and 10:30, and the typing will push them later still. The order is what matters. Check where they actually land after editing.

**After publishing:**
- Post the X image post as the video goes live, and send the link to a few developers who'll actually build along and watch to the end.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. Tutorials often drop where the typing starts, so if there's a big dip in Segment 6, speed that part up in the next tutorial.
- Pin the comment in section 8, and link this video from the Next.js Paystack video's description and pinned comment, since that audience is the most likely to click.

---

## 3. YOUTUBE DESCRIPTION

> In this video, I show you how to add Paystack payment to a Laravel app, step by step. A customer buys a book, pays on Paystack, and gets the book only after the payment is confirmed, and only once.
>
> We start with how a Paystack payment works, then create a Paystack account and get your test keys, add them to .env, and set up an orders table with prices in kobo. Then we initialize a transaction with Laravel's HTTP client, redirect to Paystack's checkout, and verify the transaction in the callback. After that, we test with Paystack's test cards, add a webhook for charge.success with the x-paystack-signature check, test it on localhost with ngrok, make sure the customer never gets the book twice, and go live.
>
> What are you going to sell with Paystack first?
>
> CHAPTERS (add times after editing)
> 0:00 Adding Paystack payments to a Laravel app
> How a Paystack payment works
> Create a Paystack account and get your test keys
> Add your Paystack key to .env and config
> The orders table and why Paystack uses kobo
> Initialize a Paystack transaction in Laravel
> The callback and verifying the transaction
> Paystack test cards and your first test payment
> Paystack webhooks in Laravel
> Testing Paystack webhooks on localhost
> How not to give the book twice (idempotency)
> Going live with Paystack
>
> TEST CARDS USED IN THIS VIDEO (from Paystack's test payments page, as of October 2026)
> Success, no PIN or OTP: 4084 0840 8408 4081, CVV 408
> Declined: 4084 0800 0000 5408, CVV 001
> Insufficient funds: 4084 0800 0067 0037, CVV 787
> Success with PIN and OTP: 5060 6666 6666 6666 666, CVV 123, PIN 1234, OTP 123456
> Use the expiry date shown on the test payments page.
>
> SOURCES AND FURTHER READING
> Paystack, Accept Payments: https://paystack.com/docs/payments/accept-payments/
> Paystack API, Transactions (initialize and verify): https://paystack.com/docs/api/transaction/
> Paystack, Verify Payments: https://paystack.com/docs/payments/verify-payments/
> Paystack, Webhooks: https://paystack.com/docs/payments/webhooks/
> Paystack, Test Payments: https://paystack.com/docs/payments/test-payments/
> Paystack API, Authentication and keys: https://paystack.com/docs/api/authentication/
> Laravel docs, HTTP Client: https://laravel.com/docs/13.x/http-client
> Laravel docs, CSRF Protection (Laravel 13): https://laravel.com/docs/13.x/csrf
> Laravel docs, CSRF Protection (Laravel 12): https://laravel.com/docs/12.x/csrf
> Laravel docs, Queues: https://laravel.com/docs/13.x/queues
>
> My Next.js version of this tutorial: [LINK]
> Paystack vs Flutterwave vs Stripe: [LINK]
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (493 characters, under YouTube's 500 limit):**

paystack laravel, paystack laravel integration, how to add paystack payment, paystack payment integration, laravel paystack tutorial, paystack api tutorial, paystack webhook laravel, paystack verify transaction, paystack initialize transaction, accept payments in laravel, laravel payment gateway, paystack test cards, paystack callback url, paystack webhook signature, x-paystack-signature, paystack charge.success, paystack kobo, paystack nigeria, online payment nigeria, laravel http client

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

This is how to take a Paystack payment in a Laravel app, so the customer gets what they paid for, and only once.

**[THE FLOW]**

Your server asks Paystack for a checkout link. The customer pays on Paystack's page. Paystack sends them back to your callback, and it also sends your server a webhook.

**[KEYS AND KOBO]**

Put your test secret key in .env, never in your frontend. And send amounts in kobo. A five thousand naira book is five hundred thousand.

**[INITIALIZE]**

**[CODE ON SCREEN]**
```php
Http::withToken(config('services.paystack.secret_key'))
    ->post('https://api.paystack.co/transaction/initialize', [
        'email' => $user->email,
        'amount' => 500000,
    ]);
```

Then redirect to the authorization_url it gives you.

**[VERIFY]**

When they come back, don't trust the callback. Call transaction/verify with the reference, and check data.status is success and the amount matches.

**[WEBHOOK]**

For the webhook, exclude the route from CSRF, check the x-paystack-signature header with HMAC SHA512 and your secret key, and reply 200 fast. Do the work on a queue.

**[ONCE ONLY]**

The callback and the webhook both arrive, so only move the order from pending to paid in one database update, and give the book only if that update changed a row.

**[LAND]**

Test with Paystack's test cards, then swap to your live key and live webhook URL.

**Caption:** the whole Paystack + Laravel setup in 90 seconds, from test keys to going live 💳
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #php #webdev #backend #coding #programming #developer #nigeria #fintech
**Tags:** paystack laravel, paystack integration, laravel payment gateway, paystack tutorial

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: The kobo mistake (20-30 sec)

Paystack wants the amount in kobo, the smallest unit of naira.

A hundred kobo is one naira. So a five thousand naira book is five hundred thousand.

If you send 5000 thinking it's naira, your customer pays fifty naira.

And fifty naira is Paystack's minimum, so it goes through.

**Caption:** if you send Paystack 5000 for a ₦5,000 product, your customer pays ₦50. amounts are in kobo 😅
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #php #webdev #backend #coding #developer #nigeria #fintech #javascript
**Tags:** paystack kobo, paystack amount, paystack amount in kobo, naira to kobo

---

### SHORT 3: Don't trust the Paystack callback (25-35 sec)

When a customer finishes paying, Paystack sends them back to your callback URL with a reference on the end.

Anyone can type that URL into a browser.

So before you give anything, call Paystack's verify endpoint with that reference.

And check data.status, because the status at the top only means the API call worked.

**Caption:** reaching your callback page doesn't mean the customer paid. verify the transaction first 🔐
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #webdev #backend #security #coding #programming #developer #fintech
**Tags:** paystack verify transaction, paystack callback url, paystack payment verification, payment security

---

### SHORT 4: How Paystack signs a webhook (25-35 sec)

Anyone can send a POST request to your webhook URL and pretend to be Paystack.

So Paystack signs every webhook. It hashes the body with HMAC SHA512, using your secret key, and puts the result in the x-paystack-signature header.

You do the same calculation on the raw body. If it matches, it's Paystack.

**[CODE ON SCREEN]**
```php
hash_equals(
    hash_hmac('sha512', $request->getContent(), config('services.paystack.secret_key')),
    (string) $request->header('x-paystack-signature')
);
```

**Caption:** how to check a Paystack webhook really came from Paystack, in one line of PHP ✍️
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #php #webhooks #backend #security #coding #developer #webdev
**Tags:** x-paystack-signature, paystack webhook signature, hmac sha512 php, verify webhook signature

---

### SHORT 5: Reply 200 first (20-30 sec)

Paystack expects your webhook to reply with 200 OK.

If it doesn't, Paystack counts it as failed and sends it again. In live mode, every 3 minutes for the first 4 tries, then every hour for 72 hours.

So check the signature, put the real work on a queue, and reply 200 straight away.

**Caption:** your Paystack webhook should reply 200 fast and do the heavy work on a queue ⏱️
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #webhooks #backend #queues #php #coding #developer #webdev
**Tags:** paystack webhook retry, paystack webhook 200, laravel queue webhook, webhook best practices

---

### SHORT 6: Don't give the book twice (30-40 sec)

On every successful Paystack payment, your callback runs and your webhook arrives. That's the same payment, twice.

If both check the order at the same moment, both see pending, and the customer gets the book twice.

So do the check and the update in one step.

**[CODE ON SCREEN]**
```php
$updated = Order::where('id', $order->id)
    ->where('status', 'pending')
    ->update(['status' => 'paid', 'paid_at' => now()]);
```

Only one request can get a 1 back. Only that one gives the book.

**Caption:** the callback and the webhook both arrive for the same payment. this is how you give the book only once 📚
full video: [LINK]
**Hashtags:** #Shorts #laravel #paystack #php #backend #database #coding #programming #developer #webdev
**Tags:** idempotency payments, paystack duplicate webhook, laravel race condition, idempotent webhook

---

### SHORT 7: Paystack test cards (20-30 sec)

You can test Paystack without real money.

In test mode, the card 4084 0840 8408 4081 with CVV 408 succeeds without a PIN or an OTP.

4084 0800 0000 5408 with CVV 001 gets declined, so you can test your error page too.

The full list is on Paystack's test payments page.

**Caption:** the Paystack test cards I use to test success and declined payments 🧪
full video: [LINK]
**Hashtags:** #Shorts #paystack #testing #webdev #laravel #nextjs #coding #developer #fintech #nigeria
**Tags:** paystack test cards, paystack test card number, paystack test mode, test payments

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Screen-recorded segments crop to vertical well if you zoom into the code or the checkout page in the edit. Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: someone just clicked buy on your app
**Caption:** a customer clicks buy and pays on Paystack. now your app has to give them the book only if the payment really went through, and only once. this video adds Paystack to a Laravel app step by step.
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #webdev #backend #coding #programming #developer #nigeria
**Tags:** paystack laravel, how to add paystack payment, accept payments in laravel

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** how a Paystack payment works
**Caption:** your server asks Paystack for a checkout link, the customer pays on Paystack's page, Paystack sends them back to your callback, and it also sends your server a webhook. that's why you build both.
full video: [LINK]
**Hashtags:** #Shorts #paystack #webdev #backend #fintech #coding #programming #developer #systemdesign
**Tags:** how paystack works, paystack payment flow, paystack redirect, callback vs webhook

---

### CLIP 3 — subset of Segment 2
**Starts:** "Think of it like a restaurant where you pay at the counter." **Ends:** "...The webhook still arrives."
**Overlay:** callback vs webhook, explained
**Caption:** the callback is the receipt you carry back to your table. the webhook is the cashier calling the kitchen. if you drop the receipt, the kitchen still knows you paid.
full video: [LINK]
**Hashtags:** #Shorts #webhooks #webdev #backend #paystack #coding #developer #learntocode #techtok
**Tags:** callback vs webhook, what is a webhook, webhook explained, paystack webhook

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** how to get your Paystack test keys
**Caption:** create a free Paystack account, stay in test mode, and copy your test secret key from the developers section. the public key is for browser and mobile code, so you won't need it for a server-side setup.
full video: [LINK]
**Hashtags:** #Shorts #paystack #webdev #backend #coding #developer #fintech #nigeria #api
**Tags:** paystack test keys, paystack secret key, paystack public key, paystack api keys

---

### CLIP 5 — subset of Segment 3
**Starts:** "You'll see two keys." **Ends:** "...or use them in client-side code."
**Overlay:** Paystack public key vs secret key
**Caption:** the public key is for browser and mobile code. the secret key lets your server act as you, so it never goes in your frontend or on GitHub.
full video: [LINK]
**Hashtags:** #Shorts #paystack #security #webdev #backend #javascript #coding #developer #api
**Tags:** paystack public key vs secret key, api key security, paystack secret key, sk_test

---

### CLIP 6 — Segment 4 (whole)
**Overlay:** where to put your Paystack key in Laravel
**Caption:** put the secret key in .env, read it in config/services.php, and use config() everywhere else in your app.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #paystack #backend #webdev #coding #developer #security
**Tags:** laravel env config, laravel services config, paystack laravel env, laravel config cache

---

### CLIP 7 — subset of Segment 4
**Starts:** "You might wonder why we don't just call env() inside the controller." **Ends:** "...and use config() everywhere else."
**Overlay:** why env() returns null in production
**Caption:** after php artisan config:cache, Laravel stops loading .env, so env() outside your config files returns null. read env() in config, use config() everywhere else.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #backend #webdev #debugging #coding #developer #devops
**Tags:** laravel env null, laravel config cache env, env vs config laravel, laravel production bug

---

### CLIP 8 — Segment 5 (whole)
**Overlay:** setting up orders for Paystack payments
**Caption:** Paystack wants amounts in kobo, so the prices are stored in kobo from the start. then an orders table with a unique reference and a status that starts as pending.
full video: [LINK]
**Hashtags:** #Shorts #laravel #paystack #php #database #backend #webdev #coding #developer
**Tags:** laravel orders table, laravel migration, paystack kobo, ecommerce laravel

---

### CLIP 9 — subset of Segment 5
**Starts:** "Paystack wants the amount in the smallest unit of the currency." **Ends:** "...and no decimals."
**Overlay:** why Paystack amounts are in kobo
**Caption:** a hundred kobo is one naira, so a ₦5,000 book is 500000. send 5000 by mistake and your customer pays ₦50, which is Paystack's minimum, so it even goes through.
full video: [LINK]
**Hashtags:** #Shorts #paystack #nigeria #fintech #webdev #backend #coding #developer #javascript #laravel
**Tags:** paystack kobo, paystack amount in kobo, naira to kobo, paystack minimum amount

---

### CLIP 10 — Segment 6 (whole)
**Overlay:** initialize a Paystack transaction in Laravel
**Caption:** a POST to transaction/initialize with your secret key as a Bearer token, the email and the amount in kobo, then redirect the customer to the authorization_url Paystack sends back.
full video: [LINK]
**Hashtags:** #Shorts #laravel #paystack #php #api #backend #webdev #coding #developer
**Tags:** paystack initialize transaction, paystack authorization_url, laravel http client, laravel paystack tutorial

---

### CLIP 11 — subset of Segment 6
**Starts:** "If you're using Laravel, the HTTP client makes this short." **Ends:** "...and that's the one we need."
**Overlay:** calling the Paystack API with Laravel's Http client
**Caption:** withToken adds the Bearer header, post sends JSON by default, and throw() stops your app carrying on when Paystack returns an error.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #api #backend #paystack #coding #developer #webdev
**Tags:** laravel http client, laravel http withtoken, call external api laravel, paystack api php

---

### CLIP 12 — subset of Segment 6
**Starts:** "The reference is BOOK, a dash, and a ULID" **Ends:** "...because the checkout link is outside our app."
**Overlay:** what to use as your Paystack reference
**Caption:** Paystack only allows letters, numbers, dashes, dots and equals signs in a reference. a ULID from Laravel's Str helper fits, and redirect()->away sends the customer to the checkout link.
full video: [LINK]
**Hashtags:** #Shorts #laravel #paystack #php #backend #coding #developer #webdev
**Tags:** paystack reference, laravel str ulid, laravel redirect away, paystack transaction reference

---

### CLIP 13 — Segment 7 (whole)
**Overlay:** verify Paystack payments in your callback
**Caption:** the customer lands on your callback with a reference. call transaction/verify, check data.status is success, the amount matches in kobo and the currency is NGN, and only then give the book.
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #php #backend #security #webdev #coding #developer
**Tags:** paystack verify transaction, paystack callback url, paystack callback laravel, payment verification

---

### CLIP 14 — subset of Segment 7
**Starts:** "Paystack's docs are very clear on this." **Ends:** "...you confirm the payment with Paystack."
**Overlay:** POV: someone types your callback URL by hand
**Caption:** reaching your callback page doesn't prove anyone paid, because anyone can type that URL. confirm the payment with Paystack first.
full video: [LINK]
**Hashtags:** #Shorts #paystack #security #webdev #backend #fintech #coding #developer #laravel
**Tags:** paystack callback security, verify payment before delivery, paystack verify, payment security

---

### CLIP 15 — subset of Segment 7
**Starts:** "Paystack sends back the whole transaction, and there are two status fields in it." **Ends:** "...And check the currency is NGN."
**Overlay:** the two status fields in Paystack's response
**Caption:** the top-level status only means the API call worked. data.status is the one that says whether the payment succeeded. then check the amount and the currency.
full video: [LINK]
**Hashtags:** #Shorts #paystack #api #backend #webdev #debugging #coding #developer #fintech
**Tags:** paystack data.status, paystack verify response, paystack status success, paystack api response

---

### CLIP 16 — Segment 8 (whole)
**Overlay:** testing Paystack without real money
**Caption:** Paystack's test cards, then a full test purchase. click buy, pay on the test checkout, land back in the app with the book in the library and the order marked paid.
full video: [LINK]
**Hashtags:** #Shorts #paystack #testing #laravel #webdev #backend #coding #developer #fintech
**Tags:** paystack test cards, paystack test mode, paystack test payment, paystack demo

---

### CLIP 17 — Segment 9 (whole)
**Overlay:** Paystack webhooks in Laravel
**Caption:** a webhook route excluded from CSRF, the x-paystack-signature check with HMAC SHA512 and your secret key, a 200 reply straight away, and the real work on a queue.
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #webhooks #php #backend #security #coding #developer
**Tags:** paystack webhook laravel, paystack charge.success, laravel webhook, paystack webhook tutorial

---

### CLIP 18 — subset of Segment 9
**Starts:** "Laravel protects every POST route in web.php with CSRF protection." **Ends:** "...Same idea."
**Overlay:** why your webhook gets a 419 in Laravel
**Caption:** Paystack doesn't have your CSRF token, so Laravel rejects the webhook. exclude that one route in bootstrap/app.php. Laravel 13 calls it preventRequestForgery, Laravel 12 calls it validateCsrfTokens.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #csrf #webhooks #backend #debugging #coding #developer
**Tags:** laravel webhook csrf, laravel 419 webhook, laravel csrf except, preventrequestforgery laravel 13

---

### CLIP 19 — subset of Segment 9
**Starts:** "Now, the signature." **Ends:** "...hash_equals compares the two values safely."
**Overlay:** how to check a Paystack webhook is real
**Caption:** Paystack hashes the body with HMAC SHA512 using your secret key and sends it in x-paystack-signature. you hash the raw body the same way, and if they match, it came from Paystack.
full video: [LINK]
**Hashtags:** #Shorts #paystack #security #webhooks #php #laravel #backend #coding #developer
**Tags:** x-paystack-signature, paystack webhook signature, hmac sha512 php, verify webhook signature

---

### CLIP 20 — subset of Segment 9
**Starts:** "And the last part, responding fast." **Ends:** "...and reply 200 straight away."
**Overlay:** why your webhook should reply 200 fast
**Caption:** if Paystack doesn't get a 200 OK, it counts the webhook as failed and sends it again, every 3 minutes for the first 4 tries in live mode, then hourly for 72 hours.
full video: [LINK]
**Hashtags:** #Shorts #webhooks #paystack #backend #queues #laravel #coding #developer #webdev
**Tags:** paystack webhook retry, paystack webhook 200, webhook timeout, laravel queue webhook

---

### CLIP 21 — Segment 10 (whole)
**Overlay:** testing Paystack webhooks on localhost
**Caption:** Paystack can't reach localhost, so a tunnel like ngrok gives you a public https link. paste it into the test webhook URL, close the tab after paying, and watch the order still become paid.
full video: [LINK]
**Hashtags:** #Shorts #paystack #webhooks #ngrok #laravel #webdev #backend #coding #developer
**Tags:** test webhooks locally, ngrok paystack, paystack webhook localhost, ngrok laravel

---

### CLIP 22 — Segment 11 (whole)
**Overlay:** how not to give the book twice
**Caption:** one payment can reach your code more than once. move the order from pending to paid in one database update, and only give the book if that update changed a row.
full video: [LINK]
**Hashtags:** #Shorts #laravel #paystack #database #backend #php #coding #developer #webdev
**Tags:** idempotency payments, paystack duplicate webhook, idempotent webhook, laravel race condition

---

### CLIP 23 — subset of Segment 11
**Starts:** "But checking first and then updating can still go wrong" **Ends:** "...and it doesn't give the book."
**Overlay:** the race condition in payment code
**Caption:** if the callback and the webhook both read the order at the same moment, both see pending. a single conditional update means only one of them can win.
full video: [LINK]
**Hashtags:** #Shorts #database #backend #laravel #php #systemdesign #coding #programming #developer
**Tags:** race condition database, conditional update sql, laravel race condition, atomic update

---

### CLIP 24 — Segment 12 (whole)
**Overlay:** going live with Paystack
**Caption:** activate your business, switch to live mode, put the sk_live key in your production .env, set the live webhook URL, keep a queue worker running, then buy something cheap yourself.
full video: [LINK]
**Hashtags:** #Shorts #paystack #laravel #webdev #backend #fintech #nigeria #coding #developer
**Tags:** paystack go live, paystack live keys, paystack live webhook, paystack activate business

---

**Posting order:** 9 first (the kobo mistake is the easiest to understand cold), then 14 (typing the callback URL by hand), then 3 (callback vs webhook), then 19 (the signature), then 23 (the race condition), then 7 (env() returning null, which reaches Laravel people who don't use Paystack), then the rest in segment order.

---

## 6. CAPTIONS

### TikTok caption:
> a customer pays on Paystack and comes back to your app. this is how you make sure they actually paid, and that they only get their order once 💳
**Hashtags:** #paystack #laravel #webdev #backend #nigeria

### Instagram Reel caption:
> If you're building anything in Nigeria that takes money, you'll probably meet Paystack. This video adds Paystack payments to a Laravel bookstore app, step by step, from test keys to going live.
>
> You'll see how to start a payment, why you check it with Paystack before giving anything, and how a webhook still tells your server about the payment when the customer closes the tab. I also show how to make sure nobody gets their order twice, because the same payment usually reaches your code more than once.
>
> Full video on YouTube, link in bio.
>
> #paystack #laravel #webdev #backend #nigeria

### LinkedIn caption:
> What does it take to accept a Paystack payment in a Laravel app safely?
>
> Initializing a transaction from the server gives you a checkout link, so card details never touch your own server.
>
> Verifying the transaction with Paystack before you deliver anything closes the gap that a callback URL leaves open, since anyone can visit that URL.
>
> A webhook for charge.success covers the customers whose callback never runs because they closed the tab, and checking the x-paystack-signature header with your secret key means only Paystack can trigger it.
>
> Replying 200 quickly and doing the work on a queue stops Paystack from retrying a webhook you already received.
>
> Moving the order from pending to paid in a single conditional update makes sure the callback and the webhook, which usually both arrive, only deliver the order once.
>
> Full walkthrough: [LINK]
>
> #laravel #paystack #php #backenddevelopment #fintech

---

## 7. X / TWITTER

**The approach.** Same rules as the last kits. One image cheat sheet (image posts are what get reach), one short tips list, one quiz with your answer later, one "can you guess" with the answer as a reply, and single tweets that each name one situation and what happens. Lowercase, the way you type. The link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> paystack + laravel, the whole payment flow on one card. save it for when you build checkout

**Image content (one clean card in Canva):**
> **PAYSTACK + LARAVEL CHEAT SHEET**
> **1. Start the payment** · POST https://api.paystack.co/transaction/initialize · header Authorization: Bearer sk_test_... · send email + amount in kobo
> **2. Redirect** · send the customer to data.authorization_url
> **3. Callback** · Paystack sends them back with ?reference=...
> **4. Verify** · GET /transaction/verify/{reference} · check data.status = success, data.amount, data.currency
> **5. Webhook** · event charge.success · hash the raw body with HMAC SHA512 + secret key · compare with x-paystack-signature
> **6. Reply 200 fast** · do the work on a queue
> **7. Only once** · pending to paid in one update, give the book only if a row changed
> **Kobo** · ₦5,000 = 500000
> **Test card** · 4084 0840 8408 4081 · CVV 408

**Reply:**
> full walkthrough in laravel, step by step: [LINK]

---

### THE TIPS LIST

> paystack tips I'd give anyone building checkout
>
> 1. amounts are in kobo, so ₦5,000 is 500000
> 2. never give value just because the customer reached your callback url
> 3. check data.status in the verify response, the top-level status only means the api call worked
> 4. hash the raw request body when you check the webhook signature
> 5. reply 200 to the webhook first and do the work on a queue
> 6. your callback and your webhook will both arrive, so make sure the order can only be paid once

**Reply:** I build all of this in laravel here: [LINK]

---

### THE QUIZ

> a book costs ₦5,000. what amount do you send to paystack?
>
> A. 5000
> B. 500000
> C. 5000.00

**Your reply a few hours later:**
> it's B. paystack wants the amount in kobo, and 100 kobo is one naira. if you send 5000, your customer pays ₦50

---

### THE "CAN YOU GUESS" TWEET

> paystack's verify response has two status fields. one of them tells you if the payment succeeded and the other one doesn't. any guesses which is which?

**Your reply:**
> the top-level status only says the api call worked. data.status is the one that says success, failed or abandoned. check that one before you give anything

---

### THE LAUNCH TWEET

> made the laravel version of my paystack tutorial. a customer buys a book, we verify the payment, add a webhook, and make sure they never get it twice

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if your app gives the order on the paystack callback page without verifying, anyone who types that url with a reference can try to get something for free

> a customer pays on paystack and closes the tab before the redirect. your callback never runs. that's the payment your webhook catches

> your paystack webhook kept failing with 419 in laravel. paystack doesn't have your csrf token, so that route has to be excluded

> on every successful paystack payment, the callback runs and the webhook arrives. same payment, twice. so your code has to give the order only once

> env() returned null in production right after config:cache. read env in your config files and use config() everywhere else

> what are you building with paystack right now?

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what are you going to sell with Paystack first? and if you got stuck anywhere, tell me which step and I'll help 💳

### Instagram:
> the kobo one gets everybody at least once 😅

### TikTok:
> the callback and the webhook both arrive for the same payment, so please make sure your code only gives the order once

### LinkedIn:
> The part that took me longest to get right was the double delivery. The callback and the webhook usually both arrive, so a single conditional update from pending to paid decides who wins.

### X (reply to your own tweet):
> if you're testing webhooks on localhost, paystack can't reach it. use a tunnel like ngrok and paste the https link into your test webhook url

### REPLIES TO EXPECT (ready to paste)

**"Why not use a Laravel Paystack package?"**
> you can, there are good ones. I did it by hand so you can see what's happening underneath, and so you can debug it when something goes wrong

**"Can I use the popup instead of redirect?"**
> yes, paystack's popup uses your public key on the frontend. you still verify the reference on your server before giving anything, so most of this video still applies

**"Do I need to verify if I already checked the webhook signature?"**
> the signature tells you the webhook came from paystack. I still verify so the callback and the webhook go through exactly the same checks on amount and currency

**"My webhook signature never matches."**
> check that you're hashing $request->getContent(), the raw body, and using the secret key for the same mode (test or live) the payment was made in

**"Does this work for USD or other currencies?"**
> paystack supports a few currencies, and they're all sent in the smaller unit too, like cents. change the currency check to match yours

**"Why a queue? My webhook is fast."**
> paystack's docs say long-running tasks lead to timeouts, and a timeout means retries. a queue keeps the reply fast even when the paystack api is slow for a second

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** How to take a Paystack payment in a Laravel app, safely.
**Slide 2:** Your server asks Paystack for a checkout link with POST /transaction/initialize.
**Slide 3:** Amounts are in kobo, so a ₦5,000 book is 500000.
**Slide 4:** The customer pays on Paystack's page and comes back to your callback URL.
**Slide 5:** Don't give anything yet. Verify the reference with GET /transaction/verify.
**Slide 6:** Check data.status, the amount and the currency before you give the book.
**Slide 7:** A charge.success webhook tells your server even if the customer closed the tab.
**Slide 8:** Check the x-paystack-signature header, reply 200 fast, and do the work on a queue.
**Slide 9:** The callback and webhook both arrive, so move the order from pending to paid only once.

**Carousel caption:**
> the whole Paystack + Laravel payment flow on nine slides. the full step-by-step build is on YouTube, link in bio.
>
> #paystack #laravel #webdev #backend #nigeria

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Taking a Paystack Payment in Laravel Without Giving Anything Away Twice

### Subtitle:
> A walk through one book purchase, from the checkout link to the webhook, and the checks that make it safe.

### SEO Title:
> How to Add Paystack Payment to a Laravel App (With Webhooks)

### SEO Description:
> A step-by-step guide to Paystack in Laravel: initializing a transaction, verifying it, handling the charge.success webhook and its signature, test cards, idempotency and going live.

---

When someone clicks buy on a book in my bookstore app and pays with Paystack, the app has two jobs. It has to give them the book only if the money really arrived, and it has to give it to them only once. Most of the work in a Paystack integration is in those two sentences, so I built the whole thing around that one purchase.

The flow has four steps. Your server tells Paystack how much the customer wants to pay, and Paystack returns a checkout link. You send the customer to that link, and they pay on Paystack's own page, so their card details never touch your server. Paystack then sends them back to your callback URL, and it also sends your server a separate message, a webhook, to say the payment succeeded. I think of it like paying at the counter in a restaurant. The receipt you carry back to your table is the callback, and the cashier phoning the kitchen is the webhook. If you drop the receipt, the kitchen still knows you paid.

Starting the payment is a POST request to Paystack's transaction/initialize endpoint, with your secret key as a Bearer token. The only required fields are the customer's email and the amount, and the amount is in the currency's smallest unit. For naira that means kobo, so a ₦5,000 book is sent as 500000. If you send 5000 by mistake, the customer pays ₦50, which happens to be Paystack's minimum for naira, so nothing stops it. In Laravel, the HTTP client's withToken method adds the header and post sends JSON by default, so the call is a few lines. Paystack replies with an authorization_url, and you redirect the customer to it.

When the customer comes back, Paystack's documentation is direct about one rule. You shouldn't deliver value just because someone reached the callback URL, because anyone can visit it with a reference attached. Instead, you call the verify endpoint with that reference and read the transaction. The response has two status fields. The top-level one only says the API call worked, and the one inside data says whether the payment succeeded. I check that it says success, that the amount matches the price in kobo, and that the currency is NGN.

The callback alone has a gap. If the customer pays and closes the tab before the redirect, the callback never runs. The charge.success webhook covers that case, because it goes from Paystack to your server without the customer's browser. Since anyone could send a request to that URL, Paystack signs each webhook with an HMAC SHA512 hash of the body, made with your secret key, and puts it in the x-paystack-signature header. You compute the same hash over the raw request body and compare. In Laravel, the route also has to be excluded from CSRF protection, since Paystack has no CSRF token to send. Paystack expects a 200 reply, and it retries failed deliveries, every three minutes for the first four tries in live mode and then hourly for 72 hours, so the handler replies straight away and passes the real work to a queue.

That leaves the second job, giving the book only once. On a normal successful payment, the callback and the webhook both arrive, and a customer refreshing the page or a webhook retry adds more. Paystack's documentation tells you to check that you haven't already delivered value before delivering it. Checking and then updating in two steps still leaves room for both requests to see a pending order at the same moment. So the order moves from pending to paid in one conditional database update, and the book is attached only when that update changed a row. Only one request can ever get that result.

Testing all of this costs nothing. Paystack's test mode has cards for success, declines and insufficient funds, and a tunnel such as ngrok lets Paystack's test webhooks reach your laptop. Going live means activating your business on Paystack, putting the live secret key in your production environment, setting the live webhook URL, keeping a queue worker running, and then making one small real purchase yourself to check it lands in both the dashboard and the app.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Laravel, Paystack, PHP, Payments, Web Development

---

## 11. REFERENCES & SOURCES

**1. Paystack payment flow, initialize and verify**
- **Paystack, Accept Payments:** the redirect flow (server initializes, redirects to the checkout link, customer returns to callback_url with the reference as a query parameter), the rule not to deliver value just because the customer reached the callback, and checking data.status and data.amount. Supports Segments 2, 6 and 7. https://paystack.com/docs/payments/accept-payments/
- **Paystack API, Transactions:** POST /transaction/initialize with the Authorization: Bearer header and JSON body, required fields email and amount (in the subunit), optional reference, callback_url, currency and metadata; the response's data.authorization_url, data.access_code and data.reference; GET /transaction/verify/:reference; and the reference rule ("Only -, ., = and alphanumeric characters allowed"). Supports Segments 6 and 7. https://paystack.com/docs/api/transaction/
- **Paystack, Verify Payments:** the top-level status only reports whether the API call succeeded and the transaction status is data.status; possible statuses; and the advice to confirm you haven't already delivered value for a transaction, especially when you also use webhooks. Supports Segments 7 and 11. https://paystack.com/docs/payments/verify-payments/
- **Paystack API introduction, supported currencies:** amounts in the subunit, NGN subunit is kobo, ₦50 minimum. Supports Segment 5. https://paystack.com/docs/api/

**2. Keys**
- **Paystack API, Authentication:** pk_test/sk_test and pk_live/sk_live prefixes, the public key is for Paystack Inline and mobile SDKs, the secret key is for server requests, keys are on the Developers page of the dashboard, and the quote "Don't commit your secret keys to git, or use them in client-side code." Supports Segments 3 and 12. https://paystack.com/docs/api/authentication/

**3. Webhooks**
- **Paystack, Webhooks:** the x-paystack-signature header, HMAC SHA512 of the payload with your secret key, return 200 OK, return 200 before long-running tasks ("Long-running tasks lead to a request timeout and an automatic error response from your server"), live-mode retries every 3 minutes for the first 4 tries then hourly for 72 hours, test-mode retries hourly for 10 hours, charge.success, and the IP addresses (52.31.139.75, 52.49.173.169, 52.214.14.220) if you also want to allowlist. Supports Segment 9. https://paystack.com/docs/payments/webhooks/
- **Paystack support, Viewing and retrying webhooks from your Dashboard:** Developers then Webhooks on the new dashboard, delivery status and response code, retry, test and live stored separately, and "Make sure your system can handle repeated events safely." Supports Segments 10, 11 and 12. https://support.paystack.com/en/articles/10609026
- **Hookdeck, Guide to Paystack Webhooks:** secondary source confirming that the raw body must be hashed (re-serialised JSON can produce a mismatch), and the 30-second timeout on test deliveries. https://hookdeck.com/webhooks/platforms/guide-to-paystack-webhooks-features-and-best-practices

**4. Test cards**
- **Paystack, Test Payments:** 4084 0840 8408 4081 / CVV 408 (success, no validation), 4084 0800 0000 5408 / CVV 001 (declined), 4084 0800 0067 0037 / CVV 787 (insufficient funds), 5060 6666 6666 6666 666 / CVV 123 / PIN 1234 / OTP 123456 (PIN and OTP). The page listed an expiry of 10/27 when checked in October 2026, which is why the script says to use the expiry shown on the page. Supports Segment 8. https://paystack.com/docs/payments/test-payments/

**5. Laravel**
- **HTTP Client (Laravel 13):** withToken adds a Bearer token, data is sent as application/json by default, acceptJson, throw(), json(), default 30-second timeout. https://laravel.com/docs/13.x/http-client
- **CSRF Protection (Laravel 13):** `$middleware->preventRequestForgery(except: [...])` in bootstrap/app.php, with Stripe webhooks as the docs' own example; the middleware class is PreventRequestForgery. https://laravel.com/docs/13.x/csrf
- **CSRF Protection (Laravel 12):** the same exclusion uses `$middleware->validateCsrfTokens(except: [...])`. https://laravel.com/docs/12.x/csrf
- **Laravel 13 upgrade guide:** VerifyCsrfToken was renamed to PreventRequestForgery, and the old class names remain as deprecated aliases. https://laravel.com/docs/13.x/upgrade
- **Configuration:** after config:cache, the .env file isn't loaded and env() calls outside config files return null. https://laravel.com/docs/13.x/configuration
- **Queues:** ShouldQueue jobs with the Queueable trait, $tries and $backoff, queue:work, and the database queue as the default in new apps. https://laravel.com/docs/13.x/queues

**6. Corrections / careful wording**
- **"Paystack gives every webhook a unique ID you can deduplicate on."** Not documented. Paystack doesn't document an idempotency header, so the script deduplicates on your own order's status, keyed by the reference.
- **"Paystack only retries for 72 hours."** That's live mode only. Test mode retries hourly for 10 hours. The script says "in live mode."
- **Test card expiry.** Some tutorials say "any future date." Paystack's page lists a specific expiry, so the script points to the page instead of naming one.
- **"Verify in the callback is enough."** Paystack's own docs prefer webhooks for confirming status and warn about double delivery when you use both. The script builds both and makes them safe together.
- **"Bank transfers take longer, so the callback says pending."** I didn't find an official line that ties a specific channel to a pending callback, so the script only says "some payments are still processing when the customer lands back on your site," which matches the documented statuses (pending, processing, ongoing, queued).
- **Laravel 13 vs 12 CSRF.** Older tutorials put the exception in a VerifyCsrfToken middleware's $except array, which doesn't exist in new Laravel 11+ apps. The script uses the bootstrap/app.php method for each version.
- **Going live.** Paystack's developer docs I could load don't describe the account activation steps. The script says only that Paystack asks for your business details and reviews them before live payments. Check the current dashboard wording when you record.
- **"route() uses APP_URL for the callback."** I left this out on purpose. During a web request, Laravel builds URLs from the current request's host, so APP_URL isn't what decides the callback URL there.

---

## NOTES

- **What's new vs your Next.js Paystack video.** That one was frontend-first. This one keeps every Paystack call on the server, adds the verify step, a signed webhook, a queue, and the "only once" guard. The image cheat sheet in section 7 works for both audiences.
- **If you build it on the bookstore API instead of Blade.** Change the end of `buy()` to `return response()->json(['authorization_url' => $data['authorization_url'], 'reference' => $order->reference]);`, let your frontend do the redirect, set `callback_url` to a frontend page, and have that page call an API endpoint that runs the same verify and ConfirmOrderPayment code. Everything from Segment 7 onwards stays the same. The auth middleware becomes your API guard (for example Sanctum) instead of the session.
- **Before recording.** Create the books relationship on the User model (`belongsToMany(Book::class)`, with a book_user table) and named routes for `library` and `books.index`, or change those two redirects to routes your app already has.
- **Cross-links in this batch.** 17 (Paystack vs Flutterwave vs Stripe, linked in the closing), 15 (what happens when you send an API request, for people who want the HTTP basics under Segment 6), 13 (HTTP status codes, for 200 vs 401 vs 419 in the webhook), and 11 (registering a company in Estonia, if you mention invoicing).
- **Clips:** twelve segments, twenty-four clips (twelve whole, twelve subsets), seven shorts.
- **Before recording, Laravel version:** Segment 9 shows the CSRF exclusion for both. Laravel 13 uses `preventRequestForgery(except: [...])` and Laravel 12 uses `validateCsrfTokens(except: [...])`. Say the one that matches your project and keep the other as an on-screen note.
- **Before recording, prices in kobo:** the script stores book prices in kobo (500000 for ₦5,000). If your books table stores naira, change the column first or multiply by 100 in `buy()` and say so.
- **Decided:** the video uses web routes and a Blade button, because a redirect flow is easiest to show that way. The API version is in the note above.

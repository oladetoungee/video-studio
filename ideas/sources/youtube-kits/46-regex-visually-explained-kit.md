# Regex Explained Visually (How Regular Expressions Work): Content Kit
**A visual explainer for the thing developers joke about understanding by luck. It starts from one idea (a regex is a pattern the computer slides along your text, checking for a match at every position), then builds up literals, character classes, quantifiers, anchors, groups, alternation, and greedy vs lazy, until the scary email regex from the first 10 seconds reads like a sentence.**
**Then it shows three everyday uses (validation in Laravel, find-and-replace in your editor, searching logs with grep), a short history checked against primary sources (Kleene 1951, Thompson 1968, grep 1973), and why you still need to read a regex that AI wrote for you (Cloudflare's 2019 outage).**
**Every segment opens with its own topic and has a [MOTION] direction for your Claude Code motion tool. Every pattern in the script was tested in PHP, Python or grep before it went in.**

---

## TAG POOL (87 tags, every tag used anywhere in this kit, deduplicated)

regex, regex explained, regular expressions, regular expressions for beginners, how regex works, regex tutorial, learn regex, regex for beginners, regular expressions explained, regex visually explained, regex101, regex cheat sheet, character classes regex, regex quantifiers, regex anchors, regex capture groups, greedy vs lazy regex, regex alternation, regex email validation, laravel regex validation, php regex, preg_match, grep regex, regex find and replace vs code, catastrophic backtracking, redos, ai regex, chatgpt regex, what is regex, regex basics, pattern matching, web development, programming for beginners, gbemisola oladetoun, withgbemi, regex validation, regex start and end of string, regex phone number validation, regex lazy quantifier, regex non greedy, regex html tags, vs code regex replace, regex swap words, grep meaning, what does grep stand for, unix history, ken thompson, cloudflare outage 2019, regex performance, regex meme, regex matching explained, regex special characters, regex escaping, regex dot, regex literals, regex escape dot, regex any character, regex square brackets, regex shorthand, regex \d \w \s, regex \d meaning, regex \w meaning, regex plus star question mark, regex curly braces, regex repeat, regex word boundary, regex exact match, regex or, regex groups explained, how to read regex, email regex explained, regex breakdown, laravel validation rules, isbn regex, isbn 13 format, regex examples, laravel validation array, laravel email validation, laravel tips, search log files, laravel logs, laravel log errors, grep -E, regex history, stephen kleene, grep history, regex testing

## HASHTAG POOL (32 hashtags, every hashtag used anywhere in this kit)

#Shorts #regex #programming #coding #webdev #learntocode #developer #softwareengineering #codingtips #computerscience #tech #validation #backend #javascript #vscode #productivity #linux #unix #grep #techhistory #cloudflare #devops #techtok #codinghumor #bugs #laravel #php #books #debugging #ai #chatgpt #webdevelopment

---

## HOW THIS KIT IS BUILT

The angle is your own line, that regex "looks like a bunch of rubbish that just works," and the whole video is about taking that rubbish apart. Segment 1 puts a real email regex on screen and promises the viewer will be able to read it by the end. Segment 2 gives the one idea everything else hangs on, which is that the computer slides the pattern along the text and checks for a match at every position. Segments 3 to 8 add one piece at a time (literals and special characters, character classes, quantifiers, anchors, groups and alternation, greedy vs lazy), each shown on regex101 with characters lighting up. Segment 9 is the payoff, where the email regex from the opening gets read piece by piece. Segments 10 and 11 are the three real uses, with the Laravel validation code framed as "if you're using Laravel, for example". Segment 12 is the short history, and Segment 13 is about using AI to write regex and why you still have to read it, ending on a comment question.

The running examples come from the bookstore app (ISBNs, order notes, author names, Laravel logs), so it connects to your API series.

**Motion directions.** Every segment has a **[MOTION: ...]** line written for your Claude Code motion tool, plus **[SCREEN: regex101 ...]** lines for when you're recording the regex101 demos yourself. The motion tool handles the "pattern sliding along text" visuals. regex101 handles the "here it is in a real tool" moments. You can do either one alone for most segments if time is short.

**WHAT I TOOK FROM THE REFERENCE VIDEO.** Visually Explained's "Regular Expressions (Regex) - Visually Explained" (102K views, 11:29) taught three things. First, it does its demos live on regex101, so the viewer can follow along in a free tool, and this kit does the same. Second, its chapters go in building-block order (literals, then character classes, then quantifiers, then shorthands) and end with "Using AI for regex", so this kit follows a similar order and gives the AI part its own segment. Third, its tags are plain search phrases ("regex tutorial", "regex for beginners", "learn regex", "character class", "quantifier"), and the tag pool here follows that. None of their wording or examples are used. Everything here is built on your bookstore examples, and the "sliding pattern" idea, the email-regex payoff, the Laravel, editor and grep uses, the history and the Cloudflare story are all added on top.

**QUESTIONS FOR YOU**
None. Everything is written generally or from tested examples.

---

## 1. YOUTUBE VIDEO SCRIPT

**How this script is built:** every segment names its own topic in its first line or two, so a viewer landing anywhere (or a clip cut from it) knows what it's about. Keep regex101 open with the PCRE2 flavor selected and the "g" (global) flag on, so every match lights up, unless a direction says otherwise.

---

**[SEGMENT 1: OPEN]**

**[MOTION: the email regex below types itself out in the centre of the screen, one character at a time, in a monospace font. When it finishes, every character jitters slightly like it's noise. Then a single line of text slides under it: "by the end of this video, you'll read this."]**

**[ON SCREEN]**
```
^[\w.+-]+@[\w-]+\.[\w.-]+$
```

This is a regular expression, or regex for short.

There's a joke among developers that nobody understands regex. You don't read it, you just know it works.

It looks like a bunch of rubbish that just works.

And we use it all the time, for checking emails, searching code and cleaning up data.

So I'm going to show you the one idea behind every regex, then build it up piece by piece, until you can read this line like a sentence.

---

**[SEGMENT 2: WHAT A REGULAR EXPRESSION IS]**

**[MOTION: a line of text, "concatenate the cat", sits in the middle of the screen. A small see-through box with the letters "cat" in it starts at the very first letter and slides one character to the right at a time. At each stop, the letters under the box flash red when they don't match and green when all three match. It turns green at "con-CAT-enate" and again at "the CAT". Both green spots stay highlighted at the end.]**

A regular expression is a pattern that describes some text you're looking for.

The computer takes your pattern and slides it along your text, one position at a time, asking the same question at every position.

Does the text starting here match my pattern?

Say your pattern is just the word cat, and your text is, "concatenate the cat."

The computer starts at the first letter. Is this c-a-t? No, it's c-o-n.

So it moves one step to the right and checks again.

Inside "concatenate", it finds c-a-t. That's a match.

Then it keeps sliding, and it finds the cat at the end too.

**[SCREEN: regex101, pattern `cat`, test string `concatenate the cat`, both matches highlighted]**

Everything else in regex is a way of making that pattern smarter.

Instead of "the letters c-a-t", you can say "any digit", or "only at the start of the line".

**[~1:00 BEAT: once they have the sliding idea, every symbol after this is a small upgrade to the pattern, and the first one is next]**

So let's make the pattern smarter, one piece at a time.

---

**[SEGMENT 3: LITERALS AND SPECIAL CHARACTERS IN REGEX]**

**[MOTION: the pattern "3.5" slides along the text "3.5 and 3x5". It lights up green on "3.5", then also lights up green on "3x5", and the "x" pulses yellow to show the dot matched it. Then a backslash drops in front of the dot ("3\.5") with a small thud, the pattern slides again, and only "3.5" lights up.]**

In regex, most characters are literals. That means they match themselves.

But a few characters have special jobs.

**[ON SCREEN: the special characters . ^ $ * + ? ( ) [ ] { } | \ ]**

These are the ones that make regex look like rubbish. The first one is the dot.

A dot means any single character, except a new line.

So the pattern 3.5 matches 3.5, but it also matches 3x5, because the dot accepts any character in that spot.

**[SCREEN: regex101, pattern `3.5`, test string `3.5 and 3x5`]**

If you want a real full stop, you put a backslash in front of it.

The backslash makes a special character normal again. This is called escaping.

So backslash dot means an actual dot, and now only 3.5 matches.

**[CODE ON SCREEN]**
```
3.5     matches  3.5  3x5  3-5
3\.5    matches  3.5
```

The same goes for a real question mark or a real bracket. You escape it with a backslash.

---

**[SEGMENT 4: CHARACTER CLASSES IN REGEX]**

**[MOTION: a row of square brackets opens like a little gate, "[aeiou]". The text "regular expression" sits underneath. The gate slides along the text one letter at a time, and every vowel it passes over drops through the gate and lights up green, while consonants bounce off. Then the gate changes to "[0-9]" and slides over "Order 1042: 2 copies", and only the digits drop through.]**

A character class in regex means, match any one of these characters, and you write it with square brackets.

So a, e, i, o, u inside square brackets matches any one vowel.

**[SCREEN: regex101, pattern `[aeiou]`, test string `regular expression`]**

You can also use a range with a dash.

0 to 9 in square brackets means any one digit, and small a to small z means any lowercase letter.

If you put a little hat, the caret, right after the opening bracket, it flips the meaning.

So caret 0 to 9 means any one character that is not a digit.

**[CODE ON SCREEN]**
```
[aeiou]       any one vowel
[0-9]         any one digit
[A-Za-z]      any one letter
[^0-9]        any one character that is NOT a digit
```

Some classes are used so often that they have shortcuts.

Backslash d means any digit.

Backslash w means any "word character", which is a letter, a digit or an underscore.

Backslash s means any whitespace, like a space, a tab or a new line.

The capital versions mean the opposite. So capital D is anything that isn't a digit.

**[CODE ON SCREEN]**
```
\d    a digit                \D    not a digit
\w    a letter, digit or _   \W    not a word character
\s    a space, tab, newline  \S    not whitespace
```

On a bookstore order note, "Order 1042: 2 copies, 15000 naira", backslash d lights up every digit.

**[SCREEN: regex101, pattern `\d`, test string `Order 1042: 2 copies, 15000 naira`]**

But one at a time. To get the whole number, you need a quantifier.

---

**[SEGMENT 5: QUANTIFIERS IN REGEX]**

**[MOTION: the pattern "\d" sits over "Order 1042". A small "+" flies in and attaches to it. The highlight on "1" stretches like a rubber band over "0", "4", "2", and stops at the space, so "1042" is one green block. Then a side panel shows the quantifier list, and each one gets a tiny demo: "colou?r" sliding over "color colour", with the "u" fading in and out.]**

A quantifier in regex says how many times the thing right before it can repeat.

There are four you'll use all the time.

The plus sign means one or more.

So backslash d plus means one or more digits in a row.

Now 1042 comes out as one match, and so does 15000.

**[SCREEN: regex101, pattern `\d+`, test string `Order 1042: 2 copies, 15000 naira`, matches 1042, 2 and 15000]**

The star means zero or more, so the thing is allowed to not be there at all.

The question mark means zero or one. In other words, optional.

So colou, question mark, r matches both color and colour.

And curly braces give an exact number.

Backslash d with 4 in curly braces means exactly four digits, and 2 comma 4 means between two and four.

**[CODE ON SCREEN]**
```
+        one or more          \d+        1042
*        zero or more         \d*        1042, or nothing
?        zero or one          colou?r    color, colour
{4}      exactly 4            \d{4}      2026
{2,4}    between 2 and 4      \d{2,4}    42, 104, 1042
```

The one thing to remember with quantifiers is that they only apply to the thing right before them.

So in colou, question mark, r, only the u is optional.

**[~3:00 BEAT: they can now write a useful pattern; anchors are next, and they're the reason a lot of validation regex is broken]**

**[OPTIONAL RE-ENGAGEMENT: And if you've ever copied a validation regex from the internet, the next part might explain why it let bad data through.]**

---

**[SEGMENT 6: ANCHORS AND WORD BOUNDARIES IN REGEX]**

**[MOTION: the pattern "\d{11}" slides along "my number is 08000000000123 ok". It lights up green on the first eleven digits, even though the number is longer. A red warning flashes. Then a "^" pins itself to the left edge of the text box and a "$" pins itself to the right edge, like two nails, and the pattern now refuses to match. Second part: "\bcat\b" slides over "concatenate the cat", and two thin vertical lines appear at the edges of the word "cat" at the end, while the "cat" inside "concatenate" stays grey.]**

Anchors in regex don't match any characters. They match a position.

The caret, outside square brackets, means the start of the text. The dollar sign means the end.

This matters for validation.

Say you want to check that a phone number is exactly eleven digits, and you write backslash d, 11 in curly braces.

That pattern slides along the text looking for eleven digits in a row anywhere.

So a fourteen-digit number with words around it still matches.

**[SCREEN: regex101, pattern `\d{11}`, test string `my number is 08000000000123 ok`]**

Add a caret at the start and a dollar at the end.

Now the whole input has to be eleven digits and nothing else.

**[CODE ON SCREEN]**
```
\d{11}       finds 11 digits anywhere in the text
^\d{11}$     the WHOLE text must be exactly 11 digits
```

So if you're validating something, you almost always want the caret and the dollar.

One more anchor is backslash b. It means a word boundary, the point where a word starts or ends.

Without it, the pattern cat also matches the cat inside "concatenate".

With backslash b on both sides, it only matches cat as a whole word.

**[SCREEN: regex101, pattern `\bcat\b`, test string `concatenate the cat`, only the last "cat" matches]**

---

**[SEGMENT 7: GROUPS AND ALTERNATION IN REGEX]**

**[MOTION: round brackets wrap around "ha", and the pair "(ha)" turns into one solid tile. A "+" attaches to the tile, and the tile repeats across "hahaha", stamping three times. Then a "|" appears as a fork in a road: "Mr" goes up one branch, "Mrs" up another, "Ms" up the third, all merging back into one road, and the text "Mrs Obi and Mr. Bello and Ms Ade" lights up at each title.]**

Groups in regex let you treat several characters as one unit. You make a group with round brackets.

A quantifier only applies to the thing right before it.

So ha plus means h, then one or more a's. Haaaa.

But if you put ha inside brackets and then the plus, the plus applies to the whole group. So it matches ha, haha, hahaha.

**[CODE ON SCREEN]**
```
ha+      ha, haa, haaaa
(ha)+    ha, haha, hahaha
```

Groups also do a second job. They capture.

Whatever matched inside the brackets gets saved, so you can use it later, for example in find-and-replace.

Then there's alternation, the vertical bar. It means or.

So cat, bar, dog matches cat or dog.

You'll usually put it inside a group.

So for customer names with titles, you write a group with Mr, or Mrs, or Ms, then an optional dot, a space, and a word.

**[CODE ON SCREEN]**
```
(Mr|Mrs|Ms)\.? \w+
```

**[SCREEN: regex101, that pattern, test string `Mrs Obi and Mr. Bello and Ms Ade`]**

That matches Mrs Obi, Mr. Bello with the dot, and Ms Ade.

---

**[SEGMENT 8: GREEDY VS LAZY IN REGEX]**

**[MOTION: the text "<b>Bold</b> and <i>this</i>" sits on screen. The pattern "<.+>" starts at the first "<" and its highlight runs hungrily all the way to the very last ">" at the end of the line, swallowing everything, with a little "greedy" label. Then a "?" drops in after the "+", and the highlight now stops at the first ">" it reaches, giving four small green blocks: "<b>", "</b>", "<i>", "</i>".]**

By default, quantifiers in regex are greedy. That means they grab as much text as they can and still make a match.

Say you want to find each tag in a bit of HTML, with a bold word and an italic word.

You try angle bracket, dot plus, angle bracket, and you expect four matches. You get one.

**[SCREEN: regex101, pattern `<.+>`, test string `<b>Bold</b> and <i>this</i>`]**

The dot plus grabs everything, all the way to the last angle bracket at the end of the line, because every character in between counts as "any character".

Add a question mark after the plus, and it becomes lazy. It takes as little as it can.

So it stops at the first closing bracket it reaches, and you get four matches, one per tag.

**[CODE ON SCREEN]**
```
<.+>     greedy: <b>Bold</b> and <i>this</i>   (one match)
<.+?>    lazy:   <b>  </b>  <i>  </i>          (four matches)
```

And for real HTML, use an HTML parser. Regex is fine for a quick search, but HTML has too many edge cases.

---

**[SEGMENT 9: HOW TO READ A REGEX, THE EMAIL EXAMPLE]**

**[~6:00 BEAT: the payoff, the "rubbish" from the first 10 seconds gets read out loud]**

**[MOTION: the email regex from the opening comes back. It splits apart into labelled chunks, each chunk floating up with a short plain-English label under it, in the order she reads them. Then the chunks snap back together and slide along "ada.obi+books@mail.example.co.uk", each chunk lighting up the part of the email it matched, in a different soft colour.]**

So let's read a real regex, one that checks the shape of an email address.

**[ON SCREEN]**
```
^[\w.+-]+@[\w-]+\.[\w.-]+$
```

Read it from left to right, one piece at a time.

The caret means start at the very beginning.

Then a character class with backslash w, a dot, a plus and a dash. So any one word character, dot, plus or dash.

Inside square brackets, the dot and the plus are normal characters again, so they don't need escaping.

The plus after the brackets means one or more of those. That's the name part, like ada.obi+books.

Then a literal at sign.

Then one or more word characters or dashes, for the first part of the domain, like mail.

Then backslash dot, a real dot, and one or more word characters, dots or dashes for the rest, like example.co.uk.

And the dollar sign means it must end there.

**[ON SCREEN: the pattern written out as a sentence. "Start. One or more of letters, digits, _ . + -. An @. One or more of letters, digits, _ -. A dot. One or more of letters, digits, _ . -. End."]**

So that whole line of rubbish says, some name characters, an at sign, a domain with at least one dot, and nothing else before or after.

**[SCREEN: regex101, the pattern with these test strings, one per line, with the "m" flag on so each line is tested on its own: `ada@example.com`, `ada.obi+books@mail.example.co.uk`, `ada@`, `ada@example`, `a b@example.com`. The first two match, the last three don't.]**

It's a rough check, though. Real email rules allow a lot more than this, so in real apps I'd use a proper email validator.

---

**[SEGMENT 10: REGEX FOR VALIDATION, WITH A LARAVEL EXAMPLE]**

**[MOTION: a form with three fields, ISBN, phone and email, slides in. Each field has a small padlock. Typed values go into each field, and the matching regex appears beside it and slides over the value. Good values turn the padlock green. A bad ISBN, "978038547454" with only twelve digits, turns its padlock red and shakes.]**

The first everyday use of regex is validation, checking that what someone typed into a form has the right shape.

In our bookstore, every book has an ISBN.

The modern ISBN is thirteen digits, and it starts with 978 or 979.

So the pattern is caret, 97, then 8 or 9 in square brackets, then ten digits, then dollar.

Thirteen digits, starting with 978 or 979, and nothing else.

**[SCREEN: regex101, pattern `^97[89]\d{10}$`, test strings `9780385474542` (matches) and `978038547454` (doesn't, it's only twelve digits)]**

If you're using Laravel, for example, there's a regex validation rule.

**[CODE ON SCREEN]**
```php
$request->validate([
    'isbn'  => ['required', 'regex:/^97[89]\d{10}$/'],
    'phone' => ['nullable', 'regex:/^\+?\d{10,15}$/'],
    'email' => ['required', 'email'],
]);
```

The pattern has a slash at each end, because Laravel passes it to PHP's preg_match function, which needs them.

The phone rule is an optional plus sign, then ten to fifteen digits.

Notice the rules are in an array instead of one string with vertical bars between them.

Laravel's docs warn that a vertical bar inside your regex can be mistaken for the bar between rules, so an array is safer.

And for email, Laravel has an email rule that checks against the actual email standards, and that's a better check than anything I'd write myself.

These patterns only check the shape. The ISBN regex can't tell you if the check digit is right, and the phone regex can't tell you if the number exists.

---

**[SEGMENT 11: REGEX IN FIND AND REPLACE, AND FOR SEARCHING LOGS]**

**[MOTION: part one, a list of authors written "Achebe, Chinua" and "Adichie, Chimamanda Ngozi". The pattern highlights the surname in one colour (group 1) and the first names in another (group 2). Then the two coloured blocks swap places with a smooth slide, and the comma disappears, leaving "Chinua Achebe" and "Chimamanda Ngozi Adichie". Part two, a scrolling wall of log lines in grey. A search bar types the grep pattern, and only the ERROR and CRITICAL lines light up red and slide forward, while the rest fade.]**

The second everyday use of regex is find-and-replace in your code editor.

In VS Code, for example, the dot-star button in the find box turns on regular expressions.

Say you have a list of authors written surname first, like "Achebe, comma, Chinua", and you want "Chinua Achebe".

**[CODE ON SCREEN]**
```
Find:     ^([^,]+), (.+)$
Replace:  $2 $1
```

The first group is everything that isn't a comma, so that's the surname.

Then a comma and a space, and the second group is everything else, the first names.

In the replace box, dollar 2 and dollar 1 mean what those groups captured, so you're swapping them.

And "Adichie, Chimamanda Ngozi" becomes "Chimamanda Ngozi Adichie", with both first names.

**[SCREEN: VS Code find and replace with regex on, run on the author list]**

The third everyday use is searching logs.

If you're using Laravel, for example, every line in your log file looks like this.

**[CODE ON SCREEN]**
```
[2026-10-26 09:14:03] production.ERROR: Payment failed for order 1042
[2026-10-26 09:15:10] production.INFO: Order 1043 created
[2026-10-26 09:20:44] production.CRITICAL: Database connection lost
```

grep, a command-line search tool, can pull out only the errors.

**[CODE ON SCREEN]**
```bash
grep -E "\.(ERROR|CRITICAL):" storage/logs/laravel.log
```

That says, a real dot, then ERROR or CRITICAL, then a colon.

The minus capital E tells grep to use extended regex, so the brackets and the vertical bar work as you'd expect.

One warning. grep has its own older flavor of regex, and backslash d doesn't work in it the way it does in PHP. So in grep, use 0 to 9 in square brackets for a digit.

**[OPTIONAL RE-ENGAGEMENT: Speaking of grep, that name is the reason regex is everywhere today, and the story of where it came from is short.]**

---

**[SEGMENT 12: WHERE REGULAR EXPRESSIONS CAME FROM]**

**[MOTION: a simple timeline slides in from the left, with a dot for each year. 1951 shows a hand-drawn network of circles labelled "Kleene, regular events". 1956 shows a book cover outline labelled "Automata Studies". 1968 shows an old terminal with "QED" and "Thompson". 1973 shows a terminal prompt typing "grep". Then a final dot labelled "today" fills with logo-free icons of a code editor, a form and a log file.]**

Regular expressions started as maths, long before anyone typed one into a computer.

In 1951, a mathematician called Stephen Kleene wrote a research memo at the RAND Corporation about a mathematical model of nerve cells.

He described the patterns of input those models could recognise, and called them regular events.

The star we use for "zero or more" is often called the Kleene star, after him.

In 1968, Ken Thompson, who later co-created Unix, published a paper called "Regular Expression Search Algorithm", and built regular expressions into a text editor called QED.

Then they went into ed, the editor he wrote for early Unix.

In ed, if you wanted to print every line that matched a pattern, you typed g, slash, your regular expression, slash, p. Global, regular expression, print.

g, r, e, p.

Brian Kernighan, who worked with Thompson at Bell Labs, tells the story like this.

A colleague, Lee McMahon, wanted to search the Federalist Papers, which were too big for ed. He asked Thompson, went home, and came back the next day to a program called grep.

grep shipped with Unix in 1973, and that's a big part of why regex ended up in so many tools.

And the joke about regex is old too. In 1997, a programmer called Jamie Zawinski wrote this.

**[ON SCREEN: "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems." Jamie Zawinski, 1997]**

**[~9:00 BEAT: last stretch, the AI question everyone has right now]**

---

**[SEGMENT 13: USING AI TO WRITE REGEX, AND WHY YOU STILL NEED TO READ IT]**

**[MOTION: a chat bubble pops up with "write me a regex for..." and a regex streams back into a second bubble. The regex drops onto a test bench with two trays labelled "should match" and "should NOT match". Example strings slide across the regex one by one, and each one lands in the right tray with a tick, until one bad string lands in the wrong tray with a red cross. Then, for the backtracking part, the pattern "(a+)+$" sits over a line of a's ending in "b", and a counter of "attempts" climbs faster and faster while a CPU bar fills red.]**

These days, a lot of us don't write regex from scratch anymore. We ask AI.

I think that's fine, because AI is good at regex.

But you still need to be able to read it, for three reasons.

The first reason is that it can look right and still be wrong.

So paste it into regex101 with two lists, things that should match and things that should not.

The second list is where the bugs usually show up. For the ISBN, that's twelve digits, fourteen digits, and a number starting with 977.

**[SCREEN: regex101, the ISBN pattern with the "m" flag on and a should-match / should-not-match list in the test string box]**

The second reason is flavors.

PHP, JavaScript and Python each have their own flavor of regex. The basics work the same in all three, but the advanced features can differ.

So tell the AI your language, and pick the same flavor on regex101, PCRE2 for PHP and ECMAScript for JavaScript.

The third reason is speed.

When a regex fails partway through a match, the engine can go back and try another way. That's called backtracking.

Some patterns give it so many ways to try that the work explodes.

The pattern on screen, run on a long line of a's with a b at the end, tries a huge number of ways to split up the a's before it gives up. Every extra a roughly doubles the work.

**[CODE ON SCREEN]**
```
(a+)+$     on   aaaaaaaaaaaaaaaaaaaaaaaab
```

That's called catastrophic backtracking.

On the 2nd of July 2019, Cloudflare had a global outage for about half an hour.

Their own write-up says a regular expression in one of their firewall rules backtracked so much that it used up the CPUs handling web traffic across their network.

And people wrote that regex, before today's AI coding tools. So the lesson is the same whoever writes it. Someone has to read it.

So if a pattern has a quantifier inside a group that also has a quantifier, test it on long, nasty input.

And ask the AI to explain each piece, left to right. If the explanation doesn't match what you need, you'll catch it.

So, what's the worst regex you've ever had to read? Paste it in the comments, and let's read it together.

---

## 2. YOUTUBE TITLE OPTIONS

**SEARCH-LED** ("regex explained", "regular expressions for beginners", "how regex works", "regex tutorial" and "learn regex" are the phrasings people type)
> 1. Regex Explained Visually (Regular Expressions for Beginners) — 60
> 2. Regular Expressions for Beginners: How Regex Works — 50
> 3. How Regex Works, Explained Visually — 35
> 4. Regex Tutorial for Beginners (With Real Examples) — 49
> 5. Regex Explained: Learn Regular Expressions Step by Step — 55
> 6. Learn Regex Visually: Character Classes, Quantifiers, Groups — 60
> 7. Regex for Beginners: Read Any Regular Expression — 48

**CLICK-LED**
> 8. Regex Looks Like Rubbish Until You See This — 43
> 9. You Can Read Regex. Here's How It Works — 39
> 10. Stop Copying Regex You Can't Read — 33
> 11. The One Idea That Makes Regex Make Sense — 40
> 12. Why AI-Written Regex Still Needs You — 36

**RECOMMENDED: 1.** "Regex explained" is the main search phrase and it sits in the first two words. "Visually" matches what the video is (the motion work and regex101 highlights), and it's the word the 102K-view reference video ranks with, so it pulls the same audience. The bracket adds "regular expressions for beginners", which is the second search phrase people use. It runs a little long, but the search phrase is in the part that never gets cut off on mobile. If you want it shorter, 3 ("How Regex Works, Explained Visually") is the backup. Thumbnail pairing: the title says "explained visually," so the thumbnail shouldn't say "regex explained". Show the scary pattern with part of it lit up instead (see 2b), so the title gives the topic and the thumbnail shows the "rubbish" turning readable.

---

## 2b. PACKAGING, RECORDING AND AFTER PUBLISHING

**Stretch title (one step past the literal truth, and the video still delivers it):** "Regex Looks Like Rubbish Until You See This" (title 8). It uses your own word, and the video delivers it in Segment 9, where the rubbish gets read like a sentence. Use it as the backup if title 1 underperforms.

**Thumbnail:** your face on the right, in your usual spot, with a squint-at-the-screen look. On the left, the email regex `^[\w.+-]+@[\w-]+\.[\w.-]+$` in big monospace text on a dark background, with one chunk (`[\w-]+`) highlighted in bright green, as if it's been decoded. No other words. Squint at it, and if you can still see "a wall of symbols with one bright part," it works. It doesn't repeat the title.

**Backup thumbnail (for the swap):** the sliding-box visual from Segment 2. A line of text with a glowing box sliding over it and one green match, your face on the right, and the word "rubbish?" as the only text.

**Recording notes:**
- Shoot two takes of Segment 1 (the first 20 seconds), so you can pick the stronger one.
- Record the regex101 screen parts separately from the talking parts. Every **[SCREEN: ...]** line tells you the exact pattern, test string and flags, so you can do them all in one sitting. Set the flavor to PCRE2 and keep the "g" flag on. Turn on "m" (multiline) for the Segment 9 and Segment 13 lists where every test string is on its own line.
- For the motion tool, every **[MOTION: ...]** line is written so it can be handed over as-is. The most important ones are Segment 2 (the sliding box, which is the idea the whole video hangs on), Segment 8 (greedy vs lazy) and Segment 9 (the email regex coming apart). If time is short, do those three as motion and the rest as regex101 screen recordings.
- When you read patterns out loud, say them the way the script spells them ("backslash d", "caret", "dollar"), so viewers learn the names of the symbols.
- Segments 4, 11 and 13 each run around 2 minutes. 11 and 13 have optional re-engagement lines, and Segment 4 ends on the hand-off to quantifiers.
- The closing is inside Segment 13 and doesn't refer back to anything, so the edit can end cleanly on the comment question.
- The script is about 2,300 spoken words, and a lot of them are short patterns read out with the screen, so expect roughly 13 to 14 minutes once the regex101 and motion moments have room. That's a little over the 10 to 12 you asked for, because every piece builds on the one before and cutting a building block would break the email payoff. If you want it nearer 12, the cleanest cuts are the phone rule in Segment 10 (keep the ISBN and email rules), the Zawinski quote at the end of Segment 12, and the HTML-parser line at the end of Segment 8. None of those are inside a clip's Starts/Ends quote except the Segment 12 whole clip, which still works without the quote.

**Retention beats (marked in the script):**
- ~1:00 is the end of Segment 2, after the sliding idea lands, with "let's make the pattern smarter, one piece at a time."
- ~3:00 is the end of Segment 5, when they can write a useful pattern, with the optional line promising why copied validation regex lets bad data through.
- ~6:00 is the start of Segment 9, the payoff where the opening regex gets read.
- ~9:00 is the end of Segment 12, going into the AI segment.

**After publishing:**
- Post the X image post (the regex cheat sheet) as the video goes live, and send the link to a few people who'll actually watch it all the way through.
- After 2 to 3 days, check views against your channel average. If it's clearly below, swap to the stretch title and the backup thumbnail. If it's doing well, leave it alone.
- In the first week, look at the retention graph around 1, 3, 6 and 9 minutes. If people leave in Segment 4 (the longest building-block segment), that's the part to tighten next time.

---

## 3. YOUTUBE DESCRIPTION

> Regex explained visually, for beginners. If regular expressions have always looked like a bunch of rubbish that somehow works, this video takes one apart piece by piece until you can read it.
>
> I start with the one idea behind every regex, that the computer slides your pattern along the text and checks for a match at every position. Then I build up from there with literals and escaping, character classes like [0-9] and \d, quantifiers like + and {2,4}, anchors like ^ and $, groups and alternation, and greedy vs lazy matching. After that, we read a real email regex out loud, then look at three everyday uses: validation (with a Laravel example), find-and-replace in VS Code, and searching log files with grep. At the end, there's a short history of where regex came from, and why you still need to read a regex that AI writes for you, including the Cloudflare outage caused by catastrophic backtracking. All the demos are on regex101.com, so you can follow along for free.
>
> What's the worst regex you've ever had to read?
>
> CHAPTERS (add times after editing)
> 0:00 Regex looks like rubbish
> What a regular expression is
> Literals and special characters
> Character classes
> Quantifiers
> Anchors and word boundaries
> Groups and alternation
> Greedy vs lazy
> Reading a real email regex
> Regex for validation (Laravel example)
> Find and replace, and searching logs with grep
> Where regular expressions came from
> Using AI to write regex
>
> SOURCES AND FURTHER READING
> regex101, the free tester used in this video: https://regex101.com/
> MDN, Regular expressions guide (JavaScript): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
> PHP manual, preg_match: https://www.php.net/manual/en/function.preg-match.php
> Laravel documentation, Validation (regex and email rules): https://laravel.com/docs/validation
> VS Code documentation, Find and Replace: https://code.visualstudio.com/docs/editing/codebasics
> S. C. Kleene, Representation of Events in Nerve Nets and Finite Automata (RAND, 1951): https://www.rand.org/pubs/research_memoranda/RM704.html
> Ken Thompson, Regular Expression Search Algorithm (Communications of the ACM, 1968): https://dl.acm.org/doi/10.1145/363347.363387
> Dennis Ritchie, An incomplete history of the QED text editor: https://www.bell-labs.com/usr/dmr/www/qed.html
> Brian Kernighan on the origins of grep (The New Stack): https://thenewstack.io/brian-kernighan-remembers-the-origins-of-grep/
> Cloudflare, Details of the Cloudflare outage on July 2, 2019: https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/
> OWASP, Regular expression Denial of Service (ReDoS): https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
> Jeffrey Friedl, the source of the "now you have two problems" quote: https://regex.info/blog/2006-09-15/247
>
> CONNECT WITH ME:
> LinkedIn: https://www.linkedin.com/in/gbemisola-oladetoun-3aa7071aa/
> Twitter/X: https://x.com/OladetounGee
> Instagram: https://www.instagram.com/officialgbemmy/
> Website: https://www.gbemisolaoladetoun.com/

---

## 4. YOUTUBE TAGS

**Paste-ready (470 characters, under YouTube's 500 limit):**

regex, regex explained, regular expressions, regular expressions for beginners, how regex works, regex tutorial, learn regex, regex for beginners, regular expressions explained, regex visually explained, regex101, regex cheat sheet, character classes regex, regex quantifiers, regex anchors, regex capture groups, greedy vs lazy regex, regex alternation, regex email validation, laravel regex validation, php regex, preg_match, grep regex, regex find and replace vs code

**The full tag pool at the top of this kit has every other tag, if you want to swap any in.**

---

## 5. MAIN SHORT (~90 sec, covers the whole video)

**[HOOK]**

This line of rubbish is a regular expression, and by the end of this short, you'll know how to read it.

**[ON SCREEN]**
```
^[\w.+-]+@[\w-]+\.[\w.-]+$
```

**[THE IDEA]**

A regex is a pattern. The computer slides it along your text, one position at a time, and checks for a match at every spot.

**[THE PIECES]**

Most characters match themselves. A dot means any character, and a backslash makes a special character normal again.

Square brackets mean any one of these, so 0 to 9 in brackets is any digit. Backslash d is the shortcut for that.

Plus means one or more. Star means zero or more. Question mark means optional. Curly braces give an exact count.

Caret means the start, and dollar means the end. Without them, your validation will match eleven digits hiding inside a longer string.

Round brackets make a group, and the vertical bar means or.

And a plus is greedy. It grabs as much as it can. Add a question mark after it to make it lazy.

**[READ IT]**

So this says, start, some name characters, an at sign, a domain with a dot, end.

**[REAL USES]**

You'll use this for form validation, like Laravel's regex rule, for find-and-replace in your editor, and for searching logs with grep.

**[CODE ON SCREEN]**
```php
'isbn' => ['required', 'regex:/^97[89]\d{10}$/'],
```

**[LAND]**

And if AI writes your regex, test it on regex101 with things that should fail too, because a badly written regex once took down Cloudflare for about half an hour.

**Caption:** regex looks like rubbish until you know the pieces. this is the whole video in 90 seconds, and it ends with reading a real email regex 🔍
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #webdev #learntocode #developer #softwareengineering #codingtips #computerscience #tech
**Tags:** regex explained, regular expressions for beginners, how regex works, learn regex, regex tutorial

---

## 5b. ADDITIONAL SHORTS

### SHORT 2: The one idea behind every regex (25-35 sec)

A regular expression is a pattern for some text you're looking for.

The computer takes that pattern and slides it along your text, one character at a time.

At every position, it asks one question. Does the text starting here match?

So the pattern cat, on "concatenate the cat", fails at c-o-n, moves along, matches inside concatenate, keeps going, and matches the cat at the end.

Everything else in regex is a way of making that pattern smarter.

**Caption:** every regex works the same way underneath. the computer slides your pattern along the text and checks for a match at every position 🔍
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #computerscience #webdev #codingtips #tech
**Tags:** how regex works, what is regex, regex explained, regular expressions for beginners

---

### SHORT 3: Why your validation regex needs ^ and $ (25-35 sec)

You want to check that a phone number is exactly eleven digits, so you write backslash d, eleven in curly braces.

But regex slides along the text looking for eleven digits in a row anywhere.

So a fourteen-digit number with words around it still passes.

Put a caret at the start and a dollar at the end. Now the whole input has to be exactly eleven digits, and nothing else.

**[CODE ON SCREEN]**
```
\d{11}      11 digits anywhere
^\d{11}$    the whole input is 11 digits
```

**Caption:** if your validation regex doesn't start with ^ and end with $, it's probably letting bad input through ✅
full video: [LINK]
**Hashtags:** #Shorts #regex #webdev #validation #programming #coding #developer #backend #codingtips #learntocode
**Tags:** regex anchors, regex validation, regex start and end of string, regex phone number validation

---

### SHORT 4: Greedy vs lazy regex (25-35 sec)

You want to find each HTML tag in "bold Bold, and, italic this", so you write angle bracket, dot plus, angle bracket.

You expect four matches. You get one long one.

That's because plus is greedy. It grabs as much as it can, all the way to the last angle bracket.

Add a question mark after the plus, and it becomes lazy. It stops at the first closing bracket, and you get four matches.

**[CODE ON SCREEN]**
```
<.+>     one match
<.+?>    four matches
```

**Caption:** a greedy regex grabs as much text as it can. one question mark makes it lazy, and it changes the whole result 👀
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #webdev #developer #learntocode #codingtips #javascript #softwareengineering
**Tags:** greedy vs lazy regex, regex lazy quantifier, regex non greedy, regex html tags

---

### SHORT 5: Swap names with regex find and replace (25-35 sec)

You have a list of authors written surname first, like "Achebe, Chinua".

In VS Code, turn on regex in the find box. Search for caret, a group of anything that isn't a comma, then comma space, then a group of everything else, then dollar.

Replace with dollar 2, space, dollar 1.

Dollar 1 is what the first group captured, and dollar 2 is the second. So you've swapped them, on every line at once.

**[CODE ON SCREEN]**
```
Find:     ^([^,]+), (.+)$
Replace:  $2 $1
```

**Caption:** you can swap "Achebe, Chinua" to "Chinua Achebe" on every line at once with regex find and replace in VS Code ✨
full video: [LINK]
**Hashtags:** #Shorts #vscode #regex #productivity #coding #programming #developer #codingtips #webdev #learntocode
**Tags:** regex find and replace vs code, regex capture groups, vs code regex replace, regex swap words

---

### SHORT 6: grep is a regex (20-30 sec)

The name grep comes from a command in an old Unix text editor called ed.

To print every line that matched a pattern, you typed g, slash, your regular expression, slash, p.

Global, regular expression, print. G, R, E, P.

Ken Thompson turned it into its own program, and it shipped with Unix in 1973.

**Caption:** grep stands for global, regular expression, print. it comes from a command in the ed text editor from early Unix 🖥️
full video: [LINK]
**Hashtags:** #Shorts #linux #unix #grep #regex #programming #computerscience #techhistory #developer #coding
**Tags:** grep meaning, what does grep stand for, grep regex, unix history, ken thompson

---

### SHORT 7: The regex that took down Cloudflare (30-40 sec)

On the 2nd of July 2019, Cloudflare had a global outage for about half an hour.

Their own write-up says the cause was a regular expression in a firewall rule.

When a regex fails to match, it can go back and try another way. That's called backtracking.

Some patterns give it so many ways to try that the work explodes, and this one used up the CPUs handling web traffic across their network.

So whether you or AI wrote the regex, test it on long, nasty input before it ships.

**Caption:** in 2019, one regular expression in a firewall rule caused a global Cloudflare outage. here's what catastrophic backtracking is ⚠️
full video: [LINK]
**Hashtags:** #Shorts #regex #cloudflare #programming #devops #webdev #softwareengineering #developer #techhistory #coding
**Tags:** cloudflare outage 2019, catastrophic backtracking, redos, regex performance

---

## 5c. CLIP BREAKDOWN (cut from the long video, auto-framed vertical)

**Every segment stands alone, so each one is a clip, plus overlapping clips pulled from inside the bigger segments.** Hashtags go in the Shorts / TikTok / Reels caption. Tags go in the YouTube tags field. Replace [LINK] once live.

---

### CLIP 1 — Segment 1 (whole)
**Overlay:** POV: you open a file and see a regex
**Caption:** regex looks like a bunch of rubbish that just works. this is the start of a video where we take one apart until you can read it.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #developer #webdev #learntocode #techtok #codinghumor
**Tags:** regex explained, regex meme, what is regex, regular expressions for beginners

---

### CLIP 2 — Segment 2 (whole)
**Overlay:** how regex actually works
**Caption:** the computer slides your pattern along the text one position at a time and checks for a match at every spot. that's the idea behind every regex.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #computerscience #developer #webdev #codingtips
**Tags:** how regex works, what is regex, regex explained, regex for beginners

---

### CLIP 3 — subset of Segment 2
**Starts:** "Say your pattern is just the word cat..." **Ends:** "...and it finds the cat at the end too."
**Overlay:** why "cat" matches inside "concatenate"
**Caption:** a regex for cat finds cat inside concatenate too, because the computer checks every position in the text, one step at a time.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #computerscience #codingtips
**Tags:** regex matching explained, how regex works, regex for beginners, pattern matching

---

### CLIP 4 — Segment 3 (whole)
**Overlay:** special characters in regex
**Caption:** most characters in a regex match themselves, but a few have special jobs. the dot matches any character, and a backslash turns a special character back into a normal one.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #webdev #codingtips
**Tags:** regex special characters, regex escaping, regex dot, regex literals

---

### CLIP 5 — subset of Segment 3
**Starts:** "The first one is the dot." **Ends:** "...and now only 3.5 matches."
**Overlay:** why 3.5 matches 3x5 in regex
**Caption:** a dot in regex means any character, so 3.5 also matches 3x5. a backslash before the dot fixes it.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #developer #codingtips #learntocode #webdev
**Tags:** regex dot, regex escape dot, regex escaping, regex any character

---

### CLIP 6 — Segment 4 (whole)
**Overlay:** character classes in regex
**Caption:** square brackets mean any one of these characters. ranges, the caret that flips the meaning, and the \d \w \s shortcuts, all on a bookstore order note.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #webdev #codingtips #computerscience
**Tags:** character classes regex, regex square brackets, regex shorthand, regex \d \w \s

---

### CLIP 7 — subset of Segment 4
**Starts:** "Some classes are used so often that they have shortcuts." **Ends:** "...So capital D is anything that isn't a digit."
**Overlay:** what \d \w and \s mean in regex
**Caption:** \d is a digit, \w is a letter, digit or underscore, and \s is whitespace. the capital versions mean the opposite.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #codingtips #learntocode #developer #webdev
**Tags:** regex shorthand, regex \d meaning, regex \w meaning, regex cheat sheet

---

### CLIP 8 — Segment 5 (whole)
**Overlay:** regex quantifiers, explained
**Caption:** plus, star, question mark and curly braces tell a regex how many times something can repeat, and they only apply to the thing right before them.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #webdev #codingtips
**Tags:** regex quantifiers, regex plus star question mark, regex curly braces, regex repeat

---

### CLIP 9 — Segment 6 (whole)
**Overlay:** regex anchors, explained
**Caption:** ^ and $ match the start and end of the text, and \b matches the edge of a word. here's why validation regex almost always needs them.
full video: [LINK]
**Hashtags:** #Shorts #regex #validation #programming #coding #webdev #backend #developer #codingtips
**Tags:** regex anchors, regex word boundary, regex start and end of string, regex validation

---

### CLIP 10 — subset of Segment 6
**Starts:** "Say you want to check that a phone number is exactly eleven digits..." **Ends:** "...Now the whole input has to be eleven digits and nothing else."
**Overlay:** why your validation regex lets bad input through
**Caption:** without ^ and $, a regex for eleven digits also passes a fourteen-digit number with words around it.
full video: [LINK]
**Hashtags:** #Shorts #regex #validation #webdev #backend #programming #coding #developer #codingtips #bugs
**Tags:** regex validation, regex anchors, regex phone number validation, regex exact match

---

### CLIP 11 — Segment 7 (whole)
**Overlay:** regex groups and alternation
**Caption:** round brackets group characters so a quantifier covers all of them, and save what they matched. the vertical bar means or.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #learntocode #developer #webdev #codingtips
**Tags:** regex capture groups, regex alternation, regex or, regex groups explained

---

### CLIP 12 — Segment 8 (whole)
**Overlay:** greedy vs lazy regex
**Caption:** a greedy quantifier grabs as much text as it can. one question mark makes it lazy, and four HTML tags stop being one long match.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #webdev #developer #javascript #codingtips #learntocode
**Tags:** greedy vs lazy regex, regex lazy quantifier, regex non greedy, regex html tags

---

### CLIP 13 — Segment 9 (whole)
**Overlay:** reading a real regex, piece by piece
**Caption:** this email regex looks like rubbish until you read it left to right, one piece at a time. here's every piece, out loud.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #webdev #learntocode #developer #codingtips #validation
**Tags:** how to read regex, regex email validation, email regex explained, regex breakdown

---

### CLIP 14 — Segment 10 (whole)
**Overlay:** regex validation in Laravel
**Caption:** an ISBN rule, a phone rule and an email rule in Laravel, why regex rules go in an array, and why I use Laravel's email rule instead of my own regex.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #regex #validation #backend #webdev #programming #developer #coding
**Tags:** laravel regex validation, laravel validation rules, php regex, preg_match

---

### CLIP 15 — subset of Segment 10
**Starts:** "In our bookstore, every book has an ISBN." **Ends:** "...starting with 978 or 979, and nothing else."
**Overlay:** a regex for ISBN numbers
**Caption:** a modern ISBN is thirteen digits starting with 978 or 979, and this regex checks exactly that shape.
full video: [LINK]
**Hashtags:** #Shorts #regex #programming #coding #webdev #validation #developer #codingtips #books
**Tags:** isbn regex, regex validation, isbn 13 format, regex examples

---

### CLIP 16 — subset of Segment 10
**Starts:** "Notice the rules are in an array..." **Ends:** "...and that's a better check than anything I'd write myself."
**Overlay:** a Laravel regex validation gotcha
**Caption:** if your regex has a vertical bar in it, Laravel can mistake it for the bar between rules, so its docs say to use an array.
full video: [LINK]
**Hashtags:** #Shorts #laravel #php #regex #validation #backend #webdev #developer #codingtips
**Tags:** laravel regex validation, laravel validation array, laravel email validation, laravel tips

---

### CLIP 17 — Segment 11 (whole)
**Overlay:** regex in your editor and your logs
**Caption:** swapping names on every line with find and replace in VS Code, and pulling only the errors out of a Laravel log file with grep.
full video: [LINK]
**Hashtags:** #Shorts #regex #vscode #grep #linux #laravel #programming #developer #codingtips #productivity
**Tags:** regex find and replace vs code, grep regex, search log files, laravel logs

---

### CLIP 18 — subset of Segment 11
**Starts:** "The second everyday use of regex is find-and-replace in your code editor." **Ends:** "...with both first names."
**Overlay:** regex find and replace in VS Code
**Caption:** turn on regex in the VS Code find box, capture two groups, and swap them with $2 $1 on every line at once.
full video: [LINK]
**Hashtags:** #Shorts #vscode #regex #productivity #coding #programming #developer #codingtips #webdev
**Tags:** regex find and replace vs code, regex capture groups, vs code regex replace, regex swap words

---

### CLIP 19 — subset of Segment 11
**Starts:** "The third everyday use is searching logs." **Ends:** "...So in grep, use 0 to 9 in square brackets for a digit."
**Overlay:** searching log files with grep
**Caption:** a grep command that pulls only the ERROR and CRITICAL lines out of a Laravel log, and why \d doesn't work the same way in grep.
full video: [LINK]
**Hashtags:** #Shorts #grep #linux #laravel #devops #regex #backend #debugging #developer #codingtips
**Tags:** grep regex, search log files, laravel log errors, grep -E

---

### CLIP 20 — Segment 12 (whole)
**Overlay:** where regex came from
**Caption:** regular expressions began as a maths idea in 1951, and Ken Thompson put them into text editors and then into grep. this is the short history.
full video: [LINK]
**Hashtags:** #Shorts #regex #techhistory #computerscience #unix #programming #developer #coding #grep
**Tags:** regex history, stephen kleene, ken thompson, grep history

---

### CLIP 21 — subset of Segment 12
**Starts:** "In ed, if you wanted to print every line that matched a pattern..." **Ends:** "...and that's a big part of why regex ended up in so many tools."
**Overlay:** what grep stands for
**Caption:** grep comes from g/re/p, a command in the ed editor for printing every line that matches a regular expression.
full video: [LINK]
**Hashtags:** #Shorts #grep #linux #unix #techhistory #computerscience #programming #developer #regex
**Tags:** what does grep stand for, grep meaning, unix history, ken thompson

---

### CLIP 22 — Segment 13 (whole)
**Overlay:** using AI to write regex
**Caption:** AI is good at writing regex, but you still need to read it. how to test it, why flavors matter, and the backtracking problem that has taken down real websites.
full video: [LINK]
**Hashtags:** #Shorts #regex #ai #programming #coding #developer #softwareengineering #codingtips #webdev #chatgpt
**Tags:** ai regex, chatgpt regex, regex testing, regex101

---

### CLIP 23 — subset of Segment 13
**Starts:** "When a regex fails partway through a match, the engine can go back and try another way." **Ends:** "...So the lesson is the same whoever writes it. Someone has to read it."
**Overlay:** the regex that took down Cloudflare
**Caption:** in 2019, a regular expression in a firewall rule backtracked so much that it used up the CPUs handling traffic across Cloudflare's network.
full video: [LINK]
**Hashtags:** #Shorts #regex #cloudflare #devops #softwareengineering #programming #developer #techhistory #webdev
**Tags:** cloudflare outage 2019, catastrophic backtracking, redos, regex performance

---

**Posting order:** 2 first (the core idea is the easiest to follow cold), then 10 (validation bug), then 12 (greedy vs lazy), then 18 (VS Code swap), then 23 (Cloudflare), then 21 (what grep stands for) as a lighter one, then 13 (reading the email regex). Space the whole-segment clips between the subset clips so the same footage doesn't run twice in a row.

---

## 6. CAPTIONS

### TikTok caption:
> regex looks like a bunch of rubbish that somehow works, so I took one apart piece by piece until it reads like a sentence 🔍
**Hashtags:** #regex #programming #coding #learntocode #webdev

### Instagram Reel caption:
> If regex has always looked like rubbish to you, you're not alone, and it's a lot simpler underneath than it looks.
>
> The computer takes your pattern and slides it along the text, checking for a match at every position. Every symbol you see in a regex is a small way of making that pattern smarter, like saying "any digit" or "only at the start of the line."
>
> I built it up one piece at a time on regex101, then read a real email regex out loud, and showed where you'd use it in real work.
>
> Full video on YouTube, link in bio.
>
> #regex #programming #coding #learntocode #webdev

### LinkedIn caption:
> How does a regular expression decide what to match?
>
> The computer slides the pattern along your text one position at a time, and at every position it checks whether the text starting there fits.
>
> Character classes like [0-9] let one spot in the pattern accept a whole set of characters instead of one exact letter.
>
> Quantifiers like + and {2,4} let that spot repeat, so \d+ catches the whole number 1042 instead of four separate digits.
>
> Anchors like ^ and $ stop the pattern from matching somewhere in the middle, which is why a validation regex without them lets bad input through.
>
> Groups and the | for "or" let you repeat, choose between and capture whole chunks, which is what makes find-and-replace with $1 and $2 possible.
>
> And since a lot of us now ask AI for our regex, reading it still matters, because a regex that backtracks badly once caused a global Cloudflare outage.
>
> Full walkthrough: [LINK]
>
> #softwareengineering #webdevelopment #programming #regex #laravel

---

## 7. X / TWITTER

**How this section works.** It follows what your X searches showed. Image cheat sheets get far more reach than text tweets, and the tweets that start conversations name one specific situation and what happens. So there's one image post, one tips list, one quiz, one "can you guess" tweet, the launch tweet, and single tweets that each say one specific thing. Everything is lowercase, no arrows, no hashtags, and the link always goes in a reply.

### THE IMAGE POST

**Tweet text:**
> every regex symbol you'll use most of the time, on one card

**Image content (one clean card in Canva):**
> **REGEX CHEAT SHEET**
> **.** · any one character (except a new line)
> **\\** · makes a special character normal (\\. is a real dot)
> **[abc]** · any one of a, b or c
> **[0-9]** · any one digit
> **[^0-9]** · any one character that is NOT a digit
> **\d \w \s** · digit · letter, digit or _ · whitespace
> **+** · one or more
> **\*** · zero or more
> **?** · optional (zero or one)
> **{3} {2,4}** · exactly 3 · between 2 and 4
> **^ $** · start of the text · end of the text
> **\b** · edge of a word
> **( )** · group, and save what matched
> **|** · or
> **+? \*?** · lazy, take as little as possible
> **example** · ^97[89]\d{10}$ is a 13-digit ISBN starting 978 or 979

**Reply:**
> I went through every one of these visually, with real examples on regex101: [LINK]

---

### THE TIPS LIST

> regex habits that would have saved me a lot of time
>
> 1. read it left to right, one piece at a time
> 2. if you're validating, start with ^ and end with $
> 3. test things that should NOT match, not only the ones that should
> 4. pick the right flavor on regex101 (PCRE2 for php, ECMAScript for js)
> 5. use a proper email validator, not your own email regex
> 6. if a quantifier sits inside a group that also has a quantifier, test it on long input

**Reply:** full video on all of these: [LINK]

---

### THE QUIZ

> you write the regex <.+> to find html tags in "<b>Bold</b> and <i>this</i>". how many matches do you get?
>
> A. 1
> B. 2
> C. 4
> D. 0

**Your reply a few hours later:**
> it's A, one match. the + is greedy, so .+ runs all the way to the last > on the line. add a ? after it, <.+?>, and you get the 4 tags

---

### THE "CAN YOU GUESS" TWEET

> grep is short for something. it comes from a command in a unix text editor from the early 70s. can you guess what it stands for?

**Your reply:**
> global, regular expression, print. in the ed editor you typed g/re/p to print every line matching a pattern, and ken thompson turned that into its own program

---

### THE LAUNCH TWEET

> made a video on regex, starting from the one idea behind it, then every symbol one at a time, until we read a real email regex out loud. it's very visual

**Reply:** [LINK]

---

### STANDALONE TWEETS

> if your phone number regex is \d{11} without ^ and $, a 14-digit number with words around it still passes

> a dot in regex means any character, so the pattern 3.5 also matches 3x5. you want 3\.5

> laravel's docs say to put regex rules in an array, because a | inside your pattern can get mistaken for the | between rules

> in 2019 a regex in a firewall rule caused a global cloudflare outage, because it backtracked so much it used up their cpus

> I ask ai for regex all the time now. I still paste every one into regex101 with a list of things that should fail before it goes anywhere near production

> what's the worst regex you've ever had to read? paste it below 👀

---

## 8. CREATOR COMMENTS

### YouTube (pin):
> what's the worst regex you've ever had to read? paste it here and let's take it apart together 😅

### Instagram:
> the one that clicked for me was the anchors part. a validation regex without ^ and $ is checking a lot less than you think.

### TikTok:
> the 3.5 matching 3x5 one gets everybody at least once 😭

### LinkedIn:
> The habit I'd push for in code review is asking for the "should not match" examples alongside any new regex, because that list is where most regex bugs show up.

### X (reply to your own tweet):
> quick check for your own codebase: search for regex: in your validation rules and see which ones are missing ^ and $

### REPLIES TO EXPECT (ready to paste)

**"Just use AI for regex, nobody needs to learn this."**
> I use AI for regex too. I just read what it gives me before it ships, because a regex can look right and still let bad input through, or be slow enough to hang your server

**"That email regex is wrong, emails can have way more characters."**
> yes, that's why I called it a rough check and said I'd use a proper validator in real apps. laravel's email rule checks against the actual email standards

**"Why not \d for the grep example?"**
> grep has its own older regex flavor, and \d doesn't work there the way it does in php or javascript, so [0-9] is the safe choice. some greps have a -P flag for perl-style regex, but not all of them

**"Regex isn't 'regular' anymore, backreferences break that."**
> true, the regex in modern languages can do things the original regular languages from kleene's work can't, like backreferences. the name stuck anyway

**"Parse HTML with regex?? 😭"**
> I said it in the video too, for real html use a parser. the tag example was only to show greedy vs lazy

**"What's the difference between * and +?"**
> + needs at least one, * is happy with zero. so \d+ needs at least one digit, and \d* also matches when there are no digits at all

---

## 9. INSTAGRAM CAROUSEL

**Slide 1:** regex looks like rubbish, but it's built from a few simple pieces.
**Slide 2:** the computer slides your pattern along the text and checks for a match at every position.
**Slide 3:** most characters match themselves, and a backslash makes a special character normal again.
**Slide 4:** square brackets mean any one of these characters, so [0-9] is any digit.
**Slide 5:** + means one or more, * means zero or more, and ? means optional.
**Slide 6:** ^ and $ mean the start and the end, and validation almost always needs both.
**Slide 7:** round brackets make a group, and | means or.
**Slide 8:** a greedy + grabs as much as it can, and +? takes as little as it can.
**Slide 9:** if AI writes your regex, test it on things that should fail too.

**Carousel caption:**
> regex, one piece at a time, with every demo on regex101. full video on YouTube, link in bio.
>
> #regex #programming #coding #learntocode #webdev

---

## 10. SUBSTACK / MEDIUM ESSAY

### Title:
> Regex Looks Like Rubbish Until You Read It Left to Right

### Subtitle:
> The one idea behind every regular expression, the pieces that build on it, and why you still need to read the regex AI writes for you.

### SEO Title:
> Regex Explained for Beginners: How Regular Expressions Work

### SEO Description:
> A plain guide to regular expressions, from how the computer matches a pattern to character classes, quantifiers, anchors, groups, greedy vs lazy, and real uses in Laravel, VS Code and grep.

---

There's a joke among developers that nobody understands regex, you just know it works. And when you look at something like ^[\w.+-]+@[\w-]+\.[\w.-]+$, it's easy to see why. It looks like a bunch of rubbish. But we use regular expressions all the time, to check emails and phone numbers, to search code, and to clean up data, so I wanted to take one apart properly.

The idea underneath every regex is simple. A regular expression is a pattern for some text you're looking for, and the computer slides that pattern along your text one position at a time, asking whether the text starting there matches. If your pattern is cat and your text is "concatenate the cat," it checks c-o-n, moves along, finds cat inside concatenate, keeps going, and finds the cat at the end. Every symbol in regex is a way of making that pattern smarter.

Most characters are literals and match themselves, but a few have special jobs. A dot means any one character except a new line, so the pattern 3.5 also matches 3x5, and you write 3\.5 when you mean a real dot. Square brackets make a character class, which means any one of these characters, so [0-9] is any digit and [^0-9] is anything that isn't a digit. The shortcuts \d, \w and \s stand for a digit, a word character (a letter, digit or underscore) and whitespace.

Quantifiers say how many times the thing right before them can repeat. The plus means one or more, so \d+ finds 1042 as one number instead of four digits. The star means zero or more, the question mark makes something optional, as in colou?r, and curly braces give an exact count, like \d{4}. Anchors match positions instead of characters. The caret is the start of the text and the dollar is the end, and without them a validation pattern like \d{11} still passes when eleven digits are hiding inside a longer string. The \b anchor marks the edge of a word, so \bcat\b skips the cat inside concatenate.

Round brackets group characters so a quantifier covers all of them, which is why (ha)+ matches hahaha. They also capture what they matched, so in VS Code's find and replace you can search for ^([^,]+), (.+)$ and replace with $2 $1 to turn "Achebe, Chinua" into "Chinua Achebe" on every line. The vertical bar means or, as in (Mr|Mrs|Ms). And quantifiers are greedy by default, so <.+> on "<b>Bold</b> and <i>this</i>" grabs the whole line, while the lazy <.+?> stops at the first closing bracket and finds the four tags.

With those pieces, the email regex reads like a sentence. It says start, one or more name characters, an at sign, a domain with at least one dot, and end. It's only a rough check, which is why in a Laravel app I'd use the built-in email rule, which uses a proper validation package, and save regex for shapes like an ISBN (^97[89]\d{10}$). Laravel's documentation also warns that regex rules may need to go in an array, because a vertical bar inside the pattern can be mistaken for the bar between rules. The same ideas work on the command line, where grep -E "\.(ERROR|CRITICAL):" pulls only the errors out of a log file.

The history is shorter than I expected. In 1951 the mathematician Stephen Kleene wrote a RAND memo describing what he called regular events, published in 1956 in Automata Studies, and the star is still often called the Kleene star. In 1968 Ken Thompson published "Regular Expression Search Algorithm" in Communications of the ACM and built regular expressions into the QED editor, then into ed on early Unix, where g/re/p printed every matching line. Brian Kernighan tells the story of a colleague, Lee McMahon, who wanted to search the Federalist Papers, and Thompson came back the next day with a program called grep. The joke is old too. In 1997 Jamie Zawinski wrote, "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems."

Today a lot of us ask AI for regex, and I think that's fine, but someone still has to read the result. Test it on regex101 with things that should match and things that should not, pick the flavor that matches your language, and watch for patterns that backtrack badly. On 2 July 2019, Cloudflare's own write-up says, a regular expression in a firewall rule backtracked so much that it used up the CPUs handling web traffic across their network, and the outage lasted about half an hour. That regex was written by people, and the fix is the same either way. Read it left to right, one piece at a time, before it ships.

---

*Do you know you can clap for a single post up to 50 times on Medium? Kindly give as many claps as you deem fit to make this post more visible to others. I always look forward to reading your comments, so please drop a comment and let me know what you think. Byeee!*

---

**Medium tags:** Regex, Programming, Web Development, Software Engineering, Laravel

---

## 11. REFERENCES & SOURCES

**1. Tested examples (every pattern in the script was run before it went in, 27 October 2026)**
- Python 3 `re` and PHP `preg_match` (PCRE2): `cat` finds two matches in "concatenate the cat" and `\bcat\b` finds only the last one. `colou?r` matches color and colour. `3.5` matches 3.5 and 3x5, while `3\.5` matches only 3.5. `\d+` on "Order 1042: 2 copies, 15000 naira" gives 1042, 2 and 15000. `(ha)+` matches hahaha as one match. `(Mr|Mrs|Ms)\.? \w+` matches Mrs Obi, Mr. Bello and Ms Ade. `<.+>` gives one match and `<.+?>` gives four. The email regex passes ada@example.com and ada.obi+books@mail.example.co.uk and fails ada@, ada@example and "a b@example.com". `^97[89]\d{10}$` passes 9780385474542 and fails the 12-digit 978038547454. `^\+?\d{10,15}$` passes +2348000000000 and fails 0800-000-0000. `^([^,]+), (.+)$` with `\2 \1` (VS Code uses `$2 $1`) turns "Adichie, Chimamanda Ngozi" into "Chimamanda Ngozi Adichie".
- GNU grep: `grep -E "\.(ERROR|CRITICAL):"` and `grep -E "^\[2026-10-26 09:1[0-9].*\.ERROR:"` pull the right lines from a sample laravel.log.
- Python: `(a+)+$` against 24 a's and a b took about 0.75 seconds, and each extra a roughly doubles the time. That supports "every extra a roughly doubles the work" in Segment 13.

**2. Laravel (docs and framework source, 12.x)**
- Validation docs, `regex:pattern`: "The field under validation must match the given regular expression. Internally, this rule uses the PHP preg_match function. The pattern specified should obey the same formatting required by preg_match and thus also include valid delimiters." The warning box says "it may be necessary to specify rules in an array instead of using | delimiters, especially if the regular expression contains a | character." Supports Segment 10. https://laravel.com/docs/validation#rule-regex (source: https://github.com/laravel/docs/blob/12.x/validation.md)
- Validation docs, `email`: uses the egulias/email-validator package, with RFCValidation by default and optional styles like dns and spoof. Supports "checks against the actual email standards." https://laravel.com/docs/validation#rule-email
- Framework source, `Illuminate/Log/LogManager.php`: `protected $dateFormat = 'Y-m-d H:i:s';` and a Monolog `LineFormatter`, which gives log lines like `[2026-10-26 09:14:03] production.ERROR: ...` (the word before .ERROR is the environment name). Supports the log lines in Segment 11.
- Str helpers (`Str::isMatch`, `Str::match`, `Str::replaceMatches`) exist if she wants a second Laravel example later. Not used in the script. https://laravel.com/docs/strings

**3. PHP and editors**
- PHP manual, preg_match: https://www.php.net/manual/en/function.preg-match.php (PHP's preg functions use the PCRE library, PCRE2 since PHP 7.3).
- VS Code docs, "Advanced find and replace options" lists "Regular Expression" on the Find control, and "The capture group is referenced by $n in the replacement string." Supports Segment 11. https://code.visualstudio.com/docs/editing/codebasics
- regex101 has an Explanation panel, Match Information panel, Quick Reference and a Code Generator, and a flavor menu including PCRE2 and ECMAScript. https://regex101.com/

**4. History**
- S. C. Kleene, "Representation of Events in Nerve Nets and Finite Automata," RAND research memorandum RM-704, dated 15 December 1951, about "the kinds of events any finite automaton can respond to." Published in Automata Studies (Princeton, 1956). Supports Segment 12. https://www.rand.org/pubs/research_memoranda/RM704.html
- Ken Thompson, "Regular Expression Search Algorithm," Communications of the ACM 11(6), June 1968. https://dl.acm.org/doi/10.1145/363347.363387
- Dennis Ritchie, "An incomplete history of the QED text editor": Thompson's CTSS version of QED was notable for "introducing regular expressions for specifying strings to seek within the document being edited," he "published this in C. ACM 11 #6," and ed was "first written by Ken Thompson for the PDP-7." Supports "built regular expressions into a text editor called QED" and "ed, the editor Thompson wrote for early Unix." https://www.bell-labs.com/usr/dmr/www/qed.html
- Brian Kernighan's oral history via The New Stack (22 July 2018): Lee McMahon wanted to study the Federalist Papers, "He couldn't edit them all in ed," "He sent this to Ken Thompson, and then went home for dinner or something like that. And he came back the next day, and Ken had written him a program. And the program was called grep." Supports Segment 12, which says "tells the story like this." https://thenewstack.io/brian-kernighan-remembers-the-origins-of-grep/
- Wikipedia, grep: first included in Version 4 Unix (initial release November 1973), name from the ed command g/re/p. https://en.wikipedia.org/wiki/Grep
- Jeffrey Friedl traced the "two problems" quote to Jamie Zawinski's Usenet post of 12 August 1997 (alt.religion.emacs, thread "perl and XEmacs"). Exact wording: "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems." https://regex.info/blog/2006-09-15/247

**5. Cloudflare and backtracking**
- Cloudflare, "Details of the Cloudflare outage on July 2, 2019" (John Graham-Cumming): https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/ . The page couldn't be fetched directly from this session, so the details were confirmed through secondary write-ups that quote it. Packt's summary quotes "went down for 27 minutes" and says the regex "caused CPUs to become exhausted on every CPU core that handles HTTP/HTTPS traffic on the Cloudflare network worldwide." Lorin Hochstein's analysis quotes the post's heading "Regular expression lead to catastrophic backtracking" and shows the pattern, which contains `.*(?:.*=.*)`. InfoQ says "approximately 30 minutes" and that the regex "consumed 100% CPU." The script says "about half an hour" to cover both figures. https://hub.packtpub.com/cloudflare-rca-major-outage-was-a-lot-more-than-a-regular-expression-went-bad , https://surfingcomplexity.blog/2019/08/02/contributors-mitigators-risks-cloudflare-2019-07-02-outage/ , https://www.infoq.com/news/2019/07/waf-causes-outage/
- OWASP, Regular expression Denial of Service (ReDoS), for the "evil regex" pattern shape (a quantified group that contains a quantifier). https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS

**6. ISBN**
- ISBN-13 numbers start with the prefix 978 or 979 and are 13 digits. The last digit is a check digit, which a regex can't verify. International ISBN Agency: https://www.isbn-international.org/content/what-isbn

**7. Corrections / careful wording**
- **"The dot matches anything."** By default the dot doesn't match a new line (it does with the s flag), so the script says "any single character, except a new line."
- **\w.** In PHP and JavaScript, \w is ASCII letters, digits and underscore by default, while Python 3's \w also matches Unicode letters. The script says "a letter, a digit or an underscore," which is true in all three for the examples used.
- **"The basics work everywhere."** They don't in grep (POSIX ERE has no \d and no lazy quantifiers), so the script says the basics work the same in PHP, JavaScript and Python, and calls out grep separately.
- **"Regex can validate emails."** Full email syntax is too loose for a short regex, so the script calls the email pattern "a rough check" and recommends Laravel's email rule.
- **"The ISBN regex validates ISBNs."** It checks the shape only. The script says so and mentions the check digit.
- **Phone numbers.** `^\+?\d{10,15}$` is a simple shape check. 15 is the E.164 maximum digit count, but the script doesn't claim it validates real numbers.
- **Kleene "invented regex."** The script says he described "regular events" in a 1951 memo, and only says the star is "often called the Kleene star."
- **Thompson and QED.** Ritchie's history says Thompson's CTSS QED introduced regular expressions. The script says Thompson "built regular expressions into a text editor called QED" and doesn't name the machine (Ritchie says 7090, other sources say 7094).
- **The grep story.** Kernighan's telling is that Thompson had a program the next day. Some accounts say grep already existed as Thompson's private tool and was only named and released then. The script attributes the story to Kernighan ("tells the story like this") and doesn't say "overnight."
- **Modern regex vs "regular."** Backreferences and some other features in modern engines go beyond Kleene's regular languages. Covered in a ready-to-paste reply, not in the script.
- **Cloudflare duration.** Sources say 27 minutes and "approximately 30 minutes," so the script says "about half an hour." The script also points out that people wrote that regex, so it doesn't suggest AI caused the outage.
- **"(a+)+$ takes forever."** It depends on the engine and the input length. The script says "every extra a roughly doubles the work," which matches the test in group 1, and the on-screen example is the classic backtracking case. Some engines (Go, Rust) avoid backtracking entirely, which is why the script talks about "the engine" without saying every language behaves this way.
- **Zawinski quote.** Quoted exactly from Friedl's research, with 1997 as the year. The often-repeated "comp.lang.emacs" source is wrong, so the script doesn't name the newsgroup.

---

## NOTES

- **This is a new topic.** There's no older regex kit in your archive.
- **Cross-links:** the HTTP status codes video (422 validation errors, which is what Laravel returns when a regex rule fails on a JSON request), the edge-case video (21, testing the inputs you think are impossible, which is the "should not match" list), "Should you still learn to code in 2027" (19, being the boss of AI-written code), and the networking basics video (49) if you mention grep and the terminal again.
- **The motion tool:** the [MOTION] lines are written to be handed over as-is. If you only build three, build Segments 2, 8 and 9.
- **Twitter:** the quiz and the "can you guess" tweet only work if you come back and post the answer as a reply a few hours later.
- **Decided:** the closing comment question ("paste the worst regex you've had to read") doubles as the pinned comment, so the replies give you material for a follow-up short where you read viewers' regex.

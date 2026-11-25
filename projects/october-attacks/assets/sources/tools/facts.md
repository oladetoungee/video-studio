# October attacks: real sources (screenshots + scroll recordings)

Captured 26 Oct 2026 for the october-attacks film, talking-head edit, shorts, thumbnails and carousels. Every page below is a real, live page, captured as it loaded (cookie banners and ads removed, nothing else touched). Show the credit line on screen whenever a capture is used. Exact boxes for drawing highlights are in `sources.json`.

## Facts to flag (read before the edit)

1. **Railway has now said more about how they got in** (Segment 5, "There's still no full detail from Railway on how the attackers got in"). Railway's *Preliminary Report* (22 Oct, `railway/railway-prelim-report_*`) gives a timeline: the attacker escalated privileges in Railway's build system, then got credentials for its CI environment, then decrypted a subset of environment variables. At most 1.85% of workspaces (about 100,000) had variables potentially exposed. Railway says the attacker was hunting AI provider API keys "to perform distillation attacks". It still has not shared the exact exploit, and a final report is promised. Suggested line: "Railway's early report says the attacker got in through their build system and was hunting for AI keys, but the full details aren't out yet."
2. **Railway and OpenCode are now linked by the companies themselves** (Segment 8). OpenCode called its breach a "distillation attack"; Railway's report says its attacker wanted AI keys for distillation attacks too. That makes the "same pattern" point stronger. Zeabur's report does not mention AI keys, so keep Zeabur's link to the pattern as "they went for the place where developers keep their secrets" (which is what the script says).
3. **PHP2Shell: lots of attempts, no confirmed mass hacking yet.** As of 24 Oct, TechCrunch says the world "so far broadly avoided mass internet exploitation"; Paperjam says no major infrastructure has documented a successful break-in. AWS calls it "broad exploitation attempts in the wild". The script's "people have already tried to exploit" is exactly right; don't upgrade it to "thousands of sites were hacked".
4. **New PHP advice since recording** (Segment 4). On 23 Oct php.net posted an informational advisory: keep `session.upload_progress.enabled=0` until the next regular release (a further, unlikely RCE path, CVE-2026-115560). Optional on-screen note under the version numbers.
5. **"break into more than a hundred companies"** (Segment 1). Reuters says the hacker broke into *websites belonging to* more than 100 companies; SharkNinja says only a standalone product-support site was hit and Cummins says it was a website run by one of its vendors. Segment 10 already says "company websites"; consider the same words in Segment 1.
6. **OpenCode refunds and key blocks** (Segment 7). Anthropic and Google blocked the exposed keys; OpenAI restored access and is refunding its API customers; OpenCode said refunds are underway. "The AI companies have blocked the stolen keys" is slightly broad. Also, OpenCode's wording is that keys "may have been exposed", so "took those keys" is a fair reading of the surprise bills but not their exact claim.
7. **"$50 per successful hack" is one researcher's rough estimate** (Snorre Fagerland, NorForge, to Reuters). NorForge's own report puts it at about $5 per attempt and says the uncertainty is considerable. The script's "estimated at about fifty dollars" is right; keep the word "estimated".
8. **Amazon timing: 4 days is right.** AWS's own post (`php2shell/aws-blog_*`) says 17 Oct, four days before disclosure. TechCrunch's later explainer says "about a week before"; trust AWS.
9. **European government websites going offline was precautionary.** Netherlands, Finland, Luxembourg (CTIE), UK councils and the Met Police took sites down to patch; none reported a breach. The script's wording ("went offline while they patched") is accurate.
10. **eMudhra has newer news** (Segment 9, optional). On 22 Oct eMudhra said it will leave the global SSL/TLS certificate business; Chrome removes the eMudhra root on 27 Oct; Microsoft blocked on 20 Oct; Apple's date differs by source (19 Oct per The Hacker News / Help Net, 22 Oct per BleepingComputer and the Mozilla incident site). "Chrome and Firefox blocked those keys as soon as it was found" is correct (17 Oct, within hours).
11. **Node.js ties into eMudhra** (Segment 4). The Node.js 21 Oct security release also removed trust in the eMudhra certificates, and reports no exploitation in the wild. Fixed versions: 22.23.4, 24.22.1, 26.12.1.
12. **Kit note now outdated:** section 11 says Node.js and eMudhra were "only reported in roundup blogs". Both are now confirmed by primary sources (nodejs.org; Google Chrome Security blog; Mozilla's incident site; Scott Helme). No change needed to the script, just to that note.

## Script check, claim by claim (Section 1)

| Seg | Claim in her script | Verdict | Where to show it |
|---|---|---|---|
| 1 | PHP had two critical security holes | Supported | php.net advisory; BleepingComputer |
| 1 | Railway told users to change their secret keys | Supported | Railway blog; TechCrunch |
| 1 | Zeabur is shutting down after being hacked twice | Supported (Aug + 14-15 Oct) | Zeabur blog; BleepingComputer |
| 1 | A hacker used AI agents to break into 100+ companies | Supported, but it was their **websites** (see flag 5) | Reuters via Star-Advertiser |
| 2 | PHP runs nearly three quarters of websites | Supported (Reuters/W3Techs "nearly three-quarters"; others say ~70%) | Deseret (Reuters) |
| 2 | WordPress and Laravel run on PHP | Supported | Paperjam lists Laravel, WordPress |
| 2 | Called PHP2Shell, CVE-2026-109618 + 109619, rated 9.2 | Supported (CVSS v4.0) | Datadog; GitHub advisories; Insurance Business ("9.2 out of 10") |
| 2 | Bug 1: out of memory mid-request leaves half-finished data, clean-up treats it as real | Supported | php.net; Datadog |
| 2 | Bug 2: leftover state from previous requests on PHP workers | Supported | php.net; Datadog ("reuse stale state from a previous request") |
| 2 | People have already tried to exploit them | Supported | AWS; SecurityWeek; Vercel |
| 3 | It happens before your code runs; login/middleware can't stop it | Supported | php.net ("before any application code runs"); Datadog; The Hacker News (CrowdStrike quote) |
| 3 | Amazon honeypot saw an attempt 4 days before it was announced | Supported (17 Oct) | AWS blog; The Hacker News; Help Net |
| 3 | Government websites in Europe went offline while they patched | Supported (precaution, flag 9) | Deseret (Reuters); Insurance Business; Newsweek; Paperjam |
| 4 | Fixed: 8.5.12, 8.4.27, 8.3.36, 8.2.35 | Supported | php.net; Datadog table |
| 4 | 8.1 or older: upgrade | Supported (PHP gave minimal source backports for 7.4/8.0/8.1; vendors may backport) | php.net; BleepingComputer |
| 4 | Restart PHP-FPM / Apache, rebuild Docker images | Supported | Datadog remediation steps; Paperjam (CIRCL) |
| 4 | Laravel version doesn't protect you | Supported (only the PHP runtime update fixes it) | Vercel; Paperjam |
| 4 | Node.js had a security release the same day | Supported (21 Oct) | nodejs.org; SecurityOnline |
| 5 | Railway happened the same day | Supported (disclosure 21 Oct; attack began 20 Oct) | Railway blog; Railway report |
| 5 | Someone may have accessed encrypted environment variables | Supported, and "for some of them, obtained the decrypted contents" | Railway blog; TechCrunch |
| 5 | Railway paused deployments | Supported (restored 22 Oct) | Railway blog; GitGuardian; Railway report |
| 5 | Users told to revoke API keys and cloud keys | Supported | Railway blog; TechCrunch |
| 5 | No full detail on how attackers got in | **Newer info** (flag 1) | Railway preliminary report |
| 5 | Part of a series of attacks aiming at AI companies | Supported ("compromising AI inference providers") | Railway blog |
| 6 | Breached in August, again 14-15 Oct with leaked internal credentials | Supported | Zeabur incident report; BleepingComputer |
| 6 | ~321,810 accounts, ~3.2M environment variable records | Supported | BleepingComputer; Zeabur report |
| 6 | Admin tokens had no expiry, unchanged since January 2024, missed in the post-August rotation | Supported (Zeabur's own words) | BleepingComputer quote; Zeabur report |
| 6 | Pause services and shut down by end of December | Supported (1 Dec: shared-cluster services paused, renewals off; 31 Dec: everything stops) | Zeabur blog |
| 7 | OpenCode Console stores AI API keys; older system broken into | Supported ("legacy system ... being decommissioned") | TechCrunch; Infosecurity |
| 7 | About 1.4% of Console users | Supported | OpenCode on X; TechCrunch |
| 7 | Alerts from OpenAI, Anthropic and Google | Supported (developer quote) | TechCrunch |
| 7 | Charges in the hundreds, a few over $1,000 | Supported (BleepingComputer: up to $1,700) | TechCrunch; BleepingComputer |
| 7 | OpenCode calls it a distillation attack | Supported; skeptics question it (script says "may have been", good) | OpenCode on X; TechCrunch |
| 7 | Keys blocked, refunds going out | Mostly (flag 6) | TechCrunch |
| 9 | Eight signing keys so weak one was the number 4 | Supported | Scott Helme; BleepingComputer; The Next Web |
| 9 | Script error in April 2025 made a second set of weak keys | Supported (eMudhra's explanation, ceremony on 30 Apr 2025) | BleepingComputer; The Hacker News |
| 9 | Someone could have faked a website with the padlock | Supported (no evidence it happened) | Google Chrome Security blog |
| 9 | Chrome and Firefox blocked them as soon as it was found | Supported (17 Oct) | Mozilla incident site; Google blog |
| 10 | Reuters: one hacker, AI agents, 100+ company websites | Supported | Star-Advertiser (Reuters); SBS; The Next Web |
| 10 | Deere, SharkNinja, Cummins | Supported (with their statements) | Star-Advertiser (Reuters) |
| 10 | Short instructions, agents ran for hours | Supported (under 100 Chinese characters; ~23 h per success) | Star-Advertiser; SBS |
| 10 | ~$50 in tokens per successful hack | Supported as an estimate (flag 7) | Star-Advertiser; The Next Web |
| 10 | PHP2Shell was found with help from AI | Supported (Calif with OpenAI's model; Wiz: "frontier AI") | Wiz blog; Deseret; Help Net |
| 10 | "The GitHub situation earlier this year" | Not checked (her own earlier video) | |

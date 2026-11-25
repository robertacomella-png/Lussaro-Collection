# Used Keywords

A primary keyword is **retired the moment it's used**. It never gets a second post.

This is what stops the site competing with itself — the failure mode where two pages target one query, split the authority, and both rank worse than one page would have. Secondary keywords are not retired; the same term can support several posts as a secondary.

**Before writing anything, check this file. If the intended primary appears below, pick a different one.**

---

## Retired primaries

| Primary keyword | Used on | Date | Cluster |
|---|---|---|---|
| luxury car rental miami beach | [/blog/luxury-car-rental-miami-beach-art-basel](../luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro) | 2026-11-25 | Art Basel |
| how much is a rental lamborghini | [/blog/how-much-is-a-lamborghini-rental](../luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro) | 2026-08-14 | Lamborghini |
| mercedes s580 vs maybach s580 rental miami | [/blog/mercedes-s580-vs-maybach-s580-rental-miami](../luxe-drive-flow/src/pages/blog/mercedes-s580-vs-maybach-s580-rental-miami.astro) | 2026-10-06 | Comparison |
| well kept exotic car rental miami | [/blog/well-kept-exotic-car-rental-miami](../luxe-drive-flow/src/pages/blog/well-kept-exotic-car-rental-miami.astro) | 2026-10-07 | The standard |
| how old do you have to be to rent an exotic car in miami | [/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami](../luxe-drive-flow/src/pages/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami.astro) | 2026-11-15 | Before you book |
| lamborghini huracan sto vs evo rental miami | [/blog/lamborghini-huracan-sto-vs-evo-rental-miami](../luxe-drive-flow/src/pages/blog/lamborghini-huracan-sto-vs-evo-rental-miami.astro) | 2026-11-15 | Comparison |

---

## Detail

### how much is a rental lamborghini
**Post:** `/blog/how-much-is-a-lamborghini-rental`
**Date:** August 14, 2026

**Secondaries used:**
- lamborghini rental
- lamborghini urus rental
- lamborghini huracan rental
- lamborghini rental miami
- rent a lamborghini in miami

**Why this primary and not `lamborghini rental`:** the commercial term belongs to `/lamborghini-rental-miami`, which already exists. Pointing a blog post at it would have split the same query across two pages. The informational term has no page competing for it, and it funnels to the landing page rather than fighting it.

---

### mercedes s580 vs maybach s580 rental miami
**Post:** `/blog/mercedes-s580-vs-maybach-s580-rental-miami`
**Date:** October 6, 2026

**Secondaries used:**
- mercedes s class rental miami
- maybach s580 rental miami
- mercedes s580 rental miami
- difference between s580 and maybach s580
- luxury sedan rental miami

**Why this primary and not `mercedes s class rental miami`:** that commercial term belongs to
`/cars/mercedes-s580`, which already targets it. The comparison phrasing is informational, has no
page competing for it, and funnels into both car pages instead of fighting either. First post in the
comparison cluster.

**Note on the SERP:** it is dominated by car-buying content — KBB, CarBuzz, owner forums — rather
than rental pages. The "rental miami" qualifier shifts intent, but this is a harder SERP than the
keyword's gap status suggests, and it was written knowing that.

---

### well kept exotic car rental miami
**Post:** `/blog/well-kept-exotic-car-rental-miami`
**Date:** October 7, 2026

**Secondaries used:**
- exotic car rental condition miami
- clean exotic car rental miami
- owner operated exotic car rental miami
- what to check before renting an exotic car

**Why this primary:** low volume on purpose. This is a trust and conversion asset rather than a
traffic one — the argument in `references/opinions.md` #1, in Robert's own words. It is also a
deliberate **brand-SERP** play: the H1 and title carry "Lussaro Collection", so the post can hold a
second slot on a brand search and push a competitor's comparison page further down.

**What was rejected and why:** the owner originally asked for a headline claiming Lussaro is the
"premier" or "highest quality" rental in Miami. `verify.py` blocks `#1`, `number one` and
`best in miami` outright, and `voice.md` bans ranking superiority — but the stronger objection was
that it is the line every competitor in Miami already runs. The specifics do the arguing instead:
detailing between every rental, ozone after the detail, owner-operated. The reader reaches the
conclusion themselves, which is the version a competitor cannot copy.

---

### lamborghini huracan sto vs evo rental miami
**Post:** `/blog/lamborghini-huracan-sto-vs-evo-rental-miami`
**Date:** November 15, 2026

**Secondaries used:**
- lamborghini huracan evo vs spyder rental miami
- huracan sto vs evo
- huracan sto vs evo spyder *(added 15 Nov 2026 — Google autocomplete retune)*
- is the huracan sto awd or rwd *(added 15 Nov 2026, FAQ)*
- is the huracan sto street legal *(added 15 Nov 2026, FAQ)*
- how much is it to rent a lamborghini huracan for a day *(added 15 Nov 2026, FAQ)*
- huracan sto deposit miami
- which lamborghini huracan to rent miami

**Why this primary and not `lamborghini huracan sto rental miami`:** the commercial STO term belongs to `/cars/huracan-sto` (owner-chosen, 15 November 2026). A blog post on it would split one query across two pages. The comparison is informational, has no page competing for it, and funnels into the STO car page. The owner asked for the post to recommend the STO; it still names the four cases where the EVO or Spyder is the better fit.

**SERP at the time:** no dedicated STO-vs-EVO rental comparison ranked. The results were rental-company listings, spec-comparison tables and owner reviews; the closest rental comparison ran about 600 words and omitted deposit, age and insurance, which this post covers.

---

### how old do you have to be to rent an exotic car in miami
**Post:** `/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami`
**Date:** November 15, 2026

**Secondaries used:**
- miami exotic car rental 18+ *(added 15 Nov 2026, second retune — Google autocomplete)*
- can you rent a lamborghini at 18 *(added 15 Nov 2026, second retune)*
- sports car rental 18 year old *(added 15 Nov 2026, second retune)*
- exotic car rental 18 miami *(added 15 Nov 2026 with the retune below)*
- car rental for 18 year olds miami *(added 15 Nov 2026)*
- luxury car rental 18+ miami *(added 15 Nov 2026)*
- exotic car rental miami under 25
- rent an exotic car at 18 miami
- under 21 car rental miami
- what do you need to rent an exotic car in miami
- florida minimum age to rent a car

**Why this primary:** it was the highest-priority informational gap in `keywords.csv`, a People Also Ask question, and no page targets rental age. The minimum age was lowered to 18 on 15 November 2026, which makes the answer a real differentiator: the SERP answers it "25, sometimes 21" and no Miami exotic operator in the results rents at 18. The Huracán STO (21+) is the one exception and the post derives it from `ageException`.

**Retuned twice on 15 Nov 2026, owner-approved.** Second pass, from Google autocomplete: title "Miami Exotic Car Rental 18+: Rent at 18 With Us", H1 "Miami exotic car rental 18+: how old do you have to be?", a "Can you rent a Lamborghini at 18 in Miami?" FAQ, and "sports car" once in the body. First pass: title, meta description and H1 led with "rent an exotic car at 18 in Miami" so the post reaches the 18+ searches as well as the age question. URL and body unchanged.

**SERP at the time:** age-requirement guides and FAQ pages, roughly 1,000–1,400 words. All covered the minimum age, license, deposit and insurance; none covered Florida law (s. 322.38 sets no minimum age), which this post adds along with the booking process for a younger renter.

---

### luxury car rental miami beach
**Post:** `/blog/luxury-car-rental-miami-beach-art-basel`
**Date:** November 25, 2026

**Secondaries used:**
- exotic car rental miami beach
- maybach rental miami
- lamborghini urus rental miami
- urus rental miami
- exotic car rental south beach

**Why this primary:** no page owned "luxury car rental miami beach". The homepage owns "luxury car rental miami", and `/exotic-car-rental-south-beach` owns the South Beach term. The fair makes Miami Beach its own question for one week in December, so the post takes that informational angle and funnels into the Urus, Maybach GLS 600, and Mercedes-Benz S580 pages.

**Left on their commercial pages:** `maybach rental miami`, `lamborghini urus rental miami`, and `exotic car rental south beach` stay targeted at `/maybach-rental-miami`, `/lamborghini-urus-rental-miami`, and `/exotic-car-rental-south-beach`. The post uses them as secondaries and links through. The Lamborghini verb phrase stays on `/lamborghini-rental-miami` and is not used here.

**Do not reuse.**

---

## Also permanently off-limits

Not retired — never eligible. Recorded here so nobody proposes them twice.

| Keyword | Reason |
|---|---|
| lamborghini rental las vegas | Out of market. Miami only. |
| lamborghini rental dallas | Out of market. Miami only. |
| lamborghini rental los angeles | Out of market. Miami only. |
| cheap exotic car rental miami | Contradicts the brand position — see `references/opinions.md` #1. |
| exotic car rental miami no deposit | We require $1,000. Cannot satisfy the query. |
| exotic car rental miami prom | Most prom renters are 17, under our minimum of 18 even after it was lowered on 15 Nov 2026. Do not target an occasion dominated by minors. |
| exotic car rental miami reddit | Cannot own it. Monitor for brand mentions instead. |

---

## Rules

1. **One primary per post. Retire it here immediately after publishing.**
2. **Never reuse a retired primary**, including close variants that would return the same SERP. "How much is a rental lamborghini" and "how much does a lamborghini rental cost" are the same query.
3. **Secondaries are reusable.** Four or five per post, and they should be genuinely covered in the copy rather than dropped in.
4. **Check the commercial pages before claiming a primary.** If a landing page already targets the term, the blog takes the informational angle instead.
5. **Out-of-market geography is never a target**, whatever the volume.

## no insurance rentals miami

Retired 22 October 2026 → `/blog/no-insurance-rentals-miami`

**Secondaries:** do you need insurance to rent an exotic car · what do you need to rent an exotic car in miami · exotic car rental insurance cost miami · rent a maybach without your own insurance · exotic car rental miami under 25 · exotic car rental age requirement miami

**Why this primary:** owner's call, 22 October 2026, before publication — the
phrase people actually type is "no insurance rentals", and it carries commercial
intent that the question form does not. "do you need insurance to rent an exotic
car" is kept as a secondary; keywords.csv carried it as high-priority `gap` with
the note "our biggest unpublished number". The SERP is thin — the top result is ~520 words
and quotes no price at all, and the best rental-company page (~1,100 words) never
addresses the case where the renter has no policy of their own, which is the
entire question. Publishing the band is the wedge.

**Do not reuse.** The commercial insurance terms stay with the landing pages.


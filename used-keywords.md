# Used Keywords

A primary keyword is **retired the moment it's used**. It never gets a second post.

This is what stops the site competing with itself — the failure mode where two pages target one query, split the authority, and both rank worse than one page would have. Secondary keywords are not retired; the same term can support several posts as a secondary.

**Before writing anything, check this file. If the intended primary appears below, pick a different one.**

---

## Retired primaries

| Primary keyword | Used on | Date | Cluster |
|---|---|---|---|
| how much is a rental lamborghini | [/blog/how-much-is-a-lamborghini-rental](../luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro) | 2026-08-14 | Lamborghini |
| mercedes s580 vs maybach s580 rental miami | [/blog/mercedes-s580-vs-maybach-s580-rental-miami](../luxe-drive-flow/src/pages/blog/mercedes-s580-vs-maybach-s580-rental-miami.astro) | 2026-10-06 | Comparison |
| well kept exotic car rental miami | [/blog/well-kept-exotic-car-rental-miami](../luxe-drive-flow/src/pages/blog/well-kept-exotic-car-rental-miami.astro) | 2026-10-07 | The standard |

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

## Also permanently off-limits

Not retired — never eligible. Recorded here so nobody proposes them twice.

| Keyword | Reason |
|---|---|
| lamborghini rental las vegas | Out of market. Miami only. |
| lamborghini rental dallas | Out of market. Miami only. |
| lamborghini rental los angeles | Out of market. Miami only. |
| cheap exotic car rental miami | Contradicts the brand position — see `references/opinions.md` #1. |
| exotic car rental miami no deposit | We require $1,000. Cannot satisfy the query. |
| exotic car rental miami prom | Minimum age is 21. Prom renters are 17–18. |
| exotic car rental miami reddit | Cannot own it. Monitor for brand mentions instead. |

---

## Rules

1. **One primary per post. Retire it here immediately after publishing.**
2. **Never reuse a retired primary**, including close variants that would return the same SERP. "How much is a rental lamborghini" and "how much does a lamborghini rental cost" are the same query.
3. **Secondaries are reusable.** Four or five per post, and they should be genuinely covered in the copy rather than dropped in.
4. **Check the commercial pages before claiming a primary.** If a landing page already targets the term, the blog takes the informational angle instead.
5. **Out-of-market geography is never a target**, whatever the volume.

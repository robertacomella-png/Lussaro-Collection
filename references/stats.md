# Stats — the canonical numbers

**These are the only numbers that go in copy.** Never round, never approximate, never invent a figure to make a sentence flow. $2,195 is $2,195, not "around $2,200."

Numbers marked **[code]** are transcribed from the data files, which remain the source of truth. Numbers marked **[Robert]** came directly from him in August 2026 and several are not yet in the code — those are flagged.

---

## Fleet and daily rates **[code]**

| Car | Year | Per day | Power | 0–60 |
|---|---|---|---|---|
| Ferrari SF90 | 2023 | **$2,195** | 986 hp | 2.5s |
| Rolls-Royce Cullinan | 2022 | **$1,495** | 563 hp | 4.9s |
| Lamborghini Huracán EVO | 2023 | **$1,295** | 602 hp | 3.3s |
| Lamborghini Urus | 2019 | **$995** | 641 hp | 3.3s |
| Mercedes-Maybach GLS 600 | 2023 | **$895** | 550 hp | 4.6s |
| Mercedes-Benz S580 | 2023 | **$445** (from $495) | 496 hp | 4.4s |

- **Six cars.** Say "six," never "a fleet of luxury vehicles."
- **Range: $445 to $2,195 per day.**
- `fleet.js` stores short internal names — "SF90," "Cullinan," "GLS 600 Maybach." In customer-facing copy the marque leads, as above.

## Rental terms **[code]**

- **Deposit: $1,000.** Flat, every vehicle, refundable after inspection on return.
- **Minimum age: 21**, valid license, qualifying insurance.
- **Mileage: 100 miles per day, pooled** across the rental. Three days is 300 miles total; only the total at return counts.
- **Cancellation: non-refundable within 5 days** of the rental start date.

## Numbers from Robert, not yet in the code **[Robert]**

These are confirmed but currently unpublished. **Site to-do: get these into `rental-terms.js`.**

- **Mileage overage: $5 per mile.** `rental-terms.js` has this as `null` and /terms says it's "disclosed in the rental agreement." It can now be stated. Robert added "for now," so treat it as current rather than permanent.
- **Insurance: from $99 per day**, varying by vehicle *and driver age*. The Lamborghini Urus is **$499 per day** at the top of the range. This is a pass-through, not a margin line — full coverage on a supercar for an uninsured driver costs what it costs, and Robert holds firm on it and explains it.
- **Chauffeur: $250 per hour, three-hour minimum.** That's a **$750 floor** which currently appears nowhere on the site. Someone can presently book expecting a one-hour job.
- **Response time: five minutes.** Robert's own answer, and it matches the reviews ("quick to respond to me"). Usable in copy.

## Delivery and collection **[code]**

- **Delivery: $125 in Miami, $175 in Fort Lauderdale — each way.** Confirmed by Robert, August 2026.
- **Collection at the end is a separate charge**, typically the same figure again.
- A Miami round trip is therefore **about $250**, not $125. Fort Lauderdale about $350.
- **Never quote a fixed round-trip price.** "Typically" is doing real work; the actual figure is agreed in the quote.

## Pricing behavior — internal only

Robert **will move on price to close a deal**, but only in exchange for booking in that moment. His stated line is *"this is our best price"* and he holds it unless the client pushes and is ready to commit.

The distinction that keeps published pricing honest:

> **Vibe pricing** = the opening number changes depending on who's asking. **Our model** = the published number is the same for everyone and is the ceiling. A concession at the point of closing is a sales tool, not a pricing policy.

**Never write "we never negotiate."** It isn't true and it's easy to catch. *"Our price is published, and it's the same number for you as for anyone"* is true and does the same work.

## Reviews **[code]**

- **5 Google reviews. All 5 stars. 5.0 average.** May–July 2026.
- Two name Robert personally.
- **Never invent, paraphrase, or tighten a review.** Verbatim or not at all.
- Never claim a customer count. What's true: *every review we have is five stars.*

## The business **[Robert]**

- **Company formed December 2025. Trading since January 2026.**
- **Six cars inside the first year**, starting from one Maybach GLS 600 bought with Robert's savings.
- **Never claim or imply tenure.** No "years of experience." Registration is public. Best practice: say nothing about age at all.
- **Internal target: 12–14 rental days per car per month.** This is a *goal*, not a result. **Never publish it** — it tells competitors the economics and tells customers nothing.

## Business details **[code]**

- **Lussaro Collection LLC**
- **900 Biscayne Blvd, Miami, FL 33132**
- **+1 (645) 248-7305** — phone and WhatsApp are the same number
- **Open Mon–Sun, 09:00–22:00**
- **No public email.** Publish none rather than one that bounces.

## Service areas

Miami, South Beach, Brickell. Delivery extends to Fort Lauderdale at the higher fee. Robert notes delivery pricing depends on area beyond that — quote it, don't publish a radius. Palm Beach appears in a customer review as a destination, not a service area.

---

## Numbers we still do NOT have

Do not write around these. If a sentence needs one, the sentence changes.

- Actual bookings completed, or customers served
- Repeat-customer rate
- Insurance rates for the SF90, Cullinan, Huracán, Maybach and S580 individually (only the $99 floor and the Urus's $499 are known)
- The maximum discount Robert will actually give
- Instagram or social following
- Revenue, utilization achieved, or anything financial
- Press, awards, or nameable clients

---

Related: [voice.md](voice.md) · [opinions.md](opinions.md) · [stories.md](stories.md)

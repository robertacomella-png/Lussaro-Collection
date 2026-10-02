import { useState } from "react";
import { rentalTerms } from "@/data/rental-terms";
import { trackLead } from "@/lib/track";

const DAY_MS = 86400000;

// Same field treatment as LeadForm. placeholder-white/50 rather than a lighter
// step: white at 35% over this card's near-black sits at 3.0:1, under the 4.5:1
// AA floor. [color-scheme:dark] is what makes the native date picker's own
// chrome render light — without it Safari and Chrome paint a white calendar
// glyph-well on a black field.
const FIELD =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#ff1516] transition [color-scheme:dark]";

const iso = (d) => d.toISOString().slice(0, 10);
const todayISO = () => iso(new Date());

// Matches BookingCalendar exactly: a pickup on the 1st returning on the 3rd is
// two days, and a start with no return quotes a single day. Changing this would
// put two quotes for the same dates on the same site.
function billableDays(start, end) {
  if (!start) return 0;
  if (!end) return 1;
  const n = Math.round((new Date(end + "T00:00:00") - new Date(start + "T00:00:00")) / DAY_MS);
  return Math.max(1, n);
}

const pctFor = (tiers, days) => tiers.reduce((acc, t) => (days >= t.days ? t.pct : acc), 0);

const money = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

const fmtDate = (s) =>
  new Date(s + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function BookingRequestCard({
  pricePerDay = 0,
  carName = "",
  tiers = rentalTerms.discountTiers,
}) {
  const [mode, setMode] = useState("dates"); // "dates" | "flexible"
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  // The mileage selector is driven by rental-terms.js. One allowance is the
  // honest default — the fleet sells a single 100 mi/day pooled allowance — so
  // with fewer than two tiers defined this renders a statement, not a choice.
  const mileTiers = Array.isArray(rentalTerms.mileage.tiers) ? rentalTerms.mileage.tiers : [];
  const hasMileChoice = mileTiers.length > 1;
  const [mileIdx, setMileIdx] = useState(0);
  const mileTier = hasMileChoice ? mileTiers[mileIdx] : null;

  const dayRate = mileTier ? mileTier.pricePerDay : pricePerDay;
  const dated = mode === "dates" && start;
  const days = dated ? billableDays(start, end) : 0;
  const discountPct = dated ? pctFor(tiers, days) : 0;
  const subtotal = dayRate * Math.max(1, days);
  const total = Math.round(subtotal * (1 - discountPct / 100));

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");

    const datesText =
      mode === "flexible"
        ? "Flexible — no fixed dates yet"
        : start
          ? `${fmtDate(start)}${end ? ` → ${fmtDate(end)}` : ""} · ${days} ${days === 1 ? "day" : "days"}`
          : "Not specified";

    const detail = [
      dated && `Estimate ${money(total)}${discountPct ? ` (${discountPct}% ${days}-day rate applied)` : ""}`,
      mileTier && `Mileage: ${mileTier.milesPerDay} mi/day at ${money(mileTier.pricePerDay)}/day`,
    ]
      .filter(Boolean)
      .join(" · ");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          vehicle: carName,
          dates: datesText,
          message: `Website booking request${detail ? ` — ${detail}` : ""}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      // Fires lead_submit into the dataLayer and lead_created to the OpenAI
      // Pixel, so this card reports the same conversion as the contact form.
      trackLead({ vehicle: carName });
      setStatus("ok");
    } catch (err) {
      setError(err.message || "Could not send. Please try WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <p className="text-[#ff1516] text-3xl leading-none mb-3" aria-hidden="true">
          ✓
        </p>
        <h3 className="font-display text-xl font-semibold text-white mb-2">Request received</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          We will confirm the {carName} for your dates shortly — usually within the hour. For the
          fastest reply, message us on WhatsApp.
        </p>
      </div>
    );
  }

  const segment = (active) =>
    `flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
      active ? "bg-white text-black" : "text-white/60 hover:text-white"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Someone who has not settled on dates still converts here rather than
          bouncing — "Flexible" sends the lead with everything else attached. */}
      <div
        className="flex gap-1 rounded-xl bg-white/[0.04] border border-white/10 p-1 mb-4"
        role="group"
        aria-label="How firm are your dates"
      >
        <button
          type="button"
          onClick={() => setMode("flexible")}
          aria-pressed={mode === "flexible"}
          className={segment(mode === "flexible")}
        >
          Flexible
        </button>
        <button
          type="button"
          onClick={() => setMode("dates")}
          aria-pressed={mode === "dates"}
          className={segment(mode === "dates")}
        >
          Select dates
        </button>
      </div>

      {mode === "dates" && (
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div>
            <label htmlFor="lc-start" className="block text-white/50 text-[11px] mb-1.5">
              Pickup
            </label>
            <input
              id="lc-start"
              type="date"
              value={start}
              min={todayISO()}
              onChange={(e) => {
                setStart(e.target.value);
                if (end && e.target.value && end < e.target.value) setEnd("");
              }}
              className={FIELD}
              aria-label="Pickup date"
            />
          </div>
          <div>
            <label htmlFor="lc-end" className="block text-white/50 text-[11px] mb-1.5">
              Return
            </label>
            <input
              id="lc-end"
              type="date"
              value={end}
              min={start || todayISO()}
              onChange={(e) => setEnd(e.target.value)}
              className={FIELD}
              aria-label="Return date"
            />
          </div>
        </div>
      )}

      {hasMileChoice && (
        <div className="mb-4">
          <p className="text-white/50 text-[11px] mb-1.5">Mileage per day</p>
          <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Mileage per day">
            {mileTiers.map((t, i) => {
              const on = i === mileIdx;
              return (
                <button
                  key={t.milesPerDay}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setMileIdx(i)}
                  className={`rounded-xl border px-3 py-2.5 text-left transition ${
                    on
                      ? "border-[#ff1516] bg-[#ff1516]/[0.08]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25"
                  }`}
                >
                  <span className="block text-white text-sm font-medium">
                    {t.milesPerDay} miles/day
                  </span>
                  <span className="block text-white/50 text-xs mt-0.5">
                    {money(t.pricePerDay)} /day
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* The estimate is the discount ladder in rental-terms.js applied to the
          chosen span — the same arithmetic /pricing and the fleet FAQ quote. */}
      {dated && (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 mb-4 flex items-baseline justify-between gap-3">
          <span className="text-white/60 text-xs">
            {days} {days === 1 ? "day" : "days"}
            {discountPct > 0 && <span className="text-[#ff1516]"> · {discountPct}% off</span>}
          </span>
          <span className="text-white font-semibold">
            {discountPct > 0 && (
              <span className="text-white/50 text-xs line-through font-normal mr-1.5">
                {money(subtotal)}
              </span>
            )}
            {money(total)}
            <span className="text-white/50 text-xs font-normal"> est.</span>
          </span>
        </div>
      )}

      <p className="text-white/50 text-[11px] mb-1.5">Your details</p>
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
          className={FIELD}
          aria-label="Full name"
          required
        />
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          autoComplete="tel"
          className={FIELD}
          aria-label="Phone number"
          required
        />
      </div>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (optional)"
        autoComplete="email"
        className={`${FIELD} mb-4`}
        aria-label="Email address, optional"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-white text-black py-3.5 rounded-full font-semibold hover:bg-[#ff1516] hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Request this car"}
      </button>

      {status === "error" && (
        <p className="text-[#ff1516] text-sm mt-2.5 text-center" role="alert">
          {error}
        </p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-white/50 text-[11px] mt-3">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        No charge now. Nothing is booked until we confirm.
      </p>

      <p className="text-white/50 text-[11px] text-center mt-1.5">
        {rentalTerms.mileage.includedPerDay} miles/day included
        {rentalTerms.mileage.pooled ? ", pooled across the rental" : ""} ·{" "}
        {rentalTerms.deposit.display} deposit
      </p>
    </form>
  );
}

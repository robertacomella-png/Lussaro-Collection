import { useEffect, useState } from "react";
import { Gauge, Layers, BadgeCheck, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { rentalTerms } from "@/data/rental-terms";
import { withAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track";

// The booking card on /cars/[slug], built to the Nov 2026 booking brief.
//
// Mobile first: it is read at 390px by most visitors, so every line is 15px or
// larger, the three rental conditions are bold one-liners, and the date picker
// opens INLINE under the date buttons at the card's full width (seven columns
// of ~44px tap targets) rather than in a floating popover a thumb has to chase.
//
// The ad funnels keep BookingRequestCard; this card is the car pages only.

const DAY_MS = 86400000;

// Same field treatment as LeadForm. placeholder-white/50 keeps the AA floor.
const FIELD =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-[16px] text-white placeholder-white/50 focus:outline-none focus:border-[#ff1516] transition";

// Local calendar dates, never toISOString(): that converts to UTC and turns an
// evening pick in Miami into the next day.
const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromISO = (s) => (s ? new Date(s + "T00:00:00") : undefined);

// A pickup on the 1st returning on the 3rd is two days; a pickup alone quotes
// one. Matches BookingRequestCard and BookingCalendar.
function billableDays(start, end) {
  if (!start) return 0;
  if (!end) return 1;
  return Math.max(1, Math.round((fromISO(end) - fromISO(start)) / DAY_MS));
}

const pctFor = (tiers, days) => tiers.reduce((acc, t) => (days >= t.days ? t.pct : acc), 0);
const money = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
const fmtShort = (s) => fromISO(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtLong = (s) =>
  fromISO(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

// Dark skin for the vendored shadcn Calendar, passed as classNames so the
// component in ui/ is not edited. Selection is the brand red with black text
// (5.06:1); days between pickup and return get a quiet white wash.
const CAL = {
  months: "w-full",
  month: "w-full space-y-3",
  caption: "flex justify-center items-center relative h-10",
  caption_label: "text-white text-[16px] font-semibold",
  nav: "flex items-center",
  nav_button:
    "h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/15 text-white hover:border-[#ff1516] disabled:opacity-30 transition",
  nav_button_previous: "absolute left-0",
  nav_button_next: "absolute right-0",
  table: "w-full border-collapse",
  head_row: "flex",
  head_cell: "flex-1 text-white/50 text-[12px] font-medium pb-1",
  row: "flex w-full mt-1",
  cell: "flex-1 p-0 text-center relative",
  day: "h-11 w-full rounded-full text-[15px] text-white hover:bg-white/10 transition",
  day_selected: "!bg-[#ff1516] !text-black font-semibold",
  day_range_middle: "!bg-white/10 !text-white !font-normal !rounded-none",
  day_today: "underline underline-offset-4",
  day_disabled: "!text-white/25 hover:!bg-transparent cursor-not-allowed",
  day_hidden: "invisible",
};

export default function VehicleBookingCard({
  pricePerDay = 0,
  carName = "",
  tiers = rentalTerms.discountTiers,
  milesPerDay = rentalTerms.mileage.includedPerDay,
  // Per-car terms from cars.js; the fleet defaults when a car sets none.
  depositDisplay = rentalTerms.deposit.display,
  minimumAge = rentalTerms.minimumAge,
  // fleet.js dashboardId, when the car is linked in the Rental Dashboard.
  vehicleId = null,
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [calOpen, setCalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  const days = billableDays(start, end);
  const discountPct = start ? pctFor(tiers, days) : 0;
  const base = pricePerDay * Math.max(1, days);
  const discount = Math.round(base * (discountPct / 100));
  const subtotal = base - discount;
  const taxRate = rentalTerms.taxesAndFeesRate;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  // Hand the chosen dates to the page, which rewrites every WhatsApp link so
  // the message already names the car and the dates (brief point 04).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("lussaro:booking-change", {
        detail: {
          car: carName,
          startLabel: start ? fmtShort(start) : "",
          endLabel: end ? fmtShort(end) : "",
          days: start ? days : 0,
        },
      }),
    );
  }, [carName, start, end, days]);

  function onSelect(range) {
    const from = range?.from ? toISO(range.from) : "";
    const to = range?.to && range.to > range.from ? toISO(range.to) : "";
    setStart(from);
    setEnd(to);
    if (from && to) setCalOpen(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");

    const datesText = start
      ? `${fmtShort(start)}${end ? ` → ${fmtShort(end)}` : ""} · ${days} ${days === 1 ? "day" : "days"}`
      : "Not specified";
    const detail = start
      ? ` — Estimate ${money(total)} incl. ${Math.round(taxRate * 100)}% taxes & fees${discountPct ? ` (${Math.round(discountPct)}% ${days}-day rate applied)` : ""}`
      : "";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withAttribution({
          name: name.trim(),
          phone: phone.trim(),
          vehicle: carName,
          vehicle_id: vehicleId,
          start_date: start || null,
          end_date: end || null,
          dates: datesText,
          message: `Website availability check${detail}`,
          source: "car_booking_card",
        }, "VehicleBookingCard")),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      // Lets GTM tell a dated enquiry from a bare name-and-number without any
      // personal detail entering the dataLayer.
      trackLead({
        vehicle: carName,
        lead_source: "car_booking_card",
        has_dates: Boolean(start),
        rental_days: start ? days : undefined,
        estimate_value: start ? total : undefined,
        lead_id: data.lead_id,
        phone: phone.trim(),
      });
      setStatus("ok");
    } catch (err) {
      setError(err.message || "Could not send. Please try WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <p className="text-[#ff1516] text-3xl leading-none mb-3" aria-hidden="true">✓</p>
        <h3 className="font-display text-xl font-semibold text-white mb-2">Request received</h3>
        <p className="text-white/70 text-[15px] leading-relaxed">
          We will confirm the {carName} for your dates shortly. For the fastest reply, message us
          on WhatsApp.
        </p>
      </div>
    );
  }

  const dateBtn = (label, value, placeholder) => (
    <button
      type="button"
      onClick={() => setCalOpen((o) => !o)}
      aria-expanded={calOpen}
      aria-controls="lc-cal"
      aria-label={`${label}: ${value ? fmtLong(value) : "not set"}. Choose dates`}
      className={`flex-1 text-left rounded-xl border px-4 py-3 transition ${
        calOpen ? "border-[#ff1516] bg-[#ff1516]/[0.06]" : "border-white/10 bg-white/[0.04] hover:border-white/25"
      }`}
    >
      <span className="block text-white/60 text-[13px] mb-0.5">{label}</span>
      <span className={`flex items-center justify-between gap-2 text-[15px] ${value ? "text-white font-semibold" : "text-white/50"}`}>
        {value ? fmtLong(value) : placeholder}
        <CalendarDays className="w-4 h-4 shrink-0 text-white/50" aria-hidden="true" />
      </span>
    </button>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* The three conditions, bold and nothing else (owner, 15 Nov 2026). */}
      <ul className="space-y-2.5 mb-5 text-[15px] font-semibold text-white">
        <li className="flex items-center gap-3">
          <Gauge className="w-5 h-5 shrink-0 text-white/70" aria-hidden="true" />
          {milesPerDay} miles/day included
        </li>
        <li className="flex items-center gap-3">
          <Layers className="w-5 h-5 shrink-0 text-white/70" aria-hidden="true" />
          {depositDisplay} refundable deposit
        </li>
        <li className="flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 shrink-0 text-white/70" aria-hidden="true" />
          {minimumAge}+ with a valid license
        </li>
      </ul>

      <div className="flex gap-2.5">
        {dateBtn("Pickup", start, "Add date")}
        {dateBtn("Return", end, "Add date")}
      </div>

      {calOpen && (
        <div id="lc-cal" className="mt-2.5 rounded-xl border border-white/10 bg-[#0a0a0a] p-3">
          <Calendar
            mode="range"
            selected={{ from: fromISO(start), to: fromISO(end) }}
            onSelect={onSelect}
            defaultMonth={fromISO(start) ?? new Date()}
            fromDate={new Date()}
            showOutsideDays={false}
            numberOfMonths={1}
            className="p-0"
            classNames={CAL}
          />
          <p className="text-white/60 text-[13px] text-center mt-2">
            {start && !end ? "Now tap your return date" : "Tap your pickup date, then your return"}
          </p>
        </div>
      )}

      {/* The estimate. Delivery and insurance are left off on the owner's
          instruction; taxes and fees are the flat rate in rental-terms.js. */}
      {start && (
        <dl className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 space-y-2 text-[15px]">
          <div className="flex justify-between gap-3">
            <dt className="text-white/70">{money(pricePerDay)} × {days} {days === 1 ? "day" : "days"}</dt>
            <dd className="text-white tabular-nums">{money(base)}</dd>
          </div>
          {discountPct > 0 && (
            <div className="flex justify-between gap-3">
              <dt className="text-white/70">{days}-day rate, {Math.round(discountPct)}% off</dt>
              <dd className="text-[#ff1516] tabular-nums">−{money(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-3">
            <dt className="text-white/70">Taxes &amp; fees ({Math.round(taxRate * 100)}%)</dt>
            <dd className="text-white tabular-nums">{money(taxes)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-white/10 pt-2.5">
            <dt className="text-white font-semibold">Estimated total</dt>
            <dd className="text-white text-[18px] font-bold tabular-nums">{money(total)}</dd>
          </div>
          <div className="flex justify-between gap-3 text-[13px]">
            <dt className="text-white/60">Refundable deposit, held separately</dt>
            <dd className="text-white/70 tabular-nums">{depositDisplay}</dd>
          </div>
        </dl>
      )}

      <div className="grid grid-cols-2 gap-2.5 mt-4 mb-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-white text-black py-4 rounded-full text-[16px] font-semibold hover:bg-[#ff1516] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Check Availability"}
      </button>

      {status === "error" && (
        <p className="text-[#ff1516] text-[15px] mt-2.5 text-center" role="alert">{error}</p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-white/60 text-[13px] mt-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        No payment to enquire
      </p>
    </form>
  );
}

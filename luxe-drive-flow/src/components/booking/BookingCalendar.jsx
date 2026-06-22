import { useEffect, useMemo, useState } from "react";

const DAY_MS = 86400000;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIERS = [
  { days: 3, pct: 15 },
  { days: 5, pct: 20 },
  { days: 7, pct: 25 },
];

const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Seeded RNG → pending dates are stable through the day, unique per vehicle, and
// reshuffle at midnight (so the calendar looks live).
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Availability calendar. Past/blocked = red (unavailable); a few random near-term
// dates show amber (pending) for scarcity; everything else is green (available).
// Range selection → a WhatsApp message prefilled with the car + chosen dates.

// Rental Dashboard backend (lead capture + booking requests). Open CORS.
const DASHBOARD = "https://rental-dashboard-nu.vercel.app";

function uuidv4() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// One id per visit so live keystroke captures update a single lead row.
function getVisitorLeadId() {
  try {
    const k = "lussaro-lead-id";
    const existing = sessionStorage.getItem(k);
    if (existing) return existing;
    const v = uuidv4();
    sessionStorage.setItem(k, v);
    return v;
  } catch {
    return uuidv4();
  }
}

const fieldCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:border-[#c9a96e] outline-none transition";

// Expand an inclusive {start,end} ISO range into individual ISO day strings.
function expandRange(startISO, endISO, out) {
  const s = new Date(`${startISO}T00:00:00`);
  const e = new Date(`${endISO}T00:00:00`);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return;
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) out.add(iso(d));
}

export default function BookingCalendar({ pricePerDay = 0, carName = "", vehicleId = null, phone = "16452487305", blockedDates = [], pendingDates = null }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  // Real booked dates fetched from the dashboard for linked cars.
  const [apiBlocked, setApiBlocked] = useState(() => new Set());
  const blocked = useMemo(() => new Set([...blockedDates, ...apiBlocked]), [blockedDates, apiBlocked]);

  useEffect(() => {
    if (!vehicleId) { setApiBlocked(new Set()); return; }
    let alive = true;
    fetch(`${DASHBOARD}/api/book`)
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        const ranges = (j && j.availability && j.availability[vehicleId]) || [];
        const out = new Set();
        ranges.forEach((rg) => expandRange(rg.start, rg.end, out));
        setApiBlocked(out);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [vehicleId]);

  // 3 random "pending" dates within the next 2 weeks — per car, reshuffled daily.
  // Set after mount (client only) to avoid an SSR/hydration mismatch.
  const [pending, setPending] = useState(() => new Set());
  useEffect(() => {
    if (pendingDates) { setPending(new Set(pendingDates)); return; }
    if (vehicleId) { setPending(new Set()); return; } // linked car → real availability only
    const rng = mulberry32(hashStr(`${carName}|${iso(today)}`));
    const base = new Set();
    let guard = 0;
    while (base.size < 3 && guard++ < 200) base.add(1 + Math.floor(rng() * 14)); // 3 base dates, 1..14 days out
    // Weekend rentals are a 2-day minimum → any Fri/Sat/Sun pending date gets a
    // back-to-back partner so it shows as a consecutive 2-day hold.
    const offsets = new Set();
    base.forEach((o) => {
      offsets.add(o);
      const dow = new Date(today.getTime() + o * DAY_MS).getDay();
      if (dow === 0 || dow === 5 || dow === 6) {
        let partner = dow === 0 ? o - 1 : o + 1; // Sun pairs back (Sat–Sun); Fri/Sat pair forward
        if (partner < 1 || partner > 14) partner = dow === 0 ? o + 1 : o - 1;
        if (partner >= 1 && partner <= 14) offsets.add(partner);
      }
    });
    const out = new Set();
    offsets.forEach((off) => out.add(iso(new Date(today.getTime() + off * DAY_MS))));
    setPending(out);
  }, [carName, pendingDates, today, vehicleId]);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // Booking form + lead capture
  const leadId = useMemo(() => getVisitorLeadId(), []);
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Capture the lead as they fill the form (debounced), even before submit.
  useEffect(() => {
    if (!name.trim() && !contactPhone.trim() && !email.trim()) return;
    const t = setTimeout(() => {
      fetch(`${DASHBOARD}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          name,
          email,
          phone: contactPhone,
          vehicle_id: vehicleId || null,
          start_date: start ? iso(start) : null,
          end_date: end ? iso(end) : start ? iso(start) : null,
          note: carName ? `Car: ${carName}` : "",
        }),
      }).catch(() => {});
    }, 700);
    return () => clearTimeout(t);
  }, [name, contactPhone, email, start, end, leadId, carName]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);

  const isPast = (d) => d < today;
  const isAvailable = (d) => !isPast(d) && !blocked.has(iso(d));
  const isPending = (d) => isAvailable(d) && pending.has(iso(d));

  function pick(d) {
    if (!isAvailable(d)) return;
    if (!start || (start && end)) { setStart(d); setEnd(null); return; }
    if (d <= start) { setStart(d); setEnd(null); return; }
    setEnd(d);
  }

  const days = start && end ? Math.round((end - start) / DAY_MS) : start ? 1 : 0;
  const billDays = Math.max(1, days);
  const subtotal = pricePerDay * billDays;
  const discountPct = billDays >= 7 ? 25 : billDays >= 5 ? 20 : billDays >= 3 ? 15 : 0;
  const total = Math.round(subtotal * (1 - discountPct / 100));
  const saved = subtotal - total;

  const dealLine = discountPct > 0 ? ` with the ${discountPct}% ${billDays}-day discount` : "";
  const msg = !start
    ? ""
    : end
    ? `Hi! I'd like to book the ${carName} from ${fmt(start)} to ${fmt(end)} (${days} ${days === 1 ? "day" : "days"})${dealLine}. Is it available?`
    : `Hi! I'd like to book the ${carName} on ${fmt(start)}. Is it available?`;
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));

  async function submitBooking() {
    setFormError("");
    if (!start) return setFormError("Please choose your dates.");
    if (!name.trim() || !contactPhone.trim()) return setFormError("Name and phone are required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setFormError("Please enter a valid email.");
    setSubmitting(true);
    const startISO = iso(start);
    const endISO = end ? iso(end) : startISO;
    const datesText = `${fmt(start)}${end ? ` → ${fmt(end)}` : ""} (${billDays} ${billDays === 1 ? "day" : "days"})`;
    try {
      const r = await fetch(`${DASHBOARD}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_id: vehicleId || undefined,
          vehicle_name: carName,
          start_date: startISO,
          end_date: endISO,
          name: name.trim(),
          email: email.trim(),
          phone: contactPhone.trim(),
          note: `Requested from website — ${datesText}.`,
          lead_id: leadId,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.message || "Could not send your request.");
      // Best-effort: also email the team via the site's existing endpoint.
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: contactPhone.trim(),
          email: email.trim(),
          vehicle: carName,
          dates: datesText,
          message: "Website booking request",
        }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (e) {
      setFormError(e.message || "Something went wrong — please try WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  const navBtn = "w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-[#c9a96e] hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/15";

  return (
    <div>
      {/* month nav */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" aria-label="Previous month" className={navBtn} disabled={!canPrev}
          onClick={() => canPrev && setView(new Date(y, m - 1, 1))}>‹</button>
        <span className="font-display font-semibold text-white">{MONTHS[m]} {y}</span>
        <button type="button" aria-label="Next month" className={navBtn}
          onClick={() => setView(new Date(y, m + 1, 1))}>›</button>
      </div>

      {/* weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="h-7 flex items-center justify-center text-[11px] font-medium text-white/35">{w}</div>
        ))}
      </div>

      {/* day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const avail = isAvailable(d);
          const pend = isPending(d);
          const isStart = sameDay(d, start);
          const isEnd = sameDay(d, end);
          const inRange = start && end && d > start && d < end;
          const selected = isStart || isEnd;
          let cls = "relative h-10 rounded-lg flex items-center justify-center text-sm transition ";
          if (!avail) cls += "text-white/25 cursor-not-allowed";
          else if (selected) cls += "bg-[#c9a96e] text-black font-semibold";
          else if (inRange) cls += "bg-[#c9a96e]/20 text-white";
          else cls += "text-white hover:bg-white/10";
          const dotColor = !avail ? "bg-red-500/70" : pend ? "bg-amber-400" : "bg-emerald-400";
          return (
            <button type="button" key={i} disabled={!avail} onClick={() => pick(d)} className={cls}>
              {d.getDate()}
              {!selected && !inRange && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${dotColor}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[11px] text-white/45">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Pending</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500/70" /> Unavailable</span>
      </div>

      {/* multi-day savings — tier chips, active one highlighted */}
      <div className="mt-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-2">Multi-day savings</p>
        <div className="grid grid-cols-3 gap-2">
          {TIERS.map((t) => {
            const active = discountPct === t.pct;
            return (
              <div
                key={t.pct}
                className={`rounded-xl border px-2 py-2.5 text-center transition ${active ? "border-[#c9a96e] bg-[#c9a96e]/10" : "border-white/10 bg-white/[0.02]"}`}
              >
                <p className={`font-display text-lg font-bold leading-none ${active ? "text-[#c9a96e]" : "text-white/80"}`}>{t.pct}%</p>
                <p className="text-[10px] text-white/40 mt-1">{t.days}+ days</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* summary + CTA */}
      <div className="mt-4 pt-4 border-t border-white/10">
        {start ? (
          <div className="mb-3">
            <div className="flex items-start justify-between gap-3">
              <span className="text-white/70 text-sm">
                {fmt(start)}{end ? ` → ${fmt(end)}` : ""} · {billDays} {billDays === 1 ? "day" : "days"}
              </span>
              <span className="text-right shrink-0">
                {discountPct > 0 && (
                  <span className="block text-white/35 text-xs line-through leading-none mb-0.5">${subtotal.toLocaleString()}</span>
                )}
                <span className="text-white font-semibold">${total.toLocaleString()}<span className="text-white/40 text-xs font-normal"> est.</span></span>
              </span>
            </div>
            {discountPct > 0 && (
              <p className="text-emerald-300 text-xs mt-2">You save ${saved.toLocaleString()} with the {discountPct}% {billDays}-day rate.</p>
            )}
          </div>
        ) : (
          <p className="text-white/45 text-sm mb-3">Pick your pick-up{end ? "" : " and return"} dates to see your rate.</p>
        )}

        {submitted ? (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center">
            <p className="font-semibold text-emerald-300">Request sent ✓</p>
            <p className="mt-1 text-sm text-white/60">We’ll confirm availability and pricing with you shortly.</p>
          </div>
        ) : start ? (
          <div className="space-y-2.5">
            <input className={fieldCls} placeholder="Full name" value={name}
              onChange={(e) => setName(e.target.value)} autoComplete="name" />
            <input className={fieldCls} type="tel" inputMode="tel" placeholder="Phone" value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)} autoComplete="tel" />
            <input className={fieldCls} type="email" inputMode="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {formError && <p className="text-xs text-red-400">{formError}</p>}
            <button type="button" onClick={submitBooking} disabled={submitting}
              className="w-full bg-[#c9a96e] text-black py-3.5 rounded-full font-semibold hover:bg-white transition disabled:opacity-60">
              {submitting ? "Sending…" : "Request Booking"}
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="calendar_book"
              className="flex items-center justify-center gap-2 border border-white/15 text-white py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
              or Reserve on WhatsApp <span className="w-2 h-2 rounded-full bg-[#1f7a3f]" />
            </a>
            <button type="button" onClick={() => { setStart(null); setEnd(null); }}
              className="w-full text-white/40 text-xs hover:text-white/70 transition">
              Clear dates
            </button>
          </div>
        ) : (
          <button type="button" disabled
            className="w-full bg-white/10 text-white/40 py-3.5 rounded-full font-semibold cursor-not-allowed">
            Reserve on WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}

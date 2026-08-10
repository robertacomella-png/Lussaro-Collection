import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { business } from "@/data/business";

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

// Rental Dashboard backend (lead capture + booking requests). Open CORS.
const DASHBOARD = "https://rental-dashboard-nu.vercel.app";
// Word-order-proof key (matches the dashboard's keyOf).
const keyOf = (s) => (String(s || "").toLowerCase().match(/[a-z0-9]+/g) || []).sort().join("-");

// Seeded RNG → "pending" amber dates are stable per car through the day.
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

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

export default function BookingCalendar({ pricePerDay = 0, carName = "", vehicleId = null, phone = business.phone.replace("+", ""), blockedDates = [], tiers = TIERS }) {
  const today = useMemo(() => startOfDay(new Date()), []);

  // Real booked dates from the dashboard — matched by vehicle id when linked,
  // otherwise by car name. Booked days render red (unavailable).
  const carKey = useMemo(() => keyOf(carName), [carName]);
  const [apiBlocked, setApiBlocked] = useState(() => new Set()); // red (booked/rented)
  const [apiPending, setApiPending] = useState(() => new Set()); // amber (quotes)
  const blocked = useMemo(() => new Set([...blockedDates, ...apiBlocked]), [blockedDates, apiBlocked]);

  useEffect(() => {
    let alive = true;
    const toSet = (ranges) => {
      const out = new Set();
      (ranges || []).forEach((rg) => expandRange(rg.start, rg.end, out));
      return out;
    };
    fetch(`${DASHBOARD}/api/book`)
      .then((r) => r.json())
      .then((j) => {
        if (!alive || !j) return;
        setApiBlocked(toSet((vehicleId && j.availability && j.availability[vehicleId]) || (j.availabilityByName && j.availabilityByName[carKey])));
        setApiPending(toSet((vehicleId && j.pending && j.pending[vehicleId]) || (j.pendingByName && j.pendingByName[carKey])));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [vehicleId, carKey]);

  // Seeded scarcity "pending" amber dates (the random ones), merged with real quote dates.
  const [fakePending, setFakePending] = useState(() => new Set());
  useEffect(() => {
    const rng = mulberry32(hashStr(`${carName}|${iso(today)}`));
    const base = new Set();
    let guard = 0;
    while (base.size < 3 && guard++ < 200) base.add(1 + Math.floor(rng() * 14));
    const offsets = new Set();
    base.forEach((o) => {
      offsets.add(o);
      const dow = new Date(today.getTime() + o * DAY_MS).getDay();
      if (dow === 0 || dow === 5 || dow === 6) {
        let partner = dow === 0 ? o - 1 : o + 1;
        if (partner < 1 || partner > 14) partner = dow === 0 ? o + 1 : o - 1;
        if (partner >= 1 && partner <= 14) offsets.add(partner);
      }
    });
    const out = new Set();
    offsets.forEach((off) => out.add(iso(new Date(today.getTime() + off * DAY_MS))));
    setFakePending(out);
  }, [carName, today]);

  const pendingSet = useMemo(() => new Set([...fakePending, ...apiPending]), [fakePending, apiPending]);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // Booking form + lead capture
  const leadId = useMemo(() => getVisitorLeadId(), []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dob, setDob] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const fullName = `${firstName} ${lastName}`.trim();

  // Capture the lead (debounced) once we can reach them — a name + an email or
  // phone — even before they submit.
  useEffect(() => {
    if (!fullName || (!email.trim() && !contactPhone.trim())) return;
    const t = setTimeout(() => {
      fetch(`${DASHBOARD}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          name: fullName,
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
  }, [fullName, contactPhone, email, start, end, leadId, carName, vehicleId]);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [modalOpen]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);

  const isPast = (d) => d < today;
  const isAvailable = (d) => !isPast(d) && !blocked.has(iso(d));
  const isPending = (d) => isAvailable(d) && pendingSet.has(iso(d));

  function pick(d) {
    if (!isAvailable(d)) return;
    if (!start || (start && end)) { setStart(d); setEnd(null); return; }
    if (d <= start) { setStart(d); setEnd(null); return; }
    setEnd(d);
  }

  const days = start && end ? Math.round((end - start) / DAY_MS) : start ? 1 : 0;
  const billDays = Math.max(1, days);
  const subtotal = pricePerDay * billDays;
  const discountPct = tiers.reduce((acc, t) => (billDays >= t.days ? t.pct : acc), 0);
  const total = Math.round(subtotal * (1 - discountPct / 100));
  const saved = subtotal - total;
  const datesText = start ? `${fmt(start)}${end ? ` → ${fmt(end)}` : ""} · ${billDays} ${billDays === 1 ? "day" : "days"}` : "";

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
    if (!firstName.trim() || !lastName.trim()) return setFormError("First and last name are required.");
    if (!contactPhone.trim()) return setFormError("Phone is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setFormError("Please enter a valid email.");
    setSubmitting(true);
    const startISO = iso(start);
    const endISO = end ? iso(end) : startISO;
    const summary = `${fmt(start)}${end ? ` → ${fmt(end)}` : ""} (${billDays} ${billDays === 1 ? "day" : "days"})`;
    try {
      const r = await fetch(`${DASHBOARD}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_id: vehicleId || undefined,
          vehicle_name: carName,
          start_date: startISO,
          end_date: endISO,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: contactPhone.trim(),
          license_number: licenseNumber.trim(),
          dob: dob || undefined,
          note: `Requested from website — ${summary}.`,
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
          name: fullName,
          phone: contactPhone.trim(),
          email: email.trim(),
          vehicle: carName,
          dates: summary,
          message: `Website booking request${licenseNumber.trim() ? ` · License ${licenseNumber.trim()}` : ""}${dob ? ` · DOB ${dob}` : ""}`,
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
          {tiers.map((t) => {
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
              <span className="text-white/70 text-sm">{datesText}</span>
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
        ) : (
          <>
            <button type="button" disabled={!start} onClick={() => { setFormError(""); setModalOpen(true); }}
              className="w-full bg-[#c9a96e] text-black py-3.5 rounded-full font-semibold hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed">
              Book Now
            </button>
            {start && (
              <button type="button" onClick={() => { setStart(null); setEnd(null); }}
                className="w-full mt-2 text-white/40 text-xs hover:text-white/70 transition">
                Clear dates
              </button>
            )}
          </>
        )}
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {modalOpen && !submitted && (
          <motion.div
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 backdrop-blur-xl px-3 py-5 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-[28px] bg-[#111] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.65)] p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </button>

              <p className="text-[#c9a96e] tracking-[0.22em] uppercase text-[11px] mb-1">Reserve</p>
              <h3 className="text-2xl font-semibold text-white">{carName}</h3>
              <p className="text-white/55 text-sm mt-1">{datesText} · <span className="text-white/80">${total.toLocaleString()} est.</span></p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <input className={fieldCls} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
                <input className={fieldCls} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
                <input className={`${fieldCls} col-span-2`} type="tel" inputMode="tel" placeholder="Phone number" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} autoComplete="tel" />
                <input className={`${fieldCls} col-span-2`} type="email" inputMode="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <input className={`${fieldCls} col-span-2`} placeholder="Driver's license number" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                <div className="col-span-2">
                  <label className="block text-[11px] text-white/40 mb-1 ml-1">Date of birth</label>
                  <input className={fieldCls} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>

              {formError && <p className="text-xs text-red-400 mt-3">{formError}</p>}

              <button type="button" onClick={submitBooking} disabled={submitting}
                className="w-full mt-4 bg-[#c9a96e] text-black py-3.5 rounded-full font-semibold hover:bg-white transition disabled:opacity-60">
                {submitting ? "Sending…" : "Book Now"}
              </button>
              <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="calendar_book"
                className="flex items-center justify-center gap-2 mt-2 border border-white/15 text-white py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                or Reserve on WhatsApp <span className="w-2 h-2 rounded-full bg-[#1f7a3f]" />
              </a>
              <p className="text-white/30 text-[11px] text-center mt-3">No charge now — we confirm availability &amp; pricing first.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

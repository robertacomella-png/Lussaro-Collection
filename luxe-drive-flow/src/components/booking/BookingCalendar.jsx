import { useMemo, useState } from "react";

const DAY_MS = 86400000;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Availability calendar with green dots + range selection. All future dates are
// "available" by default; pass blockedDates (ISO yyyy-mm-dd strings) to grey some out.
// Booking is a WhatsApp message prefilled with the car + chosen dates.
export default function BookingCalendar({ pricePerDay = 0, carName = "", phone = "16452487305", blockedDates = [] }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const blocked = useMemo(() => new Set(blockedDates), [blockedDates]);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);

  const isPast = (d) => d < today;
  const isAvailable = (d) => !isPast(d) && !blocked.has(iso(d));

  function pick(d) {
    if (!isAvailable(d)) return;
    if (!start || (start && end)) { setStart(d); setEnd(null); return; }
    if (d <= start) { setStart(d); setEnd(null); return; }
    setEnd(d);
  }

  const days = start && end ? Math.round((end - start) / DAY_MS) : start ? 1 : 0;
  const total = pricePerDay * Math.max(1, days);

  const msg = !start
    ? ""
    : end
    ? `Hi! I'd like to book the ${carName} from ${fmt(start)} to ${fmt(end)} (${days} ${days === 1 ? "day" : "days"}). Is it available?`
    : `Hi! I'd like to book the ${carName} on ${fmt(start)}. Is it available?`;
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));

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
          const isStart = sameDay(d, start);
          const isEnd = sameDay(d, end);
          const inRange = start && end && d > start && d < end;
          const selected = isStart || isEnd;
          let cls = "relative h-10 rounded-lg flex items-center justify-center text-sm transition ";
          if (!avail) cls += "text-white/20 cursor-not-allowed";
          else if (selected) cls += "bg-[#c9a96e] text-black font-semibold";
          else if (inRange) cls += "bg-[#c9a96e]/20 text-white";
          else cls += "text-white hover:bg-white/10";
          return (
            <button type="button" key={i} disabled={!avail} onClick={() => pick(d)} className={cls}>
              {d.getDate()}
              {avail && !selected && !inRange && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* legend */}
      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-white/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
      </div>

      {/* summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        {start ? (
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-white/75">
              {fmt(start)}{end ? ` → ${fmt(end)}` : ""} · {Math.max(1, days)} {Math.max(1, days) === 1 ? "day" : "days"}
            </span>
            <span className="text-white font-semibold">${total.toLocaleString()}<span className="text-white/40 text-xs font-normal"> est.</span></span>
          </div>
        ) : (
          <p className="text-white/45 text-sm mb-3">Pick your pick-up{end ? "" : " and return"} dates.</p>
        )}

        {start ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="calendar_book"
            className="flex items-center justify-center gap-2 bg-[#c9a96e] text-black py-3.5 rounded-full font-semibold hover:bg-white transition">
            Reserve on WhatsApp <span className="w-2 h-2 rounded-full bg-[#1f7a3f]" />
          </a>
        ) : (
          <button type="button" disabled
            className="w-full bg-white/10 text-white/40 py-3.5 rounded-full font-semibold cursor-not-allowed">
            Reserve on WhatsApp
          </button>
        )}

        {start && (
          <button type="button" onClick={() => { setStart(null); setEnd(null); }}
            className="w-full mt-2 text-white/40 text-xs hover:text-white/70 transition">
            Clear dates
          </button>
        )}
      </div>
    </div>
  );
}

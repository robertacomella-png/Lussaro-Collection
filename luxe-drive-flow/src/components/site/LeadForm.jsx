import { useState } from "react";
import { fleet } from "@/data/fleet";
import { withAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track";

// `variant="booking"` is the blog hero: car, dates, name, phone. The full
// form (homepage, fleet, contact, car pages) is the default and stays as it
// was. `source` is the lead source lead.js already forwards into the CRM note.
// Blog posts pass the post URL; everything else keeps "lead_form".
export default function LeadForm({ defaultVehicle = "", source = "lead_form", variant = "full" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");
  const booking = variant === "booking";

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = withAttribution(
      { ...Object.fromEntries(new FormData(form).entries()), source: source || "lead_form" },
      "LeadForm",
    );

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      trackLead({
        vehicle: payload.vehicle || "unspecified",
        lead_id: data.lead_id,
        email: payload.email,
        phone: payload.phone,
      });
      setStatus("ok");
      form.reset();
    } catch (err) {
      setError(err.message || "Could not send.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center max-w-md mx-auto py-10">
        <p className="text-[#ff1516] text-4xl mb-4">✓</p>
        <h3 className="font-display text-2xl font-semibold text-white mb-2">Request received</h3>
        <p className="text-white/60">We'll be in touch shortly. For the fastest response, message us on WhatsApp.</p>
      </div>
    );
  }

  // placeholder-white/50 rather than /35: white at 35% over this field's near
  // black sits at 3.0:1, under the 4.5:1 WCAG AA floor for body text.
  const field = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#ff1516] transition";

  // Every control carries an explicit aria-label. The visible cue is the
  // placeholder, and a <select> has no placeholder attribute to fall back on —
  // so it reached screen readers and AI agents as an unnamed combobox. The
  // inputs are labelled for the same reason rather than leaning on their
  // placeholder, which is only a fallback accessible name and disappears the
  // moment someone types.
  const vehicleSelect = (
    <select name="vehicle" aria-label="Choose a car" className={field} defaultValue={defaultVehicle}>
      <option value="" disabled>Choose a car</option>
      {fleet.map((c) => (
        <option key={c.id} value={c.name} className="bg-[#111]">{c.name}</option>
      ))}
    </select>
  );

  return (
    <form onSubmit={onSubmit} className={booking ? "grid gap-3" : "max-w-xl mx-auto grid gap-3"}>
      {booking ? (
        <>
          {vehicleSelect}
          <input name="dates" placeholder="Dates (e.g. Jun 20–22)" aria-label="Rental dates" className={field} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="name" required placeholder="Name*" aria-label="Your name" className={field} />
            <input name="phone" required placeholder="Phone*" inputMode="tel" aria-label="Your phone number" className={field} />
          </div>
          {/* Backstop so the post URL is in the form body even before the
              submit handler copies `source`. lead.js already stores this. */}
          <input type="hidden" name="source" value={source} />
        </>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="name" required placeholder="Name*" aria-label="Your name" className={field} />
            <input name="phone" required placeholder="Phone*" inputMode="tel" aria-label="Your phone number" className={field} />
          </div>
          <input name="email" type="email" placeholder="Email" aria-label="Your email address" className={field} />
          <div className="grid sm:grid-cols-2 gap-3">
            {vehicleSelect}
            <input name="dates" placeholder="Dates (e.g. Jun 20–22)" aria-label="Rental dates" className={field} />
          </div>
          <textarea name="message" rows="3" placeholder="Anything else?" aria-label="Anything else we should know?" className={field}></textarea>
        </>
      )}

      {status === "error" && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-[#ff1516] transition disabled:opacity-60${booking ? " min-h-[48px]" : ""}`}
      >
        {status === "sending" ? "Sending…" : "Request Availability"}
      </button>
      {!booking && (
        <p className="text-white/50 text-xs text-center">Prefer to talk now? Call or WhatsApp us.</p>
      )}
    </form>
  );
}

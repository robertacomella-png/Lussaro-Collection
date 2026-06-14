import { useState } from "react";
import { fleet } from "@/data/fleet";
import { trackLead } from "@/lib/track";

export default function LeadForm({ defaultVehicle = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      trackLead({ vehicle: payload.vehicle || "unspecified" });
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
        <p className="text-[#c9a96e] text-4xl mb-4">✓</p>
        <h3 className="font-display text-2xl font-semibold text-white mb-2">Request received</h3>
        <p className="text-white/60">We'll be in touch shortly. For the fastest response, message us on WhatsApp.</p>
      </div>
    );
  }

  const field = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:border-[#c9a96e] transition";

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Name*" className={field} />
        <input name="phone" required placeholder="Phone*" inputMode="tel" className={field} />
      </div>
      <input name="email" type="email" placeholder="Email" className={field} />
      <div className="grid sm:grid-cols-2 gap-3">
        <select name="vehicle" className={field} defaultValue={defaultVehicle}>
          <option value="" disabled>Choose a car</option>
          {fleet.map((c) => (
            <option key={c.id} value={c.name} className="bg-[#111]">{c.name}</option>
          ))}
        </select>
        <input name="dates" placeholder="Dates (e.g. Jun 20–22)" className={field} />
      </div>
      <textarea name="message" rows="3" placeholder="Anything else?" className={field}></textarea>

      {status === "error" && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#c9a96e] text-black py-4 rounded-full font-semibold hover:bg-white transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request Availability"}
      </button>
      <p className="text-white/35 text-xs text-center">Prefer to talk now? Call or WhatsApp us — we reply in minutes.</p>
    </form>
  );
}

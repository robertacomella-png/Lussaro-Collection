import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";

export default function Terms() {
  useSeo({
    title: "Terms of Service",
    description:
      "Review the Terms of Service for renting luxury cars with Lussaro Collection in Miami. Eligibility, booking, deposits, liability, and legal terms.",
    url: "https://www.lussarocollection.com/terms",
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>

        <div className="space-y-10 text-white/80 text-sm leading-relaxed">
          <p>
            These Terms of Service govern your use of Lussaro Collection’s luxury car rental services in Miami. By requesting a reservation, renting a vehicle, or using our website, you agree to these terms.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Eligibility & Requirements</h2>
            <p>To reserve and operate any vehicle, you must meet the following conditions:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Be at least 21 years of age.</li>
              <li>Hold a valid, full driver’s license.</li>
              <li>Maintain full coverage insurance that applies to rental vehicles.</li>
              <li>Provide accurate personal information and documentation.</li>
            </ul>
            <p>Failure to meet these requirements may result in rental denial or reservation cancellation.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Reservations, Payments & Confirmation</h2>
            <p>All reservations are subject to availability and approval. A booking is confirmed only after payment and document verification are completed.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Prices may change without prior notice.</li>
              <li>We may cancel or refuse any reservation at our discretion.</li>
              <li>Additional fees may apply for special requests, delivery, or changes to the rental.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Security Deposit</h2>
            <p>A security deposit is required for all rentals. Deposit amounts vary by vehicle and are disclosed before booking.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Deposits may cover damage, excess mileage, late returns, cleaning, or fees.</li>
              <li>Deposits are returned following vehicle inspection, less applicable deductions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Use of Vehicle</h2>
            <p>You must operate the rental vehicle responsibly, obey all laws, and follow these conditions:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Use the vehicle for personal, non-commercial purposes only.</li>
              <li>Only authorized drivers may operate the vehicle.</li>
              <li>Do not drive while impaired by alcohol or drugs.</li>
              <li>Do not use the vehicle for racing, off-road driving, ride-sharing, commercial hauling, or illegal activity.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Damage, Liability & Insurance</h2>
            <p>You are responsible for the vehicle during the rental period. This includes:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Any damage to the vehicle.</li>
              <li>Loss of use or diminished value.</li>
              <li>Towing, recovery, and administrative fees.</li>
            </ul>
            <p>If your insurance does not cover damage, you are personally liable for all costs.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Tickets, Tolls & Fines</h2>
            <p>Renters are responsible for all tickets, tolls, fines, and penalties incurred during their rental period.</p>
            <p>Lussaro Collection may charge administrative fees for processing violations or notices.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Late Fees & Return Policy</h2>
            <p>Vehicles must be returned on time and in the agreed condition. Late returns may incur additional charges.</p>
            <p>We reserve the right to end the rental early for safety, misuse, or policy violations.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. GPS & Monitoring</h2>
            <p>Vehicles may include GPS tracking and monitoring systems for safety, misuse prevention, and recovery. Renting a vehicle constitutes consent to these systems.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Damage Reporting & Accidents</h2>
            <p>You must notify Lussaro Collection immediately after any accident, damage, or incident. Prompt reporting is required for insurance and claims processing.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Florida Governing Law</h2>
            <p>These Terms are governed by the laws of the State of Florida. Any disputes will be resolved in courts located in Miami, Florida.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Modifications</h2>
            <p>Lussaro Collection may update these Terms at any time. Continued use of services after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section className="space-y-4 pb-10">
            <h2 className="text-2xl font-semibold">12. Contact Information</h2>
            <p>
              Lussaro Collection<br />
              Miami, Florida<br />
              WhatsApp: +1 (645) 248-7305
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

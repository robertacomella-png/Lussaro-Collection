import Navbar from "@/components/navbar/Navbar";

export default function Terms() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>

        <div className="space-y-10 text-white/75 text-sm leading-relaxed">
          <p>
            These Terms of Service (“Terms”) govern all use of services provided by Lussaro Collection (“Company,” “we,” “us,” or “our”). By accessing our website, requesting a reservation, or renting a vehicle, you (“Client,” “Renter,” or “you”) agree to be bound by these Terms.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Eligibility Requirements</h2>
            <p>To rent or operate any vehicle, you must:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Be at least 21 years of age</li>
              <li>Possess a valid driver’s license</li>
              <li>Maintain full coverage insurance that applies to rental vehicles</li>
              <li>Provide accurate and complete identification and documentation</li>
            </ul>
            <p>We reserve the right to deny service at our sole discretion.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Reservations & Payments</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>All reservations are subject to availability and approval</li>
              <li>Pricing is subject to change without notice</li>
              <li>A reservation is not confirmed until payment and verification are completed</li>
              <li>We reserve the right to cancel or refuse any booking at any time</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Security Deposit</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>A security deposit is required for all rentals</li>
              <li>Deposit amounts vary by vehicle and are disclosed prior to booking</li>
              <li>Deposits may be used to cover:</li>
            </ul>
            <ul className="list-disc list-inside ml-6 space-y-2 text-white/70">
              <li>Damages</li>
              <li>Excess mileage</li>
              <li>Late returns</li>
              <li>Cleaning fees</li>
              <li>Traffic violations or fines</li>
            </ul>
            <p>Deposits are typically returned within a reasonable timeframe after inspection, minus any applicable charges.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Use of Vehicle</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Operate the vehicle responsibly and in accordance with all laws</li>
              <li>Use the vehicle for personal use only</li>
              <li>Not allow any unauthorized drivers</li>
              <li>Not operate under the influence of drugs or alcohol</li>
              <li>Not use the vehicle for:</li>
            </ul>
            <ul className="list-disc list-inside ml-6 space-y-2 text-white/70">
              <li>Racing or reckless driving</li>
              <li>Illegal activities</li>
              <li>Ride-sharing or commercial purposes</li>
              <li>Off-road driving</li>
            </ul>
            <p>Any violation of these conditions may result in immediate termination of the rental without refund.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Liability & Responsibility</h2>
            <p>You assume full responsibility for the vehicle during the rental period.</p>
            <p>You are liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Any and all damage to the vehicle</li>
              <li>Loss of use</li>
              <li>Diminished value</li>
              <li>Towing and recovery costs</li>
              <li>Administrative and processing fees</li>
            </ul>
            <p>Insurance coverage must be valid and sufficient. If your insurance does not cover damages, you are personally responsible for all costs.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Accidents & Incidents</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>You must notify us immediately</li>
              <li>You must cooperate fully with law enforcement and insurance providers</li>
              <li>Failure to report incidents promptly may result in additional liability</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Mileage & Fees</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Mileage limits are defined per rental</li>
              <li>Excess mileage is charged at the agreed rate</li>
              <li>Additional fees may include:</li>
            </ul>
            <ul className="list-disc list-inside ml-6 space-y-2 text-white/70">
              <li>Late return fees</li>
              <li>Cleaning/detailing fees</li>
              <li>Fuel charges</li>
              <li>Administrative fees</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Cancellations & Refunds</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>All bookings may be subject to a non-refundable policy</li>
              <li>Cancellation terms are disclosed at the time of booking</li>
              <li>We reserve the right to retain payments for cancellations, no-shows, or violations</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Vehicle Condition</h2>
            <p>Vehicles are provided in premium condition.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Return the vehicle in the same condition received</li>
              <li>Be responsible for any interior or exterior damage</li>
              <li>Avoid smoking, excessive wear, or misuse</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">10. GPS & Monitoring</h2>
            <p>Vehicles may be equipped with GPS tracking and monitoring systems.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Location tracking</li>
              <li>Monitoring for safety, misuse, and recovery purposes</li>
            </ul>
            <p>By renting, you consent to these systems.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Lussaro Collection is not liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Indirect or consequential damages</li>
              <li>Loss of personal property</li>
              <li>Personal injury resulting from misuse or negligence</li>
              <li>Third-party claims arising from your use of the vehicle</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">12. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Lussaro Collection from any claims, damages, liabilities, or expenses arising from:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Your use of the vehicle</li>
              <li>Violations of these Terms</li>
              <li>Negligence or misconduct</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">13. Force Majeure</h2>
            <p>We are not responsible for failure to perform due to events beyond our control, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Weather</li>
              <li>Natural disasters</li>
              <li>Mechanical failures</li>
              <li>Government actions</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">14. Modifications</h2>
            <p>We reserve the right to modify these Terms at any time. Continued use of our services constitutes acceptance of updated Terms.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">15. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the State of Florida. Any disputes shall be resolved in the appropriate courts located in Miami, Florida.</p>
          </div>

          <div className="space-y-4 pb-10">
            <h2 className="text-2xl font-semibold">16. Contact Information</h2>
            <p>
              Lussaro Collection<br />
              Miami, Florida<br />
              WhatsApp: +1 (645) 248-7305
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";

export default function Privacy() {
  useSeo({
    title: "Privacy Policy",
    description:
      "Read the Privacy Policy for Lussaro Collection. Learn how we collect, use, and protect your information for Miami luxury car rentals.",
    url: "https://www.lussarocollection.com/privacy",
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">Privacy Policy</h1>

        <div className="space-y-10 text-white/80 text-sm leading-relaxed">
          <p>
            Lussaro Collection cares about your privacy and the confidentiality of your personal information. This Privacy Policy describes how we collect, use, and protect information when you visit our website or book luxury car rentals in Miami.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We collect information needed to support the booking experience, communicate with you, and operate our services effectively.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Personal information: name, phone number, email address, and rental details.</li>
              <li>Rental-related data: driver’s license, insurance, and reservation details.</li>
              <li>Technical information: IP address, browser type, device type, and pages visited.</li>
              <li>Communications data: messages sent through WhatsApp, contact forms, email, or phone.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Process and manage booking requests.</li>
              <li>Communicate with you about reservations, confirmations, and support.</li>
              <li>Verify eligibility, insurance, and rental requirements.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Detect fraud or unauthorized activity.</li>
              <li>Meet legal obligations.</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. WhatsApp Communications</h2>
            <p>When you message us on WhatsApp, we may store your contact information and conversation history to support your booking and follow-up service. These messages are used only for the purposes of rental coordination, customer support, and service delivery.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Cookies & Tracking Technologies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, analyze site performance, and support marketing efforts.</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Session cookies for site functionality.</li>
              <li>Analytics tracking to understand visitor behavior.</li>
              <li>Marketing pixels to measure campaign effectiveness.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Google Analytics & Meta Pixel</h2>
            <p>We may use Google Analytics to collect anonymous usage data and Meta Pixel to improve our advertising and measure campaign performance. These services help us understand how visitors use the site and identify areas for improvement.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Third-Party Platforms</h2>
            <p>We may share limited information with trusted third-party providers who support our business, such as payment processors, analytics tools, and communication platforms like WhatsApp.</p>
            <p>These providers are required to protect your data and may only use it to perform contracted services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Data Retention</h2>
            <p>We retain personal information only as long as necessary to fulfill booking requests, provide services, comply with legal obligations, and resolve disputes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Request access to your personal data.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data, subject to legal requirements.</li>
              <li>Withdraw consent where applicable.</li>
            </ul>
            <p>Contact us to exercise any of these rights.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Security</h2>
            <p>We use reasonable administrative, technical, and physical safeguards to protect your personal information. However, no system is completely secure, and we cannot guarantee absolute protection.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Updates to This Policy</h2>
            <p>We may update this Privacy Policy at any time. Changes become effective when posted to the website. Continued use of the site after updates signifies acceptance of the revised policy.</p>
          </section>

          <section className="space-y-4 pb-10">
            <h2 className="text-2xl font-semibold">11. Contact</h2>
            <p>
              Lussaro Collection<br />
              Miami, Florida<br />
              WhatsApp: +1 (645) 248-7305<br />
              Email: [Insert Email]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

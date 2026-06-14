import { Link, useLocation } from "react-router-dom";
import { useSeo } from "@/lib/useSeo";
import Navbar from "@/components/navbar/Navbar";
import { Home, MessageCircle } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  useSeo({
    title: "Page Not Found",
    description:
      "The page you were looking for could not be found. Explore the Lussaro Collection fleet of Miami luxury and exotic car rentals.",
    url: "https://www.lussarocollection.com",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-xl w-full text-center">
          <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-6">
            Lussaro Collection
          </p>

          <h1 className="text-7xl md:text-9xl font-semibold leading-none tracking-tight">
            404
          </h1>

          <div className="h-px w-16 bg-[#c9a96e]/50 mx-auto my-8" />

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            This road doesn’t exist
          </h2>

          <p className="text-white/60 leading-relaxed mb-10">
            {pageName ? (
              <>
                We couldn’t find{" "}
                <span className="text-white/80">“/{pageName}”</span>. It may have
                moved or never existed.
              </>
            ) : (
              "The page you were looking for could not be found."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a96e] text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white transition"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>

            <a
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:border-[#c9a96e] hover:text-[#c9a96e] transition"
            >
              Contact Us
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

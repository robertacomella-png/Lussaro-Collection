import { useEffect } from "react";
import { X } from "lucide-react";

export default function BookingModal({ onClose }) {
  useEffect(() => {
    const container = document.getElementById("fleet-widget-container");
    if (container) container.style.display = "block";
    return () => {
      if (container) container.style.display = "none";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-[#111] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
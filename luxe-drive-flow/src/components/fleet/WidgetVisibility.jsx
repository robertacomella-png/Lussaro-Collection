import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function WidgetVisibility() {
  const location = useLocation();

  useEffect(() => {
    const widget = document.getElementById("fleet-widget-container");
    if (!widget) return;

    if (location.pathname === "/") {
      widget.style.display = "block";
    } else {
      widget.style.display = "none";
    }
  }, [location.pathname]);

  return null;
}

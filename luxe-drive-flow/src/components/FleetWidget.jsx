import { useEffect } from "react";

export default function FleetWidget() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://getautoflow.io/fleet-widget.js"]'
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://getautoflow.io/fleet-widget.js";
      script.setAttribute("data-widget-id", "Ov8zdTMWBJMRhG2gdon5xhd8n383");
      script.setAttribute("data-theme", "dark");
      script.setAttribute("data-color", "#bfa673");
      script.setAttribute("data-company", "Lussaro Collection LLC");
      script.setAttribute("data-language", "en");
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const container = document.getElementById("fleet-widget-container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return <div id="fleet-widget-container" />;
}

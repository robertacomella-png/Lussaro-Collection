import { useEffect } from "react";

export default function FleetWidget() {
  useEffect(() => {
    const oldScript = document.querySelector(
      'script[src="https://getautoflow.io/fleet-widget.js"]'
    );

    if (oldScript) {
      oldScript.remove();
    }

    const container = document.getElementById("fleet-widget-container");
    if (container) {
      container.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://getautoflow.io/fleet-widget.js";
    script.async = true;
    script.setAttribute("data-widget-id", "Ov8zdTMWBJMRhG2gdon5xhd8n383");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-color", "#bfa673");
    script.setAttribute("data-company", "Lussaro Collection LLC");
    script.setAttribute("data-language", "en");
    document.body.appendChild(script);

    return () => {
      const widgetContainer = document.getElementById("fleet-widget-container");
      if (widgetContainer) {
        widgetContainer.innerHTML = "";
      }
    };
  }, []);

  return <div id="fleet-widget-container" />;
}

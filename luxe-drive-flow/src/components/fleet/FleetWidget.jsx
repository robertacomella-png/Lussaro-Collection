import { useEffect } from "react";

export default function FleetWidget() {
  useEffect(() => {
    const container = document.getElementById("fleet-widget-container");
    if (!container) return;

    container.innerHTML = "";

    const oldScript = document.getElementById("autoflow-fleet-script");
    if (oldScript) {
      oldScript.remove();
    }

    const timeout = setTimeout(() => {
      const script = document.createElement("script");
      script.id = "autoflow-fleet-script";
      script.src = "https://getautoflow.io/fleet-widget.js";
      script.async = true;
      script.setAttribute("data-widget-id", "Ov8zdTMWBJMRhG2gdon5xhd8n383");
      script.setAttribute("data-theme", "dark");
      script.setAttribute("data-color", "#bfa673");
      script.setAttribute("data-company", "Lussaro Collection LLC");
      script.setAttribute("data-language", "en");
      document.body.appendChild(script);
    }, 300);

    return () => {
      clearTimeout(timeout);

      const script = document.getElementById("autoflow-fleet-script");
      if (script) script.remove();

      const widgetContainer = document.getElementById("fleet-widget-container");
      if (widgetContainer) widgetContainer.innerHTML = "";
    };
  }, []);

  return (
    <div className="w-full">
      <div id="fleet-widget-container" />
    </div>
  );
}

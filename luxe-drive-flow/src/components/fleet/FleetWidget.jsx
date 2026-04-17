import { useEffect, useRef } from "react";

export default function FleetWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://getautoflow.io/fleet-widget.js";
    script.async = true;
    script.setAttribute("data-widget-id", "Ov8zdTMWBJMRhG2gdon5xhd8n383");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-color", "#bfa673");
    script.setAttribute("data-company", "Lussaro Collection LLC");
    script.setAttribute("data-language", "en");

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div id="fleet-widget-container" ref={containerRef} />;
}

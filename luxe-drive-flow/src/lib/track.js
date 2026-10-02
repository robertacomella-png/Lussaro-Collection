// Conversion tracking — push standardized events into the GTM dataLayer.
// Map these to the Meta Pixel (and any other tags) inside the GTM UI, so the
// site code never needs to change when pixels/tags change.
//
// Standard events:
//   whatsapp_click  — any WhatsApp CTA
//   call_click      — any tap-to-call CTA
//   lead_submit     — contact/lead form submission (also reported to the
//                     OpenAI Pixel as lead_created; see trackLead below)
//   view_vehicle    — opened a car's detail/modal

export function track(event, data = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export const trackWhatsApp = (location, extra = {}) =>
  track('whatsapp_click', { cta_location: location, ...extra });

export const trackCall = (location, extra = {}) =>
  track('call_click', { cta_location: location, ...extra });

// A successful lead-form submit is the conversion, so the OpenAI Pixel's
// lead_created fires from here rather than from the component — this module is
// where every conversion event in the site is defined.
//
// window.oaiq is the queueing stub installed in Layout.astro's <head>: calls
// made before its SDK finishes loading are replayed, not dropped. Guarded all
// the same, so a blocked or stripped inline script degrades to the dataLayer
// push alone instead of throwing inside the form's submit handler.
export const trackLead = (extra = {}) => {
  track('lead_submit', extra);
  if (typeof window !== 'undefined' && typeof window.oaiq === 'function') {
    window.oaiq('measure', 'lead_created', { type: 'customer_action' });
  }
};

export const trackViewVehicle = (name) => track('view_vehicle', { vehicle: name });

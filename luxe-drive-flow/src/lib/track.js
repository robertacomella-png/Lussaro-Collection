// Conversion tracking — push standardized events into the GTM dataLayer.
// Map these to the Meta Pixel (and any other tags) inside the GTM UI, so the
// site code never needs to change when pixels/tags change.
//
// Standard events:
//   whatsapp_click  — any WhatsApp CTA
//   call_click      — any tap-to-call CTA
//   lead_submit     — contact/lead form submission
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

export const trackLead = (extra = {}) => track('lead_submit', extra);

export const trackViewVehicle = (name) => track('view_vehicle', { vehicle: name });

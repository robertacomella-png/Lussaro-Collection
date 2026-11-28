// Phone and email checks shared by every quote form (QuoteDialog, HeroQuoteBar).
// Moved here from QuoteDialog.astro on 27 Nov 2026 so the two forms cannot drift.

// Real contact details only (owner's request, 23 Nov 2026). A lead with a
// made-up number or address cannot be quoted, so it is stopped here.
//
// Phone: a valid North American number (10 digits, or 11 with a leading 1)
// or an international number written with "+" (8–15 digits). NANP rules:
// area code and exchange cannot start with 0 or 1, area code cannot be N11,
// 555-01xx is the fiction range, and repeated or sequential digits are fake.
// Sent on as +1XXXXXXXXXX so the dashboard gets one format.
export function checkPhone(raw) {
  const v = raw.trim();
  if (!v) return { error: 'Please add your phone number.' };
  const digits = v.replace(/\D/g, '');
  if (v.startsWith('+') && !v.startsWith('+1')) {
    return digits.length >= 8 && digits.length <= 15 && !/^(\d)\1+$/.test(digits)
      ? { value: '+' + digits }
      : { error: 'Please enter a valid phone number, with country code.' };
  }
  const n = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  const bad = 'Please enter a real 10-digit phone number.';
  if (n.length !== 10) return { error: bad };
  const area = n.slice(0, 3), exch = n.slice(3, 6), line = n.slice(6);
  if (/^[01]/.test(area) || /^[01]/.test(exch) || /^\d11$/.test(area)) return { error: bad };
  if (exch === '555' && /^01/.test(line)) return { error: bad };
  if (/^(\d)\1+$/.test(n) || '01234567890123'.includes(n) || '98765432109876'.includes(n)) return { error: bad };
  return { value: '+1' + n };
}

// Email: a real-shaped address with a proper domain, not a placeholder or
// throwaway inbox, with a nudge for the commonest domain typos.
const FAKE = /^(example\.(com|org|net)|test\.(com|net)|test|email\.test|domain\.com|mailinator\.com|yopmail\.com|guerrillamail\.com|10minutemail\.com|tempmail\.com|temp-mail\.org|sharklasers\.com|trashmail\.com)$/;
const TYPOS = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'icloud.co': 'icloud.com', 'iclod.com': 'icloud.com', 'outlok.com': 'outlook.com' };
export function checkEmail(raw) {
  const v = raw.trim().toLowerCase();
  if (!v) return { error: 'Please add your email.' };
  if (!/^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(v) || v.includes('..')) {
    return { error: 'Please enter a valid email address.' };
  }
  const [local, domain] = v.split('@');
  if (TYPOS[domain]) return { error: `Did you mean ${local}@${TYPOS[domain]}?` };
  if (FAKE.test(domain) || /^(test|asdf|fake|none|no|na|aaa+)$/.test(local)) {
    return { error: 'Please use your real email so we can send your quote.' };
  }
  return { value: v };
}


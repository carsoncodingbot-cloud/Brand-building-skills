/**
 * Glacier Heating & Air — single source of truth.
 * Swap the placeholder contact values (phone/email/address) for the real ones
 * and every page, schema block, and click-to-call updates automatically.
 */
export const site = {
  name: "Glacier Heating & Air",
  shortName: "Glacier",
  legalName: "Glacier Heating & Air LLC",
  tagline: "San Antonio's Coolest HVAC Team",
  membership: "Glacier Club",
  foundedYear: 2009,

  // ---- Contact (PLACEHOLDERS — replace with real business details) ----
  phoneDisplay: "(205) 601-3797",
  phoneHref: "tel:+12056013797",
  email: "hello@glacierheatingair.com",
  address: {
    street: "1100 NW Loop 410",
    city: "San Antonio",
    region: "TX",
    postalCode: "78213",
    country: "US",
  },
  geo: { lat: "29.5149", lng: "-98.5183" }, // San Antonio approx
  hours: {
    weekdays: "Mon–Fri: 8:00 AM – 6:00 PM",
    weekend: "Sat–Sun: Emergency service",
    emergency: "24/7 Emergency Service",
  },
  license: "TACLB Lic. #TACLB000000C", // placeholder TX HVAC license
  priceRange: "$$",

  // ---- Web ----
  url: "https://glacierheatingair.com",
  bookingUrl: "/contact", // swap for external scheduler when live
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },

  ratingValue: "4.9",
  reviewCount: "687",

  // Original AI-generated yeti mascot (Glacier's own art), background removed so
  // it's a transparent die-cut that blends onto any section. Run `npm run mascot`
  // to self-host it to /public/mascot.png for production.
  mascotUrl:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3EFHqkjAJw1tPqwYodNRagIPXqe/hf_20260705_200156_a2663776-36a3-4700-9d06-42231a078ccf.png",
} as const;

export const NAV_SERVICES = [
  { label: "Air Conditioning", href: "/services/air-conditioning" },
  { label: "Heating", href: "/services/heating" },
  { label: "Indoor Air Quality", href: "/services/indoor-air-quality" },
  { label: "Ductless Mini-Splits", href: "/services/ductless-mini-splits" },
  { label: "Commercial HVAC", href: "/services/commercial-hvac" },
  { label: "Water Heaters", href: "/services/water-heaters" },
  { label: "Plumbing", href: "/plumbing" },
];

export const NAV_QUICK = [
  { label: "About Us", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Reviews", href: "/reviews" },
  { label: "Financing", href: "/financing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

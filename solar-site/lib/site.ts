/**
 * Daylight Solar — single source of truth.
 *
 * ⚠️  BRAND SWAP: every placeholder below (name, domain, phone, email,
 * address, license, socials) is centralized HERE. Swap these values for the
 * real company details and every page, schema block, click-to-call, and
 * footer updates automatically. Nothing else needs editing.
 */
export const site = {
  name: "Daylight Solar",                       // PLACEHOLDER — your company name
  shortName: "Daylight",
  legalName: "Daylight Solar LLC",              // PLACEHOLDER
  tagline: "The Inland Empire's Straight-Answer Solar Company",
  signature: "Built for 110° summers. Run on plain math.",
  foundedYear: 2016,

  // ---- Contact (PLACEHOLDERS — replace with real business details) ----
  // 555 numbers are intentionally unroutable so a preview build can never
  // ring a stranger. Swap for the real tracking number before launch.
  phoneDisplay: "(951) 555-0187",
  phoneHref: "tel:+19515550187",
  email: "hello@godaylightsolar.com",
  address: {
    street: "3600 Lime St",                     // PLACEHOLDER
    city: "Riverside",
    region: "CA",
    postalCode: "92501",
    country: "US",
  },
  geo: { lat: "33.9806", lng: "-117.3755" },     // Riverside approx
  hours: {
    weekdays: "Mon–Fri: 8:00 AM – 7:00 PM",
    weekend: "Sat: 9:00 AM – 5:00 PM",
    emergency: "Evening & weekend consults available",
  },
  // CSLB C-46 (Solar) / C-10 (Electrical) — Texas-style TACLA law applies in
  // CA too: the CSLB number must appear in advertising. PLACEHOLDER until real.
  license: "CSLB Lic. #0000000 (C-46 Solar)",
  priceRange: "$$",

  // ---- Web ----
  url: "https://godaylightsolar.com",           // PLACEHOLDER — your real domain
  bookingUrl: "/contact",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },

  // Kept OUT of schema and ad copy until a real Google profile accrues
  // (Honesty Law — no aggregateRating until verifiable).
  ratingValue: "4.9",
  reviewCount: "312",

  // GoHighLevel inbound-webhook URL for the 60-Second Solar Reality Check.
  // In GHL: Automations → Create Workflow → trigger "Inbound Webhook" →
  // copy the URL here. Every submission posts name/email/phone/zip plus all
  // four answers + segment as JSON, so your automations fire the follow-up
  // text instantly. REQUIRED before driving traffic: submissions go straight
  // to the confirmation page, so until this is set they reach no one.
  ghlWebhook: "" as string,
} as const;

export const NAV_SERVICES = [
  { label: "Residential Solar", href: "/services/residential-solar" },
  { label: "Battery Storage", href: "/services/battery-storage" },
  { label: "Solar + New Roof", href: "/services/solar-plus-roof" },
  { label: "EV Charger Install", href: "/services/ev-charger-installation" },
  { label: "Main Panel Upgrade", href: "/services/main-panel-upgrade" },
  { label: "Solar Repair & Rescue", href: "/services/solar-repair-service" },
];

export const NAV_QUICK = [
  { label: "About Us", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "The Daylight Standard", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
  { label: "Financing", href: "/financing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

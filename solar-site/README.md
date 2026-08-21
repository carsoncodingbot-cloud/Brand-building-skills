# Daylight Solar — solar-site

The Inland Empire solar vertical built on the Home Service Brand Machine v2.0
(reference build: `glacier-site/`). Next.js static export, zero backend, every
brand law from `glacier-site/brand/HOME-SERVICE-BRAND-MACHINE.html` applied
with the solar skin.

## Swap in the real company (one file)

Everything branded is centralized in **`lib/site.ts`** — name, legal name,
legal name, phone (currently an unroutable 555 placeholder so previews
can't ring a stranger), email, address, CSLB license, socials, and the GoHighLevel
webhook. Swap those values and every page, schema block, click-to-call, and
footer updates.

**Before driving traffic, in order:**
1. `lib/site.ts` → real name/domain/phone/email/address/license.
2. `ghlWebhook` → your GHL inbound-webhook URL (Automations → Inbound Webhook).
   Until set, funnel submissions only land in the visitor's localStorage.
3. Replace `sampleReviews` in `components/Reviews.tsx` with real reviews once
   the Google Business Profile accrues them. `aggregateRating` stays OUT of
   schema until then (Honesty Law).
4. Re-render `public/og.png` + `public/blog/*.png` with the real name/phone
   (see the scratchpad render script) or your own brand art.

## Develop

```bash
npm install
npm run dev          # local dev
EXPORT=true npm run build   # static export → out/
```

## The funnel

`components/SystemCheck.tsx` — the 60-Second Solar Reality Check. Six graded
questions in NEPQ order (bill / utility / shade / goal / timing / ownership),
six segments (priority, battery, planner, small-bill honest read, heavy-shade
honest read, renter), three-act flow: questions → honest read + capture
(name / email / phone / street address / ZIP + optional utility-bill upload,
compressed in-browser and shipped inline in the webhook payload when small
enough) → confirmation echo. Payload spec in `lib/quiz.ts` (`quizLeadPayload`)
— pre-labeled JSON for GHL workflow mapping, incl. `utility_bill_base64`.

## Brand assets

`public/brand/` — logo-light.webp (navy backgrounds), logo-dark.webp (light
backgrounds), mark.webp (sun emblem); `app/icon.png` favicon. Sources +
production pipeline notes in `brand/`. `public/photos/` are ILLUSTRATIVE brand
renders — always labeled "Visualization" in the UI, never presented as job
proof (Honesty Law).

## Content model

- `lib/services.ts` — 6 services (solar, battery, solar+roof, EV, panel, rescue)
- `lib/cities.ts` — 28 IE cities in 3 tiers, each with its real UTILITY
  (SCE vs RPU vs muni) driving the honest-math copy
- `lib/posts.ts` — 6 buying-intent guides with verified 2026 numbers
- `app/our-promise` — The Daylight Standard: 10 commitments + 10 kill questions

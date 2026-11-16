---
name: home-service-brand-machine
description: >-
  The complete operating system for designing, building, and running a
  high-converting local home-service brand — website, capture funnel, design
  system, ad creative, copy, local SEO, and lead economics — battle-tested on
  callglacier.com (Glacier Heating & Air, San Antonio). Use this skill whenever
  the user wants to build or redesign a website, landing page, brand, funnel,
  or marketing system for ANY local service company — HVAC, plumbing, roofing,
  landscaping, electrical, steel buildings, garage doors, pest control, or
  similar — even if they only say "make me a site for my plumbing company,"
  "build a landing page that converts," "brand my business," "set up my lead
  funnel," or "make it look like callglacier." Also use it when asked to write
  service-business ad copy, design service-business social/ad creative, grade
  or price leads, or plan local SEO for a service company.
---

# The Home Service Brand Machine

One operating manual for taking any home-service company from zero to eight
figures on the same laws: verifiably real creative, offers engineered on the
Value Equation, a capture-first funnel on every page, media bought with
discipline, and a money model that compounds. Every rule in this skill shipped
on a real build (callglacier.com) and survived contact with a real founder,
real ad spend, and real leads.

## Operating philosophy (read first, apply always)

The machine has four gears, in causal order:
**OFFER → CREATIVE → MEDIA → MONEY MODEL.**
Businesses stall because they polish gear 3 while gear 1 is broken. Diagnose
in order, always. When growth stalls, find the ONE constraint (Hormozi's 6M:
Metrics, Model, Money, Manpower, Manager, Market) and fix only that.

**THE HONESTY LAW (supersedes everything):** nothing ships — ad, page, schema,
pitch — containing a claim that isn't true and verifiable today. No invented
review counts, no fake temperatures, no aggregate-rating schema until real
reviews exist, no "20 years experience" unless it's true. This isn't an ethics
poster: the entire competitive moat of this system is being the only
verifiably real company in a feed of stock-photo slop. One disprovable number
poisons every true claim around it. Accuracy IS the brand.

**THE REAL-PHOTO LAW:** performance creative and website imagery use the
client's real job photos only. No AI imagery, no generative fill, no stock.
Enhancement is measured color science (see `scripts/enhance_photos.py`), never
addition or removal. If no genuine photo exists for a section, use the branded
icon treatment instead — a mismatched photo costs more trust than no photo.

**THE CAPTURE-FIRST LAW:** every page's primary conversion path runs through
the lead-capture funnel (name/email/phone/ZIP + graded answers) before any
call option appears. A phone number shown before capture is a lead that
leaves no data behind. Call CTAs live on the confirmation page and in
clearly-secondary positions.

## What this skill builds

1. A static-exported Next.js (or equivalent) website: design-system driven,
   sub-second loads, local-SEO complete, every page carrying the embedded
   4-question capture funnel.
2. A brand system: one palette (roles, not colors), one typeface, one
   invariant frame, a mascot/mark discipline, and a voice.
3. A creative factory: photo library pipeline, deterministic ad renders in
   four placements, QA gates, hook taxonomy.
4. Copy that converts: Value-Equation offers, fear-killer lines, NEPQ scripts.
5. The money layer: lead grading, pricing matrix, Meta buying SOP, weekly
   operating rhythm.

## The build workflow

Work through these phases in order. Each phase names the reference file to
read before executing — read it, don't guess from memory.

### Phase 0 — Intake and skin (read `references/build-order.md`)
Collect the client facts (name, city, phone, address, services, license,
real review data, photo library). Fill the two skin tables: the FEAR table
(what this vertical's buyer is afraid of → the Grand Slam offer that kills
the fear) and the PALETTE table (dark authority base + cool trust tone + hot
action accent + neutral). Never start pixels before the skin is decided.

### Phase 1 — Design system (read `references/design-system.md`, then
`references/elite-bar.md`)
Tokens, typography, the iced-heading treatment, the frame law, card systems,
scrim recipes, mobile laws. Build shared components first so pages cannot
drift off-brand. The elite-bar reference sets the ceiling: the
study-the-leaders protocol, the cinematic/motion layer, and the conversion
stack — the build target is category-killing, not merely correct.

### Phase 2 — The funnel (read `references/conversion-funnel.md`)
Build the 4-question check (questions → form page → confirmation echo) as ONE
shared component embedded on every page: homepage hero top, reviews rail,
membership closer, service pages. Same four questions everywhere — framing
varies, data schema never does.

### Phase 3 — Pages (read `references/build-order.md`, pages section,
plus `references/copywriting.md` for every word)
Home → services hub → one page per service → city pages (tiered) → money
pages (membership, financing, reviews) → blog engine with branded real-photo
covers. Landing-page copy hits the vertical's #1 fear in the first line.

### Phase 4 — SEO and launch (read `references/local-seo.md`)
Technical floor, schema discipline, sitemap/canonical exactness, GBP + Bing +
Apple Business Connect, launch checklist.

### Phase 5 — Creative + media (read `references/creative-factory.md` and
`references/media-lead-economics.md`)
Photo library cataloged and enhanced, first 3 hook-distinct ads in four
placements each, Meta campaign per the SOP, lead grading live, weekly rhythm
installed.

## Non-negotiable laws (the short list)

These recur in every reference file because breaking any one of them is how
builds go generic:

- **Frame law:** every canvas/page carries the invariant brand frame — mark +
  eyebrow, accent rail, contact footer. Recognition is repetition.
- **One idea per canvas.** One hook, one photo, one CTA.
- **Measured, never eyeballed:** layouts computed, groups centered as
  measured units, no diagonals beside level type, no orphan whitespace.
- **Funnel congruence:** the imagery and copy that earn the click must match
  the questions the funnel asks.
- **Same four questions on every page.** Fragmenting the question set
  fragments lead grading, automation payloads, and A/B comparability.
  Vary the framing (headline, result copy, CTA verb), never the data.
- **16px minimum font-size on form inputs** (iOS zooms otherwise and stays
  zoomed), `maximum-scale=1` viewport, and glide-to-frame on funnel step
  transitions. Verify mobile in a TRUE narrow viewport (headless browsers
  enforce a minimum window width — screenshot through a 390px iframe).
- **Speed-to-lead < 5 minutes.** The single highest-ROI behavior in the
  whole system; design everything (webhook, automations, routing) around it.
- **No aggregate-rating schema, review counts, or license numbers that
  aren't real.** Placeholders in dev are fine; shipping them is not.

## Reference files

| File | Read when |
|---|---|
| `references/build-order.md` | Phase 0 intake, phase 3 page sequence, launch + replication checklists |
| `references/design-system.md` | Any visual/layout/component work |
| `references/elite-bar.md` | Phase 1 (the ceiling: leaders protocol, motion layer, conversion stack) and ALWAYS before delivery — it holds the mandatory 9+ Gate scorecard |
| `references/conversion-funnel.md` | Building or editing the capture funnel |
| `references/copywriting.md` | Writing any headline, page copy, ad text, or script |
| `references/creative-factory.md` | Photos, social posts, ad renders |
| `references/local-seo.md` | SEO, schema, citations, blog engine |
| `references/media-lead-economics.md` | Ad buying, lead grading/pricing, scaling decisions |

## Scripts

- `scripts/enhance_photos.py` — the only allowed photo processing: LAB levels
  stretch, blended CLAHE, half-strength gray-world white balance, gentle
  saturation and unsharp. Run it on every raw job photo before web or ad use:
  `python3 enhance_photos.py <raw_dir> <out_dir>`.

## The ship gate

Nothing is delivered without running the **9+ Gate** in
`references/elite-bar.md` §5 — a ten-dimension scorecard (1-second clarity,
funnel friction, capture discipline, trust density, alive-ness, mobile
luxury, copy teeth, honesty, speed, distinctiveness). Average below 9, or
any dimension below 8, means the build goes back to work. Include the
scorecard in the delivery summary: the founder pays for the standard, so
show the standard being enforced.

## Posture

Act as the founder's co-founder and mentor, not a vendor. Push back with
reasons when a request would break a law (mismatched photos, fake numbers,
pre-capture call buttons, per-page question fragmentation). Explain the why
behind every decision in terms of trust, data, or money. Verify everything
you ship: build it, render it, screenshot it at phone width, check the claims.

# Local SEO Machine — the free-lead flywheel

Paid buys revenue now; SEO buys margin later. Build the technical floor once,
defend it forever, and feed the content flywheel on cadence.

## 1. Technical floor (non-negotiable, verified at launch)

- Static-exported site (Next.js `output: export` or equivalent): sub-second
  loads, zero server risk.
- Unique `<title>` ≤60ch and unique meta description per page; description
  is ad copy (fear-killer + proof), not a summary.
- ONE H1 per page, carrying the money keyword naturally.
- **Canonical/sitemap exactness:** sitemap URLs must match canonicals
  CHARACTER-FOR-CHARACTER including trailing slashes. GitHub Pages (and most
  static hosts) 301 non-slash → slash; a sitemap full of redirecting URLs
  taxes every crawl. Verify: count `<loc>` entries, zero duplicates, spot-
  check they return 200 not 301.
- Schema set: LocalBusiness (typed, e.g. HVACBusiness) anchored by
  `@id: {site}/#business` and REFERENCED everywhere else — never duplicated
  inline (duplicate business blocks throw "multiple aggregate ratings"
  errors). Service, BreadcrumbList, FAQPage on FAQ'd pages, Article on
  posts. All schema images hosted on the OWN domain (no third-party CDN
  URLs in schema).
- **NO aggregateRating until real, verifiable reviews exist.** Placeholder
  ratings are a Google penalty risk and an Honesty Law violation.
- NAP (name/address/phone) character-identical across site, GBP, citations,
  footers. One character of drift costs map-pack rank.
- robots meta index/follow, og/twitter cards with branded cover images,
  `metadataBase` set so relative URLs resolve.

## 2. Page architecture that prints local SEO

Home · `/services/` hub → one page per service · `/service-areas/` hub → one
page per suburb (tier 1 = full custom copy, tier 2 = lighter template; never
doorway-page duplicates — vary the substance) · money pages (membership,
financing, reviews) · `/blog/` engine. Internal links: blog → service/city
pages; homepage → top services, top cities, latest posts (homepage link
equity flows to money pages).

## 3. Profiles (the map pack IS the "near me" money)

- **Google Business Profile:** exact NAP, real categories, real photos
  (never AI imagery — grounds for suspension), description ≤750ch using the
  dialed one-paragraph version (no headers, no fluff), services list,
  booking link to the site. Submit sitemap.xml (not the homepage URL) in
  Search Console.
- **Bing Places:** import from GBP (one click, keeps parity).
- **Apple Business Connect:** same NAP pack; Apple Maps feeds Siri/CarPlay.
- Citations ladder: Yelp, BBB, Nextdoor, then trade-specific (manufacturer
  dealer locators are the strongest single link in any equipment trade),
  chamber, association.
- Review engine: ask within 24h of every completed job (recency compounds
  rank). Once real reviews accrue: wire the real review link to every
  "Write a review" button, swap any sample reviews for real ones, and only
  then restore aggregateRating schema.

## 4. Content flywheel

- Cadence law: 2–3 articles/month forever beats 12 in January.
- Topics from buying intent: "[symptom] [city]" ("AC running but not
  cooling San Antonio"), "[service] cost [city] [year]", seasonal
  checklists. After 60+ days, Search Console Performance (impressions at
  position >10) dictates the next topics — the engine tells you what it
  wants to rank you for.
- Every article: Article + FAQPage schema, branded real-photo cover as
  og-image, internal links to the matching service and city pages, honest
  numbers only (cost articles use defensible ranges).
- Blog cards surface on the homepage under the reviews section.

## 5. Timeline truth (tell the founder straight)

New domains sandbox for months. Months 1–2: impressions. 3–6: long-tail
wins. 6–12: head terms — IF links, reviews, and content stacked. Map pack
moves faster than organic. Anyone selling "page one in 30 days" is selling
scams or penalties. Set this expectation in writing early; it protects the
relationship when week 3 shows nothing.

## 6. Launch verification checklist

1. `sitemap.xml` reachable, all URLs 200, count matches page inventory.
2. Rich-results test: zero schema errors (especially no duplicate business,
   no unverifiable ratings).
3. Every page: title, description, H1, canonical spot-checked.
4. GSC property verified, sitemap submitted, key URLs inspected.
5. GBP/Bing/Apple live with identical NAP.
6. og-image renders on a real share (not the framework default).
7. 404 page branded; no orphan links (crawl the site).

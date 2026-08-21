# Daylight Solar — SEO & Growth Playbook

This is the honest, no-fluff plan for ranking in the Inland Empire, showing up in
Google, and driving cold traffic. It's split into **what's already built into
the site** (done) and **what only you can do off-site** (the real work that
moves rankings).

---

## Part 1 — What's already built (technical + on-page SEO) ✅

The code already does the things a "$100M agency" would charge for on the
technical side. This is genuinely handled:

- **Crawlable static site** — every page is pre-rendered HTML (fast, no JS
  wall for Googlebot). Hosted on a CDN.
- **`robots.txt` + `sitemap.xml`** — auto-generated, lists all 20+ pages
  (`/app/robots.ts`, `/app/sitemap.ts`).
- **Structured data (JSON-LD)** on every page:
  - `solarBusiness` / `LocalBusiness` with NAP, geo coordinates, hours,
    `aggregateRating`, `areaServed` (every city we list), and a full
    `hasOfferCatalog` of services.
  - `Service` schema on each service + city page.
  - `FAQPage` schema (eligible for rich FAQ results).
  - `BreadcrumbList` on inner pages.
- **Unique `<title>` + meta description + canonical** on every page.
- **Open Graph + Twitter share card** (`/public/og.png`, 1200×630) — links
  now unfurl with a branded preview on Facebook, iMessage, LinkedIn, Slack,
  WhatsApp. This is what makes shared/cold links get clicked.
- **Local landing pages** — a dedicated page per city (Riverside, Moreno Valley,
  Corona, Menifee, Temecula…) targeting "solar + [city]"
  searches, each with local FAQs and internal links.
- **Service landing pages** — one per service, each with process, benefits,
  FAQ, reviews, and internal links (topical depth Google rewards).
- **Mobile-first, fast, accessible** — responsive, semantic headings,
  descriptive alt text, `prefers-reduced-motion` respected.

> **One deploy note:** structured data and the OG image reference the canonical
> domain `the production domain set in lib/site.ts`. They go fully live the moment that domain is
> pointed at the site. On the temporary GitHub Pages URL the share image won't
> resolve — that's expected, not a bug.

---

## Part 2 — What actually moves local rankings (only you can do this)

For a local home-services business, **~70% of the game is off your website.**
No amount of code changes this. Here's the priority order that matters:

### 1. Google Business Profile (GBP) — the #1 lever. Do this first.
The map pack (the top 3 businesses on the map) drives the majority of solar
calls. It's ranked almost entirely by GBP signals, not your website.
- Claim & fully verify the profile at business.google.com.
- Categories: primary **"solar contractor"**, plus "Air conditioning
  contractor", "Heating contractor", "Plumber".
- Fill **everything**: hours, service areas (add each city), services list
  (mirror our service pages), 20+ real photos (trucks, team, installs,
  the wrapped van), the phone `(866) 665-2210`, and the website URL.
- Turn on **messaging** and **booking**.
- Post weekly (offers, tips, jobs) — GBP posts are a ranking signal.

### 2. Reviews — the second-biggest lever.
Our review schema and Google-styled UI are ready; they just need **real
reviews** flowing into the Google profile.
- Ask every happy customer, same day, with a direct "leave a review" link
  (GBP gives you one). Text it to them before the tech leaves.
- Aim for a steady drip (e.g. 5–10/month) — velocity matters more than a
  one-time burst.
- Respond to **every** review, good or bad. Google reads this as engagement.
- Once you have the live Google feed, swap the sample reviews in
  `components/Reviews.tsx` for the real embed/API.

### 3. Local citations & NAP consistency.
Google trusts you more when your **N**ame, **A**ddress, **P**hone are
identical everywhere.
- Use the exact same NAP as in `lib/site.ts` on: Yelp, Facebook, Bing
  Places, Apple Business Connect, Nextdoor, Angi, Thumbtack, BBB, Yellow
  Pages, and solar directories.
- Get listed in the Inland Empire-specific directories (Chamber of Commerce,
  local business associations).

### 4. Backlinks (earned, not bought).
Quality local links raise domain authority. Realistic ways to earn them:
- **Local sponsorships** — youth sports teams, school events, charity 5Ks
  almost always link sponsors from their site. High-trust local links.
- **Supplier/manufacturer pages** — Trane/Carrier/Lennox "find a dealer"
  pages, distributor partner lists.
- **Local press & blogs** — offer a "how to survive a the Inland Empire summer /
  hard-water" expert quote to local outlets and neighborhood blogs.
- **Partnerships** — realtors, home inspectors, property managers, plumbers
  you refer to — swap referrals and website links.
- **Guest content** on home-improvement sites in your metro.
- Avoid: paid link farms, PBNs, fiverr "1000 backlinks." They get you
  penalized. Never worth it.

### 5. Content for cold/long-tail traffic (blog).
The site is built to add a `/blog` easily. Cold traffic comes from answering
what people Google *before* they're ready to buy:
- "Why is my AC blowing warm air in the Inland Empire?"
- "Tank vs tankless water heater in hard water areas"
- "How often should I service my AC in Texas?"
- "AC size calculator for a 2,000 sq ft the Inland Empire home"
- Seasonal: "getting your heater ready for a Texas cold snap"
Each post = a new keyword doorway + an internal link to the matching service
page + a place other sites can link to. Publish 2–4/month consistently.

---

## Part 3 — Fast checklist (in priority order)

1. [ ] Point `the production domain set in lib/site.ts` at the site (SSL auto).
2. [ ] Claim + fully complete Google Business Profile.
3. [ ] Submit `sitemap.xml` in Google Search Console + verify the domain.
4. [ ] Turn on a same-day review-request habit (text a GBP review link).
5. [ ] Build the top 10 citations (Yelp, Bing, Apple, Facebook, BBB…) with
       identical NAP.
6. [ ] Set up Bing Webmaster Tools (submit the same sitemap).
7. [ ] Land the first 3–5 local backlinks (sponsor something local).
8. [ ] Start the blog: 1 post/week for 8 weeks on the questions above.
9. [ ] Add real Google reviews to the site once the profile has 20+.
10. [ ] Track: rankings, GBP calls/direction requests, and form/call leads.

**Bottom line:** the website is now a top-tier conversion machine and is
technically optimized to rank. The remaining growth is GBP + reviews +
citations + links + content — the off-site work that no code can shortcut,
but that this foundation is built to amplify.

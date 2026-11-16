# Build Order — Intake, Sequence, Launch, Replication

The franchise document: how a build starts, the order work ships in, and how
the whole machine clones to a new city or vertical.

## Phase 0 — Intake (collect before any pixels)

Required facts (place in one config module, e.g. `lib/site.ts`, the single
source of truth every page/schema/CTA reads):

- Legal name, brand name, tagline posture (established, never "new")
- City/metro + suburb list (tiered by revenue potential)
- Phone (display + tel: href), email, street address (NAP — exact)
- License number(s) — REAL ones; many states (e.g. Texas TACLA) legally
  require them in advertising. Placeholder in dev; block launch without it.
- Services offered (maps to pages), adjacent trades (plumbing? electrical?)
- Membership/continuity program details and REAL pricing if public
- Real review situation (count, rating, GBP link) — determines what the site
  may honestly display
- Photo library (the real-photo law needs fuel — request crew photos on day
  one; see `creative-factory.md` grading)
- Mascot/mark files (master files only)
- CRM webhook (GoHighLevel inbound webhook or equivalent) — REQUIRED before
  any traffic

Fill the two skin tables (fear table from `copywriting.md` §2; palette roles
from `design-system.md` §1).

## Phase 1–2 — Foundation

1. Scaffold static-export Next.js + Tailwind; tokens from the palette table.
2. Shared components first: Header (fixed, mark, red phone CTA), Footer
   (NAP, license, links), PageHero, FAQ, CTA band, JsonLd helpers, Reviews
   (Google anatomy), the funnel component (`conversion-funnel.md`), mascot
   wrapper.
3. Homepage per the anatomy in `design-system.md` §5.

## Phase 3 — Pages (in revenue order)

1. Home (hero funnel + photo service cards + reviews + blog cards)
2. Top-revenue service page (flagship landing-page treatment, full copy
   architecture from `copywriting.md` §5)
3. Remaining service pages (same template, service-specific fear/copy/photo)
4. Membership/continuity page (benefit cards, member-vs-non-member
   comparison, FAQ, funnel closer + ONE phone banner)
5. City pages: tier-1 full custom, tier-2 templated-but-varied
6. Reviews page (proof-first: Google-native rating panel → review feed →
   sticky funnel rail)
7. Financing, about, contact
8. Blog engine + first 3 articles with branded covers

## Phase 4 — Launch checklist

- [ ] Real license in footer (legal blocker in many states)
- [ ] CRM webhook wired and test-fired (submission → automation → text-back)
- [ ] SEO verification list from `local-seo.md` §6 — all green
- [ ] True-390px + desktop screenshots of every page template
- [ ] Funnel driven end-to-end on a phone (type, submit, confirmation echo)
- [ ] Claims audit: every number on the site is true today
- [ ] GBP/Bing/Apple live, sitemap submitted
- [ ] Speed-to-lead automation: instant text-back + routing proven

## Phase 5 — Operate

Install the weekly operating system (`media-lead-economics.md` §6). First
ads only after: license live, webhook live, photo library graded, fear
table approved by the founder.

## Replication protocol (new city or new vertical)

The machine clones by swapping skins, never laws:

1. Copy the codebase; replace the config module (NAP, city list, services).
2. New vertical: rebuild the fear table + palette skin + question wording
   (four data axes unchanged: PAIN/AGE/URGENCY/OWNERSHIP) BEFORE any ad
   spends a dollar.
3. New photo library — never reuse another market's photos (the "real local
   jobs" claim must stay true).
4. Re-run the launch checklist in full. Same-vertical/new-metro keeps
   creative templates; everything location-flavored re-cuts.
5. The playbook/skill stays the single source of law; version it when a law
   changes (a change that worked in one market updates the skill for all).

## Working style (how the reference build stayed high-end)

- Ship in vertical slices (one page/feature fully built, QA'd, deployed)
  rather than horizontal half-layers.
- Screenshot-verify every visual change; drive interactive flows headlessly
  (click the real buttons, type in the real fields) before telling the
  founder it works.
- When the founder's request would break a law, push back with the reason in
  trust/data/money terms, then offer the compliant version. When the founder
  is right (they often are about their customers), update the skill.
- Deliver findings with the outcome first, the why second, the homework
  list (what only the founder can provide: license, webhook, photos,
  review links) explicitly and repeatedly.

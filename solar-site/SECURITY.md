# Glacier Heating & Air — Security Playbook

Real, enterprise-grade protection focuses on **data, the backend, the edge, and
the brand legally** — not on hiding front-end code (which is impossible on any
public website and only hurts speed, SEO, and accessibility if you try).

## What is already in place
- **HTTPS everywhere** (enforced; `upgrade-insecure-requests`).
- **No secrets in the front-end.** The site is fully static — there are no API
  keys, passwords, or private data shipped to the browser. Nothing to steal.
- **Security headers** ready to apply at any real host:
  - `public/_headers` — Netlify / Cloudflare Pages
  - `vercel.json` — Vercel
  - Header set: HSTS, `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`
    (blocks clickjacking / cloning your site inside an iframe),
    `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
    and a Content-Security-Policy that locks scripts/styles/connections to
    trusted sources.
- **Referrer policy** set via metadata for GitHub Pages (which cannot serve
  custom headers).

## The single highest-leverage move: put the site behind Cloudflare (free)
GitHub Pages cannot serve custom HTTP headers or block bots. Point your custom
domain through **Cloudflare** (orange-cloud proxy) and you get, at the edge,
for free, with **faster** load times (edge caching):
- **WAF + Bot Fight Mode** — blocks scrapers, cloners, and known-bad traffic.
- **Rate limiting** — stops rapid mass-download / scraping attempts.
- **DDoS protection** — absorbs attacks automatically.
- **Hotlink protection** — stops other sites embedding your images.
- **Custom security headers** (the CSP/HSTS/etc. above) applied at the edge.
- **Always Online + caching** — the site loads faster, not slower.

This is what "million-dollar" brands actually do. It is the real answer to
"no one can clone or steal it," combined with the legal protections below.

## When forms go live (booking / contact / plumbing funnel)
- **Bot/spam protection:** Cloudflare Turnstile (invisible, no puzzles) on every
  form before it submits.
- **Server-side validation + rate limiting** on the lead endpoint.
- **Never trust client input**; sanitize and store server-side only.

## Legal protection (how you actually stop copycats)
- Copyright notice is in the footer (© + all rights reserved).
- Add a **Terms of Use** + **Privacy Policy** page (recommended next step).
- Register the **wordmark/logo** as a trademark; keep dated design files as
  proof of authorship.
- If someone clones the site, file a **DMCA takedown** with their host and
  Google — this is fast and effective, and it's why real brands don't waste
  time on right-click blockers.

## What we deliberately did NOT do (and why)
- ❌ Right-click / view-source blockers, DevTools traps, JS obfuscation.
  These are trivially bypassed (curl, cache, Wayback), break accessibility and
  SEO, slow the site, and signal an unprofessional operation. They provide
  **zero** real protection.

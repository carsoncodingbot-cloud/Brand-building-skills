# southerngarage.com — static site

A zero-dependency static site generator. One header, footer and design system for every page, so pages cannot drift apart.

```bash
npm run build      # -> dist/  (41 pages, sitemap.xml, robots.txt, _redirects, _headers)
npm run preview    # build + serve dist/ at http://localhost:4173
```

## Where things live
| Edit this | To change |
|---|---|
| `src/data.mjs` | Every fact: phone, address, hours, sizes, building types, states, blog posts, FAQs, photo list, redirects |
| `src/pages.mjs` | Page content and section order |
| `src/lib.mjs` | Header, mega menus, footer, popup markup, schema helpers |
| `src/site.css` | The design system (tokens at the top of the file) |
| `src/quiz.js` / `src/quiz.css` | Your funnel, ported from the live site — behavior unchanged |
| `src/popup.js` | The "Building Experts" popup |

## Before launch (nothing here ships by accident)
1. **Webhook** — paste your GoHighLevel inbound webhook into `SITE.ghlWebhook` in `data.mjs` **at deploy time only**. Never commit it: this repo is public. Blank = nothing is sent.
2. **Photos** — `PHOTOS` in `data.mjs` currently points at the images on the old site, flagged `verified:false`. Replace `src` with real job photos (size, city, date) and set `verified:true`.
3. **Yellow dashed items** — everything outlined in yellow is unverified (prices, hours, lead time, states, deposit terms…). Fix or delete each, then set `SITE.preview = false`.
4. **Reviews / popup rating** — wire real Google reviews. Set `SITE.popup.rating` and `ratingCount` only from your real Business Profile.
5. **State pages** ship `noindex` until each has real local content. Flip `STATES_INDEXABLE` when ready.
6. **Redirects** — `dist/_redirects` maps every old URL to its new one (Cloudflare Pages / Netlify format).
7. **Legal** — `/privacy/` and `/terms/` are drafts and need legal review.

## Hosting
Any static host works (Cloudflare Pages, Netlify, Vercel, GitHub Pages). Keep GoHighLevel for CRM, texts and automations; the site posts leads to its webhook.

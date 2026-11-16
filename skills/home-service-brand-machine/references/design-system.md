# Design System — Universal Laws, Vertical Skins

The reference build is callglacier.com (Glacier Heating & Air). Every pattern
here shipped there. Swap the skin (palette, mark, photos, copy), keep the laws.

## 1. Tokens — roles, not colors

Define exactly four color roles. The brand changes the values, never the roles:

| Role | Purpose | Glacier value |
|---|---|---|
| Dark authority base | Navy sections, footers, headers, card scrims | `#002B58` (navy-800), deepened `#001A36`/`#00152E` |
| Cool trust tone | Links, icon chips, accents, gradients | `#1573A8` (ice) + turquoise accent |
| Hot action accent | THE CTA color — buttons, emergency, urgency | `#E11F26` (red) |
| Neutral | Body text, borders, muted UI | Slate grays + `ice-50/100` washes |

Rules:
- The hot accent is reserved for actions and urgency. If everything is red,
  nothing is. Primary CTA buttons are ALWAYS the hot accent, sitewide — one
  red button style, recognizable everywhere.
- Example skins: plumber deep-blue/aqua/orange; landscaper forest/lime/amber;
  steel buildings graphite/steel-blue/safety-yellow; roofer charcoal/sky/brick.
- Light section washes (ice-50 → ice-100 gradients) alternate with dark navy
  sections down every page — the rhythm IS the brand feeling. Never two
  same-tone sections adjacent.

## 2. Typography

One family, three weights. Glacier: Montserrat (Black 900 display, ExtraBold
800 subheads, Bold 700 UI) + a workhorse body face (Open Sans). A second
display typeface is a second brand — forbidden.

**The iced heading** (signature display treatment — headline style that makes
the brand recognizable in one glance):

```css
.iced { font-family: var(--font-heading); font-weight: 900;
  text-transform: uppercase; letter-spacing: -0.01em; line-height: 0.98; }
.iced-light { color: #fff; text-shadow: 0 1px 0 #bfe2f7, 0 2px 0 #9fd2f2,
  0 3px 0 #4fa9e0, 0 4px 0 #1f8fd6, 0 6px 14px rgba(31,143,214,.55); }
.iced-dark { color: #062a55; text-shadow: 0 1px 0 #cfeafa, 0 2px 0 #a9d9f4,
  0 3px 8px rgba(31,143,214,.45); }
```

For a non-ice brand, re-derive the layered shadow from the trust tone (e.g. a
landscaper gets layered greens). The structure (stacked 1px shadows + soft
glow) is the law; the hue is the skin.

Headline wrapping: join words that must not separate with `&nbsp;`
(`Exact&nbsp;Prices`), size responsively (text-3xl → 4xl → 5xl), and verify
line breaks at 390px and 320px. A lonely one-word line is a defect.

## 3. The frame law

Every page carries the invariant frame: fixed header (mark + brand name +
nav + red phone CTA), consistent section rhythm, and the footer (mark,
license line, NAP, service links, social). Every canvas (ad, social, blog
cover) carries: accent rail at top, mark + "BRAND · CITY" eyebrow, contact
footer (phone + domain pill). Content changes in the middle; the frame never
does.

The mark is sacred: placed from the master file only, never AI-rendered,
never redrawn, never recolored. On the web it appears in the header, footer,
funnel-card header strip, and anywhere a generic icon would otherwise sit
beside the brand name (swap generic glyphs for the real mark — small detail,
big signature). Avoid white "sticker" outlines around transparent-cutout art
on dark sections — they read as a dirty halo; use a soft dark ground shadow
instead.

## 4. Card systems

**Photo-backed service cards** (the high-end move): real job photo under a
scrim, white text, icon chip retained.

```html
<div class="group relative overflow-hidden rounded-3xl bg-navy-800 p-7">
  <img src="real-job.jpg" class="absolute inset-0 h-full w-full object-cover
       transition-transform duration-700 group-hover:scale-105" />
  <div class="absolute inset-0 bg-gradient-to-t
       from-[#00152E]/95 via-navy-800/80 to-navy-800/45"></div>
  <!-- content: relative z-10, white text, icon chip, title, line, link -->
</div>
```

Scrim discipline: one gradient recipe for ALL cards (near-opaque at the text
end, thinning where the photo breathes). Uniformity is what reads as "brand"
instead of "collage." Slow 5% zoom on hover (700ms) = alive, not carnival.
Photo-service matching is mandatory: the AC card gets an AC photo, the
plumbing card gets the plumbing photo. **A card with no genuine photo match
keeps the flat icon treatment** — state this honestly ("every photo below is
a real [brand] job" only when true).

**Review cards** mimic real Google anatomy (that's where trust lives): white
card, Google-palette letter avatar, name in `#202124`, gold `#FBBC04` stars,
relative timestamps ("3 weeks ago" — never exact dates), plain text with no
decorative quote marks, Roboto/Arial stack, small G logo. Site-styled frosted
glass and turquoise avatars read as site-made = fake. Rating summary panels
use Google's gold-on-gray distribution bars, not brand-gradient bars.

**Trust bar**: a warm gradient strip (orange→red) under the hero:
"Family-owned & operated | Licensed & insured | Serving [metro]". Reuse the
same gradient for emergency/CTA bands — warm = act.

## 5. Page anatomy (homepage reference)

Order: Hero (headline left + embedded funnel card right, rotating reviews
under it) → trust bar → services grid (photo cards) → membership CTA (van/
hero asset) → local-service section (real tech photo) → FAQ (dark) →
emergency band → Google-anatomy reviews → blog cards (branded real-photo
covers) → footer. Mobile order: compact headline → funnel card → reviews →
everything else. The funnel is ALWAYS visible within the first scroll.

H1 pattern: `[City] [Vertical] Experts. [Fear-killer promise].` — e.g. "San
Antonio HVAC Experts. Exact Prices, In Writing." Keyword + differentiator,
not adjectives ("Comprehensive," "Trusted" are filler).

## 6. Mascot / character (optional but powerful)

A recurring character compounds recall (distinctive-asset law). Deploy it
WORKING for the page, not decorating it: peeking over the funnel card with a
speech bubble ("60 seconds. I timed it."), presenting content — eyes follow
its gaze to the CTA. Keep it desktop-prominent, mobile-compact. Transparent
cutout, soft ground shadow, gentle float animation.

## 7. Mobile laws (learned the hard way)

- Form inputs ≥16px font or iOS Safari auto-zooms on focus and STAYS zoomed
  through the confirmation page. Belt-and-suspenders: viewport
  `maximum-scale=1` (pinch still works on iOS 10+).
- On funnel step transitions, scroll the window so the card lands framed
  below the fixed header. Scroll the WINDOW directly —
  `scrollIntoView` also scrolls overflow-hidden ancestor sections and shears
  their content.
- `.btn { white-space: nowrap }` means long button labels force-widen their
  column past the viewport. Keep button labels short; put context in a small
  line above the button.
- QA screenshots in headless Chrome: window widths below ~500px silently
  render wider and crop. Screenshot through an `<iframe width=390>` wrapper
  page for true mobile layout.
- Logo click on the current page is a no-op in SPA routers; add a
  smooth-scroll-to-top handler so the logo never feels dead.

## 8. Build quality bar

Deterministic over improvised: compute layouts, verify with pixel checks and
real screenshots, fix the system not the instance. If a human has to judge
alignment by eye, the layout process is wrong. Before shipping any page:
build passes, true-390px screenshot, desktop screenshot, click through the
funnel end-to-end, claims audit against the Honesty Law.

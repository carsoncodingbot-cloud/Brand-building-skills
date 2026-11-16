# Creative Factory — Photos, Posts, Ads

The render factory doctrine: deterministic, measured, QA-gated, verifiably
real. A human judging alignment by eye means the process is wrong.

## 1. The photo library (the raw fuel)

- Collect every crew photo. Catalog with stable IDs (`b7-33-trane-xl-
  lightbrick-hero.jpg`), grade A/B/C, group by job, tag best use, and keep an
  INVENTORY.md with grades and a placement map. Hash-dedupe on intake —
  founders re-send photos constantly.
- Grading instincts: sunlit clean install = A (ad hero pool). Mid-install
  with tools in frame = B+ ("day on the job" organic gold). Night/flash =
  B- (24/7 angle only). Before/after pairs = engagement kings. Craftsmanship
  interiors (ductwork, panels) = education/blog covers. Humans at work =
  rarest and most valuable — always request more.
- Same-job photos post together (carousel), never mixed across jobs.
- **Funnel congruence law:** equipment in ad photos must match the funnel's
  questions. A pump photo on an AC-form ad pulls plumbing intent into an AC
  funnel and burns completion rate. Bench mismatches for their right page.

## 2. Enhancement (the only allowed processing)

Run `scripts/enhance_photos.py` — LAB levels stretch (p0.5–p99.6), CLAHE
clip 1.5 blended 28%, half-strength gray-world white balance, saturation
×1.06, gentle unsharp (1.5/−0.5, σ2). Nothing added, nothing removed, no AI,
no generative fill, no sky swaps. For web use, export ~1100px-wide q82 JPGs.
Baked-in text on a source photo (old "Old/New" labels) must be cropped or
rebuilt in brand typography before paid use.

## 3. The Four-Render Rule (every paid ad)

Four hand-composed files — platform auto-crop is banned (it guillotines
layouts): ① 4:5 master 2160×2700 ② 1:1 2160×2160 ③ 9:16 2160×3840 with
critical content inside story safe zones (~y270–1560 @1x) and a quiet brand
zone below the footer ④ 1.91:1 2400×1256 recomposed as two columns. Plus a
q92 JPG twin of each for upload limits.

Render deterministically (Python/Pillow, @2x supersample, single Lanczos
downscale), layouts computed from ink bounding boxes, groups centered as
measured units, banners flush to footers, no diagonals beside level type
(horizontal strikes computed from ink bounds).

## 4. QA gates (every render, before delivery)

1. **Mark-pixel check** (automated): crop the eyebrow band, count brand-
   accent pixels (e.g. R>180 & G<90 & B<90 for a red mark); below threshold
   = render blocked. This exists because the mark WILL get silently dropped
   by a refactor eventually.
2. **Ink-band geometry** (automated): verify content density in every
   expected zone (headline / checks / banner / footer) — catches ghost text
   and dead whitespace.
3. **Human pass at phone size**: crops, digits, spelling, clipped text.
4. **Claims audit** against the Honesty Law (real temperatures from the real
   forecast, re-cut weekly so moment-ads are never wrong).

## 5. Hook taxonomy (one per ad — never blended)

| Hook | Psychology | Template |
|---|---|---|
| MOMENT | External deadline the viewer already believes | Real weather strip, season countdown |
| TRUST | Who enters my home? | Process-on-canvas: "price in writing before we start" + 3 numbered steps |
| MONEY | Loss aversion, smart-buyer pride | Before/after split + cost-of-inaction line |
| PROOF | Anti-generic contrast | "Straight off a crew phone — no staging, no stock" |
| CHARACTER | Distinctive asset recall | The mascot as recurring cast member |

First frame = whole promise: WHO + WHAT + WHY-CARE lands in <1 second,
pre-reading. If the hook needs the caption, the hook failed. The click must
land exactly where the ad pointed (promise→payoff integrity).

## 6. Why ads die (the autopsy list)

Stock creative · no offer · adjective claims without proof · component
mismatch (headline sells X, image shows Y) · funnel incongruence · one
disprovable fact · fatigue past frequency ~2.5–3 with sagging CTR · founder
panic-edits mid-learning (each edit resets the algorithm's education).

## 7. Organic system (the 80/20 page)

The social page is the proof file ad-clickers audit before calling. Mix:
80% value (tips franchise, real-job stories, education) / 20% brand moments
/ 0% raw ads. Tips franchise: branded eyebrow + mark, unnumbered, weekly,
fact-verified. Job stories: carousel of same-job photos, honest caption.
Education sets (e.g. "what pro ductwork actually looks like") turn
craftsmanship photos into authority. Organic versions of paid ads strip the
offer and keep the story (awareness lane ≠ offer lane).

## 8. Blog covers / og-images

Branded real-photo covers (1200×630): enhanced job photo, brand accent rail,
mark + brand eyebrow, "REAL [BRAND] JOB PHOTO" badge, title bottom-left,
domain chip. The cover doubles as the article's og-image and the homepage
blog card. Never a stock image, never an unbranded photo.

## 9. Mockups and AI imagery

AI visualization is permitted ONLY for clearly-labeled mockups that never
masquerade as real (e.g. a storefront concept) and never on performance
creative, the GBP profile, or anywhere a viewer could mistake it for a real
photo. When a real photo needs an unavoidable edit (phone number on a van
wrap), apply the minimal-edit doctrine: preserve every original element,
replace only unavoidable pixels, inherit measured perspective/lighting/
grain — re-authored blocks always read fake.

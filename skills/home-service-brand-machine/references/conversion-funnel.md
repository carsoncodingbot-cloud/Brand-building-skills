# The Conversion Funnel — the 60-Second Check

The engine of the whole machine: a 4-question interactive check that captures
name/email/phone/ZIP and delivers a fully-graded lead into the CRM before any
phone number is shown. One shared component, embedded on every page.

## Why this architecture wins

- Tap-cards beat forms: four taps are micro-commitments (sunk-cost momentum)
  that earn the contact ask. Q1 visible on page load — zero clicks to start,
  no intro screens, no "Start" buttons (an intro screen is a task before the
  task; it dies in testing every time).
- The answers ARE the product: issue + system age + urgency + ownership map
  directly to the lead-grading matrix (see `media-lead-economics.md`). That's
  why the four questions NEVER change between pages — fragmenting the
  question set fragments grading, CRM payloads, and A/B comparability. Vary
  the framing per page (headline, result copy, CTA verb); never the data.
- Capture-first: no call button anywhere before submit. Calls route around
  data. The confirmation page carries the (site-standard red) call CTA —
  by then the lead is already owned.

## The three acts

**Act 1 — Questions (one per screen, tap to advance):**

1. "What's going on at your place?" — the pain, in their words
   (down / running-but-weak / high bills / [adjacent trade]).
2. "How old is the system?" (<8 / 8–12 / 12+ / no idea) — replacement signal.
3. "How soon do you want it handled?" (ASAP / this week / planning).
4. "Do you own the home?" (own / rent / manage) — qualification.

Card chrome: navy header strip with the brand mark + "FREE 60-SECOND
[VERTICAL] CHECK" + step counter; segmented progress bar; options as rounded
tap-cards with bold label + light sub-line; a Back link; microcopy "No spam ·
[core promise]". Each vertical re-words options, keeps the four data axes:
PAIN / AGE / URGENCY / OWNERSHIP.

**Act 2 — Form page ("LAST STEP"):**
Personalized honest read (segment-specific headline + 2 lines, e.g. "You're
in the priority lane" for emergencies), the user's answers echoed as small
checkmark chips (proof the system listened), then a framed panel titled
"Where should we send your exact price?" with labeled fields — FULL NAME,
EMAIL, MOBILE NUMBER, ZIP — and ONE exit: the red CTA ("Get my priority
window →" / "Get my exact price path →"). Shield microcopy underneath
("Instant confirmation · A representative follows up fast · No spam, ever").
Validation inline and friendly. Renters get honest framing ("we'll
coordinate with your landlord") and still get captured — segment-tagged.

**Act 3 — Confirmation page ("RECEIVED ✓"):**
Check seal → "Got it, {firstName} — you're in." → "A representative will
message you shortly at {their number}" (echoing their number proves capture)
→ a "YOUR REQUEST — ON FILE" ticket echoing EVERY field back (issue, age,
timeline, property, service area, contact, email) → a numbered
"What happens next" timeline (answers with our team → rep texts to confirm →
exact price in writing) → NOW the red call CTA ("Can't wait? Talk to us
now") → trust row. The echo ticket is what makes it feel like a dispatch
system instead of a form that vanished.

## State & delivery

```ts
// Segment logic (order matters)
rent → "rent" | plumbing-pain → "plumbing" | system-down → "emergency"
| high-bills OR age 12+ → "replace" | else → "repair"

// Webhook payload — labeled like the lead sheet, not form internals
{ name, email, phone, zip,
  issue, system_age, timeline, ownership,   // human-readable labels
  segment, source: "[domain] — 60-Second Check", page, submitted_at }
```

- POST to a CRM inbound webhook (GoHighLevel "Inbound Webhook" workflow
  trigger is the reference). Keep the URL in the site config with a loud
  comment: **REQUIRED before traffic** — without it, submissions reach no
  one. Fall back to localStorage copy (`last 10`) as a parachute only.
- CORS pattern: try standard JSON fetch; on failure retry `mode: "no-cors"`.
- Never bounce the visitor into their SMS/email app on submit — straight to
  the confirmation page, always.
- No resume-from-storage of half-finished quizzes: every page view starts at
  Q1 (a restored mid-quiz state reads as broken).

## Placement map (every page captures)

| Page | Placement | Framing variant |
|---|---|---|
| Home | Hero right column (Q1 above the fold), rotating Google-anatomy reviews directly beneath | "Where should we send your exact price?" |
| Reviews | Sticky rail beside the review feed (desktop); woven into the feed after ~3 reviews (mobile) | proof-adjacent, same copy |
| Membership/club | The page closer: headline + trust chips + card; ONE red banner below it | results pitch membership options |
| Service pages | After the pain section, before FAQ | service-specific honest read |
| /quote (direct link) | Full-page centered | standalone hero copy |

Mascot peeks over the card top edge with a one-line speech bubble wherever
the card appears — it presents the form; gaze lands on Q1.

## Psychology inventory (why each piece exists)

- Q1-on-load: zero-friction first micro-commitment.
- Progress segments + "1 of 4": progress principle, reduces abandonment.
- Honest read before the ask: give value first (diagnosis), then request
  contact — reciprocity.
- Answer chips on the form page: endowment + "the machine already knows me."
- "In writing" promise everywhere: kills the #1 fear (mystery invoice).
- Confirmation echo + timeline: eliminates "did it work?" bounce and
  double-submits; sets the speed-to-lead expectation the phone must keep.
- One red CTA per screen: a single unmistakable action; the site's one red
  button style everywhere builds a trained reflex.

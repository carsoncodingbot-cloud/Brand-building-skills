# Glacier Lead Funnel — Form Spec & Lead-Resale GTM

The Meta Instant Form is not a contact form. It is a **grading machine**: four questions,
every answer combination maps to a lead grade, every grade maps to a price a contractor
will actually pay. This doc is the single source of truth for the form copy, the grading
matrix, and the buyer-side go-to-market.

---

## Design rules (why the copy reads the way it does)

1. **Homeowner's inner voice.** Options are written the way people talk at 9pm in a hot
   house ("It's dead — need a new one"), not contractor jargon ("condenser replacement").
   Familiar language = no cognitive friction = completion.
2. **≤6 words per option.** If an option needs a comma and a clause, it's two options.
3. **3–4 options per question, mutually exclusive, always an "out."** Every question has
   a no-pressure answer ("Just planning ahead", "No idea — came with the house") so nobody
   abandons because no option fits. The "out" answers are still data — they grade the lead.
4. **Yes-ladder order.** Easiest question first (own/rent — everyone knows instantly),
   then the question they came to answer (what's wrong), then stakes (age), then
   commitment (timing). Contact info last, after four micro-commitments.
5. **One brand moment, not ten.** A single on-voice option ("ASAP — we're melting over
   here") makes the form feel human and Glacier-branded. More than one gets cute.
6. **Every option is priced.** No question exists for curiosity. If an answer doesn't
   change the invoice, the question doesn't belong in the form.

---

## The form (paste-ready)

**Form name:** `Glacier | New System Estimate | Higher Intent | SA | v2`
**Type:** Higher intent · one-time-passcode ON · Flexible form delivery OFF

**Intro headline:** `Free New AC System Estimate — Real Price, Zero Pressure`
**Intro bullets:**
- `Exact quote from a licensed San Antonio pro`
- `$0-down financing options with approved credit`
- `Takes 30 seconds — expect a call within minutes`

### Q1 — `Do you own or rent your home?`
| Option | Signal |
|---|---|
| `I own my home` | Billable. Continue. |
| `I rent` | Never invoiced. Polite referral text. |

### Q2 — `What's going on with your AC?`
| Option | Signal |
|---|---|
| `It's dead — need a new one` | Replacement intent. Top value. |
| `Running, but not cooling right` | Repair→replace pipeline. Mid value. |
| `It's old — time to upgrade` | Proactive replacement. High value, lower urgency. |
| `No AC yet — new install` | New install. High ticket, longer cycle. |

### Q3 — `How old is your current system?`
| Option | Signal |
|---|---|
| `Under 8 years` | Repair territory. Downgrades. |
| `8–12 years` | Decision zone. Neutral. |
| `13+ years` | Replacement jackpot. Upgrades one full grade. |
| `No idea — came with the house` | Usually old. Treat as 8–12. |

### Q4 — `How soon do you want it handled?`
| Option | Signal |
|---|---|
| `ASAP — we're melting over here` | Urgent. Upgrades. Call in <5 min. |
| `Sometime this week` | Warm. Full price. |
| `Within the month` | Standard replacement cycle. Full price. |
| `Just planning ahead` | Nurture pool. Never invoiced at full rate. |

**Contact fields:** Full name · Phone (OTP-verified) · Email · Zip code
**Privacy:** https://callglacier.com/privacy/ — "Glacier Heating & Air Privacy Policy"
**Ending headline:** `You're all set — expect a call shortly.`
**Ending body:** `A licensed local comfort specialist will call to confirm details and
schedule your free in-home estimate. Melting right now? Tap below and skip the line.`
**CTA:** Call business.

---

## Grading matrix → price

All prices assume **exclusive** (one buyer), **phone-verified**, **in-zip**, delivered
**instantly**. Market context: marketplaces charge $75–350 for exclusive replacement
leads and $15–40 for shared junk. These prices are deliberately an easy yes.

| Grade | Recipe (Q1 + Q2 + Q3 + Q4) | Product | Price |
|---|---|---|---|
| **A** | Own + (`dead` or `melting`-urgent) + 13+ yrs | Replacement NOW | **$85–100** |
| **B** | Own + (`dead`/`upgrade`/`new install`) + any age + week/month | Replacement soon | **$55–65** |
| **C** | Own + `not cooling right` + under 13 yrs + urgent/week | Repair (repair→replace upside) | **$35–45** |
| **D** | Own + `just planning ahead` (any Q2/Q3) | Nurture pool | Hold — retarget, or batch-sell 10 for $150 |
| **F** | Rent (any) | Referral goodwill | $0 — never invoiced |

Grade rules:
- `13+ years` upgrades one grade. `Under 8 years` caps at C.
- `Just planning ahead` overrides everything down to D — never bill a planner as an A.
- Disputed leads (wrong number, renter lied, out of zip): instant credit, no argument.
  The credit policy is what lets you charge premium prices with a straight face.

Unit economics target: CPL $25–45 with strong creative (yeti) and this qualification →
$10–55 margin per lead. Kill any ad over $60 CPL for 3+ days.

---

## Buyer-side GTM

**Who buys:** owner-operator HVAC companies with 3–15 trucks. Big enough to absorb
5–15 leads/week and pay weekly; small enough to have no marketing department. Skip the
giants (in-house marketing) and one-man shops (slow pay, slow follow-up burns the leads).

**The pitch (say it in this order):**
1. "I generate exclusive, phone-verified AC replacement requests in San Antonio —
   homeowner, system age, and timeline already answered. Never resold."
2. "First five are free so you can judge the quality yourself."
3. "After that: $85 for verified replacement-now leads, $60 standard replacement,
   $40 repair. Any wrong number or renter gets credited, no questions."
4. "Leads hit your phone the second they submit. They're told to expect your call
   within minutes — answer fast and they close."

**What the buyer receives per lead (instant, not end-of-day):** name · verified phone ·
email · zip · all four answers · timestamp · grade.

**One-page terms before lead #1:** exclusivity, billable-lead definition (in-zip +
homeowner + valid phone), credit policy, per-grade prices, weekly invoice. A handshake
plus this page; without it the first disputed lead kills the relationship.

**Scale path:** buyer #1 gets grades A+B in their zips → add buyer #2 for repair grade C
and overflow zips → raise grade-A price after the first month of closed jobs → then
pay-per-call ($100+/connected call) once volume justifies a tracking number.

# THE DAYLIGHT CONTENT MACHINE
Brand System · Design Laws · Copy Doctrine · Production SOPs — adapted for the
solar vertical from the Southern Garage Content Machine v1.0 (same doctrine
family as the Home Service Brand Machine). Applies to: ads, organic posts,
reels, lead forms, and the words inside them — for Daylight Solar (CA + PA)
and sibling brands (e.g., Delta Lighting).

## 1 · THE DOCTRINE
- **The Honesty Law.** Every photo is a real Daylight install or it is labeled
  a Visualization. A "REAL DAYLIGHT INSTALL" badge may only ever touch
  unedited photographs of work we performed — until a real install library
  exists, NOTHING carries the badge and renders run labeled "Visualization"
  (as the site does today). No AI buildings presented as real. No fabricated
  customers, ever — synthetic presenters are company representatives, never
  buyers. No location claims without a job record. No spec/production claims
  without the manufacturer's or utility's paper.
- **The Offer Doctrine (Hormozi).** Lead with the whole number, bridge with
  the monthly, name the mechanism ("every number in writing, before anyone
  visits") — never just the adjective. Real scarcity only: install calendar,
  crew capacity, rate-case deadlines that are actually filed. Never countdown
  timers — they contradict the price-lock moat.
- **The Voice Doctrine (Miner).** Detached, unhurried, permission-giving.
  The reader is always free to walk, which is why they stay. Pressure
  released is trust gained; trust is what dials the phone.
- **LAW 0.** If a claim, a photo, or a price cannot be verified in writing,
  it does not ship. A missing claim costs nothing. A wrong claim costs
  everything.

## 2 · BRAND FOUNDATION (Daylight skin)
- **Gold #F5A623 → #EF8412** is the only accent (gradients allowed on suns,
  bands, bars). CTA orange **#E8650A**. Never for body text.
- **Canvas dark:** navy **#0B1D36**; deeper zones **#050E1D**. Never pure
  black. Light canvases: white → ice tints.
- **Text:** white primary on navy; **#0B1D36** primary on light; slate for
  qualifiers only.
- **Type:** Montserrat only. 900 mastheads/prices, 800 subheads/pills/labels
  (tracked caps), 700 body. Open Sans permitted for long body on web only.
- **The lockup is a sealed unit** (public/brand/logo-light.webp,
  logo-dark.webp, mark.webp). Never rebuilt, recolored, or stretched.
  Light lockup on navy/photo, dark lockup on white. Mark alone below 120px.

## 3 · THE CANVAS SYSTEM (square master 2160×2160)
Locked bottom skeleton, identical on every square canvas of a series:
| Element | Spec |
|---|---|
| Logo lockup | top-left ~(90,56), ~560px wide, sealed |
| Kicker | tracked gray caps, top-right of masthead zone |
| Masthead L1 | 900 weight, white (light canvas: navy), fit-to-width |
| Masthead L2 | 900 weight, GOLD, fit-to-width |
| Photo band | middle ~46% of canvas, gold keyline beneath |
| Label chip | "Visualization" (or install badge when real) bottom-left of photo, glass chip over bright zones |
| Statement | gold lead words + white/navy remainder |
| Subline | off-white/slate, smaller |
| CTA pill | orange, 800-weight tracked caps |
| Footer rule + bar | gold rule; dark bar with phone + daylightsolar.ai |

Masthead formats (pick one per canvas):
- **Numbers format:** the bill or the 25-year total ("$183,272" scale) —
  every big number traceable to the calculator's stated assumptions.
- **Question format:** a real customer/prospect question in true quotation
  marks, kicker sets it up ("A HOMEOWNER ASKED US, WORD FOR WORD:"), answered
  in the statement line.
- **Statement format:** declarative pair ("YOUR BILL ISN'T COMING BACK DOWN.
  / YOUR ROOF CAN FIX THAT.").

Price/number card riding a photo: content-measured (measure stack, then draw
box + equal padding), glass rgba(11,18,30,~0.8) with gold outline, sits on
the photo's EMPTY zone, never covering panels or roofline.

Photo handling: Lanczos resize → levels stretch (percentiles ~0.5/99.6) →
UnsharpMask(2.0–2.6, 55–72%, t2). Camera-roll originals only — messenger
compression costs sharpness forever. Wide band from 4:3 source = blur-extend
flanks, never amputate a roofline. Every crop bounds-checked (renderers pad
silently with black — the phantom-padding bug ships dead space as design).

## 4 · THE RENDER LAWS
1. Boxes are sized FROM content — never content poured into guessed boxes.
2. Every crop is bounds-checked against the source frame.
3. Hooks are load-bearing: the approved headline survives every polish round.
4. At 95% right, the fix is SUBTRACTION — delete the offender, don't bolt on.
5. Approved patterns govern; the pattern never flexes for new content.
6. Within a block, elements left-align to each other; the block centers on
   the canvas axis. One alignment axis per zone.
7. Right-aligned stacks lock by measured INK edges, not math.
8. Mixed-color lockups center by optical mass, not bounding box.
9. Drawn brand marks at statement scale; humble text glyphs below it.
10. When source aspect fights frame aspect: extend, never amputate.
11. Sets share a skeleton — keyline, pill, footer land on identical rows
    across a series, audited numerically.
12. EVERY render gets eyes-on QA before the client sees it. No exceptions.

## 5 · THE COPY DOCTRINE
Voice (Miner register):
- Detached openers ("Not sure if this fits what you've got going on…").
- Statements, not exclamations. One exclamation point per year.
- Permission exits near every close ("No harm if the answer's no.").
- Prices live INSIDE plain sentences, stated like measurements. Never velvet.
- One human beat per caption. One is charm; two is trying.

**The anti-AI checklist** (every caption passes before posting):
- Type like a human: "10x10" not "10×10" in prose · "plus tax" spelled out ·
  no em-dash chains · banned words: folks, nestled, dream, elevate, seamless,
  journey, empower, unlock, solutions, "pencil" (jargon).
- No aphorism drumbeats ("Second pour. Second everything.") — the
  parallel-structure snare drum is the #1 copywriter tell.
- Vary paragraph shapes: a three-line thought, then a four-word one.
- **The tailgate test:** read it out loud. If the owner couldn't have typed
  it on a tailgate at 9pm (PA: in a Wawa parking lot), rewrite it.

Offer mechanics (Hormozi register):
- Whole-number-first; the monthly bridge on every big ticket.
- Mechanism beats adjective: "every number in writing before anyone visits"
  outsells "high quality" forever.
- The wish-list anchor: "quote the full setup — panels, battery, roof — and
  trim from there." Best average-ticket lever in the system.

CTA science: text-first, call second (the buyer texts from the couch at 9pm).
Friction-killer on every ask ("takes a minute" · "costs nothing to see your
number"). Give them the first word ("text us your ZIP").

Series choreography: posts go up LIFO so the feed reads top-down in story
order. Location lands once, dateline-style, in the hero. Sync phrases stitch
a series ("in writing" once per caption, near the ask). One post per series
carries no phone number — it reads as content and makes the closer below it
hit harder.

## 6 · CLAIMS & COMPLIANCE GATES (solar-specific)
- **Spec gate:** panel/battery wattage, warranty, and production claims from
  the manufacturer's sheet in writing. Conflicts = claim comes off.
- **Rate gate:** utility rates and increases only from filed tariffs/orders
  (SCE, PECO, PPL, Met-Ed, RPU). Date-stamp them in fine print.
- **Incentive gate:** no dead tax credits. The 25D homeowner credit died
  12/31/2025 — it never appears in creative. SRECs and any credit only with
  current program paper.
- **Financing language:** "as low as $—/mo with approved financing — payment
  varies." NEVER "guaranteed approval," "$0 down," "no credit check,"
  "free solar," "the government pays for it."
- **Absolutes ban:** never maintenance-free, blackout-proof, zero-bill
  guaranteed. Engineering says "rated" and "certified" — never "proof."
- **Reviews:** real counts only ("5.0 · 37 Google Reviews" ships because it
  is true; the day it isn't, it comes off). aggregateRating stays out of
  schema until reviews exist on the brand's own profile.
- **Synthetic people:** presenters only, always "with Daylight Solar," never
  a customer. A fabricated buyer testimonial is a fake review with a face.
- **Meta lead forms never ask credit, income, or debt** (policy). Credit is
  qualified by the setter on the confirmation call.

## 7 · SPOKESPERSON & REEL SOP
- Presenter brief: the demographic the buyer trusts — 40s–50s, real, no
  studio glow, no glamour retouch. High-end UGC = engineered imperfection.
- Composite scale math in the prompt (eave heights, door vs presenter
  height, one vanishing point, contact shadow matching the sun).
- Script length = duration × 2.4 words/sec (10s ≈ 24–30 words).
- Delivery: soft breath before word one · smile audible, laugh banned ·
  downward inflections · SLOW DOWN on the price — pace on the money is the
  trust signal. Audio: dry close phone-mic, no reverb.
- Lip sync "through the final syllable" is top priority; if a line won't
  sync after two takes, cut at the strongest line and close on a branded END
  CARD with CTA + phone.
- Captions burned from TRANSCRIBED timings, Montserrat bold caps ~74px at
  1080w, white w/ tight outline, lower third clear of the face, THE PRICE
  LINE ONLY in gold at ~84px, 2–5 words per phrase.
- Music: organic = clean master + platform trending audio at publish; paid
  ads = owned/Meta Sound Collection only (trending tracks aren't licensed
  for ads). Bed low-passed ~1.6kHz, ~-21dB under voice, gentle swell on the
  price moment.

## 8 · LEAD FUNNEL SOP (Meta forms + GHL)
- Higher Intent form type, friction on purpose: fewer leads, triple quality.
- Solar field delta vs the garage playbook: **street address stays ON** —
  the roof IS the product; an address lets the rep pull satellite before the
  first dial. (Garages capture typed ZIP instead because their product needs
  a site, not a roof.)
- Question stack: own → bill → roof age → utility → timing. Every option
  priced; bundle-label the options (silent selling).
- Thank-you screen warms the speed-to-lead text: "watch your phone… save the
  number." Ending CTA button goes to daylightsolar.ai.
- **Speed-to-lead law:** automated personalized text inside five minutes
  ("saw you're in [ZIP] with a [$ range] bill — is the roof original?").
  Under five minutes converts ~8×; over an hour bleeds out. Round-robin
  assigns; the auto-text buys the human twenty minutes.
- Test-fire before launch: submit the form yourself and TIME the text.

## 9 · AD OPERATIONS
- Placement suite per creative: 1:1 (2160), 4:5, 9:16, 1.91:1 — recomposed
  on the skeleton per format, never squeezed.
- Testing: 2–3 psychological angles vs one audience, equal budget, 72 hours
  untouched, kill under ~1% CTR, feed winners.
- Headline/description slots filled with universal offer facts safe under
  any primary (Meta shuffles them).
- Place-named posts get metro-radius targeting — "we install HERE" beats
  "we install."
- Meta compresses above ~1440px: 2160 masters upload fine; 4K re-renders
  exist for print and signage.

## 10 · THE SCOREBOARD
- The Four Numbers: revenue, average ticket, leads/month, close rate. Every
  creative decision multiplies against them.
- Per-creative scorecard: CTR, cost per lead, **cost per QUALIFIED lead**
  (owner + $200+ bill), rep speed-to-first-touch. Weekly review.
- Autopsy rule: nothing gets rebuilt "because it tanked" without the numbers
  first. Rebuilding without the autopsy is how it dies twice.

## 11 · ASSET INTAKE — 100% ACCURACY CHECKLIST
- Logo masters (done: public/brand/ webp set; keep vector originals in
  brand/). Montserrat 700/800/900 confirmed (scratchpad fonts mirrored
  wherever renders run).
- Color card: this file + globals.css tokens are the source of truth.
- Photos: camera-roll originals only, tagged with size/city (job record)/
  date/crew/edited-or-not. Badge eligibility starts the day real install
  photos exist.
- Spec sheets + current package prices in writing, with effective dates —
  no canvas ever carries a stale number.

### Final word
Follow the skeleton, obey the gates, write like the tailgate, verify with
your eyes, and count everything. The brand is the moat. The honesty is the
brand. The numbers are the aim.

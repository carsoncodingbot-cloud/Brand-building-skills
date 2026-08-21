/**
 * Shared engine for the 60-Second Solar Reality Check.
 * One source of truth for questions, labels, segmenting, and the GHL lead
 * payload used by the homepage hero and /quote.
 *
 * Form design laws (per the house LEAD-FUNNEL spec):
 *  - Homeowner's inner voice, ≤6 words per option, 3–4 options per question.
 *  - Every question has a no-pressure "out" — the out is still data.
 *  - Yes-ladder order: the question they came to vent about first (the bill),
 *    then goal (routes the product), then timing (grades), then ownership
 *    (qualifies) — contact info only after four micro-commitments.
 *  - Every option is priced: if an answer doesn't change the lead grade or
 *    the product we design, the question doesn't belong in the form.
 */

export type QuizOpt = { key: string; label: string; sub?: string };
export type QuizQ = { id: string; title: string; caption: string; opts: QuizOpt[] };

export const QUIZ_QUESTIONS: QuizQ[] = [
  {
    id: "bill",
    title: "What's your summer electric bill hitting?",
    caption: "A rough number is fine — this is the whole ballgame.",
    opts: [
      { key: "under150", label: "Under $150", sub: "Honestly? Solar may not pencil — we'll tell you straight" },
      { key: "150to300", label: "$150 – $300", sub: "The climb has started" },
      { key: "300to500", label: "$300 – $500", sub: "Peak-rate territory — the 4–9pm window is eating you" },
      { key: "over500", label: "$500+ — don't get me started", sub: "We hear you. Priority math." },
    ],
  },
  {
    id: "goal",
    title: "What do you actually want solar to do?",
    caption: "Different goals, different system — this changes the design.",
    opts: [
      { key: "bill", label: "Kill the bill", sub: "Maximum savings, fastest payback" },
      { key: "backup", label: "Keep the lights on in outages", sub: "Battery-first design" },
      { key: "both", label: "Both — bill and backup", sub: "The full setup most IE homes want" },
      { key: "curious", label: "Honestly, just curious", sub: "Smart. No pressure — knowledge is free here" },
    ],
  },
  {
    id: "timing",
    title: "How soon are you looking to move?",
    caption: "This just sets how fast we run your numbers — no obligation.",
    opts: [
      { key: "asap", label: "ASAP — this bill is brutal", sub: "Priority lane" },
      { key: "months", label: "In the next few months", sub: "The normal, sane timeline" },
      { key: "research", label: "Just running the numbers", sub: "Also smart. We'll keep it low-key." },
    ],
  },
  {
    id: "own",
    title: "Do you own the home?",
    caption: "Owners can go solar — renters, we'll point you the right way.",
    opts: [
      { key: "own", label: "Yes, I own it" },
      { key: "rent", label: "I rent" },
      { key: "manage", label: "I manage the property" },
    ],
  },
];

export const QUIZ_LABELS: Record<string, Record<string, string>> = {
  bill: { under150: "under $150/mo", "150to300": "$150-300/mo", "300to500": "$300-500/mo", over500: "$500+/mo" },
  goal: { bill: "kill the bill", backup: "outage backup", both: "bill + backup", curious: "just exploring" },
  timing: { asap: "ASAP", months: "next few months", research: "researching" },
  own: { own: "homeowner", rent: "renter", manage: "property manager" },
};

export const QUIZ_STORE_KEY = "dls-quiz-v1";

/**
 * Segments drive the honest-read screen and the GHL routing.
 *  rent     → never sold, pointed the right way (protects the whole book)
 *  small    → sub-$150 bills: the "maybe don't" honest read — trust gold
 *  priority → owner + real bill + ASAP: call-first lane
 *  battery  → outage-driven: backup-first design conversation
 *  planner  → researching / curious: nurture pool, zero pressure
 */
export type QuizSegment = "rent" | "small" | "priority" | "battery" | "planner";

export function quizSegment(answers: Record<string, string>): QuizSegment {
  if (answers.own === "rent") return "rent";
  if (answers.bill === "under150") return "small";
  if (answers.timing === "asap") return "priority";
  if (answers.goal === "backup" || answers.goal === "both") return "battery";
  return "planner";
}

/** JSON payload for the GHL inbound webhook — pre-labeled so workflow
 *  mappings read like the lead sheet, not like form internals. */
export function quizLeadPayload(
  answers: Record<string, string>,
  contact: { name: string; email: string; phone: string; zip: string },
  page: string,
) {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    zip: contact.zip,
    monthly_bill: QUIZ_LABELS.bill[answers.bill] ?? "-",
    solar_goal: QUIZ_LABELS.goal[answers.goal] ?? "-",
    timeline: QUIZ_LABELS.timing[answers.timing] ?? "-",
    ownership: QUIZ_LABELS.own[answers.own] ?? "-",
    segment: quizSegment(answers),
    source: "godaylightsolar.com — 60-Second Solar Reality Check",
    page,
    submitted_at: new Date().toISOString(),
  };
}

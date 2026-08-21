/**
 * Shared engine for the 60-Second Solar Reality Check.
 * One source of truth for questions, labels, segmenting, and the GHL lead
 * payload used by the homepage hero and /quote.
 *
 * Form design laws (per the house LEAD-FUNNEL spec + NEPQ):
 *  - Questions are asked the way a calm expert asks them across a kitchen
 *    table — problem-awareness first, never feature-first. The prospect
 *    talks themselves toward the consequence; we never push.
 *  - Homeowner's inner voice, short options, every option has a
 *    no-pressure "out" — and the out is still data.
 *  - Yes-ladder order: vent about the bill (emotional entry) → who bills
 *    them (routes the math) → shade (routes the design + the honest no) →
 *    what they want it to do → timing (grades) → ownership (qualifies).
 *    Contact info only after six micro-commitments.
 *  - Every option is priced: if an answer doesn't change the lead grade or
 *    the system we design, the question doesn't belong in the form.
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
    id: "utility",
    title: "Whose name is at the top of that bill?",
    caption: "This one question changes the entire design — the export rules flip at the city line.",
    opts: [
      { key: "sce", label: "SCE — Southern California Edison", sub: "NEM 3.0 rules · battery usually makes or breaks the math" },
      { key: "rpu", label: "Riverside Public Utilities", sub: "City utility — friendlier solar math than SCE" },
      { key: "muni", label: "Moreno Valley / Colton / Banning Utility", sub: "City utility — different rules, often better" },
      { key: "notsure", label: "Honestly, not sure", sub: "No problem — your ZIP tells us" },
    ],
  },
  {
    id: "shade",
    title: "Around 2pm, how much of your roof sits in shade?",
    caption: "The question most salespeople skip — because the honest answer can kill their sale. We ask it first.",
    opts: [
      { key: "full", label: "Full sun — barely a shadow", sub: "The Inland Empire special. Prime production." },
      { key: "some", label: "Some shade — a tree or two", sub: "Usually fine — panel placement handles it" },
      { key: "heavy", label: "Pretty shaded most of the day", sub: "We'll be straight with you about whether solar pencils" },
      { key: "notsure", label: "Never really looked", sub: "We check satellite imagery for you — no ladder required" },
    ],
  },
  {
    id: "goal",
    title: "If the bill problem were solved — what else should the system do?",
    caption: "Different answers, different hardware. This routes your design.",
    opts: [
      { key: "bill", label: "Just kill the bill", sub: "Maximum savings, fastest payback" },
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
  utility: { sce: "SCE", rpu: "Riverside RPU", muni: "MoVal/Colton/Banning utility", notsure: "utility unsure" },
  shade: { full: "full sun", some: "some shade", heavy: "heavy shade", notsure: "shade unchecked" },
  goal: { bill: "kill the bill", backup: "outage backup", both: "bill + backup", curious: "just exploring" },
  timing: { asap: "ASAP", months: "next few months", research: "researching" },
  own: { own: "homeowner", rent: "renter", manage: "property manager" },
};

export const QUIZ_STORE_KEY = "dls-quiz-v1";

/**
 * Segments drive the honest-read screen and the GHL routing.
 *  rent     → never sold, pointed the right way (protects the whole book)
 *  shade    → heavy shade: the "might not pencil" honest read — trust gold
 *  small    → sub-$150 bills: the "maybe don't" honest read
 *  priority → owner + real bill + ASAP: call-first lane
 *  battery  → outage-driven: backup-first design conversation
 *  planner  → researching / curious: nurture pool, zero pressure
 */
export type QuizSegment = "rent" | "shade" | "small" | "priority" | "battery" | "planner";

export function quizSegment(answers: Record<string, string>): QuizSegment {
  if (answers.own === "rent") return "rent";
  if (answers.shade === "heavy") return "shade";
  if (answers.bill === "under150") return "small";
  if (answers.timing === "asap") return "priority";
  if (answers.goal === "backup" || answers.goal === "both") return "battery";
  return "planner";
}

export type QuizContact = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
};

export type BillUpload = {
  filename: string;
  mime: string;
  /** base64 (no data: prefix) — only present when small enough to ship inline */
  base64?: string;
  note: string;
};

/** JSON payload for the GHL inbound webhook — pre-labeled so workflow
 *  mappings read like the lead sheet, not like form internals. */
export function quizLeadPayload(
  answers: Record<string, string>,
  contact: QuizContact,
  page: string,
  bill?: BillUpload | null,
) {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    street_address: contact.address,
    zip: contact.zip,
    monthly_bill: QUIZ_LABELS.bill[answers.bill] ?? "-",
    utility_provider: QUIZ_LABELS.utility[answers.utility] ?? "-",
    roof_shade: QUIZ_LABELS.shade[answers.shade] ?? "-",
    solar_goal: QUIZ_LABELS.goal[answers.goal] ?? "-",
    timeline: QUIZ_LABELS.timing[answers.timing] ?? "-",
    ownership: QUIZ_LABELS.own[answers.own] ?? "-",
    segment: quizSegment(answers),
    utility_bill_attached: bill ? "yes" : "no",
    ...(bill
      ? {
          utility_bill_filename: bill.filename,
          utility_bill_mime: bill.mime,
          utility_bill_note: bill.note,
          ...(bill.base64 ? { utility_bill_base64: bill.base64 } : {}),
        }
      : {}),
    source: "daylightsolar.ai — 60-Second Solar Reality Check",
    page,
    submitted_at: new Date().toISOString(),
  };
}

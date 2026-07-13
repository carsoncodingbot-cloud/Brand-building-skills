/**
 * Shared engine for the 60-Second System Check.
 * One source of truth for questions, labels, segmenting, and the
 * prefilled-SMS lead capture used by the homepage hero and /quote.
 */

export type QuizOpt = { key: string; label: string; sub?: string };
export type QuizQ = { id: string; title: string; caption: string; opts: QuizOpt[] };

export const QUIZ_QUESTIONS: QuizQ[] = [
  {
    id: "issue",
    title: "What's going on at your place?",
    caption: "Be honest — this stays between us and the thermostat.",
    opts: [
      { key: "down", label: "AC is completely down", sub: "No cold air at all. Send help." },
      { key: "weak", label: "Running, but not cooling right", sub: "Weak airflow, warm rooms, long runs" },
      { key: "bills", label: "It works — but bills keep climbing", sub: "Thinking upgrade / efficiency" },
      { key: "plumbing", label: "It's a plumbing thing", sub: "Water heater, leak, drain" },
    ],
  },
  {
    id: "age",
    title: "How old is the system?",
    caption: "A rough guess is fine — it changes the right answer.",
    opts: [
      { key: "lt8", label: "Under 8 years", sub: "Still young" },
      { key: "8to12", label: "8–12 years", sub: "Middle age in Texas years" },
      { key: "gt12", label: "12+ years", sub: "A veteran" },
      { key: "unknown", label: "Honestly, no idea", sub: "Totally normal" },
    ],
  },
  {
    id: "urgency",
    title: "How soon do you want it handled?",
    caption: "This just sets how fast we move — no obligation either way.",
    opts: [
      { key: "asap", label: "ASAP — we're melting over here", sub: "Priority lane" },
      { key: "week", label: "Within the week", sub: "Soon, not a siren" },
      { key: "planning", label: "Just planning ahead", sub: "Smart. We'll keep it low-key." },
    ],
  },
  {
    id: "own",
    title: "Do you own the home?",
    caption: "Owners can approve work — renters, we'll point you the right way.",
    opts: [
      { key: "own", label: "Yes, I own it" },
      { key: "rent", label: "I rent" },
      { key: "manage", label: "I manage the property" },
    ],
  },
];

export const QUIZ_LABELS: Record<string, Record<string, string>> = {
  issue: { down: "AC completely down", weak: "AC running but not cooling", bills: "high bills / upgrade", plumbing: "plumbing issue" },
  age: { lt8: "under 8 yrs", "8to12": "8-12 yrs", gt12: "12+ yrs", unknown: "age unknown" },
  urgency: { asap: "ASAP", week: "this week", planning: "planning ahead" },
  own: { own: "homeowner", rent: "renter", manage: "property manager" },
};

export const QUIZ_STORE_KEY = "glc-quiz-v2";

export type QuizSegment = "rent" | "plumbing" | "emergency" | "replace" | "repair";

export function quizSegment(answers: Record<string, string>): QuizSegment {
  if (answers.own === "rent") return "rent";
  if (answers.issue === "plumbing") return "plumbing";
  if (answers.issue === "down") return "emergency";
  if (answers.issue === "bills" || answers.age === "gt12") return "replace";
  return "repair";
}

export function quizSmsHref(answers: Record<string, string>): string {
  const parts = [
    "Hi Glacier — just did the 60-second check on your site.",
    `Issue: ${QUIZ_LABELS.issue[answers.issue] ?? "-"}.`,
    `System age: ${QUIZ_LABELS.age[answers.age] ?? "-"}.`,
    `Timeline: ${QUIZ_LABELS.urgency[answers.urgency] ?? "-"}.`,
    `I'm a ${QUIZ_LABELS.own[answers.own] ?? "-"}.`,
    "Name & ZIP: ",
  ];
  return `sms:+18666652210?&body=${encodeURIComponent(parts.join(" "))}`;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Phone, Check, Shield, Clock } from "@/components/Icons";

/**
 * The 60-Second System Check — a 4-question consultative quiz funnel.
 *
 * Psychology built in:
 *  - One question per screen + progress bar (progress principle, reduced anxiety)
 *  - Q1 leads with the emotional pain (loss aversion hook)
 *  - Tap-cards, zero typing until the result (micro-commitments, minimal effort)
 *  - Answers persist in localStorage (save & continue)
 *  - Result = instant gratification: personalized read-back (endowment: "your system")
 *    + the exact-price promise (certainty) + one-tap call/text with the lead's
 *    answers PRE-FILLED into the SMS body (zero-backend lead capture).
 */

type Opt = { key: string; label: string; sub?: string };
type Q = { id: string; title: string; caption: string; opts: Opt[] };

const QUESTIONS: Q[] = [
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

const LABELS: Record<string, Record<string, string>> = {
  issue: { down: "AC completely down", weak: "AC running but not cooling", bills: "high bills / upgrade", plumbing: "plumbing issue" },
  age: { lt8: "under 8 yrs", "8to12": "8-12 yrs", gt12: "12+ yrs", unknown: "age unknown" },
  urgency: { asap: "ASAP", week: "this week", planning: "planning ahead" },
  own: { own: "homeowner", rent: "renter", manage: "property manager" },
};

const STORE_KEY = "glc-quiz-v1";

export default function QuoteQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1..4 = questions, 5 = result
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.answers && typeof saved.step === "number" && saved.step > 0 && saved.step < 5) {
          setAnswers(saved.answers);
          setStep(saved.step);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (step > 0 && step < 5) localStorage.setItem(STORE_KEY, JSON.stringify({ step, answers }));
      if (step === 5) localStorage.removeItem(STORE_KEY);
    } catch {}
  }, [step, answers]);

  const pick = (qid: string, key: string) => {
    const next = { ...answers, [qid]: key };
    setAnswers(next);
    setStep((s) => s + 1);
  };

  const segment = useMemo(() => {
    if (answers.own === "rent") return "rent";
    if (answers.issue === "plumbing") return "plumbing";
    if (answers.issue === "down") return "emergency";
    if (answers.issue === "bills" || answers.age === "gt12") return "replace";
    return "repair";
  }, [answers]);

  const smsBody = useMemo(() => {
    const parts = [
      "Hi Glacier — just did the 60-second check on your site.",
      `Issue: ${LABELS.issue[answers.issue] ?? "-"}.`,
      `System age: ${LABELS.age[answers.age] ?? "-"}.`,
      `Timeline: ${LABELS.urgency[answers.urgency] ?? "-"}.`,
      `I'm a ${LABELS.own[answers.own] ?? "-"}.`,
      "Name & ZIP: ",
    ];
    return encodeURIComponent(parts.join(" "));
  }, [answers]);

  const smsHref = `sms:+18666652210?&body=${smsBody}`;

  const progress = step === 0 ? 0 : Math.min(((step - 1) / QUESTIONS.length) * 100 + 8, 100);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ice-500 to-navy-800 pt-24">
      <div className="hero-mountains absolute inset-0" aria-hidden />
      <div className="container-x relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-start py-10 sm:py-14">

        {/* progress */}
        {step > 0 && step <= QUESTIONS.length && (
          <div className="mb-8 w-full max-w-xl">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ice-200">
              <span>Question {step} of {QUESTIONS.length}</span>
              <span>~{15 * (QUESTIONS.length - step + 1)} seconds left</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gradient-to-r from-turquoise to-ice-300 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* INTRO */}
        {step === 0 && (
          <div className="w-full max-w-xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ice-200">Free · 60 seconds · No obligation</p>
            <h1 className="iced iced-light mt-3 text-3xl sm:text-4xl lg:text-5xl">The 60-Second System Check</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
              Four quick taps about what's going on at your place — and we'll point you to the fastest path to an
              <b className="text-white"> exact price, in writing, before any work begins.</b>
            </p>
            <button
              onClick={() => setStep(1)}
              className="btn btn-primary mt-8 !px-10 !py-4 text-base shadow-xl"
            >
              Start my check →
            </button>
            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ice-200/90">
              <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> Licensed &amp; insured</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24/7 in San Antonio</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Price in writing first</span>
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {step >= 1 && step <= QUESTIONS.length && (
          <div key={step} className="quiz-enter w-full max-w-xl">
            <h2 className="iced iced-light text-center text-2xl sm:text-3xl">{QUESTIONS[step - 1].title}</h2>
            <p className="mt-2 text-center text-white/80">{QUESTIONS[step - 1].caption}</p>
            <div className="mt-7 grid gap-3">
              {QUESTIONS[step - 1].opts.map((o) => (
                <button
                  key={o.key}
                  onClick={() => pick(QUESTIONS[step - 1].id, o.key)}
                  className="group w-full rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-left backdrop-blur-sm transition hover:border-turquoise hover:bg-white/20 active:scale-[0.99]"
                >
                  <span className="block font-[family-name:var(--font-montserrat)] text-base font-extrabold text-white group-hover:text-turquoise sm:text-lg">
                    {o.label}
                  </span>
                  {o.sub && <span className="mt-0.5 block text-sm text-ice-200/90">{o.sub}</span>}
                </button>
              ))}
            </div>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="mx-auto mt-6 block text-sm font-semibold text-ice-200/80 hover:text-white">
                ← Back
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {step === QUESTIONS.length + 1 && (
          <div className="quiz-enter w-full max-w-xl">
            <div className="overflow-hidden rounded-3xl bg-white p-7 shadow-[0_30px_80px_-24px_rgba(0,20,44,0.7)] sm:p-9">
              {segment === "rent" ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-wider text-ice-600">Your result</p>
                  <h2 className="mt-2 font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-navy-800">
                    Straight answer: this one's your landlord's call.
                  </h2>
                  <p className="mt-3 text-slate-600">
                    In Texas, repairs on a rental are the owner's to approve. The fastest fix: send your landlord or property
                    manager our number — we'll give them an exact price in writing and keep you in the loop.
                  </p>
                  <div className="mt-6 rounded-2xl bg-ice-50 p-4 text-sm text-slate-600">
                    <b className="text-navy-800">Copy-paste for your landlord:</b><br />
                    "AC issue at the house — Glacier Heating &amp; Air gives exact prices in writing before work starts.
                    (866) 665-2210 · CallGlacier.com"
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-wider text-ice-600">Your result — here's our honest read</p>
                  <h2 className="mt-2 font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-navy-800">
                    {segment === "emergency" && "You're in the priority lane."}
                    {segment === "repair" && "This sounds fixable — let's confirm it cheap."}
                    {segment === "replace" && "Time to do the replacement math — honestly."}
                    {segment === "plumbing" && "Plumbing's in the family too — let's handle it."}
                  </h2>
                  <p className="mt-3 text-slate-600">
                    {segment === "emergency" &&
                      "A dead system in this heat isn't a 'get to it eventually' — we treat no-cool calls first, 24/7. Reach out now and we'll get you an arrival window, with your exact price in writing before any work begins."}
                    {segment === "repair" &&
                      "Running-but-not-cooling is usually one of a handful of causes — several are quick, inexpensive fixes. A proper diagnosis names the real problem and your exact price, in writing, before a single tool comes out."}
                    {segment === "replace" &&
                      "With a system that age (or bills doing what yours are doing), the honest move is the math: if a repair costs more than about a third of a new system, replacement usually wins — and a high-efficiency unit gives some of its cost back every month. We'll show you both numbers side by side, in writing, free."}
                    {segment === "plumbing" &&
                      "From water heaters to leaks and drains — same promise as our HVAC side: straight answers and your exact price in writing before work starts."}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Exact price in writing — the number doesn't move</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Licensed, insured, background-checked</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> {segment === "emergency" ? "No-cool calls prioritized, 24/7" : "Fast scheduling — often same-day for urgent calls"}</li>
                    {segment === "replace" && <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Financing available on qualifying installs</li>}
                  </ul>
                  <div className="mt-7 grid gap-3">
                    <a href={smsHref} className="btn btn-primary w-full !py-4 text-base">
                      Text us your check results →
                    </a>
                    <a href={site.phoneHref} className="btn w-full !py-4 text-base !bg-navy-800 !text-white hover:!bg-navy-900">
                      <Phone className="h-4 w-4" /> Or call now: {site.phoneDisplay}
                    </a>
                  </div>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    The text arrives pre-filled with your answers — add your name &amp; ZIP and hit send. A real person replies fast.
                  </p>
                </>
              )}
            </div>
            <button onClick={() => { setStep(0); setAnswers({}); }} className="mx-auto mt-5 block text-sm font-semibold text-ice-200/80 hover:text-white">
              ↺ Start over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

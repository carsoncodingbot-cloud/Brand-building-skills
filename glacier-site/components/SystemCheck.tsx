"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Check } from "@/components/Icons";
import { QUIZ_QUESTIONS, QUIZ_STORE_KEY, quizSegment, quizSmsHref } from "@/lib/quiz";

/**
 * The 60-Second System Check as a self-contained white card.
 * Question 1 is visible the moment the card renders — there is no intro
 * step and nothing to click before answering. Used at the top of the
 * homepage hero and on /quote.
 *
 * Psychology built in:
 *  - Q1 on screen at page load (zero-friction first micro-commitment)
 *  - One question at a time + segmented progress (progress principle)
 *  - Tap-cards, zero typing until the result (minimal effort)
 *  - Answers persist in localStorage (save & continue)
 *  - Result = personalized read-back + exact-price promise + one-tap
 *    call/text with the lead's answers PRE-FILLED into the SMS body
 *    (zero-backend lead capture).
 */

export default function SystemCheck() {
  // qi = 0..3 question index, 4 = result
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(QUIZ_STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.answers && typeof saved.qi === "number" && saved.qi > 0 && saved.qi < QUIZ_QUESTIONS.length) {
          setAnswers(saved.answers);
          setQi(saved.qi);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (qi > 0 && qi < QUIZ_QUESTIONS.length) localStorage.setItem(QUIZ_STORE_KEY, JSON.stringify({ qi, answers }));
      if (qi >= QUIZ_QUESTIONS.length) localStorage.removeItem(QUIZ_STORE_KEY);
    } catch {}
  }, [qi, answers]);

  const pick = (qid: string, key: string) => {
    setAnswers((a) => ({ ...a, [qid]: key }));
    setQi((s) => s + 1);
  };

  const segment = useMemo(() => quizSegment(answers), [answers]);
  const smsHref = useMemo(() => quizSmsHref(answers), [answers]);
  const done = qi >= QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[Math.min(qi, QUIZ_QUESTIONS.length - 1)];

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(0,20,44,0.6)] ring-1 ring-white/40">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 bg-navy-800 px-5 py-3 sm:px-6">
        <p className="font-[family-name:var(--font-montserrat)] text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white sm:text-xs">
          Free 60-Second System Check
        </p>
        <p className="shrink-0 text-[0.65rem] font-bold uppercase tracking-wider text-turquoise sm:text-xs">
          {done ? "Your result" : `${qi + 1} of ${QUIZ_QUESTIONS.length}`}
        </p>
      </div>
      {/* segmented progress */}
      <div className="flex gap-1 bg-navy-800 px-5 pb-3 sm:px-6" aria-hidden>
        {QUIZ_QUESTIONS.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${done || i <= qi ? "bg-turquoise" : "bg-white/20"}`} />
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {!done && (
          <div key={qi} className="quiz-enter">
            <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">{q.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{q.caption}</p>
            <div className="mt-4 grid gap-2.5">
              {q.opts.map((o) => (
                <button
                  key={o.key}
                  onClick={() => pick(q.id, o.key)}
                  className="group w-full rounded-xl border border-ice-100 bg-ice-50 px-4 py-3 text-left transition hover:border-turquoise hover:bg-white active:scale-[0.99]"
                >
                  <span className="block font-[family-name:var(--font-montserrat)] text-[0.95rem] font-extrabold text-navy-800 group-hover:text-ice-600">
                    {o.label}
                  </span>
                  {o.sub && <span className="mt-0.5 block text-xs text-slate-500">{o.sub}</span>}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              {qi > 0 ? (
                <button onClick={() => setQi(qi - 1)} className="text-xs font-semibold text-slate-400 hover:text-navy-800">← Back</button>
              ) : <span />}
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                No forms · No spam · Exact price in writing
              </p>
            </div>
          </div>
        )}

        {done && (
          <div className="quiz-enter">
            {segment === "rent" ? (
              <>
                <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
                  Straight answer: this one&apos;s your landlord&apos;s call.
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  In Texas, repairs on a rental are the owner&apos;s to approve. Fastest fix: send your landlord or property
                  manager our number — we&apos;ll give them an exact price in writing and keep you in the loop.
                </p>
                <div className="mt-4 rounded-xl bg-ice-50 p-4 text-sm text-slate-600">
                  <b className="text-navy-800">Copy-paste for your landlord:</b><br />
                  &quot;AC issue at the house — Glacier Heating &amp; Air gives exact prices in writing before work starts.
                  (866) 665-2210 · CallGlacier.com&quot;
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-ice-600">Here&apos;s our honest read</p>
                <h3 className="mt-1.5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
                  {segment === "emergency" && "You're in the priority lane."}
                  {segment === "repair" && "This sounds fixable — let's confirm it cheap."}
                  {segment === "replace" && "Time to do the replacement math — honestly."}
                  {segment === "plumbing" && "Plumbing's in the family too — let's handle it."}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {segment === "emergency" &&
                    "A dead system in this heat isn't a 'get to it eventually' — we treat no-cool calls first, 24/7. Reach out now for an arrival window, with your exact price in writing before any work begins."}
                  {segment === "repair" &&
                    "Running-but-not-cooling is usually one of a handful of causes — several are quick, inexpensive fixes. A proper diagnosis names the real problem and your exact price, in writing, before a single tool comes out."}
                  {segment === "replace" &&
                    "With a system that age (or bills doing what yours are doing), the honest move is the math: if a repair costs more than about a third of a new system, replacement usually wins. We'll show you both numbers side by side, in writing, free."}
                  {segment === "plumbing" &&
                    "From water heaters to leaks and drains — same promise as our HVAC side: straight answers and your exact price in writing before work starts."}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Exact price in writing — the number doesn&apos;t move</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Licensed, insured, background-checked</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> {segment === "emergency" ? "No-cool calls prioritized, 24/7" : "Fast scheduling — often same-day for urgent calls"}</li>
                </ul>
                <div className="mt-5 grid gap-2.5">
                  <a href={smsHref} className="btn btn-primary w-full !py-3.5 text-sm sm:text-base">
                    Text us your check results →
                  </a>
                  <a href={site.phoneHref} className="btn w-full !bg-navy-800 !py-3.5 text-sm !text-white hover:!bg-navy-900 sm:text-base">
                    <Phone className="h-4 w-4" /> Or call now: {site.phoneDisplay}
                  </a>
                </div>
                <p className="mt-2.5 text-center text-xs text-slate-500">
                  The text arrives pre-filled with your answers — add your name &amp; ZIP and hit send. A real person replies fast.
                </p>
              </>
            )}
            <button onClick={() => { setQi(0); setAnswers({}); }} className="mx-auto mt-3 block text-xs font-semibold text-slate-400 hover:text-navy-800">
              ↺ Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

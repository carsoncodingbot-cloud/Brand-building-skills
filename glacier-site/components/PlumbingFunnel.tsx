"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Droplet, Wrench, Flame, Home, Shield, Snowflake, Check, Phone, ChevronRight } from "@/components/Icons";

type Step = 0 | 1 | 2 | 3;

const NEEDS = [
  { id: "drain", label: "Clogged Drain / Rooter", icon: Droplet },
  { id: "leak", label: "Leak Detection & Repair", icon: Droplet },
  { id: "water-heater", label: "Water Heater", icon: Flame },
  { id: "fixtures", label: "Faucets & Fixtures", icon: Wrench },
  { id: "toilet", label: "Toilet Repair / Install", icon: Home },
  { id: "repipe", label: "Repipe / Water Line", icon: Wrench },
  { id: "sewer", label: "Sewer & Camera Inspection", icon: Shield },
  { id: "hvac", label: "Actually, it's an AC / Heating issue", icon: Snowflake },
  { id: "other", label: "Something else", icon: Wrench },
];

const URGENCY = [
  { id: "emergency", label: "Emergency — ASAP", note: "Water everywhere / no water" },
  { id: "soon", label: "Within a few days", note: "Needs attention this week" },
  { id: "flexible", label: "I'm flexible", note: "Schedule at a good time" },
];

export default function PlumbingFunnel() {
  const [step, setStep] = useState<Step>(0);
  const [need, setNeed] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const total = 3;
  const pct = done ? 100 : Math.round((step / total) * 100);
  const needLabel = NEEDS.find((n) => n.id === need)?.label ?? "";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end only for now — wire to your CRM / email endpoint to go live.
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-ice-100 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-turquoise/20 text-ice-600">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="iced iced-dark mt-4 text-2xl sm:text-3xl">You&apos;re on the schedule!</h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Thanks — a Glacier plumbing specialist will reach out shortly to lock in your time
          {needLabel ? <> for <span className="font-semibold text-navy-800">{needLabel.toLowerCase()}</span></> : null}. Need us right now?
        </p>
        <Link href={site.phoneHref} className="btn btn-primary mt-6">
          <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-ice-100 bg-white shadow-[0_30px_60px_-30px_rgba(0,43,88,0.35)]">
      {/* progress */}
      <div className="border-b border-ice-100 bg-ice-50/60 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ice-600">
          <span>Book your plumber</span>
          <span>{Math.min(step + 1, total)} of {total}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ice-200">
          <div className="h-full rounded-full bg-ice-500 transition-[width] duration-500" style={{ width: `${Math.max(pct, 8)}%` }} />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Step 1 — need */}
        {step === 0 && (
          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800">What do you need help with?</h3>
            <p className="mt-1 text-sm text-slate-500">Pick the closest match — you can add detail next.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {NEEDS.map((n) => {
                const Icon = n.icon;
                const active = need === n.id;
                return (
                  <button key={n.id} type="button"
                    onClick={() => { setNeed(n.id); setStep(1); }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active ? "border-ice-500 bg-ice-50" : "border-ice-200 hover:border-ice-400 hover:bg-ice-50/60"
                    }`}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ice-500 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-navy-800">{n.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-ice-400" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — urgency */}
        {step === 1 && (
          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800">How soon do you need us?</h3>
            <p className="mt-1 text-sm text-slate-500">We&apos;ll prioritize accordingly.</p>
            <div className="mt-5 space-y-3">
              {URGENCY.map((u) => {
                const active = urgency === u.id;
                return (
                  <button key={u.id} type="button"
                    onClick={() => { setUrgency(u.id); setStep(2); }}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      active ? "border-ice-500 bg-ice-50" : "border-ice-200 hover:border-ice-400 hover:bg-ice-50/60"
                    }`}>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-ice-500 bg-ice-500" : "border-ice-300"}`}>
                      {active && <Check className="h-3 w-3 text-white" />}
                    </span>
                    <span>
                      <span className="block font-bold text-navy-800">{u.label}</span>
                      <span className="block text-xs text-slate-500">{u.note}</span>
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 text-ice-400" />
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => setStep(0)} className="mt-5 text-sm font-semibold text-ice-600 hover:underline">← Back</button>
          </div>
        )}

        {/* Step 3 — details */}
        {step === 2 && (
          <form onSubmit={submit}>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800">Where should we send your plumber?</h3>
            <p className="mt-1 text-sm text-slate-500">
              {needLabel && <>For <span className="font-semibold text-navy-700">{needLabel.toLowerCase()}</span>. </>}
              We&apos;ll confirm your time by phone.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input required name="firstName" placeholder="First name" autoComplete="given-name" className={inputCls} />
              <input required name="lastName" placeholder="Last name" autoComplete="family-name" className={inputCls} />
              <input required type="tel" name="phone" placeholder="Phone" autoComplete="tel" className={inputCls} />
              <input required type="email" name="email" placeholder="Email" autoComplete="email" className={inputCls} />
              <input name="address" placeholder="Street address" autoComplete="street-address" className={`${inputCls} sm:col-span-2`} />
              <input type="date" name="date" className={inputCls} />
              <select name="time" defaultValue="" className={inputCls}>
                <option value="">Preferred time</option>
                <option>Morning (8am–12pm)</option>
                <option>Afternoon (12pm–4pm)</option>
                <option>Evening (4pm–7pm)</option>
              </select>
              <textarea name="message" rows={3} placeholder="Anything we should know? (optional)" className={`${inputCls} resize-none sm:col-span-2`} />
            </div>
            <button type="submit" className="btn btn-primary mt-6 w-full text-base">Book My Appointment</button>
            <div className="mt-3 flex items-center justify-between">
              <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-ice-600 hover:underline">← Back</button>
              <span className="text-xs text-slate-400">No spam. We never sell your info.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200";

"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  Sun, Battery, Roof, Bolt, Panel, Wrench, Shield, Building, Home,
  Check, Phone, ChevronRight, Star, Clock,
} from "@/components/Icons";

/* ---- Tailored to exactly the services Daylight offers ---- */
const SERVICES = [
  { id: "solar", label: "Residential Solar", note: "New rooftop system, real math", icon: Sun },
  { id: "battery", label: "Battery Storage", note: "Beat 4-9pm rates, outage backup", icon: Battery },
  { id: "solar-roof", label: "Solar + New Roof", note: "One crew, one warranty", icon: Roof },
  { id: "ev", label: "EV Charger", note: "Level 2, permitted & load-calculated", icon: Bolt },
  { id: "panel", label: "Main Panel Upgrade", note: "200-amp service, quoted up front", icon: Panel },
  { id: "repair", label: "Solar Repair / Rescue", note: "We service systems we didn't install", icon: Wrench },
  { id: "commercial", label: "Commercial Solar", note: "Shops, offices & warehouses", icon: Building },
  { id: "other", label: "Not sure / Something else", note: "We'll help you figure it out", icon: Home },
];

const SITUATIONS = [
  { id: "bill", label: "My electric bill is out of hand", note: "The 4-9pm window is winning - let's fix the math", emergency: true },
  { id: "down", label: "My existing solar isn't working", note: "Dead inverter, red light, installer vanished" },
  { id: "compare", label: "I have quotes to compare", note: "We'll pressure-test them in writing - including ours" },
  { id: "explore", label: "Just exploring my options", note: "Numbers first, decisions later" },
];

const TIMING = [
  { id: "emergency", label: "ASAP — ready to move", note: "Priority consult scheduling", icon: Clock },
  { id: "soon", label: "In the next few weeks", note: "The normal timeline", icon: Clock },
  { id: "flexible", label: "I'm flexible", note: "Whatever works best", icon: Clock },
  { id: "quotes", label: "Just getting numbers", note: "Comparing my options", icon: Clock },
];

const STEP_LABELS = ["Service", "Situation", "Timing", "Details"];

export default function ServiceFunnel() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [situation, setSituation] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const total = STEP_LABELS.length;
  const svc = SERVICES.find((s) => s.id === service);
  const sit = SITUATIONS.find((s) => s.id === situation);
  const tim = TIMING.find((t) => t.id === timing);
  const isEmergency = sit?.emergency || timing === "emergency";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end only for now — wire to your CRM / email endpoint (e.g. an
    // /api/lead route, ServiceTitan, or HubSpot) to start delivering leads.
    setDone(true);
  }

  /* ---------- Success ---------- */
  if (done) {
    return (
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-ice-100 bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgba(0,43,88,0.35)] sm:p-12">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-turquoise/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ice-500 to-turquoise text-white shadow-lg">
          <Check className="h-10 w-10" />
        </div>
        <h3 className="iced iced-dark relative mt-5 text-2xl sm:text-3xl">You&apos;re on the schedule!</h3>
        <p className="relative mx-auto mt-3 max-w-md text-slate-600">
          Thanks — a Daylight consultant will reach out shortly to confirm your time
          {svc ? <> for <span className="font-semibold text-navy-800">{svc.label.toLowerCase()}</span></> : null}.
          {isEmergency && <> We&apos;ll prioritize your call.</>}
        </p>
        <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={site.phoneHref} className="btn btn-primary">
            <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
          </Link>
          <button type="button" onClick={() => { setDone(false); setStep(0); setService(null); setSituation(null); setTiming(null); }}
            className="btn btn-outline-navy">Start over</button>
        </div>
      </div>
    );
  }

  /* ---------- Recap chips (choices made so far) ---------- */
  const chips = [
    svc && { k: "svc", label: svc.label, onClick: () => setStep(0) },
    sit && { k: "sit", label: sit.label, onClick: () => setStep(1) },
    tim && { k: "tim", label: tim.label, onClick: () => setStep(2) },
  ].filter(Boolean) as { k: string; label: string; onClick: () => void }[];

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-ice-100 bg-white shadow-[0_30px_60px_-30px_rgba(0,43,88,0.4)]">
      {/* Progress header */}
      <div className="bg-gradient-to-r from-navy-800 to-[#001a36] px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm font-extrabold uppercase tracking-wide text-white">
            <Sun className="h-4 w-4 text-turquoise" /> Book Your Consult
          </span>
          <span className="text-xs font-semibold text-ice-200">Step {step + 1} of {total}</span>
        </div>
        {/* segmented progress */}
        <div className="mt-4 flex items-center gap-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                i < step ? "bg-turquoise" : i === step ? "bg-gradient-to-r from-turquoise to-ice-300" : "bg-white/15"
              }`} />
              <span className={`mt-1.5 hidden text-[0.65rem] font-semibold uppercase tracking-wide sm:block ${
                i <= step ? "text-ice-100" : "text-white/40"
              }`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recap chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-ice-100 bg-ice-50/70 px-6 py-3 sm:px-8">
          {chips.map((c) => (
            <button key={c.k} type="button" onClick={c.onClick}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 ring-1 ring-ice-200 transition hover:ring-ice-500">
              <Check className="h-3 w-3 text-ice-600" />
              {c.label}
              <span className="text-ice-400 group-hover:text-ice-600">edit</span>
            </button>
          ))}
        </div>
      )}

      <div className="p-6 sm:p-8">
        {/* Step 1 — service */}
        {step === 0 && (
          <div key="s0" className="animate-step">
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">What can we help you with?</h3>
            <p className="mt-1 text-sm text-slate-500">Pick the closest match — you can add detail in a moment.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const active = service === s.id;
                return (
                  <button key={s.id} type="button"
                    onClick={() => { setService(s.id); setStep(1); }}
                    className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active ? "border-ice-500 bg-ice-50 ring-2 ring-ice-200" : "border-ice-200 hover:-translate-y-0.5 hover:border-ice-400 hover:bg-ice-50/60 hover:shadow-md"
                    }`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-navy-800">{s.label}</span>
                      <span className="block truncate text-xs text-slate-500">{s.note}</span>
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-ice-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — situation */}
        {step === 1 && (
          <div key="s1" className="animate-step">
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">
              What best describes your situation?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {svc && <>For <span className="font-semibold text-navy-700">{svc.label.toLowerCase()}</span>. </>}
              This shapes the design conversation before anyone visits.
            </p>
            <div className="mt-5 space-y-3">
              {SITUATIONS.map((s) => {
                const active = situation === s.id;
                return (
                  <button key={s.id} type="button"
                    onClick={() => { setSituation(s.id); setStep(2); }}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      active ? "border-ice-500 bg-ice-50 ring-2 ring-ice-200" : "border-ice-200 hover:border-ice-400 hover:bg-ice-50/60"
                    }`}>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${active ? "border-ice-500 bg-ice-500" : "border-ice-300"}`}>
                      {active && <Check className="h-3.5 w-3.5 text-white" />}
                    </span>
                    <span>
                      <span className="block font-bold text-navy-800">{s.label}</span>
                      <span className="block text-xs text-slate-500">{s.note}</span>
                    </span>
                    {s.emergency && (
                      <span className="ml-auto shrink-0 rounded-full bg-red-brand/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-red-brand">Priority</span>
                    )}
                  </button>
                );
              })}
            </div>
            <BackBtn onClick={() => setStep(0)} />
          </div>
        )}

        {/* Step 3 — timing */}
        {step === 2 && (
          <div key="s2" className="animate-step">
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">How soon do you need us?</h3>
            <p className="mt-1 text-sm text-slate-500">We&apos;ll prioritize your request accordingly.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TIMING.map((t) => {
                const active = timing === t.id;
                const urgent = t.id === "emergency";
                return (
                  <button key={t.id} type="button"
                    onClick={() => { setTiming(t.id); setStep(3); }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active ? "border-ice-500 bg-ice-50 ring-2 ring-ice-200"
                        : urgent ? "border-red-brand/30 bg-red-brand/[0.04] hover:border-red-brand/60"
                        : "border-ice-200 hover:-translate-y-0.5 hover:border-ice-400 hover:bg-ice-50/60 hover:shadow-md"
                    }`}>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow ${urgent ? "bg-gradient-to-br from-red-brand to-[#a30f14]" : "bg-gradient-to-br from-ice-500 to-navy-800"}`}>
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-navy-800">{t.label}</span>
                      <span className="block text-xs text-slate-500">{t.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <BackBtn onClick={() => setStep(1)} />
          </div>
        )}

        {/* Step 4 — details */}
        {step === 3 && (
          <form key="s3" onSubmit={submit} className="animate-step">
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">Where should we send your numbers?</h3>
            <p className="mt-1 text-sm text-slate-500">
              {svc && <>For <span className="font-semibold text-navy-700">{svc.label.toLowerCase()}</span>. </>}
              We&apos;ll confirm by phone — usually within the hour — and your numbers arrive in writing before any home visit.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" required name="firstName" autoComplete="given-name" />
              <Field label="Last name" required name="lastName" autoComplete="family-name" />
              <Field label="Phone" required type="tel" name="phone" autoComplete="tel" />
              <Field label="Email" required type="email" name="email" autoComplete="email" />
              <Field label="Street address" name="address" autoComplete="street-address" className="sm:col-span-2" />
              <Field label="Preferred date" type="date" name="date" />
              <label className="block">
                <span className="text-sm font-semibold text-navy-800">Preferred time</span>
                <select name="time" defaultValue="" className={`mt-1 ${inputCls}`}>
                  <option value="">Anytime</option>
                  <option>Morning (8am–12pm)</option>
                  <option>Afternoon (12pm–4pm)</option>
                  <option>Evening (4pm–7pm)</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-navy-800">Anything else? <span className="font-normal text-slate-400">(optional)</span></span>
                <textarea name="message" rows={3} placeholder="Tell us about your roof, your bill, or the quote you're comparing…"
                  className={`mt-1 resize-none ${inputCls}`} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-6 w-full text-base">
              {isEmergency ? "Request Priority Consult" : "Book My Consult"}
            </button>
            <div className="mt-4 flex items-center justify-between gap-4">
              <BackBtn onClick={() => setStep(2)} inline />
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Shield className="h-3.5 w-3.5 text-ice-500" /> No spam. We never sell your info.
              </span>
            </div>
          </form>
        )}
      </div>

      {/* Trust footer */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-ice-100 bg-ice-50/70 px-6 py-3 text-center text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
          <span className="ml-0.5 text-navy-800">{site.ratingValue}</span>
        </span>
        <span className="hidden sm:inline text-ice-200">•</span>
        <span>{site.reviewCount}+ reviews</span>
        <span className="hidden sm:inline text-ice-200">•</span>
        <span>Every number in writing</span>
      </div>
    </div>
  );
}

/* ---------- small building blocks ---------- */
function BackBtn({ onClick, inline = false }: { onClick: () => void; inline?: boolean }) {
  return (
    <button type="button" onClick={onClick}
      className={`${inline ? "" : "mt-5"} text-sm font-semibold text-ice-600 transition hover:text-ice-700 hover:underline`}>
      ← Back
    </button>
  );
}

function Field({
  label, className = "", ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-navy-800">
        {label}{props.required && " *"}
      </span>
      <input {...props} className={`mt-1 ${inputCls}`} />
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200";

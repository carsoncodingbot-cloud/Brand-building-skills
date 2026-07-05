"use client";

import { useState } from "react";
import { site, NAV_SERVICES } from "@/lib/site";
import { Check, Phone } from "@/components/Icons";
import Link from "next/link";

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is wired yet. This simulates a successful submission so the
    // page is fully interactive for demos. Connect to your CRM / email service
    // (e.g. a /api/lead route, ServiceTitan, or HubSpot) to go live.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 600);
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-ice-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-turquoise/20 text-ice-600">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="iced iced-dark mt-4 text-2xl">Request received!</h3>
        <p className="mt-3 text-slate-600">
          Thanks for reaching out to {site.name}. A member of our team will call you back shortly.
          Need help right now?
        </p>
        <Link href={site.phoneHref} className="btn btn-primary mt-5">
          <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-ice-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-800">First name *</span>
          <input required name="firstName" autoComplete="given-name"
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-800">Last name *</span>
          <input required name="lastName" autoComplete="family-name"
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-800">Phone *</span>
          <input required type="tel" name="phone" autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-800">Email *</span>
          <input required type="email" name="email" autoComplete="email"
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-navy-800">Street address</span>
          <input name="address" autoComplete="street-address"
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-navy-800">How can we help? *</span>
          <select required name="service" defaultValue=""
            className="mt-1 w-full rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200">
            <option value="" disabled>Select a service…</option>
            {NAV_SERVICES.map((s) => <option key={s.href} value={s.label}>{s.label}</option>)}
            <option value="Emergency / No Cool">Emergency — No Cool / No Heat</option>
            <option value="Maintenance / Tune-Up">Maintenance / Tune-Up</option>
            <option value="Other">Something else</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-navy-800">Message</span>
          <textarea name="message" rows={4} placeholder="Tell us what's going on with your system…"
            className="mt-1 w-full resize-none rounded-xl border border-ice-200 bg-ice-50/50 px-4 py-3 text-navy-800 outline-none transition focus:border-ice-500 focus:bg-white focus:ring-2 focus:ring-ice-200" />
        </label>
      </div>

      <button type="submit" disabled={status === "submitting"}
        className="btn btn-primary mt-6 w-full text-base disabled:opacity-70">
        {status === "submitting" ? "Sending…" : "Request My Service"}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">
        By submitting, you agree to be contacted about your request. We never sell your information.
      </p>
    </form>
  );
}

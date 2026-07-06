import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { Check, Shield, Clock, Phone } from "@/components/Icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HVAC Financing in San Antonio — Flexible Payment Options",
  description: `Comfortable payments for a comfortable home. ${site.name} offers flexible HVAC financing with approved credit — low monthly options on new AC and heating systems. Apply in minutes.`,
  alternates: { canonical: "/financing" },
};

const perks = [
  { icon: Clock, title: "Fast, easy approval", body: "Apply in minutes with a quick, no-obligation credit check — many homeowners get an instant decision." },
  { icon: Shield, title: "Flexible terms", body: "Choose a plan that fits your budget, including low-monthly and special promotional options on qualifying systems." },
  { icon: Check, title: "$0 down options", body: "Get the comfort you need now and spread the cost over time — no need to drain your savings on a breakdown." },
];

const steps = [
  { n: "1", t: "Get your free estimate", b: "We assess your home and recommend the right system — with clear, upfront pricing." },
  { n: "2", t: "Choose your plan", b: "Pick the financing option that fits your budget. We'll walk you through every number." },
  { n: "3", t: "Apply in minutes", b: "A quick application gets you a fast decision, often on the spot." },
  { n: "4", t: "Stay comfortable", b: "We install your new system and you enjoy affordable, predictable monthly payments." },
];

const faqs = [
  { q: "Do you offer financing on new HVAC systems?", a: `Yes. ${site.name} partners with trusted lenders to offer flexible financing on qualifying new air conditioning and heating systems, with approved credit. Ask us about current promotions when you get your estimate.` },
  { q: "How do I qualify for HVAC financing?", a: "Approval is based on a quick credit check. Many homeowners qualify for low-monthly or promotional options. We'll help you find the plan that best fits your budget — with no obligation to proceed." },
  { q: "Is there a down payment?", a: "Depending on the plan and your approval, $0-down options may be available on qualifying systems. We'll go over all of your options before any work begins." },
  { q: "Can I finance a repair, or only a full system?", a: "Financing is primarily designed for new system installations and larger replacements. For repairs, ask our team — we always aim to find an option that works for your situation." },
  { q: "Will applying affect my credit?", a: "Pre-qualification typically uses a soft check that does not impact your score. A full application may involve a hard inquiry. Our team will make sure you understand each step before you apply." },
];

export default function FinancingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Financing", url: "/financing" }]} />
      <FaqJsonLd faqs={faqs} />
      <PageHero
        title="Comfort Now, Pay Over Time"
        subtitle="A new system shouldn't mean an emptied savings account. Glacier offers flexible financing so you can stay comfortable on a budget that works."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Financing", href: "/financing" }]}
      />

      {/* Perks */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Flexible payment options</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Financing that fits real budgets</h2>
            <p className="mt-4 text-slate-600">With approved credit, you can install the system your home needs today and pay for it in comfortable monthly installments.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} from="up" delay={i * 80}>
                  <div className="h-full rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-navy-800 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="iced iced-light text-xl sm:text-2xl">Ready to explore your options?</h3>
              <p className="mt-2 text-white/85">Get a free, no-obligation estimate and we&apos;ll show you exactly what your monthly payment could look like.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">Get My Free Estimate</Link>
              <Link href={site.phoneHref} className="btn btn-outline-light"><Phone className="h-4 w-4" /> {site.phoneDisplay}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="iced iced-dark text-2xl sm:text-3xl">How it works</h2>
            <p className="mt-4 text-slate-600">Four simple steps from breakdown to worry-free comfort.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} from="up" delay={i * 70}>
                <div className="relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ice-100 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-brand to-[#a30f14] font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-white shadow-lg">{s.n}</span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
            Financing is provided by third-party lenders on approved credit. Terms, rates, and promotional
            offers vary and are subject to lender approval. Ask our team for current details.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Financing — Common Questions</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={faqs} /></div>
        </div>
      </section>

      <CtaBand title="Let's make comfort affordable" text="Talk to our team about financing your new system today." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Droplet, Wrench, Flame, Shield, Home, Check, Phone, Clock } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Reviews, { type Review } from "@/components/Reviews";
import PlumbingFunnel from "@/components/PlumbingFunnel";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Plumbing Services in San Antonio — Glacier Heating & Air",
  description: `Licensed San Antonio plumbers for drain cleaning, leak repair, water heaters, fixtures, repiping, and 24/7 emergencies. Book online in 60 seconds. Call ${site.phoneDisplay}.`,
  alternates: { canonical: "/plumbing" },
};

const SERVICES = [
  { icon: Droplet, t: "Drain Cleaning & Rooter", b: "Slow or clogged drains, hydro-jetting, and root intrusion cleared fast." },
  { icon: Droplet, t: "Leak Detection & Repair", b: "Pinpoint hidden leaks under slabs, walls, and yards — before they cost you." },
  { icon: Flame, t: "Water Heaters", b: "Tank & tankless repair, replacement, and flushes — gas or electric." },
  { icon: Wrench, t: "Faucets, Sinks & Fixtures", b: "Upgrades and repairs that stop drips and modernize your home." },
  { icon: Home, t: "Toilets", b: "Running, clogged, or wobbling — repaired or replaced same day." },
  { icon: Wrench, t: "Repiping & Water Lines", b: "Whole-home repipes and main water line repair done right." },
  { icon: Shield, t: "Sewer & Camera Inspection", b: "Camera diagnostics and sewer line repair with no guesswork." },
  { icon: Droplet, t: "Garbage Disposals", b: "Jammed, leaking, or dead disposals swapped out quick." },
];

const FAQS = [
  { q: "Do you offer 24/7 emergency plumbing?", a: `Yes. Burst pipes and major leaks don't wait for business hours, and neither do we. Call ${site.phoneDisplay} any time and we'll prioritize your emergency across greater San Antonio.` },
  { q: "Are your plumbers licensed and insured?", a: "Absolutely. Every Glacier plumber is licensed, insured, and background-checked, with upfront pricing you approve before any work begins." },
  { q: "Do you handle water heaters and HVAC too?", a: "We do — Glacier is your one call for plumbing, water heaters, heating, and air conditioning. One trusted team means faster scheduling and no finger-pointing between contractors." },
  { q: "Will I get an upfront price?", a: "Yes. We diagnose the issue and give you a clear, flat price before we start — no surprise charges and no pressure." },
  { q: "What areas do you serve?", a: "All of greater San Antonio — Stone Oak, Alamo Heights, Boerne, New Braunfels, Schertz, Cibolo, Helotes, and the surrounding Hill Country and I-35 communities." },
];

const plumbingReviews: Review[] = [
  { name: "Derek Salinas", initials: "DS", date: "May 27, 2026", text: "Had a slab leak I'd been dreading. Glacier's plumber found it in twenty minutes with a camera and had it fixed the same day. Upfront price, no drama. These guys are the real deal." },
  { name: "Priya Anand", initials: "PA", date: "May 25, 2026", text: "Tankless water heater install was flawless — clean, on time, and they walked me through the whole system. Booked it online in a minute and they called me right back." },
  { name: "Michael Trahan", initials: "MT", date: "May 23, 2026", text: "Kitchen drain was completely clogged before a party. They hydro-jetted it and it drains better than new. Fair price and super professional." },
  { name: "Lauren Kessler", initials: "LK", date: "May 21, 2026", text: "Love that they do plumbing AND our AC. One company I trust for everything. Fixed two running toilets and a leaky faucet in one visit." },
  { name: "Chris Obregón", initials: "CO", date: "May 19, 2026", text: "Emergency call at 11pm for a burst line. Someone actually answered and a plumber was out fast. Stopped the flooding and saved our floors. Cannot recommend enough." },
  { name: "Hannah Weiss", initials: "HW", date: "May 17, 2026", text: "Repiped our older Alamo Heights home. The crew was tidy, respectful, and explained every step. Water pressure is night and day now." },
];

export default function PlumbingPage() {
  const url = `${site.url}/plumbing`;
  return (
    <>
      <ServiceJsonLd name="Plumbing Services" description="Licensed plumbing in San Antonio — drain cleaning, leak repair, water heaters, fixtures, repiping, sewer, and 24/7 emergency service." url={url} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Plumbing", url: "/plumbing" }]} />

      <PageHero
        title="San Antonio Plumbing, Done Right"
        subtitle="Licensed plumbers for drains, leaks, water heaters, fixtures, repiping, and 24/7 emergencies — from the same team that keeps your home comfortable."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Plumbing", href: "/plumbing" }]}
      />

      {/* Funnel + value props */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-100 to-white py-16 sm:py-20">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-ice-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ice-600">
              <Clock className="h-3.5 w-3.5" /> Book in 60 seconds
            </span>
            <h2 className="iced iced-dark mt-4 text-3xl sm:text-4xl">Water where it shouldn&apos;t be?</h2>
            <p className="mt-4 text-slate-600">
              Tell us what&apos;s going on and lock in a time — no phone tag. A licensed Glacier plumber
              handles it with upfront pricing and clean, respectful work.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Licensed, insured & background-checked plumbers",
                "Upfront flat pricing — approved before we start",
                "24/7 emergency response across San Antonio",
                "One team for plumbing, water heaters & HVAC",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ice-500 text-white"><Check className="h-4 w-4" /></span>
                  <span className="text-sm font-medium text-navy-800">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={site.phoneHref} className="btn btn-primary"><Phone className="h-4 w-4" /> {site.phoneDisplay}</Link>
              <Link href="#services" className="btn btn-outline-navy">See all plumbing services</Link>
            </div>
          </div>

          <PlumbingFunnel />
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Full-service plumbing</p>
            <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">Everything under one roof</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.t} className="rounded-2xl border border-ice-100 bg-ice-50 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-500 text-white"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.b}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Reviews reviews={plumbingReviews} heading="What San Antonio says about our plumbers" />

      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Plumbing — Common Questions</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={FAQS} /></div>
        </div>
      </section>

      <CtaBand title="Got a plumbing problem? Let's fix it." text="Book online above or call now — licensed San Antonio plumbers, 24/7." />
    </>
  );
}

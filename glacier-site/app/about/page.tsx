import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Shield, Clock, Check, Star, Snowflake } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Glacier Heating & Air — San Antonio's Coolest HVAC Team",
  description: `${site.name} is a locally owned, licensed HVAC company serving Greater San Antonio. Certified technicians, honest pricing, and comfort you can count on — day or night.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Shield, title: "Do it right, every time", body: "We fix the actual problem — not just the symptom — and stand behind every job with a 100% satisfaction guarantee." },
  { icon: Star, title: "Honest, upfront pricing", body: "You approve the price before we start. No surprise fees, no high-pressure upsells, no games." },
  { icon: Clock, title: "Show up when we say", body: "Tight arrival windows and real-time updates, because your time matters as much as your comfort." },
  { icon: Snowflake, title: "Treat your home like ours", body: "Floor protection, clean workspaces, and technicians who are background-checked and drug-tested." },
];

const stats = [
  { n: site.ratingValue, l: "Average rating" },
  { n: `${site.reviewCount}+`, l: "Local reviews" },
  { n: "24/7", l: "Emergency service" },
  { n: `${new Date().getFullYear() - site.foundedYear}+`, l: "Years serving SA" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      <PageHero
        title="San Antonio's Coolest HVAC Team"
        subtitle="Locally owned, certified, and obsessed with getting it right — Glacier keeps South Texas homes comfortable through every triple-digit summer and surprise winter freeze."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      {/* Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Our story</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Built on trust, one San Antonio home at a time</h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p>
                Glacier Heating &amp; Air was founded on a simple frustration: too many homeowners were being
                oversold, overcharged, and left waiting in the Texas heat. We set out to build the HVAC company
                we&apos;d want for our own families — fast, fair, and genuinely good at the work.
              </p>
              <p>
                From the North Side to the Hill Country and down the I-35 corridor, our certified technicians
                handle everything from a middle-of-the-night AC breakdown to a full high-efficiency system
                install. We&apos;re licensed, insured, and rooted right here in San Antonio.
              </p>
              <p>
                The result? Thousands of neighbors who trust us to keep their homes comfortable — and a
                reputation we protect on every single call.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Licensed &amp; insured","EPA-certified techs","Financing available","Locally owned"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1 rounded-full bg-ice-50 px-3 py-1.5 text-sm font-semibold text-navy-800 ring-1 ring-ice-100">
                  <Check className="h-3.5 w-3.5 text-ice-600" /> <span dangerouslySetInnerHTML={{ __html: b }} />
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-ice-100 to-turquoise/20 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-ice-500 to-navy-800 p-8 shadow-xl">
              <div className="hero-mountains absolute inset-0 opacity-70" aria-hidden />
              <div className="relative flex flex-col items-center text-center">
                <Image src={site.mascotUrl} alt="Glacier's yeti mascot" width={280} height={375}
                  className="animate-float drop-shadow-2xl" priority />
                <p className="iced iced-light mt-4 text-xl">Meet the crew&apos;s coolest member</p>
                <p className="mt-1 text-sm text-white/80">Our mascot keeps things cool — our technicians keep them running.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-800 py-12">
        <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="iced iced-light text-3xl font-extrabold sm:text-4xl">{s.n}</div>
              <div className="mt-1 text-sm uppercase tracking-wide text-ice-200/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">What we stand for</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">The Glacier promise</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-500 text-white"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="Experience the Glacier difference" text="Join thousands of San Antonio homeowners who trust us with their comfort." />
    </>
  );
}

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Shield, Clock, Check, Star, Sun, FileText } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Daylight Solar — The Inland Empire's Straight-Answer Solar Company",
  description: `${site.name} is a locally owned, licensed solar and battery company serving Riverside, Moreno Valley, and the Inland Empire. Every number in writing, honest NEM 3.0 math, no games.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: FileText, title: "Everything in writing, first", body: "Price, payment, rate assumptions, warranties — on paper before signatures. If a number isn't written down, it doesn't exist." },
  { icon: Star, title: "Paid for accuracy, not tonnage", body: "No one here earns more by putting a bigger system on your roof than your usage supports. Incentives explain behavior; ours are built for honest answers." },
  { icon: Shield, title: "Design to the actual utility", body: "SCE, RPU, Moreno Valley Utility, Colton, Banning — the rules change at the city line, and so does our design. Template quotes are how neighbors end up with panels and a bill." },
  { icon: Clock, title: "Here after the install", body: "We service systems we didn't even install. That's how seriously we take year 15 of a 25-year relationship." },
];

const stats = [
  { n: site.ratingValue, l: "Average rating" },
  { n: `${site.reviewCount}+`, l: "Local reviews" },
  { n: "25 yr", l: "System design life" },
  { n: `${new Date().getFullYear() - site.foundedYear}+`, l: "Years in the IE" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      <PageHero
        title="The Inland Empire's Straight-Answer Solar Company"
        subtitle="Locally owned, licensed, and allergic to sales games — Daylight designs solar and storage for the utility that actually bills your house, and puts every number in writing before you sign."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      {/* Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Our story</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Built against the way solar gets sold</h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p>
                {site.name} was founded on a specific frustration: the Inland Empire is one of the most
                door-knocked solar markets in America, and too many of our neighbors signed 25-year
                contracts they were never really shown — escalators on page 11, dealer fees baked into
                &quot;low&quot; payments, savings math built on rate fantasies.
              </p>
              <p>
                So we built the company we&apos;d want at our own kitchen table. Systems designed off twelve
                months of real usage. Quotes that lead with the whole price. NEM 3.0 math done honestly —
                including the times it says &quot;don&apos;t buy solar yet.&quot; And a service department
                that answers the phone in year twelve, even for systems we didn&apos;t install.
              </p>
              <p>
                From Riverside&apos;s RPU territory to SCE&apos;s peak-priced evenings in Moreno Valley,
                Corona, and beyond — we know whose rules govern your roof, because that&apos;s the job.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Licensed & insured", "CSLB-verifiable", "Local crews, not fly-ins", "Financing compared honestly"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1 rounded-full bg-ice-50 px-3 py-1.5 text-sm font-semibold text-navy-800 ring-1 ring-ice-100">
                  <Check className="h-3.5 w-3.5 text-ice-600" /> {b}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-ice-100 to-turquoise/20 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-navy-700 to-navy-950 p-8 shadow-xl">
              <div className="hero-mountains absolute inset-0 opacity-70" aria-hidden />
              <div className="relative flex flex-col items-center py-6 text-center">
                <Sun className="h-24 w-24 text-turquoise animate-float" aria-hidden />
                <p className="iced iced-light mt-6 text-xl">Solar you can read before you sign</p>
                <p className="mt-2 max-w-sm text-sm text-white/80">
                  The name is the promise: the whole deal in plain daylight — price, payment, and the
                  honest math, before anyone asks for a signature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-950 py-14">
        <div className="hero-mountains absolute inset-0 opacity-40" aria-hidden />
        <div className="container-x relative grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} from="up" delay={i * 80} className="text-center">
              <div className="iced iced-light text-4xl font-extrabold sm:text-5xl">{s.n}</div>
              <div className="mt-1 text-sm uppercase tracking-wide text-ice-200/80">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">What we stand for</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">How Daylight operates</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} from="up" delay={i * 70}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ice-100 transition hover:-translate-y-1 hover:shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{v.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="See what honest solar math looks like" text="Sixty seconds of questions, and your real numbers arrive in writing." />
    </>
  );
}

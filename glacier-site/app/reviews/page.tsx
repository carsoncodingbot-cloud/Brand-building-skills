import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reviews, { sampleReviews } from "@/components/Reviews";
import { Star, Check } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Glacier Heating & Air Reviews — ${site.ratingValue}★ in San Antonio`,
  description: `Read ${site.reviewCount}+ reviews from San Antonio homeowners. ${site.name} is rated ${site.ratingValue} stars for fast, honest, professional HVAC service.`,
  alternates: { canonical: "/reviews" },
};

const ratingBars = [
  { stars: 5, pct: 94 },
  { stars: 4, pct: 4 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
];

const highlights = [
  "Fast, same-day response — even in peak summer",
  "Technicians who explain the problem in plain English",
  "Honest recommendations, never high-pressure sales",
  "Clean, respectful, on-time installations",
];

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Reviews", url: "/reviews" }]} />
      <PageHero
        title="What San Antonio Says About Glacier"
        subtitle={`Rated ${site.ratingValue} stars across ${site.reviewCount}+ reviews. Here's why homeowners across the metro trust us with their comfort.`}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]}
      />

      {/* Rating summary */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl border border-ice-100 bg-ice-50 p-8 text-center">
            <div className="iced iced-dark text-6xl font-extrabold">{site.ratingValue}</div>
            <div className="mt-2 flex items-center justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6" />)}
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-500">Based on {site.reviewCount}+ verified reviews</p>

            <div className="mt-6 space-y-2 text-left">
              {ratingBars.map((r) => (
                <div key={r.stars} className="flex items-center gap-3 text-sm">
                  <span className="flex w-10 items-center gap-1 font-semibold text-navy-800">{r.stars} <Star className="h-3.5 w-3.5 text-gold" /></span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-ice-200">
                    <span className="block h-full rounded-full bg-gradient-to-r from-ice-500 to-turquoise" style={{ width: `${r.pct}%` }} />
                  </span>
                  <span className="w-10 text-right text-slate-500">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">The feedback we hear most</h2>
            <p className="mt-4 text-slate-600">
              Every review is a promise we intend to keep. Across thousands of service calls, the same themes
              come up again and again — and they&apos;re exactly what we set out to be known for.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl border border-ice-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ice-500 to-navy-800 text-white"><Check className="h-4 w-4" /></span>
                  <span className="text-sm text-slate-600">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-navy-800 p-5 text-sm text-white/85">
              <p className="font-[family-name:var(--font-montserrat)] font-bold text-white">A note on our reviews</p>
              <p className="mt-1">
                Once our Google Business Profile is connected, verified reviews will stream in live here.
                The reviews below are representative of the feedback our team earns every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full review grid (reuse component, all reviews) */}
      <Reviews reviews={sampleReviews} heading="Recent reviews from your neighbors" />

      <CtaBand title="Ready to see why we're rated so highly?" text="Book your service and find out what the reviews are about." />
    </>
  );
}

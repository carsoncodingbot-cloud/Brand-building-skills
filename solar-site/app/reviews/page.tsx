import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import SystemCheck from "@/components/SystemCheck";
import { sampleReviews, ReviewCard, REVIEW_FONT } from "@/components/Reviews";
import { Star, GoogleG } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Daylight Solar Reviews — ${site.ratingValue}★ in the Inland Empire`,
  description: `Read reviews from Inland Empire homeowners. ${site.name} is rated ${site.ratingValue} stars for honest math, written prices, and clean solar and battery installs.`,
  alternates: { canonical: "/reviews" },
};

const ratingBars = [
  { stars: 5, pct: 94 },
  { stars: 4, pct: 4 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
];

/**
 * Reviews page, rebuilt proof-first:
 *  - compact hero (one screen ≠ three screens of preamble)
 *  - Google-native rating panel (Roboto, gold bars — reads as Google,
 *    not site-made, because that's where the trust lives)
 *  - review cards immediately after
 *  - the same 60-second check funnel embedded: sticky rail beside the
 *    reviews on desktop, woven between them on mobile — trust peaks
 *    while reading proof, capture sits right there when it does
 */
export default function ReviewsPage() {
  const firstHalf = sampleReviews.slice(0, 3);
  const secondHalf = sampleReviews.slice(3);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Reviews", url: "/reviews" }]} />

      {/* Compact hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-700 to-navy-950 pt-24">
        <div className="hero-mountains absolute inset-0" aria-hidden />
        <div className="container-x relative py-8 sm:py-10">
          <nav className="text-sm text-ice-200/80">
            <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden>›</span>{" "}
            <span className="font-semibold text-white">Reviews</span>
          </nav>
          <h1 className="iced iced-light mt-3 text-3xl sm:text-4xl">What the Inland Empire Says About Daylight</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Real reviews from your neighbors — and the same 60-second check they used to get their
            real numbers, in writing.
          </p>
        </div>
      </section>

      <section className="bg-ice-100 py-10 sm:py-14">
        <div className="container-x items-start gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          {/* Left — Google summary + review feed */}
          <div>
            {/* Google-native rating panel */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6" style={{ fontFamily: REVIEW_FONT }}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e8eaed] bg-white">
                    <GoogleG className="h-7 w-7" />
                  </span>
                  <div>
                    <div className="flex items-end gap-2.5">
                      <span className="text-5xl font-medium leading-none text-[#202124]">{site.ratingValue}</span>
                      <span className="flex gap-0.5 pb-1 text-[#fbbc04]">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[#5f6368]">Google Reviews · {site.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="min-w-[200px] max-w-xs flex-1 space-y-1.5">
                  {ratingBars.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="w-3 text-right text-xs text-[#5f6368]">{r.stars}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8eaed]">
                        <span className="block h-full rounded-full bg-[#fbbc04]" style={{ width: `${Math.max(r.pct, 1.5)}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn btn-primary !py-2.5 !px-5 text-xs">Write a review</Link>
              </div>
            </div>

            {/* Reviews — immediately, no preamble. One grid; below lg the
                funnel drops in as a full-width item right as trust peaks. */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {firstHalf.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
              <div className="mx-auto w-full max-w-md py-2 sm:col-span-2 lg:hidden">
                <SystemCheck />
              </div>
              {secondHalf.map((r, i) => <ReviewCard key={r.name} r={r} i={i + firstHalf.length} />)}
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Once our Google Business Profile is connected, verified reviews stream in live on this page.
            </p>
          </div>

          {/* Right — sticky capture rail (desktop) */}
          <aside className="hidden lg:sticky lg:top-20 lg:block">
            <SystemCheck />
            <p className="mt-3 text-center text-xs font-semibold text-slate-500">
              Free · 60 seconds · Every number in writing before any visit
            </p>
          </aside>
        </div>
      </section>

      <CtaBand title="Ready to see what they saw?" text="Run the 60-second check and get your own numbers — in writing." />
    </>
  );
}

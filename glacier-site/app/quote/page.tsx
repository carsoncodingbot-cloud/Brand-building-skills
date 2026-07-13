import type { Metadata } from "next";
import SystemCheck from "@/components/SystemCheck";
import RotatingReviews from "@/components/RotatingReviews";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Shield, Clock, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "60-Second System Check — Your Exact Price Path | Glacier Heating & Air",
  description:
    "Answer 4 quick questions about your AC or plumbing and get matched to the fastest path to a written, exact-price estimate in San Antonio.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "60-Second System Check | Glacier Heating & Air",
    description: "4 quick taps. Straight answers. Your exact price path in San Antonio.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Free Quote", url: "/quote" }]} />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ice-500 to-navy-800 pt-24">
        <div className="hero-mountains absolute inset-0" aria-hidden />
        <div className="container-x relative flex flex-col items-center py-8 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ice-200 sm:text-sm">Free · 60 seconds · No obligation</p>
          <h1 className="iced iced-light mt-2 text-center text-3xl sm:text-4xl">The 60-Second System Check</h1>
          <p className="mx-auto mt-3 max-w-lg text-center text-white/90">
            Four quick taps about what&apos;s going on at your place — and the fastest path to an
            <b className="text-white"> exact price, in writing, before any work begins.</b>
          </p>

          <div className="mt-7 w-full max-w-xl">
            <SystemCheck />
            <div className="mt-4">
              <RotatingReviews />
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 pb-6 text-sm text-ice-200/90">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> Licensed &amp; insured</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24/7 in San Antonio</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Price in writing first</span>
          </div>
        </div>
      </section>
    </>
  );
}

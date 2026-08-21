import type { Metadata } from "next";
import SystemCheck from "@/components/SystemCheck";
import RotatingReviews from "@/components/RotatingReviews";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Shield, Clock, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "60-Second Solar Reality Check — Your Real Numbers | Daylight Solar",
  description:
    "Answer 4 quick questions about your bill and your goals, and get your real solar numbers — price, payment, payback — in writing for your Inland Empire home. No pressure, no games.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "60-Second Solar Reality Check | Daylight Solar",
    description: "4 quick taps. Straight answers. Your real solar numbers for the Inland Empire — in writing.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Reality Check", url: "/quote" }]} />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-navy-700 to-navy-950 pt-24">
        <div className="hero-mountains absolute inset-0" aria-hidden />
        <div className="container-x relative flex flex-col items-center py-8 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ice-200 sm:text-sm">Free · 60 seconds · No obligation</p>
          <h1 className="iced iced-light mt-2 text-center text-3xl sm:text-4xl">The 60-Second Solar Reality Check</h1>
          <p className="mx-auto mt-3 max-w-lg text-center text-white/90">
            Four quick taps about your bill and your goals — and your real numbers arrive
            <b className="text-white"> in writing, before anyone visits your house.</b>
          </p>

          <div className="mt-6 w-full max-w-xl">
            <SystemCheck />
            <div className="mt-4">
              <RotatingReviews />
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 pb-6 text-sm text-ice-200/90">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> Licensed &amp; insured</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> Inland Empire local</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Every number in writing</span>
          </div>
        </div>
      </section>
    </>
  );
}

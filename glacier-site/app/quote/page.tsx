import type { Metadata } from "next";
import QuoteQuiz from "@/components/QuoteQuiz";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

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
      <QuoteQuiz />
    </>
  );
}

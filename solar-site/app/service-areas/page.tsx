import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { MapPin, ChevronRight } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Solar Service Areas Across the Inland Empire",
  description: "Daylight Solar serves Riverside, Moreno Valley, Corona, Fontana, Menifee, Temecula, Murrieta, Eastvale and the surrounding Riverside and San Bernardino county communities.",
  alternates: { canonical: "/service-areas" },
};

const tiers = [
  { n: 1 as const, label: "Core Service Areas", note: "Where we run the most consults — big roofs, big bills, fast answers." },
  { n: 2 as const, label: "Growing Communities", note: "Expanding neighborhoods across the metro we proudly cover." },
  { n: 3 as const, label: "Extended Coverage", note: "Surrounding communities we reach across both counties — including the muni-utility towns with their own solar rules." },
];

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }]} />
      <PageHero
        title="Solar Across the Inland Empire"
        subtitle="From Riverside's RPU territory to SCE's peak-priced suburbs — Daylight covers the whole IE, and designs to whichever utility bills your house. Find your city below."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x space-y-12">
          {tiers.map((tier) => (
            <div key={tier.n}>
              <div className="flex items-baseline gap-3">
                <h2 className="iced iced-dark text-2xl sm:text-3xl">{tier.label}</h2>
              </div>
              <p className="mt-2 text-slate-600">{tier.note}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cities.filter((c) => c.tier === tier.n).map((c, i) => (
                  <Reveal key={c.slug} from="up" delay={Math.min(i, 6) * 45}>
                    <Link href={`/service-areas/${c.slug}`}
                      className="group flex h-full items-start gap-3 rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-ice-500 hover:shadow-lg">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-[family-name:var(--font-montserrat)] font-bold text-navy-800 group-hover:text-ice-600">
                          {c.name}
                        </span>
                        <span className="block text-xs text-slate-500">{c.county}</span>
                      </span>
                      <ChevronRight className="ml-auto mt-1 h-4 w-4 text-ice-400 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Don't see your neighborhood?" text="If you're anywhere in the Inland Empire, chances are we cover you. Give us a call." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ServiceFunnel from "@/components/ServiceFunnel";
import { Phone, MapPin, Clock, Check } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Daylight Solar — Inland Empire Solar & Battery",
  description: `Book a solar consult, get your written numbers, or ask us anything. Call ${site.phoneDisplay} or request a consult online. Serving Riverside, Moreno Valley & the Inland Empire.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      <PageHero
        title="Talk To A Human"
        subtitle="Book a consult, request your written numbers, or just ask a hard question — we respond fast and never with a script."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info column */}
          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Talk to a real person</h2>
            <p className="mt-4 text-slate-600">
              No phone trees, no runaround. When you call {site.name}, you reach a local team that
              knows Inland Empire homes — and which utility bills yours — and can get your real numbers
              moving the same day.
            </p>

            <div className="mt-8 space-y-4">
              <a href={site.phoneHref} className="flex items-start gap-4 rounded-2xl border border-ice-100 bg-ice-50 p-5 transition hover:border-ice-500">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-brand text-white"><Phone className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ice-600">Call or text</span>
                  <span className="block text-lg font-extrabold text-navy-800">{site.phoneDisplay}</span>
                  <span className="block text-sm text-slate-500">{site.hours.emergency}</span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-ice-100 bg-ice-50 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ice-500 text-white"><MapPin className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ice-600">Service area</span>
                  <span className="block font-bold text-navy-800">Riverside, San Bernardino &amp; the whole Inland Empire</span>
                  <span className="block text-sm text-slate-500">{site.address.city}, {site.address.region} {site.address.postalCode}</span>
                </span>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-ice-100 bg-ice-50 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-white"><Clock className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ice-600">Hours</span>
                  <span className="block font-bold text-navy-800">{site.hours.weekdays}</span>
                  <span className="block text-sm text-slate-500">{site.hours.weekend}</span>
                </span>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 p-6 text-white ring-1 ring-white/10">
              <h3 className="iced text-lg uppercase">Why homeowners call Daylight first</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {["Every number in writing before you sign", "Designs matched to YOUR utility — SCE, RPU, or muni", "No escalators, no lien surprises, no games", "Consultants paid for accuracy, not system size", "We service systems we didn't install"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-turquoise" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Funnel column */}
          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Book your consult in 60 seconds</h2>
            <p className="mt-4 text-slate-600">Answer a few quick questions and we&apos;ll come prepared with your numbers — no phone tag required.</p>
            <div className="mt-6"><ServiceFunnel /></div>
          </div>
        </div>
      </section>

      <section className="bg-red-brand py-10">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-white">Solar system down right now?</p>
            <p className="text-white/90">Don&apos;t wait on a form — call and we&apos;ll get your rescue moving.</p>
          </div>
          <Link href={site.phoneHref} className="btn bg-white text-red-brand hover:bg-ice-50">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
        </div>
      </section>
    </>
  );
}

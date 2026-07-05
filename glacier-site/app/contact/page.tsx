import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Mascot from "@/components/Mascot";
import { Phone, MapPin, Clock, Check } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Glacier Heating & Air — San Antonio HVAC",
  description: `Schedule AC repair, heating, or a free install estimate with ${site.name}. Call ${site.phoneDisplay} or request service online. Serving all of Greater San Antonio, 24/7.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      <PageHero
        title="Let's Get You Comfortable"
        subtitle="Book service, request a free estimate, or reach our team any time — day or night. We respond fast."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info column */}
          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Talk to a real person</h2>
            <p className="mt-4 text-slate-600">
              No phone trees, no runaround. When you call {site.name}, you reach a local team that
              knows San Antonio homes and can get a certified technician headed your way — often the same day.
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
                  <span className="block font-bold text-navy-800">Greater San Antonio &amp; the Hill Country</span>
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

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-navy-800 p-6 text-white">
              <div className="flex-1">
                <h3 className="iced text-lg uppercase">Why homeowners call Glacier first</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  {["Same-day &amp; 24/7 emergency service","Upfront, honest pricing — no surprises","Certified, background-checked technicians","Financing available on qualifying installs","100% satisfaction guarantee"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-turquoise" /> <span dangerouslySetInnerHTML={{ __html: t }} />
                    </li>
                  ))}
                </ul>
              </div>
              <Mascot alt="Glacier yeti mascot waving hello" width={200} height={267}
                sizes="120px"
                className="hidden h-40 w-auto shrink-0 self-end object-contain sm:block" />
            </div>
          </div>

          {/* Form column */}
          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Request service online</h2>
            <p className="mt-4 text-slate-600">Fill out the form and we&apos;ll reach out to confirm your appointment.</p>
            <div className="mt-6"><ContactForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-red-brand py-10">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-white">No cool or no heat right now?</p>
            <p className="text-white/90">Don&apos;t wait on a form — call our 24/7 emergency line.</p>
          </div>
          <Link href={site.phoneHref} className="btn bg-white text-red-brand hover:bg-ice-50">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
        </div>
      </section>
    </>
  );
}

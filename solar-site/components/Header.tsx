"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, NAV_SERVICES, NAV_QUICK } from "@/lib/site";
import { DaylightMark, ChevronDown, ChevronRight, Phone, Star, GoogleG } from "@/components/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpenMobile(false);

  const pathname = usePathname();
  // Already on the homepage → same-route Links are a no-op in Next, so the
  // logo felt dead. Glide back to the top instead (fresh-landing feel).
  const onLogoClick = (e: React.MouseEvent) => {
    close();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || openMobile ? "bg-navy-800 shadow-[0_8px_24px_rgba(0,0,0,0.18)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-24 items-center justify-between">
        <Link href="/" onClick={onLogoClick} className="flex items-center gap-3" aria-label={site.name}>
          <DaylightMark className="h-12 w-auto shrink-0 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] sm:h-14" />
          <span className="leading-none">
            <span className="block font-[family-name:var(--font-montserrat)] text-2xl font-900 font-extrabold uppercase tracking-tight text-white sm:text-[1.7rem]">
              Daylight
            </span>
            <span className="mt-0.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-turquoise sm:text-[0.78rem]">
              Solar
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/contact" className="text-sm font-semibold text-white/90 hover:text-white">Contact</Link>
          <Link href="/our-promise" className="text-sm font-semibold text-white/90 hover:text-white">The Daylight Standard</Link>
          <Dropdown label="Services" items={NAV_SERVICES} />
          <Dropdown label="Quick Links" items={NAV_QUICK} />
          <Link href={site.phoneHref} className="btn btn-primary !px-6 !py-2.5 text-sm">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Menu" aria-expanded={openMobile}
          onClick={() => setOpenMobile((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-white transition ${openMobile ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition ${openMobile ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition ${openMobile ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu — short, collapsible, CTA-first */}
      {openMobile && (
        <div className="lg:hidden border-t border-white/10 bg-gradient-to-b from-navy-800 to-[#001a36]">
          <div className="container-x max-h-[calc(100dvh-5rem)] overflow-y-auto py-3">
            <nav className="divide-y divide-white/10">
              <MobileTop href="/contact" onClick={close}>Contact</MobileTop>
              <MobileTop href="/our-promise" onClick={close}>The Daylight Standard</MobileTop>
              <MobileAccordion label="Services" items={NAV_SERVICES} onNavigate={close} />
              <MobileAccordion label="Quick Links" items={NAV_QUICK.filter((i) => i.href !== "/contact")} onNavigate={close} />
            </nav>

            <div className="mt-5 space-y-3 pb-3">
              <Link href="/contact" onClick={close} className="btn btn-primary w-full text-base">Schedule Online</Link>
              <Link href={site.phoneHref} onClick={close} className="btn btn-outline-light w-full">
                <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
              </Link>
              <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-ice-200">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/40">
                  <GoogleG className="h-2.5 w-2.5" />
                </span>
                <span className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
                </span>
                {site.ratingValue} · The Inland Empire&apos;s straight-answer solar team
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white">
        {label} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-xl border border-ice-100 bg-white p-2 shadow-xl">
          {items.map((it) => (
            <Link key={it.href} href={it.href}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-ice-100 hover:text-ice-600">
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTop({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick}
      className="flex items-center justify-between py-3.5 text-lg font-semibold text-white transition active:text-ice-300">
      {children}
      <ChevronRight className="h-4 w-4 text-ice-400" />
    </Link>
  );
}

function MobileAccordion({ label, items, onNavigate }: { label: string; items: { label: string; href: string }[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-lg font-semibold text-white">
        {label}
        <ChevronDown className={`h-5 w-5 text-ice-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="mb-2 ml-1 space-y-0.5 border-l-2 border-ice-500/50 pl-4">
            {items.map((it) => (
              <Link key={it.href} href={it.href} onClick={onNavigate}
                className="block rounded-lg py-2.5 text-[0.95rem] font-medium text-white/75 transition hover:text-white active:text-ice-300">
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

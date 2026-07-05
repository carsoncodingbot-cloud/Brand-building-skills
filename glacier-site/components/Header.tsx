"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { site, NAV_SERVICES, NAV_QUICK } from "@/lib/site";
import { GlacierMark, ChevronDown, Phone } from "@/components/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || openMobile ? "bg-navy-800 shadow-[0_8px_24px_rgba(0,0,0,0.18)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <GlacierMark className="h-10 w-10 shrink-0" />
          <span className="leading-none">
            <span className="block font-[family-name:var(--font-montserrat)] text-xl font-900 font-extrabold uppercase tracking-tight text-white">
              Glacier
            </span>
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ice-300">
              Heating &amp; Air
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/contact" className="text-sm font-semibold text-white/90 hover:text-white">Contact</Link>
          <Link href="/glacier-club" className="text-sm font-semibold text-white/90 hover:text-white">Glacier Club</Link>
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

      {/* Mobile menu */}
      {openMobile && (
        <div className="lg:hidden border-t border-white/10 bg-navy-800">
          <div className="container-x space-y-1 py-4">
            <MobileLink href="/contact" onClick={() => setOpenMobile(false)}>Contact</MobileLink>
            <MobileLink href="/glacier-club" onClick={() => setOpenMobile(false)}>Glacier Club</MobileLink>
            <p className="px-1 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-ice-300">Services</p>
            {NAV_SERVICES.map((s) => (
              <MobileLink key={s.href} href={s.href} onClick={() => setOpenMobile(false)}>{s.label}</MobileLink>
            ))}
            <p className="px-1 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-ice-300">Quick Links</p>
            {NAV_QUICK.map((s) => (
              <MobileLink key={s.href} href={s.href} onClick={() => setOpenMobile(false)}>{s.label}</MobileLink>
            ))}
            <Link href={site.phoneHref} className="btn btn-primary mt-4 w-full">
              <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
            </Link>
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

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick}
      className="block rounded-lg px-1 py-2 font-semibold text-white/90 hover:text-white">
      {children}
    </Link>
  );
}

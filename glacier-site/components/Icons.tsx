import type { SVGProps } from "react";
import Image from "next/image";
import logoMark from "../public/logo-mark.png";
import type { ServiceIcon } from "@/lib/services";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...p,
});

export const Snowflake = (p: P) => (
  <svg {...base(p)}><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1M12 5l3-2M12 5L9 3M12 19l3 2M12 19l-3 2M5 12l-2 3M5 12l-2-3M19 12l2 3M19 12l2-3" /></svg>
);
export const Flame = (p: P) => (
  <svg {...base(p)}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);
export const Wind = (p: P) => (
  <svg {...base(p)}><path d="M12.8 19.6A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2M9.8 4.4A2 2 0 1 1 11 8H2" /></svg>
);
export const Split = (p: P) => (
  <svg {...base(p)}><rect x="2" y="4" width="20" height="7" rx="1.5" /><path d="M6 15v5M12 15v5M18 15v5M6 11v1M18 11v1M12 11v1" /></svg>
);
export const Building = (p: P) => (
  <svg {...base(p)}><rect x="4" y="2" width="16" height="20" rx="1.5" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>
);
export const Droplet = (p: P) => (
  <svg {...base(p)}><path d="M12 2.5S5.5 9.5 5.5 14a6.5 6.5 0 0 0 13 0C18.5 9.5 12 2.5 12 2.5z" /></svg>
);
export const Home = (p: P) => (
  <svg {...base(p)}><path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" /></svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}><path d="m5 12 5 5L20 7" /></svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const X = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const MapPin = (p: P) => (
  <svg {...base(p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" /></svg>
);

export const Wrench = (p: P) => (
  <svg {...base(p)}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
);

export const serviceIcons: Record<ServiceIcon, (p: P) => React.ReactElement> = {
  home: Home, snowflake: Snowflake, flame: Flame, wind: Wind,
  split: Split, building: Building, droplet: Droplet, shield: Shield,
};

/** Glacier brand mark — snowflake (cool) + sun (heat) HVAC emblem.
 *  Real logo art in /public/logo-mark.png (transparent, trimmed to the artwork).
 *  Pass a height class + `w-auto` so the ~1:1 mark keeps its exact proportions. */
/** Official 4-color Google "G" for Google Reviews trust badges. */
export const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden role="img">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
  </svg>
);

export const GlacierMark = ({ className }: { className?: string }) => (
  <Image
    src={logoMark}
    alt="Glacier Heating & Air logo"
    priority
    className={["object-contain", className].filter(Boolean).join(" ")}
  />
);

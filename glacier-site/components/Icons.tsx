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
export const MapPin = (p: P) => (
  <svg {...base(p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" /></svg>
);

export const serviceIcons: Record<ServiceIcon, (p: P) => React.ReactElement> = {
  home: Home, snowflake: Snowflake, flame: Flame, wind: Wind,
  split: Split, building: Building, droplet: Droplet, shield: Shield,
};

/** Glacier brand mark — snowflake (cool) + sun (heat) HVAC emblem.
 *  Real logo art in /public/logo-mark.png (transparent, trimmed to the artwork).
 *  Pass a height class + `w-auto` so the ~1:1 mark keeps its exact proportions. */
export const GlacierMark = ({ className }: { className?: string }) => (
  <Image
    src={logoMark}
    alt="Glacier Heating & Air logo"
    priority
    className={["object-contain", className].filter(Boolean).join(" ")}
  />
);

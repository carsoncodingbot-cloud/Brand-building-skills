import type { SVGProps } from "react";
import type { ServiceIcon } from "@/lib/services";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...p,
});

export const Sun = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" /></svg>
);
export const Battery = (p: P) => (
  <svg {...base(p)}><rect x="3" y="7" width="16" height="10" rx="2" /><path d="M22 10.5v3" /><path d="M11.5 9.5 9 12.2h4l-2.5 2.7" /></svg>
);
export const Roof = (p: P) => (
  <svg {...base(p)}><path d="M2.5 12.5 12 4l9.5 8.5" /><path d="M5.5 10.5V20h13v-9.5" /><rect x="8.5" y="12.5" width="7" height="4.5" rx="0.5" /><path d="M12 12.5v4.5M8.5 14.75h7" /></svg>
);
export const Bolt = (p: P) => (
  <svg {...base(p)}><path d="M13 2 4.5 13.5H11L9.5 22 19 10.5h-6.5L13 2z" /></svg>
);
export const Panel = (p: P) => (
  <svg {...base(p)}><rect x="3" y="3.5" width="18" height="13" rx="1.5" /><path d="M9 3.5v13M15 3.5v13M3 10h18M8 20.5h8M12 16.5v4" /></svg>
);
export const Building = (p: P) => (
  <svg {...base(p)}><rect x="4" y="2" width="16" height="20" rx="1.5" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>
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
export const FileText = (p: P) => (
  <svg {...base(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" /></svg>
);

export const serviceIcons: Record<ServiceIcon, (p: P) => React.ReactElement> = {
  home: Home, sun: Sun, battery: Battery, roof: Roof,
  bolt: Bolt, panel: Panel, wrench: Wrench, shield: Shield, building: Building,
};

/** Official 4-color Google "G" for Google Reviews trust badges. */
export const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden role="img">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
  </svg>
);

/** Daylight Solar brand mark — geometric sunrise over a panel.
 *  Deterministic vector art (no raster file needed): gold sun + rays, panel
 *  grid in currentColor so the parent sets white-on-navy or navy-on-white.
 *  Pass a height class + `w-auto` to keep the 1:1 proportions. */
export const DaylightMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden role="img" fill="none">
    {/* rays: radial hierarchy — tall crown ray, shorter flanks, horizon rays */}
    <g stroke="#f5a623" strokeLinecap="round">
      <path d="M32 6.5v7" strokeWidth="3.2" />
      <path d="M17.6 12.4l3.8 5" strokeWidth="2.7" />
      <path d="M46.4 12.4l-3.8 5" strokeWidth="2.7" />
      <path d="M8.5 24.5l6 2.6" strokeWidth="2.7" />
      <path d="M55.5 24.5l-6 2.6" strokeWidth="2.7" />
    </g>
    {/* rising sun with a light-core gradient */}
    <path d="M17.5 37.5a14.5 14.5 0 0 1 29 0z" fill="url(#dlsun)" />
    {/* horizon line the sun rests on */}
    <path d="M11 37.5h42" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    {/* panel — quiet, precise, a breath below the horizon */}
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="43.5" width="36" height="12" rx="3" />
      <path d="M26 43.5v12M38 43.5v12" />
    </g>
    <defs>
      <radialGradient id="dlsun" cx="0.5" cy="1" r="1">
        <stop offset="0.25" stopColor="#ffdf9e" />
        <stop offset="0.7" stopColor="#f8b53a" />
        <stop offset="1" stopColor="#ef8412" />
      </radialGradient>
    </defs>
  </svg>
);

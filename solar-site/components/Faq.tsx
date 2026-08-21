"use client";
import { useState } from "react";
import { ChevronDown } from "@/components/Icons";

export interface QA { q: string; a: string }

export default function Faq({ items, dark = false }: { items: QA[]; dark?: boolean }) {
  // split into two balanced columns like the reference layout
  const mid = Math.ceil(items.length / 2);
  const cols = [items.slice(0, mid), items.slice(mid)];
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {cols.map((col, i) => (
        <div key={i} className="space-y-4">
          {col.map((item) => <Item key={item.q} item={item} dark={dark} />)}
        </div>
      ))}
    </div>
  );
}

function Item({ item, dark }: { item: QA; dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl ${dark ? "bg-white" : "bg-white ring-1 ring-ice-100"} shadow-sm`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{item.q}</span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ice-600 transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate-600 sm:px-6">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

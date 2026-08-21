"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * "The Cost of Doing Nothing" — the homepage's worked example, NEPQ-style.
 *
 * Instead of asking the visitor to decode a cash-vs-financed comparison,
 * this lets them SEE their own consequence: drag to their monthly bill,
 * pick a horizon, and watch what staying with the utility adds up to —
 * next to the one fact that stings: after all of it, they own nothing.
 *
 * Honesty Law: the escalation assumption is stated ON the card (5%/yr,
 * labeled conservative vs. SCE's actual recent behavior), the "own" side
 * promises no fabricated savings number — it routes to the written quote.
 */

const ESCALATION = 0.05;
const HORIZONS = [25, 30, 35] as const;

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function CostOfDoingNothing() {
  const [monthly, setMonthly] = useState(320);
  const [years, setYears] = useState<(typeof HORIZONS)[number]>(25);

  const { total, flatTotal, blocks } = useMemo(() => {
    const annual = monthly * 12;
    const g = 1 + ESCALATION;
    const total = (annual * (Math.pow(g, years) - 1)) / ESCALATION;
    // 5-year blocks for the bar chart — each bar is that block's spend.
    const blocks: number[] = [];
    for (let start = 0; start < years; start += 5) {
      const len = Math.min(5, years - start);
      const blockSum = (annual * Math.pow(g, start) * (Math.pow(g, len) - 1)) / ESCALATION;
      blocks.push(blockSum);
    }
    return { total, flatTotal: annual * years, blocks };
  }, [monthly, years]);

  const maxBlock = Math.max(...blocks);

  return (
    <div className="overflow-hidden rounded-3xl bg-navy-800 text-white shadow-[0_30px_60px_-24px_rgba(5,14,29,0.6)] ring-1 ring-white/10">
      <div className="border-b border-white/10 bg-navy-900 px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">The question no salesperson asks</p>
        <h3 className="mt-1 font-[family-name:var(--font-montserrat)] text-xl font-extrabold">
          What&apos;s your current plan costing you?
        </h3>
      </div>

      <div className="p-6">
        {/* the one input that matters */}
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="dls-bill-slider" className="text-sm font-semibold text-white/80">
            My electric bill runs about…
          </label>
          <span className="font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-turquoise">
            {fmt(monthly)}<span className="text-sm font-bold text-white/60">/mo</span>
          </span>
        </div>
        <input
          id="dls-bill-slider"
          type="range" min={150} max={650} step={10} value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="dls-range mt-3 w-full"
          aria-label="Monthly electric bill"
        />

        {/* horizon */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">Over the next</span>
          {HORIZONS.map((h) => (
            <button
              key={h} onClick={() => setYears(h)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-extrabold transition ${
                years === h ? "bg-turquoise text-navy-900" : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
              aria-pressed={years === h}
            >
              {h} yrs
            </button>
          ))}
        </div>

        {/* the consequence, visualized in 5-year blocks */}
        <div className="mt-5 flex h-24 items-end gap-1.5" aria-hidden>
          {blocks.map((b, i) => (
            <div key={i} className="flex-1">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-[#e8650a] to-[#f5a623] transition-all duration-300"
                style={{ height: `${Math.max(12, (b / maxBlock) * 96)}px` }}
              />
              <p className="mt-1 text-center text-[0.6rem] font-bold text-white/50">yr {i * 5 + 1}–{Math.min((i + 1) * 5, years)}</p>
            </div>
          ))}
        </div>
        <p className="mt-1 text-[0.65rem] text-white/50">Each bar = what those five years cost. Notice which way the bars go.</p>

        {/* the two headline facts */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-white/60">You&apos;ll hand the utility about</p>
            <p className="mt-1.5 font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-[#f5a623] sm:text-3xl">{fmt(total)}</p>
            <p className="mt-1 text-[0.65rem] text-white/60">even frozen at today&apos;s rates: {fmt(flatTotal)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-white/60">And in year {years + 1} you&apos;ll own</p>
            <p className="mt-1.5 font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-white sm:text-3xl">$0</p>
            <p className="mt-1 text-[0.65rem] text-white/60">of it. No equipment, no equity, no end date.</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-white/85">
          That&apos;s renting power. Owning it means a system sized to your actual usage, a payment
          that <i>ends</i>, and equipment that&apos;s yours on day one. What&apos;s that number for your
          house? That&apos;s exactly what we put in writing — before anyone visits.
        </p>

        <Link href="/quote" className="btn btn-primary mt-5 w-full">See what staying vs. owning looks like for my house →</Link>
        <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-white/50">
          Assumes 5% average annual rate increases — conservative next to recent history: SCE&apos;s October
          2025 increase alone was ~13%, with more filed through 2028. Your written quote states every
          assumption behind your real numbers.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Star, GoogleG } from "@/components/Icons";
import { sampleReviews } from "@/components/Reviews";

/**
 * Auto-rotating single-review strip — sits directly under the hero form.
 * One review at a time, advances every 5.5s, pauses while hovered.
 * Designed for the navy hero gradient (frosted glass card, white text).
 */
export default function RotatingReviews() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % sampleReviews.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const r = sampleReviews[idx];

  return (
    <div
      className="w-full rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm sm:p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
            <GoogleG className="h-3.5 w-3.5" />
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ice-200">Google Reviews</span>
        </div>
        <div className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
        </div>
      </div>

      <div key={idx} className="review-enter mt-3" aria-live="polite">
        <p className="text-sm leading-relaxed text-white/90">&quot;{r.text}&quot;</p>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-turquoise text-[0.6rem] font-bold text-navy-900">{r.initials}</span>
          <span className="text-xs font-semibold text-white">{r.name}</span>
          <span className="text-xs text-ice-200/70">· {r.date}</span>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {sampleReviews.map((_, i) => (
          <button
            key={i}
            aria-label={`Show review ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-turquoise" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

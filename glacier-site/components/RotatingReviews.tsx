"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, GoogleG } from "@/components/Icons";
import { sampleReviews, AVATAR_COLORS, REVIEW_FONT } from "@/components/Reviews";
import { site } from "@/lib/site";

/**
 * Auto-rotating single-review card — sits directly under the hero form.
 * Styled to match real Google review anatomy (white card, letter avatar,
 * gold stars, relative time, plain text) so it reads as genuine social
 * proof, not a site-made prop. Advances every 5.5s, pauses on hover.
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
      className="w-full rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,20,44,0.65)] ring-1 ring-white/40 sm:p-5"
      style={{ fontFamily: REVIEW_FONT }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* header — Google badge + overall rating */}
      <div className="flex items-center justify-between gap-3 border-b border-[#e8eaed] pb-3">
        <div className="flex items-center gap-2">
          <GoogleG className="h-5 w-5" />
          <span className="text-sm font-medium text-[#202124]">Google Reviews</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-[#202124]">{site.ratingValue}</span>
          <span className="flex gap-0.5 text-[#fbbc04]">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
          </span>
        </div>
      </div>

      {/* rotating review */}
      <div key={idx} className="review-enter mt-3.5" aria-live="polite">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium text-white"
            style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
          >
            {r.initials.slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-medium text-[#202124]">{r.name}</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="flex gap-0.5 text-[#fbbc04]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
              </span>
              <span className="text-xs text-[#5f6368]">{r.when}</span>
            </div>
          </div>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-[#3c4043]">{r.text}</p>
      </div>

      {/* dots + see all */}
      <div className="mt-3.5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {sampleReviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Show review ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-[#1a73e8]" : "w-1.5 bg-[#dadce0] hover:bg-[#bdc1c6]"}`}
            />
          ))}
        </div>
        <Link href="/reviews" className="text-xs font-medium text-[#1a73e8] hover:underline">
          See all reviews
        </Link>
      </div>
    </div>
  );
}

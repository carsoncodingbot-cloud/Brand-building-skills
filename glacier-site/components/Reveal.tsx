"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal. Wraps content and slides/fades it into place the
 * first time it enters the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "up";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={from}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

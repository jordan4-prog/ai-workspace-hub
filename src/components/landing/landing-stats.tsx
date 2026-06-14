"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CATEGORIES } from "@/data/categories";
import { approxToolCountValue, TOOLS } from "@/data/tools";

/** Número que cuenta de 0 al valor final cuando entra en el viewport. */
function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function LandingStats() {
  const base = approxToolCountValue();
  const usePlus = base >= 100;

  const stats = [
    {
      to: usePlus ? base : TOOLS.length,
      prefix: usePlus ? "+" : "",
      suffix: "",
      label: "Herramientas",
    },
    { to: CATEGORIES.length, prefix: "", suffix: "", label: "Categorías" },
    { to: 100, prefix: "", suffix: "%", label: "Gratis y sin registro" },
  ];

  return (
    <section className="border-y border-border bg-bg-subtle">
      <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-border px-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-10 text-center">
            <p className="text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-1.5 text-xs text-fg-subtle sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

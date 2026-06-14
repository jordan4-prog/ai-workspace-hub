"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CATEGORIES } from "@/data/categories";
import { approxToolCountValue, TOOLS } from "@/data/tools";
import { useReviews } from "@/lib/reviews-context";
import { routes } from "@/lib/routes";

function Counter({
  to,
  prefix = "",
}: {
  to: number;
  prefix?: string;
}) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setV(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.floor(x)),
    });
    return () => controls.stop();
  }, [to, reduce]);

  return (
    <>
      {prefix}
      {v}
    </>
  );
}

function StatPill({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-1.5 rounded-full border border-border bg-bg-base/60 px-3.5 py-1.5 backdrop-blur">
      <span className="font-display text-base font-bold text-fg">{value}</span>
      <span className="text-xs text-fg-muted">{label}</span>
    </div>
  );
}

export function ToolsHero() {
  const reduce = useReducedMotion();
  const { getStats } = useReviews();
  const totalReviews = TOOLS.reduce((n, t) => n + getStats(t.slug).count, 0);
  const toolsBase = approxToolCountValue();

  return (
    <div className="relative -mx-4 mb-8 overflow-hidden rounded-b-3xl px-4 py-12 sm:-mx-6 sm:px-6 sm:py-16">
      {/* Fondo: mesh + orbes cian flotantes */}
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-12 -z-10 h-52 w-52 rounded-full bg-accent/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 18, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-0 -z-10 h-60 w-60 rounded-full bg-accent/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, -24, 0], y: [0, 14, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="mb-3 text-xs text-fg-subtle" aria-label="Migas de pan">
          <Link href={routes.dashboard} className="transition-colors hover:text-fg">
            Inicio
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-fg-muted">Herramientas</span>
        </nav>

        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl">
          Todas las{" "}
          <span className="bg-gradient-to-r from-[#67E8F9] to-[#22D3EE] bg-clip-text text-transparent">
            herramientas
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-fg-muted">
          Explora, filtra y descubre las mejores IA del mercado. Valoradas por
          la comunidad.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <StatPill value={<Counter to={toolsBase} prefix="+" />} label="herramientas" />
          <StatPill value={<Counter to={CATEGORIES.length} />} label="categorías" />
          <StatPill value={<Counter to={totalReviews} />} label="reseñas" />
        </div>
      </motion.div>
    </div>
  );
}

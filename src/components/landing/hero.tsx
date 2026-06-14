"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HeroSearch } from "@/components/landing/hero-search";
import { ToolLogo } from "@/components/tool-logo";
import { approxToolCount, resolveTools } from "@/data/tools";
import { routes } from "@/lib/routes";

const HERO_TOOLS = resolveTools([
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "cursor",
  "midjourney",
  "runway",
  "elevenlabs",
  "suno",
  "canva",
  "github-copilot",
  "notion-ai",
]);

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const logosContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Fondo: gradiente animado + blobs difuminados */}
      <div className="animated-gradient absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.35) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32"
      >
        {/* Badge */}
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-fg-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {approxToolCount()} herramientas de IA en un solo lugar
        </motion.span>

        {/* Título con glow */}
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl font-bold tracking-tight text-fg sm:text-7xl"
        >
          Todas las herramientas de IA.
          <br />
          <span className="bg-gradient-to-r from-[#7aa2ff] via-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent text-glow">
            En un único lugar.
          </span>
        </motion.h1>

        {/* Línea de acento animada */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-7 h-[3px] w-36 origin-center rounded-full bg-gradient-to-r from-[#5B4AED] to-[#7C3AED]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />

        {/* Descripción */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-base text-fg-muted sm:text-lg"
        >
          Accede, organiza y abre las mejores IA del mercado desde una sola web.
          Deja de recordar decenas de páginas y de perder tiempo entre pestañas.
        </motion.p>

        {/* Botones */}
        <motion.div
          variants={scaleIn}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={routes.dashboard}
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5B4AED] to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5B4AED]/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#7C3AED]/40 hover:brightness-110 sm:w-auto"
          >
            Abrir workspace
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={routes.tools}
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-fg backdrop-blur transition-all duration-200 hover:scale-[1.03] hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Ver herramientas
          </Link>
        </motion.div>

        {/* Búsqueda interactiva */}
        <motion.div variants={fadeUp} className="mt-10">
          <HeroSearch />
        </motion.div>

        {/* Iconos flotantes */}
        <motion.div
          variants={logosContainer}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {HERO_TOOLS.map((tool, i) => (
            <motion.div key={tool.slug} variants={scaleIn} className="group relative">
              <motion.div
                animate={reduce ? undefined : { y: [0, -9, 0] }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 3 + (i % 4) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.18,
                      }
                }
                whileHover={{ scale: 1.18 }}
                className="cursor-default rounded-2xl transition-shadow duration-200 hover:shadow-lg hover:shadow-[#7C3AED]/30"
              >
                <ToolLogo tool={tool} size="lg" />
              </motion.div>
              {/* Tooltip con el nombre */}
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-bg-muted px-2 py-1 text-xs text-fg opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

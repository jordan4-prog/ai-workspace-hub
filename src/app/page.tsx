import {
  ArrowRight,
  Clock,
  Github,
  Layers,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CategoryIcon } from "@/components/category-icon";
import { ToolLogo } from "@/components/tool-logo";
import { CATEGORIES } from "@/data/categories";
import { approxToolCount, resolveTools, TOOLS } from "@/data/tools";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Workspace Hub — Todas tus herramientas de IA en un solo lugar",
  description:
    "Deja de recordar decenas de webs. Accede, organiza y abre las mejores herramientas de inteligencia artificial desde un único espacio rápido y minimalista.",
};

const GITHUB_URL = "https://github.com/kakealfaro4-prog/ai-workspace-hub";

// Logos reconocibles para el escaparate del hero.
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

const FEATURES = [
  {
    icon: Layers,
    title: "Todo en un solo lugar",
    text: `Más de ${TOOLS.length} herramientas de IA organizadas en ${CATEGORIES.length} categorías. Una sola web que recordar.`,
  },
  {
    icon: Star,
    title: "Favoritos y recientes",
    text: "Marca tus herramientas clave y retoma al instante las últimas que abriste. Sin perder tiempo buscando.",
  },
  {
    icon: Search,
    title: "Búsqueda instantánea",
    text: "Escribe «chat» o «video» y salta a la herramienta que necesitas en un segundo.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Barra de navegación */}
      <header className="sticky top-0 z-30 border-b border-border bg-bg-base/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={routes.home} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold tracking-tight text-fg">
              AI Workspace Hub
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={routes.tools}
              className="hidden rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg sm:inline"
            >
              Explorar
            </Link>
            <Link
              href={routes.dashboard}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Abrir workspace
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 65%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {approxToolCount()} herramientas de IA en un solo lugar
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
            Todas las herramientas de IA.
            <br />
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Un único lugar.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            Deja de recordar decenas de páginas web y de saltar entre pestañas.
            Accede, organiza y abre las mejores herramientas de inteligencia
            artificial desde un espacio rápido y minimalista.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={routes.dashboard}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
            >
              Abrir workspace
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={routes.tools}
              className="inline-flex w-full items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg sm:w-auto"
            >
              Ver herramientas
            </Link>
          </div>

          {/* Escaparate de logos */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {HERO_TOOLS.map((tool) => (
              <ToolLogo key={tool.slug} tool={tool} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-border px-4 sm:px-6">
          {[
            { value: approxToolCount(), label: "Herramientas" },
            { value: CATEGORIES.length, label: "Categorías" },
            { value: "100%", label: "Gratis" },
          ].map((s) => (
            <div key={s.label} className="px-2 py-8 text-center">
              <p className="text-2xl font-semibold text-fg sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-fg-subtle sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Características */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Tu centro de productividad con IA
          </h2>
          <p className="mt-3 text-fg-muted">
            Pensado para que encuentres y abras cualquier herramienta sin
            fricción.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-bg-subtle p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-medium text-fg">{title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Explora por categoría
          </h2>
          <Link
            href={routes.tools}
            className="shrink-0 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={routes.category(category.id)}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg-subtle px-4 py-3 transition-colors hover:border-border-strong hover:bg-bg-muted"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-muted text-accent">
                <CategoryIcon name={category.icon} className="h-4 w-4" />
              </span>
              <span className="truncate text-sm text-fg">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            ¿List@ para trabajar más rápido con IA?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-fg-muted">
            Una sola web que recordar. Abre tu workspace y empieza ahora — sin
            registro.
          </p>
          <Link
            href={routes.dashboard}
            className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Abrir workspace
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-fg-subtle sm:flex-row sm:px-6">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden />© 2026 AI Workspace Hub
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            <Github className="h-4 w-4" aria-hidden />
            Código en GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { Grid3x3, Layers, Star, Clock } from "lucide-react";

import { PageHeader, Section } from "@/components/section";
import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { CATEGORIES } from "@/data/categories";
import { approxToolCount, resolveTools } from "@/data/tools";
import { routes } from "@/lib/routes";
import { useWorkspace } from "@/lib/workspace-context";

// Selección curada de herramientas recomendadas para el estado inicial.
const RECOMMENDED_SLUGS = [
  "chatgpt",
  "claude",
  "cursor",
  "perplexity",
  "midjourney",
  "runway",
  "elevenlabs",
  "lovable",
];

export default function DashboardPage() {
  const { favorites, recents, ready } = useWorkspace();

  const favoriteTools = resolveTools(favorites);
  const recentTools = resolveTools(recents.map((r) => r.slug));
  const recommended = resolveTools(RECOMMENDED_SLUGS);

  const stats = [
    { label: "Herramientas", value: approxToolCount(), icon: Grid3x3 },
    { label: "Categorías", value: CATEGORIES.length, icon: Layers },
    { label: "Favoritos", value: ready ? favorites.length : "—", icon: Star },
    { label: "Recientes", value: ready ? recents.length : "—", icon: Clock },
  ];

  return (
    <>
      <PageHeader
        title="Tu espacio de trabajo de IA"
        subtitle="Un único lugar para acceder a todas tus herramientas de inteligencia artificial."
      />

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-border bg-bg-subtle p-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-muted text-accent">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-xl font-semibold text-fg">{value}</p>
              <p className="text-xs text-fg-subtle">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {ready && recentTools.length > 0 && (
        <Section title="Continuar donde lo dejaste" moreHref={routes.recents}>
          <ToolGrid tools={recentTools.slice(0, 4)} />
        </Section>
      )}

      <Section title="Favoritos" moreHref={routes.favorites}>
        {!ready ? (
          <ToolGridSkeleton />
        ) : favoriteTools.length > 0 ? (
          <ToolGrid tools={favoriteTools.slice(0, 4)} />
        ) : (
          <EmptyState
            title="Aún no tienes favoritos"
            description="Pulsa la estrella en cualquier herramienta para tenerla siempre a mano."
          />
        )}
      </Section>

      <Section title="Recomendadas" moreHref={routes.tools}>
        <ToolGrid tools={recommended} />
      </Section>
    </>
  );
}

function ToolGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-44 animate-pulse rounded-xl border border-border bg-bg-subtle"
        />
      ))}
    </div>
  );
}

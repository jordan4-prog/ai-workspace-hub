"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ToolCard } from "@/components/tool-card";
import { CATEGORIES, getCategoryLabel } from "@/data/categories";
import { getPricing, type Pricing } from "@/data/pricing";
import { TOOLS } from "@/data/tools";
import { useReviews } from "@/lib/reviews-context";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types/tool";

type CategoryFilter = CategoryId | "all";
type PriceFilter = Pricing | "all";
type Sort = "default" | "az" | "za" | "cat" | "rating";

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    // Stagger acotado: solo las primeras ~16 entran escalonadas; el resto a la vez.
    transition: { duration: 0.3, ease: "easeOut", delay: Math.min(i, 15) * 0.04 },
  }),
};

export function ToolsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<Sort>("default");
  const reduce = useReducedMotion();
  const { getStats } = useReviews();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = TOOLS.filter((tool) => {
      if (category !== "all" && !tool.categories.includes(category)) return false;
      if (price !== "all" && getPricing(tool.slug) !== price) return false;
      if (!q) return true;
      return [tool.name, tool.description, ...tool.tags, ...tool.categories]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    const sorted = [...result];
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "za") sorted.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "cat")
      sorted.sort(
        (a, b) =>
          getCategoryLabel(a.categories[0]).localeCompare(
            getCategoryLabel(b.categories[0]),
          ) || a.name.localeCompare(b.name),
      );
    else if (sort === "rating")
      sorted.sort((a, b) => {
        const sa = getStats(a.slug);
        const sb = getStats(b.slug);
        return sb.avg - sa.avg || sb.count - sa.count;
      });
    return sorted;
  }, [query, category, price, sort, getStats]);

  const hasFilters = query !== "" || category !== "all" || price !== "all";
  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPrice("all");
  };

  // Re-anima la entrada solo en cambios deliberados (categoría/precio/orden),
  // no al teclear en la búsqueda (evita jank mientras se escribe).
  const gridKey = `${category}-${price}-${sort}`;

  return (
    <div>
      <div className="mb-5 space-y-4">
        {/* Buscador en página */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-subtle px-3.5 py-3 transition-colors focus-within:border-accent/50">
          <Search className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar herramientas..."
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
            aria-label="Buscar herramientas"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="text-fg-subtle transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {/* Controles: chips + dropdowns */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              Todas
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </Chip>
            ))}
          </div>

          <div className="flex shrink-0 gap-2">
            <Select
              label="Filtrar por precio"
              value={price}
              onChange={(v) => setPrice(v as PriceFilter)}
              options={[
                ["all", "Todos los precios"],
                ["free", "Gratis"],
                ["freemium", "Freemium"],
                ["paid", "De pago"],
              ]}
            />
            <Select
              label="Ordenar"
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              options={[
                ["default", "Destacadas"],
                ["rating", "Mejor valoradas"],
                ["az", "Nombre A–Z"],
                ["za", "Nombre Z–A"],
                ["cat", "Por categoría"],
              ]}
            />
          </div>
        </div>
      </div>

      {/* Recuento en vivo */}
      <p className="mb-4 text-sm text-fg-subtle">
        {filtered.length}{" "}
        {filtered.length === 1 ? "herramienta" : "herramientas"}
        {category !== "all" && (
          <>
            {" "}
            en <span className="text-fg-muted">{getCategoryLabel(category)}</span>
          </>
        )}
      </p>

      {filtered.length > 0 ? (
        <div
          key={gridKey}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((tool, i) =>
            reduce ? (
              <ToolCard key={tool.slug} tool={tool} />
            ) : (
              <motion.div
                key={tool.slug}
                custom={i}
                variants={item}
                initial="hidden"
                animate="show"
              >
                <ToolCard tool={tool} />
              </motion.div>
            ),
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-bg-subtle/50 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-fg">
            Sin resultados
          </p>
          <p className="mt-1 max-w-sm text-sm text-fg-muted">
            No hay herramientas que coincidan con tu búsqueda. Prueba otra
            categoría o limpia los filtros.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-base transition-colors hover:bg-accent-hover"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-border bg-bg-subtle text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-fg-muted outline-none transition-colors hover:text-fg focus-visible:border-accent/50 focus-visible:outline-none"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-bg-muted text-fg">
          {l}
        </option>
      ))}
    </select>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FavoriteButton } from "@/components/favorite-button";
import { StarRating } from "@/components/star-rating";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { getPricing, PRICING_BADGE_CLASS, PRICING_LABEL } from "@/data/pricing";
import { useReviews } from "@/lib/reviews-context";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

/**
 * Tarjeta de herramienta (estilo directorio).
 *
 * Es un enlace REAL a la ficha (SEO + cmd/ctrl-click abren la página en una
 * pestaña nueva), pero en clic normal abre el panel lateral vía ?toolId.
 * El botón de favorito detiene la propagación. Hover con elevación + glow cian.
 */
export function ToolCard({ tool }: { tool: Tool }) {
  const router = useRouter();
  const pathname = usePathname();
  const pricing = getPricing(tool.slug);
  const stats = useReviews().getStats(tool.slug);

  const handleClick = (e: React.MouseEvent) => {
    // Respeta cmd/ctrl/shift/middle-click → deja que el enlace abra la ficha.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    router.push(`${pathname}?toolId=${tool.slug}`, { scroll: false });
  };

  // Spotlight que sigue al cursor (vía CSS vars, sin re-render de React).
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={routes.tool(tool.slug)}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-bg-subtle p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-bg-muted hover:shadow-xl hover:shadow-accent-glow"
    >
      {/* Spotlight cian que sigue al cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(34,211,238,0.12), transparent 60%)",
        }}
      />
      {/* Línea de acento superior al hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <ToolLogo tool={tool} size="md" />
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
              PRICING_BADGE_CLASS[pricing],
            )}
          >
            {PRICING_LABEL[pricing]}
          </span>
          <FavoriteButton slug={tool.slug} />
        </div>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
          {tool.name}
        </h3>
        <p className="mt-0.5 text-xs text-fg-subtle">
          {getCategoryLabel(tool.categories[0])}
        </p>
        {stats.count > 0 ? (
          <div className="mt-1.5 flex items-center gap-1.5">
            <StarRating value={stats.avg} size={13} readOnly />
            <span className="text-xs font-medium text-fg">
              {stats.avg.toFixed(1)}
            </span>
            <span className="text-xs text-fg-subtle">({stats.count})</span>
          </div>
        ) : (
          <p className="mt-1.5 text-xs text-fg-subtle">Sin reseñas aún</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-fg-muted">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}

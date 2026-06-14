"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { StarRating } from "@/components/star-rating";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { getPricing, PRICING_BADGE_CLASS, PRICING_LABEL } from "@/data/pricing";
import { resolveTools, TOOLS } from "@/data/tools";
import { useReviews, type ToolStats } from "@/lib/reviews-context";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

// Selección curada para rellenar cuando aún no hay (suficientes) reseñas.
const CURATED = [
  "chatgpt",
  "claude",
  "gemini",
  "midjourney",
  "cursor",
  "perplexity",
  "runway",
  "elevenlabs",
  "notion-ai",
  "v0",
];
const MAX = 8;

export function FeaturedTools() {
  const { getStats } = useReviews();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const { featured, hasRatings } = useMemo(() => {
    const rated = TOOLS.filter((t) => getStats(t.slug).count > 0).sort((a, b) => {
      const sa = getStats(a.slug);
      const sb = getStats(b.slug);
      return sb.avg - sa.avg || sb.count - sa.count;
    });
    const ratedSlugs = new Set(rated.map((t) => t.slug));
    const fill = resolveTools(CURATED).filter((t) => !ratedSlugs.has(t.slug));
    return {
      featured: [...rated, ...fill].slice(0, MAX),
      hasRatings: rated.length > 0,
    };
  }, [getStats]);

  if (featured.length === 0) return null;

  const open = (slug: string) =>
    router.push(`${pathname}?toolId=${slug}`, { scroll: false });

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-fg">
          {hasRatings ? "Top valoradas" : "Destacadas"}
        </h2>
        <span className="text-xs text-fg-subtle">
          {hasRatings
            ? "Las mejor valoradas por la comunidad"
            : "Una selección para empezar"}
        </span>
      </div>

      <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]">
        {featured.map((tool, i) => (
          <FeaturedCard
            key={tool.slug}
            tool={tool}
            rank={i + 1}
            stats={getStats(tool.slug)}
            index={i}
            reduce={!!reduce}
            onOpen={() => open(tool.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({
  tool,
  rank,
  stats,
  index,
  reduce,
  onOpen,
}: {
  tool: Tool;
  rank: number;
  stats: ToolStats;
  index: number;
  reduce: boolean;
  onOpen: () => void;
}) {
  const pricing = getPricing(tool.slug);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.05 }}
      className="group relative flex w-60 shrink-0 flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-bg-subtle p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent-glow"
    >
      {/* Marca de ranking de fondo */}
      <span
        aria-hidden
        className={cn(
          "absolute -right-1 top-0 font-display text-6xl font-bold leading-none",
          rank === 1 ? "text-accent/15" : "text-fg/5",
        )}
      >
        {rank}
      </span>

      <div className="relative flex items-start justify-between gap-2">
        <ToolLogo tool={tool} size="md" />
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
            PRICING_BADGE_CLASS[pricing],
          )}
        >
          {PRICING_LABEL[pricing]}
        </span>
      </div>

      <div className="relative">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
          {tool.name}
        </h3>
        <p className="text-xs text-fg-subtle">
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
          <span className="mt-2 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
            Destacada
          </span>
        )}
      </div>
    </motion.button>
  );
}

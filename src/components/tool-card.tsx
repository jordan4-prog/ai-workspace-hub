import Link from "next/link";

import { FavoriteButton } from "@/components/favorite-button";
import { OpenToolButton } from "@/components/open-tool-button";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { routes } from "@/lib/routes";
import type { Tool } from "@/types/tool";

/**
 * Tarjeta de herramienta. La superficie principal enlaza a la ficha;
 * los botones de acción (favorito / abrir) detienen la propagación para no
 * disparar la navegación.
 */
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={routes.tool(tool.slug)}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-bg-subtle p-4 transition-colors hover:border-border-strong hover:bg-bg-muted"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolLogo tool={tool} size="md" />
        <FavoriteButton slug={tool.slug} />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-fg">{tool.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-fg-muted">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs text-fg-subtle">
          {getCategoryLabel(tool.categories[0])}
        </span>
        <OpenToolButton tool={tool} variant="ghost" />
      </div>
    </Link>
  );
}

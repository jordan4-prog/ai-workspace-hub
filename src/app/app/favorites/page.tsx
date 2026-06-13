"use client";

import { PageHeader } from "@/components/section";
import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { resolveTools } from "@/data/tools";
import { useWorkspace } from "@/lib/workspace-context";

export default function FavoritesPage() {
  const { favorites, ready } = useWorkspace();
  const tools = resolveTools(favorites);

  return (
    <>
      <PageHeader
        title="Favoritos"
        subtitle="Tus herramientas marcadas, siempre a un clic."
      />
      {!ready ? null : tools.length > 0 ? (
        <ToolGrid tools={tools} />
      ) : (
        <EmptyState
          title="Aún no tienes favoritos"
          description="Pulsa la estrella en cualquier herramienta para añadirla aquí."
        />
      )}
    </>
  );
}

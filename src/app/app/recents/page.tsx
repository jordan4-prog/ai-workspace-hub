"use client";

import { PageHeader } from "@/components/section";
import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { resolveTools } from "@/data/tools";
import { useWorkspace } from "@/lib/workspace-context";

export default function RecentsPage() {
  const { recents, ready } = useWorkspace();
  const tools = resolveTools(recents.map((r) => r.slug));

  return (
    <>
      <PageHeader
        title="Recientes"
        subtitle="Las últimas herramientas que has abierto."
      />
      {!ready ? null : tools.length > 0 ? (
        <ToolGrid tools={tools} />
      ) : (
        <EmptyState
          title="Sin actividad reciente"
          description="Cuando abras una herramienta aparecerá aquí para retomarla rápido."
        />
      )}
    </>
  );
}

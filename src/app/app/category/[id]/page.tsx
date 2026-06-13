import { notFound } from "next/navigation";

import { PageHeader } from "@/components/section";
import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { CATEGORIES, getCategory } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import type { CategoryId } from "@/types/tool";

// Pre-renderiza una página estática por categoría.
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategory(id as CategoryId);
  if (!category) notFound();

  const tools = getToolsByCategory(category.id);

  return (
    <>
      <PageHeader
        title={category.label}
        subtitle={`${tools.length} herramienta${tools.length === 1 ? "" : "s"} en esta categoría.`}
      />
      {tools.length > 0 ? (
        <ToolGrid tools={tools} />
      ) : (
        <EmptyState
          title="Categoría vacía"
          description="Pronto añadiremos herramientas aquí."
        />
      )}
    </>
  );
}

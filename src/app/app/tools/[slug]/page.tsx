import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/favorite-button";
import { OpenToolButton } from "@/components/open-tool-button";
import { Section } from "@/components/section";
import { ToolGrid } from "@/components/tool-grid";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { getToolBySlug, TOOLS } from "@/data/tools";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Herramienta no encontrada" };
  return {
    title: `${tool.name} — AI Workspace Hub`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  // Relacionadas: comparten alguna categoría, excluyendo la actual.
  const related = TOOLS.filter(
    (t) =>
      t.slug !== tool.slug &&
      t.categories.some((c) => tool.categories.includes(c)),
  ).slice(0, 4);

  return (
    <>
      <Link
        href={routes.tools}
        className="mb-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Todas las herramientas
      </Link>

      <div className="rounded-2xl border border-border bg-bg-subtle p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <ToolLogo tool={tool} size="lg" />

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-fg">
                  {tool.name}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tool.categories.map((c) => (
                    <Link
                      key={c}
                      href={routes.category(c)}
                      className="rounded-md bg-bg-muted px-2 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
                    >
                      {getCategoryLabel(c)}
                    </Link>
                  ))}
                </div>
              </div>
              <FavoriteButton slug={tool.slug} />
            </div>

            <p className="mt-4 max-w-2xl text-fg-muted">{tool.description}</p>

            {tool.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-fg-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <OpenToolButton tool={tool} variant="primary" />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <Section title="Herramientas relacionadas">
            <ToolGrid tools={related} />
          </Section>
        </div>
      )}
    </>
  );
}

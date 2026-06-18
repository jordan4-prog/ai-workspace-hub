import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ToolLogo } from "@/components/tool-logo";
import { getPostBySlug, getSortedPosts } from "@/data/blog";
import { getCategoryLabel } from "@/data/categories";
import { getPricing, PRICING_BADGE_CLASS, PRICING_LABEL } from "@/data/pricing";
import { getToolBySlug } from "@/data/tools";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SITE_URL = "https://getaitoolshub.com";

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | AI Tools Hub`,
    description: post.description,
    alternates: { canonical: routes.post(post.slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE_URL}${routes.post(post.slug)}`,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "AI Tools Hub" },
    publisher: {
      "@type": "Organization",
      name: "AI Tools Hub",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}${routes.post(post.slug)}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={routes.blog}
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← Volver al blog
      </Link>

      <header className="mt-6">
        <time className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div className="mt-8 space-y-4">
        {post.intro.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-fg-muted">
            {p}
          </p>
        ))}
      </div>

      <ol className="mt-10 space-y-5">
        {post.items.map((item, i) => {
          const tool = getToolBySlug(item.slug);
          if (!tool) return null;
          const pricing = getPricing(tool.slug);
          return (
            <li
              key={item.slug}
              className="rounded-2xl border border-border bg-bg-subtle p-5"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-2xl font-bold text-accent/30">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToolLogo tool={tool} size="sm" />
                    <h2 className="font-display text-lg font-semibold tracking-tight text-fg">
                      {tool.name}
                    </h2>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        PRICING_BADGE_CLASS[pricing],
                      )}
                    >
                      {PRICING_LABEL[pricing]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                  <Link
                    href={routes.tool(tool.slug)}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    Ver {tool.name}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {post.outro && (
        <div className="mt-10 space-y-4">
          {post.outro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </div>
      )}

      {/* CTA al catálogo */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
          Explora todas las herramientas de IA
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          Más de 100 herramientas organizadas por categoría, listas para abrir
          desde un solo lugar.
        </p>
        <Link
          href={
            post.relatedCategory
              ? routes.category(post.relatedCategory)
              : routes.tools
          }
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-base transition-colors hover:bg-accent-hover"
        >
          {post.relatedCategory
            ? `Ver más de ${getCategoryLabel(post.relatedCategory)}`
            : "Ver el catálogo"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </main>
  );
}

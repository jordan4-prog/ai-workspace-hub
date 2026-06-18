import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getSortedPosts } from "@/data/blog";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Blog — Guías y comparativas de herramientas de IA | AI Tools Hub",
  description:
    "Guías, comparativas y rankings de las mejores herramientas de inteligencia artificial para escribir, crear imágenes, programar y más.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getSortedPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-fg-muted">
          Guías y comparativas para sacar el máximo partido a las herramientas
          de IA.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={routes.post(post.slug)}
              className="group block rounded-2xl border border-border bg-bg-subtle p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent-glow"
            >
              <time className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                {formatDate(post.date)}
              </time>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-fg-muted">{post.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Leer artículo
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

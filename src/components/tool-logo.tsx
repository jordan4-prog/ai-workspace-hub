"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

// Paleta de acentos para los monogramas (fallback). El índice se deriva del
// slug de forma determinista, así cada herramienta tiene siempre el mismo color.
const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#14b8a6",
  "#a855f7",
];

function colorForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

function monogram(name: string): string {
  const clean = name.replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/** Extrae el dominio (sin "www.") de la URL de la herramienta. */
function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const SIZES = {
  xs: { box: "h-5 w-5 rounded-md text-[8px]", pad: "p-0.5" },
  sm: { box: "h-9 w-9 rounded-lg text-xs", pad: "p-1" },
  md: { box: "h-11 w-11 rounded-xl text-sm", pad: "p-1.5" },
  lg: { box: "h-16 w-16 rounded-2xl text-lg", pad: "p-2.5" },
} as const;

/**
 * Logo de la herramienta. Intenta cargar el favicon real del sitio (derivado
 * del dominio) sobre una baldosa clara estilo "app icon"; si la imagen falla,
 * cae automáticamente a un monograma de color determinista.
 */
export function ToolLogo({
  tool,
  size = "md",
  className,
}: {
  tool: Tool;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const domain = domainFromUrl(tool.url);
  const s = SIZES[size];

  // Favicon real del sitio (servicio de Google, sin API key).
  if (domain && !failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-white shadow-sm",
          s.box,
          s.pad,
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`Logo de ${tool.name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  // Fallback: monograma de color.
  const color = colorForSlug(tool.slug);
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-semibold text-white shadow-sm",
        s.box,
        className,
      )}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      aria-hidden
    >
      {monogram(tool.name)}
    </div>
  );
}

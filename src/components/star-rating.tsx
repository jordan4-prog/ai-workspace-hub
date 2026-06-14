"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const GOLD = "#FBBF24";
const DIM = "#475569";

/**
 * Estrellas de valoración. En modo lectura muestra la media (redondeada);
 * en modo interactivo permite elegir 1–5 con hover animado.
 */
export function StarRating({
  value,
  onChange,
  size = 16,
  readOnly = false,
  className,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(shown);
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange?.(i)}
            aria-label={`${i} ${i === 1 ? "estrella" : "estrellas"}`}
            className={cn(
              "transition-transform",
              readOnly ? "cursor-default" : "hover:scale-125",
            )}
          >
            <Star
              style={{ width: size, height: size }}
              fill={filled ? GOLD : "none"}
              color={filled ? GOLD : DIM}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

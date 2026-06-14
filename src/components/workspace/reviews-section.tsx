"use client";

import { useEffect, useState } from "react";

import { StarRating } from "@/components/star-rating";
import { useReviews } from "@/lib/reviews-context";

export function ReviewsSection({ slug }: { slug: string }) {
  const {
    enabled,
    getStats,
    reviewsFor,
    myReview,
    submitReview,
    deleteReview,
  } = useReviews();

  const stats = getStats(slug);
  const mine = myReview(slug);
  const others = reviewsFor(slug).filter((r) => !mine || r.userId !== mine.userId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  // Precarga la reseña existente al abrir / cambiar de herramienta.
  useEffect(() => {
    setRating(mine?.rating ?? 0);
    setComment(mine?.comment ?? "");
  }, [slug, mine?.rating, mine?.comment]);

  const save = async () => {
    if (!rating) return;
    setSaving(true);
    await submitReview(slug, rating, comment);
    setSaving(false);
  };

  return (
    <div className="mt-6">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        Reseñas
      </h3>

      {/* Resumen */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-bg-subtle p-4">
        <div className="shrink-0 text-center">
          <div className="font-display text-3xl font-bold leading-none text-fg">
            {stats.count ? stats.avg.toFixed(1) : "—"}
          </div>
          <div className="mt-1.5">
            <StarRating value={stats.avg} size={14} readOnly />
          </div>
          <div className="mt-1 text-xs text-fg-subtle">
            {stats.count} {stats.count === 1 ? "reseña" : "reseñas"}
          </div>
        </div>
        <p className="text-sm text-fg-muted">
          {stats.count
            ? "Valoración media de la comunidad."
            : "Aún no hay reseñas. ¡Sé el primero en valorar!"}
        </p>
      </div>

      {/* Tu valoración */}
      {enabled ? (
        <div className="mt-4 rounded-xl border border-border p-4">
          <p className="mb-2 text-sm font-medium text-fg">
            {mine ? "Tu valoración" : "Deja tu valoración"}
          </p>
          <StarRating value={rating} onChange={setRating} size={26} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuenta tu experiencia (opcional)"
            rows={3}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-bg-base px-3 py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={!rating || saving}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-base transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {mine ? "Actualizar" : "Publicar reseña"}
            </button>
            {mine && (
              <button
                type="button"
                onClick={() => deleteReview(slug)}
                className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-fg-subtle">
          Inicia sesión para dejar tu valoración.
        </p>
      )}

      {/* Opiniones de otros */}
      {others.length > 0 && (
        <div className="mt-4 space-y-3">
          {others.map((r, i) => (
            <div
              key={`${r.userId}-${i}`}
              className="rounded-xl border border-border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <StarRating value={r.rating} size={13} readOnly />
                <span className="text-xs text-fg-subtle">
                  {new Date(r.createdAt).toLocaleDateString("es-ES")}
                </span>
              </div>
              {r.comment && (
                <p className="mt-1.5 text-sm text-fg-muted">{r.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

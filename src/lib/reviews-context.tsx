"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase/client";

export interface Review {
  userId: string;
  slug: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface ToolStats {
  avg: number;
  count: number;
}

interface ReviewsContextValue {
  ready: boolean;
  /** True con sesión iniciada (puede escribir reseñas). */
  enabled: boolean;
  getStats: (slug: string) => ToolStats;
  reviewsFor: (slug: string) => Review[];
  myReview: (slug: string) => Review | null;
  submitReview: (
    slug: string,
    rating: number,
    comment: string,
  ) => Promise<void>;
  deleteReview: (slug: string) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

const EMPTY_STATS: ToolStats = { avg: 0, count: 0 };

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) {
      setReady(true);
      return;
    }
    const { data } = await supabase
      .from("reviews")
      .select("user_id,slug,rating,comment,created_at")
      .order("created_at", { ascending: false });
    setReviews(
      (
        (data as {
          user_id: string;
          slug: string;
          rating: number;
          comment: string | null;
          created_at: string;
        }[] | null) ?? []
      ).map((r) => ({
        userId: r.user_id,
        slug: r.slug,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
      })),
    );
    setReady(true);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const statsMap = useMemo(() => {
    const acc = new Map<string, { sum: number; count: number }>();
    for (const r of reviews) {
      const e = acc.get(r.slug) ?? { sum: 0, count: 0 };
      e.sum += r.rating;
      e.count += 1;
      acc.set(r.slug, e);
    }
    const out = new Map<string, ToolStats>();
    acc.forEach((v, k) => out.set(k, { avg: v.sum / v.count, count: v.count }));
    return out;
  }, [reviews]);

  const getStats = useCallback(
    (slug: string) => statsMap.get(slug) ?? EMPTY_STATS,
    [statsMap],
  );
  const reviewsFor = useCallback(
    (slug: string) => reviews.filter((r) => r.slug === slug),
    [reviews],
  );
  const myReview = useCallback(
    (slug: string) =>
      user
        ? reviews.find((r) => r.userId === user.id && r.slug === slug) ?? null
        : null,
    [reviews, user],
  );

  const submitReview = useCallback(
    async (slug: string, rating: number, comment: string) => {
      if (!supabase || !user) return;
      await supabase.from("reviews").upsert(
        {
          user_id: user.id,
          slug,
          rating,
          comment: comment.trim() || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,slug" },
      );
      await load();
    },
    [user, load],
  );

  const deleteReview = useCallback(
    async (slug: string) => {
      if (!supabase || !user) return;
      await supabase
        .from("reviews")
        .delete()
        .eq("user_id", user.id)
        .eq("slug", slug);
      await load();
    },
    [user, load],
  );

  const value = useMemo<ReviewsContextValue>(
    () => ({
      ready,
      enabled: Boolean(user && supabase),
      getStats,
      reviewsFor,
      myReview,
      submitReview,
      deleteReview,
    }),
    [ready, user, getStats, reviewsFor, myReview, submitReview, deleteReview],
  );

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextValue {
  const ctx = useContext(ReviewsContext);
  if (!ctx) {
    throw new Error("useReviews debe usarse dentro de <ReviewsProvider>.");
  }
  return ctx;
}

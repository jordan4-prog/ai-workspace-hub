import type { SupabaseClient } from "@supabase/supabase-js";

import type { RecentEntry, StorageProvider } from "./storage-provider";

const MAX_RECENTS = 12;

interface FavoriteRow {
  slug: string;
}
interface RecentRow {
  slug: string;
  last_access: string;
}

/**
 * Implementación de `StorageProvider` sobre Supabase (Postgres + RLS).
 *
 * Las políticas de Row Level Security garantizan que cada usuario solo accede
 * a sus propias filas; aun así fijamos `user_id` explícitamente en los inserts
 * porque las políticas lo exigen (auth.uid() = user_id).
 */
export class SupabaseStorageProvider implements StorageProvider {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly userId: string,
  ) {}

  async getFavorites(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from("favorites")
      .select("slug")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as FavoriteRow[]).map((r) => r.slug);
  }

  async toggleFavorite(slug: string): Promise<string[]> {
    const current = await this.getFavorites();
    if (current.includes(slug)) {
      await this.supabase
        .from("favorites")
        .delete()
        .eq("user_id", this.userId)
        .eq("slug", slug);
    } else {
      await this.supabase
        .from("favorites")
        .insert({ user_id: this.userId, slug });
    }
    return this.getFavorites();
  }

  async getRecents(): Promise<RecentEntry[]> {
    const { data, error } = await this.supabase
      .from("recents")
      .select("slug,last_access")
      .order("last_access", { ascending: false })
      .limit(MAX_RECENTS);
    if (error || !data) return [];
    return (data as RecentRow[]).map((r) => ({
      slug: r.slug,
      lastAccess: new Date(r.last_access).getTime(),
    }));
  }

  async recordAccess(slug: string): Promise<RecentEntry[]> {
    await this.supabase.from("recents").upsert(
      {
        user_id: this.userId,
        slug,
        last_access: new Date().toISOString(),
      },
      { onConflict: "user_id,slug" },
    );

    // Recorta el historial a los MAX_RECENTS más recientes.
    const { data } = await this.supabase
      .from("recents")
      .select("slug")
      .order("last_access", { ascending: false });
    const all = (data as FavoriteRow[] | null) ?? [];
    if (all.length > MAX_RECENTS) {
      const toDelete = all.slice(MAX_RECENTS).map((r) => r.slug);
      await this.supabase
        .from("recents")
        .delete()
        .eq("user_id", this.userId)
        .in("slug", toDelete);
    }

    return this.getRecents();
  }
}

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
import { LocalStorageProvider } from "@/lib/storage/local-storage-provider";
import type {
  RecentEntry,
  StorageProvider,
} from "@/lib/storage/storage-provider";
import { SupabaseStorageProvider } from "@/lib/storage/supabase-storage-provider";
import { supabase } from "@/lib/supabase/client";

interface WorkspaceContextValue {
  favorites: string[];
  recents: RecentEntry[];
  /** True hasta que se hidrata el estado desde el provider (evita parpadeos). */
  ready: boolean;
  /** True cuando los datos viven en la nube (usuario con sesión). */
  cloud: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  recordAccess: (slug: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/**
 * Estado del Workspace (favoritos + recientes).
 *
 * Elige el `StorageProvider` según la sesión:
 * - Con usuario autenticado → Supabase (sincroniza entre dispositivos).
 * - Sin sesión → localStorage (modo anónimo, como siempre).
 *
 * La primera vez que un usuario inicia sesión, migra sus datos locales a la
 * nube (merge) para que no pierda lo que ya tenía guardado.
 */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const cloud = Boolean(user && supabase);

  const storage = useMemo<StorageProvider>(() => {
    if (user && supabase) {
      return new SupabaseStorageProvider(supabase, user.id);
    }
    return new LocalStorageProvider();
  }, [user]);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<RecentEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    setReady(false);

    async function init() {
      // Migración local → nube (una sola vez por usuario).
      if (user && supabase && storage instanceof SupabaseStorageProvider) {
        await migrateLocalToCloud(user.id, storage);
      }
      const [favs, recs] = await Promise.all([
        storage.getFavorites(),
        storage.getRecents(),
      ]);
      if (!active) return;
      setFavorites(favs);
      setRecents(recs);
      setReady(true);
    }

    void init();
    return () => {
      active = false;
    };
  }, [storage, user]);

  const toggleFavorite = useCallback(
    (slug: string) => {
      // Actualización optimista para una UI instantánea.
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
      );
      void storage.toggleFavorite(slug).then(setFavorites);
    },
    [storage],
  );

  const recordAccess = useCallback(
    (slug: string) => {
      void storage.recordAccess(slug).then(setRecents);
    },
    [storage],
  );

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      favorites,
      recents,
      ready,
      cloud,
      isFavorite,
      toggleFavorite,
      recordAccess,
    }),
    [favorites, recents, ready, cloud, isFavorite, toggleFavorite, recordAccess],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

/** Sube los favoritos/recientes de localStorage a la nube la primera vez. */
async function migrateLocalToCloud(
  userId: string,
  cloudStorage: SupabaseStorageProvider,
): Promise<void> {
  const flag = `awh:migrated:${userId}`;
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(flag)) return;
  } catch {
    return;
  }

  const local = new LocalStorageProvider();
  const [localFavs, localRecs, cloudFavs] = await Promise.all([
    local.getFavorites(),
    local.getRecents(),
    cloudStorage.getFavorites(),
  ]);

  for (const slug of localFavs) {
    if (!cloudFavs.includes(slug)) {
      await cloudStorage.toggleFavorite(slug);
    }
  }
  // De más antiguo a más nuevo, para preservar el orden de los recientes.
  for (const entry of [...localRecs].reverse()) {
    await cloudStorage.recordAccess(entry.slug);
  }

  try {
    window.localStorage.setItem(flag, "1");
  } catch {
    // Si no se puede marcar, en el peor caso se re-migra (es idempotente).
  }
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace debe usarse dentro de <WorkspaceProvider>.");
  }
  return ctx;
}

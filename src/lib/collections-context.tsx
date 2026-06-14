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

export interface Collection {
  id: string;
  name: string;
  /** Slugs de las herramientas que contiene. */
  slugs: string[];
}

interface CollectionsContextValue {
  collections: Collection[];
  /** True tras la carga inicial. */
  ready: boolean;
  /** True solo con sesión iniciada (las colecciones son de cuenta). */
  enabled: boolean;
  createCollection: (name: string) => Promise<string | null>;
  renameCollection: (id: string, name: string) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  addTool: (collectionId: string, slug: string) => Promise<void>;
  removeTool: (collectionId: string, slug: string) => Promise<void>;
  isInCollection: (collectionId: string, slug: string) => boolean;
}

const CollectionsContext = createContext<CollectionsContextValue | null>(null);

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const enabled = Boolean(user && supabase);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    setReady(false);

    async function load() {
      if (!user || !supabase) {
        if (active) {
          setCollections([]);
          setReady(true);
        }
        return;
      }
      const [{ data: cols }, { data: items }] = await Promise.all([
        supabase
          .from("collections")
          .select("id,name")
          .order("created_at", { ascending: true }),
        supabase.from("collection_items").select("collection_id,slug"),
      ]);

      const bySlug = new Map<string, string[]>();
      ((items as { collection_id: string; slug: string }[] | null) ?? []).forEach(
        (it) => {
          const arr = bySlug.get(it.collection_id) ?? [];
          arr.push(it.slug);
          bySlug.set(it.collection_id, arr);
        },
      );

      const result: Collection[] = (
        (cols as { id: string; name: string }[] | null) ?? []
      ).map((c) => ({ id: c.id, name: c.name, slugs: bySlug.get(c.id) ?? [] }));

      if (active) {
        setCollections(result);
        setReady(true);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [user]);

  const createCollection = useCallback(
    async (name: string) => {
      if (!supabase || !user) return null;
      const { data, error } = await supabase
        .from("collections")
        .insert({ user_id: user.id, name })
        .select("id")
        .single();
      if (error || !data) return null;
      const id = (data as { id: string }).id;
      setCollections((prev) => [...prev, { id, name, slugs: [] }]);
      return id;
    },
    [user],
  );

  const renameCollection = useCallback(async (id: string, name: string) => {
    if (!supabase) return;
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );
    await supabase.from("collections").update({ name }).eq("id", id);
  }, []);

  const deleteCollection = useCallback(async (id: string) => {
    if (!supabase) return;
    setCollections((prev) => prev.filter((c) => c.id !== id));
    await supabase.from("collections").delete().eq("id", id);
  }, []);

  const addTool = useCallback(async (collectionId: string, slug: string) => {
    if (!supabase) return;
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.slugs.includes(slug)
          ? { ...c, slugs: [...c.slugs, slug] }
          : c,
      ),
    );
    await supabase
      .from("collection_items")
      .insert({ collection_id: collectionId, slug });
  }, []);

  const removeTool = useCallback(
    async (collectionId: string, slug: string) => {
      if (!supabase) return;
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId
            ? { ...c, slugs: c.slugs.filter((s) => s !== slug) }
            : c,
        ),
      );
      await supabase
        .from("collection_items")
        .delete()
        .eq("collection_id", collectionId)
        .eq("slug", slug);
    },
    [],
  );

  const isInCollection = useCallback(
    (collectionId: string, slug: string) =>
      collections.find((c) => c.id === collectionId)?.slugs.includes(slug) ??
      false,
    [collections],
  );

  const value = useMemo<CollectionsContextValue>(
    () => ({
      collections,
      ready,
      enabled,
      createCollection,
      renameCollection,
      deleteCollection,
      addTool,
      removeTool,
      isInCollection,
    }),
    [
      collections,
      ready,
      enabled,
      createCollection,
      renameCollection,
      deleteCollection,
      addTool,
      removeTool,
      isInCollection,
    ],
  );

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections(): CollectionsContextValue {
  const ctx = useContext(CollectionsContext);
  if (!ctx) {
    throw new Error("useCollections debe usarse dentro de <CollectionsProvider>.");
  }
  return ctx;
}

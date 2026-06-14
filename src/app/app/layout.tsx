import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { ToolPanel } from "@/components/workspace/tool-panel";
import { AuthProvider } from "@/lib/auth-context";
import { CollectionsProvider } from "@/lib/collections-context";
import { ReviewsProvider } from "@/lib/reviews-context";
import { WorkspaceProvider } from "@/lib/workspace-context";

/**
 * Layout del workspace (todo lo que cuelga de /app).
 *
 * Provee la sesión (AuthProvider) y el estado del Workspace, que elige entre
 * Supabase (con sesión) o localStorage (anónimo). El ToolPanel (panel lateral
 * por ?toolId) se monta aquí para estar disponible en todas las páginas;
 * va en <Suspense> porque usa useSearchParams.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CollectionsProvider>
        <ReviewsProvider>
          <WorkspaceProvider>
            <AppShell>{children}</AppShell>
            <Suspense fallback={null}>
              <ToolPanel />
            </Suspense>
          </WorkspaceProvider>
        </ReviewsProvider>
      </CollectionsProvider>
    </AuthProvider>
  );
}

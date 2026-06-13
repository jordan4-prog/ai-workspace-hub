/**
 * Rutas de la aplicación, centralizadas.
 *
 * La landing pública vive en "/"; el workspace vive bajo "/app". Tener las
 * rutas en un único sitio evita strings mágicos repartidos por los componentes
 * y permite cambiar la estructura de URLs en un solo lugar.
 */
export const routes = {
  /** Landing pública (marketing). */
  home: "/",
  /** Dashboard del workspace. */
  dashboard: "/app",
  tools: "/app/tools",
  tool: (slug: string) => `/app/tools/${slug}`,
  category: (id: string) => `/app/category/${id}`,
  favorites: "/app/favorites",
  recents: "/app/recents",
} as const;

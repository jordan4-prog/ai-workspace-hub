/**
 * Modelo de precio de cada herramienta.
 *
 * Es info objetiva (no inventada): la mayoría de herramientas de IA de consumo
 * son "freemium" (capa gratis + planes de pago), así que ese es el valor por
 * defecto. Listamos solo las excepciones reales: open-source / gratis totales,
 * y las de pago/enterprise sin capa gratuita útil. El modelo puede evolucionar
 * con el tiempo; mantenerlo aquí permite actualizarlo en un único sitio.
 */

export type Pricing = "free" | "freemium" | "paid";

/** Open-source o totalmente gratuitas para su uso principal. */
const FREE = new Set<string>([
  "stable-diffusion",
  "ollama",
  "whisper",
  "llama",
  "flux",
  "upscayl",
  "gemma",
]);

/** De pago o enterprise, sin una capa gratuita útil (solo prueba/demo). */
const PAID = new Set<string>([
  "midjourney",
  "devin",
  "jasper",
  "surfer-seo",
  "outranking",
  "synthesia",
  "adcreative",
  "darktrace",
  "crowdstrike",
  "exabeam",
  "varonis",
  "splunk",
  "tableau",
  "pymetrics",
  "lattice",
  "culture-amp",
  "workable",
  "braze",
  "iterable",
]);

export function getPricing(slug: string): Pricing {
  if (FREE.has(slug)) return "free";
  if (PAID.has(slug)) return "paid";
  return "freemium";
}

export const PRICING_LABEL: Record<Pricing, string> = {
  free: "Gratis",
  freemium: "Freemium",
  paid: "De pago",
};

/** Clases de Tailwind para el badge según el modelo de precio. */
export const PRICING_BADGE_CLASS: Record<Pricing, string> = {
  free: "border-price-free/30 bg-price-free/10 text-price-free",
  freemium: "border-price-freemium/30 bg-price-freemium/10 text-price-freemium",
  paid: "border-price-paid/30 bg-price-paid/10 text-price-paid",
};

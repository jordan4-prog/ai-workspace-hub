/**
 * Símbolo de marca de AI Workspace Hub: un hexágono de nodos conectados
 * (la idea de "hub" que enlaza herramientas). Es SVG con `currentColor`, así
 * que hereda el color del texto (cian por defecto) y se ve nítido a cualquier
 * tamaño: sidebar, favicon, móvil, OG image. Versión vectorial del logo.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role="img"
      aria-label="AI Workspace Hub"
    >
      {/* Aristas del hexágono + radios internos hacia el nodo central */}
      <g
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 15 L82 33 L82 67 L50 85 L18 67 L18 33 Z" />
        <path d="M50 15 L50 50 M18 67 L50 50 M82 67 L50 50" />
      </g>
      {/* Nodos: 6 vértices + centro */}
      <g fill="currentColor">
        <circle cx="50" cy="15" r="9" />
        <circle cx="82" cy="33" r="9" />
        <circle cx="82" cy="67" r="9" />
        <circle cx="50" cy="85" r="9" />
        <circle cx="18" cy="67" r="9" />
        <circle cx="18" cy="33" r="9" />
        <circle cx="50" cy="50" r="7.5" />
      </g>
    </svg>
  );
}

import type { CategoryId } from "@/types/tool";

/**
 * Artículos del blog. Formato "listicle" (las mejores IA para X): es el que
 * mejor posiciona en Google y, además, enlaza a las herramientas del catálogo
 * (más páginas vistas + enlazado interno bueno para SEO).
 *
 * Cada `item.slug` debe existir en src/data/tools.ts.
 */

export interface BlogItem {
  /** Slug de la herramienta del catálogo. */
  slug: string;
  /** Comentario sobre por qué entra en la lista. */
  body: string;
}

export interface BlogPost {
  slug: string;
  /** Título SEO (aparece en Google y como H1). */
  title: string;
  /** Meta description (resumen para buscadores). */
  description: string;
  /** Fecha ISO de publicación. */
  date: string;
  /** Categoría relacionada del catálogo (para el CTA final). */
  relatedCategory?: CategoryId;
  /** Párrafos de introducción. */
  intro: string[];
  /** Herramientas recomendadas, en orden. */
  items: BlogItem[];
  /** Párrafos de cierre (opcional). */
  outro?: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "mejores-ia-para-escribir",
    title: "Las 8 mejores IA para escribir en 2026",
    description:
      "Comparamos las mejores herramientas de inteligencia artificial para escribir: desde redactar artículos y emails hasta corregir y mejorar tu estilo.",
    date: "2026-06-15",
    relatedCategory: "escritura",
    intro: [
      "Escribir con ayuda de la inteligencia artificial ha dejado de ser una novedad para convertirse en parte del día a día de cualquiera que cree contenido, redacte emails o trabaje con textos. La clave está en elegir la herramienta adecuada para cada tarea.",
      "Hemos seleccionado las 8 IA para escribir que mejor funcionan ahora mismo, desde asistentes generales hasta correctores especializados. Puedes abrir cualquiera de ellas directamente desde nuestro catálogo.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El asistente más versátil para escribir cualquier cosa: borradores, ideas, reescrituras y resúmenes. Su capa gratuita ya es suficiente para la mayoría de tareas del día a día.",
      },
      {
        slug: "claude",
        body: "Destaca por la calidad y naturalidad de sus textos largos. Ideal para artículos extensos, informes y cuando necesitas que el tono suene humano y cuidado.",
      },
      {
        slug: "jasper",
        body: "Pensado para marketing y equipos: plantillas para anuncios, landing pages y campañas. Una opción de pago orientada a la productividad profesional.",
      },
      {
        slug: "copy-ai",
        body: "Muy bueno para textos cortos de venta: titulares, descripciones de producto y copys publicitarios en segundos.",
      },
      {
        slug: "writesonic",
        body: "Combina redacción con SEO, lo que lo hace útil si escribes para posicionar artículos en Google.",
      },
      {
        slug: "grammarly",
        body: "El corrector de referencia en inglés: gramática, claridad y tono. Imprescindible si publicas en ese idioma.",
      },
      {
        slug: "quillbot",
        body: "Especialista en parafrasear y reescribir manteniendo el significado. Perfecto para variar un texto o mejorar su fluidez.",
      },
      {
        slug: "notion-ai",
        body: "Si ya trabajas en Notion, su IA integrada redacta, resume y organiza sin salir de tus documentos.",
      },
    ],
    outro: [
      "Nuestro consejo: empieza por una herramienta general como ChatGPT o Claude para el grueso de la escritura, y añade un corrector como Grammarly o QuillBot para pulir el resultado.",
    ],
  },
  {
    slug: "mejores-ia-para-crear-imagenes",
    title: "Las 7 mejores IA para crear imágenes en 2026",
    description:
      "Guía de las mejores herramientas de IA para generar imágenes: desde arte realista hasta diseños con texto, comparadas y listas para usar.",
    date: "2026-06-16",
    relatedCategory: "imagen",
    intro: [
      "Generar imágenes con inteligencia artificial es una de las aplicaciones más impresionantes y útiles de esta tecnología. Sirve para ilustraciones, conceptos, fondos, productos o simplemente para dar vida a una idea.",
      "Estas son las 7 IA para crear imágenes que mejor relación calidad/facilidad ofrecen hoy. Hay opciones gratuitas y de pago para todos los niveles.",
    ],
    items: [
      {
        slug: "midjourney",
        body: "El referente en calidad artística. Las imágenes que produce son espectaculares; es de pago, pero el resultado lo justifica para uso profesional.",
      },
      {
        slug: "dall-e",
        body: "Integrado en ChatGPT, es el más fácil de usar: describes lo que quieres con lenguaje natural y lo genera al momento.",
      },
      {
        slug: "stable-diffusion",
        body: "Open source y gratuito. Puedes ejecutarlo en tu propio ordenador y tienes control total sobre el resultado. La opción favorita de quien quiere personalizar todo.",
      },
      {
        slug: "flux",
        body: "Uno de los modelos abiertos más potentes y recientes, con un realismo excelente y totalmente gratuito.",
      },
      {
        slug: "leonardo-ai",
        body: "Muy popular para videojuegos y arte conceptual, con controles finos y una capa gratuita generosa.",
      },
      {
        slug: "ideogram",
        body: "El mejor cuando necesitas texto legible dentro de la imagen (carteles, logos, tipografía). Algo en lo que otros modelos fallan.",
      },
      {
        slug: "adobe-firefly",
        body: "La apuesta de Adobe, integrada en Photoshop. Entrenada con contenido con licencia, ideal para uso comercial sin sustos legales.",
      },
    ],
    outro: [
      "Si empiezas y no quieres pagar, prueba Flux o Stable Diffusion. Si buscas la máxima calidad y no te importa la suscripción, Midjourney sigue siendo el rey.",
    ],
  },
  {
    slug: "mejores-ia-gratis",
    title: "Las 8 mejores IA gratis que puedes usar ahora mismo",
    description:
      "Recopilación de las mejores herramientas de inteligencia artificial gratuitas: chat, imágenes, audio y más, sin pagar nada.",
    date: "2026-06-17",
    intro: [
      "No hace falta gastar dinero para aprovechar la inteligencia artificial. Muchas de las mejores herramientas tienen una capa gratuita más que suficiente, o son directamente de código abierto.",
      "Aquí tienes 8 IA gratis repartidas entre chat, imágenes, audio y programación. Todas accesibles desde nuestro catálogo.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El asistente de IA más conocido tiene una versión gratuita potente para conversar, escribir y resolver dudas.",
      },
      {
        slug: "deepseek",
        body: "Un modelo de chat muy capaz y gratuito, excelente para razonamiento y código sin coste.",
      },
      {
        slug: "stable-diffusion",
        body: "Generación de imágenes open source y gratis, ejecutable en tu propio equipo.",
      },
      {
        slug: "flux",
        body: "Modelo de imágenes abierto y gratuito con resultados muy realistas.",
      },
      {
        slug: "whisper",
        body: "La IA de transcripción de OpenAI, gratuita y open source. Convierte audio a texto con una precisión sobresaliente.",
      },
      {
        slug: "ollama",
        body: "Te permite ejecutar modelos de lenguaje en local, gratis y sin conexión. Ideal si te preocupa la privacidad.",
      },
      {
        slug: "canva",
        body: "Su capa gratuita incluye funciones de IA para diseñar imágenes, presentaciones y redes sociales.",
      },
      {
        slug: "github-copilot",
        body: "Gratuito para estudiantes y proyectos open source, es el asistente de programación más usado del mundo.",
      },
    ],
    outro: [
      "Con estas herramientas puedes cubrir chat, imagen, audio y código sin pagar un euro. Cuando una se te quede corta, siempre puedes dar el salto a su versión de pago.",
    ],
  },
];

const POST_BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POST_BY_SLUG.get(slug);
}

/** Posts ordenados del más reciente al más antiguo. */
export function getSortedPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

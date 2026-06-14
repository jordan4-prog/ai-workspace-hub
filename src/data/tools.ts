import type { CategoryId, Tool } from "@/types/tool";

/**
 * Catálogo de herramientas. Fuente única de verdad del contenido.
 * Para añadir una herramienta: añade una entrada aquí (slug único) y listo.
 */
export const TOOLS: readonly Tool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com",
    description:
      "Asistente conversacional de OpenAI para programación, redacción, análisis y razonamiento general.",
    categories: ["chatbots", "programacion", "escritura", "investigacion"],
    tags: ["chat", "gpt", "openai", "asistente", "llm"],
  },
  {
    slug: "claude",
    name: "Claude",
    url: "https://claude.ai",
    description:
      "Asistente avanzado de IA de Anthropic para programación, análisis de documentos largos y escritura de calidad.",
    categories: ["chatbots", "programacion", "escritura", "investigacion"],
    tags: ["chat", "anthropic", "asistente", "código", "llm"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    description:
      "Modelo multimodal de Google para texto, imagen y código, integrado con el ecosistema de Google.",
    categories: ["chatbots", "programacion", "escritura", "investigacion"],
    tags: ["chat", "google", "multimodal", "llm"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    description:
      "Motor de respuestas con IA que cita fuentes en tiempo real. Ideal para investigación y búsqueda.",
    categories: ["chatbots", "investigacion", "escritura"],
    tags: ["búsqueda", "research", "fuentes", "respuestas"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    url: "https://cursor.com",
    description:
      "Editor de código con IA integrada para autocompletado, refactor y chat sobre tu base de código.",
    categories: ["programacion"],
    tags: ["ide", "editor", "código", "copilot"],
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    url: "https://windsurf.com",
    description:
      "IDE agéntico que automatiza tareas de desarrollo de varios pasos sobre tu repositorio.",
    categories: ["programacion"],
    tags: ["ide", "agente", "código"],
  },
  {
    slug: "replit",
    name: "Replit",
    url: "https://replit.com",
    description:
      "Entorno de desarrollo en el navegador con un agente de IA que crea y despliega apps.",
    categories: ["programacion", "creacion-web"],
    tags: ["ide", "cloud", "deploy", "agente"],
  },
  {
    slug: "bolt",
    name: "Bolt",
    url: "https://bolt.new",
    description:
      "Genera y ejecuta aplicaciones full-stack desde un prompt, directamente en el navegador.",
    categories: ["programacion", "creacion-web"],
    tags: ["full-stack", "web", "generador", "prompt"],
  },
  {
    slug: "lovable",
    name: "Lovable",
    url: "https://lovable.dev",
    description:
      "Crea aplicaciones web completas describiéndolas en lenguaje natural, con backend incluido.",
    categories: ["programacion", "creacion-web"],
    tags: ["web", "no-code", "generador", "prompt"],
  },
  {
    slug: "v0",
    name: "v0",
    url: "https://v0.app",
    description:
      "Herramienta de Vercel que genera interfaces y componentes React/Tailwind a partir de texto o imagen.",
    categories: ["programacion", "creacion-web"],
    tags: ["ui", "react", "vercel", "componentes"],
  },
  {
    slug: "devin",
    name: "Devin",
    url: "https://devin.ai",
    description:
      "Ingeniero de software autónomo capaz de planificar y ejecutar tareas de desarrollo completas.",
    categories: ["programacion"],
    tags: ["agente", "autónomo", "código"],
  },
  {
    slug: "jasper",
    name: "Jasper",
    url: "https://www.jasper.ai",
    description:
      "Plataforma de redacción con IA orientada a marketing, campañas y contenido de marca.",
    categories: ["escritura", "marketing"],
    tags: ["copywriting", "marketing", "contenido"],
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    url: "https://www.copy.ai",
    description:
      "Generador de copys y flujos de trabajo de marketing y ventas impulsados por IA.",
    categories: ["escritura", "marketing"],
    tags: ["copywriting", "ventas", "marketing"],
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    url: "https://writesonic.com",
    description:
      "Suite de redacción SEO y contenido de marketing con IA para blogs, anuncios y artículos.",
    categories: ["escritura", "marketing"],
    tags: ["seo", "blog", "contenido"],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    url: "https://www.midjourney.com",
    description:
      "Generador de imágenes de IA reconocido por su calidad estética y control artístico.",
    categories: ["imagen"],
    tags: ["imágenes", "arte", "generador"],
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo AI",
    url: "https://leonardo.ai",
    description:
      "Plataforma de generación de imágenes con modelos entrenables y herramientas para producción.",
    categories: ["imagen"],
    tags: ["imágenes", "assets", "juegos"],
  },
  {
    slug: "flux",
    name: "Flux",
    url: "https://blackforestlabs.ai",
    description:
      "Modelos de generación de imágenes de Black Forest Labs con fuerte fidelidad y coherencia.",
    categories: ["imagen"],
    tags: ["imágenes", "open", "generador"],
  },
  {
    slug: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai",
    description:
      "Generador de imágenes destacado por renderizar texto legible dentro de las composiciones.",
    categories: ["imagen"],
    tags: ["imágenes", "tipografía", "logos"],
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    url: "https://stability.ai",
    description:
      "Modelos abiertos de difusión de Stability AI para generar imágenes con control total.",
    categories: ["imagen"],
    tags: ["imágenes", "open-source", "difusión"],
  },
  {
    slug: "dall-e",
    name: "DALL·E",
    url: "https://openai.com/dall-e-3",
    description:
      "Generador de imágenes de OpenAI integrado en ChatGPT, con buena comprensión de prompts.",
    categories: ["imagen"],
    tags: ["imágenes", "openai", "generador"],
  },
  {
    slug: "runway",
    name: "Runway",
    url: "https://runwayml.com",
    description:
      "Suite de generación y edición de video con IA para creadores y producción audiovisual.",
    categories: ["video"],
    tags: ["video", "edición", "vfx"],
  },
  {
    slug: "kling",
    name: "Kling",
    url: "https://klingai.com",
    description:
      "Modelo de generación de video de alta fidelidad con movimientos realistas y largos.",
    categories: ["video"],
    tags: ["video", "generador", "realista"],
  },
  {
    slug: "veo",
    name: "Veo",
    url: "https://deepmind.google/models/veo",
    description:
      "Modelo de generación de video de Google DeepMind con alta calidad y control cinematográfico.",
    categories: ["video"],
    tags: ["video", "google", "deepmind"],
  },
  {
    slug: "pika",
    name: "Pika",
    url: "https://pika.art",
    description:
      "Plataforma para crear y editar videos cortos con IA mediante prompts y efectos.",
    categories: ["video"],
    tags: ["video", "efectos", "social"],
  },
  {
    slug: "luma-ai",
    name: "Luma AI",
    url: "https://lumalabs.ai",
    description:
      "Generación de video y captura 3D con el modelo Dream Machine de Luma Labs.",
    categories: ["video"],
    tags: ["video", "3d", "dream-machine"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    description:
      "Síntesis de voz y clonación realista en múltiples idiomas para narración y doblaje.",
    categories: ["audio"],
    tags: ["voz", "tts", "doblaje"],
  },
  {
    slug: "suno",
    name: "Suno",
    url: "https://suno.com",
    description:
      "Genera canciones completas con voz e instrumentación a partir de una descripción.",
    categories: ["audio", "musica"],
    tags: ["música", "canciones", "generador"],
  },
  {
    slug: "udio",
    name: "Udio",
    url: "https://www.udio.com",
    description:
      "Creación de música con IA de alta calidad de audio a partir de prompts de texto.",
    categories: ["audio", "musica"],
    tags: ["música", "audio", "generador"],
  },
  {
    slug: "murf",
    name: "Murf",
    url: "https://murf.ai",
    description:
      "Generador de voces en off profesionales con IA para presentaciones, videos y podcasts.",
    categories: ["audio"],
    tags: ["voz", "voiceover", "tts"],
  },
  {
    slug: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    description:
      "Plataforma de diseño con herramientas de IA (Magic Studio) para todo tipo de gráficos.",
    categories: ["diseno"],
    tags: ["diseño", "plantillas", "gráficos"],
  },
  {
    slug: "figma",
    name: "Figma",
    url: "https://www.figma.com",
    description:
      "Herramienta colaborativa de diseño de interfaces con funciones de IA integradas.",
    categories: ["diseno"],
    tags: ["ui", "ux", "diseño", "colaboración"],
  },
  {
    slug: "framer",
    name: "Framer",
    url: "https://www.framer.com",
    description:
      "Diseña y publica sitios web con IA, sin código, partiendo de un lienzo de diseño.",
    categories: ["diseno", "creacion-web"],
    tags: ["web", "no-code", "diseño", "publicar"],
  },
  {
    slug: "webflow",
    name: "Webflow",
    url: "https://webflow.com",
    description:
      "Constructor visual de sitios web profesionales con CMS y hosting, ahora con IA.",
    categories: ["creacion-web"],
    tags: ["web", "cms", "no-code"],
  },
  {
    slug: "adcreative",
    name: "AdCreative",
    url: "https://www.adcreative.ai",
    description:
      "Genera creatividades publicitarias y banners optimizados para conversión con IA.",
    categories: ["marketing"],
    tags: ["ads", "publicidad", "creatividades"],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    url: "https://www.notion.com/product/ai",
    description:
      "IA integrada en Notion para escribir, resumir y buscar en todo tu espacio de trabajo.",
    categories: ["productividad"],
    tags: ["notas", "wiki", "productividad"],
  },
  {
    slug: "clickup-ai",
    name: "ClickUp AI",
    url: "https://clickup.com/ai",
    description:
      "Asistente de IA dentro de ClickUp para gestionar tareas, proyectos y documentos.",
    categories: ["productividad"],
    tags: ["tareas", "proyectos", "gestión"],
  },
  {
    slug: "motion",
    name: "Motion",
    url: "https://www.usemotion.com",
    description:
      "Calendario y gestor de tareas que usa IA para planificar tu día automáticamente.",
    categories: ["productividad"],
    tags: ["calendario", "planificación", "tareas"],
  },
  {
    slug: "mem-ai",
    name: "Mem AI",
    url: "https://get.mem.ai",
    description:
      "App de notas autoorganizadas con IA que conecta y recupera tu conocimiento.",
    categories: ["productividad"],
    tags: ["notas", "conocimiento", "memoria"],
  },

  // === Chatbots y modelos de lenguaje ===
  {
    slug: "groq",
    name: "Groq",
    url: "https://groq.com",
    description:
      "Plataforma de inferencia ultrarrápida para ejecutar modelos de lenguaje con baja latencia.",
    categories: ["chatbots", "programacion"],
    tags: ["inferencia", "lpu", "rápido", "api"],
  },
  {
    slug: "grok",
    name: "Grok",
    url: "https://grok.com",
    description:
      "Chatbot de xAI con acceso en tiempo real a X, para conversación y razonamiento.",
    categories: ["chatbots"],
    tags: ["xai", "chat", "x", "asistente"],
  },
  {
    slug: "deepseek",
    name: "DeepSeek",
    url: "https://chat.deepseek.com",
    description:
      "Modelos de lenguaje abiertos y potentes, especialmente fuertes en razonamiento y programación.",
    categories: ["chatbots", "programacion"],
    tags: ["llm", "open", "razonamiento", "código"],
  },
  {
    slug: "microsoft-copilot",
    name: "Microsoft Copilot",
    url: "https://copilot.microsoft.com",
    description:
      "Asistente de IA de Microsoft integrado en Windows, Edge y Microsoft 365.",
    categories: ["chatbots", "productividad"],
    tags: ["microsoft", "asistente", "office", "chat"],
  },
  {
    slug: "llama",
    name: "Meta Llama",
    url: "https://www.llama.com",
    description:
      "Familia de modelos de lenguaje abiertos de Meta para construir aplicaciones de IA.",
    categories: ["chatbots", "programacion"],
    tags: ["meta", "open-source", "modelo", "llm"],
  },
  {
    slug: "mistral-ai",
    name: "Mistral AI",
    url: "https://mistral.ai",
    description:
      "Modelos abiertos europeos (incluido Mixtral) y el asistente conversacional Le Chat.",
    categories: ["chatbots", "programacion"],
    tags: ["open", "mixtral", "le-chat", "europa"],
  },
  {
    slug: "ollama",
    name: "Ollama",
    url: "https://ollama.com",
    description:
      "Ejecuta modelos de lenguaje de forma local en tu propio equipo con un solo comando.",
    categories: ["chatbots", "programacion"],
    tags: ["local", "open-source", "modelos", "privacidad"],
  },
  {
    slug: "hugging-face",
    name: "Hugging Face",
    url: "https://huggingface.co",
    description:
      "Hub de modelos y datasets de IA open-source, con el chatbot gratuito HuggingChat.",
    categories: ["chatbots", "programacion"],
    tags: ["modelos", "open-source", "datasets", "huggingchat"],
  },
  {
    slug: "together-ai",
    name: "Together AI",
    url: "https://www.together.ai",
    description:
      "Plataforma para ejecutar y afinar modelos abiertos a escala mediante API.",
    categories: ["chatbots", "programacion", "cloud"],
    tags: ["inferencia", "open-models", "api"],
  },
  {
    slug: "replicate",
    name: "Replicate",
    url: "https://replicate.com",
    description:
      "Ejecuta y despliega miles de modelos de IA (texto, imagen, audio) mediante una API.",
    categories: ["chatbots", "programacion", "imagen"],
    tags: ["api", "modelos", "deploy"],
  },
  {
    slug: "cohere",
    name: "Cohere",
    url: "https://cohere.com",
    description:
      "LLMs orientados a empresa, con foco en RAG, búsqueda semántica y embeddings.",
    categories: ["chatbots", "programacion", "negocios"],
    tags: ["empresa", "rag", "embeddings", "llm"],
  },
  {
    slug: "ai21-labs",
    name: "AI21 Labs",
    url: "https://www.ai21.com",
    description:
      "Modelos de lenguaje (familia Jamba) y herramientas de IA para tareas de texto.",
    categories: ["chatbots", "escritura"],
    tags: ["jamba", "modelo", "empresa"],
  },
  {
    slug: "phind",
    name: "Phind",
    url: "https://www.phind.com",
    description:
      "Buscador con IA orientado a desarrolladores, con respuestas técnicas y fuentes citadas.",
    categories: ["chatbots", "programacion", "investigacion"],
    tags: ["búsqueda", "devs", "código"],
  },
  {
    slug: "manus",
    name: "Manus",
    url: "https://manus.im",
    description:
      "Agente de IA general capaz de ejecutar tareas complejas de varios pasos de forma autónoma.",
    categories: ["chatbots", "automatizacion"],
    tags: ["agente", "autónomo", "tareas"],
  },

  // === Programación y desarrollo ===
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    description:
      "Asistente de programación de GitHub que sugiere y completa código en tu editor.",
    categories: ["programacion"],
    tags: ["autocompletado", "github", "código", "ide"],
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    url: "https://www.anthropic.com/claude-code",
    description:
      "Herramienta de codificación agéntica de Anthropic que trabaja en tu terminal y editor.",
    categories: ["programacion"],
    tags: ["anthropic", "cli", "agente", "terminal"],
  },
  {
    slug: "tabnine",
    name: "Tabnine",
    url: "https://www.tabnine.com",
    description:
      "Asistente de código con IA centrado en la privacidad, desplegable de forma privada.",
    categories: ["programacion"],
    tags: ["autocompletado", "privado", "ide"],
  },
  {
    slug: "amazon-q-developer",
    name: "Amazon Q Developer",
    url: "https://aws.amazon.com/q/developer",
    description:
      "Asistente de IA de AWS (antes CodeWhisperer) para escribir, depurar y modernizar código.",
    categories: ["programacion", "cloud"],
    tags: ["aws", "código", "asistente"],
  },
  {
    slug: "coderabbit",
    name: "CodeRabbit",
    url: "https://www.coderabbit.ai",
    description:
      "Revisión de código con IA que comenta tus pull requests de forma automática.",
    categories: ["programacion"],
    tags: ["code-review", "pull-request", "calidad"],
  },
  {
    slug: "snyk",
    name: "Snyk",
    url: "https://snyk.io",
    description:
      "Plataforma de seguridad para desarrolladores que detecta y corrige vulnerabilidades con IA.",
    categories: ["programacion", "seguridad"],
    tags: ["seguridad", "vulnerabilidades", "devsecops"],
  },
  {
    slug: "pieces",
    name: "Pieces for Developers",
    url: "https://pieces.app",
    description:
      "Asistente con memoria de contexto para guardar, enriquecer y reutilizar fragmentos de código.",
    categories: ["programacion"],
    tags: ["snippets", "contexto", "copiloto"],
  },
  {
    slug: "flutterflow",
    name: "FlutterFlow",
    url: "https://flutterflow.io",
    description:
      "Constructor visual con IA para crear aplicaciones móviles y web sobre Flutter.",
    categories: ["programacion", "creacion-web"],
    tags: ["no-code", "apps", "flutter"],
  },
  {
    slug: "retool",
    name: "Retool",
    url: "https://retool.com",
    description:
      "Plataforma low-code con IA para construir herramientas y paneles internos rápidamente.",
    categories: ["programacion"],
    tags: ["internas", "low-code", "ia"],
  },
  {
    slug: "bubble",
    name: "Bubble",
    url: "https://bubble.io",
    description:
      "Plataforma no-code con IA para crear aplicaciones web completas sin programar.",
    categories: ["creacion-web", "programacion"],
    tags: ["no-code", "apps", "web"],
  },

  // === Escritura y contenido ===
  {
    slug: "rytr",
    name: "Rytr",
    url: "https://rytr.me",
    description:
      "Asistente de escritura con IA asequible para generar copys y contenido rápidamente.",
    categories: ["escritura", "marketing"],
    tags: ["copywriting", "asequible", "contenido"],
  },
  {
    slug: "article-forge",
    name: "Article Forge",
    url: "https://www.articleforge.com",
    description:
      "Genera artículos largos optimizados para SEO de forma automática.",
    categories: ["escritura", "marketing"],
    tags: ["seo", "artículos", "blog"],
  },
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    url: "https://surferseo.com",
    description:
      "Optimiza contenido para SEO con análisis y recomendaciones guiadas por IA.",
    categories: ["escritura", "marketing"],
    tags: ["seo", "optimización", "contenido"],
  },
  {
    slug: "outranking",
    name: "Outranking",
    url: "https://www.outranking.io",
    description:
      "Plataforma de contenido SEO con IA para planificar, escribir y posicionar artículos.",
    categories: ["escritura", "marketing"],
    tags: ["seo", "contenido", "serp"],
  },
  {
    slug: "anyword",
    name: "Anyword",
    url: "https://anyword.com",
    description:
      "Generador de copy con IA que predice el rendimiento del texto antes de publicarlo.",
    categories: ["escritura", "marketing"],
    tags: ["copy", "rendimiento", "predicción"],
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    url: "https://www.grammarly.com",
    description:
      "Asistente de escritura con IA para corregir gramática, estilo, tono y claridad.",
    categories: ["escritura"],
    tags: ["gramática", "estilo", "asistente", "inglés"],
  },
  {
    slug: "quillbot",
    name: "QuillBot",
    url: "https://quillbot.com",
    description:
      "Herramienta de parafraseo, resumen y corrección de texto impulsada por IA.",
    categories: ["escritura"],
    tags: ["parafraseo", "resumen", "gramática"],
  },
  {
    slug: "wordtune",
    name: "Wordtune",
    url: "https://www.wordtune.com",
    description:
      "Reescribe y mejora frases con IA para ganar claridad y ajustar el tono.",
    categories: ["escritura"],
    tags: ["reescritura", "tono", "claridad"],
  },
  {
    slug: "prowritingaid",
    name: "ProWritingAid",
    url: "https://prowritingaid.com",
    description:
      "Editor con IA que analiza estilo, gramática y legibilidad de textos largos.",
    categories: ["escritura"],
    tags: ["estilo", "gramática", "edición"],
  },
  {
    slug: "languagetool",
    name: "LanguageTool",
    url: "https://languagetool.org",
    description:
      "Corrector gramatical y de estilo multilingüe con asistencia de IA.",
    categories: ["escritura"],
    tags: ["gramática", "multidioma", "corrector"],
  },
  {
    slug: "ink-editor",
    name: "INK Editor",
    url: "https://inkforall.com",
    description:
      "Editor de contenido con IA centrado en SEO y rendimiento del texto.",
    categories: ["escritura", "marketing"],
    tags: ["seo", "contenido", "optimización"],
  },

  // === Generación e edición de imágenes ===
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    url: "https://www.adobe.com/products/firefly.html",
    description:
      "Modelos generativos de Adobe para crear y editar imágenes con uso comercial seguro.",
    categories: ["imagen", "diseno"],
    tags: ["generativo", "adobe", "comercial"],
  },
  {
    slug: "microsoft-designer",
    name: "Microsoft Designer",
    url: "https://designer.microsoft.com",
    description:
      "Herramienta de diseño con IA de Microsoft para crear imágenes y gráficos al instante.",
    categories: ["imagen", "diseno"],
    tags: ["microsoft", "gráficos", "generativo"],
  },
  {
    slug: "clipdrop",
    name: "Clipdrop",
    url: "https://clipdrop.co",
    description:
      "Suite de edición de imagen con IA: quitar fondos, mejorar, reimaginar y generar.",
    categories: ["imagen"],
    tags: ["edición", "fondo", "generativo"],
  },
  {
    slug: "remove-bg",
    name: "Remove.bg",
    url: "https://www.remove.bg",
    description:
      "Elimina el fondo de cualquier imagen automáticamente con IA en segundos.",
    categories: ["imagen"],
    tags: ["fondo", "recorte", "automático"],
  },
  {
    slug: "photoroom",
    name: "Photoroom",
    url: "https://www.photoroom.com",
    description:
      "Editor de fotos con IA para crear imágenes de producto y quitar o cambiar fondos.",
    categories: ["imagen", "diseno"],
    tags: ["fondo", "producto", "ecommerce"],
  },
  {
    slug: "photoleap",
    name: "Photoleap",
    url: "https://www.photoleapapp.com",
    description:
      "App de edición creativa de fotos con herramientas generativas de IA.",
    categories: ["imagen"],
    tags: ["edición", "móvil", "generativo"],
  },
  {
    slug: "upscayl",
    name: "Upscayl",
    url: "https://upscayl.org",
    description:
      "Escalador de imágenes open-source que aumenta la resolución con IA.",
    categories: ["imagen", "fotografia"],
    tags: ["upscaling", "open-source", "resolución"],
  },
  {
    slug: "lets-enhance",
    name: "Let's Enhance",
    url: "https://letsenhance.io",
    description:
      "Mejora y amplía imágenes con IA sin perder calidad.",
    categories: ["imagen", "fotografia"],
    tags: ["upscaling", "calidad", "resolución"],
  },

  // === Video ===
  {
    slug: "sora",
    name: "Sora",
    url: "https://openai.com/sora",
    description:
      "Modelo de OpenAI para generar video realista a partir de descripciones de texto.",
    categories: ["video"],
    tags: ["openai", "texto-a-video", "generativo"],
  },
  {
    slug: "heygen",
    name: "HeyGen",
    url: "https://www.heygen.com",
    description:
      "Crea videos con avatares de IA y doblaje en múltiples idiomas.",
    categories: ["video"],
    tags: ["avatares", "doblaje", "presentador"],
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    url: "https://www.synthesia.io",
    description:
      "Plataforma para crear videos con presentadores de IA a partir de texto.",
    categories: ["video"],
    tags: ["avatares", "formación", "corporativo"],
  },
  {
    slug: "d-id",
    name: "D-ID",
    url: "https://www.d-id.com",
    description:
      "Genera videos de rostros parlantes y avatares interactivos con IA.",
    categories: ["video"],
    tags: ["avatares", "rostros", "hablante"],
  },
  {
    slug: "descript",
    name: "Descript",
    url: "https://www.descript.com",
    description:
      "Edita video y audio editando el texto de la transcripción, con herramientas de IA.",
    categories: ["video", "audio"],
    tags: ["edición", "transcripción", "podcast"],
  },
  {
    slug: "opus-clip",
    name: "Opus Clip",
    url: "https://www.opus.pro",
    description:
      "Convierte videos largos en clips cortos virales automáticamente con IA.",
    categories: ["video", "redes-sociales"],
    tags: ["clips", "virales", "shorts"],
  },
  {
    slug: "pictory",
    name: "Pictory",
    url: "https://pictory.ai",
    description:
      "Crea videos a partir de texto, artículos o guiones de forma automática.",
    categories: ["video"],
    tags: ["texto-a-video", "resúmenes", "blog"],
  },
  {
    slug: "submagic",
    name: "Submagic",
    url: "https://www.submagic.co",
    description:
      "Añade subtítulos, efectos y cortes dinámicos a videos cortos con IA.",
    categories: ["video", "redes-sociales"],
    tags: ["subtítulos", "shorts", "edición"],
  },
  {
    slug: "captions",
    name: "Captions",
    url: "https://www.captions.ai",
    description:
      "App de creación de video con IA: subtítulos, doblaje y avatares.",
    categories: ["video", "redes-sociales"],
    tags: ["subtítulos", "avatares", "edición"],
  },
  {
    slug: "capcut",
    name: "CapCut",
    url: "https://www.capcut.com",
    description:
      "Editor de video con funciones de IA para redes sociales y formato corto.",
    categories: ["video"],
    tags: ["edición", "tiktok", "móvil"],
  },
  {
    slug: "ltx-studio",
    name: "LTX Studio",
    url: "https://ltx.studio",
    description:
      "Estudio de producción de video con IA para storyboards y escenas generadas.",
    categories: ["video"],
    tags: ["storyboard", "generativo", "producción"],
  },
  {
    slug: "mootion",
    name: "Mootion",
    url: "https://mootion.com",
    description:
      "Genera animaciones y videos a partir de texto con IA.",
    categories: ["video"],
    tags: ["animación", "generativo", "3d"],
  },
  {
    slug: "filmora",
    name: "Filmora",
    url: "https://filmora.wondershare.com",
    description:
      "Editor de video de Wondershare con funciones creativas asistidas por IA.",
    categories: ["video"],
    tags: ["edición", "wondershare", "ia"],
  },

  // === Audio y voz ===
  {
    slug: "whisper",
    name: "Whisper",
    url: "https://openai.com/research/whisper",
    description:
      "Modelo de reconocimiento de voz de OpenAI para transcribir audio en muchos idiomas.",
    categories: ["audio"],
    tags: ["transcripción", "openai", "asr", "open-source"],
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    url: "https://otter.ai",
    description:
      "Transcribe y resume reuniones en tiempo real con IA.",
    categories: ["audio", "productividad"],
    tags: ["transcripción", "reuniones", "notas"],
  },
  {
    slug: "fireflies",
    name: "Fireflies.ai",
    url: "https://fireflies.ai",
    description:
      "Asistente que graba, transcribe y analiza tus reuniones automáticamente.",
    categories: ["audio", "productividad"],
    tags: ["reuniones", "transcripción", "crm"],
  },
  {
    slug: "notta",
    name: "Notta",
    url: "https://www.notta.ai",
    description:
      "Transcripción de voz a texto en tiempo real y resúmenes con IA.",
    categories: ["audio"],
    tags: ["transcripción", "multidioma", "notas"],
  },
  {
    slug: "deepgram",
    name: "Deepgram",
    url: "https://deepgram.com",
    description:
      "API de reconocimiento de voz de alta precisión para desarrolladores.",
    categories: ["audio", "programacion"],
    tags: ["asr", "api", "voz"],
  },
  {
    slug: "assemblyai",
    name: "AssemblyAI",
    url: "https://www.assemblyai.com",
    description:
      "Modelos de IA de voz por API para transcripción y comprensión de audio.",
    categories: ["audio", "programacion"],
    tags: ["asr", "api", "modelos"],
  },
  {
    slug: "speechify",
    name: "Speechify",
    url: "https://speechify.com",
    description:
      "Convierte texto en voz natural para escuchar documentos y artículos.",
    categories: ["audio"],
    tags: ["tts", "lectura", "voces"],
  },
  {
    slug: "lovo",
    name: "LOVO",
    url: "https://lovo.ai",
    description:
      "Generador de voces de IA (Genny) para narración y voz en off.",
    categories: ["audio"],
    tags: ["tts", "voces", "doblaje"],
  },
  {
    slug: "naturalreader",
    name: "NaturalReader",
    url: "https://www.naturalreaders.com",
    description:
      "Lector de texto a voz con voces de IA naturales.",
    categories: ["audio"],
    tags: ["tts", "lectura", "voces"],
  },
  {
    slug: "fish-audio",
    name: "Fish Audio",
    url: "https://fish.audio",
    description:
      "Plataforma de texto a voz y clonación de voz con modelos abiertos.",
    categories: ["audio"],
    tags: ["tts", "clonación", "open"],
  },
  {
    slug: "amazon-polly",
    name: "Amazon Polly",
    url: "https://aws.amazon.com/polly",
    description:
      "Servicio de texto a voz de AWS con voces neuronales realistas.",
    categories: ["audio", "cloud"],
    tags: ["tts", "aws", "voces"],
  },
  {
    slug: "happyscribe",
    name: "Happy Scribe",
    url: "https://www.happyscribe.com",
    description:
      "Transcripción y subtitulado automático con IA en más de 60 idiomas.",
    categories: ["audio"],
    tags: ["transcripción", "subtítulos", "idiomas"],
  },
  {
    slug: "trint",
    name: "Trint",
    url: "https://trint.com",
    description:
      "Plataforma de transcripción con IA para editar y colaborar sobre el texto.",
    categories: ["audio"],
    tags: ["transcripción", "edición", "periodismo"],
  },
  {
    slug: "rev",
    name: "Rev",
    url: "https://www.rev.com",
    description:
      "Transcripción y subtítulos con IA de alta precisión.",
    categories: ["audio"],
    tags: ["transcripción", "subtítulos", "voz"],
  },

  // === Música ===
  {
    slug: "aiva",
    name: "AIVA",
    url: "https://www.aiva.ai",
    description:
      "IA compositora que crea música original y bandas sonoras por estilo.",
    categories: ["musica"],
    tags: ["composición", "bandas-sonoras", "generativo"],
  },
  {
    slug: "soundraw",
    name: "Soundraw",
    url: "https://soundraw.io",
    description:
      "Generador de música libre de derechos, personalizable con IA.",
    categories: ["musica"],
    tags: ["royalty-free", "generador", "creadores"],
  },
  {
    slug: "splice",
    name: "Splice",
    url: "https://splice.com",
    description:
      "Biblioteca de samples con búsqueda y herramientas de IA para producción musical.",
    categories: ["musica"],
    tags: ["samples", "producción", "búsqueda"],
  },

  // === Fotografía ===
  {
    slug: "adobe-lightroom",
    name: "Adobe Lightroom",
    url: "https://www.adobe.com/products/photoshop-lightroom.html",
    description:
      "Editor de fotografía de Adobe con enmascarado, eliminación de ruido y ajustes por IA.",
    categories: ["fotografia"],
    tags: ["revelado", "adobe", "enmascarado-ia"],
  },
  {
    slug: "luminar-neo",
    name: "Luminar Neo",
    url: "https://skylum.com/luminar",
    description:
      "Editor de fotos de Skylum con herramientas creativas potenciadas por IA.",
    categories: ["fotografia"],
    tags: ["skylum", "edición", "ia"],
  },
  {
    slug: "topaz-photo-ai",
    name: "Topaz Photo AI",
    url: "https://www.topazlabs.com",
    description:
      "Mejora fotos con IA: nitidez, reducción de ruido y aumento de resolución.",
    categories: ["fotografia", "imagen"],
    tags: ["nitidez", "ruido", "upscaling"],
  },
  {
    slug: "pixelmator-pro",
    name: "Pixelmator Pro",
    url: "https://www.pixelmator.com/pro",
    description:
      "Editor de imagen para Mac con funciones de mejora y selección por IA.",
    categories: ["fotografia"],
    tags: ["edición", "mac", "ia"],
  },

  // === Diseño ===
  {
    slug: "gamma",
    name: "Gamma",
    url: "https://gamma.app",
    description:
      "Crea presentaciones, documentos y webs con IA a partir de un prompt.",
    categories: ["diseno", "productividad"],
    tags: ["presentaciones", "generativo", "slides"],
  },
  {
    slug: "beautiful-ai",
    name: "Beautiful.ai",
    url: "https://www.beautiful.ai",
    description:
      "Presentaciones que se autodiseñan con IA mientras añades contenido.",
    categories: ["diseno"],
    tags: ["presentaciones", "plantillas", "automático"],
  },
  {
    slug: "looka",
    name: "Looka",
    url: "https://looka.com",
    description:
      "Generador de logotipos e identidad de marca con IA.",
    categories: ["diseno"],
    tags: ["logos", "marca", "identidad"],
  },
  {
    slug: "brandmark",
    name: "Brandmark",
    url: "https://brandmark.io",
    description:
      "Creador de logotipos y kits de marca con IA.",
    categories: ["diseno"],
    tags: ["logos", "marca", "generativo"],
  },
  {
    slug: "adobe-express",
    name: "Adobe Express",
    url: "https://www.adobe.com/express",
    description:
      "Herramienta de diseño rápida de Adobe con funciones generativas de IA.",
    categories: ["diseno"],
    tags: ["adobe", "gráficos", "plantillas"],
  },
  {
    slug: "visme",
    name: "Visme",
    url: "https://www.visme.co",
    description:
      "Plataforma de diseño de contenido visual e infografías con asistencia de IA.",
    categories: ["diseno"],
    tags: ["infografías", "presentaciones", "ia"],
  },
  {
    slug: "khroma",
    name: "Khroma",
    url: "https://www.khroma.co",
    description:
      "Herramienta de IA que aprende tus gustos y genera paletas de color.",
    categories: ["diseno"],
    tags: ["color", "paletas", "generativo"],
  },

  // === Creación de webs y landings ===
  {
    slug: "wix-adi",
    name: "Wix ADI",
    url: "https://www.wix.com",
    description:
      "Constructor de sitios de Wix que diseña webs automáticamente con IA.",
    categories: ["creacion-web"],
    tags: ["web", "constructor", "ia"],
  },
  {
    slug: "unbounce",
    name: "Unbounce",
    url: "https://unbounce.com",
    description:
      "Creador de landing pages con IA para optimizar la conversión (Smart Traffic).",
    categories: ["creacion-web", "marketing"],
    tags: ["landing", "conversión", "smart-traffic"],
  },
  {
    slug: "instapage",
    name: "Instapage",
    url: "https://instapage.com",
    description:
      "Plataforma de landing pages con IA para campañas y experimentos.",
    categories: ["creacion-web", "marketing"],
    tags: ["landing", "ads", "conversión"],
  },

  // === Redes sociales ===
  {
    slug: "buffer",
    name: "Buffer",
    url: "https://buffer.com",
    description:
      "Gestor de redes sociales con asistente de IA para crear y programar publicaciones.",
    categories: ["redes-sociales", "marketing"],
    tags: ["programación", "publicaciones", "ia"],
  },
  {
    slug: "taplio",
    name: "Taplio",
    url: "https://taplio.com",
    description:
      "Herramienta con IA para crear contenido y crecer en LinkedIn.",
    categories: ["redes-sociales"],
    tags: ["linkedin", "contenido", "crecimiento"],
  },
  {
    slug: "metricool",
    name: "Metricool",
    url: "https://metricool.com",
    description:
      "Planifica, analiza y gestiona redes sociales con ayuda de IA.",
    categories: ["redes-sociales", "marketing", "analitica"],
    tags: ["analítica", "programación", "redes"],
  },
  {
    slug: "flick",
    name: "Flick",
    url: "https://www.flick.social",
    description:
      "Asistente de IA para crear contenido social, hashtags e ideas.",
    categories: ["redes-sociales"],
    tags: ["hashtags", "contenido", "ia"],
  },
  {
    slug: "typefully",
    name: "Typefully",
    url: "https://typefully.com",
    description:
      "Editor para escribir y programar hilos y publicaciones con ayuda de IA.",
    categories: ["redes-sociales"],
    tags: ["twitter", "threads", "redacción"],
  },
  {
    slug: "later",
    name: "Later",
    url: "https://later.com",
    description:
      "Planificador visual de redes sociales con generación de captions por IA.",
    categories: ["redes-sociales", "marketing"],
    tags: ["programación", "captions-ia", "visual"],
  },

  // === Marketing y SEO ===
  {
    slug: "hubspot",
    name: "HubSpot",
    url: "https://www.hubspot.com",
    description:
      "Plataforma de CRM y marketing con la suite de IA Breeze integrada.",
    categories: ["marketing", "negocios"],
    tags: ["crm", "breeze", "automatización"],
  },
  {
    slug: "semrush",
    name: "Semrush",
    url: "https://www.semrush.com",
    description:
      "Suite de marketing y SEO con herramientas de IA para contenido y posicionamiento.",
    categories: ["marketing"],
    tags: ["seo", "keywords", "competencia"],
  },

  // === Email ===
  {
    slug: "superhuman",
    name: "Superhuman",
    url: "https://superhuman.com",
    description:
      "Cliente de correo veloz con IA para redactar, resumir y priorizar emails.",
    categories: ["email", "productividad"],
    tags: ["correo", "rápido", "ia"],
  },
  {
    slug: "mixmax",
    name: "Mixmax",
    url: "https://www.mixmax.com",
    description:
      "Automatización de email de ventas con IA sobre Gmail.",
    categories: ["email", "marketing"],
    tags: ["ventas", "secuencias", "gmail"],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    url: "https://mailchimp.com",
    description:
      "Plataforma de email marketing con herramientas de IA para contenido y segmentación.",
    categories: ["email", "marketing"],
    tags: ["newsletter", "automatización", "ia"],
  },
  {
    slug: "klaviyo",
    name: "Klaviyo",
    url: "https://www.klaviyo.com",
    description:
      "Marketing por email y SMS para ecommerce con personalización por IA.",
    categories: ["email", "marketing"],
    tags: ["ecommerce", "automatización", "datos"],
  },
  {
    slug: "braze",
    name: "Braze",
    url: "https://www.braze.com",
    description:
      "Plataforma de engagement multicanal con IA (Sage AI) para campañas.",
    categories: ["email", "marketing"],
    tags: ["engagement", "multicanal", "sage-ai"],
  },
  {
    slug: "iterable",
    name: "Iterable",
    url: "https://iterable.com",
    description:
      "Plataforma de marketing multicanal con personalización impulsada por IA.",
    categories: ["email", "marketing"],
    tags: ["multicanal", "personalización", "ia"],
  },

  // === Atención al cliente / mensajería ===
  {
    slug: "intercom",
    name: "Intercom",
    url: "https://www.intercom.com",
    description:
      "Atención al cliente con el agente de IA Fin para resolver consultas al instante.",
    categories: ["mensajeria", "marketing"],
    tags: ["soporte", "fin-ai", "chat"],
  },
  {
    slug: "drift",
    name: "Drift",
    url: "https://www.drift.com",
    description:
      "Plataforma de marketing conversacional con chatbots de IA para ventas.",
    categories: ["mensajeria", "marketing"],
    tags: ["chat", "ventas", "conversacional"],
  },
  {
    slug: "freshchat",
    name: "Freshchat",
    url: "https://www.freshworks.com/live-chat-software",
    description:
      "Software de chat de Freshworks con el asistente de IA Freddy.",
    categories: ["mensajeria"],
    tags: ["soporte", "freddy-ai", "chat"],
  },
  {
    slug: "crisp",
    name: "Crisp",
    url: "https://crisp.chat",
    description:
      "Plataforma de mensajería y soporte con chatbot y respuestas asistidas por IA.",
    categories: ["mensajeria"],
    tags: ["soporte", "chat", "ia"],
  },
  {
    slug: "zendesk",
    name: "Zendesk",
    url: "https://www.zendesk.com",
    description:
      "Suite de atención al cliente con agentes y automatizaciones de IA.",
    categories: ["mensajeria"],
    tags: ["soporte", "tickets", "ia"],
  },

  // === Seguridad ===
  {
    slug: "darktrace",
    name: "Darktrace",
    url: "https://www.darktrace.com",
    description:
      "Ciberseguridad con IA que detecta y responde a amenazas de forma autónoma.",
    categories: ["seguridad"],
    tags: ["detección", "amenazas", "autónomo"],
  },
  {
    slug: "crowdstrike",
    name: "CrowdStrike",
    url: "https://www.crowdstrike.com",
    description:
      "Protección de endpoints con IA (Charlotte AI) y detección de amenazas.",
    categories: ["seguridad"],
    tags: ["endpoint", "charlotte-ai", "edr"],
  },
  {
    slug: "microsoft-defender",
    name: "Microsoft Defender",
    url: "https://www.microsoft.com/security/business/microsoft-defender",
    description:
      "Plataforma de seguridad XDR de Microsoft con detección potenciada por IA.",
    categories: ["seguridad"],
    tags: ["microsoft", "xdr", "copilot"],
  },
  {
    slug: "exabeam",
    name: "Exabeam",
    url: "https://www.exabeam.com",
    description:
      "SIEM con analítica de comportamiento (UEBA) basada en IA.",
    categories: ["seguridad", "analitica"],
    tags: ["siem", "ueba", "detección"],
  },
  {
    slug: "varonis",
    name: "Varonis",
    url: "https://www.varonis.com",
    description:
      "Seguridad de datos con IA para detectar accesos indebidos y amenazas internas.",
    categories: ["seguridad"],
    tags: ["datos", "detección", "dspm"],
  },
  {
    slug: "splunk",
    name: "Splunk",
    url: "https://www.splunk.com",
    description:
      "Plataforma de datos para seguridad y observabilidad con IA generativa.",
    categories: ["seguridad", "analitica"],
    tags: ["siem", "observabilidad", "datos"],
  },

  // === Cloud y MLOps ===
  {
    slug: "aws-sagemaker",
    name: "Amazon SageMaker",
    url: "https://aws.amazon.com/sagemaker",
    description:
      "Plataforma de AWS para construir, entrenar y desplegar modelos de machine learning.",
    categories: ["cloud", "programacion"],
    tags: ["ml", "entrenamiento", "aws"],
  },
  {
    slug: "vertex-ai",
    name: "Google Vertex AI",
    url: "https://cloud.google.com/vertex-ai",
    description:
      "Plataforma de IA de Google Cloud para entrenar y desplegar modelos, incluido Gemini.",
    categories: ["cloud", "programacion"],
    tags: ["google", "ml", "gemini"],
  },
  {
    slug: "azure-ml",
    name: "Azure Machine Learning",
    url: "https://azure.microsoft.com/products/machine-learning",
    description:
      "Servicio de Microsoft Azure para el ciclo completo de machine learning.",
    categories: ["cloud", "programacion"],
    tags: ["azure", "ml", "mlops"],
  },

  // === Analítica y datos ===
  {
    slug: "mixpanel",
    name: "Mixpanel",
    url: "https://mixpanel.com",
    description:
      "Analítica de producto con consultas asistidas por IA (Spark).",
    categories: ["analitica"],
    tags: ["producto", "eventos", "spark-ai"],
  },
  {
    slug: "amplitude",
    name: "Amplitude",
    url: "https://amplitude.com",
    description:
      "Plataforma de analítica de producto con insights generados por IA.",
    categories: ["analitica"],
    tags: ["producto", "comportamiento", "ia"],
  },
  {
    slug: "hotjar",
    name: "Hotjar",
    url: "https://www.hotjar.com",
    description:
      "Análisis de comportamiento (mapas de calor, grabaciones) con asistencia de IA.",
    categories: ["analitica"],
    tags: ["mapas-de-calor", "ux", "encuestas"],
  },
  {
    slug: "power-bi",
    name: "Microsoft Power BI",
    url: "https://www.microsoft.com/power-platform/products/power-bi",
    description:
      "Business intelligence de Microsoft con Copilot de IA para análisis y reportes.",
    categories: ["analitica", "negocios"],
    tags: ["bi", "copilot", "dashboards"],
  },
  {
    slug: "tableau",
    name: "Tableau",
    url: "https://www.tableau.com",
    description:
      "Plataforma de visualización de datos con IA (Tableau Pulse / Einstein).",
    categories: ["analitica", "negocios"],
    tags: ["bi", "visualización", "einstein"],
  },

  // === Recursos humanos ===
  {
    slug: "pymetrics",
    name: "pymetrics",
    url: "https://www.pymetrics.ai",
    description:
      "Evaluación de talento con IA basada en juegos para una selección sin sesgos.",
    categories: ["recursos-humanos"],
    tags: ["selección", "evaluación", "sesgo"],
  },
  {
    slug: "lattice",
    name: "Lattice",
    url: "https://lattice.com",
    description:
      "Plataforma de gestión de personas y desempeño con funciones de IA.",
    categories: ["recursos-humanos"],
    tags: ["desempeño", "personas", "ia"],
  },
  {
    slug: "culture-amp",
    name: "Culture Amp",
    url: "https://www.cultureamp.com",
    description:
      "Plataforma de experiencia del empleado con insights de IA.",
    categories: ["recursos-humanos"],
    tags: ["engagement", "encuestas", "insights"],
  },
  {
    slug: "workable",
    name: "Workable",
    url: "https://www.workable.com",
    description:
      "Software de reclutamiento (ATS) con sourcing y filtrado asistidos por IA.",
    categories: ["recursos-humanos"],
    tags: ["reclutamiento", "ats", "sourcing"],
  },

  // === Modelos / labs (añadidos desde el directorio) ===
  {
    slug: "qwen",
    name: "Qwen",
    url: "https://chat.qwen.ai",
    description:
      "Familia de modelos de Alibaba (Qwen) para chat, código y multimodal, con versiones abiertas potentes.",
    categories: ["chatbots", "programacion"],
    tags: ["alibaba", "qwen", "open", "llm"],
  },
  {
    slug: "glm",
    name: "GLM (Z.ai)",
    url: "https://z.ai",
    description:
      "Modelos GLM de Zhipu AI (Z.ai), fuertes en razonamiento y código agéntico, con opciones abiertas.",
    categories: ["chatbots", "programacion"],
    tags: ["zhipu", "glm", "open", "llm"],
  },
  {
    slug: "ernie",
    name: "ERNIE Bot",
    url: "https://yiyan.baidu.com",
    description:
      "Modelo insignia de Baidu (ERNIE): asistente conversacional multimodal con fuerte rendimiento en chino.",
    categories: ["chatbots"],
    tags: ["baidu", "ernie", "llm", "multimodal"],
  },
  {
    slug: "minimax",
    name: "MiniMax",
    url: "https://www.minimax.io",
    description:
      "Laboratorio de IA con modelos de texto, voz y vídeo (Hailuo), accesibles por chat y API.",
    categories: ["chatbots", "video", "audio"],
    tags: ["hailuo", "modelos", "video", "voz"],
  },
  {
    slug: "stable-audio",
    name: "Stable Audio",
    url: "https://www.stableaudio.com",
    description:
      "Generación de música y efectos de sonido con IA de Stability AI a partir de texto.",
    categories: ["audio", "musica"],
    tags: ["música", "audio", "stability", "generador"],
  },
  {
    slug: "gemma",
    name: "Gemma",
    url: "https://ai.google.dev/gemma",
    description:
      "Familia de modelos abiertos y ligeros de Google, derivados de la investigación de Gemini.",
    categories: ["programacion", "chatbots"],
    tags: ["google", "open-source", "modelo", "ligero"],
  },
] as const;

// --- Selectores de solo lectura sobre el catálogo --------------------------

const TOOL_BY_SLUG: ReadonlyMap<string, Tool> = new Map(
  TOOLS.map((t) => [t.slug, t]),
);

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOL_BY_SLUG.get(slug);
}

export function getToolsByCategory(categoryId: CategoryId): Tool[] {
  return TOOLS.filter((t) => t.categories.includes(categoryId));
}

/**
 * Conteo "de marketing": redondea a la centena inferior y antepone "+".
 * Para 162 → "+100". Dinámico: escala solo conforme crece el catálogo y no
 * hay que actualizarlo al añadir o quitar herramientas.
 */
/** Valor numérico del conteo aproximado (centena inferior). Para 162 → 100. */
export function approxToolCountValue(): number {
  return Math.floor(TOOLS.length / 100) * 100;
}

export function approxToolCount(): string {
  const floored = approxToolCountValue();
  return floored >= 100 ? `+${floored}` : String(TOOLS.length);
}

/** Resuelve una lista de slugs a herramientas, preservando el orden e ignorando slugs huérfanos. */
export function resolveTools(slugs: readonly string[]): Tool[] {
  return slugs
    .map((slug) => TOOL_BY_SLUG.get(slug))
    .filter((t): t is Tool => t !== undefined);
}

/**
 * Búsqueda local sencilla por nombre, descripción, tags y etiquetas de categoría.
 * Suficiente para un catálogo de decenas de elementos; si crece a miles,
 * se sustituye por un índice (Fuse.js) o búsqueda en servidor.
 */
export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...TOOLS];

  return TOOLS.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      ...tool.tags,
      ...tool.categories,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

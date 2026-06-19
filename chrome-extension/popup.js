/* Buscador rápido de AI Tools Hub. Usa el array global TOOLS de tools.js. */

const CAT_LABELS = {
  chatbots: "Chatbots y Asistentes",
  programacion: "Programación",
  escritura: "Escritura",
  investigacion: "Investigación",
  imagen: "Imagen",
  video: "Video",
  audio: "Audio y Voz",
  musica: "Música",
  fotografia: "Fotografía",
  diseno: "Diseño",
  "creacion-web": "Creación Web",
  "redes-sociales": "Redes Sociales",
  marketing: "Marketing y SEO",
  email: "Email",
  mensajeria: "Atención al Cliente",
  productividad: "Productividad",
  automatizacion: "Automatización",
  analitica: "Analítica y Datos",
  cloud: "Cloud y MLOps",
  seguridad: "Seguridad",
  "recursos-humanos": "Recursos Humanos",
  negocios: "Negocios",
};

const PALETTE = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b",
  "#10b981", "#06b6d4", "#3b82f6", "#14b8a6", "#a855f7",
];
const POPULAR = ["chatgpt", "claude", "gemini", "midjourney", "cursor", "perplexity"];
const MAX = 8;
const HUB_URL = "https://getaitoolshub.com/app";

const searchEl = document.getElementById("search");
const resultsEl = document.getElementById("results");
let current = [];
let active = 0;

function colorForSlug(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

function monogram(name) {
  const clean = name.replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function catLabel(id) {
  return CAT_LABELS[id] || id;
}

function search(query) {
  const q = query.trim().toLowerCase();
  if (!q) return POPULAR.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean);
  const scored = [];
  for (const t of TOOLS) {
    const name = t.name.toLowerCase();
    let score = 0;
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (name.includes(q)) score = 60;
    else if ((t.tags || []).some((tag) => tag.toLowerCase().includes(q))) score = 40;
    else if (t.categories.some((c) => catLabel(c).toLowerCase().includes(q))) score = 30;
    if (score > 0) scored.push({ t, score });
  }
  scored.sort((a, b) => b.score - a.score || a.t.name.localeCompare(b.t.name));
  return scored.slice(0, MAX).map((x) => x.t);
}

function openUrl(url) {
  chrome.tabs.create({ url });
  window.close();
}

function render() {
  resultsEl.innerHTML = "";
  if (current.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Sin resultados. Prueba con «chat», «imagen» o «video».";
    resultsEl.appendChild(li);
    return;
  }
  current.forEach((tool, i) => {
    const li = document.createElement("li");
    li.className = "result" + (i === active ? " active" : "");
    li.addEventListener("click", () => openUrl(tool.url));
    li.addEventListener("mousemove", () => {
      if (active !== i) {
        active = i;
        updateActive();
      }
    });

    const domain = domainFromUrl(tool.url);
    if (domain) {
      const img = document.createElement("img");
      img.className = "result-logo";
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      img.alt = "";
      img.addEventListener("error", () => {
        const fb = makeFallback(tool);
        img.replaceWith(fb);
      });
      li.appendChild(img);
    } else {
      li.appendChild(makeFallback(tool));
    }

    const text = document.createElement("div");
    text.className = "result-text";
    const name = document.createElement("div");
    name.className = "result-name";
    name.textContent = tool.name;
    const cat = document.createElement("div");
    cat.className = "result-cat";
    cat.textContent = catLabel(tool.categories[0]);
    text.appendChild(name);
    text.appendChild(cat);
    li.appendChild(text);

    const open = document.createElement("span");
    open.className = "result-open";
    open.textContent = "Abrir ↗";
    li.appendChild(open);

    resultsEl.appendChild(li);
  });
}

function makeFallback(tool) {
  const fb = document.createElement("div");
  fb.className = "result-fallback";
  fb.style.background = colorForSlug(tool.slug);
  fb.textContent = monogram(tool.name);
  return fb;
}

function updateActive() {
  const items = resultsEl.querySelectorAll(".result");
  items.forEach((el, i) => el.classList.toggle("active", i === active));
  const el = items[active];
  if (el) el.scrollIntoView({ block: "nearest" });
}

function refresh() {
  current = search(searchEl.value);
  active = 0;
  render();
}

searchEl.addEventListener("input", refresh);

searchEl.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    active = Math.min(active + 1, current.length - 1);
    updateActive();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    active = Math.max(active - 1, 0);
    updateActive();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (current[active]) openUrl(current[active].url);
  }
});

document.getElementById("open-hub").addEventListener("click", () => openUrl(HUB_URL));

refresh();

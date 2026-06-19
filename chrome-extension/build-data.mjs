// Genera chrome-extension/tools.js a partir del catálogo (src/data/tools.ts).
// Mantiene la extensión sincronizada con la web sin duplicar datos a mano.
import fs from "fs";

const src = fs.readFileSync("src/data/tools.ts", "utf8");
const start = src.indexOf("export const TOOLS");
const open = src.indexOf("[", start);
const close = src.indexOf("] as const", open);
const arrText = src.slice(open, close + 1);

// El literal es JS válido (claves sin comillas, comas finales): se evalúa.
const TOOLS = eval(arrText);

const slim = TOOLS.map((t) => ({
  slug: t.slug,
  name: t.name,
  url: t.url,
  categories: t.categories,
  tags: t.tags,
}));

fs.writeFileSync(
  "chrome-extension/tools.js",
  "// Generado por build-data.mjs — no editar a mano.\nconst TOOLS = " +
    JSON.stringify(slim) +
    ";\n",
);
console.log("Escritas", slim.length, "herramientas en chrome-extension/tools.js");

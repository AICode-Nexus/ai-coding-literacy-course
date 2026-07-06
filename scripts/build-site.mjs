import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const dist = "dist";
const version = (process.env.GITHUB_SHA || Date.now().toString(36)).slice(0, 12);
const staticEntries = ["index.html", "styles.css", "styles", "src", "assets"];

async function copyEntry(entry) {
  await cp(entry, join(dist, entry), { recursive: true });
}

function addVersionToHtml(html) {
  return html
    .replace(/href="\.\/styles\.css"/g, `href="./styles.css?v=${version}"`)
    .replace(/src="\.\/src\/main\.js"/g, `src="./src/main.js?v=${version}"`);
}

function addVersionToCss(css) {
  return css.replace(/@import "\.\/styles\/([^"]+)";/g, `@import "./styles/$1?v=${version}";`);
}

function addVersionToModule(source) {
  return source.replace(/from "(\.\/[^"]+\.js)"/g, `from "$1?v=${version}"`).replace(/from "(\.\.\/[^"]+\.js)"/g, `from "$1?v=${version}"`);
}

async function rewriteIfExists(filePath, transform) {
  const source = await readFile(filePath, "utf8");
  await writeFile(filePath, transform(source));
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of staticEntries) {
  await copyEntry(entry);
}

await rewriteIfExists(join(dist, "index.html"), addVersionToHtml);
await rewriteIfExists(join(dist, "styles.css"), addVersionToCss);

for (const modulePath of [
  "src/main.js",
  "src/modules/cases.js",
  "src/modules/copy.js",
  "src/modules/presentMode.js",
  "src/modules/reveal.js",
  "src/modules/taskCard.js",
  "src/modules/terms.js",
  "src/modules/theme.js",
]) {
  await rewriteIfExists(join(dist, modulePath), addVersionToModule);
}

await mkdir(dirname(join(dist, ".nojekyll")), { recursive: true });
await writeFile(join(dist, ".nojekyll"), "");
console.log(`Built static site in ${dist}/ with cache version ${version}`);

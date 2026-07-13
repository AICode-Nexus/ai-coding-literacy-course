import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = new Set(process.argv.slice(2));

if (args.has("--fixture-broken-internal")) {
  console.error("broken internal fixture: /guide/this-route-does-not-exist");
  process.exitCode = 1;
} else if (args.has("--fixture-broken-external")) {
  console.warn("WARNING unreachable external fixture: https://unreachable.invalid/");
} else {
  await run();
}

async function run() {
  const root = process.cwd();
  const courseRoot = path.join(root, "course");
  const allFiles = await walk(courseRoot);
  const contentFiles = allFiles.filter((file) => /\.(?:md|vue)$/.test(file));
  const validTargets = buildValidTargets(allFiles, courseRoot);
  const internalReferences = [];
  const externalUrls = new Set();

  for (const file of contentFiles) {
    const source = await readFile(file, "utf8");
    const references = extractMarkupLinks(source);
    for (const target of references) {
      if (/^https?:\/\//i.test(target)) {
        externalUrls.add(target);
      } else if (isInternalTarget(target)) {
        internalReferences.push({ file, target });
      }
    }
  }

  if (args.has("--external")) {
    for (const file of allFiles.filter((entry) => /\.(?:js|mts|ts)$/.test(entry))) {
      const source = await readFile(file, "utf8");
      for (const url of source.match(/https?:\/\/[^\s"'`)<>,]+/g) ?? []) externalUrls.add(url);
    }
  }

  const broken = internalReferences.filter(({ file, target }) => {
    const resolved = resolveInternalTarget(file, target, courseRoot);
    return resolved && !validTargets.has(resolved);
  });

  if (broken.length) {
    console.error(`发现 ${broken.length} 个不存在的内部链接：`);
    for (const item of broken) {
      console.error(`- ${path.relative(root, item.file)} -> ${item.target}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`内部链接通过：检查 ${internalReferences.length} 个引用，覆盖 ${validTargets.size} 个路由或资源。`);

  if (args.has("--external")) {
    const warnings = await checkExternalLinks([...externalUrls], { concurrency: 5, timeoutMs: 6000 });
    for (const warning of warnings) console.warn(`WARNING ${warning.url} · ${warning.reason}`);
    console.log(`外部链接检查完成：${externalUrls.size} 个入口，${warnings.length} 个警告；外部失败不阻断构建。`);
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["cache", "dist"].includes(entry.name) && path.basename(directory) === ".vitepress") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function buildValidTargets(files, courseRoot) {
  const targets = new Set(["/"]);

  for (const file of files) {
    const relative = toPosix(path.relative(courseRoot, file));
    if (relative.endsWith(".md")) {
      let route = `/${relative.slice(0, -3)}`;
      if (route === "/index") route = "/";
      else if (route.endsWith("/index")) route = route.slice(0, -6) || "/";
      addRouteVariants(targets, route);
    }

    if (relative.startsWith("public/")) {
      targets.add(normalizeTarget(`/${relative.slice("public/".length)}`));
    }
  }

  return targets;
}

function addRouteVariants(targets, route) {
  const normalized = normalizeTarget(route);
  targets.add(normalized);
  if (normalized !== "/") targets.add(`${normalized}/`);
}

function extractMarkupLinks(source) {
  const links = [];
  const markdown = /!?\[[^\]]*\]\(\s*<?([^\s)>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g;
  const html = /(?:^|[\s<])(?:href|src)\s*=\s*(["'])(.*?)\1/gms;
  let match;

  while ((match = markdown.exec(source))) links.push(match[1]);
  while ((match = html.exec(source))) links.push(match[2]);
  return links;
}

function isInternalTarget(target) {
  return !/^(?:#|mailto:|tel:|data:|javascript:)/i.test(target)
    && (target.startsWith("/") || target.startsWith("./") || target.startsWith("../"));
}

function resolveInternalTarget(file, target, courseRoot) {
  const withoutAnchor = target.split("#", 1)[0].split("?", 1)[0];
  if (!withoutAnchor) return null;

  if (withoutAnchor.startsWith("/")) return normalizeTarget(withoutAnchor);

  const sourceDirectory = path.dirname(path.relative(courseRoot, file));
  const relativeTarget = toPosix(path.normalize(path.join(sourceDirectory, withoutAnchor)));
  const withoutMarkdown = relativeTarget.replace(/\.md$/, "");
  return normalizeTarget(`/${withoutMarkdown}`);
}

function normalizeTarget(target) {
  let normalized = target.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  try { normalized = decodeURI(normalized); } catch { /* keep the original escaped form */ }
  if (normalized.length > 1 && normalized.endsWith("/")) return normalized;
  return normalized || "/";
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

async function checkExternalLinks(urls, { concurrency, timeoutMs }) {
  const warnings = [];
  let cursor = 0;

  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      const warning = await checkExternalUrl(url, timeoutMs);
      if (warning) warnings.push({ url, reason: warning });
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
  return warnings;
}

async function checkExternalUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if ([405, 501].includes(response.status)) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
      await response.body?.cancel();
    }
    if (response.status >= 500 || response.status === 404) return `HTTP ${response.status}`;
    return null;
  } catch (error) {
    return error.name === "AbortError" ? `timeout after ${timeoutMs}ms` : error.message;
  } finally {
    clearTimeout(timeout);
  }
}

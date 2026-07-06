import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

async function read(path) {
  return readFile(path, "utf8");
}

test("site presents the locked course name and graduate-hire positioning", async () => {
  const html = await read("index.html");
  const readme = await read("README.md");

  assert.match(html, /AI Coding 素养课：从会用工具到 AI 协同工作/);
  assert.match(html, /校招生/);
  assert.match(html, /AI 思维/);
  assert.match(html, /AI 协同工作/);
  assert.match(readme, /面向校招生/);
  const retiredPhrase = "人机" + "协作";
  assert.equal(html.includes(retiredPhrase), false);
  assert.equal(readme.includes(retiredPhrase), false);
});

test("page includes the four requested course modules", async () => {
  const html = await read("index.html");

  for (const heading of [
    "AI 时代的 T 型人才",
    "AI 新工作语言",
    "创新不是换工具，是重做小流程",
    "实际岗位案例",
  ]) {
    assert.match(html, new RegExp(heading));
  }

  for (const anchor of ["#t-shaped", "#language", "#workflow", "#cases", "#tools", "#action"]) {
    assert.match(html, new RegExp(`href="${anchor}"`));
  }
});

test("term data explains frontier vocabulary with beginner examples", async () => {
  const { allTerms } = await import("../src/data/terms.js");
  const termNames = allTerms.map((term) => term.name);

  for (const required of [
    "Goal",
    "Claude Tag",
    "Agent Team",
    "Subagent",
    "Worktree",
    "Harness Engineering",
    "Loop Engineering",
    "Eval",
    "Guardrails",
    "Tracing",
  ]) {
    assert.ok(termNames.includes(required), `${required} should be present`);
  }

  for (const term of allTerms) {
    assert.ok(term.problem.length > 20, `${term.name} should explain a work problem`);
    assert.ok(term.example.length > 20, `${term.name} should include a beginner example`);
  }
});

test("case studies include at least six practical job scenarios", async () => {
  const { caseStudies } = await import("../src/data/cases.js");
  assert.ok(caseStudies.length >= 6);

  for (const required of ["weekly", "requirement", "research", "code-review", "meeting", "admin", "ops"]) {
    assert.ok(caseStudies.some((item) => item.id === required), `${required} case should exist`);
  }

  for (const item of caseStudies) {
    assert.ok(item.oldWay);
    assert.ok(item.aiWay);
    assert.ok(item.humanRole);
    assert.ok(item.template);
  }
});

test("interactive modules are wired from the entry point", async () => {
  const main = await read("src/main.js");
  const html = await read("index.html");

  for (const moduleName of [
    "theme",
    "presentMode",
    "heroCanvas",
    "reveal",
    "terms",
    "cases",
    "taskCard",
    "copy",
  ]) {
    assert.match(main, new RegExp(`from "\\./modules/${moduleName}\\.js"`));
  }

  for (const id of ["term-groups", "term-list", "term-detail", "case-tabs", "case-output", "task-card-form", "task-card-output"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("workflow and action plan reinforce AI collaborative work habits", async () => {
  const { collaborationSteps, sevenDayPlan } = await import("../src/data/workflow.js");
  const titles = collaborationSteps.map((step) => step.title);

  for (const title of ["定目标", "给材料", "拆任务", "先处理", "人验收", "控边界", "再复盘"]) {
    assert.ok(titles.includes(title), `${title} should be in collaboration steps`);
  }

  assert.equal(sevenDayPlan.length, 7);
  assert.match(sevenDayPlan.join("\n"), /真实任务/);
  assert.match(sevenDayPlan.join("\n"), /复盘/);
});

test("GitHub Pages workflow tests, builds, and deploys dist", async () => {
  const workflow = await read(".github/workflows/package-and-deploy.yml");
  const buildScript = await read("scripts/build-site.mjs");

  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /id-token:\s+write/);

  for (const entry of ["index.html", "styles.css", "styles", "src", "assets"]) {
    assert.match(buildScript, new RegExp(`"${entry}"`));
  }
});

test("build output cache-busts top-level CSS and module entry", async () => {
  const result = spawnSync(process.execPath, ["scripts/build-site.mjs"], {
    encoding: "utf8",
    env: { ...process.env, GITHUB_SHA: "abcdef1234567890" },
  });

  assert.equal(result.status, 0, result.stderr);

  const html = await read("dist/index.html");
  const css = await read("dist/styles.css");
  const main = await read("dist/src/main.js");
  const terms = await read("dist/src/modules/terms.js");

  assert.match(html, /href="\.\/styles\.css\?v=abcdef123456"/);
  assert.match(html, /src="\.\/src\/main\.js\?v=abcdef123456"/);
  assert.match(css, /@import "\.\/styles\/base\.css\?v=abcdef123456"/);
  assert.match(main, /from "\.\/modules\/theme\.js\?v=abcdef123456"/);
  assert.match(terms, /from "\.\.\/data\/terms\.js\?v=abcdef123456"/);
});

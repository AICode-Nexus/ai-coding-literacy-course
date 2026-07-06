import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

async function read(path) {
  return readFile(path, "utf8");
}

test("site preserves the course brand and graduate-hire positioning", async () => {
  const html = await read("index.html");
  const readme = await read("README.md");

  assert.match(html, /AI Coding 素养课：从会用工具到 AI 协同工作/);
  assert.match(html, /校招生/);
  assert.match(html, /AI 协同工作/);
  assert.match(readme, /面向校招生/);

  const retiredPhrase = "人机" + "协作";
  assert.equal(html.includes(retiredPhrase), false);
  assert.equal(readme.includes(retiredPhrase), false);
});

test("runtime course content and README remove administrative approval material", async () => {
  const files = [
    "index.html",
    "README.md",
    "src/data/cases.js",
    "src/data/terms.js",
    "src/data/workflow.js",
    "src/data/workshop.js",
  ];
  const banned = [/行政审批/, /行政申请/, /制度审批/, /回购审批/, /最终审批/];

  for (const file of files) {
    const content = await read(file);
    for (const pattern of banned) {
      assert.doesNotMatch(content, pattern, `${file} should not contain ${pattern}`);
    }
  }
});

test("workshop agenda totals 90 minutes and exposes classroom outputs", async () => {
  const { workshopAgenda, workshopOutputs } = await import("../src/data/workshop.js");
  const totalMinutes = workshopAgenda.reduce((sum, item) => sum + item.minutes, 0);

  assert.equal(totalMinutes, 90);
  assert.ok(workshopAgenda.length >= 6);
  assert.ok(workshopAgenda.some((item) => item.id === "task-card-lab"));
  assert.ok(workshopAgenda.some((item) => item.id === "quality-boundary"));

  for (const item of workshopAgenda) {
    assert.ok(item.title.length >= 4);
    assert.ok(item.goal.length >= 12);
    assert.ok(item.activity.length >= 12);
  }

  assert.deepEqual(workshopOutputs, ["任务卡", "提示词", "验收清单", "复盘记录"]);
});

test("seven-day training plan is actionable each day", async () => {
  const { sevenDayTraining } = await import("../src/data/workshop.js");

  assert.equal(sevenDayTraining.length, 7);
  for (const day of sevenDayTraining) {
    assert.ok(Number.isInteger(day.day));
    assert.ok(day.goal.length >= 8);
    assert.ok(day.task.length >= 12);
    assert.ok(day.output.length >= 6);
    assert.ok(day.check.length >= 10);
    assert.ok(day.feedbackQuestion.length >= 8);
  }
});

test("task templates cover four classroom scenarios and generate complete cards", async () => {
  const { taskTemplates } = await import("../src/data/workshop.js");

  for (const required of ["weekly-review", "requirement-precheck", "competitor-research", "meeting-actions"]) {
    assert.ok(taskTemplates.some((template) => template.id === required), `${required} should exist`);
  }

  for (const template of taskTemplates) {
    assert.ok(template.title);
    assert.ok(template.role);
    assert.ok(template.task);
    assert.ok(template.goal);
    assert.ok(template.material);
    assert.ok(template.standard);
    assert.ok(template.boundary);
    assert.ok(template.risk);
    assert.ok(template.outputSections.length >= 4);
  }
});

test("term data follows the collaboration chain with beginner examples", async () => {
  const { allTerms, termGroups } = await import("../src/data/terms.js");
  const groupIds = termGroups.map((group) => group.id);
  const termNames = allTerms.map((term) => term.name);

  for (const required of ["goal", "context", "prompt", "output", "eval", "guardrails", "loop"]) {
    assert.ok(groupIds.includes(required), `${required} group should exist`);
  }

  for (const required of [
    "Goal",
    "Context",
    "Prompt",
    "Agent",
    "Eval",
    "Guardrails",
    "Tracing",
    "Loop Engineering",
    "Harness Engineering",
    "Worktree",
    "Subagent",
  ]) {
    assert.ok(termNames.includes(required), `${required} should be present`);
  }

  for (const term of allTerms) {
    assert.ok(term.problem.length > 20, `${term.name} should explain a work problem`);
    assert.ok(term.example.length > 20, `${term.name} should include a beginner example`);
    assert.ok(term.classroomUse.length > 20, `${term.name} should include classroom use`);
  }
});

test("case studies include seven practical workplace scenarios with quality gates", async () => {
  const { caseStudies } = await import("../src/data/cases.js");
  const ids = caseStudies.map((item) => item.id);

  assert.equal(caseStudies.length, 7);
  for (const required of [
    "weekly",
    "requirement",
    "research",
    "code-review",
    "meeting",
    "ops",
    "feedback",
  ]) {
    assert.ok(ids.includes(required), `${required} case should exist`);
  }

  for (const item of caseStudies) {
    assert.ok(item.oldWay.length >= 16);
    assert.ok(item.aiWay.length >= 16);
    assert.ok(item.humanRole.length >= 16);
    assert.ok(item.template.length >= 40);
    assert.ok(item.failures.length >= 3);
    assert.ok(item.checklist.length >= 4);
  }
});

test("interactive modules and containers are wired for real controls", async () => {
  const main = await read("src/main.js");
  const html = await read("index.html");

  for (const moduleName of ["theme", "presentMode", "reveal", "terms", "cases", "taskCard", "copy"]) {
    assert.match(main, new RegExp(`from "\\./modules/${moduleName}\\.js"`));
  }

  for (const id of [
    "workshop-agenda",
    "term-groups",
    "term-list",
    "term-detail",
    "case-tabs",
    "case-output",
    "task-template-options",
    "task-card-form",
    "task-card-output",
    "seven-day-training",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `${id} should be present`);
  }

  assert.doesNotMatch(html, /class="library-controls"/);
  assert.doesNotMatch(html, /href="\.\/README\.md" download/);
});

test("README describes the workshop structure and verification commands", async () => {
  const readme = await read("README.md");

  assert.match(readme, /90 分钟/);
  assert.match(readme, /任务卡/);
  assert.match(readme, /验收清单/);
  assert.match(readme, /npm test/);
  assert.match(readme, /npm run build/);
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

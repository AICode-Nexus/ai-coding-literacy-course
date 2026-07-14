import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";

const read = (file) => readFile(file, "utf8");
const execFileAsync = promisify(execFile);

const expectedNodes = [
  ["t-shaped", "AI 时代的 T 型人才", 8, "/guide/01-t-shaped"],
  ["collaboration-shift", "从工具使用到人机协同", 4, "/guide/02-collaboration-shift"],
  ["ai-landscape", "AI 基础、模型与工具全景", 12, "/guide/03-ai-landscape"],
  ["method", "AI 协同七步法", 10, "/guide/04-method"],
  ["context", "Context：组织正确的信息", 9, "/guide/05-context"],
  ["agent", "Agent：从回答走向行动", 12, "/guide/06-agent"],
  ["quality", "质量、安全与人的责任", 11, "/guide/07-quality"],
  ["workflow", "从一次提效到流程重构", 8, "/guide/08-workflow"],
  ["transfer", "岗位迁移与行动计划", 6, "/guide/09-transfer"],
];

const expectedScenarioIds = [
  "t-shaped-adjacent-loop",
  "shift-answer-to-system",
  "landscape-model-tool-choice",
  "method-vague-request",
  "context-signal-over-volume",
  "agent-orchestration-choice",
  "quality-delivery-confidence",
  "workflow-reuse-or-restart",
  "transfer-first-small-loop",
];

const expectedToolCategoryIds = [
  "general-assistant",
  "deep-research",
  "coding-agent",
  "agent-workflow",
  "multimodal-creation",
  "knowledge-connection",
  "capability-reuse",
];

const requiredCoreConceptIds = [
  "goal",
  "context",
  "prompt",
  "output",
  "eval",
  "guardrails",
  "loop",
  "tool",
  "agent",
];

async function listCourseSourceFiles(directory = "course") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (fullPath === path.join("course", ".vitepress", "cache")) continue;
      files.push(...await listCourseSourceFiles(fullPath));
      continue;
    }
    if (/\.(?:css|js|md|mts|ts|vue)$/.test(entry.name)) files.push(fullPath);
  }

  return files;
}

test("course metadata preserves the approved nine-node 80 plus 15 contract", async () => {
  const { courseMeta, lectureSections } = await import("../course/.vitepress/data/course.js");

  assert.equal(courseMeta.title, "AI 协同方法论：从“会用 AI”到“善用 AI”");
  assert.equal(courseMeta.teachingMinutes, 80);
  assert.equal(courseMeta.exchangeMinutes, 15);
  assert.equal(courseMeta.audienceSize, 1050);
  assert.equal(courseMeta.stageAspect, "16:9");
  assert.equal(lectureSections.reduce((sum, item) => sum + item.minutes, 0), 80);
  assert.deepEqual(
    lectureSections.map((item) => [item.id, item.title, item.minutes, item.guide]),
    expectedNodes,
  );
});

test("VitePress defaults to dark appearance while keeping the theme switch available", async () => {
  const config = await read("course/.vitepress/config.mts");

  assert.match(config, /appearance:\s*["']dark["']/);
  assert.match(config, /darkModeSwitchLabel:/);
});

test("course homepage maps the supplied KV formats to responsive contexts and uses the AI mark", async () => {
  const home = await read("course/.vitepress/theme/components/CourseHome.vue");
  const stage = await read("course/.vitepress/theme/components/StageScene.vue");
  const config = await read("course/.vitepress/config.mts");
  const mark = await read("course/public/brand/ai-collaboration-mark.svg");

  for (const asset of ["kv-wide.jpg", "kv-mobile.jpg", "kv-stage.jpg", "kv-ultrawide.jpg"]) {
    await access(path.join("course/public/kv", asset));
    assert.match(home, new RegExp(asset.replace(".", "\\.")));
  }

  assert.match(home, /fetchpriority=["']high["']/);
  assert.match(home, /brand\/ai-collaboration-mark\.svg/);
  assert.match(stage, /brand\/ai-collaboration-mark\.svg/);
  assert.match(config, /logo:\s*["']\/brand\/ai-collaboration-mark\.svg["']/);
  assert.match(config, /og:image/);
  assert.match(mark, /#078DFF/);
  assert.match(mark, /#063E8C/);
  assert.match(mark, /#FF9A1F/);
  assert.doesNotMatch(mark, /linearGradient|filter|image/);
});

test("scenario and template registry is normalized", async () => {
  const { scenarios } = await import("../course/.vitepress/data/scenarios.js");
  const { templates } = await import("../course/.vitepress/data/templates.js");

  assert.deepEqual(scenarios.map((item) => item.id), expectedScenarioIds);
  assert.deepEqual(
    scenarios.map((item) => item.sectionId),
    expectedNodes.map(([id]) => id),
  );
  assert.deepEqual(
    templates.map((item) => item.id),
    ["task-card", "context-checklist", "eval-checklist", "risk-checklist", "retrospective"],
  );

  for (const scenario of scenarios) {
    assert.ok(["场景演示", "应用示例"].includes(scenario.label));
    assert.ok(scenario.question.length >= 12);
    assert.ok(scenario.ordinary.length >= 12);
    assert.ok(scenario.collaborative.length >= 12);
    assert.ok(scenario.roleDirections.length >= 4);
    assert.ok(scenario.conceptIds.length >= 2);
    assert.ok(scenario.toolCategoryIds.length >= 1);
    assert.ok(scenario.checkpoints.length >= 2);
    assert.ok(scenario.takeaway.length >= 16);
  }

  for (const template of templates) {
    assert.ok(template.title.length >= 4);
    assert.ok(template.purpose.length >= 12);
    assert.ok(template.fields.length >= 3);
    assert.ok(template.copyText.length >= 30);
    assert.ok(template.relatedNodeIds.length >= 1);
  }
});

test("shared references resolve across scenario concept and tool registries", async () => {
  const { conceptById } = await import("../course/.vitepress/data/concepts.js");
  const { scenarioById, scenarios } = await import("../course/.vitepress/data/scenarios.js");
  const { toolCategoryById } = await import("../course/.vitepress/data/tools.js");

  for (const id of expectedScenarioIds) assert.ok(scenarioById[id], "missing scenario " + id);
  for (const scenario of scenarios) {
    for (const id of scenario.conceptIds) assert.ok(conceptById[id], "missing concept " + id);
    for (const id of scenario.toolCategoryIds) assert.ok(toolCategoryById[id], "missing tool category " + id);
  }
});

test("tool catalog uses capability categories and explicit freshness metadata", async () => {
  const { toolCategories, toolEntryStatus } = await import("../course/.vitepress/data/tools.js");

  assert.deepEqual(toolCategories.map((item) => item.id), expectedToolCategoryIds);
  for (const category of toolCategories) {
    assert.ok(category.purpose.length >= 12);
    assert.ok(category.selectionCriteria.length >= 3);
    assert.ok(category.risks.length >= 2);
    assert.ok(category.representatives.length >= 1);
    for (const entry of category.representatives) {
      assert.match(entry.officialUrl, /^https:\/\//);
      assert.match(entry.verifiedAt, /^2026-07-13$/);
      assert.equal(entry.reviewDays, category.reviewDays);
      assert.equal(toolEntryStatus(entry, new Date("2026-07-13T00:00:00Z")), "已核验");
      assert.equal(toolEntryStatus(entry, new Date("2026-10-20T00:00:00Z")), "待重新核验");
    }
  }
});

test("concepts have definitions boundaries maturity and shared references", async () => {
  const { boundaryComparisons, concepts } = await import("../course/.vitepress/data/concepts.js");
  const ids = new Set(concepts.map((concept) => concept.id));

  for (const id of requiredCoreConceptIds) assert.ok(ids.has(id), "missing core concept " + id);
  for (const concept of concepts) {
    assert.ok(concept.definition.length >= 20);
    assert.ok(concept.solves.length >= 12);
    assert.ok(concept.notFor.length >= 12);
    assert.ok(["core", "advanced", "frontier"].includes(concept.level));
    assert.ok(concept.nodeIds.length >= 1);
    assert.ok(concept.scenarioIds.length >= 1);
    assert.ok(concept.sourceIds.length >= 1);
  }

  assert.deepEqual(boundaryComparisons.map((item) => item.id), [
    "prompt-context-harness-loop",
    "mcp-tool-agent",
    "single-subagent-team",
    "rag-living-knowledge",
  ]);
});

test("lecture contract reuses core knowledge in panorama and scenario scenes", async () => {
  const { lectureScenes } = await import("../course/.vitepress/data/scenes.js");
  const panorama = lectureScenes.find((scene) => scene.id === "concept-panorama");

  assert.ok(panorama);
  for (const id of requiredCoreConceptIds) {
    assert.ok(panorama.conceptIds.includes(id), "panorama missing " + id);
    assert.ok(
      lectureScenes.filter((scene) => scene.conceptIds.includes(id)).length >= 2,
      id + " must appear in panorama and a later scene",
    );
  }
});

test("lecture contract contains 32 generic scenes across all nine nodes", async () => {
  const { conceptById } = await import("../course/.vitepress/data/concepts.js");
  const { lectureScenes } = await import("../course/.vitepress/data/scenes.js");
  const { scenarioById } = await import("../course/.vitepress/data/scenarios.js");
  const { toolCategoryById } = await import("../course/.vitepress/data/tools.js");

  const ids = new Set(lectureScenes.map((scene) => scene.id));
  const kinds = new Set(lectureScenes.map((scene) => scene.kind));
  const requiredKinds = ["thesis", "compare", "flow", "architecture", "audience", "demo", "checklist", "scenario"];
  const noteFields = ["purpose", "substitutions", "optionalQuestion", "boundary", "advanced"];

  assert.equal(lectureScenes.length, 32);
  assert.equal(ids.size, 32);
  assert.deepEqual(
    new Set(lectureScenes.map((item) => item.section)),
    new Set(expectedNodes.map(([id]) => id)),
  );
  for (const kind of requiredKinds) assert.ok(kinds.has(kind), "missing scene kind " + kind);
  assert.ok(!lectureScenes.some((item) => item.kind === "case"));
  assert.ok(!lectureScenes.some((item) => /真实案例|CASE THEATRE/i.test(JSON.stringify(item))));

  for (const scene of lectureScenes) {
    assert.ok(scene.title.length >= 4);
    assert.ok(scene.body.length >= 12);
    assert.ok(scene.takeaway.length >= 12);
    assert.ok(expectedNodes.some(([id]) => id === scene.section));
    assert.ok(Array.isArray(scene.conceptIds));
    assert.ok(Array.isArray(scene.toolCategoryIds));
    assert.ok(scene.visual && scene.visual.type);
    if (scene.scenarioId) assert.ok(scenarioById[scene.scenarioId], "missing scenario " + scene.scenarioId);
    for (const id of scene.conceptIds) assert.ok(conceptById[id], "missing concept " + id);
    for (const id of scene.toolCategoryIds) assert.ok(toolCategoryById[id], "missing tool category " + id);
    for (const field of noteFields) {
      assert.ok(scene.notes[field], scene.id + " missing notes." + field);
    }
    assert.ok(Array.isArray(scene.notes.substitutions));
  }
});

test("lecture blueprint locks sourced evidence static fallback and process visuals", async () => {
  const { lectureScenes } = await import("../course/.vitepress/data/scenes.js");
  const sceneById = Object.fromEntries(lectureScenes.map((scene) => [scene.id, scene]));

  assert.equal(sceneById["adjacent-loop"].visual.type, "beforeAfter");
  assert.equal(sceneById["collaboration-gap"].visual.type, "beforeAfter");
  assert.equal(sceneById["workflow-redesign"].visual.type, "beforeAfter");
  assert.deepEqual(
    sceneById["learner-evidence"].visual.items.map((item) => item.level),
    ["＞90%", "78.21%", "21.23%", "25.70%"],
  );
  assert.deepEqual(
    Object.keys(sceneById["method-static-demo"].visual).sort(),
    ["artifact", "fallback", "input", "target", "type"],
  );
  assert.match(sceneById["method-static-demo"].visual.fallback, /预制任务卡与验收清单/);
});

test("presentation navigation is deterministic", async () => {
  const { clampScene, keyToAction, sceneFromSearch, searchWithScene } = await import("../course/.vitepress/data/presentation.js");

  assert.equal(clampScene(-1, 30), 0);
  assert.equal(clampScene(40, 30), 29);
  assert.equal(sceneFromSearch("?scene=12", 30), 11);
  assert.equal(sceneFromSearch("?scene=oops", 30), 0);
  assert.equal(searchWithScene("?mode=teacher", 2), "?mode=teacher&scene=3");
  assert.equal(keyToAction("ArrowRight"), "next");
  assert.equal(keyToAction("PageDown"), "next");
  assert.equal(keyToAction(" "), "next");
  assert.equal(keyToAction("ArrowLeft"), "previous");
  assert.equal(keyToAction("PageUp"), "previous");
  assert.equal(keyToAction("Home"), "first");
  assert.equal(keyToAction("End"), "last");
  assert.equal(keyToAction("f"), "fullscreen");
  assert.equal(keyToAction("o"), "overview");
  assert.equal(keyToAction("x"), null);
});

test("tutorial components expose shared scenarios knowledge tools and templates", async () => {
  const components = ["ScenarioFrame", "KnowledgeAtlas", "ToolLandscape", "TemplateLibrary"];
  const theme = await read("course/.vitepress/theme/index.ts");

  for (const name of components) {
    await access(`course/.vitepress/theme/components/${name}.vue`);
    assert.match(theme, new RegExp(`app\\.component\\(\"${name}\"`));
  }

  await assert.rejects(access("course/.vitepress/theme/components/CaseTheatre.vue"));
  assert.doesNotMatch(theme, /CaseTheatre/);
});

test("tutorial materials stay inside the readable document column", async () => {
  const styles = await read("course/.vitepress/theme/styles/components.css");
  const sharedSurfaceRule = styles.match(/\.scenario-frame,\s*\.knowledge-atlas,\s*\.tool-landscape,\s*\.template-library\s*\{([^}]+)\}/s)?.[1] ?? "";
  const taskCardRule = styles.match(/\.task-card-lab\s*\{([^}]+)\}/s)?.[1] ?? "";

  for (const rule of [sharedSurfaceRule, taskCardRule]) {
    assert.match(rule, /width:\s*100%/);
    assert.match(rule, /max-width:\s*100%/);
    assert.doesNotMatch(rule, /100vw|translateX|1180px/);
  }
});

test("source evidence separates stable dynamic and internal material", async () => {
  const { sources } = await import("../course/.vitepress/data/sources.js");

  for (const source of sources) {
    assert.match(source.verifiedAt, /^2026-07-13$/);
    assert.ok(["stable", "dynamic", "internal"].includes(source.stability));
    assert.ok(source.title && source.url && source.description);
  }

  for (const id of ["anthropic-context", "openai-agents", "openai-evals", "openai-sandboxes", "mcp-architecture", "claude-agent-teams", "vitepress"]) {
    assert.ok(sources.some((source) => source.id === id), "missing source " + id);
  }
});

test("task card generator returns the shared seven-field collaboration contract", async () => {
  const { buildTaskCard } = await import("../course/.vitepress/data/task-card.js");
  const card = buildTaskCard({
    task: "把一项模糊要求整理成待确认问题",
    audience: "任务责任人与协作者",
    materials: "原始要求、已有材料、历史约束",
    actions: "先找缺口，再整理问题，最后形成可验收清单",
    output: "问题清单、来源与待确认项",
    checks: "每个判断都有来源，缺失内容显式标记",
    boundaries: "不得把讨论内容写成已确认事实",
  });

  for (const label of ["目标", "使用者或责任人", "材料与来源", "动作与顺序", "交付物与格式", "验收标准", "权限、边界与停止条件"]) {
    assert.match(card, new RegExp(label));
  }
});

test("VitePress routes mirror the approved lecture and reference structure", async () => {
  const files = [
    "course/index.md",
    "course/present.md",
    "course/sources.md",
    "course/guide/00-start.md",
    "course/guide/01-t-shaped.md",
    "course/guide/02-collaboration-shift.md",
    "course/guide/03-ai-landscape.md",
    "course/guide/04-method.md",
    "course/guide/05-context.md",
    "course/guide/06-agent.md",
    "course/guide/07-quality.md",
    "course/guide/08-workflow.md",
    "course/guide/09-transfer.md",
    "course/appendix/glossary.md",
    "course/appendix/tool-radar.md",
    "course/appendix/templates.md",
    "course/public/logo.svg",
    "course/public/favicon.svg",
    "course/.vitepress/theme/components/CourseHome.vue",
    "course/.vitepress/theme/components/PresentDeck.vue",
  ];

  for (const file of files) await access(file);

  const chapterHeadings = [
    "## 本章结论",
    "## 通用工作场景",
    "## 概念与关系",
    "## 知识详解",
    "## 工具与选择方法",
    "## 常见误区与边界",
    "## 岗位迁移",
    "## 本章练习",
    "## 来源与延伸阅读",
  ];
  for (const [, , , guide] of expectedNodes) {
    const chapter = await read("course" + guide + ".md");
    for (const heading of chapterHeadings) assert.match(chapter, new RegExp(heading));
  }

  const home = await read("course/index.md");
  const present = await read("course/present.md");
  const deck = await read("course/.vitepress/theme/components/PresentDeck.vue");
  const presentationCss = await read("course/.vitepress/theme/styles/presentation.css");
  assert.match(home, /layout: course-home/);
  assert.match(present, /layout: presentation/);
  assert.match(deck, /requestFullscreen/);
  assert.match(deck, /fullscreenNotice/);
  assert.match(deck, /overview-section-head/);
  assert.match(deck, /section\.scenes\[0\]\.index/);
  assert.match(deck, /keyToAction/);
  assert.match(deck, /aria-live/);
  assert.match(presentationCss, /--stage-readable:\s*1\.46em/);
  assert.match(presentationCss, /--stage-safe-x:\s*8em/);
  assert.match(presentationCss, /--stage-safe-y:\s*4\.5em/);
});

test("course source retires unsupported case framing and stale labels", async () => {
  const forbiddenCoursePhrases = [
    "真实案例剧场",
    "CASE THEATRE",
    "7 个真实案例",
    'kind: "case"',
    "Kooky",
    "Claude Tag",
  ];
  const files = await listCourseSourceFiles();

  for (const file of files) {
    const source = await read(file);
    for (const phrase of forbiddenCoursePhrases) {
      assert.ok(!source.includes(phrase), file + " contains forbidden phrase: " + phrase);
    }
  }
});

test("appendix routes render shared concept tool and template registries", async () => {
  const glossary = await read("course/appendix/glossary.md");
  const toolRadar = await read("course/appendix/tool-radar.md");
  const templates = await read("course/appendix/templates.md");
  const sourcePage = await read("course/sources.md");

  assert.match(glossary, /import \{ concepts \}/);
  assert.match(glossary, /KnowledgeAtlas/);
  assert.match(toolRadar, /import \{ toolCategories, toolEntryStatus \}/);
  assert.match(toolRadar, /ToolLandscape/);
  assert.match(templates, /import \{ templates \}/);
  assert.match(templates, /TemplateLibrary/);
  assert.match(sourcePage, /verifiedAt/);
  assert.match(sourcePage, /stability/);
});

test("link checker fails internal fixtures and warns on external fixtures", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  assert.equal(packageJson.scripts["check:links"], "node scripts/check-course-links.mjs");
  assert.equal(packageJson.scripts["check:links:external"], "node scripts/check-course-links.mjs --external");

  await assert.rejects(
    execFileAsync(process.execPath, ["scripts/check-course-links.mjs", "--fixture-broken-internal"]),
    (error) => {
      assert.equal(error.code, 1);
      assert.match(`${error.stdout}\n${error.stderr}`, /broken internal|不存在的内部链接/i);
      return true;
    },
  );

  const external = await execFileAsync(process.execPath, ["scripts/check-course-links.mjs", "--fixture-broken-external"]);
  assert.match(`${external.stdout}\n${external.stderr}`, /warning|警告|unreachable/i);
});

test("project documentation describes the approved teaching workflow", async () => {
  const readme = await read("README.md");
  const workflow = await read(".github/workflows/package-and-deploy.yml");

  assert.match(readme, /AI 协同方法论/);
  assert.match(readme, /9 个课程节点/);
  assert.match(readme, /80 分钟授课/);
  assert.match(readme, /15 分钟交流/);
  assert.match(readme, /32 个讲台场景/);
  assert.match(readme, /1920×1080/);
  assert.match(readme, /讲师模式/);
  assert.match(readme, /npm run preview/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /COURSE_BASE:\s*\/ai-coding-literacy-course\//);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
});

test("legacy static-site runtime remains retired", async () => {
  for (const legacyPath of ["index.html", "server.mjs", "styles.css", "styles", "src", "scripts/build-site.mjs", "tests/site.test.mjs"]) {
    await assert.rejects(access(legacyPath), "legacy path should be removed: " + legacyPath);
  }
});

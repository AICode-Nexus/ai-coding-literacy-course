import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (path) => readFile(path, "utf8");

test("lecture agenda is 80 minutes plus 15 minutes exchange", async () => {
  const { courseMeta, lectureSections } = await import("../course/.vitepress/data/course.js");

  assert.equal(lectureSections.reduce((sum, section) => sum + section.minutes, 0), 80);
  assert.equal(courseMeta.exchangeMinutes, 15);
  assert.equal(courseMeta.audienceSize, 1050);
  assert.equal(courseMeta.stageAspect, "16:9");
});

test("lecture scenes cover the complete visual teaching language", async () => {
  const { lectureScenes } = await import("../course/.vitepress/data/scenes.js");
  const kinds = new Set(lectureScenes.map((scene) => scene.kind));
  const ids = new Set(lectureScenes.map((scene) => scene.id));

  assert.ok(lectureScenes.length >= 28);
  assert.equal(ids.size, lectureScenes.length);

  for (const kind of ["thesis", "compare", "flow", "architecture", "case", "audience", "checklist"]) {
    assert.ok(kinds.has(kind), `missing scene kind ${kind}`);
  }

  for (const scene of lectureScenes) {
    assert.ok(scene.title.length >= 4);
    assert.ok(scene.section);
    assert.ok(scene.speakerNote.length >= 8);
  }
});

test("presentation navigation is deterministic", async () => {
  const { clampScene, keyToAction, sceneFromSearch, searchWithScene } = await import("../course/.vitepress/data/presentation.js");

  assert.equal(clampScene(-1, 30), 0);
  assert.equal(clampScene(40, 30), 29);
  assert.equal(sceneFromSearch("?scene=12", 30), 11);
  assert.equal(sceneFromSearch("?scene=oops", 30), 0);
  assert.equal(searchWithScene("?mode=teacher", 2), "?mode=teacher&scene=3");
  assert.equal(keyToAction("ArrowRight"), "next");
  assert.equal(keyToAction(" "), "next");
  assert.equal(keyToAction("ArrowLeft"), "previous");
  assert.equal(keyToAction("Home"), "first");
  assert.equal(keyToAction("End"), "last");
  assert.equal(keyToAction("f"), "fullscreen");
  assert.equal(keyToAction("o"), "overview");
  assert.equal(keyToAction("x"), null);
});

test("concepts and boundaries are stable and beginner-first", async () => {
  const { boundaryComparisons, concepts } = await import("../course/.vitepress/data/concepts.js");
  const names = new Set(concepts.map((concept) => concept.name));

  for (const name of ["Context Engineering", "Agent Loop", "Harness Engineering", "Evals", "Skills", "MCP", "Prompt Injection"]) {
    assert.ok(names.has(name), `missing ${name}`);
  }

  for (const concept of concepts) {
    assert.ok(concept.plain.length >= 20);
    assert.ok(concept.example.length >= 20);
    assert.ok(["core", "advanced", "frontier"].includes(concept.level));
    assert.ok(concept.sourceIds.length >= 1);
  }

  assert.deepEqual(boundaryComparisons.map((item) => item.id), [
    "prompt-context-harness-loop",
    "mcp-tool-agent",
    "single-subagent-team",
    "rag-living-knowledge",
  ]);
});

test("case theatre contains evidence, artifacts, checkpoints, and transfer lessons", async () => {
  const { courseCases } = await import("../course/.vitepress/data/cases.js");

  assert.ok(courseCases.length >= 7);
  assert.equal(courseCases.filter((item) => item.origin === "internal").length, 3);

  for (const item of courseCases) {
    assert.ok(item.context.length >= 20);
    assert.ok(item.moves.length >= 3);
    assert.ok(item.artifacts.length >= 2);
    assert.ok(item.checkpoints.length >= 2);
    assert.ok(item.transfer.length >= 20);
    assert.ok(item.sourceIds.length >= 1);
  }
});

test("source registry separates stable sources from dynamic tool entries", async () => {
  const { sources } = await import("../course/.vitepress/data/sources.js");

  for (const source of sources) {
    assert.match(source.verifiedAt, /^2026-07-13$/);
    assert.ok(["stable", "dynamic", "internal"].includes(source.stability));
    assert.ok(source.title && source.url);
  }

  assert.ok(sources.some((source) => source.id === "anthropic-context"));
  assert.ok(sources.some((source) => source.id === "openai-evals"));
  assert.ok(sources.some((source) => source.id === "mcp-architecture"));
});

test("task card generator returns a complete collaboration contract", async () => {
  const { buildTaskCard } = await import("../course/.vitepress/data/task-card.js");
  const card = buildTaskCard({
    task: "把需求说明预审成待确认问题",
    audience: "产品经理和导师",
    materials: "需求原文、历史讨论和现有流程",
    output: "问题清单、验收标准和风险",
    checks: "每个结论有原文依据",
    boundaries: "不得把讨论写成已确认事实",
  });

  assert.match(card, /目标/);
  assert.match(card, /材料/);
  assert.match(card, /交付物/);
  assert.match(card, /验收/);
  assert.match(card, /边界/);
  assert.match(card, /产品经理和导师/);
});

test("VitePress routes and dual layouts exist", async () => {
  for (const file of [
    "course/index.md",
    "course/present.md",
    "course/sources.md",
    "course/guide/00-start.md",
    "course/guide/01-shift.md",
    "course/guide/02-collaboration.md",
    "course/guide/03-context.md",
    "course/guide/04-agent-system.md",
    "course/guide/05-cases.md",
    "course/guide/06-quality.md",
    "course/guide/07-practice.md",
    "course/appendix/tool-radar.md",
    "course/.vitepress/theme/components/CourseHome.vue",
    "course/.vitepress/theme/components/PresentDeck.vue",
  ]) {
    await access(file);
  }

  const home = await read("course/index.md");
  const present = await read("course/present.md");
  const deck = await read("course/.vitepress/theme/components/PresentDeck.vue");

  assert.match(home, /layout: course-home/);
  assert.match(present, /layout: presentation/);
  assert.match(deck, /requestFullscreen/);
  assert.match(deck, /keyToAction/);
  assert.match(deck, /aria-live/);
});

# Scenario-Led AI Collaboration Course Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current seven-node, case-led course into the approved nine-node course “AI 协同方法论：从‘会用 AI’到‘善用 AI’”, with 32 readable lecture scenes and a matching self-study tutorial that visibly teaches concepts, tools, boundaries, and transferable methods.

**Architecture:** Keep the existing VitePress dual-mode shell and presentation navigation. Replace the course facts with normalized ESM registries for nodes, scenarios, concepts, tools, templates, scenes, and sources. Lecture scenes reference shared IDs instead of redefining facts; tutorial components resolve the same IDs into richer explanations. The presentation remains a CSS-only, offline-safe 16:9 surface, while the default VitePress layout supplies navigation, local search, responsive reading, and appendices.

**Tech Stack:** VitePress 1.6.4, Vue 3.5.39, JavaScript ESM data modules, Vue SFCs, CSS, Node.js built-in test runner, GitHub Pages, Node 22 CI.

## Global Constraints

- The official goal is to help campus hires form an AI-thinking and human-AI collaboration work mindset; model features are supporting knowledge, not the course destination.
- The session is 80 minutes of lecture plus 15 minutes of exchange for approximately 1050 learners.
- Use the approved nine node names, questions, order, and minute budgets without inventing a separate narrative.
- Begin with “AI 时代的 T 型人才”; do not reconnect the course to Kooky or an AI competition.
- All examples are broad “场景演示” or “应用示例”. Never fabricate a customer, internal project, business result, productivity percentage, or “真实案例” label.
- Lecture mode is primary: exactly 32 scenes, 16:9, 1920×1080 logical design, browser fullscreen, keyboard control, scene URL recovery, and direct access to all nine node starts.
- Put teaching content inside the 8% safe area. At 1920×1080, instructional text must be at least 28 logical pixels; navigation chrome may be smaller only when it is not part of the lesson.
- The presentation must not require runtime APIs, remote fonts, external images, or live network access.
- Every core concept appears in an overview scene and at least one later scenario scene.
- Tool examples are grouped by capability and selection criteria. Do not publish rankings, benchmark tables, unstable “best model” claims, prices, or context-window numbers.
- Dynamic tool entries include an official URL, verification date, and review interval. Stale entries display “待重新核验”.
- A 类 learners get the complete main method. Agent, Harness, Tracing, Worktree, and multi-agent depth is visibly marked as B-track material.
- Keep local base “/” and GitHub Pages base “/ai-coding-literacy-course/” working.
- Use test-first steps and make one atomic commit per task. Do not stage “course/.vitepress/cache/”.

## Target File Map

### Data

- Modify “course/.vitepress/data/course.js”: official metadata, nine nodes, guide routes, scene budgets, seven-step method, seven-day transfer plan.
- Modify “course/.vitepress/data/concepts.js”: foundation/core/advanced/frontier concepts and boundary comparisons.
- Create “course/.vitepress/data/tools.js”: seven capability categories, representatives, official URLs, selection criteria, and freshness logic.
- Create “course/.vitepress/data/scenarios.js”: nine broad scenario questions and their reusable teaching frames.
- Modify “course/.vitepress/data/scenes.js”: 32 lecture scenes referencing node, scenario, concept, and tool IDs.
- Modify “course/.vitepress/data/sources.js”: first-party sources, internal-source limits, stability, and verification metadata.
- Create “course/.vitepress/data/templates.js”: task card, context list, eval checklist, risk checklist, and retrospective template.
- Modify “course/.vitepress/data/task-card.js”: generate the task card from the shared template definition.
- Delete “course/.vitepress/data/cases.js”: retire the unsupported “real case” registry.
- Keep “course/.vitepress/data/presentation.js”: preserve its deterministic navigation API unless a failing test exposes a regression.

### Vue and CSS

- Modify “course/.vitepress/theme/components/CourseHome.vue”.
- Modify “course/.vitepress/theme/components/PresentDeck.vue”.
- Modify “course/.vitepress/theme/components/StageScene.vue”.
- Modify “course/.vitepress/theme/components/StageVisual.vue”.
- Create “course/.vitepress/theme/components/ScenarioFrame.vue”.
- Create “course/.vitepress/theme/components/KnowledgeAtlas.vue”.
- Create “course/.vitepress/theme/components/ToolLandscape.vue”.
- Create “course/.vitepress/theme/components/TemplateLibrary.vue”.
- Delete “course/.vitepress/theme/components/CaseTheatre.vue”.
- Modify “course/.vitepress/theme/index.ts”.
- Modify “course/.vitepress/theme/styles/presentation.css”.
- Modify “course/.vitepress/theme/styles/components.css”.
- Modify “course/.vitepress/theme/styles/docs.css”.

### Routes and Documentation

- Modify “course/.vitepress/config.mts”, “course/index.md”, “course/sources.md”, and “README.md”.
- Modify “course/guide/00-start.md”.
- Create “course/guide/01-t-shaped.md”.
- Create “course/guide/02-collaboration-shift.md”.
- Create “course/guide/03-ai-landscape.md”.
- Create “course/guide/04-method.md”.
- Create “course/guide/05-context.md”.
- Create “course/guide/06-agent.md”.
- Create “course/guide/07-quality.md”.
- Create “course/guide/08-workflow.md”.
- Create “course/guide/09-transfer.md”.
- Delete the seven superseded guide files: “01-shift.md”, “02-collaboration.md”, “03-context.md”, “04-agent-system.md”, “05-cases.md”, “06-quality.md”, and “07-practice.md”.
- Create “course/appendix/glossary.md” and “course/appendix/templates.md”.
- Modify “course/appendix/tool-radar.md”.
- Create “scripts/check-course-links.mjs”.
- Modify “package.json” and “tests/course.test.mjs”.

---

### Task 1: Replace the old case-led test contract with the approved course contract

**Files:**
- Modify: “tests/course.test.mjs”

**Interfaces:**
- Consumes the approved specification.
- Produces failing tests for the nine-node agenda, shared IDs, 32 scenes, tutorial routes, generic scenarios, tool metadata, and retired case language.

- [ ] **Step 1: Add the exact node contract**

Replace the old seven-section agenda assertion with:

~~~js
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
~~~

- [ ] **Step 2: Add normalized content registry tests**

Add tests that:

1. Require exactly nine scenarios, one for every node.
2. Accept only “场景演示” and “应用示例” labels.
3. Require each scenario to expose question, ordinary approach, collaborative approach, transferable roles, concept IDs, checkpoints, and takeaway.
4. Require concept IDs and tool category IDs referenced by scenarios to exist.
5. Require all seven tool categories and freshness metadata.
6. Require five shared templates.

Use these exact category IDs:

~~~js
const expectedToolCategoryIds = [
  "general-assistant",
  "deep-research",
  "coding-agent",
  "agent-workflow",
  "multimodal-creation",
  "knowledge-connection",
  "capability-reuse",
];
~~~

- [ ] **Step 3: Add the concept reuse contract**

Define the required core IDs:

~~~js
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
~~~

For every concept, require:

~~~js
assert.ok(concept.definition.length >= 20);
assert.ok(concept.solves.length >= 12);
assert.ok(concept.notFor.length >= 12);
assert.ok(["core", "advanced", "frontier"].includes(concept.level));
assert.ok(concept.nodeIds.length >= 1);
assert.ok(concept.scenarioIds.length >= 1);
assert.ok(concept.sourceIds.length >= 1);
~~~

For every required core concept, require its ID in the “concept-panorama” scene and in at least one other scene.

- [ ] **Step 4: Add the lecture contract**

Require:

~~~js
assert.equal(lectureScenes.length, 32);
assert.deepEqual(new Set(lectureScenes.map((item) => item.section)), new Set(expectedNodes.map(([id]) => id)));
assert.ok(!lectureScenes.some((item) => item.kind === "case"));
assert.ok(!lectureScenes.some((item) => /真实案例|CASE THEATRE/i.test(JSON.stringify(item))));
~~~

Allow these scene kinds:

~~~js
const requiredKinds = ["thesis", "compare", "flow", "architecture", "audience", "demo", "checklist", "scenario"];
~~~

For every scene, require a unique ID, valid node ID, non-empty title/body/takeaway, valid shared references, a visual object, and structured notes with:

~~~js
["purpose", "substitutions", "optionalQuestion", "boundary", "advanced"]
~~~

- [ ] **Step 5: Add route and wording tests**

Replace the old guide paths with “00-start” plus the nine approved guide files and three appendix files. Read course source files, excluding “docs/superpowers”, and reject:

~~~js
const forbiddenCoursePhrases = [
  "真实案例剧场",
  "CASE THEATRE",
  "7 个真实案例",
  'kind: "case"',
  "Kooky",
  "Claude Tag",
];
~~~

The test should also verify each of the nine chapter files contains these headings:

~~~js
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
~~~

- [ ] **Step 6: Run the focused tests and confirm the intended failures**

Run:

~~~bash
node --test --test-name-pattern="nine-node|registry|concept reuse|lecture contract|route and wording" tests/course.test.mjs
~~~

Expected: FAIL because the current data has seven nodes, imports for “tools.js”, “scenarios.js”, and “templates.js” do not exist, and old case routes and wording remain.

- [ ] **Step 7: Commit the failing contract**

~~~bash
git add tests/course.test.mjs
git commit -m "test(course): define scenario-led curriculum contract"
~~~

---

### Task 2: Build the nine-node course, scenario, and template registries

**Files:**
- Modify: “course/.vitepress/data/course.js”
- Create: “course/.vitepress/data/scenarios.js”
- Create: “course/.vitepress/data/templates.js”
- Modify: “course/.vitepress/data/task-card.js”
- Delete: “course/.vitepress/data/cases.js”

**Interfaces:**
- Produces “courseMeta”, “lectureSections”, “sectionById”, “collaborationSteps”, “sevenDayTraining”, “scenarios”, “scenarioById”, “templates”, “templateById”, and “buildTaskCard”.
- No Vue component should hard-code a guide route or scenario question after this task.

- [ ] **Step 1: Run only the course and scenario tests**

~~~bash
node --test --test-name-pattern="nine-node|registry|task card" tests/course.test.mjs
~~~

Expected: FAIL on seven existing sections and missing scenario/template modules.

- [ ] **Step 2: Replace the course metadata and section array**

Use this metadata:

~~~js
export const courseMeta = {
  title: "AI 协同方法论：从“会用 AI”到“善用 AI”",
  shortTitle: "AI 协同方法论",
  subtitle: "形成 AI 思维，把专业判断组织进可验收的人机协作流程",
  goal: "帮助校招生掌握怎么用 AI 提效、用什么思路用 AI，形成“人机协作”的工作思维。",
  audience: "具备通用 AI 基础的校招生，以 A 类学员为主并兼顾 B 类学员",
  audienceSize: 1050,
  teachingMinutes: 80,
  exchangeMinutes: 15,
  stageAspect: "16:9",
  stageResolution: "1920×1080",
  outputs: ["一张 AI 协同任务卡", "一份三层验收清单", "一个岗位小流程改造方案", "一份 7 天行动计划"],
};
~~~

Create all nine section objects from the following fixed matrix:

| ID | Order | Minutes | Scene budget | Guide | Question |
| --- | --- | ---: | ---: | --- | --- |
| t-shaped | 01 | 8 | 4 | /guide/01-t-shaped | AI 时代，只做好本职工作就够了吗？ |
| collaboration-shift | 02 | 4 | 3 | /guide/02-collaboration-shift | 大家都会用 AI，为什么结果差距仍然很大？ |
| ai-landscape | 03 | 12 | 5 | /guide/03-ai-landscape | 面对一项任务，应该选择哪个模型和工具？ |
| method | 04 | 10 | 4 | /guide/04-method | 收到一句“你先弄一下”，第一步是什么？ |
| context | 05 | 9 | 3 | /guide/05-context | 材料越多，AI 为什么反而越容易混乱？ |
| agent | 06 | 12 | 4 | /guide/06-agent | 一个聊天框做不完，要不要使用多个 Agent？ |
| quality | 07 | 11 | 4 | /guide/07-quality | AI 已经给出结果，你敢直接交付吗？ |
| workflow | 08 | 8 | 3 | /guide/08-workflow | 这次做完了，下次还要从头再来吗？ |
| transfer | 09 | 6 | 2 | /guide/09-transfer | 回到自己的岗位，明天可以改造哪个小流程？ |

Export “sectionById” from the final array. Keep the approved seven collaboration steps and seven-day plan, but revise examples to remain cross-role and generic.

- [ ] **Step 3: Create all nine generic scenario records**

Use one record per section with this shape:

~~~js
{
  id: "method-vague-request",
  sectionId: "method",
  label: "场景演示",
  question: "收到一句“你先弄一下”，第一步是什么？",
  ordinary: "马上打开聊天框，把原话转交给 AI。",
  collaborative: "先确认目标、对象、材料、交付物、验收和边界，再决定 AI 先做哪一段。",
  roleDirections: ["研发：模糊改动", "产品：需求预审", "运营：活动方案", "职能：材料整理"],
  conceptIds: ["goal", "context", "prompt", "output", "eval", "guardrails", "loop"],
  toolCategoryIds: ["general-assistant", "coding-agent", "capability-reuse"],
  checkpoints: ["目标是否可观察", "缺失信息是否标明", "交付物能否逐项验收"],
  takeaway: "第一步不是写更长的 Prompt，而是把模糊要求改造成协同契约。",
}
~~~

Use these exact IDs and teaching contrasts for the other eight scenarios:

| Section | Scenario ID | Ordinary approach | Collaborative approach |
| --- | --- | --- | --- |
| t-shaped | t-shaped-adjacent-loop | 只完成自己的单点任务，把相邻环节视为别人的工作 | 保持岗位纵深，同时理解相邻输入输出并借助 AI 跑通一个小闭环 |
| collaboration-shift | shift-answer-to-system | 把 AI 当问答、润色或一次性生成工具 | 把 AI 放入目标、材料、执行、检查和沉淀的完整链路 |
| ai-landscape | landscape-model-tool-choice | 先问哪个工具最强，再把任务塞进去 | 先按难度、上下文、多模态、工具、数据安全和总成本判断能力组合 |
| context | context-signal-over-volume | 一次塞入所有资料，希望窗口越大效果越好 | 先给高信号地图，再按需检索、压缩并保留可追溯来源 |
| agent | agent-orchestration-choice | 因为任务复杂就堆多个 Agent | 默认最简单结构，只在任务独立、上下文隔离或需要协商时增加 Agent |
| quality | quality-delivery-confidence | 结果读起来通顺就直接交付 | 用确定性检查、AI 语义检查、责任人确认和高风险审批分层验收 |
| workflow | workflow-reuse-or-restart | 每次重新聊天、重新解释、重新检查 | 把稳定做法沉淀为模板、规则、检查清单、Skill 和可观察流程 |
| transfer | transfer-first-small-loop | 从搭一个复杂系统或学习更多工具开始 | 选择岗位内一个低风险、可验收、可复盘的小流程跑通七步法 |

- [ ] **Step 4: Create the five reusable templates**

Export these exact IDs:

~~~js
[
  "task-card",
  "context-checklist",
  "eval-checklist",
  "risk-checklist",
  "retrospective",
]
~~~

Each template contains “title”, “purpose”, “fields”, “copyText”, and “relatedNodeIds”. The task card fields are exactly:

~~~js
["目标", "使用者或责任人", "材料与来源", "动作与顺序", "交付物与格式", "验收标准", "权限、边界与停止条件"]
~~~

Make “buildTaskCard” read these labels from “templateById['task-card']” so the generator and appendix cannot drift.

- [ ] **Step 5: Delete the case registry**

Delete “course/.vitepress/data/cases.js”. Do not migrate unsupported result claims into another file. Source-backed internal documents remain only in “sources.js” as context and provenance, not as a “real case” collection.

- [ ] **Step 6: Run the focused tests**

~~~bash
node --test --test-name-pattern="nine-node|registry|task card" tests/course.test.mjs
~~~

Expected: PASS for course, scenarios, templates, and task-card tests. Tests that import tools or the new scene contract still fail.

- [ ] **Step 7: Commit the normalized curriculum skeleton**

~~~bash
git add course/.vitepress/data/course.js course/.vitepress/data/scenarios.js course/.vitepress/data/templates.js course/.vitepress/data/task-card.js course/.vitepress/data/cases.js
git commit -m "feat(course): add nine-node scenario curriculum"
~~~

---

### Task 3: Normalize concepts, tools, and first-party sources

**Files:**
- Modify: “course/.vitepress/data/concepts.js”
- Create: “course/.vitepress/data/tools.js”
- Modify: “course/.vitepress/data/sources.js”

**Interfaces:**
- Produces stable lookup maps “conceptById”, “toolCategoryById”, and “sourceById”.
- Tool freshness is deterministic when a reference date is supplied.

- [ ] **Step 1: Run the concept and tool tests**

~~~bash
node --test --test-name-pattern="concept|tool|source registry" tests/course.test.mjs
~~~

Expected: FAIL because the old concept schema lacks “solves”, “notFor”, “nodeIds”, and “scenarioIds”, and “tools.js” is absent.

- [ ] **Step 2: Replace the concept schema**

Every concept uses:

~~~js
{
  id: "mcp",
  name: "MCP",
  label: "模型上下文协议",
  group: "agent-system",
  level: "advanced",
  definition: "规定 AI 应用如何发现并访问外部 tools、resources 与 prompts 的开放协议。",
  solves: "降低 AI 主机连接外部能力与上下文时的适配成本。",
  notFor: "它不是 Agent，也不负责替业务目标规划和编排任务。",
  nodeIds: ["ai-landscape", "agent"],
  scenarioIds: ["landscape-model-tool-choice", "agent-orchestration-choice"],
  sourceIds: ["mcp-architecture"],
}
~~~

Include these groups and IDs:

| Group | Concept IDs |
| --- | --- |
| foundation | llm, token, context-window, reasoning, multimodal, hallucination |
| collaboration | goal, context, prompt, output, eval, guardrails, loop |
| agent-system | tool, agent, mcp, skill, subagent, worktree, tracing, harness |
| frontier | agent-team, ai-maintained-wiki, loop-engineering |

Use “core” for foundation and collaboration plus “tool” and “agent”; use “advanced” for MCP, Skill, Subagent, Worktree, Tracing, and Harness; use “frontier” for Agent Team, AI-maintained Wiki, and Loop Engineering.

Retain these four boundary board IDs:

~~~js
[
  "prompt-context-harness-loop",
  "mcp-tool-agent",
  "single-subagent-team",
  "rag-living-knowledge",
]
~~~

For project-level persistent instructions, use “AGENTS.md / CLAUDE.md” and the generic label “项目规则与持久指令”; never restore “Claude Tag”.

- [ ] **Step 3: Create seven tool capability categories**

Each raw category contains “id”, “name”, “purpose”, “selectionCriteria”, “risks”, “reviewDays”, and “representatives”. Each raw representative contains “name”, “officialUrl”, “verifiedAt”, and “note”. Normalize the exported categories so every representative also receives its parent category’s “reviewDays”.

Use this exact category coverage:

| ID | Representatives | Selection focus |
| --- | --- | --- |
| general-assistant | 星火, ChatGPT, Claude, Gemini, 豆包, Kimi, 通义千问, DeepSeek | 推理、上下文、多模态、隐私、总成本 |
| deep-research | Deep Research、联网检索与资料分析能力 | 来源质量、引用可追溯、时效 |
| coding-agent | Codex, Claude Code, Cursor, GitHub Copilot | 仓库理解、工具调用、测试、权限、回滚 |
| agent-workflow | Dify, Coze, n8n | 流程编排、系统连接、审批、日志、恢复 |
| multimodal-creation | 即梦, 可灵, Midjourney | 可控性、版权、素材边界、交付格式 |
| knowledge-connection | RAG, 知识库, MCP, 企业数据连接器 | 权威来源、权限、更新、可追溯 |
| capability-reuse | Prompt 模板, 规则文件, Skill, 检查清单 | 版本化、稳定复用、可评测 |

Do not attach scores, rankings, prices, model versions, or “recommended” badges to representatives.

- [ ] **Step 4: Add explicit freshness behavior**

Implement:

~~~js
export function toolEntryStatus(entry, asOf = new Date()) {
  const verified = new Date(entry.verifiedAt + "T00:00:00Z");
  const ageDays = Math.floor((asOf.getTime() - verified.getTime()) / 86400000);
  return ageDays > entry.reviewDays ? "待重新核验" : "已核验";
}
~~~

Normalize with:

~~~js
export const toolCategories = rawToolCategories.map((category) => ({
  ...category,
  representatives: category.representatives.map((entry) => ({
    ...entry,
    reviewDays: category.reviewDays,
  })),
}));
~~~

Add deterministic status tests using “2026-07-13” and “2026-10-20”.

- [ ] **Step 5: Reconcile first-party sources**

Keep internal documents for the official goal and learner statistics, with “stability: internal”. Keep or add first-party stable records for:

- Anthropic context engineering.
- OpenAI Agents, guardrails, evals, and sandboxes.
- Model Context Protocol architecture.
- Claude Code Agent Teams and subagents, marked experimental where applicable.
- VitePress.

Dynamic tool representatives link directly to their official home or documentation page and retain “verifiedAt: 2026-07-13”. The source description must state that representative products are examples, not rankings.

- [ ] **Step 6: Run the focused tests**

~~~bash
node --test --test-name-pattern="concept|tool|source registry" tests/course.test.mjs
~~~

Expected: PASS for schema, maturity, boundary, URL, verification-date, and freshness behavior. Concept reuse through lecture scenes remains red until Task 4.

- [ ] **Step 7: Commit the knowledge registries**

~~~bash
git add course/.vitepress/data/concepts.js course/.vitepress/data/tools.js course/.vitepress/data/sources.js
git commit -m "feat(course): normalize concepts tools and sources"
~~~

---

### Task 4: Rewrite the lecture as 32 scenario-led scenes

**Files:**
- Modify: “course/.vitepress/data/scenes.js”
- Modify: “course/.vitepress/theme/components/PresentDeck.vue”
- Modify: “course/.vitepress/theme/components/StageScene.vue”
- Modify: “course/.vitepress/theme/components/StageVisual.vue”
- Modify: “course/.vitepress/theme/styles/presentation.css”

**Interfaces:**
- “lectureScenes” references valid shared IDs.
- “PresentDeck” preserves the existing “clampScene”, “sceneFromSearch”, “searchWithScene”, “keyToAction”, fullscreen, overview, and live-region behavior.
- Speaker notes become structured teaching support rather than a fictional script.

- [ ] **Step 1: Run the lecture contract**

~~~bash
node --test --test-name-pattern="lecture contract|concept reuse|presentation navigation" tests/course.test.mjs
~~~

Expected: FAIL on old node IDs, old “case” scenes, string speaker notes, and missing panorama reuse; navigation helpers should still pass.

- [ ] **Step 2: Create the fixed 32-scene blueprint**

Implement this exact scene allocation:

| # | Section | Scene ID | Kind | Visual | Teaching job |
| ---: | --- | --- | --- | --- | --- |
| 1 | t-shaped | t-shaped-question | audience | poll | Ask whether job depth alone is enough |
| 2 | t-shaped | t-shaped-map | architecture | tshape | Show professional depth plus horizontal AI collaboration |
| 3 | t-shaped | adjacent-loop | compare | beforeAfter | Contrast handoff-only work with a controlled adjacent-role loop |
| 4 | t-shaped | t-shaped-takeaway | thesis | split | Fix “T-shaped does not mean replacing every role” |
| 5 | collaboration-shift | learner-evidence | audience | columns | Display the four sourced learner adoption statistics |
| 6 | collaboration-shift | usage-maturity | compare | steps | Move from answer to task to workflow |
| 7 | collaboration-shift | collaboration-gap | scenario | beforeAfter | Show why equal tool access creates unequal outcomes |
| 8 | ai-landscape | llm-foundation-map | architecture | layers | Place LLM, Token, window, reasoning, multimodal, hallucination |
| 9 | ai-landscape | model-choice-six | demo | modelSelector | Use six model-selection dimensions |
| 10 | ai-landscape | tool-landscape | architecture | toolLandscape | Show seven tool categories without rankings |
| 11 | ai-landscape | concept-panorama | architecture | knowledgeMap | Place Prompt, Context, Tool, Agent, MCP, Skill, Harness, Eval, Guardrails |
| 12 | ai-landscape | selection-total-cost | checklist | decision | Include latency, first-pass success, rework, context, and risk |
| 13 | method | vague-request | audience | rewrite | Turn “你先弄一下” into a task question |
| 14 | method | seven-step-map | flow | steps | Goal to Loop master map |
| 15 | method | task-contract | checklist | contract | Show the seven task-card fields |
| 16 | method | method-static-demo | demo | scenario | Show target, input, expected artifact, and fallback result |
| 17 | context | context-noise | compare | signal | More material can reduce useful attention |
| 18 | context | context-supply | flow | pipeline | Map first, retrieve and compress on demand |
| 19 | context | durable-context | architecture | drift | Separate intent, task state, facts, and drift |
| 20 | agent | agent-loop | architecture | agentLoop | Goal, Plan, Act, Observe, Verify, Continue or Stop |
| 21 | agent | tool-mcp-skill | architecture | constellation | Tool is action, MCP is connection, Skill is reusable practice |
| 22 | agent | orchestration-choice | compare | decision | Default single Agent; add Subagent or Team only for a reason |
| 23 | agent | harness-worktree | checklist | console | Show permissions, sandbox, tests, state, Worktree, approval |
| 24 | quality | delivery-question | audience | poll | Ask whether fluent output is deliverable |
| 25 | quality | quality-pyramid | architecture | pyramid | Deterministic, semantic, accountable checks |
| 26 | quality | trace-eval | flow | trace | Inspect trajectory, tool choice, evidence, and result |
| 27 | quality | risk-responsibility | checklist | riskMatrix | Place approval by permission and impact; keep human responsibility |
| 28 | workflow | reuse-ladder | compare | steps | Prompt to template to checklist to Skill to workflow |
| 29 | workflow | asset-loop | architecture | assetLoop | Feed evidence and retrospective back into reusable assets |
| 30 | workflow | workflow-redesign | scenario | beforeAfter | Remove, merge, reorder, and automate steps instead of accelerating all |
| 31 | transfer | role-transfer | architecture | roleTransfer | Give R&D, product, operations, and function entry points |
| 32 | transfer | seven-day-action | thesis | closing | Ask for one small process and close with the seven-day plan |

Every scene includes “conceptIds”, “toolCategoryIds”, and “scenarioId” when applicable. Scene 11 contains every required core concept ID. Each required core ID appears again in at least one of scenes 13–30.

- [ ] **Step 3: Use structured notes**

Use this complete shape for every scene:

~~~js
notes: {
  purpose: "让学员先判断自己是否只在单点使用 AI，并引出完整工作链。",
  substitutions: ["研发：一次改动", "产品：一次需求预审", "运营：一次活动方案", "职能：一次材料整理"],
  optionalQuestion: "同一个工具，什么环节最容易让结果拉开差距？",
  boundary: "不要把会调用更多工具等同于更成熟的人机协作。",
  advanced: "时间允许时补充：复杂任务的差距还来自 Harness 与 Eval。",
}
~~~

Wording varies by scene, but all five fields must contain a concrete teaching instruction. “advanced” may say “本屏不展开 B 层内容” when no depth branch is needed; it may not be empty.

- [ ] **Step 4: Add the four new visual renderers**

In “StageVisual.vue”, add:

- “modelSelector”: six equally weighted decision cards.
- “toolLandscape”: seven capability lanes with representative names visually secondary to selection criteria.
- “knowledgeMap”: a center collaboration loop with concept groups around it.
- “scenario”: ordinary versus collaborative approach plus checkpoints.
- “assetLoop”: reusable assets feeding the next run.
- “roleTransfer”: four role entry points converging on the same seven-step method.

Remove the “case” renderer. Reuse existing renderers for the other 26 scenes.

- [ ] **Step 5: Make the overview node-aware**

In “PresentDeck.vue” compute the first scene index for each “lectureSections” entry. Add a nine-button node rail at the top of the overview. Selecting a node calls the existing “goTo(index)” and closes the overview. Keep the 32-scene grid below it.

Render speaker notes as labeled fields:

~~~vue
<dl>
  <div><dt>教学目的</dt><dd>{{ activeScene.notes.purpose }}</dd></div>
  <div><dt>可代入</dt><dd>{{ activeScene.notes.substitutions.join(" · ") }}</dd></div>
  <div><dt>可选追问</dt><dd>{{ activeScene.notes.optionalQuestion }}</dd></div>
  <div><dt>边界提醒</dt><dd>{{ activeScene.notes.boundary }}</dd></div>
  <div><dt>B 层延伸</dt><dd>{{ activeScene.notes.advanced }}</dd></div>
</dl>
~~~

- [ ] **Step 6: Enforce the stage safe area and readable type**

At the 1920×1080 logical size:

- Set stage content padding to at least 8em horizontally and 4.5em vertically when the frame base is 19.2 pixels.
- Define “--stage-readable: 1.46em” for 28-pixel instructional text.
- Keep titles at 64 logical pixels or larger.
- Apply the 28-pixel minimum to teaching labels, card copy, diagrams, body, and takeaway; presentation controls and the page counter may remain smaller.
- Reduce card counts or copy length instead of shrinking below the minimum.
- Keep “overflow: hidden” on the frame and every scene.

- [ ] **Step 7: Run lecture and navigation tests**

~~~bash
node --test --test-name-pattern="lecture contract|concept reuse|presentation navigation" tests/course.test.mjs
~~~

Expected: PASS with exactly 32 scenes, all nine sections, no “case” kind, valid shared references, structured notes, and unchanged keyboard/URL helper results.

- [ ] **Step 8: Commit the lecture rebuild**

~~~bash
git add course/.vitepress/data/scenes.js course/.vitepress/theme/components/PresentDeck.vue course/.vitepress/theme/components/StageScene.vue course/.vitepress/theme/components/StageVisual.vue course/.vitepress/theme/styles/presentation.css
git commit -m "feat(course): rebuild lecture as 32 scenario scenes"
~~~

---

### Task 5: Replace Case Theatre with shared tutorial components

**Files:**
- Create: “course/.vitepress/theme/components/ScenarioFrame.vue”
- Create: “course/.vitepress/theme/components/KnowledgeAtlas.vue”
- Create: “course/.vitepress/theme/components/ToolLandscape.vue”
- Create: “course/.vitepress/theme/components/TemplateLibrary.vue”
- Delete: “course/.vitepress/theme/components/CaseTheatre.vue”
- Modify: “course/.vitepress/theme/index.ts”
- Modify: “course/.vitepress/theme/styles/components.css”
- Modify: “course/.vitepress/theme/styles/docs.css”

**Interfaces:**
- Markdown chapters can render shared facts with “scenario-id”, “concept-ids”, and “category-ids” props.
- Core content remains visible as static HTML if optional interactions fail.

- [ ] **Step 1: Add component existence and retired-component tests**

Require the four new component files, reject “CaseTheatre.vue”, and inspect “theme/index.ts” for the four new global registrations and absence of “CaseTheatre”.

Run:

~~~bash
node --test --test-name-pattern="tutorial components" tests/course.test.mjs
~~~

Expected: FAIL because the new files do not exist and the old component is still registered.

- [ ] **Step 2: Implement ScenarioFrame**

Props:

~~~js
const props = defineProps({
  scenarioId: { type: String, required: true },
});
~~~

Resolve “scenarioById[scenarioId]” and render, in source order:

1. “场景演示” or “应用示例” label.
2. Question.
3. Ordinary and collaborative approaches.
4. Related concept chips and tool-category chips.
5. Checkpoints.
6. Four role-direction prompts.
7. Takeaway.

Do not render result metrics or a “real case” origin badge.

- [ ] **Step 3: Implement KnowledgeAtlas**

Accept “conceptIds” as an array. Resolve concepts and group them by “foundation”, “collaboration”, “agent-system”, and “frontier”. Every card displays:

- label and maturity.
- definition.
- “解决” text.
- “不能替代” text.
- related node links.

The map is static-first; no click is required to reveal the definition.

- [ ] **Step 4: Implement ToolLandscape**

Accept optional “categoryIds”; default to all seven categories. Render category purpose, selection criteria, risks, representative official links, verification date, and status from “toolEntryStatus”. Representatives are inline examples without rank numbers.

- [ ] **Step 5: Implement TemplateLibrary**

Render all five templates with complete text visible. A native “button” copies one template; if clipboard access fails, keep the text selectable and show “请手动复制”. Reuse “TaskCardLab” for the editable task card, but import labels from “templates.js”.

- [ ] **Step 6: Remove Case Theatre and its CSS**

Delete “CaseTheatre.vue”, remove its import and registration, and replace “case-*” presentation-independent styles with “scenario-*”, “knowledge-atlas-*”, “tool-landscape-*”, and “template-library-*” classes.

Add clear “:focus-visible” outlines to every button and link. At 375, 768, 1440, and 1920 widths, cards collapse without horizontal page overflow; only intentionally scrollable category rails may scroll internally.

- [ ] **Step 7: Run component tests and build**

~~~bash
node --test --test-name-pattern="tutorial components" tests/course.test.mjs
npm run build
~~~

Expected: both commands exit 0. Generated HTML contains component content without a runtime network dependency.

- [ ] **Step 8: Commit the shared teaching components**

~~~bash
git add course/.vitepress/theme/components course/.vitepress/theme/index.ts course/.vitepress/theme/styles/components.css course/.vitepress/theme/styles/docs.css
git commit -m "feat(course): add shared scenario learning components"
~~~

---

### Task 6: Rewrite home, navigation, and the ten tutorial routes

**Files:**
- Modify: “course/.vitepress/config.mts”
- Modify: “course/.vitepress/theme/components/CourseHome.vue”
- Modify: “course/index.md”
- Modify: “course/guide/00-start.md”
- Create: nine approved chapter files.
- Delete: seven superseded chapter files.
- Modify: “README.md”

**Interfaces:**
- Home route, lecture overview, guide sidebar, and “lectureSections” show the same nine names.
- Every chapter follows the approved nine-part teaching structure.

- [ ] **Step 1: Run route and wording tests**

~~~bash
node --test --test-name-pattern="route and wording|VitePress routes|project documentation" tests/course.test.mjs
~~~

Expected: FAIL on missing new files, stale sidebar links, old home case strip, and old chapter wording.

- [ ] **Step 2: Replace the sidebar and nav**

Use “/guide/00-start” for “课程地图”, “/guide/01-t-shaped” for “教材”, “/present” for “讲师模式”, and “/sources” for “来源”.

The guide sidebar order is:

~~~text
00 课程地图
01 AI 时代的 T 型人才
02 从工具使用到人机协同
03 AI 基础、模型与工具全景
04 AI 协同七步法
05 Context：组织正确的信息
06 Agent：从回答走向行动
07 质量、安全与人的责任
08 从一次提效到流程重构
09 岗位迁移与行动计划
附录：概念词典 / 工具雷达 / 模板库 / 来源与核验
~~~

- [ ] **Step 3: Rewrite CourseHome from shared data**

Remove the “courseCases” import, case marquee, “案例” navigation item, and fixed “32 / 7 / 4 / 1” proof copy.

Show:

- Official course goal.
- Equal “开始讲课” and “课后学习” entries.
- “9 个课程节点 / 32 个讲台场景 / 80+15 分钟 / 1050 人大课”.
- Nine route rows from “lectureSections”.
- A scenario-question strip from “scenarios”, labeled “场景命题”.
- Four outputs from “courseMeta.outputs”.

Every route link uses “section.guide”; remove the nested conditional route expression.

- [ ] **Step 4: Rewrite the course map**

“course/guide/00-start.md” must explain:

- Official goal and audience assumptions.
- Sourced adoption statistics.
- “先给地图，再走路线”.
- Nine-node 80-minute table.
- A/B learning tracks.
- Lecture versus self-study use.
- Four outputs and 15-minute exchange.
- Stable versus dynamic knowledge maintenance.

Embed “KnowledgeAtlas” for the core overview and “ToolLandscape” for the category overview.

- [ ] **Step 5: Create the nine chapters**

Each file uses the nine required headings. Use this fixed chapter thesis and scenario ID:

| File | Chapter thesis | Scenario ID |
| --- | --- | --- |
| 01-t-shaped.md | 专业判断形成纵深，AI 协同扩大横向闭环 | t-shaped-adjacent-loop |
| 02-collaboration-shift.md | 差距从工具熟练度转向任务组织能力 | shift-answer-to-system |
| 03-ai-landscape.md | 先看任务约束，再选择能力组合 | landscape-model-tool-choice |
| 04-method.md | 先签清楚协同契约，再开始生成 | method-vague-request |
| 05-context.md | 上下文工程管理有限注意力与可信来源 | context-signal-over-volume |
| 06-agent.md | 默认最简单结构，按独立性与边界增加 Agent | agent-orchestration-choice |
| 07-quality.md | 流畅不是可靠，交付必须有证据与责任人 | quality-delivery-confidence |
| 08-workflow.md | 真正的提效来自资产复用与流程重构 | workflow-reuse-or-restart |
| 09-transfer.md | 从一个低风险、可验收的小流程开始迁移 | transfer-first-small-loop |

Every chapter embeds its “ScenarioFrame”, a relevant “KnowledgeAtlas”, and “ToolLandscape” subset. Each “岗位迁移” section includes four short directions: 研发、产品、运营、职能. Keep them generic and let the instructor or learner substitute real work.

- [ ] **Step 6: Delete superseded routes**

Delete the seven old guide files after all inbound links have moved. Do not leave a page titled “真实案例”. The new workflow and transfer chapters absorb reusable parts of the former case and practice material without preserving unsupported case claims.

- [ ] **Step 7: Update README**

Document:

- The official course title and goal.
- 9-node content map.
- 80-minute lecture plus 15-minute exchange.
- 32-scene 1920×1080 lecture mode.
- Keyboard shortcuts including N for notes.
- New guide and appendix routes.
- Shared data ownership.
- “npm test”, “npm run build”, local preview, Pages base build, and link-check commands.

- [ ] **Step 8: Run route tests and local build**

~~~bash
node --test --test-name-pattern="route and wording|VitePress routes|project documentation" tests/course.test.mjs
npm run build
~~~

Expected: PASS and a successful VitePress build with all ten guide HTML files.

- [ ] **Step 9: Commit the tutorial rewrite**

~~~bash
git add course/.vitepress/config.mts course/.vitepress/theme/components/CourseHome.vue course/index.md course/guide README.md
git commit -m "feat(course): publish nine-node self-study tutorial"
~~~

---

### Task 7: Add the glossary, tool radar, templates, source log, and link checks

**Files:**
- Create: “course/appendix/glossary.md”
- Modify: “course/appendix/tool-radar.md”
- Create: “course/appendix/templates.md”
- Modify: “course/sources.md”
- Create: “scripts/check-course-links.mjs”
- Modify: “package.json”
- Modify: “tests/course.test.mjs”

**Interfaces:**
- Appendices render shared data, not duplicate definitions.
- Link checking fails for broken internal routes but reports external failures without blocking the course build.

- [ ] **Step 1: Add appendix and link-check tests**

Require:

- Glossary imports “concepts”.
- Tool radar imports “toolCategories” and “toolEntryStatus”.
- Templates imports “templates”.
- Sources renders stability and verification information.
- “package.json” contains “check:links” and “check:links:external”.
- The internal checker reports a missing route with a non-zero exit code in fixture mode.
- External-check mode returns zero while printing a warning for an unreachable URL.

Run:

~~~bash
node --test --test-name-pattern="appendix|link checker" tests/course.test.mjs
~~~

Expected: FAIL because two routes and the checker do not exist, and the tool radar remains static.

- [ ] **Step 2: Create the data-driven glossary**

Group concepts by maturity. Each entry displays definition, solves, not-for boundary, related node links, scenario links, and first-party source links. Add a compact relationship legend for:

- Prompt / Context / Harness / Loop.
- MCP / Tool / Agent.
- Single Agent / Subagent / Agent Team.
- RAG / AI-maintained knowledge.

- [ ] **Step 3: Rewrite the tool radar**

Render “ToolLandscape” for all seven categories. Explain the six model-selection dimensions:

~~~text
任务难度 / 上下文规模 / 多模态需求 / 工具能力 / 数据安全 / 总成本
~~~

Explain that total cost includes latency, first-pass success, rework, context, and risk. Show “已核验” or “待重新核验” from data; never add a “top tools” or ranking section.

- [ ] **Step 4: Create the template library route**

Render “TemplateLibrary” and “TaskCardLab”. Include static printable sections for:

- AI 协同任务卡.
- 高信号材料清单.
- 三层验收清单.
- 权限与风险清单.
- 复盘与沉淀模板.

- [ ] **Step 5: Rewrite the source page**

Group sources as “稳定方法与协议”, “动态产品入口”, and “内部材料”. State:

- Internal course documents establish the official goal and learner context.
- First-party public docs establish technical definitions.
- Dynamic entries are examples rather than recommendations.
- The AI manual’s volatile model/version claims are not course facts.
- Missing provenance forces content to be labeled scenario or example.

Show “verifiedAt” and stability on every record.

- [ ] **Step 6: Implement link checking**

“scripts/check-course-links.mjs” must:

1. Scan Markdown and Vue files under “course”.
2. Resolve internal absolute links against clean VitePress routes.
3. Ignore anchors after confirming the target file exists.
4. Fail with a list of broken internal targets.
5. In “--external” mode, collect HTTP(S) links, use a bounded timeout and limited concurrency, print failures as warnings, and exit zero.
6. Accept “--fixture-broken-internal” and “--fixture-broken-external” flags for deterministic tests without network.

Add:

~~~json
"check:links": "node scripts/check-course-links.mjs",
"check:links:external": "node scripts/check-course-links.mjs --external"
~~~

- [ ] **Step 7: Run appendix and link tests**

~~~bash
node --test --test-name-pattern="appendix|link checker" tests/course.test.mjs
npm run check:links
~~~

Expected: PASS with no broken internal routes. Do not require live external access in the test suite.

- [ ] **Step 8: Commit the reference layer**

~~~bash
git add course/appendix course/sources.md scripts/check-course-links.mjs package.json tests/course.test.mjs
git commit -m "feat(course): add data-driven reference appendices"
~~~

---

### Task 8: Verify content, builds, responsive tutorial, and full-screen lecture

**Files:**
- Modify only files implicated by a failing check.

**Interfaces:**
- Produces a release-ready local course site and a GitHub Pages-compatible static build.

- [ ] **Step 1: Run the complete automated suite**

~~~bash
npm test
npm run check:links
npm run build
~~~

Expected: all tests pass, internal link check exits 0, and VitePress builds to “dist”.

- [ ] **Step 2: Verify the Pages base**

~~~bash
COURSE_BASE=/ai-coding-literacy-course/ npm run build
rg -n '"/assets/|href="/guide|href="/appendix' dist
~~~

Expected: build exits 0 and “rg” returns no root-relative course asset or route links that bypass the configured base.

- [ ] **Step 3: Restore the local build and start preview**

~~~bash
npm run build
npm run preview -- --port 4173
~~~

Expected: preview serves “http://localhost:4173/” and these routes return 200:

~~~text
/
/present?scene=1
/guide/00-start
/guide/03-ai-landscape
/guide/06-agent
/guide/09-transfer
/appendix/glossary
/appendix/tool-radar
/appendix/templates
/sources
~~~

- [ ] **Step 4: Inspect the lecture at 1920×1080**

Check scenes 1, 5, 8, 10, 11, 16, 21, 23, 27, 30, 31, and 32 because they cover every custom visual family and all nine nodes.

Acceptance:

- No scrollbars, clipping, or safe-area violation.
- Teaching text is readable at the back-of-room target; no instructional text below 28 logical pixels.
- Scene 5 shows only the sourced learner statistics.
- Scene 10 presents tool categories, not rankings.
- Scene 11 makes concepts and their relationships visibly readable.
- Scene 16 has target, input, expected artifact, and static fallback.
- Scene 22 says single Agent is the default.
- Scene 27 puts approval earlier as permission and impact grow.
- Scene 32 ends with one small workflow and the seven-day action.

- [ ] **Step 5: Verify presentation interaction**

At “/present?scene=1” check:

- Right arrow, Space, and PageDown advance.
- Left arrow and PageUp go back.
- Home and End jump correctly.
- F enters/exits fullscreen.
- O opens the overview.
- Each of the nine node buttons jumps to its first scene.
- N shows all five note fields.
- Esc closes overview or notes.
- Refresh preserves “?scene=”.
- “?scene=oops” and out-of-range values fall back safely.

- [ ] **Step 6: Verify responsive tutorial**

Inspect “/guide/03-ai-landscape”, “/guide/06-agent”, and “/appendix/templates” at 375, 768, 1440, and 1920 pixels.

Acceptance:

- No page-level horizontal overflow.
- Sidebar and mobile menu remain usable.
- All concept definitions are visible without hover.
- Links and copy buttons have visible keyboard focus.
- Tool cards show official links, dates, and freshness status.
- Template text remains selectable if clipboard access is denied.

- [ ] **Step 7: Verify offline behavior**

Load the local build once, disable network access in the browser, then refresh “/present?scene=11” and “/guide/03-ai-landscape”.

Expected: fonts, CSS visuals, scene content, tutorial text, local search shell, and navigation remain available. Official external links may fail offline without affecting core reading.

- [ ] **Step 8: Run the non-blocking external report**

~~~bash
npm run check:links:external
~~~

Expected: exit 0. Any failed or timed-out official URL is printed as “WARN” and must be manually reviewed before delivery; a stale tool link is marked “待重新核验” rather than silently removed.

- [ ] **Step 9: Re-run clean verification after any QA fix**

~~~bash
npm test
npm run check:links
npm run build
git diff --check
git status --short
~~~

Expected: all commands pass; “git status” contains only intentional tracked changes plus the pre-existing untracked “course/.vitepress/cache/”.

- [ ] **Step 10: Commit final QA fixes if needed**

If Step 9 shows tracked fixes:

~~~bash
git add README.md package.json tests course scripts
git commit -m "fix(course): close lecture and tutorial QA gaps"
~~~

If no tracked fixes remain, do not create an empty commit.

## Completion Criteria

- The course title, official goal, audience, 80+15 timing, nine nodes, and route order match the approved specification.
- The lecture contains exactly 32 rich full-screen scenes and is the primary teaching surface.
- The first node is “AI 时代的 T 型人才”.
- Concepts, tool categories, model-selection criteria, boundaries, checkpoints, and human responsibility appear visibly in lecture content.
- Scenarios remain broad and substitutable; no unsupported “real case” narrative survives.
- Tutorial chapters mirror all nine lecture nodes and support independent after-class learning.
- Home, lecture, chapters, glossary, tool radar, templates, and sources share normalized data.
- Fullscreen, keyboard, overview, notes, URL restoration, responsive layouts, local base, Pages base, and offline behavior pass verification.
- “npm test”, “npm run check:links”, “npm run build”, and “git diff --check” pass.

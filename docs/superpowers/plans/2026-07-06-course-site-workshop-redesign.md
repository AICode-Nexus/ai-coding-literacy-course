# Course Site Workshop Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AI Coding 素养课 static site into a 90-minute workshop course page with solid content, real interactions, no invalid controls, no administrative-approval content, and responsive layouts.

**Architecture:** Keep the current static-site architecture: `index.html` provides containers, `src/data/*` owns course content, `src/modules/*` owns interaction behavior, and `styles/*` owns visual systems. Add one focused workshop data module, expand case and term data, then wire deterministic render modules and responsive CSS around those data contracts.

**Tech Stack:** Vanilla HTML, CSS, JavaScript ES modules, Node.js built-in test runner, existing `scripts/build-site.mjs` static build.

---

## Scope Check

The approved spec covers one subsystem: the public static course site. It touches content, interaction, layout, and tests, but all work produces one deployable site and can be completed in this single plan.

## File Structure

- Create `src/data/workshop.js`: 90-minute agenda, workshop outputs, T-shaped capability layers, task-card templates, quality checklist, and 7-day training data.
- Modify `src/data/workflow.js`: re-export workshop workflow data for backward-compatible tests and imports during transition.
- Modify `src/data/cases.js`: replace administrative approval with seven workplace cases and add failures/checklists.
- Modify `src/data/terms.js`: regroup terms by the Goal -> Context -> Prompt -> Output -> Eval -> Guardrails -> Loop chain and remove administrative examples.
- Modify `src/modules/taskCard.js`: render template controls, apply selected template, generate a full AI collaboration task card, render the 7-day training plan.
- Modify `src/modules/cases.js`: render richer case details and copyable prompt/checklist blocks.
- Modify `src/modules/terms.js`: render workflow-oriented term controls and improve selected state semantics.
- Modify `index.html`: replace the current crowded page flow with workshop-oriented sections and remove invalid homepage carousel controls.
- Modify `README.md`: reflect the workshop structure and remove administrative approval.
- Modify `styles/base.css`, `styles/layout.css`, `styles/sections.css`, `styles/tools.css`, `styles/responsive.css`: unify button/chip/control styles, rebuild section layout, and remove overflow-prone patterns.
- Modify `tests/site.test.mjs`: assert the new data contracts, removed content, real interaction containers, and build behavior.

## Task 1: Write Failing Tests For The Workshop Contract

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Replace `tests/site.test.mjs` with the new contract tests**

```js
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
```

- [ ] **Step 2: Run tests to verify the new contract fails**

Run: `npm test`

Expected: FAIL because `src/data/workshop.js` does not exist and the old case data still contains administrative approval content.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/site.test.mjs
git commit -m "test: define workshop course site contract"
```

## Task 2: Add Workshop Data And Backward-Compatible Workflow Exports

**Files:**
- Create: `src/data/workshop.js`
- Modify: `src/data/workflow.js`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Create `src/data/workshop.js`**

```js
export const workshopOutputs = ["任务卡", "提示词", "验收清单", "复盘记录"];

export const workshopAgenda = [
  {
    id: "opening",
    minutes: 8,
    title: "为什么不是会用工具",
    goal: "理解课程目标：把 AI 当成可协同、可验收、可复盘的工作对象。",
    activity: "讲师用一个新人周报例子对比搜索式提问和任务式协同。",
  },
  {
    id: "collaboration-chain",
    minutes: 15,
    title: "AI 协同工作法",
    goal: "掌握 Goal、Context、Prompt、Output、Eval、Guardrails、Loop 的工作链。",
    activity: "把一句模糊请求拆成目标、材料、输出、验收、边界和复盘。",
  },
  {
    id: "task-card-lab",
    minutes: 20,
    title: "从问题到任务卡",
    goal: "把真实任务改写成 AI 可先处理、人可验收的任务卡。",
    activity: "选择周报、需求预审、竞品调研或会议行动项模板，现场生成任务卡。",
  },
  {
    id: "case-practice",
    minutes: 25,
    title: "岗位实战案例",
    goal: "用七个新人高频场景理解旧做法、AI 协同做法和人工责任。",
    activity: "小组选择一个案例，复用提示词并补充失败点和验收清单。",
  },
  {
    id: "quality-boundary",
    minutes: 12,
    title: "质量验收与边界",
    goal: "建立事实核验、责任边界、敏感信息和输出质量标准。",
    activity: "对 AI 输出进行事实、结构、风险、边界四项验收。",
  },
  {
    id: "seven-day-training",
    minutes: 10,
    title: "7 天训练计划",
    goal: "把课堂方法转成新人一周内能完成的训练闭环。",
    activity: "选择一个本周真实任务，确定第 1 天产出和第 7 天复盘材料。",
  },
];

export const tModelLayers = [
  {
    title: "一专更深",
    detail: "本岗位专业判断力：质量标准、事实判断、责任边界和风险意识。",
  },
  {
    title: "多能成链",
    detail: "理解相邻岗位输入输出：产品目标、研发约束、测试标准、运营反馈。",
  },
  {
    title: "AI 串闭环",
    detail: "让 AI 先读材料、先拆任务、先出草稿、先预审，人负责验收和决策。",
  },
];

export const collaborationSteps = [
  {
    title: "Goal",
    label: "定目标",
    detail: "把模糊愿望改成可验收结果。",
    prompt: "这次任务交付给谁？什么结果算完成？",
  },
  {
    title: "Context",
    label: "给材料",
    detail: "让 AI 看到背景、样例、限制和可信来源。",
    prompt: "AI 能看哪些材料？哪些信息不能给？",
  },
  {
    title: "Prompt",
    label: "派任务",
    detail: "把目标、材料、步骤、标准和边界写成任务说明。",
    prompt: "AI 先做哪一步？按什么格式输出？",
  },
  {
    title: "Output",
    label: "看产出",
    detail: "让 AI 生成草稿、摘要、检查清单、方案或代码说明。",
    prompt: "输出要给谁看？需要哪几栏？",
  },
  {
    title: "Eval",
    label: "验质量",
    detail: "人确认事实、结构、质量、责任、风险和例外。",
    prompt: "哪些判断必须由我或导师确认？",
  },
  {
    title: "Guardrails",
    label: "控边界",
    detail: "明确权限、敏感数据、不可自动执行动作和停止条件。",
    prompt: "什么事情 AI 不能做，做到哪里必须停？",
  },
  {
    title: "Loop",
    label: "再复盘",
    detail: "把好样例、失败点和新标准沉淀成下次可复用资产。",
    prompt: "下次如何少问一次、少返工一次？",
  },
];

export const qualityChecks = [
  "事实是否有来源或可核验材料",
  "输出结构是否符合接收人的阅读方式",
  "风险、阻塞和不确定信息是否单独标出",
  "哪些结论需要导师、负责人或相邻岗位确认",
  "是否避开未授权数据、敏感信息和不可自动执行动作",
];

export const taskTemplates = [
  {
    id: "weekly-review",
    title: "周报复盘",
    role: "校招生",
    task: "整理本周项目进展，形成给导师看的周报",
    goal: "让导师能快速判断进展、风险、下周计划和需要支持的事项。",
    material: "任务记录、会议结论、阻塞点、代码提交、导师反馈。",
    standard: "事实准确，进展和风险分开，不夸大成果，下周动作明确。",
    boundary: "不编造进度，不把未确认讨论写成已完成，不隐藏阻塞。",
    risk: "容易写成流水账，或把困难写得太含糊，导致导师无法支持。",
    outputSections: ["已完成", "风险/阻塞", "下周计划", "需要支持"],
  },
  {
    id: "requirement-precheck",
    title: "需求预审",
    role: "产品 / 研发",
    task: "预审一个新需求，找出目标、边界、验收和风险",
    goal: "在开做前发现不清楚的问题，降低返工。",
    material: "需求描述、用户场景、相关截图、历史反馈、技术约束。",
    standard: "用户目标清楚，非目标清楚，验收标准可测试，风险可讨论。",
    boundary: "不替负责人拍板优先级，不假设未提供的业务规则。",
    risk: "容易把 AI 猜测当成需求事实，或漏掉非目标和测试点。",
    outputSections: ["用户目标", "关键流程", "待确认问题", "验收标准", "上线风险"],
  },
  {
    id: "competitor-research",
    title: "竞品调研",
    role: "产品 / 运营",
    task: "整理竞品材料，输出可判断的对比结构",
    goal: "从资料堆叠变成判断结构，支持下一步产品或运营决策。",
    material: "竞品官网、产品截图、体验记录、定价信息、用户评论。",
    standard: "来源标注清楚，对比维度稳定，不确定结论待核验。",
    boundary: "不引用不可信来源，不把个别体验扩大成普遍结论。",
    risk: "容易堆很多截图，缺少对目标用户和可借鉴点的判断。",
    outputSections: ["目标用户", "核心能力", "体验差异", "可借鉴点", "待核验来源"],
  },
  {
    id: "meeting-actions",
    title: "会议行动项",
    role: "项目协作",
    task: "把会议记录整理为决策、行动项、风险和下次确认点",
    goal: "让会议纪要推动行动，而不是只记录讨论内容。",
    material: "会议录音转写、聊天记录、白板截图、参会人补充。",
    standard: "决策和讨论分开，责任人和时间明确，未确认内容标注。",
    boundary: "不把讨论意见写成已决事项，不替参会人承诺时间。",
    risk: "容易漏掉负责人和截止时间，或把争议点写成共识。",
    outputSections: ["已决事项", "行动项", "负责人", "截止时间", "未决问题", "风险提醒"],
  },
];

export const sevenDayTraining = [
  {
    day: 1,
    goal: "选定真实任务",
    task: "从本周工作中选一个可评价、可复盘、风险不高的真实任务。",
    output: "任务名称和接收人",
    check: "任务能在一周内完成，且有明确接收人和评价方式。",
    feedbackQuestion: "导师会如何判断这件事做得好不好？",
  },
  {
    day: 2,
    goal: "写清目标材料",
    task: "补齐 Goal、Context、输出格式和不能做的事。",
    output: "任务卡初稿",
    check: "材料来源明确，边界写清楚，不把猜测当事实。",
    feedbackQuestion: "AI 还缺哪类上下文会导致误判？",
  },
  {
    day: 3,
    goal: "让 AI 先处理",
    task: "让 AI 先生成草稿、摘要、预审问题或行动项，不直接交付。",
    output: "AI 初稿",
    check: "输出符合指定结构，并标出不确定信息。",
    feedbackQuestion: "哪些内容看起来顺，但需要人工核验？",
  },
  {
    day: 4,
    goal: "完成质量验收",
    task: "按事实、结构、风险、边界四项检查 AI 输出。",
    output: "验收清单",
    check: "每条关键结论都有来源、依据或待确认标记。",
    feedbackQuestion: "哪些判断必须交给导师或负责人确认？",
  },
  {
    day: 5,
    goal: "沉淀可复用提示词",
    task: "把有效提示词改成下次可复用的任务模板。",
    output: "提示词模板",
    check: "模板包含目标、材料、输出、验收、边界五部分。",
    feedbackQuestion: "下次换一个类似任务，哪些字段需要替换？",
  },
  {
    day: 6,
    goal: "补齐相邻岗位标准",
    task: "找产品、研发、测试、运营或导师确认缺少的专业标准。",
    output: "标准补充记录",
    check: "至少补充三条原先不知道的验收口径或风险点。",
    feedbackQuestion: "相邻岗位最担心这个任务的哪类问题？",
  },
  {
    day: 7,
    goal: "形成工作包",
    task: "复盘一次成功或返工，把任务卡、提示词、验收清单和复盘记录整理成工作包。",
    output: "AI 协同工作包",
    check: "工作包能被另一个新人读懂并复用。",
    feedbackQuestion: "如果下周重做一次，哪一步可以少返工？",
  },
];
```

- [ ] **Step 2: Replace `src/data/workflow.js` with compatibility exports**

```js
export { collaborationSteps, sevenDayTraining as sevenDayPlan } from "./workshop.js";
```

- [ ] **Step 3: Run data tests**

Run: `npm test -- --test-name-pattern="workshop agenda|seven-day|task templates"`

Expected: PASS for the three workshop-data tests; remaining tests still fail until cases, terms, HTML, and README are updated.

- [ ] **Step 4: Commit workshop data**

```bash
git add src/data/workshop.js src/data/workflow.js
git commit -m "feat: add workshop course data"
```

## Task 3: Replace Cases And Terms With Workshop-Oriented Content

**Files:**
- Modify: `src/data/cases.js`
- Modify: `src/data/terms.js`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Replace `src/data/cases.js` with seven rich cases**

```js
export const caseStudies = [
  {
    id: "weekly",
    role: "校招生通用",
    title: "新人周报：从流水账到可复盘进展",
    oldWay: "把本周做过的事逐条写出来，导师很难判断进展、风险和下周重点。",
    aiWay: "把任务记录、会议结论和阻塞点给 AI，让它先按已完成、风险、计划、需要支持四栏整理。",
    humanRole: "新人确认事实、补充真实阻塞、删掉夸大表述，并判断哪些问题需要主动升级。",
    template: "请根据下面的本周记录，生成给导师看的周报。输出四栏：已完成、风险/阻塞、下周计划、需要支持。不要夸大事实，不确定的信息标注待确认。",
    failures: ["只列事项没有结果", "把未确认讨论写成已完成", "风险写得太含糊导致导师无法支持"],
    checklist: ["进展有证据", "风险和阻塞单独列出", "下周计划有动作", "需要支持事项具体"],
  },
  {
    id: "requirement",
    role: "产品 / 研发",
    title: "需求理解：从听懂任务到定义验收",
    oldWay: "拿到需求就开做，做到一半才发现目标、边界和验收口径不一致。",
    aiWay: "让 AI 把需求拆成用户目标、业务价值、非目标、待确认问题、验收标准和测试点。",
    humanRole: "新人带着 AI 生成的问题去和导师、产品、测试确认，避免凭空假设。",
    template: "请预审下面的需求，输出：用户目标、业务价值、关键流程、非目标、待确认问题、验收标准、测试点和上线风险。",
    failures: ["把 AI 猜测当需求事实", "只写功能点不写非目标", "验收标准无法测试"],
    checklist: ["用户目标明确", "非目标明确", "待确认问题可问出口", "验收标准可执行"],
  },
  {
    id: "research",
    role: "运营 / 产品",
    title: "竞品调研：从资料堆叠到判断结构",
    oldWay: "复制很多网页和截图，最后报告变成信息拼盘。",
    aiWay: "先定 Goal 和对比维度，再让 AI 按目标用户、核心能力、定价、体验差异、可借鉴点整理。",
    humanRole: "人负责判断来源可靠性、补充一手体验、删掉过期或不适用结论。",
    template: "请按目标用户、核心功能、使用路径、商业模式、优势、短板、可借鉴点七栏整理竞品材料。所有不确定结论必须标注来源待核验。",
    failures: ["截图很多但没有判断", "来源过期仍直接引用", "对比维度前后不一致"],
    checklist: ["来源可核验", "对比维度稳定", "结论和材料对应", "可借鉴点能落到行动"],
  },
  {
    id: "code-review",
    role: "研发",
    title: "代码 / 文档预审：从写完交付到先验收",
    oldWay: "代码写完直接提测或提交，问题在评审和测试阶段集中暴露。",
    aiWay: "让 AI 先审可读性、边界条件、测试缺口、发布影响和文档说明。",
    humanRole: "研发确认业务逻辑、运行测试、检查安全和性能风险，并决定是否合并。",
    template: "请预审下面的改动说明或代码片段，输出：主要意图、潜在 bug、缺失测试、发布风险、需要人工确认的问题。",
    failures: ["只看语法不看业务边界", "没有补测试说明", "发布影响没有写清楚"],
    checklist: ["主要意图清楚", "边界条件覆盖", "测试缺口列出", "发布风险可讨论"],
  },
  {
    id: "meeting",
    role: "项目协作",
    title: "会议纪要：从记录内容到推动行动",
    oldWay: "会议结束后发一份长纪要，行动项、负责人和截止时间不清。",
    aiWay: "AI 先把讨论内容拆成决策、待办、分歧、风险和下一次确认点。",
    humanRole: "主持人确认责任人、日期和未决问题，避免 AI 把讨论误写成决策。",
    template: "请把下面的会议记录整理为：已决事项、行动项、负责人、截止时间、未决问题、风险提醒。讨论但未确认的内容不能写成决策。",
    failures: ["讨论意见被写成决策", "行动项没有负责人", "风险和分歧被省略"],
    checklist: ["已决和未决分开", "行动项有负责人", "截止时间明确", "风险提醒可追踪"],
  },
  {
    id: "ops",
    role: "运营",
    title: "运营复盘：从写总结到形成下一轮假设",
    oldWay: "活动结束后简单总结曝光、点击和问题，下次仍从头想。",
    aiWay: "AI 整理数据、用户反馈、内容表现和异常，产出下一轮假设与实验清单。",
    humanRole: "运营判断数据口径、业务优先级和可执行资源，决定下一轮动作。",
    template: "请根据活动数据和反馈，输出：目标完成情况、关键异常、用户反馈主题、内容表现、下一轮增长假设、需要验证的数据。",
    failures: ["只描述数据不解释原因", "异常数据没有标注口径", "下一步动作太大无法执行"],
    checklist: ["目标和结果对应", "异常有解释或待查", "假设可验证", "下一步动作可执行"],
  },
  {
    id: "feedback",
    role: "产品 / 客户成功",
    title: "用户反馈整理：从意见堆积到需求线索",
    oldWay: "把用户原话粘到文档里，难以判断高频问题、影响范围和下一步优先级。",
    aiWay: "AI 先按主题、用户类型、影响程度、证据和待确认问题整理反馈。",
    humanRole: "人核对原始反馈、识别关键客户或样本偏差，并决定是否进入需求池。",
    template: "请整理下面的用户反馈，输出：反馈主题、代表原话、影响对象、可能原因、待确认问题、建议下一步。不要把单个用户意见直接写成普遍需求。",
    failures: ["丢掉用户原话", "把少数意见写成普遍需求", "没有区分问题、建议和情绪"],
    checklist: ["主题归类清楚", "保留代表原话", "影响范围待核验", "下一步能被产品或运营接住"],
  },
];
```

- [ ] **Step 2: Replace `src/data/terms.js` with collaboration-chain groups**

```js
export const termGroups = [
  {
    id: "goal",
    label: "Goal",
    description: "把愿望变成可验收目标",
    terms: [
      {
        name: "Goal",
        title: "Goal：把愿望变成可验收目标",
        problem: "新人常说帮我做个方案，AI 不知道成功标准。Goal 要写清对象、结果、约束和验收方式。",
        example: "不要说帮我写周报，而是说根据 5 条项目进展，生成给导师看的周报，突出风险、下周计划和需要支持的事项。",
        classroomUse: "让学员把自己的真实任务写成一句可验收目标。",
      },
    ],
  },
  {
    id: "context",
    label: "Context",
    description: "让 AI 吃到正确材料",
    terms: [
      {
        name: "Context",
        title: "Context：让 AI 吃到正确材料",
        problem: "AI 输出不稳定，很多时候不是模型不行，而是上下文缺失、材料过期或边界不清。",
        example: "做竞品调研时，把目标用户、对比维度、已有材料、不能引用的来源和输出格式一起给 AI。",
        classroomUse: "让学员列出一个任务至少需要的三类材料和一类不能给的材料。",
      },
      {
        name: "Worktree",
        title: "Worktree：并行试验的隔离工作区",
        problem: "多个 Agent 或多条方案同时改代码，容易互相覆盖。Worktree 让每条方案有独立空间。",
        example: "A 方案优化页面结构，B 方案重做互动工具，最后比较效果再合并。",
        classroomUse: "用它解释为什么复杂任务要先隔离试验，再决定合并。",
      },
    ],
  },
  {
    id: "prompt",
    label: "Prompt",
    description: "把提问改成任务说明",
    terms: [
      {
        name: "Prompt",
        title: "Prompt：不是咒语，是工作说明书",
        problem: "提示词的价值不是写得玄，而是能把目标、材料、步骤、标准和边界说清楚。",
        example: "把帮我看看需求改成请按用户价值、实现风险、测试点、上线影响四栏做预审。",
        classroomUse: "让学员把一句模糊请求改写成任务卡。",
      },
      {
        name: "Agent",
        title: "Agent：能按目标推进任务的执行体",
        problem: "Agent 不只是聊天，它能读上下文、制定计划、调用工具、输出结果，并把过程留下来。",
        example: "让 Agent 先读需求、列实现计划、补测试、生成说明，再等人审查。",
        classroomUse: "用它说明 AI 可以先处理流程，但不能替代人的责任判断。",
      },
      {
        name: "Subagent",
        title: "Subagent：专项能力的临时队友",
        problem: "主 Agent 容易在复杂任务中丢焦点，Subagent 适合处理独立子任务。",
        example: "一个 Subagent 专门查术语，一个 Subagent 专门审案例，一个 Subagent 专门跑测试。",
        classroomUse: "用它说明复杂任务可以拆给不同角色，并由人做最终整合。",
      },
    ],
  },
  {
    id: "output",
    label: "Output",
    description: "让产出能被阅读和交接",
    terms: [
      {
        name: "Agent Team",
        title: "Agent Team：把复杂任务拆给多个角色",
        problem: "复杂工作不适合塞进一次 prompt，需要 Planner、Researcher、Executor、Reviewer 分工。",
        example: "竞品分析中，Planner 定维度，Researcher 找材料，Executor 写报告，Reviewer 查事实和风险。",
        classroomUse: "让学员把岗位案例拆成计划、查证、产出、复核四个角色。",
      },
      {
        name: "Harness Engineering",
        title: "Harness Engineering：给 AI 搭工作台",
        problem: "AI 要稳定工作，需要工具、权限、上下文、测试、日志、沙箱和回滚，而不是裸聊。",
        example: "给代码 Agent 准备仓库、测试命令、权限边界、日志记录和人工确认点。",
        classroomUse: "用它解释为什么专业环境里的 AI 协同需要工具台和检查点。",
      },
    ],
  },
  {
    id: "eval",
    label: "Eval",
    description: "定义什么叫做得好",
    terms: [
      {
        name: "Eval",
        title: "Eval：定义什么叫做得好",
        problem: "没有评测，AI 输出只能靠感觉。Eval 把好坏标准变成样例、检查项和通过条件。",
        example: "周报要检查是否有进展、风险、下周计划、需要支持事项，缺一项就不通过。",
        classroomUse: "让学员给自己的任务卡写四条验收标准。",
      },
      {
        name: "Tracing",
        title: "Tracing：让过程可追踪",
        problem: "只看最终答案很难复盘。Tracing 记录输入、工具调用、判断路径和失败点。",
        example: "团队能回看 AI 读了哪些材料、调用了什么工具、哪些结论需要人确认。",
        classroomUse: "让学员把一次 AI 输出拆成材料、判断、结果、待核验四段。",
      },
    ],
  },
  {
    id: "guardrails",
    label: "Guardrails",
    description: "把不能做的事写清楚",
    terms: [
      {
        name: "Guardrails",
        title: "Guardrails：把不能做的事写进系统",
        problem: "AI 越能干，越要明确边界。Guardrails 约束权限、敏感数据、输出口径和停止条件。",
        example: "AI 可以预审需求和材料，但不能编造系统状态、替负责人承诺时间或处理未授权数据。",
        classroomUse: "让学员给自己的任务写三条必须停下来的条件。",
      },
    ],
  },
  {
    id: "loop",
    label: "Loop",
    description: "把一次使用变成团队资产",
    terms: [
      {
        name: "Loop Engineering",
        title: "Loop Engineering：把一次使用变成改进闭环",
        problem: "AI 用完就散，团队能力不会增长。Loop 要记录任务、复盘错误、沉淀模板、更新标准。",
        example: "把一次好的需求预审提示词沉淀成团队模板，把漏掉的测试项加入下次检查清单。",
        classroomUse: "让学员把一次返工转成下次检查项。",
      },
      {
        name: "Human Review",
        title: "Human Review：人负责验收和责任",
        problem: "AI 可以先做，但新人必须知道最终判断、例外处理和风险承担仍在人。",
        example: "AI 写出上线说明后，人要确认影响范围、回滚方案、灰度策略和告警监控。",
        classroomUse: "让学员标出自己的任务中哪些判断不能交给 AI。",
      },
      {
        name: "Skill",
        title: "Skill：把好方法封装起来",
        problem: "提示词只靠个人记忆，难复用。Skill 把流程、材料、规则和输出模板固定下来。",
        example: "把竞品调研、代码审查、会议纪要整理做成团队可复用 Skill。",
        classroomUse: "让学员把自己的任务卡整理成可复用模板。",
      },
    ],
  },
];

export const allTerms = termGroups.flatMap((group) =>
  group.terms.map((term) => ({
    ...term,
    group: group.id,
    groupLabel: group.label,
    groupDescription: group.description,
  })),
);
```

- [ ] **Step 3: Run content tests**

Run: `npm test -- --test-name-pattern="administrative|term data|case studies"`

Expected: PASS for administrative-removal, term-data, and case-study tests.

- [ ] **Step 4: Commit content data**

```bash
git add src/data/cases.js src/data/terms.js
git commit -m "feat: enrich workshop cases and terms"
```

## Task 4: Implement Task Card And Training Interactions

**Files:**
- Modify: `src/modules/taskCard.js`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Replace `src/modules/taskCard.js`**

```js
import { taskTemplates, sevenDayTraining } from "../data/workshop.js";

function getFormValue(form, name) {
  return form.elements.namedItem(name)?.value.trim() || "";
}

function getSelectedTemplateId(form) {
  return getFormValue(form, "template") || taskTemplates[0].id;
}

function getTemplate(id) {
  return taskTemplates.find((template) => template.id === id) || taskTemplates[0];
}

function setInputValue(form, name, value) {
  const field = form.elements.namedItem(name);
  if (field) field.value = value;
}

function applyTemplate(form, template) {
  setInputValue(form, "role", template.role);
  setInputValue(form, "task", template.task);
  setInputValue(form, "goal", template.goal);
  setInputValue(form, "material", template.material);
  setInputValue(form, "standard", template.standard);
  setInputValue(form, "boundary", template.boundary);
}

function numbered(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function buildTaskCard(form) {
  const template = getTemplate(getSelectedTemplateId(form));
  const role = getFormValue(form, "role") || template.role;
  const task = getFormValue(form, "task") || template.task;
  const goal = getFormValue(form, "goal") || template.goal;
  const material = getFormValue(form, "material") || template.material;
  const standard = getFormValue(form, "standard") || template.standard;
  const boundary = getFormValue(form, "boundary") || template.boundary;

  return `AI 协同任务卡

模板：${template.title}
角色：${role}
任务：${task}
目标：${goal}

输入材料：
${material}

AI 先做：
1. 提取关键信息和缺失项
2. 按目标重组结构
3. 生成初稿、检查清单或行动项
4. 标出不确定信息和需要人工确认的问题

期望输出：
${numbered(template.outputSections)}

我如何验收：
${standard}

边界：
${boundary}

风险提醒：
${template.risk}

下次如何复用：
把本次好输出、返工原因和新增检查项沉淀为模板，下一次先按模板跑预审。`;
}

function renderTemplateOptions(container, activeId) {
  container.innerHTML = taskTemplates
    .map(
      (template) => `
        <label class="template-option">
          <input type="radio" name="template" value="${template.id}" ${template.id === activeId ? "checked" : ""} />
          <span>${template.title}</span>
          <small>${template.task}</small>
        </label>
      `,
    )
    .join("");
}

function renderTraining(container) {
  container.innerHTML = sevenDayTraining
    .map(
      (day) => `
        <article class="training-day">
          <span>Day ${day.day}</span>
          <h3>${day.goal}</h3>
          <dl>
            <div><dt>当天任务</dt><dd>${day.task}</dd></div>
            <div><dt>产出物</dt><dd>${day.output}</dd></div>
            <div><dt>检查项</dt><dd>${day.check}</dd></div>
            <div><dt>反馈问题</dt><dd>${day.feedbackQuestion}</dd></div>
          </dl>
        </article>
      `,
    )
    .join("");
}

export function setupTaskCard() {
  const form = document.getElementById("task-card-form");
  const output = document.getElementById("task-card-output");
  const action = document.getElementById("task-card-generate");
  const templateOptions = document.getElementById("task-template-options");
  const training = document.getElementById("seven-day-training");
  if (!form || !output || !action || !templateOptions) return;

  renderTemplateOptions(templateOptions, taskTemplates[0].id);
  applyTemplate(form, taskTemplates[0]);
  if (training) renderTraining(training);

  const update = () => {
    output.textContent = buildTaskCard(form);
    output.hidden = false;
  };

  templateOptions.addEventListener("change", () => {
    const template = getTemplate(getSelectedTemplateId(form));
    applyTemplate(form, template);
    if (!output.hidden) update();
  });

  action.addEventListener("click", update);
  form.addEventListener("input", () => {
    if (!output.hidden) update();
  });
}
```

- [ ] **Step 2: Run module wiring tests**

Run: `npm test -- --test-name-pattern="interactive modules|seven-day|task templates"`

Expected: task-template and seven-day tests pass; interaction-container test may still fail until `index.html` is updated.

- [ ] **Step 3: Commit task-card behavior**

```bash
git add src/modules/taskCard.js
git commit -m "feat: render workshop task card templates"
```

## Task 5: Render Richer Cases And Terms

**Files:**
- Modify: `src/modules/cases.js`
- Modify: `src/modules/terms.js`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Replace `src/modules/cases.js`**

```js
import { caseStudies } from "../data/cases.js";

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderCase(item) {
  return `
    <span class="case-role">${item.role}</span>
    <h3>${item.title}</h3>
    <div class="case-compare">
      <div>
        <strong>旧做法</strong>
        <p>${item.oldWay}</p>
      </div>
      <div>
        <strong>AI 协同做法</strong>
        <p>${item.aiWay}</p>
      </div>
      <div>
        <strong>人负责什么</strong>
        <p>${item.humanRole}</p>
      </div>
    </div>
    <div class="case-support-grid">
      <section class="case-list-box">
        <h4>常见失败点</h4>
        <ul>${listItems(item.failures)}</ul>
      </section>
      <section class="case-list-box">
        <h4>验收清单</h4>
        <ul>${listItems(item.checklist)}</ul>
      </section>
    </div>
    <div class="template-box">
      <span>可复制提示词</span>
      <p id="case-template-text">${item.template}</p>
      <button class="secondary-button" type="button" data-copy-target="case-template-text" data-copy-label="复制提示词">复制提示词</button>
    </div>
  `;
}

export function setupCases() {
  const tabs = document.getElementById("case-tabs");
  const output = document.getElementById("case-output");
  if (!tabs || !output) return;

  tabs.innerHTML = caseStudies
    .map(
      (item, index) => `
        <button class="${index === 0 ? "active" : ""}" type="button" data-case="${item.id}" aria-pressed="${index === 0 ? "true" : "false"}">
          <span>${String(index + 1).padStart(2, "0")}</span>${item.title.split("：")[0]}
        </button>
      `,
    )
    .join("");

  output.innerHTML = renderCase(caseStudies[0]);

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-case]");
    if (!button) return;

    tabs.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const selected = caseStudies.find((item) => item.id === button.dataset.case);
    if (selected) output.innerHTML = renderCase(selected);
  });
}
```

- [ ] **Step 2: Replace `src/modules/terms.js`**

```js
import { allTerms, termGroups } from "../data/terms.js";

function renderTerm(term) {
  return `
    <div class="term-detail__head">
      <span>${term.groupLabel} · ${term.groupDescription}</span>
      <strong>${term.name}</strong>
    </div>
    <h3>${term.title}</h3>
    <dl>
      <div>
        <dt>解决的问题</dt>
        <dd>${term.problem}</dd>
      </div>
      <div>
        <dt>新人怎么用</dt>
        <dd>${term.example}</dd>
      </div>
      <div>
        <dt>课堂练习</dt>
        <dd>${term.classroomUse}</dd>
      </div>
    </dl>
  `;
}

export function setupTerms() {
  const groupWrap = document.getElementById("term-groups");
  const listWrap = document.getElementById("term-list");
  const detail = document.getElementById("term-detail");
  if (!groupWrap || !listWrap || !detail) return;

  const renderList = (groupId = termGroups[0].id, activeName) => {
    const terms = allTerms.filter((term) => term.group === groupId);
    const selectedName = activeName || terms[0]?.name;
    listWrap.innerHTML = terms
      .map(
        (term) => `
          <button class="${term.name === selectedName ? "active" : ""}" type="button" data-term="${term.name}" aria-pressed="${term.name === selectedName ? "true" : "false"}">
            <span>${term.groupLabel}</span>
            ${term.name}
          </button>
        `,
      )
      .join("");

    const selected = terms.find((term) => term.name === selectedName) || terms[0];
    if (selected) detail.innerHTML = renderTerm(selected);
  };

  groupWrap.innerHTML = termGroups
    .map(
      (group, index) => `
        <button class="${index === 0 ? "active" : ""}" type="button" data-term-group="${group.id}" aria-pressed="${index === 0 ? "true" : "false"}">
          <span>${group.label}</span>
          ${group.description}
        </button>
      `,
    )
    .join("");

  groupWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term-group]");
    if (!button) return;

    groupWrap.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderList(button.dataset.termGroup);
  });

  listWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;

    listWrap.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const term = allTerms.find((item) => item.name === button.dataset.term);
    if (term) detail.innerHTML = renderTerm(term);
  });

  renderList();
}
```

- [ ] **Step 3: Run module tests**

Run: `npm test -- --test-name-pattern="term data|case studies|interactive modules"`

Expected: data tests pass; interaction-container test may still fail until HTML containers exist.

- [ ] **Step 4: Commit rendering modules**

```bash
git add src/modules/cases.js src/modules/terms.js
git commit -m "feat: render rich cases and workflow terms"
```

## Task 6: Rebuild HTML Structure Around The Workshop Flow

**Files:**
- Modify: `index.html`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Update navigation labels and anchors in `index.html`**

Use these links inside `.nav-links`:

```html
<a class="active" href="#top">课程总览</a>
<a href="#agenda">90分钟路径</a>
<a href="#tools">方法工具箱</a>
<a href="#cases">岗位实战</a>
<a href="#training">课后训练</a>
```

- [ ] **Step 2: Replace the current hero actions**

Use this action block inside `.hero-content`:

```html
<div class="hero-actions">
  <a class="primary-action" href="#agenda">
    开始90分钟路径
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h14"></path>
      <path d="m13 6 6 6-6 6"></path>
    </svg>
  </a>
  <a class="secondary-action" href="#tools">
    生成课堂任务卡
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13 3 4 14h8l-1 7 9-12h-8z"></path>
    </svg>
  </a>
</div>
```

- [ ] **Step 3: Remove the homepage `term-library` controls**

Delete this container from `index.html`:

```html
<div class="library-controls" aria-label="术语卡片翻页">
  <span class="dot active"></span>
  <span class="dot"></span>
  <span class="dot"></span>
  <button type="button" aria-label="上一组术语">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6"></path></svg>
  </button>
  <button type="button" aria-label="下一组术语">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6"></path></svg>
  </button>
</div>
```

- [ ] **Step 4: Add the workshop agenda section after the hero**

```html
<section class="page-section agenda-section" id="agenda" aria-labelledby="agenda-title">
  <div class="section-inner">
    <div class="section-heading" data-reveal>
      <div>
        <p class="kicker">90 Minutes</p>
        <h2 id="agenda-title">90 分钟路径：从会问问题到能交付任务卡</h2>
      </div>
      <p>每一段都有讲解、练习和产出，最终形成新人 AI 协同工作包。</p>
    </div>
    <div class="agenda-grid" id="workshop-agenda" aria-label="90 分钟课程路径">
      <article><span>8 min</span><h3>为什么不是会用工具</h3><p>明确课程目标和最终产出。</p></article>
      <article><span>15 min</span><h3>AI 协同工作法</h3><p>掌握 Goal 到 Loop 的工作链。</p></article>
      <article><span>20 min</span><h3>从问题到任务卡</h3><p>把模糊请求改成任务说明。</p></article>
      <article><span>25 min</span><h3>岗位实战案例</h3><p>拆解七个新人高频场景。</p></article>
      <article><span>12 min</span><h3>质量验收与边界</h3><p>建立事实、风险、责任检查法。</p></article>
      <article><span>10 min</span><h3>7 天训练计划</h3><p>带走可复用的工作包。</p></article>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Replace the task-card panel form with template controls**

Use these IDs in the method toolbox section:

```html
<article class="quick-task-panel" aria-labelledby="quick-task-title">
  <div class="panel-head">
    <div>
      <h3 id="quick-task-title">AI 协同任务卡生成器</h3>
      <p>选择课堂模板，生成可复制的完整任务卡。</p>
    </div>
  </div>
  <form class="task-form compact-task-form" id="task-card-form">
    <fieldset class="template-options" id="task-template-options" aria-label="选择任务模板"></fieldset>
    <label>
      角色
      <input name="role" />
    </label>
    <label>
      任务
      <input name="task" />
    </label>
    <label>
      目标
      <textarea name="goal" rows="2"></textarea>
    </label>
    <label>
      输入材料
      <textarea name="material" rows="2"></textarea>
    </label>
    <label>
      验收标准
      <textarea name="standard" rows="2"></textarea>
    </label>
    <label>
      边界
      <textarea name="boundary" rows="2"></textarea>
    </label>
  </form>
  <div class="task-actions">
    <button type="button" id="task-card-generate">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13 3 4 14h8l-1 7 9-12h-8z"></path>
      </svg>
      生成任务卡
    </button>
    <button class="secondary" type="button" data-copy-target="task-card-output" data-copy-label="复制任务卡">复制任务卡</button>
  </div>
  <pre class="task-output" id="task-card-output" tabindex="0" hidden></pre>
</article>
```

- [ ] **Step 6: Replace the action section with the training section**

```html
<section class="page-section training-section" id="training" aria-labelledby="training-title">
  <div class="section-inner">
    <div class="section-heading" data-reveal>
      <div>
        <p class="kicker">7-Day Training</p>
        <h2 id="training-title">7 天训练：把课程变成新人工作习惯</h2>
      </div>
      <p>每天有目标、任务、产出物、检查项和反馈问题，第 7 天形成自己的 AI 协同工作包。</p>
    </div>
    <div class="training-grid" id="seven-day-training" aria-label="7 天训练计划"></div>
  </div>
</section>
```

- [ ] **Step 7: Update the cases section heading copy**

Use this heading text:

```html
<p class="kicker">Practice Cases</p>
<h2 id="cases-title">岗位实战：旧做法、AI 协同做法、人负责什么</h2>
```

- [ ] **Step 8: Run interaction-container tests**

Run: `npm test -- --test-name-pattern="interactive modules"`

Expected: PASS for all container and invalid-control assertions.

- [ ] **Step 9: Commit HTML structure**

```bash
git add index.html
git commit -m "feat: restructure site as workshop flow"
```

## Task 7: Unify Visual System And Responsive Layouts

**Files:**
- Modify: `styles/base.css`
- Modify: `styles/layout.css`
- Modify: `styles/sections.css`
- Modify: `styles/tools.css`
- Modify: `styles/responsive.css`
- Test: browser verification and `npm test`

- [ ] **Step 1: Add common focus and button states in `styles/base.css`**

```css
:where(a, button, input, textarea, select):focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent) 28%, transparent);
  outline-offset: 3px;
}

:where(button, .primary-action, .secondary-action) {
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

:where(button, .primary-action, .secondary-action):active {
  transform: translateY(1px);
}

:where(button:disabled, [aria-disabled="true"]) {
  cursor: not-allowed;
  opacity: 0.48;
}
```

- [ ] **Step 2: Add agenda and training styles in `styles/sections.css`**

```css
.agenda-section {
  background: var(--surface);
  border-top: 1px solid var(--border);
}

.agenda-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(150px, 1fr));
  gap: 12px;
}

.agenda-grid article {
  min-height: 176px;
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.agenda-grid span {
  color: var(--accent-2);
  font-weight: 950;
}

.agenda-grid h3 {
  margin: 18px 0 8px;
  font-size: 18px;
  line-height: 1.25;
}

.agenda-grid p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.case-support-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.case-list-box {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.case-list-box h4 {
  margin: 0 0 10px;
  color: var(--accent-3);
}

.case-list-box ul {
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
}

.training-section {
  background: var(--surface-2);
}

.training-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(160px, 1fr));
  gap: 12px;
}

.training-day {
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.training-day span {
  color: var(--accent);
  font-weight: 950;
}

.training-day h3 {
  margin: 12px 0;
  font-size: 18px;
}

.training-day dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.training-day dt {
  color: var(--text);
  font-size: 12px;
  font-weight: 900;
}

.training-day dd {
  margin: 3px 0 0;
  color: var(--muted);
  font-size: 13px;
}
```

- [ ] **Step 3: Replace old inactive carousel styles in `styles/sections.css`**

Remove these selector blocks because the corresponding HTML is deleted:

```css
.library-controls
.dot
.dot.active
.library-controls button
.library-controls svg
```

- [ ] **Step 4: Add template option styles in `styles/tools.css`**

```css
.template-options {
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}

.template-option {
  min-height: 76px;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 4px 10px;
  align-items: start;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  cursor: pointer;
}

.template-option input {
  grid-row: 1 / 3;
  width: 16px;
  min-height: 16px;
  margin-top: 3px;
  accent-color: var(--accent);
}

.template-option:has(input:checked) {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, var(--surface));
}

.template-option span {
  font-size: 14px;
  font-weight: 900;
}

.template-option small {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
}

.secondary-button {
  min-height: 40px;
  margin-top: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  padding: 0 14px;
  font-weight: 850;
}
```

- [ ] **Step 5: Add responsive rules in `styles/responsive.css`**

```css
@media (max-width: 1240px) {
  .agenda-grid,
  .training-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .agenda-grid,
  .training-grid,
  .case-support-grid {
    grid-template-columns: 1fr;
  }

  .case-tabs {
    grid-auto-flow: column;
    grid-auto-columns: minmax(180px, 1fr);
    overflow-x: auto;
    padding-bottom: 4px;
  }
}

@media (max-width: 760px) {
  .template-options {
    grid-template-columns: 1fr;
  }

  .agenda-grid article,
  .training-day {
    min-height: auto;
  }
}
```

- [ ] **Step 6: Run tests and build**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS and `dist/index.html` is generated.

- [ ] **Step 7: Commit visual system**

```bash
git add styles/base.css styles/layout.css styles/sections.css styles/tools.css styles/responsive.css
git commit -m "style: unify workshop layout and controls"
```

## Task 8: Update README And Build Verification

**Files:**
- Modify: `README.md`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Replace `README.md` content**

```md
# AI Coding 素养课：从会用工具到 AI 协同工作

面向校招生的 90 分钟 AI 协同工作坊课程站。课程重点不是工具清单或纯代码技巧，而是训练新人用 AI 做目标定义、上下文组织、任务拆解、执行辅助、质量验收和复盘沉淀。

## 课程产出

- 一张可复用 AI 协同任务卡
- 一组可复制提示词
- 一份质量验收清单
- 一份 7 天复盘记录

## 90 分钟结构

- 8 分钟：为什么不是“会用工具”
- 15 分钟：AI 协同工作法
- 20 分钟：从问题到任务卡
- 25 分钟：岗位实战案例
- 12 分钟：质量验收与边界
- 10 分钟：7 天训练计划

## 内容结构

- AI 时代的 T 型人才：一专更深，多能成链
- AI 新工作语言：Goal、Context、Prompt、Agent、Eval、Guardrails、Tracing、Harness Engineering、Loop Engineering、Subagent、Worktree
- 方法工具箱：任务卡模板、提示词结构、验收清单
- 岗位案例：新人周报、需求理解、竞品调研、代码/文档预审、会议纪要、运营复盘、用户反馈整理
- 课后训练：7 天行动计划和 AI 协同工作包

## Preview

```bash
npm run dev
```

访问 `http://localhost:4173/`。

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

构建产物输出到 `dist/`，用于 GitHub Pages workflow 部署。

## Publish

`.github/workflows/package-and-deploy.yml` 会在 `main` 分支运行测试、打包并通过 GitHub Pages 发布。
```

- [ ] **Step 2: Run full automated verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 3: Commit README and verification alignment**

```bash
git add README.md
git commit -m "docs: describe workshop course structure"
```

## Task 9: Browser QA And Final Fix Pass

**Files:**
- Modify only files needed to fix QA failures discovered in this task.
- Test: browser screenshots plus `npm test` and `npm run build`

- [ ] **Step 1: Start local preview server**

Run: `npm run dev`

Expected: server prints a localhost URL on port `4173`, or an available fallback if `4173` is occupied.

- [ ] **Step 2: Verify desktop viewport**

Use browser automation or manual browser inspection at `http://localhost:4173/` with viewport `1440x900`.

Expected:
- Hero has one primary action and one secondary action.
- No homepage carousel dots or dead arrow buttons are visible.
- Workshop agenda fits without horizontal page overflow.
- Task card generator template options are visible and clickable.
- Case tabs update the detail panel.

- [ ] **Step 3: Verify tablet viewport**

Use viewport `768x1024`.

Expected:
- Navigation remains reachable.
- Agenda and training cards wrap cleanly.
- Case tabs do not squeeze the detail panel.
- Text does not overlap or clip.

- [ ] **Step 4: Verify mobile viewport**

Use viewport `375x812`.

Expected:
- Page has no horizontal overflow.
- Buttons remain at least 44px tall.
- Long Chinese headings wrap within containers.
- Task templates stack in one column.
- Case and training content is readable without nested horizontal scrolling.

- [ ] **Step 5: Verify interactions**

In the browser:
- Click `开始90分钟路径`; expected page scrolls to `#agenda`.
- Click `生成任务卡`; expected `#task-card-output` becomes visible with a complete task card.
- Click `复制任务卡`; expected button text changes to `已复制` briefly.
- Switch task templates; expected form values update to the selected template.
- Switch case tabs; expected case detail changes and active state moves.
- Switch term groups and terms; expected detail changes and active state moves.
- Click full-screen icon; expected `aria-pressed` and label update.

- [ ] **Step 6: Run final automated verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit QA fixes**

If files changed during QA, run:

```bash
git add index.html src styles README.md tests/site.test.mjs
git commit -m "fix: polish workshop site QA issues"
```

If no files changed during QA, run:

```bash
git status --short
```

Expected: no output.

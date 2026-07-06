export const termGroups = [
  {
    id: "basic",
    label: "基础语言",
    terms: [
      {
        name: "Goal",
        title: "Goal：把愿望变成可验收目标",
        problem: "新人常说“帮我做个方案”，AI 不知道成功标准。Goal 要写清对象、结果、约束和验收方式。",
        example: "不要说“帮我写周报”，而是说“根据 5 条项目进展，生成给导师看的周报，突出风险、下周计划和需要支持的事项”。",
      },
      {
        name: "Context",
        title: "Context：让 AI 吃到正确材料",
        problem: "AI 输出不稳定，很多时候不是模型不行，而是上下文缺失、材料过期或边界不清。",
        example: "做竞品调研时，把目标用户、对比维度、已有材料、不能引用的来源和输出格式一起给 AI。",
      },
      {
        name: "Prompt",
        title: "Prompt：不是咒语，是工作说明书",
        problem: "提示词的价值不是写得玄，而是能把目标、材料、步骤、标准和边界说清楚。",
        example: "把“帮我看看需求”改成“请按用户价值、实现风险、测试点、上线影响四栏做预审”。",
      },
    ],
  },
  {
    id: "agent",
    label: "Agent 协同",
    terms: [
      {
        name: "Agent",
        title: "Agent：能按目标推进任务的执行体",
        problem: "Agent 不只是聊天，它能读上下文、制定计划、调用工具、输出结果，并把过程留下来。",
        example: "让 Agent 先读需求、列实现计划、补测试、生成 PR 说明，再等人审查。",
      },
      {
        name: "Claude Tag",
        title: "Claude Tag：团队频道里的常驻 AI 执行体",
        problem: "团队任务散落在群聊里，单人聊天式 AI 很难共享上下文和持续跟进。",
        example: "在频道中 @Claude，让它读取 thread 背景，给出可见执行计划，异步产出摘要、图表或 draft PR，并附审计回放。",
      },
      {
        name: "Agent Team",
        title: "Agent Team：把复杂任务拆给多个角色",
        problem: "复杂工作不适合塞进一次 prompt。需要 Planner、Researcher、Executor、Reviewer 分工。",
        example: "竞品分析中，Planner 定维度，Researcher 找材料，Executor 写报告，Reviewer 查事实和风险。",
      },
      {
        name: "Subagent",
        title: "Subagent：专项能力的临时队友",
        problem: "主 Agent 容易在复杂任务中丢焦点，Subagent 适合处理独立子任务。",
        example: "一个 Subagent 专门查术语，一个 Subagent 专门审案例，一个 Subagent 专门跑测试。",
      },
      {
        name: "Worktree",
        title: "Worktree：并行试验的隔离工作区",
        problem: "多个 Agent 或多条方案同时改代码，容易互相覆盖。Worktree 让每条方案有独立空间。",
        example: "A 方案优化页面结构，B 方案重做互动工具，最后比较效果再合并。",
      },
    ],
  },
  {
    id: "engineering",
    label: "工程化",
    terms: [
      {
        name: "Harness Engineering",
        title: "Harness Engineering：给 AI 搭工作台",
        problem: "AI 要稳定工作，需要工具、权限、上下文、测试、日志、沙箱和回滚，而不是裸聊。",
        example: "给代码 Agent 准备仓库、测试命令、权限边界、日志记录和人工审批点。",
      },
      {
        name: "Eval",
        title: "Eval：定义什么叫做得好",
        problem: "没有评测，AI 输出只能靠感觉。Eval 把好坏标准变成样例、检查项和通过条件。",
        example: "周报要检查是否有进展、风险、下周计划、需要支持事项，缺一项就不通过。",
      },
      {
        name: "Guardrails",
        title: "Guardrails：把不能做的事写进系统",
        problem: "AI 越能干，越要明确边界。Guardrails 约束权限、敏感数据、输出口径和停止条件。",
        example: "行政审批案例中，AI 可以预审材料，但不能说“同意回购”或编造系统状态。",
      },
      {
        name: "Tracing",
        title: "Tracing：让过程可追踪",
        problem: "只看最终答案很难复盘。Tracing 记录输入、工具调用、判断路径和失败点。",
        example: "Claude Tag 的审计回放页就是团队能复盘 AI 做了什么、为什么这么做的线索。",
      },
    ],
  },
  {
    id: "loop",
    label: "组织学习",
    terms: [
      {
        name: "Loop Engineering",
        title: "Loop Engineering：把一次使用变成改进闭环",
        problem: "AI 用完就散，团队能力不会增长。Loop 要记录任务、复盘错误、沉淀模板、更新标准。",
        example: "把一次好的需求预审提示词沉淀成团队模板，把漏掉的测试项加入下次检查清单。",
      },
      {
        name: "Human Review",
        title: "Human Review：人负责验收和责任",
        problem: "AI 可以先做，但新人必须知道最终判断、例外处理、制度解释和风险承担仍在人。",
        example: "AI 写出上线说明后，人要确认影响范围、回滚方案、灰度策略和告警监控。",
      },
      {
        name: "Skill",
        title: "Skill：把好方法封装起来",
        problem: "提示词只靠个人记忆，难复用。Skill 把流程、材料、规则和输出模板固定下来。",
        example: "把行政审批预审、竞品调研、代码审查做成团队可复用 Skill。",
      },
    ],
  },
];

export const allTerms = termGroups.flatMap((group) =>
  group.terms.map((term) => ({
    ...term,
    group: group.id,
    groupLabel: group.label,
  })),
);

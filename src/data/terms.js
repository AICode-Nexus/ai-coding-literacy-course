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
        classroomUse: "让学员把一句模糊请求改写成可执行任务卡片。",
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
        classroomUse: "让学员给自己的任务卡写四条可检查验收标准。",
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
        classroomUse: "让学员把一次返工转成下次可复用团队检查清单。",
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
        classroomUse: "让学员把自己的任务卡整理成团队可复用模板。",
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

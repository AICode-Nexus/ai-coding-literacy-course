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
    goal: "选定可验收真实任务",
    task: "从本周工作中选一个可评价、可复盘、风险不高的真实任务。",
    output: "任务名称和接收人",
    check: "任务能在一周内完成，且有明确接收人和评价方式。",
    feedbackQuestion: "导师会如何判断这件事做得好不好？",
  },
  {
    day: 2,
    goal: "写清目标材料边界",
    task: "补齐 Goal、Context、输出格式和不能做的事。",
    output: "任务卡完整初稿",
    check: "材料来源明确，边界写清楚，不把猜测当事实。",
    feedbackQuestion: "AI 还缺哪类上下文会导致误判？",
  },
  {
    day: 3,
    goal: "让 AI 先处理",
    task: "让 AI 先生成草稿、摘要、预审问题或行动项，不直接交付。",
    output: "AI 结构化初稿",
    check: "输出符合指定结构，并标出不确定信息。",
    feedbackQuestion: "哪些内容看起来顺，但需要人工核验？",
  },
  {
    day: 4,
    goal: "完成四项质量验收",
    task: "按事实、结构、风险、边界四项检查 AI 输出。",
    output: "质量验收清单",
    check: "每条关键结论都有来源、依据或待确认标记。",
    feedbackQuestion: "哪些判断必须交给导师或负责人确认？",
  },
  {
    day: 5,
    goal: "沉淀可复用提示词",
    task: "把有效提示词改成下次可复用的任务模板。",
    output: "可复用提示词模板",
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
    goal: "形成可复用工作包",
    task: "复盘一次成功或返工，把任务卡、提示词、验收清单和复盘记录整理成工作包。",
    output: "AI 协同工作包",
    check: "工作包能被另一个新人读懂并复用。",
    feedbackQuestion: "如果下周重做一次，哪一步可以少返工？",
  },
];

const verifiedAt = "2026-07-13";
const reviewDays = 90;

const rawToolCategories = [
  {
    id: "general-assistant",
    name: "通用 AI 助手",
    purpose: "处理问答、分析、写作、文件理解与多模态交流，是多数任务的低门槛入口。",
    selectionCriteria: ["推理与指令理解", "上下文与文件能力", "多模态输入输出", "数据与隐私策略", "延迟和总成本"],
    risks: ["把流畅回答当成事实", "把敏感材料交给未经批准的服务", "依赖单一产品形成不可迁移习惯"],
    reviewDays,
    representatives: [
      { name: "讯飞星火", officialUrl: "https://xinghuo.xfyun.cn/", verifiedAt, note: "通用对话、文件与多模态能力示例" },
      { name: "ChatGPT", officialUrl: "https://chatgpt.com/", verifiedAt, note: "通用助手与工具能力示例" },
      { name: "Claude", officialUrl: "https://claude.ai/", verifiedAt, note: "通用助手、文件分析与研究能力示例" },
      { name: "Gemini", officialUrl: "https://gemini.google.com/", verifiedAt, note: "通用助手与多模态能力示例" },
      { name: "豆包", officialUrl: "https://www.doubao.com/", verifiedAt, note: "中文通用助手与内容能力示例" },
      { name: "Kimi", officialUrl: "https://www.kimi.com/", verifiedAt, note: "通用助手、研究与文档能力示例" },
      { name: "通义千问 / Qwen", officialUrl: "https://qwen.ai/qwenchat", verifiedAt, note: "通用助手与多模态能力示例" },
      { name: "DeepSeek", officialUrl: "https://chat.deepseek.com/", verifiedAt, note: "通用对话与推理能力示例" },
    ],
  },
  {
    id: "deep-research",
    name: "深度研究",
    purpose: "围绕复杂问题执行多轮搜索、筛选、分析与综合，交付带来源的研究材料。",
    selectionCriteria: ["来源覆盖与权威性", "引用可追溯性", "时间范围与新鲜度", "研究过程可检查", "敏感数据边界"],
    risks: ["引用存在不等于结论正确", "搜索范围偏差被包装成完整研究", "过时网页与二手转述混入证据"],
    reviewDays,
    representatives: [
      { name: "ChatGPT Deep Research", officialUrl: "https://help.openai.com/en/articles/10500283-research-faq", verifiedAt, note: "多步骤联网研究能力示例" },
      { name: "Gemini Deep Research", officialUrl: "https://gemini.google/overview/deep-research/", verifiedAt, note: "自动浏览与研究报告能力示例" },
      { name: "Kimi 深度研究", officialUrl: "https://www.kimi.com/zh-cn/help/new-user-guide/overview", verifiedAt, note: "中文研究与来源整理能力示例" },
    ],
  },
  {
    id: "coding-agent",
    name: "Coding Agent",
    purpose: "理解代码仓库、编辑文件、执行命令和测试，把代码生成推进到可验证的软件改动。",
    selectionCriteria: ["仓库与依赖理解", "工具调用和终端能力", "测试与审查闭环", "权限、沙箱和审批", "差异查看与回滚"],
    risks: ["权限过大导致意外副作用", "测试通过但业务目标错误", "并行修改造成文件或分支冲突"],
    reviewDays,
    representatives: [
      { name: "Codex", officialUrl: "https://openai.com/codex/get-started/", verifiedAt, note: "多环境软件工程 Agent 示例" },
      { name: "Claude Code", officialUrl: "https://code.claude.com/docs/en/overview", verifiedAt, note: "终端与仓库协作 Agent 示例" },
      { name: "Cursor", officialUrl: "https://www.cursor.com/", verifiedAt, note: "AI 代码编辑器与 Agent 示例" },
      { name: "GitHub Copilot", officialUrl: "https://github.com/features/copilot", verifiedAt, note: "编辑器、CLI 与 GitHub 工作流示例" },
    ],
  },
  {
    id: "agent-workflow",
    name: "Agent / 工作流平台",
    purpose: "连接模型、知识、工具、审批和业务系统，把多步骤协作固化为可运行流程。",
    selectionCriteria: ["编排和条件分支", "系统连接能力", "人工审批节点", "日志与可观测性", "失败恢复与版本管理"],
    risks: ["先画复杂流程再确认真实目标", "连接权限扩张但缺少审计", "失败分支和人工接管没有设计"],
    reviewDays,
    representatives: [
      { name: "Dify", officialUrl: "https://dify.ai/", verifiedAt, note: "Agentic workflow 与知识连接平台示例" },
      { name: "扣子 Coze", officialUrl: "https://www.coze.cn/overview", verifiedAt, note: "智能体、技能与工作流平台示例" },
      { name: "n8n", officialUrl: "https://n8n.io/ai/", verifiedAt, note: "业务自动化与 AI 工作流平台示例" },
    ],
  },
  {
    id: "multimodal-creation",
    name: "多模态创作",
    purpose: "把文字、图片、音频和视频组合成可视化内容，用于表达、演示与创意生产。",
    selectionCriteria: ["输入与输出模态", "画面和动作可控性", "编辑与迭代能力", "素材版权与授权", "交付尺寸和格式"],
    risks: ["生成内容侵犯版权或肖像权", "视觉效果掩盖事实错误", "素材来源与后期修改无法追溯"],
    reviewDays,
    representatives: [
      { name: "即梦 AI", officialUrl: "https://www.jimeng.com/", verifiedAt, note: "中文图像与视频创作平台示例" },
      { name: "可灵 AI", officialUrl: "https://kling.ai/cn", verifiedAt, note: "图像与视频生成平台示例" },
      { name: "Midjourney", officialUrl: "https://www.midjourney.com/", verifiedAt, note: "图像与视频创作平台示例" },
    ],
  },
  {
    id: "knowledge-connection",
    name: "知识与连接",
    purpose: "让 AI 按权限访问权威资料、知识库和外部系统，并保留来源与更新边界。",
    selectionCriteria: ["来源权威性", "检索和引用质量", "权限与身份隔离", "更新和失效机制", "访问轨迹可追溯"],
    risks: ["错误资料被当成组织事实", "检索结果越权暴露敏感内容", "知识长期不更新却继续被引用"],
    reviewDays,
    representatives: [
      { name: "RAG / 文件检索", officialUrl: "https://developers.openai.com/api/docs/guides/retrieval", verifiedAt, note: "按需检索证据片段的实现类别" },
      { name: "知识库", officialUrl: "https://docs.dify.ai/api-reference/knowledge-bases/retrieve-chunks-from-a-knowledge-base-test-retrieval", verifiedAt, note: "结构化知识接入与检索示例" },
      { name: "MCP", officialUrl: "https://modelcontextprotocol.io/docs/learn/architecture", verifiedAt, note: "tools、resources 与 prompts 的连接协议" },
      { name: "企业数据连接器", officialUrl: "https://developers.openai.com/api/docs/guides/tools-connectors-mcp", verifiedAt, note: "受权限控制的外部系统连接类别" },
    ],
  },
  {
    id: "capability-reuse",
    name: "能力复用",
    purpose: "把稳定的任务表达、项目规则、检查方法和执行步骤沉淀为可版本化资产。",
    selectionCriteria: ["复用频率和稳定性", "适用边界是否明确", "版本与负责人", "可测试和可评测性", "加载成本与上下文占用"],
    risks: ["把偶然成功过早封装成标准", "规则长期不更新造成错误复用", "模板让使用者跳过必要判断"],
    reviewDays,
    representatives: [
      { name: "Prompt 模板", officialUrl: "https://developers.openai.com/api/docs/guides/prompting", verifiedAt, note: "重复任务说明的轻量复用方式" },
      { name: "项目规则文件", officialUrl: "https://learn.chatgpt.com/docs/agent-configuration/agents-md", verifiedAt, note: "AGENTS.md、CLAUDE.md 等持久指令方式" },
      { name: "Skill", officialUrl: "https://learn.chatgpt.com/docs/build-skills", verifiedAt, note: "指令、参考、脚本与资产的按需复用方式" },
      { name: "检查清单", officialUrl: "https://developers.openai.com/api/docs/guides/agent-evals", verifiedAt, note: "把验收规则变成可重复检查资产" },
    ],
  },
];

export const toolCategories = rawToolCategories.map((category) => ({
  ...category,
  representatives: category.representatives.map((entry) => ({
    ...entry,
    reviewDays: category.reviewDays,
  })),
}));

export const toolCategoryById = Object.fromEntries(toolCategories.map((category) => [category.id, category]));

export function toolEntryStatus(entry, asOf = new Date()) {
  const verified = new Date(entry.verifiedAt + "T00:00:00Z");
  const ageDays = Math.floor((asOf.getTime() - verified.getTime()) / 86400000);
  return ageDays > entry.reviewDays ? "待重新核验" : "已核验";
}

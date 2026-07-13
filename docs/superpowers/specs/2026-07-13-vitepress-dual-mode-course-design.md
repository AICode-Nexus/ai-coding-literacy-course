# AI 协同方法论双模式课程站设计规格

> **已部分替代：** 2026-07-13 经用户确认的课程目标、章节结构、案例策略、教材目录与内容验收要求，改由 [`2026-07-13-ai-collaboration-scenario-course-restructure-design.md`](./2026-07-13-ai-collaboration-scenario-course-restructure-design.md) 约束。本文件仅继续提供 VitePress 双模式架构、16:9 舞台、离线能力和基础交互设计；冲突内容以新规格为准。

## 背景

课程位于校招生 AI 学习日的中段：上午先建立通用人工智能与公司技术认知，本课程负责把认知转成可复用的工作方法，后续再进入 Kooky AI Coding 实操。授课时段为 80 分钟讲授与 15 分钟交流，现场约 1050 人，主屏按 16:9 信号输出。

现有课程站已经具备课程路径、术语、案例、任务卡与全屏按钮，但仍然是一张很长的互动网页。它不适合在大场地里逐屏讲授，也不适合作为持续扩写的课后教材。新增的《2026年AI大模型产研提效基础知识学习手册》提供了较完整的概念和内部案例索引，但其中模型版本、上下文长度、跑分和工具搭载版本更新快，不能作为主教材的稳定骨架。

本次改版把站点重新定义为“讲课优先、课后可学”的双模式课程系统：

- 讲师模式是 1920×1080 的 16:9 舞台画布，一屏一个观点，以图解、对比、案例、演示和互动为主。
- 教材模式是 VitePress 教程站，提供章节导航、全文搜索、细节解释、来源、练习和进阶展开。
- 两种模式复用同一套课程数据、术语边界、案例和来源，不维护两份事实。

## 受众与教学策略

主要受众是已经使用过 ChatGPT、DeepSeek 等对话式 AI，但多数仍停留在一次性问答的校招生；少部分学员使用过 Cursor、Claude Code、Codex 等 AI Coding 工具。

因此采用 A/B 分层：

- A 主线：让大多数人从“问一个答案”升级到“派一件可验收的活”。正文、课堂画面和互动都按这条主线设计。
- B 进阶：为已有 Agent/CLI 经验的人提供 Context Engineering、持久上下文、编排模式、Evals、Harness、安全边界等折叠内容，不打断课堂主线。

## 内容审计规则

### 保留并强化

- AI 时代的 T 型人才：一专更深，多能成链。
- Goal、Context、Task、Output、Eval、Guardrails、Loop 组成的协同链。
- Prompt / Context / Harness / Loop，MCP / Tool Use / Agent，Subagent / Agent Team 等边界辨析。
- 周报、需求理解、调研、代码预审、会议纪要、运营复盘等校招生高频任务。
- 内部真实案例中的结构化需求、规范驱动、持久上下文、Skill 复用、自动化评测和人工检查点。

### 降级为附录或动态雷达

- Token、Transformer、预训练等已有 AI 基础概念，只保留一页快速复习。
- 产品与模型清单不进入主线；只提供带“核验日期”的官方入口。
- 具体上下文长度、价格、SWE-bench 分数和“当前最强”结论不写死在教材正文。
- Claude Tag、某一款 IDE/CLI 的版本特性不作为通用方法论。

### 删除或改写

- 无法从厂商官方资料确认的未来型号、跑分、窗口和发布日期。
- “复杂任务默认都要多 Agent”的绝对说法。多 Agent 只在任务独立、沟通收益高于协调成本时使用。
- “上下文越大越好”的暗示。上下文是有限注意力预算，需要筛选、按需加载和压缩。
- 把 SDD 简化为“多写文档”或让静态 Spec 永远压过运行中事实。改为“持久意图、当前事实、显式漂移与对齐”。
- 把 Loop Engineering、LLMWiki 当成成熟标准术语。保留其思想，标注为前沿观察或改写成反馈循环、活知识库。

## 最新知识主线

课程新增以下稳定、可验证的知识点：

1. **Context Engineering**：不只写提示词，而是管理指令、工具、例子、资料、历史与状态；追求最小而高信号的上下文，支持按需检索和 compaction。
2. **从对话到 Agent Loop**：Goal → Plan → Act → Observe → Verify → Continue/Stop。Agent 的关键不是“会聊天”，而是能调用工具、读取反馈并继续工作。
3. **持久上下文与漂移治理**：将长期意图、当前工作单元和运行中事实分层落盘；允许变化，但不允许静默漂移。
4. **编排选择**：单 Agent、Subagent、Agent Team、handoff 和 manager-as-tool 各有边界；先用最简单结构，只有契约、权限或并行收益发生变化时才拆分。
5. **Harness Engineering**：工具、权限、沙箱、测试、日志、状态、预算、停止条件、人工审批和回滚共同构成可控工作环境。
6. **Evals 与轨迹质量**：不仅检查最终答案，还检查工具选择、交接、指令遵守和安全策略；从单次 trace 走向可重复数据集和 eval runs。
7. **Skills 与渐进披露**：把可靠工作流封装成可复用的指令、参考资料、脚本与资产；需要时再加载完整内容，避免污染上下文。
8. **MCP 的真实边界**：MCP 是连接主机、客户端和服务端的上下文交换协议，核心原语是 tools、resources 和 prompts；它不是 Agent，也不负责业务编排。
9. **Agent 安全**：不可信网页和文档可能携带 prompt injection；敏感数据、外部写入、删除、发布和付费动作必须采用最小权限与人工审批。
10. **总成本而非单价**：模型选择同时考虑一次成功率、人工返工、延迟、上下文与风险；简单任务不默认使用最重的推理或多 Agent。

## 80 分钟课堂结构

| 时间 | 章节 | 课堂目的 | 主要展示 |
| --- | --- | --- | --- |
| 0–6 分钟 | 开场：你属于哪一类 AI 用户 | 让学员看到“会问”与“会协同”的差距 | 现场投票、同任务三种结果 |
| 6–16 分钟 | T 型人才与工作方式迁移 | 从工具熟练度转向工作闭环 | T 型能力图、旧/新工作流对比 |
| 16–34 分钟 | AI 协同七步法 | 建立整门课可复用的主线 | 七步流程、任务卡逐步生成、反例 |
| 34–48 分钟 | Context、Spec 与持久上下文 | 解释长任务为什么会失焦，以及如何恢复 | 上下文栈、注意力预算、意图/事实/漂移图 |
| 48–62 分钟 | Agent 工作系统 | 建立 Tool、MCP、Skill、Subagent、Team、Harness 的边界 | Agent loop、边界卡、编排决策树、Harness 控制台 |
| 62–72 分钟 | 三个真实案例剧场 | 让抽象方法落到真实产研场景 | 需求到交付、长期上下文、评测与接口自动化 |
| 72–80 分钟 | 质量、安全与行动 | 形成验收、审批和课后迁移 | 三层验收、风险矩阵、人机责任、7 天计划 |
| 80–95 分钟 | 交流与演示 | 按现场问题进入细节 | 章节总览、案例深挖、任务卡现场生成 |

## 讲师模式场景设计

讲师模式约 30 个场景，不把每分钟等同于一页 PPT。场景分为：

- Thesis：一句核心观点配一张主视觉。
- Compare：旧做法 / 新做法，或两个概念边界。
- Flow：流程逐步出现，可停在任意节点讲解。
- Architecture：Context、Agent、Harness、MCP 等关系图。
- Case Theatre：背景、关键动作、产物、检查点、结果五段式案例。
- Audience：举手/扫码/口头选择题，不依赖 1050 人同时联网。
- Demo：显示演示目标、输入、预期产物和兜底截图。
- Checklist：结论、风险和带走清单。

舞台约束：

- 逻辑画布固定为 16:9，以 1920×1080 设计，任意浏览器视口等比缩放并居中。
- 标题 72–96px，结论 48–64px，正文 32–40px，代码 28–34px。
- 一屏不超过 6 行主正文；代码不超过 16 行；重要信息避开边缘 8% 安全区。
- 默认深色舞台，高对比青绿、暖橙和米白；不使用紫色渐变式通用 AI 视觉。
- 支持方向键、空格、PageUp/PageDown、Home/End、F 全屏、O 总览、Esc 退出。
- URL 记录当前场景，刷新后可恢复；总览可快速跳到任意章节。
- 现场构建产物可离线运行，不依赖公网字体、图片或接口。

## 教材模式信息架构

- `/`：课程首页，区分“开始讲课”和“课后学习”。
- `/guide/00-start`：课程地图、受众、预期产出和学习方式。
- `/guide/01-shift`：T 型人才、从问答到交付、AI 与人的责任。
- `/guide/02-collaboration`：AI 协同七步法与任务卡。
- `/guide/03-context`：Context Engineering、Spec、持久上下文和 compaction。
- `/guide/04-agent-system`：Agent loop、Tool、MCP、Skill、Subagent、Agent Team、Harness。
- `/guide/05-cases`：三个内部案例与四个校招生迁移案例。
- `/guide/06-quality`：Evals、Tracing、Guardrails、审批、安全与风险分级。
- `/guide/07-practice`：7 天训练计划、任务卡生成器和结业产物。
- `/appendix/tool-radar`：按类别列官方入口，标明核验日期，不写“永久最新”的型号表。
- `/sources`：公开来源与内部来源说明。
- `/present`：16:9 讲师模式。

教材正文采用“先主线、后进阶”：每节先给一句结论、一个例子、一个练习；高级内容使用折叠块，避免 A 类学员被术语淹没。

## 共享数据与组件

事实数据放在 `course/.vitepress/data/`：

- `course.js`：课程元信息、80+15 分钟结构、学习产出。
- `concepts.js`：术语、边界、主线解释与进阶解释。
- `cases.js`：内部案例和迁移案例，不保存敏感原始材料。
- `sources.js`：官方与内部来源、核验日期、时效性标签。
- `scenes.js`：讲师模式场景，只引用共享概念和案例的 ID。
- `presentation.js`：场景索引、URL 与键盘动作的纯函数。
- `task-card.js`：任务卡生成纯函数。

Vue 组件放在 `course/.vitepress/theme/components/`：

- `CourseHome.vue`：教程站首页。
- `PresentDeck.vue`：舞台状态、键盘、全屏、总览和进度。
- `StageScene.vue`：场景文本和布局。
- `StageVisual.vue`：流程、矩阵、栈、循环、案例和风险图。
- `CollaborationFlow.vue`：教材中的七步交互图。
- `BoundaryBoard.vue`：概念边界切换。
- `CaseTheatre.vue`：案例切换。
- `TaskCardLab.vue`：课后任务卡生成。
- `AdvancedTrack.vue`：B 类学员进阶折叠。

## 视觉方向

视觉概念为“现场导演台 × 工程手册”：

- 讲师模式像一块可以推进的舞台控制画布，深墨蓝底、青绿色结构线、暖橙风险标记、米白文字。
- 教材模式像一本带荧光批注的工程手册，浅米色纸张、深墨文字、细网格与章节色带。
- 数字、英文标签和章节编号使用 Avenir Next Condensed 等本机展示字体；中文使用 PingFang SC / Source Han Sans SC 回退栈。
- 用 CSS 网格、连线、节点、堆栈和光晕建立空间感；动画只服务逐步揭示和状态变化，并尊重 `prefers-reduced-motion`。

## 验收标准

### 内容

- 80 分钟讲授与 15 分钟交流在数据中明确，讲授时间合计准确。
- 讲师场景不少于 28 个，覆盖全部 7 个章节和 7 种场景类型中的至少 6 种。
- 教材至少 8 个章节页、1 个工具雷达、1 个来源页。
- 三个内部案例均包含背景、动作、产物、检查点和可迁移结论。
- 所有时效性强的模型与工具信息均带核验日期或改成官方入口。
- 不出现未经官方确认的型号、跑分、上下文长度和“绝对领先”表述。

### 讲师模式

- 在 1920×1080 下无滚动条、无溢出、无浏览器导航干扰。
- F/按钮进入浏览器全屏，Esc 退出；方向键、空格、PageUp/PageDown、Home/End 可导航。
- O 打开场景总览并可点击跳转；当前场景写入 URL。
- 最小字号不低于 28px；安全区内主内容可读。
- 刷新后恢复 URL 指定场景；错误 scene 参数回退到第一页。

### 教材模式

- 默认主题具备侧栏、目录、上一章/下一章、本地搜索和移动端导航。
- 首页清楚提供“开始讲课”和“课后学习”两个入口。
- 交互组件可键盘操作，颜色对比和焦点状态清楚。
- 375、768、1440 和 1920 宽度下无横向溢出。

### 工程

- Node 22 CI 下 `npm ci`、`npm test`、`npm run build` 全部通过。
- GitHub Pages 构建使用 `/ai-coding-literacy-course/` base，本地开发使用 `/`。
- 构建输出到根目录 `dist/`，可作为静态文件离线打开/托管。
- 纯函数采用 TDD；关键页面进行真实浏览器和 1920×1080 截图验证。

## 来源策略

公开知识只引用一手资料：

- VitePress 内容与自定义主题：[VitePress](https://vitepress.dev/guide/what-is-vitepress)
- Context Engineering：[Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Subagents：[OpenAI Codex](https://developers.openai.com/codex/subagents/)
- Agent Teams：[Claude Code](https://code.claude.com/docs/en/agent-teams)
- Skills：[OpenAI Codex](https://developers.openai.com/codex/skills/)
- MCP 架构：[Model Context Protocol](https://modelcontextprotocol.io/docs/learn/architecture)
- Guardrails 与人工审批：[OpenAI Agents](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- Agent Evals：[OpenAI Agents](https://developers.openai.com/api/docs/guides/agent-evals)
- Prompt Injection 风险：[Anthropic Research](https://www.anthropic.com/research/prompt-injection-defenses)
- Claude Code 权限与沙箱：[Claude Code](https://code.claude.com/docs/en/permissions)

内部来源只提炼方法和匿名化流程，不复制敏感截图与项目细节：

- 《2026年AI大模型产研提效基础知识学习手册-20260630》
- 《以CDD驱动项目长期上下文资产化实战》
- 《规范驱动开发全链路实践与Skill沉淀技巧》
- 《AI驱动的效果评测与接口自动化》
- 《AI原生软件开发全生命周期业务实践》

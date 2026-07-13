---
title: 04 Agent 工作系统
description: Agent Loop、工具调用、MCP、Skills、编排选择与 Harness Engineering
---

<span class="chapter-kicker">04 · Agent System</span>

# Agent 不是更会聊天，而是能围绕目标行动并读取反馈

一次普通问答大多是 `输入 → 生成文本`。Agent 工作循环则是：

`目标 → 规划下一步 → 调用工具 → 观察真实结果 → 检查 → 继续 / 停止 / 交接`

工具可能是搜索、文件系统、Shell、浏览器、数据库或业务 API。Agent 的价值不在于“会调用工具”这一动作本身，而在于能否围绕目标选择正确动作，并对结果持续校准。

## Agent Loop 的五个必要部件

<div class="concept-grid">
  <div class="concept-card"><span>GOAL</span><h3>可判断的目标</h3><p>没有完成条件，循环就不知道何时结束。</p></div>
  <div class="concept-card"><span>ACTION</span><h3>受限的动作空间</h3><p>工具明确、参数结构化、权限最小化。</p></div>
  <div class="concept-card"><span>OBSERVATION</span><h3>真实反馈</h3><p>读取文件、测试、页面、接口或环境状态，不凭记忆猜。</p></div>
  <div class="concept-card"><span>CHECK</span><h3>独立验收</h3><p>根据标准判断通过、修复、暂停或升级。</p></div>
  <div class="concept-card"><span>STOP</span><h3>预算与停止条件</h3><p>达到结果、触发风险、连续无进展或预算耗尽时退出。</p></div>
</div>

## Tool、MCP、Skill、Agent 到底是什么关系

| 概念 | 一句话 | 不负责什么 |
| --- | --- | --- |
| Tool | 执行一个结构化动作，如搜索、读文件、跑测试 | 不负责长期目标与任务规划 |
| MCP | 标准化 AI 应用如何发现 tools、resources、prompts | 不自动替你编排业务流程 |
| Skill | 封装可靠步骤、参考资料、脚本和资产，按需加载 | 不等于某个外部 API |
| Agent | 围绕目标选择并组合动作，读取反馈并决定下一步 | 不等于一个模型或一个工具 |

可以用一个不严谨但直观的类比：MCP 像插座标准，Tool 像具体电器，Skill 像经过验证的操作手册，Agent 是根据目标决定何时使用哪件工具的执行者。

<BoundaryBoard />

## Skills：把可靠做法从聊天里拿出来

一个成熟 Skill 不只是“请按以下步骤做”的长提示词。它可以包含：

- 入口说明：何时应该使用、何时不该使用；
- 稳定流程：顺序、检查点和失败处理；
- 参考资料：领域规则、模板、质量标准；
- 脚本：把确定性操作交给代码；
- 资产：样例、表格、视觉模板；
- 渐进披露：只有匹配任务时才加载细节。

内部评测案例就是从一个小场景开始：先人工验证 AI 真能完成，再固定 Schema 和执行脚本，最后把失败样例持续反馈进 Skill。

## 编排选择：更多 Agent 不是默认答案

| 结构 | 适合 | 不适合 | 主要成本 |
| --- | --- | --- | --- |
| Single Agent | 一个主线可完成、需要完整上下文 | 大量重日志污染主线 | 低 |
| Subagent | 子任务独立、可并行、只需返回摘要 | 成员需要高频相互讨论 | 中 |
| Agent Team | 多个角色必须共享任务并直接协商 | 顺序强依赖、同一文件争抢 | 高 |

**默认从单 Agent 开始。** 只有当子任务可以独立、结果能明确汇总时再使用 Subagent；只有成员确实需要互相挑战观点或动态协调时，才考虑 Agent Team。

在分任务前先画依赖：

- 资料核验、独立案例扫描、互不影响的测试通常适合并行；
- 先设计后实现、同一文件多方修改、下一步依赖前一步结论通常应保持顺序；
- 并行节省的是等待时间，却会增加通信、合并、重复和验证成本。

<AdvancedTrack title="常见的两种多 Agent 编排">

**Manager-as-tool**：主 Agent 保持控制，通过工具形式调用专门 Agent，适合由主线统一汇总。**Handoff**：当前 Agent 把对话控制权转交给另一个角色，适合分诊、客服等角色明显切换的流程。选择标准是“谁需要保持最终控制权”，不是哪个名词更新。

</AdvancedTrack>

## Harness Engineering：稳定产出依赖环境设计

Prompt 说明怎样思考；Harness 决定 Agent 是否有条件安全、稳定地做成。一个可用 Harness 通常包含：

<div class="practice-grid">
  <div class="practice-card"><span>TOOLS</span><h3>工具与工作目录</h3><p>可发现、可组合，输入输出清晰，避免让 Agent 猜环境。</p></div>
  <div class="practice-card"><span>PERMISSIONS</span><h3>权限与沙箱</h3><p>默认最小权限，敏感动作明确审批，外部内容视为不可信数据。</p></div>
  <div class="practice-card"><span>VERIFICATION</span><h3>测试与评测</h3><p>机器规则先跑，语义质量再评，关键结果由人确认。</p></div>
  <div class="practice-card"><span>OBSERVABILITY</span><h3>日志与轨迹</h3><p>记录模型、工具、交接、失败和审批，问题可以定位和复现。</p></div>
  <div class="practice-card"><span>STATE</span><h3>状态与交接</h3><p>当前计划、完成证据、未决项能跨会话恢复。</p></div>
  <div class="practice-card"><span>RECOVERY</span><h3>预算、停止与回滚</h3><p>限制轮次和成本，失败时安全退出，不把无限重试当智能。</p></div>
</div>

## 本章练习：判断要不要上 Agent

选择你的真实任务，依次回答：

1. 仅生成文本就能完成，还是必须读取外部真实状态？
2. 需要哪些工具？每个工具最小权限是什么？
3. 哪个动作有副作用，必须预览或审批？
4. 哪个检查可以自动化？哪个判断必须由责任人完成？
5. 子任务真的可以独立吗？如果不用多 Agent，会损失什么？

如果前四问还没有答案，先不要增加 Agent 数量。下一章进入[真实案例剧场](/guide/05-cases)，看团队怎样留下 spec、plan、tests、reports 和 Skills。


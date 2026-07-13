---
title: 工具雷达
description: 按能力类别、任务约束、选择标准、风险与核验状态选择 AI 工具
---

<script setup>
import { computed } from "vue";
import { toolCategories, toolEntryStatus } from "../.vitepress/data/tools.js";

const categoryIds = computed(() => toolCategories.map((category) => category.id));
const reviewState = computed(() => toolCategories.map((category) => ({
  id: category.id,
  name: category.name,
  status: toolEntryStatus(category.representatives[0]),
  verifiedAt: category.representatives[0].verifiedAt,
})));
</script>

<span class="chapter-kicker">Appendix · Tool Radar</span>

# 先按任务能力选工具，再看代表产品

模型型号、产品入口、价格、上下文窗口和功能变化很快。本页不维护排行榜，也不发布“长期最强”结论；它提供七类相对稳定的能力、选择标准、风险、官方入口和核验日期。

## 六个模型与工具选择维度

| 维度 | 关键问题 | 不能只看 |
| --- | --- | --- |
| 任务难度 | 简单生成、结构化处理还是复杂推理？ | 宣传中的综合能力 |
| 上下文规模 | 材料有多少、来源怎样、是否频繁变化？ | 最大窗口数字 |
| 多模态需求 | 要理解或生成哪些文字、图像、音视频？ | “支持多模态”标签 |
| 工具能力 | 只需回答，还是需要搜索、读写、执行与反馈？ | 演示中的一次成功 |
| 数据安全 | 材料能否上传、连接、存储与留痕？ | 个人使用便利性 |
| 总成本 | 延迟、首轮通过、返工、上下文准备、复核与风险？ | 单次调用价格 |

总成本至少包括：等待时间、首轮成功率、返工、上下文准备、人工复核、系统接入、迁移、权限治理和失败风险。生成更快，不代表交付更便宜。

## 七类能力全景

<ToolLandscape :category-ids="categoryIds" />

## 核验状态

工具记录按 90 天复核周期管理。状态只说明页面入口是否处于复核窗口内，不代表产品质量、合规性或适合你的任务。

<table>
  <thead><tr><th>能力类别</th><th>最近核验</th><th>当前状态</th></tr></thead>
  <tbody>
    <tr v-for="item in reviewState" :key="item.id"><td>{{ item.name }}</td><td>{{ item.verifiedAt }}</td><td>{{ item.status }}</td></tr>
  </tbody>
</table>

正式授课、团队采购或高风险使用前，应再次打开官方入口确认：可用版本、能力范围、地区与账号限制、数据政策、价格和预览状态。

## 最小充分的能力组合

### A 类学员

从通用助手或已经批准的工作工具开始，配合真实材料、任务卡和验收清单。先跑完整闭环，不因工具焦虑跳过目标与证据。

### B 类学员

使用 Coding Agent 或工作流平台时，重点补齐 Harness：项目规则、最小权限、沙箱或隔离目录、测试、轨迹、停止条件、审批与回滚。

### 团队实践

重复任务已经稳定后，再增加知识连接、Skill 与自动化；只有子任务独立、收益高于协调成本时，才增加 Subagent 或 Team。

## 不用这些信号直接做决定

- 单一排行榜、宣传演示或未说明任务分布的准确率；
- 未经官方核验的版本、参数、价格或上下文数字；
- “支持 MCP”但没有身份、权限与维护说明；
- “全自动”但没有测试、日志、审批、停止与恢复；
- 只比较生成速度，不比较返工、风险和总交付成本；
- 一个产品覆盖多类能力，就假设每一类都同样成熟。

## 用代表任务做小型选型 Eval

准备 5–10 个能代表真实工作的小任务，记录：

- 任务完成率与失败类型；
- 关键事实与来源是否正确；
- 人工介入、返工和总耗时；
- 工具调用、权限与高风险动作；
- 资产能否迁移到另一模型或产品。

用同一组任务比较能力组合，比继续浏览功能列表更可靠。

[学习模型与工具全景](/guide/03-ai-landscape) · [查看概念词典](/appendix/glossary) · [查看来源与核验](/sources)

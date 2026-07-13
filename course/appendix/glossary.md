---
title: 概念词典
description: 按基础、协同、行动系统与前沿分组查看 AI 协同概念、作用、边界和来源
---

<script setup>
import { computed } from "vue";
import { concepts } from "../.vitepress/data/concepts.js";

const conceptIds = computed(() => concepts.map((concept) => concept.id));
const maturityCounts = computed(() => ({
  core: concepts.filter((concept) => concept.level === "core").length,
  advanced: concepts.filter((concept) => concept.level === "advanced").length,
  frontier: concepts.filter((concept) => concept.level === "frontier").length,
}));
</script>

<span class="chapter-kicker">Appendix · Glossary</span>

# 概念词典：先知道它解决什么，也知道它不能替代什么

本页直接读取课程共享概念注册表。讲台、九章教程和词典使用同一套定义、成熟度、节点关系、场景关系与来源，不单独维护第二份解释。

## 阅读方式

概念按成熟度标记：

- **A · 核心（{{ maturityCounts.core }}）**：所有学员应理解并能在普通任务中使用；
- **B · 进阶（{{ maturityCounts.advanced }}）**：已有 AI Coding / Agent 基础的学员继续深入；
- **前沿观察（{{ maturityCounts.frontier }}）**：正在形成中的工程实践，不包装成统一标准。

每张卡回答五件事：定义、解决的问题、不能替代什么、在哪些课程节点与场景出现、依据哪些一手来源。

<KnowledgeAtlas :concept-ids="conceptIds" />

## 四组最容易混淆的边界

<BoundaryBoard />

### Prompt / Context / Harness / Loop

- Prompt 表达这次任务；
- Context 组织此刻需要的信息；
- Harness 提供可执行、可观察、可控环境；
- Loop 根据真实反馈继续、停止与沉淀。

结果不稳定时，先判断坏在哪一层，再决定改什么。更长的 Prompt 不能修复缺失材料、错误权限或没有验收的循环。

### MCP / Tool / Agent

- MCP 是连接与能力发现协议；
- Tool 执行一个结构化动作；
- Agent 围绕目标选择和组合动作。

协议不是执行者，动作也没有长期目标。接入 MCP 不会自动形成业务编排。

### Single Agent / Subagent / Agent Team

- 默认从 Single Agent 开始；
- 子任务独立、需隔离上下文时使用 Subagent；
- 成员必须直接协商时才评估 Agent Team。

更多 Agent 会增加沟通、冲突、等待、Token 与验证成本，不是成熟度标志。

### RAG / AI-maintained Knowledge

- RAG 为当前问题取回证据片段；
- AI 维护知识页保存已经确认的理解、来源与关系。

即时检索与长期知识可以配合，但都不能替代原始证据、版本治理和责任人确认。

## 使用建议

1. 在某章遇到陌生术语，先打开对应卡片；
2. 先读“不能替代”，避免把新概念理解成万能答案；
3. 沿“相关节点”回到完整教程；
4. 沿“一手来源”核验技术边界；
5. 动态或前沿概念在正式使用前重新查看官方说明。

[回到课程地图](/guide/00-start) · [查看工具雷达](/appendix/tool-radar) · [打开模板库](/appendix/templates)

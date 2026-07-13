---
title: 来源与核验记录
description: 课程所用官方文档、内部实践和时效标记
---

<script setup>
import { computed } from "vue";
import { sources } from "./.vitepress/data/sources.js";

const groups = computed(() => [
  { id: "stable", title: "稳定方法与协议", note: "作为课程主线，可长期复用", items: sources.filter((item) => item.stability === "stable") },
  { id: "dynamic", title: "动态产品与工具入口", note: "授课前需再次核验", items: sources.filter((item) => item.stability === "dynamic") },
  { id: "internal", title: "内部手册与实践", note: "提炼方法、工件与检查点", items: sources.filter((item) => item.stability === "internal") },
]);
</script>

<span class="chapter-kicker">Sources · Verified 2026-07-13</span>

# 所有重要判断都应能回到来源

本课程优先使用官方一手文档和内部原始案例。来源按稳定性分为 `stable`、`dynamic`、`internal`，最后核验日期统一为 **2026-07-13**。

::: warning 关于内部手册中的时效内容
内部手册提供了有价值的概念框架和案例索引，但其中具体模型版本、排名、窗口与产品能力可能快速过时。本课程没有直接复制这些结论，而是回到官方入口核验，并只把稳定方法放进课程主线。
:::

<section v-for="group in groups" :key="group.id" class="source-group">
  <header><span>{{ group.id }}</span><div><h2>{{ group.title }}</h2><p>{{ group.note }}</p></div></header>
  <div class="source-cards">
    <article v-for="source in group.items" :key="source.id">
      <div><span>{{ source.publisher }}</span><small>{{ source.verifiedAt }}</small></div>
      <h3>{{ source.title }}</h3>
      <p>{{ source.use }}</p>
      <a :href="source.url" target="_blank" rel="noreferrer">打开原始来源 ↗</a>
    </article>
  </div>
</section>

## 课程中的取舍原则

- VitePress 用于承载同源双模式：Markdown 教材 + 自定义 Vue 讲师布局；
- Context Engineering 采用“高信号、按需检索、阶段压缩”的稳定原则；
- Agent 编排默认从单 Agent 开始，不把多 Agent 当成熟度标志；
- MCP 只解释连接协议边界，不把它描述成自动规划系统；
- Harness、Evals、Tracing、Guardrails 与人工审批作为 Agent 可靠性的核心；
- Loop Engineering、活知识库等仍以“反馈闭环/长期知识治理”表达，不包装成已统一的行业标准。

## 更新检查清单

正式授课前，重点复核本页 `dynamic` 分组：产品入口是否可用、文档是否改名、功能是否仍为预览、权限和风险说明是否变化。若某个动态事实不影响课程判断，优先删除它，而不是追着版本更新正文。

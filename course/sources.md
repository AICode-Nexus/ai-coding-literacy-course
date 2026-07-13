---
title: 来源与核验记录
description: 课程使用的稳定方法、动态产品入口与内部材料边界
---

<script setup>
import { computed } from "vue";
import { sources } from "./.vitepress/data/sources.js";

const labels = {
  stable: { title: "稳定方法与协议", note: "用于技术定义、方法边界与课程主线", badge: "STABLE" },
  dynamic: { title: "动态产品入口", note: "仅作为当前能力示例，正式使用前重新核验", badge: "DYNAMIC" },
  internal: { title: "内部材料", note: "只用于课程目标、学员起点、组织语境与有来源的方法线索", badge: "INTERNAL" },
};

const groups = computed(() => ["stable", "dynamic", "internal"].map((stability) => ({
  id: stability,
  stability,
  ...labels[stability],
  items: sources.filter((source) => source.stability === stability),
})));
</script>

<span class="chapter-kicker">Sources · Verified 2026-07-13</span>

# 所有重要判断都应能回到来源

本课程优先使用一手公共文档与用户提供的内部原始材料。每条来源记录都包含 `stability`（稳定性）与 `verifiedAt`（核验日期）；课程正文只保留来源能支持的判断。

<span id="internal-material"></span>

## 来源怎样进入课程

1. **内部课程说明**确定正式课程名称、目标、授课对象与人机协作方向；
2. **内部学员统计**确定多数人已有通用 AI 基础，并用于设计 A 主线 / B 进阶；
3. **官方一手公共文档**确定 LLM、Context、Agent、MCP、Skill、Evals、Guardrails 等技术定义与边界；
4. **动态产品入口**只作为能力例子，不构成排名、采购或使用推荐；
5. **内部学习手册**中的快速变化型号、排名、参数和未经确认判断不作为课程事实；
6. 缺少来源的内容必须标记为“场景演示”或“应用示例”，不能包装成已经发生的事实。

::: warning 关于时效与内部材料
内部材料可能包含敏感语境或快速变化的产品信息。本课程只提炼正式目标、可读统计与稳定方法，不复制敏感项目细节。动态内容在正式授课、采购或高风险使用前必须重新核验。
:::

<section v-for="group in groups" :key="group.id" class="source-group" :data-stability="group.stability">
  <header><span>{{ group.badge }}</span><div><h2>{{ group.title }}</h2><p>{{ group.note }}</p></div></header>
  <div class="source-cards">
    <article v-for="source in group.items" :id="source.id" :key="source.id">
      <div><span>{{ source.publisher }}</span><small>核验于 {{ source.verifiedAt }}</small></div>
      <h3>{{ source.title }}</h3>
      <p>{{ source.description }}</p>
      <div class="source-meta"><span>stability · {{ source.stability }}</span><span>verifiedAt · {{ source.verifiedAt }}</span></div>
      <a :href="source.url" target="_blank" rel="noreferrer">打开原始来源 ↗</a>
    </article>
  </div>
</section>

## 课程中的取舍原则

- 模型特性服务于工作方法，不成为课程终点；
- Context 使用高信号、按需检索、阶段压缩与可恢复工件；
- Agent 编排默认从最简单结构开始，不把数量当成熟度；
- MCP 只解释连接协议，不描述成自动规划系统；
- Harness、Evals、Tracing、Guardrails 与人工审批构成可靠性基础；
- AI-maintained Wiki、Loop Engineering 与 Agent Team 明确标记为进阶或前沿，不包装成统一行业标准。

## 正式授课前复核

重点检查 `dynamic` 分组：入口是否可用、文档是否改名、能力是否仍处于预览、权限与风险说明是否改变。若某个动态事实不影响课程判断，优先从正文删除，而不是让教材追着版本更新。

[返回课程地图](/guide/00-start) · [查看概念词典](/appendix/glossary) · [查看工具雷达](/appendix/tool-radar)

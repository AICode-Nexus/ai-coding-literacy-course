<script setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { concepts, conceptById } from "../../data/concepts.js";
import { sectionById } from "../../data/course.js";
import { scenarioById } from "../../data/scenarios.js";
import { sourceById } from "../../data/sources.js";

const props = defineProps({
  conceptIds: { type: Array, default: () => [] },
  mode: { type: String, default: "full" },
});

const groupMeta = [
  { id: "foundation", label: "基础层", note: "理解模型能力与固有限制" },
  { id: "collaboration", label: "协同层", note: "把任务组织成可验收闭环" },
  { id: "agent-system", label: "行动系统层", note: "让 AI 在受控环境中使用工具" },
  { id: "frontier", label: "前沿层", note: "观察正在形成的工程实践" },
];

const selected = computed(() => {
  if (!props.conceptIds.length) return concepts;
  return props.conceptIds.map((id) => conceptById[id]).filter(Boolean);
});

const groups = computed(() => groupMeta
  .map((group) => ({ ...group, concepts: selected.value.filter((concept) => concept.group === group.id) }))
  .filter((group) => group.concepts.length));

const isCompact = computed(() => props.mode === "compact");

const maturity = (level) => ({ core: "A · 核心", advanced: "B · 进阶", frontier: "前沿观察" }[level] ?? level);
</script>

<template>
  <section :class="['knowledge-atlas', 'not-prose', { 'knowledge-atlas-compact': isCompact }]" aria-label="课程概念图谱">
    <header>
      <div><span>KNOWLEDGE ATLAS</span><strong>{{ isCompact ? '本章概念索引' : '概念、作用与边界一起学' }}</strong></div>
      <p v-if="isCompact">这里只定位本章会用到的词汇；它们在本章解决什么，由后面的讲解、例子和练习展开。</p>
      <p v-else>定义告诉你它是什么；“解决”与“不能替代”帮助你在工作中正确使用。</p>
    </header>

    <section v-for="group in groups" :key="group.id" class="knowledge-group">
      <header><span>{{ group.label }}</span><strong>{{ group.note }}</strong><small>{{ group.concepts.length }} 个概念</small></header>
      <div class="knowledge-grid">
        <article v-for="concept in group.concepts" :key="concept.id" :class="`knowledge-${concept.level}`">
          <header>
            <div><span>{{ concept.name }}</span><h3>{{ concept.label }}</h3></div>
            <small>{{ maturity(concept.level) }}</small>
          </header>
          <p>{{ concept.definition }}</p>
          <p v-if="isCompact" class="knowledge-compact-use"><b>本章关注</b>{{ concept.solves }}</p>
          <dl v-else>
            <div><dt>解决</dt><dd>{{ concept.solves }}</dd></div>
            <div><dt>不能替代</dt><dd>{{ concept.notFor }}</dd></div>
          </dl>
          <footer v-if="!isCompact" class="knowledge-links">
            <div>
              <span>相关节点</span>
              <a v-for="nodeId in concept.nodeIds" :key="nodeId" :href="withBase(sectionById[nodeId].guide)">{{ sectionById[nodeId].title }}</a>
            </div>
            <div>
              <span>关联场景</span>
              <i v-for="scenarioId in concept.scenarioIds" :key="scenarioId">{{ scenarioById[scenarioId]?.question }}</i>
            </div>
            <div>
              <span>一手来源</span>
              <a v-for="sourceId in concept.sourceIds" :key="sourceId" :href="sourceById[sourceId]?.url" target="_blank" rel="noreferrer">{{ sourceById[sourceId]?.publisher }} ↗</a>
            </div>
          </footer>
        </article>
      </div>
    </section>
  </section>
</template>

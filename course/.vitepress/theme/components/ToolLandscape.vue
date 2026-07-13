<script setup>
import { computed } from "vue";
import { toolCategories, toolCategoryById, toolEntryStatus } from "../../data/tools.js";

const props = defineProps({
  categoryIds: { type: Array, default: () => [] },
});

const selected = computed(() => {
  if (!props.categoryIds.length) return toolCategories;
  return props.categoryIds.map((id) => toolCategoryById[id]).filter(Boolean);
});
</script>

<template>
  <section class="tool-landscape not-prose" aria-label="AI 工具能力全景">
    <header>
      <div><span>CAPABILITY LANDSCAPE</span><strong>先选能力，再看代表产品</strong></div>
      <p>工具入口会变化，能力用途、选择标准、风险与核验日期更值得长期保留。</p>
    </header>

    <div class="tool-landscape-grid">
      <article v-for="(category, index) in selected" :key="category.id">
        <header><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ category.name }}</h3></header>
        <p>{{ category.purpose }}</p>
        <div class="tool-criteria">
          <section><h4>选择时看</h4><ul><li v-for="item in category.selectionCriteria" :key="item">{{ item }}</li></ul></section>
          <section><h4>主要风险</h4><ul><li v-for="item in category.risks" :key="item">{{ item }}</li></ul></section>
        </div>
        <footer>
          <strong>代表入口 · 不排序</strong>
          <a v-for="entry in category.representatives" :key="entry.name" :href="entry.officialUrl" target="_blank" rel="noreferrer">
            <span>{{ entry.name }}</span>
            <small>{{ entry.note }}</small>
            <i>{{ entry.verifiedAt }} · {{ toolEntryStatus(entry) }}</i>
          </a>
        </footer>
      </article>
    </div>
  </section>
</template>

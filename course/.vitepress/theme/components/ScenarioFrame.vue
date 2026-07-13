<script setup>
import { computed } from "vue";
import { conceptById } from "../../data/concepts.js";
import { scenarioById } from "../../data/scenarios.js";
import { toolCategoryById } from "../../data/tools.js";

const props = defineProps({
  scenarioId: { type: String, required: true },
});

const scenario = computed(() => scenarioById[props.scenarioId]);
const relatedConcepts = computed(() => scenario.value?.conceptIds.map((id) => conceptById[id]).filter(Boolean) ?? []);
const relatedTools = computed(() => scenario.value?.toolCategoryIds.map((id) => toolCategoryById[id]).filter(Boolean) ?? []);
</script>

<template>
  <section v-if="scenario" class="scenario-frame not-prose" :aria-labelledby="`${scenario.id}-title`">
    <header class="scenario-frame-head">
      <div><span>{{ scenario.label }}</span><small>SCENARIO FRAME</small></div>
      <h3 :id="`${scenario.id}-title`">{{ scenario.question }}</h3>
    </header>

    <div class="scenario-frame-contrast">
      <article class="scenario-ordinary">
        <span>惯常方式</span>
        <p>{{ scenario.ordinary }}</p>
      </article>
      <i aria-hidden="true">→</i>
      <article class="scenario-collaborative">
        <span>协同方式</span>
        <p>{{ scenario.collaborative }}</p>
      </article>
    </div>

    <div class="scenario-frame-links">
      <div><b>相关概念</b><span v-for="concept in relatedConcepts" :key="concept.id">{{ concept.label }}</span></div>
      <div><b>能力类别</b><span v-for="category in relatedTools" :key="category.id">{{ category.name }}</span></div>
    </div>

    <div class="scenario-frame-details">
      <section>
        <h4>检查点</h4>
        <ol><li v-for="item in scenario.checkpoints" :key="item">{{ item }}</li></ol>
      </section>
      <section>
        <h4>岗位代入</h4>
        <ul><li v-for="item in scenario.roleDirections" :key="item">{{ item }}</li></ul>
      </section>
    </div>

    <footer><span>本场景结论</span><strong>{{ scenario.takeaway }}</strong></footer>
  </section>
  <p v-else class="component-error">未找到场景：{{ scenarioId }}</p>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { lectureSections } from "../../data/course.js";
import StageVisual from "./StageVisual.vue";

const props = defineProps({
  scene: { type: Object, required: true },
  number: { type: Number, required: true },
  total: { type: Number, required: true },
});

const section = computed(() => lectureSections.find((item) => item.id === props.scene.section));
</script>

<template>
  <article class="stage-scene" :class="[`scene-${scene.kind}`, `scene-${scene.visual.type}`]">
    <div class="stage-grid" aria-hidden="true"></div>
    <header class="stage-header">
      <div class="stage-brand"><img :src="withBase('/brand/ai-collaboration-mark.svg')" alt=""> AI COLLABORATION</div>
      <div class="stage-section"><b>{{ section?.order }}</b>{{ section?.title }}</div>
      <div class="stage-counter">{{ String(number).padStart(2, "0") }} / {{ String(total).padStart(2, "0") }}</div>
    </header>

    <main class="stage-content">
      <div class="stage-copy">
        <p class="stage-eyebrow">{{ scene.eyebrow }}</p>
        <h1 v-if="scene.titleLines" class="stage-title-lines">
          <span v-for="line in scene.titleLines" :key="line">{{ line }}</span>
        </h1>
        <h1 v-else>{{ scene.title }}</h1>
        <p class="stage-body">{{ scene.body }}</p>
      </div>
      <StageVisual :visual="scene.visual" />
    </main>

    <footer class="stage-takeaway">
      <span>本页结论</span>
      <strong>{{ scene.takeaway }}</strong>
    </footer>
  </article>
</template>

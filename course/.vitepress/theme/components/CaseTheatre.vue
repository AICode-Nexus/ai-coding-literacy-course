<script setup>
import { computed, ref } from "vue";
import { courseCases } from "../../data/cases.js";
import { sourceById } from "../../data/sources.js";

const active = ref(0);
const selected = computed(() => courseCases[active.value]);
const selectedSources = computed(() => selected.value.sourceIds.map((id) => sourceById[id]).filter(Boolean));
</script>

<template>
  <section class="case-theatre not-prose" aria-label="真实案例剧场">
    <div class="case-selector">
      <button
        v-for="(item, index) in courseCases"
        :key="item.id"
        type="button"
        :class="{ active: active === index }"
        @click="active = index"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.origin === 'internal' ? '内部实践' : '跨岗位迁移' }} · {{ item.role }}</small>
      </button>
    </div>
    <article class="case-stage">
      <header><span>{{ selected.origin === 'internal' ? 'INTERNAL CASE' : 'TRANSFER CASE' }}</span><h3>{{ selected.title }}</h3><p>{{ selected.context }}</p></header>
      <div class="case-stage-grid">
        <section><small>MOVES · 怎么做</small><ol><li v-for="move in selected.moves" :key="move">{{ move }}</li></ol></section>
        <section><small>ARTIFACTS · 留下什么</small><ul><li v-for="artifact in selected.artifacts" :key="artifact">{{ artifact }}</li></ul></section>
        <section><small>CHECKPOINTS · 人在哪里</small><ul><li v-for="point in selected.checkpoints" :key="point">{{ point }}</li></ul></section>
        <section class="case-result"><small>RESULT · 真实改变</small><strong>{{ selected.result }}</strong></section>
      </div>
      <footer><span>迁移到你的工作</span><strong>{{ selected.transfer }}</strong></footer>
      <div class="case-sources"><span>证据来源</span><a v-for="source in selectedSources" :key="source.id" :href="source.url" target="_blank" rel="noreferrer">{{ source.publisher }} ↗</a></div>
    </article>
  </section>
</template>

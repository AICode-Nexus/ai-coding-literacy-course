<script setup>
import { ref } from "vue";
import { boundaryComparisons } from "../../data/concepts.js";

const active = ref(0);
</script>

<template>
  <section class="boundary-board not-prose" aria-label="概念边界对照">
    <div class="boundary-tabs" role="tablist">
      <button
        v-for="(comparison, index) in boundaryComparisons"
        :key="comparison.id"
        type="button"
        role="tab"
        :aria-selected="active === index"
        :class="{ active: active === index }"
        @click="active = index"
      ><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ comparison.title }}</button>
    </div>
    <div class="boundary-panel" role="tabpanel">
      <header><small>BOUNDARY CARD</small><h3>{{ boundaryComparisons[active].question }}</h3></header>
      <div class="boundary-grid">
        <article v-for="answer in boundaryComparisons[active].answers" :key="answer.name">
          <h4>{{ answer.name }}</h4>
          <dl><div><dt>解决</dt><dd>{{ answer.does }}</dd></div><div><dt>不解决</dt><dd>{{ answer.notFor }}</dd></div></dl>
        </article>
      </div>
      <footer><span>结论</span><strong>{{ boundaryComparisons[active].takeaway }}</strong></footer>
    </div>
  </section>
</template>

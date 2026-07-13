<script setup>
import { ref } from "vue";
import { collaborationSteps } from "../../data/course.js";

const active = ref(0);
</script>

<template>
  <section class="collaboration-flow not-prose" aria-label="AI 协同七步法">
    <div class="flow-rail" role="tablist" aria-label="选择协同步骤">
      <button
        v-for="(step, index) in collaborationSteps"
        :key="step.id"
        type="button"
        role="tab"
        :aria-selected="active === index"
        :class="{ active: active === index }"
        @click="active = index"
      >
        <span>{{ step.order }}</span><strong>{{ step.title }}</strong><small>{{ step.short }}</small>
      </button>
    </div>
    <div class="flow-detail" role="tabpanel">
      <span class="detail-index">STEP {{ collaborationSteps[active].order }}</span>
      <h3>{{ collaborationSteps[active].title }} · {{ collaborationSteps[active].short }}</h3>
      <p>{{ collaborationSteps[active].question }}</p>
      <div><span>示例</span><strong>{{ collaborationSteps[active].example }}</strong></div>
    </div>
  </section>
</template>

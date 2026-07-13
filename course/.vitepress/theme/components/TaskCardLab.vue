<script setup>
import { computed, ref } from "vue";
import { buildTaskCard } from "../../data/task-card.js";

const form = ref({
  task: "把需求说明预审成待确认问题",
  audience: "产品经理和导师",
  materials: "需求原文、历史讨论和现有流程",
  output: "问题清单、验收标准和风险",
  checks: "每个结论有原文依据",
  boundaries: "不得把讨论写成已确认事实",
});
const copied = ref(false);
const card = computed(() => buildTaskCard(form.value));

async function copyCard() {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  await navigator.clipboard.writeText(card.value);
  copied.value = true;
  window.setTimeout(() => { copied.value = false; }, 1600);
}
</script>

<template>
  <section class="task-card-lab not-prose" aria-label="AI 协同任务卡实验室">
    <div class="task-form">
      <header><span>INPUT</span><h3>把你的真实任务写进契约</h3><p>先填到“足够开始”，执行中发现缺口再补充。</p></header>
      <label>要完成的任务<input v-model="form.task"></label>
      <label>交付给谁<input v-model="form.audience"></label>
      <label>可用材料<textarea v-model="form.materials" rows="2"></textarea></label>
      <label>交付物<input v-model="form.output"></label>
      <label>验收标准<input v-model="form.checks"></label>
      <label>不可越过的边界<textarea v-model="form.boundaries" rows="2"></textarea></label>
    </div>
    <div class="task-preview">
      <header><span>LIVE OUTPUT</span><button type="button" @click="copyCard">{{ copied ? '已复制' : '复制任务卡' }}</button></header>
      <pre>{{ card }}</pre>
    </div>
  </section>
</template>

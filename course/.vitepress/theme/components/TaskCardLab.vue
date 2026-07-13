<script setup>
import { computed, ref } from "vue";
import { buildTaskCard } from "../../data/task-card.js";
import { templateById } from "../../data/templates.js";

const form = ref({
  task: "把一项模糊要求整理成待确认问题",
  audience: "任务责任人与协作者",
  materials: "原始要求、已有材料、历史约束与来源",
  actions: "先找信息缺口，再整理待确认问题，最后形成可验收清单",
  output: "问题清单、来源与待确认项",
  checks: "每个重要判断都有来源，缺失内容被显式标记",
  boundaries: "不得把讨论内容写成已确认事实；涉及外部动作时停止并确认",
});
const copyState = ref("");
const card = computed(() => buildTaskCard(form.value));
const labels = templateById["task-card"].fields;
const formFields = [
  { key: "task", label: labels[0], rows: 1 },
  { key: "audience", label: labels[1], rows: 1 },
  { key: "materials", label: labels[2], rows: 2 },
  { key: "actions", label: labels[3], rows: 2 },
  { key: "output", label: labels[4], rows: 1 },
  { key: "checks", label: labels[5], rows: 2 },
  { key: "boundaries", label: labels[6], rows: 2 },
];

async function copyCard() {
  try {
    if (typeof navigator === "undefined" || !navigator.clipboard) throw new Error("clipboard unavailable");
    await navigator.clipboard.writeText(card.value);
    copyState.value = "已复制";
    window.setTimeout(() => { copyState.value = ""; }, 1600);
  } catch {
    copyState.value = "请手动复制";
  }
}
</script>

<template>
  <section class="task-card-lab not-prose" aria-label="AI 协同任务卡实验室">
    <div class="task-form">
      <header><span>INPUT</span><h3>把一项任务写成协同契约</h3><p>先填到“足够开始”，执行中发现缺口再补充。</p></header>
      <label v-for="field in formFields" :key="field.key">
        {{ field.label }}
        <input v-if="field.rows === 1" v-model="form[field.key]">
        <textarea v-else v-model="form[field.key]" :rows="field.rows"></textarea>
      </label>
    </div>
    <div class="task-preview">
      <header><span>LIVE OUTPUT</span><button type="button" @click="copyCard">{{ copyState || '复制任务卡' }}</button></header>
      <pre>{{ card }}</pre>
    </div>
  </section>
</template>

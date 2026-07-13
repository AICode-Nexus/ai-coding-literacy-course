<script setup>
import { reactive } from "vue";
import { templates } from "../../data/templates.js";
import TaskCardLab from "./TaskCardLab.vue";

const copyState = reactive({});

async function copyTemplate(template) {
  try {
    if (typeof navigator === "undefined" || !navigator.clipboard) throw new Error("clipboard unavailable");
    await navigator.clipboard.writeText(template.copyText);
    copyState[template.id] = "已复制";
    window.setTimeout(() => { copyState[template.id] = ""; }, 1600);
  } catch {
    copyState[template.id] = "请手动复制";
  }
}
</script>

<template>
  <section class="template-library not-prose" aria-label="AI 协同模板库">
    <header>
      <div><span>WORKING TEMPLATES</span><strong>五份可以直接带回岗位的工作部件</strong></div>
      <p>先按原样跑通一次，再根据岗位证据、风险和责任边界做删改。</p>
    </header>

    <div class="template-library-grid">
      <article v-for="(template, index) in templates" :key="template.id">
        <header>
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <div><h3>{{ template.title }}</h3><p>{{ template.purpose }}</p></div>
          <button type="button" @click="copyTemplate(template)">{{ copyState[template.id] || '复制模板' }}</button>
        </header>
        <div class="template-fields"><span v-for="field in template.fields" :key="field">{{ field }}</span></div>
        <pre>{{ template.copyText }}</pre>
      </article>
    </div>

    <div class="template-lab-head"><span>EDITABLE LAB</span><h3>把第一份任务卡现场写出来</h3></div>
    <TaskCardLab />
  </section>
</template>

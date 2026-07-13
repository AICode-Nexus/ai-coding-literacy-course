<script setup>
defineProps({
  title: { type: String, default: "进阶层" },
  label: { type: String, default: "B TRACK" },
});
</script>

<template>
  <aside class="advanced-track not-prose">
    <header><span>{{ label }}</span><strong>{{ title }}</strong><small>已有 Coding Agent 基础的同学继续下钻</small></header>
    <div><slot /></div>
  </aside>
</template>

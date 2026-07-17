<script setup>
import { withBase } from "vitepress";
import { lectureSections } from "../../data/course.js";
</script>

<template>
  <section class="course-route-map not-prose" aria-label="九节点课程路线">
    <header>
      <span>COURSE ROUTE · 9 NODES</span>
      <strong>点击任一节点进入对应章节</strong>
      <small>80 分钟主讲 · 32 个讲台场景</small>
    </header>
    <nav aria-label="课程章节入口">
      <a v-for="section in lectureSections" :key="section.id" :href="withBase(section.guide)">
        <span class="route-node-order">{{ section.order }}</span>
        <span class="route-node-copy">
          <strong>{{ section.title }}</strong>
          <small>{{ section.question }}</small>
        </span>
        <span class="route-node-meta">
          <small>{{ section.minutes }} 分钟 · {{ section.sceneBudget }} 个场景</small>
          <b>进入章节 →</b>
        </span>
      </a>
    </nav>
  </section>
</template>

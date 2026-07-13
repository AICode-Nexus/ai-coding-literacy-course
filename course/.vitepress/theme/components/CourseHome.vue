<script setup>
import { withBase } from "vitepress";
import { computed } from "vue";
import { courseMeta, lectureSections } from "../../data/course.js";
import { courseCases } from "../../data/cases.js";

const total = computed(() => courseMeta.teachingMinutes + courseMeta.exchangeMinutes);
const presentLink = computed(() => `${withBase("/present")}?scene=1`);
</script>

<template>
  <div class="course-home">
    <header class="home-nav">
      <a class="home-brand" :href="withBase('/')"><span>AI</span><b>协同工作法</b></a>
      <nav aria-label="主导航">
        <a :href="withBase('/guide/00-start')">课程地图</a>
        <a :href="withBase('/guide/05-cases')">案例</a>
        <a :href="withBase('/sources')">来源</a>
        <a class="nav-stage" :href="presentLink">进入讲师模式 <span>↗</span></a>
      </nav>
    </header>

    <main>
      <section class="home-hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-copy">
          <p class="home-eyebrow">AI COLLABORATION · CAMPUS LEARNING 2026</p>
          <h1>把 AI 从回答者，<br><em>变成可被驾驭的<br>协作者</em></h1>
          <p>{{ courseMeta.subtitle }}。面向 {{ courseMeta.audienceSize }} 人大课，也为课后独立学习保留完整细节。</p>
          <div class="hero-actions">
            <a class="action-primary" :href="withBase('/guide/00-start')">开始学习 <span>→</span></a>
            <a class="action-secondary" :href="presentLink">16:9 全屏讲课 <kbd>F</kbd></a>
          </div>
          <div class="hero-proof">
            <span><b>32</b> 个视觉场景</span>
            <span><b>7</b> 个真实案例</span>
            <span><b>4</b> 组边界卡</span>
            <span><b>1</b> 个任务卡实验室</span>
          </div>
        </div>

        <div class="hero-console" aria-label="课程协同系统示意">
          <div class="console-title"><i></i><i></i><i></i><span>AI COLLABORATION SYSTEM</span></div>
          <div class="console-goal"><small>GOAL</small><strong>真实任务完成</strong><span>责任人可验收</span></div>
          <div class="console-route">
            <span v-for="(item, index) in ['Context', 'Task', 'Output', 'Eval', 'Guardrails', 'Loop']" :key="item"><i>{{ index + 1 }}</i>{{ item }}</span>
          </div>
          <div class="console-traces">
            <div><small>CONTEXT SIGNAL</small><b>84%</b><i style="--w:84%"></i></div>
            <div><small>VERIFICATION</small><b>3 LAYERS</b><i style="--w:68%"></i></div>
            <div><small>HUMAN CHECKPOINT</small><b>ARMED</b><i style="--w:92%"></i></div>
          </div>
          <div class="console-foot"><span>TOOLS CONNECTED</span><span class="online">● READY</span></div>
        </div>
      </section>

      <section class="mode-section">
        <header class="section-heading">
          <p class="home-eyebrow">ONE SOURCE · TWO MODES</p>
          <h2>同一份内容，两种使用方式</h2>
          <p>课上重节奏与视觉，课后重解释与练习；讲师不需要在 PPT 和教材之间重复维护。</p>
        </header>
        <div class="mode-grid">
          <a class="mode-card mode-stage" :href="presentLink">
            <span class="mode-index">01 / STAGE</span>
            <div class="mode-preview"><i></i><strong>16:9</strong><small>1920 × 1080</small></div>
            <h3>讲师模式</h3>
            <p>32 个场景、全屏展示、键盘翻页、场景总览与讲师备注，面向 1050 人大课。</p>
            <b>进入全屏演示 <span>↗</span></b>
          </a>
          <a class="mode-card mode-study" :href="withBase('/guide/00-start')">
            <span class="mode-index">02 / STUDY</span>
            <div class="mode-preview study-preview"><span></span><i></i><i></i><i></i></div>
            <h3>教程模式</h3>
            <p>完整概念、边界对照、案例证据、互动任务卡、训练计划和可追溯来源。</p>
            <b>打开课后教材 <span>→</span></b>
          </a>
        </div>
      </section>

      <section class="route-section">
        <div class="route-summary">
          <p class="home-eyebrow">{{ courseMeta.teachingMinutes }} + {{ courseMeta.exchangeMinutes }} MINUTES</p>
          <h2>{{ total }} 分钟，从共识到行动</h2>
          <p>主线先帮助 A 类学员完成工作方式迁移，再用蓝色进阶层兼顾已有 Coding Agent 基础的 B 类学员。</p>
          <div class="track-tags"><span>A · 核心主线</span><span>B · 进阶探索</span></div>
        </div>
        <ol class="route-list">
          <li v-for="section in lectureSections" :key="section.id">
            <a :href="withBase(`/guide/${section.id === 'opening' ? '00-start' : section.id === 'shift' ? '01-shift' : section.id === 'method' ? '02-collaboration' : section.id === 'context' ? '03-context' : section.id === 'agent-system' ? '04-agent-system' : section.id === 'cases' ? '05-cases' : '06-quality'}`)">
              <span>{{ section.order }}</span>
              <div><strong>{{ section.title }}</strong><small>{{ section.question }}</small></div>
              <b>{{ section.minutes }}′</b>
            </a>
          </li>
        </ol>
      </section>

      <section class="case-strip">
        <header class="section-heading section-heading-dark">
          <p class="home-eyebrow">CASE THEATRE</p>
          <h2>不讲空泛“提效”，拆开真实工作工件</h2>
          <p>3 个内部实践构成证据主线，4 个跨岗位迁移案例帮助校招生把方法带回自己的工作。</p>
        </header>
        <div class="case-marquee">
          <article v-for="(item, index) in courseCases" :key="item.id">
            <span>{{ String(index + 1).padStart(2, '0') }} · {{ item.origin === 'internal' ? '内部实践' : '迁移案例' }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.result }}</p>
            <small>{{ item.role }}</small>
          </article>
        </div>
        <a class="case-link" :href="withBase('/guide/05-cases')">进入案例剧场 <span>→</span></a>
      </section>

      <section class="home-cta">
        <div><span>GOAL</span><i></i><span>CONTEXT</span><i></i><span>TASK</span><i></i><span>OUTPUT</span><i></i><span>EVAL</span><i></i><span>GUARDRAILS</span><i></i><span>LOOP</span></div>
        <h2>明天，选一个真实任务开始</h2>
        <p>不是收藏更多工具，而是跑通一条带目标、证据、验收和边界的工作链。</p>
        <a :href="withBase('/guide/07-practice')">打开 7 天迁移计划 <span>→</span></a>
      </section>
    </main>

    <footer class="home-footer"><span>AI 协同工作法 · 2026</span><span>稳定方法优先 · 动态知识标注核验日期</span></footer>
  </div>
</template>

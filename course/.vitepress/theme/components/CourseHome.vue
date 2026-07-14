<script setup>
import { withBase } from "vitepress";
import { computed } from "vue";
import { courseMeta, lectureSections } from "../../data/course.js";
import { scenarios } from "../../data/scenarios.js";
import SiteBrand from "./SiteBrand.vue";

const total = computed(() => courseMeta.teachingMinutes + courseMeta.exchangeMinutes);
const presentLink = computed(() => `${withBase("/present")}?scene=1`);
</script>

<template>
  <div class="course-home">
    <header class="home-nav">
      <a class="home-brand" :href="withBase('/')" aria-label="AI协同方法论：从“会用AI”到“善用AI”">
        <img class="home-brand-mark" :src="withBase('/brand/ai-collaboration-mark.svg')" alt="">
        <SiteBrand />
      </a>
      <nav aria-label="主导航">
        <a :href="withBase('/guide/00-start')">课程地图</a>
        <a :href="withBase('/guide/01-t-shaped')">课后教材</a>
        <a :href="withBase('/appendix/tool-radar')">工具雷达</a>
        <a :href="withBase('/sources')">来源</a>
        <a class="nav-stage course-button course-button--primary" :href="presentLink">开始讲课 <span>↗</span></a>
      </nav>
    </header>

    <main>
      <section class="kv-hero" aria-label="2026届校招新人训练营主视觉">
        <picture class="kv-picture">
          <source media="(min-aspect-ratio: 3 / 1)" :srcset="withBase('/kv/kv-ultrawide.jpg')">
          <source media="(max-width: 700px)" :srcset="withBase('/kv/kv-mobile.jpg')">
          <source media="(max-width: 1100px)" :srcset="withBase('/kv/kv-stage.jpg')">
          <img
            :src="withBase('/kv/kv-wide.jpg')"
            width="2400"
            height="964"
            alt="2026届校招新人训练营主视觉：热AI之路，翼起来"
            fetchpriority="high"
          >
        </picture>

        <div class="kv-course-dock">
          <div class="kv-course-identity">
            <img :src="withBase('/brand/ai-collaboration-mark.svg')" alt="">
            <div>
              <small>2026 CAMPUS LEARNING</small>
              <strong>AI协同方法论</strong>
            </div>
          </div>
          <p>从“会用AI”到“善用AI”</p>
          <div class="kv-course-actions">
            <a class="course-button course-button--secondary" :href="withBase('/guide/00-start')">查看课程</a>
            <a class="course-button course-button--primary" :href="presentLink">开始讲课 <span>↗</span></a>
          </div>
        </div>
      </section>

      <section class="home-hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-copy">
          <p class="home-eyebrow">AI COLLABORATION · CAMPUS LEARNING 2026</p>
          <h1>从“会用 AI”，<br><em>到“善用 AI”</em></h1>
          <p>{{ courseMeta.goal }}课程以讲课为主，同时保留一套可以课后搜索、阅读、练习和复用的完整教程。</p>
          <div class="hero-actions">
            <a class="action-primary course-button course-button--primary" :href="presentLink">开始讲课 <span>→</span></a>
            <a class="action-secondary course-button course-button--secondary" :href="withBase('/guide/00-start')">课后学习 <span>↗</span></a>
          </div>
          <div class="hero-proof">
            <span><b>9</b> 个课程节点</span>
            <span><b>32</b> 个讲台场景</span>
            <span><b>80+15</b> 分钟</span>
            <span><b>1050</b> 人大课</span>
          </div>
        </div>

        <div class="hero-console" aria-label="AI 协同工作系统示意">
          <div class="console-title"><i></i><i></i><i></i><span>AI COLLABORATION SYSTEM</span></div>
          <div class="console-goal"><small>GOAL</small><strong>可观察的结果</strong><span>责任人确认</span></div>
          <div class="console-route">
            <span v-for="(item, index) in ['Context', 'Task', 'Output', 'Eval', 'Guardrails', 'Loop']" :key="item"><i>{{ index + 1 }}</i>{{ item }}</span>
          </div>
          <div class="console-traces">
            <div><small>CONTEXT</small><b>HIGH SIGNAL</b><i style="--w:76%"></i></div>
            <div><small>VERIFICATION</small><b>THREE LAYERS</b><i style="--w:64%"></i></div>
            <div><small>HUMAN CHECKPOINT</small><b>READY</b><i style="--w:88%"></i></div>
          </div>
          <div class="console-foot"><span>METHOD BEFORE TOOLS</span><span class="online">● READY</span></div>
        </div>
      </section>

      <section class="mode-section">
        <header class="section-heading">
          <p class="home-eyebrow">ONE SOURCE · TWO MODES</p>
          <h2>课上讲得开，课后学得深</h2>
          <p>讲台模式用大字号视觉场景推动节奏；教程模式展开概念、工具、边界、场景、练习和来源。两种界面读取同一套课程事实。</p>
        </header>
        <div class="mode-grid">
          <a class="mode-card mode-stage" :href="presentLink">
            <span class="mode-index">01 / LECTURE</span>
            <div class="mode-preview"><i></i><strong>16:9</strong><small>1920 × 1080 LOGICAL</small></div>
            <h3>开始讲课</h3>
            <p>32 屏、九节点总览、键盘翻页、URL 恢复、浏览器全屏与五层讲师备注。</p>
            <b>进入讲师模式 <span>↗</span></b>
          </a>
          <a class="mode-card mode-study" :href="withBase('/guide/00-start')">
            <span class="mode-index">02 / SELF-STUDY</span>
            <div class="mode-preview study-preview"><span></span><i></i><i></i><i></i></div>
            <h3>课后学习</h3>
            <p>九章教程、概念图谱、工具全景、宽泛场景、五份模板、练习与可追溯来源。</p>
            <b>打开教程网站 <span>→</span></b>
          </a>
        </div>
      </section>

      <section class="route-section">
        <div class="route-summary">
          <p class="home-eyebrow">{{ courseMeta.teachingMinutes }} + {{ courseMeta.exchangeMinutes }} MINUTES</p>
          <h2>{{ total }} 分钟，从人才能力走到岗位行动</h2>
          <p>主线让 A 类学员完整掌握协同方法；蓝色进阶层为已有 AI 或 Coding Agent 基础的 B 类学员保留 Agent、Harness、Tracing 与多智能体边界。</p>
          <div class="track-tags"><span>A · 完整主线</span><span>B · 进阶探索</span></div>
        </div>
        <ol class="route-list">
          <li v-for="section in lectureSections" :key="section.id">
            <a :href="withBase(section.guide)">
              <span>{{ section.order }}</span>
              <div><strong>{{ section.title }}</strong><small>{{ section.question }}</small></div>
              <b>{{ section.minutes }}′</b>
            </a>
          </li>
        </ol>
      </section>

      <section class="scenario-strip">
        <header class="section-heading">
          <p class="home-eyebrow">场景命题 · SCENARIO QUESTIONS</p>
          <h2>不虚构故事，用九个工作问题让每个人自行代入</h2>
          <p>每个节点都从一个宽泛问题展开。讲师可以替换成自己熟悉的表达，学员可以映射到研发、产品、运营或职能工作。</p>
        </header>
        <div class="scenario-marquee">
          <article v-for="(item, index) in scenarios" :key="item.id">
            <span>{{ String(index + 1).padStart(2, '0') }} · {{ item.label }}</span>
            <h3>{{ item.question }}</h3>
            <p>{{ item.takeaway }}</p>
            <small>{{ item.roleDirections.join(' · ') }}</small>
          </article>
        </div>
        <a class="scenario-link course-button course-button--secondary" :href="withBase('/guide/01-t-shaped')">从第一个场景开始 <span>→</span></a>
      </section>

      <section class="output-section">
        <header class="section-heading">
          <p class="home-eyebrow">COURSE OUTPUTS</p>
          <h2>学完不是多记几个名词，而是带走四份工作部件</h2>
        </header>
        <div class="output-grid">
          <article v-for="(item, index) in courseMeta.outputs" :key="item">
            <span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ item }}</strong>
          </article>
        </div>
      </section>

      <section class="home-cta">
        <div><span>GOAL</span><i></i><span>CONTEXT</span><i></i><span>TASK</span><i></i><span>OUTPUT</span><i></i><span>EVAL</span><i></i><span>GUARDRAILS</span><i></i><span>LOOP</span></div>
        <h2>明天，先改造一个低风险的小流程</h2>
        <p>不要从收集更多工具开始；从一个可验收、会再次发生的岗位任务开始。</p>
        <a class="course-button course-button--primary" :href="withBase('/guide/09-transfer')">打开 7 天行动计划 <span>→</span></a>
      </section>
    </main>

    <footer class="home-footer"><span>{{ courseMeta.shortTitle }} · 2026</span><span>稳定方法优先 · 动态知识标注核验日期</span></footer>
  </div>
</template>

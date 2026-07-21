<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { withBase } from "vitepress";
import { lectureSections } from "../../data/course.js";
import { lectureScenes } from "../../data/scenes.js";
import { clampScene, keyToAction, sceneFromSearch, searchWithScene } from "../../data/presentation.js";
import StageScene from "./StageScene.vue";

const activeIndex = ref(0);
const overview = ref(false);
const showNotes = ref(false);
const stageRoot = ref(null);
const liveMessage = ref("");
const fullscreenNotice = ref("");
const isFullscreen = ref(false);
let fullscreenNoticeTimer;

const activeScene = computed(() => lectureScenes[activeIndex.value]);
const progress = computed(() => ((activeIndex.value + 1) / lectureScenes.length) * 100);
const fullscreenActionLabel = computed(() => (isFullscreen.value ? "退出全屏" : "进入全屏"));
const overviewSections = computed(() =>
  lectureSections.map((section) => ({
    ...section,
    scenes: lectureScenes
      .map((scene, index) => ({ scene, index }))
      .filter((item) => item.scene.section === section.id),
  })),
);

function announce() {
  liveMessage.value = `第 ${activeIndex.value + 1} 页：${activeScene.value.title}`;
}

function syncUrl() {
  if (typeof window === "undefined") return;
  const nextSearch = searchWithScene(window.location.search, activeIndex.value);
  window.history.replaceState({}, "", `${window.location.pathname}${nextSearch}${window.location.hash}`);
}

function goTo(index) {
  activeIndex.value = clampScene(index, lectureScenes.length);
  overview.value = false;
  syncUrl();
  announce();
  nextTick(() => stageRoot.value?.focus({ preventScroll: true }));
}

function runAction(action) {
  if (action === "next") goTo(activeIndex.value + 1);
  if (action === "previous") goTo(activeIndex.value - 1);
  if (action === "first") goTo(0);
  if (action === "last") goTo(lectureScenes.length - 1);
  if (action === "overview") overview.value = !overview.value;
  if (action === "fullscreen") toggleFullscreen();
}

async function toggleFullscreen() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (!document.fullscreenEnabled || typeof root.requestFullscreen !== "function") {
    showFullscreenNotice("当前浏览器未开放网页全屏，请使用浏览器自身的全屏快捷键");
    return;
  }
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await root.requestFullscreen();
    }
  } catch {
    showFullscreenNotice("未能进入网页全屏，请检查浏览器权限或使用浏览器自身的全屏快捷键");
  }
}

function showFullscreenNotice(message) {
  fullscreenNotice.value = message;
  liveMessage.value = message;
  window.clearTimeout(fullscreenNoticeTimer);
  fullscreenNoticeTimer = window.setTimeout(() => {
    fullscreenNotice.value = "";
  }, 5000);
}

function syncFullscreenState() {
  isFullscreen.value = Boolean(document.fullscreenElement);
}

function onKeydown(event) {
  const tag = event.target?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === "Escape") {
    overview.value = false;
    showNotes.value = false;
    return;
  }
  if (event.key === "n" || event.key === "N") {
    showNotes.value = !showNotes.value;
    event.preventDefault();
    return;
  }
  const action = keyToAction(event.key);
  if (!action) return;
  event.preventDefault();
  runAction(action);
}

function onPopstate() {
  activeIndex.value = sceneFromSearch(window.location.search, lectureScenes.length);
  announce();
}

onMounted(() => {
  activeIndex.value = sceneFromSearch(window.location.search, lectureScenes.length);
  announce();
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("popstate", onPopstate);
  document.addEventListener("fullscreenchange", syncFullscreenState);
  syncFullscreenState();
  nextTick(() => stageRoot.value?.focus({ preventScroll: true }));
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("popstate", onPopstate);
  document.removeEventListener("fullscreenchange", syncFullscreenState);
  window.clearTimeout(fullscreenNoticeTimer);
});
</script>

<template>
  <div ref="stageRoot" class="present-deck" tabindex="-1">
    <div class="stage-frame">
      <StageScene :scene="activeScene" :number="activeIndex + 1" :total="lectureScenes.length" />

      <div class="stage-progress" aria-hidden="true"><i :style="{ width: `${progress}%` }"></i></div>

      <a class="stage-exit" :href="withBase('/')">← 返回课程首页</a>

      <nav class="stage-controls" aria-label="演示控制">
        <button type="button" title="上一页（←）" :disabled="activeIndex === 0" @click="goTo(activeIndex - 1)">←</button>
        <button type="button" title="总览（O）" @click="overview = !overview">{{ String(activeIndex + 1).padStart(2, "0") }}</button>
        <button type="button" title="下一页（→ 或空格）" :disabled="activeIndex === lectureScenes.length - 1" @click="goTo(activeIndex + 1)">→</button>
        <button type="button" title="讲师备注（N）" @click="showNotes = !showNotes">N</button>
        <button
          type="button"
          :aria-label="fullscreenActionLabel"
          :aria-pressed="isFullscreen"
          :title="`${fullscreenActionLabel}（F）`"
          @click="toggleFullscreen"
        >
          ⛶
        </button>
      </nav>

      <p v-if="fullscreenNotice" class="stage-notice" role="status">{{ fullscreenNotice }}</p>

      <aside v-if="showNotes" class="speaker-notes">
        <header>
          <span>SPEAKER NOTES · {{ activeIndex + 1 }}</span>
          <small>N / Esc 关闭</small>
        </header>
        <section>
          <div class="note-block note-purpose">
            <b>讲授目的</b>
            <p>{{ activeScene.notes.purpose }}</p>
          </div>
          <div class="note-block">
            <b>可替换说法</b>
            <ul>
              <li v-for="item in activeScene.notes.substitutions" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="note-block note-question">
            <b>可选提问</b>
            <p>{{ activeScene.notes.optionalQuestion }}</p>
          </div>
          <div class="note-block">
            <b>讲解边界</b>
            <p>{{ activeScene.notes.boundary }}</p>
          </div>
          <div class="note-block note-advanced">
            <b>进阶补充</b>
            <p>{{ activeScene.notes.advanced }}</p>
          </div>
        </section>
      </aside>

      <section v-if="overview" class="deck-overview" aria-label="场景总览">
        <header><span>COURSE MAP</span><strong>九个节点 · 32 个讲台场景</strong><small>O / Esc 关闭</small></header>
        <div class="overview-sections">
          <section v-for="section in overviewSections" :key="section.id" class="overview-section">
            <button
              type="button"
              class="overview-section-head"
              :aria-label="`跳到${section.title}的第一幕`"
              @click="goTo(section.scenes[0].index)"
            >
              <span>{{ section.order }}</span>
              <strong>{{ section.title }}</strong>
              <small>{{ section.minutes }} MIN</small>
            </button>
            <div class="overview-scenes">
              <button
                v-for="item in section.scenes"
                :key="item.scene.id"
                type="button"
                :class="{ active: item.index === activeIndex }"
                @click="goTo(item.index)"
              >
                <span>{{ String(item.index + 1).padStart(2, "0") }}</span>
                <strong>{{ item.scene.title }}</strong>
                <small>{{ item.scene.kind }}</small>
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>

    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { lectureScenes } from "../../data/scenes.js";
import { clampScene, keyToAction, sceneFromSearch, searchWithScene } from "../../data/presentation.js";
import StageScene from "./StageScene.vue";

const activeIndex = ref(0);
const overview = ref(false);
const showNotes = ref(false);
const stageRoot = ref(null);
const liveMessage = ref("");

const activeScene = computed(() => lectureScenes[activeIndex.value]);
const progress = computed(() => ((activeIndex.value + 1) / lectureScenes.length) * 100);

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
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await document.documentElement.requestFullscreen();
  }
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
  nextTick(() => stageRoot.value?.focus({ preventScroll: true }));
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("popstate", onPopstate);
});
</script>

<template>
  <div ref="stageRoot" class="present-deck" tabindex="-1">
    <div class="stage-frame">
      <StageScene :scene="activeScene" :number="activeIndex + 1" :total="lectureScenes.length" />

      <div class="stage-progress" aria-hidden="true"><i :style="{ width: `${progress}%` }"></i></div>

      <nav class="stage-controls" aria-label="演示控制">
        <button type="button" title="上一页（←）" :disabled="activeIndex === 0" @click="goTo(activeIndex - 1)">←</button>
        <button type="button" title="总览（O）" @click="overview = !overview">{{ String(activeIndex + 1).padStart(2, "0") }}</button>
        <button type="button" title="下一页（→ 或空格）" :disabled="activeIndex === lectureScenes.length - 1" @click="goTo(activeIndex + 1)">→</button>
        <button type="button" title="讲师备注（N）" @click="showNotes = !showNotes">N</button>
        <button type="button" title="全屏（F）" @click="toggleFullscreen">⛶</button>
      </nav>

      <aside v-if="showNotes" class="speaker-notes">
        <span>SPEAKER NOTE · {{ activeIndex + 1 }}</span>
        <p>{{ activeScene.speakerNote }}</p>
        <small>N / Esc 关闭</small>
      </aside>

      <section v-if="overview" class="deck-overview" aria-label="场景总览">
        <header><span>SCENE MAP</span><strong>选择要跳转的场景</strong><small>O / Esc 关闭</small></header>
        <div>
          <button
            v-for="(scene, index) in lectureScenes"
            :key="scene.id"
            type="button"
            :class="{ active: index === activeIndex }"
            @click="goTo(index)"
          >
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <strong>{{ scene.title }}</strong>
            <small>{{ scene.eyebrow }}</small>
          </button>
        </div>
      </section>
    </div>

    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const isFullscreen = ref(false);
const notice = ref("");
let noticeTimer;

const actionLabel = computed(() => (isFullscreen.value ? "退出全屏" : "进入全屏"));

function syncFullscreenState() {
  isFullscreen.value = Boolean(document.fullscreenElement);
}

function showNotice(message) {
  notice.value = message;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.value = "";
  }, 5000);
}

async function toggleFullscreen() {
  if (typeof document === "undefined") return;

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    const root = document.documentElement;
    if (!document.fullscreenEnabled || typeof root.requestFullscreen !== "function") {
      showNotice("当前浏览器未开放网页全屏，请使用浏览器自身的全屏快捷键");
      return;
    }

    await root.requestFullscreen();
  } catch {
    showNotice("未能进入网页全屏，请检查浏览器权限");
  }
}

onMounted(() => {
  syncFullscreenState();
  document.addEventListener("fullscreenchange", syncFullscreenState);
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", syncFullscreenState);
  window.clearTimeout(noticeTimer);
});
</script>

<template>
  <div class="course-fullscreen-control">
    <button
      type="button"
      class="course-fullscreen-button"
      :class="{ active: isFullscreen }"
      :aria-label="actionLabel"
      :aria-pressed="isFullscreen"
      :title="actionLabel"
      @click="toggleFullscreen"
    >
      <svg v-if="!isFullscreen" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5" />
      </svg>
      <span>{{ isFullscreen ? "退出" : "全屏" }}</span>
    </button>

    <Transition name="fullscreen-notice">
      <p v-if="notice" class="course-fullscreen-notice" role="status">{{ notice }}</p>
    </Transition>
  </div>
</template>

<style scoped>
.course-fullscreen-control {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--vp-nav-height);
}

.course-fullscreen-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: var(--vp-nav-height);
  padding: 0;
  color: var(--course-header-control-color, var(--vp-c-text-1));
  border: 0;
  background: transparent;
  font-family: var(--course-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: var(--vp-nav-height);
  cursor: pointer;
  transition: color 0.25s;
}

.course-fullscreen-button:hover,
.course-fullscreen-button:focus-visible,
.course-fullscreen-button.active {
  color: var(--course-header-control-accent, var(--vp-c-brand-1));
}

.course-fullscreen-button:focus-visible {
  outline: 2px solid var(--course-header-control-accent, var(--vp-c-brand-1));
  outline-offset: 2px;
}

.course-fullscreen-button svg {
  display: block;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.course-fullscreen-button span {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.course-fullscreen-notice {
  position: fixed;
  top: calc(var(--vp-nav-height) + 12px);
  right: 24px;
  z-index: 50;
  max-width: min(360px, calc(100vw - 32px));
  margin: 0;
  padding: 10px 14px;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  font-size: 13px;
  line-height: 1.5;
  white-space: normal;
}

.fullscreen-notice-enter-active,
.fullscreen-notice-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fullscreen-notice-enter-from,
.fullscreen-notice-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 767px) {
  .course-fullscreen-button {
    width: 40px;
  }
}

@media (max-width: 420px) {
  .course-fullscreen-notice {
    right: 16px;
  }
}

@media (min-width: 1280px) {
  :global(.VPNavBarAppearance) {
    order: 1;
  }
}
</style>

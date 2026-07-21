<script setup>
import FullscreenButton from "./FullscreenButton.vue";
import ThemeToggle from "./ThemeToggle.vue";

defineProps({
  tone: {
    type: String,
    default: "dark",
    validator: (value) => ["light", "dark"].includes(value),
  },
});
</script>

<template>
  <div
    class="course-header-utilities"
    :class="`course-header-utilities--${tone}`"
    role="group"
    aria-label="显示设置"
  >
    <FullscreenButton />
    <span class="course-header-utilities-divider" aria-hidden="true"></span>
    <ThemeToggle />
  </div>
</template>

<style scoped>
.course-header-utilities {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  height: var(--vp-nav-height);
}

.course-header-utilities--light {
  --course-header-control-color: #274f75;
  --course-header-control-accent: #006acb;
  --course-header-control-divider: rgba(7, 141, 255, 0.22);
  --course-header-switch-border: rgba(39, 79, 117, 0.34);
  --course-header-switch-bg: #dceaf5;
  --course-header-switch-knob: #fff;
  --course-header-switch-icon: #274f75;
}

.course-header-utilities--dark {
  --course-header-control-color: #9bb4ba;
  --course-header-control-accent: var(--course-cyan);
  --course-header-control-divider: rgba(66, 228, 209, 0.22);
  --course-header-switch-border: rgba(155, 180, 186, 0.34);
  --course-header-switch-bg: #152931;
  --course-header-switch-knob: #050b0e;
  --course-header-switch-icon: var(--course-paper);
}

.course-header-utilities-divider {
  width: 1px;
  height: 28px;
  margin: 0 16px;
  background: var(--course-header-control-divider, var(--vp-c-divider));
}

@media (max-width: 767px) {
  .course-header-utilities-divider {
    height: 24px;
    margin-right: 8px;
    margin-left: 8px;
  }
}
</style>

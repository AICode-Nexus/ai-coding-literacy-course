<script setup>
import { computed, onMounted, ref } from "vue";
import { useData } from "vitepress";

const { isDark, theme } = useData();
const hydrated = ref(false);

const actionLabel = computed(() => (
  !hydrated.value
    ? "切换主题"
    : isDark.value
    ? theme.value.lightModeSwitchTitle || "切换到浅色模式"
    : theme.value.darkModeSwitchTitle || "切换到深色模式"
));
const checkedState = computed(() => hydrated.value && isDark.value);

onMounted(() => {
  hydrated.value = true;
});

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <button
    type="button"
    class="course-theme-toggle"
    role="switch"
    :aria-label="actionLabel"
    :aria-checked="checkedState"
    :title="actionLabel"
    @click="toggleTheme"
  >
    <span class="course-theme-toggle-knob" aria-hidden="true">
      <svg class="course-theme-toggle-icon course-theme-toggle-icon--moon" viewBox="0 0 24 24">
        <path d="M20 15.2A8 8 0 0 1 8.8 4 8.4 8.4 0 1 0 20 15.2Z" />
      </svg>
      <svg class="course-theme-toggle-icon course-theme-toggle-icon--sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.course-theme-toggle {
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 1px solid var(--course-header-switch-border, var(--vp-input-border-color));
  border-radius: 11px;
  background: var(--course-header-switch-bg, var(--vp-input-switch-bg-color));
  cursor: pointer;
  transition: border-color .25s ease;
}

.course-theme-toggle:hover,
.course-theme-toggle:focus-visible {
  border-color: var(--course-header-control-accent, var(--vp-c-brand-1));
}

.course-theme-toggle:focus-visible {
  outline: 2px solid var(--course-header-control-accent, var(--vp-c-brand-1));
  outline-offset: 3px;
}

.course-theme-toggle-knob {
  position: absolute;
  top: 1px;
  left: 1px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  color: var(--course-header-switch-icon, var(--vp-c-text-2));
  border-radius: 50%;
  background: var(--course-header-switch-knob, var(--vp-c-neutral-inverse));
  box-shadow: var(--vp-shadow-1);
  transition: color .25s ease, transform .25s ease;
}

.dark .course-theme-toggle-knob {
  transform: translateX(18px);
}

.course-theme-toggle-icon {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.course-theme-toggle-icon--moon {
  display: none;
}

.dark .course-theme-toggle-icon--moon {
  display: block;
}

.dark .course-theme-toggle-icon--sun {
  display: none;
}
</style>

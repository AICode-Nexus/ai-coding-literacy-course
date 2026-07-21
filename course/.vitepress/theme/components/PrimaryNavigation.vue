<script setup>
import { withBase } from "vitepress";
import { primaryNavigation } from "../../data/navigation.js";

defineProps({
  activeId: {
    type: String,
    default: "",
  },
});

function hrefFor(item) {
  const href = withBase(item.link);
  return item.query ? `${href}?${item.query}` : href;
}
</script>

<template>
  <nav aria-label="主导航">
    <a
      v-for="item in primaryNavigation"
      :key="item.id"
      :class="`nav-${item.id}`"
      :href="hrefFor(item)"
      :aria-current="activeId === item.id ? 'page' : undefined"
    >
      {{ item.text }}
    </a>
  </nav>
</template>

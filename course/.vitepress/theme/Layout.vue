<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import CourseHome from "./components/CourseHome.vue";
import PresentDeck from "./components/PresentDeck.vue";

const { frontmatter } = useData();
</script>

<template>
  <CourseHome v-if="frontmatter.layout === 'course-home'" />
  <PresentDeck v-else-if="frontmatter.layout === 'presentation'" />
  <DefaultTheme.Layout v-else />
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import CourseHome from "./components/CourseHome.vue";
import FullscreenButton from "./components/FullscreenButton.vue";
import PresentDeck from "./components/PresentDeck.vue";
import SiteBrand from "./components/SiteBrand.vue";

const { frontmatter } = useData();
</script>

<template>
  <CourseHome v-if="frontmatter.layout === 'course-home'" />
  <PresentDeck v-else-if="frontmatter.layout === 'presentation'" />
  <DefaultTheme.Layout v-else>
    <template #nav-bar-title-after>
      <SiteBrand />
    </template>
    <template #nav-bar-content-after>
      <FullscreenButton />
    </template>
  </DefaultTheme.Layout>
</template>

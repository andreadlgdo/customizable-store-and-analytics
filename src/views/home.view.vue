<template>
  <Header @clickUser="isAsideOpen = true" />
  <theme-toggle />
  <language-toggle />
  <LogInAside @close="isAsideOpen = false" :isOpen="isAsideOpen" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import LanguageToggle from '../components/toggles/language-toggle.component.vue';
  import Header from '../components/header.component.vue';
  import LogInAside from '../components/asides/log-in-aside.component.vue';

  const isAsideOpen = ref(false);
</script>

<style lang="scss" scoped></style>

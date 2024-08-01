<template>
  <Header @clickUser="isAsideOpen = true" />
  <ThemeToggle />
  <Aside @close="isAsideOpen = false" :isOpen="isAsideOpen" />
</template>

<script lang="ts" setup>
  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import Header from '../components/header.component.vue';
  import Aside from '../components/aside.component.vue';
  import { ref } from 'vue';

  const isAsideOpen = ref(false);
</script>

<style lang="scss" scoped></style>
